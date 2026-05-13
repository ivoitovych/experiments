# GitHub Markdown + MathJax — Render Surface Test Sheet

Purpose: map the **actual** surface of where GitHub's Markdown +
MathJax renders math correctly vs incorrectly, instead of relying on
guessed rules. Each cell below is a single test labelled
`[container]-[math-form]`. After viewing this file on GitHub, the
user can screenshot each section and we can mark each cell as
**OK** (rendered as math) or **BROKEN** (rendered as literal LaTeX
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

## How to report findings

For each cell that renders **broken** (literal `$`, missing math
glyphs, escaped backslashes visible), note the label. The cleanest
output is just a list of broken labels:

```
B2, B7, B8, B9, B10
D2, D7, D8, D9
F2, F7, F8, F9
J2, J5, J6
K2
```

That single list of broken labels gives us the exact bug surface,
without speculation. From there we can:

- decide which container × math-form combinations need workarounds in
  the manuscript;
- write lint rules that flag those combinations at source level;
- file a single, precise upstream report (or comment on
  `community/community#122438`) using the matrix as the repro.

The K cells (bullet inside blockquote) and J cells (blockquote
inside bullet) are likely the **hardest** for the parser; if those
are clean, our manuscript pattern is safe everywhere.
