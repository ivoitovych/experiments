# Chapter 22. Hardware Engineering Metrics

> **Status:** prereviewed · **Phase:** 4 · **Sections drafted:** 14 / 14

[← Previous: Chapter 21](21-quantum-control-and-electronics.md) · [Table of Contents](../../README.md) · [Next: Chapter 23 →](23-quantum-programming-compilation-and-tooling.md)

Every vendor benchmark sheet for a quantum processor is a small adversarial document. The numbers on it are not lies — they were measured carefully, often by world-class experimentalists — but they were measured *under specific conditions*, with specific calibration choices, and against specific protocols whose strengths and blind spots are not advertised on the same page. The job of an experienced developer reading such a sheet is to translate the metrics into something operationally useful: *will this algorithm, on this device, give me the answer I want?* This chapter is the dictionary for that translation.

> **How to read this chapter.** §§22.1–22.6 cover the device-level numbers a developer cannot avoid: qubit count, connectivity, gate fidelity, coherence, gate speed, readout. §§22.7–22.10 cover the suite-level metrics — Quantum Volume, CLOPS, Algorithmic Qubits, XEB — that compress a whole device into a single headline. §§22.11–22.12 cover the operational metrics that decide whether mid-circuit measurement, reset, and feedforward actually work. §22.13 surveys current vendor numbers (2024–2026 cohort). §22.14 is the practical reading guide and bridge to Chapter 23. Skim the parts you already know; the per-vendor section is the one most likely to be out of date by the time you read it.

> **Moving-target warning — snapshot as of May 2026.** The vendor figures in this chapter (especially §22.13) are a dated snapshot. [Appendix F](../99-back-matter/appendix-f-hardware-snapshot-2026.md) is the single maintained home for hardware numbers: where this chapter and Appendix F disagree, Appendix F wins.

## 22.1 Qubit Count

The first number on any vendor sheet is the qubit count, and it is the first number to mistrust. There are at least four distinct things "qubit count" can mean and a press release rarely distinguishes between them.

**Physical qubits** are the engineered two-level (or effectively two-level) quantum systems on the device — superconducting transmons, trapped ions, neutral atoms, photonic modes. This count is well-defined for a fixed solid-state chip but less so across modalities — a neutral-atom array has dynamically loaded sites, a photonic machine may count modes or time bins — and it is *not* simply the number of addressable control channels: frequency multiplexing, shared global beams, and broadcast addressing all break the one-channel-per-qubit picture. A processor advertised at "1000 qubits" almost always means physical qubits, and usually means the count *fabricated* (or, on reconfigurable platforms, populated and nominally addressable), not the count *currently calibrated to spec*. A 1000-qubit device with 850 qubits passing acceptance criteria on a given day would not be unusual.

**Connected, usable qubits** is the subset of physical qubits that simultaneously meets calibration thresholds (single-qubit fidelity above some floor, two-qubit fidelity above some floor, readout above some floor) and is wired into the device's coupling graph as a connected component. This is the count a programmer can actually request. For large devices it can be substantially smaller than the physical count; for small, well-curated devices the two coincide.

**Logical qubits** are encoded qubits in an error-correcting code (Part 8). A single rotated-surface-code logical qubit at code distance $d$ uses $2d^2 - 1$ physical qubits *including* the syndrome ancillas (Chapter 19), so at $d = 5$ one isolated patch costs 49 physical qubits and a 1000-physical-qubit device could hold about 20 isolated patches — before routing space, lattice-surgery workspace, magic-state factories, and dead qubits, which push the computationally usable logical count well below that, and certainly nowhere near 1000. When a vendor reports both numbers — Quantinuum, for instance, has published logical-qubit counts on H1/H2 — read them as the count the user-facing algorithm should plan against.

**Algorithmic qubits** is a marketing-blessed shorthand introduced by IonQ (§22.9) for an effective qubit count that accounts for connectivity and noise. It is a *derived* metric, not a count of anything you can address.

A vendor that says "1000 qubits" without qualification almost always means physical, almost certainly does not mean logical, and may or may not mean "all of them work today." The first question to ask of any such number is *which of the four meanings, and what was passing calibration on the day this was published?*

## 22.2 Connectivity

After raw count, the second physical-device number is the **coupling graph**: which pairs of qubits can run a native two-qubit gate? Chapter 9 introduced the notion; this section catalogs the metrics that summarize it.

**Average degree** is the mean number of neighbors per qubit in the coupling graph. Heavy-hex (IBM) has average degree close to $2.5$; square-lattice (Google) has average degree close to $4$; an all-to-all ion-trap chain of $N$ ions has average degree $N - 1$. Higher average degree is better, all else equal, because it shrinks routing overhead.

**Diameter** is the longest shortest-path between any two qubits. On a roughly square planar lattice of $n$ qubits the diameter scales as $\Theta(\sqrt{n})$ (aspect ratio, boundaries, and disabled edges matter); on an all-to-all device the diameter is $1$. Diameter bounds the worst-case SWAP cost: moving a state along a coupling-graph path of length $L$ takes $L-1$ SWAPs at three CNOTs each, and on a heavy-hex 127-qubit device far-corner path lengths run in the low tens — so a worst-pair CNOT can cost a few dozen CNOTs of routing overhead (read the number off the actual coupling map, not a $\sqrt{n}$ formula), i.e. tens of times the single native entangler the remote CNOT would ideally be.

