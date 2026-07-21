# Factcheck — §16 Modern Algorithmic Frontier

Mirrors `book/part-06-algorithms/16-modern-algorithmic-frontier.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §16.1 — QSVT attributed to Gilyén–Su–Low–Wiebe (2019)

- **Claim** (anchor): "quantum singular value transformation (QSVT)"
- **Method**: external
- **Source**: Gilyén, Su, Low, Wiebe — "Quantum singular value transformation and beyond: exponential improvements for quantum matrix arithmetics", STOC 2019. TBD — needs verification of exact venue/year.
- **Verified**: — · **Verdict**: open
- **Comment**: Paper is well-known; year and author list should be confirmed against the actual publication.

## §16.1 — Hamiltonian simulation as one of the few proven exponential speedups

- **Claim** (anchor): "one of the few proven exponential speedups over classical computation outside the abelian hidden-subgroup family"
- **Method**: external
- **Source**: TBD — needs verification (this is a claim about the landscape of proven quantum speedups; see, e.g., survey by Childs et al. or Montanaro 2016)
- **Verified**: — · **Verdict**: open
- **Comment**: An empirical claim about the state of the field; "few" and the restriction to outside abelian HSP require confirmation against a reliable survey of proven separations.

## §16.1 — Taylor-series simulation attributed to Berry–Childs–Cleve–Kothari–Somma (2015)

- **Claim** (anchor): "Berry–Childs–Cleve–Kothari–Somma 2015) introduced LCU"
- **Method**: external
- **Source**: Berry, Childs, Cleve, Kothari, Somma — "Simulating Hamiltonian dynamics with a truncated Taylor series", PRL 2015. TBD — needs verification of exact title/year.
- **Verified**: — · **Verdict**: open
- **Comment**: This is the canonical LCU-for-simulation paper; author list and year need confirmation.

## §16.1 — Qubitization and QSVT reach optimal Hamiltonian simulation scaling

- **Claim** (anchor): "(Low–Chuang 2017) and **QSVT-based simulation** (Gilyén–Su–Low–Wiebe 2019) reach the **optimal scaling**"
- **Method**: external
- **Source**: Low, Chuang — "Optimal Hamiltonian simulation by quantum signal processing", PRL 2017 (TBD — needs verification); Gilyén et al. STOC 2019 (TBD — needs verification).
- **Verified**: — · **Verdict**: open
- **Comment**: The optimality claim requires confirmation against both cited papers and the matching lower bound.

## §16.1 — Lower bound attributed to Berry–Ahokas–Cleve–Sanders

- **Claim** (anchor): "a lower bound due to Berry–Ahokas–Cleve–Sanders"
- **Method**: external
- **Source**: TBD — needs verification (Berry, Ahokas, Cleve, Sanders — likely a QIP or PRL paper on Hamiltonian simulation lower bounds)
- **Verified**: — · **Verdict**: open
- **Comment**: Author list and year are not given in the text; this is an attributed lower-bound result that requires an external source.

## §16.1 — No-fast-forwarding argument for the $t\|H\|$ term

- **Claim** (anchor): "The "$t \\|H\\|$" term is unavoidable by a no-fast-forwarding argument"
- **Method**: external
- **Source**: TBD — needs verification (no-fast-forwarding theorem; attributed to multiple works in the Hamiltonian simulation literature)
- **Verified**: — · **Verdict**: open
- **Comment**: The no-fast-forwarding theorem is a known result but a specific citation is not given in the text.

## §16.2 — Trotter–Suzuki attributed to Lloyd (1996)

- **Claim** (anchor): "(Lloyd 1996, then refined for decades)"
- **Method**: external
- **Source**: Lloyd — "Universal quantum simulators", Science 1996. TBD — needs verification of exact title/year.
- **Verified**: — · **Verdict**: open

## §16.2 — Commutator scaling analysis attributed to Childs–Su–Tran–Wiebe–Zhu (2021)

- **Claim** (anchor): "commutator scaling** analysis (Childs–Su–Tran–Wiebe–Zhu 2021)"
- **Method**: external
- **Source**: Childs, Su, Tran, Wiebe, Zhu — TBD — needs verification of exact title/year/venue.
- **Verified**: — · **Verdict**: open
- **Comment**: The claim is that effective Trotter error scales as $\sum_{j<k}\|[H_j,H_k]\|$ rather than the naive sum-of-norms. Author list and year require confirmation.

## §16.3 — LCU framework attributed to Childs–Wiebe (2012) and Berry–Childs–Cleve–Kothari–Somma (2015)

- **Claim** (anchor): "introduced by Childs–Wiebe (2012) and developed by Berry–Childs–Cleve–Kothari–Somma (2015)"
- **Method**: external
- **Source**: Childs, Wiebe — TBD — needs verification of exact title/year; Berry et al. 2015 listed above.
- **Verified**: — · **Verdict**: open

## §16.3 — Taylor-series simulation gate count and $\epsilon$-scaling

- **Claim** (anchor): "overall gate counts of order $\alpha L t \cdot \log(1/\epsilon)/\log\log(1/\epsilon)$"
- **Method**: external
- **Source**: Berry–Childs–Cleve–Kothari–Somma (2015) — TBD — needs verification of the exact complexity expression.
- **Verified**: — · **Verdict**: open
- **Comment**: The text claims this is "the first algorithm to break the $\mathrm{poly}(1/\epsilon)$ barrier"; both that claim and the gate-count expression are attributed results requiring external confirmation.

## §16.5 — Qubitization attributed to Low and Chuang (2017)

- **Claim** (anchor): "**Qubitization**, due to Low and Chuang (2017)"
- **Method**: external
- **Source**: Low, Chuang — "Optimal Hamiltonian simulation by quantum signal processing", PRL 2017. TBD — needs verification.
- **Verified**: — · **Verdict**: open
- **Comment**: Same paper as §16.1 entry; attribution is repeated here with more detail about the spectral structure.

## §16.5 — Optimal query count for qubitization-based Hamiltonian simulation

- **Claim** (anchor): "requires precisely $\Theta(t + \log(1/\epsilon))$ queries to $U_H$. This matches the Berry–Ahokas–Cleve–Sanders lower bound."
- **Method**: external
- **Source**: TBD — needs verification (Low–Chuang 2017 for the upper bound; Berry–Ahokas–Cleve–Sanders for the lower bound)
- **Verified**: — · **Verdict**: open

## §16.5 — Qubitization claimed as most resource-efficient simulation algorithm known in 2026

- **Claim** (anchor): "anchors many of the most resource-efficient 2026 estimates for chemistry and materials Hamiltonians"
- **Method**: external
- **Source**: TBD — needs verification (perishable/empirical claim about state-of-the-art as of 2026; no single citation given)
- **Verified**: — · **Verdict**: open
- **Comment**: This is a perishable empirical claim about the current state of the art; requires confirmation against 2025–2026 resource-estimation literature.

## §16.6 — QSP attributed to Low–Yoder–Chuang (2016) and Low–Chuang (2017)

- **Claim** (anchor): "due to Low–Yoder–Chuang (2016) and Low–Chuang (2017)"
- **Method**: external
- **Source**: Low, Yoder, Chuang — "Methodology of resonant equiangular composite quantum gates", PRX 2016 (TBD — needs verification of exact title/venue). Low, Chuang 2017 listed above.
- **Verified**: — · **Verdict**: open

## §16.6 — Classical phase-finding algorithms: Haah (2019) and Chao–Ding–Gilyén–Huang–Szegedy (2020)

- **Claim** (anchor): "efficient algorithms (Haah 2019, Chao–Ding–Gilyén–Huang–Szegedy 2020)"
- **Method**: external
- **Source**: Haah — TBD — needs verification of exact title/year; Chao, Ding, Gilyén, Huang, Szegedy — TBD — needs verification.
- **Verified**: — · **Verdict**: open
- **Comment**: These are attributed results for efficient classical computation of QSP phase sequences.

## §16.6 — Matrix inversion query count via QSP: $\Theta(\kappa \log(\kappa/\epsilon))$ vs original HHL's $O(\kappa^2/\epsilon)$

- **Claim** (anchor): "approximation degree $\Theta(\kappa \log(\kappa/\epsilon))$ (post-selection and amplification multiply in condition- and overlap-dependent factors before the total query count settles), exponentially better in $\epsilon$ than the original HHL's $O(\kappa^2/\epsilon)$"
- **Method**: external
- **Source**: TBD — needs verification (Low–Chuang 2017 or Gilyén et al. 2019 for the improved bound; original HHL for the $O(\kappa^2/\epsilon)$ figure)
- **Verified**: — · **Verdict**: open
- **Comment**: Both the improved bound and the comparison figure for original HHL are attributed results.

## §16.7 — QSVT paper: Gilyén, Su, Low, Wiebe (2019)

- **Claim** (anchor): "introduced by Gilyén, Su, Low, and Wiebe in 2019"
- **Method**: external
- **Source**: Gilyén, Su, Low, Wiebe — STOC 2019. TBD — needs verification of exact venue/title.
- **Verified**: — · **Verdict**: open

## §16.7 — Classical phase-computation algorithms handling $d$ up to $10^5$

- **Claim** (anchor): "Dong–Meng–Whaley–Lin's symmetric-QSP) handle $d$ up to $10^5$ or more in double precision"
- **Method**: external
- **Source**: Dong, Meng, Whaley, Lin — TBD — needs verification of exact title/year; Haah and Chao et al. also referenced.
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical performance claim ($d$ up to $10^5$) for classical phase algorithms; requires confirmation against the cited papers.

## §16.8 — Quadratic speedup of quantum amplitude estimation over classical Monte Carlo

- **Claim** (anchor): "achieves error $O(\sigma/N)$ from $N$ Grover-style queries — a **quadratic speedup**"
- **Method**: external
- **Source**: TBD — needs verification (Brassard, Høyer, Mosca, Tapp — "Quantum amplitude amplification and estimation", 2002 is the standard reference)
- **Verified**: — · **Verdict**: open

## §16.8 — Option-pricing benchmark resource estimates (Stamatopoulos et al. 2020, Chakrabarti et al. 2021)

- **Claim** (anchor): "option-pricing benchmarks (Stamatopoulos et al. 2020, Chakrabarti et al. 2021) show end-to-end resource estimates in the $10^7$-Toffoli range"
- **Method**: external
- **Source**: Stamatopoulos et al. 2020 — TBD — needs verification of exact title/venue; Chakrabarti et al. 2021 — TBD — needs verification.
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable empirical claim; the specific Toffoli-count figure ($10^7$) and the comparison with classical Monte Carlo ($10^{10}$ samples) require confirmation against the cited papers.

## §16.8 — Linear ODE solver cost scales as $O(\kappa \log(1/\epsilon))$

- **Claim** (anchor): "The cost scales as $O(\kappa \log(1/\epsilon))$ in the condition number $\kappa$ of the discretized operator"
- **Method**: external
- **Source**: TBD — needs verification (attributed to HHL descendants / qubitization-based linear system solvers; likely Childs, Kothari, Somma or subsequent works)
- **Verified**: — · **Verdict**: open
- **Comment**: This cost figure is stated without a specific citation and contrasts with the original HHL $O(\kappa^2/\epsilon)$; requires confirmation against a specific linear-system-solver reference.

## §16.8 — Nonlinear ODE via Carleman linearization: Liu–Kolden–Krovi–Loureiro–Trivisa–Childs (2021)

- **Claim** (anchor): "Liu–Kolden–Krovi–Loureiro–Trivisa–Childs 2021"
- **Method**: external
- **Source**: Liu, Kolden, Krovi, Loureiro, Trivisa, Childs — TBD — needs verification of exact title/year/venue.
- **Verified**: — · **Verdict**: open
- **Comment**: The text also claims the algorithm is "provably efficient only for $R < 1$" (strongly dissipative dynamics); this condition is an attributed result from this paper that requires confirmation.

## §16.8 — Carleman efficiency condition: dissipativity parameter $R < 1$

- **Claim** (anchor): "the algorithm is provably efficient only for $R < 1$ — strongly dissipative dynamics"
- **Method**: external
- **Source**: Liu et al. 2021 (same paper as above) — TBD — needs verification.
- **Verified**: — · **Verdict**: open
- **Comment**: This is a specific technical claim (efficiency conditioned on $R < 1$) that should be checked against the Liu et al. paper.

## §16.8 — Ewin Tang's 2018 dequantization of the quantum recommendation-system algorithm

- **Claim** (anchor): "Ewin Tang's 2018 dequantization of the quantum recommendation-system algorithm"
- **Method**: external
- **Source**: Tang — "A quantum-inspired classical algorithm for recommendation systems", STOC 2019 (work circulated 2018). TBD — needs verification of exact venue/year.
- **Verified**: — · **Verdict**: open
- **Comment**: Well-known result; year (paper circulated 2018, published STOC 2019) and scope (polylog classical algorithm under same access assumptions) should be confirmed.

## §16.8 — Dequantization extended to PCA, supervised clustering, low-rank linear regression, kernel methods

- **Claim** (anchor): "dequantized PCA, supervised clustering, low-rank linear regression, and several kernel methods"
- **Method**: external
- **Source**: TBD — needs verification (follow-up works by Tang, Ding, Gilyén, and others in 2018–2020)
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical/historical claim about the scope of the dequantization wave; no specific citations are given in the text for each algorithm.

## §16.8 — T-count headline figure for RSA-2048

- **Claim** (anchor): ""$3 \times 10^9$ Toffolis for RSA-2048""
- **Method**: external
- **Source**: TBD — needs verification (likely Gidney–Ekerå 2021 or a subsequent resource-estimate paper; the specific figure $3\times10^9$ Toffolis must be traced to a source)
- **Verified**: — · **Verdict**: open
- **Comment**: Perishable empirical figure; the text presents it as an illustrative headline number but does not cite a source. Must be confirmed against a specific resource-estimate paper.

## §16.8 — Rule of thumb: order-of-magnitude reduction in $\alpha$ saves factor of 10 in T-count

- **Claim** (anchor): "an order-of-magnitude reduction in $\alpha$ (the subnormalization of the block encoding) saves a factor of $10$ in T-count"
- **Method**: derivation
- **Source**: → §16.7 (polynomial degree scales as $\alpha t + \log(1/\epsilon)$; rule follows directly from the linear dependence on $\alpha$)
- **Verified**: — · **Verdict**: open
- **Comment**: This is presented as a "rule of thumb" that follows from the QSVT degree formula; it is internally derivable but should be cross-checked against the formula stated in §16.7.

## References (external)

The same reference set as the chapter's final References section —
duplicated deliberately so both files are self-contained;
`tools/lint.py` enforces that the two lists carry identical
citation keys (the leading `**...**` token of each entry).

- **Tang, STOC 2019** — arXiv:1807.04271, and the Chia–Gilyén–Li–Lin–Tang–Wang 2020 framework paper for the dequantization family.
