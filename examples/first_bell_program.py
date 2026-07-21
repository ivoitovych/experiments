#!/usr/bin/env python3
"""A first Qiskit program: prepare and sample a Bell state (Chapter 26).

Ideal noiseless simulation. Expected: statevector (|00> + |11>)/sqrt(2)
(amplitudes ~0.707 at basis indices 0 and 3), and counts split between
"00" and "11" only. Count keys are printed in Qiskit's little-endian
bit order (qubit 0 rightmost) — for this symmetric state the book/Qiskit
ordering difference (§4.8) is invisible. Note: perfectly correlated
Z-basis outcomes alone do NOT certify entanglement — a classical coin
shared between two envelopes gives the same "00"/"11" statistics; the
entanglement shows up only in additional measurement bases (§7.8-§7.9).

Run:  python examples/first_bell_program.py    (from the repository root)
(Install the toolchain first with `make figures-setup`; tested against
the pinned environment, Qiskit 2.4.x.)
"""
from qiskit import ClassicalRegister, QuantumCircuit
from qiskit.primitives import StatevectorSampler
from qiskit.quantum_info import Statevector


def main() -> None:
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)

    # Exact statevector, with no sampling noise:
    sv = Statevector(qc)
    print("statevector:", sv.data.round(3))
    expected = [2 ** -0.5, 0.0, 0.0, 2 ** -0.5]
    assert all(abs(a - e) < 1e-9 for a, e in zip(sv.data, expected)), sv.data

    # Sample 1000 shots from the measured circuit (a named register, so
    # the result access does not depend on measure_all's auto-naming):
    measured = qc.copy()
    creg = ClassicalRegister(2, "out")
    measured.add_register(creg)
    measured.measure([0, 1], creg)
    result = StatevectorSampler(seed=1234).run([measured], shots=1000).result()
    counts = result[0].data["out"].get_counts()
    print("counts:", dict(sorted(counts.items())))
    assert set(counts) == {"00", "11"}, f"unexpected outcomes: {sorted(counts)}"
    print("assertions passed: Bell statistics as expected (ideal simulator)")


if __name__ == "__main__":
    main()
