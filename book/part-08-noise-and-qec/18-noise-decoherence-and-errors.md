# Chapter 18. Noise, Decoherence, and Errors

> **Status:** draft · **Phase:** 4 · **Sections drafted:** 19 / 19

[← Previous: Chapter 17](../part-07-complexity/17-complexity-theory.md) · [Table of Contents](../../README.md) · [Next: Chapter 19 →](19-quantum-error-correction-and-fault-tolerance.md)

Chapter 10 introduced decoherence, channels, and the Kraus representation as the mathematical apparatus that describes any open-system evolution. Chapter 11 promoted the measurement postulate to POVMs and gave the calibration-matrix picture of readout error. This chapter sits between that apparatus and the error-correcting machinery of Chapter 19: it is the chapter where the formal channels become *named* failure modes of real hardware, where $T_1$ and $T_2$ stop being abstract decay times and become numbers a benchmark returns, and where the noise budget of a circuit becomes something you can attribute to specific physical mechanisms. Almost nothing here is new mathematics — the channels, the Kraus operators, the POVMs, and the Lindblad dissipators have all been built. What changes is the question: instead of "what is a channel", we ask "which channel is *this* device, how do we measure it, and what can we do about it before we are forced to spend qubits on error correction".

> **How to read this chapter.** §§18.1–18.3 are the hardware-side phenomenology: where noise comes from, what $T_1$ and $T_2$ actually measure, and how dephasing decomposes into the pieces a designer can move independently. §§18.4–18.9 catalogue the channels and the parameter ranges current devices report; readers comfortable with §§10.11–10.13 can skim these for the numbers. §§18.10–18.14 are the *characterisation* layer: coherent versus incoherent decomposition, the spectral picture, fidelity, RB and its variants, GST, cycle benchmarking. §§18.15–18.17 are the *modelling* layer: how to write down a noise model the simulator can run, how to build an error budget from component measurements, and how SPAM gets disentangled from gate error. §18.18 is pre-QEC mitigation — ZNE, PEC, virtual distillation, symmetry verification — including a frank section on when these techniques *help* and when they *hurt*.

## 18.1 Sources of Noise

A useful first taxonomy of noise on a quantum processor sorts mechanisms by **where the bath lives** and **what the system couples to**. Five families dominate the published budgets of every contemporary platform.

**Thermal noise.** The qubit is at some effective temperature $T_{\mathrm{eff}}$, and the bath is the residual thermal population of the modes that couple to it. For a superconducting transmon at 15 mK with a 5 GHz transition, the equilibrium excited-state population $p_1^{\mathrm{eq}} = (1 + e^{\hbar\omega/k_B T})^{-1}$ is around $10^{-7}$, but the *effective* temperature inferred from steady-state populations is typically 50–100 mK because non-equilibrium quasiparticles, infrared photons, and stray microwave radiation excite the qubit above the fridge temperature. Thermal excitations drive both $|0\rangle \to |1\rangle$ and $|1\rangle \to |0\rangle$ transitions; the standard "amplitude damping" model (§10.12) is the zero-temperature limit and over-attributes errors to the relaxation direction when $T_{\mathrm{eff}}$ is finite.

**Control noise.** The microwave pulses, flux drives, and laser fields that implement gates carry their own imperfections: amplitude drift over hours, phase noise on the local oscillator, timing jitter on the AWG, and finite anharmonicity that lets a pulse drive transitions other than the target one. A gate fidelity ceiling set by control electronics is *systematic* — it produces the same error on every shot rather than a stochastic one — and shows up as a coherent rotation error (§18.10) until calibration drift randomises it across a long run.

**Crosstalk.** Acting on qubit $i$ unintentionally drives qubit $j$. The pathway can be **direct** (residual capacitive or microwave coupling on a chip), **indirect via a shared bus** (a coupler intended to mediate a two-qubit gate also leaks a small unintended rotation onto spectator qubits), or **classical** (the same control line carries pulses that bleed onto adjacent qubits because the dispersive isolation is finite). Crosstalk is the single biggest reason single-qubit gate fidelities measured in *isolation* exceed those measured in *simultaneous* operation — §18.13 returns to simultaneous RB as the diagnostic.

**Leakage out of the computational subspace.** Most physical qubits are in fact qutrits or higher: a transmon has $|0\rangle, |1\rangle, |2\rangle, \ldots$; a trapped-ion qubit has a manifold of hyperfine levels of which two are designated computational. A leakage event is a population transfer from $\\{|0\rangle, |1\rangle\\}$ to a higher level $|2\rangle, |3\rangle, \ldots$ The dangerous property of leakage is that *standard error-correction codes do not catch it*: syndrome measurements that assume the qubit lives in a two-dimensional space do nothing useful when a qubit is in $|2\rangle$, and the leaked population sits there until a $T_1$ event brings it back, often contaminating subsequent rounds. Leakage-reduction units (LRUs) are explicit circuit additions that pump $|2\rangle$ back to $\\{|0\rangle, |1\rangle\\}$; Chapter 19 returns to them in the surface-code context.

**Two-level systems (TLS).** Microscopic defects in the substrate, the oxide layers of Josephson junctions, or the dielectric surfaces of a chip behave as nearly-resonant two-level systems that the qubit can hybridise with. A TLS that happens to sit close in frequency to the qubit transition can dominate $T_1$; TLS frequencies drift on timescales of minutes to days, which is the leading explanation for the "fluctuating $T_1$" routinely seen on superconducting devices. The TLS bath is the canonical source of $1/f$-spectrum dephasing (§18.11) and is the main reason real noise is *not* stationary on the long timescales over which a benchmark is repeated.

Other sources — cosmic-ray ionisation events that flood a chip with quasiparticles for milliseconds, laser-intensity noise on optical-tweezer arrays, vibration-induced phase noise on ion trap lasers — are platform-specific and Chapter 21 covers them. The five families above are the universal vocabulary.

## 18.2 T1, T2, and T2*

A single qubit's effective noise budget is dominated, on most platforms, by two numbers: the **relaxation time** $T_1$ and the **dephasing time** $T_2$. Chapter 10's §10.9 introduced both; this section gives the operational distinctions a practitioner needs.

**$T_1$ — energy relaxation.** Prepare $|1\rangle$, wait time $t$, measure. The probability of finding $|1\rangle$ decays as

$$
P_1(t) \;=\; P_1(0)\\, e^{-t/T_1},
$$

up to a small thermal asymptote $p_1^{\mathrm{eq}}$. Fitting the decay extracts $T_1$. The fit reports a *single* number only if the decay is exponential; deviations (stretched exponentials, plateaus, beating against a TLS) are diagnostic of more complicated bath structure.

