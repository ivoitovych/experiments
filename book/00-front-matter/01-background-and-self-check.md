# Recommended / Assumed Background and Self-Check

> **Status:** draft · **Phase:** 1 · **Sections drafted:** 7 / 7

[← Previous: Preface](00-preface.md) · [Table of Contents](../../README.md) · [Next: Notation and Conventions →](02-notation-and-conventions.md)

This chapter is a **self-check**, not an introduction. The book proper
starts at Chapter 1. If you can work the problems below from memory — or
with only minor stumbling — you have the background to read this book
linearly. If you cannot, the closing paragraph of each section names a
standard reference that will get you there in a few weeks of evening
study, and §1.6 collects them in one place.

The bar is deliberately set at "fluent enough that the math does not
get in the way of the physics and the algorithms." This is roughly the
level of a senior undergraduate in a numerate discipline (CS, EE,
physics, applied math), or a working engineer who has used linear
algebra and probability for something non-trivial in the last few
years. Specialized topics — group representation theory, measure
theory, the Lebesgue integral, advanced functional analysis — are
**not** assumed. Where the book needs a result outside the assumed
background, it is stated, motivated, and either proved or cited.

> **How to read this chapter.** Skim the section openings first to
> calibrate. Then attempt the **sample problems** at the end of each
> section without looking anything up. Answers and hints are inlined
> immediately after each problem, but try the problem first — the
> calibration value is in the attempt, not the answer. If two or more
> problems in a section feel out of reach, treat the cited reference
> as required reading before continuing with the book. If only one
> problem trips you up, note the topic and move on; the book's
> Chapter 4 (Mathematical Background) will catch it.

---

## 1.1 Required: Programming Proficiency

You should be comfortable reading and writing Python at the level of a
working developer. The book's tooling and practice chapters (Chapter 23,
Chapter 24, Chapter 26, and the running examples that thread through
later algorithm chapters) use Python 3 with NumPy and one or two quantum
SDKs. Specifically, you should be at ease with:

- Reading idiomatic Python: list comprehensions, generators, decorators,
  context managers, `dataclasses`, basic typing annotations.
- NumPy arrays: shape, broadcasting, slicing, `dtype=complex`,
  `np.kron`, `np.einsum`, `np.linalg.eig`, `np.linalg.svd`. If
  `A @ B.conj().T` reads naturally as "multiply by the conjugate
  transpose," you are set.
- A package and virtual-environment workflow you trust:
  `python -m venv`, `pip install`, `pyproject.toml`. The book does not
  prescribe a specific one.
- Running a Jupyter notebook or an equivalent REPL well enough to
  poke at intermediate states.

You do **not** need to have written a compiler, a numerical solver, or
a production scientific-computing library. You **do** need to be able
to translate a half-page of pseudocode into runnable Python without
fighting the language.

If your Python is rusty, the official tutorial plus a weekend with
NumPy's user guide is usually enough. If you have never used NumPy,
work through the first half of *Python Data Science Handbook*
(VanderPlas) or the NumPy quickstart, paying attention to broadcasting
and to `np.kron` specifically — tensor products will be a constant
companion.

**Sample problem 1.1.1.** Given a complex matrix `A` of shape
`(4, 4)`, write a one-line NumPy expression that returns `True` iff `A`
is unitary to within numerical tolerance.

*Answer.* `np.allclose(A.conj().T @ A, np.eye(4))`. Variant:
`np.allclose(A @ A.conj().T, np.eye(4))`. Both should hold for a
unitary.

**Sample problem 1.1.2.** Express the two-qubit state
$|01\rangle$ as a length-4 NumPy column vector with `dtype=complex`,
using zero-based indexing where the leftmost factor is the most
significant bit.

*Answer.* `np.array([0, 1, 0, 0], dtype=complex).reshape(4, 1)`. The
state $|01\rangle$ sits at index $1$ under this convention; see
Chapter 4, §4.2 for the ordering rule.

---

