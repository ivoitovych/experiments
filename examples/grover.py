#!/usr/bin/env python3
"""Grover search on 3 qubits, marking |111>, amplified over 2 iterations (Chapter 15.1).

Run:  python examples/grover.py
"""
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler


def grover_3q(iterations: int = 2) -> QuantumCircuit:
    n = 3
    qc = QuantumCircuit(n, n)
    qc.h(range(n))
    for _ in range(iterations):
        # Oracle: phase-flip the marked state |111>.
        qc.h(n - 1)
        qc.mcx([0, 1], n - 1)
        qc.h(n - 1)
        # Diffusion operator (reflection about the mean).
        qc.h(range(n))
        qc.x(range(n))
        qc.h(n - 1)
        qc.mcx([0, 1], n - 1)
        qc.h(n - 1)
        qc.x(range(n))
        qc.h(range(n))
    qc.measure(range(n), range(n))
    return qc


def main() -> None:
    # For N = 8 with one marked item, the optimal count is
    # floor(pi/4 * sqrt(8)) = 2 iterations.
    qc = grover_3q(iterations=2)
    counts = StatevectorSampler(seed=1234).run([qc], shots=1000).result()[0].data.c.get_counts()
    ranked = dict(sorted(counts.items(), key=lambda kv: -kv[1]))
    print("counts (most frequent first):", ranked)
    top = next(iter(ranked))
    print(f"most frequent outcome: {top} ({100 * ranked[top] / 1000:.1f}% of shots)")


if __name__ == "__main__":
    main()
