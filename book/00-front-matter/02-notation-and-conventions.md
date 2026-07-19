# Notation and Conventions

> **Status:** prereviewed · **Phase:** 1 · **Sections drafted:** 7 / 7

[← Previous: Recommended / Assumed Background and Self-Check](01-background-and-self-check.md) · [Table of Contents](../../README.md) · [Next: Historical Prelude →](../part-00-historical-prelude/00-historical-prelude.md)

Quantum computing inherits notation from three different traditions —
linear algebra, theoretical physics, and theoretical computer science —
and they do not always agree. Bra-ket symbols collide with set-builder
braces; norm bars collide with the modulus of a scalar; bit-string
indexing collides with qubit-label indexing in every major SDK. This
chapter fixes the conventions used throughout the book in one place,
so the rest of the manuscript can lean on them without re-deriving
the disclaimers each time.

The conventions stated here are reiterated, in worked-out context, in
[§4.16 Conventions at a Glance](../part-02-formalism/04-mathematical-background.md#416-conventions-at-a-glance)
at the close of Chapter 4. A compact symbol lookup table with
section cross-references is collected in
[Appendix A](../99-back-matter/appendix-a-notation-reference.md), and
the standard gate matrices live in
[Appendix B](../99-back-matter/appendix-b-common-gates.md). This
chapter is the *forward-facing* statement of conventions for a reader
working linearly through the book; treat the appendices as the
reference and §4.16 as the in-context checklist.

> **How to read this chapter.** Skim it once now to catch the
> conventions that will look unfamiliar (qubit-label ordering, QFT
> sign, norm-bar bookkeeping, log base for entropy), and bookmark
> §N.3 (Dirac notation), §N.4 (tensor-product order), and §N.6
> (probability / measurement) for later reference. The Greek-letter
> conventions and circuit-symbol legend in §N.5 are worth a single
> read-through before the first circuit diagram appears in Chapter 6.
> Nothing here needs to be memorised — it just needs to be findable
> when a later formula does not type-check.

## N.1 Mathematical Notation

The book lives in finite-dimensional complex Hilbert spaces unless
explicitly stated otherwise. The default field of scalars is
$\mathbb{C}$, and the default state space on $n$ qubits is
$\mathbb{C}^{2^n}$ with the standard Hermitian inner product.
Infinite-dimensional considerations appear only at boundary problems
(bosonic modes, continuous-variable systems) and are flagged where
they enter.

**Number sets.**

- $\mathbb{N} = \\{0, 1, 2, \dots\\}$ — natural numbers, including
  zero. The book is zero-indexed by default; the rare one-indexed
  sum is called out at the place it appears.
- $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$ — integers,
  rationals, reals, complex numbers.
- $\mathbb{Z}_N = \\{0, 1, \dots, N-1\\}$ — integers modulo $N$.
  Appears in Shor's algorithm and in modular arithmetic on $n$-bit
  registers with $N = 2^n$.
- $\\{0, 1\\}^n$ — the set of all length-$n$ bit strings, of size
  $2^n$. The most common index set for computational-basis kets.

**Set-builder notation.** Standard: $\\{x \in S : P(x)\\}$ means the
elements of $S$ for which the predicate $P$ holds. Set braces are
written `\\{` and `\\}` in source — GitHub's Markdown processor
strips one backslash from `\{` before the math reaches the renderer
(Bug 1 in [`docs/github-markdown-math-bugs.md`](../../docs/github-markdown-math-bugs.md)).

**Common constants.** $\pi$ is the usual circle constant, $e$ is
Euler's number, $i = \sqrt{-1}$, and $\omega = e^{2\pi i / N}$ is a
primitive $N$-th root of unity (used in the Fourier transform of
§4.13). Planck's reduced constant $\hbar$ appears at the
quantum-mechanics boundary; algorithmic chapters set $\hbar = 1$ so
that the Schrödinger evolution reads $U(t) = e^{-iHt}$ with no
prefactor (here $H$ is the Hamiltonian, the energy operator formalised
in Chapter 5 — not the Hadamard gate $H$ of §N.2; context always
disambiguates the two).

**Asymptotic complexity.** The standard Knuth conventions, used both
classically and quantumly:

- $f(n) = O(g(n))$ — there exist constants $c, n_0$ with
  $|f(n)| \le c\\, g(n)$ for all $n \ge n_0$. An upper bound.
- $f(n) = \Omega(g(n))$ — there exist $c, n_0$ with
  $f(n) \ge c\\, g(n)$ eventually. A lower bound.
- $f(n) = \Theta(g(n))$ — both: $f$ is tight up to constants.
- $\tilde{O}(g(n))$ — soft-O, hiding polylogarithmic factors:
  $\tilde{O}(g) = O(g \cdot \mathrm{polylog}(g))$.
- $f(n) = o(g(n))$ and $f(n) = \omega(g(n))$ — strict little-o /
  little-omega forms, used only when the difference between
  big-O and little-o matters (rare).

Logarithms are base 2 by default — $\log n$ means $\log_2 n$ unless
otherwise stated. Natural logarithms are written $\ln n$. Entropy
sections use base 2 throughout, so entropies are measured in bits.

**Greek-letter conventions.** Greek letters carry a default role.
Pinning these defaults down once means a later formula like
$\alpha |0\rangle + \beta |1\rangle$ (ket notation — defined in §N.3
below) does not need to re-introduce its amplitudes:

- $\alpha, \beta, \gamma, \delta$ — complex amplitudes of a state.
- $\theta, \phi$ — Bloch-sphere angles (polar and azimuthal), and
  more generally rotation / phase angles.
- $\lambda, \mu$ — eigenvalues. $\lambda_i$ enumerates them.
- $\sigma$ — singular values, *and* Pauli operators when written as a
  vector $\sigma = (X, Y, Z)$ (matrices given in §N.2 below).
  Disambiguated by context.
- $\psi, \phi, \chi, \varphi$ — state vectors (kets and bras).
- $\rho, \sigma$ — density matrices (Chapter 5). The collision with
  singular values is named at the point of conflict.
- $\epsilon, \delta$ — error and failure-probability parameters
  ($\epsilon$ for additive error, $\delta$ for confidence
  $1 - \delta$).
- $\omega$ — primitive root of unity. (The same glyph appears as
  little-omega $\omega(g(n))$ in asymptotic notation above;
  as with $\sigma$, context disambiguates.)

## N.2 Matrix Notation

Matrices in this book act on column vectors from the left:
$v \mapsto A v$. Indices run from $0$ in code listings and from $1$
in displayed formulas, with $0$- vs $1$-indexing called out
explicitly when both conventions appear in the same passage.

**Standard operations.**

- $A^T$ — transpose. $(A^T)_{ij} = A_{ji}$.
- $\overline{A}$ — entry-wise complex conjugate.
- $A^\dagger = \overline{A}^T$ — **adjoint** (conjugate transpose).
  This is the operation that converts kets to bras and is the workhorse
  of quantum-mechanical algebra.
- $A^{-1}$ — inverse, when it exists.
- $\mathrm{tr}(A) = \sum_i A_{ii}$ — trace. Basis-independent; cyclic
  under products: $\mathrm{tr}(AB) = \mathrm{tr}(BA)$.
- $\det(A)$ — determinant. Basis-independent.
- $\mathrm{rank}(A)$ — rank, equivalently the number of nonzero
  singular values.
- $[A, B] = AB - BA$ — commutator. $A$ and $B$ commute iff
  $[A, B] = 0$.
- $\\{A, B\\} = AB + BA$ — anticommutator. Pauli operators
  anticommute pairwise: $\\{X, Y\\} = \\{Y, Z\\} = \\{X, Z\\} = 0$.
- $I$ (or $I^{\otimes n}$) — identity operator (on $n$ qubits, an
  $n$-fold tensor product of single-qubit identities; equivalently
  $I_{2^n}$ with the subscript as matrix dimension). This book avoids
  the bare form "$I_n$ = identity on $n$ qubits" precisely because
  most linear-algebra texts (and `np.eye(n)`) reserve the subscript
  for the $n \times n$ matrix dimension — check conventions before
  comparing with code.
- $A \succeq 0$ — $A$ is **positive semidefinite**: Hermitian with
  $\langle v | A | v\rangle \ge 0$ for all $v$. The shorthand
  $A \succeq B$ means $A - B \succeq 0$.

**Standard gates in the computational basis.** The single-qubit Pauli
matrices, the Hadamard, and the $S$ gate, written in the
$\\{|0\rangle, |1\rangle\\}$ basis:

$$
X = \begin{pmatrix} 0 & 1 \\\\ 1 & 0 \end{pmatrix}, \qquad
Y = \begin{pmatrix} 0 & -i \\\\ i & 0 \end{pmatrix}, \qquad
Z = \begin{pmatrix} 1 & 0 \\\\ 0 & -1 \end{pmatrix},
$$

$$
H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\\\ 1 & -1 \end{pmatrix},
\qquad
S = \begin{pmatrix} 1 & 0 \\\\ 0 & i \end{pmatrix},
\qquad
T = \begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\pi/4} \end{pmatrix}.
$$

