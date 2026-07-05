# Deep Analysis — The `factcheck/` Verification Programme (P1)

**Date:** 2026-07-05
**Scope:** Full analysis of the claim-level verification programme: system anatomy, measured
state (including a drift audit run today), cost model, quality risks, my opinion on how much
of it is worth doing and when, and a phased execution proposal. Supersedes the P1 section of
[proposals-2026-07-05-remaining-programmes.md](proposals-2026-07-05-remaining-programmes.md).

---

## 1. What the system actually is

Two generations coexist by design (CARD-SPEC.md, *Migration status*):

- **v1 mirror entries** (the 52 seeded files): `Claim (anchor) / Method / Source / Verified /
  Verdict` per significant claim, in section order, one mirror file per chapter file. Checked
  by `scripts/factcheck_anchors.py`, which greps each quoted anchor against the mirrored
  chapter (normalised) and reports stale anchors.
- **v2 cards** (CARD-SPEC.md + `_template.md` + `_pilot.md`): seven labelled fields (Claim,
  Exact text, Context, Clarity, Status, Evidence, Last checked); verdict enum
  `unverified / verified / refuted / depends`; **freshness is a separate, linter-computed
  axis** — a `verified` card whose Exact text drifts becomes *verified-but-stale* rather than
  losing its verdict (the regression-test mindset). `scripts/factcheck_lint.py` enforces
  structure, the verified⇒clear-and-evidenced gate, the never-invent-a-quote rule, and
  staleness, and has a `--dashboard` mode.

