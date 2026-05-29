# Factcheck — §4 Mathematical Background

> **Reviewer companion** for `book/part-02-formalism/04-mathematical-background.md`.
> This chapter is mostly standard linear algebra; only claims a reviewer might
> actually want to confirm are listed. Each entry has the same five fields:
>
> - **Claim** — the statement being checked, in plain language.
> - **Method** — how it is checked: *external* (a named outside source),
>   *derivation* (follows from standard or in-text mathematics), or *convention*
>   (a stated notation choice the rest of the book must use consistently).
> - **Source** — the citation, once the claim has been verified; empty (`—`)
>   until then.
> - **Status** — *not yet verified*, *confirmed*, *updated*, or *contested*.
> - **Find in text** — the sentence from the chapter, quoted verbatim, so you
>   can locate the claim (the self-check also greps for it to detect drift).

---

## §4.1 Complex Numbers and Probability Amplitudes

### Claim: The Born rule gives a measurement outcome's probability as the squared magnitude of its amplitude
- **Method:** derivation — standard quantum-mechanics postulate; stated informally here and formalised in Chapter 5.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The **Born rule** says that the probability of obtaining outcome $0$ on measurement is $|\alpha|^2$ and of outcome $1$ is $|\beta|^2$."

### Claim: A global phase multiplying the entire state is physically unobservable
- **Method:** derivation — §4.1 shows the phase cancels out of every measurement probability.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "A **global phase** multiplies the entire state by the same $e^{i\theta}$ and cancels from every probability"

### Claim: A Hadamard maps |+⟩ and |−⟩ to computational-basis states, so a measurement afterward tells the two apart perfectly
- **Method:** derivation — follows from H² = I and the definitions of |+⟩ and |−⟩ (shown inline).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "after which a computational-basis measurement distinguishes them perfectly."

## §4.2 Vector Spaces

### Claim: An n-qubit register has a state space of dimension 2ⁿ
- **Method:** derivation — the dimension of an n-fold tensor product; elaborated in §4.8.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "For an $n$-qubit register, the state space is $\mathbb{C}^{2^n}$. The dimension doubles every time you add a qubit."

### Claim: Bit strings are ordered most-significant-bit first (x₁ is the MSB)
- **Method:** convention — book-wide ordering, collected again in §4.16. Note: some frameworks (e.g. Qiskit) use the opposite, LSB-first order.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Throughout this book the bit string $x = x_1 x_2 \cdots x_n$ is interpreted with $x_1$ as the most significant bit"

## §4.3 Inner Products, Norms, and Orthonormal Bases

### Claim: Inner products are conjugate-linear in the first argument (the physics convention)
- **Method:** convention — differs from the common mathematics convention (which is linear in the first argument).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "This convention is **conjugate-linear in the first argument** and linear in the second, which is the physics convention."

### Claim: The Cauchy–Schwarz inequality holds, with equality exactly for linearly dependent vectors
- **Method:** derivation — standard result in any finite-dimensional inner-product space; it underlies fidelity bounds.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The Cauchy–Schwarz inequality, $|\langle u, v\rangle| \le \\|u\\| \cdot \\|v\\|$, holds with equality iff $u, v$ are linearly dependent."

## §4.4 Matrices and Linear Operators

### Claim: The adjoint A† is defined by ⟨u, Av⟩ = ⟨A†u, v⟩, independent of basis
- **Method:** derivation — standard definition; the conjugate-transpose formula is its matrix realisation.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "It satisfies $\langle u, A v\rangle = \langle A^\dagger u, v\rangle$, which is the defining property of the adjoint independent of basis."

## §4.5 Hermitian, Unitary, Normal, and Positive Operators

### Claim: A normal operator has an orthonormal eigenbasis; Hermitian and unitary operators are both normal, but not conversely
- **Method:** derivation — the spectral theorem for finite-dimensional normal operators (decomposition given in §4.7).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The class of operators that admit a spectral decomposition in some orthonormal basis. Hermitian and unitary are both normal; the converse is false."

### Claim: The eigenvalues of a unitary operator lie on the unit circle
- **Method:** derivation — follows from U†U = I, which forces |λ|² = 1.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Eigenvalues lie on the unit circle"

### Claim: The Pauli matrices satisfy [X, Y] = 2iZ (and cyclic permutations)
- **Method:** derivation — direct from the explicit Pauli matrix entries.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "[X, Y] = 2iZ, \qquad [Y, Z] = 2iX, \qquad [Z, X] = 2iY,"

## §4.7 Spectral Decomposition

### Claim: A function of a normal operator acts by applying that function to its eigenvalues (functional calculus)
- **Method:** derivation — standard polynomial/analytic functional calculus for finite-dimensional normal operators; underlies time evolution U(t) = e^(−iHt).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The spectral decomposition gives a **functional calculus**: for any function $f$ whose values are defined on the spectrum of $A$"

