# Chapter 4. Mathematical Background for Quantum Computing

> **Status:** draft · **Phase:** 1 · **Sections drafted:** 13 / 13

[← Previous: Chapter 3](../part-01-orientation/03-physical-intuition.md) · [Table of Contents](../../README.md) · [Next: Chapter 5 →](05-postulates.md)

This chapter is a refresher, not a textbook treatment. It assumes you have
seen linear algebra and probability before and re-establishes only the pieces
that the rest of the book leans on, in the conventions used throughout. If a
topic here is unfamiliar, work through a standard reference — Strang, Axler,
or Nielsen and Chuang's Appendix A — and return.

Three points to keep in mind:

1. Everything is **finite-dimensional and complex** unless stated otherwise.
   We work in $\mathbb{C}^n$ and rarely worry about convergence, domains, or
   unbounded operators. When continuous variables appear (Chapter 32), they
   are clearly marked.
2. We use **physicists' conventions** for the inner product (conjugate-linear
   in the first argument) and Dirac notation. Mathematicians' linear algebra
   textbooks typically swap the conjugate side; if your reflexes come from
   pure math, watch for that.
3. We never use the `physics` macro package (`\ket{}`, `\bra{}`, ...). All
   math in this book is written in plain LaTeX with raw `\langle` and
   `\rangle` so the source renders on GitHub, mdBook, and Pandoc alike.
   You should write your own derivations the same way.

## 4.1 Complex Numbers and Probability Amplitudes

A complex number is $z = a + ib$ with $a, b \in \mathbb{R}$ and $i^2 = -1$.
Its **conjugate** is $\overline{z} = a - ib$ and its **modulus** is
$|z| = \sqrt{z \overline{z}} = \sqrt{a^2 + b^2}$. The **polar form**
$z = r\, e^{i\theta}$ with $r = |z|$ and $\theta = \arg(z)$ separates magnitude
from phase, and the identity $e^{i\theta} = \cos\theta + i \sin\theta$ shows
that multiplying by $e^{i\theta}$ is a rotation of the complex plane by angle
$\theta$.

In quantum mechanics, complex numbers are not a notational convenience but a
physical necessity. The state of a qubit is described by two complex numbers
$\alpha, \beta$, and the **Born rule** says that the probability of obtaining
outcome $0$ on measurement is $|\alpha|^2$ and of outcome $1$ is $|\beta|^2$.
These amplitudes can add, cancel, and rotate — which is why interference, the
engine of quantum speedups, exists.

A real-valued probabilistic computer cannot have negative probabilities. A
quantum computer has amplitudes that can carry any phase, and the modulus
squared determines what is observed. Phases that do not affect any
measurement (global phases) are physically irrelevant; phases that change
under basis change (relative phases) are central.

## 4.2 Vector Spaces

A **complex vector space** $V$ has scalars in $\mathbb{C}$, vector addition,
and scalar multiplication satisfying the standard eight axioms. For us, $V$
is almost always $\mathbb{C}^n$ for some finite $n$.

A **linear combination** of vectors $\{v_1, \dots, v_k\}$ with coefficients
$c_i \in \mathbb{C}$ is $\sum_i c_i\, v_i$. The vectors are **linearly
independent** if no nontrivial combination equals zero, and they **span** the
subspace of all their linear combinations. A **basis** is a linearly
independent spanning set; its size is the **dimension** of $V$.

For an $n$-qubit register, the state space is $\mathbb{C}^{2^n}$. The
dimension doubles every time you add a qubit. This is the source of the
exponential state-space growth that motivates quantum computing — and the
exponential cost of simulating it classically without exploitable structure.

The **standard basis** of $\mathbb{C}^{2^n}$ is indexed by length-$n$ bit
strings: $\{|0 \cdots 0\rangle, |0 \cdots 01\rangle, \dots, |1 \cdots 1\rangle\}$.
We will call this the **computational basis**.

## 4.3 Inner Products, Norms, and Orthonormal Bases

The **inner product** on $\mathbb{C}^n$ is

$$
\langle u, v \rangle = \sum_{i=1}^n \overline{u_i}\, v_i.
$$

This convention is **conjugate-linear in the first argument** and linear in
the second, which is the physics convention. (Mathematicians often write the
opposite — both are valid; the quantum computing literature is consistent and
we follow it.) The induced **norm** is $\|v\| = \sqrt{\langle v, v\rangle}$.

