# Quantum Computing for Experienced Developers

*A Structured Guide from Core Principles to Modern Practice*

by **Iaroslav Voitovych**

---

## What this book is

A rigorous, engineering-oriented, anti-hype guide to quantum computing for
people who already write software and reason mathematically. It bridges
classical computing intuition, linear algebra, circuits, algorithms,
complexity, noise and error correction, hardware, tooling, and the modern
algorithmic frontier — without pop-science metaphors, physics-first detours,
or SDK-tutorial shallowness. See [BookDescription.md](BookDescription.md) for
the full charter.

## Start reading

- **New to the book?** Start with the
  [Preface](book/00-front-matter/00-preface.md).
- **Prefer to begin with the story of how quantum mechanics became quantum
  computing?** Start with the Historical Prelude:
  [From Quanta to Qubits](book/part-00-historical-prelude/00-historical-prelude.md).
- **Looking for a particular topic?** Jump to the
  [Table of Contents](#table-of-contents) below, or see
  [TOC.md](TOC.md) for every section heading.

**Status:** complete `prereviewed` manuscript — all 37 chapters, front
matter, and appendices written and internally reviewed; independent expert
review and final claim-level verification are pending
([PROGRESS.md](PROGRESS.md) has per-chapter status;
[PROCESS.md](PROCESS.md) defines what each status guarantees).

## Who this is for

Experienced software, systems, ML/AI-infrastructure, HPC, and scientific
developers — plus computational mathematicians, cryptographers, and
signal-processing, control, and hardware/software co-design practitioners. No
prior quantum mechanics is assumed, but mathematical maturity is: you should
be comfortable reasoning with vectors, matrices, operators, probability, and
complexity. The full assumed-background list is in
[BookDescription.md](BookDescription.md).

## Choose a reading path

The canonical reading paths — full linear, algorithms-focused,
hardware-and-systems, applications-and-judgment, and a fastest credible
orientation — live in the
[Preface](book/00-front-matter/00-preface.md#suggested-reading-paths),
with fuller versions in [BookDescription.md](BookDescription.md). In brief:

- **Full journey** — Preface → Background and Self-Check → Notation →
  Parts I–XIII → Appendices, in order.
- **Algorithms-first** — foundations (Chapters 1, 4–11), then the
  algorithms of Parts VI–VII.
- **Hardware / systems** — foundations, then Parts VIII–X.

Whichever path you choose, you may optionally begin with the
[Historical Prelude](book/part-00-historical-prelude/00-historical-prelude.md);
no path depends on it.

## Table of Contents

### Front Matter

- [Preface](book/00-front-matter/00-preface.md)
- [Recommended / Assumed Background and Self-Check](book/00-front-matter/01-background-and-self-check.md)
- [Notation and Conventions](book/00-front-matter/02-notation-and-conventions.md)

### Historical Prelude

- [From Quanta to Qubits](book/part-00-historical-prelude/00-historical-prelude.md)

### Part I — Orientation and Framing

- [Chapter 1. Why Quantum Computing Exists](book/part-01-orientation/01-why-quantum-computing-exists.md)
- [Chapter 2. Classical-to-Quantum Contrast](book/part-01-orientation/02-classical-to-quantum-contrast.md)
- [Chapter 3. Physical Intuition Behind Quantum Mechanics](book/part-01-orientation/03-physical-intuition.md)

### Part II — Mathematical and Physical Formalism

- [Chapter 4. Mathematical Background for Quantum Computing](book/part-02-formalism/04-mathematical-background.md)
- [Chapter 5. Postulates of Quantum Mechanics for Computing](book/part-02-formalism/05-postulates.md)

### Part III — Qubits and Multi-Qubit Systems

- [Chapter 6. The Qubit](book/part-03-qubits/06-the-qubit.md)
- [Chapter 7. Multiple Qubits and Entanglement](book/part-03-qubits/07-multiple-qubits-and-entanglement.md)

### Part IV — Gates, Circuits, and Computational Phenomena

- [Chapter 8. Quantum Gates](book/part-04-gates-and-circuits/08-quantum-gates.md)
- [Chapter 9. Quantum Circuits](book/part-04-gates-and-circuits/09-quantum-circuits.md)
- [Chapter 10. Core Quantum Phenomena from a Computational View](book/part-04-gates-and-circuits/10-core-quantum-phenomena.md)

### Part V — Measurement and Quantum Information

- [Chapter 11. Measurement Theory](book/part-05-measurement-and-information/11-measurement-theory.md)
- [Chapter 12. Quantum Information Theory](book/part-05-measurement-and-information/12-quantum-information-theory.md)

### Part VI — Algorithms

- [Chapter 13. The Quantum Algorithms Mindset](book/part-06-algorithms/13-quantum-algorithms-mindset.md)
- [Chapter 14. Foundational Algorithms](book/part-06-algorithms/14-foundational-algorithms.md)
- [Chapter 15. Landmark Quantum Algorithms](book/part-06-algorithms/15-landmark-quantum-algorithms.md)
- [Chapter 16. Modern Algorithmic Frontier](book/part-06-algorithms/16-modern-algorithmic-frontier.md)

### Part VII — Complexity Theory

- [Chapter 17. Complexity Theory Around Quantum Computing](book/part-07-complexity/17-complexity-theory.md)

### Part VIII — Noise, Errors, and Fault Tolerance

- [Chapter 18. Noise, Decoherence, and Errors](book/part-08-noise-and-qec/18-noise-decoherence-and-errors.md)
- [Chapter 19. Quantum Error Correction and Fault Tolerance](book/part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md)

### Part IX — Hardware, Control, and Software

- [Chapter 20. Quantum Hardware Platforms](book/part-09-hardware-and-software/20-quantum-hardware-platforms.md)
- [Chapter 21. Quantum Control and Electronics](book/part-09-hardware-and-software/21-quantum-control-and-electronics.md)
- [Chapter 22. Hardware Engineering Metrics](book/part-09-hardware-and-software/22-hardware-engineering-metrics.md)
- [Chapter 23. Quantum Programming, Compilation, and Tooling](book/part-09-hardware-and-software/23-quantum-programming-compilation-and-tooling.md)
- [Chapter 24. Classical Simulation of Quantum Systems](book/part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md)

### Part X — Practice and Era

- [Chapter 25. NISQ and the Early Fault-Tolerant Era](book/part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md)
- [Chapter 26. Practical Access and Hands-On Work](book/part-10-practice-and-era/26-practical-access-and-hands-on-work.md)

### Part XI — Applications

- [Chapter 27. Cryptography and Security](book/part-11-applications/27-cryptography-and-security.md)
- [Chapter 28. Scientific Computing and Physical Simulation](book/part-11-applications/28-scientific-computing-and-physical-simulation.md)
- [Chapter 29. Optimization, Finance, and Industrial Use Cases](book/part-11-applications/29-optimization-finance-and-industrial.md)
- [Chapter 30. Quantum Machine Learning](book/part-11-applications/30-quantum-machine-learning.md)
- [Chapter 31. Quantum Sensing, Metrology, and Tomography](book/part-11-applications/31-quantum-sensing-metrology-and-tomography.md)

### Part XII — Adjacent Models and Communication

- [Chapter 32. Adjacent Computational Models](book/part-12-adjacent-models/32-adjacent-computational-models.md)
- [Chapter 33. Quantum Communication and Networking](book/part-12-adjacent-models/33-quantum-communication-and-networking.md)

### Part XIII — Engineering Perspective, Epistemics, and Direction

- [Chapter 34. Bridging Quantum Computing to Familiar Engineering Ideas](book/part-13-perspective-and-direction/34-bridging-to-familiar-engineering-ideas.md)
- [Chapter 35. Interpretational and Conceptual Pitfalls](book/part-13-perspective-and-direction/35-interpretational-and-conceptual-pitfalls.md)
- [Chapter 36. How to Judge Claims in Quantum Computing](book/part-13-perspective-and-direction/36-how-to-judge-claims.md)
- [Chapter 37. Endgame](book/part-13-perspective-and-direction/37-endgame.md)

### Back Matter

- [Appendix A. Notation Reference](book/99-back-matter/appendix-a-notation-reference.md)
- [Appendix B. Common Gates and Their Matrices](book/99-back-matter/appendix-b-common-gates.md)
- [Appendix C. Useful Identities and Decompositions](book/99-back-matter/appendix-c-identities-and-decompositions.md)
- [Appendix D. Suggested Reading and Reference Papers](book/99-back-matter/appendix-d-suggested-reading.md)
- [Appendix E. Glossary](book/99-back-matter/appendix-e-glossary.md)
- [Appendix F. 2026 Hardware Snapshot](book/99-back-matter/appendix-f-hardware-snapshot-2026.md)
- [Index](book/99-back-matter/index.md)

---

## Reading the book on GitHub

Each chapter is a separate Markdown file under [`book/`](book/). Click any
chapter title in the table of contents above to read it. Math is written in
LaTeX and renders natively in the GitHub web viewer.

## Building an offline HTML edition

For a continuous, offline copy you can build a single HTML book with
[mdBook](https://rust-lang.github.io/mdBook/): install the toolchain once and
run `make book`, which renders the manuscript — math included, via build-time
KaTeX — into `book-build/`. `mdbook-katex` is a preprocessor coupled to
mdBook's preprocessor protocol, so the two must come from **matching lines**;
install a matched pair from one of these lines:

| mdbook | mdbook-katex | notes |
|---|---|---|
| 0.4.x | 0.9.x | stable; the combination tested in this repo (0.4.48 + 0.9.4) |
| 0.5.x | 0.10.x | newer protocol; the matching line per the crate manifests, but `mdbook-katex 0.10` is currently pre-release and not re-verified here |

```bash
# stable pair (recommended):
cargo install mdbook --version '>=0.4,<0.5' --locked --force
cargo install mdbook-katex --version 0.9.4 --locked --force

# or the mdbook 0.5.x line (pre-release katex):
cargo install mdbook --locked --force
cargo install mdbook-katex --version 0.10.0-alpha --locked --force
```

Mixing lines (e.g. mdbook 0.5.x with mdbook-katex 0.9.x) is what produces the
`invalid type: null …` TOML error during the katex preprocessor. `make book`
detects a mismatched pair and prints the exact command to fix it. See
[PROCESS.md](PROCESS.md) (*Building the rendered book*) for the full version
matrix, the dependency rationale, and troubleshooting.

## Runnable examples

The code listings in Chapters 14, 15, 24, and 26 are backed by runnable
Python programs in [`examples/`](examples/) (Bell state, statevector
simulation, Deutsch–Jozsa, Grover), verified end-to-end by
`make check-examples` and licensed permissively so you can reuse them in
your own code (see [License](#license)).

## Project documents

- [BookDescription.md](BookDescription.md) — the charter: scope, audience, philosophy, reading paths.
- [TOC.md](TOC.md) — full table of contents with every section heading.
- [PROGRESS.md](PROGRESS.md) — per-chapter status and the phase-by-phase writing plan.
- [STYLE.md](STYLE.md) — math, notation, and file conventions used throughout the manuscript.
- [PROCESS.md](PROCESS.md) — working method, toolchain, and decision log.
- [HISTORY.md](HISTORY.md) — chronological narrative of how the project reached its current state.
- [CITATION.cff](CITATION.cff) — how to cite this work.
- [reviews/](reviews/) — the review, verification, and planning reports (comprehensive review, external fact verification, recommendations, program analyses). These are insert-only audit artifacts, retained permanently as provenance.
- [factcheck/](factcheck/) — the claim-level verification mirror: one file per chapter listing its check-worthy claims with verdicts and sources.
- [archive/](archive/) — frozen working artifacts (early drafts, superseded reviews, the original planned outline), preserved for provenance.
- [docs/github-markdown-math-bugs.md](docs/github-markdown-math-bugs.md) — canonical memo on GitHub Markdown + MathJax rendering bugs and their workarounds; [docs/render-tests/math-context-matrix.md](docs/render-tests/math-context-matrix.md) is its test sheet.

## License

The book — the manuscript under [`book/`](book/), its derived contents, and
its editorial and audit record — is licensed under **CC BY-NC-ND 4.0**, with
commercial use requiring a separate license; see [LICENSE](LICENSE) for the
full terms.

The runnable examples and the reusable project infrastructure — build
scripts, review and verification tools, the renderer-bug knowledge base,
process and style documentation, and the `Makefile` — are licensed under the
**MIT License** ([LICENSE-MIT](LICENSE-MIT)). You are welcome to adapt them
for your own books and projects.
