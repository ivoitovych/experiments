### Instructions (significant / “golden” rules)

This document captures the significant, non-negotiable instructions for this research branch.

---

### Reference GELU (must be stable in tails)

#### Definition

Use:

- \(\mathrm{GELU}(x) = x \cdot \Phi(x)\)
- \(\Phi(x) = \frac12(1 + \mathrm{erf}(x/\sqrt2))\)

#### Stability requirement

Do **not** compute `Phi(x)` as `0.5*(1+erf(...))` for all `x` in fp64; it can catastrophically cancel for large negative `x` and spuriously produce exact zero.

Use the stable `erfc` form (implemented in `gelu_ref.h`):

- **If `x < 0`**
  - `Phi(x) = 0.5 * erfc((-x)/sqrt(2))`
  - `GELU(x) = 0.5 * x * erfc((-x)/sqrt(2))`

- **If `x >= 0`**
  - `Phi(x) = 1 - 0.5 * erfc(x/sqrt(2))`
  - `GELU(x) = x - 0.5 * x * erfc(x/sqrt(2))`

Always use `gelu_ref_fp64(double x)` from `gelu_ref.h` in research tools.

---

### bf16 type usage (consistency)

Use `std::bfloat16_t` everywhere.

When using an alias, use:

- `using bf16 = std::bfloat16_t;`

Avoid relying on `using namespace std;` to make `bfloat16_t` appear unqualified.

---

### ULP distance rules for bf16

The project uses the following ULP definition for bfloat16:

- **NaNs excluded** from the ordering
- **`+0` and `-0` share the same ULP index**
- ULP distance:
  - `ulp(a,b) = abs(index(a) - index(b))`

Implementation:

- `ulp_calculator.h`

Validation:

- `ulp_calculator_test.cpp` (`ulp_test`) must pass.

---

### Saturation threshold measurement (the “right” way)

To measure saturation thresholds in bf16 reproducibly:

1. Enumerate **all bf16 bit patterns**.
2. Exclude **NaNs and infinities** (finite numeric bf16 only).
3. Sort by numeric value using a strict total order.
4. For each input bf16 `x`, compute:
   - `y_ref = bf16(gelu_ref_fp64(double(x)))`
5. Determine:
   - **negative tail saturation to 0**: last `x < 0` where `y_ref == 0`
   - **positive tail saturation to identity**: smallest `x > 0` such that for all larger bf16 values, `y_ref == x`

Tool:

- `gelu_saturation_bounds_fullscan.cpp` (build: `gelu_sat_full`)

---

### Full-range binning report

To produce a coarse overview of saturation across the entire bf16 numeric range:

1. Build the full sorted vector of all finite bf16 values.
2. Compute the reference bf16 GELU output for each.
3. Split the domain into **50 equal-count bins**.
4. Report per-bin:
   - `x_min, x_max, y_min, y_max`
   - flags: `all(y==0)` and `all(y==x)`

Tool:

- `gelu_saturation_binned_50.cpp` (build: `gelu_sat_bins`)

---

### Running everything under WSL

From WSL Ubuntu 24.04:

```bash
cd /mnt/c/Users/IaroslavVoitovych/CursorProjects/experiments
bash ./run_all_wsl.sh
```

Artifacts:

- `run_logs/` (build/run logs and per-program stdout/stderr)

Note: `run_logs/` and binaries are intentionally ignored by git.

---

### MPFR cross-check (optional golden validation)

If you have MPFR installed in WSL, you can validate that our single canonical reference
`gelu_ref_fp64()` (stable `erfc` form) agrees with an MPFR 256-bit reference after
deterministic `float -> bf16` RNE rounding over the **entire finite bf16 input domain**.

#### Prereqs (Ubuntu/WSL)

```bash
sudo apt-get update
sudo apt-get install -y libmpfr-dev libgmp-dev
```

#### Build + run

```bash
cd /mnt/c/Users/IaroslavVoitovych/CursorProjects/experiments
g++ -std=c++23 -O2 -o mpfr_gelu_validate mpfr_gelu_validate.cpp -lmpfr -lgmp -lm
./mpfr_gelu_validate
```

#### Expected output

- It reports the number of finite bf16 inputs checked (should be **65280**).
- It reports the mismatch count between:
  - MPFR 256-bit erfc-based GELU → float → bf16(RNE)
  - `gelu_ref_fp64` erfc-based GELU → float → bf16(RNE)

A mismatch count of **0** means the current fp64 reference is sufficient for bf16-rounding
studies under this rounding model.


