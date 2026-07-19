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
    for part_dir in sorted(p for p in BOOK.iterdir() if p.is_dir()):
        title = PART_TITLES.get(part_dir.name, part_dir.name)
        lines.append(f"## {title}")
        lines.append("")
        for md in sorted(part_dir.glob("*.md")):
            rel = md.relative_to(ROOT).as_posix()
            content = md.read_text(encoding="utf-8").splitlines()
            h1 = next((l[2:].strip() for l in content if l.startswith("# ")), md.name)
            lines.append(f"- **[{h1}]({rel})**")
            for l in content:
                if l.startswith("## "):
                    heading = l[3:].strip()
                    lines.append(f"  - [{heading}]({rel}#{slugify(heading)})")
        lines.append("")
    rendered = "\n".join(lines) + "\n"
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
