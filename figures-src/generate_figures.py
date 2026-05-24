#!/usr/bin/env python3
"""Generate quantum-circuit figures for the manuscript.

Each figure is built from a small Qiskit circuit and rendered with the
matplotlib drawer to two places:

  - an SVG committed next to the chapter that uses it, at
    ``book/<part>/figures/<name>.svg`` and embedded in the manuscript;
  - a PNG preview under ``.artifacts/figures/`` (gitignored) for visual QA.

The SVG is the manuscript asset (scalable, renders on GitHub and in
mdBook/Pandoc); the PNG exists only so the diagram can be eyeballed for
correctness and quality before the SVG is embedded.

Run:  make figures        (or: python figures-src/generate_figures.py)
"""
from __future__ import annotations

import pathlib

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit

ROOT = pathlib.Path(__file__).resolve().parent.parent
PREVIEW_DIR = ROOT / ".artifacts" / "figures"

# Chapters 8-10 all live in Part IV and share one figures directory.
GATES_DIR = "book/part-04-gates-and-circuits/figures"


def hadamard() -> QuantumCircuit:
    qc = QuantumCircuit(1)
    qc.h(0)
    return qc


def pauli_x() -> QuantumCircuit:
    qc = QuantumCircuit(1)
    qc.x(0)
    return qc


def cnot() -> QuantumCircuit:
    qc = QuantumCircuit(2)
    qc.cx(0, 1)
    return qc


def cz() -> QuantumCircuit:
    qc = QuantumCircuit(2)
    qc.cz(0, 1)
    return qc


def swap() -> QuantumCircuit:
    qc = QuantumCircuit(2)
    qc.swap(0, 1)
    return qc


def toffoli() -> QuantumCircuit:
    qc = QuantumCircuit(3)
    qc.ccx(0, 1, 2)
    return qc


def bell_state() -> QuantumCircuit:
    qc = QuantumCircuit(2, 2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure([0, 1], [0, 1])
    return qc


def ghz_state() -> QuantumCircuit:
    qc = QuantumCircuit(3)
    qc.h(0)
    qc.cx(0, 1)
    qc.cx(1, 2)
    return qc


# name -> (builder, target directory under repo root)
FIGURES: list[dict] = [
    {"name": "hadamard", "dir": GATES_DIR, "build": hadamard},
    {"name": "pauli-x", "dir": GATES_DIR, "build": pauli_x},
    {"name": "cnot", "dir": GATES_DIR, "build": cnot},
    {"name": "cz", "dir": GATES_DIR, "build": cz},
    {"name": "swap", "dir": GATES_DIR, "build": swap},
    {"name": "toffoli", "dir": GATES_DIR, "build": toffoli},
    {"name": "bell-state", "dir": GATES_DIR, "build": bell_state},
    {"name": "ghz-state", "dir": GATES_DIR, "build": ghz_state},
]


def render(qc: QuantumCircuit, svg_path: pathlib.Path, png_path: pathlib.Path) -> None:
    fig = qc.draw("mpl", fold=-1, idle_wires=True)
    svg_path.parent.mkdir(parents=True, exist_ok=True)
    png_path.parent.mkdir(parents=True, exist_ok=True)
    # White facecolor so black gate labels stay legible on GitHub dark mode.
    fig.savefig(svg_path, format="svg", bbox_inches="tight", facecolor="white")
    fig.savefig(png_path, format="png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def main() -> None:
    for spec in FIGURES:
        qc = spec["build"]()
        svg_path = ROOT / spec["dir"] / f"{spec['name']}.svg"
        png_path = PREVIEW_DIR / f"{spec['name']}.png"
        render(qc, svg_path, png_path)
        print(f"  {spec['name']:14} -> {svg_path.relative_to(ROOT)}  (preview: {png_path.relative_to(ROOT)})")
    print(f"Generated {len(FIGURES)} figures.")


if __name__ == "__main__":
    main()
