# Proposals — Remaining Programmes and Loose Ends

**Date:** 2026-07-05
**Scope:** Deep analysis of everything left open after the 2026-07-03/04 review → remediation
→ external-verification → deferred-items cycle. Eight items: three open programmes (P1–P3),
three technical leftovers (P4–P6), two housekeeping decisions (P7–P8). Each gets: facts as
measured in the repository today, analysis, a concrete proposal, effort, and priority.

Nothing in this report changes the manuscript; it is the decision aid for the next work cycle.

---

## P1. The `factcheck/` verification programme

**Facts (measured today).** 52 mirror files; **1,219 claim entries**, of which **1,176 are
`Verdict: open`**, 30 confirmed, 12 blank (formatting stragglers from the extraction pass).
The v2 card system (CARD-SPEC.md, `_template.md`, `_pilot.md`) exists but only the pilot uses
it; the 52 mirror files are v1 format. `docs/fact-check-ledger.md` holds 7 dated pre-mirror
passes. The 44 externally verified items from
[factcheck-2026-07-04-external-verification.md](factcheck-2026-07-04-external-verification.md)
are **not** yet reflected in the cards (kept separate at the author's direction).

**Analysis.** The 1,176 open entries are not homogeneous; they fall into three cost tiers:

- **Tier A — standard results** (Cook–Levin, Savitch, Holevo, named theorems with textbook
  citations): the entry already names the source; verification is confirming the citation and
  statement. Fast, low-risk, high-volume — likely 40–50% of entries.
- **Tier B — attributed results** (papers, bounds, named experiments with dates): one web
  lookup each. Exactly the shape of the 44-item external pass, which averaged a few minutes
  per item. Perhaps 35–45% of entries.
- **Tier C — perishable numbers** (vendor specs, records, standards timelines): needs dated
  verification *and* a re-check cadence — these can go stale after being confirmed. Perhaps
  15–20%, concentrated in Chapters 20–26, Appendix F, and Chapter 27's NIST timeline.

At single-session pace (~50–70 entries per focused session, the observed rate of the
2026-07-04 pass scaled up), the full sweep is **~18–24 sessions**. With the author's explicit
opt-in to multi-agent fan-out, the same sweep compresses to **2–4 sessions** (parallel
verifiers per chapter, adversarial spot-checks on a sample), at proportionally higher token
cost.

**Proposal.**
1. **First move (S, immediate):** fold the 44 external verdicts into their mirror cards —
   the sources and verdicts are already written; this is a transcription pass that closes
   ~44 entries and, more importantly, exercises the update workflow before the big sweep.
2. **Format decision:** adopt v2 cards **on touch** — any entry edited during verification is
   migrated; no mass-migration commit. Keeps churn proportional to value.
3. **Order of attack:** by *promotion value*, not difficulty — verify chapter-by-chapter in
   the order the author wants chapters promoted to `final` (see P2), with Tier-C chapters
   (20–26, 27, App. F) either first (they gate the most perishable claims) or explicitly
   last-with-restamp (verify once, near publication). Recommended: theory chapters first
   (cheap, bulk, they lock in most of the count), hardware chapters last and dated.
4. **Bookkeeping:** add a 10-line `scripts/factcheck_progress.py` (or extend
   `factcheck_lint.py`) emitting per-file open/confirmed counts into a small dashboard table
   in `factcheck/README.md` — the 1,176 number should be visible and falling.
5. **Exit criterion per chapter:** zero open entries in its mirror file = eligible for
   `final` (jointly with P2's other gates).

**Effort:** S for step 1; the sweep is the project's remaining bulk (L × many, or M with
fan-out). **Priority: this is the project's main open programme.**

## P2. Status promotion (draft → reviewed → final)

**Facts.** All 48 files are `Status: draft`. README's *Status* section says "not yet
`reviewed` or `final` … complete draft under active revision." The ladder
(stub → outlined → draft → reviewed → final) is used by `generate_progress.py`; lint's only
status gate is Moving-target-warnings-must-clear-before-`final`. Since that text was written,
every file has been through: a 48-file comprehensive review (197 findings), full remediation
(165 fixes + adjudications), external verification of all review-flagged factual items
(44 claims), and five new structural lint rules that pass clean.

**Analysis.** "Reviewed" is now simply true — withholding it makes PROGRESS.md understate the
manuscript's actual state. What is *not* yet true is "final": the factcheck sweep (P1) hasn't
run, Moving-target banners are live in the perishable chapters, and the newest additions
haven't had a GitHub-rendering spot-check (P6). The two claims should be decoupled exactly as
the ladder intends. One caveat worth recording rather than hiding: the review provenance is a
single comprehensive reviewer pass plus author supervision — PROCESS.md should say what
"reviewed" means here so the status is auditable, not aspirational.

**Proposal (one commit, S):**
1. Promote all 48 files `draft` → `reviewed`.
2. Update README's Status section: "Full manuscript drafted and reviewed; claim-level
   fact-checking in progress" with a pointer to `reviews/` and `factcheck/`.
3. Add a *promotion criteria* block to PROCESS.md: **reviewed** = full-manuscript review
   applied and remediated, structural lint clean (state the 2026-07 review as the instance);
   **final** = factcheck mirror file closed + Moving-target warnings cleared and logged +
   rendering spot-check — all per-file.
4. Regenerate PROGRESS.md; lint.

**Priority: high** — zero-risk truth-telling; it also gives P1 its per-chapter finish line.

## P3. Appendix F refresh

**Facts.** Appendix F self-describes as a May 2026 snapshot to be *replaced wholesale* each
revision, and chapters 20–22 explicitly defer to it ("when this chapter and Appendix F
disagree, trust Appendix F"). After the 2026-07-04 verification fixes to the chapters, there
is now at least one **live contradiction with the deference rule pointing the wrong way**:
F.3 says IonQ "Forte at #AQ 29 today, with Forte Enterprise #AQ 35 and Tempo #AQ 64
announced", while §22.9 (post-verification) says Forte-class systems (36 physical qubits)
report AQ = 36 "see Appendix F for the maintained figures". A reader following the book's own
rule lands on the staler number. Known additional staleness in F: no Quantinuum Helios
(launched Nov 2025, 98 qubits); H2 fidelity but no QV 2²⁵; neutral-atom fidelity "around
99.5% and improving" (now ~99.7%); F.7's milestone list predates the chapters' updated
below-threshold detail; no annealer section at all (Advantage2's corrected 4,400-qubit figure
lives only in Ch. 29).

**Analysis.** The appendix's design is sound — one perishable home, dated banner, wholesale
replacement — but the replacement is now due, and it must be *web-verified*, not written from
memory: this is precisely the appendix the fact-check discipline exists for.

**Proposal (M, one dedicated session):** a "July 2026 snapshot" pass in the same style as the
2026-07-04 external verification: ~15–25 primary-source lookups covering every number in F.2–F.7
(IBM incl. any post-Heron roadmap parts, Google, Quantinuum incl. Helios, IonQ AQ line-up,
QuEra/Atom/Pasqal, photonic/spin/topological, the F.6 table, the F.7 milestones), rewrite the
appendix wholesale, restamp the banner "as of July 2026", resolve the AQ contradiction, decide
whether to add a short annealing row to F.6 (recommended, since Ch. 29 cites qubit counts),
and log the pass in `docs/fact-check-ledger.md` plus F's mirror card.
**Priority: high — the AQ contradiction makes this the most urgent content item left.**

## P4. Remaining lint automation

**Facts.** The math-escape rules (`\\`, `\{`, `\,`, `\|` inside `$…$`) already exist in
`check_math_blocks` — what I earlier filed as "rule 5" is more precisely the **Bug-5
table-cell rule**, which the renderer memo itself marks "Lint coverage: not currently
encoded". Separately, the link checker validates file targets but ignores `#anchor`
fragments, and the repo now has 529 anchor links in the generated TOC alone.

**Proposal (two rules, S+M):**
1. **Table-cell hazard rule (S):** for table rows (lines starting with `|` containing ≥2
   unescaped pipes), flag (a) any `$…$` math span containing a bar character (`|` or `\\|`)
   or `\rangle` — per Bug 5 these silently corrupt; (b) any code span containing an
   *unescaped* `|` (a `\|`-escaped pipe, as used by the §27.7 BB84 table, is the sanctioned
   GFM form). Update the memo's Bug-5 entry to say the rule is now encoded.
2. **Anchor-fragment checker (M):** extend `LINK_RE` handling to resolve `#fragment` against
   the target file's headings via the same `slugify` used by `generate_toc.py` (factor it
   into a shared helper so TOC generation and lint can't drift apart). Catches broken anchors
   from any future renumbering — exactly the class of breakage D1's SC.x/N.x rename could
   have caused silently.

**Priority: medium** — both are regression insurance for changes already made.

## P5. The three skipped tightenings (O5, O6, O8) — revisit triggers

Closed by decision on 2026-07-04; recorded here so the decisions are revisitable instead of
rediscoverable:
- **O5** (Reiher ~10¹⁵ T at 0.1 mHa): apply only if §28's surrounding text ever claims strict
  *chemical accuracy* for the ~10¹⁴ figure.
- **O6** (Steane "up to Pauli corrections"): apply only if the §19.14 passage is generalised
  to other codes' transversal gates, where the phrase stops being harmless.
- **O8** (Clifford depth Θ(n/log n)): apply only if §11.7 ever discusses
  connectivity-dependent compilation depth explicitly.

**Proposal:** no action; keep as triggers. **Priority: none.**

## P6. GitHub-rendering spot-check of the newest additions

**Facts.** Five recent changes exercise renderer behaviour the local build can't prove:
the §27.7 BB84 table's `\|` escapes inside code spans in table cells (GFM-documented, but
this repo trusts its own test sheet over documentation — that is the renderer-memo's whole
lesson); the four new SVGs and their alt text; the SC.x/N.x heading anchors; the 529
generated-TOC anchor links; the split-Prelude paragraph flow.

**Proposal (S):**
1. Eyeball five URLs on github.com (branch `claude/init-quantum-computing-iaiRN`):
   Ch. 27 §27.7 (table), Ch. 18 §18.3 + Ch. 19 §§19.12/19.22 (three figures), Ch. 33 §33.3
   (fourth figure), `book/00-front-matter/01-background-and-self-check.md` (SC.x rendering),
   and TOC.md (click 3–4 anchors including one SC.x and one appendix link).
2. Whatever the table check shows, **add a `\|`-in-code-span-in-table row to
   `docs/render-tests/math-context-matrix.md`** and a line to the Bug-5 memo entry — the memo
   instructs that new constructs get a test-sheet cell, and this is a new construct.
3. If anything renders wrong: the table falls back to the memo's sanctioned bullet-list form;
   figures fall back to PNG.

**Priority: medium-high, cheap** — do before promoting the touched chapters beyond `reviewed`.

## P7. The pre-rewrite backup branch

**Facts.** `origin/claude/init-quantum-computing-iaiRN-20260704-203037` preserves the
pre-rewrite history — including the 24 Claude-attributed commits and the stripped trailers.
**While it exists, the attribution the 2026-07-04 rewrite removed remains publicly reachable
on GitHub** (commits list, contributors graph of that branch, raw API). Deletion makes the
refs unreachable, but GitHub can retain orphaned commits in its object store and activity
caches for some time; guaranteed purging requires GitHub Support (or recreating the repo).

**Proposal:**
1. Verify the rewrite on GitHub once (contributors page of the working branch; commit search
   for `noreply@anthropic.com` scoped to the repo).
2. Delete the backup branch immediately after (`git push origin --delete
   claude/init-quantum-computing-iaiRN-20260704-203037`) — every day it stays up dilutes the
   point of the rewrite.
3. If complete non-reachability matters, contact GitHub Support to run garbage collection on
   the orphaned objects, or recreate the repository from a fresh push of the rewritten
   history.

**Priority: high given the stated motive for the rewrite; needs author's go-ahead** (it is a
destructive, irreversible-in-practice deletion).

