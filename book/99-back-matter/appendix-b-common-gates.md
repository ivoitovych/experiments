# Appendix B. Common Gates and Their Matrices

> **Status:** draft · **Phase:** 2 · **Sections drafted:** 9 / 9

[← Previous: Appendix A. Notation Reference](appendix-a-notation-reference.md) · [Table of Contents](../../README.md) · [Next: Appendix C. Useful Identities and Decompositions →](appendix-c-identities-and-decompositions.md)

This appendix collects the matrices of the gates that appear most often in the
rest of the book, in a form you can look up quickly. Each entry gives a short
description, the matrix in the computational basis, and a bullet list of the
properties used elsewhere (Hermitian, unitary, involutory, eigenvalues, action
on basis states). Operator classes (Hermitian / unitary / normal / positive
semidefinite) are defined in Chapter 4 §4.5; the tensor-product ordering and
the Qiskit endian reconciliation are discussed in Chapter 4 §4.8.

All matrices are written in the **computational basis** under this book's
**MSB-first qubit ordering**: for a tensor product $|x_1 x_2 \cdots x_n\rangle$,
$x_1$ is the most significant bit and the corresponding zero-based statevector
index is $\sum_i x_i\\, 2^{n-i}$. Qiskit's index/endian convention is the
opposite; where the resulting two-qubit matrix differs (CNOT in particular),
we say so explicitly and point back to §4.8 for the reconciliation rather than
re-derive it here.

## B.1 Pauli Gates

The single-qubit **Pauli gates** $I$, $X$, $Y$, $Z$ are the building blocks of
nearly every single-qubit identity in this book. $X$ is the quantum bit flip,
$Z$ is the phase flip, $Y = iXZ$ combines both with a global $i$, and $I$ is
the identity.

$$
I = \begin{pmatrix} 1 & 0 \\\\ 0 & 1 \end{pmatrix}, \qquad
X = \begin{pmatrix} 0 & 1 \\\\ 1 & 0 \end{pmatrix}, \qquad
Y = \begin{pmatrix} 0 & -i \\\\ i & 0 \end{pmatrix}, \qquad
Z = \begin{pmatrix} 1 & 0 \\\\ 0 & -1 \end{pmatrix}.
$$

Properties:

- All four are Hermitian and unitary; $I$, $X$, $Y$, $Z$ are each their own
  inverse: $X^2 = Y^2 = Z^2 = I$ (involutory).
- Eigenvalues of $X$, $Y$, $Z$ are $\pm 1$; the eigenvectors of $X$ are
  $|\pm\rangle = (|0\rangle \pm |1\rangle)/\sqrt{2}$; of $Y$ are
  $(|0\rangle \pm i|1\rangle)/\sqrt{2}$; of $Z$ are $|0\rangle$ and $|1\rangle$.
- Action on the computational basis:
  $X|0\rangle = |1\rangle$, $X|1\rangle = |0\rangle$;
  $Y|0\rangle = i|1\rangle$, $Y|1\rangle = -i|0\rangle$;
  $Z|0\rangle = |0\rangle$, $Z|1\rangle = -|1\rangle$.
- Algebra: $XY = iZ$, $YZ = iX$, $ZX = iY$ (and the cyclic conjugates);
  commutators $[X, Y] = 2iZ$, $[Y, Z] = 2iX$, $[Z, X] = 2iY$;
  anticommutators $\\{X, Y\\} = \\{Y, Z\\} = \\{Z, X\\} = 0$.
- Trace: $\mathrm{tr}(X) = \mathrm{tr}(Y) = \mathrm{tr}(Z) = 0$, while
  $\mathrm{tr}(I) = 2$.

## B.2 Hadamard Gate

The **Hadamard gate** $H$ is the canonical superposition-creating gate: it
maps the computational basis to the Hadamard basis and back. It is the
workhorse of every algorithm that begins by uniformly superposing
computational-basis inputs.

$$
H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\\\ 1 & -1 \end{pmatrix}.
$$

Properties:

- Hermitian and unitary; involutory, $H^2 = I$, so $H^\dagger = H = H^{-1}$.
- Eigenvalues $\pm 1$ with eigenvectors
  $\cos(\pi/8)|0\rangle + \sin(\pi/8)|1\rangle$ (for $+1$) and
  $\sin(\pi/8)|0\rangle - \cos(\pi/8)|1\rangle$ (for $-1$).
