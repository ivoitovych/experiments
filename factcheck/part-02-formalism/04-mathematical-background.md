# Factcheck — §4 Mathematical Background

> **Reviewer companion** for `book/part-02-formalism/04-mathematical-background.md`.
> Each entry states a claim in plain language, says how it can be checked, gives
> its current verification status, and quotes a phrase you can search for to
> find it in the chapter. This chapter is mostly standard linear algebra — only
> the claims a reviewer might actually want to confirm are listed.
>
> - **Method** — how the claim is checked: *external* (a named outside source),
>   *derivation* (follows from standard or in-text mathematics), or *convention*
>   (a stated notation choice the rest of the book must use consistently).
> - **Status** — *open* (not yet verified), *confirmed*, *updated*, or *contested*.
> - **Find in text** — a verbatim phrase from the chapter, used to locate the
>   claim and to detect when the wording drifts (the self-check greps for it).

---

## §4.1 Complex Numbers and Probability Amplitudes

### The Born rule gives a measurement outcome's probability as the squared magnitude of its amplitude
- **Method:** derivation — standard quantum-mechanics postulate; stated informally here and formalised in Chapter 5.
- **Status:** open — not yet verified.
- **Find in text:** "The Born rule says that the probability of obtaining outcome 0 on measurement is"

### A global phase multiplying the entire state is physically unobservable
- **Method:** derivation — §4.1 shows the phase cancels out of every measurement probability.
- **Status:** open — not yet verified.
- **Find in text:** "global phase is physically irrelevant"

### A Hadamard sends |+⟩ and |−⟩ to computational-basis states, so a measurement then tells them apart perfectly
- **Method:** derivation — follows from H² = I and the definitions of |+⟩ and |−⟩ (shown inline).
- **Status:** open — not yet verified.
- **Find in text:** "a computational-basis measurement distinguishes them perfectly"

## §4.2 Vector Spaces

### An n-qubit register has a state space of dimension 2ⁿ
- **Method:** derivation — the dimension of an n-fold tensor product; elaborated in §4.8.
- **Status:** open — not yet verified.
- **Find in text:** "For an $n$-qubit register, the state space is"

### Bit strings are ordered most-significant-bit first (x₁ is the MSB)
- **Method:** convention — book-wide ordering, collected again in §4.16. Note: some frameworks (e.g. Qiskit) use the opposite, LSB-first order.
- **Status:** open — not yet verified.
- **Find in text:** "Throughout this book the bit string"

## §4.3 Inner Products, Norms, and Orthonormal Bases

### Inner products are conjugate-linear in the first argument (the physics convention)
- **Method:** convention — differs from the common mathematics convention (which is linear in the first argument).
- **Status:** open — not yet verified.
- **Find in text:** "This convention is conjugate-linear in the first argument and linear in the second, which is the physics convention"

### The Cauchy–Schwarz inequality holds for the inner product
- **Method:** derivation — standard result in any finite-dimensional inner-product space; it underlies fidelity bounds, and equality holds exactly for linearly dependent vectors.
- **Status:** open — not yet verified.
- **Find in text:** "The Cauchy–Schwarz inequality"

## §4.4 Matrices and Linear Operators

### The adjoint A† is defined by ⟨u, Av⟩ = ⟨A†u, v⟩, independent of basis
- **Method:** derivation — standard definition; the conjugate-transpose formula is its matrix realisation.
- **Status:** open — not yet verified.
- **Find in text:** "is the defining property of the adjoint independent of basis"

## §4.5 Hermitian, Unitary, Normal, and Positive Operators

### A normal operator has an orthonormal eigenbasis; Hermitian and unitary operators are both normal, but not conversely
- **Method:** derivation — the spectral theorem for finite-dimensional normal operators (decomposition given in §4.7).
- **Status:** open — not yet verified.
- **Find in text:** "Hermitian and unitary are both normal; the converse is false"

### The eigenvalues of a unitary operator lie on the unit circle
- **Method:** derivation — follows from U†U = I, which forces |λ|² = 1.
- **Status:** open — not yet verified.
- **Find in text:** "Eigenvalues lie on the unit circle"

### The Pauli matrices satisfy the commutator relation [X, Y] = 2iZ (and cyclic permutations)
- **Method:** derivation — direct from the explicit Pauli matrix entries.
- **Status:** open — not yet verified.
- **Find in text:** "[X, Y] = 2iZ"

## §4.7 Spectral Decomposition

### A function of a normal operator acts by applying that function to its eigenvalues (functional calculus)
- **Method:** derivation — standard polynomial/analytic functional calculus for finite-dimensional normal operators; underlies time evolution U(t) = e^(−iHt) (with ℏ = 1, §4.16).
- **Status:** open — not yet verified.
- **Find in text:** "functional calculus: for any function"

