# Chapter 25. NISQ and the Early Fault-Tolerant Era

> **Status:** prereviewed · **Phase:** 5 · **Sections drafted:** 6 / 6

[← Previous: Chapter 24](../part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md) · [Table of Contents](../../README.md) · [Next: Chapter 26 →](26-practical-access-and-hands-on-work.md)

Parts 5–9 built up the algorithm, error-correction, and hardware machinery roughly as if all of it were available at once. The reality in 2026 is more sober: the algorithms exist on paper, the codes exist on paper, the hardware exists in modest sizes, and the intersection of "runs on real hardware today" and "outperforms the best classical alternative on a problem anyone outside the lab cares about" is still nearly empty. This chapter is the honest account. It introduces the **NISQ** (Noisy Intermediate-Scale Quantum) regime that has defined the field since 2018, calibrates what current devices can and cannot do, walks through the contested history of quantum-advantage claims, and sketches the transition into the **early fault-tolerant** regime that is starting to peek over the horizon. Nothing here is new physics; everything here is engineering, economics, and expectation-setting — and the difference between a useful pilot project and a press-release failure mostly comes down to getting these calibrations right.

> **How to read this chapter.** §25.1 and §25.2 are the load-bearing definitions: every later section refers to circuit-depth budgets, fidelity numbers, and the absence of error correction set here. §25.3 (error mitigation and variational algorithms in practice) is essential before reading §15.8 (VQE) with any realistic expectations. §25.4 (the advantage saga) is historical context that can be skimmed if you already lived through it. §25.5 (benchmarking) and §25.6 (the early-FT transition) are forward-looking and matter most for capacity-planning and post-quantum-cryptography decisions; §25.6 in particular sets up Chapter 26 (practical access) and Chapter 27 (cryptography migration).

## 25.1 Definition of NISQ

The term **NISQ** was coined by John Preskill in his 2018 keynote and the accompanying *Quantum* article, "Quantum Computing in the NISQ era and beyond." The definition has three parts, all of which still apply in 2026:

- **Noisy.** Gate operations have non-trivial error rates — typically $10^{-3}$ to $10^{-2}$ per two-qubit gate. There is no quantum error correction; whatever logical fidelity the circuit produces is what the physical gates deliver, multiplied across depth.
- **Intermediate-scale.** Qubit counts are in the range that classical brute-force statevector simulation eventually fails (tens to hundreds of qubits) but that is much smaller than the millions of qubits a fully fault-tolerant machine would have. Preskill's original sketch was 50–100 qubits; the 2026 ceiling is closer to a few thousand for some platforms.
- **No QEC.** This is the operative constraint. Without error correction, every additional gate adds error linearly (to first order), so circuit depth is bounded by the inverse of the gate-error rate. Surface-code logical qubits exist in labs (§25.6) but the bulk of devices that researchers and customers actually run circuits on are still bare physical qubits.

The combination is what makes NISQ awkward: the qubit counts are large enough that simulation is hard, but the depth budgets are too small to run any algorithm that would have given an asymptotic speedup. The intuition that "more qubits is automatically better" fails in this regime — adding qubits without lengthening the usable circuit only enlarges the system you are not yet able to compute with.

The regime is bracketed by two earlier and later eras: the pre-NISQ "few-qubit demos" era (roughly 1998–2015, when the largest implementations were single-digit qubits) and the post-NISQ early-FT era (§25.6) where logical qubits, even in small numbers, start to be available. NISQ is the awkward middle.

## 25.2 Constraints of NISQ Machines

A useful number to keep in mind is the **effective depth budget**: how many two-qubit gates one can apply in sequence before the cumulative error makes the output indistinguishable from random. For a circuit of depth $d$ and per-gate error $\epsilon$ on a system of $n$ qubits, a crude estimate of the surviving fidelity is

$$
F \;\approx\; (1 - \epsilon)^{n d} \;\approx\; e^{-n d \epsilon}.
$$

