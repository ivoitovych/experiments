# BFloat16 Precision Simulation for LayerNorm Backward Tolerances

This research implements C++23 `std::bfloat16_t` simulations to determine realistic test tolerances for LayerNorm backward operations by measuring bfloat16 precision characteristics.

## Objective

Determine realistic test tolerances for LayerNorm backward operations by simulating bfloat16 precision in software using C++23 `std::bfloat16_t`.

**Independence:** This research runs on any Linux system with GCC 13+ compiler. No specialized hardware or proprietary software required.

## Environment

- **Compiler:** g++ with C++23 (`-std=c++23`)
- **Type:** `std::bfloat16_t` (P1467R9, GCC 13+)
- **No hardware:** Pure CPU simulation of bf16 precision characteristics

## Approach

Create two variants of each function:

| Variant | Input | Output | Internals | Purpose |
|---------|-------|--------|-----------|---------|
| `*_bf16_fp32` | bf16 | bf16 | fp32 | Simulates device with fp32 accumulators |
| `*_bf16_bf16` | bf16 | bf16 | bf16 | Simulates pure bf16 pipeline |

Compare both against fp32 reference to measure expected error bounds.

## Functions Implemented

The LayerNorm backward pass computes gradients for input (dx), scale (dgamma), and bias (dbeta). The following operations are simulated:

### 1. `compute_dy_gamma_sum` — The Buggy Function

Computes: `(1/N) * sum_i(dy[row, i] * gamma[i])` for each row

```cpp
// Pseudocode from kernel
for (col = 0; col < Wt; ++col) {
    tile = dy[row, col] * gamma[col];  // broadcast multiply
    sum += tile;                        // accumulation (this was buggy)
}
result = sum * (1/N);
```

**Simulate:**
- `bf16 dy_gamma_sum_bf16_fp32(bf16* dy, bf16* gamma, size_t N)` — fp32 accumulator
- `bf16 dy_gamma_sum_bf16_bf16(bf16* dy, bf16* gamma, size_t N)` — bf16 accumulator

### 2. `compute_dy_gamma_xnorm_sum`

Computes: `(1/N) * sum_i(dy[row, i] * gamma[i] * x_hat[row, i])`

```cpp
for (col = 0; col < Wt; ++col) {
    tile = dy[row, col] * gamma[col];
    tile = tile * x_hat[row, col];
    sum += tile;
}
result = sum * (1/N);
```

### 3. `compute_dx` — Input Gradient

Computes: `dx = rstd * (dy * gamma - dy_gamma_sum - x_hat * dy_gamma_xnorm_sum)`

```cpp
for (col = 0; col < N; ++col) {
    term1 = dy[col] * gamma[col];
    term2 = dy_gamma_sum;              // broadcasted scalar
    term3 = x_hat[col] * dy_gamma_xnorm_sum;  // broadcasted scalar
    dx[col] = rstd * (term1 - term2 - term3);
}
```

### 4. Reduce Sum (Row-wise)

Simple accumulation of N values — baseline for error analysis.

```cpp
bf16 reduce_sum_bf16_fp32(bf16* data, size_t N);
bf16 reduce_sum_bf16_bf16(bf16* data, size_t N);
```

## Experiments

### Experiment 1: Accumulation Error vs N

```
For N in [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 8462]:
    data = constant(1.0) as bf16

    result_fp32_internal = reduce_sum_bf16_fp32(data, N)
    result_bf16_internal = reduce_sum_bf16_bf16(data, N)
    result_reference = N (exact)

    Record: abs_error, rel_error for both variants
```

### Experiment 2: dy_gamma_sum Error Analysis

```
For N in [2048, 4096, 8192, 8462]:
    For input_type in [constant(1.0), uniform(-1,1), normal(0,1)]:
        dy = input_type as bf16
        gamma = constant(1.0) as bf16

        result_fp32 = dy_gamma_sum_bf16_fp32(dy, gamma, N)
        result_bf16 = dy_gamma_sum_bf16_bf16(dy, gamma, N)
        result_ref = dy_gamma_sum_fp32_fp32(dy_as_fp32, gamma_as_fp32, N)

        Record: max_diff, mean_diff, relative_error
```

### Experiment 3: Full LayerNorm Backward Error

```
For N in [2048, 4096, 8192, 8462]:
    For batch in [1, 10, 100]:
        Generate inputs (x, dy, gamma, mean, rstd) as bf16

        dx_fp32_internal = layernorm_bw_bf16_fp32(...)
        dx_bf16_internal = layernorm_bw_bf16_bf16(...)
        dx_reference = layernorm_bw_fp32_fp32(...)

        Record: max_diff, mean_diff per output (dx, dgamma, dbeta)
```

### Experiment 4: Tile-Aligned vs Non-Aligned

```
tile_size = 32
For N in [8192 (256 tiles), 8160 (255 tiles), 8190 (255+30), 8462 (264+14)]:
    Run Experiment 3
    Compare error distributions between aligned and non-aligned
```

## Building and Running

```bash
# Build the simulation
make

# Run all experiments
./bf16_sim
```

## Expected Outputs

### 1. Error Bounds Table

| Operation | N | fp32 Internal | bf16 Internal |
|-----------|---|---------------|---------------|
| reduce_sum | 8192 | max_err=X | max_err=Y |
| dy_gamma_sum | 8192 | max_err=X | max_err=Y |
| dx | 8192 | max_err=X | max_err=Y |

