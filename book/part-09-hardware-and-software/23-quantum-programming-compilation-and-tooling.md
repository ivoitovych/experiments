# Chapter 23. Quantum Programming, Compilation, and Tooling

> **Status:** prereviewed · **Phase:** 4 · **Sections drafted:** 15 / 15

[← Previous: Chapter 22](22-hardware-engineering-metrics.md) · [Table of Contents](../../README.md) · [Next: Chapter 24 →](24-classical-simulation-of-quantum-systems.md)

Chapter 22 gave us the metrics for describing *what* a quantum device is — a collection of qubits with measured fidelities, coherence times, and connectivity, executing a native gate set (§8.12). This chapter is about the software stack that turns the abstract unitary you wrote in a notebook into the pulse train that lands on those qubits. Conceptually the stack is a tower of intermediate representations: a high-level program describes a *unitary* or a *circuit*; a gate-level language or IR pins down a discrete sequence of operations (OpenQASM 3 and Quil are circuit languages; QIR — the LLVM-based Quantum Intermediate Representation used by Q# and Azure — is a compiler IR that embeds quantum calls in LLVM and need not fix a hardware-ready gate sequence); a compilation pipeline rewrites that sequence to respect a target device's connectivity and native gate set; a scheduler assigns times to the instructions; and a further, often vendor-private lowering produces the pulse-level programs the control electronics (Chapter 21) actually play. The major SDKs of 2026 — Qiskit, Cirq, PennyLane, tket, Q#, pyQuil, Braket — each implement some slice of this tower; the most visible differences are *which* abstraction layer is the primary surface and *which* hardware vendors they target natively, though semantics, differentiation support, runtime models, and licensing differ too.

> **How to read this chapter.** §§23.1–23.4 are the working map of the ecosystem — circuit description languages, the major IRs, and the SDK landscape. §§23.5–23.10 are the compiler-engineering core: transpilation passes, routing, scheduling, hardware- and noise-aware compilation. §§23.11–23.13 cover resource estimation, simulators, and the hybrid runtime that drives variational and feedforward workloads. §§23.14–23.15 round out with debugging tooling and the bridge to classical ML frameworks. If you only have one read in you, §§23.1, 23.4, 23.6, and 23.13 give the load-bearing picture; the rest fills in the details you need when something does not behave the way the abstract circuit said it would.

## 23.1 Circuit Description Languages

A **circuit description language** is a textual or in-memory representation of a quantum circuit precise enough that two implementations sharing a semantic version of the language can agree on what it means to *run* it (file syntax alone does not settle semantics). The function of such a language is the same as that of an assembly language in the classical world: it pins down the operations, the qubits they act on, the order, and the classical-control surface (measurements, conditional branches, parameters), without committing to a specific device's pulses or wiring.

Three categories are worth distinguishing.

**Embedded DSLs**: Python (or another host) libraries that build a circuit by method calls — `qc.h(0); qc.cx(0,1)` in Qiskit, `cirq.H(q0), cirq.CNOT(q0, q1)` in Cirq. The "language" is just the host language's syntax; portability comes from a separate serialization step.

**Standalone textual IRs**: OpenQASM 3 and Quil are first-class languages with grammars, parsers, and tooling; QIR's textual form is LLVM IR following the QIR conventions (commonly shipped as bitcode) — a compiler-level representation, not a standalone quantum language in the same sense. OpenQASM is the most common *interchange* format between SDKs and backends; Quil is mainly Rigetti-local, and QIR serves a different compiler/runtime ecosystem. (For its own client–cloud transport, Qiskit Runtime actually serializes circuits with **QPY**, Qiskit's binary format, and submits hardware-native "ISA" circuits rather than round-tripping through OpenQASM 3 text — but OpenQASM 3 remains the closest thing to a portable cross-tool exchange format — with uneven feature support and lossy conversion of custom operations, control flow, timing, and calibrations.)

**Hardware-flavored languages**: pulse-level descriptions (OpenPulse, OpenQASM 3's `defcal` blocks, Rigetti's Quil-T) that mention waveforms, frames, frequencies, and durations rather than abstract unitaries. Most users never touch these directly; they exist so that the bottom of the compilation pipeline has somewhere to land.

