#!/usr/bin/env python3
r"""Assemble an mdBook build tree from the GitHub-flavoured manuscript.

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
        if not url or url.startswith(("http://", "https://", "mailto:")):
            return m.group(0)
        if url.endswith("/"):  # directory link (e.g. book/) -> book home
            return f"[{label}]({home})"
        if not url.endswith(".md"):  # images, LICENSE, .cff, etc. -> leave as asset
            return m.group(0)
        resolved = posixpath.normpath(posixpath.join(src_dir, url))
        if resolved in inbook:
            return m.group(0)
        return f"[{label}]({home})"

    text = _LINK_RE.sub(repl, text)
    return _restore_code(text, placeholders)


# Prose documents linked from README, included as pages so the landing page
# (README itself) mirrors the online book with working links.
PROJECT_DOCS = [
    ("BookDescription.md", "Book Description"),
    ("TOC.md", "Full Planned Table of Contents"),
    ("PROGRESS.md", "Writing Progress"),
    ("STYLE.md", "Style and Source Conventions"),
    ("PROCESS.md", "Process and Toolchain"),
    ("HISTORY.md", "Project History"),
]
EXTRA_DOCS = [doc for doc, _ in PROJECT_DOCS]
# Non-markdown files README links to; copied verbatim as static assets.
ASSET_FILES = ["LICENSE", "CITATION.cff"]


def build_summary() -> str:
    # The first entry becomes the site index.html. Using the README content
    # there makes the home page (and every chapter's "Table of Contents" nav,
    # which is redirected to home) match the online landing page.
    lines = ["# Summary", "", "- [Quantum Computing for Experienced Developers](intro.md)"]
    for e in ENTRIES:
        kind = e.get("kind")
        if kind == "part-divider":
            lines.append(f"\n# {e['part_label']}\n")
        elif kind == "chapter":
            lines.append(f"- [{e['chapter_label']}. {e['title']}](book/{e['dir']}/{e['file']})")
        elif kind in ("front", "back"):
            lines.append(f"- [{e['title']}](book/{e['dir']}/{e['file']})")
    lines.append("\n# Project documents\n")
    for doc, title in PROJECT_DOCS:
        lines.append(f"- [{title}]({doc})")
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
        # directory link -> home
        ("[dir](book/)", "book/p/y.md", "[dir](../../index.html)"),
        # non-markdown asset link left as-is
        ("[lic](../../LICENSE)", "book/p/y.md", "[lic](../../LICENSE)"),
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


def _process_md(src_file: pathlib.Path, src_relpath: str, inbook: set[str]) -> str:
    text = transform_math(src_file.read_text(encoding="utf-8"))
    return rewrite_offbook_links(text, src_relpath, inbook)


def assemble() -> None:
    if BUILD.exists():
        shutil.rmtree(BUILD)
    inbook = {f"book/{e['dir']}/{e['file']}" for e in file_entries()} | set(EXTRA_DOCS)
    SRC.mkdir(parents=True, exist_ok=True)
    for path in sorted((ROOT / "book").rglob("*")):
        dest = SRC / path.relative_to(ROOT)
        if path.is_dir():
            dest.mkdir(parents=True, exist_ok=True)
        elif path.suffix == ".md":
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(_process_md(path, path.relative_to(ROOT).as_posix(), inbook),
                            encoding="utf-8")
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, dest)
    # Landing page = README content (mirrors the online book, includes the TOC).
    (SRC / "intro.md").write_text(_process_md(ROOT / "README.md", "intro.md", inbook),
                                  encoding="utf-8")
    # Prose documents README links to, as pages.
    for doc in EXTRA_DOCS:
        src_doc = ROOT / doc
        if src_doc.exists():
            (SRC / doc).write_text(_process_md(src_doc, doc, inbook), encoding="utf-8")
    # Non-markdown files README links to, copied as static assets.
    for asset in ASSET_FILES:
        src_asset = ROOT / asset
        if src_asset.exists():
            shutil.copy2(src_asset, SRC / asset)
    (SRC / "SUMMARY.md").write_text(build_summary(), encoding="utf-8")
    (BUILD / "book.toml").write_text(BOOK_TOML, encoding="utf-8")
    print(f"assembled build tree at {BUILD.relative_to(ROOT)} ({len(file_entries())} chapters)")


def tool_version(tool: str) -> tuple[int, ...] | None:
    """Return ``tool --version`` as a (major, minor, patch) tuple, or None."""
    try:
        out = subprocess.run([tool, "--version"], capture_output=True,
                             text=True, check=True).stdout
    except (subprocess.CalledProcessError, OSError):
        return None
    m = re.search(r"(\d+)\.(\d+)\.(\d+)", out)
    return tuple(int(g) for g in m.groups()) if m else None


# Supported toolchain is a set of compatible *pairs*, not a single pin.
# mdbook-katex is a preprocessor and is coupled to mdBook's preprocessor
# protocol, which changed at mdbook 0.5.0. The coupling is visible in
# mdbook-katex's own dependency manifest:
#   - mdbook-katex 0.9.x depends on `mdbook_fork4ls ^0.4.48`  -> mdbook 0.4.x
#   - mdbook-katex 0.10.x depends on `mdbook-preprocessor ^0.5.1` -> mdbook 0.5.x
# So each mdbook minor line has a matching mdbook-katex line; mixing across
# lines is what produces the "invalid type: null …" TOML parse error.
#
# Each entry: mdbook (major, minor) -> (katex requirement label,
#             katex install argument, tested-in-this-repo?).
SUPPORTED_PAIRS = {
    (0, 4): ("mdbook-katex 0.9.x", "0.9.4", True),   # stable; verified here
    (0, 5): ("mdbook-katex 0.10.x", "0.10.0-alpha", False),  # 0.10 still pre-release
}
# Katex major.minor expected for a given mdbook minor line.
_KATEX_LINE_FOR_MDBOOK = {(0, 4): (0, 9), (0, 5): (0, 10)}


def _pair_table() -> str:
    rows = []
    for (maj, minr), (katex_label, _arg, tested) in sorted(SUPPORTED_PAIRS.items()):
        tag = " (tested in this repo)" if tested else " (pre-release katex)"
        rows.append(f"    mdbook {maj}.{minr}.x  +  {katex_label}{tag}")
    return "\n".join(rows)


def toolchain_hint() -> str:
    return ("Supported toolchain pairs (mdbook is coupled to a matching "
            "mdbook-katex):\n" + _pair_table() + "\n"
            "  Install a matching pair, e.g.:\n"
            "    cargo install mdbook --version '>=0.4,<0.5' --locked --force\n"
            "    cargo install mdbook-katex --version 0.9.4 --locked --force\n"
            "  or, for the mdbook 0.5.x line:\n"
            "    cargo install mdbook --locked --force\n"
            "    cargo install mdbook-katex --version 0.10.0-alpha --locked --force")


def check_toolchain() -> None:
    """Warn (never block) if the installed mdbook / mdbook-katex versions are
    not a known-compatible pair. The manuscript and generated book.toml are
    version-neutral, so the build is always attempted.

    Diagnostics go to stderr with a flush so they appear *before* any error
    mdBook itself writes to stderr (stdout is block-buffered when piped, which
    would otherwise reorder the explanation after the failure)."""
    mb = tool_version("mdbook")
    kx = tool_version("mdbook-katex")
    if mb is None:
        return
    line = mb[:2]
    if line not in SUPPORTED_PAIRS:
        print(f"NOTE: mdbook {'.'.join(map(str, mb))} is a line this repo has "
              f"not exercised. Attempting the build anyway.\n{toolchain_hint()}",
              file=sys.stderr, flush=True)
        return
    expected_katex = _KATEX_LINE_FOR_MDBOOK.get(line)
    if kx is not None and expected_katex is not None and kx[:2] != expected_katex:
        katex_label, katex_arg, _ = SUPPORTED_PAIRS[line]
        print(f"WARNING: mdbook {'.'.join(map(str, mb))} needs {katex_label}, "
              f"but mdbook-katex {'.'.join(map(str, kx))} is installed — these "
              f"are different preprocessor-protocol lines and the build will "
              f"likely fail with an 'invalid type: null …' TOML error.\n"
              f"  Install the matching preprocessor:\n"
              f"    cargo install mdbook-katex --version {katex_arg} --locked --force\n"
              f"  (or switch mdbook to match your mdbook-katex.)\n{toolchain_hint()}",
              file=sys.stderr, flush=True)


def main() -> None:
    if "--selftest" in sys.argv:
        selftest()
        return
    selftest()
    assemble()
    if shutil.which("mdbook"):
        check_toolchain()
        subprocess.run(["mdbook", "build"], cwd=BUILD, check=True)
        print(f"built HTML at {(BUILD / 'book').relative_to(ROOT)}")
    else:
        print("mdbook not found on PATH; assembled sources only.\n"
              + toolchain_hint(), file=sys.stderr, flush=True)


if __name__ == "__main__":
    main()
