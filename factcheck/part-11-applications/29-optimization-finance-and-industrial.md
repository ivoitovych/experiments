# Factcheck — §29 Optimization, Finance, and Industrial

Mirrors `book/part-11-applications/29-optimization-finance-and-industrial.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §29.1 — Goemans–Williamson 0.8786 approximation ratio for Max-Cut

- **Claim** (anchor): "Goemans–Williamson achieves a $0.8786$ approximation ratio for Max-Cut via semidefinite programming"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Classic approximation-algorithms result. The parenthetical "modulo the unique games conjecture" claims this ratio is optimal in polynomial time.

## §29.1 — Goemans–Williamson optimality under unique games conjecture

- **Claim** (anchor): "modulo the unique games conjecture) this is optimal in polynomial time"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Conditional claim: optimal polynomial-time approximation for Max-Cut assuming the Unique Games Conjecture holds.

## §29.1 — Branch-and-cut solvers for TSP: tens of thousands of cities

- **Claim** (anchor): "Branch-and-cut solvers for mixed-integer programs (Gurobi, CPLEX, the open-source HiGHS) routinely solve TSP instances with tens of thousands of cities"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical capability claim about classical MIP solvers for TSP.

## §29.1 — D-Wave Advantage2: ~7,000 qubits, Pegasus topology, degree 15

- **Claim** (anchor): "a 2026-era D-Wave Advantage2 system offers about $7{,}000$ qubits but with restricted connectivity (Pegasus topology, degree 15)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware specification claim for the D-Wave Advantage2 system as of 2026.

## §29.1 — Gate-model device: ~100 logical-quality qubits in 2026

- **Claim** (anchor): "A 2026-era gate-model device offers roughly $10^2$ logical-quality qubits (more raw qubits, but with depths limited by decoherence)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Contemporary hardware state-of-the-art claim; "logical-quality" qubits distinguishes from raw physical qubit count.

## §29.1 — Industrial QUBO sizes: 10^4 to 10^7 variables

- **Claim** (anchor): "Real industrial QUBOs that practitioners want to solve are routinely $10^4$ to $10^7$ variables"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical scale claim about real-world industrial optimization instances.

## §29.2 — QAOA introduced in §15.9; provably reaches ground state as p → ∞

- **Claim** (anchor): "At $p \to \infty$, QAOA reduces to a Trotterized adiabatic sweep and provably finds the ground state of $H_C$ in the limit (with parameter schedules close to the adiabatic schedule)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Theoretical limit result for QAOA connecting it to adiabatic quantum computation.

## §29.2 — Farhi–Goldstone–Gutmann 2014: p=1 QAOA ratio 0.6924 on 3-regular Max-Cut

- **Claim** (anchor): "Farhi–Goldstone–Gutmann's original 2014 paper proved that $p=1$ QAOA on Max-Cut on 3-regular graphs achieves approximation ratio $0.6924$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Foundational QAOA result with specific ratio for p=1 on 3-regular Max-Cut.

## §29.2 — p=2 QAOA on 3-regular Max-Cut: ratio 0.7559

- **Claim** (anchor): "Subsequent analytic work pushed $p=2$ on 3-regular graphs to $0.7559$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific approximation ratio for p=2 QAOA on 3-regular Max-Cut graphs.

## §29.2 — No proof that finite-p QAOA beats Goemans–Williamson

- **Claim** (anchor): "No proof exists that QAOA at any finite $p$ beats Goemans–Williamson on any natural Max-Cut family"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Open-problem status claim regarding QAOA vs. best classical approximation algorithms.

## §29.2 — Empirical benchmarks 2018–2025: classical heuristics beat QAOA on large instances

- **Claim** (anchor): "simulated annealing and tabu search find better solutions in less wall-clock time than QAOA on current hardware"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Compressed summary of a sequence of benchmarks (IBM, Google, Caltech Preskill group, European/Japanese groups) from 2018–2025.

## §29.2 — McClean et al. 2018: barren plateaus — gradients vanish exponentially for wide variational ansätze

- **Claim** (anchor): "A general result (McClean et al., 2018) shows that for random parameter initializations of a wide variational ansatz, gradients vanish exponentially in the number of qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Foundational barren-plateau result; the text notes QAOA is somewhat protected due to structured ansatz.

## §29.2 — Bravyi–Kliesch–Koenig–Tang 2020: RQAOA provably beats p=1 QAOA on certain families

- **Claim** (anchor): "Bravyi, Kliesch, Koenig, and Tang (2020) proved it provably beats $p=1$ QAOA on certain instance families"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed result for Recursive QAOA (RQAOA); claim covers specific, not all, instance families.

## §29.2 — QAOA at p=3 on 50-qubit device at edge of viability given ~10^-3 two-qubit gate error

- **Claim** (anchor): "On a 50-qubit, depth-100-capable device with realistic error rates ($\\sim 10^{-3}$ two-qubit gate error), QAOA at $p=3$ on Max-Cut on a 50-vertex 3-regular graph is at the edge of what runs without the noise washing out the signal"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Concrete hardware-performance claim about near-term QAOA viability; error rate figure is a stated typical value.

## §29.3 — D-Wave building annealers since 2011

- **Claim** (anchor): "D-Wave Systems has built quantum annealers since 2011"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Historical date claim about D-Wave's commercial annealer program.

## §29.3 — D-Wave topology evolution: Chimera → Pegasus → Zephyr

- **Claim** (anchor): "Successive generations have moved through three connectivity topologies: Chimera (D-Wave 2X and earlier, 2048 qubits, degree-6 connectivity in $K_{4,4}$ unit cells), Pegasus (Advantage, 5000+ qubits, degree-15), and Zephyr (Advantage2 prototype, degree-20)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware genealogy claim with specific qubit counts and connectivity degrees per generation.

## §29.3 — Minor embedding cost: K_N requires O(N^2) qubits on Chimera, O(N log N) on Pegasus

- **Claim** (anchor): "Embedding a fully-connected $K_N$ requires $O(N^2)$ physical qubits on Chimera, $O(N \\log N)$ on Pegasus"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Scaling claim for minor embedding overhead on two D-Wave topologies.

## §29.3 — Consensus: D-Wave shows no scaling advantage over classical SA on random spin-glass instances

- **Claim** (anchor): "on random spin-glass instances (the natural testbed), D-Wave annealers do not show a scaling advantage over well-implemented classical simulated annealing or its descendants (parallel tempering, isoenergetic cluster moves)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to consensus after "several rounds of careful benchmarking by Troyer, Katzgraber, and others."

## §29.3 — King et al. 2018: D-Wave constant-factor speedup on 3D Ising spin glasses with planted solutions

- **Claim** (anchor): "the 2018 King et al. study and certain frustrated cluster loop problems — D-Wave shows a constant-factor speedup, sometimes large, but not a different scaling exponent"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific 2018 study showing constant-factor (not scaling) speedup for specially-structured instances.

## §29.3 — Simulated bifurcation (Toshiba, 2019): solves 10^5-variable QUBOs in milliseconds on FPGA/GPU

- **Claim** (anchor): "Simulated bifurcation (Toshiba, 2019; Goto, Tatsumura, Dixon). Classical algorithm derived from the dynamics of a network of nonlinear oscillators undergoing bifurcation. Implemented on FPGA and GPU, it solves QUBOs with $10^5$ variables in milliseconds and is the current speed-record holder on many industrial QUBO benchmarks"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to Goto, Tatsumura, Dixon (Toshiba), 2019. Specific performance claim: 10^5-variable QUBOs in milliseconds.

## §29.3 — Coherent Ising machines: Stanford and NTT match or beat D-Wave on benchmark problems

- **Claim** (anchor): "Stanford and NTT's experimental CIMs match or beat D-Wave on benchmark problems at the same instance sizes"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Comparative performance claim for optical CIM hardware vs. D-Wave; the text also notes CIMs operate in a classically coherent regime.

## §29.4 — Finance: major banks with quantum teams for 5+ years as of 2026

- **Claim** (anchor): "major banks (Goldman Sachs, JPMorgan, HSBC, BBVA, Mizuho) have dedicated quantum-computing teams that have been running for five-plus years"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Institutional-investment claim listing specific named banks.

## §29.4 — Classical convex optimizers solve continuous Markowitz for N up to 10^4 in microseconds

- **Claim** (anchor): "In its continuous form this is a quadratic program with a single linear equality and box constraints, solved trivially by classical convex optimizers in microseconds for $N$ up to $10^4$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Performance claim for classical QP solvers on continuous Markowitz; the discrete (integer) variant is what maps to QUBO.

## §29.4 — No quantum approach beats classical MIQP solvers for portfolio optimization

- **Claim** (anchor): "No published demonstration shows a quantum approach finding better portfolios in less wall-clock time"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: State-of-the-art claim as of writing; the named pilots (Goldman Sachs, BBVA, Mizuho) are characterized as engineering demonstrations only.

## §29.4 — Classical Monte Carlo convergence: O(1/sqrt(M)) in number of samples

- **Claim** (anchor): "the classical convergence rate is $O(1/\\sqrt{M})$ in the number of samples $M$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard statistical result for Monte Carlo estimators; used as the classical baseline for QAE comparison.

## §29.4 — QAE quadratic speedup: O(1/ε) queries vs. O(1/ε^2) classical samples

- **Claim** (anchor): "Quantum amplitude estimation (QAE) provides a quadratic speedup"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: O(1/ε) queries vs O(1/ε^2) classical samples — proven quadratic speedup for QAE over classical Monte Carlo. The text notes this is real and proven but questions practical realization.

## §29.4 — Stamatopoulos et al. 2019: European call pricing to 10^-3 precision requires ~10^7 T-gates

- **Claim** (anchor): "The 2019 Stamatopoulos–Egger–Sun–Zoufal–Iten–Shen–Woerner paper that established the QAE-for-options framework gives circuit-resource estimates: pricing a European call to $10^{-3}$ precision on a basket of underlyings requires of order $10^7$ T-gates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific resource estimate from a named 2019 paper; "well into the fault-tolerant regime" conclusion follows from this figure.

## §29.4 — QAE option pricing papers assume QRAM-style state preparation

- **Claim** (anchor): "Most 'quantum option pricing' papers quietly assume QRAM-style state preparation in their resource estimates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Critical methodological claim about the literature; analogous to the assumption behind dequantized quantum-ML speedups.

## §29.4 — QAE advantage crossover: precision ~10^-4 or finer needed for option pricing

- **Claim** (anchor): "Reasonable analyses put the crossover for option pricing at $\\varepsilon \\sim 10^{-4}$ or finer, which is finer than most pricing applications actually need"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hedged quantitative claim about the precision regime at which QAE would first outperform classical Monte Carlo for option pricing.

## §29.5 — Vehicle routing QUBO: ~10^5 variables for realistic logistics scenarios

- **Claim** (anchor): "which for realistic logistics scenarios ($V \\sim 10$, $C \\sim 100$, $T \\sim 100$) is $10^5$ binary variables — at the edge of what current D-Wave hardware can ingest after minor embedding, and well beyond what gate-model QAOA can handle"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Scale claim about vehicle-routing QUBO size vs. current hardware capabilities for both D-Wave and gate-model devices.

## §29.5 — Volkswagen pilots 2017–2020: D-Wave routing and scheduling demos, no production deployment

- **Claim** (anchor): "Volkswagen ran a series of well-publicized demonstrations between 2017 and 2020: routing taxis in Beijing and Lisbon using D-Wave, optimizing paint-shop sequencing in Wolfsburg, traffic-flow simulation in Barcelona"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific pilot claims with named locations and timeframes; the text notes classical baselines won and no production deployment occurred.

## §29.5 — Volkswagen Beijing taxi demo: a few thousand vehicles

- **Claim** (anchor): "The Beijing taxi demonstration involved a few thousand vehicles"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Scale claim for the Volkswagen/D-Wave Beijing routing demonstration.

## §29.5 — BMW partnered with Honeywell/Quantinuum and AWS Braket; Daimler with IBM

- **Claim** (anchor): "BMW partnered with Honeywell/Quantinuum and AWS Braket on vehicle-configuration optimization (which options to bundle), Daimler with IBM on materials-discovery problems"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific named partnerships; the text notes neither produced advantage results in optimization.

## §29.6 — No proven exponential/superpolynomial quantum speedup for NP-hard combinatorial optimization

- **Claim** (anchor): "No known quantum algorithm has a proven exponential or superpolynomial speedup over the best classical algorithm for an NP-hard problem"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Broad open-problem/state-of-knowledge claim about quantum complexity for NP-hard problems.

## §29.6 — Grover-based optimization: quadratic speedup over brute-force, but brute-force is not the best classical baseline

- **Claim** (anchor): "Grover-based optimization offers a quadratic speedup over brute-force search, but brute-force search is rarely the best classical baseline"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result that Grover provides quadratic speedup only over unstructured brute-force enumeration, not over structured classical algorithms.

## §29.6 — QAE: real quadratic speedup in asymptotic sample complexity; no demonstrated wall-clock advantage as of 2026

- **Claim** (anchor): "Quantum amplitude estimation provides a real quadratic speedup over classical Monte Carlo in the asymptotic sample complexity. Whether this translates to wall-clock advantage depends on fault-tolerant gate costs and the resolution of the state-preparation problem. Current consensus: no demonstrated advantage"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Summary assessment of QAE for finance as of 2026; distinguishes proven complexity speedup from lack of practical wall-clock advantage.
