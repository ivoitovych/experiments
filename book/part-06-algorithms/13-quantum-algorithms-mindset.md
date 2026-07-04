# Chapter 13. The Quantum Algorithms Mindset

> **Status:** draft · **Phase:** 3 · **Sections drafted:** 8 / 8

[← Previous: Chapter 12](../part-05-measurement-and-information/12-quantum-information-theory.md) · [Table of Contents](../../README.md) · [Next: Chapter 14 →](14-foundational-algorithms.md)

Part 5 closed the static and informational picture: states, channels, entropies, capacities. Part 6 starts the algorithmic one. Before we look at any specific algorithm, this chapter establishes the mental model that makes the algorithms intelligible. It is short, deliberately opinionated, and meant to inoculate against the most common misreadings of what a quantum computer does. The chapter has no new mathematics that is not already in Chapters 5–9; what it adds is a way of looking at the next four chapters.

> **How to read this chapter.** Treat it as a reader's guide for Part 6, not as a results chapter. There are no theorems to prove and no circuits to memorise here. The three "primitives" in §§13.1, 13.2, and 13.4 — with the query model of §13.3 as their cost framework — and the resource-accounting vocabulary in §13.7 are the parts you will reuse. The complexity-theoretic framing in §13.7 can be skimmed on a first pass and revisited after Chapter 15 (Shor and Grover); the warnings about "quantum parallelism" in §13.1 and about "quantum-inspired" methods in §13.5 are worth absorbing before you read any popular account of the field.

## 13.1 Amplitude Manipulation

The slogan "a quantum computer tries all answers at once" is, taken literally, false in a way that misleads more than it teaches. A single application of a unitary $U$ to $H^{\otimes n}|0^n\rangle = \tfrac{1}{\sqrt{2^n}}\sum_x |x\rangle$ does evaluate $U$ "on every $x$" in the sense that each $|x\rangle$ acquires the amplitude $U_{yx}$ in the output. But measurement returns a single $y$, sampled from $|\sum_x U_{yx}/\sqrt{2^n}|^2$. The exponential number of intermediate evaluations has been compressed back to one bit string. A single quantum query gives the same *raw* per-shot information rate as a single classical query — at most $n$ bits — but as Deutsch–Jozsa and Bernstein–Vazirani show (§§14.2, 14.3), interference can pack a global feature of the function into those bits in a way no single classical query can.

What makes quantum computation work is not parallel evaluation but **interference**: the amplitudes for different computational paths add coherently before being squared, and a well-designed algorithm arranges for the amplitudes leading to wrong answers to cancel while the amplitudes leading to right answers reinforce. The Hadamard transform $H^{\otimes n}$ is the workhorse for setting up such interferences because it spreads a single basis state into a uniform superposition with controllable signs:

$$
H^{\otimes n}|x\rangle \;=\; \frac{1}{\sqrt{2^n}}\sum_{y \in \\{0,1\\}^n} (-1)^{x \cdot y} |y\rangle.
$$

The $(-1)^{x \cdot y}$ factor is the smallest possible useful interference pattern, and it is the structural reason the same $H^{\otimes n}$ appears at the start and at the end of nearly every black-box algorithm in Chapter 14. The algorithm injects information into the *phases* between input and output Hadamard layers; the final Hadamard converts those phases back into a bit string that measurement can read.

The mindset shift to internalise: a quantum algorithm is an **amplitude-shaping** machine, not a parallel evaluator. Asking "what state is the register in after step $k$?" is less productive than asking "for each output bit string $y$, which paths contribute, and do their amplitudes add or cancel?" When this question has a clean answer, an algorithm exists. When it does not, no amount of superposition will rescue you.

## 13.2 Phase Kickback

The second primitive is **phase kickback**, introduced operationally in §9.3. It is the trick by which information stored in the *target* register of a controlled unitary ends up in the *control* register as a relative phase. Formally, if $|u\rangle$ is an eigenstate of $U$ with eigenvalue $e^{2\pi i \varphi}$, then

$$
\mathrm{C}(U)\bigl(|c\rangle \otimes |u\rangle\bigr) \;=\; e^{2\pi i \varphi c} |c\rangle \otimes |u\rangle.
$$

The eigenphase $\varphi$ has been "kicked back" from the target onto the control. Now apply $H$ on the control before and after, and the phase $\varphi$ becomes a measurable bit pattern.

