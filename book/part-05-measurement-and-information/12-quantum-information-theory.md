# Chapter 12. Quantum Information Theory

> **Status:** draft · **Phase:** 2 · **Sections drafted:** 13 / 13

[← Previous: Chapter 11](11-measurement-theory.md) · [Table of Contents](../../README.md) · [Next: Chapter 13 →](../part-06-algorithms/13-quantum-algorithms-mindset.md)

Chapter 11 explained *how* a quantum measurement is described — projectors,
POVMs, the Born rule, post-measurement states. This chapter steps up one
level and asks a quantitative question: *how much information* does a
quantum state carry, and *how well* can two states be told apart? The
answers are the foundation that quantum cryptography (Chapter 27), quantum
channel capacities (Chapter 18), and quantum error correction
(Chapters 19–22) all rest on.

Three points to keep in mind:

1. Quantum information theory is a strict generalisation of Shannon's
   classical information theory. Every classical theorem has a quantum
   shadow — sometimes with the same form, sometimes with a strict
   inequality replaced by an equality, and sometimes with a sign that
   flips and produces something genuinely without classical analogue
   (the negative quantum conditional entropy of §12.4 is the canonical
   example).
2. Most quantities in this chapter are defined for **density matrices**,
   not state vectors, because the natural setting is open systems,
   subsystems, and ensembles. Chapter 5's mixed-state formalism is the
   prerequisite that every section here uses.
3. Operational meanings matter more than the algebraic definitions. The
   von Neumann entropy is *the* compression rate (§12.9); the trace
   distance *is* the optimal distinguishability bound (§12.6); the
   Holevo quantity *is* a ceiling on extractable classical information
   (§12.5). Each section names the formula and then the protocol that
   makes the formula physically meaningful.

> **How to read this chapter.** §§12.1–12.3 are the classical-information
> warm-up and the von Neumann entropy; read them carefully because every
> later section reduces to them in some limit. §§12.4–12.5 (conditional
> entropy, Holevo bound) are conceptually the most surprising and deserve
> a slow first pass. §§12.6–12.7 (trace distance, fidelity) are
> bread-and-butter distance measures used constantly in the rest of the
> book and can be skimmed for definitions and revisited for proofs.
> §§12.8–12.10 (Schumacher compression, channel capacities) preview
> material expanded in Part 8 (error correction) and Part 12 (cryptography) and can be read at "what's the
> headline result" depth on a first pass. §§12.11–12.12 collect the
> no-go theorems and the LOCC resource picture; both are short and worth
> rereading once the channel-capacity sections settle.

## 12.1 Shannon Entropy and Operational Meaning

The **Shannon entropy** of a discrete probability distribution $p$ over
outcomes $\\{x_1, \dots, x_n\\}$ is

$$
H(p) = -\sum_i p(x_i)\\, \log_2 p(x_i),
$$

with the convention $0 \log 0 = 0$. It is a real number between $0$ and
$\log_2 n$, with the minimum attained by deterministic distributions and
the maximum by the uniform distribution. The units are *bits* when the
logarithm is base $2$, and we keep that convention throughout the chapter
unless explicitly stated otherwise.

The *operational* meaning of $H(p)$ is the headline result of classical
information theory: **Shannon's source-coding theorem** says that an
i.i.d. source producing letters with distribution $p$ can be compressed,
asymptotically, to $H(p)$ bits per letter — and not fewer. More
precisely, for any rate $R > H(p)$ there is a compression scheme of
block length $n$ achieving vanishing error as $n \to \infty$; for any
rate $R < H(p)$ no such scheme exists. The entropy is the *minimum
expected description length* of the source.

Two derived quantities recur throughout the chapter. The **joint
entropy** of a pair $(X, Y)$ with joint distribution $p(x, y)$ is

$$
H(X, Y) = -\sum_{x, y} p(x, y)\\, \log_2 p(x, y),
$$

and the **conditional entropy** of $Y$ given $X$ is

$$
H(Y \mid X) = H(X, Y) - H(X) = \sum_x p(x)\\, H(Y \mid X = x).
$$

Both are non-negative for classical distributions — the conditional
entropy of a classical variable cannot be negative because, conditioned
on $X = x$, $Y$ is still a distribution and entropies of distributions
are non-negative. Section 12.4 shows that this non-negativity *fails*
for quantum conditional entropy, which is one of the cleanest signatures
that quantum information is not just probability theory in disguise.