The output stops carrying useful signal when $n d \epsilon \gtrsim 1$. With 2026 best-in-class two-qubit fidelity $\epsilon \sim 5 \times 10^{-3}$ and $n \sim 100$, this gives a budget of $d \sim 2$ — that is, two layers of two-qubit gates across the device before noise dominates. Per-qubit, the budget is $\sim 1/\epsilon \approx 200$ two-qubit gates in series for a single line of the circuit; the difference between the two numbers is the difference between "any one qubit's worldline can survive a few hundred gates" and "the whole device's joint state can survive only a handful of layers."

Concrete typical parameters across the leading platforms in 2026:

- **Superconducting transmons** (IBM, Google, Rigetti). $\sim 100$ to $\sim 1{,}000$ physical qubits per chip. Single-qubit fidelity around 99.9%, two-qubit fidelity around 99.5%. Gate times of tens to hundreds of nanoseconds. Coherence times ($T_1$, $T_2$) in the $100$–$300\\,\mu s$ range. Nearest-neighbour connectivity on a heavy-hex or grid topology, requiring SWAP routing for non-local interactions.
- **Trapped ions** (IonQ, Quantinuum, Oxford Ionics). $\sim 30$ to $\sim 100$ physical qubits per trap. Single-qubit fidelity around 99.99%, two-qubit fidelity around 99.7–99.9%. Gate times of microseconds to milliseconds (slower than superconducting by 3–4 orders of magnitude). All-to-all connectivity within a trap; mid-circuit measurement and qubit reuse are mature.
- **Neutral atoms** (QuEra, Pasqal, Atom Computing). $\sim 100$ to $\sim 1{,}000$ atoms in optical tweezers. Two-qubit fidelity reaching 99.5% on best devices. Reconfigurable connectivity by physically rearranging atoms between layers — a unique capability that flattens routing cost.
- **Photonic** (PsiQuantum, Xanadu). Measurement-based and continuous-variable approaches with different metric profiles; scale is harder to compare directly because the natural unit is the photon mode rather than a stationary qubit.

The fidelity numbers above are *median* device parameters, not the heroics quoted in single-best-pair demonstrations. They also describe **isolated** gates; running gates in parallel across the device typically degrades each somewhat through crosstalk, and quoted "quantum-volume" or "CLOPS" numbers fold those degradations in (see Chapter 22 for the metric definitions).

Two constraints that are easy to forget when reading vendor announcements:

- **Connectivity matters more than qubit count.** A 1{,}000-qubit chip with nearest-neighbour connectivity, on which a hypothetical algorithm needs an all-to-all interaction graph, costs $O(n)$ SWAPs per non-local gate. The SWAPs themselves consume the depth budget. Trapped-ion all-to-all and neutral-atom reconfigurable connectivity dodge this cost; superconducting devices pay it.
- **Classical control bandwidth bounds shot rate.** Each circuit execution is a shot; getting statistically useful expectation values needs $10^3$ to $10^6$ shots. With per-shot times in the millisecond-to-second range, a single VQE optimisation can run for hours of wall-clock time on real hardware, dominated by data movement and not by the quantum part.

The takeaway: NISQ machines are wide but shallow. Algorithms designed for the regime have to be shallow by construction.

## 25.3 Variational Algorithms in Practice

Variational algorithms — VQE, QAOA, and the broader **variational** family (§§15.7–15.9) — were the field's bet that shallow circuits, looped through a classical optimiser, could extract useful information from NISQ devices. The bet has not paid off as cleanly as hoped, but the techniques developed in pursuit of it are part of how anything runs on noisy hardware today.

The basic structure is: prepare a parameterised state $|\psi(\vec\theta)\rangle$ with a shallow circuit, measure an expectation value $\langle \psi(\vec\theta) | H | \psi(\vec\theta) \rangle$ for some problem Hamiltonian $H$, feed the value to a classical optimiser, and iterate. The hope was that *expressibility* of the ansatz and *trainability* of the optimiser would suffice to find useful ground states or combinatorial optima, even with imperfect gates, because the variational principle is in some sense robust: any state the circuit prepares gives a valid upper bound on the ground-state energy.

