# Competitive Analysis — *Quantum Computing for Experienced Developers*

**Prepared:** 2026-08-19 23:30 UTC
**Branch:** `quantum-computing-book-competitive-analysis-2026-08-19_23-28-24_UTC`
**Manuscript under analysis:** `book/` at commit `5cbb01d` — 37 chapters +
Historical Prelude + 3 front-matter chapters + 6 appendices + index;
**~245,800 words**.

> **Living document.** This file is appended to as evidence is gathered, not
> written in one pass. Sections appear in the order they were researched.

---

## 0. Method, scope, and evidence rules

**What "competitor" means here.** A book a prospective reader of this
manuscript would plausibly buy *instead of* it — i.e. one that targets a
technical adult reader who wants working understanding of quantum computing,
not a lay reader and not a physics PhD student. Adjacent specialist
monographs (error correction, quantum information theory, QML) are included
as **partial competitors**: they do not compete for the whole reader, but
they set the depth bar for individual Parts of this book.

**Evidence rules.** This repository's own culture (see `PROCESS.md`,
`factcheck/`) requires that claims be sourced and dated. The same discipline
applies here, with one hard constraint recorded up front:

> **Research constraint (2026-08-19).** The session's network egress permits
> only the search tool; direct page fetches (publisher tables of contents,
> Wikipedia, arXiv, open-access full texts) were **blocked by the egress
> proxy**. Every table-of-contents detail below is therefore tagged with its
> provenance:
>
> - **[S]** — confirmed by web search results in this session.
> - **[K]** — from the analyst's prior knowledge of the book (training data,
>   cutoff May 2026). Structurally reliable for long-stable titles
>   (Nielsen–Chuang, Rieffel–Polak, Mermin), less reliable for chapter-level
>   detail of recent or revised editions.
> - **[U]** — unverified / inferred. Treat as a lead to check, not a fact.
>
> Anything marked **[K]** or **[U]** must be re-verified against the
> publisher's own table of contents before it is used in marketing copy, a
> proposal, or a back-cover comparison. This document is an internal
> editorial instrument, not a citable record.

**What the analysis produces.** (1) a competitor set; (2) a topic-by-topic
coverage matrix; (3) an honest verdict on where this book leads, ties, and
trails; (4) concrete proposals for back-matter addenda covering material the
book skips *by design* because it targets experienced developers.

---

## 1. Profile of the book under analysis

Established by direct inspection of the manuscript, so this section carries
no provenance tags — it is all **[verified in-tree]**.

### 1.1 Shape

| Property | Value |
|---|---|
| Word count (`book/`) | ~245,800 |
| Chapters | 37, plus a 16-section Historical Prelude |
| Front matter | Preface; Recommended Background & Self-Check; Notation & Conventions |
| Appendices | A Notation · B Common Gates · C Identities & Decompositions · D Suggested Reading · E Glossary · F 2026 Hardware Snapshot |
| Parts | 13 (Orientation → Formalism → Qubits → Gates/Circuits → Measurement & Information → Algorithms → Complexity → Noise & QEC → Hardware & Software → Practice & Era → Applications → Adjacent Models → Perspective) |
| Code blocks in prose | **12 fenced blocks across the whole manuscript** |
| Runnable examples | **5 Python scripts** in `examples/` |
| Exercises / problem sets | **none** |
| Figures | 3 generator scripts in `figures-src/` (SVG pipeline) |
| Fact-check apparatus | `factcheck/` claim-card mirror; 7 chapters carry References sections |

### 1.2 Declared positioning (from the Preface and `BookDescription.md`)

Explicitly **not**: an introduction to linear algebra/probability/programming;
pop science; a research monograph; a hardware-engineering reference; a
single-vendor SDK tutorial; a programming tutorial; a hype document.

Explicitly **is**: an engineering-oriented, anti-hype, mathematically honest
account for readers who already have programming skill and mathematical
maturity, spanning theory → algorithms → complexity → noise → error
correction → hardware → control electronics → tooling → simulation →
applications → judgment.

### 1.3 Structural facts that will drive the comparison

Three properties of this manuscript are unusual enough that they determine
most of the competitive verdicts below, and they are stated here so the
matrix can be read against them:

