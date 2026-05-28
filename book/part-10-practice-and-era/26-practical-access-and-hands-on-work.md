# Chapter 26. Practical Access and Hands-On Work

> **Status:** draft · **Phase:** 1 · **Sections drafted:** 7 / 7

[← Previous: Chapter 25](25-nisq-and-early-fault-tolerant-era.md) · [Table of Contents](../../README.md) · [Next: Chapter 27 →](../part-11-applications/27-cryptography-and-security.md)

The previous chapters have built theory. This chapter is the bridge between book and keyboard: how to pick a simulator or device, how to access real quantum hardware, which SDK is the right entry point for which goal, how to design an experiment that won't waste device time, and how to read the literature without being buried by it. The focus is the pragmatic decisions you'll have to make in the first few weeks of actually trying things.

> **How to read this chapter.** Linear. Each section is short and operational. If you only read one section, read §26.3 (SDK choice) and §26.6 (reproducibility), which is where most new practitioners lose the most time.

## 26.1 Simulators vs. Real Hardware

The first rule of practical quantum computing: **debug on a simulator, deploy to hardware**. A state-vector simulator on a workstation handles up to about $30$–$35$ qubits in a few GB of memory. A GPU-accelerated simulator (cuQuantum, qsim) doubles that. Tensor-network simulators handle larger systems if the entanglement entropy stays bounded. Stabiliser simulators handle Clifford-only circuits of thousands of qubits in polynomial time. For most algorithm development up to roughly $30$ qubits, you should not need real hardware at all.

Real hardware is the right move when (a) you need to measure actual noise behaviour, (b) the algorithm depends on circuits too deep to simulate but shallow enough to fit on the device, (c) you are publishing results that require device backing, or (d) you are stress-testing a compiler or workflow against a real backend's idiosyncrasies. For most algorithmic exploration outside those four cases, the simulator is faster, free, and more flexible (you can read out the full state vector, do exact gradients, swap noise models).

A practical wrinkle: simulator noise models are *approximate*. Real-device errors include calibration drift, control crosstalk, leakage outside the computational subspace, and non-Markovian features that a depolarising-channel simulator does not capture. So once your algorithm passes simulator tests, expect a second round of debugging on hardware. Plan for it.

## 26.2 Cloud Access

In 2026, real quantum hardware is accessed almost exclusively over the cloud. The major providers:

- **IBM Quantum** — Qiskit Runtime, with a free tier (limited shots, queue-bound) and paid plans for dedicated time. Heron and Eagle devices in the ~100–200 qubit range; the Sampler and Estimator primitives are the standard entry points.
- **Amazon Braket** — managed access to multiple vendors' devices (IonQ, Rigetti, QuEra, Quantinuum) through a single SDK; pricing per shot plus per-task overhead. Useful for cross-vendor benchmarking.
- **Microsoft Azure Quantum** — gateway to IonQ, Quantinuum, Rigetti, Pasqal; Q# and the Quantum Development Kit on top.
- **Google Quantum AI / Quantum Engine** — restricted access; you typically need a research collaboration.
- **Direct vendor access** — Quantinuum's H-series, IonQ Cloud, IQM Resonance, QuEra Aquila; each offers reserved-time and pay-per-shot models.

Queue time is the dominant practical cost on shared backends — minutes to hours on the free tiers, depending on time of day. Reserved time (typically priced in tens to hundreds of dollars per minute on the higher-fidelity vendors) is the standard for serious experimentation. Plan budget and schedule accordingly: a single VQE optimisation loop with $10^7$ shots can easily take an evening of wall-clock time even on dedicated hardware.

## 26.3 Choosing a First SDK

The question "which SDK should I start with" has different answers for different goals:

- **Targeting IBM hardware**: Qiskit. Mature, well-documented, the Runtime Primitives (Sampler, Estimator) are the right abstraction for most work, and the official transpilation pipeline handles routing and optimisation competently.
- **Targeting Google hardware or building a custom research codebase**: Cirq. Cleaner Python, fewer abstractions to fight, but a smaller ecosystem.
- **Variational algorithms and quantum machine learning**: PennyLane. Differentiation-first, multi-backend, integrates with NumPy/JAX/PyTorch/TensorFlow. The pedagogically-best library for understanding parameter-shift gradients.
- **Targeting Quantinuum / multi-vendor portability**: tket via pytket. Strong compilation, vendor-agnostic by design, mature.
- **You like strongly-typed languages and want classical/quantum integration**: Q#. Microsoft's Quantum Development Kit is the only major SDK with a real type system; the compiler is sophisticated and the resource estimator is the gold standard for fault-tolerant pre-flighting.

