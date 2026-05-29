# Factcheck — §4 Mathematical Background

Mirrors `book/part-02-formalism/04-mathematical-background.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

This chapter is predominantly standard finite-dimensional linear algebra, Dirac
notation, and classical information theory. The vast majority of content is
`derivation` (standard results) or `convention` (stated notation choices).
Entries below capture the few claims that a reviewer would want to verify against
a named theorem or an external source, plus the most consequential conventions.

---

## §4.1 — Born rule stated as probability recipe

- **Claim** (anchor): "The Born rule says that the probability of obtaining outcome 0 on measurement is"
- **Method**: derivation
- **Source**: → §4.1; standard postulate of quantum mechanics, repeated formally in Chapter 5.
- **Verified**: — · **Verdict**: open
- **Comment**: statement is the standard Born rule; the chapter explicitly defers the postulate formulation to Chapter 5.

## §4.1 — Global phase physically irrelevant

- **Claim** (anchor): "global phase is physically irrelevant"
- **Method**: derivation
- **Source**: → §4.1 (inline calculation showing cancellation in all measurement probabilities).
- **Verified**: — · **Verdict**: open

## §4.1 — Hadamard distinguishes plus/minus states

- **Claim** (anchor): "a computational-basis measurement distinguishes them perfectly"
- **Method**: derivation
- **Source**: → §4.1 (inline Hadamard action verified by matrix multiplication).
- **Verified**: — · **Verdict**: open
- **Comment**: standard result; the two outcomes follow from H² = I and the definitions of |+⟩, |−⟩.

## §4.2 — n-qubit state space dimension is 2^n

- **Claim** (anchor): "the state space is"
- **Method**: derivation
- **Source**: → §4.2 (standard dimension-of-tensor-product argument, elaborated in §4.8).
- **Verified**: — · **Verdict**: open
- **Comment**: anchor is intentionally minimal prose fragment; the surrounding sentence contains the claim.

## §4.2 — MSB computational-basis ordering convention

- **Claim** (anchor): "Ordering convention"
- **Method**: convention
- **Source**: → §4.2; collected again in §4.16. Some frameworks (Qiskit 2.x) use the opposite (LSB) convention.
- **Verified**: — · **Verdict**: open

## §4.3 — Physics inner-product convention (conjugate-linear in first argument)

- **Claim** (anchor): "This convention is conjugate-linear in the first argument and linear in the second, which is the physics convention"
- **Method**: convention
- **Source**: → §4.3; noted as differing from the mathematics convention.
- **Verified**: — · **Verdict**: open

## §4.3 — Cauchy–Schwarz inequality

- **Claim** (anchor): "The Cauchy–Schwarz inequality"
- **Method**: derivation
- **Source**: → §4.3; standard result in any finite-dimensional inner-product space.
- **Verified**: — · **Verdict**: open
- **Comment**: equality condition (linear dependence) and the quantum-mechanical role (fidelity bounds) are also standard.

## §4.4 — Adjoint defined by inner-product relation

- **Claim** (anchor): "It satisfies"
- **Method**: derivation
- **Source**: → §4.4; standard definition of the adjoint independent of basis.
- **Verified**: — · **Verdict**: open
- **Comment**: the entries-level formula (conjugate transpose) and the abstract property are both standard linear algebra.

## §4.5 — Spectral theorem for normal operators (orthonormal eigenbasis)

- **Claim** (anchor): "Normal: A A"
- **Method**: derivation
- **Source**: → §4.7 (spectral decomposition proved/stated for normal operators); standard spectral theorem for finite-dimensional normal operators.
- **Verified**: — · **Verdict**: open
- **Comment**: the claim that Hermitian and unitary are both normal, and the converse fails, is standard; the orthonormal-eigenbasis conclusion is the spectral theorem.

## §4.5 — Unitary eigenvalues lie on the unit circle

- **Claim** (anchor): "Eigenvalues lie on the unit circle"
- **Method**: derivation
- **Source**: → §4.5; follows from U†U = I and |λ|² = 1.
- **Verified**: — · **Verdict**: open

## §4.5 — Pauli commutation relations

- **Claim** (anchor): "[X, Y] = 2iZ"
- **Method**: derivation
- **Source**: → §4.5 (explicit matrix entries given; verification is direct multiplication).
- **Verified**: — · **Verdict**: open

## §4.7 — Functional calculus via spectral decomposition

- **Claim** (anchor): "functional calculus: for any function"
- **Method**: derivation
- **Source**: → §4.7; standard polynomial (and analytic) functional calculus for normal operators in finite dimensions.
- **Verified**: — · **Verdict**: open
- **Comment**: the application to Hamiltonian time evolution U(t) = e^{−iHt} and the setting ℏ = 1 are stated as conventions (§4.16).

## §4.7 — Matrix exponential collapses to spectral form for normal operators

- **Claim** (anchor): "for a normal A with spectral decomposition"
- **Method**: derivation
- **Source**: → §4.7; consequence of the power-series definition of the matrix exponential and the functional calculus, standard result.
- **Verified**: — · **Verdict**: open

## §4.8 — Tensor product of two normalized states is normalized

- **Claim** (anchor): "a product of two normalized single-qubit states is itself normalized"
- **Method**: derivation
- **Source**: → §4.8 (inner-product multiplicativity on product vectors, shown inline).
- **Verified**: — · **Verdict**: open

## §4.8 — Determinant identity for Kronecker product

- **Claim** (anchor): "det(A"
- **Method**: derivation
- **Source**: → §4.8; standard identity: det(A ⊗ B) = (det A)^n (det B)^m for A m×m, B n×n.
- **Verified**: — · **Verdict**: open
- **Comment**: this is a non-obvious identity that a reviewer would want to confirm; it is standard but worth anchoring.

## §4.8 — Product states are measure-zero among pure bipartite states

- **Claim** (anchor): "product/separable states form a measure-zero subset"
- **Method**: derivation
- **Source**: → §4.8; standard differential-geometry / algebraic-geometry argument (Segre variety has lower dimension than the ambient projective space).
- **Verified**: — · **Verdict**: open
- **Comment**: claim is qualified to pure-state meaning and nontrivial bipartitions in the text.

## §4.8 — Qiskit 2.x qubit-ordering conventions

- **Claim** (anchor): "related but distinct ordering conventions that the reader has to track"
- **Method**: convention
- **Source**: → §4.8 endian-warning box; Qiskit 2.x documentation. Should be re-verified against current Qiskit docs when chapter is updated.
- **Verified**: — · **Verdict**: open
- **Comment**: perishable software-convention claim; the four sub-conventions (circuit diagram, integer, printed-string, statevector index) are stated and could shift across Qiskit releases.

## §4.9 — SVD existence for any complex matrix

- **Claim** (anchor): "singular value decomposition (SVD)"
- **Method**: derivation
- **Source**: → §4.9; standard theorem (existence and uniqueness of singular values, non-uniqueness of U, V).
- **Verified**: — · **Verdict**: open

## §4.9 — Singular values are square roots of eigenvalues of A†A

- **Claim** (anchor): "they are the square roots of the eigenvalues of the positive semidefinite operator"
- **Method**: derivation
- **Source**: → §4.9; follows directly from A = UΣV† and A†A = VΣ²V†.
- **Verified**: — · **Verdict**: open

## §4.9 — Trace distance equals maximum total-variation distance over all measurements

- **Claim** (anchor): "it equals the maximum classical total-variation distance obtainable from any measurement"
- **Method**: derivation
- **Source**: → §4.9 (stated as a fact; full proof is in Chapter 11 / standard quantum information references).
- **Verified**: — · **Verdict**: open
- **Comment**: this is the Helstrom / Holevo–Helstrom operational characterization of trace distance; non-trivial enough to flag. Standard result but the chapter does not prove it here.

## §4.13 — QFT exact circuit gate count O(n²)

- **Claim** (anchor): "the standard exact construction uses"
- **Method**: derivation
- **Source**: → §4.13; standard QFT circuit construction (see also Chapter 14). Gate count O(n²) = O((log N)²) is the well-known Hadamard + controlled-phase decomposition.
- **Verified**: — · **Verdict**: open
- **Comment**: the claim is for gate count, not circuit depth, as the text clarifies.

## §4.13 — QFT sign convention (QFT-sign-minus) and Qiskit QFTGate sign

- **Claim** (anchor): "implements the opposite, positive-exponent convention"
- **Method**: convention
- **Source**: → §4.13; Qiskit 2.x documentation. Perishable software claim — re-check against current docs.
- **Verified**: — · **Verdict**: open
- **Comment**: the text instructs readers to re-verify against current Qiskit documentation; appropriately flagged as perishable.

## §4.13 — QFT input/output bottleneck (not a faster FFT for arbitrary data)

- **Claim** (anchor): "Loading an arbitrary length-N classical vector as amplitudes generically costs"
- **Method**: derivation
- **Source**: → §4.13; standard argument about state preparation lower bounds (Omega(N) for arbitrary amplitudes) and the inability to read out all amplitudes.
- **Verified**: — · **Verdict**: open
- **Comment**: the Omega(N) lower bound for arbitrary amplitude loading is a standard result; the output-sampling point follows directly from the Born rule.

## §4.14 — Shannon entropy bounds: 0 ≤ H ≤ log₂ n

- **Claim** (anchor): "It satisfies 0"
- **Method**: derivation
- **Source**: → §4.14; standard information-theory result (uniform distribution maximizes entropy, deterministic minimizes it).
- **Verified**: — · **Verdict**: open

## §4.14 — Holevo bound

- **Claim** (anchor): "the accessible information — the supremum of I(X; Y) over all measurements — is itself at most"
- **Method**: derivation
- **Source**: → §4.14; Holevo's theorem (1973). Standard quantum information theory result, proved in Chapter 12.
- **Verified**: — · **Verdict**: open
- **Comment**: this is a named external result (Holevo 1973) but treated here as a standard fact with proof deferred to Chapter 12; `derivation` is appropriate given the book's internal proof.

## §4.14 — Shot complexity for Bernoulli estimation: Θ(1/ε²)

- **Claim** (anchor): "estimating that Bernoulli outcome probability to additive error"
- **Method**: derivation
- **Source**: → §4.14; standard concentration-bound argument (Hoeffding / Chernoff), textbook probability theory.
- **Verified**: — · **Verdict**: open
- **Comment**: the log(1/δ) confidence factor is also standard. The claim about amplitude estimation improving to O(1/ε) is a preview of Chapter 14.
