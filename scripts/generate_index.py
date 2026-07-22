#!/usr/bin/env python3
"""Generate book/99-back-matter/index.md from a curated term list.

Each term maps to one or more *references*, written as either a section
number ("8.3") or a bare chapter/appendix id ("7", "B"). The script scans
the manuscript for the matching heading, resolves it to a relative link with
the GitHub heading anchor, and emits an alphabetical index. Unresolved
references are reported so the term list can be corrected.

Run:  python scripts/generate_index.py   (or: make index)
"""
from __future__ import annotations

import os
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BOOK = ROOT / "book"
INDEX_PATH = BOOK / "99-back-matter" / "index.md"
INDEX_DIR = INDEX_PATH.parent

H1_RE = re.compile(r"^#\s+(?:Chapter\s+(\d+)|Appendix\s+([A-Z]))\b")
H2_RE = re.compile(r"^##\s+((\d+\.\d+)\b.*)$")

# Curated term -> list of references. A reference is a section number
# ("8.3") or a chapter/appendix id ("7", "B"). Keep alphabetical-ish; the
# script sorts the output regardless.
TERMS: dict[str, list[str]] = {
    "Adiabatic quantum computation": ["32.1"],
    "Barren plateaus": ["15.7", "30.4"],
    "BB84 protocol": ["27.7", "33.2"],
    "Boson sampling": ["32.6"],
    "Classical shadows": ["11.5"],
    "CLOPS": ["22.8"],
    "Continuous-variable quantum computing": ["32.5"],
    "Cross-entropy benchmarking (XEB)": ["22.10"],
    "Density matrix": ["5.10"],
    "Dequantization": ["17.12", "30.8"],
    "Dynamical decoupling": ["18.3", "21.11"],
    "Error budget": ["18.16"],
    "Error mitigation": ["18.18", "25.3"],
    "Gate teleportation": ["19.21"],
    "GHZ state": ["7.6"],
    "Harvest now, decrypt later": ["27.6"],
    "Lattice surgery": ["19.22"],
    "Magic state distillation": ["19.21"],
    "Measurement-based quantum computation": ["32.3"],
    "Mid-circuit measurement": ["9.8", "22.11"],
    "No-signaling": ["5.11", "10.6"],
    "Parameter-shift rule": ["8.13", "11.7"],
    "Partial trace": ["5.12"],
    "POVM": ["11.2"],
    "Quantum annealing": ["20.11", "32.2"],
    "Quantum channel (CPTP map)": ["10.13", "18"],
    "Quantum key distribution": ["27.7", "33.2"],
    "Quantum repeaters": ["33.3"],
    "Quantum teleportation": ["7.12", "33.1"],
    "Quantum volume": ["22.7"],
    "Qubit-wise commuting Pauli groups": ["11.7"],
    "Readout-error mitigation": ["11.7", "18.5"],
    "Schmidt decomposition": ["7.10"],
    "Surface code": ["19.12"],
    "Threshold theorem": ["19.19"],
    "Trace distance": ["12.6"],
    "Transpilation": ["23.6"],
    "Trotterization": ["16.2"],
    "Twin-field QKD": ["33.4"],
    "Uncomputation": ["9.4"],
    "Variational quantum algorithms": ["15.7"],
    "Von Neumann entropy": ["12.2"],
    "Amplitude amplification": ["14.7"],
    "Amplitude estimation": ["14.8"],
    "Ancilla qubit": ["9.3"],
    "Bell states": ["7.5"],
    "Bernstein–Vazirani algorithm": ["14.3"],
    "Block encoding": ["16.4"],
    "Bloch sphere": ["6.8"],
    "Born rule": ["5.4"],
    "BQP (complexity class)": ["17"],
    "Clifford + T": ["8.10"],
    "CNOT gate": ["8.6"],
    "Decoherence": ["10.9", "18"],
    "Deutsch–Jozsa algorithm": ["14.2"],
    "Discrete logarithm": ["15.4"],
    "Entanglement": ["7"],
    "Fault tolerance": ["19"],
    "Fidelity (gate)": ["22.3", "18.16"],
    "Fidelity (readout)": ["22.6"],
    "Fidelity (state)": ["12.7"],
    "Glossary": ["E"],
    "Grover's algorithm": ["15.1"],
    "Hadamard gate": ["8.3"],
    "Hamiltonian simulation": ["16.1"],
    "Hardware platforms": ["20"],
    "HHL algorithm": ["15.5"],
    "Hidden subgroup problem": ["14.9"],
    "Interference": ["10.2"],
    "Kraus operators": ["10.13"],
    "Linear combination of unitaries": ["16.3"],
    "Measurement": ["11"],
    "Mixed states": ["5.9", "10.10"],
    "NISQ": ["25"],
    "No-cloning theorem": ["5.13", "10.5"],
    "Pauli gates": ["8.2"],
    "Phase estimation": ["14.6"],
    "Postulates of quantum mechanics": ["5"],
    "QAOA": ["15.9"],
    "Quantum Fourier transform": ["14.5"],
    "Quantum signal processing": ["16.6"],
    "Quantum singular value transformation": ["16.7"],
    "Quantum walks": ["15.6"],
    "Qubitization": ["16.5"],
    "Randomized benchmarking": ["18.12"],
    "Rotation gates": ["8.5"],
    "Shor's algorithm": ["15.2"],
    "Simon's algorithm": ["14.4"],
    "Solovay–Kitaev theorem": ["8.11"],
    "Stabilizer formalism": ["19.8"],
    "Superposition": ["10.1"],
    "SWAP gate": ["8.6"],
    "Tensor product": ["4.8"],
    "Toffoli gate": ["8.8"],
    "Variational quantum eigensolver": ["15.8"],
}


