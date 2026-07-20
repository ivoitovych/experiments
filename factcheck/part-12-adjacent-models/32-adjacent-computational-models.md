# Factcheck — §32 Adjacent Computational Models

Mirrors `book/part-12-adjacent-models/32-adjacent-computational-models.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §32.1 — AQC runtime sufficient condition (cubic/quadratic gap dependence)

- **Claim** (anchor): "with the cubic dependence reduced to quadratic under tighter hypotheses"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The source claims the standard sufficient condition scales as the inverse cube of the minimum spectral gap, reducible to quadratic under stronger assumptions; needs citation to the relevant adiabatic-theorem literature.

## §32.1 — AQC universality equivalence (Aharonov et al. 2004)

- **Claim** (anchor): "Aharonov, van Dam, Kempe, Landau, Lloyd, and Regev proved in 2004 that AQC and the circuit model are polynomially equivalent"
- **Method**: external
- **Source**: Aharonov, van Dam, Kempe, Landau, Lloyd, Regev (2004) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed result; equivalence is via the circuit-to-Hamiltonian (history-state) construction. Author list and year should be confirmed against the published paper.

## §32.1 — Circuit-to-Hamiltonian mapping origin (Feynman / Kitaev)

- **Claim** (anchor): "the circuit-to-Hamiltonian mapping (Feynman's history-state idea, sharpened by Kitaev)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributes the history-state / circuit-to-Hamiltonian technique to Feynman (original idea) and Kitaev (sharpening); both attributions require confirmation.

## §32.1 — k-locality constraint in AQC universality constructions

- **Claim** (anchor): "The Hamiltonians produced by the universality construction are typically k-local for k ge 3, and engineering arbitrary k-local interactions in hardware is hard"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claims that hardware implementations typically restrict to 2-local Hamiltonians or use perturbative gadgets; this is a technical claim about the structure of the universality proof.

## §32.2 — D-Wave coupling graph topologies (Chimera, Pegasus, Zephyr)

- **Claim** (anchor): "hardware-restricted coupling graph (Chimera, Pegasus, and now Zephyr topologies)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware-specific, perishable claim about D-Wave's coupling-graph generations; should be confirmed against D-Wave product documentation.

## §32.2 — Quantum annealing not provably equivalent to circuit model

- **Claim** (anchor): "Quantum annealing is not provably equivalent to the circuit model"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Complexity-theoretic status claim; the open question of whether quantum annealing achieves provable speedups vs. classical methods is well-established in the literature but should be confirmed.

## §32.2 — Mixed record vs. well-tuned classical solvers

- **Claim** (anchor): "published comparisons against well-tuned classical solvers (simulated annealing, parallel tempering, branch-and-bound) have produced a mixed record"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about the aggregate literature comparing D-Wave to classical optimizers; requires citation to benchmark studies.

## §32.3 — MBQC named "one-way model" after Raussendorf and Briegel, 2001

- **Claim** (anchor): "also called the one-way model after Raussendorf and Briegel, 2001"
- **Method**: external
- **Source**: Raussendorf and Briegel (2001) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution of the one-way / MBQC model and its name; year and authorship should be confirmed.

## §32.3 — MBQC universality theorem (Raussendorf, Browne, Briegel)

- **Claim** (anchor): "The key theorem (Raussendorf, Browne, Briegel) is that a 2D cluster state plus arbitrary single-qubit measurements is universal for quantum computation, and polynomially equivalent to the circuit model"
- **Method**: external
- **Source**: Raussendorf, Browne, Briegel — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Core universality result for MBQC; author list requires confirmation (Raussendorf–Briegel 2001 is the original paper; the three-author version may be a separate or follow-on result).

## §32.3 — MBQC resource overhead (circuit width w, depth d maps to cluster of O(w × d))

- **Claim** (anchor): "A circuit of width w and depth d maps onto a cluster of O(w times d) qubits with a measurement pattern of size O(w d)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Quantitative overhead claim for the circuit-to-MBQC translation; should be verified against the universality proof.

## §32.3 — MBQC fit for photonic hardware (PsiQuantum and Xanadu)

- **Claim** (anchor): "PsiQuantum and Xanadu both target architectures broadly in this family"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-specific, perishable claim about company roadmaps; should be confirmed against published technical roadmaps.

## §32.4 — Majorana experimental status: signatures reported and retracted since 2012

- **Claim** (anchor): "signatures consistent with Majoranas have been reported and retracted multiple times since 2012"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about the experimental history of Majorana signatures; the retractions (notably Microsoft/Delft 2021) and the timeline since 2012 need confirmation.

## §32.4 — Majorana braiding generates only the Clifford group

- **Claim** (anchor): "Majorana braiding is also not, on its own, universal — it generates only the Clifford group and must be supplemented by a non-Clifford resource (such as a T-state injection) to reach universality"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Technical claim about the computational power of Majorana braid group representations; well-known result but requires citation.

## §32.4 — Fibonacci anyons are braiding-universal

- **Claim** (anchor): "Fibonacci anyons, in contrast, are braiding-universal — their braiding group alone is dense in the unitary group"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed property of Fibonacci anyon braiding representations; standard result in topological quantum computation literature, needs citation.

## §32.4 — Fibonacci anyons motivated by fractional quantum Hall at filling ν = 12/5

- **Claim** (anchor): "motivated by certain fractional quantum Hall states at filling"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Physical claim that Fibonacci anyons are theoretically motivated by fractional quantum Hall states at filling nu = 12/5; requires confirmation against condensed-matter literature.

## §32.4 — Surface code as emulation of an Abelian-anyon system

- **Claim** (anchor): "the surface code is itself an emulation of an Abelian-anyon system"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Conceptual claim linking the surface code to Abelian anyonic physics (toric code); standard result attributed to Kitaev, but should be confirmed.

## §32.5 — Gaussian states under Gaussian operations are classically efficiently simulable (Bartlett et al. 2002)

- **Claim** (anchor): "Gaussian states under Gaussian operations and Gaussian measurements are classically efficiently simulable (Bartlett, Sanders, Braunstein, Nemoto, 2002)"
- **Method**: external
- **Source**: Bartlett, Sanders, Braunstein, Nemoto (2002) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed classical-simulability result for Gaussian CV quantum computing; author list and year need confirmation.

## §32.5 — CV universality: Gaussian gates plus any non-Gaussian gate (Lloyd and Braunstein, 1999)

- **Claim** (anchor): "The standard universality result (Lloyd and Braunstein, 1999) says that Gaussian operations plus a suitable nonlinear (non-Gaussian) Hamiltonian generate arbitrary polynomial Hamiltonians"
- **Method**: external
- **Source**: Lloyd and Braunstein (1999) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed universality result for CV quantum computing; author list and year need confirmation.

## §32.5 — GKP code encodes a logical qubit into an oscillator (Gottesman, Kitaev, Preskill)

- **Claim** (anchor): "the GKP code, named for Gottesman, Kitaev, Preskill, encodes a logical qubit into an oscillator"
- **Method**: external
- **Source**: Gottesman, Kitaev, Preskill — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution of the GKP code and its defining property; needs confirmation against the original paper.

## §32.6 — Boson sampling: Aaronson and Arkhipov, 2011

- **Claim** (anchor): "Boson sampling (Aaronson and Arkhipov, 2011) is not a model of universal quantum computation"
- **Method**: external
- **Source**: Aaronson and Arkhipov (2011) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution of boson sampling and its non-universality; year and authorship should be confirmed.

## §32.6 — Computing the permanent is #P-hard

- **Claim** (anchor): "Computing the permanent of a matrix is #P-hard"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Complexity-theoretic claim; the #P-hardness of the permanent is a classical result (Valiant 1979) that underpins boson sampling hardness.

## §32.6 — Aaronson–Arkhipov hardness of approximate boson sampling

- **Claim** (anchor): "Aaronson and Arkhipov's theorem routes through polynomial-hierarchy-collapse consequences, and the *approximate*-sampling version additionally assumes average-case permanent hardness and anti-concentration conjectures"
- **Method**: external
- **Source**: Aaronson and Arkhipov (2011) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Core hardness result; the "approximate" and "under reasonable conjectures" qualifications are important and should be confirmed against the original paper.

## §32.6 — GBS replaces permanent with hafnian

- **Claim** (anchor): "GBS retains the conjectured classical hardness, replaces the permanent with a related matrix function called the hafnian"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Technical claim about the mathematical structure of Gaussian boson sampling; should be confirmed against the GBS literature.

## §32.6 — Jiuzhang experiments (2020–2023) and Xanadu Borealis (2022)

- **Claim** (anchor): "The University of Science and Technology of China's Jiuzhang experiments (2020–2023) and Xanadu's Borealis (2022) both report Gaussian boson sampling at scales where the corresponding classical simulation is reported as infeasible on present hardware"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific experimental results with dates; all three experimental claims (Jiuzhang 2020, Jiuzhang up to 2023, Borealis 2022) need verification. The "infeasible" claims are noted in the text as contested.

## §32.6 — Boson sampling applications: graph similarity, molecular vibronic spectra, dense-subgraph problems

- **Claim** (anchor): "Sampling from the hafnian distribution turns out to be relevant to graph similarity, molecular vibronic spectra, and certain dense-subgraph problems"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Applied-relevance claims for GBS; each of the three application domains requires separate confirmation.

## §32.7 — Quantum walks spread quadratically faster than classical random walks

- **Claim** (anchor): "interference between paths makes the walker spread quadratically faster than a classical walker"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Quantitative claim about the ballistic vs. diffusive spreading of quantum vs. classical random walks; standard result but should be confirmed.

## §32.7 — Continuous-time quantum walk model: Farhi and Gutmann (1998)

- **Claim** (anchor): "The model is simpler theoretically and has been used by Farhi and Gutmann (1998) and many later authors"
- **Method**: external
- **Source**: Farhi and Gutmann (1998) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution of the continuous-time quantum walk model to Farhi and Gutmann with year 1998; needs confirmation.

## §32.7 — Childs (2009): continuous-time quantum walks are universal

- **Claim** (anchor): "Childs (2009) proved that continuous-time quantum walks are universal for quantum computation, in the sense that any polynomial-time quantum circuit can be simulated by a polynomial-time walk on an appropriately constructed graph"
- **Method**: external
- **Source**: Childs (2009) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed universality result for continuous-time quantum walks; author name and year need confirmation.

## §32.8 — Bennett (1973): any classical computation can be made logically reversible

- **Claim** (anchor): "Bennett (1973) showed that any classical computation can be made logically reversible — every step is a bijection on the computer's state space — at the cost of a polynomial-bounded amount of extra space"
- **Method**: external
- **Source**: Bennett (1973) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed foundational result in reversible computing; year and authorship need confirmation.

## §32.8 — Landauer (1961): irreversible operations dissipate at least kT ln 2 per erased bit

- **Claim** (anchor): "Landauer (1961) had earlier shown that irreversible logical operations dissipate at least k_B T ln 2 of heat per erased bit"
- **Method**: external
- **Source**: Landauer (1961) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed result establishing the Landauer limit; year and author need confirmation.

## §32.8 — Toffoli gate is universal for reversible classical computation

- **Claim** (anchor): "The Toffoli gate (controlled-controlled-NOT, three-input, three-output) is universal for reversible classical computation"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Universality claim for the Toffoli gate in reversible classical computation; standard result but should be confirmed.

## §32.8 — Fredkin gate is universal and conservative

- **Claim** (anchor): "The Fredkin gate (controlled SWAP) is similarly universal and conservative (preserves the number of 1s)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Universality and conservation property of the Fredkin gate; standard result but should be confirmed.

## §32.8 — Classical circuit of size T converts to Toffoli circuit of size O(T) with O(T) ancilla bits

- **Claim** (anchor): "Any classical circuit with AND, OR, NOT gates of size T can be converted to a Toffoli circuit of size O(T) that produces the same output along with O(T) ancilla bits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Quantitative claim about the overhead of converting classical circuits to reversible (Toffoli) circuits; needs verification against the reversible computing literature.

## §32.9 — BPP ⊆ BQP

- **Claim** (anchor): "The interference is the source of the quantum advantage, and BPP"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Complexity inclusion claim with a stated proof sketch; the containment BPP ⊆ BQP is well-established, and the Hadamard-based simulation argument should be confirmed.

## §32.9 — Factoring and discrete log are presumed BQP counterexamples to BPP = BQP but have no unconditional proof

- **Claim** (anchor): "The factoring and discrete-log algorithms (Shor) are presumed counterexamples but have no unconditional proof of classical hardness"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Complexity-theoretic status of Shor's algorithm relative to the BPP vs. BQP question; the lack of unconditional classical hardness proofs for factoring/discrete-log is a well-known open problem.

## §32.10 — Equivalence: circuit model ≡ AQC (Aharonov et al. 2004)

- **Claim** (anchor): "adiabatic quantum computation (Aharonov et al., 2004): polynomially equivalent"
- **Method**: external
- **Source**: Aharonov et al. (2004) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Restatement of the §32.1 equivalence result in the summary table; same underlying paper.

## §32.10 — Equivalence: circuit model ≡ MBQC on 2D cluster state (Raussendorf and Briegel, 2001)

- **Claim** (anchor): "measurement-based quantum computation on a 2D cluster state (Raussendorf and Briegel, 2001): polynomially equivalent"
- **Method**: external
- **Source**: Raussendorf and Briegel (2001) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Restatement of the §32.3 equivalence result in the summary table.

## §32.10 — Equivalence: circuit model ≡ continuous-time quantum walks (Childs, 2009)

- **Claim** (anchor): "continuous-time quantum walks on an appropriate graph (Childs, 2009): polynomially equivalent"
- **Method**: external
- **Source**: Childs (2009) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Restatement of the §32.7 equivalence result in the summary table.

## §32.10 — Equivalence: circuit model ≡ CV computation with Gaussian gates plus non-Gaussian gate (Lloyd and Braunstein, 1999)

- **Claim** (anchor): "continuous-variable computation with a finite Gaussian gate set plus any non-Gaussian gate (Lloyd and Braunstein, 1999): universal, polynomially equivalent under reasonable encodings"
- **Method**: external
- **Source**: Lloyd and Braunstein (1999) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Restatement of the §32.5 universality result in the summary table.

## §32.10 — QKD deployed commercially for over two decades

- **Claim** (anchor): "QKD has been deployed commercially for over two decades"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable empirical claim about the commercial deployment history of quantum key distribution; needs confirmation against the historical record (first commercial QKD products appeared around 2002–2004).
