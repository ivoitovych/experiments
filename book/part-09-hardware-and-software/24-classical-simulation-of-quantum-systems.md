# Chapter 24. Classical Simulation of Quantum Systems

> **Status:** prereviewed · **Phase:** 4 · **Sections drafted:** 15 / 15

[← Previous: Chapter 23](23-quantum-programming-compilation-and-tooling.md) · [Table of Contents](../../README.md) · [Next: Chapter 25 →](../part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md)

Every quantum algorithm in this book has, at some point in its life, been simulated classically. Test suites for Qiskit, Cirq, and PennyLane run on classical hardware; pre-deployment validation of a variational circuit runs on a classical simulator; the very claim "this device beat classical simulation" is meaningful only insofar as the corresponding classical computation has been characterised. Classical simulation of quantum systems is therefore not the failure mode of quantum computing but its constant companion: the verification layer, the debugging surface, the lower bound against which advantage is measured, and — for many physically interesting Hamiltonians — the production tool that is still doing the science.

This chapter surveys the families of classical simulation algorithms that the rest of the book has implicitly relied on. Statevector simulation is the brute-force baseline. Density-matrix simulation handles noise at the price of squaring the dimension. Stabiliser simulation collapses Clifford-only dynamics to polynomial cost via the Gottesman–Knill theorem (§8.10), and near-Clifford extensions push the boundary by paying exponentially in the *non-Clifford* part only. Tensor networks — MPS, PEPS, DMRG, TEBD; each acronym is expanded where its method is introduced in §§24.7–24.10 — exploit limited entanglement to compress the state, and dominate condensed-matter simulation in regimes where the entanglement entropy is bounded. Schrödinger–Feynman path summation trades memory for time on shallow circuits. Each method has a regime in which it is the best tool, and a sharper regime beyond which it provably fails.

> **How to read this chapter.** §24.1–§24.4 are mandatory: they fix the cost model, the brute-force baselines, and the noise-aware extension that every later method is measured against. §24.5–§24.6 (stabiliser and near-Clifford) connect directly to the Clifford+T material of §8.10 and to fault-tolerant simulation in Chapter 19. §24.7–§24.10 (tensor networks, DMRG, TEBD, variational) are the production tools for many-body physics and are the lever the recent "classical pushback" results pull. §24.11–§24.13 cover hybrid path-sum methods, GPU and distributed execution, and noise simulators. §24.14–§24.15 close the loop with the quantum-advantage frontier and a decision tree for picking a simulator. Readers focused on hardware can skim §24.7–§24.10 on first pass; readers focused on algorithms should not.

## 24.1 Why Classical Simulation Matters

Three distinct constituencies use classical simulators, and conflating their requirements is the source of most confusion about what the simulators are *for*.

The **algorithm developer** uses simulation to test and debug. A 20-qubit variational circuit can be fully exercised on a laptop; statevector access lets the developer assert that the prepared state matches the analytic target, examine intermediate amplitudes during a Grover iteration, or check that an ansatz actually has the expressibility its paper claims. None of this is possible on real hardware: a quantum device returns samples, not amplitudes, and tomographic reconstruction of a 20-qubit state would consume more shots than the universe has photons. The simulator is the only place where the *internals* of a quantum algorithm are observable.

The **hardware characteriser** uses simulation to model noise. A density-matrix simulator can ingest a calibrated noise model — gate errors, readout errors, $T_1$ and $T_2$ decoherence channels — and predict the output distribution a real device should produce. Comparing that prediction against the device's measured distribution is how cross-entropy benchmarking (§22.10), randomised benchmarking, and quantum process tomography are validated. The simulator is the ground-truth oracle when the truth is itself a quantum object.

The **complexity theorist and the vendor's competitor** use simulation to set lower bounds. Every claim of "quantum advantage" is a claim of the form "the best known classical algorithm needs at least time $T$ to perform this sampling task." The number $T$ is established by *running* — or carefully estimating — the best classical simulator. When a 2019 paper reported Sycamore had performed a sampling task in 200 seconds that would cost a classical supercomputer 10 000 years, that 10 000-year figure was a classical-simulation estimate. Subsequent work (§24.14) dropped it by six orders of magnitude. Classical simulation is the moving frontier that defines what "quantum advantage" even means.

Three additional, smaller-scale uses round out the picture. **Education and prototyping**: every reader who has stepped through a Bell-pair circuit in Qiskit has used a simulator. **Compiler validation**: equivalence-checking that a transpiled circuit implements the same unitary as the source, on small enough instances to verify exhaustively (§23.14). **Algorithm research outside the universal model**: variational ansätze for chemistry, ground-state finding via DMRG, and time evolution of one-dimensional quantum magnets are *production-grade* classical-simulation workloads where the question is not "can the simulator keep up?" but "what physics has it taught us?"

## 24.2 The Exponential-Scaling Barrier

A pure state on $n$ qubits is a complex unit vector in $\mathbb{C}^{2^n}$. Storing it in dense form requires $2^n$ complex numbers; in IEEE double precision (16 bytes per complex number), that is

$$
M(n) \;=\; 16 \cdot 2^n \text{ bytes}.
$$

