# Chapter 5. Postulates of Quantum Mechanics for Computing

> **Status:** draft · **Phase:** 1 · **Sections drafted:** 14 / 14

[← Previous: Chapter 4](04-mathematical-background.md) · [Table of Contents](../../README.md) · [Next: Chapter 6 →](../part-03-qubits/06-the-qubit.md)

Chapter 4 set up the mathematical objects — Hilbert spaces, inner
products, Hermitian and unitary operators, tensor products, spectral
decomposition, SVD, Dirac notation. This chapter promotes those
objects to *physical postulates*: rules a quantum-computational system
obeys, stated tightly enough that the rest of the book can derive
algorithms and protocols from them without invoking further physics.

Three points to keep in mind as you read:

1. The postulates are the *idealised* picture — closed-system,
   noise-free, projective measurement only. Real hardware deviates
   from this picture; the deviations are catalogued in Chapter 18
   (noise and decoherence) and the formalism is then extended to
   cover them (quantum channels, POVMs, mixed states). This chapter
   introduces the extensions deliberately so the path from idealised
   to realistic is explicit rather than retrofit.
2. The postulates are stated in *finite-dimensional* form throughout.
   Infinite-dimensional Hilbert spaces (continuous variables, fields)
   appear in Chapter 32 and require additional machinery; for
   gate-model quantum computing the finite-dimensional postulates are
   enough.
3. Every postulate has a *computational fingerprint*: a thing the
   model lets you do that classical computers cannot. The reader
   should leave this chapter able to point at each postulate and name
   the computational capability it underwrites.

> **How to read this chapter.** For Chapter 6 (qubits) and Chapter 7
> (multi-qubit systems), read §§5.1–5.6 carefully — those are the
> closed-system postulates that single- and multi-qubit gate-model
> algorithms rest on. §§5.7–5.8 are conceptual reinforcement of
> material already seen in §4.1 and §4.16; skim on first pass.
> §§5.9–5.12 introduce density matrices and the partial trace; read
> them with care because every later chapter on mixed states, noise,
> open systems, and reduced descriptions depends on them. §§5.13–5.14
> are short impossibility results that bound what later algorithms
> can do and are referenced repeatedly later; read them once and they
> will stay in mind.

## 5.1 Quantum States

**Postulate 1 (states).** An isolated quantum system is associated
with a complex Hilbert space $\mathcal{H}$. A **pure state** of the
system is a ray in $\mathcal{H}$ — an equivalence class of nonzero
vectors under multiplication by any nonzero complex scalar. By
convention we choose a normalized representative: a vector
$|\psi\rangle \in \mathcal{H}$ with $\langle\psi|\psi\rangle = 1$,
unique up to a global phase $e^{i\theta}$.

For an $n$-qubit register the Hilbert space is $\mathcal{H} =
\mathbb{C}^{2^n}$, indexed by the computational basis
$\\{|x\rangle : x \in \\{0,1\\}^n\\}$ in the $x_1$-most-significant
ordering of §4.2.

The postulate says nothing about *which* normalized vector represents
the state at a given time — only that the state space is the unit
sphere of $\mathcal{H}$ modulo global phase. State evolution
(Postulate 2) and measurement (Postulate 4) are what give the
representative its operational content.

Two consequences worth flagging:

- **Superposition is a postulate, not a derived fact.** Because the
  state space is linear, any normalized linear combination
  $\alpha |\psi_1\rangle + \beta |\psi_2\rangle$ with
  $|\alpha|^2 + |\beta|^2 = 1$ is a perfectly good state. Classical
  systems do not have this property; they have *distributions over*
  states, which is different.
- **A state is not a number you measure; it is a generator of
  measurement statistics.** What you observe is always classical
  outcomes; the state is the object that determines their
  probabilities. This is the source of the slogan from §4.14:
  measurement returns samples, not amplitudes.

## 5.2 State Evolution

**Postulate 2 (closed-system evolution).** The evolution of a closed
quantum system over a finite interval is described by a unitary
operator $U$ on $\mathcal{H}$. If the system is in state
$|\psi\rangle$ before the evolution, it is in state $U|\psi\rangle$
after.

Three properties of this postulate are worth naming:

- **Reversibility.** Every unitary has an inverse $U^\dagger = U^{-1}$,
  so closed-system evolution is invertible. Quantum computation in
  the gate model is *information-preserving* by construction.
