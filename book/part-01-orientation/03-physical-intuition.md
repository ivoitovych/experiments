# Chapter 3. Physical Intuition Behind Quantum Mechanics

> **Status:** prereviewed · **Phase:** 6 · **Sections drafted:** 11 / 11

[← Previous: Chapter 2](02-classical-to-quantum-contrast.md) · [Table of Contents](../../README.md) · [Next: Chapter 4 →](../part-02-formalism/04-mathematical-background.md)

Chapter 2 contrasted classical and quantum computation at the level of
state-space objects and operations. This chapter steps back from
computation and looks at the *physics* that forces those objects on
us. The goal is to build the kind of mental model a working
quantum-software practitioner needs: not a complete tour of quantum
theory, but a set of experimental facts and conceptual reflexes that
make the formalism in Chapters 4 and 5 feel motivated rather than
arbitrary.

The chapter is **deliberately light on formulas**. Every numerical
claim is justified to one significant figure or restated as a
qualitative pattern, and every named experiment is one whose
implications survive the transition to the gate model without
modification. The mathematics arrives in Chapter 4; the postulates
that compress this physics into rules arrive in Chapter 5. Read
those chapters with the experiments in this one in mind, and the
postulates should feel like the *minimal* description of what is
actually observed rather than a list of axioms imposed from above.

Three points to keep in mind:

1. Quantum mechanics is **empirically forced**, not philosophically
   preferred. Every postulate of Chapter 5 is the compressed summary
   of an experiment (or a family of experiments) that came out a
   specific way and no other way. The experiments in this chapter
   are the load-bearing ones.
