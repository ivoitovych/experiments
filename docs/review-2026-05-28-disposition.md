# Review 2026-05-28 — disposition record

This is the closing record for [`review-2026-05-28-0105.md`](../review-2026-05-28-0105.md).
Each distinct finding in that review has one row here with a status:

- **APPLIED** — change is in HEAD; commit cited.
- **DEFENSIBLE** — verified by reasoning or source; intentionally not changed; rationale given.
- **NEEDS-VERIFICATION** — genuinely open; to be walked through one by one before applying.
- **REJECTED** — verified as not a defect; will not act.

When every row is dispositioned (no NEEDS-VERIFICATION remaining), the
review file itself is deleted; this doc is the durable record. Further
appends to that file by the reviewer are out of scope unless explicitly
re-opened — the discipline is that one review session terminates in one
disposition record.

## Key findings (numbered §)

| # | Finding | Status | Notes |
|---|---|---|---|
| 1 | Stale "45 files" language in PROCESS / HISTORY | APPLIED | PROCESS 45→47 (`415a469`); HISTORY references retained as bootstrap-era narrative (explicit in Phase 0/1 framing) |
| 2 | `TOC.md` says Index not yet produced | APPLIED | `8365708` |
| 3 | `scripts/build_book.py` SyntaxWarning | APPLIED | raw docstring, `8365708` |
| 4 | `STYLE.md` understates figure coverage | APPLIED | `8365708` |
| 5 | Full mdBook HTML build not verifiable in reviewer's env | APPLIED | root cause was a too-narrow toolchain policy: the supported range is now compatible *pairs* (mdbook 0.4.x+mdbook-katex 0.9.x, **or** 0.5.x+0.10.x), evidenced by mdbook-katex's own crate deps (`mdbook_fork4ls ^0.4.48` vs `mdbook-preprocessor ^0.5.1`); pair-aware guard in `scripts/build_book.py`, docs in README + PROCESS. The reviewer's 0.5.3 env now has a documented matching katex (0.10.x). Our build verified on the 0.4.48+0.9.4 pair (0 KaTeX errors) |
| 6 | 2025/2026 claims need a dated fact-check | APPLIED | seven dated passes recorded in `docs/fact-check-ledger.md` |

## Front-matter notes

| Item | Status | Notes |
|---|---|---|
| Preface: nav-before-status ordering | APPLIED | `093eca2` |
| Preface: "Every chapter ends with sanity-check exercises" not strictly true for front matter | APPLIED | `d8319bb` (preface: "most chapters end") |
| Preface: inline-answers contradiction with §self-check exemption | APPLIED | `d8319bb` (preface: self-check exemption + inline-answers caveat) |
| Preface: Qiskit endian "0b01 ↔ \|10⟩" is high-risk | DEFENSIBLE | `bf7fba9` clarified — example now explicitly flagged as a cross-convention pitfall, not a convention this book adopts |
| Preface: glossary "every boldface term" claim | APPLIED | `d8319bb` (preface: "major terms") |
| §self-check: §1.2 has no closing reference matching the opener | APPLIED | `d8319bb` (background-and-self-check: "most sections close") |
| §self-check: §1.6 vs §1.7 framing as "final" | DEFENSIBLE | reviewer's own "no defect" note |
| §02-notation: ordering | APPLIED | `093eca2` |
| §02-notation: "lint catches kets in tables" may not match `tools/lint.py` | APPLIED | `d8319bb` (lint description rewritten to enumerate what is actually enforced) |
| §02-notation: status-block "exact spacing and bullet character (·) are load-bearing" stricter than `scripts/generate_progress.py` enforces | APPLIED | `d8319bb` (notation: softened to convention-for-readability) |

## Back matter

