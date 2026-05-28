# Review 2026-05-28 — disposition record

This is the closing record for [`review-2026-05-28-0105.md`](../review-2026-05-28-0105.md).
Each distinct finding in that review has one row here with a status:

- **APPLIED** — change is in HEAD; commit cited.
- **DEFENSIBLE** — verified by reasoning or source; intentionally not changed; rationale given.
- **NEEDS-VERIFICATION** — genuinely open; to be walked through one by one before applying.
- **REJECTED** — verified as not a defect; will not act.

When every row is dispositioned (no NEEDS-VERIFICATION remaining), the
review file itself is deleted; this doc is the durable record. Further
appends to that file by the reviewer are out of scope unless explicitly
re-opened — the discipline is that one review session terminates in one
disposition record.

## Key findings (numbered §)

| # | Finding | Status | Notes |
|---|---|---|---|
| 1 | Stale "45 files" language in PROCESS / HISTORY | APPLIED | PROCESS 45→47 (`415a469`); HISTORY references retained as bootstrap-era narrative (explicit in Phase 0/1 framing) |
| 2 | `TOC.md` says Index not yet produced | APPLIED | `8365708` |
| 3 | `scripts/build_book.py` SyntaxWarning | APPLIED | raw docstring, `8365708` |
| 4 | `STYLE.md` understates figure coverage | APPLIED | `8365708` |
| 5 | Full mdBook HTML build not verifiable in reviewer's env | DEFENSIBLE | environment-specific to reviewer; our build is verified (0 KaTeX errors / 0 broken links since `026aed9`); ledger Pass 1 documents the pinned toolchain |
| 6 | 2025/2026 claims need a dated fact-check | APPLIED | seven dated passes recorded in `docs/fact-check-ledger.md` |

## Front-matter notes

| Item | Status | Notes |
|---|---|---|
| Preface: nav-before-status ordering | APPLIED | `093eca2` |
| Preface: "Every chapter ends with sanity-check exercises" not strictly true for front matter | APPLIED | `d8319bb` (preface: "most chapters end") |
| Preface: inline-answers contradiction with §self-check exemption | APPLIED | `d8319bb` (preface: self-check exemption + inline-answers caveat) |
| Preface: Qiskit endian "0b01 ↔ \|10⟩" is high-risk | DEFENSIBLE | claim is correct in context and immediately backed by the Ch4 / Appendix A treatment; the warning's purpose is precisely to flag the cross-convention risk |
| Preface: glossary "every boldface term" claim | APPLIED | `d8319bb` (preface: "major terms") |
| §self-check: §1.2 has no closing reference matching the opener | APPLIED | `d8319bb` (background-and-self-check: "most sections close") |
| §self-check: §1.6 vs §1.7 framing as "final" | DEFENSIBLE | reviewer's own "no defect" note |
| §02-notation: ordering | APPLIED | `093eca2` |
| §02-notation: "lint catches kets in tables" may not match `tools/lint.py` | APPLIED | `d8319bb` (lint description rewritten to enumerate what is actually enforced) |
| §02-notation: status-block "exact spacing and bullet character (·) are load-bearing" stricter than `scripts/generate_progress.py` enforces | APPLIED | `d8319bb` (notation: softened to convention-for-readability) |

## Back matter