A reasonable default for somebody coming from a software-engineering background and trying to learn the field: start with PennyLane on a local simulator, build up to small circuits on IBM hardware via Qiskit, and use tket when you need to compare vendors. Avoid the trap of installing six SDKs at once; pick one and stay with it for the first month.

To make this concrete, here is a complete first Qiskit program — prepare a Bell state, inspect its exact amplitudes, then sample it (`examples/first_bell_program.py`):

```python
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

print("statevector:", Statevector(qc).data.round(3))

measured = qc.copy()
measured.measure_all()
result = StatevectorSampler().run([measured], shots=1000).result()
print("counts:", result[0].data.meas.get_counts())
```

Output (the statevector is exact; the counts fluctuate from run to run):

```text
statevector: [0.707+0.j 0.   +0.j 0.   +0.j 0.707+0.j]
counts: {'11': 502, '00': 498}
```

## 26.4 Choosing a First Hardware Target

Once you move past simulators, the question is which platform. A few pragmatic guidelines:

- **Best fidelity, smallest scale**: trapped-ion systems (Quantinuum H-series, IonQ). 2-qubit fidelities approaching 99.9%, all-to-all connectivity, but tens of qubits and slow gates.
- **Largest scale, public availability**: IBM superconducting devices. Hundreds of qubits, restricted connectivity (heavy-hex layout), 2q fidelities around 99.5%.
- **Newest scaling, large analog/optimisation experiments**: neutral-atom devices (QuEra Aquila, Pasqal). Hundreds of qubits, reconfigurable layouts, particularly strong for Hamiltonian-simulation-style problems on Rydberg arrays.
- **Adiabatic / annealing-style optimisation**: D-Wave Advantage. Thousands of qubits but in a fundamentally different computational model (Chapter 32); not directly comparable to gate-based fidelities.

For a first algorithmic experiment, the right pattern is: design and debug entirely in simulation; pick the device with the fewest moving parts that can run your circuit (Quantinuum if shallow and small; IBM if longer); compile and run a small "smoke test" first to confirm the SDK + backend + queueing pipeline actually delivers the expected result; only then scale up shot counts and parameter sweeps.

Beware of vendor benchmarks on first contact. The number a vendor leads with — qubit count, Quantum Volume, Algorithmic Qubits — is rarely the metric that determines whether your specific algorithm will succeed. Chapter 22 explains why.

## 26.5 Experiment Design

A quantum experiment on a real device is much closer to a physics experiment than to a unit test: it costs money, it costs time, and the result is statistical. A few habits pay back many times their cost.

**Calibrate the shot budget**. The shot count $N$ controls the standard error of any expectation value as $\sigma/\sqrt{N}$ where $\sigma$ is the observable's variance. For a probability $p$ near $0.5$, the standard error is roughly $0.5/\sqrt N$ — so $N = 10^4$ shots gives precision $\sim 5 \cdot 10^{-3}$. Many serious estimates need $N = 10^6$ or more, which is real money. Pre-compute the shot budget from the precision you need, not the precision you can afford.

**Use the right primitive**. On Qiskit Runtime, the Sampler is for raw bit-string outcomes; the Estimator is for observable expectation values, including error-mitigation passes. Don't read shot statistics through the Estimator (you'll get rounded numbers); don't manually sum Pauli expectations from the Sampler if the Estimator can do it more accurately.

**Pin device and date**. Calibrations drift, devices retire, and your experiment from last month may not reproduce next month even with the identical code. Record device name, calibration date, and the compiler/SDK version. If the conclusion you're writing about depends on a specific noise characteristic, screenshot or save the device's reported $T_1$/$T_2$/error-rates as part of the run record.

**Run a noise-free baseline**. Before believing a hardware result, run the same circuit on an ideal simulator (no noise model) and confirm the result matches your analytical expectation. Then run on a noise-model simulator that approximates the target hardware. Only after both agree, run on actual hardware. The three-way comparison localises bugs faster than any single run.

## 26.6 Reproducibility Considerations

