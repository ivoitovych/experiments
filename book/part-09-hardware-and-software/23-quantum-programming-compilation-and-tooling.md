# Chapter 23. Quantum Programming, Compilation, and Tooling

> **Status:** prereviewed · **Phase:** 4 · **Sections drafted:** 15 / 15

[← Previous: Chapter 22](22-hardware-engineering-metrics.md) · [Table of Contents](../../README.md) · [Next: Chapter 24 →](24-classical-simulation-of-quantum-systems.md)

Chapter 22 fixed the vocabulary for *what* a quantum device is — a collection of qubits with measured fidelities, coherence times, connectivity, and a native gate set. This chapter is about the software stack that turns the abstract unitary you wrote in a notebook into the pulse train that lands on those qubits. Conceptually the stack is a tower of intermediate representations: a high-level program describes a *unitary* or a *circuit*; a gate-level IR (OpenQASM 3, QIR, Quil) pins down a discrete sequence of operations; a compilation pipeline rewrites that sequence to respect a target device's connectivity and native gate set; and a scheduler emits the timed envelopes that the control electronics (Chapter 21) actually play. Every working SDK in 2026 — Qiskit, Cirq, PennyLane, tket, Q#, pyQuil, Braket — implements some slice of this tower; the differences between them are mostly *which* abstraction layer is the primary surface and *which* hardware vendors they target natively.

> **How to read this chapter.** §§23.1–23.4 are the working map of the ecosystem — circuit description languages, the major IRs, and the SDK landscape. §§23.5–23.10 are the compiler-engineering core: transpilation passes, routing, scheduling, hardware- and noise-aware compilation. §§23.11–23.13 cover resource estimation, simulators, and the hybrid runtime that drives variational and feedforward workloads. §§23.14–23.15 round out with debugging tooling and the bridge to classical ML frameworks. If you only have one read in you, §§23.1, 23.4, 23.6, and 23.13 give the load-bearing picture; the rest fills in the details you need when something does not behave the way the abstract circuit said it would.

## 23.1 Circuit Description Languages

A **circuit description language** is a textual or in-memory representation of a quantum circuit precise enough that two implementations can agree on what it means to *run* it. The function of such a language is the same as that of an assembly language in the classical world: it pins down the operations, the qubits they act on, the order, and the classical-control surface (measurements, conditional branches, parameters), without committing to a specific device's pulses or wiring.

Three categories are worth distinguishing.

**Embedded DSLs**: Python (or another host) libraries that build a circuit by method calls — `qc.h(0); qc.cx(0,1)` in Qiskit, `cirq.H(q0), cirq.CNOT(q0, q1)` in Cirq. The "language" is just the host language's syntax; portability comes from a separate serialisation step.

**Standalone textual IRs**: OpenQASM 3, Quil, QIR's textual form. These are first-class languages with grammars, parsers, and tooling. They are the lingua franca between SDKs and hardware backends for *interchange*. (For its own client–cloud transport, Qiskit Runtime actually serialises circuits with **QPY**, Qiskit's binary format, and submits hardware-native "ISA" circuits rather than round-tripping through OpenQASM 3 text — but OpenQASM 3 remains the portable cross-tool exchange format.)

**Hardware-flavoured languages**: pulse-level descriptions (OpenPulse, OpenQASM 3's `defcal` blocks, Quantinuum's `H-series` pulse format) that mention waveforms, frequencies, and durations rather than abstract unitaries. Most users never touch these directly; they exist so that the bottom of the compilation pipeline has somewhere to land.

A typical workflow uses all three: write the program against an embedded DSL in Python, emit OpenQASM 3 to ship to the backend, and let the backend lower to pulses internally. The chapters that follow walk that path top to bottom.

## 23.2 OpenQASM

**OpenQASM** (Open Quantum Assembly Language) is the de facto IR of the field. Originally an IBM project, OpenQASM 2 was a minimal gate-list format ("a sequence of gate applications and measurements, plus include statements") that became universally accepted because it was good enough and shipped with Qiskit. **OpenQASM 3**, finalised in 2021 and now the standard target as of 2026, is a substantial expansion: typed classical variables, control flow (`if`, `while`, `for`), real-time arithmetic on measurement outcomes, parameterised gate definitions, explicit timing (`delay`, `box`, `duration`), and pulse-level extensions via `defcal`. It has a published grammar (ANTLR), a reference parser (`qasm3` Python package), and round-trippable mappings from Qiskit, tket, Cirq, and the AWS Braket SDK.

