# Appendix C. Useful Identities and Decompositions

> **Status:** draft · **Phase:** 2 · **Sections drafted:** 6 / 6

[← Previous: Appendix B. Common Gates and Their Matrices](appendix-b-common-gates.md) · [Table of Contents](../../README.md) · [Next: Appendix D. Suggested Reading and Reference Papers →](appendix-d-suggested-reading.md)

This appendix collects the working identities used throughout the book in a
form you can look up quickly. The **matrix forms** of the gates appearing
below are in [Appendix B](appendix-b-common-gates.md); the entries here are
*relations between operators* — algebraic, tensor-product, commutator, gate,
decomposition, and basis-change identities. The notation matches Chapter 4
§4.5 (operator classes and the commutator), §4.7 (spectral decomposition),
and §4.8 (tensor products); cross-references to those sections are given
wherever the underlying statement is proved.

## C.1 Pauli Algebra

The single-qubit Pauli matrices $I$, $X$, $Y$, $Z$ generate every
single-qubit Hermitian operator and most of the working algebra appears
again on multiple qubits through tensor products (§C.2). The matrices
themselves are in §B.1.

- Involution: $X^2 = Y^2 = Z^2 = I$ and $I^2 = I$. Each of $X$, $Y$, $Z$ is
  its own inverse and its own adjoint.
- Hermiticity and unitarity: $X^\dagger = X$, $Y^\dagger = Y$,
  $Z^\dagger = Z$, and the same operators are unitary because they are
  involutory and Hermitian.
- Cyclic products (read $X \to Y \to Z \to X$):
  $XY = iZ$, $YZ = iX$, $ZX = iY$.
- Reversed products pick up the opposite sign:
  $YX = -iZ$, $ZY = -iX$, $XZ = -iY$.
- Anticommutation of distinct Paulis:
  $\\{X, Y\\} = XY + YX = 0$, and similarly
  $\\{Y, Z\\} = \\{Z, X\\} = 0$.
- Self-anticommutator: $\\{X, X\\} = 2X^2 = 2I$, and likewise for $Y$ and $Z$.
- Trace: $\mathrm{tr}(I) = 2$, $\mathrm{tr}(X) = \mathrm{tr}(Y) =
  \mathrm{tr}(Z) = 0$.
- Compact form. For $A, B \in \\{X, Y, Z\\}$ with $A \ne B$ and
  $\varepsilon_{ABC}$ the cyclic sign with $\varepsilon_{XYZ} = +1$:

$$
A B = i\\, \varepsilon_{ABC}\\, C, \qquad
\\{A, B\\} = 0, \qquad
[A, B] = 2 i\\, \varepsilon_{ABC}\\, C.
$$

Pauli product table (rows are the left factor, columns the right factor):

- $I \cdot X = X$, $I \cdot Y = Y$, $I \cdot Z = Z$, $I \cdot I = I$.
- $X \cdot I = X$, $X \cdot X = I$, $X \cdot Y = iZ$, $X \cdot Z = -iY$.
- $Y \cdot I = Y$, $Y \cdot X = -iZ$, $Y \cdot Y = I$, $Y \cdot Z = iX$.
- $Z \cdot I = Z$, $Z \cdot X = iY$, $Z \cdot Y = -iX$, $Z \cdot Z = I$.

A useful corollary on the full **Pauli group** $\\{\pm 1, \pm i\\} \times
\\{I, X, Y, Z\\}^{\otimes n}$: any product of $n$-qubit Pauli strings is
again a Pauli string up to a factor in $\\{\pm 1, \pm i\\}$, computed
factor-by-factor from the single-qubit table above.

## C.2 Tensor Product Rules

These identities let you move operators in and out of tensor factors. The
underlying definition and a worked $X \otimes I$ vs. $I \otimes X$ example
are in §4.8.

- Mixed-product rule:
  $(A \otimes B)(C \otimes D) = (A C) \otimes (B D)$, whenever the products
  $AC$ and $BD$ are well-defined. This is the single most-used tensor
  identity in the book.
- Iterated form:
  $(A_1 \otimes B_1)(A_2 \otimes B_2) \cdots (A_k \otimes B_k) =
  (A_1 A_2 \cdots A_k) \otimes (B_1 B_2 \cdots B_k)$.
