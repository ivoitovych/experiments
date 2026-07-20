# Factcheck — §26 Practical Access and Hands-On Work

Mirrors `book/part-10-practice-and-era/26-practical-access-and-hands-on-work.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §26.1 — State-vector simulator qubit capacity

- **Claim** (anchor): "A state-vector simulator on a workstation handles up to about"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claims ~30–35 qubits in a few GB of memory; the exact range depends on available RAM and implementation.

## §26.1 — GPU simulator doubles qubit capacity

- **Claim** (anchor): "A GPU-accelerated simulator (cuQuantum, qsim) doubles that"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claims GPU acceleration (cuQuantum, qsim) roughly doubles the qubit capacity over CPU state-vector simulators.

## §26.1 — Stabilizer simulators handle Clifford circuits efficiently

- **Claim** (anchor): "Stabilizer simulators handle Clifford-only circuits of thousands of qubits in polynomial time"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Polynomial-time classical simulation of Clifford circuits is a well-known result (Gottesman–Knill theorem); the "thousands of qubits" practical scale claim is the perishable part.

## §26.2 — IBM Quantum device range and access model

- **Claim** (anchor): "IBM Quantum — Qiskit Runtime, with a free tier (limited shots, queue-bound) and paid plans for dedicated time. Heron and Eagle devices in the"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: device names (Heron, Eagle), qubit count range (~100–200), and free-tier terms change with IBM's roadmap.

## §26.2 — Amazon Braket multi-vendor access model

- **Claim** (anchor): "Amazon Braket — managed access to multiple vendors' devices (IonQ, Rigetti, QuEra, Quantinuum) through a single SDK; pricing per shot plus per-task overhead"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: vendor list, pricing structure, and per-task overhead details may change.

## §26.2 — Microsoft Azure Quantum vendor list

- **Claim** (anchor): "Microsoft Azure Quantum — gateway to IonQ, Quantinuum, Rigetti, Pasqal; Q# and the Quantum Development Kit on top"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: vendor partnership list and SDK branding may change.

## §26.2 — Google Quantum AI restricted access model

- **Claim** (anchor): "Google Quantum AI / Quantum Engine — restricted access; you typically need a research collaboration"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: Google's access policy may change.

## §26.2 — Direct vendor access models

- **Claim** (anchor): "commercial models vary by vendor (reservations, subscriptions, per-shot or per-task billing), and some devices — QuEra's Aquila, historically — are reached through aggregators like Braket rather than directly"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: product names, access models, and pricing structures may change.

## §26.2 — Reserved time pricing range

- **Claim** (anchor): "Pricing is provider-, contract-, and device-specific, and often not public; serious experimentation typically runs on paid on-demand access, sessions, reservations, or partnership allocations"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Highly perishable pricing claim; actual rates vary significantly by vendor and tier.

## §26.3 — Qiskit as the primary IBM hardware SDK

- **Claim** (anchor): "Targeting IBM hardware: Qiskit. Mature, well-documented, the Runtime Primitives (Sampler, Estimator) are the right abstraction for most work"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Characterization of Qiskit's maturity and official IBM support is stable; Runtime Primitives design is perishable.

## §26.3 — PennyLane multi-framework integration

- **Claim** (anchor): "PennyLane. Differentiation-first, multi-backend, integrates with NumPy/JAX/PyTorch/TensorFlow"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: framework integration list and backend support evolve with PennyLane releases.

## §26.3 — tket/pytket as vendor-agnostic compiler

- **Claim** (anchor): "Targeting Quantinuum / multi-vendor portability: tket via pytket. Strong compilation, vendor-agnostic by design, mature"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-agnostic positioning of tket; perishable as the ecosystem shifts.

## §26.3 — Q# resource estimator characterization

- **Claim** (anchor): "the Azure Quantum Resource Estimator is the most widely used public tool for fault-tolerant resource forecasting"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Subjective characterization ("gold standard") with an implicit external claim about Q# resource estimator capabilities; perishable as other vendors improve resource estimation tools.

## §26.3 — Qiskit API deprecation between versions

- **Claim** (anchor): "Qiskit deprecated several APIs between"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific version range (1.0 to 1.4) cited; refers to Qiskit's changelog.

## §26.4 — Trapped-ion two-qubit fidelity

- **Claim** (anchor): "2-qubit fidelities approaching 99.9%, all-to-all connectivity, but tens of qubits and slow gates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable hardware specification for Quantinuum H-series and IonQ systems. The 99.9% figure is a leading-edge claim; scale and gate speed characterizations evolve rapidly.

## §26.4 — IBM superconducting device scale and fidelity

- **Claim** (anchor): "Largest scale, public availability: IBM superconducting devices. Hundreds of qubits, restricted connectivity (heavy-hex layout), 2q fidelities around 99.5%"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: qubit count, connectivity topology name (heavy-hex), and 2q fidelity figures are all hardware-generation-specific.

## §26.4 — Neutral-atom device scale and application domain

- **Claim** (anchor): "neutral-atom devices (QuEra Aquila, Pasqal). Hundreds of qubits, reconfigurable layouts, particularly strong for Hamiltonian-simulation-style problems on Rydberg arrays"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: device names, qubit counts, and characterization of application strengths for neutral-atom platforms.

## §26.4 — D-Wave Advantage qubit count

- **Claim** (anchor): "D-Wave Advantage. Thousands of qubits but in a fundamentally different computational model"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable: D-Wave Advantage qubit count and product name. The distinction from gate-based models is a stable conceptual claim.

## §26.5 — Shot count precision relationship

- **Claim** (anchor): "For a probability"
- **Method**: derivation
- **Source**: → §26.5 (standard error of a binomial proportion)
- **Verified**: — · **Verdict**: open
- **Comment**: The formula sigma/sqrt(N) is standard statistics; the specific example (p near 0.5, ~0.5/sqrt(N) standard error, N=10^4 gives ~5e-3 precision) is a derivation/check, not an external claim.

## §26.6 — Zenodo deposit as reproducibility standard

- **Claim** (anchor): "many venues now encourage or require a data/code deposit (a Zenodo record or a companion repository), with policies varying by field and venue"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable claim about community norms and journal/venue policies for quantum-computing experimental papers.

## §26.7 — arXiv quant-ph as primary venue

- **Claim** (anchor): "Most academic quantum-computing research appears on arXiv, usually before journal publication"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Cultural claim about publication practice in quantum computing; the relevant category (quant-ph) is named and stable, but the "almost everything" scope is broad.

## §26.7 — Quantum advantage claims and classical pushback timeline

- **Claim** (anchor): "The 2019–2025 cycle of advantage claims and classical pushbacks (Sycamore, Jiuzhang, random-circuit sampling) is a useful template: if a result claims a clean separation, search for classical algorithmic responses before citing it"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Names specific experiments (Sycamore, Jiuzhang) and a specific pattern (classical response within 12–24 months); these are empirical historical claims about the 2019–2025 research record and are verifiable.
