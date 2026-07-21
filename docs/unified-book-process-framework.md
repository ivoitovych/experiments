# Revised Final Unified Process for Creating a High-Quality Scientific or Technical Book

**Framework version:** 1.0  
**Issue date:** 20 July 2026  
**Status:** Canonical master process  
**Document owner:** Project-defined process owner  
**Review rule:** Review this framework after each completed book project and before each new edition. Record all changes in the framework change log.

This is the authoritative requirements catalogue. Practical roadmaps, contributor guides, dashboards, and book-type checklists are derived from it; they do not become independent sources of truth.

---

## Phase 0 — Operating model, notation, tailoring, governance, and control system

### 0.1 [WP-00.01] Node semantics and requirement logic `[CORE] {J} [PLAN]`

- `[REQ]` — an atomic, independently assignable and verifiable requirement.
- `[GROUP:ALL]` — all applicable child requirements must be satisfied.
- `[SELECT:ONE]` — select exactly one child unless a documented exception permits otherwise.
- `[SELECT:ONE_OR_MORE]` — select at least one applicable child.
- `[OPTION-SET]` — children are available options and are not mandatory merely because the parent is mandatory.
- `[EXAMPLE]` — illustrative, not normative.
- `[EVIDENCE]` — required gate or verification evidence when applicable.
- `[CRITERION]` — acceptance condition.
- `[N/A]` — requirement is not applicable; rationale and approver must be recorded.
- `[DEFER]` — requirement is applicable but formally deferred to a named phase, owner, date, and gate.
- `[WAIVER]` — requirement is applicable but waived by authorized decision, with rationale, expiry, compensating controls, and residual risk.

**Inheritance rule:** procedure class, lifecycle state, and accountable-owner tags inherit only through `[GROUP:ALL]` and `[REQ]` nodes. They do **not** turn selections, options, examples, evidence lists, or criteria into mandatory requirements. Explicit child tags override inherited tags.

### 0.2 [WP-00.02] Applicability classes `[CORE] {J} [PLAN]`

- `[CORE]` — normally required for every in-scope project.
- `[TYPE]` — conditional on book or content type.
- `[ROUTE]` — conditional on publication, funding, distribution, or access route.
- `[JUR]` — conditional on jurisdiction, target market, or contractual jurisdiction.
- `[RISK]` — conditional on novelty, uncertainty, safety, security, privacy, ethical, reputational, or societal risk.
- `[OPT]` — optional enhancement whose omission does not require a waiver.

Applicability is determined provisionally at Gate 0, refined at Gates 1–3, baselined at Gate 3, and reassessed whenever scope, route, markets, formats, standards, law, or risk changes.

### 0.3 [WP-00.03] Lifecycle states `[CORE] {J} [PLAN]`

- `[PLAN]` — determine applicability, objective, method, resources, criteria, and evidence.
- `[IMPLEMENT]` — create or execute the required work.
- `[VERIFY]` — evaluate outputs against declared criteria.
- `[APPROVE]` — accept, reject, conditionally accept, defer, or waive through authorized decision.
- `[MAINTAIN]` — monitor, correct, update, preserve, transfer, or retire.

Recurring controls normally progress through all five states. A single state tag marks the principal state of a work package, not the entire life of its subject.

Where a summarized work package spans two named states, the notation `[STATE-1/STATE-2]` is permitted; its atomic requirement records still carry the appropriate individual state.

### 0.4 [WP-00.04] Roles and decision fields `[CORE] {J} [PLAN]`

- `{A}` — lead author or volume editor.
- `{C}` — co-author, chapter author, or contributor.
- `{P}` — publisher, publishing organization, or self-publisher acting as publisher of record.
- `{E}` — editorial professional, including developmental, technical, line, copy, or production editor.
- `{R}` — independent reviewer, verifier, reader tester, accessibility evaluator, safety/security assessor, statistician, or other specialist reviewer.
- `{V}` — production vendor, compositor, designer, printer, distributor, platform, or service provider.
- `{M}` — post-publication maintainer or successor.
- `{J}` — joint accountability.

The tag states the **default accountable role only**. Every executable requirement record separately names:

- accountable owner;
- executor;
- contributors and consulted parties;
- verifier;
- approver;
- informed parties;
- maintenance or succession owner.

Compound role notation is limited to:

- `{X/Y}` — route- or project-dependent alternative; the project must resolve it to a named accountable role;
- `{X→Y}` — formal handoff from X to Y, with acceptance evidence;
- `{J}` — genuine joint accountability with a named final decision authority.

Self-publishers assume applicable `{P}` accountability but may not satisfy independent verification by self-certification. Gates 6–10 require at least one qualified non-author verifier or approver whenever the gate covers reader fit, technical acceptance, compliance, accessibility, or release quality.

### 0.5 [WP-00.05] Stable identifiers and atomicity `[CORE] {J} [MAINTAIN]`

- Every numbered work package has a stable work-package ID, such as `WP-07.06`.
- Each independently assignable or verifiable leaf receives an atomic ID by suffix, such as `REQ-07.06.03`.
- IDs survive reordering; retired IDs are not reused.
- Split requirements receive new IDs with predecessor links.
- Merged requirements retain aliases and supersession links.
- Displayed summaries may group atomic requirements, but the master catalogue retains the atomic records.

### 0.6 [WP-00.06] Requirement record `[CORE] {J} [MAINTAIN]`

Each atomic requirement records:

- stable ID and short title;
- normative statement;
- node type and applicability class;
- applicability expression and rationale;
- criticality and error-severity override, if any;
- accountable owner, executor, verifier, approver, and maintainer;
- required inputs and dependencies;
- produced outputs;
- verification method and quantitative or qualitative acceptance criteria;
- applicable gate and evidence required;
- status: planned, in progress, verified, approved, N/A, deferred, waived, failed, retired;
- completion evidence and decision record;
- assumptions, limitations, open issues, and residual risks;
- normative references and their dated versions;
- change, supersession, and maintenance history.

### 0.7 [WP-00.07] Orthogonal product taxonomy `[CORE] {A} [PLAN]`

Select independently across dimensions; do not confuse format, accessibility, manufacturing, and distribution.

- `[SELECT:ONE_OR_MORE]` Physical form: hardcover; paperback; loose-leaf; durable field format; other defined form.
- `[SELECT:ONE_OR_MORE]` Digital form: PDF; EPUB; web/HTML; audiobook; interactive edition; other defined form.
- `[OPTION-SET]` Accessibility characteristics: tagged PDF; accessibility-tested PDF; PDF/UA-conforming PDF where applicable; EPUB Accessibility conformance; accessible web conformance; synchronized text/audio; defined optimized-access modality.
- `[SELECT:ONE_OR_MORE]` Manufacturing method: offset; digital short run; print-on-demand; no print edition.
- `[SELECT:ONE_OR_MORE]` Distribution model: publisher; retail; academic aggregator; library supply; institutional; repository; direct sales; platform-hosted; open distribution.
- `[SELECT:ONE_OR_MORE]` Access model: commercial closed access; immediate open access; repository self-archiving; diamond/no-fee open access; mixed access; sponsored access.

### 0.8 [WP-00.08] Nested process loops `[CORE] {J} [PLAN]`

- Discovery loop: concept → audience → market → preliminary evidence → feasibility → revision.
- Proposal loop: provisional architecture → sample → review → revision → acquisition/authorization.
- Architecture loop: dependencies → pedagogy → style → accessibility source design → prototype → reader validation → revision.
- Chapter loop: research → draft → developmental review → verification → reader/expert review → revision.
- Production loop: composition → format implementation → proof → correction → regression verification → approval.
- Lifecycle loop: feedback → triage → correction → maintenance → edition decision → preservation or retirement.

Phases provide the default dependency order, not a rigid waterfall. Iteration across phases is permitted under change and impact control.

### 0.9 [WP-00.09] Gate semantics `[CORE] {J} [PLAN]`

Gate decisions are: approved; conditionally approved; returned for rework; paused; rejected.

Every gate package records:

- applicable deliverables and their statuses;
- N/A, deferment, and waiver decisions;
- verification results and acceptance-criterion results;
- open issues by severity;
- risk, compliance, accessibility, rights, and maintenance reports as applicable;
- decision owner, independent verifier, approver, date, conditions, and expiry;
- failed criteria, rework owner, return phase, deadline, retest scope, and escalation route;
- residual-risk acceptance and final appeal route.

Arbitration authorities are assigned for scientific/technical, editorial/pedagogical, ethics/legal/compliance, accessibility, safety/security, production, commercial, and publisher-acceptance disputes. No silent waiver is permitted.

### 0.10 [WP-00.10] Continuous registers `[CORE] {J} [MAINTAIN]`

- Decision, issue, assumption, limitation, risk, and residual-risk registers.
- Evidence, claim–source, retraction/correction, and uncertainty registers.
- Permissions, licences, assets, quotations, and credit-line registers.
- Contributor, authorship, conflict-of-interest, and disclosure registers.
- Terminology, acronym, notation, symbol, unit, and style registers.
- Accessibility requirements, findings, metadata, and conformance registers.
- Ethics, safety, security, privacy, dual-use, inclusion, sustainability, and societal-impact registers where applicable.
- Standards, law, policy, contract, and normative-reference register.
- Configuration, version, dependency, release, change, gate-decision, maintenance, preservation, and succession registers.

### 0.11 [WP-00.11] Dated normative-reference control `[CORE] {J} [MAINTAIN]`

Each governing law, standard, specification, publisher policy, contract clause, funder rule, institutional rule, software platform, and toolchain dependency records:

- title and issuing authority;
- jurisdiction and applicability;
- version, publication date, effective date, and access date;
- implementation location and verification method;
- supersession status and next review date.

Technical conformance frameworks do not automatically create legal conformity or a presumption of conformity. Any claimed legal effect must be tied to applicable law, national implementation, contract, formally recognized harmonized standard, or technical specification.

