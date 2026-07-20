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
