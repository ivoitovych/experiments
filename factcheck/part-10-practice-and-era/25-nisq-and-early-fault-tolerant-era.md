# Factcheck — §25 NISQ and Early Fault-Tolerant Era

Mirrors `book/part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §25.1 — Preskill coined "NISQ" in 2018 keynote and Quantum article

- **Claim** (anchor): "coined by John Preskill in his 2018 keynote and the accompanying *Quantum* article, "Quantum Computing in the NISQ era and beyond.""
- **Method**: external
- **Source**: Preskill, "Quantum Computing in the NISQ Era and Beyond," *Quantum* 2, 79 (2018) — TBD — needs verification (DOI/arXiv)
- **Verified**: — · **Verdict**: open
- **Comment**: Claim encompasses both the keynote and the journal article; the article title is quoted verbatim and should be confirmed against the published record.

## §25.1 — NISQ gate error rate range $10^{-3}$ to $10^{-2}$

- **Claim** (anchor): "typically $10^{-3}$ to $10^{-2}$ per two-qubit gate"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Representative empirical range for two-qubit gate error on NISQ hardware; should be checked against current device benchmarks (e.g., IBM, Google published specs).

## §25.1 — Preskill's original qubit sketch was 50–100 qubits

- **Claim** (anchor): "Preskill's original sketch was 50–100 qubits"
- **Method**: external
- **Source**: Preskill, "Quantum Computing in the NISQ Era and Beyond," *Quantum* 2, 79 (2018) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The specific "50–100 qubits" range is attributed to the 2018 article and should be confirmed against the original text.

## §25.1 — 2026 NISQ ceiling is a few thousand qubits for some platforms

- **Claim** (anchor): "the 2026 ceiling is closer to a few thousand for some platforms"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about the state of hardware as of 2026; requires confirmation against current vendor announcements or review literature.

## §25.1 — Pre-NISQ "few-qubit demos" era roughly 1998–2015

- **Claim** (anchor): "the pre-NISQ "few-qubit demos" era (roughly 1998–2015, when the largest implementations were single-digit qubits)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Historical bracket; "single-digit qubits" by 2015 understates reality somewhat (e.g., ion-trap demonstrations reached 14 qubits by ~2011). Needs cross-check.

## §25.2 — Superconducting transmon qubit counts ~100 to ~1,000 per chip (2026)

- **Claim** (anchor): "Superconducting transmons** (IBM, Google, Rigetti). $\sim 100$ to $\sim 1{,}000$ physical qubits per chip."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware parameter; should be confirmed against 2026 IBM, Google, and Rigetti device specifications.

## §25.2 — Superconducting single-qubit fidelity ~99.9%, two-qubit ~99.5%

- **Claim** (anchor): "Single-qubit fidelity around 99.9%, two-qubit fidelity around 99.5%."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Typical superconducting median device fidelity figures for 2026; verify against IBM/Google published device characterization data.

## §25.2 — Superconducting gate times tens to hundreds of nanoseconds; $T_1$, $T_2$ 100–300 µs

- **Claim** (anchor): "Gate times of tens to hundreds of nanoseconds. Coherence times ($T_1$, $T_2$) in the $100$–$300\\,\mu s$ range."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Device coherence parameters for superconducting platforms; needs confirmation against current vendor data sheets or published benchmarks.

## §25.2 — Trapped-ion qubit counts ~30 to ~100 per trap (IonQ, Quantinuum, Oxford Ionics)

- **Claim** (anchor): "Trapped ions** (IonQ, Quantinuum, Oxford Ionics). $\sim 30$ to $\sim 100$ physical qubits per trap."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware parameter for trapped-ion platforms; check against 2026 IonQ, Quantinuum, Oxford Ionics device specifications.

## §25.2 — Trapped-ion two-qubit fidelity 99.7–99.9%; gate times microseconds to milliseconds

- **Claim** (anchor): "two-qubit fidelity around 99.7–99.9%. Gate times of microseconds to milliseconds (slower than superconducting by 3–4 orders of magnitude)."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Fidelity and speed figures for trapped-ion systems; the "3–4 orders of magnitude" slower claim relative to superconducting is a comparative empirical claim that should be verified.

## §25.2 — Neutral-atom qubit counts ~100 to ~1,000; two-qubit fidelity reaching 99.5% (QuEra, Pasqal, Atom Computing)

- **Claim** (anchor): "Neutral atoms** (QuEra, Pasqal, Atom Computing). $\sim 100$ to $\sim 1{,}000$ atoms in optical tweezers. Two-qubit fidelity reaching 99.5% on best devices."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Neutral-atom platform parameters; confirm against 2025–2026 QuEra, Pasqal, and Atom Computing publications or device specs.

## §25.2 — Photonic platforms (PsiQuantum, Xanadu) use measurement-based and continuous-variable approaches

- **Claim** (anchor): "Photonic** (PsiQuantum, Xanadu). Measurement-based and continuous-variable approaches"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Characterization of photonic-platform approaches; verify that PsiQuantum uses measurement-based (FBQC) and Xanadu uses CV approaches as of 2026.

## §25.3 — Barren plateau gradient variance scales as $2^{-n}$

- **Claim** (anchor): "the variance of the gradient of $\langle H \rangle$ with respect to ansatz parameters scales as $\mathrm{Var}(\partial_\theta) \sim 2^{-n}$"
- **Method**: external
- **Source**: TBD — needs verification (McClean et al. 2018, "Barren plateaus in quantum neural network training landscapes," Nature Communications, is the canonical reference)
- **Verified**: — · **Verdict**: open
- **Comment**: This is an attributed theoretical result; should be traced to the original barren-plateau paper (McClean et al.) or subsequent refinements.

## §25.3 — VQE hardware demonstrations up to ~50 spin-orbitals (2026)

- **Claim** (anchor): "small-molecule chemistry up to roughly 50 spin-orbitals (per-electron basis functions — Chapter 28) with active-space reduction (restricting the problem to the chemically active orbitals)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about the state of VQE chemistry demonstrations as of 2026; needs citation to representative benchmark experiments.

## §25.3 — Virtual distillation reference: Huggins et al.

- **Claim** (anchor): "Virtual distillation** (Huggins et al.)."
- **Method**: external
- **Source**: TBD — needs verification (Huggins et al., "Virtual Distillation for Quantum Error Mitigation," Phys. Rev. X, 2022, is the likely reference — confirm exact citation)
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution to Huggins et al. must be confirmed; author list, venue, and year should be verified.

## §25.3 — 2024–2025 VQE demonstrations on hundreds of qubits reproduced classically on a laptop

- **Claim** (anchor): "The 2024–2025 literature includes several VQE demonstrations on hundreds of qubits, paired with classical-shadow or tensor-network reproductions of the same answer in less wall-clock time on a laptop."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about recent literature results; needs citation to specific papers (e.g., IBM utility paper plus the classical reproduction papers).

## §25.4 — Sycamore: 53-qubit processor, ~200 seconds, depth-20, October 2019

- **Claim** (anchor): "A 53-qubit superconducting processor sampled from the output distribution of a depth-20 random circuit in $\sim 200$ seconds"
- **Method**: external
- **Source**: Arute et al. (Google AI), "Quantum supremacy using a programmable superconducting processor," *Nature* 574, 505–510 (2019) — TBD — needs DOI verification
- **Verified**: — · **Verdict**: open
- **Comment**: The key experimental parameters (53 qubits, depth 20, ~200 seconds) should be confirmed against the original Nature paper.

## §25.4 — Google estimated classical equivalent ~10,000 years

- **Claim** (anchor): "Google's team estimated the same task would take $\sim 10{,}000$ years on the leading supercomputer of the time"
- **Method**: external
- **Source**: Arute et al., *Nature* 574 (2019) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: This specific figure (10,000 years) is a key contested claim; should be confirmed against the original paper and subsequent rebuttals.

## §25.4 — IBM classical-simulation rebuttal: ~2.5 days estimate

- **Claim** (anchor): "IBM published a classical-simulation strategy using secondary storage that brought the estimate down to $\sim 2.5$ days"
- **Method**: external
- **Source**: TBD — needs verification (IBM blog post / preprint by Pednault et al. or similar, late 2019)
- **Verified**: — · **Verdict**: open
- **Comment**: The IBM rebuttal and its specific "2.5 days" figure should be confirmed against the published IBM technical report or arXiv preprint.

## §25.4 — Jiuzhang: USTC, December 2020, 76 detected photons, claimed $\sim 10^{14}$ advantage

- **Claim** (anchor): "A photonic Gaussian Boson Sampling experiment with 76 detected photons claimed an advantage of $\sim 10^{14}$ over classical."
- **Method**: external
- **Source**: Zhong et al. (USTC), "Quantum computational advantage using photons," *Science* 370, 1460–1463 (2020) — TBD — needs DOI verification
- **Verified**: — · **Verdict**: open
- **Comment**: Key parameters (76 photons, $10^{14}$ factor, December 2020 date) should be confirmed against the original Science paper.

## §25.4 — IBM 127-qubit Eagle processor utility-scale experiments, 2023–2024

- **Claim** (anchor): "A 127-qubit Eagle processor was used to compute expectation values of an Ising-model time evolution at depths beyond the reach of exact classical statevector simulation."
- **Method**: external
- **Source**: TBD — needs verification (likely Kim et al., *Nature* 618, 2023 — confirm exact citation)
- **Verified**: — · **Verdict**: open
- **Comment**: The Eagle processor claim and classical reproduction results need citation to the original IBM paper and the subsequent classical simulation papers.

## §25.4 — IBM subsequently shifted from "advantage" to "utility" framing

- **Claim** (anchor): "The IBM team's stance subsequently shifted from "advantage" to "utility""
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The shift in IBM's public framing is a factual claim about the company's communications; should be verified against IBM's published statements or subsequent papers.

## §25.5 — Quantum Volume definition: largest $n$ such that random $n \times n$ circuit succeeds with above-2/3 fidelity

- **Claim** (anchor): "IBM's combined measure of width and depth: the largest $n$ such that a random $n \times n$ circuit succeeds with above-2/3 fidelity."
- **Method**: external
- **Source**: TBD — needs verification (Cross et al., "Validating quantum computers using randomized model circuits," Phys. Rev. A, 2019 is the canonical QV reference — confirm exact citation)
- **Verified**: — · **Verdict**: open
- **Comment**: The specific definition (2/3 threshold) is a technical claim that must be confirmed against the original Quantum Volume paper.

## §25.5 — Best 2026 devices report QV $\sim 2^{14}$ to $2^{20}$

- **Claim** (anchor): "Best devices in 2026 report $\mathrm{QV} \sim 2^{14}$ to $2^{20}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical benchmark figures; verify against vendor published QV claims for 2025–2026.

## §25.5 — Algorithmic Qubits (AQ): IonQ metric; circuit suite includes QFT, Grover, VQE on H₂O

- **Claim** (anchor): "IonQ's metric: the largest circuit width $n$ for which a suite of algorithmically meaningful circuits (QFT, Grover, VQE on $\mathrm{H}_2$O, etc.) succeed."
- **Method**: external
- **Source**: TBD — needs verification (IonQ technical documentation or published paper defining AQ)
- **Verified**: — · **Verdict**: open
- **Comment**: The AQ metric definition and its attribution to IonQ should be confirmed against IonQ's published documentation.

## §25.5 — Physical qubit count grew ~1.5× per year, 2018–2026

- **Claim** (anchor): "physical-qubit counts grew $\sim 1.5\times$ per year"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical trend claim spanning 2018–2026; requires cross-checking against published roadmaps and device announcements.

## §25.5 — Two-qubit fidelity improved from 99.0% to 99.5% superconducting, 99.9% trapped-ion, over 2018–2026

- **Claim** (anchor): "two-qubit fidelity improved from 99.0% to 99.5% on superconducting and 99.9% on trapped-ion median devices over the eight-year window"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Trend claim across the 2018–2026 window; should be confirmed against benchmark review papers or annual hardware comparison surveys.

## §25.5 — QV roughly doubled per year on IBM systems, then plateaued

- **Claim** (anchor): "quantum volume roughly doubled per year on IBM systems, then plateaued as connectivity and crosstalk became the binding constraint"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: IBM QV trajectory claim; verify against IBM's published QV history and blog posts.

## §25.5 — Extrapolation to ~2030: ~$10^4$ physical qubits, two-qubit error ~$10^{-3}$

- **Claim** (anchor): "Extrapolating these trends out to $\sim 2030$ suggests roughly $10^4$ physical qubits per system with two-qubit error around $10^{-3}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Forward projection; should be compared against published roadmaps (IBM Quantum, Google, IonQ) to assess consistency.

## §25.6 — Surface-code logical error rate formula: $p_L \sim A(p/p_{\mathrm{th}})^{(d+1)/2}$

- **Claim** (anchor): "p_L \;\sim\; A (p/p_{\mathrm{th}})^{(d+1)/2}."
- **Method**: derivation
- **Source**: → §19 (Chapter 19, threshold theorem and surface-code scaling)
- **Verified**: — · **Verdict**: open
- **Comment**: The specific exponent $(d+1)/2$ is a standard surface-code result; its derivation and exact prefactor should be confirmed against Chapter 19 and the threshold theorem.

## §25.6 — Google 2023 distance-3 to distance-5 below-threshold surface-code demonstration

- **Claim** (anchor): "The first claims of below-threshold operation came from Google's 2023 distance-3 to distance-5 surface-code experiments"
- **Method**: external
- **Source**: TBD — needs verification (likely Google Quantum AI, "Suppressing quantum errors by scaling a surface code logical qubit," *Nature* 614, 2023 — confirm exact citation)
- **Verified**: — · **Verdict**: open
- **Comment**: The year, code distances, and "first claims" attribution should all be confirmed against the original paper.

## §25.6 — Google 2024 distance-7 results with $p_L$(d=7) < $p_L$(d=5)

- **Claim** (anchor): "followed in 2024 by distance-7 results showing $p_L$ at distance-7 below $p_L$ at distance-5"
- **Method**: external
- **Source**: TBD — needs verification (Google Quantum AI 2024 paper — confirm exact citation and year)
- **Verified**: — · **Verdict**: open
- **Comment**: Specific experimental result; confirm that a 2024 paper reports distance-7 logical error rate below distance-5.

## §25.6 — Quantinuum 2024–2025 below-threshold demonstrations on trapped-ion systems

- **Claim** (anchor): "Quantinuum's 2024–2025 experiments on trapped-ion systems demonstrated similar distance-scaling on a different code family."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution to Quantinuum and the specific timeframe (2024–2025) should be confirmed against published papers.

## §25.6 — Distance-9 to distance-11 demonstrations in progress as of 2026

- **Claim** (anchor): "distance-9 to distance-11 demonstrations in progress"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: State-of-the-field claim for 2026; requires confirmation against published or announced experimental programs.

## §25.6 — Surface-code physical qubit overhead: $\sim 2d^2$ per logical qubit

- **Claim** (anchor): "a surface-code logical qubit consumes $\sim 2 d^2$ physical qubit"
- **Method**: derivation
- **Source**: → §19 (Chapter 19, surface-code construction and qubit counting)
- **Verified**: — · **Verdict**: open
- **Comment**: Standard surface-code result; confirm the $2d^2$ formula (sometimes stated as $d^2$ data + $d^2-1$ ancilla ≈ $2d^2$ total) against Chapter 19 or a standard QEC reference.

## §25.6 — Distance $d=7$ costs ~100 physical qubits per logical; $d=21$ costs ~1,000

- **Claim** (anchor): "With $d=7$ and realistic ancilla overhead, that is around $100$ physical qubits per logical, growing to $\sim 1{,}000$ at $d=21$"
- **Method**: derivation
- **Source**: → §19 (using $\sim 2d^2$ formula: $2\times7^2=98$; $2\times21^2=882$)
- **Verified**: — · **Verdict**: open
- **Comment**: These are direct applications of the $2d^2$ formula. The claim that $d=21$ is the distance needed for cryptographically relevant Shor is a cross-reference claim (see next entry).

## §25.6 — Distance $d \approx 21$ needed for cryptographically relevant Shor instances

- **Claim** (anchor): "growing to $\sim 1{,}000$ at $d=21$ — the distance needed for cryptographically relevant Shor instances (Chapter 27)"
- **Method**: external
- **Source**: TBD — needs verification (resource-estimation papers for Shor on RSA-2048, e.g., Gidney & Ekerå or similar)
- **Verified**: — · **Verdict**: open
- **Comment**: The specific distance $d=21$ for cryptographically relevant Shor is an empirical claim derived from resource estimates; should be traced to Chapter 27 or a cited resource-estimate paper.

## §25.6 — Magic-state distillation demonstrated at small scale in 2024–2025 by Quantinuum and others

- **Claim** (anchor): "Distillation has been demonstrated at small scale in 2024–2025 (Quantinuum and others)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific experimental attribution (Quantinuum, 2024–2025); requires citation to published demonstration papers.

## §25.6 — Resource estimate for Shor/chemistry: $10^9$ to $10^{12}$ $T$ gates

- **Claim** (anchor): "Resource estimates for industrially relevant Shor or chemistry workloads suggest $10^9$ to $10^{12}$ $T$ gates"
- **Method**: external
- **Source**: TBD — needs verification (e.g., Gidney & Ekerå for Shor; Babbush et al. for chemistry — confirm exact citations)
- **Verified**: — · **Verdict**: open
- **Comment**: This range spans a very wide interval; specific citations distinguishing the Shor and chemistry estimates are needed.

## §25.6 — Projection: 10–100 logical qubits by ~2030 for "early-FT useful chemistry"

- **Claim** (anchor): "By $\sim 2030$: $10$–$100$ logical qubits at modest distance, sufficient for small chemistry and algorithmic demonstrations beyond what NISQ can reach."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Forward-looking roadmap projection; should be compared against published industry and academic roadmaps (e.g., IBM, Google Quantum AI).

## §25.6 — Projection: $10^3$–$10^4$ logical qubits by ~2035–2040 for RSA-2048 Shor

- **Claim** (anchor): "By $\sim 2035$–$2040$: $10^3$–$10^4$ logical qubits at distances supporting algorithms with $\sim 10^9$ logical operations — the threshold for cryptographically relevant Shor on 2048-bit RSA"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Long-range projection and the Shor resource requirement ($10^9$ logical operations for RSA-2048) both need anchoring to published resource estimates and roadmaps.

## §25.6 — Cryptographic migration is a 10–15-year exercise

- **Claim** (anchor): "Post-quantum cryptographic migration (Chapter 27) is a 10–15-year exercise"
- **Method**: external
- **Source**: TBD — needs verification (NIST PQC migration guidance, or CISA/NSA timelines)
- **Verified**: — · **Verdict**: open
- **Comment**: The "10–15-year" migration timeline is an empirical claim about IT infrastructure; should be confirmed against published government or standards-body migration guidance.
