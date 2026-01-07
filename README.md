### GELU bfloat16 research (WSL Ubuntu 24.04, G++ C++23)

This branch contains a reproducible research harness for **GELU in bfloat16**, focused on:

- **Stable reference GELU** in fp64 (tail-safe) and **bf16 quantization**
- **Exact saturation bounds** in bf16 (where bf16(gelu(x)) becomes exactly `0` or exactly `x`)
- **ULP distance** for bf16 with correct ordering and `+0/-0` collapsed
- Utilities to generate **full-range reports** and **binning tables**

---

### Key definitions

- **GELU**:
  \[
  \mathrm{GELU}(x)=x\cdot \Phi(x),\qquad
  \Phi(x)=\frac12\left(1+\mathrm{erf}\left(\frac{x}{\sqrt2}\right)\right)
  \]

- **Stable fp64 reference** (avoids catastrophic cancellation in negative tail):
  - For `x < 0`: `Phi(x) = 0.5 * erfc((-x)/sqrt(2))` ⇒ `GELU(x) = 0.5*x*erfc((-x)/sqrt(2))`
  - For `x >= 0`: `Phi(x) = 1 - 0.5 * erfc(x/sqrt(2))` ⇒ `GELU(x) = x - 0.5*x*erfc(x/sqrt(2))`

  Implemented in `gelu_ref.h` as `gelu_ref_fp64(double x)`.

- **Reference bf16 value** used throughout reports:
  - `ref_bf16 = bf16(gelu_ref_fp64(double(x_bf16)))`

- **ULP distance (bf16)**:
  - NaNs are excluded from the ordering
  - `+0` and `-0` map to the same ULP index
  - ULP distance is `abs(index(a) - index(b))`

  Implemented in `ulp_calculator.h` and validated in `ulp_calculator_test.cpp`.

---

### Environment

Tested under:

- **WSL Ubuntu 24.04**
- **g++ 13.3.0** with `-std=c++23`

All programs are intended to be built and run under WSL from the repo root:

```bash
cd /mnt/c/Users/IaroslavVoitovych/CursorProjects/experiments
```

---

### Quick start

Run the full rebuild + run harness:

```bash
bash ./run_all_wsl.sh
```

It will:

- build each `*.cpp` into an executable (**same basename as the `.cpp` file**)
- run each built ELF executable with a 20s timeout
- write logs to `run_logs/`:
  - `build.log`, `build_failures.log`
  - `run.log`, `run_timeouts.log`
  - `<program>.out`, `<program>.err` for each program

---

### Programs (high-signal)

- **ULP mapping / tests**
  - `ulp_calculator_test.cpp` → `ulp_calculator_test`
  - Validates: total index count, NaN exclusion, `+0/-0` collapse, adjacency in index space.

- **Full-scan saturation bounds (finite bf16 only)**
  - `gelu_saturation_bounds_fullscan.cpp` → `gelu_saturation_bounds_fullscan`
  - Enumerates all numeric finite bf16 values and scans from range ends:
    - negative tail: last `x` with `bf16(gelu(x)) == 0`
    - positive tail: smallest `x` where `bf16(gelu(x)) == x` holds for all larger bf16 values

- **Full-range binning table (50 equal-count bins)**
  - `gelu_saturation_binned_50.cpp` → `gelu_saturation_binned_50`
  - Builds a sorted vector of all finite bf16 numeric values, computes `bf16(gelu(x))`, then prints a 50-bin min/max table for both `x` and `y`.

- **Spot-check table for specific x values**
  - `gelu_values_table.cpp` → `gelu_values_table`
  - Prints fp64 `gelu(x)` and bf16( gelu(x) ) value + raw bf16 hex bits for a fixed set of inputs.