The threshold values matter and recur throughout the chapter. At $n = 30$, $M = 16$ GiB — feasible on a workstation. At $n = 33$, $M = 128$ GiB — feasible on a large server. At $n = 35$, $M = 512$ GiB — borderline on a single shared-memory node. At $n = 40$, $M = 16$ TiB — distributed memory across an HPC cluster. At $n = 50$, $M = 16$ PiB — the practical ceiling for full statevector simulation, reachable only by the largest national supercomputers and only by paying the bandwidth cost of distributing the state.

Time scales no better. Applying a single-qubit gate to a dense statevector touches every amplitude, so the per-gate cost is $\Theta(2^n)$ memory references; a depth-$d$ circuit on $n$ qubits costs $\Theta(d \\, 2^n)$ in the dense model. A two-qubit gate doubles the constant. Memory bandwidth, not raw FLOPs, is the binding constraint: modern GPUs and HBM-equipped CPUs deliver hundreds of GB/s, and a single gate on a 33-qubit state moves 128 GiB.

The exponential is in the *width* of the quantum register, not its *depth*. A 1000-gate circuit on 20 qubits is comfortable; a 100-gate circuit on 50 qubits is not. Every method in this chapter is, in one way or another, a tactic for avoiding storing all $2^n$ amplitudes:

- **Stabiliser simulation** (§24.5) stores a polynomial-size tableau and is exact for Clifford circuits.
- **Tensor networks** (§24.7–§24.10) store a factored representation whose size grows with *entanglement*, not with $n$.
- **Schrödinger–Feynman path summation** (§24.11) stores nothing global; it integrates one output amplitude at a time at cost exponential in *depth* rather than width.
- **Density-matrix and trajectory simulators** (§24.4, §24.13) deliberately move to a noisier model where the relevant cost may be smaller.

The exponential barrier is also the reason a quantum computer is interesting at all. If $\mathbb{C}^{2^n}$ could be compressed without loss into a polynomially-sized classical state, the BQP-vs-BPP question would be resolved in the negative direction. The structure of the methods below — each carving out a tractable subclass — is the working theorist's evidence that the general case is genuinely hard.

## 24.3 Statevector Simulation

The **statevector simulator** is the workhorse: store the $2^n$ amplitudes in a flat array indexed by basis states, apply each gate as an in-place update, and at measurement sample from $|\alpha_x|^2$ or compute exact expectation values $\langle\psi|O|\psi\rangle$ directly. It is exact (up to floating-point round-off), supports every gate the user can write down, and gives the developer access to internals no real device exposes. Schrödinger's equation is integrated as repeated unitary multiplication — hence the name **Schrödinger simulation** sometimes used in the literature.

The per-gate algorithm is the *gate-as-stride* update. For a single-qubit gate $U$ with entries $a, b, c, d$ (rows $(a, b)$ and $(c, d)$) acting on qubit $q$, partition the amplitude array into pairs $(\alpha_x, \alpha_{x \oplus 2^q})$ where $x$ ranges over basis states with the $q$-th bit clear, and update each pair as

$$
\begin{pmatrix} \alpha_x' \\\\ \alpha_{x \oplus 2^q}' \end{pmatrix} \;=\; \begin{pmatrix} a & b \\\\ c & d \end{pmatrix} \begin{pmatrix} \alpha_x \\\\ \alpha_{x \oplus 2^q} \end{pmatrix}.
$$

There are $2^{n-1}$ such pairs and each costs four complex multiplies and two complex adds. Two-qubit gates use the same trick on quadruples. Diagonal gates (notably $Z$, $S$, $T$, $R_Z$, controlled-phase) touch only the amplitudes whose control qubits are set and avoid the full sweep. Permutation gates (notably $X$, CNOT, SWAP) only reshuffle indices and need no arithmetic at all.

Memory layout matters. Storing the amplitudes contiguously and arranging gates so the "active" qubit is the lowest-numbered keeps the strides short and is cache-friendly. Compilers reorder gates and remap qubits precisely to optimise this (§23.6). High-performance simulators — Qiskit Aer, Cirq's `qsim`, NVIDIA's `cuStateVec`, Intel-QS — all rely on careful loop tiling, AVX-512 / NEON / GPU SIMD lanes, and asynchronous memory prefetch to approach memory-bandwidth peak.

The practical ceiling is on the order of $n = 33$–$35$ for a workstation and $n = 45$–$50$ for a top-end supercomputer. The Sunway TaihuLight and Frontier-class machines have reported 45–49-qubit full statevector simulations using terabytes of distributed memory. The 48-qubit record was set by Jülich's JUQCS-A on the Sunway TaihuLight and the K computer using adaptive 2-byte amplitude encoding (about 0.5 PiB of distributed memory); Fugaku has hosted full-state runs at ~46 qubits, and a 50-qubit run was achieved on the JUPITER exascale system in late 2025. Going beyond 50 qubits via *dense* simulation is not a question of more compute; it is a question of *exponential memory*, and that wall does not move with hardware.

What statevector simulation *cannot* do: simulate noise (Section 24.4 is the extension), exploit structure (the cost is the same for a deeply entangled state and a product state), or scale beyond the memory wall. Within those constraints it is the gold standard.

A few lines exercise exactly this access-to-internals (`examples/statevector_simulation.py`): build a GHZ circuit, read the exact amplitudes, and get outcome probabilities with no sampling at all.

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(3)
qc.h(0)
qc.cx(0, 1)
qc.cx(1, 2)  # prepares the 3-qubit GHZ state

sv = Statevector(qc)
for basis, amp in sorted(sv.to_dict().items()):
    print(f"|{basis}>: {amp.real:+.3f}{amp.imag:+.3f}j")
