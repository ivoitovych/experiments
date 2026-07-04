# External Verification Report — Uncertainty-Ledger Items

**Date:** 2026-07-04
**Scope:** All externally-verifiable open items from the comprehensive review of 2026-07-03
([review-2026-07-03-1843-comprehensive-book-review.md](review-2026-07-03-1843-comprehensive-book-review.md)),
i.e. its §10 uncertainty ledger and the fact-check items deferred by the 2026-07-04 remediation
pass — 44 claims in total, grouped into five domains.

**Method:** Five independent research passes, one per domain group. Each pass (1) located the
exact claim in the current manuscript (file and line), (2) verified it against primary external
sources — arXiv, journal records, NIST, vendor documentation, GitHub release feeds — and
(3) returned a verdict with cited URLs. Verdicts: **CONFIRMED** (claim accurate as written),
**PARTIALLY CORRECT** (core right, detail wrong or stale), **INCORRECT** (claim wrong; correction
given), **NOT PRESENT** (the flagged phrase no longer exists in the manuscript).

**Relationship to `factcheck/`:** This report deliberately lives in `reviews/`, *not* in the
`factcheck/` per-section mirror. The factcheck/ card system is still in early development
(v2 spec + pilot); unifying this report's findings into it is future work. Until then, this
file is the authoritative record for these 44 items.

**Verification environment caveat:** several primary hosts (arxiv.org abstract pages, aps.org,
riken.jp, some AWS/NIST pages) returned HTTP 403 through the session's egress proxy; where
noted inline, evidence rests on search-result snippets of those pages or on mirror copies
rather than full direct fetches. GitHub-hosted evidence (release feeds, source files) was
fetched directly.

**No manuscript changes were made in this pass.** Recommended corrections are listed per item;
applying them is a separate, explicit step.

---

## Summary

| # | Item | Location | Verdict | Fix needed? |
|---|------|----------|---------|-------------|
| 1A | Miller 1976 factoring→order-finding attribution | Ch 15 | CONFIRMED (post-remediation) | no |
| 1B | Szegedy walk hitting-vs-mixing speedup | Ch 15 | CONFIRMED | no |
| 1C | Θ(t + log(1/ε)/loglog(1/ε)) + LCU credit | Ch 16 | PARTIALLY | yes — line 139 formula; LCU credit clash |
| 1D | BACS-time / BCCKS-precision lower-bound split | Ch 16 | CONFIRMED | no |
| 1E | Jiuzhang 3.0 = 2023 | Ch 17 | CONFIRMED | no |
| 1F | Hefei/Wuxi 2024 classical RCS | Ch 17 | PARTIALLY | yes — actor/date misattribution |
| 1G | Forrelation Ω̃(√N) | Ch 17 | CONFIRMED | no |
| 2A | Quantum Motion 1024-dot chip | Ch 20 | CONFIRMED | optional precision |
| 2B | NV programs "Delft and TU Wien" | Ch 20 | PARTIALLY | yes — replace TU Wien |
| 2C | Silicon 1q gate times 10–100 ns | Ch 20 | PARTIALLY | yes — widen to ~100 ns–1 µs |
| 2D | "Rigetti's Lodgepole" | Ch 21 | INCORRECT | yes — confabulated name; use Quil-T |
| 2E | "Q-PERFECT" EC benchmark project | Ch 22 | INCORRECT | yes — no such project; use BACQ or delete |
| 2F | H2 quantum volume 2¹⁹ (2024) | Ch 22 | INCORRECT | yes — 2¹⁹ was H1-1/2023; H2 at 2²⁵ (2025); Helios launched |
| 2G | Neutral-atom 2q "approaching 99.5%" | Ch 18 | PARTIALLY | yes — 99.5% reached 2023, now ~99.7% |
| 3A | T-gadget one-CNOT count | Ch 19 | CONFIRMED (post-remediation) | no |
| 3B | Willow Λ≈2.14, 4–5× d3→d7 | Ch 19 | PARTIALLY | minor — "per increase in d" ambiguity (line 246) |
| 3C | Steane transversal S/S† dagger | Ch 19 | CONFIRMED (post-remediation) | no |
| 3D | Colour codes on 6.6.6/4.8.8 (no "medial graph") | Ch 19 | CONFIRMED (post-remediation) | no |
| 3E | DFE n-independence scoping | Ch 11 | CONFIRMED | no |
| 3F | Clifford Θ(n²/log n) gates, O(n) depth | Ch 11 | CONFIRMED | no |
| 3G | Bell-test cities (no "Stockholm") | Ch 3 | CONFIRMED (post-remediation) | no |
| 3H | SPDC pairs "thousands/s/mW" | Ch 3 | PARTIALLY | optional hedge |
| 4A | "pyLIQUi\|>" | Ch 23 | NOT PRESENT | no |
| 4B | TFQ "unmaintained since ~2023–24" | Ch 23 | INCORRECT (stale) | yes — releases resumed Dec 2025/Feb 2026 |
| 4C | Qiskit default optimization level | Ch 23 | CONFIRMED | no |
| 4D | Fugaku 48-qubit / 1 PiB / 130k nodes | Ch 24 | INCORRECT | yes — conflation; record is JUQCS-A (TaihuLight/K), Fugaku ~46q |
| 4E | "BlueQubit" as stabilizer simulator | Ch 24 | NOT PRESENT | no |
| 4F | Bravyi–Gosset α≈0.4 + demo scale | Ch 24 | PARTIALLY | yes — split 2016 vs 2019 attribution |
| 4G | Sunway 53-qubit / 304 s | Ch 24 | CONFIRMED (number) | minor — method/machine wording, line 192 |
| 4H | Gao–Kalinowski–Chou–Lukin–Barak–Choi XEB spoofing | Ch 24 | CONFIRMED | no |
| 4I | Alibaba simulator wind-down 2023 | Ch 24 | CONFIRMED | no |
| 4J | Braket roster | Ch 26 (+Ch 23) | PARTIALLY | yes — add AQT; fix stale OQC listing in Ch 23 |
| 5A | FIPS 206 IPD August 2025 | Ch 27 | CONFIRMED | optional phrasing |
| 5B | CNS 2^{2n/5} "polynomial memory" | Ch 27 | PARTIALLY | yes — classical memory is 2^{n/5} |
| 5C | ML-DSA-65 timing < 1 ms | Ch 27 | CONFIRMED | no |
| 5D | Reiher 2017 ~10¹⁴ T / ~100 logical qubits | Ch 28 | CONFIRMED | no |
| 5E | "Minimal entropic sampling" | Ch 28 | NOT PRESENT | no |
| 5F | Advantage2 ~7,000 qubits / ~180-var clique | Ch 29 | INCORRECT | yes — 180 is Pegasus/Advantage; Advantage2 = 4,400+ qubits |
| 5G | AAKS Hamiltonian-learning access model | Ch 30 | PARTIALLY | yes — AAKS is Gibbs-state; dynamics is HTFS/HKT |
| 5H | "QNE-sim" | Ch 33 | INCORRECT | yes — no such simulator; use SimulaQron/QNE platform |
| 5I | "BTI Long Island" | Ch 33 | INCORRECT | yes — Brookhaven–Stony Brook testbed |
| 5J | QIP has no proceedings | Ch 37 | CONFIRMED | no |
| 5K | Bravyi–Gosset citation (App. D) | App D | CONFIRMED | no |
| 5L | Panteleev–Kalachev citation (App. D) | App D | CONFIRMED | no |

**Tally (44 items):** 22 CONFIRMED · 11 PARTIALLY CORRECT · 8 INCORRECT · 3 NOT PRESENT.
Items needing manuscript edits: **14** (8 INCORRECT + 6 of the PARTIALLY items with substantive
recommendations); a further ~5 have optional tightenings. Five of the review's suspicions
("two CNOTs", "order-of-magnitude", "medial graph", "Stockholm", "(Miller, Rabin)") were
confirmed as real errors that the 2026-07-04 remediation pass had already fixed — external
verification now confirms each of those fixes is accurate. Three suspected phrases
("pyLIQUi|>", "BlueQubit"-as-stabilizer, "minimal entropic sampling") do not exist in the
current manuscript. The review's confabulated-name suspicions were all vindicated:
"Lodgepole", "Q-PERFECT", "QNE-sim", and "BTI" are confirmed non-existent names.

---
## Group 1 — Algorithms and complexity (Ch. 15, 16, 17)

### 1A. Miller vs. Miller–Rabin attribution for the factoring→order-finding reduction

**Book claim** (`book/part-06-algorithms/15-landmark-quantum-algorithms.md:51`): "The classical reduction (Miller 1976): pick a random $a$ coprime to $N$; find the multiplicative order $r$ ..."
Note: the flagged text "(Miller, Rabin)" no longer exists — it was corrected to "(Miller 1976)" in remediation batch 2 (post-rewrite hash 902b779). The pre-fix text read "The classical reduction (Miller, Rabin): ...".

**Verdict**: CONFIRMED (as currently written). The old "(Miller, Rabin)" was indeed incorrect — a conflation with the Miller–Rabin primality test. The reduction is due to Gary L. Miller alone: "Riemann's hypothesis and tests for primality," J. Comput. Syst. Sci. 13(3), 300–317 (1976). Shor's own paper cites exactly this. Rabin's contribution (1980) was the randomized primality test, not the factoring reduction.

**Evidence**:
- https://link.springer.com/article/10.1007/s11128-021-03069-1 (Ekerå, QIP 2021) — the reduction from factoring to order finding is "essentially due to Miller," citing G.L. Miller, JCSS 13(3), 300–317 (1976).
- Shor, quant-ph/9508027 — "using randomization, factorization can be reduced to finding the order of an element [Miller 1976]."

**Recommended action**: None — already fixed correctly.

### 1B. Szegedy quantum-walk speedup claim

**Book claim** (`book/part-06-algorithms/15-landmark-quantum-algorithms.md:102`): "Quantum walk applied to a Markov chain achieves a quadratic speedup in the spectral-gap dependence of hitting/search problems (an analogous speedup for *mixing* is established only case-by-case and remains open in general)".

