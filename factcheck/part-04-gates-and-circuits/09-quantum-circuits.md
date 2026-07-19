# Factcheck — §9 Quantum Circuits

Mirrors `book/part-04-gates-and-circuits/09-quantum-circuits.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## §9.1 — Positive/negative control glyph convention

- **Claim** (anchor): "A small filled circle on a wire is a positive control (active on"
- **Method**: convention
- **Source**: → §9.1 notation; Appendix A
- **Verified**: — · **Verdict**: open
- **Comment**: Describes near-universal diagram conventions for control glyphs; the filled-circle / open-circle distinction is a convention claim, not a mathematical fact.

---

## §9.1 — Qiskit qubit ordering (LSB on top)

- **Claim** (anchor): "Qiskit puts the least-significant qubit (qubit 0) on top — while its printed count strings still put the most-significant classical bit leftmost"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed behaviour of a specific SDK. Should be confirmed against Qiskit documentation / source.

---

## §9.1 — This book's ordering convention

- **Claim** (anchor): "This book uses leftmost-as-most-significant throughout (Chapter 7) and matches the top-wire convention"
- **Method**: convention
- **Source**: → §9.1; Chapter 7; Appendix A
- **Verified**: — · **Verdict**: open
- **Comment**: Internal consistency claim; Appendix A is cited for the index-conversion recipe.

---

## §9.2 — Circuit model polynomial equivalence to other quantum models

- **Claim** (anchor): "This model is polynomially equivalent to other quantum models — the quantum Turing machine, the adiabatic model (under locality, bounded-norm, and spectral-gap/runtime conditions — Chapter 32), measurement-based quantum computation with a 2D cluster state"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: A significant complexity-theoretic claim. Polynomial equivalence of circuit model and QTM is standard (Yao 1993-era results); adiabatic equivalence requires the "sufficiently smooth Hamiltonians" caveat (Aharonov et al. 2004); MBQC/cluster-state equivalence (Raussendorf & Briegel 2001). All need citation check.

---

## §9.2 — Born-rule output distribution formula

- **Claim** (anchor): "repeated runs (\"shots\") sample the distribution"
- **Method**: derivation
- **Source**: → §9.2; §5 (Born rule)
- **Verified**: — · **Verdict**: open
- **Comment**: Standard Born-rule application to circuit output; derivable from postulates.

---

## §9.3 — Any classical function lifts to quantum oracle with O(size) ancillae

- **Claim** (anchor): "any classical function $f$ can be lifted to a quantum oracle"
- **Method**: derivation
- **Source**: → §9.3; §8.7
- **Verified**: — · **Verdict**: open
- **Comment**: The resource count O(size of classical circuit) for ancillae is a standard reversible-circuit construction result; derivation follows from Bennett-style reversible simulation.

---

## §9.3 — Multi-controlled gate ancilla decomposition

- **Claim** (anchor): "C^k(U) for large $k$ decomposes more efficiently when $O(k)$ ancillae are available"
- **Method**: derivation
- **Source**: → §8.7
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference to §8.7 where the decomposition is presumably derived.

---

## §9.3 — Fault-tolerant logical ancilla physical-qubit cost

- **Claim** (anchor): "each logical ancilla is itself an encoded block of hundreds of physical qubits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: "Hundreds of physical qubits" per logical qubit is a resource-estimate claim that depends on the error-correction code and target error rate; needs citation to QEC literature (e.g., surface-code resource estimates).

---

## §9.4 — Bennett trick: reversible circuit of size O(T) from classical circuit of size T

- **Claim** (anchor): "the Bennett construction produces a reversible quantum circuit of size $O(T)$ that leaves only"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to Bennett's reversible computation construction. Canonical source: Bennett, C.H., "Time/space trade-offs for reversible computation," SIAM J. Comput. 1989. Citation should be confirmed.

---

## §9.4 — Uncomputation necessity for interference

- **Claim** (anchor): "If the ancilla register ends up entangled with the computation, the reduced state of the computation register is mixed, and quantum advantage evaporates"
- **Method**: derivation
- **Source**: → §9.4
- **Verified**: — · **Verdict**: open
- **Comment**: Follows from the partial-trace formalism; entanglement with ancilla leaves a mixed reduced state, destroying coherent interference.

---

## §9.6 — Basis-change recipe for non-computational-basis measurement

- **Claim** (anchor): "to measure in the $X$ basis, apply $H$ then measure $Z$"
- **Method**: derivation
- **Source**: → §9.6; §5.4
- **Verified**: — · **Verdict**: open
- **Comment**: Standard basis-rotation technique; derivable from unitary equivalence of bases.

---

## §9.6 — Shot-noise scaling of expectation-value estimation

- **Claim** (anchor): "the variance scales as"
- **Method**: derivation
- **Source**: → §9.6
- **Verified**: — · **Verdict**: open
- **Comment**: Standard statistical result: sample-mean variance is Var(A)/N for N i.i.d. shots. Directly derivable.

---

## §9.7 — Deferred-measurement principle

- **Claim** (anchor): "The deferred-measurement principle states that any measurement followed by classically controlled gates can be replaced by a quantum gate (controlled on the would-be measurement qubit) followed by measurement at the end"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named principle in quantum computation; canonical statement appears in Nielsen & Chuang, "Quantum Computation and Quantum Information" (2000), §4.4. The claim that the two channels produce the same joint distribution is the key result to verify.

---

## §9.7 — Deferred measurement increases simultaneous qubit count

- **Claim** (anchor): "deferred measurement increases the number of qubits live simultaneously (since you cannot release them) and may cost more two-qubit gates"
- **Method**: derivation
- **Source**: → §9.7
- **Verified**: — · **Verdict**: open
- **Comment**: Follows directly from the definition: deferring measurement keeps qubits live longer, so more are simultaneously active.

---

## §9.8 — Mid-2020s non-demolition readout platform support

- **Claim** (anchor): "as of the mid-2020s, most superconducting and trapped-ion devices"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical hardware-capability claim. The section itself carries a May 2026 moving-target warning; needs check against current vendor documentation.

---

## §9.9 — Superconducting device coherence time ~100 µs

- **Claim** (anchor): "on superconducting devices is on the order of"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical hardware figure. Coherence times vary by device and qubit design; ~100 µs is broadly representative of 2024–2026 superconducting qubits but needs a concrete citation.

---

## §9.9 — T-gate implemented via magic state and S-gate correction in surface codes

- **Claim** (anchor): "the $T$ gate on a logical qubit, in many surface-code schemes, is implemented by consuming a magic state (a specially prepared resource state, introduced properly in Chapter 19) and applying a measurement-conditioned Clifford correction (an $S$ gate)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard fault-tolerant gate injection result. The correction being an S gate (not merely a Pauli) is the specific technical point to verify; canonical sources include Bravyi & Kitaev (2005) and Fowler et al. (2012).

---

## §9.9 — OpenQASM 3 introduced first-class classical control

- **Claim** (anchor): "OpenQASM 3 introduced first-class classical types and control flow; OpenQASM 2 offered only a restricted register-equality conditional"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed feature of OpenQASM 3 vs earlier versions. Should be confirmed against the OpenQASM 3 specification / paper (Cross et al., arXiv:2104.14722).

---

## §9.10 — Depth lower bound on nearest-neighbour architecture: Ω(n)

- **Claim** (anchor): "Preparing an $n$-qubit state from"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Lower-bound claim for state preparation depth on linear/nearest-neighbour connectivity. Standard result in circuit complexity; needs citation.

---

## §9.10 — GHZ state depth O(log n) on fully-connected architecture

- **Claim** (anchor): "on a fully-connected architecture, depth $O(\\log n)$ suffices for some families like the GHZ state"
- **Method**: derivation
- **Source**: → §9.10
- **Verified**: — · **Verdict**: open
- **Comment**: The log-depth GHZ preparation on all-to-all connectivity follows from a fan-out tree construction; derivable.

---

## §9.10 — Fault-tolerant depth scaling with Solovay–Kitaev

- **Claim** (anchor): "depth scaling as $O(\\mathrm{poly}(n) \\cdot \\log^{c}(1/\\epsilon))$ for a small constant $c$ — the second factor reflecting Solovay–Kitaev synthesis"
- **Method**: external
- **Source**: → §8.11; TBD — needs verification for the specific exponent c
- **Verified**: — · **Verdict**: open
- **Comment**: Solovay–Kitaev gives O(log^c(1/ε)) gate overhead; the exact constant c depends on the version of the theorem. Cross-reference §8.11.

---

## §9.12 — SWAP costs three CNOTs on a CNOT-native device

- **Claim** (anchor): "Each routing SWAP costs three CNOTs on a CNOT-native device"
- **Method**: derivation
- **Source**: → §8 (SWAP decomposition)
- **Verified**: — · **Verdict**: open
- **Comment**: Standard identity: SWAP = (CNOT)(CNOT flipped)(CNOT); derivable and verifiable from the gate definitions in Chapter 8.

---

## §9.12 — Qubit routing is NP-hard in general

- **Claim** (anchor): "Qubit routing is the compiler problem of choosing a SWAP schedule that minimises overhead — in its standard decision formulations it is NP-hard"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: NP-hardness of qubit routing / layout is a complexity claim; should be confirmed against relevant compiler complexity literature (e.g., Botea et al. 2018 or similar).

---

## §9.13 — HH = I peephole rewrite identity

- **Claim** (anchor): "$H H = I$, two adjacent CNOTs with the same control–target pair cancel"
- **Method**: derivation
- **Source**: → §8 (gate identities); Appendix C
- **Verified**: — · **Verdict**: open
- **Comment**: Standard Hadamard self-inverse and CNOT self-inverse identities; directly derivable.

---

## §9.13 — Rotation merging identity

- **Claim** (anchor): "$R_Z(\\alpha) R_Z(\\beta) = R_Z(\\alpha+\\beta)$"
- **Method**: derivation
- **Source**: → §8 (rotation gates)
- **Verified**: — · **Verdict**: open
- **Comment**: Follows from the definition of RZ as exp(-iθZ/2); product of exponentials in the same direction adds angles.

---
