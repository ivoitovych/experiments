#!/usr/bin/env python3
"""Grover search on 3 qubits, marking |111>, amplified over 2 iterations (Chapter 15.1).

Query-model accounting: each Grover iteration makes one oracle call, so
this circuit uses 2 oracle queries per execution — and every shot is a
fresh execution (1,000 shots = 1,000 runs of the 2-query circuit, used
to display the outcome distribution). For N = 2^3 = 8 with one marked
item, sin(theta) = 1/sqrt(8) and the success probability after k
iterations is sin^2((2k+1) theta): k = 2 gives exactly 121/128 ~ 94.5%,
the closest this discrete iteration count gets to 1 (k = floor(pi/4 *
sqrt(8)) = 2 is optimal; a third iteration would overshoot and *reduce*
the success probability). Ideal noiseless simulation.

Run:  python examples/grover.py    (from the repository root)
(Tested against the pinned environment, Qiskit 2.4.x.)
"""
from qiskit import ClassicalRegister, QuantumCircuit, QuantumRegister
from qiskit.primitives import StatevectorSampler

EXPECTED_SUCCESS = 121 / 128  # sin^2(5*theta), theta = asin(1/sqrt(8))


def grover_3q(iterations: int = 2) -> QuantumCircuit:
    if not isinstance(iterations, int) or iterations < 1:
        raise ValueError(f"iterations must be a positive integer, got {iterations!r}")
    n = 3
    qubits = QuantumRegister(n, "q")
    out = ClassicalRegister(n, "out")
    qc = QuantumCircuit(qubits, out)
    qc.h(range(n))
    for _ in range(iterations):
        # Oracle: phase-flip the marked state |111> (one oracle query).
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
    shots = 1000
    qc = grover_3q(iterations=2)
    counts = StatevectorSampler(seed=1234).run([qc], shots=shots).result()[0].data["out"].get_counts()
    ranked = dict(sorted(counts.items(), key=lambda kv: -kv[1]))
    print("counts (most frequent first):", ranked)
    top = next(iter(ranked))
    total = sum(ranked.values())
    frac = ranked[top] / total
    print(f"most frequent outcome: {top} ({100 * frac:.1f}% of {total} shots; "
          f"ideal success probability {EXPECTED_SUCCESS:.4f} = 121/128)")
    assert top == "111", f"expected marked state 111, got {top}"
    assert abs(frac - EXPECTED_SUCCESS) < 0.05, (
        f"success fraction {frac:.3f} far from ideal {EXPECTED_SUCCESS:.3f}"
    )
    print("assertions passed: marked state amplified as expected (ideal simulator)")


if __name__ == "__main__":
    main()
