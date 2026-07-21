# Chapter 26. Practical Access and Hands-On Work

> **Status:** prereviewed · **Phase:** 5 · **Sections drafted:** 8 / 8

[← Previous: Chapter 25](25-nisq-and-early-fault-tolerant-era.md) · [Table of Contents](../../README.md) · [Next: Chapter 27 →](../part-11-applications/27-cryptography-and-security.md)

The previous chapters built the conceptual and engineering foundation. This chapter is the bridge between book and keyboard: how to pick a simulator or device, how to access real quantum hardware, which SDK is the right entry point for which goal, how to design an experiment that minimizes avoidable waste of device time, and how to read the literature without being buried by it. The focus is the pragmatic decisions you'll have to make in the first few weeks of actually trying things.

> **How to read this chapter.** Linear. Each section is short and operational. If you only read two sections, read §26.3 (SDK choice) and §26.6 (reproducibility) — in the author's experience, where new practitioners lose the most time.

## 26.1 Simulators vs. Real Hardware

The first rule of practical quantum computing: **debug on a simulator, deploy to hardware**. A state-vector simulator stores $2^n$ complex amplitudes, so its memory cost *doubles with every added qubit*: 16 GiB at $30$ qubits and 512 GiB at $35$ in double precision (half that in single precision). A workstation therefore tops out around $30$ qubits and a large-memory server around $35$ — $n = 40$ already needs 16 TiB, distributed-cluster territory. A GPU-accelerated simulator (cuQuantum, qsim) is much faster but bounded by the same exponential memory, so it buys you only a handful of extra qubits, not a doubling of the count. Tensor-network simulators handle larger systems when the circuit's entanglement structure and contraction geometry stay favorable (bounded entropy alone is not the whole condition — §24.7). Stabilizer simulators handle Clifford-only circuits of thousands of qubits in polynomial time. For most algorithm development up to roughly $30$ qubits, you should not need real hardware at all.

Real hardware is the right move when (a) you need to measure actual noise behavior, (b) the algorithm depends on circuits too deep to simulate but shallow enough to fit on the device, (c) you are publishing results that require device backing, or (d) you are stress-testing a compiler or workflow against a real backend's idiosyncrasies. For most algorithmic exploration outside those four cases, the simulator is faster, free, and more flexible (you can read out the full state vector, do exact gradients, swap noise models).

A practical wrinkle: simulator noise models are *approximate*. Real-device errors include calibration drift, control crosstalk, leakage outside the computational subspace, and non-Markovian features that a simple depolarizing-channel model does not capture (richer simulator noise models exist, §24.13, but remain approximations). So once your algorithm passes simulator tests, expect a second round of debugging on hardware. Plan for it.

## 26.2 Cloud Access

In 2026, most public and commercial access to real quantum hardware goes over the cloud (on-premises systems, national labs, and university installations are the exceptions). The major cloud providers:

- **IBM Quantum** — Qiskit Runtime, with a free tier (limited shots, queue-bound) and paid plans for dedicated time. Heron and Eagle devices in the ~100–200 qubit range; the Sampler and Estimator primitives are the standard entry points.
- **Amazon Braket** — managed access to multiple vendors' devices (IonQ, IQM, Rigetti, QuEra, AQT — the roster changes over time) through a single SDK; pricing per shot plus per-task overhead. Useful for cross-vendor benchmarking.
- **Microsoft Azure Quantum** — gateway to IonQ, Quantinuum, Rigetti, Pasqal; Q# and the Quantum Development Kit on top.
- **Google Quantum AI / Quantum Engine** — restricted access; you typically need a research collaboration.
- **Direct vendor access** — Quantinuum's H-series, IonQ Cloud, IQM Resonance, and others; commercial models vary by vendor (reservations, subscriptions, per-shot or per-task billing), and some devices — QuEra's Aquila, historically — are reached through aggregators like Braket rather than directly. Check current terms.

Queue time is often the dominant practical cost on free shared tiers — minutes to hours, depending on demand — though shot execution, circuit switching, and orchestration can dominate elsewhere. Pricing is provider-, contract-, and device-specific, and often not public; serious experimentation typically runs on paid on-demand access, sessions, reservations, or partnership allocations rather than free queues. Plan budget and schedule accordingly: a single VQE optimization loop with $10^7$ shots can easily take an evening of wall-clock time even on dedicated hardware, with the exact figure set by shot rate, batching, and observable grouping.

## 26.3 Choosing a First SDK

The question "which SDK should I start with" has different answers for different goals:

- **Targeting IBM hardware**: Qiskit. Mature, well-documented, the Runtime Primitives (Sampler, Estimator) are the right abstraction for most work, and the official transpilation pipeline handles routing and optimization competently.
- **Targeting Google hardware or building a custom research codebase**: Cirq. A design many find cleaner (explicit qubit objects, moment structure) with a more focused ecosystem — though Google QPU access is restricted, so for most readers Cirq is a circuits-and-simulation choice.
- **Variational algorithms and quantum machine learning**: PennyLane. Differentiation-first, multi-backend, integrates with NumPy/JAX/PyTorch (TensorFlow support was deprecated in v0.43 and dropped in v0.44, late 2025 — use JAX or PyTorch for new work). In the author's view, the most pedagogical library for understanding parameter-shift gradients (one of several differentiation methods it supports).
- **Targeting Quantinuum / multi-vendor portability**: tket via pytket. Strong compilation, vendor-agnostic by design, mature.
- **You like strongly-typed languages and want classical/quantum integration**: Q#. A standalone typed *language* rather than a Python library — that, not typing per se, is the real distinction (Python SDKs carry type hints and static tooling, and other typed quantum languages exist) — and the Azure Quantum Resource Estimator is the most widely used public tool for fault-tolerant resource forecasting.

A reasonable default for somebody coming from a software-engineering background and trying to learn the field: start with PennyLane on a local simulator and stay with it for the first month; graduate to Qiskit when you want IBM hardware runs; add tket later if you need to compare vendors. One SDK at a time, milestone by milestone — never six at once.

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
- **Newest scaling, large analog/optimization experiments**: neutral-atom devices (QuEra Aquila, Pasqal). Hundreds of qubits, reconfigurable layouts, particularly strong for Hamiltonian-simulation-style problems on Rydberg arrays.
- **Adiabatic / annealing-style optimization**: D-Wave Advantage. Thousands of qubits but in a fundamentally different computational model (Chapter 32); not directly comparable to gate-based fidelities.