| Item | Status | Notes |
|---|---|---|
| All appendices: ordering | APPLIED | `093eca2` |
| Appendix A: Qiskit endian guidance repetition risk | DEFENSIBLE | each repetition is properly contextualised; risk is acknowledged but the redundancy is intentional |
| Appendix A: circuit-drawing intro cross-ref to Ch6 | DEFENSIBLE | the wording is acceptable since Ch6 introduces single-qubit circuits |
| Appendix B: §B.5/§B.8 Qiskit-specific claims | DEFENSIBLE | `bf7fba9` clarified — "(Qiskit 2.x)" version anchors added to §B.4/§B.5/§B.8; verified vs Qiskit 2.4.1 (`make check-examples` passes) |
| Appendix B: §B.3 `P(φ)` "no relative observable phase" | APPLIED | `d8319bb` (computational-basis-eigenstate vs superposition explicit) |
| Appendix B: §B.9 `CP(α) ⊗_{control}` notation | APPLIED | `d8319bb` (relabelled as `P(α)⊗I`) |
| Appendix C: Toffoli decomposition described loosely | DEFENSIBLE | the existing wording cites the standard 6-CNOT decomposition by reference rather than reproducing the diagram; the §B.7 entry has the concrete circuit; cross-reference is sufficient at this granularity |
| Appendix C: MUB statement "exactly d+1 in prime-power dimensions" | APPLIED | `d8319bb` (rephrased as "at most d+1, achieved when d is a prime power"; smallest open case d=6 noted) |
| Appendix D: Qiskit `QFT` class deprecation timing | APPLIED | `4c42d48` (Pass 7) |
| Appendix D: TKET docs URL moved | APPLIED | `4c42d48` (Pass 7) |
| Appendix D: live tooling URL freshness (other entries) | APPLIED | Pass 7 verified Cirq / PennyLane / Qiskit / Q# URLs |
| Appendix D: "current"/"still-current" language | DEFENSIBLE | `bf7fba9` clarified — bare "still-current" fault-tolerance survey anchored "as of 2026" |
| Appendix E: glossary precision (chapter vs section cross-refs) | DEFENSIBLE | `bf7fba9` clarified — Fidelity glossary cross-ref Chapter 12 → §12.7 (matches index/main-development policy) |
| Appendix E: hardware/tooling current-state claims in glossary | DEFENSIBLE | gate-fidelity entry already carries "as of 2026"; remaining entries definitional, none flagged wrong |
| Appendix E: fidelity convention alignment with Ch12 | APPLIED | `d8319bb` (glossary aligned to unsquared convention) |
| Appendix F: Quantinuum H2 / IonQ / Pasqal updates | APPLIED | `3237078` (Pass 1) |
| Appendix F: explicit Bluvstein 2023 citation; Microsoft × Quantinuum logical-qubit result | APPLIED | Pass 1 |
| Appendix F: F.6 table fragility (Markdown table with units) | DEFENSIBLE | `bf7fba9` verified table has no `\|`/kets in cells; renders clean; prose left as-is |
| Appendix F: §F.8 "replace wholesale" guidance | DEFENSIBLE | already in the appendix; reviewer's note is forward-looking |
| Index: §16.x placeholder | APPLIED | `7ef9e39` |
| Index: target precision (Born rule → §10.3 vs Ch5; Fidelity → Ch22 vs Ch12) | APPLIED | `bf7fba9` — adopted "main development" policy (stated in index + generator); Born rule → §5.4, Fidelity → §12.7; `scripts/generate_index.py` TERMS updated so `make index` reproduces it |

## Chapters 1–3

| Item | Status | Notes |
|---|---|---|
| §1.6 Shor "broke the public-key cryptography that underwrites modern internet security" | APPLIED | `88731cd` (Ch 1.intro rewritten to "polynomial-time algorithm … undermining those schemes in principle, once a sufficiently large fault-tolerant machine exists") |
| §1.6 trapped-ion qubit count "hundreds" | APPLIED | Pass 6 (`415a469`) |
| §1.6 forecast "5–10 years" framed as scenario | DEFENSIBLE | `bc6e32c` clarified — reframed as an optimistic-roadmap scenario anchored to 2026, not a scheduled deliverable |
| §1.6 sanity checks | DEFENSIBLE | `bc6e32c` clarified — added "as of 2026" to the "no speedup known" check for parity with the chapter's time-anchored claims |
| §2.5 BPP=P phrasing | APPLIED | `b1f0335` |
| §2.6 superconducting fidelity vs Appendix F | APPLIED | Pass 6 (general framing aligns) |
| §2.7 superdense/teleportation cross-refs to §7.12 | APPLIED | `bc6e32c` — verified §7.12 "Entanglement as a Resource" covers both; added section title for navigability |
| §2.7 final sanity-check "depth from 99% 2Q fidelity" forward-looking | DEFENSIBLE | `bc6e32c` clarified as a back-of-the-envelope estimate, not a hard limit (Ch 21 gives the precise version) |
| §3.3 "Part VI" → "Part IX" | APPLIED | `8365708` |
| §3.3 molecule-interference "several thousand atoms" | APPLIED | `bc6e32c` — corrected to ~2,000-atom engineered macromolecules; Fein et al., *Nature Physics* 15, 1242 (2019), >25 kDa oligoporphyrins ("biological" was also inaccurate) |
| §3.8 Bell-test "every loophole" | APPLIED | `88731cd` (scoped to main experimental loopholes; superdeterminism and retrocausality noted as not closable) |
| §3.9 coherence-time/platform comparisons | DEFENSIBLE | `bc6e32c` added "(as of the mid-2020s)" time anchor to the gates-within-T2 figure |
| §3 sanity checks | DEFENSIBLE | `bc6e32c` reviewed all five answers airtight; no edit |

