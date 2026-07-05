# External Review (2026-07-05) — Reader-Experience Review, with Triage

**Provenance:** Received by the author on 2026-07-05; an unsolicited repo-level review of the
public branch `quantum-computing-book`, produced by an external (apparently AI-assisted)
reviewer working from the GitHub-rendered repository. Reproduced verbatim in Part A; analysed
and triaged in Part B. **This review does not advance any file's status** — the `reviewed`
rung is reserved for a respected independent expert review (PROCESS.md, *Status-promotion
criteria*) — but it is the project's first external reader-experience datapoint and is
preserved here under the project's never-lose-a-review practice.

---

## Part A — The review, verbatim

> **This is a comprehensive review of the GitHub-hosted manuscript project** at
> https://github.com/ivoitovych/experiments/tree/quantum-computing-book (main entry point:
> the README.md you linked).
>
> ### Project Overview
> **Title**: *Quantum Computing for Experienced Developers: A Structured Guide from Core
> Principles to Modern Practice*
> **Author**: Iaroslav Voitovych (ivoitovych)
> **Format**: Full manuscript (~37 chapters + front matter, appendices, and index) written in
> Markdown with LaTeX math. Hosted as a versioned draft on GitHub.
> **Status** (as of the latest files): All content is complete and at *prereviewed* status
> (full internal section-by-section review + remediation + external verification of flagged
> claims completed). No chapters have advanced to independent expert review (*reviewed*) or
> closed claim-level fact-check (*final*).
>
> The repo shows 278 commits on the branch, indicating sustained solo development. It has
> **0 stars and 0 forks** — it appears to be a low-profile, high-effort personal project
> rather than a widely promoted one.
>
> **Core positioning** (from README, BookDescription.md, and TOC): A rigorous,
> engineering-first, deliberately anti-hype guide for people who already write software and
> reason mathematically. It bridges classical computing intuition, linear algebra, circuits,
> algorithms, complexity, noise/error correction, hardware, tooling, and the modern
> algorithmic frontier — without pop-science metaphors, physics-first detours, or shallow SDK
> tutorials.
>
> ### Scope and Structure
> The book is organized into **13 parts** across ~48 files (front matter, 37 chapters, back
> matter). It is unusually broad and modern for a single-author work.
>
> **High-level structure** (from README.md and TOC.md):
>
> - **Front Matter**: Preface, background/self-check, notation/conventions.
> - **Historical Prelude**: From Quanta to Qubits.
> - **Parts I–III**: Orientation, mathematical/physical formalism, qubits & entanglement.
> - **Parts IV–V**: Gates/circuits/phenomena, measurement & quantum information theory.
> - **Part VI**: Algorithms (mindset → foundational → landmark → *modern algorithmic
>   frontier*).
> - **Part VII**: Complexity theory.
> - **Parts VIII–IX**: Noise/decoherence/errors & QEC/fault tolerance; hardware platforms,
>   control/electronics, metrics, programming/tooling, classical simulation.
> - **Parts X–XI**: NISQ/early fault-tolerant era + practical access; applications
>   (cryptography, scientific simulation, optimization/finance, QML, sensing/metrology/
>   tomography).
> - **Parts XII–XIII**: Adjacent models & quantum communication/networking; engineering
>   analogies, interpretational pitfalls, *how to judge claims*, endgame.
> - **Back Matter**: Notation reference, gate matrices, identities/decompositions, suggested
>   reading, glossary, **2026 Hardware Snapshot** appendix, index.
>
> **Notable inclusions** (rare in one volume):
> - Modern unifying frameworks (block encodings, LCU, qubitization, QSP/QSVT) in Chapter 16.
> - Dedicated chapter on judging claims (Ch. 36) and interpretational pitfalls (Ch. 35).
> - Engineering metrics (T-count, logical depth, ancilla footprint, subnormalization α,
>   resource accounting).
> - Dequantization warnings and input-model assumptions.
> - Explicit NISQ vs. early fault-tolerant distinctions and timelines treated as provisional.
> - 2026 hardware snapshot appendix.
>
> **Reading paths** are thoughtfully provided (full linear journey, algorithms-first,
> hardware/control-focused, skeptical/frontier reader).
>
> ### Philosophical and Pedagogical Approach
> From BookDescription.md and sampled chapters, the book consistently delivers on its
> charter:
>
> - **Strengths in approach**: Explicitly contrasts classical vs. quantum limits, emphasizes
>   interference over "parallelism," distinguishes *quantum advantage* (theoretical) from
>   *practical utility* (hardware-constrained), and repeatedly flags moving-target numbers
>   and dequantization risks. It treats noise and error correction as central, not
>   afterthoughts. Chapter 1 ("Why Quantum Computing Exists") is a strong example — ~2,500
>   words of clear taxonomy of speedups, historical grounding (Feynman, Deutsch, Shor,
>   Grover), and sanity checks without overpromising.
> - **Chapter 16 ("Modern Algorithmic Frontier")** is particularly impressive for depth: it
>   unifies post-2015 developments (Trotter, LCU, block encodings, qubitization, QSP, QSVT)
>   with explicit circuit constructions, complexity scalings, resource estimates, and
>   engineering trade-offs. It includes warnings about numerical stability, large constants
>   in QSVT, and when classical methods suffice under realistic access models. This goes well
>   beyond standard introductory texts.
> - **Audience fit**: Assumes programming proficiency + mathematical maturity (linear
>   algebra, probability, complexity) but no prior QM. Self-check section exists. It
>   deliberately avoids "dumbing down," pop-science myths, and SDK-tutorial shallowness.
>
> **Tone**: Professional, precise, developer-oriented, and cautious. It positions QC as a
> difficult but real computational model with specific structural advantages and hard
> limitations.
>
> ### Quality Assurance and Process
> This is one of the most professionally documented solo projects I've seen:
>
> - Detailed **PROCESS.md** (status-promotion criteria, build instructions, decision log).
> - **STYLE.md** for notation and conventions.
> - **reviews/** and **factcheck/** directories (per-chapter claim verification with
>   verdicts/sources).
> - **archive/** for provenance (early drafts, superseded reviews, original plan).
> - **HISTORY.md**, **PROGRESS.md**, **SHA256SUMS**, **CITATION.cff**.
> - Scripts for TOC generation (`make toc`), mdBook build (`make book`), etc.
> - Dedicated docs on GitHub Markdown + MathJax bugs and workarounds, plus live render-test
>   matrix.
>
> All files are uniformly at *prereviewed*. This is a genuine strength for a draft, but the
> lack of external expert review or final fact-check is a clear gap for a technical work in a
> fast-moving field.
>
> ### Technical and Presentation Quality
> - **Math**: LaTeX in Markdown; renders natively on GitHub (with acknowledged bugs that the
>   author documents and works around). Better experience via `mdBook` + `mdbook-katex`
>   (stable pair recommended: mdbook 0.4.x + katex 0.9.x).
> - **Build**: Mature Makefile + toolchain for single HTML book output with proper math.
> - **Figures**: `figures-src/` exists (source assets).
> - **Code/Tooling**: Separate from the licensed manuscript; `examples/`, `scripts/`,
>   `tools/` present. The book itself appears conceptual/mathematical (circuits, resource
>   estimates, pseudocode) rather than full runnable SDK examples — consistent with its
>   anti-"SDK-tutorial shallowness" stance.
> - **Length/Depth**: Chapters appear substantive (Ch. 1 ~2,500 words; Ch. 16 advanced and
>   dense). Subsections are well-structured.
>
> ### Licensing and Accessibility
> - **Manuscript** (book/ + prose docs): **CC BY-NC-ND 4.0** — free to share with attribution
>   for non-commercial use; **no derivatives**; commercial use requires separate license from
>   the author.
> - **Code and tooling**: All rights reserved (unless separately stated).
> - **Strength**: Clear terms + CITATION.cff.
> - **Limitation**: ND clause restricts remixing, translations, or educational adaptations.
>   The generic repo name ("experiments") and branch structure reduce discoverability.
>
> ### Strengths
> - Exceptional breadth + modern depth in one coherent volume (especially Ch. 16,
>   hardware/control sections, claim-judging chapter, and engineering metrics).
> - Strong anti-hype discipline and developer intuition-building.
> - Outstanding process transparency and self-documentation.
> - Thoughtful reading paths and front/back matter (notation reference, gate appendices,
>   identities, glossary, suggested reading, 2026 snapshot).
> - Consistent internal quality bar.
>
> ### Weaknesses and Risks
> - **Solo authorship + review status**: Internal review is thorough, but lack of independent
>   expert review or final fact-check is a material gap for topics like hardware timelines,
>   QML claims, or dequantization edge cases.
> - **Visibility**: 0 stars after significant effort suggests limited discoverability or
>   marketing.
> - **NoDerivatives license**: May hinder adoption in courses, wikis, or collaborative notes.
> - **Hands-on elements**: Limited runnable code (by design). Developers wanting immediate
>   Qiskit/Cirq/PennyLane examples will need companion resources.
> - **Perishable content**: Hardware snapshot and specific numbers are flagged as moving
>   targets — appropriate, but still requires reader vigilance.
> - **Potential thin spots**: Some chapters (especially applications or adjacent models) may
>   be survey-like rather than deeply original; without external review, hard to judge
>   uniformly.
>
> ### Comparison to Existing Resources
> - Vs. **Nielsen & Chuang** (classic): More modern algorithms (QSVT etc.), stronger
>   engineering/hardware focus, better developer framing; less physics depth.
> - Vs. **Hidary** or applied SDK books: Far deeper conceptual model and modern frontier;
>   deliberately avoids tutorial shallowness.
> - Vs. popular intros (e.g., Bernhardt, Mermin): Much more rigorous and comprehensive;
>   targets a more mathematically mature audience.
> - **Unique value**: The combination of modern algorithmic unification, resource-aware
>   engineering perspective, explicit claim-evaluation guidance, and dequantization warnings
>   in one volume is rare.
>
> ### Overall Verdict and Recommendations
> This is a **high-quality, ambitious, and unusually mature draft** of a much-needed book for
> its target audience. It delivers on its promise of rigor, engineering orientation, and
> anti-hype better than most resources. The process infrastructure is impressive for a solo
> project. Sampled chapters (Ch. 1 and especially Ch. 16) show real depth and thoughtful
> caveats.
>
> **Current limitations** (review status, visibility, license, lack of companion code) are
> real but addressable. It is already usable and valuable as a reference/guide for
> experienced developers, computational scientists, or anyone wanting to move beyond
> pop-science or basic tutorials.
>
> **Recommendations**:
> - Prioritize external expert review (even targeted chapters) and move key files toward
>   *reviewed*/*final*.
> - Consider a companion examples repository or inline pseudocode/circuit libraries for
>   developers.
> - Explore a PDF/ePub export or dedicated site alongside the mdBook build.
> - Increase visibility (better repo description, README badges, cross-posts in relevant
>   communities) if the goal is wider adoption.
> - The 2026 hardware appendix is timely — consider a lightweight update mechanism or "as of"
>   dating.
>
> **Bottom line**: One of the stronger technical QC manuscripts I've encountered in open
> draft form. Highly recommended for its intended audience once the review pipeline advances
> and readers apply the in-text cautionary notes. It fills a genuine gap between shallow
> intros and heavyweight physics texts.

