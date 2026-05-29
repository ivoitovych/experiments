# Factcheck — §8 Quantum Gates

Mirrors `book/part-04-gates-and-circuits/08-quantum-gates.md`.
Seeded from ledger Pass 5 (2026-05-28). Scope so far: §8.12 native gate sets.

## §8.12 — IBM Heron native two-qubit gate

- **Claim** (anchor): IBM Heron native 2-qubit gate is CZ via tunable couplers (vs cross-resonance CNOT on earlier fixed-coupling IBM devices)
- **Method**: external
- **Source**: IBM Quantum Developer Conference 2024; postquantum.com Heron r2 brief
- **Verified**: 2026-05 · **Verdict**: **updated** — was "CNOT (IBM)", true only for older Eagle-class / fixed-coupling devices

## §8.12 — Google superconducting native two-qubit gates

- **Claim** (anchor): CZ (Willow-class) / iSWAP-family (Sycamore-class)
- **Method**: external
- **Source**: Acharya et al. *Nature* (2024) Willow paper; Google QAI prior work
- **Verified**: 2026-05 · **Verdict**: confirmed (clarified the device-class split)

## §8.12 — Trapped-ion native gates

- **Claim** (anchor): single-qubit rotations + Mølmer–Sørensen XX(θ); typically all-to-all
- **Method**: external
- **Source**: IonQ docs; Quantinuum H-series docs
- **Verified**: 2026-05 · **Verdict**: confirmed

## §8.12 — Neutral-atom native gates

- **Claim** (anchor): global single-qubit + Rydberg CZ / multi-qubit blockade
- **Method**: external
- **Source**: QuEra Aquila paper; Pasqal docs
- **Verified**: 2026-05 · **Verdict**: confirmed

## §8.12 — Photonic / MBQC native operations

- **Claim** (anchor): state preparation, beam-splitter/phase shifters, adaptive measurements; gate model from fusion / cluster-state pattern
- **Method**: external
- **Source**: generic platform-physics description
- **Verified**: 2026-05 · **Verdict**: confirmed
