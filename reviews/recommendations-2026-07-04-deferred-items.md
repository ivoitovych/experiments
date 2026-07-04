# Recommendations — Remaining Deferred Items

**Date:** 2026-07-04
**Scope:** Every item still open after the 2026-07-04 remediation and external-verification
passes. Two groups: **D1–D9**, the deferred author-decision / backlog items from the
comprehensive review's §15 inventory, and **O1–O8**, the optional tightenings the external
verification report recorded but deliberately did not apply. Each item below gets: the facts
as verified in the repository today, the options, the trade-offs, and a concrete
recommendation with an effort estimate (S ≈ under an hour, M ≈ a few hours, L ≈ a day or
more).

**Nothing in this report changes the manuscript.** It is a decision aid; each recommendation
names the exact edit or task so any item can be executed on approval without re-analysis.

---

## Part I — Deferred author-decision items (D1–D9)

### D1. Front-matter §1.x/§2.x renumbering

**Facts.** `01-background-and-self-check.md` numbers its sections `## 1.1`–`## 1.7` (plus a
`### 1.3.1 Complex Numbers` sub-heading and sample problems numbered 1.1.1–1.5.x);
`02-notation-and-conventions.md` uses `## 2.1`–`## 2.7`. These collide with Chapter 1's and
Chapter 2's own `§1.x`/`§2.x` sections. A live ambiguity exists: Chapter 10 (line 19) says
"the popular version is misleading on its own (cf. §1.2)" — a reader cannot tell whether that
points at Chapter 1 §1.2 or the front-matter's "1.2 Required: Mathematical Maturity".
Repo-wide grep finds only this one ambiguous external reference; the sample-problem numbers
are referenced only within the front matter itself (they are load-bearing there — the
remediation's own §1.3.1 identity fix cites them).

**Options.**
(a) Leave as-is — zero cost, keeps the one known ambiguity and invites more as the book gains
    readers who cite it.
(b) Strip numbers from the front-matter H2s — cheapest fix, but the sample-problem numbering
    (1.3.4 etc.) would dangle without section anchors, and problems are cross-cited in the
    self-check answer discussions.
(c) Re-prefix: background file → `SC.1`–`SC.7` (problems `SC.1.1` …), notation file →
    `N.1`–`N.7`. Unambiguous forever; touches every internal anchor/reference in two files
    plus any inbound links.

**Recommendation: (c)**, with a scripted pass: rename headings, `sed`-update the internal
problem references, then grep-verify no `§1.x`/`§2.x` reference anywhere in `book/` still
intends the front matter (fix the Chapter 10 `cf. §1.2` explicitly — from context it means
the front-matter maturity section, so it becomes `cf. §SC.2` or is reworded inline).
**Effort: M. Priority: medium-low** — the collision is real but has produced exactly one
ambiguous citation in 48 files.

### D2. Phase-number sync (`phases.py` re-baseline)

**Facts.** `scripts/phases.py` maps each file to writing phases 1–6 ("Foundations" …
"Orientation, epistemics, closure"); every status block embeds `**Phase:** N`;
`scripts/generate_progress.py` parses them into PROGRESS.md. All 48 files are at `draft`, so
Phase now records *historical writing order* — internally consistent, but semantically stale:
it describes how the book was written, not what happens next.

**Options.**
(a) Declare Phase historical: one sentence in STYLE.md ("**Phase** records the original
    writing-plan phase and is retained as historical metadata") — zero churn.
(b) Re-baseline to revision phases (R1 = reviewed, R2 = fact-checked, R3 = final): honest
    forward-looking semantics, but rewrites 48 status blocks and `phases.py`, and duplicates
    what **Status** (draft/reviewed/final) already expresses.
(c) Drop Phase from status blocks entirely: clean, but destroys harmless provenance and
    touches 48 files for cosmetic gain.

**Recommendation: (a)** now; revisit (b) only if a structured multi-pass revision cycle
actually starts — at which point *Status* granularity (`draft → reviewed → final`), not
Phase, is still the better vehicle. **Effort: S. Priority: low.**

### D3. Historical Prelude paragraph-splitting pass

**Facts (re-measured today).** 24 paragraph blocks exceed 1,500 characters. The longest
*prose* paragraph is the §0.12 Shor block at ~3,150 chars; the 5,985-char outlier is a
bullet-list block (platform survey) that reads acceptably as a list. The heavy blocks cluster
exactly where cognitive load peaks: Born rule, Heisenberg, von Neumann, threshold theorem,
below-threshold 2024–25, Shor's four steps. This is the **only Medium-severity finding left
open** from the review. The review's own note: splitting deletes nothing and is compatible
with the book's no-deletion verification discipline.

**Options.**
(a) Full split pass: break every >1,500-char prose paragraph at its internal seams (numbered
    steps, "But…"/"The result…" pivots, dated transitions). ~20 splits.
(b) Top-five-only pass (Shor, threshold theorem, below-threshold, von Neumann, Born).
(c) Leave for an external-editor pass.

**Recommendation: (a)**, executed as a *whitespace-only* commit: insert blank lines at seams,
change zero words. That property is machine-checkable — `git diff --word-diff` must show no
word changes — which preserves the chapter's heavily-verified status. Follow with one manual
read-through for rhythm. **Effort: M (2–3 h). Priority: high** — highest remaining
reader-facing win.

### D4. §4.8 (Tensor Products) internal sub-headings

**Facts.** §4.8 runs 239 lines with no internal structure — the longest unbroken section in
the formalism chapters, and the single most-referenced section in the book (endianness,
ordering conventions, Kronecker mechanics all live here).

**Recommendation: apply.** Insert three or four *unnumbered* `###` sub-headings (the
front matter already establishes `###` sub-use): *Definition and basic properties* /
*Kronecker-product mechanics* / *Product vs. entangled states* / *Dimension counting and
ordering conventions*. Unnumbered H3s don't disturb the `## N.x` numbering, the status-block
section count (which counts `## N.x` only, per STYLE.md), or any existing cross-reference.
**Effort: S. Priority: medium** — cheap, and it improves the book's most-visited page.

### D5. §32.8 thermodynamic-resource-theory sentence

**Facts.** Ch. 12 §12.11 promises: "**thermodynamic free energy** (briefly, in Chapter 32)".
§32.8 (Reversible Classical Computing) covers Landauer's $k_B T \ln 2$ and Bennett
reversibility but never casts free energy as a *resource theory*, which is what §12.11's
list is about (coherence, magic, free energy as resource theories with free states/operations).

**Options.** (a) Add two sentences to §32.8 completing the promise; (b) soften §12.11's
pointer.

**Recommendation: (a).** Suggested insertion at the end of §32.8's Landauer paragraph:

> "Landauer's bound is also the seed of a full **resource theory of thermodynamics**: take
> thermal (Gibbs) states as the free states and energy-conserving 'thermal operations' as the
> free operations, and the resource that remains is *athermality* — out-of-equilibrium free
> energy, consumed whenever a bit is erased. This is the thermodynamic member of the
> resource-theory family catalogued in §12.11, with the same free-states/free-operations/
> conversion-rates structure as entanglement under LOCC."

This is standard, uncontroversial material (thermal-operations framework,
Brandão–Horodecki–Oppenheim line) and extends no experimental claim. **Effort: S.
Priority: medium** — closes the book's one remaining broken internal promise.

### D6. Five missing figures

**Facts.** The figure pipeline exists and works (`figures-src/generate_figures.py`, 15
committed circuit SVGs, `make figures`). The review's ranked wish-list: surface-code lattice
(§19.12), lattice-surgery merge/split (§19.22), filter functions (§18.3), repeater/
entanglement-swapping chain (§33.3), BB84 basis table (§27.7). These are *not* all the same
kind of artifact:

| Figure | Kind | Pipeline fit | Effort |
|---|---|---|---|
| BB84 basis table (§27.7) | Markdown table, not a figure | none needed | S |
| Repeater chain (§33.3) | block diagram | matplotlib patches or hand-SVG | S–M |
| Filter functions (§18.3) | line plot | new matplotlib-plot function in the generator | M |
| Surface-code lattice (§19.12) | custom lattice drawing | new drawing code, needs care to match conventions | M–L |
| Lattice surgery (§19.22) | custom two-panel drawing | same machinery as the lattice | M–L |

**Recommendation: phase it.** Batch 1 (S): add the BB84 table inline — it delivers the §27.7
value with zero pipeline work. Batch 2 (M): repeater chain + filter-function plot, extending
`generate_figures.py` with a plot-type entry (matplotlib is already a dependency). Batch 3
(M–L): surface-code lattice then lattice surgery, sharing one lattice-drawing helper —
these two are the highest pedagogic value and justify the drawing code. Keep each figure's
alt-text discipline. **Total effort: ~1–2 days spread across three commits.
Priority: medium.**

### D7. Root-artifact archiving and `review/` → `reviews/` merge

**Facts.** Ten legacy drafting artifacts (~450 KB) sit in the repo root: `chapter0_attempt1–4.md`,
`chapter_0_review_1–4.md`, `historical_chapter__new_attempt_1.md`,
`historical_chapter__unified_opinion_1.md`, plus `review-2026-05-29-0144.md` and
`review-2026-05-30-0356.md`. HISTORY.md references these filenames 6 times (PROCESS.md and
README.md: zero). Separately, `review/` (one file: `code-review-2026-06-17-1840.md`) and
`reviews/` (the two 2026-07 reports) coexist.

**Recommendation: apply, in one commit.**
1. `mkdir archive/` with two subfolders: `archive/chapter0-drafts/` (the eight chapter-0
   artifacts) and `archive/reviews-2026-05/` (the two May reviews); `git mv` everything
   (preserves blob history and blame).
2. `git mv review/code-review-2026-06-17-1840.md reviews/` and delete the empty `review/`.
3. Update the six HISTORY.md path mentions to the new locations — updating *link targets* in
   a narrative document does not falsify the narrative; add one insert-only line in HISTORY
   noting the 2026-07 archival so provenance is explicit.
4. Add a 5-line `archive/README.md` stating these are frozen working artifacts, superseded by
   `book/` and `reviews/`.

**Effort: S (~30 min). Priority: high** — the biggest repository-cleanliness win per unit
effort, and it removes the "which review directory is real?" trap for every future
contributor.

### D8. TOC.md planned-outline body

**Facts.** TOC.md is 788 lines: a reconciliation note (added 2026-05-24, declaring `book/`
the source of truth) followed by the *original planned* section outline, which no longer
matches delivered section numbering (bridges, renumbering, added sections).

**Options.** (a) Keep as-is (the note already disarms it); (b) generate TOC.md from delivered
headings; (c) generate TOC.md *and* move the plan to `archive/plan-original-toc.md`.

**Recommendation: (c).** A `scripts/generate_toc.py` in the mold of `generate_index.py` /
`generate_progress.py` (walk `book/`, emit chapter + `## N.x` heading lists with links),
wired into the Makefile; the historical outline moves to `archive/` in the same commit as D7.
Then TOC.md is always true by construction, and the plan survives as history. README's own
chapter table stays the reader-facing TOC; generated TOC.md becomes the section-level one.
**Effort: M. Priority: medium-low** — do it together with D7 to touch HISTORY once.

### D9. Lint automation for the adjudicated conventions

**Facts.** `tools/lint.py` is cleanly extensible (per-file check functions over stripped
content; existing checks: math blocks, nested display math, inline LaTeX envs, list-marker
continuation, README link check). The 2026-07-04 STYLE.md additions specify conventions that
are currently enforced only by discipline: status-count rule, bridge-section form,
sanity-check form, part-numeral consistency, escape table.

**Recommendation: implement four deterministic rules now, defer one.**
1. **Status-count check**: parse `Sections drafted: k / M`; assert `k == M ==` count of
   `^## N\.` headings (front-matter files: count all H2s; Prelude: known exception list per
   STYLE.md). Zero-false-positive by construction.
2. **Bridge check**: the last `## N.x` heading either contains "Bridge to Chapter" or the
   file is in the documented merged-bridge allowlist (22, 27, 30–32, 35 + the five
   no-bridge chapters 8, 19, 23, 34, 36).
3. **Sanity-check form**: flag any `^#{1,6}.*[Ss]anity [Cc]hecks` heading (must be the bold
   run-in paragraph form).
4. **Part-numeral consistency**: within one file, flag the presence of both `Part [IVX]+` and
   `Part [0-9]+` (STYLE.md: don't mix styles in one file).
5. *(Defer)* **Escape-table check** (single `\,`/`\|`/`\{` inside `$...$`): genuinely useful
   but needs a real math tokenizer to avoid false positives in code spans and tables — ship
   it later behind a `--warn` flag.

**Effort: M (2–3 h including running against all 48 files and fixing any drift it finds).
Priority: high** — this converts the remediation's conventions from "was true on 2026-07-04"
into "stays true", which is the cheapest insurance the project can buy.

---

## Part II — Optional tightenings from the external verification (O1–O8)

These were verdict-adjacent refinements, not errors. Recommended disposition: **apply five as
one small batch commit (O1–O4, O7), skip three (O5, O6, O8)** with reasons recorded here.

### O1. Quantum Motion "1024-dot" precision (Ch. 20) — **APPLY**
Current text is accurate but a reader can take 1024 as an operating-qubit count. Change to
"Quantum Motion's 1024-dot CMOS-integrated characterisation chip (with GlobalFoundries)".
One clause; prevents the most likely misreading. (S)

### O2. SPDC rate hedge (Ch. 3) — **APPLY**
"Thousands per second per milliwatt" sits at the optimistic edge for the classic BBO
"textbook configuration" (detected rates ≲140/s/mW classic, 10⁴–10⁵ modern). Replace with:
"at rates from hundreds of detected pairs per second per milliwatt for the classic BBO
configuration to hundreds of thousands for modern optimized sources". Accuracy, and the
spread itself is instructive. (S)

### O3. Qiskit default optimization-level version pin (Ch. 23) — **APPLY**
"Recent releases moved the default to level 2" → "(the default moved to level 2 with
Qiskit 1.3, late 2024)". A dated fact ages better than a vague one; verified against the
Qiskit 1.3 release notes and current source. (S)

### O4. FIPS 206 process phrasing (Ch. 27) — **APPLY**
"IPD submitted August 2025" conflates two steps. Correct sequence: draft *submitted for
approval* August 28, 2025; public IPD released autumn 2025. Rephrase both occurrences
(lines 72 and 87) accordingly. Standards-process precision matters in a crypto chapter. (S)

### O5. Reiher 0.1 mHa footnote (Ch. 28) — **SKIP**
The book quotes ~10¹⁴ T gates for the standard 1 mHa ("qualitatively accurate") serial case,
which is the commonly cited figure and matches the paper's Table I. The surrounding text does
not claim strict chemical accuracy, so the ~10¹⁵ (0.1 mHa) footnote adds specialist detail
without correcting anything. Revisit only if the passage ever says "chemical accuracy".

### O6. Steane "up to Pauli corrections" removal (Ch. 19) — **SKIP**
Verification showed $S^{\otimes 7}$ implements logical $S^\dagger$ exactly (no Pauli
correction needed), so the phrase is superfluous for the Steane code specifically — but it is
not false ("up to" includes the identity), and it correctly primes the reader for codes where
transversal gates *do* need Pauli fix-ups. Removing it buys nothing and could invite
over-generalization the other way.

### O7. Alibaba "Tai Zhang" naming (Ch. 24) — **APPLY**
"Alibaba's simulator effort" → "Alibaba's 'Tai Zhang' simulator effort". One proper noun;
makes the historical reference findable. Batch with O1–O4. (S)

### O8. Clifford depth Θ(n/log n) refinement (Ch. 11) — **SKIP**
The book's "depth O(n)" is a correct, achievable bound (Maslov–Roetteler 2018, and it holds
even on linear-nearest-neighbour hardware). The Θ(n/log n) all-to-all optimum (Maslov–Zhang
2022) is a tightness result for a connectivity model the passage isn't discussing. The
audience gains nothing; the sentence would grow a qualifier chain.

---

## Suggested execution order

1. **Quick-wins commit** — O1, O2, O3, O4, O7 (five one-line edits) + D5 (two sentences).
   Effort: S. Immediately closes the last internal-promise gap and all worthwhile
   verification tightenings.
2. **Repo-hygiene commit** — D7 (archive + review-dir merge), optionally folding in D8's
   plan-file move. Effort: S–M.
3. **Lint commit** — D9 rules 1–4, plus fixing whatever drift they catch. Effort: M.
4. **Prelude split commit** — D3, whitespace-only, machine-verified no-word-change.
   Effort: M.
5. **§4.8 sub-headings** — D4. Effort: S.
6. **Figures, three batches** — D6 (BB84 table → repeater/filter plots → surface-code pair).
   Effort: ~1–2 days total.
7. **Front-matter renumbering** — D1 (SC.x/N.x), after D9's lint is in place to catch
   stragglers. Effort: M.
8. **TOC generation** — D8 script. Effort: M.
9. **Phase semantics** — D2, one STYLE.md sentence (can ride along with any commit above).

Items 1–3 are unambiguous wins and could proceed on a single approval; items 4–8 each touch
verified content or add generated artifacts and deserve individual sign-off; item 9 is
bookkeeping.

---

## Execution log (2026-07-04, insert-only)

- ✅ **Step 1 (this commit): quick wins** — O1 (Quantum Motion characterisation-chip precision, Ch20), O2 (SPDC rate range, Ch3), O3 (Qiskit 1.3 version pin, Ch23), O4 (FIPS 206 two-step process phrasing, Ch27 ×2), O7 (Alibaba "Tai Zhang", Ch24), D5 (§32.8 thermodynamic resource-theory paragraph closing the §12.11 promise). O5/O6/O8 skipped as recommended.
- ✅ **Step 2 (this commit): D7 repo hygiene** — 12 root artifacts moved to `archive/chapter0-drafts/` and `archive/reviews-2026-05/` via `git mv`; `review/code-review-2026-06-17-1840.md` merged into `reviews/`; `archive/README.md` added; insert-only archival note appended to HISTORY.md (prose filename mentions left intact — they are historical narrative, not links).
- ✅ **Step 3 (this commit): D9 lint automation** — four deterministic rules added to `tools/lint.py` (status-count vs numbered-H2 count; bridge-or-adjudicated-exception; sanity-checks-as-run-in; no mixed Roman/Arabic part numerals). The rules caught and this commit fixes real drift: Ch21 status count 16/16 → 15/15 (15 numbered sections); Ch35 §35.14 heading de-conflated to "Bridge to Chapter 36" (the compliant run-in already existed inside); Ch37's "## 37.9 Sanity Checks…" heading converted to the bold run-in form (status 9/9 → 8/8). STYLE.md's bridge bullet corrected to the true adjudicated set (merged: 2, 22, 24, 25, 27, 29–32; bridge-free by design: 8, 19, 23, 34, 36, Prelude, 37) and now cross-binds to the lint allowlist. PROGRESS.md regenerated. Escape-table rule deferred as recommended.
- ✅ **Step 4 (this commit): D3 Prelude paragraph splitting** — all 22 over-long prose paragraphs split at sentence-boundary seams (20 scripted + 2 manual for bold-led seams); zero prose paragraphs above 1,500 chars remain (max now 1,475). Machine-verified whitespace-only: the pre- and post-split word streams are byte-identical after whitespace normalisation (`diff` of `tr -s ' \n\t'` outputs). Lint and build selftest pass.
- ✅ **Step 5 (this commit): D4 §4.8 sub-headings** — four unnumbered `###` sub-headings inserted in §4.8 Tensor Products (*Kets, indices, and ordering conventions* / *Inner products and operators* / *Product vs. entangled states* / *The partial trace*). Status counts and cross-references unaffected (STYLE.md counts `## N.x` only). Lint clean.