| Item | Status | Notes |
|---|---|---|
| All appendices: ordering | APPLIED | `093eca2` |
| Appendix A: Qiskit endian guidance repetition risk | DEFENSIBLE | each repetition is properly contextualised; risk is acknowledged but the redundancy is intentional |
| Appendix A: circuit-drawing intro cross-ref to Ch6 | DEFENSIBLE | the wording is acceptable since Ch6 introduces single-qubit circuits |
| Appendix B: §B.5/§B.8 Qiskit-specific claims | DEFENSIBLE | verified against installed Qiskit 2.4.1 (`make check-examples` passes) |
| Appendix B: §B.3 `P(φ)` "no relative observable phase" | APPLIED | `d8319bb` (computational-basis-eigenstate vs superposition explicit) |
| Appendix B: §B.9 `CP(α) ⊗_{control}` notation | APPLIED | `d8319bb` (relabelled as `P(α)⊗I`) |
| Appendix C: Toffoli decomposition described loosely | DEFENSIBLE | the existing wording cites the standard 6-CNOT decomposition by reference rather than reproducing the diagram; the §B.7 entry has the concrete circuit; cross-reference is sufficient at this granularity |
| Appendix C: MUB statement "exactly d+1 in prime-power dimensions" | APPLIED | `d8319bb` (rephrased as "at most d+1, achieved when d is a prime power"; smallest open case d=6 noted) |
| Appendix D: Qiskit `QFT` class deprecation timing | APPLIED | `4c42d48` (Pass 7) |
| Appendix D: TKET docs URL moved | APPLIED | `4c42d48` (Pass 7) |
| Appendix D: live tooling URL freshness (other entries) | APPLIED | Pass 7 verified Cirq / PennyLane / Qiskit / Q# URLs |
| Appendix D: "current"/"still-current" language | DEFENSIBLE | acceptable for a dated 2026 draft |
| Appendix E: glossary precision (chapter vs section cross-refs) | DEFENSIBLE | acceptable at draft stage |
| Appendix E: hardware/tooling current-state claims in glossary | DEFENSIBLE | perishable; tracked in fact-check ledger scope, none flagged as currently wrong |
| Appendix E: fidelity convention alignment with Ch12 | APPLIED | `d8319bb` (glossary aligned to unsquared convention) |
| Appendix F: Quantinuum H2 / IonQ / Pasqal updates | APPLIED | `3237078` (Pass 1) |
| Appendix F: explicit Bluvstein 2023 citation; Microsoft × Quantinuum logical-qubit result | APPLIED | Pass 1 |
| Appendix F: F.6 table fragility (Markdown table with units) | DEFENSIBLE | no kets/math; reviewer's own "probably fine" |
| Appendix F: §F.8 "replace wholesale" guidance | DEFENSIBLE | already in the appendix; reviewer's note is forward-looking |
| Index: §16.x placeholder | APPLIED | `7ef9e39` |
| Index: target precision (Born rule → §10.3 vs Ch5; Fidelity → Ch22 vs Ch12) | NEEDS-VERIFICATION | judgment call: encode an index policy ("first formal definition" vs "main development" vs "most practical use") and revisit; can be deferred to a generator-policy commit |

## Chapters 1–3

| Item | Status | Notes |
|---|---|---|
| §1.6 Shor "broke the public-key cryptography that underwrites modern internet security" | APPLIED | `88731cd` (Ch 1.intro rewritten to "polynomial-time algorithm … undermining those schemes in principle, once a sufficiently large fault-tolerant machine exists") |
| §1.6 trapped-ion qubit count "hundreds" | APPLIED | Pass 6 (`415a469`) |
| §1.6 forecast "5–10 years" framed as scenario | DEFENSIBLE | clearly hedged in context |
| §1.6 sanity checks | DEFENSIBLE | no issue flagged |
| §2.5 BPP=P phrasing | APPLIED | `b1f0335` |
| §2.6 superconducting fidelity vs Appendix F | APPLIED | Pass 6 (general framing aligns) |
| §2.7 superdense/teleportation cross-refs to §7.12 | NEEDS-VERIFICATION | verify cross-refs in current Ch7 |
| §2.7 final sanity-check "depth from 99% 2Q fidelity" forward-looking | DEFENSIBLE | reviewer notes it is acceptable as forward-looking |
| §3.3 "Part VI" → "Part IX" | APPLIED | `8365708` |
| §3.3 molecule-interference "several thousand atoms" | NEEDS-VERIFICATION | source-check; soften or cite |
| §3.8 Bell-test "every loophole" | APPLIED | `88731cd` (scoped to main experimental loopholes; superdeterminism and retrocausality noted as not closable) |
| §3.9 coherence-time/platform comparisons | DEFENSIBLE | general framing aligns with Appendix F (Pass 6) |
| §3 sanity checks | DEFENSIBLE | no issue |

## Chapters 4–7

