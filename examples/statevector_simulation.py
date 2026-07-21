#!/usr/bin/env python3
"""Exact statevector simulation of a small circuit (Chapter 24.3).

Prepares the 3-qubit GHZ state (|000> + |111>)/sqrt(2) and prints its
nonzero amplitudes and outcome probabilities. Ideal, noiseless, exact —
this is direct linear algebra on the 2^n amplitude vector, which is why
the method dies exponentially: n=3 needs 8 amplitudes, n=30 needs ~16 GB,
and every added qubit doubles the memory (Chapter 24). Basis labels are
printed in Qiskit's little-endian order (qubit 0 rightmost); the GHZ
state is symmetric, so the book/Qiskit ordering difference (§4.8) does
not show here.

Run:  python examples/statevector_simulation.py    (from the repository root)
(Tested against the pinned environment, Qiskit 2.4.x.)
"""
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector


def main() -> None:
    qc = QuantumCircuit(3)
    qc.h(0)
    qc.cx(0, 1)
    qc.cx(1, 2)  # prepares the 3-qubit GHZ state

    sv = Statevector(qc)
    print("non-zero amplitudes (expect |000> and |111> at +0.707):")
    amps = dict(sorted(sv.to_dict().items()))
    for basis, amp in amps.items():
        print(f"  |{basis}>: {amp.real:+.3f}{amp.imag:+.3f}j")
    probs = {str(k): round(float(v), 3) for k, v in sorted(sv.probabilities_dict().items())}
    print("probabilities:", probs)

    assert set(amps) == {"000", "111"}, f"unexpected support: {sorted(amps)}"
    assert all(abs(a - 2 ** -0.5) < 1e-9 for a in amps.values()), amps
    print("assertions passed: GHZ amplitudes exact (ideal simulator)")


if __name__ == "__main__":
    main()
