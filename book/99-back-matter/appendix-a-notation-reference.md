# Appendix A. Notation Reference

> **Status:** prereviewed · **Phase:** 1 · **Sections drafted:** 6 / 6

[← Previous: Chapter 37](../part-13-perspective-and-direction/37-endgame.md) · [Table of Contents](../../README.md) · [Next: Appendix B. Common Gates and Their Matrices →](appendix-b-common-gates.md)

This appendix is a lookup table for the symbols used throughout the book.
Entries are short by design: each one names a symbol, gives its definition
in compact form, and points to the chapter section where the convention
is established. For the consolidated convention checklist (inner product,
bit ordering, QFT sign, projector defaults, log base), see
[§4.16 Conventions at a Glance](../part-02-formalism/04-mathematical-background.md#416-conventions-at-a-glance).

The format favours bullet lists over Markdown tables because most of
these symbols contain literal `|` characters (kets, bras, norm bars),
and `|` is the Markdown table column separator — putting kets inside a
table cell silently collapses the bars (Bug 5 in
[`docs/github-markdown-math-bugs.md`](../../docs/github-markdown-math-bugs.md)).
The same precedent is set in §4.12 and §4.16 of Chapter 4.

## A.1 Dirac Notation

Established in [§4.12](../part-02-formalism/04-mathematical-background.md#412-dirac-notation).
All math is written with raw `\langle` and `\rangle`; the `physics`-package
macros `\ket`, `\bra`, `\braket` are not used.

- $|\psi\rangle$ — **ket**, an abstract state vector. After choosing a
  basis it is represented by an $n \times 1$ column of complex amplitudes.
- $\langle\phi|$ — **bra**, the adjoint of $|\phi\rangle$, a $1 \times n$
  row vector. The bra map is *anti-linear*:
  $\langle a\phi + b\chi | = \overline{a}\langle\phi| + \overline{b}\langle\chi|$.
- $\langle\phi|\psi\rangle$ — **inner product**, the scalar
  $\sum_i \overline{\phi_i}\\, \psi_i$. Conjugate-linear in the first
  argument; linear in the second ([§4.3](../part-02-formalism/04-mathematical-background.md#43-inner-products-norms-and-orthonormal-bases)).
- $|\psi\rangle\langle\phi|$ — **outer product**, the rank-one matrix
  with entries $\psi_i\\, \overline{\phi_j}$. Adjoint:
  $(|\psi\rangle\langle\phi|)^\dagger = |\phi\rangle\langle\psi|$.
- $|\psi\rangle\langle\psi|$ — **rank-one projector** when
  $|\psi\rangle$ is normalized; equivalently the pure-state density
  matrix of $|\psi\rangle$.
- $\langle\phi|A|\psi\rangle$ — **matrix element** of $A$ between
  $|\phi\rangle$ and $|\psi\rangle$. A scalar.
- $\langle O\rangle_\psi = \langle\psi|O|\psi\rangle$ — **expectation
  value** of an observable $O$ in the normalized pure state
  $|\psi\rangle$. Real when $O$ is Hermitian.
- $I = \sum_i |i\rangle\langle i|$ — **resolution of the identity** in
  the orthonormal basis $\\{|i\rangle\\}$. The single most useful
  algebraic trick in bra-ket manipulation: insert it anywhere to expand
  in that basis.
- $|0\rangle, |1\rangle$ — single-qubit **computational basis** kets.
  Column vectors:

$$
|0\rangle = \begin{pmatrix} 1 \\\\ 0 \end{pmatrix}, \qquad
|1\rangle = \begin{pmatrix} 0 \\\\ 1 \end{pmatrix}.
$$

- $|+\rangle = (|0\rangle + |1\rangle)/\sqrt{2}$,
  $|-\rangle = (|0\rangle - |1\rangle)/\sqrt{2}$ — **Hadamard basis**.
- $|x\rangle$ for $x \in \\{0,1\\}^n$ — **computational-basis ket** on
  $n$ qubits. Throughout this book $x = x_1 x_2 \cdots x_n$ is read with
  $x_1$ as the most significant bit, so $|x\rangle$ sits at zero-based
  statevector index $\sum_{i=1}^n x_i\\, 2^{n-i}$
  ([§4.2](../part-02-formalism/04-mathematical-background.md#42-vector-spaces)).
  Qiskit's printed bit strings and amplitude indices use a different
  qubit-label-to-bit mapping; see [§4.8](../part-02-formalism/04-mathematical-background.md#48-tensor-products).
- $|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt{2}$ — the **Bell
  state**, the canonical two-qubit entangled pure state.

A vertical bar inside a ket `|\psi\rangle` is syntactically distinct
from the modulus bars in $|z|$ and the operator absolute value $|A|$,
even though all three look the same in source. Kets are always paired
with a closing `\rangle`.

## A.2 Matrix Notation

Established in [§4.3](../part-02-formalism/04-mathematical-background.md#43-inner-products-norms-and-orthonormal-bases)
(norm notation) and [§4.4](../part-02-formalism/04-mathematical-background.md#44-matrices-and-linear-operators)
(operator algebra). The norm symbols are reused for six distinct roles
— get the bar count right or the type signature lies.

- $A^\dagger$ — **adjoint** (conjugate transpose):
  $(A^\dagger)_{ij} = \overline{A_{ji}}$. Defining identity:
  $\langle u, A v\rangle = \langle A^\dagger u, v\rangle$.
- $A^T$ — **transpose** (no conjugation). Rarely needed on its own in
  this book; $A^\dagger$ does most of the work.
- $\overline{A}$ — entry-wise **complex conjugate** of $A$. Then
  $A^\dagger = \overline{A^T} = \overline{A}^T$.
- $A^{-1}$ — **inverse**, when it exists.
- $\mathrm{tr}(A) = \sum_i A_{ii}$ — **trace**. Basis-independent;
  cyclic: $\mathrm{tr}(AB) = \mathrm{tr}(BA)$.
- $\det(A)$ — **determinant**. Basis-independent.
- $\mathrm{rank}(A)$ — **rank**: the number of nonzero singular values
  ([§4.9](../part-02-formalism/04-mathematical-background.md#49-singular-values-and-the-singular-value-decomposition)).
- $[A, B] = AB - BA$ — **commutator**. Operators commute when
  $[A, B] = 0$ ([§4.5](../part-02-formalism/04-mathematical-background.md#45-hermitian-unitary-normal-and-positive-operators)).
- $I$ or $I^{\otimes n}$ — **identity operator** (the $n$-qubit identity;
  equivalently $I_{2^n}$, subscript as matrix dimension — the bare
  "$I_n$ for $n$ qubits" form is avoided, since linear-algebra texts
  reserve the subscript for dimension).
- $A \succeq 0$ — **positive semidefinite**: $A^\dagger = A$ and
  $\langle v|A|v\rangle \ge 0$ for all $v$ ([§4.5](../part-02-formalism/04-mathematical-background.md#45-hermitian-unitary-normal-and-positive-operators)).
- $A \succeq B$ — shorthand for $A - B \succeq 0$.

**Norm and modulus bars** — six distinct symbols share two glyphs.
Mis-counting the bars is the most common type-signature bug in this
notation:

- $|z|$ — **scalar modulus** of a complex number $z$. Single bars,
  scalar argument, scalar value.
- $\\|v\\|$ — **vector 2-norm**, $\sqrt{\langle v, v\rangle}$. Double
  bars, vector argument, nonnegative real value.
- $\\|A\\|$ (or $\\|A\\|_{\mathrm{op}}$ when ambiguity threatens) —
  **operator norm** (spectral norm): the largest singular value of $A$.
  Double bars, operator argument, nonnegative real value.
- $\\|A\\|_1 = \mathrm{tr}\sqrt{A^\dagger A} = \sum_i \sigma_i$ —
  **trace norm** (nuclear norm). The basis for trace distance between
  density matrices, $D(\rho, \sigma) = \tfrac{1}{2}\\|\rho - \sigma\\|_1$
  (glossed in §A.4 below).
- $\\|A\\|_{\mathrm{HS}} = \sqrt{\mathrm{tr}(A^\dagger A)}$ —
  **Hilbert–Schmidt norm** (Frobenius norm). Induced by the
  Hilbert–Schmidt inner product $\langle A, B\rangle_{\mathrm{HS}} = \mathrm{tr}(A^\dagger B)$.
- $|A| = \sqrt{A^\dagger A}$ — **operator absolute value**, used in
  the polar decomposition $A = U_p\\, |A|$. Single bars, operator
  argument, operator value — *not a scalar*, and *not a norm*.

**Common $2 \times 2$ matrices** — the Pauli, Hadamard, and phase gates
in their standard form ([§4.5](../part-02-formalism/04-mathematical-background.md#45-hermitian-unitary-normal-and-positive-operators)):

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

The full gate catalogue lives in Appendix B.

**Spectral decomposition.** For a normal operator $A$ with distinct
spectral values $\lambda_1, \dots, \lambda_k$ and orthogonal projectors
$P_i$ onto the eigenspaces:

$$
A = \sum_{i=1}^k \lambda_i\\, P_i, \qquad \sum_i P_i = I, \qquad P_i P_j = \delta_{ij}\\, P_i.
$$

Function of a normal operator: $f(A) = \sum_i f(\lambda_i)\\, P_i$
([§4.7](../part-02-formalism/04-mathematical-background.md#47-spectral-decomposition)).
The matrix exponential $e^{A} = \sum_i e^{\lambda_i}\\, P_i$ is the
specialization used for time evolution $U(t) = e^{-iHt}$ (algorithmic
chapters set $\hbar = 1$).

**Singular value decomposition.** For any $A \in \mathbb{C}^{m \times n}$:

$$
A = U\\, \Sigma\\, V^\dagger,
$$

with $U, V$ unitary and $\Sigma$ diagonal with entries
$\sigma_1 \ge \sigma_2 \ge \cdots \ge 0$ — the **singular values** of $A$
([§4.9](../part-02-formalism/04-mathematical-background.md#49-singular-values-and-the-singular-value-decomposition)).
The condition number is $\kappa(A) = \sigma_{\max}/\sigma_{\min}$.

## A.3 Tensor Product Notation

Established in [§4.8](../part-02-formalism/04-mathematical-background.md#48-tensor-products).
Tensor-factor order is the place where book formulas most often disagree
with code; the convention is fixed once here.

- $V \otimes W$ — **tensor product** of vector spaces. Has dimension
  $\dim V \cdot \dim W$.
- $u \otimes v$ — tensor product of vectors. For column vectors this
  is the **Kronecker product**: if $u = (u_1, u_2)^T$ and $v = (v_1, v_2)^T$
  then $u \otimes v = (u_1 v_1,\\, u_1 v_2,\\, u_2 v_1,\\, u_2 v_2)^T$.
- $A \otimes B$ — tensor product of operators. Acts as
  $(A \otimes B)(u \otimes v) = (A u) \otimes (B v)$, with matrix form

$$
A \otimes B = \begin{pmatrix} A_{11} B & A_{12} B & \cdots \\\\ A_{21} B & A_{22} B & \cdots \\\\ \vdots & & \ddots \end{pmatrix}.
$$

- $|a\rangle \otimes |b\rangle = |a\rangle|b\rangle = |ab\rangle$ —
  three notations for the same product state, used interchangeably
  once the subsystem order is fixed.
- $|x_1 x_2 \cdots x_n\rangle = |x_1\rangle |x_2\rangle \cdots |x_n\rangle$
  — **tensor-product order** in this book. $x_1$ is the most significant
  bit and the leftmost tensor factor.
- $A^{\otimes n} = A \otimes A \otimes \cdots \otimes A$ ($n$ times) —
  $n$-fold tensor power. $H^{\otimes n}$ on $|0\rangle^{\otimes n}$
  produces the uniform superposition over $\\{0,1\\}^n$.
- $\mathrm{tr}_W$ — **partial trace** over subsystem $W$. On a product
  operator, $\mathrm{tr}_W(A \otimes B) = A\\, \mathrm{tr}(B)$; extended
  linearly to general bipartite operators. Produces the **reduced
  density matrix** of the remaining subsystem (Chapter 5).

Useful identities:

- $(A \otimes B)(C \otimes D) = (AC) \otimes (BD)$
- $(A \otimes B)^\dagger = A^\dagger \otimes B^\dagger$
- $\mathrm{tr}(A \otimes B) = \mathrm{tr}(A)\\, \mathrm{tr}(B)$
- $\langle u_1 \otimes v_1,\\, u_2 \otimes v_2\rangle = \langle u_1, u_2\rangle\\, \langle v_1, v_2\rangle$, so $\\|u \otimes v\\| = \\|u\\|\\, \\|v\\|$.

**Qiskit endian warning** (restated here for self-containment; see also
§A.1 and §A.5). Qiskit is little-endian: qubit `0` is the
*least* significant bit in printed bit strings and statevector
indices. To match this book's tensor-product order with a Qiskit
statevector index without inserting any permutation, map the
*leftmost* tensor factor to Qiskit's *highest-numbered* qubit label.
Otherwise insert an explicit SWAP layer. The four distinct Qiskit
ordering conventions (circuit-diagram order, integer-interpretation
order, printed-string order, statevector-index order) and the rule of
thumb for reconciling them are detailed in
[§4.8](../part-02-formalism/04-mathematical-background.md#48-tensor-products).

## A.4 Measurement Notation

Established in [§4.6](../part-02-formalism/04-mathematical-background.md#46-eigenvalues-and-eigenvectors)
(projective measurement) and previewed in
[§4.5](../part-02-formalism/04-mathematical-background.md#45-hermitian-unitary-normal-and-positive-operators)
(observables). POVMs and generalized measurements are developed in
Chapters 11–12.

- $O$ or $A$ — a **Hermitian observable**. Possible measurement
  outcomes are its eigenvalues; the projector formalism uses the
  spectral decomposition of $O$.
- $P_\lambda$ — **projector onto the $\lambda$-eigenspace** of an
  observable $O$. Hermitian and idempotent: $P_\lambda^\dagger = P_\lambda$
  and $P_\lambda^2 = P_\lambda$. In this book "projector" in a
  measurement context always means an *orthogonal* projector unless
  explicitly stated otherwise.
- $p(\lambda) = \langle\psi|P_\lambda|\psi\rangle$ — **Born rule
  probability** of outcome $\lambda$ on a normalized pure state
  $|\psi\rangle$.
- $P_\lambda|\psi\rangle / \sqrt{\langle\psi|P_\lambda|\psi\rangle}$ —
  **post-measurement state** conditioned on outcome $\lambda$ having
  occurred (defined only when $p(\lambda) > 0$).
- $p_i = |\langle b_i|\psi\rangle|^2$ — **rank-one Born rule** for
  projective measurement in a nondegenerate orthonormal basis
  $\\{|b_i\rangle\\}$. The post-measurement state is $|b_i\rangle$ up
  to global phase.
- $\langle O\rangle_\psi = \langle\psi|O|\psi\rangle$ — **expectation
  value** of $O$ in the pure state $|\psi\rangle$.
- $\langle O\rangle_\rho = \mathrm{tr}(\rho\\, O)$ — **expectation
  value** for a density matrix $\rho$. (Density matrices: Chapter 5.)
- $\rho$ — **density matrix** of a (possibly mixed) state: positive
  semidefinite with $\mathrm{tr}(\rho) = 1$.
- $\\{E_i\\}$ with $E_i \succeq 0$, $\sum_i E_i = I$ — **POVM**
  (positive operator-valued measure). Outcome probability is
  $p_i = \mathrm{tr}(\rho\\, E_i)$ on state $\rho$. (Chapter 11.)
- $D(\rho, \sigma) = \tfrac{1}{2}\\|\rho - \sigma\\|_1$ — **trace
  distance** between density matrices. Determines the optimal
  equal-prior discrimination success probability.
- $F(\rho, \sigma) = \mathrm{tr}\\,\sqrt{\sqrt{\rho}\\,\sigma\\,\sqrt{\rho}}$ —
  **fidelity** between density matrices, in this book's convention:
  the **unsquared** (square-root) form, so $F \in [0, 1]$ and
  $F(|\psi\rangle, |\phi\rangle) = |\langle\psi|\phi\rangle|$ on pure
  states. (Some sources square this quantity and call *that* the
  fidelity; §12.7 fixes the choice.)

Shorthand: measurement of the **computational basis** on a register is
the default; a basis change unitary $U^\dagger$ applied before the
measurement implements measurement in the basis whose elements are the
columns of $U$ (active-versus-passive distinction in
[§4.10](../part-02-formalism/04-mathematical-background.md#410-change-of-basis)).

## A.5 Circuit Symbols

Circuit drawing conventions are introduced in Chapter 6 and used
throughout Parts 3–6 of the book. This entry catalogues the symbols
used in prose and inline math; the rendered diagrams themselves live
as SVGs alongside the chapters that use them.

- $|\psi\rangle$ on a **wire** — a qubit register carrying the state
  $|\psi\rangle$ left-to-right in time. Time flows left to right in
  every diagram in this book.
- Single-qubit gates — boxed letters: $X$, $Y$, $Z$, $H$, $S$, $T$,
  $R_x(\theta)$, $R_y(\theta)$, $R_z(\theta)$, $P(\theta)$.
- $R_n(\theta) = e^{-i\theta n \cdot \sigma / 2}$ — **single-qubit
  rotation** by angle $\theta$ about axis $n$, with
  $\sigma = (X, Y, Z)$. The $-i\theta/2$ convention is standard;
  $R_z(\theta)$ acts as $\mathrm{diag}(e^{-i\theta/2}, e^{i\theta/2})$.
- $\bullet$ on a wire — **control**: gate fires when this qubit is
  $|1\rangle$.
- Open circle $\circ$ on a wire — **anti-control**: gate fires when
  this qubit is $|0\rangle$. Equivalent to $X$ on the control followed
  by a standard control followed by $X$.
- $\mathrm{CNOT} = |0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes X$
  — **controlled-NOT** with the first qubit as control, second as
  target (under this book's tensor-product order). Sometimes written
  $\mathrm{CX}$ or $\mathrm{C}\text{-}X$.
- $\mathrm{CZ} = |0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes Z$
  — **controlled-Z**. Symmetric in its two qubits.
- $\mathrm{C}U$ — **controlled-$U$**, gate $U$ applied to the target
  when control is $|1\rangle$. Generalises to multi-controlled $\mathrm{C}^k U$.
- $\mathrm{SWAP}$ — swap of two qubits;
  $\mathrm{SWAP}|a, b\rangle = |b, a\rangle$.
- $\times$ on two wires connected by a vertical line — **SWAP** in
  diagrams.
- Meter symbol on a wire — **measurement** in the computational basis.
  Output is a classical bit (a double-line wire downstream).
- Double-line wires — **classical** registers downstream of a meter.
- $|0\rangle$ at the start of a wire — qubit prepared in the
  computational $|0\rangle$ state at the beginning of the circuit.
- $F_N$ — **quantum Fourier transform** on $N = 2^n$ dimensions, in
  this book's QFT-sign-minus convention
  ([§4.13](../part-02-formalism/04-mathematical-background.md#413-fourier-transform-basics)):

$$
F_N|j\rangle = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} \omega^{-jk}\\, |k\rangle,
\qquad \omega = e^{2\pi i / N}.
$$

Qiskit's current `QFTGate` implements the opposite, positive-exponent
sign and therefore corresponds to the *inverse* of this book's $F_N$.

- $U^\dagger$ as a circuit block — the **inverse** of a gate $U$.
  Drawn as $U$ with a dagger superscript or with the box labelled
  $U^{-1}$.

## A.6 Common Probability Notation

Established in [§4.14](../part-02-formalism/04-mathematical-background.md#414-probability-and-information-theory-refresher).
Discrete distributions only in this appendix; continuous and quantum
extensions are flagged at their introductions.

- $p(x)$ — **probability** of outcome $x$ under a discrete
  distribution. Nonnegative, normalized $\sum_x p(x) = 1$.
- $p(x, y)$ — **joint distribution** of $(X, Y)$.
- $p(x)$ from a joint — **marginal**: $p(x) = \sum_y p(x, y)$.
- $p(y \mid x) = p(x, y) / p(x)$ — **conditional**, defined when
  $p(x) > 0$.
- $X \perp Y$ — **independence**: $p(x, y) = p(x)\\, p(y)$ for all
  $x, y$.
- $\mathbb{E}[g] = \sum_i p(x_i)\\, g(x_i)$ — **expectation** of a
  real-valued function $g$.
- $\mathrm{Var}[g] = \mathbb{E}[g^2] - \mathbb{E}[g]^2$ — **variance**.
- $H(p) = -\sum_i p(x_i) \log_2 p(x_i)$ — **Shannon entropy**, in
  bits. Convention: $0 \log 0 = 0$. Range: $0 \le H(p) \le \log_2 n$.
- $H(X, Y)$ — **joint entropy** of $(X, Y)$.
- $H(X \mid Y) = H(X, Y) - H(Y)$ — **conditional entropy**.
- $I(X; Y) = H(X) + H(Y) - H(X, Y)$ — **mutual information**.
- $D_{\mathrm{KL}}(p \\| q) = \sum_x p(x) \log_2 \dfrac{p(x)}{q(x)}$ —
  **Kullback–Leibler divergence** (relative entropy), in bits.
- $S(\rho) = -\mathrm{tr}(\rho \log_2 \rho)$ — **von Neumann entropy**
  of a density matrix $\rho$, in bits. For a pure state $S = 0$.
  (Chapter 5; previewed in
  [§4.14](../part-02-formalism/04-mathematical-background.md#414-probability-and-information-theory-refresher).)
- $\chi = S(\rho) - \sum_x p_x\\, S(\rho_x)$ — **Holevo quantity** of
  an ensemble $\\{p_x, \rho_x\\}$ with average state
  $\rho = \sum_x p_x\\, \rho_x$. Upper-bounds the accessible classical
  mutual information between sender and receiver.

**Sample complexity.** Estimating an unknown Bernoulli probability
bounded away from $0$ and $1$ to additive error $\epsilon$ with
constant confidence by independent shot-by-shot sampling takes
$\Theta(1/\epsilon^2)$ shots; confidence $1 - \delta$ adds a
$\log(1/\delta)$ factor (Hoeffding / Chernoff). Coherent amplitude
estimation improves the scaling to roughly $O(1/\epsilon)$ under
stronger access assumptions (Chapter 14). Entropy logarithms in this
book are base 2 throughout; entropies are reported in bits unless
explicitly stated otherwise.

---

[← Previous: Chapter 37](../part-13-perspective-and-direction/37-endgame.md) · [Table of Contents](../../README.md) · [Next: Appendix B. Common Gates and Their Matrices →](appendix-b-common-gates.md)