- **Norm preservation.** $\\|U|\psi\rangle\\| = \\||\psi\rangle\\|$, so
  normalization is preserved automatically and Postulate 1 stays
  consistent without extra bookkeeping.
- **Composition.** If two evolutions $U_1$ and $U_2$ act in sequence,
  the combined evolution is $U_2 U_1$ (with $U_1$ applied first; read
  right-to-left, operator-algebra style).

Quantum *gates* are the elementary $U$'s a hardware platform can
realise; quantum *circuits* are sequences and tensor products of them.
The taxonomy of common gates lives in Chapter 8 and Appendix B; the
fact that they exist at all — that the model permits any unitary, at
least in principle — is the content of this postulate.

Postulate 2 is the postulate that most aggressively departs from
realistic hardware. Real evolutions are not exactly unitary because
the system is not exactly closed: it couples to environmental
degrees of freedom, picks up noise, and decoheres. Chapter 18 promotes
unitary evolution to **completely positive trace-preserving (CPTP)
maps** — also called **quantum channels** — which subsume both unitary
evolution and noise.

## 5.3 The Schrödinger Equation

Postulate 2 names a unitary $U$ but does not say where it comes from
physically. The Schrödinger equation provides the bridge: a
time-independent *Hamiltonian* $H$ (a Hermitian operator) generates
the unitary

$$
U(t) = e^{-i H t / \hbar},
$$

where $\hbar$ is the reduced Planck constant. The state at time $t$,
given state $|\psi(0)\rangle$ at time $0$, is

$$
|\psi(t)\rangle = U(t)\\, |\psi(0)\rangle,
$$

equivalent to the differential form

$$
i \hbar\\, \frac{d}{dt} |\psi(t)\rangle = H\\, |\psi(t)\rangle.
$$

In algorithmic quantum computing we set $\hbar = 1$ and write
$U(t) = e^{-i H t}$. The exponential is the matrix exponential from
§4.7; for a time-independent normal $H$ with spectral decomposition
$H = \sum_i \lambda_i P_i$, the spectral calculus gives
$U(t) = \sum_i e^{-i \lambda_i t} P_i$. This is the calculation behind
every "evolve under Hamiltonian $H$ for time $t$" step in
Hamiltonian-simulation algorithms (Chapter 16).

For a *time-dependent* Hamiltonian $H(t)$ the formula is no longer a
simple exponential; the evolution is given by a time-ordered
exponential

$$
U(t) = \mathcal{T}\\, \exp\!\left(-i \int_0^t H(s)\\, ds\right),
$$

where $\mathcal{T}$ orders the factors in the series expansion so
that earlier-time operators sit to the right. The time-ordered form
matters in adiabatic quantum computing, in continuous-time
formulations of variational algorithms, and any time we discretise
the integral into a Trotter product (Chapter 16).

For most of the gate-model material in this book, the time-independent
form is what we need: a single unitary $U$ acting in a single
discrete step, generated by some implicit Hamiltonian that the
hardware physically realises.

## 5.4 The Measurement Postulate

**Postulate 3 (measurement).** A projective measurement is described
by a complete set of orthogonal projectors $\\{P_m\\}$ on $\mathcal{H}$
satisfying $\sum_m P_m = I$ and $P_m P_{m'} = \delta_{m m'} P_m$. If
the system is in state $|\psi\rangle$ immediately before the
measurement, then outcome $m$ occurs with probability

$$
p(m) = \langle\psi|\\, P_m\\, |\psi\rangle,
$$

and conditioned on outcome $m$ having actually occurred — that is,
provided $p(m) > 0$ — the state immediately after the measurement is

$$
\frac{P_m\\, |\psi\rangle}{\sqrt{p(m)}}.
$$

The probabilities sum to one because the projectors are complete:

$$
\sum_m p(m) = \sum_m \langle\psi|P_m|\psi\rangle = \langle\psi|I|\psi\rangle = \langle\psi|\psi\rangle = 1.
$$

The non-degenerate special case (a measurement in an orthonormal
basis $\\{|b_m\rangle\\}$) gives rank-one projectors
$P_m = |b_m\rangle\langle b_m|$ and the familiar amplitude-squared
rule

$$
p(m) = |\langle b_m | \psi\rangle|^2,
$$

with post-measurement state $|b_m\rangle$ up to global phase. This is
the form circuit-level calculations use most often (§4.6).

Three things to internalise about this postulate:

- **Measurement is irreversible.** The state collapses to the
  projected ray; you cannot recover the pre-measurement
  superposition. This breaks Postulate 2's reversibility and is the
  reason measurements get treated specially in circuit diagrams.
- **Measurement is intrinsically probabilistic.** Even with perfect
  hardware and a perfectly prepared state, repeated measurements of
  the same observable on the same state can yield different outcomes.
  The probabilities are predicted exactly; the individual outcomes
  are not.
- **The measurement basis is part of the experiment.** As §4.15
  trap 11 emphasizes, "what does the state assign to outcomes?" is
  a question that has no answer until a measurement basis is fixed.

The projective form here is the idealised case. The more general
**positive operator-valued measure (POVM)** formalism replaces the
projectors $\\{P_m\\}$ with a family of positive semidefinite
operators $\\{E_m\\}$ satisfying $0 \preceq E_m \preceq I$ and
$\sum_m E_m = I$, with probabilities $p(m) = \langle\psi | E_m | \psi\rangle$.
POVMs capture indirect measurements, noisy detectors, and adaptive
strategies; they are developed in Chapter 11. For most of the
gate-model algorithms in this book the projective form suffices.

## 5.5 Composite Systems

**Postulate 4 (composite systems).** The Hilbert space of a composite
system is the tensor product of the Hilbert spaces of the components.
If system $A$ has Hilbert space $\mathcal{H}_A$ and system $B$ has
$\mathcal{H}_B$, the joint Hilbert space is $\mathcal{H}_A \otimes \mathcal{H}_B$.

This is the postulate that makes quantum computation interesting. For
$n$ qubits, applying the postulate $n$ times gives state space
$\mathbb{C}^2 \otimes \cdots \otimes \mathbb{C}^2 = \mathbb{C}^{2^n}$,
exponential in the number of subsystems. The exponential is *not*
the resource that makes quantum computation powerful (an exponentially
large classical probability distribution is not a powerful resource;
see §4.2 and §4.15 trap 6), but it is a necessary condition: the
state space has to be large enough to host the structure that useful
quantum algorithms exploit.

If $A$ is in state $|\psi\rangle_A$ and $B$ is independently in
state $|\phi\rangle_B$, the joint state is

$$
|\psi\rangle_A \otimes |\phi\rangle_B \in \mathcal{H}_A \otimes \mathcal{H}_B.
$$

States of this form are called **product states**. Most joint states
are *not* of this form — they are **entangled** (§4.8 introduced
this; Chapter 7 develops it fully). Entanglement is the structural
ingredient that distinguishes quantum joint states from classical
joint distributions, and the resource behind teleportation,
superdense coding, and most quantum-algorithm speedups.

Operators on subsystems lift to the composite space by tensor
products: an operator $A$ on $\mathcal{H}_A$ acts on
$\mathcal{H}_A \otimes \mathcal{H}_B$ as $A \otimes I_B$, and
similarly for $B$. A measurement of subsystem $A$ alone — leaving
$B$ untouched — is described by the projectors $\\{P_m \otimes I_B\\}$
in the joint space.

## 5.6 Observables

A measurable quantity in quantum mechanics is represented by a
Hermitian operator on the Hilbert space, called an **observable**.
By the spectral theorem (§4.7), an observable $O$ has a real spectral
decomposition

$$
O = \sum_m \lambda_m\\, P_m,
$$

with real eigenvalues $\lambda_m$ and orthogonal projectors $P_m$
onto the eigenspaces. The eigenvalues $\lambda_m$ are the possible
measurement outcomes; the projectors $P_m$ are exactly the
measurement-postulate projectors from §5.4 for the projective
measurement *associated with the observable* $O$.

The **expectation value** of $O$ in a pure state $|\psi\rangle$ is

$$
\langle O\rangle_\psi = \langle\psi|\\, O\\, |\psi\rangle = \sum_m \lambda_m\\, p(m),
$$

where $p(m) = \langle\psi|P_m|\psi\rangle$ is the probability of
outcome $\lambda_m$. The first equality is operator algebra; the
second is the classical statistical interpretation of the
expectation value — the average of the eigenvalues weighted by the
Born-rule probabilities.

