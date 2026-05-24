# Style and Source Conventions

These conventions keep the manuscript portable across GitHub's renderer,
mdBook, Pandoc, and other Markdown toolchains. Follow them in every file.

---

## File and directory layout

- One chapter per Markdown file under `book/part-XX-<slug>/NN-<slug>.md`.
- Front matter under `book/00-front-matter/`.
- Appendices under `book/99-back-matter/`.
- Numeric prefixes drive filesystem ordering and match reading order.
- Figures live alongside the chapter that uses them, e.g.
  `book/part-04-gates-and-circuits/figures/cnot.svg`.
- Pre-render circuit diagrams to SVG (or PNG) — Tikz/Quantikz source
  may be kept under `figures-src/` for regeneration.

## Per-chapter structure

Every chapter file begins with:

1. A top-level `# Chapter N. Title` heading.
2. A blockquoted status block:
   `> **Status:** stub · **Phase:** N · **Sections drafted:** 0 / M`.
3. A navigation line: `[← Previous] · [Table of Contents] · [Next →]`.
4. Numbered section headings: `## N.1 Section Title`, `## N.2 ...`.
5. The same navigation line at the bottom.

Use `---` (horizontal rule) before the trailing nav block to separate it
from chapter content.

## Math

Math is written in **LaTeX**, restricted to features that render natively
on **all** of: GitHub web view, mdBook + MathJax, and Pandoc.

- Inline math: `$ ... $`
- Display math: `$$ ... $$` on its own paragraph
- **Do not** rely on the MathJax `physics` package — GitHub does not load
  it. Write `|\psi\rangle`, `\langle\phi|`, `\langle\phi|\psi\rangle`
  instead of `\ket{\psi}`, `\bra{\phi}`, `\braket{\phi}{\psi}`.
- **Do not** use `\label{}`, `\ref{}`, `\tag{}`, or `\newcommand{}`
  (no global macros across files; GitHub's renderer ignores most of these).
- **Do not** use `\operatorname{}` — GitHub's MathJax rejects it with
  "macro is not allowed". Use `\mathrm{}` instead, e.g. `\mathrm{tr}`,
  `\mathrm{Var}`, `\mathrm{rank}`.
- **Matrix row breaks**: GitHub's Markdown processor consumes `\\` before
  passing math to MathJax, so a single `\\` inside `\begin{pmatrix} ... \end{pmatrix}`
  collapses the matrix into a row vector. Write `\\\\` in source for every
  row break.
- **Set braces**: similarly, `\{` and `\}` get unescaped to `{` `}` before
  MathJax sees them, which makes the braces invisible. Write `\\{` and
  `\\}` in source whenever you want visible set braces (e.g. `\\{0,1\\}^n`).
- Number equations manually if needed: end the line with `\quad (1.3.1)`
  or similar.
- Avoid heavy math inside Markdown tables — escapes get fragile.
- Use `\mathbb{C}`, `\mathbb{R}`, `\mathbb{Z}` for number sets.
- Use `\otimes` for tensor product, `\dagger` for adjoint, `\hat{H}`
  for operators when emphasis helps.

## Notation defaults

- Computational basis kets: `|0\rangle`, `|1\rangle`.
- Generic ket: `|\psi\rangle`. Generic bra: `\langle\phi|`.
- Inner product: `\langle\phi|\psi\rangle`.
- Outer product: `|\psi\rangle\langle\phi|`.
- Pauli operators: `X`, `Y`, `Z` (no hats unless disambiguating).
- Identity: `I` (single-qubit) or `I_n` (n-qubit).
- Tensor product of states: `|0\rangle \otimes |1\rangle`, may be
  abbreviated to `|01\rangle` after the convention is introduced.

## Markdown rules

- One sentence per line is acceptable but not required; use whatever
  gives the cleanest diffs.
- Hard-wrap prose at ~100 columns when reasonable.
- Code blocks: triple backticks with a language tag (` ```python `,
  ` ```qasm `, ` ```text `).
- Use `**bold**` for new term introduction, `*italic*` for emphasis,
  `` `code` `` for symbols, code identifiers, and gate names in prose.
- Use blockquotes (`>`) for definitions, theorems, and asides.
- Use horizontal rules (`---`) sparingly — only as section/footer
  separators.

## Cross-references

- Refer to chapters and sections by number in prose:
  "see Section 8.6 in [Chapter 8](../part-04-gates-and-circuits/08-quantum-gates.md)".
- Use relative file paths for inter-file links.
- Anchor links use auto-generated heading slugs (lowercase, dashes).

## Diagrams

The figure pipeline is being introduced incrementally. Most chapters
currently describe circuits and block diagrams in prose; the conventions
below are the target for newly added figures and for backfilling existing
chapters — not a claim that every diagram already exists.

- Quantum circuits → SVG (rendered from Quantikz/Tikz source).
- Block diagrams → SVG or Mermaid (`mermaid` code block). Mermaid renders
  natively on GitHub but not in plain Pandoc/PDF builds without a filter;
  prefer SVG where cross-renderer fidelity matters.
- Plots → SVG, generated from a checked-in script in `figures-src/`.
- Always include alt text: `![CNOT circuit acting on two qubits](figures/cnot.svg)`.

## Authorship and history

- All commits authored as `Iaroslav Voitovych <yaroslav.voytovych@gmail.com>`.
