# Experiment — Triage Quality Across Four Models (2026-07-09)

**Question:** if the whole-book cold-reader triage (F1) is run by a single agent, how much does
the model choice change the result? Deploy four agents — **Haiku 4.5, Sonnet 5, Opus 4.8,
Fable 5** — with a byte-identical triage prompt, identical rubric (five 0–3 dimensions,
Green/Yellow/Red, Chapter 1 as the Green anchor, fixed output schema), and one identical input
file: the Historical Prelude (`00-historical-prelude.md`, 528 lines). Then verify every cited
finding against the actual text and compare.

**Caveat up front:** n = 1 (one file, one run each; no temperature control across models). This
measures *dispersion and failure modes*, not a definitive ranking. It is enough to set an
operating rule for the 48-file pass and to know what to distrust.

---

## 1. Raw results

| Model | Verdict | D1 | D2 | D3 | D4 | D5 | Total | Tokens | Tool calls | Wall |
|-------|---------|----|----|----|----|----|-------|--------|-----------|------|
| Haiku 4.5 | **YELLOW** | 1 | 1 | 2 | 1 | 0 | **5** | 53k | 4 | 100 s |
| Opus 4.8 | **YELLOW** | 2 | 2 | 1 | 1 | 0 | **6** | 67k | 4 | 126 s |
| Sonnet 5 | **YELLOW** | 2 | 2 | 2 | 2 | 1 | **9** | 73k | 4 | 141 s |
| Fable 5 | **YELLOW** | 2 | 2 | 2 | 2 | 1 | **9** | 67k | 3 | 89 s |

**Verdict: unanimous YELLOW.** The coarse Green/Yellow/Red bucket — the thing the triage
actually routes on — was model-invariant. Even the cheapest model landed the correct bucket.

**Severity: not invariant.** Total scores span 5–9, an ~1.8× spread. The two larger
general-purpose models (Sonnet, Fable) scored harshest (9); Opus scored conservatively (6);
Haiku lightest (5).

## 2. Ground-truth verification of the cited findings

Every nonzero-score finding was checked against the current file. Results:

| Real defect (verified) | Lines | Haiku | Opus | Sonnet | Fable |
|---|---|:---:|:---:|:---:|:---:|
| Meta-heavy opening (D1/D2) | 7–41 | ✓ | ✓ | ✓ | ✓ |
| **Prose-stuffed tables** (technology + algorithm) | 211–217, 329–336 | **✗ (called them "good")** | ✓ | ✓ | ✓ |
| **`no-cloning` used 84 lines before its definition** | 181 → 265 | ✗ | ✗ | **✓** | **✓** |
| `phase kickback` used only as an undefined table label | 332 | ✗ | ✗ | **✓ (unique)** | ✗ |
| `[X,Z]=−2iY` / Pauli forward-pointer unparseable cold | 123 | ✗ | **✓** | ✗ | ✓ |
| `⟨E⟩` expectation notation unglossed | 71 | **✓ (unique)** | ✗ | ✗ | ✗ |
| `QKD` acronym used before expansion | 185 → 271 | ✗ | ✗ | ✗ | ✓ |
| Liouville's theorem named, unglossed (borderline) | 47 | ✓ | ✗ | ✓ | ✗ |
| Density operators defined by properties, no operational gloss | 137 | ✗ | ✗ | ✓ | ✓ |

