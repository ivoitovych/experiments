# Chapter 4. Mathematical Background for Quantum Computing

> **Status:** draft · **Phase:** 1 · **Sections drafted:** 16 / 16

[← Previous: Chapter 3](../part-01-orientation/03-physical-intuition.md) · [Table of Contents](../../README.md) · [Next: Chapter 5 →](05-postulates.md)

This chapter is a refresher, not a textbook treatment. It assumes you have
seen linear algebra and probability before and re-establishes only the pieces
that the rest of the book leans on, in the conventions used throughout. The
goal is not to make you fluent in all of linear algebra — it is to make every
later quantum-computing formula type-check in your head. If a topic here is
unfamiliar, work through a standard reference — Strang, Axler, or Nielsen and
Chuang's Appendix A — and return.

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

In the standard formulation of quantum mechanics used for quantum computing,
complex numbers are not a notational convenience but a structural ingredient.
The state of a qubit is described by two complex amplitudes $\alpha, \beta$
satisfying the normalization condition $|\alpha|^2 + |\beta|^2 = 1$, and the
**Born rule** says that the probability of obtaining outcome $0$ on measurement
is $|\alpha|^2$ and of outcome $1$ is $|\beta|^2$. These amplitudes can add,
cancel, and rotate — which is why interference, the engine of quantum
speedups, exists.

A real-valued probabilistic computer cannot have negative probabilities. A
quantum computer has amplitudes that can carry any phase, and the modulus
squared determines what is observed. A **global phase** multiplies the entire
state by the same $e^{i\theta}$ and cancels from every probability; it is
physically irrelevant. A **relative phase** changes the weighting between
components of a superposition and can become observable after interference or
a change of basis. This distinction is responsible for a large fraction of
the "this looks wrong, but it's right" moments in early quantum computing.

## 4.2 Vector Spaces

A **complex vector space** $V$ has scalars in $\mathbb{C}$, vector addition,
and scalar multiplication satisfying the standard eight axioms. For us, $V$
is almost always $\mathbb{C}^n$ for some finite $n$.

A **linear combination** of vectors $\\{v_1, \dots, v_k\\}$ with coefficients
$c_i \in \mathbb{C}$ is $\sum_i c_i\, v_i$. The vectors are **linearly
independent** if no nontrivial combination equals zero, and they **span** the
subspace of all their linear combinations. A **basis** is a linearly
independent spanning set; its size is the **dimension** of $V$.

For an $n$-qubit register, the state space is $\mathbb{C}^{2^n}$. The
dimension doubles every time you add a qubit. Strictly speaking, this is the
ambient vector space; a physical *pure state* is represented by a normalized
nonzero vector, with vectors differing only by a global phase treated as the
same physical state. Chapter 5 makes this precise.

This exponential growth explains why generic classical simulation of quantum
systems is hard. It does not by itself give a quantum speedup: useful
algorithms exploit structure, interference, and restricted measurements, not
the size of the state space alone.

The **standard basis** of $\mathbb{C}^{2^n}$ is indexed by length-$n$ bit
strings $x \in \\{0,1\\}^n$, written $|x\rangle$. We will call this the
**computational basis**.

> **Ordering convention.** Throughout this book the bit string
> $x = x_1 x_2 \cdots x_n$ is interpreted with $x_1$ as the most significant
> bit, so $|x\rangle$ sits at position $\sum_{i=1}^{n} x_i\, 2^{n-i}$ in any
> column-vector representation, and $|x\rangle = |x_1\rangle |x_2\rangle
> \cdots |x_n\rangle$ as a tensor product (§4.9). Some software frameworks
> use the opposite convention; the tensor-product section gives the explicit
> warning.

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
$\\{e_1, \dots, e_n\\}$ is **orthonormal** when $\langle e_i, e_j\rangle = \delta_{ij}$.
Any vector $v$ then decomposes as $v = \sum_i \langle e_i, v\rangle\, e_i$,
and Gram–Schmidt converts any basis into an orthonormal one. In Dirac notation
(§4.12) this same decomposition becomes
$|\psi\rangle = \sum_i |i\rangle \langle i | \psi \rangle$, the projection of
$|\psi\rangle$ onto each basis ket.