- Adjoint distributes:
  $(A \otimes B)^\dagger = A^\dagger \otimes B^\dagger$.
  In particular $(A \otimes B)$ is Hermitian iff $A$ and $B$ are both
  Hermitian, and unitary iff $A$ and $B$ are both unitary.
- Transpose and complex conjugate also distribute:
  $(A \otimes B)^T = A^T \otimes B^T$ and
  $(A \otimes B)^* = A^* \otimes B^*$.
- Inverse: if $A$ and $B$ are invertible,
  $(A \otimes B)^{-1} = A^{-1} \otimes B^{-1}$.
- Trace factorises:
  $\mathrm{tr}(A \otimes B) = \mathrm{tr}(A)\\, \mathrm{tr}(B)$.
- Determinant: if $A$ is $m \times m$ and $B$ is $n \times n$, then
  $\det(A \otimes B) = (\det A)^n (\det B)^m$.
- Inner product of product vectors:
  $\langle u_1 \otimes v_1,\\, u_2 \otimes v_2\rangle =
  \langle u_1, u_2\rangle\\, \langle v_1, v_2\rangle$, hence
  $\\|u \otimes v\\| = \\|u\\|\\, \\|v\\|$.
- Outer product factorises:
  $(|u\rangle \otimes |v\rangle)(\langle u'| \otimes \langle v'|) =
  |u\rangle\langle u'| \otimes |v\rangle\langle v'|$.
- Bilinearity (mixing rules):
  $(\alpha A + \beta A') \otimes B = \alpha (A \otimes B) + \beta (A' \otimes B)$
  and $A \otimes (\alpha B + \beta B') = \alpha (A \otimes B) + \beta (A \otimes B')$.
- Scalars pull through:
  $(\alpha A) \otimes B = A \otimes (\alpha B) = \alpha (A \otimes B)$.
- Tensoring with identity preserves linear structure:
  $A \otimes I_n + A' \otimes I_n = (A + A') \otimes I_n$.
- Functional calculus on product operators. If $A$ acts on the first
  factor only, then $f(A \otimes I) = f(A) \otimes I$ for any function $f$
  defined on the spectrum of $A$; in particular $e^{i\theta (A \otimes I)}
  = e^{i\theta A} \otimes I$, which is why single-qubit rotations stay
  single-qubit when embedded in a larger register.
- Partial trace on a product operator:
  $\mathrm{tr}_2(A \otimes B) = A\\, \mathrm{tr}(B)$ and
  $\mathrm{tr}_1(A \otimes B) = \mathrm{tr}(A)\\, B$, extended linearly to
  general bipartite operators (§4.8).

## C.3 Commutation Relations

The commutator and its sibling the anticommutator measure the failure of
operators to commute. The general theory and the link between commuting and
simultaneous diagonalisation are in §4.5; this section lists the working
formulae.

- Definition of the commutator: $[A, B] = AB - BA$. Operators **commute**
  when $[A, B] = 0$.
- Definition of the anticommutator: $\\{A, B\\} = AB + BA$.
- Operator product in terms of the two:
  $AB = \tfrac{1}{2}[A, B] + \tfrac{1}{2}\\{A, B\\}$.
- Antisymmetry and bilinearity:
  $[A, B] = -[B, A]$, $[A, B + C] = [A, B] + [A, C]$, and
  $[\alpha A, B] = \alpha [A, B]$ for any scalar $\alpha$.
- Leibniz (product) rule:
  $[A, BC] = [A, B]\\, C + B\\, [A, C]$.
- Mirror Leibniz on the left slot:
  $[AB, C] = A\\, [B, C] + [A, C]\\, B$.
- Jacobi identity:
  $[A, [B, C]] + [B, [C, A]] + [C, [A, B]] = 0$.
- Adjoint: $[A, B]^\dagger = [B^\dagger, A^\dagger]$. For Hermitian $A, B$,
  $[A, B]$ is **anti-Hermitian** ($([A, B])^\dagger = -[A, B]$), so $i[A, B]$
  is Hermitian — this is why Pauli commutators come out as $i$ times a Pauli.
- Pauli commutators (cyclic with $X \to Y \to Z \to X$):
  $[X, Y] = 2 i Z$, $[Y, Z] = 2 i X$, $[Z, X] = 2 i Y$.
