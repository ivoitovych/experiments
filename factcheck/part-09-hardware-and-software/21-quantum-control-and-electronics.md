# Factcheck — §21 Quantum Control and Electronics

Mirrors `book/part-09-hardware-and-software/21-quantum-control-and-electronics.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §21.1 — Transmon anharmonicity value

- **Claim** (anchor): "the next transition of the transmon ($|1\rangle \to |2\rangle$, detuned by the anharmonicity $\alpha \approx -200\\,\mathrm{MHz}$)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Canonical superconducting qubit anharmonicity figure; should match transmon literature (Koch et al. 2007 or similar).

## §21.1 — Superconducting X_pi pulse duration range

- **Claim** (anchor): "a Gaussian of total duration $20$–$60\\,\mathrm{ns}$ with $\sigma$ around a quarter of the total length"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Typical superconducting single-qubit gate duration; should be cross-checked against vendor datasheets or calibration literature.

## §21.1 — Trapped-ion single-qubit gate duration range

- **Claim** (anchor): "pulse durations range from microseconds (Raman gates on hyperfine clock states) to milliseconds (direct optical transitions)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Range spans Raman (fast) vs. direct optical (slow) transitions; should be verified against trapped-ion experiment literature.

## §21.2 — Superconducting qubit transition frequency band

- **Claim** (anchor): "the qubit transition frequency $\omega_{01}/2\pi$ sits in the $3$–$8\\,\mathrm{GHz}$ band"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard transmon operating frequency range; appears in most superconducting qubit overviews.

## §21.2 — IQ upconversion intermediate frequency

- **Claim** (anchor): "a baseband AWG produces an in-phase ($I$) and quadrature ($Q$) pair of sidebanded signals at an intermediate frequency (IF) of a few hundred megahertz"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard IQ upconversion architecture; IF range claim should be cross-checked against control electronics datasheets.

## §21.2 — Readout amplifier chain: TWPA then HEMT

- **Claim** (anchor): "The first readout amplifier is typically a traveling-wave parametric amplifier (TWPA) at the mixing chamber followed by a HEMT (high-electron-mobility transistor) amplifier at the $4\\,\mathrm{K}$ stage, with $40$–$60\\,\mathrm{dB}$ of total gain before the signal reaches room-temperature electronics"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: TWPA + HEMT amplifier chain with 40–60 dB gain is a standard superconducting readout architecture claim.

## §21.2 — Flux control bandwidth

- **Claim** (anchor): "Flux lines are low-frequency (DC to a few hundred megahertz)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Flux-line bandwidth figure for tunable couplers/qubits; should be verified against device engineering literature.

## §21.3 — OpenQASM 3 pulse-level features

- **Claim** (anchor): "OpenQASM 3 added native syntax for `cal` (calibration) blocks, `defcal` (gate-to-pulse definitions), `delay` instructions in real time units, and `extern` declarations that bind into the control system"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: OpenQASM 3 specification features; should be verified against the OpenQASM 3 spec document.

## §21.3 — Named pulse-level programming frameworks

- **Claim** (anchor): "Cirq's `PulseSchedule` and IQM's Cocos stack play similar roles for their respective ecosystems"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Vendor-specific named systems; IQM Cocos and Cirq PulseSchedule existence and roles should be verified.

## §21.3 — Virtual Z rotation implemented as phase advance

- **Claim** (anchor): "a $Z(\theta)$ rotation can be implemented in zero physical time by advancing the frame phase by $-\theta$ on subsequent drives"
- **Method**: derivation
- **Source**: → §21.1 (rotating-frame drive Hamiltonian)
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result following from the rotating-frame Hamiltonian; a phase shift on subsequent pulses is equivalent to a Z rotation.

## §21.4 — AWG sample rate and bit resolution

- **Claim** (anchor): "The AWG produces I/Q waveform pairs at a sample rate of $1$–$10\\,\mathrm{GS/s}$ with $14$–$16$ bits of vertical resolution"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: AWG performance specs; should be cross-checked against vendor datasheets (e.g., Zurich Instruments, Quantum Machines, Keysight).

## §21.4 — Named commercial real-time control systems

- **Claim** (anchor): "Quantum Machines OPX, Zurich Instruments SHFQC, and several in-house systems (IBM's Qiskit Runtime stack, Google's in-house pulse system, Rigetti's Lodgepole)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named vendor product identifiers and in-house system names; should be verified for accuracy and currency.

## §21.4 — Real-time feedback latency range

- **Claim** (anchor): "The latency from measurement to conditional gate is then a small constant ($100$–$500\\,\mathrm{ns}$) instead of a software round-trip"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: FPGA feedback latency figure; should be cross-checked against vendor documentation (e.g., Quantum Machines OPX specs).

## §21.5 — DAC dynamic range calculation

- **Claim** (anchor): "A DAC (digital-to-analogue converter) at $2\\,\mathrm{GS/s}$ with $14$-bit resolution has a Nyquist bandwidth of $1\\,\mathrm{GHz}$ and a usable dynamic range of about $84\\,\mathrm{dB}$"
- **Method**: derivation
- **Source**: → §21.5 (ENOB/SFDR formula: ~6 dB/bit × 14 bits)
- **Verified**: — · **Verdict**: open
- **Comment**: Dynamic range from 14-bit DAC: ~6.02 dB/bit × 14 = ~84 dB; Nyquist = half sample rate. Both are standard converter relationships.

## §21.5 — Spurious tone rejection target

- **Claim** (anchor): "a high-purity DAC plus careful image-reject mixing keeps stray tones at least $-60\\,\mathrm{dBc}$ from the carrier"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Spurious tone rejection specification; should be verified against control electronics design literature.

## §21.5 — ADC sample rate and bit resolution for readout

- **Claim** (anchor): "Typical configurations are $1$–$2\\,\mathrm{GS/s}$ at $12$–$14$ bits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: ADC specs for qubit readout digitisers; should be verified against vendor datasheets.

## §21.6 — Classical crosstalk floor requirement

- **Claim** (anchor): "Cross-coupling between adjacent lines kept below $-30\\,\mathrm{dB}$ by ground-plane integrity, careful via stitching, and (when needed) absorber-loaded enclosures"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Signal integrity crosstalk specification for control wiring; should be verified against microwave engineering practice for cryogenic systems.

## §21.6 — ZZ interaction magnitude

- **Claim** (anchor): "the static Hamiltonian contains a $\zeta\\,Z_i Z_j$ term of size $10$–$100\\,\mathrm{kHz}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: ZZ coupling magnitude for fixed-coupler superconducting qubits; should be verified against device characterisation literature.

## §21.7 — Dilution refrigerator base temperature

- **Claim** (anchor): "reach a base temperature of approximately $10\\,\mathrm{mK}$ at the mixing chamber"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard dilution refrigerator base temperature specification; should be cross-checked against cryogenics vendor specs (Bluefors, Oxford Instruments, etc.).

## §21.7 — Dilution refrigerator temperature stages

- **Claim** (anchor): "The intermediate plates — $50\\,\mathrm{K}$, $4\\,\mathrm{K}$, still ($\\sim 700\\,\\mathrm{mK}$), cold plate ($\\sim 100\\,\\mathrm{mK}$), and mixing chamber"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Cryostat stage temperatures; should be verified against dilution refrigerator manufacturer specifications.

## §21.7 — Mixing chamber cooling power limit

- **Claim** (anchor): "the mixing chamber dissipates only a few hundred microwatts"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Mixing chamber cooling power figure; should be cross-checked against dilution refrigerator specifications.

## §21.7 — Standard drive-line attenuation profile

- **Claim** (anchor): "for example, $20\\,\mathrm{dB}$ at $4\\,\mathrm{K}$, $10\\,\mathrm{dB}$ at the still, $20\\,\mathrm{dB}$ at the mixing chamber"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attenuation profile for superconducting qubit drive lines; widely cited in cryogenic control literature but specific distribution varies by design.

## §21.7 — Total drive-line attenuation

- **Claim** (anchor): "achieving a useful drive amplitude at the qubit requires $60$–$70\\,\mathrm{dB}$ of total attenuation between the AWG output and the chip"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Total attenuation figure consistent with summing the distributed attenuators; should be cross-checked against experimental setup papers.

## §21.7 — Physical lines per superconducting qubit

- **Claim** (anchor): "A typical superconducting qubit needs three to five physical lines: a drive line, a flux line (if tunable), a readout input, a readout output (often shared via a feedline among many qubits), and sometimes a separate fast-flux line for two-qubit gates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Wiring overhead per qubit; should be verified against device architecture papers and vendor documentation.

## §21.8 — Superconducting qubit coherence time for feedforward budget

- **Claim** (anchor): "on superconducting devices that is $50$–$200\\,\\mu\\mathrm{s}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Coherence time range for superconducting qubits used as the feedforward budget; should be verified against current device characterisation literature.

## §21.8 — End-to-end feedback latency

- **Claim** (anchor): "a typical end-to-end feedback latency (ADC sample to demodulation to discrimination to instruction dispatch to AWG playback) on current hardware is a few hundred nanoseconds to a microsecond"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Hardware feedback latency figure; should be cross-checked against vendor documentation for systems like Quantum Machines OPX.

## §21.8 — Active reset residual excitation suppression

- **Claim** (anchor): "Iterating the loop $k$ times suppresses residual excitation as $p_e^k$ (assuming independent measurement errors)"
- **Method**: derivation
- **Source**: → §21.8 (geometric suppression from iterated Bernoulli trials)
- **Verified**: — · **Verdict**: open
- **Comment**: Standard probabilistic result: if each round leaves residual p_e independently, k rounds give p_e^k.

## §21.9 — Readout dead-time between pulse and next gate

- **Claim** (anchor): "the practical compromise is per-readout dead-time of a few hundred nanoseconds before the next gate"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Measurement-induced dead-time figure; should be verified against mid-circuit measurement literature.

## §21.9 — Active reset residual population range

- **Claim** (anchor): "Reset fidelity: residual excited-state population after active reset (typically $1$–$3\\%$ on current devices)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Residual excitation after active reset; should be verified against experimental papers reporting mid-circuit reset performance.

## §21.10 — TLS fluctuator frequency drift

- **Claim** (anchor): "Two-level-system (TLS) fluctuators in the substrate cause $\\omega_{01}$ to wander by tens of kilohertz over hours"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: TLS-induced frequency drift magnitude; should be verified against TLS noise characterisation literature.

## §21.10 — Calibration cadence on stable vs. unstable platform

- **Claim** (anchor): "Re-tune cadence on a stable platform is every few hours; on an unstable platform it can be every few minutes"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Operational calibration frequency claim; should be verified against published system operational experience (e.g., IBM Quantum, Rigetti).

## §21.10 — Single-qubit gate error rate calibration target

- **Claim** (anchor): "Single-qubit randomised benchmarking: verify the Clifford error rate is below the spec ($10^{-3}$ to $10^{-4}$)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Single-qubit gate error rate spec range; should be cross-checked against current device benchmarks from IBM, Google, Rigetti.

## §21.11 — DRAG suppresses leakage to first order in inverse anharmonicity

- **Claim** (anchor): "The construction analytically suppresses leakage to $|2\\rangle$ to first order in $1/\\alpha$ and is calibrated by a one-parameter scan of the DRAG coefficient on the device"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: DRAG leakage suppression order claim; should be verified against the original DRAG paper (Motzoi et al. 2009, or Gambetta et al. 2011).

## §21.11 — DRAG out-of-phase quadrature formula

- **Claim** (anchor): "the in-phase quadrature is a Gaussian and the out-of-phase quadrature is its derivative scaled by $-1/\\alpha$ (the inverse anharmonicity)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: DRAG pulse construction formula; should be verified against the original DRAG derivation (Motzoi et al. 2009).

## §21.11 — Named optimal control algorithm families

- **Claim** (anchor): "GRAPE (Gradient Ascent Pulse Engineering): discretise the pulse into $N$ piecewise-constant slices, compute the analytic gradient of the fidelity with respect to each slice's amplitude, and ascend"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: GRAPE algorithm description; should be verified against Khaneja et al. 2005 (original GRAPE paper).

## §21.11 — Krotov algorithm monotonic improvement property

- **Claim** (anchor): "Krotov: a monotonic-improvement variant — think of GRAPE's gradient step with the step size chosen so that fidelity provably never decreases — implemented via an integral-equation update"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Krotov monotonic improvement guarantee; should be verified against the Krotov optimal control literature (Sklarz & Tannor 2002 or Machnes et al.).

## §21.11 — CRAB algorithm parameter count

- **Claim** (anchor): "CRAB (Chopped Random Basis): expand the control into a small basis (Fourier modes, randomised orthogonal functions) with $O(10)$ parameters and run derivative-free optimisation on those"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: CRAB algorithm description and parameter count; should be verified against Caneva et al. 2011 (original CRAB paper).

## §21.12 — Named FPGA programming abstractions

- **Claim** (anchor): "Quantum Machines QUA is a Python-embedded DSL whose programs compile to an OPX bitstream; Zurich Instruments LabOne Q plays an analogous role"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named vendor products and their roles; should be verified against Quantum Machines and Zurich Instruments documentation.

## §21.13 — Flip-chip and TSV packaging mitigations

- **Claim** (anchor): "flip-chip assembly (replacing wirebonds with controlled-impedance bumps to a separate interposer), superconducting through-silicon vias (TSVs) that provide low-loss vertical interconnect"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Packaging technology claims; flip-chip and TSV use in superconducting qubit packaging should be verified against fabrication literature (e.g., IBM, Google chip packaging papers).

## §21.14 — Superconducting single-qubit gate time and fidelity

- **Claim** (anchor): "Single-qubit gates on superconducting transmons land in the $20$–$60\\,\mathrm{ns}$ range with fidelities of $99.9\\%$ to $99.99\\%$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Current best-practice single-qubit gate performance; should be cross-checked against recent benchmarking publications and vendor datasheets.

## §21.14 — Superconducting two-qubit gate time and fidelity

- **Claim** (anchor): "Two-qubit gates (cross-resonance, $\\sqrt{\\mathrm{iSWAP}}$, CZ via tunable coupler) run in $40$–$300\\,\mathrm{ns}$ with fidelities of $99.0\\%$ to $99.7\\%$ on leading devices"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Two-qubit gate performance range; should be verified against recent publications from IBM, Google, Rigetti.

## §21.14 — Trapped-ion two-qubit gate fidelity

- **Claim** (anchor): "Trapped-ion two-qubit gates are slower — microseconds to milliseconds — but routinely achieve $99.9\\%$ on small chains"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Trapped-ion two-qubit gate fidelity claim; should be verified against recent trapped-ion experiments (e.g., IonQ, Honeywell/Quantinuum, Oxford groups).

## §21.14 — Superconducting readout time and fidelity

- **Claim** (anchor): "Readout times of $200$–$1000\\,\\mathrm{ns}$ at $98\\%$ to $99.5\\%$ single-shot fidelity are typical on superconducting"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Superconducting qubit readout performance figures; should be cross-checked against recent device characterisation papers and vendor datasheets.

## §21.14 — Trapped-ion readout fidelity

- **Claim** (anchor): "trapped-ion readout is slower (hundreds of microseconds) but reaches above $99.9\\%$ through photon counting"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Trapped-ion readout fidelity via photon counting; should be verified against experimental literature.