*Takeaway:* conjugation in the first slot is the rule that makes
$\langle \psi | \psi \rangle$ a non-negative real number. Forgetting it is one
of the most common sources of sign and phase errors in quantum calculations.

> **Sanity check.** For $u = (1, i)^T$ and $v = (1, 1)^T$,
> $\langle u, v\rangle = \overline{1}\cdot 1 + \overline{i}\cdot 1 = 1 - i$,
> while $\langle v, u\rangle = 1 + i$ — the conjugate. Swapping arguments
> conjugates the result; $\langle u, u\rangle = 1 + 1 = 2$ is real and
> non-negative.

The Cauchy–Schwarz inequality, $|\langle u, v\rangle| \le \|u\| \cdot \|v\|$,
holds with equality iff $u, v$ are linearly dependent. In quantum mechanics it
underlies fidelity bounds and inequalities on measurement statistics.

## 4.4 Matrices and Linear Operators

A **linear operator** $A : V \to V$ satisfies $A(au + bv) = a\, Au + b\, Av$.
Once you fix an orthonormal basis $\\{e_i\\}$, $A$ is represented by a matrix
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
- $\mathrm{tr}(A^\dagger) = \overline{\mathrm{tr}(A)}$
- $\mathrm{tr}(AB) = \mathrm{tr}(BA)$, and more generally the trace is
  invariant under any cyclic permutation of a product whose dimensions match:
  $\mathrm{tr}(ABC) = \mathrm{tr}(BCA) = \mathrm{tr}(CAB)$.

Trace and determinant are basis-independent invariants. We use the trace
constantly when computing expectation values and partial traces.

Two distinguished operators are worth naming up front:

- The **identity operator** $I$ satisfies $I v = v$ for every $v$. In any
  basis it is the diagonal matrix with ones on the diagonal. Equations like
  $U^\dagger U = I$ and $\sum_i P_i = I$ recur throughout the book.
- A **projector** is an operator with $P^2 = P$. If additionally $P^\dagger = P$
  it is an **orthogonal projector**; orthogonal projectors represent
  subspaces and reappear as measurement operators in §4.6.

Operators themselves form a complex vector space, and that space carries an
inner product of its own — the **Hilbert–Schmidt inner product**

$$
\langle A, B\rangle_{\mathrm{HS}} = \mathrm{tr}(A^\dagger B).
$$

This is the inner product behind comparisons of states, observables, channels,
and measurement effects (overlaps, fidelities, expectation values). For
density matrices $\rho, \sigma$, $\mathrm{tr}(\rho\, \sigma)$ is the
Hilbert–Schmidt inner product of $\rho$ and $\sigma$.

## 4.5 Hermitian, Unitary, Normal, and Positive Operators

Three classes of operators dominate quantum computing.

**Hermitian** (self-adjoint): $A^\dagger = A$. Eigenvalues are real;
eigenvectors belonging to distinct eigenvalues are orthogonal, and within any
degenerate eigenspace one can choose an orthonormal basis (§4.6). In ideal
**projective measurement**, observables (energy, spin component, position)
are represented by Hermitian operators and the possible outcomes are the
eigenvalues. More general measurements are described later by POVMs
(Chapter 11).

**Unitary**: $U^\dagger U = U U^\dagger = I$, equivalently $U^{-1} = U^\dagger$.
Preserves the inner product, $\langle U u, U v\rangle = \langle u, v\rangle$,
and therefore the norm. Eigenvalues lie on the unit circle, $\\{e^{i\theta}\\}$.
In the **ideal closed-system circuit model**, every quantum gate is a unitary,
and time evolution between gates is unitary. Realistic computations also
include non-unitary operations — measurement, reset, noise, and general
quantum channels — that require the density-matrix and channel formalism
introduced in Chapter 5 and developed in Chapter 18.

**Normal**: $A A^\dagger = A^\dagger A$. The class of operators that admit a
spectral decomposition in some orthonormal basis. Hermitian and unitary are
both normal; the converse is false.