## Chapters 4–7

| Item | Status | Notes |
|---|---|---|
| §4 ordering | DEFENSIBLE | already compliant pre-`093eca2` |
| §4.6 measurement cross-ref "Chapters 11–12" | APPLIED | `bc6e32c` — verified Ch 11 = Measurement Theory (POVMs); §4.6 already attributed measurement to Ch 11; added pointer that channels are Ch 10, not the measurement chapter |
| §4.13/§4.16 Qiskit-specific claims | DEFENSIBLE | verified against installed Qiskit 2.4.1 |
| §4.14 Holevo/AE previews "advanced" | DEFENSIBLE | reviewer's own "no change required" |
| §5 ordering | DEFENSIBLE | already compliant |
| §5.2 channel cross-ref (Ch18 vs earlier introduction) | APPLIED | `bc6e32c` — §5.2 already correct (channels first in Ch 10 CPTP/Kraus §10.12–10.13, applied to hardware in Ch 18); fixed the genuinely imprecise twin xref in §4.5 which had skipped Ch 10 |
| §5.11 partial-trace `tr_A` → `tr` | APPLIED | `8365708` |
| §5 no-cloning proof | DEFENSIBLE | example states make the contradiction clear |
| §6 ordering | DEFENSIBLE | already compliant |
| §6.1 "3-sphere" → "2-sphere" | APPLIED | `8365708` |
| §6.6 MUB "n qubits admit 2^n+1 MUBs" parenthetical | APPLIED | `bc6e32c` — qualified as the maximal d+1, existing because 2^n is a prime power (Wootters–Fields 1989; Bandyopadhyay–Boykin–Roychowdhury–Vatan 2002) |
| §6.10 circular-basis `S†H` → `HS†` | APPLIED | `8365708` |
| §6.4 platform examples | DEFENSIBLE | `bc6e32c` clarified — added "for example / typically / often" hedges so per-platform encodings don't read as exhaustive |
| §7 ordering | APPLIED | `093eca2` |
| §7.1 "qubit 0" vs Qiskit | APPLIED | `bc6e32c` — added a clause flagging that the book's big-endian "qubit 0" is Qiskit's rightmost (little-endian) qubit; cross-refs §4.2 + Appendix A |
| §7.4 "most algorithms exploit entanglement" | APPLIED | `bc6e32c` — softened: growing multipartite entanglement is *necessary* for exponential speedup in the pure-state setting (Jozsa–Linden 2003), with the DQC1 mixed-state caveat |
| §7.9 CHSH sign convention | DEFENSIBLE | `bc6e32c` added one clause stating the $A_1B_1$ minus-sign convention at first use; bounds unaffected |
| §7.12 teleportation corrections I,X,Z,XZ vs ZX | APPLIED | `bc6e32c` — **genuine fix**: original `XZ` was wrong; corrected to the explicit map 00→I, 01→X, 10→Z, 11→ZX ($Z\cdot X$ order), verified by reproducing the circuit; superdense table made consistent |

## Chapter 8

| Item | Status | Notes |
|---|---|---|
| §8 ordering | APPLIED | `093eca2` |
| §8.1 "every branch at once" parallelism | APPLIED | `3c77c48` |
| §8.3 X-measurement as H-Z-H with trailing H dropped | DEFENSIBLE | `bc6e32c` clarified — spelled out *why* the trailing H is droppable (only relabels readout outcomes; no effect on statistics) |
| §8.7 multi-controlled-gate cost statement broad | APPLIED | `bc6e32c` — qualified by clean/dirty/no ancilla; O(k)-Toffoli marked representative; Barenco et al., *Phys. Rev. A* 52, 3457 (1995) cited |
| §8.9 `{H, S, CNOT, Toffoli}` universal — which theorem? | APPLIED | `bc6e32c` — added {H, Toffoli} computational universality (dense in SO(2^n), complex via real-encoding); Shi 2003 (arXiv:quant-ph/0205115) + Aharonov 2003 (arXiv:quant-ph/0301040) cited |
| §8.11 Ross–Selinger `c≈1` for `{H, T}` | APPLIED | `bc6e32c` — disambiguated c≈1 (Ross–Selinger 2016 Clifford+T z-rotation T-count 3log₂(1/ε)+O(loglog)) from the generic SK exponent c≈3.97 (Dawson–Nielsen 2005); both cited |
| §8.12 native gate sets | APPLIED | Pass 5 (`e751e2e`) |
| §8.14 KAK 2-CNOT condition `c_z=0` | APPLIED | `ac1c4cc` |
| §8 sanity check 3 `R_Y(π)\|0⟩` trivial phase | DEFENSIBLE | `bc6e32c` clarified — added a reassurance that the resulting global phase is unobservable |

