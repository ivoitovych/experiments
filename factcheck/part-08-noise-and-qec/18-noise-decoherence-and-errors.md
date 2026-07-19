# Factcheck — §18 Noise, Decoherence, and Errors

Mirrors `book/part-08-noise-and-qec/18-noise-decoherence-and-errors.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §18.1 — Effective qubit temperature vs fridge temperature

- **Claim** (anchor): "the *effective* temperature inferred from steady-state populations is typically 50–100 mK because non-equilibrium quasiparticles, infrared photons, and stray microwave radiation excite the qubit above the fridge temperature"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific numerical range (50–100 mK) attributed to non-equilibrium excitation mechanisms on superconducting transmons at 15 mK fridge temperature.

## §18.1 — TLS as source of 1/f dephasing

- **Claim** (anchor): "The TLS bath is the canonical source of $1/f$-spectrum dephasing"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution of 1/f dephasing to two-level systems in dielectric defects is a well-known result in superconducting qubit literature; canonical source likely Martinis et al. or Müller et al.

## §18.1 — TLS frequency drift timescales

- **Claim** (anchor): "TLS frequencies drift on timescales of minutes to days, which is the leading explanation for the \"fluctuating $T_1$\" routinely seen on superconducting devices"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical observation of fluctuating T1 linked to TLS drift timescales; specific timescale range (minutes to days) is an empirical claim.

## §18.1 — Standard amplitude damping is zero-temperature limit

- **Claim** (anchor): "the standard \"amplitude damping\" model (§10.12) is the zero-temperature limit and over-attributes errors to the relaxation direction when $T_{\mathrm{eff}}$ is finite"
- **Method**: derivation
- **Source**: → §10.12
- **Verified**: — · **Verdict**: open

## §18.2 — T2 ≤ 2T1 bound

- **Claim** (anchor): "The bound $T_2 \le 2 T_1$ follows immediately"
- **Method**: derivation
- **Source**: → §18.2 decomposition formula 1/T2 = 1/(2T1) + 1/T_φ
- **Verified**: — · **Verdict**: open

## §18.2 — Practical T1, T2 numbers: superconducting transmons mid-2025

- **Claim** (anchor): "Superconducting transmons report $T_1 \sim 100$–$400$ µs and $T_2 \sim 100$–$300$ µs on best-in-class devices"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific hardware numbers dated mid-2025; perishable benchmark claim.

## §18.2 — Practical T1, T2 numbers: trapped-ion qubits mid-2025

- **Claim** (anchor): "trapped-ion hyperfine qubits report $T_1 > 10^4$ s (essentially infinite on circuit timescales) and $T_2 \sim 10$–$100$ s under dynamical decoupling"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific hardware numbers dated mid-2025; perishable benchmark claim.

## §18.2 — Neutral-atom T2 in seconds

- **Claim** (anchor): "neutral-atom qubits in optical tweezers report $T_2$ in the seconds"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable hardware benchmark claim.

## §18.3 — 1/f noise Gaussian decay shape

- **Claim** (anchor): "the decay shape under free evolution is *Gaussian* ($e^{-(t/T_2^*)^2}$) rather than exponential"
- **Method**: derivation
- **Source**: → §18.3 filter-function formalism and §18.3 1/f noise discussion
- **Verified**: — · **Verdict**: open
- **Comment**: The Gaussian decay for 1/f noise under free evolution follows from the filter-function integral with S(ω) ~ 1/ω.

## §18.3 — 1/f noise from log-uniform TLS distribution

- **Claim** (anchor): "Its physical origin is the ensemble of TLSs (§18.1) with a broad log-uniform distribution of relaxation rates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard model for 1/f noise in condensed-matter physics; specific mechanism (log-uniform distribution of TLS relaxation rates) is an attributed physical model.

## §18.3 — Non-Markovianity signature: information backflow

- **Claim** (anchor): "The practical signature of non-Markovianity is **information backflow** — a tomographic distinguishability measure that has decreased between time $t_1$ and $t_2 > t_1$ can *increase* again at $t_3 > t_2$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Definition/signature attributed to the Breuer–Laine–Piilo framework; see also §18.11.

## §18.4 — Decoherence-limited error floor estimate

- **Claim** (anchor): "For single-qubit gates of duration 20–50 ns on transmons with $T_1, T_2 \sim 100$ µs, this gives a floor around $10^{-4}$"
- **Method**: derivation
- **Source**: → §18.4 formula ε ~ t_gate / T
- **Verified**: — · **Verdict**: open

## §18.4 — Ion trap gate fidelity set by control noise, not coherence

- **Claim** (anchor): "The fact that ion traps achieve $10^{-4}$ to $10^{-5}$ per-gate fidelity in practice means the floor is *not* coherence-limited; the floor is set by control noise instead"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about the limiting noise mechanism for ion-trap gate fidelity.

## §18.4 — Published gate fidelities 2023–2025: single-qubit

- **Claim** (anchor): "Single-qubit Clifford gates: $99.99\%$ on best-in-class trapped ions, $99.95\%$ on superconducting transmons, $99.5\%$–$99.9\%$ on neutral atoms"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific fidelity numbers cited over 2023–2025 from leading platforms; perishable hardware benchmarks.

## §18.4 — Published gate fidelities 2023–2025: two-qubit

- **Claim** (anchor): "Two-qubit entangling gates (CZ, CNOT, Mølmer–Sørensen, Rydberg CZ): $99.9\%$ on best-in-class ions and on the latest superconducting devices, $99.5\%$ on most current devices, $99.0\%$ on neutral atoms"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific two-qubit fidelity numbers over 2023–2025; perishable hardware benchmarks.

## §18.4 — Two-qubit fidelity as fault-tolerance bottleneck

- **Claim** (anchor): "The two-qubit error rate is the usual bottleneck in fault-tolerance estimates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-references §19.12 for surface-code patch-size scaling; a claimed consensus result across fault-tolerance literature.

## §18.4 — Diamond norm as proper worst-case metric, not standardized

- **Claim** (anchor): "The diamond norm (§12.6) is the proper worst-case metric; it is harder to measure directly, and the field has not standardized reporting it, which is a known gap in the benchmarking conventions"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Normative/community-standards claim about the current state of benchmarking practice.

## §18.5 — Asymmetry P(0|0) > P(1|1) due to T1 during integration

- **Claim** (anchor): "the longer the dispersive integration, the better the signal-to-noise, but also the more $T_1$ events leak $|1\rangle$ to $|0\rangle$ during the measurement itself"
- **Method**: derivation
- **Source**: → §18.5 dispersive measurement discussion; → §18.2 T1 definition
- **Verified**: — · **Verdict**: open

## §18.5 — 1 µs integration loses ~1% |1⟩ population for T1 ~ 100 µs

- **Claim** (anchor): "A 1 µs integration window on a transmon with $T_1 \sim 100$ µs already loses $\sim 1\%$ of $|1\rangle$ population to relaxation"
- **Method**: derivation
- **Source**: → §18.2 P1(t) = P1(0) exp(-t/T1); 1 - exp(-1/100) ≈ 0.01
- **Verified**: — · **Verdict**: open

## §18.6 — Residual thermal population of transmon in steady state

- **Claim** (anchor): "a transmon's steady-state $|1\rangle$ population is $10^{-3}$ to $10^{-2}$ rather than the equilibrium prediction"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical observation that measured steady-state population exceeds the thermodynamic equilibrium prediction; attributed to non-equilibrium excitation.

## §18.6 — Active reset residual error

- **Claim** (anchor): "the residual error is the readout error of the measurement *plus* any $T_1$ event during the conditional pulse, typically $10^{-3}$ to $10^{-4}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific residual-error range for measurement-based reset on superconducting devices.

## §18.6 — RB is SPAM-robust by design

- **Claim** (anchor): "Randomized benchmarking (§18.12) is designed to be *SPAM-robust*: the decay rate is sensitive to gate error but not to constant preparation and measurement offsets"
- **Method**: derivation
- **Source**: → §18.12 RB protocol and fitting function F(m) = A p^m + B
- **Verified**: — · **Verdict**: open

## §18.7 — Surface-code threshold degradation from crosstalk

- **Claim** (anchor): "Surface-code performance degrades under crosstalk by an amount that depends on coupling strength, schedule, decoder, and noise model; there is no universal conversion from a crosstalk-free rate to an \"effective\" one"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific numerical example of crosstalk impact on effective error rate; references surface-code thresholds in §19.12.

## §18.8 — DRAG pulses reduce leakage by order of magnitude

- **Claim** (anchor): "DRAG pulses on transmons reduce leakage by an order of magnitude over square pulses"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific quantitative claim about DRAG pulse performance; canonical source is Motzoi et al. (2009) or similar.

## §18.8 — Leakage events are largest contributor to time-correlated errors in surface codes

- **Claim** (anchor): "Several superconducting surface-code experiments have reported leakage among the leading contributors to **time-correlated** errors that break the independent-rounds assumption"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim from surface-code experiments; attribution to leakage as dominant source of time-correlated errors.

## §18.9 — GAD channel Kraus operators

- **Claim** (anchor): "A finite-temperature bath generalizes the zero-temperature amplitude-damping channel of §10.12. The **generalized amplitude damping** (GAD) channel has Kraus operators"
- **Method**: derivation
- **Source**: → §10.12 amplitude-damping channel; → §18.9 Kraus operator construction
- **Verified**: — · **Verdict**: open

## §18.9 — GAD fixed point is thermal state

- **Claim** (anchor): "The fixed point of GAD is the thermal state"
- **Method**: derivation
- **Source**: → §18.9 Kraus operators; verify by substituting ρ_th and checking K_i ρ_th K_i† sums to ρ_th
- **Verified**: — · **Verdict**: open

## §18.9 — Thermal noise contribution to current device budgets

- **Claim** (anchor): "on most current devices it is a 1–10% contribution to the total error"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific percentage range for thermal noise contribution on cryogenic platforms.

## §18.10 — Coherent errors compound as (nδ)^2 vs incoherent np

- **Claim** (anchor): "Coherent errors compound as $(n\delta)^2$, incoherent errors as $n p$. For the same per-gate **infidelity** $\epsilon = \delta^2$ (coherent) or $\epsilon = p$ (incoherent), coherent errors are *worse* on long circuits"
- **Method**: derivation
- **Source**: → §18.10 compounding rule derivation
- **Verified**: — · **Verdict**: open

## §18.10 — Clifford group forms 2-design

- **Claim** (anchor): "The Clifford group forms a 2-design over the unitary group, which means averaging a noise channel over random Cliffords produces a depolarizing channel with the same average fidelity"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The Clifford group being a unitary 2-design is a well-known result; see e.g. Dankert et al. (2006).

## §18.11 — Breuer–Laine–Piilo measure of non-Markovianity

- **Claim** (anchor): "The Breuer–Laine–Piilo measure of non-Markovianity quantifies how much *trace distance* between two initially distinguishable states *increases* over time — Markovian channels are contractive in trace distance (§12.6), so any increase is a Markovianity violation"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named measure; canonical source is Breuer, Laine, Piilo (2009), Phys. Rev. Lett.

## §18.11 — Superconducting transmon noise spectrum: 1/f from 1 Hz to ~10^5 Hz

- **Claim** (anchor): "Published noise spectra on superconducting transmons typically show $1/f$ from 1 Hz to $\sim 10^5$ Hz, a \"knee\" where TLS spectroscopy resolves individual defects, and a higher-frequency white floor set by Johnson noise on the control lines"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific spectral characterization of 1/f noise range and features on superconducting devices.

## §18.12 — RB average gate error formula

- **Claim** (anchor): "The fitted decay constant $p$ relates to the average gate error per Clifford as $\epsilon = (1 - p)(d - 1)/d$ where $d = 2^n$"
- **Method**: derivation
- **Source**: → §18.12 RB protocol and depolarizing-channel conversion
- **Verified**: — · **Verdict**: open

## §18.12 — XEB was centerpiece of 2019 supremacy experiment

- **Claim** (anchor): "XEB was the centerpiece of the 2019 supremacy experiment"
- **Method**: external
- **Source**: Arute et al. (Google), Nature 574, 505–510 (2019)
- **Verified**: — · **Verdict**: open
- **Comment**: Specific attributed experimental result; well-known publication.

## §18.12 — XEB ideal distribution classically infeasible above 50 qubits

- **Claim** (anchor): "the ideal distribution must be computed classically, which is infeasible above 50 qubits and is the reason XEB is itself a quantum-advantage demonstration"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claim about classical simulation complexity threshold for XEB; may be contested by subsequent classical simulation results.

## §18.13 — Simultaneous RB crosstalk contribution: 1.5×–3× isolated rate

- **Claim** (anchor): "the gap is the **crosstalk contribution** to single-qubit error; on current devices it is typically 1.5×–3× the isolated rate for nearest-neighbor qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific multiplier range for crosstalk overhead from simultaneous vs isolated RB on current devices.

## §18.14 — QPT shot cost scaling

- **Claim** (anchor): "The shot cost is $\Theta(16^n / \varepsilon^2)$, so QPT is comfortable for one-qubit channels, hard for two-qubit channels, and impossible above three"
- **Method**: derivation
- **Source**: → §11.4 process tomography; scaling from 4^n basis states × 4^n output tomography
- **Verified**: — · **Verdict**: open

## §18.14 — GST experimental cost

- **Claim** (anchor): "a GST experiment on two qubits requires $10^5$ to $10^6$ circuit executions and substantial post-processing"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific cost figure for two-qubit GST; likely sourced from Blume-Kohout et al. GST papers.

## §18.15 — Stim achieves million-qubit-second-scale noisy simulation

- **Claim** (anchor): "the Stim simulator achieves million-qubit-second-scale noisy simulation by tracking Pauli frames stochastically"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Performance claim for the Stim simulator; canonical source is Gidney (2021), Quantum journal.

## §18.16 — Four gate-quality numbers are not the same

- **Claim** (anchor): "The four numbers — average fidelity, RB error, Pauli-channel error rate, and diamond-norm distance — are *not the same number*. Mixing them in an error budget without conversion is a common pitfall"
- **Method**: convention
- **Source**: → §12.6 diamond norm; → §18.12 RB error; → §18.14 process fidelity
- **Verified**: — · **Verdict**: open

## §18.18 — PEC shot cost scales as γ^{2d}

- **Claim** (anchor): "total shot cost scales as $\gamma^{2 d}$ where $d$ is the depth"
- **Method**: derivation
- **Source**: → §18.18 PEC quasi-probability decomposition and variance calculation
- **Verified**: — · **Verdict**: open

## §18.18 — Fundamental exponential shot-cost lower bound for mitigation

- **Claim** (anchor): "at scale, the *number of shots* required for *any* mitigation method to maintain bounded error scales **exponentially in the circuit volume**"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Described as "a widely-cited theoretical result"; likely Takagi et al. or Quek et al. information-theoretic lower bound papers.

## §18.18 — ZNE variance amplification formula

- **Claim** (anchor): "the variance of the extrapolated $\langle O\rangle(0)$ scales as $(\sum_\lambda w_\lambda^2 / N_\lambda)$ where the $w_\lambda$ are the extrapolation weights"
- **Method**: derivation
- **Source**: → §18.18 ZNE extrapolation discussion
- **Verified**: — · **Verdict**: open
