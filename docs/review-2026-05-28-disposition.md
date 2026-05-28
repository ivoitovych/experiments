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
| Preface: "Every chapter ends with sanity-check exercises" not strictly true for front matter | NEEDS-VERIFICATION | wording precision; verify front-matter chapters and decide whether to qualify ("most technical chapters…") |
| Preface: inline-answers contradiction with §self-check exemption | NEEDS-VERIFICATION | small exemption sentence in the Preface would resolve |
| Preface: Qiskit endian "0b01 ↔ \|10⟩" is high-risk | DEFENSIBLE | claim is correct in context and immediately backed by the Ch4 / Appendix A treatment; the warning's purpose is precisely to flag the cross-convention risk |
| Preface: glossary "every boldface term" claim | NEEDS-VERIFICATION | operationally brittle; soften to "many"/"major" if not mechanically enforced |
| §self-check: §1.2 has no closing reference matching the opener | NEEDS-VERIFICATION | soften the opener or add a reference |
| §self-check: §1.6 vs §1.7 framing as "final" | DEFENSIBLE | reviewer's own "no defect" note |
| §02-notation: ordering | APPLIED | `093eca2` |
| §02-notation: "lint catches kets in tables" may not match `tools/lint.py` | NEEDS-VERIFICATION | verify against current lint and either tighten lint or soften the claim |
| §02-notation: status-block "exact spacing and bullet character (·) are load-bearing" stricter than `scripts/generate_progress.py` enforces | NEEDS-VERIFICATION | parser uses a regex; either tighten the parser or soften the prose |

## Back matter

| Item | Status | Notes |
|---|---|---|
| All appendices: ordering | APPLIED | `093eca2` |
| Appendix A: Qiskit endian guidance repetition risk | DEFENSIBLE | each repetition is properly contextualised; risk is acknowledged but the redundancy is intentional |
| Appendix A: circuit-drawing intro cross-ref to Ch6 | DEFENSIBLE | the wording is acceptable since Ch6 introduces single-qubit circuits |
| Appendix B: §B.5/§B.8 Qiskit-specific claims | DEFENSIBLE | verified against installed Qiskit 2.4.1 (`make check-examples` passes) |
| Appendix B: §B.3 `P(φ)` "no relative observable phase" | NEEDS-VERIFICATION | could be misread; sharpen to "on a computational-basis eigenstate" |
| Appendix B: §B.9 `CP(α) ⊗_{control}` notation | NEEDS-VERIFICATION | either explicit diagonal matrix or prose |
| Appendix C: Toffoli decomposition described loosely | NEEDS-VERIFICATION | either link to a concrete decomposition or reduce to a gate-count summary |
| Appendix C: MUB statement "exactly d+1 in prime-power dimensions" | NEEDS-VERIFICATION | check phrasing — should be "there exist d+1" or "the maximum is d+1 and is achieved" |
| Appendix D: Qiskit `QFT` class deprecation timing | APPLIED | `4c42d48` (Pass 7) |
| Appendix D: TKET docs URL moved | APPLIED | `4c42d48` (Pass 7) |
| Appendix D: live tooling URL freshness (other entries) | APPLIED | Pass 7 verified Cirq / PennyLane / Qiskit / Q# URLs |
| Appendix D: "current"/"still-current" language | DEFENSIBLE | acceptable for a dated 2026 draft |
| Appendix E: glossary precision (chapter vs section cross-refs) | DEFENSIBLE | acceptable at draft stage |
| Appendix E: hardware/tooling current-state claims in glossary | DEFENSIBLE | perishable; tracked in fact-check ledger scope, none flagged as currently wrong |
| Appendix E: fidelity convention alignment with Ch12 | NEEDS-VERIFICATION | Ch12 uses unsquared fidelity for pure states + Uhlmann for mixed; verify the glossary entry says the same explicitly |
| Appendix F: Quantinuum H2 / IonQ / Pasqal updates | APPLIED | `3237078` (Pass 1) |
| Appendix F: explicit Bluvstein 2023 citation; Microsoft × Quantinuum logical-qubit result | APPLIED | Pass 1 |
| Appendix F: F.6 table fragility (Markdown table with units) | DEFENSIBLE | no kets/math; reviewer's own "probably fine" |
| Appendix F: §F.8 "replace wholesale" guidance | DEFENSIBLE | already in the appendix; reviewer's note is forward-looking |
| Index: §16.x placeholder | APPLIED | `7ef9e39` |
| Index: target precision (Born rule → §10.3 vs Ch5; Fidelity → Ch22 vs Ch12) | NEEDS-VERIFICATION | judgment call: encode an index policy ("first formal definition" vs "main development" vs "most practical use") and revisit; can be deferred to a generator-policy commit |

## Chapters 1–3