The full gate catalogue with two-qubit gates, rotation families, and
their decompositions lives in
[Appendix B](../99-back-matter/appendix-b-common-gates.md).

**Norms and bars.** Five distinct symbols share two glyphs; mis-counting
the bars is the most common type-signature bug in quantum-mechanical
notation. The default norm without subscript is the 2-norm on vectors
and the operator (spectral) norm on operators:

- $|z|$ — modulus of a complex scalar $z$. Single bars; scalar
  argument; scalar value.
- $\\|v\\|$ — vector 2-norm: $\sqrt{\langle v, v\rangle}$. Double
  bars; vector argument; nonnegative real value.
- $\\|A\\|$ (or $\\|A\\|_{\mathrm{op}}$ when ambiguity threatens) —
  **operator (spectral) norm** of an operator $A$, equal to the
  largest singular value of $A$.
- $\\|A\\|_1 = \mathrm{tr}\sqrt{A^\dagger A} = \sum_i \sigma_i$ —
  **trace norm** (nuclear norm). Trace distance between density
  matrices is $D(\rho, \sigma) = \tfrac{1}{2}\\|\rho - \sigma\\|_1$.
- $\\|A\\|_{\mathrm{HS}} = \sqrt{\mathrm{tr}(A^\dagger A)}$ —
  **Hilbert–Schmidt** (Frobenius) norm. Induced by the
  Hilbert–Schmidt inner product
  $\langle A, B\rangle_{\mathrm{HS}} = \mathrm{tr}(A^\dagger B)$.
