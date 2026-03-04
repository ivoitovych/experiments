#!/usr/bin/env python3
"""
GELU(bfloat16) Numerical Research: Full fp16 Input Scan with FTZ/TAZ + MPFR Validation

Formula: GELU(x) = x * 0.5 * (1 + erf(x / sqrt(2)))   [exact / erf-based]

Rounding: float64 -> bfloat16 via round-to-nearest, ties-to-even (RNE)
Policies:
  TAZ (Treat-As-Zero): fp16 subnormal inputs are replaced with signed zero before GELU.
  FTZ (Flush-To-Zero): bf16 subnormal outputs are flushed to signed zero after rounding.

This script:
  1. Implements reference GELU in float64 with bf16 RNE rounding.
  2. Implements MPFR-backed GELU via mpmath at 256-bit precision.
  3. Scans all 65536 fp16 bit patterns, applying TAZ/FTZ.
  4. Cross-validates float64 reference vs MPFR for every input.
  5. Produces CSV scan report, threshold summary, and mismatch log.
"""

import struct
import math
import csv
import json
import sys
from pathlib import Path

import numpy as np
import mpmath

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
MPFR_PRECISION = 256  # bits for mpmath
SQRT2_F64 = math.sqrt(2.0)

# ---------------------------------------------------------------------------
# IEEE-754 fp16 (half) utilities — pure software, no platform dependency
# ---------------------------------------------------------------------------

def uint16_to_fp16(bits: int) -> float:
    """Convert a 16-bit unsigned integer (IEEE-754 half bit pattern) to a Python float."""
    sign = (bits >> 15) & 1
    exp  = (bits >> 10) & 0x1F
    mant = bits & 0x3FF

    if exp == 0:
        # subnormal or zero
        value = (mant / 1024.0) * (2.0 ** -14)
    elif exp == 31:
        # inf or nan
        if mant == 0:
            value = float('inf')
        else:
            value = float('nan')
    else:
        value = (1.0 + mant / 1024.0) * (2.0 ** (exp - 15))

    return -value if sign else value


def is_fp16_subnormal(bits: int) -> bool:
    """True if fp16 bit pattern is subnormal (exp==0, mant!=0)."""
    exp  = (bits >> 10) & 0x1F
    mant = bits & 0x3FF
    return exp == 0 and mant != 0


def is_fp16_zero(bits: int) -> bool:
    exp  = (bits >> 10) & 0x1F
    mant = bits & 0x3FF
    return exp == 0 and mant == 0


def fp16_sign(bits: int) -> int:
    return (bits >> 15) & 1


# ---------------------------------------------------------------------------
# bfloat16 rounding: float64 -> bf16 with RNE (ties-to-even)
# ---------------------------------------------------------------------------

def float64_to_bf16_rne(x: float) -> int:
    """
    Convert a float64 value to bfloat16 (16-bit: 1 sign + 8 exp + 7 mantissa)
    using round-to-nearest, ties-to-even.

    Steps:
      1. Convert float64 -> float32 (Python struct, which uses RNE by default on most platforms).
      2. Take the float32 IEEE bits (32-bit).
      3. Round mantissa from 23 bits to 7 bits using RNE.
      4. Return upper 16 bits (bf16).

    Special cases: NaN payload is not preserved; Inf is preserved.
    """
    # Step 1: float64 -> float32
    f32_bytes = struct.pack('<f', x)
    f32_bits = struct.unpack('<I', f32_bytes)[0]

    # Decompose float32
    sign = (f32_bits >> 31) & 1
    exp  = (f32_bits >> 23) & 0xFF
    mant = f32_bits & 0x7FFFFF  # 23-bit mantissa

    # Handle special float32 values
    if exp == 0xFF:
        # Inf or NaN
        if mant == 0:
            # Inf -> bf16 Inf
            return (sign << 15) | (0xFF << 7)
        else:
            # NaN -> bf16 quiet NaN (set top mantissa bit)
            return (sign << 15) | (0xFF << 7) | 0x40

    if exp == 0:
        # float32 subnormal or zero -> bf16 zero (float32 subnormals are way below bf16 range)
        return sign << 15

    # Normal float32: round mantissa from 23 bits to 7 bits
    # The lower 16 bits of the mantissa are the "tail" to be rounded off
    tail = mant & 0xFFFF
    upper = mant >> 16  # 7-bit mantissa for bf16

    # RNE: round up if tail > 0x8000, or tail == 0x8000 and upper is odd
    if tail > 0x8000 or (tail == 0x8000 and (upper & 1)):
        upper += 1
        if upper > 0x7F:
            # mantissa overflow -> increment exponent
            upper = 0
            exp += 1
            if exp >= 0xFF:
                # overflow to inf
                return (sign << 15) | (0xFF << 7)

    bf16_bits = (sign << 15) | (exp << 7) | upper
    return bf16_bits