### 0.12 [WP-00.12] Quality and error-severity model `[CORE] {J} [PLAN]`

- Blocker: release or gate cannot proceed.
- Critical: likely serious scientific, technical, safety, security, legal, accessibility, or reputational harm.
- Major: materially impairs correctness, comprehension, reproducibility, usability, or contractual acceptance.
- Minor: localized defect with limited reader impact.
- Cosmetic: presentation defect without material meaning change.
- Override classes: safety-critical; security-critical; accessibility-critical; privacy-critical; research-integrity-critical.

Closure, acceptance, waiver, retest, and notification rules are defined for each severity.

### 0.13 [WP-00.13] Cross-cutting invariants `[CORE] {J} [MAINTAIN]`

- Accessibility, ethics, security, privacy, inclusion, sustainability, and societal impact by design.
- Human accountability for all content and decisions, including AI-assisted work.
- Evidence traceability and explicit distinction among fact, interpretation, hypothesis, recommendation, and opinion.
- Explicit assumptions, limitations, validity domains, and residual risks.
- Required-versus-conditional-versus-optional classification.
- Named accountability, independent verification, and succession for every major deliverable.
- Version control, reproducible builds where applicable, backups, recovery, and access control.
- Regression verification after every significant change, including post-freeze and post-publication changes.
- Content compliance completed before freeze; production-format accessibility and integrity tested after typesetting or conversion.
- Dated legal and standards baselines reassessed at every affected gate and new edition.
- Long-term maintenance and end-of-life planning from the creation of every digital or software-dependent component.

### Gate 0 — Process-tailoring authorization `{J}`

**Evidence:** provisional book-type candidates; provisional route candidates; known and candidate markets/jurisdictions; anticipated product forms; initial risk profile; unresolved assumptions; provisional role and gate-authority map.

**Pass criteria:** the discovery process can begin safely; no known mandatory workstream is ownerless; uncertainties are explicitly provisional rather than falsely resolved.

**Failure route:** return to tailoring; obtain missing authority or expertise; pause work whose governing conditions are unknown.

---

## Phase 1 — Discovery, concept, audience, market, feasibility, positioning, and path selection

### 1.1 [WP-01.01] Purpose, thesis, and contribution `[CORE] {A} [PLAN]`

- Define the reader problem and knowledge, educational, professional, research, practical, or reference need.
- State the core question, principal thesis or organizing proposition, and expected reader transformation.
- State the scientific, technical, pedagogical, practical, or reference contribution.
- Define the unique value proposition and why a book is the appropriate form.

### 1.2 [WP-01.02] Book and content classification `[CORE] {A} [PLAN]`

`[SELECT:ONE_OR_MORE]` Select and justify: textbook; research monograph; professional technical book; reference work/handbook; tutorial; field guide; popular-science book; edited/contributed volume; hybrid form.

Classify content dimensions independently: mathematical; code-bearing; data-bearing; experimental; hazardous/sensitive; jurisdiction-specific; rapidly changing; interactive; translatable/localizable.

### 1.3 [WP-01.03] Audience and intended use `[CORE] {A} [PLAN]`

- Define primary and secondary audiences, academic level, professional roles, prior knowledge, mathematical maturity, technical and research experience.
- Define reading goals, contexts of use, language and cultural context, accessibility needs, and likely constraints.
- `[SELECT:ONE_OR_MORE]` Intended uses: structured learning; self-study; course adoption; professional development; certification; problem solving; research/laboratory/field reference; decision support.
- Define differentiated reader pathways and which are explicitly unsupported.

### 1.4 [WP-01.04] Scope, boundaries, and shelf life `[CORE] {A} [PLAN]`

- Included and excluded subjects; depth and breadth; theory–practice balance; historical and current-state coverage.
- Geographic, jurisdictional, platform, version, and technology applicability.
- Expected shelf life, update cadence, obsolescence triggers, and maintenance burden.

### 1.5 [WP-01.05] Success criteria `[CORE] {A} [PLAN]`

- Accuracy, correctness, completeness, clarity, coherence, learnability, usefulness, reproducibility, accessibility, discoverability, maintainability, longevity.
- Book-specific measurable outcomes and unacceptable failure conditions.
- Reader-test, expert-review, technical-verification, and release-quality targets to be elaborated in the quality plan.

### 1.6 [WP-01.06] Preliminary evidence and feasibility `[CORE] {A} [IMPLEMENT]`

- Identify foundational and recent sources, standards, specifications, datasets, implementations, competing interpretations, retractions/corrections, and evidence gaps.
- Test the feasibility of the riskiest central claims, methods, examples, formats, permissions, and toolchain assumptions.
- Assess expertise, missing expertise, source/data/tool availability, budget, schedule, page limits, market viability, and maintenance capacity.

### 1.7 [WP-01.07] Market, competitor, and demand analysis `[CORE] {A} [IMPLEMENT]`

- Survey direct competitors, adjacent and foundational books, recent titles, open resources, courses, official documentation, communities, and alternative media.
- Compare audience, scope, depth, structure, pedagogy, currency, accuracy, accessibility, visuals, supplementary resources, formats, price, reviews, and adoption.
- Investigate demand through proportionate reader, instructor, practitioner, researcher, institutional, community-question, support-ticket, review, and syllabus analysis.
- Record missing, outdated, incorrect, inaccessible, irreproducible, or pedagogically weak treatments.

### 1.8 [WP-01.08] Positioning and product strategy `[CORE] {A} [PLAN]`

- Working title/subtitle, promise, differentiators, author credibility, expected market and lifespan.
- Select product dimensions under 0.7; estimate length, illustration density, colour, supplementary products, release sequence, open-access strategy, and initial pricing range.
- Distinguish tagged PDF, accessibility-tested PDF, and PDF/UA conformance; do not treat them as synonyms.

### 1.9 [WP-01.09] Publication-path comparison `[CORE] {A} [VERIFY]`

`[SELECT:ONE_OR_MORE]` Evaluate traditional commercial, university press, society, commissioned/institutional, independent self-publishing, assisted/hybrid, immediate open-access, repository, diamond, and mixed routes.

Compare publisher/series fit, review quality, editorial support, production and accessibility capability, data/code/AI policies, distribution, marketing, rights, royalties, funding, schedule, control, financial risk, preservation, and maintenance.

### 1.10 [WP-01.10] Preliminary rights, compliance, and societal-risk scan `[CORE] {J} [PLAN]`

- Human/animal research; privacy; defamation; safety; cybersecurity; dual use; vulnerable populations; cultural/heritage concerns.
- Third-party text, images, tables, code, data, trademarks, standards, and permissions.
- AI policy and confidentiality constraints.
- Accessibility, legal deposit, consumer, translation, tax, and distribution jurisdictions.
- Sustainability impacts and broader societal consequences proportionate to subject and scale.

### 1.11 [WP-01.11] Provisional architecture and proposal sample `[ROUTE] {A} [IMPLEMENT]`

- Provisional annotated table of contents, chapter purposes, dependencies, examples, exercises, terminology, notation, and representative assets.
- Produce a route-appropriate sample sufficient to demonstrate voice, depth, technical quality, citation practice, visuals, and feasibility.
- Record preliminary expert/reader feedback.
- Keep the proposal sample distinct from the post-baseline full-stack prototype in Phase 6.

### 1.12 [WP-01.12] Early communication and adoption plan `[ROUTE] {J} [PLAN]`

- Define audiences, author/publisher channels, sample-content policy, adoption prospects, conference/community presence, and ethical promotional claims.
- Establish a provisional schedule for catalogue copy, website, early-access material, ARCs/review copies, instructor outreach, and launch activity.

### Gate 1 — Concept, need, feasibility, and provisional type approval `{J}`

**Evidence:** concept brief; audience profile; scope and exclusion statement; success criteria; preliminary evidence report; market/gap analysis; product strategy; provisional book-type modules; initial risk register; route candidates; proposal sample when applicable.

**Pass criteria:** clear reader need; defensible contribution; feasible scope; plausible evidence; differentiated position; acceptable initial risk; unresolved route decisions explicitly carried forward.

**Failure route:** revise purpose, audience, scope, evidence, product concept, or feasibility; terminate if no defensible need or viable execution path exists.

---

## Phase 2 — Proposal, acquisition or project authorization, route branching, and agreements

### 2.1 [WP-02.01] Acquired/commissioned publishing branch `[ROUTE] {A} [IMPLEMENT]`

- Prepare proposal: synopsis; contribution; audience/prerequisites/use; scope/exclusions; annotated contents and estimates; figures/tables/supplements; competition/market/adoption; schedule; samples; biographies/credentials; contributors; permission/AI/accessibility/OA/funding information.
- Select publishers/series using fit, reputation, review, editorial, production, accessibility, distribution, rights, financial, and maintenance criteria.
- Submit required forms, samples, declarations, and records under confidentiality control.
- Support publisher evaluation: commissioning, market, financial, internal subject, external proposal review, series/editorial-board/faculty review, and funding assessment.
- Maintain a point-by-point proposal-review response and revision record.

### 2.2 [WP-02.02] Self-publishing or institutionally authorized branch `[ROUTE] {A/P} [IMPLEMENT]`

- Prepare a publishing brief/business case equivalent to a proposal.
- Define imprint/publisher of record, business and tax responsibilities, budget authority, product forms, distribution, preservation, customer support, and legal-deposit responsibility.
- Commission independent proposal/feasibility review proportionate to risk.
- Approve a self-publishing or institutional charter with predeclared acceptance criteria and named independent reviewers/editors.

### 2.3 [WP-02.03] Contract and charter terms `[ROUTE] {J} [APPROVE]`

