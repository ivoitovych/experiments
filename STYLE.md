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
- Pre-render circuit diagrams to SVG; the source generator lives under
  `figures-src/` (see *Diagrams* below) so any figure can be regenerated.

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

**Chapter-closing conventions** (adjudicated 2026-07-04, after the
comprehensive review found seven coexisting styles):

- **Bridge section**: each chapter ends with a *numbered* H2 bridge
  section (`## N.M Bridge to Chapter N+1`). Merging the bridge into a
  transitional final numbered section (as Chapters 2, 22, 24, 25, 27,
  and 29–32 do) is also acceptable; unnumbered or unheaded bridges are
  not. Chapters 8, 19, 23, 34, and 36 end on their last content section
  with no bridge (documented in TOC.md's reconciliation note), the
  Historical Prelude closes on its own runway, and Chapter 37 has
  nothing to bridge to. `tools/lint.py` enforces this list
  (`MERGED_OR_NO_BRIDGE`); extending it requires a matching
  adjudication here.
- **Sanity checks**: rendered as a bold run-in paragraph
  `**Sanity checks before moving on.**` followed by a numbered list,
  inside the bridge (or final) section — not as their own H2 heading,
  not blockquoted. Answers stay out of the checks; the two sanctioned
  exceptions (the front-matter self-check and Chapter 3) are named in
  the Preface.
- **Phase field**: the status block's `**Phase:** N` records the file's
  assignment in the *original writing plan* (`scripts/phases.py`) and is
  retained as historical metadata; it does not track revision state
  (that is what **Status** is for). `tools/lint.py` checks each file's
  Phase against `phases.py`.
- **Status-block section count**: `Sections drafted: k / M` counts the
  chapter's *numbered* `## N.x` sections — including a numbered bridge,
  excluding unnumbered extras (timeline, source notes, per-letter index
  groups). Front-matter files without numbered sections count all H2s.
- **Part references**: canonical part names are Roman (Part I–XIII), as
  in README/TOC/Preface; Arabic shorthand ("Part 8") is accepted in
  running chapter prose. Do not mix the two styles within one file.

**Historical Prelude local conventions** (adjudicated 2026-07-04; these
are deliberate, not drift):

- The Prelude sets its math in backtick code spans with Unicode
  (`` `|Φ⁺⟩ = (|00⟩+|11⟩)/√2` ``) rather than `$…$` LaTeX. This is an
  accepted file-local convention: the chapter is narrative history, the
  code style is robust against the renderer bugs currently tracked by
this repository (`docs/github-markdown-math-bugs.md`), and converting it would churn a
  heavily verified file for no reader benefit.
- The Prelude's four `# Episode` headings are additional H1s by design
  (episode structure outranks section structure there). Tooling that
  slices by H2 should treat the Prelude as a known exception.

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
- **Thin spaces and norm bars**: the same backslash-eating applies to
  `\,` (thin space) and `\|` (norm bars) — a single backslash renders
  as a literal `,` or breaks the norm. Write `\\,` and `\\|` in source.
  Full escape table (single → doubled in source): `\\` → `\\\\` (matrix
  row breaks), `\{`/`\}` → `\\{`/`\\}`, `\,` → `\\,`, `\|` → `\\|`.
  The empirical basis for all of these is the canonical renderer-bug
  memo, [docs/github-markdown-math-bugs.md](docs/github-markdown-math-bugs.md),
  with its live test sheet in `docs/render-tests/`; consult it before
  introducing any new math construct.
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

## Language and spelling

- **American English throughout** — prose, headings, code comments, and
  figure text. This follows the field's convention, researched and
  protocolled in
  `reviews/analysis-2026-07-19-spelling-convention.md`: APS journals
  (PRA/PRL/PRX Quantum) mandate American English; the field's
  term-coining titles are American (Gottesman's *stabilizer* codes,
  Knill's *randomized* benchmarking, Bombín's *color* codes,
  Low–Chuang *qubitization*, Tang's *dequantization*, QAOA's
  *optimization*); and the canonical textbooks (Nielsen–Chuang,
  Preskill, Mermin, Watrous, Wilde) are American-spelled.
- Enforced by lint: `tools/lint.py` checks the project dictionary
  `tools/spelling-gb-us.txt` (always) and, when `codespell` is
  installed, its builtin `en-GB_to_en-US` dictionary with a
  hyphen-splitting word regex (so compounds like "nearest-neighbour"
  are caught).
- **Legitimate British text is exempt via allowlist**: quoted paper
  titles, proper nouns, and institution names that are British-spelled
  in the original go in `tools/spelling-allowlist.txt` as exact
  phrases — never "correct" a quotation or a name.
- Nouns identical in both dialects (e.g. "analyses", "cancellation")
  need no attention; the verb forms (analyze/canceled) follow American.

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

- A cross-reference is a **signpost to where a topic is developed further,
  never a prerequisite for understanding the passage it sits in.** The book
  is written for selective readers who land in a section directly (see the
  Preface, *Reading Linearly vs. Reading Selectively*), so each section must
  carry its own context: name the fact, person, or result inline rather than
  leaning on "the X of Section Y." Prefer deliberate, controlled repetition
  over a reference the reader is forced to chase. Forward pointers of the
  "developed in full in Chapter N" kind are invitations and are encouraged;
  back-references that assume the reader has already read another section are
  not. (This does not deny the real dependency chain among the core teaching
  chapters 4–9, which the Preface states plainly — it governs how a section
  reads when entered cold.)
- Refer to chapters and sections by number in prose:
  "see Section 8.6 in [Chapter 8](../part-04-gates-and-circuits/08-quantum-gates.md)".
- Use relative file paths for inter-file links.
- Anchor links use auto-generated heading slugs (lowercase, dashes).

## Diagrams

The figure pipeline is in place; figures are added incrementally, and a
chapter drafted before its diagram lands describes it in prose until the
figure is backfilled. Several circuit figures are generated and embedded
across the manuscript; see `figures-src/generate_figures.py` (quantum
circuits, Qiskit drawer) and `figures-src/generate_diagrams.py`
(conceptual diagrams, plain matplotlib) for the authoritative lists.

- **Quantum circuits → SVG**, generated by `figures-src/generate_figures.py`
  (Qiskit's matplotlib drawer); no LaTeX toolchain required. Run
  `make figures` to regenerate: the script writes the committed SVG to
  `book/<part>/figures/<name>.svg` and a PNG preview to `.artifacts/figures/`
  (gitignored) so the diagram can be eyeballed for correctness before the SVG
  is embedded. Quantikz/Tikz source under `figures-src/` remains acceptable
  for figures that need it, if a TeX install is present.
- **Block diagrams → SVG or Mermaid** (`mermaid` code block). Mermaid renders
  natively on GitHub but not in plain Pandoc/PDF builds without a filter;
  prefer SVG where cross-renderer fidelity matters.
- **Plots → SVG**, generated from a checked-in script in `figures-src/`.
- Always include alt text: `![CNOT circuit acting on two qubits](figures/cnot.svg)`.
- One-time setup for the figure tools: `make figures-setup` (creates `.venv`
  and installs `figures-src/requirements.txt`).

## Authorship and history

- All commits authored as `Iaroslav Voitovych <yaroslav.voytovych@gmail.com>`.
