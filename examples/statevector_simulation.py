#!/usr/bin/env python3
"""Exact statevector simulation of a small circuit (Chapter 24.3).

Run:  python examples/statevector_simulation.py
"""
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector


def main() -> None:
    qc = QuantumCircuit(3)
    qc.h(0)
    qc.cx(0, 1)
    qc.cx(1, 2)  # prepares the 3-qubit GHZ state

    sv = Statevector(qc)
    print("non-zero amplitudes:")
    for basis, amp in sorted(sv.to_dict().items()):
        print(f"  |{basis}>: {amp.real:+.3f}{amp.imag:+.3f}j")
    probs = {str(k): float(round(v, 3)) for k, v in sv.probabilities_dict().items()}
    print("probabilities:", probs)


if __name__ == "__main__":
    main()