- Pauli anticommutators of distinct factors:
  $\\{X, Y\\} = \\{Y, Z\\} = \\{Z, X\\} = 0$.
- Self-anticommutators: $\\{A, A\\} = 2 A^2$, so $\\{X, X\\} = \\{Y, Y\\} =
  \\{Z, Z\\} = 2 I$.
- Identity commutes with everything: $[I, A] = 0$, and more generally
  $[\alpha I, A] = 0$ for any scalar $\alpha$.
- Tensor-product slot independence: $[A \otimes I, I \otimes B] = 0$ for
  any operators $A, B$ on the two factors. Operators that act on disjoint
  tensor factors always commute.
- Commutator of tensor products:
  $[A \otimes B,\\, C \otimes D] = (AC) \otimes (BD) - (CA) \otimes (DB)$.
- Simultaneous diagonalisation. A **pairwise commuting** family of normal
  operators admits a single orthonormal basis in which every member is
  diagonal — see §4.5 and the spectral statement in §4.7. The Pauli
  $\\{X, Y, Z\\}$ pairwise anticommute, so no two of them are simultaneously
  diagonalisable.

## C.4 Common Gate Identities

These are the conjugation, cancellation, and decomposition relations among
the named gates of Appendix B that get reused most often. Matrices are in
§B.1–B.9; the relations here are basis-independent.

**Hadamard conjugation of Paulis.** $H$ exchanges $X$ and $Z$ in the
Heisenberg picture and flips the sign of $Y$:

$$
H X H = Z, \qquad H Z H = X, \qquad H Y H = -Y.
$$

- All three follow from $H^2 = I$, $H = (X + Z)/\sqrt 2$, and the Pauli
  algebra of §C.1.
- The first identity is the source of the "measure in the $X$ basis by
  applying $H$ then measuring in the computational basis" recipe.
- $H X H = Z$ and $H Z H = X$ together imply
  $H (X + Z) H = X + Z$, consistent with $H = (X + Z)/\sqrt 2$ being a
  fixed point of conjugation by itself.

**Phase conjugation of Paulis.** $S$ rotates $X$ into $Y$ and back:

$$
S X S^\dagger = Y, \qquad S Y S^\dagger = -X, \qquad S Z S^\dagger = Z.
$$

- $S$ leaves $Z$ alone because $S$ is diagonal in the computational basis.
- Equivalently $S = R_z(\pi/2)$ up to a global phase, and conjugation by
  $R_z(\theta)$ rotates the $X$–$Y$ Bloch components by $\theta$ (see §B.4).

**$T$ as a $Z$ rotation.** Up to a global phase, $T$ is an eighth-turn $Z$
rotation:

$$
T = e^{i\pi/8}\\, R_z(\pi/4).
$$

- The global phase is harmless on an uncontrolled qubit but matters in
  controlled versions of $T$ (§B.9).
- $T^2 = S$, $T^4 = Z$, $T^8 = I$.

**CNOT cancellation and SWAP construction.** Let
$\mathrm{CNOT}_{a \to b}$ denote CNOT with control $a$ and target $b$;
matrices for $a \to b = 1 \to 2$ and $2 \to 1$ are in §B.5.

- $\mathrm{CNOT}^2 = I$ — CNOT is involutory.
- Three-CNOT SWAP identity:

$$
\mathrm{SWAP} =
\mathrm{CNOT}_{1 \to 2}\\, \mathrm{CNOT}_{2 \to 1}\\, \mathrm{CNOT}_{1 \to 2}
= \mathrm{CNOT}_{2 \to 1}\\, \mathrm{CNOT}_{1 \to 2}\\, \mathrm{CNOT}_{2 \to 1}.
$$

- Hadamard sandwich swaps the role of control and target:

$$
(H \otimes H)\\, \mathrm{CNOT}_{1 \to 2}\\, (H \otimes H)
= \mathrm{CNOT}_{2 \to 1}.
$$

- Equivalently, CNOT in the $\\{|+\rangle, |-\rangle\\}$ basis on both qubits
  is the same gate with the roles of control and target exchanged.
- CZ–CNOT conversion (Hadamard on the target only):
  $\mathrm{CNOT}_{1 \to 2} = (I \otimes H)\\, \mathrm{CZ}\\, (I \otimes H)$, and
  conversely $\mathrm{CZ} = (I \otimes H)\\, \mathrm{CNOT}_{1 \to 2}\\,
  (I \otimes H)$.

