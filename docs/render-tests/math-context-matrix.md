# GitHub Markdown + MathJax — Render Surface Test Sheet

Purpose: map the **actual** surface of where GitHub's Markdown math
pipeline (attributed to MathJax per GitHub's documentation — a
tested hypothesis, not independently established) renders math
correctly vs incorrectly, instead of relying on guessed rules. Each
cell below is a single test labelled by container letter plus
math-form number (`A1`, `B2`, …). This sheet is the *stimulus set*:
observed outcomes are currently recorded in the companion memo
`docs/github-markdown-math-bugs.md`, not inline here — converting
this file into a dated result matrix (expected/observed/date/
surface/evidence per cell) is queued work. After viewing this file
on GitHub, screenshot each section and mark each cell as **OK**
(rendered as math) or **BROKEN** (rendered as literal LaTeX
source).

All math sources below use the GitHub-friendly escaping we have
already adopted in the manuscript (`\\\\` row breaks, `\\{` braces,
`\\,` thin spaces, `\\|` norm bars). The question we are testing is
which **containers** disrupt the math parser, not whether the
escaping itself is wrong.

The matrix below covers:

- containers: A top-level, B blockquote, C bulleted list (inline),
  D bulleted list continuation (new paragraph indented under bullet),
  E numbered list (inline), F numbered list continuation, G nested
  list (indented bullet inside a bullet), H table cell, I details/summary.
- math forms: 1 simple inline, 2 inline `pmatrix`, 3 inline `\\\\`
  outside `pmatrix`, 4 inline thin space `\\,`, 5 inline set braces
  `\\{...\\}`, 6 inline norm bar `\\|...\\|`, 7 display simple
  single-line, 8 display simple multi-line, 9 display `pmatrix`
  multi-line, 10 display `aligned` multi-line.

Later-added sections extend the matrix beyond this overview:
J (blockquote nested in bullet), K (bullet nested in blockquote),
L (leading-marker continuation lines inside a blockquote),
M (inline-environment isolation), N (top-level marker controls).

---

## A. Top-level baselines (control — every cell should render)

A1 inline simple: $\alpha + \beta$.

A2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.

A3 inline `\\\\` outside pmatrix: $x \\\\ y$ (rarely useful but legal).

A4 inline thin space: $\overline{u}\\, v$.

A5 inline set braces: $x \in \\{0, 1\\}^n$.

A6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.

A7 display simple single-line: $$\alpha + \beta = \gamma$$

A8 display simple multi-line:

$$
\alpha + \beta
= \gamma
$$

A9 display pmatrix multi-line:

$$
A = \begin{pmatrix}
1 & 2 \\\\
3 & 4
\end{pmatrix}
$$

A10 display aligned multi-line:

$$
\begin{aligned}
x &= 1 \\\\
y &= 2
\end{aligned}
$$

---

## B. Inside `>` blockquote

> B1 inline simple: $\alpha + \beta$.
>
> B2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.
>
> B3 inline `\\\\` outside pmatrix: $x \\\\ y$.
>
> B4 inline thin space: $\overline{u}\\, v$.
>
> B5 inline set braces: $x \in \\{0, 1\\}^n$.
>
> B6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.
>
> B7 display simple single-line: $$\alpha + \beta = \gamma$$
>
> B8 display simple multi-line:
>
> $$
> \alpha + \beta
> = \gamma
> $$
>
> B9 display pmatrix multi-line:
>
> $$
> A = \begin{pmatrix}
> 1 & 2 \\\\
> 3 & 4
> \end{pmatrix}
> $$
>
> B10 display aligned multi-line:
>
> $$
> \begin{aligned}
> x &= 1 \\\\
> y &= 2
> \end{aligned}
> $$

---

## C. Inside bulleted list item (math on same line as bullet)

