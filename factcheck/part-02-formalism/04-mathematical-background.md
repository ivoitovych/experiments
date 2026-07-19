# Factcheck — §4 Mathematical Background

> **Reviewer companion** for `book/part-02-formalism/04-mathematical-background.md`.
> Each entry is **self-contained**: the claim, the method, and (once verified)
> the source make sense on their own, without opening the chapter. The five
> fields:
>
> - **Claim** — the statement being checked, in plain language.
> - **Method** — how it is checked: *external* (a named outside source),
>   *derivation* (follows from standard mathematics, briefly recalled), or
>   *convention* (a stated notation choice the rest of the book must use
>   consistently).
> - **Source** — the citation, once the claim has been verified; empty (`—`)
>   until then.
> - **Status** — *not yet verified*, *confirmed*, *updated*, or *contested*.
> - **Find in text** — the sentence from the chapter, quoted verbatim, so a
>   reader can locate the claim (the self-check also greps for it to detect
>   drift). This field is the *only* one allowed to depend on the chapter.

---

## §4.1 Complex Numbers and Probability Amplitudes

### Claim: The Born rule gives a measurement outcome's probability as the squared magnitude of its amplitude
- **Method:** external — standard quantum-mechanics postulate (Born 1926).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The **Born rule** says that the probability of obtaining outcome $0$ on measurement is $|\alpha|^2$ and of outcome $1$ is $|\beta|^2$."

### Claim: A global phase multiplying the entire state is physically unobservable
- **Method:** derivation — for any outcome x, |⟨x | e^(iθ)ψ⟩|² = |e^(iθ)|² · |⟨x|ψ⟩|² = |⟨x|ψ⟩|², so the phase cancels from every probability.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "A **global phase** multiplies the entire state by the same $e^{i\theta}$ and cancels from every probability"

### Claim: A Hadamard maps |+⟩ to |0⟩ and |−⟩ to |1⟩, so a computational-basis measurement afterwards tells the two apart deterministically
- **Method:** derivation — direct matrix multiplication using H = (1/√2)[[1,1],[1,−1]] and |±⟩ = (|0⟩ ± |1⟩)/√2.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "after which a computational-basis measurement distinguishes them perfectly."

## §4.2 Vector Spaces

### Claim: An n-qubit register has a state space of complex dimension 2ⁿ
- **Method:** derivation — the n-fold tensor product of 2-dimensional spaces has dimension 2ⁿ.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "For an $n$-qubit register, the state space is $\mathbb{C}^{2^n}$. The dimension doubles every time you add a qubit."

### Claim: Throughout the book, bit strings x = x₁x₂…xₙ are read with x₁ as the most significant bit
- **Method:** convention — book-wide; the consistency check is that every other section of the book agrees. Note: some frameworks (e.g. Qiskit) use the opposite, LSB-first order.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Throughout this book the bit string $x = x_1 x_2 \cdots x_n$ is interpreted with $x_1$ as the most significant bit"

## §4.3 Inner Products, Norms, and Orthonormal Bases

### Claim: Inner products are conjugate-linear in the first argument (the physics convention)
- **Method:** convention — differs from the common mathematics convention (linear in the first argument). The consistency check is that the rest of the book never silently switches.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "This convention is **conjugate-linear in the first argument** and linear in the second, which is the physics convention."

### Claim: The Cauchy–Schwarz inequality |⟨u, v⟩| ≤ ‖u‖·‖v‖ holds, with equality exactly for linearly dependent u, v
- **Method:** derivation — standard result in any finite-dimensional complex inner-product space.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The Cauchy–Schwarz inequality, $|\langle u, v\rangle| \le \\|u\\| \cdot \\|v\\|$, holds with equality iff $u, v$ are linearly dependent."

## §4.4 Matrices and Linear Operators

### Claim: The adjoint A† is defined by ⟨u, Av⟩ = ⟨A†u, v⟩ for all u, v, independent of basis
- **Method:** derivation — standard definition; the conjugate-transpose formula (A†)_{ij} = conj(A_{ji}) is its matrix realisation.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "It satisfies $\langle u, A v\rangle = \langle A^\dagger u, v\rangle$, which is the defining property of the adjoint independent of basis."

## §4.5 Hermitian, Unitary, Normal, and Positive Operators

### Claim: A normal operator (AA† = A†A) has an orthonormal eigenbasis; Hermitian and unitary operators are both normal, but not conversely
- **Method:** derivation — spectral theorem for finite-dimensional normal operators.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The class of operators that admit a spectral decomposition in some orthonormal basis. Hermitian and unitary are both normal; the converse is false."

### Claim: The eigenvalues of a unitary operator lie on the unit circle
- **Method:** derivation — from U†U = I: if Uv = λv with v ≠ 0, then ‖v‖² = ⟨Uv, Uv⟩ = |λ|²·‖v‖², forcing |λ| = 1.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Eigenvalues lie on the unit circle"

### Claim: The Pauli matrices satisfy [X, Y] = 2iZ, [Y, Z] = 2iX, [Z, X] = 2iY
- **Method:** derivation — direct from the explicit Pauli matrix entries.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "[X, Y] = 2iZ, \qquad [Y, Z] = 2iX, \qquad [Z, X] = 2iY,"

## §4.7 Spectral Decomposition

### Claim: Functional calculus — for a normal A = Σᵢ λᵢ Pᵢ and any function f defined on the spectrum of A, f(A) = Σᵢ f(λᵢ) Pᵢ
- **Method:** derivation — standard polynomial/analytic functional calculus for finite-dimensional normal operators.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The spectral decomposition gives a **functional calculus**: for any function $f$ whose values are defined on the spectrum of $A$"