- Manuscript specification, delivery date, length, illustrations, acceptance, review, accessibility, maintenance, and revised-edition obligations.
- Warranties, indemnities, copyright ownership/licence, royalties/advance/fees/OA charges, copies, termination, reversion, and out-of-print definitions.
- Electronic, translation, audiobook, adaptation, courseware, database, territorial, subsidiary, and archival rights.
- AI provisions, confidentiality, data/code obligations, accessibility obligations, preservation, and post-publication correction authority.

### 2.4 [WP-02.04] Contributor agreements `[TYPE] {J} [APPROVE]`

- Authorship criteria; contribution and chapter ownership; delivery/review/revision duties; rights; compensation/royalty; conflict/funding/AI disclosure; final approval; replacement, withdrawal, correction, and retraction procedures.

### 2.5 [WP-02.05] Route-module confirmation `[CORE] {J} [PLAN]`

- Confirm publication-route, access-model, funding, self-publishing, translation, audiobook, interactive, and distribution modules.
- Record remaining route contingencies and their decision deadlines.

### Gate 2 — Acquisition or project authorization `{J}`

**Acquired-route evidence:** approved proposal; review record; editorial decision; executed contract; applicable contributor agreements; rights summary.

**Self/institutional-route evidence:** approved publishing brief; independent review; executed charter and budget authority; service-provider plan; contributor agreements; acceptance and independence plan.

**Pass criteria:** scope, deliverables, rights, responsibilities, schedule, financial model, review obligations, and release authority are defined for the selected route.

**Failure route:** revise proposal/business case; renegotiate; select another publisher/route; reduce scope; pause or terminate.

---

## Phase 3 — Project baseline, expertise, quality, toolchain, and operational planning

### 3.1 [WP-03.01] Expertise inventory and team formation `[CORE] {J} [PLAN]`

- Inventory subject, mathematical, experimental, statistical, software, pedagogical, accessibility, ethics, safety/security, legal/compliance, editorial, production, marketing, and maintenance expertise.
- Remediate gaps through directed study, training, consultation, prototype work, specialist recruitment, or scope reduction.
- Assign lead author, contributors, editors, reviewers, reader testers, accessibility specialist, sensitivity/inclusion reviewer, illustrator, visualization specialist, statistician, indexer, production editor, repository/software maintainer, and successor as applicable.

### 3.2 [WP-03.02] Responsibility and independence matrix `[CORE] {J} [PLAN]`

- Bind every work package to named accountable owner, executor, verifier, approver, consulted and informed parties, and maintainer.
- Define scientific, editorial, legal, accessibility, safety/security, production, and commercial decision authority and escalation.
- Prevent conflicted self-verification at quality-critical gates; document reviewer independence and conflicts.
- Establish emergency handover, contributor replacement, credential transfer, and succession.

### 3.3 [WP-03.03] Project plan and budget `[CORE] {J} [PLAN]`

- Work breakdown keyed to requirement IDs; deliverables; dependencies; critical path; milestones; review cycles; gate dates; contingency; publication and launch windows.
- Budget research, editing, review, illustration, visualization, permissions, indexing, accessibility, software, repositories, OA, printing, marketing, travel/events, support, preservation, and contingency.

### 3.4 [WP-03.04] Risk management `[CORE] {J} [MAINTAIN]`

- Scope, schedule, contributor, expertise, evidence, obsolescence, reproducibility, rights, copyright, privacy, security, safety, accessibility, toolchain, repository, budget, publisher, distribution, maintenance, sustainability, and societal-impact risks.
- Record likelihood, consequence, detectability, owner, mitigation, trigger, contingency, residual risk, and escalation.

### 3.5 [WP-03.05] Collaboration and information control `[CORE] {J} [PLAN]`

- Communication channels and cadence; file and review conventions; comment resolution; conflict process; confidentiality; access control; secure transfer; meeting and decision records.

### 3.6 [WP-03.06] Toolchain baseline `[CORE] {A} [PLAN]`

- Select authoring/composition system according to content complexity, accessibility, publisher specification, collaboration, automation, and long-term maintainability.
- Select reference manager, version control, issue tracker, diagram/data tools, code repository, build automation, testing, accessibility testing, archival export, and backup/recovery tools.
- Demonstrate a minimal build.
- Baseline the toolchain at Gate 3; later changes require configuration, impact, migration, rollback, and regression control.

### 3.7 [WP-03.07] Configuration and preservation planning `[CORE] {A} [MAINTAIN]`

- Repository structure; branching; versions; file/asset naming; release tags; dependency locks; change log; backups; recovery; access; archival formats; retention; mirror and migration plans.

### 3.8 [WP-03.08] Quality and verification plan `[CORE] {J} [PLAN]`

- Acceptance criteria and evidence standards by deliverable.
- Review depth, independence, sampling, reproducibility, accessibility, and regression requirements.
- Reader-test participant profiles and sample rationale; comprehension, task/exercise completion, navigation, abandonment, accessibility coverage, severity, saturation/stopping, and retest criteria where applicable.
- Error-severity rules, closure authority, waiver limits, residual-risk acceptance, and gate sign-offs.

### 3.9 [WP-03.09] Compliance traceability plan `[CORE] {J} [PLAN]`

- Requirement/source; jurisdiction; responsible economic/operator role; implementation location; verifier; evidence; retention; review date; exception or exemption basis.
- Separate legal/contractual minimum from voluntary best-practice target.

### 3.10 [WP-03.10] Developmental-editing plan `[CORE] {E} [PLAN]`

Schedule developmental review at architecture, prototype, first representative chapter, mid-manuscript integration, complete manuscript, and final pre-freeze stages as proportionate to project scale.

### 3.11 [WP-03.11] Communication, adoption, and marketing workstream baseline `[ROUTE] {J} [PLAN]`

- Positioning and claims; author/publisher channels; catalogue and website milestones; samples; ARCs/review copies; endorsements; instructor/library/society outreach; launch; sustained promotion; rights marketing.
- Coordinate promotional claims with evidence, confidentiality, embargoes, rights, and accessibility.

### Gate 3 — Project-baseline approval `{J}`

**Evidence:** project plan; budget; expertise inventory; responsibility/independence matrix; risk and quality plans; toolchain demonstration; compliance matrix; live registers; editing and communication schedules.

**Pass criteria:** work is resourced; gaps have remedies; responsibilities and independent checks are bound; risks have owners; toolchain works; quality/compliance criteria are testable; route modules are confirmed.

**Failure route:** replan scope, resources, expertise, roles, quality targets, route, or toolchain.

---

## Phase 4 — Research, synthesis, evidence, ethics, data, permissions, and compliance groundwork

### 4.1 [WP-04.01] Research strategy and method `[CORE] {A} [PLAN]`

- Core questions; search strategy; sources; inclusion/exclusion; evidence standards; currency; completion and surveillance criteria.
- `[SELECT:ONE_OR_MORE]` Narrative, critical, scoping, systematic, evidence-map, historical/archival, standards, specification, patent, or other justified review method.
- A systematic review is required only when the purpose and claims warrant it.

### 4.2 [WP-04.02] Source discovery and evaluation `[CORE] {A} [IMPLEMENT/VERIFY]`

- Discover primary studies, syntheses, standards, specifications, patents, reports, official documentation, authoritative datasets, archives, preprints, negative results, and expert testimony.
- Evaluate authority, methodology, relevance, currency, peer-review status, replicability, conflicts, funding bias, retractions, corrections, and expressions of concern.

### 4.3 [WP-04.03] Evidence and claim management `[CORE] {A} [MAINTAIN]`

- Maintain reference database, annotated bibliography, claim–source matrix, quotations/pages, evidence strength, contradictory evidence, uncertainty, and permissions.
- Classify each material claim as fact, definition, derived result, empirical finding, interpretation, hypothesis, speculation, recommendation, or opinion.
- Record explicit/hidden assumptions, validity domains, boundary and failure conditions, sensitivity, uncertainty, and generalizability.

### 4.4 [WP-04.04] Research synthesis `[CORE] {A} [IMPLEMENT]`

- Synthesize consensus findings, evidence-weighted conclusions, competing models, contradictory results, historical development, boundary conditions, negative results, open questions, and current limitations.
- Preserve disagreement rather than manufacturing false consensus.
- Link synthesis conclusions to claims, architecture decisions, examples, and scope exclusions.

### 4.5 [WP-04.05] Original research and empirical work `[TYPE] {A} [IMPLEMENT]`

- Research question; design; preregistration where appropriate; reporting guideline; sampling; power; controls; calibration; statistical plan; ethics approval before regulated work.
- Apparatus, materials, procedure, safety, provenance, raw observations, deviations, and negative results.

### 4.6 [WP-04.06] Data and artifact management `[TYPE] {A} [PLAN/IMPLEMENT]`

- Collection, formats, metadata, provenance, storage, backup, access, privacy, anonymization, retention, repository, licensing, citation, and preservation.
- Apply FAIR principles proportionately: findability, accessibility, interoperability, and reusability.
- Prepare data/code availability statements, restrictions, embargoes, persistent identifiers, contact, and maintenance responsibility.

### 4.7 [WP-04.07] Research integrity and ethics `[RISK] {J} [APPROVE]`

- Honesty, transparency, accountability, authorship/contributor credit, citation integrity, plagiarism/text-reuse controls, conflicts, and funding disclosure.
- Human-subject consent/privacy, vulnerable populations, animal welfare, cultural/heritage protection, community harms, and ethics approvals as applicable.

### 4.8 [WP-04.08] Rights and permissions groundwork `[CORE] {A} [IMPLEMENT]`

- Inventory text, figures, tables, photographs, maps, standards, code, data, trademarks, fonts, and media.
- `[SELECT:ONE]` Classify each asset: author-owned; publisher-owned; public domain; openly licensed; permission required; statutory exception/fair use/fair dealing after case-specific analysis; replace; exclude.
- Track owner, territory, language, edition, format, duration, exclusivity, accessibility adaptation rights, credit line, request, evidence, restrictions, and expiry.