**Layout-specific metrics** matter when the coupling graph has structure the routing compiler can exploit. Heavy-hex has long "spokes" between dense vertices; the routing cost between two spoke ends is much higher than between two vertices in the same hexagon. The QED-C benchmark suite (§22.13) probes this with circuits that deliberately mix nearby and far-apart pairs.

For an all-to-all architecture the connectivity story is uninteresting — every pair is a single gate — and the relevant cost moves elsewhere (gate-time blow-up with system size, crosstalk, or shuttling time on a segmented trap). The *absence* of routing overhead is itself a metric, and ion-trap vendors emphasize it correctly.

A subtle point: "connectivity" on a benchmark sheet sometimes means coupling-graph topology and sometimes means *fraction of pairs with two-qubit gate fidelity above threshold X*. The two coincide exactly when every nominal coupling edge passes the threshold — uniform calibration, not sparsity, is the operative condition. On a partially-calibrated 1000-qubit device, the fraction of usable pairs can be the more honest number.

## 22.3 Gate Fidelity

A single-qubit gate $G_{\mathrm{ideal}}$ is implemented physically as a noisy channel $\mathcal{G}$. The **gate fidelity** quantifies how close $\mathcal{G}$ is to $G_{\mathrm{ideal}}$ — operationally: prepare a random state, apply the real gate, and ask how much of the result overlaps what the ideal gate would have produced, averaged over all input states. The simplest scalar form is the **average gate fidelity**:

$$
F_{\mathrm{avg}}(\mathcal{G}, G) \;=\; \int d\psi \; \langle \psi | \\, G^{\dagger} \\, \mathcal{G}(|\psi\rangle \langle \psi |) \\, G \\, | \psi \rangle,
$$

averaged over the Haar measure on pure input states. It is the number reported by most vendors. For an $n$-qubit gate the relation to the **average gate error** $\varepsilon = 1 - F_{\mathrm{avg}}$ and the more fundamental **process fidelity** $F_{\mathrm{pro}}$ — the overlap between the actual and ideal *processes* as a whole, insensitive to which input states are tried — is

$$
F_{\mathrm{avg}} \;=\; \frac{d \\, F_{\mathrm{pro}} + 1}{d + 1}, \qquad d = 2^n .
$$

So a process fidelity of $0.99$ on a single-qubit gate corresponds to an average gate fidelity of $\tfrac{2 \cdot 0.99 + 1}{3} \approx 0.9933$. The two numbers differ by a small constant factor, but vendor sheets do not always say which one they are reporting; in case of doubt the larger of the two is usually the one printed.

**Randomized benchmarking (RB)** is the standard measurement protocol. It samples sequences of Clifford gates of increasing length, ending with the unique Clifford that should return the state to $|0\rangle$, and fits the survival probability vs sequence length to an exponential decay. The decay constant gives the **average error per Clifford**. RB has two desirable properties: it is insensitive to state preparation and measurement (SPAM) errors, and it averages over the Clifford group, which is enough to *twirl* any noise channel — average it over random Clifford conjugations — into a depolarizing channel of equal average fidelity.

But that very averaging is RB's weakness. The number RB reports is an *average* over Cliffords; the channel that an algorithm actually applies has gate-specific noise that can be worse than the average by a substantial factor. **Cycle benchmarking** and **interleaved RB** address this by measuring fidelity of a target gate inserted into RB sequences. **Direct fidelity estimation** targets the fidelity to a known ideal gate without full reconstruction; **process tomography** reconstructs a full process-matrix representation at much higher cost, and is itself SPAM-sensitive.

Two numbers are typically reported per device.

**Single-qubit gate fidelity** ($F_{1q}$) is currently $0.9995$–$0.99995$ on the best superconducting devices (Google Willow, IBM Heron r2) and $0.9999$+ on the best ion traps (Quantinuum H2). The headline single-qubit number rarely limits algorithms.

**Two-qubit gate fidelity** ($F_{2q}$) is the binding constraint on most devices. It is currently $0.995$–$0.999$ on the best superconducting devices and $0.998$–$0.9995$ on the best ion traps. Because a typical algorithm has hundreds to thousands of two-qubit gates, even a $0.999$ fidelity per gate means a crude independent-stochastic-error estimate of whole-circuit survival collapses to $0.999^{1000} \approx 0.37$ after a thousand-gate circuit — a deliberately naive model (coherent and correlated errors do not compose as independent survival probabilities; Chapter 18), but the right order-of-magnitude alarm.

A trap to avoid: comparing RB averages across vendors as if they were directly comparable. Different vendors use slightly different Clifford-group constructions, different gate generators, and different fitting conventions; their RB numbers are not directly comparable at fine grain — and there is no universal threshold below which differences are "noise": a controlled apples-to-apples study can resolve small differences, while numbers from mismatched protocols can disagree by much more for systematic, non-random reasons. Before ranking vendors, demand confidence intervals, the protocol implementation, the qubit cohort, and whether the gates ran isolated or simultaneously.

## 22.4 Coherence Time

A qubit left untouched eventually decoheres. Two timescales summarize that decay.

