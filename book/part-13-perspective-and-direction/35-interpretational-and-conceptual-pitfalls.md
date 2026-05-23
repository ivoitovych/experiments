# Chapter 35. Interpretational and Conceptual Pitfalls

[← Previous: Chapter 34](34-bridging-to-familiar-engineering-ideas.md) · [Table of Contents](../../README.md) · [Next: Chapter 36 →](36-how-to-judge-claims.md)

> **Status:** draft · **Phase:** 6 · **Sections drafted:** 14 / 14

By this point the formalism has done all the work. States are unit
vectors in a Hilbert space; gates are unitaries; measurements are
positive operators that resolve the identity; the Born rule turns
inner products into probabilities. The mathematics predicts every
laboratory outcome the field has ever measured, and nothing in this
chapter changes any of those predictions. What this chapter is about
is the layer of *verbal narration* that sits on top of the math —
"superposition is being in two states at once", "entanglement is
spooky action at a distance", "the wavefunction collapses when
observed", "quantum computers try all answers in parallel" — and the
ways that narration misleads a working practitioner. Every one of
those sentences has a precise translation into the formalism, and
every one of those translations is *less dramatic and more useful*
than the popular version.

The goal here is operational hygiene, not philosophy. A working
practitioner does not need to settle the measurement problem, pick
between Copenhagen and many-worlds, or take a side on $\psi$-ontic
versus $\psi$-epistemic before writing a circuit. What they need is
to recognise which slogans are harmless shorthand, which slogans
silently corrupt intuition about what a quantum computer can do, and
where the underlying math actually constrains what claims can be
made. The interpretations zoo gets a tour in §35.6 — not to advocate
for one, but to show that they all reproduce the same predictions
and so cannot be settled by experiment alone.

> **How to read this chapter.** §§35.1–35.4 cover the four slogans
> that produce the most working-engineer mistakes (parallelism,
> entanglement-as-signalling, collapse-as-mechanism, uncertainty-as-
> measurement-disturbance). §35.5 walks through Schrödinger's cat,
> the EPR pair, and Wigner's friend — the textbook thought experiments
> and what they actually establish. §35.6 surveys the interpretations
> and §35.7 explains why interpretation choice is operationally
> downstream of the math. §§35.8–35.10 take aim at the marketing-
> adjacent vocabulary (quantum advantage, "anything is faster",
> the destruction-by-measurement myth). §§35.11–35.13 are the more
> technical pitfalls — PBR and ontology, decoherence and the
> measurement problem, the free-will / measurement-independence
> loophole in Bell tests. §35.14 distils the operational rule:
> trust the math, distrust the metaphor.

## 35.1 "Quantum Parallelism" Is a Misleading Metaphor

The most common popular-science explanation of quantum speedup runs
roughly: a register of $n$ qubits in superposition holds $2^n$ values
at once, so a quantum computer evaluates a function on all $2^n$
inputs in parallel. This is wrong in the way that matters. The state
$2^{-n/2}\sum_x |x\rangle |f(x)\rangle$ does encode $f$ on every
input — but a measurement returns *one* random $x$ together with
$f(x)$, which is no better than evaluating $f$ on a uniformly random
input. The encoding is real; the access to it is not.

The actual computational engine is *interference*, not parallelism
(Chapter 10, §10.2). A useful quantum algorithm is one where, after
encoding the problem, a structured sequence of unitaries arranges
the amplitudes so that wrong answers destructively cancel and the
right answer constructively reinforces. The classical analogue would
be a Monte Carlo computation in which negative probabilities were
allowed and made paths cancel — except that quantum amplitudes are
complex numbers and the cancellations are real.

The diagnostic question to ask of any "parallelism" argument is:
**at what point in the algorithm does the structure of the answer
get amplified into the readout statistics?** If the answer is "we
just measure the superposition", there is no algorithm — the output
distribution is whatever the encoded distribution was, with no
quantum benefit. Deutsch–Jozsa amplifies via a final Hadamard layer;
Grover via repeated reflection-and-inversion; phase estimation via
the inverse QFT; Shor via the same QFT applied to a modular-exponent
period structure. Without that amplification step, the
"$2^n$-fold-parallel evaluation" is a state we cannot read.

