# Cold-Reader Survivability Triage — Whole-Book Pass (F1)

**Date:** 2026-07-09
**Method:** One Sonnet-5 agent per file (per the operating rule from
[experiment-2026-07-09-triage-model-comparison.md](experiment-2026-07-09-triage-model-comparison.md)),
identical rubric per file: five 0–3 dimensions (D1 first-screen composition, D2 opening
reader-debt, D3 first-use dependency violations *net of reading order* — notation introduced
in an earlier file is fair game, D4 table/prose overload, D5 hard-definition-before-
operational-meaning), Chapter 1 as the GREEN anchor, structured output with a **verbatim
quote required per finding, machine-checked against the file** (findings whose quotes don't
anchor are discarded as hallucinated). Run in chunks of 5 agents with a token meter per
chunk. The Prelude row reuses the experiment's verified Sonnet result; the notation file's
agent failed structured-output validation and its row is recovered from the first run's
journal.

**Cost:** ~1.94M subagent tokens (≈645k output), 47 agents, ~60 min wall.
**Verification:** 131 findings returned; 126 quote-anchored automatically, 4 more verified
manually (LaTeX-escaping artifacts in the matcher), 1 discarded as paraphrase → **136
verified findings across 47 files** (incl. Prelude's 3 from the experiment).

## Headline

**No RED anywhere.** 32 YELLOW, 15 GREEN. The reviewer-feared scenario — "the same disease
in later chapters" — did not materialize as anything requiring restructuring: not a single
file hit the dependency-inversion / reader-killing-pages bar. The YELLOW mass is
concentrated exactly where the systemic analysis predicted: the theory spine (Ch. 2–5,
9–17) scores 7–9 on front-loaded openings and residual first-use debt, while the
hardware/practice chapters (21, 22, 26, 27, 29, 33) and the entire back matter come out
GREEN. Chapter 1 (the anchor) scored GREEN as expected — the calibration held.

Reading of the distribution: the book's *openings* carry a consistent moderate tax (D1/D2
≈ 2 on most YELLOW files — the house "intro + how-to-read" pattern read cold), and the
theory chapters carry genuine but small D3 debt (a handful of one-sentence gloss fixes per
file, in the mold of the Hadamard fix). Nothing needs surgery; ~30 files need a
one-session-each pass of gloss insertions and opening tightening, and half the book needs
nothing at all.

## Triage table (reading order)

| # | File | Verdict | D1 | D2 | D3 | D4 | D5 | Σ/15 | Findings (verified) |
|---|------|---------|----|----|----|----|----|------|---------------------|
| 1 | 00-preface | **YELLOW** | 1 | 1 | 2 | 1 | 0 | 5 | 3 |
| 2 | 01-background-and-self-check | **YELLOW** | 2 | 1 | 2 | 1 | 0 | 6 | 2 |
| 3 | 02-notation-and-conventions | **YELLOW** | 2 | 2 | 2 | 1 | 1 | 8 | 3 |
| 4 | 00-historical-prelude | **YELLOW** | 2 | 2 | 2 | 2 | 1 | 9 | 3 |
| 5 | 01-why-quantum-computing-exists | **GREEN** | 1 | 1 | 1 | 1 | 0 | 4 | 3 |
| 6 | 02-classical-to-quantum-contrast | **YELLOW** | 2 | 2 | 2 | 1 | 1 | 8 | 3 |
| 7 | 03-physical-intuition | **YELLOW** | 2 | 2 | 2 | 1 | 1 | 8 | 3 |
| 8 | 04-mathematical-background | **YELLOW** | 2 | 2 | 2 | 1 | 1 | 8 | 3 |
| 9 | 05-postulates | **YELLOW** | 2 | 2 | 2 | 1 | 1 | 8 | 3 |
| 10 | 06-the-qubit | **GREEN** | 1 | 1 | 1 | 0 | 1 | 4 | 3 |
| 11 | 07-multiple-qubits-and-entanglement | **YELLOW** | 2 | 2 | 2 | 0 | 1 | 7 | 3 |
| 12 | 08-quantum-gates | **YELLOW** | 2 | 2 | 1 | 0 | 2 | 7 | 3 |
| 13 | 09-quantum-circuits | **YELLOW** | 2 | 2 | 2 | 1 | 1 | 8 | 3 |
| 14 | 10-core-quantum-phenomena | **YELLOW** | 2 | 2 | 2 | 0 | 1 | 7 | 3 |
| 15 | 11-measurement-theory | **YELLOW** | 2 | 1 | 1 | 1 | 1 | 6 | 3 |
| 16 | 12-quantum-information-theory | **YELLOW** | 2 | 2 | 1 | 1 | 2 | 8 | 3 |
| 17 | 14-foundational-algorithms | **YELLOW** | 1 | 1 | 1 | 0 | 2 | 5 | 3 |
| 18 | 15-landmark-quantum-algorithms | **YELLOW** | 2 | 2 | 1 | 1 | 2 | 8 | 3 |
| 19 | 16-modern-algorithmic-frontier | **YELLOW** | 2 | 2 | 1 | 2 | 2 | 9 | 4 |
| 20 | 17-complexity-theory | **YELLOW** | 2 | 2 | 2 | 0 | 1 | 7 | 3 |
| 21 | 18-noise-decoherence-and-errors | **YELLOW** | 2 | 2 | 1 | 1 | 1 | 7 | 3 |
| 22 | 19-quantum-error-correction-and-fault-tolerance | **YELLOW** | 1 | 1 | 1 | 0 | 1 | 4 | 3 |
| 23 | 20-quantum-hardware-platforms | **YELLOW** | 1 | 1 | 1 | 1 | 0 | 4 | 3 |
| 24 | 21-quantum-control-and-electronics | **GREEN** | 1 | 1 | 0 | 0 | 1 | 3 | 3 |
| 25 | 22-hardware-engineering-metrics | **GREEN** | 1 | 1 | 2 | 0 | 1 | 5 | 3 |
| 26 | 23-quantum-programming-compilation-and-tooling | **YELLOW** | 1 | 1 | 2 | 1 | 0 | 5 | 3 |
| 27 | 24-classical-simulation-of-quantum-systems | **YELLOW** | 2 | 2 | 1 | 1 | 1 | 7 | 3 |
| 28 | 25-nisq-and-early-fault-tolerant-era | **YELLOW** | 1 | 2 | 2 | 1 | 1 | 7 | 3 |
| 29 | 26-practical-access-and-hands-on-work | **GREEN** | 1 | 1 | 1 | 0 | 0 | 3 | 3 |
| 30 | 27-cryptography-and-security | **GREEN** | 1 | 0 | 1 | 0 | 0 | 2 | 3 |
| 31 | 28-scientific-computing-and-physical-simulation | **YELLOW** | 2 | 1 | 2 | 0 | 1 | 6 | 3 |
| 32 | 29-optimization-finance-and-industrial | **GREEN** | 1 | 1 | 1 | 0 | 1 | 4 | 3 |
| 33 | 30-quantum-machine-learning | **YELLOW** | 2 | 2 | 2 | 1 | 0 | 7 | 3 |
| 34 | 31-quantum-sensing-metrology-and-tomography | **YELLOW** | 1 | 1 | 2 | 0 | 1 | 5 | 3 |
| 35 | 32-adjacent-computational-models | **YELLOW** | 1 | 1 | 1 | 1 | 0 | 4 | 3 |
| 36 | 33-quantum-communication-and-networking | **GREEN** | 1 | 1 | 1 | 0 | 0 | 3 | 3 |
| 37 | 34-bridging-to-familiar-engineering-ideas | **YELLOW** | 1 | 1 | 1 | 1 | 0 | 4 | 3 |
| 38 | 35-interpretational-and-conceptual-pitfalls | **YELLOW** | 1 | 2 | 2 | 1 | 1 | 7 | 3 |
| 39 | 36-how-to-judge-claims | **YELLOW** | 2 | 2 | 1 | 1 | 0 | 6 | 3 |
| 40 | 37-endgame | **YELLOW** | 3 | 2 | 0 | 2 | 0 | 7 | 3 |
| 41 | appendix-a-notation-reference | **GREEN** | 0 | 1 | 1 | 1 | 0 | 3 | 3 |
| 42 | appendix-b-common-gates | **GREEN** | 1 | 1 | 1 | 1 | 0 | 4 | 3 |
| 43 | appendix-c-identities-and-decompositions | **GREEN** | 0 | 0 | 1 | 1 | 0 | 2 | 2 |
| 44 | appendix-d-suggested-reading | **GREEN** | 0 | 1 | 1 | 1 | 0 | 3 | 3 |
| 45 | appendix-e-glossary | **GREEN** | 1 | 1 | 0 | 1 | 0 | 3 | 3 |
| 46 | appendix-f-hardware-snapshot-2026 | **GREEN** | 1 | 1 | 0 | 0 | 0 | 2 | 2 |
| 47 | index | **GREEN** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## Verified findings by file (reading order)

