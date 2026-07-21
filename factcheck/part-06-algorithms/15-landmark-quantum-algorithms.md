# Factcheck — §15 Landmark Quantum Algorithms

Mirrors `book/part-06-algorithms/15-landmark-quantum-algorithms.md`.
Seeded from ledger Pass 2 and Pass 6 (2026-05-28).

## §15.3 — Gidney–Ekerå (2019) RSA-2048 estimate

- **Claim** (anchor): "$\sim 20$ million physical qubits, $\sim 8$ hours of runtime, magic-state distillation dominating the cost"
- **Method**: external
- **Source**: Gidney & Ekerå, *Quantum* (2021), arXiv:1905.09749 — https://arxiv.org/abs/1905.09749
- **Verified**: 2026-05 · **Verdict**: confirmed (now cited explicitly)

## §15.3 — Gidney (2025) RSA-2048 estimate

- **Claim** (anchor): "under 1 million physical qubits, under one week — a $>20\times$ qubit reduction"
- **Method**: external
- **Source**: Gidney, arXiv:2505.15917 (May 2025); Google Research publication — https://arxiv.org/abs/2505.15917
- **Verified**: 2026-05 · **Verdict**: **updated** — supersedes the prior unsourced "~10M / ~10h / ~7×10⁹ Toffoli" intermediate numbers. Key innovations: approximate residue arithmetic (Chevignard–Fouque–Schrottenloher 2024), yoked surface codes (Gidney–Newman–Brooks–Jones 2023), smaller magic-state-distillation budget.

## §15.3 — RSA-2048 logical-qubit count

- **Claim** (anchor): order of a few thousand logical qubits
- **Method**: external + derivation
- **Source**: both Gidney papers; consistent with `2d²` surface-code overhead at d in the high twenties
- **Verified**: 2026-05 · **Verdict**: confirmed (matches the internal-consistency fix in commit `2e046d0`)

## §15.8 — VQE shot budget

- **Claim** (anchor): ~50-orbital active space → $10^9$–$10^{12}$ shots, several days of device time
- **Method**: external
- **Source**: Cao–Romero–Aspuru-Guzik (2019) chemistry-VQE review; subsequent shot-reduction work (Pauli grouping, classical shadows, derandomization)
- **Verified**: 2026-05 · **Verdict**: confirmed (order-of-magnitude defensible)
- **Comment**: **open** — a specific 2024–2026 paper for this shot-budget estimate is still wanted (carried over from the ledger's open-items list).

## §15.10 — QML state of the field

- **Claim** (anchor): dequantization of HHL-style ML; barren plateaus in VQNNs; modest empirical quantum-kernel advantage; structural advantages for learning *quantum* data
- **Method**: external
- **Source**: Tang (STOC 2019) and follow-ups; barren-plateau literature (McClean et al. 2018, Cerezo et al. 2021); Huang et al. shadow-tomography lines
- **Verified**: 2026-05 · **Verdict**: confirmed

## References (external)

This file's cards cite the sources listed in the chapter's final
[References section](../../book/part-06-algorithms/15-landmark-quantum-algorithms.md#references). Author policy (2026-07):
references live with the text they support — at the bottom of the
book file itself — and are not duplicated here.