A small example illustrates the level of abstraction.

```qasm
OPENQASM 3.0;
include "stdgates.inc";

qubit[2] q;
bit[2] c;

h q[0];
cx q[0], q[1];

c[0] = measure q[0];
c[1] = measure q[1];
```

The same circuit can be expressed in any major SDK and serialised back to this text. OpenQASM 3 is also the format IBM Quantum, IonQ, and several other vendors accept on their submission endpoints, which is why most Qiskit-Cirq-tket interoperation paths go through it. Two practical gotchas: gate-name conventions differ between dialects (`u3` in OpenQASM 2 vs `U` in OpenQASM 3; some vendors require their own `defcal` block for native gates), and the rich control-flow features of OpenQASM 3 are still unevenly supported by backends — assume conditional branches and real-time arithmetic work on IBM dynamic-circuit hardware and Quantinuum H-series, and check the docs everywhere else.

## 23.3 Quil

**Quil** is Rigetti's quantum instruction language and the native input format for their hardware. It predates OpenQASM 3 by several years and is in many respects a simpler design: a flat list of named gates and measurements, parameterised by classical registers, with explicit `DEFGATE` and `DEFCIRCUIT` constructs for user-defined operations.

The Python binding is `pyQuil`. A two-qubit Bell preparation looks like

```text
DECLARE ro BIT[2]
H 0
CNOT 0 1
MEASURE 0 ro[0]
MEASURE 1 ro[1]
```

The interesting feature of Quil — and the one that shaped a lot of subsequent thinking in the field — is its **Quil-T** extension, which exposes pulse-level control as first-class syntax. A `DEFCAL` block specifies the waveform, frequency, and duration that implement a given logical gate on a given qubit, and arbitrary user-defined gates can be assembled from primitive pulse operations. OpenQASM 3's `defcal` blocks are conceptually a port of this idea. As of 2026 Quil remains tightly coupled to Rigetti's hardware and is rarely used as an interchange format outside that ecosystem, but its design ideas are influential well beyond it.

## 23.4 SDK Landscape

The SDK landscape in 2026 has consolidated around a handful of mature stacks, each with a clear primary hardware target and a clear secondary strength.

**Qiskit** (IBM, open source). The largest community, the most extensive documentation, and the deepest tooling for IBM superconducting hardware. The Python API is the most common entry point in the field. The current shipping line is the **Qiskit SDK 2.x** (released March 2025; a slimmed-down core with the transpiler, circuit construction, and quantum-info modules, plus a new C interface) paired with **Qiskit Runtime** (the cloud-side execution service, exposing the `Sampler` and `Estimator` *Primitives* — see §23.13). Qiskit Aer is the local simulator backend.

**Cirq** (Google, open source). Targets Google's superconducting hardware and the Quantum Engine cloud service. Cirq's design emphasises gate-level circuit construction with explicit qubit objects (a `GridQubit` knows its physical position), and it was the entry point for **TensorFlow Quantum** for hybrid quantum-classical ML workloads (TFQ was dormant through 2024–25 and now receives only occasional compatibility releases — v0.7.6 in February 2026; treat it as maintenance-mode, see §23.15).

**PennyLane** (Xanadu, open source). Built for variational and quantum-machine-learning workflows. PennyLane's distinguishing feature is its *device-agnostic* model: the same `qnode` runs on Xanadu photonic hardware, IBM superconducting backends (via a Qiskit plugin), IonQ trapped-ion backends, AWS Braket, or a local simulator, and the framework computes parameter-shift gradients that propagate through PyTorch or JAX. The default Python integration is the smoothest in the field for QML.

**tket** (Quantinuum, open source as `pytket`). A compilation toolkit rather than a programming environment: pytket parses circuits from Qiskit, Cirq, OpenQASM, Quil, and others, applies a uniformly excellent set of optimisation passes, and emits circuits for almost any backend. The phrase "use tket as the compiler" is a common piece of advice when the user's program is written in one SDK but their hardware is reached through another.

**Q#** (Microsoft). A standalone typed quantum programming language with its own compiler, shipped as the **Quantum Development Kit (QDK)** and integrated into Azure Quantum. Q# emphasises **resource estimation** (§23.11) and integration into classical-quantum workflows from C# or Python. The 2024 rewrite of Q# (the "Modern QDK") simplified the language considerably; it now compiles to QIR and uses LLVM-based backends.

