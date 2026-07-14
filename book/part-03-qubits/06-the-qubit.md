# Chapter 6. The Qubit

> **Status:** prereviewed · **Phase:** 1 · **Sections drafted:** 11 / 11

[← Previous: Chapter 5](../part-02-formalism/05-postulates.md) · [Table of Contents](../../README.md) · [Next: Chapter 7 →](07-multiple-qubits-and-entanglement.md)

A qubit is the simplest non-trivial quantum system: a two-dimensional
complex Hilbert space $\mathbb{C}^2$. Everything in Chapter 5
specialises here, and the result is concrete enough to picture. The
Bloch sphere makes the single-qubit state space *visible* — every
pure state is a point on the surface of an ordinary sphere in
three-dimensional space (the unit 2-sphere) — and
that picture turns abstract operator algebra into geometry. Most
intuition about how quantum gates work, what phase does, and why
measurement gives the answers it gives starts on the Bloch sphere
and only later generalises to many qubits.

This chapter is short on purpose. The qubit is built from
postulates already in Chapter 5; the value here is concrete formulas
for the bases that recur throughout the book (computational,
Hadamard, circular), the Bloch-sphere picture, and worked
single-qubit dynamics and measurement examples.

## 6.1 Basis States

A qubit's Hilbert space $\mathbb{C}^2$ has a distinguished basis
$\\{|0\rangle, |1\rangle\\}$ — the **computational basis** — fixed by
hardware convention: the two states the readout device natively
distinguishes. The computational basis vectors are the standard
column vectors

$$
|0\rangle = \begin{pmatrix} 1 \\\\ 0 \end{pmatrix},
\qquad
|1\rangle = \begin{pmatrix} 0 \\\\ 1 \end{pmatrix},
$$

with $\langle 0 | 0 \rangle = \langle 1 | 1 \rangle = 1$ and
$\langle 0 | 1 \rangle = 0$.

Any orthonormal basis $\\{|b_0\rangle, |b_1\rangle\\}$ of
$\mathbb{C}^2$ is a *measurement basis* — Postulate 3 (§5.4) makes
projective measurement available in any basis. Different bases
expose different aspects of the state, and switching between them is
a *change of basis* implemented by a single-qubit unitary
(§4.10). The three bases that recur in this book are the
computational, Hadamard, and circular bases (§§6.4, 6.5, 6.6).

## 6.2 Pure States

A pure single-qubit state is a unit vector in $\mathbb{C}^2$, taken
up to global phase (§5.1, §5.8). In the computational basis it has
the form

$$
|\psi\rangle = \alpha\\, |0\rangle + \beta\\, |1\rangle,
\qquad
|\alpha|^2 + |\beta|^2 = 1,
$$

with $\alpha, \beta \in \mathbb{C}$. The two complex amplitudes
account for four real degrees of freedom; the normalization
constraint removes one; global phase removes another; the *physical*
state space has two real parameters left. These two parameters are
the two angles $(\theta, \varphi)$ of the Bloch sphere (§6.8).

A *general* parametrisation that makes the two real parameters
explicit is

$$
|\psi\rangle = \cos\!\tfrac{\theta}{2}\\, |0\rangle + e^{i\varphi}\\, \sin\!\tfrac{\theta}{2}\\, |1\rangle,
$$

with $\theta \in [0, \pi]$ and $\varphi \in [0, 2\pi)$. The factor of
$\tfrac{\theta}{2}$ in the angles is not a typo — it is what makes
the Bloch parametrisation cover the sphere exactly once. We unpack
this in §6.8.

Mixed single-qubit states (§5.9, §5.10) require the density-matrix
formalism and live *inside* the Bloch sphere rather than on its
surface; we develop that picture in §6.8.

## 6.3 Amplitudes and Probabilities

For $|\psi\rangle = \alpha |0\rangle + \beta |1\rangle$ in the
computational basis, the Born rule (§5.4, §5.7) says a
computational-basis measurement returns

