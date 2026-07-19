#!/usr/bin/env python3
"""Generate PROGRESS.md from the status blocks in each chapter file.

Scans book/ for chapter, front-matter, and appendix files, reads each
status block, groups by phase, and writes a checkbox-style progress page
at the repo root.

Re-run after editing any status block.
"""

from __future__ import annotations
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from phases import PHASES  # noqa: E402

STATUS_RE = re.compile(
    r"\*\*Status:\*\*\s*([\w-]+).*?"
    r"\*\*Phase:\*\*\s*(\d+).*?"
    r"\*\*Sections drafted:\*\*\s*(\d+)\s*/\s*(\d+)"
)

# States in increasing order of completeness.
STATE_ORDER = ["stub", "outlined", "draft", "prereviewed", "reviewed", "final"]
COMPLETED = set(STATE_ORDER[STATE_ORDER.index("draft"):])


def parse(content: str) -> dict | None:
    m = STATUS_RE.search(content)
    if not m:
        return None
    return {
        "status": m.group(1).lower(),
        "phase": int(m.group(2)),
        "drafted": int(m.group(3)),
        "total": int(m.group(4)),
    }


def title_of(content: str) -> str:
    first = content.split("\n", 1)[0]
    return first.lstrip("# ").strip()


def main() -> None:
    entries: list[dict] = []
    for md in sorted((ROOT / "book").rglob("*.md")):
        content = md.read_text(encoding="utf-8")
        parsed = parse(content)
        if parsed is None:
            continue
        entries.append({
            "path": md.relative_to(ROOT),
            "title": title_of(content),
            **parsed,
        })

    by_phase: dict[int, list[dict]] = {}
    for e in entries:
        by_phase.setdefault(e["phase"], []).append(e)

    total = len(entries)
    started = sum(1 for e in entries if e["status"] != "stub")
    completed = sum(1 for e in entries if e["status"] in COMPLETED)

    lines: list[str] = []
    lines.append("# Progress")
    lines.append("")
    lines.append("Writing progress per chapter, front-matter file, and appendix.")
    lines.append("")
    lines.append("Status states (in order): `stub` → `outlined` → `draft` → `prereviewed` → `reviewed` → `final`.")
    lines.append("")
    lines.append(
        "To update: edit the status block at the top of any file, then run "
        "`python3 scripts/generate_progress.py` to regenerate this page."
    )
    lines.append("")
    lines.append("## Summary")
    lines.append("")
    lines.append(f"- **Files total:** {total}")
    lines.append(f"- **Started (past `stub`):** {started} / {total}")
    lines.append(f"- **Completed (`draft` or later):** {completed} / {total}")
    lines.append("")
    lines.append("Checkbox legend: a checked box means the file has reached")
    lines.append("`draft` status or later in the lifecycle above — it does not")
    lines.append("by itself distinguish `prereviewed` from `reviewed`/`final`")
    lines.append("(the per-entry status label carries that).")
    lines.append("")
    for phase in sorted(by_phase):
        files = by_phase[phase]
        ph_started = sum(1 for e in files if e["status"] != "stub")
        ph_completed = sum(1 for e in files if e["status"] in COMPLETED)
        name = PHASES.get(phase, "?")
        lines.append(
            f"- **Phase {phase} ({name}):** started {ph_started}/{len(files)}, "
            f"completed {ph_completed}/{len(files)}"
        )
    lines.append("")

    for phase in sorted(by_phase):
        name = PHASES.get(phase, "?")
        lines.append(f"## Phase {phase} — {name}")
        lines.append("")
        for e in by_phase[phase]:
            box = "x" if e["status"] in COMPLETED else " "
            lines.append(
                f"- [{box}] [{e['title']}]({e['path']}) — "
                f"*{e['status']}* — sections {e['drafted']}/{e['total']}"
            )
        lines.append("")

    out = ROOT / "PROGRESS.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote PROGRESS.md ({total} entries)")


if __name__ == "__main__":
    main()