**Positive semidefinite**: a Hermitian operator $A$ is **positive
semidefinite**, written $A \succeq 0$, if $\langle v | A | v\rangle \ge 0$ for
every $v$, equivalently all eigenvalues of $A$ are nonnegative. Positive
semidefinite operators are the linear-algebraic home of probabilities in
quantum mechanics: **density matrices** ($\rho \succeq 0$ with
$\mathrm{tr}\,\rho = 1$), **measurement effects** in a POVM, fidelities and
trace distances, and canonical square roots all live in this cone.

Sanity checks:

- Pauli $X = \begin{pmatrix} 0 & 1 \\\\ 1 & 0 \end{pmatrix}$ is Hermitian and
  unitary; $X^2 = I$, eigenvalues $\pm 1$.
- Pauli $Y = \begin{pmatrix} 0 & -i \\\\ i & 0 \end{pmatrix}$ is Hermitian and
  unitary, eigenvalues $\pm 1$, with complex off-diagonal entries.
- Pauli $Z = \begin{pmatrix} 1 & 0 \\\\ 0 & -1 \end{pmatrix}$ is Hermitian and
  unitary, diagonal in the computational basis with eigenvalues $\pm 1$; it
  leaves $|0\rangle$ and $|1\rangle$ fixed up to sign and flips the relative
  phase of any superposition $\alpha|0\rangle + \beta|1\rangle$.
- The Hadamard $H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\\\ 1 & -1 \end{pmatrix}$
  is Hermitian and unitary; $H^2 = I$, and $H|0\rangle = |+\rangle$,
  $H|1\rangle = |-\rangle$.
- The phase gate $S = \begin{pmatrix} 1 & 0 \\\\ 0 & i \end{pmatrix}$ is unitary
  but **not** Hermitian. Its eigenvalues are $1$ and $i$.

> **Sanity check.** Verify $H^\dagger H = I$ and compute $H|0\rangle$ and
> $H|1\rangle$. Which basis does $H$ map the computational basis to? Now
> check that $|0\rangle\langle 0|$ is positive semidefinite by exhibiting
> its eigenvalues.

## 4.6 Eigenvalues and Eigenvectors

A nonzero $v \in V$ is an **eigenvector** of $A$ with **eigenvalue**
$\lambda \in \mathbb{C}$ when $A v = \lambda v$. The eigenvalues are the
roots of $\det(A - \lambda I) = 0$, the **characteristic polynomial** of $A$.
An $n \times n$ matrix has $n$ eigenvalues counted with multiplicity.

For the operator classes from §4.5:

- **Hermitian** operators have real eigenvalues and an orthonormal eigenbasis.
  Distinct eigenvalues yield orthogonal eigenvectors automatically; within a
  degenerate eigenspace you can orthonormalize freely.
- **Unitary** operators have unit-modulus eigenvalues $\\{e^{i\theta_k}\\}$ and
  an orthonormal eigenbasis.
- **Normal** operators have an orthonormal eigenbasis, possibly with complex
  eigenvalues.

The **eigenspace** of $\lambda$ is $\\{v : A v = \lambda v\\}$; its dimension
is the **geometric multiplicity**. The order of $\lambda$ as a root of the
characteristic polynomial is the **algebraic multiplicity**. For normal
operators the two coincide and the eigenspaces span $V$.

In quantum mechanics, for a **projective measurement** of a Hermitian
observable the projector $P_\lambda$ onto the eigenspace of $\lambda$ is the
measurement-outcome operator. For a normalized state $|\psi\rangle$ the
probability of outcome $\lambda$ is $\langle \psi | P_\lambda | \psi\rangle$,
and when $\langle \psi | P_\lambda | \psi\rangle > 0$ the post-measurement
state is $P_\lambda |\psi\rangle / \sqrt{\langle \psi | P_\lambda | \psi\rangle}$.
More general measurements (POVMs, generalized measurements) are covered in
Chapters 11–12.

> **Sanity check.** Let $P_0 = |0\rangle\langle 0|$ and
> $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ with
> $|\alpha|^2 + |\beta|^2 = 1$. Compute $\langle\psi|P_0|\psi\rangle$ and the
> post-measurement state. Check that the answer is what the Born rule says
> for measuring the first computational-basis outcome.