Three obstacles emerged with experience:

- **Barren plateaus.** For sufficiently expressive ansätze on $n$ qubits, the variance of the gradient of $\langle H \rangle$ with respect to ansatz parameters scales as $\mathrm{Var}(\partial_\theta) \sim 2^{-n}$. The cost landscape is exponentially flat almost everywhere. Initialising the optimiser in a useful region — typically near a known classical solution, or with structured low-depth ansätze (Hardware-Efficient, UCC-style) — is the practical workaround, but the theoretical guarantees are weak.
- **Optimiser cost.** Each gradient evaluation costs many circuit executions (parameter-shift rule, §8.13). For $p$ parameters and shot budget $S$ per expectation value, one optimiser step is $\Theta(pS)$ shots. With $p \sim 100$ and $S \sim 10^4$, a single step takes $\sim 10^6$ shots; hundreds of steps to converge takes $\sim 10^8$ shots. At kilohertz shot rates that is days of wall-clock time per problem instance.
- **Noise interaction.** Noise biases the estimated expectation values in ways that vary with the circuit, so the optimiser is chasing a moving target. The cost surface seen by the optimiser is not the noiseless cost surface.

The dominant practical mitigation is the family of **error-mitigation** techniques. Unlike error *correction* (Chapters 18–19), which actively detects and reverses errors at runtime, error mitigation post-processes a *biased* estimator into a less-biased one at the cost of higher variance — and therefore more shots. Chapter 18 (§18.18) gives the full treatment, including symmetry verification and the bias-variance analysis; the four techniques that matter most in variational practice, in brief:

- **Zero-noise extrapolation (ZNE).** Run the circuit at the device's natural noise level $\lambda$, then at amplified noise $2\lambda$, $3\lambda$ (by inserting identity-equivalent gate pairs or by pulse stretching), and fit a polynomial or exponential to extrapolate to $\lambda = 0$. The Richardson extrapolation form gives a linear-combination estimator; the exponential form is more robust when the noise is well-modelled as a depolarising channel. Cost: a handful of circuit variants instead of one.
- **Probabilistic error cancellation (PEC).** With a characterised noise model, express the inverse channel as a quasi-probability distribution over implementable operations, sample from it, and combine with signed weights. PEC is in principle unbiased but the variance of the estimator scales exponentially in circuit depth, so the shot overhead grows as $e^{c d \epsilon n}$ for some constant $c$. Useful in the small-depth regime; quickly becomes infeasible past tens of two-qubit gates.
- **Clifford data regression (CDR).** Near-Clifford circuits are classically simulable; replace the target circuit with a Clifford-rich variant whose noisy and noiseless expectations can both be computed, fit a calibration $f$ mapping noisy to noiseless, then apply $f$ to the original circuit's noisy estimate. Cheap, model-light, but assumes the calibration generalises across the small non-Clifford perturbation.
- **Virtual distillation** (Huggins et al.). Run $M$ copies of the same state preparation and apply a collective measurement that effectively projects onto the dominant eigenvector of $\rho^M$, suppressing non-dominant noise contributions. Works without a noise model. Cost: $M$ times the qubits and a collective measurement circuit; useful when error rates are too high for ZNE to converge.

All four sit on the same **bias-variance** trade-off: the noisy expectation is a biased estimator of the noiseless one; mitigation reduces the bias at the cost of variance, and variance is what shots buy down. The hidden cost of mitigation is therefore shots — sometimes orders of magnitude more shots than the un-mitigated run. For a per-shot price of a few cents on cloud hardware, this is a real budget line in a research grant.

Where variational algorithms have demonstrably run end-to-end on hardware in 2026: small-molecule chemistry up to roughly 50 spin-orbitals with active-space reduction; Trotterised time evolution on lattices of a few tens of sites; small QAOA instances on $\sim 100$-vertex graphs whose optimal solutions are also obtainable by classical heuristics in seconds. Where they have *not* delivered a clean win against classical baselines: at scale. The 2024–2025 literature includes several VQE demonstrations on hundreds of qubits, paired with classical-shadow or tensor-network reproductions of the same answer in less wall-clock time on a laptop.

