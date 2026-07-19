# Factcheck — §23 Quantum Programming, Compilation, and Tooling

Mirrors `book/part-09-hardware-and-software/23-quantum-programming-compilation-and-tooling.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §23.1 — OpenQASM 3 as IBM runtime serialization format

- **Claim** (anchor): "a Qiskit circuit is typically serialized to OpenQASM 3 before it leaves the client, and the IBM runtime parses that text into its own internal representation before scheduling"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Describes the IBM Quantum submission pipeline; perishable implementation detail.

## §23.2 — OpenQASM 2 origin and acceptance

- **Claim** (anchor): "Originally an IBM project, OpenQASM 2 was a minimal gate-list format"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.2 — OpenQASM 3 finalization date

- **Claim** (anchor): "OpenQASM 3, finalized in 2021 and now the standard target as of 2026"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific year claim; verify against the OpenQASM 3 spec publication timeline.

## §23.2 — OpenQASM 3 new features

- **Claim** (anchor): "typed classical variables, control flow (`if`, `while`, `for`), real-time arithmetic on measurement outcomes, parameterized gate definitions, explicit timing (`delay`, `box`, `duration`), and pulse-level extensions via `defcal`"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Enumeration of OpenQASM 3 language features; check against published grammar/spec.

## §23.2 — OpenQASM 3 tooling artifacts

- **Claim** (anchor): "It has a published grammar (ANTLR), a reference parser (`qasm3` Python package), and round-trippable mappings from Qiskit, tket, Cirq, and the AWS Braket SDK"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claims about specific tooling; package name and round-trip support are perishable.

## §23.2 — OpenQASM 3 vendor acceptance

- **Claim** (anchor): "OpenQASM 3 is also the format IBM Quantum, IonQ, and several other vendors accept on their submission endpoints"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor endpoint format; verify against IBM Quantum and IonQ documentation.

## §23.2 — OpenQASM dialect differences

- **Claim** (anchor): "gate-name conventions differ between dialects (`u3` in OpenQASM 2 vs `U` in OpenQASM 3"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.2 — OpenQASM 3 conditional-branch hardware support

- **Claim** (anchor): "assume conditional branches and real-time arithmetic work on IBM dynamic-circuit hardware and Quantinuum H-series, and check the docs everywhere else"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware-specific claim about which backends support OpenQASM 3 control flow.

## §23.3 — Quil authorship and design

- **Claim** (anchor): "Quil is Rigetti's quantum instruction language and the native input format for their hardware"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.3 — Quil-T pulse-level extension

- **Claim** (anchor): "its **Quil-T** extension, which exposes pulse-level control as first-class syntax. A `DEFCAL` block specifies the waveform, frequency, and duration that implement a given logical gate on a given qubit"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.3 — OpenQASM 3 defcal origin

- **Claim** (anchor): "OpenQASM 3's `defcal` blocks are conceptually a port of this idea"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution claim linking OpenQASM 3 defcal design to Quil-T.

## §23.4 — Qiskit SDK 1.x composition

- **Claim** (anchor): "The current shipping line is the Qiskit SDK 1.x (a slimmed-down core with the transpiler, circuit construction, and quantum-info modules) paired with Qiskit Runtime"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Version-specific claim; highly perishable.

## §23.4 — Qiskit Runtime Primitives

- **Claim** (anchor): "Qiskit Runtime** (the cloud-side execution service, exposing the `Sampler` and `Estimator` *Primitives*"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Qiskit Aer role

- **Claim** (anchor): "Qiskit Aer is the local simulator backend"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Cirq primary target

- **Claim** (anchor): "Cirq (Google, open source). Targets Google's superconducting hardware and the Quantum Engine cloud service"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Cirq GridQubit design

- **Claim** (anchor): "Cirq's design emphasizes gate-level circuit construction with explicit qubit objects (a `GridQubit` knows its physical position)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Cirq TensorFlow Quantum integration

- **Claim** (anchor): "it is the primary entry point for TensorFlow Quantum for hybrid quantum-classical ML workloads"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — PennyLane device-agnostic model

- **Claim** (anchor): "PennyLane's distinguishing feature is its *device-agnostic* model: the same `qnode` runs on Xanadu photonic hardware, IBM superconducting backends (via a Qiskit plugin), IonQ trapped-ion backends, AWS Braket, or a local simulator"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — PennyLane parameter-shift gradients

- **Claim** (anchor): "the framework computes parameter-shift gradients that propagate through PyTorch or JAX"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — tket open-source package name

- **Claim** (anchor): "tket** (Quantinuum, open source as `pytket`)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — tket interoperability

- **Claim** (anchor): "pytket parses circuits from Qiskit, Cirq, OpenQASM, Quil, and others, applies a uniformly excellent set of optimization passes, and emits circuits for almost any backend"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Q# and QDK description

- **Claim** (anchor): "Q# (Microsoft). A standalone typed quantum programming language with its own compiler, shipped as the Quantum Development Kit (QDK) and integrated into Azure Quantum"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Q# 2024 rewrite

- **Claim** (anchor): "The 2024 rewrite of Q# (the "Modern QDK") simplified the language considerably; it now compiles to QIR and uses LLVM-based backends"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific year and architectural claim; highly perishable.

## §23.4 — pyQuil hardware targets

- **Claim** (anchor): "pyQuil (Rigetti). The Python entry to Quil. Mainly used by people running on Rigetti Aspen and Ankaa hardware via the Rigetti Quantum Cloud Service"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware product names and service name are perishable.

## §23.4 — Amazon Braket SDK hardware proxies

- **Claim** (anchor): "Amazon Braket SDK (AWS, open source). A Python SDK that targets the Amazon Braket service, which proxies access to multiple hardware vendors (IonQ, Rigetti, QuEra, Oxford Quantum Circuits) and AWS-hosted simulators under one API"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: List of supported hardware vendors is perishable; verify against AWS Braket docs.

## §23.4 — Quipper language embedding

- **Claim** (anchor): "Quipper (a Haskell-embedded DSL, mostly used in academic resource-counting work)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Silq automatic uncomputation

- **Claim** (anchor): "Silq (a typed quantum language with automatic uncomputation)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.5 — Qiskit Pulse deprecation

- **Claim** (anchor): "Qiskit Pulse** (now exposed through OpenQASM 3 `defcal` blocks; the legacy `qiskit.pulse` API was deprecated in 2024)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific deprecation date is highly perishable; verify against Qiskit changelog.

## §23.6 — Toffoli decomposition gate count

- **Claim** (anchor): "A Toffoli, for example, decomposes into 6 CNOTs plus single-qubit gates on a superconducting target"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard decomposition; could also be verified by derivation/convention.

## §23.6 — Qiskit transpile API and optimization levels

- **Claim** (anchor): "In Qiskit the entry point is `transpile(circuit, backend, optimization_level=N)`. Level 0 only does the bare-minimum legality fixes; level 1 is the default; level 3 runs heavier optimization passes and is what most published benchmarks use"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API and default-level claim; perishable across Qiskit versions.

## §23.6 — Cirq transpile equivalent

- **Claim** (anchor): "The Cirq equivalent is `cirq.optimize_for_target_gateset`"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API name is highly perishable.

## §23.6 — tket transpile equivalent

- **Claim** (anchor): "the tket equivalent is `pytket.passes.SequencePass([...])`"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API name is highly perishable.

## §23.6 — Gate timing budget on superconducting hardware

- **Claim** (anchor): "on a device with $T_2 \approx 100~\mu s$ and gate times around 50 ns, the depth budget is roughly $2000$ gate slots"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Quantitative hardware parameter claim; check against IBM/Google hardware specs.

## §23.7 — IBM heavy-hex coupling topology

- **Claim** (anchor): "heavy-hex on IBM superconducting devices, square lattice on Google, all-to-all on most ion traps"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.7 — SWAP cost in CNOTs

- **Claim** (anchor): "each SWAP is 3 CNOTs on a superconducting device"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard decomposition; verify against convention in §2/Appendix A or standard reference.

## §23.7 — Routing NP-hardness

- **Claim** (anchor): "It is NP-hard in the general case (it reduces to subgraph isomorphism plus a token-swapping problem)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Complexity claim with specific reduction; check theoretical CS literature.

## §23.7 — SABRE algorithm and Qiskit default

- **Claim** (anchor): "SABRE (SWAP-based bidirectional heuristic routing). Iterates forward and backward through the circuit, picking SWAPs that bring the most upcoming two-qubit gates closer to executable. Default in Qiskit since 2020"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Algorithm description and adoption date; verify against Qiskit release notes.

## §23.7 — LightSABRE algorithm role

- **Claim** (anchor): "LightSABRE. A faster variant that gives up some optimality for considerably better scaling; default for large circuits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.7 — Routing SWAP-count impact

- **Claim** (anchor): "Running the same circuit through `optimization_level=1` and `optimization_level=3` can differ by 30–50% in SWAP count on a hard instance"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Quantitative performance claim; check Qiskit benchmarks or published comparisons.

## §23.8 — Gate durations on superconducting hardware

- **Claim** (anchor): "A single-qubit gate is often 20–50 ns on a superconducting device; a CNOT is 200–500 ns; a measurement plus reset can be a microsecond or more"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Quantitative hardware timing figures; verify against IBM/Google hardware docs.

## §23.9 — IBM 127-qubit device error range

- **Claim** (anchor): "On a 127-qubit IBM device with two-qubit gate errors ranging from 5 times 10^{-3} to 5 times 10^{-2} across the chip"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific qubit count and error range; verify against IBM Quantum device calibration data.

## §23.9 — Qiskit hardware-aware API

- **Claim** (anchor): "Qiskit's transpiler at `optimization_level=3` does this by default; tket exposes it through `DefaultMappingPass(arc, ...)` with the device's coupling map and fidelity weights"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API names are perishable; verify against pytket documentation.

## §23.10 — Dynamical decoupling Magnus expansion justification

- **Claim** (anchor): "The pattern is structurally identical to NMR refocusing pulses (and has the same theoretical justification: a fast drive averages the slow noise away before it can accumulate — first-order cancellation in the perturbation series control theorists call the Magnus expansion)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Theoretical claim linking DD to NMR; well-known but verify the Magnus expansion characterization.

## §23.10 — Qiskit PadDynamicalDecoupling and tket DD

- **Claim** (anchor): "Both Qiskit (`PadDynamicalDecoupling`) and tket apply DD automatically at high optimization levels"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API name and default behavior; perishable.

## §23.10 — Pauli twirling implementation

- **Claim** (anchor): "Implemented in Qiskit's `PauliTwirl` and the `mthree` mitigation toolkit"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.10 — PEC in Qiskit Runtime

- **Claim** (anchor): "Implemented in Qiskit Runtime's `Estimator` as the `pec` resilience level"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API-level claim; perishable.

## §23.10 — ZNE in mitiq and Qiskit Runtime

- **Claim** (anchor): "Implemented in `mitiq` (an SDK-agnostic mitigation library) and exposed in Qiskit Runtime"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.11 — RSA-2048 resource estimate

- **Claim** (anchor): "factoring a 2048-bit RSA key with surface-code-encoded Shor's algorithm under standard parameter assumptions ($p_{\mathrm{phys}} = 10^{-3}$, target $\epsilon = 10^{-2}$, magic-state-distillation overhead) requires roughly $2 \times 10^7$ physical qubits and several hours of runtime"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Highly cited quantitative resource estimate; verify against published resource-estimation papers (e.g., Gidney & Ekerå 2021 or more recent estimates).

## §23.11 — Azure Quantum Resource Estimator

- **Claim** (anchor): "Microsoft's Azure Quantum Resource Estimator is the most mature publicly-available tool: a Q# (or Qiskit) circuit goes in; a JSON breakdown of physical qubits, runtime, magic-state-factory layout, and surface-code parameters comes out"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Tool description and input/output format; verify against Azure Quantum documentation.

## §23.11 — PyZX and pyLIQUi|> T-counting

- **Claim** (anchor): "The `PyZX` and `pyLIQUi|>` ecosystems offer logical-level T-counting passes that feed those estimators"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.12 — State-vector simulator memory cost

- **Claim** (anchor): "A single-precision complex state vector at n = 30 qubits is 8 GB; at n = 36 qubits, 512 GB; at n = 40, 8 TB"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Arithmetic claim verifiable by derivation (2^n complex64 bytes); can cross-check via derivation.

## §23.12 — State-vector distributed simulation frontier

- **Claim** (anchor): "Distributed implementations push the frontier to about n = 50 on the largest supercomputers"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about HPC state-of-the-art; perishable.

## §23.12 — State-vector simulator implementations

- **Claim** (anchor): "Standard in Qiskit Aer (`AerSimulator(method='statevector')`), Cirq's default simulator, Quimb, and Intel-QS"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.12 — Tensor-network simulator tools

- **Claim** (anchor): "Standard in `quimb`, `cuQuantum`'s `cuTensorNet`, and `cotengra` (the contraction-path search library)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.12 — Google supremacy rebuttal by tensor-network simulation

- **Claim** (anchor): "The 2019 Google "quantum supremacy" experiment was rebutted in part by tensor-network simulations"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Historical claim; verify against published rebuttals (e.g., Pan & Zhang 2022 or similar).

## §23.12 — stim stabilizer simulator

- **Claim** (anchor): "Standard in `stim` (the de facto stabilizer simulator since 2021, by Craig Gidney) and Qiskit's `Clifford` class"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution (Craig Gidney) and year (2021) are checkable; verify against stim publication.

## §23.12 — Density-matrix simulator memory cost

- **Claim** (anchor): "Memory cost O(4^n) — twice the exponent of state-vector — so the qubit ceiling is roughly half: n = 15 comfortably, n = 20 with effort"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Arithmetic follows from 4^n = (2^n)^2; practical limits are hardware-dependent.

## §23.12 — Density-matrix simulator implementations

- **Claim** (anchor): "Standard in Qiskit Aer (`method='density_matrix'`) and QuTiP"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.13 — Qiskit Session billing model

- **Claim** (anchor): "Sessions are billed per reserved minute (whether or not the device is executing); one-shot submissions are billed per job and queued behind everyone else"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Billing policy is highly perishable; verify against IBM Quantum pricing documentation.

## §23.13 — Amazon Braket Hybrid Jobs

- **Claim** (anchor): "Amazon Braket Hybrid Jobs ship a containerized classical workload to AWS adjacent to the QPU"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.13 — Parameter-shift gradient formula

- **Claim** (anchor): "the exact derivative is $f'(\theta) = \tfrac{1}{2}\bigl(f(\theta + \tfrac{\pi}{2}) - f(\theta - \tfrac{\pi}{2})\bigr)$. This is not a finite difference — it is exact, on hardware, for any single-qubit rotation generator of order two"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Mathematical claim with a specific exactness condition; verify against Mitarai et al. 2018 or Schuld et al. 2019.

## §23.13 — Parameter-shift implementations

- **Claim** (anchor): "PennyLane, Qiskit's `EstimatorGradient`, and TensorFlow Quantum all implement parameter-shift natively"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.14 — Qiskit endianness

- **Claim** (anchor): "Qiskit is little-endian; the book convention is big-endian; this difference alone has eaten more debug time than any other single issue in the field"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Qiskit little-endian convention is checkable against Qiskit documentation.

## §23.14 — Tomography shot cost

- **Claim** (anchor): "Tomography costs scale as $O(4^n)$ in shots, so this is practical for $n \leq 6$ or so"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result for full state tomography; could also point to §derivation.

## §23.15 — PennyLane ML framework integrations

- **Claim** (anchor): "**PennyLane**'s `qml.qnode` integrates as a layer in PyTorch, JAX, and TensorFlow"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.15 — TensorFlow Quantum architecture

- **Claim** (anchor): "TensorFlow Quantum wraps Cirq circuits as TF layers, with the parameter-shift gradient implemented as a TensorFlow op"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.15 — Qiskit Machine Learning estimator types

- **Claim** (anchor): "Qiskit Machine Learning** offers `EstimatorQNN` (expectation-value outputs) and `SamplerQNN` (probability-distribution outputs) as scikit-learn-compatible estimators and PyTorch modules"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API class names are perishable; verify against Qiskit Machine Learning documentation.
