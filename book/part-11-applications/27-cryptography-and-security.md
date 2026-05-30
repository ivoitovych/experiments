# Chapter 27. Cryptography and Security

> **Status:** draft · **Phase:** 5 · **Sections drafted:** 11 / 11

[← Previous: Chapter 26](../part-10-practice-and-era/26-practical-access-and-hands-on-work.md) · [Table of Contents](../../README.md) · [Next: Chapter 28 →](28-scientific-computing-and-physical-simulation.md)

Cryptography is the application area where quantum computing has the sharpest, most concrete consequences. Shor's algorithm (§15.2, §15.4) breaks every widely deployed public-key primitive in polynomial time on a fault-tolerant quantum computer; Grover's algorithm (§15.1) chips a constant factor off symmetric-key security. The community response — post-quantum cryptography, standardised by NIST between 2016 and 2024 — is now production code in TLS libraries, SSH implementations, signed-update toolchains, and embedded protocol stacks. Quantum key distribution exists as an independent track that offers a different security argument (physical laws, not computational hardness) at the cost of severe deployment constraints. This chapter walks the engineering picture: what is broken, what replaces it, what the threat timeline looks like, and where QKD does and does not earn its keep.

> **How to read this chapter.** §§27.1–27.4 are the cryptographic-impact summary: which primitives Shor breaks, what Grover does to the symmetric-key world, and what post-quantum cryptography offers as the replacement. §27.5 is the NIST standardisation timeline and the FIPS 203/204/205 outputs you will actually deploy. §27.6 introduces the *harvest now, decrypt later* (HNDL) threat model — the reason migration starts before fault-tolerant hardware does. §§27.7–27.10 cover quantum key distribution: BB84, E91, B92, decoy states, security arguments, deployment limits, repeaters. §27.11 closes with practical recommendations and the bridge to Chapter 28.

## 27.1 Public-Key Cryptography and Shor

Every widely deployed public-key primitive in 2026 rests on one of two hardness assumptions: integer factorisation (RSA) or discrete logarithm in a finite cyclic group (Diffie–Hellman, DSA, ECDH, ECDSA, EdDSA, BLS, Schnorr). Shor's algorithm and its discrete-log variant (§15.2, §15.4) solve both in polynomial time on a fault-tolerant quantum computer of sufficient scale.

The damage list, with the assumption broken in parentheses:

- **RSA encryption and RSA-PSS / RSA-PKCS signatures** (factoring of $N = pq$): RSA-2048 ciphertexts decrypt and signatures forge in polynomial quantum time once a relevant-scale machine exists.
- **Finite-field Diffie–Hellman (DH) and ElGamal** (DLP in $\mathbb{F}_p^*$): session keys negotiated via DH are recoverable by a passive eavesdropper holding the public transcript.
- **DSA, ECDSA, EdDSA, Schnorr signatures** (DLP in $\mathbb{F}_p^*$ or in an elliptic-curve group): private signing keys recoverable from any public key. ECDSA over `secp256r1`, `secp256k1` (Bitcoin, Ethereum), Ed25519, Schnorr/Taproot — all fall.
- **BLS signatures and pairing-based cryptography** (DLP in pairing-friendly elliptic-curve groups): signatures forge, identity-based encryption decrypts.
- **TLS 1.3 forward secrecy** rests on ephemeral (EC)DH. A passive recorder that captures handshake records today and decrypts them later with a quantum computer recovers all session traffic. This is the harvest-now-decrypt-later (HNDL) threat — §27.6.

The cost asymmetry between RSA and ECDLP is the opposite of the classical one: classically, ECC with 256-bit keys matches RSA-3072 because Pollard's rho on a 256-bit elliptic curve and the general number field sieve on a 3072-bit modulus are roughly equiweak. Quantumly, both fall to Shor, and *ECC falls cheaper* — point multiplication is shorter than modular exponentiation, so a Shor-ECDLP circuit on a 256-bit curve takes roughly half the qubits and gate count of a Shor-factoring circuit on RSA-2048 (Roetteler et al. 2017, Häner–Jaques–Naehrig–Roetteler–Soeken 2020). The current resource bounds (§15.3) put RSA-2048 between Gidney–Ekerå's 2019 estimate ($\sim 20$ million physical qubits, $\sim 8$ hours at $p = 10^{-3}$) and Gidney's 2025 refinement (under 1 million physical qubits, under a week, under the same assumptions); proportional reductions apply to ECDLP-256, which remains the cheaper Shor target.