## 4.7 Spectral Decomposition

If $A$ is normal with distinct *spectral values* $\lambda_1, \dots, \lambda_k$
(the distinct numbers appearing as eigenvalues, ignoring multiplicities) and
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

- **Time evolution.** For a *time-independent* Hamiltonian $H$ (Hermitian) and
  time $t$, the unitary $U(t) = e^{-i H t / \hbar}$ is computed from the
  spectral decomposition of $H$ as $U(t) = \sum_i e^{-i \lambda_i t / \hbar} P_i$.
  Simulating dynamics reduces to diagonalizing $H$ when feasible — which it
  generally is not, hence the entire field of Hamiltonian simulation
  (Chapter 16). Time-dependent Hamiltonians require time-ordered exponentials,
  handled separately.
- **Square roots and inverses.** For a *positive semidefinite Hermitian* $A$
  the square root is canonical: $\sqrt{A} = \sum_i \sqrt{\lambda_i}\, P_i$
  with the nonnegative real branch. For more general normal operators choosing
  a square root requires choosing branches on the spectrum. The inverse is
  $A^{-1} = \sum_i \lambda_i^{-1} P_i$ whenever every eigenvalue is nonzero.
  The HHL algorithm (§15.5) is the quantum implementation of $A^{-1}|b\rangle$
  via this calculus, under additional assumptions about Hermitian embedding,
  conditioning, and efficient state preparation.

When $A$ is Hermitian, the eigenvalues are real and $f(A)$ is Hermitian for
real-valued $f$; if $f$ has unit-modulus values (like $e^{i\,\cdot}$), $f(A)$
is unitary. This is exactly how observables generate gates.

## 4.8 Singular Values and the Singular Value Decomposition

Not every useful matrix is normal, square, or diagonalizable by a unitary
similarity transformation. For a general complex matrix
$A \in \mathbb{C}^{m \times n}$ the **singular value decomposition (SVD)** is

$$
A = U\, \Sigma\, V^\dagger,
$$

where $U \in \mathbb{C}^{m \times m}$ and $V \in \mathbb{C}^{n \times n}$
are unitary and $\Sigma$ is a rectangular diagonal matrix with nonnegative
real entries $\sigma_1 \ge \sigma_2 \ge \cdots \ge 0$ on the diagonal. The
$\sigma_i$ are the **singular values** of $A$; they are the square roots of
the eigenvalues of the positive semidefinite operator $A^\dagger A$.

Singular values measure how much $A$ stretches vectors, independent of any
basis. Two derived quantities show up constantly in quantum computing:

- The **operator norm** (spectral norm) is
  $\|A\| = \sup_{\|v\| = 1} \|A v\| = \sigma_1$, the largest singular
  value. It bounds the worst-case amplification by $A$.
- The **trace norm** (nuclear norm) is
  $\|A\|_1 = \mathrm{tr}\sqrt{A^\dagger A} = \sum_i \sigma_i$. The trace
  distance between two density matrices, $\tfrac{1}{2}\|\rho - \sigma\|_1$,
  is the operational distance between quantum states.

For a square invertible matrix the **condition number** is
$\kappa(A) = \sigma_{\max}(A) / \sigma_{\min}(A)$. It measures how
ill-posed the linear system $A x = b$ is — small $\kappa$ is well-conditioned,
large $\kappa$ means numerical error gets amplified. The HHL algorithm's
asymptotic cost depends explicitly on $\kappa$.

SVD appears repeatedly in the rest of the book:

- **Schmidt decomposition.** Every pure bipartite state
  $|\psi\rangle \in V \otimes W$ admits the form
  $|\psi\rangle = \sum_i s_i\, |u_i\rangle |v_i\rangle$ with
  $s_i \ge 0$, $\sum_i s_i^2 = 1$, and orthonormal $\{|u_i\rangle\}$,
  $\{|v_i\rangle\}$. This is the SVD of the coefficient matrix of
  $|\psi\rangle$. The state is a product state iff exactly one $s_i$ is
  nonzero; otherwise it is entangled, and the $s_i$ quantify how much.
  Chapter 7 develops this.
