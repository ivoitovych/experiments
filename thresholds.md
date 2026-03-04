# GELU(bfloat16) Threshold Summary

## Formula

GELU(x) = x * 0.5 * (1 + erf(x / sqrt(2)))

## Rounding

float64 computation -> bfloat16 via round-to-nearest, ties-to-even (RNE)

## Policies

- **TAZ (Treat-As-Zero)**: fp16 subnormal inputs replaced with signed zero before GELU computation
- **FTZ (Flush-To-Zero)**: bf16 subnormal outputs flushed to signed zero after rounding

## Input Domain

All 65536 IEEE-754 fp16 (half-precision) bit patterns (0x0000 - 0xFFFF)

## Key Thresholds

### Most-negative finite fp16 input where bf16 output is 0
- fp16 bits: **0xFBFF**
- fp16 value: **-65504.0**
- bf16 output bits: **0x8000**
- bf16 output value: **-0.0**

### Last (closest to 0) negative fp16 input where bf16 output is exactly 0 (excluding TAZ)
- fp16 bits: **0xC830**
- fp16 value: **-8.375**
- bf16 output bits: **0x8000**
- bf16 output value: **-0.0**

### First negative fp16 input (toward 0) where bf16 output becomes non-zero
- fp16 bits: **0xC82F**
- fp16 value: **-8.3671875**
- bf16 output bits: **0xA606**
- bf16 output value: **-4.649058916e-16**

### Negative fp16 input producing most-negative bf16 output (GELU minimum)
- fp16 bits: **0xBA6B**
- fp16 value: **-0.8022460938**
- bf16 output bits: **0xBE2E**
- bf16 output value: **-0.169921875**

### Positive fp16 input producing smallest non-zero positive bf16 output
- fp16 bits: **0x0400**
- fp16 value: **6.103515625e-05**
- bf16 output bits: **0x3800**
- bf16 output value: **3.051757812e-05**

### Last positive fp16 input where bf16(GELU(x)) != bf16(x)
- fp16 bits: **0x454C**
- fp16 value: **5.296875**
- bf16 output bits: **0x40A9**
- bf16 output value: **5.28125**

### First positive fp16 input where bf16(GELU(x)) == bf16(x) continuously to +max (identity tail)
- fp16 bits: **0x454D**
- fp16 value: **5.30078125**
- bf16 output bits: **0x40AA**
- bf16 output value: **5.3125**

## FTZ/TAZ Statistics

- TAZ applied (subnormal fp16 inputs flushed): **2046** inputs
- FTZ applied (subnormal bf16 outputs flushed): **0** outputs

## Quantization Plateaus

Plateaus of 4+ consecutive fp16 inputs mapping to the same bf16 output: **5714** found

### Top 20 Longest Plateaus

| Start fp16 | End fp16 | Start Value | End Value | bf16 Output | Count |
|------------|----------|-------------|-----------|-------------|-------|
| 0xFBFF | 0xC830 | -65504 | -8.375 | 0x8000 (-0) | 13264 |
| 0x83FF | 0x8001 | -6.09756e-05 | -5.96046e-08 | 0x8000 (-0) | 1023 |
| 0x0001 | 0x03FF | 5.96046e-08 | 6.09756e-05 | 0x0000 (0) | 1023 |
| 0xBA6B | 0xB99F | -0.802246 | -0.702637 | 0xBE2E (-0.169922) | 205 |
| 0xBAB3 | 0xBA6C | -0.837402 | -0.802734 | 0xBE2D (-0.168945) | 72 |
| 0xB99E | 0xB95D | -0.702148 | -0.67041 | 0xBE2D (-0.168945) | 66 |
| 0xBAE7 | 0xBAB4 | -0.862793 | -0.837891 | 0xBE2C (-0.167969) | 52 |
| 0xB95C | 0xB92F | -0.669922 | -0.647949 | 0xBE2C (-0.167969) | 46 |
| 0xBB12 | 0xBAE8 | -0.883789 | -0.863281 | 0xBE2B (-0.166992) | 43 |
| 0xBB37 | 0xBB13 | -0.901855 | -0.884277 | 0xBE2A (-0.166016) | 37 |
| 0xB92E | 0xB90A | -0.647461 | -0.629883 | 0xBE2B (-0.166992) | 37 |
| 0xBB59 | 0xBB38 | -0.918457 | -0.902344 | 0xBE29 (-0.165039) | 34 |
| 0xBB79 | 0xBB5A | -0.934082 | -0.918945 | 0xBE28 (-0.164062) | 32 |
| 0xB909 | 0xB8EA | -0.629395 | -0.614258 | 0xBE2A (-0.166016) | 32 |
| 0xBB96 | 0xBB7A | -0.948242 | -0.93457 | 0xBE27 (-0.163086) | 29 |
| 0xB8E9 | 0xB8CD | -0.61377 | -0.600098 | 0xBE29 (-0.165039) | 29 |
| 0xB7F1 | 0xB7D5 | -0.496338 | -0.489502 | 0xBE1D (-0.15332) | 29 |
| 0xBBB2 | 0xBB97 | -0.961914 | -0.94873 | 0xBE26 (-0.162109) | 28 |
| 0xB7D4 | 0xB7B9 | -0.489258 | -0.482666 | 0xBE1C (-0.152344) | 28 |
| 0xB7B8 | 0xB79D | -0.482422 | -0.47583 | 0xBE1B (-0.151367) | 28 |

## Region Summary

1. **Negative saturation (output = 0)**: For large negative fp16 inputs, GELU output
   rounds to zero in bf16. This region extends from the most-negative finite fp16
   value up to the threshold identified above.

2. **Negative tail (output < 0)**: Between the saturation boundary and x=0, GELU
   produces small negative values. The GELU minimum occurs near x ≈ -0.85.

3. **Near-zero region**: Around x=0, GELU(x) ≈ 0.5*x, producing small positive or
   negative bf16 values.

4. **Positive growth region**: GELU(x) grows toward x, with bf16 quantization
   creating step-like behavior.

5. **Positive identity tail**: For large positive x, GELU(x) ≈ x, and the bf16
   output equals bf16(x). This is the linear/identity region.