- Action on the computational basis:
  $H|0\rangle = |+\rangle = (|0\rangle + |1\rangle)/\sqrt{2}$ and
  $H|1\rangle = |-\rangle = (|0\rangle - |1\rangle)/\sqrt{2}$.
- Pauli-basis relations: $H X H = Z$, $H Z H = X$, $H Y H = -Y$. So $H$
  exchanges $X$ and $Z$ in the Heisenberg picture.
- $H = (X + Z)/\sqrt{2}$ as a real linear combination of Paulis.

## B.3 Phase Gates

The diagonal **phase gates** apply a phase to $|1\rangle$ while leaving
$|0\rangle$ fixed. The named instances $S$, $T$, and their adjoints are
fixed-angle members of the one-parameter family $P(\varphi)$:
$S = P(\pi/2)$, $T = P(\pi/4)$, and $Z = P(\pi)$.

$$
P(\varphi) = \begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\varphi} \end{pmatrix}, \qquad
S = \begin{pmatrix} 1 & 0 \\\\ 0 & i \end{pmatrix}, \qquad
S^\dagger = \begin{pmatrix} 1 & 0 \\\\ 0 & -i \end{pmatrix},
$$

$$
T = \begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\pi/4} \end{pmatrix}, \qquad
T^\dagger = \begin{pmatrix} 1 & 0 \\\\ 0 & e^{-i\pi/4} \end{pmatrix}.
$$

Properties:

- All four are unitary; **not** Hermitian (except in the degenerate cases
  $P(0) = I$ and $P(\pi) = Z$). $P(\varphi)^\dagger = P(-\varphi)$.
- Eigenvalues of $P(\varphi)$ are $1$ and $e^{i\varphi}$, with eigenvectors
  $|0\rangle$ and $|1\rangle$ respectively. Eigenvalues of $S$ are $1, i$;
  eigenvalues of $T$ are $1, e^{i\pi/4}$.
- Action on the computational basis: $P(\varphi)|0\rangle = |0\rangle$ and
  $P(\varphi)|1\rangle = e^{i\varphi}|1\rangle$. A *computational-basis
  eigenstate* therefore picks up only a global phase, which is not
  observable on its own. Applied to a superposition such as
  $|+\rangle = (|0\rangle + |1\rangle)/\sqrt{2}$, however, $P(\varphi)$
  produces $(|0\rangle + e^{i\varphi}|1\rangle)/\sqrt{2}$ — a genuine
  relative phase, observable after a basis change such as $H$.
- Composition law: $P(\varphi_1) P(\varphi_2) = P(\varphi_1 + \varphi_2)$.
  In particular $S^2 = Z$, $T^2 = S$, $T^4 = Z$, $T^8 = I$.
- $P(\varphi)$ differs from $R_z(\varphi)$ (§B.4) only by a global phase
  $e^{-i\varphi/2}$: $P(\varphi) = e^{i\varphi/2} R_z(\varphi)$. The two
  conventions are interchangeable for single-qubit gates but the global
  phase becomes a relative phase when the gate is controlled (§B.9).

## B.4 Rotation Gates

The **Pauli rotation gates** $R_x(\theta)$, $R_y(\theta)$, $R_z(\theta)$ are
the one-parameter unitary families generated by the Pauli matrices. They
appear constantly in variational circuits, in Trotterized Hamiltonian
simulation, and as the building blocks of every continuous single-qubit
parameter. The conventions match current Qiskit / IBM Quantum docs:

$$
R_x(\theta) = e^{-i\theta X/2}
= \begin{pmatrix}
\cos(\theta/2) & -i \sin(\theta/2) \\\\
-i \sin(\theta/2) & \cos(\theta/2)
\end{pmatrix},
$$

$$
R_y(\theta) = e^{-i\theta Y/2}
= \begin{pmatrix}
\cos(\theta/2) & -\sin(\theta/2) \\\\
\sin(\theta/2) & \cos(\theta/2)
\end{pmatrix},
$$

$$
R_z(\theta) = e^{-i\theta Z/2}
= \begin{pmatrix}
e^{-i\theta/2} & 0 \\\\
0 & e^{i\theta/2}
\end{pmatrix}.
$$

