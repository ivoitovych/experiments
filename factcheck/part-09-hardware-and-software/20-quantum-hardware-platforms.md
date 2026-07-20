# Factcheck — §20 Quantum Hardware Platforms

Mirrors `book/part-09-hardware-and-software/20-quantum-hardware-platforms.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §20.1 — Transmon anharmonicity range

- **Claim** (anchor): "typically $\alpha/2\pi \approx -200$ to $-300$ MHz for a transmon"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard transmon design parameter; appears in Koch et al. (2007) and subsequent hardware literature.

## §20.1 — Dilution refrigerator operating temperature

- **Claim** (anchor): "**dilution refrigerator** at $\sim$10 mK"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Operating temperature for superconducting qubit platforms; widely cited in hardware literature.

## §20.1 — Single-qubit gate pulse duration (DRAG, superconducting)

- **Claim** (anchor): "Single-qubit gates are microwave pulses of duration $\sim$20–50 ns"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Typical gate times for transmon qubits using DRAG pulse shaping; verify against IBM and Google publications.

## §20.1 — Two-qubit gate duration (superconducting)

- **Claim** (anchor): "run in $\sim$30–100 ns"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claimed for cross-resonance (IBM) and parametric-drive (Google, Rigetti, IQM) two-qubit gates.

## §20.1 — Named vendors for tunable-coupler two-qubit gates

- **Claim** (anchor): "tunable couplers (parametric drives on Google, Rigetti, and IQM devices)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-gate-scheme attribution; verify that IQM uses parametric drives rather than another coupling scheme.

## §20.1 — Superconducting qubit coherence times (2026)

- **Claim** (anchor): "$T_1$ and $T_2$ around 100 $\mu$s as device-wide medians, with best-in-class devices reporting $T_1 \sim 100$–400 $\mu$s and $T_2 \sim 100$–300 $\mu$s (the ranges Chapter 18 quotes) and individual outlier qubits beyond that"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable hardware benchmark; should be checked against recent IBM, Google, and Rigetti publications.

## §20.1 — Single-qubit gate fidelity (superconducting, 2026)

- **Claim** (anchor): "single-qubit gate fidelity around 99.9%"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Reported figure for leading superconducting platforms as of 2026.

## §20.1 — Two-qubit gate fidelity (superconducting, 2026)

- **Claim** (anchor): "two-qubit gate fidelity around 99.5%, occasionally crossing 99.9% on highly tuned subsets"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable benchmark; should be confirmed against current vendor announcements.

## §20.1 — Readout fidelity (superconducting, 2026)

- **Claim** (anchor): "readout fidelity around 98–99% per qubit"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Dispersive readout fidelity for superconducting platforms.

## §20.1 — Named small superconducting devices

- **Claim** (anchor): "Rigetti's Ankaa, IQM's Garnet"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor device names described as "a few tens of qubits"; verify names and qubit counts against vendor documentation.

## §20.1 — IBM processor families and qubit counts

- **Claim** (anchor): "IBM's Heron and Condor families"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Verify IBM quantum processor naming and generation, and the claim of "several hundred" to "approaching 1000 physical qubits."

## §20.2 — Transmon EJ/EC ratio

- **Claim** (anchor): "typically $E_J / E_C \approx 50$–100"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard transmon design parameter from Koch et al. (2007); cross-check against primary literature.

## §20.2 — Charge-noise suppression scaling in transmon

- **Claim** (anchor): "charge noise — slow drifts in the electrostatic environment, the dominant low-frequency noise source in earlier "Cooper-pair box" designs — produces level shifts that scale as $e^{-\sqrt{8 E_J / E_C}}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific mathematical scaling claim for charge-noise sensitivity; derivable from transmon theory (Koch et al. 2007), but presented here as a fact rather than derived inline.

## §20.2 — IBM heavy-hex lattice topology

- **Claim** (anchor): "IBM has standardized on the **heavy-hex** lattice — a hexagonal lattice with extra qubits on each edge — which has degree 2 or 3 at every site"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: IBM lattice topology and degree bounds; checkable against IBM Quantum documentation and published architecture papers.

## §20.2 — Google Sycamore/Willow lattice topology

- **Claim** (anchor): "Google's Sycamore and Willow processors use a **square** lattice with degree 4 and tunable couplers"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Verify lattice type and tunable-coupler architecture for both named Google processors.

## §20.2 — Rigetti and IQM lattice topologies

- **Claim** (anchor): "Rigetti uses an octagonal "Aspen" tiling; IQM uses a square lattice with star-shaped subgraphs"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-specific connectivity topology claims; checkable against Rigetti and IQM published specifications.

## §20.3 — Fluxonium transition frequency

- **Claim** (anchor): "often $\omega_{01}/2\pi \approx 100$–500 MHz"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Physical parameter of fluxonium design; verify against primary literature (e.g., Manucharyan et al.).

## §20.3 — Fluxonium T1 in the millisecond range

- **Claim** (anchor): "single fluxonium qubits with $T_1$ in the millisecond range have been reported"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific experimental result; groups at Maryland, Yale, Atlantic Quantum mentioned — needs citation to primary paper(s).

## §20.3 — Fluxonium superinductor junction chain length

- **Claim** (anchor): "a chain of $\sim$100 junctions"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Engineering detail of fluxonium superinductor construction; verify against design literature.

## §20.3 — Fluxonium processor scale and groups

- **Claim** (anchor): "existing fluxonium processors have been small (single-digit to low-tens of qubits, from groups at Maryland, Yale, Atlantic Quantum, and others)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Institutional attribution and scale claim; verify that all named groups have demonstrated fluxonium processors.

## §20.4 — Trapped-ion species used

- **Claim** (anchor): "typically $^{171}$Yb$^{+}$, $^{40}$Ca$^{+}$, or $^{137}$Ba$^{+}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-species mapping: IonQ uses Yb, Quantinuum uses Ca (and Ba in some configurations); verify against vendor publications.

## §20.4 — Trapped-ion coherence times

- **Claim** (anchor): "hyperfine clock qubits reach $T_2$ of seconds to minutes (set by magnetic-field stability, the local oscillator, and dynamical decoupling, not by intrinsic decay)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable benchmark; reflects best reported figures for hyperfine clock-state qubits.

## §20.4 — Trapped-ion single-qubit gate time

- **Claim** (anchor): "typical gate times around 1–10 $\mu$s"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Stimulated-Raman-transition single-qubit gate time; verify against leading platform publications.

## §20.4 — Mølmer–Sørensen two-qubit gate time

- **Claim** (anchor): "$\sim$100 $\mu$s for two-qubit MS gates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Characteristic gate time for Mølmer–Sørensen entangling gate; verify against IonQ/Quantinuum publications.

## §20.4 — Trapped-ion single-qubit fidelity

- **Claim** (anchor): "single-qubit gates around 99.99% on the leading platforms"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: State-of-the-art reported fidelity for trapped-ion single-qubit gates.

## §20.4 — Trapped-ion two-qubit fidelity and record

- **Claim** (anchor): "two-qubit gates around 99.9%, and on small chains the best published numbers cross 99.95%"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable benchmark; confirm against Quantinuum/IonQ primary publications.

## §20.4 — Mølmer–Sørensen gate as native gate for IonQ and Quantinuum

- **Claim** (anchor): "The same generator family is what §8.12 lists as the native two-qubit gate on IonQ and Quantinuum hardware"
- **Method**: convention
- **Source**: → §8.12
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference claim; verify that §8.12 indeed identifies the MS-gate family for these vendors.

## §20.4 — Current trapped-ion qubit counts and named devices

- **Claim** (anchor): "Quantinuum's H-series and IonQ's Forte and Tempo devices currently operate at $\sim$30–60 trapped qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor device names and qubit counts; perishable; verify against Quantinuum and IonQ announcements.

## §20.4 — Oxford Ionics scaling roadmap

- **Claim** (anchor): "Oxford Ionics and others are pushing toward 100–256 ions per trap"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Roadmap claim for Oxford Ionics and competing groups; checkable against recent publications.

## §20.4 — Quantinuum H2 QCCD architecture

- **Claim** (anchor): "Quantinuum's H2 device uses the first"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Factual claim that H2 uses the QCCD (quantum charge-coupled device) architecture with ion shuttling.

## §20.5 — Neutral-atom species

- **Claim** (anchor): "usually $^{87}$Rb or $^{88}$Sr"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific isotopes used by leading neutral-atom vendors (QuEra uses Rb; Atom Computing uses Sr); verify isotope numbers.

## §20.5 — Neutral-atom coherence times

- **Claim** (anchor): "coherence times are seconds for hyperfine qubits and tens of seconds for the best clock qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable benchmark for neutral-atom platforms.

## §20.5 — Rydberg blockade interaction range

- **Claim** (anchor): "two atoms within a blockade radius of roughly 5–10 $\mu$m (the exact figure depends on the Rydberg state and the geometry) interact"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Interaction range set by Rydberg blockade radius; depends on principal quantum number n.

## §20.5 — Neutral-atom two-qubit gate time

- **Claim** (anchor): "Gate times are short — $\sim$100–500 ns"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Rydberg-gate duration claim; verify against recent experimental publications.

## §20.5 — Neutral-atom two-qubit gate fidelity (2025–2026)

- **Claim** (anchor): "99.5% on two-qubit operations was demonstrated in 2023, and subsequent reports have pushed beyond it"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Rapidly improving; perishable benchmark. Verify against QuEra, Pasqal, Atom Computing publications.

## §20.5 — QuEra Aquila qubit count and roadmap

- **Claim** (anchor): "QuEra (Aquila and successors, currently 256 atoms with announced 10,000-atom roadmaps)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-specific claim; QuEra's announced roadmap numbers should be confirmed against press releases or publications.

## §20.5 — Atom Computing Phoenix first 1000-atom operation

- **Claim** (anchor): "Atom Computing (whose Phoenix system was the first to publish 1000-atom operation)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Priority claim for 1000-atom neutral-atom operation; confirm against Atom Computing's publication and that no earlier claim exists.

## §20.6 — KLM probabilistic gate success probability

- **Claim** (anchor): "Naive KLM gates have low success probability ($1/16$ for the original construction)"
- **Method**: external
- **Source**: Knill, Laflamme & Milburn, Nature 409 (2001)
- **Verified**: — · **Verdict**: open
- **Comment**: Specific numerical result from the KLM paper; verify that 1/16 is the figure stated in the original paper for the basic CZ/CNOT construction.

## §20.6 — PsiQuantum fusion-based architecture and silicon photonics target

- **Claim** (anchor): "PsiQuantum's architecture is fusion-based and targets silicon-photonics integration at wafer scale"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor architecture claim; checkable against PsiQuantum publications and announcements.

## §20.6 — Xanadu Borealis Gaussian Boson Sampling

- **Claim** (anchor): "Xanadu's Borealis and successor devices implement **Gaussian Boson Sampling**"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Xanadu device name and computation type; Borealis paper published in Nature 2022; verify GBS claim and device name.

## §20.6 — Borealis room-temperature operation

- **Claim** (anchor): "Borealis runs at room temperature with cryogenic detectors only at the readout stage"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Operating condition; verify against Madsen et al. (Xanadu Borealis paper) or Xanadu documentation.

## §20.7 — Silicon spin T2 in isotopically purified silicon

- **Claim** (anchor): "$^{28}$Si has zero nuclear spin, so isotopically purified substrates eliminate the dominant magnetic-noise channel, and $T_2$ can reach milliseconds"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Physical property of 28Si and resulting T2; verify against Yoneda et al. or similar primary literature.

## §20.7 — Silicon spin gate times

- **Claim** (anchor): "Gate times are around 10–100 ns for single-qubit rotations and 10–100 ns for the exchange-coupling-mediated two-qubit gates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Verify gate-time ranges against recent silicon spin qubit experimental publications.

## §20.7 — Intel Tunnel Falls 12-qubit chip

- **Claim** (anchor): "Intel's "Tunnel Falls" 12-qubit chip"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor device name and qubit count; checkable against Intel Quantum publications and press releases.

## §20.7 — Quantum Motion 1024-dot chip

- **Claim** (anchor): "Quantum Motion's 1024-dot quantum-classical chip"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-specific claim; verify dot count and quantum-classical integration claim against Quantum Motion announcements.

## §20.7 — Silicon spin two-qubit fidelity threshold

- **Claim** (anchor): "Two-qubit gate fidelities have crossed 99% on small subsystems"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable benchmark; verify against recent publications from UNSW, Delft, Intel, or Diraq groups.

## §20.8 — NV center room-temperature and cryogenic T2

- **Claim** (anchor): "long ground-state $T_2$ (milliseconds at room temperature, seconds at cryogenic temperatures with dynamical decoupling)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: NV center coherence times; verify against primary literature (e.g., Balasubramanian et al. 2009 or similar).

## §20.8 — NV center main applications (sensing and networking)

- **Claim** (anchor): "NV centers have found their main application in **quantum sensing** — magnetometry, thermometry, and biosensing — and as **quantum network nodes**"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Descriptive claim about community application focus; verify against review articles on NV centers.

## §20.8 — Delft and TU Wien NV programs

- **Claim** (anchor): "notably the Delft and TU Wien programs"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Institutional attribution for NV-based quantum computing programs; verify that TU Wien (not another institution) is the correct partner.

## §20.9 — Microsoft Majorana 1 announcement date and architecture

- **Claim** (anchor): "Microsoft's "Majorana 1" device, announced in early 2025"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Date and device name of Microsoft's topological qubit announcement; verify official name and announcement date.

## §20.9 — Majorana 1 material platform

- **Claim** (anchor): "indium-arsenide / aluminum nanowire architecture"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Material platform claimed for Microsoft's Majorana 1 device; verify against Microsoft's published paper or announcement.

## §20.9 — Kouwenhoven–Microsoft zero-bias-peak retraction dates

- **Claim** (anchor): "The 2018–2021 retraction of earlier zero-bias-peak claims (the Kouwenhoven–Microsoft program)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Historical fact involving a retracted Nature paper; confirm the retraction of Kouwenhoven et al. and the date range 2018–2021.

## §20.11 — D-Wave qubit count and named processor generations

- **Claim** (anchor): "successive generations of superconducting-flux-qubit machines (Pegasus, Zephyr, and the 2024 Advantage2 prototype) reaching $\sim$5000–7000 qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-specific hardware claim; D-Wave processor names, dates, and qubit counts should be verified against D-Wave documentation.

## §20.11 — D-Wave qubit coherence time

- **Claim** (anchor): "coherence in the tens-of-nanoseconds range (a number not directly comparable to a transmon gate qubit's $T_2$, since an annealer never executes a coherent gate sequence)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Coherence time for D-Wave flux qubits; notably much shorter than gate-model qubits; verify against D-Wave technical publications.

## §20.11 — Adiabatic–circuit equivalence claim

- **Claim** (anchor): "*Ideal* adiabatic quantum computation — with general (non-stoquastic) Hamiltonians, closed-system dynamics, and arbitrary control precision — is polynomially equivalent to the circuit model"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Theoretical equivalence result; likely refers to Aharonov et al. (2004); verify canonical citation.

## §20.11 — Classical heuristics matching D-Wave performance

- **Claim** (anchor): "Independent reviews through the 2010s and 2020s have found that the strongest classical heuristics (parallel tempering, simulated annealing, specialized SAT solvers) match or beat D-Wave on most benchmarks"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical performance comparison claim; refers to a body of benchmark literature (e.g., Rønnow et al. Science 2014); verify representative citations.

## §20.12 — Surface-code distance-7 demonstration (2024–2025)

- **Claim** (anchor): "the most mature error-correction demonstrations (surface-code distance-7 in 2024–2025, sub-threshold logical-qubit performance reported)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific experimental milestone; likely refers to Google's published results; verify institution, distance, and date.

## §20.12 — Neutral atom fault-tolerance demonstrations

- **Claim** (anchor): "rapid scaling trajectory and recent fault-tolerance demonstrations"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vague but empirical; verify which neutral-atom fault-tolerance results are being referenced (e.g., Bluvstein et al. 2024).

## §20.12 — PsiQuantum million-photon resource state target

- **Claim** (anchor): "PsiQuantum's roadmap targeting million-photon resource states"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor roadmap claim; verify against PsiQuantum publications or announcements.

## §20.12 — Silicon spin operating temperature range

- **Claim** (anchor): "cryogenic at 100 mK–4 K depending on architecture"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Operating temperature range for silicon spin qubits; 4 K operation has been demonstrated but is not universal; verify.

## §20.12 — Cross-platform trapped-ion connectivity description

- **Claim** (anchor): "connectivity all-to-all within a chain, modular across chains"
- **Method**: convention
- **Source**: → §20.4
- **Verified**: — · **Verdict**: open
- **Comment**: Summary table claim; internally consistent with §20.4 description of trapped-ion connectivity.