2. The intuitive vocabulary that quantum mechanics inherited from
   the early twentieth century ("wave-particle duality", "the
   observer", "collapse") is *historical*, not technical. Most of
   the popular-science framings carry baggage that obscures the
   actual content. Where a phrase is misleading, this chapter
   names the misleading framing and replaces it with the operational
   one.
3. The target intuition for a quantum-computing practitioner is
   compact: a system's state is a vector in a complex Hilbert space,
   evolved by unitaries, projected by measurements, with amplitudes
   that **interfere** before they become probabilities. Everything
   in this chapter is in service of making that one sentence feel
   inevitable rather than imposed.

> **How to read this chapter.** §§3.1–3.4 (quantization,
> wavefunctions, superposition, interference) carry most of the
> conceptual weight; read them carefully. §§3.5–3.6 (measurement and
> measurement back-action) develop the operational picture and feed
> directly into the measurement postulate of Chapter 5. §§3.7–3.8
> (uncertainty and entanglement) introduce the two phenomena that
> separate quantum mechanics most sharply from classical mechanics
> and are referenced repeatedly later; do not skim. §§3.9–3.10
> (decoherence and open vs. closed systems) explain why the
> idealized postulates of Chapter 5 are idealized, and what the
> hardware chapters in Part IX will have to deal with. None of the
> sections depends on quantum-mechanical formalism that has not yet
> been introduced, so the chapter can be read straight through on
> first pass.

## 3.1 Quantization

The first empirical surprise of quantum mechanics is that physical
quantities which look continuous when measured in bulk turn out, at
the microscopic level, to take only a discrete spectrum of values.
Energy levels of bound electrons in atoms, the angular momentum of
isolated systems, the spin projection of an electron along any
chosen axis — all of these come in *quantized* units that no
classical model predicts.

The cleanest and most decisive demonstration of quantization is the
**Stern-Gerlach experiment** (Stern and Gerlach, 1922). A beam of
neutral silver atoms is sent through a region of inhomogeneous
magnetic field oriented along an axis, conventionally called $z$.
The classical prediction is straightforward: each atom carries a
magnetic moment pointing in some direction, the field gradient
exerts a force proportional to the $z$-component of that moment,
and the beam should fan out into a continuous smear on a detector
screen, with as many landing positions as there are orientations
the magnetic moment could have had.

That is not what happens. The beam splits into exactly *two* spots,
symmetrically placed above and below the original beam axis. The
silver atom's outermost electron carries angular momentum whose
$z$-component, when measured, takes one of exactly two values —
later identified as $+\hbar/2$ and $-\hbar/2$, the eigenvalues of
spin-$1/2$. There is no intermediate value, ever. Whatever the
prior history of the atom, the $z$-component of its spin reads out
as one of two discrete numbers.

The experiment is the prototype for everything quantum-computational
about a qubit. A spin-$1/2$ particle in a magnetic field oriented
along $z$ is a two-level system: the $z$-axis Stern-Gerlach apparatus
is its computational-basis measurement, and the two outcomes are
the labels $0$ and $1$. The fact that the readout is *discrete* —
two outcomes, not a continuum — is the physical origin of the qubit's
two-dimensional state space.

Quantization is not a property of measurement alone; it is a property
of the bound or constrained system being measured. Free particles
in unbounded space have continuous spectra. Electrons confined to
atoms, photons confined to optical modes, spins confined to a chosen
projection axis — these are the contexts in which quantization
appears, and they are precisely the contexts in which we build
qubits.

## 3.2 Wavefunctions and Probability Amplitudes

A quantum system at a given instant is described by a complex-valued
object called a **wavefunction**, or in finite-dimensional contexts a
**state vector**, written $|\psi\rangle$. The wavefunction is *not*
something directly observable. What is observable is a list of
classical outcomes from a chosen measurement, occurring with
probabilities computed from $|\psi\rangle$ according to the **Born
rule**: the probability of obtaining outcome $m$ is the squared
modulus of the *amplitude* the wavefunction assigns to that outcome.

The crucial word is *amplitude*. Classical probability theory works
with non-negative real numbers between $0$ and $1$ that sum to one.
Quantum mechanics works with **complex numbers** whose squared moduli
sum to one. Each amplitude carries both a magnitude and a phase, and
the phase is invisible to a single measurement but visible to the
*pattern* of measurements that follow further operations on the
system.

The cleanest illustration of an amplitude as a physical quantity is
the **polarization of a single photon**. Light's polarization is the
direction of oscillation of its electric field; for a single photon
this direction is described by a two-component complex vector that
behaves exactly like a single-qubit state. A photon prepared in
horizontal polarization $|H\rangle$ and sent through a polarizer
tilted at angle $\theta$ from horizontal passes the polarizer with
probability $\cos^2\theta$ — Malus's law, derived in classical optics
but valid photon-by-photon. The amplitude for the photon to pass is
$\cos\theta$; the probability is its square. The photon does not
"partially pass"; it either passes (with probability $\cos^2\theta$)
or is absorbed (with probability $\sin^2\theta$). The wavefunction
encodes the amplitude; the detector reads out a sample.

A few things to take from this:

- The wavefunction is a **bookkeeping device for amplitudes**, and
  the amplitudes only become probabilities at measurement time. A
  state with amplitudes $(\alpha, \beta)$ and a state with amplitudes
  $(e^{i\theta}\alpha, \beta)$ assign the same probabilities to
  any single measurement in the natural basis, but they behave
  differently under any subsequent operation that recombines the
  two components.
- The amplitudes are complex, not real. The factor of $i$ is not
  decorative. It is what allows phases to add and subtract in a way
  that produces interference; a probability theory with real
  amplitudes can be built, but it does not reproduce the observed
  experiments (Aaronson's *Quantum Computing Since Democritus*
  spends a chapter on why complex amplitudes are the unique choice).
- The wavefunction is **not a field in physical space** in any
  literal sense, even though for a single particle moving in three
  dimensions it can be written as a function of position. For
  multi-particle systems the wavefunction lives in a much larger
  configuration space, not in three-dimensional space. Treating
  $|\psi\rangle$ as an abstract vector in a Hilbert space — which is
  the move Chapter 4 makes — avoids almost all the conceptual traps
  that single-particle position-space framing introduces.

Polarization will recur throughout the chapter and the book as the
canonical clean physical implementation of a qubit. Two orthogonal
polarization states are the basis; superpositions are intermediate
polarizations; phase differences between the two components are
elliptical polarizations; and the natural measurement device — a
polarizing beam splitter — is a perfect projective measurement.
Every textbook qubit identity has a polarization-photon translation,
and many of the foundational quantum-information experiments were
carried out on polarization-encoded photons for exactly that reason.

## 3.3 Superposition

If the wavefunction is a vector in a complex space, then arbitrary
linear combinations of valid wavefunctions are themselves valid
wavefunctions. This is the **principle of superposition**, and it is
the structural feature that makes quantum state spaces fundamentally
unlike classical state spaces.

Concretely, if $|\psi_1\rangle$ and $|\psi_2\rangle$ are two physical
states of a system, then any nonzero combination
$\alpha |\psi_1\rangle + \beta |\psi_2\rangle$, once normalised, is also
a physical state. When the two are orthonormal — as spin-up and
spin-down along $z$ are — normalisation is just
$|\alpha|^2 + |\beta|^2 = 1$. The Stern-Gerlach experiment reads it out as "spin up with
probability $|\alpha|^2$ or spin down with probability $|\beta|^2$"
when measured along $z$, but that is a property of the *measurement*,
not a description of the state. The state itself is a single,
definite vector — it is not "secretly up" or "secretly down" before
the measurement; it is genuinely the superposition.

The most direct experimental window into superposition is the
**Mach-Zehnder interferometer**. A single photon enters a beam
splitter that sends it into one of two paths with equal amplitude.
A pair of mirrors brings the paths back together at a second beam
splitter, after which two detectors monitor the two output ports.
If we *believe* the photon takes one path or the other — that the
first beam splitter randomly routed it into path $A$ or path $B$ —
then a calculation of probabilities at the second beam splitter
predicts both detectors fire with probability $1/2$.

That prediction is wrong. With paths of equal length, one detector
fires every time and the other never fires. The pattern is
*deterministic*, not random; displacing one of the mirrors by a
fraction of a wavelength continuously shifts the firing probability
between the two detectors, sweeping through the full pattern of a
standard two-slit interference fringe. The photon — a single
indivisible quantum of light — went *through both paths*, in the
sense that the amplitudes for the two paths combined at the second
beam splitter according to the superposition rule, and the
combination of amplitudes (not probabilities) is what determined
the outcome.

The Mach-Zehnder result is reproducible with **electrons** (Tonomura
and collaborators, 1989), with **neutrons**, with **atoms**, with
**molecules** as large as $\mathrm{C}_{60}$ fullerene, and at the
time of writing with engineered macromolecules of around two
thousand atoms (Fein et al., *Nature Physics*, 2019, reported
matter-wave interference of oligoporphyrins exceeding 25,000 amu).
The superposition principle is not an artifact of the
photon's masslessness or of any subtle feature of electromagnetism;
it is a property of every system that has been tested under
sufficiently isolated conditions.

It is worth pausing on what superposition does *not* mean. It is not
"the photon is in path A with probability $|\alpha|^2$ and in path
B with probability $|\beta|^2$, we just do not know which". A
description like that would predict the wrong interferometer
output. It is also not "the photon is a wave that spreads through
both paths". The detectors at the output are *clicks*, integer
counts, not field intensities; a single photon arrives at one
detector or the other, never half at each. The superposition is a
genuine third kind of thing — a single state of a single particle
that has amplitudes on both paths and produces interference
between them when those amplitudes are recombined.

## 3.4 Interference

Interference is what makes superposition operationally meaningful.
Two amplitudes that meet at a detector add as **complex numbers**
before being squared, so amplitudes with opposite phases cancel and
amplitudes with aligned phases reinforce. This is the source of
every quantum-algorithmic speedup we know.

The textbook demonstration is the **double-slit experiment with
single electrons**, performed by Tonomura and collaborators at
Hitachi between 1986 and 1989 using a single-electron biprism
and a position-sensitive detector. Electrons are emitted one at a
time from a source, pass through a region equivalent to two narrow
slits, and land individually on the detector. Each electron arrives
at a *single point*: a discrete dot, indistinguishable from what a
classical particle would produce.

But as the dots accumulate over hours, an **interference pattern
builds up** statistically. The cumulative image is the familiar
double-slit fringe pattern — bands of high intensity separated by
bands where almost no electrons land. The pattern is not visible
in any single electron's trajectory; it is a property of the
*distribution* of landing positions over many independently emitted
electrons.

Tonomura's experiment is the cleanest demonstration that quantum
mechanics is neither "particles" nor "waves" in a classical sense.
Each electron lands as a particle; the population of landing
positions is governed by an amplitude that obeys wave-like
superposition. The same individual quantum carries both aspects in
sequence — wave-like during propagation, particle-like at detection.
That is the operational content of what older textbooks called
"wave-particle duality"; framed correctly, there is no duality at
all, just a single kind of object whose amplitude propagates and
whose detection is discrete.

A consequence worth holding onto: **interference is exploitable**.
A quantum algorithm is, in essence, a procedure for arranging the
amplitudes of unwanted answers to interfere destructively and the
amplitudes of wanted answers to interfere constructively, so that
a final measurement returns a useful outcome with high probability.
Grover's search (Chapter 15), the quantum Fourier transform
(Chapter 14), and the heart of Shor's factoring algorithm
(Chapter 15) are all variations on this theme. The reason these
algorithms exist at all is the same reason the Mach-Zehnder
produces deterministic clicks: amplitudes combine before they
become probabilities.

A second observation: **interference requires indistinguishability**.
If at any point during the experiment a measurement is performed
that reveals which path the system took — even in principle, even
by an environmental degree of freedom no human looks at — the
interference disappears. The double-slit pattern washes out into
the classical sum of two single-slit patterns. The "principle"
underneath this is operational: amplitudes only add when the paths
they sit on lead to indistinguishable outcomes. Any tag that
distinguishes them removes the interference. The next two sections
develop this idea.

## 3.5 Measurement

A measurement, in the operational quantum-mechanical sense, is any
interaction between the system and a piece of apparatus that
produces a **classical record** — a pointer position, a detector
click, a stored bit. The measurement is described by a basis in
the system's Hilbert space (or more generally a collection of
outcomes); the apparatus reports which basis element the system
ended up in, with probabilities given by the Born rule.