The two algorithmic templates this enables are everywhere in Part 6.

**Function-evaluation kickback.** Given a classical function $f : \\{0,1\\}^n \to \\{0,1\\}$ exposed as the reversible oracle $U_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle$ (§9.3), prepare the target ancilla in $|-\rangle = (|0\rangle-|1\rangle)/\sqrt{2}$. Then

$$
U_f|x\rangle|-\rangle \;=\; (-1)^{f(x)} |x\rangle|-\rangle.
$$

The function value, originally an output bit, is now a sign on the input register. Deutsch (§14.1), Deutsch–Jozsa (§14.2), Bernstein–Vazirani (§14.3), and Grover (Chapter 15) all start from this rewrite.

**Eigenphase kickback.** Given a unitary $U$ with eigenstate $|u\rangle$ on hand, controlled applications of powers $U^{2^k}$ kick the binary expansion of $\varphi$ onto a register of control qubits. This is the engine of phase estimation (§14.6) and of Shor's algorithm (Chapter 15).

The unifying picture: kickback is how a quantum circuit *reads* a function. The circuit cannot directly observe $f(x)$ while preserving superposition, but it can use the function value to *re-phase* the input register, and that re-phasing is precisely the input to the next Hadamard layer. Every algorithm in Chapter 14 is, structurally, three steps: prepare a uniform superposition, use the oracle to imprint a phase pattern, and then apply a transform that turns that phase pattern into a measurable bit string.

## 13.3 Oracle-Based Thinking

Most of the foundational quantum algorithms are stated in the **query model**, in which the input is not a string but a *function* $f$ accessible only through a unitary black box $U_f$. The cost of the algorithm is its **query complexity**: the number of times $U_f$ (or $U_f^{\dagger}$) is invoked. Gate count, ancilla count, and depth are secondary in this model — they are bounded indirectly through how complicated each query call is.

The query model is not a peculiarity of theorists. It captures the situation where the input is huge but accessed via a uniform rule (the bits of $\pi$, the entries of a sparse matrix, a database row), and it admits sharp lower bounds via tools such as the polynomial method and the adversary bound. When a quantum algorithm "beats" a classical one, the comparison is almost always: $q$ quantum queries versus $q'$ classical queries on the same oracle, with $q < q'$ provably or asymptotically.

A few framing rules worth absorbing.

**The oracle is a unitary.** It must be reversible. A classical function $f$ is wrapped into $U_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle$ precisely so that $U_f^2 = I$ and $U_f$ has a clean adjoint. There is no quantum oracle for "set $y$ to $f(x)$"; that operation is not reversible.

**One query is one $U_f$.** Two queries means two applications of $U_f$, possibly with intervening unitaries. A controlled $U_f$ on a superposition is still one query; running $U_f$ on every basis state in the superposition does not cost $2^n$ queries.

**Promise problems are common.** Deutsch–Jozsa, Simon, and most query-model separations are *promise* problems: the oracle is guaranteed to belong to a restricted family (constant-or-balanced, $\mathbb{Z}_2^n$-periodic). Without the promise, exponential separations usually collapse. Whether the promise is realistic in practice is the first question to ask about any oracle algorithm.

**Black-box separations are not automatically practical.** A separation between query complexities does not by itself imply a separation between practical running times: the oracle has to be implementable, and implementation cost may dominate query cost. This caveat is the boundary between query-model and uniform-circuit-model results, and it returns in §13.5 and §13.7.

## 13.4 Transform-Domain Thinking

The third primitive is the **quantum Fourier transform** (QFT) and its avatars. Where the Hadamard transform $H^{\otimes n}$ is the Fourier transform over $\mathbb{Z}_2^n$, the full QFT over $\mathbb{Z}_N$ is the unitary

$$
F_N |x\rangle \;=\; \frac{1}{\sqrt{N}} \sum_{y=0}^{N-1} e^{-2\pi i x y / N} |y\rangle,
$$

implementable on $n = \log_2 N$ qubits with $O(n^2)$ gates (§14.5). The QFT diagonalises shift-invariant operations, just like the classical DFT, but it does so *in superposition*, which means a single application acts on the entire input register at once.

What this primitive buys algorithmically:

**Periodicity detection.** If a function $f$ on $\mathbb{Z}_N$ is $r$-periodic, then the Fourier transform of a uniform superposition over its support is concentrated on multiples of $N/r$. Measuring after QFT yields a sample from those multiples, and a few samples plus the continued-fraction algorithm recover $r$. This is the structural core of Shor's algorithm (Chapter 15) and of the hidden-subgroup framework (Chapter 14).

**Phase estimation.** Given a unitary $U$ with an eigenstate $|u\rangle$ and eigenphase $e^{2\pi i \varphi}$, the **quantum phase estimation** subroutine outputs an $m$-bit approximation of $\varphi$ using $m$ controlled-$U^{2^k}$ stages and an $O(m^2)$-gate inverse QFT. The payoff comes when the powers $U^{2^k}$ are cheap to implement — by repeated squaring of an efficient circuit, as in Shor's modular exponentiation — rather than by $2^k$ literal applications of a black-box $U$ (§14.6 develops this caveat). Phase estimation is the algorithmic engine of Shor's algorithm (the period $r$ is read off as a phase), of quantum-simulation eigenvalue extraction (Chapter 16), and of HHL-style linear-system solvers.

The mindset shift: many problems that look "structureless" in the time/computational-basis domain reveal *exploitable* structure in the Fourier/eigenphase domain. The algorithm designer's question is rarely "can I evaluate $f$ on all inputs?" — it is "is there a transform under which $f$'s relevant features become a measurement outcome?" For abelian groups the answer is "yes, the QFT over the group"; for some non-abelian groups it is "partially"; outside that, transform-domain thinking degrades and other primitives (amplitude amplification) take over.

## 13.5 Hidden-Structure Extraction

Many concrete quantum algorithms reduce to the same template: an unknown classical object (a period, a hidden subgroup, a marked input) is encoded as structure in the *amplitudes* of a state, and a unitary subroutine extracts that structure into a measurable register. This is the **hidden-structure** template, and it covers everything from Deutsch–Jozsa through Simon, Shor, and Grover.

A schematic recipe shared by Chapter 14's black-box algorithms:

$$
|0^n\rangle|0\rangle \xrightarrow{H^{\otimes n} \otimes \mathrm{init}} \frac{1}{\sqrt{2^n}}\sum_{x} |x\rangle|-\rangle \xrightarrow{U_f} \frac{1}{\sqrt{2^n}}\sum_{x} (-1)^{f(x)} |x\rangle|-\rangle \xrightarrow{H^{\otimes n}} \sum_{y} \alpha_y |y\rangle \xrightarrow{\mathrm{measure}} y.
$$

Three remarks on this template.

**The structure of $f$ determines what $H^{\otimes n}$ produces.** For constant $f$, the post-Hadamard amplitudes concentrate on $|0^n\rangle$. For balanced $f$, they avoid $|0^n\rangle$ entirely (Deutsch–Jozsa, §14.2). For an $f$ hiding a vector $s$ in $\mathbb{Z}_2^n$, the amplitudes are nonzero only on $y$ satisfying $s \cdot y = 0$ (Simon, §14.4). The same circuit, with the same primitives, decodes different structure when fed different oracles.

**The work happens in the oracle phase, not in the transforms.** $H^{\otimes n}$ at the start and the end are universal — they do not know what algorithm they are part of. The algorithmic content lives in *how the oracle's phase pattern interacts with the Fourier basis*. This is why the same Hadamard sandwich shows up in algorithm after algorithm: the basis change is generic; only the phase pattern is problem-specific.

**Amplitude amplification (Grover-style) is a different idiom.** Where Hadamard-sandwich algorithms exploit *structured* phase patterns, amplitude amplification works on *unstructured* search: it iteratively reflects amplitudes about the all-states average and about the marked-states subspace, rotating amplitude into the marked subspace at a rate of $O(1/\sqrt{N})$ per iteration. The number of iterations needed to reach success probability $\Theta(1)$ is $O(\sqrt{N})$, giving the famous quadratic speedup of Chapter 15.

A caveat that has become loud in the last decade: a quantum-inspired classical algorithm — most prominently Tang's dequantisation of recommendation systems — can sometimes match a claimed quantum speedup *if the input model assumed by the quantum algorithm is correspondingly powerful classically*. Hidden-structure speedups are not automatically immune. Always check whether the input access model the quantum algorithm assumes (block encoding, $\mathrm{QRAM}$, classical sampling oracles) has a fair classical analogue.