The bottom line: every asymmetric primitive in current TLS, SSH, IPsec, S/MIME, code-signing, OS update, secure-boot, blockchain, and electronic-passport stacks will eventually need to be replaced. Not because Shor is here in 2026, but because (a) the migration costs years, (b) HNDL means the data leaking now is the cleartext-later, and (c) NIST has finished standardising the replacements.

## 27.2 Symmetric-Key Cryptography and Grover

Symmetric-key cryptography fares much better. Grover's algorithm (§15.1) gives a quadratic speedup for unstructured search, which means brute-forcing a $k$-bit key takes $O(2^{k/2})$ quantum queries instead of $2^k$ classical ones. The naive reading: a 128-bit key has only 64 bits of post-quantum security; double the key size to recover the security margin.

For AES this is straightforward. AES-128 is widely deployed, AES-192 and AES-256 are available in every modern library, and migration is a configuration change. The recommendation since Bernstein et al. and reiterated by NIST is: *if you need post-quantum confidentiality against Grover, use AES-256, which retains 128 bits of effective security after the square-root speedup*. AES-128 is not catastrophically broken — and in fact it *defines* NIST's "category 1: at least as hard to break as AES-128 against a quantum attacker", so it meets that floor by construction. The concern is the thin margin: the asymptotic halving to a 64-bit exponent, plus the prospect of future cryptanalytic improvement, makes AES-128 a poor choice for long-lived secrets. The cleanest answer is to move to AES-256.

Three details complicate the simple picture and reduce the apparent threat.

**Constant factors are real.** Grover's $\sqrt{N}$ is an asymptotic statement. A concrete fault-tolerant Grover-on-AES-128 circuit is *not* $2^{64}$ gate operations; it is more like $2^{64}$ *Grover iterations*, each of which is one AES forward pass in a fault-tolerant circuit with magic-state distillation, surface-code overhead, and reversible-arithmetic blowup. Grassl–Langenberg–Roetteler–Steinwandt (2016) and Jaques–Naehrig–Roetteler–Virdia (2020) estimated AES-128 key recovery at on the order of $2^{83}$ Toffoli operations using $\sim 6000$ logical qubits — well above the NIST category-1 threshold for *most* near-term threat models, even though the asymptotic exponent is 64.

**Grover does not parallelise efficiently.** Splitting a Grover search across $P$ machines gives only a $\sqrt{P}$ speedup, not a $P$ speedup (Zalka 1999). A passive attacker with a million quantum machines does not get to multiply their effective compute by a million; they get a thousand.

**Quantum attacks on modes of operation matter more than attacks on the block cipher.** Several modes (GCM, OCB, CBC-MAC) admit superposition-query distinguishers that break authentication with fewer than $2^{k/2}$ queries (Kaplan–Leurent–Leverrier–Naya-Plasencia 2016; Bonnetain–Naya-Plasencia 2018) — but these attacks require *quantum-superposition access to the encryption oracle*, which no realistic threat model grants the adversary. In the standard model where the adversary sees only classical ciphertexts, AES-256-GCM remains a fine post-quantum symmetric primitive.

The summary: double the key length, prefer AES-256 over AES-128 for new deployments, and stop worrying about the symmetric layer.

## 27.3 Hash Functions

Hash functions feel a similar Grover effect, with two distinct attack models to keep separate.

**Preimage and second-preimage**: finding $x$ such that $H(x) = y$ for a given $y$, on an $n$-bit hash, takes $2^n$ classical queries and $O(2^{n/2})$ quantum queries via Grover. SHA-256 has 256-bit output, so the post-quantum preimage cost is $2^{128}$ — comfortably above NIST category 1 and not a near-term concern.

**Collision finding**: finding any pair $(x_1, x_2)$ with $H(x_1) = H(x_2)$ takes $2^{n/2}$ classical queries (the birthday bound) and *not* $2^{n/4}$ as a naive reading of Grover would suggest. The relevant result is Brassard–Høyer–Tapp (BHT, 1997), which gives $O(2^{n/3})$ quantum queries using a quantum-accessible memory of size $2^{n/3}$. Without QRAM, the best provable quantum collision algorithm matches the classical birthday bound at $2^{n/2}$ queries (Zhandry 2013, follow-ups). So for SHA-256 collisions, the post-quantum security is somewhere between $2^{85}$ (with QRAM, asymptotically) and $2^{128}$ (without).