---

## Part B — Deep analysis and triage (2026-07-05)

### B.1 What kind of review this is — and is not

A **repo-level, reader-experience review**: structure, positioning, process, licensing,
presentation, with light sampling of two chapters (1 and 16). It contains **zero claim-level
technical findings** — no equation checked, no citation verified, no number contested — so it
contributes nothing to the `factcheck/` ledger and cannot advance any file past
`prereviewed`. Its value is of a different kind: it is the first evidence of how the
repository reads to someone who arrives cold, and an independent check on whether the
project's self-presentation communicates what it intends.

### B.2 Accuracy audit — how much did the reviewer actually verify?

Before using a review, this project's discipline is to check the reviewer. Every checkable
factual assertion in Part A was measured against the repository:

| Reviewer's assertion | Measured | Verdict |
|---|---|---|
| 278 commits on the branch | `git rev-list --count` = **278** | **Exact** — genuinely counted |
| 13 parts, ~48 files, 37 chapters | 13 parts, 48 files, 37 chapters | Exact |
| `prereviewed` semantics (internal review done; expert review and fact-check pending) | PROCESS.md criteria | **Exact restatement** — the P2 wording communicates as intended |
| Ch. 16 warns about numerical stability and large QSVT constants | §16.7: "naive root-finding is numerically unstable for $d \gtrsim 10^3$ … the constants are sometimes large" | **Verbatim match** — the reviewer read Ch. 16, not a summary of it |
| Dequantization warnings present | 7 mentions in Ch. 16 alone | Confirmed |
| Ch. 1 "~2,500 words" | ~4,150 words (raw; ~3,800 prose) | **Understated ~40%** — impression, not measurement |
| "0 stars and 0 forks" | not verifiable from this session | Unverified; plausible |
| Book "appears conceptual … rather than full runnable SDK examples" | **False as stated**: `examples/` holds 4 runnable programs wired into Ch. 14, 15, 24, 26 and CI-checked by `make check-examples` | **Miss — but diagnostic** (see B.3, finding 1) |
| License split (CC BY-NC-ND manuscript / all-rights code), CITATION.cff, mdbook 0.4+0.9 pair | matches LICENSE/README | Exact |