def bf16_to_float(bits: int) -> float:
    """Convert a bf16 bit pattern to a Python float via float32."""
    # bf16 is the upper 16 bits of float32; lower 16 bits are zero
    f32_bits = bits << 16
    f32_bytes = struct.pack('<I', f32_bits)
    return struct.unpack('<f', f32_bytes)[0]


def is_bf16_subnormal(bits: int) -> bool:
    """True if bf16 bit pattern is subnormal (exp==0, mant!=0)."""
    exp  = (bits >> 7) & 0xFF
    mant = bits & 0x7F
    return exp == 0 and mant != 0


def bf16_sign(bits: int) -> int:
    return (bits >> 15) & 1


# ---------------------------------------------------------------------------
# FTZ / TAZ policies
# ---------------------------------------------------------------------------

def apply_taz_fp16(bits: int) -> tuple:
    """
    TAZ: if fp16 input is subnormal, replace with signed zero.
    Returns (effective_bits, effective_float_value, was_flushed).
    """
    if is_fp16_subnormal(bits):
        sign = fp16_sign(bits)
        zero_bits = sign << 15  # +0 or -0
        return zero_bits, -0.0 if sign else 0.0, True
    return bits, uint16_to_fp16(bits), False


def apply_ftz_bf16(bits: int) -> tuple:
    """
    FTZ: if bf16 output is subnormal, flush to signed zero.
    Returns (effective_bits, effective_float_value, was_flushed).
    """
    if is_bf16_subnormal(bits):
        sign = bf16_sign(bits)
        zero_bits = sign << 15
        return zero_bits, -0.0 if sign else 0.0, True
    return bits, bf16_to_float(bits), False


# ---------------------------------------------------------------------------
# Reference GELU: float64 computation -> bf16 RNE + FTZ
# ---------------------------------------------------------------------------

def gelu_f64(x: float) -> float:
    """GELU(x) = x * 0.5 * (1 + erf(x / sqrt(2))), computed in float64."""
    if math.isnan(x):
        return float('nan')
    if math.isinf(x):
        return x if x > 0 else 0.0
    return x * 0.5 * (1.0 + math.erf(x / SQRT2_F64))


def ref_gelu_bf16(fp16_bits: int) -> tuple:
    """
    Reference pipeline:
      1. Interpret fp16 bits -> fp16 float value
      2. Apply TAZ (flush subnormal fp16 inputs to signed zero)
      3. Compute GELU in float64
      4. Round result to bf16 (RNE)
      5. Apply FTZ on bf16 output
    Returns dict with all intermediate values.
    """
    fp16_value = uint16_to_fp16(fp16_bits)
    _, effective_input, taz_applied = apply_taz_fp16(fp16_bits)

    gelu_f64_val = gelu_f64(effective_input)

    bf16_bits_raw = float64_to_bf16_rne(gelu_f64_val)
    bf16_bits_final, bf16_float_final, ftz_applied = apply_ftz_bf16(bf16_bits_raw)

    return {
        'fp16_bits': fp16_bits,
        'fp16_value': fp16_value,
        'taz_applied': taz_applied,
        'effective_input': effective_input,
        'gelu_f64': gelu_f64_val,
        'bf16_bits_raw': bf16_bits_raw,
        'bf16_bits': bf16_bits_final,
        'bf16_value': bf16_float_final,
        'ftz_applied': ftz_applied,
    }


