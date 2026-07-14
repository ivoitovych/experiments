# Factcheck — §19 Quantum Error Correction and Fault Tolerance

Mirrors `book/part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## §19.2 — Hamming bound and Singleton bound have quantum analogues

- **Claim** (anchor): "the **Hamming bound** and **Singleton bound** — two classical counting inequalities that cap how many errors any code with $n$ bits and $k$ data bits can correct — constrain the achievable trade-off. Both bounds have direct quantum analogues."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Standard claim in QEC literature; quantum analogues (quantum Hamming bound, quantum Singleton / Knill–Laflamme bound) are well-established but the specific framing should be confirmed against a canonical source such as Nielsen & Chuang.

---

## §19.6 — Shor code proposed 1995, parameters [[9,1,3]]

- **Claim** (anchor): "The **9-qubit Shor code**, proposed by Peter Shor in 1995, is the first quantum code to correct an arbitrary single-qubit error."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Year of publication and priority claim ("first quantum code to correct an arbitrary single-qubit error") should be confirmed. Shor's 1995 paper is widely cited; check for any simultaneous or prior constructions.

---

## §19.6 — Shor code parameters [[9,1,3]]

- **Claim** (anchor): "The Shor code has parameters $[[9, 1, 3]]$ (nine physical qubits, one logical qubit, distance three — the general $[[n, k, d]]$ convention is fixed in §19.8)"
- **Method**: derivation
- **Source**: → §19.6 (stabiliser count and logical operator weight argument in this section)
- **Verified**: — · **Verdict**: open
- **Comment**: Parameters follow from the explicit construction given in the section; the weight-3 logical operators $\bar X = Z_1 Z_4 Z_7$ and $\bar Z = X_1 X_2 X_3$ establish distance 3.

---

## §19.7 — Steane code attributed to Steane (1996), parameters [[7,1,3]]

- **Claim** (anchor): "The **7-qubit Steane code**, due to Andrew Steane (1996), encodes one logical qubit into seven physical qubits and corrects any single-qubit error."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Year 1996 and attribution to Steane should be confirmed against the original paper.

---

## §19.7 — Steane code derives from classical Hamming [7,4,3]

- **Claim** (anchor): "The construction borrows directly from the classical Hamming $[7, 4, 3]$ code."
- **Method**: derivation
- **Source**: → §19.7 (parity-check matrix $H_{\mathrm{Ham}}$ and CSS construction given in this section)
- **Verified**: — · **Verdict**: open
- **Comment**: The derivation from the classical Hamming code is spelled out explicitly in the section via the parity-check matrix; parameters of the classical code are standard.

---

## §19.7 — Steane code transversal gate: entire Clifford group

- **Claim** (anchor): "the entire Clifford group is transversal on the Steane code (§19.20)"
- **Method**: derivation
- **Source**: → §19.20
- **Verified**: — · **Verdict**: open
- **Comment**: Specific claim that $\bar H$, $\bar S$, $\bar X$, $\bar Z$, $\bar{\mathrm{CNOT}}$ are all transversal on the Steane code; should be verified by the fault-tolerant gates discussion in §19.20.

---

## §19.7 — CSS generalisation: [[n, 2k−n, d]] from self-dual-containing classical code

- **Claim** (anchor): "any classical $[n, k, d]$ code that contains its dual gives a quantum CSS code with parameters $[[n, 2k - n, d]]$"
- **Method**: derivation
- **Source**: → §19.11 (CSS construction)
- **Verified**: — · **Verdict**: open
- **Comment**: This is the standard CSS theorem; the derivation is referenced to §19.11.

---

## §19.8 — Stabiliser formalism attributed to Daniel Gottesman

- **Claim** (anchor): "The **stabiliser formalism**, due to Daniel Gottesman, makes this systematic."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution of the stabiliser formalism to Gottesman is standard; should be confirmed against Gottesman's thesis or original papers.

---

## §19.8 — Gottesman–Knill theorem: stabiliser circuits classically simulable in O(n²)

- **Claim** (anchor): "stabiliser states (states in $C(S)$ for some $S$) plus Clifford gates plus computational-basis measurement can all be tracked in $O(n^2)$ time per operation by updating the generators of $S$ — they are classically simulable."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The $O(n^2)$ per-operation complexity for stabiliser simulation (Aaronson–Gottesman tableau algorithm) should be confirmed. The classical simulability result is Gottesman–Knill; the specific complexity is from Aaronson & Gottesman (2004).

---

## §19.8 — Surface code parameters [[d²+(d−1)², 1, d]]

- **Claim** (anchor): "the surface code (§19.12) has $[[d^2 + (d-1)^2, 1, d]]$ for odd $d$"
- **Method**: derivation
- **Source**: → §19.12 (surface code geometry)
- **Verified**: — · **Verdict**: open
- **Comment**: Parameters follow from the rotated-surface-code geometry described in §19.12.

---

## §19.10 — MWPM decoder attributed to Edmonds, adapted to QEC by Dennis, Kitaev, Landahl, and Preskill

- **Claim** (anchor): "The **minimum-weight perfect matching (MWPM) decoder**, due to Edmonds and adapted to QEC by Dennis, Kitaev, Landahl, and Preskill"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution of MWPM graph algorithm to Edmonds and QEC adaptation to Dennis et al. should be confirmed. The Dennis–Kitaev–Landahl–Preskill paper is a well-known 2002 paper in the QEC literature.

---

## §19.10 — MWPM decoder time complexity O((nT)³)

- **Claim** (anchor): "find the most likely matching of syndrome defects in $O((nT)^3)$ time, where $T$ is the number of syndrome rounds"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The $O((nT)^3)$ complexity for MWPM in the surface-code context should be confirmed; it derives from the cubic complexity of Edmond's blossom algorithm on the syndrome graph.

---

## §19.10 — Union-find decoder attributed to Delfosse and Nickerson, almost-linear time

- **Claim** (anchor): "the union-find decoder of Delfosse and Nickerson runs in almost-linear time and is competitive with MWPM at threshold"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution and almost-linear time complexity claim should be confirmed against the Delfosse–Nickerson paper.

---

## §19.11 — CSS construction attributed to Calderbank, Shor, and Steane

- **Claim** (anchor): "The **Calderbank–Shor–Steane (CSS) construction** builds quantum codes out of pairs of classical linear codes."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution to Calderbank, Shor, and Steane is standard in the QEC literature; should be confirmed against their original papers.

---

## §19.12 — Surface code introduced by Kitaev, developed by Bravyi–Kitaev, Dennis et al., Fowler et al.

- **Claim** (anchor): "The **surface code**, introduced by Kitaev and developed by Bravyi and Kitaev, Dennis et al., and Fowler et al., is the leading candidate for near-term fault tolerance."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution and publication lineage should be confirmed. The Fowler et al. paper is typically the 2012 "Surface codes: Towards practical large-scale quantum computation" paper.

---

## §19.12 — Surface code threshold approximately 1% under depolarising noise

- **Claim** (anchor): "designed to be implementable with nearest-neighbour interactions and to tolerate physical error rates around 1% — one to two orders of magnitude above what any other code family has achieved at comparable distance"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The ~1% threshold figure and the comparative "one to two orders of magnitude above any other code family" are empirical/simulation-based claims requiring external confirmation. The threshold value is well-established in the literature (Dennis et al. 2002, Fowler et al. 2012).

---

## §19.14 — Colour codes introduced by Bombin and Martin-Delgado in 2006

- **Claim** (anchor): "**Colour codes**, introduced by Bombin and Martin-Delgado in 2006"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Year 2006 and attribution to Bombin and Martin-Delgado should be confirmed against their original paper.

---

## §19.14 — 2D colour code threshold typically 0.1% to 0.5%

- **Claim** (anchor): "their threshold is typically lower in practical noise models (0.1% to 0.5%)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The 0.1%–0.5% threshold range for 2D colour codes under practical noise models is an empirical/simulation claim requiring external confirmation.

---

## §19.14 — 3D colour code admits transversal T gate

- **Claim** (anchor): "The 3D colour code goes one step further and admits a transversal $T$ gate, which would in principle make magic state distillation unnecessary"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The transversal $T$ gate property of 3D colour codes is an attributed result in the fault-tolerance literature; should be confirmed.

---

## §19.15 — Asymptotically good qLDPC codes: Panteleev–Kalachev 2022 and Leverrier–Zémor 2022

- **Claim** (anchor): "The breakthrough of recent years (Panteleev–Kalachev 2022, Leverrier–Zémor 2022, and several subsequent works) is the construction of **asymptotically good qLDPC codes**"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution and years for these two independent constructions of asymptotically good qLDPC codes should be confirmed. These are real, well-known results; arXiv identifiers should be verified before citing.

---

## §19.15 — IBM announced roadmap milestones targeting qLDPC implementation by late 2020s

- **Claim** (anchor): "IBM has announced roadmap milestones explicitly targeting qLDPC implementation by the late 2020s"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable/vendor claim about IBM's publicly stated roadmap; should be confirmed against IBM press releases or roadmap documentation current as of 2025–2026.

---

## §19.16 — Shor RSA-2048 requires ~10^10 logical gates

- **Claim** (anchor): "A Shor-factoring run on a 2048-bit RSA modulus needs around $10^{10}$ logical gates"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Resource estimate for Shor on RSA-2048; should be confirmed against published fault-tolerant resource estimate papers.

---

## §19.16 — Per-logical-operation error budget p_L ≲ 10^{−11} for RSA-2048

- **Claim** (anchor): "each of which must succeed with probability $\gtrsim 1 - 10^{-11}$ for the algorithm to terminate without a logical error. That implies a per-logical-operation error $p_L \lesssim 10^{-11}$"
- **Method**: derivation
- **Source**: → §19.16 (derived from T-gate count ~10^10 and requirement for one-in-a-million algorithm failure probability)
- **Verified**: — · **Verdict**: open
- **Comment**: The $p_L \lesssim 10^{-11}$ figure follows from the $10^{10}$ gate count by a union bound; the exact figure depends on the failure probability budget assumed.

---

## §19.16 — Surface-code distance d ≈ 21 to 27 for RSA-2048

- **Claim** (anchor): "puts the code distance in the low-to-mid 20s (the simple per-operation budget gives $d \approx 21$; full spacetime-volume accounting, since each logical operation spans on the order of $d$ syndrome-extraction rounds, tightens this toward $d \approx 27$)"
- **Method**: derivation
- **Source**: → §19.16 (derived from $p_L$ formula and $p/p_{\text{th}} = 0.1$)
- **Verified**: — · **Verdict**: open
- **Comment**: The specific distance estimates d ≈ 21 and d ≈ 27 are derivation-based but should be cross-checked against published resource estimates.

---

## §19.16 — Physical qubits per logical qubit ~1000–1500 for surface code at d≈21–27

- **Claim** (anchor): "roughly $1000$–$1500$ physical qubits per logical qubit on a surface code, plus a comparable factory overhead for magic states"
- **Method**: derivation
- **Source**: → §19.16 (follows from $2d^2$ formula with $d \approx 21$–$27$)
- **Verified**: — · **Verdict**: open
- **Comment**: The $2d^2$ data-qubit formula combined with $d \approx 21$–$27$ gives the quoted range; factory overhead is separately discussed in §19.21.

---

## §19.17 — Google 2024 distance-3/5/7 experiment on 105-qubit Willow processor

- **Claim** (anchor): "Google's 2024 distance-3, distance-5, and distance-7 experiments on a 105-qubit superconducting device showed $p_L$ dropping by a factor of $\sim 2.14$ per increase in $d$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific experimental result (105-qubit device, factor ~2.14 suppression per distance step, 2024) is an attributed experimental finding requiring confirmation against the published Google paper.

---

## §19.17 — Google result: first below-threshold demonstration with consistent scaling

- **Claim** (anchor): "the first below-threshold demonstration with consistent scaling"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Priority claim ("first") should be verified; other groups (Quantinuum, IBM) have published competing results around the same period.

---

## §19.18 — Physical overhead for surface code: ~1000 to 10000 physical qubits per logical qubit

- **Claim** (anchor): "the total overhead climbs to **roughly 1000 to 10000 physical qubits per logical qubit** for cryptographically useful workloads"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: This range synthesises multiple published resource estimates; the specific bounds should be confirmed against representative papers.

---

## §19.18 — Better decoders save 20%–30% in qubit count

- **Claim** (anchor): "better decoders** (neural, belief-propagation, parallel MWPM) extract more from the same code distance, sometimes saving 20%–30% in qubit count for the same $p_L$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The 20%–30% savings figure is an empirical claim from decoder-comparison studies; specific source needed.

---

## §19.18 — Google reaching p ≈ 10^{−3} on two-qubit gates, IBM similar in 2024–2025

- **Claim** (anchor): "Google reaching $p \approx 10^{-3}$ on two-qubit gates, IBM reaching similar in 2024–2025"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable hardware performance claims; should be confirmed against published benchmarking results from Google and IBM ca. 2024–2025.

---

## §19.18 — Bivariate-bicycle qLDPC codes (IBM 2024) achieve ~10× better encoding rate than surface code at distance 12

- **Claim** (anchor): "bivariate-bicycle qLDPC codes (IBM 2024) achieve $\sim 10\times$ better encoding rate than the surface code at distance 12"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific attributed result (IBM 2024, bivariate-bicycle codes, 10× encoding rate improvement at distance 12); should be confirmed against the IBM paper.

---

## §19.18 — RSA-2048 Shor factoring estimate: ~10^6 to 10^7 physical qubits, ~10^10 surface-code cycles, ~one day

- **Claim** (anchor): "a Shor-factoring run on a 2048-bit RSA key, fully fault-tolerant, costs an estimated $\sim 10^6$ to $10^7$ physical qubits, $\sim 10^{10}$ surface-code cycles, and around a day of wall-clock time on superconducting hardware at $p = 10^{-3}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific resource estimate that "has been stable across resource-estimate papers for nearly a decade"; should be confirmed against representative published estimates (e.g., Gidney & Ekerå or similar).

---

## §19.19 — Threshold theorem: polylog overhead, concatenated codes suppress error doubly-exponentially

- **Claim** (anchor): "one level of a distance-3 code reduces $p$ to $\sim C p^2$ for some constant $C$, two levels to $\sim C^3 p^4$, $\ell$ levels to $\sim p^{2^\ell} / C^{2^\ell - 1}$"
- **Method**: derivation
- **Source**: → §19.19 (threshold theorem argument in this section)
- **Verified**: — · **Verdict**: open
- **Comment**: The doubly-exponential suppression formula is a standard result of the threshold theorem for concatenated codes; derivation is outlined in the section.

---

## §19.19 — Surface-code threshold 1% assumes independent depolarising noise

- **Claim** (anchor): "The standard surface-code threshold of 1% assumes independent depolarising noise on every gate; under more realistic noise (correlated errors, leakage, crosstalk) the effective threshold drops, sometimes by $2\times$ or more"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The 1% threshold figure and the "sometimes by 2× or more" drop under realistic noise are empirical claims from simulation studies; sources needed.

---

## §19.19 — Sub-threshold operation crossed decisively in 2023–2024 experiments

- **Claim** (anchor): "achieving sub-threshold operation in practice has taken three decades of hardware progress and only crossed the line decisively in 2023–2024 experiments"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The historical framing ("three decades") and the specific timeline ("2023–2024") are empirical claims requiring confirmation.

---

## §19.20 — Eastin–Knill theorem

- **Claim** (anchor): "**Eastin–Knill theorem.** No quantum error-correcting code with a non-trivial code space admits a universal *transversal* gate set."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The Eastin–Knill theorem is an attributed named result; should be confirmed against the original Eastin & Knill paper (2009).

---

## §19.21 — 15-to-1 distillation introduced by Bravyi and Kitaev (2005)

- **Claim** (anchor): "The canonical scheme is **15-to-1 distillation**, introduced by Bravyi and Kitaev (2005)."
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution and year (Bravyi & Kitaev 2005) should be confirmed against the original paper.

---

## §19.21 — 15-to-1 distillation output error ~35p³ + O(p⁴)

- **Claim** (anchor): "The output is one $|T\rangle$ state with logical error $\sim 35 p^3 + O(p^4)$."
- **Method**: derivation
- **Source**: → §19.21 (stated as the result of the Steane-code error-detection post-selection in the protocol)
- **Verified**: — · **Verdict**: open
- **Comment**: The specific coefficient 35 and cubic scaling $p^3$ are from the Bravyi–Kitaev analysis; should be confirmed against the original paper.

---

## §19.21 — Single fault-tolerant T gate at d=17 costs ~5,000–20,000 physical-qubit-cycles

- **Claim** (anchor): "a single fault-tolerant $T$ gate on a surface code at distance 17 costs the equivalent of $5{,}000$ to $20{,}000$ physical-qubit-cycles in the magic state factory"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific quantitative resource cost for a fault-tolerant T gate at d=17; perishable number requiring confirmation against published magic-state factory resource estimates.

---

## §19.21 — T gate costs 50×–200× the cost of a logical Clifford gate

- **Claim** (anchor): "**50× to 200× the cost of a logical Clifford gate**"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The 50×–200× overhead ratio for T vs. Clifford gates is an empirical/design-specific claim; should be confirmed against resource-estimation literature.

---

## §19.21 — Magic state cultivation and T-state recycling protocols reduce overhead by 5–10×

- **Claim** (anchor): "Better protocols (**block codes** at higher input counts, **magic state cultivation** introduced 2024) reduce the overhead by factors of 5 to 10"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The "introduced 2024" date and the 5–10× factor are attributed empirical claims; should be confirmed against the relevant 2024 publications.

---

## §19.22 — Lattice surgery introduced by Horsman, Fowler, Devitt, and Van Meter in 2012

- **Claim** (anchor): "**lattice surgery**, introduced by Horsman, Fowler, Devitt, and Van Meter in 2012"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attribution and year (2012) should be confirmed against the original lattice surgery paper.

---

## §19.22 — Litinski 2019 "A Game of Surface Codes"

- **Claim** (anchor): "Surface-code architecture papers (Litinski 2019, \"A Game of Surface Codes\")"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Title and year should be confirmed against the published paper.

---

## §19.23 — Solovay–Kitaev / gridsynth compilation referenced at §8.11

- **Claim** (anchor): "Compile** the algorithm into Clifford+T using Solovay–Kitaev / gridsynth (§8.11)"
- **Method**: convention
- **Source**: → §8.11
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference to §8.11; verify that §8.11 covers both Solovay–Kitaev and gridsynth compilation.

---

## §19.23 — Google's Stim and PyMatching, IBM Qiskit FT toolbox, OpenSurgery, LSL stacks

- **Claim** (anchor): "Modern fault-tolerant compilers — Google's Stim and PyMatching, the IBM Qiskit FT toolbox, the academic OpenSurgery and LSL stacks"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable tool-naming claim; tool names, maintainers, and current status should be confirmed. "Stim" and "PyMatching" are well-known Google tools; "Qiskit FT toolbox", "OpenSurgery", and "LSL" need verification.

---

## §19.23 — Resource-estimation tools: Microsoft's "Resource Estimator", Quantinuum's "tket FT"

- **Claim** (anchor): "Resource-estimation tools (Microsoft's \"Resource Estimator\", Quantinuum's \"tket FT\")"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable vendor-tool claim; product names and vendor attribution should be confirmed against current vendor documentation.

---

## §19.23 — RSA-2048 end-to-end fault-tolerant estimate: 10^6–10^7 physical qubits, day to week

- **Claim** (anchor): "typical output for a Shor-factoring of RSA-2048 is in the range of **$10^6$ to $10^7$ physical qubits** and **a day to a week of wall-clock time** at $p = 10^{-3}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Consistent with §19.18's estimate; cross-check against published resource-estimate papers (e.g., Gidney & Ekerå 2021 or successor papers).

---

## §19.23 — Google's 2024 distance-7 experiment on 105-qubit Willow: logical qubit outlives physical T₁

- **Claim** (anchor): "Google's distance-7 surface-code experiment on the 105-qubit Willow processor (2024) showed an order-of-magnitude logical error suppression from $d = 3$ to $d = 7$, with a logical qubit lifetime exceeding the underlying physical $T_1$ by $\sim 2\times$ — the first demonstration that an encoded qubit can outlive its raw hardware"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific attributed experimental result (105-qubit Willow, 2024, ~2× lifetime improvement, order-of-magnitude error suppression, priority claim "first demonstration"). Should be confirmed against the Google Nature/Science paper.

---

## §19.23 — IBM, Quantinuum, and academic groups published comparable distance-scaling demonstrations

- **Claim** (anchor): "IBM, Quantinuum, and several academic groups have published comparable distance-scaling and logical-gate demonstrations on ion-trap and superconducting platforms"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Survey-level empirical claim; representative papers from IBM, Quantinuum, and academic groups should be identified and confirmed.