### 4.9 [WP-04.09] Safety, security, privacy, defamation, dual-use, and societal controls `[RISK] {J} [IMPLEMENT]`

- Physical, electrical, mechanical, chemical, biological, radiation, environmental, medical, operational, and other hazards.
- Cybersecurity, vulnerability disclosure, secure-code review, credential/secret removal, malicious use, capability escalation, sensitive operational detail, redaction/abstraction, and access restrictions.
- Personal/confidential/proprietary/location data, image consent, anonymization, allegations, evidence, right of reply, and legal review.
- Sustainability, environmental consequences, distributional effects, foreseeable misuse, bias, and wider societal impact.

### 4.10 [WP-04.10] Accessibility applicability and baseline `[JUR] {J} [PLAN]`

- Target markets; applicable national law; economic-operator roles; publisher/distributor/platform responsibilities; exemptions and exceptions; fundamental alteration; disproportionate burden; documentation and retention.
- Applicable contractual/procurement obligations and formally recognized standards or technical specifications.
- Separate statutory/contractual baseline from current best-practice target.
- Record applicable EPUB Accessibility, WCAG, PDF/UA, web, audio, harmonized/recognized, metadata, and assistive-technology frameworks by dated reference.
- Do not claim that WCAG or EPUB conformance alone creates a legal presumption unless the applicable legal mechanism says so.

### 4.11 [WP-04.11] AI-use applicability and governance `[RISK] {J} [PLAN]`

- Publisher, contract, institution, funder, law, and platform rules; permitted/prohibited uses; confidentiality; human accountability; disclosure timing; verification; provenance; bias; image/translation restrictions; required records and retention.

### 4.12 [WP-04.12] Copyright, licensing, legal-deposit, and localization planning `[JUR] {J} [PLAN]`

- Book, OA, code, data, figure, font, media, and third-party licence compatibility.
- Copyright protection and ownership; optional/strategic registration or registration relevant to a jurisdiction-specific procedure or remedy.
- Keep copyright registration distinct from legal deposit.
- Identify legal-deposit duties, translation rights, source-language control, terminology database, units/locales, figure text separation, and local review needs.

### 4.13 [WP-04.13] Ongoing surveillance `[CORE] {A} [MAINTAIN]`

- New-paper, retraction, correction, standards, specification, software, dataset, regulatory, publisher-policy, and security alerts through publication and maintenance.

### Gate 4 — Evidence and compliance readiness `{J}`

**Evidence:** research and synthesis plan/status; evidence register; applicable ethics approvals; data/artifact plan; permissions register; safety/security/privacy assessment; accessibility and AI applicability assessments; dated normative-reference register.

**Pass criteria:** central claims have a plausible evidence path; regulated work is authorized before execution; synthesis method is adequate; data and permissions are viable; compliance and societal risks are identified and controlled.

**Failure route:** revise research, scope, claims, assets, methods, markets, formats, route, or compliance plan.

---

## Phase 5 — Intellectual architecture, pedagogy, terminology, style, accessible source, and developmental validation

### 5.1 [WP-05.01] Central narrative and knowledge model `[CORE] {A} [PLAN]`

- Foundational question, starting problem, principal thesis, conceptual progression, recurring themes, unifying models, and final synthesis.
- Concepts, definitions, assumptions, principles, laws, theorems, methods, algorithms, tools, applications, critiques, and limitations.

### 5.2 [WP-05.02] Dependency and abstraction design `[CORE] {A} [PLAN]`

- Prerequisites, forward dependencies, circular dependencies, missing bridges, optional branches, and reference-only material.
- Use the concept-introduction ladder where appropriate: motivating problem → concrete example → intuition → precise definition → informal model → formal consequences → implementation/application → critique and limits.

### 5.3 [WP-05.03] Book, chapter, sequence, and scope architecture `[CORE] {A} [PLAN]`

- Parts, chapters, sections, appendices, glossary, acronym/symbol lists, references, and index strategy.
- Chapter pattern selected from motivation, prerequisites, objectives, roadmap, concepts, formal treatment, examples, applications, limitations, exercises, summary, and further reading; optional elements remain explicit options.
- Sequence known-to-unknown, simple-to-complex, concrete-to-abstract, intuition-to-formalism, theory–practice alternation, spiral reinforcement, and cumulative integration.
- Allocate must-have, should-have, optional, appendix, online-only, and deferred content.

### 5.4 [WP-05.04] Pedagogy and reader pathways `[TYPE] {A} [PLAN]`

- Measurable outcomes at book/part/chapter/section levels and curriculum alignment where applicable.
- Prerequisite diagnostics, refreshers, remedial references, and advanced paths.
- Cognitive-load controls: chunking, progressive disclosure, notation pacing, example spacing, summaries, and redundancy control.
- Misconception controls: common errors, false analogies, boundary cases, counterexamples, diagnostic questions, and corrective explanations.
- Reinforcement: retrieval, spacing, interleaving, cumulative exercises, and synthesis.
- Assessment: concept, calculation, derivation, proof, programming, experiment, design, debugging, data analysis, research questions, and projects as applicable.
- Reader paths: beginner, student, practitioner, researcher, instructor, and reference.

### 5.5 [WP-05.05] Navigation design `[CORE] {A} [PLAN]`

- Part introductions, chapter roadmaps, cross-references, dependency notes, signposts, recaps, reading paths, meaningful links, page-navigation source, and index strategy.

### 5.6 [WP-05.06] Terminology, notation, units, and style `[CORE] {A} [PLAN]`

- Preferred, synonymous, deprecated, culturally sensitive, and domain-specific terms; acronyms; symbols; scopes; collision detection; units.
- Editorial: voice, tone, person, tense, spelling, capitalization, punctuation, numbers, and inclusive language.
- Mathematical: symbols, equations, operators, vectors/matrices, proofs, and units.
- Code: language versions, formatting, names, comments, errors, dependencies, security, and deprecation.
- Visual: figures/tables, palette, line styles, typography, captions, accessibility, and localization.
- Citation: format, bibliography, footnotes, source quality, pages, and persistent identifiers.

### 5.7 [WP-05.07] Accessible and localization-ready source `[CORE] {A} [PLAN]`

- Semantic headings and reading order; accessible mathematics and tables; alt text and long descriptions; colour/contrast independence; meaningful links; language metadata; page navigation; accessible index source.
- Controlled language; terminology database; translatable structure; locale-independent graphics; units/dates/numbers; figure-text separation; code-comment strategy.

### 5.8 [WP-05.08] Architecture-level developmental edit `[CORE] {E} [VERIFY]`

- Review purpose, promise, scope, dependency graph, sequencing, conceptual bridges, balance, pacing, reader pathways, cognitive load, accessibility, and production feasibility.
- Resolve architecture-level issues before full drafting.

### Gate 5 — Architecture approval `{J}`

**Evidence:** final architecture; dependency graph; outcomes/path map; terminology/symbol/style registers; accessible-source specification; scope allocation; developmental-editor report and response.

**Pass criteria:** dependencies and thesis are coherent; scope fits constraints; readers have viable paths; terminology/style are controlled; source can support required outputs and accessibility.

**Failure route:** return to evidence synthesis, scope, sequence, pedagogy, style, source design, or product strategy.

---

## Phase 6 — Full-stack prototype and early validation

### 6.1 [WP-06.01] Risk-based prototype selection `[CORE] {A} [PLAN]`

`[SELECT:ONE_OR_MORE]` Select the smallest set that represents applicable risks: foundational exposition; mathematical/formal content; code/practical workflow; empirical/data content; advanced content; exercises; visuals/tables; supplementary artifact; accessibility-intensive content. A project is not required to produce nonexistent chapter types.

### 6.2 [WP-06.02] Full-stack implementation `[CORE] {A} [IMPLEMENT]`

- Prose, equations, figures, tables, code/data, exercises, references, semantic/accessibility structure, metadata, builds, and supplementary artifacts through the intended toolchain.

### 6.3 [WP-06.03] Toolchain and production validation `[CORE] {A} [VERIFY]`

- Source build; equation/code/figure/citation/cross-reference generation; output conversion; accessibility scan; archival export; repository and recovery test.
- Record migration or toolchain changes under baseline change control.

### 6.4 [WP-06.04] Expert and developmental review `[CORE] {R/E} [VERIFY]`

- Scientific/technical accuracy; depth; scope; developmental structure; style; pedagogy; production, accessibility, localization, and maintenance feasibility.

### 6.5 [WP-06.05] Target-reader testing `[CORE] {R} [VERIFY]`

- Participants and sample rationale according to the quality plan.
- Think-aloud reading; comprehension; exercise/task completion; navigation; delayed recall; accessibility and assistive-technology interaction where applicable.
- Observe confusion, abandonment, misinterpretation, cognitive overload, missing prerequisites, and unintended reader pathways.
- Evaluate against predeclared thresholds; record qualitative findings where quantitative thresholds are inappropriate.

### 6.6 [WP-06.06] Prototype revision and retest `[CORE] {A} [IMPLEMENT/VERIFY]`

- Revise architecture, scope, difficulty, explanations, examples, style, accessibility, toolchain, schedule, and budget.
- Perform impact analysis and retest affected acceptance criteria.

### 6.7 [WP-06.07] Early-access decision `[ROUTE] {J} [APPROVE]`

- Audience, scope, confidentiality/embargo, version labels, feedback channel, moderation, disclosure, revision policy, and withdrawal process.

### Gate 6 — Prototype approval `{J}`

**Evidence:** built prototype; independent expert report; developmental review; reader-test report; toolchain/accessibility report; revisions and retest results.

**Pass criteria:** representative content meets declared targets; reader fit is demonstrated proportionately; toolchain is stable or controlled; production/accessibility/maintenance are feasible; risks are acceptable.

**Independence:** at least one qualified non-author verifier or approver is required.

**Failure route:** return to evidence, architecture, prototype, toolchain, product forms, schedule, or budget.