The link between observables and unitaries is the spectral calculus:
if $O$ is Hermitian then $e^{-i O t}$ is unitary, and conversely
any unitary can be written as $U = e^{-i K}$ for some Hermitian $K$
(its *generator*). The standard quantum gates are the unitaries
generated by specific Hamiltonians — for example, the Pauli
matrices are themselves Hermitian observables, and the rotation
gates $R_x(\theta), R_y(\theta), R_z(\theta)$ are the unitaries they
generate via $e^{-i \theta P / 2}$.

A subtle point worth flagging. The measurement postulate (§5.4) is
*basis-centric*: it speaks of orthogonal projectors. The observable
formulation is *quantity-centric*: it speaks of a Hermitian operator
whose eigenvalues are the readout numbers. The two are equivalent for
projective measurements — the projectors are the spectral projectors
of the observable — but the framing depends on what is given:
algorithm designers usually think in terms of measurement bases
(rank-one projectors), physicists in terms of observables (named
Hermitian operators like energy or spin).

## 5.7 Probability Amplitudes vs. Classical Probabilities

Postulates 1 and 3 together imply a relationship between *amplitudes*
(the complex coordinates of $|\psi\rangle$ in a basis) and
*probabilities* (the squared moduli of those amplitudes against the
measurement basis). The relationship is the Born rule from §4.1,
restated here as a consequence of the postulates rather than as a
definition.

For a single-qubit state $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$
with $|\alpha|^2 + |\beta|^2 = 1$, a measurement in the computational
basis returns $0$ with probability $|\alpha|^2$ and $1$ with
probability $|\beta|^2$. So far this looks like a classical
probability distribution with weights $|\alpha|^2$ and $|\beta|^2$.

The difference is *what happens between preparation and measurement*.
A classical probabilistic computer that emits 0 with probability
$|\alpha|^2$ and 1 with probability $|\beta|^2$ is fully described
by those two weights; there is no further structure. A quantum
computer is described by the *amplitudes* $\alpha$ and $\beta$, which
are complex numbers carrying both magnitude and phase. The phase
encodes how the state interferes when later operations are applied.

Concretely: the two states $(|0\rangle + |1\rangle)/\sqrt{2}$ and
$(|0\rangle - |1\rangle)/\sqrt{2}$ both give probability $1/2$ for
each computational-basis outcome. As probability distributions they
are identical. As *quantum states* they are orthogonal —
$\langle + | - \rangle = 0$ — and a Hadamard followed by a
computational-basis measurement deterministically distinguishes
them (§4.1, repeated for emphasis).

This is the fundamental reason quantum and classical probabilistic
computation diverge: a classical probabilistic computer has a
distribution; a quantum computer has a vector whose squared moduli
*give* a distribution at measurement time but which carries more
structure than the distribution alone. That additional structure is
phase, and the operations that move it are unitaries.

## 5.8 Global vs. Relative Phase

A state $|\psi\rangle$ and $e^{i\theta}|\psi\rangle$ represent the
same physical state — they sit on the same ray in $\mathcal{H}$ and
produce identical statistics under every possible measurement. The
phase $e^{i\theta}$ is **global**. Postulate 1 builds this
indistinguishability into the definition of "state" (rays, not
vectors).

A state $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ has a
**relative phase** between its two components — the phase of
$\beta/\alpha$, or equivalently the phase of $\langle 1|\psi\rangle$
relative to $\langle 0|\psi\rangle$. Multiplying *one component but
not the other* by $e^{i\theta}$ is a different state. It looks the
same in computational-basis measurement statistics (squared moduli
are unchanged), but it interferes differently under any subsequent
unitary that mixes the two components.

This is the most important conceptual difference between the quantum
state space and the probability simplex. The Born rule throws away
global phase but preserves relative phase; that asymmetry is what
makes interference work.

In computational terms:

- **Global phase** is unobservable. Algorithms that produce
  $e^{i\theta}|\psi\rangle$ instead of $|\psi\rangle$ are correct;
  the global phase cancels in every measurement and in every later
  expectation value.
- **Relative phase** is operationally meaningful. It can be
  *prepared* (by phase gates like $S$, $T$, $R_z$), *manipulated*
  (by basis-changing gates like $H$), and *converted to amplitude
  information* (by interference followed by measurement in a basis
  that overlaps with both components).

A small but important corollary: most quantum algorithms can be
analysed *up to global phase*. If your derivation produces a state
that differs from the textbook answer by a leading $e^{i\theta}$,
you are correct.

## 5.9 Pure vs. Mixed States

Postulate 1 describes *pure* states — single rays in Hilbert space.
A quantum system can also be in a *mixed* state, by which we mean
one of the following operational situations:

- The state was prepared probabilistically: with probability $p_x$
  the system is in pure state $|\psi_x\rangle$, and we know the
  distribution $\\{p_x\\}$ but not which specific $|\psi_x\rangle$ was
  actually prepared.
- The system is part of a larger composite system that is in a pure
  entangled state, and we are looking only at the subsystem. The
  rest of the composite system carries information that, if
  ignored, makes the local subsystem effectively probabilistic.

These two situations look distinguishable at a glance, but the
*observable consequences* are exactly the same: every measurement on
the system, every expectation value of every observable, gives
identical statistics in both cases provided the underlying ensembles
or reduced states match. The formalism that captures both at once,
without distinguishing them operationally, is the density matrix.

We will use the term **mixed state** for any state described by a
density matrix that is not a rank-one projector. **Pure state** is
reserved for rays / rank-one projectors; pure states are the special
case where the ensemble has a single member with probability one or
the larger system is itself a product state.

Why bother with mixed states in a "computing" book? Three reasons:

- **Realistic hardware is noisy.** Imperfect gates and decoherence
  effectively mix the state with environmental degrees of freedom;
  the experimentally accessible description is mixed.
- **Subsystems of entangled states are mixed.** Even on perfect
  hardware, the reduced description of part of an entangled state
  is a mixed state. Local protocols (e.g., quantum teleportation
  from Alice's side) cannot avoid this.
- **Some protocols are inherently probabilistic.** Random ensembles,
  classical mixtures of states, and measurement-based feed-forward
  all need the formalism.

The next three sections give the formalism.

## 5.10 Density Matrices

A **density matrix** (or density *operator*) $\rho$ on a Hilbert
space $\mathcal{H}$ is a Hermitian, positive semidefinite operator
with unit trace:

$$
\rho^\dagger = \rho, \qquad \rho \succeq 0, \qquad \mathrm{tr}(\rho) = 1.
$$

Equivalently, $\rho$ is any operator that can be written as a
**convex combination** of rank-one projectors:

$$
\rho = \sum_x p_x\\, |\psi_x\rangle\langle\psi_x|,
$$

with $p_x \ge 0$, $\sum_x p_x = 1$, and the $|\psi_x\rangle$
normalized (not necessarily orthogonal). This expansion is one
realisation of $\rho$ as an ensemble; there are infinitely many
different ensembles producing the same density matrix (a subtle
point developed in Chapter 12).

Two extreme cases:

- **Pure state**: $\rho = |\psi\rangle\langle\psi|$ is a rank-one
  projector. The defining property is $\rho^2 = \rho$, or
  equivalently $\mathrm{tr}(\rho^2) = 1$.
- **Maximally mixed state on $n$ qubits**: $\rho = I / 2^n$. Every
  computational-basis outcome is equally likely, and the same is
  true for measurement in any orthonormal basis. The maximally
  mixed state carries no information about the system.

The quantity $\mathrm{tr}(\rho^2) \in (0, 1]$ is the **purity** of
$\rho$, with $\mathrm{tr}(\rho^2) = 1$ for pure states and
$\mathrm{tr}(\rho^2) = 1/d$ for the maximally mixed state in dimension
$d$.

Density matrices generalise both the measurement postulate and the
evolution postulate.

**Born rule, density-matrix form.** The probability of outcome $m$
under projective measurement $\\{P_m\\}$ is

$$
p(m) = \mathrm{tr}(P_m\\, \rho),
$$

and the post-measurement state (conditioned on outcome $m$, with
$p(m) > 0$) is

$$
\rho_m = \frac{P_m\\, \rho\\, P_m}{p(m)}.
$$

For a pure $\rho = |\psi\rangle\langle\psi|$, this reduces to
$p(m) = \langle\psi|P_m|\psi\rangle$ as in §5.4.

**Unitary evolution, density-matrix form.** A unitary $U$ acts on
$\rho$ by conjugation:

$$
\rho \mapsto U\\, \rho\\, U^\dagger.
$$

For a pure $\rho = |\psi\rangle\langle\psi|$ this is
$U|\psi\rangle\langle\psi|U^\dagger = (U|\psi\rangle)(U|\psi\rangle)^\dagger$,
consistent with $|\psi\rangle \mapsto U|\psi\rangle$ from §5.2.

**Expectation value, density-matrix form.** For an observable $O$
and state $\rho$,

$$
\langle O\rangle_\rho = \mathrm{tr}(\rho\\, O).
$$

The trace expression is the Hilbert-Schmidt inner product (§4.4)
between $\rho$ and $O$, which is the operator-level home of all
expectation-value calculations regardless of whether the state is
pure or mixed. This is the form actually used in practice: a single
line of operator algebra handles both ensembles and pure states.

## 5.11 Reduced States

Suppose a composite system $A B$ is in a joint state
$\rho_{AB}$ on $\mathcal{H}_A \otimes \mathcal{H}_B$, and we want
the local description of subsystem $A$ alone — for example, because
we only have access to qubits on Alice's side of an entangled pair.
The local description is the **reduced state**

$$
\rho_A = \mathrm{tr}_B(\rho_{AB}),
$$

where $\mathrm{tr}_B$ is the partial trace over $B$, defined in §5.12.

$\rho_A$ is a density matrix on $\mathcal{H}_A$ alone. It is the
unique operator with the property that *every measurement on
subsystem $A$ gives the same statistics under $\rho_A$ as under
$\rho_{AB}$*:

$$
\mathrm{tr}_A\bigl((M_A \otimes I_B)\\, \rho_{AB}\bigr) = \mathrm{tr}\bigl(M_A\\, \rho_A\bigr)
$$

for every operator $M_A$ on $\mathcal{H}_A$. This is the *operational*
characterisation of the partial trace: it is whatever map gives the
right local statistics. The formula in §5.12 is one constructive
implementation.

The central computational fact: **the reduced state of an entangled
pure joint state is mixed**. Concretely, for the Bell state

$$
|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}},
$$