For a first algorithmic experiment, the right pattern is: design and debug entirely in simulation; pick the device with the fewest moving parts for *your* workload — fewest meaning SDK maturity, native-gate match, routing burden, and queue predictability, not a platform shorthand (ion systems' higher fidelity can support *deeper* circuits despite slower gates; superconducting devices offer more width); compile and run a small "smoke test" first to confirm the SDK + backend + queueing pipeline actually delivers the expected result; only then scale up shot counts and parameter sweeps.

Beware of vendor benchmarks on first contact. The number a vendor leads with — qubit count, Quantum Volume, Algorithmic Qubits — may well not be the metric that determines whether your specific algorithm will succeed. Chapter 22 explains why.

## 26.5 Experiment Design

A quantum experiment on a real device is much closer to a physics experiment than to a unit test: it costs money, it costs time, and the result is statistical. A few habits pay back many times their cost.

**Calibrate the shot budget**. The shot count $N$ controls the standard error of any expectation value as $\sigma/\sqrt{N}$ where $\sigma$ is the observable's standard deviation. For a probability $p$ near $0.5$, the standard error is roughly $0.5/\sqrt N$ — so $N = 10^4$ shots gives standard error $\sim 5 \cdot 10^{-3}$ (a 95% confidence half-width is about twice that). Many serious estimates need $N = 10^6$ or more, which is real money. Pre-compute the shot budget from the decision precision you need, then check it against what you can afford — and if the required budget is out of reach, rescope or explicitly label the study exploratory rather than run it underpowered in silence.

**Use the right primitive**. On Qiskit Runtime, the Sampler returns outcome data (counts and bit arrays); the Estimator returns expectation-value estimates — with metadata such as standard errors, depending on version — after handling basis rotations, grouping, and optional mitigation, but no raw bit strings. Choose by the output you need to audit: aggregating Sampler counts by hand can reproduce the Estimator's answer at equal shots, while the Estimator automates the grouping and mitigation plumbing.

**Pin device and date**. Calibrations drift, devices retire, and your experiment from last month may not reproduce next month even with the identical code. Record device name, calibration date, and the compiler/SDK version. If the conclusion you're writing about depends on a specific noise characteristic, save the device's reported calibration as a structured artifact — the backend-properties/target payload with its timestamp, machine-readable and diffable (a screenshot is neither) — as part of the run record.

**Run a noise-free baseline**. Before believing a hardware result, run the same circuit on an ideal simulator (no noise model) and confirm the result matches your analytical expectation. Then run on a noise-model simulator that approximates the target hardware. Only after both agree, run on actual hardware. The three-way comparison narrows bug hypotheses faster than any single run — it does not uniquely localize them (the analytic result and the simulator can share a bug; independent implementations and null tests catch that).

## 26.6 Reproducibility Considerations

Quantum experiments are stochastic and hardware-dependent, which makes reproducibility harder than for classical experiments. A short checklist:

- **Seed everything seedable**: simulator RNGs, parameter initializers, classical optimizer starts. Note that hardware measurement outcomes are not shot-for-shot reproducible — irreducible sampling variation, mixed with classical technical noise (don't mistake device randomness for certified quantum randomness) — though the *distributions* should be stable under a stable experiment.
- **Pin SDK versions in a `requirements.txt` or `environment.yml`**. SDKs change behavior between minor versions; Qiskit deprecated several APIs between $1.0$ and $1.4$.
- **Pin the device**. "Run on an IBM 127-qubit device" is not a citation; "run on `ibm_brisbane`, calibration `2026-02-14T08:00Z`" is (an illustrative citation *format*, not a reference to a real archived run).
- **Save the transpiled circuit**, not just the high-level circuit. Routing decisions depend on calibration; same input compiled twice can produce different physical circuits.
- **Log shot counts and raw counts**. Storing the raw bit-string histogram lets you re-analyze without re-running.
- **Version-control the experiment script**. Treat it as a software artifact.

For a paper, the reproducibility bar is higher: many venues now encourage or require a data/code deposit (a Zenodo record or a companion repository), with policies varying by field and venue, and hardware access terms sometimes constraining what is shareable. Plan for this from the start; backfilling is painful.

## 26.7 Reading Papers Without Drowning

The quantum-computing literature is enormous, fast-moving, and stratified across at least four communities (physics, computer-science theory, hardware engineering, applications). A few survival skills:

- **arXiv first — but check the version of record**. Most academic quantum-computing research appears on arXiv, usually before journal publication (`quant-ph` is the core category, with relevant work spread across cs, cond-mat, and math listings; industrial hardware details, standards, and some security guidance live elsewhere). Compare the latest arXiv version against the journal version when it matters: journal versions can carry substantial corrections, added experiments, or changed claims — and retractions happen.
- **Read the abstract, the figures, the conclusion, then decide**. Most papers are not relevant to your current question; the deep read should be reserved for papers whose central claim you actually need to evaluate. The first hour with a paper should be triage, not study.
- **Trace citations both directions**. The "cited by" tools on Google Scholar and Semantic Scholar reveal whether a result was later refuted, generalized, or implemented. Many famous-sounding results have been quietly dequantized or refuted; don't quote a 2018 QML speedup paper without checking 2020–2023 follow-ups.
- **Distinguish three claim types**: (1) algorithmic / complexity-theoretic, (2) hardware-experimental, (3) numerical / simulation-based. Each has its own failure modes — oracle separations that don't survive non-oracle settings, hardware claims that don't survive recalibration, numerical claims that don't extrapolate.
- **Be skeptical of "quantum advantage" headlines**. The 2019–2025 cycle of advantage claims and classical pushbacks (Sycamore, Jiuzhang, random-circuit sampling) is a useful template: if a result claims a clean separation, search for classical algorithmic responses before citing it — some arrive within months, some take years, some never come. The checking, not the calendar, is the discipline.
- **Curate rather than firehose.** Raw category feeds overwhelm most readers (filtered alerts do work for some); a sustainable mix tracks a few key authors and venues per subfield *plus* keyword alerts, review articles, and deliberately included dissenting and classical-baseline sources — pure author-tracking breeds prestige bias.

The honest broader skill is *epistemic frugality*: read the few papers that genuinely matter for what you're working on, accept that you cannot read all the rest, and keep a light periodic scan so that the community's surfacing — which has its own hype, citation, and commercial biases — is not your only filter.

## 26.8 Bridge to Chapter 27

This concludes Part 10's hands-on chapter. Part 11 turns to **applications** — cryptography, scientific simulation, optimization, machine learning, and quantum sensing — examining where quantum computing has already had real impact — today that is mostly the cryptographic threat-and-response story, scientific insight, and tooling, not computational advantage — where it might produce more, and how to evaluate the claims on evidence. Chapter 27 starts with cryptography, where the implications of Shor (§15.2) and the post-quantum response are the clearest application story so far.

**Sanity checks before moving on.**

1. Pick one of the SDKs in §26.3 and successfully run a Bell-state preparation circuit ($H$, $\mathrm{CNOT}$, measure) on a local simulator. Confirm the $\sim 50/50$ split on $|00\rangle$ and $|11\rangle$.
2. Calculate the shot count needed to measure an expectation value with precision $10^{-3}$ assuming the observable variance is bounded by $1$.
3. Using published pricing pages and any queue statistics you can find (no purchase required), build a dated comparison table of what a $1000$-shot $5$-qubit circuit would cost on two cloud providers — stating your assumptions about task fees, gate count, and how (or whether) to convert expected queue time into cost.
4. Configure a Qiskit Runtime session (or the local/fake-backend testing mode if you lack credentials) and verify that the transpiled circuit you submit is valid for the target and that you logged the calibration snapshot it was compiled against — noting that execution may happen after a recalibration, which is exactly why the log matters.
5. Find a 2019–2020 quantum-advantage paper on arXiv and search for subsequent classical responses — improved simulations, score-spoofing results, critiques; they exist for some claims and not others, on no fixed schedule. Write down in one sentence what changed — or that nothing did, which is also a finding.

---

[← Previous: Chapter 25](25-nisq-and-early-fault-tolerant-era.md) · [Table of Contents](../../README.md) · [Next: Chapter 27 →](../part-11-applications/27-cryptography-and-security.md)