Two vectors are **orthogonal** when $\langle u, v\rangle = 0$. A basis
$\{e_1, \dots, e_n\}$ is **orthonormal** when $\langle e_i, e_j\rangle = \delta_{ij}$.
Any vector $v$ then decomposes as $v = \sum_i \langle e_i, v\rangle\, e_i$,
and Gram–Schmidt converts any basis into an orthonormal one.

The Cauchy–Schwarz inequality, $|\langle u, v\rangle| \le \|u\| \cdot \|v\|$,
holds with equality iff $u, v$ are linearly dependent. In quantum mechanics it
underlies fidelity bounds and inequalities on measurement statistics.

## 4.4 Matrices and Linear Operators

A **linear operator** $A : V \to V$ satisfies $A(au + bv) = a\, Au + b\, Av$.
Once you fix an orthonormal basis $\{e_i\}$, $A$ is represented by a matrix
with entries $A_{ij} = \langle e_i, A e_j\rangle$. Acting on a column vector
of coefficients is the usual matrix-vector product.

The **adjoint** (Hermitian transpose, conjugate transpose) of $A$ is the
operator $A^\dagger$ with matrix entries $(A^\dagger)_{ij} = \overline{A_{ji}}$.
It satisfies $\langle u, A v\rangle = \langle A^\dagger u, v\rangle$, which is
the defining property of the adjoint independent of basis.

Useful identities:

- $(AB)^\dagger = B^\dagger A^\dagger$
- $(A^\dagger)^\dagger = A$
- $\det(A^\dagger) = \overline{\det A}$
- $\operatorname{tr}(A^\dagger) = \overline{\operatorname{tr}(A)}$
- $\operatorname{tr}(AB) = \operatorname{tr}(BA)$ (cyclic property)

Trace and determinant are basis-independent invariants. We use the trace
constantly when computing expectation values and partial traces.

## 4.5 Hermitian, Unitary, and Normal Operators

Three classes of operators dominate quantum computing.

**Hermitian** (self-adjoint): $A^\dagger = A$. Real eigenvalues, orthogonal
eigenvectors. Physical observables (energy, spin component, position)
correspond to Hermitian operators; measurement outcomes are exactly the
eigenvalues.

**Unitary**: $U^\dagger U = U U^\dagger = I$, equivalently $U^{-1} = U^\dagger$.
Preserves the inner product, $\langle U u, U v\rangle = \langle u, v\rangle$,
and therefore the norm. Eigenvalues lie on the unit circle, $\{e^{i\theta}\}$.
**Every quantum gate is a unitary**; closed-system time evolution is unitary.

**Normal**: $A A^\dagger = A^\dagger A$. The class of operators that admit a
spectral decomposition in some orthonormal basis. Hermitian and unitary are
both normal; the converse is false.

Sanity checks:

- Pauli $X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ is Hermitian and
  unitary; $X^2 = I$, eigenvalues $\pm 1$.
- Pauli $Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$ is Hermitian and
  unitary, eigenvalues $\pm 1$, with complex off-diagonal entries.
- The Hadamard $H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$
  is Hermitian and unitary; $H^2 = I$.
- The phase gate $S = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix}$ is unitary
  but **not** Hermitian. Its eigenvalues are $1$ and $i$.

## 4.6 Eigenvalues and Eigenvectors

A nonzero $v \in V$ is an **eigenvector** of $A$ with **eigenvalue**
$\lambda \in \mathbb{C}$ when $A v = \lambda v$. The eigenvalues are the
roots of $\det(A - \lambda I) = 0$, the **characteristic polynomial** of $A$.
An $n \times n$ matrix has $n$ eigenvalues counted with multiplicity.

For the operator classes from §4.5:

- **Hermitian** operators have real eigenvalues and an orthonormal eigenbasis.
  Distinct eigenvalues yield orthogonal eigenvectors automatically; within a
  degenerate eigenspace you can orthonormalize freely.
- **Unitary** operators have unit-modulus eigenvalues $\{e^{i\theta_k}\}$ and
  an orthonormal eigenbasis.
- **Normal** operators have an orthonormal eigenbasis, possibly with complex
  eigenvalues.