**Pauli conjugation by CNOT.** Conjugation by $\mathrm{CNOT}_{1 \to 2}$
propagates $X$ along the control-to-target direction and $Z$ in reverse:

$$
\mathrm{CNOT}_{1 \to 2}\\, (X \otimes I)\\, \mathrm{CNOT}_{1 \to 2}
= X \otimes X,
$$

$$
\mathrm{CNOT}_{1 \to 2}\\, (I \otimes X)\\, \mathrm{CNOT}_{1 \to 2}
= I \otimes X,
$$

$$
\mathrm{CNOT}_{1 \to 2}\\, (Z \otimes I)\\, \mathrm{CNOT}_{1 \to 2}
= Z \otimes I,
$$

$$
\mathrm{CNOT}_{1 \to 2}\\, (I \otimes Z)\\, \mathrm{CNOT}_{1 \to 2}
= Z \otimes Z.
$$

- These four relations generate the action of CNOT on the full two-qubit
  Pauli group and are the workhorse identities of the stabilizer formalism
  (§19.8).
- A useful mnemonic: $X$ copies *forward* (control to target); $Z$ copies
  *backward* (target to control); single-factor $X$ on the target and
  single-factor $Z$ on the control are fixed.

## C.5 Common Circuit Decompositions

The decompositions below are stated; the constructive proofs and the full
parameter formulas appear in the indicated chapters. The matrix forms of
the gates referenced are in Appendix B.

**Z–Y–Z (Euler) decomposition of a single-qubit unitary.** Any single-qubit
unitary $U$ can be written, up to a global phase, as

$$
U = e^{i\alpha}\\, R_z(\beta)\\, R_y(\gamma)\\, R_z(\delta)
$$

for some real angles $\alpha, \beta, \gamma, \delta$. Equivalent
single-axis-swap variants (Z–X–Z, X–Y–X) work analogously.

- The four angles are determined by $U$ up to the usual Euler-angle
  ambiguities at $\gamma = 0$ or $\pi$.
- Specialising the angles recovers every single-qubit gate in §B.1–B.4: for
  example $H = e^{i\pi/2}\\, R_z(\pi/2)\\, R_y(\pi/2)\\, R_z(\pi/2)$ up to a
  global phase, and $X = e^{i\pi/2}\\, R_x(\pi)$.
- The $U_3(\theta, \phi, \lambda)$ Qiskit form (§B.4) packages the same
  three free Euler angles plus an overall phase into a single matrix.

**KAK decomposition of a two-qubit unitary.** Every two-qubit unitary
$U \in \mathrm{U}(4)$ factors as

$$
U = (A_1 \otimes A_2)\\, e^{i(c_x X \otimes X + c_y Y \otimes Y + c_z Z \otimes Z)}\\, (B_1 \otimes B_2)
$$

with single-qubit unitaries $A_1, A_2, B_1, B_2$ and real coefficients
$c_x, c_y, c_z$. The middle factor is the **non-local part** of $U$; the
outer factors are local. The decomposition and the full parameter
extraction are developed in §8.14 (with the broader compilation context in
Chapter 23).

- The non-local part lives in a three-real-parameter subgroup; the local
  unitaries account for the remaining twelve real parameters of
  $\mathrm{U}(4)$ (modulo a global phase).
- $\mathrm{SWAP}$ has $(c_x, c_y, c_z) = (\pi/4, \pi/4, \pi/4)$;
  $\mathrm{CNOT}$ has $(c_x, c_y, c_z) = (\pi/4, 0, 0)$ up to local
  unitaries.

**CNOT count for a two-qubit unitary.** A generic
$U \in \mathrm{U}(4)$ can be implemented with at most **three CNOTs** plus
single-qubit gates; gates with extra structure (such as $\mathrm{SWAP}$,
which uses three, or any local unitary $A_1 \otimes A_2$, which uses
zero) saturate strictly less. The result goes through the KAK form above
and is given in §8.14.

- Two-CNOT decomposition is enough iff the KAK coefficient vector
  $(c_x, c_y, c_z)$ has $c_z = 0$ after relabelling axes.
