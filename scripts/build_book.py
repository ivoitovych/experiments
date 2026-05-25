#!/usr/bin/env python3
"""Assemble an mdBook build tree from the GitHub-flavoured manuscript.

Why a preprocessor is needed. The manuscript is written for GitHub's
Markdown+MathJax pipeline: it uses `$`/`$$` delimiters, and because GitHub
eats one backslash layer before MathJax it writes `\\\\` for matrix row
breaks and `\\{`/`\\}` for set braces. A plain mdBook + runtime MathJax build
fails two ways: (1) Markdown emphasis eats underscores *inside* math
(`\\mathrm{Tr}_A ... _a` becomes `<em>`-mangled), and (2) the backslash
counts no longer line up. Both are renderer-bug classes tracked in
docs/github-markdown-math-bugs.md.

The fix here renders math at *build time* with mdbook-katex, which extracts
`$`/`$$` spans before the Markdown parser can touch them (so underscores are
safe), and a preprocessing pass that de-stubs the GitHub double-escaping back
to the single-escaped form KaTeX expects (`\\\\`->`\\`, `\\{`->`\{`,
`\\}`->`\}`). Because KaTeX renders server-side, the build is verifiable
without a browser: a successful build emits no `katex-error` spans.

Run:    python scripts/build_book.py [--selftest]      (or: make book)
Output: book-build/ (gitignored)
"""
from __future__ import annotations

import pathlib
import posixpath
import re
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from scaffold import ENTRIES, file_entries  # noqa: E402

BUILD = ROOT / "book-build"
SRC = BUILD / "src"

_FENCE_RE = re.compile(r"```.*?```", re.DOTALL)
_INLINE_CODE_RE = re.compile(r"`[^`\n]+`")
_DISPLAY_RE = re.compile(r"\$\$(.+?)\$\$", re.DOTALL)
_INLINE_MATH_RE = re.compile(r"(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)", re.DOTALL)
_LINK_RE = re.compile(r"\[([^\]]*)\]\(([^)]+)\)")


def _destub_math(body: str) -> str:
    """Undo GitHub double-escaping inside one math span (delimiters kept)."""
    body = body.replace("\\\\\\\\", "\\\\")  # `\\\\` row break -> `\\`
    body = body.replace("\\\\{", "\\{").replace("\\\\}", "\\}")  # set braces
    return body


def transform_math(text: str) -> str:
    placeholders: list[str] = []

    def stash(m: re.Match) -> str:
        placeholders.append(m.group(0))
        return f"\x00{len(placeholders) - 1}\x00"

    text = _FENCE_RE.sub(stash, text)
    text = _INLINE_CODE_RE.sub(stash, text)
    text = _DISPLAY_RE.sub(lambda m: "$$" + _destub_math(m.group(1)) + "$$", text)
    text = _INLINE_MATH_RE.sub(lambda m: "$" + _destub_math(m.group(1)) + "$", text)
    return re.sub(r"\x00(\d+)\x00", lambda m: placeholders[int(m.group(1))], text)


def _stash_code(text: str, placeholders: list[str]) -> str:
    def stash(m: re.Match) -> str:
        placeholders.append(m.group(0))
        return f"\x00{len(placeholders) - 1}\x00"

    text = _FENCE_RE.sub(stash, text)
    return _INLINE_CODE_RE.sub(stash, text)


def _restore_code(text: str, placeholders: list[str]) -> str:
    return re.sub(r"\x00(\d+)\x00", lambda m: placeholders[int(m.group(1))], text)


def rewrite_offbook_links(text: str, src_relpath: str, inbook: set[str]) -> str:
    """Redirect Markdown links whose target is not part of the book to the
    book home page. In-book `.md` links are left for mdBook to rewrite to
    `.html`; external URLs, anchors, and non-`.md` links are untouched.
    """
    placeholders: list[str] = []
    text = _stash_code(text, placeholders)
    depth = len(pathlib.PurePosixPath(src_relpath).parts) - 1
    home = "../" * depth + "index.html"
    src_dir = posixpath.dirname(src_relpath)

    def repl(m: re.Match) -> str:
        label, target = m.group(1), m.group(2)
        url = target.split("#", 1)[0]
        if not url or url.startswith(("http://", "https://", "mailto:")) or not url.endswith(".md"):
            return m.group(0)
        resolved = posixpath.normpath(posixpath.join(src_dir, url))
        if resolved in inbook:
            return m.group(0)
        return f"[{label}]({home})"

    text = _LINK_RE.sub(repl, text)
    return _restore_code(text, placeholders)