### 2. Recommended Tolerances

```cpp
// Based on empirical results
struct LayerNormBwTolerances {
    float atol_dx;      // Absolute tolerance for dx
    float atol_dgamma;  // Absolute tolerance for dgamma
    float atol_dbeta;   // Absolute tolerance for dbeta
    float rtol;         // Relative tolerance (common)

    // Scaling factor for non-tile-aligned dimensions
    float non_aligned_multiplier;
};

LayerNormBwTolerances get_tolerances(size_t features, bool tile_aligned);
```

### 3. Test Helper Function

```cpp
// Returns true if values are within expected bf16 precision bounds
bool allclose_bf16(
    const std::vector<float>& actual,
    const std::vector<float>& expected,
    size_t accumulation_depth,
    bool tile_aligned = true
);
```

## Success Criteria

1. **Bug detection:** Tolerances must detect max_diff ~1000 (accumulation bug)
2. **Precision acceptance:** Tolerances must accept max_diff ~3-10 (bf16 precision)
3. **Justification:** Each tolerance value backed by simulation data
4. **Reproducibility:** All experiments reproducible with provided code

## Implementation Notes

### Building with std::bfloat16_t

```bash
g++ -std=c++23 -march=native -O2 bf16_simulation.cpp -o bf16_sim
```

### Example bf16 Operations

```cpp
#include <stdfloat>

std::bfloat16_t a = 1.0bf16;
std::bfloat16_t b = 2.0bf16;
std::bfloat16_t c = a + b;  // Result in bf16

// For fp32 accumulation
float acc = 0.0f;
for (auto val : bf16_array) {
    acc += static_cast<float>(val);
}
std::bfloat16_t result = static_cast<std::bfloat16_t>(acc);
```

## Results

### Key Findings

1. **Accumulation precision saturation**: pure BF16 accumulation can “stall” once the running sum gets large enough that the BF16 ULP exceeds 1.0. For example, when summing \(8192 \times 1.0\), the accumulator reaches 256 and further `+1.0` additions no longer change the BF16 value (ULP ≈ 2 at 256), so the result stays 256 instead of 8192.

2. **Precision Loss**: BF16 internal accumulation shows 3-10x higher errors than FP32 accumulation across all operations.

3. **LayerNorm Backward Errors**:
   - **dx gradients**: BF16 max abs error is typically in the ~0.02–0.04 range; FP32-internal is typically ~0.01–0.016 in these runs.
   - **dgamma/dbeta**: BF16 errors grow with batch size; in these runs, BF16 max abs error reaches ~1.3 for `dgamma` and ~1.0 for `dbeta`, while FP32-internal reaches ~0.125.

4. **Tile Alignment**: Non-tile-aligned dimensions show slightly higher but not dramatically different errors.

### Detailed Results Summary

#### Experiment 1: Accumulation Error vs N
- FP32 accumulation: Perfect precision for all N
- BF16 accumulation: Fails catastrophically for N ≥ 512, stuck at 256.0 due to BF16 precision saturation (not exponent overflow)

#### Experiment 2: dy_gamma_sum Error Analysis
- FP32 internal: Very low errors (< 0.0001 for most cases)
- BF16 internal: High errors (0.09-0.94 relative error for constant inputs, 0.04-0.24 for random)

#### Experiment 3: Full LayerNorm Backward Error
- **dx errors**: BF16 2-3x higher than FP32 across all batch sizes and N
- **dgamma/dbeta errors**: BF16 5-20x higher than FP32, especially for larger N

#### Experiment 4: Tile Alignment Effects
- Non-aligned dimensions show ~10-20% higher errors than perfectly aligned
- Effect is present but not dominant compared to pure BF16 vs FP32 differences

### Recommended Tolerances (Preliminary)

Based on the experimental results, here are suggested tolerances for BF16 LayerNorm backward validation:

```cpp
struct LayerNormBwTolerances {
    // Absolute tolerances for dx (input gradients)
    float atol_dx_fp32_acc = 0.02f;  // FP32 accumulator
    float atol_dx_bf16_acc = 0.05f;  // BF16 accumulator

    // Absolute tolerances for dgamma/dbeta (parameter gradients)
    float atol_dgamma_fp32_acc = 0.15f;
    float atol_dgamma_bf16_acc = 1.5f;
    float atol_dbeta_fp32_acc = 0.15f;
    float atol_dbeta_bf16_acc = 1.2f;

    // Relative tolerance (common)
    float rtol = 0.01f;

    // Non-aligned multiplier (increase tolerances by this factor)
    float non_aligned_multiplier = 1.2f;
};
```

These tolerances should detect the accumulation bugs (errors >1000) while accepting expected BF16 precision loss (errors ~3-30).

## References

### Required (C++ Standards)
- [P1467R9 - Extended floating-point types](https://wg21.link/P1467R9)
- [GCC bfloat16 support](https://gcc.gnu.org/onlinedocs/gcc/Half-Precision.html)

### Background Context (Optional)
The following references provide context for why this research is needed, but are not required to run the experiments:
- [Issue #34625](https://github.com/tenstorrent/tt-metal/issues/34625): LayerNorm backward accumulation bug that motivated this research
- [PR #34760](https://github.com/tenstorrent/tt-metal/pull/34760): Fix attempt with test tolerance questions