**pyQuil** (Rigetti). The Python entry to Quil. Mainly used by people running on Rigetti hardware (the current Ankaa generation; the earlier Aspen line is retired) via the Rigetti Quantum Cloud Service.

**Amazon Braket SDK** (AWS, open source). A Python SDK that targets the **Amazon Braket** service, which proxies access to multiple hardware vendors (IonQ, IQM, Rigetti, QuEra, AQT as of mid-2026; Oxford Quantum Circuits left the roster in 2024) and AWS-hosted simulators under one API. The SDK can also accept OpenQASM 3 and parameterised circuits from PennyLane.

**Other ecosystems**: **Quipper** (a Haskell-embedded DSL, mostly used in academic resource-counting work), **Silq** (a typed quantum language with automatic uncomputation), and various smaller frameworks (ProjectQ, Strawberry Fields for photonics) are still active but occupy specialist niches.

Practical recommendation: **start with Qiskit for IBM hardware; start with Cirq for Google hardware; start with PennyLane for variational and QML work; use pytket whenever you need to retarget a circuit across vendors**. None of these choices is binding — every framework can serialise to and from OpenQASM 3 — but the path-of-least-resistance is materially smoother when the SDK and the target vendor match.

## 23.5 Pulse-Level Programming

Above the assembly layer, a "gate" is an abstract unitary; on hardware, a gate is a waveform — a complex envelope $\Omega(t)$ played into a control line at the qubit's transition frequency for a calibrated duration. **Pulse-level programming** is the layer that lets a user write that waveform directly, bypassing the compiler's default calibration.

The motivating use cases are narrow but real. **Gate calibration and benchmarking**: error-amplification sequences (randomised benchmarking, gate-set tomography) that need a parameter sweep over pulse amplitude, phase, or duration. **Custom gates**: a particular two-qubit unitary that the compiler does not decompose efficiently into the native set, but which can be realised by a single shaped pulse on the cross-resonance drive. **Quantum-optimal-control workflows**: GRAPE-style or CRAB-style numerical optimisation of pulse shapes for a target unitary, possibly noise-aware.

The interfaces:

- **Pulse-level calibration** via OpenQASM 3 `defcal` blocks, e.g. `defcal h $0 { play(...); }` to replace IBM's default Hadamard calibration on a specific qubit. (Qiskit's own `qiskit.pulse` API was deprecated in Qiskit 1.3 and **removed in Qiskit 2.0** (2025), alongside IBM's removal of pulse-level control from its QPUs; pulse programming now lives in `defcal`/OpenQASM 3 and vendor stacks rather than in the Qiskit SDK.)
- **Quil-T** (Rigetti) — the original pulse-level IR, structurally similar.
- **Quantinuum's H-series stack** allows pulse-level overrides for specialist users; trapped-ion pulse shapes are less commonly customised because the native two-qubit gates are already very high fidelity.

Two warnings. First, pulse-level programs are calibration-dependent: an envelope that works on `qubit[3]` today may need re-tuning next week as the qubit's frequency drifts. Production workflows wrap pulse-level overrides in a re-calibration routine that runs before each batch. Second, the compiler's default calibrations have usually been tuned by the vendor's calibration team and outperform user-written pulses except in narrow research contexts; reach for `defcal` when you have a specific reason, not as a default.

## 23.6 Transpilation

**Transpilation** is the compilation step that takes a high-level circuit and emits a *device-executable* circuit. The Qiskit-specific verb is now standard across the field; tket calls it "compilation", Cirq calls it "optimisation and routing", but the pipeline is the same.

The canonical pipeline has four stages:

1. **Gate decomposition** — rewrite every gate into the device's *native gate set* (the universal subset the hardware actually implements: see Chapter 22). A Toffoli, for example, decomposes into 6 CNOTs plus single-qubit gates on a superconducting target; on a trapped-ion device that natively implements arbitrary $ZZ$-coupled gates, the decomposition is shorter.
2. **Routing** — map logical qubits to physical qubits and insert SWAPs so that every two-qubit gate is between *connected* physical qubits (§23.7).
3. **Optimisation** — peephole rewrites, rotation merging, template matching, synthesis-based optimisation (§9.13). Optimisation runs both before and after routing because SWAP insertion creates new patterns that benefit from re-optimisation.
4. **Scheduling** — assign concrete start times and durations to every operation, respecting the device's instruction timing model (§23.8).

