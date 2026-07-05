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
Forty-seven files total: thirty-seven chapters, three front-matter
files, six appendices (A–F), and the index.

Each file carries a status block at the top, immediately after the
chapter heading:

> **Status:** *state* · **Phase:** N · **Sections drafted:** k / M

Status states in order of completeness:
`stub` → `outlined` → `draft` → `prereviewed` → `reviewed` → `final`
(promotion gates in *Status-promotion criteria* below).

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
| `tools/render-gist.py` | `make render-gist FILE=...` | Creates a secret Gist from any local Markdown file, captures per-section screenshots, *and* writes a `report.txt` containing the rendered article's text content. The text report is the single-paste signal for whether each cell rendered as math or as literal LaTeX. The gist is **kept by default** so the user can also open it in a browser and verify directly. Add `DELETE=1` to clean up. |

General principle: source-detectable problems are caught by lint;
render-visible problems are caught by screenshot review. The cheaper
layer should catch what it can, so human review is reserved for the
things only a human can judge.

### Building the rendered book (`make book`) — versions and troubleshooting

`make book` (via `scripts/build_book.py`) assembles `book-build/` and then
invokes mdBook with the `mdbook-katex` preprocessor to render math at build
time. The constraint is **not** a narrow mdbook pin — it is that `mdbook` and
`mdbook-katex` must come from the *same protocol line*, because `mdbook-katex`
is a preprocessor coupled to mdBook's preprocessor API. The coupling is visible
in `mdbook-katex`'s own dependency manifest on crates.io:

- `mdbook-katex 0.9.x` depends on `mdbook_fork4ls ^0.4.48` → the mdbook **0.4.x** protocol.
- `mdbook-katex 0.10.x` depends on `mdbook-preprocessor ^0.5.1` → the mdbook **0.5.x** protocol.

**Supported pairs** (install a matched pair, not arbitrary latest):

| mdbook | mdbook-katex | status |
|---|---|---|
| 0.4.x | 0.9.x | stable; verified in this repo (0.4.48 + 0.9.4) |
| 0.5.x | 0.10.x | newer protocol; `mdbook-katex 0.10` is currently a pre-release (`0.10.0-alpha`) |

```
# stable pair (recommended; --force replaces an already-installed version):
cargo install mdbook --version '>=0.4,<0.5' --locked --force
cargo install mdbook-katex --version 0.9.4 --locked --force

# or the mdbook 0.5.x line (pre-release katex):
cargo install mdbook --locked --force
cargo install mdbook-katex --version 0.10.0-alpha --locked --force
```

- **Is `book-build/` safe to delete?** Yes. It is fully regenerated on every
  `make book`; nothing under it is source. Deleting it does not affect a
  version-mismatch failure, which happens *after* source assembly when mdBook
  invokes the preprocessor.
- **Harmless within-line patch skew:** `mdbook-katex 0.9.4` is built against
  `mdbook 0.4.48` (its `mdbook_fork4ls` dependency), so running it under a
  different 0.4.x patch — e.g. `mdbook 0.4.52` — prints a **non-fatal** notice
  that the versions differ. The build still completes with 0 KaTeX errors;
  the notice is safe to ignore. (Using exactly `mdbook 0.4.48` silences it,
  but any 0.4.x works — we intentionally do not pin the patch level.)
- **Symptom of a mismatched pair** (e.g. mdbook 0.5.x with mdbook-katex 0.9.x,
  or vice versa): the build fails during the preprocessor with
  `invalid type: null, expected any valid TOML value …` followed by
  `The "katex" preprocessor exited unsuccessfully`. The two halves are speaking
  different protocol versions. `scripts/build_book.py` reads both installed
  versions, and if they are not a matched pair it prints the exact
  `cargo install` command to align them (it never hard-blocks — the manuscript
  and the generated `book.toml` are version-neutral, so the build is always
  attempted).
- **Newer mdbook lines (0.6+):** when they appear, the fix is to install the
  matching `mdbook-katex` line and add the pair to `SUPPORTED_PAIRS` in
  `scripts/build_book.py`. Nothing in the manuscript or `book.toml` should need
  to change; the coupling lives entirely in the preprocessor.

