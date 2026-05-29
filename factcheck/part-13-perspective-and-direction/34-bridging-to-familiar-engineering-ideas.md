# Factcheck — §34 Bridging to Familiar Engineering Ideas

Mirrors `book/part-13-perspective-and-direction/34-bridging-to-familiar-engineering-ideas.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §34.1 — Classical simulator pays O(4^n) per gate

- **Claim** (anchor): "a naive classical simulator pays O(4^n) per gate, while a quantum computer pays O(1)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result in quantum simulation complexity; the O(4^n) factor comes from applying a 2^n × 2^n matrix to a 2^n vector.

## §34.1 — Nonlinear gates enable FTL signaling and NP-complete in polynomial time

- **Claim** (anchor): "A nonlinear gate is not just unimplemented — it is forbidden, in the same way the second law of thermodynamics forbids a perpetual-motion machine"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to consequences of nonlinear quantum mechanics; associated with Abrams–Lloyd (1998) and others. Chapter cross-references §34.9 and Chapter 35.

## §34.2 — QFT depth and gate count vs classical FFT

- **Claim** (anchor): "implemented as a circuit of depth O(n^2) with O(n^2) gates rather than the O(n cdot 2^n) of a classical FFT"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard textbook result. Coppersmith (1994) QFT circuit; classical FFT is O(n 2^n) for DFT over 2^n points.

## §34.2 — Trotterization as finite-difference approximation

- **Claim** (anchor): "Trotterization (Chapter 16) is the same finite-difference approximation that DSP engineers use when discretising a continuous filter"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Analogy claim with factual component: Trotterization as a product-formula approximation to Hamiltonian simulation.

## §34.4 — Native gate sets by hardware platform

- **Claim** (anchor): "superconducting devices typically offer"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claims specific native gates: superconducting {R_Z(θ), √X, CZ}; ion traps use Mølmer–Sørensen gates; neutral-atom devices use Rydberg gates. Platform-specific and vendor-dependent; may vary.

## §34.4 — Current NISQ device parameters

- **Claim** (anchor): "tens to low hundreds of qubits, microsecond-scale coherence times, gate fidelities of 10^{-3} to 10^{-4}"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific hardware figures for NISQ era; perishable claim subject to rapid hardware improvement. Gate fidelities quoted as error rates (not fidelities), which should be noted.

## §34.5 — Shot variance and standard error decay

- **Claim** (anchor): "The variance of the estimator decays as 1/N, so the standard error decays as 1/sqrt{N}"
- **Method**: derivation
- **Source**: → standard statistical result for sample mean estimator; see also §34.5 context
- **Verified**: — · **Verdict**: open
- **Comment**: Standard Monte Carlo convergence result; applies to i.i.d. measurement outcomes.

## §34.5 — Parameter-shift rule exactness

- **Claim** (anchor): "a finite-difference-shaped formula that is exact (not an approximation) for gates of the form"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Parameter-shift rule (Mitarai et al. 2018; Schuld et al. 2019) is exact for generators that are proportional to a single Pauli. The formula given uses shifts of ±π/2.

## §34.5 — Parameter-shift costs 2p circuit evaluations per gradient step

- **Claim** (anchor): "a circuit with p parameters costs 2p evaluations per gradient step"
- **Method**: derivation
- **Source**: → parameter-shift rule: two evaluations per parameter
- **Verified**: — · **Verdict**: open
- **Comment**: Direct consequence of the rule: each of p parameters requires two shifted evaluations.

## §34.6 — ECC RAM: 64 data bits with 8 parity bits

- **Claim** (anchor): "every 64 data bits carry 8 Hamming-code parity bits, which detect double errors and correct single ones"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard ECC DRAM spec (SECDED — single-error correcting, double-error detecting). The 64+8 = 72-bit ECC word is the common implementation. Should be verified against JEDEC standards.

## §34.6 — Reed-Solomon error correction capacity

- **Claim** (anchor): "A classical Reed-Solomon code corrects up to"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Claims correction of ⌊(n-k)/2⌋ symbol errors in an (n,k) block. Standard coding-theory result.

## §34.6 — Stabiliser codes correct up to ⌊(d-1)/2⌋ qubit errors

- **Claim** (anchor): "A quantum stabiliser code (Chapter 19) corrects up to"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard result for quantum error-correcting codes of distance d. See Gottesman (1997), Nielsen & Chuang.

## §34.6 — Threshold theorem and von Neumann (1956)

- **Claim** (anchor): "The classical 'you can build a reliable computer out of unreliable parts' theorem (von Neumann, 1956)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: von Neumann (1956) "Probabilistic Logics and the Synthesis of Reliable Organisms from Unreliable Components" is the canonical reference.

## §34.6 — Surface-code threshold approximately 10^{-2}

- **Claim** (anchor): "around 10^{-2} for surface codes under standard assumptions"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The ~1% threshold for surface codes is a well-studied result; see Fowler et al. (2012), Dennis et al. (2002). The exact value depends on noise model assumptions.

## §34.8 — Two-qubit gate error rate relative to single-qubit

- **Claim** (anchor): "Two-qubit gates are expensive"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Widely cited ratio for NISQ hardware; specific ratio is platform-dependent and evolving.

## §34.9 — BQP not known to contain NP

- **Claim** (anchor): "most experts believe it does not"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard complexity-theoretic statement. The belief that BQP does not contain NP is consensus but unproven; see Aaronson (2010) and related complexity literature.