---

## Phase 7 — Manuscript and artifact development loop

### 7.1 [WP-07.01] Chapter initiation `[CORE] {A} [PLAN]`

- Chapter brief; purpose; objectives; prerequisites; dependencies; source packet; claim, figure, example, exercise, permission, accessibility, and artifact inventories; acceptance criteria.
- Identify the chapter’s place in reader pathways and the book’s thesis.

### 7.2 [WP-07.02] Drafting and section-level control `[CORE] {A} [IMPLEMENT/VERIFY]`

- Develop motivation, conceptual explanation, definitions, formal treatment, evidence, examples, applications, limitations, summary, and transitions as applicable.
- Verify clear purpose, logical progression, defined terminology, supported claims, reader orientation, cognitive load, and navigation at section level.
- Distinguish facts, derivations, interpretations, hypotheses, recommendations, and opinions in wording and sourcing.

### 7.3 [WP-07.03] Mathematical and formal content `[TYPE] {A} [IMPLEMENT]`

- State premises, definitions, symbol scopes, derivations, intermediate steps, transformation justifications, lemmas, proofs, boundary cases, limiting cases, dimensional checks, interpretation, and validity conditions.
- Maintain proof/dependency links and a notation/symbol collision check.

### 7.4 [WP-07.04] Code and algorithms `[TYPE] {A} [IMPLEMENT]`

- Select examples for pedagogical and practical relevance with no unnecessary complexity.
- Specify algorithm, assumptions, inputs, outputs, invariants, complexity, numerical stability, portability, security, errors, and expected results.
- Provide focused excerpts plus complete runnable versions where useful; explain outputs, failure modes, limitations, and version dependencies.
- Maintain repository, release tags, continuous integration where proportionate, issue tracking, and archival snapshots.

### 7.5 [WP-07.05] Code testing and computational reproducibility `[TYPE] {A} [VERIFY/IMPLEMENT]`

- Unit, integration, property-based, regression, edge-case, cross-platform, performance, security, and numerical tests as applicable.
- Distinguish repeatability, computational reproducibility, experimental replicability, and generalizability.
- Record environment, dependency locks, container/environment file, dataset versions, random seeds, hardware, instructions, expected outputs, tolerances, nondeterminism, and known platform differences.

### 7.6 [WP-07.06] Experimental and data content `[TYPE] {A} [IMPLEMENT]`

- Question, apparatus, materials, calibration, procedure, controls, sampling, safety, provenance, raw observations, and deviations.
- Acquisition, cleaning, transformation, normalization, missing data, outliers, model, assumption checks, sensitivity, uncertainty, robustness, and negative results.
- Publish or preserve raw/processed data, code, machine-readable formats, licences, anonymization, identifiers, and reproduction instructions as applicable.

### 7.7 [WP-07.07] Examples and case studies `[CORE] {A} [IMPLEMENT]`

- Use representative, edge, failure, historical, contemporary, and cross-domain cases as appropriate.
- Structure context → problem → assumptions → method → solution → interpretation → limitations → generalization/transfer.
- Verify calculations, sources, implementations, realism, inclusiveness, cultural context, and permission status.

### 7.8 [WP-07.08] Exercises, solutions, and assessment artifacts `[TYPE] {A} [IMPLEMENT/VERIFY]`

- Map objectives, difficulty, skills, prerequisites, time, wording, data realism, solvability, answer bounds, hints, solutions, alternatives, common mistakes, and grading guidance.
- Validate by author solution, independent solution, representative learner trial, instructor review, and time calibration as proportionate.
- Protect restricted instructor/test materials where applicable.

### 7.9 [WP-07.09] Visual and tabular content `[CORE] {A} [IMPLEMENT/VERIFY]`

- Concept/process/architecture diagrams, schematics, graphs, maps, photographs, micrographs, technical illustrations, and comparison/reference/parameter/result/summary tables as applicable.
- Verify data integrity, encoding, scale, labels, annotations, captions, numerical accuracy, attribution, cross-references, print/screen legibility, colour independence, contrast, alt text, long descriptions, and table headers/relationships.
- Maintain editable sources, exports, resolution, names, versions, permissions, localization, and regeneration instructions.

### 7.10 [WP-07.10] Citation and source integrity `[CORE] {A} [MAINTAIN]`

- Claim support; primary-source preference where appropriate; page locations; quotation/paraphrase accuracy; persistent identifiers; retraction/correction status; duplicate removal; link preservation; archival alternatives.
- Never use a citation merely because an automated system supplied it; verify existence, relevance, and support.

### 7.11 [WP-07.11] Front and back matter `[CORE] {A} [IMPLEMENT]`

- `[GROUP:ALL]` Required as applicable: title and copyright pages; reader guide; disclosures; table of contents source; references/bibliography; author/contributor information.
- `[OPTION-SET]` Dedication; epigraph; foreword; preface; acknowledgments; notation guide; lists of figures/tables; appendices; glossary; acronym/symbol lists; solutions; index candidates.
- Mark contents and page locators provisional until typesetting is stable.

### 7.12 [WP-07.12] Supplementary and companion materials `[TYPE] {A} [IMPLEMENT]`

- `[OPTION-SET]` Code/data repositories; simulations; exercise files; solution manual; instructor guide; slides; videos; interactive resources; companion website; downloadable templates.
- Apply the same rights, accessibility, privacy, security, version, verification, maintenance, preservation, and end-of-life controls as to the book.

### 7.13 [WP-07.13] Multi-author integration `[TYPE] {A/E} [VERIFY]`

- Harmonize voice, terminology, notation, depth, evidence, examples, accessibility, and formatting.
- Remove overlap; close gaps; reconcile contradictions; create volume-level synthesis and navigation.
- Track contributor approvals, unavailable contributors, replacement, and chapter-level rights/corrections.

### 7.14 [WP-07.14] Early-chapter developmental edit `[CORE] {E} [VERIFY]`

- Review the first representative completed chapter before drafting proceeds too far.
- Evaluate promise delivery, exposition, pacing, sequence, conceptual bridges, examples, reader assumptions, style, and accessibility.
- Apply lessons prospectively to templates and remaining chapters.

### 7.15 [WP-07.15] Mid-manuscript integration review `[CORE] {E/R} [VERIFY]`

- Review accumulated structure, scope, consistency, progress against thesis/outcomes, dependency integrity, schedule, risk, and reader fit.
- Rebaseline affected work through change control rather than postponing structural problems until final editing.

### 7.16 [WP-07.16] Draft tracking and chapter acceptance `[CORE] {A} [MAINTAIN]`

- Track status, open questions, missing evidence/citations/artifacts, permissions, tests, accessibility, review readiness, defects, and acceptance evidence by chapter.
- Run the chapter loop until chapter acceptance criteria are met or explicitly deferred.

### Gate 7 — Manuscript and artifact completion `{J}`

**Evidence:** complete manuscript build; claim/source and asset inventories; working applicable artifacts; exercise solutions; chapter acceptance records; permissions status; integration/developmental review; documented omissions and deferments.

**Pass criteria:** planned content is present; claims and artifacts are traceable; chapter criteria are met; supplements operate; known omissions are controlled; manuscript is ready for independent acceptance review.

**Independence:** at least one qualified non-author editor, reviewer, or volume editor participates in verification and approval.

**Failure route:** return to chapter development, research, architecture, artifact production, or scope control.

---

## Phase 8 — Independent verification, peer review, reader testing, revision, and issue closure

### 8.1 [WP-08.01] Author self-review `[CORE] {A} [VERIFY]`

- Structure, thesis, argument, gaps, redundancy, assumptions, boundaries, examples, citations, technical correctness, accessibility source, and reader pathways.

### 8.2 [WP-08.02] Automated and build verification `[CORE] {A} [VERIFY]`

- Spelling, grammar, terminology, notation, links, references, citations, equation compilation, code tests, data/figure regeneration, complete builds, accessibility scans, plagiarism/text reuse, retracted-source checks, and citation-hallucination checks.
- Treat automated results as evidence requiring human interpretation, not as final approval.

### 8.3 [WP-08.03] Independent mathematical verification `[TYPE] {R} [VERIFY]`

- Re-derive central results; use symbolic/numerical checks where helpful; test dimensions, limits, boundary conditions, counterexamples, and proof dependencies.

### 8.4 [WP-08.04] Independent computational verification `[TYPE] {R} [VERIFY]`

- Execute in clean and independent environments; compare outputs/platforms; verify dependencies, benchmarks, figures, tolerances, instructions, and archived release.

### 8.5 [WP-08.05] Independent experimental/statistical verification `[TYPE] {R} [VERIFY]`

- Review protocols, calibration, sampling, statistics, assumptions, provenance, ethics, and reporting.
- Regenerate results and independently replicate when warranted by originality, centrality, risk, and feasibility.

### 8.6 [WP-08.06] Internal cross-functional review `[CORE] {J} [VERIFY]`

- Co-author cross-review; technical editor; pedagogy; accessibility; inclusion/sensitivity; safety/security/privacy; production feasibility; sustainability/societal impact as applicable.

### 8.7 [WP-08.07] External peer review `[CORE] {P/R} [VERIFY]`

- Publisher controls formal selection in acquired publishing; independent review authority controls it in self/institutional publishing.
- Verify expertise, independence, conflicts, confidentiality, and structured criteria.
- Review originality, accuracy, evidence, currency, scope, audience fit, methods, equations, code, data, interpretations, limitations, safety, and reproducibility.

### 8.8 [WP-08.08] Target-reader and accessibility testing `[CORE] {R} [VERIFY]`

- Recruit participants defined in the quality plan: representative novice/intermediate/advanced readers, practitioners, researchers, instructors, disabled readers, or suitable specialist proxies as applicable.
- Test think-aloud comprehension, tasks, exercises, navigation, delayed recall, abandonment, misinterpretation, cognitive load, prerequisites, and accessibility.
- Avoid tokenistic testing; use qualified accessibility specialists and assistive-technology testing when direct recruitment is not feasible.

