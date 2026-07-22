# Chapter 32. Adjacent Computational Models

> **Status:** prereviewed · **Phase:** 5 · **Sections drafted:** 10 / 10

[← Previous: Chapter 31](../part-11-applications/31-quantum-sensing-metrology-and-tomography.md) · [Table of Contents](../../README.md) · [Next: Chapter 33 →](33-quantum-communication-and-networking.md)

The circuit model from Chapter 9 is the lingua franca of quantum software — every major SDK speaks it, every textbook teaches it, every architecture paper benchmarks against it. But it is not the *only* model of quantum computation, and on certain hardware platforms it is not even the most natural one. Adiabatic evolution, measurement-based steering of a cluster state, braiding of anyons, photonic modes carrying continuous-variable encodings — each is a complete account of quantum computation in its own right, and most are **polynomially equivalent** to the circuit model in computational power. Equivalent in theory, however, does not mean interchangeable in practice. Different models map onto different hardware with very different overheads, and a problem that looks awkward in one formulation can look obvious in another.

This chapter is a guided tour of those alternative formulations. It is also a sanity check against a common framing error: that "quantum computing" *means* "gate-based quantum computing." The gate model is the dominant abstraction because it dovetails with classical control flow and with the way present-day superconducting and trapped-ion devices are programmed, not because it is the unique correct framework. Annealers, photonic interferometers, and topologically protected qubits all sit in the same broader space; knowing the map helps when reading vendor claims, complexity-theory results, or research papers that use a non-circuit language.

> **How to read this chapter.** §§32.1–32.2 (adiabatic computation, annealing) and §32.3 (measurement-based) are the most algorithmically important — they each map cleanly onto deployed or near-term hardware. §§32.4–32.6 (topological, continuous-variable, boson sampling) are platform-relevant: read them in proportion to your interest in those hardware families. §§32.7–32.8 (quantum walks, reversible classical computing) connect back to algorithmic and historical foundations. §32.9 (probabilistic computation) is a one-page conceptual contrast, and §32.10 closes with the equivalence map and the bridge to Chapter 33.

## 32.1 Adiabatic Quantum Computation

**Adiabatic quantum computation** (AQC) frames a computation as the slow evolution of a Hamiltonian from a simple initial form whose ground state is easy to prepare to a final form whose ground state encodes the answer. Concretely, one chooses a time-dependent Hamiltonian

$$
H(s) \;=\; (1 - s)\\, H_0 \;+\; s\\, H_1, \qquad s = t / T \in [0, 1],
$$

prepares the system in the ground state of $H_0$ (typically $H_0 = -\sum_i X_i$, ground state $|+\rangle^{\otimes n}$), and evolves under $H(s)$ for total time $T$. The **adiabatic theorem** guarantees that if $T$ is large enough relative to the inverse of the minimum spectral gap, the system stays in the instantaneous ground state of $H(s)$ throughout the evolution and ends in the ground state of $H_1$, which by construction encodes the solution.

The runtime is gap-limited. Letting $\Delta_{\min} = \min_{s \in [0,1]} \big(E_1(s) - E_0(s)\big)$ denote the minimum gap between ground and first excited state, the standard sufficient condition is

$$
T \;\gg\; \frac{\\|\partial_s H\\|^2}{\Delta_{\min}^3},
$$

with the cubic dependence reduced to quadratic under tighter hypotheses — one common sufficient form, not the unique adiabatic theorem. The implication is one-directional: an inverse-polynomial minimum gap (with bounded derivatives) suffices for polynomial runtime, while a closing gap defeats *this* guarantee without proving every approach inefficient. Identifying when the gap closes can itself be as hard as the original problem.

