# Factcheck — §22 Hardware Engineering Metrics

Mirrors `book/part-09-hardware-and-software/22-hardware-engineering-metrics.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §22.1 — Surface-code logical qubit physical overhead

- **Claim** (anchor): "A single surface-code logical qubit at code distance $d$ uses roughly $2d^2$ physical qubits for the data plus ancilla overhead"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard surface-code overhead formula; cited in context of a 1000-physical-qubit device supporting ~10–20 logical qubits at d=5.

## §22.1 — Quantinuum logical-qubit publication

- **Claim** (anchor): "Quantinuum, for instance, has published logical-qubit counts on H1/H2"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.1 — Algorithmic Qubits introduced by IonQ

- **Claim** (anchor): "Algorithmic qubits is a marketing-blessed shorthand introduced by IonQ"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.2 — Heavy-hex average degree

- **Claim** (anchor): "Heavy-hex (IBM) has average degree close to $2.5$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.2 — Square-lattice average degree

- **Claim** (anchor): "square-lattice (Google) has average degree close to $4$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.2 — Planar lattice diameter scaling

- **Claim** (anchor): "On a planar lattice of $n$ qubits the diameter scales as $\sqrt{n}$"
- **Method**: derivation
- **Source**: → §22.2 (graph-theory result for planar grids)
- **Verified**: — · **Verdict**: open

## §22.2 — Heavy-hex 127-qubit SWAP overhead

- **Claim** (anchor): "routing a CNOT between the two most-distant qubits on a heavy-hex 127-qubit device costs roughly"
- **Method**: derivation
- **Source**: → §22.2 (diameter estimate applied to heavy-hex 127-qubit layout)
- **Verified**: — · **Verdict**: open

## §22.3 — Process fidelity to average gate fidelity conversion

- **Claim** (anchor): "a process fidelity of $0.99$ on a single-qubit gate corresponds to an average gate fidelity of"
- **Method**: derivation
- **Source**: → §22.3 (formula $F_{\mathrm{avg}} = (d F_{\mathrm{pro}} + 1)/(d+1)$ with $d=2$)
- **Verified**: — · **Verdict**: open

## §22.3 — RB insensitivity to SPAM errors

- **Claim** (anchor): "it is insensitive to state preparation and measurement (SPAM) errors, and it averages over the Clifford group"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.3 — Single-qubit gate fidelity on best superconducting devices

- **Claim** (anchor): "Single-qubit gate fidelity ($F_{1q}$) is currently $0.9995$–$0.99995$ on the best superconducting devices (Google Willow, IBM Heron r2) and $0.9999$+ on the best ion traps (Quantinuum H2)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.3 — Two-qubit gate fidelity on best devices

- **Claim** (anchor): "Two-qubit gate fidelity ($F_{2q}$) is the binding constraint on most devices. It is currently $0.995$–$0.999$ on the best superconducting devices and $0.998$–$0.9995$ on the best ion traps"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.3 — Circuit fidelity collapse after 1000 gates at 0.999

- **Claim** (anchor): "even a $0.999$ fidelity per gate means total circuit fidelity collapses to $0.999^{1000} \approx 0.37$ after a thousand-gate circuit"
- **Method**: derivation
- **Source**: → §22.3 (product of independent per-gate error probabilities)
- **Verified**: — · **Verdict**: open

## §22.4 — T2 fundamental bound

- **Claim** (anchor): "The relationship $T_2 \leq 2 T_1$ is a fundamental bound"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.4 — Superconducting transmon coherence times (2025 cohort)

- **Claim** (anchor): "superconducting transmons report $T_1 \sim 100$–$300\\,\mu\mathrm{s}$, $T_2^{\mathrm{echo}} \sim 80$–$300\\,\mu\mathrm{s}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.4 — Trapped-ion coherence times vs superconducting

- **Claim** (anchor): "Trapped-ion qubits report $T_1$ measured in *seconds* and $T_2^{\mathrm{echo}}$ in the multi-second to minute range — five to seven orders of magnitude more coherent per shot than superconducting hardware"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.5 — Superconducting single-qubit gate times

- **Claim** (anchor): "Single-qubit gates are very fast on superconducting devices ($\sim 20$–$50\\,\mathrm{ns}$) and slower on ion traps ($\sim 1$–$30\\,\mu\mathrm{s}$)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.5 — Superconducting two-qubit gate times

- **Claim** (anchor): "Two-qubit gates take $\sim 30$–$300\\,\mathrm{ns}$ on superconducting devices (depending on whether the native gate is CR, iSWAP, CZ, or fluxonium-based) and $\sim 30\\,\mu\mathrm{s}$–$1\\,\mathrm{ms}$ on ion traps"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.5 — Gate-count budget comparison by platform

- **Claim** (anchor): "Superconducting devices have $N_{\mathrm{ops}}$ around $10^3$; ion traps around $10^4$–$10^5$ thanks to the much longer coherence"
- **Method**: derivation
- **Source**: → §22.5 (ratio $T_2^{\mathrm{echo}} / t_{\mathrm{2q}}$ with per-platform values from §22.4 and §22.5)
- **Verified**: — · **Verdict**: open

## §22.6 — Superconducting readout asymmetry

- **Claim** (anchor): "Typical numbers: $F_{0|0} \approx 0.99$, $F_{1|1} \approx 0.97$, asymmetry $\sim 2\%$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.6 — Ion-trap readout fidelity

- **Claim** (anchor): "For trapped ions, fluorescence-based readout achieves $F_{0|0}, F_{1|1} > 0.998$ each"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.7 — Quantum Volume introduced by IBM in 2018

- **Claim** (anchor): "Quantum Volume (QV) is the most cited suite-level metric, introduced by IBM in 2018"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.7 — QV heavy-output probability threshold

- **Claim** (anchor): "A device \"passes\" at width $d$ if this heavy-output probability exceeds $2/3$ with statistical confidence"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Defines the pass criterion for the QV protocol as heavy-output probability > 2/3.

## §22.7 — QV definition formula

- **Claim** (anchor): "The Quantum Volume is then"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Anchoring on prose preceding the QV = 2^d* formula, which is the IBM-defined QV protocol definition.

## §22.7 — Best published QV numbers as of 2025

- **Claim** (anchor): "The best published QV numbers as of 2025 sit around $2^{19}$–$2^{20}$ on Quantinuum H2 and $2^{15}$ on IBM Heron"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.8 — CLOPS definition by IBM

- **Claim** (anchor): "CLOPS (Circuit Layer Operations Per Second) is IBM's complementary throughput metric"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.8 — IBM Heron CLOPS numbers

- **Claim** (anchor): "IBM Heron reports CLOPS $\sim 200\\,000$; older Eagle-family devices reported $\sim 1500$–$5000$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.9 — AQ construction from QED-C benchmarks

- **Claim** (anchor): "The construction is operational: run a suite of structured algorithmic benchmarks (originally derived from QED-C — see §22.13) at increasing problem size"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.9 — AQ pass threshold definition

- **Claim** (anchor): "The convention is the QED-C suite at the \"high\" fidelity threshold (probability of correct answer above $1/e \approx 0.37$)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.9 — IonQ Forte Enterprise AQ number

- **Claim** (anchor): "IonQ Forte Enterprise reports AQ $= 36$ at 64 physical qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.10 — XEB used in 2019 Sycamore supremacy claim

- **Claim** (anchor): "the one used in the 2019 \"quantum supremacy\" claim on Sycamore and the 2024 follow-on on Willow"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.10 — XEB fidelity factorization property

- **Claim** (anchor): "$F_{\mathrm{XEB}}$ factorizes across the circuit as a product of per-gate fidelities (in the limit of large random circuits)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.10 — Willow 2024 XEB results

- **Claim** (anchor): "Willow's 2024 results report $F_{\mathrm{XEB}}$ in the $10^{-3}$–$10^{-2}$ range at $n = 67$, $d = 24$, which is above the classical-simulation crossover"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.10 — XEB classical simulation limit

- **Claim** (anchor): "it requires *exponential* classical work to compute $p_{\mathrm{ideal}}$, so it stops being computable beyond $n \sim 50$–$70$ qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.11 — Superconducting mid-circuit measurement latency

- **Claim** (anchor): "On superconducting devices this is currently $1$–$5\\,\mu\mathrm{s}$ (dispersive readout integration plus discrimination time)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.11 — Ion-trap mid-circuit measurement latency

- **Claim** (anchor): "On ion-trap devices it is $50$–$500\\,\mu\mathrm{s}$ (fluorescence collection plus shelving-state initialization)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.11 — Active reset fidelity

- **Claim** (anchor): "active reset is the standard, with reset fidelity around $0.99$ on current devices"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.11 — Passive reset time cost

- **Claim** (anchor): "Passive reset waits for the qubit to decay through $T_1$; its time is $5$–$10 \cdot T_1$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard exponential decay criterion; passive reset to 99%+ ground-state population requires waiting ~5 T1.

## §22.11 — Superconducting feedforward round-trip latency

- **Claim** (anchor): "On the best-engineered superconducting devices (Google Willow, IBM Heron) the total round-trip is on the order of $100$–$500\\,\mathrm{ns}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.12 — Operational vs published fidelity degradation

- **Claim** (anchor): "The *operational* number — what a user code will see, averaged across a long-running job — is typically $5\%$–$30\%$ worse"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — QED-C benchmark suite contents

- **Claim** (anchor): "publishes an open suite of structured algorithmic benchmarks: Bernstein–Vazirani, Grover, QFT, Shor (small instances), VQE on small molecules, Hamiltonian simulation, amplitude estimation, MaxCut"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — Q-PERFECT description

- **Claim** (anchor): "Q-PERFECT is a European Commission-funded benchmark project producing protocols specifically designed to compare quantum hardware platforms across architectures"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — Q-score definition by Atos

- **Claim** (anchor): "Q-score (Atos) is a measure of the largest MaxCut problem instance a device can solve at a fixed approximation ratio (typically"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — IBM QV history milestones

- **Claim** (anchor): "QV $32$ on Falcon in 2019, $64$ on Honeywell System Model H1 in 2020, $128$, $256$, $512$ through 2021, $4096$ on Quantinuum H1-2 in 2022, $2^{19} = 524\\,288$ on Quantinuum H2 in 2024"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — IBM Heron r2 vendor numbers

- **Claim** (anchor): "IBM Heron r2** — 156 physical qubits, heavy-hex coupling, $F_{2q} \approx 0.997$, $T_2^{\mathrm{echo}} \sim 250\\,\mu\mathrm{s}$, QV around $2^{15}$, CLOPS $\sim 200\\,000$, sub-microsecond feedforward"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — Google Willow vendor numbers

- **Claim** (anchor): "Google Willow** — 105 physical qubits, square lattice, $F_{2q} \approx 0.9986$, supports surface-code distance-7 demonstration with below-threshold logical error"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — Quantinuum H2 vendor numbers

- **Claim** (anchor): "Quantinuum H2** — 56 trapped-ion qubits, all-to-all via shuttling, $F_{2q} \approx 0.9997$, $T_2^{\mathrm{echo}}$ measured in seconds, QV $\sim 2^{19}$, multi-second logical qubit operations demonstrated"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — IonQ Forte Enterprise vendor numbers

- **Claim** (anchor): "IonQ Forte / Forte Enterprise** — 36 qubits all-to-all, AQ $= 36$, $F_{2q} \approx 0.997$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — IQM Crystal/Star vendor numbers

- **Claim** (anchor): "IQM Crystal / Star** — superconducting devices targeting modular architectures, 20–150 qubit variants with $F_{2q} \approx 0.995$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — QuEra Aquila vendor numbers

- **Claim** (anchor): "QuEra Aquila** — neutral-atom analog mode, $256$ atoms with Rydberg interactions"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §22.13 — Quantinuum H3 announcement

- **Claim** (anchor): "H3 (announced) targets 100+ qubits with similar fidelity"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