Calibration conclusion: the reviewer did real reading (the commit count and §16.7 match rule
out a skim), so its *qualitative* judgments deserve moderate weight; its unmeasured numbers
do not. The one outright miss is more useful than the praise — see below.

### B.3 Signal extraction — what the project can use

**Finding 1 (new, actionable): the README does not surface `examples/`.** A demonstrably
careful external reader concluded the book has no runnable code. `grep -c examples README.md`
= 0: the Project-documents list omits the directory and the prose never mentions
`make check-examples`. The reviewer's error is the README's error. *Action: add `examples/`
to the README (one line in Project documents + a sentence noting the four runnable,
CI-checked programs embedded in Ch. 14/15/24/26).* Effort S; genuine reader-facing value.

**Finding 2 (useful refinement): "external expert review, even targeted chapters".** The
project's `reviewed` gate was implicitly monolithic. The per-chapter framing is better and
the ladder already supports it (status is per-file). Proposed targeting, by wrong-in-public
risk: Ch. 16 (QSVT), Ch. 19 (QEC), Ch. 20–22 (hardware/control/metrics), Ch. 30 (QML), plus
one applications chapter (28 or 29) as a probe against Finding 4. *Action: one sentence in
PROCESS.md's promotion criteria naming targeted per-chapter expert review as the intended
mechanism.* Effort S.

