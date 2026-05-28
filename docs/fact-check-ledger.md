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

## Pass 3 — 2026-05-28 (Ch 27 PQC timeline)

| Claim | Manuscript | Source | Verified | Verdict |
|---|---|---|---|---|
| FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA) finalised August 2024 | §27.5 | NIST press release "First 3 Finalized Post-Quantum Encryption Standards" (2024-08-13); FIPS 203/204/205 final | 2026-05 | Confirmed |
| ML-KEM-768 sizes: pk = 1184 B, ct = 1088 B, ss = 32 B | §27.4 | FIPS 203 final; vendor implementation references | 2026-05 | Confirmed |
| HQC selected by NIST as a 4th-round KEM (cryptographic diversity); FIPS 207 forthcoming | §27.5 | NIST press release 2025-03-11; NIST IR 8545; FIPS 207 presentation | 2026-05 | **Updated** — date pinned to March 2025 and forthcoming standard correctly named FIPS 207 (was "2024–2025" / "finalised as FIPS draft") |
| Falcon → FN-DSA / FIPS 206: IPD submitted August 2025; final expected late 2026 / early 2027 | §27.4, §27.5 | NIST FIPS 206 status update (Aug 2025); DigiCert / data-centre coverage | 2026-05 | **Updated** — status sharpened to "IPD submitted Aug 2025" |
| RSA-2048 resource bounds — Gidney–Ekerå 2019 (~20M qubits, ~8h) and Gidney 2025 (<1M, <1 week) | §27.2 | Same sources as Pass 2 §15.3 | 2026-05 | **Updated** — replaces the prior "~$10^7$ physical qubits / 10 hours" which now disagreed with the updated §15.3 |

## Pass 4 — 2026-05-28 (§33 satellite-QKD and twin-field QKD)

| Claim | Manuscript | Source | Verified | Verdict |
|---|---|---|---|---|
| Micius launched 2016, operational since 2017; decoy-state BB84 to Xinglong / Nanshan / Graz; Beijing–Vienna QKD-secured videoconference over ~7600 km (Sept 29, 2017) | §33.4 | EurekAlert/CAS press release on the Bai–Zeilinger videoconference; *Wikipedia: Quantum Experiments at Space Scale*; *Science* 356, 1140 (2017) | 2026-05 | Confirmed |
| Micius distributed Bell-pair entanglement between two ground stations separated by ~1200 km | §33.4 | Yin et al., *Science* (2017) — satellite-based entanglement distribution | 2026-05 | Confirmed |
| Twin-field QKD has reached more than 1000 km of fibre | §33.4 | Liu et al., "Experimental Twin-Field QKD Over 1000 km Fiber Distance", *Phys. Rev. Lett.* (2023), arXiv:2303.15795 (1,002 km record) | 2026-05 | Confirmed |
| Listed TF-QKD demonstration distances (511 / 605 / 658 / 830 / >1000 km) | §33.4 | Series of TF-QKD experiments by USTC and Toshiba-Cambridge groups, 2019–2023 | 2026-05 | Confirmed |
| 2024–2026 satellite-QKD missions: SpeQtre / SpeQtral-1 (SG), QEYSSat (CA), EAGLE-1 (ESA/EU), QUBE-II, CAPSat | §33.4 | National space-agency / mission pages; *The Quantum Insider* coverage | 2026-05 | Confirmed (general statement; individual mission launch dates remain in flux) |

## Pass 5 — 2026-05-28 (§8.12 native gate sets)

| Claim | Manuscript | Source | Verified | Verdict |
|---|---|---|---|---|
| IBM Heron native 2-qubit gate is CZ via tunable couplers (vs cross-resonance CNOT on earlier fixed-coupling IBM devices) | §8.12 | IBM Quantum Developer Conf 2024; postquantum.com Heron r2 brief | 2026-05 | **Updated** — was "CNOT (IBM)", which is true only for older Eagle-class / fixed-coupling devices |
| Google superconducting native 2-qubit: CZ (Willow-class) / iSWAP-family (Sycamore-class) | §8.12 | Acharya et al. *Nature* (2024) Willow paper; Google QAI prior work | 2026-05 | Confirmed (clarified the device-class split) |
| Trapped ions (IonQ, Quantinuum): single-qubit rotations + Mølmer–Sørensen XX(θ); typically all-to-all | §8.12 | IonQ docs; Quantinuum H-series docs | 2026-05 | Confirmed |
| Neutral atoms (QuEra, Pasqal): global single-qubit + Rydberg CZ / multi-qubit blockade | §8.12 | QuEra Aquila paper; Pasqal docs | 2026-05 | Confirmed |
| Photonic / MBQC: state preparation, beam-splitter/phase shifters, adaptive measurements; gate model from fusion / cluster-state pattern | §8.12 | Generic platform-physics description | 2026-05 | Confirmed |

## Open items for the next pass
- §15.8 VQE shot-budget claims; §15.10 QML state-of-field.
- Appendix D suggested reading: URL/version freshness for SDKs and live docs.
- Byte-level confirmation of ML-DSA-65 / SLH-DSA-SHA2-128s key & signature
  sizes (only ML-KEM-768 was verified at byte granularity in this pass).
- §1.6, §2.6, §3.x current hardware references — alignment with Appendix F.
- §8.12 native gate sets (current IBM, Google, IonQ, Quantinuum, neutral
  atom, photonic).
- §15.8 VQE shot-budget claims; §15.10 QML state-of-field.
- §33 satellite-QKD (Micius and follow-ons).
- Appendix D suggested reading: URL/version freshness for SDKs and live docs.

Each next pass appends a new dated section above this one.
