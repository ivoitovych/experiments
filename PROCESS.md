# Process

This document records *how* this book is being written: the working
method, the toolchain, the rendering gotchas that have cost us time,
and the major decisions made along the way. STYLE.md captures *what*
the conventions are; PROCESS.md captures *why* they exist and *how* a
chapter moves from blank stub to frozen final draft.

The goal is institutional memory. If work pauses and resumes later,
or if the writing process needs to be explained to a new contributor,
this file should make the picture recoverable without rereading every
commit.

---

## Working method

The book is structured as one Markdown file per chapter under
`book/part-XX-<slug>/NN-<slug>.md`, with front matter under
`book/00-front-matter/` and appendices under `book/99-back-matter/`.
Forty-five files total: thirty-seven chapters plus three front-matter
files and five appendices.

Each file carries a status block at the top, immediately after the
chapter heading:

> **Status:** *state* · **Phase:** N · **Sections drafted:** k / M

Status states in order of completeness:
`stub` → `outlined` → `draft` → `reviewed` → `final`.

`PROGRESS.md` is generated from these blocks by
`scripts/generate_progress.py` and should be regenerated after any
status change.

Chapters are drafted in **phase** order, not reading order. Phases are
defined in `scripts/phases.py` and group chapters that depend on the
same prerequisite material. Drafting in phase order means each new
chapter can lean on already-drafted prerequisites instead of forward
references.

## Review loop

Each chapter goes through a draft → review → revise cycle until the
primary reviewer signs off. Observed pattern from Chapter 4:

- **Rounds 1–4**: substantive — factual corrections, missing sections,
  reordering. Each round produces real structural change.
- **Rounds 5–8**: precision and convention — wording, naming,
  qualifiers, micro-traps.
- **Rounds 9–12**: polish — paragraph order, terminology unification,
  small worked examples, occasional newly-spotted gaps.

The signal to freeze is when the reviewer's own assessment shifts to
"structurally ready" or "this is polish, not rework", and when each
round produces only optional refinements rather than corrections.

A reviewer naming an *omission* (the commutator section in Chapter 4
that nine prior reviews had missed) is reason to keep iterating even
past the polish threshold: that level of correction has compounding
value because every later chapter inherits the foundation.

Foundational chapters get more rounds than later ones by design.
They set the conventions, the tone, and the sanity-check format that
the rest of the book follows; the cost of getting them right pays for
itself across every chapter that builds on them.

## Toolchain

| Tool | Make target | Purpose |
|---|---|---|
| `scripts/scaffold.py` | — | Generates the directory tree and stub files from `ENTRIES`. Idempotent — safe to re-run; skips existing files. |
| `scripts/phases.py` | — | Single source of truth for the phase mapping. Imported by other scripts. |
| `scripts/generate_progress.py` | `make progress` | Regenerates `PROGRESS.md` from the status blocks in every manuscript file. Re-run after editing any status. |
| `tools/lint.py` | `make lint` | Enforces structural and notational invariants. Catches source-detectable rendering bugs (see *Known renderer gotchas* below). |
| `tools/screenshots.py` | `make screenshots CHAPTER=...` | Drives headless Chromium against the GitHub-rendered page to capture per-section PNGs for human visual review. See *Screenshot workflow* below. |

General principle: source-detectable problems are caught by lint;
render-visible problems are caught by screenshot review. The cheaper
layer should catch what it can, so human review is reserved for the
things only a human can judge.

## Screenshot workflow

Screenshots are *review artifacts*, not source. The repo contains the
generator (`tools/screenshots.py`) and the conventions for what to
look at; the PNGs themselves stay outside the commit process.

| Artifact | Committed? | Location |
|---|---|---|
| The generator | yes | `tools/screenshots.py` |
| Routine review screenshots | no | `.artifacts/screenshots/<short-sha>/<chapter-slug>/` (gitignored) |
| Visual-regression baselines | only if needed | `book/<part>/screenshots/golden/` |
| Release / marketing screenshots | yes | `assets/screenshots/` |

Setup (one-time on the local machine that runs captures):

```
sudo apt install python3-venv python3-pip   # Ubuntu/Debian only
make setup
```

The apt step is needed on a fresh Ubuntu 24.04 install because
Python's `venv` module is not bundled with the minimal Python
package. The Makefile detects this case and prints the exact apt
command if the package is missing, so an unprepared machine fails
with a clear message rather than the underlying "ensurepip is not
available" error.

