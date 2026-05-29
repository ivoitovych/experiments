# `factcheck/` — claim-level verification, indexed by section

This directory mirrors the manuscript. For each section file under `book/`
there may be a corresponding file here at the **same relative path**:

```
book/part-06-algorithms/15-landmark-quantum-algorithms.md
factcheck/part-06-algorithms/15-landmark-quantum-algorithms.md   ← its factcheck file
```

Each factcheck file lists, **in section order**, one entry per *significant
claim* in that section: the claim (with a quoted anchor), how it was verified,
the source(s), the date, the verdict, and a comment.

The directory serves three jobs at once:

1. **A reviewer's companion.** When editing §15.3, the claims for §15.3 are
   right here, beside the work — not buried in a chronological log.
2. **A cache of researched sources.** Web verification is the expensive step.
   Once a claim is researched, the source and link live here permanently, so
   later passes look it up instead of re-researching it.
3. **A source registry.** Deduping citations across all files yields
   [`_sources.md`](_sources.md) — the running list of reliable sources, which
   cross-checks Appendix D.

## What counts as a "significant claim"

In scope (record it):

- **External / perishable / empirical** facts — hardware numbers, dates,
  standards, vendor specifics, experimental records, resource estimates.
- **Attributed results** — "Gidney (2025) shows…", a cited theorem, a named
  bound.
- **Cross-references the reader will trust as fact** — anything a careful
  reviewer would want to confirm against the world.

Out of scope (don't clutter the file):

- Motivational prose, pedagogy, "how to read this chapter" framing.
- Routine algebra a reader can check inline.
- Opinion / framing explicitly flagged as such in the manuscript.

## Verification methods — source is not the only one

Every entry names a **method**. Do *not* force an external URL onto a claim
that isn't externally sourced, or the math chapters fill with false "uncited"
flags. The methods are:

- `external` — verified against an outside source. Give a citation + link/DOI.
- `derivation` — verified by an internal derivation. Point to it
  (`→ §4.3`, or the proof in this section).
- `check` — verified by a runnable artifact. Point to it
  (`→ examples/grover_count.py`).
- `convention` — verified as internally consistent with a stated convention
  (`→ §2 notation`, Appendix A).

## Entry format

````markdown
## §15.3 — Gidney (2025) RSA-2048 resource estimate

- **Claim** (anchor): "under 1 million physical qubits, under one week"
- **Method**: external
- **Source**: Gidney, arXiv:2505.15917 (May 2025) — https://arxiv.org/abs/2505.15917
- **Verified**: 2026-05 · **Verdict**: confirmed
- **Comment**: supersedes the prior unsourced ~10M-qubit / ~10h intermediate figures.
````

- **Anchor**: a short *quoted* phrase that actually appears in the section.
  Quotes survive renumbering; section/line numbers do not. If the manuscript
  wording changes, the anchor stops matching — which is exactly the signal the
  self-check below looks for.
- **Verdict**: `confirmed` / `updated` / `contested` / `open`.
- **Verified**: `YYYY-MM`, matching the manuscript's perishable-snapshot
  convention (`PROCESS.md`, "Moving-target warning").

## Two run modes (separation of concerns)

- **Book factcheck** — verify the *manuscript* against this directory. Walks
  sections; for each significant claim, confirms there's an entry here and that
  the manuscript still agrees with it. Cheap, because the research is cached.
- **Self factcheck** — verify *this directory itself*, independent of the book.
  Re-resolve links, re-confirm `external` sources are reliable and faithfully
  summarised, and run the coverage/orphan checks below.

## Coverage and orphan checks (keeps the cache from rotting)

The self factcheck run should flag:

1. **Orphan files** — a factcheck file whose mirrored `book/` section no longer
   exists.
2. **Stale anchors** — a quoted anchor that no longer appears in its section
   (claim edited or removed upstream; the entry needs review).
3. **Thin coverage** — a claim-dense section with little or no factcheck file.

Checks (1) and (2) are mechanised in
[`scripts/factcheck_anchors.py`](../scripts/factcheck_anchors.py) — run it from
the repo root; exit code 0 means all anchors resolve. Matching is **normalized**,
not byte-exact: it folds case, markdown emphasis (`**`), and LaTeX noise
(`$`, `\`, `{}`) before comparing, so a cosmetic escaping difference is not
reported as drift while genuine wording changes still are. Two consequences for
how you write anchors:

- Don't splice non-contiguous text with `…` — an anchor must be a *single
  contiguous run* that appears in the section.
- Prefer a distinctive **prose** fragment over raw LaTeX; if a claim is purely
  mathematical, anchor on the surrounding prose where possible.

## Status

Seeded 2026-05 from the historical Pass 1–7 entries in
[`docs/fact-check-ledger.md`](../docs/fact-check-ledger.md). The ledger is
retained as a dated changelog; new work goes here. Coverage is partial — only
sections touched by those passes have files so far.