The Stern-Gerlach experiment is the canonical example. A Stern-Gerlach
device oriented along the $z$ axis is a projective measurement in
the $\\{|{\uparrow_z}\rangle, |{\downarrow_z}\rangle\\}$ basis. A
spin sent into the device emerges in one of those two basis states,
and a downstream detector records which. Replace the $z$ device with
one oriented along $x$ and the measurement is in the
$\\{|{\uparrow_x}\rangle, |{\downarrow_x}\rangle\\}$ basis — a
different basis of the *same* two-dimensional state space, related
to the $z$ basis by a unitary rotation.

The empirical core of quantum measurement is the Born rule. Prepare
many identical copies of a state $|\psi\rangle$, run each through the
same measurement apparatus, and the relative frequencies of the
outcomes converge to the squared moduli of the corresponding
amplitudes. The rule is statistical: any individual run produces a
single outcome, and the wavefunction predicts only the distribution
the outcomes draw from. The "measurement problem" — why a single
specific outcome occurs in any given run, rather than the full
distribution — is a question this book does not need to settle.
What matters for quantum computing is the operational content:
measurements return classical samples from a distribution computed
from the wavefunction.

Two practical implications:

- **Most observables have no fixed value before measurement**.
  Asking "what is the $z$-spin of this electron?" when the electron
  is prepared in $|{\uparrow_x}\rangle$ is like asking "is this
  vector horizontal or vertical?" of a vector that points at 45
  degrees. There is no preexisting answer; the measurement
  *produces* one.
