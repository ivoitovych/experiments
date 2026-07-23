#!/usr/bin/env python3
"""Generate TOC.md from the delivered manuscript's actual headings.

Walks book/ in reading order and emits, for every file, its H1 title
(linked) and every H2 section heading (linked with a GitHub anchor).
TOC.md is therefore always true by construction; the original planned
outline it replaced is preserved at archive/plan-original-toc.md.

Usage: python3 scripts/generate_toc.py
"""

from __future__ import annotations
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BOOK = ROOT / "book"
OUT = ROOT / "TOC.md"

# Reading order: front matter, prelude, parts 1-13, back matter — which is
# exactly the lexicographic order of the directory names in book/.
PART_TITLES = {
    "00-front-matter": "Front Matter",
    "part-00-historical-prelude": "Historical Prelude",
    "part-01-orientation": "Part I — Orientation and Framing",
    "part-02-formalism": "Part II — Mathematical and Physical Formalism",
    "part-03-qubits": "Part III — Qubits and Multi-Qubit Systems",
    "part-04-gates-and-circuits": "Part IV — Gates, Circuits, and Computational Phenomena",
    "part-05-measurement-and-information": "Part V — Measurement and Quantum Information",
    "part-06-algorithms": "Part VI — Algorithms",
    "part-07-complexity": "Part VII — Complexity Theory",
    "part-08-noise-and-qec": "Part VIII — Noise, Errors, and Fault Tolerance",
    "part-09-hardware-and-software": "Part IX — Hardware, Control, and Software",
    "part-10-practice-and-era": "Part X — Practice and Era",
    "part-11-applications": "Part XI — Applications",
    "part-12-adjacent-models": "Part XII — Adjacent Models and Communication",
    "part-13-perspective-and-direction": "Part XIII — Engineering Perspective, Epistemics, and Direction",
    "99-back-matter": "Back Matter",
}


def slugify(text: str) -> str:
    s = text.strip().lower()
    s = re.sub(r"[^\w\s-]", "", s)
    return s.replace(" ", "-")


def read_h1(md) -> str:
    """The file's H1 title (the `# ...` line), falling back to its name."""
    for line in md.read_text(encoding="utf-8").splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return md.name


def book_parts():
    """The book's top-level directories in **canonical reading order**
    (the insertion order of PART_TITLES: front matter, prelude, Parts I-XIII,
    back matter) — NOT ASCII order, which would misplace `99-back-matter`
    before the parts. This is the single source of truth for book structure,
    derived from the real `book/` tree, shared by TOC and mdBook generation.

    Guards that the on-disk directories exactly match PART_TITLES, so a new
    or renamed part cannot be silently dropped, duplicated, or misordered.
    """
    on_disk = {p.name for p in BOOK.iterdir() if p.is_dir()}
    known = set(PART_TITLES)
    if on_disk != known:
        raise SystemExit(
            "book/ directories do not match PART_TITLES in generate_toc.py — "
            f"on disk but unlabelled: {sorted(on_disk - known)}; "
            f"labelled but absent: {sorted(known - on_disk)}. "
            "Update PART_TITLES (which also fixes the reading order).")
    return [(name, PART_TITLES[name], BOOK / name) for name in PART_TITLES]


def walk_book():
    """Yield (dirname, part_label, [(md_path, h1_title), ...]) in reading order."""
    for name, label, d in book_parts():
        yield name, label, [(md, read_h1(md)) for md in sorted(d.glob("*.md"))]


def main() -> None:
    lines: list[str] = [
        "# Table of Contents",
        "",
        "*Generated from the delivered manuscript's headings by",
        "`scripts/generate_toc.py` (`make toc`) — do not edit by hand.",
        "The original planned outline lives at",
        "[archive/plan-original-toc.md](archive/plan-original-toc.md).*",
        "",
    ]
    for _name, title, files in walk_book():
        lines.append(f"## {title}")
        lines.append("")
        for md, h1 in files:
            rel = md.relative_to(ROOT).as_posix()
            lines.append(f"- **[{h1}]({rel})**")
            for l in md.read_text(encoding="utf-8").splitlines():
                if l.startswith("## "):
                    heading = l[3:].strip()
                    lines.append(f"  - [{heading}]({rel}#{slugify(heading)})")
        lines.append("")
    rendered = "\n".join(lines) + "\n"
    if "--check-readme" in sys.argv:
        readme = (ROOT / "README.md").read_text(encoding="utf-8")
        book_files = sorted(BOOK.rglob("*.md"))
        if not book_files:
            print("FAIL: no manuscript files found — refusing to report "
                  "green README coverage over an empty inventory.")
            sys.exit(1)
        missing = []
        for _name, _title, files in walk_book():
            for md, _h1 in files:
                rel = md.relative_to(ROOT).as_posix()
                if f"({rel})" not in readme:
                    missing.append(rel)
        if missing:
            print("DRIFT: README Table of Contents is missing "
                  f"{len(missing)} chapter link(s):")
            for m in missing:
                print(f"  {m}")
            sys.exit(1)
        print("README Table of Contents covers every manuscript file")
        return
    if "--check" in sys.argv:
        current = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if current != rendered:
            print(f"DRIFT: {OUT.name} is out of date — run `make toc` to regenerate")
            sys.exit(1)
        print(f"{OUT.name} is in sync with the manuscript headings")
        return
    OUT.write_text(rendered, encoding="utf-8")
    n = sum(1 for l in lines if l.startswith("  - "))
    print(f"TOC.md written: {n} section entries")


if __name__ == "__main__":
    main()