1. **Breadth is the headline.** Very few single volumes cover *all* of:
   formal postulates, information theory, the modern algorithmic frontier
   (QSP/QSVT/qubitization), complexity and dequantization, noise
   characterisation, QEC through qLDPC and lattice surgery, five-plus
   hardware platforms, **control electronics and FPGA/cryo-CMOS**,
   compilation/transpilation, **classical simulation methods including
   tensor networks**, five application domains, adjacent models,
   networking, and epistemics.
2. **Zero exercises, near-zero code.** This is a deliberate choice, but it
   is also the single largest structural difference from most competitors
   in the "for developers" and "textbook" segments.
3. **Explicit epistemic apparatus.** Chapters 35–36 (interpretational
   pitfalls, how to judge claims) plus the dated hardware snapshot
   (Appendix F) and the claim-card mirror have **no direct analogue** in
   the standard competitor set. This is the most defensible differentiator.

---

## 2. The competitor set

Assembled from search results in this session plus prior knowledge, then
triaged by how directly each title competes for *this book's* reader: an
experienced developer who wants working understanding, will tolerate
mathematics, and will not tolerate hand-waving.

### 2.1 Tier 1 — direct competitors (same reader, same shelf)

| # | Title | Author(s) | Ed. / year | Publisher | Approx. size | Angle |
|---|---|---|---|---|---|---|
| C1 | *Quantum Computing: An Applied Approach* | Jack D. Hidary | 2nd, 2021 | Springer | ~400 pp | Applied; algorithms + code + a mathematical toolkit in Part III **[S]** |
| C2 | *Dancing with Qubits* | Robert S. Sutor | 2nd, 2024 | Packt | ~700 pp | Build-up from classical maths to algorithms, NISQ, QML; **100+ new exercises** **[S]** |
| C3 | *Quantum Computing: From Concepts to Code* | Andrew Glassner | 1st, Jul 2025 | No Starch | 424 pp | Visual-first, concepts → writing real quantum programs **[S]** |
| C4 | *Programming Quantum Computers* | Johnston, Harrigan, Gimeno‑Segovia | 1st, 2019 | O'Reilly | ~340 pp | Circuit-as-API, QCEngine sandbox, "essential algorithms" **[K]** |
| C5 | *Quantum Computing for Computer Scientists* | Yanofsky & Mannucci | 1st, 2008 | Cambridge | ~400 pp | CS-native formalism, no physics prerequisite **[K]** |
| C6 | *Quantum Computing: A Gentle Introduction* | Rieffel & Polak | 1st, 2011 | MIT Press | ~370 pp | CS-oriented textbook with exercises; strong on QEC & models **[K]** |
| C7 | *Quantum Computer Science: An Introduction* | N. David Mermin | 1st, 2007 | Cambridge | ~220 pp | Deliberately physics-free, CS-facing, very precise **[K]** |
| C8 | *Introduction to Classical and Quantum Computing* | Thomas G. Wong | 2022→, rev. | self-published, **free PDF** | ~300 pp | Course textbook: classical computing first, then qubits; exercises **[S]** |
| C9 | *Understanding Quantum Information and Computation* | John Watrous | 2025 | IBM / **free** (also arXiv:2507.11536) | 16 lessons, 4 units | Rigorous, modern, free, video+text **[S]** |
| C10 | *Understanding Quantum Technologies* | Olivier Ezratty | annual, ≥2024 | **free PDF** | **~1,500 pp** | Encyclopedic: computing, communications, cryptography, sensing, hardware, vendors **[S]** |
| C11 | *Learn Quantum Computing with Python and Q#* | Kaiser & Granade | 2021 | Manning | ~380 pp | Developer-first, code-heavy, Q# **[K]** |
| C12 | *Quantum Computing in Action* | Johan Vos | 2022 | Manning | ~250 pp | Java/JVM developers **[K]** |

### 2.2 Tier 2 — partial competitors (set the depth bar for individual Parts)

