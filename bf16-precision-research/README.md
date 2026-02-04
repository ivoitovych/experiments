# bf16 precision research (LayerNorm backward tolerances)

This folder implements a small, self-contained CPU simulation to derive realistic test tolerances for **LayerNorm backward** when inputs/outputs are bf16.

The implementation follows the research outline in `RESEARCH-bfloat16-tolerances.md` (functions, experiments, and expected outputs).

## Build

Requires a compiler that supports C++23. If `std::bfloat16_t` is available via `<stdfloat>` it will be used; otherwise a software bf16 fallback is used.

```bash
make
```

## Run

Print report to stdout:

```bash
./bf16_sim
```

Write report to a file:

```bash
./bf16_sim --out RESULTS.md
```

Control RNG seed / number of trials:

```bash
./bf16_sim --seed 123 --trials 100 --out RESULTS.md
```

## Outputs

The program prints a Markdown report containing:

- Experiment 1: `reduce_sum` accumulation error vs N
- Experiment 2: `dy_gamma_sum` error vs N and input distribution
- Experiment 3: full LayerNorm backward error (`dx`, `dgamma`, `dbeta`)
- Experiment 4: tile-aligned vs non-aligned multiplier (tile=32)
- A recommended tolerance set and an example helper function