def slugify(text: str) -> str:
    s = text.strip().lower()
    s = re.sub(r"[^\w\s-]", "", s)
    return s.replace(" ", "-")


def scan() -> tuple[dict[str, tuple[str, str]], dict[str, str]]:
    """Return (section_map, chapter_map).

    section_map: "8.3" -> (repo-relative path, heading anchor)
    chapter_map: "8" / "B" -> repo-relative path
    """
    section_map: dict[str, tuple[str, str]] = {}
    chapter_map: dict[str, str] = {}
    for md in sorted(BOOK.rglob("*.md")):
        rel = md.relative_to(ROOT).as_posix()
        for line in md.read_text(encoding="utf-8").splitlines():
            m1 = H1_RE.match(line)
            if m1:
                key = m1.group(1) or m1.group(2)
                chapter_map.setdefault(key, rel)
                continue
            m2 = H2_RE.match(line)
            if m2:
                section_map[m2.group(2)] = (rel, slugify(m2.group(1)))
    return section_map, chapter_map


def link_for(ref: str, section_map, chapter_map) -> str | None:
    rel_from = lambda p: os.path.relpath(ROOT / p, start=INDEX_DIR)
    if re.fullmatch(r"\d+\.\d+", ref):
        if ref not in section_map:
            return None
        path, anchor = section_map[ref]
        return f"[§{ref}]({rel_from(path)}#{anchor})"
    # bare chapter number or appendix letter
    if ref not in chapter_map:
        return None
    label = f"Appendix {ref}" if ref.isalpha() else f"Chapter {ref}"
    return f"[{label}]({rel_from(chapter_map[ref])})"


HEADER = """\
# Index

[← Previous: Appendix F. 2026 Hardware Snapshot](appendix-f-hardware-snapshot-2026.md) · [Table of Contents](../../README.md)

> **Status:** prereviewed · **Phase:** 6 · **Sections drafted:** 1 / 1

Generated by `scripts/generate_index.py` (run `make index`) from a curated
term list resolved against the manuscript's section headings. Each entry
links to the section or chapter of *main development* (the most
thorough treatment), which is not always the first mention. To add a term,
edit `TERMS` in the generator and regenerate. The
[Glossary](appendix-e-glossary.md) remains the place for prose definitions.
"""

FOOTER = """\

---

[← Previous: Appendix F. 2026 Hardware Snapshot](appendix-f-hardware-snapshot-2026.md) · [Table of Contents](../../README.md)
"""


def sort_key(term: str) -> tuple[str, str]:
    # Sort by first alphabetic character, case-insensitively.
    cleaned = re.sub(r"[^A-Za-z]", "", term) or term
    return (cleaned[0].upper(), term.lower())


def main() -> None:
    section_map, chapter_map = scan()
    unresolved: list[str] = []

    grouped: dict[str, list[str]] = {}
    for term in sorted(TERMS, key=sort_key):
        links = []
        for ref in TERMS[term]:
            link = link_for(ref, section_map, chapter_map)
            if link is None:
                unresolved.append(f"{term} -> {ref}")
            else:
                links.append(link)
        if not links:
            continue
        letter = sort_key(term)[0]
        grouped.setdefault(letter, []).append(f"- **{term}** — {', '.join(links)}")

    # Validate BEFORE writing: an unresolved reference means a term would be
    # silently dropped, so refuse to write rather than overwrite the index
    # with a partial one (a failed run must not leave damaged output on disk).
    if unresolved:
        print(f"UNRESOLVED ({len(unresolved)}) — refusing to write a partial "
              f"index; {INDEX_PATH.relative_to(ROOT)} left unchanged:",
              file=sys.stderr)
        for u in unresolved:
            print(f"  {u}", file=sys.stderr)
        sys.exit(1)

    parts = [HEADER]
    for letter in sorted(grouped):
        parts.append(f"\n## {letter}\n")
        parts.append("\n".join(grouped[letter]))
    parts.append(FOOTER)
    INDEX_PATH.write_text("\n".join(parts) + "\n", encoding="utf-8")

    n_terms = sum(len(v) for v in grouped.values())
    print(f"wrote {INDEX_PATH.relative_to(ROOT)} ({n_terms} terms, {len(grouped)} groups)")


if __name__ == "__main__":
    main()
