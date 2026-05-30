# Chapter 17. Complexity Theory Around Quantum Computing

> **Status:** draft · **Phase:** 3 · **Sections drafted:** 13 / 13

[← Previous: Chapter 16](../part-06-algorithms/16-modern-algorithmic-frontier.md) · [Table of Contents](../../README.md) · [Next: Chapter 18 →](../part-08-noise-and-qec/18-noise-decoherence-and-errors.md)

Part 6 catalogued algorithms one by one. This chapter steps back and asks the structural question: which problems *can* a quantum computer solve efficiently, which problems can it not, and how do those classes sit inside the older classical zoo? The complexity-theoretic picture is what tells you, before you write a single circuit, whether an algorithm of a given shape is even possible — and, conversely, why almost every exciting quantum-speedup claim has to be parsed against a precise model of resources and access.

The chapter is not a textbook on complexity. It is the working complexity vocabulary a quantum-software practitioner needs to read papers, evaluate vendor claims, and pose tractable research questions. The reader who wants the rigorous treatment should consult Arora–Barak for the classical foundations and Watrous's notes for the quantum extensions; the material here is what survives after that reading distils into "things to remember when programming".

> **How to read this chapter.** §17.1 is a recap; skip it if P/NP/BPP/PSPACE are already automatic. §17.2 and §17.3 (BQP and QMA) are the spine — every other section refers back to them. §17.4 and §17.5 (QIP, PH, PSPACE) can be read once and then used as a lookup table. §17.6–§17.7 (query and oracle separations) explain why so many "exponential speedup" results have asterisks. §17.8–§17.9 are the practitioner's reference for what "speedup" means in different settings and how to read claims of "quantum supremacy" or "quantum advantage". §17.10–§17.13 connect the theory back to engineering: gate count, $T$-count, dequantisation, and the boundary of classically simulable quantum circuits.

## 17.1 P, NP, NP-Complete, and BPP

Classical complexity classes are *sets of decision problems* — functions from $\\{0,1\\}^*$ to $\\{0,1\\}$ — graded by the resources a Turing machine uses to compute them. We need five classes for the rest of the chapter:

- $\mathrm{P}$ is the class of decision problems solvable by a deterministic Turing machine in time polynomial in the input length.
- $\mathrm{NP}$ is the class of problems for which a "yes" instance admits a polynomial-length **witness** that a deterministic verifier checks in polynomial time. Equivalently: solvable in polynomial time by a *nondeterministic* machine.
- $\mathrm{coNP}$ is the class of problems whose complement is in $\mathrm{NP}$ — "no" instances have short verifiable witnesses.
- $\mathrm{BPP}$ (**bounded-error probabilistic polynomial time**) is the class of problems solvable by a randomised polynomial-time machine with error probability at most $1/3$ on every input. Repeating $k$ times and majority-voting drives the error to $e^{-\Omega(k)}$.
- $\mathrm{PSPACE}$ is the class of problems solvable by a deterministic machine using polynomial *space*, regardless of time. Savitch's theorem gives $\mathrm{NPSPACE} = \mathrm{PSPACE}$, so nondeterminism does not help if space is the bottleneck.
- $\mathrm{EXP}$ is the class of problems solvable in time $2^{\mathrm{poly}(n)}$.

The known containments are

$$
\mathrm{P} \;\subseteq\; \mathrm{NP} \;\subseteq\; \mathrm{PSPACE} \;\subseteq\; \mathrm{EXP}, \qquad
\mathrm{P} \;\subseteq\; \mathrm{BPP} \;\subseteq\; \mathrm{PSPACE},
$$

with $\mathrm{P} \subsetneq \mathrm{EXP}$ the only strict separation proved (via the time hierarchy theorem). The relationship of $\mathrm{BPP}$ to $\mathrm{NP}$ is open in both directions; the strongest known placement of $\mathrm{BPP}$ in the hierarchy is $\mathrm{BPP} \subseteq \Sigma_2^p \cap \Pi_2^p$ (Sipser–Gács–Lautemann). Whether $\mathrm{P} = \mathrm{NP}$, $\mathrm{P} = \mathrm{BPP}$, or $\mathrm{NP} = \mathrm{PSPACE}$ are all open. The standard *belief* (informed by derandomisation results, oracle separations, and three decades of unsuccessful attacks) is that $\mathrm{P} \subsetneq \mathrm{NP}$ and $\mathrm{P} = \mathrm{BPP}$, but neither is a theorem.

**Reductions and completeness.** A problem $A$ **reduces** to $B$ in polynomial time, written $A \leq_p B$, if there is a polynomial-time function $f$ with $x \in A \iff f(x) \in B$. A problem $B$ is **$\mathcal{C}$-hard** for a class $\mathcal{C}$ if every $A \in \mathcal{C}$ reduces to $B$; it is **$\mathcal{C}$-complete** if it is $\mathcal{C}$-hard and also in $\mathcal{C}$. Completeness localises the hardness of an entire class in a single problem: $\mathrm{SAT}$ is $\mathrm{NP}$-complete (Cook–Levin), $\mathrm{QBF}$ (quantified boolean formula validity) is $\mathrm{PSPACE}$-complete, and a host of natural problems — graph 3-colouring, Hamiltonian-cycle, integer programming feasibility, vertex cover — are also $\mathrm{NP}$-complete via reductions from $\mathrm{SAT}$.

The reductionist reflex is the most useful piece of complexity-theoretic instinct to internalise. When a new problem appears, the first question is: which known-hard problem reduces to this, and which does this reduce to? The two bounds frame everything that follows.

## 17.2 BQP

The quantum analogue of $\mathrm{BPP}$ is **$\mathrm{BQP}$** — **bounded-error quantum polynomial time**. A problem is in $\mathrm{BQP}$ if there is a uniform family of polynomial-size quantum circuits $\\{C_n\\}$ such that on every input $x$ of length $n$, the circuit $C_n$ outputs the correct answer with probability at least $2/3$. *Uniform* means the description of $C_n$ is itself computable from $n$ in classical polynomial time; without uniformity one would be inadvertently smuggling unbounded advice into the class.

