#!/usr/bin/env python3
"""Lint the manuscript for structural and notational invariants.

Checks every Markdown file under book/ for:
  - Top-level heading
  - Status block
  - TOC navigation link
  - Resolvable relative links to .md files
  - No use of the MathJax `physics` package macros (\\ket, \\bra, \\braket)
  - No use of LaTeX features GitHub does not render (\\label, \\ref, \\tag,
    \\newcommand, \\operatorname)
  - No _TODO_ placeholders in files with status past `outlined`

Also checks that README.md links resolve.

Exit code 0 on clean, 1 on any issue.
"""

from __future__ import annotations
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

errors: list[str] = []


def fail(path, msg: str) -> None:
    errors.append(f"{path}: {msg}")


FORBIDDEN_MACROS = [r"\ket{", r"\bra{", r"\braket{", r"\Ket{", r"\Bra{"]
FORBIDDEN_LATEX = [
    r"\label{",
    r"\ref{",
    r"\tag{",
    r"\newcommand{",
    r"\renewcommand{",
    r"\operatorname{",
]
LINK_RE = re.compile(r"\]\(([^)]+\.md)(?:#[^)]*)?\)")
STATUS_RE = re.compile(r"\*\*Status:\*\*\s*(\w+)")

FENCED_RE = re.compile(r"```.*?```", re.DOTALL)
INLINE_CODE_RE = re.compile(r"`[^`\n]+`")

# Renderer-bug detectors. Each rule corresponds to a bug entry in
# docs/github-markdown-math-bugs.md, which is in turn justified by a
# cell in docs/render-tests/math-context-matrix.md. Keep them in sync.
#
# Bug 1: GitHub's Markdown processor unescapes one layer of backslashes
# inside `$...$` and `$$...$$` before MathJax sees the math. So `\\`,
# `\{`, `\}`, `\,`, `\|` in source must be written `\\\\`, `\\{`,
# `\\}`, `\\,`, `\\|` to survive.
MATH_INLINE_RE = re.compile(r"(?<!\$)\$[^\$\n]+\$")
MATH_DISPLAY_RE = re.compile(r"\$\$.*?\$\$", re.DOTALL)
# `\\` not part of `\\\\` and not followed by `,{}|` (which are themselves
# intentional escapes \\, \\{ \\} \\| that happen to start with `\\`).
BAD_SINGLE_BS = re.compile(r"(?<!\\)\\\\(?![\\,{}|])")
BAD_BRACE = re.compile(r"(?<!\\)\\[{}]")                 # `\{` or `\}` not preceded by `\`
BAD_THIN_SPACE = re.compile(r"(?<!\\)\\,")               # `\,` not preceded by `\`
BAD_NORM_BAR = re.compile(r"(?<!\\)\\\|")                # `\|` not preceded by `\`


def check_math_blocks(rel, content: str) -> None:
    """Flag GitHub-Markdown escape hazards inside math delimiters."""
    for m in list(MATH_INLINE_RE.finditer(content)) + list(MATH_DISPLAY_RE.finditer(content)):
        block = m.group(0)
        if BAD_SINGLE_BS.search(block):
            fail(rel, r"math contains single `\\` — use `\\\\` (GitHub eats one backslash)")
        if BAD_BRACE.search(block):
            fail(rel, r"math contains bare `\{` or `\}` — use `\\{` / `\\}` (GitHub eats one backslash)")
        if BAD_THIN_SPACE.search(block):
            fail(rel, r"math contains bare `\,` — use `\\,` (GitHub eats the backslash and the thin space renders as `,`)")
        if BAD_NORM_BAR.search(block):
            fail(rel, r"math contains bare `\|` — use `\\|` (GitHub eats the backslash and the norm bar collapses to a modulus bar)")


INLINE_LATEX_ENV_RE = re.compile(r"(?<!\$)\$[^\$\n]*\\begin\{[A-Za-z]+\*?\}[^\$\n]*\$")
DISPLAY_BLOCK_RE = re.compile(r"^\$\$\s*$.*?^\$\$\s*$", re.MULTILINE | re.DOTALL)


