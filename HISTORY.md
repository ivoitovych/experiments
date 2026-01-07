### History (chronological)

#### 2026-01-07

- **Created orphan branch**
  - Created orphan branch `feature/dopri_research` from an existing repo state.
  - Removed staged files from the orphan branch so it started “source-only”.
  - Created an initial empty root commit on the orphan branch.

- **Fixed remote + pushed branch**
  - Initial push failed due to permission on `git@github.com:ivoitovych/experiments.git`.
  - Updated remote to `git@github-alt:ivoitovych/experiments.git`.
  - Successfully pushed `feature/dopri_research` and set upstream tracking.

- **Cleaned working directory (initial)**
  - Removed leftover untracked files using `git clean -fd` (so the orphan branch started clean).

- **Validated WSL environment**
  - Confirmed WSL2 is available and Ubuntu 24.04.3 LTS is installed.
  - Confirmed `g++ (Ubuntu 13.3.0)` is available and `-std=c++23` works.
  - Confirmed `<stdfloat>` / `std::bfloat16_t` is available under this toolchain.

- **Implemented bf16 ULP infrastructure**
  - Added a bf16 ULP indexer that:
    - excludes all NaNs from ordering
    - uses a strict total order mapping for bf16 bit patterns
    - collapses `+0` and `-0` to the same ULP index
  - Added a unit test suite to validate:
    - total index count
    - `+0/-0` collapse
    - adjacency in ULP index space
    - special values behavior

- **Corrected reference GELU**
  - Discovered that the naive fp64 formula `0.5*(1+erf(...))` can catastrophically cancel in the negative tail and incorrectly return exact zero.
  - Implemented a stable fp64 reference in `gelu_ref.h` using `erfc`:
    - `x < 0`: `0.5*x*erfc((-x)/sqrt(2))`
    - `x >= 0`: `x - 0.5*x*erfc(x/sqrt(2))`
  - Updated all research tools to use `gelu_ref_fp64()` for consistency.

- **Saturation analyses**
  - Implemented a full-scan saturation tool over all finite bf16 inputs:
    - negative tail: last `x` where `bf16(gelu_ref(x)) == 0`
    - positive tail: smallest `x` where `bf16(gelu_ref(x)) == x` for all larger bf16 values
  - Implemented a full-range “50 equal-count bins” report:
    - enumerate all finite bf16 numeric values
    - compute `bf16(gelu_ref_fp64(x))`
    - print per-bin `x_min/x_max` and `y_min/y_max`, plus flags for `y==0` / `y==x`
  - Implemented a spot-check table tool for selected inputs (e.g. -14..-7) printing:
    - fp64 `gelu(x)`
    - bf16-rounded value
    - bf16 raw hex bits

- **Piecewise approximation scaffold**
  - Implemented an experimental 8-segment degree-4 polynomial fitting + per-segment ULP reporting scaffold (not yet ULP-optimized).

- **Automation for reproducibility**
  - Added `run_all_wsl.sh` to rebuild every `*.cpp`, run each executable under WSL, and capture logs in `run_logs/`.

- **Documentation**
  - Added/updated `README.md` describing:
    - stable reference GELU (erfc-based)
    - bf16 ULP definition and validation
    - how to run saturation scans and binning reports under WSL
    - how to run `run_all_wsl.sh` and interpret `run_logs/`
  - Added `.gitignore` to keep the branch source-only (ignore binaries, `run_logs/`, etc).

- **Commit + push**
  - Created a comprehensive commit with all source/docs/scripts and pushed it to `origin/feature/dopri_research`.

- **Cleaned ignored artifacts (final)**
  - Ran `git clean -ffxd` to remove generated binaries and `run_logs/` from the working tree, keeping the repo clean.


