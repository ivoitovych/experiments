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
