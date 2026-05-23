# Chapter 4. Mathematical Background for Quantum Computing

> **Status:** draft · **Phase:** 1 · **Sections drafted:** 17 / 17

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

> **How to read this chapter.** Most of the material here is core for
> Chapter 5: §§4.1–4.8, §§4.10–4.12, and the sampling paragraph of §4.14
> deserve a careful first read. §4.9 (Singular Values and SVD), §4.13
> (Fourier and QFT), and the Holevo / amplitude-estimation preview in
> §4.14 are written so that you can skim them on a first pass and return
> when the corresponding algorithm chapters need them.

## 4.1 Complex Numbers and Probability Amplitudes

A complex number is $z = a + ib$ with $a, b \in \mathbb{R}$ and $i^2 = -1$.
Its **conjugate** is $\overline{z} = a - ib$ and its **modulus** is
$|z| = \sqrt{z \overline{z}} = \sqrt{a^2 + b^2}$. The **polar form**
$z = r\\, e^{i\theta}$ with $r = |z|$ and $\theta = \arg(z)$ separates magnitude
from phase, and the identity $e^{i\theta} = \cos\theta + i \sin\theta$ shows
that multiplying by $e^{i\theta}$ is a rotation of the complex plane by angle
$\theta$.

In the standard formulation of quantum mechanics used for quantum computing,
complex numbers are not a notational convenience but a structural ingredient.
The state of a qubit is

$$
|\psi\rangle = \alpha |0\rangle + \beta |1\rangle,
$$

with complex amplitudes $\alpha, \beta$ satisfying the normalization
condition $|\alpha|^2 + |\beta|^2 = 1$. The **Born rule** says that the
probability of obtaining outcome $0$ on measurement is $|\alpha|^2$ and of
outcome $1$ is $|\beta|^2$. These amplitudes can add, cancel, and rotate —
which is why interference, the engine of quantum speedups, exists.

An ordinary probabilistic computer cannot assign negative literal
probabilities to outcomes. A quantum computer carries complex amplitudes;
amplitudes are *not* signed probabilities (they live in the complex plane,
not on the real line) — they are complex coordinates whose squared moduli
become probabilities only relative to a *specified measurement*, most
commonly an orthonormal measurement basis in the early chapters and more
general measurements (POVMs) later (Chapter 11). A **global phase**
multiplies the entire state by the same $e^{i\theta}$ and cancels from every
probability — for any outcome $x$,

$$
\bigl|\langle x | (e^{i\theta} |\psi\rangle)\bigr|^2
= |e^{i\theta}|^2\\, |\langle x|\psi\rangle|^2
= |\langle x|\psi\rangle|^2,
$$

so global phase is physically irrelevant. A phase is not "hidden
probability"; it is information about how amplitudes will interfere under
later unitary transformations. A **relative phase** changes the phase
*relation* between components of a superposition. It can leave
measurement probabilities unchanged in the current basis but become
observable after interference or a change of basis. As a concrete example,
the two states $(|0\rangle + |1\rangle)/\sqrt{2}$ and
$(|0\rangle - |1\rangle)/\sqrt{2}$ both give probability $1/2$ for each
computational-basis outcome — they are indistinguishable in that basis. But
applying a Hadamard gate maps them to

$$
H\\,\frac{|0\rangle + |1\rangle}{\sqrt{2}} = |0\rangle, \qquad
H\\,\frac{|0\rangle - |1\rangle}{\sqrt{2}} = |1\rangle,
$$

after which a computational-basis measurement distinguishes them perfectly.
This kind of phase-revealing basis change is responsible for a large
fraction of the "this looks wrong, but it's right" moments in early quantum
computing.

## 4.2 Vector Spaces

A **complex vector space** $V$ has scalars in $\mathbb{C}$, vector addition,
and scalar multiplication satisfying the standard eight axioms. For us, $V$
is almost always $\mathbb{C}^n$ for some finite $n$.

A **linear combination** of vectors $\\{v_1, \dots, v_k\\}$ with coefficients
$c_i \in \mathbb{C}$ is $\sum_i c_i\\, v_i$. The vectors are **linearly
independent** if no nontrivial combination equals zero, and they **span** the
subspace of all their linear combinations. A **basis** is a linearly
independent spanning set; its size is the **dimension** of $V$.

For an $n$-qubit register, the state space is $\mathbb{C}^{2^n}$. The
dimension doubles every time you add a qubit. Strictly speaking, this is the
ambient vector space; a physical *pure state* is a **ray**: an equivalence
class of nonzero vectors under multiplication by any nonzero complex scalar
(the zero vector is excluded because it cannot be normalized and does not
represent a state). Once we choose normalized representatives, the
remaining equivalence is multiplication by a global phase $e^{i\theta}$.
Chapter 5 makes this precise.

> **Convention.** In calculations, a ket used as a *state vector* is
> assumed normalized unless explicitly stated otherwise. If $v \ne 0$ is
> just a mathematical vector, the corresponding normalized state
> representative is $|v\rangle / \\|v\\|$.

This exponential growth explains why generic classical simulation of quantum
systems is hard. It does not by itself give a quantum speedup: useful
algorithms exploit structure, interference, and restricted measurements, not
the size of the state space alone.

The **standard basis** of $\mathbb{C}^{2^n}$ is indexed by bit strings of
length $n$, $x \in \\{0,1\\}^n$, written $|x\rangle$. We will call this the
**computational basis**.

> **Ordering convention.** Throughout this book the bit string
> $x = x_1 x_2 \cdots x_n$ is interpreted with $x_1$ as the most significant
> bit, so $|x\rangle$ sits at the *zero-based index*
> $\sum_{i=1}^{n} x_i\\, 2^{n-i}$ in any column-vector representation, and
> $|x\rangle = |x_1\rangle |x_2\rangle \cdots |x_n\rangle$ as a tensor
> product (§4.8). Some software frameworks use the opposite convention; the
> tensor-product section gives the explicit warning.

For two qubits this convention gives the index mapping

- $|00\rangle$ — index $0$,
- $|01\rangle$ — index $1$,
- $|10\rangle$ — index $2$,
- $|11\rangle$ — index $3$.

> **Sanity check.** Verify that $|10\rangle$ sits at index $2$ in this
> book's convention, and compare with how a framework of your choice
> stores or prints the same two-qubit state. The mismatch (if any) is the
> framework's qubit-indexing convention, not a bug in the math.

## 4.3 Inner Products, Norms, and Orthonormal Bases

The **inner product** on $\mathbb{C}^n$ is

$$
\langle u, v \rangle = \sum_{i=1}^n \overline{u_i}\\, v_i.
$$

This convention is **conjugate-linear in the first argument** and linear in
the second, which is the physics convention. (Mathematicians often write the
opposite — both are valid; the quantum computing literature is consistent and
we follow it.) The induced **norm** is $\\|v\\| = \sqrt{\langle v, v\rangle}$.

For notation, this book reserves single bars and double bars for distinct
roles:

- $|z|$ is the complex modulus of a scalar $z$.
- $\\|v\\|$ is the vector 2-norm.
- $\\|A\\|$ without a subscript is the operator (spectral) norm of an operator
  $A$ — the largest singular value (§4.9).
- $\\|A\\|_1 = \mathrm{tr}\sqrt{A^\dagger A}$ is the trace norm.
- $|A| = \sqrt{A^\dagger A}$ is the *operator absolute value* used in the
  polar decomposition (§4.9), not a scalar.