The **eigenspace** of $\lambda$ is $\{v : A v = \lambda v\}$; its dimension
is the **geometric multiplicity**. The order of $\lambda$ as a root of the
characteristic polynomial is the **algebraic multiplicity**. For normal
operators the two coincide and the eigenspaces span $V$.

In quantum mechanics, the projector $P_\lambda$ onto the eigenspace of
$\lambda$ is the measurement-outcome operator: applying
$P_\lambda |\psi\rangle / \sqrt{\langle \psi | P_\lambda | \psi\rangle}$
gives the post-measurement state conditioned on outcome $\lambda$, and
$\langle \psi | P_\lambda | \psi\rangle$ is the probability of that outcome.

## 4.7 Spectral Decomposition

If $A$ is normal with distinct eigenvalues $\lambda_1, \dots, \lambda_k$ and
corresponding orthogonal projectors $P_1, \dots, P_k$ onto the eigenspaces,
then

$$
A = \sum_{i=1}^{k} \lambda_i\, P_i, \qquad
\sum_{i=1}^{k} P_i = I, \qquad
P_i P_j = \delta_{ij}\, P_i.
$$

This is the **spectral decomposition**. Each $P_i$ is Hermitian
($P_i^\dagger = P_i$) and idempotent ($P_i^2 = P_i$) — an orthogonal projector.
For non-degenerate eigenvalues the projector is rank-one:
$P_i = |v_i\rangle\langle v_i|$.

The spectral decomposition gives a **functional calculus**: for any function
$f : \mathbb{C} \to \mathbb{C}$ defined on the spectrum of $A$,

$$
f(A) = \sum_{i=1}^{k} f(\lambda_i)\, P_i.
$$

The two most important instances in quantum computing:

- **Time evolution.** If $H$ is the Hamiltonian (Hermitian) and $t$ the time,
  the unitary $U(t) = e^{-i H t / \hbar}$ is computed from the spectral
  decomposition of $H$ as $U(t) = \sum_i e^{-i \lambda_i t / \hbar} P_i$.
  Simulating dynamics reduces to diagonalizing $H$ when feasible — which it
  generally is not, hence the entire field of Hamiltonian simulation
  (Chapter 16).
- **Square roots and inverses.** $\sqrt{A} = \sum_i \sqrt{\lambda_i}\, P_i$
  (choosing a branch) and $A^{-1} = \sum_i \lambda_i^{-1} P_i$ when no
  eigenvalue is zero. The HHL algorithm (§15.5) is the quantum implementation
  of $A^{-1}|b\rangle$ via this calculus.

When $A$ is Hermitian, the eigenvalues are real and $f(A)$ is Hermitian for
real-valued $f$; if $f$ has unit-modulus values (like $e^{i\,\cdot}$), $f(A)$
is unitary. This is exactly how observables generate gates.

## 4.8 Tensor Products

The state space of a composite system is the **tensor product** of the
component state spaces. If $V$ has basis $\{e_i\}_{i=1}^{m}$ and $W$ has
basis $\{f_j\}_{j=1}^{n}$, then $V \otimes W$ is the $mn$-dimensional space
with basis $\{e_i \otimes f_j\}$.

The defining property is bilinearity:

$$
(a u + b v) \otimes w = a (u \otimes w) + b (v \otimes w), \qquad
u \otimes (a w + b x) = a (u \otimes w) + b (u \otimes x).
$$

For column vectors, $V \otimes W$ is computed as the **Kronecker product**.
If $u = (u_1, u_2)^T$ and $v = (v_1, v_2)^T$ then

$$
u \otimes v = (u_1 v_1,\; u_1 v_2,\; u_2 v_1,\; u_2 v_2)^T.
$$

The notation $|a\rangle \otimes |b\rangle$ is often abbreviated to
$|a\rangle |b\rangle$ or $|ab\rangle$ once the order of subsystems is fixed.

The tensor product of operators acts componentwise:

$$
(A \otimes B)(u \otimes v) = (A u) \otimes (B v).
$$

In matrix form,

$$
A \otimes B = \begin{pmatrix} A_{11} B & A_{12} B & \cdots \\ A_{21} B & A_{22} B & \cdots \\ \vdots & & \ddots \end{pmatrix}.
$$

Useful identities:

- $(A \otimes B)(C \otimes D) = (A C) \otimes (B D)$
- $(A \otimes B)^\dagger = A^\dagger \otimes B^\dagger$
- $\operatorname{tr}(A \otimes B) = \operatorname{tr}(A) \cdot \operatorname{tr}(B)$
- If $A$ is $m \times m$ and $B$ is $n \times n$, then $\det(A \otimes B) = (\det A)^n (\det B)^m$.

