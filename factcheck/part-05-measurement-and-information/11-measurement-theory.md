# Factcheck — §11 Measurement Theory

Mirrors `book/part-05-measurement-and-information/11-measurement-theory.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §11.1 — Projective measurement outcome count bounded by Hilbert-space dimension

- **Claim** (anchor): "the number of outcomes is bounded by the dimension of the Hilbert space — a projective measurement on"
- **Method**: derivation
- **Source**: → §11.1 (follows from orthogonality of projectors and dimension counting)
- **Verified**: — · **Verdict**: open

## §11.1 — Repeatability of projective measurement

- **Claim** (anchor): "repeating the same projective measurement immediately gives the same outcome (the **repeatability** property)"
- **Method**: derivation
- **Source**: → §11.1 (once collapsed onto range of $P_m$, state is eigenstate of every $P_{m'}$)
- **Verified**: — · **Verdict**: open

## §11.2 — POVM completeness and non-negativity as sufficient conditions for valid statistics

- **Claim** (anchor): "which is non-negative because"
- **Method**: derivation
- **Source**: → §11.2 (follows from $\rho \succeq 0$, $E_m \succeq 0$, and $\mathrm{tr}(\rho)=1$)
- **Verified**: — · **Verdict**: open

## §11.2 — SIC-POVM on a qubit has exactly four outcomes

- **Claim** (anchor): "the symmetric informationally-complete POVM on a qubit has exactly four outcomes"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The four-outcome SIC-POVM (symmetric informationally complete) on a qubit is a standard result; sometimes called the "Bloch-tetrahedron POVM" below. Verify SIC-POVM literature (Renes et al. 2004 or earlier).

## §11.2 — Trine POVM on a qubit: three rank-one effects summing to identity

- **Claim** (anchor): "three rank-one positive operators sum to $I$ (check: each contributes"
- **Method**: derivation
- **Source**: → §11.2 (coplanar unit vectors at 120° sum to zero; inline verification)
- **Verified**: — · **Verdict**: open

## §11.2 — No projective measurement on a qubit has three outcomes

- **Claim** (anchor): "No projective measurement on a qubit has three outcomes; the trine is genuinely non-projective."
- **Method**: derivation
- **Source**: → §11.1 (a qubit lives in dimension 2, bounding projective outcomes to at most 2)
- **Verified**: — · **Verdict**: open

## §11.2 — Kraus operators: same POVM element, distinct post-measurement states

- **Claim** (anchor): "Different choices of $M_m$ for the same $E_m$ correspond to physically distinct measurement implementations producing the same outcome statistics but different post-measurement states."
- **Method**: external
- **Source**: TBD — needs verification; standard result, e.g., Nielsen & Chuang §2.2
- **Verified**: — · **Verdict**: open

## §11.3 — Naimark dilation theorem statement

- **Claim** (anchor): "every POVM on $\mathcal{H}$ is the marginal of a projective measurement on a larger Hilbert space"
- **Method**: external
- **Source**: Naimark (Neumark), "Spectral functions of a symmetric operator," Izv. Akad. Nauk SSSR, Ser. Mat. 4 (1940); see also Nielsen & Chuang §2.2.6
- **Verified**: — · **Verdict**: open

## §11.3 — Naimark dilation: ancilla dimension bound

- **Claim** (anchor): "The ancilla dimension needed is at most equal to the number of POVM outcomes; for the trine POVM on a qubit, a single ancilla qubit suffices."
- **Method**: derivation
- **Source**: → §11.3 (standard construction; trine has 3 outcomes, ancilla dimension ≥ 3, one qubit gives dimension 4 which is sufficient)
- **Verified**: — · **Verdict**: open
- **Comment**: The claim says "at most equal to the number of outcomes"; for the trine that is 3, and a single ancilla qubit gives dimension 4. Worth verifying whether the tighter bound is 3 or whether a 2-dimensional ancilla also suffices.

## §11.4 — Pauli operator basis for n-qubit density matrices

- **Claim** (anchor): "The set $\\{P : P \\in \\{I, X, Y, Z\\}^{\\otimes n}\\}$ is a basis for the $4^n$-dimensional space of Hermitian operators on $n$ qubits, orthonormal under the Hilbert–Schmidt inner product"
- **Method**: derivation
- **Source**: → §11.4 (standard linear-algebra fact; follows from tensor-product structure of Pauli matrices)
- **Verified**: — · **Verdict**: open

## §11.4 — Full state tomography requires exponential measurements

- **Claim** (anchor): "one needs at least $\\Omega(4^n / \\varepsilon^2)$ total measurements — though not $4^n$ distinct *settings*"
- **Method**: external
- **Source**: TBD — needs verification; standard information-theoretic lower bound, e.g., Haah et al. (2017) or earlier references
- **Verified**: — · **Verdict**: open

## §11.4 — Process tomography is 4^n-times costlier than state tomography

- **Claim** (anchor): "Process tomography is therefore $4^n$-times costlier than state tomography in shot count."
- **Method**: derivation
- **Source**: → §11.4 (follows from the need to perform state tomography on each of $4^n$ input states)
- **Verified**: — · **Verdict**: open

## §11.4 — Direct fidelity estimation: O(1/ε²) Pauli measurements independent of n

- **Claim** (anchor): "direct fidelity estimation (estimate $\\langle\\psi|\\rho|\\psi\\rangle$ to additive error with $O(1/\\varepsilon^2)$ Pauli measurements drawn from an importance distribution, regardless of $n$)"
- **Method**: external
- **Source**: TBD — needs verification; attributed to da Silva, Landon-Cardinal & Poulin (2011) or Flammia & Liu (2011)
- **Verified**: — · **Verdict**: open

## §11.5 — Classical shadows: Huang–Kueng–Preskill 2020 attribution

- **Claim** (anchor): "Classical shadow tomography (Huang–Kueng–Preskill, 2020) is a randomized-measurement protocol"
- **Method**: external
- **Source**: Huang, Kueng & Preskill, "Predicting many properties of a quantum system from very few measurements," Nature Physics 16 (2020)
- **Verified**: — · **Verdict**: open

## §11.5 — Classical shadows: shadow-norm sample complexity formula

- **Claim** (anchor): "samples, where $\\|O\\|_{\\mathrm{shadow}}$ is a norm depending on the unitary ensemble used."
- **Method**: external
- **Source**: Huang, Kueng & Preskill (2020)
- **Verified**: — · **Verdict**: open

## §11.5 — Classical shadows: k-local Pauli shadow norm bound and n-independence

- **Claim** (anchor): "For Pauli observables and random-Pauli measurements, $\\|O\\|_{\\mathrm{shadow}}^2 \\le 4^k$ for a $k$-local Pauli, so the shot count is **independent of the ambient qubit number** $n$ — it grows only with locality $k$ and (logarithmically) with the number $M$ of observables requested."
- **Method**: external
- **Source**: Huang, Kueng & Preskill (2020)
- **Verified**: — · **Verdict**: open

## §11.5 — Classical shadows: shadow estimator is unbiased

- **Claim** (anchor): "it is an unbiased estimator of $\\rho$ in the sense that $\\mathbb{E}[\\hat\\rho] = \\rho$"
- **Method**: derivation
- **Source**: → §11.5 (follows by construction: $\mathcal{M}^{-1}$ is defined so that $\mathbb{E}[\hat\rho] = \rho$)
- **Verified**: — · **Verdict**: open

## §11.5 — Random global Cliffords require depth O(n²/log n)

- **Claim** (anchor): "random global Cliffords on $n$ qubits require depth $O(n^2 / \\log n)$ to compile"
- **Method**: external
- **Source**: TBD — needs verification; compilation complexity of random Clifford circuits
- **Verified**: — · **Verdict**: open

## §11.6 — Holevo–Helstrom theorem for minimum-error discrimination

- **Claim** (anchor): "The Holevo–Helstrom theorem gives the closed-form optimum: the minimum error probability is"
- **Method**: external
- **Source**: Helstrom, "Quantum Detection and Estimation Theory," Academic Press (1976); Holevo, "Statistical Decision Theory for Quantum Systems," J. Multivariate Anal. 3 (1973)
- **Verified**: — · **Verdict**: open

## §11.6 — Helstrom bound: optimal measurement is projection onto eigenspaces of π₀ρ₀ − π₁ρ₁

- **Claim** (anchor): "The optimal measurement is the projective measurement onto the positive and negative eigenspaces of the operator"
- **Method**: external
- **Source**: Helstrom, "Quantum Detection and Estimation Theory" (1976)
- **Verified**: — · **Verdict**: open

## §11.6 — Trace distance operational meaning as bias of best discriminator

- **Claim** (anchor): "The trace distance therefore acquires the operational meaning **\"bias of the best discriminator\"**"
- **Method**: external
- **Source**: TBD — needs verification; standard result, e.g., Nielsen & Chuang §9.2
- **Verified**: — · **Verdict**: open

## §11.6 — Unambiguous discrimination (Ivanovic–Dieks–Peres) attribution

- **Claim** (anchor): "**Unambiguous discrimination** (Ivanovic–Dieks–Peres)."
- **Method**: external
- **Source**: Ivanovic, Phys. Lett. A 123 (1987); Dieks, Phys. Lett. A 126 (1988); Peres, Phys. Lett. A 128 (1988)
- **Verified**: — · **Verdict**: open

## §11.6 — Minimum inconclusive probability for pure states under equal priors

- **Claim** (anchor): "the minimum inconclusive probability with equal priors is $P_? = |c|$, achieved by an explicit three-element POVM."
- **Method**: external
- **Source**: Ivanovic (1987); Dieks (1988); Peres (1988)
- **Verified**: — · **Verdict**: open

## §11.6 — Unambiguous discrimination support condition for mixed states

- **Claim** (anchor): "unambiguous discrimination is possible iff neither state's support is contained in the other's."
- **Method**: external
- **Source**: TBD — needs verification; generalization to mixed states, see Rudolph, Spekkens & Turner (2003) or earlier references
- **Verified**: — · **Verdict**: open

## §11.7 — Shot-noise floor: O(1/ε²) shots per observable

- **Claim** (anchor): "To estimate any $\\langle O\\rangle$ to additive error $\\varepsilon$ with confidence, one needs $N = \\Omega(1/\\varepsilon^2)$ shots per observable at constant confidence — the **shot-noise floor** of direct, independent-shot sampling"
- **Method**: derivation
- **Source**: → §11.7 (follows from the central limit theorem applied to bounded ±1 random variables)
- **Verified**: — · **Verdict**: open

## §11.7 — Basis rotation for Pauli strings: gate prescriptions

- **Claim** (anchor): "apply a single-qubit basis-change gate to each qubit ($H$ for $X$, $H S^\\dagger$ for $Y$, identity for $Z$, no gate for $I$)"
- **Method**: convention
- **Source**: → §9 notation; Appendix A
- **Verified**: — · **Verdict**: open

## §11.7 — Pauli eigenvalue parity formula

- **Claim** (anchor): "the eigenvalue of $P$ on the measured bit string $b = (b_1, \\ldots, b_n)$ is $\\prod_{i : P_i \\neq I} (-1)^{b_i}$"
- **Method**: derivation
- **Source**: → §11.7 (follows from the ±1 eigenvalue structure of single-qubit Paulis)
- **Verified**: — · **Verdict**: open

## §11.7 — Joint measurability iff Paulis commute

- **Claim** (anchor): "**Joint measurability** of two Paulis $P$ and $Q$ in a single shot is possible whenever they commute"
- **Method**: external
- **Source**: TBD — needs verification; standard result in quantum information/measurement theory
- **Verified**: — · **Verdict**: open

## §11.7 — Qubit-wise commutativity enables tensor-product diagonalization

- **Claim** (anchor): "The *qubit-wise commuting* subcase — every pair $(P_i, Q_i)$ commutes — is exactly when the joint diagonalization is a tensor product of *single-qubit* unitaries"
- **Method**: derivation
- **Source**: → §11.7 (follows from tensor-product structure; each qubit can be independently diagonalized)
- **Verified**: — · **Verdict**: open

## §11.7 — Parameter-shift rule for Pauli generators

- **Claim** (anchor): "the gradient of an expectation value $\\langle O\\rangle(\\theta) = \\mathrm{tr}(O\\, \\rho(\\theta))$ obeys"
- **Method**: external
- **Source**: Mitarai et al., "Quantum circuit learning," Phys. Rev. A 98 (2018); Schuld et al., "Evaluating analytic gradients on quantum hardware," Phys. Rev. A 99 (2019)
- **Verified**: — · **Verdict**: open

## §11.7 — Readout-error mitigation via calibration matrix inversion

- **Claim** (anchor): "Estimating $A$ is a calibration step (repeated in practice — readout drifts): prepare each computational-basis state $|b'\\rangle$, measure, and collect the empirical conditional distribution."
- **Method**: external
- **Source**: TBD — needs verification; standard readout-error mitigation procedure, see e.g., Temme, Bravyi & Gambetta (2017) or Maciejewski et al. (2020)
- **Verified**: — · **Verdict**: open

## §11.7 — Tensor-product readout model reduces calibration to 2n circuits

- **Claim** (anchor): "tensor-product readout models reduce calibration to $2n$ circuits (two per qubit) and apply the factorized inverse in $O(n \\cdot 2^n)$ time when single-qubit readout errors are independent"
- **Method**: external
- **Source**: TBD — needs verification; standard simplification in readout-error mitigation literature
- **Verified**: — · **Verdict**: open