# ---------------------------------------------------------------------------
# MPFR-backed GELU via mpmath
# ---------------------------------------------------------------------------

def gelu_mpfr(x_float: float) -> float:
    """
    GELU(x) via mpmath at high precision.
    Returns the float64 value of the mpmath result.
    """
    if math.isnan(x_float):
        return float('nan')
    if math.isinf(x_float):
        return x_float if x_float > 0 else 0.0

    with mpmath.workdps(80):  # ~266 bits, well above 256
        x = mpmath.mpf(x_float)
        sqrt2 = mpmath.sqrt(2)
        result = x * mpmath.mpf('0.5') * (1 + mpmath.erf(x / sqrt2))
        return float(result)


def float64_to_bf16_rne_from_mpfr(x_float: float, x_mpfr_result) -> int:
    """
    Convert an mpmath high-precision GELU result to bf16 via RNE.
    We first convert the mpmath result to float32 (via float64 -> float32),
    then round the float32 to bf16. This mirrors the reference pipeline exactly.

    The key insight: both pipelines must go through the same float64 -> float32 -> bf16
    path. The difference is only in how the float64 value is computed (math.erf vs mpmath.erf).
    So we convert mpmath result to float64 first, then use the same bf16 rounding.
    """
    return float64_to_bf16_rne(x_float)


def mpfr_gelu_bf16(fp16_bits: int) -> tuple:
    """
    MPFR pipeline (mirrors ref pipeline):
      1. fp16 bits -> value
      2. TAZ
      3. GELU via mpmath at high precision
      4. Convert to float64, then bf16 RNE rounding
      5. FTZ
    Returns (bf16_bits_final, bf16_float_final, gelu_mpfr_f64).
    """
    _, effective_input, _ = apply_taz_fp16(fp16_bits)

    gelu_val_f64 = gelu_mpfr(effective_input)

    bf16_bits_raw = float64_to_bf16_rne(gelu_val_f64)
    bf16_bits_final, bf16_float_final, _ = apply_ftz_bf16(bf16_bits_raw)

    return bf16_bits_final, bf16_float_final, gelu_val_f64


# ---------------------------------------------------------------------------
# Sanity tests
# ---------------------------------------------------------------------------

