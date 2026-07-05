#!/usr/bin/env python3
"""Generate the non-circuit diagrams (matplotlib only — no qiskit needed).

Companion to generate_figures.py (which draws quantum circuits with the
Qiskit drawer). This script draws the four conceptual diagrams added in
the 2026-07 figure pass:

  - filter-functions.svg      (§18.3)  dephasing filter functions
  - surface-code-lattice.svg  (§19.12) rotated d=3 surface code
  - lattice-surgery.svg       (§19.22) merge-and-split schematic
  - repeater-chain.svg        (§33.3)  entanglement-swapping chain

Each figure is written as SVG next to its chapter and as a PNG preview
under .artifacts/figures/ (gitignored), mirroring generate_figures.py.
Run via `make figures` or directly: python3 figures-src/generate_diagrams.py
"""

from __future__ import annotations
import pathlib

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Rectangle, Wedge

ROOT = pathlib.Path(__file__).resolve().parent.parent
PREVIEW = ROOT / ".artifacts" / "figures"

plt.rcParams["svg.fonttype"] = "none"
plt.rcParams["font.size"] = 11

X_COLOR = "#aecbfa"  # light blue  — X-type checks
Z_COLOR = "#fbc7a3"  # light orange — Z-type checks


def save(fig, rel_svg: str) -> None:
    svg = ROOT / rel_svg
    svg.parent.mkdir(parents=True, exist_ok=True)
    PREVIEW.mkdir(parents=True, exist_ok=True)
    fig.savefig(svg, format="svg", bbox_inches="tight")
    fig.savefig(PREVIEW / (svg.stem + ".png"), format="png", dpi=150,
                bbox_inches="tight")
    plt.close(fig)
    print(f"wrote {rel_svg}")


# ----------------------------------------------------------------- §18.3
def filter_functions() -> None:
    """|F(omega, t)|/t^2 for free evolution, Hahn echo, CPMG-4, computed
    exactly from the sign-switching function y(s) of each sequence:
    F(omega, t) = |integral_0^t y(s) e^{i omega s} ds|^2."""
    t = 1.0

    def F(pulse_times: list[float], omega: np.ndarray) -> np.ndarray:
        # y(s) flips sign at each pi-pulse time
        edges = [0.0, *pulse_times, t]
        out = np.zeros_like(omega, dtype=complex)
        sign = 1.0
        for a, b in zip(edges[:-1], edges[1:]):
            out += sign * (np.exp(1j * omega * b) - np.exp(1j * omega * a)) / (1j * omega)
            sign = -sign
        return np.abs(out) ** 2

    omega = 2 * np.pi * np.logspace(-1, 1.6, 800) / t
    seqs = [
        ("free evolution (Ramsey)", [], "#444444", "-"),
        ("Hahn echo", [t / 2], "#1a6faf", "--"),
        ("CPMG-4", [(2 * k + 1) * t / 8 for k in range(4)], "#c2571a", "-."),
    ]
    fig, ax = plt.subplots(figsize=(6.4, 4.0))
    for label, pulses, color, ls in seqs:
        ax.loglog(omega * t / (2 * np.pi), F(pulses, omega) / t**2,
                  ls, color=color, label=label, lw=1.8)
    ax.set_xlabel(r"noise frequency  $\omega t / 2\pi$")
    ax.set_ylabel(r"filter function  $F(\omega, t)\,/\,t^2$")
    ax.set_ylim(1e-6, 2)
    ax.legend(loc="lower left", frameon=False)
    ax.annotate("DC-dominated:\nfree evolution passes\nslow noise",
                xy=(0.13, 0.8), xycoords="data", fontsize=9, ha="left")
    ax.annotate("passband moves up in frequency\nwith more echo pulses",
                xy=(6, 0.25), xycoords="data", fontsize=9, ha="center")
    ax.grid(True, which="both", alpha=0.25)
    save(fig, "book/part-08-noise-and-qec/figures/filter-functions.svg")


