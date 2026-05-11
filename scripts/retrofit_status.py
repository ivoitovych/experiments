#!/usr/bin/env python3
"""Retrofit existing chapter stubs with the richer status block.

Idempotent: replaces the legacy `> *Status: stub — to be drafted.*` line
with `> **Status:** stub · **Phase:** N · **Sections drafted:** 0 / M`.
Files that already have the new block are left untouched.
"""

from __future__ import annotations
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from phases import PHASE_BY_FILE  # noqa: E402

LEGACY_LINE = "> *Status: stub — to be drafted.*"


def count_sections(content: str) -> int:
    return len(re.findall(r"^## ", content, re.MULTILINE))


def main() -> None:
    book = ROOT / "book"
    updated = 0
    skipped = 0
    for md in sorted(book.rglob("*.md")):
        content = md.read_text(encoding="utf-8")
        if LEGACY_LINE not in content:
            skipped += 1
            continue
        phase = PHASE_BY_FILE.get(md.name, "?")
        total = count_sections(content)
        new_line = (
            f"> **Status:** stub · **Phase:** {phase} · "
            f"**Sections drafted:** 0 / {total}"
        )
        md.write_text(content.replace(LEGACY_LINE, new_line), encoding="utf-8")
        print(f"updated {md.relative_to(ROOT)}: phase {phase}, {total} sections")
        updated += 1
    print(f"\n{updated} files updated, {skipped} already in new format")


if __name__ == "__main__":
    main()
