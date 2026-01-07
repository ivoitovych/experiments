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

- build each `*.cpp` into an executable (same basename)
- run each built ELF executable with a 20s timeout
- write logs to `run_logs/`:
  - `build.log`, `build_failures.log`
  - `run.log`, `run_timeouts.log`
  - `<program>.out`, `<program>.err` for each program

---

### Programs (high-signal)

- **ULP mapping / tests**
  - `ulp_calculator_test.cpp` → `ulp_test`
  - Validates: total index count, NaN exclusion, `+0/-0` collapse, adjacency in index space.

- **Full-scan saturation bounds (finite bf16 only)**
  - `gelu_saturation_bounds_fullscan.cpp` → `gelu_sat_full`
  - Enumerates all numeric finite bf16 values and scans from range ends:
    - negative tail: last `x` with `bf16(gelu(x)) == 0`
    - positive tail: smallest `x` where `bf16(gelu(x)) == x` holds for all larger bf16 values

- **Full-range binning table (50 equal-count bins)**
  - `gelu_saturation_binned_50.cpp` → `gelu_sat_bins`
  - Builds a sorted vector of all finite bf16 numeric values, computes `bf16(gelu(x))`, then prints a 50-bin min/max table for both `x` and `y`.

- **Spot-check table for specific x values**
  - `gelu_values_table.cpp` → `gelu_values_table`
  - Prints fp64 `gelu(x)` and bf16( gelu(x) ) value + raw bf16 hex bits for a fixed set of inputs.

- **Piecewise polynomial harness (experimental)**
  - `piecewise_deg4_fit_and_analyze.cpp` → `piecewise_fit`
  - Experimental least-squares degree-4 per-segment fits and per-segment ULP stats. Intended as a scaffold; it does not yet optimize directly for ULP.

---

### Notes / gotchas

- **Why `erfc` reference matters**: the naive `0.5*(1+erf(...))` in fp64 can underflow to **exact 0** in the negative tail due to cancellation. That invalidates saturation research. `gelu_ref.h` uses `erfc` to prevent that.

- **Saturation depends on the arithmetic model**:
  - Current “final-round-only” model is `bf16(gelu_ref_fp64(x))`.
  - If your hardware quantizes `Phi` first, or rounds after each op, thresholds will shift.

- **Repo hygiene**:
  - This branch is intentionally **source-only**. `.gitignore` ignores all generated binaries and `run_logs/`.

---

### Reference document

See `GELU_reference_saturation_report.md` for the research rationale and discussion of:

- stable reference formulas (`erfc`)
- FTZ/DAZ impact
- rounding-mode sensitivity
- correctly-rounded “golden” reference suggestions (MPFR)