The practical recommendation tracks the symmetric one: use 256-bit hashes (SHA-256, SHA3-256, BLAKE3, BLAKE2b-256). 384-bit and 512-bit variants exist for ultra-paranoid settings but are usually unnecessary. The hash-based-signature schemes in §27.4 lean on the *second-preimage* assumption, which is the easier of the two and retains $\sim 128$ bits of post-quantum security at $n = 256$.

## 27.4 Post-Quantum Cryptography: The Replacement Toolkit

**Post-quantum cryptography (PQC)** is the set of cryptographic primitives whose security rests on problems *believed to be hard for quantum computers*. The four families that survived two decades of cryptanalytic scrutiny and entered the NIST standardisation process are:

**Lattice-based.** Security reduces to short-vector or learning-with-errors (LWE / Module-LWE / Ring-LWE) problems on integer lattices. The dominant family in the NIST output. Key sizes are moderate (kilobytes), operations are fast, and the schemes are versatile — KEM, signatures, identity-based encryption, fully-homomorphic encryption all have lattice constructions. The downside is that the security reductions tie scheme security to *worst-case* lattice problems by way of *average-case* variants, and the constants in those reductions are loose; the standardised parameter sets are calibrated against *direct* cryptanalysis rather than against the worst-case reduction. **CRYSTALS-Kyber** (KEM) and **CRYSTALS-Dilithium** (signatures) are the workhorses; **Falcon** (signatures) is a NTRU-lattice scheme with smaller signatures but harder constant-time implementation.

**Hash-based.** Security reduces to second-preimage resistance of a cryptographic hash function — the most conservative assumption in cryptography, with the longest track record. Hash-based schemes are *signatures only* (no KEM). **XMSS** and **LMS** (RFC 8391, RFC 8554) are stateful: each signature consumes one one-time signing key from a precomputed Merkle tree, and reusing a key catastrophically breaks security. **SPHINCS+** is stateless at the cost of larger signatures (8–50 KB). Hash-based signatures are slow to sign and verify compared to lattice signatures and produce large signatures, but they are the *fallback* if all lattice schemes fall to an unexpected cryptanalytic breakthrough.

**Code-based.** Security reduces to decoding a random linear code — McEliece 1978, still unbroken after almost five decades. **Classic McEliece** is a KEM with tiny ciphertexts (under 200 bytes) and huge public keys (megabytes). The conservative choice for **long-lived, static** public keys — distributed or cached once, after which only the tiny ciphertexts travel per session. Its megabyte public key makes it a poor fit for ephemeral, per-handshake key exchange, where a fresh key would have to be transmitted every time.

**Multivariate.** Security reduces to solving systems of multivariate quadratic equations over a finite field. The family produced GeMSS, LUOV, Rainbow — Rainbow advanced far in the NIST process and was then broken in 2022 by Beullens with a classical algorithm. Multivariate constructions remain a research topic but are not currently considered ready for deployment.

A fifth family, **isogeny-based** cryptography (SIDH/SIKE), looked like a strong fourth-round NIST candidate until Castryck–Decru–Maino–Martindale–Panny–Robert (2022–2023) broke it with a classical polynomial-time attack. Isogeny constructions survive (CSIDH, SQIsign for signatures), but the family is wounded and not in the standardised output.

Key engineering numbers for the standardised schemes, in round figures:

- **ML-KEM-768** (Kyber-768, FIPS 203, NIST category 3): public key 1184 B, ciphertext 1088 B, shared secret 32 B. Encapsulation and decapsulation under 100 microseconds on a modern CPU.
- **ML-DSA-65** (Dilithium-3, FIPS 204, category 3): public key 1952 B, signature 3309 B. Sign and verify on the order of milliseconds.
- **SLH-DSA-SHA2-128s** (SPHINCS+-128s, FIPS 205, category 1): public key 32 B, signature 7856 B. Signing is slow (several hundred milliseconds), verification is fast.
- **Falcon-512** (renamed FN-DSA in NIST's draft, FIPS 206 IPD submitted August 2025, category 1): public key 897 B, signature 666 B. Smallest signatures of any forthcoming PQC signature scheme, but constant-time floating-point implementation is hard; final FIPS 206 is expected late 2026 / early 2027.
- **Classic McEliece (mceliece6960119)** (category 5): public key 1 047 319 B (~1 MB), ciphertext 226 B. KEM only.

These are several to dozens of times larger than RSA/ECC keys and signatures, which has knock-on consequences for TLS record sizes, certificate-chain transmission, embedded-device memory, and DNSSEC packet bloat. Hybrid schemes (PQC + ECDH or PQC + ECDSA, concatenating shared secrets or signatures) are the deployment norm during the transition: even if one side falls to cryptanalysis, the other still protects.

## 27.5 NIST Standardisation Timeline

The NIST Post-Quantum Cryptography Standardization process ran from 2016 to 2024 and is the single most consequential cryptographic standardisation effort of the decade. The timeline:

- **2016**: NIST announces the call. 82 submissions arrive by November 2017; 69 accepted as round-1 candidates.
- **2019**: Round 2 narrows to 26 candidates (17 KEM/encryption, 9 signature).
- **2020**: Round 3 names 7 finalists (4 KEM, 3 signature) and 8 alternates.
- **2022**: First selection. CRYSTALS-Kyber chosen for KEM; CRYSTALS-Dilithium, Falcon, SPHINCS+ chosen for signatures. Round 4 continues evaluating McEliece, BIKE, HQC (KEM) and an "on-ramp" for additional signature schemes diverse from lattice-based.
- **2023**: Draft FIPS 203, 204, 205 published. Rainbow already broken (2022); SIKE broken (Castryck–Decru, July 2022).
- **August 2024**: FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA) finalised. Renames reflect NIST's preference for descriptive over personal names: ML-KEM = Module-Lattice-based KEM (Kyber), ML-DSA = Module-Lattice DSA (Dilithium), SLH-DSA = Stateless Hash-based DSA (SPHINCS+).
- **March 2025**: HQC selected as a code-based KEM standard for cryptographic diversity (NIST IR 8545), to be standardised as FIPS 207 (draft pending; final expected in 2027). Falcon enters draft as FN-DSA / FIPS 206 (IPD submitted August 2025).
- **2025–2026**: Additional signature on-ramp continues. Candidate schemes include MAYO (multivariate revisited), UOV variants, SNOVA, hash-based signature improvements, and several lattice/isogeny hybrids.

The deployment timeline is faster than usual for cryptographic standards. OpenSSL 3.5 ships ML-KEM in 2025. Cloudflare, Google, Apple, and AWS have deployed hybrid ML-KEM + X25519 in production TLS by mid-2024. The iMessage PQ3 protocol (2024) uses ML-KEM for post-compromise security. Signal's PQXDH (late 2023) prefixes its X3DH key agreement with a Kyber-based handshake. SSH gained `mlkem768x25519-sha256` in OpenSSH 9.9 (late 2024). The browser, mobile, and infrastructure layers are already living through the migration in 2026; the long tail of embedded and legacy systems is what will take a decade.

## 27.6 Harvest Now, Decrypt Later

The cryptographic threat from quantum computing is not "when will a quantum computer break my live traffic in real time". It is **harvest now, decrypt later (HNDL)**: a passive adversary records encrypted traffic and key exchanges today, stores them indefinitely, and decrypts the archive in five, ten, or twenty years when a relevant-scale fault-tolerant quantum computer comes online. Every byte of TLS-protected data that a state-level actor copies off a fibre tap or an ISP mirror in 2026 is in their archive forever.

HNDL changes the timeline for migration in a specific way: **the migration deadline is the present, not the arrival of fault-tolerant quantum computers**. If a piece of data has a confidentiality lifetime of 20 years (medical records, government secrets, intellectual property, source code, election rolls, journalist–source communications), and if relevant-scale fault-tolerant quantum computing materialises any time before 2046, then any transmission of that data in 2026 over non-post-quantum-protected channels is potentially compromised.

This is the underlying reason for the urgency of the NIST process and for the deployment pace of hybrid KEMs in 2024–2026. The cryptographic community broadly does not believe a relevant-scale fault-tolerant quantum computer is *imminent* — most credible estimates are 10–20 years out — but for HNDL the migration must complete *before* the threat, and the migration itself takes a decade. The window is not "when can a quantum computer attack live traffic"; it is "when did we record the ciphertext".