**Verdict**: CONFIRMED. Szegedy (FOCS 2004) proved a generic quadratic speedup of hitting/detection time for quantized ergodic Markov chains with symmetric (later extended to reversible) transition matrices — 1/√δ vs 1/δ spectral-gap dependence. A general quadratic speedup for *mixing* is Richter's conjecture and remains open, with only case-by-case results — exactly the hedge the book makes.

**Evidence**:
- https://dl.acm.org/doi/10.1109/FOCS.2004.53 — Szegedy, "Quantum Speed-Up of Markov Chain Based Algorithms," FOCS 2004.
- https://www.researchgate.net/publication/343868853_Analog_quantum_algorithms_for_the_mixing_of_Markov_chains — Richter's conjectured Õ(1/√Δ) quantum mixing speedup remains unproven in general.

**Recommended action**: None.

### 1C. Θ(t + log(1/ε)/loglog(1/ε)) Hamiltonian simulation and BCCKS/BACS attribution

**Book claim** (`book/part-06-algorithms/16-modern-algorithmic-frontier.md:21-27`): "**Taylor-series simulation** (Berry–Childs–Cleve–Kothari–Somma 2015) introduced LCU and achieved poly log(1/ε) error scaling. **Qubitization** (Low–Chuang 2017) and **QSVT-based simulation** ... reach the **optimal scaling** $T(t,\epsilon) = \Theta(t\|H\| + \log(1/\epsilon)/\log\log(1/\epsilon))$, matching the known lower bounds: the '$t\|H\|$' term is unavoidable by the no-fast-forwarding argument of Berry–Ahokas–Cleve–Sanders, and the additive log(1/ε)/loglog(1/ε) precision term is tight by Berry–Childs–Cleve–Kothari–Somma." Also line 137 (same split) and line 139: "the optimal $\Theta(t + \log(1/\epsilon))$ scaling".

**Verdict**: PARTIALLY CORRECT. The headline complexity and the BACS-time / BCCKS-precision split are right: BACS (Commun. Math. Phys. 2007, quant-ph/0508139) proved the no-fast-forwarding Ω(t) lower bound; BCCKS proved the Ω(log(1/ε)/loglog(1/ε)) precision lower bound — but in the BCCKS **STOC 2014** paper "Exponential improvement in precision for simulating sparse Hamiltonians" (arXiv:1312.1414), not the 2015 Taylor-series PRL. Two defects: (1) line 139's "Θ(t + log(1/ε))" drops the /loglog(1/ε) divisor and contradicts lines 24 and 137; (2) line 21 says BCCKS 2015 "introduced LCU," contradicting the book's own (correct) line 63 crediting Childs–Wiebe 2012. Minor nit: the first algorithm to hit the optimal bound was Low–Chuang QSP (PRL 118, 010501, 2017); the qubitization paper hit arXiv 2016, *Quantum* 2019, so "Qubitization (Low–Chuang 2017)" is loose but defensible.

**Evidence**:
- https://arxiv.org/abs/1312.1414 (BCCKS, STOC 2014) — O(τ log(τ/ε)/loglog(τ/ε)) queries; first error-dependent lower bounds, optimal in ε.
- BACS 2007 (quant-ph/0508139) — no-fast-forwarding theorem, Ω(t).
- https://dspace.mit.edu/handle/1721.1/110229 (Low–Chuang, PRL 118, 010501 (2017)) — O(td‖H‖max + log(1/ε)/loglog(1/ε)), "matches lower bounds in all parameters."
- https://quantum-journal.org/papers/q-2019-07-12-163/ — qubitization's journal venue/date.

**Recommended action**: Fix line 139 to "the optimal $\Theta(t + \log(1/\epsilon)/\log\log(1/\epsilon))$ scaling". Reword line 21 so the LCU credit does not clash with line 63 (e.g., "building on the LCU technique of Childs–Wiebe (2012), Taylor-series simulation (BCCKS 2015)..."). Optionally note the precision lower bound is from BCCKS's STOC 2014 paper.

### 1D. BCCKS-vs-BACS lower-bound split

**Book claim** (`16-modern-algorithmic-frontier.md:27` and `:137`): "...requires precisely Θ(t + log(1/ε)/loglog(1/ε)) queries to $U_H$. This matches the combined Berry–Ahokas–Cleve–Sanders (time) and Berry–Childs–Cleve–Kothari–Somma (precision) lower bounds."

**Verdict**: CONFIRMED. BACS 2007 → Ω(t) no-fast-forwarding; BCCKS (STOC 2014) → Ω(log(1/ε)/loglog(1/ε)) precision lower bound; Low–Chuang explicitly describe their scaling as matching these lower bounds.

**Evidence**: same sources as 1C.

**Recommended action**: None (beyond the line-139 typo noted under 1C).

### 1E. Jiuzhang 3.0 date/venue

**Book claim** (`book/part-07-complexity/17-complexity-theory.md:211`): "The 2020 Chinese **Jiuzhang** Gaussian-BosonSampling experiment and the 2023 **Jiuzhang 3.0** refinements remain the strongest unrebutted advantage demonstrations..."

**Verdict**: CONFIRMED. Jiuzhang 3.0 (Deng et al., up to 255 photon-clicks) was posted to arXiv April 2023 (2304.12240) and published in Phys. Rev. Lett. 131, 150601 on October 10, 2023. "2023" is right.

**Evidence**:
- https://link.aps.org/doi/10.1103/PhysRevLett.131.150601 — journal record, Oct 10, 2023.
- https://arxiv.org/abs/2304.12240 — preprint, April 2023.
- https://quantum.ustc.edu.cn/web/en/node/1121 — USTC raw-data page for Jiuzhang 3.0.

**Recommended action**: None.

### 1F. Hefei/Wuxi 2024 classical RCS simulation claims

**Book claim** (`book/part-07-complexity/17-complexity-theory.md:209`): "...By 2024 the Chinese supercomputing centres in Hefei and Wuxi had publicly demonstrated classical RCS simulations at parameter sets equalling or surpassing the original 2019 quantum claim, often using GPU-tensor-network methods that did not exist when the supremacy claim was made."

**Verdict**: PARTIALLY CORRECT. The substance is right — by 2024 Chinese teams had classically equalled/surpassed the 2019 Sycamore claim, and a USTC-led effort culminated in 2024 ("Leapfrogging Sycamore," Natl. Sci. Rev. 12(3):nwae317, Sept 2024; arXiv:2406.18889 — 1,432 A100 GPUs, uncorrelated samples with *higher* XEB than Sycamore, 7× faster). But "the Chinese supercomputing centres in Hefei and Wuxi ... by 2024" misattributes the actors: (1) the Wuxi result (National Supercomputing Center in Wuxi, new Sunway machine, Liu et al., 2021 ACM Gordon Bell Prize, 304 s for the Sycamore task) dates to **2021** and ran on Sunway many-core CPUs, **not GPUs**; (2) the 2024 GPU result was by USTC (Hefei National Research Center) researchers with Shanghai AI Laboratory and ITP-CAS Beijing on a GPU cluster — not "the Hefei supercomputing centre." No 2024 RCS-simulation result from a Hefei supercomputing *centre* found. (Zuchongzhi 3.0 is a quantum-side result, not what this sentence describes.)

**Evidence**:
- https://academic.oup.com/nsr/article/12/3/nwae317/7756427 — "Leapfrogging Sycamore," 1,432 GPUs, higher-XEB samples, 7× faster; affiliations USTC Hefei, Shanghai AI Lab, ITP-CAS.
- https://arxiv.org/html/2406.18889v1 — preprint of the same.
- https://arxiv.org/pdf/2110.14502 — "Closing the 'Quantum Supremacy' Gap" (SC21), Sunway/Wuxi, Sycamore sampling in 304 s, 2021.
- https://www.hpcwire.com/2021/11/18/2021-gordon-bell-prize-goes-to-exascale-powered-quantum-supremacy-challenge/ — 2021 Gordon Bell Prize; Zhejiang Lab, Tsinghua, NSC-Wuxi, Shanghai; Sunway hardware.

**Recommended action**: Reword, e.g.: "By 2024, Chinese teams had publicly demonstrated classical RCS simulations equalling or surpassing the original 2019 quantum claim — first on the Sunway supercomputer at Wuxi (2021 Gordon Bell Prize, 304 seconds), then a USTC-led team using 1,432 GPUs (2024) that produced higher-fidelity samples 7× faster than Sycamore, with GPU-tensor-network methods that did not exist when the supremacy claim was made." Drop "supercomputing centres in Hefei and Wuxi."

### 1G. Forrelation Ω̃(√N) classical lower bound

**Book claim** (`book/part-07-complexity/17-complexity-theory.md:148`): "**Forrelation** (Aaronson 2010, refined by Aaronson–Ambainis): $1$ quantum query vs $\tilde\Omega(\sqrt{N})$ classical (the original 2010 lower bound was $\Omega(N^{1/4})$; the refinement is tight), with the optimal separation underlying the Raz–Tal oracle."

**Verdict**: CONFIRMED. Aaronson–Ambainis (STOC 2015, arXiv:1411.5729) prove Ω(√N/log N) = Ω̃(√N) randomized queries, improving Aaronson's earlier ~Ω(N^{1/4}) bound (from the 2009/STOC-2010 "BQP and the Polynomial Hierarchy" paper — "Aaronson 2010" is fair). Tightness holds (t-query quantum → O(N^{1−1/2t}) classical, i.e. O(√N) for t=1). Forrelation underlies the Raz–Tal BQP-vs-PH oracle.

**Evidence**:
- https://arxiv.org/abs/1411.5729 — Aaronson–Ambainis: 1 quantum query vs ~√N/log N randomized; optimal.
- https://www.scottaaronson.com/papers/for.pdf — STOC version.
- https://arxiv.org/abs/2008.07003 — Bansal–Sinha k-Forrelation (STOC 2021), confirms framing.

**Recommended action**: None.
## Group 2 — Hardware platforms (Ch. 18, 20, 21, 22)

### 2A. Quantum Motion 1024-dot chip