A vector in $V \otimes W$ is **product (separable)** if it equals $u \otimes v$
for some $u \in V$ and $v \in W$; otherwise it is **entangled**. The vast
majority of vectors in $\mathbb{C}^{mn}$ are entangled, which is what makes
many-qubit state spaces so much richer than products of single-qubit spaces.

## 4.9 Change of Basis

If $\{e_i\}$ and $\{f_i\}$ are two orthonormal bases related by a unitary $U$,
with $f_j = \sum_i U_{ij} e_i$, then vectors and operators transform
predictably:

- A vector with coefficients $v_e$ in the $e$-basis has coefficients
  $v_f = U^\dagger v_e$ in the $f$-basis.
- An operator with matrix $A_e$ in the $e$-basis has matrix
  $A_f = U^\dagger A_e U$ in the $f$-basis.

In quantum computing this is constant practice. Measurement in the Hadamard
basis $\{|+\rangle, |-\rangle\}$ is, operationally, applying $H$ and then
measuring in the computational basis. Diagonalizing an operator is a basis
change that makes it diagonal. Many algorithm-design tricks amount to finding
a basis in which a hard computation is easy.

Traces, determinants, eigenvalues, ranks, and norms are basis-independent;
matrix entries are not. When you write a matrix, you have already chosen a
basis — remember which.

## 4.10 Hilbert Spaces

A **Hilbert space** is a complete inner-product space — every Cauchy sequence
converges. In finite dimensions every inner-product space is automatically
complete, so for almost all of this book "Hilbert space" simply means
"finite-dimensional complex inner-product space," i.e., $\mathbb{C}^n$ with
the standard inner product. We say *Hilbert space* because the term is
standard in quantum mechanics, not because finiteness is in doubt.

Infinite-dimensional Hilbert spaces appear in two contexts:

1. **Continuous-variable quantum computing** (Chapter 32): position/momentum
   degrees of freedom, modes of light, harmonic oscillators. The state space
   is $L^2(\mathbb{R})$.
2. **Hamiltonians of physical systems** being simulated by a quantum computer
   (Chapter 28): the underlying physics is infinite-dimensional but the
   simulation uses a finite truncation.

For the rest of the book, treat "Hilbert space" as shorthand for "the relevant
$\mathbb{C}^{2^n}$" unless we say otherwise.

## 4.11 Dirac Notation

The Dirac (bra-ket) notation is a convention for working in finite-dimensional
Hilbert spaces. It is not new mathematics — every bra-ket statement translates
directly into matrix algebra — but it makes the structure of quantum mechanics
readable.

- A **ket** $|\psi\rangle$ is a column vector in $\mathbb{C}^n$.
- A **bra** $\langle\phi|$ is the adjoint of the ket $|\phi\rangle$, i.e., a
  row vector.
- The **inner product** $\langle\phi|\psi\rangle$ is a scalar,
  $\sum_i \overline{\phi_i}\, \psi_i$.
- The **outer product** $|\psi\rangle\langle\phi|$ is the matrix with entries
  $\psi_i \overline{\phi_j}$. It is rank one if $|\psi\rangle, |\phi\rangle \ne 0$.
- An operator $A$ acts on a ket: $A|\psi\rangle$. Its matrix element between
  $|\phi\rangle$ and $|\psi\rangle$ is $\langle\phi| A |\psi\rangle$, read
  "phi $A$ psi".

The computational basis kets are $|0\rangle, |1\rangle$ for a single qubit and
$|x\rangle$ for $x \in \{0,1\}^n$ for $n$ qubits, with the convention
$|x\rangle = |x_1\rangle |x_2\rangle \cdots |x_n\rangle$. The standard basis
vectors of $\mathbb{C}^2$ are

$$
|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \qquad
|1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}.
$$

The identity decomposes as $I = \sum_i |i\rangle\langle i|$ — the **resolution
of the identity** — and inserting this in the middle of any expression
expands it in the chosen basis. This is the workhorse trick of bra-ket
manipulation.

A common shorthand: when a Hermitian operator $A$ has spectral decomposition
$A = \sum_i \lambda_i |v_i\rangle\langle v_i|$, the outer-product form is
manifestly Hermitian and diagonal in the $\{|v_i\rangle\}$ basis.

