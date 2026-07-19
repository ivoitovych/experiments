#!/usr/bin/env python3
r"""factcheck anchor self-check.

For every factcheck/*.md file, confirm each claim's quoted anchor still
appears in the mirrored book/ section. This is the "stale anchor" + "orphan
file" coverage check described in factcheck/README.md.

Matching is NORMALIZED, not byte-exact: anchors are meant to detect when the
manuscript wording for a claim changes, not to police LaTeX escaping. We
therefore strip markdown emphasis markers, collapse runs of whitespace, and
fold backslashes before comparing, so that a `**bold**`/`\\;`-vs-`\;` cosmetic
difference is not reported as drift.

Usage:  python3 scripts/factcheck_anchors.py
Exit code 0 if all anchors resolve and every factcheck file has a live mirror,
1 otherwise. Prints a per-file summary.
"""
import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
FC = ROOT / "factcheck"
BOOK = ROOT / "book"

# Two accepted locator formats during the readable-format migration:
#   old:  - **Claim** (anchor): "..."
#   new:  - **Find in text:** "..."
ANCHOR_RE = re.compile(
    r'(?:\*\*Claim\*\* \(anchor\):|\*\*Find in text:\*\*)\s*"(.+?)"\s*$', re.M)


def norm(s: str) -> str:
    s = s.lower()                   # case (anchors often start a sentence)
    for ch in "*$\\{}>":            # markdown emphasis/blockquote + LaTeX math noise
        s = s.replace(ch, "")
    for ch in "\"'“”‘’":  # straight + typographic quotes
        s = s.replace(ch, "")
    s = re.sub(r"\s+", " ", s)      # collapse whitespace
    return s.strip()


def main() -> int:
    failures = 0
    files = sorted(FC.rglob("*.md"))
    for fc in files:
        rel = fc.relative_to(FC)
        if rel.name in ("README.md", "_sources.md", "CARD-SPEC.md",
                        "_template.md", "_pilot.md"):
            continue
        src = BOOK / rel
        if not src.exists():
            print(f"ORPHAN  {rel}  (no mirrored book/ section)")
            failures += 1
            continue
        srctext = norm(src.read_text())
        anchors = ANCHOR_RE.findall(fc.read_text())
        miss = [a for a in anchors if norm(a) not in srctext]
        status = "OK  " if not miss else "STALE"
        print(f"{status}  {rel}  ({len(anchors)} anchors, {len(miss)} stale)")
        for m in miss:
            print(f"        stale anchor: {m!r}")
        failures += len(miss)
    print(f"\n{'PASS' if failures == 0 else 'FAIL'}: {failures} problem(s) across {len(files)} files")
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