**$T_2$ — coherence decay under a Hahn-echo sequence.** Prepare $|+\rangle = (|0\rangle + |1\rangle)/\sqrt{2}$, evolve for time $\tau/2$, apply a $\pi$ pulse, evolve another $\tau/2$, then measure in the $X$ basis. The $\pi$ pulse refocuses any *static* offset between the qubit frequency and the drive, so the remaining decay reflects time-dependent fluctuations only. The envelope decays as $e^{-t/T_2}$ (sometimes with a stretched exponent $e^{-(t/T_2)^\alpha}$ for non-Markovian baths).

**$T_2^*$ — coherence decay under free evolution (no echo).** Same protocol as $T_2$ but without the refocusing $\pi$ pulse. The envelope reflects *all* dephasing, including the slow drift that the Hahn echo cancels. On most platforms $T_2^* < T_2$, sometimes by an order of magnitude.

**The decomposition.** The standard relation is

$$
\frac{1}{T_2} \;=\; \frac{1}{2\\, T_1} + \frac{1}{T_\varphi},
$$

where $T_\varphi$ is the **pure dephasing time** — the timescale on which off-diagonal coherence decays from pure phase noise alone. The bound $T_2 \le 2 T_1$ follows immediately. The decomposition lets one compare two devices on the same chemistry: if $T_2$ improves but $T_1$ does not, the improvement came from $T_\varphi$ (better filtering, better shielding); if both improve in lockstep, the bath was relaxation-limited.

**Why $T_2^*$ differs from $T_2$.** Slow drifts in the qubit frequency (charge offsets, slow TLS, magnetic-field drift on ions) make the qubit's phase relative to the drive frame walk over time. Averaged across many shots, the off-diagonal coherence appears to decay even though each individual shot is fully coherent — the apparent decoherence is *quasi-static dephasing*. The Hahn echo refocuses any offset that is constant over $\tau$; what remains is *truly* dynamical dephasing. The ratio $T_2 / T_2^*$ is a direct measure of how much of the apparent decoherence is quasi-static.

**Practical numbers, mid-2025.** Superconducting transmons report $T_1 \sim 100$–$400$ µs and $T_2 \sim 100$–$300$ µs on best-in-class devices; trapped-ion hyperfine qubits report $T_1 > 10^4$ s (essentially infinite on circuit timescales) and $T_2 \sim 10$–$100$ s under dynamical decoupling; neutral-atom qubits in optical tweezers report $T_2$ in the seconds. The numbers move every quarter; what does not move is the ordering: ions and atoms have orders-of-magnitude longer coherence than solid-state qubits, at the cost of slower gates.

## 18.3 Dephasing

Pure dephasing is the most subtle of the three timescales because it depends on *what frequency band* of the noise spectrum is doing the work. The Lindblad form $L_\varphi = \sqrt{\gamma_\varphi/2}\\, Z$ (§10.11) is the white-noise limit; on real hardware the dephasing spectrum is rarely white.

**Frequency-domain picture.** Treat the qubit as a two-level system with a fluctuating splitting $\omega_0 + \delta\omega(t)$, where $\delta\omega(t)$ is a zero-mean stochastic process with power spectral density $S_{\delta\omega}(\omega)$. The accumulated phase over time $t$ is $\phi(t) = \int_0^t \delta\omega(s)\\, ds$, and the off-diagonal coherence decays as

$$
\langle e^{i\phi(t)} \rangle \;=\; \exp\Bigl(-\tfrac{1}{2} \int_{-\infty}^{\infty} S_{\delta\omega}(\omega)\\, F(\omega, t)\\, d\omega\Bigr),
$$

where $F(\omega, t)$ is the **filter function** of the chosen pulse sequence. Free evolution has filter $F(\omega, t) = t^2 \mathrm{sinc}^2(\omega t / 2)$, which is sharply peaked at $\omega = 0$ — DC drifts dominate, hence the short $T_2^*$. A Hahn echo has $F(\omega, t) \propto \sin^4(\omega t / 4) / \omega^2$, suppressing the DC peak; quantitatively, it filters out anything slower than $\sim 1/t$. Longer dynamical-decoupling sequences (CPMG, XY-4, XY-8, Uhrig) push the high-pass corner ever higher in frequency.

**$1/f$ noise.** Most solid-state qubits have a dephasing spectrum that goes as $S_{\delta\omega}(\omega) \sim A/\omega^\alpha$ with $\alpha \approx 1$ — the canonical "$1/f$" or "flicker" spectrum. Its physical origin is the ensemble of TLSs (§18.1) with a broad log-uniform distribution of relaxation rates. The defining feature of $1/f$ noise is that *it has no characteristic timescale*: power is concentrated at low frequencies but extends across many decades, so the integrated noise diverges logarithmically with the measurement bandwidth. Practical consequences: $T_2^*$ depends on how long you average; the decay shape under free evolution is *Gaussian* ($e^{-(t/T_2^*)^2}$) rather than exponential; and dynamical decoupling delivers especially large gains because each additional pulse buys another factor of bandwidth suppression.

**Markovian vs non-Markovian noise.** A Markovian bath has no memory: the noise at time $t$ is statistically independent of the noise at time $t - \tau$ for any $\tau$ longer than the bath correlation time. Markovianity is the assumption that justifies Lindblad evolution (§10.11); when it holds, decoherence is purely exponential, the channel is completely characterised by a constant rate, and the noise can be simulated by drawing fresh stochastic samples. A non-Markovian bath retains memory across gates: the noise on gate 100 is correlated with the noise on gate 1. $1/f$ noise is paradigmatically non-Markovian (the low-frequency power gives long-range temporal correlations), as is any noise dominated by a few resonant TLSs.

The practical signature of non-Markovianity is **information backflow** — a tomographic distinguishability measure that has decreased between time $t_1$ and $t_2 > t_1$ can *increase* again at $t_3 > t_2$. Markovian channels never allow this; non-Markovian channels regularly do. The deeper consequence is that benchmarks calibrated against a Markovian model under-predict error rates on long circuits when the noise has memory: a sequence of 1000 gates each with 99.9% Markovian fidelity has an expected end-to-end error around 63%, but the same fidelity assembled from correlated $1/f$ dephasing accumulates errors faster because the slow drifts coherently add over the circuit. §18.16 returns to this point in the context of benchmarking-versus-application gap.

## 18.4 Gate Errors

A gate-error budget on a real device sorts into three rough buckets.