The **classical mutual information**

$$
I(X; Y) = H(X) + H(Y) - H(X, Y) = H(X) - H(X \mid Y)
$$

measures how much knowing $Y$ reduces uncertainty about $X$, or
symmetrically. It is non-negative, zero iff $X$ and $Y$ are independent,
and bounded above by $\min(H(X), H(Y))$. Most of the quantum
generalisations in this chapter inherit one of these properties and
break one of the others.

## 12.2 Von Neumann Entropy

The **von Neumann entropy** of a density matrix $\rho$ is

$$
S(\rho) = -\mathrm{tr}(\rho \log_2 \rho),
$$

defined via the spectral calculus (§4.7): if $\rho = \sum_i \lambda_i |v_i\rangle\langle v_i|$
is the spectral decomposition, then
$S(\rho) = -\sum_i \lambda_i \log_2 \lambda_i$ with the convention
$0 \log 0 = 0$. The von Neumann entropy is exactly the Shannon entropy
of the eigenvalue distribution of $\rho$. Equivalently, it is the
Shannon entropy of the *measurement outcomes* of the projective
measurement that diagonalises $\rho$ — any other measurement basis can
only increase the entropy (a special case of the data-processing
inequality below).

Three immediate properties:

- **Range.** $0 \le S(\rho) \le \log_2 d$ on a $d$-dimensional space.
  $S(\rho) = 0$ iff $\rho$ is pure; $S(\rho) = \log_2 d$ iff
  $\rho = I/d$ is maximally mixed.
- **Unitary invariance.** $S(U \rho U^\dagger) = S(\rho)$ for every
  unitary $U$. Entropy is a function of the spectrum, and unitary
  conjugation preserves the spectrum.
- **Concavity.** $S\bigl(\sum_i p_i \rho_i\bigr) \ge \sum_i p_i S(\rho_i)$.
  Mixing increases uncertainty.

For composite systems, two subadditivity statements are central. Let
$\rho_{AB}$ be a bipartite state with reduced states
$\rho_A = \mathrm{tr}_B(\rho_{AB})$ and $\rho_B = \mathrm{tr}_A(\rho_{AB})$.

- **Subadditivity:** $S(\rho_{AB}) \le S(\rho_A) + S(\rho_B)$, with
  equality iff $\rho_{AB} = \rho_A \otimes \rho_B$ is a product state.
- **Strong subadditivity (Lieb–Ruskai 1973):** for any tripartite state
  $\rho_{ABC}$,

$$
S(\rho_{ABC}) + S(\rho_B) \le S(\rho_{AB}) + S(\rho_{BC}).
$$

Strong subadditivity is the deepest single inequality in quantum
information theory; almost every later capacity formula and
distinguishability bound in this chapter, in Chapter 18, and in the
quantum-error-correction literature ultimately leans on it. The
classical-Shannon analogue is provable in a few lines; the quantum
proof is famously non-trivial and the result was open for several
years before Lieb and Ruskai settled it.

For the **classical limit**, when $\rho = \sum_i p_i |i\rangle\langle i|$
is diagonal in some orthonormal basis, $S(\rho) = H(p)$ exactly. So
von Neumann entropy contains Shannon entropy as the diagonal case, and
all the classical inequalities (non-negativity, subadditivity, mutual
information identities) reduce to their classical statements when the
states involved commute.

## 12.3 Quantum Mutual Information

The **quantum mutual information** of a bipartite state $\rho_{AB}$ is

$$
I(A : B)_\rho = S(\rho_A) + S(\rho_B) - S(\rho_{AB}).
$$

By subadditivity, $I(A : B)_\rho \ge 0$, with equality iff
$\rho_{AB} = \rho_A \otimes \rho_B$. The form is identical to the
classical $I(X; Y) = H(X) + H(Y) - H(X, Y)$, but the *range* is
strictly larger in the quantum case. For a maximally entangled
two-qubit state $|\Phi^+\rangle$,

$$
S(\rho_A) = S(\rho_B) = 1, \qquad S(\rho_{AB}) = 0, \qquad I(A:B) = 2.
$$

