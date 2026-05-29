# Factcheck — Background and Self-Check

Mirrors `book/00-front-matter/01-background-and-self-check.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

The chapter is a prerequisites self-check covering programming proficiency (§1.1),
mathematical maturity (§1.2), linear algebra (§1.3), probability (§1.4),
complexity basics (§1.5), recommended extras (§1.6), and DSP analogies (§1.7).
Sections §1.1–§1.4, §1.6–§1.7 consist entirely of standard definitions,
pedagogical framing, sample problems with routine derivations, and textbook
references — no significant checkable claims arise there. Two claims in §1.5
are worth anchoring: the characterization of the best known classical factoring
algorithm's complexity regime, and the stated consensus on BQP vs NP.

---

## §1.5 — Sub-exponential regime of GNFS identified as best known classical factoring algorithm

- **Claim** (anchor): "it is sub-exponential but super-polynomial, which is exactly the regime of the best known classical factoring algorithm (the general number field sieve)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The claim ties the growth of 2^√n to the GNFS heuristic complexity. The GNFS run-time is typically stated as L_n[1/3, c] (a stricter sub-exponential), not simply 2^√n; the anchor phrase may be using 2^√n loosely as a stand-in for the sub-exponential class. Worth confirming the precision of the comparison.

## §1.5 — BQP vs NP relationship stated open and consensus incomparable

- **Claim** (anchor): "the consensus is that BQP and NP are incomparable"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: The chapter also asserts "NP ⊆ BQP is open; no proof or disproof is known." Both are standard claims in the quantum complexity literature; the "incomparable" consensus claim should be confirmed against a citable source (e.g., a survey or standard textbook such as Aaronson's lecture notes or Watrous's complexity notes).