- **Block encodings and QSVT.** Modern algorithms such as quantum signal
  processing, qubitization, and the quantum singular value transformation
  (Chapter 16) act on the singular values of a matrix embedded inside a
  larger unitary. The SVD is the spectrum these techniques actually
  transform.
- **HHL and related algorithms.** Inverting $A$ on a quantum state amounts
  to mapping each singular value $\sigma_i$ to $1 / \sigma_i$ on the
  corresponding singular vector, which is why conditioning, not size, is
  the dominant cost parameter (§15.5).

For normal $A$, the singular values are the absolute values of the
eigenvalues, and $U$, $V$ can be chosen so that $U V^\dagger$ reproduces the
spectral decomposition. SVD is the strict generalization to operators that
need not be square or normal.

## 4.9 Tensor Products

The state space of a composite system is the **tensor product** of the
component state spaces. If $V$ has basis $\\{e_i\\}_{i=1}^{m}$ and $W$ has
basis $\\{f_j\\}_{j=1}^{n}$, then $V \otimes W$ is the $mn$-dimensional space
with basis $\\{e_i \otimes f_j\\}$.

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

Concretely,

$$
|0\rangle \otimes |1\rangle
= \begin{pmatrix} 1 \\\\ 0 \end{pmatrix}
\otimes \begin{pmatrix} 0 \\\\ 1 \end{pmatrix}
= \begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\\\ 0 \end{pmatrix}
= |01\rangle.
$$

The notation $|a\rangle \otimes |b\rangle$ is often abbreviated to
$|a\rangle |b\rangle$ or $|ab\rangle$ once the order of subsystems is fixed.

> **Endian warning.** The convention above fixes an ordering of subsystems: the
> left factor varies slowest in the resulting Kronecker product. Quantum
> software frameworks do not all agree on this. Qiskit displays statevectors
> with the *rightmost* qubit as the most significant, so its $|01\rangle$ in
> two-qubit notation corresponds to the index that other tools label
> $|10\rangle$. Whenever you compare a hand derivation with code output —
> especially for multi-qubit gates and entangled states — confirm the
> framework's bit-order convention first.

The tensor product of operators acts componentwise:

$$
(A \otimes B)(u \otimes v) = (A u) \otimes (B v).
$$

In matrix form,

$$
A \otimes B = \begin{pmatrix} A_{11} B & A_{12} B & \cdots \\\\ A_{21} B & A_{22} B & \cdots \\\\ \vdots & & \ddots \end{pmatrix}.
$$

Useful identities:

- $(A \otimes B)(C \otimes D) = (A C) \otimes (B D)$
- $(A \otimes B)^\dagger = A^\dagger \otimes B^\dagger$
- $\mathrm{tr}(A \otimes B) = \mathrm{tr}(A) \cdot \mathrm{tr}(B)$
- If $A$ is $m \times m$ and $B$ is $n \times n$, then $\det(A \otimes B) = (\det A)^n (\det B)^m$.

A nonzero pure state in $V \otimes W$ is **product (separable)** if it can
be written as $u \otimes v$ for some $u \in V$ and $v \in W$, up to
normalization and global phase. Otherwise it is **entangled**. With respect
to the natural continuous measure on the unit sphere of $\mathbb{C}^{mn}$,
the separable states form a measure-zero set — almost every state is
entangled, which is what makes many-qubit state spaces so much richer than
products of single-qubit spaces. The Bell state

$$
|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}
$$

is the smallest concrete example of an entangled state.

> **Sanity check.** Show that $|\Phi^+\rangle$ cannot be written as
> $|u\rangle \otimes |v\rangle$ for any single-qubit $|u\rangle, |v\rangle$.
> One quick way: any product state has at most rank-one coefficient matrix
> $C_{ij} = \alpha_i \beta_j$; the coefficient matrix of $|\Phi^+\rangle$
> in the $\\{|0\rangle, |1\rangle\\}$ basis has rank two.