INTRO_MD = """\
# Quantum Computing for Experienced Developers

*A Structured Guide from Core Principles to Modern Practice*

by **Iaroslav Voitovych**

This is the offline HTML build. Start with the
[Preface](book/00-front-matter/00-preface.md), or use the sidebar to jump to
any chapter. The in-page "Table of Contents" links return to this page.
"""


def build_summary() -> str:
    lines = ["# Summary", "", "- [Title page](intro.md)"]
    for e in ENTRIES:
        kind = e.get("kind")
        if kind == "part-divider":
            lines.append(f"\n# {e['part_label']}\n")
        elif kind == "chapter":
            lines.append(f"- [{e['chapter_label']}. {e['title']}](book/{e['dir']}/{e['file']})")
        elif kind in ("front", "back"):
            lines.append(f"- [{e['title']}](book/{e['dir']}/{e['file']})")
    return "\n".join(lines) + "\n"


BOOK_TOML = """\
[book]
title = "Quantum Computing for Experienced Developers"
authors = ["Iaroslav Voitovych"]
language = "en"
src = "src"

[preprocessor.katex]

[output.html]
no-section-label = true
"""


def selftest() -> None:
    cases = [
        (r"$$\begin{pmatrix} a \\\\ b \end{pmatrix}$$",
         r"$$\begin{pmatrix} a \\ b \end{pmatrix}$$"),
        (r"the set $\\{0,1\\}^n$ here", r"the set $\{0,1\}^n$ here"),
        ("`$x$` unchanged", "`$x$` unchanged"),
        ("```\n$y$ \\\\ z\n```", "```\n$y$ \\\\ z\n```"),
        ("plain prose, no math", "plain prose, no math"),
    ]
    for src, want in cases:
        got = transform_math(src)
        assert got == want, f"\n  in:   {src!r}\n  want: {want!r}\n  got:  {got!r}"

    inbook = {"book/p/x.md"}
    link_cases = [
        # out-of-book nav link -> book home (depth of book/p/y.md is 2)
        ("[ToC](../../README.md)", "book/p/y.md", "[ToC](../../index.html)"),
        # out-of-book doc link with anchor -> home
        ("[memo](../../docs/m.md#x)", "book/p/y.md", "[memo](../../index.html)"),
        # in-book link left untouched (mdBook rewrites .md -> .html)
        ("[x](x.md)", "book/p/y.md", "[x](x.md)"),
        # external + code untouched
        ("[s](https://e.com/a.md)", "book/p/y.md", "[s](https://e.com/a.md)"),
        ("`[c](../../README.md)`", "book/p/y.md", "`[c](../../README.md)`"),
    ]
    for src, rel, want in link_cases:
        got = rewrite_offbook_links(src, rel, inbook)
        assert got == want, f"\n  in:   {src!r}\n  want: {want!r}\n  got:  {got!r}"

    summary = build_summary()
    assert summary.count("](book/") == len(file_entries())
    print(f"selftest OK ({len(cases)} math + {len(link_cases)} link cases, "
          f"SUMMARY lists all {len(file_entries())} chapters)")


def assemble() -> None:
    if BUILD.exists():
        shutil.rmtree(BUILD)
    inbook = {f"book/{e['dir']}/{e['file']}" for e in file_entries()}
    for path in sorted((ROOT / "book").rglob("*")):
        dest = SRC / path.relative_to(ROOT)
        if path.is_dir():
            dest.mkdir(parents=True, exist_ok=True)
        elif path.suffix == ".md":
            dest.parent.mkdir(parents=True, exist_ok=True)
            text = transform_math(path.read_text(encoding="utf-8"))
            text = rewrite_offbook_links(text, path.relative_to(ROOT).as_posix(), inbook)
            dest.write_text(text, encoding="utf-8")
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, dest)
    (SRC / "intro.md").write_text(INTRO_MD, encoding="utf-8")
    (SRC / "SUMMARY.md").write_text(build_summary(), encoding="utf-8")
    (BUILD / "book.toml").write_text(BOOK_TOML, encoding="utf-8")
    print(f"assembled build tree at {BUILD.relative_to(ROOT)} ({len(file_entries())} chapters)")


def main() -> None:
    if "--selftest" in sys.argv:
        selftest()
        return
    selftest()
    assemble()
    if shutil.which("mdbook"):
        subprocess.run(["mdbook", "build"], cwd=BUILD, check=True)
        print(f"built HTML at {(BUILD / 'book').relative_to(ROOT)}")
    else:
        print("mdbook not found on PATH; assembled sources only. "
              "Install with `cargo install mdbook mdbook-katex`, then re-run `make book`.")


if __name__ == "__main__":
    main()
