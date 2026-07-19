# Fact-check cards — pilot (Chapter 15: Landmark Quantum Algorithms)

Mirrors `book/part-06-algorithms/15-landmark-quantum-algorithms.md`.

> Pilot file demonstrating the [card spec](CARD-SPEC.md) on three real claims
> from §15 — one externally-sourced `verified` card, one derivation-backed
> `verified` card, and one `depends` card. The Exact-text quotes are verbatim
> from §15, so the staleness linter has live anchors.

## §15.1 Grover's algorithm

### Grover's √N is query-optimal for unstructured search

**Claim:**
Unstructured search for a marked item among `N` cannot be done with fewer than
`Θ(√N)` quantum oracle queries, so Grover's `O(√N)` is optimal in the black-box
(query) model — no quantum algorithm beats it.

**Exact text:** (verbatim from the manuscript)

> "Bennett–Bernstein–Brassard–Vazirani showed Grover's $\sqrt N$ is optimal in the oracle model."

**Context:**
§15.1, closing the Grover section. This card verifies the optimality result and
its attribution only — not Grover's constant-factor success-probability analysis
or the fault-tolerant-overhead discussion in the same section.

**Clarity:**
clear — the claim names a specific lower bound, a specific model (black-box /
query), and a specific attribution; nothing needs interpreting.

**Status:**
verified

**Evidence:**

1. Primary source — C. H. Bennett, E. Bernstein, G. Brassard, U. Vazirani,
   "Strengths and Weaknesses of Quantum Computing," *SIAM J. Comput.* 26(5):1510
   (1997), arXiv:quant-ph/9701001. Proves an `Ω(√N)` lower bound on quantum
   queries for unstructured search, matching Grover's `O(√N)` upper bound.
   Directly supports both the optimality claim and the attribution.
2. Standard textbook coverage (Nielsen & Chuang, *Quantum Computation and
   Quantum Information*, §6.6) states the same matching bound — supporting but
   derivative, used only as cross-confirmation.

**Last checked:** 2026-05-30

## §15.3 Factoring

### Gidney (2025): RSA-2048 under 1M qubits, under one week

**Claim:**
A May-2025 estimate by Gidney puts the cost of factoring RSA-2048 with Shor's
algorithm at under one million noisy physical qubits and under one week of
runtime (at a `~10⁻³` gate error rate) — a `>20×` qubit reduction over the 2019
Gidney–Ekerå estimate without weakening the noise assumptions.

**Exact text:** (verbatim from the manuscript)

> "**Gidney (arXiv 2505.15917, May 2025):** under 1 million physical qubits, under one week — a $>20\times$ qubit reduction without weakening the assumptions"

**Context:**
§15.3, the dated factoring-resource discussion (under that section's
moving-target warning). This card verifies the headline qubit/runtime figures
and the `>20×` comparison only — not the supporting mechanisms (approximate
residue arithmetic, yoked surface codes), which §15.3 attributes to separate
papers.

**Clarity:**
clear — specific paper, specific quantitative figures, specific comparison
baseline.

**Status:**
verified

**Evidence:**

1. Primary source — C. Gidney, "How to factor 2048 bit RSA integers with less
   than a million noisy qubits," arXiv:2505.15917 (May 2025). The abstract gives
   the sub-million-qubit, sub-one-week estimate at a `~10⁻³` error rate;
   verified against the abstract on 2026-05. Directly supports the qubit and
   runtime figures. (A verbatim line from the paper has not yet been pulled into
   this card; the figures above are paraphrased from the abstract, not quoted.)
2. Corroboration — the accompanying Google Research write-up reports the same
   headline numbers; supporting and derivative, not independent.

**Last checked:** 2026-05-30

## §15.5 HHL algorithm for linear systems

### HHL's exponential speedup is conditional on input/output access

**Claim:**
HHL solves `Ax = b` with cost `O((log N)·s²κ²/ε)` — an exponential speedup in the
dimension `N` — but only when `A` is sparse and well-conditioned, `b` is
efficiently preparable as a quantum state, and the wanted answer is a property of
`x` extractable from `|x⟩` in `O(poly log N)` measurements; reading `x` out
classically costs `Θ(N)` and erases the speedup.

**Exact text:** (verbatim from the manuscript)

> "HHL is useful only when the *answer to your question* is a property of $x$ extractable from $|x\rangle$ in $O(\mathrm{poly}\log N)$ measurements"

**Context:**
§15.5, the HHL caveats. This card records that the speedup is *conditional* — the
truth of "exponential speedup" depends on the input-access and output-readout
model, not on nature.

**Clarity:**
clear — the conditions are explicitly enumerated and quantitative.

**Status:**
depends

**Evidence:**

1. The claim is conditional by construction: §15.5 lists the three load-bearing
   assumptions (sparsity + conditioning, efficient `b`-preparation, and
   poly-log-extractable output). Tang-style dequantization (E. Tang, "A
   quantum-inspired classical algorithm for recommendation systems," STOC 2019,
   arXiv:1807.04271, and follow-ups) shows that once a classical algorithm is
   granted the analogous sample-and-query access, the exponential separation
   vanishes — so the speedup depends on the input being *genuinely* quantum.
   Condition: the exponential speedup holds for fully-quantum input/output (e.g.
   a block-encoded matrix produced and consumed by other quantum subroutines),
   and is dequantized for classical input loaded via QRAM.

**Last checked:** 2026-05-30