- **Different bases produce different statistics from the same
  state**. The state $(|0\rangle + |1\rangle)/\sqrt{2}$ measured in
  the computational basis gives $0$ and $1$ with equal probability
  and looks like a fair coin. The same state measured in the
  $\\{|+\rangle, |-\rangle\\}$ basis gives $|+\rangle$ with
  probability one and is *not* random at all. The choice of basis
  is part of the experiment.

## 3.6 Measurement Back-Action

A second feature of quantum measurement, also without classical
analogue, is that the measurement **changes the state**. After a
projective measurement returns outcome $m$, the system is in the
basis state corresponding to $m$; immediately repeating the same
measurement returns $m$ again with certainty. This is the
operational content of **wavefunction collapse**: the apparatus
emits a sample *and* leaves the system in the eigenstate
corresponding to that sample.

The sharpest demonstration is a **sequential Stern-Gerlach**
experiment. Send a spin through a $z$ device and select the
$|{\uparrow_z}\rangle$ output. Now send that filtered output
through a second $z$ device: every spin reads as $\uparrow_z$
again, with probability one. The state was prepared by the first
measurement, and the second measurement confirms it.

Now insert an $x$-oriented device between the two $z$ measurements
and select the $|{\uparrow_x}\rangle$ output. The spin entering the
second $z$ device was prepared by the first $z$ device as
$|{\uparrow_z}\rangle$, then *re-prepared* by the $x$ device as
$|{\uparrow_x}\rangle$. The second $z$ device now reads
$\uparrow_z$ with probability $1/2$ and $\downarrow_z$ with
probability $1/2$ — the spin has *forgotten* its earlier $z$ value.
The intermediate $x$ measurement destroyed the $z$ information.

This is the experimental discovery of **incompatible observables**:
operators whose measurements cannot share definite values. $z$-spin
and $x$-spin (and $y$-spin) are mutually incompatible because their
measurements physically disturb each other. Chapter 4 captures this
algebraically as a non-zero commutator; here the relevant fact is
that the disturbance is *real*, not a defect of the apparatus.
Even a perfect $x$ measurement destroys $z$ information about the
spin, because the act of forcing the spin into an $x$-eigenstate is
incompatible with leaving it in a $z$-eigenstate.