Authentication is different. A forged signature in 2040 is a problem only for documents whose signature continues to be relied upon in 2040; for ephemeral authentication (TLS handshake binding, OAuth tokens, code-signing for live updates), the threat is the day the quantum computer arrives, not before. This is why migration of *KEM*-style confidentiality primitives is more urgent than migration of *signature* primitives — and why hybrid ML-KEM appeared in production years before mandatory ML-DSA.

## 27.7 Quantum Key Distribution: BB84

**Quantum key distribution (QKD)** is the other side of the cryptography-meets-quantum coin: instead of using quantum hardness to attack classical primitives, QKD uses quantum mechanics to *build* a key-exchange primitive whose security rests on physical laws (no-cloning, measurement disturbance, monogamy of entanglement) rather than on computational hardness.

The original protocol is **BB84** (Bennett–Brassard 1984). Alice prepares a long sequence of single qubits, each chosen uniformly at random from the set $\\{|0\rangle, |1\rangle, |+\rangle, |-\rangle\\}$ — four states across two mutually unbiased bases. She records, for each qubit, the *basis* (rectilinear $Z$ or diagonal $X$) and the *bit* ($0$ or $1$). Bob, for each arriving qubit, picks $Z$ or $X$ uniformly at random and measures. Bob's bit matches Alice's whenever his basis matches hers (half the time, in expectation); when the bases mismatch, his result is independent of Alice's bit.

After the quantum transmission, Alice and Bob run a classical post-processing phase over an authenticated public channel:

1. **Basis sifting.** They announce their basis choice for each qubit. They keep the bits where the bases match and discard the rest. This leaves the **sifted key** — half the original length in expectation.
2. **Error estimation.** They reveal a random subset of the sifted key. The fraction of disagreements is the **quantum bit error rate (QBER)**. If the channel and detectors are ideal and no eavesdropper is present, QBER reflects only physical-channel noise.
3. **Information-reconciliation.** They run a classical error-correcting protocol (LDPC, cascade) over the remaining sifted key to make Alice and Bob's keys identical, leaking some information to a potential eavesdropper in the process.
4. **Privacy amplification.** They apply a universal hash function to compress the reconciled key down to a length below the eavesdropper's residual information, producing a final shared secret that the eavesdropper has negligible information about.

The security argument: an eavesdropper Eve cannot copy each qubit (no-cloning theorem, §5.13) and cannot measure each qubit without disturbing the ones whose basis she guessed wrong. Any such disturbance increases QBER. If QBER stays below a threshold (around 11% for the asymptotic ideal-detector analysis of BB84), Alice and Bob can post-process to a secret key with provably negligible eavesdropper information; above the threshold, they abort. Eve's optimal individual-qubit attack — intercept-resend in a random basis — gives her 25% information about each bit at the cost of a 25% QBER, which is well above the abort threshold.

A simple worked example clarifies the bit accounting. Suppose Alice sends $|+\rangle$. Eve measures in the $Z$-basis: she sees $|0\rangle$ or $|1\rangle$ with probability $1/2$ each. Conditional on her result, she forwards that basis state to Bob. Bob, if measuring in $X$, sees $|+\rangle$ or $|-\rangle$ with probability $1/2$ each — independent of Alice's bit. Eve's attack has injected a 50% error rate on this channel basis. Averaged over Alice's basis choices, Eve's intercept-resend gives 25% QBER.

## 27.8 E91, B92, and Decoy States

**E91** (Ekert 1991) replaces prepare-and-measure with **entanglement distribution**. A central source distributes halves of Bell pairs $|\Phi^+\rangle = (|00\rangle + |11\rangle)/\sqrt{2}$ to Alice and Bob. Each measures their qubit in one of three bases chosen uniformly at random, drawn from settings that overlap on some pairs (for sifted key) and complementary on others (for a CHSH-style Bell-inequality test). The sifted-key half is identical to the BB84 sifted key; the Bell-test half lets Alice and Bob verify that their correlations actually saturate Tsirelson's bound — a CHSH value of $2\sqrt{2}$ versus the local-hidden-variable maximum of $2$ (see §7.9, §7.12). Any eavesdropper interacting with the qubits in transit weakens the Bell-inequality violation; the test detects her. E91 is conceptually clean — its security argument routes through entanglement monogamy rather than no-cloning — and is the conceptual foundation for **device-independent QKD**, where security holds even if Alice and Bob do not trust their own measurement devices, as long as the CHSH violation is observed.