**Book claim** — `book/part-09-hardware-and-software/20-quantum-hardware-platforms.md:73`: "Reported scales remain small in 2026: Intel's "Tunnel Falls" 12-qubit chip, Diraq's small-scale demonstrations, **Quantum Motion's 1024-dot quantum-classical chip**, and university groups operating 4–16 qubits."

**Verdict**: CONFIRMED (minor nuance)

**Evidence**:
- https://quantummotion.com/partnership-with-globalfoundries/ — Quantum Motion (with GlobalFoundries) announced a chip ("Bloomsbury") with an integrated array of 1024 silicon quantum dots in a 32×32 array on <0.1 mm², fabricated on GF's 300 mm 22FDX CMOS platform, with on-chip analogue bus and digital address lines; announced Jan 6, 2025, peer-reviewed in Nature Electronics.
- https://arxiv.org/pdf/2310.20434 — "Rapid cryogenic characterisation of 1024 integrated silicon quantum dots" (preprint Oct 2023); all 1024 dots characterized cryogenically in ~5–12 minutes.
- https://www.eenewseurope.com/en/quantum-motion-taps-globalfoundries-for-1024-quantum-dot-chip/ — independent trade-press confirmation of the 1024-quantum-dot figure.

**Recommended action**: None required — number and "quantum-classical" (dots + integrated cryo-CMOS addressing/readout) characterization are accurate. Optional precision: these are 1024 *characterized quantum-dot devices*, not operating qubits; e.g. "Quantum Motion's 1024-dot CMOS-integrated characterization chip (Bloomsbury, with GlobalFoundries)".

### 2B. NV-center attribution to "TU Wien"

**Book claim** — `book/part-09-hardware-and-software/20-quantum-hardware-platforms.md:79`: "A handful of small NV-based quantum computers have been built (notably the **Delft and TU Wien** programs)..."

**Verdict**: PARTIALLY CORRECT — Delft is right; "TU Wien" is very likely a conflation.

**Evidence**:
- https://link.aps.org/doi/10.1103/PhysRevX.9.031045 — Bradley et al., PRX 2019 (Taminiau group, QuTech / TU Delft): 10-qubit NV spin register (electron + N + 8 ¹³C spins), fully connected, memory up to ~75 s. Delft (QuTech) is the flagship NV multi-qubit-register/network program.
- https://www.tuwien.at/en/tu-wien/news/news-articles/news/the-diamonds-quantum-memory-1 — TU Wien's NV work (Majer group) is NV-*ensemble* microwave quantum-memory / hybrid cavity coupling — a quantum memory element, not a small NV-based quantum computer.
- Searches for NV multi-qubit registers consistently point to Delft, Stuttgart (Wrachtrup group), and Quantum Brilliance; none identify a TU Wien NV processor program.

**Recommended action**: Replace "TU Wien" — e.g. "(notably the Delft (QuTech) and Stuttgart programs, and Quantum Brilliance's room-temperature devices)". If the intent was Vienna's hybrid NV-memory work, it does not belong in a list of "small NV-based quantum computers".

### 2C. Silicon spin-qubit single-qubit gate times

**Book claim** — `book/part-09-hardware-and-software/20-quantum-hardware-platforms.md:71`: "Gate times are around **10–100 ns for single-qubit rotations** and 10–100 ns for the exchange-coupling-mediated two-qubit gates..."

**Verdict**: PARTIALLY CORRECT — 10–100 ns describes only the fastest demonstrations; typical Si/SiGe single-qubit gates are ~100 ns to ~1 µs.

**Evidence**:
- https://arxiv.org/pdf/2112.08863 — "Semiconductor Spin Qubits" (Rev. Mod. Phys. 2023 review): EDSR Rabi rates ~1 MHz in natural silicon with micromagnets (π time ~500 ns), up to tens of MHz only in optimized isotopically purified devices (π ~ tens of ns, best case).
- https://www.nature.com/articles/s41586-025-09531-9 — "Industry-compatible silicon spin-qubit unit cells exceeding 99% fidelity" (Nature 2025): Rabi frequency 658.6 kHz, i.e. π rotation ≈ 760 ns — sub-µs but well above 100 ns on an industrially fabricated device.
- https://www.science.org/doi/10.1126/sciadv.abn5130 and related Si/SiGe work report π/2 gate times ~70 ns in fast micromagnet devices — the lower edge, not the norm.

**Recommended action**: Change to "roughly 100 ns–1 µs for single-qubit rotations (tens of ns in the fastest EDSR devices) and 10–100 ns for exchange-mediated two-qubit gates". The two-qubit part of the sentence is fine.

### 2D. "Rigetti's Lodgepole"

**Book claim** — `book/part-09-hardware-and-software/21-quantum-control-and-electronics.md:45`: "**Quantum Machines OPX**, **Zurich Instruments SHFQC**, and several in-house systems (IBM's Qiskit Runtime stack, Google's in-house pulse system, **Rigetti's Lodgepole**) expose a programming model..."

**Verdict**: INCORRECT — no Rigetti product, chip, or control system named "Lodgepole" exists; almost certainly confabulated (a pine-species name pattern-matched to "Aspen").

**Evidence**:
- https://www.rigetti.com/what-we-build and https://qcs.rigetti.com/qpus — Rigetti's trademark/product names: Ankaa, Aspen, Cepheus, Forest, Lyra, Novera, pyQuil, QCS, QVM, Quil, Quil-T, Quilc. No "Lodgepole".
- https://medium.com/rigetti/gain-deeper-control-of-rigetti-quantum-processors-with-quil-t-ea8943061e5b — Rigetti's actual pulse-level/real-time control programming layer is **Quil-T** within the QCS stack.
- Dedicated web search for Rigetti "Lodgepole" returns no vendor, press, or academic reference.

**Recommended action**: Replace "Rigetti's Lodgepole" with "Rigetti's Quil-T pulse-level control in the QCS stack".

### 2E. "Q-PERFECT" benchmarking project

**Book claim** — `book/part-09-hardware-and-software/22-hardware-engineering-metrics.md:213`: "**Q-PERFECT** is a European Commission-funded benchmark project producing protocols specifically designed to compare quantum hardware platforms across architectures, including emerging neutral-atom and photonic devices."

**Verdict**: INCORRECT — no EC-funded project named "Q-PERFECT" found; the only similarly named entity is **QPerfect**, a private French company, which does not match the book's description.

