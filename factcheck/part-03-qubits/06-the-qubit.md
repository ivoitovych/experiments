# Factcheck — §6 The Qubit

Mirrors `book/part-03-qubits/06-the-qubit.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §6.1 — Computational basis fixed by hardware convention

- **Claim** (anchor): "fixed by hardware-and-encoding convention: the two states the readout chain is calibrated to distinguish"
- **Method**: convention
- **Source**: → §6.1; cross-reference §6.4 for platform specifics
- **Verified**: — · **Verdict**: open

## §6.2 — Pure-state physical parameter count yields two real parameters

- **Claim** (anchor): "The two complex amplitudes account for four real degrees of freedom; the normalization constraint removes one; global phase removes another; the physical state space has two real parameters left"
- **Method**: derivation
- **Source**: → §6.2
- **Verified**: — · **Verdict**: open

## §6.2 — Half-angle parametrization covers the sphere exactly once

- **Claim** (anchor): "it is what makes the Bloch parametrization cover the sphere exactly once — up to the usual spherical-coordinate degeneracy at the poles"
- **Method**: derivation
- **Source**: → §6.2; unpacked in §6.8
- **Verified**: — · **Verdict**: open

## §6.2 — Mixed states live inside the Bloch sphere

- **Claim** (anchor): "live inside the Bloch sphere rather than on its surface; we develop that picture in §6.8"
- **Method**: derivation
- **Source**: → §6.8 (density-matrix form and purity conditions)
- **Verified**: — · **Verdict**: open

## §6.3 — Hadamard gate distinguishes |+⟩ and |−⟩ deterministically

- **Claim** (anchor): "a Hadamard gate followed by a computational-basis measurement distinguishes them deterministically"
- **Method**: derivation
- **Source**: → §6.3; §6.5
- **Verified**: — · **Verdict**: open

## §6.4 — Physical realizations of computational basis per platform

- **Claim** (anchor): "On superconducting qubits, for example, the two basis states are two energy levels of the qubit's Hamiltonian; on ion traps they are typically two hyperfine sublevels; on photonic qubits they are often two polarization states; on neutral atoms they are two long-lived atomic states"
- **Method**: external
- **Source**: TBD — needs verification (platform-physics survey)
- **Verified**: — · **Verdict**: open

## §6.5 — Hadamard basis is eigenbasis of Pauli X

- **Claim** (anchor): "the eigenbasis of the Pauli X operator"
- **Method**: derivation
- **Source**: → §6.5
- **Verified**: — · **Verdict**: open

## §6.5 — H is its own inverse (H† = H = H⁻¹)

- **Claim** (anchor): "Hadamard is its own inverse"
- **Method**: derivation
- **Source**: → §6.5; matrix form confirms $H H = I$
- **Verified**: — · **Verdict**: open

## §6.5 — Computational-basis measurement in Hadamard basis is 50/50

- **Claim** (anchor): "a Hadamard-basis measurement of $|0\rangle$ or $|1\rangle$ is unbiased — $50/50$ between $|+\rangle$ and $|-\rangle$"
- **Method**: derivation
- **Source**: → §6.5
- **Verified**: — · **Verdict**: open

## §6.6 — Three standard bases are pairwise mutually unbiased

- **Claim** (anchor): "pairwise mutually unbiased: for any state in one basis, measurement in either of the other two bases is 50/50"
- **Method**: derivation
- **Source**: → §6.6; follows from Pauli anticommutation
- **Verified**: — · **Verdict**: open

## §6.6 — Three Pauli operators pairwise anticommute; their eigenbases are the three MUBs of C²

- **Claim** (anchor): "The three Pauli operators X, Y, Z pairwise anticommute, and their eigenbases are precisely these three mutually-unbiased bases"
- **Method**: derivation
- **Source**: → §6.6
- **Verified**: — · **Verdict**: open

## §6.6 — n qubits admit 2ⁿ+1 MUBs (maximal, because 2ⁿ is a prime power)

- **Claim** (anchor): "which exists because $2^n$ is a prime power"
- **Method**: external
- **Source**: TBD — needs verification (Wootters & Fields 1989 or subsequent MUB literature)
- **Verified**: — · **Verdict**: open
- **Comment**: attributed result; canonical source should be cited

## §6.7 — Relative phase is the azimuth of the Bloch vector

- **Claim** (anchor): "is the *azimuth* of the Bloch vector — its rotation around the $z$-axis"
- **Method**: derivation
- **Source**: → §6.7; §6.8 construction
- **Verified**: — · **Verdict**: open

## §6.8 — Density-matrix Bloch decomposition and purity conditions

- **Claim** (anchor): "Any single-qubit density matrix can be"
- **Method**: derivation
- **Source**: → §6.8
- **Verified**: — · **Verdict**: open

## §6.8 — Half-angle is the SU(2)/SO(3) double cover

- **Claim** (anchor): "the double-cover relation between $\mathrm{SU}(2)$ (acting on the Hilbert space) and $\mathrm{SO}(3)$"
- **Method**: external
- **Source**: TBD — needs verification (standard Lie-group / quantum-mechanics reference)
- **Verified**: — · **Verdict**: open
- **Comment**: well-known mathematical fact; a canonical reference (e.g., Sakurai or Varshalovich) should be cited

## §6.8 — 2π Bloch rotation = 4π Hilbert-space rotation

- **Claim** (anchor): "rotation on the Bloch sphere is a"
- **Method**: derivation
- **Source**: → §6.8; consequence of SU(2)/SO(3) double cover
- **Verified**: — · **Verdict**: open

## §6.8 — Hadamard is a π-rotation around the (x+z)/√2 axis

- **Claim** (anchor): "the $\pi$-rotation around the axis"
- **Method**: derivation
- **Source**: → §6.8
- **Verified**: — · **Verdict**: open

## §6.9 — Every single-qubit unitary is a rotation (axis-angle form)

- **Claim** (anchor): "This is the axis-angle form"
- **Method**: derivation
- **Source**: → §6.9
- **Verified**: — · **Verdict**: open

## §6.9 — Zyz Euler decomposition for SU(2)

- **Claim** (anchor): "underwrites single-qubit compilation"
- **Method**: derivation
- **Source**: → §6.9
- **Verified**: — · **Verdict**: open
- **Comment**: standard result; underpins compilation (Chapter 23)

## §6.9 — Single-qubit time-independent evolution is Larmor precession

- **Claim** (anchor): "Larmor precession"
- **Method**: external
- **Source**: TBD — needs verification (standard NMR / quantum-optics reference for Larmor precession terminology)
- **Verified**: — · **Verdict**: open

## §6.10 — Circular-basis measurement implemented by HS†

- **Claim** (anchor): "Circular-basis measurement: $H S^\dagger$, then computational"
- **Method**: derivation
- **Source**: → §6.10
- **Verified**: — · **Verdict**: open

## §6.10 — Sample complexity Θ(1/ε²) to estimate |α|² to additive error ε

- **Claim** (anchor): "To estimate an unknown amplitude squared"
- **Method**: derivation
- **Source**: → §6.10; §4.14 sampling; standard Chernoff/Hoeffding argument
- **Verified**: — · **Verdict**: open
