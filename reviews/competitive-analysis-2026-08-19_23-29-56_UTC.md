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
