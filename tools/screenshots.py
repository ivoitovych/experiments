#!/usr/bin/env python3
"""Capture per-section screenshots of GitHub-rendered chapter pages.

GitHub is the primary render target for this book (math renders directly in
the web viewer; mdBook and Pandoc compatibility is maintained but secondary,
see PROCESS.md). This tool drives a real headless Chromium against the
actual GitHub blob URL for a given commit, then captures one PNG per
section so the writer can eyeball anything the source-level lint can't see
(font rendering, MathJax glyph choices, table layout, dense-equation
overflow).

Output goes under .artifacts/screenshots/<short-sha>/<chapter-slug>/ and
is gitignored. PNGs are review artifacts, not source — see PROCESS.md.

Usage:

    tools/screenshots.py book/part-02-formalism/04-mathematical-background.md
    tools/screenshots.py --sha f6b8acb book/part-02-formalism/04-mathematical-background.md
    tools/screenshots.py book/part-02-formalism/*.md

Setup (one-time, on the local machine that will run captures):

    pip install playwright
    playwright install chromium

The captures hit https://github.com/<owner>/<repo>/blob/<sha>/<path>, so
the machine running this needs unrestricted network access to github.com
and github.githubassets.com — GitHub's math rendering is client-side and
the JS bundle lives on the assets CDN.
"""

from __future__ import annotations

import argparse
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART = ROOT / ".artifacts" / "screenshots"


def git_head() -> str:
    return subprocess.check_output(
        ["git", "rev-parse", "HEAD"], cwd=ROOT
    ).decode().strip()


def repo_owner_and_name() -> tuple[str, str]:
    """Parse owner/repo out of the origin URL.

    Handles both `git@github.com:owner/repo.git` and
    `https://github.com/owner/repo(.git)?` forms.
    """
    url = subprocess.check_output(
        ["git", "config", "--get", "remote.origin.url"], cwd=ROOT
    ).decode().strip()
    m = re.search(r"[/:]([^/:]+)/([^/]+?)(?:\.git)?/?$", url)
    if not m:
        raise RuntimeError(f"can't parse remote origin URL: {url!r}")
    return m.group(1), m.group(2)


def safe_slug(text: str, max_len: int = 60) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s[:max_len] or "section"


def capture_chapter(md_path: pathlib.Path, sha: str, out_dir: pathlib.Path) -> None:
    from playwright.sync_api import sync_playwright

    owner, repo = repo_owner_and_name()
    rel = md_path.resolve().relative_to(ROOT)
    url = f"https://github.com/{owner}/{repo}/blob/{sha}/{rel.as_posix()}"
    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"capturing {url}")
    print(f"  -> {out_dir.relative_to(ROOT)}/")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 900},
            device_scale_factor=1,
        )
        page = ctx.new_page()
        page.goto(url, wait_until="networkidle", timeout=90_000)

        # Wait for GitHub's client-side math renderer to finish. GitHub ships
        # `<span class="js-inline-math">$...$</span>` and matching display
        # placeholders, then injects a `<mjx-container>` child once MathJax
        # has typeset each one.
        page.wait_for_function(
            """() => {
                const placeholders = document.querySelectorAll(
                    '.js-inline-math, .js-display-math'
                );
                if (placeholders.length === 0) return true;
                return Array.from(placeholders).every(
                    p => p.querySelector('mjx-container')
                );
            }""",
            timeout=90_000,
        )

        # Fonts are loaded async and can shift line heights after MathJax
        # already finished; wait for them before clipping.
        page.evaluate("() => document.fonts && document.fonts.ready")
        page.wait_for_timeout(400)

        article = page.query_selector("article")
        if article is None:
            raise RuntimeError("no <article> element on rendered page")
        article_box = article.bounding_box()
        if article_box is None:
            raise RuntimeError("could not measure <article> bounding box")

        h2_info = page.eval_on_selector_all(
            "article h2",
            """nodes => nodes.map(n => ({
                top: n.getBoundingClientRect().top + window.scrollY,
                text: n.textContent.trim()
            }))""",
        )
        article_bottom = page.eval_on_selector(
            "article",
            "n => n.getBoundingClientRect().bottom + window.scrollY",
        )

        # Header: top of article to just above first H2 (or to end if no H2).
        first_top = h2_info[0]["top"] if h2_info else article_bottom
        header = out_dir / "00-header.png"
        page.screenshot(
            path=str(header),
            full_page=True,
            clip={
                "x": article_box["x"],
                "y": article_box["y"],
                "width": article_box["width"],
                "height": max(1, first_top - article_box["y"] - 8),
            },
        )
        print(f"     {header.name}")

        for i, h in enumerate(h2_info):
            top = h["top"]
            bottom = h2_info[i + 1]["top"] if i + 1 < len(h2_info) else article_bottom
            name = f"{i + 1:02d}-{safe_slug(h['text'])}.png"
            path = out_dir / name
            page.screenshot(
                path=str(path),
                full_page=True,
                clip={
                    "x": article_box["x"],
                    "y": max(0, top - 8),
                    "width": article_box["width"],
                    "height": max(1, bottom - top + 4),
                },
            )
            print(f"     {name}")

        browser.close()


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(
        description=__doc__.split("\n\n")[0],
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    ap.add_argument(
        "--sha",
        default=None,
        help="commit SHA to render (default: current HEAD).",
    )
    ap.add_argument(
        "chapter",
        nargs="+",
        type=pathlib.Path,
        help="path(s) to chapter Markdown files.",
    )
    args = ap.parse_args(argv)

    try:
        from playwright.sync_api import sync_playwright  # noqa: F401
    except ImportError:
        print(
            "playwright is not installed. Run:\n"
            "    pip install playwright\n"
            "    playwright install chromium",
            file=sys.stderr,
        )
        return 1

    sha = args.sha or git_head()
    short = sha[:7]
    for md in args.chapter:
        md_path = md.resolve()
        if not md_path.is_file():
            print(f"skipping (not a file): {md}", file=sys.stderr)
            continue
        out_dir = ART / short / md_path.stem
        capture_chapter(md_path, sha, out_dir)

    print(f"\ndone. open {ART / short}/ to review.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