## 13.6 Probabilistic Success and Repetition

Most quantum algorithms are intrinsically probabilistic. They output the right answer with probability $p$ bounded away from $1/2$ (or, for some problems, $1 - o(1)$), and they are run repeatedly with majority voting or with a classical verification step that catches wrong answers. The mindset is closer to randomised classical algorithms (Monte Carlo, Las Vegas) than to deterministic ones.

Three patterns recur.

**Bounded-error decision.** The algorithm outputs a bit; the probability of error is at most $1/3$ on every input. Repeating $k$ times and taking the majority reduces error to $e^{-\Omega(k)}$ by a Chernoff bound, so high-confidence answers cost a logarithmic multiplicative overhead. The complexity class $\mathrm{BQP}$ is defined this way and is closed under such amplification.

**Verifiable output.** The algorithm outputs a candidate answer (a factor of $N$, a period $r$); a classical post-processing step verifies the answer in polynomial time. Wrong answers are detected and discarded; the algorithm is rerun until a correct answer surfaces. Shor's algorithm (Chapter 15) is the canonical example — phase estimation occasionally returns the wrong multiple of $N/r$, and the continued-fraction post-processing extracts a candidate $r$, which is then verified directly by checking $a^r \equiv 1 \pmod N$.

**Amplitude-amplification fixed point.** Grover-style algorithms admit *exact* success-probability tuning by stopping at the right iteration count — too few iterations leaves amplitude in the unmarked subspace, but *too many* iterations overshoots and rotates amplitude out. Variants (Grover with unknown number of solutions, fixed-point amplitude amplification) work around the overshoot risk.

A few rules of thumb for the algorithmic mindset.

**Always quote the success probability.** "Solves problem $P$ in $T(n)$ time" is incomplete; the right statement is "solves $P$ with probability $\geq 2/3$ in $T(n)$ time". The constant $2/3$ is conventional; any $1/2 + \Omega(1)$ suffices for amplification.

**Count the post-processing.** Classical verification, continued-fraction expansion, and majority voting all cost time. For most algorithms in Part 6 this cost is polynomial in $n$ and negligible compared to the quantum subroutine, but the discipline of counting it explicitly catches subtle mistakes.

**Repetition is not free on hardware.** Each run consumes circuit time, qubit calibration, and (on cloud devices) money. A "polynomial" overhead in the asymptotic statement can be hundreds of shots in practice, and shot count is one of the things vendor benchmarks track most carefully.

## 13.7 Complexity-Theoretic Framing

The complexity class capturing efficient quantum computation is $\mathrm{BQP}$ — **bounded-error quantum polynomial time** — the class of decision problems solvable by a uniform family of polynomial-size quantum circuits with bounded probability of error. The known containments are

$$
\mathrm{P} \;\subseteq\; \mathrm{BPP} \;\subseteq\; \mathrm{BQP} \;\subseteq\; \mathrm{PSPACE},
$$

with $\mathrm{BQP} \subseteq \mathrm{AWPP}$ also known. The relationships are mostly open and the beliefs are not uniform: $\mathrm{P} = \mathrm{BPP}$ is widely expected (derandomisation), whereas $\mathrm{BPP} \subsetneq \mathrm{BQP}$ and $\mathrm{BQP} \subsetneq \mathrm{PSPACE}$ are believed but unproven. *No* strict separation among $\mathrm{BPP}$, $\mathrm{BQP}$, and $\mathrm{PSPACE}$ has been proved; the only nearby unconditional separation is the coarse $\mathrm{P} \subsetneq \mathrm{EXP}$ from the time hierarchy theorem (§17.1). Whether $\mathrm{BQP} = \mathrm{BPP}$ — whether quantum computers can be efficiently simulated by classical randomised computers in general — is open. The standard *belief* is no, supported by the candidate hard problems below; the standard *proof* is absent.

Three regions on the quantum-speedup map are worth fixing in mind.

**Exponential speedups.** Believed but not proven. The flagship cases live in the *abelian hidden subgroup* family: factoring (Shor, Chapter 15), discrete logarithm, Pell's equation, period finding. The structural reason is the QFT over $\mathbb{Z}$ or $\mathbb{Z}_N$ (§13.4). Beyond the abelian case, hidden-subgroup speedups become sporadic and fragile, with the dihedral and symmetric groups long resisting attack.

