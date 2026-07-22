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

## Batch 7 — Chapter 6 (16 substitutions)

### FIXED — outright defects
- Bloch parametrisation "covers the sphere exactly once" — pole degeneracy
  stated.
- "Any basis that mixes |0⟩ and |1⟩ does see" relative phase — corrected:
  each mixing basis sees its own quadrature (Hadamard 0 vs π; circular
  ±π/2).
- R_z listed as exception to phase propagation — now correctly changes
  phase without mixing populations, visible after a later mixer.
- I/2 "equal probability to every measurement outcome in every basis" —
  scoped to both outcomes of orthonormal-basis measurements.
- 2π sign "a later interference experiment can see" — now global-hence-
  invisible for the isolated qubit, observable only against a reference
  branch (repairing the cold-read-era wording with the reviewer's
  reference-branch caveat).
- "Bloch sphere is the projective sphere" — now CP¹ with the
  antipodal-points-are-orthogonal warning.
- Bell-state phase manipulations as the 4π example — replaced with
  controlled-rotation interferometry, where the reference branch exists.
- ZYZ decomposition: U(2) equality now carries its global-phase factor;
  "underwrites every compilation step" scoped to single-qubit synthesis
  with virtual-Z noted and angle non-uniqueness flagged.
- Basis-mismatch → maximal entropy — scoped to mutually unbiased bases.
- Bridge: "handled the single qubit fully" → core ideal-model toolkit;
  "diverges from any classical model" → local classical models with
  assumptions.

### FIXED — epistemic scoping
- "Most intuition starts on the Bloch sphere" — multi-qubit failure of the
  picture previewed; circular basis paired with its standard "Y basis"
  name at first mention; computational basis "natively distinguished by
  hardware" → hardware-and-encoding convention with noisy readout noted.

Three factcheck anchors requoted; baseline (97) restored.

## Protocol addendum — 2026-07-19 (agreed with the author)

The review's mandate covers not only hard errors but foggy doubts,
improvement ideas, and polish, toward continuous improvement of all aspects
of the book. To guarantee nothing below defect grade is silently dropped,
two lanes join the vocabulary:

- **IMPROVEMENT-QUEUED** — accepted idea, scheduled for a dedicated
  improvement pass after the correctness wave (examples: concrete qubit
  mixture in §5.9, executable Qiskit ordering assertion, STYLE normative
  table, deterministic example seeds, TOC drift test).
- **POLISH-QUEUED** — accepted, lower priority (examples: README fence
  language tags, licensing path table / SPDX headers, consolidated
  prerequisite lists).

Processing order: correctness wave first, chapter by chapter behind the
review front (perishable, highest stakes); then a backfill sweep through
the already-processed files and repo docs dispositioning every remaining
minor/suspicion/polish/foggy item into these lanes (applying cheap ones
immediately); then the improvement passes per queue — infrastructure
batches, editorial-enrichment items to AUTHOR-DECISION, currency to the
factcheck programme. Entertainment scores remain a preserve-this signal
during edits, not an optimisation target. New ledger drops always take
correctness priority on arrival.

## Batch 8 — Chapter 7 (10 substitutions)

### FIXED — outright defects
- **Bell-circuit input mapping** — the "respectively" sentence mapped
  |01⟩ and |10⟩ to the wrong named Bell states. Verified by direct
  computation and replaced with explicit exact mappings
  (|01⟩→Ψ⁺, |10⟩→Φ⁻, |11⟩→Ψ⁻) plus the bit-flip/sign mnemonic; the
  "up to relative signs" hedge removed (the mappings are exact).
- CHSH "operator" naming — S is the statistic; the operator 𝓑 now given,
  with locality of the observables made explicit.
- Schmidt uniqueness "up to degeneracies" — completed (paired phases,
  degenerate-subspace unitary freedom, zero-coefficient completion) with
  the rank bound r ≤ min(d_A, d_B).
- Maximal entanglement with unequal subsystem dimensions — d = min(d_A,d_B)
  and the Schmidt-support statement for the larger marginal.
- I/2 "every measurement in every basis uniform" — scoped to
  orthonormal-basis measurements (biased POVMs excluded).
- No-signalling "marginals insensitive to what happens on the other side" —
  scoped to trace-preserving, outcome-ignored operations.
- E91 "close to 2√2 proves undisturbed pairs" — replaced with the
  information-bound account plus reconciliation/privacy-amplification/
  finite-statistics requirements.

### FIXED — epistemic scoping
- "All of the computational advantage" → scalable advantage; opening
  "no classical analogue" → no-local-model with §7.9 pointer;
  "stronger than any classical correlation" → suitable-measurement scoping
  with the entangled-mixed-state caveat; "close to product ⇒ tractable" →
  error-guarantee caveat; "most protocols of practical interest" →
  canonical bipartite communication protocols; "all the structure" →
  structure distinguishing the state from same-marginal states.

### ADJUDICATED — no change
- Jozsa–Linden already carries its pure-state scope and the DQC1
  counterpoint in the text.

One factcheck anchor requoted; baseline (97) restored.

## Batch 9 — Chapter 8 (11 substitutions)

### FIXED — outright defects
- **Trotter formula missing its Nth power** — the displayed single step is
  now explicitly (∏ₖ e^{-iHₖΔt})^N with the commutator-error pointer.
- t|ket⟩ and TKET listed as two separate compilers — deduplicated with the
  historical styling noted.
- Toffoli sanity check "from its matrix" with no matrix supplied — now asks
  the reader to write the 8×8 matrix from the §8.7 definition first.
- "Clifford gates map encoded states transversally, with minimal overhead"
  in "most" codes — corrected (surface codes use lattice surgery/code
  deformation; Eastin–Knill cited against universal transversality).
- Solovay–Kitaev "not an inflation of asymptotic complexity" — corrected to
  a logarithmic multiplicative overhead that leaves polynomial algorithms
  polynomial.
- "The measurement consumes the rotated state" as the reason for the
  missing second H — replaced with the correct effect-transformation
  account (H†PzH), outcome mapping made explicit.
- Generator "is the Hamiltonian one would engineer in hardware" — now a
  possible ideal generator, with pulse/frame/compilation reality and
  mod-2π/t nonuniqueness.

### FIXED — epistemic scoping
- Cliffords "nearly free" in surface codes → substantially cheaper with
  costs named, magic-state accounting marked architecture-dependent;
  "give no quantum advantage" → no superpolynomial advantage in the
  standard model; ion "no routing needed" → shuttling/scheduling caveat;
  parameter-shift "exactly computable from two additional evaluations" →
  analytically exact identity, two shifted runs, finite-shot noise noted.

### ADJUDICATED — no change
- "Controlled phase gates are central in the QFT (Chapter 14)" — correct in
  this book's TOC (QFT is §14.5); the ledger's drift suspicion checked and
  dismissed.

## Batch 10 — Chapter 9 (14 substitutions)

### FIXED — outright defects
- Subset-measurement probability formula was the full-register formula —
  now full-register vs marginal made explicit, with the static-circuit
  scope and §9.6 pointer.
- "Both regimes require non-demolition measurement" — false for
  feed-forward; corrected (reset-and-reuse needs survival/replacement;
  feed-forward needs only a reliable classical result; destructive
  photonic detection example).
- OpenQASM 2 "had no support" for conditionals — corrected
  (`if (creg == int)` existed; OpenQASM 3 added rich types/control flow).
- Initial mapping "equivalent to routing" — corrected to complementary,
  with the placement/dynamic-routing division stated.
- Compute–copy–uncompute output as a "clean tensor factor" — corrected:
  the workspace is the clean factor; the output stays correlated with the
  input (and the XOR copy is reversible fanout, not cloning).
- Qiskit ordering explanation ("lines up with classical bit-string
  order") — was backwards; now the top-wire/rightmost-printed-character
  relation, with the conventions listed as separable rather than "two".
- Endpoint-routing sanity check underdetermined — assumption added
  (no restoration of the original wire assignment).

### FIXED — epistemic scoping
- Model equivalences: adiabatic conditions upgraded from "sufficiently
  smooth" to locality/norm/gap-runtime; CV schemes scoped; SDK list
  re-taxonomised (SDKs vs IRs vs compiler stacks, deduplicating TKET).
- Oracle lifting: bitwise-⊕/width note; O(T) workspace marked as the
  history construction with time–space trade-offs.
- "Every phase-kickback algorithm relies on clean uncomputation" →
  branch-indistinguishability requirement with uncomputation as the
  standard guarantee.
- NISQ "ε-dependence does not appear" → discrete-synthesis dependence
  only; calibration/pulse precision remains.
- Routing "a sequence of SWAPs" → most commonly SWAPs, alternatives
  named; NP-hard claim scoped to standard decision formulations.

Five factcheck anchors requoted; baseline (97) restored.

## Batch 11 — Chapter 10 (16 substitutions)

### FIXED — outright defects (including the ledger's one CRITICAL)
- **CRITICAL: active/passive conflation** — "the thing that changes is the
  basis, not the state" said of applying H. Replaced with an explicit
  active-vs-passive paragraph; H's self-inverse symmetry flagged as the
  trap that invited the conflation.
- Contextuality defined as marginals depending on the co-measurement —
  replaced with the correct no-noncontextual-value-assignment statement
  (marginals of ideal compatible measurements are context-independent).
- GHZ contradiction "is a single shot" — now logical/all-versus-nothing
  with ensemble verification across incompatible settings.
- Bloch-vector norm called "the purity measure" — now monotonic mixedness
  indicator with purity = (1+|r|²)/2.
- Lindblad "most general continuous-time evolution" — scoped to Markovian
  semigroups; the three-pictures equivalence correspondingly narrowed
  (operator-sum ≡ Stinespring for all CPTP; Lindblad the subfamily).
- Kraus rank assigned to any representation — now the minimum.
- "The classical channel is the only way information actually moves" —
  self-contradicted by superdense coding two sentences later; now
  entanglement-cannot-signal with the carrier requirement.
- Decoherence-free subspaces "conceptually underpinned" by Zeno
  projection — now symmetry-based, related-but-different; QEC's Zeno
  flavour explicitly labelled analogy.
- Einselection "explains why superpositions are not observed" + timescales
  "below any experimentally accessible window" — narrowed to interference,
  mesoscopic observations acknowledged, measurement problem left open.
- "Noise is just unobserved entanglement" — now a representation theorem,
  with classical-randomness mechanisms acknowledged and Knill–Laflamme
  replacing "survives a known set of Kraus operators".

### FIXED — epistemic scoping
- "Every known speedup fits the template" → dominant pattern with HHL and
  sampling/simulation exceptions named; "all inputs at once" guard added;
  uniform-superposition-measure "no useful computation" → no computational
  advantage (private randomness acknowledged).
- Information/disturbance universal → nonorthogonal-alternatives trade-off
  with known-eigenstate and weak-measurement caveats; BB84 disturbance as
  one ingredient of a security proof; syndrome measurement idealisation
  flagged.
- "Regardless of what Alice does" → trace-preserving, outcome-not-
  communicated.

Nine factcheck anchor requotes (two needing second passes); baseline (97)
restored.

## Batch 12 — Chapter 11 (13 substitutions)

### FIXED — outright defects
- General instrument restricted to one Kraus operator per outcome —
  efficient-instrument scope stated, multi-Kraus general form given, the
  destructive example correctly labelled measure-and-reprepare with
  rank-one-only effects noted, Lüders named.
- Tomography "measurements distributed across 4ⁿ−1 Pauli settings" —
  settings/parameters conflation fixed (≤3ⁿ local-basis settings with
  reuse); "single-qubit Pauli tomography" → local Pauli-basis tomography.
- Hamiltonian estimation "O(M/ε²)" — replaced with the allocation-dependent
  cost (optimal-allocation formula given; uniform allocation can be far
  worse).
- Identical-state discrimination "is a coin flip" — scoped to equal priors,
  unequal-prior optimal guess with error min(π₀,π₁) added.
- Classical shadows "independent of qubit number for any number of
  k-local Paulis" — log M dependence restored.
- Randomised benchmarking "constant cost" — scoped (no tomographic-dimension
  growth; sequences/shots/confidence still cost; interleaved caveats).
- Readout calibration "one-time" — drifts, repeated in practice.
- Shot-noise floor "of every quantum sampling estimator" — scoped to direct
  independent-shot sampling with amplitude-estimation and zero-variance
  escapes named.
- "Chapter 18 generalises readout error to coherent errors and amplitude
  damping" — category error fixed (dynamical channels alongside, not a
  generalisation of, assignment error).
- "Every information measure has a discrimination-theoretic
  interpretation" — scoped to many, with plug-in estimation bias noted.
- Readout "often dominates" → can dominate in shallow circuits, deeper
  circuits dominated by gates/decoherence.
- "Apply to every variational workflow" → recur throughout.

One house-escaping violation I introduced (bare \, in new math) was caught
by lint and fixed in the same batch. Four factcheck anchors requoted;
baseline (97) restored.

## Batch 13 — Chapter 12 (16 substitutions)

### FIXED — outright defects
- Reading guide section mislabels — §12.8 (no-go theorems) vs §§12.9–12.10
  and the §§12.11–12.12 descriptions corrected to the actual contents.
- Trace distance called "exactly the advantage over 1/2" — off by a factor
  of two; now the bias 2p−1, twice the additive advantage.
- Fidelity/trace-distance "both quantities go to zero together" — false for
  close states; now trace distance and *infidelity* go to zero together.
- Schumacher compression posed as reproducing a known density operator —
  task redefined over unknown signals/purification fidelity, with the
  zero-rate cheat explicitly excluded.
- Measurement-entropy claim scoped to rank-one orthonormal-basis
  measurements with majorization attribution (coarse-grained
  counterexample noted).
- Holevo pure-ensemble bullet — "saturate" disambiguated (χ = S(ρ);
  accessible information generally below; orthogonal-uniform case is where
  measurement attains it), uniform-distribution condition added.
- Classical erasure "free" slogan — Landauer-honest rewrite; the vague
  "pays for this in one form or another" replaced with three specific
  downstream connections.
- Mixed-state entanglement "not interconvertible" — now not *reversibly*
  interconvertible, with regularised-EoF-as-cost correction.
- Pure-state interconvertibility scoped to the asymptotic limit with
  Nielsen majorization for single copies.
- Resource-theory definition — free states/operations with monotones,
  replacing "whatever is preserved or destroyed".
- "Every classical theorem has a quantum shadow" — scoped to the theorems
  the book relies on.
- Concavity "mixing increases uncertainty" — weak inequality with equality
  case.

### ADJUDICATED — checked against the primary formulation
- State merging S(A|B) accounting: the manuscript's statement (quantum
  communication rate S(A|B) with free classical communication; negative →
  LOCC + distilled ebits) matches the original Horodecki–Oppenheim–Winter
  "Partial quantum information" formulation, and the section already
  presents the equivalent entanglement-cost/FQSW accounting as the second
  standard form. Added only the explicit free-classical-communication
  qualifier at the rate display. The ledger's stronger claim (that S(A|B)
  is "primarily" the net entanglement cost) reflects the other, equally
  standard convention rather than an error here.

One factcheck anchor requoted; baseline (97) restored.

## Batch 14 — Chapter 13 (11 substitutions)

### FIXED — outright defects
- Simon repeatedly forced into the one-bit phase-kickback template — the
  hidden-structure claim, the amplitude statement, and the closing bridge
  now carry the n-bit output register and O(n)-repetition structure; the
  template's coverage of Shor/Grover restated as modified machinery.
- "Repeated squaring of an efficient circuit" implementing U^{2^k} — now
  the correct account: classical constants a^{2^k} mod N by classical
  repeated squaring, per-power modular-multiplication circuits synthesised
  directly.
- Shor QPE outputs called "multiples of N/r" — corrected to approximations
  of s/r with continued-fraction candidate extraction and verification.
- Grover "exact success-probability tuning by integer stopping" —
  corrected (integer counts land near the optimum; exact variants modify
  phases); heading renamed to stopping.
- "Constant overhead can absorb a √n improvement" — asymptotics fixed
  (finite-size erosion; constants cannot beat growing gains forever).
- Controlled-U_f counted as one query — flagged as an explicit modelling
  convention, with controlled access and adjoint access called out as
  granted rather than free.
- "Exponential number of intermediate evaluations compressed" — parallelism
  revival removed (no separately readable evaluations ever exist).
- QFT register statement scoped to N = 2^n with gate-library and
  general-modulus caveats.
- Per-shot information-rate comparison scoped to matched oracle/output
  sizes.

One factcheck anchor requoted; baseline (97) restored.

## Batch 15 — Chapter 14 (13 substitutions)

### FIXED — outright defects
- QFT "exponentially better than the classical FFT" — replaced with the
  incomparable-representations statement (the unreadability caveat promoted
  to load-bearing).
- Deutsch–Jozsa listed as an HSP instance — removed with the reason
  (balanced functions need not be constant on cosets).
- Repeated-squaring fast-forwarding of arbitrary structured U (including
  e^{-iHt} "via Trotter") — corrected: rotations multiply angles, Shor
  precomputes classical constants; generic structured U and Hamiltonian
  evolution obey no-fast-forwarding (cost ∝ simulated time).
- Shor's group described as Z_N with cyclic subgroup — corrected to
  order finding over the integers/large cyclic register with hidden
  subgroup rZ; "direct ancestor" softened to acknowledged inspiration;
  the different post-processing of the two cases stated.
- Amplitude amplification "boost-to-1" — near-one at Θ(1/sinθ) with exact
  variants requiring tailored phases.
- HSP Fourier-sampling state normalised (1/√|G|); abelian solution scoped
  to efficiently represented finite groups; symmetric-group/GI implication
  stated via the reduction direction.
- F_t → F_{2^t} (twice), matching the chapter's own dimension-indexing.
- Simon's O(n) query count now carries the high-probability qualifier with
  the O(n + log(1/δ)) form.

### FIXED — epistemic scoping
- "Primitives almost every later algorithm builds on" → a large share,
  with the different-machinery families named.

Four factcheck anchors requoted; baseline (97) restored.

## Batch 16 — Chapter 15 (12 substitutions)

### FIXED — outright defects
- Shor measurement missing its denominator — the measured integer c now
  divided by 2^{2n} before the s/r comparison and continued fractions.
- FIPS 205 (SLH-DSA/SPHINCS+) restored to the 2024 NIST standards list.
- Unknown-M Grover "successively doubled iteration counts" — replaced with
  the actual BBHT randomised-range strategy, with verification and M=0
  handling.
- "Any deployed asymmetric primitive must be replaced" — scoped to
  factoring/DLP-based primitives, harvest-now priority noted.
- HHL classical baselines — dense O(N³)/sparse O(Nsκ) replaced with an
  honest iterative-solver comparison and access-model caveat; "the
  exponential speedup is in N" tied to the assumptions.
- UCCSD "captures static correlation accurately" — corrected (single
  reference; often poor for static correlation); ADAPT claim scoped.
- VQE shot formula and "several days" runtime — allocation-dependent cost
  with §11.7 pointer; wall-clock honestly tied to shot-rate assumption.
- QAOA maximisation-vs-ground-state sign conflict resolved (extremal/top
  eigenstate under the stated convention); 0.6924 ratio given its
  triangle-free condition; adiabatic-limit guarantee given its gap
  condition and find-vs-exist distinction.
- "Essentially all dequantised" (twice) — scoped to the headline
  sample-and-query instances with open access models acknowledged; the
  QRAM-artefact monocause widened.

Zero factcheck-anchor drift this batch.

## Batch 17 — Chapter 16 (16 substitutions)

### FIXED — outright defects
- Jordan–Wigner "k = 4 for fermionic systems" — fermionic-interaction
  degree separated from qubit-string support.
- Malformed correlation formula ⟨ψ0|O e^{-iHt} O†|ψ0⟩ — replaced with the
  evolved expectation / defined transition-amplitude forms.
- LCU post-selected output "H|ψ⟩/α up to normalisation" — corrected to the
  normalised state with the branch amplitude doing the probability work,
  kernel case handled.
- Taylor-LCU "one large LCU" and its gate count — segmentation restored,
  α and PREPARE/SELECT dependence in the count, "first algorithm" →
  among the first.
- Qubitized walk W = R·U_H — structural requirement (self-inverse or
  controlled/two-reflection variant) stated for the advertised spectrum.
- Qubitization priority/superlative — optimal scaling kept with αt,
  overhead claim made precise, 2026 superlative flagged for re-verification.
- Raw 1/x QSP target — corrected to the rescaled reciprocal 1/(κx) with
  boundedness rationale; degree vs total-query distinction restored.
- Hermitian QSVT sign/parity glossing and the false "Hermitisation doubles
  the subnormalisation" — both corrected (norm preserved; cost is
  dimension/bookkeeping).
- "Unifies essentially every algorithm" and the opening "all fall out as
  special cases" — scoped, with the harder embeddings (QPE, Monte Carlo)
  marked as taking work.
- Blanket "HHL on classical input via QRAM is dequantised" — scoped to
  headline low-rank regimes, no-blanket-theorem stated.
- Classical shadows "any modern pipeline uses" and post-processing-only
  framing — corrected (measurement design is quantum-side; alternatives
  named).
- Trotter "only practical choice on NISQ" and the Trotter-for-NISQ/
  QSVT-for-FT timeline — replaced with the trade-space account.
- Bridge "formally weaker advantage" — replaced with the different-problem-
  statement observation.
- "Replaced in every modern reference" — reshaped across much of the
  literature.

Three factcheck anchors requoted; baseline (97) restored.

## Batch 18 — Chapter 17 (24 substitutions)

### FIXED — outright defects
- Factoring miscast as a language in NP∩coNP with "the factorisation itself
  is a witness either way" (main text + sanity check 2) — now the
  factor-below-threshold decision version, with primality certificates
  doing the no-side work.
- BQP-complete dynamics bullet — decision output, access model, and
  promises restored (evolved state is not a decision output; local vs
  sparse separated).
- Non-identity check called "the canonical QMA-complete problem" — demoted
  to one of several, with local Hamiltonian (Kitaev) named as the flagship.