### 8.9 [WP-08.09] Feedback analysis and reviewer response `[CORE] {A} [IMPLEMENT]`

- Inventory comments; classify severity/root cause/audience; accept, partly accept, or reject with evidence; identify revision location and resolution status.
- Resolve reviewer disagreement through evidence, comparison, additional specialist review, arbitration, and recorded decision.

### 8.10 [WP-08.10] Revision and change-impact control `[CORE] {A} [IMPLEMENT/VERIFY]`

- Reorder, expand, compress, split, merge, delete, clarify, reframe, and correct content.
- Identify affected chapters, claims, citations, figures, exercises, code, data, navigation, index terms, permissions, disclosures, accessibility, metadata, and supplements.
- Regression-test revised and dependent material; detect newly introduced errors; retest reader-facing failures.

### Gate 8 — Technical and reader-fit acceptance `{J}`

**Evidence:** peer-review and reader-test reports; independent verification; reviewer responses; issue-closure report; regression/retest report; residual-risk record.

**Pass criteria:** blockers and critical defects are closed; major defects are closed or explicitly accepted by authorized authority; central results are verified proportionately; reader and accessibility targets are met; reviewer responses are accepted; residual risks are explicit.

**Independence:** approval includes a qualified non-author technical/review authority; publisher involvement applies by route.

**Failure route:** return to manuscript development, research, architecture, tests, or scope; commission additional review when disagreement remains material.

---

## Phase 9 — Final developmental, technical, line and copy editing; compliance closure; content freeze

### 9.1 [WP-09.01] Final developmental pass `[CORE] {E} [IMPLEMENT/VERIFY]`

- Confirm scope, structure, sequence, balance, argument, pacing, promise delivery, audience fit, pedagogy, and navigation after technical review.
- Structural edits require change-impact and regression control.

### 9.2 [WP-09.02] Technical/substantive editing `[CORE] {E/R} [VERIFY]`

- Facts, definitions, equations, proofs, algorithms, code, data, statistics, standards, units, examples, warnings, citations, and limitations.

### 9.3 [WP-09.03] Line and copy editing `[CORE] {E} [IMPLEMENT]`

- Sentence clarity, paragraph coherence, emphasis, concision, rhythm, tone, grammar, spelling, punctuation, capitalization, usage, house style, terminology, notation, captions, references, and code presentation.
- Audit names, dates, acronyms, symbols, units, number formats, hyphenation, headings, and cross-references.

### 9.4 [WP-09.04] Final source-integrity audit `[CORE] {A/R} [VERIFY]`

- Citation existence, relevance, support, location, quotation/paraphrase accuracy, primary-source appropriateness, retraction/correction status, AI-assisted citation risks, and link/archive validity.

### 9.5 [WP-09.05] Permission and licence closure `[CORE] {J} [VERIFY]`

- Confirm rights basis; obtain permissions; verify licences/compatibility; insert credit lines; record restrictions; replace unavailable assets; verify accessibility adaptation and format/territory/language rights.

### 9.6 [WP-09.06] Copyright, privacy, defamation, safety, security, dual-use, and ethics audit `[RISK/JUR] {J} [VERIFY]`

- Copyright ownership/licensing and any strategic/procedural registration; keep separate from legal deposit.
- Identifiable people/organizations, allegations, evidence, reply, consent, anonymization, personal/confidential data, and retention.
- Hazards, unsafe instructions, vulnerabilities, credentials/secrets, malicious use, sensitive detail, warnings, redaction, and residual risk.
- Ethics approvals, participant/animal/cultural protections, conflicts, funding, authorship, and contributor credit.

### 9.7 [WP-09.07] AI compliance audit `[RISK] {J} [VERIFY]`

- Policy/contract/law compliance; human accountability; required disclosure of tool, purpose, extent, or version where required; factual/citation verification; confidentiality; copyright/provenance; bias; generated images; translation; required records and retention.

### 9.8 [WP-09.08] Inclusion, sustainability, and societal-impact audit `[CORE/RISK] {E/R} [VERIFY]`

- Inclusive/respectful language; identity accuracy; representative examples; cultural context; geographic and citation diversity; bias and sensitivity.
- Environmental/sustainability claims and effects; foreseeable social harms, distributional impacts, misuse, and mitigation proportionate to subject.

### 9.9 [WP-09.09] Content-accessibility audit `[CORE] {J/R} [VERIFY]`

- Semantic structure; headings; reading order; accessible mathematics source; tables; alt text; long descriptions; colour/contrast independence; meaningful links; language metadata; page-navigation and accessible-index source.
- Verify against the recorded legal/contractual baseline and best-practice target; do not substitute automated scans for manual assessment.

### 9.10 [WP-09.10] Audit corrections and regression `[CORE] {A} [IMPLEMENT/VERIFY]`

- Correct legal, rights, source, technical, safety, privacy, AI, inclusion, sustainability, and accessibility findings.
- Reopen affected review scopes; perform impact analysis and regression verification.

### 9.11 [WP-09.11] Final author, contributor, and compliance acceptance `[CORE] {J} [APPROVE]`

- Resolve editorial queries; approve changes; obtain co-author/contributor confirmations or documented substitute authority; approve final manuscript and assets.

### Gate 9 — Compliance sign-off and content freeze `{J}`

**Evidence:** edited manuscript; technical/source-integrity reports; closed permissions register; compliance and accessibility-content reports; corrections/regression evidence; author/contributor approvals; residual-risk decisions.

**Pass criteria:** editorial queries are closed; permissions and licences are complete; material compliance findings are corrected; source integrity is acceptable; content accessibility is complete; assets are production-ready.

**Accessibility rule:** applicable obligations must be satisfied. A deviation is acceptable only when supported by a legally or contractually available exemption/exception or other authorized basis, with documentation, compensating controls, approval, and residual risk—not merely because nonconformity was documented.

**Independence:** approval includes qualified non-author editorial/compliance/accessibility authority as applicable.

**Change rule:** substantive post-freeze changes require formal reopening, impact analysis, affected review, regression proof, and renewed approval.

**Failure route:** reopen editing, manuscript, evidence, permissions, or compliance work; repeat affected checks before freezing.

---

## Phase 10 — Production, design, composition, accessibility implementation, indexing, metadata, and proof

### 10.1 [WP-10.01] Production handoff `[CORE] {A→P/V} [IMPLEMENT]`

- Frozen manuscript; style sheets; figures/tables/code/data; permission/credit records; contributor metadata; accessibility and localization instructions; index brief; cover brief; build and archival instructions.
- Validate completeness and checksums/versions at handoff.

### 10.2 [WP-10.02] Interior and cover design `[CORE] {P/V} [IMPLEMENT]`

- Trim, grid, margins, typography, headings, headers/footers, pagination, equations, code, captions, exercises, sidebars, and accessible visual design.
- Cover concept, front/spine/back, title/subtitle, biography, description, endorsements, barcode, contrast/legibility, and tested cover/catalogue copy.

### 10.3 [WP-10.03] Typesetting and composition `[CORE] {V} [IMPLEMENT]`

- Text, equations, chemical structures, code, figures, tables, notes, sidebars, cross-references, and language/script support.
- Control orphans, widows, breaks, floats, splitting, blank pages, font embedding/substitution, and output-specific layout.

### 10.4 [WP-10.04] Front-matter and navigation finalization `[CORE] {V/E} [IMPLEMENT/VERIFY]`

- Generate final table of contents and lists; assign final pagination; verify after every pagination-changing correction.
- Verify links, footnotes, cross-references, page references, and external URLs.

### 10.5 [WP-10.05] Indexing `[CORE] {A/E/V} [IMPLEMENT]`

- Define scope/depth and create concepts, people, methods, algorithms, tools, applications, main/subentries, synonyms, see/see-also references, and verified locators.
- Implement semantic digital index, linked locators, meaningful navigation, screen-reader order, reflow, and back-navigation where supported.

### 10.6 [WP-10.06] Output generation `[CORE] {V} [IMPLEMENT]`

`[SELECT:ONE_OR_MORE]` Generate only selected product forms: print-ready PDF; PDF/X where required; tagged PDF; accessibility-tested PDF; PDF/UA-conforming PDF where applicable; EPUB; web edition; audiobook; interactive edition; print-on-demand files.

### 10.7 [WP-10.07] Accessibility implementation and post-typesetting testing `[CORE] {P/V/R} [IMPLEMENT/VERIFY]`

- Implement headings, reading order, alt text, descriptions, mathematics, tables, languages, page navigation, keyboard operation, contrast, summaries, metadata, and DRM compatibility.
- After composition/conversion, perform automated validation plus manual, screen-reader, keyboard, magnification, reflow, accessible-math, device, and user testing as applicable.
- Re-evaluate whole-publication conformance; source accessibility does not prove final-format accessibility.
- Record evaluator, date, scope, methods, results, known limitations, and accessibility statement.

### 10.8 [WP-10.08] Metadata, identifiers, and cataloguing `[CORE] {P} [IMPLEMENT/VERIFY]`

- Metadata: title/subtitle/edition; contributors/affiliations/ORCID; abstract/description/keywords; BISAC/Thema or other classifications; audience; language; territorial rights; licence; accessibility; price/currency/date.
- Assign separate ISBNs to separately distributed product forms according to applicable ISBN agency rules; maintain landing pages and metadata.
- Assign book/chapter DOI only where ecosystem-relevant and maintainable; assign repository/data/software identifiers as applicable.
- Complete national-library/CIP or equivalent where eligible; ONIX and publisher/distributor catalogues; synchronize records across channels.

### 10.9 [WP-10.09] Proofreading and multi-format proof `[CORE] {E/R} [VERIFY]`

