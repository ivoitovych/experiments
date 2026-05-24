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

    m = STATUS_RE.search(content)
    if m:
        status = m.group(1).lower()
        if status not in ("stub", "outlined") and "_TODO_" in content:
            fail(rel, f"contains _TODO_ but status is '{status}'")


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