### book/00-front-matter/00-preface.md — YELLOW (5/15)
- [line 37] The term of art "NISQ" is used without any gloss or forward pointer, and is never defined anywhere in the file.
  - *fix:* Add a brief inline gloss on first use, e.g. "NISQ-era (noisy intermediate-scale quantum) practice", or an explicit forward pointer to where NISQ is defined.
- [line 337] The CNOT gate and the Pauli-X-based shorthand diag(I, X) are used as if already known, with no operational gloss and only a generic (not per-term) forward pointer to Chapter 4.
  - *fix:* Either gloss CNOT/X in one clause here ("CNOT, the controlled-NOT gate") or explicitly flag this whole paragraph as forward-referencing material to be understood after Chapter 4.
- [line 26] Four undefined technical nouns are piled in a list in the opening ~700 words, adding abstract-noun debt before any of them is grounded.
  - *fix:* Replace the list with one concrete instance (e.g., a one-line teaser about what unitarity rules out) or move the list later after motivation is established.

### book/00-front-matter/01-background-and-self-check.md — YELLOW (6/15)
- [line 77] Sample problem SC.1.2 requires the reader to parse bra-ket notation for a two-qubit state 'from memory', but ket notation is never introduced anywhere earlier in the reading order (Preface, or this file) — only glossed retroactively in the answer with a forward pointer to Chapter 4 §4.2.
  - *fix:* Either gloss ket notation inline before the problem ('using Dirac/ket notation |b> for basis state b, introduced fully in Ch.4 §4.2') or replace the problem with a plain-vector version that doesn't require pre-knowledge of an undefined notation.
- [line 161] The term 'Pauli X matrix' is used as if already known in the SC.3.1 answer, but the Pauli-X matrix is not actually defined (with its matrix entries) until Sample problem SC.3.3, two problems later.
  - *fix:* Either move the explicit Pauli-X/Z definitions from SC.3.3 up before this first mention, or drop the aside connecting A to Pauli X here and save it until after X has been defined.

### book/00-front-matter/02-notation-and-conventions.md — YELLOW (8/15)
- [line 71] The symbol H is used for the Hamiltonian without ever naming or glossing it, and it silently collides with the Hadamard gate H defined 87 lines later with no disambiguation note (unlike the chapter's own explicit disambiguation of σ and ω).
  - *fix:* Add an inline gloss ("H is the Hamiltonian, formalized in Chapter 5") here and a one-line disambiguation note where Hadamard H is introduced at line 158, matching the treatment given to σ and ω.
- [line 94] Ket notation ($|0\rangle$, $|1\rangle$) is used in the N.1 Greek-letter list before Dirac/ket notation is formally introduced in N.3 (line 206), an in-file forward reference.
  - *fix:* Add a forward pointer ("ket notation defined in §N.3 below") next to the example, or move this example after N.3.
- [line 101] Pauli operators X, Y, Z are named and used as a vector in N.1 before the Pauli matrices are formally given with their matrix forms in N.2 (lines 152-154).
  - *fix:* Add "(matrices given in N.2 below)" at first mention, or reorder so the gate-matrix definitions precede the Greek-letter role list.

### book/part-00-historical-prelude/00-historical-prelude.md — YELLOW (9/15)
- [line 7] Opening interleaves meta blocks around the thesis; real narrative starts §0.1
  - *fix:* largely addressed by the 07-09 restructure; residual ~320w is the deliberate contract
- [line 181] no-cloning used 84 lines before its §0.10 definition, no pointer at first use
  - *fix:* add 4-6 word gloss or forward pointer at line 181
- [line 332] phase kickback appears only as an undefined table label
  - *fix:* add a one-line gloss or drop the label for prose

### book/part-01-orientation/01-why-quantum-computing-exists.md — GREEN (4/15)
- [line 33] BQP is used as a load-bearing term of art with no inline gloss and no explicit forward pointer defining what the class means.
  - *fix:* Add a short parenthetical gloss (e.g. "BQP, the class of problems a quantum computer solves efficiently") or point explicitly to Chapter 17 for the definition before using the symbol.
- [line 31] Three quantum terms of art (quantum Fourier transform, phase kickback, Hamiltonian) are dropped in one clause with zero gloss and no forward chapter pointer.
  - *fix:* Either paraphrase in plain language for this illustrative sentence, or append a forward pointer ("terms formalized in Chapters 4/10") right after the list.
- [line 53] "Quantum walks" is used as a named algorithmic technique in the taxonomy without any definition or forward pointer elsewhere in the file.
  - *fix:* Add a one-clause gloss ("quantum walks, a quantum analogue of random walks") or a forward pointer to the chapter that defines them.

### book/part-01-orientation/02-classical-to-quantum-contrast.md — YELLOW (8/15)
- [line 80] The symbol $\mathrm{P}$ is used in an argumentative claim two lines before it is actually defined in the same section.
  - *fix:* Move the one-clause definition of P earlier (or inline a 3-word gloss "P, polynomial-time problems," at first use) so line 80 doesn't outrun line 82.
- [line 7] The chapter's opening paragraph is pure topic-roadmap with no concrete example, conflict, or motivating stake, unlike the Chapter 1 GREEN anchor which opens with a direct claim.
  - *fix:* Lead with one concrete transfer/non-transfer example (e.g. the AND-gate irreversibility puzzle from §2.3) before the topic list, then follow with the roadmap.
- [line 9] The "how to read" callout previews undefined symbols (P, NP, BQP) and disclaims the chapter's own importance before any content has been presented, compounding opening reader-debt.
  - *fix:* Move the load-bearing/recognition-level caveat to §2.5 where those symbols are actually introduced, rather than stating it in the chapter's opening frame.

### book/part-01-orientation/03-physical-intuition.md — YELLOW (8/15)
- [line 20] The chapter's opening ~800 words (title through the 'How to read this chapter' box) are almost entirely meta/roadmap and forward-reference debt rather than concrete experience, delaying the first actual example (Stern-Gerlach splitting) well past the calibration-anchor shape.
  - *fix:* Open with a compressed version of the Stern-Gerlach split (or another concrete surprise) in the first paragraph, then fold the roadmap/status material after it or into a trailing note.
- [line 87] Planck's constant $\hbar$ is used at first mention in §3.1 with no gloss and isn't actually introduced/quantified until §3.10 (line 649), ~550 lines later, so a reader with no prior QM exposure has no idea what the symbol denotes when it first appears.
  - *fix:* Add a one-clause gloss at first use, e.g. '...±ℏ/2 (ℏ is Planck's constant, a fixed tiny number set by nature)...', or move the ℏ ≈ 10⁻³⁴ J·s remark from §3.10 up to a footnote here.
- [line 415] The uncertainty-principle formula uses commutator bracket notation $[A,B]$ live in a display equation, but the notation itself (as opposed to the word 'commutator') is never defined anywhere in this file and is explicitly deferred to Chapter 4.
  - *fix:* Either gloss $[A,B]=AB-BA$ in a parenthetical at first use, or replace the live formula with prose ('the spreads satisfy a lower bound tied to how much A and B fail to commute, made precise in Chapter 4') and move the equation itself to Chapter 4.

### book/part-02-formalism/04-mathematical-background.md — YELLOW (8/15)
- [line 278] The bra-operator-ket sandwich notation is used and called 'familiar' in §4.4 even though bras and the sandwich construction are not formally defined until §4.12, breaking the chapter's own earlier promise that column-vector notation suffices until then.
  - *fix:* Move the minimal bra/sandwich grammar into §4.1's notation aside, or rewrite the §4.4 expectation-value formula in the phi-dagger-A-psi form already established, deferring bra-ket sandwich notation until after §4.12.
- [line 27] The chapter opens with a section-number roadmap naming five section ranges before the reader has encountered any of the content those numbers refer to, ahead of any concrete example.
  - *fix:* Cut the 'How to read this chapter' roadmap paragraph from the opening (or shrink it to one sentence) and move the concrete amplitude/interference example (currently lines 43-61) or Hadamard-basis example (lines 82-100) to the front.