Three formal points are worth pinning down because they are sometimes glossed over.

- **Gate set.** The class $\mathrm{BQP}$ is the same whether the underlying gate set is $\\{H, T, \mathrm{CNOT}\\}$, $\\{H, \mathrm{CCNOT}\\}$, Clifford+$T$, or any other fixed universal set that is **efficiently** approximable by reasonable gates. The Solovay–Kitaev theorem (§8.11) shows that any single-qubit unitary can be approximated to precision $\epsilon$ by $O(\log^c(1/\epsilon))$ gates from any universal set; the polynomial overhead of compilation does not change $\mathrm{BQP}$.
- **Amplification.** Like $\mathrm{BPP}$, $\mathrm{BQP}$ is closed under success-probability amplification: running an algorithm $k$ times and majority-voting drives error from $1/3$ to $e^{-\Omega(k)}$ at a multiplicative $O(k)$ cost.
- **Function vs decision.** $\mathrm{BQP}$ is officially a class of *decision* problems. The corresponding function-problem class is sometimes called $\mathrm{FBQP}$ and is the right home for Shor's algorithm (which outputs a factor, not a yes/no answer). Most discussion treats the distinction informally.

The known unconditional containments are

$$
\mathrm{BPP} \;\subseteq\; \mathrm{BQP} \;\subseteq\; \mathrm{PP} \;\subseteq\; \mathrm{PSPACE},
$$

and

$$
\mathrm{BQP} \;\subseteq\; \mathrm{AWPP} \;\subseteq\; \mathrm{PP}.
$$

The first chain is the workhorse: $\mathrm{BPP} \subseteq \mathrm{BQP}$ because a classical randomised circuit is a special case of a quantum one (apply Hadamards to ancillas, use them as coin flips, perform reversible classical computation); $\mathrm{BQP} \subseteq \mathrm{PSPACE}$ because the amplitude of any specific output of a poly-size quantum circuit can be written as a sum-over-paths of $2^{\mathrm{poly}(n)}$ products of gate entries and computed in polynomial space by enumerating paths. The tightening to $\mathrm{BQP} \subseteq \mathrm{PP}$ is due to Adleman–DeMarrais–Huang; $\mathrm{PP}$ ("probabilistic polynomial time") is the class of problems solvable by a randomised machine with the relaxed condition that the accept probability is $> 1/2$ for yes-instances and $\leq 1/2$ for no-instances, *without* a gap. The class $\mathrm{AWPP}$ is more obscure but is the sharpest known upper bound and is occasionally invoked in oracle separations.

**Relationship to $\mathrm{NP}$.** This is the most asked and least conclusively answered question in quantum complexity. Neither $\mathrm{NP} \subseteq \mathrm{BQP}$ nor $\mathrm{BQP} \subseteq \mathrm{NP}$ is known. The popular intuition that "quantum computers solve $\mathrm{NP}$" is *wrong*: Bennett–Bernstein–Brassard–Vazirani showed in 1997 that relative to a random oracle, $\mathrm{NP} \not\subseteq \mathrm{BQP}$. Grover's $\sqrt{N}$ search (Chapter 15) is tight in the oracle model, so unstructured $\mathrm{NP}$-hard problems do *not* admit polynomial-time quantum algorithms by black-box search. Conversely, problems like *factoring* are in $\mathrm{NP} \cap \mathrm{coNP}$ (the factorisation itself is a witness either way) but are not believed to be $\mathrm{NP}$-complete, so Shor's algorithm does not yield a quantum polynomial-time algorithm for $\mathrm{SAT}$. The honest summary: **$\mathrm{BQP}$ and $\mathrm{NP}$ are believed to be incomparable.**

**$\mathrm{BQP}$-completeness.** The natural complete problem for $\mathrm{BQP}$ is, fittingly, simulating its own definition: **estimating the output probability of a polynomial-size quantum circuit** to inverse polynomial precision is $\mathrm{BQP}$-complete. More physically meaningful complete problems exist:

- **Approximating the Jones polynomial** at a fifth root of unity (Aharonov–Jones–Landau).
- **Simulating local-Hamiltonian dynamics** $e^{-iHt}|\psi_0\rangle$ for a sparse Hamiltonian $H$ to constant accuracy (this is the formal statement underlying the Feynman programme of quantum simulation).
- **Computing a specific matrix element** of $e^{-iHt}$ for sparse $H$ in $\mathrm{poly}(t, n)$ time.

The simulation problems are what make $\mathrm{BQP}$ a physically grounded class: it is precisely the class of problems an idealised quantum dynamics can answer in polynomial time, by Church–Turing-thesis-style arguments now usually phrased as the **Extended Church–Turing Thesis (ECT)** — that any "physically reasonable" model of computation can be simulated by a probabilistic Turing machine with at most polynomial overhead. Quantum computing's most fundamental conjecture is that the ECT is **false**, with $\mathrm{BQP} \neq \mathrm{BPP}$ as the formal expression.

## 17.3 QMA and QCMA

The quantum analogue of $\mathrm{NP}$ — verifiable in polynomial time with a witness — is **$\mathrm{QMA}$**, *Quantum Merlin–Arthur*. A problem is in $\mathrm{QMA}$ if there is a polynomial-time quantum verifier $V$ such that:

- For every yes-instance $x$, there exists a quantum witness state $|\psi\rangle$ on $\mathrm{poly}(|x|)$ qubits with $\Pr[V(x, |\psi\rangle) = 1] \geq 2/3$.
- For every no-instance $x$, no quantum state $|\psi\rangle$ satisfies $\Pr[V(x, |\psi\rangle) = 1] > 1/3$.

The witness is *quantum*: in general no polynomial-length classical string describes it efficiently. The verifier is a $\mathrm{BQP}$ machine that consumes $|\psi\rangle$ alongside $x$.