**Finding 3 (decision point, defer to publication): the ND-license adoption cost.** The
reviewer is right that NoDerivatives blocks course adaptations, translations, and
collaborative notes; that is partly the point (integrity of a verified text), but the cost is
real. Cheapest mitigation when the book publishes as its own repository: keep ND and add one
sentence to LICENSE/README stating that educational-use and translation licenses are
available from the author on request. *No action now; recorded for the publication checklist.*

**Finding 4 (weak signal, fold into Finding 2): possible thinness in applications/adjacent
models.** Explicitly hedged by the reviewer ("hard to judge uniformly") and unverified — but
it points where the internal review was least effusive. Cheap test: include one Part XI
chapter in the first targeted expert-review batch.

**Corroborations (no action; they validate existing decisions):** the visibility critique is
exactly what the planned separate-repository publication addresses; PDF/ePub is already in
HISTORY's outlook; "as-of dating" for the hardware appendix already exists (Moving-target
banner) and its refresh is proposal P3; the comparative positioning paragraph (vs. Nielsen &
Chuang, Hidary, Mermin — "fills a genuine gap") is independent confirmation of the
BookDescription charter and is worth keeping as testimony; and the correct parsing of
`prereviewed` validates the P2 wording.

**Explicitly not usable:** status promotion (not an expert review); factcheck credit (no
claims verified); the "0 stars" datum (unverified, and irrelevant under the current
low-profile-by-design posture); the Ch. 1 word count (wrong).

### B.4 Disposition of the reviewer's five recommendations

| Reviewer recommendation | Disposition |
|---|---|
| Prioritize external expert review, even targeted chapters | **Adopt the refinement** (Finding 2); the priority itself was already the `reviewed` gate |
| Companion examples repo / inline circuit libraries | **Partially moot** (examples exist — Finding 1 fixes the visibility); *extending* examples is already in HISTORY's outlook; a separate companion repo is a publication-time decision |
| PDF/ePub export or dedicated site | Already planned (HISTORY outlook: mdBook / GitHub Pages / EPUB reopen at publication) — no new action |
| Increase visibility (repo description, badges, cross-posting) | **Defer by design** — the author's stated plan is completeness first, then a separate public repository |
| Lightweight update mechanism / as-of dating for the hardware appendix | Already exists (dated Moving-target banner + wholesale-replacement policy); the pending action is P3's July refresh — no new mechanism needed |

### B.5 Recommended actions (summary)

1. **R1 (S, do now):** README — surface `examples/` and `make check-examples`. Closes the
   one demonstrated reader-facing gap this review found.
2. **R2 (S, do now):** PROCESS.md — name *targeted per-chapter expert review* as the intended
   path to `reviewed`, with the initial target list (16, 19, 20–22, 30, + one of 28/29).
3. **R3 (defer to publication checklist):** ND-license mitigation sentence (educational/
   translation licenses on request) when the book moves to its own repository.
4. **R4 (no action):** everything in the corroboration list — the review independently
   validates decisions already made; keep this file as the record.

---

*Execution note (2026-07-05, insert-only): R1 and R2 applied in the commit that adds this
line — README now surfaces `examples/` in both the reading section and the Project-documents
list, and PROCESS.md's `reviewed` criterion names targeted per-chapter expert review with the
initial chapter list. R3 remains on the publication checklist; R4 requires no action.*

---

## Part C — Continuation received 2026-07-05: "Systematic Review of the Book Body Files" (verbatim)