- [line 22] The opening 'two points' list names the convention 'conjugate-linear in the first argument' before the inner product it modifies is ever defined (it only appears at line 165 in §4.3), so the phrase carries no operational meaning on first read.
  - *fix:* Either move this convention note to sit right after the inner product is defined in §4.3, or replace it in the opening with a bare forward pointer ('see §4.3') instead of the unexplained technical phrase.

### book/part-02-formalism/05-postulates.md — YELLOW (8/15)
- [line 301] Pauli matrices and the rotation gates R_x/R_y/R_z (plus the generator symbol P in the following e^{-iθP/2} formula) are used as unglossed terms of art, even though the chapter's own bridge section says gates are first properly taught in Chapter 6.
  - *fix:* Add an inline gloss or explicit forward pointer, e.g. 'the Pauli matrices X, Y, Z (introduced in Chapter 6) are themselves Hermitian observables'.
- [line 14] The entire first ~500-word screen (Ch4 recap, this numbered list, and the following per-section reading-guide) is roadmap/meta with no concrete example, paradox, or stake, inverting the experience-before-roadmap shape set by the Chapter 1 calibration anchor.
  - *fix:* Open with one concrete payoff (e.g. the interference example from §5.7 that distinguishes (|0>+|1>)/√2 from (|0>-|1>)/√2) before the recap and the three-point/reading-guide meta material.
