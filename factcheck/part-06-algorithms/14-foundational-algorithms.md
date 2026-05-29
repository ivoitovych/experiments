# Factcheck — §14 Foundational Algorithms

Mirrors `book/part-06-algorithms/14-foundational-algorithms.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §14.1 — Classical Deutsch query lower bound

- **Claim** (anchor): "Classically you need two queries — evaluate $f(0)$ and $f(1)$, compare. Deutsch's algorithm answers in one query."
- **Method**: external
- **Source**: Deutsch, D. (1985) "Quantum theory, the Church-Turing principle and the universal quantum computer," Proc. R. Soc. Lond. A — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.1 — Phase kickback mechanism

- **Claim** (anchor): "phase kickback": $U_f|x\rangle(|0\rangle - |1\rangle)/\sqrt 2 = (-1)^{f(x)}|x\rangle (|0\rangle - |1\rangle)/\sqrt 2$
- **Method**: derivation
- **Source**: → §14.1 (inline derivation)
- **Verified**: — · **Verdict**: open

## §14.1 — Deutsch measurement outcome rule

- **Claim** (anchor): "the outcome is $0$ iff $f$ is constant, $1$ iff balanced"
- **Method**: derivation
- **Source**: → §14.1 (inline derivation)
- **Verified**: — · **Verdict**: open

## §14.2 — Deutsch–Jozsa classical worst-case query count

- **Claim** (anchor): "the deterministic complexity is $2^{n-1}+1$"
- **Method**: external
- **Source**: Deutsch & Jozsa (1992) "Rapid solution of problems by quantum computation" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.2 — Deutsch–Jozsa one-query algorithm

- **Claim** (anchor): "The Deutsch–Jozsa algorithm answers in one query."
- **Method**: external
- **Source**: Deutsch & Jozsa (1992) "Rapid solution of problems by quantum computation" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.2 — Exponential separation is artificial (bounded-error)

- **Claim** (anchor): "The exponential separation is artificial": it disappears if you allow bounded-error classical algorithms, since a few random samples distinguish constant from balanced with high probability.
- **Method**: external
- **Source**: TBD — needs verification (standard result; see e.g. Bernstein & Vazirani 1993 or Nielsen & Chuang)
- **Verified**: — · **Verdict**: open

## §14.3 — Bernstein–Vazirani classical query lower bound

- **Claim** (anchor): "Classically you need $n$ queries (query the standard basis vectors $e_i$); the Bernstein–Vazirani algorithm needs"
- **Method**: external
- **Source**: Bernstein & Vazirani (1993/1997) "Quantum complexity theory" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.3 — Bernstein–Vazirani exact recovery

- **Claim** (anchor): "the measurement yields $s$ with probability $1$"
- **Method**: derivation
- **Source**: → §14.3 (Hadamard-transform identity derivation)
- **Verified**: — · **Verdict**: open

## §14.4 — Simon's algorithm: first exponential speedup over bounded-error classical

- **Claim** (anchor): "Simon's problem is the first instance of an"
- **Method**: external
- **Source**: Simon (1994/1997) "On the power of quantum computation" — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The text specifies this is a query-complexity separation, not an unconditional time-complexity separation.

## §14.4 — Simon's classical query lower bound (birthday argument)

- **Claim** (anchor): "Classically this requires $\Omega(2^{n/2})$ queries (a birthday-collision argument)."
- **Method**: external
- **Source**: Simon (1994/1997) "On the power of quantum computation" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.4 — Simon's quantum query and classical post-processing complexity

- **Claim** (anchor): "Simon's algorithm needs $O(n)$ quantum queries plus $O(n^3)$ classical post-processing (Gaussian elimination over $\mathbb{F}_2$)."
- **Method**: external
- **Source**: Simon (1994/1997) "On the power of quantum computation" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.4 — Simon as HSP over Z_2^n; Shor as HSP over Z_N

- **Claim** (anchor): "Simon is HSP over $\mathbb{Z}_2^n$ with subgroup $\\{0, s\\}$; Shor's factoring is HSP over $\mathbb{Z}_N$ with cyclic subgroup."
- **Method**: external
- **Source**: TBD — needs verification (see e.g. Lomonaco & Kauffman, or Mosca survey on HSP)
- **Verified**: — · **Verdict**: open

## §14.5 — QFT gate count O(n^2) vs classical FFT O(N log N)

- **Claim** (anchor): "The total gate count is $O(n^2)$, exponentially better than the $O(N \log N) = O(n 2^n)$ of the classical FFT."
- **Method**: derivation
- **Source**: → §14.5 (circuit factorization derivation); classical FFT: Cooley & Tukey (1965) — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.5 — QFT sign convention

- **Claim** (anchor): "This is the negative-exponent ("QFT-sign-minus") convention fixed in §4.13; some sources and SDKs use the opposite sign, so check before porting phase angles."
- **Method**: convention
- **Source**: → §4.13 notation
- **Verified**: — · **Verdict**: open

## §14.5 — For N=2 QFT equals Hadamard

- **Claim** (anchor): "For $N = 2$ the QFT is just the Hadamard gate."
- **Method**: derivation
- **Source**: → §14.5 (follows from QFT definition with N=2)
- **Verified**: — · **Verdict**: open

## §14.5 — Fault-tolerant QFT cost with Solovay–Kitaev

- **Claim** (anchor): "The cost is $O(n^2 \log(n/\epsilon))$ instead of $O(n^2)$ when $\epsilon$-accuracy is required."
- **Method**: external
- **Source**: Solovay–Kitaev theorem — TBD — needs verification (see §8.11 cross-reference; Nielsen & Chuang Appendix 3)
- **Verified**: — · **Verdict**: open

## §14.6 — Phase estimation success probability

- **Claim** (anchor): "The outcome is an integer whose value divided by $2^t$ is $\varphi$ rounded to $t$ bits with probability $\geq 4/\pi^2$."
- **Method**: external
- **Source**: Nielsen & Chuang, §5.2 — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.6 — Phase estimation precision scaling

- **Claim** (anchor): "The required precision $t = O(\log(1/\epsilon))$ on the estimation register gives the standard $\epsilon^{-1}$-scaling"
- **Method**: derivation
- **Source**: → §14.6 (follows from t-bit precision giving error < 2^{-t})
- **Verified**: — · **Verdict**: open

## §14.7 — Grover classical query complexity

- **Claim** (anchor): "Classically requires $\Theta(N/M)$ queries; Grover's algorithm requires $\Theta(\sqrt{N/M})$."
- **Method**: external
- **Source**: Grover (1996) "A fast quantum mechanical algorithm for database search" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.7 — Grover operator rotation angle and optimal iteration count

- **Claim** (anchor): "$G$ is a rotation in the 2D subspace spanned by $|\psi_{\text{good}}\rangle$ and $|\psi_{\text{bad}}\rangle$, rotating by angle $2\theta$ where $\sin\theta = \sqrt{M/N}$."
- **Method**: derivation
- **Source**: → §14.7 (geometric derivation of Grover operator)
- **Verified**: — · **Verdict**: open

## §14.7 — Grover amplitude formula and peak iteration count

- **Claim** (anchor): "After $k$ applications, the amplitude in $|\psi_{\text{good}}\rangle$ is $\sin((2k+1)\theta)$, peaking at $k \approx \pi/(4\theta) = \Theta(\sqrt{N/M})$."
- **Method**: derivation
- **Source**: → §14.7 (rotation formula in 2D subspace)
- **Verified**: — · **Verdict**: open

## §14.8 — Amplitude estimation: O(1/epsilon) queries vs classical O(1/epsilon^2)

- **Claim** (anchor): "amplitude estimation gives a **quadratic speedup**: $O(1/\epsilon)$ queries instead."
- **Method**: external
- **Source**: Brassard, Høyer, Mosca & Tapp (2002) "Quantum amplitude amplification and estimation" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.8 — Classical Monte Carlo precision scaling

- **Claim** (anchor): "classical Monte-Carlo estimation of $a$, which needs $O(1/\epsilon^2)$ samples to hit precision $\epsilon$"
- **Method**: external
- **Source**: TBD — needs verification (standard classical statistics result)
- **Verified**: — · **Verdict**: open

## §14.8 — Iterative amplitude estimation trades log factor for shallower circuits

- **Claim** (anchor): "**Iterative amplitude estimation** drops the QFT and uses adaptive Grover iterations with classical post-processing, trading a $\log$ factor for shallower circuits"
- **Method**: external
- **Source**: TBD — needs verification (see e.g. Grinko et al. 2021 or Aaronson & Rall 2020)
- **Verified**: — · **Verdict**: open

## §14.9 — Abelian HSP solved with O(log|G|) queries

- **Claim** (anchor): "$O(\log |G|)$ queries plus polynomial classical post-processing solve HSP"
- **Method**: external
- **Source**: TBD — needs verification (standard result; see e.g. Lomonaco survey or Childs & van Dam 2010)
- **Verified**: — · **Verdict**: open

## §14.9 — Symmetric group HSP implies polynomial quantum algorithm for graph isomorphism

- **Claim** (anchor): "the **symmetric group** HSP would imply a polynomial quantum algorithm for graph isomorphism (status: open, but progress is slow)"
- **Method**: external
- **Source**: TBD — needs verification (see e.g. Hallgren, Russell & Ta-Shma 2003 or Childs & van Dam 2010 survey)
- **Verified**: — · **Verdict**: open

## §14.9 — Dihedral HSP connects to lattice problems; Kuperberg subexponential algorithm

- **Claim** (anchor): "Kuperberg has subexponential algorithms"
- **Method**: external
- **Source**: Kuperberg (2005) "A subexponential-time quantum algorithm for the dihedral hidden subgroup problem" — TBD — needs verification
- **Verified**: — · **Verdict**: open

## §14.9 — Dihedral HSP: no polynomial-time quantum algorithm known

- **Claim** (anchor): "for which *no* polynomial-time quantum algorithm is known; an open problem driving research on quantum algorithms for lattice problems"
- **Method**: external
- **Source**: TBD — needs verification (open problem; see Regev 2002 or Peikert 2009 survey)
- **Verified**: — · **Verdict**: open
- **Comment**: The text also attributes the connection between dihedral HSP and lattice problems to Regev's reduction.