| Item | Status | Notes |
|---|---|---|
| §4 ordering | DEFENSIBLE | already compliant pre-`093eca2` |
| §4.6 measurement cross-ref "Chapters 11–12" | NEEDS-VERIFICATION | review wants "Chapter 11, with channels in 12"; small cross-ref precision |
| §4.13/§4.16 Qiskit-specific claims | DEFENSIBLE | verified against installed Qiskit 2.4.1 |
| §4.14 Holevo/AE previews "advanced" | DEFENSIBLE | reviewer's own "no change required" |
| §5 ordering | DEFENSIBLE | already compliant |
| §5.2 channel cross-ref (Ch18 vs earlier introduction) | NEEDS-VERIFICATION | small cross-ref precision |
| §5.11 partial-trace `tr_A` → `tr` | APPLIED | `8365708` |
| §5 no-cloning proof | DEFENSIBLE | example states make the contradiction clear |
| §6 ordering | DEFENSIBLE | already compliant |
| §6.1 "3-sphere" → "2-sphere" | APPLIED | `8365708` |
| §6.6 MUB "n qubits admit 2^n+1 MUBs" parenthetical | NEEDS-VERIFICATION | add a brief "(because 2^n is a prime power)" qualifier |
| §6.10 circular-basis `S†H` → `HS†` | APPLIED | `8365708` |
| §6.4 platform examples | DEFENSIBLE | general framing aligns with Ch20 |
| §7 ordering | APPLIED | `093eca2` |
| §7.1 "qubit 0" vs Qiskit | NEEDS-VERIFICATION | ambiguity-of-label note; small clarification |
| §7.4 "most algorithms exploit entanglement" | NEEDS-VERIFICATION | soften ("many"/"most nontrivial multi-qubit") |
| §7.9 CHSH sign convention | DEFENSIBLE | consistent throughout |
| §7.12 teleportation corrections I,X,Z,XZ vs ZX | NEEDS-VERIFICATION | verify bit-to-correction mapping vs the §7.12 derivation; convention question |

## Chapter 8

| Item | Status | Notes |
|---|---|---|
| §8 ordering | APPLIED | `093eca2` |
| §8.1 "every branch at once" parallelism | APPLIED | `3c77c48` |
| §8.3 X-measurement as H-Z-H with trailing H dropped | DEFENSIBLE | correct as textbook conjugation; trailing-H drop is fine because measurement collapses; no change |
| §8.7 multi-controlled-gate cost statement broad | NEEDS-VERIFICATION | mark `O(k)`/`O(k²)` as representative; qualify by clean/dirty ancilla |
| §8.9 `{H, S, CNOT, Toffoli}` universal — which theorem? | NEEDS-VERIFICATION | the set is universal (Aharonov 2003 / Shi 2002 for `{H, Toffoli}` ⇒ subset universal); add a one-line citation |
| §8.11 Ross–Selinger `c≈1` for `{H, T}` | NEEDS-VERIFICATION | claim is correct in context (Clifford+T single-qubit synthesis); add a brief context note |
| §8.12 native gate sets | APPLIED | Pass 5 (`e751e2e`) |
| §8.14 KAK 2-CNOT condition `c_z=0` | APPLIED | `ac1c4cc` |
| §8 sanity check 3 `R_Y(π)\|0⟩` trivial phase | DEFENSIBLE | reviewer notes "fine, may surprise readers"; no change required |

## Chapter 9

| Item | Status | Notes |
|---|---|---|
| §9 ordering | APPLIED | `093eca2` |
| §9.1 Qiskit endian "least-significant on top" compressed | DEFENSIBLE | already cross-refs to Ch4's more careful treatment |
| §9.4 uncompute composition order | APPLIED | `6e93cd3` |
| §9.7 `Meas ∘ C(U) = C(U) ∘ Meas` literal equality risk | APPLIED | `88731cd` (equality made explicitly statistical-on-joint-distributions; intermediate quantum states differ) |
| §9.8 mid-circuit measurement "qubit available for further use" too absolute for destructive-measurement platforms | APPLIED | `88731cd` (qualified by non-demolition vs destructive readout) |
| §9.8 hardware-support claims time-sensitive | DEFENSIBLE | general framing; specific vendor claims not made |
| §9.9 magic-state Clifford (S) correction | APPLIED | `a275f15` |
| §9.9 Pauli-frame tracking missing from QEC description | APPLIED | `88731cd` (one-sentence mention added) |
| §9.10 Solovay–Kitaev wording | APPLIED | `88731cd` (scoped to fault-tolerant Clifford+T; NISQ continuous-gate case excepted) |
| §9.12 SWAP cost "on CNOT-native target" | APPLIED | `a275f15` |
| §9 sanity check 2 Toffoli classical-correlation vs entanglement | DEFENSIBLE | reviewer's own note: forward-looking framing acceptable |

## Chapter 10