When the spectral norm and the operator absolute value appear close to each
other, we write $\\|A\\|_{\mathrm{op}}$ for emphasis. The vertical bars in a
ket $|\psi\rangle$ are syntactically distinct from the bars used for scalar
modulus $|z|$ and operator absolute value $|A|$, even though they look the
same — Dirac kets are always paired with a closing `\rangle`.

Two vectors are **orthogonal** when $\langle u, v\rangle = 0$. A basis
$\\{e_1, \dots, e_n\\}$ is **orthonormal** when $\langle e_i, e_j\rangle = \delta_{ij}$.
Any vector $v$ then decomposes as $v = \sum_i \langle e_i, v\rangle\\, e_i$,
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

The Cauchy–Schwarz inequality, $|\langle u, v\rangle| \le \\|u\\| \cdot \\|v\\|$,
holds with equality iff $u, v$ are linearly dependent. In quantum mechanics it
underlies fidelity bounds and inequalities on measurement statistics.

## 4.4 Matrices and Linear Operators

A **linear operator** $A : V \to V$ satisfies $A(au + bv) = a\\, Au + b\\, Av$.
Once you fix an orthonormal basis $\\{e_i\\}$, $A$ is represented by a matrix
with entries $A_{ij} = \langle e_i, A e_j\rangle$. Acting on a column vector
of coefficients is the usual matrix-vector product.

The **adjoint** (Hermitian transpose, conjugate transpose) of $A$ is the
operator $A^\dagger$ with matrix entries

$$
(A^\dagger)_{ij} = \overline{A_{ji}}.
$$

It satisfies $\langle u, A v\rangle = \langle A^\dagger u, v\rangle$, which
is the defining property of the adjoint independent of basis.

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
- An **idempotent** is an operator $P$ with $P^2 = P$. In general linear
  algebra such operators are sometimes called **projectors** or
  **projections**; in quantum computing, however, "projector" almost always
  means an *orthogonal* projector unless explicitly stated otherwise. If
  additionally $P^\dagger = P$ it is an **orthogonal projector**: it keeps
  the component of any vector that lies inside its image and removes the
  component orthogonal to it. Orthogonal projectors represent subspaces and
  reappear as measurement operators in §4.6. A non-orthogonal idempotent
  still satisfies $P^2 = P$ but projects along a chosen direction that need
  not be perpendicular to its image. In this book, whenever we say
  "projector" in a *measurement* context — projective measurement, spectral
  decomposition of an observable, projector onto an eigenspace — we always
  mean an orthogonal projector unless stated otherwise.

> **Sanity check.** Verify that $P = |0\rangle\langle 0|$ satisfies $P^2 = P$
> and $P^\dagger = P$ — it is an orthogonal projector onto the
> $|0\rangle$ axis. Then check that
>
> $$
> Q = \begin{pmatrix} 1 & 1 \\\\ 0 & 0 \end{pmatrix}
> $$
>
> satisfies $Q^2 = Q$ but $Q^\dagger \ne Q$ — it is an idempotent that
> projects onto the same image but along a non-orthogonal direction.

Operators themselves form a complex vector space, and that space carries an
inner product of its own — the **Hilbert–Schmidt inner product**

$$
\langle A, B\rangle_{\mathrm{HS}} = \mathrm{tr}(A^\dagger B).
$$

This is one operator-level way to view many overlaps and
expectation-value expressions. For a normalized pure state
$|\psi\rangle$, the expectation value of an observable $O$ is the
familiar bra-ket sandwich

$$
\langle O\rangle_\psi = \langle\psi| O |\psi\rangle.
$$

As a *preview* — density matrices are properly introduced in Chapter 5 —
this generalizes to

$$
\langle O\rangle_\rho = \mathrm{tr}(\rho\\, O),
$$

visibly the Hilbert–Schmidt inner product of $\rho^\dagger = \rho$ and
$O$. When $O$ is Hermitian this expectation value is real; for a
general (non-Hermitian) operator the trace expression is a complex
operator overlap rather than a directly observable average. For now
the only important takeaway is that *trace expressions let us treat
operators themselves as vectors in an operator space*. The induced
**Hilbert–Schmidt norm** (Frobenius norm) is
$\\|A\\|_{\mathrm{HS}} = \sqrt{\mathrm{tr}(A^\dagger A)}$, where $A$
here is any operator, not necessarily an observable. Some quantities
introduced later, such as mixed-state fidelity and trace distance, are
*not* literal Hilbert–Schmidt inner products, but they share the same
operator-level viewpoint.

## 4.5 Hermitian, Unitary, Normal, and Positive Operators

Four operator classes appear constantly in quantum computing.

**Hermitian** (self-adjoint): $A^\dagger = A$. Eigenvalues are real;
eigenvectors belonging to distinct eigenvalues are orthogonal, and within any
degenerate eigenspace one can choose an orthonormal basis (§4.6). In ideal
**projective measurement**, observables are represented by Hermitian
operators and the possible outcomes are the eigenvalues. In the
finite-dimensional models used throughout this book, observables (energy,
spin component) are Hermitian matrices; continuous observables such as
position require the infinite-dimensional machinery postponed to Chapter 32.
More general measurements are described later by POVMs (Chapter 11).

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
every $v$, equivalently all eigenvalues of $A$ are nonnegative. The two
conditions are the same because, expanding $|v\rangle = \sum_i c_i |e_i\rangle$
in an eigenbasis of $A$ with eigenvalues $\lambda_i$,
$\langle v | A | v\rangle = \sum_i \lambda_i\\, |c_i|^2$; nonnegative
eigenvalues are exactly what forces every quadratic form to be nonnegative. We bake
Hermiticity into the definition; some authors define positivity directly
through the quadratic form and then *prove* Hermiticity over $\mathbb{C}$.
Positive semidefinite operators are the linear-algebraic home of
probabilities in quantum mechanics: **density matrices** ($\rho \succeq 0$
with $\mathrm{tr}\\,\rho = 1$), POVM **measurement effects** ($0 \preceq E_i
\preceq I$ for each effect, with $\sum_i E_i = I$ for a complete POVM), and
canonical square roots live in this cone. Other quantitative notions — fidelity,
trace distance, distinguishability bounds — are built *from* PSD states,
PSD effects, and positive square roots, even when the final quantity is a
scalar or a norm rather than a PSD operator.

Sanity checks. The Pauli matrices, Hadamard, and phase gate in their
standard $2 \times 2$ form are

$$
X = \begin{pmatrix} 0 & 1 \\\\ 1 & 0 \end{pmatrix}, \qquad
Y = \begin{pmatrix} 0 & -i \\\\ i & 0 \end{pmatrix}, \qquad
Z = \begin{pmatrix} 1 & 0 \\\\ 0 & -1 \end{pmatrix},
$$

$$
H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \end{pmatrix},
\qquad
S = \begin{pmatrix} 1 & 0 \\\\ 0 & i \end{pmatrix}.
$$

Their salient properties:

- $X$ is Hermitian and unitary; $X^2 = I$, eigenvalues $\pm 1$.
- $Y$ is Hermitian and unitary, eigenvalues $\pm 1$, with complex
  off-diagonal entries.
- $Z$ is Hermitian and unitary, diagonal in the computational basis
  with eigenvalues $\pm 1$; it leaves $|0\rangle$ and $|1\rangle$
  fixed up to sign and flips the relative phase of any superposition
  $\alpha|0\rangle + \beta|1\rangle$.
- $H$ is Hermitian and unitary; $H^2 = I$, and $H|0\rangle = |+\rangle$,
  $H|1\rangle = |-\rangle$.