## Chapter 9

| Item | Status | Notes |
|---|---|---|
| §9 ordering | APPLIED | `093eca2` |
| §9.1 Qiskit endian "least-significant on top" compressed | DEFENSIBLE | `bc6e32c` clarified — explicit Ch 7 endianness pointer added at the compressed Qiskit-ordering remark |
| §9.4 uncompute composition order | APPLIED | `6e93cd3` |
| §9.7 `Meas ∘ C(U) = C(U) ∘ Meas` literal equality risk | APPLIED | `88731cd` (equality made explicitly statistical-on-joint-distributions; intermediate quantum states differ) |
| §9.8 mid-circuit measurement "qubit available for further use" too absolute for destructive-measurement platforms | APPLIED | `88731cd` (qualified by non-demolition vs destructive readout) |
| §9.8 hardware-support claims time-sensitive | DEFENSIBLE | `bc6e32c` clarified — "(as of the mid-2020s)" time anchor added to the non-demolition-readout platform claim |
| §9.9 magic-state Clifford (S) correction | APPLIED | `a275f15` |
| §9.9 Pauli-frame tracking missing from QEC description | APPLIED | `88731cd` (one-sentence mention added) |
| §9.10 Solovay–Kitaev wording | APPLIED | `88731cd` (scoped to fault-tolerant Clifford+T; NISQ continuous-gate case excepted) |
| §9.12 SWAP cost "on CNOT-native target" | APPLIED | `a275f15` |
| §9 sanity check 2 Toffoli classical-correlation vs entanglement | DEFENSIBLE | `bc6e32c` clarified — specified a superposition input so the exercise yields genuine entanglement, not just classical correlation |

## Chapter 10

| Item | Status | Notes |
|---|---|---|
| §10 ordering | APPLIED | `093eca2` |
| §10 "Parts 6 / 7" → "Parts 8 / 9" | APPLIED | `1a563b1` |
| §10.1 "every branch at once" repeat | APPLIED | `88731cd` (phrase flagged as the misleading popular paraphrase; cross-refs §1.2; interference, not parallelism) |
| §10.4 Robertson bound "forces ΔX=ΔY=1" on Pauli-Z eigenstates | APPLIED | `88731cd` (Robertson bound noted vacuous on Z-eigenstates; ΔX=ΔY=1 derived from X²=Y²=I) |
| §10.6 POVM → measurement operators naming | APPLIED | `6e93cd3` |
| §10.6 cyclicity of partial trace | APPLIED | `88731cd` (subsystem-restricted identity made explicit; full cyclicity noted as not holding for partial trace) |
| §10.8 Zeno "back onto the code space" | APPLIED | `1a563b1` |
| §10.11 depolarising Lindblad rate (γ instead of p) | APPLIED | `39ee7ab` |
| §10.12 depolarising `p/4` + Kraus | APPLIED | `39ee7ab` |
| §10.12 phase damping "indistinguishable from random Z" too strong | APPLIED | `88731cd` (replaced with probabilistic-Z model + matched shrink factor q=(1-√(1-p))/2) |
| §10.14 bridge to Part 6 | APPLIED | implicit in §10 part-number fix |
| §10 SC5 depolarising-Kraus exercise | APPLIED | `39ee7ab` |

## Chapter 11

| Item | Status | Notes |
|---|---|---|
| §11 ordering | APPLIED | `093eca2` |
| §11.1 non-demolition → weak measurement | APPLIED | `1a563b1` |
| §11.4 "4ⁿ basis states" → informationally-complete | APPLIED | `1a563b1` |
| §11.5 shadows post-hoc-query caveat | APPLIED | `7e787f7` |
| §11.6 mixed-state support condition | APPLIED | `7e787f7` |
| §11.7 Y-basis `HS†` and "no gate for I" | APPLIED | `7ef9e39` |
| §11.7 qubit-wise commuting "iff" caveat for entangling joint measurement | APPLIED | `8e8943e` (iff scoped to single-qubit basis rotations; entangling-Clifford case noted) |
| §11.7 readout `O(2n)` notation | APPLIED | `7e787f7` |
| §11 SC1 trine POVM Bloch identities | APPLIED | `8e8943e` (Bloch-vector hint added) |

