# Factcheck — §24 Classical Simulation of Quantum Systems

Mirrors `book/part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §24.1 — Sycamore 200-second sampling task, 10 000-year classical estimate

- **Claim** (anchor): "a 2019 paper reported Sycamore had performed a sampling task in 200 seconds that would cost a classical supercomputer 10 000 years"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The 10 000-year figure is the original classical-simulation estimate; §24.14 notes it was subsequently reduced by six orders of magnitude.

## §24.1 — Classical simulation estimate reduced by six orders of magnitude

- **Claim** (anchor): "Subsequent work (§24.14) dropped it by six orders of magnitude"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to the Pan–Chen–Zhang 2022 tensor-network result discussed in §24.14.

## §24.2 — Memory cost of statevector at n=30 (16 GiB)

- **Claim** (anchor): "At n = 30, M = 16 GiB — feasible on a workstation"
- **Method**: derivation
- **Source**: → §24.2 formula M(n) = 16 · 2^n bytes; 16 · 2^30 = 16 GiB
- **Verified**: — · **Verdict**: open

## §24.2 — Memory cost at n=50 is 16 PiB

- **Claim** (anchor): "At n = 50, M = 16 PiB — the practical ceiling for full statevector simulation, reachable only by the largest national supercomputers"
- **Method**: derivation
- **Source**: → §24.2 formula M(n) = 16 · 2^n bytes; 16 · 2^50 = 16 PiB
- **Verified**: — · **Verdict**: open

## §24.2 — Per-gate cost is Θ(2^n) memory references

- **Claim** (anchor): "Memory bandwidth, not raw FLOPs, is the binding constraint"
- **Method**: derivation
- **Source**: → §24.2–§24.3 gate-as-stride algorithm; each gate touches all 2^n amplitudes
- **Verified**: — · **Verdict**: open

## §24.3 — Practical statevector ceiling: n=33–35 workstation, n=45–50 supercomputer

- **Claim** (anchor): "The practical ceiling is on the order of n = 33–35 for a workstation and n = 45–50 for a top-end supercomputer"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.3 — Fugaku 48-qubit simulation used ~1 PiB across ~130 000 nodes

- **Claim** (anchor): "The Fugaku run at 48 qubits used about 1 PiB of memory across roughly 130 000 nodes"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.3 — Sunway TaihuLight and Frontier-class machines: 45–49-qubit simulations

- **Claim** (anchor): "The Sunway TaihuLight and Frontier-class machines have reported 45–49-qubit full statevector simulations using terabytes of distributed memory"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.3 — Named high-performance simulators: Qiskit Aer, qsim, cuStateVec, Intel-QS

- **Claim** (anchor): "High-performance simulators — Qiskit Aer, Cirq's `qsim`, NVIDIA's `cuStateVec`, Intel-QS — all rely on careful loop tiling, AVX-512 / NEON / GPU SIMD lanes, and asynchronous memory prefetch to approach memory-bandwidth peak"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.4 — Density-matrix storage costs 16·4^n bytes

- **Claim** (anchor): "every qubit doubled in cost. The threshold values halve"
- **Method**: derivation
- **Source**: → §24.4; density matrix is 2^n × 2^n complex matrix, 16 bytes per entry gives 16·4^n bytes
- **Verified**: — · **Verdict**: open

## §24.4 — Density-matrix ceiling: n=15 workstation, n=22 large server, n=25 edge

- **Claim** (anchor): "The threshold values halve: n = 15 on a workstation, n = 22 on a large server, n = 25 at the very edge of dense simulation"
- **Method**: derivation
- **Source**: → §24.2 and §24.4; halving the statevector qubit counts because 4^n = 2^(2n)
- **Verified**: — · **Verdict**: open

## §24.4 — Fault-tolerant simulation tractable because Clifford + Pauli noise stays polynomial

- **Claim** (anchor): "This is the structural reason that fault-tolerant simulation (Chapter 19) — Clifford operations with Pauli noise — is computationally tractable on circuits with millions of qubits"
- **Method**: derivation
- **Source**: → §24.5 Gottesman–Knill theorem; Pauli jumps preserve stabilizer subgroup
- **Verified**: — · **Verdict**: open

## §24.5 — Gottesman–Knill theorem: Clifford circuits simulable in polynomial time and space

- **Claim** (anchor): "A circuit composed only of Clifford gates (H, S, CNOT) acting on a computational-basis input state, followed by computational-basis measurement, can be simulated classically in polynomial time and polynomial space"
- **Method**: external
- **Source**: TBD — needs verification (Gottesman 1997 / Knill 1996, and §8.10 cross-reference)
- **Verified**: — · **Verdict**: open

## §24.5 — Stabilizer tableau: 2n×(2n+1) binary matrix, O(n²) storage

- **Claim** (anchor): "recording the $n$ stabilizers and the $n$ "destabilizers" needed to perform measurements efficiently. The total storage is $O(n^2)$ bits"
- **Method**: derivation
- **Source**: → §24.5 stabilizer-tableau algorithm; Aaronson–Gottesman 2004
- **Verified**: — · **Verdict**: open

## §24.5 — Full Clifford circuit runtime O(ng + n²m)

- **Claim** (anchor): "A full Clifford circuit on n qubits with g gates and m measurements runs in O(n g + n^2 m) time"
- **Method**: derivation
- **Source**: → §24.5 per-gate O(n) update and per-measurement O(n²) Gaussian elimination
- **Verified**: — · **Verdict**: open

## §24.5 — Aaronson–Gottesman 2004 CHP paper gave canonical algorithm

- **Claim** (anchor): "The Aaronson–Gottesman 2004 paper (often abbreviated CHP, after the simulator) gave the canonical concrete algorithm"
- **Method**: external
- **Source**: TBD — needs verification (Aaronson & Gottesman, Physical Review A 70, 052328, 2004)
- **Verified**: — · **Verdict**: open

## §24.5 — Stim runs 10^6-qubit, 10^8-gate-per-second Clifford circuits on a laptop

- **Claim** (anchor): "Stim (Craig Gidney's simulator) routinely runs Clifford circuits with 10^6 qubits and 10^8 gates per second on a laptop"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.6 — Stabilizer rank of k magic states: at most 2^(αk) with α≈0.396 (Bravyi–Gosset 2016)

- **Claim** (anchor): "from the **Bravyi–Gosset 2016** construction, beating the naive $2^k$"
- **Method**: external
- **Source**: TBD — needs verification (Bravyi & Gosset, Physical Review Letters 116, 250501, 2016)
- **Verified**: — · **Verdict**: open

## §24.6 — Bravyi–Gosset 2016: 50-qubit, 60-T-gate simulation completed in hours

- **Claim** (anchor): "The Bravyi–Gosset paper exhibits a concrete 50-qubit, 60-T-gate simulation completed in hours that would have cost roughly 2^{60} amplitudes in dense statevector form"
- **Method**: external
- **Source**: TBD — needs verification (Bravyi & Gosset 2016)
- **Verified**: — · **Verdict**: open

## §24.6 — Near-Clifford runtime: poly(n)·2^(αk)

- **Claim** (anchor): "exponential in $k$, polynomial in everything else"
- **Method**: derivation
- **Source**: → §24.6 stabilizer-decomposition cost model; Bravyi–Gosset 2016
- **Verified**: — · **Verdict**: open

## §24.6 — Pashayan–Bartlett–Gross 2015 quasi-probability scheme

- **Claim** (anchor): "**Pashayan–Bartlett–Gross 2015** scheme writes every state and every operation in a "phase-space" frame where stabilizer states have nonnegative quasi-probabilities"
- **Method**: external
- **Source**: TBD — needs verification (Pashayan, Wallman & Bartlett 2015; or Pashayan–Bartlett–Gross)
- **Verified**: — · **Verdict**: open

## §24.7 — Entanglement entropy across a cut bounded by log₂χ

- **Claim** (anchor): "the **entanglement entropy across that cut is bounded by $\log_2 \chi$**"
- **Method**: derivation
- **Source**: → §24.7 and §4.9 Schmidt decomposition; bond dimension χ limits Schmidt rank
- **Verified**: — · **Verdict**: open

## §24.7 — Tensor-network storage O(nχ²) vs 2^n for full state

- **Claim** (anchor): "the contraction is performed lazily on demand. Storage drops from $2^n$ to $O(n \chi^2)$ when $\chi$ stays small"
- **Method**: derivation
- **Source**: → §24.7 MPS/PEPS structure; each of n site tensors has O(χ²·2) entries
- **Verified**: — · **Verdict**: open

## §24.7 — Tensor-network software ecosystem: ITensor, TeNPy, Quimb, cuTensorNet

- **Claim** (anchor): "Both come with a substantial software ecosystem — ITensor, TeNPy, Quimb, NVIDIA's `cuTensorNet` — and have been the production tool of condensed-matter theory for the last twenty years"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.8 — TEBD per-timestep cost O(nχ³)

- **Claim** (anchor): "The cost per timestep is $O(n \chi^3)$, dominated by the SVD. Variants"
- **Method**: derivation
- **Source**: → §24.8 TEBD two-site gate SVD-and-truncate step
- **Verified**: — · **Verdict**: open

## §24.8 — Area law for ground states of gapped 1D Hamiltonians (Hastings 2007)

- **Claim** (anchor): "The area law for ground states of gapped one-dimensional Hamiltonians (Hastings 2007) says the entanglement entropy across any cut is O(1)"
- **Method**: external
- **Source**: TBD — needs verification (Hastings, Journal of Statistical Mechanics, 2007)
- **Verified**: — · **Verdict**: open

## §24.8 — Typical bond dimension χ=50–200 for chemical-accuracy ground states in 1D

- **Claim** (anchor): "typically $\chi = 50$ to $200$ — suffices for chemical-accuracy ground-state simulation"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.8 — Quench dynamics: linear entanglement growth S(t)∼t (Calabrese–Cardy)

- **Claim** (anchor): "**Quench dynamics** out of a gapped state, however, exhibit **linear entanglement growth** $S(t) \sim t$ (Calabrese–Cardy)"
- **Method**: external
- **Source**: TBD — needs verification (Calabrese & Cardy, Journal of Statistical Mechanics, 2005)
- **Verified**: — · **Verdict**: open

## §24.9 — DMRG introduced by Steven White in 1992

- **Claim** (anchor): "The density matrix renormalization group (DMRG), introduced by Steven White in 1992"
- **Method**: external
- **Source**: TBD — needs verification (White, Physical Review Letters 69, 2863, 1992)
- **Verified**: — · **Verdict**: open

## §24.9 — DMRG energies converged to relative precision 10^−10 at χ≤1000

- **Claim** (anchor): "converged to relative precision $10^{-10}$ at bond dimensions $\chi \le 1000$, which translates to spin chains of hundreds of sites on a workstation"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.9 — DMRG on cylinders of width w requires bond dimension χ∼2^w

- **Claim** (anchor): "at the cost of exponentially-growing bond dimension in the *narrower* spatial direction"
- **Method**: derivation
- **Source**: → §24.9 mapping of 2D lattice to 1D snake path; each row boundary cuts w bonds
- **Verified**: — · **Verdict**: open

## §24.9 — DMRG works for cylinder widths w≲8

- **Claim** (anchor): "So DMRG works for cylinder widths $w \lesssim 8$ — enough to address frustrated-magnet phase questions"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.10 — 2D PEPS contraction is #P-hard

- **Claim** (anchor): "contracting a 2D tensor network is itself an exponentially hard problem in the worst case — it is the partition function of a classical statistical-mechanics problem, formally #P-hard"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.10 — Neural-network quantum states originated by Carleo and Troyer in 2017

- **Claim** (anchor): "Originated by Carleo and Troyer in 2017, neural-network quantum states (NQS) have matched and in some cases exceeded PEPS accuracy on 2D Heisenberg and fermionic systems"
- **Method**: external
- **Source**: TBD — needs verification (Carleo & Troyer, Science 355, 602–606, 2017)
- **Verified**: — · **Verdict**: open

## §24.11 — Pan, Chen, and Zhang 2022: Sycamore benchmark cost reduced to a few days on GPU cluster

- **Claim** (anchor): "Pan, Chen, and Zhang 2022 and follow-up work used this view, together with massive GPU parallelism, to drop the estimated cost of simulating the Sycamore 2019 sampling benchmark from 10 000 years to a few days on a GPU cluster"
- **Method**: external
- **Source**: TBD — needs verification (Pan, Chen & Zhang 2022)
- **Verified**: — · **Verdict**: open

## §24.12 — H100 GPU: 80 GiB HBM3 with 3 TB/s bandwidth

- **Claim** (anchor): "A single H100 GPU has 80 GiB of HBM3 with 3 TB/s bandwidth"
- **Method**: external
- **Source**: TBD — needs verification (NVIDIA H100 datasheet)
- **Verified**: — · **Verdict**: open

## §24.12 — cuStateVec, qsim, Qulacs approach memory-bandwidth peak at 30+ qubits

- **Claim** (anchor): "**Qulacs** are the most heavily-optimized single-GPU statevector simulators; all approach memory-bandwidth peak and run circuits at 30+ qubits significantly faster than CPU equivalents"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.12 — 30-qubit statevector fits in 16 GiB; three-orders-of-magnitude GPU speedup

- **Claim** (anchor): "A 30-qubit statevector fits in 16 GiB; a single 1000-gate circuit runs in seconds. Three-orders-of-magnitude speedup over CPU is routine"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.12 — 2021 Sunway 42-qubit, 2023 Frontier 42-qubit distributed simulations

- **Claim** (anchor): "The 2021 Sunway TaihuLight 42-qubit simulation, the 2023 Frontier 42-qubit simulation, and the various Alibaba-Quantum and `cuStateVec` distributed runs all pay this communication tax"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.13 — Trajectory break-even with density-matrix at N≈2^n; trajectories only option for n>25

- **Claim** (anchor): "The break-even with full density-matrix simulation is roughly $N \approx 2^n$, so for $n > 25$ trajectories are essentially the only option"
- **Method**: derivation
- **Source**: → §24.4 and §24.13; N trajectories at cost 2^n each vs single density-matrix at cost 4^n
- **Verified**: — · **Verdict**: open

## §24.13 — Aharonov–Ben-Or 1996 and Knill 2005: constant-rate depolarizing noise makes circuits classically simulable

- **Claim** (anchor): "The Aharonov–Ben-Or 1996 and Knill 2005 style arguments show that constant-rate depolarizing noise above a (low) threshold reduces every circuit's output to nearly classical, and the simulation becomes polynomial-time"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.13 — Bremner–Montanaro–Shepherd 2016: noisy IQP/random-circuit sampling classically simulable above threshold

- **Claim** (anchor): "Bremner–Montanaro–Shepherd 2016 quantified this for IQP and random-circuit sampling: noisy versions of advantage-claim sampling tasks are classically simulable if the noise exceeds a circuit-depth-dependent threshold"
- **Method**: external
- **Source**: TBD — needs verification (Bremner, Montanaro & Shepherd 2016)
- **Verified**: — · **Verdict**: open

## §24.13 — Stim produces surface-code threshold curves for Chapter 19

- **Claim** (anchor): "Stim is the dominant tool here and is what produces the surface-code threshold curves quoted in Chapter 19"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.14 — Sycamore 2019: 53-qubit, depth-20 random circuit, T_Q≈200 s, T_C≈10 000 years on Summit

- **Claim** (anchor): "The 2019 Google **Sycamore** result reported $T_Q \approx 200$ s on a 53-qubit, depth-20 random circuit, against a then-estimated $T_C \approx 10\,000$ years on Summit using a Schrödinger–Feynman simulator"
- **Method**: external
- **Source**: TBD — needs verification (Arute et al., Nature 574, 505–510, 2019)
- **Verified**: — · **Verdict**: open

## §24.14 — Jiuzhang and Jiuzhang 2.0 photonic boson-sampling experiments (2020–2021, USTC)

- **Claim** (anchor): "The 2020 and 2021 USTC Jiuzhang and Jiuzhang 2.0 photonic experiments made analogous claims for boson sampling"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.14 — Zuchongzhi 3.0: 67–105 qubit random-circuit sampling (2024, USTC)

- **Claim** (anchor): "The 2024 USTC Zuchongzhi 3.0 experiment, also random-circuit sampling on a 67–105 qubit superconducting device, refreshed the gap"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.14 — Pan, Chen, and Zhang 2022: Sycamore tensor-network simulation in ~15 hours

- **Claim** (anchor): "Pan, Chen, and Zhang 2022 rephrased the Sycamore benchmark as a tensor-network contraction, found a near-optimal contraction order, executed it on a few thousand GPUs, and reported a simulation in roughly 15 hours — six orders of magnitude faster than the original 10 000-year estimate"
- **Method**: external
- **Source**: TBD — needs verification (Pan, Chen & Zhang 2022)
- **Verified**: — · **Verdict**: open

## §24.14 — Pan and Zhang 2023: extended technique to 60-qubit Zuchongzhi benchmark

- **Claim** (anchor): "Pan and Zhang 2023 extended the technique to the 60-qubit Zuchongzhi benchmark"
- **Method**: external
- **Source**: TBD — needs verification (Pan & Zhang 2023)
- **Verified**: — · **Verdict**: open

## §24.14 — Sunway 2021: 56-qubit Sycamore-style circuit, 4×10^7 cores, T_C≈304 s

- **Claim** (anchor): "Sunway's 2021 simulation of a 56-qubit Sycamore-style circuit using $4 \times 10^7$ cores reported $T_C \approx 304$ s — within a small factor of the device's wall-clock time"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §24.14 — Gao, Anschuetz, Wang, Cirac, Lukin 2024: classical algorithms exploit device noise rate

- **Claim** (anchor): "Gao, Anschuetz, Wang, Cirac, Lukin 2024 and related work have shown that several recent advantage benchmarks can be matched by classical algorithms exploiting precisely the device's noise rate"
- **Method**: external
- **Source**: TBD — needs verification (Gao et al. 2024)
- **Verified**: — · **Verdict**: open