- $S$ is unitary but **not** Hermitian. Its eigenvalues are $1$ and $i$.

> **Sanity check.** Verify $H^\dagger H = I$ and compute $H|0\rangle$ and
> $H|1\rangle$. Which basis does $H$ map the computational basis to? Now
> check that $|0\rangle\langle 0|$ is positive semidefinite by exhibiting
> its eigenvalues.

One last operator-algebra notation will reappear constantly. The
**commutator** of two operators is

$$
[A, B] = AB - BA.
$$

Operators **commute** when $[A, B] = 0$. In finite dimensions, a
**pairwise commuting** family of normal operators can be **simultaneously
diagonalized**: there is one orthonormal basis in which all of them are
diagonal (we will see this fall out of spectral decomposition in §4.7). In
quantum mechanics this is the linear-algebraic reason that compatible
observables admit a **common eigenbasis** — and so states in that basis
can have sharp values for all of them at once. Noncommuting observables
generally do not admit such a common eigenbasis, and their order matters
in circuits, in Hamiltonian simulation (Trotterization, §16.2), and in
the Pauli algebra.

For the single-qubit Pauli matrices,

$$
[X, Y] = 2iZ, \qquad [Y, Z] = 2iX, \qquad [Z, X] = 2iY,
$$

and the products themselves are

$$
XY = iZ, \qquad YX = -iZ.
$$

So even on one qubit, matrix multiplication is not just arithmetic
decoration — the order of operators carries physical content.

## 4.6 Eigenvalues and Eigenvectors

A nonzero $v \in V$ is an **eigenvector** of $A$ with **eigenvalue**
$\lambda \in \mathbb{C}$ when $A v = \lambda v$. The eigenvalues are the
roots of $\det(A - \lambda I) = 0$, the **characteristic polynomial** of $A$.
Over $\mathbb{C}$, an $n \times n$ matrix has $n$ eigenvalues counted with
algebraic multiplicity.

For the operator classes from §4.5:

- **Hermitian** operators have real eigenvalues and an orthonormal eigenbasis.
  Distinct eigenvalues yield orthogonal eigenvectors automatically; within a
  degenerate eigenspace you can orthonormalize freely.
- **Unitary** operators are normal, so they have an orthonormal eigenbasis;
  their eigenvalues are unit-modulus, $\\{e^{i\theta_k}\\}$.
- **Normal** operators have an orthonormal eigenbasis, possibly with complex
  eigenvalues.

The **eigenspace** of $\lambda$ is $\\{v : A v = \lambda v\\}$; its dimension
is the **geometric multiplicity**. The order of $\lambda$ as a root of the
characteristic polynomial is the **algebraic multiplicity**. For normal
operators the two coincide and the eigenspaces span $V$.

In quantum mechanics, for a **projective measurement** of a Hermitian
observable the projector $P_\lambda$ onto the eigenspace of $\lambda$ is the
measurement-outcome operator. For a normalized state $|\psi\rangle$ the
probability of outcome $\lambda$ is $\langle \psi | P_\lambda | \psi\rangle$.
Conditioned on that outcome having actually occurred — that is, only when
$\langle \psi | P_\lambda | \psi\rangle > 0$ — the post-measurement state is
$P_\lambda |\psi\rangle / \sqrt{\langle \psi | P_\lambda | \psi\rangle}$.
Outcomes with zero probability never happen and do not have a
post-measurement state. More general measurements (POVMs, generalized
measurements) are covered in Chapters 11–12.

The non-degenerate case is the one you will reach for most often. For a
projective measurement in a nondegenerate orthonormal basis
$\\{|b_i\rangle\\}$, the projectors are the rank-one outer products
$P_i = |b_i\rangle\langle b_i|$, and the Born rule reduces to

$$
p_i = |\langle b_i | \psi\rangle|^2.
$$

The post-measurement state is then exactly $|b_i\rangle$ up to global phase.
This rank-one form is the bridge between the projector formalism above and
the "amplitude squared" recipe used throughout circuit-level calculations.

> **Sanity check.** Let $P_0 = |0\rangle\langle 0|$ and
> $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ with
> $|\alpha|^2 + |\beta|^2 = 1$. Compute $\langle\psi|P_0|\psi\rangle$ and the
> post-measurement state. Check that the answer is what the Born rule says
> for obtaining computational-basis outcome $0$.

## 4.7 Spectral Decomposition

If $A$ is normal with distinct *spectral values* (distinct eigenvalues —
the distinct numbers appearing as eigenvalues, ignoring multiplicities)
$\lambda_1, \dots, \lambda_k$ and corresponding orthogonal projectors
$P_1, \dots, P_k$ onto the eigenspaces, then

$$
A = \sum_{i=1}^{k} \lambda_i\\, P_i, \qquad
\sum_{i=1}^{k} P_i = I, \qquad
P_i P_j = \delta_{ij}\\, P_i.
$$

This is the **spectral decomposition**. Each $P_i$ is Hermitian
($P_i^\dagger = P_i$) and idempotent ($P_i^2 = P_i$) — an orthogonal projector.
Each $P_i$ groups together *all* eigenvectors belonging to the eigenvalue
$\lambda_i$, so its rank equals the **geometric multiplicity** of
$\lambda_i$ — which for normal operators coincides with the algebraic
multiplicity (§4.6) — and is not necessarily one. For a non-degenerate eigenvalue $\lambda_i$ with
*normalized* eigenvector $|v_i\rangle$, the projector is rank-one:
$P_i = |v_i\rangle\langle v_i|$.

The spectral decomposition gives a **functional calculus**: for any function
$f$ whose values are defined on the spectrum of $A$ (we do not need $f$ to
be defined on all of $\mathbb{C}$),

$$
f(A) = \sum_{i=1}^{k} f(\lambda_i)\\, P_i.
$$

The two most important instances in quantum computing:

- **Time evolution.** For a *time-independent* Hamiltonian $H$ (Hermitian) and
  time $t$, the unitary $U(t) = e^{-i H t / \hbar}$ is computed from the
  spectral decomposition of $H$ as $U(t) = \sum_i e^{-i \lambda_i t / \hbar} P_i$.
  Algorithmic quantum computing usually sets $\hbar = 1$, so this formula
  appears later as $U(t) = e^{-i H t}$. Simulating dynamics reduces to
  diagonalizing $H$ when feasible — which it generally is not, hence the
  entire field of Hamiltonian simulation (Chapter 16). Time-dependent
  Hamiltonians require time-ordered exponentials, handled separately.
- **Square roots and inverses.** For a *positive semidefinite Hermitian* $A$
  the square root is canonical: $\sqrt{A} = \sum_i \sqrt{\lambda_i}\\, P_i$
  with the nonnegative real branch. For more general normal operators choosing
  a square root requires choosing branches on the spectrum. The inverse is
  $A^{-1} = \sum_i \lambda_i^{-1} P_i$ whenever every eigenvalue is nonzero.
  The HHL algorithm (§15.5) is the quantum implementation of $A^{-1}|b\rangle$
  via this calculus, under additional assumptions about Hermitian embedding,
  conditioning, and efficient state preparation.

When $A$ is Hermitian, the eigenvalues are real and $f(A)$ is Hermitian
when $f$ is real-valued on the spectrum; if $f$ has unit-modulus values
on the spectrum (like $e^{i\\,\cdot}$), $f(A)$ is unitary. This is the
finite-dimensional spectral-calculus reason why Hermitian operators can
serve as generators of one-parameter unitary families $e^{-itA}$;
Hamiltonians do this physically as the generators of time evolution.

