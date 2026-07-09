# Author Read-Through Notes

The author's live notes from the start-to-end read (E2). **Ground rules:** one line per
irritation, `§ + a few words`, zero polish expected — "§x.y: lost here" and "this table
hurts" are complete entries. Nothing is too small to log; the cold reaction is the signal.

Each note gets triaged (below the line, insert-only) into the reader-experience defect
classes of
[analysis-2026-07-09-reader-experience-systemic.md](analysis-2026-07-09-reader-experience-systemic.md)
— A: meta-discourse/repetition · B: used-before-introduced · C: rigor without scaffolding ·
D: table/format misuse · E: other — and is either fixed in the next batch or answered with a
reasoned adjudication. Notes are never deleted.

---

## Notes

*(append here — newest at the bottom is fine)*

- 2026-07-09, Prelude opening: section about nothing before the story; thesis repeated
  twice; literature-in-cells table. → **Triaged A+D; FIXED** in commit `c7e7689` (opening
  cut 1,042 → 323 words, checklist moved to §0.16, table → four bullets).
- 2026-07-09, §4.1: Dirac notation used freely, introduced many subchapters below. →
  **Triaged B; FIXED** in commit `83e3767` (ket reading gloss at first use; global-phase
  demo restated per-amplitude so bra-kets wait for §4.3/§4.12).
- 2026-07-09, §4.11: Hilbert-space definition impossible to understand — Cauchy sequences
  with no definition. → **Triaged C; FIXED** in commit `c3f0bdf` (concrete
  $\mathbb{C}^n$ definition first; completeness/Cauchy as a glossed remark with the
  missing-$\sqrt{2}$ picture).

---

- 2026-07-09, checkpoint feedback: Prelude opening is better now.
- 2026-07-09, Ch4 intro: "We never use the physics macro package…" — why should a paper-book
  or GitHub reader attend to source-level LaTeX? → **Triaged E (audience mismatch); FIXED**:
  point 3 deleted from the chapter intro and the §4.12 "Source convention" paragraph removed
  (STYLE.md remains the contributor-facing home for both).
- 2026-07-09, §4.1: math still uses ket-bra in the complex-numbers introduction section. →
  **Triaged B; FIXED (structural this time)**: §4.1 now derives the state as a concrete
  unit vector $(\alpha,\beta)^T$ in $\mathbb{C}^2$ *first*, then introduces Dirac notation
  at the point of first use with the column-vector reading of $|0\rangle, |1\rangle,
  |\psi\rangle$ — introduce-then-use, not gloss-after-use.
- 2026-07-09, §4.11: "a finite-dimensional complex inner-product space" parses as "a space
  where inner products live"; unclear whether the remark covers finite or infinite
  dimensions. → **Triaged C; FIXED**: rephrased to "vector space that comes equipped with an
  inner product"; the general definition now says explicitly "covering any dimension, finite
  or infinite"; the later recap sentence de-jargoned to "$\mathbb{C}^d$ (with its standard
  inner product)".
- 2026-07-09, §4.12: Dirac notation used 42 times on the page before its definition;
  "abstract state vector … represented by a column vector" very puzzling; the section is
  foggy, misunderstandings multiply — "open Wikipedia" impulse. → **Triaged B+C; FIXED
  (rewrite)**: §4.12 rewritten concrete-first — four objects defined directly as
  column/row/number/matrix with shapes, the merged type-check rule, a worked numeric
  example in $\mathbb{C}^2$ (amplitude and projector), anti-linearity kept; the
  abstract-vs-representation point demoted to a closing "finer point, safe to skip" with
  the value-vs-serialization analogy. The 42-uses complaint is addressed at the root by the
  §4.1 introduce-at-first-use fix.

## Triage log

*(maintained by the review pass; insert-only)*
- 2026-07-09, via external reviewer (filed in external-review-2026-07-09-cold-reader.md):
  §4.1 uses the Hadamard gate before §4.5 introduces its matrix. → **Triaged B; FIXED**
  (one-sentence gloss with §4.5/Chapter-8 pointers, per the reviewer's suggested wording).