The slogan to replace "quantum parallelism" with is **structured
interference**. It is less marketable and considerably more accurate.

## 35.2 Entanglement Does Not Allow Signalling

A second class of confusion treats entanglement as a covert channel.
The phrasing "spooky action at a distance" — Einstein's complaint,
not a description he endorsed — has hardened in popular accounts
into the suggestion that measuring one half of an entangled pair
*does something* to the other half, instantaneously, across any
distance. From this it looks like one ought to be able to signal.

The formalism rules this out cleanly. As §10.6 establishes, Bob's
reduced state $\rho_B = \mathrm{tr}_A(\rho_{AB})$ is independent of
whether Alice measured, of which basis she chose, and of what
outcome she got — provided Bob does not learn the outcome through
a separate classical channel. Concretely, for any joint state
$\rho_{AB}$ and any POVM $\\{M_a\\}$ on Alice's side,

$$
\sum_a \mathrm{tr}_A\bigl((M_a \otimes I)\\, \rho_{AB}\bigr) = \mathrm{tr}_A(\rho_{AB}) = \rho_B,
$$

so the marginal Bob sees is the same in every world. The correlations
Bell-test experiments reveal are visible *only after the two parties
pool their classical records*. The classical channel needed to compare
records is subluminal, and so is the entire information flow.

The slogan to replace "spooky action at a distance" with is
**nonlocal correlation without nonlocal signalling**. The first half
is real and Bell-tested; the second half is what relativity demands
and what the no-signalling theorem delivers.

A common subtle confusion: the *post-measurement* state on Bob's side,
conditioned on Alice's outcome, *does* depend on Alice's measurement.
But conditioning requires Alice to tell Bob the outcome. Without the
classical channel, Bob's accessible description is the unconditional
average, which is invariant. This is the same distinction as
"a coin flip determines whether the safe was opened" versus "I can
open the safe by knowing which way the coin landed": correlation is
not causation, and certainly not communication.

## 35.3 "Collapse" Is an Update Rule, Not a Physical Mechanism

The third pitfall is the most stubborn. Postulate 3 (§5.4) says that
after observing outcome $m$, the state becomes $P_m|\psi\rangle / \sqrt{p(m)}$.
The popular reading is that something *physical* happens to the
wavefunction: it propagates unitarily and then, when "observed",
non-unitarily collapses. The reading turns the measurement postulate
into a second dynamical law, distinct from the Schrödinger evolution
of §5.3, that switches on under unspecified conditions.

The narrower and more defensible reading is that the collapse rule
is an **updating rule on the observer's description** — a Bayesian
conditionalisation on the measurement outcome. The state is the
generator of measurement statistics; once a measurement has occurred
and an outcome has been recorded, the rule for *future* statistics
is given by the projected state. Whether that update reflects a
physical change of the system or only a change in the description
is precisely what the measurement problem is about.