> **Systematic Review of the Book Body Files**
>
> I have conducted a structured, file-by-file review of the entire manuscript body (the 48
> Markdown files under `book/`).
>
> **Approach and caveats**: A line-by-line verbatim analysis of every paragraph across ~48
> files would produce an impractically long output. Instead, I used direct content access
> (raw Markdown + rendered views) on representative files spanning front matter, early
> foundations, core technical chapters, advanced algorithms, hardware/engineering sections,
> applications, and the concluding perspective chapters. I cross-referenced with the full
> TOC.md, STYLE.md, PROCESS.md, PROGRESS.md, and BookDescription.md.
>
> **Key observations from sampling**:
> - Consistent high quality in structure, mathematical rigor (LaTeX), sectioning,
>   cross-references, and engineering intuition.
> - Strong alignment with the stated philosophy (anti-hype, developer-focused, no
>   pop-science, noise/QEC central, modern frontier included).
> - All files are at uniform *prereviewed* status.
> - Minor recurring notes: some perishable numbers/hardware claims need external
>   verification; no-cloning theorem could be more explicit in relevant places; limited
>   runnable code (intentional).
>
> Below are the reviews **one by one**, grouped logically for readability while addressing
> every file.
>
> ### Front Matter
>
> **book/00-front-matter/00-preface.md**
> Excellent. ~3,500–4,000 words. Clearly articulates why the book exists (gap between physics
> texts and shallow tutorials), defines the target reader precisely, sets expectations
> (rigorous but practical, NISQ-aware, 2026 snapshot with moving-target warnings), and
> provides multiple reading paths. Candid tone about field limitations and hardware reality.
> Strong alignment with philosophy. Includes notes on conventions (e.g., qubit indexing
> compatibility with Qiskit) and living-document status.
> **Strengths**: Sets perfect tone and guardrails.
> **Notes**: Highly recommended starting point. No major weaknesses.
>
> **book/00-front-matter/01-background-and-self-check.md**
> Very strong calibration tool. Lists required skills (programming/Python/NumPy, mathematical
> maturity, linear algebra, probability/info theory basics, complexity) with sample problems
> + immediate answers/hints. Recommended but not required skills (classical physics, DSP,
> etc.) are flagged helpfully. Pragmatic decision rule: if majority of problems in a section
> are unreachable → pause and study the referenced text (e.g., Strang/Axler).
> **Strengths**: Empowers self-assessment without gatekeeping; aligns math bar perfectly for
> the audience.
> **Notes**: Excellent design.
>
> **book/00-front-matter/02-notation-and-conventions.md**
> Solid reference. Covers Dirac notation, matrix/tensor product conventions, circuit
> notation, probability/measurement notation, boxed callouts, and cross-reference style.
> Explicitly addresses common pitfalls (e.g., qubit ordering/endianness differences across
> SDKs).
> **Strengths**: Prevents early friction; consistent with STYLE.md.
> **Notes**: Essential for smooth reading.
>
> ### Historical Prelude
>
> **book/part-00-historical-prelude/00-historical-prelude.md**
> Standalone narrative from early quantum ideas to modern qubits/computing. Provides context
> without being required for technical chapters.
> **Strengths**: Optional but useful for orientation; maintains anti-hype tone.
> **Notes**: Good separation from core technical content.
>
> ### Part I — Orientation and Framing
>
> **book/part-01-orientation/01-why-quantum-computing-exists.md** (sampled)
> Strong motivational chapter. Taxonomy of where quantum helps (exponential for
> simulation/Shor, quadratic for Grover, speculative elsewhere), clear distinction between
> advantage and practical utility, NISQ vs. early fault-tolerant framing, and warnings on
> overclaimed speedups. ~2,500 words, well-sectioned.
> **Strengths**: Excellent anti-hype foundation with engineering realism.
> **Notes**: Minor speculation on timelines (appropriately caveated).
>
> **book/part-01-orientation/02-classical-to-quantum-contrast.md**
> Expected to contrast state spaces, reversibility, measurement, interference vs. classical
> probability. Aligns with philosophy of transferring and breaking classical intuition.
> **Assessment**: Likely strong given position and overall consistency.
>
> **book/part-01-orientation/03-physical-intuition.md**
> Builds operational intuition from postulates without full physics detour.
> **Assessment**: Fits the "no physics-first" approach well.
>
> ### Part II — Mathematical and Physical Formalism
>
> **book/part-02-formalism/04-mathematical-background.md**
> Bridges assumed linear algebra/probability to quantum-specific needs (operators, inner
> products, tensor products, etc.).
> **Assessment**: Critical bridge chapter; expected to be rigorous and self-contained per
> self-check design.
>
> **book/part-02-formalism/05-postulates.md**
> Presents the postulates of quantum mechanics reframed for computation.
> **Assessment**: Core foundation; should emphasize operational/computational consequences.
>
> ### Part III — Qubits and Multi-Qubit Systems
>
> **book/part-03-qubits/06-the-qubit.md**
> Standard but developer-oriented introduction to single qubit (Bloch sphere, gates as
> rotations, measurement).
> **Assessment**: Expected high clarity and circuit intuition.
>
> **book/part-03-qubits/07-multiple-qubits-and-entanglement.md** (sampled)
> Excellent. High rigor on tensor products, Schmidt decomposition, partial trace,
> entanglement entropy (pure & mixed), Bell states/CHSH, no-signalling, and resource
> accounting (ebits in teleportation/superdense coding). Strong engineering notes on state
> preparation circuits, fragility (GHZ vs W), simulation hardness, and qubit ordering
> conventions.
> **Strengths**: Bridges theory to protocols and practical warnings exceptionally well.
> Minor note: no-cloning could be more explicit.
> **Overall**: One of the stronger early technical chapters.
>
> ### Part IV — Gates, Circuits, and Computational Phenomena
>
> **book/part-04-gates-and-circuits/08-quantum-gates.md**
> Covers standard gates, universality, decompositions, with engineering focus (circuit
> depth, T-count precursors).
> **Assessment**: Consistent style expected.
>
> **book/part-04-gates-and-circuits/09-quantum-circuits.md**
> Circuit model, composition, measurement, basic algorithms framing.
> **Assessment**: Solid foundation.
>
> **book/part-04-gates-and-circuits/10-core-quantum-phenomena.md**
> Interference, superposition in computational terms, phase kickback, etc.
> **Assessment**: Key for intuition-building.
>
> ### Part V — Measurement and Quantum Information
>
> **book/part-05-measurement-and-information/11-measurement-theory.md**
> Measurement postulates, POVMs, collapse, information gain.
> **Assessment**: Important for later algorithms and error correction.
>
> **book/part-05-measurement-and-information/12-quantum-information-theory.md**
> Entropy, mutual information, Holevo, basic channel theory.
> **Assessment**: Bridges to complexity and applications; expected rigor.
>
> ### Part VI — Algorithms
>
> **book/part-06-algorithms/13-quantum-algorithms-mindset.md**
> Mindset shift, oracles, query complexity, black-box vs. structured problems.
> **Assessment**: Good framing chapter.
>
> **book/part-06-algorithms/14-foundational-algorithms.md**
> Deutsch-Jozsa, Bernstein-Vazirani, Simon's.
> **Assessment**: Classic foundations with modern caveats.
>
> **book/part-06-algorithms/15-landmark-quantum-algorithms.md**
> Grover, Shor (and variants), phase estimation, QFT.
> **Assessment**: Core landmark coverage expected.
>
> **book/part-06-algorithms/16-modern-algorithmic-frontier.md** (sampled earlier)
> Outstanding. Unifies post-2015 developments via block encodings, LCU, qubitization,
> QSP/QSVT. Excellent resource accounting (T-count, ancilla, subnormalization α),
> dequantization warnings, NISQ vs FT distinctions, and engineering trade-offs.
> **Strengths**: Goes well beyond standard intros; high value for developers wanting current
> frontier.
> **Overall**: Standout chapter.
>
> ### Part VII — Complexity Theory
>
> **book/part-07-complexity/17-complexity-theory.md**
> BQP, oracle separations, local Hamiltonian problem, dequantization implications,
> relationship to P/NP.
> **Assessment**: Important for realistic expectations; should tie back to Ch. 36.
>
> ### Part VIII — Noise, Errors, and Fault Tolerance
>
> **book/part-08-noise-and-qec/18-noise-decoherence-and-errors.md**
> Physical noise sources, decoherence models, error rates, characterization.
> **Assessment**: Central per philosophy; expected strong engineering metrics.
>
> **book/part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md**
> Stabilizer codes, surface code, thresholds, logical qubits, magic states, overheads.
> **Assessment**: Critical for realistic timelines; should include resource estimates.
>
> ### Part IX — Hardware, Control, and Software
>
> **book/part-09-hardware-and-software/20-quantum-hardware-platforms.md**
> Superconducting, trapped ion, photonic, neutral atom, etc., with pros/cons and metrics.
> **Assessment**: Survey with engineering comparisons.
>
> **book/part-09-hardware-and-software/21-quantum-control-and-electronics.md**
> Control electronics, cryogenics, wiring, scaling bottlenecks.
> **Assessment**: Strong engineering focus expected.
>
> **book/part-09-hardware-and-software/22-hardware-engineering-metrics.md**
> Quantum volume, algorithmic qubits, fidelity, connectivity, T1/T2, gate error rates, etc.
> **Assessment**: Highly valuable for developers evaluating hardware claims.
>
> **book/part-09-hardware-and-software/23-quantum-programming-compilation-and-tooling.md**
> SDKs (high-level), compilers, optimization, IRs, error mitigation.
> **Assessment**: Practical tooling overview (avoids shallow tutorial trap).
>
> **book/part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md**
> Tensor networks, statevector, stabilizer simulation, when classical wins.
> **Assessment**: Important reality check; ties to dequantization.
>
> ### Part X — Practice and Era
>
> **book/part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md**
> Current capabilities, roadmaps, utility vs supremacy framing, early FT projections.
> **Assessment**: Timely (with 2026 context); should heavily reference Ch. 36.
>
> **book/part-10-practice-and-era/26-practical-access-and-hands-on-work.md**
> Cloud access, local simulators, experiment design, cost/reproducibility.
> **Assessment**: Developer-practical chapter.
>
> ### Part XI — Applications
>
> **book/part-11-applications/27-cryptography-and-security.md**
> Shor impact, post-quantum crypto, QKD, quantum random numbers.
> **Assessment**: Balanced view expected (not overhyping timelines).
>
> **book/part-11-applications/28-scientific-computing-and-physical-simulation.md**
> Hamiltonian simulation, quantum chemistry, materials.
> **Assessment**: Core application area; resource estimates important.
>
> **book/part-11-applications/29-optimization-finance-and-industrial.md**
> QAOA, VQE variants, quadratic speedups, finance use cases, industrial roadmaps.
> **Assessment**: Should apply Ch. 36 red flags heavily.
>
> **book/part-11-applications/30-quantum-machine-learning.md**
> QML approaches, dequantization impact, data loading issues, realistic expectations.
> **Assessment**: Critical chapter given hype in this area.
>
> **book/part-11-applications/31-quantum-sensing-metrology-and-tomography.md**
> Sensing advantages, metrology protocols, tomography methods.
> **Assessment**: More mature application area; good contrast to computing hype.
>
> ### Part XII — Adjacent Models and Communication
>
> **book/part-12-adjacent-models/32-adjacent-computational-models.md**
> Quantum annealing, adiabatic QC, boson sampling, measurement-based, etc.
> **Assessment**: Broadens perspective without overclaiming.
>
> **book/part-12-adjacent-models/33-quantum-communication-and-networking.md**
> QKD networks, quantum internet, repeaters, entanglement distribution.
> **Assessment**: Forward-looking with engineering constraints.
>
> ### Part XIII — Engineering Perspective, Epistemics, and Direction
>
> **book/part-13-perspective-and-direction/34-bridging-to-familiar-engineering-ideas.md**
> Analogies to control theory, signal processing, linear systems, spectral methods.
> **Assessment**: Core to the book's unique engineering bridge.
>
> **book/part-13-perspective-and-direction/35-interpretational-and-conceptual-pitfalls.md**
> Common misconceptions (parallel universes, "spooky action", measurement myths, etc.).
> **Assessment**: Valuable complement to Ch. 36.
>
> **book/part-13-perspective-and-direction/36-how-to-judge-claims.md** (sampled)
> **Outstanding and unique**. Provides concrete red flags, reading checklists for
> hardware/algorithm/benchmark/vendor papers, dequantization framework, real-world examples
> (Sycamore, Schnorr claims, IBM utility experiments, boson sampling), and practical
> developer advice (reproduce cheaply, triangulate sources, wait for community response).
> **Strengths**: One of the most valuable chapters in the entire book — directly fulfills
> the "teach judgment" promise.
> **Overall**: Essential reading; major differentiator.
>
> **book/part-13-perspective-and-direction/37-endgame.md**
> Synthesizes tractable problems, remaining bottlenecks, research directions, and realistic
> outlook.
> **Assessment**: Strong closing chapter expected.
>
> ### Back Matter
>
> **book/99-back-matter/appendix-a-notation-reference.md**
> Quick reference for Dirac, matrix, tensor, measurement, circuit, and probability notation.
> **Strengths**: Useful companion to Ch. 2 and STYLE.md.
>
> **book/99-back-matter/appendix-b-common-gates.md**
> Matrices for Pauli, Hadamard, phase, rotation, CNOT, CZ, SWAP, Toffoli, controlled gates.
> **Strengths**: Practical reference.
>
> **book/99-back-matter/appendix-c-identities-and-decompositions.md**
> Pauli algebra, tensor rules, commutation, gate identities, circuit decompositions, basis
> changes.
> **Strengths**: Essential for circuit work and Ch. 8–10.
>
> **book/99-back-matter/appendix-d-suggested-reading.md**
> Curated lists by topic (introductory, algorithms, QIT, QEC, hardware, etc.).
> **Strengths**: Good for further study.
>
> **book/99-back-matter/appendix-e-glossary.md**
> Terminology reference.
> **Strengths**: Supports accessibility.
>
> **book/99-back-matter/appendix-f-hardware-snapshot-2026.md**
> Current (as of 2026) hardware metrics, platforms, roadmaps.
> **Strengths**: Timely; appropriately caveated as snapshot.
> **Notes**: Will date; external verification recommended for specific numbers.
>
> **book/99-back-matter/index.md**
> Full index.
> **Strengths**: Supports reference use.
>
> ### Overall Synthesis
>
> **Strengths across the body**:
> - Consistent high rigor, clear structure, and engineering intuition.
> - Excellent modern coverage (especially Ch. 16 and Ch. 36).
> - Strong anti-hype discipline and practical warnings.
> - Outstanding front/back matter and process transparency.
> - Developer-centric without sacrificing depth.
>
> **Recurring minor notes**:
> - External expert review still needed for factual/perishable claims (especially hardware,
>   applications, timelines).
> - Some chapters (applications, adjacent models) are more survey-oriented.
> - Limited inline runnable code (by design).
>
> **Verdict**: The manuscript body is of **high and consistent quality** — one of the
> stronger technical QC drafts available openly. It successfully delivers a rigorous,
> engineering-oriented guide for its target audience. The standout chapters (16, 36, 7,
> preface, self-check) elevate it significantly.
>
> **Primary remaining recommendation**: Advance selected chapters through independent expert
> review and final fact-check, especially Ch. 19–25, 27–31, and Appendix F.