A general single-qubit unitary up to a global phase is the three-parameter
**U3** gate (Qiskit convention),

$$
U_3(\theta, \phi, \lambda)
= \begin{pmatrix}
\cos(\theta/2) & -e^{i\lambda} \sin(\theta/2) \\\\
e^{i\phi} \sin(\theta/2) & e^{i(\phi + \lambda)} \cos(\theta/2)
\end{pmatrix}.
$$

Properties:

- Each $R_a(\theta)$ is unitary; $R_a(\theta)^\dagger = R_a(-\theta)$.
  $R_a(0) = I$ and $R_a(2\pi) = -I$ (so $R_a$ is $4\pi$-periodic, not
  $2\pi$-periodic — a signature of spin-$1/2$).
- Composition law: $R_a(\theta_1) R_a(\theta_2) = R_a(\theta_1 + \theta_2)$
  for a single axis. Rotations about different Pauli axes do **not** commute.
- $R_z(\theta)$ is diagonal in the computational basis; $R_x(\theta)$ and
  $R_y(\theta)$ are not.
- Relation to Pauli gates: $X = i R_x(\pi)$, $Y = i R_y(\pi)$,
  $Z = i R_z(\pi)$. The factor of $i$ is a global phase and is harmless on
  uncontrolled single-qubit gates, but matters once the gate is controlled
  (§B.9).
- $U_3$ covers every single-qubit unitary up to global phase; specialising
  the angles recovers $R_x$, $R_y$, $R_z$, $H$, and the phase gates.

## B.5 CNOT

The **controlled-NOT** gate (also written CX) applies $X$ to the **target**
qubit when the **control** qubit is $|1\rangle$ and acts as the identity
otherwise. It is the canonical two-qubit entangling gate.

Under this book's MSB-first convention with the **first tensor factor as the
control and the second as the target**, the matrix is

$$
\mathrm{CNOT}_{1 \to 2}
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 0 & 1 \\\\
0 & 0 & 1 & 0
\end{pmatrix}.
$$

With the **roles swapped** — second factor as control, first as target — the
matrix is

$$
\mathrm{CNOT}_{2 \to 1}
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 0 & 0 & 1 \\\\
0 & 0 & 1 & 0 \\\\
0 & 1 & 0 & 0
\end{pmatrix}.
$$

Properties:

- Hermitian and unitary; involutory, $\mathrm{CNOT}^2 = I$.
- Eigenvalues $\pm 1$, each with multiplicity two.
- Action on the computational basis (control = first factor):
  $|00\rangle \mapsto |00\rangle$, $|01\rangle \mapsto |01\rangle$,
  $|10\rangle \mapsto |11\rangle$, $|11\rangle \mapsto |10\rangle$.
  In bit terms, $|a, b\rangle \mapsto |a, a \oplus b\rangle$.
- Outer-product form: $\mathrm{CNOT}_{1 \to 2} = |0\rangle\langle 0| \otimes I
  + |1\rangle\langle 1| \otimes X$.
- Basis-conjugation identity: $(H \otimes H)\\, \mathrm{CNOT}_{1 \to 2}\\,
  (H \otimes H) = \mathrm{CNOT}_{2 \to 1}$ — Hadamarding both qubits swaps
  the control/target roles. Equivalently, $\mathrm{CNOT}_{1 \to 2}$ in the
  Hadamard basis is $\mathrm{CNOT}_{2 \to 1}$.