def run_sanity_tests():
    """Basic sanity checks for the reference GELU + bf16 pipeline."""
    print("Running sanity tests...")

    # GELU(0) = 0
    r = ref_gelu_bf16(0x0000)
    assert r['bf16_value'] == 0.0, f"GELU(0) should be 0, got {r['bf16_value']}"
    assert r['bf16_bits'] == 0x0000

    # GELU(-0) = -0  (or 0; -0 * 0.5 * 1 = -0)
    r = ref_gelu_bf16(0x8000)
    assert r['bf16_bits'] in (0x0000, 0x8000), f"GELU(-0) unexpected: {r['bf16_bits']:#06x}"

    # GELU(+inf) = +inf
    r = ref_gelu_bf16(0x7C00)  # fp16 +inf
    assert math.isinf(r['bf16_value']) and r['bf16_value'] > 0

    # GELU(-inf) = 0
    r = ref_gelu_bf16(0xFC00)  # fp16 -inf
    assert r['bf16_value'] == 0.0, f"GELU(-inf) should be 0, got {r['bf16_value']}"

    # GELU(NaN) = NaN
    r = ref_gelu_bf16(0x7E00)  # fp16 NaN
    assert math.isnan(r['bf16_value'])

    # GELU(1.0) ~ 0.8413 (fp16 1.0 = 0x3C00)
    r = ref_gelu_bf16(0x3C00)
    assert 0.8 < r['bf16_value'] < 0.9, f"GELU(1.0) ~ 0.84, got {r['bf16_value']}"

    # GELU(-1.0) ~ -0.1587 (fp16 -1.0 = 0xBC00)
    r = ref_gelu_bf16(0xBC00)
    assert -0.2 < r['bf16_value'] < -0.1, f"GELU(-1.0) ~ -0.16, got {r['bf16_value']}"

    # TAZ: subnormal fp16 input should be treated as zero
    r = ref_gelu_bf16(0x0001)  # smallest positive fp16 subnormal
    assert r['taz_applied'] == True
    assert r['effective_input'] == 0.0
    assert r['bf16_value'] == 0.0

    # bf16 rounding: verify basic RNE
    # 1.0 in float64 -> bf16 should be 0x3F80
    assert float64_to_bf16_rne(1.0) == 0x3F80
    assert float64_to_bf16_rne(-1.0) == 0xBF80
    assert float64_to_bf16_rne(0.0) == 0x0000
    assert float64_to_bf16_rne(float('inf')) == 0x7F80
    assert float64_to_bf16_rne(float('-inf')) == 0xFF80

    # Cross-check ref vs MPFR for a few values
    for bits in [0x0000, 0x3C00, 0xBC00, 0x4000, 0xC000, 0x7C00, 0xFC00]:
        ref = ref_gelu_bf16(bits)
        mpfr_bits, _, _ = mpfr_gelu_bf16(bits)
        if math.isnan(ref['bf16_value']):
            continue
        assert ref['bf16_bits'] == mpfr_bits, \
            f"Mismatch at fp16 {bits:#06x}: ref={ref['bf16_bits']:#06x} mpfr={mpfr_bits:#06x}"

    print("All sanity tests passed.")


# ---------------------------------------------------------------------------
# Full fp16 scan
# ---------------------------------------------------------------------------

def full_scan():
    """Scan all 65536 fp16 bit patterns, cross-validate ref vs MPFR, produce reports."""
    print("Starting full fp16 scan (65536 values)...")

    results = []
    mismatches = []

    for bits in range(65536):
        ref = ref_gelu_bf16(bits)

        # MPFR validation
        mpfr_bf16_bits, mpfr_bf16_val, mpfr_gelu_f64 = mpfr_gelu_bf16(bits)

        # Comparison: treat ±0 as equal (both are zero in bf16)
        def is_bf16_zero_bits(b):
            return b == 0x0000 or b == 0x8000

        match = True
        if math.isnan(ref['bf16_value']) and math.isnan(mpfr_bf16_val):
            match = True
        elif is_bf16_zero_bits(ref['bf16_bits']) and is_bf16_zero_bits(mpfr_bf16_bits):
            match = True  # ±0 == ±0
        elif ref['bf16_bits'] != mpfr_bf16_bits:
            match = False
            mismatches.append({
                'fp16_bits': f"0x{bits:04X}",
                'fp16_value': ref['fp16_value'],
                'ref_bf16_bits': f"0x{ref['bf16_bits']:04X}",
                'ref_bf16_value': ref['bf16_value'],
                'mpfr_bf16_bits': f"0x{mpfr_bf16_bits:04X}",
                'mpfr_bf16_value': mpfr_bf16_val,
                'ref_gelu_f64': ref['gelu_f64'],
                'mpfr_gelu_f64': mpfr_gelu_f64,
            })

        results.append({
            'fp16_bits': f"0x{bits:04X}",
            'fp16_bits_int': bits,
            'fp16_value': format_float(ref['fp16_value']),
            'taz_applied': ref['taz_applied'],
            'effective_input': format_float(ref['effective_input']),
            'gelu_f64': format_float(ref['gelu_f64']),
            'bf16_bits': f"0x{ref['bf16_bits']:04X}",
            'bf16_bits_int': ref['bf16_bits'],
            'bf16_value': format_float(ref['bf16_value']),
            'ftz_applied': ref['ftz_applied'],
            'mpfr_match': match,
        })

        if bits % 8192 == 0 and bits > 0:
            print(f"  ... scanned {bits}/65536")

    print(f"Scan complete. {len(mismatches)} mismatches found.")
    return results, mismatches