**B92** (Bennett 1992) is a minimalist BB84 variant using only *two* non-orthogonal states, e.g. $|0\rangle$ and $|+\rangle$. The encoding is: $|0\rangle$ represents bit $0$, $|+\rangle$ represents bit $1$. Bob measures in $X$ or $Z$ at random; an outcome of $|1\rangle$ (in $Z$) or $|-\rangle$ (in $X$) unambiguously distinguishes the two states (since $\langle 1|+\rangle$ and $\langle - | 0\rangle$ are both $1/\sqrt{2}$ in magnitude, while $\langle 1 | 0\rangle = \langle - | + \rangle = 0$). Inconclusive results are discarded. B92 is simpler to implement but more vulnerable to channel loss (intermediate Eve can selectively block ambiguous events) and is rarely deployed in production.

**Decoy-state QKD** (Hwang 2003, Lo–Ma–Chen 2005) is the engineering fix that made BB84 secure with realistic *coherent-state* light sources. A laser pulse attenuated to "single-photon level" is in reality a Poisson distribution over photon number: occasional pulses contain two or more photons, and Eve can split off one photon, store it, and measure once the bases are announced — a **photon-number-splitting (PNS) attack**. The decoy-state countermeasure: Alice randomly varies the mean photon number per pulse across two or three values, and the per-intensity yield and QBER let Alice and Bob bound the contribution from multi-photon pulses to the final key. With decoy states, BB84 with coherent-state pulses achieves the same security as ideal single-photon BB84, at the cost of roughly half the key rate. Every commercial QKD system since the late 2000s uses decoy states.

A practical detail worth flagging: the security of BB84 (and E91, and B92) rests on the *composability* analysis worked out in the 2000s — the proofs of Mayers, Lo–Chau, Shor–Preskill, and Renner. The asymptotic 11% QBER threshold is a textbook number; the finite-key thresholds that apply to a million-pulse session are several percentage points lower and require careful statistical analysis to bound the eavesdropper's information correctly. Production systems use validated finite-key bounds, not the asymptotic ones.

## 27.9 QKD Security: What It Promises, What It Does Not

The selling proposition of QKD is **information-theoretic security**: no assumption on the computational power of the adversary, no assumption on future cryptanalysis, no assumption on whether large quantum computers exist. The security argument is in the structure of quantum mechanics. If quantum mechanics is correct and the implementation is faithful to the protocol's abstract description, QKD produces a key that is information-theoretically secret.

This is genuinely stronger than computational cryptography. RSA's security is conditional on factoring being hard. ML-KEM's security is conditional on Module-LWE being hard. Both could be undone tomorrow by a cryptanalytic breakthrough. QKD's security, taken at the level of the abstract protocol, cannot — it would require quantum mechanics itself to be wrong.

But the abstract protocol and the deployed protocol are not the same thing, and the gap is where every practical QKD attack lives.

**Side-channel attacks.** Detectors have detection-efficiency mismatches between the two bases; a bright-light blinding attack (Lydersen et al. 2010) saturates avalanche photodiode detectors into a classical photodetection regime where Eve controls Bob's measurements outright. Wavelength-dependent attacks exploit beam-splitter imperfections. Time-shift attacks exploit timing imperfections. Trojan-horse attacks shine a probe pulse into Alice's modulator and read out her basis choice from the back-reflection. The list grew steadily through the 2010s and continues; every commercial QKD system has been broken by *some* side-channel attack at some point.

