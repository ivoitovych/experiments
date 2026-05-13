#!/usr/bin/env python3
"""Render a local Markdown file via a throwaway GitHub Gist and capture
screenshots of every section, then delete the gist.

The motivating use case: investigate GitHub Markdown + MathJax rendering
quirks without polluting the working branch with commit-after-commit of
test files. The loop is:

  edit local file -> tools/render-gist.py file.md -> review PNGs -> repeat

instead of the previous "commit + push + open GitHub + screenshot
manually" cycle.

Usage:

  tools/render-gist.py docs/render-tests/math-context-matrix.md
  tools/render-gist.py path/to/scratch.md --keep-gist

Setup (one-time, on the local machine that will run captures):

  pip install playwright
  playwright install chromium
  gh auth login
  gh auth refresh -s gist   # if not already in scope

The script will print the gist URL it created, the screenshot output
directory, and the gist URL/id it deleted (or "kept" with --keep-gist).
Output PNGs go under .artifacts/screenshots/gist-<short-id>/<file-stem>/
which is gitignored along with the rest of .artifacts/.

Caveat: at the time of writing, we have not yet verified that
gist.github.com renders math via MathJax in the same way that
github.com/<owner>/<repo>/blob/<sha>/... does. The first run of this
script answers that question. If gists do *not* render math, fall back
to the throwaway-branch approach: push the file to a temporary branch
in any repo with math rendering, screenshot, delete the branch.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART = ROOT / ".artifacts" / "screenshots"


def run(cmd: list[str], **kwargs) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kwargs)


def require_tool(name: str) -> None:
    if shutil.which(name) is None:
        print(f"ERROR: required tool '{name}' is not on PATH.", file=sys.stderr)
        sys.exit(1)


def create_gist(md: pathlib.Path) -> tuple[str, str]:
    """Create a secret gist containing only the given Markdown file.
    Returns (gist_url, gist_id)."""
    # gh gist create file.md -d "..." returns the gist URL on stdout.
    # Use --filename to control the filename inside the gist (gh defaults
    # to the basename of the local path, which is fine).
    result = run([
        "gh", "gist", "create",
        str(md),
        "--desc", f"render-gist.py probe for {md.name}",
        # Secret gists are still rendered the same as public ones by
        # gist.github.com, but do not appear in the user's public profile.
        # No flag = secret in current gh versions.
    ])
    url = result.stdout.strip().splitlines()[-1].strip()
    m = re.search(r"/([0-9a-f]+)/?$", url)
    if not m:
        raise RuntimeError(f"could not parse gist id from URL: {url!r}")
    return url, m.group(1)


def delete_gist(gist_id: str) -> None:
    subprocess.run(["gh", "gist", "delete", gist_id], check=True)


def capture(gist_url: str, gist_id: str, md_name: str) -> pathlib.Path:
    """Drive headless Chromium against the gist URL and capture per-H2
    screenshots. Returns the output directory."""
    from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

    out_dir = ART / f"gist-{gist_id[:8]}" / pathlib.Path(md_name).stem
    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"capturing {gist_url}")
    print(f"  -> {out_dir.relative_to(ROOT)}/")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(
            viewport={"width": 1280, "height": 900},
            device_scale_factor=1,
        )
        page = ctx.new_page()
        page.goto(gist_url, wait_until="networkidle", timeout=90_000)

        # Same math-wait strategy as tools/screenshots.py. Permissive: any
        # of mjx-container, g-math, <math>, .katex counts as rendered.
        try:
            page.wait_for_function(
                """() => {
                    const placeholders = document.querySelectorAll(
                        '.js-inline-math, .js-display-math'
                    );
                    if (placeholders.length === 0) return true;
                    const rendered = document.querySelectorAll(
                        'mjx-container, g-math, math, .katex'
                    ).length;
                    return rendered >= placeholders.length;
                }""",
                timeout=30_000,
            )
        except PWTimeout:
            diag = page.evaluate(
                """() => ({
                    js_inline: document.querySelectorAll('.js-inline-math').length,
                    js_display: document.querySelectorAll('.js-display-math').length,
                    mjx_container: document.querySelectorAll('mjx-container').length,
                    g_math: document.querySelectorAll('g-math').length,
                    math_tag: document.querySelectorAll('math').length,
                    katex: document.querySelectorAll('.katex').length,
                })"""
            )
            print(
                f"  WARN math-wait timed out after 30s; DOM state: {diag}",
                file=sys.stderr,
            )
            print(
                "  proceeding with a 5s fallback delay; screenshots may be "
                "missing math",
                file=sys.stderr,
            )
            print(
                "  if every counter is 0 and the file uses math, gists may "
                "not render math the same way blob URLs do — fall back to "
                "the throwaway-branch approach.",
                file=sys.stderr,
            )
            page.wait_for_timeout(5_000)

        page.evaluate("() => document.fonts && document.fonts.ready")
        page.wait_for_timeout(400)

        # Gist rendering puts the markdown body inside .markdown-body /
        # .gist-content / similar; locate the article-equivalent root by
        # trying several known classes.
        body_handle = (
            page.query_selector("article")
            or page.query_selector(".markdown-body")
            or page.query_selector(".gist-content")
            or page.query_selector(".file")
        )
        if body_handle is None:
            raise RuntimeError("could not find the rendered markdown root on the gist page")
        body_box = body_handle.bounding_box()
        if body_box is None:
            raise RuntimeError("could not measure the bounding box of the markdown root")

        h2_info = body_handle.eval_on_selector_all(
            "h2",
            """nodes => nodes.map(n => ({
                top: n.getBoundingClientRect().top + window.scrollY,
                text: n.textContent.trim()
            }))""",
        )
        body_bottom = body_handle.evaluate(
            "n => n.getBoundingClientRect().bottom + window.scrollY"
        )

        # Header.
        first_top = h2_info[0]["top"] if h2_info else body_bottom
        header = out_dir / "00-header.png"
        page.screenshot(
            path=str(header),
            full_page=True,
            clip={
                "x": body_box["x"],
                "y": body_box["y"],
                "width": body_box["width"],
                "height": max(1, first_top - body_box["y"] - 8),
            },
        )
        print(f"     {header.name}")

        for i, h in enumerate(h2_info):
            top = h["top"]
            bottom = h2_info[i + 1]["top"] if i + 1 < len(h2_info) else body_bottom
            slug = re.sub(r"[^a-z0-9]+", "-", h["text"].lower()).strip("-")[:60]
            name = f"{i + 1:02d}-{slug}.png"
            page.screenshot(
                path=str(out_dir / name),
                full_page=True,
                clip={
                    "x": body_box["x"],
                    "y": max(0, top - 8),
                    "width": body_box["width"],
                    "height": max(1, bottom - top + 4),
                },
            )
            print(f"     {name}")

        browser.close()
    return out_dir


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(
        description=__doc__.split("\n\n")[0],
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    ap.add_argument(
        "markdown",
        type=pathlib.Path,
        help="local Markdown file to render",
    )
    ap.add_argument(
        "--keep-gist",
        action="store_true",
        help="do not delete the gist after capturing (useful when iterating)",
    )
    args = ap.parse_args(argv)

    require_tool("gh")
    try:
        from playwright.sync_api import sync_playwright  # noqa: F401
    except ImportError:
        print(
            "playwright is not installed. Activate .venv and run:\n"
            "    pip install playwright\n"
            "    playwright install chromium",
            file=sys.stderr,
        )
        return 1

    md = args.markdown.resolve()
    if not md.is_file():
        print(f"not a file: {md}", file=sys.stderr)
        return 1

    print(f"creating gist from {md.relative_to(ROOT) if md.is_relative_to(ROOT) else md}")
    url, gid = create_gist(md)
    print(f"  gist: {url}")
    print(f"  id:   {gid}")

    try:
        capture(url, gid, md.name)
    finally:
        if args.keep_gist:
            print(f"keeping gist (use 'gh gist delete {gid}' when done)")
        else:
            print(f"deleting gist {gid}")
            delete_gist(gid)

    print(f"\ndone. open {ART / f'gist-{gid[:8]}'}/ to review.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