The v2 spec is genuinely good — the verdict/freshness separation, the placeholder-quote rule
("a plausible-looking fake quote in a verification record is precisely the failure this
system exists to stop"), and the no-taxonomy evidence prose are the right calls, and the
pilot passes its own lint. The system's design work is **done**; what remains is the labour.

## 2. Measured state (today)

| Measure | Value |
|---|---|
| Mirror files | 52 (all v1) + 1 v2 pilot |
| Claim entries | **1,219** — 1,176 `open`, 30 `confirmed`, 12 blank verdicts |
| Method split | **941 external** · **219 derivation** · **56 convention** (+3 hybrid) |
| Anchor drift | **97 stale anchors across 28 files** (`factcheck_anchors.py`, run today) |
| Heaviest files | Ch23: 67 · Ch20: 61 · Ch17: 52 · Ch22: 50 · Ch24: 50 · Ch19: 49 · Ch21: 44 |
| v2 lint | PASS (3 pilot cards) |
| Sources registry | `_sources.md` seeded (58 lines) |

Three facts here change the plan materially compared to the earlier P1 sketch:

**(a) The sweep is three different jobs, not one.** Only **941 entries (77%)** need web
lookups. **219 (18%) are `derivation`** — recompute-and-confirm items needing no network —
and **56 (5%) are `convention`** — internal-consistency checks against the book's own
declared conventions, which are grep-shaped. The non-web quarter of the programme can run in
ordinary offline sessions at high confidence.

**(b) Anchor drift is live and growing.** The anchors were extracted in 2026-05; since then
the manuscript absorbed the remediation batches, the 19 verification corrections, the Prelude
split, and the renumbering. Result: 97 anchors no longer match. Several are stale *because
the verification pass fixed the text they quote* (e.g., the Ch34 hardware-numbers anchor);
these already have verdicts waiting in the external-verification report. Every future edit
adds more drift silently — `factcheck_anchors.py` is not wired into `make lint`, so nothing
currently surfaces it.

**(c) A meaningful head start already exists.** Beyond the 30 confirmed entries: the 44
externally verified items of 2026-07-04 map onto mirror entries (or become new cards), and —
less obviously — the comprehensive review *recomputed dozens of derivations inline* (the
review's chapter entries are full of "recomputed ✓" verifications: the Ch11 entry alone
re-derives ~20 identities). A `derivation` entry whose exact claim the dated review already
recomputed can cite the review as evidence and close immediately. I estimate 60–120 of the
219 derivations are closable this way, plus ~40 external entries via the verification report.
Realistic true backlog: **~950–1,050 entries needing fresh work, of which ~850–900 need the
web.**

## 3. Quality risks, named

1. **Confabulated confirmation** is the failure mode that would make the whole programme
   worse than useless — a verifier "confirming" from memory produces records that *look*
   audited. The spec's placeholder-quote rule addresses this at the format level; the process
   must enforce it: an external verdict without a fetched URL and a verbatim retrieved quote
   is `unverified`, full stop. (The 2026-07-04 pass had exactly the right shape: every
   verdict carried URLs, and proxy-blocked fetches were flagged as snippet-based inline.)
2. **Meaning drift under lexical match** — staleness catches string changes only; the spec
   says so honestly. Mitigation is procedural: any manuscript edit that changes a claim's
   meaning must touch the card in the same commit (the synchronized-marking discipline this
   project already uses for reviews).
3. **Refuted-claim latency.** A `refuted` verdict with no manuscript fix is a known-false
   statement shipping under a "fact-checked" banner. The 2026-07-04 pattern (verify → report
   → fix in a paired commit) should be the standing rule; the only open question is whether
   fixes are auto-applied or batched for author approval.
4. **Tier-C re-staleness.** Perishable claims verified today are unverified-in-effect a year
   from now. The spec's `Last checked` + staleness axis carries this; the missing piece is a
   *cadence*: re-check Tier-C cards at each Appendix-F snapshot refresh (P3 gives the natural
   clock).

## 4. Cost model (refreshed with the method split)

Using the observed rate of the 2026-07-04 pass (5 parallel verifiers, 44 items, ~6–11 min
wall each; call it 3–5 min of focused effort per external item serially):

| Work package | Entries | Serial estimate | Fanned-out estimate |
|---|---|---|---|
| Drift repair (mechanical re-anchoring) | 97 anchors | 1 session | — (not worth fanning) |
| Fold-in: 44 verdicts + review-recomputed derivations | ~100–160 | 1–2 sessions | — |
| Derivation + convention sweep (offline) | ~150–215 remaining | 2–3 sessions | 1 session |
| External sweep | ~850–900 | **12–18 sessions** | **3–5 orchestrated waves** |
| QA re-audit (10% sample, independent) | ~95 | 1–2 sessions | 1 wave |

Serial total: **~18–26 sessions**. Fan-out total: **~6–9 sessions' wall time** at roughly
3–4× the token spend. A hybrid is available: fan out only the external sweep (it is
embarrassingly parallel and exactly matches the proven 2026-07-04 harness), keep everything
else serial.

## 5. My opinion

Three positions, stated plainly:

1. **The programme is worth running in full, but not at uniform priority.** The book's
   charter is anti-hype rigor; its differentiation *is* the verification infrastructure. For
   external publication, Tier B/C (attributed results and perishable numbers — the entries
   that can be *wrong in public*) are non-negotiable; Tier-A textbook results are
   reputationally cheap but also cheap to check, so they should be done — just last, and
   fast. I would not publish the separate book repository before the external sweep is done;
   I *would* publish before every Cook–Levin citation has a DOI confirmed.
2. **Drift repair must come first and become continuous.** Verifying against stale anchors
   wastes the verification; 97 are stale today and the count only grows. Wire
   `factcheck_anchors.py` into `make lint` (report-only at first, so manuscript work isn't
   blocked), and adopt the same-commit card-touch rule for meaning-changing edits.
3. **Migrate to v2 by attrition, not by campaign.** The spec already blesses coexistence.
   Every entry the sweep touches gets rewritten as a v2 card (the sweep must rewrite the
   entry anyway to record evidence); untouched entries stay v1 and keep being
   anchor-checked. A mass-migration commit would be 1,200 entries of churn with zero new
   verification.

## 6. Proposed programme

- **Phase 0 — plumbing (S, one commit).** Wire `factcheck_anchors.py` into `make lint`
  (non-fatal warning mode) and add a dashboard target (`make factcheck-dashboard`: per-file
  open/verified/refuted/stale counts — the v2 linter's `--dashboard` extended to count v1
  entries too). Fix the 12 blank verdicts (formatting stragglers). Success: the 1,176 number
  is visible and tracked.
- **Phase 1 — drift repair (S–M, one session).** Re-anchor the 97 stale anchors to the
  current text. Mechanical: for each, locate the edited passage, requote. Where the anchor
  went stale because the 2026-07-04 pass *corrected* the text, fold that verdict in
  immediately (it is sitting in the report with sources). No new research.
- **Phase 2 — harvest the head start (S–M, one to two sessions).** Fold the remaining
  2026-07-04 verdicts into their entries (as v2 cards); sweep the 219 `derivation` entries
  against the comprehensive review's recomputations and close every exact match citing the
  review + date. Honest rule: only exact-claim matches close; near-matches stay open.
- **Phase 3 — offline sweep (M, two to three sessions).** The remaining `derivation` entries
  (recompute directly — scripts/notebooks where useful, snippets into Evidence per the spec)
  and all 56 `convention` entries (grep-verifiable against STYLE.md/notation conventions).
  No network dependency; high-confidence closures.
- **Phase 4 — external sweep (the bulk).** Chapter-batched, theory-first (Ch4–17 lock in
  volume), hardware/perishables last and dated, run jointly with the P3 Appendix-F July
  refresh so Tier-C claims are verified once against the same source set. Per-batch protocol:
  verify (URL + verbatim quote or explicit snippet-caveat) → verdict → **refuted claims get
  a manuscript fix in a paired commit** (or a batched approval list, author's choice) → v2
  card → dashboard update. Pacing options: serial (~12–18 sessions), fanned (3–5 waves,
  the proven 2026-07-04 harness scaled up), or hybrid.
- **Phase 5 — QA overlay + steady state.** Independent re-verification of a 10% random
  sample of `verified` cards (adversarial framing: "try to refute"); disagreements re-opened.
  Then continuous mode: staleness gate already sits inside the `final` promotion criteria
  (PROCESS.md), Tier-C re-checks ride each future Appendix-F restamp.

**Exit criterion** (unchanged from P2's criteria): a chapter is `final`-eligible when its
mirror file has zero `open`/`unverified` entries and zero stale anchors.

## 7. Decisions needed from the author

1. **Pacing** for Phase 4: serial sessions, multi-agent fan-out, or hybrid
   (fan-out external only — my recommendation).
2. **Refuted-claim handling**: fix-in-paired-commit autonomously (the 2026-07-04 precedent),
   or batch fixes for approval per chapter.
3. **Start point**: Phases 0–2 are safe, cheap, and useful regardless of when the big sweep
   runs — I recommend green-lighting them as one work block even if Phase 4 waits.
4. Whether Phase 4's hardware batch should be **fused with the P3 Appendix-F refresh**
   (recommended: one dated source-set, one restamp).