- Detect missing/duplicate text; typos; broken paragraphs/headings; equation/symbol/code/unit/caption/reference corruption; overflow, clipping, alignment, fonts, resolution, colour, bleed, and breaks.
- Proof print, desktop, tablet, mobile, e-reader, browser, screen reader, and physical copy as applicable.

### 10.10 [WP-10.10] Proof corrections and regression `[CORE] {V/E} [IMPLEMENT/VERIFY]`

- Classify errors; limit corrections to authorized scope; implement; review repagination and index; regress all affected formats and navigation.
- Substantive content errors trigger formal reopening under Gate 9 change control.

### 10.11 [WP-10.11] Prepublication technical, editorial, production, metadata, and repository audits `[CORE] {J} [VERIFY]`

- Sample claims/equations; execute code; regenerate data/figures; verify references.
- Verify scope/outcomes/style/navigation; file integrity, fonts, images, profiles, trim/bleed; metadata/identifiers; downloads, repositories, archives, and support channels.

### 10.12 [WP-10.12] Prepublication communication execution `[ROUTE] {J} [IMPLEMENT]`

- Release approved samples, catalogue/website copy, ARCs/review copies, endorsements, conference previews, instructor/library/society outreach, and accessible promotional materials according to the baseline plan.
- Respect embargoes, confidentiality, permissions, evidence, and truthful-claims requirements.

### Gate 10 — Production proof and release-candidate approval `{J}`

**Evidence:** signed proofs; production audit; accessibility evaluation; metadata/identifier report; index approval; repository/download tests; manufacturing files; release archive candidate.

**Pass criteria:** text, layout, cover, index, navigation, metadata, and selected formats validate; applicable accessibility obligations are satisfied or lawfully addressed under Gate 9 rules; no release blocker remains.

**Independence:** at least one qualified non-author proof/production verifier and, where applicable, accessibility evaluator participates.

**Failure route:** correct production or metadata; regenerate and regress affected formats; reopen Gate 9 for substantive errors.

---

## Phase 11 — Manufacturing, publication, distribution, legal deposit, and release

### 11.1 [WP-11.01] Manufacturing and physical quality control `[ROUTE] {P/V} [IMPLEMENT/VERIFY]`

- Paper, binding, colour, images, finish, durability, quantity, POD setup.
- Verify physical proof, trim, bleed, registration, binding strength, opacity, colour consistency, and barcode scanning.

### 11.2 [WP-11.02] Digital publication `[CORE] {P/V} [IMPLEMENT/VERIFY]`

- Upload; validate files/metadata; searchability, navigation, download, device/platform compatibility, accessibility declaration, licence, version, and support links.

### 11.3 [WP-11.03] Distribution and access release `[CORE] {P} [IMPLEMENT]`

- Publisher, retailers, aggregators, library suppliers, wholesalers, institutional/subject/national repositories, direct sales, and platforms as selected.
- For OA: confirm funding, licence display, repository deposit, version identity, machine-readable rights, reuse metadata, and embargo.

### 11.4 [WP-11.04] Commercial mechanics `[ROUTE] {P} [IMPLEMENT]`

- Final price/currency; regional, institutional, and adoption pricing; discounts; print run/inventory; returns; tax; DRM.
- Ensure DRM and technical protection do not block required accessibility features.

### 11.5 [WP-11.05] Legal deposit and cataloguing completion `[JUR] {P} [IMPLEMENT]`

- Determine required copies/files, libraries, deadlines, formats, and responsible party; submit and retain confirmation.
- Treat self-publisher duties explicitly; do not confuse deposit with copyright registration.

### 11.6 [WP-11.06] Release archives `[CORE] {P/M} [IMPLEMENT]`

- Preserve final source, releases, software, data, production files, permissions, metadata, identifiers, conformance reports, and reproducible-build information.

### Gate 11 — Publication release `{P/J}`

**Evidence:** manufacturing approval where applicable; live digital previews; distribution confirmations; legal-deposit status; commercial setup; final release archives.

**Pass criteria:** selected products are saleable/distributable and accessible as required; channel records are correct; deposit is completed or scheduled within applicable deadline; release artifacts are archived; support and correction channels are live.

**Failure route:** suspend affected product/channel; correct manufacturing, platform, metadata, accessibility, distribution, or compliance defect; notify affected parties where already released.

---

## Phase 12 — Launch, adoption, companion resources, rights commercialization, and sustained communication

### 12.1 [WP-12.01] Launch campaign `[ROUTE] {J} [IMPLEMENT]`

- Coordinate release date, press/catalogue activity, author/publisher campaigns, webinars, conferences, societies, institutions, instructors, libraries, interviews, articles, podcasts, and events.
- Ensure promotional claims remain accurate, inclusive, accessible, and supported.

### 12.2 [WP-12.02] Academic and professional adoption `[TYPE] {J} [IMPLEMENT]`

- Inspection copies; course mapping; instructor guides; adoption pricing; faculty/society/professional outreach; accessibility accommodations and support.

### 12.3 [WP-12.03] Companion-resource launch `[TYPE] {A/M} [IMPLEMENT]`

- Publish and test code/data repositories, website, instructor resources, solutions, slides, videos, interactive assets, issue tracker, errata channel, versions, licences, accessibility, and support ownership.

### 12.4 [WP-12.04] Foreign and subsidiary rights `[ROUTE] {P} [IMPLEMENT]`

- Rights catalogue; translation sample; agents; scouts; academic/professional networks; international book and rights fairs; offer register.
- Record territory, language, format, term, advance, royalty, quality/accessibility approval, source-version link, and correction obligations.

### 12.5 [WP-12.05] Sustained promotion and community engagement `[ROUTE] {J} [MAINTAIN]`

- Reviews, interviews, articles, conferences, course adoption, society/library engagement, citation visibility, community support, and ethical piracy response.

### Gate 12 — Launch-completion and ownership transfer review `{J}`

**Evidence:** campaign report; adoption materials; companion-resource health; rights-marketing plan; support/errata visibility; initial reach indicators where collected; continuing ownership map.

**Pass criteria:** intended channels are active; resources are usable; support/correction channels are visible; maintenance, rights, and communication owners are assigned.

**Failure route:** reassign campaign/resource/support ownership; correct inaccessible or unusable materials; revise claims or channels.

---

## Phase 13 — Post-publication maintenance, scholarly record, preservation, and new editions

### 13.1 [WP-13.01] Feedback collection `[CORE] {M} [MAINTAIN]`

- Reader, instructor, reviewer, repository, support, accessibility, security, privacy, safety, legal, and distributor reports.

### 13.2 [WP-13.02] Issue triage and response times `[CORE] {M} [VERIFY]`

- Classify typographical, editorial, technical, scientific, safety-critical, security-critical, accessibility-critical, privacy, legal, and integrity issues.
- Apply severity-based owner, response, containment, verification, notification, and escalation rules.

### 13.3 [WP-13.03] Errata, corrections, and versioning `[CORE] {M/P} [IMPLEMENT]`

- Intake, verification, severity, public errata, corrected digital files, reprint correction, version links, resolution status, and reader/distributor/repository notification.
- Avoid undisclosed substantive silent correction; define which minor corrections may be silent and how internal records are preserved.

### 13.4 [WP-13.04] Serious scholarly-record actions `[RISK] {P/J} [APPROVE]`

- Formal correction, expression of concern, withdrawal, chapter retraction, whole-book retraction, replacement version, persistent linkage, and notification.
- Apply applicable publisher policy, research-integrity guidance, contracts, law, due process, and appeals rather than invoking a generic label without procedure.

### 13.5 [WP-13.05] Artifact, accessibility, security, and platform maintenance `[TYPE] {M} [MAINTAIN]`

- Dependencies, security patches, datasets, repositories, links, builds, platforms, accessibility, metadata, domains, and licences.
- Publish compatibility/deprecation notices and preserve supported releases.

### 13.6 [WP-13.06] Reader and instructor support `[TYPE] {M} [MAINTAIN]`

- Questions, clarifications, teaching/exercise guidance, community forum, updated examples, accommodations, and support boundaries.

### 13.7 [WP-13.07] Impact and outcome monitoring `[OPT] {J} [MAINTAIN]`

- Sales, downloads, citations, adoption, repository/website use, completion, learning outcomes, practical use, accessibility feedback, and unintended impact.
- Collect only data justified by purpose, privacy, consent, and proportionality.

### 13.8 [WP-13.08] Rights and sustained communication `[ROUTE] {P/J} [MAINTAIN]`

- Translation, audio, adaptation, courseware, reprint licences, rights reversion, reviews, events, adoption, and piracy response.

### 13.9 [WP-13.09] Edition planning and delta restart `[CORE] {J} [PLAN]`

- Choose correction release, revised printing, minor/major edition, translation, adaptation, abridgment, or digital update.
- Research field developments, standards, evidence, technology, obsolete content, feedback, competitor change, sustainability, and societal effects.
- Restart at Phase 1 with a documented delta scope while preserving prior-edition records and links.

### 13.10 [WP-13.10] Long-term preservation, succession, and end-of-life `[CORE] {M} [PLAN/MAINTAIN]`

- Stable formats; mirrors; website/source/version history; format migration; identifiers; repository, credential, and domain transfer.
- Maintainer succession; software/data retirement; unsupported-artifact withdrawal; obsolete-edition notice; archival release.

### 13.11 [WP-13.11] Project retrospective `[CORE] {J} [VERIFY]`

- Outcomes, process, reader evidence, quality failures, successes, budget, schedule, risks, over-specification, missing controls, reusable assets, and recommendations.
- Feed results into the framework change log and next-edition tailoring.

### Gate 13 — Lifecycle health and retrospective review `{P/M/J}`

**Evidence:** issue/correction history; artifact and accessibility health; optional impact data or N/A record; preservation/succession status; retrospective and framework-change proposals.

**Pass criteria:** critical reports are resolved or contained; maintained artifacts have owners; correction and notification procedures work; preservation/succession are viable; lessons are captured.

