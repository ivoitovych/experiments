#!/usr/bin/env python3
"""Deutsch-Jozsa: decide constant vs. balanced in a single query (Chapter 14.2).

Run:  python examples/deutsch_jozsa.py
"""
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler


def dj_circuit(n: int, oracle) -> QuantumCircuit:
    qc = QuantumCircuit(n + 1, n)
    qc.x(n)
    qc.h(range(n + 1))
    oracle(qc, n)
    qc.h(range(n))
    qc.measure(range(n), range(n))
    return qc


def balanced_oracle(qc: QuantumCircuit, n: int) -> None:
    # f(x) = x_0 XOR x_1 XOR ... XOR x_{n-1}: CNOT each input into the ancilla.
    for q in range(n):
        qc.cx(q, n)


def main() -> None:
    n = 3
    qc = dj_circuit(n, balanced_oracle)
    counts = StatevectorSampler(seed=1234).run([qc], shots=1000).result()[0].data.c.get_counts()
    print("counts:", dict(sorted(counts.items())))
    verdict = "constant" if set(counts) == {"0" * n} else "balanced"
    print("verdict:", verdict)


if __name__ == "__main__":
    main()