**Authenticated classical channel.** The post-processing in §27.7 step 2–4 must run over an *authenticated* classical channel. QKD does not solve authentication; it solves confidentiality of a *fresh* key, given an authenticated classical channel. Authentication usually uses a pre-shared secret (the previous QKD session's key, plus a Wegman–Carter universal-hash MAC) or a public-key signature — and if you trust a public-key signature, you are back in computational-cryptography land, and you might as well skip QKD and use PQC throughout.

**Device-independent QKD** (Mayers–Yao 1998, Acín et al. 2007, Pironio et al. 2010) is the partial answer to side-channel attacks: prove security from the observed Bell-inequality violation only, without trusting Alice's and Bob's devices. The catch is that DI-QKD requires very high detection efficiencies (so the detection loophole closes) and very low channel loss, and demonstrations at the relevant key rates over the relevant distances are research-grade in 2026. **Measurement-device-independent (MDI) QKD** is the deployed compromise: trust source devices, do not trust the detector, route both Alice's and Bob's photons through a Bell-state measurement at an untrusted central node. MDI-QKD has been implemented over hundreds of kilometres and closes the most severe detector-side attacks.

## 27.10 Limits, Repeaters, and the Practical Picture

Distance and rate are the binding constraints on QKD deployment.

**Loss in optical fibre is exponential in distance.** Standard single-mode fibre attenuates at roughly 0.2 dB/km at telecom wavelengths (1550 nm), which means the photon-transmission probability falls by a factor of 100 every 100 km. The Pirandola–Laurenza–Ottaviani–Banchi (PLOB, 2017) bound is the fundamental limit on point-to-point QKD over a lossy channel: the secret-key rate is bounded by $-\log_2(1 - \eta)$ bits per channel use, where $\eta$ is the channel transmission. At $\eta \ll 1$ (long fibre runs), this is approximately $\eta / \ln 2$ — *linear* in transmission, so key rates fall exponentially with distance.

In numbers: state-of-the-art point-to-point QKD reaches $\sim 1$ Mbps over $50$ km of fibre, $\sim 10$ kbps over $100$ km, $\sim 1$ bit per second over $400$ km, and runs into hardware noise floors beyond $\sim 500$–$600$ km. Field deployments (Beijing–Shanghai backbone, Tokyo QKD network, Madrid Quantum Network, EuroQCI) cover hundreds of kilometres only by using **trusted-node** architectures: a chain of QKD links where each intermediate node decrypts the key from the previous link and re-encrypts to the next, with the operator of the intermediate node holding all keys in cleartext. Trusted nodes are an enormous security regression — every node is a single point of compromise — and they erode the information-theoretic security argument that motivated QKD in the first place.

**Free-space and satellite QKD** sidesteps the fibre limit. The Micius satellite (Pan group, 2017–2020) demonstrated entanglement-based QKD between ground stations 1200 km apart via a low-earth-orbit satellite acting as a trusted relay (and, in a later demonstration, as an untrusted relay via entanglement distribution). Satellite QKD is impressive science and is a plausible backbone for intercontinental key exchange, but the rates are very low (hundreds of bits per second), the satellite passes are brief and weather-dependent, and the engineering and cost scale is comparable to a small satellite-internet constellation. It is not a turnkey alternative to fibre-based or PQC-based key exchange.

**Quantum repeaters** are the long-term answer to the PLOB bound. A repeater chain distributes entanglement segment by segment, performs **entanglement swapping** at each intermediate node to extend the entangled pair, and uses **entanglement distillation** to purify the lower-fidelity pairs produced by swapping. Done correctly, a repeater chain produces an end-to-end entangled Bell pair without any intermediate node ever holding plaintext — no trusted-node compromise. The technological prerequisites are quantum memories with seconds-scale coherence times, deterministic entanglement generation between memory and photon, and good Bell-state measurements; small two-segment repeater demonstrations have been done in NV-centre and trapped-ion platforms, but a deployable repeater that beats trusted nodes economically is research-grade in 2026 and probably for at least another decade.

**Quantum digital signatures and quantum money.** Two further quantum-cryptography primitives are worth flagging without spending a section on each. **Quantum digital signatures** (Gottesman–Chuang 2001 and follow-ups) achieve signature-like functionality using non-orthogonal quantum states distributed in advance; they require quantum memory and have not seen meaningful deployment. **Wiesner's quantum money** (Wiesner 1969, published 1983) is the original idea: a banknote is a sequence of qubits in random BB84 states recorded by the bank, and the no-cloning theorem prevents counterfeiting — but verification requires sending the bill back to the bank. **Public-key quantum money** schemes (Aaronson 2009, Zhandry 2017–2024) allow anyone to verify without the issuer, at the cost of unproven cryptographic assumptions; the security of every concrete candidate scheme has been an active research question, and no scheme is deployment-ready.

## 27.11 Practical Recommendations and Bridge to Chapter 28

The action items that fall out of all of the above:

**For confidentiality (KEM, encryption).** Deploy hybrid post-quantum KEM (ML-KEM combined with classical X25519 or P-256) on every channel carrying data with a confidentiality lifetime longer than the threat timeline. This is most TLS deployments, all VPNs, all messaging end-to-end-encryption protocols, all cloud-storage encryption at rest. The hybrid construction means that even if ML-KEM falls to cryptanalysis tomorrow, classical ECDH still protects until a quantum computer arrives; and vice versa. The performance overhead of hybrid ML-KEM-768 + X25519 over X25519 alone is in the low single digits of milliseconds per handshake and a few kilobytes of additional handshake bytes — entirely affordable.

**For authentication (signatures).** Migration is less urgent than for confidentiality (no HNDL threat), but the long tail of code-signing, OS-update signing, document signing, and certificate roots will take a decade to turn over. Start now. ML-DSA is the workhorse; Falcon (FN-DSA) when signature size is critical; SLH-DSA / SPHINCS+ when conservatism is critical and large signatures are tolerable. Hybrid signatures (ECDSA + ML-DSA) are the safe default during transition.

**For symmetric primitives.** Use AES-256 for new deployments. Use 256-bit hashes (SHA-256, SHA3-256, BLAKE3). Do not panic; the Grover threat to symmetric crypto is modest and asymptotic.

**For QKD.** Deploy only when (a) the link is point-to-point fibre under 100 km or a closed-geometry free-space link, (b) the threat model justifies the additional cost and operational complexity, and (c) the deployment is genuinely *layered with* PQC rather than replacing it. Common deployment patterns are intra-data-centre links between paired security facilities, short metropolitan or submarine links between nearby secure facilities, and inter-bank settlement links in jurisdictions that mandate it. (Long-haul or trans-oceanic routes exceed the ~100 km direct-QKD ceiling and would require trusted-node relays — which reintroduce points the operator must trust — so they are not direct point-to-point QKD.) QKD is *not* a substitute for PQC for general internet traffic; PQC and QKD address overlapping but different threat surfaces, and PQC is the universal solution and QKD is a niche augmentation.

**For HNDL-sensitive archives.** Anything you encrypt in 2026 with non-post-quantum-secure key exchange is potentially in an adversary's archive for future decryption. Re-encrypt long-term archives with PQC KEM today, even if the original confidentiality envelope was AES-256 — the AES key was negotiated under a classical KEM, and that KEM is what HNDL attacks.

The next chapter moves from the cryptographic application to the **scientific-computing** application: quantum chemistry, condensed-matter simulation, lattice gauge theory, and Hamiltonian-simulation-based PDE solvers. Where cryptography is the application most threatened by quantum computing, scientific computing is the application where quantum computing was conceived (Feynman 1982) and where its first practical impact is likely to materialise.

**Sanity checks before moving on.**

1. AES-128 has $2^{128}$ classical security. What is its post-quantum security against an idealised Grover attack? Against the concrete Grassl–Roetteler resource estimate (give the order of magnitude in Toffoli operations)?
2. RSA-3072 and ECDSA over a 256-bit curve are roughly equiweak classically. Which falls *cheaper* to Shor in terms of physical-qubit count, and by what rough factor?
3. The HNDL threat sets the migration deadline for confidentiality primitives to the present. Explain why the migration deadline for signature primitives is less urgent (no need to compute, just write the one-sentence reason).
4. A BB84 deployment over 200 km of standard single-mode fibre at 0.2 dB/km has a one-way photon transmission of $\eta = 10^{-4}$. Use the PLOB bound (rate $\lesssim \eta / \ln 2$ bits per channel use) to estimate the maximum sustainable key rate at a 1 GHz pulse rate.
5. NIST FIPS 203 standardises ML-KEM (renamed Kyber). What hardness problem does it reduce to, and what is the structural reason that this problem is believed to resist quantum attacks (one-sentence answers, no derivations)?

---

[← Previous: Chapter 26](../part-10-practice-and-era/26-practical-access-and-hands-on-work.md) · [Table of Contents](../../README.md) · [Next: Chapter 28 →](28-scientific-computing-and-physical-simulation.md)
