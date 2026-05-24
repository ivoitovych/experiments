# Chapter 29. Optimization, Finance, and Industrial Use Cases

[← Previous: Chapter 28](28-scientific-computing-and-physical-simulation.md) · [Table of Contents](../../README.md) · [Next: Chapter 30 →](30-quantum-machine-learning.md)

> **Status:** draft · **Phase:** 5 · **Sections drafted:** 6 / 6

Combinatorial optimisation, portfolio construction, derivative pricing, and industrial scheduling are the three application areas that have absorbed the largest share of corporate quantum-computing budgets between roughly 2017 and 2026. They are also the three areas where the gap between marketing material and demonstrated advantage is widest. This chapter walks through the quantum proposals — QAOA, quantum annealing, amplitude-estimation-based Monte Carlo, Grover-amplified search, QUBO embeddings of scheduling problems — and against each one, the corresponding classical state of the art that any near-term quantum approach has to beat. The honest summary, stated up front: as of 2026 there is no production deployment of a quantum optimiser, a quantum risk engine, or a quantum scheduler that has been shown to outperform a well-tuned classical baseline on a problem the customer actually cares about. The pilots are real, the tooling is real, the funded teams are real; the advantage is not.

> **How to read this chapter.** §29.1 sets up the combinatorial-optimisation landscape and the QUBO/Ising bridge that every later section reuses. §29.2 covers the variational route (QAOA) and §29.3 the annealing route (D-Wave); they are independent and either can be skimmed. §29.4 is the finance section — portfolio optimisation, Monte Carlo with QAE, option pricing — and is mostly self-contained for readers coming from the quant world. §29.5 covers industrial scheduling and logistics, and §29.6 is the level-headed assessment to read if you have time for only one section. The forbidden-on-this-chapter sentence is "this will deliver near-term quantum advantage"; we will instead state what is known, what is conjectured, and what remains open.

---

## 29.1 Combinatorial Optimisation and the QUBO Bridge

Combinatorial optimisation problems ask for the configuration of a discrete set of variables that minimises (or maximises) a cost function subject to constraints. The canonical hard cases are NP-hard: **Max-Cut** (partition the vertices of a graph to maximise the number of edges crossing the cut), **MaxSAT** (satisfy as many clauses of a Boolean formula as possible), the **travelling-salesman problem** (TSP, shortest Hamiltonian cycle), **vertex cover** (smallest vertex set touching every edge), **graph colouring**, **set cover**, and **bin packing**. These problems are not hard because they are large; they are hard because — modulo a polynomial-time collapse of NP — no algorithm escapes worst-case exponential scaling in the number of variables.

For practical purposes the relevant question is rarely "solve to optimum" but rather "find a solution within $\varepsilon$ of optimum in reasonable time". Classical approximation algorithms answer this very well for many problems. Goemans–Williamson achieves a $0.8786$ approximation ratio for Max-Cut via semidefinite programming, and (modulo the unique games conjecture) this is optimal in polynomial time. Branch-and-cut solvers for mixed-integer programs (Gurobi, CPLEX, the open-source HiGHS) routinely solve TSP instances with tens of thousands of cities. Local-search heuristics — simulated annealing, tabu search, large-neighbourhood search, the Lin–Kernighan family for TSP — find high-quality solutions on instances with millions of variables in seconds. **Any quantum proposal for combinatorial optimisation is competing against this baseline, not against brute-force enumeration.**

The bridge that connects most quantum approaches to combinatorial optimisation is the **quadratic unconstrained binary optimisation (QUBO)** formulation. A QUBO instance is

$$
\min_{x \in \\{0,1\\}^n} \; x^\top Q x \quad = \quad \min_{x} \; \sum_{i \le j} Q_{ij}\\, x_i x_j ,
$$

with $Q \in \mathbb{R}^{n\times n}$ upper triangular. Equivalently, via the substitution $s_i = 1 - 2 x_i \in \\{-1,+1\\}$, QUBO is an **Ising model**:

$$
\min_{s \in \\{-1,+1\\}^n} \; H_{\mathrm{Ising}}(s) \;=\; \sum_{i<j} J_{ij}\\, s_i s_j \;+\; \sum_i h_i\\, s_i .
$$

Encoding a problem as QUBO/Ising is the standard interface to both gate-model variational solvers (§29.2) and quantum annealers (§29.3).

**Constraints become penalty terms.** QUBO is *unconstrained* by definition; equality and inequality constraints have to be folded into the objective. For an equality $\sum_i a_i x_i = b$, add $\lambda (\sum_i a_i x_i - b)^2$ to the cost, where $\lambda$ is large enough that any feasible solution beats any infeasible one. For an inequality $\sum_i a_i x_i \le b$, introduce non-negative integer slack variables $y \in \\{0, 1, \ldots, b\\}$ (themselves binary-encoded with $\lceil \log_2(b+1) \rceil$ qubits) and add $\lambda(\sum_i a_i x_i + y - b)^2$. **One-hot** constraints — exactly one of $x_{i,1}, \ldots, x_{i,K}$ is $1$ — are written $\lambda (\sum_k x_{i,k} - 1)^2$. The price of penalty encoding is that $\lambda$ must be chosen large (and often empirically tuned), which inflates the energy gap structure of the problem and makes both QAOA and annealing harder. This penalty inflation is one of the underappreciated reasons that small constrained problems can be more difficult on quantum hardware than the same problem on a classical mixed-integer solver, which handles constraints natively.

**Worked example — Max-Cut as Ising.** For a graph $G = (V, E)$, assign $s_i \in \\{-1, +1\\}$ to each vertex (label of the partition). An edge $(i, j)$ is cut iff $s_i \ne s_j$, i.e., $s_i s_j = -1$. The number of cut edges is $\sum_{(i,j) \in E} (1 - s_i s_j)/2$, so maximising the cut is equivalent to minimising

$$
H_{\mathrm{MaxCut}} \;=\; \sum_{(i,j) \in E} s_i s_j .
$$

This is the cleanest possible Ising instance: all $h_i = 0$, all $J_{ij} \in \\{0, 1\\}$, and the problem structure inherits directly from the graph. Most QAOA papers benchmark on Max-Cut for exactly this reason — it is the path of least encoding pain. **Realistic industrial problems are not this clean.** A vehicle-routing instance turns into a QUBO with tens of thousands of variables, dense penalty terms, and a coupling graph that bears no resemblance to a hardware connectivity graph.

**The size disconnect.** A 2026-era gate-model device offers roughly $10^2$ logical-quality qubits (more raw qubits, but with depths limited by decoherence). A 2026-era D-Wave Advantage2 system offers about $7{,}000$ qubits but with restricted connectivity (Pegasus topology, degree 15). Real industrial QUBOs that practitioners want to solve are routinely $10^4$ to $10^7$ variables. The mismatch is structural, not just a matter of waiting for more qubits.

## 29.2 QAOA and the Variational Route

The Quantum Approximate Optimization Algorithm was introduced in §15.9. The mechanics: given a cost Hamiltonian $H_C$ diagonal in the computational basis (encoding the QUBO via $H_C = \sum_{i,j} Q_{ij} \frac{(1-Z_i)(1-Z_j)}{4}$ or equivalently the Ising form $H_C = \sum_{i<j} J_{ij} Z_i Z_j + \sum_i h_i Z_i$) and a mixer $H_M = \sum_i X_i$, the depth-$p$ QAOA state is

$$
|\vec\gamma, \vec\beta\rangle \;=\; e^{-i\beta_p H_M} e^{-i\gamma_p H_C} \cdots e^{-i\beta_1 H_M} e^{-i\gamma_1 H_C}\\, |+\rangle^{\otimes n} ,
$$

