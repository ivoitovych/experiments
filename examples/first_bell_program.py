#!/usr/bin/env python3
"""A first Qiskit program: prepare and sample a Bell state (Chapter 26).

Run:  python examples/first_bell_program.py
(Install the toolchain first with `make figures-setup`.)
"""
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler
from qiskit.quantum_info import Statevector


def main() -> None:
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)

    # Exact statevector, with no sampling noise:
    print("statevector:", Statevector(qc).data.round(3))

    # Sample 1000 shots from the measured circuit:
    measured = qc.copy()
    measured.measure_all()
    result = StatevectorSampler(seed=1234).run([measured], shots=1000).result()
    counts = result[0].data.meas.get_counts()
    print("counts:", dict(sorted(counts.items())))


if __name__ == "__main__":
    main()
