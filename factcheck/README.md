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

## Independence principle

Each entry must be **self-contained** — the claim, the method, and (once
verified) the source make sense on their own, without opening the chapter the
entry mirrors. This lets a reviewer (human or agent) verify the entry as an
isolated task, and lets the directory double as a reusable reference. In
practice:

- The **claim** is a standalone statement. No "the chapter shows that…",
  no "as discussed above".
- The **method** description recalls the derivation or names the source
  directly. No "see §4.7", no "proved in Chapter 11", no "previewed for
  Chapter 14".
- The **find-in-text** field is the *one* place a back-reference into the
  chapter lives, by design — it's the locator.

A claim like "Holevo bound: the accessible information sup I(X; Y) is at most
χ = S(ρ) − Σ p_x S(ρ_x)" is verifiable on its own. A claim that says only
"Holevo bound, deferred to Chapter 12" is not.

## Verification methods

Every entry names a **method**. Do *not* force an external URL onto a claim
that isn't externally sourced, or the math chapters fill with false "uncited"
flags. The methods are:

- `external` — backed by an outside source. The Source field carries the
  citation + link/DOI once verified.
- `derivation` — follows from standard mathematics. The Method field recalls
  the derivation in one line, so a reviewer can reproduce it without the
  chapter.
- `check` — verified by a runnable artifact (e.g. `examples/grover.py`,
  which asserts the exact 121/128 two-iteration success probability).
  Name the artifact in the Source field.
- `convention` — a stated notation/sign/ordering choice. The check is
  book-wide consistency.

## Entry format

````markdown
### Claim: Gidney (2025) RSA-2048 resource estimate — under 1 million physical qubits, under one week, same noise assumptions

- **Method:** external — supersedes the earlier ~10M-qubit / ~10h estimate; key innovations are approximate residue arithmetic, yoked surface codes, and a smaller magic-state-distillation budget.
- **Source:** Gidney, arXiv:2505.15917 (May 2025) — https://arxiv.org/abs/2505.15917
- **Status:** confirmed (2026-05)
- **Find in text:** "under 1 million physical qubits, under one week"
````

- **Claim** — a standalone sentence; prefix with `Claim:` so the reader never
  has to guess what the line is.
- **Method** — `external` / `derivation` / `check` / `convention`, followed by
  one sentence that *recalls* the derivation or *names* the source, so the
  entry is verifiable on its own.
- **Source** — empty (`—`) until the claim is verified; then a real citation
  with a link/DOI if external, or the artifact path if `check`.
- **Status** — `not yet verified` / `confirmed` / `updated` / `contested`,
  optionally with a `YYYY-MM` date, matching the manuscript's
  perishable-snapshot convention (`PROCESS.md`, "Moving-target warning").
- **Find in text** — a verbatim sentence from the section. Quotes survive
  renumbering; section/line numbers do not. If the manuscript wording changes
  the locator stops matching, which is exactly the signal the self-check looks
  for. **This is the one field allowed to depend on the chapter.**

## Two run modes (separation of concerns)

- **Book factcheck** — verify the *manuscript* against this directory. Walks
  sections; for each significant claim, confirms there's an entry here and that
  the manuscript still agrees with it. Cheap, because the research is cached.
- **Self factcheck** — verify *this directory itself*, independent of the book.
  Re-resolve links, re-confirm `external` sources are reliable and faithfully
  summarized, and run the coverage/orphan checks below.

## Coverage and orphan checks (keeps the cache from rotting)

The self factcheck run should flag:

1. **Orphan files** — a factcheck file whose mirrored `book/` section no longer
   exists.
2. **Stale anchors** — a quoted anchor that no longer appears in its section
   (claim edited or removed upstream; the entry needs review).
3. **Thin coverage** — a claim-dense section with little or no factcheck file.

Checks (1) and (2) are mechanized in
[`scripts/factcheck_anchors.py`](../scripts/factcheck_anchors.py) — run it from
the repo root; exit code 0 means all locators resolve. Matching is
**normalized**, not byte-exact: it folds case, markdown emphasis (`**`),
blockquote markers (`>`), straight and typographic quotes, and LaTeX noise
(`$`, `\`, `{}`) before comparing, so cosmetic escaping or callout-box markup
is not reported as drift while genuine wording changes still are. Two
consequences for how you write find-in-text locators:

- Don't splice non-contiguous text with `…` — the locator must be a *single
  contiguous run* that appears in the section.
- Quote a full sentence where possible. It's both more readable and a tighter
  drift detector than a short fragment.

## Status

Seeded 2026-05 from the historical Pass 1–7 entries in
[`docs/fact-check-ledger.md`](../docs/fact-check-ledger.md). The ledger is
retained as a dated changelog; new work goes here. Coverage: 48 of the 48
manuscript files have mirror files (the Historical Prelude's is an explicit
extraction-pending stub). Verification depth varies widely by file — many
cards remain open; the per-file status lines are authoritative.

## Design decisions (author-confirmed, 2026-07)

- **No stable IDs, no schema machinery.** A card's identity is its mirror
  file (same order as the book), its section heading (exactly as in the
  book), and its verbatim anchor — plus Git history. The reviewer-suggested
  ID/tier/enum apparatus is deliberately rejected: cards stay plain,
  human-readable text. [`CARD-SPEC.md`](CARD-SPEC.md) (seven labeled
  fields, verdict separate from linter-computed freshness) is the target
  format; the compact `- **Claim** (anchor):` cards are the legacy
  extraction format and migrate to the spec when touched.
- **Executable checks are citable evidence.** A card may cite
  `scripts/verify_identities.py::<check_name>` as its method. Lint runs
  the suite and fails if any cited check is missing or failing
  (`scripts/check_card_citations.py`) — a card can never keep claiming a
  green check that has rotted.
- **No central source registry.** External references live in a final
  unnumbered `## References` section at the bottom of the *book chapter*
  whose claims they support (exempt from the section count — STYLE.md),
  and the mirror file carries the *same* set in its
  `## References (external)` section: a deliberate duplication so the
  book stays human-usable (including in print) and the mirror stays
  self-contained for verifiers. `tools/lint.py` enforces bidirectional
  citation-key equality between the two lists, which is what makes the
  duplication safe. Dense reference sections are acceptable —
  completeness beats brevity for lookup material. `_sources.md` is a
  deprecation stub.