`make setup` then creates a `.venv` at the repo root, installs
Playwright into it, and downloads Chromium into the shared
Playwright cache (`~/.cache/ms-playwright/`). The target is
idempotent — it touches a sentinel after success and becomes a no-op
on subsequent runs.

The tool drives a real headless Chromium against the actual GitHub
blob URL for a given commit, then captures one PNG per section
(header + each `H2`). It needs unrestricted network access to
`github.com` and `github.githubassets.com` — GitHub's math rendering
is client-side and the JS bundle lives on the assets CDN.

Per-chapter review loop:

1. Edit the Markdown.
2. Commit and push, so the chapter is reachable at a specific commit
   SHA. (Local diffs do not show up at `github.com/.../blob/<sha>/...`.)
3. `make lint` — fast, catches source-detectable bugs.
4. `make screenshots CHAPTER=book/part-XX-.../NN-...md` — writes PNGs
   under `.artifacts/screenshots/<short-sha>/<chapter-slug>/`. (Runs
   `make setup` automatically the first time.)
5. Open the directory in an image viewer and walk through it.
6. Fix anything visible. Go back to step 1.
7. When clean: commit Markdown + lint + tooling. PNGs stay on disk,
   ignored by git, and can be removed at any time with
   `make clean-artifacts`.

Baselines for visual regression are deferred until a real miss
demonstrates the need; every legitimate edit invalidates baselines
and the maintenance cost is real.

CI is not used for this. The book has a single author, no external
PRs, and a sub-second local lint loop. If external contributors
appear later, add a CI job that runs lint on every PR and uploads
screenshots as PR artifacts for the maintainer to eyeball.

## Known renderer gotchas

Each entry is a real bug we have hit on GitHub's MathJax renderer.
The lint encodes the *pattern*; this section encodes the *story*.

### `\\` inside `pmatrix` row breaks

Symptom: column vectors and 2×2 matrices render as row vectors —
`\begin{pmatrix} 1 \\ 0 \end{pmatrix}` shows as `(1 0)`.