The most important example is the **matrix exponential**. As a power series,

$$
e^A = \sum_{k=0}^{\infty} \frac{A^k}{k!},
$$

and for a normal $A$ with spectral decomposition $A = \sum_i \lambda_i P_i$
the spectral calculus collapses the series to

$$
e^A = \sum_i e^{\lambda_i}\\, P_i.
$$

This is the form actually used in Hamiltonian-simulation arguments
(Chapter 16): the closed-form right-hand side replaces the convergent but
unwieldy left-hand side whenever $A$ is normal, which Hamiltonians always
are.

For **non-normal** matrices the picture changes: eigenvectors need not span
the space, the eigenbasis need not be orthonormal, and a clean spectral
decomposition may fail entirely (Jordan form is the linear-algebra repair).
This is one reason the SVD (§4.9) is the more robust tool whenever
non-normal or rectangular matrices appear — block encodings, classical data
embeddings, and many of the structured maps inside quantum algorithms.

## 4.8 Tensor Products

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

> **Endian warning.** This book uses the convention
> $|x_1 x_2 \cdots x_n\rangle = |x_1\rangle |x_2\rangle \cdots |x_n\rangle$
> with $x_1$ as the most significant bit (§4.2). Qiskit has several related
> but *distinct* ordering conventions that the reader has to track separately:
>
> 1. **Circuit-diagram order.** Qiskit places qubit $0$ at the top of a
>    circuit drawing by default.
> 2. **Integer-interpretation order.** Qiskit is little-endian: qubit $0$
>    is the *least* significant bit of the integer represented by a basis
>    state.
> 3. **Printed-string order.** When Qiskit prints a bit string, the
>    most-significant bit (bit $n-1$ in its labelling) is on the *left*
>    and bit $0$ is on the *right*. So a Qiskit printout `01` means qubit
>    $1$ holds $0$ and qubit $0$ holds $1$.
> 4. **Statevector-index order.** Amplitude index $x$ in a Qiskit
>    statevector corresponds to the computational basis state $|x\rangle$
>    with $x$ interpreted using rules (2) and (3) above.
>
> When you hand-derive a two-qubit gate and paste the matrix into Qiskit,
> *all four* of these mappings must be reconciled. Whenever you compare a
> hand derivation to code, separately confirm: tensor-factor order in
> $|q\rangle \otimes |r\rangle$; which qubit label is the most significant;
> how printed bit strings are read; how integer indices into the amplitude
> array map back to bit strings.

For quick reference, here is how each two-qubit basis state lines up under
the two conventions (qubits labelled $q_0, q_1$):

- This book's $|x_1 x_2\rangle$ with $x_1$ MSB: $|00\rangle \to 0$,
  $|01\rangle \to 1$, $|10\rangle \to 2$, $|11\rangle \to 3$.
- Qiskit's printed string `q_1 q_0`, $q_0$ LSB: `00` $\to 0$,
  `01` $\to 1$, `10` $\to 2$, `11` $\to 3$.

The integer indices coincide *only* when this book's two tensor factors
$|x_1 x_2\rangle$ are matched with Qiskit's printed order `q_1 q_0` (most
significant on the left), not with the circuit-list order `(q_0, q_1)` that
a programmer instinctively writes when they call `QuantumCircuit(2)`. Under
that printed-order matching, this book's leftmost tensor factor corresponds
to Qiskit's most-significant printed qubit, and the string labels point at
opposite qubits: this book's $|10\rangle$ means "first (most significant)
qubit is $1$, second is $0$"; Qiskit's printed `10` means "qubit $1$ is
$1$, qubit $0$ is $0$." That is the same basis vector.

> **Rule of thumb.** To match this book's tensor order with Qiskit's
> statevector indices *without* inserting any permutation, map the
> leftmost tensor factor of $|x_1 \cdots x_n\rangle$ to Qiskit's
> *highest-numbered* qubit label. For two qubits: book factor 1 ↔ `q_1`,
> book factor 2 ↔ `q_0`. If instead you map book factor 1 ↔ `q_0`,
> insert an explicit SWAP (or qubit-label permutation) when comparing
> hand-derived matrices with code.

The tensor product also respects inner products. For product vectors,

$$
\langle u_1 \otimes v_1,\; u_2 \otimes v_2\rangle
= \langle u_1, u_2\rangle\\, \langle v_1, v_2\rangle,
$$

so $\\|u \otimes v\\| = \\|u\\|\\, \\|v\\|$. In particular, a product of two
normalized single-qubit states is itself normalized — which is why our
ordering convention can talk about $|x_1\rangle |x_2\rangle \cdots |x_n\rangle$
as a state vector without writing normalization factors at every step.
More generally, an $n$-qubit pure state has the expansion

$$
|\psi\rangle = \sum_{x \in \\{0,1\\}^n} \alpha_x\\, |x\rangle,
\qquad \sum_x |\alpha_x|^2 = 1,
$$

where the sum runs over all $2^n$ bit strings and the $\alpha_x$ are the
complex amplitudes you would actually compute or measure.

The tensor product of operators acts componentwise:

$$
(A \otimes B)(u \otimes v) = (A u) \otimes (B v).
$$

In matrix form,

$$
A \otimes B = \begin{pmatrix} A_{11} B & A_{12} B & \cdots \\\\ A_{21} B & A_{22} B & \cdots \\\\ \vdots & & \ddots \end{pmatrix}.
$$

A small worked example using this book's ordering convention: $X \otimes I$
acts as $X$ on the first qubit and leaves the second untouched. In matrix
form,

$$
X \otimes I = \begin{pmatrix}
0 & 0 & 1 & 0 \\\\
0 & 0 & 0 & 1 \\\\
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0
\end{pmatrix},
$$

which acts on basis states as

$$
(X \otimes I)|10\rangle = |00\rangle, \qquad
(X \otimes I)|01\rangle = |11\rangle.
$$

By contrast,

$$
I \otimes X = \begin{pmatrix}
0 & 1 & 0 & 0 \\\\
1 & 0 & 0 & 0 \\\\
0 & 0 & 0 & 1 \\\\
0 & 0 & 1 & 0
\end{pmatrix},
\qquad
(I \otimes X)|00\rangle = |01\rangle, \quad
(I \otimes X)|10\rangle = |11\rangle.
$$

Seeing both matrices side by side is often the fastest way to debug a
tensor-order mismatch. If you compare with a Qiskit calculation of `X` on
`q0`, you should expect to see $I \otimes X$ under this book's
tensor-factor order — the software-label-to-tensor-factor mapping is a
separate decision from the linear algebra.

Useful identities:

- $(A \otimes B)(C \otimes D) = (A C) \otimes (B D)$
- $(A \otimes B)^\dagger = A^\dagger \otimes B^\dagger$
- $\mathrm{tr}(A \otimes B) = \mathrm{tr}(A) \cdot \mathrm{tr}(B)$
- If $A$ is $m \times m$ and $B$ is $n \times n$, then $\det(A \otimes B) = (\det A)^n (\det B)^m$.

A nonzero pure state in $V \otimes W$ is **product** if it can be written as
$u \otimes v$ for some $u \in V$ and $v \in W$, up to normalization and
global phase. Otherwise it is **entangled**. For pure states, "product" and
"separable" are used interchangeably. For *mixed* states, "separable" has a
broader meaning — a convex mixture of product states — and the gap between
"separable" and "product" is one of the recurring subtleties of bipartite
quantum information (Chapter 12). The measure-zero claim below refers to the
*pure-state* meaning only. Among pure states, with respect to the natural continuous measure on the
unit sphere of $V \otimes W$ and for nontrivial bipartitions
($\dim V, \dim W \ge 2$), product/separable states form a measure-zero
subset — almost every pure state is entangled, which is what makes
many-qubit state spaces so much richer than products of single-qubit spaces. The Bell state

