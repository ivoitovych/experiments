# Fact-check card specification

A **fact-check card** is a self-contained Markdown verification record for one
check-worthy claim in the manuscript. A card is verified only for the *exact
claim, exact wording, evidence, and date recorded in it* — not forever.

It is **not** a database row, a knowledge graph, an issue tracker, or a public
ClaimReview record. It exists to answer one question:

> Can a third-party verifier understand exactly what claim was checked, where
> the book says it, what evidence supports or refutes it, and whether the card
> still applies after revisions?

## The seven fields

Every card has exactly these, each explicitly labelled (no guessing what a bare
line means):

| Field | Answers |
|---|---|
| **Claim** | *What* dry, checkable proposition is being verified? |
| **Exact text** | *Where* does the book say it? (verbatim; also the staleness anchor) |
| **Context** | What does this card verify, and what does it *not*? |
| **Clarity** | Is the claim clear enough to verify without interpretation? |
| **Status** | The verification *verdict*. |
| **Evidence** | *Why* should the verifier accept the verdict? (plain prose) |
| **Last checked** | When was the evidence last reviewed against the claim? |

**Claim ≠ Exact text.** The claim is the testable proposition (may be plainer
than the book); the exact text anchors the card to the manuscript and is what
the linter greps for.

There is **no** `id`, `section`, `tier`, `claim-type`, or per-source enum grid.
Location is the file path + headings; identity is the heading + Git; source
quality is stated in evidence prose.

## Two independent axes: verdict and freshness

This is the load-bearing design decision. **Status is a verdict; staleness is a
separate, linter-computed axis.** They never collapse into one field.

**Status (verdict)** — stored in the card, one of:

- `unverified` — not yet checked. *(Action: check it.)*
- `verified` — checked, holds. *(Action: none.)*
- `refuted` — checked, found false. *(Action: fix the book.)*
- `depends` — conditionally true; the condition must be stated in the card.
  *(Action: keep the condition visible.)*

That is the whole enum. `in progress` is workflow (use `unverified` + Git);
`verified with caveat` is `verified` with the caveat written into Context or
Evidence; `partially verified` means the claim is too loose (tighten it) or is
two claims (two cards); `contradicted` is `refuted`.

**Freshness** — *computed by the linter*, never written into the card:
`current` / `stale`. A card is **stale** when its Exact text no longer appears
(normalised) in the mirrored manuscript file. Crucially, the linter does **not**
overwrite the verdict: a `verified` card whose text drifts becomes
*verified-but-stale*, preserving the record that it once passed. A human
re-confirms against the new wording and bumps `Last checked`. This is the
regression-test mindset — a passing test whose code changed is "stale, rerun
me," not "failing," and you still know it passed before.

## Clarity vocabulary

`clear` · `unclear` · `too broad` · `not checkable`, each followed by a short
prose reason. A card may be `verified` only if its clarity is `clear`.

## Evidence

Plain language, no taxonomy grids. Each item says what the source/method is,
where it lives, what quote/result/calculation matters, and how it supports,
limits, or refutes the claim. Source quality goes in words ("the original paper
where the result was first published"; "a later textbook that agrees but is
derivative, used only as background").

- Use **repo-relative paths** (`scripts/foo.py`), never bare filenames; include
  a core snippet inline for computational evidence.
- **Never invent a quote.** If you have not pulled a verbatim line, use a
  placeholder like `"<verbatim quote from source>"` — and a card with an
  unresolved placeholder may not be `verified`. A plausible-looking fake quote
  in a verification record is precisely the failure this system exists to stop.

## Canonical template

See [`_template.md`](_template.md). Worked examples: [`_pilot.md`](_pilot.md).

## File organisation

Cards mirror the manuscript: one file per chapter file, at the same relative
path under `factcheck/`. Headings inside a file group cards by section. The path
and headings *are* the location system — no `Section:` field. If a section
moves, move the card; Git records the move; the card carries no old address.

## Linting

`scripts/factcheck_lint.py` enforces:

1. every card is a level-3 heading with all seven fields present and non-empty;
2. `Clarity` starts with a clarity value; `Status` is a verdict value;
3. `verified` ⇒ `Clarity: clear` **and** ≥1 evidence item **and** no unresolved
   placeholders; `refuted` ⇒ evidence present; `depends` ⇒ a condition stated;
4. repo-relative paths cited in evidence exist;
5. **staleness:** the Exact-text quote still appears (normalised) in the
   mirrored `book/` file — reported as `stale`, *without* touching the verdict.

The dashboard (`--dashboard`) prints counts by verdict plus the stale count.

## Honest limitations

- **Lexical drift only.** Staleness catches that the string changed, never
  whether the *meaning* changed. A meaning-altering rephrase that still matches
  passes silently; a trivial copy-edit false-positives. The linter flags; a
  human adjudicates.
- **Grep-able manuscript required.** The mechanism assumes the book lives as
  text (Markdown) in the same repo.
- **Format ≠ truth.** A card cannot make weak evidence strong. The evidence
  prose must honestly say when a source is primary, derivative, uncertain,
  qualifying, or contradictory — not hide it behind a status label.
- **Triage is a decision, not a field.** Card the load-bearing, surprising,
  quantitative, historical, current-state, and assumption-sensitive claims; do
  not card every harmless sentence.

## Migration status (2026-05-30)

This spec supersedes the interim `**Claim** (anchor): / Method / Source / Find
in text` format currently in the 47 seeded mirror files. Those remain valid and
are checked by the older `scripts/factcheck_anchors.py` until they are migrated
to the card format above. The new linter only processes files written to this
spec, so the two coexist during the transition.