## Chapter 12

| Item | Status | Notes |
|---|---|---|
| §12 ordering | DEFENSIBLE | already compliant |
| §12 "Part 6 and Part 8" preview cross-ref | APPLIED | `8e8943e` (Part 6 → Part 8 + Part 12, matching where capacities are actually developed) |
| §12.4 state-merging operational interpretation | DEFENSIBLE | `bc6e32c` clarified — added a one-clause note that the equivalent "fully quantum Slepian–Wolf" formulation exists (Horodecki–Oppenheim–Winter 2005), to preempt "this isn't how I learned it" |
| §12.7 main-text "Either side becomes equality on pure states" (distinct from SC3) | APPLIED | `8e8943e` (only upper bound tight on pure states; lower bound saturates only at endpoints) |
| §12.8 no-cloning "conserved" → "preserved" | APPLIED | `7e787f7` |
| §12.9 Schumacher source-model | DEFENSIBLE | `bc6e32c` clarified — flagged the i.i.d. source as an idealization and scoped out correlated/non-stationary sources |
| §12.10 `max_ρ` ranges over multi-use inputs | APPLIED | `8e8943e` (input written as ρ^{(n)}; regularisation note added) |
| §12.13 no-cloning repeated-runs framing | APPLIED | `3c77c48` |
| §12 SC3 Fuchs–van de Graaf upper-tight | APPLIED | `894c201` |
| §12 SC5 subadditivity strict for Bell | APPLIED | `894c201` |

## Chapter 13

| Item | Status | Notes |
|---|---|---|
| §13 ordering | APPLIED | `093eca2` |
| §13.1 absolute "no black-box query" | APPLIED | `fbfc566` |
| §13.3 "seam" → "boundary" | APPLIED | `fbfc566` |
| §13.4 QFT convention check across Ch4 / Ch14 | APPLIED | `ae2e8be` (§14.5 sign now consistent with §13.4) |
| §13.4 controlled `U^{2^k}` caveat present in §14.6 | APPLIED | `fbfc566` |
| §13.7 "each containment conjectured strict" | APPLIED | `b1f0335` |
| §13.7 simulation speedups "best-known" | APPLIED | `fbfc566` |
| §13.7 "uncorrected classical" | APPLIED | `8e8943e` ("best practical classical" + fault-tolerant end-to-end framing) |
| §13 sanity checks | APPLIED | `bc6e32c` — **fix**: SC4 cost-metric list corrected (query, time, gate, T-count) to match the four metrics §13.7 actually defines (was "depth") |

## Chapter 14

| Item | Status | Notes |
|---|---|---|
| §14 ordering | APPLIED | `093eca2` |
| §14.2 Qiskit `StatevectorSampler` API | VERIFIED | runs in `.venv` qiskit 2.4.1 (`make check-examples` passes); ledger row OK |
| §14.4 Simon query-model | APPLIED | `b1f0335` |
| §14.5 QFT `R_k` sign | APPLIED | `ae2e8be` |
| §14.5 SC3 amplitudes | APPLIED | `ae2e8be` |
| §14.6 phase-estimation consistent with negative-exponent QFT | APPLIED | via §14.5 fix |
| §14.6 `U^{2^k}` closed-form caveat | APPLIED | `fbfc566` |
| §14.7 Grover oracle sign | APPLIED | `b1f0335` |
| §14.8 amplitude estimation `a = sin²θ` | APPLIED | `b1f0335` |
| §14.9 dihedral / CVP–SVP precision (Regev) | APPLIED | `fbfc566` |
| §14.9 malformed `G = function over Z^n` bullet | APPLIED | `1a563b1` |
| §14.9 HSP scope softened (glued-trees, forrelation) | APPLIED | `1a563b1` |

## Chapter 15