**$T_1$**, the **energy relaxation time**, is the timescale on which an excited qubit decays to its ground state. Operationally: prepare $|1\rangle$, wait time $t$, measure; the population in $|1\rangle$ decays as $\exp(-t/T_1)$. $T_1$ is set by the qubit's coupling to dissipative environmental modes — for superconducting transmons, the Purcell decay through the readout resonator plus dielectric losses; for trapped ions, spontaneous emission and off-resonant scattering out of the qubit states (motional-mode heating, by contrast, degrades *gate* fidelity through the motional bus rather than the internal-state $T_1$).

**$T_2$**, the **dephasing time**, is the timescale on which the coherence between $|0\rangle$ and $|1\rangle$ decays. The relationship $T_2 \leq 2 T_1$ is a fundamental bound; equality holds when energy relaxation is the only decoherence channel. In practice $T_2 < 2 T_1$ because of dephasing from low-frequency noise (flux noise on transmons, magnetic field fluctuations on ions).

Confusingly, there are several different "$T_2$" numbers in circulation, distinguished by the experimental protocol used to measure them.

**$T_2^{\ast}$** (pronounced "T-two-star") is measured by a Ramsey experiment: $\tfrac{\pi}{2}$ pulse, free evolution for time $t$, $\tfrac{\pi}{2}$ pulse, measure. Quasi-static frequency offsets between runs contribute to the decay. $T_2^{\ast}$ is therefore sensitive to slow drift and is typically the *shortest* of the $T_2$ family.