Cause: GitHub's Markdown processor unescapes one layer of backslashes
before passing the math to MathJax. `\\` in source becomes `\`, and
MathJax sees no row separator.

Fix: write `\\\\` (four backslashes in source) for every matrix-row
break.

### `\{` and `\}` for visible set braces

Symptom: `\{0,1\}^n` renders as `0,1^n` — no visible braces.

Cause: same one-layer unescape. `\{` becomes `{`, which MathJax
treats as an invisible grouping character.

Fix: write `\\{` and `\\}` in source for *visible* braces.

### `\,` thin space

Symptom: `\overline{u_i}\, v_i` renders as `ū_i, v_i` — a literal
comma where a thin space was intended.

Cause: Markdown drops the backslash from `\,`, leaving a bare comma
for MathJax.

Fix: write `\\,` in source.

### `\operatorname{...}`

Symptom: the rendered output prints
*"The following macros are not allowed: operatorname"*.

Cause: GitHub's MathJax configuration explicitly disallows
`\operatorname`.

Fix: `\mathrm{...}` — `\mathrm{tr}`, `\mathrm{Var}`, `\mathrm{rank}`.

### `\label`, `\ref`, `\tag`, `\newcommand`, `\renewcommand`

Cause: the GitHub renderer ignores or rejects these. There is no
global macro mechanism across files.

Fix: number equations manually (`\quad (1.3.1)`); never define
macros.

### `physics` package macros (`\ket`, `\bra`, `\braket`)

Cause: the `physics` LaTeX package is not loaded by GitHub MathJax.

Fix: write Dirac notation with raw `\langle` and `\rangle`. This is
also required for mdBook and Pandoc portability.

### Inline math glued to a hyphen

Symptom: `length-$n$ bit strings` renders with literal dollar signs.

Cause: GitHub's inline-math detector will not enter math mode when
the opening `$` is glued directly to a non-whitespace character such
as a hyphen.

Fix: rephrase so the `$` has whitespace next to it
(`bit strings of length $n$`).

### Multiple `$...$` blocks with subscripts on the same line

Symptom: the second math span renders as literal text with the
underscores missing — Markdown's italic parser ate them.

Cause: subscripts in adjacent inline-math spans can confuse the
italic detector when both spans contain `_{...}`.

Fix: promote the second formula to a display equation `$$ ... $$` on
its own line.

### Markdown tables that contain `|` inside math

Symptom: rows break visually because `|` is the table column
separator.

Fix: use a bullet list of "left ↔ right" pairs instead of a Markdown
table whenever the cells contain kets `|ψ⟩`, bras `⟨φ|`, or norms
`‖v‖`.

## Decision log

Append-only. New entries go at the top.

### 2026-05-12: screenshot-review workflow

Screenshots are review artifacts, not source. The generator
(`tools/screenshot.py`) is committed; generated PNGs live under
`book-build/screenshots/` and are gitignored along with the rest of
`book-build/`. Visual-regression baselines are deferred until a real
miss demonstrates the need. CI is not used; manual local generation
is the default.

### 2026-05-12: process documentation

`PROCESS.md` is created to preserve institutional memory that
previously lived only in conversation history: review-loop discipline,
the renderer-gotcha catalog, and dated decisions.

### Initial decisions (early commits)

- **License.** Dual-licensed: free for non-commercial use under
  CC BY-NC-ND 4.0; commercial use requires a separate license.
  Chosen to allow free reading and learning while preserving the
  right to monetize printed or derivative work.
- **File scope.** One Markdown file per chapter (45 files total).
  Per-section (250+ files) was rejected as too fragmented for
  navigation and link hygiene; per-part (13 files) was rejected as
  too large for diff review and forward references.
- **Render target.** GitHub-native first. Math renders in GitHub's
  web viewer without compilation. mdBook and Pandoc compatibility is
  maintained as a secondary target by avoiding renderer-specific
  features (no `physics` macros, no custom `\newcommand`).
- **Math conventions.** Finite-dimensional complex spaces unless
  stated otherwise; physicists' inner product (conjugate-linear in
  the first argument); raw `\langle`/`\rangle` Dirac notation.
  Stated in STYLE.md and reiterated in the intro to the
  math-background chapter.
- **Qubit ordering.** `|x_1 x_2 ... x_n⟩` with `x_1` as the most
  significant bit, mapping to zero-based statevector index
  `Σ x_i 2^{n-i}`. Documented in §4.2 with explicit Qiskit
  comparison (Qiskit is little-endian; book leftmost factor maps to
  Qiskit's highest-numbered qubit label).
- **QFT sign convention.** Negative exponent in the forward
  transform; the book's `F_N` is `F_N^{(-)}`. Qiskit's `QFTGate`
  uses the opposite sign. Documented in §4.13 with an explicit
  warning that opposite-sign QFT requires conjugating every
  controlled-phase angle and phase-estimation readout.
- **Authorship and history.** All commits authored as
  Iaroslav Voitovych <yaroslav.voytovych@gmail.com>. No mention of
  AI, automation, or assistants in commits, PRs, comments, code, or
  documentation (INSTRUCTIONS.md).

## Lessons learned per chapter

One short retrospective per chapter, added when the chapter reaches
`reviewed` or `final`. Newest entries at the top.

### Chapter 4. Mathematical Background for Quantum Computing

- Twelve rounds of review; the chapter is the project's first
  worked-out example of the review loop.
- Rounds 1–2 surfaced real factual gaps: Holevo bound formulation,
  the over-absolute "every quantum gate is unitary", and the
  absence of SVD and PSD treatments.
- Round 4 included a structural reorder (Tensor Products before SVD)
  prompted by a reviewer reading the previous order as inverted.
- Round 10 caught a long-standing omission no prior round noticed:
  commutators and simultaneous diagonalization. Later chapters lean
  on this constantly; missing it would have hurt every subsequent
  chapter on Hamiltonians, the Pauli algebra, and Trotterization.
- The last three rounds were almost entirely polish. The value of
  iterating that far comes from this being a foundational chapter
  whose conventions every later chapter inherits.
- All three GitHub-Markdown renderer gotchas (`\\`, `\{`/`\}`, `\,`)
  were discovered while drafting this chapter. The lint rules
  encoding them are now permanent guards for every subsequent
  chapter; the gotcha catalog above grew from the same work.
- The "How to read this chapter" callout (core vs skim-first) was
  added in response to reader-load concerns. Consider the pattern
  for any later chapter that exceeds about fifteen sections.