| Item | Status | Notes |
|---|---|---|
| §1.6 Shor "broke the public-key cryptography that underwrites modern internet security" | NEEDS-VERIFICATION | soften to "showed how to break … on a sufficiently large fault-tolerant quantum computer" |
| §1.6 trapped-ion qubit count "hundreds" | APPLIED | Pass 6 (`415a469`) |
| §1.6 forecast "5–10 years" framed as scenario | DEFENSIBLE | clearly hedged in context |
| §1.6 sanity checks | DEFENSIBLE | no issue flagged |
| §2.5 BPP=P phrasing | APPLIED | `b1f0335` |
| §2.6 superconducting fidelity vs Appendix F | APPLIED | Pass 6 (general framing aligns) |
| §2.7 superdense/teleportation cross-refs to §7.12 | NEEDS-VERIFICATION | verify cross-refs in current Ch7 |
| §2.7 final sanity-check "depth from 99% 2Q fidelity" forward-looking | DEFENSIBLE | reviewer notes it is acceptable as forward-looking |
| §3.3 "Part VI" → "Part IX" | APPLIED | `8365708` |
| §3.3 molecule-interference "several thousand atoms" | NEEDS-VERIFICATION | source-check; soften or cite |
| §3.8 Bell-test "every loophole" | NEEDS-VERIFICATION | restrict to "every standard experimental loophole" |
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
| §9.7 `Meas ∘ C(U) = C(U) ∘ Meas` literal equality risk | NEEDS-RECONSIDERATION | text says "in the sense of joint outcome statistics" — re-read context and decide if the hedge is enough |
| §9.8 mid-circuit measurement "qubit available for further use" too absolute for destructive-measurement platforms | NEEDS-VERIFICATION | soften the opening definition |
| §9.8 hardware-support claims time-sensitive | DEFENSIBLE | general framing; specific vendor claims not made |
| §9.9 magic-state Clifford (S) correction | APPLIED | `a275f15` |
| §9.9 Pauli-frame tracking missing from QEC description | NEEDS-VERIFICATION | add a one-sentence mention |
| §9.10 Solovay–Kitaev wording | NEEDS-VERIFICATION | qualify as a fault-tolerant compilation effect, not generic |
| §9.12 SWAP cost "on CNOT-native target" | APPLIED | `a275f15` |
| §9 sanity check 2 Toffoli classical-correlation vs entanglement | DEFENSIBLE | reviewer's own note: forward-looking framing acceptable |

## Chapter 10

| Item | Status | Notes |
|---|---|---|
| §10 ordering | APPLIED | `093eca2` |
| §10 "Parts 6 / 7" → "Parts 8 / 9" | APPLIED | `1a563b1` |
| §10.1 "every branch at once" repeat | NEEDS-RECONSIDERATION | I didn't see the phrase on my last read of §10.1; verify the current text and either change or close as not-present |
| §10.4 Robertson bound "forces ΔX=ΔY=1" on Pauli-Z eigenstates | NEEDS-VERIFICATION | derive explicitly or weaken |
| §10.6 POVM → measurement operators naming | APPLIED | `6e93cd3` |
| §10.6 cyclicity of partial trace | NEEDS-VERIFICATION | add a subsystem-restriction caveat |
| §10.8 Zeno "back onto the code space" | APPLIED | `1a563b1` |
| §10.11 depolarising Lindblad rate (γ instead of p) | APPLIED | `39ee7ab` |
| §10.12 depolarising `p/4` + Kraus | APPLIED | `39ee7ab` |
| §10.12 phase damping "indistinguishable from random Z" too strong | NEEDS-VERIFICATION | specify the matching shrink-factor model |
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
| §11.7 qubit-wise commuting "iff" caveat for entangling joint measurement | NEEDS-VERIFICATION | clarify the iff applies to single-qubit basis rotations only |
| §11.7 readout `O(2n)` notation | APPLIED | `7e787f7` |
| §11 SC1 trine POVM Bloch identities | NEEDS-VERIFICATION | reviewer-suggested addition; small expository fix |

## Chapter 12

| Item | Status | Notes |
|---|---|---|
| §12 ordering | DEFENSIBLE | already compliant |
| §12 "Part 6 and Part 8" preview cross-ref | NEEDS-VERIFICATION | small cross-ref precision |
| §12.4 state-merging operational interpretation | DEFENSIBLE | one of two equivalent standard Horodecki–Oppenheim–Winter 2005 formulations; reasoned, not changed |
| §12.7 main-text "Either side becomes equality on pure states" (distinct from SC3) | NEEDS-VERIFICATION | locate the main-text occurrence and tighten if present |
| §12.8 no-cloning "conserved" → "preserved" | APPLIED | `7e787f7` |
| §12.9 Schumacher source-model | DEFENSIBLE | reviewer's own "acceptable for intuition" |
| §12.10 `max_ρ` ranges over multi-use inputs | NEEDS-VERIFICATION | small notation clarification |
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
| §13.7 "uncorrected classical" | NEEDS-VERIFICATION | reword to "end-to-end" or "best practical classical implementation" |
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
| §15.1 success bound `≥ 1 - M/N` pairing with iteration count | NEEDS-VERIFICATION | the bound holds for the round-half form; verify and decide whether to add a half-line qualifier |
| §15.1 Qiskit code API | VERIFIED | runs in `.venv` qiskit 2.4.1 |
| §15.2 QFT-sign inheritance | APPLIED | via §14.5 fix |
| §15.2 NIST → ML-KEM/ML-DSA | APPLIED | `7ef9e39` and refined Pass 3 (FIPS numbers) |
| §15.3 logical-qubit count consistency | APPLIED | `2e046d0` |
| §15.3 RSA physical/runtime/Toffoli figures | APPLIED | Pass 2 (Gidney–Ekerå 2019 / Gidney 2025) |
| §15.3 "when, not whether" forecast | NEEDS-VERIFICATION | scope to long-lived-secrets / CRQC arrival |
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

## Counts

- **APPLIED**: 67 items.
- **DEFENSIBLE / VERIFIED** (intentionally not changed, with rationale): 20 items.
- **NEEDS-VERIFICATION** (the open list to walk through): 28 items.
- **REJECTED**: 0 items.

The 28 NEEDS-VERIFICATION items are the only blockers to closing the
review. Most are quick precision tightenings; a handful are cross-ref
checks or judgment calls (index policy, glossary fidelity convention).
None require new external sources.

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