**$T_2^{\mathrm{echo}}$** (Hahn echo) inserts a $\pi$ pulse halfway through the free evolution. The echo refocuses dephasing from detunings that stay approximately constant across the sequence — the qubit ends up largely insensitive to its mean detuning. There is no sharp frequency cutoff: the echo has a filter function that strongly suppresses low-frequency noise and passes noise near $1/t$ and above in frequency-dependent lobes (Chapter 18's filter-function picture). $T_2^{\mathrm{echo}}$ is typically several times $T_2^{\ast}$ on devices with significant low-frequency noise.

**$T_2^{\mathrm{CPMG}}$** (Carr–Purcell–Meiboom–Gill) inserts a train of $\pi$ pulses, shifting the filter function's passband to higher frequencies set by the pulse spacing. It is usually the longest of the $T_2$ family — though pulse errors and resonant spectral features can reverse the ordering — and it should be read as a *controlled-memory* lifetime under a stated pulse count and spacing, not as an architecture-independent "intrinsic" dephasing constant.

The ratios between these numbers tell you about the noise spectrum. $T_2^{\mathrm{echo}} \gg T_2^{\ast}$ means low-frequency, refocusable noise dominates — recalibration and dynamical decoupling address exactly that component, though neither repairs noise during gates. $T_2^{\mathrm{echo}} \approx 2 T_1$ means dephasing is relaxation-limited under this protocol: further software tricks cannot help, though hardware improvements to $T_1$ still can.

Per-device values on the 2025 cohort: superconducting transmons report $T_1 \sim 100$–$300\\,\mu\mathrm{s}$, $T_2^{\mathrm{echo}} \sim 80$–$300\\,\mu\mathrm{s}$. Trapped-ion qubits report hyperfine-encoding $T_1$ far beyond any experimental timescale — bounded in practice by background-gas collisions and trap loss rather than radiative decay — and roughly a second for typical optical-transition encodings (species- and transition-dependent) and $T_2^{\mathrm{echo}}$ in the multi-second to minute range — five to seven orders of magnitude more coherent per shot than superconducting hardware. The catch is that ion gate times are also a hundred to a thousand times longer (§22.5), so the ratio of coherence to gate time — the **gate count budget** before decoherence — is closer than the raw $T_2$ comparison suggests.

When a vendor sheet quotes a single "$T_2$" without specifying the protocol, treat it as underspecified and ask which experiment produced it (sequence, pulse count, fit model) — this chapter's own discipline applies to coherence numbers too. For algorithm planning, the right number is the one matching how the circuit *will* be dynamically decoupled — if at all.

## 22.5 Gate Speed

The wall-clock cost of one gate is the **gate time**: how long the pulse takes to execute. It enters the resource model in two ways. First, total circuit time is the critical-path duration of the scheduled circuit — the longest path through the instruction DAG once resource conflicts are accounted for, not the raw sum of all gate times; this is what must fit inside the coherence budget. Second, the inverse — the number of operations per second — feeds metrics like CLOPS (§22.8).

Single-qubit gates are very fast on superconducting devices ($\sim 20$–$50\\,\mathrm{ns}$) and slower on ion traps ($\sim 1$–$30\\,\mu\mathrm{s}$). Two-qubit gates take $\sim 30$–$300\\,\mathrm{ns}$ on superconducting devices (depending on the native gate — CR, iSWAP, CZ — and the qubit modality; fluxonium-based implementations have their own gate schemes) and $\sim 30\\,\mu\mathrm{s}$–$1\\,\mathrm{ms}$ on ion traps. Neutral-atom platforms (QuEra Aquila, Pasqal) sit somewhere in between for Rydberg-mediated gates but pay a large overhead for atom rearrangement between cycles.

A useful single-number summary — a coherence-to-gate-time ratio, nothing more — is

$$
N_{\mathrm{ops}} \;=\; \frac{T_2^{\mathrm{echo}}}{t_{\mathrm{2q}}} ,
$$

the number of two-qubit gate *durations* that fit serially inside the dephasing window. It is emphatically not the number of gates that will *succeed*: accumulated gate infidelity, leakage, and control error usually end a circuit's usefulness long before dephasing does. Superconducting devices have $N_{\mathrm{ops}}$ around $10^3$; ion traps around $10^4$–$10^5$ thanks to the much longer coherence. Neutral-atom devices vary widely with the specific architecture.

A pitfall: gate speed quoted per *single* gate misses parallelism. Multi-qubit devices can fire many gates in the same time slice if the qubits are disjoint. The wall-clock cost of a depth-$d$ circuit is therefore the sum of scheduled layer durations — equal to $d \cdot t_{\mathrm{layer}}$ only when all layers take the same time — not $G \cdot t_{\mathrm{2q}}$ where $G$ is the total gate count. Quoting a fast per-gate time while staying silent about limited parallelism flatters the device.

## 22.6 Readout Fidelity

Reading the qubit at the end of the circuit is a separate physical operation with its own error rate. **Readout fidelity** is asymmetric in a way that matters: prepared-$|0\rangle$-and-read-$0$ ($F_{0|0}$) and prepared-$|1\rangle$-and-read-$1$ ($F_{1|1}$) are typically *not* equal.

For superconducting transmons, the dominant readout error mechanism is qubit relaxation during the readout pulse — a $|1\rangle$ that decays to $|0\rangle$ midway through the integration window is misclassified as $0$. So $F_{1|1}$ is systematically lower than $F_{0|0}$. Typical numbers: $F_{0|0} \approx 0.99$, $F_{1|1} \approx 0.97$, asymmetry $\sim 2\%$. For trapped ions, fluorescence-based readout achieves $F_{0|0}, F_{1|1} > 0.998$ each, with smaller and less systematic asymmetry.

The headline **readout fidelity** is usually the average $\tfrac{1}{2}(F_{0|0} + F_{1|1})$ (often called the **assignment fidelity**) or the **worst-case assignment error** $\max(1 - F_{0|0}, 1 - F_{1|1})$. Vendors disagree on which to report — note one is a fidelity and the other an error, so check which direction is "better" — and the average flatters devices with asymmetric errors.

The asymmetry is exposed as a **calibration matrix** (also called the **assignment matrix** or **confusion matrix**): the $2 \times 2$ matrix $M$ with entries $M_{ij} = P(\mathrm{read}\\,i \\,|\\, \mathrm{prepared}\\,j)$. For $n$ qubits read jointly, the assignment matrix is $2^n \times 2^n$ — when cross-qubit readout correlations are small — an assumption to check, since multiplexed resonators, shared amplifiers, and correlated classifiers can violate it — the joint matrix factorizes approximately as a tensor product of single-qubit matrices. **Readout error mitigation** inverts the relation $p_{\mathrm{meas}} = M \\, p_{\mathrm{true}}$ (distributions as column vectors, $M$ column-stochastic): apply $M^{-1}$ — or a regularized pseudo-inverse, since naive inversion can produce negative probabilities — to the measured distribution to estimate the noise-free one. This is a software fix with real cost — the variance of the corrected estimator grows with the condition number of $M$ — and is most useful when the readout error is the dominant noise.

Benchmark sheets often quote a combined **state-preparation-and-measurement (SPAM) error**, folding preparation and readout error into one number — useful context, but a conflation rather than the one number to grab. Nor does SPAM set an absolute observability floor: RB-style protocols are designed precisely to estimate gate error *below* the raw SPAM rate.

## 22.7 Quantum Volume

**Quantum Volume (QV)** is the most cited suite-level metric, introduced by IBM in 2018 and adopted in slightly varying forms by Quantinuum and others. It compresses gate fidelity, connectivity, calibration quality, and compiler effectiveness into a single number.

The protocol: run **square circuits** of width and depth both equal to $d$, made of $d$ random layers; each layer pairs the $d$ qubits under a random permutation and assigns a Haar-random SU(4) gate to each of the $\lfloor d/2 \rfloor$ pairs — that defines the *model circuit*, which the compiler then maps to the device's native gates and connectivity. Compile each circuit for the target device, run many shots, and compute the **heavy-output probability** — the probability that the device returns a bit string whose ideal probability is above the median ideal probability. A device "passes" at width $d$ if this heavy-output probability exceeds $2/3$ with statistical confidence over many random instances. The Quantum Volume is then

$$
\mathrm{QV} \;=\; 2^{d^{\ast}},
$$

where $d^{\ast}$ is the largest $d$ at which the device passes. So QV $= 2^{10} = 1024$ corresponds to a $10 \times 10$ square circuit running with above-threshold heavy-output probability.

QV has real virtues. It is end-to-end — it measures whatever the *compiled* circuit does on the *actual* device, so it incorporates the compiler's intelligence and the device's calibration together. It is hardware-agnostic in intent — superconducting and ion-trap devices run the same kind of protocol — though the "slightly varying forms" above mean cross-vendor comparisons remain conditional on protocol details. It is a single number, which is easy to communicate.

Its weaknesses are now well understood. **It gets exponentially expensive to advance**: each increment of $d^{\ast}$ doubles QV but demands exponentially more experimental and classical-verification effort, and once device noise overwhelms the heavy-output threshold the metric returns no further signal for that machine. The best published QV numbers sit with Quantinuum's H-series — $2^{19}$–$2^{20}$ by 2023–2024, and higher since (§22.13 traces the milestones to $2^{25}$ in 2025) — while IBM stopped reporting QV after 512 ($2^9$, 2022) in favor of throughput- and error-per-layer-style metrics. One vendor's continued climb and another's exit are both data: QV still discriminates on high-fidelity all-to-all machines, while for other architectures its cost-to-signal ratio no longer pays.

It does not measure **algorithmic capacity**. A device with QV $= 1024$ has demonstrated statistical success on a specified *ensemble* of random 10-qubit, 10-deep circuits; it has not demonstrated that *your* 50-qubit, depth-200 algorithm will work, even when scaled down. Two devices with the same QV can have wildly different performance on a structured algorithm.

It is **dominated by two-qubit fidelity** in a way that obscures other engineering work. A vendor who cuts their two-qubit gate *error* by a factor of three will see QV jump dramatically; a vendor who triples their qubit *count* without improving fidelity will see no QV change. As an industry-progress metric, this conflates two very different kinds of progress.

For these reasons, QV is now usually presented alongside more granular metrics rather than as the sole headline. As a developer reading a sheet, treat QV as "the device passed this specific random-circuit ensemble up to width $d^{\ast}$ under the stated conditions" — evidence on that distribution, not a general lower bound for arbitrary circuits of that size.

## 22.8 CLOPS

**CLOPS** (**Circuit Layer Operations Per Second**) is IBM's complementary throughput metric. Where QV measures *what* a device can run, CLOPS measures *how fast* it can run it.

The protocol: take QV-style square circuits at a specified width (tied to the device's $d^{\ast}$), run them in batches under the official protocol's fixed template, parameter-update, and shot counts, and divide the total number of executed circuit layers by the elapsed wall-clock time. Which classical steps fall inside the timed boundary depends on the protocol version — parameter binding and runtime interaction are included; up-front transpilation may not be — so read the current definition before attributing a particular overhead to the number. Within its boundary it folds in gate time, control latency, reset, and inter-batch effects.

Current numbers (2025): IBM Heron reports CLOPS $\sim 200\\,000$; older Eagle-family devices reported $\sim 1500$–$5000$. The two-order-of-magnitude jump came partly from faster gates and partly from a redesigned control system that batches circuit submission more aggressively.

CLOPS matters for two reasons that QV does not capture. **Variational algorithms** (VQE, QAOA) submit thousands of similar circuits and read out expectation values; their wall-clock cost is dominated by submission and execution overhead, not by per-gate fidelity. A device with low CLOPS but high QV will give you a high-quality answer *very slowly*. **Iteration-heavy experimentation** — calibration sweeps, parameter scans — benefits from the same batched throughput. What CLOPS does *not* proxy is real-time mid-circuit feedback latency: high batched throughput can coexist with slow single-shot reaction time, and latency is its own metric (§22.11).

The weakness of CLOPS is that it is tied to QV-style circuits at a particular $d^{\ast}$. Devices with different $d^{\ast}$ are running different workloads to produce their CLOPS numbers; comparing them is comparing throughput on different benchmark suites. Cross-vendor CLOPS comparisons are therefore even more fragile than cross-vendor QV comparisons.

## 22.9 Algorithmic Qubits

**Algorithmic Qubits (AQ)** is IonQ's headline metric. The motivation is to report not the count of *fabricated* qubits but the count of qubits actually usable for *algorithms* on a device, accounting for connectivity and noise. The construction is operational: run a suite of structured algorithmic benchmarks (originally derived from QED-C — see §22.13) at increasing problem size; the AQ number is the largest problem size at which the device passes a fidelity threshold.

Roughly, the construction translates as: AQ is the largest $N$ such that the device successfully executes the suite's $N$-qubit instances. How AQ tracks physical qubit count depends strongly on connectivity and noise: on all-to-all trapped-ion systems IonQ's achieved AQ has run close to the physical qubit count (Aria: 25 of 25; Forte: 36 of 36), while on sparse-connectivity devices one *expects* routing and noise accumulation to push an AQ-style count well below the fabricated count — an expectation rather than a measured comparison, since AQ is chiefly reported by IonQ on its own stack rather than evaluated uniformly across platforms.

Current numbers (2025): IonQ's Forte-class systems (36 physical qubits) report AQ $= 36$; see Appendix F for the maintained figures. The near-1:1 ratio reflects the all-to-all connectivity (which raises AQ vs sparse-graph devices) within the noise budget set by the benchmark suite's fidelity threshold.

AQ is honest about its dependencies. The number depends on the benchmark suite chosen and the pass threshold. Reporting AQ $= 36$ requires specifying *which* suite and *which* threshold; a different suite gives a different AQ for the same device. The convention is a QED-C-derived suite with a stated success threshold (commonly quoted as result fidelity above $1/e \approx 0.37$ — take the exact definition from the current AQ specification, since "fidelity" here is a normalized benchmark score, not a literal correct-answer probability).

For algorithm planning, AQ is closer to the algorithmic question than QV, but it is evidence, not a prediction: AQ $\geq N$ means the device passed suite instances of that size, yet a structurally similar algorithm can differ enough in depth, parameters, observables, and precision target that it still misses spec — and AQ $< N$ does not doom a shallower or better-compiled instance. Use AQ for triage, then benchmark your actual circuit family. The further caveat is "if your algorithm resembles the suite's patterns at all" — and many do not.

## 22.10 Cross-Entropy Benchmarking and XEB

**Cross-entropy benchmarking (XEB)**, in particular **linear XEB**, is Google's preferred protocol and the one used in the 2019 "quantum supremacy" claim on Sycamore and the 2024 follow-on on Willow. It measures how well a device's output samples track the ideal output distribution of a random circuit.

The protocol: build a random circuit $C$ of width $n$ and depth $d$, run $C$ on the device for many shots producing measured samples $\\{x_k\\}$, classically compute the ideal output probability $p_{\mathrm{ideal}}(x_k) = |\langle x_k | C | 0^n \rangle|^2$ of each *measured* bit string (each such amplitude requires effectively simulating the full circuit, which is the hard part), and compute the **linear XEB fidelity**

$$
F_{\mathrm{XEB}} \;=\; 2^n \cdot \frac{1}{N_{\mathrm{shots}}} \sum_{k} p_{\mathrm{ideal}}(x_k) \;-\; 1 .
$$

For an ideal device $F_{\mathrm{XEB}} \to 1$; for a fully depolarized device that samples uniformly $F_{\mathrm{XEB}} \to 0$. Under favorable assumptions — stochastic, weak, approximately independent errors scrambled by the random circuit — $F_{\mathrm{XEB}}$ approximately factorizes as a product of per-gate fidelities, so comparing it against the product of per-gate RB numbers is a *consistency check of that error model*; coherent, correlated, or context-dependent errors can break the product law.

XEB's strength is that it scales naturally to the regime where classical simulation is barely feasible — exactly the regime where the supremacy / quantum-utility claims live. Google's 67–70-qubit random-circuit-sampling campaign (Morvan et al., published 2024) reports $F_{\mathrm{XEB}}$ in the $10^{-3}$–$10^{-2}$ range at $n \approx 70$, $d = 24$, with the 2024 Willow random-circuit-sampling demonstration extending the program to a 105-qubit lattice, in a regime the team argued lies beyond current classical simulation — a boundary that moves with classical algorithms and hardware (Appendix F tracks the claim).

XEB's weaknesses are dual. First, it requires *exponential* classical work to compute $p_{\mathrm{ideal}}$, so full direct verification runs out somewhere around $n \sim 50$–$70$ qubits with current methods — exactly the regime where the metric is most interesting. Above that, published values rest on partial methods — amplitudes computed for selected instances, patch or elided circuits, extrapolation from component fidelities — each carrying assumptions the headline number does not display; ask which portion of a quoted value was directly verified. Second, like RB, XEB is an ensemble-averaged statistic: a score on random circuits does not directly predict structured-circuit performance, and the sensitivities differ in both directions.

For a developer reading XEB numbers: treat them as evidence about aggregate device performance on the random-circuit ensemble at the scale measured — a whole-circuit statistic, not a per-gate guarantee, and not a promise about any specific algorithm.

## 22.11 Mid-Circuit Measurement, Reset, and Feedforward Latency

Chapter 9 introduced mid-circuit measurement, reset, and classical feedforward as logical primitives. As a hardware metric, what matters is how *fast* and how *cleanly* they run. Three numbers govern this.

**Mid-circuit measurement latency** is the wall-clock time from the start of the measurement pulse to the moment the outcome bit is available to the classical control system. On superconducting devices this is currently $1$–$5\\,\mu\mathrm{s}$ (dispersive readout integration plus discrimination time). On ion-trap devices it is $50$–$500\\,\mu\mathrm{s}$ (state-dependent fluorescence collection; any shelving/state-mapping and recooling steps add separately timed overhead). The ratio of coherence time to measurement latency (§22.4) gives a first crude scale for how many mid-circuit measurements one shot can absorb — crude, because measurement disturbs the measured qubits, spectators idle and dephase meanwhile, and coherence is a decay constant rather than a hard deadline.

**Reset fidelity and time** describe how reliably a measured qubit can be returned to $|0\rangle$. **Active reset** applies an $X$ gate conditional on the measurement outcome; its fidelity is roughly the product of measurement fidelity and conditional-$X$ fidelity. **Passive reset** waits for the qubit to decay through $T_1$; its time is $5$–$10 \cdot T_1$. On a 200-$\mu\mathrm{s}$-$T_1$ transmon, passive reset takes $1$–$2\\,\mathrm{ms}$ per shot — a serious throughput tax — so active reset is the standard, with reset fidelity around $0.99$ on current devices.

**Feedforward delay** is the latency between a measurement outcome becoming available and the application of a quantum gate conditioned on it — the classical processing (decoding, decision logic) plus pulse-generation latency that sits *on top of* the measurement latency above. On the best-engineered superconducting devices (Google Willow, IBM Heron) this conditional-dispatch latency is on the order of $100$–$500\\,\mathrm{ns}$, so the full measurement-to-conditioned-gate round-trip is roughly the $1$–$5\\,\mu\mathrm{s}$ measurement time plus this — still fast enough to apply teleportation-style Pauli corrections within the coherence window. On ion traps the round-trip is dominated by the much larger measurement latency, but the much longer coherence makes the *budget* in coherence-times still favorable.

These numbers were exotic in 2020 and widely supported by 2025 — "standard" would overstate uniformity across modalities and providers. For algorithms built on mid-circuit measurement, surface-code stabilizer readout, or measurement-based feedforward, they are among the most important metrics on the sheet. A vendor that does not publish feedforward latency has not thereby proven the capability absent — nondisclosure can mean product segmentation or immature documentation — but it does mean you must verify the capability directly before betting an architecture on it.

## 22.12 Calibration Stability and Drift

A metric measured on Monday morning is not necessarily the metric in effect on Friday afternoon. **Calibration stability** describes how device parameters (qubit frequency, gate-pulse amplitudes, readout discriminator thresholds) drift over time, and how often the device must be recalibrated to maintain the published numbers.

Recalibration cadence varies. Some devices run continuous low-overhead calibration in parallel with user circuits (Quantinuum's approach); others schedule explicit calibration windows every few hours (most superconducting vendors). One possible user-visible signature is a sawtooth — delivered fidelity sagging as drift accumulates, recovering after recalibration — but drift can also be abrupt, nonmonotonic, or hidden behind job scheduling, so treat the sawtooth as a hypothesis to check against time-binned data, not a law.

Vendors increasingly publish **time-binned** metrics: median fidelity over a 24-hour window, $95\%$-confidence band, fraction of qubits passing acceptance through the window. These are more honest than instantaneous numbers, especially for variational workloads that stretch across many calibration cycles.

A subtler stability metric is **parameter drift between training and inference** for any algorithm that uses precomputed pulse parameters or learned classical pre/post-processing. A model trained on Monday's calibration may not run as well on Friday's; this is a real problem for VQE-style workloads.

The honest mental model: treat every reported metric as conditional — on the device, the qubit subset, the protocol, the compiler, and the timestamp — rather than as a property of the machine. Some vendors publish medians or time-binned distributions (see above); others publish best-case records on freshly calibrated hardware; and a long-running job can see materially worse (or occasionally better) numbers than any single published snapshot. What to ask for is the sustained distribution, not the headline.

## 22.13 Benchmark Suites and the 2024–2026 Vendor Cohort

Several community-organized benchmark suites have emerged to give cross-vendor comparisons more rigorous footing.

**QED-C (Quantum Economic Development Consortium)** publishes an open suite of structured algorithmic benchmarks: Bernstein–Vazirani, Grover, QFT, Shor (small instances), VQE on small molecules, Hamiltonian simulation, amplitude estimation, MaxCut. Each benchmark is parameterized by problem size and reports its own result metric as size grows; summaries like "largest size passing a threshold" compress heterogeneous per-benchmark results into one scalar. A QED-C-derived suite underpins IonQ's AQ metric (§22.9), and the suite appears in some vendor documentation.

**BACQ** is a French/European application-oriented benchmarking initiative (Thales, CEA, and partners) defining application-level performance references designed to compare quantum hardware platforms across architectures, including emerging neutral-atom and photonic devices.

**Q-score (Atos)** is a measure of the largest MaxCut problem instance a device can solve above a fixed performance threshold on the specification's normalized score (commonly quoted as $0.2$; the symbol $\beta$ sometimes used for this score is unrelated to the QAOA variational angle of the same name). It is one of the few metrics specifically designed to track *useful* algorithmic capability rather than abstract circuit capacity.

**Mirror benchmarks** — run a circuit $U$, then a compiled inverse $U^{\dagger}$, often with randomizing Pauli layers in between — have a known ideal answer (return to the input; all zeros for a $|0\cdots 0\rangle$ start) and measure the noise accumulated over the round trip. They are cheap to verify and *can* expose coherent error patterns that randomized benchmarks average away — though an exact inverse can also cancel some coherent errors, which is why randomized mirror variants exist.

**The QV milestone record** — spanning IBM, Honeywell/Quantinuum, and others — runs: QV $32$ on IBM Falcon (announced January 2020), $64$ on Honeywell's System Model H0 later in 2020, $128$–$512$ across both vendors through 2021, $4096$ on Quantinuum H1-2 in 2022, $2^{19} = 524\\,288$ on Quantinuum H1-1 in 2023, $2^{21}$ at the H2 56-qubit launch in 2024, and $2^{25} = 33\\,554\\,432$ on H2 in 2025. The continuing progression tells a real story about fidelity on high-connectivity ion traps; the fact that most *other* vendors no longer report QV tells a different one — about verification cost and about which metric each architecture is best served by.

Per-vendor headline numbers in the 2024–2026 cohort (as of late 2025; subject to revision):

- **IBM Heron r2** — 156 physical qubits, heavy-hex coupling, $F_{2q} \approx 0.997$, $T_2^{\mathrm{echo}} \sim 250\\,\mu\mathrm{s}$, CLOPS $\sim 200\\,000$, sub-microsecond conditional-dispatch latency (the §22.11 feedforward-delay endpoint; IBM no longer reports QV).
- **Google Willow** — 105 physical qubits, square lattice, $F_{2q} \approx 0.9986$, supports surface-code distance-7 demonstration with below-threshold logical error.
- **Quantinuum H2** — 56 trapped-ion qubits, all-to-all via shuttling, $F_{2q} \approx 0.999$, $T_2^{\mathrm{echo}}$ measured in seconds, QV $= 2^{25}$ (as of late 2025), logical-qubit demonstrations with multi-second coherent operation reported (Appendix F records the code, qubit counts, and logical error rates). A successor generation (Helios) was announced for late 2025 with a larger qubit count — Appendix F tracks its delivered status and figures.
- **IonQ Forte / Forte Enterprise** — 36 qubits all-to-all, AQ $= 36$, $F_{2q} \approx 0.997$. Forte Enterprise is the data-center deployment variant (vendor designation).
- **IQM Crystal / Star** — superconducting product families spanning roughly 20–150 qubits across variants and roadmap items, with vendor-quoted two-qubit fidelities around $0.995$; deployed versus announced status varies by model (Appendix F).
- **QuEra Aquila** — neutral-atom analog mode, $256$ atoms with Rydberg interactions; the metric set is different (analog evolution time vs digital gate count), so direct comparison with gate-model devices is fraught.

Several caveats. These numbers are vendor-published; they reflect peak performance on a well-calibrated machine running a benchmark suite the vendor itself chose. Independent reproduction lags by months, and silent regressions happen between announcements. Treat the per-vendor numbers as *upper bounds on what is possible* rather than *what your job will see*.

## 22.14 How to Read a Benchmark Sheet — Bridge to Chapter 23

The metrics in this chapter were introduced one at a time, but they are read together. Here is a compressed reading guide for the next vendor sheet you encounter.

**First**, find the *physical qubit count* and *coupling graph*. These cap what is possible. Ignore "1000 qubits" if you cannot find a coupling diagram.

**Second**, find the *two-qubit gate fidelity* and the *worst-case readout error*. These dominate the error budget of almost every algorithm. There is no formula from median $F_{2q}$ to a pass/fail verdict — heavy-output success is a whole-circuit statistic — but the crude survival estimate $F_{2q}^{N_{2q}}$ over the circuit's $N_{2q}$ two-qubit gates (§22.3) flags a hopeless circuit before any suite metric can dress it up.

**Third**, compare your compiled circuit's *scheduled critical-path duration* against the coherence times. The ratio $T_2^{\mathrm{echo}} / t_{\mathrm{2q}}$ is only a crude ceiling on serial gate count — accumulated gate error usually bites first (§22.5) — so compile a representative instance, inspect its scheduled duration and idle exposure, and scale up progressively. If the representative instance already spends a coherence time gating or idling, look for a different architecture or a different algorithm.

**Fourth**, check whether your algorithm needs *mid-circuit measurement and feedforward*. If yes, the feedforward latency and reset fidelity are gating constraints. If the vendor does not publish them, do not infer the capability either way — ask directly, or probe with a small dynamic-circuit job.

**Fifth**, treat QV, CLOPS, AQ, XEB, and Q-score as *summary* numbers — useful for triage but not for go/no-go decisions. The per-gate metrics diagnose components, the system benchmarks integrate them, and a representative compiled instance of your own workload is what should decide.

**Sixth and last**, mistrust everything new. Vendor sheets are marketing artifacts wrapped around real measurements; the artifact-vs-measurement ratio is highest on the most-recent announcements. Wait for independent reproduction on a benchmark suite you understand before betting an architecture decision on a number.

The next chapter, Chapter 23, picks up from the hardware side and walks down the software stack: compilers, transpilers, pulse-level interfaces, and the question of how an algorithm written against an abstract gate set actually reaches the device whose metrics this chapter taught you to read.

**Sanity checks before moving on.**

1. A device advertises "1000 qubits, QV $= 64$, $F_{2q} = 0.99$." Estimate how many two-qubit gates the device can run before circuit fidelity drops below $1/e$, and explain why the QV number is essentially decoupled from the qubit-count headline.
2. Given $T_1 = 200\\,\mu\mathrm{s}$ and $T_2^{\ast} = 30\\,\mu\mathrm{s}$, what would you guess about the noise spectrum? What dynamical-decoupling protocol would you try first, and what is the largest $T_2$ you could plausibly extract from the same device?
3. Two devices both report $F_{\mathrm{avg}} = 0.999$ for their two-qubit gate, one via standard RB and one via interleaved RB on a specific CZ gate. Why are the two numbers not strictly comparable, and which would you trust more for predicting algorithmic performance?
4. A VQE workload runs $50$ circuits per iteration at $100$ shots each for $1000$ iterations, and each compiled circuit has $L$ layers. Using the idealized reading of CLOPS as executed layers per second, express the wall-clock time on a device with CLOPS $= 5000$ vs CLOPS $= 200\\,000$ (answer in terms of $L$), and name what the CLOPS timing boundary leaves out of the estimate. What further information would you need before judging whether the slower device's higher QV compensates?
5. A vendor sheet quotes mid-circuit measurement latency of $4\\,\mu\mathrm{s}$, feedforward delay of $500\\,\mathrm{ns}$, $T_2^{\mathrm{echo}} = 150\\,\mu\mathrm{s}$. Treating this as a *toy sequential feedback loop* — one measurement plus one conditioned correction per cycle — how many cycles fit inside one $T_2^{\mathrm{echo}}$ window? Then explain why the toy misrepresents a real surface-code cycle in both directions: the cycle also contains entangling gates and ancilla reset (more time), while corrections are usually tracked in the Pauli frame rather than applied physically and $T_2^{\mathrm{echo}}$ is not a hard deadline (less constraint).

---

[← Previous: Chapter 21](21-quantum-control-and-electronics.md) · [Table of Contents](../../README.md) · [Next: Chapter 23 →](23-quantum-programming-compilation-and-tooling.md)
