# Quantum Computing for Experienced Developers

*A Structured Guide from Core Principles to Modern Practice*

by **Iaroslav Voitovych**

---

## What this is

A rigorous, engineering-oriented, anti-hype guide to quantum computing for
people who already write software and reason mathematically. It bridges
classical computing intuition, linear algebra, circuits, algorithms,
complexity, noise and error correction, hardware, tooling, and the modern
algorithmic frontier — without pop-science metaphors, physics-first detours,
or SDK-tutorial shallowness. See [BookDescription.md](BookDescription.md) for
the full charter and [TOC.md](TOC.md) for every section heading.

## Status

**Full manuscript drafted; technical and editorial review in progress.** All
37 chapters plus front matter and appendices are written and readable, but
every file is currently at `draft` status — not yet `reviewed` or `final`.
Treat the text as a complete draft under active revision. See
[PROGRESS.md](PROGRESS.md) for per-chapter status and the writing plan.

## Who this is for

Experienced software, systems, ML/AI-infrastructure, HPC, and scientific
developers — plus computational mathematicians, cryptographers, and
signal-processing, control, and hardware/software co-design practitioners. No
prior quantum mechanics is assumed, but mathematical maturity is: you should
be comfortable reasoning with vectors, matrices, operators, probability, and
complexity. The full assumed-background list is in
[BookDescription.md](BookDescription.md).

## Start here

Pick an entry path by goal (fuller versions in
[BookDescription.md](BookDescription.md)):

- **Full journey** — read linearly: Parts I–III (foundations, qubits,
  entanglement) → IV–VI (circuits, algorithms) → VII (complexity) → VIII–IX
  (noise, hardware, software) → X–XIII (practice, applications, epistemics).
- **Algorithms-first** — Chapters 1–5, then 8–17, with Chapter 16 (modern
  frontier) and Chapter 36 (judging claims).
- **Hardware / control / software** — Chapters 1–5, then 18–23, then 25 (NISQ
  era) and 34 (engineering analogies).
- **Skeptical / frontier reader** — Chapters 12, 16, 17, 19, 24, then 35–37
  for interpretation, claim evaluation, and direction.

## Reading the book on GitHub

Each chapter is a separate Markdown file under [`book/`](book/). Click any
chapter title in the table of contents below to read it. Math is written in
LaTeX and renders natively in the GitHub web viewer.

For a continuous, offline copy you can build a single HTML book with
[mdBook](https://rust-lang.github.io/mdBook/): install the toolchain once and
run `make book`, which renders the manuscript — math included, via build-time
KaTeX — into `book-build/`. The known-good toolchain is **mdbook 0.4.x**
(tested with 0.4.48) together with **mdbook-katex 0.9.4**; install pinned
versions with

```
cargo install mdbook --version '>=0.4,<0.5' --locked
cargo install mdbook-katex --version 0.9.4 --locked
```

mdbook 0.5.x is not yet supported — mdbook-katex 0.9.4 fails against its
render-context schema (a TOML parse error) before HTML rendering completes.
`make book` prints this guidance if it detects an out-of-range mdbook. See
[PROCESS.md](PROCESS.md) (*Building the rendered book*) for the full
version matrix and troubleshooting, including downgrade commands.

## Project documents

- [BookDescription.md](BookDescription.md) — the charter: scope, audience, philosophy, reading paths.
- [TOC.md](TOC.md) — full table of contents with every section heading.
- [PROGRESS.md](PROGRESS.md) — per-chapter status and the phase-by-phase writing plan.
- [STYLE.md](STYLE.md) — math, notation, and file conventions used throughout the manuscript.
- [PROCESS.md](PROCESS.md) — working method, toolchain, and decision log.
- [HISTORY.md](HISTORY.md) — chronological narrative of how the project reached its current state.
- [CITATION.cff](CITATION.cff) — how to cite this work.
- [docs/github-markdown-math-bugs.md](docs/github-markdown-math-bugs.md) — canonical memo on GitHub Markdown + MathJax rendering bugs and their workarounds; [docs/render-tests/math-context-matrix.md](docs/render-tests/math-context-matrix.md) is its live test sheet.

## License

The **manuscript** — everything under [`book/`](book/) and the prose
documents — is dual-licensed: free for non-commercial use under
**CC BY-NC-ND 4.0**, with commercial use requiring a separate license.

The **code and tooling** (`scripts/`, `tools/`, the `Makefile`) are not part
of the licensed manuscript. They are provided to reproduce the build and
review pipeline; all rights reserved unless a separate license is stated for
them.

See [LICENSE](LICENSE) for full terms.

---

## Table of Contents

### Front Matter

- [Preface](book/00-front-matter/00-preface.md)
- [Recommended / Assumed Background and Self-Check](book/00-front-matter/01-background-and-self-check.md)
- [Notation and Conventions](book/00-front-matter/02-notation-and-conventions.md)

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