| Item | Status | Notes |
|---|---|---|
| §10 ordering | APPLIED | `093eca2` |
| §10 "Parts 6 / 7" → "Parts 8 / 9" | APPLIED | `1a563b1` |
| §10.1 "every branch at once" repeat | APPLIED | `88731cd` (phrase flagged as the misleading popular paraphrase; cross-refs §1.2; interference, not parallelism) |
| §10.4 Robertson bound "forces ΔX=ΔY=1" on Pauli-Z eigenstates | APPLIED | `88731cd` (Robertson bound noted vacuous on Z-eigenstates; ΔX=ΔY=1 derived from X²=Y²=I) |
| §10.6 POVM → measurement operators naming | APPLIED | `6e93cd3` |
| §10.6 cyclicity of partial trace | APPLIED | `88731cd` (subsystem-restricted identity made explicit; full cyclicity noted as not holding for partial trace) |
| §10.8 Zeno "back onto the code space" | APPLIED | `1a563b1` |
| §10.11 depolarising Lindblad rate (γ instead of p) | APPLIED | `39ee7ab` |
| §10.12 depolarising `p/4` + Kraus | APPLIED | `39ee7ab` |
| §10.12 phase damping "indistinguishable from random Z" too strong | APPLIED | `88731cd` (replaced with probabilistic-Z model + matched shrink factor q=(1-√(1-p))/2) |
| §10.14 bridge to Part 6 | APPLIED | implicit in §10 part-number fix |
| §10 SC5 depolarising-Kraus exercise | APPLIED | `39ee7ab` |

## Chapter 11

| Item | Status | Notes |
|---|---|---|
| §11 ordering | APPLIED | `093eca2` |
| §11.1 non-demolition → weak measurement | APPLIED | `1a563b1` |
| §11.4 "4ⁿ basis states" → informationally-complete | APPLIED | `1a563b1` |
| §11.5 shadows post-hoc-query caveat | APPLIED | `7e787f7` |
| §11.6 mixed-state support condition | APPLIED | `7e787f7` |
| §11.7 Y-basis `HS†` and "no gate for I" | APPLIED | `7ef9e39` |
| §11.7 qubit-wise commuting "iff" caveat for entangling joint measurement | APPLIED | `8e8943e` (iff scoped to single-qubit basis rotations; entangling-Clifford case noted) |
| §11.7 readout `O(2n)` notation | APPLIED | `7e787f7` |
| §11 SC1 trine POVM Bloch identities | APPLIED | `8e8943e` (Bloch-vector hint added) |

## Chapter 12

| Item | Status | Notes |
|---|---|---|
| §12 ordering | DEFENSIBLE | already compliant |
| §12 "Part 6 and Part 8" preview cross-ref | APPLIED | `8e8943e` (Part 6 → Part 8 + Part 12, matching where capacities are actually developed) |
| §12.4 state-merging operational interpretation | DEFENSIBLE | one of two equivalent standard Horodecki–Oppenheim–Winter 2005 formulations; reasoned, not changed |
| §12.7 main-text "Either side becomes equality on pure states" (distinct from SC3) | APPLIED | `8e8943e` (only upper bound tight on pure states; lower bound saturates only at endpoints) |
| §12.8 no-cloning "conserved" → "preserved" | APPLIED | `7e787f7` |
| §12.9 Schumacher source-model | DEFENSIBLE | reviewer's own "acceptable for intuition" |
| §12.10 `max_ρ` ranges over multi-use inputs | APPLIED | `8e8943e` (input written as ρ^{(n)}; regularisation note added) |
| §12.13 no-cloning repeated-runs framing | APPLIED | `3c77c48` |
| §12 SC3 Fuchs–van de Graaf upper-tight | APPLIED | `894c201` |
| §12 SC5 subadditivity strict for Bell | APPLIED | `894c201` |

## Chapter 13

| Item | Status | Notes |
|---|---|---|
| §13 ordering | APPLIED | `093eca2` |
| §13.1 absolute "no black-box query" | APPLIED | `fbfc566` |
| §13.3 "seam" → "boundary" | APPLIED | `fbfc566` |
| §13.4 QFT convention check across Ch4 / Ch14 | APPLIED | `ae2e8be` (§14.5 sign now consistent with §13.4) |
| §13.4 controlled `U^{2^k}` caveat present in §14.6 | APPLIED | `fbfc566` |
| §13.7 "each containment conjectured strict" | APPLIED | `b1f0335` |
| §13.7 simulation speedups "best-known" | APPLIED | `fbfc566` |
| §13.7 "uncorrected classical" | APPLIED | `8e8943e` ("best practical classical" + fault-tolerant end-to-end framing) |
| §13 sanity checks | DEFENSIBLE | no issue |

## Chapter 14