# ---------------------------------------------------------------- §19.12
def surface_code_lattice() -> None:
    """Rotated distance-3 surface code: 9 data qubits, 4 X- and 4 Z-checks
    (4 bulk plaquettes + 4 boundary half-plaquettes), with the logical
    operators drawn as strings between like boundaries."""
    fig, ax = plt.subplots(figsize=(5.6, 5.6))

    def square(i, j, color):
        ax.add_patch(Rectangle((i, j), 1, 1, facecolor=color,
                               edgecolor="#666666", lw=1.0, zorder=1))

    def half(cx, cy, angle, color):
        ax.add_patch(Wedge((cx, cy), 0.5, angle, angle + 180,
                           facecolor=color, edgecolor="#666666", lw=1.0,
                           zorder=1))

    # bulk plaquettes (checkerboard): X at (0,0),(1,1); Z at (0,1),(1,0)
    square(0, 0, X_COLOR); square(1, 1, X_COLOR)
    square(0, 1, Z_COLOR); square(1, 0, Z_COLOR)
    # boundary half-plaquettes: X on top/bottom, Z on left/right
    half(0.5, 2, 0, X_COLOR)      # top,    over data (0,2)-(1,2)
    half(1.5, 0, 180, X_COLOR)    # bottom, under data (1,0)-(2,0)
    half(0, 0.5, 90, Z_COLOR)     # left,   beside data (0,0)-(0,1)
    half(2, 1.5, 270, Z_COLOR)    # right,  beside data (2,1)-(2,2)

    # logical strings: Z-bar along the bottom row, X-bar along the left column
    ax.plot([0, 2], [0, 0], color="#b02a2a", lw=3.5, zorder=2,
            solid_capstyle="round")
    ax.plot([0, 0], [0, 2], color="#1a6faf", lw=3.5, zorder=2,
            solid_capstyle="round")
    ax.text(1.0, -0.42, r"logical $\bar{Z}$ (string between the $Z$-free boundaries)",
            ha="center", fontsize=9, color="#b02a2a")
    ax.text(-0.42, 1.0, r"logical $\bar{X}$",
            ha="center", va="center", rotation=90, fontsize=9, color="#1a6faf")

    # data qubits on the vertices
    for i in range(3):
        for j in range(3):
            ax.plot(i, j, "o", ms=13, mfc="white", mec="black", mew=1.4,
                    zorder=3)

    # legend
    ax.add_patch(Rectangle((2.35, 1.9), 0.22, 0.22, facecolor=X_COLOR,
                           edgecolor="#666666"))
    ax.text(2.65, 2.0, "X-check", va="center", fontsize=9)
    ax.add_patch(Rectangle((2.35, 1.55), 0.22, 0.22, facecolor=Z_COLOR,
                           edgecolor="#666666"))
    ax.text(2.65, 1.65, "Z-check", va="center", fontsize=9)
    ax.plot(2.46, 1.32, "o", ms=10, mfc="white", mec="black", mew=1.2)
    ax.text(2.65, 1.31, "data qubit", va="center", fontsize=9)

    ax.set_xlim(-0.8, 3.4)
    ax.set_ylim(-0.8, 2.8)
    ax.set_aspect("equal")
    ax.axis("off")
    ax.set_title("Rotated distance-3 surface code (9 data qubits, 8 checks)",
                 fontsize=11)
    save(fig, "book/part-08-noise-and-qec/figures/surface-code-lattice.svg")