def check_nested_display_math(rel, content: str) -> None:
    """Flag `$$` lines that sit inside an indented list-item continuation.
    GitHub's display-math block parser does not enter math mode there
    and the LaTeX appears as literal text.

    Note: a previous version of this rule also flagged `$$` inside `>`
    blockquotes; the test sheet (Section B) showed that display math in
    a plain blockquote actually renders correctly. Only the indented-list
    case remains a confirmed breakage."""
    for n, line in enumerate(content.splitlines(), 1):
        if line.startswith("  ") and line.lstrip(" \t").startswith("$$"):
            fail(rel, f"line {n}: `$$` inside an indented list-item continuation does not enter math mode on GitHub — convert the list to bold-prefixed paragraphs and unindent the equation")


def check_inline_latex_env(rel, content: str) -> None:
    """Flag inline math that contains `\\begin{...}`. GitHub's inline-math
    parser does not handle LaTeX environments in any form — `pmatrix`,
    `matrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix`, `aligned`,
    `cases`, etc. — including a 1×1 `pmatrix` with no `&` and no `\\\\`.
    Promote the equation to display math `$$...$$` on its own paragraph.

    Generalised from a narrower `check_inline_pmatrix` after Section M of
    the test sheet showed that every environment form, including the
    bare 1×1 `pmatrix`, breaks the inline-math parser."""
    for n, line in enumerate(content.splitlines(), 1):
        if INLINE_LATEX_ENV_RE.search(line):
            fail(rel, f"line {n}: inline `$ ... \\begin{{...}} ... $` renders as literal LaTeX on GitHub — move to display math `$$ ... $$`")


def check_list_marker_continuation(rel, content: str) -> None:
    """Flag `$$ ... $$` blocks whose inner lines start with a Markdown
    list/quote marker (`+`, `-`, `*`, `>`). The parser reads the marker
    as the start of a new block-level construct and breaks math mode.
    Affects both top-level blocks (Section N) and blockquoted blocks
    (Section L). Common fix: move the operator to the end of the
    previous line so the continuation begins with its operand."""
    for m in DISPLAY_BLOCK_RE.finditer(content):
        block = m.group(0)
        lines = block.splitlines()
        if len(lines) < 3:
            continue  # single-line $$...$$ has no continuation
        start_line = content[: m.start()].count("\n") + 1
        for offset, line in enumerate(lines[1:-1], start=1):
            stripped = line.lstrip(" \t")
            # Allow blockquote-prefixed inner lines: a `>` followed by a
            # space is the marker we are testing for; bare `>` inside
            # math source comes from quoting / nesting, not from math.
            if stripped and stripped[0] in "+-*>" and (len(stripped) == 1 or stripped[1] in " \t"):
                fail(
                    rel,
                    f"line {start_line + offset}: line inside `$$...$$` starts with "
                    f"'{stripped[0]}' — Markdown reads it as a list/quote marker and breaks the math block. "
                    "Move the operator to the end of the previous line.",
                )
                break


# --- Convention checks (STYLE.md, adjudicated 2026-07-04) -------------------
#
# These four rules enforce the chapter-closing and consistency conventions
# specified in STYLE.md (*Per-chapter structure*). Exception lists below
# enumerate the files STYLE.md itself names as deliberate deviations; a new
# entry requires a matching STYLE.md adjudication, not just a lint edit.

SECTIONS_DRAFTED_RE = re.compile(r"\*\*Sections drafted:\*\*\s*(\d+)\s*/\s*(\d+)")
NUMBERED_H2_RE = re.compile(r"^## (?:\d+|[A-Z]{1,2})\.\d+ ", re.MULTILINE)
ANY_H2_RE = re.compile(r"^## ", re.MULTILINE)

# Files whose H2s are organisational groups, not drafted sections
# (per-letter index groups; STYLE.md status-count rule).
STATUS_COUNT_EXEMPT = {"index.md"}