**Decoherence-limited errors.** Even a perfectly applied gate accumulates an error $\epsilon \sim t_{\mathrm{gate}} / T$, where $T$ is the relevant coherence time. For single-qubit gates of duration 20–50 ns on transmons with $T_1, T_2 \sim 100$ µs, this gives a floor around $10^{-4}$; the same gate on an ion-trap qubit (1–100 µs duration, $T_2$ of seconds) has a coherence floor several orders of magnitude lower. The fact that ion traps achieve $10^{-4}$ to $10^{-5}$ per-gate fidelity in practice means the floor is *not* coherence-limited; the floor is set by control noise instead.

**Control-limited errors.** Calibration error in the pulse amplitude, shape, or phase causes a systematic over- or under-rotation. A pulse calibrated to be a $\pi$ rotation but applied with 1% amplitude error implements $R_X(\pi(1 + 0.01))$, which is a *coherent* error and shows up as an extra rotation rather than a stochastic flip. Coherent errors compound differently from stochastic ones — see §18.10.

**Leakage and crosstalk.** Discussed in §18.1; quantifiable as a separate component in §18.13.

**Where the field stands today.** Published gate fidelities, taken from leading platforms over 2023–2025:

- Single-qubit Clifford gates: $99.99\%$ on best-in-class trapped ions, $99.95\%$ on superconducting transmons, $99.5\%$–$99.9\%$ on neutral atoms.
- Two-qubit entangling gates (CZ, CNOT, Mølmer–Sørensen, Rydberg CZ): $99.9\%$ on best-in-class ions and on the latest superconducting devices, $99.5\%$ on most current devices, and $99.5\%$–$99.7\%$ on neutral atoms ($99.5\%$ demonstrated by Evered et al. 2023; successors have since exceeded it).
- Measurement (single-shot, single-qubit): $99\%$–$99.9\%$, varying widely with integration time and assignment threshold.
- Idle errors: dominated by $T_1$ and $T_2$; usually small ($10^{-4}$ per microsecond) on coherence-dominant platforms.

The two-qubit fidelity is the *bottleneck* for every fault-tolerance estimate. Each additional decade of two-qubit fidelity translates directly into smaller surface-code patches for the same logical error rate (§19.12).

**The infidelity-vs-error-per-gate gap.** Reported fidelities are *averages* — Clifford-RB returns an average gate error that approximates the depolarising-channel parameter (§18.10), not a worst-case bound. A 99.9% average could hide a 1% worst-case error on a particular Pauli direction. The diamond norm (§12.6) is the proper worst-case metric; it is harder to measure directly, and the field has not standardised reporting it, which is a known gap in the benchmarking conventions.

## 18.5 Readout Errors

Readout error is the noise on the *classical bit* that gets returned at the end of the circuit. Chapter 11 §11.7 introduced the calibration-matrix view; this section catalogues the failure modes and the assignment trade-offs.

**The four corners of single-qubit readout.** A measurement returns either "0" or "1" given that the qubit is in $|0\rangle$ or $|1\rangle$:

- $P(0 \mid 0)$: prepare $|0\rangle$, get "0". Usually 99%+ on most platforms.
- $P(1 \mid 1)$: prepare $|1\rangle$, get "1". Often $1$–$3\%$ worse than $P(0\mid 0)$ on superconducting devices, because $T_1$ during integration can let $|1\rangle$ decay to $|0\rangle$ before the integrator finishes.
- $P(1 \mid 0)$, $P(0 \mid 1)$: complementary error rates.

The asymmetry $P(0 \mid 0) > P(1 \mid 1)$ is a *physical* statement on superconducting hardware: the longer the dispersive integration, the better the signal-to-noise, but also the more $T_1$ events leak $|1\rangle$ to $|0\rangle$ during the measurement itself. Designers tune integration time to balance these.

**Integration time vs assignment threshold.** A typical dispersive measurement returns a complex IQ point per shot; the assignment decision is whether the IQ point falls on one side of a threshold or the other. Shrinking the integration time reduces $T_1$-induced assignment error but increases the IQ-noise variance and therefore the threshold error. A 1 µs integration window on a transmon with $T_1 \sim 100$ µs already loses $\sim 1\%$ of $|1\rangle$ population to relaxation; pushing past that to $\sim 0.1\%$ requires hardware-level $Q$-factor improvements, not just slower readout.

**Mid-circuit measurement.** Measurements used as intermediate steps in a feed-forward protocol (Chapter 19) have a stricter quality bar: the measurement must not disturb spectator qubits, the back-action on the *measured* qubit must reset cleanly to a known state, and the latency must allow the classical control system to feed forward to subsequent gates within the qubits' coherence time. The implementation gap between end-of-circuit and mid-circuit measurement is one of the leading current engineering frontiers.

## 18.6 State-Preparation Errors

The error in preparing the initial $|0\rangle^{\otimes n}$ state is usually subdominant to gate and readout error, but it is rarely zero. The two mechanisms are residual thermal population and reset infidelity.

**Residual thermal population.** Even at fridge temperatures, a transmon's steady-state $|1\rangle$ population is $10^{-3}$ to $10^{-2}$ rather than the equilibrium prediction. Without active reset, the initial state is the thermal-equilibrium mixture $\rho_{\mathrm{th}} = (1 - p_1^{\mathrm{eq}})|0\rangle\langle 0| + p_1^{\mathrm{eq}}|1\rangle\langle 1|$ rather than $|0\rangle\langle 0|$.

**Active reset.** Measurement-based reset performs a projective measurement and conditionally applies an $X$ pulse if the outcome is "1"; the residual error is the readout error of the measurement *plus* any $T_1$ event during the conditional pulse, typically $10^{-3}$ to $10^{-4}$ after two to three repeated heralded rounds (a single pass leaves roughly the readout error, at the percent level — see §21.9). Unconditional reset (e.g., via a fast-decay readout resonator pumping protocol) achieves comparable numbers without conditional logic.

**SPAM error is hard to separate from gate error.** A benchmark that prepares $|0\rangle$, applies a gate, and measures cannot distinguish a state-preparation error from a measurement error or a small gate error — all three corrupt the final outcome the same way. Randomised benchmarking (§18.12) is designed to be *SPAM-robust*: the decay rate is sensitive to gate error but not to constant preparation and measurement offsets. Gate-set tomography (§18.14) takes the harder route of estimating everything jointly. The single-letter acronym **SPAM** ("state-preparation and measurement") collects these effects because in many analyses they appear inseparably and the only thing one can hope to do is subtract their combined contribution from gate-level metrics.

## 18.7 Crosstalk