## P8. Branch topology and publication posture

**Facts.** The remote has only `claude/init-quantum-computing-iaiRN` (all work), the backup
(P7), and `empty`. There is no `main`; the default branch is therefore one of these — meaning
a visitor to the repository either sees an empty tree or a branch whose *name* ("claude/…")
itself signals AI tooling, which the author explicitly wants to avoid signalling. Publication
prerequisites otherwise in place: LICENSE (dual CC BY-NC-ND / reserved), CITATION.cff,
README, clean authorship after the rewrite.

**Proposal (S, but two steps need the author):**
1. Create `main` at the current HEAD: `git push origin HEAD:refs/heads/main` — same history,
   neutral name. (I can do this on request; it is additive and safe.)
2. **Author action:** set `main` as the default branch in repository settings, then delete
   the `claude/…` working branch (or keep it as a scratch branch — but note its name remains
   visible in the branch list either way) and the `empty` branch.
3. Going forward, work on short-lived topic branches into `main` — which also makes the PR
   review flow available if ever wanted.
4. Optional: decide public/private posture only after P7's deletion and P6's spot-check, so
   the first public impression is the cleaned, verified state.

**Priority: medium; do after P7** (deleting the backup first means `main` never coexists with
the attributed history).

---

## Recommended sequence

| Order | Item | Effort | Gate |
|-------|------|--------|------|
| 1 | P7 verify rewrite + delete backup branch | S | author go-ahead (destructive) |
| 2 | P8 create `main`; author flips default branch | S | author settings access |
| 3 | P6 rendering spot-check + test-sheet row | S | none |
| 4 | P2 promote to `reviewed` + criteria in PROCESS.md | S | author agreement on wording |
| 5 | P4 two lint rules | S+M | none |
| 6 | P3 Appendix F July-2026 refresh (web-verified) | M | none |
| 7 | P1 step 1: fold 44 verdicts into cards; then the sweep | S, then L (or M fanned-out) | author's pacing/budget choice |

