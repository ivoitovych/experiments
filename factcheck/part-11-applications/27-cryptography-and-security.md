# Factcheck — §27 Cryptography and Security

Mirrors `book/part-11-applications/27-cryptography-and-security.md`.
Seeded from ledger Pass 3 and Pass 6 (2026-05-28).

## §27.4 — ML-KEM-768 sizes

- **Claim** (anchor): "public key 1184 B, ciphertext 1088 B, shared secret 32 B"
- **Method**: external
- **Source**: FIPS 203 final; vendor implementation references
- **Verified**: 2026-05 · **Verdict**: confirmed

## §27.4 — ML-DSA-65 sizes

- **Claim** (anchor): "public key 1952 B, signature 3309 B"
- **Method**: external
- **Source**: FIPS 204 final standard; implementation refs
- **Verified**: 2026-05 · **Verdict**: **updated** — was 3293 B (likely a pre-final-draft value)

## §27.4 — SLH-DSA-SHA2-128s sizes

- **Claim** (anchor): "public key 32 B, signature 7856 B"
- **Method**: external
- **Source**: FIPS 205 final standard; multiple implementation refs
- **Verified**: 2026-05 · **Verdict**: confirmed (already correct)

## §27.4 — Falcon → FN-DSA / FIPS 206

- **Claim** (anchor): "renamed FN-DSA in NIST's draft, FIPS 206 IPD submitted August 2025"
- **Method**: external
- **Source**: NIST FIPS 206 status update (Aug 2025); DigiCert / data-center coverage
- **Verified**: 2026-05 · **Verdict**: **updated** — status sharpened to "IPD submitted Aug 2025"

## §27.5 — FIPS 203/204/205 finalization

- **Claim** (anchor): "August 2024: FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA) finalized"
- **Method**: external
- **Source**: NIST press release "First 3 Finalized Post-Quantum Encryption Standards" (2024-08-13); FIPS 203/204/205 final
- **Verified**: 2026-05 · **Verdict**: confirmed

## §27.5 — HQC fourth-round KEM

- **Claim** (anchor): HQC selected by NIST as a 4th-round KEM (cryptographic diversity); FIPS 207 forthcoming
- **Method**: external
- **Source**: NIST press release 2025-03-11; NIST IR 8545; FIPS 207 presentation
- **Verified**: 2026-05 · **Verdict**: **updated** — date pinned to March 2025; forthcoming standard correctly named FIPS 207 (was "2024–2025" / "finalized as FIPS draft")

## §27.2 — RSA-2048 resource bounds

- **Claim** (anchor): Gidney–Ekerå 2019 (~20M qubits, ~8h) and Gidney 2025 (<1M, <1 week)
- **Method**: external
- **Source**: same as §15.3 (arXiv:1905.09749; arXiv:2505.15917)
- **Verified**: 2026-05 · **Verdict**: **updated** — replaces the prior "~$10^7$ physical qubits / 10 hours" which disagreed with the updated §15.3
- **Comment**: cross-section consistency — keep aligned with `factcheck/part-06-algorithms/15-landmark-quantum-algorithms.md`.

## References (external)

This file's cards cite the sources listed in the chapter's final
[References section](../../book/part-11-applications/27-cryptography-and-security.md#references). Author policy (2026-07):
references live with the text they support — at the bottom of the
book file itself — and are not duplicated here.
