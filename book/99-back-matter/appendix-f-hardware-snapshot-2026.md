# Appendix F. 2026 Hardware Snapshot

> **Status:** prereviewed · **Phase:** 4 · **Sections drafted:** 9 / 9

[← Previous: Appendix E. Glossary](appendix-e-glossary.md) · [Table of Contents](../../README.md) · [Next: Index →](index.md)

This appendix is a deliberately *perishable* snapshot of the quantum
hardware landscape as of early 2026. It is isolated here, rather than
scattered through the main chapters, so that the time-sensitive numbers
live in one place and can be replaced wholesale on each revision without
disturbing the conceptual material. Chapters 20–22 explain the underlying
physics, architectures, and metrics; this appendix only pins down "where
the machines roughly are right now."

> **Moving-target warning — snapshot as of May 2026.** This entire appendix is a dated snapshot: the qubit counts, fidelities, and "logical qubit" claims throughout were accurate to the best sources available in May 2026 and *date quickly*. Treat each figure as an order of magnitude with a date attached, not a specification — vendor numbers are reported under non-uniform conditions, and where a claim is contested this appendix says so. Apply the discipline of [Chapter 36](../part-13-perspective-and-direction/36-how-to-judge-claims.md) before repeating any single figure as fact, and if you are reading a draft, re-verify every specific number against current vendor, preprint, or journal sources before relying on it. The dated verification trail is in the project's fact-check ledger.

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

- **Quantinuum** operates H-series QCCD machines (H2 at 56 trapped-ion qubits)
  with all-to-all connectivity via ion shuttling, median two-qubit fidelity
  around 99.9% (best-pair >99.91%), and very high
  state-preparation-and-measurement fidelity.