| # | Title | Author(s) | Year | Competes with Part |
|---|---|---|---|---|
| P1 | *Quantum Computation and Quantum Information* (10th Anniv.) | Nielsen & Chuang | 2010 | II–VIII: the canonical reference **[S/K]** |
| P2 | *An Introduction to Quantum Computing* | Kaye, Laflamme, Mosca | 2007 | VI–VII algorithms/complexity **[K]** |
| P3 | *Quantum Information Theory* | Mark M. Wilde | 2nd, 2017, free arXiv | V information theory **[K]** |
| P4 | *Quantum Error Correction* (ed.) | Lidar & Brun | 2013 | VIII QEC **[K]** |
| P5 | *Surviving as a Quantum Computer in a Classical World* | Daniel Gottesman | 2024 | VIII QEC / fault tolerance **[K]** |
| P6 | Ph219 / CS219 lecture notes | John Preskill | ongoing, free | V, VII, VIII **[K]** |
| P7 | *Machine Learning with Quantum Computers* | Schuld & Petruccione | 2nd, 2021 | XI ch.30 QML **[K]** |
| P8 | *A Practical Guide to Quantum Machine Learning and Quantum Optimization* | Combarro & González‑Castillo | 2023 | XI ch.29–30 **[K]** |
| P9 | *Building Quantum Computers: A Practical Introduction* | (Cambridge) | 2023–24 | IX hardware: NMR, optics, trapped ions, superconducting **[S]** |
| P10 | *Quantum Computing: From Linear Algebra to Physical Realizations* | Nakahara & Ohmi | 2008 | IX hardware **[K]** |
| P11 | *Quantum Computing Since Democritus* | Scott Aaronson | 2013 | VII complexity, XIII perspective **[K]** |

### 2.3 Deliberately excluded

Pop-science titles (Gribbin's *Computing with Quantum Cats*, Davies' *Quantum
2.0*, Bernhardt's *Quantum Computing for Everyone*) and business-strategy
titles are **not** competitors: the Preface explicitly disclaims that reader.
They matter only for shelf placement and are noted here so the exclusion is a
recorded decision rather than an oversight.

### 2.4 Verified competitor tables of contents

**C2 — Sutor, *Dancing with Qubits* 2E (2024)** **[S]**
Why Quantum Computing · They're Not Old, They're Classics · More Numbers
than You Can Imagine · Planes and Circles and Spheres, Oh My · Dimensions ·
What Do You Mean "Probably"? · One Qubit · Two Qubits, Three · Wiring Up the
Circuits · From Circuits to Algorithms · Getting Physical · Considering NISQ
Algorithms · Introduction to Quantum Machine Learning · Questions about the
Future. *New in 2E: 100+ additional exercises, plus the NISQ-algorithms and
QML chapters.*

**C9 — Watrous, *Understanding Quantum Information and Computation* (2025)** **[S]**
- Unit I *Basics of Quantum Information*: Single Systems · Multiple Systems ·
  Quantum Circuits · Entanglement in Action
- Unit II *Fundamentals of Quantum Algorithms*: Quantum Query Algorithms ·
  Quantum Algorithmic Foundations · Phase Estimation and Factoring · Grover's
  Algorithm
- Unit III *General Formulation of Quantum Information*: Density Matrices ·
  Quantum Channels · General Measurements · Purifications and Fidelity
- Unit IV *Foundations of Quantum Error Correction*: Correcting Quantum
  Errors · The Stabilizer Formalism · Quantum Code Constructions ·
  Fault-Tolerant Quantum Computation

**P1 — Nielsen & Chuang (10th Anniversary Edition, 2010)** **[S for parts, K for ch. 10–12]**
- Part I *Fundamental Concepts*: 1 Introduction and overview · 2 Introduction
  to quantum mechanics · 3 Introduction to computer science
- Part II *Quantum Computation*: 4 Quantum circuits · 5 The quantum Fourier
  transform and its applications · 6 Quantum search algorithms · 7 Quantum
  computers: physical realization
- Part III *Quantum Information*: 8 Quantum noise and quantum operations ·
  9 Distance measures for quantum information · 10 Quantum error-correction ·
  11 Entropy and information · 12 Quantum information theory
- Six appendices (probability, group theory, circuit approximation/
  Solovay–Kitaev, number theory, RSA, Lieb's theorem) **[K]**

**C1 — Hidary, *Quantum Computing: An Applied Approach* 2E (2021)** **[S, partial]**
Three parts: I foundations of quantum computing and quantum circuits;
II the canon of quantum algorithms **with code**; III a mathematical toolkit
— confirmed chapters 11 *Mathematical Tools I*, 12 *II*, 13 *III*, 14 *Dirac
Notation*, 15 *Table of Quantum Operators and Core Circuits*.

**C3 — Glassner, *Quantum Computing: From Concepts to Code* (No Starch, Jul 2025, 424 pp)** **[S, partial]**
Confirmed scope: superposition, quantum gates, interference, entanglement,
measurement, then writing real quantum programs. Chapter-level TOC not
retrievable under this session's egress restrictions.

---