- **Piecewise polynomial harness (experimental)**
  - `piecewise_deg4_fit_and_analyze.cpp` → `piecewise_deg4_fit_and_analyze`
  - Experimental least-squares degree-4 per-segment fits and per-segment ULP stats. Intended as a scaffold; it does not yet optimize directly for ULP.

 - **Piecewise polynomial under HW model (bf16 in → fp32 compute → bf16 out)**
   - `piecewise_deg4_fit_fp32_hw.cpp` → `piecewise_deg4_fit_fp32_hw`
  - Fits **32 segments × degree-4** under the HW model and reports a per-segment table with:
     - ULP mean/max
     - absolute error mean/max
     - relative error mean/max (for `ref != 0`)
   - Uses the **HW model reference**: `ref_bf16 = bf16_RNE(float(gelu_ref_fp64(float(x_bf16))))`
  - Segment placement is **optimized**, not fixed-width, and targets the actual objective:
    - **bf16-rounding-aware coefficient fitting** (projects predictions into the float interval that rounds to the target bf16) so we optimize bf16 output bins / ULP, not fp32 value L2 error
    - greedy split placement to reduce global worst-case `ulp_max`
    - iterative boundary “nudging” pass to smooth peaks (without increasing global max `ulp_max`)
    - optional “budget recycling” (merge easy `ulp_max==0` areas to free budget for splitting hard regions)
  - Tip: to avoid terminal line-wrapping, write the table to a file:

```bash
./piecewise_deg4_fit_fp32_hw --out run_logs/piecewise_deg4_fit_fp32_hw_table.txt --no-coeff
```

 - **Full-range error dump + plot (by bf16 value index; HW model)**
   - `dump_errors_by_index_hw.cpp` → `dump_errors_by_index_hw`
   - Exports per-finite-bf16-index rows to CSV and generates an interactive HTML plot:
     - `run_logs/errors_by_index_hw.csv`
     - `run_logs/errors_by_index_hw.html`
   - Plot shows 3×2 panels:
     - left: errors vs **bf16 index** (finite-only ULP order; `+0/-0` is one index)
     - right: same errors vs **numeric x**
   - Plot overlays segment bands + boundary markers.

 - **MPFR validation (optional “golden” cross-check)**
   - `mpfr_gelu_validate.cpp` → `mpfr_gelu_validate`
   - If MPFR dev headers are installed, validates that bf16-rounded outputs from:
     - MPFR 256-bit erfc-based reference
     - `gelu_ref_fp64` erfc-based reference
     agree across the full finite bf16 input domain.

---

### Current measured saturation bounds (stable reference)

With the current reference model:

- `y_ref_bf16 = bf16(gelu_ref_fp64(double(x_bf16)))`
- `gelu_ref_fp64()` implemented via the stable `erfc` form in `gelu_ref.h`

The full-scan tool (`gelu_saturation_bounds_fullscan.cpp`) reports:

- **Negative tail saturation to zero**:
  - last `x < 0` with `y_ref_bf16 == 0`: **-13.5625** (bf16 bits `0xC159`)
  - next `x` above is **-13.5** (bf16 bits `0xC158`) with `y_ref_bf16 == -9.1835496158e-41` (min bf16 subnormal)

- **Positive tail saturation to identity** (`y_ref_bf16 == x_bf16`):
  - last mismatch: **2.765625** (bf16 bits `0x4031`)
  - saturation starts at: **2.78125** (bf16 bits `0x4032`)

---

### Notes / gotchas

- **Why `erfc` reference matters**: the naive `0.5*(1+erf(...))` in fp64 can catastrophically cancel in the negative tail, producing spuriously tiny/zero results and breaking saturation studies. `gelu_ref.h` uses `erfc` to prevent that.

- **Saturation depends on the arithmetic model**:
  - Current “final-round-only” model is `bf16(gelu_ref_fp64(x))`.
  - If your hardware quantizes `Phi` first, or rounds after each op, thresholds will shift.
  - This repo now also contains tools for the **HW model**: bf16 inputs, fp32 internal math, bf16 output (RNE).

- **Repo hygiene**:
  - This branch is intentionally **source-only**. `.gitignore` ignores all generated binaries and `run_logs/`.

---

### Reference document

See `GELU_reference_saturation_report.md` for the research rationale and discussion of:

- stable reference formulas (`erfc`)
- FTZ/DAZ impact
- rounding-mode sensitivity
- correctly-rounded “golden” reference suggestions (MPFR)


