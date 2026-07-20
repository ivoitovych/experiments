# Factcheck — §28 Scientific Computing and Physical Simulation

Mirrors `book/part-11-applications/28-scientific-computing-and-physical-simulation.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §28.0 — Feynman 1982 lecture

- **Claim** (anchor): "Feynman's 1982 lecture "Simulating Physics with Computers""
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: year and title of Feynman's foundational lecture on quantum simulation.

## §28.1 — Born–Oppenheimer justification

- **Claim** (anchor): "the nuclei, thousands of times heavier than electrons, move on a much slower timescale"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: justification for Born–Oppenheimer approximation by mass ratio.

## §28.1 — Two-electron integral count

- **Claim** (anchor): "The number of two-electron integrals is"
- **Method**: derivation
- **Source**: → §28.1 (second-quantization derivation; M spin-orbitals yield O(M^4) integrals from four-index tensor h_pqrs)
- **Verified**: — · **Verdict**: open

## §28.1 — Jordan–Wigner Pauli weight

- **Claim** (anchor): "Local fermionic operators map to Pauli strings of weight up to"
- **Method**: derivation
- **Source**: → §28.1 (Jordan–Wigner construction; Z-string runs from site 1 to p-1, giving O(M) weight)
- **Verified**: — · **Verdict**: open

## §28.1 — Bravyi–Kitaev Pauli weight

- **Claim** (anchor): "A tree-structured mapping that achieves"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim that Bravyi–Kitaev achieves O(log M) Pauli weight via binary-tree partial sums.

## §28.1 — Bravyi–Kitaev crossover point

- **Claim** (anchor): "where the crossover against Jordan–Wigner falls depends on the Hamiltonian, hardware connectivity, and compiler"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: empirical crossover claim around M = 20–30 orbitals.

## §28.1 — Tensor hypercontraction and double factorization

- **Claim** (anchor): "classical pre-processing techniques whose quantum-resource use matured after 2018, building on density-fitting and Cholesky ideas that long predate it"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: attribution and dating of these pre-processing techniques.

## §28.1 — UCCSD circuit depth

- **Claim** (anchor): "the Trotterized exponential of"
- **Method**: derivation
- **Source**: → §28.1 (UCCSD ansatz has O(M^4) excitations; Trotter implementation gives O(M^4) depth per step)
- **Verified**: — · **Verdict**: open

## §28.1 — ADAPT-VQE circuit compression

- **Claim** (anchor): "Reported circuit reductions of severalfold relative to UCCSD are instance- and pool-dependent"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: ADAPT-VQE achieving 5–10x shorter circuits than UCCSD at comparable accuracy.

## §28.1 — VQE measurement cost

- **Claim** (anchor): "published scenario analyses put chemical accuracy on $\sim$50-orbital active spaces at $10^9$–$10^{12}$ shots"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim of 10^9–10^12 shots required for chemical accuracy.

## §28.1 — QPE query complexity

- **Claim** (anchor): "the eigenphase corresponding to the energy. The output is the energy to additive precision"
- **Method**: derivation
- **Source**: → §16.5 (QPE via qubitization/QSVT; O((alpha/epsilon) log(1/delta)) query count derived there)
- **Verified**: — · **Verdict**: open

## §28.1 — Chemical accuracy definition

- **Claim** (anchor): "chemical accuracy"
- **Method**: convention
- **Source**: → §28.1 notation (defined inline as ~1 kcal/mol, or roughly 1.6e-3 Hartree)
- **Verified**: — · **Verdict**: open
- **Comment**: standard chemistry convention; the numeric value is a factual claim.

## §28.1 — FeMoco biological reaction

- **Claim** (anchor): "catalyses biological nitrogen fixation"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: FeMoco's role as active site of nitrogenase; stoichiometry of the reaction shown.

## §28.1 — Haber–Bosch energy consumption

- **Claim** (anchor): "industrial analog (the Haber–Bosch process) consumes roughly"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim that Haber–Bosch consumes ~1% of global energy.

## §28.1 — FeMoco active space size

- **Claim** (anchor): "roughly $54$ electrons in active spaces of $54$–$76$ *spatial* orbitals in the common benchmarks"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: 54–76 orbital active space for FeMoco; strong multireference character from multiple Fe d-shells.

## §28.1 — Reiher et al. 2017 resource estimate

- **Claim** (anchor): "Reiher, Wiebe, Svore, Wecker, and Troyer's 2017 resource estimate for QPE on FeMoco landed at roughly"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: attributed ~10^11 T gates and ~100 logical qubits to the Reiher et al. 2017 paper.

## §28.1 — Beverland et al. 2022 resource estimate

- **Claim** (anchor): "Berry et al. 2019, Lee et al. 2021, von Burg et al. 2021, and the Beverland et al. 2022 end-to-end accounting"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: refinement chain from Reiher 2017 to Beverland 2022; T-count brought down to ~10^10 on ~10^3 logical qubits.

## §28.1 — Beverland et al. 2022 physical qubit estimate

- **Claim** (anchor): "days of runtime on a"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: surface-code distance d≈25, physical error rate 10^-3, translating to ~10^6 physical qubits and days of runtime.

## §28.2 — Hubbard model cuprate connection

- **Claim** (anchor): "a leading candidate model for high-temperature cuprate superconductivity — how much of the essential physics it captures is itself debated"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim that 2D Hubbard at half-filling and U/t≈8 models cuprate superconductors.

## §28.2 — DFT Hohenberg–Kohn theorem

- **Claim** (anchor): "the Hohenberg–Kohn theorem that the ground-state energy is a functional of"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: statement of the Hohenberg–Kohn theorem underpinning DFT.

## §28.2 — Quantum impurity solver qubit range

- **Claim** (anchor): "The impurity plus a finite bath truncation fits in tens of qubits *by count*"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim that impurity + bath fits in 20–100 qubits, making it VQE-scale on near-term devices.

## §28.2 — DMFT quantum impurity solver demonstrations

- **Claim** (anchor): "Several 2023–2025 papers demonstrate the workflow on toy two-site impurity models on superconducting and trapped-ion hardware"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §28.3 — Nuclear shell model basis size

- **Claim** (anchor): "the basis sizes for medium-mass nuclei"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim that A~100 nuclei reach 10^20 Slater determinants, beyond exact diagonalization.

## §28.3 — Ultracold atom lattice simulation scale

- **Claim** (anchor): "Analog simulators of the 2D Hubbard model with"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: ~10^3-site 2D Hubbard analog simulators probing antiferromagnetic correlations.

## §28.4 — DMET fragment+bath qubit count

- **Claim** (anchor): "The fragment+bath size is typically"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: 10–40 spin-orbitals (20–80 qubits) for DMET fragment; remaining 10^3–10^6 orbitals handled classically.

## §28.4 — DMET-VQE publications

- **Claim** (anchor): "Several 2024–2025 publications demonstrate end-to-end DMET-VQE on small molecules and on cluster models of bulk materials"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §28.4 — Active-space size sweet spot

- **Claim** (anchor): "The active-space size is the relevant resource parameter"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim that M_a = 50–100 orbitals is where classical CASSCF becomes prohibitive but quantum solvers remain feasible.

## §28.5 — Post-Trotter optimal scaling

- **Claim** (anchor): "achieves the optimal $\Theta(\alpha t + \log(1/\epsilon)/\log\log(1/\epsilon))$ query scaling in the block-encoding model"
- **Method**: derivation
- **Source**: → §§16.5–16.7 (qubitization/QSVT-based simulation achieving Theta(t||H|| + log(1/epsilon)) complexity)
- **Verified**: — · **Verdict**: open

## §28.5 — Quantum Metropolis algorithm

- **Claim** (anchor): "quantum metropolis algorithm (Temme et al. 2011)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: attribution of quantum Metropolis algorithm to Temme et al. 2011.

## §28.6 — Martinez et al. 2016 Schwinger model experiment

- **Claim** (anchor): "Martinez et al.'s 2016 trapped-ion experiment"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: first trapped-ion demonstration of lattice Schwinger model simulation, attributed to Martinez et al. 2016.

## §28.6 — SU(3) lattice QCD resource estimate

- **Claim** (anchor): "Early resource sketches for full $3+1$-dimensional $SU(3)$ lattice QCD on useful volumes run to enormous figures"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: 3+1-dimensional SU(3) lattice QCD estimated at 10^7+ logical qubits and 10^20 T gates.

## §28.7 — Carleman linearization efficiency condition

- **Claim** (anchor): "The algorithm is provably efficient only in strongly dissipative regimes — when the papers' dissipativity parameter $R$, roughly the strength of the nonlinearity relative to the dissipation, is below $1$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Liu–Kolden–Krovi–Loureiro–Trivisa–Childs 2021 result; efficiency requires R < 1 (strongly dissipative regime).

## §28.7 — Carleman linearization paper attribution

- **Claim** (anchor): "Liu–Kolden–Krovi–Loureiro–Trivisa–Childs 2021, with subsequent refinements"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §28.7 — Poisson equation condition number

- **Claim** (anchor): "Poisson-equation discretizations on a 3D grid have"
- **Method**: derivation
- **Source**: → §28.7 (standard result: 3D Poisson on N-point grid has kappa = O(N^{2/3}), which grows with N and eliminates exponential speedup without preconditioning)
- **Verified**: — · **Verdict**: open

## §28.8 — CCSD(T) scaling

- **Claim** (anchor): "gold standard for closed-shell, weakly-correlated molecules. Polynomial-scaling (typically"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: CCSD(T) scaling as N^7 in orbital count N; standard result in quantum chemistry.

## §28.8 — DMRG cylinder width limit

- **Claim** (anchor): "DMRG is essentially exact in 1D and on cylinders up to width"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: practical DMRG accuracy limit on cylinders of width ~8–12 sites.

## §28.8 — Quantum advantage timeline for strongly correlated chemistry

- **Claim** (anchor): "Quantum advantage requires fault-tolerant hardware delivering QPE on"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: claim that ~100–1000 logical qubit QPE for strongly correlated transition-metal complexes is credibly within 10–20 years.

## §28.8 — Superconductor simulation qubit requirement

- **Claim** (anchor): "contingent on"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: solving doped 2D Hubbard phase diagram beyond DMRG contingent on ~10^3-qubit fault-tolerant hardware.