Sharper structural information about how entangled a bipartite pure state is
comes from the **Schmidt decomposition** (§4.8): every
$|\psi\rangle \in V \otimes W$ admits the form
$|\psi\rangle = \sum_i s_i\, |u_i\rangle |v_i\rangle$ with $s_i \ge 0$, and
$|\psi\rangle$ is a product state iff exactly one $s_i$ is nonzero. Chapter 7
develops this in detail.

*Takeaway:* the tensor product is where multi-qubit systems stop being just
collections of independent qubits and start being computational resources in
their own right.

## 4.10 Change of Basis

If $\\{e_i\\}$ and $\\{f_i\\}$ are two orthonormal bases related by a unitary $U$,
with $f_j = \sum_i U_{ij} e_i$, then vectors and operators transform
predictably:

- A vector with coefficients $v_e$ in the $e$-basis has coefficients
  $v_f = U^\dagger v_e$ in the $f$-basis.
- An operator with matrix $A_e$ in the $e$-basis has matrix
  $A_f = U^\dagger A_e U$ in the $f$-basis.

In quantum computing this is constant practice. Measurement in a basis whose
basis vectors are the columns of a unitary $U$ is implemented by applying
$U^\dagger$ and then measuring in the computational basis. For the Hadamard
basis $\\{|+\rangle, |-\rangle\\}$, $H^\dagger = H$, so this just means
applying $H$. Diagonalizing an operator is a basis change that makes it
diagonal. Many algorithm-design tricks amount to finding a basis in which a
hard computation is easy.

Traces, determinants, eigenvalues, ranks, and norms are basis-independent;
matrix entries are not. When you write a matrix, you have already chosen a
basis — remember which.

## 4.11 Hilbert Spaces

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
   (Chapter 28): many systems — particles in space, electromagnetic field
   modes, harmonic oscillators — have infinite-dimensional Hilbert spaces,
   and practical simulation uses a finite truncation or discretization. Other
   important physical models, such as lattice spin systems and qubit arrays,
   are finite-dimensional from the start.

For the rest of the book, treat "Hilbert space" as shorthand for "the relevant
$\mathbb{C}^{2^n}$" unless we say otherwise.

## 4.12 Dirac Notation

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
- An operator $A$ acts on a ket: $A|\psi\rangle$. The scalar
  $\langle\phi| A |\psi\rangle$ is the **matrix element** of $A$ between
  $|\phi\rangle$ and $|\psi\rangle$.

The translation between Dirac notation and column/row vectors is mechanical:

| Dirac notation | Matrix / vector notation |
|---|---|
| $\|\psi\rangle$ | column vector $\psi$ |
| $\langle\phi\|$ | row vector $\phi^\dagger$ |
| $\langle\phi\|\psi\rangle$ | scalar $\phi^\dagger \psi$ |
| $\|\psi\rangle\langle\phi\|$ | rank-one matrix $\psi \phi^\dagger$ |
| $A\|\psi\rangle$ | matrix-vector product $A \psi$ |
| $\langle\phi\| A \|\psi\rangle$ | scalar $\phi^\dagger A \psi$ |

The computational basis kets are $|0\rangle, |1\rangle$ for a single qubit and
$|x\rangle$ for $x \in \\{0,1\\}^n$ for $n$ qubits. We use the convention
$|x\rangle = |x_1\rangle |x_2\rangle \cdots |x_n\rangle$ with $x_1$ the most
significant bit, fixed once in §4.2; software frameworks may use the opposite
ordering, and translating to code requires checking each framework's
qubit-indexing rule. The standard basis
vectors of $\mathbb{C}^2$ are

$$
|0\rangle = \begin{pmatrix} 1 \\\\ 0 \end{pmatrix}, \qquad
|1\rangle = \begin{pmatrix} 0 \\\\ 1 \end{pmatrix}.
$$

The identity decomposes as $I = \sum_i |i\rangle\langle i|$ — the **resolution
of the identity** — and inserting it in the middle of any expression expands
that expression in the chosen basis. Acting on a state gives the basis
expansion