# Chapters adjudicated as merging the bridge into a transitional final
# numbered section (STYLE.md: acceptable), plus chapters with no bridge
# by design: 8, 19, 23, 34, 36 end on their last content section (per the
# TOC.md reconciliation note), the Prelude closes on its own runway, and
# Chapter 37 has nothing to bridge to.
MERGED_OR_NO_BRIDGE = {
    "00-historical-prelude.md",
    "02-classical-to-quantum-contrast.md",
    "08-quantum-gates.md",
    "19-quantum-error-correction-and-fault-tolerance.md",
    "22-hardware-engineering-metrics.md",
    "23-quantum-programming-compilation-and-tooling.md",
    "24-classical-simulation-of-quantum-systems.md",
    "25-nisq-and-early-fault-tolerant-era.md",
    "27-cryptography-and-security.md",
    "29-optimization-finance-and-industrial.md",
    "30-quantum-machine-learning.md",
    "31-quantum-sensing-metrology-and-tomography.md",
    "32-adjacent-computational-models.md",
    "34-bridging-to-familiar-engineering-ideas.md",
    "36-how-to-judge-claims.md",
    "37-endgame.md",
}

PHASE_RE = re.compile(r"\*\*Phase:\*\*\s*(\d+)")
try:
    import sys as _sys
    _sys.path.insert(0, str(ROOT / "scripts"))
    from phases import PHASE_BY_FILE  # type: ignore
except Exception:  # pragma: no cover — phases.py is part of the repo
    PHASE_BY_FILE = {}


def check_phase(rel, md: pathlib.Path, content: str) -> None:
    """The status block's Phase is historical writing-plan metadata and
    must match scripts/phases.py (STYLE.md, *Phase field*)."""
    planned = PHASE_BY_FILE.get(md.name)
    if planned is None:
        return
    m = PHASE_RE.search(content)
    if m and int(m.group(1)) != planned:
        fail(rel, f"status block says 'Phase: {m.group(1)}' but scripts/phases.py "
                  f"assigns phase {planned} — sync the status block (STYLE.md, Phase field)")


SANITY_HEADING_RE = re.compile(r"^#{1,6}\s.*[Ss]anity\s+[Cc]hecks", re.MULTILINE)
PART_ROMAN_RE = re.compile(r"\bPart\s+[IVX]+\b")
PART_ARABIC_RE = re.compile(r"\bPart\s+\d+\b")
CHAPTER_FILE_RE = re.compile(r"^\d{2}-.+\.md$")


def check_status_count(rel, md: pathlib.Path, content: str) -> None:
    """`Sections drafted: k / M` must equal the count of numbered `## N.x`
    sections; files with no numbered sections count all H2s (front-matter
    rule), except the enumerated organisational-H2 files."""
    if md.name in STATUS_COUNT_EXEMPT:
        return
    m = SECTIONS_DRAFTED_RE.search(content)
    if not m:
        return  # absence of the counter is covered by the status-block check
    k, total = int(m.group(1)), int(m.group(2))
    numbered = len(NUMBERED_H2_RE.findall(content))
    actual = numbered if numbered else len(ANY_H2_RE.findall(content))
    if total != actual or k != actual:
        fail(rel, f"status block says 'Sections drafted: {k} / {total}' but the file "
                  f"has {actual} countable section(s) (numbered `## N.x`, or all H2s "
                  f"when none are numbered) — see STYLE.md status-count rule")


def check_bridge(rel, md: pathlib.Path, content: str) -> None:
    """Every chapter's last numbered section is a bridge (`Bridge to Chapter`)
    unless STYLE.md adjudicates it as merged or bridge-free."""
    if not CHAPTER_FILE_RE.match(md.name) or "front-matter" in str(rel) or "back-matter" in str(rel):
        return
    if md.name in MERGED_OR_NO_BRIDGE:
        return
    numbered_lines = [ln for ln in content.splitlines() if re.match(r"^## (?:\d+|[A-Z]{1,2})\.\d+ ", ln)]
    if numbered_lines and "Bridge to Chapter" not in numbered_lines[-1]:
        fail(rel, f"last numbered section is {numbered_lines[-1][3:40]!r}, not a "
                  "'Bridge to Chapter' section, and the file is not in the "
                  "adjudicated merged/no-bridge list (STYLE.md)")


def check_sanity_check_form(rel, content: str) -> None:
    """Sanity checks are a bold run-in paragraph, never a heading."""
    for m in SANITY_HEADING_RE.finditer(content):
        n = content[: m.start()].count("\n") + 1
        fail(rel, f"line {n}: sanity checks must be the bold run-in paragraph "
                  "'**Sanity checks before moving on.**', not a heading (STYLE.md)")