## 25.4 Quantum Supremacy and Quantum Advantage Experiments

The 2019–2025 sequence of quantum-advantage claims is worth knowing as both technical history and as a cautionary tale about how the field communicates results.

**Sycamore, Google, October 2019.** A 53-qubit superconducting processor sampled from the output distribution of a depth-20 random circuit in $\sim 200$ seconds; Google's team estimated the same task would take $\sim 10{,}000$ years on the leading supercomputer of the time. The claim was branded "quantum supremacy." Within weeks, IBM published a classical-simulation strategy using secondary storage that brought the estimate down to $\sim 2.5$ days; subsequent improvements in tensor-network simulation and GPU acceleration brought equivalent problems to hours and then minutes on commodity hardware. The Sycamore experiment was real — a random-circuit sampler with cross-entropy benchmarking score above the classical-simulability frontier *as classical simulation stood at the time* — but the frontier moved.

**Jiuzhang, USTC, December 2020.** A photonic Gaussian Boson Sampling experiment with 76 detected photons claimed an advantage of $\sim 10^{14}$ over classical. Subsequent classical algorithms exploiting structure in the Gaussian-Boson-Sampling output distribution and approximate-sampling techniques narrowed the gap considerably; the precise current factor depends on whose benchmarks one trusts.

**IBM, 2023–2024 utility-scale experiments.** A 127-qubit Eagle processor was used to compute expectation values of an Ising-model time evolution at depths beyond the reach of exact classical statevector simulation. IBM framed the result as "utility" from the outset — the paper's title is "Evidence for the utility of quantum computing before fault tolerance" — while claiming the computation lay beyond brute-force classical methods; within months, multiple classical-simulation teams reproduced the published expectation values using tensor networks (MPS, isometric tensor networks, neural-network quantum states) on commodity GPUs, narrowing what "beyond classical methods" could mean. "Utility" here means that the device produced answers consistent with state-of-the-art classical methods, validating the device, without claiming the quantum side was uniquely capable.

**The pattern.** Each claim has followed a similar arc: a careful quantum experiment with a defensible benchmark; classical simulation specialists, often academic groups with no commercial stake, finding that the chosen benchmark is more classically tractable than the original authors estimated; the headline narrative softens. None of this means the quantum experiments were faked or that the hardware is not impressive — the hardware is impressive — but the *gap* between "this is the largest quantum computation ever run" and "this is the largest computation that *only* a quantum computer can run" has stayed open longer than the field anticipated in 2019.

A more honest framing, current in 2026, separates **quantum supremacy** (the existence of any task — even a useless one — that a quantum device performs faster than any classical computer) from **quantum advantage** (a quantum device performing a *useful* task faster than the best classical alternative). The first is plausibly demonstrated for narrow synthetic benchmarks; the second has not been demonstrated for any production workload that an industrial user would pay for absent the marketing angle.

## 25.5 Benchmarking Progress Over Time

How does one measure progress in a field where the headline numbers are contested? Several complementary metrics have settled into common use:

- **Physical qubit count.** Useful but easily inflated; a 1{,}000-qubit chip with poor connectivity and median two-qubit fidelity 98% is not 10× better than a 100-qubit chip with 99.5% fidelity.
- **Quantum Volume (QV).** IBM's combined measure of width and depth: the largest $n$ such that a random $n \times n$ circuit passes the heavy-output-probability test (§22.7). Captures the depth-budget reality of §25.2 in a single number. The best published values sit around $2^{19}$–$2^{20}$ (Quantinuum); achievable QV width grows only as fast as two-qubit fidelity permits, which is why the metric has saturated.
- **Algorithmic Qubits (AQ).** IonQ's metric: the largest circuit width $n$ for which a suite of algorithmically meaningful circuits (QFT, Grover, VQE on $\mathrm{H}_2$O, etc.) succeed. More application-anchored than QV, less standardised across vendors.
- **CLOPS** (Circuit Layer Operations Per Second). Throughput metric capturing how fast the device-plus-control-stack actually executes layers, important for total time-to-solution on a variational workload.
- **Logical-qubit lifetime and logical error rate.** Once distance-$d$ codes are running (§25.6), the relevant metric shifts to logical error per logical gate, with the threshold theorem promising exponential suppression in $d$ once the physical error is below threshold.

