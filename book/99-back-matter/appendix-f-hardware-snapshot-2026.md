# Appendix F. 2026 Hardware Snapshot

[← Previous: Appendix E. Glossary](appendix-e-glossary.md) · [Table of Contents](../../README.md) · [Next: Index →](index.md)

> **Status:** draft · **Phase:** 4 · **Sections drafted:** 8 / 8

This appendix is a deliberately *perishable* snapshot of the quantum
hardware landscape as of early 2026. It is isolated here, rather than
scattered through the main chapters, so that the time-sensitive numbers
live in one place and can be replaced wholesale on each revision without
disturbing the conceptual material. Chapters 20–22 explain the underlying
physics, architectures, and metrics; this appendix only pins down "where
the machines roughly are right now."

> **How to read every number here.** Treat each figure as an order of
> magnitude with a date attached, not a specification. Vendor qubit counts,
> fidelities, and "logical qubit" claims move fast and are reported under
> non-uniform conditions. Where a claim is contested, this appendix says so.
> Apply the discipline of [Chapter 36](../part-13-perspective-and-direction/36-how-to-judge-claims.md)
> before repeating any single figure as fact.

## F.1 How to Read This Snapshot

Three caveats dominate any hardware comparison.

First, **qubit count is the least informative single number.** A device with
1,000 noisy, sparsely connected qubits may run shallower useful circuits than
one with 50 high-fidelity, all-to-all-connected qubits. Always pair a count
with two-qubit gate fidelity, connectivity, and coherence.

Second, **fidelities are reported under favorable, non-standardized
conditions.** "Median two-qubit fidelity" from randomized benchmarking, a
best-pair number, and a full-device average can differ by an order of
magnitude. Cross-vendor comparison requires reading the methodology, not the
headline.

Third, **"logical qubit" is now a marketing term as well as a technical
one.** A genuine below-threshold logical qubit (error decreasing as code
distance grows) is a different achievement from a small error-detection demo.
Section F.7 separates the two.

## F.2 Superconducting Qubits

The most industrially mature platform by deployed scale.

- **IBM** ships the Heron family (roughly 133–156 physical qubits per chip)
  with tunable couplers and median two-qubit error rates in the low
  $10^{-3}$ range. The 1,121-qubit Condor (2023) demonstrated fabrication
  scaling rather than high-fidelity computation; IBM's stated direction is
  modular, multi-chip systems and quantum-LDPC error correction rather than
  ever-larger monolithic chips.
- **Google** reported below-threshold error suppression on its ~105-qubit
  Willow processor in late 2024: logical error rate fell as the surface-code
  distance grew from 3 to 5 to 7. This is the most significant superconducting
  error-correction result to date (see F.7).
- **Others:** Rigetti (Ankaa-class), IQM, OQC, and academic groups (e.g. USTC's
  Zuchongzhi line) operate in the tens-to-low-hundreds of qubits.

Superconducting strengths are nanosecond gate times and a mature fabrication
base. The trade-offs are millikelvin dilution-refrigerator operation, mostly
nearest-neighbor connectivity on a fixed lattice, and coherence times
typically in the $100$–$300\ \mu s$ range.

## F.3 Trapped-Ion Qubits

The fidelity and connectivity leader at modest qubit counts.

- **Quantinuum** operates H-series QCCD machines (H2 in the ~50-qubit range)
  with all-to-all connectivity via ion shuttling, two-qubit fidelities around
  99.8–99.9%, and very high state-preparation-and-measurement fidelity.
- **IonQ** markets "algorithmic qubits" (Forte and Forte Enterprise in the
  ~30-qubit effective range), using trapped ytterbium/barium ions.

Ions offer the best per-gate fidelity and native all-to-all connectivity,
which reduces SWAP overhead dramatically. The cost is slow gates (microseconds
to milliseconds) and harder scaling: growth relies on shuttling within QCCD
architectures and, prospectively, photonic interconnects between traps.

## F.4 Neutral-Atom Qubits

The fastest-moving platform on array size and reconfigurability.

- **QuEra** runs Aquila, a 256-atom Rydberg system, primarily in analog mode;
  the 2023 Harvard/MIT/QuEra collaboration demonstrated 48 logical qubits with
  transversal operations, a landmark for the platform.
- **Atom Computing** demonstrated arrays exceeding 1,000 atomic sites (2023).
- **Pasqal**, **Infleqtion**, and others operate hundreds-of-atom systems with
  both analog and digital modes.

