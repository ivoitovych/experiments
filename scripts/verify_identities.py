#!/usr/bin/env python3
"""Executable verification of the book's elementary math identities.

Each named check numerically verifies one identity claimed in the
manuscript (mostly Appendices B and C). Fact-check cards cite a check
as `scripts/verify_identities.py::<name>`; `scripts/check_card_citations.py`
runs this suite and fails if any cited check is missing or failing, so
a card can never claim a green check that no longer passes.

Run:  .venv/bin/python scripts/verify_identities.py            (report)
      .venv/bin/python scripts/verify_identities.py --manifest (PASS/FAIL lines)
"""
from __future__ import annotations

import sys

import numpy as np

I2 = np.eye(2, dtype=complex)
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.array([[1, 0], [0, -1]], dtype=complex)
H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)
PAULIS = {1: X, 2: Y, 3: Z}


def P(phi: float) -> np.ndarray:
    return np.diag([1, np.exp(1j * phi)]).astype(complex)


def R(axis: np.ndarray, theta: float) -> np.ndarray:
    return np.cos(theta / 2) * I2 - 1j * np.sin(theta / 2) * axis


def kron(*ops: np.ndarray) -> np.ndarray:
    out = ops[0]
    for op in ops[1:]:
        out = np.kron(out, op)
    return out


# Basis order |00>,|01>,|10>,|11>, leftmost factor most significant
# (the book's convention). Control on the FIRST factor.
CNOT_1to2 = np.array(
    [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]], dtype=complex)
CNOT_2to1 = np.array(
    [[1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0]], dtype=complex)
CZ = np.diag([1, 1, 1, -1]).astype(complex)
SWAP = np.array(
    [[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 0, 0, 1]], dtype=complex)

RNG = np.random.default_rng(20260721)


def rand_c(n: int) -> np.ndarray:
    return RNG.normal(size=(n, n)) + 1j * RNG.normal(size=(n, n))


def eq(a, b, tol=1e-12) -> bool:
    # rtol=0: a strict absolute-tolerance check. np.allclose's default
    # rtol=1e-5 would let O(1) entries drift by ~1e-5 and mask a real
    # mismatch — these are exact identities, so hold them to atol alone.
    return bool(np.allclose(a, b, rtol=0.0, atol=tol))


# ---------------------------------------------------------------- checks

def y_equals_i_xz():
    return eq(Y, 1j * X @ Z)


def paulis_self_inverse():
    return all(eq(M @ M, I2) for M in (I2, X, Y, Z))


def pauli_products_cyclic():
    return eq(X @ Y, 1j * Z) and eq(Y @ Z, 1j * X) and eq(Z @ X, 1j * Y)


def pauli_eigensystem():
    ok = True
    for M in (X, Y, Z):
        vals = np.sort_complex(np.linalg.eigvals(M))
        ok = ok and eq(vals, np.array([-1, 1], dtype=complex), tol=1e-9)
    return ok


def h_eigenvectors():
    c, s = np.cos(np.pi / 8), np.sin(np.pi / 8)
    vp = np.array([c, s], dtype=complex)      # eigenvalue +1
    vm = np.array([-s, c], dtype=complex)     # eigenvalue -1
    return eq(H @ vp, vp, tol=1e-12) and eq(H @ vm, -vm, tol=1e-12)


def hadamard_conjugation():
    return eq(H @ X @ H, Z) and eq(H @ Z @ H, X) and eq(H @ Y @ H, -Y)


def h_equals_x_plus_z():
    return eq(H, (X + Z) / np.sqrt(2))


def phase_family():
    return (eq(P(np.pi / 2), np.diag([1, 1j]))
            and eq(P(np.pi / 4), np.diag([1, np.exp(1j * np.pi / 4)]))
            and eq(P(np.pi), Z))


def phase_powers():
    S, T = P(np.pi / 2), P(np.pi / 4)
    return (eq(S @ S, Z) and eq(T @ T, S)
            and eq(np.linalg.matrix_power(T, 4), Z)
            and eq(np.linalg.matrix_power(T, 8), I2))


def p_vs_rz_phase():
    phi = 0.7346
    return eq(P(phi), np.exp(1j * phi / 2) * R(Z, phi))


def rotation_pauli_relation():
    return (eq(X, 1j * R(X, np.pi)) and eq(Y, 1j * R(Y, np.pi))
            and eq(Z, 1j * R(Z, np.pi)))


def su2_double_cover():
    return eq(R(Z, 2 * np.pi), -I2) and eq(R(Z, 4 * np.pi), I2)


def hh_swaps_cnot():
    HH = kron(H, H)
    return eq(HH @ CNOT_1to2 @ HH, CNOT_2to1)