$$
|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}
$$

is the smallest nontrivial bipartite example of an entangled pure state.

> **Sanity check.** Show that $|\Phi^+\rangle$ cannot be written as
> $|u\rangle \otimes |v\rangle$ for any single-qubit $|u\rangle, |v\rangle$.
> One quick way: any product state has at most rank-one coefficient matrix
> $C_{ij} = \alpha_i \beta_j$; the coefficient matrix of $|\Phi^+\rangle$
> in the $\\{|0\rangle, |1\rangle\\}$ basis is
>
> $$
> C = \tfrac{1}{\sqrt{2}} \begin{pmatrix} 1 & 0 \\\\ 0 & 1 \end{pmatrix},
> $$
>
> which has rank two.

Sharper structural information about how entangled a bipartite pure state is
comes from the **Schmidt decomposition** (§4.9): every
$|\psi\rangle \in V \otimes W$ admits the form
$|\psi\rangle = \sum_i s_i\\, |u_i\rangle |v_i\rangle$ with $s_i \ge 0$, and
$|\psi\rangle$ is a product state iff exactly one $s_i$ is nonzero. Chapter 7
develops this in detail.

A related operation we will use throughout the rest of the book is the
**partial trace**, which extracts the state of a subsystem from a state of
the whole. On product operators it is defined by

$$
\mathrm{tr}_W(A \otimes B) = A\\, \mathrm{tr}(B), \qquad
\mathrm{tr}_V(A \otimes B) = \mathrm{tr}(A)\\, B,
$$

and extended linearly to general bipartite operators. The result is a
linear map on operators that yields the operator on the remaining factor.
Chapter 5 uses this to define the **reduced density matrix** of a
subsystem inside a larger composite system; for an entangled pure state
the reduced state is generally mixed, which is exactly how entanglement
makes itself visible inside one subsystem.

The Bell state $|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt{2}$
makes this concrete. The full state is pure, with density matrix
$|\Phi^+\rangle\langle\Phi^+|$. Tracing out the second qubit gives

$$
\mathrm{tr}_2\bigl(|\Phi^+\rangle\langle\Phi^+|\bigr)
= \tfrac{1}{2}\\, |0\rangle\langle 0| + \tfrac{1}{2}\\, |1\rangle\langle 1|,
$$

which is a maximally mixed single-qubit state. The whole is pure but
the part is mixed — the smallest example of why reduced density
matrices are not bookkeeping but the language entanglement actually
speaks at the subsystem level.

*Takeaway:* the tensor product is where multi-qubit systems stop being just
collections of independent qubits and start being computational resources in
their own right.

## 4.9 Singular Values and the Singular Value Decomposition

Not every useful matrix is normal, square, or diagonalizable by a unitary
similarity transformation. For a general complex matrix
$A \in \mathbb{C}^{m \times n}$ the **singular value decomposition (SVD)** is

$$
A = U\\, \Sigma\\, V^\dagger,
$$

where $U \in \mathbb{C}^{m \times m}$ and $V \in \mathbb{C}^{n \times n}$
are unitary and $\Sigma$ is an $m \times n$ rectangular diagonal matrix
with nonnegative real entries $\sigma_1 \ge \sigma_2 \ge \cdots \ge 0$ on
the diagonal. There are $\min(m, n)$ singular values in total, with zeros
padding the rectangular diagonal as needed. The $\sigma_i$ are the
**singular values** of $A$; they are the square roots of the eigenvalues
of the positive semidefinite operator $A^\dagger A$.

Singular values are invariant under unitary changes of basis on either side
and measure the principal stretching factors of $A$. Two derived quantities
show up constantly in quantum computing:

- The **operator norm** (spectral norm) is
  $\\|A\\| = \sup_{\\|v\\| = 1} \\|A v\\| = \sigma_1$, the largest singular
  value. It bounds the worst-case amplification by $A$.
- The **trace norm** (nuclear norm) is
  $\\|A\\|_1 = \mathrm{tr}\sqrt{A^\dagger A} = \sum_i \sigma_i$. The trace
  distance between two density matrices,
  $D(\rho, \sigma) = \tfrac{1}{2}\\|\rho - \sigma\\|_1$, quantifies
  their optimal distinguishability: it equals the maximum classical
  total-variation distance obtainable from any measurement, and
  determines the optimal equal-prior discrimination success
  probability between $\rho$ and $\sigma$.

For a square invertible matrix the **condition number** is
$\kappa(A) = \sigma_{\max}(A) / \sigma_{\min}(A)$. It measures how
ill-posed the linear system $A x = b$ is — small $\kappa$ is well-conditioned,
large $\kappa$ means numerical error gets amplified. The HHL algorithm's
asymptotic cost depends explicitly on $\kappa$.

SVD appears repeatedly in the rest of the book:

- **Schmidt decomposition.** Every pure bipartite state
  $|\psi\rangle \in V \otimes W$ admits the form
  $|\psi\rangle = \sum_i s_i\\, |u_i\rangle |v_i\rangle$ with
  $s_i \ge 0$, $\sum_i s_i^2 = 1$, and orthonormal $\\{|u_i\rangle\\}$,
  $\\{|v_i\rangle\\}$. This is the SVD of the coefficient matrix of
  $|\psi\rangle$. The number of nonzero $s_i$ is the **Schmidt rank**; the
  state is a product iff the Schmidt rank is one, and otherwise it is
  entangled. The full Schmidt spectrum $\\{s_i\\}$ is the raw data from which
  the standard pure-state bipartite entanglement measures used later
  (Chapter 7) are derived; a single scalar "amount of entanglement" is a
  derived quantity, not one of the $s_i$ themselves. Concretely, the Bell
  state $|\Phi^+\rangle$ from §4.8 has coefficient matrix
  $C = \tfrac{1}{\sqrt{2}} I$ (the $2 \times 2$ identity scaled by
  $1/\sqrt{2}$), so its singular values are
  $(1/\sqrt{2},\\, 1/\sqrt{2})$, Schmidt rank $= 2$, and the state is
  maximally entangled in this two-qubit setting.
- **Block encodings and QSVT** (preview only — Chapter 16). Modern
  algorithms such as quantum signal processing, qubitization, and the
  quantum singular value transformation act on the singular values of a
  matrix embedded inside a larger unitary. The SVD is the spectrum these
  techniques actually transform.
- **HHL and related algorithms** (preview only — §15.5). In the simplest
  Hermitian positive-definite presentation of HHL, eigenvalues and
  singular values coincide, so
  the algorithm implements a map proportional to $A^{-1}|b\rangle$ by
  transforming $\lambda_i \mapsto 1/\lambda_i$ on the eigenvectors. More
  general Hermitian formulations allow signed eigenvalues bounded away from
  zero; non-Hermitian systems are typically handled by embedding $A$ inside
  a larger Hermitian matrix, or by block-encoding and
  singular-value-transformation methods that act on the SVD structure
  directly, $\sigma_i \mapsto 1/\sigma_i$ while mapping between the right
  and left singular-vector subspaces. Conditioning ($\kappa$) is one of
  the dominant cost parameters in these algorithms, alongside state
  preparation, block-encoding or sparsity access, precision, and the cost
  of extracting the desired classical information from the output state.