Neutral atoms combine large, optically reconfigurable arrays with connectivity
that can be rearranged by moving atoms with optical tweezers. Two-qubit
(Rydberg) gate fidelities around 99.5% and improving, plus maturing mid-circuit
measurement, make this the platform to watch for near-term logical-qubit work.

## F.5 Photonic, Spin, and Topological Approaches

- **Photonic.** Xanadu (Borealis Gaussian-boson-sampling advantage claim,
  2022; networked modular systems since) and PsiQuantum (fusion-based,
  fault-tolerance-first, silicon-photonics fabrication at scale) pursue
  measurement-based and fusion-based models. Room-temperature optics and
  natural networking are attractive; deterministic photon sources and loss
  remain the central engineering problems.
- **Spin qubits in silicon.** Intel (Tunnel Falls, 12 qubits), Diraq, QuTech,
  and Quantum Motion exploit CMOS-compatible fabrication. Counts are small but
  two-qubit fidelities above 99% in Si/SiGe and the promise of leveraging the
  semiconductor industry keep this a long-horizon contender.
- **Topological.** Microsoft announced "Majorana 1" (early 2025), claiming a
  topological-qubit "topoconductor." The underlying Majorana-zero-mode evidence
  has been contested in the literature, so this should be treated as a research
  claim under active scrutiny rather than an established computing platform —
  a textbook case for the claim-evaluation methodology of Chapter 36.

## F.6 Cross-Cutting Metrics at a Glance

Representative, order-of-magnitude figures as of early 2026. Read alongside
the caveats in F.1; these are not benchmark results.

| Platform        | Qubit scale (2026) | 2-qubit fidelity | Gate time | Connectivity        | Operating temp. |
|-----------------|--------------------|------------------|-----------|---------------------|-----------------|
| Superconducting | 100–1000+          | ~99.5–99.9%      | ~10–100 ns| nearest-neighbor    | ~10–20 mK       |
| Trapped ion     | 10–60              | ~99.8–99.9%      | ~1–100 µs | all-to-all          | room temp (trap)|
| Neutral atom    | 100–1000+          | ~99–99.7%        | ~0.1–1 µs | reconfigurable      | µK (laser-cooled)|
| Spin (silicon)  | <20                | ~99%+            | ~10–100 ns| nearest-neighbor    | ~100 mK–1 K     |
| Photonic        | varies (modes)     | n/a (loss-bound) | ~ns optics| network/measurement | room temp       |

## F.7 Error-Correction and Logical-Qubit Milestones

The field crossed several thresholds between 2023 and 2025, but remains
pre-fault-tolerant at useful scale.

- **Below threshold (superconducting).** Google's Willow result (2024) showed
  a surface-code logical qubit whose error rate *decreased* with increasing
  code distance — the defining signature of a working error-correction regime.
- **Logical operations (trapped ion / neutral atom).** Quantinuum and
  collaborators demonstrated small numbers of logical qubits with logical
  error rates below the physical rate; the Harvard/QuEra 48-logical-qubit
  experiment (2023) showed transversal logical operations on neutral atoms.
- **Overhead reduction.** Quantum-LDPC codes (e.g. bivariate-bicycle "gross"
  codes) promise far lower physical-to-logical overhead than the surface code,
  and feature prominently in IBM's stated path toward a fault-tolerant machine
  later this decade.

The honest summary: below-threshold behavior has been shown in specific
systems, logical-qubit *demonstrations* are small, and no platform yet runs
deep, fault-tolerant logical algorithms at application scale. See
[Chapter 19](../part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md)
for the theory and [Chapter 25](../part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md)
for what this means for near-term practice.

## F.8 How This Snapshot Will Age

The fastest-moving figures are qubit counts and logical-qubit demonstrations;
expect both to be stale within a year. Two-qubit fidelities and coherence
times move more slowly. Architectural direction (modular superconducting,
QCCD-plus-photonics for ions, reconfigurable neutral-atom arrays, qLDPC codes)
is the most stable signal and the best thing to track.

When revising, replace this appendix wholesale rather than patching individual
numbers, and re-verify every figure against primary sources — peer-reviewed
papers and dated vendor roadmaps — using the claim-evaluation checklist in
[Chapter 36](../part-13-perspective-and-direction/36-how-to-judge-claims.md).
The platform physics and metric *definitions* in
[Chapters 20–22](../part-09-hardware-and-software/20-quantum-hardware-platforms.md)
do not expire; only the values here do.

---

[← Previous: Appendix E. Glossary](appendix-e-glossary.md) · [Table of Contents](../../README.md) · [Next: Index →](index.md)