- outcome $0$ with probability $|\alpha|^2$,
- outcome $1$ with probability $|\beta|^2$.

Two states with the same $(|\alpha|, |\beta|)$ but different relative
phase between $\alpha$ and $\beta$ are *physically distinct* even
though their computational-basis statistics are identical. The
canonical witness is the pair

$$
|+\rangle = \tfrac{1}{\sqrt{2}}\bigl(|0\rangle + |1\rangle\bigr),
\qquad
|-\rangle = \tfrac{1}{\sqrt{2}}\bigl(|0\rangle - |1\rangle\bigr).
$$

Both give probability $1/2$ for each computational-basis outcome, but
they are orthogonal — $\langle + | - \rangle = 0$ — and a Hadamard
gate followed by a computational-basis measurement distinguishes
them deterministically: $H|+\rangle = |0\rangle$, $H|-\rangle = |1\rangle$.

This is the single-qubit instance of the §4.1 / §5.7 / §5.8 point:
amplitudes carry more structure than probabilities, and the
additional structure (phase) becomes observable when you change
measurement basis.

## 6.4 Computational Basis

The computational basis $\\{|0\rangle, |1\rangle\\}$ is special by
hardware convention: it is the basis the readout device
distinguishes. On superconducting qubits, for example, the two basis states are
two energy levels of the qubit's Hamiltonian; on ion traps they are
typically two hyperfine sublevels; on photonic qubits they are often two polarisation
states; on neutral atoms they are two long-lived atomic states. The
encodings differ by platform (and several platforms admit more than one choice); the abstract Hilbert space does not.

In matrix form, projectors onto the computational basis are

$$
P_0 = |0\rangle\langle 0| = \begin{pmatrix} 1 & 0 \\\\ 0 & 0 \end{pmatrix},
\qquad
P_1 = |1\rangle\langle 1| = \begin{pmatrix} 0 & 0 \\\\ 0 & 1 \end{pmatrix}.
$$

Computational-basis measurement of $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$
yields $0$ with probability $\langle\psi|P_0|\psi\rangle = |\alpha|^2$
and $1$ with probability $|\beta|^2$. The post-measurement state is
$|0\rangle$ or $|1\rangle$ accordingly.

The computational basis is the eigenbasis of the Pauli $Z$ operator:
$Z|0\rangle = +|0\rangle$ and $Z|1\rangle = -|1\rangle$. Saying
"measure in the computational basis" and "measure the observable
$Z$" are the same operation; the only difference is the readout
label ($0/1$ versus $+1/-1$).

## 6.5 Hadamard Basis

The **Hadamard basis** is $\\{|+\rangle, |-\rangle\\}$, the eigenbasis
of the Pauli $X$ operator: $X|+\rangle = +|+\rangle$ and
$X|-\rangle = -|-\rangle$. As column vectors,

$$
|+\rangle = \tfrac{1}{\sqrt{2}}\begin{pmatrix} 1 \\\\ 1 \end{pmatrix},
\qquad
|-\rangle = \tfrac{1}{\sqrt{2}}\begin{pmatrix} 1 \\\\ -1 \end{pmatrix}.
$$

The change-of-basis unitary from computational to Hadamard is the
Hadamard gate $H$ itself:

$$
H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \end{pmatrix},
$$

with $H|0\rangle = |+\rangle$, $H|1\rangle = |-\rangle$, $H|+\rangle = |0\rangle$,
$H|-\rangle = |1\rangle$, and $H^\dagger = H = H^{-1}$ (Hadamard is
its own inverse). Measuring a state $|\psi\rangle$ in the Hadamard
basis is operationally implemented by applying $H$ and then measuring
in the computational basis (§4.10's passive-vs-active distinction:
the same matrix $H$ plays both roles because $H = H^\dagger$).

A computational-basis state in the Hadamard basis has equal-magnitude
amplitudes:

$$
|0\rangle = \tfrac{1}{\sqrt{2}}\bigl(|+\rangle + |-\rangle\bigr),
\qquad
|1\rangle = \tfrac{1}{\sqrt{2}}\bigl(|+\rangle - |-\rangle\bigr),
$$

so a Hadamard-basis measurement of $|0\rangle$ or $|1\rangle$ is
unbiased — $50/50$ between $|+\rangle$ and $|-\rangle$. This is the
single-qubit shadow of the more general principle in §6.10 and
Chapter 11: measurement-basis-mismatched preparation gives maximal
classical entropy at readout.

## 6.6 Circular Basis

The **circular basis** is $\\{|R\rangle, |L\rangle\\}$, the eigenbasis
of the Pauli $Y$ operator: $Y|R\rangle = +|R\rangle$, $Y|L\rangle = -|L\rangle$.
As column vectors,

$$
|R\rangle = \tfrac{1}{\sqrt{2}}\begin{pmatrix} 1 \\\\ i \end{pmatrix},
\qquad
|L\rangle = \tfrac{1}{\sqrt{2}}\begin{pmatrix} 1 \\\\ -i \end{pmatrix},
$$

or equivalently

$$
|R\rangle = \tfrac{1}{\sqrt{2}}\bigl(|0\rangle + i\\, |1\rangle\bigr),
\qquad
|L\rangle = \tfrac{1}{\sqrt{2}}\bigl(|0\rangle - i\\, |1\rangle\bigr).
$$

The letters $R$ and $L$ are mnemonic — for **right** and **left**
circular polarisation, since photonic qubits realise this basis
directly via circular polarisation. On other platforms the same
basis appears as the eigenbasis of $Y$ even though the physical
content is different.

The change-of-basis unitary from computational to circular is

$$
V = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\\\ i & -i \end{pmatrix},
$$

with $V|0\rangle = |R\rangle$ and $V|1\rangle = |L\rangle$. The
inverse $V^\dagger \ne V$ — circular-basis measurement is *not*
implemented just by applying $V$ to the computational-basis
readout; you need $V^\dagger$ (see §4.10 again on active vs passive).

The three pairs $\\{|0\rangle, |1\rangle\\}$, $\\{|+\rangle, |-\rangle\\}$,
$\\{|R\rangle, |L\rangle\\}$ are pairwise **mutually unbiased**: for any
state in one basis, measurement in either of the other two bases is
$50/50$. The three Pauli operators $X$, $Y$, $Z$ pairwise anticommute,
and their eigenbases are precisely these three mutually-unbiased bases
of $\mathbb{C}^2$. The pattern generalises: $n$ qubits admit $2^n + 1$
mutually unbiased bases (the maximal number $d + 1$ in dimension
$d = 2^n$, which exists because $2^n$ is a prime power), and these
structures underlie quantum key distribution protocols (Chapter 27)
and certain randomized algorithms.

## 6.7 Global vs. Relative Phase

Global phase is unobservable on a single qubit, just as it is in any
Hilbert space (§5.8). $|\psi\rangle$ and $e^{i\theta} |\psi\rangle$
produce identical statistics in every measurement basis and identical
expectation values of every observable. On the Bloch sphere (§6.8)
the two are the *same point*.

Relative phase is operationally visible:

- The computational-basis measurement does not see it
  (probabilities are $|\alpha|^2$ and $|\beta|^2$, independent of
  $\arg \beta - \arg \alpha$).
- Any measurement in a basis that *mixes* $|0\rangle$ and $|1\rangle$
  components — Hadamard, circular, anything in between — does see it.
- Any unitary that mixes components (Hadamard, rotations $R_x$ or
  $R_y$, almost everything except $R_z$ and global phase) propagates
  relative phase into amplitude information that subsequent
  computational-basis measurement can read out.