| Item | Status | Notes |
|---|---|---|
| §15 ordering | APPLIED | `093eca2` |
| §15.1 Grover count `floor(π/4θ)` → rounded form | APPLIED | `fbfc566` |
| §15.1 success bound `≥ 1 - M/N` pairing with iteration count | APPLIED | `8e8943e` (half-line qualifier added pairing the bound with the rounded count) |
| §15.1 Qiskit code API | VERIFIED | runs in `.venv` qiskit 2.4.1 |
| §15.2 QFT-sign inheritance | APPLIED | via §14.5 fix |
| §15.2 NIST → ML-KEM/ML-DSA | APPLIED | `7ef9e39` and refined Pass 3 (FIPS numbers) |
| §15.3 logical-qubit count consistency | APPLIED | `2e046d0` |
| §15.3 RSA physical/runtime/Toffoli figures | APPLIED | Pass 2 (Gidney–Ekerå 2019 / Gidney 2025) |
| §15.3 "when, not whether" forecast | APPLIED | `8e8943e` (scoped to long-lived secrets, CRQC arrival, harvest-now-decrypt-later, NIST PQC timeline) |
| §15.4 ECDLP citation (Roetteler, Häner et al.) | APPLIED | `fbfc566` |
| §15.5 HHL "eigen-decomposing" | APPLIED | `a275f15` |
| §15.5 κ scaling note (block-encoded / QSVT) | APPLIED | `fbfc566` |
| §15.5 dequantization qualification | APPLIED | `fbfc566` |
| §15.6 glued-trees as oracle-model | APPLIED | `fbfc566` |
| §15.6 Szegedy quadratic in spectral-gap dependence | APPLIED | `fbfc566` |
| §15.6 `§16.x` placeholder → §16.5 | APPLIED | `7ef9e39` |
| §15.8 VQE shot estimate sourced | DEFENSIBLE (open in ledger) | `bc6e32c` clarified — marked the 10⁹–10¹² figure as order-of-magnitude, problem- and ansatz-dependent; pinning to a specific 2024–2026 paper is the lone open ledger row |
| §15.9 QAOA `p→∞` adiabatic schedule | APPLIED | `fbfc566` |
| §15.10 QML 2026 picture | VERIFIED | Pass 6; substantively unchanged |
| §15 SC5 RSA-2048 exercise | DEFENSIBLE | `bc6e32c` clarified — pointed the exercise at the §15.3 Gidney baseline figures |

## Counts (final — all items dispositioned)

- **APPLIED**: 122 items.
- **DEFENSIBLE** (intentionally not changed; most now carry a clarity
  touch to preempt re-flagging): 33 items.
- **VERIFIED** (checked against the live toolchain / sources, no change
  needed): 3 items.
- **NEEDS-VERIFICATION**: 0 items.
- **REJECTED**: 0 items.

**Zero NEEDS-VERIFICATION rows remain.** The final verification pass
(commits `bc6e32c`, `bf7fba9`) closed the last batch via a pool of
per-chapter verification workers, each checking against primary sources:

- **Genuine corrections surfaced and fixed:** §3.3 matter-wave record
  (Fein et al. 2019, ~2,000-atom macromolecules; "biological / several
  thousand" was wrong); §7.12 teleportation Pauli corrections (`XZ` →
  `ZX`, verified by reproducing the circuit); §13.7 self-check
  cost-metric list ("depth" → "time", matching §13.7's own definitions).
- **Sourced clarifications:** §6.6 MUB prime-power qualifier
  (Wootters–Fields 1989; BBRV 2002); §7.4 entanglement-and-speedup
  (Jozsa–Linden 2003 + DQC1 caveat); §8.7 multi-controlled cost
  (Barenco et al. 1995); §8.9 {H, Toffoli} universality (Shi 2003;
  Aharonov 2003); §8.11 Ross–Selinger c≈1 vs Solovay–Kitaev c≈3.97.
- **Cross-reference precision:** §2.7→§7.12, §4.5/§4.6 channel-vs-measurement
  split (Ch 10 vs Ch 11), §5.2 verified already correct.
- **Index policy:** "main development" target policy adopted and encoded
  in `scripts/generate_index.py` (Born rule → §5.4; Fidelity → §12.7).
- **DEFENSIBLE items** received minimal one-clause clarity touches (time
  anchors, hedges, convention statements) so a perfectionist re-read does
  not re-open them; a handful were verified airtight and left untouched.

The earlier apply commits `d8319bb`, `88731cd`, `8e8943e` cover the
front matter, back matter, and Ch 1–15 substantive items from the
first pass.

## Reviewer post-pull reconciliation (2026-05-28 23:57 CEST)

The reviewer appended a fresh reconciliation to `review-2026-05-28-0105.md`.
It confirms the Ch 8–15 fixes above landed, and lists residual items.
Disposition of that residual list:

- **Already fixed before the reviewer's check (stale flags):** §13.7
  "uncorrected classical" (now "best practical … end-to-end", `8e8943e`);
  §15.1 Grover success-bound qualifier (`8e8943e`/`bc6e32c`). Verified
  present in HEAD.
- **Build blocker — addressed:** the reviewer's `make book` failure is a
  toolchain mismatch (mdbook 0.5.3 vs mdbook-katex 0.9.4), not a config
  bug. Root cause: nothing pinned the toolchain, so a fresh
  `cargo install` pulled mdbook 0.5.x. Fixed by pinning the install
  commands (README + Makefile) to mdbook 0.4.x + mdbook-katex 0.9.4 and
  adding a version guard in `scripts/build_book.py` that prints
  known-good guidance instead of failing cryptically. Our build with
  mdbook 0.4.48 is verified: 0 KaTeX errors.
- **§8.3 — applied:** reframed to separate the *operator* identity
  $HXH=Z$ (symmetric) from the *measurement* procedure ($X$ via a single
  $H$ then a $Z$-basis readout); removed the "drop the trailing $H$"
  framing the reviewer flagged.
- **§12.4 — applied:** added a clause making explicit that $S(A\mid B)$ is
  the *quantum* resource cost and that classical communication, used at
  an asymptotically negligible rate, is outside the leading-order
  accounting (complements the FQSW-equivalence note from `bc6e32c`).
- **§14.2 / §15.1 Qiskit `StatevectorSampler` — verified:** `make
  check-examples` runs `examples/deutsch_jozsa.py` and `examples/grover.py`
  (both using `StatevectorSampler().run([qc], shots=…).result()[0].data.c.get_counts()`)
  clean under Qiskit 2.4.1.
- **Time-sensitive claims (§8.12, §9.8, §15.3, §15.8, §15.10) — clarity
  added (`3afaedf`):** these are perishable by nature and tracked
  in `docs/fact-check-ledger.md`, but each now carries an explicit
  "dated snapshot / moving target" caveat so a reader (or reviewer) does
  not read the figures as eternal: §8.12 native-set list flagged as a
  2026 snapshot with the *structure* called out as the durable part;
  §9.8 mid-circuit hardware support flagged "fast-moving snapshot, check
  current device docs"; §15.3 RSA anchors flagged "moving target, not a
  fixed threshold"; §15.8 VQE shot counts flagged a "2026 snapshot that
  should fall"; §15.10 QML status flagged "fast-moving, verdicts may
  shift".
- **§9.1 compressed endian note — clarity added (`3afaedf`):**
  spelled out that wire-position ordering and bit-string endianness are
  two independent choices this book aligns and Qiskit reverses on both,
  with a pointer to the Appendix A index-conversion recipe.

These closures are in commit `69c5183` (manuscript §8.3/§12.4,
toolchain pinning + guard, README/Makefile) and `3afaedf`
(snapshot caveats on the time-sensitive claims and §9.1).

## Reviewer third reconciliation (2026-05-29 00:17 CEST)

The reviewer reran the checks. Confirmed landed: §8.3, §9.8, §13.7,
§15.3, §15.8, §15.10, and the build-script version warning. Their
remaining list, dispositioned:

- **§9.1 Qiskit endian — verified (`757a20e`):** checked
  empirically against Qiskit 2.4.1 — `X` on qubit 0 yields the label
  `'01'` (qubit 0 = rightmost / least-significant) and qubit 0 is drawn
  on the *top* wire. The book's statement ("Qiskit puts the
  least-significant qubit on top") is correct. No manuscript change.
- **§12.4 state merging — applied (`757a20e`):** the reviewer was
  right to keep pressing. My earlier clause wrongly called the classical
  communication "asymptotically negligible". Corrected: the protocol
  runs in the **LOCC** setting and draws on three resources — quantum
  communication ($S(A\mid B)$ qubits when positive), entanglement
  ($|S(A\mid B)|$ ebits gained when negative), and classical
  communication (freely supplied by LOCC, used at a non-trivial rate,
  *not* what $S(A\mid B)$ measures). $S(A\mid B)$ is the quantum cost/yield,
  not the total communication.
- **§14.2 / §15.1 Qiskit `StatevectorSampler` — verified
  (`757a20e`):** the in-text §15.1 code is identical to the tested
  `examples/grover.py`; `make check-examples` runs it (and the §14.2
  Deutsch–Jozsa analogue) clean under Qiskit 2.4.1. The exact API call
  `StatevectorSampler().run([qc], shots=…).result()[0].data.c.get_counts()`
  is exercised. No change needed.
- **§15.1 Grover bound — applied (`757a20e`):** stated the exact
  success probability $\sin^2((2k+1)\theta)$ and derived the $\ge 1-M/N$
  guarantee from $(2k+1)\theta$ landing within $\theta$ of $\pi/2$, rather
  than asserting the bound.
- **§8.12, §15.3, §15.8, §15.10 "still need dated external
  fact-checking before publication":** these now carry explicit
  dated-snapshot caveats; the residual ask is a pre-publication
  fact-check pass tracked in `docs/fact-check-ledger.md`, not a
  manuscript defect.
- **Build blocker (mdbook 0.5.3 in the reviewer's env):** the reviewer
  confirms the version guard now warns correctly. Resolving 0.5.x at the
  mdbook-katex level is outside what can be done/tested here; the pin +
  guard is the durable fix, and our build on mdbook 0.4.48 is verified
  (0 KaTeX errors).

## Reviewer fourth reconciliation (2026-05-29 00:26 CEST)

Confirmed landed: §12.4 resource ledger and §15.1 exact Grover bound
are "materially fixed". The remaining "still open" entries are all
either (a) ledger-tracked pre-publication fact-checks (§8.12, §15.3,
§15.8, §15.10), (b) Qiskit checks I have verified empirically on 2.4.1
but the reviewer cannot run in their env (§9.1, §14.2, §15.1
`StatevectorSampler`), or (c) the mdbook 0.5.x build blocker. The one
genuinely new, actionable ask was a **documentation ownership gap**:

- **Build/tooling setup + troubleshooting docs — applied
  (`087154c`):** added a "Building the rendered book" subsection to
  `PROCESS.md` answering the reviewer's five questions explicitly —
  required mdbook range (`>=0.4,<0.5`, hard prerequisite, tested 0.4.48),
  required mdbook-katex (`0.9.4`), exact install/downgrade commands
  (`--locked --force`), whether `book-build/` is safe to delete (yes,
  regenerated each run; not the cause), the 0.5.x failure symptom and
  cause, and explicit ownership ("mdbook 0.5.x support is out of scope
  for now; 0.4.x is the supported line"). README now points to it.

This is the last open item from the reconciliations; everything else is
either applied/verified or a tracked pre-publication fact-check.

## Reviewer fifth review (2026-05-29 00:40 CEST)

The reviewer read the two toolchain-doc commits and confirmed the
"who owns this / what should users do?" ambiguity is resolved; the
build failure in their env is now "the expected result of an
unsupported `mdbook 0.5.x`", not a repository-instructions problem.
One trivial polish remained and is applied:

- **README install snippet missing `--force` — applied (the commit below):**
  added `--force` to both `cargo install` commands in the README so the
  snippet also covers the downgrade-from-0.5.x case (PROCESS.md already
  had it). No other findings; the reviewer's assessment is all-clear.

No manuscript or technical findings remain across all five
reconciliation rounds.

## Perishable-claim warnings + publication gate (post-review hardening)

Beyond closing the review, a durable safeguard was added for the
time-sensitive claims the reviewer kept flagging as "needs dated
fact-check before publication". Rather than rely on the ledger alone (or
on invisible markers a draft reader would never see), each perishable
section now carries a **visible, dated "Moving-target warning"** callout
telling the reader the figures were accurate as of **May 2026** and must
be re-verified against current sources. Sections: §1.6, §3.9, §8.12,
§9.8, §15.3, §15.8, §15.10, and Appendix F.

The bold lead doubles as a greppable sentinel wired into `tools/lint.py`
as a **publication gate**: harmless while a file is `draft`/`reviewed`,
but a hard lint failure once a file is marked `final` — so a perishable
number cannot ship unverified. Documented in `PROCESS.md` (*Perishable
claims*). Dated to month + year to match the `docs/fact-check-ledger.md`
`YYYY-MM` granularity, since hardware figures move within months.

## Process to close

1. For each NEEDS-VERIFICATION row: re-read the actual current
   manuscript text, decide APPLY / RETHINK / REJECT, and update this row
   in the table.
2. Batch the APPLY items into one or two commits, citing this doc.
3. When the table has zero NEEDS-VERIFICATION rows **and** the user
   has explicitly signed off on the final state, delete
   `review-2026-05-28-0105.md` in a final commit that points at this
   disposition record as the canonical closing artefact. **The review
   file is not deleted while processing is ongoing.**
