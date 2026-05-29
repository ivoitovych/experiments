# Factcheck — §5 Postulates

Mirrors `book/part-02-formalism/05-postulates.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## §5.1 — Postulate 1: pure state as ray in Hilbert space

- **Claim** (anchor): "An isolated quantum system is associated with a complex Hilbert space"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang, *Quantum Computation and Quantum Information*, Postulate 1; Dirac–von Neumann formalism)
- **Verified**: — · **Verdict**: open
- **Comment**: Foundational postulate of standard QM; attributed to Dirac–von Neumann formulation.

---

## §5.1 — n-qubit Hilbert space is C^{2^n}

- **Claim** (anchor): "For an $n$-qubit register the Hilbert space is"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §2.1; standard QI convention)
- **Verified**: — · **Verdict**: open
- **Comment**: Direct application of Postulate 4 (composite systems) applied n times to C^2.

---

## §5.1 — Superposition as postulate, not derived fact

- **Claim** (anchor): "Superposition is a postulate, not a derived fact"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §2.1; Dirac–von Neumann)
- **Verified**: — · **Verdict**: open
- **Comment**: The linearity of the state space, and hence superposition, is a foundational postulate.

---

## §5.2 — Postulate 2: closed-system evolution is unitary

- **Claim** (anchor): "The evolution of a closed quantum system over a finite interval is described by a unitary operator"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang, Postulate 2; Dirac–von Neumann)
- **Verified**: — · **Verdict**: open
- **Comment**: Core postulate; closed-system unitarity.

---

## §5.2 — Noisy evolution modelled as CPTP maps / quantum channels

- **Claim** (anchor): "completely positive trace-preserving (CPTP) maps — also called quantum channels — which subsume both unitary evolution and noise"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §8; Kraus 1983)
- **Verified**: — · **Verdict**: open
- **Comment**: CPTP / quantum-channel framework is the standard extension of the unitary postulate to open systems.

---

## §5.3 — Schrödinger equation generates the unitary via Hamiltonian

- **Claim** (anchor): "a time-independent Hamiltonian $H$ (a Hermitian operator) generates the unitary"
- **Method**: external
- **Source**: TBD — needs verification (Schrödinger 1926; Nielsen & Chuang §2.2)
- **Verified**: — · **Verdict**: open
- **Comment**: Standard derivation of time-evolution operator from Schrödinger equation.

---

## §5.3 — Convention: set ℏ = 1 in algorithmic QC

- **Claim** (anchor): "In algorithmic quantum computing we set $\\hbar = 1$"
- **Method**: convention
- **Source**: → §5.3 (stated convention)
- **Verified**: — · **Verdict**: open

---

## §5.3 — Time-ordered exponential for time-dependent Hamiltonians

- **Claim** (anchor): "the evolution is given by a time-ordered exponential"
- **Method**: external
- **Source**: TBD — needs verification (Dyson 1949; standard quantum mechanics references)
- **Verified**: — · **Verdict**: open
- **Comment**: Time-ordering operator and Dyson series are standard results; relevant to adiabatic QC and Trotter-based simulation (Chapter 16).

---

## §5.4 — Postulate 3: projective measurement and Born rule

- **Claim** (anchor): "A projective measurement is described by a complete set of orthogonal projectors"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang, Postulate 3; von Neumann 1932)
- **Verified**: — · **Verdict**: open
- **Comment**: Measurement postulate in the projective (von Neumann) form.

---

## §5.4 — Probabilities sum to one (completeness of projectors)

- **Claim** (anchor): "The probabilities sum to one because the projectors are complete"
- **Method**: derivation
- **Source**: → §5.4 (inline proof: sum over completeness relation gives 1)
- **Verified**: — · **Verdict**: open

---

## §5.4 — Non-degenerate case: amplitude-squared rule

- **Claim** (anchor): "the familiar amplitude-squared rule"
- **Method**: derivation
- **Source**: → §5.4 (reduction of rank-one projector formula)
- **Verified**: — · **Verdict**: open

---

## §5.4 — POVM formalism as generalisation of projective measurement

- **Claim** (anchor): "positive operator-valued measure (POVM) formalism replaces the projectors"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §2.2.6; Naimark's dilation theorem)
- **Verified**: — · **Verdict**: open
- **Comment**: POVMs are developed in Chapter 11; Naimark's theorem connects POVMs to projective measurements on an extended space.

---

## §5.5 — Postulate 4: composite-system Hilbert space is tensor product

- **Claim** (anchor): "The Hilbert space of a composite system is the tensor product of the Hilbert spaces of the components"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang, Postulate 4; Dirac–von Neumann)
- **Verified**: — · **Verdict**: open
- **Comment**: Tensor-product postulate; the source of the exponential state-space scaling.

---

## §5.5 — n-qubit state space exponential in n

- **Claim** (anchor): "applying the postulate $n$ times gives state space"
- **Method**: derivation
- **Source**: → §5.5 (direct from Postulate 4 applied iteratively)
- **Verified**: — · **Verdict**: open

---

## §5.6 — Observable as Hermitian operator; eigenvalues are measurement outcomes

- **Claim** (anchor): "A measurable quantity in quantum mechanics is represented by a Hermitian operator on the Hilbert space, called an observable"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §2.2.3; von Neumann 1932)
- **Verified**: — · **Verdict**: open

---

## §5.6 — Expectation value as trace / weighted sum

- **Claim** (anchor): "The expectation value of $O$ in a pure state"
- **Method**: derivation
- **Source**: → §5.6 (operator algebra from Born-rule probabilities)
- **Verified**: — · **Verdict**: open

---

## §5.6 — Any unitary written as exponential of Hermitian generator

- **Claim** (anchor): "any unitary can be written as $U = e^{-i K}$ for some Hermitian $K$"
- **Method**: external
- **Source**: TBD — needs verification (standard result in Lie theory / matrix analysis; Nielsen & Chuang §4.2)
- **Verified**: — · **Verdict**: open

---

## §5.7 — Born rule as consequence of postulates

- **Claim** (anchor): "restated here as a consequence of the postulates rather than as a definition"
- **Method**: derivation
- **Source**: → §5.4, §5.7 (derived from Postulates 1 and 3)
- **Verified**: — · **Verdict**: open

---

## §5.7 — Phase encodes interference, not just probability

- **Claim** (anchor): "The phase encodes how the state interferes when later operations are applied"
- **Method**: external
- **Source**: TBD — needs verification (standard QM / Nielsen & Chuang §2.1)
- **Verified**: — · **Verdict**: open
- **Comment**: Distinction between quantum amplitudes and classical probability distributions; foundational.

---

## §5.8 — Global phase is unobservable

- **Claim** (anchor): "A state $|\\psi\\rangle$ and $e^{i\\theta}|\\psi\\rangle$ represent the same physical state"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §2.1; Dirac–von Neumann ray definition)
- **Verified**: — · **Verdict**: open

---

## §5.9 — Two situations producing mixed states are operationally indistinguishable

- **Claim** (anchor): "every measurement on the system, every expectation value of every observable, gives identical statistics in both cases"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §2.4; standard quantum information)
- **Verified**: — · **Verdict**: open
- **Comment**: Operational equivalence of epistemic mixture and reduced state of entangled system.

---

## §5.10 — Density matrix: Hermitian, PSD, unit trace

- **Claim** (anchor): "A density matrix (or density operator) $\\rho$ on a Hilbert space"
- **Method**: external
- **Source**: TBD — needs verification (von Neumann 1932; Nielsen & Chuang §2.4)
- **Verified**: — · **Verdict**: open

---

## §5.10 — Pure state iff rho^2 = rho (or purity = 1)

- **Claim** (anchor): "The defining property is $\\rho^2 = \\rho$, or equivalently $\\mathrm{tr}(\\rho^2) = 1$"
- **Method**: derivation
- **Source**: → §5.10 (rank-one projector algebra)
- **Verified**: — · **Verdict**: open

---

## §5.10 — Purity tr(rho^2) = 1/d for maximally mixed state in dimension d

- **Claim** (anchor): "purity of $\\rho$, with $\\mathrm{tr}(\\rho^2) = 1$ for pure states and $\\mathrm{tr}(\\rho^2) = 1/d$ for the maximally mixed state in dimension $d$"
- **Method**: derivation
- **Source**: → §5.10 (computation from rho = I/d)
- **Verified**: — · **Verdict**: open

---

## §5.10 — Born rule in density-matrix form

- **Claim** (anchor): "Born rule, density-matrix form"
- **Method**: derivation
- **Source**: → §5.10 (reduces to §5.4 formula for pure states)
- **Verified**: — · **Verdict**: open

---

## §5.11 — Reduced state is unique operator reproducing local statistics

- **Claim** (anchor): "It is the unique operator with the property that every measurement on subsystem $A$ gives the same statistics"
- **Method**: external
- **Source**: TBD — needs verification (Nielsen & Chuang §2.4.3; standard quantum information)
- **Verified**: — · **Verdict**: open
- **Comment**: Uniqueness of the partial trace as the reduced state is a standard result.

---

## §5.11 — Reduced state of entangled pure joint state is mixed (Bell example)

- **Claim** (anchor): "the reduced state of an entangled pure joint state is mixed"
- **Method**: derivation
- **Source**: → §5.11, §5.12 (explicit partial-trace calculation on Bell state)
- **Verified**: — · **Verdict**: open

---

## §5.13 — No-cloning theorem: Wootters–Zurek and Dieks 1982

- **Claim** (anchor): "no-cloning, Wootters and Zurek 1982; Dieks 1982"
- **Method**: external
- **Source**: TBD — needs verification (Wootters & Zurek, *Nature* 299, 802–803, 1982; Dieks, *Phys. Lett. A* 92, 271–272, 1982)
- **Verified**: — · **Verdict**: open

---

## §5.13 — No-cloning proof: inner-product contradiction

- **Claim** (anchor): "forces $\\langle\\psi|\\phi\\rangle \\in \\{0, 1\\}$ for every pair"
- **Method**: derivation
- **Source**: → §5.13 (proof by contradiction using unitarity and inner-product preservation)
- **Verified**: — · **Verdict**: open

---

## §5.13 — Optimal approximate 1→2 cloner fidelity is 5/6

- **Claim** (anchor): "The optimal fidelity of an approximate universal $1 \\to 2$ cloner on a qubit is $5/6$"
- **Method**: external
- **Source**: TBD — needs verification (Bužek & Hillery 1996, *Phys. Rev. A* 54, 1844; Gisin & Massar 1997)
- **Verified**: — · **Verdict**: open
- **Comment**: Quantitative bound on approximate cloning; requires verification against original papers.

---

## §5.14 — No-deleting theorem: Pati and Braunstein 2000

- **Claim** (anchor): "no-deleting, Pati and Braunstein 2000"
- **Method**: external
- **Source**: TBD — needs verification (Pati & Braunstein, *Nature* 404, 164–165, 2000)
- **Verified**: — · **Verdict**: open

---

## §5.14 — No-deleting proof structurally mirrors no-cloning

- **Claim** (anchor): "The proof is structurally similar to no-cloning: assume the map exists, apply it to two distinct"
- **Method**: derivation
- **Source**: → §5.14 (sketch; full proof mirrors §5.13 argument)
- **Verified**: — · **Verdict**: open

---

## §5.14 — Quantum information is conserved under unitary evolution

- **Claim** (anchor): "information in unknown quantum states cannot be duplicated or erased by closed-system unitary operations"
- **Method**: derivation
- **Source**: → §5.13, §5.14 (joint consequence of no-cloning and no-deleting)
- **Verified**: — · **Verdict**: open
