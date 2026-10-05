#!/usr/bin/env python3
"""Tabulate the repeated kmemleak runs (run-kmemleak-reps.sh).

For each case and scan method: in how many runs the last of the five
scans reported an object allocated by mgmt_mesh_add() (the leaked
request) and one allocated by hci_sock_create() (its socket), and the
earliest round in which the request was reported.

Usage: tabulate-reps.py <logs-dir> <build-name>...   (Markdown to stdout)
"""
import collections
import glob
import os
import re
import sys

NAME = re.compile(r"(\w+)-(inproc-plain|inproc-shrink|after-exit)-r\d+$")
ROUND = re.compile(r"kmemleak round=(\d).*from_mgmt_mesh_add=(\d+) "
                   r"from_hci_sock_create=(\d+)")
METHODS = {
    "after-exit": "plain, after the reproducer exited",
    "inproc-plain": "plain, from the running reproducer",
    "inproc-shrink": "slab caches shrunk, from the running reproducer",
}


def main():
    logs = sys.argv[1]
    for build in sys.argv[2:]:
        runs = collections.defaultdict(list)
        for f in sorted(glob.glob(os.path.join(logs, "reps-" + build, "*.log"))):
            m = NAME.match(os.path.basename(f)[:-4])
            if not m:
                continue
            rounds = []
            with open(f, errors="replace") as fh:
                for line in fh:
                    r = ROUND.search(line)
                    if r:
                        rounds.append(tuple(map(int, r.groups())))
            last = rounds[-1] if rounds else (0, 0, 0)
            first = next((n for n, mesh, _ in rounds if mesh), None)
            runs[m.groups()].append((last[1] > 0, last[2] > 0, first))

        print(f"## {build}\n")
        print("| Case | Scan | Runs | Request reported | Socket reported "
              "| First round |")
        print("|---|---|---|---|---|---|")
        for (case, method), v in sorted(runs.items()):
            n = len(v)
            firsts = sorted({f for _, _, f in v if f})
            print(f"| `-{case.upper()}` | {METHODS[method]} | {n} "
                  f"| {sum(a for a, _, _ in v)}/{n} "
                  f"| {sum(b for _, b, _ in v)}/{n} "
                  f"| {', '.join(map(str, firsts)) or '-'} |")
        print()


if __name__ == "__main__":
    main()