## 1.2 Required: Mathematical Maturity

By "mathematical maturity" we mean the habits a reader picks up after
a couple of proof-based undergraduate courses: reading a statement and
extracting its quantifiers, distinguishing necessary from sufficient
conditions, recognizing when an "obvious" step needs a one-line
justification, and being unbothered by abstract objects (vector
spaces, groups, fields) defined by axioms rather than by a picture.

You will not be asked to write proofs. You **will** be asked to read
short ones — usually one to five lines — and to believe that a stated
identity holds because of an explicit chain of equalities rather than
because the author asserted it. If the phrase "without loss of
generality" causes anxiety, that is the gap to close.

A pragmatic test: can you read the statement and proof of the
Cauchy–Schwarz inequality on Wikipedia and feel that you could
reconstruct it within an hour? If yes, you are calibrated.

---

## 1.3 Required: Linear Algebra

This is the largest single prerequisite. Quantum computing **is**
applied finite-dimensional complex linear algebra plus a measurement
rule. Chapter 4 is a refresher of the specific pieces the book uses,
in the book's conventions, but it is not a substitute for having seen
the material once before.

You should be fluent with the following over $\mathbb{R}$ and over
$\mathbb{C}$:

- **Vector spaces and bases.** Linear combination, span, linear
  independence, basis, dimension. Change of basis as a matrix
  transformation.
- **Matrix arithmetic.** Matrix multiplication (including by hand for
  $2 \times 2$ and $3 \times 3$), the transpose, the conjugate
  transpose (Hermitian adjoint $A^\dagger$), the inverse. The
  identity that $(AB)^\dagger = B^\dagger A^\dagger$ should be
  reflexive.
- **Eigenvalues and eigenvectors.** Characteristic polynomial,
  diagonalization, spectrum. Why a Hermitian matrix has real
  eigenvalues and orthogonal eigenvectors; why a unitary matrix has
  eigenvalues on the unit circle $\\{e^{i\theta}\\}$.
- **Complex matrices.** Hermitian ($A^\dagger = A$), unitary
  ($U^\dagger U = I$), normal ($A A^\dagger = A^\dagger A$). The
  spectral theorem for normal operators.
- **Inner products and norms.** The standard complex inner product
  $\langle u, v\rangle = \sum_i \overline{u_i}\\, v_i$ (the book uses
  the physics convention — conjugate-linear in the first slot),
  orthogonality, Gram–Schmidt, the 2-norm $\\|v\\|$, the operator
  (spectral) norm $\\|A\\|$.
- **Trace, determinant, rank.** Cyclic property of the trace,
  $\det(AB) = \det A \det B$, rank as the dimension of the column
  space and as the number of nonzero singular values.
- **Tensor (Kronecker) products.** $A \otimes B$ as a block matrix,
  $(A \otimes B)(C \otimes D) = (AC) \otimes (BD)$, the dimension
  rule $(m \times n) \otimes (p \times q) = (mp \times nq)$. This is
  the single most overworked operation in the book.

Two related topics are optional but useful if you have seen them:
singular value decomposition (the book reintroduces it in §4.9) and
positive semidefinite operators (§4.5). Neither is assumed background.

**Sample problem 1.3.1.** Let

$$
A = \begin{pmatrix} 2 & 1 \\\\ 1 & 2 \end{pmatrix}.
$$

Find the eigenvalues and a pair of orthonormal eigenvectors.

*Answer.* Eigenvalues $\lambda = 3$ and $\lambda = 1$. Eigenvectors
$\tfrac{1}{\sqrt{2}}(1, 1)^T$ and $\tfrac{1}{\sqrt{2}}(1, -1)^T$
respectively. These are also the eigenvectors of the Pauli $X$ matrix,
which is no coincidence — $A = I + X$.

**Sample problem 1.3.2.** Let

$$
U = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \end{pmatrix}.
$$

Verify by direct computation that $U^\dagger U = I$ and find $U^2$.