Quantum experiments are stochastic and hardware-dependent, which makes reproducibility harder than for classical experiments. A short checklist:

- **Seed everything seedable**: simulator RNGs, parameter initialisers, classical optimiser starts. Note that hardware RNG (the measurement outcomes themselves) is not reproducible — that's physics.
- **Pin SDK versions in a `requirements.txt` or `environment.yml`**. SDKs change behaviour between minor versions; Qiskit deprecated several APIs between $1.0$ and $1.4$.
- **Pin the device**. "Run on an IBM 127-qubit device" is not a citation; "run on `ibm_brisbane`, calibration `2026-02-14T08:00Z`" is.
- **Save the transpiled circuit**, not just the high-level circuit. Routing decisions depend on calibration; same input compiled twice can produce different physical circuits.
- **Log shot counts and raw counts**. Storing the raw bit-string histogram lets you re-analyse without re-running.
- **Version-control the experiment script**. Treat it as a software artefact.

For a paper, the reproducibility bar is higher: most reputable venues now expect either a Zenodo deposit of the experimental data and code, or a published companion repository. Plan for this from the start; backfilling is painful.

## 26.7 Reading Papers Without Drowning

The quantum-computing literature is enormous, fast-moving, and stratified across at least four communities (physics, computer-science theory, hardware engineering, applications). A few survival skills:

- **arXiv first, journal second**. Almost everything appears on arXiv (`quant-ph` is the relevant category) months before journal publication, and the arXiv version is usually the most-cited. The journal version is rarely meaningfully different on technical content.
- **Read the abstract, the figures, the conclusion, then decide**. Most papers are not worth a full read; the deep read should be reserved for papers whose central claim you actually need to evaluate. The first hour with a paper should be triage, not study.
- **Trace citations both directions**. The "cited by" tools on Google Scholar and Semantic Scholar reveal whether a result was later refuted, generalised, or implemented. Many famous-sounding results have been quietly dequantised or refuted; don't quote a 2018 QML speedup paper without checking 2020–2023 follow-ups.
- **Distinguish three claim types**: (1) algorithmic / complexity-theoretic, (2) hardware-experimental, (3) numerical / simulation-based. Each has its own failure modes — oracle separations that don't survive non-oracle settings, hardware claims that don't survive recalibration, numerical claims that don't extrapolate.
- **Be sceptical of "quantum advantage" headlines**. The 2019–2025 cycle of advantage claims and classical pushbacks (Sycamore, Jiuzhang, random-circuit sampling) is a useful template: if a result claims a clean exponential separation, expect a classical algorithmic response within twelve to twenty-four months.
- **Track three or four key authors and venues per subfield** rather than trying to follow everything. Subscribing to arXiv listings is a path to madness; following specific authors' pages is sustainable.

The honest broader skill is *epistemic frugality*: read the few papers that genuinely matter for what you're working on, accept that you cannot read all the rest, and trust the rest of the community to surface the important results.

## 26.8 Bridge to Chapter 27

This concludes Part 10's hands-on chapter. Part 11 turns to **applications** — cryptography, scientific simulation, optimisation, machine learning, and quantum sensing — examining where quantum computing has already produced real value, where it might, and where the claims should be discounted. Chapter 27 starts with cryptography, where the implications of Shor (§15.2) and the post-quantum response are the clearest application story so far.

**Sanity checks before moving on.**

1. Pick one of the SDKs in §26.3 and successfully run a Bell-state preparation circuit ($H$, $\mathrm{CNOT}$, measure) on a local simulator. Confirm the $\sim 50/50$ split on $|00\rangle$ and $|11\rangle$.
2. Calculate the shot count needed to measure an expectation value with precision $10^{-3}$ assuming the observable variance is bounded by $1$.
3. Compare the queue-time-amortised cost (shot price plus expected wait) for a $1000$-shot $5$-qubit circuit on at least two different cloud providers.
4. Configure a Qiskit Runtime session and verify the transpiled circuit you submit matches the calibration you logged.
5. Find a 2019–2020 quantum-advantage paper on arXiv, find the classical pushback paper from 2022–2024, and write down in one sentence what changed.

---

[← Previous: Chapter 25](25-nisq-and-early-fault-tolerant-era.md) · [Table of Contents](../../README.md) · [Next: Chapter 27 →](../part-11-applications/27-cryptography-and-security.md)
