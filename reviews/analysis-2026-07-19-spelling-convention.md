# Spelling-Convention Research: What Does the Field Use?

- Date: 2026-07-19
- Trigger: the author challenged the Batch-21 assumption that the book's
  internal British majority settles the convention. Correct challenge: the
  book's internal statistics and the field's convention are different
  questions. This note researches the field.
- Method: journal house-style pages, the titles of the field's
  term-coining papers, the canonical university textbooks, and the seam
  measurement inside this book. (Precise arXiv corpus counts were
  attempted but the arXiv API and search UI are unreachable from this
  build environment; title-level and house-style evidence below is
  unambiguous without them.)

## Findings

### 1. The field's core journals mandate or default to American English

- **APS journals (PRA, PRL, PRX Quantum — the field's central venues):
  American English is mandatory.** The APS style pages state spelling
  "conforms to American English, not British English" ("behavior," not
  "behaviour"), following Webster's.
- **Nature portfolio** (Nature, Nature Physics, npj Quantum Information):
  Oxford spelling — British vocabulary with -ize endings. This is the
  main venue family where British-leaning forms survive (e.g. npjQI has
  published "Scalable randomised benchmarking of non-Clifford gates").
- **Quantum (quantum-journal.org)**: no spelling mandate found; author
  consistency expected. Published titles skew American (e.g. "Hamiltonian
  Simulation by Qubitization").

### 2. The field's terms of art are American-spelled *in their names*

Every term-of-art this book must use was coined in an American-spelled
title or venue:

| Term | Coining/canonical source | Spelling in the name |
|---|---|---|
| stabilizer codes | Gottesman, *Stabilizer Codes and Quantum Error Correction* (Caltech thesis, 1997) | **z** |
| randomized benchmarking | Knill et al., *Randomized benchmarking of quantum gates* (PRA 2008) | **z** |
| color code | Bombín–Martín-Delgado (PRL 2006) and the entire subsequent literature (Error Correction Zoo: "Color code") | **color** |
| qubitization | Low–Chuang, *Hamiltonian Simulation by Qubitization* (Quantum 2019) | **z** |
| dequantization | Tang (STOC 2019) and the follow-up literature | **z** |
| QAOA | Farhi–Goldstone–Gutmann, *A Quantum Approximate Optimization Algorithm* | **z** |

Even authors in Commonwealth institutions use the z-forms for these
names (e.g. Poulin–Laflamme papers: "Stabilizer Formalism for Operator
Quantum Error Correction").

### 3. The canonical university textbooks are American-spelled

- Nielsen & Chuang (CUP) — chapter titles "Quantum computers: physical
  realization", "stabilizer codes"; American text.
- Preskill, Ph219 lecture notes (Caltech) — "stabilizer codes"; American.
- Mermin, *Quantum Computer Science* (CUP) — American.
- Rieffel & Polak (MIT Press) — American.
- Watrous, *Theory of Quantum Information* (CUP) — American.
- Wilde, *Quantum Information Theory* (CUP) — American.
- Aaronson, *Quantum Computing Since Democritus* (CUP) — American.
- Kaye–Laflamme–Mosca (OUP) — even in this OUP text the term of art is
  "stabilizer".
- British-styled exceptions exist (some UK-authored OUP titles, e.g.
  Barnett), but they are a clear minority of assigned texts.

### 4. The seam inside this book

The book currently writes the British form *against* the universal name
of the thing it is teaching:

- "stabiliser" 130 : 9 "stabilizer"
- "randomised benchmarking" 18 : 1 "randomized benchmarking"
- "colour code" 13 : 2 "color code"
- "dequantised" 21 : 0 "dequantized"
- but "qubitization" 29 : 8 "qubitisation" — internally inconsistent
  even between terms.

A reader crosses this spelling seam every time they move from the book
to any paper it cites, and search/grep for the book's spelling of a term
will miss most of the literature.

## Recommendation

**Adopt American English book-wide.** Three reasons, in order of weight:

1. The field's dominant venues (APS family) and the overwhelming
   majority of canonical textbooks are American-spelled; research
   readers' pattern-matching is trained on those forms.
2. The terms of art are American *as names* — a British-spelled book
   must either misspell the names ("stabiliser codes") or accept a
   permanent prose/term seam. American spelling dissolves the seam.
3. Practical bonus: the four slug-bearing headings and one filename
   flagged in Batch 21 as Americanisms (Parameterized Gates, Circuit
   Optimization, NV Centers, `29-optimization-...md`) are already
   American — under this adoption no slug or filename migration is
   needed at all; the change is purely prose-level.

The Oxford/Nature middle option (British + -ize) is not recommended: it
still conflicts with "color code" and "behavior", so it solves the -ise
half of the seam while keeping the rest.

## Migration estimate

Roughly 450–500 prose replacements across the -ise/-isation families
(optimisation 95, stabiliser 130, randomise 53, parameterise 48,
realise 34, characterisation 24, normalise ~45 post-Batch-21, behaviour
12, colour 18, centre 19, factorisation 8, plus the ~45 sites Batch 21
flipped toward British, to be re-flipped). Mechanical sweep with the
usual guards: code blocks, URLs, proper names, and quoted titles
excluded; factcheck anchors requoted in the same commit; lint + anchors
+ TOC + build selftest after. Estimated as one dedicated batch.

**Status: awaiting author sign-off before any migration runs.**