The CI-free verification baseline is: `make lint` clean, `make book` clean
(0 KaTeX errors), and `make check-examples` green — reproduced here under the
stable pair `mdbook 0.4.48` + `mdbook-katex 0.9.4`. The 0.5.x + 0.10.x pair is
documented from the dependency manifests above; it is the matched line for
mdbook 0.5.x but has not been re-verified in this repo (0.10 is pre-release).

## Perishable claims: the "Moving-target warning" callout

Time-sensitive content — vendor hardware figures, resource estimates,
near-term-status assessments — is marked in the body with a visible,
dated callout the reader cannot miss:

```
> **Moving-target warning — snapshot as of <Month Year>.** … treat every
> specific number here as provisional and re-verify it against current
> vendor, preprint, or journal sources before relying on it.
```

The callout serves two purposes at once:

- **Reader-facing.** A draft is publicly readable, so a perishable figure
  must warn the reader directly: it was accurate as of the stated month,
  and they should re-check it against current sources. Date to the
  **month and year** (matching the `docs/fact-check-ledger.md` `YYYY-MM`
  granularity), not the bare year — hardware numbers move within months.
- **Publication gate.** The bold lead `**Moving-target warning` is a
  greppable sentinel. `tools/lint.py` treats it like `_TODO_`: harmless
  while a file is `draft`/`prereviewed`/`reviewed`, but a **hard lint failure** once a
  file is marked `final`. To clear it, re-verify the claim against current
  sources, log the check in `docs/fact-check-ledger.md`, update the
  figure, and remove the callout. This makes it structurally impossible
  to ship a `final` chapter with an unverified perishable number.

