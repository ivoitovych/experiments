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

---

### File: `book/part-03-qubits/06-the-qubit.md` (480 lines, §6.1–§6.11)

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

**Overall.** A dense, precise gate chapter with real research-hygiene: inline citations (Barenco 1995, Shi/Aharonov 2003, Dawson–Nielsen, Ross–Selinger), an explicit Moving-target warning on §8.12's vendor content, and the sharpest treatment in any textbook I know of the **two Solovay–Kitaev exponents** (generic `c ≈ 3.97` vs Ross–Selinger's `c ≈ 1` for Clifford+T z-rotations — explicitly warned not to be confused). Verified: `Y = iXZ` ✓; `S = √Z`, `T = ⁴√Z` ✓; rotation matrices ✓; `CZ = (I⊗H)·CNOT·(I⊗H)` ✓; SWAP = 3 CNOTs ✓; Barenco ancilla-cost taxonomy ✓; Toffoli 6-CNOT/7-T/2-H decomposition ✓; KAK Weyl-chamber CNOT-cost classification incl. iSWAP at `(π/4, π/4, 0)` on the `c_z = 0` face ✓ (the documented fix is intact); parameter-shift rule ✓; §8.3's operator-conjugation-vs-measurement-procedure disambiguation (one `H`, not two) ✓. All 6 figures exist with descriptive alt text ✓. Status block 14/14 — **correct** (first fully consistent count).

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Medium | mathematical/pedagogy | §8.14 sanity check 3 (~line 213) | The exercise correctly derives `R_Y(π)|0⟩=|1⟩`, `R_Y(π)|1⟩=−|0⟩`, then asserts "(The phases are physically harmless because `R_Y(π)`, like every gate, is fixed only up to a **global** phase.)" — **wrong justification**: `R_Y(π) = XZ` (up to phase), which differs from `X` by a *relative* sign. On the superposition `|+⟩`, `R_Y(π)|+⟩ = −|−⟩` while `X|+⟩ = |+⟩` — physically different states. The phases are harmless only when the *input is a basis state* (each branch's phase is then global); the parenthetical teaches the exact misconception §4.15 trap 2 warns against. | Rephrase: "harmless when the input is a computational-basis state; in superpositions the sign is a relative phase and `R_Y(π)` is genuinely different from `X`." Local — and pedagogically valuable as stated correctly. | certain (recomputed) |
| Nit | consistency | §8.9/§8.12/intro | "Part 8", "Part 9", "Part 6" in Arabic numerals (global Arabic-vs-Roman inconsistency already logged at Ch 1). | Normalize book-wide. | certain |

**Entertainment:** strong for a matrix-heavy chapter — the T-count economics of §8.4/§8.10 give the reader stakes; "open Appendix B alongside it" is honest. **Pedagogy:** the mandatory/deferrable triage is accurate. **Sanity checks:** 5, policy-compliant (tally: Ch 8 ✓). **Rendering:** clean; heavy `pmatrix` use all in display blocks with proper `\\\\`.

---

### File: `book/part-04-gates-and-circuits/09-quantum-circuits.md` (162 lines, §9.1–§9.14)

**Overall.** "Gates are the alphabet; circuits are the sentences" — and the chapter delivers the working grammar: ancillae ("the qubit is paying rent"), uncomputation with the correct right-to-left `U†∘copy∘U` operator order (documented fix intact ✓), the deferred-measurement principle stated with the exactly-right caveat ("the equality is statistical, not state-by-state") ✓, magic-state T-correction correctly identified as a Clifford `S`, not a Pauli ✓, the Pauli-frame idiom ✓, and honest platform snapshots under a Moving-target warning. Sanity checks recomputed: SWAP-count-2 on the linear chain ✓, rotation merge to `R_Z(π/8)` ✓. GHZ depth claims (`Ω(n)` NN vs `O(log n)` all-to-all) ✓. Both figures exist; the GHZ alt text even documents its own depth caveat ✓.

**Findings.**

| Severity | Category | Location | Problem | Recommendation | Certainty |
|---|---|---|---|---|---|
| Low | consistency | status block | 13/13 vs 14 `##` sections — 7th count-drift instance. | Fix (see global lint-rule recommendation). | certain |
| Low | sequence | §9.1 (~22) | Endianness discussion attributed to "Chapter 7" twice — but the book's full treatment is **§4.8**, and Ch 7 is precisely where the deviant zero-based labeling crept in (see Ch 7 finding). Pointing readers at Ch 7 for the convention compounds that problem. | Cite §4.2/§4.8 instead. Also verify the claimed "Appendix A index-conversion recipe" exists (checked at App A below). | certain |

**Entertainment:** good; the engineering-reality thread (feedforward latency vs kernel round-trips, rent-paying ancillae) keeps a plumbing chapter alive. **Pedagogy:** §9.4/§9.5's garbage discipline is the best practical treatment of uncomputation I've seen at this level; the "two faces" of deferred measurement (theory tool vs engineering anti-pattern) is exactly the kind of judgement the book promises. **Rendering:** clean.

### book/part-04-gates-and-circuits/10-core-quantum-phenomena.md (Chapter 10, 273 lines, 14 H2 sections)

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