The trend lines, fitted across vendors and platforms over 2018–2026, suggest: physical-qubit counts grew $\sim 1.5\times$ per year; two-qubit fidelity improved from 99.0% to 99.5% on superconducting and 99.9% on trapped-ion median devices over the eight-year window; quantum volume roughly doubled per year on IBM systems, then plateaued as connectivity and crosstalk became the binding constraint. Extrapolating these trends out to $\sim 2030$ suggests roughly $10^4$ physical qubits per system with two-qubit error around $10^{-3}$ — exactly the regime where small distance-$d$ codes start to outperform their physical-qubit constituents.

## 25.6 Transition to Early Fault-Tolerant Quantum Computing

The boundary between "NISQ" and "fault-tolerant" is not sharp. The early-fault-tolerant (early-FT) regime is the awkward middle: devices that can support a small number of logical qubits encoded at modest distance, with logical error rates better than the underlying physical rates but not yet competitive with the $10^{-15}$ logical errors a fully fault-tolerant resource estimate would assume.

**Below-threshold demonstrations.** The surface code's threshold theorem (Chapter 19) promises that when the physical error rate $p$ is below the threshold $p_{\mathrm{th}}$, increasing the code distance $d$ decreases the logical error rate as

$$
p_L \;\sim\; A (p/p_{\mathrm{th}})^{(d+1)/2}.
$$

Demonstrating this scaling experimentally requires running codes of multiple distances on the same hardware and confirming that $p_L$ falls as $d$ grows. The first claims of below-threshold operation came from Google's 2023 distance-3 to distance-5 surface-code experiments, followed in 2024 by distance-7 results showing $p_L$ at distance-7 below $p_L$ at distance-5. Quantinuum's 2024–2025 experiments on trapped-ion systems demonstrated similar distance-scaling on a different code family. As of 2026, "below threshold" is established for several platforms at small distances, with distance-9 to distance-11 demonstrations in progress.

**Logical-qubit overhead.** At distance $d$, a surface-code logical qubit consumes $\sim 2 d^2$ physical qubits plus ancillas and a syndrome-extraction cadence. With $d=7$ and realistic ancilla overhead, that is around $100$ physical qubits per logical, growing to $\sim 1{,}000$ at $d=21$ — the distance needed for cryptographically relevant Shor instances (Chapter 27). The conversion factor between "physical qubit count in vendor announcement" and "logical qubit count usable for an algorithm" is therefore between $10^2$ and $10^3$.

**Magic-state distillation.** Most logical operations on a surface code are Clifford, but Clifford alone is not universal (§8.10). Non-Clifford gates — $T$ gates, in the standard scheme — are implemented by consuming **magic states**, prepared by distillation protocols that themselves consume many noisy magic states to produce few high-fidelity ones. Distillation has been demonstrated at small scale in 2024–2025 (Quantinuum and others), and is on the critical path for any application that needs more than a few $T$ gates. Resource estimates for industrially relevant Shor or chemistry workloads suggest $10^9$ to $10^{12}$ $T$ gates, each requiring a distilled magic state — the magic-state factory is a sizable fraction of the projected physical-qubit budget of any future fault-tolerant machine.

**Projections (treat with appropriate scepticism).** Combining current trend lines with code-distance and magic-state arithmetic:

- By $\sim 2030$: $10$–$100$ logical qubits at modest distance, sufficient for small chemistry and algorithmic demonstrations beyond what NISQ can reach. The "early-FT useful chemistry" regime.
- By $\sim 2035$–$2040$: $10^3$–$10^4$ logical qubits at distances supporting algorithms with $\sim 10^9$ logical operations — the threshold for cryptographically relevant Shor on 2048-bit RSA, for example. The "RSA-breaking" regime, treated more carefully in Chapter 27.

These projections have been wrong before. The 2010-vintage projections for 2020 underestimated NISQ and overestimated FT; the 2020-vintage projections for 2025 overestimated FT timing and were roughly right on NISQ; the 2025-vintage projections for 2030 are the current best guess, no more.

**The honest industry view.** Quantum advantage for production workloads is not here in 2026. The cases where a real industrial user runs quantum hardware and gets an answer they could not get from a laptop, an HPC cluster, or a tensor-network simulation are essentially zero. The cases where they get an answer they *might* not be able to get classically in five years, given the trend lines, are real, and there are sound reasons to build internal capability now:

- **Tooling lead time.** Building a team that can write VQE-style code, formulate problems as Hamiltonians, and interpret noisy results is a multi-year exercise. Starting after a hypothetical quantum advantage is announced is starting late.
- **Algorithm-side R&D.** Many of the algorithms that will run on early-FT machines have not been written yet, or have been written assuming idealised hardware. Iterating algorithms against real device behaviour is most valuable now, when the gap is widest.
- **Cryptographic migration.** Post-quantum cryptographic migration (Chapter 27) is a 10–15-year exercise that has to start well before any cryptographically relevant quantum computer exists. The migration cost is real and current; the threat is future and uncertain. Acting on the threat now is the rational response to its asymmetry.
- **Workforce.** Quantum-aware developers are scarce and expensive; the supply takes years to grow. Hiring during the early-FT ramp will be more expensive than hiring through it now.

The recommendation pattern, then, for a typical industry team: simulators first (Chapter 24, Chapter 26) for algorithm development; small-scale hardware runs (Chapter 26) for benchmarking, calibration of expectations, and tooling; serious capital investment deferred until the early-FT regime delivers an algorithm with a defensible advantage on the team's actual problem. Plan for the long arc; do not bet the quarter on the short one.

**Sanity checks before moving on.**

1. With per-two-qubit-gate error $\epsilon = 5 \times 10^{-3}$ and $n = 100$ qubits, estimate the depth $d$ at which the surviving fidelity $e^{-n d \epsilon}$ falls to $1/e$. Compare to the per-qubit budget $1/\epsilon$ and explain the discrepancy.
2. A distance-$d$ surface code with $p / p_{\mathrm{th}} = 0.1$ has logical error $p_L \approx A \\, (0.1)^{(d+1)/2}$. Taking $A = 1$, find the smallest odd $d$ for which $p_L \le 10^{-15}$, and read off the physical-qubit count per logical at that distance ($\approx 2 d^2$). (Watch the boundary: $d = 29$ gives exactly $10^{-15}$.)
3. A VQE problem has $p = 200$ parameters, shot budget $S = 10^4$ per expectation value, and converges in $K = 300$ optimiser steps. Estimate the total shot count and, at a per-shot time of $1\\,\mathrm{ms}$, the wall-clock time. Identify the bottleneck.
4. List two reasons the Sycamore (2019) and Jiuzhang (2020) claims of "quantum supremacy" do not directly establish quantum advantage in the §25.4 sense. Identify which of these reasons applies to the IBM utility-scale experiments and which does not.
5. A vendor announces a chip with $1{,}000$ physical qubits, two-qubit fidelity 99.5%, and nearest-neighbour connectivity. Estimate the largest distance-$d$ surface code logical qubit it could support, and the number of logical qubits the device could hold simultaneously, ignoring ancilla overhead. What is the dominant constraint — qubit count or fidelity?

---

[← Previous: Chapter 24](../part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md) · [Table of Contents](../../README.md) · [Next: Chapter 26 →](26-practical-access-and-hands-on-work.md)
