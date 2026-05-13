# GitHub Markdown + MathJax Rendering Bugs — Memo

Single source of truth for the renderer-bug knowledge this project
has accumulated. All other artifacts in the repo (the gotcha entries
in `PROCESS.md`, the rules in `tools/lint.py`, the upstream-feedback
drafts in `docs/upstream-feedback/`) derive from this memo. When the
evidence changes, update this file first, then propagate.

## Authoritative evidence

`docs/render-tests/math-context-matrix.md` is the live test sheet.
Every claim in this memo is justified by a cell in that sheet,
rendered against the current GitHub MathJax pipeline. Cell labels
(A1, B2, …, L4) are stable references; when re-running the test,
report the list of broken cells and update this memo accordingly.

## Bug catalog

Five distinct bugs are confirmed at the time of writing. Each entry
gives the cell evidence, the source-level pattern that triggers it,
the workaround we use in the manuscript, and whether `tools/lint.py`
currently catches it.

### Bug 1 — Markdown unescapes one layer of backslashes before MathJax

Cell evidence: any inline math containing a single `\\` row break
inside `pmatrix` (e.g., the precursor to A2 with `\\` instead of
`\\\\`), single `\{` / `\}` set braces, single `\,` thin space, or
single `\|` norm bar all render with one fewer backslash than the
source contains.

Root cause: GitHub's Markdown processor applies one round of
backslash unescaping inside `$...$` and `$$...$$` before MathJax
sees the math. So `\\` in source becomes `\`, `\{` becomes `{`, and
so on.

Manifestations:
- `\\` matrix row break — matrices collapse to row vectors.
- `\{` / `\}` — set braces become invisible MathJax grouping.
- `\,` thin space — renders as a literal comma.
- `\|` norm bar — collapses to a modulus `|`.

Workaround: write `\\\\`, `\\{`, `\\}`, `\\,`, `\\|` in source.

Lint coverage: `BAD_SINGLE_BS`, `BAD_BRACE`, `BAD_THIN_SPACE`,
`BAD_NORM_BAR` in `tools/lint.py`.

### Bug 2 — Inline `pmatrix` is broken in every container

Cell evidence: A2, B2, C2, D2, E2, F2, G2, H2, J2, K2 all render
inline `$ ... \begin{pmatrix} ... \\\\ ... \end{pmatrix} ... $` as
literal LaTeX source. No container is safe.

Root cause: the inline-math parser exits on the `&` column separator
(or the `\\` row break that survives Bug 1), before MathJax can
parse the matrix.

Workaround: never use `pmatrix` inside `$...$`. Always promote to
display math `$$ ... $$` on its own paragraph. Display math handles
`pmatrix` cleanly in every container except indented list-item
continuations (see Bug 3).

For matrices that would naturally appear in the middle of a
sentence, rewrite to put the display math on its own line before or
after the surrounding prose, or replace the matrix with a named
form (e.g., write `\tfrac{1}{\sqrt 2} I` for the scaled identity
rather than the explicit 2×2).

Lint coverage: `check_inline_pmatrix` in `tools/lint.py`.

### Bug 3 — `$$ ... $$` inside an indented list-item continuation

Cell evidence: D8, D9, F8, F9 all render display math indented as a
continuation paragraph under a bulleted or numbered list item as
literal LaTeX source. The closely-related J6 (display math inside a
blockquote that is itself inside a bullet) is also broken.

Root cause: the block-math parser does not enter math mode when the
opening `$$` line is preceded by list-item indentation. Inline
`$...$` works in the same context.

Workaround: convert the surrounding list to bold-prefixed paragraphs
and unindent the equation to column zero. Inline math is fine in
any container, so short formulas can stay inline; only `$$ ... $$`
needs to be lifted out.

Lint coverage: `check_nested_display_math` in `tools/lint.py`.

### Bug 4 — Blockquote-`$$` is fine, *except* when an equation continuation line starts with a Markdown list marker

Cell evidence: B7, B8, B9, B10 all rendered correctly — display math
inside a plain `>` blockquote works. *But* the §4.13 `F_4|1⟩` sanity
check originally broke; the only suspicious feature was an equation
continuation line that began with `+`. Section L of the test sheet
tests this hypothesis directly:

- L1 control (alphanumeric continuation) — expected OK.
- L2 (`+`-led continuation) — expected to break if hypothesis holds.
- L3 (`-`-led continuation) — same.
- L4 (`*`-led continuation) — same.
- L5 (`>`-led continuation) — sub-blockquote interaction.

Status: **partial confirmation pending**. The L-section results
from a render pass against this commit will settle it; until then
the rule is conservative.

Workaround (until confirmed): pull display math out of blockquotes
*only* when the equation has a `+`, `-`, `*`, or `>` at the start
of any source line inside it. The current manuscript has §4.13's
sign-convention and `F_4|1⟩` sanity-check blocks demoted to plain
paragraphs as a result of the earlier (over-broad) workaround;
these can be unrolled back into blockquotes once §L confirms.

Lint coverage: not currently encoded — needs §L results first.

### Bug 5 — Norm bars `\\|...\\|` collapse to single bars inside Markdown table cells

Cell evidence: H6 rendered `\\|v\\|` as `|v|` (single bars). All
other H-cells rendered correctly.

Root cause: the `|` characters in `\\|` conflict with the Markdown
table column separator. The table parser strips one bar before
MathJax sees the math.

Workaround: avoid norm bars inside Markdown table cells. Convert the
table to a bullet list, or rewrite the cell to use a named form
("operator norm of `A`") instead of the bar notation.

Lint coverage: not currently encoded (would require parsing table
context).

## Things we explicitly do *not* know

- Whether `\operatorname{...}` is blocked permanently or whether
  GitHub's MathJax configuration could be amended. We use
  `\mathrm{...}` instead and the question is moot for us; mentioned
  here because it sometimes gets confused with the unescape family.
- Whether the macros from the LaTeX `physics` package are blocked
  intentionally. We use raw `\langle` / `\rangle` instead.
- Whether `\\\\` outside `pmatrix` in inline math (cell A3, B3, …)
  silently dropped because MathJax discards it inline or because
  GitHub's parser swallows it. The visible behaviour is the same:
  the row-break is a no-op in inline math.

## Open questions answered

- **Does `gist.github.com` render math the same way as repo blob
  URLs do?** Answered yes on the first run of
  `tools/render-gist.py` against the test sheet
  (`make render-gist FILE=docs/render-tests/math-context-matrix.md`
  produced rendered PNGs with no "WARN math-wait timed out"
  warning, meaning the script's math-wait function found
  `mjx-container` elements). The gist-based reproducer is therefore
  the project's primary fast loop for renderer-bug investigation.

## How to use this memo

- Read it before writing math-heavy Markdown.
- When you discover a new renderer bug, add a cell to the test
  sheet, render it, add a section here, then update the lint and
  the gotcha pointer in `PROCESS.md`. Do not let the catalogue
  drift back to "internal knowledge in one person's head."
- When the upstream tooling at `github/cmark-gfm`, GitHub's own
  Markdown renderer, or MathJax changes, re-run the test sheet
  and update this memo. The cell labels are stable.
