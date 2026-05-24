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

from math import pi

import matplotlib
matplotlib.use("Agg")
# Deterministic SVGs: fixed salt for element ids, and no embedded timestamp,
# so regenerating an unchanged figure produces a byte-identical file.
matplotlib.rcParams["svg.hashsalt"] = "qc-book"
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit
from qiskit.circuit import Gate, Parameter

ROOT = pathlib.Path(__file__).resolve().parent.parent
PREVIEW_DIR = ROOT / ".artifacts" / "figures"

# Chapters 8-10 all live in Part IV and share one figures directory.
GATES_DIR = "book/part-04-gates-and-circuits/figures"
# Chapters 13-16 live in Part VI.
ALGO_DIR = "book/part-06-algorithms/figures"


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


def interference() -> QuantumCircuit:
    # Single-qubit interferometer: the two H gates are the "beam splitters"
    # and the phase P(phi) sets the relative path length.
    phi = Parameter("ϕ")
    qc = QuantumCircuit(1, 1)
    qc.h(0)
    qc.p(phi, 0)
    qc.h(0)
    qc.measure(0, 0)
    return qc


def deutsch_jozsa(n: int = 3) -> QuantumCircuit:
    qc = QuantumCircuit(n + 1, n)
    qc.x(n)
    qc.h(range(n + 1))
    qc.barrier()
    qc.append(Gate("$U_f$", n + 1, []), range(n + 1))
    qc.barrier()
    qc.h(range(n))
    qc.measure(range(n), range(n))
    return qc


def bernstein_vazirani(n: int = 3) -> QuantumCircuit:
    qc = QuantumCircuit(n + 1, n)
    qc.x(n)
    qc.h(range(n + 1))
    qc.barrier()
    qc.append(Gate("$U_s$", n + 1, []), range(n + 1))
    qc.barrier()
    qc.h(range(n))
    qc.measure(range(n), range(n))
    return qc


def qft3() -> QuantumCircuit:
    qc = QuantumCircuit(3)
    qc.h(0)
    qc.cp(pi / 2, 1, 0)
    qc.cp(pi / 4, 2, 0)
    qc.h(1)
    qc.cp(pi / 2, 2, 1)
    qc.h(2)
    qc.swap(0, 2)
    return qc


def grover_iteration(n: int = 3) -> QuantumCircuit:
    # Uniform superposition, then one Grover iteration: an oracle that
    # phase-flips the marked basis state |11..1> (H-MCX-H on the last wire),
    # followed by the diffusion operator about the mean. The iteration is
    # repeated about (pi/4)*sqrt(2**n) times.
    controls = list(range(n - 1))
    qc = QuantumCircuit(n)
    qc.h(range(n))
    qc.barrier(label="oracle")
    qc.h(n - 1)
    qc.mcx(controls, n - 1)
    qc.h(n - 1)
    qc.barrier(label="diffuser")
    qc.h(range(n))
    qc.x(range(n))
    qc.h(n - 1)
    qc.mcx(controls, n - 1)
    qc.h(n - 1)
    qc.x(range(n))
    qc.h(range(n))
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
    {"name": "interference", "dir": GATES_DIR, "build": interference},
    {"name": "deutsch-jozsa", "dir": ALGO_DIR, "build": deutsch_jozsa},
    {"name": "bernstein-vazirani", "dir": ALGO_DIR, "build": bernstein_vazirani},
    {"name": "qft-3qubit", "dir": ALGO_DIR, "build": qft3},
    {"name": "grover-iteration", "dir": ALGO_DIR, "build": grover_iteration},
]


def render(qc: QuantumCircuit, svg_path: pathlib.Path, png_path: pathlib.Path) -> None:
    fig = qc.draw("mpl", fold=-1, idle_wires=True)
    svg_path.parent.mkdir(parents=True, exist_ok=True)
    png_path.parent.mkdir(parents=True, exist_ok=True)
    # White facecolor so black gate labels stay legible on GitHub dark mode.
    fig.savefig(svg_path, format="svg", bbox_inches="tight", facecolor="white",
                metadata={"Date": None})
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