Geometrically the relative phase $\varphi$ in the Bloch parametrisation
$\cos(\theta/2)|0\rangle + e^{i\varphi} \sin(\theta/2)|1\rangle$ is the
*azimuth* of the Bloch vector — its rotation around the $z$-axis.
The $Z$-axis projection $\cos\theta$ depends only on the
computational-basis probabilities; the $X$- and $Y$-axis projections
depend on the relative phase $\varphi$.

## 6.8 The Bloch Sphere

The Bloch sphere is the geometric picture of the single-qubit pure
state space. Every pure state $|\psi\rangle$ corresponds to a unit
vector $\vec{r} \in \mathbb{R}^3$ on the unit sphere; every density
matrix corresponds to a vector $\vec{r}$ with $\\|\vec{r}\\|_2 \le 1$
*inside or on* the unit ball.

**Construction.** For a pure state
$|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\varphi} \sin(\theta/2)|1\rangle$,
the Bloch vector is

$$
\vec{r} = (\sin\theta\cos\varphi,\ \sin\theta\sin\varphi,\ \cos\theta).
$$

The angles $(\theta, \varphi)$ are the standard spherical
coordinates: $\theta$ is the polar angle from the $z$-axis,
$\varphi$ is the azimuthal angle around the $z$-axis.

**The six poles.** The three Pauli eigenbases sit on the three
coordinate axes:

- $|0\rangle$ at the north pole, $\vec{r} = (0, 0, +1)$.
- $|1\rangle$ at the south pole, $\vec{r} = (0, 0, -1)$.
- $|+\rangle$ at $\vec{r} = (+1, 0, 0)$, $|-\rangle$ at $(-1, 0, 0)$.
- $|R\rangle$ at $\vec{r} = (0, +1, 0)$, $|L\rangle$ at $(0, -1, 0)$.

The $Z$, $X$, $Y$ axes correspond to the three Pauli operators in
the obvious way; the axes are *directions* on the Bloch sphere, not
in physical space.

**Density-matrix form.** Any single-qubit density matrix can be
written as

$$
\rho = \tfrac{1}{2}\bigl(I + \vec{r} \cdot \vec{\sigma}\bigr) = \tfrac{1}{2}\bigl(I + r_x X + r_y Y + r_z Z\bigr),
$$

where $\vec{\sigma} = (X, Y, Z)$ is the vector of Pauli matrices.
Conditions:

- $\rho \succeq 0$ iff $\\|\vec{r}\\|_2 \le 1$.
- $\rho$ is *pure* iff $\\|\vec{r}\\|_2 = 1$ (on the sphere).
- $\rho$ is *mixed* iff $\\|\vec{r}\\|_2 < 1$ (inside the ball).
- $\rho$ is *maximally mixed* iff $\vec{r} = 0$ (centre of the ball);
  then $\rho = I/2$, which assigns equal probability to every
  measurement outcome in every basis.

**Why the half-angle.** Antipodal points on the Bloch sphere are
*orthogonal* states in $\mathbb{C}^2$: $|0\rangle$ and $|1\rangle$
are antipodal; $|+\rangle$ and $|-\rangle$ are antipodal; and so
on. But in the underlying Hilbert space, the Hadamard basis is
$\pi/2$ from the computational basis, not $\pi$. The factor of $1/2$
in the angle $\theta/2$ is what reconciles the two. The operational
fact first: rotating the Bloch vector a full $2\pi$ multiplies the
state by $-1$ (a sign a later interference experiment can see), and
only a $4\pi$ rotation restores the state exactly. The mathematical
name for this is the double-cover relation between $\mathrm{SU}(2)$
(acting on the Hilbert space) and $\mathrm{SO}(3)$ (acting on the
Bloch sphere): the Bloch sphere is the projective sphere, and two
opposite points of $\mathrm{SU}(2)$ map to each rotation. The sign
has measurable consequences in multi-qubit interferometry (Chapter 7's
Bell-state phase manipulations are the most accessible example).

