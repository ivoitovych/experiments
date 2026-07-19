# Factcheck — Notation and Conventions

Mirrors `book/00-front-matter/02-notation-and-conventions.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## Notation — Hilbert-space default field

- **Claim** (anchor): "The default field of scalars is $\mathbb{C}$, and the default state space on $n$ qubits is $\mathbb{C}^{2^n}$ with the standard Hermitian inner product"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — natural numbers include zero

- **Claim** (anchor): "natural numbers, including zero. The book is zero-indexed by default"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — logarithm base 2 default

- **Claim** (anchor): "Logarithms are base 2 by default"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — natural logarithm written ln

- **Claim** (anchor): "Natural logarithms are written $\ln n$"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — entropy in bits, base 2

- **Claim** (anchor): "Entropy sections use base 2 throughout, so entropies are measured in bits"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — soft-O hides polylogarithmic factors

- **Claim** (anchor): "soft-O, hiding polylogarithmic factors"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: Defined as O(g · polylog(g)); referenced throughout algorithm chapters.

---

## Notation — hbar set to 1 in algorithmic chapters

- **Claim** (anchor): "algorithmic chapters set $\hbar = 1$ so that the Schrödinger evolution reads $U(t) = e^{-iHt}$ with no prefactor"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — Greek letters: default roles

- **Claim** (anchor): "Greek letters carry a default role"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: α,β,γ,δ = amplitudes; θ,φ = angles; λ,μ = eigenvalues; σ = singular values and Pauli vector; ψ,φ,χ,φ = state vectors; ρ,σ = density matrices; ε,δ = error/failure params; ω = root of unity.

---

## Notation — matrices act on column vectors from the left

- **Claim** (anchor): "Matrices in this book act on column vectors from the left"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — matrix index conventions (0 in code, 1 in formulas)

- **Claim** (anchor): "Indices run from $0$ in code listings and from $1$ in displayed formulas"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — adjoint definition

- **Claim** (anchor): "$A^\dagger = \overline{A}^T$ — adjoint (conjugate transpose)"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — default norm is 2-norm / spectral norm

- **Claim** (anchor): "The default norm without subscript is the 2-norm on vectors and the operator (spectral) norm on operators"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — trace distance definition

- **Claim** (anchor): "Trace distance between density matrices is $D(\rho, \sigma) = \tfrac{1}{2}\|\rho - \sigma\|_1$"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — no physics-package macros; raw LaTeX for bra-ket

- **Claim** (anchor): "The book uses raw `\langle` and `\rangle` for all bra-ket notation"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference); STYLE.md binding statement
- **Verified**: — · **Verdict**: open
- **Comment**: Required for compatibility with GitHub, mdBook, and Pandoc rendering pipelines.

---

## Notation — inner product: conjugate-linear in first argument

- **Claim** (anchor): "Conjugate-linear in the first argument, linear in the second (physicists' convention)"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: Physicists' convention (conjugate-linear in first slot) as opposed to the mathematicians' convention (conjugate-linear in second slot).

---

## Notation — computational basis vectors

- **Claim** (anchor): "Single-qubit computational basis"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: |0⟩ = (1,0)^T, |1⟩ = (0,1)^T in C^2; state normalization |α|²+|β|²=1.

---

## Notation — Hadamard basis and Y eigenstates

- **Claim** (anchor): "Hadamard basis ($X$ eigenstates)"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: |+⟩, |−⟩ are X eigenstates; |+i⟩, |−i⟩ are Y eigenstates; these names used throughout the book.

---

## Notation — bit-string order: leftmost is most significant

- **Claim** (anchor): "Bit-string order: leftmost is most significant"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference); re-stated at §4.2, §4.8, §4.16
- **Verified**: — · **Verdict**: open
- **Comment**: |01⟩ maps to statevector index 1, column vector (0,1,0,0)^T. Opposite of Qiskit's default.

---

## Notation — Qiskit endian warning

- **Claim** (anchor): "Qiskit prints bit strings and indexes the statevector with qubit $0$ as the least significant bit"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: The book's leftmost tensor factor maps to Qiskit's highest-numbered qubit label. Full reconciliation at §4.8.

---

## Notation — circuit time direction left to right

- **Claim** (anchor): "Time runs left to right"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — qubit wire numbering top to bottom

- **Claim** (anchor): "Qubits are numbered $0$ through $n-1$, top to bottom"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: Drawing convention only; does not fix bit-string ordering (that is §2.4).

---

## Notation — positive vs anti-control symbols

- **Claim** (anchor): "positive control — the gate fires when that wire is"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — unlabeled wires default to |0⟩

- **Claim** (anchor): "Unlabeled wires default to $|0\rangle$ unless the surrounding prose says otherwise"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — QFT sign convention (negative exponent)

- **Claim** (anchor): "The book uses the negative-exponent convention"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference); established at §4.13
- **Verified**: — · **Verdict**: open
- **Comment**: F_N |j⟩ = N^{-1/2} Σ_k ω^{-jk} |k⟩. Sign conventions vary across sources and SDKs; transforms copied across convention boundary need conjugated phase angles.

---

## Notation — Shannon entropy convention: 0 log 0 = 0

- **Claim** (anchor): "Convention: $0 \log 0 = 0$"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — Born rule for projective measurement

- **Claim** (anchor): "Born rule probability of outcome"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: p(λ) = ⟨ψ|P_λ|ψ⟩; post-measurement state is P_λ|ψ⟩/√p(λ).

---

## Notation — density matrix definition

- **Claim** (anchor): "density matrix: positive semidefinite with $\mathrm{tr}(\rho) = 1$"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — POVM definition

- **Claim** (anchor): "POVM (positive operator-valued measure). Outcome probability is $p_i = \mathrm{tr}(\rho\, E_i)$"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference); developed in Chapter 11
- **Verified**: — · **Verdict**: open

---

## Notation — default measurement basis is computational

- **Claim** (anchor): "Measurement in the computational basis is the default for any register"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — status block format and states

- **Claim** (anchor): "States in order of completeness:"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference); parsed by scripts/generate_progress.py
- **Verified**: — · **Verdict**: open

---

## Notation — cross-reference style (section numbers preferred)

- **Claim** (anchor): "In prose the section number is preferred over the heading text, so re-titled sections do not break the reference"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open

---

## Notation — equations not globally numbered; inline tags

- **Claim** (anchor): "Equations are not numbered as a global system"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
- **Comment**: When a formula needs back-reference it receives an inline tag written as `\quad (1.3.1)` in source.

---

## Notation — source escaping rules for GitHub renderer

- **Claim** (anchor): "Source-level escaping for the GitHub renderer"
- **Method**: convention
- **Source**: → book-wide convention (consistency reference); enforced by tools/lint.py
- **Verified**: — · **Verdict**: open
- **Comment**: Key rules: `\\\\` for matrix row breaks, `\\{`/`\\}` for set braces, `\\,` for thin space, `\\|` for norm bar.

---

## Notation — \operatorname forbidden; use \mathrm

- **Claim** (anchor): "GitHub's MathJax rejects it as \"macro is not allowed\". Use `\mathrm{...}` instead."
- **Method**: convention
- **Source**: → book-wide convention (consistency reference)
- **Verified**: — · **Verdict**: open
