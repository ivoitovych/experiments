# Factcheck — Appendix F: Hardware Snapshot 2026

Mirrors `book/99-back-matter/appendix-f-hardware-snapshot-2026.md`.
Seeded from ledger Pass 1 (2026-05-28). This is the canonical *perishable
snapshot* — every claim here is expected to be re-verified each revision.

## F.2 — IBM Heron qubit counts

- **Claim** (anchor): "Heron family (roughly 133–156 physical qubits per chip)"
- **Method**: external
- **Source**: IBM Newsroom; IBM Quantum docs; Wikipedia (IBM Heron) — https://www.ibm.com/quantum
- **Verified**: 2026-05 · **Verdict**: confirmed
- **Comment**: Heron r1 = 133 qubits (Dec 2023); r2 = 156 qubits.

## F.2 — Heron two-qubit error rate

- **Claim** (anchor): low 10⁻³ range (median ~3×10⁻³, best ~1×10⁻³)
- **Method**: external
- **Source**: IBM Quantum docs; postquantum.com Heron r2 brief
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.2 — IBM Condor

- **Claim** (anchor): 1,121 qubits, 2023, fabrication-scale demo
- **Method**: external
- **Source**: IBM Quantum blog; IBM roadmap 2025
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.2 / F.7 — IBM qLDPC ("bivariate-bicycle / gross") code roadmap

- **Claim** (anchor): the Gross code and the Kookaburra (2026) / Starling (2028) roadmap
- **Method**: external
- **Source**: Bravyi et al. (2024), *Nature*, the Gross code [[144,12,12]]; IBM roadmap
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.2 / F.7 — Google Willow

- **Claim** (anchor): "Willow processor in late 2024: logical error rate fell as the surface-code" distance grew 3 → 5 → 7 (below threshold), ~105 qubits, Dec 2024
- **Method**: external
- **Source**: Acharya et al., "Quantum error correction below the surface code threshold", *Nature* (2024), DOI 10.1038/s41586-024-08449-y
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.3 — Quantinuum H2

- **Claim** (anchor): 56 qubits, all-to-all, ~99.9% median 2Q fidelity (best >99.91%)
- **Method**: external
- **Source**: Quantinuum blog ("H-Series hits 56 physical qubits"); Quantinuum benchmark publication
- **Verified**: 2026-05 · **Verdict**: **updated** (was "~50" / "99.8–99.9%")

## F.3 — IonQ Forte / Forte Enterprise / Tempo

- **Claim** (anchor): Forte = #AQ 29; Forte Enterprise #AQ 35; Tempo #AQ 64 announced
- **Method**: external
- **Source**: IonQ product pages; The Quantum Insider
- **Verified**: 2026-05 · **Verdict**: **updated** (added Tempo and Forte Enterprise targets)

## F.4 — QuEra Aquila

- **Claim** (anchor): 256-atom Rydberg system, primarily analog
- **Method**: external
- **Source**: QuEra Aquila paper (arXiv:2306.11727); QuEra press
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.4 / F.7 — Harvard / QuEra / MIT 48 logical qubits

- **Claim** (anchor): 48 logical qubits, transversal, Dec 2023
- **Method**: external
- **Source**: Bluvstein et al., *Nature* (2023), DOI 10.1038/s41586-023-06927-3
- **Verified**: 2026-05 · **Verdict**: confirmed (added precise date and citation)

## F.4 — Atom Computing array

- **Claim** (anchor): 1,180-qubit array, 1,225-site (35×35), 2023
- **Method**: external
- **Source**: Atom Computing press; HPCwire
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.4 — Pasqal / Infleqtion neutral-atom scale

- **Claim** (anchor): Pasqal targets ~1,000 qubits end-2025, 250-qubit advantage demo 2026
- **Method**: external
- **Source**: Pasqal 2025 roadmap
- **Verified**: 2026-05 · **Verdict**: **updated** (was "hundreds-of-atom")

## F.5 — Xanadu Borealis

- **Claim** (anchor): Borealis (2022) Gaussian boson sampling advantage
- **Method**: external
- **Source**: Madsen et al., *Nature* (2022); Physics World coverage
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.5 — PsiQuantum

- **Claim** (anchor): fusion-based silicon-photonics fabrication at scale (GlobalFoundries Fab 8); ~1M-qubit goal
- **Method**: external
- **Source**: PsiQuantum press; IEEE Spectrum
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.5 — Intel Tunnel Falls

- **Claim** (anchor): 12-qubit silicon spin (2023)
- **Method**: external
- **Source**: Intel Newsroom; HPCwire
- **Verified**: 2026-05 · **Verdict**: confirmed

## F.5 — Microsoft "Majorana 1"

- **Claim** (anchor): announced Feb 2025; claim contested in the literature
- **Method**: external
- **Source**: Microsoft Azure Quantum blog (2025-02-19); *Nature* paper; APS Physics commentary; UNSW / St Andrews preprints (2025)
- **Verified**: 2026-05 · **Verdict**: confirmed (incl. contested status)

## F.7 — Microsoft × Quantinuum logical qubits

- **Claim** (anchor): 4 logical qubits on H2 with logical < physical error rate (2024)
- **Method**: external
- **Source**: Quantinuum / Microsoft press; Quantinuum H2 page
- **Verified**: 2026-05 · **Verdict**: confirmed (added explicit mention)

## References (external)

Sources cited by this file's cards, kept here so the file stays
self-contained (project policy: no central registry).

- **Acharya et al. 2024 (Willow)** — *Nature* (2024), DOI 10.1038/s41586-024-08449-y.
- **Bluvstein et al. 2023** — 48 logical qubits / transversal gates, *Nature* (2023), DOI 10.1038/s41586-023-06927-3.
- **Bravyi et al. 2024 ("gross" code)** — [[144,12,12]] qLDPC, *Nature* (2024).
- **Madsen et al. 2022 (Borealis)** — Gaussian boson sampling advantage, *Nature* (2022).
- **QuEra Aquila** — arXiv:2306.11727.
- **Vendor primary pages** — IBM Quantum newsroom/roadmap; Quantinuum H-Series publications; IonQ product pages (#AQ metric); QuEra/Pasqal/Atom Computing/Infleqtion press; PsiQuantum/Intel/Xanadu press. Dated claims in this file name their source inline.