### For a normal operator, the matrix exponential reduces to exponentiating its eigenvalues in the spectral basis
- **Method:** derivation — from the power-series definition of the matrix exponential together with the functional calculus.
- **Status:** open — not yet verified.
- **Find in text:** "for a normal A with spectral decomposition"

## §4.8 Tensor Products

### The tensor product of two normalized states is itself normalized
- **Method:** derivation — multiplicativity of the inner product on product vectors (shown inline).
- **Status:** open — not yet verified.
- **Find in text:** "a product of two normalized single-qubit states is itself normalized"

### Determinant of a Kronecker product: det(A⊗B) = (det A)ⁿ (det B)ᵐ for A m×m and B n×n
- **Method:** derivation — standard Kronecker-product identity; non-obvious enough that a reviewer would want to confirm it.
- **Status:** open — not yet verified.
- **Find in text:** "If $A$ is $m \times m$ and $B$ is $n \times n$, then"

### Among pure bipartite states, product (separable) states form a measure-zero subset
- **Method:** derivation — the Segre variety has strictly lower dimension than the ambient projective space; the claim is qualified to pure states and nontrivial bipartitions.
- **Status:** open — not yet verified.
- **Find in text:** "product/separable states form a measure-zero"

### Qiskit (2.x) exposes several distinct qubit-ordering conventions the reader must track
- **Method:** convention (perishable) — Qiskit 2.x documentation; re-verify against current Qiskit on each update. The four sub-conventions are the circuit diagram, the integer, the printed string, and the statevector index.
- **Status:** open — not yet verified.
- **Find in text:** "related but distinct ordering conventions that the reader has to track"

## §4.9 Singular Values and the Singular Value Decomposition

### Every complex matrix has a singular value decomposition
- **Method:** derivation — standard theorem; the singular values are unique, the factors U and V are not.
- **Status:** open — not yet verified.
- **Find in text:** "singular value decomposition (SVD)"

### The singular values are the square roots of the eigenvalues of A†A
- **Method:** derivation — from A = UΣV†, giving A†A = VΣ²V†.
- **Status:** open — not yet verified.
- **Find in text:** "they are the square roots of the eigenvalues of the positive semidefinite operator"

### Trace distance equals the largest total-variation distance achievable by any measurement
- **Method:** derivation — the Holevo–Helstrom operational characterisation; stated here, proved in Chapter 11.
- **Status:** open — not yet verified.
- **Find in text:** "it equals the maximum classical total-variation distance obtainable from any measurement"

## §4.13 Fourier Transform Basics

### The exact QFT circuit uses O(n²) gates (Hadamards plus controlled phases)
- **Method:** derivation — standard QFT construction (see also Chapter 14); this is a gate count, not a circuit depth.
- **Status:** open — not yet verified.
- **Find in text:** "the standard exact construction uses"

### This book's QFT uses the negative-exponent sign; Qiskit's QFTGate uses the opposite (positive) sign
- **Method:** convention (perishable) — Qiskit 2.x documentation; re-verify against current docs.
- **Status:** open — not yet verified.
- **Find in text:** "implements the opposite, positive-exponent convention"

### The QFT is not a faster FFT for arbitrary data: loading an arbitrary length-N vector as amplitudes generically costs Ω(N)
- **Method:** derivation — standard state-preparation lower bound; reading the result back out is limited by the Born rule.
- **Status:** open — not yet verified.
- **Find in text:** "Loading an arbitrary length-N classical vector as amplitudes generically costs"

## §4.14 Probability and Information Theory Refresher

### Shannon entropy is bounded by 0 ≤ H(p) ≤ log₂ n
- **Method:** derivation — the uniform distribution maximises entropy, a deterministic one minimises it.
- **Status:** open — not yet verified.
- **Find in text:** "It satisfies $0 \le H(p) \le \log_2 n$"

### Holevo bound: the accessible information is at most the Holevo quantity
- **Method:** external — Holevo's theorem (1973); the book defers the full proof to Chapter 12 and treats it as a standard fact here.
- **Status:** open — not yet verified.
- **Find in text:** "the accessible information — the supremum of I(X; Y) over all measurements — is itself at most"

### Estimating a Bernoulli probability to additive error ε needs Θ(1/ε²) samples
- **Method:** derivation — Hoeffding/Chernoff concentration; amplitude estimation improves this to O(1/ε) (previewed for Chapter 14).
- **Status:** open — not yet verified.
- **Find in text:** "estimating that Bernoulli outcome probability to additive error"
