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

- **Claim** (anchor): "**OpenQASM 3**, whose specification was first published in 2021 and continues to evolve, is a substantial expansion"
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

- **Claim** (anchor): "It has a published grammar with reference tooling (the `openqasm3` Python package), and Qiskit, tket, Cirq, and the AWS Braket SDK all provide importers/exporters — with partial coverage"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claims about specific tooling; package name and round-trip support are perishable.

## §23.2 — OpenQASM 3 vendor acceptance

- **Claim** (anchor): "Several vendors accept OpenQASM 3 at or near their submission interfaces (support and dialect vary — check the provider's documentation)"
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

- **Claim** (anchor): "even on the vendors that advertise dynamic circuits (IBM, Quantinuum), the supported subset of branches and real-time arithmetic varies by backend and service version"
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

- **Claim** (anchor): "its **Quil-T** extension, which exposes pulse-level control as first-class syntax. A `DEFCAL` block binds a logical gate on specific qubits to the control instructions that implement it"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.3 — OpenQASM 3 defcal origin

- **Claim** (anchor): "OpenQASM 3's `defcal` blocks serve a similar role"
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

- **Claim** (anchor): "the same `QNode` can run against photonic, superconducting, and trapped-ion backends or a local simulator (via plugins) when its operations, measurements, and differentiation method fall in the target's supported subset"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — PennyLane parameter-shift gradients

- **Claim** (anchor): "the framework computes gradients — parameter-shift where conditions permit, backpropagation or adjoint on simulators — that propagate through PyTorch or JAX"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — tket open-source package name

- **Claim** (anchor): "tket** (Quantinuum, open source as `pytket`)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — tket interoperability

- **Claim** (anchor): "pytket parses circuits from Qiskit, Cirq, OpenQASM, Quil, and others, applies a strong suite of optimization passes (quality is workload- and target-dependent, as with any compiler), and emits circuits for many backends through its extension packages"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Q# and QDK description

- **Claim** (anchor): "Q# (Microsoft). A standalone typed quantum programming language with its own compiler, shipped as the Quantum Development Kit (QDK) and integrated into Azure Quantum"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.4 — Q# 2024 rewrite

- **Claim** (anchor): "The 2024 rewrite of Q# (the "Modern QDK") substantially simplified the toolchain; the compiler — Microsoft's own implementation — emits QIR for the targets that consume it"
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

- **Claim** (anchor): "A Toffoli, for example, costs 6 CNOTs plus single-qubit gates in the standard ancilla-free construction over CNOT + single-qubit gates"
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

- **Claim** (anchor): "the serial budget is a few hundred to a couple of thousand gate durations — a crude scale, not a cliff"
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

- **Claim** (anchor): "It is NP-hard in general (initial placement resembles subgraph embedding; dynamic routing resembles token swapping)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Complexity claim with specific reduction; check theoretical CS literature.

## §23.7 — SABRE algorithm and Qiskit default

- **Claim** (anchor): "The long-standing basis of Qiskit's default layout/routing passes; exact behavior depends on version and optimization level"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Algorithm description and adoption date; verify against Qiskit release notes.

## §23.7 — LightSABRE algorithm role

- **Claim** (anchor): "**LightSABRE**. A reengineered variant that substantially improves runtime — and, per its authors, solution quality as well"
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

- **Claim** (anchor): "a native entangler (ECR, CZ, iSWAP — a CNOT is synthesized from these) is 200–500 ns; a measurement is of microsecond scale, with reset a separately timed step after it"
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

- **Claim** (anchor): "Qiskit's higher optimization levels use noise-aware layout when target data is available, tket accepts device coupling maps and fidelity weights in its mapping passes"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API names are perishable; verify against pytket documentation.

## §23.10 — Dynamical decoupling Magnus expansion justification

- **Claim** (anchor): "The pattern is structurally identical to NMR refocusing pulses, and the first-order cancellation (a Magnus-expansion result) holds under the sequence's symmetry assumptions and reasonably ideal pulses"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Theoretical claim linking DD to NMR; well-known but verify the Magnus expansion characterization.

## §23.10 — Qiskit PadDynamicalDecoupling and tket DD

- **Claim** (anchor): "Qiskit ships a `PadDynamicalDecoupling` pass and tket has DD support; neither is necessarily applied automatically at any optimization level"
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

- **Claim** (anchor): "Exposed through Qiskit Runtime Estimator resilience options (option names and levels change across Runtime versions)"
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

- **Claim** (anchor): "factoring a 2048-bit RSA key with surface-code-encoded Shor's algorithm requires, in the widely cited Gidney–Ekerå-style scenario ($p_{\mathrm{phys}} = 10^{-3}$ and a specific cycle time, factory layout, connectivity, and failure budget — the scalar assumptions alone do not determine the answer), roughly $2 \times 10^7$ physical qubits and hours of runtime"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Highly cited quantitative resource estimate; verify against published resource-estimation papers (e.g., Gidney & Ekerå 2021 or more recent estimates).

## §23.11 — Azure Quantum Resource Estimator

- **Claim** (anchor): "Microsoft's **Azure Quantum Resource Estimator** is the most widely used public tool: a Q# (or Qiskit) circuit goes in; a breakdown of physical qubits, runtime, magic-state-factory layout, and code parameters comes out"
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

- **Claim** (anchor): "Tooling: `quimb` (tensor-network simulation), `cuQuantum`'s `cuTensorNet` (GPU contraction library), and `cotengra` (contraction-path search) — building blocks more than turnkey simulators"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.12 — Google supremacy rebuttal by tensor-network simulation

- **Claim** (anchor): "Tensor-network methods later cut the estimated classical cost of the 2019 Google "quantum supremacy" circuits by orders of magnitude — narrowing, though not erasing, the claimed separation"
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

- **Claim** (anchor): "Memory cost $O(4^n)$ — the state-vector exponent doubled — so the qubit ceiling is roughly half. Concretely, at double precision $n = 15$ is $\sim$16 GB (workstation territory) and $n = 20$ is $\sim$16 TB"
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

- **Claim** (anchor): "Pricing models vary by provider and plan — some bill reserved or elapsed time, others per task or per shot — so the economics are not universal"
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

- **Claim** (anchor): "This is not a finite difference — the identity is exact for gates of the standard rotation form $e^{-i\theta P/2}$ with $P^2 = I$"
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

- **Claim** (anchor): "Endianness is the perennial suspect: Qiskit orders qubits little-endian, this book big-endian; in the author's experience no single issue has eaten more debug time"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Qiskit little-endian convention is checkable against Qiskit documentation.

## §23.14 — Tomography shot cost

- **Claim** (anchor): "State tomography needs on the order of $4^n$ parameters' worth of measurement settings — process tomography $\sim 16^n$ — with shot counts on top set by the target precision"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result for full state tomography; could also point to §derivation.

## §23.15 — PennyLane ML framework integrations

- **Claim** (anchor): "**PennyLane**'s QNodes integrate with PyTorch, JAX, and TensorFlow interfaces"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.15 — TensorFlow Quantum architecture

- **Claim** (anchor): "**TensorFlow Quantum** wraps Cirq circuits as TF layers with differentiator support (parameter-shift among the options)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

## §23.15 — Qiskit Machine Learning estimator types

- **Claim** (anchor): "**Qiskit Machine Learning** offers `EstimatorQNN` (expectation-value outputs) and `SamplerQNN` (probability-distribution outputs); a `TorchConnector` wraps a QNN as a PyTorch module, and separate classifier/regressor classes provide the scikit-learn-style API"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: API class names are perishable; verify against Qiskit Machine Learning documentation.