---

## Part D — Triage of the Part C continuation (2026-07-05)

### D.1 Coverage calibration: read vs. extrapolated

The continuation is titled "Systematic Review of the Book Body Files" and presents 48
per-file entries, but its own language separates two very different kinds of entry. Entries
with concrete, checkable specifics indicate genuine reading; entries hedged with
"Expected to…", "Assessment: Likely strong…", "should include…" are **predictions from the
table of contents**, not reviews. Measured against the manuscript:

- **Genuinely read (~9–10 of 48):** preface, self-check, notation file, Prelude (lightly),
  Ch. 1, Ch. 7, Ch. 16, Ch. 36, and skims of the appendices. Verification: the Ch. 7 entry's
  specifics all check out (GHZ-vs-W fragility under tracing — §7.6 says exactly this,
  including the SLOCC-class point; Schmidt appears 8×; teleportation/superdense resource
  accounting in §7.12); the Ch. 36 entry's example list (Sycamore, Schnorr, IBM utility)
  matches the chapter's content; the preface entry's Qiskit-conventions note is real
  (6 mentions). Word-count estimates remain impressionistic (preface: actual 3,427 vs.
  "~3,500–4,000"; Ch. 1 repeated at "~2,500" vs. ~4,150 actual).
- **Extrapolated (~38 of 48):** every other entry describes what the chapter *should*
  contain given its title, in explicitly hedged language. These entries are not evidence
  about the manuscript and must not be cited as review coverage.

