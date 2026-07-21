# GitHub Markdown + MathJax Rendering Bugs — Memo

Single source of truth for the renderer-bug knowledge this project
has accumulated. All other artifacts in the repo (the gotcha entries
in `PROCESS.md`, the rules in `tools/lint.py`, the upstream-feedback
drafts in `docs/upstream-feedback/`) derive from this memo. When the
evidence changes, update this file first, then propagate.

## Authoritative evidence

`docs/render-tests/math-context-matrix.md` is the test sheet — a
manually re-run fixture, not a continuously monitored one: claims
hold as of the last recorded run, on the tested surfaces
(repository blob/README rendering; the math pipeline GitHub shipped
at run time, attributed to MathJax per GitHub's documentation
rather than inferred from symptoms). Cell labels
(A1, B2, …, L4) are stable references; when re-running the test,
report the list of broken cells and update this memo accordingly.

## Bug catalog

Five bug patterns are confirmed as of the last test run. "Distinct"
means distinct source-level triggers with distinct workarounds —
some may ultimately be interactions between CommonMark container
parsing, table pipes, escaping, and math rendering rather than five
independent renderer defects; what the sheet establishes is the
observed behavior on the tested surfaces. Each entry
gives the cell evidence, the source-level pattern that triggers it,
the workaround we use in the manuscript, and whether `tools/lint.py`
currently catches it.

### Bug 1 — Markdown unescapes one layer of backslashes before MathJax

Cell evidence: any inline math containing a single `\\` row break
inside `pmatrix` (e.g., the precursor to A2 with `\\` instead of
`\\\\`), single `\{` / `\}` set braces, single `\,` thin space, or
single `\|` norm bar all render with one fewer backslash than the
source contains.

Best-supported explanation (black-box): GitHub's Markdown processor applies one round of
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

### Bug 2 — Inline LaTeX environments are broken in every tested container

Cell evidence: A2, B2, C2, D2, E2, F2, G2, H2, J2, K2 (inline
`pmatrix` in every container) all render as literal LaTeX. The
Section M isolation, run after the original diagnosis, confirms the
bug is broader than `pmatrix`:

- M1 (1×1 `pmatrix`, no `&`, no `\\\\`) breaks → the column
  separator and the row break are *not* the trigger.
- M4 (`matrix`), M5 (`bmatrix`), M6 (`Bmatrix`), M7 (`vmatrix`),
  M8 (`Vmatrix`) all break → not specific to `pmatrix`.
- M9 (display `pmatrix`) renders → the bug is in the inline-math
  parser, not in MathJax's environment support.

Best-supported explanation (black-box): GitHub's inline-math parser does not handle the
`\begin{...}` ... `\end{...}` environment form. Any inline math
containing `\begin{X}` for any environment `X` exits math mode
and renders as literal LaTeX.

Workaround: never use `\begin{...}` inside `$...$`. Promote to
display math `$$ ... $$` on its own paragraph. Display math
handles environments correctly except where Bug 3
(indented list-item continuations) or Bug 4 (leading-list-marker
continuations) also apply. For environments that would naturally
appear in the middle of a sentence, rewrite to put the display
math on its own line before or after the surrounding prose, or
replace the matrix with a named form (e.g., write
`\tfrac{1}{\sqrt 2} I` for the scaled identity rather than the
explicit 2×2).

Lint coverage: `check_inline_latex_env` in `tools/lint.py` —
matches any `$...\begin{...}...$`, not just `pmatrix`.

### Bug 3 — `$$ ... $$` inside an indented list-item continuation

Cell evidence: D8, D9, F8, F9 all render display math indented as a
continuation paragraph under a bulleted or numbered list item as
literal LaTeX source. The closely-related J6 (display math inside a
blockquote that is itself inside a bullet) is also broken.

Best-supported explanation (black-box): the block-math parser does not enter math mode when the
opening `$$` line is preceded by list-item indentation. Inline
`$...$` works in the same context.