**Definition.** Crosstalk is any unintended effect a control or measurement operation on qubit $i$ has on a qubit $j \neq i$ (or on the same qubit's leakage levels). It comes in classical and quantum varieties.

**Classical crosstalk.** Same control wire, two qubits. A pulse on the wire intended for qubit $i$ couples capacitively or inductively to qubit $j$'s control field. Mitigation is calibration: characterise the crosstalk matrix and pre-compensate by subtracting the leaked component from each drive. Modern device layouts try to make this matrix near-diagonal by physical isolation, but it is never exactly zero.

**Quantum crosstalk.** Always-on coupling between qubits. A transmon array deliberately couples nearest neighbours to implement two-qubit gates; the residual ZZ coupling $\zeta\\, Z_i Z_j$ between idle qubits is *not* zero and produces a phase that depends on the spectator state. During a long single-qubit operation on qubit $i$, qubit $j$ has been picking up an unintended phase the entire time. Quantum crosstalk is mitigated by tunable couplers (which can switch the coupling to nearly zero in the idle configuration), by frequency-tuning into ZZ-free configurations, or by inserting dynamical-decoupling pulses on idle qubits.

**Why crosstalk matters for QEC.** Surface codes (§19.12) assume that single-qubit operations on data qubits are independent of the state of nearby ancilla qubits. Quantum crosstalk breaks this assumption and produces *correlated* errors that the standard decoder cannot interpret as independent Pauli errors. Surface-code thresholds degrade significantly in the presence of crosstalk: a "good" crosstalk-free physical error rate of $0.5\%$ can be effectively $1.5\%$ once nearest-neighbour ZZ is included, sometimes pushing the system above the threshold and breaking the scaling story entirely. §18.13 returns to simultaneous RB as the canonical diagnostic.

## 18.8 Leakage

**Leakage** is population transfer from the computational subspace $\\{|0\rangle, |1\rangle\\}$ to higher levels $|2\rangle, |3\rangle, \ldots$ Two-qubit gates are the primary culprit: on transmons, the CZ gate that uses the $|11\rangle \leftrightarrow |20\rangle$ avoided crossing has a small but nonzero probability of leaving population in $|2\rangle$ at the end. On ion traps, off-resonant excitation to other hyperfine levels plays the analogous role; on neutral atoms, residual Rydberg-state population after a Rydberg gate.

**Why leakage is dangerous.** A leaked qubit looks, to a syndrome measurement that assumes a two-level structure, like an ordinary error — except that subsequent gates on the leaked qubit behave unpredictably. The leaked population can sit at $|2\rangle$ for an entire $T_1$ time (often *longer* than the computational $T_1$, depending on the level structure), polluting many rounds of syndrome extraction. Empirically, surface-code experiments report that leakage events are the single largest contributor to **time-correlated** errors that break the assumption of independent error rounds.

**Mitigation.** Three layers:

1. *Gate-level*: shape pulses to suppress leakage at design time (DRAG pulses on transmons reduce leakage by an order of magnitude over square pulses; STIRAP-like protocols on ion traps).
2. *Circuit-level*: leakage-reduction units (LRUs) periodically pump $|2\rangle$ population back to the computational subspace. The simplest is a swap-and-reset: swap the suspect qubit's state to a fresh ancilla, then reset.
3. *Decoder-level*: extend the syndrome decoder to recognise the signature of leakage (typically a *streak* of correlated errors across multiple rounds at the same qubit) and apply an explicit reset when detected.

The fault-tolerance theorems of Chapter 19 assume leakage is suppressed below the threshold; mitigating leakage is a precondition for those theorems to apply, not a consequence of them.

## 18.9 Thermal Noise

A finite-temperature bath generalises the zero-temperature amplitude-damping channel of §10.12. The **generalised amplitude damping** (GAD) channel has Kraus operators

$$
K_0 \;=\; \sqrt{p}\\,\bigl(|0\rangle\langle 0| + \sqrt{1 - \gamma}\\, |1\rangle\langle 1|\bigr),
$$

$$
K_1 \;=\; \sqrt{p}\\, \sqrt{\gamma}\\, |0\rangle\langle 1|,
$$

$$
K_2 \;=\; \sqrt{1 - p}\\,\bigl(\sqrt{1 - \gamma}\\, |0\rangle\langle 0| + |1\rangle\langle 1|\bigr),
$$

$$
K_3 \;=\; \sqrt{1 - p}\\, \sqrt{\gamma}\\, |1\rangle\langle 0|,
$$

where $\gamma = 1 - e^{-t/T_1}$ is the same relaxation parameter as in zero-temperature amplitude damping and $p$ encodes the bath temperature via $p_1^{\mathrm{eq}} = 1 - p$. At $T = 0$ this reduces to two-Kraus amplitude damping ($p = 1$, only $K_0, K_1$ contribute); at finite $T$ the additional $K_2, K_3$ implement the upward $|0\rangle \to |1\rangle$ transitions that thermal excitation drives.

**The fixed point** of GAD is the thermal state $\rho_{\mathrm{th}} = (1 - p_1^{\mathrm{eq}})|0\rangle\langle 0| + p_1^{\mathrm{eq}}|1\rangle\langle 1|$ — not $|0\rangle\langle 0|$. Idle qubits relax to $\rho_{\mathrm{th}}$, not to $|0\rangle$. The asymmetry between $P(0 \mid 0)$ and $P(1 \mid 1)$ in §18.5 has the same origin: the bath the qubit equilibrates against is at a small but nonzero $T_{\mathrm{eff}}$.

Thermal noise dominates very-low-error budgets on cryogenic platforms only when control and dephasing have been pushed far enough that even the small thermal population matters; on most current devices it is a 1–10% contribution to the total error, but its *characterisation* — measuring $p_1^{\mathrm{eq}}$ to extract $T_{\mathrm{eff}}$ — is now part of standard device characterisation suites.

## 18.10 Coherent vs. Incoherent Errors

A central operational distinction in noise characterisation is **coherent** versus **incoherent** error.

**Coherent error.** A unitary deviation from the intended gate. Example: implementing $R_X(\theta + \delta)$ instead of $R_X(\theta)$, where $\delta$ is a systematic miscalibration. The output state is still pure (assuming a pure input), but it is not the *right* pure state. Coherent errors compound *coherently*: applying $n$ gates each with a $\delta$ overrotation produces a total rotation error of $n\delta$, and the *probability* of a wrong outcome scales as $(n\delta)^2$.

**Incoherent error.** A non-unitary channel — typically depolarising, dephasing, or amplitude damping — that mixes the output state with probability $p$ per gate. Applying $n$ such gates produces a state with purity decay $(1 - p)^n$, and the probability of a wrong outcome scales as $1 - (1 - p)^n \approx np$ for small $np$.

**The compounding rule.** Coherent errors compound as $(n\delta)^2$, incoherent errors as $n p$. For the same per-gate **infidelity** $\epsilon = \delta^2$ (coherent) or $\epsilon = p$ (incoherent), coherent errors are *worse* on long circuits: $n^2 \delta^2 \gg n \delta^2$ when $n$ is large. This is the formal version of the "drift is bad" intuition: a systematic miscalibration ruins a long circuit much faster than a stochastic noise of the same per-step magnitude.

**Twirling.** A practical technique that converts coherent to incoherent error: between gates, apply a random Pauli $P$ and the inverted Pauli $P^\dagger$ at the next layer. Averaged over the random Pauli, any coherent error $e^{i \delta H}$ becomes a Pauli-channel depolarisation with the same average infidelity. Twirling does *not* reduce the average infidelity; it *converts the scaling* from $n^2$ to $n$. **Pauli twirling** is the basic version; **Clifford twirling** is more powerful (it converts arbitrary unitaries into depolarising channels) and is the conceptual basis for randomised benchmarking (§18.12).

**Bloch sphere picture.** A coherent overrotation is an extra rotation about a fixed axis; the Bloch vector lengths are preserved but the direction is off. A depolarising error shrinks the Bloch vector toward the origin. After twirling, an arbitrary unitary error becomes a symmetric shrinking — same length loss, no direction bias.

**Why this matters for benchmarking.** Randomised benchmarking returns a single number, the *average* error rate. It is *insensitive* to whether that error is coherent or incoherent — both look the same under the random-Clifford averaging. To distinguish the two, one needs **cycle benchmarking** or **purity benchmarking** (§18.13), which measure the residual purity of the output state and therefore detect the difference between unitary and non-unitary deviation.

## 18.11 Spectral Density and Non-Markovian Models

The simplest noise model — Markovian, white, time-stationary — is rarely accurate. This section catalogues the standard generalisations.

**Power spectral density.** For a stationary stochastic process $\delta\omega(t)$, the **spectral density** $S_{\delta\omega}(\omega)$ is the Fourier transform of its autocorrelation function. White noise has $S(\omega) = $ const; $1/f$ noise has $S(\omega) \propto 1/\omega$; Lorentzian noise (a single TLS) has $S(\omega) \propto 1/(1 + \omega^2 \tau^2)$. The dephasing rate produced by a given spectrum depends on which frequency band the qubit-control sequence is sensitive to, via the filter-function formalism of §18.3.

**Noise spectroscopy.** A modern technique that *measures* $S(\omega)$ on a real qubit. Apply a CPMG-style decoupling sequence with $N$ pulses over a time $T$; the filter function is sharply peaked at $\omega \approx \pi N / T$. By scanning $N$ at fixed $T$, one scans the filter peak and reconstructs $S(\omega)$ point by point. Published noise spectra on superconducting transmons typically show $1/f$ from 1 Hz to $\sim 10^5$ Hz, a "knee" where TLS spectroscopy resolves individual defects, and a higher-frequency white floor set by Johnson noise on the control lines.

**Non-Markovian channels.** A channel family $\\{\mathcal{E}(t)\\}_{t \geq 0}$ is Markovian if it is **CP-divisible**: for all $0 \leq t_1 \leq t_2$ there is a CPTP map $\mathcal{V}$ with $\mathcal{E}(t_2) = \mathcal{V} \circ \mathcal{E}(t_1)$. The familiar time-homogeneous semigroup $\mathcal{E}(t_2) = \mathcal{E}(t_2 - t_1) \circ \mathcal{E}(t_1)$ (Lindblad evolution with constant rates) is the special case where $\mathcal{V}$ depends only on the elapsed time $t_2 - t_1$. When this fails, the channel has memory: applying gate $G_1$ at $t_1$ leaves a "noise residue" that affects gate $G_2$ at $t_2$ in a way that depends on the noise that hit $G_1$. The Breuer–Laine–Piilo measure of non-Markovianity quantifies how much *trace distance* between two initially distinguishable states *increases* over time — Markovian channels are contractive in trace distance (§12.6), so any increase is a Markovianity violation.

**Implications for simulation.** A Markovian noise model can be added to a circuit simulator by inserting an independent Kraus channel after each gate; this is the standard approach. A non-Markovian model cannot — the channel at time $t$ depends on the entire history. The practical workaround is to extend the simulation state to include a small bath, and to apply unitary evolution on the joint system-bath space; the cost is a polynomial blow-up in simulation memory but a faithful non-Markovian model.

## 18.12 Single-Number Benchmarks: RB and Variants

A full process tomography (§11.4) on a gate returns $\sim 4^n$ numbers describing the channel completely; the cost is exponential in the qubit count. Many practical questions only need a *single* number that summarises gate quality. **Randomised benchmarking** (RB) is the standard tool.

**Clifford RB protocol.**

1. Sample a sequence of $m$ random Cliffords $C_1, C_2, \ldots, C_m$.
2. Compute the inverse Clifford $C_{\mathrm{inv}} = (C_m \cdots C_1)^{-1}$ (which is also a Clifford, since Cliffords form a group).
3. Run the circuit $C_{\mathrm{inv}} C_m \cdots C_1$ on $|0\rangle^{\otimes n}$ and measure in the computational basis.
4. The ideal outcome is $|0\rangle^{\otimes n}$ with probability 1. The noisy outcome is some empirical survival probability $F(m)$.
5. Repeat over many sequences of length $m$, average, then fit $F(m) = A\\, p^m + B$.

The fitted decay constant $p$ relates to the average gate error per Clifford as $\epsilon = (1 - p)(d - 1)/d$ where $d = 2^n$.

**Why RB works.** The Clifford group forms a 2-design over the unitary group, which means averaging a noise channel over random Cliffords produces a depolarising channel with the same average fidelity. The exponential decay of the survival probability isolates the depolarising decay rate from the SPAM offset (absorbed into $A$ and $B$), making RB SPAM-robust. The fitted $\epsilon$ is independent of which Clifford fails; it is a *group average*.

**Limitations of Clifford RB.**

- It returns an average; it does not localise which gates are bad.
- It is sensitive only to *average* fidelity, not to worst-case or coherent contributions (§18.10).
- It assumes time-stationary, gate-independent noise — assumptions that are routinely violated.
- The Clifford sequences must be compiled into native gates; the resulting depth depends on the compilation, and the reported error is *per Clifford*, not per native gate. Quoting RB results without specifying the Clifford-to-native conversion is a known source of confusion in the literature.

**Interleaved RB.** Modifies Clifford RB to extract the error of a *specific* target gate $G$. The protocol interleaves $G$ between each Clifford: $C_1, G, C_2, G, \ldots, C_m, G$, with inversion. Compare the fitted decay with and without the interleaved $G$; the ratio gives the error specific to $G$, modulo correlations between $G$'s error and the surrounding Cliffords. The published numbers for individual two-qubit gates almost always come from interleaved RB.

**Direct RB and other variants.** *Direct RB* uses native gates instead of Cliffords and avoids the Clifford-compilation overhead. *Simultaneous RB* runs Clifford RB on multiple qubits in parallel and compares to the single-qubit-isolated rate; the gap is a measure of crosstalk. *Mirror RB* uses palindromic sequences and is more sensitive to coherent error than Clifford RB.

**Cross-entropy benchmarking (XEB).** A non-RB single-number benchmark that fits a different kind of decay: run a random circuit, collect output samples, score them against the ideal probabilities of the *observed* bit strings (computed classically), and fit an exponential decay in circuit depth. XEB was the centrepiece of the 2019 supremacy experiment; it has the advantage of working on circuits that are not in the Clifford group, and the disadvantage that the ideal probabilities must be computed classically — each one effectively requires simulating the full circuit, which is infeasible above ~50 qubits and is the reason XEB is itself a quantum-advantage demonstration.

## 18.13 Crosstalk and Cycle-Level Benchmarks

The single-gate fidelities of §18.12 are measured on gates run *in isolation* or on Cliffords applied sequentially. Real circuits run many gates *simultaneously* — at the same clock cycle — and the simultaneous error can be much larger than the sequential error.

**Simultaneous RB.** Run independent Clifford RB on every qubit *at the same time*. Compare the fitted per-Clifford error to the single-qubit-in-isolation rate. The gap is the **crosstalk contribution** to single-qubit error; on current devices it is typically 1.5×–3× the isolated rate for nearest-neighbour qubits.

**Cycle benchmarking.** A cycle is a maximal layer of gates applied at one clock tick. Cycle benchmarking measures the error per *cycle* rather than per gate. The protocol uses Pauli randomisation around each cycle (Pauli twirling, §18.10) to convert the cycle's error channel into a Pauli channel; the resulting decay isolates the Pauli error rates of the cycle, which is the right quantity for a fault-tolerance budget because syndrome extraction is performed cycle-by-cycle.

**Mirror circuit benchmarking.** A mirror circuit is the concatenation of a random circuit $U$ with its inverse $U^{-1}$, with Pauli randomisation inserted between. Ideally the mirror returns to the initial state; the empirical fidelity decay is a benchmark that, unlike Clifford RB, *includes* coherent errors and is sensitive to gate sequencing effects. Mirror benchmarks are now reported alongside RB in many publications because they better predict whole-circuit failure rates.

**Purity benchmarking.** Measures the second-moment statistics of the survival probability across random sequences, not just the mean. The purity decays at a rate set by the *incoherent* part of the channel only; comparing the purity decay to the RB decay isolates the coherent-vs-incoherent ratio (§18.10). On a device whose RB error is dominated by coherent contributions, the purity decay rate is much *smaller* than the RB decay rate.

## 18.14 Process Tomography and Gate Set Tomography

When a single number is not enough — for example, when a particular gate is misbehaving in a way that RB averages away — full process characterisation is the next layer.

**Quantum process tomography (QPT).** Briefly recapping §11.4: estimate the $4^n \times 4^n$ matrix of the Pauli-transfer representation of a channel $\Lambda$ by preparing each of $4^n$ basis states, sending them through $\Lambda$, performing state tomography on the output, and inverting the resulting overdetermined linear system. The shot cost is $\Theta(16^n / \varepsilon^2)$, so QPT is comfortable for one-qubit channels, hard for two-qubit channels, and impossible above three. The principal *systematic* limitation is that QPT conflates the target channel with the SPAM error of the surrounding preparation and measurement, biasing the estimate.

**Gate set tomography (GST).** Resolves QPT's SPAM-conflation problem. GST treats *every* gate, *every* preparation, and *every* measurement as an unknown and estimates them jointly from a structured experimental design called a **germ set** of repeated short circuits. The result is a self-consistent, gauge-fixed gate-set model that returns:

- Each gate's complete Pauli-transfer matrix.
- The state-preparation density matrix(es) and the measurement POVM elements.
- Quantitative error metrics (process fidelity, diamond norm distance from target) for each gate.
- A formal goodness-of-fit statistic that flags model violations (e.g., non-Markovian effects that no Markovian gate model can explain).

GST's strength is its rigour: the output is a fully consistent description of the device under the Markovian assumption, and the goodness-of-fit detector tells you when that assumption itself fails. Its weakness is cost: a GST experiment on two qubits requires $10^5$ to $10^6$ circuit executions and substantial post-processing; one cannot run GST as a daily calibration on a 50-qubit device.

**When to use which.** RB for daily monitoring and a single quality number. Interleaved RB when one specific gate is the bottleneck. Simultaneous RB and cycle benchmarking for crosstalk and concurrent operation. Mirror RB for end-to-end circuit-quality forecasting. Purity benchmarking for the coherent-vs-incoherent split. QPT for one-qubit channels when SPAM is well-characterised. GST for a full diagnostic of a small block of qubits, particularly when something is unexplained. The benchmarks form a hierarchy — cheap-and-coarse to expensive-and-detailed — and the practitioner picks the cheapest one that answers the question at hand.

## 18.15 Noise Models for Simulators

A simulator-side noise model is a recipe for inserting Kraus channels (or stochastic Pauli operators) into an otherwise-ideal circuit, so the simulation predicts what a real device will produce. Three layers of fidelity are common.

**Depolarising-only model.** After each gate $G$, apply a depolarising channel with parameter $p$ equal to the gate's measured RB error. This is the crudest faithful model: it gets the average error rate right and nothing else. It is **isotropic** (no distinction between $X$, $Y$, $Z$ errors), **memoryless** (no correlation between consecutive errors), and **SPAM-free** (no readout or preparation error). It works well as a first-pass estimate of circuit success probability and is what most quantum SDKs default to.

**Pauli-channel model.** Replace the depolarising channel with a general Pauli channel: probabilities $p_X, p_Y, p_Z$ for the three Pauli errors, with $p_I = 1 - p_X - p_Y - p_Z$. The Pauli decomposition lives naturally in the surface-code analysis (§19.12), and a properly-cycle-benchmarked device returns the three Pauli probabilities directly. Pauli channels can be simulated **stochastically** (sample one Pauli per gate, propagate it) or **deterministically** (track the full density matrix); the stochastic variant is exponentially cheaper and is what most large-scale noisy simulators use.

**Realistic-device model.** Combine per-gate Pauli (or full Kraus) channels with measured $T_1$, $T_2$ decay during idle periods, asymmetric readout error matrix, an explicit crosstalk matrix, and (optionally) a leakage model. Modern quantum SDKs (Qiskit Aer, Cirq, Stim, PennyLane Lightning) all expose this layer; the bottleneck is calibration data, not simulator capability.

**The fidelity-of-the-model question.** A noise model that *quantitatively* predicts real-device output distributions is rare; a model that predicts the *order of magnitude* and the *qualitative behaviour* is common. The known failure modes of simulator noise models are time-correlation (1/f drift), leakage, and non-Markovian residues from prior gates. When a benchmark on real hardware disagrees with the simulator prediction by more than $\sim 2 \times$, the explanation is usually one of those three.

**Stim and stabiliser noise.** For Clifford circuits (which is what error-correction syndrome extraction *is*), the Stim simulator achieves million-qubit-second-scale noisy simulation by tracking Pauli frames stochastically. This is the workhorse for surface-code threshold studies; §19.12 returns to it.

## 18.16 Fidelities, Error Rates, and Building an Error Budget

The numerical question "what is the success probability of this circuit on this device?" cannot be answered exactly without simulating the noise model. But a useful approximation exists in the form of an **error budget** that attributes the total error to component contributions.

**The additive approximation.** For small per-gate errors $\epsilon_i$ on each operation $i$, the total circuit error is approximately

$$
\epsilon_{\mathrm{total}} \;\approx\; \sum_i \epsilon_i \;=\; \sum_i \bigl(\epsilon_i^{\mathrm{1q}} \cdot n_i^{\mathrm{1q}} + \epsilon_i^{\mathrm{2q}} \cdot n_i^{\mathrm{2q}} + \epsilon_i^{\mathrm{idle}} \cdot n_i^{\mathrm{idle}} + \cdots\bigr) + \epsilon^{\mathrm{SPAM}},
$$

provided $\epsilon_{\mathrm{total}} \ll 1$. Each term is a *count* of operations multiplied by an *average* error per operation. The SPAM contribution is added once for each shot.

**Component attribution.** A standard error-budget table — of the kind that became common in vendor benchmark reports in the early 2020s — breaks the total into:

- Single-qubit Clifford error × count
- Two-qubit Clifford error × count
- Idle decoherence × idle time
- Readout error × number of measurements
- Crosstalk excess (simultaneous-vs-isolated RB gap) × count
- Leakage probability × count of leakage-inducing gates

A well-built budget should reconcile to within a factor of two with the observed end-to-end failure rate; when it does not, the gap is usually the non-Markovian residue of §18.11 or unaccounted leakage.

**Why the additive approximation is bounded.** Coherent errors compound as $n^2 \epsilon$ rather than $n \epsilon$ (§18.10), so a budget that adds coherent errors linearly under-predicts at long circuit depths. The same caveat applies to time-correlated noise: if successive errors are correlated (positively), the total is *larger* than the sum; if anti-correlated (rare but real, e.g., a TLS that produces alternating-sign drifts), it is smaller.

**The fidelity-to-error-rate conversion.** Reported as a single number, **gate fidelity** $F$ and **gate error** $\epsilon$ are related by $\epsilon = 1 - F$. RB returns $\epsilon$ directly (modulo the factor $(d-1)/d$ in the conversion); process tomography returns the Pauli-transfer matrix from which $F$ is computed; the diamond norm gives a different bound that is worst-case rather than average. The four numbers — average fidelity, RB error, Pauli-channel error rate, and diamond-norm distance — are *not the same number*. Mixing them in an error budget without conversion is a common pitfall.

## 18.17 Practitioner Workflow: From Characterisation to Mitigation

Putting the previous sections together, the standard workflow for taking a circuit from "designed" to "ran successfully on hardware" looks roughly as follows.

1. **Daily calibration.** Single-qubit RB and two-qubit interleaved RB on every qubit and every coupler; readout calibration matrix; $T_1$/$T_2$ sweeps. These take minutes to tens of minutes on modern devices and gate the day's experimental queue.
2. **Per-experiment characterisation.** Cycle benchmarking on the specific layers the experiment uses; simultaneous RB if crosstalk is a concern; purity benchmarking if the coherent-vs-incoherent split matters.
3. **Build the noise model.** Either configure the simulator with the calibration outputs, or use a "noise-aware" compiler that schedules gates to minimise idle decoherence and avoids known-bad couplers.
4. **Apply mitigation at compile time.** Dynamical decoupling on idle qubits, pulse-shaping for leakage reduction, twirling around critical operations, mid-circuit measurements where they reduce error rather than add to it.
5. **Apply mitigation at run time / post-processing.** ZNE, PEC, virtual distillation — see §18.18.
6. **Validate.** Compare the empirical circuit output to the simulator's prediction; iterate when they disagree.

The hardest part of this workflow is step 6: the noise model is rarely accurate enough that the simulator predicts the device output to within shot noise, and the *gap* between simulation and reality is where the residual physics lives. A device-level project that closes that gap routinely is the one whose error budget reconciles, and whose mitigation strategies actually work as expected.

## 18.18 Error Mitigation (Pre-QEC)

Quantum error correction (Chapter 19) buys exponential suppression of the logical error rate at the cost of a polynomial overhead in physical qubits. Until that overhead is affordable, the field uses **error mitigation**: techniques that reduce the bias in expectation-value estimates without correcting the underlying state. Five families are widely deployed.

**Zero-noise extrapolation (ZNE).** Run the same circuit at several artificially-amplified noise levels — typically by stretching the gates (longer pulse duration, more $T_1$ exposure), inserting pairs of inverse gates ($G G^{-1}$), or applying a known depolarising channel after each gate. Extract the observable $\langle O\rangle(\lambda)$ as a function of the noise-amplification factor $\lambda \ge 1$, then extrapolate to $\lambda = 0$ (zero noise). Linear or exponential fits work for small $\epsilon \cdot \mathrm{depth}$; Richardson extrapolation with multiple data points is more robust.

ZNE's strength is simplicity — it requires no detailed noise model, only the ability to amplify noise in a controlled way. Its weakness is **variance amplification**: each extrapolated point has higher variance than the original measurement, and the variance of the extrapolated $\langle O\rangle(0)$ scales as $(\sum_\lambda w_\lambda^2 / N_\lambda)$ where the $w_\lambda$ are the extrapolation weights. At deep circuits, the extrapolation weights grow exponentially in the depth, and the shot cost to maintain a fixed final variance grows accordingly.

**Probabilistic error cancellation (PEC).** Given a characterisation of the noise channel $\mathcal{N}_G$ acting after gate $G$, decompose its inverse $\mathcal{N}_G^{-1}$ as a *quasi-probability* — a linear combination of physical channels with some negative coefficients — and sample circuits according to the absolute values of those coefficients with an appropriate sign. The expectation-value estimator is unbiased but has variance proportional to the **negativity** $\gamma = \sum |c_i|$ raised to the power of the number of gates; total shot cost scales as $\gamma^{2 d}$ where $d$ is the depth.

PEC's strength is *guaranteed* bias removal — it produces an unbiased estimator of the noise-free expectation. Its weakness is the same as ZNE's, but more extreme: $\gamma^{2d}$ grows fast, making PEC prohibitive for circuits beyond a few hundred gates on noise levels typical of current devices.

**Clifford data regression (CDR / VNCDR).** Train a regression model on the relationship between noisy and ideal expectation values for a family of related Clifford circuits (whose ideal expectations are classically computable), then apply the trained regression to the noisy result of the target non-Clifford circuit. The fitted regression learns the noise's effect on the observable; the predicted noise-free value is the mitigated estimate. CDR works well when the noise's effect is *similar* across the Clifford training set and the target circuit; it fails when the target circuit has structure not represented in the training set.

**Virtual distillation (also called error suppression by derangement).** Prepare $M$ independent copies of the noisy state $\rho$, then measure observables in a way that effectively samples from $\rho^M / \mathrm{tr}(\rho^M)$ — a state that, for $M \ge 2$, has higher purity than $\rho$ and is closer to the dominant eigenvector of $\rho$. The dominant eigenvector is, in expectation, closer to the noise-free pure state than $\rho$ itself. Virtual distillation does *not* require knowing the noise model and has favourable shot-cost scaling, but requires $M$ copies and an entangling derangement circuit between them, which costs roughly $M \cdot d$ in qubit count and adds its own gate errors. (It also cannot remove the bias toward the dominant eigenvector when that eigenvector is itself shifted from the ideal state — the so-called coherent-mismatch or noise-floor limitation.)

**Symmetry verification.** Many circuits have known symmetries (particle-number conservation in fermionic simulations, parity in error-correcting codes, total angular momentum in spin models). Measure the symmetry alongside the target observable; discard shots whose symmetry outcome is inconsistent with the input. The kept shots have *post-selected* lower error at the cost of a reduced effective sample count. Symmetry verification is the cheapest mitigation method when a known symmetry exists; it does nothing when the circuit has no usable symmetry.

**When mitigation helps and when it does not — the bias-variance tradeoff.** All of the methods above trade *bias* for *variance*. They reduce the systematic deviation between the noisy expectation and the ideal one at the cost of inflating the statistical uncertainty for a fixed shot budget. The break-even depends on three things:

- **Circuit depth.** At low depth (few gates per qubit per circuit), bias is small and the unmitigated estimate is already close to ideal; mitigation adds variance without helping. At moderate depth, bias dominates and mitigation is a clear win. At very deep circuits, the variance amplification becomes catastrophic — the mitigation factor blows up faster than the bias, and the mitigated estimator is worse than the noisy one.
- **Noise level.** Mitigation methods assume the device is in a regime where the noise's effect on the observable can be linearly extrapolated (ZNE), quasi-probabilistically inverted (PEC), or learned (CDR). Above some noise level, the relevant assumption fails and the mitigation introduces additional bias rather than removing it.
- **Observable structure.** Local observables (single-qubit Paulis, small Pauli strings) are easier to mitigate than global ones; observables that depend on long-range correlations are hardest.

A widely-cited theoretical result: at scale, the *number of shots* required for *any* mitigation method to maintain bounded error scales **exponentially in the circuit volume**. This is a fundamental information-theoretic statement: mitigation cannot beat the shot scaling that error correction can achieve at large scale. Pre-QEC mitigation is a tool for the current regime — circuits of $\sim 10^2$ to $\sim 10^3$ noisy gates, where bias is the dominant problem and variance is still manageable. Beyond that, fault-tolerant error correction is the only path to scale, and the prerequisite to it is the noise characterisation laid out in this chapter.

---

## 18.19 Bridge to Chapter 19

This chapter described the noise in operational terms: where it comes from, how it is parameterised, how it is measured, how it is modelled, and how its bias on expectation values is partially undone by mitigation. The next chapter takes the same noise and *suppresses* it by encoding logical information across many physical qubits. The transition is in the goal: mitigation reduces the bias on an expectation but leaves the underlying state corrupted; error correction restores the encoded state, recovering arbitrary computations from arbitrary errors as long as the physical error rate is below threshold. The physical error rate that determines whether the threshold is met is *exactly* the per-cycle Pauli error rate (§18.13) of this chapter, characterised via the same RB/cycle benchmarks. The link is direct: Chapter 18's measurement of $\epsilon$ is the input to Chapter 19's threshold inequality.

**Sanity checks before moving on.**

1. Given a transmon with $T_1 = 200$ µs and $T_\varphi = 250$ µs, compute $T_2$ and check it is below $2 T_1$. If subsequent dynamical decoupling extends $T_\varphi$ to be effectively infinite, what is the new bound on $T_2$?
2. For an interleaved RB measurement that returns $p_{\mathrm{ref}} = 0.998$ and $p_{\mathrm{int}} = 0.996$ on a single-qubit gate, compute the interleaved-gate average error and explain why this estimate is only accurate up to correlations between the interleaved gate and the surrounding Cliffords.
3. Construct a depolarising-only noise model for a 5-qubit circuit consisting of 100 single-qubit gates (each with $\epsilon^{\mathrm{1q}} = 10^{-4}$) and 50 two-qubit gates (each with $\epsilon^{\mathrm{2q}} = 5 \times 10^{-3}$), with readout error $\epsilon^{\mathrm{RO}} = 10^{-2}$ per qubit. Use the additive approximation to estimate the total error and identify the dominant contribution.
4. A coherent overrotation error of $\delta = 0.01$ radian per gate and a depolarising error of $\epsilon = 10^{-4}$ per gate have the same single-gate infidelity. After $n = 1000$ gates, compare the accumulated error of the two.
5. For ZNE with noise amplification factors $\lambda \in \\{1, 2, 3\\}$ and linear extrapolation, derive the extrapolation weights $w_\lambda$ and confirm that $\sum_\lambda w_\lambda = 1$ and $\sum_\lambda \lambda\\, w_\lambda = 0$. Compute the variance amplification factor $\sum_\lambda w_\lambda^2$ and interpret it as a shot-cost multiplier.

---

[← Previous: Chapter 17](../part-07-complexity/17-complexity-theory.md) · [Table of Contents](../../README.md) · [Next: Chapter 19 →](19-quantum-error-correction-and-fault-tolerance.md)