- C1 inline simple: $\alpha + \beta$.
- C2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.
- C3 inline `\\\\` outside pmatrix: $x \\\\ y$.
- C4 inline thin space: $\overline{u}\\, v$.
- C5 inline set braces: $x \in \\{0, 1\\}^n$.
- C6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.
- C7 display simple single-line: $$\alpha + \beta = \gamma$$

---

## D. Inside bulleted list item continuation (new paragraph indented under bullet)

- D parent. The math forms below sit in a continuation paragraph,
  separated by a blank line and indented two spaces.

  D1 inline simple: $\alpha + \beta$.

  D2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.

  D3 inline `\\\\` outside pmatrix: $x \\\\ y$.

  D4 inline thin space: $\overline{u}\\, v$.

  D5 inline set braces: $x \in \\{0, 1\\}^n$.

  D6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.

  D7 display simple single-line: $$\alpha + \beta = \gamma$$

  D8 display simple multi-line:

  $$
  \alpha + \beta
  = \gamma
  $$

  D9 display pmatrix multi-line:

  $$
  A = \begin{pmatrix}
  1 & 2 \\\\
  3 & 4
  \end{pmatrix}
  $$

---

## E. Inside numbered list item (math on same line)

1. E1 inline simple: $\alpha + \beta$.
2. E2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.
3. E3 inline `\\\\` outside pmatrix: $x \\\\ y$.
4. E4 inline thin space: $\overline{u}\\, v$.
5. E5 inline set braces: $x \in \\{0, 1\\}^n$.
6. E6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.
7. E7 display simple single-line: $$\alpha + \beta = \gamma$$

---

## F. Inside numbered list item continuation

1. F parent. The math forms below sit in a continuation paragraph
   under this numbered item, indented three spaces.

   F1 inline simple: $\alpha + \beta$.

   F2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.

   F3 inline `\\\\` outside pmatrix: $x \\\\ y$.

   F4 inline thin space: $\overline{u}\\, v$.

   F5 inline set braces: $x \in \\{0, 1\\}^n$.

   F6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.

   F7 display simple single-line: $$\alpha + \beta = \gamma$$

   F8 display simple multi-line:

   $$
   \alpha + \beta
   = \gamma
   $$

   F9 display pmatrix multi-line:

   $$
   A = \begin{pmatrix}
   1 & 2 \\\\
   3 & 4
   \end{pmatrix}
   $$

---

## G. Nested list (bullet inside a bullet)

- G parent bullet.
  - G1 inline simple: $\alpha + \beta$.
  - G2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.
  - G3 inline `\\\\` outside pmatrix: $x \\\\ y$.
  - G4 inline thin space: $\overline{u}\\, v$.
  - G5 inline set braces: $x \in \\{0, 1\\}^n$.
  - G6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.
  - G7 display simple single-line: $$\alpha + \beta = \gamma$$

---

## H. Inside a table cell

| label | math |
|---|---|
| H1 simple inline | $\alpha + \beta$ |
| H2 inline pmatrix | $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$ |
| H3 inline `\\\\` outside pmatrix | $x \\\\ y$ |
| H4 inline thin space | $\overline{u}\\, v$ |
| H5 inline set braces | $x \in \\{0, 1\\}^n$ |
| H6 inline norm bar | $\\|v\\| = \sqrt{\langle v, v\rangle}$ |

(Display math `$$...$$` deliberately omitted from table cells —
column separator `|` will already collapse multi-line math.)

---

## I. Inside `<details>` / `<summary>` block

<details>
<summary>I summary: $\alpha$ in the summary line</summary>

I1 inline simple: $\alpha + \beta$.

I2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.

I3 inline `\\\\` outside pmatrix: $x \\\\ y$.

I4 inline thin space: $\overline{u}\\, v$.

I5 inline set braces: $x \in \\{0, 1\\}^n$.

I6 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.

I7 display simple single-line: $$\alpha + \beta = \gamma$$

I8 display simple multi-line:

$$
\alpha + \beta
= \gamma
$$

I9 display pmatrix multi-line:

$$
A = \begin{pmatrix}
1 & 2 \\\\
3 & 4
\end{pmatrix}
$$

</details>

---

## J. Mixed: blockquote nested inside a bullet (the §4.14 / §4.13 pattern combined)

- J parent bullet.

  > J1 inline simple: $\alpha + \beta$.
  >
  > J2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.
  >
  > J3 inline thin space: $\overline{u}\\, v$.
  >
  > J4 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.
  >
  > J5 display single-line: $$\alpha + \beta = \gamma$$
  >
  > J6 display multi-line:
  >
  > $$
  > \alpha + \beta
  > = \gamma
  > $$

---

## K. Mixed: bullet nested inside a blockquote

> K parent quote line.
>
> - K1 inline simple: $\alpha + \beta$.
> - K2 inline pmatrix: $A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}$.
> - K3 inline thin space: $\overline{u}\\, v$.
> - K4 inline norm bar: $\\|v\\| = \sqrt{\langle v, v\rangle}$.

---

## L. Hypothesis check: leading character on a continuation line inside blockquote `$$ ... $$`

Section B established that multi-line `$$ ... $$` inside a plain
blockquote renders. This section tests whether the *content* of a
continuation line can break math mode anyway. Hypothesis: a
continuation line whose first non-`>` character is a Markdown list
marker (`+`, `-`, `*`) is misclassified as a list item by the
parser and breaks the surrounding math block.

> L1 control — continuation lines start with letters/digits:
>
> $$
> a + b
> = c
> $$

> L2 continuation line starts with `+`:
>
> $$
> a
> + b
> = c
> $$

> L3 continuation line starts with `-`:
>
> $$
> a
> - b
> = c
> $$

> L4 continuation line starts with `*`:
>
> $$
> a
> * b
> = c
> $$

> L5 continuation line starts with `>` (sub-blockquote):
>
> $$
> a
> > b
> = c
> $$

If L1 renders cleanly and L2 (or any of L3–L5) breaks, the bug is
the leading-character-on-continuation rule, not the blockquote
itself. That would mean the §4.13 sign-convention and `F_4|1⟩`
sanity-check blocks can be unrolled back into blockquotes — the
original breakage was caused by a `+`-led equation continuation,
not by the `>` container.

---

## M. Matrix-environment isolation (top-level inline)

Section A established that inline `$ ... \begin{pmatrix} ... \end{pmatrix} ... $`
is broken. This section isolates which feature of the inline-matrix
form actually trips the parser: the `&` column separator, the
`\\\\` row break, the `\begin/\end` environment shape, or
`pmatrix` specifically.

M1 inline pmatrix 1×1 (no `&`, no `\\\\`): $A = \begin{pmatrix} 1 \end{pmatrix}$.

M2 inline pmatrix 1×n (has `&`, no `\\\\`): $A = \begin{pmatrix} 1 & 2 \end{pmatrix}$.

M3 inline pmatrix n×1 (no `&`, has `\\\\`): $A = \begin{pmatrix} 1 \\\\ 2 \end{pmatrix}$.

M4 inline `matrix` (no brackets): $A = \begin{matrix} 1 & 2 \\\\ 3 & 4 \end{matrix}$.

M5 inline `bmatrix` (square brackets): $A = \begin{bmatrix} 1 & 2 \\\\ 3 & 4 \end{bmatrix}$.

M6 inline `Bmatrix` (curly braces): $A = \begin{Bmatrix} 1 & 2 \\\\ 3 & 4 \end{Bmatrix}$.

M7 inline `vmatrix` (single vertical bars): $A = \begin{vmatrix} 1 & 2 \\\\ 3 & 4 \end{vmatrix}$.

M8 inline `Vmatrix` (double vertical bars): $A = \begin{Vmatrix} 1 & 2 \\\\ 3 & 4 \end{Vmatrix}$.

