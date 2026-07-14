# Factcheck — Appendix B: Common Gates

Mirrors `book/99-back-matter/appendix-b-common-gates.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## B.1 — Pauli identity: Y combines bit flip and phase flip

- **Claim** (anchor): "Y = iXZ combines both with a global i"
- **Method**: derivation
- **Source**: → direct matrix multiplication of the stated X and Z matrices; verifiable by computation
- **Verified**: — · **Verdict**: open
- **Comment**: The source characterises Y as iXZ. Squaring out the product of the stated matrices should yield the stated Y matrix.

---

## B.1 — Pauli gates are involutory

- **Claim** (anchor): "I, X, Y, Z are each their own inverse"
- **Method**: derivation
- **Source**: → squaring each stated Pauli matrix confirms the involutory property
- **Verified**: — · **Verdict**: open

---

## B.1 — Pauli algebra: cyclic products

- **Claim** (anchor): "Algebra: XY = iZ, YZ = iX, ZX = iY (and the cyclic conjugates)"
- **Method**: derivation
- **Source**: → direct matrix multiplication from the stated Pauli matrices
- **Verified**: — · **Verdict**: open
- **Comment**: Commutator and anticommutator claims stated in the same bullet follow directly.

---

## B.2 — Hadamard eigenvectors (non-standard form)

- **Claim** (anchor): "Eigenvalues $\\pm 1$ with eigenvectors"
- **Method**: derivation
- **Source**: → solving Hv = ±v for the stated H matrix; the cos/sin(π/8) form is less standard than |±⟩ and worth verifying
- **Verified**: — · **Verdict**: open
- **Comment**: Introductory texts often cite |±⟩ as eigenvectors of X, not of H. The stated cos(π/8)/sin(π/8) eigenvectors are the correct diagonalizing vectors of H and should be confirmed by computation.

---

## B.2 — Hadamard conjugates Paulis

- **Claim** (anchor): "Pauli-basis relations: $H X H = Z$, $H Z H = X$, $H Y H = -Y$. So $H$ exchanges $X$ and $Z$ in the Heisenberg picture (tracking how the gate transforms *operators* by conjugation, $P \mapsto G P G^\dagger$, rather than how it moves states)."
- **Method**: derivation
- **Source**: → triple matrix product using the stated H and Pauli matrices
- **Verified**: — · **Verdict**: open

---

## B.2 — Hadamard as linear combination of Paulis

- **Claim** (anchor): "as a real linear combination of Paulis"
- **Method**: derivation
- **Source**: → direct substitution of the stated X and Z matrices confirms H = (X+Z)/sqrt(2)
- **Verified**: — · **Verdict**: open

---

## B.3 — Phase gate family angle assignments

- **Claim** (anchor): "fixed-angle members of the one-parameter family $P(\\varphi)$: $S = P(\\pi/2)$, $T = P(\\pi/4)$, and $Z = P(\\pi)$."
- **Method**: derivation
- **Source**: → substituting angles into the stated P(φ) matrix and comparing with S, T, Z matrices
- **Verified**: — · **Verdict**: open

---

## B.3 — Phase gate composition law and powers

- **Claim** (anchor): "In particular $S^2 = Z$, $T^2 = S$, $T^4 = Z$, $T^8 = I$."
- **Method**: derivation
- **Source**: → follows from composition law P(φ₁)P(φ₂) = P(φ₁+φ₂) and the angle assignments for S and T
- **Verified**: — · **Verdict**: open

---

## B.3 — P(φ) vs Rz(φ) differ only by global phase (sign convention)

- **Claim** (anchor): "$P(\\varphi)$ differs from $R_z(\\varphi)$ (§B.4) only by a global phase $e^{-i\\varphi/2}$"
- **Method**: derivation
- **Source**: → comparing the stated Rz(φ) and P(φ) matrices entry-by-entry
- **Verified**: — · **Verdict**: open
- **Comment**: Consequential sign-convention claim: the global phase becomes a relative phase when the gate is controlled (same sentence). Downstream entries in §B.9 depend on this.

---

## B.4 — Rotation gate conventions attributed to Qiskit 2.x

- **Claim** (anchor): "The conventions match the current Qiskit / IBM Quantum docs (verified against Qiskit 2.x)"
- **Method**: external
- **Source**: TBD — needs verification against Qiskit 2.x documentation
- **Verified**: — · **Verdict**: open
- **Comment**: The text explicitly attributes the Rx/Ry/Rz and U3 matrices to Qiskit/IBM Quantum docs. The Rz diagonal convention and U3 parametrisation should be cross-checked against the current Qiskit release.

---

## B.4 — Rotation gates are 4π-periodic, not 2π-periodic

- **Claim** (anchor): "a signature of spin-$1/2$"
- **Method**: derivation
- **Source**: → substituting θ = 0 and θ = 2π into the stated matrix exponential form e^{-iθA/2} confirms Ra(2π) = −I
- **Verified**: — · **Verdict**: open

---

## B.4 — Relation between rotation gates and Pauli gates

- **Claim** (anchor): "Relation to Pauli gates: $X = i R_x(\\pi)$, $Y = i R_y(\\pi)$, $Z = i R_z(\\pi)$. The factor of $i$ is a global phase and is harmless on uncontrolled single-qubit gates, but matters once the gate is controlled"
- **Method**: derivation
- **Source**: → substituting θ = π into each stated rotation matrix
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-references §B.9; consistent with the P vs Rz note in §B.3.

---

## B.5 — CNOT basis-conjugation identity swaps control/target

- **Claim** (anchor): "Hadamarding both qubits swaps the control/target roles"
- **Method**: derivation
- **Source**: → matrix product (H⊗H) CNOT_{1→2} (H⊗H) compared to stated CNOT_{2→1}
- **Verified**: — · **Verdict**: open

---

## B.5 — Qiskit endian mapping for CNOT

- **Claim** (anchor): "qubit labelled `q_0` in Qiskit corresponds to the *rightmost* tensor factor"
- **Method**: convention
- **Source**: → §4.8 (book's endian reconciliation); Qiskit 2.x LSB-first convention
- **Verified**: — · **Verdict**: open
- **Comment**: Consequential for any reader translating circuits between book notation and Qiskit.

---

## B.6 — CZ to CNOT conversion by Hadamard conjugation

- **Claim** (anchor): "Conjugation by Hadamard on the target converts CZ to CNOT"
- **Method**: derivation
- **Source**: → matrix product of the stated CZ and H matrices verifies the identity
- **Verified**: — · **Verdict**: open

---

## B.7 — SWAP decomposes into three CNOTs

- **Claim** (anchor): "it can be decomposed into three CNOTs"
- **Method**: derivation
- **Source**: → matrix product of three stated CNOT matrices verifies the SWAP decomposition
- **Verified**: — · **Verdict**: open

---

## B.8 — Toffoli not in the Clifford group; universality

- **Claim** (anchor): "The Toffoli is **not** a member of the Clifford group (the group generated by $H$, $S$, and CNOT — §8.10); together with any Clifford generating set it provides universal quantum computation."
- **Method**: external
- **Source**: TBD — needs verification; standard result in quantum computing theory
- **Verified**: — · **Verdict**: open
- **Comment**: Well-known result but an external/attributed fact rather than a direct matrix computation.

---

## B.8 — Toffoli standard decomposition gate count

- **Claim** (anchor): "A standard decomposition uses six CNOTs and a handful of $T$ and $H$ gates."
- **Method**: external
- **Source**: TBD — needs verification; classic decomposition (Barenco et al. 1995 or equivalent) should be cited
- **Verified**: — · **Verdict**: open
- **Comment**: The specific count "six CNOTs" is a checkable claim. Different decompositions exist; the canonical CNOT count for Toffoli should be confirmed.

---

## B.9 — Global phase becomes relative phase under control

- **Claim** (anchor): "Global phase becomes relative phase"
- **Method**: derivation
- **Source**: → expanding the controlled-U block matrix with a scalar factor e^{iα} on U confirms the identity
- **Verified**: — · **Verdict**: open
- **Comment**: This identity is the key reason C(Rz(θ)) ≠ CP(θ), as stated in the same bullet. Verifiable directly from the block matrix form of C(U).