For normal $A$ with spectral decomposition $A = W \Lambda W^\dagger$, the
singular values are $|\lambda_i|$, and an SVD can be chosen in the same
eigenbasis: $\Sigma = |\Lambda|$, $V = W$, and $U = W D$, where
$D_{ii} = \lambda_i / |\lambda_i|$ for nonzero eigenvalues (arbitrary phases
on the kernel). In this sense the SVD separates the *magnitudes* of the
eigenvalues from their *phases*; for non-normal or rectangular operators it
is the strictly more general tool.

The SVD also yields the **polar decomposition**: every square $A$ factors as
$A = U_p\\, |A|$ with $|A| = \sqrt{A^\dagger A}$ positive semidefinite (we
write $U_p$ rather than $W$ here to avoid clashing with the eigenbasis
unitary $W$ above). If $A$ is invertible, $U_p$ is unitary and unique. If
$A$ is rank-deficient, the canonical polar factor is a partial isometry; in
finite dimensions it can be extended to a unitary, but the extension is not
unique on the kernel. Rectangular polar decompositions also exist, but the
square case is enough for this chapter. This is the operator analogue of
writing a complex number as $z = e^{i\theta} |z|$.

> **Sanity check.** Compute the singular values of $X$ (Pauli), $S$ (phase
> gate), and $|0\rangle\langle 0|$. Unitary matrices have all singular
> values equal to $1$, so $X$ and $S$ both have $\sigma = (1, 1)$. The
> rank-one projector $|0\rangle\langle 0|$ has singular values $(1, 0)$.
> Notice how this distinguishes the *unitary*, *Hermitian*, and *projector*
> properties even though all three matrices are $2 \times 2$.

## 4.10 Change of Basis

If $\\{e_i\\}$ and $\\{f_i\\}$ are two orthonormal bases related by a unitary $U$,
with $f_j = \sum_i U_{ij} e_i$, then vectors and operators transform
predictably:

- A vector with coefficients $v_e$ in the $e$-basis has coefficients
  $v_f = U^\dagger v_e$ in the $f$-basis. Equivalently,
  $v_e = U v_f$ — the two directions are inverses, as you would expect
  from a unitary change of orthonormal basis.
- An operator with matrix $A_e$ in the $e$-basis has matrix
  $A_f = U^\dagger A_e U$ in the $f$-basis (and $A_e = U A_f U^\dagger$
  the other way).

In quantum computing this is constant practice. If the columns of a
unitary $U$ are the desired measurement basis written in *computational
coordinates*, then measurement in that basis is implemented by applying
$U^\dagger$ and then measuring in the computational basis. For the Hadamard
basis $\\{|+\rangle, |-\rangle\\}$, $H^\dagger = H$, so this just means
applying $H$ — and the action is mechanical: $H|+\rangle = |0\rangle$ and
$H|-\rangle = |1\rangle$, so a state previously in a Hadamard-basis
superposition becomes a computational-basis superposition with the same
amplitudes.

> **Active vs passive.** There are two related but distinct uses of
> $U^\dagger$ here. As a *passive* change of coordinates,
> $v_f = U^\dagger v_e$ describes the *same* vector in a new basis — the
> physical state is unchanged. As an *active* circuit operation, applying
> the gate $U^\dagger$ physically changes the state before a
> computational-basis measurement. The formulas look the same because
> measuring in the $U$-basis is *equivalent* to actively rotating the
> state by $U^\dagger$ and then measuring in the standard basis. Mixing
> the two readings is one of the most common sources of phantom bugs in
> circuit derivations.
>
> Concretely: if $|\psi\rangle = a|+\rangle + b|-\rangle$, then in the
> Hadamard basis its coordinate vector is $(a, b)^T$. In computational
> coordinates the *same* vector is $H\\, (a, b)^T$ — a passive relabelling.
> Applying $H$ as a *gate* is a different physical operation; it just
> happens to be described by the same matrix because $H = H^\dagger$.
> The Hadamard is unusually forgiving in this respect: for a general
> basis-change unitary $U$, the direction of $U$ versus $U^\dagger$
> matters and the two readings do not collapse to the same matrix.

Diagonalizing an operator is a basis change that makes it diagonal. Many
algorithm-design tricks amount to finding a basis in which a hard
computation is easy.

Traces, determinants, eigenvalues, ranks, and the unitarily invariant norms
used in this book (vector 2-norm, operator norm, trace norm, Hilbert–Schmidt
norm) are basis-independent; matrix entries are not. When you write a
matrix, you have already chosen a basis — remember which.

## 4.11 Hilbert Spaces

A **Hilbert space** is a complete inner-product space — every Cauchy sequence
converges. In finite dimensions every inner-product space is automatically
complete, so for almost all of this book "Hilbert space" simply means
"finite-dimensional complex inner-product space," i.e., $\mathbb{C}^n$ with
the standard inner product. We say *Hilbert space* because the term is
standard in quantum mechanics, not because finiteness is in doubt.

Infinite-dimensional Hilbert spaces appear in two contexts:

1. **Continuous-variable quantum computing** (Chapter 32): position/momentum
   degrees of freedom, modes of light, harmonic oscillators. The state
   space is, for example, $L^2(\mathbb{R})$ for one continuous degree of
   freedom; multiple modes use $L^2(\mathbb{R}^n)$ or Fock space.
2. **Hamiltonians of physical systems** being simulated by a quantum computer
   (Chapter 28): many systems — particles in space, electromagnetic field
   modes, harmonic oscillators — have infinite-dimensional Hilbert spaces,
   and practical simulation uses a finite truncation or discretization. Other
   important physical models, such as lattice spin systems and qubit arrays,
   are finite-dimensional from the start.

For most of this book, "Hilbert space" means the finite-dimensional complex
inner-product space appropriate to the register being discussed — usually
$\mathbb{C}^{2^n}$ for an $n$-qubit register, but also ancilla spaces,
qudit-dimension spaces, and truncated mode spaces — unless we say otherwise.

## 4.12 Dirac Notation

The Dirac (bra-ket) notation is a convention for working in finite-dimensional
Hilbert spaces. It is not new mathematics — every bra-ket statement translates
directly into matrix algebra — but it makes the structure of quantum mechanics
readable.

- A **ket** $|\psi\rangle$ is an abstract state vector; after a basis is
  chosen it is *represented* by a column vector in $\mathbb{C}^n$.
- A **bra** $\langle\phi|$ is the adjoint of the ket $|\phi\rangle$, i.e., a
  row vector.
- The **inner product** $\langle\phi|\psi\rangle$ is a scalar,
  $\sum_i \overline{\phi_i}\\, \psi_i$.
- The **outer product** $|\psi\rangle\langle\phi|$ is the matrix with entries
  $\psi_i \overline{\phi_j}$. It is rank one if $|\psi\rangle, |\phi\rangle \ne 0$.
  Its adjoint flips the two sides:
  $\bigl(|\psi\rangle\langle\phi|\bigr)^\dagger = |\phi\rangle\langle\psi|$.
  The special case $|\psi\rangle\langle\psi|$ is a rank-one orthogonal
  projector exactly when $|\psi\rangle$ is normalized, and it is the
  pure-state density matrix that returns in Chapter 5.
- An operator $A$ acts on a ket: $A|\psi\rangle$. The scalar
  $\langle\phi| A |\psi\rangle$ is the **matrix element** of $A$ between
  $|\phi\rangle$ and $|\psi\rangle$.