**Standing caution for this file:** Part C may not be cited as a body review. It is a
sampled reader-experience review of ~10 files plus a plausibility scan of the TOC. The
per-file "Assessment" entries carry no verification weight.

### D.2 The one verified new finding — Ch. 7 no-cloning gap (R5)

The continuation's only concrete content suggestion — "no-cloning could be more explicit"
in Ch. 7 — **verifies as correct**: `grep` finds zero occurrences of "cloning" anywhere in
`07-multiple-qubits-and-entanglement.md`, although §7.12 presents teleportation and
superdense coding, where the theorem is load-bearing (teleportation *must* destroy Alice's
original precisely because copying is forbidden — the protocol moves the state, never
copies it). The theorem itself lives in Chapter 5 (Wootters–Zurek/Dieks statement, with the
known-state caveat), so the fix is a signpost, exactly matching STYLE.md's cross-reference
policy. **Recommended edit (R5):** one sentence at the end of §7.12's teleportation
paragraph, e.g.:

> "Note that Alice's original is necessarily destroyed — her Bell measurement leaves her
> qubits with no trace of $|\psi\rangle$ — which is exactly what the no-cloning theorem
> (Chapter 5) demands: teleportation *moves* a state; nothing in quantum mechanics can
> *copy* an unknown one."

### D.3 Everything else in Part C

- **The targeted-review chapter list** ("especially Ch. 19–25, 27–31, and Appendix F") is a
  perishability-ordered list — it corroborates the factcheck programme's Tier-C analysis
  (Ch. 20–26, 27, App. F) rather than adding to it, and conflates expert review with
  fact-check; the project's two-track treatment (PROCESS.md expert-review targets;
  factcheck Tier-C batch) already covers its union.
- **"Standout chapters: 16, 36, 7, preface, self-check"** — note these are exactly the
  files the reviewer read. The praise is genuine but the sample is the praise-set; it says
  nothing comparative about the other 38 files.
- **Recurring notes** (perishables need verification; applications survey-like; limited
  runnable code) — all already triaged in Part B (Findings 1, 4, and the P1/P3 programmes).

### D.4 Updated recommendations

- **R5 (S, new):** add the §7.12 no-cloning signpost sentence above. The single change this
  continuation earns.
- R1/R2 — already applied (see execution note above). R3 — unchanged, publication
  checklist. R4 — unchanged.
- **R6 (process note):** when quoting external reviews of this project, quote Parts A/C
  *with* the calibration in B.2/D.1 — the review's coverage claims exceed its coverage.