**Geometric reading of single-qubit operations.** Single-qubit
unitaries act on the Bloch sphere as *rotations*. Specifically:

- $R_x(\theta) = e^{-i \theta X / 2}$ rotates the Bloch vector by
  angle $\theta$ around the $x$-axis.
- $R_y(\theta) = e^{-i \theta Y / 2}$ rotates by $\theta$ around
  the $y$-axis.
- $R_z(\theta) = e^{-i \theta Z / 2}$ rotates by $\theta$ around
  the $z$-axis.
- Pauli $X$, $Y$, $Z$ are $\pi$-rotations around the corresponding
  axes (up to global phase).
- The Hadamard $H$ is the $\pi$-rotation around the axis
  $(x + z)/\sqrt{2}$ (the diagonal in the $XZ$-plane).
- The phase gate $S = R_z(\pi/2)$ is a $\pi/2$-rotation around $z$,
  and $T = R_z(\pi/4)$ a $\pi/4$-rotation around $z$ — both equalities
  holding up to global phase ($e^{i\pi/4}$ and $e^{i\pi/8}$
  respectively).

Every single-qubit unitary is a rotation of the Bloch sphere by some
angle around some axis. This is the geometric content of the
spectral form: a unitary's eigenvectors point along its rotation
axis (the two antipodal points it fixes), and its eigenvalue phases
encode the rotation angle.

**Measurement on the Bloch sphere.** A projective measurement in
the basis $\\{|b_0\rangle, |b_1\rangle\\}$ corresponds to a *direction*
$\hat{n}$ on the Bloch sphere (the antipodal points $\pm\hat{n}$ are
the two basis states). The outcome probabilities are

$$
p(0) = \tfrac{1}{2}(1 + \vec{r} \cdot \hat{n}),
\qquad
p(1) = \tfrac{1}{2}(1 - \vec{r} \cdot \hat{n}),
$$

so the outcome is biased toward whichever pole the Bloch vector is
closer to. Measurement collapses $\vec{r}$ onto $\pm \hat{n}$ — onto
the pole that won.

## 6.9 Single-Qubit Dynamics

Any single-qubit unitary $U \in \mathrm{U}(2)$ can be written (up to
global phase) as a single rotation:

$$
U = e^{-i \theta\\, (\hat{n} \cdot \vec{\sigma}) / 2} = \cos\!\tfrac{\theta}{2}\\, I - i\\, \sin\!\tfrac{\theta}{2}\\, (\hat{n} \cdot \vec{\sigma}),
$$

for some unit vector $\hat{n} \in \mathbb{R}^3$ and some angle
$\theta \in [0, 2\pi)$. This is the *axis-angle* form. The axis
$\hat{n}$ is the direction the Bloch vector rotates around; the
angle $\theta$ is how far it rotates.

**Three-parameter decomposition.** Up to global phase, every $U \in
\mathrm{SU}(2)$ admits a decomposition

$$
U = R_z(\alpha)\\, R_y(\beta)\\, R_z(\gamma),
$$

with $\alpha, \beta, \gamma$ Euler-like angles (real rotation angles —
unrelated to the complex amplitudes $\alpha, \beta$ of the state; the
letters are simply reused by convention). This is the
single-qubit specialisation of the "every unitary is a product of
generators" pattern; it underwrites every compilation step that
expresses a circuit unitary in terms of a hardware-native gate set
that includes $R_y$ and $R_z$ (Chapter 23).

**Continuous Hamiltonian evolution.** A single-qubit time-independent
Hamiltonian is, up to a constant, of the form
$H = \tfrac{\omega}{2}\\, (\hat{n} \cdot \vec{\sigma})$ for some axis
$\hat{n}$ and frequency $\omega$. The induced evolution

$$
U(t) = e^{-i H t} = e^{-i \omega t\\, (\hat{n} \cdot \vec{\sigma}) / 2}
$$