**Source convention.** Throughout this book we write Dirac notation with
explicit `\langle` and `\rangle`, e.g., `|\psi\rangle`, `\langle\phi|`,
`\langle\phi|\psi\rangle`. We do not use `\ket{}`, `\bra{}`, or
`\braket{}{}` macros — they require the MathJax `physics` package, which is
not loaded by the GitHub Markdown renderer.

## 4.12 Fourier Transform Basics

The **discrete Fourier transform (DFT)** of a vector $f \in \mathbb{C}^N$ is

$$
\hat{f}_k = \frac{1}{\sqrt{N}} \sum_{j=0}^{N-1} f_j\, \omega^{-jk}, \qquad
\omega = e^{2\pi i / N},
$$

with the inverse

$$
f_j = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} \hat{f}_k\, \omega^{jk}.
$$

The $1/\sqrt{N}$ normalization makes the DFT a unitary transformation of
$\mathbb{C}^N$.

Key properties:

- **Unitarity.** $F^\dagger F = I$, so the DFT preserves inner products and
  norms.
- **Convolution theorem.** Pointwise multiplication in one domain corresponds
  to circular convolution in the other.
- **Shift–phase duality.** Translation in one domain corresponds to a phase
  rotation in the other.

The classical fast Fourier transform (FFT) computes a length-$N$ DFT in
$O(N \log N)$ time. The **quantum Fourier transform (QFT)** is the same
unitary realized as a quantum circuit on $\log_2 N$ qubits; its circuit depth
is $O((\log N)^2)$, an exponential reduction in *circuit size* relative to
$N$. By itself this is not a speedup for general inputs — preparing the input
state can be the bottleneck — but inside structured algorithms (Shor, phase
estimation) the QFT is exactly the transformation that exposes hidden
periodicity.

We return to the QFT in §14.5 and to its modern descendants (qubitization,
QSP, QSVT) in Chapter 16.

## 4.13 Probability and Information Theory Refresher

A discrete probability distribution $p$ on outcomes $\{x_1, \dots, x_n\}$
satisfies $p(x_i) \ge 0$ and $\sum_i p(x_i) = 1$. The **expectation** of a
real-valued function $g$ is $\mathbb{E}[g] = \sum_i p(x_i)\, g(x_i)$, and the
**variance** is $\operatorname{Var}[g] = \mathbb{E}[g^2] - \mathbb{E}[g]^2$.

For two random variables $X, Y$, the **joint distribution** is $p(x, y)$, the
**marginal** is $p(x) = \sum_y p(x, y)$, and the **conditional** is
$p(y \mid x) = p(x, y) / p(x)$ when $p(x) > 0$. $X$ and $Y$ are **independent**
iff $p(x, y) = p(x) p(y)$ for all $x, y$.

The **Shannon entropy** of $p$ (in bits) is

$$
H(p) = -\sum_i p(x_i) \log_2 p(x_i),
$$

with the convention $0 \log 0 = 0$. It satisfies $0 \le H(p) \le \log_2 n$,
with the maximum achieved by the uniform distribution and the minimum by any
deterministic distribution. The **mutual information** between $X$ and $Y$ is
$I(X; Y) = H(X) + H(Y) - H(X, Y)$, measuring how much knowing one reduces
uncertainty about the other.

Two quantum-mechanical extensions return in Chapter 12:

1. **Von Neumann entropy.** Replace the diagonal-entry distribution by the
   spectrum of a density matrix:
   $S(\rho) = -\operatorname{tr}(\rho \log \rho)$. For a pure state $S = 0$;
   entanglement of a pure bipartite state is captured by the von Neumann
   entropy of either reduced state.
2. **Holevo bound.** No measurement scheme can extract more than $S(\rho)$
   bits of classical information from a state with density matrix $\rho$, even
   in principle. This is the information-theoretic ceiling that limits
   "look at every basis state" intuitions.

For now, treat Shannon entropy as the background you need for noisy-channel
arguments and information bounds; the quantum extensions arrive once the
density matrix formalism is in place (§5.10).

---

[← Previous: Chapter 3](../part-01-orientation/03-physical-intuition.md) · [Table of Contents](../../README.md) · [Next: Chapter 5 →](05-postulates.md)
