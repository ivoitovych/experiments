<!-- INTERNAL DRAFT — do not post as-is. Before posting: re-render the
test sheet on the day of posting, re-verify both links and the line
count, and update every "as of" statement. Posting is a separate,
explicitly authorized action. -->

Cross-posting an independent reproduction of this bug surface from May 2026, together with three additional cases that do not appear in the original Case 1 / Case 2 / Case 3 examples. We built a structured render-surface test sheet at

<https://github.com/ivoitovych/experiments/blob/main/docs/render-tests/math-context-matrix.md>

and an accompanying memo at

<https://github.com/ivoitovych/experiments/blob/main/docs/github-markdown-math-bugs.md>

mapping the actual matrix of containers × math forms × render outcome.

**Confirmed by the test sheet as of our last recorded run (2026,
repository blob rendering — re-verify on the day of posting):**

1. **Block math `$$ ... $$` inside an indented list-item continuation is broken** — cells D8, D9, F8, F9 all render as literal LaTeX source. This is essentially the original Case 3 of this Discussion, reproduced independently and labelled for precise reference.

2. **Inline `\begin{...}` LaTeX environments are broken in every
container we tested** — cells A2, B2, C2, D2, E2, F2, G2, H2, J2, K2
*all* render as literal LaTeX, including A2, the bare top-level case
with no container at all. The test sheet's Section M isolates the
trigger: a 1×1 `pmatrix` with no `&` and no `\\\\` still fails (M1 —
the minimal reproducer), and `matrix`, `bmatrix`, `Bmatrix`,
`vmatrix`, `Vmatrix` variants all fail inline while the same
environments render in display `$$ ... $$` math. So the failure is
the inline `\begin{...}` environment shape, not `pmatrix`
specifically. This is not mentioned in the existing Discussion
threads we could find; it is the most universal of the bugs in this
family.

3. **Norm bars `\\|v\\|` collapse to single bars `|v|` inside
Markdown table cells** — cell H6 (observed). Our working hypothesis —
not yet isolated — is that the `|` characters interact with the
table column separator: a Markdown-table / math-delimiter
interaction rather than anything math-specific.

**Correction to the previous understanding:**

The original Case 2 of this Discussion says that block math inside a plain `>` blockquote is broken. Our test cells B7–B10 all render correctly under the current renderer — block math, including multi-line, including `pmatrix`, including `aligned`, all work inside a plain blockquote. Case 2 may have been fixed since 2024, or the original break may have been triggered by something more specific. Test sheet Sections L and N have since confirmed the diagnosis: a
continuation line inside the equation starting with a Markdown list
marker (`+`, `-`, `*`) breaks the surrounding `$$ ... $$` block —
both inside blockquotes (Section L, where `>`-led continuations also
break) and at top level with no blockquote at all (Section N). That
also explains the `•` bullet that sometimes appears injected into
the broken render. (One stated gap: no top-level `>` control exists,
since a top-level `>` line opens a real blockquote.)

**What would help on GitHub's side:**

1. Document the limitations on the [Writing mathematical expressions](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions) docs page. Even if the parser is hard to fix, a "Known limitations" section listing the four-or-five contexts where math does not enter math mode would save many people from chasing this themselves.

2. Fix inline `\begin{pmatrix}` parsing. This is by far the most common math-source pattern that silently degrades, because inline matrices are natural to write and the breakage cannot be detected from source without a dedicated check.

3. Treat list-marker-led continuation lines inside `$$ ... $$` math
as math, not as the start of a list — confirmed by test sheet
Sections L and N in blockquote and top-level contexts alike.

Happy to send the test sheet as a single Markdown file for a minimal reproducer. The matrix is small enough (≈490 lines) to drop directly into a repo
and render; the Section M1 cell is the one-line minimal reproducer
for the inline-environment bug.
