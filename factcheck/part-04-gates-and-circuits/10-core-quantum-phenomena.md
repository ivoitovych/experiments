# Factcheck — §10 Core Quantum Phenomena

Mirrors `book/part-04-gates-and-circuits/10-core-quantum-phenomena.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## §10.1 — Superposition is basis-dependent

- **Claim** (anchor): "Every state is a superposition with respect to some basis (just pick a basis that does not contain it) and a basis vector with respect to some other basis."
- **Method**: derivation
- **Source**: → §6.5 (Hadamard basis discussion)
- **Verified**: — · **Verdict**: open

## §10.1 — State tomography requires multiple bases

- **Claim** (anchor): "Repeated preparation and measurement in several bases — the workflow of state tomography (Chapter 11) — is required to reconstruct them."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result in quantum state tomography; canonical sources include Paris & Řeháček (2004) "Quantum State Estimation."

## §10.2 — Interference engine of quantum advantage

- **Claim** (anchor): "Every quantum algorithm with a known speedup over classical can be read as: prepare a superposition of inputs, evaluate the problem coherently across the superposition, and arrange the gate sequence so that amplitudes for wrong answers destructively interfere and amplitudes for right answers constructively interfere."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Broad algorithmic claim covering Deutsch–Jozsa, Grover, QFT-based subroutines, HHL; represents a consensus framing rather than a single citable result.

## §10.2 — Deutsch–Jozsa, Grover, QFT, HHL all fit interference template

- **Claim** (anchor): "Deutsch–Jozsa, Grover, the QFT-based subroutines, and the HHL-family linear-systems solvers (Part 6) all fit this template."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Each algorithm is an attributed result; specific sources: Deutsch & Jozsa 1992; Grover 1996; QFT in Coppersmith 1994 / Shor 1994; Harrow, Hassidim & Lloyd 2009 (HHL).

## §10.3 — Standard error scales as 1/√N

- **Claim** (anchor): "The implication is operationally severe: improving an expectation-value estimate by one decimal place costs"
- **Method**: derivation
- **Source**: → §10.3 variance formula and standard-error argument
- **Verified**: — · **Verdict**: open

## §10.3 — Amplitude estimation bends shot-noise scaling from 1/√N to 1/N

- **Claim** (anchor): "Amplitude estimation (Chapter 14) is the quantum subroutine that bends it from"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Original result: Brassard, Høyer, Mosca & Tapp (2002), "Quantum Amplitude Amplification and Estimation."

## §10.3 — Lüders' rule for degenerate measurements

- **Claim** (anchor): "Degenerate measurements project onto the eigenprojector"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Lüders (1951) "Über die Zustandsänderung durch den Messprozess"; standard textbook result.

## §10.4 — Robertson uncertainty bound

- **Claim** (anchor): "For any two observables A, B and any state"
- **Method**: derivation
- **Source**: → Robertson 1929 / §5.4; stated and applied within §10.4
- **Verified**: — · **Verdict**: open
- **Comment**: Robertson bound is an attributed external result; the text treats it as a formal restatement.

## §10.4 — Heisenberg ΔX ΔP ≥ ℏ/2

- **Claim** (anchor): "In the continuous-variable setting (Chapter 32), the canonical commutator is"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Canonical result; Heisenberg 1927, Robertson 1929.

## §10.4 — Qubit Pauli commutators

- **Claim** (anchor): "a state with sharp Z value (an eigenstate of Z, i.e."
- **Method**: derivation
- **Source**: → §8.2 Pauli matrices; sanity check §10.14 item 3
- **Verified**: — · **Verdict**: open
- **Comment**: The claim that ΔX = ΔY = 1 on Z-eigenstates and the note that the Robertson bound is vacuous there because ⟨Y⟩ = 0 are internal derivation results.

## §10.4 — BB84 eavesdropper disturbance is detectable

- **Claim** (anchor): "an eavesdropper who measures BB84 photons in the wrong basis disturbs the state, and the disturbance is statistically detectable in the residual bit-error rate"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Bennett & Brassard 1984 (BB84 protocol); security proofs: Mayers 2001, Lo & Chau 1999.

## §10.5 — No-cloning theorem statement

- **Claim** (anchor): "no unitary U exists satisfying"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Wootters & Zurek 1982; Dieks 1982. Proof is given in §5.13.

## §10.5 — No-cloning proof: one-line unitarity argument

- **Claim** (anchor): "The proof is one line: if it worked for two non-orthogonal states"
- **Method**: derivation
- **Source**: → §5.13
- **Verified**: — · **Verdict**: open

## §10.5 — Linearity alone is enough for no-cloning

- **Claim** (anchor): "Linearity alone is enough; unitarity is a stronger constraint that gives the same conclusion."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The linearity-based no-cloning argument is a known result; see e.g. Pati & Braunstein discussions on linearity vs. unitarity.

## §10.5 — Cloning of orthogonal states is possible

- **Claim** (anchor): "Cloning of orthogonal states is possible — and is what classical computation does, since classical bits are encoded in mutually orthogonal quantum states."
- **Method**: derivation
- **Source**: → §5.13 / §6 (classical bit encoding)
- **Verified**: — · **Verdict**: open

## §10.5 — Teleportation destroys the original

- **Claim** (anchor): "Teleportation (§7.12) moves an unknown state from Alice to Bob, but destroys the original in the process"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Bennett et al. 1993 (original teleportation paper).

## §10.5 — No-cloning enables QKD

- **Claim** (anchor): "no-cloning is what makes quantum key distribution possible, not what makes it hard"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard framing; traced to Bennett & Brassard 1984 and subsequent QKD security analyses.

## §10.6 — No-signalling: local measurements cannot change remote statistics

- **Claim** (anchor): "local operations and measurements on one half of a multipartite state cannot change the local statistics on the other half"
- **Method**: derivation
- **Source**: → partial-trace calculation in §10.6
- **Verified**: — · **Verdict**: open

## §10.6 — Reduced state of Bell pair half is I/2 regardless of Alice's action

- **Claim** (anchor): "the formal statement underlying the §7.11 observation that the reduced state of one half of a Bell pair is"
- **Method**: derivation
- **Source**: → §7.11 partial trace
- **Verified**: — · **Verdict**: open

## §10.6 — Teleportation requires two classical bits because of no-signalling

- **Claim** (anchor): "Teleportation (§7.12) needs the two classical bits Alice sends precisely because of no-signalling: the quantum correlations alone do not carry the message."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Bennett et al. 1993; the 2-cbit necessity is a direct consequence of no-signalling.

## §10.7 — Kochen–Specker theorem: no consistent value assignment for d ≥ 3

- **Claim** (anchor): "For Hilbert spaces of dimension"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Kochen & Specker 1967, "The Problem of Hidden Variables in Quantum Mechanics," Journal of Mathematics and Mechanics 17:59–87.

## §10.7 — Original KS proof used 117 vectors in R³

- **Claim** (anchor): "The original proof used 117 vectors in"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Kochen & Specker 1967; the 117-vector count is the figure given in the original paper.

## §10.7 — Shorter KS proofs by Cabello and Peres-Mermin

- **Claim** (anchor): "later proofs are much shorter (Cabello, Peres-Mermin)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Peres 1991; Mermin 1990 (magic square); Cabello, Estebaranz & García-Alcaine 1996.

## §10.7 — KS theorem fails for d = 2 (single qubit)

- **Claim** (anchor): "For d = 2 — that is, for a single qubit — the theorem fails, and a hidden-variable model exists; contextuality is a feature of d"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Known result; see Bell 1966 on existence of HV models for d=2.

## §10.7 — GHZ contradiction: product of four observables is −1 but pre-assigned ±1 values give +1

- **Claim** (anchor): "Their product is"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Greenberger, Horne & Zeilinger 1989; Mermin 1990 "What's Wrong with these Elements of Reality?" Physics Today.

## §10.7 — GHZ contradiction is a single shot, not a statistical inequality

- **Claim** (anchor): "No hidden-variable assignment is consistent; the contradiction is a single shot, not a statistical inequality."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Greenberger, Horne, Shimony & Zeilinger 1990; Mermin 1990.

## §10.7 — Contextuality as resource for magic-state distillation and MBQC

- **Claim** (anchor): "Contextuality is widely conjectured to be a resource powering certain quantum advantages — notably magic-state distillation (Chapter 19) and measurement-based quantum computation (Chapter 32)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Howard et al. 2014 (Nature); Raussendorf, Browne & Briegel 2003 for MBQC; Spekkens 2008 for resource theory framing. Text correctly flags this as conjecture / active research area.

## §10.8 — Zeno survival probability is quadratic in t

- **Claim** (anchor): "the leading correction is quadratic in t, not linear"
- **Method**: derivation
- **Source**: → small-t expansion of the survival amplitude in §10.8
- **Verified**: — · **Verdict**: open

## §10.8 — Frequent measurement pins system to initial state (Zeno limit)

- **Claim** (anchor): "The system gets pinned to"
- **Method**: derivation
- **Source**: → §10.8 N-interval survival probability argument
- **Verified**: — · **Verdict**: open
- **Comment**: Quantum Zeno effect named in Misra & Sudarshan 1977; this is the standard derivation.

## §10.8 — Quantum Zeno effect named result (Misra–Sudarshan)

- **Claim** (anchor): "The Zeno effect is the simplest example of measurement-based error suppression."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Misra & Sudarshan 1977, "The Zeno's paradox in quantum theory," J. Math. Phys. 18:756.

## §10.9 — Pointer basis / einselection (Zurek)

- **Claim** (anchor): "Zurek's einselection (environment-induced superselection) explains why macroscopic quantum superpositions are not observed"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Zurek 1981, 1982, 2003 "Decoherence, einselection, and the quantum origins of the classical," Rev. Mod. Phys. 75:715.

## §10.9 — T₂ ≤ 2T₁ relation

- **Claim** (anchor): "measures how much of the dephasing comes from pure phase noise (as opposed to amplitude relaxation)"
- **Method**: derivation
- **Source**: → 1/T₂ = 1/(2T₁) + 1/T_φ decomposition in §10.9; T_φ ≥ 0 implies T₂ ≤ 2T₁
- **Verified**: — · **Verdict**: open

## §10.9 — T₂ dephasing time decomposition

- **Claim** (anchor): "the timescale on which the off-diagonal coherence"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard formula in open quantum systems / NMR literature; see e.g. Slichter "Principles of Magnetic Resonance."

## §10.11 — Lindblad equation is most general Markovian CPTP generator

- **Claim** (anchor): "Lindblad evolution is the most general continuous-time evolution consistent with both."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Lindblad 1976, "On the Generators of Quantum Dynamical Semigroups," Commun. Math. Phys. 48:119; Gorini, Kossakowski & Sudarshan 1976.

## §10.12 — Partial transpose is positive but not completely positive

- **Claim** (anchor): "Mere positivity is not enough — the partial transpose is positive but not completely positive, and is not a physical channel."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result; see Peres 1996 separability criterion; Choi 1975 on complete positivity.

## §10.12 — Depolarising channel Kraus operator equivalence

- **Claim** (anchor): "Equivalently — using"
- **Method**: derivation
- **Source**: → §10.12 Kraus-operator derivation for depolarising channel
- **Verified**: — · **Verdict**: open
- **Comment**: The identity I/2 = (ρ + XρX + YρY + ZρZ)/4 is verified internally.

## §10.13 — Every CPTP map admits a Kraus (operator-sum) representation

- **Claim** (anchor): "Every CPTP map admits an operator-sum (Kraus) representation"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Kraus 1983 "States, Effects and Operations"; Choi 1975.

## §10.13 — Kraus rank bound

- **Claim** (anchor): "The number of Kraus operators r — the Kraus rank — is at most"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result; see Kraus 1983; Nielsen & Chuang §8.2.

## §10.13 — Kraus representation is not unique; minimal rank is an invariant

- **Claim** (anchor): "The Kraus representation is not unique: any unitary mixing"
- **Method**: derivation
- **Source**: → §10.13 argument
- **Verified**: — · **Verdict**: open

## §10.13 — Stinespring dilation theorem

- **Claim** (anchor): "Every CPTP map can be realised as unitary evolution on a system + ancilla followed by tracing out the ancilla."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Stinespring 1955, "Positive functions on C*-algebras," Proc. AMS 6:211.

## §10.13 — Kraus operators from Markovian dt expansion recover Lindblad

- **Claim** (anchor): "Expanding"
- **Method**: derivation
- **Source**: → §10.11 Lindblad equation; derivation in §10.13
- **Verified**: — · **Verdict**: open
- **Comment**: The text states: "Expanding ρ(t+dt) = ΣᵢKᵢρKᵢ† to first order in dt recovers the Lindblad equation of §10.11."