Two further points about back-action:

- **The disturbance is not knowable in advance**. A spin in
  $|{\uparrow_z}\rangle$ sent through an $x$ device emerges in
  $|{\uparrow_x}\rangle$ or $|{\downarrow_x}\rangle$ with equal
  probability. The post-measurement state is determined by the
  measurement *outcome*, not by anything about the system or the
  measurement that could have been known in advance.
- **Back-action is not "the apparatus is clumsy"**. There is no
  refined apparatus that can measure $x$-spin without disturbing
  $z$-spin. The disturbance is a property of the algebra of the
  observables, not an engineering limitation.

The mathematical compression of this physics — operators that fail
to commute have eigenbases that are mutually unbiased; measurement
in one basis randomizes a state that was prepared in another —
arrives in Chapter 4 (commutators, §4.5) and Chapter 5 (postulates
of measurement, §5.4). The conceptual fact to bring forward from
this section is simpler: **a quantum measurement is an interaction,
not a passive reading**, and the interaction reshapes the state.

## 3.7 Uncertainty

The incompatibility of $x$-spin and $z$-spin is one instance of a
general phenomenon called the **uncertainty principle**. Stated
quantitatively (the Heisenberg-Robertson form, derived in Chapter 4),
two observables $A$ and $B$ with non-zero commutator satisfy a
relation of the form

$$
\Delta A\\, \Delta B \ge \tfrac{1}{2} |\langle [A, B] \rangle|,
$$

where $\Delta A$ and $\Delta B$ are the standard deviations of the
respective measurements on a given state. For position and momentum,
this is the original Heisenberg relation $\Delta x\\, \Delta p \ge
\hbar/2$. For spin components, the constants are different but the
shape is the same: the product of the spreads in two incompatible
observables is bounded below by a constant.

The uncertainty principle is **not** a statement about measurement
imprecision in the colloquial sense. It does *not* say "you cannot
measure $x$ very accurately, and you cannot measure $p$ very
accurately". You can measure either one to arbitrary precision; what
you cannot do is prepare a state in which *both* are simultaneously
sharply defined. The uncertainty is in the *state*, not in the
apparatus.

A useful way to internalize the principle: a state with sharply
defined $z$-spin is not a state with vague $x$-spin — it is a state
with $x$-spin that is exactly $50/50$ split between $|{\uparrow_x}\rangle$
and $|{\downarrow_x}\rangle$. The spread is maximal, not noisy. The
quantum state is fully specified; it is the *classical question*
"what is the value of $x$-spin?" that has no classical answer in
this state.

For quantum computing, the uncertainty principle shows up most often
as a structural constraint on what can be measured simultaneously.
Two qubits' Pauli-$Z$ operators commute and can be measured together
(yielding two classical bits); a qubit's $Z$ and $X$ operators do
not commute and cannot. The cost of measuring incompatible
observables on the same state shows up in algorithms like the
variational quantum eigensolver (Chapter 15), where the Hamiltonian
to be estimated must be decomposed into commuting groups and each
group measured separately on freshly prepared copies of the state.

## 3.8 Entanglement

When two quantum systems interact, their joint state can settle into
a configuration that **cannot be written as a product of states of
the two subsystems**. Such joint states are called **entangled**,
and they are the source of every protocol in this book that exploits
correlations beyond what classical joint distributions allow.

The canonical entangled state of two qubits is the Bell state

$$
|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}.
$$

A measurement of either qubit in the computational basis returns
$0$ or $1$ with equal probability — taken alone, the qubit looks
maximally random. But the *outcomes are perfectly correlated*: every
time the first qubit reads $0$, the second reads $0$; every time the
first reads $1$, the second reads $1$. The randomness of each is
classical-looking, but the correlation pattern is not reducible to
any prior shared classical variable. The perfect correlation is not a
feature of the computational basis alone: if both qubits are measured
in the same *real-rotated* basis — for instance both in the $X$ basis
$\\{|+\rangle, |-\rangle\\}$, where $|\Phi^+\rangle = (|{+}{+}\rangle +
|{-}{-}\rangle)/\sqrt{2}$ — the outcomes still agree perfectly. (The
exact pattern depends on the basis: in the $Y$ eigenbasis the two
outcomes are perfectly *anti*-correlated, since $|\Phi^+\rangle =
(|y_+ y_-\rangle + |y_- y_+\rangle)/\sqrt{2}$.) This persistence of
strong correlations across several incompatible bases is what no single
prior shared classical variable can reproduce.