def format_float(v):
    """Format a float for CSV output."""
    if math.isnan(v):
        return "NaN"
    if math.isinf(v):
        return "+Inf" if v > 0 else "-Inf"
    if v == 0.0:
        # Distinguish -0.0 from +0.0
        if math.copysign(1.0, v) < 0:
            return "-0.0"
        return "0.0"
    return f"{v:.10g}"


# ---------------------------------------------------------------------------
# Region / threshold analysis
# ---------------------------------------------------------------------------

def analyze_thresholds(results):
    """
    Analyze scan results to find saturation regions and exact threshold bit patterns.
    Only considers normal (non-NaN, non-Inf) fp16 inputs.
    Properly separates TAZ-affected entries from genuine saturation.
    """
    # Build sorted list of finite entries
    finite_entries = []
    for r in results:
        bits = r['fp16_bits_int']
        exp = (bits >> 10) & 0x1F
        if exp == 31:
            continue  # skip inf/nan
        fp16_val = float(r['fp16_value']) if r['fp16_value'] not in ('NaN', '+Inf', '-Inf') else None
        if fp16_val is None:
            continue
        bf16_val_str = r['bf16_value']
        if bf16_val_str in ('NaN', '+Inf', '-Inf'):
            bf16_val = float('inf') if bf16_val_str == '+Inf' else (float('-inf') if bf16_val_str == '-Inf' else float('nan'))
        else:
            bf16_val = float(bf16_val_str)
        finite_entries.append((fp16_val, bits, r['bf16_bits'], r['bf16_bits_int'], bf16_val, r['taz_applied'], r['ftz_applied']))

    finite_entries.sort(key=lambda e: e[0])

    thresholds = {}

    # --- Negative side: find saturation boundary (EXCLUDING TAZ'd entries) ---
    # TAZ'd entries are always zero by definition (subnormals flushed to 0), not genuine saturation
    neg_non_taz = [e for e in finite_entries if e[0] < 0 and not e[5]]
    neg_non_taz.sort(key=lambda e: e[0])  # most negative first

    def is_output_zero(bf16_val):
        return bf16_val == 0.0

    # Walk from most negative toward zero to find the boundary
    # In the saturation region, output is zero. At some point it becomes non-zero.
    for i in range(len(neg_non_taz) - 1):
        if is_output_zero(neg_non_taz[i][4]) and not is_output_zero(neg_non_taz[i+1][4]):
            e_last_zero = neg_non_taz[i]
            e_first_nonzero = neg_non_taz[i+1]
            thresholds['neg_sat_last_zero'] = {
                'description': 'Last (closest to 0) negative fp16 input where bf16 output is exactly 0 (excluding TAZ)',
                'fp16_bits': f"0x{e_last_zero[1]:04X}",
                'fp16_value': e_last_zero[0],
                'bf16_bits': e_last_zero[2],
                'bf16_value': e_last_zero[4],
            }
            thresholds['neg_sat_first_nonzero'] = {
                'description': 'First negative fp16 input (toward 0) where bf16 output becomes non-zero',
                'fp16_bits': f"0x{e_first_nonzero[1]:04X}",
                'fp16_value': e_first_nonzero[0],
                'bf16_bits': e_first_nonzero[2],
                'bf16_value': e_first_nonzero[4],
            }
            break

    # Most-negative finite fp16 input with zero output (start of saturation)
    if neg_non_taz and is_output_zero(neg_non_taz[0][4]):
        thresholds['neg_sat_first_zero'] = {
            'description': 'Most-negative finite fp16 input where bf16 output is 0',
            'fp16_bits': f"0x{neg_non_taz[0][1]:04X}",
            'fp16_value': neg_non_taz[0][0],
            'bf16_bits': neg_non_taz[0][2],
            'bf16_value': neg_non_taz[0][4],
        }

    # --- Negative side: GELU minimum ---
    neg_nonzero = [e for e in neg_non_taz if e[4] < 0]
    if neg_nonzero:
        e = min(neg_nonzero, key=lambda e: e[4])
        thresholds['neg_min_output'] = {
            'description': 'Negative fp16 input producing most-negative bf16 output (GELU minimum)',
            'fp16_bits': f"0x{e[1]:04X}",
            'fp16_value': e[0],
            'bf16_bits': e[2],
            'bf16_value': e[4],
        }

    # --- Positive side: identity/linear tail ---
    pos_entries = [e for e in finite_entries if e[0] > 0 and not e[5]]
    pos_entries.sort(key=lambda e: e[0])

    # Find where bf16(GELU(x)) == bf16(x) continuously from some point onward
    # Walk from the largest positive downward to find where identity breaks
    identity_break_idx = len(pos_entries)  # assume identity holds for all
    for i in range(len(pos_entries) - 1, -1, -1):
        e = pos_entries[i]
        input_as_bf16 = float64_to_bf16_rne(e[0])
        input_as_bf16_flushed, _, _ = apply_ftz_bf16(input_as_bf16)
        if e[3] != input_as_bf16_flushed:
            identity_break_idx = i + 1
            break

    if identity_break_idx < len(pos_entries):
        e = pos_entries[identity_break_idx]
        thresholds['pos_identity_start'] = {
            'description': 'First positive fp16 input where bf16(GELU(x)) == bf16(x) continuously to +max (identity tail)',
            'fp16_bits': f"0x{e[1]:04X}",
            'fp16_value': e[0],
            'bf16_bits': e[2],
            'bf16_value': e[4],
        }
        # Also report the last non-identity entry
        if identity_break_idx > 0:
            e_prev = pos_entries[identity_break_idx - 1]
            thresholds['pos_last_non_identity'] = {
                'description': 'Last positive fp16 input where bf16(GELU(x)) != bf16(x)',
                'fp16_bits': f"0x{e_prev[1]:04X}",
                'fp16_value': e_prev[0],
                'bf16_bits': e_prev[2],
                'bf16_value': e_prev[4],
            }

    # --- Positive side: minimum positive GELU output ---
    pos_nonzero = [e for e in pos_entries if e[4] > 0]
    if pos_nonzero:
        e = min(pos_nonzero, key=lambda e: e[4])
        thresholds['pos_min_nonzero_output'] = {
            'description': 'Positive fp16 input producing smallest non-zero positive bf16 output',
            'fp16_bits': f"0x{e[1]:04X}",
            'fp16_value': e[0],
            'bf16_bits': e[2],
            'bf16_value': e[4],
        }

    # --- Near-zero behavior ---
    # First non-TAZ positive input where GELU output is zero
    pos_zero_out = [e for e in pos_entries if is_output_zero(e[4])]
    if pos_zero_out:
        thresholds['pos_zero_output_count'] = len(pos_zero_out)

    # --- Detect flat plateaus: consecutive fp16 inputs mapping to same bf16 output ---
    plateaus = []
    if len(finite_entries) > 1:
        current_start = 0
        for i in range(1, len(finite_entries)):
            if finite_entries[i][3] != finite_entries[current_start][3]:
                length = i - current_start
                if length >= 4:
                    plateaus.append({
                        'start_fp16_bits': f"0x{finite_entries[current_start][1]:04X}",
                        'start_fp16_value': finite_entries[current_start][0],
                        'end_fp16_bits': f"0x{finite_entries[i-1][1]:04X}",
                        'end_fp16_value': finite_entries[i-1][0],
                        'bf16_output_bits': finite_entries[current_start][2],
                        'bf16_output_value': finite_entries[current_start][4],
                        'count': length,
                    })
                current_start = i
        length = len(finite_entries) - current_start
        if length >= 4:
            plateaus.append({
                'start_fp16_bits': f"0x{finite_entries[current_start][1]:04X}",
                'start_fp16_value': finite_entries[current_start][0],
                'end_fp16_bits': f"0x{finite_entries[-1][1]:04X}",
                'end_fp16_value': finite_entries[-1][0],
                'bf16_output_bits': finite_entries[current_start][2],
                'bf16_output_value': finite_entries[current_start][4],
                'count': length,
            })

    # --- FTZ/TAZ statistics ---
    taz_entries = [e for e in finite_entries if e[5]]
    ftz_entries = [e for e in finite_entries if e[6]]

    thresholds['taz_count'] = len(taz_entries)
    thresholds['ftz_count'] = len(ftz_entries)

    return thresholds, plateaus