the joint density matrix is the rank-one projector
$|\Phi^+\rangle\langle\Phi^+|$ (a pure state, $\mathrm{tr}(\rho^2) = 1$),
but the reduced state on either qubit is

$$
\rho_A = \mathrm{tr}_B\bigl(|\Phi^+\rangle\langle\Phi^+|\bigr) = \tfrac{1}{2}\\, |0\rangle\langle 0| + \tfrac{1}{2}\\, |1\rangle\langle 1| = \tfrac{1}{2}\\, I,
$$

the maximally mixed state on one qubit. Whole pure, part maximally
mixed. This is how entanglement manifests at the subsystem level
(§4.8 introduced the example; here we have the full operational
machinery to explain it).

The reduced-state construction is the formal mechanism behind every
"trace out the environment" argument in noise modelling, every
local-only protocol analysis in quantum communication, and the
information-theoretic measures of entanglement in Chapter 12.

## 5.12 Partial Trace

Given a bipartite operator $X_{AB}$ on $\mathcal{H}_A \otimes \mathcal{H}_B$,
the **partial trace** over $B$ is a linear map
$\mathrm{tr}_B(X_{AB})$ that returns an operator on $\mathcal{H}_A$
alone. Three equivalent definitions:

**Definition by action on product operators.** For operators $A$ on
$\mathcal{H}_A$ and $B$ on $\mathcal{H}_B$,

$$
\mathrm{tr}_B(A \otimes B) = A\\, \mathrm{tr}(B).
$$

Extend linearly to arbitrary bipartite operators
$X_{AB} = \sum_i A_i \otimes B_i$.

**Definition by basis expansion.** Choose an orthonormal basis
$\\{|j\rangle_B\\}$ of $\mathcal{H}_B$. Then

$$
\mathrm{tr}_B(X_{AB}) = \sum_j (I_A \otimes \langle j|_B)\\, X_{AB}\\, (I_A \otimes |j\rangle_B).
$$

The result does not depend on the basis chosen.

**Definition by partial-trace formula on matrix entries.** If
$X_{AB}$ has matrix entries $X^{a a', b b'}$ in a tensor-product
basis $|a\rangle|b\rangle$, then $\mathrm{tr}_B(X_{AB})$ has entries

$$
[\mathrm{tr}_B(X_{AB})]^{a a'} = \sum_b X^{a a', b b}.
$$

The three definitions agree; pick whichever is convenient.

**Properties.**

