# Deep Analysis — State of the Project and the Path to Publication

**Date:** 2026-07-05
**Scope:** A consolidated strategic analysis across every open ledger in the project — the
review/remediation/verification chain, the deferred-items and proposals reports, the
factcheck programme analysis, and the external-review triage — answering three questions:
*where exactly does the project stand, what precisely remains between here and the author's
stated goal (publishing the book as its own repository at a serious degree of completeness),
and in what order should the remaining work run?*

---

## 1. Where the project stands (measured today)

| Measure | Value |
|---|---|
| Manuscript | 48 files, **~224,000 words** (≈ 700–800 print pages), 19 figures, 93-entry index |
| Status | 48/48 at `prereviewed` under documented criteria (PROCESS.md) |
| History | 281 commits; full review → remediation → external-verification chain recorded in 7 reports under `reviews/` |
| Verification debt | 1,176 open factcheck entries; **97 stale anchors**; 8 files carry Moving-target banners (the `final` gate) |
| Known content debt | 1 approved-pending edit (R5, Ch. 7 no-cloning signpost); 1 live internal contradiction (Appendix F vs. §22.9 AQ figure) |
| Tooling debt | 2 designed-but-unbuilt lint rules (P4); rendering spot-check outstanding (P6) |
| External dependency | 0 independent expert reviews; author start-to-end read not yet done |
| Repo hygiene | 3 obsolete `claude/*` branches await author deletion; default branch still `empty` |

The qualitative position: **the manuscript is content-complete and internally hardened; every
remaining work item is verification, external validation, or logistics.** Nothing left on any
ledger changes what the book says at more than sentence scale. That is an unusual and
valuable position — the remaining work is all *confidence-building*, which parallelises and
schedules cleanly.

## 2. The consolidated open-item inventory

Every open item across all ledgers, deduplicated, with its source:

**Content (sentence-scale):**
- **C1** — R5: §7.12 no-cloning signpost sentence (external-review Part D; verified gap;
  text drafted). *S.*
- **C2** — O5/O6/O8: closed with recorded triggers; not work, listed for completeness.

**Verification (the bulk):**
- **V1** — Factcheck Phase 0: anchor checker into `make lint` (warn mode), dashboard,
  12 blank verdicts. *S.*
- **V2** — Factcheck Phase 1: repair the 97 stale anchors. *S–M.*
- **V3** — Factcheck Phase 2: fold in the 44 external verdicts + credit the review's inline
  recomputations (~100–160 closures). *S–M.*
- **V4** — Factcheck Phase 3: offline sweep — ~150–215 derivation/convention entries. *M.*
- **V5** — Factcheck Phase 4: external sweep — ~850–900 web-verified entries. *L serial
  (12–18 sessions) or M fanned (3–5 waves).*
- **V6** — Factcheck Phase 5: 10% adversarial QA re-audit. *S–M.*
- **V7** — P3: Appendix F wholesale July-2026 refresh (web-verified; resolves the AQ
  contradiction). *M.*

**Tooling / presentation:**
- **T1** — P4: Bug-5 table-cell lint rule + anchor-fragment link checker. *S+M.*
- **T2** — P6: GitHub-rendering spot-check of the July additions + a `\|`-in-table row in
  the render-test sheet. *S.*

**External validation (calendar-bound, author-driven):**
- **E1** — Targeted per-chapter expert review (PROCESS.md list: Ch. 16, 19, 20–22, 30, + one
  of 28/29). The only path to `reviewed`. Lead-time-dominated: finding willing experts takes
  weeks-to-months regardless of manuscript readiness.
- **E2** — Author start-to-end read. The author's own stated precondition for calling
  anything more than internally reviewed.

**Publication logistics (mostly author actions):**
- **L1** — Delete the 3 obsolete `claude/*` branches (GitHub UI; the pre-rewrite backups
  still expose the old attributed history publicly).
- **L2** — R3: ND-license mitigation sentence, at publication.
- **L3** — Separate public repository; then GitHub Pages / EPUB / visibility (all
  deliberately deferred to publication).
- **L4** — Backlog, explicitly not publication-gating: extending runnable examples; further
  figures.

## 3. Dependency analysis and the critical path

Three structural observations drive the ordering:

**(a) The calendar-critical path is E1, not V5.** The factcheck sweep is effort-bound —
it finishes when the sessions are spent. Expert review is *lead-time*-bound: recruitment,
handoff, and waiting dominate, and none of it compresses. Every week E1 starts later is a
week added to the end date. Therefore: **initiate expert-review recruitment before the
verification sweep finishes** — but hand each expert a chapter whose factcheck file is
already closed, so their time is spent on judgment rather than typo-hunting. This creates
the one hard sequencing constraint: *fact-check the E1 target chapters first.*

**(b) The E1 target chapters are mostly the Tier-C perishable ones** (16, 19, 20–22, 30 —
exactly where verification is hardest and staleness fastest). Fusing V7 (Appendix F refresh)
with the Tier-C factcheck batch for Ch. 20–22 produces one dated source-set, one restamp,
and expert-ready hardware chapters in a single work block. This inverts my earlier
"theory-first" sweep recommendation — the expert-review lead time outranks the
bulk-first economics.

