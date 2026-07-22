#!/usr/bin/env python3
"""Verify that fact-check cards citing executable checks match reality.

A card may cite an executable check as
`scripts/verify_identities.py::<check_name>`. This script runs the
identity suite and fails if any cited check name does not exist or does
not PASS — so a card can never keep claiming a green check that has
been renamed, removed, or broken.

Run:  .venv/bin/python scripts/check_card_citations.py
Invoked by tools/lint.py when a virtualenv with numpy is available.
"""
from __future__ import annotations

import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CITE_RE = re.compile(r"verify_identities\.py::([A-Za-z0-9_]+)")


def main() -> int:
    proc = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "verify_identities.py"),
         "--manifest"],
        capture_output=True, text=True)
    passing = set()
    known = set()
    for line in proc.stdout.splitlines():
        parts = line.split()
        if len(parts) == 2 and parts[0] in ("PASS", "FAIL"):
            known.add(parts[1])
            if parts[0] == "PASS":
                passing.add(parts[1])

    if not known:
        print("FAIL: the identity suite produced no PASS/FAIL results "
              "(is numpy available? run with the project venv). Refusing to "
              "report green — card citations were not actually verified.")
        if proc.stderr.strip():
            print(proc.stderr.strip()[:500])
        return 1

    problems = []
    cited = 0
    for path in sorted((ROOT / "factcheck").rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        for m in CITE_RE.finditer(text):
            cited += 1
            name = m.group(1)
            rel = path.relative_to(ROOT)
            if name not in known:
                problems.append(f"{rel}: cites unknown check '{name}'")
            elif name not in passing:
                problems.append(f"{rel}: cites failing check '{name}'")

    if problems:
        for p in problems:
            print(p)
        print(f"FAIL: {len(problems)} bad check citation(s)")
        return 1
    print(f"OK — {cited} check citation(s) verified against "
          f"{len(passing)}/{len(known)} passing checks")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
