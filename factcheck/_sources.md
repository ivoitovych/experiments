# Reliable source registry

Deduped reliable sources cited across the `factcheck/` files. This is the
running bibliography that emerges from verification work; it cross-checks
Appendix D's suggested reading. Grouped by type, then cited from the
section files via short keys.

> Maintenance: when a `factcheck/` entry cites a source, add it here if new.
> The self factcheck run should confirm these links still resolve.

## Peer-reviewed papers / preprints

- **Gidney–Ekerå 2019** — "How to factor 2048 bit RSA integers in 8 hours…",
  *Quantum* (2021), arXiv:1905.09749. — https://arxiv.org/abs/1905.09749
- **Gidney 2025** — "How to factor 2048 bit RSA integers with less than a
  million noisy qubits", arXiv:2505.15917 (May 2025). — https://arxiv.org/abs/2505.15917
- **Acharya et al. 2024 (Willow)** — "Quantum error correction below the
  surface code threshold", *Nature* (2024), DOI 10.1038/s41586-024-08449-y.
- **Bravyi et al. 2024 (Gross code)** — bivariate-bicycle [[144,12,12]] qLDPC
  code, *Nature* (2024).
- **Bluvstein et al. 2023** — 48 logical qubits / transversal gates, *Nature*
  (2023), DOI 10.1038/s41586-023-06927-3.
- **Madsen et al. 2022 (Borealis)** — Gaussian boson sampling advantage,
  *Nature* (2022).
- **QuEra Aquila** — arXiv:2306.11727.
- **Liu et al. 2023 (TF-QKD 1002 km)** — *Phys. Rev. Lett.* (2023),
  arXiv:2303.15795.
- **Yin et al. 2017** — satellite-based entanglement distribution, *Science*
  (2017). Companion: *Science* 356, 1140 (2017).
- **Cao–Romero–Aspuru-Guzik 2019** — chemistry-VQE review.
- **Tang STOC 2019** — dequantization of recommendation-system / HHL-style ML.
- **McClean et al. 2018; Cerezo et al. 2021** — barren-plateau literature.

## Standards bodies

- **NIST FIPS 203 / 204 / 205** — finalized 2024-08-13 (ML-KEM / ML-DSA /
  SLH-DSA). Press: "First 3 Finalized Post-Quantum Encryption Standards".
- **NIST FIPS 206** — FN-DSA (Falcon); IPD submitted Aug 2025; final expected
  late 2026 / early 2027.
- **NIST FIPS 207 + IR 8545** — HQC 4th-round KEM selection (2025-03-11).

## Vendor / primary sources

- **IBM Quantum** — Newsroom, blog, docs, roadmap (Heron, Condor, qLDPC). — https://www.ibm.com/quantum
- **Quantinuum** — H-Series blog and benchmark publications (H2 = 56 qubits).
- **IonQ** — product pages (Forte / Forte Enterprise / Tempo, #AQ metric).
- **QuEra / Pasqal / Atom Computing / Infleqtion** — neutral-atom press + roadmaps.
- **PsiQuantum / Intel / Xanadu** — photonic and silicon-spin press.
- **Microsoft Azure Quantum** — Majorana 1 blog (2025-02-19).
- **Qiskit docs** — `quantum.cloud.ibm.com` (QFT deprecation, QFTGate).
- **TKET / pytket** — `docs.quantinuum.com/tket`.
- **Cirq** — `quantumai.google/cirq`. **PennyLane** — `pennylane.ai`.

## Secondary / trade coverage (corroborating only)

- The Quantum Insider; HPCwire; IEEE Spectrum; Physics World; APS Physics;
  postquantum.com; DigiCert. Used to corroborate primary sources, not as the
  sole basis for a claim.
