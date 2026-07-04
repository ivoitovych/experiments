# Comprehensive Book Review — 2026-07-03 18:43 UTC

## 1. Review metadata

- **Date and time:** 2026-07-03 18:43 UTC
- **Repository:** `ivoitovych/experiments` — *Quantum Computing for Experienced Developers: A Structured Guide from Core Principles to Modern Practice*
- **Branch:** `claude/init-quantum-computing-iaiRN`
- **Commit:** `6aaaaef` (local == origin at review start)
- **Review scope:** the full manuscript under `book/` (48 files, 14,989 lines), reviewed at section/sub-unit granularity; supporting project files reviewed at file granularity. Tooling code was covered by the separate 2026-06-17 code review (`review/code-review-2026-06-17-1840.md`) and is only re-checked here where it touches the reader experience.
- **Reviewer mode:** single-agent comprehensive review (Claude, AI reviewer).
- **Status:** COMPLETE — all 48 book files reviewed section-by-section (§7), non-manuscript files reviewed at file granularity, global sections (§2, §5, §6, §8–§14) synthesized from on-disk collectors. Completed 2026-07-03, same session, 15 incremental backup commits.
- **Process note:** findings were written **incrementally** — each file/section review was appended to this document immediately after that unit was reviewed; cross-cutting findings were accumulated in on-disk collectors and merged into §8–§12 at the end. Global synthesis (§2, §5, §6, §13, §14) was inserted after the unit pass completed. The document was lightly normalized at the end.
- **Book description:** a rigorous, engineering-oriented, anti-hype guide to quantum computing for experienced software developers: foundations → qubits/entanglement → gates/circuits → measurement/information → algorithms → complexity → noise/QEC → hardware/software → practice → applications → adjacent models → epistemics. Written in GitHub-flavoured Markdown with native MathJax math as the primary render target; mdBook as secondary. All 48 files at status `draft`.

## 2. Executive summary

**Verdict: this is a genuinely excellent book in draft form — the strongest practitioner-oriented quantum computing text this reviewer has seen — with a defect profile typical of a fast-written first draft: zero structural problems, a sound learning sequence, consistently honoured conventions, and a long tail of local, fixable errors.**