### Claim: For a normal operator, the matrix exponential reduces to exponentiating its eigenvalues in the spectral basis
- **Method:** derivation — from the power-series definition of the matrix exponential together with the functional calculus.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "for a normal $A$ with spectral decomposition $A = \sum_i \lambda_i P_i$ the spectral calculus collapses the series"

## §4.8 Tensor Products

### Claim: The tensor product of two normalized states is itself normalized
- **Method:** derivation — multiplicativity of the inner product on product vectors (shown inline).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "In particular, a product of two normalized single-qubit states is itself normalized"

### Claim: Determinant of a Kronecker product: det(A⊗B) = (det A)ⁿ (det B)ᵐ for A m×m and B n×n
- **Method:** derivation — standard Kronecker-product identity; non-obvious enough that a reviewer would want to confirm it.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "If $A$ is $m \times m$ and $B$ is $n \times n$, then $\det(A \otimes B) = (\det A)^n (\det B)^m$."

### Claim: Among pure bipartite states, product (separable) states form a measure-zero subset
- **Method:** derivation — the Segre variety has strictly lower dimension than the ambient projective space; the claim is qualified to pure states and nontrivial bipartitions.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "product/separable states form a measure-zero subset — almost every pure state is entangled, which is what makes many-qubit state spaces so much richer than products of single-qubit spaces."

### Claim: Qiskit (2.x) exposes several distinct qubit-ordering conventions the reader must track
- **Method:** convention (perishable) — Qiskit 2.x documentation; re-verify against current Qiskit on each update. The four sub-conventions are the circuit diagram, the integer, the printed string, and the statevector index.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Qiskit (2.x) has several related but *distinct* ordering conventions that the reader has to track separately"

## §4.9 Singular Values and the Singular Value Decomposition

### Claim: Every complex matrix has a singular value decomposition
- **Method:** derivation — standard theorem; the singular values are unique, the factors U and V are not.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "For a general complex matrix $A \in \mathbb{C}^{m \times n}$ the **singular value decomposition (SVD)** is"

### Claim: The singular values are the square roots of the eigenvalues of A†A
- **Method:** derivation — from A = UΣV†, giving A†A = VΣ²V†.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The $\sigma_i$ are the **singular values** of $A$; they are the square roots of the eigenvalues of the positive semidefinite operator $A^\dagger A$."

### Claim: Trace distance equals the largest total-variation distance achievable by any measurement
- **Method:** derivation — the Holevo–Helstrom operational characterisation; stated here, proved in Chapter 11.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "it equals the maximum classical total-variation distance obtainable from any measurement, and determines the optimal equal-prior discrimination success probability"

## §4.13 Fourier Transform Basics

### Claim: The exact QFT circuit uses O(n²) gates (Hadamards plus controlled phases)
- **Method:** derivation — standard QFT construction (see also Chapter 14); this is a gate count, not a circuit depth.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "the standard *exact* construction uses $O(n^2) = O((\log N)^2)$ elementary gates."

### Claim: This book's QFT uses the negative-exponent sign; Qiskit's QFTGate uses the opposite (positive) sign
- **Method:** convention (perishable) — Qiskit 2.x documentation; re-verify against current docs.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "`QFTGate` implements the opposite, positive-exponent convention"

### Claim: The QFT is not a faster FFT for arbitrary data — loading an arbitrary length-N vector as amplitudes generically costs Ω(N)
- **Method:** derivation — standard state-preparation lower bound; reading the result back out is limited by the Born rule.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Loading an arbitrary length-$N$ classical vector as amplitudes generically costs $\Omega(N)$ work."

## §4.14 Probability and Information Theory Refresher

### Claim: Shannon entropy is bounded by 0 ≤ H(p) ≤ log₂ n
- **Method:** derivation — the uniform distribution maximises entropy, a deterministic one minimises it.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "It satisfies $0 \le H(p) \le \log_2 n$, with the maximum achieved by the uniform distribution and the minimum by any deterministic distribution."

### Claim: Holevo bound — the accessible information is at most the Holevo quantity χ
- **Method:** external — Holevo's theorem (1973); the book defers the full proof to Chapter 12 and treats it as a standard fact here.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Consequently the **accessible information** — the supremum of $I(X; Y)$ over all measurements — is itself at most $\chi$."

### Claim: Estimating a Bernoulli probability to additive error ε needs Θ(1/ε²) samples
- **Method:** derivation — Hoeffding/Chernoff concentration; amplitude estimation improves this to O(1/ε) (previewed for Chapter 14).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "estimating that Bernoulli outcome probability to additive error $\epsilon$ with constant confidence requires $\Theta(1/\epsilon^2)$ shots by standard concentration bounds (Hoeffding, Chernoff)"