def cz_h_cnot():
    IH = kron(I2, H)
    return eq(IH @ CZ @ IH, CNOT_1to2)


def swap_three_cnots():
    return eq(SWAP, CNOT_1to2 @ CNOT_2to1 @ CNOT_1to2)


def cnot_spectrum():
    vals = np.sort(np.linalg.eigvals(CNOT_1to2).real)
    return eq(vals, np.array([-1, 1, 1, 1]), tol=1e-9)


def swap_spectrum():
    vals = np.sort(np.linalg.eigvals(SWAP).real)
    return eq(vals, np.array([-1, 1, 1, 1]), tol=1e-9)


def cz_symmetric():
    return eq(SWAP @ CZ @ SWAP, CZ)


def controlled_global_phase():
    alpha = 1.234
    U = R(X, 0.9) @ P(0.4)
    CU = np.block([[I2, np.zeros((2, 2))], [np.zeros((2, 2)), U]])
    CUp = np.block([[I2, np.zeros((2, 2))],
                    [np.zeros((2, 2)), np.exp(1j * alpha) * U]])
    return eq(CUp, kron(P(alpha), I2) @ CU)


def levi_civita():
    eps = np.zeros((4, 4, 4))
    for j, k, l, s in ((1, 2, 3, 1), (2, 3, 1, 1), (3, 1, 2, 1),
                       (3, 2, 1, -1), (1, 3, 2, -1), (2, 1, 3, -1)):
        eps[j, k, l] = s
    for j in (1, 2, 3):
        for k in (1, 2, 3):
            rhs = (1 if j == k else 0) * I2 + 1j * sum(
                eps[j, k, l] * PAULIS[l] for l in (1, 2, 3))
            if not eq(PAULIS[j] @ PAULIS[k], rhs):
                return False
    return True


def euler_h():
    return eq(H, np.exp(1j * np.pi / 2) * R(Y, np.pi / 2) @ R(Z, np.pi))


def euler_x():
    return eq(X, np.exp(1j * np.pi / 2) * R(X, np.pi))


def tensor_mixed_product():
    A, B, C, D = (rand_c(2) for _ in range(4))
    return eq(kron(A, B) @ kron(C, D), kron(A @ C, B @ D), tol=1e-9)


def partial_trace_product():
    A, B = rand_c(2), rand_c(2)
    M = kron(A, B).reshape(2, 2, 2, 2)
    tr2 = np.einsum("ikjk->ij", M)   # trace out the second factor
    return eq(tr2, A * np.trace(B), tol=1e-9)


def bell_marginals():
    bell = np.array([1, 0, 0, 1], dtype=complex) / np.sqrt(2)
    rho = np.outer(bell, bell.conj()).reshape(2, 2, 2, 2)
    rho_a = np.einsum("ikjk->ij", rho)
    rho_b = np.einsum("kikj->ij", rho)
    return eq(rho_a, I2 / 2) and eq(rho_b, I2 / 2)


CHECKS = {
    "y_equals_i_xz": y_equals_i_xz,
    "paulis_self_inverse": paulis_self_inverse,
    "pauli_products_cyclic": pauli_products_cyclic,
    "pauli_eigensystem": pauli_eigensystem,
    "h_eigenvectors": h_eigenvectors,
    "hadamard_conjugation": hadamard_conjugation,
    "h_equals_x_plus_z": h_equals_x_plus_z,
    "phase_family": phase_family,
    "phase_powers": phase_powers,
    "p_vs_rz_phase": p_vs_rz_phase,
    "rotation_pauli_relation": rotation_pauli_relation,
    "su2_double_cover": su2_double_cover,
    "hh_swaps_cnot": hh_swaps_cnot,
    "cz_h_cnot": cz_h_cnot,
    "swap_three_cnots": swap_three_cnots,
    "cnot_spectrum": cnot_spectrum,
    "swap_spectrum": swap_spectrum,
    "cz_symmetric": cz_symmetric,
    "controlled_global_phase": controlled_global_phase,
    "levi_civita": levi_civita,
    "euler_h": euler_h,
    "euler_x": euler_x,
    "tensor_mixed_product": tensor_mixed_product,
    "partial_trace_product": partial_trace_product,
    "bell_marginals": bell_marginals,
}


def main() -> int:
    manifest = "--manifest" in sys.argv
    failed = 0
    for name, fn in CHECKS.items():
        try:
            ok = bool(fn())
        except Exception as exc:  # a crashed check is a failed check
            ok = False
            if not manifest:
                print(f"ERROR {name}: {exc}")
        print(f"{'PASS' if ok else 'FAIL'} {name}")
        failed += 0 if ok else 1
    if not manifest:
        print(f"{len(CHECKS) - failed}/{len(CHECKS)} identity checks passed")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