# ---------------------------------------------------------------------------
# Output generation
# ---------------------------------------------------------------------------

def write_csv(results, filepath):
    """Write scan results to CSV."""
    fieldnames = ['fp16_bits', 'fp16_value', 'taz_applied', 'effective_input',
                  'gelu_f64', 'bf16_bits', 'bf16_value', 'ftz_applied', 'mpfr_match']
    with open(filepath, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in results:
            row = {k: r[k] for k in fieldnames}
            writer.writerow(row)
    print(f"Wrote {filepath}")


def write_mismatches_csv(mismatches, filepath):
    """Write mismatch report."""
    if not mismatches:
        print(f"No mismatches — skipping {filepath}")
        return
    fieldnames = list(mismatches[0].keys())
    with open(filepath, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for m in mismatches:
            writer.writerow(m)
    print(f"Wrote {filepath} ({len(mismatches)} mismatches)")


def write_thresholds_md(thresholds, plateaus, filepath):
    """Write human-readable threshold summary."""
    lines = [
        "# GELU(bfloat16) Threshold Summary",
        "",
        "## Formula",
        "",
        "GELU(x) = x * 0.5 * (1 + erf(x / sqrt(2)))",
        "",
        "## Rounding",
        "",
        "float64 computation -> bfloat16 via round-to-nearest, ties-to-even (RNE)",
        "",
        "## Policies",
        "",
        "- **TAZ (Treat-As-Zero)**: fp16 subnormal inputs replaced with signed zero before GELU computation",
        "- **FTZ (Flush-To-Zero)**: bf16 subnormal outputs flushed to signed zero after rounding",
        "",
        "## Input Domain",
        "",
        "All 65536 IEEE-754 fp16 (half-precision) bit patterns (0x0000 - 0xFFFF)",
        "",
        "## Key Thresholds",
        "",
    ]

    threshold_keys = [
        'neg_sat_first_zero',
        'neg_sat_last_zero',
        'neg_sat_first_nonzero',
        'neg_min_output',
        'pos_min_nonzero_output',
        'pos_last_non_identity',
        'pos_identity_start',
    ]

    for key in threshold_keys:
        if key in thresholds:
            t = thresholds[key]
            lines.append(f"### {t['description']}")
            lines.append(f"- fp16 bits: **{t['fp16_bits']}**")
            lines.append(f"- fp16 value: **{t['fp16_value']}**")
            lines.append(f"- bf16 output bits: **{t['bf16_bits']}**")
            lines.append(f"- bf16 output value: **{t['bf16_value']}**")
            lines.append("")

    lines.append("## FTZ/TAZ Statistics")
    lines.append("")
    lines.append(f"- TAZ applied (subnormal fp16 inputs flushed): **{thresholds.get('taz_count', 0)}** inputs")
    lines.append(f"- FTZ applied (subnormal bf16 outputs flushed): **{thresholds.get('ftz_count', 0)}** outputs")
    lines.append("")

    lines.append("## Quantization Plateaus")
    lines.append("")
    lines.append(f"Plateaus of 4+ consecutive fp16 inputs mapping to the same bf16 output: **{len(plateaus)}** found")
    lines.append("")

    if plateaus:
        # Show top 20 longest plateaus
        sorted_plateaus = sorted(plateaus, key=lambda p: -p['count'])
        lines.append("### Top 20 Longest Plateaus")
        lines.append("")
        lines.append("| Start fp16 | End fp16 | Start Value | End Value | bf16 Output | Count |")
        lines.append("|------------|----------|-------------|-----------|-------------|-------|")
        for p in sorted_plateaus[:20]:
            lines.append(
                f"| {p['start_fp16_bits']} | {p['end_fp16_bits']} | {p['start_fp16_value']:.6g} "
                f"| {p['end_fp16_value']:.6g} | {p['bf16_output_bits']} ({p['bf16_output_value']:.6g}) "
                f"| {p['count']} |"
            )
        lines.append("")

    lines.append("## Region Summary")
    lines.append("")
    lines.append("1. **Negative saturation (output = 0)**: For large negative fp16 inputs, GELU output")
    lines.append("   rounds to zero in bf16. This region extends from the most-negative finite fp16")
    lines.append("   value up to the threshold identified above.")
    lines.append("")
    lines.append("2. **Negative tail (output < 0)**: Between the saturation boundary and x=0, GELU")
    lines.append("   produces small negative values. The GELU minimum occurs near x ≈ -0.85.")
    lines.append("")
    lines.append("3. **Near-zero region**: Around x=0, GELU(x) ≈ 0.5*x, producing small positive or")
    lines.append("   negative bf16 values.")
    lines.append("")
    lines.append("4. **Positive growth region**: GELU(x) grows toward x, with bf16 quantization")
    lines.append("   creating step-like behavior.")
    lines.append("")
    lines.append("5. **Positive identity tail**: For large positive x, GELU(x) ≈ x, and the bf16")
    lines.append("   output equals bf16(x). This is the linear/identity region.")
    lines.append("")

    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))
    print(f"Wrote {filepath}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    outdir = Path(__file__).parent

    # Sanity tests first
    run_sanity_tests()

    # Full scan
    results, mismatches = full_scan()

    # Write CSV outputs
    write_csv(results, outdir / 'gelu_fp16_scan.csv')
    write_mismatches_csv(mismatches, outdir / 'mismatches.csv')

    # Analyze thresholds
    thresholds, plateaus = analyze_thresholds(results)

    # Write threshold summary
    write_thresholds_md(thresholds, plateaus, outdir / 'thresholds.md')

    # Also write thresholds as JSON for programmatic use
    with open(outdir / 'thresholds.json', 'w') as f:
        json.dump({'thresholds': thresholds, 'plateau_count': len(plateaus),
                    'plateaus_top20': sorted(plateaus, key=lambda p: -p['count'])[:20]},
                   f, indent=2, default=str)
    print(f"Wrote {outdir / 'thresholds.json'}")

    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"Total inputs scanned: {len(results)}")
    print(f"Mismatches (ref vs MPFR): {len(mismatches)}")
    print(f"TAZ-affected inputs: {thresholds.get('taz_count', 0)}")
    print(f"FTZ-affected outputs: {thresholds.get('ftz_count', 0)}")
    print(f"Quantization plateaus (4+): {len(plateaus)}")
    print()

    for key in ['neg_sat_first_zero', 'neg_sat_last_zero', 'neg_sat_first_nonzero',
                'neg_min_output', 'pos_min_nonzero_output', 'pos_last_non_identity',
                'pos_identity_start']:
        if key in thresholds:
            t = thresholds[key]
            print(f"  {t['description']}:")
            print(f"    fp16={t['fp16_bits']}  value={t['fp16_value']}  bf16_out={t['bf16_bits']}  out_val={t['bf16_value']}")
            print()

    if mismatches:
        print("WARNING: Mismatches found between float64 reference and MPFR validator!")
        print("See mismatches.csv for details.")
    else:
        print("VALIDATION PASSED: float64 reference and MPFR agree on all 65536 inputs.")

    return 0 if not mismatches else 1


if __name__ == '__main__':
    sys.exit(main())
