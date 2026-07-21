"""Executable check of the book's qubit-ordering conventions against Qiskit.

The book (§4.8, §4.16, §9.1) fixes leftmost-as-most-significant tensor
order: the basis ket |x1 x2 ... xn> sits at zero-based statevector index
sum_i x_i * 2^(n-i), and the book's *first* (leftmost) tensor factor maps
to Qiskit's *highest-numbered* qubit label. This script asserts both
facts on live Qiskit objects, so a Qiskit convention change (or a book
convention drift) breaks the example suite.

Scope: this verifies *statevector indexing* and *operator matrix*
conventions only. Circuit drawing order, count-string display, and
classical-register bit order are separate conventions (§4.8) not
exercised here.

Run:  .venv/bin/python examples/qiskit_ordering_check.py
"""

import numpy as np
from qiskit import QuantumCircuit
from qiskit.quantum_info import Operator, Statevector


def book_index(bits: str) -> int:
    """Zero-based statevector index of the book ket |bits> (leftmost MSB)."""
    if not bits or set(bits) - {"0", "1"}:
        raise ValueError(f"bits must be a nonempty 0/1 string, got {bits!r}")
    n = len(bits)
    return sum(int(b) * 2 ** (n - 1 - i) for i, b in enumerate(bits))


def check(condition: bool, message: str) -> None:
    # Not `assert`: still fails under `python -O`.
    if not condition:
        raise AssertionError(message)


def main() -> None:
    import qiskit
    print("qiskit", qiskit.__version__)
    n = 2

    # Book state |10>: first (leftmost) factor is 1. Book factor 1 maps to
    # Qiskit's highest-numbered qubit, q1 for n = 2.
    qc = QuantumCircuit(n)
    qc.x(1)  # flip Qiskit q1  ==  book factor 1
    amps = Statevector(qc).data
    idx = book_index("10")
    expected_vec = np.zeros(2 ** n, dtype=complex)
    expected_vec[idx] = 1.0
    check(np.allclose(amps, expected_vec), (
        f"|10> should be the full basis vector at index {idx}, got {amps}"
    ))
    print(f"|10>  -> statevector index {idx}  (X on Qiskit q1) ... ok")

    # Book CNOT with control on the *first* qubit has the block form
    # diag(I, X) in the book's basis order |00>,|01>,|10>,|11>.
    # In Qiskit labels that is cx(control=1, target=0).
    qc2 = QuantumCircuit(n)
    qc2.cx(1, 0)
    # Operator(...).data is the matrix with row = output index, column =
    # input index, both in Qiskit's little-endian statevector indexing.
    u = Operator(qc2).data
    expected = np.zeros((4, 4))
    expected[book_index("00"), book_index("00")] = 1
    expected[book_index("01"), book_index("01")] = 1
    expected[book_index("10"), book_index("11")] = 1
    expected[book_index("11"), book_index("10")] = 1
    check(np.allclose(u, expected), (
        "cx(1, 0) should be diag(I, X) in the book's basis order"
    ))
    print("CNOT(control=first)  ->  diag(I, X) in book order ... ok")

    print("statevector/operator ordering conventions verified against Qiskit")


if __name__ == "__main__":
    main()
