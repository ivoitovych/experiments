# Factcheck — §13 Quantum Algorithms Mindset

Mirrors `book/part-06-algorithms/13-quantum-algorithms-mindset.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §13.1 — Deutsch–Jozsa and Bernstein–Vazirani demonstrate interference-based global feature extraction
- **Claim** (anchor): "as Deutsch–Jozsa and Bernstein–Vazirani show (§§14.2, 14.3), interference can pack a global feature of the function into those bits in a way no single classical query can"
- **Method**: derivation
- **Source**: → §14.2, §14.3
- **Verified**: — · **Verdict**: open
- **Comment**: The chapter asserts D-J and BV as concrete illustrations; the derivations live in those later sections.

## §13.1 — Hadamard transform formula with phase factor
- **Claim** (anchor): "The algorithm injects information into the phases between input and output Hadamard layers; the final Hadamard converts those phases back into a bit string that measurement can read"
- **Method**: derivation
- **Source**: → §13.1 (inline derivation, formula displayed above this sentence)
- **Verified**: — · **Verdict**: open
- **Comment**: The displayed formula is standard; the surrounding prose anchors the algorithmic interpretation.

## §13.2 — Phase kickback introduced in §9.3
- **Claim** (anchor): "phase kickback, introduced operationally in §9.3"
- **Method**: convention
- **Source**: → §9.3
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference to prior chapter; verifiable by checking §9.3 introduces the same construction.

## §13.2 — Function-evaluation kickback identity
- **Claim** (anchor): "prepare the target ancilla in"
- **Method**: derivation
- **Source**: → §13.2 (inline derivation)
- **Verified**: — · **Verdict**: open
- **Comment**: The claim is that applying U_f to |x⟩|−⟩ yields a phase factor (−1)^{f(x)} on the input register; standard algebraic check.

## §13.2 — Deutsch, D-J, BV, and Grover all start from function-evaluation kickback
- **Claim** (anchor): "Deutsch (§14.1), Deutsch–Jozsa (§14.2), Bernstein–Vazirani (§14.3), and Grover (Chapter 15) all start from this rewrite"
- **Method**: derivation
- **Source**: → §14.1, §14.2, §14.3, Ch.15
- **Verified**: — · **Verdict**: open
- **Comment**: Structural claim that each named algorithm relies on the phase-kickback oracle rewrite; checkable against each algorithm's circuit description.

## §13.2 — Eigenphase kickback drives phase estimation and Shor's algorithm
- **Claim** (anchor): "controlled applications of powers $U^{2^k}$ kick the binary expansion of $\\varphi$ onto a register of control qubits. This is the engine of phase estimation (§14.6) and of Shor's algorithm (Chapter 15)"
- **Method**: derivation
- **Source**: → §14.6, Ch.15
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference claim that eigenphase kickback via controlled-U^{2^k} is the shared mechanism behind QPE and Shor.

## §13.3 — Query complexity lower bounds via polynomial method and adversary bound
- **Claim** (anchor): "it admits sharp lower bounds via tools such as the polynomial method and the adversary bound"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named proof techniques from quantum query complexity theory; standard references include Beals et al. (polynomial method) and Ambainis (adversary method).

## §13.3 — Promise problems: Deutsch–Jozsa, Simon, and most query-model separations rely on restricted oracle families
- **Claim** (anchor): "Deutsch–Jozsa, Simon, and most query-model separations are promise problems: the oracle is guaranteed to belong to a restricted family (constant-or-balanced"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Well-known property of D-J and Simon; without the promise, classical and quantum query complexities coincide or the separation collapses.

## §13.3 — Without the promise, exponential separations collapse
- **Claim** (anchor): "Without the promise, exponential separations usually collapse"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Strong claim about the query-complexity landscape; applies specifically to promise problems like D-J. Needs a reference to a formal statement or known result.

## §13.4 — QFT implementable in O(n²) gates
- **Claim** (anchor): "implementable on $n = \\log_2 N$ qubits with $O(n^2)$ gates (§14.5)"
- **Method**: derivation
- **Source**: → §14.5
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result; the derivation is cross-referenced to §14.5.

## §13.4 — Periodicity detection is the structural core of Shor and the hidden-subgroup framework
- **Claim** (anchor): "This is the structural core of Shor's algorithm (Chapter 15) and of the hidden-subgroup framework (Chapter 14)"
- **Method**: derivation
- **Source**: → Ch.14, Ch.15
- **Verified**: — · **Verdict**: open
- **Comment**: Framing claim; verifiable against Shor's and HSP algorithm descriptions.

## §13.4 — Phase estimation uses m controlled-U^{2^k} stages and O(m²)-gate inverse QFT
- **Claim** (anchor): "outputs an $m$-bit approximation of $\\varphi$ using $m$ controlled-$U^{2^k}$ stages and an $O(m^2)$-gate inverse QFT"
- **Method**: derivation
- **Source**: → §14.6
- **Verified**: — · **Verdict**: open
- **Comment**: Gate-count claim for QPE; the O(m²) figure follows from the QFT circuit complexity.

## §13.4 — Phase estimation is the engine of Shor's, quantum-simulation eigenvalue extraction, and HHL
- **Claim** (anchor): "Phase estimation is the algorithmic engine of Shor's algorithm (the period $r$ is read off as a phase), of quantum-simulation eigenvalue extraction (Chapter 16), and of HHL-style linear-system solvers"
- **Method**: derivation
- **Source**: → Ch.15, Ch.16
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference claim tying QPE to three downstream algorithms; checkable against each algorithm's exposition.

## §13.5 — Amplitude amplification requires O(sqrt(N)) iterations for constant success probability, giving quadratic speedup
- **Claim** (anchor): "rotating amplitude into the marked subspace at a rate of $O(1/\\sqrt{N})$ per iteration. The number of iterations needed to reach success probability $\\Theta(1)$ is $O(\\sqrt{N})$, giving the famous quadratic speedup of Chapter 15"
- **Method**: derivation
- **Source**: → Ch.15
- **Verified**: — · **Verdict**: open
- **Comment**: Core complexity claim for Grover/amplitude amplification; derivation in Chapter 15.

## §13.5 — Tang's dequantisation of recommendation systems
- **Claim** (anchor): "Tang's dequantisation of recommendation systems — can sometimes match a claimed quantum speedup if the input model assumed by the quantum algorithm is correspondingly powerful classically"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named result (Tang, ~2018); specific claim that a classical algorithm matches a quantum recommendation-systems speedup under an equivalent classical input model.

## §13.6 — BQP closed under error amplification via majority voting and Chernoff bound
- **Claim** (anchor): "The complexity class $\\mathrm{BQP}$ is defined this way and is closed under such amplification"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard property of BQP; the Chernoff-based error reduction to e^{-Omega(k)} is a textbook fact.

## §13.7 — BQP containment chain P ⊆ BPP ⊆ BQP ⊆ PSPACE
- **Claim** (anchor): "The known containments are"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard complexity-theoretic results; BQP⊆PSPACE is a known theorem. The containments P⊆BPP and BPP⊆BQP are also known.

## §13.7 — BQP ⊆ AWPP
- **Claim** (anchor): "with $\\mathrm{BQP} \\subseteq \\mathrm{AWPP}$ also known"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Less standard inclusion; attributed as a known result without citation. Needs a reference (Fortnow & Rogers 1999 or similar).

## §13.7 — P = BPP widely expected via derandomisation; BPP ⊊ BQP and BQP ⊊ PSPACE believed but unproven
- **Claim** (anchor): "The relationships are mostly open and the beliefs are not uniform"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Surrounding prose for the claim that P=BPP is widely expected (derandomisation) whereas strict separations BPP⊊BQP and BQP⊊PSPACE are believed but unproven; consensus belief, not theorem.

## §13.7 — P ⊊ EXP from the time hierarchy theorem
- **Claim** (anchor): "the only nearby unconditional separation is the coarse $\\mathrm{P} \\subsetneq \\mathrm{EXP}$ from the time hierarchy theorem (§17.1)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard unconditional result from complexity theory; the time hierarchy theorem gives P ⊊ EXP. Cross-reference to §17.1.

## §13.7 — Exponential speedups: factoring, discrete log, Pell's equation, period finding in the abelian HSP family
- **Claim** (anchor): "The flagship cases live in the abelian hidden subgroup family: factoring (Shor, Chapter 15), discrete logarithm, Pell's equation, period finding"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Named algorithmic results; factoring and discrete log are standard (Shor); Pell's equation as an abelian HSP instance needs a specific reference.

## §13.7 — Non-abelian HSP (dihedral and symmetric groups) resisting quantum attack
- **Claim** (anchor): "with the dihedral and symmetric groups long resisting attack"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Ongoing open problem in quantum algorithms; claims that no efficient quantum algorithm is known for HSP over these groups.

## §13.7 — Grover gives quadratic speedup for unstructured search; element distinctness, collision finding, graph problems inherit polynomial speedups
- **Claim** (anchor): "Grover's algorithm gives a quadratic speedup for unstructured search; element distinctness, collision finding, and many graph problems inherit polynomial speedups from Grover-style subroutines or from the quantum walk framework"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Multiple attributed speedup claims; Grover's quadratic speedup is standard; quantum walk results for element distinctness etc. need specific references (Ambainis, Szegedy).

## §13.7 — T-count as dominant cost in fault-tolerant setting; T gate consumes a magic state
- **Claim** (anchor): "T-count, in fault-tolerant settings, is the dominant cost because every T gate consumes a magic state (§8.10)"
- **Method**: convention
- **Source**: → §8.10
- **Verified**: — · **Verdict**: open
- **Comment**: Convention established in §8.10; T-gate magic-state consumption is a standard fault-tolerance fact.

## §13.7 — Tang-style dequantisation deflates 2018-vintage exponential speedups to polynomial under corrected access model
- **Claim** (anchor): "A 2018-vintage exponential speedup can deflate to a polynomial one when the classical access model is corrected"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to Tang (2018/2019) dequantisation results; the "2018-vintage" framing dates the Tang recommendation-systems result specifically.

## §13.7 — Quantum simulation of local Hamiltonians admits provable polynomial-time algorithms
- **Claim** (anchor): "Quantum simulation of local Hamiltonians (Chapter 16) admits provable polynomial-time algorithms, and the speedup over the best known classical algorithms is exponential for many natural physical problems"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Two-part claim: (1) poly-time quantum algorithms for local Hamiltonians exist; (2) exponential gap vs best-known classical. The second is a best-known-algorithm gap, not a proved separation — which the text correctly qualifies. Cross-reference to Chapter 16.