- **Linearity.** $\mathrm{tr}_B(\alpha X + \beta Y) = \alpha\\, \mathrm{tr}_B(X) + \beta\\, \mathrm{tr}_B(Y)$.
- **Trace preservation.** $\mathrm{tr}_A(\mathrm{tr}_B(\rho_{AB})) = \mathrm{tr}(\rho_{AB})$. Tracing out one subsystem and then the other gives the same scalar as tracing the joint operator.
- **Positivity preservation.** If $\rho_{AB} \succeq 0$ then $\mathrm{tr}_B(\rho_{AB}) \succeq 0$. So reduced states of density matrices are density matrices.
- **Cyclic for operators on $B$.** $\mathrm{tr}_B((I_A \otimes M_B) X_{AB}) = \mathrm{tr}_B(X_{AB} (I_A \otimes M_B))$ when $M_B$ acts only on $B$. The non-local part stays put.
- **Product states factor.** If $\rho_{AB} = \rho_A \otimes \rho_B$ is a product state then $\mathrm{tr}_B(\rho_{AB}) = \rho_A$ (using $\mathrm{tr}(\rho_B) = 1$). Product states give product reductions; the reductions of entangled states are non-product.

**Worked example: Bell state.** With
$|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt{2}$,

$$
|\Phi^+\rangle\langle\Phi^+| = \tfrac{1}{2}\bigl(|00\rangle\langle 00| + |00\rangle\langle 11| + |11\rangle\langle 00| + |11\rangle\langle 11|\bigr).
$$

Tracing over the second qubit (using $\mathrm{tr}(|0\rangle\langle 0|) = \mathrm{tr}(|1\rangle\langle 1|) = 1$ and $\mathrm{tr}(|0\rangle\langle 1|) = \mathrm{tr}(|1\rangle\langle 0|) = 0$):

$$
\mathrm{tr}_2\bigl(|\Phi^+\rangle\langle\Phi^+|\bigr) = \tfrac{1}{2}\\, |0\rangle\langle 0| + \tfrac{1}{2}\\, |1\rangle\langle 1| = \tfrac{1}{2}\\, I.
$$

The cross terms (the *coherences*) vanish when their partner subsystem
is traced out. That vanishing is exactly what makes the reduced state
mixed despite the joint state being pure.

> **Sanity check.** Compute $\mathrm{tr}_2(|00\rangle\langle 00|)$
> and $\mathrm{tr}_2(|\psi\rangle\langle\psi|)$ for the product state
> $|\psi\rangle = (|00\rangle + |01\rangle)/\sqrt{2} = |0\rangle \otimes |+\rangle$.
> Verify that the first equals $|0\rangle\langle 0|$ and the second
> equals $|0\rangle\langle 0|$ as well — the second qubit's
> coherences are still there in the joint state, but tracing them
> out of a product state still gives a pure reduced state because
> the subsystems were never entangled in the first place.

## 5.13 No-Cloning Theorem

**Theorem (no-cloning, Wootters and Zurek 1982; Dieks 1982).** There
is no unitary $U$ on $\mathcal{H} \otimes \mathcal{H}$ and no fixed
"blank" state $|\text{blank}\rangle$ such that

$$
U\bigl(|\psi\rangle \otimes |\text{blank}\rangle\bigr) = |\psi\rangle \otimes |\psi\rangle
$$

for every $|\psi\rangle \in \mathcal{H}$.

**Proof.** Suppose such a $U$ exists. Apply it to two distinct
states $|\psi\rangle$ and $|\phi\rangle$:

$$
U\bigl(|\psi\rangle \otimes |\text{blank}\rangle\bigr) = |\psi\rangle \otimes |\psi\rangle,
\qquad
U\bigl(|\phi\rangle \otimes |\text{blank}\rangle\bigr) = |\phi\rangle \otimes |\phi\rangle.
$$

Take the inner product of these two equations. The left-hand side,
using that $U$ is unitary and therefore preserves inner products, is

$$
\bigl(\langle\psi| \otimes \langle\text{blank}|\bigr)\bigl(|\phi\rangle \otimes |\text{blank}\rangle\bigr) = \langle\psi|\phi\rangle\\, \langle\text{blank}|\text{blank}\rangle = \langle\psi|\phi\rangle.
$$

The right-hand side is

$$
\bigl(\langle\psi| \otimes \langle\psi|\bigr)\bigl(|\phi\rangle \otimes |\phi\rangle\bigr) = \langle\psi|\phi\rangle^2.
$$