- [line 384] S, T, R_z, and H are named as phase/basis-changing gates with no definition or forward pointer, ahead of their real introduction later in the book (per the chapter's own bridge section, line 791-798).
  - *fix:* Gloss briefly or add '(defined in Chapter 6)' after the gate list so the cold reader knows these are forward references, not expected prior knowledge.

### book/part-03-qubits/06-the-qubit.md — GREEN (4/15)
- [line 383] The symbols alpha and beta are reused for Euler rotation angles in the three-parameter decomposition of §6.9 after having been fixed as the complex state amplitudes alpha, beta throughout §6.2-6.3, with no acknowledgment of the collision.
  - *fix:* Rename the Euler angles (e.g. phi1, phi2, phi3 or a, b, c) or add a one-clause note that these are unrelated to the earlier amplitude alpha/beta.
- [line 20] The chapter's opening roadmap paragraph names the three recurring bases (computational, Hadamard, circular) before any of them has been defined in this file.
  - *fix:* Either trim the parenthetical list from the roadmap sentence or move this preview to just after §6.1 once the computational basis exists to anchor it.
- [line 314] The half-angle explanation names the rigorous SU(2)/SO(3) double-cover relation before giving its operational meaning (2π flips sign, 4π restores identity), which follows immediately but only after the formal label.
  - *fix:* Lead with the operational fact (2π rotation flips sign; 4π restores it) and attach the SU(2)/SO(3) double-cover label afterward as the formal name for what was just shown.

### book/part-03-qubits/07-multiple-qubits-and-entanglement.md — YELLOW (7/15)
- [line 172] The term "ebit" is used in the teleportation walkthrough as if already familiar, but its operational gloss appears only two paragraphs later.
  - *fix:* Move the gloss "(one maximally entangled pair)" from line 180 up to this first use at line 172, or add a one-clause aside here.
- [line 98] "SLOCC" is introduced as an acronym immediately after LOCC is glossed, but SLOCC itself is never expanded or explained anywhere in this file or elsewhere in the book.
  - *fix:* Expand on first use, e.g. "different SLOCC (stochastic-LOCC) classes" with a half-sentence of what that adds over LOCC, or cut the aside if not load-bearing.
- [line 7] The chapter's opening paragraph is a dense roadmap of forward-referenced jargon (Bell zoo, EPR/Bell argument, Schmidt decomposition) rather than a concrete example or paradox, and is followed immediately by a second meta block (the "How to read this chapter" box, line 9) before any worked example appears.
  - *fix:* Lead with one concrete entangled-pair example or the EPR paradox intuition before the topic-list/roadmap paragraph, matching the Chapter 1 direct-claim-first pattern.

### book/part-04-gates-and-circuits/08-quantum-gates.md — YELLOW (7/15)
- [line 9] The chapter opens with a full section-by-section reading-path map that name-drops 'universality, Clifford+T, Solovay–Kitaev' before any of those terms exist in the chapter, putting the reader in pure-logistics mode before any motivating content.
  - *fix:* Move the 'How to read this chapter' box to after §8.1's first concrete gate example, or trim it to a one-line marginal note.
- [line 13] Section 8.1 opens with the fully general formal definition of a gate (element of U(2^n)) before any operational example of what a single gate does to a state.
  - *fix:* Lead with one concrete operational sentence (e.g., 'a gate takes amplitudes in, amplitudes out, reversibly') before stating the U(2^n) definition, deferring the group-theoretic phrasing by a sentence or two.
- [line 17] The symbol H is used here for a generic Hermitian generator/Hamiltonian, then reused eighteen lines later (§8.3) for the fixed Hadamard matrix, with no note flagging the collision.
  - *fix:* Add a one-clause aside at the Hadamard definition ('this H, the fixed Hadamard matrix, is distinct from the generic generator H above') or use a different placeholder letter for the generic Hermitian generator.

### book/part-04-gates-and-circuits/09-quantum-circuits.md — YELLOW (8/15)
- [line 9] The chapter opens with a metaphor sentence and then two consecutive blocks of pure roadmap/navigation text (topic list at L7, "How to read this chapter" box at L9) before any concrete example, inverting the GREEN calibration shape of claim-plus-motivation-before-machinery.
  - *fix:* Cut or shrink the L9 box to a single deferred forward-pointer footnote, and open instead with a concrete circuit (e.g. the Bell-state example already at L24) before the roadmap.
- [line 78] VQE and QAOA are named as bare acronyms with no gloss, referring to algorithms not introduced until Part 6 (per the chapter's own bridge at L150), so a cold linear reader hits two undefined forward-referenced terms of art.
  - *fix:* Either drop the parenthetical or add a 4-6 word gloss plus explicit forward pointer, e.g. "(VQE, QAOA — variational algorithms covered in Part 6)".
- [line 104] "Magic state" is used with zero definition or forward pointer, even though magic-state distillation belongs to Part 8 (error correction), which is cited two sentences later in the same paragraph for an unrelated claim.
  - *fix:* Add a short forward pointer, e.g. "a magic state (a specially prepared resource state introduced in Part 8)".

### book/part-04-gates-and-circuits/10-core-quantum-phenomena.md — YELLOW (7/15)
- [line 105] POVM and Kraus-operator terminology is used in §10.6 before either term is formally introduced anywhere in the book (POVM is defined only in Chapter 11, which comes after this chapter; Kraus operators are defined later in this same file at §10.13), with no forward pointer at the point of use.
  - *fix:* Either add an explicit forward pointer (e.g. "see §10.13 / Ch.11") at first use, or move/duplicate a one-line operational gloss of Kraus operators and POVM effects before line 105.
- [line 9] The chapter's second paragraph is a pure section-routing/reading-guide box placed before any concrete example or claim, front-loading roadmap over experience in violation of the Ch.1 GREEN shape.
  - *fix:* Move this reading-guide box to the end of the chapter opening (after the first concrete example in §10.1) or condense it to one sentence.
- [line 7] The chapter's opening sentence is an abstract-noun pile enumerating thirteen terms of art (several not yet defined anywhere in the book) before any motivating example, creating reader debt on the very first screen.
  - *fix:* Replace the list with a single motivating example or question, and defer the full topic list to after §10.1 has grounded the reader.

### book/part-05-measurement-and-information/11-measurement-theory.md — YELLOW (6/15)
- [line 9] A full 'how to read this chapter' roadmap box sits immediately after the opening motivation paragraph and before any concrete content, doubling the front-matter meta before the reader gets a single worked example.
  - *fix:* Cut the reading-guide box to one sentence (or move it after §11.2's trine example) so the opening leads with experience rather than a second section map.
- [line 7] The opening paragraph fires eight named topics as an unglossed list before any of them is explained, front-loading terminology ahead of motivation.
  - *fix:* Trim the list to 2-3 items with a one-clause gloss each, and let the rest surface naturally as each section is reached.
- [line 45] "The trine" is named and used as a known term ten lines before its formal definition ("Trine POVM on a qubit") appears at line 55, so a cold reader hits an unglossed proper noun mid-sentence.
  - *fix:* Either delay naming it until the formal definition at line 55, or add a three-word parenthetical gloss on first mention.

### book/part-05-measurement-and-information/12-quantum-information-theory.md — YELLOW (8/15)
- [line 15] The chapter opens with two consecutive meta/roadmap blocks (a numbered 'points to keep in mind' list and a long 'how to read this chapter' guide) totaling roughly 500 words before any worked example, well past the two-sentence motivating question that precedes them.
  - *fix:* Cut the numbered list and reading-guide blockquote to a few sentences, or move the section-by-section reading strategy to a footnote/appendix so the opening reaches concrete content faster.
- [line 240] The term 'mother protocol' (and 'quantum resource calculus') is introduced by name inside an aside with only a vague same-section pointer, and is not actually explained until roughly 40 lines later (lines 277-283), leaving the term undefined in the reader's working memory in between.
  - *fix:* Either drop the 'mother protocol' aside from this earlier mention entirely (keep it only at lines 277-283 where it's explained) or give a one-clause gloss at first mention instead of deferring.
- [line 146] Section 12.2 stacks formal properties of von Neumann entropy (range, unitary invariance, concavity, subadditivity, and strong subadditivity with a hard citation) in full rigor while the entropy's operational meaning (compression rate) is deferred to §12.9, leaving a purely mathematical stretch with no 'why this matters now' anchor inside the section itself.
  - *fix:* Add a one-sentence operational forward-anchor at the top of §12.2 (e.g., a compressed preview of the Schumacher-compression payoff) before the property list, so the math has a stated purpose before it accumulates.

### book/part-06-algorithms/14-foundational-algorithms.md — YELLOW (5/15)
- [line 91] The QFT is given in full rigorous form and immediately followed by a sign-convention caveat before any operational/intuitive grounding is offered.
  - *fix:* Move 'For N=2 the QFT is just the Hadamard gate' to sit directly after the definition, before the sign-convention caveat.
- [line 9] The chapter's 'how to read' preamble names 'phase kickback' as the key mental model before the term is defined anywhere (definition appears 12 lines later at line 21).
  - *fix:* Either gloss phase kickback in one clause in the preamble or drop the term from the preview and let §14.1 introduce it fresh.
- [line 105] 'Trotter' is used as a known technique with no gloss at its first mention; the explicit Chapter-16 forward-pointer appears later in the same paragraph attached to a different clause, not here.
  - *fix:* Attach the '(Chapter 16)' forward-pointer to this first mention of Trotter, or add a three-word gloss.

### book/part-06-algorithms/15-landmark-quantum-algorithms.md — YELLOW (8/15)
- [line 13] The optimal-iteration-count sentence for Grover piles three formula variants (round, floor, sinθ definition) and a small-θ caveat into one clause before the reader has been given any plain-English picture of what a Grover iteration actually does.
  - *fix:* Move the intuitive mechanism now stuck in the figure 15 caption ("oracle phase-flips the marked state... diffusion operator reflects about the mean") before the formula, then present the exact vs. rounded iteration-count variants as a follow-on detail.
- [line 7] The chapter's opening paragraph is a dense whole-chapter roadmap naming all six algorithm families with terse tags, rather than a concrete example, conflict, or claim to hook the reader, and is immediately followed by a second roadmap paragraph (line 9) before any content begins.
  - *fix:* Lead with one concrete hook (e.g., a specific unstructured-search or factoring instance) before the survey paragraph, or compress the two roadmap paragraphs into one and let each section's own opening line carry its preview.
- [line 19] "Magic-state distillation" is invoked as the reason constant factors are large in three places in this file (lines 19, 65, 68) but is never given even a one-clause operational gloss anywhere in the chapter.
  - *fix:* Add a short parenthetical gloss at first use, e.g. "magic-state distillation (the standard fault-tolerant procedure for manufacturing precise non-Clifford gates)".

### book/part-06-algorithms/16-modern-algorithmic-frontier.md — YELLOW (9/15)
- [line 9] The chapter opens with a full section-by-section roadmap paragraph before any concrete example, example-conflict, or paradox has been given, front-loading meta over experience.
  - *fix:* Move the section-map to the end of the intro (or trim it) and open §16.1 with a concrete simulation scenario before the roadmap.
- [line 13] The Hamiltonian simulation problem is given in full formal notation before the one-sentence motivation that follows it, reversing the motivate-then-formalize order the book's own Ch.1 anchor models.
  - *fix:* Lead with the Feynman-motivation sentence, then state the formal $\|V-e^{-iHt}\|\le\epsilon$ definition as the payoff.
- [line 194] "Magic-state distillation" is used here with no gloss anywhere earlier in the file or an explicit forward pointer; the only later contextualization (line 204) is oblique and arrives many paragraphs after first use.
  - *fix:* Add a one-clause gloss at first use (e.g., "magic-state distillation, the T-gate resource-purification step") or an explicit forward pointer to where it is explained.
- [line 206] The resource-accounting bullets in §16.8 pack multiple full sentences of argument into single list items rather than short scannable labels, causing prose/roadmap overload in list form.
  - *fix:* Split each bullet into a short bolded label plus a separate explanatory sentence, or convert to a compact comparison table with terse cells.

### book/part-07-complexity/17-complexity-theory.md — YELLOW (7/15)
- [line 31] Σ_2^p and Π_2^p are used in a containment claim roughly 85 lines before the polynomial hierarchy / Σ_k^p notation is actually defined in §17.5.
  - *fix:* Either add a one-clause inline gloss ("Σ_2^p, a level of the polynomial hierarchy defined in §17.5") or move this remark to after §17.5 introduces PH.
- [line 11] The opening 'How to read this chapter' box is a full section-by-section roadmap naming six-plus undefined acronyms (BQP, QMA, QIP, PH, T-count, dequantisation) before any concrete motivation or example appears.
  - *fix:* Trim the roadmap to one or two sentences and move the section-map to a footnote or end-of-intro aside, letting a concrete example open the chapter first.
- [line 83] MA and QCMA appear inside a containment display-equation before either is defined in the following prose (and AWPP at L56 is never operationally defined at all, only called 'more obscure').
  - *fix:* State the one-line gloss for MA/QCMA immediately before the containment chain rather than after it, and give AWPP at least a one-clause operational description or drop it if non-load-bearing.

### book/part-08-noise-and-qec/18-noise-decoherence-and-errors.md — YELLOW (7/15)
- [line 9] The opening "How to read this chapter" roadmap fires off five acronyms (RB, GST, ZNE, PEC, SPAM) as bare section labels before any concrete example has appeared in the chapter, front-loading the opening with an unglossed table-of-contents.
  - *fix:* Move or trim the reading-guide block after §18.1's first concrete example, or gloss each acronym in one parenthetical word on first mention even in the roadmap.
- [line 7] The chapter's very first paragraph is pure cross-chapter bookkeeping (what Ch.10 and Ch.11 did, where this chapter sits) rather than a concrete claim or motivating example, delaying reader payoff.
  - *fix:* Open with the concrete claim/paradox (e.g. the T1/T2-become-real-numbers idea already buried mid-paragraph) and push the chapter-lineage bookkeeping to a second paragraph.
- [line 94] "Clifford-RB" is used as a load-bearing term of art in §18.4 with no gloss and no forward pointer, roughly 100 lines before Randomised Benchmarking is actually introduced and named in §18.12 (line 202).
  - *fix:* Add a short inline gloss or an explicit "(§18.12)" forward pointer at first bare use of RB/Clifford-RB outside its defining section.

### book/part-08-noise-and-qec/19-quantum-error-correction-and-fault-tolerance.md — YELLOW (4/15)
- [line 99] The [[n,k,d]] parameter notation is used (in §19.6 and again in §19.7) before it is formally defined as a general convention in §19.8.
  - *fix:* Add a forward pointer '([[n,k,d]] notation defined in §19.8)' at first use, or move the general definition earlier.
- [line 27] The Hamming bound and Singleton bound are named in a 'recap' section but never glossed anywhere in the file, presuming outside classical-coding-theory familiarity.
  - *fix:* Add a half-sentence gloss (e.g. 'bound the tradeoff between n, k, and correctable errors') or cut the sentence since neither bound is used again.
- [line 9] The 'How to read this chapter' box, placed immediately after the opening paragraph, names seven forward-referenced terms of art (discretisation insight, stabiliser formalism, CSS construction, threshold theorem, transversal gates, magic state distillation, lattice surgery) with zero gloss before the reader has seen any of the chapter's content.
  - *fix:* Move the reading-guide box to after §19.1 has established the core conflict, or trim it to bare section-number ranges without naming undefined concepts.

### book/part-09-hardware-and-software/20-quantum-hardware-platforms.md — YELLOW (4/15)
- [line 11] A perishability caveat about the chapter's data lands in a blockquote before the reader has met a single concrete hardware fact, adding debt at the very top of the file.
  - *fix:* Move the moving-target warning to the end of the intro paragraph or into §20.12 where the numbers actually appear, so the reader gets content before caveats.
- [line 27] SQUID is used as a load-bearing mechanism for tunable-frequency transmons without ever being expanded or glossed, in this file or (per the chapter's own dependency list in line 9) any prerequisite chapter.
  - *fix:* Add a 4-6 word parenthetical gloss, e.g. "a SQUID loop (a small superconducting ring interrupted by two junctions, acting as a flux-tunable inductor)".
- [line 71] The acronym EDSR is used parenthetically with no expansion or definition anywhere in the file.
  - *fix:* Expand on first use: "electric dipole spin resonance (EDSR)".

### book/part-09-hardware-and-software/21-quantum-control-and-electronics.md — GREEN (3/15)
- [line 9] The chapter's second paragraph is a full section-by-section roadmap box that front-loads the entire chapter map before any concrete example has developed.
  - *fix:* Trim the how-to-read box to one or two sentences of steering advice; move the detailed §-range breakdown later or into a footnote so the concrete opening carries further before meta content lands.
- [line 13] The rotating-frame drive Hamiltonian is presented in full notation before the operational Bloch-sphere picture that explains what it means physically, which arrives only in the following paragraph's tail sentence.
  - *fix:* Lead with the operational sentence ('a gate is the qubit's Bloch vector tracing an arc at angular velocity set by the drive amplitude') and then present the Hamiltonian as its formalization.
- [line 118] Krotov is defined purely through an abstract-noun description of an integral-equation update rule, with no operational or intuitive gloss offered anywhere in the bullet.
  - *fix:* Add a one-clause operational analogy (e.g., 'like GRAPE's gradient step but with a step size chosen so fidelity provably never decreases') before or instead of the integral-equation phrasing.

### book/part-09-hardware-and-software/22-hardware-engineering-metrics.md — GREEN (5/15)
- [line 49] Process fidelity F_pro is used in a load-bearing formula but is never given an operational or intuitive definition anywhere in the file.
  - *fix:* Add a clause before the formula: 'process fidelity F_pro -- the overlap between the actual and ideal process, independent of averaging over input states -- relates to F_avg by...'
- [line 43] The average-gate-fidelity definition jumps to a Haar-measure integral with minimal operational lead-in, unlike the T1/QV/XEB definitions elsewhere in the same chapter which open with an explicit operational walkthrough before any formula.
  - *fix:* Precede the formula with an operational sentence, e.g. 'Operationally: average the state fidelity between G(psi) and G_ideal(psi) over many random input states psi' before showing the integral.
- [line 57] The term 'twirl' is used as unglossed technical jargon with no in-file explanation of what twirling operationally means.
  - *fix:* Add a short parenthetical, e.g. 'twirl (average the channel over random Clifford conjugations) any noise channel...'

### book/part-09-hardware-and-software/23-quantum-programming-compilation-and-tooling.md — YELLOW (5/15)
- [line 7] QIR is introduced as one of three major gate-level IRs but is never defined or expanded anywhere in the chapter, unlike its two siblings which each get dedicated sections.
  - *fix:* Add a one-sentence gloss on first use ("QIR, the LLVM-based Quantum Intermediate Representation used by Q# and others") or give it its own short subsection alongside 23.2/23.3.
- [line 9] The 'How to read this chapter' roadmap callout arrives after only one paragraph, front-loading meta/navigation content before the reader has seen a full worked example.
  - *fix:* Move the roadmap callout after the OpenQASM 3 worked example in 23.2, or shorten it and let the concrete example in 23.1/23.2 carry the opening.
- [line 168] The parenthetical invokes the Magnus expansion, a real-analysis/perturbation-series concept, for a reader explicitly stated to have no real-analysis background, with no operational gloss.
  - *fix:* Either drop the parenthetical or replace it with a one-clause operational description ("a fast averaging effect familiar from NMR refocusing") instead of naming the expansion.

### book/part-09-hardware-and-software/24-classical-simulation-of-quantum-systems.md — YELLOW (7/15)
- [line 11] The chapter's second/third paragraph is a full navigational roadmap (a per-section reading map) placed before any concrete example or motivating problem, front-loading meta over experience.
  - *fix:* Move the 'How to read this chapter' box to after §24.1's concrete persona paragraphs, or compress it to one sentence and defer the section-range map to a footnote.
- [line 9] Four acronyms (MPS, PEPS, DMRG, TEBD) are introduced in a single preview clause with no gloss, in the chapter's second paragraph, well before their definitions in §24.7-§24.10.
  - *fix:* Either drop the acronyms from this preview sentence (name the technique family only, e.g. 'tensor-network methods') or add a 3-4 word parenthetical gloss for each on first mention.
- [line 258] 'Quench' (a sudden change of Hamiltonian parameters) is used as settled condensed-matter jargon both in the body (line 150) and in this sanity-check exercise, with no operational gloss anywhere in the file.
  - *fix:* Add a short inline gloss at first use, e.g. 'a quench (an abrupt change to the Hamiltonian's parameters)'.

### book/part-10-practice-and-era/25-nisq-and-early-fault-tolerant-era.md — YELLOW (7/15)
- [line 9] The chapter's second paragraph is a dense navigation/roadmap box with six forward references to unread sections and chapters, front-loading meta-structure before the reader has seen any concrete NISQ example.
  - *fix:* Cut the how-to-read box down to one sentence or move it to a footnote/margin note after §25.1 has given the reader something concrete to anchor the roadmap to.
- [line 70] "Spin-orbitals" and "active-space reduction" are used as if already known, but they are first defined only in Chapter 28, which comes after this chapter in reading order, leaving a cold reader with no gloss to fall back on.
  - *fix:* Add a three-word parenthetical gloss (e.g. "spin-orbitals (per-electron basis functions)") or an explicit forward pointer to Chapter 28 at first use.
- [line 57] The barren-plateau claim is stated as a rigorous variance-scaling formula before its plain-English operational meaning, a minor instance of definition-before-operational-meaning ordering.
  - *fix:* Lead with the operational sentence ("the cost landscape goes exponentially flat") and follow with the formula as a footnote-style confirmation, matching the better-ordered pattern used elsewhere in §25.2 and §25.6.

### book/part-10-practice-and-era/26-practical-access-and-hands-on-work.md — GREEN (3/15)
- [line 86] Sigma is glossed as "the observable's variance" but is then used in the formula sigma/sqrt(N) as if it were the standard deviation, an internally inconsistent definition at first use.
  - *fix:* Either change the gloss to "the observable's standard deviation" or change the formula to sqrt(variance/N), so the symbol's stated meaning matches its use.
- [line 9] The chapter opens with a meta "how to read this chapter" navigation callout before any concrete example or claim is given.
  - *fix:* Move the reading-guidance callout after the first concrete paragraph (or fold it into the closing bridge section) so the opening leads with the §26.1 claim.
- [line 29] The acronym VQE is used without expansion or gloss in this file, relying entirely on an earlier chapter having introduced it.
  - *fix:* If VQE was not already spelled out at first use in an earlier chapter, add a one-time parenthetical expansion here (e.g. "a Variational Quantum Eigensolver (VQE) loop").

### book/part-11-applications/27-cryptography-and-security.md — GREEN (2/15)
- [line 57] The acronym KEM (key encapsulation mechanism) is used at first mention and throughout the chapter (ML-KEM, HQC "(KEM)", "KEM only") but is never once spelled out or glossed in this file.
  - *fix:* On first use (line 57), write "KEM (key encapsulation mechanism)" or add a one-clause gloss.
- [line 72] "IPD" (NIST's Initial Public Draft) is used without expansion and never defined anywhere in the file.
  - *fix:* Expand to "the Initial Public Draft (IPD)" on first use.
- [line 9] The "How to read this chapter" block immediately follows the strong opening paragraph and previews all 11 sections plus several undefined protocol names (BB84, E91, B92, decoy states), adding a roadmap beat right where momentum from the opening claim should carry into concrete content.
  - *fix:* Trim the roadmap paragraph to one or two sentences, or move the section-by-section map to an appendix/footnote so the opening claim leads straight into §27.1's damage list.

### book/part-11-applications/28-scientific-computing-and-physical-simulation.md — YELLOW (6/15)
- [line 92] "Green's function" (and its later formal definition at line 116, plus "self-energy"/"Dyson equation" in the same sentence) is used as known vocabulary but is never introduced or glossed anywhere in this file or earlier in the book, despite the reader profile explicitly having no prior QM background.
  - *fix:* Add a short operational gloss on first use, e.g. "the Green's function (informally: the amplitude for a particle inserted at one spacetime point to be detected at another) of the impurity..."
- [line 44] "Hartree–Fock" is introduced by name only, with no explanation of what it is, and then reused as load-bearing vocabulary through §28.1, §28.4, and §28.5 without ever being defined in this file or earlier in the book.
  - *fix:* Gloss on first use, e.g. "a reference (typically Hartree–Fock, the mean-field single-Slater-determinant approximation) determinant".
- [line 100] "Slater determinant" is a term of art (an antisymmetrized many-fermion basis state) used here and in Sanity Check 3(a) without ever being defined, even though the chapter otherwise carefully glosses comparable jargon like Born–Oppenheimer and second quantisation on first use.
  - *fix:* Define it briefly where second quantisation is introduced (§28.1, line 23), e.g. "each basis state is a Slater determinant — an antisymmetrized product of the M spin-orbitals."

### book/part-11-applications/29-optimization-finance-and-industrial.md — GREEN (4/15)
- [line 57] "Barren-plateau" is used as an established term before it is defined two sentences later under its own heading.
  - *fix:* Either move the barren-plateau definition ahead of this sentence or add a forward pointer (e.g., "see below") at first use.
- [line 9] The acronym QAE is used unglossed in the chapter's reading-guide box, nearly 100 lines before it is formally expanded and defined at line 106.
  - *fix:* Spell out "quantum amplitude estimation (QAE)" on first mention in the roadmap box, or drop the acronym there and just say "amplitude estimation."
- [line 19] QUBO's rigorous minimization formula is presented immediately after naming it, with the operational "this is the standard interface" framing arriving only in the following sentences rather than before the formula.
  - *fix:* Add one plain-language sentence (e.g., "informally: pick a 0/1 value for each variable to minimize a quadratic penalty") before the equation.

### book/part-11-applications/30-quantum-machine-learning.md — YELLOW (7/15)
- [line 11] A full nine-section roadmap is dumped in a blockquote immediately after the opening claims and before any concrete worked example, front-loading the chapter with meta/navigation content.
  - *fix:* Trim the roadmap box to one or two sentences, or move the detailed section-by-section itinerary later (e.g., end of §30.1) after the taxonomy has been motivated with a concrete case.
- [line 7] The term of art "dequantisation" is used in the chapter's opening sentence-cluster with no gloss; its operational meaning is not given until line 31, roughly 20 lines later.
  - *fix:* Add a short parenthetical gloss at first use, e.g. "dequantisation (classical algorithms matching the quantum speedup once given comparable data access)", or move the term's first use to after its definition.
- [line 45] "Heisenberg-limited scaling" is used with no operational gloss anywhere in the file, and its natural definitional home (quantum metrology / Cramér–Rao bounds) is Chapter 31, which the reader has not yet reached.
  - *fix:* Add a brief in-line gloss (e.g., "error scaling as 1/t rather than the classical 1/√t") or an explicit forward pointer to §31's treatment of the Heisenberg limit.

### book/part-11-applications/31-quantum-sensing-metrology-and-tomography.md — YELLOW (5/15)
- [line 7] Squeezed vacuum / quadrature squeezing is used substantively in the opening and again at lines 43, 49, 61, 69, but its operational meaning is never given in this file or any earlier chapter — the actual definition ("squeezed states sharpen q̂ at the expense of p̂") only appears in Chapter 32, which the reader has not yet read.
  - *fix:* Add a one-sentence operational gloss at first use ("squeezing redistributes quantum noise unevenly between two conjugate field quadratures, below the shot-noise level in one at the cost of excess noise in the other") or an explicit forward pointer to Ch. 32.
- [line 9] A full section-by-section roadmap block sits directly between the strong concrete opening hook (line 7) and the first technical content (line 11), adding a meta detour before the chapter's substance begins.
  - *fix:* Trim the roadmap to one sentence or move the detailed section-by-section breakdown to a footnote/sidebar so the concrete hook flows more directly into §31.1.
- [line 7] The acronym SQUID is used unexplained in the opening paragraph and only spelled out and defined 48 lines later at its formal introduction in §31.2.
  - *fix:* Either spell out "SQUID (superconducting quantum interference device)" on first use in the opening, or accept it as a deliberately teased term given it's resolved within the same chapter shortly after.

### book/part-12-adjacent-models/32-adjacent-computational-models.md — YELLOW (4/15)
- [line 7] The opening sentence piles four unglossed technical model-names into one clause before any single one is made concrete, front-loading abstraction ahead of a grounded example.
  - *fix:* Unpack one example (e.g., briefly ground 'cluster state' or 'anyons' in one clause) before listing the rest, or defer the full list until each gets its own section header.
- [line 11] The 'How to read this chapter' block functions as a dense mini-table-of-contents (six section-group priority judgments in one paragraph) placed right at the start of the chapter, tipping toward roadmap overload before any technical content begins.
  - *fix:* Shorten to 1-2 sentences of high-level guidance, or move the detailed per-section reading priorities to a footnote/end-of-chapter note.
- [line 91] The notation Perm(U_S) appears in the probability formula before the term 'permanent' is named and glossed in the following sentence, a brief forward-use of unlabeled notation.
  - *fix:* Name 'the permanent of the submatrix U_S' in prose immediately before presenting the formula, so Perm is already glossed when it appears.

### book/part-12-adjacent-models/33-quantum-communication-and-networking.md — GREEN (3/15)
- [line 61] DLCZ's physical implementation is described using unglossed quantum-optics jargon (Raman pulse, Stokes photon, collective spin excitation, optical cavity) that is never operationally defined anywhere in the book, despite the reader having no QM/optics background.
  - *fix:* Add a one-clause operational gloss (e.g., "a laser pulse that scatters a photon off the ensemble while flipping one atom's spin") or explicitly flag the mechanism as background-optional detail.
- [line 7] The chapter's second sentence lists four named protocols with no gloss, before any of them has been characterized even informally.
  - *fix:* Either drop the list to a generic phrase ("a handful of tasks impossible over a classical channel") or add a 3-5 word parenthetical per term.
- [line 9] The How-to-read roadmap immediately following the strong opening paragraph front-loads six sections' worth of unglossed acronyms into the first screen, shifting the opening's concrete:meta balance toward meta.
  - *fix:* Trim the roadmap to the two "who should read what" sentences and move the section-by-section content preview later or into a shorter form.

### book/part-13-perspective-and-direction/34-bridging-to-familiar-engineering-ideas.md — YELLOW (4/15)
- [line 9] The chapter opens with a full reading-order/roadmap box (which sections to internalise first, six dense chapter cross-references) sandwiched between the motivating hook and the first concrete example, front-loading meta content before payoff.
  - *fix:* Move the 'how to read this chapter' guidance to a shorter trailing note after §34.1's first concrete analogy, or trim it to one sentence.
- [line 87] The acronym 'AWGs' (arbitrary waveform generators) is used with no gloss or expansion anywhere in the file.
  - *fix:* Expand on first use: 'pulse-level instructions for the AWGs (arbitrary waveform generators)'.
- [line 49] Mølmer–Sørensen and Rydberg gates are named without any gloss of what distinguishes them, relying purely on the reader recognizing the terms.
  - *fix:* Add a three-word parenthetical (e.g. '(a two-qubit phase gate)') or cut the names if they are purely decorative color.

### book/part-13-perspective-and-direction/35-interpretational-and-conceptual-pitfalls.md — YELLOW (7/15)
- [line 24] The terms '$\psi$-ontic' and '$\psi$-epistemic' are used in the opening with no gloss and no forward pointer, and only '$\psi$-epistemic' is ever explicitly defined, ~550 lines later in §35.13.
  - *fix:* Either add a forward pointer ('see §35.13') right after the phrase, or replace with a plain-language stand-in ('whether the wavefunction is real or just a state of belief') until §35.13 defines the pair.
- [line 33] The 'How to read this chapter' box previews all 14 subsections in one dense block using compound jargon labels (entanglement-as-signalling, collapse-as-mechanism, PBR and ontology) before any of them has been motivated, functioning as roadmap overload right in the opening window.
  - *fix:* Shorten to a one-line thematic summary and move the section-by-section map to a footnote or trim it to 2-3 clauses; let the slogans in the first paragraph (already concrete) carry the opening instead.
- [line 574] The PBR theorem is stated using the term '$\psi$-epistemic' before that term's operational definition appears (which comes only in the following sentence).
  - *fix:* Swap the order: give the one-sentence operational gloss of a $\psi$-epistemic model first, then state what PBR rules out.

### book/part-13-perspective-and-direction/36-how-to-judge-claims.md — YELLOW (6/15)
- [line 9] The second block of the chapter (the 'How to read this chapter' box) is a pure eight-section roadmap with no concrete example, front-loading meta content immediately after the single opening paragraph.
  - *fix:* Cut or shrink the roadmap box to one sentence, or move it after the first worked example (e.g. after the Sycamore vignette) so the reader gets a concrete case before the map of the chapter.
- [line 7] Five specific case-study names are dropped in the opening paragraph with no gloss, creating unexplained-term debt before the reader has any basis to evaluate them (they are not explained until §36.3/§36.7, several pages later).
  - *fix:* Either drop the list from the opening (let the case studies arrive when first analyzed) or append a half-clause gloss for each, e.g. "Sycamore (Google's 2019 supremacy chip)".
- [line 45] "Stable rank" is used as the load-bearing technical qualifier that limits the dequantisation claim, but it is never defined or glossed anywhere in the file.
  - *fix:* Add a short in-line gloss, e.g. "stable rank (roughly, the effective number of dominant singular directions, $\|A\|_F^2/\|A\|_2^2$)".

### book/part-13-perspective-and-direction/37-endgame.md — YELLOW (7/15)
- [line 9] The chapter's second paragraph is an explicit, section-by-section roadmap for all eight subsections, arriving before any concrete example, claim, or hook comparable to Chapter 1's opening move.
  - *fix:* Cut or shrink the roadmap blockquote, or move it after a short concrete opening (a specific claim or vignette) so the reader has something to care about before the map.
- [line 19] The §37.1 chapter recap (13 bullets) is written as strings of technical nouns in parentheses rather than narrative sentences, reading as a lookup index rather than prose a linear reader can follow for sense-making.
  - *fix:* Replace the noun-list bullets with one synthesizing sentence per part that states what each part let the reader do, reserving the exhaustive term list for the notation/back-matter appendix.
- [line 82] Each entry in the §37.5 role list is a 3-4 sentence paragraph rather than a scannable label, so the list reads as six stacked mini-essays rather than a table a reader can compare at a glance.
  - *fix:* Lead each bullet with a short bolded one-line definition of the role, then follow with the supporting detail already present.

### book/99-back-matter/appendix-a-notation-reference.md — GREEN (3/15)
- [line 19] Grammatically broken sentence in the opening rationale paragraph leaves the reference unclear on first pass.
  - *fix:* Rewrite as e.g. 'The same precedent is set in §4.12 and §4.16 of Chapter 4' or cut the sentence.
- [line 114] Trace distance D(ρ,σ) is used and its formula given inline before it is formally glossed later at line 251 in §A.4 of the same file, with no forward pointer.
  - *fix:* Add a forward pointer '(see §A.4)' or move/duplicate the trace-distance gloss earlier.
- [line 354] The closing 'Sample complexity' entry drops the bullet/gloss format used everywhere else in the appendix for a dense unbulleted prose paragraph, breaking scannability of the lookup surface.
  - *fix:* Convert to a bulleted entry or trim to a short scannable gloss with a pointer to Chapter 14 for the full argument.

### book/99-back-matter/appendix-b-common-gates.md — GREEN (4/15)
- [line 75] "Heisenberg picture" is used as an unglossed QM term of art with no in-file definition or forward pointer, risky for a stated no-prior-QM audience.
  - *fix:* Either gloss it inline ("in the Heisenberg picture — i.e. tracking how operators transform under conjugation") or cut the phrase; the preceding clause already states the fact plainly.
- [line 166] "spin-1/2" is dropped as an unexplained physics label with no gloss or pointer to where spin is discussed.
  - *fix:* Add a 3-4 word parenthetical ("spin-1/2 systems, i.e. qubits") or drop the aside since the periodicity fact already stands alone.
- [line 335] "Clifford group" is used without an in-file gloss or explicit pointer to the chapter that defines it.
  - *fix:* Add a short parenthetical gloss ("the group generated by H, S, CNOT") or a section pointer, consistent with how other forward/backward terms in this file are handled (e.g. §4.8, §B.3 pointers).

### book/99-back-matter/appendix-c-identities-and-decompositions.md — GREEN (2/15)
- [line 164] The QM term of art "Heisenberg picture" is used here (and once earlier in Appendix B) without ever being defined or glossed anywhere in the book — not in Ch4 §4.5 (operator classes), not in Appendix A (notation reference), not in Appendix E (glossary).
  - *fix:* Add a short parenthetical operational gloss on first use, e.g. "in the Heisenberg picture (the gate acts on the operator, $O \mapsto U^\dagger O U$, rather than on the state)", or add a one-line entry to the Appendix E glossary.
- [line 47] The "Pauli product table" is announced as a table but is rendered as four dense inline-algebra bullet lines rather than an actual scannable grid, undercutting the appendix's own lookup-surface purpose.
  - *fix:* Render the 16 products as an actual 4x4 Markdown table with I/X/Y/Z as row and column headers instead of prose bullets.

### book/99-back-matter/appendix-d-suggested-reading.md — GREEN (3/15)
- [line 3] A production/workflow status line (prereviewed / Phase 6 / Sections drafted) appears as the first line of reader-facing content, before the appendix even states its purpose.
  - *fix:* Remove or relocate this status metadata to a non-reader-facing build file; it is editorial tracking, not content for the book's audience.
- [line 228] This entry breaks the list's established citation pattern (Title in italics, then 'Author. Venue, Year.') by inlining venue/arXiv info parenthetically, reducing scannability of an otherwise consistent lookup list.
  - *fix:* Reformat to match the surrounding entries: '*Title.* Ewin Tang. STOC, 2019 (arXiv:1807.04271).'
- [line 231] Unlike every other bullet, this entry has no citable primary source ('Various authors') and instead redirects to a different paper's title, which weakens the appendix's function as a lookup surface.
  - *fix:* Either cite a specific representative paper directly, or fold this sentence into the adjacent Childs–van Dam entry rather than giving it its own bullet.

### book/99-back-matter/appendix-e-glossary.md — GREEN (3/15)
- [line 20] Reader-facing prose cites an internal repo bug-tracking file the reader has no access to or need for, leaking build/editorial metadata into the manuscript.
  - *fix:* Move the Markdown-table-bug rationale to an author/editor comment or CONTRIBUTING note; keep the reader-facing sentence at 'kept as display blocks to avoid collisions with literal | characters.'
- [line 3] A production-status metadata line sits at the very top of the reader-facing appendix, ahead of any glossary content.
  - *fix:* Strip this status line (or move it to a build-only front-matter field) before the reader-facing build.
- [line 372] The Depolarising channel entry stacks two competing parameterisations plus a hedging caveat, breaking the terse scannable-bullet norm the rest of the glossary follows.
  - *fix:* Split into a one-line operational definition plus a short 'convention note' sub-bullet so the primary definition stays scannable.

### book/99-back-matter/appendix-f-hardware-snapshot-2026.md — GREEN (2/15)
- [line 22] Three consecutive caveat/warning blocks (lines 7-13, 15-20, 22) make essentially the same point — that the numbers are perishable and must be re-verified — before any substantive hardware content appears, front-loading redundant meta-text.
  - *fix:* Merge the isolation-rationale, "how to read every number," and "moving-target warning" blocks into a single caveat paragraph before F.1.
- [line 15] This blockquote duplicates the substance of the adjacent "Moving-target warning" blockquote two lines later, doubling the caveat dose readers must sit through before reaching data.
  - *fix:* Fold this sentence into the moving-target warning block or the F.1 caveats section instead of giving it a separate callout.

## Process notes

- One agent (02-notation-and-conventions) exceeded the structured-output retry cap; its row
  was recovered from the first run's journaled results (two valid completions existed).
- The chunked-5 run with per-chunk token metering worked as designed; meter increments are
  preserved in the workflow logs (121k → 645k output tokens across 10 chunks).
- The Fable dual passes were deferred for budget; three Fable results from the first run
  remain journaled and can be folded in later if a second opinion on the entry files is
  wanted.
- Raw structured results (with per-finding verification status) are preserved alongside this
  report as `cold-read-2026-07-09-triage-data.json`.

## Dispositions — 2026-07-14 (insert-only)

All 136 findings have now been dispositioned. Numbering below follows the per-file order of
the findings list above (1–136, counting top to bottom). Two passes were run:

**Pass 1 — mechanical/sure fixes (84 findings, applied and committed in batches 1–11 plus an
anchor-requote commit).** Findings applied: 1, 2, 4–8, 10–15, 19–21, 23, 24, 26, 27, 29–31,
34, 35, 37–39, 44, 46, 48–50, 53, 55, 56, 58, 60, 63–65, 68, 69, 71–76, 78, 80, 81, 83–85,
88, 89, 91–96, 98–100, 102, 105–107, 110–112, 114, 116, 117, 121, 122, 124–127, 130, 134.
These were glosses, forward pointers, acronym expansions, introduce-then-use reorderings,
and two genuine defects (finding 85: variance/standard-deviation inconsistency in Ch26;
finding 121: broken sentence in Appendix A). Fifteen factcheck anchors staled by these edits
were requoted (verification status untouched); the anchor checker is back at its
pre-existing baseline (97, identical stale set).

**Pass 2 — deep investigation of the 52 remaining (doubtful) findings.** Verdicts:

### Upgraded to FIX (5) — applied in this commit
- **51 (Ch15 §15.1).** The Grover iteration-count sentence really did pile three formula
  variants before any mechanism. The operational mechanism (oracle phase-flip + reflection
  about the mean) previously lived only in the figure caption; one mechanism-first sentence
  now precedes the formula pile. Same pattern as sure-fixes 29, 84, 96.
- **57 (Ch16 §16.8).** The three resource-accounting bullets were the only label-less
  multi-sentence bullets in the section's vicinity; the book's house bullet style is a
  bolded leading label (cf. Ch12 §12.2, Ch37 §37.5). Bolded **T-count**, **Logical depth**,
  **Ancilla count**.
- **128 (App C).** The text announced a "Pauli product table (rows are…, columns…)" and then
  rendered bullets. A real Markdown grid is blocked by the known `|`-in-math renderer bug
  (Bug 5) that App E documents, so the honest fix is to stop promising a table: the
  announcement now says the products are enumerated as bullets and points at the App E note.
- **135 + 136 (App F).** Confirmed: the "How to read every number here" blockquote and the
  moving-target warning made the same perishability point twice in three blocks. Merged into
  a single **Moving-target warning** blockquote preserving every distinct obligation
  (order-of-magnitude discipline, non-uniform reporting, contested-claims note, Ch36
  pointer, May 2026 date, re-verify instruction, fact-check-ledger pointer) and preserving
  the lint sentinel phrase. The isolation-rationale paragraph stays: it explains the
  appendix's design, which is not a caveat.

### AUTHOR-DECISION (2) — entry-path opening restructures, flagged for the author
- **18 (Ch3).** The opening run to the first concrete physical fact is long, and the
  suggested restructure (open with a compressed Stern–Gerlach surprise) is plausible. Ch3 is
  on the entry path, where reader-reported pain concentrated, so this deserves an author
  read rather than an editor's unilateral rewrite of the chapter's voice.
- **25 (Ch5).** The first screen is Ch4-recap + a three-point numbered frame + the
  how-to-read box. Each element is content-bearing (the three points are real epistemic
  framing, not filler), but the cumulative meta-before-payoff length is the largest on the
  entry path. Options: promote a concrete interference payoff above the numbered list, or
  accept as-is. Author's call.

### ADJUDICATED — NO CHANGE (45)
Grouped by the reason the finding does not survive:

- **How-to-read boxes flagged for existing (22, 33, 36, 40, 42, 45, 59, 61, 66, 70, 77, 79,
  82, 86, 90, 97, 101, 104, 108, 109, 113, 115, 118).** The box is a deliberate house
  convention — a per-chapter selective-reader contract, present in 39 of 48 files, echoing
  the preface's reading-paths section. A reading contract only functions *before* the reader
  commits, so "move it after the first example" defeats its purpose; and removing it in the
  24 flagged chapters but not the other 15 would be worse than either uniform choice. The
  cold-read rubric (D1/D2) penalises front-loaded meta by construction, so it flags this
  convention automatically; that is the instrument disagreeing with a ratified design
  decision, not new information. Jargon-inside-box complaints that were separable were
  already fixed in pass 1 (findings 49, 95). **Residual signal worth keeping:** box quality
  varies (36–142 words; up to 13 §-references and 5+ unglossed acronyms). If the author
  wants a convention-tightening pass, the outliers are Ch33 (142w, 11 §refs, 5 protocol
  acronyms), Ch24 (13 §refs), Ch17 (11 §refs, 5 complexity acronyms), Ch31 (10 §refs),
  Ch12 (136w), Ch18 (132w, 5 acronyms), Ch37 (131w), Ch36 (130w). A cap of roughly two
  sentences of steering plus ≤6 §-references would bring every box under the median.
- **Opening paragraphs flagged as "roadmap, not concrete" (3, 16, 28, 32, 41, 43, 52, 54,
  62, 103).** Read individually, none is the dead meta the Prelude opening was. Ch2's
  opening poses the concrete transfer question it answers; Ch7, Ch15, Ch16, Ch18, Ch32
  openings are content-bearing orientation prose with claims and stakes (Ch18's lands on
  "T1/T2 stop being abstract decay times and become numbers a benchmark returns"); Ch10 and
  Ch11 open with motivation and then preview the chapter's own subject matter, which is what
  a preview is for; the preface's four-noun list (finding 3) is scope declaration, not
  concept use; Ch6's roadmap naming three bases (28) previews terms the chapter defines
  pages later. Converting survey-chapter openings to anecdote-first is a whole-book style
  overhaul, not a defect repair.
- **Policy/infrastructure items (67, 129, 132, 133).** The Ch20 moving-target banner (67)
  must precede the first perishable figure, which appears in §20.1 (anharmonicity numbers),
  so it cannot move to §20.12; its removal before publication is already lint-gated. Status
  lines (129, 133) are lint-required production infrastructure on all 48 files and are a
  publication-build strip, not a per-file edit. The App E internal-doc citation (132) is one
  of four systematic citations of `docs/github-markdown-math-bugs.md` (App A, App E,
  notation chapter, Ch4); fixing one in isolation breaks the convention — logged instead as
  a publication-build task: rewrite or strip internal-doc references when the book leaves
  the repo.
- **Format items that don't survive close reading (47, 119, 120, 123, 131).** Ch12 §12.2
  (47) already anchors von Neumann entropy operationally — "exactly the Shannon entropy of
  the eigenvalue distribution" — for an audience whose stated background includes
  probability. Ch37's recap bullets (119) contain narrative claims, not bare noun strings,
  and the role list (120) already leads each bullet with a bolded label plus a defining
  first sentence — the structure the fix asks for is the structure on the page. App A's
  sample-complexity paragraph (123) is a closing commentary paragraph in the book's
  bolded-label idiom, not a malformed glossary entry. App D's HSP entry (131) honestly
  routes to Childs–van Dam's survey; substituting a token primary citation would add
  factcheck debt without helping the reader.
- **Previously adjudicated during pass 1 (9, 87).** The Prelude's residual ~320-word opening
  contract (9) is the deliberate design kept in the 07-09 restructure. VQE's bare acronym in
  Ch26 (87) rests on an actual first-use expansion — "variational quantum eigensolvers
  (VQE)" in Ch1 §1.4 — so the finding's premise ("if it was not already spelled out") is
  satisfied in the reader's favour.

**Tally: 136 findings = 89 fixed (84 pass 1 + 5 pass 2) · 45 adjudicated no-change ·
2 author-decision.**