Classically, the mutual information of two bits is at most
$\min(H(X), H(Y)) \le 1$. Quantumly, $I(A:B)$ can reach $2 \log_2 d$ on a
maximally entangled state of two $d$-dimensional systems — *twice* the
classical ceiling. This factor-of-two gap is the quantitative
fingerprint of entanglement at the mutual-information level: entangled
states carry correlations of a strictly stronger kind than any joint
classical distribution can.

The quantum mutual information satisfies a **data-processing
inequality**: for any quantum channel $\mathcal{N}_{B \to B'}$ acting
on the $B$ side,

$$
I(A : B')_{(\mathrm{id}_A \otimes \mathcal{N})\rho} \le I(A : B)_\rho.
$$

Local processing on one side cannot increase mutual information. The
classical analogue is the standard data-processing inequality for
classical mutual information; the quantum version is a corollary of
strong subadditivity (§12.2). Many converse bounds in this chapter —
the Holevo bound (§12.5), the channel-capacity upper bounds (§12.10) —
are data-processing-inequality arguments in disguise.

A useful refinement is the **coherent information**

$$
I_c(A \rangle B)_\rho = S(\rho_B) - S(\rho_{AB}),
$$

which we will meet again in §12.10 as the building block of the quantum
channel capacity. Unlike $I(A:B)$, the coherent information can be
negative — in fact, for a product state it equals $-S(\rho_A)$, which
is strictly negative whenever $\rho_A$ is mixed. The sign of $I_c$
reflects how much *quantum* correlation $\rho_{AB}$ contains beyond what
the marginal $\rho_B$ already accounts for.

## 12.4 Conditional Entropy and Its Negative Sign

By analogy with the classical formula $H(Y \mid X) = H(X, Y) - H(X)$, the
**quantum conditional entropy** is defined as

$$
S(A \mid B)_\rho = S(\rho_{AB}) - S(\rho_B).
$$

The startling fact is that this quantity *can be negative*. For the
Bell state $|\Phi^+\rangle$ on $AB$,
$S(\rho_{AB}) = 0$ and $S(\rho_B) = 1$, so

$$
S(A \mid B)_{\Phi^+} = -1.
$$

Classically, conditioning on a variable cannot make you *more* than
maximally uncertain — entropy is bounded below by zero. Quantumly,
conditioning on a system $B$ that is entangled with $A$ produces a
*negative* number, and there is no Shannon analogue of what that number
means.

The operational meaning was found by Horodecki, Oppenheim, and Winter
(2005) in the **state-merging protocol** (sometimes called the *mother
protocol*). Two parties Alice and Bob share many copies of $\rho_{AB}$
along with a third reference system $R$ that purifies the global state.
Alice wants to transfer her share $A$ to Bob while preserving
correlations with $R$. The asymptotic rate of *quantum communication*
Alice needs to send is

$$
Q = S(A \mid B)_\rho \quad \text{when this is non-negative,}
$$

and when $S(A \mid B)_\rho$ is negative, Alice not only needs no quantum
communication — she and Bob *extract* $|S(A \mid B)|$ ebits of distilled
entanglement per copy, free of charge, as a byproduct of merging. A
negative conditional entropy is *exactly* the rate at which entanglement
falls out of the protocol. The classical-Shannon picture has no slot
for this sign because classical state merging never produces entanglement.

This protocol also gives an operational reading of the coherent
information from §12.3: $I_c(A \rangle B) = -S(A \mid B)$, so positive
coherent information is the same statement as negative quantum
conditional entropy. The two quantities differ only in sign and
intended emphasis.

The state-merging account given here is one of two standard, equivalent
formulations of the Horodecki–Oppenheim–Winter result; the other casts
the same content as a quantum-communication-versus-shared-entanglement
trade-off (the "fully quantum Slepian–Wolf" picture), so a reader who
learned it in that form is looking at the same theorem.

## 12.5 The Holevo Bound

Classical information has to be encoded into quantum states to be
transmitted by a quantum channel. The encoding side prepares a state
$\rho_x$ for each classical message $x$ drawn from a distribution $p_x$;
the decoding side performs some measurement and obtains a classical
outcome $Y$. The natural question is: how much classical information,
in bits per channel use, can be conveyed this way?

For *any* measurement strategy, the resulting classical mutual
information $I(X; Y)$ is bounded by the **Holevo quantity**

$$
\chi(\\{p_x, \rho_x\\}) = S(\rho) - \sum_x p_x\\, S(\rho_x), \qquad
\rho = \sum_x p_x \rho_x.
$$

This is the **Holevo bound** (Holevo 1973): the accessible classical
information of a quantum ensemble is at most $\chi$. The proof is a
direct application of strong subadditivity to the
classical-quantum state $\sum_x p_x |x\rangle\langle x| \otimes \rho_x$.

Two consequences are worth stating cleanly:

- **One qubit carries at most one classical bit.** Since
  $\chi \le S(\rho) \le \log_2 d$ for a $d$-dimensional carrier, a
  single qubit ($d = 2$) cannot convey more than $1$ classical bit of
  accessible information per use. Superdense coding (§7.12) reaches the
  $2$-bit ceiling only with the *assistance* of a pre-shared ebit — it
  does not violate the bound, it spends an extra resource.
- **Pure-state ensembles saturate at $S(\rho)$.** When every $\rho_x$ is
  pure, $S(\rho_x) = 0$ and $\chi = S(\rho)$. The Holevo information
  then equals the entropy of the *average* state — and for an ensemble
  of $2^n$ orthogonal computational-basis kets this is exactly $n$
  bits, the classical capacity.

Holevo's bound is one half of the **HSW theorem** (Holevo 1998,
Schumacher–Westmoreland 1997) that gives the classical capacity
$C(\mathcal{N})$ of a quantum channel; §12.10 returns to the full
statement.

## 12.6 Trace Distance

The **trace distance** between two density matrices $\rho$ and $\sigma$
is

$$
D(\rho, \sigma) = \tfrac{1}{2}\\, \\|\rho - \sigma\\|_1,
$$

where $\\|A\\|_1 = \mathrm{tr}\sqrt{A^\dagger A}$ is the trace norm
(§4.9). It is a true metric on density matrices: non-negative,
symmetric, satisfies the triangle inequality, and vanishes iff
$\rho = \sigma$. The factor of $1/2$ normalises the range to $[0, 1]$,
with $D = 0$ on identical states and $D = 1$ on states with orthogonal
support.

The operational meaning is **optimal distinguishability**. Consider the
state-discrimination problem: a coin flip selects $\rho$ or $\sigma$
with equal prior probability, and a single copy is presented; the task
is to guess which one was prepared, with the best possible measurement.
The Helstrom bound says the maximum success probability is

$$
p_{\mathrm{succ}}^{\mathrm{opt}} = \tfrac{1}{2} + \tfrac{1}{2}\\, D(\rho, \sigma).
$$

The trace distance is exactly the *advantage* over the trivial $1/2$
that the best quantum measurement provides. Equivalently, it equals the
maximum classical total-variation distance achievable from any
measurement statistics: there exists a POVM whose induced
classical distributions have total-variation distance equal to
$D(\rho, \sigma)$, and no POVM beats this.

Two further properties make the trace distance the workhorse distance
measure of quantum information:

- **Contractivity under channels.** For any CPTP map $\mathcal{N}$,
  $D(\mathcal{N}(\rho), \mathcal{N}(\sigma)) \le D(\rho, \sigma)$. No
  physical processing can make two states easier to distinguish than
  they already were.
- **Convexity.** $D\bigl(\sum_i p_i \rho_i, \sum_i p_i \sigma_i\bigr) \le \sum_i p_i\\, D(\rho_i, \sigma_i)$.

When we say two quantum states are $\epsilon$-close in this book, the
default meaning is $D(\rho, \sigma) \le \epsilon$ unless we explicitly
flag a different metric (Hilbert–Schmidt distance, diamond norm
distance on channels, fidelity-based distance).

## 12.7 Fidelity

The **fidelity** between density matrices $\rho$ and $\sigma$ is

$$
F(\rho, \sigma) = \mathrm{tr}\\, \sqrt{\sqrt{\rho}\\, \sigma\\, \sqrt{\rho}}.
$$

Several conventions exist in the literature: some sources square this
quantity and call *that* the fidelity, some call this expression the
*square-root fidelity*. This book uses the unsquared form throughout,
so $F$ ranges over $[0, 1]$, with $F = 1$ iff $\rho = \sigma$ and
$F = 0$ iff the states have orthogonal support. For two pure states
$\rho = |\psi\rangle\langle\psi|$ and $\sigma = |\phi\rangle\langle\phi|$,
the formula collapses to $F = |\langle\psi|\phi\rangle|$. For a pure
state against a mixed one, $F(|\psi\rangle\langle\psi|, \sigma) = \sqrt{\langle\psi|\sigma|\psi\rangle}$.

**Uhlmann's theorem** gives the geometric interpretation. Any two
density matrices on $\mathcal{H}_A$ have *purifications* in a larger
$\mathcal{H}_A \otimes \mathcal{H}_R$, and

$$
F(\rho, \sigma) = \max_{|\psi_\rho\rangle, |\psi_\sigma\rangle} |\langle \psi_\rho | \psi_\sigma\rangle|,
$$

where the maximum runs over all pairs of purifications. Fidelity
between mixed states is the *best* overlap obtainable between any pair
of pure states that reduce to them. This is constantly the cleanest
way to reason about fidelity in error-correction and entanglement-distillation
proofs.

Trace distance and fidelity bound each other through the
**Fuchs–van de Graaf inequalities**:

$$
1 - F(\rho, \sigma) \le D(\rho, \sigma) \le \sqrt{1 - F(\rho, \sigma)^2}.
$$

On pure states the upper bound is tight — $D = \sqrt{1 - F^2}$ — while the
lower bound is generally strict (it saturates only at the endpoints $F = 0$ and $F = 1$). Both quantities go to zero together. In practice, one chooses whichever is easier to
compute: fidelity is often analytically tractable through Uhlmann,
trace distance is the right object for direct distinguishability
statements, and the inequalities convert between them as needed.
Fidelity is also monotone under quantum channels:
$F(\mathcal{N}(\rho), \mathcal{N}(\sigma)) \ge F(\rho, \sigma)$ — the
opposite inequality direction from trace distance, because high
fidelity means *low* distinguishability.

## 12.8 No-Cloning, No-Broadcasting, No-Deleting

The three foundational no-go theorems are stated and proved in §5.13
and §5.14; here we collect them in one place because each one shapes a
later piece of quantum information theory.

- **No-cloning** (Wootters–Zurek, Dieks 1982). No unitary takes
  $|\psi\rangle \otimes |\text{blank}\rangle$ to $|\psi\rangle \otimes |\psi\rangle$
  for *every* $|\psi\rangle$. The proof in §5.13 contradicts inner-product
  preservation. The information-theoretic consequence: a quantum source
  cannot be classically copied for parallel use, which underlies the
  security of quantum key distribution (Chapter 27) and forces quantum
  error correction to encode information into entangled multi-qubit
  states (Chapters 19–22).
- **No-broadcasting** (Barnum–Caves–Fuchs–Jozsa–Schumacher 1996). A
  *broadcaster* would output a bipartite state whose two marginals
  both equal an unknown input $\rho$. No physical channel can do this
  for an arbitrary input ensemble unless every state in the ensemble
  commutes with every other — i.e., unless the ensemble is classical.
  No-broadcasting is the strict mixed-state generalisation of
  no-cloning and is the formal statement that classical correlations
  can be freely shared while quantum coherence cannot.
- **No-deleting** (Pati–Braunstein 2000). Two identical copies of an
  unknown $|\psi\rangle$ cannot be unitarily reduced to one. Together
  with no-cloning, this says quantum information under closed-system
  evolution is *preserved* on unknown states — it can be neither
  duplicated nor erased — though it can still be moved into correlations
  or transferred to an environment, which is the standard description of
  decoherence (Chapter 18). The statement is reversibility plus the
  no-go theorems on unknown inputs, not a formal Noether-style
  conservation law.

In a sentence: classical bits can be copied and erased freely; quantum
information cannot do either. Every later piece of quantum information
theory — capacity formulas, distillation rates, error-correction
overheads — pays for this in one form or another.

## 12.9 Schumacher Compression

Schumacher's theorem (1995) is the quantum analogue of Shannon's
source-coding theorem and the source of the *qubit* as a unit. Let
$\rho$ be a density matrix on $\mathcal{H}$, regarded as the per-letter
state of an i.i.d. quantum source emitting copies $\rho^{\otimes n}$
(the idealized i.i.d. model; correlated and non-stationary sources need
the more general machinery this chapter does not develop).
The compression task is to faithfully encode $n$ copies of $\rho$ into
a smaller quantum register, transmit or store it, and decode an
approximate reconstruction $\tilde\rho$ with high fidelity to the
original.

**Theorem (Schumacher).** For any rate $R > S(\rho)$ there exists a
sequence of encoding/decoding pairs on block length $n$, mapping
$\rho^{\otimes n}$ into $\lfloor nR \rfloor$ qubits, such that the
output fidelity to $\rho^{\otimes n}$ goes to $1$ as $n \to \infty$.
For any rate $R < S(\rho)$, no such sequence exists: the fidelity is
bounded away from $1$.

The von Neumann entropy is therefore the *minimum number of qubits per
letter* that a quantum source can be faithfully compressed into. This
is the operational fact that elevates $S(\rho)$ from "Shannon entropy of
the eigenvalues" to "the answer to a physical engineering question",
and it is what justifies calling $S(\rho)$ the entropy of the source.

The compression scheme is, in outline: diagonalise $\rho$; use a
projective measurement onto the *typical subspace* spanned by
eigenstates whose eigenvalues lie close to $2^{-nS(\rho)}$; encode the
support of the projection into $\lceil nS(\rho) \rceil$ qubits. The
typical subspace has dimension $\approx 2^{nS(\rho)}$ and total
$\rho^{\otimes n}$-probability close to one, so the projection succeeds
with high fidelity and the dimensionality saving is exactly the
entropy rate.

A practical consequence: the qubit is the natural quantum unit *because*
$\log_2 2 = 1$ corresponds to one bit of compressible quantum entropy.
The unit was not chosen by historical accident — Schumacher's theorem
fixes it.

## 12.10 Quantum Channel Capacities

A noisy quantum channel $\mathcal{N}$ has *several* distinct capacities
because there is more than one kind of information it might be asked to
carry. The four that appear most often in this book:

**Classical capacity $C(\mathcal{N})$.** The maximum asymptotic rate of
*classical* bits per channel use that can be transmitted with vanishing
error. The Holevo–Schumacher–Westmoreland (HSW) theorem (1997–1998)
states

$$
C(\mathcal{N}) = \lim_{n \to \infty} \tfrac{1}{n}\\, \chi^*(\mathcal{N}^{\otimes n}),
$$

where $\chi^*(\mathcal{N})$ is the Holevo quantity (§12.5) maximised
over input ensembles. The regularisation $\lim_n \tfrac{1}{n}(\cdots)$
is needed because $\chi^*$ is, in general, *superadditive* — some
channels carry strictly more classical information when many copies are
used jointly than copy-by-copy (Hastings 2009).

**Quantum capacity $Q(\mathcal{N})$.** The maximum asymptotic rate of
*qubits* per channel use that can be transmitted with vanishing trace
distance to the identity-on-the-input. The LSD theorem (Lloyd 1997,
Shor 2002, Devetak 2005) gives

$$
Q(\mathcal{N}) = \lim_{n \to \infty} \tfrac{1}{n}\\, \max_{\rho^{(n)}} I_c(\rho^{(n)}, \mathcal{N}^{\otimes n}),
$$

where $I_c$ is the coherent information (§12.3) and the maximisation is over input states $\rho^{(n)}$ on $n$ channel uses (not single-letter — that is what the regularisation tracks). Like the classical capacity, the formula requires
regularisation because coherent information is generically
superadditive. The quantum capacity is the rate at which the channel
can be turned into a perfect quantum wire after enough error correction;
it is also the rate at which entanglement can be sent through.

**Entanglement-assisted classical capacity $C_E(\mathcal{N})$.**
When sender and receiver share unlimited entanglement in advance, the
maximum classical-information rate becomes

$$
C_E(\mathcal{N}) = \max_\rho I(\rho, \mathcal{N}),
$$

where $I(\rho, \mathcal{N})$ is the quantum mutual information of
$\rho$'s purification after one side passes through $\mathcal{N}$.
The Bennett–Shor–Smolin–Thapliyal theorem (1999, 2002) shows this
formula requires *no* regularisation — entanglement assistance restores
single-letter additivity. $C_E$ is the closest quantum analogue of
Shannon's classical channel capacity and is in this sense the simplest
of the three.

**Private classical capacity $P(\mathcal{N})$.** The maximum rate of
classical bits transmissible such that an environment-purifier learns
nothing. $P(\mathcal{N})$ is the foundation of quantum-key-distribution
security analyses (Chapter 27); it satisfies
$Q(\mathcal{N}) \le P(\mathcal{N}) \le C(\mathcal{N})$ with both
inequalities sometimes strict.

The ordering $Q \le P \le C \le C_E$ holds generally. Computing any of
them for a given channel is, even today, hard — closed-form expressions
exist only for restricted channel families (erasure, dephasing, certain
Pauli channels, the depolarising channel within partial parameter
ranges).

## 12.11 LOCC and Resource Theories

A particularly important class of operations in bipartite quantum
information is **local operations and classical communication (LOCC)**:
Alice and Bob can each perform arbitrary local quantum operations on
their own subsystems and exchange classical messages, but they cannot
send quantum systems back and forth. LOCC is the model under which
entanglement is *not* free — any entanglement they end up sharing must
either have been there from the start or been pre-established by a
prior quantum-communication step.

LOCC is the natural arena for **resource theories of entanglement**.
The basic statements:

- **Entanglement cannot be created from a product state by LOCC.** A
  pair $\rho_A \otimes \rho_B$ stays unentangled under any sequence of
  local operations and classical messages — entanglement is *free* in
  one direction (you can always discard it) and *costly* in the other.
- **Pure-state entanglement is interconvertible.** By the §7.13 result,
  $E(|\psi\rangle_{AB}) = S(\rho_A)$ is simultaneously the asymptotic
  rate at which Bell pairs can be distilled from copies of
  $|\psi\rangle$ via LOCC and the rate at which Bell pairs are needed to
  prepare it. Pure-state entanglement is *reversibly convertible* to
  ebits.
- **Mixed-state entanglement is not interconvertible.** Entanglement of
  formation and distillable entanglement differ in general, and bound
  entangled states (positive formation entropy, zero distillable
  entanglement) exist. The full theory has the structure of a resource
  theory with a non-trivial "exchange rate" between dilution and
  distillation.

The same resource-theoretic structure applies to other quantum features
treated later: **coherence** (Chapter 18 noise discussion), **magic /
non-stabilizer states** (Chapter 19 fault-tolerance discussion), and
**thermodynamic free energy** (briefly, in Chapter 32). Each of them
identifies a class of "free" states and "free" operations, defines the
resource as whatever is preserved or destroyed under those, and asks
for conversion rates. Entanglement under LOCC is the prototype and
historically the first such theory worked out in detail.

## 12.12 Connections and Application Teasers

The quantities in this chapter are not abstract bookkeeping — every one
of them shows up as a *bound* somewhere later in the book.

- **Quantum key distribution (Chapter 27).** The Holevo bound limits
  what an eavesdropper can learn from intercepting a fraction of a
  quantum-encoded key. Trace distance between the eavesdropper's
  conditional state and the uniform mixture is the standard
  *quantitative* statement of "the key looks random to her";
  security proofs reduce to bounding that distance. Fidelity-based
  reformulations show up in entanglement-based protocols where the
  shared state's closeness to a maximally entangled state is what
  matters.
- **Channel capacities and quantum error correction (Chapters 18,
  19–22).** A quantum error-correcting code achieves rate $k/n$ on a
  noisy channel; the achievable rates are bounded above by
  $Q(\mathcal{N})$. The coherent information of §12.3 is the building
  block of the achievability proof. Strong subadditivity (§12.2) is
  the input to most converse bounds — including the famous
  *quantum singleton bound* and capacity bounds for the depolarising
  and erasure channels.
- **Compression and state preparation (Chapter 14 and later).** When a
  quantum algorithm needs many copies of a structured state, Schumacher
  compression (§12.9) tells you the minimum number of qubits the source
  can be transmitted in. The same idea underlies *quantum data
  structures* that store an exponentially large state vector in a
  polynomial-size compressed register when the entropy of the
  distribution is small.
- **Resource accounting in protocols (Chapter 27 and Part 8).** Whenever
  a protocol consumes ebits, qubits, or classical bits as inputs and
  produces some mixture of them as outputs, the rates of conversion
  obey the kind of resource-theoretic inequalities introduced in §12.11.
  Teleportation (one ebit and two classical bits = one transmitted
  qubit), superdense coding (one ebit and one qubit = two classical
  bits), and entanglement distillation all live in this accounting
  framework.

The unifying picture: information in quantum systems is genuinely a
*resource*. It can be measured (entropy), distinguished (trace
distance, fidelity), transmitted at bounded rates (capacities),
converted between forms (LOCC), and constrained by no-go theorems
(cloning, broadcasting, deleting). The rest of the book applies these
quantities; this chapter is the inventory.

## 12.13 Bridge to Chapter 13

Chapters 5–12 have built the formalism — states, gates, circuits,
measurements, information. Chapter 13 turns to the *mindset* of
quantum algorithm design: how to exploit superposition without falling
into the trap of "exponentially many parallel classical computations",
how to think about interference as the actual source of speedups, and
which problems admit useful quantum structure in the first place.

The information-theoretic bounds of this chapter are quietly present
throughout Part 6:

- The Holevo bound (§12.5) is why a quantum algorithm cannot simply
  "read out" an exponentially large amplitude vector — the
  output-information ceiling forces algorithm designers to extract a
  *structured* feature (a phase, a period, a label) rather than the
  full state.
- Trace distance and fidelity (§§12.6–12.7) define what it means for
  an algorithm to succeed *with error $\epsilon$* — a notion that
  appears in every algorithm chapter and every error-correction
  discussion.
- The no-cloning theorem (§12.8) is the reason a quantum algorithm cannot
  copy a prepared input state and rerun on the copy for free, the way a
  classical algorithm reuses a stored input. Repetition instead costs fresh
  state preparation each time, and shot-budget accounting (§4.14) enters as
  a first-class concern.

With these quantitative tools in hand, Part 6 begins by asking *what
quantum algorithms actually are* — a question that turns out to have a
sharper answer than the popular picture suggests.

**Sanity checks before moving on.**

1. For $\rho = \tfrac{1}{2}|0\rangle\langle 0| + \tfrac{1}{2}|1\rangle\langle 1| = I/2$,
   verify $S(\rho) = 1$ bit, and confirm that this matches the Shannon
   entropy of the corresponding eigenvalue distribution
   $(1/2, 1/2)$.
2. For the Bell state $|\Phi^+\rangle$, compute $S(\rho_A)$,
   $S(\rho_B)$, $S(\rho_{AB})$, $I(A:B)$, and $S(A \mid B)$. Confirm
   $I(A:B) = 2$ and $S(A \mid B) = -1$, and explain in one sentence why
   the conditional entropy is negative.
3. Take $\rho = |0\rangle\langle 0|$ and $\sigma = |+\rangle\langle +|$.
   Compute both $D(\rho, \sigma)$ and $F(\rho, \sigma)$, then verify
   that the Fuchs–van de Graaf inequalities
   $1 - F \le D \le \sqrt{1 - F^2}$ are satisfied — the upper bound
   $D = \sqrt{1 - F^2}$ is tight for pure states, while the lower bound
   $1 - F \le D$ is strict here.
4. For the qubit ensemble $\\{(\tfrac{1}{2}, |0\rangle), (\tfrac{1}{2}, |+\rangle)\\}$,
   compute the average state $\rho$ and the Holevo quantity
   $\chi = S(\rho)$. Confirm $\chi < 1$, so one qubit transmitted from
   this ensemble carries strictly less than one bit of accessible
   classical information.
5. Confirm that subadditivity $S(\rho_{AB}) \le S(\rho_A) + S(\rho_B)$
   holds *strictly* for $|\Phi^+\rangle$ — there $S(\rho_{AB}) = 0$ while
   $S(\rho_A) + S(\rho_B) = 2$ — and that equality holds iff
   $\rho_{AB} = \rho_A \otimes \rho_B$. Then check that strong subadditivity
   reduces to ordinary subadditivity when system $B$ is trivial
   (one-dimensional).

---

[← Previous: Chapter 11](11-measurement-theory.md) · [Table of Contents](../../README.md) · [Next: Chapter 13 →](../part-06-algorithms/13-quantum-algorithms-mindset.md)