**False positives / errors found in verification:**
- **Haiku** — two serious errors. (1) It scored the prose tables as *"concise scannable cells,
  not sentence prose — good"* — a **false negative on the exact Class-D defect this whole
  investigation exists to catch** (the cells verifiably carry full sentences, e.g. "The
  classical computer itself is a quantum-engineered device; gate-model qubits, when built on
  silicon, reuse the fabrication base"). (2) Its headline D3 example — commutator `[x,p]` "with
  no gloss" — is a **false positive**: the text glosses it inline at the same spot
  (`[x, p] = xp − px = iℏ`). Haiku's line numbers, contrary to my first impression, were
  actually current (⟨E⟩ at 71 ✓, tables at 211–217 ✓) — the problem was judgment, not stale
  input.
- **Fable** — harshest and broadest; ~1–2 over-reaches. It claimed "qubit / gate /
  computational basis are never operationally glossed anywhere in the file," but the file has a
  survival-definitions block (93–99), glosses "qubit registers" and "two-level systems," and
  operationally defines Hilbert space at 137; and it cited a "Postulate 2 (line 251)" that does
  not appear as such. Its real findings are sound; the noise is over-application of the rubric.
- **Opus** — no false positives; every cited finding verified. But it *missed the two
  highest-value findings* (no-cloning forward-reference, phase-kickback label) by weighting D3
  as "minor, mid-chapter, experienced reader."
- **Sonnet** — **no false positives, highest true-positive recall**, and the *only* model to
  catch the phase-kickback table-label defect. Cleanest result of the four.

## 3. What the spread means

**The single most discriminating finding was the cross-section dependency** — `no-cloning`
invoked at line 181 (Episode II) and not defined until line 265 (Episode III), ~84 lines and a
full episode later. Catching it requires holding the *whole file* in view and connecting a use
to a distant definition. **Only the two larger general models (Sonnet, Fable) made that
connection.** This is exactly the class of defect the cold-reader pass is meant to find, and it
is precisely where the cheaper model failed.

**Opus is the interesting case.** It is the flagship, it made zero errors, and it still scored
lightest of the "big three" because it *calibrated severity down*, not because it saw less. For
a *ranking* task that would be a virtue. For a *triage* task the goal is **recall — catch
everything, let the human down-weight later** — so Opus's conservatism is a mild
mismatch here: it correctly bucketed YELLOW but would have handed the fix stage a shorter
worklist. Higher-recall-at-equal-precision (Sonnet) is what triage wants.

**Haiku is disqualified for judgment triage.** It missed both defining findings and, worse,
actively mis-scored the prose-table defect as acceptable — a false negative on the founding
symptom of this entire effort. It remains perfectly good for the *mechanical* layer (the
`reader_lint.py` regression guards), where the checks are deterministic and don't need
holistic reading.

## 4. Operating rule for the 48-file triage pass

1. **Primary model: Sonnet 5.** Best recall, zero false positives on this file, and
   cheaper/faster than Opus. It is the workhorse for the full 48-file pass.
2. **Second opinion on entry-path / high-value chapters: union Sonnet 5 + Fable 5.** They agreed
   on the hardest finding and each caught something the other lacked (Sonnet: phase kickback;
   Fable: QKD acronym). Union the findings; the orchestrator reconciles Fable's over-reach.
3. **Do not use Haiku 4.5 for judgment triage** — relegate it to the deterministic
   `reader_lint.py` regression layer.
4. **Opus 4.8 as an escalation, not the default** — reserve for adjudicating a chapter where
   Sonnet/Fable disagree, where its zero-error precision and conservative calibration break ties.
5. **The orchestrator verifies every finding against the text regardless of model.** This run
   proves it is non-negotiable: even the best model needs the line-check (Haiku's inline-gloss
   false positive, Fable's "qubit never glossed" over-reach). Verdicts a model reports are
   *candidate* findings until anchored to a quote.

## 5. Second-order observations

- **Verdict robustness is the reassuring result:** the routing decision (G/Y/R) is stable across
  a 4× price range. If all we needed were the bucket, any model would do. We need the *findings*,
  which is where model choice bites.
- **Cost was not the differentiator** — token use clustered at 53–73k for all four; Fable was
  actually the fastest (89 s) and Sonnet the slowest (141 s). Quality tracked reasoning depth,
  not spend.
- **This validates the project's standing rule** that reviews are candidate input until
  verified — the same discipline applied to the 44-item fact-check pass. A triage model is a
  finding *generator*, not a finding *authority*.
- **One methodological note for the real pass:** giving each agent the *line-numbered* file
  (not raw) would let the orchestrator machine-diff the cited lines, turning finding-verification
  from manual grep into a scripted cross-check. Worth doing for 48 files.