The containments are

$$
\mathrm{NP} \;\subseteq\; \mathrm{MA} \;\subseteq\; \mathrm{QCMA} \;\subseteq\; \mathrm{QMA} \;\subseteq\; \mathrm{PP} \;\subseteq\; \mathrm{PSPACE},
$$

where $\mathrm{MA}$ (Merlin–Arthur) is the randomised classical version of $\mathrm{NP}$ — a classical witness, a $\mathrm{BPP}$ verifier — and **$\mathrm{QCMA}$** (Quantum Classical Merlin–Arthur) is the in-between class with a *classical* witness but a *quantum* verifier. Whether the witness benefits from being quantum is the $\mathrm{QCMA}$ vs $\mathrm{QMA}$ question. It is open whether $\mathrm{QCMA} = \mathrm{QMA}$; oracle separations exist on both sides, and the natural conjecture is that they are distinct.

**The local Hamiltonian problem.** The flagship $\mathrm{QMA}$-complete problem, due to Kitaev (2002), is the **$k$-local Hamiltonian problem**: given a Hamiltonian $H = \sum_j H_j$ that is a sum of polynomially many $k$-local terms (each $H_j$ acts non-trivially on at most $k$ qubits), and two thresholds $a < b$ with $b - a \geq 1/\mathrm{poly}(n)$, decide whether the smallest eigenvalue of $H$ is at most $a$ or at least $b$. Kitaev showed this is $\mathrm{QMA}$-complete for $k = 5$; subsequent refinements pushed it down: Kempe–Kitaev–Regev showed $k = 3$, then $k = 2$. Even more strikingly, the problem remains $\mathrm{QMA}$-complete for *geometrically local* Hamiltonians — terms involving only neighbouring qubits on a 2D lattice — by results of Oliveira–Terhal and Aharonov–Gottesman–Irani–Kempe. **Finding the ground-state energy of an interacting quantum system is, in the worst case, $\mathrm{QMA}$-hard**, and this is the formal statement of the intuition that condensed-matter physics is computationally non-trivial.

Other $\mathrm{QMA}$-complete problems include:

- **Consistency of local density matrices** (Liu): given a set of reduced density matrices $\rho_S$ on small subsets $S$, decide whether they arise from some global state.
- **Quantum circuit non-identity check**: decide whether a given polynomial-size quantum circuit is far from the identity (when restricted to one-output-bit acceptance, this is the canonical $\mathrm{QMA}$-complete problem in the same way that $\mathrm{SAT}$ is the canonical $\mathrm{NP}$-complete problem).
- **Approximating ground-state energy** of physically realistic Hamiltonians: Hubbard, Heisenberg with bounded couplings, fermionic systems with electronic-structure terms. Schuch–Verstraete (2009) showed that this is $\mathrm{QMA}$-hard already for the 2D Hubbard model with site-dependent local magnetic fields — which also implies that no efficient universal density functional can exist unless $\mathrm{QMA} = \mathrm{NP}$.

The lesson for algorithm designers: **VQE (§15.8) cannot have a polynomial-time worst-case guarantee** unless $\mathrm{BQP} = \mathrm{QMA}$. Heuristic success on specific instances is possible — most physical systems are not adversarial — but a generic provably-efficient solver for ground states of arbitrary local Hamiltonians would collapse the complexity hierarchy. This is the structural reason VQE benchmarks live in a careful tension between "this works on the molecules we care about" and "this cannot work in general".

## 17.4 QIP

The interactive-proof analogue of $\mathrm{NP}$ is $\mathrm{IP}$: a polynomial-time verifier exchanges polynomially many messages with an all-powerful prover, with the verifier ultimately accepting yes-instances with high probability and rejecting no-instances regardless of the prover's strategy. The Shamir–Lund–Fortnow–Karloff–Nisan theorem (1992) established $\mathrm{IP} = \mathrm{PSPACE}$, one of the most striking results in classical complexity.

The quantum analogue **$\mathrm{QIP}$** allows the messages exchanged to be *quantum* states and the verifier to be a $\mathrm{BQP}$ machine. The headline result is the Jain–Ji–Upadhyay–Watrous theorem (2010):

$$
\mathrm{QIP} \;=\; \mathrm{PSPACE} \;=\; \mathrm{IP}.
$$

Quantum interaction does not extend the power of interactive proofs at all. More surprisingly, $\mathrm{QIP} = \mathrm{QIP}(3)$: every quantum interactive proof can be parallelised down to three messages without loss of expressive power.

