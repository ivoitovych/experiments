#!/usr/bin/env python3
"""Deutsch-Jozsa: decide constant vs. balanced with one oracle call (Chapter 14.2).

"One query" means one call to the supplied bit oracle in the query
model; the oracle's *implementation* may decompose into many physical
gates (the balanced parity oracle below uses n CNOTs), and each shot
executes a fresh circuit instance — 1,000 shots are 1,000 executions,
used here only to display the (ideally deterministic) outcome as
counts. Everything runs on an ideal noiseless statevector sampler:
the all-or-nothing classifier below is exact only in that setting;
on noisy hardware a single flipped bit would need a threshold rule
instead. Expected output: the balanced parity oracle yields only
"1"*n; the constant oracles yield only "0"*n.

Run:  python examples/deutsch_jozsa.py    (from the repository root)
"""
from typing import Callable

from qiskit import ClassicalRegister, QuantumCircuit, QuantumRegister
from qiskit.primitives import StatevectorSampler

# Oracle contract: a callable f(qc, n) that mutates qc by applying a
# reversible bit oracle |x>|y> -> |x>|y XOR f(x)> on Qiskit qubits
# 0..n-1 (inputs) and n (ancilla). It must touch nothing else; an
# arbitrary callback outside this contract silently invalidates the
# constant/balanced verdict, which relies on the promise.
Oracle = Callable[[QuantumCircuit, int], None]


def dj_circuit(n: int, oracle: Oracle) -> QuantumCircuit:
    if not isinstance(n, int) or n < 1:
        raise ValueError(f"n must be a positive integer, got {n!r}")
    qubits = QuantumRegister(n + 1, "q")
    output = ClassicalRegister(n, "out")  # named: no reliance on the auto register
    qc = QuantumCircuit(qubits, output)
    qc.x(n)                # ancilla to |1>
    qc.h(range(n + 1))     # Hadamard everything
    oracle(qc, n)          # the single oracle call of the query model
    qc.h(range(n))         # interfere the inputs
    qc.measure(range(n), range(n))
    return qc


def balanced_oracle(qc: QuantumCircuit, n: int) -> None:
    # f(x) = parity of the n input bits (Qiskit qubit indices 0..n-1):
    # CNOT each input into the ancilla. One abstract query, n physical CNOTs.
    for q in range(n):
        qc.cx(q, n)


def constant_zero_oracle(qc: QuantumCircuit, n: int) -> None:
    # f(x) = 0 for all x: the oracle does nothing.
    pass


def constant_one_oracle(qc: QuantumCircuit, n: int) -> None:
    # f(x) = 1 for all x: flip the ancilla unconditionally.
    qc.x(n)


def classify(counts: dict) -> str:
    # Ideal-only classifier: exact under the promise on a noiseless
    # simulator, where the outcome is deterministic. Not a hardware rule.
    n = len(next(iter(counts)))
    return "constant" if set(counts) == {"0" * n} else "balanced"


def main() -> None:
    n = 3
    sampler = StatevectorSampler(seed=1234)
    cases = [
        ("balanced parity", balanced_oracle, "1" * n),
        ("constant zero", constant_zero_oracle, "0" * n),
        ("constant one", constant_one_oracle, "0" * n),
    ]
    for name, oracle, expected in cases:
        qc = dj_circuit(n, oracle)
        result = sampler.run([qc], shots=1000).result()[0]
        counts = result.data["out"].get_counts()
        verdict = classify(counts)
        print(f"{name}: counts {dict(sorted(counts.items()))} -> {verdict}")
        assert set(counts) == {expected}, (
            f"{name}: expected only {expected!r}, got {sorted(counts)}"
        )
    print("all assertions passed (ideal simulator; deterministic under the promise)")


if __name__ == "__main__":
    main()
