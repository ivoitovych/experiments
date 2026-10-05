#!/usr/bin/env python3
"""Compare RESULT lines and tester summaries between kernel builds.

Usage: summarize.py <logs-dir> <build-a> <build-b>
Prints a Markdown report to stdout.
"""
import os
import re
import sys

SPLAT = re.compile(r"BUG: KASAN|WARNING:|possible circular locking|"
                   r"BUG: |Oops|kmemleak: .*new suspected")
ANSI = re.compile(r"\x1b\[[0-9;]*m")


def results(path):
    out = []
    with open(path, errors="replace") as f:
        for line in f:
            line = ANSI.sub("", line.rstrip())
            if line.startswith("RESULT "):
                out.append(line[7:])
            elif "Send Mesh Failed" in line:
                out.append("dmesg: " + line.split("] ", 1)[-1])
            elif "Mesh Send tag" in line:
                out.append(line.split(": ", 1)[-1])
    return out


def splats(path):
    with open(path, errors="replace") as f:
        return [l.rstrip() for l in f if SPLAT.search(l)]


def tester_cases(path):
    cases = {}
    total = None
    in_summary = False
    with open(path, errors="replace") as f:
        for line in f:
            line = ANSI.sub("", line.rstrip())
            if line.startswith("Test Summary"):
                in_summary = True
                continue
            if not in_summary:
                continue
            if line.startswith("Total:"):
                total = line
                break
            m = re.match(r"(.+?)\s{2,}(Passed|Failed|Timed out|Not Run)\s",
                         line)
            if m:
                cases[m.group(1).strip()] = m.group(2)
    return cases, total


def main():
    logs, a, b = sys.argv[1:4]
    names = sorted(set(os.listdir(os.path.join(logs, a))) |
                   set(os.listdir(os.path.join(logs, b))))
    print(f"# Results: `{a}` vs `{b}`\n")
    for name in names:
        pa = os.path.join(logs, a, name)
        pb = os.path.join(logs, b, name)
        title = name[:-4]
        if "tester" in name:
            ca, ta = tester_cases(pa) if os.path.exists(pa) else ({}, None)
            cb, tb = tester_cases(pb) if os.path.exists(pb) else ({}, None)
            print(f"## {title}\n")
            print(f"- {a}: {ta}\n- {b}: {tb}")
            diff = [c for c in sorted(set(ca) | set(cb))
                    if ca.get(c) != cb.get(c)]
            notpass = sorted(c for c in set(ca) | set(cb)
                             if ca.get(c) != "Passed" or cb.get(c) != "Passed")
            print(f"- per-case differences: {len(diff)}")
            for c in diff:
                print(f"  - {c}: {a}={ca.get(c)} {b}={cb.get(c)}")
            for c in notpass:
                print(f"- not passing: {c}: {a}={ca.get(c)} {b}={cb.get(c)}")
        else:
            ra = results(pa) if os.path.exists(pa) else ["(missing)"]
            rb = results(pb) if os.path.exists(pb) else ["(missing)"]
            print(f"## {title}\n")
            print(f"| {a} | {b} |\n|---|---|")
            for i in range(max(len(ra), len(rb))):
                x = ra[i] if i < len(ra) else ""
                y = rb[i] if i < len(rb) else ""
                mark = "" if x == y else " **≠**"
                print(f"| `{x}` | `{y}`{mark} |")
        for k, p in ((a, pa), (b, pb)):
            if os.path.exists(p):
                s = splats(p)
                print(f"\n{k} kernel reports: {len(s)}" +
                      "".join(f"\n    {l}" for l in s[:10]))
        print()


if __name__ == "__main__":
    main()