In Qiskit the entry point is `transpile(circuit, backend, optimization_level=N)`. Level 0 only does the bare-minimum legality fixes; level 1 was the long-time default (the default moved to level 2 with Qiskit 1.3, late 2024 — check your installed version); level 3 runs heavier optimisation passes and is what most published benchmarks use. The Cirq equivalent is `cirq.optimize_for_target_gateset`; the tket equivalent is `pytket.passes.SequencePass([...])` with a user-chosen list. All three frameworks let you inspect the pass list, plug in your own pass, or replace the whole pipeline.

Two metrics matter when comparing transpiler runs. The **two-qubit gate count** (CNOT count on superconducting devices, $ZZ$ or $XX$ count on ion traps) is the dominant fidelity cost; reducing it by 10% typically improves end-to-end success probability by a meaningful margin. The **circuit depth in nanoseconds** — not in gate count, but in real time — determines how much $T_2$ decoherence accrues; on a device with $T_2 \approx 100~\mu s$ and gate times around 50 ns, the depth budget is roughly $2000$ gate slots, and exceeding it pushes the circuit into the noise-dominated regime.

## 23.7 Routing

**Routing** (or **qubit mapping**) solves the following problem. The circuit names *logical* qubits $q_0, q_1, \ldots, q_n$. The device has *physical* qubits $Q_0, Q_1, \ldots, Q_m$ arranged on a coupling graph $G$ — heavy-hex on IBM superconducting devices, square lattice on Google, all-to-all on most ion traps. A two-qubit gate on logical $q_i, q_j$ can execute only if their currently-mapped physical qubits are adjacent in $G$. SWAP operations move logical qubits along the graph at a cost: each SWAP is 3 CNOTs on a superconducting device, with the corresponding fidelity hit.

The routing problem is to find an initial mapping and a sequence of SWAP insertions that minimises some cost — usually a weighted combination of SWAP count, depth, and per-edge fidelity. It is NP-hard in the general case (it reduces to subgraph isomorphism plus a token-swapping problem), but in practice it is solved by heuristic algorithms that produce circuits within a few percent of optimal on realistic instances.

The standard heuristics:

- **SABRE** (SWAP-based bidirectional heuristic routing). Iterates forward and backward through the circuit, picking SWAPs that bring the most upcoming two-qubit gates closer to executable. Default in Qiskit since 2020.
- **LightSABRE**. A faster variant that gives up some optimality for considerably better scaling; default for large circuits.
- **Trivial mapping plus stochastic SWAP**. Cheaper, used at low optimisation levels.
- **Architecture-aware initial mapping** ("layout selection"): heuristics that pick an initial logical-to-physical assignment based on the circuit's interaction graph rather than starting from the identity.

For genuinely all-to-all devices (a single trapped-ion chain), routing is trivial — every two-qubit gate is executable as written — and the transpiler skips this stage. Neutral-atom arrays achieve effective all-to-all connectivity by physically *rearranging* atoms, which removes SWAP chains but replaces them with atom-movement and gate-zone scheduling that the compiler must plan; photonic connectivity is set by the interferometer graph. Even so, avoiding SWAP overhead is a real advantage of these platforms for circuits with non-local interactions, especially in early fault-tolerant regimes where SWAP overhead can dominate.

A practical observation: routing quality is the single most impactful transpiler choice on superconducting hardware. Running the same circuit through `optimization_level=1` and `optimization_level=3` can differ by 30–50% in SWAP count on a hard instance, and the success probability follows. If you only tune one transpiler knob, tune this one.

## 23.8 Scheduling

**Scheduling** assigns concrete time slots to every operation. The output is no longer a circuit in the abstract sense — a partial order of gates — but a *timetable*: gate $g$ starts at $t_g$ on qubit $q$, lasts $d_g$, and ends at $t_g + d_g$.

The constraints are mostly physical:

- **Gate durations** are not all equal. A single-qubit gate is often 20–50 ns on a superconducting device; a CNOT is 200–500 ns; a measurement plus reset can be a microsecond or more. The scheduler reads these from the backend's calibration data.
- **Same-qubit serialisation**: two gates on the same qubit cannot overlap in time.
- **Crosstalk avoidance**: gates on physically adjacent qubits may interfere if executed simultaneously. Some schedulers insert idle slots ("dynamical decoupling time") to avoid spectator errors.
- **Measurement timing**: dispersive readout takes substantially longer than a gate; if the algorithm needs mid-circuit measurement followed by feedforward, the scheduler must reserve a `delay` block for the classical signal to land and propagate.

