# GELU(bfloat16) Numerical Research: Full fp16 Input Scan

Exhaustive numerical research of the GELU activation function when both input and
output are bfloat16, under FTZ (flush-to-zero) and TAZ (treat-as-zero) subnormal
policies, with MPFR validation.

## Formula

```
GELU(x) = x * 0.5 * (1 + erf(x / sqrt(2)))
```

This is the **exact / erf-based** GELU definition (not the tanh approximation).

## Rounding Mode

**Round-to-Nearest, Ties-to-Even (RNE)**

The pipeline is:
1. Input: IEEE-754 fp16 (half-precision) bit pattern
2. Convert to float64 value
3. Apply TAZ policy (flush subnormal fp16 inputs to signed zero)
4. Compute GELU in float64 precision
5. Convert result to bfloat16 via: float64 → float32 (struct pack, platform RNE) → RNE round mantissa from 23 to 7 bits
6. Apply FTZ policy (flush subnormal bf16 outputs to signed zero)

## FTZ / TAZ Interpretation

### TAZ (Treat-As-Zero) — applied to **inputs only**
- If the fp16 input bit pattern is subnormal (exponent == 0, mantissa != 0), it is
  replaced with signed zero (preserving the sign bit) **before** GELU computation.
- fp16 subnormals: bit patterns 0x0001–0x03FF (positive) and 0x8001–0x83FF (negative).
- Total: 1023 positive + 1023 negative = 2046 TAZ-affected inputs.

### FTZ (Flush-To-Zero) — applied to **outputs only**
- After converting the GELU result to bf16, if the bf16 bit pattern is subnormal
  (exponent == 0, mantissa != 0), it is flushed to signed zero.
- In practice, **0 outputs were FTZ-affected** in this scan because GELU values near
  zero map to bf16 normals or exact zero, and GELU values in the deep negative tail
  map to bf16 subnormals only rarely (and when they do, the values are already handled
  by the negative saturation region).

## MPFR Precision Settings

- Library: **mpmath** (Python binding to MPFR)
- Working precision: **80 decimal digits** (~266 binary bits)
- This ensures that the final bf16 rounding is stable and not affected by intermediate
  precision limitations.
- MPFR functions used: `mpmath.erf()`, `mpmath.sqrt()`

## Validation Results

### Reference vs MPFR Cross-Check

- **Sign-of-zero differences** (±0): Treated as matching. Both +0.0 and -0.0 are
  valid zero representations; the reference preserves IEEE-754 sign propagation while
  mpmath may not.
- **Genuine mismatches**: 729 out of 65536 inputs (1.1%).
  - All occur in the **deep negative tail** (fp16 values in [-13.14, -7.18]).
  - In this region, GELU(x) produces extremely small values (|result| < 10^{-10}).
  - The float64 `math.erf()` computation loses precision relative to MPFR's 266-bit
    `erf()`, causing the float64 result to round to a different bf16 value.
  - Typical error: ±1–3 bf16 ULPs in the subnormal bf16 output range.
  - These mismatches document where float64 precision is **insufficient** for exact bf16
    rounding in the GELU tail — an important finding for implementations.

## Key Threshold Results

| Threshold | fp16 bits | fp16 value | bf16 output bits | bf16 output value |
|-----------|-----------|------------|------------------|-------------------|
| Negative saturation starts (most negative finite) | 0xFBFF | -65504.0 | 0x8000 | -0.0 |
| Negative saturation ends (last zero output) | 0xC830 | -8.375 | 0x8000 | -0.0 |
| First non-zero output (leaving neg saturation) | 0xC82F | -8.3671875 | 0xA606 | -4.65e-16 |
| GELU minimum (most negative output) | 0xBA6B | -0.8022 | 0xBE2E | -0.1699 |
| Smallest positive output | 0x0400 | 6.10e-05 | 0x3800 | 3.05e-05 |
| Last non-identity positive | 0x454C | 5.2969 | 0x40A9 | 5.2813 |
| Identity tail starts | 0x454D | 5.3008 | 0x40AA | 5.3125 |

## Region Summary

1. **Negative saturation** (output = 0): x in [-65504, -8.375]
   All fp16 inputs produce bf16 zero output. GELU(x) is so small it rounds to 0 in bf16.

2. **Deep negative tail** (tiny non-zero output): x in (-8.375, ~-4)
   GELU output is extremely small but non-zero in bf16. Float64 precision may differ from
   MPFR truth here (729 mismatches).

3. **Active negative region**: x in (~-4, 0)
   GELU produces meaningful negative values. Minimum at x ≈ -0.80 with bf16 output ≈ -0.17.

4. **Near-zero / transition**: x ≈ 0
   GELU(x) ≈ 0.5*x. TAZ ensures all subnormal inputs are treated as zero.

5. **Active positive region**: x in (0, ~5.3)
   GELU output grows toward x but is slightly less than x.

6. **Identity tail**: x >= 5.3008 (fp16 0x454D)
   bf16(GELU(x)) == bf16(x) for all remaining positive fp16 values.

## Output Files

| File | Description |
|------|-------------|
| `gelu_fp16_scan.csv` | Full scan: 65536 rows with fp16 bits, values, TAZ/FTZ flags, bf16 output, MPFR match |
| `thresholds.md` | Human-readable threshold summary with plateau analysis |
| `thresholds.json` | Machine-readable thresholds and top-20 plateaus |
| `mismatches.csv` | 729 ref-vs-MPFR mismatches with both bf16 values and float64 GELU values |

## How to Reproduce

### Prerequisites

```bash
pip install numpy mpmath
```

Python 3.8+ required.

### Run

```bash
./run_scan.sh
```

Or directly:

```bash
python3 gelu_fp16_research.py
```

This runs sanity tests, scans all 65536 fp16 inputs, cross-validates against MPFR,
and produces all output files in the current directory. Runtime: ~2-3 minutes.

### Verify

The script exits with code 0 if no mismatches, code 1 if mismatches exist (the 729
float64-vs-MPFR precision differences are expected and documented).

## Implementation Details

### bf16 Rounding (RNE)
1. Convert float64 to float32 via `struct.pack('<f', x)` (platform RNE).
2. Extract float32 IEEE-754 bits (32-bit unsigned).
3. Round 23-bit mantissa to 7-bit mantissa using RNE:
   - If tail (lower 16 bits) > 0x8000: round up.
   - If tail == 0x8000 (exact tie): round to even (round up if upper bit is odd).
   - Otherwise: truncate (round down).
4. Handle mantissa overflow → increment exponent → handle overflow to infinity.
5. Special cases: NaN → quiet NaN, ±Inf → ±Inf, float32 subnormal → bf16 zero.

### fp16 Enumeration
All 65536 uint16 patterns (0x0000–0xFFFF) are interpreted as IEEE-754 half-precision:
- 0x0000/0x8000: ±zero
- 0x0001–0x03FF / 0x8001–0x83FF: subnormals (TAZ'd to ±0)
- 0x0400–0x7BFF / 0x8400–0xFBFF: normals
- 0x7C00/0xFC00: ±infinity
- 0x7C01–0x7FFF / 0xFC01–0xFFFF: NaN