probs = {str(k): float(round(v, 3)) for k, v in sv.probabilities_dict().items()}
print(probs)
```

Output:

```text
|000>: +0.707+0.000j
|111>: +0.707+0.000j
{'000': 0.5, '111': 0.5}
```

## 24.4 Density-Matrix Simulation

When the system is mixed — coupled to an environment, subject to gate errors, decohering over time — the pure-state description fails. The right object is the **density matrix** $\rho$, a $2^n \times 2^n$ positive semidefinite operator with trace $1$ (Chapter 11). Storing $\rho$ in dense form costs $16 \cdot 4^n$ bytes — every qubit doubled in cost. The threshold values halve: $n = 15$ on a workstation, $n \approx 16$–$17$ on a large server, $n \approx 20$ on HPC, $n = 25$ at the very edge of dense simulation.

Gate application uses the Heisenberg conjugation: $\rho \mapsto U \rho U^{\dagger}$ for a unitary, and the general **Kraus form** $\rho \mapsto \sum_k K_k \rho K_k^{\dagger}$ with $\sum_k K_k^{\dagger} K_k = I$ for a noise channel. The amplitude-damping, depolarising, phase-damping, and Pauli-error channels (§10.12) each have explicit Kraus decompositions and are direct to apply. Measurement on a density matrix yields outcome probabilities $\mathrm{tr}(\Pi_k \rho)$ directly, without sampling, when one wants the full distribution.

The price tag — $4^n$ versus $2^n$ — buys exactness against arbitrary noise. The alternative, when one cares about $n$ that exceeds the dense density-matrix ceiling, is **quantum trajectory simulation** (also called Monte Carlo wavefunction simulation, §24.13). It keeps a pure state $|\psi\rangle$ and a list of jump operators $L_k$ derived from the channel; at each timestep the simulator either applies coherent evolution or, with a small probability, applies a jump $L_k|\psi\rangle / \\|L_k|\psi\rangle\\|$. Averaging the per-trajectory measurement statistics over many trajectories converges to the density-matrix expectation. The per-trajectory cost is $2^n$ rather than $4^n$, at the price of running, typically, hundreds to thousands of trajectories for low-variance estimates. Trajectories parallelise embarrassingly and are the right tool when $n$ is large enough that $4^n$ is out of reach.

A special case worth flagging: noise channels that are **mixtures of Pauli operators** — depolarising, dephasing, biased Pauli noise — can be simulated efficiently when *combined* with stabiliser dynamics (§24.5). The trajectory has stabiliser representation throughout, each jump is a random Pauli, and the cost stays polynomial. This is the structural reason that fault-tolerant simulation (Chapter 19) — Clifford operations with Pauli noise — is computationally tractable on circuits with millions of qubits.

## 24.5 Stabilizer Simulation

The **Gottesman–Knill theorem** (§8.10) is the most important non-trivial efficient-classical-simulation result in quantum computing. A circuit composed only of Clifford gates ($H$, $S$, CNOT) acting on a computational-basis input state, followed by computational-basis measurement, can be simulated classically in polynomial time and polynomial space. The reason is that the **stabiliser formalism** describes such states with a list of $n$ commuting Pauli generators, each storable as $2n + 1$ bits (a sign and two bits per qubit for the $\\{I, X, Y, Z\\}$ choice).

The state is represented as the **stabiliser tableau**: a $2n \times (2n+1)$ binary matrix recording the $n$ stabilisers and the $n$ "destabilisers" needed to perform measurements efficiently. The total storage is $O(n^2)$ bits. Each Clifford gate updates the tableau in $O(n)$ time (a Hadamard swaps an $X$ row with a $Z$ row on the affected qubit; CNOT propagates rows between the control and target). A computational-basis measurement either reads off a deterministic outcome from a commuting tableau entry or, when the measured Pauli anticommutes with a stabiliser, costs $O(n^2)$ for the Gaussian elimination that selects the new generator. A full Clifford circuit on $n$ qubits with $g$ gates and $m$ measurements runs in $O(n g + n^2 m)$ time.

The **Aaronson–Gottesman 2004 paper** (often abbreviated CHP, after the simulator) gave the canonical concrete algorithm. Subsequent improvements — *graph-state* representations, *symplectic* tableau forms, and above all the Stim simulator — push the constants down by orders of magnitude. **Stim** (Craig Gidney's simulator) routinely runs Clifford circuits with $10^6$ qubits and $10^8$ gates per second on a laptop. This performance is what makes large-scale quantum-error-correction simulation (Chapter 19) practical: surface-code decoder benchmarking with millions of stabiliser measurements per shot is bottlenecked by the decoder, not the simulator.

The boundary of Gottesman–Knill is the non-Clifford gate. A single $T$ gate exits the stabiliser subgroup. The dynamics is no longer expressible as Pauli-conjugation, the tableau update has no exact closed form, and the simulator must either approximate or pay an exponential cost in the number of $T$ gates. The next section addresses how that cost scales.

## 24.6 Near-Clifford and Magic-State Simulation

When a circuit has $k$ non-Clifford gates inserted into an otherwise-Clifford backbone, the right cost model is "exponential in $k$, polynomial in everything else". The technical mechanism is the **stabiliser decomposition**: any $n$-qubit pure state can be written as a (possibly complex-coefficient) sum of stabiliser states, and the minimum length of such a sum is the **stabiliser rank** $\chi(|\psi\rangle)$. A single magic state $|T\rangle = T|+\rangle$ has stabiliser rank $2$; $k$ copies have stabiliser rank at most $2^{\alpha k}$ with $\alpha \approx 0.4$ for the exact rank ($\alpha \leq 0.3963$, Bravyi et al. 2019; the 2016 Bravyi–Gosset paper gave the $2^{0.23k}$ approximate-rank scaling used for sampling), beating the naive $2^k$.

A near-Clifford simulator therefore preprocesses every $T$ gate into a teleportation-style consumption of a magic-state ancilla, accumulates the stabiliser-decomposition cost factor, and simulates the underlying Clifford circuit on each term. The total runtime is roughly

$$
T_{\mathrm{sim}}(n, k) \;=\; \mathrm{poly}(n) \cdot 2^{\alpha k}.
$$

For $k \lesssim 50$ this is feasible on a workstation; for $k \lesssim 100$ on a cluster. Bravyi–Gosset (2016) simulated a 40-qubit hidden-shift circuit with $\sim$50 $T$ gates in hours on a workstation; the 2019 follow-up (Bravyi et al., *Quantum* 3, 181) reached 50 qubits and over 60 non-Clifford gates — scales that would have cost roughly $2^{50}$-plus amplitudes in dense statevector form.

A different family of methods replaces the stabiliser-decomposition sum by a **quasi-probability** representation. The **Pashayan–Wallman–Bartlett 2015** scheme writes every state and every operation in a "phase-space" frame where stabiliser states have nonnegative quasi-probabilities and non-stabiliser states have signed quasi-probabilities. The simulator samples trajectories with weights $\pm 1$ from the quasi-probability distribution; the sampling overhead scales with a quantity called the **negativity** or **magic**, which is constant for Clifford circuits and grows multiplicatively with each non-Clifford gate. The cost again is polynomial in $n$ and exponential in the magic.

The two viewpoints — sums of stabilisers and quasi-probability sampling — are dual: both pay nothing for Clifford parts of a circuit and pay (provably) exponentially in the non-Clifford content. Their existence is the precise sense in which **the T-count is the magic resource of fault-tolerant quantum computing** (§8.10): if you can compile your algorithm with few $T$ gates, then a classical simulator can also reproduce it — so any genuine quantum advantage over these methods *requires* a high $T$-count, even though minimising $T$-count remains the goal for fault-tolerant resource cost.

## 24.7 Tensor-Network Simulation

Tensor networks are the leading method for classically simulating large quantum systems whose entanglement is *limited*. The state is represented as a contracted network of small tensors, one per site, with auxiliary "bond" indices encoding the correlations between sites. The size of each bond — the **bond dimension** $\chi$ — controls the expressive power: bond dimension 1 represents product states; bond dimension $2^{n/2}$ represents an arbitrary state on $n$ qubits. The interesting regime is everything in between.

The general picture is that a tensor network is a sparse factorisation of an exponentially large object. A state on $n$ qubits is, in coordinate form, a rank-$n$ tensor with $2^n$ entries; the tensor network reshapes it into a contraction $T = \prod_i A^{(i)}$ where each $A^{(i)}$ has $O(\chi^2 \cdot 2)$ entries and the contraction is performed lazily on demand. Storage drops from $2^n$ to $O(n \chi^2)$ when $\chi$ stays small. Time-evolving the network keeps the same structure: apply local gates by contracting them into the relevant site tensors, then re-truncate the bond dimensions to $\chi$ via singular-value decomposition.

The **entanglement entropy** of a subregion is the load-bearing quantity. For a bipartition of the $n$ qubits, the Schmidt decomposition (§4.9) of the state has at most $\chi$ non-zero singular values across the cut, so the **entanglement entropy across that cut is bounded by $\log_2 \chi$**. The simulator's guiding principle runs the other way: exact representation needs $\chi$ at least the **Schmidt rank** across each cut, so if that rank stays $\le 2^S$, bond dimension $\chi = 2^S$ represents the state exactly and simulation is polynomial in $n$ and exponential only in $S$. A bound on the *entanglement entropy* alone is weaker — a concentrated Schmidt spectrum can have low entropy yet high rank — but low entropy does guarantee that truncating to a modest $\chi$ gives an accurate *approximation*, which is what makes area-law states tractable in practice.

The two dominant topologies are **matrix product states (MPS)** for one-dimensional geometries (§24.8) and **projected entangled pair states (PEPS)** for two-dimensional geometries (§24.10). Both come with a substantial software ecosystem — ITensor, TeNPy, Quimb, NVIDIA's `cuTensorNet` — and have been the production tool of condensed-matter theory for the last twenty years. They are also, increasingly, the back-end of choice for the largest "advantage-busting" classical simulations of quantum-computing benchmarks (§24.14).

The trade-off is sharp. A circuit that builds *volume-law* entanglement — a deep random circuit is the canonical case — saturates the bond dimension at $\chi = 2^{n/2}$ and tensor networks lose their advantage. (Note the contrast with GHZ states: maximally *nonlocal*, yet Schmidt rank 2 across every cut, hence bond dimension 2 and MPS-trivial — entanglement *structure*, not entanglement per se, is what costs.) A circuit that keeps entanglement local — most circuits on near-term hardware, most ground states of gapped local Hamiltonians, most low-depth random circuits — stays in the small-$\chi$ regime, and tensor networks dominate.

## 24.8 Matrix Product States and TEBD

A **matrix product state (MPS)** on $n$ qubits writes each amplitude as a product of matrices, one per site:

$$
|\psi\rangle \;=\; \sum_{x_1, \ldots, x_n} A^{(1)}_{x_1} A^{(2)}_{x_2} \cdots A^{(n)}_{x_n} \\, |x_1 x_2 \cdots x_n\rangle,
$$

where each $A^{(i)}_{x_i}$ is a $\chi \times \chi$ matrix (boundary tensors are $1 \times \chi$ and $\chi \times 1$). The bond dimension $\chi$ controls the entanglement across each cut between consecutive sites. Storage is $O(n \chi^2)$. Single-site gates update one $A^{(i)}$. Two-site gates acting on adjacent sites $i, i+1$ contract those two tensors, multiply by the gate, then re-split via SVD, truncating any singular values past $\chi$. Two-site gates on non-adjacent sites are handled by SWAP-routing the qubits to adjacency and back — quadratic overhead in the worst case, but acceptable for local interactions.

**Time-evolving block decimation (TEBD)** is the MPS-native algorithm for simulating time evolution $|\psi(t)\rangle = e^{-iHt}|\psi(0)\rangle$ of a one-dimensional Hamiltonian $H = \sum_i h_{i,i+1}$ with nearest-neighbour interactions. It Trotterises the exponential into a product of small two-site gates (§16 for the Trotter machinery), applies each gate via the SVD-and-truncate step above, and walks a "brick-wall" pattern of even-bond and odd-bond gates across the chain. The cost per timestep is $O(n \chi^3)$, dominated by the SVD. Variants — second-order Trotter, higher-order Suzuki splitting, TDVP (time-dependent variational principle) — control the Trotter error or the bond-dimension truncation error in different ways.

The regime in which TEBD wins is *one-dimensional systems where the entanglement growth is bounded*. The **area law** for ground states of gapped one-dimensional Hamiltonians (Hastings 2007) says the entanglement entropy across any cut is $O(1)$, so a fixed $\chi$ — typically $\chi = 50$ to $200$ — suffices for chemical-accuracy ground-state simulation. **Quench dynamics** out of a gapped state, however, exhibit **linear entanglement growth** $S(t) \sim t$ (Calabrese–Cardy), so the required $\chi$ grows exponentially in time. TEBD is fast and accurate at short times and quickly becomes infeasible at long times — a hard wall, not a soft slowdown.

MPS has also become a credible back-end for *quantum-circuit* simulation when the circuit's entanglement is locally bounded — random circuits with low depth, variational ansätze with limited entangler layers, and adiabatic preparations near the gap. NVIDIA's `cuQuantum` and Quimb both ship MPS back-ends that handle hundreds of qubits at modest $\chi$.

## 24.9 DMRG and Ground-State Methods

The **density matrix renormalisation group (DMRG)**, introduced by Steven White in 1992, predates the modern MPS reformulation but is, in modern language, an optimisation over the MPS manifold. The target is a ground state of a (typically one-dimensional, nearest-neighbour) Hamiltonian $H$. The algorithm sweeps left-to-right and right-to-left across the chain; at each site it solves a local eigenvalue problem (Lanczos or Davidson on the effective two-site Hamiltonian), updates the site tensor with the resulting eigenvector, re-truncates the bond dimension, and proceeds to the next site.

DMRG converges geometrically for gapped one-dimensional Hamiltonians and is **the** method for ground-state simulation of one-dimensional quantum magnets, fermionic chains, and a wide class of quasi-1D ladder systems. Energies are routinely converged to relative precision $10^{-10}$ at bond dimensions $\chi \le 1000$, which translates to spin chains of hundreds of sites on a workstation. The Heisenberg, $t$-$J$, Hubbard, and SSH models — the workhorse Hamiltonians of condensed-matter theory — have all had their ground-state phase diagrams mapped out by DMRG.

The method extends to two-dimensional systems by mapping the 2D lattice onto a 1D snake path, at the cost of exponentially-growing bond dimension in the *narrower* spatial direction. **DMRG on cylinders of width $w$** in the snake encoding requires bond dimension $\chi \sim 2^w$. So DMRG works for cylinder widths $w \lesssim 8$–$12$ (depending on bond-dimension budget) — enough to address frustrated-magnet phase questions but not enough to thermodynamically extrapolate to genuine 2D systems. For *that*, the right tool is PEPS (§24.10) or modern variational Monte Carlo.

The bridge to quantum computing is that DMRG is, today, the classical baseline that quantum-chemistry and quantum-simulation algorithms must beat. A 50-qubit VQE circuit estimating the ground state of a 50-site Hubbard model competes against DMRG on the same Hamiltonian; the *interesting* quantum-chemistry regimes are those where DMRG's bond-dimension demand grows to the point of infeasibility (typically: 2D or fully-connected systems, or excited-state spectroscopy where DMRG's variational locking is restrictive).

## 24.10 PEPS and Variational Tensor Methods

A **projected entangled pair state (PEPS)** is the two-dimensional generalisation of MPS. Each site of a 2D lattice carries a tensor with four (or three, on the boundary) bond indices, one to each neighbour. The state is the contraction of the full 2D network. The bond dimension $\chi$ again controls the entanglement entropy across each cut, but now an arbitrary cut crosses $O(L)$ bonds for an $L \times L$ lattice, so the entanglement *across any straight cut* is $\le L \log_2 \chi$ — exactly the **area law** for ground states of gapped two-dimensional Hamiltonians.

The catch is that contracting a 2D tensor network is itself an exponentially hard problem in the worst case — it is the *partition function* of a classical statistical-mechanics problem, formally #P-hard. PEPS algorithms therefore rely on approximate contraction schemes: **boundary MPS** (compress the contraction one row at a time), **corner transfer matrix**, **tensor renormalisation group**. Each scheme introduces an auxiliary bond dimension $\chi_b$ controlling the contraction accuracy. PEPS calculations are routinely two to three orders of magnitude slower than the analogous MPS calculations and require careful convergence checks in two parameters $(\chi, \chi_b)$.

Despite the cost, PEPS dominates the field for **frustrated 2D magnets**, **finite-temperature 2D systems**, and **2D fermionic systems** (Hubbard model on a square lattice). It is the method of choice for the high-$T_c$ cuprates' pairing structure, the kagome spin liquid, and the toric-code phase. Quantum simulators that promise advantage on these problems are competing against PEPS calculations whose state of the art is itself a fast-moving target.

A complementary family of methods replaces the structured ansatz with an unstructured **variational neural-network state**: parameterise $\langle x|\psi\rangle$ as the output of a neural network and minimise $\langle\psi|H|\psi\rangle$ via Monte Carlo and stochastic gradient descent. Originated by Carleo and Troyer in 2017, neural-network quantum states (NQS) have matched and in some cases exceeded PEPS accuracy on 2D Heisenberg and fermionic systems. NQS sits in a different region of the simulator design space from tensor networks — heavier compute, lighter assumptions about the entanglement structure, no formal area-law guarantee — and the question of which method dominates which regime is still open.

## 24.11 Schrödinger–Feynman and Hybrid Path-Sum Methods

A single output amplitude of a quantum circuit can also be computed by **summing over paths**, in direct Feynman-path-integral style. For a circuit $U = U_d \cdots U_2 U_1$ on $n$ qubits, the amplitude $\langle y | U | x\rangle$ is

$$
\langle y | U | x\rangle \;=\; \sum_{z_1, \ldots, z_{d-1}} \langle y | U_d | z_{d-1}\rangle \cdots \langle z_2 | U_2 | z_1 \rangle \langle z_1 | U_1 | x\rangle,
$$

where each intermediate $z_t$ ranges over $2^n$ basis states. Naively this is $2^{n(d-1)}$ — far worse than statevector simulation. The point is that when each $U_t$ acts on only $k$ qubits (single- and two-qubit gates have $k \le 2$), only $2^k$ of the $z$ entries differ from $z_{t-1}$, and the sum decomposes into local pieces.

The **Schrödinger–Feynman hybrid simulator** (Markov, Boixo, Smelyanskiy, and others, 2017–2020) exploits this for circuits with low depth on grids of qubits. Partition the qubits into a small number of *blocks*; within each block, run a Schrödinger (statevector) simulator; between blocks, sum over the path contributions on the cutting bonds. The cost is $2^{n/B}$ per block for $B$ blocks times the number of path configurations across the cuts, which scales as $4^{\#\mathrm{cuts}}$. For a shallow circuit on a 2D grid with few entangling gates spanning the block boundaries, this can be a dramatic win.

A more recent reformulation views the entire calculation as a **tensor network contraction** with the circuit's gates as the tensors and the qubit world-lines as the bonds. The optimal contraction order — which intermediate tensors to form first — is itself an NP-hard problem (treewidth) but admits very effective heuristics. **Pan, Chen, and Zhang 2022** and follow-up work used this view, together with massive GPU parallelism, to drop the estimated cost of simulating the Sycamore 2019 sampling benchmark from 10 000 years to hours-to-days on a GPU cluster (about 15 hours in the headline configuration). The general lesson: any quantum-advantage claim that targets a specific output statistic — a marginal, a cross-entropy benchmark — rather than the full output distribution may be vulnerable to a clever tensor-network contraction of just the relevant slice.

## 24.12 GPU Acceleration and Distributed Simulation

Modern statevector simulation lives on GPUs. A single H100 GPU has 80 GiB of HBM3 with 3 TB/s bandwidth — comparable to the entire RAM bandwidth of a 64-core CPU node. The gate-as-stride update (§24.3) maps naturally onto GPU SIMT: each gate launches a kernel that processes pairs (or quadruples for two-qubit gates) in parallel across thousands of threads. **NVIDIA `cuStateVec`** (part of `cuQuantum`), **Google `qsim`** (the back-end behind Cirq's heavy simulations), and **Qulacs** are the most heavily-optimised single-GPU statevector simulators; all approach memory-bandwidth peak and run circuits at 30+ qubits significantly faster than CPU equivalents.

Multi-GPU and distributed simulation extend the reach in width. The statevector is partitioned across $P$ devices, each holding $2^n / P$ amplitudes. Gates on the "local" qubits — those whose index falls inside a single partition — run independently per device. Gates on the "global" qubits — those whose flip would cross partitions — require all-to-all communication of half the data. Scaling thus depends on the *interconnect bandwidth*, not just FLOPs: NVLink and InfiniBand are the bottleneck. The 2018 Sunway TaihuLight 48-qubit JUQCS-A simulation, the 2023 Frontier 42-qubit simulation, and the various Alibaba-Quantum and `cuStateVec` distributed runs all pay this communication tax.

Mid-sized simulations (30–35 qubits) on a single workstation GPU are the *practical* sweet spot for the algorithm developer. A 30-qubit statevector fits in 16 GiB; a single 1000-gate circuit runs in seconds. Three-orders-of-magnitude speedup over CPU is routine. The same code paths — `cuStateVec` for statevectors, `cuTensorNet` for tensor networks, `cuQuantum-DM` for density matrices — interoperate with Qiskit, Cirq, and PennyLane via vendor-provided back-ends and require no model-side changes from the developer.

## 24.13 Quantum-Noise Simulators

A noise simulator's job is to predict what a *real* quantum device — finite-fidelity gates, $T_1$/$T_2$ decoherence, leakage, readout error — produces, not what an idealised circuit produces. Three architectures coexist.

**Full density-matrix simulation** (§24.4) is exact but pays $4^n$ memory. It is the right choice when $n \le 20$ and the noise model is rich (correlated, non-Markovian, leakage to non-computational levels). Qiskit Aer's density-matrix back-end and `cuQuantum-DM` are production-grade.

**Trajectory simulation** keeps a pure state and applies stochastic jumps drawn from the channel's Kraus decomposition. The simulator is, per trajectory, no more expensive than statevector simulation. Averaging over $N$ trajectories converges to density-matrix expectation values with variance $1/N$. The break-even with full density-matrix simulation is roughly $N \approx 2^n$, so for $n > 25$ trajectories are essentially the only option. Qiskit Aer's noise back-end and Cirq's `Simulator`-with-noise path use trajectories for large $n$ (PennyLane's `default.mixed`, by contrast, is a full density-matrix simulator).

**Pauli-error / stabiliser-noise simulation** is the special case where every noise channel is a mixture of Pauli operators and every gate is Clifford. The state stays in the stabiliser subgroup, jumps are random Paulis with known probabilities, and the per-trajectory cost is $O(n^2)$ rather than $O(2^n)$. This is the simulator regime for **fault-tolerant error-correction studies**: surface codes, colour codes, and Floquet codes on lattices of thousands to millions of qubits, where the only computationally interesting events are syndromes and decoder runs. **Stim** is the dominant tool here and is what produces the surface-code threshold curves quoted in Chapter 19.

A subtler point: classical simulation of *noisy* quantum circuits can be **exponentially easier** than simulation of noiseless ones, in a precise sense. The **Aharonov–Ben-Or 1996** and **Knill 2005** style arguments show that constant-rate depolarising noise above a (low) threshold reduces every circuit's output to nearly classical, and the simulation becomes polynomial-time. **Bremner–Montanaro–Shepherd 2016** quantified this for IQP and random-circuit sampling: noisy versions of advantage-claim sampling tasks are classically simulable if the noise exceeds a circuit-depth-dependent threshold. The practical consequence for hardware engineers (§24.14): driving the error rate down is not just an engineering goal, it is the *only* way to preserve a meaningful advantage claim against improving classical simulators.

## 24.14 The Quantum-Advantage Frontier

The phrase **quantum (computational) advantage** — the more cautious successor to "quantum supremacy" — names a specific genre of demonstration: a quantum device performs some sampling task in time $T_Q$ that the best known classical simulator needs time $T_C \gg T_Q$ to match. The 2019 Google **Sycamore** result reported $T_Q \approx 200$ s on a 53-qubit, depth-20 random circuit, against a then-estimated $T_C \approx 10\\,000$ years on Summit using a Schrödinger–Feynman simulator. The 2020 and 2021 USTC **Jiuzhang** and **Jiuzhang 2.0** photonic experiments made analogous claims for boson sampling. The 2024 USTC **Zuchongzhi 3.0** experiment, also random-circuit sampling on a 67–105 qubit superconducting device, refreshed the gap.

The *classical* side of the frontier has not been static. Three lines of advance have eroded each generation of claim.

**Tensor-network contractions on GPU clusters.** **Pan, Chen, and Zhang 2022** rephrased the Sycamore benchmark as a tensor-network contraction, found a near-optimal contraction order, executed it on a few thousand GPUs, and reported a simulation in roughly 15 hours — six orders of magnitude faster than the original 10 000-year estimate. **Pan and Zhang 2023** extended the technique to the 60-qubit Zuchongzhi benchmark. The general moral is that random-circuit sampling, with its low-depth and limited entanglement spread, sits exactly in the regime where tensor networks are powerful.

**Massive distributed simulation.** The 2021 Gordon-Bell tensor-network simulation of the 53-qubit Sycamore-class circuit on the new-generation Sunway supercomputer, using $4 \times 10^7$ cores, reported $T_C \approx 304$ s — within a small factor of the device's wall-clock time. **NVIDIA `cuStateVec`** and (before its 2023 wind-down) Alibaba's "Tai Zhang" simulator effort demonstrated 40+ qubit full-statevector simulations at competitive walltimes.

**Noise-aware classical algorithms.** When the experimental circuit's noise level is high enough — as it always is in current NISQ-era devices — the output distribution is provably close to a low-fidelity mixture that is itself easier to sample. **Gao, Kalinowski, Chou, Lukin, Barak, and Choi** (the linear-XEB-spoofing line, published 2024) and related work have shown that several recent advantage benchmarks can be matched by classical algorithms exploiting precisely the device's noise rate.

The take-away is not that quantum advantage has been disproven. The take-away is that **the advantage gap is set by the joint optimum over (a) device fidelity and qubit count, (b) classical simulator technique, and (c) the choice of benchmark**, and improvements in any one factor reshape the gap. For an honest assessment of any current advantage claim, one needs the most recent classical-simulator result on the *same* circuit family — sometimes published only months later.

Forward-looking: the consensus among classical-simulation specialists is that **sampling-based advantage** on random circuits is, ultimately, vulnerable to tensor-network and noise-exploiting simulators. **Advantage on algorithms with verifiable structure** — Shor's factoring, ground-state energies of strongly-correlated systems — is the harder target for classical simulators precisely because the verifiable structure leaves no room for the simulator to exploit a noise floor. The frontier moves toward algorithms that *do something*, away from sampling tasks designed to be hard.

## 24.15 Choosing a Simulator

The decision tree below picks out the right tool for a given problem. Read it top to bottom: the first matching branch is the right one.

**Is the circuit Clifford-only?** Use a stabiliser simulator (Stim, CHP). Cost is polynomial; circuits with millions of qubits and gates are routine.

**Is the circuit Clifford + a small number ($\lesssim 50$) of $T$ gates?** Use a near-Clifford simulator (Bravyi–Gosset stabiliser decomposition, quasi-probability sampling). Cost is polynomial in $n$, exponential in $T$-count.

**Is the qubit count $n \le 30$ and the noise model trivial (or only Clifford-friendly)?** Use a workstation statevector simulator (Qiskit Aer, `qsim`, Qulacs). Cost $O(d \\, 2^n)$, finishes in seconds for any reasonable circuit.

**Is the qubit count $30 < n \le 35$ with rich gate sets?** Use a GPU statevector simulator (`cuStateVec`). Same algorithm, two to three orders of magnitude faster.

**Is the noise model rich and $n \le 20$?** Use a density-matrix simulator. Cost $4^n$ — small but exact.

**Is the noise model rich and $n > 20$?** Use a trajectory simulator with $\sim 1000$ samples. Cost $\sim 1000 \cdot 2^n$, parallelises trivially.

**Is the system one-dimensional and low-entanglement (ground state of a gapped 1D Hamiltonian, or shallow 1D circuit)?** Use DMRG for ground states, TEBD for time evolution. Cost $O(n \chi^3)$ per gate or per sweep, with $\chi$ set by the entanglement.

**Is the system two-dimensional and low-entanglement?** Use PEPS. Cost is much higher than MPS; converge in both $\chi$ and the contraction-auxiliary bond dimension.

**Is the circuit low-depth on a 2D grid, and only a few output amplitudes are wanted?** Use Schrödinger–Feynman path-sum (Markov–Boixo) or tensor-network contraction with a slicing scheme (Pan–Chen–Zhang). Cost depends sharply on depth and number of slices.

**Is the circuit deep, with high-entanglement growth, and $n > 35$?** No classical simulator handles this well — this is the *interesting* regime where the device, if it exists with low enough noise, has an advantage. Set up the calculation as a benchmark for the quantum hardware and accept that the classical baseline may not be feasible.

The implicit message of the tree is that **classical simulation is plural**: there is no single best simulator, and each method's regime is bounded by a physical quantity (entanglement, T-count, noise rate, depth, dimensionality) rather than by qubit count alone. The competent quantum-software engineer knows which tool to reach for and which lever — fidelity, structure, depth, or sheer hardware — will move the boundary in their favour.

---

**Bridge to Chapter 25.** This chapter has surveyed what classical hardware can simulate. Chapter 25 turns to what quantum hardware can *do* in the present (NISQ) era and what it may do once early fault tolerance arrives. The two chapters together set up the central practical question of the book's remainder: *given* a classical simulator that handles $n \approx 50$ qubits at low depth, what genuine quantum computation has to look like to be worth running on a noisy device. The answer pivots on the levers identified here — entanglement growth, $T$-count, structure, and noise — each of which becomes an engineering target in the chapters that follow.

**Sanity checks.**

1. A 35-qubit statevector simulation runs out of memory on a 256 GiB workstation. What is the minimum memory needed, and why does adding *one* more qubit roughly *quadruple* it for a density-matrix simulator (while a statevector simulator needs two more qubits for the same factor)?
2. A circuit consists of 100 Clifford gates and 12 $T$ gates on 40 qubits. Roughly estimate the runtime of the cheapest available classical simulator, and identify which family it belongs to.
3. You are simulating the dynamics of a 1D Heisenberg chain after a global quench (an abrupt change of the Hamiltonian's parameters). TEBD with bond dimension $\chi = 200$ matches the exact result to four digits at time $t = 1$, but disagrees at the second digit by $t = 10$. Why, and what does the entanglement entropy across the central cut look like?
4. A vendor claims their 60-qubit device performs random-circuit sampling 1000× faster than the best classical simulator. Three months later, a tensor-network contraction reproduces the same task in comparable wall-clock time on a GPU cluster. Which property of the benchmark made this classical pushback possible?
5. You want to verify that a 25-qubit transpiled circuit implements the same unitary as its source. Statevector simulation gives identical samples in 1024 shots. Is this verification trustworthy?

---

[← Previous: Chapter 23](23-quantum-programming-compilation-and-tooling.md) · [Table of Contents](../../README.md) · [Next: Chapter 25 →](../part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md)