### Claim: For a normal A with spectral decomposition A = Σᵢ λᵢ Pᵢ, the matrix exponential collapses to e^A = Σᵢ e^{λᵢ} Pᵢ
- **Method:** derivation — apply the power-series definition e^A = Σₖ A^k/k! together with the functional calculus.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "for a normal $A$ with spectral decomposition $A = \sum_i \lambda_i P_i$ the spectral calculus collapses the series"

## §4.8 Tensor Products

### Claim: The tensor product of two normalized states is itself normalized: ‖u ⊗ v‖ = ‖u‖·‖v‖
- **Method:** derivation — multiplicativity of the inner product on product vectors.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "In particular, a product of two normalised single-qubit states is itself normalised"

### Claim: Determinant of a Kronecker product: det(A ⊗ B) = (det A)ⁿ (det B)ᵐ when A is m×m and B is n×n
- **Method:** derivation — standard Kronecker-product identity.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "If $A$ is $m \times m$ and $B$ is $n \times n$, then $\det(A \otimes B) = (\det A)^n (\det B)^m$."

### Claim: Among pure bipartite states of dimensions ≥ 2 × 2, with the natural continuous measure on the unit sphere, the product (separable) states form a measure-zero subset
- **Method:** derivation — the Segre variety has strictly lower dimension than the ambient projective space, so its preimage in the unit sphere has Hausdorff measure zero.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "product/separable states form a measure-zero subset — almost every pure state is entangled, which is what makes many-qubit state spaces so much richer than products of single-qubit spaces."

### Claim: Qiskit (2.x) uses four distinct qubit-ordering conventions — circuit-diagram order, integer-interpretation order (little-endian: qubit 0 is the LSB), printed-string order (MSB on the left), and statevector-index order — and a comparison with any hand calculation must reconcile all four
- **Method:** external (perishable) — Qiskit 2.x documentation.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Qiskit (2.x) has several related but *distinct* ordering conventions that the reader has to track separately"

## §4.9 Singular Values and the Singular Value Decomposition

### Claim: Every complex matrix A ∈ ℂ^{m×n} factors as A = UΣV† with U, V unitary and Σ rectangular nonnegative diagonal
- **Method:** derivation — standard SVD existence theorem. The singular values (diagonal of Σ) are unique; U and V are not.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "For a general complex matrix $A \in \mathbb{C}^{m \times n}$ the **singular value decomposition (SVD)** is"

### Claim: The singular values of A are the nonnegative square roots of the eigenvalues of A†A
- **Method:** derivation — from A = UΣV†, A†A = VΣ²V†, so its eigenvalues are the σᵢ².
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "The $\sigma_i$ are the **singular values** of $A$; they are the square roots of the eigenvalues of the positive semidefinite operator $A^\dagger A$."

### Claim: The trace distance D(ρ, σ) = ½‖ρ−σ‖₁ equals the largest total-variation distance achievable by any POVM measurement
- **Method:** external — Holevo–Helstrom operational characterisation of trace distance.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "it equals the maximum classical total-variation distance obtainable from any measurement, and determines the optimal equal-prior discrimination success probability"

## §4.13 Fourier Transform Basics

### Claim: The exact QFT on n qubits can be realised by a circuit of O(n²) elementary gates (Hadamards plus controlled phases)
- **Method:** derivation — standard QFT construction; this counts gates, not depth.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "the standard *exact* construction uses $O(n^2) = O((\log N)^2)$ elementary gates — \"exact\" presuming a gate set with arbitrarily fine rotations"

### Claim: This book's QFT uses the negative-exponent sign (F_N^{(−)}); Qiskit's QFTGate uses the opposite, positive-exponent sign
- **Method:** external (perishable) — Qiskit 2.x documentation.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "`QFTGate` implements the opposite, positive-exponent convention"

### Claim: The QFT is not a generic faster FFT — loading an arbitrary length-N classical vector as amplitudes generically costs Ω(N) work
- **Method:** derivation — standard state-preparation lower bound; the output side is further bottlenecked because the Born rule yields samples, not all N amplitudes.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Loading an arbitrary length-$N$ classical vector as amplitudes generically costs $\Omega(N)$ work."

## §4.14 Probability and Information Theory Refresher

### Claim: Shannon entropy is bounded by 0 ≤ H(p) ≤ log₂ n, with the upper bound achieved by the uniform distribution and the lower bound by any deterministic distribution
- **Method:** derivation — concavity of −x log x and Jensen's inequality.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "It satisfies $0 \le H(p) \le \log_2 n$, with the maximum achieved by the uniform distribution and the minimum by any deterministic distribution."

### Claim: Holevo bound — for an ensemble {p_x, ρ_x} with average ρ = Σ p_x ρ_x, the accessible information sup_meas I(X; Y) is at most the Holevo quantity χ = S(ρ) − Σ p_x S(ρ_x)
- **Method:** external — Holevo (1973).
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "Consequently the **accessible information** — the supremum of $I(X; Y)$ over all measurements — is itself at most $\chi$."

### Claim: Estimating a Bernoulli probability to additive error ε with constant confidence requires Θ(1/ε²) samples; confidence 1 − δ adds a log(1/δ) factor
- **Method:** derivation — Hoeffding/Chernoff concentration bound for Bernoulli estimation.
- **Source:** —
- **Status:** not yet verified
- **Find in text:** "estimating that Bernoulli outcome probability to additive error $\epsilon$ with constant confidence requires $\Theta(1/\epsilon^2)$ shots by standard concentration bounds (Hoeffding, Chernoff)"