Entangled photon pairs are routinely produced in the laboratory by
**spontaneous parametric down-conversion (SPDC)**. A high-energy
"pump" photon (typically ultraviolet or blue) passes through a
nonlinear optical crystal — beta barium borate ($\beta$-BBO) is the
standard choice — and with low probability splits into two
lower-energy "signal" and "idler" photons whose polarizations,
momenta, and emission times are quantum-correlated. The geometry of
the crystal and the pump polarization determine the entanglement
structure; the textbook configuration produces polarization-entangled
Bell pairs at rates ranging from hundreds of detected pairs per second
per milliwatt of pump power for the classic BBO arrangement to hundreds
of thousands for modern optimized sources. SPDC sources have been the workhorse of essentially every
optical Bell-test experiment since the mid-1990s.

The empirical case for entanglement as something genuinely
non-classical was settled by a sequence of experiments testing
**Bell's theorem**. Bell showed in 1964 that any theory in which
measurement outcomes are determined by pre-existing local hidden
variables — variables carried by each particle, fixed at the
moment the particles separated, and unable to affect each other
faster than light — must satisfy an inequality on the correlations
between distant measurements. Quantum mechanics predicts that
inequality is violated for entangled states, reaching the Tsirelson
value $2\sqrt{2}$ — a *factor* of $\sqrt{2}$ above the classical bound
of $2$.

Alain Aspect and collaborators in 1982 carried out the first
experiment that addressed the *locality* loophole (within the limits
of 1980s detection technology) — the worry that
the two distant detectors might somehow communicate during the
measurement and rig the correlations — by switching the measurement
settings on each side faster than light could travel between them.
The result agreed with quantum mechanics and violated the Bell
inequality by many standard deviations. Subsequent decades closed
the remaining loopholes one by one: detection efficiency
(Rowe et al., 2001, with trapped ions; first with photons by
Giustina et al. and Christensen et al. in 2013), freedom-of-choice
(the 2010s Vienna cosmic-photon experiments — Handsteiner et al.
2017, Rauch et al. 2018 — and the 2018 BIG Bell Test), and finally a series of
**simultaneously loophole-free** Bell tests in 2015 (Hensen et al.
in Delft with NV-center spins; the Vienna and NIST photon
experiments later that year). The 2015 experiments are the
empirical capstone: the main loopholes that could let a
local hidden-variable theory survive — locality, detection efficiency,
and freedom-of-choice — have been closed simultaneously in at least
one experiment, and the results agree with quantum mechanics.
(Residual super-determinism and retrocausal loopholes are by their
nature not closable by experiment.)

A few things to take from this:

- **Entanglement is empirically real**, not a feature of an
  interpretation. Whatever theory replaces or extends quantum
  mechanics will have to predict the same Bell-violation data.
- **Entanglement does not enable faster-than-light signaling**.
  Each subsystem's local measurement statistics are the same
  whether or not the other subsystem has been measured (§5.11);
  the correlations only show up when classical results are
  brought together. This is why teleportation requires a classical
  channel (Chapter 7).
- **Entanglement is a resource**. Bell pairs can be consumed to
  perform tasks no classical resource can: teleportation,
  superdense coding, device-independent key distribution. The
  quantitative theory of entanglement as a resource is the subject
  of Chapter 12.

## 3.9 Decoherence

> **Moving-target warning — snapshot as of May 2026.** The per-platform coherence times and gate-count figures in this section reflect the best sources available in 2026 and *date quickly*. If you are reading a draft, treat every specific number here as provisional and re-verify it against current vendor, preprint, or journal sources before relying on it.

The idealized superpositions of the Mach-Zehnder interferometer and
the Bell state look fragile, and they are. A quantum system left to
interact with its environment — air molecules, stray photons,
phonons in the substrate, magnetic field fluctuations from nearby
electronics — gradually loses its interference pattern. The
amplitudes do not vanish, but they become entangled with the
environment in a way that destroys their ability to interfere
locally. This process is called **decoherence**.