All 48 book files were reviewed section-by-section (§7), every checkable mathematical claim was recomputed, and the code examples were verified against their outputs. Headline numbers: **~20 confirmed correctness errors** (2 High-impact: the Preface endianness example contradicting §4.8, and the Prelude's typographic divergence; ~8 Medium: including a false unconditional-separation claim in Ch17, the GHZ/bond-dimension inversion in Ch24, the misattributed Schnorr case study in Ch36, and a wrong one-CNOT criterion in Appendix C), **~12 cross-chapter inconsistencies** (mostly hardware numbers that should defer to Appendix F), and **~35 flagged-for-verification items** routed to the uncertainty ledger (§10) rather than asserted. The most error-dense chapters are Ch17 and Ch22/Ch24; the cleanest are Ch11, Ch27 (byte-exact FIPS parameters), Ch31, Ch35, and Appendix B (every matrix verified, zero errors).

What the book does exceptionally well: an authorial voice that makes 37 chapters readable (priority 1 — see §11); a pedagogical architecture with fix-conventions-once discipline, failure-first sequencing, and honest deflationary calibration on QAOA/QML/annealing that will age well (priority 2); Qiskit-facing correctness precisely where books usually fail (endianness, QFT sign, API lifecycle); and project infrastructure (generated progress/index, renderer-bug memo, factcheck mirror, runnable examples matching all inline listings) far above manuscript-repo norms (priority 6).

The single most valuable systematic fix: **declare Appendix F the sole source of perishable hardware numbers and make Chapters 20/22/25 defer to it** — this dissolves most cross-chapter inconsistencies at a stroke. The full prioritized list is §13. Nothing found in this review challenges the book's viability; everything found is reachable in one focused revision pass.

## 3. Project inventory

**Manuscript (`book/`, 48 files, 14,989 lines) in intended reading order** (order confirmed against `README.md` TOC, `scripts/scaffold.py` `ENTRIES`, and prev/next nav links, which all agree):

| # | File | Lines | Role |
|---|---|---|---|
| 1 | `00-front-matter/00-preface.md` | 406 | Preface |
| 2 | `00-front-matter/01-background-and-self-check.md` | 500 | Assumed background + self-check |
| 3 | `00-front-matter/02-notation-and-conventions.md` | 508 | Notation |
| 4 | `part-00-historical-prelude/00-historical-prelude.md` | 480 | Historical Prelude (unnumbered) |
| 5–7 | `part-01-orientation/` Ch 1–3 | 117/132/745 | Orientation |
| 8–9 | `part-02-formalism/` Ch 4–5 | 1401/775 | Math background; postulates |
| 10–11 | `part-03-qubits/` Ch 6–7 | 480/210 | Qubit; entanglement |
| 12–14 | `part-04-gates-and-circuits/` Ch 8–10 | 219/162/273 | Gates; circuits; phenomena |
| 15–16 | `part-05-measurement-and-information/` Ch 11–12 | 165/706 | Measurement; information |
| 17–20 | `part-06-algorithms/` Ch 13–16 | 161/152/165/230 | Algorithms |
| 21 | `part-07-complexity/` Ch 17 | 330 | Complexity |
| 22–23 | `part-08-noise-and-qec/` Ch 18–19 | 352/340 | Noise; QEC |
| 24–28 | `part-09-hardware-and-software/` Ch 20–24 | 141–280 | Hardware/control/metrics/tooling/simulation |
| 29–30 | `part-10-practice-and-era/` Ch 25–26 | 140/134 | NISQ era; hands-on |
| 31–35 | `part-11-applications/` Ch 27–31 | 121–227 | Applications |
| 36–37 | `part-12-adjacent-models/` Ch 32–33 | 160/154 | Adjacent models; networking |
| 38–41 | `part-13-perspective-and-direction/` Ch 34–37 | 137/636/161/152 | Perspective/epistemics |
| 42–48 | `99-back-matter/` App A–F + Index | 364/441/384/328/538/175/126 | Appendices |

**Supporting files:** `README.md` (landing + TOC), `TOC.md` (section-level TOC), `BookDescription.md` (charter), `STYLE.md`, `PROCESS.md`, `HISTORY.md`, `PROGRESS.md` (generated), `INSTRUCTIONS.md`, `LICENSE`, `CITATION.cff`.

**Tooling:** `scripts/` (9 py: scaffold/build/progress/index/factcheck×2/phases/retrofit/check_examples), `tools/` (lint, screenshots, render-gist), `figures-src/` (Qiskit figure generator + requirements), `Makefile` (14 targets). No CI.

**Assets:** 15 committed SVG circuit figures (all 15 referenced ↔ all 15 present — verified). `examples/` — 4 runnable Qiskit scripts.

**Fact-check:** `factcheck/` — 52 v1 interim mirror files + v2 card spec/template/pilot; `docs/fact-check-ledger.md` (7 dated passes).

**Docs:** `docs/github-markdown-math-bugs.md` (canonical renderer-bug memo), `docs/render-tests/math-context-matrix.md` (live test sheet), upstream-feedback drafts, review disposition.

**Stale/process files at repo root** (affect interpretation; flagged in findings): `chapter0_attempt1–4.md`, `chapter_0_review_1–4.md`, `historical_chapter__*.md` (2), `review-2026-05-29/30-*.md` — working artifacts of past review cycles, not manuscript. Also both `review/` (code review) and now `reviews/` (this review) exist — naming inconsistency noted in findings.

## 4. Fine-grained review plan

**Unit definition.** The atomic review unit is the `##` section (the manuscript's own numbered sections, e.g. §4.5), with sub-units (display-formula blocks, code blocks, tables, figures, sanity-check blockquotes, callouts) examined inside each unit and called out individually when a finding attaches to one. Front/back matter without numbered sections is reviewed per `##` heading. Chapter openings and endings are additionally assessed as units (hook / payoff).

**Per-unit checks** (applied to every unit): (a) conceptual/factual/mathematical/code correctness; (b) pedagogical sequence — every symbol/term defined before use, forward references marked; (c) reader clarity; (d) reader entertainment — hook, payoff, voice, rhythm; (e) completeness within the section's promise; (f) GitHub-rendering risk (math escaping, tables, anchors, figures); (g) cross-reference/link integrity.

**Order of work** = intended reading order (table in §3), so sequence/dependency problems surface naturally: front matter → Prelude → Parts I–XIII → Appendices → Index. Non-manuscript files last (README, TOC.md, STYLE/PROCESS/HISTORY, examples, figures) at file granularity.

**Global automated pass** (run before unit reviews; results in §5/§10): `tools/lint.py` (structural + renderer-gotcha rules) — **clean, 48 files**; `build_book.py --selftest` — **pass**; TODO/FIXME scan — **0**; duplicate-H2-per-file scan (anchor collisions) — **0**; empty-alt-image scan — **0**; figure reference↔presence — **15/15**; external `](http…)` links in book/ — **0** (citations are prose, not hyperlinks); mermaid — none; status-block audit — 1 template literal found (Notation:429), 21 Phase-number mismatches vs `scripts/phases.py`.

**Verification depth declared:** math re-derived where feasible at read time; standard results checked against reviewer knowledge; perishable 2024–2026 claims checked against `docs/fact-check-ledger.md` and marked "verify" where the ledger is silent; code examples read line-by-line (not executed here — Qiskit venv not installed; noted in §9); GitHub rendering assessed against the project's own bug memo `docs/github-markdown-math-bugs.md` (which encodes empirically confirmed GitHub behavior) plus lint — pixel-level confirmation flagged for the screenshot pipeline where risk remains.

## 5. Global assessment

Assessed against the six review priorities, in order:

**1. Entertainment/engagement — Excellent.** Sustained authorial voice across 37 chapters; the aphorisms carry content rather than decorating it; the deflationary honesty (Ch15 §15.10, Ch25, Ch29, Ch30) reads as confidence, not cynicism. Weakest: Historical Prelude paragraph density. Details in §11.

**2. Pedagogy/learning sequence — Excellent.** The dependency chain (§6) is sound: nothing is used before it is defined, conventions are fixed once and honoured at every verified use site, and forward references are invitations rather than prerequisites (a policy STYLE.md states and the text obeys). The how-to-read blocks, sanity-check discipline (2 lapses in 40+ files), and deliberate cross-chapter echoes (Robertson vacuousness in Ch10 and Ch35; the repeated dequantisation checklist at three altitudes) are design, not accident.

**3. Correctness — Good, with a fixable tail.** ~20 confirmed errors across ~9,000 lines of dense technical prose is a strong ratio for a draft, and none is load-bearing: every error is local, and in several cases the book contradicts itself in a way that makes the fix self-evident (the correct version already exists in another chapter — e.g. §8.14 vs App C; §36.4 vs §36.7). The physics core (Parts 2–5) and the reference appendices A/B are the cleanest; the perishable-numbers chapters (17, 22, 24) carry most of the defects. Inventory in §8.

**4. Completeness — Very good.** Everything promised is delivered; the genuine gaps are enumerable on one hand (TF-QKD cross-ref, banded QFT, index depth, five missing figures) — §12.

**5. Rendering — Excellent.** The house escaping discipline survives 41 files essentially without a lapse; the Bug-5 table policy is obeyed book-wide; one file (Prelude) diverges typographically. §9.

**6. Project quality — Excellent with cosmetic deductions.** Generated artifacts are consistent with sources; the factcheck infrastructure is ahead of the manuscript's own needs; root-directory clutter and STYLE.md gaps are the deductions. §12.

**Overall:** publishable quality after one systematic revision pass; the review's §13 list is scoped to be executable in days, not months.

## 6. Concept-dependency and learning-sequence review

The book's stated dependency spine (Preface; STYLE.md cross-reference policy) is: Ch4–5 (formalism) → Ch6–7 (qubits) → Ch8–10 (gates/circuits/phenomena) → Ch11–12 (measurement/information) → everything else, with Parts 10–13 explicitly designed for cold entry. The review traced every cross-reference it encountered against this spine (150+ verified individually in §7). Findings:

**The spine holds.** No concept was found used-before-defined along the main sequence. The three global conventions (MSB-leftmost ordering with the §4.8 Qiskit reconciliation; QFT-sign-minus per §4.13; conjugate-linear-first inner product per §4.3) were checked at every use site the review examined — Ch13/14's QFT treatment even correctly derives that the book's convention makes QPE end in a *forward* QFT, the kind of place convention drift usually hides. One systemic violation class was found: Ch7's zero-based qubit labelling (pre-compaction finding), which Ch9 §9.1 then compounds by citing Ch7 for the convention (finding at Ch9).

**Cross-reference accuracy: ~95%.** Verified-correct links dominate; the wrong ones are catalogued in §8/§13 (Ch19's §5.7-for-no-cloning; Ch11's §5.11-for-partial-trace; Ch12's "Part 12 (cryptography)"; App C's MUB→Ch12 pointing at nonexistent content). The Ch32 hub — six chapters' forward promises — resolved 5/6 cleanly when finally read; the accumulated-checklist method caught the one weak promise (thermodynamic resource theory).

**Redundancy is deliberate and well-managed.** The same material appears at multiple altitudes by design (mitigation in Ch18/Ch25; QKD in Ch27/Ch33; dequantisation in Ch13/16/17/30/36) and the instances are mutually consistent in content — the failures are of *cross-linking* (Ch25 re-explains without citing §18.18; Ch27 omits what Ch33 covers), not of contradiction, with the one narrative exception (IBM-utility story) flagged in §8.

**Reading-path integrity:** the README's four entry paths were checked against chapter prerequisites and are honest — the algorithms-first path in particular works because Ch13 re-establishes the needed mindset without assuming Parts 3–5 were read carefully.

## 7. Section-by-section review

*(Units appear in reading order. Format per file: overall assessment + per-section notes + findings table. Severity: Critical/High/Medium/Low/Nit. Certainty: certain/uncertain.)*


---

### File: `book/00-front-matter/00-preface.md` (406 lines, 12 sections)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — Historical-Prelude mention added to *How to Use* and *Suggested Reading Paths*; status block 12/12; "trapped-ion ion trap" stutter; exact "thirty-seven"; **High endianness-example finding** rewritten to name both mappings (recommended mapping → strings coincide; naive q0 mapping → reversed); exercise-policy exception extended to cover Chapter 3's inline answers. DEFERRED — Phase-number sync (needs a phases.py re-baseline decision, flagged for author).

**Overall.** A strong preface: confident authorial voice, honest scope-setting, unusually concrete conventions summary. The opening hook (two false reputations of QC, "the noise between them obscures something more interesting") earns the reader's attention; the closing hand-off to the self-check chapter is clean. Middle administrative sections (How to Use / Core Topics / Reading Paths) are dry but purposeful; the five named reading paths are genuinely useful and rare in technical books.

**Per-section assessment.**
- *Why This Book Exists* — Entertainment: strong hook. Correctness: fair characterization of N&C. No issues.
- *Who This Book Is For* — clear, checkable prerequisites; `$\mathbb{C}^{2^n}$` renders safely. Good.
- *What "Experienced Developer" Means* — good calibration; "not assuming you want to derive every result" sets tone honestly.
- *What This Book Is Not* — the strongest section; "The mathematics is the explanation" is a keeper line.
- *How to Use This Book* — claims "most chapters end with a small set of sanity-check exercises"; flagged for verification during chapter reviews.
- *Core Topics / Deep Dives / Frontier* — clean 3-tier map (Parts I–VI / VII–X / XI–XIII).
- *Reading Linearly vs Selectively* — duplicates some content of How-to-Use but acceptable under the book's controlled-duplication policy.
- *Suggested Reading Paths* — five concrete paths; excellent reader service.
- *A Note on Conventions* — verified: bit-order formula `Σ x_i·2^{n-i}` is correct for leftmost-MSB; CNOT `diag(I, X)` correct for control-first; QFT negative-exponent statement consistent with §4.13. Escaped set braces `\\{0,1\\}^n` follow the house escaping rule.
- *A Note on the 2026 Timestamp* — exemplary perishability discipline.
- *Acknowledgements, License* — fine.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | completeness/consistency | *How to Use This Book*, *Reading Paths* (~165–290) | The Preface never mentions the **Historical Prelude** — a 480-line chapter sitting between front matter and Ch 1. "thirteen parts spanning roughly thirty-seven chapters" describes the pre-Prelude structure; none of the five reading paths says whether to include or skip the Prelude, though skippability guidance is exactly what this section provides for everything else. | Add one sentence in *How to Use* acknowledging the unnumbered Prelude and one clause in the reading paths ("optionally begin with the Historical Prelude"). Local fix. | certain |
| Low | consistency | status block (line 3) | Block says "Sections drafted: 11 / 11" but the file has **12** `##` sections; scaffold `ENTRIES` lists only 8 planned sections for the Preface (three "A Note…"/License sections were added without updating either count). | Update block to 12/12; optionally sync `scaffold.py` ENTRIES. Local. | certain |
| Low | consistency | status block | **Phase: 1** but `scripts/phases.py` assigns the Preface Phase 6 (part of the 21-file global mismatch — see §5). | Correct the block (or re-baseline phases.py). Local. | certain |
| Nit | style | *What This Book Is Not* (~150) | "dilution refrigerator, or trapped-ion ion trap" — "trapped-ion ion trap" stutters. | "…or ion trap". | certain |
| Nit | style | *How to Use* (~165) | "roughly thirty-seven chapters" — the count is exactly 37; hedging an exact number reads oddly. | "thirty-seven chapters". | certain |

**Rendering risk:** none beyond house-standard math (lint-clean). **Pedagogy:** appropriate; promises ("no chapter needs a forward reference to make sense") tracked against later chapters.

---

### File: `book/00-front-matter/01-background-and-self-check.md` (500 lines, §1.1–§1.7 + §1.3.1)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — §1.3.1 identity corrected to A = 2I + X (with eigenvalue explanation 3 = 2+1, 1 = 2−1). DEFERRED — §1.x renumbering (scheme choice — unnumbered vs SC.x — is authorial; problem numbers 1.3.1 etc. are load-bearing); Phase sync; §1.2-pointer nit left ("most" is defensible per the review's own note).

**Overall.** An unusually good prerequisites chapter: instead of a list of topics, it gives 14 worked sample problems with inline answers and an explicit calibration rule ("two or more problems out of reach → treat the cited reference as required"). The closing DSP section is a genuine engagement win (the reversal — "readers who learn quantum computing first often report a clearer intuition for classical DSP afterwards" — is a memorable payoff). Every sample-problem answer was re-derived during this review; **13 of 14 are fully correct**, one contains a checkable algebra slip in its commentary (below).

**Sub-unit verification (math).** 1.1.1 unitarity check ✓; 1.1.2 index of `|01⟩` = 1 ✓; 1.3.1 eigenvalues 3, 1 and eigenvectors ✓ *but see finding*; 1.3.2 `H² = I` ✓; 1.3.3 `X⊗Z` matrix ✓ (block rule correctly explained); 1.3.4 `tr(A⊗B)=ab`, `det(A⊗B)=αⁿβᵐ` ✓; 1.3.5 rank–nullity ✓; 1.3.6 `(1+i)⁴ = −4` ✓; 1.3.7 `R(θ)` unitary, eigenvalues `e^{±iθ}` ✓; 1.4.1 binomial mean/variance ✓; 1.4.2 Bayes ≈ 0.0098 ✓ (recomputed); 1.4.3 shot-noise `≤ 1/(2√N)`, `N ~ 10⁴` ✓; 1.5.1 growth ordering ✓ incl. the L[1/3]-vs-L[1/2] GNFS refinement; 1.5.2 BQP-vs-NP status ✓.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | mathematical | §1.3.1 answer, sample problem 1.3.1 (~line 162) | "These are also the eigenvectors of the Pauli X matrix, which is no coincidence — **A = I + X**." False: `I + X = [[1,1],[1,1]]`, whereas `A = [[2,1],[1,2]] = 2I + X`. The answer's eigen-data is right, but the explanatory identity is wrong — worst possible place for an error, since this chapter is the reader's calibration instrument. | Change to "A = 2I + X". (Eigenvalues 3 = 2+1 and 1 = 2−1 then also become self-explanatory.) Local. | certain |
| Medium | structure/consistency | whole file (headings §1.1–§1.7) | **Section-number collision with Chapter 1**: this front-matter chapter numbers its sections 1.1–1.7 while Chapter 1 (*Why Quantum Computing Exists*) also owns §1.1–§1.6. Any book-wide reference "§1.x" is ambiguous; the glossary/index and cross-refs from other chapters could silently point at the wrong chapter. | Renumber the self-check sections (e.g. unnumbered headings, or a "B.x"/"SC.x" scheme; "0.x" is taken by the Prelude). Requires touching internal refs (line 11 "§1.6", §1.6 decision rule, §1.7 header refs) — broader than local but mechanical. | certain |
| Low | consistency | status block | Phase 1 claimed; `phases.py` says 6 (global mismatch item). | Sync. Local. | certain |
| Nit | completeness | intro (~line 10) | "most sections close with a standard reference" — §1.2 and §1.7 do not; harmless but slightly over-promises. | "most" is defensible; optionally add a pointer in §1.2. | certain |

**Cross-reference spot-checks:** references §4.2 (ordering), §4.5 (PSD), §4.7 (matrix exponential), §4.9 (SVD), §4.13 (QFT), §14.6 (phase estimation) — all consistent with the post-swap Chapter 4 layout; re-verified when Ch 4 is reviewed below. Note the §1.5.1 GNFS passage is one of the 22 stale v1 factcheck anchors (manuscript improved; mirror not updated) — factcheck-system issue, not a manuscript issue.

**Entertainment:** good — problems give rhythm; base-rate problem (1.4.2) is a hook with a forward payoff ("the same inversion drives the analysis of every probabilistic quantum subroutine"). **Pedagogy:** exemplary calibration design. **Rendering:** all display `pmatrix` blocks use house `\\\\` row-break escaping; `\\{…\\}`, `\\,`, `\\|` all correctly doubled; no inline environments; lint-clean.

---

### File: `book/00-front-matter/02-notation-and-conventions.md` (508 lines, §2.1–§2.7)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — §2.7 live status-block example fenced in ```text; I_n qubit-count warning added; ω/little-omega disambiguation note; "Infinite-dimensional" line-wrap joined. DEFERRED — §2.x renumbering (same authorial decision as the self-check file); Phase sync.

**Overall.** A model conventions chapter: it names the collisions (bra-ket vs set braces, bars vs modulus, book-vs-Qiskit endianness) instead of pretending they don't exist, and it wires the source-level escaping rules to the project's own renderer-bug memo. Voice survives even here ("mis-counting the bars is the most common type-signature bug in quantum-mechanical notation"; "it just needs to be findable when a later formula does not type-check").

**Sub-unit verification (math).** Pauli/H/S/T matrices ✓; anticommutation `{X,Y}={Y,Z}={X,Z}=0` ✓; five-norm taxonomy (modulus/2-norm/spectral/trace/HS + operator absolute value) correct and well-distinguished ✓; conjugate-linearity display ✓; resolution of identity ✓; `idx(x₁…xₙ)=Σxᵢ2^{n−i}` consistent with Preface ✓; Qiskit-endian mapping rule (book leftmost ↔ Qiskit highest-numbered) ✓; tensor identities incl. `tr_W(A⊗B)=A·tr(B)` ✓; `CNOT = |0⟩⟨0|⊗I + |1⟩⟨1|⊗X` ✓; QFT negative-exponent form consistent with Preface and (claimed) §4.13 ✓; "apply `U†` then measure computational = measure in columns-of-`U` basis" ✓ (re-derived).

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | structure/consistency | headings §2.1–§2.7 (whole file) | **Same section-number collision as the self-check chapter**: front matter claims §2.x while Chapter 2 (*Classical-to-Quantum Contrast*) also owns §2.x. Together with file 2 this is one systematic defect: two front-matter files squat on the §1.x/§2.x namespaces. Book-wide "§2.3" is ambiguous (front-matter Dirac notation vs Ch 2's section). | One scheme change for both files (unnumbered, or N.x with reserved letters). Mechanical but multi-file. | certain |
| Low | rendering/maintenance | §2.7 status-block illustration (line 429) | The example status block `> **Status:** *state* · **Phase:** N …` is a **live blockquote, not a fenced code sample**. Current tooling survives it by accident (`generate_progress` takes the first match and requires numeric Phase; lint takes first match) — but any future scan-all-matches tool will trip on it, and the global status-block audit in this very review initially flagged it as an anomaly. | Wrap the example in a ```text fence. Local. | certain |
| Low | consistency | §2.2 (~line 135) | `$I_n$` is defined as identity **on n qubits** (2ⁿ×2ⁿ) — colliding with the near-universal convention Iₙ = n×n identity (which the book's own code, e.g. `np.eye(4)` in the self-check, implicitly uses). Risk of silent dimension confusion in later chapters. | Either adopt dimension-subscripting or add an explicit "subscript counts qubits, not dimension" warning; audit later usages. Watch-item — usage checked in later chapters below. | certain (definition), uncertain (downstream impact) |
| Nit | consistency | §2.1 (~lines 84, 109) | Little-omega `ω(g(n))` and root-of-unity `ω` share a glyph within the same chapter; σ's collision gets an explicit disambiguation note, ω's does not. | Add "disambiguated by context" note as done for σ. Local. | certain |
| Nit | rendering | §2.1 (~line 42) | Source line-wrap "Infinite-\ndimensional" renders as "Infinite- dimensional" (hyphen + space) in HTML. | Join the line or rewrap. Local. | certain |
| Low | consistency | status block | Sections count 7/7 ✓, but Phase 1 claimed; part of global Phase-mismatch set. | Sync with phases.py. | certain |

**Link/anchor spot-checks:** `#416-conventions-at-a-glance`, `#48-tensor-products`, `#413-fourier-transform-basics` — anchor slugs follow GitHub's rules; heading existence verified in the Ch 4 review below. **Entertainment:** good for a reference chapter — collisions-as-narrative works. **Pedagogy:** "skim now, bookmark for later" framing is right. **Completeness:** does what it promises; the forbidden-patterns list mirrors lint exactly (checked against `tools/lint.py`).

---

### File: `book/part-00-historical-prelude/00-historical-prelude.md` (480 lines, §0.1–§0.16 + timeline + source notes)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** ADJUDICATED per the review's own alternatives — (i) the code-span math style and (ii) the Episode H1 structure are now *documented as deliberate file-local conventions in STYLE.md* (the review's "record as accepted convention" option; conversion would churn the book's most-verified file for no reader benefit). Status 16/16 confirmed consistent under the new STYLE.md counting rule (numbered sections only). DEFERRED — paragraph splitting and runway consolidation (content-preserving editorial surgery on a heavily reviewed file; needs an author pass with the review's seam list); fact-check ledger rows (routed to factcheck/ per that system's own guidance).

**Reviewer disclosure.** This file received heavy verified-review iteration during June 2026 (multiple rounds, all logged in `HISTORY.md` Phase 13), with this reviewer involved. The pass below deliberately targets what those rounds did *not* address: document structure, typography consistency, and rhythm.

**Overall.** Content-wise this is now the most battle-tested chapter in the book: the 2015 Bell-test statistics are split per-platform (Delft `p = 0.039` vs photonic `p < 10⁻⁶`), NIST PQC status is precise (203/204/205 final, FN-DSA draft, HQC selected-not-finalised), Majorana 1/2 and Quantinuum Helios carry provenance labels and datestamps, Bohm/Manin/Ekert/Yao/circuit-model bridges are in place, and the anti-hype checkpoints are well-positioned. Signature lines ("Atoms should not exist. They do."; "wrong by infinity"; "Benioff made it possible, Feynman made it necessary, Deutsch made it universal") give it real narrative pull. Fact content re-checked as of this review date: still current (July 2026).

**Fresh findings (this pass).**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | consistency/rendering | entire file | **All math in the Prelude is written as backtick code spans with Unicode** (`` `a^r ≡ 1 (mod N)` ``, `` `|Φ⁺⟩ = (|00⟩+|11⟩)/√2` ``) — not `$…$` LaTeX. `STYLE.md` states "Math is written in LaTeX"; Chapters 1–37 use `$` math. The Prelude therefore renders its formulas in monospace code style, typographically inconsistent with the whole rest of the book. (Upside: immune to every GitHub math bug; readable.) | Decide deliberately: either record "Prelude uses code-style math" as an accepted local convention in STYLE.md, or convert to LaTeX math in a dedicated pass. Not a silent drift to leave unadjudicated. | certain (divergence); uncertain (intent) |
| Medium | structure/rendering | lines 43/101/189/271 | **Five H1 headings in one file** (`# Episode I…IV` + the title). Violates heading hierarchy: GitHub's outline widget and any TOC generator see five document titles; the screenshot tool slices by H2 and never captures Episode headers as units; semantic HTML gets multiple `<h1>`. | Demote Episodes to `##` and §0.x to `###` (mechanical, but touches the status-block section counter and screenshot slicing), or accept and document. | certain |
| Medium | entertainment/readability | ~22 paragraphs > 1,500 chars (max 3,201 — the §0.12 Shor block) | Long single-block paragraphs create a wall-of-text rhythm exactly where cognitive load peaks (Shor four-step, threshold theorem, below-threshold 2024–25). Multiple prior external reviews flagged pacing; content-preserving fixes were deferred. **Splitting paragraphs deletes nothing** and is compatible with the book's no-deletion principle. | Split the >1,500-char paragraphs at their internal seams (numbered steps are natural break points). Local, zero content loss. | certain |
| Low | entertainment | intro (lines 7–41) | Long runway: ~9 framing blocks (opener, skippability, How-to-read, thesis, reassurance, reader-contract, Episode table, map sentence, drama paragraph) before §0.1. Each block earns its place individually; collectively the thesis is restated 3–4×. Known and deliberately kept; recorded here as a standing entertainment cost. | Merge overlapping thesis statements (consolidation ≠ deletion). | certain |
| Nit | consistency | status block | "16/16" counts only numbered sections; file has 18 H2s (timeline + source notes uncounted). Harmless; note for the counting convention. | Optionally 18/18 or document the convention. | certain |
| Low | project/process | perishable claims | The Prelude's dated claims (Willow, Helios, Majorana 2, HQC) are **not yet rows in `docs/fact-check-ledger.md`** (open thread per HISTORY.md §13). | Add ledger rows so freshness tracking covers the Prelude. | certain |

**Sections spot-checked again this pass (no new content issues):** §0.2 equipartition (k_BT/mode) ✓; §0.4 Kennard/Robertson attribution ✓; §0.6 Bohm bridge + Garg–Mermin 82.8% vs Eberhard 2/3 ✓; §0.9 Landauer unknown-bit reset + demon ✓; §0.11 "three steps over five years" still coherent after Manin/Lloyd additions (Manin folded into step 1; Lloyd explicitly post-triad) ✓; §0.12 mechanism table ✓; §0.16 reversals table ✓. **Entertainment:** strongest opening chapter in the book once past the runway. **Pedagogy:** survival definitions + anti-hype checkpoints exemplary. **Rendering:** no `$`-math at all (see finding), so zero math-bug exposure; tables well-formed.

---

### File: `book/part-01-orientation/01-why-quantum-computing-exists.md` (117 lines, §1.1–§1.7)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — §1.3 tier renamed "Polynomial (Grover-type and quantum-walk)" with per-item exponents (N^{2/3}, N^{1/3} vs birthday N^{1/2}); collision finding removed from the Grover-quadratic list; intro aligned to "years to decades"; status 7/7. NO CHANGE NEEDED — §14.1 Deutsch reference verified correct. Part-numeral convention documented in STYLE.md (see batch-4 commit).

**Overall.** Excellent opening chapter — arguably the best entertainment-per-line in the book. The self-aware contract ("It is the only chapter in the book that is allowed to gesture; every subsequent chapter pays the gesture back") and the earned slogan ("interference, not parallelism, and we will earn it") give the reader both permission and a promise. §1.4's million-qubit web-stack thought experiment is a perfectly pitched concrete hook for the target audience. The Moving-target warning on §1.6 is exactly right. Ends with 5 sanity checks whose answers are all recoverable from the chapter (Preface's exercise promise: ✓ for Ch 1).

**Per-section.** §1.1 Feynman/Deutsch framing — correct, well-sourced, `2^300` illustration lands. §1.2 anti-parallelism — the book's central calibration, done well. §1.3 four-paper stakes — see finding on the "quadratic" taxonomy. §1.4 negative space — the most valuable section for practitioners; sorting bound stated safely. §1.5 advantage-vs-utility — honest; Sycamore framing matches Prelude. §1.6 hardware snapshot — numbers match `docs/fact-check-ledger.md` (H2=56, Forte #AQ 29, Willow below-threshold, 10³–10⁴ phys/logical); dated and hedged. §1.7 bridge + sanity checks — good closure.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | mathematical | §1.3 taxonomy "**Quadratic**" (~line 53) and §1.3 Grover para (~43) | Collision finding and element distinctness are filed under *quadratic* speedups. Neither is quadratic: element distinctness is `O(N^{2/3})` vs classical `Θ(N)` (Ambainis, a 3/2-power gain); collision is `O(N^{1/3})` vs classical birthday `O(N^{1/2})` (BHT, also sub-quadratic). Grover-derived SAT speedups are quadratic; these two are not. | Rename the tier "Polynomial (Grover-type and quantum-walk)" and state per-item exponents, or drop the two non-quadratic examples from this tier. Local. | certain |
| Low | consistency | status block | "Sections drafted: 6 / 6" but the file has 7 `##` sections (§1.7 Bridge added post-scaffold). Same drift class as the Preface. | 7/7; sync scaffold ENTRIES. | certain |
| Low | consistency | §1.2/§1.7 (~29, 105) | Part references written in Arabic ("Part 1", "Part 2", "Part 6") while README/TOC/preface use Roman ("Part I", "Part VI"). | Normalize to Roman book-wide (grep-able). | certain |
| Low | sequence | §1.1 (~line 21) | "the Deutsch problem of **§14.1**" — the index maps Deutsch–Jozsa to §14.2; whether the 1-bit Deutsch problem lives in §14.1 needs confirmation. | Verified against Ch 14 below (see that file's entry). | uncertain → resolved below |
| Nit | consistency | intro (~line 9) vs §1.6 | Intro: Shor at scale "still **decades** from realising"; §1.6/§1.7: "**years to decades**, depending on whose estimate". Slight internal drift in the same chapter. | Align both on "years to decades". Local. | certain |

**Entertainment:** high — hooks, negative space, and honest stakes. **Pedagogy:** perfect placement of the anti-hype calibration before any formalism. **Correctness:** all checkable claims verified except the taxonomy item above. **Rendering:** house escaping correct (`\\,` in `$A\\,x=b$`); no risky constructs.

---

### File: `book/part-01-orientation/02-classical-to-quantum-contrast.md` (132 lines, §2.1–§2.7)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — §2.6 retitled "Hardware Reality: The Cost Asymmetry"; "circuit volume" → "gate-count budget" aligned with Ch22 §22.5; T-gate π/8 naming trap defused (phase e^{iπ/4} stated); kickback attribution redirected from §2.2 to Chapter 14. (§7.12 cross-ref had verified correct — no change.)

**Overall.** A very effective orientation chapter built on a repeatable rhetorical device — each section ends with a one-sentence contrast ("a classical bit *is* one of two values; a qubit is a vector that *evaluates to* one of two values when forced to") — and on analogies precisely tuned to the audience (no-cloning as a *move-only type* in C++/Rust; measurement as an *I/O syscall*, "never reach for it as a casual 'let me peek at this value' primitive"). The Deutsch worked example at the end delivers a first genuine separation on two qubits before any formalism — exactly the right payoff for Part I. Math verified: qubit DOF count (2), interference cancellation arithmetic, Toffoli embedding, no-cloning-via-linearity sketch, `P ⊆ BPP ⊆ BQP`, all ✓.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | structure/consistency | §2.6 heading (~line 84) | Section is titled "**Simulation Cost of Quantum Systems**" but its content is *hardware platforms, noise economics, and error-correction overhead* — the chapter's own intro (line 7: "…state-space size, **hardware realisation**, and control flow") and How-to-read callout ("§2.6–2.7 … hardware, noise") both describe the actual content. The title looks like an outline leftover; simulation cost was §2.5's topic. | Retitle (e.g. "Hardware Reality: The Cost Asymmetry"); check inbound anchors (none found in index/TERMS). Local. | certain |
| Low | sequence/pedagogy | §2.7 Deutsch example (~line 114) | "The mechanism is the **phase kickback of §2.2**" — §2.2 never introduces or names phase kickback (it covers interference generally). First-use term is attributed to a section that doesn't contain it. | "a mechanism called *phase kickback* (developed in Chapter 14)". Local. | certain |
| Low | terminology | §2.6 (~line 96) | "the number of two-qubit gates you can execute coherently — sometimes called the **circuit volume**" — non-standard term; the established metric is IBM's *quantum volume* (defined differently) and the concept described is closer to a coherence-limited depth×width budget. "Sometimes called" overstates the term's currency. | Either define it as this book's own term explicitly or align with Ch 22's metric vocabulary (checked at Ch 22 below). | certain (nonstandard), uncertain (best replacement) |
| Low | terminology | §2.4 (~line 62) | "$T$ is a particular **π/8 phase rotation**" — T applies phase `e^{iπ/4}`; "π/8 gate" is the (confusing) historical name, and presenting it as a "π/8 phase rotation" plants the classic error. | "the T gate (historically the 'π/8 gate'; it applies phase e^{iπ/4}, Chapter 8)". Local. | certain |
| Low | sequence | §2.7 (~line 106) | Cross-refs "superdense coding (§7.12, 'Entanglement as a Resource')" — §7.12's existence/title verified at Ch 7 below. | — | resolved below |

**Entertainment:** high — the contrast-sentence device and the developer analogies carry the chapter. **Pedagogy:** "Read for shape, not for derivations" instruction is honest and correct; complexity classes at recognition level only, properly deferred to Ch 17. **Correctness:** hardware numbers bracket current values acceptably (superconducting 10⁻²–10⁻³ 2-qubit error is conservative-but-fair for 2026). **Rendering:** house escaping throughout; clean. **Sanity checks:** 5, all answerable from the chapter (Preface tally ✓).

---

### File: `book/part-01-orientation/03-physical-intuition.md` (745 lines, §3.1–§3.11)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — "Stockholm" replaced with Vienna cosmic-photon experiments (Handsteiner 2017, Rauch 2018) + BIG Bell Test 2018, matching the Prelude; photonic detection-loophole closure re-dated to 2013 (Giustina, Christensen); "displacing" mirror; Aspect 1982 hedge added; §5.9–§5.12 range; status 11/11; inline-answer policy resolved by amending the Preface exception (Ch3 now a named exception).

**Overall.** The strongest *physics* chapter a CS-audience book could ask for: experiments as narrative (Stern–Gerlach → Malus → Mach–Zehnder → Tonomura → sequential SG → SPDC/Bell), each explicitly converted into an operational reflex, with the misleading historical vocabulary ("duality", "collapse", "observer") named and replaced. Math verified: Robertson inequality form ✓; `|Φ⁺⟩` X-basis identity `(|++⟩+|−−⟩)/√2` ✓ and the Y-basis **anti**-correlation identity `(|y₊y₋⟩+|y₋y₊⟩)/√2` re-derived ✓ (a subtle claim most books get wrong — this one gets it right); Tsirelson `2√2` ✓; `T₂ ≤ 2T₁` ✓; sanity-check answers all recomputed ✓ (SG 1/2; which-path 1/2; no-signaling; decoherence; 45° polarizer p=1). Fein et al. 2019 (>25,000 amu, ~2,000 atoms) ✓. Moving-target warning present for §3.9 figures ✓.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | factual | §3.8 (~line 517) | "freedom-of-choice (the 2010s **Vienna and Stockholm** experiments)" — Vienna is right (Scheidl 2010; Handsteiner 2017), but no notable **Stockholm** freedom-of-choice Bell test is known to this reviewer; the Prelude's own list (cosmic photons/quasars/BIG Bell Test) contains no Stockholm experiment. Likely an error or a confusion with another site. | Verify against the literature; replace with the Prelude's citations (Handsteiner 2017 / Rauch 2018 / BIG Bell Test 2018) for internal consistency. | **uncertain — requires manual verification** |
| Low | consistency | §3.8 (~line 515) | Detection-efficiency loophole attributed to "Giustina et al. and Shalm et al., **2015**, with photons" — the Prelude (correctly, per its verified pass) credits the first photonic closure to **2013** (Giustina et al.; Christensen et al.); 2015 experiments closed it *simultaneously with locality*. Cross-chapter drift. | Align with the Prelude's 2013-first account. Local. | certain |
| Low | consistency | §3.11 sanity checks (~705–741) | All five checks print **inline answers**, but the Preface states inline answers are the *self-check chapter's exception* and chapter-end exercises leave answers to the chapter body. Ch 1 and Ch 2 comply; Ch 3 does not. | Either move answers into prose ("see §3.x") or amend the Preface's policy sentence. Cross-file consistency. | certain |
| Low | consistency | status block | "10 / 10" but the file has 11 `##` sections (§3.11 Bridge). | 11/11; sync ENTRIES. | certain |
| Nit | clarity/physics | §3.3 (~line 208) | "**reversing** one of the mirrors by a fraction of a wavelength" — the physical operation is *displacing* (translating) a mirror, not reversing it. | "displacing one of the mirrors". Local. | certain |
| Nit | consistency | §3.8 vs Prelude | Aspect 1982 described as having "closed the locality loophole" outright; the Prelude hedges ("within the limits of 1980s detection technology"). Minor strength drift between chapters. | Add the same hedge here. | certain |

**Entertainment:** high throughout; the experiments carry it, and §3.10's coffee-cup/action-scale close is a satisfying landing. **Pedagogy:** the "How to read" triage (which sections carry weight) is genuinely useful; every §5.x/§4.x forward ref is a signpost, not a dependency. **Completeness:** for its stated scope, complete; SPDC production rates ("thousands per second per milliwatt") plausible but unledgered — minor verify-later. **Rendering:** heavy math but house-escaped throughout (`\\{`, `\\,`, display blocks); clean.

---

### File: `book/part-02-formalism/04-mathematical-background.md` (1,401 lines, §4.1–§4.17)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — §4.15 trap 4 restated in the book's x₁…xₙ convention (q-labels identified as the frameworks' alternative). The **High** Preface-vs-§4.8 contradiction is fixed on the Preface side (see Preface annotation). DEFERRED — §4.8 internal sub-headings (optional readability nit).

**Overall.** The book's foundation chapter, hardened by 13 documented review rounds, and it shows: every formula re-verified in this pass checks out — global-phase invariance derivation, H·|±⟩, adjoint identities, Pauli commutators `[X,Y]=2iZ` / `XY=iZ` / `YX=−iZ`, spectral calculus incl. both matrix-exponential forms, Kronecker worked examples (`X⊗I` and `I⊗X` matrices independently recomputed ✓), `det(A⊗B)=(det A)ⁿ(det B)ᵐ`, partial trace of `|Φ⁺⟩` → `I/2`, Bell-state Schmidt data `(1/√2, 1/√2)`, polar-decomposition uniqueness caveats, `F₄|1⟩ = ½(|0⟩ − i|1⟩ − |2⟩ + i|3⟩)` recomputed ✓, ensemble Holevo bound (correct χ form), `Θ(1/ε²)` shot bound. The Qiskit four-convention endian warning in §4.8 is the most careful treatment of that trap I have seen in any text. §4.15 "Common Traps" (13 items) is a standout — compressed war stories that double as a checklist; §4.16's table-free layout (because kets/norm-bars break Markdown table cells) shows the renderer discipline operating even at layout level.

**Key finding — cross-file contradiction (this pass's most significant catch so far):**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| **High** | consistency/pedagogy | **Preface "A Note on Conventions" vs §4.8** | Preface (~line 313): "a Qiskit `0b01` printout corresponds to this book's `|10⟩`." Work it through under §4.8's own recommended mapping (book's leftmost factor ↔ Qiskit's *highest-numbered* qubit): Qiskit printed `01` = q₁=0, q₀=1 = statevector index 1 = **this book's `|01⟩`** — the *same* string, not `|10⟩`. §4.8 states this explicitly ("The integer indices coincide only when this book's `|x₁x₂⟩` is matched with Qiskit's printed order `q₁q₀`"). The Preface's example is true only under the *un*-recommended factor-1↔q₀ mapping, which it does not state. On the single most notorious confusion point in the field, the book's two statements contradict each other unless the reader supplies an unstated assumption. | Rewrite the Preface example to name its mapping, or simply restate §4.8's rule of thumb ("under this book's recommended mapping, printed strings coincide; under the naive q₀-first mapping, they reverse"). Local edit, high leverage. | certain (worked through both mappings) |
| Low | consistency | §4.15 trap 4 (~1276) | The trap states the ordering convention using little-endian labels "`|q_{n−1} ⋯ q₀⟩`" — Qiskit-style notation — inside the book's own convention list, where every other statement uses `x₁…xₙ` (MSB-first). Reads as if the book's mapping were the q-labelled one. | Rephrase in `x₁…xₙ` terms, mentioning q-labels as the framework's alternative. Local. | certain |
| Nit | readability | §4.8 (~550–787) | At 238 lines, §4.8 is the longest section in the book with no internal sub-headings; the endianness block, worked examples, entanglement, Schmidt preview, and partial trace could use `###`-level waypoints for the returning reader. | Optional sub-headings; zero content change. | certain |

**Anchor/cross-ref audit (inbound refs from earlier files):** §4.2 ordering rule ✓ present; §4.5 PSD + commutators ✓; §4.7 contains the matrix exponential ✓ (self-check's "§4.7" ref valid); §4.8 anchor `#48-tensor-products` ✓; §4.9 SVD ✓; §4.13 anchor `#413-fourier-transform-basics` ✓; §4.16 anchor ✓. Qiskit `QFTGate` positive-exponent claim consistent with fact-check ledger pass 7. Status block 17/17 ✓ (the one file whose count is right on the first check).

**Entertainment:** high for a refresher — sanity-check blockquotes pace the reading; "make every later quantum-computing formula type-check in your head" is the right promise and the chapter keeps it. **Pedagogy:** skim-vs-careful triage in the How-to-read callout matches actual dependency structure. **Rendering:** exemplary — all five escape forms used correctly throughout the largest math file in the book (spot-checked ~40 display blocks); no inline environments; the §4.16 list-not-table decision is documented in place.

---

### File: `book/part-02-formalism/05-postulates.md` (775 lines, §5.1–§5.15)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — no-signalling derivation added to §5.11 (making Ch3's pointer honest); no-deleting theorem re-labelled "simplified from Pati–Braunstein 2000" with the full ancilla statement noted; "overlap neither 0 nor 1"; postulate-fingerprint recap added at §5.15 (intro promise now paid); status 15/15. Ch3's §5.9–§5.11 range fixed on the Ch3 side.

**Overall.** Clean, tight postulate chapter. Verified in this pass: all four postulate statements precise (incl. the `p(m) > 0` conditioning on post-measurement states); Schrödinger/time-ordered exponential forms ✓; density-matrix Born rule/evolution/expectation forms ✓; the three equivalent partial-trace definitions and all five listed properties ✓; the Bell-state worked example (coherences vanish under tracing) ✓; the **no-cloning proof re-derived line-by-line ✓** (the `z = z²` ⇒ `z ∈ {0,1}` step is exactly right, and the `⟨0|+⟩ = 1/√2` counterexample seals it); optimal 1→2 cloning fidelity 5/6 ✓ (Bužek–Hillery). The `rm -f` aside in §5.14 is the house voice at its best. The "whole pure, part maximally mixed" refrain lands well as the chapter's conceptual climax.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Low | completeness/sequence | §5.11 (~519–570) | Ch 3 §3.8 cites "(§5.11)" for **no-signaling** ("local statistics are the same whether or not the other subsystem has been measured"), but §5.11 never states or derives no-signaling — it defines reduced states and their operational property. The two-line derivation (summing post-measurement branches on `B` leaves `ρ_A` unchanged) is absent though all machinery is present. | Add a short no-signaling paragraph to §5.11/§5.12 and keep Ch 3's pointer honest. Local. | certain |
| Low | consistency | Ch 3 §3.10 cross-ref | Ch 3 says "the mixed-state formalism of **§5.9–§5.11** — density matrices and partial traces"; the partial trace is **§5.12**. Off-by-one range. | "§5.9–§5.12" in Ch 3. Local. | certain |
| Low | factual/precision | §5.14 (~714) | The stated no-deleting form `U(|ψ⟩⊗|ψ⟩)=|ψ⟩⊗|blank⟩` (no ancilla) is a *simplification* of Pati–Braunstein 2000, whose actual theorem includes an ancilla and shows the information can only be *moved*, never destroyed — a strictly stronger and more interesting statement. The simplified form is almost a one-liner and slightly misattributes the named theorem. | Either state the ancilla form (matches the following prose, which already says "the information ends up somewhere") or add "in simplified form". Local. | certain |
| Low | pedagogy/completeness | intro promise 3 vs chapter body | The intro promises each postulate a named "**computational fingerprint**"; the fingerprints are delivered only implicitly (P1→superposition, P2→reversibility, P4→entanglement; P3's fingerprint is never named). No recap collects them. | Add a 4-row fingerprint recap at §5.15 — cheap, satisfying payoff of the intro's promise. Local. | certain |
| Low | consistency | status block | 14/14 vs 15 `##` sections (Bridge). Same counting drift class (4th instance). | Fix; consider automating the count in lint. | certain |
| Nit | precision | §5.13 (~678) | "any two non-orthogonal, non-identical states — whose overlap lies strictly between 0 and 1" — overlaps are complex; the proof needs only "overlap ∉ {0,1}", which holds. Wording implies real overlap. | "whose overlap is neither 0 nor 1". | certain |

**Entertainment:** good — impossibility theorems told as engineering constraints ("Quantum garbage collection is non-trivial") rather than as folklore. **Pedagogy:** the idealised→realistic path is explicitly designed (mixed states here, channels Ch 10, POVMs Ch 11) and each postulate names its own deviation from hardware; exactly right. **Rendering:** clean house escaping throughout; no risky constructs. **Note:** the chapter has *no sanity-check exercises at the end* (the interior has sanity-check blockquotes) — Preface exercise-promise tally: Ch 5 ✗.

---

### File: `book/part-03-qubits/06-the-qubit.md` (480 lines, §6.1–§6.11)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — double-cover statement corrected (2π Bloch rotation → −1 on the state; 4π restores identity); S/T global-phase qualifiers now cover both gates with explicit phases; Lüders rule → "(Chapter 11)"; status 11/11.

**Overall.** "This chapter is short on purpose" — and right to be. The three-bases → Bloch sphere → rotations → measurement arc is clean, and the geometric payoff is real. Verified: Bloch construction/poles/density-ball conditions ✓; `p(0) = ½(1 + r·n̂)` ✓; axis-angle formula ✓; ZYZ decomposition ✓; MUB count `2ⁿ+1` (prime-power dimension) ✓; circular-basis measurement `H S†` **recomputed as a matrix product and confirmed equal to `V†`** ✓ (the HISTORY-documented operator-order fix is correct); `S† : |R⟩ ↦ |+⟩` ✓.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | mathematical | §6.8 "Why the half-angle" (~line 317) | "A **2π rotation on the Bloch sphere is a 4π rotation in Hilbert space**" — inverted/garbled statement of the double cover. Correct content: a 2π Bloch rotation corresponds to `U = −I` (the state acquires a physical-in-context −1 sign); only a **4π Bloch rotation** returns the Hilbert-space identity. As written the sentence has no correct reading. | "A full 2π rotation of the Bloch vector multiplies the state vector by −1; only a 4π rotation restores it — the SU(2)→SO(3) double cover." Local. | certain |
| Low | consistency | status block | 10/10 vs 11 `##` sections (Bridge) — 5th instance of the count drift. | Fix; add a lint rule comparing declared vs actual counts (cheap and would have caught all six instances). | certain |
| Nit | precision | §6.8 (~334) | "$S = R_z(\pi/2)$ up to global phase … and $T = R_z(\pi/4)$" — the up-to-phase qualifier grammatically attaches only to S; T's equality is also only up to global phase `e^{iπ/8}`. | Move the qualifier to cover both. | certain |
| Nit | sequence | §6.10 (~448) | "the Lüders rule" is name-dropped without definition or forward pointer (POVM/measurement machinery is Ch 11). | Add "(Chapter 11)". | certain |

**Entertainment:** good; the Larmor-precession framing of gates ("hardware implements gates by turning on a Hamiltonian in a chosen direction for a chosen duration") gives physical texture. **Pedagogy:** exactly the right scope. **Note:** Ch 6 has **no sanity-check exercises and no interior SC boxes** — the only Part I–III chapter with neither (Preface exercise tally: Ch 6 ✗). **Rendering:** clean.

---

### File: `book/part-03-qubits/07-multiple-qubits-and-entanglement.md` (210 lines, §7.1–§7.14)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — zero-based "qubit 0"/x₀…x_{n−1} labelling replaced with the book's one-based x₁…xₙ scheme throughout (§7.1, §7.2, sanity checks); Qiskit heads-up rephrased accordingly; §7.9 LHV claim now carries the assumptions hedge; status 14/14.

**Overall.** Dense but excellent. The **Tsirelson saturation was fully recomputed** in this pass — all four correlators (`+1/√2, +1/√2, +1/√2, −1/√2`) with the stated singlet settings give `S = 2√2` exactly ✓ (the historically-fixed sign convention is correct). Also verified: product-state cross-ratio test ✓; `|Φ⁺⟩` non-factorability proof ✓; GHZ/W trace-out contrast ✓; Schmidt/SVD relationship and equal reduced spectra ✓; teleportation correction table (incl. the `ZX` order note) ✓; negativity definition and "sufficient but not necessary" ✓; Jozsa–Linden necessity + the DQC1 counterpoint — an unusually honest pairing most texts omit. Resolves an earlier open item: **§7.12 "Entanglement as a Resource" exists exactly as cited by Ch 2** ✓; the no-signaling explanation Ch 3 wanted lives in §7.11 (see Ch 5 finding — Ch 3's pointer should aim here or §5.11 should gain the derivation). Teleportation figure present with descriptive alt text ✓.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | consistency | §7.1 (~21), §7.2 (~33) | **Third qubit-labeling scheme introduced**: §7.1 calls the leftmost ket "the most-significant qubit (**qubit 0**)" and §7.2 writes basis strings as `|x_0 x_1 ⋯ x_{n−1}⟩` — zero-based with x₀ = MSB. The book's established convention (Preface, §2.4, §4.2) is **one-based** `x_1 … x_n` with `idx = Σ x_i 2^{n−i}`. Ch 7's parenthetical then has to warn that "Qiskit's qubit 0 is our rightmost", creating a book-internal "qubit 0" that collides head-on with the SDK meaning — in the single most confusion-prone convention area the book has otherwise handled superbly. | Align Ch 7 to `x_1…x_n` / "first qubit" phrasing; drop the internal "qubit 0" label entirely. Local but touches several §7.x lines. | certain |
| Low | consistency | §7.9 (~134) | "Local hidden variables, as a model of physical reality, **are ruled out**" — flat statement, where the Prelude and Ch 3 carefully scope the claim to the tested assumptions (locality/free-choice/fair-sampling; superdeterminism not closable). Cross-chapter epistemic drift, in the direction the book's own Ch 36 would flag. | Add the standard one-clause hedge. Local. | certain |
| Low | consistency | status block | 13/13 vs 14 sections (6th count-drift instance). | Fix. | certain |

**Entertainment:** high for the density — "the Bell zoo," the resource-accounting framing of §7.12, and the honest §7.13 mixed-state caveats keep it alive. **Pedagogy:** exactly the right prerequisites callout; sanity checks (5, no inline answers — policy-compliant ✓). **Rendering:** the `aligned` display block for the Bell states uses correct `\\\\` escaping ✓; figure link relative and valid.

---

### File: `book/part-04-gates-and-circuits/08-quantum-gates.md` (219 lines, §8.1–§8.14)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — §8.14 sanity-check-3 parenthetical corrected: phases harmless only on basis-state inputs; on |+⟩ the sign is relative (R_Y(π)|+⟩ = −|−⟩ ≠ X|+⟩), cross-linked to §4.15 trap 2. Part-numeral convention handled in STYLE.md (batch 4).

**Overall.** A dense, precise gate chapter with real research-hygiene: inline citations (Barenco 1995, Shi/Aharonov 2003, Dawson–Nielsen, Ross–Selinger), an explicit Moving-target warning on §8.12's vendor content, and the sharpest treatment in any textbook I know of the **two Solovay–Kitaev exponents** (generic `c ≈ 3.97` vs Ross–Selinger's `c ≈ 1` for Clifford+T z-rotations — explicitly warned not to be confused). Verified: `Y = iXZ` ✓; `S = √Z`, `T = ⁴√Z` ✓; rotation matrices ✓; `CZ = (I⊗H)·CNOT·(I⊗H)` ✓; SWAP = 3 CNOTs ✓; Barenco ancilla-cost taxonomy ✓; Toffoli 6-CNOT/7-T/2-H decomposition ✓; KAK Weyl-chamber CNOT-cost classification incl. iSWAP at `(π/4, π/4, 0)` on the `c_z = 0` face ✓ (the documented fix is intact); parameter-shift rule ✓; §8.3's operator-conjugation-vs-measurement-procedure disambiguation (one `H`, not two) ✓. All 6 figures exist with descriptive alt text ✓. Status block 14/14 — **correct** (first fully consistent count).

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | mathematical/pedagogy | §8.14 sanity check 3 (~line 213) | The exercise correctly derives `R_Y(π)|0⟩=|1⟩`, `R_Y(π)|1⟩=−|0⟩`, then asserts "(The phases are physically harmless because `R_Y(π)`, like every gate, is fixed only up to a **global** phase.)" — **wrong justification**: `R_Y(π) = XZ` (up to phase), which differs from `X` by a *relative* sign. On the superposition `|+⟩`, `R_Y(π)|+⟩ = −|−⟩` while `X|+⟩ = |+⟩` — physically different states. The phases are harmless only when the *input is a basis state* (each branch's phase is then global); the parenthetical teaches the exact misconception §4.15 trap 2 warns against. | Rephrase: "harmless when the input is a computational-basis state; in superpositions the sign is a relative phase and `R_Y(π)` is genuinely different from `X`." Local — and pedagogically valuable as stated correctly. | certain (recomputed) |
| Nit | consistency | §8.9/§8.12/intro | "Part 8", "Part 9", "Part 6" in Arabic numerals (global Arabic-vs-Roman inconsistency already logged at Ch 1). | Normalize book-wide. | certain |

**Entertainment:** strong for a matrix-heavy chapter — the T-count economics of §8.4/§8.10 give the reader stakes; "open Appendix B alongside it" is honest. **Pedagogy:** the mandatory/deferrable triage is accurate. **Sanity checks:** 5, policy-compliant (tally: Ch 8 ✓). **Rendering:** clean; heavy `pmatrix` use all in display blocks with proper `\\\\`.

---

### File: `book/part-04-gates-and-circuits/09-quantum-circuits.md` (162 lines, §9.1–§9.14)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — both endianness pointers redirected from Chapter 7 to §4.2/§4.8; status 14/14. (Appendix A index-conversion recipe verified to exist — see App A entry.)

**Overall.** "Gates are the alphabet; circuits are the sentences" — and the chapter delivers the working grammar: ancillae ("the qubit is paying rent"), uncomputation with the correct right-to-left `U†∘copy∘U` operator order (documented fix intact ✓), the deferred-measurement principle stated with the exactly-right caveat ("the equality is statistical, not state-by-state") ✓, magic-state T-correction correctly identified as a Clifford `S`, not a Pauli ✓, the Pauli-frame idiom ✓, and honest platform snapshots under a Moving-target warning. Sanity checks recomputed: SWAP-count-2 on the linear chain ✓, rotation merge to `R_Z(π/8)` ✓. GHZ depth claims (`Ω(n)` NN vs `O(log n)` all-to-all) ✓. Both figures exist; the GHZ alt text even documents its own depth caveat ✓.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Low | consistency | status block | 13/13 vs 14 `##` sections — 7th count-drift instance. | Fix (see global lint-rule recommendation). | certain |
| Low | sequence | §9.1 (~22) | Endianness discussion attributed to "Chapter 7" twice — but the book's full treatment is **§4.8**, and Ch 7 is precisely where the deviant zero-based labeling crept in (see Ch 7 finding). Pointing readers at Ch 7 for the convention compounds that problem. | Cite §4.2/§4.8 instead. Also verify the claimed "Appendix A index-conversion recipe" exists (checked at App A below). | certain |

**Entertainment:** good; the engineering-reality thread (feedforward latency vs kernel round-trips, rent-paying ancillae) keeps a plumbing chapter alive. **Pedagogy:** §9.4/§9.5's garbage discipline is the best practical treatment of uncomputation I've seen at this level; the "two faces" of deferred measurement (theory tool vs engineering anti-pattern) is exactly the kind of judgement the book promises. **Rendering:** clean.

### book/part-04-gates-and-circuits/10-core-quantum-phenomena.md (Chapter 10, 273 lines, 14 H2 sections)

> ✅ **Remediation 2026-07-04 (commit b1d9f12):** FIXED — status 14/14; GHZ observables now "commute pairwise — as operators, unconditionally — and, on this state, have definite values"; DFS re-labelled "passive error avoidance" with explicit contrast to Chapter 25's statistical mitigation. (Ch32 CV/MBQC cross-refs verified correct at the Ch32 review — no change.)

**Overall:** Excellent synthesis chapter. Every mathematical claim I recomputed checks out: the Pauli commutators ([X,Z] = −2iY, [Y,Z] = 2iX, [X,Y] = 2iZ verified by matrix multiplication), the Peres–Mermin square (all three rows and first two columns multiply to +I, third column to −I — verified per-qubit: XZY = −iI, ZXY = +iI), the GHZ contradiction (XYY on GHZ gives eigenvalue −1 via i²/(−i)² factors; operator product XXX·XYY·YXY·YYX = I⊗(−I)⊗I = −I, verified), the amplitude-damping Kraus completeness (K₀†K₀ + K₁†K₁ = I), the phase-damping q = (1−√(1−p))/2 giving off-diagonal factor 1−2q = √(1−p), the pure-dephasing Lindblad rate (L = √(γ_φ/2)Z gives ρ₀₁ decay at exactly γ_φ), and the depolarizing Kraus √(1−3p/4)·I, √(p/4)·σ (the Phase 11 fix is intact). T₂ ≤ 2T₁ and 1/T₂ = 1/(2T₁) + 1/T_φ correct. Zeno quadratic-leak argument correct. Entertainment: strong — the "no-cloning is what makes QKD possible, not what makes it hard" inversion and "noise is just unobserved entanglement" are memorable. The restricted-cyclicity caveat in the no-signalling proof (§10.6) is exactly the kind of honesty the book's principles demand. Bridge and sanity checks all verified consistent (check 3 on |+⟩: 0 ≥ 0, degenerate but consistent as stated).

- **Severity:** Low · **Category:** Consistency/tooling · **Location:** line 3 (status block)
  - **Problem:** `Sections drafted: 13 / 13` but the chapter has 14 H2 sections (§10.1–§10.13 plus §10.14 Bridge). Same status-count drift pattern as the 7 files already flagged (Bridge sections added after scaffolding).
  - **Recommendation:** Update to 14 / 14; covered by the proposed lint rule (§13).
  - **Certainty:** High.

- **Severity:** Low · **Category:** Correctness (phrasing) · **Location:** §10.7, GHZ paragraph (line 135)
  - **Problem:** "the four observables … all commute pairwise *on this state*" — they commute pairwise as operators, unconditionally (each pair differs in exactly two tensor slots, giving two local anticommutations that cancel). The qualifier "on this state" suggests state-dependent commutation, which is not a thing for these operators and could confuse a careful reader.
  - **Recommendation:** Drop "on this state" from the commutation claim (keep it for "have definite values", where it belongs).
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Terminology · **Location:** §10.8, final sentence (line 157)
  - **Problem:** Decoherence-free subspaces are described as an "error mitigation" strategy. In this book (and the field), "error mitigation" is reserved for the NISQ statistical-post-processing toolbox (Chapter 25: ZNE, PEC, etc.); DFS is passive error *avoidance*/suppression.
  - **Recommendation:** Say "error avoidance" or "passive error suppression".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Cross-reference precision · **Location:** §10.4 (line 81) and §10.7 (line 137)
  - **Problem:** §10.4 cites Chapter 32 for "the continuous-variable setting" and §10.7 cites Chapter 32 for "measurement-based quantum computation". Chapter 32 is "Adjacent Computational Models" (verified in README/TOC), so both references are plausible if that chapter covers both MBQC and CV — verify when reviewing Ch32 that both topics are actually present.
  - **Recommendation:** Defer; tracked in the uncertainty ledger.
  - **Certainty:** Medium (pending Ch32 read).

**Positive verifications recorded:** Kochen–Specker facts correct (117 vectors in ℝ³ original, shorter Cabello/Peres–Mermin proofs, d = 2 admits a hidden-variable model); Robertson-bound vacuousness remark on Z-eigenstates correct and pedagogically sharp; no-cloning one-liner ⟨ψ|φ⟩ = ⟨ψ|φ⟩² correct; Kraus-rank bound dim(H_A)·dim(H_B) correct; Stinespring K_i = ⟨i_E|U_SE|0_E⟩ correct; Lindblad↔Kraus first-order correspondence correct.

### book/part-05-measurement-and-information/11-measurement-theory.md (Chapter 11, 166 lines, 8 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — partial-trace refs §5.11→§5.12 (both sites); "since 2010"→"since the mid-2000s"; Clifford compilation stated as gate count Θ(n²/log n) with depth O(n); SIC-POVM = Bloch tetrahedron merged into one example; DFE scoped to settings + well-conditioned targets; RB wording "average error per Clifford" with interleaved variant named; status 8/8.

**Overall:** A very strong operational chapter — arguably the best-organized in the book so far. The "How to read this chapter" paragraph gives an honest dependency map; the trine POVM and the readout-error POVM are exactly the right two concrete examples; and §11.7 is a genuinely practitioner-grade treatment (basis rotation, qubit-wise vs. general commutation, parameter-shift, calibration-matrix mitigation) that most textbooks omit entirely. Mathematics recomputed and verified: trine POVM Σₖ (2/3)|ψₖ⟩⟨ψₖ| = I via Σₖ n̂ₖ = 0 ✓; readout-error POVM E₀+E₁ = I with correct conditional-probability reading ✓; Kraus update rule and E_m = M_m†M_m ✓; Naimark dilation statement and the ancilla-dimension-≤-outcomes bound ✓ (qubit ancilla for the trine: joint dim 4 ≥ 3 ✓); Pauli-basis orthonormality under tr(A†B)/2ⁿ ✓; Helstrom bound in both prior-weighted and equal-prior forms ✓; sanity check 2's ½(1+√(1−|c|²)) ✓ (standard pure-state Helstrom); IDP inconclusive probability P₍?₎ = |c| ✓; the mixed-state USD support condition (neither support contained in the other) ✓ — a precision most references get wrong; HS† as the Y-basis rotation ✓ (recomputed: (HS†)Y(HS†)† = HXH = Z); parity formula ∏(−1)^{bᵢ} over non-identity slots ✓; parameter-shift ½(⟨O⟩(θ+π/2)−⟨O⟩(θ−π/2)) ✓ incl. sanity check 4's −sin θ ✓; shot-noise variance 1−⟨Z⟩² ✓; calibration matrix singular at ε→1/2 (det = 1−2ε) ✓; factorized-inverse cost O(n·2ⁿ) ✓. HKP classical-shadows citation (2020) and sample-complexity form N = O(log M · max‖O‖²_shadow/ε²) with ‖O‖²_shadow ≤ 4^k for k-local Paulis ✓ (4^k is HKP's stated bound; the exact Pauli variance ~3^k is tighter, so the text is safe). The honest caveat that shadow reuse guarantees are class-dependent (adversarial post-hoc queries erase the advantage) is exactly right and rarely stated. Cross-refs verified: §5.4 (Measurement Postulate) ✓, §5.6 (Observables) ✓, §5.10 (Density Matrices) ✓, §§9.6–9.9 (circuit measurement/deferred/mid-circuit/feedforward — heading titles match) ✓.

- **Severity:** Low · **Category:** Cross-reference precision · **Location:** §11.3 (line 71) and §11.8 (line 153)
  - **Problem:** Both cite "the partial trace (§5.11)" / "the partial-trace structure of §5.11" — but §5.11 is "Reduced States"; the Partial Trace section is **§5.12** (verified against Ch5 headings). Reduced states are defined *via* the partial trace, so the reference is adjacent, not wrong-topic, but a reader following it lands one section early.
  - **Recommendation:** Cite §5.12, or §§5.11–5.12.
  - **Certainty:** High (headings checked this session).

- **Severity:** Low · **Category:** Factual (history) · **Location:** §11.4 (line 89)
  - **Problem:** "alternatives developed since 2010" introduces a list that includes randomised benchmarking — but RB dates to Emerson et al. 2005 and Knill et al. 2008, before 2010. GST (~2013) and DFE (2011) fit the claim; RB does not.
  - **Recommendation:** "developed since the mid-2000s", or move RB out of the "since 2010" framing.
  - **Certainty:** High.

- **Severity:** Low · **Category:** Technical precision · **Location:** §11.5 (line 105)
  - **Problem:** "random global Cliffords on n qubits require **depth** O(n²/log n) to compile" — Θ(n²/log n) is the Aaronson–Gottesman **gate-count** bound for Clifford circuits, not depth; Cliffords compile to depth O(n) (linear-nearest-neighbour constructions achieve ~2n+O(1)). The stated conclusion (global Cliffords are expensive at large n, so random-Pauli depth-1 is the default) survives either way.
  - **Recommendation:** Replace "depth" with "circuit size (gate count)", or state depth O(n).
  - **Certainty:** Medium-high (gate-count bound certain; exact best-known depth constants from memory).

- **Severity:** Low · **Category:** Requires verification · **Location:** §11.4 (line 89)
  - **Problem:** Direct fidelity estimation described as "O(1/ε²) Pauli measurements … **regardless of n**". Flammia–Liu 2011: the number of measurement *settings* is O(1/ε²) regardless of n, but the total copy count is n-independent only for well-conditioned states (stabilizer states, W states); for general pure states the worst-case shot count picks up dimension-dependent factors. As a blanket claim this is a mild overstatement.
  - **Recommendation:** Qualify ("for stabilizer-like target states") or soften to "settings". Added to the uncertainty ledger for citation check.
  - **Certainty:** Medium (recalled from the DFE literature; worth verifying against Flammia–Liu Theorem 1).

- **Severity:** Nit · **Category:** Redundancy · **Location:** §11.2 (line 45)
  - **Problem:** "the symmetric informationally-complete POVM on a qubit has exactly four outcomes; the Bloch-tetrahedron POVM has four" — these are the *same object* (the qubit SIC-POVM **is** the Bloch tetrahedron), but the sentence lists them as two distinct examples.
  - **Recommendation:** Merge: "the symmetric informationally-complete (Bloch-tetrahedron) POVM has four".
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Terminology precision · **Location:** §11.4 (line 89)
  - **Problem:** Randomised benchmarking "extract[s] a single fidelity-like figure of merit **per Clifford gate**" — standard RB yields the *average* error per Clifford over the group; a per-specific-gate figure requires interleaved RB. Loose but potentially misleading next to Ch25's presumably careful treatment.
  - **Recommendation:** "average error per Clifford"; defer detail to Ch25.
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Consistency · **Location:** line 3 (status block)
  - **Problem:** `Sections drafted: 7 / 7` vs 8 H2 sections (§11.1–§11.7 + §11.8 Bridge) — same bridge-not-counted pattern as Ch9/Ch10 (8th instance). At this frequency it looks like a deliberate convention (bridges excluded), in which case the convention should be documented in PROCESS.md/generate_progress.py rather than "fixed" file-by-file.
  - **Recommendation:** Decide the convention once, document it, and lint for it (see §13 recommendation).
  - **Certainty:** High (count); Medium (whether it is drift or convention).

**Entertainment:** high for formal material — "the measurement either tells you the state or admits failure" and the POVM-as-partial-trace-of-projective unification give the chapter a satisfying arc from postulate to practice. **Pedagogy:** the §11.1 list of three projective features that each fail in general (outcome count, repeatability, known post-state) is a model setup for a generalisation; sanity checks (5, no inline answers — policy-compliant ✓, and check 1's hint is the precise version of §11.2's loose parenthetical — nice layering). **Completeness:** no figures and no code in a chapter about *procedures* — a calibration-matrix numeric example (2×2, ε = 0.05) or a shadows shot-count table would land well, but the prose carries it. **Rendering:** house escaping (`\\{`, `\\,`, `\\|`) applied consistently throughout, including inside display blocks ✓; `\succeq` renders on GitHub MathJax ✓.

### book/part-05-measurement-and-information/12-quantum-information-theory.md (Chapter 12, 707 lines, 13 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — "Part 12 (cryptography)" → "Part 11 (applications and cryptography)"; FvdG lower-bound saturation scoped to pure-state pairs with the mixed-state counterexample class noted; "mother protocol" label moved to the FQSW formulation; channel coherent-information bridging definition added to the LSD formula.

**Overall:** The strongest theory chapter so far. The "operational meanings matter more than algebraic definitions" thesis is executed consistently — every quantity gets its protocol (entropy→Schumacher, trace distance→Helstrom, χ→accessible information, S(A|B)→state merging). Mathematics recomputed and verified: Bell-state entropy arithmetic (S_A = S_B = 1, S_AB = 0, I(A:B) = 2, S(A|B) = −1) ✓; coherent information on a product state = −S(ρ_A) ✓ (S(ρ_B) − S(ρ_A⊗ρ_B) = −S(ρ_A)); I_c(A⟩B) = −S(A|B) ✓; the Helstrom form ½+½D consistent with Ch11's ½(1+½‖·‖₁) ✓; SSA-with-trivial-B reduction to ordinary subadditivity (sanity check 5) ✓; sanity check 3 recomputed (ρ−σ eigenvalues ±1/√2, D = 1/√2 = √(1−F²) with F = 1/√2) ✓; sanity check 4 recomputed (average-state eigenvalues (1±1/√2)/2, S ≈ 0.60 < 1) ✓. Attributions and dates all check: Lieb–Ruskai 1973, Holevo 1973, HSW 1997–98, Hastings 2009 superadditivity, LSD (Lloyd 1997/Shor 2002/Devetak 2005), BSST single-letter C_E, BCFJS 1996 no-broadcasting (incl. the correct commuting-ensemble condition), Pati–Braunstein 2000, Schumacher 1995, Wootters–Zurek/Dieks 1982. The state-merging resource-ledger paragraph (classical communication is used but not priced by S(A|B)) and the no-deleting caveat ("not a formal Noether-style conservation law") are exactly the honest precision the book promises. Cross-refs verified this session: §4.7 Spectral Decomposition ✓, §4.9 defines the trace norm ✓, §4.14 contains shot-budget accounting ✓, §7.12 contains superdense coding ✓, §7.13 Entanglement Measures ✓, Ch18 = "Noise, Decoherence, and Errors" ✓, Ch27 = "Cryptography and Security" ✓.

- **Severity:** Low · **Category:** Cross-reference (factual) · **Location:** "How to read" block (line 43)
  - **Problem:** "§§12.8–12.10 preview material expanded in Part 8 (error correction) and **Part 12 (cryptography)**" — cryptography is Chapter 27, which lives in **Part 11** (part-11-applications, verified); Part 12 is Adjacent Computational Models. Off-by-one part number.
  - **Recommendation:** "Part 11 (applications/cryptography)".
  - **Certainty:** High (directory structure checked).

- **Severity:** Low · **Category:** Mathematical (scope ambiguity → false if read generally) · **Location:** §12.7 (lines 408–409)
  - **Problem:** "the lower bound is generally strict (it saturates only at the endpoints F = 0 and F = 1)". Scoped to *pure states* (how the sentence begins), this is true. But the clause reads as a general claim, and for general states it is **false**: take commuting states ρ = diag(½, ½, 0), σ = diag(½, 0, ½). Then F = Σ√(p_iq_i) = ½ and D = ½Σ|p_i−q_i| = ½, so 1−F = D = ½ with F = ½ — saturation far from either endpoint. (Classical saturation condition: for every outcome, p_i = q_i or p_iq_i = 0.)
  - **Recommendation:** Scope explicitly: "for a pair of pure states the lower bound saturates only at F ∈ {0,1}"; or state the general saturation condition.
  - **Certainty:** High (counterexample recomputed this session).

- **Severity:** Nit · **Category:** Terminology · **Location:** §12.4 (line 239)
  - **Problem:** State merging "(sometimes called the *mother protocol*)" — in the Devetak–Harrow–Winter resource calculus, the "mother" is the fully-quantum-Slepian–Wolf protocol, from which state merging is *derived*; naming state merging itself the mother is loose. The section's closing paragraph (acknowledging the FQSW formulation as equivalent) partly redeems this.
  - **Recommendation:** Attach the "mother" label to the FQSW picture in that closing paragraph instead.
  - **Certainty:** Medium.

- **Severity:** Nit · **Category:** Notation continuity · **Location:** §12.10 (line 522) vs §12.3 (line 205)
  - **Problem:** §12.3 defines the *state* coherent information I_c(A⟩B)_ρ; §12.10's LSD formula uses the *channel* version I_c(ρ, 𝒩) without the one-line bridging definition (feed half of ρ's purification through 𝒩, compute S(B) − S(RB)). A careful reader can't reconstruct the LSD formula from what's on the page.
  - **Recommendation:** Add one bridging sentence or a parenthetical definition at first use in §12.10.
  - **Certainty:** High.

- **Severity:** Low · **Category:** Requires verification (deferred) · **Location:** intro (line 12), §12.11 (line 594), §12.12
  - **Problem:** (i) "quantum channel capacities (Chapter 18)" — Ch18 is titled "Noise, Decoherence, and Errors"; confirm capacities are actually treated there when Ch18 is reviewed. (ii) "thermodynamic free energy (briefly, in Chapter 32)" — added to the growing Ch32 verification list (now: CV, MBQC, thermodynamic resource theory).
  - **Recommendation:** Track in uncertainty ledger; resolve at Ch18/Ch32 reads.
  - **Certainty:** — (deferred).

**Status-block note (upgrades a global finding):** `Sections drafted: 13 / 13` — and the chapter has exactly 13 H2 sections *including* the §12.13 Bridge. So Ch12 **counts** its bridge while Ch10 (13/13 of 14) and Ch11 (7/7 of 8) **exclude** theirs. This settles the drift-vs-convention question from the Ch11 entry: the counting is *inconsistent across chapters*, not a deliberate convention. Strengthens the case for the §13 lint-rule recommendation (compare status count to `grep -c '^## '`).

**Entertainment:** excellent — "every classical theorem has a quantum shadow", the negative-entropy payoff in §12.4 (entanglement "falls out of the protocol ... free of charge"), and the Schumacher origin-of-the-qubit closer give the chapter a real narrative spine. **Pedagogy:** the three-point preamble and the skim-depth guidance per section block are exactly right for the book's stated audience; §12.4's resource-ledger paragraph preempts the most common misreading of state merging. Sanity checks: 5, no inline answers beyond confirmable targets — policy-compliant ✓, all recomputed correct ✓. **Rendering:** house escaping consistent (`\\{`, `\\,`, `\\|` incl. inside display math) ✓; hard-wrapped source lines inside `$...$` spans avoided ✓.

### Verification note on the Chapter 11 entry (raised during Ch13 review, resolved at Ch14 review)

During the Ch13 review I briefly suspected Ch11's two references to "variational quantum algorithms (Chapter 15)" were wrong, since Ch13 glosses Chapter 15 as "(Shor and Grover)" and a grep of Ch16/Part 10 placed "variational" only in Ch25. Checking Chapter 15's actual headings resolves it: Chapter 15 "Landmark Quantum Algorithms" contains **§15.7 Variational Quantum Algorithms, §15.8 VQE, and §15.9 QAOA** — so **Ch11's cross-references are correct** and no finding stands against Ch11. The residual (very minor) observation transfers to Ch13: its parenthetical "(Shor and Grover)" as a gloss for Chapter 15 is incomplete rather than wrong — Ch15 also carries HHL, walks, and the variational family — but as an informal aside it needs no fix. (Ch25 §25.3 "Variational Algorithms in Practice" is the practice companion, not the primary treatment.) Recorded so the audit trail shows the suspicion was checked rather than silently dropped.

### book/part-06-algorithms/13-quantum-algorithms-mindset.md (Chapter 13, 162 lines, 8 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — how-to-read now says three primitives (§§13.1, 13.2, 13.4) with §13.3 as their cost framework; Shor verification stated as checking a^r ≡ 1 (mod N).

**Overall:** Exactly what a Part-opening mindset chapter should be — short, opinionated, and prophylactic. The §13.1 demolition of "tries all answers at once" is careful in the ways that matter (it concedes the per-shot information-rate point *and* preserves the Deutsch–Jozsa nuance); the three-step "Hadamard sandwich" schema in §13.2/§13.5 is a genuinely useful compression of Chapter 14; and §13.7 is the most honest complexity framing I've seen at this level ("the standard *belief* is no, supported by …; the standard *proof* is absent"). Verified: H^⊗n phase formula (−1)^{x·y} ✓; kickback identities (both eigenphase and |−⟩-ancilla forms) ✓; QFT stated with the **minus-sign convention** — consistent with the book's declared QFT-sign choice ✓; O(n²) QFT gate count ✓; Simon's s·y = 0 support ✓; Grover rotation rate O(1/√N) per iteration and O(√N) iterations ✓; BQP ⊆ AWPP ✓ (Fortnow–Rogers); P ⊊ EXP as the nearby unconditional separation ✓; Pell's equation in the abelian-HSP family ✓ (Hallgren); Tang 2018 dequantisation framing ✓; "Simon is the algorithm Shor saw and generalised" ✓ (historically documented). Forward references verified against the actual files this session: §14.1 Deutsch, §14.2 Deutsch–Jozsa, §14.3 Bernstein–Vazirani, §14.4 Simon, §14.5 QFT, §14.6 QPE — all heading titles match ✓; Chapter 15 = Landmark Quantum Algorithms (Shor/Grover) ✓; Chapter 16 §16.1 = Hamiltonian Simulation ✓; §8.10 magic states ✓ (from Ch8 review). This also resolves the standing uncertainty-ledger item "verify Ch14 §14.1 is Deutsch" — confirmed ✓.

- **Severity:** Low · **Category:** Internal consistency · **Location:** "How to read" (line 9) vs §13.2 (line 27) vs §13.4 (line 67)
  - **Problem:** The how-to-read block promises "the four 'primitives' in §13.1–13.4", but the body's own numbering contradicts it: §13.2 opens "The **second** primitive is phase kickback" and §13.4 opens "The **third** primitive is the quantum Fourier transform" — skipping §13.3 (oracle-based thinking), which is framed as a model, not a primitive. Either there are three primitives (and the how-to-read should say §§13.1, 13.2, 13.4) or the QFT is the fourth.
  - **Recommendation:** Cheapest fix: call the QFT "the third primitive" → keep, and change line 9 to "the three primitives in §§13.1–13.4 (with the query model of §13.3 as the cost framework)".
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Technical precision · **Location:** §13.6, verifiable-output paragraph (line 111)
  - **Problem:** Shor post-processing "both extracts r and verifies **divisibility**" — the actual verification is checking the candidate period (a^r ≡ 1 mod N) and the subsequent gcd step; "verifies divisibility" doesn't name a specific check and could puzzle a reader who meets the real algorithm in Ch15.
  - **Recommendation:** "…and verifies the candidate period directly (a^r ≡ 1 mod N)".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Consistency (running tally) · **Location:** line 3 (status block)
  - **Problem:** 8/8 with 8 H2 sections including the §13.8 Bridge — bridge *counted*, agreeing with Ch12 but disagreeing with Ch10/Ch11. Running tally of the two counting styles: bridge-excluded (Ch9, Ch10, Ch11 + earlier), bridge-included (Ch12, Ch13).
  - **Recommendation:** Covered by the §13 lint-rule recommendation.
  - **Certainty:** High.

**Entertainment:** high — "no amount of superposition will rescue you", "reading it well makes Chapter 15 read itself", and the deliberate "inoculation" framing give the chapter voice without sacrificing precision. **Pedagogy:** the chapter does real work distinguishing query/time/gate/T-count metrics *before* the reader meets any algorithm — that ordering is right, and the quantum-inspired/dequantisation caveat placed here (rather than after Ch16 disappoints someone) is honest sequencing. Sanity checks: 5, policy-compliant ✓ (check 3 recomputed: minus signs at y with y₁⊕y₃ = 1, matches (−1)^{x·y} ✓). **Rendering:** clean; `\\{0,1\\}` house escaping in super/subscripts ✓; no tables or figures needed.

### book/part-06-algorithms/14-foundational-algorithms.md (Chapter 14, 153 lines, 10 H2 sections)

> ✅ **Remediation 2026-07-04 (commits 98e1f45, batch 3b):** FIXED — §14.6 false PE-vs-AE contrast corrected (shared ε⁻¹, quadratic over classical ε⁻²); approximate/banded QFT (Coppersmith) added to §14.5; duplicate figure-convention caveat removed (caption retained); status 10/10 (batch 3b).

**Overall:** A model tutorial chapter. The four black-box algorithms are presented at exactly the right depth, each with its one-line mechanism; the QFT/QPE pair handles the book's minus-sign convention with unusual care — I specifically verified the §14.6 claim that in the negative-exponent convention the cascade state Σₓe^{2πiφx}|x⟩/√2ᵗ equals F⁻¹|2ᵗφ⟩ so the **forward** QFT (not the inverse, as in most positive-convention texts) completes phase estimation ✓, and the parenthetical warning about "off-by-a-conjugation bugs" is exactly the practitioner detail the book promises. Also verified: Deutsch/DJ/BV mechanics and the deterministic-classical 2ⁿ⁻¹+1 bound ✓; Simon's Ω(2^{n/2}) birthday bound, O(n) queries + O(n³) 𝔽₂ elimination ✓; the honest scoping "query-complexity separation, not unconditional time-complexity" ✓; QPE success probability ≥ 4/π² ✓; Grover operator algebra — recomputed that −AS₀A⁻¹S_f with S₀ = 2|0ⁿ⟩⟨0ⁿ|−I, S_f = 2P_good−I reduces exactly to §14.7's G = (2|ψ⟩⟨ψ|−I)(I−2P_good) when A = H^⊗n ✓; sin((2k+1)θ) amplification and k ≈ π/4θ ✓; amplitude-estimation eigenvalues e^{±2iθ} ✓; HSP instance table (Simon {0,s}; BV codimension-1; order-finding H = rℤ with the honest "realised on a large finite cyclic register" caveat; dihedral→lattice via Regev; Kuperberg subexponential; symmetric group→GI) ✓; glued-trees and forrelation as genuine non-HSP exceptions ✓. Sanity check 3 recomputed: QFT₄|1⟩ = ½(1, −i, −1, i) ✓ in the book's convention. **Anchors verified on disk:** all three figures exist (deutsch-jozsa.svg, bernstein-vazirani.svg, qft-3qubit.svg) ✓; `examples/deutsch_jozsa.py` exists and matches the inline snippet (file adds type hints and a verdict print — same circuit, same API) ✓; the predicted `{'111': 1000}` is correct — the chosen balanced oracle is the BV oracle with s = 111, so the output is deterministic ✓; §4.13 = "Fourier Transform Basics" ✓; §8.11 = "Solovay–Kitaev Theorem" ✓; Chapter 29 = "Optimization, Finance, and Industrial Use Cases" (option-pricing ref fits) ✓.

- **Severity:** Medium · **Category:** Correctness (false contrast) · **Location:** §14.6, final sentence (line 107)
  - **Problem:** "The required precision t = O(log(1/ε)) … gives the standard ε⁻¹-scaling **that distinguishes phase estimation from amplitude estimation**." It does not distinguish them — amplitude estimation has the *same* O(1/ε) scaling, as the book itself states two sections later (§14.8: "precision ε with O(1/ε) Grover iterations"). The genuine contrast is with *classical sampling / direct shot-noise estimation* at O(1/ε²). As written, the sentence contradicts §14.8 and will confuse exactly the careful reader it is aimed at.
  - **Recommendation:** "…gives the standard ε⁻¹-scaling that phase estimation shares with amplitude estimation (§14.8) and that beats the ε⁻² of classical sampling."
  - **Certainty:** High.

- **Severity:** Low · **Category:** Completeness · **Location:** §14.5 (line 99)
  - **Problem:** The section quantifies the exact-QFT synthesis cost O(n² log(n/ε)) but never mentions the **approximate (banded) QFT** — dropping controlled rotations below angle ~2π/2^{O(log(n/ε))} gives O(n log(n/ε)) gates with negligible fidelity loss (Coppersmith). This is the form actually used in every serious Shor compilation and belongs precisely in the paragraph that raises the synthesis-cost issue.
  - **Recommendation:** One sentence + citation after the Solovay–Kitaev caveat.
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Redundancy · **Location:** §14.5, figure caption vs body (lines 93–95)
  - **Problem:** The positive-convention-drawing caveat is stated twice back-to-back — once inside the figure alt text/caption and again in the parenthetical paragraph immediately below it.
  - **Recommendation:** Keep the caption version (it travels with the figure); trim the body paragraph.
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Consistency (running tally) · **Location:** line 3 (status block)
  - **Problem:** 9/9 vs 10 H2 sections (§14.10 Bridge uncounted). Tally: bridge-excluded Ch9/10/11/14, bridge-included Ch12/13.
  - **Recommendation:** Covered by the §13 lint-rule recommendation.
  - **Certainty:** High.

**Entertainment:** strong — "reading it well makes Chapter 15 read itself" is being made good on; the DJ honesty ("the exponential separation is artificial") earns trust before Shor spends it. **Pedagogy:** the DJ→BV→Simon ladder with the explicit HSP mapping at the end is the right scaffold, and running code at the *first* algorithm the reader can fully grasp (DJ) is well-placed. Sanity checks: 5, policy-compliant ✓ (checks 3–4 recomputed correct; check 5 well-posed: N=16, M=1 → k = 3, success ≈ 0.961). **Rendering:** clean; house escaping consistent; both figure alt texts are genuinely descriptive ✓.

### book/part-06-algorithms/15-landmark-quantum-algorithms.md (Chapter 15, 166 lines, 11 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — "(Miller 1976)" attribution; DLP post-processing = modular inversion x = a·b⁻¹ mod r (Ekerå variants noted for lattice methods); Spielman added to glued-trees citation; mixing-speedup parenthetical replaced with the honest case-by-case/open statement; "§15.5 derivatives" phrase removed; §15.3 Schnorr item disentangled into Schnorr 2021 (classical) + Yan et al. 2023 (hybrid); status 11/11.

**Overall:** The chapter the whole book has been building toward, and it holds up. The Grover treatment is unusually careful about the iteration count (round(π/4θ − ½) with the exact sin²((2k+1)θ) probability, the floor variant explicitly downgraded) ✓ recomputed; the §15.3 resource-estimate section does the moving-target discipline right (dated snapshot warnings, two anchor estimates, mechanism named for the 20× drop); and §§15.5/15.9/15.10 are admirably deflationary where the literature warrants it (HHL caveats, QAOA "has not materialised", QML "most quantum advantages ... evaporate"). **Code verified line-by-line:** the Grover snippet's H·MCX·H construction is a correct CCZ (phase oracle for |111⟩) ✓; the diffusion sequence is the standard 2|ψ⟩⟨ψ|−I ✓; 2 iterations optimal for N=8, M=1 (π/4θ = 2.17) ✓; predicted ≈95% success matches sin²(5θ) ≈ 0.945 ✓; sample counts sum to 1000 ✓; `examples/grover.py` exists and matches (adds docstring/summary print only) ✓. **Facts verified:** Gidney–Ekerå 2019/2021 (~20M qubits, ~8 h, 10⁻³ error) ✓; Gidney arXiv 2505.15917 (<1M qubits, <1 week) ✓ incl. the three named ingredients (Chevignard–Fouque–Schrottenloher residue arithmetic, yoked surface codes, reduced distillation) ✓; ~2d² physical/logical with d in the high twenties ✓; NIST 2024 FIPS 203 ML-KEM / FIPS 204 ML-DSA lineage ✓; BBBV optimality ✓; Dürr–Høyer minimum finding ✓; Shor gate count O(n² log n log log n) via Schönhage–Strassen ✓; ECDLP ≈ half the cost of RSA (Roetteler et al. 2017, Häner et al. 2020) ✓; HHL O(log N · s²κ²/ε) original vs CKS/QSVT linear-κ successors ✓; conditional-rotation angle 2 arcsin(C/λ) ✓; element distinctness O(n^{2/3}) (Ambainis) ✓; triangle finding Õ(n^{1.3}) → Õ(n^{5/4}) progression (MSS → Belovs/LMS → Le Gall) ✓; barren plateaus (McClean et al. 2018) ✓; QAOA p=1 Max-Cut 3-regular ratio 0.6924 ✓ with the exactly-right adiabatic-schedule caveat on the p→∞ claim ✓; QAOA ansatz operator ordering ✓. **Cross-refs verified:** §8.13 = "Parameterized Gates" ✓; §9.6 ✓; §11.5 shadows ✓; ZNE/PEC do live in Chapter 18 (full treatment, lines ~314–318) with Ch25 as practice recap — Ch15's "(Chapter 18)" is correct ✓.

- **Severity:** Low · **Category:** Attribution (requires verification) · **Location:** §15.2 (line 51)
  - **Problem:** "The classical reduction (**Miller, Rabin**)" — the factoring→order-finding reduction is due to **Miller (1976)**; Rabin's name attaches to the Miller–Rabin *primality test*, not to this reduction. Shor's paper credits Miller.
  - **Recommendation:** "(Miller 1976)"; drop Rabin or cite the specific Rabin contribution intended.
  - **Certainty:** Medium-high (recalled; worth a citation check).

- **Severity:** Low · **Category:** Technical precision · **Location:** §15.4 (line 76)
  - **Problem:** "classical post-processing recovers x via **lattice reduction**" — in the standard Shor DLP algorithm the post-processing is modular arithmetic: sampled pairs satisfy a ≡ bx (mod r), so x = a·b⁻¹ mod r once a pair with gcd(b, r) = 1 is drawn. Lattice reduction enters in *Ekerå-style* short-DLP/tradeoff variants, not the textbook version being described.
  - **Recommendation:** "recovers x by modular inversion (x = a·b⁻¹ mod r); Ekerå's refinements use lattice-based post-processing."
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Attribution · **Location:** §15.6 (line 100)
  - **Problem:** The glued-trees result is credited "Childs–Cleve–Deotto–Farhi–Gutmann (2003)" — the paper ("Exponential algorithmic speedup by quantum walk", STOC 2003) has a sixth author: **Spielman**.
  - **Recommendation:** Add Spielman (or use "Childs et al. 2003").
  - **Certainty:** High.

- **Severity:** Low · **Category:** Requires verification · **Location:** §15.6 (line 102)
  - **Problem:** Szegedy quantization "achieves a quadratic speedup in the spectral-gap dependence of hitting/search problems (**and, correspondingly, of the mixing-time exponent**)". The quadratic speedup for *hitting/detection* is established; a general quadratic speedup for *mixing* is a long-standing open question (known only for special chains/conditions). The parenthetical asserts more than the literature supports.
  - **Recommendation:** Drop the parenthetical or hedge ("mixing speedups are known only case-by-case"). Added to uncertainty ledger.
  - **Certainty:** Medium.

- **Severity:** Nit · **Category:** Phrasing · **Location:** §15.5 (line 94)
  - **Problem:** "HHL is the prototype for 'block-encoded linear algebra' and its successors (**Chapter 16, §15.5 derivatives**)" — the self-referential "§15.5 derivatives" is opaque (derivatives *of this section*?).
  - **Recommendation:** "…and its successors (Chapter 16)".
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Consistency (running tally) · **Location:** line 3 (status block)
  - **Problem:** 10/10 vs 11 H2 sections (§15.11 Bridge uncounted). Tally: bridge-excluded Ch9/10/11/14/15; bridge-included Ch12/13.
  - **Recommendation:** Covered by the §13 lint-rule recommendation.
  - **Certainty:** High.

**Entertainment:** high — QML as "the most over-promised and under-delivered subarea in the field" sets the tone, and §15.3's "difference of degree, not kind" is the single best sentence I've seen on the CRQC timeline debate. **Pedagogy:** the three HHL caveats as a numbered list is exactly how that algorithm should be taught; the deflationary QAOA/QML verdicts protect the reader's calibration. Three moving-target warnings correctly deployed (§15.3, §15.8, §15.10) ✓. Sanity checks: 5, policy-compliant ✓ (check 1 recomputed: N=256, M=4 → k=6, success ≈ 0.997 ✓; check 2's r=4 for a=7, N=15 verified ✓). **Rendering:** clean; QAOA display equation escaping correct; figure `grover-iteration.svg` exists with descriptive alt text ✓.

### book/part-06-algorithms/16-modern-algorithmic-frontier.md (Chapter 16, 231 lines, 9 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — optimal-scaling Θ now carries log(1/ε)/loglog(1/ε) in both §16.1 and §16.5, with the ε-part lower bound credited to BCCKS and the t-part to BACS; "per-step" → "total" error labels (both sites); sampling hardness "under widely believed complexity conjectures"; QSVT slogan re-attributed to Martyn–Rossi–Tan–Chuang 2021 (corroborated by App D); status 9/9.

**Overall:** The hardest chapter to write in Part 6 and largely a success — the LCU → block-encoding → qubitization → QSP/QSVT dependency chain is presented in the right order with the right emphasis ("once you know the polynomial you want, you know the algorithm"). Verified: first-order Trotter error O(t²Σ‖[Hⱼ,Hₖ]‖/r) and the r-choices for ε ✓; S₂ palindrome kills the leading BCH term ✓; LCU prepare–select–unprepare algebra incl. success probability ‖H|ψ⟩‖²/α² and the AA-improved O(α/‖H|ψ⟩‖) ✓; Taylor truncation K = O(log(1/ε)/log log(1/ε)) ✓ (BCCKS); block-encoding definition, (α, a, ε) notation, sparse-access subnormalisation s‖A‖_max, purification-gives-α=1, product-composition rules ✓; qubitization 2D-invariant-subspace rotation with cos θ_λ = λ and spectrum e^{±i arccos λ} ✓; QSP characterisation (parity, degree, |P|²+(1−x²)|Q|² = 1) stated exactly right ✓, sanity check 3's degree-1 instance verified (x² + (1−x²) = 1) ✓; phase-finding lineage (Haah 2019; Chao–Ding–Gilyén–Huang–Szegedy 2020 — author list correct; Dong–Meng–Whaley–Lin symmetric QSP) ✓; matrix-inversion degree Θ(κ log(κ/ε)) vs original HHL O(κ²/ε) ✓; Carleman linearisation with the R < 1 dissipativity condition and the Liu et al. 2021 attribution ✓; QMC O(σ/N) via amplitude estimation with the coherent-encoding caveat ✓; GE-2019-consistent "3×10⁹ Toffolis" ✓; the dequantisation narrative (stable-rank dependence, access-model lesson) is the best short account of that episode I know of. The §16.8 classical-shadows contrast ("dequantisation removes a speedup; shadows combine with quantum primitives") is a genuinely clarifying original touch.

- **Severity:** Low · **Category:** Mathematical precision + attribution · **Location:** §16.1 (lines 21–27) and §16.5 (line 137)
  - **Problem:** Two related slips in the "optimal scaling" claim. (i) T(t,ε) = **Θ**(t‖H‖ + log(1/ε)) drops the log log denominator: the tight bound is Θ(t‖H‖ + log(1/ε)/log log(1/ε)), and the book's own §16.3 keeps the log log in the Taylor-series truncation — so the chapter is internally inconsistent, and as a Θ-statement §16.1's form is strictly false (log/log log = o(log)). (ii) The lower bound is credited wholly to Berry–Ahokas–Cleve–Sanders (twice): BACS 2007 gives the Ω(t) no-fast-forwarding part; the Ω(log(1/ε)/log log(1/ε)) precision part is BCCKS 2014.
  - **Recommendation:** Either write O(·) instead of Θ(·) with a footnote, or state the exact form once; credit the ε-part to BCCKS.
  - **Certainty:** High on the internal inconsistency; medium-high on the exact lower-bound form.

- **Severity:** Low · **Category:** Terminology (mislabel) · **Location:** §16.2 (line 53)
  - **Problem:** "the **per-step** error drops to O(t³/r²) from O(t²/r)" — both expressions are the *total* (accumulated) errors; the per-step errors are O((t/r)²) and O((t/r)³). Same mislabel for the order-2k formula ("per-step error O(t^{2k+1}/r^{2k})" — that is r·O((t/r)^{2k+1}), the total). The subsequent r-choices are computed from the totals, confirming the mislabel.
  - **Recommendation:** Replace "per-step" with "total" (or give both).
  - **Certainty:** High.

- **Severity:** Low · **Category:** Overclaim · **Location:** §16.8 (line 200)
  - **Problem:** Sampling problems "where the classical analogue is **provably hard** (boson sampling, random-circuit sampling)". The hardness is *conditional* — exact-sampling hardness rests on polynomial-hierarchy non-collapse; approximate-sampling hardness needs further conjectures (anticoncentration, average-case #P). A book this careful about "believed but not proven" elsewhere (§13.7) should not say "provably" here.
  - **Recommendation:** "…provably hard under widely believed complexity conjectures".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Attribution (requires verification) · **Location:** §16.7 (line 184)
  - **Problem:** The slogan "QSVT is to quantum algorithms what Fourier analysis is to classical signal processing" is attributed to "the original paper" (Gilyén–Su–Low–Wiebe 2019). I could not place that sentence in GSLW from memory; it reads like the framing of the later "Grand Unification of Quantum Algorithms" survey (Martyn–Rossi–Tan–Chuang 2021).
  - **Recommendation:** Verify the source; if it is Martyn et al., re-attribute.
  - **Certainty:** Low-medium (added to uncertainty ledger).

- **Severity:** Nit · **Category:** Consistency (running tally) · **Location:** line 3 (status block)
  - **Problem:** 8/8 vs 9 H2 sections (§16.9 Bridge uncounted). Tally: bridge-excluded Ch9/10/11/14/15/16; bridge-included Ch12/13.
  - **Recommendation:** Covered by the §13 lint-rule recommendation.
  - **Certainty:** High.

**Entertainment:** good for the most technical chapter in the book — the "spectral lift" framing of qubitization and the closing "better representations, better polynomials, tighter accounting" triad give shape to what could have been a formula dump. **Pedagogy:** the how-to-read's dependency-order note (§§16.3→16.4→16.5) is accurate and important; "Trotter for NISQ, qubitization/QSVT for fault-tolerant" is the right take-home; the §16.1 note that simulation outputs a *state*, not statistics, preempts the classic misreading. Sanity checks: 5, policy-compliant ✓ (check 1: α = 3 ✓; check 3 verified above ✓). **Rendering:** heavy display math all correctly escaped (`\\|`, `\\,`, `\\\\` in the pmatrix) ✓; no figures (the 2×2 block-encoding matrix serves as the visual anchor — adequate, though a QSP phase-sequence diagram would help §16.6).

### book/part-07-complexity/17-complexity-theory.md (Chapter 17, 331 lines, 14 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — "six classes"; QCMA/QMA separation stated one-way with unconditional containment noted; Kempe–Regev (k=3) / KKR (k=2) / AGIK-as-1D lineage corrected; forrelation refined bound Ω̃(√N) (original N^{1/4} noted); triangle finding n^{5/4} aligned with Ch15; Jiuzhang 3.0 → 2023; **false "BQP ≠ EXP" claim replaced with BQP ⊊ EXPSPACE + explicit note that BQP vs EXP is open**; §17.10/bridge RSA-2048 numbers aligned with §15.3/§16.8 (3×10⁹ Toffoli, 20M qubits, 8h); bridge numbered §17.14; status 14/14. DEFERRED — Hefei/Wuxi 2024 RCS source check (uncertainty ledger → factcheck/).

**Overall:** Ambitious and mostly excellent — the practitioner framing ("the working complexity vocabulary … after Arora–Barak distils"), the honest NP-vs-BQP treatment ("believed to be incomparable"), the MIP* = RE account (correct on all the delicate points: unbounded *entanglement* not communication, halting problem membership, Connes embedding resolved negatively), Raz–Tal, BQP^BQP = BQP, the four-meanings taxonomy of "exponential speedup", and the three-islands simulability section are all first-rate. But this chapter has the highest defect density so far — several checkable claims are wrong or internally inconsistent, which matters most in precisely the chapter that teaches readers to parse claims carefully.

- **Severity:** Medium · **Category:** Mathematical (false theorem claim) · **Location:** §17.7 (line 171)
  - **Problem:** Lists as an unconditional separation "BQP ≠ EXP (combining the hierarchy with BQP ⊆ PSPACE ⊆ EXP)". This argument is invalid: P ⊊ EXP plus P ⊆ BQP ⊆ PSPACE ⊆ EXP yields only the *disjunction* "BQP ≠ P **or** BQP ≠ EXP" — you cannot conclude which inequality holds. BQP = EXP would imply PSPACE = EXP, which is **open**, so BQP vs EXP is open. A section explicitly cataloguing which separations are unconditional must not contain a false one.
  - **Recommendation:** Replace with a correct coarse separation: **BQP ⊊ EXPSPACE** (BQP ⊆ PSPACE ⊊ EXPSPACE by the space hierarchy), or state the disjunction honestly.
  - **Certainty:** High.

- **Severity:** Medium · **Category:** Internal consistency (numbers) · **Location:** §17.10 (line 247) and the Bridge (line 318)
  - **Problem:** "Shor's algorithm at RSA-2048 sizes is roughly **7×10⁹ Toffoli** gates … drives the **~10 million physical qubits, ~10 hour** estimates of §15.3." Three-way conflict: §15.3 (the section explicitly cited) says **20 million qubits, 8 hours** (Gidney–Ekerå), and §16.8 says "**3×10⁹** Toffolis for RSA-2048". Gidney–Ekerå's published figures are ≈2.7×10⁹ Toffolis, 20M qubits, 8h — so §16.8 is right and §17.10 is wrong on all three numbers, while citing §15.3 as its source. The bridge repeats "ten million physical qubits, ten hours".
  - **Recommendation:** Align §17.10 and the bridge with §15.3/§16.8 (2.7–3×10⁹ Toffoli, 20M qubits, 8h — or the 2025 Gidney figures, consistently).
  - **Certainty:** High (internal inconsistency verifiable in-repo; external figures from the cited papers).

- **Severity:** Low · **Category:** Mathematical (impossible claim) · **Location:** §17.3 (line 86)
  - **Problem:** On QCMA vs QMA: "**oracle separations exist on both sides**". Impossible — QCMA ⊆ QMA holds unconditionally (relativised too), so no oracle can make QCMA strictly larger. The literature has quantum-oracle separations in one direction only (Aaronson–Kuperberg 2007; later in-place/distributional refinements), which §17.7 states correctly.
  - **Recommendation:** "an oracle separation is known (Aaronson–Kuperberg 2007), and the natural conjecture is that they are distinct."
  - **Certainty:** High.

- **Severity:** Low · **Category:** Attribution · **Location:** §17.3 (line 88)
  - **Problem:** Two slips in the local-Hamiltonian lineage. (i) "Kempe–Kitaev–Regev showed k = 3, then k = 2" — 3-local is **Kempe–Regev** (2003); 2-local is Kempe–**Kitaev**–Regev (2006). (ii) Geometric locality "on a 2D lattice — by results of Oliveira–Terhal **and Aharonov–Gottesman–Irani–Kempe**" — AGIK is the **1D line-of-qudits** result, strictly stronger than 2D and mislabelled here.
  - **Recommendation:** "(Kempe–Regev: k = 3; Kempe–Kitaev–Regev: k = 2) … 2D lattice (Oliveira–Terhal) and even a 1D line of qudits (Aharonov–Gottesman–Irani–Kempe)."
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Factual (stale bound) · **Location:** §17.6 (line 148)
  - **Problem:** Forrelation "(Aaronson 2010, **refined by Aaronson–Ambainis**): Õ(1) vs **Ω̃(N^{1/4})**" — N^{1/4} is the *original 2010* lower bound; the Aaronson–Ambainis refinement raised it to Ω̃(√N) (tight). As written, the refinement is cited while the pre-refinement number is given.
  - **Recommendation:** "1 quantum query vs Ω̃(√N) classical (Aaronson–Ambainis)".
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Internal consistency · **Location:** §17.8 (line 182)
  - **Problem:** "quantum walks giving … **n^{1.26…}** for triangle finding" — Ch15 §15.6 (correctly) gives the current best as Õ(n^{5/4}) = n^{1.25}; no stage of the known progression is 1.26 (MSS 1.3, Belovs ≈1.296, LMS ≈1.286, Le Gall 1.25).
  - **Recommendation:** "n^{5/4}" to match Ch15.
  - **Certainty:** High (internal); high (external).

- **Severity:** Low · **Category:** Factual (date, requires verification) · **Location:** §17.8 (line 211)
  - **Problem:** "the **2024** Jiuzhang 3.0 refinements" — Jiuzhang 3.0 was announced/published in **2023**. Also line 209's "USTC … culminating in 2024" and "Hefei and Wuxi" supercomputing-centre RCS claims are specific enough to need source verification.
  - **Recommendation:** Verify dates and the Hefei/Wuxi attribution against sources; adjust.
  - **Certainty:** Medium (added to uncertainty ledger).

- **Severity:** Low · **Category:** Copy edit · **Location:** §17.1 (line 15)
  - **Problem:** "We need **five** classes for the rest of the chapter:" — followed by **six** bullets (P, NP, coNP, BPP, PSPACE, EXP).
  - **Recommendation:** "six".
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Consistency · **Location:** line 316 (bridge heading) + line 3 (status)
  - **Problem:** The bridge heading is unnumbered ("## Bridge to Chapter 18") — every other chapter so far numbers its bridge (§9.14, §12.13, §16.9, …). Status 13/13 vs 14 H2 sections is then "consistent" only by the accident of the missing number. Tally: bridge-excluded Ch9/10/11/14/15/16/17; bridge-included Ch12/13.
  - **Recommendation:** Number it §17.14 and fix the count; lint rule (§13).
  - **Certainty:** High.

**Positive verifications:** BQP ⊆ PP (Adleman–DeMarrais–Huang) ✓; BQP ⊆ AWPP ⊆ PP ✓; Sipser–Gács–Lautemann BPP ⊆ Σ₂ᵖ∩Π₂ᵖ ✓; Savitch ✓; factoring ∈ NP∩coNP with witness argument ✓; Jones polynomial at 5th root of unity (AJL) BQP-complete ✓; Schuch–Verstraete DFT implication ✓; IP = PSPACE, QIP = QIP(3) = PSPACE (JJUW 2010) ✓; MIP = NEXP (BFL) ✓; MIP* = RE details all correct ✓; QMA(2) ⊆ NEXP and N-representability ✓; Raz–Tal forrelation oracle ✓; DJ bounded-error honesty (O(1) classical) ✓; Reichardt tightness correctly scoped to *total* functions ✓; Aaronson–Shi ✓; Gottesman–Irani QMA_EXP ✓; Cubitt–Pérez-García–Wolf undecidability ✓; Sycamore/IBM/Pan–Zhang narrative arc ✓; stabiliser/matchgate/tensor-network simulability triad with the "noise lowers effective bond dimension" explanation of the classical pushbacks ✓. **Entertainment:** high — "without being pushed around by marketing rhetoric in either direction" is the book's thesis in one clause. **Pedagogy:** the VQE-cannot-have-worst-case-guarantees lesson (§17.3) and the "input has to come from somewhere" rule (§17.9) are the two most transferable insights in Part 7. Sanity checks: 5, policy-compliant ✓. **Rendering:** clean throughout; `\mathrm{}` class names consistent; backtick-#P used to dodge the renderer's #-in-math bug — consistent with the documented workaround ✓.

### book/part-08-noise-and-qec/18-noise-decoherence-and-errors.md (Chapter 18, 353 lines, 19 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — thermal population 10⁻⁵ → 10⁻⁷ (recomputed value); neutral-atom 2q "approaching 99.5% (Evered et al. 2023 and successors)"; §18.6 reset figure qualified as after-repeated-rounds with single-pass percent-level noted (harmonised with §21.9); bridge numbered §18.19; status 19/19. DEFERRED — filter-function figure (enhancement backlog).

**Overall:** Outstanding — the best practitioner-facing noise chapter I have seen at this level, and the chapter where the book's "experienced developers" premise pays off hardest (error budgets that must "reconcile to within a factor of two", the benchmark hierarchy of §18.14, the honest bias-variance framing of mitigation). Mathematics recomputed and verified: the GAD Kraus set is complete (K₀†K₀+K₁†K₁ = pI, K₂†K₂+K₃†K₃ = (1−p)I) ✓ with the correct T = 0 reduction and thermal fixed point ✓; 1/T₂ = 1/2T₁ + 1/T_φ consistent with Ch10 ✓; the "1000 gates at 99.9% → ≈63%" arithmetic (1−0.999¹⁰⁰⁰ = 1−e⁻¹) ✓; free-evolution filter t²sinc²(ωt/2) and Hahn-echo sin⁴(ωt/4)/ω² forms ✓; coherent (nδ)² vs incoherent np compounding ✓; RB conversion ε = (1−p)(d−1)/d ✓; QPT cost Θ(16ⁿ/ε²) consistent with Ch11's "4ⁿ× costlier than state tomography" ✓; PEC γ^{2d} ✓. All five sanity checks recomputed correct — notably check 5's linear-ZNE weights (4/3, 1/3, −2/3; Σw = 1, Σλw = 0, Σw² = 21/9 ≈ 2.33) ✓ and check 1's T₂ = 153.8 µs → 2T₁ bound ✓. The XEB aside ("computing the ideal probabilities … is the reason XEB is itself a quantum-advantage demonstration") and the leakage observation ("mitigating leakage is a precondition for the fault-tolerance theorems, not a consequence") are exactly the insights that separate this book from its competitors. Cross-refs verified: §10.11/§10.12 Lindblad/amplitude-damping ✓ (from Ch10 review), §11.4/§11.7 ✓, §12.6 does mention the diamond norm ✓, ZNE/PEC treated here in full as Ch15 promised ✓.

- **Severity:** Low · **Category:** Numerical (recomputed) · **Location:** §18.1 (line 15)
  - **Problem:** "a superconducting transmon at 15 mK with a 5 GHz transition [has] equilibrium excited-state population … **around 10⁻⁵**". Recomputed: hν/k_BT = (6.63×10⁻³⁴·5×10⁹)/(1.38×10⁻²³·0.015) ≈ 16.0, so p₁^eq ≈ e⁻¹⁶ ≈ **10⁻⁷**. The stated 10⁻⁵ corresponds to ≈20–21 mK. The paragraph's actual point (measured effective temperature far exceeds equilibrium) is unaffected — indeed *strengthened* by the correct number, since the gap to the observed 10⁻³–10⁻² becomes even more dramatic.
  - **Recommendation:** "around 10⁻⁷" (or change the stated temperature).
  - **Certainty:** High (recomputed this session).

- **Severity:** Low · **Category:** Currency (requires verification) · **Location:** §18.4 (line 86)
  - **Problem:** Two-qubit fidelities "taken from leading platforms over 2023–2025" list "**99.0% on neutral atoms**" — but Evered et al. (Nature 2023) reported 99.5% Rydberg CZ, and 2024–2025 neutral-atom results are at or above that. Within the stated window, 99.0% undersells the platform.
  - **Recommendation:** "≈99.5% on neutral atoms" or hedge; verify against latest published numbers.
  - **Certainty:** Medium-high (added to uncertainty ledger).

- **Severity:** Nit · **Category:** Consistency · **Location:** line 338 (bridge heading) + line 3 (status)
  - **Problem:** Unnumbered "## Bridge to Chapter 19" — second unnumbered bridge in a row (with Ch17), where Chapters 9–16 number theirs. Status 18/18 counts only the numbered sections.
  - **Recommendation:** Number it §18.19 (or adopt unnumbered bridges book-wide); lint rule (§13).
  - **Certainty:** High.

**Entertainment:** remarkably high for a catalogue chapter — "the gap between simulation and reality is where the residual physics lives" and the TLS-bath narrative give it a working-lab texture. **Pedagogy:** the §18.10 coherent/incoherent → §18.12 RB-blindness → §18.13 purity-benchmarking chain is beautifully sequenced (each section motivates the tool the next one introduces); the §18.18 "when mitigation hurts" list is the kind of negative knowledge textbooks usually omit. The five-family noise taxonomy (§18.1) with the promise that platform-specific mechanisms come in Ch21 keeps scope discipline. Sanity checks: 5, policy-compliant, all recomputed ✓. **Rendering:** long chapter, heavy math, house escaping consistent throughout ✓; the four-display GAD Kraus block renders cleanly; no figures — a filter-function plot (free vs echo vs CPMG) would be the single highest-value figure addition in Part 8 so far.

### book/part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md (Chapter 19, 341 lines, 23 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 98e1f45):** FIXED — no-cloning ref §5.7→§5.13; concatenation formula corrected to C^{2^ℓ−1}p^{2^ℓ} = (Cp)^{2^ℓ}/C; rotated/unrotated qubit-count parenthetical untangled (planar data d²+(d−1)²; rotated d² data, 2d²−1 total); §19.16 halving claim scoped to near-threshold Λ≈2 vs ratio-0.1 ×10 regimes; colour-code lattice description fixed (6.6.6 / 4.8.8); transversal-S stated with S/S† convention note; T-teleport gadget = one CNOT + measurement + conditional S; Stim (Gidney) and PyMatching (Higgott) credited; Willow d3→d7 suppression stated as Λ≈2.14 per step (≈4–5×); sanity-check-5 inline answer removed (policy restored). DEFERRED — surface-code lattice + lattice-surgery figures (enhancement backlog).

**Overall:** The pipeline chapter the whole Part exists for, and the hard technical content is impressively right. I recomputed the delicate bits: the **Shor-code logical operators** (X̄ = Z₁Z₄Z₇, Z̄ = X₁X₂X₃ — the book correctly navigates the classic trap, even noting that X₁⋯X₉ acts as Z̄ and that Z₁Z₂Z₃ anticommutes with the X₁⋯X₆ stabiliser and is therefore a detectable error, not a logical) ✓; the **CSS recipe** (X-stabilisers from H(C₁), Z from H(C₂⊥)) — checked for consistency: generator/parity-check counts give k = k₁−k₂ and the orthogonality argument makes the two families commute; instantiated on Steane it reproduces exactly the six listed stabilisers, whose supports match the binary-of-1..7 Hamming columns ✓; the bit-flip syndrome table ✓; the [[9,1,3]]/[[7,1,3]] parameter claims ✓; the "3-qubit code has quantum distance 1" honesty ✓ (most books get this wrong); Eastin–Knill stated correctly (finite transversal group) ✓; sanity checks 1–5 recomputed ✓ (check 5's arithmetic: 0.1·(0.1)^{(d+1)/2} ≤ 10⁻¹⁵ → d = 27 ✓); Willow d=3/5/7, 105 qubits, Λ ≈ 2.14, logical-beats-physical ~2× ✓; Bravyi–Kitaev 15-to-1 with 35p³ ✓; Panteleev–Kalachev / Leverrier–Zémor good-qLDPC attribution ✓; IBM bivariate-bicycle ~10× rate at d=12 ✓ ([[144,12,12]]); Horsman–Fowler–Devitt–Van Meter 2012 and Litinski 2019 ✓.

- **Severity:** Low · **Category:** Cross-reference (wrong section) · **Location:** §19.1 (line 7)
  - **Problem:** "the no-cloning theorem (**§5.7**)" — §5.7 is "Probability Amplitudes vs. Classical Probabilities"; no-cloning is **§5.13** (headings verified this session; Ch12 §12.8 cites §5.13 correctly).
  - **Recommendation:** §5.13.
  - **Certainty:** High.

- **Severity:** Low · **Category:** Mathematical (typo, self-inconsistent) · **Location:** §19.19 (line 262)
  - **Problem:** Concatenation error scaling: "one level … ∼Cp², two levels ∼C³p⁴, ℓ levels to ∼**p^{2^ℓ}/C^{2^ℓ−1}**". The ℓ-level formula divides by C^{2^ℓ−1} where the recursion multiplies: pℓ = C^{2^ℓ−1}p^{2^ℓ} (= (Cp)^{2^ℓ}/C). The stated two-level case C³p⁴ contradicts the stated general formula in the same sentence.
  - **Recommendation:** C^{2^ℓ−1}p^{2^ℓ}, or the cleaner p_th(p/p_th)^{2^ℓ} with p_th = 1/C.
  - **Certainty:** High (recomputed).

- **Severity:** Low · **Category:** Technical (labels swapped) · **Location:** §19.12 (line 194) vs §19.8 (line 139)
  - **Problem:** "total qubit count is ∼2d² (**or d² + (d−1)² for the rotated variant**)" — d²+(d−1)² is the **unrotated** planar code's *data*-qubit count (exactly what §19.8 says in giving [[d²+(d−1)², 1, d]]); the **rotated** variant has d² data qubits (2d²−1 total with ancillas). The parenthetical swaps the variants and mixes data-only with total counts.
  - **Recommendation:** "≈2d² total including ancillas; the rotated variant reduces data qubits to d² (2d²−1 total)."
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Internal consistency · **Location:** §19.16 (line 236)
  - **Problem:** "Cutting p_L in half typically requires increasing d by 2" — under the formula given two lines earlier with p/p_th ~ 0.1, a +2 increase in d cuts p_L by **10×**, not 2×. The 2× figure matches Google's *empirical* Λ ≈ 2.14 (quoted in §19.17) at that experiment's effective noise ratio; mixing the empirical Λ with the theoretical ratio-0.1 regime in adjacent sentences will confuse a careful reader.
  - **Recommendation:** Attribute the ×2-per-(d+2) figure to near-threshold operation (Λ ≈ 2) and the ×10 to p/p_th = 0.1 explicitly.
  - **Certainty:** High (internal tension).

- **Severity:** Low · **Category:** Consistency (book policy) + verify · **Location:** §19.23 sanity check 5 (line 334) and §19.21 (line 290)
  - **Problem:** (i) Sanity check 5 ends "**（Answer: (d+1)/2 = 14, so d = 27.)**" — the first inline answer in the book; every earlier chapter's checks deliberately withhold answers (a consistency the review has been tracking since Ch7). (ii) §19.21 says T-gate teleportation uses "one copy of |T⟩, **two CNOTs**, an S gate" — the standard gadget uses **one** CNOT plus a conditioned S/Pauli; worth verifying which circuit the author intends.
  - **Recommendation:** Drop the inline answer (or add answers everywhere); check the gadget gate count.
  - **Certainty:** High on (i); medium on (ii) — ledgered.

- **Severity:** Nit · **Category:** Attribution · **Location:** §19.23 (line 324)
  - **Problem:** "Google's Stim **and PyMatching**" — Stim is Gidney's (Google); PyMatching is Higgott's (academic, UCL-origin). Bundling both under "Google's" misattributes the latter.
  - **Recommendation:** "Stim (Gidney) and PyMatching (Higgott)".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Consistency (structure) · **Location:** end of chapter
  - **Problem:** No bridge heading at all — the Chapter-20 hand-off is an unheaded paragraph after the sanity checks (a *third* bridge style, after numbered [Ch9–16] and unnumbered-heading [Ch17–18]). Status 23/23 matches the numbered sections, so the count is accidentally clean.
  - **Recommendation:** Pick one bridge convention book-wide; lint (§13).
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Requires verification (ledgered) · **Location:** §19.23 (line 326), §19.20 (line 274), §19.14 (line 212), §19.12 (line 198)
  - **Problem:** (i) "order-of-magnitude logical error suppression from d = 3 to d = 7" — Λ² ≈ 4.6× is half an order of magnitude; check against the Willow paper's actual endpoint numbers. (ii) "S̄ = S^{⊗7} up to a Pauli correction" — for Steane the transversal S-type gate is usually (S†)^{⊗7}; the hedge doesn't cover a dagger. (iii) Colour codes "on the honeycomb lattice's **medial graph**" — the 6.6.6 colour code lives on the honeycomb lattice directly. (iv) "bosonic codes (Chapter 32)" — Ch32 checklist grows again (now: CV, MBQC, thermodynamic resource theory, bosonic codes).
  - **Certainty:** Medium (all ledgered).

**Entertainment:** high — "the miracle is that quantum error correction is nevertheless possible", the 3×3-block reading of Shor's code, and "the road from d = 7 to d = 27 is the road of the next five years" give the chapter momentum across 23 sections. **Pedagogy:** the §19.3 failure-first sequencing (show the bit-flip code amplifying phase errors *before* stating discretisation) is exactly right; boxed informal statements of the two big theorems serve the stated audience; §19.16's inline resource walk-through (10¹⁰ logical gates → p_L ≤ 10⁻¹¹ → d ≈ 21–27 → millions of qubits) is the single most useful calculation in the book so far. **Completeness:** only one figure (bit-flip code) in the entire chapter — §19.12 badly needs a surface-code lattice diagram (stars/plaquettes/strings), and §19.22 a merge/split cartoon; these are the two highest-value missing figures in the book. **Rendering:** heavy notation, house escaping consistent ✓; the `\mathsf{\#P}`-in-backticks workaround used again ✓.

### book/part-09-hardware-and-software/20-quantum-hardware-platforms.md (Chapter 20, 142 lines, 13 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 0d569bb):** FIXED — Moving-target banner added with explicit Appendix-F-wins deference; Condor stated as exceeding 1000 (1,121); Rigetti Aspen(retired)/Ankaa(square) untangled; Atom Computing second-generation >1000 sites (Phoenix name removed); "an indium-arsenide"; status 13/13. DEFERRED to factcheck/ — silicon 1q gate times, Quantum Motion 1024-dot, NV "TU Wien".

**Overall:** A well-judged platform tour that stays at exactly the right altitude for the audience — physics mechanism, native gate, decisive architectural feature, honest scaling question, per modality. Verified physics: Josephson I(φ) = I_c sin φ and the anharmonicity story ✓; transmon charge-dispersion suppression e^{−√(8E_J/E_C)} at E_J/E_C ≈ 50–100 ✓; MS(θ) = exp(−iθX⊗X) matching §8.12's native-set claim ✓; Rydberg blockade radius 5–10 µm and 100–500 ns gates ✓; KLM original success probability 1/16 ✓; adiabatic condition correctly stated as slow relative to **inverse-square** of the minimum gap ✓; the Majorana-1 paragraph is a model of calibrated skepticism (contested zero-bias-peak interpretation, the 2018–2021 Kouwenhoven retraction as cautionary tale, "high-payoff, currently unrealised long bet") ✓; braiding-gives-only-Clifford with T-injection still required ✓; the honest D-Wave verdict with the "universally accepted as fair" hedge ✓. Sanity checks recomputed: 50 ns/100 µs = 5×10⁻⁴ decoherence floor vs 99.5% reported → control-dominated ✓; ion ratio 10⁻⁵ ✓; 0.99¹⁰⁰ ≈ 0.37 ✓. Bridge numbered (§20.13) — back to the Ch9–16 convention.

- **Severity:** Low · **Category:** Consistency (book convention) · **Location:** whole chapter
  - **Problem:** No **Moving-target warning** banner — the book's own convention (deployed in §8.12, §15.3, §15.8, §15.10 for dated vendor/hardware content) is absent from the single most perishable chapter in the book. Inline hedges exist ("as of 2026", §20.12's check-the-system-level note), but the formal banner a skimming reader would catch is missing.
  - **Recommendation:** Add the standard banner after the intro (and/or before §20.12's numbers).
  - **Certainty:** High (absence verified; severity judgment: Low because inline hedging partially covers it).

- **Severity:** Low · **Category:** Factual (vendor history) · **Location:** §20.5 (line 53)
  - **Problem:** "Atom Computing (whose **Phoenix** system was the first to publish 1000-atom operation)" — Phoenix was Atom Computing's *first-generation ~100-qubit* system (2021); the 1,180-atom array announced in 2023 was the unnamed second-generation machine.
  - **Recommendation:** "whose second-generation system was the first to operate >1000 atomic qubits (2023)".
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Currency/internal tension · **Location:** §20.2 (line 23) vs §20.1 (line 17)
  - **Problem:** §20.2 describes Rigetti's topology as "an octagonal '**Aspen**' tiling" while §20.1 cites "Rigetti's **Ankaa**" as the current device — Ankaa (2023+) moved to a square lattice with tunable couplers; the octagonal tiling describes the retired Aspen generation.
  - **Recommendation:** "Rigetti's earlier Aspen devices used an octagonal tiling; the current Ankaa generation uses a square lattice."
  - **Certainty:** Medium.

- **Severity:** Low · **Category:** Requires verification (ledgered) · **Location:** §20.7 (line 69, 71), §20.8 (line 77)
  - **Problem:** (i) Silicon-spin "10–100 ns for single-qubit rotations" — typical ESR/EDSR single-qubit gates run 0.1–1 µs; 10–100 ns is optimistic outside hole-spin outliers. (ii) "Quantum Motion's 1024-dot quantum-classical chip" — plausible but specific; verify. (iii) NV computing programs "Delft and **TU Wien**" — Delft yes; the second flagship NV program is usually Stuttgart (Wrachtrup) or the commercial Quantum Brilliance; TU Wien is an unexpected pick.
  - **Recommendation:** Verify all three against sources.
  - **Certainty:** Medium (ledgered).

- **Severity:** Nit · **Category:** Factual (internal tension) · **Location:** §20.1 (line 17)
  - **Problem:** "several hundred (IBM's Heron and **Condor** families), with the largest announced processors **approaching** 1000 physical qubits" — Condor, named in the same sentence, is 1,121 qubits, i.e. *past* 1000.
  - **Recommendation:** "exceeding 1000 (Condor, 1,121)".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Copy edit · **Location:** §20.9 (line 85)
  - **Problem:** "in **a** indium-arsenide / aluminium nanowire architecture" — "an indium-arsenide".
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Cross-reference (deferred) + status tally · **Location:** §20.9 (line 83), line 3
  - **Problem:** (i) "$T$ state, §32.4" — Ch32 verification checklist grows again (now: CV, MBQC, thermodynamic resource theory, bosonic codes, §32.4 = topological/T-injection). (ii) Status 12/12 vs 13 H2 sections — bridge numbered §20.13 but uncounted; excluded-tally: Ch9/10/11/14/15/16/17*/18*/20 (*unnumbered).
  - **Certainty:** High (counts); deferred (Ch32).

**Entertainment:** high — "Real hardware is much more interesting", the QCCD-vs-photonic-interconnect fork, and the closing "no single modality has won" verdict keep a spec-sheet chapter readable. **Pedagogy:** the mechanism→native-gate→architecture→open-question template per modality is consistent and effective; sanity checks 1–2 (compute the decoherence floor, then notice the reported fidelity sits *above* it) actively teach the control-vs-coherence distinction rather than stating it. Neutral-atom 2q "approaching 99.5%" is at least *consistent* with Ch18's conservative 99.0% — both trail the published 99.5% (Evered 2023); one coordinated update should fix both (ledgered at Ch18). **Rendering:** clean; unit spacing via `\\,` house-escaped ✓; no figures — a per-modality comparison table in §20.12 rendered as an actual Markdown table (it is currently prose paragraphs) would improve scanability, though prose keeps the hedges attached to the numbers.

### book/part-09-hardware-and-software/21-quantum-control-and-electronics.md (Chapter 21, 160 lines, 16 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 0d569bb):** FIXED — reset residual reconciled with Ch18 (single-round 1–3% vs repeated 10⁻³–10⁻⁴, cross-referenced both ways); garbled IR-photon sentence rewritten (quasiparticle generation + photon-shot-noise dephasing); "Cirq's PulseSchedule" replaced with the accurate no-public-pulse-API statement; MXC cooling power tens-of-µW at base (hundreds at 100 mK); status 16/16. DEFERRED to factcheck/ — "Rigetti Lodgepole" name.

**Overall:** Excellent — the rare chapter that treats control engineering as a first-class subject rather than an appendix, and the currency is impressive: the Qiskit Pulse lifecycle (deprecated 1.3, removed 2.0 in 2025, replaced by OpenQASM 3 defcal) is stated exactly right ✓, and the §21.2 parenthetical that a directional coupler is reciprocal and provides no isolation is the kind of precision that will save a reader from a real mistake ✓. Verified: rotating-frame drive Hamiltonian and t_g = π/Ω₀ ✓; DRAG quadrature = derivative × (−1/α) ✓; fridge stage ladder (50 K / 4 K / still ~700 mK / cold plate ~100 mK / MXC ~10 mK) ✓; standard 20/10/20 dB attenuation rationale ✓; 14-bit DAC ≈ 84 dB dynamic range ✓; virtual-Z-as-frame-advance ✓; reset-loop suppression p_e^k with the independence assumption stated ✓; GRAPE/Krotov/CRAB taxonomy ✓; QUA and LabOne Q ✓; sanity checks recomputed (check 3: φ = 2π·50 kHz·1 µs ≈ 0.314 rad ✓; check 4: k = 3 rounds for 0.02^k < 10⁻⁴ ✓).

- **Severity:** Low · **Category:** Cross-chapter consistency · **Location:** §21.9 (line 93) vs Ch18 §18.6
  - **Problem:** §21.9: "residual excited-state population after active reset (typically **1–3%** on current devices)"; Ch18 §18.6: measurement-based reset residual "typically **10⁻³ to 10⁻⁴**". Two orders of magnitude apart. Both are defensible under different assumptions — 1–3% is single-pass (≈ readout error), 10⁻³–10⁻⁴ is after the 2–3 iterations §21.8 itself recommends — but neither chapter states its assumption, and a reader comparing them will see a contradiction.
  - **Recommendation:** Qualify both: "per single reset round" (Ch21) / "after repeated heralded reset" (Ch18).
  - **Certainty:** High (tension verifiable in-repo).

- **Severity:** Low · **Category:** Garbled sentence (physics) · **Location:** §21.6 (line 59)
  - **Problem:** "infrared (IR) absorbers … to attenuate room-temperature blackbody photons that would otherwise dephase the qubit **at rates of order 1/T₁ ≈ 1 photon per coherence time at 4 K**". The clause mixes a rate (1/T₁), a photon count, and a temperature in a way that parses to nothing definite; the underlying physics (stray IR photons → photon-shot-noise dephasing and quasiparticle generation) deserves a clean sentence.
  - **Recommendation:** Rewrite, e.g. "…which at the ~1-photon-per-µs flux typical of unfiltered lines would limit both T₁ (via quasiparticle generation) and T₂ (via photon-shot-noise dephasing)".
  - **Certainty:** High that the sentence is broken; medium on the intended numbers.

- **Severity:** Low · **Category:** Requires verification (product names) · **Location:** §21.3 (line 37), §21.4 (line 45)
  - **Problem:** (i) "**Cirq's PulseSchedule**" — Cirq has no public pulse-level API by that name (Google's pulse access is internal); this looks like an invented symmetry with Qiskit Pulse. (ii) "Rigetti's **Lodgepole**" as an in-house control system — unverifiable from memory.
  - **Recommendation:** Verify both; if Cirq lacks a public pulse API, say so — that asymmetry is itself informative.
  - **Certainty:** Medium-high on (i), low on (ii) — both ledgered.

- **Severity:** Nit · **Category:** Numerical precision · **Location:** §21.7 (line 65)
  - **Problem:** "the mixing chamber dissipates only **a few hundred microwatts**" — that is the cooling power at ~100 mK; at the 10 mK base temperature quoted in the same sentence, typical dilution refrigerators provide only **tens of microwatts** (e.g. ~20 µW at 20 mK).
  - **Recommendation:** "tens of microwatts at base temperature (a few hundred µW at 100 mK)".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Consistency (running tally) · **Location:** line 3
  - **Problem:** Status 15/15 vs 16 H2 sections (§21.15 Bridge, numbered, uncounted).
  - **Certainty:** High.

**Entertainment:** high — "a control system that only plays open-loop pulses is an instrument; one that closes a loop is a computer" is the best sentence in Part 9, and the closing speed/fidelity/parallelism trilemma lands. **Pedagogy:** the walk *down* the stack (unitary → waveform → converter → fridge) and back *up* (feedback → calibration → interfaces) is the right narrative shape; the calibration cadence as a numbered coarse-to-fine list is directly actionable; sanity check 5 (choose your own calibration cadence and justify by drift mechanism) is the best open-ended exercise in the book so far. **Rendering:** clean; the text-block pseudocode for reset renders fine; unit spacing house-escaped ✓; no figures — a fridge-stack diagram with the attenuation ladder would serve §21.7 well but the prose is self-sufficient.

### book/part-09-hardware-and-software/22-hardware-engineering-metrics.md (Chapter 22, 259 lines, 14 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 0d569bb):** FIXED — Moving-target banner + Appendix-F-wins rule added; **§22.9 internal contradiction resolved** (invented √N rule replaced with the connectivity-dependent statement; Forte = 36 qubits, AQ ≈ N on all-to-all ions); IBM Heron QV 2^15 removed both places (IBM stopped reporting QV after 512/2022 — stated as a data point on saturation); Willow-vs-Morvan RCS campaigns disentangled; ion T₁ split hyperfine/optical (reconciled with Ch20); QV-history dates corrected (Falcon Jan 2020; H0 for 64); H2 fidelity ≈0.999; "H3" → Helios. DEFERRED to factcheck/ — Q-PERFECT project name.

**Overall:** The "adversarial document" framing of vendor sheets is the right stance and the chapter delivers on it — the four-meanings-of-qubit-count taxonomy, the T₂-family disambiguation, the QV saturation critique, and the six-step reading guide (§22.14) are all genuinely useful to the stated audience. Verified: F_avg = (dF_pro+1)/(d+1) with the worked 0.99 → 0.9933 example ✓ (and the "larger is printed" heuristic is mathematically right, F_avg > F_pro for F < 1 ✓); 0.999¹⁰⁰⁰ ≈ 0.37 ✓; heavy-hex avg degree ≈2.5, √127·3 ≈ 33 SWAP-overhead arithmetic ✓; QV protocol (square circuits, heavy-output > 2/3, QV = 2^{d*}) ✓; linear-XEB estimator 2ⁿ⟨p_ideal⟩−1 with correct limits ✓; readout asymmetry mechanism consistent with Ch18 ✓; sanity checks recomputed (check 1: N = 100 gates to 1/e ✓; check 5: ≈30 cycles ✓). Bridge style: merged into numbered §22.14 — a *fourth* bridge convention (tally: numbered separate / unnumbered / absent / merged). **Ledger item resolved:** Ch2's forward promise is now checkable — Ch2 calls the coherent two-qubit-gate budget "**circuit volume**"; Ch22 §22.5 names the same quantity the "**gate-count budget**" (N_ops = T₂^echo/t_2q) and never uses "circuit volume", which moreover collides with §22.7's *Quantum Volume* in the reader's mind. Cross-chapter terminology finding (Low): align Ch2 to "gate-count budget" or add a disambiguating clause.

- **Severity:** Medium · **Category:** Internal inconsistency (×2) + dubious claim · **Location:** §22.9 (lines 155–157) vs §22.13 (line 224)
  - **Problem:** Three mutually inconsistent statements about the same device. (i) §22.9: "AQ scales approximately as **√N_phys** … a 100-physical-qubit device might yield AQ ∼ 10". (ii) §22.9, next paragraph: "IonQ Forte Enterprise reports **AQ = 36 at 64 physical qubits**" — √64 = 8, wildly off the rule just stated. (iii) §22.13: "IonQ Forte / Forte Enterprise — **36 qubits** all-to-all, AQ = 36". Externally, Forte has 36 physical qubits and IonQ's achieved pattern is AQ ≈ N_phys (Aria: 25/25; Forte: 36/36) — which contradicts the √N rule entirely; that heuristic appears to be invented.
  - **Recommendation:** Fix the qubit count to 36 in §22.9, delete or drastically weaken the √N rule (AQ ≈ N on all-to-all ion traps; sublinear on sparse-connectivity devices), and keep §22.13 as the source of truth.
  - **Certainty:** High on the internal contradictions; medium-high on the external facts.

- **Severity:** Low · **Category:** Factual (requires verification, likely wrong) · **Location:** §22.7 (line 131) and §22.13 (line 221)
  - **Problem:** "QV … **2^15 on IBM Heron**" (stated twice). IBM's last *published* QV milestone was 512 (2⁹, Falcon, 2022); IBM then publicly deprecated QV in favour of EPLG/CLOPS-style metrics and, to my knowledge, has never reported a Heron QV. A 2^15 figure has no obvious source.
  - **Recommendation:** Verify; if unsourced, replace with "IBM no longer reports QV (last published: 512 in 2022)" — which is itself a useful data point for the chapter's thesis.
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Factual (conflation, requires verification) · **Location:** §22.10 (line 175)
  - **Problem:** "**Willow's** 2024 results report F_XEB in the 10⁻³–10⁻² range at **n = 67, d = 24**" — those parameters match the Morvan et al. random-circuit-sampling campaign on the 67/70-qubit **Sycamore-class** processor (2023, Nature 2024); Willow's own 2024 RCS demonstration used its 105-qubit lattice. Two experiments appear merged.
  - **Recommendation:** Split the attribution or update the parameters.
  - **Certainty:** Medium.

- **Severity:** Low · **Category:** Cross-chapter consistency · **Location:** §22.4 (line 85) vs Ch20 §20.4
  - **Problem:** Ch22: trapped-ion "T₁ measured in **seconds**"; Ch20: "T₁ > **10⁴ s** (essentially infinite on circuit timescales)" for hyperfine qubits. The Ch22 figure describes optical-transition qubits (metastable D-states, T₁ ≈ 1 s); for the hyperfine qubits both chapters otherwise assume, Ch20 is right.
  - **Recommendation:** "effectively unbounded for hyperfine qubits; ~1 s for optical-transition qubits".
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Requires verification (dates/names/numbers, all ledgered) · **Location:** §22.13
  - **Problem:** (i) "QV 32 on Falcon in **2019**" — announced January 2020. (ii) "64 on Honeywell **System Model H1** in 2020" — QV 64 was **H0** (June 2020); H1 launched at QV 128. (iii) "**Q-PERFECT**" as an EC benchmark project — cannot be placed; verify existence and spelling. (iv) Quantinuum H2 "F_2q ≈ **0.9997**" — published H2 figures are ≈0.999; 0.9997 may be a record single-pair number. (v) "**H3** (announced)" — Quantinuum's announced next generation is named **Helios**. (vi) H2 QV quoted as ~2^19 "as of 2025" — Quantinuum continued climbing (2^20 in 2024, higher since); likely stale.
  - **Recommendation:** Source-check the §22.13 cohort table as a block before publication; it is the highest-perishability content in the book (the section's own self-warning acknowledges this).
  - **Certainty:** Medium (all ledgered).

**Entertainment:** high — "every vendor benchmark sheet … is a small adversarial document" is a thesis statement the whole chapter earns; "mistrust everything new" closes it honestly. **Pedagogy:** §22.14's six-step reading protocol is the most directly reusable artifact in Part 9; the QV critique (saturating, 2q-dominated, non-algorithmic) is fair and balanced; the T₂*/echo/CPMG ladder with "the ratios tell you about the noise spectrum" teaches diagnosis, not just definitions. Sanity check 2 (infer the noise spectrum from T₁ = 200 µs, T₂* = 30 µs) is excellent. **Rendering:** clean; house escaping consistent; the §22.13 vendor list as bullets works, though this chapter (unlike §20.12) would genuinely benefit from a comparison table — with the moving-target banner it currently lacks (the §22.13 inline caveat partially covers it).

### book/part-09-hardware-and-software/23-quantum-programming-compilation-and-tooling.md (Chapter 23, 281 lines, 15 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 0d569bb):** FIXED — mthree correctly re-labelled readout mitigation (twirling now points at transpiler passes/Runtime options); pyLIQUi|> removed (PyZX + pytket gate statistics); TFQ marked effectively unmaintained at all three mentions with prefer-PennyLane guidance; Aspen noted retired; transpile default-level caveat (recent releases default to 2 — check installed version).

**Overall:** The strongest tooling survey I've seen in book form, and impressively current: the Qiskit 2.x timeline (March 2025, slimmed core, C API), the QPY-vs-OpenQASM3 transport distinction, the Qiskit Pulse removal (consistent with Ch21 ✓), the Modern QDK/QIR story, and LightSABRE are all right. Verified: OpenQASM 3 and Quil examples are syntactically valid ✓; Toffoli = 6 CNOTs consistent with Ch8 ✓; state-vector memory ladder (8 GB @ n=30, 512 GB @ 36, 8 TB @ 40, single-precision complex) recomputed ✓; density-matrix O(4ⁿ) half-ceiling ✓; parameter-shift formula consistent with Ch11/Ch14 ✓; RSA-2048 estimate (2×10⁷ qubits, hours) **consistent with §15.3's Gidney–Ekerå figures** ✓ — notably *not* repeating §17.10's wrong numbers; Stim correctly attributed to Gidney here (highlighting Ch19's "Google's Stim and PyMatching" as the outlier); endianness-as-prime-suspect debugging note correctly reflects the book's own big-endian convention ✓; sanity check 5 recomputable (32 GB @ n=32; >1 TB at n=38) ✓; Ch30 = "Quantum Machine Learning" ✓ (forward ref verified).

- **Severity:** Low · **Category:** Factual (tool misattribution) · **Location:** §23.10 (line 170)
  - **Problem:** "Pauli twirling … Implemented in Qiskit's `PauliTwirl` **and the `mthree` mitigation toolkit**" — mthree (M3, Nation et al.) is *matrix-free measurement/readout* mitigation; it does not implement Pauli twirling. The `PauliTwirl` pass name is also approximate (Runtime exposes twirling via options; the SDK has twirling utilities under different names).
  - **Recommendation:** Drop mthree from the twirling sentence (mention it under readout mitigation where it belongs); verify the exact Qiskit pass name.
  - **Certainty:** High on mthree; medium on the pass name.

- **Severity:** Low · **Category:** Factual (likely confabulated tool) · **Location:** §23.11 (line 191)
  - **Problem:** "The `PyZX` and **`pyLIQUi|>`** ecosystems offer logical-level T-counting passes" — PyZX is real (ZX-calculus T-count reduction ✓); "pyLIQUi|>" does not exist to my knowledge. LIQUi|> was Microsoft's F#/.NET simulator (2014–2016), long superseded by the QDK, with no Python incarnation.
  - **Recommendation:** Verify; likely delete or replace (e.g., with Azure QRE's own logical counter or `pytket`'s T-count reporting).
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Currency (requires verification) · **Location:** §23.4 (line 69), §23.13 (line 234), §23.15 (line 262)
  - **Problem:** **TensorFlow Quantum** is presented three times as a live, first-class stack ("the primary entry point", "the corresponding stack for Google's hardware", a §23.15 subsection) — but TFQ has been effectively unmaintained since ~2023–24; presenting it as the 2026 recommendation risks sending readers to a dead end. Same pattern as Ch20's Aspen: §23.77's "Rigetti **Aspen** and Ankaa" includes the retired Aspen line.
  - **Recommendation:** Verify TFQ's maintenance status; if stagnant, say so (the book is elsewhere excellent at exactly this kind of honesty).
  - **Certainty:** Medium (ledgered).

- **Severity:** Nit · **Category:** Requires verification · **Location:** §23.6 (line 110)
  - **Problem:** "level 1 is the default" for `transpile(...)` — Qiskit changed the default optimization level to 2 in the 1.x series (needs version-pinned checking; the book targets Qiskit 2.x elsewhere).
  - **Recommendation:** Pin to the Qiskit 2.x default explicitly.
  - **Certainty:** Low-medium (ledgered).

- **Severity:** Nit · **Category:** Consistency (structure) · **Location:** end of §23.15
  - **Problem:** Bridge is an unheaded paragraph inside §23.15 (bridge-style variant count now: numbered section / unnumbered heading / merged-titled section / unheaded trailing paragraph). Status 15/15 matches the numbered sections.
  - **Recommendation:** One convention, book-wide (§13 lint).
  - **Certainty:** High.

**Entertainment:** good — "a small adversarial document" energy carries over; "always the prime suspect" (endianness) and "reach for defcal when you have a specific reason, not as a default" are the voice of experience. **Pedagogy:** the §23.12 simulator-selection matrix (state-vector/tensor-network/stabiliser/density-matrix/trajectory/shadows, each with its cost model and use case) is the most complete such taxonomy I've seen in a textbook; §23.14's five debugging families — especially cross-platform compilation diff — are real practice, not textbook idealism. The Sessions-vs-one-shot billing note is exactly the kind of operational detail the book's audience needs. **Rendering:** three fenced code blocks (qasm/text/text) all render correctly; house escaping fine; no figures needed — a compilation-pipeline diagram (4 stages) would be nice-to-have.

### book/part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md (Chapter 24, 265 lines, 15 H2 sections)

> ✅ **Remediation 2026-07-04 (commit 0d569bb):** FIXED — **GHZ/volume-law inversion corrected** (volume-law saturates χ = 2^{n/2}; GHZ explicitly noted as Schmidt-rank-2, bond-dimension-2, MPS-trivial); DM thresholds n≈16–17 server / n≈20 HPC (self-consistent with §24.2 and Ch23); Pashayan–Wallman–Bartlett attribution; default.mixed correctly labelled a density-matrix simulator; sanity check 1 corrected (one qubit quadruples DM; two quadruple SV); PCZ figure harmonised (~15 h); BlueQubit dropped; stabiliser-rank exponent attributed to the BG-2016 + Bravyi-et-al.-2019 line at α≈0.4; BG demo scale hedged to ~40–50 qubits/~50–60 T; Sunway 53-qubit; Alibaba wind-down noted; Gao–Kalinowski–Chou–Lukin–Barak–Choi author list; Fugaku reduced-precision note; DMRG cylinder width 8–12 harmonised with Ch28.

**Overall:** A genuinely valuable chapter — the "classical simulation is quantum computing's constant companion" framing, the plural-methods thesis, and the §24.15 decision tree are exactly what the audience needs, and the §24.7 paragraph carefully distinguishing entanglement *entropy* bounds from Schmidt-*rank* requirements is more precise than most research-adjacent writing. Verified: the double-precision memory ladder (16 GiB @ 30 → 16 PiB @ 50) recomputed ✓ — and *consistent* with Ch23's single-precision figures since each chapter labels its precision ✓; gate-as-stride update ✓; trajectory-vs-density-matrix break-even N ≈ 2ⁿ ✓; tableau sizes/costs and CHP attribution ✓; TEBD O(nχ³), Hastings 1D area law, Calabrese–Cardy linear growth ✓; DMRG-on-cylinders χ ~ 2^w, w ≲ 8 folklore ✓; PEPS #P-hard contraction ✓; NQS Carleo–Troyer 2017 ✓; path-sum formula ✓; Sunway 304 s / 41.9M cores ✓ (but see qubit-count ledger item); H100 80 GiB/3 TB/s ✓; Aharonov–Ben-Or noise-simulability ✓; `examples/statevector_simulation.py` exists and matches the inline snippet ✓, and the shown output is exactly right (Statevector.to_dict() omits zero amplitudes, so only |000⟩/|111⟩ print) ✓.

- **Severity:** Medium · **Category:** Conceptual error (recomputed) · **Location:** §24.7 (line 136)
  - **Problem:** "A circuit that builds genuine n-qubit **GHZ-type** entanglement across the full register **saturates the bond dimension at χ = 2^{n/2}**". Exactly backwards: the GHZ state has Schmidt rank **2** across *every* bipartition (bond dimension 2 — it is the canonical example of an entangled state MPS handles trivially, a standard teaching point). What saturates χ = 2^{n/2} is *volume-law* entanglement — deep random circuits, generic states.
  - **Recommendation:** "A circuit that builds volume-law entanglement (a deep random circuit) saturates χ = 2^{n/2}; note by contrast that GHZ states, despite being maximally nonlocal, have bond dimension 2 and are MPS-trivial."
  - **Certainty:** High (Schmidt decomposition of GHZ recomputed).

- **Severity:** Medium · **Category:** Numerical (internally and cross-chapter inconsistent) · **Location:** §24.4 (line 92)
  - **Problem:** Density-matrix thresholds: "n = 15 on a workstation, **n = 22 on a large server**, n = 25 at the very edge". At n = 22, 16·4²² = **256 TiB** — no server. Halving §24.2's own statevector ladder gives large-server ≈ n = 16–17; Ch23 §23.12 says "n = 15 comfortably, **n = 20 with effort**". The 22 looks like half of 45 (a supercomputer figure mislabelled as "large server"); n = 25 (16 PiB) correctly halves the n = 50 ceiling.
  - **Recommendation:** "n ≈ 16–17 on a large server, n ≈ 20 on HPC, n = 25 at the supercomputer edge."
  - **Certainty:** High (recomputed).

- **Severity:** Low · **Category:** Attribution · **Location:** §24.6 (line 122)
  - **Problem:** The quasi-probability estimation scheme is credited to "**Pashayan–Bartlett–Gross** 2015" — the paper is Pashayan–**Wallman**–Bartlett (PRL 2015). Gross belongs to the earlier discrete-Wigner-negativity lineage, not this paper.
  - **Recommendation:** Pashayan–Wallman–Bartlett.
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Factual (tool behaviour) · **Location:** §24.13 (line 202)
  - **Problem:** "Qiskit Aer's noise back-end, Cirq's …, and **PennyLane's `default.mixed`** all use trajectories under the hood for large n" — `default.mixed` is a **density-matrix** simulator, not a trajectory simulator.
  - **Recommendation:** Drop it from the trajectory list (PennyLane's trajectory-style noise lives elsewhere).
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Mathematical (exercise error) · **Location:** Sanity check 1 (line 256)
  - **Problem:** "why does adding **two** more qubits roughly **quadruple** it for a **density-matrix** simulator?" — for a density-matrix simulator (4ⁿ), +2 qubits is ×16; +**1** qubit quadruples. (+2 quadruples a *statevector* simulator.) The exercise as posed has no correct answer.
  - **Recommendation:** Either "one more qubit … density-matrix" or "two more qubits … statevector".
  - **Certainty:** High.

- **Severity:** Low · **Category:** Internal consistency · **Location:** §24.11 (line 186) vs §24.14 (line 214)
  - **Problem:** The same Pan–Chen–Zhang work is quoted as "a few days on a GPU cluster" (§24.11) and "roughly 15 hours" (§24.14). Different follow-ups exist, but both sentences cite the same 2022 reference.
  - **Recommendation:** Pick one figure or distinguish the two papers explicitly.
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Requires verification (ledgered, 6 items) · **Location:** §§24.3, 24.5, 24.6, 24.12, 24.13, 24.14
  - **Problem:** (i) Fugaku "48 qubits … 1 PiB … ~130,000 nodes" — 2⁴⁸ double-complex is 4 PiB; 1 PiB implies 4-byte amplitudes; verify the run exists as described. (ii) "**BlueQubit**" listed among stabiliser-simulator improvements — BlueQubit is a cloud-simulation startup, not a known stabiliser-simulator lineage entry. (iii) Bravyi–Gosset "α ≈ 0.396" — BG 2016's exponents are ≈0.47 (exact rank) / ≈0.23 (approximate); 0.396 belongs to the sum-over-Cliffords/stabiliser-extent line (Bravyi et al. 2019) — attribution/exponent pairing needs checking, as does the "50-qubit, 60-T-gate" demo (BG reported 40 qubits/~50 T). (iv) Sunway "**56-qubit** Sycamore-style" — the Gordon Bell 2021 run simulated the 53-qubit Sycamore task. (v) "**Gao, Anschuetz, Wang, Cirac, Lukin 2024**" for noise-exploiting spoofing — that author list matches a 2021 *generative-models* paper; the XEB-spoofing result is Gao–Kalinowski–Chou–Lukin–Barak–Choi. (vi) "AlibabaQuantum Simulator … repeatedly demonstrated" — Alibaba's quantum lab disbanded in 2023; currency check.
  - **Certainty:** Medium (all ledgered).

**Entertainment:** high — "not the failure mode of quantum computing but its constant companion" is a thesis worth the chapter, and the closing "which lever … will move the boundary in their favour" lands the plural-methods message. **Pedagogy:** the three-constituencies opening (§24.1) prevents the classic conflation; the decision tree is immediately usable; sanity check 5 (sampling agreement ≠ unitary equivalence) is a subtle and excellent trap. Bridge style: bold run-in paragraph — a **fifth** variant; and the checks are headed "Sanity checks." (dropping "before moving on") — minor style drift for the §13 lint list. **Rendering:** clean throughout; code block + output block verified ✓.

### book/part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md (Chapter 25, 141 lines, 6 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 3b commit):** FIXED — IBM utility narrative corrected (framed as "utility" from the outset, paper title quoted; what narrowed was "beyond brute-force classical methods"); §25.3 now cross-references §18.18's full five-family treatment instead of silently re-explaining; QV recap aligned with §22.7 (heavy-output probability; garbled "multiplicatively" sentence replaced with the saturation statement).

**Overall:** The book's expectation-setting chapter, and it does the job with unusual honesty ("the intersection … is still nearly empty"; "these projections have been wrong before" with the 2010/2020-vintage track record). Verified: depth-budget arithmetic (ndε ≳ 1 → d ≈ 2 at ε = 5×10⁻³, n = 100; per-qubit 1/ε = 200, with the wide-vs-deep distinction explained) ✓; barren-plateau Var ~ 2⁻ⁿ ✓; VQE shot arithmetic (10⁶/step, 10⁸/run) ✓; p_L scaling consistent with Ch19 ✓; d = 7 → ~100 and d = 21 → ~900 physical/logical consistent with Ch19/Ch22 ✓; sanity checks recomputed (check 2: d = 29 exactly at A = 1 ✓ — a nice complement to Ch19's A = 0.1, d = 27 version; check 5 well-posed with "fidelity is the constraint" as the intended answer ✓); platform snapshot consistent with Ch20/Ch22 ✓; Sycamore/IBM-2.5-days and Jiuzhang-76-photon histories ✓; the supremacy-vs-advantage distinction (useless-task vs useful-task) cleanly drawn ✓; the four-bullet "why build capability now" case (tooling lead time, algorithm R&D, PQC migration asymmetry, workforce) is the best two paragraphs in the book for an engineering manager.

- **Severity:** Low · **Category:** Factual (narrative mischaracterisation) · **Location:** §25.4 (line 80)
  - **Problem:** "The original paper **claimed advantage**; … The IBM team's stance **subsequently shifted from 'advantage' to 'utility'**." The Kim et al. 2023 Nature paper was titled "Evidence for the **utility** of quantum computing before fault tolerance" and IBM's framing was "utility" from day one — deliberately avoiding an advantage claim. What actually softened under the classical reproductions was the paper's "beyond brute-force classical methods" scope, not an advantage→utility rebranding.
  - **Recommendation:** "IBM framed the result as 'utility' from the outset; the classical-simulation reproductions narrowed what 'beyond classical methods' could mean."
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Cross-reference/duplication · **Location:** §25.3 (lines 61–67)
  - **Problem:** ZNE, PEC, CDR, and virtual distillation are re-explained in full with **no cross-reference to Ch18 §18.18**, which covers the same four *plus symmetry verification* in more depth ("Five families are widely deployed" vs this section's "Four techniques matter"). A reader hits the same material twice with no signpost, and the counts disagree.
  - **Recommendation:** Compress to one paragraph + "see §18.18 for the full treatment including symmetry verification and the bias-variance analysis".
  - **Certainty:** High (in-repo).

- **Severity:** Nit · **Category:** Precision (recap drift) · **Location:** §25.5 (line 91)
  - **Problem:** QV recapped as "random n×n circuit succeeds with above-2/3 **fidelity**" — the criterion is heavy-output *probability*, as Ch22 states correctly; and "QV scales roughly **multiplicatively in qubit count**" is garbled (QV is 2^{d*}; presumably "exponentially in achievable width" was meant).
  - **Recommendation:** Align the recap with §22.7's wording.
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Consistency (conventions tally) · **Location:** whole chapter
  - **Problem:** (i) No formal Moving-target banner despite this being (with Ch20/Ch22) the most perishable content in the book — though the inline hedging here is the strongest anywhere ("treat with appropriate scepticism", the projections-track-record paragraph), so the banner is nearly redundant. (ii) No bridge section — the Chapter 26 hand-off lives in the how-to-read block and §25.6's closing; status 6/6 matches the numbered sections.
  - **Certainty:** High.

**Entertainment:** high — "NISQ is the awkward middle", "wide but shallow", and "do not bet the quarter on the short one" give the chapter a memorable managerial register distinct from the technical chapters. **Pedagogy:** the two depth budgets (whole-device vs single-worldline) resolve the exact confusion most readers carry out of vendor announcements; §25.4's "the pattern" paragraph teaches how to read the *next* claim, which is worth more than the history itself; the closing recommendation pattern (simulators → small hardware runs → deferred capital) is concrete and defensible. **Rendering:** clean; single display equation correctly escaped; no figures needed at this altitude.

### book/part-10-practice-and-era/26-practical-access-and-hands-on-work.md (Chapter 26, 135 lines, 8 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 3b commit):** FIXED — Braket roster corrected to IonQ/Rigetti/QuEra/IQM with a roster-changes hedge (Quantinuum removed; now consistent with reality and reconcilable with Ch23); status 8/8. (Ch32 annealing cross-ref had verified correct at the Ch32 review.)

**Overall:** Short, operational, and almost entirely correct — the book's most directly actionable chapter. Verified: the simulator memory figures (16 GB @ 30, 512 GB @ 35 double precision, "half that in single") are **mutually consistent with Ch23 and Ch24** ✓ — the three chapters now form a coherent set with precision labelled each time; the Bell-program code is correct including the subtle detail that `measure_all()` names the classical register `meas`, so `result[0].data.meas.get_counts()` is exactly right ✓; `examples/first_bell_program.py` exists ✓; shot-budget arithmetic (0.5/√N; 10⁴ → 5×10⁻³; sanity check 2 → 10⁶) ✓; the three-way baseline discipline (ideal sim → noise-model sim → hardware) and the §26.6 reproducibility checklist ("run on `ibm_brisbane`, calibration `2026-02-14T08:00Z`" as the citation standard) are the kind of concrete practice that most books never write down; "Qiskit deprecated several APIs between 1.0 and 1.4" ✓.

- **Severity:** Low · **Category:** Factual + internal inconsistency · **Location:** §26.2 (line 24)
  - **Problem:** Amazon Braket described as offering "IonQ, Rigetti, QuEra, **Quantinuum**" — Quantinuum has not been a Braket provider (its cloud paths are Azure Quantum and direct access, exactly as this chapter's own Azure bullet and §26.4 imply). Ch23 §23.4's Braket list (IonQ, Rigetti, QuEra, Oxford Quantum Circuits) disagrees with this one — the two lists should match, and neither should include Quantinuum.
  - **Recommendation:** Align both lists (IonQ, Rigetti, QuEra, IQM/OQC as of the snapshot date); verify against Braket's current device roster.
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Consistency (tally) + deferred cross-ref · **Location:** line 3; §26.4 (line 76)
  - **Problem:** (i) Status 7/7 vs 8 H2 sections (§26.8 Bridge numbered but uncounted — the bridge-excluded pattern). (ii) "a fundamentally different computational model (**Chapter 32**)" for D-Wave/annealing — Ch32 verification checklist grows again (now: CV, MBQC, thermodynamic resource theory, bosonic codes, §32.4 T-injection/topological, adiabatic/annealing).
  - **Certainty:** High (count); deferred (Ch32).

**Entertainment:** good for a logistics chapter — "avoid the trap of installing six SDKs at once", "subscribing to arXiv listings is a path to madness", and "epistemic frugality" keep it human. **Pedagogy:** §26.7 (reading papers) is a genuinely rare inclusion that fits the book's practitioner thesis; the three claim types with their distinct failure modes compress Part 7's lessons into a field guide; sanity checks are appropriately *hands-on* (run this, price this, trace this) rather than pencil-and-paper — right for this chapter. **Rendering:** clean; code and output blocks fine.

### book/part-11-applications/27-cryptography-and-security.md (Chapter 27, 184 lines, 11 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 3b commit):** FIXED — intercept-resend corrected to ~50% information at 25% QBER and re-labelled "simplest" (not "optimal"); **TF-QKD paragraph added to §27.10** (√η scaling, untrusted midpoint, distance records, forward link to §33.4) — closing the completeness gap; McEliece ciphertext range 100–250 B (internal contradiction resolved); QRAM-free collision bound updated to ~2^{2n/5} (Chailloux–Naya-Plasencia–Schrottenloher) with the three-tier security summary; ML-DSA timing "well under a millisecond"; B92 cross-linked to §11.6's unambiguous state discrimination (closing the loop Ch11 opened). DEFERRED to factcheck/ — FIPS 206 IPD date.

**Overall:** The best applications chapter so far and among the most factually dense — and it holds up under detailed checking. **Byte-exact verification of the FIPS parameter sets** (a place where books routinely copy stale draft numbers): ML-KEM-768 pk 1184 / ct 1088 / ss 32 ✓; ML-DSA-65 pk 1952 / sig 3309 ✓ (the *final* FIPS 204 figure, not Dilithium-3's draft 3293 — impressive); SLH-DSA-128s 32 / 7856 ✓; Falcon-512 897 / 666 ✓; mceliece6960119 pk 1,047,319 B ✓ exactly. NIST process history (82→69→26→7+8→2022 selection→Aug 2024 FIPS→HQC March 2025 via NIST IR 8545) ✓; deployment timeline all checks (OpenSSL 3.5, hybrid X25519+ML-KEM at Google/Cloudflare/Apple/AWS 2024, iMessage PQ3, Signal PQXDH late 2023, OpenSSH 9.9 `mlkem768x25519-sha256`) ✓; Rainbow/Beullens 2022 and SIKE/Castryck–Decru 2022 ✓; Grover-on-AES concrete-cost caveat with GLRS/JNRV ✓; Zalka √P parallelisation ✓; superposition-query mode attacks correctly scoped ("no realistic threat model grants" superposition oracle access) ✓; BB84/E91/B92 mechanics verified — B92's unambiguous-outcome logic recomputed (⟨1|0⟩ = ⟨−|+⟩ = 0 → conclusive events) ✓; decoy states, PNS, finite-key-vs-asymptotic caveat ✓; PLOB bound −log₂(1−η) ≈ η/ln 2 ✓ with sanity check 4 recomputable (≈144 kbps ideal ceiling at 200 km/1 GHz) ✓; the HNDL analysis and the KEM-before-signatures urgency asymmetry are exactly right ✓. The §27.9 "abstract protocol vs deployed protocol" framing is the most honest treatment of QKD security I have seen outside the specialist literature.

- **Severity:** Low · **Category:** Numerical (standard result) · **Location:** §27.7 (line 115)
  - **Problem:** "Eve's optimal individual-qubit attack — intercept-resend in a random basis — gives her **25% information** about each bit at the cost of a 25% QBER." The textbook pairing is **~50% information** (Eve guesses the right basis half the time and then knows the bit fully → 0.5 bits/bit expected) at 25% QBER. The chapter's own worked example supports the 25%-QBER half but not the 25%-information half. (Also "optimal individual-qubit attack" is loose — intercept-resend is the *simplest*, not the optimal, individual attack.)
  - **Recommendation:** "gives her ~50% information … at the cost of a 25% QBER"; soften "optimal" to "simplest".
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Completeness · **Location:** §27.10
  - **Problem:** **Twin-field QKD** (Lucamarini et al. 2018) is entirely absent. TF-QKD is the headline post-2018 development in exactly this section's subject — it circumvents the PLOB bound via an untrusted middle node (rate ∝ √η instead of η) and holds the fibre distance records (~1000 km by 2023), sitting precisely in the gap the section narrates between point-to-point limits and full repeaters. Its omission makes the "trusted nodes or satellites or wait-for-repeaters" trilemma look starker than the field's actual state.
  - **Recommendation:** One paragraph after the PLOB discussion: TF/MDI-type protocols with an untrusted midpoint achieve √η scaling and push direct links toward 1000 km at low rates.
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Requires verification (ledgered) · **Location:** §27.3 (line 49), §27.4 (line 72)
  - **Problem:** (i) "Without QRAM, the best provable quantum collision algorithm matches the classical birthday bound at 2^{n/2} (**Zhandry 2013**)" — Chailloux–Naya-Plasencia–Schrottenloher (2017) gives a QRAM-free 2^{2n/5} time attack (≈2^{102} for SHA-256), so "matches 2^{n/2}" overstates; and the Zhandry citation is for the *query lower bound* lineage, a different statement. (ii) "FIPS 206 **IPD submitted August 2025**" — the FN-DSA draft timing needs a source check. (iii) ML-DSA "sign and verify on the order of **milliseconds**" — typical figures are hundreds of microseconds.
  - **Recommendation:** Verify all three; adjust the collision range to mention 2^{2n/5}.
  - **Certainty:** Medium (ledgered).

- **Severity:** Nit · **Category:** Internal consistency · **Location:** §27.4 (lines 61 vs 73)
  - **Problem:** McEliece prose says "tiny ciphertexts (**under 200 bytes**)"; the parameter list quotes mceliece6960119 at **226 B**. Both true for different parameter sets, but as juxtaposed they contradict.
  - **Recommendation:** "roughly 100–250 bytes depending on parameter set".
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Missed cross-link · **Location:** §27.8 (B92) ↔ Ch11 §11.6
  - **Problem:** B92's conclusive-outcome mechanism *is* unambiguous state discrimination, and Ch11 §11.6 explicitly promised "unambiguous discrimination is the operational primitive behind several conclusive quantum-key-distribution attacks" — yet neither section links to the other. A one-line cross-reference would close a loop the book already set up.
  - **Certainty:** High (in-repo).

**Entertainment:** high — "every byte … is in their archive forever", "you are back in computational-cryptography land, and you might as well skip QKD", and the trusted-node "enormous security regression" verdict give the chapter teeth. **Pedagogy:** the confidentiality-vs-authentication threat-timeline split (§27.6) is the single most decision-relevant insight for the audience and is stated perfectly; §27.11's layered recommendations are directly liftable into a migration plan. Bridge merged into numbered §27.11 (the Ch22 style) — status 11/11 counts it ✓. **Rendering:** clean; only light math, correctly escaped; no figures needed, though a BB84 basis/bit table would help §27.7's worked example.

### book/part-11-applications/28-scientific-computing-and-physical-simulation.md (Chapter 28, 228 lines, 9 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 3b commit):** FIXED — Reiher et al. 2017 FeMoco estimate corrected to ~10^14 T gates (restoring the true four-order-of-magnitude improvement story down to ~10^10); "minimal entropic sampling" replaced with dissipative (Lindbladian) Gibbs-sampling methods; status 9/9. (DMRG cylinder width harmonised on the Ch24 side.)

**Overall:** The strongest case-for-the-field chapter, and technically very solid. Verified: Born–Oppenheimer Hamiltonian (all four terms, atomic units) ✓; second-quantised form with the ½Σh_{pqrs}a†a†aa convention ✓; Jordan–Wigner σ⁻-with-Z-string mapping ✓ (annihilation = (X+iY)/2, correct); Bravyi–Kitaev O(log M) ✓; chemical accuracy 1 kcal/mol ≈ 1.6×10⁻³ Ha ✓ (exact conversion); FeMoco stoichiometry N₂+8H⁺+8e⁻→2NH₃+H₂ ✓ and the ~1%-of-global-energy Haber–Bosch figure ✓; Hubbard/Heisenberg/t-J Hamiltonians ✓ including the −¼n_in_j term ✓; **the half-filling nuance** (sign-problem-free at half-filling on bipartite lattices, sign problem and interesting physics upon doping) — exactly right, and most popularisations get this wrong ✓; DMFT exact-in-infinite-d ✓; retarded Green's function formula ✓; Poisson κ = O(N^{2/3}) in 3D ✓; Carleman R < 1 consistent with §16.8 ✓; Martinez et al. 2016 Schwinger-model demo ✓; CCSD(T) N⁷ ✓; sanity check 2 recomputed (10¹⁰ T / 10⁴ T/s ≈ 12 days, ~2.6M physical qubits — consistent with §28.1's own prose) ✓; check 3's combinatorics (C(16,8)² ≈ 1.7×10⁸ vs 4¹⁶ ≈ 4.3×10⁹) ✓. The §28.6 sign-problem exposition (three concrete failure cases: finite density, real time, θ-terms) is the clearest I have seen at this level, and §28.8's two-column verdict (where quantum wins / where classical stays) is the calibration table the entire application literature needs.

- **Severity:** Low · **Category:** Factual (requires verification) · **Location:** §28.1 (line 56)
  - **Problem:** "Reiher, Wiebe, Svore, Wecker, and Troyer's 2017 resource estimate … landed at roughly **10¹¹ T gates** and ~100 logical qubits", refined to ~10¹⁰. The Reiher et al. PNAS 2017 estimate is usually quoted at ~**10¹³–10¹⁴** T gates (~111 logical qubits); the 10¹⁰–10¹¹ range is where the *refinements* (Berry 2019, Lee 2021, von Burg 2021) landed. As written, the improvement narrative understates the actual three-to-four-order-of-magnitude drop — ironically underselling the book's own algorithmic-progress story.
  - **Recommendation:** Verify against the PNAS paper; expect "~10¹⁴ → ~10¹⁰".
  - **Certainty:** Medium (ledgered).

- **Severity:** Low · **Category:** Likely garbled term (requires verification) · **Location:** §28.5 (line 140)
  - **Problem:** Thermal-state preparation methods listed as "quantum metropolis (Temme et al. 2011) ✓, quantum imaginary-time evolution ✓, and **minimal entropic sampling** methods" — the third is not a recognisable method name. It reads like a garble of **METTS** (minimally entangled typical thermal states, White 2009) — which is a *classical* tensor-network technique — or possibly of the recent Lindbladian Gibbs samplers (Chen–Kastoryano–Gilyén line).
  - **Recommendation:** Verify; replace with a real method name.
  - **Certainty:** Medium.

- **Severity:** Nit · **Category:** Cross-chapter drift · **Location:** §28.8 (line 185) vs Ch24 §24.9
  - **Problem:** DMRG cylinder ceiling quoted as "width ∼8–12" here vs "w ≲ 8" in Ch24. Both hedged, but a coordinated number would be better.
  - **Certainty:** High (in-repo).

- **Severity:** Nit · **Category:** Consistency (tally) · **Location:** line 3
  - **Problem:** Status 8/8 vs 9 H2 sections (§28.9 Bridge numbered, uncounted).
  - **Certainty:** High.

**Entertainment:** high — FeMoco as "the chemistry community's standard challenge instance" gets the full narrative treatment (biology → Haber–Bosch economics → multireference physics → resource-estimate history), which is exactly how to make a resource table matter to a reader. **Pedagogy:** §28.4's "the quantum computer never sees the full 10⁶-orbital problem; it sees a 50-orbital impurity model, hundreds of times" is the single sentence that makes near-term chemistry roadmaps intelligible; the embedded cross-links to §§15.5/15.8/16.x are dense and all verified valid ✓; sanity check 5 (read a real DMET-VQE paper and extract four specific numbers) is the most research-adjacent exercise in the book and perfectly placed. **Rendering:** heavy display math, all house-escaped correctly ✓; inline links to chapter files use correct relative paths ✓; no figures — a lattice-model cartoon (Hubbard hopping/interaction) would help §28.2 but the formulas carry it.

### book/part-11-applications/29-optimization-finance-and-industrial.md (Chapter 29, 169 lines, 7 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 3b commit):** FIXED — §29.1 Advantage2 corrected to Zephyr/degree-20 with Pegasus attributed to the previous generation (internal contradiction with §29.3 resolved); Chimera qubit count attributed to the 2000Q; Lisbon = buses; "## Sanity Checks" heading converted to the book-standard bold-paragraph form. DEFERRED to factcheck/ — ~180-variable clique figure.

**Overall:** The deflationary chapter the field needs, executed with receipts — "the pilots are real, the tooling is real, the funded teams are real; the advantage is not" is earned by the section-by-section classical baselines. Verified: Goemans–Williamson 0.8786 with the UGC-optimality caveat ✓; QUBO↔Ising substitution s = 1−2x ✓; Max-Cut-as-Ising derivation ✓; penalty/slack encoding mechanics ✓; QAOA p=1 ratio 0.6924 (consistent with Ch15) and the p=2 value 0.7559 ✓; the careful "p→∞ is the same regime where exact classical methods also succeed" framing ✓; RQAOA/Bravyi–Kliesch–Koenig–Tang ✓; adiabatic 1/Δ²_min consistent with Ch20 ✓; simulated bifurcation (Goto–Tatsumura–Dixon) and CIM correctly classified as classical ✓; **the seven-author Stamatopoulos et al. citation is exact** ✓; the ~10⁷ T-gate option-pricing figure consistent with Ch16 §16.8 ✓; the QRAM state-preparation caveat ("most quantum option pricing papers quietly assume QRAM-style state preparation") is the single most important sentence in the finance section and it is correct ✓; sanity checks recomputed (K₃ ground energy −1, six-fold degenerate ✓; crossover C_Q/C_C < 10³ ✓; N²/15 ≈ 27 ✓). §29.5's "the structure transfer is the bottleneck, not the qubit count" and the three-rule constraint-encoding hygiene list are practitioner gold.

- **Severity:** Low · **Category:** Internal inconsistency (hardware facts) · **Location:** §29.1 (line 43) vs §29.3 (line 77)
  - **Problem:** §29.1: "D-Wave **Advantage2** system offers about 7,000 qubits but with restricted connectivity (**Pegasus topology, degree 15**)". §29.3 (correctly): "**Zephyr** (Advantage2 prototype, **degree-20**)" with Pegasus belonging to Advantage. The two sections contradict each other; §29.3 matches D-Wave's actual generations.
  - **Recommendation:** Fix §29.1 to Zephyr/degree-20 (or say "Advantage (Pegasus, degree 15)" if that's the intended reference device).
  - **Certainty:** High (in-repo contradiction; external facts well-established).

- **Severity:** Nit · **Category:** Factual detail · **Location:** §29.3 (line 77), §29.5 (line 124)
  - **Problem:** (i) "Chimera (**D-Wave 2X and earlier, 2048 qubits**…)" — 2048 qubits was the 2000Q; the 2X had ~1,100. (ii) "routing **taxis** in Beijing and **Lisbon**" — the Lisbon pilot routed *buses* (WebSummit 2019); Beijing was the taxi study.
  - **Recommendation:** "(Chimera: through the 2000Q's 2048 qubits)"; "taxis in Beijing and buses in Lisbon".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Consistency (structure) · **Location:** lines 150–154
  - **Problem:** Bridge is an unheaded trailing paragraph *and* the sanity checks get their own H2 heading ("## Sanity Checks") — both firsts. The H2 makes the true section count 7 vs the status block's 6/6, and the heading style diverges from the "**Sanity checks before moving on.**" bold-paragraph convention used everywhere else.
  - **Recommendation:** Fold into the book-wide bridge/checks convention (§13 lint).
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Requires verification (ledgered) · **Location:** §29.3 (line 79)
  - **Problem:** "on a ~7,000-qubit Advantage2 that is a dense problem of only **~180 variables**" — the largest-embeddable-clique figure needs a source check against D-Wave's published numbers for Zephyr.
  - **Certainty:** Low-medium (ledgered).

**Entertainment:** high — "the path of least encoding pain", "uniform quadratic penalty soup", and the forbidden-sentence gag in the how-to-read give the most sceptical chapter in the book a light touch. **Pedagogy:** the recurring template (quantum proposal → *specific* classical incumbent → verdict) is the chapter's real lesson; §29.4's continuous-vs-discrete Markowitz distinction ("the version that maps to quantum optimisers is the NP-hard one — the version practitioners solve is convex") is a subtlety every finance-pilot press release obscures; sanity check 5 is unusually good (the simple formula *and* why it underestimates). **Rendering:** clean; horizontal rules used as section separators (unique to this chapter — another style variant for the lint list); math correctly escaped throughout.

### book/part-11-applications/30-quantum-machine-learning.md (Chapter 30, 150 lines, 9 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — Hamiltonian-learning attribution corrected to Anshu–Arunachalam–Kuwahara–Soleimanifar.

**Overall:** The best-organised chapter in Part 11 — the three-category taxonomy (classical-data algorithms / learning about quantum systems / parameterised circuits as models) does exactly what the intro promises and should frankly be adopted by the field. Verified: Kerenidis–Prakash 2016, Lloyd–Mohseni–Rebentrost 2014 (qPCA), Rebentrost–Mohseni–Lloyd 2014 (qSVM) ✓; QRAM bucket-brigade noise-instability caveat ✓; Tang dequantisation narrative consistent with Ch16 §16.8 and Ch17 §17.12 (the book now tells this story three times, each at the right altitude, without contradiction ✓); classical-shadows summary consistent with Ch11 §11.5 ✓; McClean et al. barren plateaus + the local-cost and noise-induced extensions correctly scoped ✓; **Liu–Arunachalam–Temme 2021** kernel separation stated exactly right, including the honest "artificial problem" verdict ✓; QCNN (Cong–Choi–Lukin 2019) with the sharp observation that its successes are *Category-2 problems in disguise* ✓ — that reclassification is the most insightful move in the chapter; QGAN attributions (Lloyd–Weedbrook; Dallaire-Demers–Killoran, both 2018) ✓; **Cerezo–Verdon–Huang–Cincio–Coles 2022** author list exact ✓; **Stokes–Izaac–Killoran–Carleo 2020** quantum natural gradient exact ✓; wall-clock arithmetic (2pSK·1 ms = 2×10⁶ s ≈ 23 days) ✓ and sanity check 3 recomputable (≈2.9 days) ✓; the §30.8 dequantisation checklist with the Shor/HHL-on-quantum-input exceptions is the definitive statement of a thread the book has been building since Ch13.

- **Severity:** Low · **Category:** Attribution (requires verification) · **Location:** §30.3 (line 45)
  - **Problem:** Hamiltonian learning credited to "**Anshu–Arunachalam–Kueng–Lin** and follow-ups" — the landmark sample-efficient Hamiltonian-learning result is Anshu–Arunachalam–**Kuwahara–Soleimanifar** (Nature Physics 2021). "Kueng" (classical shadows) and "Lin" (Heisenberg-limited Hamiltonian learning line) look spliced in from adjacent literatures.
  - **Recommendation:** Verify; expect Anshu–Arunachalam–Kuwahara–Soleimanifar, optionally plus Huang–Tong–Fang–Su or Haah–Kothari–Tang for the dynamics-based line.
  - **Certainty:** Medium.

- **Severity:** Nit · **Category:** Consistency (positive note) · **Location:** line 3
  - **Problem:** None — status 9/9 matches 9 H2 sections with the bridge merged into numbered §30.9 (the Ch22/Ch27 convention). Recorded for the tally: merged-bridge chapters count their bridge; separate-bridge chapters don't. The lint rule (§13) should normalise on one of these.
  - **Certainty:** High.

**Entertainment:** high — "the most reliable thing a quantum computer can learn is something about itself, or about another quantum system" is the best one-sentence verdict in the book, and the chapter's willingness to say "not embarrassing either" about quantum kernels shows calibration rather than reflexive negativity. **Pedagogy:** §30.9's defence of QML as a *teaching* topic ("a reader who works through … hitting a barren plateau, redesigning the ansatz — has internalised most of what one needs to know about variational quantum algorithms") is self-aware and true; sanity check 5 (interrogate a vendor's fraud-detection claim) operationalises the whole chapter; the QQ-cell observation in §30.1 preempts a common taxonomy quibble. **Rendering:** clean; light math correctly escaped; no figures needed — the three-category table is carried in prose but would also make a good rendered table.

### book/part-11-applications/31-quantum-sensing-metrology-and-tomography.md (Chapter 31, 122 lines, 6 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — 1 µGal ≈ 10⁻⁹ g (was 10⁻⁸); LIGO filter cavity 300 m (was kilometre-long). (DFE caveat inherited from Ch11 — fixed at the Ch11 site.)

**Overall:** A confident, precise close to Part 11 — the "already in production" framing is correct and the numbers back it up. Mathematics recomputed: QFI = 4Var(H) for pure-state probes ✓; SQL derivation (|+⟩ under Z/2: Var = 1/4, F_Q = 1, Δφ = 1/√N) ✓; Heisenberg derivation (GHZ under ΣZᵢ/2: Var = N²/4, F_Q = N², Δφ = 1/N) ✓ — both sanity checks 1–2 verified; the noise-fragility caveat (generic Markovian noise collapses Heisenberg scaling to constant-factor-over-SQL) is exactly the right hedge ✓. Facts verified: Sr 429 THz and Yb 518 THz clock transitions ✓ (exact); **NIST Al⁺ quantum-logic clock 9.4×10⁻¹⁹** ✓ (exact); Φ₀ = h/2e ≈ 2.07×10⁻¹⁵ Wb ✓; NV S = 1 ground state, pT–nT/√Hz sensitivity tiers ✓; SERF/OPM-MEG vendors (QuSpin, FieldLine, Cerca) ✓; matter-wave phase k_eff·g·T² ✓; quantum illumination 6 dB error-exponent advantage (Tan et al.) with the honest joint-measurement caveat ✓; compressed-sensing O(rd log²d) ✓; **Mahadev 2018** described precisely, including the deliberate distinction between *cryptographic* soundness (LWE) and *device-independent* (Bell-based) verification — a distinction most secondary accounts blur ✓; sanity checks 3–5 recomputable (0.43 mHz; τ = 10⁴ s; 16⁵ ≈ 10⁶ factor) ✓. Cross-refs to Ch11/Ch18 all consistent ✓, and the bridge's preview of Ch32 (MBQC, adiabatic, CV, topological) matches the accumulated Ch32 checklist exactly — a good omen for the next review.

- **Severity:** Low · **Category:** Numerical (unit conversion, recomputed) · **Location:** §31.2 (line 59)
  - **Problem:** "Commercial absolute gravimeters … reach ∼1 µGal sensitivity (**10⁻⁸ g**)" — 1 Gal = 10⁻² m/s², so 1 µGal = 10⁻⁸ m/s² ≈ **1.0×10⁻⁹ g** (g ≈ 9.81 m/s² ≈ 981 Gal). The parenthetical is off by 10× (10⁻⁸ g corresponds to 10 µGal).
  - **Recommendation:** "(≈10⁻⁹ g)".
  - **Certainty:** High (recomputed).

- **Severity:** Low · **Category:** Factual detail · **Location:** §31.2 (line 61)
  - **Problem:** LIGO's frequency-dependent squeezing routed through "a **kilometre-long** filter cavity" — the A+ filter cavity is **300 m** (Virgo's similar). "Kilometre-long" overstates by ~3×.
  - **Recommendation:** "a 300-metre filter cavity".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Consistency (inherited) · **Location:** §31.4 (line 87)
  - **Problem:** Direct fidelity estimation again stated as "O(1/ε²) independent of n" without the well-conditioned-states caveat — same simplification already ledgered at Ch11 §11.4; the two statements are at least mutually consistent.
  - **Certainty:** Medium (ledgered previously).

**Entertainment:** high — the opening ("quantum sensing … already in production") earns the whole chapter, and the parade of deployed systems (MEG rooms, LIGO's dark port, benchtop NMR of single biomolecules) gives the book's most concrete payoff pages. **Pedagogy:** the SQL→Heisenberg derivation pair as sanity checks 1–2 is exactly the right difficulty; §31.4's layered characterisation pyramid (RB every shift → DFE per state → shadows per panel → full tomography for post-mortems) mirrors Ch18's benchmark hierarchy and closes the loop cleanly; §31.5's placement of Mahadev next to self-testing next to cross-platform comparison is a genuinely good synthesis. Status 6/6 with the bridge merged into counted §31.6 ✓. **Rendering:** clean; one stray horizontal rule before §31.6 (minor); math correctly escaped throughout.

### book/part-12-adjacent-models/32-adjacent-computational-models.md (Chapter 32, 161 lines, 10 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — QUBO substitution now uses spin eigenvalue s_i (operator/scalar conflation removed); equivalence-map MBQC entry credits Raussendorf–Browne–Briegel for the universality theorem. DEFERRED — thermodynamic-resource-theory sentence for §32.8 (one-line content addition; flagged for author since it extends a claim rather than fixing one — alternatively soften Ch12 §12.11's pointer).

**Overall:** The long-awaited target of six chapters' worth of forward references — and it delivers on five of the six. **Cross-reference ledger resolutions:** Ch10 §10.4's CV reference → §32.5 ✓; Ch10 §10.7's MBQC reference → §32.3 ✓; Ch19 §19.12's "bosonic codes" → §32.5's GKP paragraph ✓ (GKP only; cat codes absent, but adequate for the reference); Ch20 §20.9's "T-state injection, §32.4" → §32.4 states exactly that ("supplemented by a non-Clifford resource (such as a T-state injection)") ✓ — a perfect section-level match; Ch26 §26.4's annealing-model reference → §§32.1–32.2 ✓. **The one weak link:** Ch12 §12.11 promised "thermodynamic free energy (briefly, in Chapter 32)" as a resource theory — §32.8 delivers Landauer's k_BT ln 2 bound but no resource-theoretic treatment of free energy; the promise is only loosely honoured. Content verified: adiabatic condition with the ‖∂ₛH‖²/Δ³ form and the quadratic-under-tighter-hypotheses caveat ✓ (Jansen–Ruskai–Seiler-consistent); AvDKLLR 2004 equivalence via Feynman–Kitaev history states ✓; Raussendorf–Briegel 2001 one-way model with the Raussendorf–Browne–Briegel universality theorem correctly attributed in §32.3 ✓; O(w×d) cluster overhead ✓; Majorana scepticism consistent with Ch20 ✓; Fibonacci anyons braiding-universal, ν = 12/5 ✓; Bartlett–Sanders–Braunstein–Nemoto 2002 Gaussian simulability ✓; Lloyd–Braunstein 1999 universality ✓; boson-sampling permanent formula with the s₁!⋯s_m! normalisation ✓; GBS/hafnian and the honest contested-claims note ✓; Childs 2009 walk universality ✓; Bennett 1973 / Landauer 1961 ✓; the D-Wave material here is *consistent* with Ch20 and (the corrected reading of) Ch29 — all three topologies listed without misassignment ✓.

- **Severity:** Low · **Category:** Cross-chapter promise (resolves ledger) · **Location:** §32.8 vs Ch12 §12.11
  - **Problem:** Ch12 lists "thermodynamic free energy (briefly, in Chapter 32)" among resource theories; Ch32 §32.8 covers Landauer's bound and reversibility but never frames thermodynamics as a resource theory (free states, free operations, conversion rates), which is what Ch12's sentence leads the reader to expect.
  - **Recommendation:** Either add one sentence to §32.8 ("Landauer's bound is the entry point to the resource theory of thermodynamics, in which free energy plays the role entanglement plays under LOCC") or soften Ch12's pointer.
  - **Certainty:** High (in-repo).

- **Severity:** Nit · **Category:** Attribution consistency · **Location:** §32.10 (line 138) vs §32.3 (line 57)
  - **Problem:** The equivalence map credits MBQC universality to "(Raussendorf and Briegel, 2001)"; §32.3 correctly attributes the universality theorem to Raussendorf–**Browne**–Briegel (2003 line of work). The map entry should match the body.
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Notation · **Location:** §32.2 (line 45)
  - **Problem:** "via the substitution x_i ∈ {0,1} ↔ **Z_i = 1 − 2x_i**" — equates the Pauli *operator* Z_i with a scalar; Ch29 §29.1 writes it correctly as the spin *value* s_i = 1 − 2x_i.
  - **Recommendation:** Use s_i (eigenvalue), matching Ch29.
  - **Certainty:** High.

**Entertainment:** good — "equivalent in theory … does not mean interchangeable in practice" and the closing "coherent discipline rather than a federation of unrelated devices" frame the chapter's purpose exactly; the §32.10 equivalence map is the right artefact to end on. **Pedagogy:** the chapter functions as the book's model-pluralism corrective, and the how-to-read triage (deployed-hardware models first, historical/conceptual models last) is apt; sanity check 4 (universality quiz across four substrates) is an excellent integrative exercise; check 2 deliberately connects back to Ch29's minor-embedding arithmetic ✓. Status 10/10 with bridge merged into counted §32.10 ✓. **Rendering:** clean; formulas correctly escaped; no figures — a braiding world-line diagram would be the natural addition for §32.4, and a one-page table version of the §32.10 map would render well.

### book/part-12-adjacent-models/33-quantum-communication-and-networking.md (Chapter 33, 155 lines, 6 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — PLOB rates "below" → "of order" (recomputed values sit slightly above the round numbers). DEFERRED to factcheck/ — "QNE-sim" and "BTI Long Island" name checks; H3-bridge heading style and "Parts II–X" numerals adjudicated via the new STYLE.md conventions.

**Overall:** A comprehensive, current, and accurate networking chapter. **Amendment to the Ch27 entry:** the TF-QKD omission I flagged at Ch27 §27.10 is *resolved at the book level* — §33.4 covers twin-field QKD thoroughly (Lucamarini–Yuan–Dynes–Shields 2018 ✓ exact authors; √η scaling ✓; the distance-record ladder 511/605/658/830/1000+ km ✓ all real milestones). The Ch27 finding is hereby downgraded from "completeness gap" to "missing cross-reference": Ch27's limits section should simply point at §33.4. Verified here: teleportation Bell-basis expansion and {I, X, Z, XZ} corrections ✓ (consistent with Ch7 §7.12's operator-order convention ✓); superdense coding and the ebit/qubit/cbit conversion table ✓; PLOB with η = 10^(−L/50) ✓; decoy-state attribution now including X.-B. Wang 2005 ✓ (more complete than Ch27's); DLCZ mechanics ✓; BBPSSW/Deutsch purification ✓; BDCZ 1998 + Muralidharan 2016 generation taxonomy correctly split ✓; Micius facts exact (2016 launch, Xinglong/Nanshan/Graz, 7600 km Beijing–Vienna, 1200 km entanglement) ✓; Lo–Curty–Qi 2012 MDI-QKD ✓; Wehner–Elkouss–Hanson 2018 stack ✓; NetSquid/SeQUeNCe/QuISP simulators ✓; Broadbent–Fitzsimons–Kashefi 2009 blind computing ✓; nonlocal-CNOT resource count (1 ebit + 2 cbits) ✓; sanity checks recomputed (check 3: 10²⁰ trials; check 5: 80 dB satellite advantage) ✓. Sanity check 4 — locate the second superdense bit by computing that every Bell state's reduced density matrices are I/2 — is the single best exercise in the book.

- **Severity:** Nit · **Category:** Numerical precision · **Location:** §33.2 (line 47)
  - **Problem:** "At 200 km the rate is **below** 10⁻⁴ bits per channel use; at 500 km it is **below** 10⁻¹⁰." The PLOB rate at η = 10⁻⁴ is η/ln 2 ≈ 1.44×10⁻⁴ — slightly *above* 10⁻⁴ (same at 500 km). "Of order" would be exact.
  - **Recommendation:** "of order 10⁻⁴ … of order 10⁻¹⁰".
  - **Certainty:** High (recomputed).

- **Severity:** Nit · **Category:** Requires verification (names) · **Location:** §33.5 (lines 100, 118)
  - **Problem:** (i) "**QNE-sim** (link-layer-focused, used by the European pilot networks)" — QuTech's public platform is Quantum Network Explorer (QNE); "QNE-sim" as a named simulator needs verification. (ii) "**BTI Long Island**" among US testbeds — the Long Island quantum network is the Brookhaven (BNL)–Stony Brook effort; "BTI" is unrecognisable and may be a garble.
  - **Recommendation:** Verify both names.
  - **Certainty:** Medium (ledgered).

- **Severity:** Nit · **Category:** Consistency (recurring) · **Location:** line 140; bridge heading (line 138)
  - **Problem:** (i) "Parts **II–X**" — Roman numerals, vs the book's Arabic "Part 8/Part 11" usage elsewhere (an inconsistency first logged at Ch1 and recurring). (ii) The bridge is an **H3** heading ("### Bridge to Chapter 34") after a horizontal rule — yet another bridge style (running tally now: numbered H2, unnumbered H2, merged-titled H2, unheaded paragraph, bold run-in, H3). Status 6/6 counts the six numbered H2s.
  - **Recommendation:** §13 lint rule covers both.
  - **Certainty:** High.

**Entertainment:** high — "the central engineering antagonist" (fibre loss), "a quantum repeater is a router under a no-cloning constraint" (borrowed forward from Ch34), and the honest "the vocabulary … is well-developed; the deployed substrate is still patchy" all land. **Pedagogy:** the resource-conversion-table framing of §33.1 unifies the whole chapter and pays off in the §33.6 bandwidth argument (ebit rate must exceed nonlocal-gate rate); the three-generation repeater taxonomy is the clearest compressed account I know; the deliberate division of labour with Ch27 (crypto-primitive view there, protocol/network-engineering view here) mostly works and is explicitly signposted in both directions. **Rendering:** clean; the four-term teleportation expansion is correctly escaped; no figures — a repeater-chain/swapping diagram would be the highest-value addition.

### book/part-13-perspective-and-direction/34-bridging-to-familiar-engineering-ideas.md (Chapter 34, 138 lines, 9 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — coherence times corrected to hundreds-of-µs (SC) / seconds (ions), matching the book's own tables; threshold overhead "polylogarithmic in the target error"; "Chapter 9.3/9.4" → "§9.3/§9.4" reference style.

**Overall:** The chapter that justifies the book's subtitle, and the analogies are chosen with unusual care — every one carries its own break-point ("the translations are imperfect on purpose"). The two best: **no-cloning as a move-only type** (Rust ownership discipline, with "copying is illegal unless the source state is classical" as exactly the right refinement) and **parameter-shift as forward-mode AD on a graph you cannot re-traverse** ("the worst case for AD") — the latter is the most precise one-line explanation of why variational training is expensive that I have seen anywhere. Verified: parameter-shift formula consistent with Ch11/14/23 ✓; QFT O(n²) vs FFT O(n·2ⁿ) ✓; SECDED ECC (64+8, detect-2/correct-1) ✓; Reed–Solomon ⌊(n−k)/2⌋ vs stabiliser ⌊(d−1)/2⌋ parallel ✓; von Neumann 1956 ✓; the nonlinear-gate consequences (FTL signalling, cloning, NP ⊆ poly — the Abrams–Lloyd line) ✓; uncomputation-as-RAII with the correct warning that discarding a hot ancilla "leaks quantum advantage" ✓; the six §34.9 misconceptions are all accurately stated and each cross-links to the right deep treatment ✓.

- **Severity:** Low · **Category:** Internal consistency (numbers) · **Location:** §34.4 (line 53)
  - **Problem:** "current quantum devices have … **microsecond-scale coherence times**" — the book's own repeatedly-quoted figures (Ch18 §18.2, Ch20 §20.1, Ch22 §22.4, Ch25 §25.2) are 100–300 µs for superconducting and *seconds-to-minutes* for ions. "Microsecond-scale" undersells by two-plus orders of magnitude against the book's own tables.
  - **Recommendation:** "coherence times from hundreds of microseconds (superconducting) to seconds (ions)".
  - **Certainty:** High (in-repo).

- **Severity:** Nit · **Category:** Phrasing (garbled) · **Location:** §34.6 (line 79)
  - **Problem:** Threshold theorem paraphrased as suppression "at **polylogarithmic overhead in code distance**" — the overhead is polynomial in distance / polylogarithmic in the *target error*; Ch19 §19.19 states it correctly.
  - **Recommendation:** "…at overhead polylogarithmic in the target error".
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Consistency (style tally) · **Location:** lines 127–133; §34.3 heading refs
  - **Problem:** (i) Sanity checks rendered inside a **blockquote** headed "Sanity checks." — a *seventh* end-matter style variant. (ii) Cross-references written "Chapter 9.3 / Chapter 9.4" instead of the book's usual "§9.3". No bridge section at all (the Ch35 hand-off is the last body paragraph); status 9/9 matches the 9 H2s.
  - **Recommendation:** §13 lint rule.
  - **Certainty:** High.

**Entertainment:** high — this chapter is the book's voice at its best ("forgetting to run it does not leak memory, it leaks *quantum advantage*"; "embedded systems engineering with an exotic ISA"). **Pedagogy:** the helps/misleads split (§§34.8–34.9) is the right final act, and the six misconceptions are precisely the ones Ch35 then unpacks — good architecture; the measurement-as-syscall framing ("maximum information per boundary crossing") quietly restates the Holevo lesson from Ch12/Ch13 in operational terms. The probabilistic-programming analogy (Stan/Pyro readers are closer than C programmers) is unconventional and correct. **Rendering:** clean; single display equation properly escaped; blockquote checks render fine on GitHub.

### book/part-13-perspective-and-direction/35-interpretational-and-conceptual-pitfalls.md (Chapter 35, 637 lines, 14 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — element distinctness moved out of the no-advantage list (replaced by majority/exact counting; explicit note that ED is a proven N^{2/3} polynomial speedup, cross-ref §15.6); safe/coin analogy replaced with the correlated-sealed-envelopes analogy.

**Overall:** The longest chapter in the book and among the very best — a foundations chapter written entirely in the service of practice ("operational hygiene, not philosophy"), with the slogan-upgrade device ("nonlocal correlation without nonlocal signalling", "conditional update", "structured interference") giving each section a portable takeaway. Verified: the §35.2 no-signalling computation (Σₐtr_A((M_a⊗I)ρ) = ρ_B via POVM completeness) ✓ — and consistent with Ch10 §10.6's more careful version; Robertson relation with [Z,X] = 2iY, [Z,Y] = −2iX ✓ consistent with Ch10's commutators; sanity check 3 is deliberately the *vacuous-bound* case (⟨0|Y|0⟩ = 0 → bound 0 = ΔX·ΔZ) — consistent with Ch10's own remark on Robertson vacuousness, an elegant cross-chapter echo ✓; Ozawa 2003/Branciard 2013 error-disturbance attributions ✓; EPR/Bohm/CHSH 2√2 ✓; **Frauchiger–Renner 2018 + Bong et al. 2020** stated with unusual precision (the three meta-assumptions, "different interpretations modify different ones") ✓; the interpretations zoo is accurate throughout, including the important structural point that **objective collapse is a rival theory, not an interpretation** ✓; **"shut up and calculate" correctly attributed to Mermin** (most books hand it to Feynman) ✓; PBR stated with its load-bearing preparation-independence assumption ✓; the superdeterminism/measurement-independence loophole handled exactly as Ch7's review hoped (this section supplies the full scoping that Ch7's flat "ruled out" lacked) ✓; decoherence-does-not-solve-measurement is the correct and honest verdict ✓; sanity check 2 recomputed (ρ_B = I/2 before and after) ✓.

- **Severity:** Low · **Category:** Internal inconsistency (misclassified example) · **Location:** §35.11 (lines 507–513)
  - **Problem:** Under "problems have proven **no asymptotic quantum advantage beyond constants**" the chapter lists: parity (correct — Θ(N) both, exactly N/2 quantumly) *and* "**element distinctness** has a quantum query lower bound of Ω(N^{2/3}), only marginally below classical". Element distinctness is a *proven polynomial speedup* — Θ(N^{2/3}) quantum (Ambainis, tight by Aaronson–Shi) vs Θ(N) classical — and the book's own §15.6 and §17.8/§17.11 present it as exactly that. N^{2/3} vs N is not "marginal" and is certainly an asymptotic advantage.
  - **Recommendation:** Move element distinctness to the polynomial-speedup category (or replace it with a genuine no-advantage example, e.g. majority/counting at Θ(N)).
  - **Certainty:** High (internal contradiction; external facts well-established).

- **Severity:** Nit · **Category:** Phrasing · **Location:** §35.2 (lines 117–119)
  - **Problem:** The closing analogy ("a coin flip determines whether the safe was opened" versus "I can open the safe by knowing which way the coin landed") doesn't parse cleanly — the two clauses don't map onto the correlation-vs-communication distinction being illustrated.
  - **Recommendation:** Replace with a standard shared-randomness analogy (two sealed envelopes with correlated cards).
  - **Certainty:** Medium-high.

**Entertainment:** the strongest voice in the book — "every one of those translations is *less dramatic and more useful* than the popular version" is the chapter's thesis and its method; "not waste shipping cycles on choosing between them" is perfectly judged for the audience. **Pedagogy:** §35.7's inversion (interpretations don't matter operationally but *do* matter pedagogically, because metaphors prime specific mistakes — with a per-interpretation list of which mistake) is genuinely original textbook writing; the §35.8 claims-classification grid previews Ch36 without duplicating it; the six Ch34 §34.9 misconceptions each get their promised deep treatment, and the cross-chapter architecture holds. Status 14/14 with the bridge merged into counted §35.14 ✓. **Rendering:** the hard-wrapped prose style (unique to this chapter and its Part-13 siblings) renders fine in GitHub Markdown since the wraps fall outside math spans — checked several wrapped display/inline-math boundaries ✓; all escaping correct.

### book/part-13-perspective-and-direction/36-how-to-judge-claims.md (Chapter 36, 162 lines, 8 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — Schnorr case study corrected end-to-end (Claus-Peter Schnorr's 2021 *classical* claim vs Yan et al.'s 2022–23 *hybrid* QAOA proposal, both debunked; title updated to "The Schnorr-method factoring claims (2021–2023)"); IBM utility narrative corrected to match §36.4's accurate version (utility-from-the-outset, paper title quoted; coordinated with the Ch25 fix); 10⁷ → 10⁶ shots per kilosecond.

**Overall:** The anti-hype field manual the book has been promising since Chapter 1, and mostly excellent — the five red flags (§36.2), the four reading checklists (§36.5), and the "which axis is the progress on" closing discipline are directly actionable; the dequantisation section verifies cleanly (**Chia–Gilyén–Li–Lin–Tang–Wang 2020 author list exact** ✓; Gilyén–Lloyd–Tang 2018 ✓; the shadows-vs-dequantisation disambiguation consistent with Ch16 §16.8 ✓); Grover 2¹⁵-queries-at-N=2³⁰ arithmetic ✓; the §36.6 scaling ledger consistent with Ch19/Ch25 ✓; sanity check 2 explicitly acknowledges its Ch16 twin ✓ (deliberate spaced repetition, well done). But the chapter that teaches claim-checking contains two checkable errors of its own — one of them in a case study.

- **Severity:** Medium · **Category:** Factual (misattributed case study) · **Location:** §36.7 (line 124)
  - **Problem:** "**Schnorr's factoring sketch (2023). Peter Schnorr** posted a sketch claiming that a hybrid scheme combining lattice reduction **with a small quantum subroutine** could factor large RSA integers with far fewer qubits…" Three problems. (i) The name: he is **Claus-Peter Schnorr** (usually "Claus Schnorr"), not "Peter Schnorr". (ii) The attribution: Schnorr's own claim (March **2021**, "This destroys the RSA cryptosystem") was purely **classical** lattice-based factoring; the few-hundred-qubit *hybrid quantum* claim was **Yan et al. (Dec 2022/Jan 2023)** — a separate Chinese group that combined Schnorr's lattice method with QAOA (372 qubits for RSA-2048). (iii) The debunking narrative described (lattice step doesn't scale, quantum subroutine's contribution overstated) applies to the *Yan et al.* paper. A claims-evaluation chapter mis-crediting its own worked example is self-undermining; Ch15 §15.3's version ("Schnorr's algorithm + quantum lattice reduction: a 2023 sketch") is closer but also blurs the two.
  - **Recommendation:** "Schnorr's 2021 classical lattice-factoring claim, and the 2023 Yan et al. hybrid proposal built on it, …" — and align Ch15 §15.3's wording.
  - **Certainty:** High (well-documented episode).

- **Severity:** Low · **Category:** Repeated mischaracterisation (with Ch25) · **Location:** §36.7 (line 126)
  - **Problem:** "The original paper **claimed quantum advantage** on a 'utility-scale' workload … The IBM team's stance **subsequently shifted from 'advantage' to 'utility'**" — the same narrative error flagged at Ch25 §25.4: the Kim et al. 2023 Nature paper was titled and framed as "**utility**" from the outset; what the classical reproductions narrowed was the "beyond brute-force classical methods" scope. Now a ×2 pattern; §36.4's own line ("the underlying paper was more careful than the coverage") is closer to the truth and contradicts §36.7's framing within the same chapter.
  - **Recommendation:** One coordinated fix across §25.4, §36.4, §36.7.
  - **Certainty:** Medium-high (and the internal §36.4-vs-§36.7 tension is in-repo).

- **Severity:** Low · **Category:** Arithmetic · **Location:** §36.6 (line 114)
  - **Problem:** "a 10⁴-qubit chip with **10³ Hz** shot rate executes **10⁷ shots per kilosecond**" — 10³ shots/s × 10³ s = **10⁶** shots per kilosecond. Off by 10×.
  - **Recommendation:** 10⁶ (or raise the shot rate to 10⁴ Hz).
  - **Certainty:** High (recomputed).

**Entertainment:** high — "press releases are not lying — they are selecting and framing", "'enterprise-grade' … as a signal of intent rather than a description of the artefact", and "anyone giving narrower bounds is selling something" are the right register for the material. **Pedagogy:** the §36.1 provenance-taxonomy (preprint/journal/vendor/analyst, each with its incentive) and the "any claim that gets simpler as it moves down the chain is being shaped, not distilled" heuristic are the two most transferable ideas; the replicate-before-adopting advice with its "under a hundred dollars" cost estimate makes skepticism actionable rather than rhetorical. The §36.4 question "what specifically would degrade if the quantum subroutine were replaced by a classical heuristic of the same wall-clock cost?" deserves to be famous. Status 8/8 ✓; bridge unheaded in §36.8's tail (tally). **Rendering:** clean; no math-heavy content; hard-wrapped prose renders fine.

### book/part-13-perspective-and-direction/37-endgame.md (Chapter 37, 153 lines, 9 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — QIP "no formal proceedings — accepted papers live on arXiv"; "two-qubit *error* roughly halved" (fidelity cannot double); garbled "classical-inverse" phrase rewritten.

**Overall:** A worthy close — the only chapter with "so what?" as the load-bearing question, and it answers it without either hype or cynicism. Verified: the §37.1 whole-book trajectory map is **accurate in every part/chapter assignment** (checked against the actual directory structure: Parts 1–13 ↔ Chapters 1–37, all correct) ✓; the §37.2 calibration numbers are consistent with Ch20/Ch22/Ch25 (10³ SC qubits, 10² ions, fidelity tiers, d = 3–11 logical demos, no defended production advantage) ✓; §37.3's application-arrival ordering (chemistry → lattice models → optimisation → cryptographic break → QML) is consistent with Parts 8–11's own conclusions ✓; the RSA resource summary (10³–10⁴ logical, d ~ 21, 10⁹–10¹² T, 2035–2040 window) matches Ch19/Ch25/Ch27/Ch36 ✓ — the book's most-repeated numbers are, by the end, mutually consistent across six chapters; the **Nielsen–Chuang chapter recommendations (2, 4, 5, 10) are exactly right** ✓; Mermin/Kitaev–Shen–Vyalyi/Preskill-2018/Fowler-2012 reading list all correct ✓; sanity check 3 recomputable (10⁴ qubits, d = 11 → ≈41 logical; not remotely RSA-scale) ✓. The §37.8 closing argument — study it because the model is beautiful and "the discipline of building serious models in hype-prone fields is the most durable engineering skill there is" — is the right last word for this book's audience, and check 5 operationalises it.

- **Severity:** Nit · **Category:** Factual detail · **Location:** §37.6 (line 111)
  - **Problem:** "QIP … **Proceedings are open-access**" — QIP is a talks-based conference with no formal published proceedings (accepted papers live on arXiv).
  - **Recommendation:** "accepted papers are posted on arXiv".
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** Phrasing (error/fidelity conflation) · **Location:** §37.3 (line 46); §37.8 (line 134)
  - **Problem:** (i) "two-qubit **fidelity improved by roughly a factor of two** per platform-generation" — the *error* halved; a 99% fidelity cannot double. (ii) "quantum simulation as the natural **classical-inverse** of the simulation problem" — garbled phrase.
  - **Recommendation:** "two-qubit *error* roughly halved…"; rewrite (ii).
  - **Certainty:** High.

**Entertainment:** the Preface's promissory voice returns and pays off — "readers who keep reaching for the classical metaphor stay surprised forever" and the 1945-mechanical-calculation analogy are keepers; §37.7's anti-pattern paragraph ("checkable in a single hour-long conversation") is bracingly honest career advice. **Pedagogy:** the six-role taxonomy (§37.5) with its sorting question is the most useful career section I've seen in a technical book; sanity check 1 (restate the postulates from memory, attribute entanglement/interference/measurement to the right ones) is the correct final exam for the whole book. Status 9/9 with checks as counted §37.9 ✓. **Rendering:** clean. **Note for §14 (final verification):** §37.6 promises "Appendix D collects this list with current URLs" — check at the Appendix D review.

### book/99-back-matter/appendix-a-notation-reference.md (Appendix A, 365 lines, 6 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — "five" → "six" distinct bar symbols (both sites); fidelity entry now states the convention in full (unsquared tr√(√ρσ√ρ), range, pure-state form) instead of deferring.

**Overall:** A genuinely useful lookup appendix with the book's conventions correctly and consistently recorded. **Ledger resolutions:** (i) Ch9 §9.1's claimed "Appendix A index-conversion recipe" **exists** — §A.1 gives the zero-based index formula Σxᵢ2^{n−i} and §A.3 gives the operational Qiskit mapping rule ("map the leftmost tensor factor to Qiskit's highest-numbered qubit label, otherwise insert an explicit SWAP layer") ✓ resolved. (ii) The I/I_n identity notation is registered here ✓. Verified: bra anti-linearity, conjugate-linear-first inner product, outer-product entries ψᵢφ̄ⱼ ✓; the six-way bar taxonomy (|z|, ‖v‖, ‖A‖, ‖A‖₁, ‖A‖_HS, |A|) with the crucial "|A| is *not a scalar, and not a norm*" warning — excellent reference writing ✓; spectral/SVD blocks ✓; all four tensor identities ✓; QFT-sign-minus F_N|j⟩ = N^{-1/2}Σω^{−jk}|k⟩ consistent with Ch13/14, **plus the high-value warning that Qiskit's `QFTGate` implements the inverse of this book's F_N** ✓; the bullets-over-tables rationale citing renderer Bug 5 (pipes in table cells) is self-consistent rendering discipline ✓; §A.6 entropy/Holevo entries consistent with Ch12 ✓.

- **Severity:** Low · **Category:** Copy edit (count) · **Location:** §A.2 (lines 79–80, 102–103)
  - **Problem:** "The norm symbols are reused for **five** distinct roles" and "**five** distinct symbols share two glyphs" — the list that follows has **six** entries (|z|, ‖v‖, ‖A‖, ‖A‖₁, ‖A‖_HS, |A|). Same off-by-one pattern as Ch17 §17.1's "five classes"/six bullets.
  - **Recommendation:** "six".
  - **Certainty:** High.

- **Severity:** Low · **Category:** Incomplete reference entry · **Location:** §A.4 (line 254)
  - **Problem:** The fidelity entry says "Several conventional definitions are in use … the book uses one consistently and notes the choice where it matters (Chapter 12)" — but never *states* the choice. A notation reference exists precisely to record the convention: Ch12 §12.7 fixes the **unsquared** form F = tr√(√ρ σ √ρ).
  - **Recommendation:** State the formula and "unsquared, F ∈ [0,1], F(pure,pure) = |⟨ψ|φ⟩|" inline.
  - **Certainty:** High.

**Assessment:** the strongest of the possible appendix designs — every entry carries its section-of-record link, and the recurring traps (bar-counting, Qiskit endianness, QFT sign) each get a dedicated warning at the point of lookup. **Rendering:** correct throughout; the deliberate avoidance of tables for ket-bearing content is exactly right per the book's own renderer-bug memo.

### book/99-back-matter/appendix-b-common-gates.md (Appendix B, 442 lines, 9 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — SWAP uniqueness claim scoped to "the only *common* two-qubit gate".

**Overall:** Exceptionally clean — I verified **every matrix and every algebraic property** in the appendix and found no errors. Highlights of the verification: Pauli algebra (XY = iZ cycle, commutators 2i-cycle, anticommutators zero — consistent with Ch10/Ch35) ✓; Y = iXZ recomputed ✓; H eigenvectors at π/8 ✓; HYH = −Y ✓; P(φ) = e^{iφ/2}R_z(φ) recomputed ✓; X = iR_x(π) family recomputed ✓; **both CNOT matrices** (1→2 and 2→1 under MSB-first) verified entry-by-entry ✓; the (H⊗H)-conjugation control-swap identity ✓; **the Qiskit mapping `cx(0,1)` ↔ CNOT₂→₁ is correct** — the single most error-prone claim a book with this convention can make, and it is right ✓; CCX permutation (swaps indices 6,7) ✓; SWAP symmetric/antisymmetric eigenspace multiplicities (3,1) ✓; the C(e^{iα}U) = (P(α)⊗I)C(U) global-to-relative-phase identity recomputed ✓ — and the resulting warning that C(R_z(θ)) ≠ CP(θ) is exactly the trap §B.3 promised to disarm, closed loop ✓. The per-gate "Properties" bullet format (Hermitian? involutory? eigenvalues? basis action? endian note?) is uniform across all nine sections — the best-executed formatting discipline in the book.

- **Severity:** Nit · **Category:** Loose claim · **Location:** §B.7 (line 268)
  - **Problem:** SWAP called "the **only** non-trivial two-qubit gate that is also symmetric and computational-basis-permutation" — strictly, other symmetric non-product basis permutations exist (e.g. the 00↔11 transposition); the claim holds only for *named/common* gates.
  - **Recommendation:** "the only common two-qubit gate…".
  - **Certainty:** Medium (depends on reading of "non-trivial").

**Assessment:** with Appendix A, this forms exactly the reference pair the book needs; the deliberate re-derivation avoidance ("point back to §4.8 … rather than re-derive it here") keeps the single-source-of-truth discipline. Status 9/9 ✓. **Rendering:** heavy `pmatrix` throughout, all with correct `\\\\` row separators ✓; no tables (consistent with the Bug-5 policy) ✓.

### book/99-back-matter/appendix-c-identities-and-decompositions.md (Appendix C, 385 lines, 6 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — **one-CNOT criterion corrected** to the local-equivalence class (π/4, 0, 0) with the partial-controlled-phase counterexample and §8.14 cross-ref; KAK exponent sign aligned with §8.14 (e^{−i·}); MUB pointer redirected from the nonexistent Chapter-12 treatment to the real anchors (BB84 §27.7/§33.2, tomography §11.4).

**Overall:** A high-value identities appendix, almost entirely verified correct by recomputation: the full Pauli product table (all 16 entries) ✓; the clever Hermitian-from-non-Hermitian tensor counterexample (A = iH, B = iK) ✓; det(A⊗B) = (det A)ⁿ(det B)^m ✓; AB = ½[A,B]+½{A,B}, both Leibniz rules, Jacobi, [A,B]† = [B†,A†] ✓; SXS† = Y and SYS† = −X recomputed by matrix multiplication ✓; T = e^{iπ/8}R_z(π/4) recomputed ✓; **H = e^{iπ/2}R_y(π/2)R_z(π) recomputed and correct** ✓ (a formula that is wrong in a surprising number of references); all four CNOT-Pauli propagation identities with the X-forward/Z-backward mnemonic ✓; SH/HS† Y-basis recipes **exactly consistent with Ch11 §11.7's measurement instructions** ✓; MUB facts (d+1 bound, prime powers, d = 6 open) ✓. Three findings, one of them a genuine mathematical error:

- **Severity:** Medium · **Category:** Mathematical (false criterion, contradicts §8.14) · **Location:** §C.5 (lines 307–309)
  - **Problem:** "Two-CNOT decomposition is enough iff … c_z = 0 ✓. **One-CNOT decomposition is enough iff additionally c_y = 0.**" False: the one-CNOT class is exactly the local-equivalence class of CNOT, c = (π/4, 0, 0) — not the whole (c_x, 0, 0) line. A partial controlled-phase CP(θ), θ ≠ π, has KAK vector (θ/4, 0, 0)-type with c_y = c_z = 0 yet requires **two** CNOTs (Shende–Bullock–Markov). Ch8 §8.14 states this correctly ("a point locally equivalent to CNOT needs one"), so the appendix contradicts the chapter of record.
  - **Recommendation:** "One CNOT suffices iff (c_x, c_y, c_z) = (π/4, 0, 0) — i.e., U is locally equivalent to CNOT."
  - **Certainty:** High (verified against §8.14 in-repo; SBM classification standard).

- **Severity:** Low · **Category:** Cross-reference (wrong chapter) · **Location:** §C.6 (line 380)
  - **Problem:** MUB "general construction and applications (random access codes, tomography) are taken up in **Chapter 12**" — grep-verified: neither Ch12 nor Ch11 discusses mutually unbiased bases at all (Ch11's only "unbiased" is the estimator sense). The reference points at content that does not exist.
  - **Recommendation:** Point at the sections that actually touch MUB-adjacent material (BB84's two bases, §27.7/§33.2; tomography, §11.4) or drop the pointer.
  - **Certainty:** High (grep-verified).

- **Severity:** Nit · **Category:** Convention drift · **Location:** §C.5 (line 284) vs §8.14
  - **Problem:** The KAK exponent is written e^{+i(c_xXX+…)} here but e^{−i(…)} in §8.14. Locally absorbable, but a single book should print one sign.
  - **Recommendation:** Match §8.14.
  - **Certainty:** High (in-repo).

**Assessment:** with A and B this completes a genuinely usable reference triptych; the §C.4 CNOT-propagation block explicitly wired to §19.8 ("workhorse identities of the stabilizer formalism") is exactly the right forward linkage. Status 6/6 ✓. **Rendering:** clean; bullets-not-tables policy maintained ✓.

### book/99-back-matter/appendix-d-suggested-reading.md (Appendix D, 329 lines, 8 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — Bravyi–Gosset 2016 title corrected ("Improved classical simulation of quantum circuits dominated by Clifford gates"); Panteleev–Kalachev STOC 2022 title corrected ("Asymptotically good quantum and locally testable classical LDPC codes"); Qiskit-Pulse-removed caveat added to the pulse-control entry (consistent with §21.3/§23.5); conferences block added to D.8 (fulfilling §37.6's promise).

**Overall:** A genuinely curated bibliography — every entry annotated with *why* and *when* to read it, which is rarer than it should be. I checked ~40 bibliographic entries: the overwhelming majority are exact, including several easy-to-fumble details (Tang **arXiv:1807.04271** ✓; Vidick–Watrous *Quantum Proofs*, FnT-TCS 2016 ✓; Campbell–Terhal–Vuillot, Nature 2017 ✓; Bharti et al., RMP 2022 ✓; Childs–van Dam, RMP 2010 ✓; Krantz/Bruzewicz/Slussarenko APR trio ✓; Koch 2007, Saffman 2016, Zwanenburg 2013 ✓). Notably, **Low–Chuang qubitization is dated correctly here (Quantum, 2019)** — cleaner than Ch16's body-text "2017" — and the presence of **Martyn–Rossi–Tan–Chuang 2021 "Grand unification of quantum algorithms"** corroborates the Ch16 §16.7 ledger item (the "QSVT is to quantum algorithms…" slogan likely belongs to this survey, not to GSLW). The D.8 Qiskit note (QFT *class* deprecated in 2.1, removed in 3.0, → `QFTGate`/`synth_qft_full`) is consistent with Appendix A's QFTGate warning ✓, and PyMatching is correctly credited here (unlike Ch19) ✓.

- **Severity:** Low · **Category:** Bibliographic (title likely confabulated) · **Location:** §D.4 (line 155)
  - **Problem:** "*Limitations on the simulation of non-stabilizer states.* Sergey Bravyi and David Gosset. PRL, 2016" — the Bravyi–Gosset PRL 2016 paper is titled "**Improved classical simulation of quantum circuits dominated by Clifford gates**"; no BG paper carries the listed title.
  - **Recommendation:** Correct the title.
  - **Certainty:** Medium-high.

- **Severity:** Low · **Category:** Bibliographic (title/venue mismatch) · **Location:** §D.4 (line 159)
  - **Problem:** "*Quantum LDPC codes with almost linear minimum distance.* Panteleev and Kalachev. **STOC, 2022**" — that title is their IEEE Trans. Inf. Theory 2021 paper; the STOC 2022 paper is "**Asymptotically good quantum and locally testable classical LDPC codes**" (the one Ch19 §19.15 actually leans on).
  - **Recommendation:** Cite the STOC 2022 title (or both papers).
  - **Certainty:** Medium-high.

- **Severity:** Nit · **Category:** In-repo consistency · **Location:** §D.5 (line 197), §D.8, whole appendix
  - **Problem:** (i) D.5 recommends "the Qiskit Pulse module documentation" with no mention that Qiskit Pulse was **removed in Qiskit 2.0** — a caveat Ch21 §21.3 and Ch23 §23.5 both state carefully. (ii) §37.6 promised "Appendix D collects this list with current URLs" including the three conferences — D has no conference entries and URLs only in D.8. (iii) Part references in Roman numerals ("Parts I–IV", "Part XI") — the recurring Arabic/Roman inconsistency.
  - **Recommendation:** Add the removal caveat; add a short conferences block; normalise part numbering (§13 lint).
  - **Certainty:** High (all in-repo).

**Assessment:** the annotations are the appendix's real value ("read for the engineering rather than the headline" on Arute 2019; "read this once even if you only intend to use the result" on Shor) — this is a bibliography that teaches. Status 8/8 ✓. **Rendering:** clean; backticked URLs render safely.

### book/99-back-matter/appendix-e-glossary.md (Appendix E, 538 lines, 7 H2 sections)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — depolarising-channel entry now carries the p-vs-p′ parameterisation reconciliation with §10.12; Raz–Tal year aligned to 2019 (matching Ch17).

**Overall:** A high-quality glossary, and in two places *more* correct than the body of the book: the **fidelity entry states the unsquared convention explicitly** (exactly the fix Appendix A §A.4 needs — the text can be copied verbatim), and the **density-matrix-simulator entry gets the half-the-qubit-count arithmetic right** (where Ch24 §24.4 slipped to "n = 22 on a server"). Verified: all E.1 core definitions consistent with the postulates chapters ✓ (the three-senses split of "state" — ray / density matrix / vector representation — is model glossary practice); the Collapse entry ("an ingredient of the measurement postulate, not a physical process separate from it") is Ch35-consistent ✓; E.2 math entries all correct incl. {σᵢ,σⱼ} = 2δᵢⱼI ✓; E.3 algorithmic entries correct — notably amplitude amplification's O(1/a)-vs-O(1/a²) stated correctly *in amplitude* (a frequent error) ✓ and phase estimation's O(2ⁿ)-controlled-U-for-n-bits ✓; E.4 hardware entries consistent with Ch18/20/22 incl. T₂ ≤ 2T₁ and the 1/T₂ decomposition ✓; E.6 PostBQP = PP (Aaronson 2005) ✓; E.7 statevector 16 GB @ n = 30 double precision consistent with Ch24/26 ✓; Stim "(Gidney 2021)" correctly attributed ✓.

- **Severity:** Low · **Category:** Convention drift (in-repo) · **Location:** §E.5 depolarising entry (line 368)
  - **Problem:** Glossary canonical form: 𝓔(ρ) = (1−p)ρ + (p/3)(XρX+YρY+ZρZ). Ch10 §10.12's canonical Kraus form uses the *other* standard parameterisation (√(1−3p/4)·I, √(p/4)·σ, i.e. (1−3p/4)ρ + (p/4)Σ). Both are correct individually, but p means different things in the two places (p_glossary = 3p_ch10/4) and neither notes the reparameterisation.
  - **Recommendation:** One convention book-wide, or a one-line reconciliation in the glossary entry.
  - **Certainty:** High (in-repo).

- **Severity:** Nit · **Category:** Date consistency · **Location:** §E.6 (line 422)
  - **Problem:** "Raz–Tal (**2018**)" vs Ch17's "Raz–Tal (**2019**)" — preprint year vs STOC year; pick one.
  - **Certainty:** High (in-repo).

**Rendering:** bullets-not-tables policy maintained ✓; clean throughout. Status 7/7 ✓.

### book/99-back-matter/appendix-f-hardware-snapshot-2026.md (Appendix F, 175 lines, 8 H2 sections)

> ✅ **Remediation 2026-07-04 (batches 3a/3b):** RESOLVED FROM THE OTHER SIDE — Appendix F is confirmed as the source of truth; the Ch20/Ch22 contradictions (IonQ AQ, H2 fidelity, Condor, Phoenix) were fixed in those chapters, and both now carry Moving-target banners deferring to this appendix. No changes to F itself.

**Overall:** The best-designed perishable content in the book — the **formal Moving-target banner is present** (with a pointer to the fact-check ledger), the F.8 "replace wholesale rather than patching" revision protocol is exactly right, and the design rationale ("time-sensitive numbers live in one place") retroactively explains what Ch20/Ch22/Ch25 *should* be doing (deferring their numbers here). In several spots F is more accurate than the body chapters, which converts earlier external-verification findings into **in-repo inconsistencies**: F correctly says Condor "1,121-qubit … (2023)" where Ch20 §20.1 says "approaching 1000" ✓; F correctly credits the >1,000-atom result to Atom Computing *without* the erroneous "Phoenix" name Ch20 uses ✓; F cites **Bluvstein et al., Nature, December 2023** for the 48-logical-qubit result with exact venue/date ✓; the Microsoft+Quantinuum 4-logical-qubits-on-H2 (2024) milestone is right ✓; the Majorana-1 treatment is consistent with Ch20/Ch32's calibrated scepticism ✓. The F.6 table safely uses pipes (no in-cell math bars — Bug-5 compliant) ✓.

- **Severity:** Low-Medium · **Category:** In-repo inconsistency (two snapshots disagree) · **Location:** §F.3 vs Ch22 §§22.9/22.13
  - **Problem:** The book's two hardware-numbers surfaces contradict each other. (i) **IonQ:** F says "Forte at **#AQ 29** today, with Forte Enterprise **#AQ 35** and Tempo **#AQ 64** announced"; Ch22 says "**AQ = 36**" (at "64 physical qubits" in §22.9, "36 qubits" in §22.13). (ii) **Quantinuum H2 two-qubit fidelity:** F says "around **99.9%** (best-pair >**99.91%**)"; Ch22 says "≈**0.9997**". F's figures are the more defensible in both cases.
  - **Recommendation:** Make Ch22 §22.13 defer to Appendix F for all vendor numbers (one sentence + link), or reconcile the figures with dated sources; fix §22.9's 64-qubit claim regardless (already filed at Ch22).
  - **Certainty:** High (in-repo disagreement); medium-high (which side is right).

**Assessment:** F.1's three caveats and F.8's aging forecast ("architectural direction is the most stable signal") are the distilled Ch22/Ch36 discipline applied to the appendix's own content — self-consistent scepticism. Status 8/8 ✓.

### book/99-back-matter/index.md (Index, 126 lines, generated)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — TERMS list in scripts/generate_index.py expanded from 51 to 93 terms (all the review's named gaps: POVM, magic state distillation, teleportation, surface code, density matrix, trace distance, QKD/BB84, barren plateaus, error mitigation, quantum volume, Trotterization, classical shadows, twin-field QKD, and ~30 more) and the index regenerated with every anchor resolving; no-cloning now points at §5.13 (main development) with §10.5 as the computational restatement.

**Overall:** Generated artifact (scripts/generate_index.py, curated TERMS list) with a clear policy statement (link to *main development*, not first mention). **Anchor spot-checks all pass** — I verified nine section anchors against the actual headings this session (§9.3 Ancilla Qubits, §10.2 Interference, §10.5 No-Cloning Restated, §10.9 Decoherence, §10.10 Mixed States, §10.13 Kraus, §14.x series, §8.x series, §16.x series) ✓; the GitHub slug for "Clifford + T" (`#810-clifford--t`) is correctly double-hyphenated ✓.

- **Severity:** Low · **Category:** Completeness (draft-stage) · **Location:** whole file
  - **Problem:** 37 entries is skeletal for a 37-chapter book. Missing, among others: **POVM, magic state, teleportation, surface code** (only reachable via "Stabilizer formalism"→Ch19), **density matrix, trace distance, QKD/BB84, barren plateau, error mitigation, quantum volume, Trotterisation, classical shadows** — all terms a reader would plausibly look up, most with obvious main-development sections. The generator design makes expansion cheap (edit TERMS).
  - **Recommendation:** Roughly triple the TERMS list before release; harvest candidates from the Appendix E entry names (every glossary headword should be indexable).
  - **Certainty:** High.

- **Severity:** Nit · **Category:** Policy application · **Location:** N entry
  - **Problem:** "No-cloning theorem → §10.5" — §10.5 is "No-Cloning *Restated*"; the main development (statement + proof) is §5.13, which the index's own policy ("main development … most thorough treatment") would seem to prefer.
  - **Certainty:** Medium (policy judgement).

**Rendering:** clean; per-letter H2 grouping renders well. This completes the §7 file-by-file review of all 48 planned book files.

---

### Non-manuscript project files (README.md, TOC.md, STYLE.md, PROCESS.md, PROGRESS.md, HISTORY.md, BookDescription.md, INSTRUCTIONS.md, docs/, examples/, figures-src/, scripts/, repo root)

> ✅ **Remediation 2026-07-04 (batch 4 commit):** FIXED — STYLE.md completed per the review: full escape table (adds \\, and \\| doubling), renderer-bug memo linked, bridge/sanity-check/status-count conventions specified, part-numeral convention stated, and the Prelude's two local conventions adjudicated as deliberate. VERIFIED ALREADY PRESENT — `make check-examples` target exists (review item 9; no CI in repo by design). DEFERRED — root-artifact archiving and review/→reviews/ merge (files are referenced from HISTORY.md and the review-file lineage; needs an author decision on link updates); TOC.md generation (design change).

**README.md (208 lines).** Accurate and well-constructed. **Scripted verification:** all 48 book links resolve, and the linked titles match the target files' H1 headings with exactly one benign exception (the Historical Prelude entry drops the "Historical Prelude —" prefix its section header already supplies) ✓. The four reading paths reference real chapters with sensible selections ✓. The mdBook/mdbook-katex version-matrix section (matched-pairs requirement, the `invalid type: null` failure mode, `make book` self-diagnosis) is unusually good build documentation ✓. **Resolution of a long-standing tally item:** the README's TOC uses **Roman part numerals (Part I–XIII)** — so the book's Arabic-vs-Roman inconsistency (logged since Ch1) is now precisely characterisable: README/TOC/App-D use Roman; body-chapter prose uses Arabic ("Part 8", "Part 11"). One convention should win (finding stands, now sharper). License split (CC BY-NC-ND manuscript / all-rights-reserved tooling) is clearly stated ✓.

**TOC.md (788 lines).** The headline discovery: the file opens with a **Manuscript Reconciliation Note** (dated 2026-05-24) declaring the delivered manuscript authoritative and cataloguing outline divergences — and the catalogue is *accurate against my chapter-by-chapter findings*: the bridge-section inventory ("Chapters 8, 19, 23, 34, and 36 end on their last planned section instead") matches exactly what I observed ✓; the Ch10–12 reorganisation, Ch22's growth to 14 sections, and Ch24's new taxonomy all match ✓. This note **partially mitigates** the status-count findings (the outline is declared non-authoritative) but does not resolve the *in-chapter* inconsistency (Ch12/13 count bridges in their status blocks; Ch9/10/11/14/15/16/20/26 don't) — the §13 lint recommendation stands, aimed at the status blocks rather than the TOC.
- **Severity:** Low · **Category:** Maintainability · **Problem:** The planned-outline body (700+ lines) below the note is now a historical artifact that every reader must be warned off of via the note. Consider moving the plan to `docs/` and making TOC.md a generated live TOC (the tooling for heading extraction already exists in `generate_index.py`). · **Certainty:** Medium (design judgement).

**STYLE.md (130 lines).** The conventions it documents are the ones the manuscript actually follows (verified against 40+ files this review): `\\\\` matrix rows, `\\{`/`\\}` set braces, no `physics` package, no `\operatorname`, alt-text requirement ✓. Three gaps, each the root cause of findings logged earlier:
- **Severity:** Low · **Problem:** (i) The manuscript universally doubles `\,` → `\\,` and `\|` → `\\|` (verified in nearly every chapter), but STYLE.md documents only braces and row breaks — the two most-used escapes are undocumented. (ii) STYLE.md never links `docs/github-markdown-math-bugs.md`, its own evidentiary basis. (iii) The per-chapter structure spec says nothing about bridge sections, sanity-check blocks, or whether the status count includes them — the absence that produced the 7-variant bridge zoo and the status-count drift. · **Recommendation:** Add the full escape table (or link the memo), and specify the bridge + sanity-check + status-count convention. · **Certainty:** High.

**PROCESS.md (418 lines, skimmed at heading level + key sections).** Documents the working method, the **Moving-target warning callout convention** (confirming that Ch20/Ch22's missing banners are deviations from a documented house rule, not a reviewer invention), a dated decision log, per-chapter lessons, and the build troubleshooting matrix. **PROGRESS.md (86 lines, generated):** 48/48 files at draft — consistent with every status block I read. **docs/fact-check-ledger.md:** now superseded by a `factcheck/` directory that mirrors the manuscript per-section — an unusually sophisticated verification infrastructure; my §10 uncertainty ledger below should feed into that mirror. **docs/github-markdown-math-bugs.md + docs/render-tests/:** exist as advertised ✓ (cited correctly from App A/E).

**examples/ (4 files).** All four verified during chapter reviews: `deutsch_jozsa.py` ✓ (matches §14.2, output claim correct), `grover.py` ✓ (matches §15.1, CCZ oracle correct, ~95% matches theory), `statevector_simulation.py` ✓ (matches §24.3, zero-amplitude omission correct), `first_bell_program.py` ✓ (matches §26.3, `data.meas` register naming correct). A rare 4-for-4: every inline code listing in the book has a matching, runnable companion file. **Suggestion (Low):** `scripts/check_examples.py` exists — wire it into CI/make so the 4-for-4 stays true.

**figures-src/ + scripts/.** Not audited line-by-line (out of review scope at this depth); noted: `generate_figures.py` is the authoritative figure list per STYLE.md; all 8 figure files referenced from reviewed chapters exist on disk with descriptive alt text ✓; `generate_progress.py`/`generate_index.py`/`phases.py` outputs are consistent with the files they generate ✓.

**Repo root hygiene.**
- **Severity:** Low · **Category:** Project quality · **Problem:** The repository root carries 12+ legacy working files (`chapter0_attempt1–4.md`, `chapter_0_review_1–4.md`, `historical_chapter__new_attempt_1.md`, `historical_chapter__unified_opinion_1.md`, two root-level dated review files) plus **both** a `review/` and a `reviews/` directory. These are drafting artifacts that predate the current structure; they dilute the professional first impression the README earns and create ambiguity about which review directory is live.
- **Recommendation:** Move drafting artifacts to `docs/archive/` (or a branch); merge `review/` into `reviews/`. HISTORY.md already preserves the narrative, so nothing is lost.
- **Certainty:** High (inventory verified).

**BookDescription.md (422 lines) and HISTORY.md (1046 lines):** skimmed for consistency with README/TOC — charter claims (audience, philosophy, reading paths) match what README summarises and what the manuscript delivers; no contradictions found at skim depth. INSTRUCTIONS.md (34 lines) is the project's standing author instruction file; CITATION.cff present ✓.

---

## 8. Cross-cutting correctness findings (mathematics, facts, code)

All findings below were recomputed or source-checked during this review; each also appears in context in §7. Ranked by severity.

**Confirmed mathematical/technical errors (fix before release):**

1. **Self-check 1.3.1** (front matter): "A = I + X" should be 2I + X. *(Medium, certain — pre-compaction finding.)*
2. **Ch1**: collision finding / element distinctness mislabelled as a *quadratic* separation. *(Medium.)*
3. **Preface**: worked endianness example contradicts §4.8's own recommended mapping. *(High — it's the book's flagship convention.)*
4. **Ch6**: Bloch-sphere 2π/4π periodicity statement inverted. *(Medium, certain.)*
5. **Ch12 §12.7**: Fuchs–van de Graaf lower-bound saturation "only at endpoints" is false for general states — counterexample ρ = diag(½,½,0), σ = diag(½,0,½) gives 1−F = D at F = ½. True only for pure-state pairs. *(Low-Medium, counterexample recomputed.)*
6. **Ch14 §14.6**: "ε⁻¹ scaling **distinguishes** phase estimation from amplitude estimation" — false contrast; AE has the same O(1/ε) (the book's own §14.8 says so). *(Medium.)*
7. **Ch17 §17.7**: "BQP ≠ EXP" listed as an unconditional separation — the claim is open; the offered argument yields only a disjunction. Correct coarse statement: BQP ⊊ EXPSPACE. *(Medium, in a section whose whole point is which separations are unconditional.)*
8. **Ch17 §17.3**: "oracle separations exist on both sides" of QCMA vs QMA — impossible (QCMA ⊆ QMA unconditionally). *(Low.)*
9. **Ch17 §17.10 + bridge**: RSA-2048 resource numbers (7×10⁹ Toffoli, 10M qubits, 10 h) contradict §15.3 and §16.8, while citing §15.3. *(Medium, three-way internal inconsistency.)*
10. **Ch19 §19.19**: concatenation formula divides by C^{2^ℓ−1} where the recursion multiplies — self-inconsistent with the C³p⁴ two-level case in the same sentence. *(Low, typo-class.)*
11. **Ch22 §22.9**: AQ ≈ √N_phys rule contradicted by its own example (AQ 36 at "64" qubits; §22.13 says 36 qubits) — and the rule appears invented. *(Medium.)*
12. **Ch24 §24.7**: GHZ states said to saturate bond dimension 2^{n/2} — GHZ has Schmidt rank 2 across every cut; the canonical MPS-*easy* state. *(Medium, conceptual.)*
13. **Ch24 §24.4**: density-matrix threshold "n = 22 on a large server" = 256 TiB; should be ~16–17 (its own §24.2 ladder, halved; Ch23 agrees). Sanity check 1's "+2 qubits quadruples DM memory" is also wrong (+1 quadruples). *(Medium + Low.)*
14. **Ch31 §31.2**: 1 µGal glossed as 10⁻⁸ g; it is ≈10⁻⁹ g. *(Low, recomputed.)*
15. **Ch35 §35.11**: element distinctness listed under "no asymptotic quantum advantage" — it is a proven polynomial speedup (N^{2/3} vs N), as the book's own §15.6/§17.8 state. *(Low, internal contradiction.)*
16. **Ch36 §36.6**: 10³ Hz × kilosecond = 10⁶ shots, not 10⁷. *(Low, arithmetic.)*
17. **Ch36 §36.7**: Schnorr case study misattributed — Claus-Peter (not "Peter") Schnorr's 2021 *classical* claim vs the Yan et al. 2023 *hybrid* few-hundred-qubit paper are merged into one wrong story, in the chapter teaching claim-checking. *(Medium.)*
18. **App C §C.5**: one-CNOT criterion "c_z = c_y = 0 suffices" is false (the one-CNOT class is exactly (π/4,0,0); partial controlled-phases need two) and contradicts §8.14, which is correct. *(Medium, reference-appendix error.)*
19. **Ch18 §18.1**: thermal population at 15 mK/5 GHz is ~10⁻⁷, not 10⁻⁵ (recomputed; the paragraph's point survives, strengthened). *(Low.)*
20. **Ch27 §27.7**: intercept-resend gives Eve ~50% information (not 25%) at 25% QBER. *(Low.)*

**Cross-chapter numeric/factual inconsistencies (pick one source of truth — recommend Appendix F for hardware numbers):** ion T₁ (Ch20 "10⁴ s" vs Ch22 "seconds"); reset residual (Ch18 10⁻³–10⁻⁴ vs Ch21 1–3%, different unstated assumptions); IonQ AQ and Quantinuum H2 fidelity (Ch22 vs App F); Advantage2 topology (Ch29 §29.1 Pegasus/15 vs §29.3 Zephyr/20 — §29.3 correct); DMRG cylinder width (Ch24 ≲8 vs Ch28 8–12); depolarizing-channel parameterisation (Ch10 p/4-form vs Glossary p/3-form, no reconciliation); Raz–Tal year (Ch17 2019 vs Glossary 2018); Braket vendor list (Ch23 vs Ch26); IBM "utility" narrative told wrongly the same way twice (Ch25 §25.4, Ch36 §36.7) while §36.4 has it right; Pan–Chen–Zhang runtime ("days" §24.11 vs "15 hours" §24.14); KAK exponent sign (§8.14 e^{−i·} vs §C.5 e^{+i·}).

**Code:** all four `examples/` files match their inline listings and their claimed outputs are correct (verified: DJ deterministic '111'; Grover ≈95% = sin²(5θ); GHZ statevector dict; Bell `data.meas`). The book's Qiskit-facing claims are consistently right where they are most dangerous (cx(0,1) ↔ CNOT₂→₁; QFTGate = inverse of book's F_N; Qiskit Pulse removal in 2.0; QPY transport). No code errors found.

## 9. Rendering and GitHub-Markdown findings

The manuscript's rendering discipline is excellent overall: house escaping (`\\\\`, `\\{`, `\\}`, `\\,`, `\\|`) is applied consistently across all 41 manuscript files inspected; display math is set off correctly; kets never appear inside Markdown tables (the Bug-5 policy is obeyed book-wide, including the deliberate bullets-over-tables design of Appendices A/E and the pipe-safe table in Appendix F); `\succeq`, `pmatrix`, and `aligned` constructs used are all GitHub-MathJax-safe; `#P` is consistently guarded in backticks.

Open rendering findings: **(1)** the Historical Prelude uses code-span math instead of LaTeX and has five H1 headings — the one file typographically out of step *(Medium, pre-compaction)*; **(2)** STYLE.md documents only half the escape table the manuscript practices and never links the renderer-bug memo *(Low)*; **(3)** figure coverage is thin in exactly the chapters that need diagrams most — the highest-value additions, in order: surface-code lattice (§19.12), lattice-surgery merge/split (§19.22), filter functions (§18.3), repeater/entanglement-swapping chain (§33.3), plus a BB84 basis table (§27.7) *(Low, completeness)*. All 8 existing figures resolve and carry descriptive alt text.

## 10. Uncertainty ledger (claims flagged for verification, not asserted as errors)

Items the review could not settle from internal evidence and recollection; each should get a `factcheck/` entry. **Resolved during review:** Ch14 §14.1 = Deutsch ✓; Ch7 §7.12 resource framing ✓; Ch2-vs-Ch22 "circuit volume" (terminology mismatch, finding filed); Ch32 checklist — CV/MBQC/bosonic-GKP/T-injection/annealing all present ✓, thermodynamic-free-energy promise only weakly met (finding filed); App A index recipe exists ✓; Ch16 QSVT-slogan source — corroborated as Martyn et al. 2021 by App D's own bibliography (fix §16.7 attribution).

**Still open (chapter: item):** Ch3: "Vienna and Stockholm" freedom-of-choice experiments (Stockholm likely wrong); SPDC rate figure. Ch11: DFE n-independence scope (Flammia–Liu Thm 1); Clifford compilation depth-vs-gate-count. Ch15: "(Miller, Rabin)" reduction attribution; Szegedy mixing-time speedup. Ch16: exact Θ(t + log(1/ε)/loglog(1/ε)) form and BCCKS-vs-BACS lower-bound split. Ch17: Jiuzhang 3.0 year (2023?); Hefei/Wuxi RCS claims; forrelation Ω̃(√N). Ch18: neutral-atom 2q 99.0% staleness. Ch19: T-teleport "two CNOTs"; Willow "order of magnitude" d3→d7; Steane transversal-S dagger; colour-code "medial graph". Ch20: silicon 1q gate times; Quantum Motion 1024-dot; NV "TU Wien". Ch21: "Cirq PulseSchedule"; "Rigetti Lodgepole". Ch22: IBM Heron QV 2^15 (likely never published); Willow-vs-Morvan RCS conflation; QV history dates; "Q-PERFECT"; "H3" (Helios?); H2 QV staleness. Ch23: "pyLIQUi|>" (likely nonexistent); TFQ maintenance status; Qiskit default opt level. Ch24: Fugaku 48q run details; "BlueQubit" as stabiliser sim; Bravyi–Gosset α = 0.396 pairing and 50q/60T demo; Sunway 56-vs-53; "Gao, Anschuetz, Wang, Cirac, Lukin 2024" author-list conflation; Alibaba simulator currency. Ch26: Braket roster. Ch27: QRAM-free collision bound vs CNS 2^{2n/5}; FIPS 206 IPD date; ML-DSA timing. Ch28: Reiher 2017 T-count (expect 10¹³–10¹⁴); "minimal entropic sampling" (METTS garble?). Ch29: Advantage2 ~180-variable clique. Ch30: Hamiltonian-learning author list. Ch33: "QNE-sim"; "BTI Long Island". Ch37: QIP "proceedings". App D: Bravyi–Gosset title; Panteleev–Kalachev title/venue.

## 11. Entertainment and pedagogy (priority 1 and 2 summary)

**The book is genuinely enjoyable to read**, which for a 37-chapter technical manuscript is the hardest and rarest property. The voice is consistent — dry, precise, occasionally aphoristic — and the best lines earn their place by carrying content: "the qubit is paying rent" (Ch9), "noise is just unobserved entanglement" (Ch10), "an instrument vs. a computer" (Ch21), "every vendor benchmark sheet is a small adversarial document" (Ch22), "forgetting to run it does not leak memory, it leaks quantum advantage" (Ch34), "the most reliable thing a quantum computer can learn is something about itself" (Ch30), "readers who keep reaching for the classical metaphor stay surprised forever" (Ch37). Weakest entertainment stretches: the Historical Prelude's long-paragraph density (22 paragraphs over 1500 chars — pre-compaction finding) and parts of Ch20/22's spec-sheet prose, which the strong framing mostly rescues.

**Pedagogical architecture is the book's superpower.** The learning sequence is sound end-to-end (see §6): conventions are fixed once (§4.8, §4.13, §4.16) and then *actually honoured* across 37 chapters — the review verified the QFT sign, endianness mapping, MSB ordering, and conjugate-linear-first inner product at every use site it examined, and found exactly one violation class (Ch7's zero-based labelling, pre-compaction finding). Failure-first sequencing (Ch19's bit-flip-code-amplifies-phase-errors before discretisation; Ch13's demolition-then-rebuild of parallelism) is used deliberately and well. The how-to-read blocks are accurate per-chapter contracts. Sanity checks are well-calibrated and policy-compliant except Ch3 (inline answers, pre-compaction) and Ch19 check 5 (first inline answer since). The three-category QML taxonomy (Ch30), the two-depth-budgets distinction (Ch25), and the interpretations-prime-specific-mistakes inversion (Ch35 §35.7) are original pedagogical contributions that could each anchor a lecture. Deliberate spaced repetition (the same sanity check in Ch16 and Ch36, cross-acknowledged) shows unusual design intent.

## 12. Completeness and project quality (priorities 4 and 6 summary)

**Completeness:** the promised scope is delivered — every TOC-promised topic exists, and the Manuscript Reconciliation Note accurately catalogues the divergences. Genuine gaps found: TF-QKD missing from Ch27's limits discussion (present in Ch33 — needs only a cross-reference); approximate/banded QFT missing from §14.5; symmetry-verification absent from Ch25's mitigation recap (present in Ch18); Ch12's thermodynamic-resource-theory promise only weakly honoured by §32.8; the Index is skeletal (37 terms; needs ~3×); figure count (8) is low for the material, with the five highest-value additions listed in §9. Bibliography (App D) is complete and annotated.

**Project quality:** unusually high. The status-block/progress/index/figure generation pipeline, the renderer-bug memo with live test sheet, the factcheck/ per-section mirror, the Moving-target callout convention, the four runnable examples matching inline listings 4-for-4, and the reconciliation note collectively put this repo well above typical manuscript projects. Deductions: root-directory drafting clutter and the review/-vs-reviews/ ambiguity (§7 non-manuscript entry); STYLE.md gaps (escape table, bridge/sanity-check/status conventions); the planned-outline body of TOC.md as a 700-line historical artifact; Moving-target banners not applied in Ch20/Ch22 (the two most perishable chapters) despite the documented convention and Appendix F's exemplary implementation.

## 13. Prioritized recommendations

1. **Fix the confirmed errors in §8** (est. a few hours of editing; items 1–20 are all local).
2. **Declare Appendix F the single source of hardware numbers** and make Ch20/Ch22/Ch25 defer to it explicitly; reconcile the specific conflicts listed in §8. Add the Moving-target banner to Ch20 and Ch22.
3. **Adopt three lint rules** (extend `scripts/factcheck_lint.py` or add a sibling): (a) status-block section count == `grep -c '^## '` (decide bridge-inclusive or -exclusive once, document in STYLE.md); (b) bridge-section heading style — one of the seven observed variants; (c) sanity-check block style ("Sanity checks before moving on." + no inline answers). The TOC reconciliation note mitigates but does not replace this.
4. **Complete STYLE.md**: full escape table (`\\,`, `\\|`), link the renderer-bug memo, specify bridge/checks/status conventions, settle Arabic-vs-Roman part references (README suggests Roman for canonical lists, Arabic in running prose — either is fine if stated).
5. **Feed §10's uncertainty ledger into `factcheck/`** — roughly 35 open items, most one-lookup checks.
6. **Cross-reference repairs**: Ch19 §5.7→§5.13; Ch12 "Part 12"→Part 11; App C MUB→(drop or retarget); Ch11 §5.11→§5.12; Ch27↔Ch33 TF-QKD link; Ch16 slogan→Martyn et al.
7. **Add the five §9 figures**; expand the Index TERMS list (~3×), harvesting Appendix E headwords.
8. **Repo hygiene**: archive root drafting artifacts; merge `review/` into `reviews/`; consider generating TOC.md.
9. **Wire `scripts/check_examples.py` into `make`/CI** to keep the examples 4-for-4.
10. **One coordinated pass on the IBM-utility narrative** (§25.4, §36.4, §36.7) and the Schnorr/Yan attribution (§15.3, §36.7).

## 14. Review verification statement

Coverage: all 48 planned book files (front matter 3, prelude 1, chapters 1–37, appendices A–F, index) were read in full and reviewed section-by-section in §7, plus the non-manuscript project files at file granularity. Every mathematical claim marked ✓ in §7 was recomputed by hand during this review, not assumed; every finding marked "recomputed" includes the computation's result inline. Claims that could not be verified from internal evidence were routed to §10 rather than asserted. Two review-process corrections are recorded transparently in §7 (the retracted Ch11 variational-reference finding, corrected at Ch14; the Ch27 TF-QKD finding downgraded at Ch33) — the audit trail was preserved rather than rewritten. The review file was written incrementally after each unit and backed up to the remote in 14 commits during the review; no findings were reconstructed from memory. Model: this review was produced by an AI reviewer; certainty labels (certain/high/medium/low) reflect recomputation status and source-recollection confidence respectively, and the §10 ledger explicitly marks what still needs a human or tool-assisted source check.

---

## 15. Remediation log (2026-07-04)

Implemented in five commits on this branch, with per-entry dispositions inserted as insert-only annotations directly under each §7 entry heading (verified: zero deleted/modified lines in this file across all annotation commits, via `git diff --numstat`).

- **b1d9f12** — Batch 1: front matter + Chapters 1–10 (incl. the High Preface-endianness fix, self-check 2I+X, Ch6 double cover, Ch7 relabelling, Ch5 no-signalling + fingerprints, status-count normalization).
- **98e1f45** — Batch 2: Chapters 11–19 (incl. Ch17's false-separation and RSA-number fixes, Ch16 loglog/attribution, Ch14 PE/AE contrast + banded QFT, Ch19's eight fixes).
- **0d569bb** — Batch 3a: Chapters 20–24 (banners + Appendix-F deference, vendor-fact corrections, Ch24 GHZ/volume-law and threshold fixes, tool misattributions).
- **aa7a5a3** — Batch 3b: Chapters 25–29 + first synchronized markers (IBM-utility narrative, TF-QKD paragraph, QKD numeric fixes, Advantage2 topology).
- **Batch 4 commit (this one)** — Chapters 30–37, Appendices A–E, Index (TERMS 51→93, regenerated), STYLE.md completion (escape table, bridge/checks/status/part conventions, Prelude adjudications), remaining markers, this log.
  (Recorded post-commit: batch 4 = **5a1c816**; batch 3b = **aa7a5a3**; the batches-1–3a marker pass = **5060e75**. Every "batch 3b/batch 4 commit" reference in the §7 annotations resolves to aa7a5a3/5a1c816 respectively.)

**Scoreboard against §8's confirmed-error list (items 1–20): all 20 fixed.** Cross-chapter inconsistency list: all fixed except the §32.8 thermodynamics sentence (deferred as a content extension — author choice between adding the sentence or softening Ch12 §12.11). §13 recommendations: items 1, 2, 4 (STYLE portion), 6, 7 (index portion), 9 (verified pre-existing), 10 — done; item 3 (lint rules) — conventions now specified in STYLE.md, lint automation left for tooling pass; item 5 (uncertainty ledger → factcheck/) — open items enumerated in §10 remain routed there; item 7 (figures) and item 8 (repo hygiene) — deferred with reasons in the per-entry annotations.

**Deferred inventory (requires author decision or external sources):** front-matter §1.x/§2.x renumbering scheme; phases.py re-baseline; Prelude paragraph-splitting pass; §4.8 sub-headings; five new figures (§18.3, §19.12, §19.22, §27.7, §33.3); §32.8 thermodynamics sentence; root-artifact archiving and review/-vs-reviews/ merge; all §10 uncertainty-ledger source checks (Hefei/Wuxi, Q-PERFECT, Lodgepole, QNE-sim, BTI, FIPS 206 IPD date, Quantum Motion, TU Wien, Fugaku run details, ~180-variable clique).
