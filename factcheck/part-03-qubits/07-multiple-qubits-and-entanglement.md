# Factcheck — §7 Multiple Qubits and Entanglement

Mirrors `book/part-03-qubits/07-multiple-qubits-and-entanglement.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## §7.1 — Two-qubit state space is C^4

- **Claim** (anchor): "Two qubits live in $\mathcal{H}_A \otimes \mathcal{H}_B = \mathbb{C}^2 \otimes \mathbb{C}^2 = \mathbb{C}^4$"
- **Method**: derivation
- **Source**: → §7.1 (follows from the tensor product of two copies of C²)
- **Verified**: — · **Verdict**: open

## §7.1 — Qiskit qubit-ordering convention differs from this book

- **Claim** (anchor): "Qiskit numbers from the least-significant end, so its qubit 0 is our rightmost"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about Qiskit's indexing convention; cross-reference §4.2 and Appendix A.

## §7.2 — n-qubit state space dimension is 2^n

- **Claim** (anchor): "An $n$-qubit system lives in $(\mathbb{C}^2)^{\otimes n} = \mathbb{C}^{2^n}$"
- **Method**: derivation
- **Source**: → §7.2 (iterated tensor product)
- **Verified**: — · **Verdict**: open

## §7.2 — Pure n-qubit state has 2·2^n − 2 real parameters

- **Claim** (anchor): "leaving $2 \cdot 2^n - 2$ real parameters"
- **Method**: derivation
- **Source**: → §7.2 (2^n complex amplitudes, minus normalization constraint, minus global phase)
- **Verified**: — · **Verdict**: open

## §7.2 — 300-qubit amplitude count exceeds atoms in observable universe

- **Claim** (anchor): "For $n = 300$, this is more amplitudes than there are atoms in the observable universe"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard order-of-magnitude comparison; 2^300 ≈ 10^90, observable-universe atom count ~10^80.

## §7.3 — Product states require only O(n) parameters

- **Claim** (anchor): "$n$ qubits in a product state require only $O(n)$ real parameters to specify"
- **Method**: derivation
- **Source**: → §7.3 (each factor specified independently)
- **Verified**: — · **Verdict**: open

## §7.3 — Cross-ratio condition for product states

- **Claim** (anchor): "if $|\psi\rangle = \alpha_{00}|00\rangle + \alpha_{01}|01\rangle + \alpha_{10}|10\rangle + \alpha_{11}|11\rangle$ is a product state, then $\alpha_{00} \alpha_{11} = \alpha_{01} \alpha_{10}$"
- **Method**: derivation
- **Source**: → §7.3 (determinant of the 2×2 amplitude matrix equals zero)
- **Verified**: — · **Verdict**: open

## §7.4 — Jozsa–Linden 2003: entanglement necessary for exponential speedup

- **Claim** (anchor): "growing multipartite entanglement is necessary for any exponential speedup in the pure-state setting (Jozsa–Linden 2003)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named result attributed to Jozsa and Linden, 2003.

## §7.4 — DQC1 shows advantage with vanishing entanglement

- **Claim** (anchor): "certain mixed-state models (such as one-clean-qubit / DQC1) show an advantage with only vanishing entanglement"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical/theoretical claim about the DQC1 model.

## §7.5 — Bell states form orthonormal basis of C^2 ⊗ C^2

- **Claim** (anchor): "They form an orthonormal basis of $\mathbb{C}^2 \otimes \mathbb{C}^2$ — the Bell basis"
- **Method**: derivation
- **Source**: → §7.5 (mutual orthogonality and normalization verified in sanity check 1)
- **Verified**: — · **Verdict**: open

## §7.5 — Bell-state preparation circuit: H then CNOT

- **Claim** (anchor): "applying $H$ to the first qubit and then CNOT with first qubit as control"
- **Method**: derivation
- **Source**: → §7.5 (explicit circuit derivation in the section)
- **Verified**: — · **Verdict**: open

## §7.5 — Singlet is rotationally invariant under local unitaries

- **Claim** (anchor): "$(U \otimes U)|\Psi^-\rangle = |\Psi^-\rangle$ (up to a global phase) for every single-qubit unitary $U$"
- **Method**: derivation
- **Source**: → §7.5 (algebraic property of the antisymmetric state)
- **Verified**: — · **Verdict**: open

## §7.6 — GHZ and W states are in different SLOCC classes

- **Claim** (anchor): "They cannot be converted into one another by local operations and classical communication (LOCC) — they sit in different SLOCC (stochastic LOCC — LOCC allowed to succeed only with some probability) classes"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named result from multipartite entanglement theory (Dür, Vidal, Cirac 2000).

## §7.6 — Tracing out one GHZ qubit leaves no entanglement

- **Claim** (anchor): "If you trace out one qubit of $|\mathrm{GHZ}\rangle$, the remaining two are in a classical mixture of $|00\rangle$ and $|11\rangle$ with no remaining entanglement"
- **Method**: derivation
- **Source**: → §7.6 and §7.11 (partial trace calculation)
- **Verified**: — · **Verdict**: open

## §7.6 — Tracing out one W qubit leaves remaining two entangled

- **Claim** (anchor): "If you trace out one qubit of $|W\rangle$, the remaining two are still entangled"
- **Method**: derivation
- **Source**: → §7.6 and §7.11 (partial trace calculation)
- **Verified**: — · **Verdict**: open

## §7.6 — GHZ preparation requires one H and n−1 CNOTs

- **Claim** (anchor): "Preparing GHZ on $n$ qubits requires only one $H$ and $n{-}1$ CNOTs"
- **Method**: derivation
- **Source**: → §7.6 (standard GHZ preparation circuit)
- **Verified**: — · **Verdict**: open

## §7.7 — EPR argument: 1935, Einstein, Podolsky, Rosen

- **Claim** (anchor): "In 1935, Einstein, Podolsky, and Rosen argued that quantum mechanics is incomplete"
- **Method**: external
- **Source**: Einstein, Podolsky, Rosen, Physical Review 47, 777 (1935)
- **Verified**: — · **Verdict**: open

## §7.7 — Bohm reformulated EPR for spin singlet

- **Claim** (anchor): "Bohm reformulated it for the spin singlet $|\Psi^-\rangle$, which is the version most relevant here"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to Bohm's 1951 reformulation using discrete spin.

## §7.9 — Classical CHSH bound is |S| ≤ 2

- **Claim** (anchor): "For any local hidden-variable model, $|S| \leq 2$"
- **Method**: external
- **Source**: Clauser, Horne, Shimony, Holt, Phys. Rev. Lett. 23, 880 (1969)
- **Verified**: — · **Verdict**: open

## §7.9 — Classical bound proof: algebraic identity

- **Claim** (anchor): "the algebraic identity $a_0 b_0 + a_0 b_1 + a_1 b_0 - a_1 b_1 = a_0(b_0+b_1) + a_1(b_0-b_1)$ has magnitude at most $2$"
- **Method**: derivation
- **Source**: → §7.9 (one-line algebraic identity)
- **Verified**: — · **Verdict**: open

## §7.9 — Tsirelson quantum bound is |S| ≤ 2√2

- **Claim** (anchor): "For quantum states and observables with eigenvalues in $[-1, 1]$"
- **Method**: external
- **Source**: Tsirelson (Cirel'son), Letters in Mathematical Physics 4, 93–100 (1980)
- **Verified**: — · **Verdict**: open
- **Comment**: The bound 2√2 is stated in the following display equation.

## §7.9 — Tsirelson bound saturated by singlet with specific measurement angles

- **Claim** (anchor): "It is saturated by the singlet $|\Psi^-\rangle$ with the right measurement angles: take Alice's settings $A_0 = Z$, $A_1 = X$, and Bob's $B_0 = -(Z+X)/\sqrt{2}$, $B_1 = -(Z-X)/\sqrt{2}$"
- **Method**: derivation
- **Source**: → §7.9 (explicit correlator calculation; see sanity check 5)
- **Verified**: — · **Verdict**: open

## §7.9 — Aspect experiments (1980s) and loophole-free tests (2015) violate classical bound

- **Claim** (anchor): "from Aspect's experiments in the 1980s through the loophole-free tests of 2015 — is that nature violates the classical bound"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to Aspect et al. (1982) and the 2015 loophole-free Bell tests (Hensen et al.; Giustina et al.; Shalm et al.).

## §7.9 — Bell-inequality violation cannot be used to signal

- **Claim** (anchor): "this correlation cannot be used to signal. Alice's marginal distribution is independent of Bob's choice of setting"
- **Method**: derivation
- **Source**: → §7.11 (local marginals insensitive to remote operations)
- **Verified**: — · **Verdict**: open

## §7.10 — Schmidt decomposition exists for every bipartite pure state

- **Claim** (anchor): "For any bipartite pure state $|\psi\rangle_{AB} \in \mathcal{H}_A \otimes \mathcal{H}_B$, there exist orthonormal sets"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result following from the singular value decomposition.

## §7.10 — Schmidt decomposition follows from SVD of amplitude matrix

- **Claim** (anchor): "it follows from the singular value decomposition of the amplitude matrix $C$ defined by $|\psi\rangle = \sum_{jk} C_{jk} |j\rangle_A |k\rangle_B$"
- **Method**: derivation
- **Source**: → §7.10 (algebraic derivation via SVD)
- **Verified**: — · **Verdict**: open

## §7.10 — Product state iff Schmidt rank 1

- **Claim** (anchor): "a pure bipartite state is a product state iff its Schmidt rank is $1$"
- **Method**: derivation
- **Source**: → §7.10 (definition of Schmidt rank)
- **Verified**: — · **Verdict**: open

## §7.10 — Reduced density matrices on A and B have same nonzero spectrum

- **Claim** (anchor): "the reduced density matrices on $A$ and $B$ have the same nonzero spectrum, $\\{\\lambda_i^2\\}$"
- **Method**: derivation
- **Source**: → §7.10 (consequence of the Schmidt decomposition)
- **Verified**: — · **Verdict**: open

## §7.10 — Schmidt rank invariant under local unitaries

- **Claim** (anchor): "The Schmidt rank is invariant under local unitaries: $U_A \otimes U_B$ cannot increase or decrease it"
- **Method**: derivation
- **Source**: → §7.10 (local unitaries are invertible and do not change rank)
- **Verified**: — · **Verdict**: open

## §7.11 — Bell state Φ+ reduced to maximally mixed state

- **Claim** (anchor): "for the Bell state $|\\Phi^+\\rangle$ the reduced state on either qubit is"
- **Method**: derivation
- **Source**: → §7.11 (explicit partial trace calculation)
- **Verified**: — · **Verdict**: open

## §7.12 — Teleportation: one ebit and two classical bits consumed

- **Claim** (anchor): "No qubit travelled; one ebit (one maximally entangled pair — the unit of entanglement) and two classical bits were consumed"
- **Method**: external
- **Source**: Bennett et al., Physical Review Letters 70, 1895 (1993)
- **Verified**: — · **Verdict**: open

## §7.12 — Teleportation correction operators indexed by two classical bits

- **Claim** (anchor): "$00 \\to I$, $01 \\to X$, $10 \\to Z$, $11 \\to ZX$ (apply $X$ first, then $Z$, so the composite operator is $Z \\cdot X$, read right to left)"
- **Method**: derivation
- **Source**: → §7.12 (teleportation protocol algebra)
- **Verified**: — · **Verdict**: open

## §7.12 — Superdense coding: two classical bits per one qubit plus one ebit

- **Claim** (anchor): "One qubit transmission, aided by one ebit, carries two classical bits"
- **Method**: external
- **Source**: Bennett and Wiesner, Physical Review Letters 69, 2881 (1992)
- **Verified**: — · **Verdict**: open

## §7.12 — Ekert protocol: CHSH value near 2√2 certifies security

- **Claim** (anchor): "If $S$ is close to $2\\sqrt{2}$, the pairs were undisturbed, and the remaining correlated outcomes yield a shared secret key"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to Ekert's E91 protocol (Ekert, Phys. Rev. Lett. 67, 661, 1991).

## §7.13 — Entropy of entanglement equals von Neumann entropy of reduced state

- **Claim** (anchor): "the entropy of entanglement"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard measure; E = S(ρ_A) = −∑ λ_i² log₂ λ_i².

## §7.13 — Entropy of entanglement is 1 ebit for a Bell pair

- **Claim** (anchor): "$\\log_2 d$ on a maximally entangled state of two $d$-dimensional systems (so $1$ on a Bell pair, in units of ebits)"
- **Method**: derivation
- **Source**: → §7.13 (log₂ 2 = 1 for d=2)
- **Verified**: — · **Verdict**: open

## §7.13 — Entropy of entanglement monotone non-increasing under LOCC

- **Claim** (anchor): "monotone non-increasing under LOCC"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §7.13 — Pure-state entanglement is reversible asymptotically

- **Claim** (anchor): "$E$ equals both the asymptotic rate at which Bell pairs can be distilled from copies of $|\\psi\\rangle$ and the rate at which Bell pairs are required to prepare them — pure-state entanglement is reversible in the asymptotic limit"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Classic result in entanglement theory (Bennett et al. 1996).

## §7.13 — Bound entangled states: positive formation, zero distillable entanglement

- **Claim** (anchor): "there exist bound entangled states with positive entanglement of formation but zero distillable entanglement"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Horodecki et al. demonstrated existence of bound entangled states.

## §7.13 — Negativity as computable entanglement proxy

- **Claim** (anchor): "nonzero negativity is sufficient but not necessary for entanglement"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to the PPT criterion (Peres 1996); negativity detects NPT entanglement.