and the parameters $(\vec\gamma, \vec\beta)$ are optimised classically to minimise $\langle \vec\gamma, \vec\beta | H_C | \vec\gamma, \vec\beta \rangle$. At $p \to \infty$, QAOA reduces to a Trotterised adiabatic sweep and provably finds the ground state of $H_C$ in the limit (with parameter schedules close to the adiabatic schedule). At finite $p$ the question is whether the achievable approximation ratio is competitive with the best classical algorithm at any comparable cost.

**Theoretical benchmarks.** Farhi–Goldstone–Gutmann's original 2014 paper proved that $p=1$ QAOA on Max-Cut on 3-regular graphs achieves approximation ratio $0.6924$. This beats the random-assignment baseline of $0.5$ but is well below the Goemans–Williamson bound of $0.8786$. Subsequent analytic work pushed $p=2$ on 3-regular graphs to $0.7559$ and characterised the asymptotic ratio as $p$ grows. **No proof exists that QAOA at any finite $p$ beats Goemans–Williamson on any natural Max-Cut family.** What is known is that QAOA's approximation ratio approaches $1$ as $p \to \infty$, but so does any sufficiently long classical local search.

**Empirical performance, sober reading.** Between 2018 and 2025 a sequence of careful benchmarks (the IBM and Google teams, Caltech's Preskill group, academic groups in Europe and Japan) compared QAOA at modest $p$ against classical heuristics on Max-Cut, MaxSAT, and related QUBOs. The headline findings, in compressed form: (i) on small instances ($n \lesssim 30$) where the optimum is known, QAOA reaches reasonable approximation ratios but at $p$ values that require deep circuits; (ii) on instances large enough that the optimum is not known, **simulated annealing and tabu search find better solutions in less wall-clock time** than QAOA on current hardware; (iii) parameter optimisation becomes a bottleneck — concentration results show optimal parameters often transfer across instances, but the optimisation landscape exhibits multiple local minima and barren-plateau regions for random initialisation at moderate $p$.

**The barren-plateau caveat.** A general result (McClean et al., 2018) shows that for random parameter initialisations of a wide variational ansatz, gradients vanish exponentially in the number of qubits. QAOA is somewhat protected from the worst form of this because its ansatz is *structured* (alternating $H_C$ and $H_M$ unitaries, not random rotations), and the parameters $\gamma$ and $\beta$ live in a low-dimensional space. But at large $p$ and on dense cost Hamiltonians the practical optimisation does become flat in the bulk of parameter space, and gradient-based optimisers stall. Standard workarounds — warm-starting from classical solutions, parameter transfer from smaller instances, layer-by-layer training — work in practice but erode the "no good initial guess required" appeal of the variational paradigm.

**Variants worth knowing about.** The literature contains many: **QAOA+** (additional single-qubit layer), **multi-angle QAOA** (different $\gamma$ per term rather than one $\gamma$ per layer), **warm-start QAOA** (initial state from a classical relaxation rather than $|+\rangle^{\otimes n}$), **recursive QAOA** (RQAOA, which iteratively fixes the most-correlated pair of variables and recurses), and **adaptive QAOA / ADAPT-QAOA** (mixer chosen iteratively). RQAOA is interesting because Bravyi, Kliesch, Koenig, and Tang (2020) proved it provably beats $p=1$ QAOA on certain instance families; it is also the variant that is genuinely competitive with classical heuristics on small-to-medium instances, while being closer in spirit to a classical decimation algorithm than to "running a quantum optimiser."

**What QAOA actually buys you on 2026 hardware.** On a 50-qubit, depth-100-capable device with realistic error rates ($\sim 10^{-3}$ two-qubit gate error), QAOA at $p=3$ on Max-Cut on a 50-vertex 3-regular graph is at the edge of what runs without the noise washing out the signal. The result is interesting as a benchmark of the hardware but does not beat what a laptop running tabu search produces in milliseconds. The practitioner reading should treat QAOA as a *circuit-quality benchmark* and as a *research subject*, not as an optimisation tool in production.

## 29.3 Quantum Annealing and the Adiabatic Route

Quantum annealing is the second route to optimisation. The premise: prepare the ground state of a simple driver Hamiltonian, slowly interpolate to a target Hamiltonian whose ground state encodes the QUBO solution, and read out the final state. The interpolation is

$$
H(t) \;=\; A(t)\\, H_D \;+\; B(t)\\, H_P, \qquad t \in [0, T] ,
$$

with $H_D = -\sum_i X_i$ the transverse-field driver, $H_P = \sum_{i<j} J_{ij} Z_i Z_j + \sum_i h_i Z_i$ the problem Hamiltonian, $A(0) = 1, B(0) = 0$, and $A(T) = 0, B(T) = 1$. The **adiabatic theorem** guarantees that if $T$ is large compared to $1 / \Delta_{\min}^2$, where $\Delta_{\min}$ is the minimum spectral gap along the path, the system tracks the instantaneous ground state and ends in the ground state of $H_P$.

**The gap is the whole story.** For NP-hard instances, the minimum gap is generally exponentially small in $n$ near a first-order phase transition along the interpolation. So adiabatic quantum optimisation is *not* a polynomial-time algorithm for NP-hard problems in the worst case — this would imply ${\rm NP} \subseteq {\rm BQP}$, which is not believed. The empirical question is whether on *typical* industrial instances the gap is large enough that annealing finds high-quality solutions in reasonable time.

**D-Wave hardware.** D-Wave Systems has built quantum annealers since 2011. Successive generations have moved through three connectivity topologies: **Chimera** (D-Wave 2X and earlier, 2048 qubits, degree-6 connectivity in $K_{4,4}$ unit cells), **Pegasus** (Advantage, 5000+ qubits, degree-15), and **Zephyr** (Advantage2 prototype, degree-20). Higher connectivity reduces the **minor-embedding overhead** — the number of physical qubits needed to represent one logical variable as a connected chain — which is the dominant cost when a logical QUBO has many couplings relative to what hardware natively supports.

**Minor embedding and chain breaks.** Most industrial QUBOs are densely coupled (every variable interacts with many others) while hardware connectivity is sparse. The solution is to represent each logical variable as a *chain* of physical qubits with strong ferromagnetic coupling, so all qubits in the chain agree in the ground state. Embedding a fully-connected $K_N$ requires $O(N^2)$ physical qubits on Chimera, $O(N \log N)$ on Pegasus. **Chain breaks** — when post-readout the qubits in a chain disagree — are the dominant failure mode and force one of several recovery strategies (majority vote, energy-based re-evaluation, discarding the sample). The chain-coupling strength is a tuning parameter without a principled setting; it is a per-problem empirical choice.

**Performance against simulated annealing.** This is the question that has consumed the field for fifteen years. The current consensus, after several rounds of careful benchmarking by Troyer, Katzgraber, and others: on random spin-glass instances (the natural testbed), D-Wave annealers do *not* show a scaling advantage over well-implemented classical simulated annealing or its descendants (parallel tempering, isoenergetic cluster moves). For some specially-structured instances — notably the **3D Ising spin glasses with planted solutions** in the 2018 King et al. study and certain **frustrated cluster loop** problems — D-Wave shows a constant-factor speedup, sometimes large, but not a different scaling exponent. On most industrial instances after the minor-embedding overhead is paid, the wall-clock comparison favours classical heuristics.

**Quantum-inspired classical algorithms.** This is the area's most interesting twist. Several classical algorithms designed by analogy with quantum dynamics now outperform the quantum annealers they were meant to compete with:

- **Simulated bifurcation** (Toshiba, 2019; Goto, Tatsumura, Dixon). Classical algorithm derived from the dynamics of a network of nonlinear oscillators undergoing bifurcation. Implemented on FPGA and GPU, it solves QUBOs with $10^5$ variables in milliseconds and is the current speed-record holder on many industrial QUBO benchmarks.
- **Coherent Ising machines (CIMs).** Optical hardware (degenerate optical parametric oscillators in a fibre loop) that is genuinely a different physical platform but is fundamentally classical (the operating regime is far from the quantum-coherent limit). Stanford and NTT's experimental CIMs match or beat D-Wave on benchmark problems at the same instance sizes.
- **Tensor-network Ising solvers.** Use matrix-product-state contraction to find ground states of Ising models with bounded entanglement. Effective when the problem has low tree-width or otherwise admits a sparse tensor-network representation.
- **GPU simulated annealing.** A modern multi-flip simulated-annealing implementation on a single high-end GPU rivals what D-Wave delivers on most industrial QUBOs.

The takeaway: the *idea* of analog Ising minimisation is valuable; the *quantum-coherent* implementation has not yet shown a scaling advantage over the best classical implementations of the same idea.

## 29.4 Finance: Portfolio Optimisation, Monte Carlo, and Derivative Pricing

Finance is the application area with the most institutional investment in quantum computing — major banks (Goldman Sachs, JPMorgan, HSBC, BBVA, Mizuho) have dedicated quantum-computing teams that have been running for five-plus years. The three workloads of interest are portfolio optimisation, risk analysis via Monte Carlo, and derivative pricing.

**Portfolio optimisation (Markowitz).** Given expected returns $\mu \in \mathbb{R}^N$ and a covariance matrix $\Sigma \in \mathbb{R}^{N \times N}$ for $N$ assets, the mean-variance problem is

$$
\min_{w \in \mathbb{R}^N} \; w^\top \Sigma w \;-\; q\\, \mu^\top w \quad \text{s.t.} \quad \sum_i w_i = 1, \; w_i \ge 0 ,
$$

where $q > 0$ is the risk-aversion parameter. In its continuous form this is a quadratic program with a single linear equality and box constraints, solved trivially by classical convex optimisers in microseconds for $N$ up to $10^4$. The version that maps to quantum optimisers is the **discrete Markowitz** problem: each asset is held in integer units (or selected as part of a fixed-cardinality portfolio), which makes the problem NP-hard and amenable to QUBO encoding. A typical encoding: binary variable $x_i$ for "asset $i$ included", cardinality constraint $\sum_i x_i = K$ enforced as a penalty, objective $\sum_{i,j} \Sigma_{ij} x_i x_j - q \sum_i \mu_i x_i$.

The cardinality-constrained Markowitz problem has been benchmarked extensively on D-Wave, QAOA, and quantum-inspired classical solvers. Current state: for $N \lesssim 10^3$ assets, classical mixed-integer quadratic-programming solvers (Gurobi, MOSEK) find the optimum in seconds. For larger $N$, classical heuristics (genetic algorithms, tabu search) find high-quality solutions quickly. **No published demonstration shows a quantum approach finding better portfolios in less wall-clock time.** The published case studies (Goldman Sachs' transaction-settlement work; BBVA's portfolio rebalancing; Mizuho's foreign-exchange optimisation) are *engineering demonstrations* of the toolchain, not advantage results.

**Risk analysis via amplitude estimation.** Monte Carlo simulation is ubiquitous in risk computation — Value-at-Risk (VaR), Conditional VaR, credit-loss distributions, counterparty-risk metrics — and the classical convergence rate is $O(1/\sqrt{M})$ in the number of samples $M$. **Quantum amplitude estimation (QAE)** provides a quadratic speedup: estimating an expectation $\mathbb{E}[f(X)]$ to precision $\varepsilon$ takes $O(1/\varepsilon)$ queries to the QAE oracle, versus $O(1/\varepsilon^2)$ classical samples. The full algorithm is built on quantum phase estimation applied to an amplitude-amplification operator; see §14.6 for the phase-estimation primitive and §14.8 for amplitude estimation.

Concretely, the workload looks like this. Suppose you have a model that produces $X$ given some inputs (a credit-portfolio loss model, an option payoff at maturity). You build a quantum circuit that prepares $|0\rangle \mapsto \sum_x \sqrt{p(x)}\\, |x\rangle |f(x)\rangle$, where $f(x)$ is encoded as a rotation angle on an ancilla. Then QAE estimates the amplitude of the ancilla being in $|1\rangle$, which equals $\mathbb{E}[f(X)]$. The quadratic speedup is real and proven; the practical question is the resource cost.

**Why QAE is hard in practice.** The amplitude-estimation oracle has to be built. For a derivative payoff with realistic complexity — a path-dependent option requiring several time steps, each with a stochastic-volatility or jump-diffusion update — encoding the payoff coherently requires arithmetic on quantum registers (multiplications, square roots, exponentials via Taylor expansion). The 2019 Stamatopoulos–Egger–Sun–Zoufal–Iten–Shen–Woerner paper that established the QAE-for-options framework gives circuit-resource estimates: pricing a European call to $10^{-3}$ precision on a basket of underlyings requires of order $10^7$ T-gates. **This is well into the fault-tolerant regime.** Practically, current near-term implementations use 5–10 qubits and demonstrate that QAE *works*, not that it *wins*.

The other open practical problem is **state preparation**: the QAE speedup assumes the input distribution $p(x)$ can be loaded efficiently. For a normal distribution this is solved (Grover–Rudolph, sometimes with additional tricks); for a calibrated market-implied distribution, loading the state is itself an exponential operation unless the distribution has special structure or a QRAM-style oracle is assumed. **Most "quantum option pricing" papers quietly assume QRAM-style state preparation in their resource estimates**, which is the same assumption that powered the now-dequantised quantum-ML speedups (§15.5).

**Quantum advantage in finance: open.** The honest summary as of 2026: QAE is the strongest theoretical primitive for finance, and there is a real quadratic speedup in the sample-complexity asymptote. Whether the quadratic speedup translates to wall-clock advantage depends on (i) how cheap fault-tolerant T-gates become, (ii) whether the state-preparation problem admits a practical solution for the relevant distributions, and (iii) whether the precision regime that matters is high enough that quadratic-in-precision is the dominant cost. Reasonable analyses put the crossover for option pricing at $\varepsilon \sim 10^{-4}$ or finer, which is finer than most pricing applications actually need. Risk analysis often needs lower precision but on higher-dimensional distributions, which moves the calculation but does not obviously favour QAE either.

## 29.5 Industrial Scheduling, Logistics, and Constraint Satisfaction

The third high-investment application bucket is industrial: vehicle routing, job-shop scheduling, supply-chain optimisation, network design. The pattern is the same: a well-known NP-hard problem is formulated as a QUBO and dispatched to a quantum annealer, QAOA on a small gate-model device, or (most often) a quantum-inspired classical solver.

**Vehicle routing.** Generalises TSP. Given a depot and customers with demands, find vehicle routes that satisfy all demand while minimising distance. QUBO encoding uses binary variables $x_{i,j,t}$ for "vehicle $i$ visits customer $j$ at time $t$" with one-hot constraints on $(i, t)$ and $j$. The variable count is $O(V \cdot C \cdot T)$ for $V$ vehicles, $C$ customers, $T$ time steps, which for realistic logistics scenarios ($V \sim 10$, $C \sim 100$, $T \sim 100$) is $10^5$ binary variables — at the edge of what current D-Wave hardware can ingest after minor embedding, and well beyond what gate-model QAOA can handle.

**Job-shop scheduling.** Given $J$ jobs each consisting of an ordered sequence of operations on $M$ machines, find a schedule minimising makespan. QUBO encoding uses binary variables for the start time of each operation (binary-encoded), plus penalty terms for machine-conflict constraints and precedence constraints. Variable count is $O(J \cdot O \cdot \log T_{\max})$ where $O$ is operations per job.

**The Volkswagen pilots.** Volkswagen ran a series of well-publicised demonstrations between 2017 and 2020: routing taxis in Beijing and Lisbon using D-Wave, optimising paint-shop sequencing in Wolfsburg, traffic-flow simulation in Barcelona. The Beijing taxi demonstration involved a few thousand vehicles. The valuable part of these pilots was building the QUBO encoding pipeline; the actual routing decisions were not deployed in production, and where compared against classical baselines, the classical baselines won on either solution quality or wall-clock time. Subsequent Volkswagen statements have moved away from claims of quantum advantage and toward describing the work as "exploratory" and "tool-building."

**The BMW and Daimler vehicle-design pilots.** Similar pattern: BMW partnered with Honeywell/Quantinuum and AWS Braket on vehicle-configuration optimisation (which options to bundle), Daimler with IBM on materials-discovery problems closer to Chapter 28's chemistry workloads. The materials work is more promising than the optimisation work because the underlying scaling argument is stronger; the optimisation work has not produced advantage results.

**Why scheduling is harder for quantum than the literature suggests.** Industrial scheduling problems have rich structure — precedence relations, time-window constraints, resource bounds, setup-time-dependent transitions, multi-objective criteria — that classical mixed-integer solvers exploit aggressively (cutting planes, branch-and-cut, constraint propagation, decomposition methods). The QUBO encoding *flattens* this structure into a uniform quadratic penalty soup, losing exactly the information the classical solver uses. A classical solver running on the structured form is competing against a quantum solver running on a structureless form of the same problem. **The structure transfer is the bottleneck, not the qubit count.**

**Constraint encoding hygiene.** When working in QUBO form, three rules of thumb prevent the most common encoding pathologies.

1. *Bound the penalty coefficient.* For an equality constraint, $\lambda$ should exceed the maximum gain achievable by violating it. Too small and the penalty is ignored; too large and it dwarfs the objective and the optimiser sees only the penalty landscape. Estimate $\lambda$ from the problem structure rather than guessing.
2. *Prefer one-hot to binary encoding for small categorical variables.* Binary encoding $K$ values in $\lceil \log_2 K \rceil$ qubits sounds efficient but produces dense quadratic interactions between the encoding bits, which are hard to embed and hard for QAOA to optimise. One-hot uses $K$ qubits but with simple constraints.
3. *Eliminate trivial slack variables.* Inequality $\sum_i a_i x_i \le b$ with $a_i \in \\{0, 1\\}$ and $b$ close to $\sum_i a_i$ can sometimes be expressed without slack. Slack inflation is a major source of variable-count blow-up.

## 29.6 Realistic Assessment of Near-Term Value

The level-headed summary of the chapter.

**Combinatorial optimisation.** No known quantum algorithm has a proven exponential or superpolynomial speedup over the best classical algorithm for an NP-hard problem. **Grover-based optimisation** offers a quadratic speedup over brute-force search, but brute-force search is rarely the best classical baseline; for most natural problems, structured classical algorithms beat unstructured Grover-amplified search by a wide margin. QAOA at small $p$ does not beat the best classical approximation algorithms on the families where comparison is possible. Quantum annealing has not shown scaling advantage against the best classical solvers, including quantum-inspired classical solvers that capture the analog-Ising spirit on conventional hardware.

**Finance.** Quantum amplitude estimation provides a real quadratic speedup over classical Monte Carlo in the asymptotic sample complexity. Whether this translates to wall-clock advantage depends on fault-tolerant gate costs and the resolution of the state-preparation problem. Current consensus: **no demonstrated advantage**, and the application areas where QAE seems most promising (high-precision risk analysis, multi-asset option pricing with calibrated input distributions) require fault-tolerant resources well beyond what 2026 hardware delivers. The QAE-style speedup applied to portfolio optimisation does not survive because portfolio optimisation is dominated by classical convex/MIQP solvers anyway.

**Industrial scheduling.** The structural mismatch between QUBO and the rich constraint forms of real scheduling problems is a major obstacle. Industry pilots have value as toolchain investments and as benchmarks of what quantum-software stacks look like at scale, but they have not produced production deployments with proven advantage.

**The defensible posture for an experienced developer in 2026.** Build literacy with QAOA, annealing, and QAE — the mechanics are educational and the abstractions transfer to other applications. Treat the public pilots from Volkswagen, Goldman Sachs, BMW, Daimler, JPMorgan, and others as **case studies of how the tooling integrates with real production data**, not as evidence of quantum advantage. If your role involves recommending optimiser choices, the answer for the next several years is still: a well-tuned classical solver, possibly one of the quantum-inspired ones (simulated bifurcation, parallel tempering on GPU), with the option of running a small-scale quantum experiment in parallel for institutional learning rather than for production decision-making.

The applications most likely to *first* show quantum advantage are those of Chapter 28 — chemistry, materials, lattice gauge theory — where the underlying problem is *itself* quantum and where classical exponential-resource costs are the rule rather than the exception. The applications of this chapter are classical problems looking for a quantum solver, and the gap between proposed and demonstrated has been wider than the field expected ten years ago.

---

Chapter 30 turns to **quantum machine learning**, the application area with the most spectacular dequantisation history and the largest gap between published expectations and demonstrated performance. The HHL-derivative speedups for linear regression, kernel methods, recommendation systems, and PCA have all been classically dequantised under realistic data-access assumptions. What survives is a narrower set of proposals — variational quantum classifiers, kernel methods on quantum-native data, quantum Boltzmann machines, quantum generative models — that the next chapter examines with the same level-headed lens applied here.

## Sanity Checks

1. **QUBO conversion.** Convert the Max-Cut objective for the triangle graph $K_3$ (three vertices, three edges) to an Ising Hamiltonian, write out the matrix in the $\\{-1, +1\\}^3$ basis, and identify the ground state(s) and the ground-state energy.

2. **Penalty coefficient.** A binary-decision problem has objective $\min \sum_i c_i x_i$ with $c_i \in [-10, 10]$ and a constraint $\sum_i x_i = K$. Show that the penalty coefficient $\lambda$ must satisfy $\lambda > 10$ (or, more carefully, $\lambda$ must exceed the maximum per-variable cost magnitude) for any feasible solution to beat any infeasible one. Why is "set $\lambda$ very large" a bad strategy on real hardware?

3. **QAOA on a single edge.** Compute the optimal $(\gamma, \beta)$ for $p = 1$ QAOA on the two-vertex Max-Cut (one edge between two vertices). Verify that the resulting state is a uniform superposition over the two cut configurations $|01\rangle$ and $|10\rangle$, i.e., the exact ground state.

4. **QAE precision regime.** For amplitude estimation of an expectation to precision $\varepsilon = 10^{-3}$, the QAE algorithm uses $O(1/\varepsilon) = 10^3$ oracle calls, where each oracle call is one application of the controlled-amplitude-amplification operator. A classical Monte Carlo for the same precision uses $O(1/\varepsilon^2) = 10^6$ samples. If each quantum oracle call costs $C_Q$ wall-clock time and each classical sample costs $C_C$, what is the crossover ratio $C_Q / C_C$ below which the quantum approach wins?

5. **Minor-embedding cost.** A fully-connected logical QUBO on $N = 20$ variables is embedded onto D-Wave Advantage (Pegasus topology, degree-15). The standard embedding uses a chain length proportional to $N$, so the physical qubit count is approximately $N^2 / 15 \approx 27$ qubits — but the actual published embedding numbers for $K_{20}$ on Pegasus are larger (closer to 50). Why does the simple formula underestimate, and which structural property of Pegasus determines the actual chain length?

---

[← Previous: Chapter 28](28-scientific-computing-and-physical-simulation.md) · [Table of Contents](../../README.md) · [Next: Chapter 30 →](30-quantum-machine-learning.md)
