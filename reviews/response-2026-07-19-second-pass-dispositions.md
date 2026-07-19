# Second-Pass Review — Fix Dispositions

- Companion to: `reviews/review-2026-07-19_01-20-35_CEST.md` (the in-progress
  comprehensive review ledger; that file is the reviewer's and is never edited here)
- Method: insert-only. Each batch below covers one manuscript file whose second
  pass the ledger marks complete. Fixes are applied only to files in that stable
  zone, staying behind the review front.
- Governing rule (agreed 2026-07-19): **truth is not negotiable; only depth is.**
  Every finding of the form "this statement is false" is fixed. Discretion applies
  only to *how much* of the truth is served at each point — by scoping the claim,
  labelling idealisations as idealisations, or narrowing a universal to the cases
  the book actually uses — never by leaving a false sentence in place for
  readability or entertainment.
- Disposition vocabulary: **FIXED** (text corrected), **DEFERRED-FACTCHECK**
  (needs dated source verification — routed to the factcheck programme, wording
  left or minimally hedged), **ADJUDICATED** (no change, reason given),
  **AUTHOR-DECISION** (structural/editorial call flagged to the author).

## Batch 0 — tooling (commit a606ac9)

- `generate_progress.py` completed-state bug — **FIXED** (derives from
  STATE_ORDER; PROGRESS.md regenerated, now 48/48 draft-or-later).
- `factcheck_lint.py` misleading unqualified PASS over 3-card pilot — **FIXED**
  (summary now states partial coverage and counts unlinted interim-format files).
- `factcheck_anchors.py` SyntaxWarning — **FIXED** (raw docstring).

## Batch 1 — Historical Prelude (54 substitutions)

### FIXED — outright defects
- BB84 listed in the entanglement-becomes-operational arc (§0.6 closing) —
  replaced with entanglement-based key distribution in the style of E91.
- Shannon entropy described as "the average length of the shortest binary
  encoding" — now a lower bound, achievable per symbol in the long-block limit.
- AND-gate irreversibility miscounted as "the discarded bit" — now two-bits-to-one
  with the lost distinction quantified as more than one bit on typical
  distributions.
- Anomaly count ("the four anomalies" after a three-item list) — atomic
  stability added to the first list with its post-1911 chronology flagged;
  "three interfaces" corrected to two pre-1900 interfaces plus the
  measurement interface exposed later by the formalism itself.
- "Sub-millikelvin" superconducting control — corrected to millikelvin
  (dilution refrigerators at 10–20 mK).
- Trapped-ion species uniformly described as hyperfine qubits — `⁴⁰Ca⁺`
  (no nuclear spin) now correctly carries an optical/Zeeman qubit.
- Shor "breaks discrete logarithm in arbitrary groups" — scoped to deployed
  finite-field/elliptic-curve groups and finite abelian groups with efficient
  operations.
- Photons travel through fibre "with little loss" — corrected to low
  per-kilometre loss that compounds with distance.
- p-value gloss ("the chance that a locally classical world would by accident
  produce...") — replaced with a correct tail-probability statement and an
  explicit warning against the inverse-probability misreading.
- Steane as "the seed" of CSS — now independent Calderbank–Shor and Steane
  (1996); CSS error-correcting power tied to the distances of `C_1`/`C_2^⊥`
  (convention `C_2 ⊆ C_1` verified correct against the standard construction
  and kept).
- Majorana zero modes described as non-abelian anyons with
  protection-implies-computation — now conditional on unambiguous realisation,
  with braiding explicitly a non-universal (supplemented) gate set.
- Surface code as "dominant target for superconducting **and trapped-ion**"
  platforms — scoped to superconducting; ion connectivity note added.
  Bivariate-bicycle claim softened to reported thresholds/rate with
  engineering caveats.

### FIXED — epistemic scoping (claim true only after narrowing)
- Classical separability/commutativity "assumptions" scoped (joint state =
  parts + correlations; commutativity for idealised non-disturbing
  measurements).
- 1894 confidence quote attributed to Michelson (with the routine Kelvin
  misattribution noted); Kelvin "two clouds" de-quoted to paraphrase; the
  clouds flagged as related warning signs, not a map of the anomaly list.
- Rutherford: gold foil showed the nucleus; planetary orbits marked as the
  adopted interpretation; collapse time marked as an estimate.
- Hydrogen: "normalisable solutions only for discrete energies" scoped to
  bound states, continuum noted.
- EPR correlations "no analogue in any classical joint distribution" —
  harmonised with the correct incompatible-settings statement (same-basis
  agreement is classically easy).
- Aspect: "first experiments specifically designed to close the locality
  loophole" and "ensured no signal" — now in-flight switching targeting the
  loophole, with the periodic-switching caveat stated.
- 2015 tests: freedom-of-choice "closed to a strong degree" → constrained;
  "ruled out every local hidden-variable theory" retains loophole + statistical
  assumptions.
- Superdense coding "no purely classical protocol can match" — resource
  accounting (pre-shared ebit charged) made explicit.
- Teleportation "quantum step is instantaneous" — replaced with
  operationally-undetectable-until-classical-bits phrasing.
- E91 "no eavesdropper has tampered" — violation bounds Eve's information
  under protocol assumptions.
- Church–Turing thesis as "empirical observation no proposal has broken" —
  now the effectively-calculable ↔ Turing-computable identification supported
  by convergence of formalisms; quantum challenge scoped to the extended
  thesis's efficient-classical-simulation form.
- "Randomness strictly more practical" — replaced with open P-vs-BPP framing.
- Landauer: `k_B` notation, quasistatic-limit scoping, known-bit reset
  wording tightened; demon exorcism marked as the idealised
  reversible-measurement analysis; "no thermodynamic minimum cost at all" →
  no Landauer lower bound from logical erasure.
- Uncomputation description — now compute–copy–uncompute (CNOT for
  basis-valued data), fixing the leave-result-untouched oversimplification;
  "rehearsed exactly" de-absolutised.
- Feynman: "nature gets for free" → dynamics enacts without explicit
  amplitude storage; "no known classical algorithm beats this" scoped to
  full-state accuracy with a Chapter 24 pointer; "intractable" →
  appears exponentially costly.
- Deutsch's query conclusion scoped to the deterministic classical comparison.
- Oracle separations: "turns into a real-world speedup" → *can* turn into,
  with oracle-implementation and classical-baseline costs named.
- Grover key-doubling — now a rule of thumb with parallelisation/circuit-cost
  and collision-vs-preimage caveats.
- HHL — conditional speedup template with the fine print named in place.
- "Qubit-efficient methods" (vague) → post-Trotter methods of Chapter 16.
- Carry-forward bullets: postulates as idealised codification (not raw
  survivors); entanglement no longer "behind most algorithmic speedups"
  (model-dependent, Chapter 13 pointer).
- Named-critic citation (Henry Legg) in the Majorana bullet — replaced with
  the technical substance of the objection, unnamed.
- Source-note preamble "not in serious dispute" — now admits where nuance
  lives (priority, Bell statistics, recent company claims).
- Inheritance table: ultracold gases row relabelled (atomic physics simulating
  condensed matter); dispersive readout attributed to microwave, not laser,
  technology.

### DEFERRED-FACTCHECK (dated source verification required)
- Tsirelson bound dating/transliteration; the `10⁻¹¹ s` collapse estimate's
  canonical source; QAOA year/author standardisation; FIPS 206 / HQC status as
  of July 2026; Majorana 1/2 primary sources, access dates, and replication
  status; "highest demonstrated fidelity" superlatives (metric + date);
  QKD distance claims (deployed fibre vs. lab spools vs. satellite);
  Willow/below-threshold cross-platform synthesis; Cirac–Zoller "first
  blueprint" priority. These are already flagged in the ledger and belong to
  the factcheck programme's dated-verification workflow, most against the
  §0.14/§0.15 source-note gap the ledger calls critical.

### AUTHOR-DECISION
- Moving the evolving Majorana case study out of the platform list into
  Appendix F / Chapter 20 (ledger suggestion; changes chapter structure).
- Source-note redesign (per-paragraph citation keys, primary/interpretation
  separation, "as verified on" ledger) — endorsed in principle; belongs with
  the claims-register proposal.

### ADJUDICATED — no change
- "Blatantly non-local" (Bohm) and similar voice choices not judged
  false — kept pending the author's own style pass; the ledger itself asks to
  preserve the chapter's voice.

## Batch 2 — Chapter 1 (24 substitutions)

### FIXED — outright defects
- "Thousands to millions of logical qubits" (twice) — logical/physical
  confusion corrected: thousands of logical, millions of physical.
- IBM Heron placed "in the thousand-physical-qubit range" — corrected to
  Condor (1,121 qubits) as the demonstrator with Heron as the smaller,
  higher-fidelity roadmap line.
- IonQ "#AQ 29" sitting grammatically as a qubit count — now labelled an
  algorithmic-quality benchmark (factcheck anchor requoted, same commit).
- "We are well below threshold on the best devices" from average gate error —
  now: averages below 1% are a necessary milestone; operational
  below-threshold means logical error falling with code distance.
- Comparison sorting "at most polylogarithmic improvements" — corrected:
  quantum comparison-sorting still requires Θ(n log n) comparisons.
- Speedup taxonomy "all are believed, none unconditionally proven" —
  now separates proven quantum runtimes from conjectural advantage.

### FIXED — epistemic scoping
- Feynman "gave a structural reason the answer is no" → appears to be no,
  diagnosis not proof (opening also now names the four papers).
- Hardware "demonstrating the first two regimes" → credible progress toward
  the first regime, with estimates flagged as scenarios.
- Deutsch: modern-clean-form qualifier added (cross-file consistency with the
  Prelude); query conclusion scoped to deterministic classical.
- Grover genericity scoped to the query model with coherent-predicate and
  oracle-cost provisos; SAT/graph speedups scoped to brute force.
- HHL: polynomial dependence on condition number and precision stated in
  place; "speedup vanishes" → fails/degrades depending on assumption.
- FT definition: arbitrarily long computation under below-threshold
  assumptions; 1000:1 ratio marked as commonly quoted and
  architecture-dependent; 10^3–10^4 ratio excludes factories/routing;
  tenfold-reduction target marked goal-not-forecast.
- Bridge premise (a) scoped to generic dynamics under complexity assumptions;
  premise (c) flagged as extrapolation.
- Reading-guide "no mathematics not seen in a popular account" softened.
- Sanity checks 1–4 reworked: dimension-implies-hardness no longer reinforced;
  "the word that replaces parallel" → engineered concept; molecular
  ground-state classification now asks what the answer depends on; missing
  speedups no longer imply structural obstruction.

### DEFERRED-FACTCHECK
- 2^50 "edge of supercomputer memory"; device counts/fidelity figures and
  vendor roadmap claims (H2 at 56, Willow, Atom/QuEra scaling) — tracked in
  the chapter's factcheck mirror with dated re-verification pending.

### ADJUDICATED — no change
- PsiQuantum listed among headline devices: the text already marks it as
  fault-tolerant-targeted rather than NISQ.
- Arabic part labels ("Part 1") — consistent within the file; renaming is a
  book-wide style decision, not a correctness fix.

## Batch 3 — Chapter 2 (32 substitutions)

### FIXED — outright defects
- "Without interference ... BQP collapses to BPP" stated as theorem — replaced
  with the restricted-model statement and a Chapter 17 pointer.
- Measurement as "the only mechanism for ejecting information" and "the only
  non-unitary primitive" (twice) — scoped to the ideal circuit model, with
  reset/discard/environment and mid-circuit measurement acknowledged.
- No-cloning proof summary ("the cloning map is non-linear") — replaced with
  the correct inner-product argument; orthogonal-set copyability added;
  wrong chapter link (Ch7) corrected to §5.13.
- Solovay–Kitaev called "the exact statement" of {H,T,CNOT} universality —
  universality and efficient approximation separated.
- "A classical simulator must store all 2^n amplitudes" — scoped to
  brute-force state-vector simulation; hardware "stores implicitly" replaced
  with no-addressable-copy phrasing.
- Photonics "no decoherence in flight" — corrected (loss, dispersion, mode
  mismatch).
- NV centres implied to be silicon spin qubits — separated.
- QEC needed "always" — corrected to any long computation, with NISQ's
  deliberate QEC-free short circuits noted; QEC chapter link fixed (19, not
  19/21).
- Amplitude-amplification/phase-estimation chapter links corrected
  (§14.7/§14.6 vs Chapter 15 for Grover/Shor).
- Deutsch worked example: "exponentially many computational paths" parallelism
  regression — replaced with the phase-deposit account; separation scoped to
  deterministic classical.
- Row-stochastic matrix vs column-vector convention — orientation fixed.

### FIXED — epistemic scoping
- "Intractable to simulate" → appear intractable under standard assumptions;
  "nothing here is load-bearing" contradiction resolved; phase "affects every
  subsequent operation" scoped to phase-sensitive operations; "evaluates to"
  → yields under computational-basis measurement; path-cancellation example
  marked schematic; Landauer per-bit cost scoped to idealised accounting;
  ancilla uncomputation now copy-then-invert; Hadamard "creates superposition
  and vice versa" → basis-mapping statement; CNOT/XOR embedding made exact;
  "all 2^n states simultaneously" de-metaphored; classical 10^-15/"only
  power matters" figures hedged and correctness engineering acknowledged;
  10^4-gates "randomises the state" → fault-probability statement with
  noise-dependence; gate-budget metric marked first-order proxy; 1M-physical
  → 100–1000-logical marked scenario-dependent; "gone for good" → not
  recoverable from the register; Shannon limit scoped to noiseless channel
  without pre-shared resources; factoring witness given its decision
  formulation and NP∩coNP note; "do not brute-force NP" restated precisely;
  sanity check 5 reworked (fault probability, not "useful depth").

### ADJUDICATED — no change
- "No mainstream classical platform is built around reversible logic" — fair
  as stated.
- Measurement-as-syscall guidance — kept; the mid-circuit reality is
  explicitly cross-referenced.
- Sanity-check block format (`> **Sanity checks.**`) — lint sanctions the
  current form; the STYLE-text-vs-lint drift the ledger suspects is logged
  for the author as an infrastructure question, not silently "fixed".

Six factcheck anchors staled by these edits were requoted in the same commit;
checker baseline (97) restored.