Two scheduling policies dominate practice. **As-late-as-possible (ALAP)** schedules each operation as late as the data dependencies allow, which minimises the idle time during which the qubit is exposed to dephasing while waiting for its next operation. **As-soon-as-possible (ASAP)** does the reverse; it is occasionally useful when readout is the bottleneck and idle time at the start is cheaper than idle time at the end.

The output of scheduling is a sequence of pulses (or, equivalently, a `defcal`-expanded OpenQASM 3 program) that the control electronics (Chapter 21) execute. From this point down the stack is hardware-specific.

## 23.9 Hardware-Aware Compilation

**Hardware-aware compilation** widens the transpiler's view from "respect connectivity and native gate set" to "exploit everything we know about *this specific device*". The information sources are the per-qubit and per-edge calibration data — single-qubit gate fidelities, two-qubit gate fidelities, readout fidelities, $T_1$ and $T_2$ values, gate durations, crosstalk maps — all of which the vendor exposes through the SDK (e.g., `backend.properties()` in Qiskit, `cirq.google.Engine.get_processor(...)` in Cirq).

Three concrete optimisations.

**Best-qubit selection.** Among the many possible mappings of logical to physical qubits, pick one whose two-qubit gate fidelities along the circuit's interaction graph are best. On a 127-qubit IBM device with two-qubit gate errors ranging from $5 \times 10^{-3}$ to $5 \times 10^{-2}$ across the chip, the best mapping can easily double end-to-end success probability over a random mapping of the same circuit.

**Decomposition choice.** A `CCX` (Toffoli) can be decomposed several ways with different CNOT counts and different patterns of control-target directions. The hardware-aware transpiler picks the decomposition whose CNOTs lie on the best-fidelity edges.

**Pulse-level tweaks.** For high-fidelity edges, the default calibration can sometimes be replaced with a tighter pulse (shorter duration, lower leakage); the transpiler can apply this only on the edges where the calibration has actually been verified.

All major vendors expose enough calibration data to make hardware-aware compilation worthwhile. Qiskit's transpiler at `optimization_level=3` does this by default; tket exposes it through `DefaultMappingPass(arc, ...)` with the device's coupling map and fidelity weights; Cirq does it through the Quantum Engine's per-processor calibration objects.

## 23.10 Noise-Aware Compilation

**Noise-aware compilation** is a strict generalisation of hardware-aware compilation: it uses not just calibration *fidelities* but also a *noise model* — Pauli error rates, $T_1$/$T_2$ time constants, coherent-error parameters — to predict the success probability of candidate compilations and choose accordingly.

The simplest noise-aware criterion is **success-probability estimation**: model each gate as a depolarising channel with rate equal to its measured infidelity, multiply through the circuit, and compare candidate compilations by the resulting end-to-end fidelity. This is fast enough to run inside the transpiler loop and captures most of the variance.

More sophisticated approaches.

**Dynamical decoupling (DD).** Insert sequences of $X$ or $XY4$ pulses into idle slots so that low-frequency noise averages out. The pattern is structurally identical to NMR refocusing pulses (and has the same theoretical justification: a fast classical drive cancels the slow noise Hamiltonian to first order in the Magnus expansion). Both Qiskit (`PadDynamicalDecoupling`) and tket apply DD automatically at high optimisation levels.

**Pauli twirling.** Conjugate a noisy gate with random Pauli operators averaged over many shots. The effective noise channel becomes a Pauli channel even if the underlying noise was not, which makes subsequent error-mitigation passes (Chapter 18) simpler. Implemented via Qiskit's transpiler twirling passes and Qiskit Runtime's twirling options. (The `mthree` toolkit is *readout*-error mitigation, a different layer.)

**Probabilistic error cancellation (PEC).** Sample circuits from a quasi-probability distribution chosen so that the noise channel inverts in expectation. Implemented in Qiskit Runtime's `Estimator` as the `pec` resilience level.

**Zero-noise extrapolation (ZNE).** Run the circuit at several effective noise scales (achieved by gate stretching or by deliberate folding) and extrapolate the result to zero noise. Implemented in `mitiq` (an SDK-agnostic mitigation library) and exposed in Qiskit Runtime.

The line between "noise-aware compilation" and "error mitigation" (Chapter 18) is conventional: the same techniques appear in both. The compilation framing is useful because it gets the mitigation strategy out of the user's hands and into the toolchain.

## 23.11 Resource Estimation