This matters for two practical reasons. First, the rule is *always*
relative to the observer's information: a measurement that has
happened but whose outcome has not yet been learned is described by
a mixed state, not a collapsed one, on the observer's side. Quantum
error correction is built on exactly this fact (Chapter 19): syndrome
measurements happen, but the encoded data is unaffected because no
information about the data has leaked into the classical record.
Second, treating collapse as a physical mechanism invites questions
the formalism does not answer ("how fast does the wavefunction
collapse?", "what triggers collapse?"), and these questions have
been a fertile source of confusion for nearly a century. The
measurement problem is *unresolved*; collapse-as-mechanism prematurely
declares it resolved in a particular wrong direction.

The slogan to use instead is **conditional update**. The mathematics
is unchanged; the metaphor is corrected.

## 35.4 Heisenberg's Uncertainty Is Not About Measurement Disturbance

"The Heisenberg uncertainty principle says that measurement disturbs
the system, so you cannot simultaneously measure position and
momentum precisely." Two things are wrong here. First, the standard
uncertainty relation is a statement about *the state*, not about
measurement: for any state $|\psi\rangle$ and any two observables
$A, B$,

$$
\Delta A\\, \Delta B \;\geq\; \tfrac{1}{2}\bigl|\langle\psi|[A,B]|\psi\rangle\bigr|,
$$

where $\Delta A = \sqrt{\langle A^2\rangle - \langle A\rangle^2}$ is
the spread of $A$-outcomes *if you measured $A$ on a freshly prepared
copy of $|\psi\rangle$* and $\Delta B$ is the analogous spread for $B$
on a different freshly prepared copy. The relation says no quantum
state has simultaneously sharp values for non-commuting observables.
It is a fact about $|\psi\rangle$ and the algebra of observables,
not about an act of measurement.

Second, there *is* a separate, narrower set of results — error-
disturbance inequalities (Ozawa 2003, Branciard 2013, and others) —
that formalise the Heisenberg–microscope intuition about measurement
disturbance. They are quantitatively distinct from the standard
relation and are an active research area. Conflating the two
produces a hybrid slogan that does justice to neither.

The operational consequence for circuit-level reasoning: a Pauli-$Z$
eigenstate (so $\Delta Z = 0$) has $\Delta X = \Delta Y = 1$
maximal, because $[Z, X] = 2iY$ and $[Z, Y] = -2iX$ are non-zero.
This is a property of the *state* — it would be true even if no
measurement were ever performed. The unmeasured qubit "has" a sharp
$Z$ value (the eigenvalue) and *does not have* a sharp $X$ value,
in the sense that the Born rule on $|0\rangle$ assigns probability
$1/2$ to each $X$-outcome. The same state cannot have both sharp at
once.

## 35.5 "Both Alive and Dead": Three Thought Experiments

Three textbook gedankenexperimente get cited so often that their
actual technical content has been worn smooth. Restating them
precisely is worth the page space.

**Schrödinger's cat.** A radioactive nucleus is coupled to a vial of
poison and a cat. After one half-life the joint state is, formally,

$$
\tfrac{1}{\sqrt{2}}\bigl(|\text{intact}\rangle|\text{alive}\rangle + |\text{decayed}\rangle|\text{dead}\rangle\bigr),
$$

a superposition of correlated nucleus-and-cat states. The popular
reading — "the cat is simultaneously alive and dead" — is the
verbal failure mode from §10.1: superposition is basis-dependent and
"both at once" is not what the formalism says. The state assigns
probabilities to the two outcomes of the alive/dead measurement; it
does not say that the cat occupies both classical configurations.
The genuinely interesting content of the gedankenexperiment is that
*nothing in the postulates forbids* a macroscopic system from being
in such a superposition; whether decoherence (§35.12) suppresses it
to undetectability in practice is a separate question. The cat is a
prompt about the boundary between unitary evolution and the
emergence of classical outcomes, not about a metaphysical
both-at-once-ness.

**The EPR pair.** Einstein, Podolsky, and Rosen (1935) argued that
quantum mechanics is incomplete by considering the Bell state
$|\Psi^-\rangle = (|01\rangle - |10\rangle)/\sqrt{2}$ (Bohm's spin
formulation; §7.7). Perfectly anticorrelated outcomes in every shared
basis, they argued, must reflect pre-existing values: each particle
"already had" the value that would be revealed, since otherwise
"action at a distance" would be needed to coordinate. Bell (1964;
§7.9) showed that this *local hidden variable* hypothesis is
quantitatively wrong — the CHSH bound it implies is $|S| \leq 2$,
but quantum mechanics and experiment give $|S| = 2\sqrt{2}$. So one
of EPR's premises — locality, realism, or measurement independence
— has to be abandoned. The textbook reading abandons realism (the
outcomes do not pre-exist measurement); §35.13 returns to the third
option.

**Wigner's friend** and the Frauchiger–Renner extension. Wigner
imagined a friend in a sealed laboratory who performs a measurement,
and asked how Wigner outside the lab should describe the friend's
state. The friend, having seen an outcome, applies the collapse
rule. Wigner, having no access to the outcome, describes the
combined friend-plus-system in a superposition. *Both descriptions
are correct* relative to their respective information; the
inconsistency is only apparent. Frauchiger–Renner (2018, refined by
Bong et al. 2020) sharpens this by constructing a multi-observer
protocol in which the assumption that all observers' records can be
consistently combined leads to a contradiction with standard quantum
theory. The takeaway is *not* that quantum mechanics is inconsistent;
it is that one of three plausible meta-assumptions about observers
— that observers all reason classically about each other, that
quantum theory applies universally including to observers, and that
a single observed outcome is a fact — has to be modified. Different
interpretations modify different ones (§35.6). For a working
practitioner, the message is that "the observer" is not a primitive
of the theory and treating it as one leads to paradoxes.

## 35.6 The Interpretations Zoo

A non-exhaustive tour. Every entry here reproduces the predictions of
standard quantum mechanics on every experiment ever performed. They
differ in what additional ontological commitments they make.

**Copenhagen** (Bohr, Heisenberg). The wavefunction is the most
complete possible description of a quantum system. Measurement
outcomes are primitive — there is a classical/quantum split between
the system being measured and the apparatus making the measurement,
and the apparatus is described classically. Collapse is a
fundamental, non-unitary process triggered by measurement. The
operational core is what physicists actually compute with; the
philosophical core (what counts as "measurement", where the split
lives) is what critics object to.

**Many-worlds / Everett.** There is no collapse; the universal
wavefunction evolves unitarily forever. The apparent occurrence of
single outcomes is a feature of how observers — themselves quantum
systems — branch into multiple consistent records, one per outcome,
each with Born-rule weighted measure. Mathematically the cleanest
interpretation; ontologically the most extravagant (one branches
per measurement event, all real). Deriving the Born rule *from*
many-worlds rather than postulating it is an active research
programme (Deutsch, Wallace, decision-theoretic arguments).

**de Broglie–Bohm pilot wave.** Particles always have definite
positions; the wavefunction is a separate "pilot wave" that guides
them. Outcomes are deterministic functions of initial positions plus
the wavefunction; apparent randomness reflects ignorance of initial
conditions. The theory is nonlocal in the explicit-mathematics
sense: a particle's velocity depends instantaneously on the joint
wavefunction across all particles. Reproduces standard quantum
predictions for position measurements; the extension to spin and
relativistic settings is non-trivial.

**QBism (Quantum Bayesianism).** The wavefunction is an agent's
personal degree of belief about outcomes of measurements the agent
might perform. Probabilities are subjective Bayesian probabilities;
there is no objective "state of the world" represented by $|\psi\rangle$.
Collapse is just Bayesian updating. Sidesteps the measurement
problem by denying that there is one — quantum mechanics is a
normative epistemic theory, not a physical theory of unobserved
reality.

**Consistent histories** (Griffiths, Omnès, Gell-Mann–Hartle).
Replace the single time-evolving state with families of "consistent
histories" — sequences of events at successive times — that satisfy
decoherence conditions ensuring classical probability rules apply.
Different consistent families are different valid descriptions; the
formalism prohibits combining them naively.

**Transactional interpretation** (Cramer). Quantum events are
two-way "handshakes" between emitter and absorber, with offer waves
travelling forward and confirmation waves backward in time. Removes
the appearance of preferred forward time direction in measurement
but adds advanced waves that have no other operational role.

**Objective collapse** (GRW, Penrose, continuous spontaneous
localisation). Add a small nonlinear stochastic term to the
Schrödinger equation that causes spontaneous, observer-independent
collapse of macroscopic superpositions at a rate set by a new
fundamental parameter. *Empirically distinguishable* from standard
quantum mechanics in principle — for sufficiently massive
superpositions, the new dynamics produces deviations. Current
experiments constrain the parameters but have not detected the
predicted effects.

A working practitioner should know these labels exist, understand
that they disagree about ontology while agreeing on predictions,
and not waste shipping cycles on choosing between them.

## 35.7 Do Interpretations Matter for Practitioners?

Operationally, no. Every interpretation in §35.6 — and every other
one in the literature — gives identical predictions for every
quantum circuit, every quantum-key-distribution protocol, every
error-correction code, every variational ansatz this book has
described. If two interpretations predicted different observable
behaviour they would not be interpretations of the same theory;
they would be different theories.

Pedagogically, yes. Interpretations *shape the metaphors a
practitioner reaches for*, and different metaphors prime different
mistakes:

- Many-worlds thinking primes the "quantum parallelism" misreading
  of §35.1 — if every branch is real, the temptation is to think
  the computer is "really" evaluating $f$ on every input.
  Counterweight: even if branches are real, *we have access to one
  branch at measurement time*, so the algorithmic question is still
  about interference, not branch enumeration.
- Copenhagen thinking primes the "collapse as a real physical
  process" misreading of §35.3 — if measurement collapse is a
  separate fundamental rule, the temptation is to ask physical
  questions about it that have no formal answer.
- QBism thinking primes the right operational hygiene (states are
  not in the world; they are in the description) at the cost of
  making it harder to talk about the state of an isolated system
  no observer is currently looking at.

The pragmatic working stance is **shut up and calculate**, in the
non-pejorative sense Mermin proposed: treat the formalism as the
authoritative object, treat any verbal narration as a mnemonic, and
notice which mnemonics are working *against* you in a given context.
A practitioner who can switch metaphors fluidly — many-worlds while
thinking about decoherence, Copenhagen while writing a tutorial,
QBism while debugging a measurement protocol — pays no operational
cost for the eclecticism, because the math is the same.

## 35.8 How to Read "Quantum Advantage" Claims

The phrase "quantum advantage" is doing several different jobs in
the literature, and not all of them survive scrutiny when their job
description is examined.

**Oracle separations** show that under a black-box query model — the
algorithm can call a function $f$ but cannot inspect its
implementation — the quantum query complexity is provably smaller
than the classical query complexity. Deutsch–Jozsa, Bernstein–Vazirani,
Simon, and the Grover search lower bound are in this category.
Oracle separations are *unconditional* (they do not assume any
unproven complexity conjecture), but they are *only about queries*;
the practical question of whether anyone has a function that
behaves like the oracle, or whether the oracle can be evaluated
efficiently as a circuit, is separate. Many oracle separations have
*no known instantiation* with a concrete function family for which
the classical lower bound holds.

**Unconditional speedups outside the oracle model** are rare. The
strongest current evidence for quantum advantage in problems
*without* an oracle is a small number of sampling tasks
(random-circuit sampling, boson sampling, IQP sampling) where
classical hardness rests on widely believed complexity conjectures.
These are not "computational" advantage in the algorithm-solves-a-
useful-problem sense; they are demonstrations that some output
distribution is hard to reproduce classically.

**Algorithmic speedups under standard assumptions** — Shor (assuming
factoring is classically hard), HHL-style linear-system speedups
(under input-encoding assumptions), Hamiltonian simulation (under
input-encoding and observable-readout assumptions) — are the
practically interesting category but are conditional in two ways:
on a complexity conjecture (e.g., that factoring is in BQP but not
P) and on input/output assumptions (e.g., QRAM-style data access
or sparse classical input). The QRAM caveat is load-bearing: an
algorithm with a $\sqrt{N}$ quantum speedup that requires
$\Omega(N)$ time to load the input has *no end-to-end speedup*.

**Asymptotic vs. concrete crossover.** Shor's algorithm is
*asymptotically* exponentially faster than the general number field
sieve; for actual cryptographic key sizes the *concrete* crossover
depends on logical-qubit error rates, T-count, and circuit depth.
Grover gives a $\sqrt{N}$ speedup asymptotically; for actual problem
sizes, the constants and error-correction overhead can push the
break-even past current and projected hardware. A claim of
"quantum advantage" should always be examined for which clock it is
keeping.

Chapter 36 develops this further. The minimal checklist is: is the
claim oracle-relative or unconditional? With or without QRAM? With
or without error correction? Asymptotic or concrete? And what
classical baseline is being benchmarked against?

## 35.9 "Quantum Mechanics Violates Causality" — No

Bell-inequality violations get described in popular accounts as
"faster-than-light influences" or "violations of causality". They
are not. The mathematics of §10.6 forbids signalling, and
relativistic quantum field theory is constructed so that spacelike-
separated measurements *commute*: nothing observable on one side
depends on what happened on the other side, conditional only on
local information.

What Bell violations *do* establish is that no *local hidden
variable* model can reproduce the predictions of quantum mechanics.
The locality assumption Bell uses is the assumption that outcomes
on one side depend only on settings on that side plus pre-existing
correlations. Quantum mechanics satisfies a weaker locality —
no-signalling — but not the stronger Bell-locality. Causality, in
the relativistic sense of "no signal travels faster than light", is
preserved. Bell-locality, in the deeper sense of "all correlations
have a local common-cause explanation", is not.

The slogan upgrade: **quantum mechanics violates Bell-locality but
not no-signalling**. Causality is fine; classical realism is not.

## 35.10 "Quantum Information Is Destroyed by Measurement"

A subtle misreading hides in the standard description of measurement
collapse. The state $|\psi\rangle$ projects onto $|m\rangle$ — so,
the reading goes, the information in the unmeasured amplitudes is
*lost*. But the no-cloning theorem (§5.13) and the no-deleting
theorem (§5.14) together imply that quantum information under
closed-system evolution is *conserved*: it does not vanish, it
transfers.

What actually happens at measurement is that the system becomes
entangled with the measurement apparatus and, ultimately, with the
environment (§35.12). The information about the pre-measurement
amplitudes is encoded in the joint system+apparatus+environment
state. *Locally on the system*, the reduced state is the projected
one and the off-diagonal amplitudes are gone. *Globally including
the apparatus*, no information was destroyed; it was just
distributed beyond the practitioner's reach.

Two operationally relevant consequences. First, classical
information *about the measurement record* is preserved — the bit
you wrote down for "outcome was 0" is durable in the usual classical
sense. Second, this is why uncomputation matters in algorithm
design: ancilla qubits that have become entangled with the main
register cannot be discarded silently without leaking information,
because the global state's classical-record entanglement degrades
the main register's coherence. The proper move is to uncompute the
ancillas back to a known initial state so the entanglement is
undone unitarily.

The slogan upgrade: **measurement does not destroy quantum
information; it redistributes it into channels the observer cannot
access**.

## 35.11 "Anything Is Quantum-Computed Faster" — No

A persistent piece of folk knowledge holds that quantum computers
are simply faster classical computers — that any algorithmic
problem will, eventually, run faster on quantum hardware. The
evidence does not support this.

The most famous general-purpose speedup is **Grover's** quadratic
search: a function $f$ with a unique marked input among $N$ inputs
can be found in $O(\sqrt{N})$ queries instead of $O(N)$. Quadratic,
not exponential. For many real-world problems — anything where the
classical algorithm is already polylogarithmic, anything where the
input-loading dominates, anything where the structure does not
admit a function-evaluation reformulation — the quadratic saving
either does not apply or is swamped by overhead.

Many problems have *no known* quantum speedup:

- General linear programming.
- Most graph problems at large scale (max-flow, all-pairs shortest
  paths, dense graph diameter).
- Online algorithms whose lower bound is information-theoretic
  rather than computational.
- Problems with $\Omega(N)$ input-reading lower bounds and small
  output.

And some problems have proven *no asymptotic quantum advantage*
beyond constants:

- The parity-of-$N$-bits function has the same query complexity
  classically and quantumly: $\Theta(N)$.
- Element distinctness has a quantum query lower bound of
  $\Omega(N^{2/3})$, only marginally below classical.

The right operational stance is **quantum speedups are
problem-specific and structural**. Some problems get exponential
speedup; some get quadratic; many get none; some are provably
incompressible. A claim that "quantum will be faster for our use
case" should be examined for which class the use case is in, and
who has shown the structural property the speedup exploits.

## 35.12 Decoherence Explains Classicality but Not Measurement

**Decoherence** is the physical process by which a system entangled
with its environment loses the off-diagonal coherences in the
reduced density matrix when the environment is traced out. The
result is a reduced state that is *effectively classical* — a
classical probability mixture over preferred basis states (the
"einselected" basis, in Zurek's terminology, picked out by the
system-environment coupling). Decoherence is fast: for typical
macroscopic systems, off-diagonal terms in position basis suppress
on timescales of $10^{-20}$ seconds or shorter.

This is *what makes the classical world classical*. Cats are not
observed in $|\text{alive}\rangle + |\text{dead}\rangle$
superpositions not because the postulates forbid it but because
the decoherence rate of a macroscopic system makes coherent
superpositions vanish below experimental detectability essentially
instantly. The same mechanism is why qubit hardware fights so hard
to *isolate* the qubits — coherence requires the system not be
entangled with anything outside it.

Decoherence is sometimes oversold as having *solved* the measurement
problem. It has not. What decoherence explains is *why we observe
classical mixtures rather than coherent superpositions* of pointer
states. What it does *not* explain is why a single one of the
classical alternatives is the one we end up observing on a given
run. The transition from "the state is a mixture
$\sum_m p_m |m\rangle\langle m|$" to "outcome $m^*$ actually
happened" is exactly the measurement problem. Decoherence converts
the problem from "why don't we see superpositions?" to "why do we
see one outcome rather than the mixture?", which is a clearer
problem but still a problem.

The slogan upgrade: **decoherence explains classicality; the
measurement problem is what is left over after that explanation**.

## 35.13 The PBR Theorem and the Free-Will Loophole

Two technical results worth knowing because they constrain the
ontological story you can tell, even if you do not work directly on
foundations.

**Pusey–Barrett–Rudolph (PBR, 2012).** A theorem about the
ontological status of the wavefunction. Under mild assumptions —
crucially, that systems prepared independently have independent
ontic descriptions — PBR shows that *no $\psi$-epistemic model
reproduces all quantum predictions*. A $\psi$-epistemic model treats
$|\psi\rangle$ as representing the observer's incomplete knowledge
of an underlying ontic state $\lambda$; distinct $|\psi\rangle$
might correspond to overlapping distributions over $\lambda$. The
PBR theorem rules this out under the preparation-independence
assumption: any model that reproduces quantum mechanics must assign
disjoint sets of ontic states to distinct pure $|\psi\rangle$,
making $|\psi\rangle$ effectively a property of the underlying
reality rather than of an agent's knowledge. The result tightens
the constraints on hidden-variable models considerably.

**The free-will (or measurement-independence) loophole in Bell
tests.** Bell's argument assumes that the *measurement settings*
chosen by Alice and Bob are statistically independent of the hidden
variables describing the source. If this independence fails — if
some common cause in the past correlates settings with the
hidden-variable distribution — local hidden variables can reproduce
the quantum statistics. This is sometimes called **superdeterminism**
or the *measurement-independence loophole*. Experiments using
distant quasar light or random human inputs as setting choices have
pushed the relevant correlations back to extremely early times,
but the loophole is not formally closed (and cannot be, in any
finite experiment). Most practitioners regard the conspiracy needed
to exploit it as too contrived to take seriously, but the loophole
exists and is named here so that "Bell rules out hidden variables"
can be qualified properly to "Bell rules out hidden variables
*under measurement independence*".

## 35.14 Bridge to Chapter 36 and Sanity Checks

The unifying message of this chapter is operational: **trust the
math, distrust the metaphors**. The formalism — unit vectors,
unitaries, projectors, the Born rule, density matrices, partial
traces — predicts every measurable consequence of quantum mechanics,
and every popular slogan that contradicts the formalism is a slogan
to be retired. The interpretations zoo is real but operationally
downstream of the math; the foundational results (PBR, Bell,
no-signalling) constrain the ontology you can tell but do not
change the algorithms you can write. Chapter 36 takes the next step
outward: how to evaluate quantitative *claims* — about benchmarks,
speedups, hardware milestones — using the same discipline that this
chapter applied to qualitative metaphors. The two chapters together
form the field's anti-hype toolkit.

**Sanity checks before moving on.**

1. State, in one sentence each, why "quantum parallelism" and
   "spooky action at a distance" mislead a working practitioner.
2. Given a Bell pair shared between Alice and Bob, compute Bob's
   reduced state both before and after Alice measures in the
   $Z$-basis (without Bob learning the outcome). Verify they agree
   and conclude that no signal was sent.
3. Write the standard uncertainty relation for the Pauli $X$ and
   $Z$ on the state $|0\rangle$. Confirm that the lower bound
   matches the explicit computation of $\Delta X \cdot \Delta Z$
   and that the relation says nothing about a particular act of
   measurement.
4. For each of Copenhagen, many-worlds, and QBism, name one
   intuition each one *helps* a practitioner with and one
   intuition each one is liable to *corrupt*.
5. Take a published "quantum advantage" claim of your choice and
   classify it along the §35.8 axes: oracle vs. unconditional,
   with or without QRAM, asymptotic vs. concrete crossover. Note
   which axes the published abstract specifies and which it leaves
   implicit.

---

[← Previous: Chapter 34](34-bridging-to-familiar-engineering-ideas.md) · [Table of Contents](../../README.md) · [Next: Chapter 36 →](36-how-to-judge-claims.md)
