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

## Batch 4 — Chapter 3 (48 substitutions)

### FIXED — outright defects
- Noncommuting operators claimed to have mutually unbiased eigenbases, and
  measurement in one basis claimed to randomise any state prepared in another
  — both scoped to the Pauli/MUB case, with the correct general statement.
- Perfect same-basis Bell correlations called irreducible to a shared
  classical variable — corrected: a shared coin flip reproduces one-basis
  agreement; the multi-basis pattern is what defeats classical models
  (harmonised with the paragraph's own later sentence).
- Stern–Gerlach narrated as directly measuring the electron's S_z — now the
  atom's magnetic moment, dominated by the unpaired electron; "no
  intermediate value, ever" scoped to resolved outcomes.
- Robertson relation: constant lower bound for spin components replaced with
  the state-dependent bound (ℏ/2)|⟨S_y⟩| and the no-state-makes-both-sharp
  summary.
- "Complex amplitudes are the unique choice" (with popular-book citation) —
  now real-amplitude simulability acknowledged, uniqueness scoped to
  reconstruction-with-extra-axioms.
- PBS "is a perfect projective measurement" — now excellent approximation
  with the engineering gap named; "superpositions are intermediate
  polarizations" corrected to linear/elliptical split.
- Freedom-of-choice listed as closed alongside locality/detection in 2015 —
  now pushed-back-not-closed, cosmic/human-choice tests separated.
- Decoherence definition universalised ("indistinguishable for any
  measurement") — now exact only in the complete-dephasing limit, partial
  decoherence leaves partial interference.
- Coherence-to-gate-time ratio as "how many operations can be applied" —
  now a first-order proxy with the real budget named.
- T_2 ≤ 2T_1 scoped to the standard Markovian two-level model; platform
  coherence table corrected (neutral atoms protocol-dependent, photons
  dephase/lose, NV electron-vs-nuclear split).
- Classical limit "is the limit of very fast decoherence" — now a large part
  of the answer with pointer states/coarse-graining/measurement problem
  named; action ≫ ℏ marked necessary-direction-not-sufficient with the
  superconductivity counterexample.
- "The state vector is the underlying object" — ontology claim reduced to
  formalism's-description with a Chapter 35 pointer.
- Channels chapter references corrected (Chapter 10 for channels/Kraus,
  Chapter 18 for noise phenomenology; twice).
- Which-path "even in principle" absolutism — now visibility-tracks-overlap
  with quantum-erasure accounting; sanity check 2 answer gains the
  ideal-marker assumption.
- Sanity check 3 Bell pair given a definite state (|Φ⁺⟩) so the correlation
  claim is well-defined.

### FIXED — epistemic scoping
- "Physics forces those objects" → makes all but unavoidable; "every
  numerical claim justified locally"/"every experiment transfers without
  modification" → order-of-magnitude precision and lessons-transfer with
  abstraction acknowledged; postulates "minimal description" → compact
  codification, alternatives exist; framing point "projected by
  measurements" → sampled, projectively in this chapter's idealisation;
  quantization "quantities take only discrete values" → system-dependent
  spectra; "spins confined to a projection axis" → component along a chosen
  axis, quadratures stay continuous; phase "invisible to a single
  measurement" → invisible in the amplitude's own basis; amplitudes "become
  probabilities at measurement time" → computed relative to a specified
  measurement, with the nonzero-component and diagonal-operation caveats;
  wavefunction "not a field in any literal sense" → interpretation-flagged;
  "every system that has been tested" → coherence-preserving conditions,
  mass scale growing; "photon is a wave" dichotomy → classical-material-wave
  rejection with amplitude-propagation kept; algorithms exist "because"
  Mach–Zehnder clicks → same underlying fact; measurement section scoped to
  ideal projective with Chapter 11 pointer; 45° analogy flagged as loose;
  "known in advance" → what the quantum state specifies; back-action
  no-refined-apparatus → information-disturbance trade-off; "measure to
  arbitrary precision" → as sharply as apparatus allows; Z/X "cannot" →
  cannot sharply, VQE grouping one-strategy-among-several; entanglement
  "source of every protocol" → powers, pure-state definition scoped;
  SPDC "splits"/BBO "the standard"/"essentially every Bell test" →
  converts/a standard choice/most; rate figures hedged on
  bandwidth/collection/efficiency; Aspect switching caveat unified with the
  Prelude's account; QEC "stretches coherence" → suppresses logical error
  with stretching as payoff; bridge overclaims (projection, classical joint
  distributions, decoherence "dominant on every hardware") scoped; transmon
  "any other two-level system" → effective two-level subsystem; Bloch sphere
  "for the rest of the book" → single-qubit story.

### DEFERRED-FACTCHECK
- Tonomura experiment dating/categorisation details; SPDC rate figures;
  platform coherence numbers; Fein et al. 2019 mass record — all tracked in
  the chapter's factcheck mirror (five anchors requoted this batch, baseline
  97 restored).

### ADJUDICATED — no change
- "Two-level system" for spin-1/2 (the spin degree of freedom does supply
  dimension two); the interference-slogan framing (kept — it is the
  chapter's declared organising device, now with scoped wording around it).

## Batch 5 — Chapter 4 (23 substitutions)

### FIXED — outright defects
- HHL called "the quantum implementation of A⁻¹|b⟩" (twice) — now prepares,
  probabilistically and up to normalisation, a state proportional to it.
- Spectral closed form called "the form actually used in
  Hamiltonian-simulation arguments" — now analysis-vs-algorithm separated:
  algorithms never diagonalise H; they approximate the evolution directly.
- SVD sanity check claiming singular values distinguish
  unitary/Hermitian/projector — corrected: they cannot distinguish X from S;
  Hermiticity is invisible to singular values.
- §4.12 "exactly four objects" and ket-*is*-a-column — now four core
  constructions; ket *represented as* a column once a basis is fixed
  (resolving the section's own coda contradiction); label description
  widened beyond variable names.
- Qiskit mapping "or insert a SWAP" (both §4.8 and §4.16) — representation
  permutation first, circuit SWAP only when a circuit-level transformation
  is required.
- Projector cross-reference (§4.6) corrected to §4.7 + Chapter 5.
- "Whatever you report is an empirical frequency" — widened to
  sample-derived estimators.
- Norms "five distinct roles" — Hilbert–Schmidt norm counted in.
- Von Neumann entropy "diagonal-entry distribution" — now the spectrum
  (basis-independent), not basis-dependent diagonal entries.

### FIXED — epistemic scoping
- QFT/FFT comparison: representation mismatch stated up front (arithmetic
  operations on arrays vs gates on amplitudes); "exact" gate count scoped to
  gate sets with arbitrarily fine rotations, synthesis costs flagged.
- "Every controlled-phase angle needs to be conjugated" → re-derived under
  the chosen convention, conjugation as the generic case.
- Endian note: frameworks "make the opposite choice" → maintain several
  independent ordering conventions.
- "Simulating dynamics reduces to diagonalizing H" → can reduce, when
  feasible (existing hedge strengthened).
- Condition number: 2-norm scoping, "ill-posed" → ill-conditioned.
- Gram–Schmidt "any basis" → any ordered basis, numerical fragility noted.
- "Quantum computing literature is consistent" → almost uniformly.
- Interference "the engine of quantum speedups" → working mechanism behind
  the speedups in this book.
- Mixed-marginal entanglement diagnosis scoped to globally pure states.
- "Ket = column vector safe throughout" → safe as the default reading.

### ADJUDICATED — no change
- Amplitude-estimation cross reference: it is §14.8 in this book's TOC, so
  the Chapter 14 attribution the ledger asked to verify is correct.
- §4.8's "SWAP or permutation" line at the tensor-order sanity check already
  names permutation; left as is.

One factcheck anchor requoted; baseline (97) restored.

## Batch 6 — Chapter 5 (19 substitutions)

### FIXED — outright defects
- Measurement numbered "Postulate 4" in the introduction vs "Postulate 3" at
  its own section — introduction corrected.
- "Born rule throws away global phase but preserves relative phase" — false
  as stated; now the correct division of labour (fixed-basis measurement
  discards all phase; prior evolution converts relative phase into
  observable amplitude differences).
- "Reductions of entangled states are non-product" (category error) —
  replaced with the precise statement: pure-global entanglement forces mixed
  marginals; mixed-global proves nothing.
- Cross terms "vanish when their partner subsystem is traced out"
  universalised — now traceless-factor explanation, with product-state
  coherences noted to survive.
- "QKD is secure" from no-cloning alone — now physical-foundation phrasing
  with the proof ingredients named.
- No-deleting paraphrase "cannot deterministically reduce to one copy" —
  now scoped to unitary-with-fixed-blank; tracing out a copy explicitly
  allowed.
- "Quantum information is conserved in a way classical is not" / `rm -f`
  contrast — corrected: closed classical dynamics also conserves; erasure
  moves information at Landauer cost; the quantum novelty is the ban on
  copying/blanking unknown states.
- Channels chapter reference (18 → 10, with 18 as phenomenology).
- Purity range (0,1] → the informative fixed-dimension bound [1/d, 1].
- Repeated-measurement variability now specifies fresh preparations, with
  the repeat-outcome property of immediate re-measurement stated.

### FIXED — epistemic scoping
- "Model permits any unitary in principle" → the postulate constrains
  dynamics to unitaries; reachability is controllability/synthesis
  (Chapter 8).
- Measurement irreversibility scoped to system-plus-outcome, with the
  reversible-coupling model referenced.
- Classical computer "fully described by two weights" → scoped to the
  output marginal.
- "Most important conceptual difference" → a central difference.
- Gates "generated by specific Hamiltonians" → abstract generator vs
  hardware Hamiltonian; Pauli gate cross-reference now Chapter 8 (taxonomy)
  + Chapter 6 (Bloch reading).
- Maximally mixed "carries no information" → about the preparation, with
  dimension and purification caveats.
- tr(ρO) "the form actually used in practice" → unifying form, state-vector
  practice acknowledged; POVM form referenced.
- Known-state copying, cloning-bound direction (per-copy fidelity
  decreases), ancilla-machine generality of no-cloning, and
  uncomputation-vs-measure/reset all made precise.

### DEFERRED / ADJUDICATED
- Doubled LaTeX escapes (systematic, deliberate renderer workaround) —
  adjudicated as house convention; the ledger's ask for a one-time
  whole-book render validation is logged as an infrastructure task.
- No-cloning/no-deleting historical citations → factcheck programme.