Workaround: convert the surrounding list to bold-prefixed paragraphs
and unindent the equation to column zero. Inline math *without*
`\begin{...}` environments is fine in every tested container
(inline environments break everywhere — Bug 2), so short
environment-free formulas can stay inline; only `$$ ... $$` needs
to be lifted out.

Lint coverage: `check_nested_display_math` in `tools/lint.py`.

### Bug 4 — A continuation line that starts with a Markdown list marker breaks the surrounding `$$ ... $$` block (all tested contexts)

Cell evidence: confirmed by Sections L and N. A continuation line
whose first non-whitespace character is a Markdown list/quote
marker (`+`, `-`, `*`, `>`) breaks the surrounding `$$...$$` math
block.

- L1 (alphanumeric continuation, *inside blockquote*) — rendered.
- L2, L3, L4, L5 (`+`/`-`/`*`/`>`-led continuation, *inside
  blockquote*) — all broken.
- N1 (alphanumeric continuation, *top level*) — rendered.
- N2, N3, N4 (`+`/`-`/`*`-led continuation, *top level*) — all
  broken.

The blockquote is incidental. The bug applies to any multi-line
`$$ ... $$` block, blockquoted or not.

Best-supported explanation (black-box): when a line that starts with `+`, `-`, `*` (bullet
markers) or `>` (blockquote marker) appears between the opening
and closing `$$`, Markdown reads it as the start of a new
block-level construct and breaks the math block. The list/quote
marker outranks the math-delimiter parser.

Workaround: ensure that no source line inside a `$$ ... $$` block
begins with `+`, `-`, `*`, or `>`. Common fix: move the operator
to the end of the previous line so the continuation begins with
its operand instead.

Original §4.13 manuscript note: the sign-convention and `F_4|1⟩`
sanity-check blocks were demoted to plain paragraphs in an earlier
round because the over-broad "$$ in blockquote is broken"
diagnosis. Now that Bug 4 is precise, both blocks *can* be unrolled
back into blockquotes — they just need an equation reformat so no
inner line starts with a list marker. The decision on whether to
unroll is in the project changelog.

Lint coverage: `check_list_marker_continuation` in `tools/lint.py`
(walks each `$$...$$` block, flags any inner line starting with
`+`, `-`, `*`, or `>`).

### Bug 5 — Norm bars `\\|...\\|` collapse to single bars inside Markdown table cells

Cell evidence: H6 rendered `\\|v\\|` as `|v|` (single bars). All
other H-cells rendered correctly.

Best-supported explanation (black-box): the `|` characters in `\\|` conflict with the Markdown
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
  `tools/render-gist.py` against the test sheet. The gist-based
  reproducer is therefore the project's primary fast loop for
  renderer-bug investigation.
- **Is inline `pmatrix` broken because of `&`, `\\\\`, the
  environment shape, or `pmatrix` specifically?** Answered by
  Section M: it's the `\begin{...}` environment shape — every
  variant (`matrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix`,
  and a 1×1 `pmatrix` with no `&` and no `\\\\`) breaks. Bug 2 is
  now stated in those broader terms.
- **Is Bug 4 (leading-list-marker continuation) blockquote-specific
  or general?** Answered by Sections L and N: general. Top-level
  multi-line `$$ ... $$` also breaks if a continuation line begins
  with `+`, `-`, `*`, or `>`. The lint rule applies to any
  block-math context.

## How to use this memo

- Read it before writing math-heavy Markdown.
- When you discover a new renderer bug, add a cell to the test
  sheet, render it, add a section here, then update the lint and
  the gotcha pointer in `PROCESS.md`. Do not let the catalogue
  drift back to "internal knowledge in one person's head."
- When the upstream tooling at `github/cmark-gfm`, GitHub's own
  Markdown renderer, or MathJax changes, re-run the test sheet
  and update this memo. The cell labels are stable.