*Answer.* $U$ is real and symmetric, so $U^\dagger = U$. Direct
multiplication gives $U^2 = I$. This is the Hadamard gate $H$; the
property $H^2 = I$ is used constantly.

**Sample problem 1.3.3.** Let
$|0\rangle = (1, 0)^T$, $|1\rangle = (0, 1)^T$. Write out the
$4 \times 4$ matrix of the tensor product $X \otimes Z$, where $X$ is the
Pauli-$X$ matrix with rows $(0, 1)$ and $(1, 0)$, and $Z$ is the Pauli-$Z$
matrix with rows $(1, 0)$ and $(0, -1)$:

$$
X = \begin{pmatrix} 0 & 1 \\\\ 1 & 0 \end{pmatrix}, \qquad Z = \begin{pmatrix} 1 & 0 \\\\ 0 & -1 \end{pmatrix}.
$$

*Answer.*

$$
X \otimes Z = \begin{pmatrix}
0 & 0 & 1 & 0 \\\\
0 & 0 & 0 & -1 \\\\
1 & 0 & 0 & 0 \\\\
0 & -1 & 0 & 0
\end{pmatrix}.
$$

If you wrote the blocks $0 \cdot Z$ and $1 \cdot Z$ correctly along
the rows of $X$, you are set. If you got $Z \otimes X$ instead (a
common mix-up), reread the definition: in $A \otimes B$ the matrix
$A$ governs the *block* structure and $B$ governs the within-block
structure.

**Sample problem 1.3.4.** Compute the trace and determinant of
$A \otimes B$ when $A$ is $m \times m$ with $\mathrm{tr}(A) = a$ and
$\det(A) = \alpha$, and similarly $B$ is $n \times n$ with
$\mathrm{tr}(B) = b$, $\det(B) = \beta$.

*Answer.* $\mathrm{tr}(A \otimes B) = a\\, b$ and
$\det(A \otimes B) = \alpha^n \beta^m$. The trace identity falls out
of the block structure directly; the determinant identity is the
useful one to commit to memory.

**Sample problem 1.3.5.** A $4 \times 4$ matrix $M$ has rank $2$.
What is the dimension of its kernel? What can you say about the number
of nonzero singular values?

*Answer.* Kernel dimension $4 - 2 = 2$ by the rank-nullity theorem.
The number of nonzero singular values equals the rank, so $M$ has
exactly $2$ nonzero singular values.

If you struggled with any of these and want a full re-grounding,
Strang's *Introduction to Linear Algebra* is the standard
computational reference; Axler's *Linear Algebra Done Right* is the
better choice if you want the operator-theoretic flavor that quantum
mechanics actually uses (Axler delays determinants and emphasizes
eigenstructure of operators on inner-product spaces, which is exactly
what the postulates of quantum mechanics ask for).

---

### 1.3.1 Complex Numbers

Complex numbers are background to all of the above and deserve a
moment of their own. You should be fluent with:

- The Cartesian form $z = a + ib$ with $a, b \in \mathbb{R}$ and
  $i^2 = -1$; addition and multiplication; complex conjugation
  $\overline{z} = a - ib$; modulus $|z| = \sqrt{z \overline{z}}$.
- The polar form $z = r\\, e^{i\theta}$ with $r = |z| \ge 0$ and
  $\theta = \arg(z)$.
- Euler's identity $e^{i\theta} = \cos\theta + i\sin\theta$, and the
  geometric reading of multiplication by $e^{i\theta}$ as a rotation
  of the complex plane by angle $\theta$.
- Manipulation of complex exponentials: $e^{i\theta}\\, e^{i\phi} =
  e^{i(\theta + \phi)}$, $\overline{e^{i\theta}} = e^{-i\theta}$,
  $|e^{i\theta}| = 1$.

**Sample problem 1.3.6.** Simplify $(1 + i)^4$ using polar form.

*Answer.* $1 + i = \sqrt{2}\\, e^{i\pi/4}$, so
$(1 + i)^4 = (\sqrt{2})^4 e^{i\pi} = 4 \cdot (-1) = -4$.