Aharonov, van Dam, Kempe, Landau, Lloyd, and Regev proved in 2004 that **AQC and the circuit model are polynomially equivalent**: any polynomial-time quantum circuit can be simulated by an adiabatic evolution of polynomial duration over a polynomial-norm Hamiltonian, and vice versa. The construction goes through the *circuit-to-Hamiltonian* mapping (Feynman's history-state idea, sharpened by Kitaev), in which the ground state of a carefully designed local Hamiltonian encodes the time history of the circuit. AQC is thus a fully universal model of quantum computation — not a weaker heuristic.

The practical caveats are heavy. The Hamiltonians produced by the universality construction are typically $k$-local for $k \ge 3$, and engineering arbitrary $k$-local interactions in hardware is hard. Most physical implementations either restrict to 2-local Hamiltonians (2-local AQC constructions are still universal — what is sacrificed is the simplest form of the argument) or use perturbative gadgets to simulate $k$-local terms, at the cost of ancilla qubits, large energy scales and coupling precision, and *reduced* effective gaps — hence longer runtimes. The next section covers what happens when those compromises pile up and the adiabatic guarantee is dropped.

## 32.2 Quantum Annealing

**Quantum annealing** is AQC's noisier, heuristic cousin. It uses the same physical picture — a transverse-field Ising Hamiltonian evolved toward a problem Hamiltonian — but does not insist on (and cannot guarantee) the adiabatic regime. The schedule may be too fast, the environment may be too warm, the Hamiltonian may be 2-local only. What you get is a sample from a distribution that is *biased toward* low-energy states of $H_1$, not a guaranteed ground state.

The commercial archetype is **D-Wave**, whose machines implement an Ising model

$$
H_1 \;=\; \sum_i h_i\\, Z_i \;+\; \sum_{i < j} J_{ij}\\, Z_i Z_j,
$$

on a hardware-restricted coupling graph (Chimera, Pegasus, and now Zephyr topologies). Problems expressed as **QUBO** (quadratic unconstrained binary optimization) instances map directly onto this Ising form via the substitution $x_i \in \\{0, 1\\} \leftrightarrow s_i = 1 - 2 x_i$ (spin eigenvalues $s_i = \pm 1$). The user submits couplings, the device anneals for microseconds, and the user reads out a bit string. Repeated runs give a sample of candidate solutions.

Quantum annealing is **not provably equivalent** to the circuit model. The theoretical question of whether annealers achieve a genuine quantum speedup on practically relevant problems remains open; published comparisons against well-tuned classical solvers (simulated annealing, parallel tempering, branch-and-bound) have produced a mixed record. Where annealers do shine is on certain structured Ising instances where the energy landscape favors quantum tunneling over thermal hopping. The honest summary: a useful heuristic tool with a clear hardware-software pipeline, not a demonstrated path to provable quantum advantage.

Two practical points round out the picture. First, mapping a real optimization problem onto the device's restricted coupling graph requires **minor embedding** — representing each logical variable as a chain of physical qubits held together by strong ferromagnetic couplings. Chain breaks during annealing are a routine failure mode and add their own classical post-processing layer. Second, annealing-friendly problem classes (QUBO, max-cut, certain logistics and portfolio formulations) cover a non-trivial slice of industrial optimization, which is why the platform has a customer base even without a complexity-theoretic guarantee.

## 32.3 Measurement-Based Quantum Computation

**Measurement-based quantum computation** (MBQC, also called the **one-way model** after Raussendorf and Briegel, 2001) inverts the gate-model picture. Instead of preparing a simple state and acting on it with unitaries, MBQC starts from a large, fixed, highly entangled resource state — typically a **cluster state** on a 2D square lattice — and drives the computation forward through a sequence of **single-qubit measurements** in adaptively chosen bases.

A cluster state is built by initializing each qubit on a lattice in $|+\rangle$ and applying a controlled-$Z$ between every neighboring pair. The resulting state is a stabilizer state with the special property that any logical quantum circuit can be implemented by a measurement pattern on it: each logical qubit corresponds to a row (or column) of the lattice, and single-qubit measurements at angles $\theta_k$ on intermediate sites teleport the logical state forward while simultaneously applying a chosen gate. The measurement outcomes are random, but their effect on the subsequent computation can be compensated for by choosing later measurement bases adaptively — hence "one-way": the resource state is consumed irreversibly as the computation runs.

The key theorem (Raussendorf, Browne, Briegel) is that a 2D cluster state plus arbitrary single-qubit measurements is **universal** for quantum computation, and **polynomially equivalent** to the circuit model. A circuit of width $w$ and depth $d$ maps onto a cluster of $O(w \times d)$ qubits with a measurement pattern of size $O(w d)$. The classical-feedforward cost (§9.9) is built into the model from the start: later measurements depend on earlier outcomes through a known correction rule.

Why this matters for hardware: MBQC fits photonic platforms naturally. Photons are easy to prepare, easy to measure, but hard to interact with each other deterministically. By moving the entangling work into an offline resource-state generation phase — itself probabilistic and expensive: fusion gates, multiplexing, switching, and loss management — MBQC *relocates* the photon-photon interaction problem rather than eliminating it; the runtime then consists of single-photon measurements with feed-forward, high-efficiency but short of deterministic (detector loss and fusion failures remain). PsiQuantum and Xanadu both target architectures broadly in this family. Continuous-variable cluster states (§32.5) extend the idea further.

## 32.4 Topological Quantum Computation

**Topological quantum computation** stores and manipulates quantum information in the *topology* of particle world-lines rather than in any local degree of freedom. The underlying physics is that of **anyons** — quasiparticle excitations of certain 2D systems that obey neither bosonic nor fermionic statistics; instead, exchanging two anyons acts by a nontrivial element of a braid-group representation: a phase for Abelian anyons, and for **non-Abelian** anyons a matrix on the degenerate fusion space — so a worldline diagram, a **braid**, produces a nontrivial unitary on the multi-anyon Hilbert space.

The computation is then: prepare an initial anyon configuration encoding $|0\rangle^{\otimes n}$, braid pairs of anyons through space and time according to a desired circuit, and finally fuse pairs to read off the logical outcome. The protection comes from topology: small local perturbations cannot change the homotopy class of the braid, so the logical operation is **intrinsically error-resistant**. Logical errors require processes that drag an anyon along a non-trivial path — exponentially suppressed in system size for a well-designed substrate at low temperature, though thermal anyon creation, quasiparticle poisoning, and measurement errors still set a finite lifetime: strong protection, not absolute.

Two candidate platforms dominate the discussion. **Majorana zero modes** in semiconductor-superconductor nanowires are the most-engineered candidate, but as of this writing their experimental status remains **unconfirmed**: signatures consistent with Majoranas have been reported repeatedly since 2012, with one prominent claim formally retracted (2021) and others disputed or reinterpreted, and the community treats individual papers with appropriate skepticism. Majorana braiding is also not, on its own, universal — it generates only the Clifford group and must be supplemented by a non-Clifford resource (such as a $T$-state injection) to reach universality. **Fibonacci anyons**, in contrast, are *braiding-universal* — their braiding group alone is dense in the unitary group — but no laboratory system has yet been confirmed to host them; they remain a theoretical target, motivated by certain fractional quantum Hall states at filling $\nu = 12/5$.

The promise of topological quantum computation is therefore real but distant. If a non-Abelian anyon platform is engineered, its qubits would enjoy substantial passive hardware-level protection, potentially reducing the fault-tolerance overhead relative to gate-model schemes that rely on active error correction (Chapter 19) — with non-Clifford operations (the $T$-state injection above) still needing resources outside the passive protection. If no such platform materializes, the model remains a useful theoretical construct and a source of inspiration for active-correction codes (the surface code is itself an emulation of an Abelian-anyon system).

## 32.5 Continuous-Variable Quantum Computing

**Continuous-variable** (CV) quantum computing replaces the qubit's two-dimensional Hilbert space with the **infinite-dimensional** Hilbert space of a quantum harmonic oscillator. The relevant degrees of freedom are continuous: a **mode** is described by position and momentum operators $\hat q$ and $\hat p$ satisfying $[\hat q, \hat p] = i$, and a state is a wavefunction $\psi(q)$ — or, equivalently, a function on phase space via the Wigner representation.

The natural physical realization is an optical mode (a beam of light in a fixed spatial-temporal envelope); $\hat q$ and $\hat p$ become the two quadratures of the electromagnetic field. A **coherent state** $|\alpha\rangle$ is the closest classical-light analog; **squeezed states** sharpen $\hat q$ at the expense of $\hat p$ (or vice versa), and **Fock states** $|n\rangle$ have definite photon number $n$. The gate set splits cleanly into two layers:

- **Gaussian gates** — displacement, phase rotation, squeezing, two-mode beam-splitter, two-mode squeezer — act linearly on $(\hat q, \hat p)$ and map Gaussian states to Gaussian states. These are the easy operations on a photonic chip.
- **Non-Gaussian elements** — a non-Gaussian *gate* such as the cubic phase gate $\exp(i \gamma\\, \hat q^3)$, or a non-Gaussian *measurement* such as photon-number-resolving detection — break the Gaussian closure and are required for universality (gates and measurements enter the constructions differently).

The crucial classical-complexity fact is that **Gaussian states under Gaussian operations and Gaussian measurements are classically efficiently simulable** (Bartlett, Sanders, Braunstein, Nemoto, 2002). A photonic device that produces only Gaussian states and performs only Gaussian operations cannot, by itself, achieve a quantum advantage. The non-Gaussian element — be it a cubic gate, a Kerr nonlinearity, or photon-number-resolving detection of a squeezed-vacuum input — is the source of computational power. The standard universality result (Lloyd and Braunstein, 1999) says that Gaussian operations plus a suitable nonlinear (non-Gaussian) Hamiltonian generate arbitrary polynomial Hamiltonians — universality over the continuous-variable space under the theorem's conditions. "Any non-Gaussian gate whatsoever" is a folklore strengthening the theorem does not quite state.

CV cluster states extend MBQC to continuous variables and form the basis of several photonic quantum-computing roadmaps (notably Xanadu's). The flip side is that CV computations are vulnerable to a different family of errors — finite squeezing acts like a noise floor — and require their own version of fault tolerance (the GKP code, named for Gottesman, Kitaev, Preskill, encodes a logical qubit into an oscillator).

## 32.6 Boson Sampling

**Boson sampling** (Aaronson and Arkhipov, 2011) is not a model of universal quantum computation. It is a precisely defined **sampling task** that is conjectured to be classically hard, designed to be implementable with a much simpler resource than a full quantum computer: a linear-optical interferometer with single-photon inputs.

The setup. Send $n$ indistinguishable photons into $n$ of $m \gg n$ input ports of a randomly chosen $m \times m$ unitary interferometer $U$ (built from beam-splitters and phase-shifters); count the number of photons exiting each output port. The output probability distribution is governed by the **permanent** of a submatrix of $U$ — written $\mathrm{Perm}(U_S)$ below, a determinant-like matrix function without the alternating permutation signs (the summands are complex products, not positive numbers):

$$
P(s_1, \ldots, s_m) \;=\; \frac{|\mathrm{Perm}(U_S)|^2}{s_1! \cdots s_m!},
$$

where $U_S$ is the submatrix of $U$ defined by the output pattern $s$. Computing the **permanent** of a matrix is #P-hard — which by itself does not make sampling hard. Aaronson and Arkhipov's theorem routes through polynomial-hierarchy-collapse consequences, and the *approximate*-sampling version additionally assumes average-case permanent hardness and anti-concentration conjectures. Boson sampling is therefore *conditional* evidence of quantum-classical separation in the sampling regime; the device is nonuniversal — it cannot implement arbitrary BQP algorithms — though its samples can still feed reductions and hypothesis tests with classical postprocessing, and certifying the samples in the classically intractable regime is its own open problem.

The variant that has dominated experimental headlines is **Gaussian boson sampling** (GBS), in which the single-photon inputs are replaced by squeezed-vacuum states. GBS retains the conjectured classical hardness, replaces the permanent with a related matrix function called the **hafnian**, and is much easier to scale because squeezed vacuum is easier to produce than deterministic single photons. The University of Science and Technology of China's **Jiuzhang** experiments (2020–2023) and Xanadu's **Borealis** (2022) both report Gaussian boson sampling at scales where the corresponding classical simulation is reported as infeasible on present hardware. The "infeasible" claims are contested by improved classical algorithms more aggressively than the analogous claims for circuit-model supremacy experiments; the boundary moves every year.

Boson sampling has also gained a second life as a **near-term application** target. Sampling from the hafnian distribution turns out to be relevant to graph similarity, molecular vibronic spectra, and certain dense-subgraph problems, giving the platform potential use cases beyond complexity-theoretic curiosity. Whether those applications produce an honest quantum advantage on industrially relevant problem sizes is, like most NISQ-era questions, still open.

## 32.7 Quantum Walks

**Quantum walks** are the quantum analog of classical random walks: a particle moves on a graph, but its position evolves under a unitary rather than a stochastic update. The interference between paths makes the walker spread *quadratically faster* than a classical walker — variance $\propto t^2$ instead of $\propto t$ — and this acceleration is the source of several algorithmic speedups (Chapter 15 discusses element-distinctness, spatial search, and triangle-finding via quantum walks).

Two flavors coexist:

- The **discrete-time quantum walk** alternates a "coin" operation (a unitary acting on an internal coin register) with a "shift" operation (move conditioned on coin state). On the infinite line this gives the Hadamard walk, whose probability distribution has the characteristic two-peaked, ballistic shape rather than a Gaussian bell.
- The **continuous-time quantum walk** is the unitary evolution $e^{-i H t}$ on a graph Laplacian or adjacency matrix $H$, with no internal coin. The model is simpler theoretically and has been used by Farhi and Gutmann (1998) and many later authors.

Childs (2009) proved that **continuous-time quantum walks are universal for quantum computation**, in the sense that any polynomial-time quantum circuit can be simulated by a polynomial-time walk on an appropriately constructed graph. The discrete-time version is also universal under similar constructions. So quantum walks are not just an algorithmic technique; they are a full computational model — they happen to also be a fertile algorithmic primitive (§15.6 in the algorithm-design chapter is the cross-reference) because many graph problems are naturally walk-shaped.

## 32.8 Reversible Classical Computing

The historical bridge between classical and quantum computing is **reversible classical computing**. Bennett (1973) showed that any classical computation can be made logically reversible — every step is a bijection on the computer's state space — at the cost of a polynomial-bounded amount of extra space for "history" bits that record enough information to undo each step. Landauer (1961) had earlier shown that *irreversible* logical operations dissipate at least $k_B T \ln 2$ of heat per erased bit, so reversibility is also the thermodynamic-floor argument for energy-efficient computing.

Landauer's bound is also the seed of a full **resource theory of thermodynamics**: take thermal (Gibbs) states as the free states and energy-conserving "thermal operations" as the free operations, and the resource that remains is *athermality* — out-of-equilibrium free energy, consumed whenever a bit is erased. This is the thermodynamic member of the resource-theory family cataloged in §12.11, with the same free-states/free-operations/conversion-rates structure as entanglement under LOCC.

The gate-level vocabulary of reversible computing predates quantum computing:

- The **Toffoli gate** (controlled-controlled-NOT, three-input, three-output) is universal for reversible classical computation. It is also a quantum gate, applied as a permutation in the computational basis.
- The **Fredkin gate** (controlled SWAP) is similarly universal and conservative (preserves the number of 1s).
- Any classical circuit with AND, OR, NOT gates of size $T$ can be converted to a Toffoli circuit of size $O(T)$ that produces the same output along with $O(T)$ ancilla bits.

Quantum computing **generalizes** reversible classical computing: every reversible classical gate is a permutation matrix in the computational basis, which is in particular a unitary; conversely, the closure of unitaries under composition contains all permutations on basis states. So every classical algorithm runs on a quantum computer with at most polynomial blow-up — but with no speed-up, since the computation never enters superposition. Quantum advantage requires *non-permutation* gates: the Hadamard takes basis states into superpositions, while $T$ and controlled-phase are *diagonal* — they leave each basis state where it is but imprint the relative phases that interference later turns into amplitude differences. Permutation gates alone create neither superposition nor usable relative phase, which is why they buy no speed-up.

This is also where Bennett's uncomputation trick (§9.4) lives. The Toffoli-based reversible-computing toolkit is precisely the recipe for converting a classical oracle into a quantum oracle $U_f: |x\rangle |y\rangle \mapsto |x\rangle |y \oplus f(x)\rangle$ without leaving garbage. Every algorithm in Chapters 14–15 that calls a classical $f$ as an oracle leans, implicitly, on this construction.

## 32.9 Probabilistic and Randomized Computing

A briefer contrast: **probabilistic** or **randomized** computing extends deterministic classical computation by giving the machine access to fair coin flips. The complexity class **BPP** ("bounded-error probabilistic polynomial time") captures the decision problems solvable in polynomial time by such a machine with bounded error. Many practically important algorithms — polynomial identity testing, Monte Carlo integration, randomized graph algorithms — are most naturally stated in BPP (primality testing, the historical poster child, is now known to lie in deterministic P via AKS, though randomized tests remain the practical choice).

The parallel with quantum computation is structural but limited. A BPP machine's intermediate state is a probability distribution over configurations — non-negative reals summing to one — evolved by stochastic matrices. A **BQP** ("bounded-error quantum polynomial time") machine's intermediate state is *not* a distribution but an amplitude vector — complex numbers whose moduli squared sum to one — evolved by unitary matrices (with measurement, initialization, and classical control completing the model). Negative and complex amplitudes admit **destructive interference**: two computational paths leading to the same outcome can cancel, which is impossible for probabilities. The interference is the *source* of the quantum advantage, and BPP $\subseteq$ BQP follows directly by simulating a coin flip with a Hadamard followed by a measurement.

Whether BPP equals BQP is the central open question of quantum complexity theory (Chapter 17). The factoring and discrete-log algorithms (Shor) are presumed counterexamples but have no unconditional proof of classical hardness. Sampling-based separations — boson sampling and the random-circuit-sampling experiments — provide stronger but still conditional evidence.

## 32.10 Equivalence Map and Bridge to Chapter 33

Pulling the models together. The following relationships are established theorems, with citations covered in Appendix D.

- **Circuit model** $\equiv$ **adiabatic quantum computation** (Aharonov et al., 2004): polynomially equivalent.
- **Circuit model** $\equiv$ **measurement-based quantum computation on a 2D cluster state** (Raussendorf–Briegel 2001; universality theorem Raussendorf–Browne–Briegel): polynomially equivalent.
- **Circuit model** $\equiv$ **continuous-time quantum walks on an appropriate graph** (Childs, 2009): polynomially equivalent.
- **Circuit model** $\equiv$ **continuous-variable computation with a finite Gaussian gate set plus a *suitable* non-Gaussian gate** (Lloyd and Braunstein, 1999; the theorem's conditions on the added nonlinearity apply — §32.5): universal, polynomially equivalent under reasonable encodings.
- **Topological quantum computation** with non-Abelian anyons of universal braid representation (e.g., Fibonacci): polynomially equivalent — *if* such anyons can be realized.
- **Quantum annealing**: not known to be equivalent; a heuristic specialization of AQC.
- **Boson sampling** / **Gaussian boson sampling**: a sampling task, not universal; conjectured classical hardness only.
- **Reversible classical computing** (Toffoli) and **BPP**: contained in BQP; strictness is conjectured, not proved ($\mathsf{BPP} \subsetneq \mathsf{BQP}$ rests on standard complexity assumptions).

The morals are two. First, **the gate model is the dominant abstraction but not the unique correct one**. Different models can be polynomially equivalent in complexity and still vastly differ in practical fit to a given hardware platform: photonic systems prefer measurement-based and continuous-variable formulations; the only commercially deployed annealing devices are not even known to be equivalent to gate machines; topological proposals would, if realized, sidestep most of the apparatus of Part 8. Second, **the equivalence theorems are an engineering asset**: an algorithm proven in the circuit model is automatically an algorithm in the adiabatic model, in MBQC, and in CV — modulo the polynomial overhead and the platform-specific compilation work. The translation is rarely trivial, but the existence of the translation is what makes "quantum computing" a coherent discipline rather than a federation of unrelated devices.

Chapter 33 leaves the question of how to *compute* with quantum systems and takes up how to *communicate* with them: entanglement distribution, teleportation as a network primitive, quantum key distribution, quantum repeaters, and the long-term picture of a quantum internet. Many of the protocols there were among the first quantum advantages to leave the lab — QKD has been deployed commercially for over two decades — and several lean on the measurement-based ideas of §32.3 and the continuous-variable ideas of §32.5.

**Sanity checks before moving on.**

1. For a concrete instance of your choice — say, a uniform ferromagnetic Ising chain of six spins with a small longitudinal bias — give the interpolating Hamiltonian $H(s) = (1-s) H_0 + s H_1$ with a transverse-field driver, identify where along the sweep the gap is smallest (a finite chain shows an *avoided crossing* near where the infinite chain's transverse-field quantum phase transition would sit; the small longitudinal bias rounds it further — a true phase transition is a thermodynamic-limit notion), and explain what a closing gap does to the runtime bound.
2. A user submits a QUBO with 200 logical variables and a *densely connected* interaction graph to a D-Wave device whose coupling graph has degree 15. Estimate, qualitatively, the physical-qubit count after minor embedding (dense problems need chains of length growing with the variable count — §29.3), and name two failure modes you would expect to see in the returned samples.
3. Explain, at the level taught in §32.3 (no explicit measurement pattern required), how single-qubit measurements on a cluster state teleport a logical qubit forward while applying a chosen gate, and why the randomness of outcomes forces later measurement bases to be chosen adaptively. What distinguishes a non-Clifford gate like $T$ from a Clifford gate in this picture?
4. State whether each of the following is universal for quantum computation, and why or why not: (a) braiding of Majorana zero modes; (b) braiding of Fibonacci anyons; (c) Gaussian operations on continuous-variable states with Gaussian measurements; (d) the Toffoli gate alone over the computational basis.
5. A classical algorithm in BPP runs in polynomial time using $\log n$ coin flips. Give the corresponding BQP circuit and explain in one sentence why this does not constitute a quantum speedup.

---

[← Previous: Chapter 31](../part-11-applications/31-quantum-sensing-metrology-and-tomography.md) · [Table of Contents](../../README.md) · [Next: Chapter 33 →](33-quantum-communication-and-networking.md)
