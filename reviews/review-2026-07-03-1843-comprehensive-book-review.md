# Comprehensive Book Review — 2026-07-03 18:43 UTC

## 1. Review metadata

- **Date and time:** 2026-07-03 18:43 UTC
- **Repository:** `ivoitovych/experiments` — *Quantum Computing for Experienced Developers: A Structured Guide from Core Principles to Modern Practice*
- **Branch:** `claude/init-quantum-computing-iaiRN`
- **Commit:** `6aaaaef` (local == origin at review start)
- **Review scope:** the full manuscript under `book/` (48 files, 14,989 lines), reviewed at section/sub-unit granularity; supporting project files reviewed at file granularity. Tooling code was covered by the separate 2026-06-17 code review (`review/code-review-2026-06-17-1840.md`) and is only re-checked here where it touches the reader experience.
- **Reviewer mode:** single-agent comprehensive review (Claude, model `claude-fable-5`).
- **Process note:** findings were written **incrementally** — each file/section review was appended to this document immediately after that unit was reviewed; cross-cutting findings were accumulated in on-disk collectors and merged into §8–§12 at the end. Global synthesis (§2, §5, §6, §13, §14) was inserted after the unit pass completed. The document was lightly normalized at the end.
- **Book description:** a rigorous, engineering-oriented, anti-hype guide to quantum computing for experienced software developers: foundations → qubits/entanglement → gates/circuits → measurement/information → algorithms → complexity → noise/QEC → hardware/software → practice → applications → adjacent models → epistemics. Written in GitHub-flavoured Markdown with native MathJax math as the primary render target; mdBook as secondary. All 48 files at status `draft`.

## 2. Executive summary

<!-- EXEC-SUMMARY -->

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

<!-- GLOBAL-ASSESSMENT -->

## 6. Concept-dependency and learning-sequence review

<!-- CONCEPT-DEPENDENCY -->

## 7. Section-by-section review

*(Units appear in reading order. Format per file: overall assessment + per-section notes + findings table. Severity: Critical/High/Medium/Low/Nit. Certainty: certain/uncertain.)*


---

### File: `book/00-front-matter/00-preface.md` (406 lines, 12 sections)

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
