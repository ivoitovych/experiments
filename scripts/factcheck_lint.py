#!/usr/bin/env python3
"""Fact-check card linter + staleness check (CARD-SPEC.md design).

Lints fact-check *cards* and reports freshness. The governing idea (see
factcheck/CARD-SPEC.md) is that a card's stored **verdict** and its
**freshness** are independent axes:

  - verdict  (stored in the card)   : unverified | verified | refuted | depends
  - freshness(computed here, never   : current | stale
              written back)

A card that was `verified` and whose manuscript wording later drifts is not
"unverified again" — it is *verified-but-stale*. The linter flags staleness; a
human re-confirms against the new text and bumps `Last checked`. The verdict is
never auto-overwritten, so the record that the card once passed is preserved.

Which files are linted: any file under factcheck/ that declares a
``Mirrors `book/<path>` `` line AND contains at least one card (a level-3
heading followed by a ``**Status:**`` field). The interim-format mirror files
(old `**Claim** (anchor):` style) and meta files are skipped automatically.

Usage:  python3 scripts/factcheck_lint.py [--dashboard]
Exit 0 iff every linted card passes structural lint (staleness is reported, not
fatal, unless --strict-stale is given).
"""
import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
FC = ROOT / "factcheck"
BOOK = ROOT / "book"

VERDICTS = {"unverified", "verified", "refuted", "depends"}
CLARITY = ["clear", "unclear", "too broad", "not checkable"]
PLACEHOLDERS = ["todo", "fixme", "<quote needed>", "<source needed>",
                "<verbatim", "xxx", "tbd", "<result needed>"]
MIRROR_RE = re.compile(r"Mirrors\s+`(book/[^`]+)`")
CARD_RE = re.compile(r"^### (.+)$", re.M)
FIELD_RE = re.compile(r"^\*\*(Claim|Exact text|Context|Clarity|Status|Evidence|Last checked):\*\*", re.M)
REQUIRED = ["Claim", "Exact text", "Context", "Clarity", "Status", "Evidence", "Last checked"]
PATH_RE = re.compile(r"`((?:scripts|examples|book|figures|tools)/[A-Za-z0-9_./\-]+)`")


def norm(s: str) -> str:
    s = s.lower()
    for ch in "*$\\{}>":
        s = s.replace(ch, "")
    for ch in "\"'“”‘’":
        s = s.replace(ch, "")
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def split_cards(text):
    """Yield (title, body) for each level-3 card."""
    parts = CARD_RE.split(text)
    # parts = [pre, title1, body1, title2, body2, ...]
    for i in range(1, len(parts), 2):
        yield parts[i].strip(), parts[i + 1]


def parse_fields(body):
    """Return {field: value-text} for the **Field:** blocks in one card body."""
    fields = {}
    matches = list(FIELD_RE.finditer(body))
    for j, m in enumerate(matches):
        name = m.group(1)
        start = m.end()
        end = matches[j + 1].start() if j + 1 < len(matches) else len(body)
        fields[name] = body[start:end].strip()
    return fields


def exact_text_quote(value):
    """Extract the blockquoted verbatim text from an Exact-text field value."""
    lines = [ln[1:].strip() for ln in value.splitlines() if ln.lstrip().startswith(">")]
    return " ".join(lines).strip()


def evidence_items(value):
    return [ln for ln in value.splitlines() if re.match(r"^\s*\d+\.", ln)]


def check_interim(fc, text):
    """Structural check for interim-format mirror files (both dialects).

    Dialect A: "### Claim:" blocks with "- **Method:**" / "- **Status:**".
    Dialect B: "- **Claim** (anchor):" bullets with "- **Method**:" /
    "- **Verified**:" lines.
    Returns a list of problem strings.
    """
    problems = []
    lines = text.splitlines()
    # Dialect A blocks
    a_idx = [i for i, l in enumerate(lines) if l.startswith("### Claim:")]
    for i in a_idx:
        block = lines[i:i + 8]
        if not any(l.startswith("- **Method:**") for l in block):
            problems.append(f"claim at line {i+1} missing Method field")
        if not any(l.startswith("- **Status:**") for l in block):
            problems.append(f"claim at line {i+1} missing Status field")
    # Dialect B bullets
    b_idx = [i for i, l in enumerate(lines)
             if l.lstrip().startswith("- **Claim** (anchor):")]
    for i in b_idx:
        block = lines[i:i + 8]
        if not any("**Method**:" in l for l in block):
            problems.append(f"claim at line {i+1} missing Method field")
        if not any("**Verified**:" in l for l in block):
            problems.append(f"claim at line {i+1} missing Verified field")
    if not a_idx and not b_idx:
        if "no significant checkable claims" not in text.lower() \
                and "no factcheck entries are recorded" not in text.lower():
            problems.append("no recognisable claim entries (neither dialect)")
    return problems