The bra map is **anti-linear** — the most common source of slow-burn
errors in Dirac calculations:

$$
\langle a\phi + b\chi | = \overline{a}\\, \langle\phi| + \overline{b}\\, \langle\chi|.
$$

Distributing a bra over a sum should always carry the complex conjugates.

The translation between Dirac notation and column/row vectors is mechanical:

- $|\psi\rangle$ corresponds to a column vector $\psi$ of shape $n \times 1$.
- $\langle\phi|$ corresponds to the row vector $\phi^\dagger$ of shape $1 \times n$.
- $\langle\phi|\psi\rangle$ corresponds to the scalar $\phi^\dagger \psi$
  (shape $1 \times 1$).
- $|\psi\rangle\langle\phi|$ corresponds to the rank-one matrix
  $\psi\\, \phi^\dagger$ of shape $n \times n$.
- $A|\psi\rangle$ corresponds to the matrix-vector product $A\psi$
  (shape $n \times 1$).
- $\langle\phi| A |\psi\rangle$ corresponds to the scalar $\phi^\dagger A \psi$
  (shape $1 \times 1$).

This "type signature" view is enough to catch most Dirac-vs-matrix bugs
mechanically.

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
|\psi\rangle = I\\, |\psi\rangle = \sum_i |i\rangle \langle i | \psi \rangle,
$$

with coefficients $\langle i | \psi \rangle$. This is the workhorse trick of
bra-ket manipulation.

A common shorthand: after choosing an orthonormal eigenbasis (one entry per
eigenvector, with degenerate eigenspaces orthonormalized as in §4.6), a
Hermitian operator $A$ has the spectral decomposition
$A = \sum_i \lambda_i |v_i\rangle\langle v_i|$. The outer-product form is
manifestly Hermitian and diagonal in the $\\{|v_i\rangle\\}$ basis.

**Source convention.** Throughout this book we write Dirac notation with
explicit `\langle` and `\rangle`, e.g., `|\psi\rangle`, `\langle\phi|`,
`\langle\phi|\psi\rangle`. We do not use `\ket{}`, `\bra{}`, or
`\braket{}{}` macros — they require the MathJax `physics` package, which is
not loaded by the GitHub Markdown renderer.

## 4.13 Fourier Transform Basics

The **discrete Fourier transform (DFT)** of a vector $f \in \mathbb{C}^N$ is

$$
\hat{f}_k = \frac{1}{\sqrt{N}} \sum_{j=0}^{N-1} f_j\\, \omega^{-jk}, \qquad
\omega = e^{2\pi i / N},
$$

with the inverse

$$
f_j = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} \hat{f}_k\\, \omega^{jk}.
$$

The $1/\sqrt{N}$ normalization makes the DFT a unitary transformation of
$\mathbb{C}^N$.

**Sign convention.** Different communities choose opposite signs in the
exponent. To make this unambiguous we will sometimes write $F_N^{(-)}$ and
$F_N^{(+)}$ when the distinction matters:

$$
F_N^{(-)} |j\rangle = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} \omega^{-jk}\\, |k\rangle,
\qquad
F_N^{(+)} |j\rangle = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} \omega^{+jk}\\, |k\rangle,
$$

with $F_N^{(+)} = (F_N^{(-)})^\dagger$. We label this choice
**Convention QFT-sign-minus**: throughout this book "the QFT" always means
$F_N \equiv F_N^{(-)}$. Later algorithm chapters (phase estimation, Shor)
reference this convention by name; whenever a library uses the opposite
sign, translate by taking the adjoint. As of Qiskit's 2.x documentation,
`QFTGate` implements the opposite, positive-exponent convention
$F_N^{(+)}$, so Qiskit's `QFTGate` corresponds to the *inverse* of our
$F_N$, and Qiskit's inverse of `QFTGate` matches our $F_N$ — up to the
same bit-ordering and final-swap conventions discussed in §4.8, which QFT
circuits often expose as an optional terminal swap layer. (Older code may
use the now-deprecated `qiskit.circuit.library.QFT` blueprint circuit; new
code should prefer `QFTGate` or Qiskit's QFT synthesis functions. Re-check
the convention against current Qiskit documentation when you translate
formulas into code.)

Before comparing a formula from this book with Qiskit output, check three
things independently: (1) exponent sign (this section);
(2) final-swap / bit-reversal convention (§4.8);
(3) qubit-label-to-tensor-factor mapping (§4.8). If a later algorithm uses
the opposite QFT sign, every controlled-phase angle and every
phase-estimation readout formula needs to be conjugated accordingly —
sign errors in QFT and quantum phase estimation are a classic source of
off-by-a-conjugate bugs.

Key properties:

- **Unitarity.** $F^\dagger F = I$, so the DFT preserves inner products and
  norms.
- **Convolution theorem.** Pointwise multiplication in one domain corresponds
  to circular convolution in the other, up to normalization factors that
  depend on the chosen DFT convention.
- **Shift–phase duality.** Translation in one domain corresponds to a phase
  rotation in the other.

The classical fast Fourier transform (FFT) computes a length-$N$ DFT in
$O(N \log N)$ time. Let $N = 2^n$. In this book, **"QFT"** means the unitary
$F_N$ on $\mathbb{C}^N$ that acts on computational-basis states by

$$
F_N |j\rangle = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} \omega^{-jk}\\, |k\rangle,
\qquad \omega = e^{2\pi i / N},
$$

i.e., the same unitary as the DFT above, realized as a quantum circuit on
$n = \log_2 N$ qubits; the standard *exact* construction uses
$O(n^2) = O((\log N)^2)$ elementary gates. Approximate variants reduce
this further by dropping very small controlled rotations below a chosen
threshold, at the cost of bounded approximation error; we return to this
in Chapter 14. Some texts call the
opposite-sign unitary the QFT and this one the inverse QFT — always check
the exponent when comparing formulas, especially inside quantum phase
estimation.

**Sanity check.** Take $N = 4$, so $\omega = i$. Under this book's
convention,

$$
F_4 |1\rangle
= \tfrac{1}{2}\bigl(|0\rangle + \omega^{-1}|1\rangle + \omega^{-2}|2\rangle + \omega^{-3}|3\rangle\bigr)
= \tfrac{1}{2}\bigl(|0\rangle - i|1\rangle - |2\rangle + i|3\rangle\bigr).
$$

Under the opposite-sign convention $F_4^{(+)}|1\rangle$ would be the
complex conjugate of this. If a Qiskit `QFTGate` calculation gives you
the conjugate of the above, that is the sign convention talking, not a
bug. Circuit depth depends on the allowed parallelism, gate set,
and qubit connectivity; the $O(n^2)$ estimate above is a gate-count
statement, not a depth statement.

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
real-valued function $g$ is $\mathbb{E}[g] = \sum_i p(x_i)\\, g(x_i)$, and the
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

Two quantum-mechanical extensions return in Chapter 12. They use the
density-matrix formalism introduced in Chapter 5, so on a first pass it is
fine to read this material as a *preview* and return after Chapter 5.

**Von Neumann entropy.** Replace the diagonal-entry distribution by the
spectrum of a density matrix:

$$
S(\rho) = -\mathrm{tr}(\rho \log_2 \rho),
$$

measured in bits, with the convention $0 \log 0 = 0$ applied to the
eigenvalues of $\rho$. For a pure density matrix
$\rho = |\psi\rangle\langle\psi|$, $S(\rho) = 0$; entanglement of a pure
bipartite state is captured by the von Neumann entropy of either reduced
state, once reduced states are introduced (Chapter 5).