**Failure route:** emergency maintenance; responsibility transfer; unsupported-artifact withdrawal; formal scholarly-record action; end-of-life procedure.

---

## Phase 14 — Conditional overlays and route modules

Overlays contain **only additive or modifying requirements**. They point to the main lifecycle instead of duplicating it. Select provisionally at Gate 1, confirm route modules at Gate 2, baseline at Gate 3, and reassess under change control.

### 14.1 [WP-14.01] Textbook overlay `[TYPE] {A}`

- Add curriculum/semester/module mapping and course-level outcomes → `5.4`.
- Add prerequisite diagnostics, misconception inventory, cognitive-load review, assessment blueprint → `5.4`.
- Add exercise portfolio, solutions, test bank, rubrics, instructor guide, slides → `7.8`, `7.12`.
- Add classroom pilots, student comprehension and adoption testing → `6.5`, `8.8`, `12.2`.
- Add accommodations and instructor support → `10.7`, `13.6`.

### 14.2 [WP-14.02] Research-monograph overlay `[TYPE] {A}`

- Add original-contribution and method-justification statement → `1.1`, `4.1`.
- Add reporting guideline, ethics/preregistration, data/code availability, uncertainty, negative results → `4.5–4.7`.
- Add proportionate replication of central original results and competing-interpretation analysis → `8.3–8.7`.
- Tailor pedagogy to reader need; do not require textbook apparatus without purpose → `5.4`.

### 14.3 [WP-14.03] Professional technical-book overlay `[TYPE] {A}`

- Add task/workflow analysis, supported-platform/version matrix, installation and migration testing → `1.3`, `7.4–7.5`.
- Add operational examples, troubleshooting, failure recovery, security/safety, deprecation and update schedule → `7.7`, `4.9`, `13.5`.
- Add early practitioner testing and maintenance SLAs proportionate to product claims → `6.5`, `8.8`, `13.2`.

### 14.4 [WP-14.04] Reference-work/handbook overlay `[TYPE] {A}`

- Add entry template, taxonomy/alphabetization, coverage matrix, terminology authority → `5.1–5.6`.
- Add cross-entry consistency, searchability, index depth, entry authorship and correction policy → `7.13`, `10.5`, `13.3`.

### 14.5 [WP-14.05] Edited/contributed-volume overlay `[TYPE] {A}`

- Add contributor recruitment/specification/contract/delivery/replacement → `2.4`, `3.2`.
- Add chapter-level review, permissions, corrections/retractions, and volume synthesis → `7.13`, `8.7`, `9.5`, `13.4`.
- Add cross-chapter terminology, notation, redundancy, accessibility, and contributor approval → `7.13`, `9.11`.

### 14.6 [WP-14.06] Popular-science overlay `[TYPE] {A}`

- Add general-audience research, narrative/character structure, jargon reduction, analogy validation, uncertainty communication, and sensationalism review → `1.3`, `5.1–5.4`, `8.6`.
- Add broad-audience testing, fact checking, sensitivity/inclusion and societal-impact review → `6.5`, `8.8`, `9.4`, `9.8`.
- Reduce formal apparatus only where accuracy and evidence remain intact.

### 14.7 [WP-14.07] Open-access overlay `[ROUTE] {P}`

- Add funding/BPC/no-fee model, funder/institutional compliance, licence selection and third-party compatibility → `1.9`, `2.3`, `4.12`.
- Add repository deposit, machine-readable rights/reuse metadata, version identification, and long-term hosting → `11.3`, `13.10`.

### 14.8 [WP-14.08] Self-publishing overlay `[ROUTE] {A/P}`

- Apply the project-authorization branch and independent-acceptance plan → `2.2`, `3.2`.
- Add imprint/business/tax/publisher-of-record duties; professional editing/review; ISBN/metadata/cataloguing/deposit; printer/distributor/pricing/returns/direct sales; support/rights/preservation → `2–13` as applicable.
- Require non-author verification at Gates 6–10; author-as-publisher does not equal independence.

### 14.9 [WP-14.09] Translation/localization overlay `[TYPE/ROUTE] {J}`

- Add translation rights, translator selection, terminology database/brief, source freeze, and version linkage → `2.3`, `4.12`, `5.7`.
- Add equation/code verification, figure/unit/legal adaptation, subject-expert and native-language editing, localized index/metadata/accessibility → `8`, `9`, `10`.
- Propagate source-edition errata and maintain translation versions → `13.3`, `13.9`.

### 14.10 [WP-14.10] Audiobook overlay `[TYPE] {J}`

- Add narration/voice strategy, pronunciation guide, equation/code rendering, figure/table descriptions, chapter navigation, synchronized text where applicable, accessibility metadata, and audio QC → `5.7`, `7.11`, `10.6–10.9`.
- Add correction/version linkage and long-term audio preservation → `13.3`, `13.10`.

### 14.11 [WP-14.11] Interactive-edition overlay `[TYPE] {J}`

- Add interaction design, keyboard and screen-reader alternatives, privacy/security, supported browsers/devices, offline behavior, analytics policy, graceful degradation, and accessibility testing → `4.9–4.11`, `5.7`, `10.7`.
- Add application security, dependency/platform maintenance, data retention, and retirement → `13.5`, `13.10`.

### 14.12 [WP-14.12] AI-assisted-process overlay `[RISK] {J}`

- Apply policy-specific permission/disclosure, human accountability, confidentiality, prompt/output retention where required, factual/citation verification, copyright/provenance, bias, image and translation controls → `4.11`, `7.10`, `9.7`.
- AI use is process-conditional, not a book genre.

---

## Phase 15 — Required operational outputs, generated views, and demonstrated use

### 15.1 [WP-15.01] Master requirements catalogue `[CORE] {J} [MAINTAIN]`

- Atomic IDs, node semantics, applicability, roles, inputs/outputs, verification, criteria, evidence, gate, status, risks, normative references, maintenance, and history.

### 15.2 [WP-15.02] Project dashboard `[CORE] {J} [MAINTAIN]`

- Current phase/loop; milestone and gate readiness; blockers/critical issues; risks; budget; schedule; scope; evidence/permission/accessibility status; maintenance alerts.

### 15.3 [WP-15.03] Role-specific views `[CORE] {J} [MAINTAIN]`

- Author; contributor; publisher; editor; independent reviewer; accessibility/safety/security/legal specialist; production vendor; marketer/distributor; maintainer/successor.

### 15.4 [WP-15.04] Tailored project views `[CORE] {J} [MAINTAIN]`

- Book type; content type; route; jurisdiction; risk; product form; current phase; accessibility; data/software; rights; maintenance.
- Views are generated by filtering the master catalogue and may not be manually forked into independent requirements lists.

### 15.5 [WP-15.05] Gate packages `[CORE] {J} [MAINTAIN]`

- Applicable evidence; N/A/defer/waiver decisions; criteria results; verifier/approver; failed criteria; rework; retest; arbitration; residual risks; decision and expiry.

### 15.6 [WP-15.06] Author and contributor guide `[CORE] {E} [MAINTAIN]`

- Readable process overview; writing, technical, style, accessibility, rights, review, submission, revision, disclosure, and maintenance instructions linked to requirement IDs.

### 15.7 [WP-15.07] Framework version and change log `[CORE] {J} [MAINTAIN]`

- Framework edition/version; issue date; owner; approved changes; rationale; affected IDs; migrations; retired requirements; next review; evidence from actual projects.

### 15.8 [WP-15.08] Required worked requirement record `[CORE] {J} [VERIFY]`

Maintain at least one filled example demonstrating the schema. Minimum example:

- **ID:** `REQ-07.05.01`.
- **Requirement:** Every published runnable code example executes in the declared clean reference environment and produces output within declared tolerances.
- **Applicability:** code-bearing book.
- **Accountable/executor/verifier/approver:** lead author / chapter author / independent technical reviewer / technical editor.
- **Evidence:** locked environment, test log, expected-output comparison, release tag.
- **Gate:** Gate 8.
- **Failure:** critical for central examples; correct, rerun, and regress dependent figures/text.
- **Maintenance:** software maintainer rechecks on supported dependency updates.

### 15.9 [WP-15.09] Required worked gate package `[CORE] {J} [VERIFY]`

Maintain at least one completed gate example containing applicable evidence, N/A decisions, measured criteria, failed items, rework, retest, approvals, and residual risk. The prototype gate is the recommended first example.

### 15.10 [WP-15.10] Required tailoring demonstration `[CORE] {J} [VERIFY]`

Before full execution, generate and review at least one project-specific tailored view. Example profile:

- single-author, approximately 200-page professional monograph;
- acquired or self-published route explicitly selected;
- no original human/animal research, no audiobook, no interactive edition;
- code-bearing and EPUB/PDF outputs;
- independent technical review, copyedit, accessibility evaluation, and release proof retained;
- textbook-only apparatus, empirical-study controls, and unrelated overlays marked N/A with rationale rather than deleted.

### Operational-readiness and framework-demonstration review `{J}`

This review is first completed with the project baseline at Gate 3 and repeated whenever tailoring or the framework changes materially; it is not a late lifecycle gate.

**Evidence:** master catalogue; dashboard; tailored view; worked requirement record; worked gate package; author/contributor guide; framework version/change log.

**Pass criteria:** the framework can be executed, filtered, audited, and maintained; the project has demonstrated—not merely declared—its tailoring and gate machinery.

**Failure route:** repair schema, IDs, filters, ownership, evidence, or examples before relying on generated operational views.

---

## Final operating rule

The process is complete only when its requirements are applied proportionately to a real project. Completeness of the catalogue does not justify bureaucratic work without value; tailoring does not justify silently deleting necessary controls. Every inclusion, exclusion, deferment, waiver, verification, and approval must remain traceable to the book’s readers, claims, risks, route, jurisdictions, product forms, and long-term scholarly or technical record.
