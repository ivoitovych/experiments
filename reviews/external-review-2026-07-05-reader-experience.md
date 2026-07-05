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