$$
|\psi\rangle = I\, |\psi\rangle = \sum_i |i\rangle \langle i | \psi \rangle,
$$

with coefficients $\langle i | \psi \rangle$. This is the workhorse trick of
bra-ket manipulation.

A common shorthand: when a Hermitian operator $A$ has spectral decomposition
$A = \sum_i \lambda_i |v_i\rangle\langle v_i|$, the outer-product form is
manifestly Hermitian and diagonal in the $\\{|v_i\rangle\\}$ basis.

**Source convention.** Throughout this book we write Dirac notation with
explicit `\langle` and `\rangle`, e.g., `|\psi\rangle`, `\langle\phi|`,
`\langle\phi|\psi\rangle`. We do not use `\ket{}`, `\bra{}`, or
`\braket{}{}` macros — they require the MathJax `physics` package, which is
not loaded by the GitHub Markdown renderer.

## 4.13 Fourier Transform Basics

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

> **Sign convention.** Different communities choose opposite signs in the
> exponent. In this book the forward transform carries $\omega^{-jk}$ and the
> inverse carries $\omega^{+jk}$. When comparing formulas with other quantum
> computing texts, check whether their "QFT" corresponds to our transform or
> its inverse — sign-convention errors in QFT and quantum phase estimation are
> a classic source of off-by-a-conjugate bugs.

Key properties:

- **Unitarity.** $F^\dagger F = I$, so the DFT preserves inner products and
  norms.
- **Convolution theorem.** Pointwise multiplication in one domain corresponds
  to circular convolution in the other, up to normalization factors that
  depend on the chosen DFT convention.
- **Shift–phase duality.** Translation in one domain corresponds to a phase
  rotation in the other.

The classical fast Fourier transform (FFT) computes a length-$N$ DFT in
$O(N \log N)$ time. Let $N = 2^n$. The exact **quantum Fourier transform
(QFT)** is the same unitary realized as a quantum circuit on $n = \log_2 N$
qubits, and the standard textbook construction uses $O(n^2) = O((\log N)^2)$
elementary gates. Circuit depth depends on the allowed parallelism, gate set,
and qubit connectivity; the figure above counts gate count, not depth.

This is *not* a drop-in exponentially faster FFT for arbitrary classical data:

- **Input bottleneck.** Loading an arbitrary length-$N$ classical vector as
  amplitudes generically costs $\Omega(N)$ work.
- **Output bottleneck.** Even after the QFT, measurement returns samples
  drawn from the amplitudes, not the full transformed vector. There is no way
  to read out all $N$ output amplitudes in $\text{poly}(\log N)$ time.

The QFT is powerful as a *subroutine* inside structured quantum algorithms —
Shor's algorithm, quantum phase estimation, amplitude estimation — where the
input state and the final measurement are both highly structured and only
phase or period information needs to be extracted.

*Takeaway:* the QFT accelerates the *unitary*, not the *information transfer*.
It is a structured-data tool, not a general-purpose amplitude dump.

We return to the QFT in §14.5, to **quantum phase estimation** in §15.4, and
to the broader family of **spectral-transformation techniques** —
qubitization, quantum signal processing (QSP), and the quantum singular
value transformation (QSVT) — in Chapter 16. These are not literal
descendants of the QFT, but they share its core idea: act on the spectrum
of an operator inside a quantum register, then read out structured features.

## 4.14 Probability and Information Theory Refresher

A discrete probability distribution $p$ on outcomes $\\{x_1, \dots, x_n\\}$
satisfies $p(x_i) \ge 0$ and $\sum_i p(x_i) = 1$. The **expectation** of a
real-valued function $g$ is $\mathbb{E}[g] = \sum_i p(x_i)\, g(x_i)$, and the
**variance** is $\mathrm{Var}[g] = \mathbb{E}[g^2] - \mathbb{E}[g]^2$.

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

Unless stated otherwise, entropy logarithms in this book are base 2 and
entropies are measured in bits.

Two quantum-mechanical extensions return in Chapter 12:

1. **Von Neumann entropy.** Replace the diagonal-entry distribution by the
   spectrum of a density matrix:

   $$
   S(\rho) = -\mathrm{tr}(\rho \log_2 \rho),
   $$

   measured in bits, with the convention $0 \log 0 = 0$ applied to the
   eigenvalues of $\rho$. For a pure state $S = 0$; entanglement of a pure
   bipartite state is captured by the von Neumann entropy of either reduced
   state, once reduced states are introduced (Chapter 5).
2. **Holevo bound.** Classical information is encoded not by a single density
   matrix but by an *ensemble* $\\{p_x, \rho_x\\}$ — a classical distribution
   over messages, each transmitted as a quantum state $\rho_x$. The receiver
   sees the average state $\rho = \sum_x p_x \rho_x$. The classical mutual
   information that any measurement can extract is bounded by the **Holevo
   quantity**

   $$
   \chi = S(\rho) - \sum_x p_x\, S(\rho_x).
   $$

   For an ensemble of pure states this reduces to $\chi = S(\rho)$. This is
   the information-theoretic ceiling behind the standard warning that a
   quantum state with exponentially many amplitudes cannot simply be "read out"
   as exponentially many classical numbers.

For now, treat Shannon entropy as the background you need for noisy-channel
arguments and information bounds; the quantum extensions arrive once the
density matrix formalism is in place (§5.10).

One classical fact that quantum algorithms inherit unchanged: a quantum
measurement returns a *sample* from a probability distribution determined by
the state. Estimating any outcome probability to additive error $\epsilon$
with high confidence requires $\Theta(1/\epsilon^2)$ independent samples by
standard concentration bounds (Hoeffding, Chernoff). Quantum algorithms can
sometimes reduce the number of *queries* to a black-box function or the
*depth* of the circuit being sampled, but the statistics of the final
measurement results obey ordinary probability theory. This is why
shot-budget accounting is a first-class concern when running on real
hardware (Part X).

## 4.15 Common Traps

A short checklist of mistakes that quietly waste hours when working through
the rest of the book:

1. **Amplitudes are not probabilities.** Probabilities are squared moduli
   $|\alpha|^2$, not $\alpha$ itself, and not $\alpha^2$ for complex $\alpha$.
2. **Global phase is not observable; relative phase is.** Multiplying
   $|\psi\rangle$ by $e^{i\theta}$ changes nothing measurable, but
   reweighting one component of a superposition changes interference.
3. **Inner products over $\mathbb{C}$ require conjugation.** Omitting the
   conjugate on the bra side silently breaks Hermiticity, probability
   normalization, and unitarity calculations.
4. **Tensor-product order matters.** The mapping from $|q_{n-1} \cdots q_0\rangle$
   to a Kronecker-product index is a *convention*; always check the
   bit-ordering of any framework before comparing with a hand derivation.
5. **The QFT is not a faster FFT for arbitrary arrays.** Input preparation
   and output measurement both cap what you can actually do with it.
6. **A large Hilbert space does not by itself imply a speedup.** Useful
   algorithms exploit structure and interference, not state-space size.
7. **Unitary evolution is the closed-system picture.** Measurement, reset,
   and noise are not unitary, and they enter the formalism through
   density matrices and quantum channels (Chapters 5, 11, 18).

## 4.16 Bridge to Chapter 5

The objects in this chapter — vectors, inner products, Hermitian operators,
unitaries, projectors, tensor products, density matrices — are the
mathematical scaffolding. Chapter 5 turns them into the *postulates of
quantum mechanics for computing*:

- Normalized rays in $\mathbb{C}^{2^n}$ become **pure states**.
- Unitary operators become **closed-system evolution**.
- Hermitian operators become **observables**, and their projectors become
  **ideal projective measurements**.
- Tensor products become **composite systems**.
- Density matrices become the language of **mixed states**, **subsystems**,
  and **open-system behavior**.

With those postulates in hand the rest of the book — qubits, gates,
measurement theory, algorithms, error correction, hardware — has a clean
mathematical interface to talk to.

---

[← Previous: Chapter 3](../part-01-orientation/03-physical-intuition.md) · [Table of Contents](../../README.md) · [Next: Chapter 5 →](05-postulates.md)