def main(argv):
    strict_stale = "--strict-stale" in argv
    want_dash = "--dashboard" in argv

    skip = {"README.md", "CARD-SPEC.md", "_template.md", "_sources.md"}
    files = []
    interim = 0
    interim_problems = []
    interim_status = {}
    for fc in sorted(FC.rglob("*.md")):
        if fc.name in skip:
            continue
        text = fc.read_text()
        if not MIRROR_RE.search(text) or "**Status:**" not in text:
            interim += 1  # interim-format / not a card file
            for p in check_interim(fc, text):
                print(f"INTERIM {fc.relative_to(FC)}: {p}")
                interim_problems.append(p)
            for line in text.splitlines():
                s = line.strip()
                if s.startswith("- **Status:**"):
                    key = s[len("- **Status:**"):].strip().rstrip(".")[:24] or "(empty)"
                    interim_status[key] = interim_status.get(key, 0) + 1
                elif "**Verified**:" in s and "**Verdict**:" in s:
                    key = "verdict: " + s.split("**Verdict**:")[1].strip().rstrip(".")[:14]
                    interim_status[key] = interim_status.get(key, 0) + 1
            continue
        files.append((fc, text))

    failures = 0
    counts = {v: 0 for v in VERDICTS}
    stale_count = 0
    total = 0

    for fc, text in files:
        rel = fc.relative_to(FC)
        mirror = MIRROR_RE.search(text).group(1)
        src = ROOT / mirror
        srcnorm = norm(src.read_text()) if src.exists() else None
        if srcnorm is None:
            print(f"ORPHAN  {rel}  (mirrored {mirror} not found)")
            failures += 1

        for title, body in split_cards(text):
            total += 1
            fields = parse_fields(body)
            errs = []

            for req in REQUIRED:
                if req not in fields or not fields[req].strip():
                    errs.append(f"missing/empty field: {req}")

            status = fields.get("Status", "").split("\n")[0].strip().lower()
            if status and status not in VERDICTS:
                errs.append(f"Status not in verdict enum: {status!r}")
            counts[status] = counts.get(status, 0) + 1 if status in VERDICTS else counts.get(status, 0)

            clarity_raw = fields.get("Clarity", "").strip().lower()
            clarity_ok = any(clarity_raw.startswith(c) for c in CLARITY)
            if fields.get("Clarity") and not clarity_ok:
                errs.append(f"Clarity must start with one of {CLARITY}")

            ev = evidence_items(fields.get("Evidence", ""))

            if status == "verified":
                if not clarity_raw.startswith("clear"):
                    errs.append("verified requires Clarity: clear")
                if not ev:
                    errs.append("verified requires >=1 numbered evidence item")
                low = body.lower()
                for ph in PLACEHOLDERS:
                    if ph in low:
                        errs.append(f"verified card contains placeholder {ph!r}")
            if status == "refuted" and not ev:
                errs.append("refuted requires evidence explaining the contradiction")
            if status == "depends":
                if "condition" not in fields.get("Evidence", "").lower() \
                        and "condition" not in fields.get("Context", "").lower() \
                        and "depends" not in fields.get("Claim", "").lower():
                    errs.append("depends requires the condition stated in Claim/Context/Evidence")

            # repo-relative paths cited in evidence must exist
            for p in PATH_RE.findall(fields.get("Evidence", "")):
                if not (ROOT / p).exists():
                    errs.append(f"cited path does not exist: {p}")

            # staleness (verdict-independent)
            quote = exact_text_quote(fields.get("Exact text", ""))
            stale = False
            if srcnorm is not None and quote:
                if norm(quote) not in srcnorm:
                    stale = True
                    stale_count += 1

            tag = "FAIL" if errs else ("STALE" if stale else "ok")
            mark = "  " if tag == "ok" else "* "
            if errs or stale:
                print(f"{mark}{tag}  [{status or '?'}{'/stale' if stale else ''}]  {rel} :: {title}")
                for e in errs:
                    print(f"        - {e}")
            failures += len(errs)
            if stale and strict_stale:
                failures += 1

    print()
    if want_dash:
        print("Dashboard")
        for v in ["verified", "unverified", "refuted", "depends"]:
            print(f"  {v:<11} {counts.get(v, 0)}")
        print(f"  {'(stale)':<11} {stale_count}   <- verdict-independent; rerun & re-confirm")
        if interim_status:
            print("  interim-mirror claims by status:")
            for k in sorted(interim_status):
                print(f"    {k:<24} {interim_status[k]}")
        print()
    # Guard the *full* scanned factcheck inventory (card-spec + interim),
    # not the card-spec subset `files` (which is small until migration).
    book_n = len(sorted(BOOK.rglob("*.md")))
    fc_n = len(sorted(FC.rglob("*.md")))
    if not book_n or fc_n < book_n:
        print(f"FAIL: factcheck inventory looks wrong — {fc_n} factcheck "
              f"file(s) for {book_n} manuscript file(s). Refusing to report "
              f"green over an empty/partial inventory.")
        return 1
    print(f"{'PASS' if failures == 0 else 'FAIL'}: {failures} lint problem(s), "
          f"{stale_count} stale, across {total} card(s) in {len(files)} file(s)")
    if interim:
        print(f"NOTE: coverage is PARTIAL — {interim} interim-format factcheck "
              f"file(s) are not in card spec; structural interim check found "
              f"{len(interim_problems)} problem(s) "
              f"(anchor staleness for them is checked by factcheck_anchors.py)")
    if interim_problems:
        return 1
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