**Holevo bound.** Classical information is encoded not by a single density
matrix but by an *ensemble* $\\{p_x, \rho_x\\}$ — a classical distribution
over messages $X$, each transmitted as a quantum state $\rho_x$. The
receiver sees the average state $\rho = \sum_x p_x \rho_x$. For *any*
measurement producing classical outcome $Y$, the resulting classical
mutual information $I(X; Y)$ is bounded by the **Holevo quantity**

$$
\chi = S(\rho) - \sum_x p_x\\, S(\rho_x).
$$

Consequently the **accessible information** — the supremum of $I(X; Y)$
over all measurements — is itself at most $\chi$. For an ensemble of pure
states this reduces to $\chi = S(\rho)$. In particular $\chi$ is generally
far smaller than the number of complex amplitudes used to describe the
underlying quantum states — the information-theoretic ceiling behind the
standard warning that a quantum state with exponentially many amplitudes
cannot simply be "read out" as exponentially many classical numbers.

For now, treat Shannon entropy as the background you need for noisy-channel
arguments and information bounds; the quantum extensions arrive once the
density matrix formalism is in place (§5.10).

One classical fact that quantum algorithms inherit unchanged: a quantum
measurement returns a *sample* from a probability distribution determined by
the state, not direct access to the underlying complex amplitudes. Whatever
you eventually report is an empirical frequency from repeated trials.
In the worst case — for example for an unknown probability bounded
away from $0$ and $1$ — if all you can do is prepare the state,
measure it, and repeat independently, estimating that Bernoulli
outcome probability to additive error $\epsilon$ with constant
confidence requires $\Theta(1/\epsilon^2)$ shots by standard
concentration bounds (Hoeffding, Chernoff); confidence $1 - \delta$
adds a $\log(1/\delta)$ factor. Extreme-probability cases (very close
to $0$ or $1$) admit tighter bounds, but the
distribution-independent worst case is what you should budget for. Coherent subroutines such as **amplitude
estimation** can improve query complexity to roughly $O(1/\epsilon)$ under
stronger access assumptions (Chapter 14), but the final observed data are
still classical samples, and once you have them they must be interpreted with
ordinary probability theory. This is why shot-budget accounting is a
first-class concern when running on real hardware (Part X).

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
8. **Eigenvalues and singular values are not the same in general.** They
   coincide for positive semidefinite Hermitian operators and agree in
   modulus for normal ones; the SVD is the safer tool for non-normal or
   rectangular matrices.
9. **"Hermitian," "unitary," "normal," and "positive semidefinite" are
   different properties.** The Pauli matrices happen to satisfy several at
   once; generic operators do not, and conflating these classes leads to
   real bugs.
10. **A passive change of basis changes coordinates, not the vector or
    operator itself.** If the new basis vectors are the columns of $U$, then
    the coordinate vector of $|\psi\rangle$ changes as $v_f = U^\dagger v_e$,
    but the abstract vector is the same. This is different from *actively*
    applying $U^\dagger$ as a quantum gate, which physically changes the
    state before measurement. The formulas look identical (§4.10); the
    semantics do not, and conflating them is one of the most common sources
    of phantom bugs in circuit derivations.
11. **The measurement basis is part of the experiment.** The same state can
    produce different classical distributions under different measurement
    bases; probabilities are not properties of the state vector alone, they
    are properties of the pair (state, measurement). This is what made the
    Hadamard-basis distinction in §4.1 possible.
12. **Tensor-product notation and software qubit labels are not the same
    thing.** A formula like $A \otimes B$ names *tensor factors*; a
    framework call like `qc.x(0)` names a *software qubit label*. The
    mapping between the two is a convention you choose explicitly, and a
    matrix that is correct under one mapping needs a SWAP or permutation
    under the other.
13. **A ket and its coordinate vector are not the same level of
    description.** $|\psi\rangle$ is an abstract state; the column vector
    you write down is its *representation in a chosen basis*. The same
    state has different coordinate columns in different bases, even
    though it is the same physical thing.

## 4.16 Conventions at a Glance

The conventions are spread across the chapter as they get introduced.
Here they are collected as a single debugging checklist for moments
when something does not type-check.

This section is a bullet list rather than a Markdown table because
several conventions contain literal `|` characters (kets, norm
bars), and `|` is the column separator inside a Markdown table cell
— Bug 5 in [`docs/github-markdown-math-bugs.md`](../../docs/github-markdown-math-bugs.md)
records the silent failure mode.

- **Inner product.** Conjugate-linear in the first argument:
  $\langle u, v\rangle = \sum_i \overline{u_i}\\, v_i$.
- **Kets.** Abstract state vectors; represented as $n \times 1$
  column vectors after a basis is chosen.
- **Pure states.** Normalized unless explicitly stated otherwise;
  rays under global phase.
- **Computational basis order.** Bit string $x = x_1 x_2 \cdots x_n$
  is interpreted with $x_1$ as the most significant bit; the
  corresponding basis ket $|x\rangle$ sits at zero-based statevector
  index $\sum_i x_i\\, 2^{n-i}$.
- **Tensor-product order.** $|x_1 x_2 \cdots x_n\rangle = |x_1\rangle\\, |x_2\rangle \cdots |x_n\rangle$.
- **Qiskit mapping.** Map this book's leftmost tensor factor to
  Qiskit's *highest-numbered* qubit label, or insert a SWAP.
- **QFT sign.** Convention **QFT-sign-minus**:
  $F_N\\, |j\rangle = N^{-1/2}\\, \sum_k \omega^{-jk}\\, |k\rangle$
  with $\omega = e^{2\pi i / N}$. As of Qiskit's 2.x documentation,
  `QFTGate` uses the opposite, positive-exponent sign and therefore
  corresponds to the inverse of our $F_N$.
- **Hamiltonian evolution.** Algorithmic chapters use $\hbar = 1$,
  so $U(t) = e^{-iHt}$.
- **Observables.** Hermitian operators in the projective-measurement
  picture; POVMs cover the general case (Chapter 11).
- **Entropy logs.** Base 2; entropies measured in bits unless stated
  otherwise.
- **Projectors in measurement contexts.** Always orthogonal
  ($P^2 = P$, $P^\dagger = P$) unless explicitly stated otherwise.

Norm notation is reserved across five distinct roles. Note in
particular that single bars `|A|` are *not* a norm — they denote the
operator absolute value:

- $|z|$ — scalar modulus of a complex number.
- $\\|v\\|$ — vector 2-norm.
- $\\|A\\|$ (or $\\|A\\|_{\mathrm{op}}$ when ambiguity threatens) —
  operator / spectral norm of an operator $A$ (the largest singular
  value).
- $\\|A\\|_1$ — trace norm (sum of singular values; the basis for
  trace distance between density matrices).
- $|A| = \sqrt{A^\dagger A}$ — *operator* absolute value, the
  positive semidefinite square root used in the polar decomposition.
  Single bars; this is not a norm.

If a later derivation seems off by a conjugate, a swap, or a sign,
check the lists above first before suspecting the math.

## 4.17 Bridge to Chapter 5

The objects in this chapter — vectors, inner products, Hermitian operators,
unitaries, projectors, tensor products, and the positive semidefinite,
trace-one operators that will become density matrices — are the
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
mathematical interface to talk to. The next chapter is where the
mathematical objects of this chapter acquire physical meaning.

---

[← Previous: Chapter 3](../part-01-orientation/03-physical-intuition.md) · [Table of Contents](../../README.md) · [Next: Chapter 5 →](05-postulates.md)