Items 3–6 I can execute autonomously on approval; items 1–2 need author actions or explicit
authorisation; item 7's sweep needs a pacing decision (serial sessions vs multi-agent
fan-out).

---

## Decision & execution log (2026-07-05, insert-only)

Author decisions on this report:

- **P8 — REJECTED (no `main`).** This repository hosts many different projects; the book will
  be published as a *separate repository* once it reaches a serious degree of completeness.
  No default-branch change; no `main` here.
- **P7 — MODIFIED AND EXECUTED.** Instead of `main`: the working branch is renamed to a
  properly-named branch (`quantum-computing-book`), pushed, and all obsolete branches deleted
  (the pre-rewrite backup with the old attributed history, the old `claude/…` working branch,
  and `empty`, subject to GitHub default-branch constraints noted below).
- **P2 — MODIFIED AND EXECUTED.** Status value is **`prereviewed`**, not `reviewed`:
  `reviewed` is reserved for a respected independent reviewer's review (and the author has
  not yet done a start-to-end read). Executed in this commit: all 48 files promoted
  `draft` → `prereviewed`; ladder updated in `generate_progress.py` and the generated-index
  template; promotion criteria documented in PROCESS.md (*Status-promotion criteria*);
  README Status section rewritten; PROGRESS.md and the Index regenerated; lint clean.
- **P1 — DEFERRED** by the author ("let's return to the factcheck later"). P3/P4/P6 remain
  open proposals, undecided.

**P7 execution outcome (2026-07-05):** the working branch was renamed and pushed as
**`quantum-computing-book`** (same history, neutral name) — it is now the branch of record.
Remote deletion of the obsolete branches is blocked by this session's git gateway (deletes
are refused), so the author should remove them via GitHub's branch page (or any
full-permission clone). Obsolete list, all safe to delete once `quantum-computing-book` is
confirmed present: `claude/init-quantum-computing-iaiRN` (superseded working branch),
`claude/init-quantum-computing-iaiRN-20260704-203037` (pre-rewrite backup — **still carries
the AI-attributed commits; deleting it is the point of the rewrite**), and
`claude/init-quantum-computing-iaiRN-backup-20260524` (older backup discovered during this
pass — also carries pre-rewrite history). `empty` can be deleted only after some other
branch is made the repository default in Settings. Unrelated project branches
(bfloat16/gelu/dopri/etc.) were deliberately left untouched.