**Evidence**:
- https://www.qperfect.io/ and https://thequantuminsider.com/2024/07/25/qperfect-introduces-mimiq-1-0-a-virtual-quantum-computer/ — QPerfect is a 2023 Strasbourg (CESQ) spin-off selling the MIMIQ quantum emulator/digital-twin products; a company, not an EC benchmark project.
- https://thequantuminsider.com/2026/07/01/btq-qperfect-acquisition-approved/ — QPerfect was acquired by BTQ Technologies (approved July 2026), further confirming it is a commercial firm.
- Searches of CORDIS/Horizon Europe and quantum-benchmark inventories (e.g. https://quantumbenchmarkzoo.org/, https://arxiv.org/pdf/2403.12205 for BACQ) surface no EU project called "Q-PERFECT"; real European application-oriented benchmarking efforts go by names like BACQ.

**Recommended action**: Delete the entry, or replace with a real initiative, e.g. "**BACQ** — a French/European application-oriented benchmarking initiative (Thales, CEA, Quandela et al.) defining application-level performance references" (arXiv:2403.12205). Do not describe QPerfect (the company) as an EC-funded project.

### 2F. Quantinuum H2 quantum volume

**Book claim** — `book/part-09-hardware-and-software/22-hardware-engineering-metrics.md:219`: "...and $2^{19} = 524\,288$ on Quantinuum H2 in 2024." And line 225: "**Quantinuum H2** — 56 trapped-ion qubits ... QV $\geq 2^{19}$ (still climbing) ... The announced next generation (Helios) targets ~100 qubits with similar fidelity."

**Verdict**: INCORRECT (misattributed and stale). QV 2^19 was achieved on **H1-1 in June 2023**, not H2 in 2024. H2's 56-qubit launch (June 2024) already reported QV > 2^21 (~2.1M); H2 reached 2^23 (8,388,608) in May 2025 and **2^25 (33,554,432) in September 2025** — the latest reported H2 QV as of mid-2026. The Helios line is also stale: Helios commercially launched November 5, 2025 (98 physical qubits).

**Evidence**:
- https://quantumcomputingreport.com/quantinuum-hits-a-quantum-volume-of-524288-on-their-h1-1-processor/ — QV 524,288 (2^19) was on H1-1, June/July 2023.
- https://www.quantinuum.com/press-releases/quantinuum-launches-industry-first-trapped-ion-56-qubit-quantum-computer-that-challenges-the-worlds-best-supercomputers — June 5, 2024 H2 upgrade to 56 qubits with record QV over 2,000,000 (2^21).
- https://thequantuminsider.com/2025/05/13/quantinuum-smashes-through-quantum-volume-milestone-capping-five-year-benchmark-goal/ — H2 QV 2^23 = 8,388,608, May 2025 (five-year 10×/year goal met).
- https://quantumcomputingreport.com/quantinuum-achieves-quantum-volume-of-2%C2%B2%E2%81%B5-on-system-model-h2/ — H2 QV 2^25 = 33,554,432, September 2025.
- https://www.quantinuum.com/press-releases/quantinuum-announces-commercial-launch-of-new-helios-quantum-computer-that-offers-unprecedented-accuracy-to-enable-generative-quantum-ai-genqai — Helios launched commercially Nov 5, 2025: 98 physical qubits, 99.921% 2q fidelity, 48 logical qubits.

**Recommended action**: Line 219: change to "...$2^{19}$ on H1-1 in 2023, $2^{21}$ at the H2 56-qubit launch in 2024, and $2^{25} = 33\,554\,432$ on H2 in 2025." Line 225: change "QV $\geq 2^{19}$ (still climbing)" to "QV $= 2^{25}$ (as of late 2025, still climbing)" and change the Helios clause to "Its successor Helios launched in November 2025 with 98 qubits and higher fidelity."

### 2G. Neutral-atom two-qubit fidelity / Evered et al. 2023

**Book claim** — `book/part-08-noise-and-qec/18-noise-decoherence-and-errors.md:86`: "Two-qubit entangling gates ... $99.5\%$ on most current devices, and **approaching $99.5\%$ on neutral atoms (Evered et al. 2023 and successors)**."

**Verdict**: PARTIALLY CORRECT — the citation is right (Evered et al. 2023 did report 99.5% CZ), but "approaching 99.5%" understates it: 99.5% was *reached* in 2023 and successors have pushed to ~99.7%+, so the phrasing is mildly stale.

**Evidence**:
- https://arxiv.org/abs/2304.05420 / https://www.nature.com/articles/s41586-023-06481-y — Evered et al., Nature 622 (Oct 2023), Harvard/Lukin group: two-qubit CZ entangling gates with 99.5% fidelity on up to 60 atoms in parallel, surpassing the surface-code threshold.
- https://www.quera.com/press-releases/harvard-university-mit-and-quera-demonstrate-historic-99-5-two-qubit-gate-fidelity-on-60-neutral-atom-qubits — Harvard/MIT/QuEra press release confirming the 99.5% figure.
- https://arxiv.org/pdf/2408.08288 — 2024 universal individually addressed neutral-atom system reporting 99.35(4)% CZ and citing a state-of-the-art neutral-atom CZ fidelity of 99.73(3)%; 2025 surveys describe demonstrations approaching/exceeding 99.7%.

**Recommended action**: Rephrase to "…and $99.5\%$–$99.7\%$ on neutral atoms ($99.5\%$ demonstrated by Evered et al. 2023; successors have since exceeded it)". Keeping "approaching 99.5%" misstates a milestone that was met in 2023.
## Group 3 — QEC, measurement, foundations (Ch. 3, 11, 19)

**Provenance note from this verification pass:** several of these items were flagged against the *pre-remediation* manuscript; the 2026-07-04 remediation commits (batch 1 = c7d0fee for Ch. 3, batch 2 = 902b779 for Ch. 11/19 — post-rewrite hashes) already replaced the flagged wordings ("two CNOTs", "order-of-magnitude", "medial graph", "Stockholm"). External verification below confirms every one of those remediation fixes is accurate; only two minor tightenings remain.

### 3A. T-gate teleportation CNOT count

**Book claim** (current, `book/part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md:290`): "With one copy of $|T\rangle$, one CNOT, a measurement, and a conditionally applied $S$ correction, one can apply a $T$ gate to an arbitrary input qubit — the **gate teleportation** of Nielsen and Chuang, lifted to the encoded setting."
Pre-remediation text said: "two CNOTs, an $S$ gate, and a measurement-conditioned correction".

**Verdict**: CONFIRMED (current text). The original "two CNOTs" was INCORRECT; the standard magic-state-injection/T-gadget uses exactly one CNOT between the $|T\rangle$ ancilla and the data, one Pauli-Z measurement, and a classically conditioned S correction.

**Evidence**:
- https://pennylane.ai/glossary/what-are-magic-states — injection gadget: state $U|+\rangle$, a single CNOT with the input, Z measurement, conditional correction $UXU^\dagger$ (= S up to phase for $U=T$).
- https://postquantum.com/post-quantum/magic-state/ — magic-state injection as teleportation: one CNOT (Clifford), Pauli measurement, classically conditioned S gate; protocol per Bravyi–Kitaev 2005.
- Direct reasoning: for $U=T$, the correction $TXT^\dagger \propto SX$ is Clifford, so one CNOT + measurement + conditional S suffices; a second CNOT appears nowhere in the standard gadget.

**Recommended action**: none — already corrected.

### 3B. Google Willow error suppression d=3 → d=7

**Book claim** (current, `19-quantum-error-correction-and-fault-tolerance.md:326`): "Google's distance-7 surface-code experiment on the 105-qubit Willow processor (2024) showed logical error suppressed by a factor $\Lambda \approx 2.14$ per distance step — roughly $4$–$5\times$ from $d = 3$ to $d = 7$, with a logical qubit lifetime exceeding the underlying physical $T_1$ by $\sim 2\times$". Also line 246: "showed $p_L$ dropping by a factor of $\sim 2.14$ per increase in $d$".
Pre-remediation text said "an order-of-magnitude logical error suppression from $d=3$ to $d=7$" — INCORRECT, already fixed.

**Verdict**: CONFIRMED (line 326); PARTIALLY CORRECT (line 246 — ambiguous phrasing). The paper reports Λ = 2.14 ± 0.02 per increase of distance **by 2** (d=3→5→7), so total d=3→d=7 suppression is Λ² ≈ 4.6× (matching "4–5×"). Line 246's "per increase in $d$" can be misread as per unit increase in d (would wrongly imply ~21× over d=3→7). Nuance on line 326: the paper says lifetime exceeds the **best physical qubit** by 2.4 ± 0.3×, not "underlying physical $T_1$ by ~2×" — close but slightly loose.

**Evidence**:
- https://arxiv.org/abs/2408.13687 / https://www.nature.com/articles/s41586-024-08449-y ("Quantum error correction below the surface code threshold", Nature 638, 920 (2025)) — "the logical error rate is suppressed by a factor of Λ = 2.14 ± 0.02 when increasing the code distance by 2"; 101-qubit distance-7 code at 0.143% ± 0.003% error per cycle; "exceeding the lifetime of its best physical qubit by a factor of 2.4 ± 0.3".

**Recommended action**: at line 246, change "per increase in $d$" to "for each increase of $d$ by 2 (i.e., $d=3\to5\to7$)". Optionally at line 326, change "the underlying physical $T_1$ by $\sim 2\times$" to "its best physical qubit's lifetime by $2.4\times$".

### 3C. Steane code transversal S and the dagger

**Book claim** (current, `19-quantum-error-correction-and-fault-tolerance.md:274`): "$\bar S$ is the transversal application of $S$ (or $S^\dagger$, depending on sign convention) up to Pauli corrections". Pre-remediation said "$\bar S = S^{\otimes 7}$ up to a Pauli correction" (no dagger) — already fixed.

**Verdict**: CONFIRMED (current text). For the [[7,1,3]] Steane code, $S^{\otimes 7}$ implements logical $S^\dagger$; the dagger caveat is required and the book now states it. Verified by direct calculation: Hamming-[7,4] codewords have weights 0, 3, 4, 7; $S^{\otimes 7}$ applies phase $i^{\mathrm{wt}}$, so $|\bar 0\rangle$ (weights 0, 4) is fixed and $|\bar 1\rangle$ (weights 3, 7) acquires $-i$, giving exactly logical $\mathrm{diag}(1,-i)=S^\dagger$ — in fact no Pauli correction is even needed.

**Evidence**:
- https://arthurpesah.me/blog/2023-12-25-transversal-gates/ — the Steane code's transversal logical phase gate is $\overline{S} = \prod_{j} S_j^{\dagger}$.
- Direct weight-enumerator calculation above (standard result, cf. Gottesman's thesis convention).

**Recommended action**: none required; optionally drop "up to Pauli corrections" since $S^{\otimes 7} = \bar S^\dagger$ exactly.

### 3D. Colour codes and "medial graph"

**Book claim** (current, `19-quantum-error-correction-and-fault-tolerance.md:212`): "**Colour codes**, introduced by Bombin and Martin-Delgado in 2006, are a topological CSS code family defined on a 3-colourable lattice (typically the honeycomb — 6.6.6 — lattice, or the 4.8.8 square-octagon lattice)." Pre-remediation said "the honeycomb lattice's medial graph" — already removed.

**Verdict**: CONFIRMED (current text); the original wording was INCORRECT. "Medial graph" is a real construction, but the medial graph of the honeycomb lattice is the **kagome** lattice — 4-valent and not where colour codes live. Colour codes are defined directly on trivalent lattices with 3-colourable faces: the 6.6.6 honeycomb and 4.8.8 square-octagon lattices, as the current text says.

**Evidence**:
- Bombin–Martin-Delgado, PRL 97, 180501 (2006), quant-ph/0605138 (and https://journals.aps.org/prx/abstract/10.1103/PhysRevX.2.021004) — colour codes on trivalent lattices with three-colourable faces; standard geometries 6.6.6 and 4.8.8.
- https://errorcorrectionzoo.org/list/topological — colour-code entries: qubits on vertices of trivalent, 3-face-colourable lattices.
- Graph-theory fact: the medial graph of the honeycomb lattice is the kagome lattice. (Medial graphs appear legitimately in toric-code constructions — a surface-code statement, not a colour-code one.)

**Recommended action**: none — already corrected.

### 3E. Direct Fidelity Estimation n-independence

**Book claim** (`book/part-05-measurement-and-information/11-measurement-theory.md:89`): "**direct fidelity estimation** (estimate $\langle\psi|\rho|\psi\rangle$ to additive error with $O(1/\varepsilon^2)$ Pauli measurement *settings* drawn from an importance distribution, regardless of $n$ — with the total shot count $n$-independent for well-conditioned targets such as stabiliser states)".

**Verdict**: CONFIRMED. The scoping is exactly right: Flammia–Liu's number of measurement **settings** is O(1/ε²) independent of n for any pure target; the total number of **copies/shots** is n-independent only for stabilizer states (and "well-conditioned" states generally), while the worst case for generic states picks up a factor of the dimension d = 2ⁿ.

**Evidence**:
- https://arxiv.org/abs/1104.4695 (Flammia & Liu, PRL 106, 230501 (2011)) — "for stabilizer states, the number of repetitions is constant, independent of the size of the system... in the worst case it is O(d)".

**Recommended action**: none.

### 3F. Clifford compilation: gate count vs depth

**Book claim** (`11-measurement-theory.md:105`): "random global Cliffords on $n$ qubits require circuit size (gate count) $\Theta(n^2/\log n)$ — and depth $O(n)$ — to compile".

**Verdict**: CONFIRMED. Gate count Θ(n²/log n) is exactly Aaronson–Gottesman: 11-stage canonical form achieving O(n²/log n) gates (via Patel–Markov–Hayes CNOT synthesis) with a matching counting lower bound. Depth O(n) is a correct, achievable upper bound (Maslov–Roetteler 2018, even on linear-nearest-neighbour). Refinement: with all-to-all connectivity and no ancillas the optimal depth is Θ(n/log n) (Maslov–Zhang 2022), so "O(n)" is a valid bound rather than tight — fine as written.

**Evidence**:
- https://arxiv.org/abs/quant-ph/0406196 (Aaronson & Gottesman, PRA 70, 052328 (2004)).
- https://arxiv.org/abs/2201.05215 (Maslov & Zhang) — optimal in-place Clifford depth Θ(n/log n); O(n)-depth constructions per Maslov–Roetteler, IEEE Trans. IT 64, 4729 (2018).

**Recommended action**: none (optionally note the Θ(n/log n) all-to-all depth result).

### 3G. "Vienna and Stockholm" Bell tests

**Book claim** (current, `book/part-01-orientation/03-physical-intuition.md:517-528`): loopholes closed "one by one: detection efficiency (Rowe et al., 2001, with trapped ions; first with photons by Giustina et al. and Christensen et al. in 2013), freedom-of-choice (the 2010s Vienna cosmic-photon experiments — Handsteiner et al. 2017, Rauch et al. 2018 — and the 2018 BIG Bell Test), and finally a series of **simultaneously loophole-free** Bell tests in 2015 (Hensen et al. in Delft with NV-center spins; the Vienna and NIST photon experiments later that year)."
Pre-remediation said "2010s Vienna and Stockholm experiments" — the review's suspicion was right; INCORRECT, replaced in remediation batch 1.

**Verdict**: CONFIRMED (current text). Cosmic Bell tests: Vienna (IQOQI/Zeilinger with MIT collaborators) — Handsteiner et al. PRL 118, 060401 (2017), Rauch et al. PRL 121, 080403 (2018); BIG Bell Test (Nature 557, 212 (2018)) ICFO-coordinated and global; the 2015 loophole-free trio: Hensen et al. (Delft, NV centres, Nature 526, 682), Giustina et al. (Vienna, PRL 115, 250401), Shalm et al. (NIST Boulder, PRL 115, 250402). No Bell-loophole experiment of this class was run in Stockholm; "Stockholm" no longer appears anywhere in the book (repo-wide grep).

**Evidence**:
- https://www.iqoqi-vienna.at/research/zeilinger-group/cosmic-bell-experiments — Vienna cosmic Bell programme.
- https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.121.080403 — Rauch et al. 2018.
- https://physicstoday.aip.org/news/three-groups-close-the-loopholes-in-tests-of-bells-theorem — the 2015 trio: Delft, Vienna, NIST.
- https://www.icfo.eu/news/1418/the-big-bell-test-in-nature/ — BIG Bell Test, Nature, May 2018.

**Recommended action**: none — already corrected.

### 3H. SPDC pair-generation rate

**Book claim** (`03-physical-intuition.md:490-492`): "the textbook configuration produces polarization-entangled Bell pairs at a rate of thousands per second per milliwatt of pump power."

**Verdict**: PARTIALLY CORRECT (defensible order of magnitude, at the optimistic edge for the classic BBO "textbook configuration"). Reported detected rates span ~10² to 10⁵ pairs/s/mW: traditional BBO crossed-cone/two-crystal (Kwiat-style) sources detect ≲140 pairs/s/mW, while optimized BBO/PPKTP-Sagnac designs reach 6.5×10⁴–6.4×10⁵. "Thousands per second per mW" is inside the overall envelope (and reasonable for *generated* pairs from a classic BBO source at ~10% collection/detection efficiency), but as a *detected* rate it overstates the classic setup ~10× and understates modern sources 10–100×.

**Evidence**:
- https://arxiv.org/pdf/1204.5330 (Steinlechner et al.) — traditional BBO sources ≤ 140 detected pairs/s/mW.
- https://arxiv.org/pdf/1711.01045 — parallel-axes crystal source: 6.5×10⁴ detected pairs/s/mW.
- https://pubs.aip.org/aip/apl/article/116/2/021101/280148 — modern source: 6.4×10⁵ detected pairs/s/mW.

**Recommended action**: soften to acknowledge the spread, e.g. "…at rates ranging from hundreds of detected pairs per second per milliwatt for the classic BBO configuration to hundreds of thousands for modern optimized sources" — or keep "thousands" but qualify it as a generated-pair (pre-detection) figure.
## Group 4 — Software, tooling, classical simulation (Ch. 23, 24, 26)

### 4A. "pyLIQUi|>" / LIQUi|> mention

**Book claim**: Not present. A case-insensitive grep for `LIQ`/`Liqui`/`pyLIQ` across the entire `book/` tree finds no mention of LIQUi|>, pyLIQUi, or pyLIQUiD anywhere. The Ch23 SDK survey (§23.4) covers Qiskit, Cirq, PennyLane, tket, Q#, pyQuil, Braket, Quipper, Silq, ProjectQ, Strawberry Fields only.

**Verdict**: NOT PRESENT in the current manuscript (if an earlier draft contained "pyLIQUi|>", it has been removed). External check confirms the name would have been confabulated: no Python wrapper named "pyLIQUi|>" ever existed.

**Evidence**:
- https://github.com/StationQ/Liquid — LIQUi|> is Microsoft Research's F# simulation platform; dormant since ~2017 (superseded by QDK/Q#); no pyLIQUi wrapper anywhere in its docs.
- https://www.microsoft.com/en-us/research/project/language-integrated-quantum-operations-liqui/ — official project page; F#-hosted DSL.
- https://github.com/isi-usc-edu/pyLIQTR — the only similarly named real tool is **pyLIQTR** (MIT Lincoln Laboratory, Python/Cirq resource estimation), unrelated to LIQUi|>.

**Recommended action**: None for the current text. If legacy simulators are ever added, use "LIQUi|> (Microsoft Research, F#)"; avoid confusion with pyLIQTR.

### 4B. TensorFlow Quantum maintenance status

**Book claim**: `book/part-09-hardware-and-software/23-quantum-programming-compilation-and-tooling.md:69` — "(TFQ has been effectively unmaintained since ~2023–24 — treat it as legacy; see §23.15)"; line 234 — "though TFQ is no longer actively maintained"; line 262 — "the project has been effectively unmaintained since ~2023–24, so prefer PennyLane for new work."

**Verdict**: INCORRECT as of mid-2026 (defensible until late 2025). The repo is not archived and shipped two releases in the last ~7 months: v0.7.5 (Dec 29, 2025) and v0.7.6 (Feb 25, 2026). TFQ went dormant after v0.7.3 (May 2024) but resumed compatibility/maintenance releases (TF 2.18.1 pin, NumPy 2 and Cirq 1.5 compatibility, Python 3.10–3.12). Best described as "maintenance mode with sporadic compatibility releases," not "unmaintained/legacy."

**Evidence**:
- https://github.com/tensorflow/quantum/releases.atom — authoritative timestamps: 0.7.2: 2023-01-31; 0.7.3: 2024-05-16; 0.7.5: 2025-12-29; 0.7.6: 2026-02-25.
- https://github.com/tensorflow/quantum — repo not archived; no maintenance-mode disclaimer.

**Recommended action**: Rephrase all three spots, e.g. line 69: "(TFQ was dormant through 2024–25 and now receives only occasional compatibility releases — v0.7.6, Feb 2026; treat it as maintenance-mode, see §23.15)". Keep the "prefer PennyLane for new work" advice — that remains sound.

### 4C. Qiskit default transpiler optimization level

**Book claim**: `23-quantum-programming-compilation-and-tooling.md:110` — "level 1 was the long-time default (recent releases moved the default to level 2 — check your installed version)".

**Verdict**: CONFIRMED. Level 1 was historically the default; the default is now 2 (landed via Qiskit 1.3, Dec 2024, PR #12150 for `generate_preset_pass_manager`; current `transpile()` source defaults to 2).

**Evidence**:
- https://raw.githubusercontent.com/Qiskit/qiskit/main/qiskit/compiler/transpiler.py — "If `None`, level 2 will be chosen as default"; `config.get("transpile_optimization_level", 2)`.
- https://github.com/Qiskit/qiskit/releases/tag/1.3.0 — "Add a default optimization level to generate_preset_pass_manager (#12150)".

**Recommended action**: None required. Optionally pin the version: "…(the default moved to level 2 with Qiskit 1.3, late 2024)".

### 4D. Fugaku 48-qubit simulation run

**Book claim**: `book/part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md:60` — "The Fugaku run at 48 qubits used about 1 PiB of memory (reduced-precision amplitudes) across roughly 130 000 nodes."

**Verdict**: INCORRECT (likely a conflation). No published 48-qubit full-statevector run on Fugaku exists. The 48-qubit record belongs to Jülich's JUQCS-A (De Raedt, Willsch, Michielsen et al., 2018–19) on the **Sunway TaihuLight and the K computer**, using adaptive 2-byte amplitude encoding (≈0.5 PiB at 48 qubits). On Fugaku, RIKEN reports 46 qubits achieved (Fujitsu literature says Fugaku's 158,976 nodes / ~4.7 PB "can accommodate" 48-qubit circuits — capacity, not a run). The record moved to 50 qubits on JUPITER (Jülich, Nov 2025). The book's "~1 PiB"/"~130,000 nodes" match no documented configuration ("130,000" may echo the ~131,072 MPI processes of the TaihuLight JUQCS runs).

**Evidence**:
- https://ar5iv.labs.arxiv.org/html/1805.04708 — "Massively parallel quantum computer simulator, eleven years later" (CPC 2019): 48 qubits on Sunway TaihuLight and K computer via adaptive two-byte encoding.
- https://www.r-ccs.riken.jp/en/research/q-hpc/qcsu/ — RIKEN: 45 qubits in 2019, 46 qubits on Fugaku.
- https://www.tandfonline.com/doi/full/10.1080/09540091.2024.2349541 — Fugaku capacity statement (158,976 nodes, 4.7 PB).
- https://phys.org/news/2025-11-full-simulation-qubit-universal-quantum.html / https://arxiv.org/abs/2511.03359 — JUQCS-50 on JUPITER: 50 qubits, Nov 2025.

**Recommended action**: Replace the sentence, e.g.: "The 48-qubit record was set by Jülich's JUQCS-A on the Sunway TaihuLight and the K computer using adaptive 2-byte amplitudes (≈0.5 PiB of distributed memory); Fugaku has hosted full-state runs at ~46 qubits, and a 50-qubit run was achieved on the JUPITER exascale system in late 2025." Reconcile with the surrounding "45–49-qubit … Sunway TaihuLight and Frontier-class" sentence.

### 4E. "BlueQubit" as a stabilizer simulator

**Book claim**: Not present. Grep for `BlueQubit`/`Blue Qubit` across `book/` returns nothing. Ch24's stabilizer-simulator discussion correctly names Stim and CHP (Aaronson–Gottesman).

**Verdict**: NOT PRESENT in the current manuscript. External check confirms the characterization would have been wrong: BlueQubit is a commercial CPU/GPU **statevector** simulation platform (a startup), not a stabilizer simulator.

**Evidence**:
- https://www.bluequbit.io/platform — managed CPU/GPU simulators (built on Google qsim and NVIDIA cuQuantum) up to ~40 qubits, plus QPU access.
- https://www.amd.com/en/developer/resources/technical-articles/2026/largest-single-gpu-quantum-simulation-on-amd-by-bluequbit.html — 2026 single-GPU statevector simulation.

**Recommended action**: None.

### 4F. Bravyi–Gosset α ≈ 0.4 and the 40–50-qubit / 50–60-T-gate demo

**Book claim**: `24-classical-simulation-of-quantum-systems.md:112` — "$k$ copies have stabiliser rank at most $2^{\alpha k}$ with $\alpha \approx 0.4$ … (Bravyi–Gosset 2016 and the Bravyi et al. 2019 refinements)"; `:120` — "The Bravyi–Gosset paper exhibits a concrete simulation at the scale of $\sim$40–50 qubits and $\sim$50–60 $T$ gates completed in hours…"

**Verdict**: PARTIALLY CORRECT — the two papers' numbers are blurred. Correct attribution: **Bravyi–Gosset PRL 116, 250501 (2016)** simulated the hidden-shift algorithm at **40 qubits, ~50 T gates**; its key exponent is the ε-approximate-rank scaling **2^{0.23t}**. The **exact**-rank exponent **α ≤ 0.3963** (≈0.4) and the **50-qubit, >60-non-Clifford-gate** demonstration are from **Bravyi, Browne, Calpin, Campbell, Gosset, Howard, Quantum 3, 181 (2019)** (arXiv:1808.00128). Line 112's α ≈ 0.4 comes from the 2019 paper; line 120 attributes both scales to "the Bravyi–Gosset paper" (singular). (The review's own premise — that the BG2016 abstract mentions ~50 qubits/60 non-Clifford gates — was itself wrong; that figure is in the 2019 abstract.)

**Evidence**:
- https://ui.adsabs.harvard.edu/abs/2016PhRvL.116y0501B/abstract — BG2016: hidden shift, 40 qubits, a few hundred Cliffords, nearly 50 T gates.
- https://arxiv.org/abs/1808.00128 / https://quantum-journal.org/papers/q-2019-09-02-181/ — 2019 paper: 40–50 qubits, >60 non-Clifford gates; exact stabilizer rank α ≤ 0.3963.
- https://qiskit.github.io/qiskit-aer/tutorials/6_extended_stabilizer_tutorial.html — Qiskit extended-stabilizer docs, same exponent lineage.

**Recommended action**: Split the attribution. Line 112: "…with α ≈ 0.4 (exact rank ≤ 2^{0.3963k}, Bravyi et al. 2019; the 2016 Bravyi–Gosset paper gave 2^{0.23t} approximate-rank scaling for sampling)". Line 120: "Bravyi–Gosset (2016) simulated a 40-qubit hidden-shift circuit with ~50 T gates in hours on a workstation; the 2019 follow-up (Bravyi et al., *Quantum* 3, 181) reached 50 qubits and >60 non-Clifford gates."

### 4G. Sunway RCS simulation qubit count

**Book claim**: `24-classical-simulation-of-quantum-systems.md:216` — "Sunway's 2021 simulation of the 53-qubit Sycamore-class circuit using $4 \times 10^7$ cores reported $T_C \approx 304$ s…" (Related: line 192 — "The 2021 Sunway TaihuLight 42-qubit simulation…")

**Verdict**: CONFIRMED on the contested number — the book says **53**, matching the 2021 Gordon Bell paper (Sycamore 53-qubit / 20-cycle RCS; 304 s; ~42M cores ≈ 4×10⁷ ✓). No "56" appears in the manuscript. Two secondary inaccuracies: (1) the run used **tensor-network contraction**, not distributed statevector simulation as the paragraph's bolded lead-in implies; (2) it ran on the **new-generation Sunway**, not TaihuLight — and line 192's "2021 Sunway TaihuLight 42-qubit simulation" further conflates machines (TaihuLight's documented statevector milestone is the 48-qubit JUQCS-A run of 2018).

**Evidence**:
- https://dl.acm.org/doi/abs/10.1145/3458817.3487399 / https://arxiv.org/pdf/2110.14502 — Yong Liu et al., SC'21 Gordon Bell: tensor-network simulator, ~42M cores, 304 s vs claimed 10,000 years.
- https://www.acm.org/media-center/2021/november/gordon-bell-prize-2021 — new Sunway machine confirmed.

**Recommended action**: Keep "53". Reword the lead-in ("Sunway's 2021 Gordon-Bell tensor-network simulation on the new-generation Sunway…") and fix line 192's TaihuLight/42-qubit attribution (TaihuLight statevector milestone: 48 qubits, 2018, JUQCS-A).

### 4H. "Gao, Anschuetz, Wang, Cirac, Lukin 2024" author list

**Book claim**: The suspected wrong author list is **not** in the manuscript. `24-classical-simulation-of-quantum-systems.md:218` reads: "**Gao, Kalinowski, Chou, Lukin, Barak, and Choi** (the linear-XEB-spoofing line, published 2024)…". Grep confirms "Anschuetz" and "Cirac" appear nowhere in Ch24.

**Verdict**: CONFIRMED as currently written. The linear-XEB-spoofing claim is correctly attributed: Gao, Kalinowski, Chou, Lukin, Barak, Choi, "Limitations of Linear Cross-Entropy as a Measure for Quantum Advantage," PRX Quantum 5, 010334 (2024) (arXiv:2112.01657). The feared conflation ("Gao, Anschuetz, Wang, Cirac, Lukin") is a different paper — "Enhancing Generative Models via Quantum Correlations," PRX 12, 021037 (2022), a QML result not cited here.

**Evidence**:
- https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.5.010334 — PRX Quantum 5, 010334 (2024), authors as in the book.
- https://link.aps.org/doi/10.1103/PhysRevX.12.021037 — the distinct 2022 QML paper.

**Recommended action**: None (already correct).

### 4I. Alibaba classical-simulator effort currency

**Book claim**: `24-classical-simulation-of-quantum-systems.md:216` — "**NVIDIA `cuStateVec`** and (before its 2023 wind-down) Alibaba's simulator effort demonstrated 40+ qubit full-statevector simulations at competitive walltimes."

**Verdict**: CONFIRMED. Alibaba's DAMO Academy quantum lab was shut down in November 2023, donated to Zhejiang University; the group's simulator "Tai Zhang" (太章, 2018) was billed as the most powerful quantum-circuit simulator of its day. The past-tense framing and "2023 wind-down" are accurate.

**Evidence**:
- https://www.theregister.com/2023/11/27/alibaba_closes_quantum_lab_donates/ — shutdown + donation, Nov 27, 2023.
- https://technode.com/2023/11/27/alibaba-donates-its-quantum-lab-to-zhejiang-university/ — details; "Tai Zhang" simulator (2018).

**Recommended action**: None. (Optional: name the simulator — "Alibaba's 'Tai Zhang' simulator effort".)

### 4J. Amazon Braket hardware-provider roster

**Book claim**: `book/part-10-practice-and-era/26-practical-access-and-hands-on-work.md:24` — "**Amazon Braket** — managed access to multiple vendors' devices (IonQ, Rigetti, QuEra, IQM — the roster changes over time)…"

**Verdict**: PARTIALLY CORRECT. All four named providers are on Braket as of mid-2026, and OQC is correctly absent (removed from the roster). But the roster now also includes **AQT** (Alpine Quantum Technologies), whose 12-qubit trapped-ion IBEX Q1 launched on Braket in November 2025. Current provider set per AWS docs: AQT, IonQ, IQM, QuEra, Rigetti; devices include IonQ Forte/Forte-Enterprise, IQM Garnet/Emerald, QuEra Aquila, Rigetti Ankaa-3 and the 108-qubit Cepheus-1 (April 2026). Separate flag: **Ch23** (`23-quantum-programming-compilation-and-tooling.md:79`) still lists Braket providers as "(IonQ, Rigetti, QuEra, Oxford Quantum Circuits)" — OQC is outdated there and IQM/AQT are missing.

**Evidence**:
- https://docs.aws.amazon.com/braket/latest/developerguide/braket-devices.html — current providers: AQT, IonQ, IQM, QuEra, Rigetti.
- https://aws.amazon.com/blogs/quantum-computing/amazon-braket-launches-trapped-ion-quantum-computer-from-alpine-quantum-technologies/ — AQT IBEX Q1, Nov 2025.
- https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-braket-rigetti-cepheus/ — Rigetti Cepheus-1 108Q, April 2026.

**Recommended action**: Update Ch26 line 24 to "(IonQ, IQM, Rigetti, QuEra, AQT — the roster changes over time)". Fix Ch23 line 79: replace "(IonQ, Rigetti, QuEra, Oxford Quantum Circuits)" with the current roster (OQC left Braket in 2024).
## Group 5 — Cryptography and applications (Ch. 27–30, 33, 37, App. D)

### 5A. FIPS 206 (FN-DSA / Falcon) IPD date

**Book claim** — `book/part-11-applications/27-cryptography-and-security.md:72`: "Falcon-512 (renamed FN-DSA in NIST's draft, FIPS 206 IPD submitted August 2025, category 1)… final FIPS 206 is expected late 2026 / early 2027." Repeated at line 87.

**Verdict**: CONFIRMED (with a minor phrasing caveat).

**Evidence**:
- https://groups.google.com/a/list.nist.gov/g/pqc-forum/c/1HXzjlMUU6Y — NIST "FIPS 206 Status Update": draft submitted for approval August 28, 2025; IPD publication to follow, possibly coinciding with the late-September 2025 NIST PQC conference.
- https://www.digicert.com/blog/quantum-ready-fndsa-nears-draft-approval-from-nist — same dates; final standard expected late 2026 / early 2027.
- https://csrc.nist.gov/presentations/2025/fips-206-fn-dsa-falcon — NIST CSRC presentation on FIPS 206 status. (Direct CSRC pages returned 403 via the verification proxy, so the exact IPD publication date could not be confirmed on NIST's own site.)

**Recommended action**: Essentially none. Optionally tighten to: "draft FIPS 206 submitted for approval August 2025, with the IPD released for public comment in autumn 2025" — strictly, August 28, 2025 was submission for approval; public IPD release followed.

### 5B. CNS QRAM-free collision bound

**Book claim** — `27-cryptography-and-security.md:49`: "Without large quantum memory, the known quantum attacks improve only modestly on the classical birthday bound — down to roughly $2^{2n/5}$ time with **polynomial memory** (Chailloux–Naya-Plasencia–Schrottenloher 2017)."

**Verdict**: PARTIALLY CORRECT. Time $2^{2n/5}$, attribution, year, venue, and the derived SHA-256 numbers are all right. But CNS uses $O(2^{n/5})$ **classical** memory — exponential, not polynomial. Only the *quantum* memory is polynomial (no qRAM).

**Evidence**:
- https://eprint.iacr.org/2017/847 — CNS, ASIACRYPT 2017: time $\tilde O(2^{2n/5})$, classical memory $O(2^{n/5})$, no qRAM, small quantum computer.
- https://link.springer.com/chapter/10.1007/978-3-319-70697-9_8 — proceedings version, same complexities.
- https://blog.cr.yp.to/20171017-collisions.html — independent discussion confirming the trade-off.

**Recommended action**: Change "with polynomial memory" to "with $2^{n/5}$ classical memory and only polynomially many qubits (no QRAM)".

### 5C. ML-DSA sign/verify timing

**Book claim** — `27-cryptography-and-security.md:70`: "ML-DSA-65 (Dilithium-3, FIPS 204, category 3): public key 1952 B, signature 3309 B. Sign and verify well under a millisecond on a modern CPU."

**Verdict**: CONFIRMED. Benchmarks put ML-DSA-65 signing at ~90–180 µs and verification at ~60–80 µs on modern x86-64 with AVX2 (median and slow tails stay well under 1 ms). Key/signature sizes match FIPS 204.

**Evidence**:
- https://www.quanchain.ai/blog/crystals-dilithium-explained — Dilithium3: keygen ~60 µs, sign ~90 µs, verify ~70 µs (AVX2).
- https://h33.ai/blog/nist-ml-dsa-vs-dilithium-explained/ — ML-DSA-65: keygen ~100 µs, sign ~150 µs, verify ~80 µs.

**Recommended action**: None.

### 5D. Reiher et al. 2017 FeMoco T-count

**Book claim** — `book/part-11-applications/28-scientific-computing-and-physical-simulation.md:56`: "Reiher, Wiebe, Svore, Wecker, and Troyer's 2017 resource estimate for QPE on FeMoco landed at roughly $10^{14}$ T gates and $\sim 100$ logical qubits."

**Verdict**: CONFIRMED. Table I of the paper: "qualitatively accurate simulation (1 mHa)" serial estimates are 1.0×10^14 T gates / 111 logical qubits (Structure 1) and 1.9×10^14 / 117 (Structure 2). (The 0.1 mHa figures are ~1.1–2.0×10^15 T gates; PAR-parallelized variants use ~2,000 logical qubits — the book's numbers correspond to the standard 1 mHa serial case, the commonly quoted one.)

**Evidence**:
- https://www.microsoft.com/en-us/research/wp-content/uploads/2016/05/1605.03590-2.pdf — Reiher et al., PNAS 2017 / arXiv:1605.03590, Table I extracted verbatim.

**Recommended action**: None (optionally note the 0.1 mHa figure is ~10^15 if strict chemical accuracy is claimed nearby).

### 5E. "Minimal entropic sampling"

**Book claim**: NOT FOUND. The phrase — and the word "entropic" — appears nowhere in `28-scientific-computing-and-physical-simulation.md` or anywhere else in the manuscript (repo-wide greps for `entropic`, `minimal.*entrop`, `METTS`, `typical thermal`, `Stoudenmire`). The nearest content, the thermal-state-preparation paragraph at `28:140`, lists quantum Metropolis, quantum imaginary-time evolution, and dissipative Gibbs sampling — no METTS-like term, garbled or otherwise.

**Verdict**: NOT PRESENT — the flagged phrase does not exist in the current manuscript (possibly removed in an earlier edit, or the review item was misdirected).

**Evidence** (for the reviewer's proposed correct term, which is real):
- https://arxiv.org/abs/1002.1305 / https://iopscience.iop.org/article/10.1088/1367-2630/12/5/055026 — Stoudenmire & White, "Minimally Entangled Typical Thermal State Algorithms" (METTS), New J. Phys. 12, 055026 (2010).

**Recommended action**: None (nothing to fix). If classical finite-temperature tensor-network methods are ever added at 28:140, METTS (Stoudenmire–White 2010) is the correct term.

### 5F. D-Wave Advantage2 "~180-variable" cliques

**Book claim** — `book/part-11-applications/29-optimization-finance-and-industrial.md:79`: "Pegasus improves the constant factor and the largest clique a given chip can hold — on a $\sim$7,000-qubit Advantage2 that is a dense problem of only $\sim$180 variables"; and line 43: "A 2026-era D-Wave Advantage2 system offers about $7{,}000$ qubits… (Zephyr topology, degree 20…)".

**Verdict**: INCORRECT (misattributed on two counts). (1) The ~180-variable clique figure belongs to the previous-generation **Advantage** (Pegasus P16, 5,000+ qubits): largest complete-graph minor ≈ K_182 via the 12M−10 formula (M=16), practically ~175–180. (2) The shipped **Advantage2** (GA May 20, 2025) has **4,400+ qubits**, not ~7,000 (7,000+ was the roadmap target; a full Zephyr Z15 would be 7,440). Zephyr Z_m embeds cliques of size 16m+1, so Advantage2 embeds *larger* cliques per physical qubit than Pegasus — the "only ~180 on 7,000 qubits" framing understates Zephyr (full-scale ~K_240).

**Evidence**:
- https://www.dwavequantum.com/company/newsroom/press-release/d-wave-announces-general-availability-of-advantage2-quantum-computer-its-most-advanced-and-performant-system/ — Advantage2 GA, May 20, 2025: 4,400+ qubits, Zephyr, 20-way connectivity.
- https://quantumcomputingreport.com/d-wave-launches-advantage2-quantum-system-with-4400-qubits-and-higher-coherence/ — 4,400+ qubits, 40,000+ couplers.
- https://support.dwavesys.com/hc/en-us/community/posts/4408011282967-Embedding-fully-connected-problem — max fully-connected problem on 5,000-qubit Pegasus ≈ 180 variables (12M−10, M=16).
- https://www.dwavequantum.com/media/2uznec4s/14-1056a-a_zephyr_topology_of_d-wave_quantum_processors.pdf — Zephyr report: K_{16m+1} embeds in Z_m (Z15 → K_241).
- https://arxiv.org/pdf/2301.03009 — three-generation comparison: Zephyr embeds the same logical graphs with fewer qubits and shorter chains.

**Recommended action**: Rewrite line 79 to attribute ~180 to Advantage/Pegasus, e.g.: "…the largest clique a given chip can hold — on the 5,000+-qubit Pegasus-based Advantage that is a dense problem of only ~180 variables; the Zephyr-based Advantage2 (4,400+ qubits) embeds somewhat larger cliques despite fewer qubits." Also fix line 43's "about 7,000 qubits" to "about 4,400 qubits (the original roadmap targeted 7,000+)".

### 5G. Hamiltonian-learning citation

**Book claim** — `book/part-11-applications/30-quantum-machine-learning.md:45`: "Given access to a time-evolved state $e^{-iHt}|\psi_0\rangle$… recover the Hamiltonian… recent results (Anshu–Arunachalam–Kuwahara–Soleimanifar and follow-ups) give polynomial sample complexity for low-intersection local Hamiltonians…"

**Verdict**: PARTIALLY CORRECT. The cited paper is real and the author list right: Anshu, Arunachalam, Kuwahara, Soleimanifar, "Sample-efficient learning of interacting quantum systems", Nature Physics 17, 931–935 (2021). But AAKS learns H from copies of the **Gibbs (thermal) state** $e^{-\beta H}/Z$, not from time-evolved states — the access model in the book doesn't match the citation. Also, "low-intersection" is Haah–Kothari–Tang terminology, not AAKS. The dynamics-based results are Huang–Tong–Fang–Su (PRL 2023) and Haah–Kothari–Tang (Nat. Phys. 2024, covering both Gibbs states and real-time evolutions).

**Evidence**:
- https://www.nature.com/articles/s41567-021-01232-0 — AAKS, Nature Physics 2021: thermal-state learning.
- https://arxiv.org/abs/2108.04842 — Haah, Kothari, Tang: introduces "low-intersection"; journal version "…and real-time evolutions", Nat. Phys. 20, 1027–1031 (2024).
- https://arxiv.org/pdf/2210.03030 / https://pubmed.ncbi.nlm.nih.gov/37267566/ — Huang, Tong, Fang, Su, PRL 130, 200403 (2023): learning from dynamics, Heisenberg-limited.

**Recommended action**: Either (a) keep the time-evolution framing and cite Huang–Tong–Fang–Su (PRL 2023) / Haah–Kothari–Tang (Nat. Phys. 2024), mentioning AAKS separately as the Gibbs-state result; or (b) keep AAKS and change the access model to Gibbs-state copies. Move "low-intersection" to the Haah–Kothari–Tang attribution.

### 5H. "QNE-sim"

**Book claim** — `book/part-12-adjacent-models/33-quantum-communication-and-networking.md:100`: "…and **QNE-sim** (link-layer-focused, used by the European pilot networks)."

**Verdict**: INCORRECT. No quantum-network simulator named "QNE-sim" exists. QNE is the **Quantum Network Explorer**, QuTech's online platform (with the QNE-ADK), whose simulation back-end is NetSquid/SquidASM — a platform, not a simulator called "QNE-sim". Established simulator names: NetSquid, SimulaQron, QuNetSim, SeQUeNCe, QuISP, SimQN (the book already lists NetSquid, SeQUeNCe, QuISP, SimQN correctly).

**Evidence**:
- https://www.quantum-network.com/adk/ — QuTech's QNE ADK; simulation backed by NetSquid/SquidASM.
- https://www.quantum-network.com/knowledge-base/quantum-network-simulators/ — QuTech's own simulator list; no "QNE-sim".
- https://arxiv.org/pdf/2510.00203 — review cataloguing quantum-network simulators; no "QNE-sim".
- http://www.simulaqron.org/ — SimulaQron (TU Delft application-layer simulator).

**Recommended action**: Replace with e.g. "**SimulaQron** and the **Quantum Network Explorer** (QNE, QuTech) — a NetSquid-backed platform used in the European quantum-internet effort".

### 5I. "BTI Long Island"

**Book claim** — `33-quantum-communication-and-networking.md:118`: "…and several US testbeds (Chicago–Argonne–Fermilab, **BTI Long Island**, MIT Lincoln Lab)…"

**Verdict**: INCORRECT (garbled name). No entity "BTI" is associated with the Long Island quantum network. The real thing is the **Long Island Quantum Internet Testbed** run by **Stony Brook University and Brookhaven National Laboratory** (five nodes over commercial fiber, ~158 km entanglement-distribution links; also styled NYSQIT, with the SCY-QNet 10-node expansion).

**Evidence**:
- https://www.bnl.gov/newsroom/news.php?a=220963 — SBU awarded $6.5M to build the quantum internet test bed with BNL.
- https://www.nature.com/articles/d42473-024-00464-x — Stony Brook/BNL testbed, Long Island Quantum Ring nodes.
- https://arxiv.org/pdf/2101.12742 — "A long-distance quantum-capable internet testbed" (the Long Island testbed paper).
- Searches for "BTI quantum Long Island" return nothing.

**Recommended action**: Replace "BTI Long Island" with "the Brookhaven–Stony Brook Long Island testbed".

### 5J. QIP "proceedings"

**Book claim** — `book/part-13-perspective-and-direction/37-endgame.md:111`: "**QIP** (Quantum Information Processing). The theory conference… There are no formal proceedings — accepted papers live on arXiv."

**Verdict**: CONFIRMED — the book gets this right (the review's suspicion was unfounded). QIP has no published proceedings; submissions are extended abstract + technical manuscript, which "may be from an online repository, such as arXiv".

**Evidence**:
- https://qipconference.org/2021/qip2021/submissions/index.html — QIP submission format (no proceedings).
- https://jila.colorado.edu/qip2019/submissions.html — same model, QIP 2019.
- https://qip2026.lu.lv/submission/submission/ — QIP 2026 continues the practice.

**Recommended action**: None.

### 5K. Bravyi–Gosset citation (App. D)

**Book claim** — `book/99-back-matter/appendix-d-suggested-reading.md:155-157`: "*Improved classical simulation of quantum circuits dominated by Clifford gates.* Sergey Bravyi and David Gosset. Physical Review Letters, 2016."

**Verdict**: CONFIRMED. Exact title, authors, venue, year all match: Phys. Rev. Lett. 116, 250501 (2016), DOI 10.1103/PhysRevLett.116.250501.

**Evidence**:
- https://www.ncbi.nlm.nih.gov/pubmed/27391708 — PubMed record.
- https://research.ibm.com/publications/improved-classical-simulation-of-quantum-circuits-dominated-by-clifford-gates — IBM Research record.

**Recommended action**: None.

### 5L. Panteleev–Kalachev citation (App. D)

**Book claim** — `appendix-d-suggested-reading.md:159-161`: "*Asymptotically good quantum and locally testable classical LDPC codes.* Pavel Panteleev and Gleb Kalachev. STOC, 2022."

**Verdict**: CONFIRMED. The book cites the STOC 2022 paper (not the earlier finite-length-performance paper); title, authors, venue all correct: STOC 2022, pp. 375–388 (arXiv:2111.03654) — the paper that proved the qLDPC conjecture.

**Evidence**:
- https://dl.acm.org/doi/10.1145/3519935.3520017 — ACM DL entry.
- https://arxiv.org/abs/2111.03654 — arXiv version with matching title.
- https://dblp.org/pid/156/0010.html — dblp confirmation.

**Recommended action**: None.

---

## Application log (2026-07-04, same-day; insert-only addendum)

The recommended corrections were applied to the manuscript in the commit that adds this
section (fixes and markers synchronized). Per-item disposition:

- **1C** ✅ APPLIED — Ch16: line-139 scaling corrected to Θ(t + log(1/ε)/loglog(1/ε)); LCU
  credited to Childs–Wiebe 2012 with BCCKS 2015 building on it; STOC-2014 provenance of the
  precision lower bound noted.
- **1F** ✅ APPLIED — Ch17 §advantage history: actors/dates corrected (2021 Sunway/Wuxi
  Gordon Bell run; 2024 USTC-led 1,432-GPU run); "supercomputing centres in Hefei and Wuxi"
  wording removed.
- **2B** ✅ APPLIED — Ch20: "TU Wien" replaced with Delft (QuTech), Stuttgart, and Quantum
  Brilliance.
- **2C** ✅ APPLIED — Ch20: silicon 1q gate times widened to ~100 ns–1 µs (tens of ns for the
  fastest EDSR devices).
- **2D** ✅ APPLIED — Ch21: "Rigetti's Lodgepole" → "Rigetti's Quil-T pulse-level layer in the
  QCS stack".
- **2E** ✅ APPLIED — Ch22: "Q-PERFECT" entry replaced with BACQ (Thales/CEA and partners).
- **2F** ✅ APPLIED — Ch22: QV history corrected (2¹⁹ = H1-1/2023, 2²¹ = H2 launch/2024,
  2²⁵ = H2/2025); H2 entry updated to QV 2²⁵; Helios updated to launched (Nov 2025, 98 qubits).
- **2G** ✅ APPLIED — Ch18: neutral-atom 2q fidelity restated as 99.5%–99.7% (99.5% reached by
  Evered et al. 2023, since exceeded).
- **3B** ✅ APPLIED — Ch19: "per increase in d" disambiguated to per two-unit distance step
  (d = 3 → 5 → 7) in both passages; lifetime claim tightened to 2.4× vs best physical qubit.
- **4B** ✅ APPLIED — Ch23 (three places): TFQ restated as dormant-then-maintenance-mode with
  the Dec 2025 / Feb 2026 compatibility releases; "prefer PennyLane" advice retained.
- **4D** ✅ APPLIED — Ch24: Fugaku-48-qubit conflation replaced with JUQCS-A record
  (TaihuLight/K computer, ~0.5 PiB), Fugaku ~46 qubits, JUPITER 50-qubit run (late 2025).
- **4F** ✅ APPLIED — Ch24: stabiliser-rank exponents split correctly (2016: 2^{0.23k}
  approximate; 2019: exact α ≤ 0.3963) and the 40-qubit/2016 vs 50-qubit/2019 demonstrations
  attributed to the right papers.
- **4G** ✅ APPLIED — Ch24: 2021 Sunway run relabelled as Gordon-Bell tensor-network simulation
  on the new-generation Sunway (not statevector, not TaihuLight); line-192 statevector example
  corrected to the 2018 TaihuLight 48-qubit JUQCS-A run.
- **4J** ✅ APPLIED — Ch26 roster updated (IonQ, IQM, Rigetti, QuEra, AQT); Ch23 stale roster
  fixed (OQC departure noted, IQM/AQT added).
- **5B** ✅ APPLIED — Ch27: CNS memory corrected to 2^{n/5} classical memory + polynomially
  many qubits, no QRAM.
- **5F** ✅ APPLIED — Ch29: Advantage2 qubit count corrected to ~4,400 (roadmap 7,000+ noted);
  ~180-variable clique reattributed to the Pegasus-based Advantage, with Zephyr noted as
  embedding larger cliques per qubit.
- **5G** ✅ APPLIED — Ch30: access-model/citation mismatch fixed — dynamics results credited to
  Huang–Tong–Fang–Su 2023 and Haah–Kothari–Tang 2024 (with "low-intersection" moved to the
  latter), AAKS 2021 kept as the Gibbs-state result.
- **5H** ✅ APPLIED — Ch33: "QNE-sim" replaced with SimulaQron + Quantum Network Explorer
  (QNE, QuTech, NetSquid-backed).
- **5I** ✅ APPLIED — Ch33: "BTI Long Island" → "the Brookhaven–Stony Brook Long Island
  testbed".
- Optional-only items (2A, 3H, 4C, 5A, 5D and the Steane/Alibaba naming notes) — NOT APPLIED,
  by design: each was verdict-confirmed or hedge-optional; left for a future editorial pass.
- Post-application checks: repo-wide grep confirms "Lodgepole", "Q-PERFECT", "QNE-sim", "BTI",
  "TU Wien", and "Hefei and Wuxi" no longer appear in `book/`; `tools/lint.py` passes
  (48 files OK).
