# Factcheck — §2 Classical-to-Quantum Contrast

Mirrors `book/part-01-orientation/02-classical-to-quantum-contrast.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## §2.2 — BPP definition (probabilistic polynomial-time class)

- **Claim** (anchor): "Probabilistic computation is not exotic; the laptop you are reading this on runs randomized algorithms many times per second"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard complexity-theory definition; canonical sources include Sipser's *Introduction to the Theory of Computation* and the Complexity Zoo.

---

## §2.2 — BQP collapses to BPP without interference

- **Claim** (anchor): "restrict a quantum computer to non-negative amplitudes in a fixed basis and its characteristic power evaporates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: A standard result in quantum complexity theory; standard references include Bernstein & Vazirani (1997) or Nielsen & Chuang §1.3.

---

## §2.3 — Landauer's principle: energy cost per erased bit

- **Claim** (anchor): "Landauer's principle attaches a minimum thermodynamic cost to logically irreversible erasure"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Landauer, R. (1961). "Irreversibility and heat generation in the computing process." IBM Journal of Research and Development, 5(3), 183–191.

---

## §2.3 — Reversible classical computation attributed to Bennett (1973)

- **Claim** (anchor): "Reversible classical computation exists as a theoretical curiosity (Bennett, 1973)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to Bennett, C.H. (1973). "Logical reversibility of computation." IBM Journal of Research and Development, 17(6), 525–532.

---

## §2.3 — No-cloning theorem: no unitary clones an arbitrary unknown state

- **Claim** (anchor): "a generic unknown quantum state cannot be copied"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The no-cloning theorem is due to Wootters & Zurek (1982) and Dieks (1982); the linearity argument given here is standard.

---

## §2.4 — NAND is a classically universal (functionally complete) gate set

- **Claim** (anchor): "NAND alone is functionally complete"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result in Boolean logic / digital design; see, e.g., Knuth *The Art of Computer Programming* vol. 4A, or any digital-circuits textbook.

---

## §2.4 — {H, T, CNOT} is a universal quantum gate set; Solovay–Kitaev theorem

- **Claim** (anchor): "any unitary on n qubits can be approximated to arbitrary precision (up to an irrelevant global phase) by a circuit drawn from this set"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The Solovay–Kitaev theorem is a standard result; see Dawson & Nielsen (2006), "The Solovay-Kitaev algorithm," Quantum Information and Computation 6(1).

---

## §2.5 — Brute-force state-vector simulation limit around n = 50–60 qubits

- **Claim** (anchor): "Around $n \approx 45$ to $50$ is the (precision-dependent) boundary where brute-force state-vector simulation stops fitting even on the largest classical supercomputers"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Concrete numerical claim about classical-hardware memory limits; depends on current supercomputer DRAM capacities. Requires verification against recent literature (e.g., Google, IBM, or SC conference papers on classical simulation limits).

---

## §2.5 — BPP conjectured equal to P

- **Claim** (anchor): "The probabilistic model is not believed to be more than polynomially more powerful than the deterministic model"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: A central open problem in complexity theory; the conjecture is widely attributed to the derandomization program. See Impagliazzo & Wigderson (1997) or Sipser's textbook.

---

## §2.5 — Containment P ⊆ BPP ⊆ BQP is known

- **Claim** (anchor): "polynomial-size quantum circuit. The containment"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard complexity result; see Bernstein & Vazirani (1997) or Nielsen & Chuang Chapter 4. Both inclusions are proved, not merely conjectured.

---

## §2.5 — Factoring (Shor's algorithm) not known to be in BPP

- **Claim** (anchor): "factoring, in its decision formulation, is the famous example"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Shor, P.W. (1994/1997). "Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer." SIAM Journal on Computing 26(5). No classical polynomial-time factoring algorithm is known.

---

## §2.6 — Classical bit error rate below 10^{-15} per operation

- **Claim** (anchor): "per-operation error rates so low (commonly quoted around 10^{-15} or better, workload-dependent)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical claim about classical DRAM/SRAM reliability; specific figure should be confirmed against semiconductor reliability data or textbook figures.

---

## §2.6 — Superconducting qubit coherence times, gate times, and two-qubit error rates

- **Claim** (anchor): "Coherence times of tens to hundreds of microseconds; gate times of tens to hundreds of nanoseconds; two-qubit gate fidelities at the 10^{-2} to 10^{-3} level"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable hardware numbers for superconducting platforms (IBM, Google, Rigetti); needs verification against recent device papers or vendor announcements.

---

## §2.6 — Trapped-ion coherence times, gate times, and two-qubit error rates

- **Claim** (anchor): "Coherence times of seconds; gate times of microseconds to milliseconds; two-qubit gate fidelities approaching 10^{-3} to 10^{-4}; all-to-all connectivity within a trap"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable hardware numbers for trapped-ion platforms (IonQ, Quantinuum); needs verification against recent device papers.

---

## §2.6 — QEC overhead: ~10^3 to 10^4 physical qubits per logical qubit (surface code)

- **Claim** (anchor): "currently around 10^3 to 10^4 physical qubits per logical qubit for surface-code thresholds at realistic error rates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Resource-overhead claim for surface-code quantum error correction; depends on assumed physical error rate. Canonical references include Fowler et al. (2012) "Surface codes: Towards practical large-scale quantum computation," PRA 86, 032324.

---

## §2.7 — Superdense coding: one qubit transmits two classical bits given shared entanglement

- **Claim** (anchor): "lets one qubit transmit two classical bits of information, provided the sender and receiver share one pre-distributed entangled pair"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Bennett & Wiesner (1992). "Communication via one- and two-particle operators on Einstein-Podolsky-Rosen states." PRL 69(20), 2881.

---

## §2.7 — Quantum teleportation: one qubit transmitted using two classical bits and one shared ebit

- **Claim** (anchor): "Teleportation (also §7.12) lets two parties transmit one qubit of quantum information using two classical bits and one pre-distributed entangled pair"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Bennett et al. (1993). "Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels." PRL 70(13), 1895.

---

## §2.7 — Deutsch's problem: classical query complexity 2, quantum query complexity 1

- **Claim** (anchor): "The classical query complexity of Deutsch's problem is 2 and the quantum query complexity is 1"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Deutsch, D. (1985). "Quantum theory, the Church-Turing principle and the universal quantum computer." Proceedings of the Royal Society A, 400(1818), 97–117. The classical lower bound (2 queries necessary) is elementary; the quantum upper bound (1 query sufficient) is Deutsch's original result.