A useful operational definition: decoherence is the process by which
a superposition $\alpha |\psi_1\rangle + \beta |\psi_2\rangle$
becomes effectively indistinguishable, for any measurement on the
system alone, from a *classical mixture* — a state where the system
is in $|\psi_1\rangle$ with probability $|\alpha|^2$ or in
$|\psi_2\rangle$ with probability $|\beta|^2$, with no remaining
interference between the two. The information is not gone; it has
leaked into the environment, where in principle it could still be
recovered. In practice, the environmental degrees of freedom are
inaccessible, and the subsystem looks classical-mixed.

Each physical platform has characteristic timescales for this
process. By convention the principal ones are:

- $T_1$, the **energy relaxation time**: the timescale over which a
  qubit excited to $|1\rangle$ decays to $|0\rangle$ by emitting
  energy into the environment.
- $T_2$, the **dephasing time**: the timescale over which the
  relative phase between $|0\rangle$ and $|1\rangle$ components of a
  superposition becomes randomized. $T_2$ is bounded above by
  $2 T_1$ and is usually the practically relevant figure for
  interference-based algorithms.

Order-of-magnitude figures at the time of writing: superconducting
transmon qubits, $T_1$ and $T_2$ both in the range of tens to
hundreds of microseconds; trapped-ion qubits, seconds to minutes for
hyperfine clock states; neutral-atom qubits, comparable to ions
under good vacuum; photonic qubits, no decoherence in transit but
finite loss; nitrogen-vacancy centers in diamond, milliseconds at
room temperature, seconds at low temperature.

The dimensionless figure of merit is **the ratio of coherence time
to gate time**: how many quantum operations can be applied before
the state is unrecognizable. Current superconducting hardware (as
of the mid-2020s) manages a few hundred to a few thousand gates
within $T_2$; trapped ions manage more, with slower gates. Quantum error correction
(Chapter 19 and Part IX) is the discipline of stretching a logical
qubit's effective coherence time far past any individual physical
qubit's, by encoding logical information into entangled multi-qubit
codes that detect and correct decoherence-induced errors as they
occur.

A useful conceptual point. Decoherence is **not** a separate physical
mechanism from the unitary evolution and entanglement-formation of
the rest of quantum mechanics. It is what happens when a small
system becomes entangled with a large environment whose state we
do not track. Chapter 18 makes this precise: an open-system
evolution is a unitary on the larger system-plus-environment Hilbert
space, viewed from the local perspective by tracing over the
environment. Decoherence is the loss of local interference that
results from that tracing.

## 3.10 Open vs. Closed Quantum Systems

The postulates of Chapter 5 describe **closed** quantum systems —
isolated, evolving unitarily, with no interaction with anything
outside. Real laboratory systems are **open**: they interact with
their environment, and that interaction is generally what produces
the decoherence of §3.9. Closing the gap between the two pictures
is the central practical challenge of quantum hardware engineering
and the formal subject of Chapter 18.

The basic geometric picture is straightforward. A quantum system
that exchanges energy, photons, phonons, or any other degree of
freedom with its surroundings is *part of a larger closed system*:
the system itself plus the environment. The composite evolves
unitarily (the laws of physics do not stop applying because the
boundary is hard to draw); the *subsystem*, viewed in isolation,
does not. The local description of the subsystem requires the
**mixed-state formalism** of §5.9-§5.12 — density matrices and
partial traces — and its evolution requires **quantum channels**,
the open-system generalization of unitary maps.

A second classical-quantum distinction surfaces in this context:
**the classical limit**. Macroscopic systems do not visibly behave
like Schrödinger's cat, despite being assembled from quantum parts.
Why? The standard answer is that the classical limit is the limit
of very fast decoherence. A macroscopic object — a coffee cup, a
golf ball, a person — is in constant, intense thermal contact with
its environment, and any interference between two macroscopically
distinguishable states (here vs. there, alive vs. not) decoheres
on a timescale far shorter than any timescale on which the object
could be coherently manipulated. The states do not stop being
superpositions in principle; the superpositions cease to be
observable in practice.

A complementary quantitative view: the *action* of a macroscopic
process — energy times time, or equivalently momentum times distance —
is enormous compared to Planck's constant $\hbar \approx 10^{-34}\\,
\mathrm{J\\,s}$. Wherever the relevant action scale dwarfs $\hbar$,
classical mechanics is an excellent approximation. Wherever the
relevant action approaches $\hbar$, quantum effects dominate.
Single atoms, single photons, isolated electron spins, and small
collections thereof are squarely in the second regime; baseballs
are squarely in the first. Quantum computing lives in the boundary
region: macroscopically engineered hardware operated under conditions
extreme enough (low temperature, high vacuum, deep electromagnetic
isolation) that the action scale of the relevant degrees of freedom
is comparable to $\hbar$ and the quantum behavior is preserved long
enough to compute with.