**Sample problem 1.3.7.** Show that for any real $\theta$ the matrix

$$
R(\theta) = \begin{pmatrix} e^{i\theta} & 0 \\\\ 0 & e^{-i\theta} \end{pmatrix}
$$

is unitary, and compute its eigenvalues.

*Answer.* $R(\theta)^\dagger$ is the diagonal matrix with entries
$\overline{e^{i\theta}} = e^{-i\theta}$ and
$\overline{e^{-i\theta}} = e^{i\theta}$, i.e. $R(\theta)^\dagger =
R(-\theta)$, and $R(\theta) R(-\theta) = I$. Eigenvalues
$e^{\pm i\theta}$ are read off the diagonal.

---

## 1.4 Required: Probability and Basic Information Theory

Quantum measurement is fundamentally probabilistic, and a working
mental model of probability is non-negotiable. You should be at ease
with:

- **Random variables.** Discrete and continuous; probability mass and
  density functions; cumulative distribution functions.
- **Expectation and variance.** Linearity of expectation
  ($\mathbb{E}[aX + bY] = a\\,\mathbb{E}[X] + b\\,\mathbb{E}[Y]$
  regardless of independence), variance of a sum of independent
  variables, the variance identity
  $\mathrm{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$.
- **Conditional probability and Bayes' rule.**
  $P(A \mid B) = P(A \cap B) / P(B)$, and the Bayes inversion
  $P(A \mid B) = P(B \mid A)\\, P(A) / P(B)$.
- **Independence.** $P(A \cap B) = P(A)\\, P(B)$ for independent
  events; pairwise vs mutual independence.
- **Sampling and estimation.** What it means to draw $N$ independent
  samples from a distribution, how the empirical mean approaches the
  true mean (law of large numbers), and the rough rate
  ($\sim 1/\sqrt{N}$) given by the central limit theorem. Many
  quantum algorithms produce samples from a distribution defined by
  the circuit's amplitudes; getting the algorithm's actual answer
  means processing those samples.
- **Standard distributions** at a vocabulary level: Bernoulli,
  binomial, geometric, Poisson, uniform, Gaussian. You do not need
  density formulas memorized but should recognize each on sight.

Basic information theory — Shannon entropy
$H(p) = -\sum_i p_i \log p_i$ and the intuition that entropy measures
uncertainty in bits — is useful and recurs in the book (channel
capacity, Holevo bound, quantum source coding), but is not assumed.
The book reintroduces it where needed.

**Sample problem 1.4.1.** A biased coin shows heads with probability
$p$. Compute the mean and variance of the number of heads in $n$
independent tosses.

*Answer.* Mean $np$, variance $np(1 - p)$. This is the binomial
distribution; the variance is maximized at $p = 1/2$.

**Sample problem 1.4.2.** A diagnostic test has $99$ percent
sensitivity (probability of positive given disease) and $99$ percent
specificity (probability of negative given no disease). The disease
prevalence is $1$ in $10{,}000$. A randomly chosen person tests
positive. What is the probability they actually have the disease?

*Answer.* By Bayes,
$P(D \mid +) = \dfrac{0.99 \cdot 10^{-4}}{0.99 \cdot 10^{-4} + 0.01 \cdot (1 - 10^{-4})} \approx 0.0098$,
or roughly $1$ percent. The famous base-rate problem: a $99$ percent
accurate test on a rare condition is almost always wrong when it says
positive. If this is unfamiliar, work through it slowly — the same
inversion drives the analysis of every probabilistic quantum
subroutine.

**Sample problem 1.4.3.** You repeatedly sample a discrete
distribution $p$ on $\\{0, 1\\}^n$ defined implicitly by a quantum
circuit. After $N$ shots, you estimate the probability of outcome
$x$ as $\hat p_x = (\text{count of } x) / N$. What is the standard
deviation of $\hat p_x$ as a function of $N$, and how many shots are
needed for $\hat p_x$ to be accurate to within $\pm 0.01$ with high
confidence?

*Answer.* $\hat p_x$ is the sample mean of $N$ Bernoulli$(p_x)$
trials, so its standard deviation is $\sqrt{p_x (1 - p_x) / N} \le
1/(2\sqrt N)$. For $\pm 0.01$ accuracy you need roughly
$N \sim 10^4$ shots. The $1/\sqrt{N}$ shot-noise scaling is why
quantum-advantage algorithms that produce samples (rather than
single answers with high probability) need careful statistical
treatment.

The standard reference is Sheldon Ross's *A First Course in
Probability*. MIT 6.042 (the discrete mathematics and probability
course used at MIT) has free OCW lecture notes that cover everything
in this section and are sized for self-study. Either is fine.

---

## 1.5 Required: Complexity Basics

You should recognize the terms below at a vocabulary level; the book
does not assume you can construct reductions or prove hardness
results.

- **Asymptotic notation.** $O(\cdot)$, $\Omega(\cdot)$,
  $\Theta(\cdot)$, $o(\cdot)$. Big-O as an upper bound up to
  constants; the practical distinction between $O(n)$,
  $O(n \log n)$, $O(n^2)$, $O(2^n)$.
- **The classes P and NP.** P as polynomial-time decidable, NP as
  polynomial-time verifiable. NP-hardness and NP-completeness as
  informal "as hard as the hardest problem in NP." You should know
  that $\mathbf{P} \stackrel{?}{=} \mathbf{NP}$ is open and that
  basically nobody expects equality.
- **The polynomial hierarchy** at a name-recognition level:
  $\mathbf{\Sigma}_k^{\mathbf{P}}$, $\mathbf{\Pi}_k^{\mathbf{P}}$,
  $\mathbf{PH}$. The book uses these names mostly to give context
  for where quantum complexity classes sit relative to classical
  ones; you do not need to manipulate the hierarchy yourself.
- **The class BQP** (bounded-error quantum polynomial time) — this
  one the book defines from scratch in Chapter 17; recognition of the
  surrounding classical landscape is what helps.
- **Promise problems and oracle (black-box) complexity.** Many
  quantum speedups are stated in oracle models; familiarity with the
  concept ("the algorithm is charged for each query to a function it
  treats as a black box") avoids a recurring source of confusion.

A common misconception worth flagging now: a quantum computer is
**not** known or expected to solve NP-complete problems in polynomial
time. The famous quantum speedups (Shor, Grover, HHL) attack
different problems — factoring, unstructured search, certain linear
systems — and the relationship between BQP and NP is itself open.

**Sample problem 1.5.1.** Sort the following functions in order of
asymptotic growth: $n^{100}$, $2^n$, $n \log n$, $\log n$, $n!$,
$2^{\sqrt n}$.

*Answer.* $\log n \prec n \log n \prec n^{100} \prec 2^{\sqrt n}
\prec 2^n \prec n!$. The placement of $2^{\sqrt n}$ between
polynomial and exponential is the one most people get wrong; it is
sub-exponential but super-polynomial, which is exactly the regime of
the best known classical factoring algorithm (the general number
field sieve).

**Sample problem 1.5.2.** True or false: if a problem is in NP, then
a quantum computer can solve it in polynomial time.

*Answer.* False (or at least: not known to be true, and widely
believed false). $\mathbf{NP} \subseteq \mathbf{BQP}$ is open; no
proof or disproof is known, but the consensus is that BQP and NP are
incomparable.

If complexity theory is entirely new, Sipser's *Introduction to the
Theory of Computation* (Chapters 7–9) is the standard introduction.
For a quantum-focused refresher of just the classical classes, the
first chapter of Arora and Barak's *Computational Complexity* is more
than enough.

---

## 1.6 Recommended but Not Required

Three further areas help if you have them, but the book does not
assume any of them.

- **Classical physics.** A first course in undergraduate mechanics
  (Lagrangian / Hamiltonian formulations especially) makes Chapter 3
  (Physical Intuition) and Chapter 16 (Hamiltonian simulation) feel
  natural rather than novel. Electromagnetism at the level of
  Griffiths is helpful for the hardware chapters (Chapter 20 ff.)
  where superconducting qubits, ion traps, and photonic
  implementations get specific. None of this is on the critical path
  for the algorithmic chapters.
- **Differential equations and basic calculus.** Partial derivatives,
  the chain rule, and the function $e^x$ at the level of comfort
  with $\dfrac{d}{dt} e^{At} = A\\, e^{At}$ are useful background for
  the matrix exponential (§4.7) and for time evolution under a
  Hamiltonian (Chapter 5, Chapter 16). You should be able to compute
  $\dfrac{\partial}{\partial \theta}(\cos\theta + i\sin\theta)$
  without a reference. You do **not** need to have solved a PDE.
- **Group representation theory.** Background that makes the Pauli
  group, the Clifford group, the Heisenberg–Weyl group, and the
  hidden-subgroup framing of Shor's algorithm feel like instances of
  one thing. The book introduces what it needs and does not assume
  representation theory; if you happen to have it, several chapters
  will telescope.

The classical-physics background is the most useful of the three. If
you have a CS background and no physics background, do not worry —
the book stays self-contained, and the price is mostly that some
analogies (energy levels, harmonic oscillators, spin) will be
unfamiliar rather than reinforcing.

**Reference recap.** If you want a single shelf:

- Strang, *Introduction to Linear Algebra* — computational linear
  algebra.
- Axler, *Linear Algebra Done Right* — operator-theoretic linear
  algebra over $\mathbb{C}$.
- Ross, *A First Course in Probability* — undergraduate probability.
- MIT 6.042 OCW notes — discrete probability and combinatorics for
  self-study.
- Sipser, *Introduction to the Theory of Computation* — classical
  complexity (Chapters 7–9).
- Nielsen and Chuang, *Quantum Computation and Quantum Information*,
  Appendix A — a compressed math refresher in the conventions used
  by the quantum-computing literature; useful as a second opinion on
  the book's Chapter 4.

A simple decision rule. If you struggled with the linear-algebra
problems in §1.3, work through Strang or Axler **before** reading
Chapter 4. If you struggled with the probability problems in §1.4,
work through Ross or MIT 6.042 **before** reading Chapter 5. If you
struggled with the complexity problems in §1.5, the first chapter of
Arora and Barak is enough; the book carries you through anything
beyond that. If you struggled with the Python problems in §1.1, work
through the NumPy quickstart **before** reading Chapter 6.

---

## 1.7 Why DSP Helps

If you have a background in digital signal processing — discrete
Fourier transforms, sampling theorems, filters, convolutions — a
sizable fraction of the book will feel familiar. The quantum Fourier
transform (§4.13 and Chapter 14) is, structurally, an ordinary
discrete Fourier transform applied to an amplitude vector; phase
estimation (§14.6) is, structurally, frequency estimation of a
single complex exponential. The intuitions transfer almost without
modification: aliasing, windowing, the relationship between time
resolution and frequency resolution.

DSP is **not** a prerequisite. The book builds the Fourier machinery
it needs in §4.13 and Chapter 14 from the linear-algebra foundations
of §1.3, and treats the quantum Fourier transform as a unitary matrix
first and a frequency-domain transform second. But if you have ever
written code that does an FFT, the phase-estimation chapters will
land faster and the quantum-signal-processing material (Chapter 16)
will feel like a generalization of something you already know rather
than a new framework.

The reverse direction is also true: readers who learn quantum
computing first often report a clearer intuition for classical DSP
afterwards, particularly for the unitarity of the DFT and the
energy-conservation reading of Parseval's theorem.

---

[← Previous: Preface](00-preface.md) · [Table of Contents](../../README.md) · [Next: Notation and Conventions →](02-notation-and-conventions.md)