Inventory the warnings any time with `rg -n "Moving-target warning" book/`.
As of this writing they sit on the perishable sections: §1.6, §3.9,
§8.12, §9.8, §15.3, §15.8, §15.10, and Appendix F.

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
make setup-system-deps                       # sudo prompt; one-time
```

The first apt step is needed on a fresh Ubuntu 24.04 install
because Python's `venv` module is not bundled with the minimal
Python package. The Makefile detects this case and prints the exact
apt command if it is missing.

`make setup` creates a `.venv` at the repo root, installs Playwright
into it, and downloads Chromium into the shared Playwright cache
(`~/.cache/ms-playwright/`). The target is idempotent — it touches a
sentinel after success and becomes a no-op on subsequent runs.

`make setup-system-deps` runs `sudo playwright install-deps chromium`
to install the system libraries Chromium needs at launch
(`libnspr4`, `libnss3`, `libdbus-1-3`, `libatk*`, ...). Without this
step the binary downloads cleanly but fails to launch with
`error while loading shared libraries`. The `screenshots` and
`render-gist` targets pre-check that Chromium can start; if it
cannot, they refuse to run and print the exact remedy.

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

The full annotated catalogue lives in
[`docs/github-markdown-math-bugs.md`](docs/github-markdown-math-bugs.md),
derived directly from the live test sheet at
`docs/render-tests/math-context-matrix.md`. That memo is the
single source of truth; the lint rules in `tools/lint.py` and the
upstream-feedback drafts under `docs/upstream-feedback/` derive
from it.

When you discover a new renderer bug:

1. Add a cell to `docs/render-tests/math-context-matrix.md`.
2. Render and confirm the breakage on GitHub.
3. Add the bug entry to `docs/github-markdown-math-bugs.md`.
4. Encode a detector in `tools/lint.py` if the pattern is
   source-detectable.
5. Cross-check that the manuscript does not silently rely on the
   broken pattern anywhere.

Doing all five keeps the lint, the memo, and the test sheet in
lockstep.


## Decision log

Append-only. New entries go at the top.

### 2026-07-05: prereviewed rung, lint-enforced conventions, generated TOC, repo hygiene

The July internal-review cycle (HISTORY.md Phase 14) produced four
standing decisions. (1) The status ladder gained a **`prereviewed`**
rung between `draft` and `reviewed` — a complete internal review cycle
does not claim the independent-reviewer bar; gates are in
*Status-promotion criteria* below. (2) The chapter-closing and
consistency conventions adjudicated in STYLE.md are now **enforced by
`tools/lint.py`** (status counts, bridge forms, sanity-check form,
part numerals, Phase sync against `scripts/phases.py`); extending an
exception list requires a matching STYLE.md adjudication. (3) `TOC.md`
is **generated** from the delivered headings (`make toc`,
`scripts/generate_toc.py`); the original planned outline lives at
`archive/plan-original-toc.md`. (4) Root drafting artifacts moved to
`archive/`; review reports live in `reviews/` only; the review-file
audit trail is insert-only, with fixes and their markers landing in the
same commit.

### 2026-05-12: portability hardening on fresh OS installs

Fresh WSL Ubuntu 24.04 runs surfaced two unstated prerequisites the
existing setup quietly relied on: `python3-venv` (without which the
venv module fails with a notoriously unhelpful `ensurepip` error)
and the Chromium runtime system libraries (`libnspr4`, `libnss3`,
`libdbus-1-3`, `libatk*`, ...) installed via
`playwright install-deps chromium`. Both are now first-class in the
Makefile: `make setup` precheck for the venv module, dedicated
`make setup-system-deps` target with sudo prompt for the Chromium
libraries, and a `precheck-chromium` step that refuses to launch
the screenshot tooling without a working browser and prints the
exact remedy.

Adjacent decision: artifact-preserving failure semantics for the
new tools. `tools/render-gist.py` previously deleted the throwaway
Gist in a `finally` block, which destroyed the artifact most useful
for manual debugging. Now the gist is preserved on capture failure
and the URL plus the `gh gist delete` command are printed to stderr.

### 2026-05-12: faster reproducer loop via throwaway Gists

`tools/render-gist.py` and `make render-gist FILE=...` replace the
"edit → commit → push → open GitHub → screenshot manually" loop
with a sub-30-second iteration: create a secret Gist from any
local Markdown file, capture per-section screenshots, then delete
the gist. No commit noise on the working branch. The open question
of whether `gist.github.com` renders math identically to repo-blob
URLs is named explicitly in the bug memo and is the first thing the
tool's first run answers.

### 2026-05-12: single source of truth for renderer-bug knowledge

`docs/github-markdown-math-bugs.md` is the canonical memo;
`docs/render-tests/math-context-matrix.md` is its live test sheet.
The previous "Known renderer gotchas" section in this document
(170 lines that had grown round by round and partly contradicted
itself) is trimmed to a 23-line pointer plus a five-step discipline
for keeping the memo / lint / test sheet in lockstep when new bugs
surface. The lint rules in `tools/lint.py` and the upstream-feedback
drafts in `docs/upstream-feedback/` are now derived from the memo
rather than from rounds-of-conversation memory.

### 2026-05-12: structured test sheet beats narrative diagnosis

After several rounds of bug-by-bug renderer-bug diagnosis produced
a partly-wrong catalog (notably the over-broad
"<code>&dollar;&dollar;</code> in blockquote is broken" rule), a single structured test sheet
with 11 containers × 10 math forms and labelled cells (A1…K4)
overturned two earlier diagnoses, surfaced a new bug
(inline `pmatrix` broken in every container, including top level),
and produced an artifact that doubles as internal documentation and
as a single-page upstream reproducer. The "verify the actual
rendered output systematically before encoding a rule" pattern is
now part of the workflow.

### 2026-05-12: screenshot-review workflow

Screenshots are review artifacts, not source. The generator
(`tools/screenshots.py`) is committed; generated PNGs live under
`.artifacts/screenshots/` and are gitignored. Visual-regression
baselines are deferred until a real miss demonstrates the need. CI
is not used; manual local generation is the default.

### 2026-05-12: process documentation

`PROCESS.md` is created to preserve institutional memory that
previously lived only in conversation history: review-loop discipline,
the renderer-gotcha catalog, and dated decisions.

### Initial decisions (early commits)

- **License.** Dual-licensed: free for non-commercial use under
  CC BY-NC-ND 4.0; commercial use requires a separate license.
  Chosen to allow free reading and learning while preserving the
  right to monetize printed or derivative work.
- **File scope.** One Markdown file per chapter (47 files total).
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
  Iaroslav Voitovych <yaroslav.voytovych@gmail.com> (INSTRUCTIONS.md).

## Lessons learned per chapter

One short retrospective per chapter, added when the chapter reaches
`reviewed` or `final`. Newest entries at the top.

### Chapter 4. Mathematical Background for Quantum Computing

- Thirteen narrative review rounds plus a post-round polish pass
  (conventions table, partial-trace example, observable rename)
  and then the renderer-bug investigation pass. The chapter is the
  project's first worked-out example of the full review loop.
- Rounds 1–2 surfaced real factual gaps: Holevo bound formulation,
  the over-absolute "every quantum gate is unitary", and the
  absence of SVD and PSD treatments.
- Round 4 included a structural reorder (Tensor Products before
  SVD) prompted by a reviewer reading the previous order as
  inverted.
- Round 10 caught a long-standing omission no prior round noticed:
  commutators and simultaneous diagonalization. Later chapters
  lean on this constantly; missing it would have hurt every
  subsequent chapter on Hamiltonians, the Pauli algebra, and
  Trotterization.
- Round 13 added four missing formulas the chapter's
  forward-references implicitly assumed: tensor-product inner
  product and norm, the explicit `n`-qubit expansion, the rank-one
  Born rule for nondegenerate orthonormal-basis measurement, and
  the matrix-exponential bridge. The post-round polish added
  §4.16 "Conventions at a Glance" as a single-screen debugging
  checklist of the chapter's accumulated conventions.
- All five GitHub-Markdown renderer gotchas (`\\`, `\{`/`\}`, `\,`,
  `\|`, inline `pmatrix`) were discovered while drafting this
  chapter, and the over-broad "<code>&dollar;&dollar;</code> in blockquote" rule was
  identified as an *incorrect* diagnosis only after the structured
  test sheet was rendered. The lint rules encoding the surviving
  gotchas are permanent guards for every subsequent chapter; the
  bug memo and the test sheet are now the single source of truth
  rather than the per-round commit notes.
- The "How to read this chapter" callout (core vs skim-first) was
  added in response to reader-load concerns. Consider the pattern
  for any later chapter that exceeds about fifteen sections.
- The chapter's drafting cycle effectively built the project's
  whole tooling layer: lint, the screenshot tool, the gist-based
  reproducer, the bug memo, the test sheet, the upstream-feedback
  artifacts, the Makefile, and the prereq-detection logic in
  `make setup` / `make setup-system-deps`. The next chapter
  inherits all of it for free.

## Status-promotion criteria (adopted 2026-07-05)

The status ladder is `stub` → `outlined` → `draft` → `prereviewed` →
`reviewed` → `final`. Promotion gates:

- **prereviewed** — the file has been through a complete *internal* review
  cycle: the comprehensive section-by-section review of 2026-07-03
  (`reviews/review-2026-07-03-1843-comprehensive-book-review.md`, 197
  findings), full remediation of its findings, external web verification of
  every factual item the review flagged
  (`reviews/factcheck-2026-07-04-external-verification.md`), and a clean run
  of the structural lint. "Internal" is the operative word: the reviewing was
  done inside the project, not by an independent expert, and the author has
  not yet done a start-to-end read.
- **reviewed** — reserved for after a respected independent reviewer's review
  has been received and incorporated. The intended mechanism is **targeted
  per-chapter expert review** (status is per-file, so chapters advance
  individually): send the highest wrong-in-public-risk chapters to domain
  experts first — Chapter 16 (QSVT/modern algorithms), Chapter 19 (QEC),
  Chapters 20–22 (hardware, control, metrics), Chapter 30 (QML), plus one
  applications chapter (28 or 29) as a depth probe — rather than waiting
  for a single whole-book review.
- **final** — additionally requires, per file: the `factcheck/` mirror file
  closed (no `open` verdicts), every Moving-target warning re-verified
  against current sources and logged (enforced by `tools/lint.py`), and a
  GitHub-rendering spot-check of the file.

All 48 manuscript files were promoted `draft` → `prereviewed` on 2026-07-05
under these criteria.