**(c) Drift repair gates everything.** The 97 stale anchors mean any verification performed
today against the mirror files partially wastes effort; V1+V2 are small and unblock all of
V3–V6. Similarly, C1 and T1/T2 should land *before* the big sweep so the manuscript and
tooling are stable underneath it.

The resulting dependency chain:

```
[C1, T1, T2, V1]  →  [V2, V3]  →  [V7 + Tier-C batch (E1 chapters)]  →  E1 handoff
   (stabilise)      (de-drift)        (expert-ready chapters)             (calendar clock starts)
                                                        ↘
                                            [V4, V5 remainder, V6]  (runs during E1 wait)
                                                        ↘
                             [E2 author read]  →  [L2, L3 publication]
[L1 branch deletion] — independent, do immediately (author, 2 minutes)
```

## 4. Risk register

1. **Perishability treadmill** — hardware numbers verified early go stale before
   publication. *Mitigation:* Tier-C verified once in the fused V7 batch, restamped
   "as of July 2026", and re-checked only in a final pre-publication restamp; the
   card system's verdict/freshness split is designed for exactly this.
2. **Anchor drift compounds** — every future edit silently invalidates verification.
   *Mitigation:* V1 wires the checker into `make lint`; the same-commit card-touch rule is
   already written into the programme analysis.
3. **Expert recruitment stalls** — the genuinely uncontrollable item. *Mitigation:* start
   now (E1 recruitment can precede chapter readiness); scope asks small (one chapter, a
   defined checklist, the factcheck file as evidence); have the "depth probe" chapter
   (28/29) double as a test of reviewer engagement.
4. **Confabulated confirmation in the sweep** — a false "verified" is worse than "open".
   *Mitigation:* protocol already fixed (URL + verbatim quote or explicit caveat; V6
   adversarial re-audit of a 10% sample).
5. **Scope creep** — examples, figures, new sections. *Mitigation:* L4 is explicitly
   non-gating; the O5/O6/O8 trigger discipline generalises: new ideas get logged, not done,
   until after publication.
6. **Residual attribution exposure** — the obsolete branches still publish the pre-rewrite
   history. *Mitigation:* L1 is a two-minute author action; do it first.

## 5. Milestones

- **M0 — Stabilise (1–2 sessions, plus two author minutes).** C1 (R5 sentence), T1 (two lint
  rules), T2 (render spot-check + test-sheet row), V1 (plumbing). Author: L1 (delete the
  three branches), optionally flip the default branch. Exit: manuscript stable, tooling
  complete, drift visible.
- **M1 — De-drift and harvest (2–3 sessions).** V2 (97 anchors), V3 (~100–160 closures from
  work already done). Exit: every verdict in the mirrors is anchored to current text; open
  count drops below ~1,000 with zero new research.
- **M2 — Expert-ready (2–4 sessions).** V7 fused with the Tier-C factcheck batch for the E1
  chapters (16, 19, 20–22, 30, + 28/29 probe). Exit: Appendix F current and
  contradiction-free; the seven E1 chapters have closed factcheck files; **E1 handoff
  happens here** and the calendar clock starts.
- **M3 — Verified (the bulk; runs during the E1 wait).** V4, then V5 for all remaining
  chapters (serial 12–18 sessions, or 3–5 fanned waves on explicit opt-in), then V6 QA.
  Exit: zero open entries book-wide; Moving-target banners clearable; chapters eligible for
  `final` as expert feedback lands.
- **M4 — Publish.** E2 (author read), incorporate E1 feedback (`reviewed` per chapter),
  clear banners (`final`), L2 license sentence, L3 separate repository + Pages/EPUB +
  visibility. The external review's positioning paragraph is ready-made launch testimony.

Total effort within this session's control: roughly **20–30 serial sessions, or 8–12 with
fan-out on V5** — plus the uncontrollable E1/E2 calendar.

## 6. Recommendations (summary)

1. **Do M0 now** — everything in it is approved-or-mechanical, and it includes the two-minute
   author action (L1) whose delay actively costs (the attributed history stays public).
2. **Invert the sweep order**: Tier-C/E1 chapters first (fused with the Appendix F refresh),
   *because expert-review lead time is the critical path* — not theory-first as previously
   recommended. This is the one material change to the P1 plan.
3. **Start expert recruitment immediately** (E1) — it needs no manuscript readiness to
   *begin*, only to *hand off*, and it is the longest pole. Scope each ask to one chapter
   plus its closed factcheck file.
4. **Decide the publication bar explicitly** (proposed): all 48 files `final`; OR the weaker
   defensible bar — all files fact-checked (`open` = 0), E1 chapters `reviewed`, banners
   restamped at publication date. The weaker bar trades ~nothing in reader-facing honesty
   (statuses stay truthful per file) and may pull publication in by months.
5. **Keep L4 (examples, extra figures) out of the gate** — post-publication improvements to
   a living document, which the book already declares itself to be.
6. Pending author decisions, restated: V5 pacing (serial / fan-out / hybrid);
   refuted-claim handling in the sweep (paired-commit autonomy vs. batched approval);
   the publication bar (rec. 4); and E1 recruitment, which only the author can do.