- "Shamir–Lund–Fortnow–Karloff–Nisan theorem" — attribution split
  correctly (LFKN arithmetization; Shamir's IP=PSPACE), with the
  why-surprising sentence the ledger requested.
- Sampling-hardness logic ("weaker than BQP≠BPP, would not collapse PH if
  violated") — replaced with the correct conditional structure.
- Query-to-time "lift cleanly under three conditions" — the missing
  classical-baseline and non-query-cost ingredients added; fault-tolerance
  overhead corrected from "constant".
- T/Toffoli conflation, "Clifford transversal/free" (twice, incl. sanity
  check 5), and "T-count synonymous with cost" — all corrected.
- Planar-Ising/FPRAS conflation — ferromagnetic FPRAS, high-temperature
  correlation decay, and exact Pfaffian planar solvability separated.
- "All three simulability families" exhaustiveness — non-exhaustive map
  with additional families named.
- PEPS operations claimed polynomial in n and χ, and area law ⇒ efficient
  — the MPS/PEPS split and gapped-1D-vs-2D honesty restored (2D exact
  contraction #P-hard).
- Sycamore noise-as-mechanism claim — replaced with the
  fidelity-matched-truncation account; "methods that did not exist" →
  substantially improved; "every claimed demonstration pursued" and
  "almost always within 18–24 months" de-universalised; "merely
  PSPACE=EXP" upgraded to momentous.
- "Only strict separation proved" and "strongest known placement" and
  AWPP "tightest known cap" — all scoped.

Three factcheck anchors requoted; baseline (97) restored.

## Batch 19 — infrastructure queue (IMPROVEMENT-QUEUED items executed)

- **Deterministic example seeds** — all three sampling examples now use
  `StatevectorSampler(seed=1234)`; `make check-examples` passes with
  reproducible counts. (Ledger: flaky-check suspicion in the verification
  baseline.)
- **TOC drift check** — `scripts/generate_toc.py --check` added plus a
  `make toc-check` target; verified TOC.md is currently in sync. (Ledger:
  README/TOC duplication drift risk.)
- **Interim-format structural validation** — `factcheck_lint.py` now
  validates both interim dialects (### Claim blocks with Method/Status;
  anchor bullets with Method/Verified) in the 47 mirror files, exits
  nonzero on problems, and exempts mirrors that explicitly declare "no
  checkable claims" (the index). Current mirror: 0 structural problems.
  (Ledger: dangerously narrow lint coverage.)
- **Render validation (doubled-escape question)** — `build_book.py
  --selftest` passes (5 math + 7 link cases, all 48 chapters listed),
  validating the house escaping against the offline mdBook+KaTeX path.
  The GitHub-web rendering path is precisely what
  `docs/github-markdown-math-bugs.md` documents workarounds for; the
  ledger's per-instance "render defect?" flags are hereby adjudicated as
  the documented convention, with this selftest as the standing regression
  guard. A full visual browser pass remains AUTHOR-DECISION (needs eyes).
- **STYLE/lint dual-source manifest** — QUEUED as AUTHOR-DECISION: moving
  lint's allowlists into a machine-readable manifest referenced by STYLE
  changes project structure; recommended, not unilaterally applied.
- **README block generation** — POLISH-QUEUED (generate the README chapter
  list or add a drift test mirroring toc-check).

## Batch 20 — front-matter defects + repo-doc backfill

### FIXED
- **I_n notation risk (ledger major)** — the "subscript counts qubits"
  convention conflicted with the universal n×n reading; the notation file,
  Appendix A, and Appendix C now use I^{⊗n} / I_{2^n}, with the
  avoid-bare-I_n rationale stated where the old form was defined.
  Harmonised book-wide (no bare-I_n definitions remain).
- Preface "it is calibration" antecedent → "they are"; notation file's
  "the parser disambiguates" anthropomorphism → reader-facing phrasing.
- BookDescription lowercase sentence start ("remain accurate. the") fixed.
- STYLE "renderer-bug-proof" absolute → scoped to the tracked renderer
  bugs with the doc reference.
- README status paragraph — the internal-review/verification claim now
  carries the anchor-audit qualifier the ledger demanded (verified = as
  reviewed, mirror reconciliation ongoing).
- README bare shell fence labelled ```bash (house style).

### Backfill lanes for the remaining repo-doc items
- **AUTHOR-DECISION:** INSTRUCTIONS repo-local-vs-global git identity and
  contributor-provenance policy; licensing path table + SPDX headers;
  BookDescription reconciliation-note restructure (charter update);
  STYLE normative required/allowed/lint table and machine-readable
  exception manifest; full visual render pass.
- **IMPROVEMENT-QUEUED:** README version-matrix generation from
  build_book.py constants; README chapter-list drift test (mirror of
  toc-check); PROGRESS checkbox semantics note; factcheck_lint dashboard
  polish; source-note redesign (citation keys, verified-on dates — joins
  the factcheck programme's card-spec migration).
- **POLISH-QUEUED:** reviews/ retention-policy note in README; prose
  consolidation items (BookDescription list repetition, preface reading
  routes timing); British/American spelling sweep (Ch17 ledger note).
- **ADJUDICATED:** per-chapter Entertainment scores and positives — no
  action by design; the ledger's per-instance doubled-escape render flags
  — standing regression guard is the build selftest (Batch 19).

Per-chapter minor/suspicion items for Prelude–Ch17 that were not
individually listed in batches 1–18 fall into the categories above
(citation needs → factcheck programme; currency superlatives →
factcheck programme with dated re-verification; structural/enrichment
suggestions → AUTHOR-DECISION queue). The ledger remains the master
record; nothing in it is considered dropped.

## Batch 21 — IMPROVEMENT-QUEUED / POLISH-QUEUED execution (author go-ahead)

### IMPROVEMENT items done
- **README chapter-list drift test** — `generate_toc.py --check-readme`
  verifies every manuscript file is linked from README's Table of
  Contents (currently: full coverage).
- **Version-matrix drift guard** — `build_book.py --selftest` now fails if
  README's install instructions stop mentioning the katex versions in
  SUPPORTED_PAIRS.
- **PROGRESS checkbox semantics** — generated legend states what a checked
  box does and does not mean; PROGRESS.md regenerated.
- **factcheck_lint dashboard** — now tallies interim-mirror claims by
  status/verdict alongside the card-file verdicts.
- **Executable Qiskit ordering assertion** — new
  `examples/qiskit_ordering_check.py` asserts the book↔Qiskit index
  mapping and the diag(I, X) CNOT form on live Qiskit objects; picked up
  automatically by `make check-examples` (ledger asks in §4.8/§7.1/§9.1).
- **§5.9 concrete qubit mixture** — worked example added (3/4 |0⟩ + 1/4
  |+⟩ ensemble: explicit matrix, purity 13/16, off-diagonal moral);
  arithmetic machine-verified.
- **Preface linear-route effort calibration** — "a semester of steady
  evening reading" added at the reading-paths section.

### POLISH items done
- **reviews/ retention note** in README (insert-only audit artifacts,
  retained as provenance).
- **Spelling consistency sweep (prose)** — British confirmed as the
  dominant convention; 40+ American-variant prose occurrences converted
  (randomised/behaviour/realised/characterisations/optimisation/
  normalised family). Deliberately untouched: paper titles, the QAOA
  proper name, code identifiers (`optimization_level`), nav links, and
  the generated index.
- Two factcheck anchors staled by the sweep requoted; baseline (97)
  restored.

### Escalated to AUTHOR-DECISION (slug/filename cascade)
- Heading-level Americanisms: §8.13 "Parameterized Gates", §9.13 "Circuit
  Optimization", §20.8 "NV Centers", and the Chapter 29 title/filename
  ("optimization"). Retitling changes slugs, filenames, the generated
  index/TOC, and factcheck mirror names — a coordinated migration pass,
  recommended but not applied unilaterally. ("NV center" prose occurrences
  left with their heading for the same reason.)
- BookDescription prose consolidation — folded into the pending
  reconciliation-restructure decision rather than piecemeal-edited now.

## Batch 22 — American-English migration (author-approved, research-backed)

Per reviews/analysis-2026-07-19-spelling-convention.md and the author's
go-ahead:

- **Migration executed** over book/, factcheck/, examples/, README,
  BookDescription, STYLE, INSTRUCTIONS: ~1,500 replacements total
  (codespell en-GB→en-US pass + explicit project map covering the
  scientific derivatives and coined jargon codespell's dictionary lacks,
  plus hyphenated compounds it cannot tokenize). Includes the previously
  escalated -ogue family (analogue→analog, catalogue→catalog) for zero-
  exception consistency. The four already-American slug-bearing headings
  and the ch29 filename needed no change, as predicted.
- **Sweeping factcheck/ with the same map kept anchors in sync**: checker
  back at exactly 97 after one mirror-only straggler (centrepiece);
  remaining baseline diffs are pure respellings of the same anchors.
- **Generated files**: TOC, index (generator's own "No-signalling" term
  table fixed), PROGRESS regenerated; internal slugs verified free of
  British forms; build selftest, examples suite, README-coverage and
  toc-check all green.
- **Convention documented** in STYLE.md ("Language and spelling") with the
  research citation and the never-correct-a-quotation rule.
- **Lint enforcement added** (tools/lint.py): two layers — the project
  dictionary tools/spelling-gb-us.txt (206 pairs, always on) and
  codespell's builtin en-GB_to_en-US with a hyphen-splitting regex when
  installed. Exact-phrase allowlist (tools/spelling-allowlist.txt) exempts
  legitimate British text — quoted titles, proper nouns — honored by both
  layers (the rule immediately caught STYLE.md's own quoted example, which
  became the allowlist's first entry: the false-positive path is tested).
- Note for the reviewer: chapter text under and beyond the review front
  (Ch18+) was included, as the author (who is the reviewer) ordered the
  migration; ledger quotes of pre-migration text remain valid as records.

## Batch 23 — Chapter 18 (30 substitutions)

### FIXED — outright defects
- Five-source noise taxonomy "every contemporary platform" — scoped as
  superconducting-flavored with other platforms' leading mechanisms named.
- Leakage: "standard codes do nothing useful" (false), upward-in-energy
  definition, and the wrong T1 persistence — corrected with the correlated-
  fault propagation danger stated; leakage-T1 platform dependence and the
  "single largest contributor" superlative scoped.
- Idle error "10^-4 per microsecond" — off by orders of magnitude against
  the quoted coherence times; now the exposure ratio (~10^-2/µs at
  T~100 µs) with platform spread.
- 63%-survival multiplication heuristic — corrected (0.999^1000 ≈ 37%
  survival on the naive model, composition model-dependent); correlated
  noise "accumulates faster" made direction-honest (can add, refocus, or
  bias).
- Crosstalk: decoder "cannot interpret" (false — extensions exist), the
  unsourced 0.5%→1.5% conversion removed, single-threshold framing fixed.
- Purity "(1-p)^n" universal — scoped to depolarizing; amplitude damping's
  purity increase and dephasing's pure eigenstates stated.
- Pauli twirling "becomes depolarization" — now Pauli channel, with
  Clifford twirling as the depolarizing average; n²→n conversion scoped to
  the idealized average.
- Process tomography "~4^n numbers" — corrected to ~16^n parameters.
- Bath embedding "polynomial blow-up" — corrected to dimension
  multiplication with exponential faithful-continuum cost.
- GST "resolves" SPAM — gauge freedom stated; germ/fiducial design defined
  properly.
- RB "sensitive only to average, not coherent" — corrected (coherent enters
  the average; purity benchmarking splits it); interleaved "almost always"
  scoped.
- XEB "infeasible above ~50 qubits" + benchmark-equals-advantage non
  sequitur — both corrected.
- Depolarizing model: RB-number conversion (dimension factors,
  per-Clifford vs native) and "crudest faithful" → crudest useful,
  phenomenological.
- Error-budget formula double-counting — replaced with category sums;
  metric-compatibility warning added; factor-of-two rule demoted to habit.
- ZNE "Richardson more robust" and PEC "guaranteed unbiased"/"few hundred
  gates" — corrected with the real conditions and overhead scaling.
- Virtual distillation "M·d qubits" — corrected to M·n.
- Mitigation exponential-shots bound — hypotheses attached.
- Bridge "threshold input is *exactly* the per-cycle Pauli rate" — now a
  first-order proxy feeding a circuit-level noise model.
- GAD/readout asymmetry "same origin" — relaxation-at-T=0 contribution
  separated; steady-state vs equilibrium population notation clarified in
  effect via §18.1's existing distinction.
- T2/T2* ratio "direct measure" → qualitative indicator; filter-function
  Gaussian/PSD conventions noted; two-qubit "bottleneck for every
  estimate" and decade-to-patch mapping scoped; SPAM "subtract" licence
  removed; simulator-vs-compiler either/or made complementary; coherent
  (nδ)² regime-scoped with the quasistatic middle regime named.

Three factcheck anchors requoted (two needing tail alignment); baseline
(97, respelled) restored. One self-introduced escaping violation caught by
lint and fixed in-batch.

## Batch 24 — Chapter 19 (29 substitutions)

### FIXED — outright defects
- 15-to-1 distillation attributed to "a Steane-code error-detection
  circuit" — corrected to the punctured 15-qubit Reed–Muller/triorthogonal
  code, with input-error assumptions and acceptance probability noted (the
  ledger's "severe trust break" item).
- Nonunitary (I+iZ)/2 presented as an error example — replaced with
  e^{iεZ}.
- HG=0 treated as sufficient for the codeword criterion — full-rank
  conditions added.
- "Transversal gates are exactly the Clifford operations that map
  stabilizers to stabilizers" — replaced with the correct decoder-success
  statement (degeneracy included) and transversality as a code-dependent
  geometric property, neither all-of nor only-Clifford.
- Recovery "the Pauli error commuting with a syndrome equivalence class"
  — replaced with correction-times-error-is-a-stabilizer.
- Logical operators N(S)\S without phase quotienting — mod-phases fixed
  in both the definition and the distance.
- Early bit-flip-code distance claim harmonized with §19.8's correct
  full-quantum-distance-one statement.
- CSS classical distance copied to quantum distance — d_Q ≥ classical,
  not automatic equality (both in §19.7 and the parameters line).
- Surface-code "~2d² including ancillas" undercount — corrected to ~2d²
  data/~4d² total unrotated, d² data/2d²−1 total rotated.
- "Every star and plaquette is four-body" implication and the vague
  rotated-lattice description — bounded by the counting correction.
- qLDPC "are CSS codes" — corrected to stabilizer codes with sparse
  checks (celebrated constructions CSS); topological geometric locality
  separated from abstract-graph sparsity.
- Constant-rate qLDPC misread as O(1) cost per protected logical —
  corrected to the amortized bulk-encoding statement with the Ω(d)
  single-qubit floor.
- Surface threshold "one to two orders above any other code family" —
  leaderboard removed; model/decoder dependence and bias/erasure leaders
  stated.
- Google 2024 "first below-threshold demonstration" — priority corrected
  (2023 d=3/5 result extended); three-point exponential trend hedged.
- Willow memory experiment as "end-to-end demonstration of fault
  tolerance" — corrected to below-threshold quantum-memory milestone with
  the missing ingredients named.
- Stim/PyMatching "fault-tolerant compilers" — reclassified as simulator
  and decoder.
- Lattice-surgery CNOT missing the ancilla patch and second joint parity
  measurement — full three-outcome protocol stated; O(d)-round seam
  measurement added to the merge; rough/smooth labeling flagged as
  book-convention with the Horsman-opposite note (internal consistency
  verified, so a convention note rather than a risky swap).
- Sanity check 4's proof sketch — degeneracy hole closed (stabilizer
  difference is harmless, logical difference contradicts distance).
- "Three decoders dominate" followed by five — reframed as baselines plus
  families.
- T-gate "50×–200× a logical Clifford" — scenario-dependent order of
  magnitude, not a universal ratio.

### FIXED — epistemic scoping
- Opening: polylog overhead tied to the threshold condition; "arbitrary
  rotation of one amplitude" fixed; reading-guide section numbering,
  "organize all known codes", and the topological-section category
  corrected; classical "only error is a bit flip" scoped to the digital
  abstraction; Gottesman–Knill runtime as a bound; "first scalable code"
  marked roadmap hypothesis with vendor scope corrected.

### DEFERRED-FACTCHECK
- Willow numbers (105 qubits, Λ≈2.14, lifetime 2.4×), RSA-2048 resource
  figures, magic-state cultivation 2024 attribution, Panteleev–Kalachev/
  Leverrier–Zémor construction details, union-find complexity citation.

Seven factcheck anchors requoted (one corrupted concatenation caught and
repaired); baseline (97) held. One self-introduced escaping violation
caught by lint and fixed in-batch.

## Batch 25 — Chapter 20 (29 substitutions)

### FIXED — outright defects
- Ca-40 described as a hyperfine clock-state qubit (the ledger's strong
  species error) — Ca-40 has zero nuclear spin and no hyperfine structure;
  encodings now split by species: hyperfine clock states for nonzero-
  nuclear-spin species (Yb-171, Ba-137), optical S–D quadrupole or Zeeman
  qubits for Ca-40, with encoding-dependent coherence limits (clock-qubit
  seconds-to-minutes vs. the metastable level's ~1 s lifetime and laser
  phase noise).
- Rydberg-blockade CZ told as "a coherent excitation pulse prepares the
  entangled state with one excitation shared between them" — that is a
  W-state story, not the gate; replaced with the actual phase-accumulation
  pulse protocol (blockade forbids double excitation, the blocked amplitude
  accumulates a different phase, pulse parameters set the conditional π).
- "Analog simulators do not, in general, support error correction — there
  is no canonical way..." categorical — replaced: no mature general
  scheme, but energy-gap penalties, protected subspaces, autonomous
  (engineered-dissipation) correction, and digital-analog hybrids exist;
  error accumulates with time/size rather than being suppressible at will.
- Adiabatic theorem compressed to "slow compared to the inverse-square of
  the minimum spectral gap" — now the textbook sufficient condition with
  the derivative/matrix-element dependence, version-dependent gap powers,
  and the closed-system idealization stated.
- AQC–circuit equivalence applied to commercial annealers — scoped to
  ideal non-stoquastic closed-system AQC; a stoquastic finite-temperature
  annealer inherits none of it and is framed as a physical low-energy
  sampler; minor-embedding qubit consumption and the not-like-for-like
  T2 comparison added; "no native error correction" softened to no
  *deployed* scheme (suppression schemes studied).
- Sanity check 2 arithmetic: 100 μs vs 50 ns is 2000×, not 1000×; the
  coherence-ratio inference bounded (decoherence exposure only, laser/
  motional/spontaneous-emission errors decide the rest).
- Sanity check 5's false premise "deterministic resource-state preparation
  [is] the photonics community's preferred path" — replaced with the
  fusion-based reality: probabilistic pieces, heralding, multiplexing.
- Sanity check 1's false binary ("identify whether decoherence or coherent
  errors dominate") — replaced with the candidate-source list (control
  error, leakage, crosstalk, calibration drift).
- Ch18/Ch20 superconducting-number contradiction — §20.1 harmonized to
  Chapter 18's ranges: medians vs. best-in-class T1 100–400 μs / T2
  100–300 μs made explicit; single-qubit 99.9% with best-in-class 99.95%;
  readout 98–99% simultaneous full-device vs. 99–99.9% well-tuned single
  qubits (integration-time/threshold dependence stated).
- §20.12 silicon row's blanket "gate time 10–100 ns" contradicted §20.7 —
  split into single-qubit (tens of ns–1 μs) and two-qubit exchange
  (10–100 ns).
- §20.12 trapped-ion row: "gate time 1–100 μs" split 1q/2q; "30–256
  deployed" corrected to ~30–60 deployed with 100–256-ion traps in
  development (deployed-count strong item).
- Quantum Motion "1024-dot characterization chip" — reframed as a
  quantum-dot characterization array, explicitly not 1,024 operating
  qubits.

### FIXED — epistemic scoping
- Majorana absolutes: "local perturbations cannot move the state" →
  strongly/exponentially suppressed coupling; braiding "exact up to
  exponentially small corrections in system size" → separation/gap
  suppression for smooth local perturbations only, with poisoning,
  diabatic error, thermal excitation, and measurement explicitly outside
  the suppression.
- Analog-simulator output "the late-time state, not a circuit output" →
  time-resolved observables, correlations, spectra, samples at chosen
  times.
- Photons "do not couple at all" → no appreciable direct interaction at
  these energies.
- Photonic "have not matched fidelities or qubit counts" → scale
  comparison scoped with the modes/photons/resource-states unit caveat;
  §20.12 photonic row "effectively unlimited coherence" → loss-limited;
  PsiQuantum million-photon target labeled roadmap.
- "Billions of qubits on a single wafer with the same economics" →
  labeled aspiration with the unsolved wiring/control/cooling/yield list;
  "leapfrog the others within a few processor generations" → forecast,
  contingent on undemonstrated scale.
- Neutral atoms "most aggressive scaling trajectory of any modality" →
  one of the fastest-scaling platforms, with the sites/loaded-atoms/
  gate-capable-qubits distinction; stale "best 2025–2026 reports
  approaching 99.5%" aligned with Chapter 18's 2023 demonstration and
  successors; "huge electric dipole moment" → enormous polarizability with
  vdW/dipole–dipole mechanism; blockade radius marked state/geometry-
  dependent.
- Opening "topologically encoded mode" flagged experimentally unconfirmed
  (§20.9); installed-base superlative hedged; Paul-trap description
  extended to RF pseudopotential plus static axial confinement; QUBO
  paragraph gains the minor-embedding chain/precision cost; "The
  applications target is" grammar fixed.

### DEFERRED-FACTCHECK
- Vendor/device figures (Ankaa, Garnet, Heron, Condor 1,121; Quantinuum
  H2/IonQ Forte–Tempo counts; QuEra 256/10,000 roadmap; Atom Computing
  1,000+ sites "first"; Tunnel Falls 12-qubit status; Majorana 1 device
  characterization), Evered-successor Rydberg records, D-Wave
  Advantage2 qubit counts, and every §20.12 row number — all queued for
  the Appendix-F-driven claim-level audit (the ledger's improvement
  priority: machine-readable Appendix F generating these tables).

Seven factcheck anchors requoted in the same commit; baseline (97) held.
Lint, factcheck lint, and the build selftest pass.

## Batch 26 — Chapter 21 (31 substitutions)

### FIXED — outright defects
- Opening's "every X/CNOT is a nanosecond analog waveform through coax"
  modality overgeneralization — scoped to the superconducting running
  example, with ion/atom (laser/RF tones, modulators, optics) and
  photonic (sources, interferometers, detectors) control named.
- "Every single-qubit gate is a Rabi oscillation" — workhorse case, with
  virtual-Z, adiabatic, geometric, and composite-pulse exceptions named;
  the rotating-frame Hamiltonian's two-level/RWA/near-resonance
  assumptions stated.
- Angular-frequency anharmonicity labeled "α ≈ −200 MHz" — corrected to
  α/2π (Chapter 20's convention), in the chapter and the factcheck card.
- "The same abstractions now live in OpenQASM 3 defcal" after the Qiskit
  Pulse removal — no drop-in cross-vendor replacement; defcal is a
  grammar, vendor support varies.
- Qiskit Runtime grouped with OPX/SHFQC as an exposed pulse-programming
  model — reclassified as a cloud/classical execution service lowering
  circuit-level input internally; "compiles to firmware" → sequencer
  instructions; feedback latency "small constant (100–500 ns)" →
  bounded-and-short with vendor/protocol dependence.
- 14-bit DAC "usable dynamic range of about 84 dB" — corrected to ideal
  quantization SNR ≈ 86 dB (6.02N + 1.76) with ENOB/jitter/spur
  reductions explicit; Nyquist bandwidth → first Nyquist zone with
  reconstruction-filter caveat.
- Virtual-Z/frame changes said to absorb idle ZZ — entangling for a
  spectator in superposition; absorbable only when the spectator state is
  known; echo/coupler cancellation required otherwise; fixed-coupler ZZ
  "hard floor" → suppressible-but-not-free contribution.
- "Every milliwatt of heat coming down a coaxial line matters" at a
  tens-of-microwatts mixing chamber — heat is intercepted at warmer
  stages; a stray milliwatt at base would overwhelm the entire budget.
- Attenuation example summing 20+10+20 = 50 dB against the prose's
  60–70 dB total — upper-stage attenuation and cable loss added to the
  itemization.
- "Three to five physical lines per qubit" counting shared readout
  feedlines per-qubit — corrected to dedicated drive/flux(/fast-flux)
  lines plus frequency-multiplexed shared feedlines (~1–3 dedicated
  lines per qubit).
- Active reset "left in |0⟩ in a known time independent of T1" — residual
  floor (misclassification, decay in the loop, thermal repopulation)
  stated.
- The p_e^k reset law (the ledger's strong mathematical defect) —
  unconditional measure-and-correct repetition converges to a steady-state
  floor near the per-round error; the multiplicative law belongs to
  heralded verification (accept only on k consistent zeros) with
  retry-on-failure cost; pseudocode comment updated to the heralded
  reading; sanity check 4 rewritten to the heralded posterior question
  plus the floor question (its old answer followed the false model).
- OpenQASM constructs "silently demote to a slow software loop" —
  replaced with fail-with-capability-error or explicit host partition,
  with the warning that toolchains are not always loud about which.
- Krotov "GRAPE with a step size chosen so fidelity never decreases" —
  corrected to the sequential forward-update/backward-propagated-state
  structure with conditions on the monotonicity guarantee and the
  parallelism tradeoff.
- DD pushing idle coherence "toward T1" — corrected to the relaxation-
  limited ceiling T2 ≤ 2T1.
- QUA compiling to "an OPX bitstream" — sequencer-instruction controller
  programs, not per-experiment FPGA gateware; LabOne Q labeled a Python
  software framework; "Qiskit Pulse to IBM Quantum lowering" present
  tense reconciled with the §21.3 removal (internal lowering, API removed
  2025); FPGA-trace debugging scoped to engineers with hardware access.
- Package "routes launchers to coaxial connectors at the cold plate" —
  package mounts/anchors at the mixing-chamber stage; cabling rises
  stage by stage.
- "Standard physics trilemma: pick any two" — labeled an engineering
  heuristic, not a theorem; co-design can improve all three.
- Sanity check 1 underdetermination — asks for the Ω/|α| small parameter
  and order of magnitude, noting the three-level √2 matrix element needed
  for a quantitative answer.
- Sanity check 3 — ζ-convention factor (2 or 4) surfaced; virtual-Z
  absorption conditioned on known spectator state; entangling remainder
  assigned to echo/active cancellation.

### FIXED — epistemic scoping
- "gate-ware" → gateware; "user only sees the bitstream" contradiction →
  typical users never see the FPGA configuration; below-DSL work scoped
  to control engineers via supported frameworks.
- "Every microwave engineer's checklist" → standard checklist with
  superconducting-specific additions; "copper-powder + reflective LPFs on
  every flux line" → representative topology balancing noise vs.
  bandwidth; IR photon effects split into pair-breaking (T1) and
  resonator photon-shot-noise (T2) mechanisms.
- Scalar crosstalk c_ij → frequency-dependent transfer function
  summarized by a near-carrier coefficient; "every nearby drive line" →
  significantly affected lines.
- "Custom gates: pulse-level programming is the only way" → most direct
  way, with parameterized native gates/calibration overrides/optimal-
  control services as alternatives; Cirq "no public pulse API" scoped.
- §21.9 QEC control loop harmonized with the corrected Chapter 19 model
  (streaming decoder, decisions at logical feedforward boundaries,
  classically tracked Pauli frames).
- DRAG derivative coefficient "scaled by −1/α" → proportional to −1/α
  with envelope/convention-dependent prefactor.

### DEFERRED-FACTCHECK
- Product/API claims (Qiskit 1.3/2.0 dates, IBM cloud pulse withdrawal
  scope, Cirq/Cocos status, OPX/SHFQC/Quil-T/LabOne Q capabilities and
  terminology), electronics figures (GS/s, bits, gain, latency ranges),
  cryostat stage temperatures/cooling powers, calibration cadences, and
  §21.14 gate/readout numbers — all queued for the versioned capability
  table the ledger's improvement priority requests.

Eight factcheck anchors requoted in the same commit; baseline (97) held.
Lint, factcheck lint, and the build selftest pass.

## Batch 27 — Chapter 22 (55 substitutions)

### FIXED — outright defects
- Reading-guide roadmap off-by-one (XEB is §22.10, operational metrics
  start §22.11) — both ranges corrected.
- Physical-qubit count "well-defined per device... the number of
  addressable channels in the control system" — both halves false across
  modalities (dynamic loading, modes/time bins; multiplexing, global
  beams, broadcast addressing); rewritten with the fabricated-vs-populated
  distinction and the 1000/850 example de-universalized.
- Surface-code logical arithmetic: "roughly 2d² for the data plus ancilla
  overhead" double-counted — corrected to the rotated code's 2d²−1
  including ancillas, with the d=5 patch count (49 qubits → ~20 isolated
  patches) and the routing/factory/workspace deductions replacing the
  unsupported "10–20 logical qubits".
- Heavy-hex SWAP estimate "√127 × 3 ≈ 33 CNOTs" not graph-derived —
  replaced with L−1 SWAPs at 3 CNOTs along real coupling-map paths (low
  tens for far corners), diameter as Θ(√n), and the comparison baseline
  (one native entangler) made explicit.
- "Topology and usable-pair fraction coincide only when the coupling
  graph is sparse" — sparsity is not the condition; every-nominal-edge-
  above-threshold is.
- Direct fidelity estimation "gives the full process matrix" — DFE
  estimates fidelity to a known target without reconstruction; process
  tomography reconstructs (SPAM-sensitively).
- 0.999^1000 called "total circuit fidelity" — labeled the deliberately
  naive independent-stochastic-error estimate it is.
- Cross-vendor RB "comparable only to one part in a few thousand;
  differences smaller are noise" — no universal threshold; systematic
  protocol mismatch is not random noise; the demand-list (CIs, cohort,
  protocol, simultaneity) substituted.
- Hahn echo "only noise above 1/t contributes" — false sharp cutoff;
  replaced with the filter-function picture (suppression, not exclusion;
  Chapter 18 cross-reference); "refocuses any quasi-static dephasing"
  bounded.
- CPMG as "the closest proxy for intrinsic dephasing" — reframed as a
  controlled-memory lifetime under stated pulse count/spacing; longest-
  of-family hedged for pulse-error reversals.
- Ion hyperfine T1 "effectively unbounded" — bounded by background-gas
  collisions and trap loss; optical ~1 s made species/transition-
  dependent.
- "Default an unspecified T2 to echo" — advice inverted the chapter's own
  discipline; now: treat as underspecified and ask for the protocol.
- Circuit time "sum of (or DAG-scheduled maximum over) gate times" —
  corrected to scheduled critical-path duration.
- N_ops as "the honest single-number summary... number of two-qubit gates
  that can fit" — renamed a coherence-to-gate-time ratio; explicitly not
  a success count (gate infidelity/leakage bite first); depth cost
  corrected to sum of scheduled layer durations; the reversed vendor-
  flattery accusation fixed (fast per-gate time + silent parallelism).
- Readout "symmetric (worst-case) error" terminology — assignment
  fidelity vs worst-case assignment error, with the fidelity/error
  direction warning.
- Mitigation "post-multiplies by M⁻¹" — orientation corrected
  (p_meas = M p_true, column vectors, apply M⁻¹ from the left) with the
  negative-probability caveat; "correlations small on most devices" made
  an assumption to check.
- SPAM as "the single number to grab" setting an observability floor —
  conflation named; RB estimates gate error below raw SPAM.
- QV "saturates around d = 10–15" contradicting the chapter's own
  2^19–2^25 records — replaced with the exponential-cost framing and the
  §22.13 milestone pointer; §22.13's "IBM's QV history" heading (listing
  Quantinuum records) renamed the QV milestone record and its
  "metric saturating" close replaced; "triples their two-qubit fidelity"
  → cuts error threefold; "some 10-qubit circuit works" → statistical
  success on a specified ensemble; hardware-agnostic claim reconciled
  with "slightly varying forms"; "lower bound" scoped to the ensemble.
- CLOPS "wall-clock per (circuit, shot) pair" with compilation folded in
  — replaced with executed-layers-over-elapsed-time and the protocol-
  version timing boundary; CLOPS-as-feedback-latency-proxy severed
  (throughput ≠ single-shot reaction time).
- AQ sparse-device sublinearity presented as measured — labeled an
  expectation (AQ chiefly reported by IonQ on its own stack); the 1/e
  threshold hedged to the current specification with the benchmark-score
  caveat; AQ≥N "probably runs to spec" bidirectional prediction —
  demoted to triage evidence with both directions explicitly non-
  predictive.
- XEB "crucially factorizes as a product of per-gate fidelities" —
  conditioned on the stochastic/independent/scrambled error model as a
  consistency check; "above the classical-simulation crossover" —
  attributed and made a moving boundary; "stops being computable beyond
  50–70" contradiction with the 105-qubit campaign — resolved via
  partial-verification methods (selected amplitudes, patch/elided
  circuits, extrapolation) and the ask-what-was-verified instruction;
  "per-gate fidelity sanity check" — whole-circuit ensemble statistic.
- Measurement budget "latency to coherence ratio" — inverted and
  reframed as a crude scale with the disturbance/idle/decay caveats; ion
  latency parenthetical corrected (fluorescence; shelving/recooling
  separately timed).
- Feedforward metrics "the single most important set" + "vendors who do
  not publish latency are de facto signaling no real-time feedforward" —
  priority scoped, absence-inference replaced with verify-directly (both
  here and §22.14 fourth step).
- "Periodic dip right before the next calibration" — sawtooth demoted to
  a hypothesis to check against time-binned data.
- "Every vendor metric is the peak... typically 5%–30% worse" — the
  universalization and the dimensionless invented range replaced with
  the conditional-metric model and sustained-distribution ask.
- QED-C "device reports the largest size at which the fidelity threshold
  is met" — per-benchmark heterogeneity restored; "increasingly cited"
  hedged.
- Q-score "approximation ratio (typically β ≥ 0.2)" — normalized-score
  threshold with the β/QAOA-angle collision flagged.
- Mirror benchmarks "U†U" order/claim — run-then-compiled-inverse with
  randomizing Pauli layers; coherent-error revelation hedged
  (cancellation possible; randomized variants exist).
- §22.14: "median F2q below the heavy-output threshold of your circuit
  depth" (no such derivable threshold) → crude survival estimate
  F_2q^N2q; the T2echo/t2q go/no-go rule → scheduled-critical-path
  comparison with gate-error-first warning; "per-gate metrics always
  tell the real story" → diagnose/integrate/decide hierarchy.
- Sanity check 4 dimensional defect (CLOPS given shots/circuits, no
  layers) — rewritten in terms of L layers with the timing-boundary and
  missing-information questions.
- Sanity check 5 "surface-code cycle = one measurement + one feedforward
  correction" — reframed as a toy sequential loop with the two-direction
  misrepresentation (missing gates/reset; Pauli-frame tracking and
  soft deadline).

### FIXED — epistemic scoping
- IBM entry feedforward normalized to the §22.11 endpoint; Quantinuum
  entry "still climbing" dropped, logical-operations claim pointed at
  Appendix F, Helios successor split into an announced-generation note;
  IonQ "production-grade" → vendor designation; IQM row rewritten as
  product families with deployed-vs-announced split.

### ADJUDICATED
- The ledger's repeated "LaTeX defect: doubled backslashes" findings
  (\\, \\{ \\} etc.) — intentional house escaping for the GitHub
  renderer (documented in docs/github-markdown-math-bugs.md, enforced by
  lint and the build selftest); not changed. One newly introduced bare
  \, was caught by lint and corrected to the house form.

### DEFERRED-FACTCHECK
- Every dated record and vendor figure: single/two-qubit fidelity ranges
  (§22.3), 2025-cohort coherence values, CLOPS 1500–5000/200,000 and the
  Heron/Eagle attribution, QV milestone dates/devices, Morvan et al.
  parameters and Willow XEB campaign details, AQ 25/36 and the QED-C/AQ
  spec mapping, BACQ status, §22.13 per-vendor rows (Heron r2, Willow,
  H2/Helios, Forte, IQM, Aquila), reset/measurement/feedforward latency
  ranges — queued for the Appendix-F-driven machine-readable audit the
  ledger's improvement priority requests.

Twelve factcheck anchors requoted in the same commit; baseline (97)
held. Lint, factcheck lint, and the build selftest pass.

## Batch 28 — Chapter 23 (65 substitutions)

New drop processed (ledger extended through Ch27; Ch28 in progress and
untouched per the review-front rule).

### FIXED — outright defects
- QIR grouped with OpenQASM/Quil as a gate-level textual language — twice
  reclassified as an LLVM-based compiler IR (opening tower and §23.1);
  the scheduler no longer "emits the timed envelopes" (a separate,
  often vendor-private pulse lowering does); "every working SDK" and the
  layers/vendors-only difference claim scoped.
- The invented "Quantinuum H-series pulse format" removed (§23.1 example
  now Quil-T); §23.5's "Quantinuum allows pulse-level overrides for
  specialist users" replaced with gate-level-only cloud access and the
  research-lab/cloud distinction.
- "Typical workflow emits OpenQASM 3 to ship to the backend"
  contradicting the QPY/ISA note two paragraphs earlier — submission
  formats now enumerated (OpenQASM text, QPY, Braket IR, vendor formats);
  "chapters that follow" → sections.
- OpenQASM "de facto IR / finalized 2021 / standard target as of 2026 /
  ANTLR grammar / `qasm3` reference parser / round-trippable mappings /
  IBM+IonQ endpoint acceptance / any-major-SDK serialization" — all
  scoped: most widely used interchange language, evolving spec,
  `openqasm3` tooling, partial importer/exporter coverage with named
  loss classes, vendor-varying submission support, common-subset
  round-tripping; §23.4's "every framework can serialize to and from
  OpenQASM 3" false universal fixed to match.
- Dynamic-control advice "assume branches work on IBM and Quantinuum" —
  replaced with query-capabilities-everywhere.
- Quil "flat list" simplification and Quil-T DEFCAL syntax (frames/
  waveforms via DEFFRAME/DEFWAVEFORM) corrected; OpenQASM defcal
  "conceptually a port" lineage claim softened to "serves a similar
  role".
- §23.5 "Above the assembly layer" position inversion — pulse
  programming placed below the gate abstraction, with modality scoping
  and override-not-bypass framing; RB/GST miscast as pulse-sweep
  experiments → Rabi/DRAG/error-amplification tune-ups; the defcal
  example no longer teaches an impossible IBM workflow (language
  capability vs backend access made explicit); per-batch recalibration
  universal softened.
- Toffoli "decomposes into 6 CNOTs" fixed count — standard ancilla-free
  construction with the variant/ancilla/connectivity caveats; ion native
  set corrected to arbitrary-angle XX/ZZ-type entanglers.
- Depth-budget "2000 gate slots then noise-dominated" — arithmetic
  paired with the chapter's own two-qubit durations, cliff replaced by
  continuous accrual with gate error dominating first.
- Routing: index off-by-one (q_0…q_{n-1}, n ≤ m); "heuristics within a
  few percent of optimal" removed (optimum usually unknowable; SAT/ILP
  certify small instances); SABRE default claim version-scoped;
  LightSABRE "gives up optimality" likely inversion corrected to
  runtime-and-quality improvements folded into defaults.
- Neutral-atom rearrangement "achieves effective all-to-all" — replaced
  with reconfigurable-not-free (motion, heating/loss, radius, blockade);
  photonic connectivity extended to fusion/feedforward architecture;
  sanity check 3 rewritten off the same false premise (and its "SWAPs
  free" framing).
- Scheduling output "no longer a circuit... a timetable" and "a sequence
  of pulses (or defcal-expanded OpenQASM)" — instruction program with
  timing metadata and dt alignment; calibration binding and pulse
  lowering split into later vendor-private steps.
- "CNOT is 200–500 ns; measurement plus reset" — native-entangler
  naming, measurement and reset separated.
- Crosstalk idle slots called "dynamical decoupling time" — corrected
  (DD is deliberate refocusing pulses, §21.11).
- ALAP "minimizes idle exposure" rationale — corrected to
  pushing idle before the first gate (benign in |0⟩), no makespan
  change; ASAP re-motivated; production policies noted.
- §23.9: vendor calibration exposure universal (twice — the "all of
  which the vendor exposes" list and the closing "all major vendors")
  scoped with what is commonly vs rarely exposed, API-version drift, and
  compile-vs-execution staleness; "can easily double success" tied to
  its independent-error model; decomposition choice co-optimized with
  placement/routing.
- §23.10: depolarizing product "captures most of the variance" — demoted
  to first-order ranking heuristic with the convention-dependent
  conversion; DD "fast drive averages noise away" + "applied
  automatically at high optimization levels" — Magnus assumptions
  stated, automatic application unclaimed, insertion cost noted; PEC
  missing exponential sampling cost added and resilience-level API
  hedged; mitigation "out of the user's hands" — reporting duty and the
  semantics-preserving vs estimating distinction added.
- §23.11: "almost always the surface code... floquet or color-code
  variants for compass-coded estimates" — code menu corrected, compass
  phrase removed; space-time arrow chain split into distinct knobs;
  "Quantinuum's Resource Estimator (and older qsharp.estimator)"
  misattribution removed (qsharp is Microsoft's package); PyZX/pytket
  labeled logical counting, not estimators; RSA-2048 datapoint tied to
  the Gidney–Ekerå-style scenario with the assumptions-insufficient
  caveat and the more-than-one-order spread.
- §23.12: tensor-network "no easier than state vector" bounded; tool
  taxonomy fixed (libraries vs simulators); 2019 supremacy "rebutted" →
  cost-reduction with the experiment standing; density-matrix "n = 20
  with effort" → 16 TB at double precision (8 TB single) explicitly
  supercomputer-scale; "classical-shadows-based simulators" category
  error — reframed as measurement/estimation technique requiring a real
  simulator to generate data classically (selection sentence updated).
- §23.13: "hosting the optimizer next to the hardware" and "dominant
  model" scoped; Session "reserved slot" → priority-with-timeouts;
  pseudocode marked API-version-fluid with client-side classical_update;
  PennyLane QNode and TFQ misdescribed as hosted asynchronous runtimes —
  corrected; parameter-shift "any generator of order two" → e^{-iθP/2},
  P²=I with shot-noise caveat; Sessions "billed per reserved minute...
  faster and cheaper above a few jobs" — pricing variability and the
  latency-only robust claim substituted.
- §23.14: "three families" vs five units — "several families";
  unobservable/destroys/do-not-exist absolutes softened;
  `Statevector(circuit)` → `Statevector.from_instruction` + Aer save
  states; tomography O(4^n)-shots conflation → settings vs shots, state
  vs process (4^n vs 16^n); cross-platform diff made feasible
  (compare compiled artifacts first) with localization bounded and the
  debug-time superlative attributed as author experience; unit-test
  superlative softened.
- §23.15: QML "largest sustained user" → among the heaviest; PennyLane
  compose/persist overclaims → TorchLayer wrapper and parameters-only
  state_dict; TFQ "tighter than PennyLane" dropped; Qiskit ML QNNs
  correctly split into QNN/TorchConnector/sklearn-style classes with
  the speculative design-history clause removed; the classical-looking
  training loop now carries the hidden-cost warning; sanity check 2
  rebuilt on a non-trivial circuit with ISA/duration caveats.

### ADJUDICATED
- The ledger's British-spelling notes for this chapter ("flavoured",
  "parameterised", "serialised") were made against the pre-migration
  snapshot; the chapter is already American post-Batch-22. No action.
- §8.10 (Gottesman–Knill) and §9.13 (optimization techniques) internal
  references verified correct as written.

### DEFERRED-FACTCHECK
- All SDK/product/version claims: Qiskit 2.x release date and C API,
  TFQ 0.7.5/0.7.6 dates and maintenance status, PennyLane plugin roster,
  Braket vendor roster (AQT/OQC dates), Q# Modern QDK details, Ankaa/
  Aspen status, Quil-T spec details, OpenQASM spec/grammar tooling,
  transpile default-level change (Qiskit 1.3), SABRE/LightSABRE
  papers and Qiskit integration, stim/PyMatching versions, mitiq/Runtime
  mitigation options, Azure Resource Estimator I/O, distributed
  state-vector n≈50 frontier, Morvan et al. details — queued for the
  dated compatibility-matrix audit the ledger's improvement priority
  requests.

Thirty-two factcheck anchors requoted in the same commit; baseline (97)
held. Lint, factcheck lint, and the build selftest pass.

## Batch 29 — Chapter 24 (78 substitutions)

### FIXED — outright defects
- Classical simulation called "the lower bound against which advantage
  is measured" (twice) — corrected to classical baseline / upper bound
  on classical cost, with the that-is-why-the-frontier-moves point.
- Simulator as "ground-truth oracle" for XEB/RB/tomography validation —
  inverted: comparisons test the noise model; XEB ideal probabilities
  come from noiseless simulation; either side may be at fault.
- Path-sum bullet "stores nothing global... exponential in depth rather
  than width" — partition statevectors stored, cost governed by
  cut-crossing gates; density-matrix/trajectory bullet cast as a cheaper
  noisy escape — corrected (dimension squares; noise is a modeling need,
  not an escape).
- Polynomial compression alone said to resolve BQP-vs-BPP — efficient
  update/sampling/precision conditions added.
- Generic two-qubit gate "doubles the constant" — 4×4 quadruple
  transform; depth/gate-count conflation fixed (Θ(g·2^n)); 33-qubit
  traffic corrected to read+write.
- Diagonal gates "touch only amplitudes whose control qubits are set" —
  full phase sweep in general, controlled-phase special case, fusion
  noted; permutation "no arithmetic at all" → no floating-point
  arithmetic, data movement remains.
- General compilers said to reorder gates for simulator cache locality —
  simulator preprocessors vs hardware transpilers separated (objectives
  can oppose); "all rely on AVX-512/NEON/GPU" per-tool universal fixed.
- The record paragraph's likely-conflated attributions (JUQCS-A "on the
  Sunway TaihuLight and the K computer", Frontier/Fugaku pairings) and
  the unverifiable "50-qubit JUPITER run in late 2025" — replaced with
  the hedged, representation-aware version (compressed 2-byte encoding
  vs dense complex128; Appendix F to carry the dated list); "that wall
  does not move with hardware" literal falsehood fixed (doubling memory
  buys one qubit).
- Density-matrix thresholds "n≈20 on HPC, n=25 at the very edge" —
  replaced with the real table (n=20 is 16 TiB top-cluster, n=25 is
  16 PiB beyond current machines); §24.13's "right choice when n ≤ 20"
  and the decision tree's "n ≤ 20 — small but exact" fixed to n≈14–16
  locally; §24.13 exactness scoped to the supplied channel model with
  non-Markovian/leakage caveats.
- ρ → UρU† labeled "Heisenberg conjugation" — Schrödinger picture;
  Heisenberg transforms observables.
- Trajectory algorithm oversimplification — effective non-Hermitian
  drift + state-dependent jump probabilities (Kraus sampling for
  discrete noise); variance "1/N" → standard error ∝ 1/√N with
  observable-dependent constant; break-even "N ≈ 2^n so n > 25
  trajectories are the only option" — no universal rule, and tensor/
  stabilizer/Pauli methods share the field.
- Tableau mechanism: Hadamard "swaps an X row with a Z row" — corrected
  to swapping X/Z bit-columns for that qubit across rows; measurement
  outcome wording fixed (stabilizer membership, row operations).
- Stim "routinely 10^6 qubits and 10^8 gates/s on a laptop" — scoped to
  favorable workloads with orders-of-magnitude variation and the
  bit-packed sampling/detector machinery credited; "dominant tool...
  produces the threshold curves" → most widely used; curves come from
  circuit/noise/decoder studies.
- "Exponential cost in the number of T gates" universal — exponential in
  magic in the worst case; cancellation/structure can cheapen; "single T
  exits the stabilizer subgroup" wording fixed (group vs state set).
- Stabilizer-rank exponents flagged as asymptotic task-specific bounds
  with error dependence; "k ≲ 50 workstation / k ≲ 100 cluster"
  unsupported thresholds replaced by published-demonstration
  calibration; quasiprobability "weights ±1" and blanket qubit
  nonnegativity fixed (signed weights; contextuality caveat);
  "dual... pay (provably) exponentially" → related resource-theoretic
  approaches, upper bounds without matching lower bounds; the
  high-T-count-necessary-for-advantage fallacy corrected (caps advantage
  against these methods; proves nothing about all algorithms).
- Tensor-network "T = ∏A^(i)" pseudo-product notation dropped;
  "sparse factorization" → compressed; contract-and-truncate scoped to
  MPS/TEBD; "production tool for twenty years" and "back-end of choice
  for advantage-busting" scoped; volume-law "saturates χ = 2^{n/2}" →
  worst case across balanced cuts; "most circuits on near-term hardware
  stay small-χ" — removed (benchmarks deliberately entangle).
- MPS matrices "χ×χ" → varying χ_{i-1}×χ_i with scalar product;
  nonadjacent-gate "quadratic overhead" decomposed (O(distance) SWAPs +
  χ inflation); "§16" Trotter reference → §16.2; "χ = 50–200 for
  chemical accuracy" — chemical-accuracy convention removed for spin
  chains; Calabrese–Cardy universality bounded; "hard wall" softened to
  rapid exponential wall.
- DMRG: "converges geometrically for gapped 1D Hamiltonians" false
  theorem → algorithmic observation with stall caveats; "the method" and
  10^{-10} routine precision scoped; two-site sweep sequence corrected;
  Hamiltonian scope extended (MPO, long-range, chemistry); cylinder
  "χ ~ 2^w" → model-dependent exponential rate; "not enough to
  extrapolate to genuine 2D" → controlled extrapolation possible for
  some models/observables; "DMRG is the classical baseline" → one of the
  strongest, competitors named; 50-qubit/50-site Hubbard counting fixed
  (~100 spin-orbitals); "variational locking" jargon replaced.
- PEPS: boundary tensor indices (edges 3, corners 2); "exactly the area
  law" → area-law capacity with the approximability-theorem caveat;
  "routinely two to three orders slower" removed; "dominates... method
  of choice" territorial claims → leading contender sharing fields, with
  contested-territory framing; NQS "unstructured"/"originated"/"matched
  and exceeded PEPS" all scoped (architecture bias, popularized,
  budget-sensitive comparisons without certified error bars).
- Path-sum locality "only 2^k of the z entries differ" — corrected to
  matrix-element support (layers branch on every gated qubit); block
  cost "2^{n/B} × 4^{#cuts}" — operator-Schmidt-rank compounding with
  slicing/reuse; Sycamore "10,000 years to 15 hours" comparisons flagged
  as cross-hardware/task-accounting (both occurrences), "near-optimal" →
  highly effective; "limited entanglement spread" moral corrected to
  contraction geometry/treewidth.
- GPU section: H100 SKU-specific specs generalized; "most heavily
  optimized... all approach peak" scoped; "all-to-all communication of
  half the data" → pairwise partner exchanges/layout transposes;
  distributed record namings hedged to Appendix F; 30-qubit-on-16-GiB
  headroom fixed; "1000× routine" replaced with bandwidth-ratio
  reasoning; "cuQuantum-DM" product name → density-matrix library
  component; "no model-side changes" → modest integration effort.
- Noisy-circuits-easier: Aharonov–Ben-Or/Knill/BMS attributions (flagged
  as likely mismatched to the claimed statements) replaced with hedged
  threshold-era framing and factcheck deferral; "every circuit's output
  nearly classical" scoped to uncorrected circuits; "the only way" →
  load-bearing precondition.
- §24.14: "Zuchongzhi 3.0... 67–105 qubit device" likely-conflated
  specifics → series framing with Appendix F pointer (twice); Gordon
  Bell run labeled tensor-network (not statevector) with resource-parity
  caveat and the lightweight-core note; Alibaba "Tai Zhang" naming
  dropped; "as it always is" noise wording bounded; spoofing scope
  corrected (scores vs distributions); "consensus... ultimately
  vulnerable" and "verifiable structure leaves no room" → expectation
  with counterpoints (factoring's classical algorithms, QMA-hardness).
- §24.15 decision tree: first-match framing → triage with output/error
  as the root question; Clifford branch (distribution enumeration
  caveat, CHP historical); near-Clifford threshold de-universalized,
  methods-not-tools flagged; workstation branch runtime claim bounded;
  GPU branch capacity corrected (80 GiB holds n=32) and speedup claim
  removed; density-matrix branch made safe (n≈14–16); trajectory branch
  variance-driven; PEPS branch pluralized; path branch retooled
  (cotengra/cuTensorNet/quimb; treewidth not depth); the "no simulator →
  advantage" branch rebuilt with the structure checklist and the
  simulator-failure-is-not-device-success principle; closing "bounded by
  a physical quantity" → governed, with gradual boundaries; bridge's
  "n ≈ 50 at low depth" scalar removed.
- Sanity checks: 2 (runtime → scaling classification with
  underdetermination note), 4 (comparison-equivalence checklist),
  5 (histograms-vs-unitaries distinction with stronger checks).

### ADJUDICATED
- `Statevector(qc)` (flagged as likely invalid API) — verified working:
  `examples/statevector_simulation.py` runs in the pinned environment
  and is part of `make check-examples`. No change.
- §8.10 (Gottesman–Knill) reference verified correct.
- House math escaping (doubled backslashes) — intentional, as before.

### DEFERRED-FACTCHECK
- All supercomputer/record attributions (Sunway, Frontier, Fugaku,
  JUQCS, JUPITER, Gordon Bell 2021 details, core counts), Sycamore/
  Zuchongzhi/Jiuzhang experiment parameters, Pan–Chen–Zhang and
  follow-up runtimes, spoofing-line authorship, Bravyi–Gosset/Bravyi et
  al. exponents and benchmark details, Pashayan et al. framework
  details, Hastings/Calabrese–Cardy scopes, Carleo–Troyer NQS benchmark
  comparisons, GPU SKU specs, tool/product names (cuDensityMat,
  Intel-QS status) — queued for the sourced-benchmark audit the ledger's
  improvement priority requests.

Twenty-five factcheck anchors requoted in the same commit — 24 staled by
this batch plus one pre-existing baseline stale repaired in passing, so
the anchor baseline improves from 97 to 96. Lint, factcheck lint, and
the build selftest pass.

## Batch 30 — Chapter 25 (45 substitutions)

### FIXED — outright defects
- "The codes exist on paper" — QEC has theory plus small hardware
  demonstrations; corrected. Reading-guide §25.3 title mismatch aligned.
- The NISQ definition's noisy bullet duplicated the no-QEC bullet and
  claimed fidelity "multiplied across depth" universally — deduplicated
  and the compounding scoped to the stochastic model; the no-QEC
  bullet's "every gate adds error linearly / depth bounded by 1/error"
  bounded (coherent quadratic accumulation, width/idle/observable
  modifiers); "millions of qubits" tied to surface-code forecasts.
- Pre-2015 history "largest implementations were single-digit qubits" —
  false; corrected with annealer/special-purpose caveat.
- The ndε depth model packed n two-qubit gates into a layer (double the
  possible n/2) and equated global fidelity e^{-1} with random output —
  model corrected to ndε/2 (budget d~4, not 2), labeled a toy, and the
  global-fidelity-vs-useful-signal distinction added; "best-in-class
  ε = 5×10^-3" (contradicting Chapter 22's better records) reframed as a
  representative working value; sanity check 1 updated to match.
- Ion "3–4 orders slower" — one to four orders, gate-pair dependent.
- Neutral-atom rearrangement "flattens routing cost" — trades SWAPs for
  motion/loss/geometry (and §25.2's "dodge this cost" for ions/atoms →
  different currencies); nearest-neighbor routing "O(n) SWAPs per
  non-local gate" — corrected to O(√n) on 2D (O(n) is the 1D chain).
- "The fidelity numbers above are median parameters" contradicting the
  neutral-atom "reaching 99.5%" record — reframed as a flagged mix;
  QV/CLOPS "fold degradations in" split (QV partially; CLOPS is
  throughput).
- Per-shot "millisecond-to-second" range — extended down to tens of
  microseconds for batched superconducting execution.
- Barren plateaus "almost everywhere" — scoped to near-random ansätze
  with global costs, with the workarounds' caveats (HEA plateaus, UCC
  depth, classical-solution initialization undercutting the quantum
  case).
- Parameter-shift step cost Θ(pS) — corrected to ~2pGS (two shifts,
  measurement groups), totals and wall-clock revised (day to weeks);
  sanity check 3 given explicit assumptions (answer now 1.2×10^9 shots,
  ~14 days). §8.13 cross-reference verified valid (it states the rule).
- QEC "detects and reverses errors" — encode/syndrome/decode; "four
  techniques that matter most" → four prominent plus the rest of the
  toolbox; ZNE exponential-form "more robust" claim and "handful of
  variants" cost understatement fixed; PEC overhead formula e^{cdεn} →
  quasi-probability-norm framing with characterization/drift cost, and
  the "tens of two-qubit gates" universal cutoff removed; virtual
  distillation mechanism corrected to purified-quantity estimation with
  parallel-vs-sequential qubit cost, collective-circuit noise, and
  coherent-error limits; "too high for ZNE" ordering dropped; per-shot
  "few cents" pricing generalized.
- "50 spin-orbitals (per-electron basis functions)" — one-particle
  basis states ≈ one qubit each; laptop-reproduction claim reframed as
  sourced matched-task comparisons for Appendix F; classical shadows no
  longer cast as a reproduction simulator.
- Sycamore follow-ups "hours and then minutes on commodity hardware" —
  replaced with orders-of-magnitude reduction plus the matched-task
  caveat; Jiuzhang "76 detected photons" → up to 76; "whose benchmarks
  one trusts" → matched task/metric/resources; IBM utility paragraph's
  book-invented definition of "utility" — separated from the authors'
  own claim (gloss labeled as gloss); "largest computation ever run"
  given a stated-metric qualifier.
- Supremacy/advantage terminology — replaced with the literature's
  quantum-computational-advantage vs practical-advantage framing,
  best-*known*-classical qualifier, and "marketing angle" dropped.
- §25.5: QV "largest n" score confusion fixed; "best published
  2^19–2^20... metric has saturated" — contradiction with Chapter 22's
  2^25 record resolved (record cited, saturation replaced with
  verification-cost/metric-fit reasons); AQ suite list hedged to
  QED-C-derived; logical metrics split into per-round/per-gate/
  per-algorithm; the fitted trend lines (1.5×/year, fidelity arcs, QV
  doubling-then-plateau) and the 2030 extrapolation — replaced with
  labeled rough shapes, the no-curated-dataset admission, and a
  milestone-not-date framing.
- §25.6: "similar distance scaling" comparability bounded; "below
  threshold established for several platforms" and "distance-9 to -11
  in progress" — reported-with-definitions-pending plus
  announcements-are-not-demonstrations; "2d² plus ancillas" double count
  corrected to 2d²−1 including ancillas (with d=7→~100, d=21→~900,
  d≈29→~1,700), and the d=21-suffices-for-Shor claim — which
  contradicted sanity check 2's d=29 — removed in favor of the
  budget-and-architecture framing; T-count "10^9–10^12 for industrially
  relevant Shor or chemistry" → from ~10^9 upward, orders-of-magnitude
  variation; the 2030/2035–40 projections relabeled as single scenarios
  with wide error bars; the 2010/2020-vintage forecast retrospective
  hedged as selective without a dataset; "essentially zero" industrial
  cases → no widely accepted public demonstration; "multi-year
  exercise" hedged; sanity checks 2 and 5 aligned to the 2d²−1
  convention (check 5's "ignoring ancilla overhead" contradiction
  removed).

### DEFERRED-FACTCHECK
- All platform parameter cards (counts, fidelities, coherence, Oxford
  Ionics status), Preskill 2018 quotation scope, Sycamore/IBM-2.5-day/
  Jiuzhang/IBM-utility experiment details and classical follow-ups,
  Google/Quantinuum below-threshold experiment specifics, magic-state
  distillation demonstrations, QED-C/AQ suite composition — queued for
  the Appendix-F-driven audit.

Nineteen factcheck anchors requoted in the same commit; baseline (96)
held. Lint, factcheck lint, and the build selftest pass.

## Batch 31 — Chapter 26 (31 substitutions)

### FIXED — outright defects
- "If you only read one section" naming two sections — corrected, with
  the pain-ranking attributed as author experience; "previous chapters
  have built theory" → conceptual and engineering foundation; "won't
  waste device time" → minimizes avoidable waste.
- 16/512 "GB" → GiB; "large-memory server around 35–40" — 35 (n = 40 is
  16 TiB, distributed-cluster territory); tensor-network condition
  extended beyond bounded entropy; depolarizing model labeled the simple
  case with richer models referenced.
- Cloud access "almost exclusively" — scoped to public/commercial with
  the on-prem/lab exceptions; direct-vendor "each offers reserved-time
  and pay-per-shot" false universal — vendor-varying models with the
  Aquila-via-Braket correction; queue time "the dominant cost" and the
  "tens to hundreds of dollars per minute" pricing — hedged to
  provider/contract-specific, often non-public, with the workload-
  dependent dominance; VQE evening estimate given its dependencies.
- Cirq "cleaner Python" subjectivity attributed and Google-access
  reality added; PennyLane "pedagogically-best" attributed as author
  view; Q# "only major SDK with a real type system" false exclusivity —
  language-vs-library distinction substituted, "compiler is
  sophisticated / estimator is the gold standard" → most widely used
  public tool; the PennyLane→Qiskit→tket path reconciled with the
  stay-with-one-SDK advice (staged, milestone by milestone).
- §26.4 device shorthand "Quantinuum if shallow and small; IBM if
  longer" — unjustified and probably inverted (ion fidelity supports
  deeper circuits); replaced with the defined fewest-moving-parts
  criteria; "rarely the metric" frequency softened.
- Shot-budget advice "from the precision you need, not the precision
  you can afford" — corrected to need-then-check-affordability with the
  rescope-or-label-exploratory rule; "precision ~5·10^-3" labeled a
  standard error with the confidence-interval distinction.
- Estimator "rounded numbers" / "more accurately" false claims — actual
  output semantics (estimates plus metadata, no raw bits) and the
  audit-driven choice, with hand-aggregation parity noted.
- Screenshot recommendation → structured backend-properties artifact;
  three-way baseline "localizes bugs" → narrows hypotheses (shared-bug
  caveat); hardware RNG "that's physics" → sampling variation plus
  technical noise, stable distributions, no certified-randomness
  implication; the ibm_brisbane calibration example labeled an
  illustrative format, not a real archived run; "most reputable venues
  now expect" → many venues encourage or require, policy variation
  noted.
- arXiv "almost everything... journal version rarely meaningfully
  different" — scoped (categories beyond quant-ph, industrial/standards
  exceptions) and the journal-dismissal inverted into a
  compare-the-version-of-record instruction; "most papers are not worth
  a full read" → not relevant to your question; the 12–24-month
  classical-response prediction → check-not-calendar discipline;
  "path to madness" author-tracking advice → curation mix with
  prestige-bias warning; "trust the community to surface" → keep a
  periodic scan against the community's own biases.
- §26.8 "already produced real value" — decomposed (crypto
  threat-and-response, scientific insight, tooling — not computational
  advantage).
- Sanity check 3 rebuilt as a no-purchase published-pricing exercise
  with stated assumptions; check 4 given the fake-backend fallback and
  the compiled-against-snapshot semantics; check 5's presupposed
  pushback paper → search-with-negative-result-allowed.

### ADJUDICATED
- `Statevector(qc)` and the Bell example — verified working
  (examples/first_bell_program.py runs under the pinned environment and
  produces the printed output). No change.

### DEFERRED-FACTCHECK
- Provider rosters/tiers/plans (IBM free tier, Braket roster, Azure
  gateway list, Google access model), device counts and fidelity cards
  in §26.4, Qiskit 1.0–1.4 deprecation specifics, venue deposit
  policies — queued for the dated access-appendix the ledger's
  improvement priority requests.

Six factcheck anchors requoted in the same commit; baseline (96) held.
Lint, factcheck lint, and the build selftest pass.

## Batch 32 — Chapter 27 (53 substitutions)

Security-guidance chapter: absolutes and volatile standards claims fixed
with priority, per the ledger's warning that they are more consequential
here than ordinary textbook imprecision.

### FIXED — outright defects
- "Shor breaks every widely deployed public-key primitive" (opening and
  §27.1) — scoped to conventional pre-PQC factoring/DLP cryptography
  with deployed-PQC exceptions; Grover "constant factor" → quadratic
  query speedup / parameter pressure; NIST "standardized 2016–2024" and
  "process ran from 2016 to 2024" → initial standards 2024,
  standardization continuing; "production code" → shipping in
  hybrid/optional modes; QKD "physical laws, not computational hardness"
  → quantum mechanics plus device/protocol assumptions and an
  authenticated channel (twice); DLP taxonomy split (finite-field, EC,
  pairing).
- ECC "roughly half the qubits and gate count of RSA-2048" — mismatched
  classical levels flagged (ECC-256 vs RSA-3072), universal ratio
  removed, logical-vs-physical clarified; Gidney 2025 "under the same
  assumptions" — flagged as needing primary audit ("same assumptions it
  is not"); "current resource bounds" → scenarios; ECDLP proportional
  scaling removed; sanity check 2 rebuilt accordingly.
- AES Category-1 internal inconsistency — Category 1 as an AES-128
  quantum-attack benchmark reconciled with the ~2^83-Toffoli concrete
  cost, "thin 64-bit margin" language corrected; "every modern library"
  and "configuration change" hedged; superposition-query mode attacks
  de-generalized (construction-specific, Q1/Q2 models named, exotic
  settings acknowledged); "stop worrying about the symmetric layer" —
  replaced with hygiene-preserving guidance (and §27.11's "do not
  panic" likewise).
- SHA-256 collision "security somewhere between" — incompatible cost
  metrics named as such; hash-based signatures leaning on second
  preimage "which is the easier of the two" — factual inversion fixed
  (2^n vs 2^{n/2}; less degraded by quantum collision algorithms was
  the intended sense); "ultra-paranoid" → higher-assurance with
  category requirements.
- "Four families survived two decades and entered NIST" — fates
  differentiated; Kyber/Dilithium tagged with ML-KEM/ML-DSA names;
  hash-signature "slow to sign and verify" balanced; SIDH/SIKE break
  attribution corrected (Castryck–Decru plus independent/follow-up
  lines), candidate stage fixed, "wounded" replaced; Falcon/FN-DSA and
  HQC/FIPS 207 rows stripped of schedule predictions (check NIST);
  additional-signature roster pointed at NIST's page; FIPS name
  expansions corrected; hybrid "deployment norm... other still
  protects" conditioned on robust combiners, both-must-verify, and
  downgrade resistance (both occurrences).
- HNDL: live-traffic false dichotomy fixed; "every byte... archived
  forever" surveillance assertion → capability-and-assumption framing;
  universal present-deadline → Mosca's-inequality risk basis with
  long-lived/short-lived split; election-rolls example dropped;
  "community broadly... most credible estimates" → survey-clustered
  with disagreement and incentives; signature ephemerality
  simplification — archived-binary forgery, roots of trust, and
  timestamp chains restored, KEM-led-not-signatures-can-wait framing.
- QKD: QBER "reflects only channel noise" → bounds-not-certifies;
  privacy-amplification length → entropy accounting; intercept-resend
  "50% information per bit" → full knowledge on half the sifted bits,
  with the proofs-carry-the-general-case note; worked example's
  "channel basis" clarified; E91 "saturate Tsirelson's bound" → 
  sufficient violation (real devices never saturate), "the test detects
  her" bounded by DI formalization, DI conditions stated; B92 exclusion
  logic made explicit with the USD-in-spirit note; decoy-state "same
  security as ideal single-photon at half the rate" and "every
  commercial system" — both corrected; proof lineage no longer
  transferred to E91/B92 by parenthesis; finite-key "several percentage
  points lower" → parameter-dependent with detections-not-pulses note.
- QKD security: "cannot be undone except QM being wrong" → proof-model
  and assumption caveats; "every commercial QKD system has been broken"
  → multiple implementations with demonstrated attacks, "broken"
  disambiguated, countermeasures noted; "might as well skip QKD" false
  conclusion → everlasting-confidentiality trust profile and
  threat-model decision.
- §27.10: rate/distance table → representative, Appendix-F-bound
  figures; trusted nodes "decrypt and re-encrypt... all keys in
  cleartext" → key-material relay mechanics with the regression scoped;
  satellite trust nuance and the constellation cost analogy fixed;
  twin-field "circumvents PLOB" → beats the point-to-point scaling, no
  bound violated; "~300 km ceiling" removed; repeater distillation
  universal and "probably another decade" fixed; QDS quantum-memory
  universal and quantum-money "every concrete candidate" softened.
- §27.11: "every channel... all cloud-storage encryption at rest" —
  inventory-prioritized channels, with at-rest correctly separated into
  the key-wrapping architecture; performance "entirely affordable" →
  benchmark-on-your-stack; QKD "under 100 km" arbitrary threshold and
  the mandate claim replaced with requirement-driven geometry; archive
  advice "re-encrypt with PQC KEM" category error → KMS
  rewrap/rotate under crypto-agility with the already-harvested hard
  limit stated; "PQC is the universal solution" → broadly deployable.
- Sanity checks 1 (shorthand), 2 (rebuilt), 4 (bound-vs-implementation
  caveat), 5 (assumption + evidence-not-proof) repaired.

### DEFERRED-FACTCHECK
- All standards dates and rosters (NIST rounds, FIPS 203/204/205 dates,
  IR 8545, FIPS 206/207 stages), deployment claims (OpenSSL 3.5,
  Cloudflare/Google/Apple/AWS hybrids, PQ3, PQXDH, OpenSSH 9.9),
  PQC parameter sizes/timings (ML-KEM-768, ML-DSA-65, SLH-DSA-128s
  7,856 B, Falcon-512, mceliece6960119), Grassl/Jaques AES estimates,
  Chailloux exponents, Roetteler/Häner ECDLP estimates, Gidney–Ekerå
  and the reported 2025 refinement, QKD records and network claims
  (Micius, twin-field 500/830/1000 km, Beijing–Shanghai, EuroQCI),
  Lydersen 2010, decoy-state history — queued for the normative
  migration table and dated appendix the ledger's improvement priority
  requests.

No factcheck anchors staled (the chapter's mirror has five anchors,
none in edited spans); baseline (96) held. Lint, factcheck lint, and
the build selftest pass.

## Batch 33 — Chapter 28 (63 substitutions)

New drop processed (ledger extended through the full manuscript plus
support/archive passes in progress; archive/chapter0-drafts documents
are a separate research stream per the author and are not touched).

### FIXED — outright defects
- Opening: Hilbert-dimension-as-hardness bounded (symmetry/entanglement/
  sign-free tractability caveat); "only simulation has a clean
  exponential case" uniqueness claim corrected (Shor acknowledged; the
  demonstrably-inadequate claim demoted to per-problem).
- Born–Oppenheimer "nuclei as classical point charges" — separation of
  motion, clamped nuclei, nonadiabatic caveats; two-electron index
  conventions flagged; parity mapping's "symmetric to JW under
  particle–hole conjugation" replaced with the basis-transform fact and
  the tapering benefit; BK "competitive around M = 20–30" crossover
  de-universalized.
- One-norm made a key (not the) cost driver with the QPE/VQE roles
  split; factorization history predating 2018 restored; UCCSD "depth
  O(M^4) per step" → gate-count-vs-depth; ADAPT single-operator and
  "5–10×" claims bounded; VQE shot range 10^9–10^12 tied to scenario
  analyses.
- QPE "gold standard" → leading approach with alternatives; the query
  formula hedged; the "*exponential* improvement in precision"
  mislabel corrected to quadratic (O(1/ε) vs O(1/ε²)); "every credible
  2026 roadmap" → many leading roadmaps.
- FeMoco: "genuinely beyond the reach of classical methods" bounded;
  54–76 orbitals disambiguated as spatial (~108–152 spin-orbital
  qubits); bold numerals dropped; physical conversion tied to
  architectural assumptions; "estimates are honest... have stabilized"
  → explicit assumptions, comparative stability without guarantees;
  DMRG "uncontrolled extrapolation" → estimable model errors; "QPE
  would settle the disagreement" scoped to the chosen finite
  Hamiltonian; 2035/2050 binary dropped.
- §28.2: materials "lattice models rather than molecules" scope fixed;
  Hubbard cuprate consensus and methods-disagree simplification
  corrected (benchmark collaborations); Heisenberg strong-coupling
  J ≈ 4t²/U stated and qubit-cost caveats added; t-J hopping term given
  its missing h.c.; DFT density-vs-3N phrasing, band gaps moved from
  strengths to known weaknesses, exact-in-principle vs approximate
  functionals split, B3LYP/HSE roles noted; DMFT "solve exactly" and
  "controlled approximation in finite dimensions" corrected;
  Green's-function gloss fixed; impurity-solver "fits comfortably in
  20–100 qubits... tolerates moderate noise" bounded.
- §28.3: 10^20-determinant figure scoped; "one of the few candidate
  paths to complete calculations" bounded; fermionic-Hubbard species
  (Li/K) added; analog-measurement claim corrected (quantum-gas
  microscopes); spin-liquid definition nuanced; "DMRG works only" →
  restricted, with PEPS/VMC/ED contributing.
- §28.4: "the realistic 2026 path" → a leading path; DMET Schmidt
  bath-orbital vs Hilbert-dimension conflation fixed; "controlled
  approximation" → exact-in-limits, practically successful; the
  10–40-spin-orbital fragment's "20–80 qubits" doubling error →
  10–40 qubits; retarded Green's function given +i0^+ and expectation
  state; CASSCF misdescription fixed (orbital optimization; CASCI is
  the frozen version) and the 50–100-orbital "sweet spot" converted to
  spatial-orbital/qubit-count reality (fault-tolerant, not NISQ);
  "what makes the resource estimates believable" → tractable qubit
  counts with the embedding/measurement/iteration budget still owed.
- §28.5: Trotter "one layer per term / depth O(rL)" → gate count vs
  layer coloring; observable-robustness "chief result" → notable
  observation, not a theorem, with cross-check duty; post-Trotter
  complexity corrected to Θ(αt + log(1/ε)/loglog(1/ε)) matching §16,
  "exponentially better" scoped to precision-parameter dependence,
  ancilla-cheapness and universal-win claims bounded; "stochastic
  unfolding" → unraveling; Lindbladian "apply QSVT" overreach →
  dedicated constructions; NISQ/FT ranking marked unsettled; thermal
  "apply uniformly... competitive when classical fails" corrected
  (inherited hardness; scarce resource comparisons).
- §28.6: Wick-rotation positivity wording fixed; early-universe/
  finite-density conflation fixed; "sidesteps the sign problem"
  given its replacement bill; Schwinger "directly implementable" and
  "regimes where classical Monte Carlo cannot operate" bounded
  (tensor networks reach small 1D real-time instances); SU(3)
  10^7-qubit/10^20-T figures labeled assumption-laden placeholders.
- §28.7: PDE pattern universality bounded; HHL "polylog measurements"
  corrected to O(1/ε) amplitude estimation; Maxwell recast
  conditioned; Carleman R defined informally; Gross–Pitaevskii
  phrasing fixed (classical mean-field limit vs quantum many-body
  target).
- §28.8: DFT "5–10%" pseudo-accuracy replaced; "classical-quantum" QMC
  label fixed; area-law-implies-cheap-contraction bounded; advantage
  bullets de-absolutized (intrinsic → naturally suited; mathematically
  clear → structural sampling obstruction; 10–20-year credibility →
  scenario); $1M-cluster straw man removed; drug-discovery domain
  corrected (force fields/docking/MD) and mid-2030s forecast
  descheduled; closing "demonstrably inadequate" → strain hardest with
  a moving baseline.
- Sanity checks 1 and 3 given explicit orbital and accuracy
  conventions.

### DEFERRED-FACTCHECK
- Reiher/Berry/Lee/von Burg/Beverland FeMoco figures, Haber–Bosch ~1%
  statistic, nitrogenase stoichiometry, Martinez 2016 and successor LGT
  experiments, DMET/DMFT demonstration papers, ultracold-atom species
  and site counts, Carleman/Liu et al. details, Temme quantum
  Metropolis, basis-set names — queued for the four-column evidence
  grammar the ledger's improvement priority requests.

Eleven factcheck anchors requoted in the same commit; baseline (96)
held. Lint, factcheck lint, and the build selftest pass.

## Batch 34 — Chapter 29 (30 substitutions)

### FIXED — outright defects
- Opening "the three application areas" naming four; "no production
  deployment" scoped to publicly documented.
- QUBO upper-triangular convention flagged with the symmetric
  alternative and diagonal-carries-linear-terms note; the discrete
  Markowitz objective's all-i,j summation reconciled with that
  convention (halved off-diagonals); penalty-λ feasibility rule made
  derivable rather than guessed (precision cost noted); slack encoding
  scoped to integer b with the excess-values caveat.
- QAOA p→∞ "provably finds the ground state" — can-express framing
  with gap/schedule conditions and the existence-vs-finding split;
  p=1 0.6924 given its family assumptions; random baseline corrected to
  a guarantee statement; "no proof exists" absolutes dated and
  snapshot-scoped; the unbounded-limit tautology (classical methods
  "also succeed") replaced; universal simulated-annealing/tabu outcome
  scoped to published comparisons; RQAOA competitiveness attributed;
  the fabricated 50-qubit/depth-100/10^-3 2026 scenario labeled
  illustrative and reconciled with §25.2's error figure.
- Adiabatic theorem given its heuristic-form caveat and open-system
  reality (matching §§20.11/25.2); "NP-hard instances generally have
  exponentially small gaps at first-order transitions" — corrected to
  constructed-families-can with instance/path dependence and
  approximate-solution note; chain strength "without a principled
  setting" — bounds/heuristics/auto-tuning exist; benchmarking
  "consensus" → recurring finding; King-study constant-factor claim
  hedged within fitted ranges; "most industrial instances" → many
  reported; simulated-bifurcation 10^5-variable millisecond record
  contextualized; CIM "fundamentally classical" → deployed regimes
  commonly modeled classically, quantumness under study.
- Finance "most institutional investment" → among the heaviest;
  Markowitz q mislabeled risk aversion (multiplies return) → return-
  preference weight with the convention note; "box constraints" absent
  from the displayed program — long-only stated, boxes defined;
  "solved trivially in microseconds for N to 10^4" → efficient with
  realistic times and the Σ⪰0 assumption; binary encoding labeled the
  equal-weight selection model; cardinality penalty displayed; Gurobi/
  MOSEK "find the optimum in seconds" bounded; "no published
  demonstration" dated and match-conditioned; Goldman settlement
  regrouped as adjacent-problem.
- QAE encoding corrected: √p(x) preparation, normalized f, √f(x)
  ancilla amplitude, work-register compute/uncompute, probability (not
  amplitude) equals expectation; "real and proven" scoped to the
  oracle-query model; the 10^7-T option-pricing figure given its
  which-resources caveat and the European-call/path-dependent mismatch
  resolved; Taylor-expansion arithmetic broadened.
- "Third bucket" ordinal softened; job-shop variable count corrected
  (time-indexed O(J·O·T_max) vs binary-encoded log form with
  re-quadratization cost); one-hot-vs-binary rule converted to a
  two-sided tradeoff (one-hot's K-clique named; invalid binary codes
  noted).
- Sanity check 2's invalid proof rewritten (single-variable repair
  bound, explicit counterexample, globally sufficient λ from Σ|c_i|);
  check 3's exact-state claim relaxed to measurement support with
  phase/convention/degeneracy caveats; check 5's unverified "closer to
  50" figure replaced with a look-it-up instruction and the real
  structural determinants.

### DEFERRED-FACTCHECK
- D-Wave generations/counts/topologies, Advantage2 4,400/roadmap
  figures, clique capacities, King 2018 details, Toshiba SBM reports,
  CIM literature, GW/QAOA ratio theorems (0.6924/0.7559 scopes),
  Bravyi–Kliesch–Koenig–Tang RQAOA result, bank pilot specifics
  (Goldman/BBVA/Mizuho, VW/BMW/Daimler), Stamatopoulos et al. resource
  reporting, OpenSSL-era deployment claims — queued for sourced tables
  with cutoff dates.

Ten factcheck anchors requoted in the same commit; baseline (96) held.
Lint, factcheck lint, and the build selftest pass.

## Batch 35 — Chapter 30 (34 substitutions)

### FIXED — outright defects
- Category-2 "input is quantum" — reframed as quantum provenance with
  usually-classical records, and "no classical short-cut" bounded (twice:
  taxonomy and §30.3 opening — stabilizer/low-entanglement/surrogate
  exceptions named; provenance does not prove classical hardness).
- The four-cell taxonomy "lazy... QQ cell largely empty" dismissal —
  three categories now overlay the grid; QQ populated (autoencoders,
  coherent classification, channel learning, same-device workflows).
- §30.2 textbook examples given their suppressed assumptions
  (read-out limits, KP data structure, qPCA copy/rank/resolution, LS-SVM
  formulation); the malformed QRAM map corrected to the standard query
  with caller-supplied amplitudes and O(N) build cost; "unstable under
  noise" and the ~2020 "consensus" hedged; Tang access model completed
  (sample-and-query with preprocessing) and "artifact" reworded;
  follow-up program scoped to classical-data regimes with the
  heuristic-with-counterexamples framing; the surviving-Category-1
  contradiction resolved (quantum-state inputs migrate to Category 2)
  and burden-of-proof language made a labeled skeptic's heuristic.
- Tomography Ω(4^n) "every Pauli must be estimated" false explanation
  → parameter-counting rationale with metric/model dependence; classical
  shadows O(log M) oversimplification → full shadow-norm/ε²/δ scaling
  with the arbitrary-observable caveat and one-copy-per-sample note;
  Heisenberg 1/t vs "classical 1/√t" → metrology resource comparison
  (SQL), not quantum-vs-classical computation; learned-decoder advantage
  conditioned (analytic decoders incorporate bias; drift/latency risks)
  with the not-a-quantum-speedup note; property learning scoped to
  measurement models and weaker questions; the "consistent pattern /
  weak classical baselines / measurable wins" synthesis decomposed into
  heterogeneous wins with mostly-classical learners.
- §30.4 BQP/BPP-to-neural-network representation inference corrected
  (efficient-computation separation ≠ neural-representation claim;
  polynomial-size proviso); "demonstrably expressive" dropped;
  barren-plateau theorem scoped to 2-design-like circuits with the
  mean+variance concentration statement; the QCNN "only by encoding the
  answer" dismissal — replaced with locality/pooling-based guarantees;
  "generic models do not train" → no demonstration of scalable
  trainability (small sizes train fine); nonunital fixed-point error
  fixed (maximally mixed only for unital noise); no-advantage claim
  dated, language-modeling implication removed, kernel-dequantization
  category leak fixed, "adversarial replication" → independent.
- §30.5 kernel "fixed depth so noise obstructions do not apply" —
  plateau-free yes, noise-immune no (estimation error, PSD repair);
  Hilbert-dimension-as-advantage corrected (RBF is infinite-
  dimensional; hardness of evaluation is the source); Liu–Arunachalam–
  Temme separation relabeled computational with the check-the-theorem
  instruction (sanity check 4 aligned).
- §30.6 QCNN pooling description hedged to variants; "provably avoid"
  → stated-architecture guarantees; §30.7 SPSA mislabeled gradient-free
  → stochastic gradient approximation; the 23-day calculation given its
  serial/single-observable assumptions; §30.8 "constant-time
  superposition" corrected (polylog; distinct oracles); the false
  Shor-oracle explanation replaced (short classical input, computed
  modular exponentiation, no data-access asymmetry) and HHL's distinct
  reason separated; §30.9 "tools device teams use today" split by
  maturity; "most of what one needs" → much.

### DEFERRED-FACTCHECK
- Tang/KP/LMR/RML paper details, Huang–Kueng–Preskill constants,
  Huang–Tong–Fang–Su and Haah–Kothari–Tang statements, Cong–Choi–Lukin
  QCNN architecture details, Liu–Arunachalam–Temme theorem metric,
  Stokes et al. natural gradient, Cerezo reviews — queued.

Twelve factcheck anchors requoted (one twice after an em-dash
mismatch); baseline (96) held. Lint (which caught one bare norm escape
and one British spelling in newly added text — both fixed), factcheck
lint, and the build selftest pass. Full git diff reviewed before this
commit per the author's request.

## Review-front tracker (updated per batch; insert-only elsewhere)

Ledger `review-2026-07-19_01-20-35_CEST.md` @ 41,867 lines. Manuscript
files vs fix batches:

| File | Batch | Status |
|---|---|---|
| Prelude–Ch17 | 1–22 | done (earlier era) |
| Ch18, Ch19 | 23, 24 | done |
| Ch20, Ch21, Ch22 | 25, 26, 27 | done |
| Ch23–Ch27 | 28–32 | done |
| Ch28, Ch29, Ch30 | 33, 34, 35 | done |
| Ch31 | 36 | done |
| Ch32 | 37 | done |
| Ch33 | 38 | done |
| Ch34 | 39 | done |
| Ch35 | 40 | done |
| Ch36 | 41 | done |
| Ch37 | 42 | done |
| Preface | 43 | done |
| Background | 44 | done |
| Notation | 45 | done |
| Appendix A | 46 | done |
| Appendix B | 47 | done |
| Appendix C | 48 | done |
| Appendix D | 49 | done |
| Appendix E | 50 | done |
| Appendix F | 51 | done |
| Index | 52 | done |
| docs/fact-check-ledger.md, docs/github-markdown-math-bugs.md | 53 | done (file-level verdicts landed in the 2026-07-21 drop) |
| Reopened manuscript items (2026-07-21b drop: Robertson, SK, QND) | 54 | done |
| docs/render-tests matrix, upstream-feedback drafts | 55 | done |
| examples/deutsch_jozsa.py | 56 | done |
| Manuscript defects surfaced by mirror audit (2026-07-21c drop, Ch2–Ch12 + App E) | 57 | done |
| examples/ batch 2 (bell, grover, ordering, statevector) | 58 | done |
| Definite mirror-data defects (README, _pilot, _sources, App C mirror, prelude stub) | 59 | done |
| factcheck/ design decisions + check-citation infrastructure + reference distribution | 61 | done — author confirmed the no-ID human-readable model; reviewer's ID/schema recommendation formally declined |
| References sections moved into the book chapters (author-confirmed model) | 62 | done — unnumbered final `## References`, count-exempt per STYLE.md |
| References model finalized: dual lists (book + mirror) with bidirectional lint sync | 64 | done |
| README reader-first restructure + examples/ MIT licensing (author-approved) | 65 | done |
| Full infrastructure open-sourced under MIT; book stays dual-licensed (author decision) | 66 | done |
| Appendix F July-2026 refresh | 60 | done — web-verified; in-place fixes for pre-snapshot facts, dated F.8 update block for post-May facts |
| Manuscript defects from mirror audits Ch13–27 (2026-07-21d drop + prior tail) | 63 | done |
| Manuscript defects from mirror audits Ch28–36 (2026-07-21e drop) | 67 | done |
| docs/unified-book-process-framework.md parked as planning input | 67 | done |
| Book-body second pass Ch30-37 (2026-07-21f drop) | 68 | done |
| Review CONCLUDED 2026-07-22 (final synthesis + verdict) | 69 | done — P0-P3 remediation order folded into IDEAS.md |
| SVG/archive passes, remaining support files | — | reviewer in progress; archive/chapter0-drafts excluded per author (separate research stream) |

Working method from batch 36 on: fixes are driven by the ledger's own
per-chapter "highest-priority correctness repairs" synthesis lists,
with detail units consulted only where a fix needs exact context.

## Batch 36 — Chapter 31 (17 substitutions)

Driven by the ledger's own highest-priority repair list for this
chapter (working method per the tracker above).

### FIXED — outright defects
- QFI resource bookkeeping: the GHZ derivation no longer double-counts
  N (per-preparation bound 1/F_Q = 1/N² stated explicitly); "quadratic
  improvement" pinned to variance with the √N standard-deviation note;
  QFI's figure-of-merit scope and the measurements-already-inside-QFI
  optimization wording fixed.
- Allan deviation "(NT)^{-1/2}" dimensional/formula defect — replaced
  with 1/√N and 1/√τ scaling plus the omitted dependencies; clock
  uncertainty vs instability vs comparison accuracy disentangled (twice:
  opening and §31.2); entanglement-enhanced clocks relabeled below-SQL
  demonstrations, not Heisenberg scaling; NV single-biomolecule claim
  hedged to demonstrations.
- SQUID: DC-form architecture specified; the fT/√Hz "flux noise" unit
  error corrected (μΦ_0/√Hz flux noise; field sensitivity via pickup
  geometry).
- LIGO squeezing "25–50% event-rate increase" reconciled with the
  band-limited reality (tens of percent, naive SNR³ conversion far
  larger); sanity check 5 rebuilt around exactly that gap (its idealized
  answer, ~2.8×–7.9×, had contradicted the prose).
- Quantum-illumination idler "both arms see thermal photons" confusion
  fixed (returned signal swamped, idler clean); 6 dB scoped to the ideal
  Chernoff-bound theorem.
- Compressed-sensing tomography: settings-vs-shots split, missing ε
  dependence restored, still-exponential-in-qubits stated, estimator
  named, "the right tool" demoted to one candidate with the
  low-rank-when-broken caveat.
- Process tomography: 4^{2n}-complex-parameters/16^n-shots conflation
  fixed (PTM entries vs configurations vs shots); RB "single fidelity
  per Clifford at constant shot cost" corrected (Clifford-set average,
  modest not constant); sanity check 4's invalid 16^n-vs-RB factor
  question rebuilt with explicit budgets and deliverable comparison.
- Verification framing: "same tomography toolkit" replaced
  (measure-vs-convince); Mahadev "cryptographic analog of state
  tomography" removed (committed measurements; verifier reconstructs
  nothing).
- EEG removed from magnetometer beneficiaries (electrical sibling
  note).

### DEFERRED-FACTCHECK
- All record/platform figures: clock uncertainties and institutions,
  Al+ 9.4e-19, Sr/Yb transition frequencies, NV/SERF sensitivities, MEG
  channel counts, OPM vendors, gravimeter sensitivities, LIGO filter
  cavity and squeezing levels, megapixel sub-shot-noise imaging, MIT LL
  microwave illumination, Mahadev protocol details.

Eight factcheck anchors requoted in the same commit; baseline (96)
held. Lint, factcheck lint, and the build selftest pass; diff reviewed
before push.

## Batch 37 — Chapter 32 (16 substitutions)

Driven by the ledger's highest-priority repair list.

### FIXED — outright defects
- Adiabatic runtime bound labeled one sufficient form (not the
  theorem), gap-implication made one-directional, gap-identification
  hardness hedged; 2-local restriction no longer implies nonuniversality
  (2-local AQC is universal); perturbative-gadget "larger gaps" sign
  error corrected (reduced effective gaps, ancillas, energy scales).
- Photonic MBQC "deterministic runtime" overstatement — resource
  generation probabilistic/expensive, interaction problem relocated not
  eliminated, feed-forward and losses keep runtime short of
  deterministic.
- Anyon "representation group" → braid-group representation with the
  Abelian/non-Abelian phase/matrix split; topological protection
  bounded (thermal creation, poisoning, measurement errors; strong not
  absolute); "passively protected... dramatically reducing overhead" →
  substantial passive protection, potentially reduced overhead, with
  non-Clifford operations outside it.
- Non-Gaussian gate/measurement separation restored; the Lloyd–
  Braunstein "any non-Gaussian gate" universality folklore corrected to
  the theorem's polynomial-Hamiltonian form.
- Permanent "all signs positive" → no alternating signs, complex
  summands; the #P-hard-implies-sampling-hard leap replaced with the
  AA conjecture structure; "cannot solve decision problems" →
  nonuniversal with postprocessing uses, plus the verification open
  problem.
- Primality moved out of the BPP poster-child list (AKS/P); BQP
  intermediate states no longer called distributions over basis states;
  BPP/Toffoli "strict subsets of BQP" → containment with conjectured
  strictness.
- Sanity checks 1 and 2 given the concrete instance/graph they lacked;
  check 3 recast at the level the chapter actually teaches.

### DEFERRED-FACTCHECK
- Majorana/Fibonacci status and ν=12/5 evidence, retraction history,
  company architectures (PsiQuantum/Xanadu), D-Wave products, Jiuzhang/
  Borealis claims and classical responses, AvDKLR 2004 and RBB theorem
  scopes, Bartlett et al. citation.

Two factcheck anchors requoted; baseline (96) held. All checks pass;
diff reviewed before push.

## Batch 38 — Chapter 33 (15 substitutions)

Driven by the ledger's highest-priority repair list.

### FIXED — outright defects
- Computation/communication false dichotomy (sensing acknowledged);
  satellite "cannot keep a quantum memory in orbit" motivation replaced
  with the real constraints; BB84 attack story modernized
  (intercept-resend as entry point, general-attack proofs carry
  security); E91 "maximal violation" → sufficient violation with the
  near-maximal self-testing limit; decoy-state "affects all intensities
  equally" wording corrected to per-intensity yield/error bounding, and
  "every deployed BB84 system" scoped to weak-coherent systems.
- Repeater generations: BDCZ credited with the nested-repeater concept
  (classification organized later); second-generation signaling
  description fixed (adjacent-link two-way, not swap-only); third-
  generation encodings disaggregated (parity/tree vs bosonic cat/GKP);
  "memoryless" disambiguated (simultaneous-success swapping vs
  all-photonic architectures) and DLCZ "all subsequent designs"
  bounded.
- Twin-field/MDI relay security rationale corrected (adversarial
  announcements, heralding-only midpoint — not "tampering affects both
  arms identically"); "only QKD protocol that beats PLOB" hedged;
  "300 km threshold where BB84 collapses" → few-hundred-km fade, no
  fixed threshold; satellite downlink wavelength de-universalized
  (Micius ~800 nm) and Micius's trusted-relay role stated; the
  four-layer stack reattributed to the Delft lineage rather than the
  2018 Science paper alone; trusted-node "decrypt and re-encrypt"
  corrected to key-material relay (matching §27.10); the
  entanglement-instead-of-latency RPC analogy fixed (corrections still
  pay classical latency).

### DEFERRED-FACTCHECK
- TF-QKD distance records (511/605/658/830/1000+ km) and groups,
  Micius dates/stations/rates, satellite mission roster (SpeQtre,
  QEYSSat, EAGLE-1, QUBE-II), commercial vendor list and rates,
  network testbeds (Beijing–Shanghai, EuroQCI, Tokyo, US), Delft/NV
  repeater milestones, simulator status, Muralidharan classification
  details.

No factcheck anchors staled; baseline (96) held. All checks pass; diff
reviewed before push.

## Batch 39 — Chapter 34 (18 substitutions)

Driven by the ledger's highest-priority repair list.

### FIXED — outright defects
- Postulate linearity scoped to evolution (measurement as its own
  postulate); the quantum-computer-pays-O(1) implication bounded
  (per-native-gate cost; arbitrary unitaries still cost exponentially
  many gates); the bandpass-filter analogy corrected to all-pass phase
  shaping (unitarity attenuates nothing) and Trotterization moved from
  filter discretization to operator splitting; amplitude-vectors-as-
  probability-distributions fixed in both the register model and the
  qubit-misconception item; ancilla-discard semantics corrected
  (entangled vs disentangled discard); the native-gate-set ISA extended
  to measurement/reset/real-time control; backprop's advantage
  reattributed from "classical reversibility" to caching/memoization
  with the no-cloning contrast; depth demoted to a layer-count proxy
  for wall-clock (scheduled critical path governs); multiplicative-
  fidelity claim tied to the independent-error picture; §34.7 renamed
  to "Software-Stack and Tooling Analogies" (its content) with the TOC
  regenerated; §34.8's "transfer almost without modification" replaced
  and per-item break conditions added (DAG/crosstalk, multi-objective
  budgeting, certified randomness and drift, physical-vs-numerical
  error); the coherent-overrotation arithmetic fixed (aligned (2ε)²,
  cancellation, incoherent 2ε²); the logical-qubit example corrected
  (10^-2 at-threshold, 100@10^-4 giving one-or-two d=5 patches via
  2d²−1) and the dimensionally odd product-metric rephrased as a joint
  budget.

One factcheck anchor requoted; baseline (96) held. Lint, anchors, TOC,
and build selftest pass; diff reviewed before push.

## Batch 40 — Chapter 35 (13 substitutions)

Driven by the ledger's highest-priority repair list.

### FIXED — outright defects
- The no-signaling statement generalized from projective collapse to
  the full quantum-instrument (Kraus) form, with the traced-out
  identity $\sum_a \mathrm{tr}_A((K_a \otimes I)\rho_{AB}(K_a^{\dagger}
  \otimes I)) = \rho_B$; the Robertson-relation discussion corrected
  for the trivial-bound case (right-hand side can vanish in an
  eigenstate, so the product bound alone proves nothing there — the
  Pauli-observable argument reworked accordingly); the EPR passage now
  credits the original 1935 position–momentum argument and labels the
  spin version as Bohm's reformulation (§7.7); the Bell-theorem
  conclusion stated as the formal trilemma (locality, measurement
  independence, outcome definiteness — one must go) instead of a flat
  "nature is nonlocal"; the Wigner's-friend passage hedged to
  neutrality among responses; collapse theories (GRW/CSL) separated
  from interpretations proper — they are rival *theories* with
  different empirical content; the QBism paragraph softened from
  endorsement to description; "shut up and calculate" given a note
  acknowledging foundations work as legitimate physics; the
  "quantum information is conserved" claim reattributed from the
  no-cloning/no-deleting pair to unitarity itself (the theorems are
  consequences, not the source); the no-speedup list's overbroad
  entries hedged (linear programming and graph problems have partial
  quantum improvements, not blanket "no speedup"); the decoherence
  section notes the improper-mixture caveat (reduced states are not
  ignorance-interpretable ensembles); "Bell rules out hidden
  variables" qualified to *local* hidden variables (Bohmian mechanics
  survives as a nonlocal counterexample).

Two factcheck anchors requoted; baseline (96) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 41 — Chapter 36 (14 substitutions)

Driven by the ledger's highest-priority repair list.

### FIXED — outright defects
- The $nd\epsilon$ "depth budget" demoted to the Chapter 25 toy-model
  heuristic it is ($F \approx e^{-nd\epsilon/2}$ under independent
  equal errors), with the real determinants named and the 1000@1% vs
  100@0.1% comparison conditioned on comparable depth/gate density;
  the same repair applied to exercise 4; median-fidelity and
  compound-metric caveats added (tails/drift; protocol-defined and
  gameable). The Grover hypothetical corrected: $(\pi/4)\sqrt{N}
  \approx 26{,}000$ iterations at $N = 2^{30}$ (not "roughly
  $2^{15}$"), the fabricated millions-of-Toffolis oracle cost removed
  (no universal per-query count), the SAT comparison restated
  structurally, and "asymptotic facts" hedged to model-relative
  scaling statements. The dequantization-survivors passage rescoped:
  BQP-completeness holds for suitably constructed local-Hamiltonian
  instances (succinct access is itself a model; BQP≠BPP unproven;
  tractable instance classes listed); abelian HSP survives for an
  input-access reason, not BQP-completeness; XEB separated from
  sampling hardness (spoofing vs sampling), "useless tasks" replaced
  with no-established-application, and the self-referential "§36.3
  below" cross-reference redirected to §36.7. HHL checklist entries
  fixed: output is the amplitude-encoded normalized solution, readout
  is tomography-like (at least linear in $N$, precision-dependent)
  rather than a flat $\Theta(N)$, classical output itself costs
  $\Omega(N)$, and the honest use case (global observables) stated;
  block-encoding $\alpha$ relabeled construction-dependent
  normalization (one-norm only for LCU), parameter dependence
  distinguished from constants, and the near-term practicality test
  replaced with the fault-tolerant one. Benchmark checklist: a
  laptop-beaten benchmark is still a benchmark (it fails to show
  intractability; the classical run proves one implementation, not
  universal easiness); "Haar-random circuits" corrected to random
  local circuits approaching designs, with the sparse-magic
  tractability caveat. Roadmap section: qubit-growth arithmetic fixed
  ($1000 \times 1.5^4 \approx 5{,}000$; three orders short of $10^7$,
  not two; chip vs networked module distinguished; four points do not
  establish an exponential), the $10^4$-physical "possibly enough for
  chemistry" claim removed ($10^6$-range counts implied), NISQ shot
  rate separated from fault-tolerant logical-cycle/T-factory
  throughput, and "anyone giving narrower bounds is selling
  something" replaced with an evidence-audit standard. IBM utility
  case: the production-tool inference removed — classical agreement
  validates accuracy on tested observables only; utility defined per
  IBM's own framing; judgment referred to exact primary wording.

One factcheck anchor requoted; baseline (96) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 42 — Chapter 37 (10 substitutions)

Driven by the ledger's highest-priority repair list.

### FIXED — outright defects
- "Gates per coherence time" demoted from "the platform-fair figure
  of merit" to one useful ratio, with the omitted axes named (gate
  fidelity, parallelism, connectivity, SPAM, leakage, duty cycle,
  correlated noise; control-limited vs coherence-limited gates). The
  "three things are roughly knowable" framing corrected (it listed
  two) and softened to assumption-laden extrapolation. The growth
  arithmetic repaired to match Chapter 36's fix: $1000 \times 1.5^4
  \approx 5{,}000$ per chip by 2030 (system-level $10^4$ only via
  networking), $\sim 4\times10^4$–$3\times10^5$ by 2035–2040 (the
  $10^5$–$10^6$ range requires acceleration), and the
  physical-count-to-$10^9$-logical-operations inference removed
  (distance, cycle time, factories, decoder throughput all
  unresolved by count alone). The application-ordering premise
  restated as overall resource demand with inter-study variation.
  The small-molecule bullet corrected: hardness is active
  spaces/correlation, not size; $\sim 100$ logical *data* qubits but
  emphatically not modest depth (large non-Clifford counts);
  front-runner downgraded to plausible. Shor resources reconciled
  with Chapters 27/36 (Gidney–Ekerå-style: $10^3$–$10^4$ logical,
  distance mid-20s, $10^9$–$10^{10}$ Toffoli-equivalent, $\sim 10^7$
  physical). The migration deadline decoupled from the break date
  via HNDL (§27.6). The "provable speedups" bullet stratified:
  Grover provable in the query model; Shor best-known-classical only
  (no proven lower bound); phase estimation access-model-dependent;
  HHL assumption-laden; constructed simulation instances BQP-hard
  with tractable physical cases. The Shor-vs-$10M-cluster cost
  comparison replaced with an explicit scenario comparison against
  GNFS. Sanity check 3 repaired: $2d^2 - 1$ patch formula (matching
  §25.6), idealized-patch labeling with routing/factory/yield
  caveats, fidelity-alone insufficiency made part of the exercise,
  and the answer redirected to published estimates.

Three factcheck anchors requoted; baseline (96) held. Lint and
anchor checks pass; diff reviewed before push.

## Batch 43 — Preface (10 substitutions)

Driven by the ledger's highest-priority correctness list, plus the
clearest of its editorial items where they overlapped correctness.

### FIXED — outright defects
- License summary repaired against the actual CC BY-NC-ND terms and
  the root LICENSE: non-commercial *verbatim* sharing (print
  included) is permitted with attribution, distributing modified
  versions is not — the previous summary wrongly claimed printed
  distribution categorically requires a separate license and
  overstated the derivative prohibition; summary explicitly
  subordinated to the LICENSE file. Intent paragraph: "free" scoped
  to price, the "licensing conflict" a permissive license would
  create rephrased as the exclusivity objective, and the
  get-in-touch examples corrected to uses the CC terms genuinely do
  not cover (paid course packs, distributed translations,
  commercial printing). Qiskit convention paragraph: the `0b01`
  printout replaced with the actual `get_counts()` count-string
  API, "display order" unpacked into the distinct conventions
  (integer interpretation, statevector indexing, count strings),
  version check pointed at the bit-ordering guide (§4.8 mapping
  cross-reference verified present in Chapter 4). QFT paragraph:
  per-SDK sign claim redirected to per-function documentation
  (inverse flags exist), and the angle-conjugation shortcut widened
  — crossing conventions can also require QFT/inverse-QFT swap and
  phase-sign reinterpretation. Bloch paragraph: "no honest
  generalization" corrected — generalized Bloch-vector
  representations exist but lose the sphere's simple faithful
  geometry; the one-qubit picture acknowledged as exact (interior =
  mixed states), not merely metaphorical. Reading paths: "complete
  picture" → "the book's complete arc"; algorithms path relabeled
  recommended-compact (not "shortest viable") with the Chapter 12
  and Part VIII omissions named; hardware path given a Chapters
  9–11 backfill expectation; applications path bounded (critical
  questions, not due diligence).

One pre-existing baseline-stale anchor repaired while editing its
passage (Qiskit display-order card); baseline updated 96 → 95. Lint
and anchor checks pass; diff reviewed before push.

## Batch 44 — Background and self-check (10 substitutions)

Driven by the ledger's highest-priority correctness and consistency
lists.

### FIXED — outright defects
- SC.4 heading reconciled with its own body text (information theory
  explicitly unassumed → "(Basic Information Theory Optional)"; TOC
  regenerated). Shannon entropy given its log base ($\log_2$, bits)
  and the distributional-not-single-event intuition. SC.4.2: the
  "99 percent accurate" phrase — contradicting the problem's own
  sensitivity/specificity distinction — replaced with the correct
  statement (99% of positives in this population are false
  positives), and Bayes de-universalized from "every probabilistic
  quantum subroutine" to many inference/postselection analyses.
  SC.4.3: the bare "$N \sim 10^4$" answer made confidence-explicit
  (1 SD → 2,500; 95% normal worst case → ~9,600, the source of the
  round figure; Hoeffding 95% → ~18,400). SC.5: promise problems
  and oracle complexity separated into two defined concepts with
  the hidden-oracle-cost caveat, and prior familiarity dropped as a
  requirement; the NP-misconception paragraph rewritten (prevailing
  belief, per-algorithm accuracy for Shor/Grover/HHL, the open
  question named as $\mathrm{NP} \subseteq \mathrm{BQP}$); SC.5.2's
  answer changed from "False" to "Unknown — and widely believed
  false" with the incomparability expectation marked unproven;
  Sipser/Arora–Barak references pinned to edition/content with the
  density caveat. SC.6: the matrix-exponential identity scoped to
  constant $A$ and repositioned as a comfort level rather than a
  prerequisite. SC.7: the "transfer almost without modification"
  DSP claim split into what transfers (aliasing, time-frequency
  trade) and what does not (windowing; no measurement access to the
  transformed amplitude vector).

One new anchor requoted (SC.5.2) and one pre-existing
baseline-stale anchor repaired (GNFS regime card); baseline updated
95 → 94. Lint, anchors, and TOC checks pass; diff reviewed before
push.

## Batch 45 — Notation and conventions (17 substitutions + Appendix A touch-up)

Driven by the ledger's highest-priority correctness and consistency
lists.

### FIXED — outright defects
- Asymptotics: big-O given $c > 0$ and $|g(n)|$; big-Omega
  quantified over $n \ge n_0$ with the nonnegativity convention
  stated; Theta reworded ($g$ tight for $f$); soft-O defined as
  $O(g(n)\log^k n)$ in the scale variable with a
  suppressed-variables directive. Indexing default reconciled with
  §N.2 (code zero-based, formulas frequently one-based; medium sets
  the default) — removing the false "rare one-indexed sum" claim.
  Gate-catalog sentence now names $T$ (which was displayed) and
  notes matrices are exact representatives with physical gates
  defined up to global phase. Norm count corrected five → six (five
  norms-or-moduli plus the operator absolute value). Polar
  decomposition given the partial-isometry nuance for
  singular/rectangular $A$. Outer product corrected to rank at most
  one. Part numbering unified to Roman (Parts II–VI, III–VI; same
  fix applied to the mirrored sentence in Appendix A). Partial
  trace scoped ($A$ on retained $V$, $B$ on $W$; density-operator
  caveat). Independence written with explicit marginals
  ($p_X p_Y$, all $x, y$) and the orthogonality-glyph collision
  noted. Expectation/variance written as $\mathbb{E}[g(X)]$ with
  $p_i = p(x_i)$, variance restricted to real $g$ with the complex
  form given. "Nondegenerate orthonormal basis" replaced by
  rank-one projective measurement with the $P_i =
  |b_i\rangle\langle b_i|$ connection. QFT conversion advice
  aligned with the preface repair (angle conjugation is the
  minimum; QFT/inverse-QFT swap and phase-sign reinterpretation may
  also be needed; per-function, not per-SDK).

One factcheck anchor requoted; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 46 — Appendix A (14 substitutions)

Driven by the ledger's highest-priority correctness list; the
`QFTGate` sign claim was re-verified executably in this repo's
pinned environment (Qiskit 2.4.1: positive-exponent DFT in Qiskit's
own index convention) before rewording.

### FIXED — outright defects
- Outer product corrected to rank at most one. SVD given explicit
  dimensions ($U$ $m{\times}m$, $V$ $n{\times}n$, $\Sigma$
  rectangular-diagonal $m{\times}n$); condition number scoped to
  invertible square matrices with the singular/$\infty$ and
  pseudo-inverse (smallest-nonzero) conventions stated. Partial
  trace scoped to the retained-vs-traced subsystems with the
  density-operator caveat. The insert-a-SWAP-layer prescription
  replaced with software reconciliation (wire order at
  construction, output-array permutation, reindexing) — a physical
  SWAP layer costs gates and noise. Rank-one Born rule reworded
  (orthonormal basis, $P_i = |b_i\rangle\langle b_i|$; bases are
  not "nondegenerate"). Wire-state language fixed: entangled wires
  carry no per-wire state; the register owns the state. SWAP action
  written in established ket notation ($|a\rangle|b\rangle$, no
  comma-kets). `QFTGate` claim version-pinned and verified, with
  the bit-ordering reconciliation condition and an executable-check
  pointer replacing "current". Independence written with explicit
  marginals and the orthogonality-glyph note; expectation/variance
  written as $\mathbb{E}[g(X)]$/$\mathrm{Var}[g(X)]$ with the
  complex-variance form — all now matching the repaired §N.6.
  Shannon-entropy range conditioned on finite support; KL given its
  zero-support conventions and the not-a-metric warning.

No factcheck anchors staled; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 47 — Appendix B (10 substitutions)

Driven by the ledger's highest-priority correctness list.

### FIXED — outright defects
- CNOT spectrum corrected: eigenvalue $+1$ with multiplicity three
  and $-1$ with multiplicity one (not two each), with the block
  accounting shown. The false "only common symmetric
  basis-permutation gate" SWAP claim replaced by the accurate
  contrast (CNOT permutes without symmetry; CZ is symmetric with a
  sign, not a permutation), and SWAP's action written in tensor-ket
  form. The all-physical-qubits-are-spin claim rewritten as SU(2)
  double-cover structure carried by every two-level system, with
  transmon/photonic counterexamples. $P(\varphi)$ Hermiticity
  stated modulo $2\pi$ periodicity. The invalid $|1, Ub\rangle$
  action rewritten as $|1\rangle \otimes U|b\rangle$. The
  diagonal-controlled-gate symmetry claim restricted to
  $U = \mathrm{diag}(1, e^{i\phi})$ (general diagonal
  $\mathrm{diag}(a, b)$ with $a \neq 1$ is not symmetric). The
  Heisenberg conjugation direction given its convention note
  ($G P G^\dagger$ here; $G^\dagger P G$ equally common; identical
  for $H$). The CZ endian sentence rewritten in basis-permutation
  terms (endianness can never introduce signs). Axis-rotation
  noncommutation qualified to "in general"; the multi-controlled-X
  exceptional kets written as explicit tensor products.

Two factcheck anchors requoted; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 48 — Appendix C (11 substitutions)

Driven by the ledger's highest-priority correctness list.

### FIXED — outright defects
- The idiosyncratic $\varepsilon_{ABC}$ Pauli-product form replaced
  by the standard indexed identity
  $\sigma_j \sigma_k = \delta_{jk} I + i \sum_l \epsilon_{jkl}
  \sigma_l$ (with the commutator form), covering equal and distinct
  cases at once. The wrong renderer cross-reference to Appendix E
  (the glossary) redirected to §N.2 and the renderer-bug memo. The
  functional-calculus bullet scoped to normal operators with the
  finite-dimensional spectral-decomposition definition and the
  projector argument. The U3 wording corrected: three Euler angles
  and a fixed phase representative, no fourth overall-phase
  parameter. KAK parameter counting made consistent (SU(2) locals:
  $3 + 12 + 1 = 16$). The self-contradictory "saturate strictly
  less" sentence (SWAP uses all three) rewritten as "may need fewer
  — though not always". The two-CNOT condition pinned to the
  canonical Weyl-chamber coordinates of §8.14 instead of "after
  relabeling axes". The Toffoli sketch corrected from the hybrid
  "two-CNOT-each controlled-$\sqrt X$ stages" description to the
  standard phase-polynomial ladder with a pointer to the drawn
  circuit; the optimality claim scoped (exact, ancilla-free,
  measurement-free, standard gate model) with the ancilla-assisted
  reduction restated as $T$-cost via measurement-and-feedforward;
  the doubly-controlled-phase generalization qualified (analogous
  ladder, different counts/layout).

Three factcheck anchors requoted; baseline (94) held. Lint and
anchor checks pass; diff reviewed before push.

## Batch 49 — Appendix D (7 substitutions)

Driven by the ledger's highest-priority correctness list. The full
bibliographic upgrade (DOIs, arXiv IDs, editions, last-verified
dates for every entry) remains queued under the DEFERRED-FACTCHECK
programme.

### FIXED — outright defects
- Kitaev–Shen–Vyalyi corrected from "the original source" for phase
  estimation and QMA to an influential early monograph treatment
  (both results introduced in Kitaev's earlier papers). Gottesman
  1998 disentangled from Eastin–Knill: the no-go is a separate 2009
  theorem, now dated and attributed. Bravyi–Gosset reannotated to
  its actual contribution (classical simulation of Clifford + few
  non-Clifford circuits), no longer presented as a magic-state-
  distillation reference. The invented "Open-source pulse-level
  control" bibliography title replaced with the actual Alexander et
  al. citation (*Qiskit Pulse: programming quantum computers through
  the cloud with pulses*, Quantum Science and Technology, 2020);
  the `defcal` note reworded so language-level construct is not
  presented as a living hardware interface (backend acceptance is
  provider-specific). The false claim that Mermin's 2007 text ships
  with notebook collections removed (IBM materials do; Mermin needs
  third-party companions). Stim's "fastest ... mandatory" and
  TKET's "strongest" softened to evidence-compatible phrasing.

No factcheck anchors staled; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 50 — Appendix E glossary (15 substitutions)

Driven by the ledger's highest-priority correctness list. The
volatility items (hardware snapshot numbers, SDK version pins across
glossary entries) remain queued with the DEFERRED-FACTCHECK
programme.

### FIXED — outright defects
- Qubit redefined as the two-level *system* (usually an effective
  subspace), with the pure state as the Bloch-sphere point and mixed
  states filling the ball. Ray corrected to scalar-multiple
  equivalence with normalization leaving the phase freedom. Basis
  defined as a linearly independent spanning set with orthonormality
  as the book's stated default. Circuit-as-unitary-product
  equivalence restricted to measurement-free circuits, with the
  diagram-vs-operator order convention spelled out. Probability
  generalized to $\mathrm{tr}(\rho E)$ and the classical-axioms
  point corrected (the distinctive part is how probabilities arise,
  not their algebra). Condition number scoped to invertible $A$ with
  singular/pseudo-inverse conventions and HHL dependence qualified.
  SVD given explicit factor dimensions and the $\min(m,n)$ count.
  Block encoding written with the ancilla-register identity
  $(\langle 0^a| \otimes I) U (|0^a\rangle \otimes I) = A/\alpha$
  and the approximation-error allowance. Phase-estimation cost
  disambiguated ($O(n)$ controlled-power oracle calls vs $O(2^n)$
  base-$U$ applications, plus confidence repetitions). Code distance
  defined via logical operators outside the stabilizer. Fault
  tolerance restated as the gadget discipline with
  distance-dependent tolerated-fault counts. Syndrome corrected
  (check outcomes / round-to-round changes; equivalence class, not
  unique localization). Time complexity split into depth vs size.
  Postselection physicality fixed (routine at reasonable
  probabilities; the free exponentially-rare resource is what is
  unphysical). The "tightly entangled" metaphor in space complexity
  replaced.

No factcheck anchors staled; baseline (94) held — the two
pre-existing Appendix E baseline stales sit in entries this batch
did not touch. Lint and anchor checks pass; diff reviewed before
push.

## Batch 51 — Appendix F hardware snapshot (10 substitutions)

Driven by the ledger's highest-priority correctness list, using only
facts the ledger's own targeted primary-source verification
supports. The full per-number source/date/protocol apparatus stays
queued with the DEFERRED-FACTCHECK programme.

### FIXED — outright defects
- IonQ's #AQ labeled a proprietary benchmark-derived figure, not a
  physical/logical count, with product statuses dated to the
  snapshot. "Best per-gate fidelity" replaced with highest
  *published* fidelities plus the no-standardized-benchmark caveat.
  The QuEra 48-logical milestone scoped (encoded qubits,
  transversal operations and error detection in a lab experiment,
  not general fault-tolerant logical qubits) and un-staled with the
  ledger-verified 2025 follow-ups (up to 96 encoded qubits,
  magic-state distillation) — the same update applied to the F.7
  milestone bullet. Atom Computing's 1,000+ figure identified as
  array sites (1,180-site array) distinct from controlled qubits.
  The Pasqal/Infleqtion sentence de-collectivized (capabilities
  vary by product) and the expired 2025 roadmap target flagged
  past-due rather than prospective, with the vendor-defined
  "advantage" label. The neutral-atom fidelity and
  platform-to-watch sentence rewritten as reported/selected values
  with product-dependent mid-circuit measurement. The Majorana
  entry now separates the Nature paper's materials/parity-readout
  content from the company's QPU framing and the contested
  underlying evidence. The F.6 table gained a definitions note
  (scale/gate-time/fidelity caveats; #AQ and mode counts excluded
  as incomparable). The Quantinuum 4-logical claim given its
  metric/postselection caveat and primary-source pointer; "trapped
  ion / neutral atom" restyled. The "gross" code named as the
  bivariate-bicycle $[[144, 12, 12]]$ code with the nickname
  explained, and IBM's path labeled a vendor roadmap.

No factcheck anchors staled; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 52 — Index (7 generator fixes, regenerated)

Driven by the ledger's highest-priority correctness list. Fixes were
made in `scripts/generate_index.py` (the file is generated) and the
index regenerated. The coverage programme (aliases/acronyms,
reconciliation against every glossary headword, additional
fundamental terms) and the process items (status-line placement
convention for generated files, renderer anchor tests) go to the
improvement/infrastructure queue.

### FIXED — outright defects
- Tensor product repointed from the bare Chapter 4 link to §4.8.
  Schmidt decomposition repointed from §4.9 (which is the SVD
  section) to its actual section, §7.10 — a genuine mislink.
  Stabilizer formalism repointed from Chapter 19 to §19.8. Fidelity
  split into three sense-distinct entries: state (§12.7), gate
  (§22.3 with the §18.16 error-budget treatment), readout (§22.6).
  Decoherence and quantum channels given Chapter 18 as a second
  target alongside §10.9/§10.13 (conceptual section + noise-chapter
  development). Mixed states given §5.9 alongside §10.10.
  Reassessed and deliberately left unchanged: Superposition →
  §10.1 and Measurement → Chapter 11, which are the most thorough
  treatments under the index's stated criterion.

No factcheck anchors staled; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 53 — docs support files (9 fixes)

The 2026-07-21 ledger drop (+4,283 lines) delivered completed
file-level verdicts for two support documents; this batch applies
their sure fixes. The larger asks — automated test-sheet
synchronization, evidence-artifact capture (screenshots, browser
metadata), `\lVert`/`\rVert` workaround investigation, and any
re-audit of the frozen ledger's individual May-2026 verdicts — go
to the improvement/infrastructure queue.

### FIXED — docs/github-markdown-math-bugs.md
- The internal contradiction repaired: "inline math is fine in any
  container" now reads "inline math *without* `\begin{...}`
  environments", reconciling Bug 3's workaround with Bug 2.
  Epistemic overreach bounded: the "live" test sheet described as a
  manually re-run fixture with surface/attribution caveats
  (blob/README; MathJax per GitHub documentation, not inferred from
  symptoms); "five distinct bugs" scoped to observed behavior on
  tested surfaces with the interaction caveat; all five "Root
  cause" labels changed to "Best-supported explanation (black-box)";
  Bug 2 and Bug 4 titles bounded to tested containers/contexts.
  Lint-rule derivations untouched.

### FIXED — docs/fact-check-ledger.md
- Lifecycle contradiction resolved: the file is now explicitly
  frozen as a dated historical changelog; the footer's "each next
  pass appends here" instruction replaced with the freeze note; the
  Appendix-F-companion sentence made historical (the role belongs
  to `factcheck/`); May-2026 verdicts framed as a record of what
  was checked then, not current confirmations. The single open item
  was verified to be already carried into the `factcheck/` mirror
  (§15.8 card), closing the migration ask for open claims.

No factcheck anchors staled; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 54 — Reopened manuscript items from the disposition meta-review (2 substitutions + 2 adjudications)

The 2026-07-21b drop's review of `docs/review-2026-05-28-disposition.md`
reopened three manuscript-level concerns. Each was re-examined against
the *current* text, with an executable check where applicable.

### FIXED — outright defects
- **Robertson vacuous-on-Z-eigenstates (reviewer is right; our
  earlier text — including batch 40's Ch35 wording — was wrong).**
  Verified numerically in the pinned environment: on $|0\rangle$,
  $\Delta X = \Delta Y = 1$ and the $X$–$Y$ Robertson bound reads
  $\Delta X\,\Delta Y \ge |\langle Z\rangle| = 1$ — nonvacuous and
  exactly saturated; only the pairs involving $Z$ reduce to the
  trivial $0 \ge 0$. Both sites repaired with the pair-by-pair
  statement: §10.4's parenthetical and Ch35's operational-
  consequence note.

### ADJUDICATED — no change needed in current text
- **Solovay–Kitaev scope:** the narrow fault-tolerant-Clifford+T
  framing the meta-review flagged does not survive in the current
  manuscript — §8.11 states the theorem for any universal
  inverse-closed gate set and arbitrary SU(2) target, separates the
  Ross–Selinger Clifford+T result explicitly, and §17's gate-set
  robustness statement is likewise generic. Repaired in an earlier
  batch; nothing to reopen.
- **Weak-measurement/QND relabeling:** audited every current use.
  "Non-demolition" appears only in its readout sense (prelude
  criterion 5, §9.8 mid-circuit measurement); "weak measurement"
  appears only in its information/disturbance-trade sense (§3.x,
  §10.4). The two concepts are used correctly and never
  interchanged in the current text.

The meta-review's structural asks for the disposition chronology
itself (stable finding IDs, orthogonal verdict/evidence fields,
superseded-paragraph marks) go to the infrastructure queue; the
document is preserved as history.

No factcheck anchors staled; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 55 — render-tests matrix and upstream-feedback drafts (21 fixes)

Sure fixes from the 2026-07-21b verdicts. The larger programme —
converting the matrix into a dated result record with
expected/observed/evidence fields per cell, DOM-level verification,
workaround-variant cells, and mechanical synchronization with the
memo and linter — goes to the infrastructure queue. No render
results were fabricated: the single outcome recorded into the sheet
(M1 breaks) is the one the companion memo already documents.

### FIXED — docs/render-tests/math-context-matrix.md
- Purpose header: renderer attribution made a tested hypothesis,
  cell-label naming normalized to the actual `A1`/`B2` scheme, and
  the sheet identified as the stimulus set (outcomes live in the
  memo until the dated result matrix exists). Stale dimensions
  overview extended with Sections J–N. Section M's interpretation
  rules rewritten around the observed M1 failure (the old rules
  could not isolate separators once M1 fails; M4–M8 establish
  breadth, not causes; display controls for M4–M8 flagged as
  needed). Section N: the missing top-level `>` control recorded as
  a known gap with the generalization narrowed to `+`/`-`/`*` and
  lint's `>` coverage labeled policy overapproximation. Reporting
  protocol: the example broken-cell list marked illustrative-only
  (it predates M/N and omits memo-reported failures), "exact bug
  surface without speculation" bounded, and the false "hardest
  cases clean ⇒ safe everywhere" inference removed.

### FIXED — docs/upstream-feedback (comment + howto)
- Comment draft: internal-draft banner added (re-verify everything
  on posting day; posting is separately authorized); "current
  renderer" claims dated; the inline bug broadened from
  `pmatrix`-specific to the `\begin{...}` environment shape with M1
  as minimal reproducer; H6's observed behavior separated from the
  uninstantiated column-separator hypothesis; Section L "pending"
  replaced with the confirmed L/N diagnosis (including the
  top-level-`>` gap); ask 3 updated to confirmed status; the ≈340
  line count corrected to ≈490. Howto: safety preamble added
  (explicit authorization per mutation, browser-first posting,
  account check, non-idempotency warning, same-day re-verification);
  "live test sheet" aligned with the fixture framing; B7–B10 claim
  dated; new-comment summary updated to the broadened bug and
  confirmed diagnosis; unsupported reaction-weighting claim
  softened; new-Discussion title/body updated to the environment
  shape with M1 and a category re-verification step; the "query
  mutation" error corrected to a read-only GraphQL query.

No factcheck anchors staled; baseline (94) held. Lint and anchor
checks pass; diff reviewed before push.

## Batch 56 — examples/deutsch_jozsa.py (rewrite, verified live)

All of the verdict's improvements applied and the result executed
under the pinned environment (Qiskit 2.4.1); the full example suite
still passes.

### FIXED
- Docstring now separates the query-model claim from physical gate
  count (one oracle *call*; the parity oracle costs n CNOTs) and
  from shots (1,000 shots = 1,000 circuit executions of the ideally
  deterministic outcome), states the expected outputs, and labels
  the ideal noiseless setting. `n` validated as a positive integer.
  The oracle callback given a `Callable` type alias and an explicit
  contract note (reversible bit oracle on inputs 0..n-1 with
  ancilla n; off-contract callbacks silently invalidate the
  promise-based verdict). The brittle auto-register access
  (`.data.c`) replaced with an explicitly named classical register
  accessed by name. Constant-zero and constant-one oracles added,
  all three promise cases run, and per-case assertions turn the
  script into a regression check (observed: balanced → only 111,
  constants → only 000). The classifier factored out and labeled
  ideal-only, with the hardware-threshold caveat. Qubit-index
  comment states these are Qiskit indices.

Lint and anchor checks pass; baseline (94) held; diff reviewed
before push.

## Batch 57 — Manuscript defects surfaced by the mirror audit (14 substitutions)

The 2026-07-21c drop (+6,215 lines) audits the `factcheck/` mirror
through Chapter 12. Many of its flags re-quote pre-fix manuscript
wording from stale cards; every flagged item was therefore
adjudicated against the *current* text before acting.

### FIXED — outright defects
- Ch2: the dense state-vector simulation boundary corrected from
  "$n = 50$ to $60$" to $n \approx 45$–$50$ with the petabyte
  arithmetic shown ($2^{50}$ single-precision amplitudes ≈ 10 PB;
  $n = 60$ is three orders beyond any machine). Ch5: no-deleting
  restated as a ban on *destruction*, with the swap-out reset
  explicitly allowed (information relocates, never vanishes). Ch7:
  the DQC1 sentence rewritten (believed-hard, little entanglement
  by standard bipartite measures, advantage conjectural); LOCC
  monotonicity qualified to on-average. Ch9: logical-ancilla size
  made code/distance-dependent (tens at small distance) instead of
  a flat "hundreds"; the $\Omega(n)$ preparation bound given its
  target-state quantifier (some states — GHZ among them; product
  states are depth 1); the Solovay–Kitaev synthesis factor
  restated per continuous rotation with the gate-count/depth layers
  separated. Ch10: the positivity reversal fixed — it is the
  *transpose* that is positive-but-not-CP, and the *partial*
  transpose that goes negative on entangled states (PPT, §7.11);
  tomography's measurement requirement generalized to
  informationally complete sets (single-POVM option included); QKD
  enablement tied to the full proof apparatus; teleportation's
  two-bit count separated from no-signaling (no-signaling forces
  *some* classical communication; four Pauli corrections force
  *two* bits). Ch11: the Naimark dilation note corrected to joint
  (not ancilla) dimension with the trine arithmetic. Ch12: the
  mutual-information "fingerprint" claim corrected to a
  can-be-stronger statement with the not-a-test caveat. Appendix E:
  the gate-fidelity entry's flat "$10^{-3}$–$10^{-4}$ state of the
  art" split into best-demonstrated vs median with dependence
  caveats.

### ADJUDICATED — flagged but already correct in current text
Fidelity/error mislabels (Ch2), the hedged $10^{-15}$ classical
figure, the nonnegative-amplitude restricted-model hedge, Ch3's
Bell-loophole chronology and β-BBO rate, Ch4's SVD ($A^\dagger A$),
Ch6's phase qualifications and sphere/ball split, Ch9's garbage
scoping, Ch11's normalized Pauli orthonormality and gate-count/depth
split for global Cliffords, Ch12's regularized HSW statement and
state-merging resource ledger, Appendix E's statevector ceiling, and
the notation "opposite of Qiskit" nuance (current text already
explains the coinciding string-to-integer maps): all repaired in
earlier batches; the mirror cards quote pre-fix text and will be
refreshed by the mirror overhaul.

### QUEUED
- The factcheck mirror overhaul: the reviewer's audit effectively
  specifies the requirements (stable IDs, schema versions,
  atomic cards, evidence expiry vs anchor freshness, structured
  sources, coverage generation, closing derivable cards with
  executable suites). Logged as DEFERRED-FACTCHECK with
  AUTHOR-DECISION on scope/priority.
- Appendix F July-2026 refresh (reviewer-verified: Heron r3,
  Starling 2029 with 2028 intermediate, Majorana 2, IonQ #AQ
  changes, post-four-logical results, Pasqal deadlines passed):
  AUTHOR-DECISION — the appendix is a dated May-2026 snapshot by
  design; refreshing it (or adding a dated addendum) is a policy
  call.
- examples/ batch 2 fixes: next batch.

Twelve factcheck anchors requoted; baseline (94) held. Lint and
anchor checks pass; diff reviewed before push.

## Batch 58 — examples batch 2 (all four scripts, verified live)

Per the author's directive (apply everything not in doubt so future
reviews are not re-contaminated), all verdict improvements applied
and the full suite executed under the pinned Qiskit 2.4.1.

### FIXED
- `first_bell_program.py`: expected outputs stated in the docstring;
  the crucial caveat added that perfectly correlated Z-basis
  outcomes alone do not certify entanglement (classical shared coin
  reproduces them; other bases are needed, §7.8–§7.9); named output
  register replacing `measure_all` auto-naming; statevector and
  counts assertions; version/setup note.
- `statevector_simulation.py`: expected-ket math and exponential-
  memory context (n=30 ≈ 16 GB, doubling per qubit); little-endian
  label caveat; sorted stable output with clean string keys;
  exact-amplitude assertions.
- `grover.py`: iteration-count arithmetic explained with the exact
  ideal success probability 121/128 exposed and asserted (observed
  93.7% at 1,000 shots); overshoot warning for a third iteration;
  per-run query accounting vs shots; input validation; named
  register; no hard-coded shot denominator.
- `qiskit_ordering_check.py`: scope label (statevector/operator
  conventions only — drawing and count-string order not exercised);
  input validation in `book_index`; full-vector equality instead of
  single-amplitude check; explicit row/column orientation comment;
  failures raised via a helper that survives `python -O`; Qiskit
  version printed.

Lint and anchors pass; baseline (94) held; suite verified.

## Batch 59 — Definite mirror-data defects (6 fixes + 1 new stub)

Per the author's decontamination directive: fixes the mirror-audit
findings that are beyond doubt, so future review passes stop
re-surfacing them. The schema/ID/expiry overhaul remains queued.

### FIXED
- `factcheck/README.md`: the dead `examples/grover_count.py`
  reference replaced with the real `examples/grover.py` (which now
  asserts the exact 121/128 success probability); the stale
  "coverage is partial — only sections touched by those passes"
  status replaced with the true 47-of-48 state and a pointer to
  per-file status lines.
- `factcheck/_pilot.md`: the Grover card's lower bound restated
  correctly (Ω(√N) BBBV bound, matched by O(√N), hence Θ(√N);
  bounded-error worst-case model named) instead of "cannot be done
  with fewer than Θ(√N)"; the HHL card's dequantization condition
  scoped to the low-rank regime (Tang-style algorithms pay
  rank-polynomial factors; sparse high-rank well-conditioned
  systems have no known general dequantization — their binding
  caveats are state preparation and readout).
- `factcheck/_sources.md`: the unsupported "FIPS 207" designation
  removed — NIST IR 8545 records the HQC selection; the standard
  number is not yet assigned, and the record now says not to cite
  one until NIST does.
- `factcheck/99-back-matter/appendix-c-...md`: the dimension-count
  typo fixed (dim U(4) = 16 = 3 + 12 four-SU(2) + 1 global phase;
  the old line equated dim(U(2)^4) with 12).
- New: `factcheck/part-00-historical-prelude/00-historical-prelude.md`
  — an explicit extraction-pending stub, so all 48 manuscript files
  now have mirrors and absence of cards reads as work-not-done, not
  nothing-to-check (the audit's missing-48th-file finding).

Lint and anchor checks pass; baseline (94) held.

## Batch 60 — Appendix F refresh, web-verified (4 substitutions + TOC)

Per the author's directive, the doubtful hardware items got a deep
investigation: each reviewer-flagged fact was checked against
primary or primary-adjacent web sources in July 2026 before any
edit. The design question (dated snapshot vs refresh) resolved
itself once the facts were dated: two flagged items *predate* the
May snapshot and were simply wrong/missing in it (in-place fixes);
the rest are genuinely post-May and live in a new dated F.8
"Verified Updates as of July 2026" block that updates without
rewriting the frozen snapshot. F.8→F.9 renumbering, status count,
and TOC regenerated.

### FIXED in place (pre-snapshot facts)
- IonQ: Tempo *achieved* #AQ 64 in September 2025 (IonQ
  announcement; the snapshot had it merely "announced"), and Forte
  Enterprise is specified at #AQ 36 on IonQ's current product page
  (was "#AQ 35 announced"). Chapter 1 no longer carries its own
  volatile "#AQ 29" copy — it defers to Appendix F for dated
  numbers, per the mirror audit's anti-drift recommendation; its
  anchor requoted.
- F.7: the missed September 2024 Microsoft×Quantinuum result added
  — 12 entangled logical qubits at ~22x entangled-circuit error
  improvement (the snapshot stopped at the April 2024 4-logical
  demo).

### ADDED as dated July-2026 updates (new F.8)
- IBM Heron r3 deployed (ibm_pittsburgh) and the Nighthawk
  end-2026 / Starling 2028–2029 (~200 logical, 10^8 gates)
  fault-tolerance roadmap.
- Microsoft Majorana 2 (Build, June 2026): lead-based
  superconductor, claimed ~20 s lifetimes, roadmap pulled to 2029 —
  with the F.5 claim-layering caveat explicitly carried forward
  (critics state the new data does not resolve their objections).
- Microsoft×Quantinuum peer-reviewed *Nature* validation (June
  2026) of 11x–800x logical-over-physical improvements; Helios
  targeting ≥10 logical qubits.
- Pasqal: Orion Gamma (>140 qubits) shipped to HPC centers by
  end-2025; the ~1,000-qubit machine not publicly confirmed by its
  target date; current roadmap 10,000 physical / 200 logical by
  2030 (Vela/Centaurus/Lyra) — closing the expired-target flag
  with verified status rather than speculation.

Sources consulted: IBM Quantum blog/roadmap coverage, Microsoft
Build 2026 coverage and Microsoft/Quantinuum announcements, the
June 2026 Nature-validation reports, IonQ's #AQ 64 announcement and
product pages, Pasqal's 2025 roadmap release. One anchor requoted;
baseline (94) held. Lint, anchors, and TOC pass; diff reviewed
before push.

## Batch 61 — Factcheck model confirmed, executable evidence wired, references distributed

Resolves the three brainstorm items with the author (2026-07-21):

### 1. Card model — the simplification survived; now confirmed as design
`CARD-SPEC.md` is the design the author described: seven plain
labeled fields, no IDs/tiers/enums, verdict separate from
linter-computed freshness, mirror files ordered exactly as the book.
The incomplete part is that the mass-extracted per-chapter cards
still use the older compact `- **Claim** (anchor):` line format —
both formats are anchor-checked, and compact cards migrate to the
spec when touched. The reviewer's stable-ID/schema-version/metadata
recommendations are hereby **formally declined by author decision**
(identity = file order + book-matching headings + verbatim anchors +
Git); recorded in `factcheck/README.md` so future review passes see
the disposition instead of re-recommending.

### 2. Executable checks as citable evidence
New `scripts/verify_identities.py`: 25 named numeric checks covering
the elementary identity claims of Appendices B/C (Pauli algebra and
eigensystems, Hadamard conjugations, phase-family relations, P-vs-Rz
phase, SU(2) double cover, rotation-Pauli relations, CNOT/CZ/SWAP
identities and spectra, controlled-global-phase, Levi-Civita, Euler
forms, tensor mixed product, partial trace, Bell marginals) — all
passing. Cards cite a check as
`scripts/verify_identities.py::<name>`; new
`scripts/check_card_citations.py` runs the suite and fails on any
citation of a missing or failing check, and `tools/lint.py` invokes
it (skipping gracefully when no venv is present). 19 previously-open
derivable cards closed with verified citations (15 in the App B
mirror, 4 in App C).

### 3. References decentralized
`_sources.md` converted to a deprecation stub; its entries
distributed into `## References (external)` sections at the bottom
of the seven mirror files whose cards cite them (landmark
algorithms, cryptography, networking, QEC, modern frontier, QML,
Appendix F mirror). Policy recorded: self-containment over
deduplication; a registry model may return later. Interpretation
note: sections were added to the factcheck *mirror* files, not the
reader-facing book chapters — flagged to the author in case
bottom-of-chapter reference lists in the book itself were intended
(that variant needs a TOC/status-count design tweak first).

Lint (incl. the new citation check), anchors (baseline 94), and the
identity suite all pass; diff reviewed before push.

## Batch 62 — References into the book chapters (author-confirmed)

Completes the author's intended model from batch 61's flagged
interpretation question: reference lists belong in the *book
chapters themselves*, as a final unnumbered `## References` section.

### DONE
- Design rule implemented and documented: `tools/lint.py` now
  explicitly exempts a `## References` H2 from the status-block
  section count in both counting modes (numbered chapters were
  already implicitly exempt; the all-H2 front-matter fallback now
  skips it too), and STYLE.md records the rule (unnumbered, after
  the last numbered section, before the footer navigation; the
  factcheck mirror points here; no central registry).
- The seven per-file reference lists created in batch 61 moved from
  the factcheck mirrors into their book chapters (15, 16, 19, 27,
  30, 33, Appendix F) — 22 entries total — each with a one-line
  pointer to the chapter's factcheck mirror. The mirror sections
  are now pointers back to the chapter's References section, so the
  content lives in exactly one place: with the text it supports.
- TOC regenerated (537 entries; References sections listed for
  navigation). Status counts unchanged everywhere, as designed.

Lint (incl. card-citation check), anchors (baseline 94), and the
identity suite all pass; diff reviewed before push.

## Batch 63 — Manuscript defects from the Ch13–27 mirror audits (10 substitutions)

The 2026-07-21d drop (+4,011 lines) plus the previous drop's tail
deliver mirror-audit verdicts for Chapters 13–27 (fifteen files;
Ch28 is the reviewer's front). As with batch 57, most named flags
re-quote pre-fix card text; every flag was adjudicated against the
current manuscript, with one web verification (PennyLane).

### FIXED — outright defects
- Ch18: the fidelity/error inversion ("$10^{-4}$–$10^{-5}$ per-gate
  *fidelity*" → per-gate *error rates*); the $1/f$ Ramsey decay
  hedged (approximately Gaussian, logarithmic corrections). Ch16:
  the T-count/Toffoli conflation repaired (the headline may be
  either metric; a Toffoli decomposes into several $T$s). Ch17:
  "demolished" → refuted-at-the-oracle-level; "strongest unrebutted"
  → least-contested with the ongoing-work caveat; Gottesman–Irani
  scoped to the promise-gap local-Hamiltonian problem (not "exact"
  ground energy). Ch19: the storage-overhead $p_L$ figure aligned
  with §19.18's per-operation budget ($10^{-10}$–$10^{-12}$ once
  $10^{10}$ logical operations are priced in). Ch25: NISQ coined at
  the December 2017 Q2B keynote, published 2018. Ch26: PennyLane's
  TensorFlow integration corrected to deprecated-v0.43 /
  dropped-v0.44 (web-verified against PennyLane's deprecations page
  and v0.43 release notes). Ch27: the "slated ... as FIPS 207"
  assertion replaced with the number-not-yet-assigned wording,
  matching the batch 59/62 References fix.

### ADJUDICATED — flagged but already correct in current text
Ch19's concatenation recurrence (multiplies by $C^{2^\ell-1}$;
the mirror's dividing form is the stale pre-fix text), 15-to-1
correctly tied to the punctured Reed–Muller code with an explicit
"not the Steane code", Willow's $\Lambda \approx 2.14$ / 4–5×
d3→d7 with "first *reported*" scoping; Ch16's LCU attribution
(Childs–Wiebe 2012 introduced, BCCKS 2015 developed) and corrected
$\Theta(t + \log(1/\epsilon)/\log\log(1/\epsilon))$ query formula;
Ch17's Schuch–Verstraete 2009 dating, Kempe–Regev/KKR 3- and
2-local attributions, oracle-discipline phrasing; Ch22's Forte
Enterprise at 36 qubits/#AQ 36, QV record through $2^{25}$
(2025), no Q-PERFECT or Willow-67×24 claims present; Ch23's
layered IR description, u3/U dialect gotcha, partial OpenQASM
coverage, defcal-caveat; Ch24's Pashayan–Wallman–Bartlett
authorship, SKU-hedged H100 figures, delegated Zuchongzhi labels,
scoped Pan–Chen–Zhang comparison; Ch25's hedged trend prose,
QV-definition and record, "first claims" Google-2023 scoping;
Ch26's memory arithmetic and GPU few-extra-qubits wording;
Jiuzhang 3.0's 2023 dating retained (matches the PRL record).
Card-level asks (heading-vs-anchor audits, status vocabulary,
truncated anchors, TBD sourcing) remain with the mirror-overhaul
queue.

Six factcheck anchors requoted; baseline (94) held. Lint (incl.
card citations), anchors, and identity suite pass; diff reviewed
before push.

## Batch 64 — References model finalized: dual lists with lint-enforced sync

Refines batch 62 per the author's clarified intent: the book chapter
carries a human-readable/usable `## References` section AND the
factcheck mirror carries the *same* reference set in its
`## References (external)` section — deliberate duplication so both
files are self-contained (the book including for a future paper
edition; the mirror for verifiers) — with `tools/lint.py` enforcing
that the two lists stay identical. Dense reference sections are an
accepted cost; completeness wins for lookup material.

### DONE
- The seven mirror pointer-sections (batch 62) replaced with full
  duplicate reference lists (22 entries) plus a note naming the
  sync contract.
- New `check_references_sync()` in `tools/lint.py`: matches entries
  by citation key (the leading `**...**` token of each `- ` entry,
  so cosmetic wording may differ while the reference *set* may
  not), and fails on: a key present in the book but missing from
  the mirror, a key present in the mirror but missing from the
  book, a book References section with no mirror counterpart, or a
  mirror References (external) section with no book counterpart.
  Both failure directions negative-tested (a phantom book entry and
  a deleted mirror section each produce exactly one lint failure);
  the synced state passes.
- STYLE.md and factcheck/README.md updated from the pointer model
  to the dual-list model, with the rationale recorded.

Lint (incl. references sync and card citations), anchors (baseline
94), and the identity suite all pass; diff reviewed before push.

## Batch 65 — README reader-first restructure and examples/ MIT license

Implements the author-approved package from the external README
critique (assessed 2026-07-21: structural claims verified correct;
the license-unification suggestion was rejected in favor of the
dual structure with a permissive examples/ carve-out). Also
confirmed by repo sweep: no chatgpt/openai links exist in any
authored artifact — the suspect links were rendering artifacts of
the externally pasted draft only (the two grep hits are the
reviewer's ledger and one frozen archive review, both audit
artifacts we do not edit).

### DONE
- README rebuilt in two zones. Reader zone: title/subtitle/author →
  "What this book is" → a linked **Start reading** block (Preface /
  Historical Prelude / Table of Contents) → one-line status with
  links to the full guarantees → "Who this is for" → a compact
  "Choose a reading path" that defers to the Preface's canonical
  Suggested Reading Paths and integrates the Prelude ("whichever
  path you choose, you may optionally begin with…") → the full
  Table of Contents. Repo zone below: reading-on-GitHub note,
  offline-build instructions (mdbook material moved intact),
  runnable examples, project documents, license. The
  `--check-readme` coverage check still passes (every manuscript
  file linked).
- The README's four bespoke reading paths replaced with three
  one-liners plus deferral to the Preface — eliminating a fourth
  divergent copy of path content (same decontamination rationale as
  the references model).
- `examples/LICENSE` created: MIT, copyright Iaroslav Voitovych,
  scoped explicitly to the examples/ directory. Root LICENSE gains
  a §4 exception clause pointing to it (subsequent section
  renumbered); README license section compressed to the approved
  two-sentence form naming all three regimes (manuscript CC
  BY-NC-ND + commercial, examples MIT, tooling all-rights-
  reserved); the Preface's license summary gains the matching
  one-line exception so no document contradicts another.

Lint (incl. references sync and card citations), anchors (baseline
94), and README coverage all pass; diff reviewed before push.

## Batch 66 — Infrastructure open-sourced under MIT (author decision)

Implements the author's decision (2026-07-21): everything except the
book itself is free open source; the book stays dual-licensed
(CC BY-NC-ND 4.0 + separate commercial licensing) to preserve a
future publication path. The externally suggested rationale was
assessed and agreed with: all-rights-reserved on tooling protects
only expression (not methods or workflow, which copyright never
covers) while blocking legitimate reuse.

### The boundary (drawn more precisely than the external advice)
- **MIT (LICENSE-MIT, new root file):** `examples/`, `scripts/`,
  `tools/`, `Makefile` + build configuration, the renderer-bug
  knowledge base (`docs/github-markdown-math-bugs.md`,
  `docs/render-tests/`, `docs/upstream-feedback/`), and the
  reusable methodology (`PROCESS.md`, `STYLE.md`).
- **Book (dual license, unchanged terms):** `book/`, the
  manuscript-derived `TOC.md` and `BookDescription.md`, and the
  editorial/audit record (`PROGRESS.md`, `HISTORY.md`, `reviews/`,
  `factcheck/`, `archive/`, and the frozen book-audit files under
  `docs/`). The audit artifacts quote the manuscript verbatim
  throughout, so they cannot ride the MIT side without opening the
  book's own text — this is the one place the external advice's
  categorization needed tightening.

### DONE
- `LICENSE-MIT` created with an explicit scope preamble and the MIT
  text; root `LICENSE` §4 broadened from the examples-only
  exception to the full infrastructure carve-out, with the
  dual-licensed work enumerated; README license section rewritten
  to the clean two-category form ("adapt them for your own books
  and projects"), dropping the all-rights-reserved sentence;
  `examples/LICENSE` re-headed as a local copy of the root grant;
  the Preface's license summary updated to match. The book-side
  "all rights not expressly granted are reserved" formula stays,
  per the advice's own final caveat — it is the normal commercial
  reservation for the book, not a tooling defense.

Lint, anchors (baseline 94), and references-sync all pass; diff
reviewed before push.

## Batch 67 — Manuscript defects from the Ch28–36 mirror audits (8 substitutions) + artifact intake

The 2026-07-21e drop (+1,958 lines) completes mirror-file verdicts
for Chapters 28–36; the reviewer's front is the Ch37 mirror. As in
batches 57/63, every named flag was adjudicated against the current
manuscript; two facts were web-verified before editing.

### FIXED — outright defects
- Ch35: the Bell-1964/CHSH-1969 conflation repaired (Bell's
  inequality refutes local models; the $|S| \le 2$ form is CHSH,
  now attributed); Bong et al. 2020 restated as the related but
  distinct Local-Friendliness no-go rather than a refinement of
  Frauchiger–Renner; the $10^{-20}$-second decoherence figure
  scoped as an illustrative dust-grain estimate, not a universal
  macroscopic constant. Ch32: the summary table's "any non-Gaussian
  gate" aligned with the body's *suitable*-nonlinearity statement;
  the Majorana history corrected to one prominent formal retraction
  (2021) plus disputes, not "retracted multiple times." Ch33: the
  TF-QKD distance ladder now separates installed field fiber
  (~500 km scale) from laboratory ultra-low-loss spooled fiber
  (605–1000+ km records) and asks quoted distances to name the
  medium; the satellite roster carries per-mission statuses as
  verified by the reviewer (SpeQtre and QUBE-II launched, QEYSSat
  in development, EAGLE-1 toward ~2027) with a volatility caveat.
  Ch31: the NIST Al$^+$ clock record updated — 9.4×10⁻¹⁹ (2019)
  improved to 5.5×10⁻¹⁹ (Marshall et al., PRL 135, July 2025;
  web-verified against the paper and NIST coverage).

### ADJUDICATED — flagged but already correct in current text
Ch28's FeMoco spatial-vs-spin-orbital accounting (54–76 spatial →
108–152 spin-orbitals/qubits), Reiher-2017 at ~10^14 T with the
refinement chain to ~10^10, and one-qubit-per-spin-orbital DMET
sizing; Ch29's Advantage2 (4,400+, Zephyr degree-20, roadmap note),
2000Q-not-2X at 2,048 qubits, O(N²) clique embedding on both
topologies, and the embedded-clique size reality; Ch31's μGal
conversion (already ≈10⁻⁹ g) and self-testing isometry caveats;
Ch32's 2-local-AQC universality note and variance-explicit ballistic
spreading; Ch34's per-gate O(2^n) statevector / O(4^n)
density-matrix split; Ch36's Claus-Peter Schnorr attribution and
hedged median-fidelity/RSA-estimate framing. Card-level asks
(truncated anchors, TBD sourcing, scenario tables, claim matrices)
remain with the mirror-overhaul queue.

### ARTIFACT INTAKE
- `docs/unified-book-process-framework.md` — externally drafted
  book-production requirements catalog (v1.0, 2026-07-20) added per
  the author, listed in README project documents, parked as
  planning input for a future process-alignment pass. Not covered
  by the MIT infrastructure list pending an author licensing call.

Eight factcheck anchors requoted; baseline (94) held. Lint,
anchors, references-sync, and card citations pass; diff reviewed
before push.

## Batch 68 — Book-body second pass Ch30-37 (6 substitutions)

The 2026-07-21f drop (+2,062 lines) completes the Ch37 factcheck
mirror verdict, then opens a *fresh book-body second pass* over the
prose of Chapters 30-37 (a new stream distinct from the mirror
audits). The drop's tail also reviews
`archive/chapter0-drafts/historical_chapter__new_attempt_1.md` — the
protected historical-rewrite research stream, which per standing
author instruction is NOT edited and whose findings are NOT acted on
here. Every flag was adjudicated against the current manuscript;
most re-flag items repaired in earlier batches. Six genuinely new
definite defects fixed:

### FIXED — outright defects
- Ch32 (line 123): the claim that $T$ and controlled-phase gates
  "take basis states off the diagonal" is false — those gates are
  *diagonal*. Rewritten to distinguish superposition-creating gates
  (Hadamard) from diagonal phase gates ($T$, controlled-phase) that
  imprint the relative phases interference exploits.
- Ch32 (exercise 1): the finite six-spin chain was said to have a
  "quantum phase transition" — a thermodynamic-limit notion. Corrected
  to an *avoided crossing* / minimum gap, with the longitudinal-bias
  rounding noted.
- Ch34 (§ ECC bridge): "both are decoded by maximum-likelihood" is
  false for both Reed-Solomon (algebraic bounded-distance /
  Berlekamp-Massey) and surface codes (matching / union-find).
  Rewritten to name the actual decoders as cheap approximations to
  ML.
- Ch35 (§35.2): "the marginal Bob sees is the same in every world"
  — Everett-loaded and imprecise in an interpretations chapter.
  Changed to the *nonselective* (outcome-averaged) marginal being
  invariant, now consistent with the conditional-state caveat later
  in the same section.
- Ch35 (§35.8): the heading "Unconditional speedups outside the
  oracle model are rare" was contradicted by its own content, which
  offers conjecture-dependent sampling tasks as the evidence.
  Reframed: genuinely unconditional non-oracle speedups are
  essentially unknown; the sampling evidence is itself conditional.
- Ch35 (exercise 5): the axis "oracle vs. unconditional" conflated
  two independent axes; split into oracle vs. non-oracle and
  conditional vs. unconditional, matching the §35.8 repair.

### ADJUDICATED — flagged but already correct / not acted on
Ch32 quantum-walk variance (already variance-explicit, batch fixes),
Majorana retraction history (batch 67), CV non-Gaussian "suitable"
qualifier (batch 67); Ch34 O(2^n) statevector cost (already correct
vs the mirror's O(4^n)); Ch36 Claus-Peter Schnorr attribution and
hedged RSA/median-fidelity framing (batches 41/63). Sourcing-level
asks (per-chapter References buildout, dated benchmark tables) flow
through the References-sync machinery as verification proceeds.
The historical_chapter rewrite-attempt review is excluded per author.

Baseline (94) held; no anchors staled. Lint, anchors,
references-sync, and card citations pass; diff reviewed before push.

## Batch 69 — Review concluded; final-synthesis intake (1 tooling fix)

The 2026-07-22 drop (+3,982 lines) is the **final** drop: it closes the
exhaustive second pass with file-level verdicts for the remaining
repo/archive/docs files, a work-package-by-work-package review of the
newly-added `docs/unified-book-process-framework.md`, and a project-wide
synthesis + final verdict (179 eligible files; content 4.6/5,
infrastructure concept 4.7/5, reproducibility 3.2/5). No new
manuscript-body correctness defects beyond batch 68 (the book-body
Ch30-37 pass); the protected `archive/chapter0-drafts/**` and
`historical_chapter__*` files were reviewed by the reviewer but are NOT
edited here, per standing author instruction.

### FIXED — concrete tooling hazard named in the final verdict
- `scripts/verify_identities.py`: the "relative-tolerance leakage in
  identity checks" the synthesis flagged is real — `np.allclose(a, b,
  atol=1e-12)` kept the default `rtol=1e-5`, so O(1) matrix entries were
  effectively checked to ~1e-5, not 1e-12. Set `rtol=0` for a strict
  absolute-tolerance check; all 25 identity checks still pass (they were
  genuinely exact, not riding the slack), and the 19 card citations
  re-verify.

### RECORDED — not acted on
The final synthesis's systemic theme is *assurance mismatch* (green
tooling / status prose / snapshots implying more than proven). Its
P0-P3 remediation order is folded into `IDEAS.md` as the authoritative
prioritization; the individual items map onto the existing
DEFERRED-FACTCHECK / mirror-overhaul / AUTHOR-DECISION / infrastructure
/ enrichment categories already tracked there. The framework-doc review
is informational (a docs artifact, not manuscript). The review being
concluded, this dispositions log and IDEAS.md are now the forward
backlog.

Lint, anchors (baseline 94), references-sync, card citations, and the
identity suite all pass.

## Batch 70 — P0 trust-blockers: false-green / fail-open tooling (5 guards)

First P0 lane from the final synthesis's "assurance mismatch" theme:
checks that report success without actually verifying anything. Each
guard was proven to *fire* on the failure it targets (not merely to
leave the green path intact).

### FIXED — checks that no longer report green over nothing
- `scripts/verify_identities.py`: strict tolerance (batch 69; `rtol=0`).
- `scripts/factcheck_anchors.py`: fails if the factcheck inventory is
  empty or smaller than the manuscript inventory (was: "PASS: 0
  problems across 0 files"). Floor derived from the live book file
  count, so it self-adjusts.
- `scripts/check_examples.py`: fails if no example scripts are found
  (was: "OK - 0 examples ran").
- `scripts/check_card_citations.py`: fails if the identity suite
  produced no PASS/FAIL results — i.e. it crashed / numpy missing (was:
  "OK — 0 citations against 0/0 passing checks"). **Proven:** run under
  system python (no numpy) now FAILs loudly.
- `tools/lint.py` card-citation hook: no longer *silently* skips when
  `.venv` is absent. It stays green only when zero cards cite a check;
  if citations exist but the venv cannot verify them, lint FAILS. 
  **Proven:** hiding `.venv` with 20 citations present produces a lint
  failure; restoring it returns green.

All normal runs unaffected: lint green, baseline (94) held, identity
suite 25/25, citations 19/19.