**Polynomial speedups.** Provable, ubiquitous, and based on amplitude amplification. Grover's algorithm gives a quadratic speedup for unstructured search; element distinctness, collision finding, and many graph problems inherit polynomial speedups from Grover-style subroutines or from the *quantum walk* framework. Quadratic speedups are robust but easily eroded: in fault-tolerant settings, the constant overhead of error correction can absorb a factor-of-$\sqrt{n}$ improvement, and one must compare the *fault-tolerant* end-to-end quantum running time (including error-correction overhead) to the *best practical* classical running time on the same problem instance to judge whether the speedup survives.

**Simulation speedups.** Quantum systems are believed to be hard to simulate classically; running a quantum computer to simulate them is the original Feynman motivation. Quantum simulation of local Hamiltonians (Chapter 16) admits provable polynomial-time algorithms, and the speedup over the best known classical algorithms is exponential for many natural physical problems — a *best-known-algorithm* gap rather than a proved unconditional complexity separation. This is the speedup most likely to be of practical importance in the near term.

Two cautions worth carrying into Part 6.

**Query complexity vs. time complexity vs. gate complexity vs. T-count.** These are four different cost metrics, and the answer to "what is the best quantum algorithm for $P$?" depends on which you mean. Query complexity counts oracle calls. Time complexity counts gates from a fixed universal set. Gate complexity may distinguish two-qubit gates (expensive) from single-qubit gates (cheap). **T-count**, in fault-tolerant settings, is the dominant cost because every $T$ gate consumes a magic state (§8.10). When reading a paper, identify which metric the authors are optimising.

**"Quantum-inspired" and dequantisation.** Some classical algorithms inspired by quantum techniques (notably tensor-network methods for many-body systems and Tang-style sampling algorithms for low-rank linear algebra) match or come close to claimed quantum speedups under realistic input-access models. A 2018-vintage "exponential speedup" can deflate to a polynomial one when the classical access model is corrected. This does not invalidate the quantum algorithms — it sharpens the question of where the *genuine* speedups live. In Part 6 we will be explicit about input-access assumptions and about which speedups survive scrutiny.

## 13.8 Bridge to Chapter 14

This chapter framed *how to think* about quantum algorithms; Chapter 14 starts on the concrete catalogue. The four black-box algorithms there — Deutsch, Deutsch–Jozsa, Bernstein–Vazirani, and Simon — are all single applications of the §13.5 template: prepare a uniform superposition with $H^{\otimes n}$, query the oracle once or a small number of times to imprint a phase pattern, and apply $H^{\otimes n}$ again to convert that pattern into a measurement outcome. They give the smallest possible illustrations of phase kickback (§13.2), of oracle-query thinking (§13.3), and of hidden-structure extraction (§13.5). Simon's algorithm, in particular, is the algorithm Shor saw and generalised; reading it well makes Chapter 15 read itself.

**Sanity checks before moving on.**

1. State, in one sentence, why the slogan "a quantum computer tries every input in parallel" is misleading, and what replaces it in the amplitude-shaping picture of §13.1.
2. Given the oracle $U_f|x\rangle|y\rangle = |x\rangle|y \oplus f(x)\rangle$ and the ancilla $|-\rangle$, verify by direct calculation that $U_f|x\rangle|-\rangle = (-1)^{f(x)}|x\rangle|-\rangle$. Identify which step is "phase kickback."
3. For $n = 3$, compute $H^{\otimes 3}|101\rangle$ and identify which output basis states acquire a minus sign. Confirm the pattern matches the $(-1)^{x \cdot y}$ formula in §13.1.
4. List the four cost metrics from §13.7 (query, time, gate, $T$-count) and give one concrete scenario in which each is the dominant cost.
5. Sketch, without computing anything, the difference between an algorithm that exploits *structured* phase patterns (Hadamard sandwich) and one that uses *unstructured* amplitude amplification (Grover). Which one of Chapter 14's algorithms is the cleanest example of the former?

---

[← Previous: Chapter 12](../part-05-measurement-and-information/12-quantum-information-theory.md) · [Table of Contents](../../README.md) · [Next: Chapter 14 →](14-foundational-algorithms.md)