- One-CNOT decomposition is enough iff additionally $c_y = 0$.
- Zero CNOTs is enough iff $U = A_1 \otimes A_2$.

**Toffoli into 6 CNOTs.** The Toffoli gate $\mathrm{CCX}$ (§B.8) admits a
**6 CNOT + single-qubit-gate** decomposition. Sketch:

$$
\mathrm{CCX} = (I \otimes I \otimes H)\\, \tilde V\\, (I \otimes I \otimes H),
$$

where $\tilde V$ is the standard $T / T^\dagger$ ladder of two-CNOT-each
controlled-$\sqrt X$ stages — six CNOTs plus seven $T$ or $T^\dagger$ gates
plus two Hadamards in the standard textbook layout. The construction and
the gate count are taken up in §8.8 alongside the general
controlled-unitary construction (§8.7).

- Six CNOTs is optimal for Toffoli without ancilla and without
  measurement; with one ancilla and measurement the count drops further
  (Chapter 23).
- The same skeleton, with $T$ replaced by a continuous phase, decomposes
  every doubly-controlled phase gate.

## C.6 Basis-Change Identities

A **basis-change** for a single qubit is a unitary that maps the
computational basis onto another orthonormal basis. The three Pauli
eigenbases are the ones the book uses by name.

**Hadamard swaps $Z$ and $X$ eigenbases.** From $H Z H = X$ and
$H X H = Z$ (§C.4),

- $H|0\rangle = |+\rangle$ and $H|1\rangle = |-\rangle$ — $H$ maps the $Z$
  eigenbasis $\\{|0\rangle, |1\rangle\\}$ to the $X$ eigenbasis
  $\\{|+\rangle, |-\rangle\\}$.
- $H|+\rangle = |0\rangle$ and $H|-\rangle = |1\rangle$ — the same map runs
  backward, by $H^2 = I$.
- Measuring in the $X$ basis is implemented by applying $H$ and measuring in
  the computational basis.

**$SH$ moves between the $Y$ eigenbasis and the computational basis.** The
$Y$ eigenvectors are $|y_\pm\rangle = (|0\rangle \pm i|1\rangle)/\sqrt 2$.

- $SH|0\rangle = |y_+\rangle$ and $SH|1\rangle = |y_-\rangle$.
- The inverse change is $(SH)^\dagger = H S^\dagger$, so
  $H S^\dagger |y_\pm\rangle = |0\rangle$ and $|1\rangle$ respectively.
- Measuring in the $Y$ basis is implemented by applying $H S^\dagger$ and
  measuring in the computational basis.

**Mutually unbiased bases.** Two orthonormal bases
$\\{|a_i\rangle\\}_{i=1}^{d}$ and $\\{|b_j\rangle\\}_{j=1}^{d}$ of a
$d$-dimensional space are **mutually unbiased** (MUB) when, for every
pair $(i, j)$,

$$
|\langle a_i | b_j\rangle|^2 = \frac{1}{d}.
$$

- A state prepared as $|a_i\rangle$ is uniformly random when measured in
  the $\\{|b_j\rangle\\}$ basis. This is the operational content of "the
  two bases reveal independent information".
- On one qubit ($d = 2$) the three Pauli eigenbases $\\{|0\rangle,
  |1\rangle\\}$, $\\{|+\rangle, |-\rangle\\}$, $\\{|y_+\rangle,
  |y_-\rangle\\}$ are pairwise mutually unbiased, and every off-basis
  overlap is $1/\sqrt 2$ in absolute value. This is the maximum possible
  number of MUBs in dimension $2$.
- The maximum number of mutually unbiased bases in dimension $d$ is at
  most $d + 1$, and this bound is achieved when $d$ is a prime power
  (so a complete set of $d + 1$ MUBs is known for $d = 2, 3, 4, 5, 7, 8, 9, \ldots$).
  Smaller MUB sets exist trivially in any dimension; whether $d + 1$ is
  achievable for non-prime-power $d$ — the smallest open case is $d = 6$ —
  is a long-standing open problem. The general construction and
  applications (random access codes, tomography) are taken up in Chapter 12.

---

[← Previous: Appendix B. Common Gates and Their Matrices](appendix-b-common-gates.md) · [Table of Contents](../../README.md) · [Next: Appendix D. Suggested Reading and Reference Papers →](appendix-d-suggested-reading.md)