So $\langle\psi|\phi\rangle = \langle\psi|\phi\rangle^2$, which forces
$\langle\psi|\phi\rangle \in \\{0, 1\\}$ for every pair. But that
contradicts the existence of arbitrary $|\psi\rangle, |\phi\rangle$
with non-trivial overlap (e.g., $|0\rangle$ and $|+\rangle$, which
have overlap $1/\sqrt{2}$). Hence no such $U$ exists. ∎

The theorem says you cannot make a perfect copy of an unknown
quantum state. This single fact has wide consequences:

- **No general state amplification.** You cannot turn a single qubit
  into ten identical copies and then measure each to gather more
  information than the original carried; the additional copies
  cannot be produced.
- **Quantum key distribution is secure.** An eavesdropper cannot
  silently copy quantum-encoded key bits, because the copying
  operation does not exist (BB84, Chapter 27).
- **Quantum error correction has to be cleverer than classical
  repetition.** You cannot just make three copies of an unknown
  qubit and majority-vote. The codes in Chapter 19 work around this
  by encoding logical information into entangled multi-qubit
  states.

The no-cloning theorem does *not* forbid copying *known* states (you
can prepare as many copies of $|0\rangle$ as you want, because you
know it is $|0\rangle$), nor copying classical bits embedded in
quantum states (a CNOT with computational-basis input does exactly
that). It only forbids a universal cloner that works on arbitrary
unknown inputs.

A related statement: **approximate cloning is possible but bounded**.
The optimal fidelity of an approximate universal $1 \to 2$ cloner
on a qubit is $5/6$ — strictly less than perfect — and the bound
sharpens as you ask for more copies. This is the basis of
Chapter 27's analysis of attacks on quantum cryptographic protocols.

## 5.14 No-Deleting Theorem

**Theorem (no-deleting, Pati and Braunstein 2000).** There is no
unitary $U$ on $\mathcal{H} \otimes \mathcal{H}$ and no fixed
"blank" state $|\text{blank}\rangle$ such that

$$
U\bigl(|\psi\rangle \otimes |\psi\rangle\bigr) = |\psi\rangle \otimes |\text{blank}\rangle
$$

for every $|\psi\rangle$.

In other words, given two identical copies of an unknown quantum
state, you cannot deterministically reduce them to one copy by
*deleting* the second. The proof is structurally similar to
no-cloning: assume the map exists, apply it to two distinct
$|\psi\rangle$ and $|\phi\rangle$, take inner products, and obtain
the contradiction $\langle\psi|\phi\rangle^2 = \langle\psi|\phi\rangle$.

Together, no-cloning and no-deleting say something stronger than
either alone: information in unknown quantum states cannot be
duplicated *or* erased by closed-system unitary operations. Quantum
information is *conserved* in a way classical information is not.
Classical bits can be freely copied (printer, hard drive, network
broadcast) and freely erased (`rm -f`); quantum bits cannot.

Three consequences worth naming:

- **Reversible deletion only.** The closest analogue of "delete a
  qubit" is to interact it with an environment so that the
  information ends up somewhere — not to make it vanish. The
  environmental degrees of freedom carry whatever was deleted.
- **Conservation of information** under closed-system evolution is
  why noise has to be modelled via quantum channels (Chapter 18)
  rather than pretending information just "leaks away." The
  information goes somewhere; if you cannot track it, you describe
  the local subsystem as mixed.
- **Quantum garbage collection is non-trivial.** In algorithm design,
  ancilla qubits used as scratch space have to be *uncomputed* —
  evolved back to a known state by the inverse of the unitary that
  set them up — rather than simply discarded. Otherwise the ancillas
  remain entangled with the main register and contaminate it. The
  uncomputation technique is fundamental to building large reversible
  circuits (Chapter 9).

---

## 5.15 Bridge to Chapter 6

This chapter promoted the linear-algebra objects of Chapter 4 to
physical postulates and developed the density-matrix formalism that
later chapters will use to handle mixed states, subsystems, and noise.
Chapter 6 specialises the postulates to a single qubit — the
two-dimensional Hilbert space $\mathbb{C}^2$ — and develops the
geometric picture (the Bloch sphere), the standard bases (computational,
Hadamard, circular), single-qubit dynamics, and the way a single
projective measurement interacts with a single qubit state. The
postulates of this chapter are the rulebook; Chapter 6 is the first
worked-out application of that rulebook to the simplest non-trivial
system.

---

[← Previous: Chapter 4](04-mathematical-background.md) · [Table of Contents](../../README.md) · [Next: Chapter 6 →](../part-03-qubits/06-the-qubit.md)
