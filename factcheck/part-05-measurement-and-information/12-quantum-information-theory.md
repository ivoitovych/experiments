# Factcheck — §12 Quantum Information Theory

Mirrors `book/part-05-measurement-and-information/12-quantum-information-theory.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §12.1 — Shannon source-coding theorem statement

- **Claim** (anchor): "Shannon's source-coding theorem says that an i.i.d. source producing letters with distribution $p$ can be compressed, asymptotically, to $H(p)$ bits per letter — and not fewer"
- **Method**: external
- **Source**: Shannon, "A Mathematical Theory of Communication" (1948); also Nielsen & Chuang §11.2
- **Verified**: — · **Verdict**: open

## §12.1 — Classical conditional entropy non-negativity

- **Claim** (anchor): "the conditional entropy of a classical variable cannot be negative because, conditioned on $X = x$, $Y$ is still a distribution and entropies of distributions are non-negative"
- **Method**: derivation
- **Source**: → §12.1 (inline argument)
- **Verified**: — · **Verdict**: open

## §12.1 — Classical mutual information upper bound

- **Claim** (anchor): "It is non-negative, zero iff $X$ and $Y$ are independent, and bounded above by $\min(H(X), H(Y))$"
- **Method**: derivation
- **Source**: → §12.1 (standard Shannon theory; follows from non-negativity of conditional entropy)
- **Verified**: — · **Verdict**: open

## §12.2 — Von Neumann entropy as Shannon entropy of eigenvalues

- **Claim** (anchor): "The von Neumann entropy is exactly the Shannon entropy of the eigenvalue distribution of"
- **Method**: derivation
- **Source**: → §12.2 (follows directly from spectral decomposition and definition)
- **Verified**: — · **Verdict**: open

## §12.2 — Measuring in any other basis increases entropy

- **Claim** (anchor): "any other rank-one orthonormal-basis measurement can only increase the outcome entropy (a majorization fact"
- **Method**: derivation
- **Source**: → §12.2 / §12.3 (data-processing inequality; follows from strong subadditivity)
- **Verified**: — · **Verdict**: open

## §12.2 — Subadditivity equality condition

- **Claim** (anchor): "equality iff $\rho_{AB} = \rho_A \otimes \rho_B$ is a product state"
- **Method**: derivation
- **Source**: → §12.2 (standard result; follows from properties of quantum mutual information)
- **Verified**: — · **Verdict**: open

## §12.2 — Strong subadditivity attribution (Lieb–Ruskai 1973)

- **Claim** (anchor): "Strong subadditivity (Lieb–Ruskai 1973):"
- **Method**: external
- **Source**: Lieb & Ruskai, "Proof of the strong subadditivity of quantum-mechanical entropy," J. Math. Phys. 14 (1973)
- **Verified**: — · **Verdict**: open

## §12.2 — Strong subadditivity proof difficulty

- **Claim** (anchor): "the quantum proof is famously non-trivial and the result was open for several years before Lieb and Ruskai settled it"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Historical claim about the open-problem status of SSA before 1973; consistent with Lieb–Ruskai (1973).

## §12.3 — Quantum mutual information exceeds classical ceiling for Bell state

- **Claim** (anchor): "This factor-of-two gap is the quantitative fingerprint of entanglement at the mutual-information level: entangled states carry correlations of a strictly stronger kind than any joint classical distribution can"
- **Method**: derivation
- **Source**: → §12.3 (calculation shown inline: $S(\rho_A)=S(\rho_B)=1$, $S(\rho_{AB})=0$, so $I(A:B)=2$)
- **Verified**: — · **Verdict**: open

## §12.3 — Data-processing inequality is a corollary of strong subadditivity

- **Claim** (anchor): "the quantum version is a corollary of strong subadditivity (§12.2)"
- **Method**: derivation
- **Source**: → §12.2 (strong subadditivity); standard result in quantum information
- **Verified**: — · **Verdict**: open

## §12.4 — Quantum conditional entropy can be negative (Bell state example)

- **Claim** (anchor): "The startling fact is that this quantity *can be negative*. For the Bell state"
- **Method**: derivation
- **Source**: → §12.4 (direct calculation: $S(\rho_{AB})=0$, $S(\rho_B)=1$, so $S(A|B)=-1$)
- **Verified**: — · **Verdict**: open

## §12.4 — State-merging operational meaning (Horodecki–Oppenheim–Winter 2005)

- **Claim** (anchor): "The operational meaning was found by Horodecki, Oppenheim, and Winter (2005) in the state-merging protocol"
- **Method**: external
- **Source**: Horodecki, Oppenheim & Winter, "Partial quantum information," Nature 436 (2005); also J. Math. Phys. version
- **Verified**: — · **Verdict**: open

## §12.4 — State-merging quantum communication rate

- **Claim** (anchor): "The asymptotic rate of *quantum communication* Alice needs to send is"
- **Method**: external
- **Source**: Horodecki, Oppenheim & Winter (2005); also Abeyesinghe–Devetak–Hayden–Winter (2009) for the "fully quantum Slepian–Wolf" version
- **Verified**: — · **Verdict**: open
- **Comment**: The specific rate formula $Q = S(A|B)_\rho$ when non-negative, and entanglement extraction rate $|S(A|B)|$ when negative, are the content of the HOW theorem.

## §12.4 — Negative conditional entropy signals entanglement extraction

- **Claim** (anchor): "A negative conditional entropy is *exactly* the rate at which entanglement falls out of the protocol"
- **Method**: external
- **Source**: Horodecki, Oppenheim & Winter (2005)
- **Verified**: — · **Verdict**: open

## §12.5 — Holevo bound attribution (Holevo 1973)

- **Claim** (anchor): "This is the Holevo bound (Holevo 1973): the accessible classical information of a quantum ensemble is at most"
- **Method**: external
- **Source**: Holevo, "Bounds for the quantity of information transmitted by a quantum communication channel," Problems of Information Transmission 9 (1973)
- **Verified**: — · **Verdict**: open

## §12.5 — Holevo bound proof via strong subadditivity

- **Claim** (anchor): "The proof is a direct application of strong subadditivity to the classical-quantum state"
- **Method**: derivation
- **Source**: → §12.2 (strong subadditivity); the proof in §12.5
- **Verified**: — · **Verdict**: open

## §12.5 — One qubit carries at most one classical bit

- **Claim** (anchor): "a single qubit ($d = 2$) cannot convey more than $1$ classical bit of accessible information per use"
- **Method**: derivation
- **Source**: → §12.5 (corollary of Holevo bound with $d=2$)
- **Verified**: — · **Verdict**: open

## §12.5 — Superdense coding spends an ebit, does not violate Holevo bound

- **Claim** (anchor): "Superdense coding (§7.12) reaches the $2$-bit ceiling only with the *assistance* of a pre-shared ebit — it does not violate the bound, it spends an extra resource"
- **Method**: external
- **Source**: Bennett & Wiesner, Phys. Rev. Lett. 69 (1992); also Nielsen & Chuang §2.3
- **Verified**: — · **Verdict**: open

## §12.5 — HSW theorem attribution (Holevo 1998, Schumacher–Westmoreland 1997)

- **Claim** (anchor): "Holevo's bound is one half of the HSW theorem (Holevo 1998, Schumacher–Westmoreland 1997) that gives the classical capacity"
- **Method**: external
- **Source**: Holevo, IEEE Trans. Inf. Theory 44 (1998); Schumacher & Westmoreland, Phys. Rev. A 56 (1997)
- **Verified**: — · **Verdict**: open

## §12.6 — Helstrom bound for state discrimination

- **Claim** (anchor): "The Helstrom bound says the maximum success probability is"
- **Method**: external
- **Source**: Helstrom, "Quantum Detection and Estimation Theory" (1976)
- **Verified**: — · **Verdict**: open

## §12.6 — Trace distance equals maximum total-variation distance over all POVMs

- **Claim** (anchor): "it equals the maximum classical total-variation distance achievable from any measurement statistics: there exists a POVM whose induced classical distributions have total-variation distance equal to $D(\rho, \sigma)$, and no POVM beats this"
- **Method**: external
- **Source**: TBD — needs verification; standard result, e.g., Nielsen & Chuang §9.2
- **Verified**: — · **Verdict**: open

## §12.6 — Contractivity of trace distance under CPTP maps

- **Claim** (anchor): "For any CPTP map $\mathcal{N}$, $D(\mathcal{N}(\rho), \mathcal{N}(\sigma)) \le D(\rho, \sigma)$"
- **Method**: external
- **Source**: TBD — needs verification; follows from Uhlmann's theorem and properties of the trace norm; standard result
- **Verified**: — · **Verdict**: open

## §12.7 — Fidelity conventions note

- **Claim** (anchor): "Several conventions exist in the literature: some sources square this quantity and call *that* the fidelity, some call this expression the *square-root fidelity*"
- **Method**: convention
- **Source**: → §12.7 notation; see also Nielsen & Chuang vs. Jozsa (1994) conventions
- **Verified**: — · **Verdict**: open

## §12.7 — Uhlmann's theorem

- **Claim** (anchor): "Uhlmann's theorem gives the geometric interpretation. Any two density matrices on"
- **Method**: external
- **Source**: Uhlmann, "The transition probability in the state space of a *-algebra," Rep. Math. Phys. 9 (1976)
- **Verified**: — · **Verdict**: open

## §12.7 — Fuchs–van de Graaf inequalities

- **Claim** (anchor): "Trace distance and fidelity bound each other through the Fuchs–van de Graaf inequalities:"
- **Method**: external
- **Source**: Fuchs & van de Graaf, "Cryptographic distinguishability measures for quantum-mechanical states," IEEE Trans. Inf. Theory 45 (1999)
- **Verified**: — · **Verdict**: open

## §12.7 — Upper Fuchs–van de Graaf bound tight for pure states

- **Claim** (anchor): "On pure states the upper bound is tight"
- **Method**: derivation
- **Source**: → §12.7 (standard calculation; for pure states $|\psi\rangle$, $|\phi\rangle$: $D = \sqrt{1-|\langle\psi|\phi\rangle|^2}$ and $F = |\langle\psi|\phi\rangle|$, so $D = \sqrt{1-F^2}$)
- **Verified**: — · **Verdict**: open

## §12.7 — Fidelity monotonicity under quantum channels

- **Claim** (anchor): "Fidelity is also monotone under quantum channels: $F(\mathcal{N}(\rho), \mathcal{N}(\sigma)) \ge F(\rho, \sigma)$"
- **Method**: external
- **Source**: TBD — needs verification; standard result, follows from Uhlmann's theorem and CPTP map properties
- **Verified**: — · **Verdict**: open

## §12.8 — No-cloning theorem attribution (Wootters–Zurek, Dieks 1982)

- **Claim** (anchor): "No-cloning (Wootters–Zurek, Dieks 1982). No unitary takes"
- **Method**: external
- **Source**: Wootters & Zurek, Nature 299 (1982); Dieks, Phys. Lett. A 92 (1982)
- **Verified**: — · **Verdict**: open

## §12.8 — No-cloning proof via inner-product preservation

- **Claim** (anchor): "The proof in §5.13 contradicts inner-product preservation"
- **Method**: derivation
- **Source**: → §5.13
- **Verified**: — · **Verdict**: open

## §12.8 — No-broadcasting attribution (Barnum–Caves–Fuchs–Jozsa–Schumacher 1996)

- **Claim** (anchor): "No-broadcasting (Barnum–Caves–Fuchs–Jozsa–Schumacher 1996). A *broadcaster* would output a bipartite state whose two marginals both equal an unknown input"
- **Method**: external
- **Source**: Barnum, Caves, Fuchs, Jozsa & Schumacher, Phys. Rev. Lett. 76 (1996)
- **Verified**: — · **Verdict**: open

## §12.8 — No-broadcasting characterises commuting ensembles

- **Claim** (anchor): "No physical channel can do this for an arbitrary input ensemble unless every state in the ensemble commutes with every other"
- **Method**: external
- **Source**: Barnum, Caves, Fuchs, Jozsa & Schumacher (1996)
- **Verified**: — · **Verdict**: open

## §12.8 — No-deleting attribution (Pati–Braunstein 2000)

- **Claim** (anchor): "No-deleting (Pati–Braunstein 2000). Two identical copies of an unknown"
- **Method**: external
- **Source**: Pati & Braunstein, Nature 404 (2000)
- **Verified**: — · **Verdict**: open

## §12.9 — Schumacher compression theorem attribution and date

- **Claim** (anchor): "Schumacher's theorem (1995) is the quantum analogue of Shannon's source-coding theorem and the source of the *qubit* as a unit"
- **Method**: external
- **Source**: Schumacher, "Quantum coding," Phys. Rev. A 51 (1995)
- **Verified**: — · **Verdict**: open

## §12.9 — Schumacher theorem: von Neumann entropy is minimum qubit rate

- **Claim** (anchor): "The von Neumann entropy is therefore the *minimum number of qubits per letter* that a quantum source can be faithfully compressed into"
- **Method**: external
- **Source**: Schumacher, Phys. Rev. A 51 (1995); also Jozsa & Schumacher (1994)
- **Verified**: — · **Verdict**: open

## §12.9 — Typical subspace dimension

- **Claim** (anchor): "The typical subspace has dimension"
- **Method**: derivation
- **Source**: → §12.9 (follows from quantum asymptotic equipartition; standard typicality argument)
- **Verified**: — · **Verdict**: open

## §12.9 — Qubit unit justified by Schumacher's theorem

- **Claim** (anchor): "The unit was not chosen by historical accident — Schumacher's theorem fixes it"
- **Method**: external
- **Source**: Schumacher, Phys. Rev. A 51 (1995)
- **Verified**: — · **Verdict**: open

## §12.10 — HSW theorem formula and dates (1997–1998)

- **Claim** (anchor): "The Holevo–Schumacher–Westmoreland (HSW) theorem (1997–1998) states"
- **Method**: external
- **Source**: Holevo, IEEE Trans. Inf. Theory 44 (1998); Schumacher & Westmoreland, Phys. Rev. A 56 (1997)
- **Verified**: — · **Verdict**: open

## §12.10 — Holevo quantity is superadditive (Hastings 2009)

- **Claim** (anchor): "some channels carry strictly more classical information when many copies are used jointly than copy-by-copy (Hastings 2009)"
- **Method**: external
- **Source**: Hastings, "A counterexample to additivity of minimum output entropy," Nature Physics 5 (2009)
- **Verified**: — · **Verdict**: open

## §12.10 — LSD theorem attribution (Lloyd 1997, Shor 2002, Devetak 2005)

- **Claim** (anchor): "The LSD theorem (Lloyd 1997, Shor 2002, Devetak 2005) gives"
- **Method**: external
- **Source**: Lloyd, Phys. Rev. A 55 (1997); Shor (2002, unpublished lecture notes); Devetak, IEEE Trans. Inf. Theory 51 (2005)
- **Verified**: — · **Verdict**: open
- **Comment**: Shor 2002 is unpublished lecture notes; the standard citable reference is Devetak (2005). Verify that the book's attribution is accurate for Lloyd and Shor.

## §12.10 — Bennett–Shor–Smolin–Thapliyal theorem for entanglement-assisted capacity (1999, 2002)

- **Claim** (anchor): "The Bennett–Shor–Smolin–Thapliyal theorem (1999, 2002) shows this formula requires *no* regularisation — entanglement assistance restores single-letter additivity"
- **Method**: external
- **Source**: Bennett, Shor, Smolin & Thapliyal, IEEE Trans. Inf. Theory 48 (2002); earlier conference version 1999
- **Verified**: — · **Verdict**: open

## §12.10 — Capacity ordering $Q \le P \le C \le C_E$

- **Claim** (anchor): "The ordering $Q \le P \le C \le C_E$ holds generally"
- **Method**: external
- **Source**: TBD — needs verification; standard result in quantum Shannon theory, e.g., Wilde "Quantum Information Theory" (Cambridge)
- **Verified**: — · **Verdict**: open

## §12.11 — Pure-state entanglement measure equals $S(\rho_A)$ (§7.13 cross-reference)

- **Claim** (anchor): "By the §7.13 result, $E(|\psi\rangle_{AB}) = S(\rho_A)$ is simultaneously the asymptotic rate at which Bell pairs can be distilled from copies of $|\psi\rangle$ via LOCC and the rate at which Bell pairs are needed to prepare it"
- **Method**: external
- **Source**: Bennett, Bernstein, Popescu & Schumacher, Phys. Rev. A 53 (1996) for distillation; Bennett, Brassard, Popescu, Schumacher, Smolin & Wootters (1996) for dilution; see also §7.13
- **Verified**: — · **Verdict**: open

## §12.11 — Bound entangled states exist

- **Claim** (anchor): "bound entangled states (positive formation entropy, zero distillable entanglement) exist"
- **Method**: external
- **Source**: Horodecki, Horodecki & Horodecki, Phys. Rev. Lett. 80 (1998)
- **Verified**: — · **Verdict**: open
