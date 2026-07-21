# Factcheck — §30 Quantum Machine Learning

Mirrors `book/part-11-applications/30-quantum-machine-learning.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

## §30.2 — Kerenidis–Prakash 2016 quantum recommendation systems

- **Claim** (anchor): "quantum recommendation systems (Kerenidis–Prakash 2016: sample a recommendation from a low-rank reconstruction of a preference matrix, using a quantum data structure to access it)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to Kerenidis and Prakash, 2016. Claimed an exponential speedup over classical recommendation algorithms.

## §30.2 — Lloyd–Mohseni–Rebentrost 2014 quantum PCA

- **Claim** (anchor): "quantum principal-component analysis (Lloyd–Mohseni–Rebentrost 2014: produce a quantum state encoding top eigenvectors in polylogarithmic time, under copy-access, rank, and eigenvalue-resolution assumptions)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to Lloyd, Mohseni, and Rebentrost, 2014. Claims polylogarithmic time for top-eigenvector computation.

## §30.2 — Rebentrost–Mohseni–Lloyd 2014 quantum SVM

- **Claim** (anchor): "quantum support-vector machines (Rebentrost–Mohseni–Lloyd 2014: a least-squares SVM formulation solved via HHL, under kernel-matrix access and conditioning assumptions)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to Rebentrost, Mohseni, and Lloyd, 2014.

## §30.2 — No physical QRAM built; bucket-brigade architectures unstable

- **Claim** (anchor): "No large-scale QRAM has been built. Proposed architectures (bucket-brigade and variants) face demanding fault-tolerance requirements under noise"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Empirical/community-consensus claim about the state of QRAM research; the text states consensus from ~2020 onward leans pessimistic.

## §30.2 — Tang 2018 dequantization of recommendation systems

- **Claim** (anchor): "Ewin Tang's 2018 work on the **recommendation-systems problem** showed that the Kerenidis–Prakash quantum algorithm could be *dequantized*"
- **Method**: external
- **Source**: Tang, STOC 2019 (work circulated 2018)
- **Verified**: — · **Verdict**: open
- **Comment**: Foundational dequantization result. The paper was first circulated as an arXiv preprint in 2018 and presented at STOC 2019.

## §30.2 — Scope of Tang-style dequantization by 2021

- **Claim** (anchor): "the Tang-style dequantization had been extended to quantum PCA, quantum SVMs, quantum linear regression in the low-rank regime, and other named Category-1 results *in their classical-data regimes*"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Broad claim about the scope of the dequantization program through 2021; multiple follow-up papers involved.

## §30.3 — Classical shadows: Huang–Kueng–Preskill 2020, O(log M) sample complexity

- **Claim** (anchor): "shows that a number of shadow samples scaling as $O(\max_i \\|O_i\\|_{\mathrm{shadow}}^2 \log(M/\delta) / \varepsilon^2)$ — logarithmic in the number of target observables $M$"
- **Method**: external
- **Source**: Huang, Kueng, Preskill (2020) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific O(log M) sample-complexity claim for predicting M linear properties via randomized Clifford measurements.

## §30.3 — Hamiltonian learning: Anshu–Arunachalam–Kueng–Lin polynomial sample complexity

- **Claim** (anchor): "recent results (Anshu–Arunachalam–Kueng–Lin and follow-ups) give polynomial sample complexity for low-intersection local Hamiltonians, with the dependence on system size set by the locality structure rather than by Hilbert-space dimension"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed to Anshu, Arunachalam, Kueng, Lin. Specific structural claim about sample complexity scaling for local Hamiltonians.

## §30.4 — Barren plateaus: McClean et al. 2018, exponentially vanishing gradient variance

- **Claim** (anchor): "showed that for parameterized circuits random enough to approximate 2-designs, the gradient of a global cost with respect to any parameter has (near-)zero mean and variance decaying exponentially in $n$"
- **Method**: external
- **Source**: McClean, Boixo, Smelyanskiy, Babbush, Neven (2018) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Foundational barren-plateau result. Exponentially vanishing gradient variance for Haar-random circuits.

## §30.4 — Barren plateaus extended to noise-induced concentration and structured architectures

- **Claim** (anchor): "noise induces its own concentration (model-dependent, often exponential in depth)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Refers to multiple follow-up papers extending the barren-plateau result to noisy circuits and structured ansätze; Cerezo et al. are among the authors associated with this line of work.

## §30.5 — Liu–Arunachalam–Temme 2021 quantum kernel separation via discrete logarithms

- **Claim** (anchor): "there is a *learning problem* — built around discrete logarithms in a carefully constructed group — for which a quantum kernel method learns efficiently while every efficient classical learner fails"
- **Method**: external
- **Source**: Liu, Arunachalam, Temme (2021) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Specific claim of a provable quantum-classical learning separation based on discrete-log hardness. Attributed to Liu, Arunachalam, and Temme, 2021.

## §30.6 — Cong–Choi–Lukin 2019 QCNN proposal

- **Claim** (anchor): "Cong–Choi–Lukin (2019) proposed a structured circuit ansatz inspired by classical CNNs: alternating layers of local"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Architectural description attributed to Cong, Choi, and Lukin, 2019.

## §30.6 — QCNN provably avoids barren plateaus and detects topological order

- **Claim** (anchor): "The structure is restrictive enough to carry trainability guarantees — absence-of-plateau results under stated architectures and cost functions and has been shown to detect topological-phase order"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Two distinct claims: (1) provable barren-plateau avoidance for QCNNs at moderate depth; (2) demonstrated topological-phase detection in condensed-matter models.

## §30.6 — Lloyd–Weedbrook 2018 and Dallaire-Demers–Killoran 2018 QGAN proposals

- **Claim** (anchor): "Lloyd–Weedbrook (2018) and Dallaire-Demers–Killoran (2018) proposed quantum analogs of GANs in which the generator, the discriminator, or both are parameterized quantum circuits"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Two independent QGAN proposals attributed to the same year (2018).

## §30.6 — Cerezo et al. 2021 and 2022 review papers

- **Claim** (anchor): "the reader who wants the full taxonomy can consult Cerezo–Verdon–Huang–Cincio–Coles (2022) or the Variational Quantum Algorithms review by Cerezo et al. (2021)"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Two attributed review papers; existence, authorship, and dates are verifiable claims.

## §30.7 — Quantum natural gradient: Stokes–Izaac–Killoran–Carleo 2020

- **Claim** (anchor): "natural-gradient methods (the quantum Fisher information metric of Stokes–Izaac–Killoran–Carleo, 2020) that use the geometry of the parameterized-state manifold to precondition the updates"
- **Method**: external
- **Source**: Stokes, Izaac, Killoran, Carleo (2020) — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Attributed result proposing the quantum natural gradient using the quantum Fisher information metric.

## §30.7 — Hybrid training wall-clock arithmetic

- **Claim** (anchor): "A parameter-shift gradient for a model with p parameters requires 2p expectation-value evaluations per training step"
- **Method**: derivation
- **Source**: → §30.7 (parameter-shift rule derivation, §8.13)
- **Verified**: — · **Verdict**: open
- **Comment**: The factor of 2p per step follows directly from the parameter-shift rule requiring two circuit evaluations per parameter. The downstream wall-clock estimate (≈ 23 days for p=100, S=10^4, K=10^3, 1 ms/shot) is a numerical consequence.

## §30.8 — Tang program: polylogarithmic dequantized algorithms for named problems

- **Claim** (anchor): "the Tang program has produced classical algorithms with running times that are polylogarithmic in the data dimension for: low-rank linear regression, low-rank matrix recovery, quantum recommendation systems, quantum PCA, quantum SVD, certain classes of quantum kernel methods, and the Lloyd–Mohseni–Rebentrost family"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Enumerates the problems covered by dequantization; each item is a verifiable claim tied to specific papers in the Tang-program literature.

## §30.8 — Shor's algorithm and discrete-log survive dequantization

- **Claim** (anchor): "their input is a short classical description (the integer $N$, a group element), not a large dataset — the modular exponentiation is *computed*, not looked up"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Conceptual claim about why Shor and discrete-log algorithms are immune to the dequantization argument; the access model is to an oracle rather than a classical dataset. Standard complexity-theoretic reasoning worth confirming the framing is accurate.

## References (external)

Sources cited by this file's cards, kept here so the file stays
self-contained (project policy: no central registry).

- **Tang, STOC 2019** — arXiv:1807.04271 (dequantization; low-rank regime).
- **McClean et al. 2018** — *Nat. Commun.* 9, 4812 (barren plateaus); **Cerezo et al. 2021** — *Nat. Rev. Phys.* 3, 625 (variational algorithms review).
