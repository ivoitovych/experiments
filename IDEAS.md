# Ideas to Consider — parked backlog

A scannable digest of the **non-blocking** work the review process has
surfaced but deliberately not yet done: effortful programmes, additive
enrichment, and calls that need the author. Correctness fixes never land
here — they are applied in the fix batches and recorded in
[`reviews/response-2026-07-19-second-pass-dispositions.md`](reviews/response-2026-07-19-second-pass-dispositions.md)
(the insert-only master record; each item below cites it for provenance).

**How this file works.** Unlike the dispositions doc, this file is
*living*: prune an item when it is done or dropped, and note where it
went. It is a to-do digest, not an audit trail — the audit trail is the
dispositions doc and Git history. Keep entries one or two lines; link out
for detail.

Status key: **OPEN** (waiting) · **PARTIAL** (some done) · **NEEDS-AUTHOR**
(decision required before work can start).

> **Review status (2026-07-22): the exhaustive second pass is complete.**
> 179 eligible tracked files reviewed; final verdict: content quality 4.6/5,
> infrastructure concept 4.7/5, reader entertainment 4.4/5. The one systemic
> theme is *assurance mismatch* — tooling/status/snapshots occasionally imply
> more completeness, currency, or reproducibility than the evidence proves.
> The reviewer's remediation order below supersedes ad-hoc prioritization.

## Priority order (reviewer's final synthesis)

- **P0 — trust blockers.** *Tooling sub-lane DONE (batches 69-72):*
  strict-tolerance identity checks; empty-inventory guards across
  factcheck_anchors / check_examples / check_card_citations / factcheck_lint
  / generate_toc; lint no longer silently skips card-citation checks without
  the venv; Gist DELETE=1 made real + privacy note; generate_index validates
  before writing (no partial-destructive output); word-precise (not
  line-wide) codespell suppression + empty allowlist; scaffold marked
  historical. *Still open:* enforce claim date/source/scope rules (= the
  DEFERRED-FACTCHECK programme, §A). *Licensing resolved (2026-07-22):*
  book/ (+ TOC, BookDescription) dual; everything else MIT.
- **P1 — drift & reproducibility.** Canonical structured sources for
  references/status/navigation/figures with bidirectional drift checks;
  retire/regenerate stale scaffold; pin/test environments; deterministic,
  accessibility-complete diagrams; full link/asset/render/card coverage
  reports. (Overlaps §A, §B, §D below.)
- **P2 — reader experience.** Progressive disclosure, worked paths,
  retrieval checks, consolidated caveats, comparison-as-decision narratives,
  accessibility across prose/math/tables/figures. (Overlaps §E below.)
- **P3 — maintainability.** Normalize review-record path/schema, classify
  archives and durable decisions, release manifests/checksums with
  provenance, ownership/refresh cadence for moving-target content.


---

## A. Fact-check verification programme (`DEFERRED-FACTCHECK`)

The largest bucket: turning the manuscript's perishable/attributed claims
into dated, sourced records. All flagged inline in the dispositions doc.

- **OPEN — per-claim primary sourcing.** Attach a primary source (DOI /
  arXiv / standard number) and a `checked_at` date to every open card in
  `factcheck/`; close the many `TBD`/`open` cards the mirror audits
  flagged.
- **OPEN — dated benchmark / scenario tables.** Replace volatile
  resource-estimate and hardware prose (RSA/chemistry T-counts, qubit
  counts, records) with dated tables carrying metric definition,
  demonstrated-vs-announced status, and source — the recurring ask across
  Ch20–31, App F.
- **PARTIAL — chapter References sections.** Seven chapters have them
  (15, 16, 19, 27, 30, 33, App F); the rest fill in automatically as cards
  get sourced (the lint references-sync check pulls citations book↔mirror).
- **OPEN — App D / bibliography completeness.** Full author lists, editions,
  venues, DOIs, last-verified dates for every suggested-reading entry.

## B. Fact-check mirror schema migration (`mirror-overhaul`)

- **PARTIAL — migrate compact cards to `CARD-SPEC` seven-field form.** New
  and touched cards use the spec; the mass-extracted compact
  `- **Claim** (anchor):` cards migrate on contact. No stable-ID/enum
  machinery (author-declined; see `factcheck/README.md`).
- **OPEN — heading-vs-anchor and truncated-anchor audit.** Several mirror
  audits noted headings asserting more than their anchors, and anchors
  cut off before the operative number/formula.

## C. Author decisions (`AUTHOR-DECISION`)

- **NEEDS-AUTHOR — Appendix F refresh policy.** The snapshot is dated
  May 2026 by design; the July-2026 dated addendum (F.8) is in. Beyond
  that: keep freezing + append, or periodically re-baseline?
- **NEEDS-AUTHOR — mirror-overhaul scope/priority.** Full migration now vs
  on-contact (current default).
- **NEEDS-AUTHOR — process-framework artifact.** `docs/unified-book-process-framework.md`
  is parked as planning input; decide its licensing (book-side vs MIT
  infrastructure) and whether to run a process-alignment pass against it.
- **NEEDS-AUTHOR — full visual/browser render pass.** The SVG figures and
  GitHub-rendered math want human eyes end-to-end; lint covers only the
  known bug classes.

## D. Reusable infrastructure ideas (`infrastructure queue`)

- **DONE (kept for reference):** executable identity suite
  (`scripts/verify_identities.py`) + card-citation lint; references-sync
  lint; TOC/index generators; British-spelling lint.
- **OPEN — extend the executable-check idea** to more derivable cards
  (beyond App B/C identities) where a script can stand in for a citation.
- **OPEN — test-sheet automation.** The renderer-bug memo's manual fixture
  (`docs/render-tests/`) could be captured with browser automation +
  dated result rows, per its own file-level review.

## E. Additive enrichment (reviewer "would be nice", not corrections)

Content-authoring ideas the reviews raised repeatedly. Not applied —
these are new material, not fixes — collected here so they are not lost.

- Diagrams: syndrome-history / space-time decoding (Ch34), spatial
  error-correlation (Ch18), a directed model-equivalence map with labeled
  edges (Ch32), a "transfers / breaks" matrix for the engineering
  analogies (Ch34).
- Normalized "scoreboard" tables replacing record-list prose (Ch24
  simulation records, Ch29 optimization races, Ch31 sensing records).
- Per-algorithm accounting boxes (promise / output / success prob /
  queries / gates / postprocessing / access) in the algorithms chapters.
- A claim matrix for QML (input access, output type, assumptions, best
  classical analogue, dequantization status, evidence) — Ch30.

---

*Provenance for every item lives in the dispositions doc under the batch
that raised it. When an item here is completed, note the batch and remove
it.*