A typical workflow touches all three layers: write the program against an embedded DSL in Python, serialize it for submission — as OpenQASM 3 text on some providers, as a binary or vendor format (Qiskit Runtime's QPY, Braket IR) on others — and let the backend lower to native instructions and pulses internally. The sections that follow walk that path top to bottom.

## 23.2 OpenQASM

**OpenQASM** (Open Quantum Assembly Language) is the field's most widely used circuit interchange language (compiler stacks also use QIR, MLIR dialects, and their own in-memory IRs). Originally an IBM project, OpenQASM 2 was a minimal gate-list format ("a sequence of gate applications and measurements, plus include statements") that became widely adopted because it was good enough and shipped with Qiskit. **OpenQASM 3**, whose specification was first published in 2021 and continues to evolve, is a substantial expansion: typed classical variables, control flow (`if`, `while`, `for`), real-time arithmetic on measurement outcomes, parameterized gate definitions, explicit timing (`delay`, `box`, `duration`), and pulse-level extensions via `defcal`. It has a published grammar with reference tooling (the `openqasm3` Python package), and Qiskit, tket, Cirq, and the AWS Braket SDK all provide importers/exporters — with partial coverage: custom gates, timing, calibration blocks, and control flow can be lost or rejected in conversion.

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

This circuit sits inside the common subset that every major SDK can express and serialize back to text; richer constructs round-trip far less reliably. Several vendors accept OpenQASM 3 at or near their submission interfaces (support and dialect vary — check the provider's documentation), and OpenQASM is a common leg in Qiskit–Cirq–tket interoperation paths. Two practical gotchas: gate-name conventions differ between dialects (`u3` in OpenQASM 2 vs `U` in OpenQASM 3; some vendors require their own `defcal` block for native gates), and the rich control-flow features of OpenQASM 3 are still unevenly supported by backends — even on the vendors that advertise dynamic circuits (IBM, Quantinuum), the supported subset of branches and real-time arithmetic varies by backend and service version — query the target's capabilities everywhere rather than assuming.

## 23.3 Quil

**Quil** is Rigetti's quantum instruction language and the native input format for their hardware. It predates OpenQASM 3 by several years and reads more simply at the gate level — named gates and measurements parameterized by classical memory — though the language also includes classical memory declarations, control flow, pragmas, and reset, with explicit `DEFGATE` (matrix-defined) and `DEFCIRCUIT` (instruction-body) constructs for user-defined operations.

The Python binding is `pyQuil`. A two-qubit Bell preparation looks like

```text
DECLARE ro BIT[2]
H 0
CNOT 0 1
MEASURE 0 ro[0]
MEASURE 1 ro[1]
```

The interesting feature of Quil — and the one that shaped a lot of subsequent thinking in the field — is its **Quil-T** extension, which exposes pulse-level control as first-class syntax. A `DEFCAL` block binds a logical gate on specific qubits to the control instructions that implement it, drawing on frames and waveforms declared through companion `DEFFRAME`/`DEFWAVEFORM` constructs, and user-defined gates can be assembled from primitive pulse operations within what the hardware and its safety limits permit. OpenQASM 3's `defcal` blocks serve a similar role. As of 2026 Quil remains tightly coupled to Rigetti's hardware and is rarely used as an interchange format outside that ecosystem, but its design ideas are influential well beyond it.

## 23.4 SDK Landscape

The SDK landscape in 2026 has consolidated around a handful of mature stacks. Some pair naturally with one vendor's hardware; others are deliberately multi-backend (PennyLane, Braket) or compiler-centric (tket) — the one-stack-one-vendor sketch below is a simplification to get oriented by.

**Qiskit** (IBM, open source). A very large community, extensive documentation, and the deepest tooling for IBM superconducting hardware; its Python API is among the most common entry points in the field. The current shipping line is the **Qiskit SDK 2.x** (released March 2025; a slimmed-down core with the transpiler, circuit construction, and quantum-info modules, plus a new C interface) paired with **Qiskit Runtime** (the cloud-side execution service, exposing the `Sampler` and `Estimator` *Primitives* — see §23.13). Qiskit Aer is the local simulator backend.

**Cirq** (Google, open source). Targets Google's superconducting hardware and the Quantum Engine cloud service. Cirq's design emphasizes gate-level circuit construction with explicit qubit objects (a `GridQubit` knows its physical position), and it was the entry point for **TensorFlow Quantum** for hybrid quantum-classical ML workloads (TFQ was dormant through 2024–25 and now receives only occasional compatibility releases — v0.7.6 in February 2026; treat it as maintenance-mode, see §23.15).

**PennyLane** (Xanadu, open source). Built for variational and quantum-machine-learning workflows. PennyLane's distinguishing feature is its *device-agnostic* model: the same `QNode` can run against photonic, superconducting, and trapped-ion backends or a local simulator (via plugins) when its operations, measurements, and differentiation method fall in the target's supported subset, and the framework computes gradients — parameter-shift where conditions permit, backpropagation or adjoint on simulators — that propagate through PyTorch or JAX. In the author's experience its Python integration is the smoothest current path for QML.

**tket** (Quantinuum, open source as `pytket`). A compilation toolkit rather than a programming environment: pytket parses circuits from Qiskit, Cirq, OpenQASM, Quil, and others, applies a strong suite of optimization passes (quality is workload- and target-dependent, as with any compiler), and emits circuits for many backends through its extension packages. The phrase "use tket as the compiler" is a common piece of advice when the user's program is written in one SDK but their hardware is reached through another.

**Q#** (Microsoft). A standalone typed quantum programming language with its own compiler, shipped as the **Quantum Development Kit (QDK)** and integrated into Azure Quantum. Q# emphasizes **resource estimation** (§23.11) and integration into classical-quantum workflows from C# or Python. The 2024 rewrite of Q# (the "Modern QDK") substantially simplified the toolchain; the compiler — Microsoft's own implementation — emits QIR for the targets that consume it.

**pyQuil** (Rigetti). The Python entry to Quil. Mainly used by people running on Rigetti hardware (the current Ankaa generation; the earlier Aspen line is retired) via the Rigetti Quantum Cloud Service.

**Amazon Braket SDK** (AWS, open source). A Python SDK that targets the **Amazon Braket** service, which proxies access to multiple hardware vendors (IonQ, IQM, Rigetti, QuEra, AQT as of mid-2026; Oxford Quantum Circuits left the roster in 2024) and AWS-hosted simulators under one API. The SDK can also accept OpenQASM 3 and parameterized circuits from PennyLane.

**Other ecosystems**: **Quipper** (a Haskell-embedded DSL, mostly used in academic resource-counting work), **Silq** (a typed quantum language with automatic uncomputation), and various smaller frameworks (ProjectQ, Strawberry Fields for photonics) are still active but occupy specialist niches.

Practical recommendation: **start with Qiskit for IBM hardware; start with Cirq for Google hardware; start with PennyLane for variational and QML work; use pytket whenever you need to retarget a circuit across vendors**. None of these choices is binding — most frameworks can exchange circuits through OpenQASM 3 within a supported subset (coverage is partial and sometimes one-way) — but the path-of-least-resistance is materially smoother when the SDK and the target vendor match.

## 23.5 Pulse-Level Programming

At the gate/assembly layer a "gate" is an abstract unitary; below it, on hardware, a gate is implemented by analog control — on superconducting devices a complex envelope $\Omega(t)$ played into a control line at the qubit's transition frequency for a calibrated duration, on other modalities laser or RF fields with their own parameters. **Pulse-level programming** is the layer beneath the gate abstraction that lets a user write that control directly, overriding the compiler's default calibration (the program still passes validation, scheduling, and safety limits on the way down).

The motivating use cases are narrow but real. **Gate calibration and tune-up**: Rabi, DRAG, and error-amplification experiments that sweep pulse amplitude, phase, or duration directly (standard RB and gate-set tomography, by contrast, work at the circuit level and need no pulse access). **Custom gates**: a particular two-qubit unitary that the compiler does not decompose efficiently into the native set, but which can be realized by a single shaped pulse on the cross-resonance drive. **Quantum-optimal-control workflows**: GRAPE-style or CRAB-style numerical optimization of pulse shapes for a target unitary, possibly noise-aware.

The interfaces:

- **Pulse-level calibration** via OpenQASM 3 `defcal` blocks — the language-level home for gate-to-pulse definitions. (Qiskit's own `qiskit.pulse` API was deprecated in Qiskit 1.3 and **removed in Qiskit 2.0** (2025), alongside IBM's withdrawal of pulse-level control from its cloud QPUs. A `defcal` override is a language capability, not a promise of backend access: a provider that has withdrawn pulse control — IBM's cloud endpoints, notably — will reject or ignore user calibrations, so pulse programming in practice lives in the vendor stacks that still accept it.)
- **Quil-T** (Rigetti) — the original pulse-level IR, structurally similar.
- **Trapped-ion cloud services** generally expose gate-level access only; pulse customization stays with the vendor's control team (research ion-trap labs customize pulses extensively, but that is not a cloud product). Contributing reasons: the native two-qubit gates are already very high fidelity, and centralized laser control, calibration complexity, and safety make user pulse access costly to offer.

Two warnings. First, pulse-level programs are calibration-dependent: an envelope that works on `qubit[3]` today may need re-tuning next week as the qubit's frequency drifts. Production workflows that use pulse-level overrides bind them to a calibration ID and revalidate on a cadence matched to the drift — not necessarily before every batch. Second, the compiler's default calibrations have usually been tuned by the vendor's calibration team and outperform user-written pulses except in narrow research contexts; reach for `defcal` when you have a specific reason, not as a default.

## 23.6 Transpilation

**Transpilation** is the compilation step that takes a high-level circuit and emits a *device-executable* circuit. The Qiskit-specific verb is now standard across the field; tket calls it "compilation", Cirq calls it "optimization and routing", but the pipeline is the same.

The canonical pipeline has four stages:

1. **Gate decomposition** — rewrite every gate into the device's *native gate set* (the universal subset the hardware actually implements: see Chapter 22). A Toffoli, for example, costs 6 CNOTs plus single-qubit gates in the standard ancilla-free construction over CNOT + single-qubit gates (relative-phase variants, ancillas, connectivity, and a different native set all change the count); on a trapped-ion device with native arbitrary-angle $XX$/$ZZ$-type entanglers the decomposition is shorter.
2. **Routing** — map logical qubits to physical qubits and insert SWAPs so that every two-qubit gate is between *connected* physical qubits (§23.7).
3. **Optimization** — peephole rewrites, rotation merging, template matching, synthesis-based optimization (§9.13). Optimization runs both before and after routing because SWAP insertion creates new patterns that benefit from re-optimization.
4. **Scheduling** — assign concrete start times and durations to every operation, respecting the device's instruction timing model (§23.8).

In Qiskit the entry point is `transpile(circuit, backend, optimization_level=N)`. Level 0 only does the bare-minimum legality fixes; level 1 was the long-time default (the default moved to level 2 with Qiskit 1.3, late 2024 — check your installed version); level 3 runs heavier optimization passes and is what most published benchmarks use. The Cirq equivalent is `cirq.optimize_for_target_gateset`; the tket equivalent is `pytket.passes.SequencePass([...])` with a user-chosen list. All three frameworks let you inspect the pass list, plug in your own pass, or replace the whole pipeline.

Two metrics matter when comparing transpiler runs. The **two-qubit gate count** (CNOT count on superconducting devices, $ZZ$ or $XX$ count on ion traps) is the dominant fidelity cost; reducing it by 10% typically improves end-to-end success probability by a meaningful margin. The **circuit depth in nanoseconds** — not in gate count, but in real time — determines how much $T_2$ decoherence accrues; on a device with $T_2 \approx 100~\mu s$, single-qubit gates of tens of nanoseconds, and two-qubit gates of hundreds of nanoseconds (§23.8), the serial budget is a few hundred to a couple of thousand gate durations — a crude scale, not a cliff: decoherence accrues continuously, and accumulated gate error usually dominates before the coherence window closes.

## 23.7 Routing

**Routing** (or **qubit mapping**) solves the following problem. The circuit names *logical* qubits $q_0, q_1, \ldots, q_{n-1}$. The device has *physical* qubits $Q_0, Q_1, \ldots, Q_{m-1}$, with $n \le m$, arranged on a coupling graph $G$ — heavy-hex on IBM superconducting devices, square lattice on Google, all-to-all on most ion traps. A two-qubit gate on logical $q_i, q_j$ can execute only if their currently-mapped physical qubits are adjacent in $G$. SWAP operations move logical qubits along the graph at a cost: each SWAP is 3 CNOTs on a superconducting device, with the corresponding fidelity hit.

The routing problem is to find an initial mapping and a sequence of SWAP insertions that minimizes some cost — usually a weighted combination of SWAP count, depth, and per-edge fidelity. It is NP-hard in general (initial placement resembles subgraph embedding; dynamic routing resembles token swapping), and in practice it is solved by heuristics. How close they come to optimal is usually unknown — the optimum itself is rarely computable at scale — though exact SAT/ILP formulations certify small instances and provide optimality gaps.

The standard heuristics:

- **SABRE** (SWAP-based bidirectional heuristic routing). Iterates forward and backward through the circuit, picking SWAPs that bring the most upcoming two-qubit gates closer to executable (with lookahead and decay heuristics, and repeated trials over initial layouts). The long-standing basis of Qiskit's default layout/routing passes; exact behavior depends on version and optimization level.
- **LightSABRE**. A reengineered variant that substantially improves runtime — and, per its authors, solution quality as well; recent Qiskit releases fold its improvements into the default passes.
- **Trivial mapping plus stochastic SWAP**. Cheaper, used at low optimization levels.
- **Architecture-aware initial mapping** ("layout selection"): heuristics that pick an initial logical-to-physical assignment based on the circuit's interaction graph rather than starting from the identity.

For genuinely all-to-all devices (a single trapped-ion chain), routing is trivial — every two-qubit gate is executable as written — and the transpiler skips this stage. Neutral-atom arrays can physically *rearrange* atoms, which converts SWAP chains into atom-movement and gate-zone scheduling that the compiler must plan — reconfigurable connectivity, not free all-to-all: motion time, heating and loss, interaction radius, and blockade constraints still bound which pairs can interact and when. Photonic connectivity is set by the interferometer graph together with the fusion/feedforward architecture. Even so, avoiding SWAP overhead is a real advantage of these platforms for circuits with non-local interactions, especially in early fault-tolerant regimes where SWAP overhead can dominate.

A practical observation: routing quality is the single most impactful transpiler choice on superconducting hardware. Running the same circuit through `optimization_level=1` and `optimization_level=3` can differ by 30–50% in SWAP count on a hard instance, and the success probability follows. If you only tune one transpiler knob, tune this one.

## 23.8 Scheduling

**Scheduling** assigns concrete time slots to every operation. The output is still an instruction program, but annotated with a *timetable*: gate $g$ starts at $t_g$ on qubit $q$, lasts $d_g$, and ends at $t_g + d_g$ — with start times and durations aligned to the hardware's clock granularity (the target's `dt`).

The constraints are mostly physical:

- **Gate durations** are not all equal. A single-qubit gate is often 20–50 ns on a superconducting device; a native entangler (ECR, CZ, iSWAP — a CNOT is synthesized from these) is 200–500 ns; a measurement is of microsecond scale, with reset a separately timed step after it. The scheduler reads these from the backend's calibration data.
- **Same-qubit serialization**: two gates on the same qubit cannot overlap in time.
- **Crosstalk avoidance**: gates on physically adjacent qubits may interfere if executed simultaneously. Some schedulers serialize or offset such gates, inserting idle time to avoid simultaneous-drive errors. (That idle time is *not* dynamical decoupling — DD means deliberate refocusing pulses placed into idles, §21.11, and costs pulses of its own.)
- **Measurement timing**: dispersive readout takes substantially longer than a gate; if the algorithm needs mid-circuit measurement followed by feedforward, the scheduler must reserve a `delay` block for the classical signal to land and propagate.

Two baseline policies anchor practice. **As-late-as-possible (ALAP)** schedules each operation as late as the data dependencies allow, pushing idle time toward the start of the circuit — valuable because idling in $|0\rangle$ before a qubit's first gate is far more benign than idling mid-superposition; it does not shrink the total makespan. **As-soon-as-possible (ASAP)** does the reverse, minimizing time-to-result and exposing slack at the end; useful when latency or feedback matters. Production schedulers add resource-constrained, alignment, crosstalk-aware, and DD-insertion policies beyond the two extremes.

The output of scheduling is a timed sequence of native instructions. Binding those instructions to calibrations and lowering them to pulse programs and sequencer code are further steps — often vendor-private — before the control electronics (Chapter 21) execute anything. From scheduling downward the stack grows increasingly hardware-specific.

## 23.9 Hardware-Aware Compilation

**Hardware-aware compilation** widens the transpiler's view from "respect connectivity and native gate set" to "exploit everything we know about *this specific device*". The information sources are the per-qubit and per-edge calibration data — single-qubit gate fidelities, two-qubit gate fidelities, readout fidelities, $T_1$ and $T_2$ values, gate durations, crosstalk maps — which vendors expose through their SDKs to varying degrees: fidelities and coherence times commonly, crosstalk maps and pulse-level data rarely (the interfaces are the Target/properties objects in Qiskit and per-processor calibration objects in Cirq's Engine API; names shift across versions). Calibration data also goes stale — a decision bound at compile time may not match the device at execution time.

Three concrete optimizations.

**Best-qubit selection.** Among the many possible mappings of logical to physical qubits, pick one whose two-qubit gate fidelities along the circuit's interaction graph are best. On a 127-qubit IBM device with two-qubit gate errors ranging from $5 \times 10^{-3}$ to $5 \times 10^{-2}$ across the chip, under a simple independent-error model the best mapping can multiply out to several times the success probability of a poor (but legal) mapping — the actual factor depends on the circuit and on error structure the scalar model ignores.

**Decomposition choice.** A `CCX` (Toffoli) can be decomposed several ways with different CNOT counts and different patterns of control-target directions. The hardware-aware transpiler picks the decomposition whose entanglers land on the best-fidelity edges — ideally jointly with placement and routing, since a decomposition chosen before layout can be undone by the SWAPs it forces.

**Pulse-level tweaks.** For high-fidelity edges, the default calibration can sometimes be replaced with a tighter pulse (shorter duration, lower leakage); the transpiler can apply this only on the edges where the calibration has actually been verified.

Where a vendor exposes calibration data — not all do, especially analog devices and restricted services — hardware-aware compilation is worthwhile: Qiskit's higher optimization levels use noise-aware layout when target data is available, tket accepts device coupling maps and fidelity weights in its mapping passes, and Cirq's Engine exposes per-processor calibration objects (exact pass and method names move between versions; check current documentation).

## 23.10 Noise-Aware Compilation

**Noise-aware compilation** is a strict generalization of hardware-aware compilation: it uses not just calibration *fidelities* but also a *noise model* — Pauli error rates, $T_1$/$T_2$ time constants, coherent-error parameters — to predict the success probability of candidate compilations and choose accordingly.

The simplest noise-aware criterion is **success-probability estimation**: model each gate as a depolarizing channel derived from its measured infidelity (the conversion carries dimension- and convention-dependent factors), multiply through the circuit, and compare candidate compilations by the resulting score. This is fast enough to run inside the transpiler loop — and it is a first-order heuristic: independent stochastic noise only, no coherent buildup, crosstalk, or idle error, so it ranks candidates usefully without predicting actual success probability.

More sophisticated approaches.

**Dynamical decoupling (DD).** Insert sequences of $X$ or $XY4$ pulses into idle slots so that low-frequency noise averages out. The pattern is structurally identical to NMR refocusing pulses, and the first-order cancellation (a Magnus-expansion result) holds under the sequence's symmetry assumptions and reasonably ideal pulses — finite pulse error, transverse noise, and high-frequency spectral features remain. Qiskit ships a `PadDynamicalDecoupling` pass and tket has DD support; neither is necessarily applied automatically at any optimization level — check your version's defaults, and validate that the inserted pulses actually help, since they add error and crosstalk of their own.

**Pauli twirling.** Conjugate a noisy gate with random Pauli operators averaged over many shots. The effective noise channel becomes a Pauli channel even if the underlying noise was not, which makes subsequent error-mitigation passes (Chapter 18) simpler. Implemented via Qiskit's transpiler twirling passes and Qiskit Runtime's twirling options. (The `mthree` toolkit is *readout*-error mitigation, a different layer.)

**Probabilistic error cancellation (PEC).** Sample circuits from a quasi-probability distribution chosen so that the noise channel inverts in expectation. The unbiasedness has a price: sampling overhead grows with the quasi-probability norm — often exponentially in total circuit error — so PEC can be unusably expensive at depth. Exposed through Qiskit Runtime Estimator resilience options (option names and levels change across Runtime versions).

**Zero-noise extrapolation (ZNE).** Run the circuit at several effective noise scales (achieved by gate stretching or by deliberate folding) and extrapolate the result to zero noise. Implemented in `mitiq` (an SDK-agnostic mitigation library) and exposed in Qiskit Runtime.

The line between "noise-aware compilation" and "error mitigation" (Chapter 18) is conventional: the same techniques appear in both. The compilation framing is useful because it lets the toolchain orchestrate mitigation — with two caveats: mitigation changes estimator bias, variance, and cost, so the toolchain should report what it did (transformations, overhead, raw versus mitigated results) rather than silently deciding; and unlike compilation proper, mitigation does not preserve program semantics — it estimates ideal quantities from extra noisy executions.

## 23.11 Resource Estimation

**Resource estimation** answers a different question from transpilation: not "what is the compiled circuit?" but "how big a quantum computer would I need to run this?". The output is a count — physical qubits, surface-code patches, logical T-gates, magic-state distillation factories, runtime in seconds — for a target circuit at a target error budget.

The motivating use case is **fault-tolerant resource forecasting** for algorithms that have not yet been run, including the workhorse algorithms of practical interest (Shor's factoring on a 2048-bit RSA modulus, quantum chemistry for biologically relevant molecules, Trotterized lattice gauge theory). The standard reference workflow:

1. Start from a logical circuit at the algorithmic level (i.e., in terms of $T$, $H$, $S$, and CNOT, with no consideration of encoding).
2. Pick an error budget — usually $\epsilon \approx 10^{-2}$ or smaller end-to-end logical error.
3. Choose an error-correcting code — commonly the surface code in superconducting-oriented forecasts, though qLDPC, color, Floquet, bosonic, and ion-specific codes are active alternatives, and the right choice tracks the hardware's noise structure and connectivity rather than the calendar.
4. Compute the logical-qubit and logical-cycle counts.
5. Apply the *space-time tradeoff* curves for the chosen code. These are distinct knobs: larger code distance buys lower logical error at more area per patch, and more parallel magic-state factories buy shorter runtime at more area.
6. Multiply through and report.

Microsoft's **Azure Quantum Resource Estimator** is the most widely used public tool: a Q# (or Qiskit) circuit goes in; a breakdown of physical qubits, runtime, magic-state-factory layout, and code parameters comes out (the `qsharp` Python package is its scripting entry point). The `PyZX` ecosystem (ZX-calculus T-count reduction) and `pytket`'s gate-statistics reporting offer logical-level T-counting that can feed such estimates — logical counts, not full fault-tolerant estimators in themselves.

A frequently-cited datapoint, current to 2026: factoring a 2048-bit RSA key with surface-code-encoded Shor's algorithm requires, in the widely cited Gidney–Ekerå-style scenario ($p_{\mathrm{phys}} = 10^{-3}$ and a specific cycle time, factory layout, connectivity, and failure budget — the scalar assumptions alone do not determine the answer), roughly $2 \times 10^7$ physical qubits and hours of runtime. Published RSA-2048 estimates across eras and architectures vary by considerably more than one order of magnitude; the resource estimator's value is not in giving "the" answer but in letting you sweep the assumptions and see the elasticity.

## 23.12 Simulation Back-Ends

A **simulator** is a classical program that computes the output of a quantum circuit. Simulators serve four roles: development (debug a circuit without burning device time), verification (compare a small-scale execution against the exact answer), benchmarking (compute classical baselines for quantum advantage claims), and education. Different simulator families have different cost models.

**State-vector simulator.** Stores the full $2^n$-dimensional state vector and applies each gate as a matrix-vector product. Memory cost $O(2^n)$ — the binding constraint. A single-precision complex state vector at $n = 30$ qubits is 8 GB; at $n = 36$ qubits, 512 GB; at $n = 40$, 8 TB. Distributed implementations push the frontier to about $n = 50$ on the largest supercomputers. Standard in Qiskit Aer (`AerSimulator(method='statevector')`), Cirq's default simulator, Quimb, and Intel-QS.

**Tensor-network simulator.** Represents the state (or the circuit's contraction) as a tensor network and contracts it in an order chosen to minimize the intermediate bond dimensions. The cost scales not with $n$ but with the *entanglement structure* of the circuit: low-entanglement and shallow circuits can be simulated at $n = 100$ or more, while heavily entangled deep circuits lose most of the advantage (though amplitude-targeted contraction, slicing, and approximation can still beat brute force in specific regimes). Tooling: `quimb` (tensor-network simulation), `cuQuantum`'s `cuTensorNet` (GPU contraction library), and `cotengra` (contraction-path search) — building blocks more than turnkey simulators. Tensor-network methods later cut the estimated classical cost of the 2019 Google "quantum supremacy" circuits by orders of magnitude — narrowing, though not erasing, the claimed separation; the experimental sampling result itself stands.

**Stabilizer simulator.** Restricted to Clifford circuits (gates from the Clifford group: $H$, $S$, CNOT, Pauli measurements). The Gottesman–Knill theorem (§8.10) gives a polynomial-time classical simulation. Standard in `stim` (the de facto stabilizer simulator since 2021, by Craig Gidney) and Qiskit's `Clifford` class. Used heavily in quantum-error-correction research, where Clifford circuits dominate.

**Density-matrix simulator.** Stores the $2^n \times 2^n$ density matrix to model noisy evolution exactly. Memory cost $O(4^n)$ — the state-vector exponent doubled — so the qubit ceiling is roughly half. Concretely, at double precision $n = 15$ is $\sim$16 GB (workstation territory) and $n = 20$ is $\sim$16 TB — supercomputer territory, not merely "with effort" (even single precision still needs 8 TB). Used when the noise model matters and Monte Carlo sampling of pure-state trajectories is insufficient. Standard in Qiskit Aer (`method='density_matrix'`) and QuTiP.

**Trajectory simulator.** Runs many pure-state samples through a Monte Carlo unravelling of the noisy dynamics. Memory cost $O(2^n)$ per trajectory; statistical cost grows with the noise rate and the desired expectation-value precision. The natural method when noise is weak and many shots are acceptable.

**Classical shadows** (Chapter 11) deserve a note here as a *measurement/estimation* technique, not a simulator: they compress randomized-measurement data so that many observables can be estimated from few samples. On hardware they cut the measurement burden of variational workloads; *generating* shadow data classically still requires simulating samples by one of the methods above.

**Specialized**: matchgate / fermionic simulators (polynomial-time for the fermionic linear-optics subclass), photonic simulators (`Strawberry Fields`, `Piquasso`), and Boson-sampling reference implementations.

Selecting a simulator is a working-engineer decision: state-vector for small circuits with arbitrary gates; stabilizer for QEC; tensor-network for shallow large-$n$ circuits; density-matrix or trajectory for noise studies — with classical shadows as the measurement-side companion when the outputs of interest are many local expectation values.

## 23.13 Hybrid Quantum-Classical Orchestration

Many algorithms — VQE, QAOA, quantum-machine-learning training loops, error-mitigation routines — are structurally a tight loop: prepare a parameterized circuit, measure expectation values, feed them to a classical optimizer, update the parameters, repeat. The naive implementation submits each iteration as a separate cloud job, which on a queued backend can mean minutes of waiting for milliseconds of quantum execution. **Hybrid runtimes** shorten that loop by batching submissions and giving the classical side priority access near the service — not necessarily hosting the optimizer physically beside the QPU; the real-time controller path (§21.8) stays separate.

A prominent model — IBM's — is the **Qiskit Primitives** abstraction; Braket Hybrid Jobs, Azure sessions, and provider SDKs play analogous roles elsewhere.

- **Sampler** takes a parameterized circuit, a list of parameter bindings, and a number of shots; returns a (quasi-)probability distribution over measurement outcomes for each binding.
- **Estimator** takes a parameterized circuit, a list of observables, and a list of parameter bindings; returns expectation values $\langle O \rangle$ for each (binding, observable) pair.

Both Primitives expose a `run(...)` method and an asynchronous result object. Crucially, they accept *lists* of parameter bindings in one call — so a single submission can sweep an entire optimizer step's worth of evaluations — and they can execute inside a **Session**, a server-side construct that gives the user's iterations priority against the queue for a bounded window — the documented semantics are priority and timeouts, not a continuously reserved exclusive slot. The structural pattern is

```text
with Session(backend) as session:
    estimator = Estimator(session=session)
    for step in range(num_steps):
        values = estimator.run(circuit, observables, parameter_values).result()
        parameter_values = classical_update(values)
```

(Pseudocode in the spirit of the API: class names and signatures have shifted across Runtime versions — current code uses the V2 primitives and execution modes — and `classical_update` here runs in the client process, not server-side.)

Comparable abstractions exist elsewhere: **Amazon Braket Hybrid Jobs** ship a containerized classical workload to AWS adjacent to the QPU; **Azure Quantum Sessions** play the same role for Microsoft's stack; **PennyLane**'s `QNode` is a differentiable callable that integrates with PyTorch/JAX autodiff — a local programming abstraction rather than a hosted runtime (execution is often synchronous). **TensorFlow Quantum** integrated Cirq circuits into TensorFlow training loops, primarily against simulators — it was never a general hosted runtime for Google hardware — and now sees only occasional compatibility releases.

Two patterns specific to variational programming.

**Parameter-shift gradients.** For a single-parameter rotation $R(\theta)$ appearing in an expectation value $f(\theta) = \langle \psi(\theta) | O | \psi(\theta) \rangle$, the exact derivative is $f'(\theta) = \tfrac{1}{2}\bigl(f(\theta + \tfrac{\pi}{2}) - f(\theta - \tfrac{\pi}{2})\bigr)$. This is not a finite difference — the identity is exact for gates of the standard rotation form $e^{-i\theta P/2}$ with $P^2 = I$; on hardware the *estimate* of each term still carries shot noise and drift. PennyLane, Qiskit's `EstimatorGradient`, and TensorFlow Quantum all implement parameter-shift natively. Higher-order variants (general parameter shift, stochastic parameter shift) handle multi-Pauli generators and continuous gates.

**Sessions vs one-shot.** Pricing models vary by provider and plan — some bill reserved or elapsed time, others per task or per shot — so the economics are not universal. The robust claim is about latency: an iterative workload that re-queues on every step pays queue time per iteration, while a session pays it roughly once. Whether a session is also *cheaper* for a 50-step × 20-evaluation × 4000-shot VQE run depends on the billing model, the workload's duty cycle, and idle time inside the session — model both before assuming.

## 23.14 Verification and Debugging of Quantum Programs

Quantum programs are hard to debug. The state is exponential and cannot be read out noninvasively; measurement disturbs it; amplitudes are not inspectable mid-run the way classical variables are. The tooling that has matured to address this falls into several families.

**Statevector-replay debugging.** Run the circuit on a state-vector simulator with the same SDK and inspect the intermediate state vectors. Qiskit's `Statevector.from_instruction(circuit)` (or Aer's save-state instructions), Cirq's simulator `simulate_moment_steps`, and PennyLane's `qml.Snapshot`/`qml.snapshots` support this. The constraint is the qubit count — past about 30 qubits, replay debugging becomes infeasible and other techniques take over.

**Assertion-based debugging.** Annotate the circuit with classical assertions on intermediate measurements ("after this Toffoli, the ancilla should be $|0\rangle$ if the inputs were classical"); a tool either statically checks them (Q# does this for some patterns) or dynamically samples to verify. Statistical assertion methods (state, entanglement, and superposition assertions via repeated measurement and hypothesis tests) come out of the research literature rather than a single official API.

**Tomographic debugging.** When the circuit is small enough, run state or process tomography on the prepared state or the implemented unitary and compare against the design. State tomography needs on the order of $4^n$ parameters' worth of measurement settings — process tomography $\sim 16^n$ — with shot counts on top set by the target precision, so state tomography is practical for a handful of qubits and process tomography for fewer still.

**Cross-platform compilation diff.** Compile the same logical circuit with Qiskit, tket, and Cirq and compare — first the compiled artifacts themselves (canonicalized unitaries for small circuits; distributions with bit-order normalization), then, where a common provider path exists, hardware outputs. A disagreement reveals a discrepancy — compiler bug, gate-direction confusion, endianness mismatch — though localizing which takes further bisection. (Endianness is the perennial suspect: Qiskit orders qubits little-endian, this book big-endian; in the author's experience no single issue has eaten more debug time.)

**Quantum-software unit testing.** Ordinary `pytest` plus a local simulator (Qiskit Aer, Qiskit Runtime's local testing mode, Cirq's simulator, or PennyLane's `default.qubit`) lets you write unit tests that run small circuits and assert on the output distribution against a fixed seed. The discipline of writing such tests as the program grows is among the most effective debugging practices available.

## 23.15 Integration with Classical ML Frameworks

Quantum machine learning is among the heaviest sustained users of the variational stack (alongside chemistry and optimization), and its integration with the classical ML toolchain has matured substantially.

**PennyLane**'s QNodes integrate with PyTorch, JAX, and TensorFlow interfaces. A quantum node can be differentiated through (parameter-shift on hardware where supported; backpropagation or adjoint on simulators), composed with classical layers via the provided wrappers — `qml.qnn.TorchLayer` handles the tensor plumbing needed to sit beside `nn.Linear`/`nn.Conv2d` — and trained with standard optimizers (Adam, RMSProp). The wrapped module's *parameters* save and load through a `state_dict`; the circuit and device configuration are reconstructed from code.

**TensorFlow Quantum** wraps Cirq circuits as TF layers with differentiator support (parameter-shift among the options). It ties the user to TensorFlow and to Cirq's circuit model — and the project was dormant through 2024–25 and now receives only occasional compatibility releases (v0.7.5 December 2025, v0.7.6 February 2026), so prefer PennyLane for new work.

**Qiskit Machine Learning** offers `EstimatorQNN` (expectation-value outputs) and `SamplerQNN` (probability-distribution outputs); a `TorchConnector` wraps a QNN as a PyTorch module, and separate classifier/regressor classes provide the scikit-learn-style API. Convenient for Qiskit-native users, though the integration involves more explicit wrapping than PennyLane's.

The practical effect of these integrations is that a modern QML pipeline looks structurally identical to a standard classical ML pipeline — `optimizer.zero_grad(); loss = model(batch); loss.backward(); optimizer.step()` — with the quantum part hidden inside a layer object whose every forward and backward pass may launch many circuits, shifted parameters, observable groups, and shots against a remote service: the familiar syntax hides radically different latency, variance, and cost. Whether the *training* converges to anything useful is the open scientific question of the field (Chapter 30 takes it up).

The bridge from this chapter to Chapter 24: with the compilation pipeline understood, we can ask what those layers below the pipeline — the simulators that stand in for hardware during development — actually do. Chapter 24 takes the classical-simulation question seriously: what circuits can a classical computer simulate efficiently, where does that frontier lie in 2026, and what does "quantum advantage" actually mean once the simulators get good at the easy cases?

**Sanity checks before moving on.**

1. Take a three-gate Qiskit circuit ($H$ on qubit 0, CNOT $0 \to 1$, measure both) and serialize it to OpenQASM 3. Read the output and identify which lines correspond to which gate.
2. Build a five-qubit circuit whose two-qubit gates connect *non-adjacent* qubits (say, CNOTs between qubits 0–3 and 1–4, plus a few redundant rotations) and run it through `transpile(circuit, backend, optimization_level=N)` for $N = 0, 1, 3$ against an IBM backend or a fake-backend target, with a fixed seed. Compare the two-qubit gate count after ISA translation (the native entangler may be ECR, not CNOT) and the scheduled duration — layer depth is not nanoseconds; convert through the target's timing model. (A Bell pair on adjacent qubits is too trivial to distinguish the levels.)
3. Explain what an all-to-all-connected device (a single trapped-ion chain) removes from the routing stage — SWAP insertion — and what compilation work remains: pair selection, scheduling, calibration-aware placement, and, on neutral atoms, motion planning within interaction-radius and blockade constraints (their connectivity is reconfigurable, not free). How does the cost model of an algorithm like Grover's change when nonlocal two-qubit gates need no SWAP chains but keep pair-dependent durations and errors?
4. For a parameterized rotation $R_X(\theta)$ inside an expectation value $f(\theta)$, write out the parameter-shift formula and verify on a single-qubit example that it agrees with the analytic derivative.
5. Estimate the state-vector memory required to simulate $n = 32$ qubits with single-precision complex amplitudes. At what $n$ does the requirement exceed 1 TB?

---

[← Previous: Chapter 22](22-hardware-engineering-metrics.md) · [Table of Contents](../../README.md) · [Next: Chapter 24 →](24-classical-simulation-of-quantum-systems.md)
