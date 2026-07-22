#!/usr/bin/env python3
"""Run every example under examples/ and fail if any raises.

This keeps the code snippets embedded in the manuscript honest: each one is
executed end-to-end, so a broken example breaks the check.

Run:  .venv/bin/python scripts/check_examples.py   (or: make check-examples)
"""
from __future__ import annotations

import pathlib
import runpy
import sys
import traceback

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXAMPLES = ROOT / "examples"


def main() -> None:
    scripts = sorted(EXAMPLES.glob("*.py"))
    if not scripts:
        print(f"FAIL: no example scripts found under {EXAMPLES}. Refusing to "
              f"report green over an empty inventory (run from the repository "
              f"root).")
        sys.exit(1)
    failures: list[str] = []
    for script in scripts:
        print(f"=== {script.relative_to(ROOT)} ===")
        try:
            runpy.run_path(str(script), run_name="__main__")
        except Exception:  # noqa: BLE001 - report and continue
            traceback.print_exc()
            failures.append(script.name)
        print()
    if failures:
        print(f"FAILED: {failures}")
        sys.exit(1)
    print(f"OK - {len(scripts)} examples ran")


if __name__ == "__main__":
    main()