- **Qiskit endian note.** Qiskit lists CNOT as `cx(control, target)` with
  qubit $0$ being the *least* significant bit of the integer index. Under
  this book's convention the qubit labelled `q_0` in Qiskit corresponds to
  the *rightmost* tensor factor, so `cx(0, 1)` matches
  $\mathrm{CNOT}_{2 \to 1}$ above, and `cx(1, 0)` matches
  $\mathrm{CNOT}_{1 \to 2}$. The index-mapping reconciliation is worked
  out in detail in §4.8 (including the "rule of thumb: leftmost tensor
  factor ↔ highest-numbered Qiskit qubit").

## B.6 CZ

The **controlled-Z** gate applies $Z$ to the target qubit when the control is
$|1\rangle$. Because $Z$ is diagonal, CZ is symmetric in its two arguments —
the control/target distinction is purely a convention, not a property of the
matrix.

$$
\mathrm{CZ}
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 1 & 0 \\\\
0 & 0 & 0 & -1
\end{pmatrix}.
$$

Properties:

- Hermitian and unitary; involutory, $\mathrm{CZ}^2 = I$.
- Eigenvalues $+1$ (multiplicity three) and $-1$ (multiplicity one).
- Action on the computational basis: $|11\rangle \mapsto -|11\rangle$, all
  other basis states fixed.
- Outer-product form: $\mathrm{CZ} = |0\rangle\langle 0| \otimes I +
  |1\rangle\langle 1| \otimes Z = I \otimes |0\rangle\langle 0| +
  Z \otimes |1\rangle\langle 1|$. The two factorings illustrate
  control/target symmetry.
- Conjugation by Hadamard on the target converts CZ to CNOT:
  $\mathrm{CNOT}_{1 \to 2} = (I \otimes H)\\, \mathrm{CZ}\\, (I \otimes H)$.
- Because CZ is symmetric under swap of its two qubits, there is no
  endian-induced sign change between this book's matrix and Qiskit's.

## B.7 SWAP

The **SWAP** gate exchanges the states of two qubits, $|a, b\rangle \mapsto
|b, a\rangle$. It is the only non-trivial two-qubit gate that is also
symmetric and computational-basis-permutation; it can be decomposed into
three CNOTs.

$$
\mathrm{SWAP}
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 0 & 1 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 0 & 1
\end{pmatrix}.
$$

Properties:

- Hermitian and unitary; involutory, $\mathrm{SWAP}^2 = I$.
- Eigenvalues $+1$ (multiplicity three, symmetric subspace) and $-1$
  (multiplicity one, antisymmetric subspace).
- Action on the computational basis: $|00\rangle \mapsto |00\rangle$,
  $|01\rangle \mapsto |10\rangle$, $|10\rangle \mapsto |01\rangle$,
  $|11\rangle \mapsto |11\rangle$.
- CNOT decomposition: $\mathrm{SWAP} = \mathrm{CNOT}_{1 \to 2}\\,
  \mathrm{CNOT}_{2 \to 1}\\, \mathrm{CNOT}_{1 \to 2}$ — three CNOTs, no
  ancillas, alternating control direction.
- For any single-qubit unitary $U$,
  $\mathrm{SWAP}\\, (U \otimes I)\\, \mathrm{SWAP} = I \otimes U$, which is
  the reason SWAP appears whenever qubits need to be re-routed in hardware
  with limited connectivity.
- Because SWAP is symmetric under swap of its two qubits, this matrix is
  the same under either endian convention.

## B.8 Toffoli (CCX)

The **Toffoli gate**, also called **CCX** or **CCNOT**, applies $X$ to the
target qubit when *both* control qubits are $|1\rangle$. It is universal for
classical reversible computation by itself and shows up as the controlled
flip in Grover's diffusion operator, in arithmetic circuits, and in fault
tolerant gadgets.

Under this book's MSB-first convention with the **first two factors as
controls and the third as target**, the $8 \times 8$ matrix is

$$
\mathrm{CCX}
= \begin{pmatrix}
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 \\\\
0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\\\
0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 \\\\
0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 \\\\
0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\\\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 \\\\
0 & 0 & 0 & 0 & 0 & 0 & 1 & 0
\end{pmatrix}.
$$

Properties:

- Hermitian and unitary; involutory, $\mathrm{CCX}^2 = I$.
- Eigenvalues $\pm 1$ with multiplicities $7$ and $1$.
- Action on the computational basis: $|a, b, c\rangle \mapsto
  |a, b, c \oplus (a \wedge b)\rangle$ — the target XORs with the AND of the
  two controls.
- Outer-product form: $\mathrm{CCX} = (I_4 - |11\rangle\langle 11|) \otimes I
  + |11\rangle\langle 11| \otimes X$, with the projector acting on the
  first two factors.
- The Toffoli is **not** a member of the Clifford group; together with any
  Clifford generating set it provides universal quantum computation. A
  standard decomposition uses six CNOTs and a handful of $T$ and $H$ gates.
- Qiskit's `ccx(c0, c1, t)` follows the same control-then-target convention;
  the resulting statevector permutation differs from the matrix above only
  through the qubit-index reordering described in §4.8.

## B.9 Common Controlled Gates

Most named two-qubit gates outside CNOT/CZ/SWAP are obtained by replacing
the target action of CNOT with another single-qubit unitary. Under this
book's convention with the first factor as control and the second as target,

$$
C(U) = |0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes U
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & U_{00} & U_{01} \\\\
0 & 0 & U_{10} & U_{11}
\end{pmatrix},
$$

where $U_{ij}$ are the entries of the single-qubit unitary $U$. Specialising
$U$ recovers the named cases:

**Controlled-Y.**

$$
\mathrm{CY}
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 0 & -i \\\\
0 & 0 & i & 0
\end{pmatrix}.
$$

**Controlled-Z** — repeated here in the $C(U)$ form for completeness; the
standalone matrix is in §B.6.

$$
\mathrm{CZ}
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 1 & 0 \\\\
0 & 0 & 0 & -1
\end{pmatrix}.
$$

**Controlled-phase** $\mathrm{CP}(\varphi)$, the controlled version of
$P(\varphi)$.

$$
\mathrm{CP}(\varphi)
= \begin{pmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 1 & 0 \\\\
0 & 0 & 0 & e^{i\varphi}
\end{pmatrix}.
$$

**Multi-controlled-X** $C^k X$, with $k$ control qubits and one target,
applies $X$ to the target exactly when *all $k$ controls* are $|1\rangle$.
The $2^{k+1} \times 2^{k+1}$ matrix is the identity on every computational
basis vector except $|1^{\otimes k}, 0\rangle$ and $|1^{\otimes k},
1\rangle$, which are swapped. In block form,

$$
C^k X
= \begin{pmatrix}
I_{2^{k+1} - 2} & 0 \\\\
0 & X
\end{pmatrix},
$$

where the lower-right $2 \times 2$ block acts on the two states with all
controls equal to $|1\rangle$. The case $k = 1$ is CNOT (§B.5) and $k = 2$
is Toffoli (§B.8).

Properties (apply uniformly to the family above):

- $C(U)$ is unitary; it is Hermitian iff $U$ is Hermitian. So CY and CZ are
  Hermitian and involutory, while $\mathrm{CP}(\varphi)$ is Hermitian only
  for $\varphi \in \\{0, \pi\\}$.
- Eigenvalues of $C(U)$ are $1$ (multiplicity two, from the control-$|0\rangle$
  subspace) together with the eigenvalues of $U$ (each with multiplicity one,
  from the control-$|1\rangle$ subspace). So $\mathrm{CP}(\varphi)$ has
  eigenvalues $\\{1, 1, 1, e^{i\varphi}\\}$.
- Action on the computational basis: $|0, b\rangle \mapsto |0, b\rangle$ and
  $|1, b\rangle \mapsto |1, U b\rangle$ for $b \in \\{0, 1\\}$.
- Global phase becomes relative phase: $C(e^{i\alpha} U) = (P(\alpha) \otimes I)\\, C(U)$ — the diagonal phase $\mathrm{diag}(1, 1, e^{i\alpha}, e^{i\alpha})$ is $P(\alpha)$ acting on the *control* qubit (the target is unaffected by the phase factor). This is why $C(R_z(\theta))$
  and $\mathrm{CP}(\theta)$ are *not* equal — they differ by the global
  phase of $R_z$ relative to $P$, promoted to a relative phase by the
  control (see §B.3).
- Reversing the control/target roles produces a different $4 \times 4$
  matrix whenever $U$ is not diagonal — as for CY, where the swapped form
  flips two off-diagonal entries into a different sub-block — in exact
  parallel with CNOT (§B.5). For diagonal $U$ (CZ, $\mathrm{CP}$) the gate
  is symmetric in its two arguments. The Qiskit endian reconciliation is
  the same as for CNOT; see §4.8.

---

[← Previous: Appendix A. Notation Reference](appendix-a-notation-reference.md) · [Table of Contents](../../README.md) · [Next: Appendix C. Useful Identities and Decompositions →](appendix-c-identities-and-decompositions.md)