M9 control — display `pmatrix` (known good baseline):

$$
A = \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix}.
$$

Recorded outcome (companion memo): **M1 breaks** — the 1×1
`pmatrix` with no `&` and no `\\\\` fails, so the `\begin{...}`
environment shape itself is the best-supported trigger.

Interpretation rules, rewritten around that observed M1 failure:

- With M1 failing, M2 and M3 add `&`/`\\\\` *on top of* an
  already-failing baseline, so they cannot isolate the separators as
  independent triggers; that would need a non-environment inline
  construct carrying each separator.
- M4–M8 all contain both separators, so their failures establish
  breadth (not `pmatrix`-specific), not separate causes.
- M9 rendering shows the environment is supported in display math —
  implicating the inline path. Display controls for M4–M8 would be
  needed before concluding each of those environments is itself
  supported.
- Only if a future run finds M1 rendering does the original
  factorial logic apply: M2-only breakage would implicate `&`,
  M3-only `\\\\`, and both breaking would implicate both separators.

---

## N. Top-level controls for the Section L hypothesis

Section L tests leading-character continuation lines *inside a
blockquote*. This section tests the same shapes at top level (no
blockquote), so we can tell whether Bug 4 is blockquote-specific
or a general property of multi-line `$$ ... $$` blocks.

N1 control — alphanumeric continuation at top level:

$$
a + b
= c
$$

N2 top-level `$$ ... $$` with `+`-led continuation:

$$
a
+ b
= c
$$

N3 top-level `$$ ... $$` with `-`-led continuation:

$$
a
- b
= c
$$

N4 top-level `$$ ... $$` with `*`-led continuation:

$$
a
* b
= c
$$

Interpretation rules:

- If N2 (top-level) renders cleanly *and* L2 (blockquoted) breaks
  ⇒ Bug 4 is blockquote-specific: the parser misclassifies the
  `+`-led line as a list item only when it appears under a `>`
  blockquote, where list markers naturally nest.
- If N2 breaks at top level too ⇒ Bug 4 is general *for the tested
  pattern*: a `+`-led continuation line inside multi-line
  `$$ ... $$` breaks math mode, blockquote or not. The lint rule
  flags the pattern in any block-math context as a deliberate
  overapproximation of the tested cases.

Known gap: Section L includes a `>`-led continuation (L5) but N has
no top-level counterpart — a top-level line beginning with `>`
opens a real blockquote, which confounds the control. Until such a
case is designed, the top-level (non-blockquote) generalization is
established for `+`, `-`, `*` only; `>` is flagged conservatively
as lint policy, not as proven top-level bug breadth.

---

## How to report findings

For each cell that renders **broken** (literal `$`, missing math
glyphs, escaped backslashes visible), note the label — plus the run
date, commit, GitHub surface (blob/README/gist), and browser, and
distinguish *not run* from *passed*. The cleanest core output is a
list of broken labels; the block below is an **illustrative format
example, not a recorded run** (it predates Sections M/N and omits
cells the companion memo reports broken):

```
B2, B7, B8, B9, B10
D2, D7, D8, D9
F2, F7, F8, F9
J2, J5, J6
K2
```

A dated list of broken labels records the observed failure set for
that run's surface — the causal parser story still needs controls
and DOM-level evidence. From there we can:

- decide which container × math-form combinations need workarounds in
  the manuscript;
- write lint rules that flag those combinations at source level;
- file a single, precise upstream report (or comment on
  `community/community#122438`) using the matrix as the repro.

The K cells (bullet inside blockquote) and J cells (blockquote
inside bullet) are the most deeply nested cases — but parser
behavior is not ordered by apparent nesting complexity (a plain
table cell or a marker pattern can fail for unrelated grammar
reasons), so clean J/K cells license no "safe everywhere"
conclusion. Only the full matrix does.