- **IonQ** markets "algorithmic qubits" — a proprietary
  benchmark-derived figure, not a physical- or logical-qubit count.
  Its 100-qubit Tempo system *achieved* #AQ 64 in September 2025
  (per IonQ's announcement — ahead of its own schedule), and Forte
  Enterprise is specified at #AQ 36 on IonQ's current product page;
  the systems use trapped ytterbium and, per the announced roadmap,
  barium ions.

Ions report the highest published two-qubit gate fidelities among
gate-model platforms (no standardized cross-platform benchmark
exists) and native all-to-all connectivity,
which reduces SWAP overhead dramatically. The cost is slow gates (microseconds
to milliseconds) and harder scaling: growth relies on shuttling within QCCD
architectures and, prospectively, photonic interconnects between traps.

## F.4 Neutral-Atom Qubits

The fastest-moving platform on array size and reconfigurability.

- **QuEra** runs Aquila, a 256-atom Rydberg system, primarily in
  analog mode. The 2023 Harvard/MIT/QuEra collaboration (Bluvstein
  et al., *Nature*) demonstrated 48 *encoded* logical qubits with
  transversal operations and error detection in a laboratory
  experiment — a landmark, though not 48 general-purpose
  fault-tolerant logical qubits — and follow-up work reported
  through 2025 extends the line to larger encoded-qubit counts
  (QuEra's own summaries cite up to 96) and first
  magic-state-distillation demonstrations.
- **Atom Computing** demonstrated arrays exceeding 1,000 atomic
  sites (a 1,180-site array, 2023) — array *sites*, which is not
  the same as that many simultaneously controlled, high-fidelity
  qubits.
- **Pasqal**, **Infleqtion**, and others operate systems in the
  hundreds-to-thousands-of-atom range; analog and digital
  capabilities vary product by product rather than holding across
  every vendor. Pasqal's earlier roadmap targeted roughly 1,000
  physical qubits by the end of 2025 and a 250-qubit "advantage"
  demonstration (vendor-defined) in 2026; the 2025 target date has
  now passed, so check the roadmap's achieved/missed/revised status
  against current company statements rather than reading it
  prospectively.

Neutral atoms combine large, optically reconfigurable arrays with connectivity
that can be rearranged by moving atoms with optical tweezers. Reported two-qubit (Rydberg) gate fidelities are around 99.5% —
with selected vendor reports higher, and moving quickly — and
mid-circuit measurement is maturing (capability varies by product);
together these have made the platform a focus of near-term
logical-qubit work.

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
- **Topological.** Microsoft announced "Majorana 1" (February
  2025), marketing a topological-qubit "topoconductor." Keep the
  layers of the claim separate: the accompanying *Nature* paper
  reports materials and parity-readout results and does not by
  itself establish a scalable topological qubit; the company's QPU
  framing goes beyond the paper; and the underlying
  Majorana-zero-mode evidence has been contested in the
  literature. Treat the whole as a research claim under active
  scrutiny rather than an established computing platform — a
  textbook case for the claim-evaluation methodology of
  Chapter 36.

## F.6 Cross-Cutting Metrics at a Glance

Representative, order-of-magnitude figures as of early 2026. Read
alongside the caveats in F.1; these are not benchmark results.
Definitions matter: "qubit scale" counts publicly available
gate-model systems (announced and lab systems run higher;
neutral-atom figures count array sites; photonic mode counts and
proprietary metrics such as #AQ are excluded as incomparable);
"gate time" mixes operation types, and some two-qubit, shuttling,
and measurement operations run an order of magnitude or more
slower than the quoted ranges; fidelities are selected reported
values, protocol- and date-dependent.

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
- **Logical operations (trapped-ion and neutral-atom).** Microsoft
  and Quantinuum demonstrated 4 logical qubits on H2 (April 2024)
  and 12 entangled logical qubits by September 2024 (reported
  entangled-circuit error rate ${\sim}22\times$ better than the
  physical baseline), reporting logical error rates well below the
  physical rate — a
  comparison whose meaning depends on the metric and the
  error-detection/postselection protocol; the technical report,
  not the press release, carries the precise claim. The
  Harvard/QuEra 48-logical-qubit experiment (Bluvstein et al.,
  *Nature*, December 2023) showed transversal logical operations
  on a neutral-atom platform, with 2025 follow-ups extending
  encoded-qubit counts and demonstrating first magic-state
  distillation.
- **Overhead reduction.** Quantum-LDPC codes — e.g. the
  bivariate-bicycle $[[144, 12, 12]]$ "gross" code, nicknamed for
  its 144 (a gross) physical qubits — promise far lower
  physical-to-logical overhead than the surface code, and feature
  prominently in IBM's stated path (a vendor roadmap, not a
  peer-reviewed result) toward a fault-tolerant machine later this
  decade.

The honest summary: below-threshold behavior has been shown in specific
systems, logical-qubit *demonstrations* are small, and no platform yet runs
deep, fault-tolerant logical algorithms at application scale. See
[Chapter 19](../part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md)
for the theory and [Chapter 25](../part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md)
for what this means for near-term practice.

## F.8 Verified Updates as of July 2026

The snapshot above is deliberately frozen at May 2026. The items
below were verified against primary or primary-adjacent sources in
July 2026 during review; they update, but do not rewrite, the
sections above.

- **IBM** deployed Heron r3 (first system `ibm_pittsburgh`), with
  higher coherence and lower error than r2, and published a
  fault-tolerance roadmap: Nighthawk targeted at end-2026, and the
  Starling fault-tolerant machine (~200 logical qubits, $10^8$
  gates) built up through 2028–2029 milestones.
- **Microsoft** announced Majorana 2 (Build, June 2026): a
  lead-based superconductor replacing aluminum, claimed
  quantum-state lifetimes of ${\sim}20$ seconds, and a roadmap
  pulled in to 2029. The F.5 caveat stands unchanged: prominent
  critics responded that the new data does not resolve their
  objections to the underlying topological-qubit claim — treat it
  with the same claim-layering as Majorana 1.
- **Microsoft and Quantinuum** published peer-reviewed validation
  in *Nature* (June 2026) of logical-over-physical error-rate
  improvements ranging from $11\times$ to $800\times$ on trapped-ion
  hardware — the press-release-era numbers of F.7 now have an
  independently reviewed anchor. Quantinuum's announced Helios
  generation targets at least 10 high-reliability logical qubits.
- **Pasqal** shipped its Orion Gamma generation (>140 physical
  qubits) to HPC centers by end-2025; the ${\sim}1{,}000$-qubit
  machine from the earlier roadmap (F.4) was *not* publicly
  confirmed delivered by its target date, and the current roadmap
  restates scaling as 10,000 physical / 200 logical qubits by 2030
  (Vela 2027, Centaurus 2028, Lyra 2029).

## F.9 How This Snapshot Will Age

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

## References

External sources for this chapter's dated and attributed claims. The
[factcheck mirror](../../factcheck/99-back-matter/appendix-f-hardware-snapshot-2026.md) records which claims cite which source.

- **Acharya et al. 2024 (Willow)** — *Nature* (2024), DOI 10.1038/s41586-024-08449-y.
- **Bluvstein et al. 2023** — 48 logical qubits / transversal gates, *Nature* (2023), DOI 10.1038/s41586-023-06927-3.
- **Bravyi et al. 2024 ("gross" code)** — [[144,12,12]] qLDPC, *Nature* (2024).
- **Madsen et al. 2022 (Borealis)** — Gaussian boson sampling advantage, *Nature* (2022).
- **QuEra Aquila** — arXiv:2306.11727.
- **Vendor primary pages** — IBM Quantum newsroom/roadmap; Quantinuum H-Series publications; IonQ product pages (#AQ metric); QuEra/Pasqal/Atom Computing/Infleqtion press; PsiQuantum/Intel/Xanadu press. Dated claims in this file name their source inline.

---

[← Previous: Appendix E. Glossary](appendix-e-glossary.md) · [Table of Contents](../../README.md) · [Next: Index →](index.md)
