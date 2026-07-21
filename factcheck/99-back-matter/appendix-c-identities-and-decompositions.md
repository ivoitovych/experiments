# Factcheck — Appendix C: Identities and Decompositions

Mirrors `book/99-back-matter/appendix-c-identities-and-decompositions.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## C.1 — Pauli group closure

- **Claim** (anchor): "any product of n-qubit Pauli strings is again a Pauli string up to a factor in"
- **Method**: derivation
- **Source**: → standard result; follows factor-by-factor from the single-qubit Pauli product table in §C.1
- **Verified**: — · **Verdict**: open
- **Comment**: Closure of the n-qubit Pauli group under multiplication, with phase in {±1, ±i}.

## C.3 — Jacobi identity for commutators

- **Claim** (anchor): "Jacobi identity"
- **Method**: derivation
- **Source**: → standard algebraic identity; verifiable by direct expansion of nested commutators
- **Verified**: — · **Verdict**: open
- **Comment**: States [A,[B,C]] + [B,[C,A]] + [C,[A,B]] = 0 for any operators A, B, C.

## C.3 — Simultaneous diagonalization and pairwise commuting operators

- **Claim** (anchor): "A pairwise commuting family of normal operators admits a single orthonormal basis in which every member is diagonal"
- **Method**: derivation
- **Source**: → §4.5 and §4.7; standard spectral theorem for commuting normal operators
- **Verified**: — · **Verdict**: open
- **Comment**: Standard functional-analysis result; book cross-references §4.5 and the spectral statement in §4.7.

## C.4 — Hadamard conjugation of Paulis

- **Claim** (anchor): "Hadamard conjugation of Paulis"
- **Method**: derivation
- **Source**: → follows from H^2 = I, H = (X+Z)/√2, and the Pauli algebra of §C.1
- **Verified**: — · **Verdict**: open
- **Comment**: HXH = Z, HZH = X, HYH = -Y; the book cites these as derivable from §C.1.

## C.4 — Three-CNOT SWAP identity

- **Claim** (anchor): "Three-CNOT SWAP identity"
- **Method**: derivation
- **Source**: → verifiable by direct matrix multiplication; standard textbook circuit identity
- **Verified**: — · **Verdict**: open
- **Comment**: SWAP = CNOT_{1→2} CNOT_{2→1} CNOT_{1→2} = CNOT_{2→1} CNOT_{1→2} CNOT_{2→1}.

## C.4 — Hadamard sandwich swaps control and target of CNOT

- **Claim** (anchor): "Hadamard sandwich swaps the role of control and target"
- **Method**: derivation
- **Source**: → verifiable by direct matrix computation; standard basis-change identity
- **Verified**: — · **Verdict**: open
- **Comment**: (H⊗H) CNOT_{1→2} (H⊗H) = CNOT_{2→1}.

## C.4 — CZ–CNOT conversion via Hadamard on target

- **Claim** (anchor): "CZ–CNOT conversion"
- **Method**: derivation
- **Source**: → verifiable by matrix computation; standard identity
- **Verified**: — · **Verdict**: open
- **Comment**: CNOT_{1→2} = (I⊗H) CZ (I⊗H) and conversely.

## C.4 — Pauli conjugation by CNOT (propagation rules)

- **Claim** (anchor): "These four relations generate the action of CNOT on the full two-qubit Pauli group"
- **Method**: derivation
- **Source**: → stabilizer formalism §19.8; verifiable by direct matrix multiplication
- **Verified**: — · **Verdict**: open
- **Comment**: X copies forward (control to target), Z copies backward (target to control).

## C.5 — Z–Y–Z (Euler) decomposition of a single-qubit unitary

- **Claim** (anchor): "Z–Y–Z (Euler) decomposition of a single-qubit unitary"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Any single-qubit unitary U can be written U = e^{iα} R_z(β) R_y(γ) R_z(δ); standard result in Nielsen & Chuang and quantum circuit compilation literature.

## C.5 — KAK decomposition of a two-qubit unitary

- **Claim** (anchor): "KAK decomposition of a two-qubit unitary"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Every U ∈ U(4) factors as (A_1⊗A_2) exp(i(c_x X⊗X + c_y Y⊗Y + c_z Z⊗Z)) (B_1⊗B_2); named decomposition from Lie theory (Cartan/KAK). Book develops it in §8.14.

## C.5 — KAK parameter counts: 3 non-local + 12 local real parameters for U(4)

- **Claim** (anchor): "The non-local part carries three real parameters. Counting consistently: take the four local factors in $\mathrm{SU}(2)$ ($3$ parameters each, $12$ total) plus one global phase — $3 + 12 + 1 = 16$, the dimension of $\mathrm{U}(4)$"
- **Method**: derivation
- **Source**: → §8.14; parameter count follows from dim U(4) = 16 = 3 (non-local) + 12 (four SU(2) locals, dim SU(2) = 3 each) + 1 (global phase)
- **Verified**: — · **Verdict**: open
- **Comment**: Arithmetic of the KAK decomposition parameter count.

## C.5 — SWAP and CNOT KAK coefficients

- **Claim** (anchor): "CNOT has (c_x, c_y, c_z) = (\pi/4, 0, 0) up to local unitaries"
- **Method**: derivation
- **Source**: → §8.14; verifiable by computing the non-local part from the matrix definitions in §B.5
- **Verified**: — · **Verdict**: open
- **Comment**: Specific KAK coefficient values for the two standard entangling gates: SWAP has (π/4,π/4,π/4), CNOT has (π/4,0,0).

## C.5 — CNOT count upper bound: at most three CNOTs for any two-qubit unitary

- **Claim** (anchor): "CNOT count for a two-qubit unitary"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Optimality result for two-qubit compilation via KAK; book references §8.14. Known result in quantum circuit synthesis (Vatan & Williams 2004, or similar).

## C.5 — Two-CNOT, one-CNOT, and zero-CNOT sufficiency conditions

- **Claim** (anchor): "Two-CNOT decomposition is enough iff the KAK coefficient vector has $c_z = 0$ in the canonical Weyl-chamber coordinates $c_x \ge c_y \ge |c_z|$ of §8.14"
- **Method**: derivation
- **Source**: → §8.14; follows from the KAK form and entanglement classification
- **Verified**: — · **Verdict**: open
- **Comment**: Structural characterization of how many CNOTs are needed based on KAK coefficients.

## C.5 — Toffoli gate decomposes into 6 CNOTs

- **Claim** (anchor): "Six CNOTs is optimal for an exact ancilla-free, measurement-free Toffoli under the standard gate model"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Optimality of the 6-CNOT Toffoli decomposition. Book cites §8.8 for the construction. The standard T/T†-ladder decomposition uses 6 CNOTs + 7 T/T† gates + 2 Hadamards. Optimality claim needs a source.

## C.6 — SH maps computational basis to Y eigenbasis

- **Claim** (anchor): "SH moves between the Y eigenbasis and the computational basis"
- **Method**: derivation
- **Source**: → verifiable by matrix computation using S and H definitions from §B.2–B.3
- **Verified**: — · **Verdict**: open
- **Comment**: SH|0⟩ = |y_+⟩ and SH|1⟩ = |y_-⟩; measurement in Y basis via HS†.

## C.6 — Mutually unbiased bases (MUB) definition and qubit case

- **Claim** (anchor): "Mutually unbiased bases"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Definition |⟨a_i|b_j⟩|² = 1/d. The claim that the three Pauli eigenbases are pairwise MUB on one qubit is standard and derivation-verifiable. The statement about maximum possible number of MUBs in dimension 2 being 3 is a known result.

## C.6 — Maximum MUB count: at most d+1 bases in dimension d, achieved for prime-power d

- **Claim** (anchor): "The maximum number of mutually unbiased bases in dimension d is at most d + 1, and this bound is achieved when d is a prime power"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Classic result in combinatorics/quantum information. The open problem for non-prime-power d, smallest case d=6, is a long-standing open research question.

## C.6 — MUB open problem: d=6 is the smallest open case

- **Claim** (anchor): "whether d + 1 is achievable for non-prime-power d — the smallest open case is d = 6 — is a long-standing open problem"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Factual claim about the state of the open problem in combinatorics/quantum information; should be verified against the current literature.