rotates the Bloch vector around $\hat{n}$ at angular frequency
$\omega$ — *Larmor precession*. This is the physical picture behind
qubit control: a hardware platform implements gates by turning on
a Hamiltonian in a chosen direction for a chosen duration.

## 6.10 Single-Qubit Measurement

Single-qubit projective measurement (§5.4) specialises to the case of
two outcomes. In an arbitrary orthonormal basis
$\\{|b_0\rangle, |b_1\rangle\\}$ corresponding to a Bloch direction
$\hat{n}$, the measurement projectors are
$P_0 = |b_0\rangle\langle b_0| = (I + \hat{n} \cdot \vec{\sigma})/2$
and $P_1 = (I - \hat{n} \cdot \vec{\sigma})/2$. For a state with
Bloch vector $\vec{r}$ the outcome probabilities are

$$
p(0) = \tfrac{1}{2}(1 + \vec{r} \cdot \hat{n}),
\qquad
p(1) = \tfrac{1}{2}(1 - \vec{r} \cdot \hat{n}),
$$

reproducing the formula from §6.8 in operator form. The
post-measurement Bloch vector is $\pm \hat{n}$ — the pole whose
outcome won.

**Operational decomposition.** Realistic hardware can almost always
measure only one basis natively — typically the computational basis.
Measuring in any other basis $\\{|b_0\rangle, |b_1\rangle\\}$ is
implemented in two steps:

1. Apply a single-qubit unitary $U$ that maps the target basis to
   the computational basis: $U|b_0\rangle = |0\rangle$,
   $U|b_1\rangle = |1\rangle$.
2. Measure in the computational basis.

This is the active form of the passive-vs-active distinction from
§4.10: $U^\dagger$ would be the passive coordinate change, while
applying $U$ as a gate is the active operation hardware actually
performs.

For the three standard bases:

- Computational-basis measurement: identity (no gate needed).
- Hadamard-basis measurement: $H$, then computational.
- Circular-basis measurement: $H S^\dagger$, then computational
  (work this out; $S^\dagger$ maps $|R\rangle \leftrightarrow |+\rangle$,
  then $H$ maps to computational).

**Repeated measurement.** A consequence of Postulate 3: a second
projective measurement in the *same* basis immediately after the
first gives the same outcome with probability 1. The first
measurement projects onto an eigenstate of the measurement; the
second has no further effect. This is the basis-aligned-measurement
*idempotence* that the Lüders rule (Chapter 11) encodes.

**Sample complexity.** A single measurement returns one bit (the
outcome). To estimate an unknown amplitude squared $|\alpha|^2$ to
additive error $\epsilon$ with high confidence, you need
$\Theta(1/\epsilon^2)$ measurements in the worst case (§4.14
sampling). One single-qubit measurement is *not* enough to extract
the amplitudes themselves; the squared moduli emerge only as
empirical frequencies of repeated shots. This is the reason
"reading out the state vector" is not a thing real hardware does;
it is also why amplitude-estimation algorithms (Chapter 14) are
interesting — they bend this sample-complexity curve.

---

## 6.11 Bridge to Chapter 7

This chapter handled the single qubit fully: state space (rays in
$\mathbb{C}^2$), the three mutually unbiased bases, the Bloch-sphere
picture, single-qubit dynamics as rotations on the sphere, and
single-qubit projective measurement. The next chapter extends to
multiple qubits — the tensor-product Hilbert space, product states,
entanglement, Bell states, the EPR construction, Bell inequalities,
the Schmidt decomposition as a structural classification of
bipartite pure states, and entanglement as a resource. The
single-qubit material lifts mostly cleanly; the part that does not
is the *correlations* across subsystems, which are where quantum
mechanics genuinely diverges from any classical model. Chapter 7 is
that divergence.

---

[← Previous: Chapter 5](../part-02-formalism/05-postulates.md) · [Table of Contents](../../README.md) · [Next: Chapter 7 →](07-multiple-qubits-and-entanglement.md)