# ---------------------------------------------------------------- §19.22
def lattice_surgery() -> None:
    """Merge-and-split schematic: two patches, the seam measurement that
    implements the joint logical Pauli, and the split back."""
    fig, axes = plt.subplots(1, 3, figsize=(9.6, 3.4))
    titles = ["(a) two encoded patches",
              "(b) merge: measure seam\nstabilisers for $d$ rounds",
              "(c) split: seam released,\noutcome recorded"]

    def patch(ax, x, y, w, h, label, color="#e8eef7"):
        ax.add_patch(FancyBboxPatch((x, y), w, h,
                                    boxstyle="round,pad=0.02,rounding_size=0.06",
                                    facecolor=color, edgecolor="#333333",
                                    lw=1.3))
        if label:
            ax.text(x + w / 2, y + h / 2, label, ha="center", va="center",
                    fontsize=12)

    for ax, title in zip(axes, titles):
        ax.set_xlim(0, 3.2)
        ax.set_ylim(0, 2.2)
        ax.set_aspect("equal")
        ax.axis("off")
        ax.set_title(title, fontsize=10)

    # (a) separated patches
    patch(axes[0], 0.25, 0.6, 1.1, 1.1, r"$\bar{Q}_1$")
    patch(axes[0], 1.85, 0.6, 1.1, 1.1, r"$\bar{Q}_2$")

    # (b) merged: seam shaded
    patch(axes[1], 0.25, 0.6, 1.1, 1.1, r"$\bar{Q}_1$")
    patch(axes[1], 1.85, 0.6, 1.1, 1.1, r"$\bar{Q}_2$")
    axes[1].add_patch(Rectangle((1.35, 0.66), 0.5, 0.98,
                                facecolor="#f6d7d7", edgecolor="#b02a2a",
                                lw=1.3, hatch="///", zorder=0))
    axes[1].text(1.6, 0.32, r"joint outcome $=\bar{Z}_1\bar{Z}_2$",
                 ha="center", fontsize=9, color="#b02a2a")

    # (c) split again
    patch(axes[2], 0.25, 0.6, 1.1, 1.1, r"$\bar{Q}_1$")
    patch(axes[2], 1.85, 0.6, 1.1, 1.1, r"$\bar{Q}_2$")
    axes[2].text(1.6, 0.18, "Pauli correction conditioned on outcome",
                 ha="center", fontsize=8.5, color="#333333")

    save(fig, "book/part-08-noise-and-qec/figures/lattice-surgery.svg")


# ----------------------------------------------------------------- §33.3
def repeater_chain() -> None:
    """Entanglement-swapping repeater chain: elementary links, then the
    swapped end-to-end pair."""
    fig, axes = plt.subplots(2, 1, figsize=(8.0, 4.6))
    nodes = [("Alice", 0.5), ("repeater $R_1$", 3.0),
             ("repeater $R_2$", 5.5), ("Bob", 8.0)]

    def draw_nodes(ax):
        for label, x in nodes:
            ax.add_patch(FancyBboxPatch((x - 0.55, 0.35), 1.1, 0.6,
                                        boxstyle="round,pad=0.02,rounding_size=0.08",
                                        facecolor="#e8eef7",
                                        edgecolor="#333333", lw=1.2))
            ax.text(x, 0.65, label, ha="center", va="center", fontsize=9.5)
        for (_, xa), (_, xb) in zip(nodes[:-1], nodes[1:]):
            ax.plot([xa + 0.55, xb - 0.55], [0.65, 0.65], color="#999999",
                    lw=1.0, ls=":")
        ax.set_xlim(-0.4, 8.9)
        ax.set_ylim(0, 2.1)
        ax.axis("off")

    # (a) elementary links
    ax = axes[0]
    draw_nodes(ax)
    for (_, xa), (_, xb) in zip(nodes[:-1], nodes[1:]):
        ax.add_patch(FancyArrowPatch((xa, 0.95), (xb, 0.95),
                                     connectionstyle="arc3,rad=-0.35",
                                     arrowstyle="-", color="#1a6faf", lw=2.0))
        ax.text((xa + xb) / 2, 1.45, "Bell pair", ha="center", fontsize=8.5,
                color="#1a6faf")
    ax.text(-0.3, 1.9, "(a) heralded elementary links, stored in memories",
            fontsize=10, ha="left")

    # (b) after swapping
    ax = axes[1]
    draw_nodes(ax)
    ax.add_patch(FancyArrowPatch((0.5, 0.95), (8.0, 0.95),
                                 connectionstyle="arc3,rad=-0.22",
                                 arrowstyle="-", color="#b02a2a", lw=2.4))
    ax.text(4.25, 1.68, "end-to-end Bell pair", ha="center", fontsize=9,
            color="#b02a2a")
    for label, x in nodes[1:-1]:
        ax.annotate("Bell-basis\nmeasurement", xy=(x, 0.35),
                    xytext=(x, -0.05), ha="center", va="top", fontsize=8,
                    arrowprops=dict(arrowstyle="->", color="#555555", lw=0.9))
    ax.set_ylim(-0.55, 2.1)
    ax.text(-0.3, 1.9, "(b) swaps at each repeater leave Alice and Bob entangled",
            fontsize=10, ha="left")

    save(fig, "book/part-12-adjacent-models/figures/repeater-chain.svg")


def main() -> None:
    filter_functions()
    surface_code_lattice()
    lattice_surgery()
    repeater_chain()
    print("Generated 4 diagrams.")


if __name__ == "__main__":
    main()