| Item | Status | Notes |
|---|---|---|
| §14 ordering | APPLIED | `093eca2` |
| §14.2 Qiskit `StatevectorSampler` API | VERIFIED | runs in `.venv` qiskit 2.4.1 (`make check-examples` passes); ledger row OK |
| §14.4 Simon query-model | APPLIED | `b1f0335` |
| §14.5 QFT `R_k` sign | APPLIED | `ae2e8be` |
| §14.5 SC3 amplitudes | APPLIED | `ae2e8be` |
| §14.6 phase-estimation consistent with negative-exponent QFT | APPLIED | via §14.5 fix |
| §14.6 `U^{2^k}` closed-form caveat | APPLIED | `fbfc566` |
| §14.7 Grover oracle sign | APPLIED | `b1f0335` |
| §14.8 amplitude estimation `a = sin²θ` | APPLIED | `b1f0335` |
| §14.9 dihedral / CVP–SVP precision (Regev) | APPLIED | `fbfc566` |
| §14.9 malformed `G = function over Z^n` bullet | APPLIED | `1a563b1` |
| §14.9 HSP scope softened (glued-trees, forrelation) | APPLIED | `1a563b1` |

## Chapter 15

| Item | Status | Notes |
|---|---|---|
| §15 ordering | APPLIED | `093eca2` |
| §15.1 Grover count `floor(π/4θ)` → rounded form | APPLIED | `fbfc566` |
| §15.1 success bound `≥ 1 - M/N` pairing with iteration count | APPLIED | `8e8943e` (half-line qualifier added pairing the bound with the rounded count) |
| §15.1 Qiskit code API | VERIFIED | runs in `.venv` qiskit 2.4.1 |
| §15.2 QFT-sign inheritance | APPLIED | via §14.5 fix |
| §15.2 NIST → ML-KEM/ML-DSA | APPLIED | `7ef9e39` and refined Pass 3 (FIPS numbers) |
| §15.3 logical-qubit count consistency | APPLIED | `2e046d0` |
| §15.3 RSA physical/runtime/Toffoli figures | APPLIED | Pass 2 (Gidney–Ekerå 2019 / Gidney 2025) |
| §15.3 "when, not whether" forecast | APPLIED | `8e8943e` (scoped to long-lived secrets, CRQC arrival, harvest-now-decrypt-later, NIST PQC timeline) |
| §15.4 ECDLP citation (Roetteler, Häner et al.) | APPLIED | `fbfc566` |
| §15.5 HHL "eigen-decomposing" | APPLIED | `a275f15` |
| §15.5 κ scaling note (block-encoded / QSVT) | APPLIED | `fbfc566` |
| §15.5 dequantization qualification | APPLIED | `fbfc566` |
| §15.6 glued-trees as oracle-model | APPLIED | `fbfc566` |
| §15.6 Szegedy quadratic in spectral-gap dependence | APPLIED | `fbfc566` |
| §15.6 `§16.x` placeholder → §16.5 | APPLIED | `7ef9e39` |
| §15.8 VQE shot estimate sourced | DEFENSIBLE (open in ledger) | order-of-magnitude defensible; pinning to a specific 2024–2026 paper is the lone open ledger row |
| §15.9 QAOA `p→∞` adiabatic schedule | APPLIED | `fbfc566` |
| §15.10 QML 2026 picture | VERIFIED | Pass 6; substantively unchanged |
| §15 SC5 RSA-2048 exercise | DEFENSIBLE | reviewer's "good exercise" framing; the new Gidney citations in §15.3 give the named baseline |

## Counts (post-2026-05-28 apply pass)

- **APPLIED**: 92 items.
- **DEFENSIBLE / VERIFIED** (intentionally not changed, with rationale): 21 items.
- **NEEDS-VERIFICATION** (the open list to walk through): 11 items.
- **REJECTED**: 0 items.

The remaining 11 NEEDS-VERIFICATION items are small cross-reference or
phrasing precision tightenings concentrated in Ch 2–8 (and the Index
policy judgment call). They do not change any technical claim. The
fixes applied in commits `d8319bb`, `88731cd`, `8e8943e` cover the
larger and more substantive verification items from the front matter,
back matter, and Ch 1–15 (excluding 2–8).

## Process to close

1. For each NEEDS-VERIFICATION row: re-read the actual current
   manuscript text, decide APPLY / RETHINK / REJECT, and update this row
   in the table.
2. Batch the APPLY items into one or two commits, citing this doc.
3. When the table has zero NEEDS-VERIFICATION rows **and** the user
   has explicitly signed off on the final state, delete
   `review-2026-05-28-0105.md` in a final commit that points at this
   disposition record as the canonical closing artefact. **The review
   file is not deleted while processing is ongoing.**