**Resource estimation** answers a different question from transpilation: not "what is the compiled circuit?" but "how big a quantum computer would I need to run this?". The output is a count — physical qubits, surface-code patches, logical T-gates, magic-state distillation factories, runtime in seconds — for a target circuit at a target error budget.

The motivating use case is **fault-tolerant resource forecasting** for algorithms that have not yet been run, including the workhorse algorithms of practical interest (Shor's factoring on a 2048-bit RSA modulus, quantum chemistry for biologically relevant molecules, Trotterised lattice gauge theory). The standard reference workflow:

1. Start from a logical circuit at the algorithmic level (i.e., in terms of $T$, $H$, $S$, and CNOT, with no consideration of encoding).
2. Pick an error budget — usually $\epsilon \approx 10^{-2}$ or smaller end-to-end logical error.
3. Choose an error-correcting code — almost always the surface code in 2026 forecasts, sometimes with floquet or color-code variants for compass-coded estimates.
4. Compute the logical-qubit and logical-cycle counts.
5. Apply the *space-time tradeoff* curves for the chosen code (more physical qubits per logical patch ↔ more T-state factories ↔ less time).
6. Multiply through and report.

Microsoft's **Azure Quantum Resource Estimator** is the most mature publicly-available tool: a Q# (or Qiskit) circuit goes in; a JSON breakdown of physical qubits, runtime, magic-state-factory layout, and surface-code parameters comes out. Quantinuum's **Resource Estimator** (and the older `qsharp.estimator` Python integration) plays a similar role. The `PyZX` ecosystem (ZX-calculus T-count reduction) and `pytket`'s gate-statistics reporting offer logical-level T-counting passes that feed those estimators.

A frequently-cited datapoint, current to 2026: factoring a 2048-bit RSA key with surface-code-encoded Shor's algorithm under standard parameter assumptions ($p_{\mathrm{phys}} = 10^{-3}$, target $\epsilon = 10^{-2}$, magic-state-distillation overhead) requires roughly $2 \times 10^7$ physical qubits and several hours of runtime. Different cost models give numbers spanning roughly an order of magnitude; the resource estimator's value is not in giving "the" answer but in letting you sweep the assumptions and see the elasticity.

## 23.12 Simulation Back-Ends

A **simulator** is a classical program that computes the output of a quantum circuit. Simulators serve four roles: development (debug a circuit without burning device time), verification (compare a small-scale execution against the exact answer), benchmarking (compute classical baselines for quantum advantage claims), and education. Different simulator families have different cost models.

**State-vector simulator.** Stores the full $2^n$-dimensional state vector and applies each gate as a matrix-vector product. Memory cost $O(2^n)$ — the binding constraint. A single-precision complex state vector at $n = 30$ qubits is 8 GB; at $n = 36$ qubits, 512 GB; at $n = 40$, 8 TB. Distributed implementations push the frontier to about $n = 50$ on the largest supercomputers. Standard in Qiskit Aer (`AerSimulator(method='statevector')`), Cirq's default simulator, Quimb, and Intel-QS.

**Tensor-network simulator.** Represents the state (or the circuit's contraction) as a tensor network and contracts it in an order chosen to minimise the intermediate bond dimensions. The cost scales not with $n$ but with the *entanglement structure* of the circuit: low-entanglement and shallow circuits can be simulated at $n = 100$ or more, while heavily entangled circuits at large depth are no easier than state-vector. Standard in `quimb`, `cuQuantum`'s `cuTensorNet`, and `cotengra` (the contraction-path search library). The 2019 Google "quantum supremacy" experiment was rebutted in part by tensor-network simulations.

**Stabiliser simulator.** Restricted to Clifford circuits (gates from the Clifford group: $H$, $S$, CNOT, Pauli measurements). The Gottesman–Knill theorem (§8.10) gives a polynomial-time classical simulation. Standard in `stim` (the de facto stabiliser simulator since 2021, by Craig Gidney) and Qiskit's `Clifford` class. Used heavily in quantum-error-correction research, where Clifford circuits dominate.

**Density-matrix simulator.** Stores the $2^n \times 2^n$ density matrix to model noisy evolution exactly. Memory cost $O(4^n)$ — twice the exponent of state-vector — so the qubit ceiling is roughly half: $n = 15$ comfortably, $n = 20$ with effort. Used when the noise model matters and Monte Carlo sampling of pure-state trajectories is insufficient. Standard in Qiskit Aer (`method='density_matrix'`) and QuTiP.

**Trajectory simulator.** Runs many pure-state samples through a Monte Carlo unravelling of the noisy dynamics. Memory cost $O(2^n)$ per trajectory; statistical cost grows with the noise rate and the desired expectation-value precision. The natural method when noise is weak and many shots are acceptable.

**Classical-shadows-based simulators.** Use the classical-shadows representation (Chapter 11) to estimate expectation values without ever materialising the full state. Excellent for variational algorithms where the only outputs of interest are expectation values of local observables.

**Specialised**: matchgate / fermionic simulators (polynomial-time for the fermionic linear-optics subclass), photonic simulators (`Strawberry Fields`, `Piquasso`), and Boson-sampling reference implementations.

Selecting a simulator is a working-engineer decision: state-vector for small circuits with arbitrary gates; stabiliser for QEC; tensor-network for shallow large-$n$ circuits; density-matrix or trajectory for noise studies; classical-shadows for variational expectation values.

## 23.13 Hybrid Quantum-Classical Orchestration

Many algorithms — VQE, QAOA, quantum-machine-learning training loops, error-mitigation routines — are structurally a tight loop: prepare a parameterised circuit, measure expectation values, feed them to a classical optimiser, update the parameters, repeat. The naive implementation submits each iteration as a separate cloud job, which on a queued backend can mean minutes of waiting for milliseconds of quantum execution. **Hybrid runtimes** collapse that loop by hosting the classical optimiser next to the hardware.

The dominant model in 2026 is the **Qiskit Primitives** abstraction.

- **Sampler** takes a parameterised circuit, a list of parameter bindings, and a number of shots; returns a (quasi-)probability distribution over measurement outcomes for each binding.
- **Estimator** takes a parameterised circuit, a list of observables, and a list of parameter bindings; returns expectation values $\langle O \rangle$ for each (binding, observable) pair.

Both Primitives expose a `run(...)` method and an asynchronous result object. Crucially, they accept *lists* of parameter bindings in one call — so a single submission can sweep an entire optimiser step's worth of evaluations — and they execute inside a **Session**, a server-side construct that holds a reserved slot on the hardware so that the user's iterations do not re-queue between calls. The structural pattern is

```text
with Session(backend) as session:
    estimator = Estimator(session=session)
    for step in range(num_steps):
        values = estimator.run(circuit, observables, parameter_values).result()
        parameter_values = classical_update(values)
```

Comparable abstractions exist elsewhere: **Amazon Braket Hybrid Jobs** ship a containerised classical workload to AWS adjacent to the QPU; **Azure Quantum Sessions** play the same role for Microsoft's stack; **PennyLane**'s `qml.qnode` is a Pythonic wrapper that submits asynchronously and integrates with PyTorch/JAX autodiff. **Cirq with TensorFlow Quantum** was the corresponding stack for Google's hardware, though TFQ now sees only occasional compatibility releases.

Two patterns specific to variational programming.

**Parameter-shift gradients.** For a single-parameter rotation $R(\theta)$ appearing in an expectation value $f(\theta) = \langle \psi(\theta) | O | \psi(\theta) \rangle$, the exact derivative is $f'(\theta) = \tfrac{1}{2}\bigl(f(\theta + \tfrac{\pi}{2}) - f(\theta - \tfrac{\pi}{2})\bigr)$. This is not a finite difference — it is exact, on hardware, for any single-qubit rotation generator of order two. PennyLane, Qiskit's `EstimatorGradient`, and TensorFlow Quantum all implement parameter-shift natively. Higher-order variants (general parameter shift, stochastic parameter shift) handle multi-Pauli generators and continuous gates.

**Sessions vs one-shot.** Sessions are billed per reserved minute (whether or not the device is executing); one-shot submissions are billed per job and queued behind everyone else. A typical VQE run with 50 optimiser steps × 20 evaluations × 4000 shots is faster *and* cheaper in a Session for any backend with a queue depth above a few jobs.

## 23.14 Verification and Debugging of Quantum Programs

Quantum programs are hard to debug. The state is exponential and unobservable; measurement destroys it; intermediate values do not exist in the classical sense. The tooling that has matured to address this is in three families.

**Statevector-replay debugging.** Run the circuit on a state-vector simulator with the same SDK and inspect the intermediate state vectors. Qiskit's `Statevector(circuit)`, Cirq's `simulate_moment_steps`, and PennyLane's `qml.snapshots` all support this. The constraint is the qubit count — past about 30 qubits, replay debugging becomes infeasible and other techniques take over.

**Assertion-based debugging.** Annotate the circuit with classical assertions on intermediate measurements ("after this Toffoli, the ancilla should be $|0\rangle$ if the inputs were classical"); a tool either statically checks them (Q# does this for some patterns) or dynamically samples to verify. Statistical assertion methods (state, entanglement, and superposition assertions via repeated measurement and hypothesis tests) come out of the research literature rather than a single official API.

**Tomographic debugging.** When the circuit is small enough, run state or process tomography on the prepared state or the implemented unitary and compare against the design. Tomography costs scale as $O(4^n)$ in shots, so this is practical for $n \leq 6$ or so.

**Cross-platform compilation diff.** Compile the same logical circuit on Qiskit, tket, and Cirq, run all three on the same hardware, and compare outputs. Disagreements localise a compiler bug, a gate-direction confusion, or an endianness mismatch (always the prime suspect — Qiskit is little-endian; the book convention is big-endian; this difference alone has eaten more debug time than any other single issue in the field).

**Quantum-software unit testing.** Ordinary `pytest` plus a local simulator (Qiskit Aer, Qiskit Runtime's local testing mode, Cirq's simulator, or PennyLane's `default.qubit`) lets you write unit tests that run small circuits and assert on the output distribution against a fixed seed. The discipline of writing such tests as the program grows is the single most effective debugging practice.

## 23.15 Integration with Classical ML Frameworks

Quantum machine learning is the largest sustained user of the variational stack in 2026, and the integration with the classical ML toolchain is now first-class.

**PennyLane**'s `qml.qnode` integrates as a layer in PyTorch, JAX, and TensorFlow. A quantum node can be differentiated through (via parameter-shift on hardware, automatic differentiation on simulators), composed with classical layers (`nn.Linear(...)`, `nn.Conv2d(...)`), trained with standard optimisers (Adam, RMSProp), and saved/loaded as part of a `state_dict`.

**TensorFlow Quantum** wraps Cirq circuits as TF layers, with the parameter-shift gradient implemented as a TensorFlow op. The integration is tighter than PennyLane's PyTorch path but ties the user to TF and to Cirq's circuit model — and the project was dormant through 2024–25 and now receives only occasional compatibility releases (v0.7.5 December 2025, v0.7.6 February 2026), so prefer PennyLane for new work.

**Qiskit Machine Learning** offers `EstimatorQNN` (expectation-value outputs) and `SamplerQNN` (probability-distribution outputs) as scikit-learn-compatible estimators and PyTorch modules. Convenient for Qiskit-native users; the integration story is not as smooth as PennyLane's because Qiskit's Primitives were not initially designed with autodiff in mind.

The practical effect of these integrations is that a 2026 QML pipeline looks structurally identical to a 2024 classical ML pipeline — `optimiser.zero_grad(); loss = model(batch); loss.backward(); optimiser.step()` — with the quantum part hidden inside a layer object. Whether the *training* converges to anything useful is the open scientific question of the field (Chapter 30 takes it up).

The bridge from this chapter to Chapter 24: with the compilation pipeline understood, we can ask what those layers below the pipeline — the simulators that stand in for hardware during development — actually do. Chapter 24 takes the classical-simulation question seriously: what circuits can a classical computer simulate efficiently, where does that frontier lie in 2026, and what does "quantum advantage" actually mean once the simulators get good at the easy cases?

**Sanity checks before moving on.**

1. Take a three-gate Qiskit circuit ($H$ on qubit 0, CNOT $0 \to 1$, measure both) and serialise it to OpenQASM 3. Read the output and identify which lines correspond to which gate.
2. Run the same Bell-state circuit through `transpile(circuit, backend, optimization_level=N)` for $N = 0, 1, 3$ on any IBM backend. Compare the CNOT count and the depth in nanoseconds for the three optimisation levels.
3. Explain why an all-to-all-connected device (trapped-ion, neutral-atom) skips the routing stage of the transpiler entirely. What changes in the cost model of an algorithm like Grover's when SWAPs are free?
4. For a parameterised rotation $R_X(\theta)$ inside an expectation value $f(\theta)$, write out the parameter-shift formula and verify on a single-qubit example that it agrees with the analytic derivative.
5. Estimate the state-vector memory required to simulate $n = 32$ qubits with single-precision complex amplitudes. At what $n$ does the requirement exceed 1 TB?

---

[← Previous: Chapter 22](22-hardware-engineering-metrics.md) · [Table of Contents](../../README.md) · [Next: Chapter 24 →](24-classical-simulation-of-quantum-systems.md)