Once this picture is internalized, the dichotomy that often gets
labeled "wave-particle duality" dissolves. There is one kind of
object — a quantum system, described by a state vector — and it has
both wave-like aspects (in propagation and in superposition) and
particle-like aspects (in detection and in discreteness). Which
aspect is salient depends on the experimental context: an
interferometer experiment foregrounds the wave aspect; a counting
detector foregrounds the particle aspect. There is no underlying
"wave that sometimes becomes a particle" and no underlying
"particle that sometimes pretends to be a wave". The state vector
is the underlying object; the apparent dichotomy is a property of
the questions one asks.

---

## 3.11 Bridge to Chapter 4

The intuition this chapter aims to leave you with is compact. A
quantum system's state is a **vector in a complex Hilbert space**.
Closed-system evolution is **unitary**. Measurement is a
**projection onto a basis**, returning a classical sample drawn
from squared amplitudes. Amplitudes **interfere** before they
become probabilities, which is what makes quantum algorithms
faster than their classical equivalents at the tasks where they
are faster. Entanglement is a genuine kind of correlation between
subsystems that classical joint distributions cannot reproduce, as
the loophole-free Bell experiments of 2015 settled empirically.
Decoherence is the local image of unitary entanglement with an
inaccessible environment, and it is the dominant practical
constraint on every existing piece of quantum hardware.

Chapter 4 builds the mathematical objects — Hilbert spaces, inner
products, Hermitian and unitary operators, tensor products, the
spectral theorem, Dirac notation, the partial trace. Chapter 5
states the postulates that compress the physics of this chapter
into rules a quantum-computing system obeys. Chapter 6 specializes
all of that machinery to a single qubit — the $\mathbb{C}^2$
state space of a polarized photon, a spin-$1/2$ particle, a
transmon, or any other two-level system — and develops the Bloch
sphere as the geometric picture you will rely on for the rest of
the book.

Before turning the page, take a moment with the following
sanity-checks. Each is answered somewhere in this chapter; if any
of them feels unsettled, re-read the corresponding section.

1. The Stern-Gerlach experiment is run with three apparatuses in
   sequence: a $z$ measurement that selects spin-up, then an $x$
   measurement that selects spin-up, then a final $z$ measurement.
   What is the probability that the final $z$ measurement returns
   spin-up? (See §3.6. Answer: $1/2$ — the intermediate $x$
   measurement destroys the spin's $z$ information.)
2. A single photon is sent through a Mach-Zehnder interferometer
   with equal path lengths, set up so that one specific output
   detector fires every time. A non-destructive which-path detector
   is now inserted on one arm — a device that records which path
   the photon took without absorbing it. What is the firing pattern
   at the two output detectors after the modification? (See §3.4.
   Answer: each detector fires with probability $1/2$. The
   which-path information destroys the interference.)
3. A polarization-entangled Bell pair is shared between Alice and
   Bob, who are spatially separated. Alice measures her photon in
   the horizontal-vertical basis. Bob, who does not know Alice's
   outcome, also measures his photon in the horizontal-vertical
   basis. What does Bob see? (See §3.8. Answer: $H$ or $V$ with
   equal probability — Bob's local statistics carry no signal from
   Alice's measurement. The correlation between their outcomes only
   appears when the results are compared classically.)
4. A macroscopic object — say, a coffee cup — is built from $\sim
   10^{25}$ atoms, each of which obeys quantum mechanics. Why do we
   not see the cup in superpositions of being on the desk and on
   the floor? (See §3.10. Answer: decoherence with the environment
   destroys interference between macroscopically distinct states on
   timescales orders of magnitude shorter than any timescale on
   which the cup could be coherently manipulated. The
   superpositions exist in principle and are unobservable in
   practice.)
5. A photon is prepared in the polarization state
   $(|H\rangle + |V\rangle)/\sqrt{2}$ and sent through a polarizer
   oriented at $45^\circ$ from horizontal. With what probability
   does the photon pass the polarizer? (See §3.2. Answer: $1$.
   The $45^\circ$ polarizer projects onto exactly the state the
   photon was prepared in.)

---

[← Previous: Chapter 2](02-classical-to-quantum-contrast.md) · [Table of Contents](../../README.md) · [Next: Chapter 4 →](../part-02-formalism/04-mathematical-background.md)
