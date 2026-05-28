# Fact-check ledger

A traceable record of the dated, source-backed verification of perishable
2025–2026 claims in the manuscript. Each entry lists the claim, the location
in the manuscript, the source consulted, the verification date, and the
verdict (confirmed / updated / contested / open).

The ledger is the long-running companion to Appendix F's "perishable
snapshot" framing: replace the snapshot wholesale on each revision, and
update the corresponding rows here.

## Pass 1 — 2026-05-28 (Appendix F hardware snapshot)

| Claim | Manuscript | Source | Verified | Verdict |
|---|---|---|---|---|
| IBM Heron r1 = 133 qubits, Dec 2023; Heron r2 = 156 qubits | F.2 | IBM Newsroom, Wikipedia (IBM Heron), IBM Quantum docs | 2026-05 | Confirmed |
| Heron two-qubit error rate in the low 10⁻³ range (median ~3×10⁻³, best ~1×10⁻³) | F.2 | IBM Quantum docs, postquantum.com Heron r2 brief | 2026-05 | Confirmed |
| IBM Condor = 1,121 qubits, 2023, fabrication-scale demo | F.2 | IBM Quantum blog, IBM roadmap 2025 | 2026-05 | Confirmed |
| IBM qLDPC ("bivariate-bicycle / gross") code roadmap | F.2, F.7 | Bravyi et al. (2024) Nature paper on the Gross code [[144,12,12]]; IBM roadmap (Kookaburra 2026, Starling 2028) | 2026-05 | Confirmed |
| Google Willow ~105 qubits; below-threshold; distances 3 → 5 → 7; Dec 2024 | F.2, F.7 | Acharya et al., "Quantum error correction below the surface code threshold", *Nature* (2024), DOI 10.1038/s41586-024-08449-y | 2026-05 | Confirmed |
| Quantinuum H2: 56 qubits, all-to-all, ~99.9% median 2Q fidelity (best >99.91%) | F.3 | Quantinuum blog ("H-Series hits 56 physical qubits"); Quantinuum benchmark publication | 2026-05 | **Updated** (was "~50" / "99.8–99.9%") |
| IonQ Forte = #AQ 29; Forte Enterprise #AQ 35; Tempo #AQ 64 announced | F.3 | IonQ product pages; The Quantum Insider | 2026-05 | **Updated** (added Tempo and Forte Enterprise targets) |
| QuEra Aquila = 256-atom Rydberg system, primarily analog | F.4 | QuEra Aquila paper (arXiv:2306.11727); QuEra press | 2026-05 | Confirmed |
| Harvard / QuEra / MIT 48 logical qubits, transversal, Dec 2023 | F.4, F.7 | Bluvstein et al., *Nature* (2023), DOI 10.1038/s41586-023-06927-3 | 2026-05 | Confirmed (added precise date and citation) |
| Atom Computing 1,180-qubit array, 1,225-site (35×35), 2023 | F.4 | Atom Computing press; HPCwire | 2026-05 | Confirmed |
| Pasqal / Infleqtion at hundreds-to-thousands of atoms; Pasqal targets ~1,000 qubits end-2025, 250-qubit advantage demo 2026 | F.4 | Pasqal 2025 roadmap | 2026-05 | **Updated** (was "hundreds-of-atom") |
| Xanadu Borealis (2022) Gaussian boson sampling advantage | F.5 | Madsen et al., *Nature* (2022); Physics World coverage | 2026-05 | Confirmed |
| PsiQuantum: fusion-based silicon-photonics fabrication at scale (GlobalFoundries Fab 8); ~1M-qubit goal | F.5 | PsiQuantum press; IEEE Spectrum | 2026-05 | Confirmed |
| Intel Tunnel Falls = 12-qubit silicon spin (2023) | F.5 | Intel Newsroom; HPCwire | 2026-05 | Confirmed |
| Microsoft "Majorana 1" announced Feb 2025; claim contested in literature | F.5 | Microsoft Azure Quantum blog (2025-02-19); Nature paper; APS Physics commentary; UNSW / St Andrews preprints (2025) | 2026-05 | Confirmed (incl. contested status) |
| Microsoft × Quantinuum: 4 logical qubits on H2 with logical < physical error rate (2024) | F.7 | Quantinuum / Microsoft press; Quantinuum H2 page | 2026-05 | Confirmed (added explicit mention) |

## Process

For each row above, the procedure was:

1. Locate the exact claim in the manuscript.
2. Search the web for current vendor / preprint / journal sources (`make book`
   is verifiable against any update without rebuilding the manuscript here).
3. Compare; if the manuscript was outdated, update the manuscript wording
   conservatively, citing the source in this ledger.
4. If a claim is contested, prefer the manuscript's framing of "claim under
   scrutiny" over a confident assertion.

## Pass 2 — 2026-05-28 (§15.3 RSA-2048 resource figures)

| Claim | Manuscript | Source | Verified | Verdict |
|---|---|---|---|---|
| Gidney–Ekerå (2019): ~20M physical qubits, ~8 hours at p=10⁻³ | §15.3 | Gidney & Ekerå, *Quantum* (2021), arXiv:1905.09749 | 2026-05 | Confirmed (now cited explicitly) |
| Gidney (2025): under 1M physical qubits, under 1 week, same noise; key innovations approximate residue arithmetic, yoked surface codes, smaller magic-state-distillation budget | §15.3 | arXiv:2505.15917 (May 2025); Google Research publication | 2026-05 | **Added** — supersedes the prior unsourced "~10M / ~10h / ~7×10⁹ Toffoli" intermediate numbers |
| RSA-2048 logical-qubit count: order of a few thousand | §15.3 | Both Gidney papers; consistent with `2d²` surface-code overhead at d in the high twenties | 2026-05 | Confirmed (matches the earlier internal-consistency fix in commit `2e046d0`) |

## Open items for the next pass

- §27 cryptography: detailed PQC timeline beyond the ML-KEM/ML-DSA fix in
  §15.2.
- §8.12 native gate sets (current IBM, Google, IonQ, Quantinuum, neutral
  atom, photonic).
- §15.8 VQE shot-budget claims; §15.10 QML state-of-field.
- §33 satellite-QKD (Micius and follow-ons).
- Appendix D suggested reading: URL/version freshness for SDKs and live docs.

Each next pass appends a new dated section above this one.