The two-prover analogue $\mathrm{MIP}$ behaves very differently. Classically, $\mathrm{MIP} = \mathrm{NEXP}$ (Babai–Fortnow–Lund). The quantum two-prover version $\mathrm{MIP}^*$, where the provers share entanglement, was conjectured to be at most $\mathrm{NEXP}$ for years until the **MIP\* = RE** theorem of Ji–Natarajan–Vidick–Wright–Yuen (2020): two provers sharing *unbounded-dimensional* entanglement, a polynomial-time classical verifier, and polynomially-bounded classical messages — the resulting class equals the **recursively enumerable** sets. (The unbounded resource is the provers' shared entanglement, not the communication, which stays polynomial.) This is the entire arithmetic hierarchy's first level; in particular, the halting problem is in $\mathrm{MIP}^*$. The result connects quantum complexity to the long-standing **Connes embedding problem** in operator algebras, which it resolved (negatively) as a consequence. Few results in the field have rippled this far outside it.

A related class worth knowing is **$\mathrm{QMA}(2)$**: a quantum Merlin–Arthur proof with *two* unentangled witnesses provided by separate provers. The verifier is told the two states are a product, $|\psi_1\rangle \otimes |\psi_2\rangle$. Whether $\mathrm{QMA}(2) = \mathrm{QMA}$ is open and is one of the most stubborn questions in the field; it is known that $\mathrm{QMA} \subseteq \mathrm{QMA}(2) \subseteq \mathrm{NEXP}$, but no proof has settled it in either direction in two decades of attack — and there is evidence the unentanglement promise could make $\mathrm{QMA}(2)$ strictly more powerful. The class is interesting because it captures problems like the *pure state $N$-representability problem* in quantum chemistry.

## 17.5 Relations to PH and PSPACE

The classical **polynomial hierarchy** $\mathrm{PH}$ generalises $\mathrm{NP}$ and $\mathrm{coNP}$ by alternating existential and universal quantifiers:

$$
\mathrm{PH} \;=\; \bigcup_k \Sigma_k^p, \qquad \Sigma_k^p \;=\; \mathrm{NP}^{\Sigma_{k-1}^p}, \qquad \Sigma_0^p = \mathrm{P}.
$$

The first level recovers $\mathrm{NP}$ ($\Sigma_1^p = \mathrm{NP}$, $\Pi_1^p = \mathrm{coNP}$); higher levels capture problems with more alternations. The standard belief is that the hierarchy is infinite — each level is strictly larger than the previous — but no separation is proved. The Karp–Lipton-style consequence of a hierarchy collapse to level $k$ is so strong that it is widely treated as evidence the hierarchy is genuinely infinite.

The classical $\mathrm{PH}$ sits inside $\mathrm{PSPACE}$ but is conjectured to be strictly smaller. The question for quantum complexity is: where does $\mathrm{BQP}$ sit relative to $\mathrm{PH}$?

For two decades the standard belief was that $\mathrm{BQP} \subseteq \mathrm{PH}$ — quantum computation cannot solve any problem outside the hierarchy. **Raz–Tal (2019)** demolished this. They exhibited an oracle relative to which $\mathrm{BQP}^O \not\subseteq \mathrm{PH}^O$, using a clever forrelation-based construction. Relative to oracles, **$\mathrm{BQP}$ can be outside the entire polynomial hierarchy**. Whether this holds in the unrelativised world is open but the result removed a major piece of intuition that had been used to argue quantum computers were "polynomial-hierarchy-like".

The relationship to $\mathrm{PSPACE}$ is cleaner. $\mathrm{BQP} \subseteq \mathrm{PSPACE}$ is unconditional, via the path-integral simulation noted above. The strict separation is conjectured but unproved, like every other separation in the hierarchy.

**Post-$\mathrm{BQP}$ and relativisation.** One of the simplest facts about $\mathrm{BQP}$ is that it is closed under polynomial-time quantum reductions to itself:

$$
\mathrm{BQP}^{\mathrm{BQP}} \;=\; \mathrm{BQP}.
$$

A polynomial-time quantum machine making quantum oracle calls to a $\mathrm{BQP}$ subroutine is still a $\mathrm{BQP}$ machine — the subroutines collapse by composition. This is unlike $\mathrm{NP}$, where $\mathrm{NP}^{\mathrm{NP}} = \Sigma_2^p \neq \mathrm{NP}$ under standard assumptions. The collapse of $\mathrm{BQP}^{\mathrm{BQP}}$ is the structural reason $\mathrm{BQP}$ does not naturally generate its own hierarchy of "$\Sigma_k^{\mathrm{BQP}}$" classes the way $\mathrm{NP}$ does. The right quantum hierarchy is built differently — using $\mathrm{QMA}$, $\mathrm{QCMA}$, and their counterparts — and the relations among those classes are murkier than in the classical case.

## 17.6 Query Complexity

**Query complexity** measures the number of times an algorithm needs to query an oracle that encodes the input. The model is convenient because it admits sharp upper *and* lower bounds — tools like the **polynomial method** (Beals–Buhrman–Cleve–Mosca–de Wolf) and the **adversary bound** (Ambainis; negative-weight generalisation by Høyer–Lee–Špalek) give tight lower bounds on quantum query complexity for many problems.

The query model dominates quantum-algorithm exposition for a reason: most of the famous separations (Deutsch–Jozsa, Simon, Grover) are query-model results. The catalogue:

- **Deutsch–Jozsa**: $1$ quantum query vs $\Omega(2^n)$ classical deterministic queries for the constant-vs-balanced promise. The *bounded-error* classical complexity is only $O(1)$, so this separation is exact-deterministic, not bounded-error.
- **Bernstein–Vazirani**: $1$ quantum query vs $\Theta(n)$ classical queries to recover a hidden $n$-bit string $s$ from $f(x) = s \cdot x$.
- **Simon**: $O(n)$ quantum queries vs $\Omega(2^{n/2})$ classical queries for the hidden-XOR-period problem. This is an *exponential* bounded-error separation in the query model, and was the direct inspiration for Shor.
- **Grover**: $\Theta(\sqrt{N})$ quantum queries vs $\Theta(N)$ classical queries for unstructured search, with a matching lower bound (Bennett–Bernstein–Brassard–Vazirani).
- **Forrelation** (Aaronson 2010, refined by Aaronson–Ambainis): $\tilde{O}(1)$ vs $\tilde\Omega(N^{1/4})$, with the optimal separation underlying the Raz–Tal oracle.

A key warning: **query separations do not automatically lift to time separations.** The oracle has to be implementable. For Shor, the oracle $|x\rangle|y\rangle \mapsto |x\rangle|y \oplus a^x \bmod N\rangle$ is implementable in $\mathrm{poly}(n)$ gates — modular exponentiation — and the quantum advantage survives the lift. For random oracles, no efficient implementation exists, and the query separation is purely a *relativised* result.

The two main lower-bound techniques are worth knowing by name. The **polynomial method** observes that the acceptance probability of a $T$-query quantum algorithm is a polynomial of degree at most $2T$ in the oracle bits; lower bounding the degree of any representing polynomial lower bounds $T$. The **adversary method** considers pairs of inputs differing in one position and bounds how fast a quantum algorithm can distinguish them; its **negative-weight** generalisation (Høyer–Lee–Špalek) is tight for all functions (Reichardt). Together these methods make quantum query complexity one of the few areas of complexity theory where tight bounds are the norm rather than the exception.

## 17.7 Oracle Separations

An **oracle separation** between two classes $\mathcal{C}$ and $\mathcal{D}$ is the construction of an oracle $O$ such that $\mathcal{C}^O \neq \mathcal{D}^O$. Such a separation is evidence that proving $\mathcal{C} \neq \mathcal{D}$ unconditionally will require **non-relativising** techniques — proofs that exploit specific properties of the unrelativised model.

The classical reference point is Baker–Gill–Solovay (1975): oracles $A$ and $B$ exist with $\mathrm{P}^A = \mathrm{NP}^A$ and $\mathrm{P}^B \neq \mathrm{NP}^B$. The $\mathrm{P}$ vs $\mathrm{NP}$ question cannot be settled by techniques that relativise.

Quantum-complexity oracle separations:

- $\mathrm{BPP} \neq \mathrm{BQP}$ relative to an oracle (Bernstein–Vazirani 1993; refined to a random oracle by Aaronson 2010).
- $\mathrm{NP} \not\subseteq \mathrm{BQP}$ relative to a random oracle (BBBV 1997). The intuition: oracle $\mathrm{NP}$ is "structured search", which Grover handles only quadratically, not exponentially.
- $\mathrm{BQP} \not\subseteq \mathrm{PH}$ relative to an oracle (Raz–Tal 2019).
- $\mathrm{BQP} \not\subseteq \mathrm{NP}^{\mathrm{NP}}$ relative to an oracle (consequence of Raz–Tal).
- Oracles separating $\mathrm{QMA}$ from $\mathrm{QCMA}$ (Aaronson–Kuperberg 2007), suggesting quantum witnesses are strictly more powerful than classical ones — but only relative to an oracle.

**Unconditional separations** in quantum complexity remain mostly out of reach. The closest things to "real" separations are:

- $\mathrm{P} \neq \mathrm{EXP}$ (time hierarchy).
- $\mathrm{BQP} \neq \mathrm{EXP}$ (combining the hierarchy with $\mathrm{BQP} \subseteq \mathrm{PSPACE} \subseteq \mathrm{EXP}$, giving a *coarse* separation but not the one we want).

The honest assessment is that no proof of $\mathrm{BPP} \neq \mathrm{BQP}$ is in sight; the field's belief that the two classes differ rests on **(a)** the oracle separations above, **(b)** the existence of plausible candidate problems in $\mathrm{BQP} \setminus \mathrm{BPP}$ (factoring, discrete log, simulating local Hamiltonians, certain sampling problems), and **(c)** the absence of any classical algorithm matching the quantum ones for those candidates. Conditional separations — assuming polynomial-hierarchy non-collapse, or specific cryptographic assumptions — are the most that current technique can deliver.

## 17.8 Types of Quantum Speedup

It is useful to taxonomise the *kinds* of speedup the field claims, because the word "speedup" gets used for very different scaling regimes.

**Polynomial speedups.** Provable, robust, and ubiquitous. Examples:

- Grover's $\sqrt{N}$ for unstructured search.
- Quantum walks giving $n^{2/3}$ for element distinctness, $n^{1.26\ldots}$ for triangle finding.
- $O(\sqrt{T})$ speedups for Monte Carlo estimation (Montanaro 2015).
- Amplitude-amplified subroutines inside many graph and number-theoretic algorithms.

These speedups survive lifting from the query model to the gate model under realistic implementations, and they survive in fault-tolerant settings provided the constant overhead of error correction does not erode the advantage. The standard heuristic: a $\sqrt{n}$ speedup is *practically* meaningful only when the classical baseline is already slow ($n \geq 10^9$, say) and the oracle is cheap relative to the rest of the computation.

**Super-polynomial speedups.** Believed but not proved unconditionally. The flagship cases:

- Simon's algorithm: exponential speedup in the *query* model for hidden-XOR-period.
- Shor's algorithm: super-polynomial in the *time* model for factoring and discrete log, assuming no efficient classical factoring algorithm exists (a longstanding assumption supporting RSA).
- Hidden-subgroup problems over abelian groups (Shor's generalisation): super-polynomial in the query model and in the time model when the group action is efficiently implementable.
- Pell's equation, principal-ideal problem: super-polynomial under Hallgren's quantum algorithm.

The common structural ingredient is the QFT over an abelian group; outside that family, super-polynomial speedups become sporadic. The dihedral, symmetric, and non-abelian hidden-subgroup problems have resisted attack for two decades, and the lack of a generic non-abelian hidden-subgroup algorithm is widely seen as one of the field's central open problems.

**Exponential speedups in restricted models.** Some classes of speedup are exponential *only when restricting to a particular cost metric*. Hamiltonian simulation, for instance, is exponential in qubit count relative to classical state-vector simulation, but the right *classical* baseline is often tensor-network methods or Monte Carlo, and the comparison is then nuanced. Linear-algebra-with-block-encoding speedups (HHL and successors) are exponential in the matrix dimension under specific input-access assumptions, but those assumptions are themselves doing most of the work — as the dequantisation results of §17.12 made explicit.

**Sampling and physical-simulation speedups.** Distinct from decision-problem speedups. The right framework here is **sampling complexity**: given a target distribution $\mathcal{D}$, how hard is it to produce a sample from $\mathcal{D}$ (or a close approximation)? Three flagship families exist.

- **BosonSampling** (Aaronson–Arkhipov 2011): sampling from the output distribution of a linear-optical network on $n$ indistinguishable photons. Classical hardness follows from the conjectured `#P`-hardness of approximating permanents of Gaussian matrices.
- **IQP sampling** (Bremner–Jozsa–Shepherd): sampling from "Instantaneous Quantum Polynomial" circuits, which are diagonal-in-$X$-basis polynomial-size constructions. Classical hardness is conjectured under polynomial-hierarchy non-collapse.
- **Random-Circuit Sampling (RCS)**: the family used by the 2019 Google Sycamore experiment and subsequent advantage demonstrations. Classical hardness is conjectured under anti-concentration of random circuit output distributions plus polynomial-hierarchy non-collapse.

What makes sampling complexity an attractive setting for quantum-advantage demonstrations: the quantum hardware does not need to be fault-tolerant. A noisy, modest-depth random circuit suffices, *as long as* the classical hardness conjectures survive scrutiny. The hardness conjectures are the load-bearing element, and they are weaker than $\mathrm{BQP} \neq \mathrm{BPP}$ — they would not collapse the polynomial hierarchy if violated, but they are widely believed.

**Quantum supremacy and quantum advantage.** A 2012 coinage by Preskill, **quantum supremacy** denoted any experimental task on a quantum device that no classical computer could replicate in reasonable time. The terminology has since shifted toward **quantum advantage** (less politically loaded) or **quantum computational advantage**, but the concept is the same: a demonstration that a quantum device performs a *specific* well-defined task faster than the best known classical algorithm running on the best available classical hardware.

The 2019 Google Sycamore experiment claimed an advantage of "ten thousand years of classical simulation" reduced to 200 seconds on a 53-qubit random-circuit sampling task. The headline figure was rapidly contested. IBM responded that with sufficient classical secondary storage and a tensor-network simulation, the same task could be classically completed in days rather than millennia. Subsequent improvements to classical algorithms — particularly the Pan–Zhang–Chen tensor-network advances of 2021–2022, and the simulation push by the USTC group culminating in 2024 — pushed the classical baseline down by further orders of magnitude. By 2024 the Chinese supercomputing centres in Hefei and Wuxi had publicly demonstrated classical RCS simulations at parameter sets equalling or surpassing the original 2019 quantum claim, often using GPU-tensor-network methods that did not exist when the supremacy claim was made.

The 2020 Chinese **Jiuzhang** Gaussian-BosonSampling experiment and the 2024 **Jiuzhang 3.0** refinements remain the strongest unrebutted advantage demonstrations, in part because Gaussian-BosonSampling sits on different classical-hardness assumptions than RCS. The 2024–2025 honest summary: every claimed advantage demonstration is being pursued by a classical-simulation team, the gap is narrowing rather than widening for shallow-circuit RCS, and the line between "quantum advantage" and "expensive-but-feasible classical simulation" continues to move.

The lesson for a working practitioner: when reading a supremacy claim, ask three questions. *Which task, precisely?* (RCS, BosonSampling, IQP, or something else.) *Which classical baseline?* (Strong simulation, weak simulation, tensor network with how much memory.) *Has the result been rebutted by an improved classical algorithm?* (Almost always within 18–24 months.) The methodology is closer to cryptographic security claims than to clean asymptotic separations.

## 17.9 What "Exponential Speedup" Really Means

"Exponential speedup" is the most overloaded phrase in the field. At least four distinct meanings circulate:

1. **Time complexity in the gate model**, unrelativised: a quantum algorithm runs in $T_Q(n)$ gates and the best known classical algorithm runs in $T_C(n)$ gates with $T_C / T_Q = 2^{\Omega(n^c)}$ for some $c > 0$. Shor's factoring versus the general number field sieve is the canonical example, conditional on no quantum-resistant classical algorithm being found.
2. **Query complexity**: the same gap in oracle calls. Simon's algorithm is the canonical example, and it is *unconditionally* exponential in the query model.
3. **Speedup in a restricted classical model**: e.g., over methods that maintain a full state vector. Hamiltonian simulation is "exponential" relative to state-vector classical baselines but not relative to tensor-network classical baselines on the specific Hamiltonians where tensor networks are good.
4. **Speedup under quantum-friendly input access**: HHL-type algorithms have exponential speedups when the classical baseline is denied the same access model the quantum algorithm assumes. Dequantisation (§17.12) often eliminates this kind of "speedup".

For practitioners, the rule is: when reading "exponential speedup", **identify which meaning is intended** before believing the claim. The unconditional query-model separations are bulletproof but say little about practice. The conditional time-model separations are what one would build a product on, but they require trust that no classical algorithm matching the quantum one exists. The restricted-model separations are useful for theory but sometimes oversold as "practical".

A second rule: **the input has to come from somewhere.** A quantum algorithm that achieves an exponential speedup on a problem whose input is a description of $2^n$ amplitudes, but where the description itself takes $2^n$ classical bits to write down, has not actually saved time; it has assumed the input is given for free in a model where loading it would cost what was claimed to be saved. This is the heart of the QRAM debate (Chapter 16, Chapter 26) and of most HHL applications.

## 17.10 Query Complexity vs. Time Complexity

The query model is mathematically clean but operationally narrow. Most algorithms one wants to *run* are time-model algorithms, and the gap between query complexity and time complexity is where many "in-principle" results lose their bite.

The general lift from a query-complexity result to a time-complexity result requires:

- An efficient implementation of the oracle (within $\mathrm{poly}(n)$ gates).
- Efficient compilation of the surrounding circuit to a hardware-native gate set.
- Compatibility with the chosen error-correcting code (so the asymptotic gate counts are not eroded by the constant overhead of fault tolerance).

When all three hold, query-model results lift cleanly: Shor's algorithm is the standard example. When they fail, the query result remains a theorem about an abstract model and the practical implications are limited.

A typical practitioner's resource ledger for a quantum algorithm has four columns:

- **Query count**: how many times the oracle (or its conceptual equivalent — black-box data, function evaluation, time-evolution operator) is invoked.
- **Gate count**: total number of gates from the chosen universal set, after compiling the oracle and the surrounding circuit.
- **Circuit depth**: longest chain of sequentially-dependent gates, relevant for total wall-clock time and coherence budget.
- **Space**: total qubit count, including ancillas for the oracle, the algorithm body, and (in fault-tolerant settings) error-correction.

For fault-tolerant algorithms a fifth metric dominates: the **$T$-count**, the number of $T$ (or Toffoli) gates in the circuit. The reason is the resource asymmetry §8.10 detailed: Clifford gates are cheap to execute fault-tolerantly via transversal operations, while every $T$ gate must be implemented by injecting a **magic state** that is itself the output of an expensive magic-state-distillation factory. For surface-code-based fault tolerance at realistic noise rates, the magic-state factories dominate the spacetime volume of a logical computation, and "the $T$-count" is in practice synonymous with "the cost of the algorithm". Shor's algorithm at RSA-2048 sizes is roughly $7 \times 10^9$ Toffoli gates, and the corresponding $T$-count is what drives the $\sim 10$ million physical qubits, $\sim 10$ hour estimates of §15.3.

The takeaway: a quantum algorithm's *interest* is often determined by query complexity, but its *practicality* is determined by $T$-count. When evaluating an algorithm for near-future deployment, ask for the $T$-count, not the asymptotic query bound.

## 17.11 Lower Bounds and Limits

Quantum complexity is one of the few areas where lower bounds — proofs that no algorithm can do better — are routinely available. The two main techniques have already appeared in §17.6.

The **polynomial method**, applied to specific problems, gives:

- $\Omega(\sqrt{N})$ lower bound for unstructured search (matching Grover up to constants).
- $\Omega(N^{2/3})$ lower bound for element distinctness (Aaronson–Shi, matching Ambainis's walk).
- Bounds on approximate counting and on Hamiltonian simulation that match known upper bounds within polylog factors.

The **adversary method**, in its negative-weight form (Reichardt), is tight for *all* boolean functions: the quantum query complexity of any total boolean function equals its adversary value, up to constants. This is a uniquely strong result with no classical analogue — classical query complexity has no such universal characterisation.

For decision-problem complexity classes (as opposed to query complexity), lower bounds are much harder. Most of the open problems in the field are lower-bound statements that no one knows how to prove unconditionally:

- $\mathrm{BPP} \neq \mathrm{BQP}$.
- $\mathrm{BQP} \not\subseteq \mathrm{NP}$.
- $\mathrm{NP} \not\subseteq \mathrm{BQP}$.
- $\mathrm{QMA} \neq \mathrm{QCMA}$.
- $\mathrm{QMA}(2) \neq \mathrm{QMA}$.

For each, the working evidence is oracle separations, plausible candidate problems, and the absence of contradicting algorithms.

**Complexity of approximate counting and partition functions.** A few specific lower-bound results worth knowing because they recur in practice:

- *Approximating partition functions* of classical spin systems is `#P`-hard in general, but admits a *fully polynomial randomised approximation scheme* (FPRAS) under specific conditions (high temperature, planar Ising). The quantum picture is mixed: quantum walks give quadratic speedups for the FPRAS regime but no polynomial-time algorithm in the regimes where the FPRAS does not apply.
- *Approximating ground-state energies* is $\mathrm{QMA}$-hard for arbitrary local Hamiltonians (§17.3); on translation-invariant 1D systems, *exact* ground-state energy is $\mathrm{QMA}_{\mathrm{EXP}}$-hard (Gottesman–Irani).
- *Spectral-gap estimation* for local Hamiltonians is undecidable in some translation-invariant settings (Cubitt–Pérez-García–Wolf 2015), making the question "is this system gapped or gapless?" formally uncomputable for a non-trivial class of Hamiltonians.

These results are negative — they say "no efficient algorithm exists, under standard conjectures" — but they map out the landscape of where heuristic quantum or classical algorithms have to do the work.

## 17.12 Dequantization

A quantum algorithm is **dequantised** when a classical algorithm with comparable runtime is found, under the same input-access assumptions. The classical algorithm is often *inspired* by the quantum one — using quantum primitives as conceptual scaffolding for a fundamentally classical procedure.

The 2018 **Tang dequantisation** of the HHL-based recommendation system algorithm is the canonical case. Kerenidis–Prakash (2016) had shown an HHL-style algorithm for low-rank recommendation systems with running time $O(\mathrm{poly}(\log N, \kappa, 1/\epsilon))$, exponentially faster than the previously known classical baseline. Tang (then an undergraduate) noticed that the quantum algorithm assumed an input model — sampling access to rows and columns of the input matrix with known $\ell_2$-norms — that is itself stronger than the worst-case classical baseline. Once the classical algorithm was permitted the same access, classical sampling matched the quantum runtime up to polynomial factors. The Kerenidis–Prakash speedup disappeared.

The dequantisation programme has since broadened. Tang's framework, the **"quantum-inspired" classical algorithms for low-rank linear algebra**, dequantised:

- Low-rank linear-system solving (matching HHL on low-rank instances).
- Low-rank singular-value transformation.
- Principal component analysis and recommendation systems.
- Several quantum machine-learning algorithms based on amplitude encoding.

The pattern in all cases: identify the input-access model the quantum algorithm requires; check whether the classical baseline is permitted comparable access; build a classical sampling algorithm exploiting the same access. When the quantum algorithm's "speedup" was entirely an artifact of access asymmetry, dequantisation succeeds.

Dequantisation does not invalidate every quantum-linear-algebra speedup. Shor's algorithm has not been dequantised (and is conjectured not to be); the local-Hamiltonian simulation speedup has not been dequantised. The dequantisable speedups share a structural feature: they encode classical data into amplitudes, do linear algebra in amplitude space, and read out a classical answer. The encoding and read-out steps each introduce dependence on parameters (matrix Frobenius norm, condition number) that the quantum algorithm hid in its access model. The non-dequantisable speedups have intrinsic quantum structure — periodicity in a unitary's spectrum, dynamics of a many-body Hamiltonian — that does not survive the encode-then-read-out reduction.

The honest takeaway: any claimed "exponential quantum machine-learning speedup" should be treated as provisionally believed until a dequantisation attempt has been made and failed.

## 17.13 Classical Simulability

The flip side of "what quantum speedup is provable" is "what quantum computation is *classically simulable*". The fewer the families of classical-simulable quantum circuits, the larger the candidate region for genuine quantum advantage; the more such families exist, the more constrained the conditions under which a quantum experiment can claim to be performing something classically intractable.

Three classes of classically simulable quantum computation are known. They are the boundary against which "quantum advantage" must demonstrate itself.

**Stabiliser circuits and the Gottesman–Knill theorem.** Any quantum circuit built from $\\{H, S, \mathrm{CNOT}, \text{Pauli-basis measurement}\\}$, applied to a stabiliser initial state, is **efficiently classically simulable** (§8.10). The simulation tracks the stabiliser group of the state, which has $O(n^2)$ description. Classical simulation runtime is polynomial in $n$ and in the number of gates. The result is striking because such circuits include arbitrarily-entangled multi-qubit states (e.g., $n$-qubit GHZ and cluster states) — entanglement alone is not the source of quantum advantage. The complement of Clifford circuits within universal quantum computation is "magic", quantified by the $T$-gate count and, more carefully, by **magic monotones** like the stabiliser rank and the robustness of magic. A circuit's classical-simulation cost scales with its non-Clifford content; pure Clifford circuits are free, and a single $T$ gate per qubit can already push simulation cost beyond reach.

**Matchgate / nearest-neighbour matchgate circuits.** Quantum circuits built from two-qubit gates of a specific form on a linear chain of qubits — corresponding to free-fermion dynamics under the Jordan–Wigner transform — are classically simulable in polynomial time. The class is large enough to include several non-trivial physical models (free-fermion Hamiltonian evolution, certain scattering problems) and is the second main "island of classical tractability" inside otherwise universal quantum computation.

**Low-entanglement / low-bond-dimension states and tensor networks.** Quantum states with limited entanglement — matrix product states (MPS) on 1D systems, projected entangled pair states (PEPS) on 2D — admit polynomial-size classical descriptions parameterised by a **bond dimension** $\chi$. Operations on such states have classical-simulation cost polynomial in $n$ and in $\chi$. For systems whose ground states satisfy an *area law* — entanglement entropy across any cut is bounded by the boundary, not the volume — bond dimension stays polynomial and tensor-network simulation is efficient. Modern 1D ground-state algorithms (DMRG) are tensor-network methods and routinely outperform variational quantum algorithms on the same problems. The 2D case is more subtle: tensor-network simulation is harder, but for many physically interesting systems (gapped, area-law-obeying) it remains the state of the art.

The relevance for quantum-advantage claims: to demonstrate advantage, the device's output must be classically intractable, which means the underlying circuit must escape *all three* of the simulability families above. The 2019 Sycamore experiment used random circuits explicitly chosen to be magic-heavy, long-range-entangled, and high-bond-dimension — all three. The 2021–2024 classical pushbacks succeeded by recognising that the *specific* random-circuit family had enough structure (in particular, the noise meant the effective state lived on a lower-bond-dimension manifold) to admit tensor-network simulation with carefully tuned approximations. Each round of pushback exploits a feature the original demonstration did not optimise against; each next-generation experiment then optimises against the latest classical attack.

This back-and-forth is now the field's normal mode. Quantum-advantage claims live in a moving frontier defined by the best classical algorithm available at the time of the claim. The frontier itself is not collapsing — genuine quantum advantage is widely believed — but the cleanest formal statement of where it lies remains stubbornly open. The complexity-theoretic background of this chapter is the toolkit one uses to read the next claim, the next rebuttal, and the next refinement, without being pushed around by marketing rhetoric in either direction.

## Bridge to Chapter 18

Complexity theory framed *what can be done in principle* with idealised quantum computation. Chapter 18 starts the part on **noise, decoherence, and errors** — the physical reality that determines whether the polynomial-time algorithms of $\mathrm{BQP}$ can actually run on a real device, and at what cost in extra qubits and extra time. The bridge is direct: the $T$-count and gate-count metrics of §17.10 acquire their real teeth only once Chapter 18 explains where the $T$ gates come from (magic states, themselves the output of distillation circuits running on top of a noisy substrate), why the surface code is the leading candidate to host them, and why the resource estimates of §15.3 — ten million physical qubits, ten hours — are dominated by error-correction overhead rather than by the logical algorithm. The complexity-theoretic upper bound on what is *possible* meets the physical lower bound on what is *affordable*; everything in the rest of the book lives at that intersection.

**Sanity checks before moving on.**

1. State the known containment chain $\mathrm{BPP} \subseteq \mathrm{BQP} \subseteq \mathrm{PSPACE}$, name one unconditional step in the chain you could prove on the spot, and identify the step that requires Adleman–DeMarrais–Huang (or equivalent) to tighten.
2. Explain in one or two sentences why factoring is in $\mathrm{NP} \cap \mathrm{coNP}$ but is not believed to be $\mathrm{NP}$-complete. Why does this mean Shor's algorithm does not give a polynomial-time quantum algorithm for $\mathrm{SAT}$?
3. State the local-Hamiltonian problem and explain what its $\mathrm{QMA}$-completeness implies for VQE. Would a polynomial-time worst-case VQE algorithm imply $\mathrm{BQP} = \mathrm{QMA}$?
4. Give an example of an "exponential quantum speedup" that was later dequantised, identify the input-access model that the original quantum algorithm assumed, and explain how the dequantising classical algorithm exploited the same access.
5. In a fault-tolerant resource estimate (e.g., Shor's algorithm on RSA-2048), explain why $T$-count rather than total gate count is the dominant figure of merit. Which gates are "free" in the surface-code setting, and which gates require magic-state distillation?

---

[← Previous: Chapter 16](../part-06-algorithms/16-modern-algorithmic-frontier.md) · [Table of Contents](../../README.md) · [Next: Chapter 18 →](../part-08-noise-and-qec/18-noise-decoherence-and-errors.md)