- $|A| = \sqrt{A^\dagger A}$ — **operator absolute value**, used in
  the polar decomposition $A = U_p\\, |A|$. Single bars but operator
  argument and operator value — *not a norm and not a scalar*.

Norm bars are written `\\|` in source. Inside Markdown table cells
the bar conflicts with the column separator (Bug 5 in the renderer
memo), which is why this chapter — and the Appendix A reference —
uses bullet lists instead of tables wherever norm bars or kets appear.

## N.3 Dirac Notation

The book uses raw `\langle` and `\rangle` for all bra-ket notation.
The `physics`-package macros `\ket`, `\bra`, `\braket` are *not* used
— GitHub's MathJax pipeline does not load the package, and the
manuscript needs to render natively in three pipelines (GitHub,
mdBook, Pandoc) without per-toolchain workarounds. STYLE.md is the
binding statement; this section is a reminder.

- $|\psi\rangle$ — **ket**: abstract state vector. After a basis is
  chosen, represented by an $n \times 1$ column of complex amplitudes.
  Written `|\psi\rangle` in source.
- $\langle\phi|$ — **bra**: the adjoint of $|\phi\rangle$, a
  $1 \times n$ row vector. Written `\langle\phi|` in source.
- $\langle\phi | \psi\rangle$ — **inner product**: a complex scalar.
  Conjugate-linear in the first argument, linear in the second
  (physicists' convention):

$$
\langle a\phi_1 + b\phi_2 \mid \psi\rangle = \overline{a}\\, \langle\phi_1|\psi\rangle + \overline{b}\\, \langle\phi_2|\psi\rangle.
$$

- $|\psi\rangle\langle\phi|$ — **outer product**: a rank-one operator
  with entries $\psi_i\\, \overline{\phi_j}$. Adjoint:
  $(|\psi\rangle\langle\phi|)^\dagger = |\phi\rangle\langle\psi|$.
- $\langle\phi | A | \psi\rangle$ — **matrix element** of $A$ between
  $|\phi\rangle$ and $|\psi\rangle$. A complex scalar.
- $\langle O\rangle_\psi = \langle\psi | O | \psi\rangle$ —
  **expectation value** of an observable $O$ in the normalised pure
  state $|\psi\rangle$. Real whenever $O = O^\dagger$.

**Single-qubit computational basis.** Column-vector form on
$\mathbb{C}^2$:

$$
|0\rangle = \begin{pmatrix} 1 \\\\ 0 \end{pmatrix}, \qquad
|1\rangle = \begin{pmatrix} 0 \\\\ 1 \end{pmatrix}.
$$

A generic single-qubit state is
$|\psi\rangle = \alpha |0\rangle + \beta |1\rangle$ with
$|\alpha|^2 + |\beta|^2 = 1$. Other named bases used throughout the
book:

- $|+\rangle = (|0\rangle + |1\rangle) / \sqrt{2}$,
  $|-\rangle = (|0\rangle - |1\rangle) / \sqrt{2}$ — **Hadamard
  basis** ($X$ eigenstates).
- $|+i\rangle = (|0\rangle + i|1\rangle) / \sqrt{2}$,
  $|-i\rangle = (|0\rangle - i|1\rangle) / \sqrt{2}$ — $Y$
  eigenstates.

**Resolution of the identity.** For any orthonormal basis
$\\{|i\rangle\\}$,

$$
I = \sum_i |i\rangle\langle i|.
$$

Inserting this identity into a matrix element expands it in the
chosen basis. This is the single most useful algebraic trick in the
bra-ket calculus and is used routinely throughout Parts 2–6.

The vertical bar inside a ket `|\psi\rangle` is syntactically distinct
from the modulus bar in $|z|$ and from the operator absolute value
$|A|$, even though the three look identical in source. Kets are
always paired with a closing `\rangle`; the closing delimiter is what
tells the *reader* which of the three is meant.

## N.4 Tensor Product Notation

Tensor-factor order is the single place where book formulas most
often disagree with code. The convention is fixed once here and
re-stated at every Qiskit comparison point in the book.

- $V \otimes W$ — tensor product of vector spaces, dimension
  $\dim V \cdot \dim W$.
- $u \otimes v$ — tensor product of vectors. On column vectors this
  is the **Kronecker product**.
- $A \otimes B$ — tensor product of operators. Acts as
  $(A \otimes B)(u \otimes v) = (A u) \otimes (B v)$.
- $|a\rangle \otimes |b\rangle = |a\rangle |b\rangle = |ab\rangle$ —
  three notations for the same product state, used interchangeably
  once subsystem order is fixed.
- $A^{\otimes n} = A \otimes A \otimes \cdots \otimes A$ ($n$ times)
  — $n$-fold tensor power.

**Bit-string order: leftmost is most significant.** A multi-qubit
computational-basis ket $|x_1 x_2 \cdots x_n\rangle$ is read with
$x_1$ as the *most significant* bit:

$$
|x_1 x_2 \cdots x_n\rangle = |x_1\rangle \otimes |x_2\rangle \otimes \cdots \otimes |x_n\rangle,
$$

and the zero-based statevector index is

$$
\mathrm{idx}(x_1 x_2 \cdots x_n) = \sum_{i=1}^{n} x_i\\, 2^{n - i}.
$$

So $|01\rangle$ on two qubits means $x_1 = 0$, $x_2 = 1$, lives at
statevector index $1$, and equals the column vector
$(0, 1, 0, 0)^T$. The convention is established in §4.2 and reiterated
in §4.8 and §4.16 of Chapter 4.

**Qiskit endian warning.** Qiskit prints bit strings and indexes the
statevector with qubit $0$ as the *least* significant bit — the
opposite of this book. To match the book's tensor-product order
against a Qiskit statevector without inserting permutations, map the
book's *leftmost* tensor factor to Qiskit's *highest-numbered* qubit
label. The full reconciliation rules and the four distinct Qiskit
ordering conventions are detailed in
[§4.8](../part-02-formalism/04-mathematical-background.md#48-tensor-products).

**Useful identities.**

- $(A \otimes B)(C \otimes D) = (AC) \otimes (BD)$
- $(A \otimes B)^\dagger = A^\dagger \otimes B^\dagger$
- $\mathrm{tr}(A \otimes B) = \mathrm{tr}(A)\\, \mathrm{tr}(B)$
- $\langle u_1 \otimes v_1, u_2 \otimes v_2\rangle = \langle u_1, u_2\rangle\\, \langle v_1, v_2\rangle$,
  so $\\|u \otimes v\\| = \\|u\\|\\, \\|v\\|$.
- $\mathrm{tr}_W(A \otimes B) = A\\, \mathrm{tr}(B)$ — **partial
  trace** over subsystem $W$, extended linearly to general bipartite
  operators. Produces the reduced density matrix of the remaining
  subsystem (Chapter 5).

## N.5 Circuit Notation

Circuit drawing conventions are introduced in Chapter 6 and used
throughout Parts 3–6. The diagram conventions are uniform across
the book:

- **Time runs left to right.** A qubit's history is read from its
  leftmost endpoint (preparation) to its rightmost endpoint
  (measurement or output).
- **Qubits are numbered $0$ through $n-1$, top to bottom.** Qubit
  $0$ is the top wire; qubit $n-1$ is the bottom wire. This is a
  drawing convention only — it does *not* automatically pin down the
  bit-string ordering, which is the separate convention fixed in
  §N.4.
- **Single-qubit gates** are boxed letters: $X$, $Y$, $Z$, $H$, $S$,
  $T$, and the rotation families $R_x(\theta)$, $R_y(\theta)$,
  $R_z(\theta)$, $P(\theta)$.
- **Controls.** A filled circle $\bullet$ on a wire is a **positive
  control** — the gate fires when that wire is $|1\rangle$. An open
  circle $\circ$ is an **anti-control** — fires when the wire is
  $|0\rangle$. The control symbol is connected to its target by a
  vertical line.
- **Target.** The target of a controlled-$X$ is drawn as $\oplus$
  (circled-plus). Other controlled gates are drawn as boxed letters
  with the control line entering the box.
- **SWAP** is drawn as two $\times$ symbols connected by a vertical
  line.
- **Measurement** is a meter symbol on a wire. The classical bit it
  produces continues as a double-line wire downstream.
- **Initial state.** A label $|0\rangle$ at the start of a wire means
  the qubit is prepared in the computational $|0\rangle$ state at
  the beginning of the circuit. Unlabelled wires default to
  $|0\rangle$ unless the surrounding prose says otherwise.

**Symbols used in prose.** The most common controlled gates have
explicit symbolic names:

- $\mathrm{CNOT} = |0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes X$
  — controlled-NOT with the first qubit as control. Also written
  $\mathrm{CX}$.
- $\mathrm{CZ} = |0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes Z$
  — controlled-$Z$. Symmetric in its two qubits.
- $\mathrm{C}U$ — generic controlled-$U$. Multi-controlled forms are
  written $\mathrm{C}^k U$ (the gate fires when all $k$ controls are
  $|1\rangle$).
- $F_N$ — the **quantum Fourier transform** on $N = 2^n$ dimensions.
  The book uses the negative-exponent convention,
  $F_N |j\rangle = N^{-1/2} \sum_k \omega^{-jk} |k\rangle$ with
  $\omega = e^{2\pi i / N}$, the "QFT-sign-minus" convention
  established in §4.13. Sign conventions vary across sources and
  SDKs, so a transform copied across the convention boundary needs
  its phase angles conjugated; the consequences for phase-estimation
  readout are spelled out at
  [§4.13](../part-02-formalism/04-mathematical-background.md#413-fourier-transform-basics).
- $U^\dagger$ as a circuit block — the inverse of a unitary gate
  $U$, drawn as $U$ with a dagger superscript or as a box labelled
  $U^{-1}$.

## N.6 Probability and Measurement Notation

Discrete distributions are the default for this section; continuous
and quantum extensions are introduced at their points of first use.

**Classical probability.**

- $P(A)$ — probability of an event $A$ on a discrete sample space.
- $p(x)$ or $p_x$ — probability mass at the outcome $x$ under a
  discrete distribution. Nonnegative, $\sum_x p(x) = 1$.
- $p_i$ — distribution masses indexed by a finite or countable label
  $i$.
- $p(x, y)$ — joint distribution.
- $p(y \mid x) = p(x, y) / p(x)$ — conditional, defined when
  $p(x) > 0$.
- $X \perp Y$ — independence: $p(x, y) = p(x)\\, p(y)$.
- $\mathbb{E}[g] = \sum_i p_i\\, g(x_i)$ — expectation.
- $\mathrm{Var}[g] = \mathbb{E}[g^2] - \mathbb{E}[g]^2$ — variance.
- $H(p) = -\sum_i p_i \log_2 p_i$ — **Shannon entropy** in bits.
  Convention: $0 \log 0 = 0$.

**Quantum measurement.** Projective measurement of a Hermitian
observable $O$ with spectral decomposition $O = \sum_\lambda \lambda\\, P_\lambda$:

- $P_\lambda$ — orthogonal projector onto the $\lambda$-eigenspace
  of $O$. Hermitian and idempotent. In the projective-measurement
  picture, "projector" always means orthogonal projector unless
  stated otherwise.
- $p(\lambda) = \langle\psi | P_\lambda | \psi\rangle$ — **Born
  rule** probability of outcome $\lambda$ on a normalised pure
  state $|\psi\rangle$.
- $P_\lambda |\psi\rangle / \sqrt{p(\lambda)}$ — post-measurement
  state, defined when $p(\lambda) > 0$.
- $p_i = |\langle b_i | \psi\rangle|^2$ — rank-one Born rule for
  projective measurement in a nondegenerate orthonormal basis
  $\\{|b_i\rangle\\}$.
- $\rho$ — density matrix: positive semidefinite with
  $\mathrm{tr}(\rho) = 1$.
- $\langle O\rangle_\rho = \mathrm{tr}(\rho\\, O)$ — expectation
  value for a density matrix.
- $\\{E_i\\}$ with $E_i \succeq 0$ and $\sum_i E_i = I$ — **POVM**
  (positive operator-valued measure). Outcome probability is
  $p_i = \mathrm{tr}(\rho\\, E_i)$ (developed in Chapter 11).

Measurement in the computational basis is the default for any
register; a unitary $U^\dagger$ applied just before measurement
implements measurement in the basis whose elements are the columns
of $U$.

## N.7 Boxed Callouts, Cross-References, and Source Conventions

**Status block.** Every chapter file begins with a blockquoted
status line directly after its top-level heading:

```text
> **Status:** *state* · **Phase:** N · **Sections drafted:** k / M
```

States in order of completeness:
`stub` → `outlined` → `draft` → `reviewed` → `final`. The block is
parsed by `scripts/generate_progress.py` to regenerate `PROGRESS.md`;
the form above — with ` · ` (middle-dot) separators — is the convention;
the parser tolerates other whitespace, but the convention keeps file
diffs readable.

**Boxed callouts.** Definitions, theorems, asides, and reader-facing
notes are written as Markdown blockquotes (lines beginning with `>`).
A typical definition reads:

> **Definition (unitary).** A linear operator $U$ on a finite-
> dimensional Hilbert space is *unitary* iff $U^\dagger U = I$.

"How to read" callouts at the top of long chapters use the same
blockquote form, prefixed by **How to read this chapter.** as in
this chapter's own opening callout.

**Cross-references.**

- *Sections*: refer to a section as `§X.Y` (for example, §4.16). In
  prose the section number is preferred over the heading text, so
  re-titled sections do not break the reference's plain-English
  meaning.
- *Chapters*: "Chapter N" is the textual reference; a relative
  Markdown link to the chapter file is added on first mention per
  chapter.
- *Appendices*: "Appendix L" (uppercase letter), with a relative
  link to the appendix file on first mention.
- *Equations* are not numbered as a global system. When a formula
  needs to be referred to from later prose, it is given an inline
  tag at the end of the display, written as `\quad (1.3.1)` in
  source.

**Code blocks.** Triple backticks with a language tag —
` ```python `, ` ```qasm `, ` ```text ` — for executable or
parseable code; ` ```text ` for shell transcripts and pseudocode
without a tighter dialect.

**Forbidden / discouraged source patterns.** The lint catches the
machine-detectable failures; the rest of this list is conventional:

- Do not use `\ket{...}`, `\bra{...}`, `\braket{...}{...}` — the
  `physics` package is not loaded on GitHub. Write
  `|\psi\rangle`, `\langle\phi|`, `\langle\phi | \psi\rangle`.
- Do not use `\begin{...} ... \end{...}` inside `$...$` inline math
  — GitHub's inline parser drops out of math mode at `\begin{`
  (Bug 2 in the renderer memo). Promote to display math on its own
  paragraph instead.
- Do not put kets, bras, or norm bars inside Markdown table cells —
  the `|` collides with the column separator (Bug 5). Use bullet
  lists, as this chapter does.
- Do not use `\label{}`, `\ref{}`, `\tag{}`, or `\newcommand{}` —
  cross-file macros do not survive GitHub's renderer.
- Do not use `\operatorname{...}` — GitHub's MathJax rejects it as
  "macro is not allowed". Use `\mathrm{...}` instead.
- Source-level escaping for the GitHub renderer:
  - Matrix row breaks: write `\\\\` in source (single `\\` collapses).
  - Set braces: write `\\{` and `\\}` (single `\{` becomes invisible).
  - Thin space: write `\\,` (single `\,` renders as a literal comma).
  - Norm bar: write `\\|` (single `\|` collapses to a modulus bar).
- Inside math, LaTeX commands keep their single backslash:
  `\sum`, `\int`, `\langle`, `\rangle`, `\otimes`, `\dagger`,
  `\sqrt`, `\mathrm`, etc.
- The percent sign `%` and hash `#` outside of math are written as
  literal characters; inside math, prefer prose ("percent",
  "modulo") to avoid renderer ambiguity.

The lint rules in `tools/lint.py` enforce the source-detectable items
above on every commit — the `physics`-package macro ban, the
inline-`pmatrix` check, the escaping rules, link integrity, and
forbidden mentions. The conventional items not mechanically enforced
(cross-reference style, avoiding kets in tables, the `%` / `#` notes
above) are matters of editorial discipline and are checked at review time.

---

[← Previous: Recommended / Assumed Background and Self-Check](01-background-and-self-check.md) · [Table of Contents](../../README.md) · [Next: Historical Prelude →](../part-00-historical-prelude/00-historical-prelude.md)