def check_part_numerals(rel, content: str) -> None:
    """Roman and Arabic part references must not be mixed within one file."""
    prose = strip_code(content)
    if PART_ROMAN_RE.search(prose) and PART_ARABIC_RE.search(prose):
        roman = PART_ROMAN_RE.search(prose).group(0)
        arabic = PART_ARABIC_RE.search(prose).group(0)
        fail(rel, f"mixes Roman ({roman!r}) and Arabic ({arabic!r}) part references "
                  "in one file (STYLE.md: don't mix the two styles within a file)")


def strip_code(content: str) -> str:
    """Remove fenced and inline code spans so forbidden-pattern checks
    don't false-positive on documentation that mentions the forbidden
    construct (e.g. STYLE.md describing what NOT to use)."""
    content = FENCED_RE.sub("", content)
    content = INLINE_CODE_RE.sub("", content)
    return content


def check_book_file(md: pathlib.Path) -> None:
    rel = md.relative_to(ROOT)
    content = md.read_text(encoding="utf-8")

    if not content.startswith("# "):
        fail(rel, "missing top-level heading")
    if "**Status:**" not in content:
        fail(rel, "missing status block")
    if "[Table of Contents]" not in content:
        fail(rel, "missing TOC link")

    for m in LINK_RE.finditer(content):
        target_str = m.group(1)
        if target_str.startswith("http"):
            continue
        target = (md.parent / target_str).resolve()
        if not target.exists():
            fail(rel, f"dead link to {target_str}")

    prose = strip_code(content)
    for macro in FORBIDDEN_MACROS:
        if macro in prose:
            fail(rel, f"forbidden macro {macro!r} — use raw \\langle/\\rangle")

    for macro in FORBIDDEN_LATEX:
        if macro in prose:
            fail(rel, f"forbidden LaTeX feature {macro!r}")

    check_math_blocks(rel, content)
    check_nested_display_math(rel, content)
    check_inline_latex_env(rel, content)
    check_list_marker_continuation(rel, content)
    check_status_count(rel, md, content)
    check_phase(rel, md, content)
    check_bridge(rel, md, content)
    check_sanity_check_form(rel, content)
    check_part_numerals(rel, content)

    m = STATUS_RE.search(content)
    if m:
        status = m.group(1).lower()
        if status not in ("stub", "outlined") and "_TODO_" in content:
            fail(rel, f"contains _TODO_ but status is '{status}'")
        # Publication gate for perishable claims. A "Moving-target warning"
        # callout is a visible, dated reader warning on time-sensitive
        # figures (hardware, resource estimates, status assessments). It is
        # allowed while a file is being written or reviewed, but must be
        # cleared — the claim re-verified against current sources and the
        # check logged in docs/fact-check-ledger.md — before the file is
        # marked `final`. This keeps perishable numbers from shipping
        # unverified while still warning draft readers.
        if status == "final" and "Moving-target warning" in content:
            fail(rel, "contains an unresolved 'Moving-target warning' "
                      "(perishable claim) but status is 'final'; re-verify "
                      "against current sources, log it in "
                      "docs/fact-check-ledger.md, and remove the warning "
                      "before marking the file final")


def check_readme() -> None:
    p = ROOT / "README.md"
    if not p.exists():
        fail("README.md", "missing")
        return
    content = p.read_text(encoding="utf-8")
    for m in LINK_RE.finditer(content):
        target_str = m.group(1)
        if target_str.startswith("http"):
            continue
        target = (p.parent / target_str).resolve()
        if not target.exists():
            fail("README.md", f"dead link to {target_str}")


def main() -> int:
    book_files = sorted((ROOT / "book").rglob("*.md"))
    for md in book_files:
        check_book_file(md)
    check_readme()

    if errors:
        for e in errors:
            print(e, file=sys.stderr)
        print(f"\n{len(errors)} issue(s) found", file=sys.stderr)
        return 1
    print(f"OK — {len(book_files)} manuscript files checked")
    return 0


if __name__ == "__main__":
    sys.exit(main())
