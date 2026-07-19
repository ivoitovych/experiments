# Factcheck — §17 Complexity Theory

Mirrors `book/part-07-complexity/17-complexity-theory.md`.
Extraction pass 2026-05 — claims identified and anchored; verification still OPEN.

---

## §17.1 — Savitch's theorem: NPSPACE = PSPACE

- **Claim** (anchor): "Savitch's theorem gives $\mathrm{NPSPACE} = \mathrm{PSPACE}$"
- **Method**: external
- **Source**: Savitch, W. J. (1970), "Relationships between nondeterministic and deterministic tape complexities", *Journal of Computer and System Sciences* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.1 — P ⊊ EXP via the time hierarchy theorem

- **Claim** (anchor): "$\mathrm{P} \subsetneq \mathrm{EXP}$ the only strict separation proved *among the classes displayed here* (via the time hierarchy theorem)"
- **Method**: external
- **Source**: Hartmanis & Stearns (1965); also covered in Arora & Barak, *Computational Complexity: A Modern Approach*, §3
- **Verified**: — · **Verdict**: open

---

## §17.1 — BPP ⊆ Σ₂ᵖ ∩ Π₂ᵖ (Sipser–Gács–Lautemann)

- **Claim** (anchor): "$\mathrm{BPP} \subseteq \Sigma_2^p \cap \Pi_2^p$ (Sipser–Gács–Lautemann; $\Sigma_2^p$ and $\Pi_2^p$ are the second level of the polynomial hierarchy, defined in §17.5 — for now, read them as "just above NP")"
- **Method**: external
- **Source**: Lautemann (1983), Sipser (1983), Gács (attributed); TBD — needs verification of consolidated citation
- **Verified**: — · **Verdict**: open

---

## §17.1 — SAT is NP-complete (Cook–Levin)

- **Claim** (anchor): "$\mathrm{SAT}$ is $\mathrm{NP}$-complete (Cook–Levin)"
- **Method**: external
- **Source**: Cook (1971), Levin (1973); standard reference Arora & Barak, *Computational Complexity: A Modern Approach*, §2
- **Verified**: — · **Verdict**: open

---

## §17.1 — QBF is PSPACE-complete

- **Claim** (anchor): "$\mathrm{QBF}$ (quantified boolean formula validity) is $\mathrm{PSPACE}$-complete"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

---

## §17.2 — Solovay–Kitaev theorem: gate-set independence of BQP

- **Claim** (anchor): "The Solovay–Kitaev theorem (§8.11) shows that any single-qubit unitary can be approximated to precision $\epsilon$ by $O(\log^c(1/\epsilon))$ gates"
- **Method**: external
- **Source**: Dawson & Nielsen, arXiv:quant-ph/0505030; also Nielsen & Chuang, *Quantum Computation and Quantum Information*, §4.5
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference to §8.11 in same manuscript; external result still requires external verification.

---

## §17.2 — BQP ⊆ PP (Adleman–DeMarrais–Huang)

- **Claim** (anchor): "The tightening to $\mathrm{BQP} \subseteq \mathrm{PP}$ is due to Adleman–DeMarrais–Huang"
- **Method**: external
- **Source**: Adleman, DeMarrais & Huang (1997), "Quantum computability", *SIAM Journal on Computing* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.2 — BQP ⊆ AWPP (sharpest known upper bound)

- **Claim** (anchor): "$\mathrm{BQP} \;\subseteq\; \mathrm{AWPP} \;\subseteq\; \mathrm{PP}$"
- **Method**: external
- **Source**: TBD — needs verification (attributed to Fortnow & Rogers or related work)
- **Verified**: — · **Verdict**: open

---

## §17.2 — NP ⊄ BQP relative to random oracle (BBBV 1997)

- **Claim** (anchor): "Bennett–Bernstein–Brassard–Vazirani showed in 1997 that relative to a random oracle, $\mathrm{NP} \not\subseteq \mathrm{BQP}$"
- **Method**: external
- **Source**: Bennett, Bernstein, Brassard & Vazirani (1997), "Strengths and Weaknesses of Quantum Computing", *SIAM Journal on Computing* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.2 — BQP-completeness: approximating Jones polynomial (Aharonov–Jones–Landau)

- **Claim** (anchor): "**Approximating the Jones polynomial** at a fifth root of unity (Aharonov–Jones–Landau)"
- **Method**: external
- **Source**: Aharonov, Jones & Landau (2009), "A polynomial quantum algorithm for approximating the Jones polynomial", *Algorithmica* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.3 — Local Hamiltonian problem QMA-completeness (Kitaev 2002, k=5; Kempe–Kitaev–Regev k=3 then k=2)

- **Claim** (anchor): "Kitaev showed this is $\mathrm{QMA}$-complete for $k = 5$; subsequent refinements pushed it down: Kempe–Kitaev–Regev showed $k = 3$, then $k = 2$"
- **Method**: external
- **Source**: Kitaev, Shen & Vyalyi, *Classical and Quantum Computation* (2002); Kempe, Kitaev & Regev (2006), *SIAM Journal on Computing* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.3 — 2-local Hamiltonian QMA-complete on 2D lattice (Oliveira–Terhal; Aharonov–Gottesman–Irani–Kempe)

- **Claim** (anchor): "the problem remains $\mathrm{QMA}$-complete for *geometrically local* Hamiltonians — terms involving only neighboring qubits on a 2D lattice — by results of Oliveira–Terhal and Aharonov–Gottesman–Irani–Kempe"
- **Method**: external
- **Source**: Oliveira & Terhal (2005); Aharonov, Gottesman, Irani & Kempe (2009) — TBD — needs verification (DOIs)
- **Verified**: — · **Verdict**: open

---

## §17.3 — Consistency of local density matrices QMA-complete (Liu)

- **Claim** (anchor): "**Consistency of local density matrices** (Liu)"
- **Method**: external
- **Source**: Liu, Y.-K. (2006), "Consistency of local density matrices is QMA-complete" — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.3 — Ground-state energy QMA-hard for translation-invariant 1D systems (Schuch–Verstraete 2024)

- **Claim** (anchor): "The 2024 result by Schuch–Verstraete showed that this remains $\mathrm{QMA}$-hard even for translation-invariant 1D systems with constant local dimension"
- **Method**: external
- **Source**: TBD — needs verification (Schuch & Verstraete, 2024; no arXiv/DOI confirmed)
- **Verified**: — · **Verdict**: open
- **Comment**: Year "2024" is a specific empirical claim about a recent publication; high priority for verification.

---

## §17.4 — IP = PSPACE (Shamir–Lund–Fortnow–Karloff–Nisan 1992)

- **Claim** (anchor): "Building on the arithmetization machinery of Lund–Fortnow–Karloff–Nisan, Shamir (1992) established $\mathrm{IP} = \mathrm{PSPACE}$"
- **Method**: external
- **Source**: Shamir (1992), "IP = PSPACE", *Journal of the ACM*; Lund, Fortnow, Karloff & Nisan (1992) — TBD — needs verification (DOIs)
- **Verified**: — · **Verdict**: open
- **Comment**: Multiple authors credited; attribution should be checked — Shamir's single-author paper is the canonical reference.

---

## §17.4 — QIP = PSPACE = IP (Jain–Ji–Upadhyay–Watrous 2010)

- **Claim** (anchor): "the Jain–Ji–Upadhyay–Watrous theorem (2010)"
- **Method**: external
- **Source**: Jain, Ji, Upadhyay & Watrous (2011), "QIP = PSPACE", *Journal of the ACM* — TBD — needs verification (DOI; note possible 2010/2011 date discrepancy)
- **Verified**: — · **Verdict**: open

---

## §17.4 — QIP = QIP(3): parallelization to three messages

- **Claim** (anchor): "$\mathrm{QIP} = \mathrm{QIP}(3)$: every quantum interactive proof can be parallelized down to three messages"
- **Method**: external
- **Source**: Kitaev & Watrous (2000), "Parallelization, amplification, and exponential time simulation of quantum interactive proof systems" — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.4 — MIP = NEXP (Babai–Fortnow–Lund)

- **Claim** (anchor): "Classically, $\mathrm{MIP} = \mathrm{NEXP}$ (Babai–Fortnow–Lund)"
- **Method**: external
- **Source**: Babai, Fortnow & Lund (1991), "Non-deterministic exponential time has two-prover interactive protocols", *Computational Complexity* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.4 — MIP* = RE (Ji–Natarajan–Vidick–Wright–Yuen 2020)

- **Claim** (anchor): "the **MIP\* = RE** theorem of Ji–Natarajan–Vidick–Wright–Yuen (2020)"
- **Method**: external
- **Source**: Ji, Natarajan, Vidick, Wright & Yuen (2021), "MIP* = RE", *Communications of the ACM* / arXiv:2001.04383 — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open
- **Comment**: Also claimed to resolve the Connes embedding problem negatively (see next entry).

---

## §17.4 — MIP* = RE resolves Connes embedding problem negatively

- **Claim** (anchor): "connects quantum complexity to the long-standing **Connes embedding problem** in operator algebras, which it resolved (negatively) as a consequence"
- **Method**: external
- **Source**: Ji, Natarajan, Vidick, Wright & Yuen (2021) — same paper as MIP* = RE above; TBD — needs verification
- **Verified**: — · **Verdict**: open

---

## §17.4 — QMA(2) ⊆ NEXP

- **Claim** (anchor): "it is known that $\mathrm{QMA}(2) \subseteq \mathrm{NEXP}$"
- **Method**: external
- **Source**: TBD — needs verification
- **Verified**: — · **Verdict**: open

---

## §17.5 — Raz–Tal (2019): BQP ⊄ PH relative to oracle

- **Claim** (anchor): "**Raz–Tal (2019)** demolished this. They exhibited an oracle relative to which $\mathrm{BQP}^O \not\subseteq \mathrm{PH}^O$"
- **Method**: external
- **Source**: Raz & Tal (2019), "Oracle separation of BQP and PH", *STOC 2019* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.5 — BQP^BQP = BQP

- **Claim** (anchor): "$\mathrm{BQP}^{\mathrm{BQP}} \;=\; \mathrm{BQP}$"
- **Method**: external
- **Source**: TBD — needs verification (standard result; often attributed to Bernstein & Vazirani or folklore)
- **Verified**: — · **Verdict**: open

---

## §17.6 — Polynomial method for query lower bounds (Beals–Buhrman–Cleve–Mosca–de Wolf)

- **Claim** (anchor): "**polynomial method** (Beals–Buhrman–Cleve–Mosca–de Wolf)"
- **Method**: external
- **Source**: Beals, Buhrman, Cleve, Mosca & de Wolf (2001), "Quantum lower bounds by polynomials", *Journal of the ACM* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.6 — Adversary bound (Ambainis; Høyer–Šálek)

- **Claim** (anchor): "**adversary bound** (Ambainis, Høyer–Šálek)"
- **Method**: external
- **Source**: Ambainis (2002); Høyer, Špalek (2005) — TBD — needs verification (DOIs; also note "Šálek" vs "Špalek" spelling)
- **Verified**: — · **Verdict**: open
- **Comment**: The source text spells "Høyer–Šálek"; this may be a variant spelling of Špalek; requires checking.

---

## §17.6 — Bernstein–Vazirani: 1 quantum vs Θ(n) classical queries

- **Claim** (anchor): "**Bernstein–Vazirani**: $1$ quantum query vs $\Theta(n)$ classical queries to recover a hidden $n$-bit string"
- **Method**: external
- **Source**: Bernstein & Vazirani (1997), "Quantum complexity theory", *SIAM Journal on Computing* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.6 — Simon: O(n) quantum vs Ω(2^{n/2}) classical queries

- **Claim** (anchor): "**Simon**: $O(n)$ quantum queries vs $\Omega(2^{n/2})$ classical queries for the hidden-XOR-period problem"
- **Method**: external
- **Source**: Simon (1997), "On the power of quantum computation", *SIAM Journal on Computing* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.6 — Grover matching lower bound (Bennett–Bernstein–Brassard–Vazirani)

- **Claim** (anchor): "**Grover**: $\Theta(\sqrt{N})$ quantum queries vs $\Theta(N)$ classical queries for unstructured search, with a matching lower bound (Bennett–Bernstein–Brassard–Vazirani)"
- **Method**: external
- **Source**: Bennett, Bernstein, Brassard & Vazirani (1997), "Strengths and Weaknesses of Quantum Computing", *SIAM Journal on Computing* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.6 — Forrelation separation (Aaronson 2010; Aaronson–Ambainis)

- **Claim** (anchor): "**Forrelation** (Aaronson 2010, refined by Aaronson–Ambainis): $\tilde{O}(1)$ vs $\tilde\Omega(N^{1/4})$"
- **Method**: external
- **Source**: Aaronson (2010); Aaronson & Ambainis (2015) — TBD — needs verification (DOIs)
- **Verified**: — · **Verdict**: open

---

## §17.6 — Negative-weight adversary method is tight for all boolean functions (Reichardt)

- **Claim** (anchor): "its **negative-weight** generalization (Høyer–Lee–Špalek) is tight for all functions (Reichardt)"
- **Method**: external
- **Source**: Reichardt (2011), "Reflections for quantum query algorithms"; Høyer, Lee & Špalek (2007) — TBD — needs verification (DOIs)
- **Verified**: — · **Verdict**: open

---

## §17.7 — Baker–Gill–Solovay (1975): oracles separating P and NP

- **Claim** (anchor): "Baker–Gill–Solovay (1975): oracles $A$ and $B$ exist with $\mathrm{P}^A = \mathrm{NP}^A$ and $\mathrm{P}^B \neq \mathrm{NP}^B$"
- **Method**: external
- **Source**: Baker, Gill & Solovay (1975), "Relativizations of the P=?NP question", *SIAM Journal on Computing* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.7 — BPP ≠ BQP relative to oracle (Bernstein–Vazirani 1993; Aaronson 2010)

- **Claim** (anchor): "$\mathrm{BPP} \neq \mathrm{BQP}$ relative to an oracle (Bernstein–Vazirani 1993; refined to a random oracle by Aaronson 2010)"
- **Method**: external
- **Source**: Bernstein & Vazirani (1997); Aaronson (2010) — TBD — needs verification (DOIs)
- **Verified**: — · **Verdict**: open

---

## §17.7 — QMA vs QCMA oracle separation (Aaronson–Kuperberg 2007)

- **Claim** (anchor): "Oracles separating $\mathrm{QMA}$ from $\mathrm{QCMA}$ (Aaronson–Kuperberg 2007)"
- **Method**: external
- **Source**: Aaronson & Kuperberg (2007), "Quantum versus classical proofs and advice" — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.8 — Quantum walks: n^{2/3} for element distinctness, n^{1.26} for triangle finding

- **Claim** (anchor): "Quantum walks giving $n^{2/3}$ for element distinctness, $n^{1.26\ldots}$ for triangle finding"
- **Method**: external
- **Source**: Ambainis (2007) for element distinctness; Le Gall (2014) or Magniez et al. for triangle finding — TBD — needs verification
- **Verified**: — · **Verdict**: open

---

## §17.8 — Monte Carlo O(√T) speedup (Montanaro 2015)

- **Claim** (anchor): "$O(\sqrt{T})$ speedups for Monte Carlo estimation (Montanaro 2015)"
- **Method**: external
- **Source**: Montanaro (2015), "Quantum speedup of Monte Carlo methods", *Proceedings of the Royal Society A* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.8 — Pell's equation / principal-ideal problem: Hallgren's quantum algorithm

- **Claim** (anchor): "Pell's equation, principal-ideal problem: super-polynomial under Hallgren's quantum algorithm"
- **Method**: external
- **Source**: Hallgren (2007), "Polynomial-time quantum algorithms for Pell's equation and the principal ideal problem", *Journal of the ACM* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.8 — BosonSampling (Aaronson–Arkhipov 2011)

- **Claim** (anchor): "**BosonSampling** (Aaronson–Arkhipov 2011): sampling from the output distribution of a linear-optical network on $n$ indistinguishable photons. Classical hardness follows from the conjectured `#P`-hardness of approximating permanents of Gaussian matrices"
- **Method**: external
- **Source**: Aaronson & Arkhipov (2011), "The computational complexity of linear optics", *STOC 2011* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.8 — IQP sampling hardness (Bremner–Jozsa–Shepherd)

- **Claim** (anchor): "**IQP sampling** (Bremner–Jozsa–Shepherd): sampling from "Instantaneous Quantum Polynomial" circuits"
- **Method**: external
- **Source**: Bremner, Jozsa & Shepherd (2011), "Classical simulation of commuting quantum computations implies collapse of the polynomial hierarchy" — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.8 — "quantum supremacy" coined by Preskill in 2012

- **Claim** (anchor): "A 2012 coinage by Preskill, **quantum supremacy** denoted any experimental task on a quantum device that no classical computer could replicate in reasonable time"
- **Method**: external
- **Source**: Preskill (2012), "Quantum computing and the entanglement frontier" — TBD — needs verification (exact year and venue)
- **Verified**: — · **Verdict**: open

---

## §17.8 — 2019 Google Sycamore: "ten thousand years" vs 200 seconds on 53-qubit RCS

- **Claim** (anchor): "The 2019 Google Sycamore experiment claimed an advantage of "ten thousand years of classical simulation" reduced to 200 seconds on a 53-qubit random-circuit sampling task"
- **Method**: external
- **Source**: Arute et al. (Google AI, 2019), "Quantum supremacy using a programmable superconducting processor", *Nature* 574, 505–510 — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.8 — IBM rebuttal: same task classically completable in days with tensor networks

- **Claim** (anchor): "IBM responded that with sufficient classical secondary storage and a tensor-network simulation, the same task could be classically completed in days rather than millennia"
- **Method**: external
- **Source**: Pednault et al. (IBM, 2019) — TBD — needs verification (arXiv or publication)
- **Verified**: — · **Verdict**: open

---

## §17.8 — Pan–Zhang–Chen tensor-network advances (2021–2022) reduced classical simulation cost

- **Claim** (anchor**: "the Pan–Zhang–Chen tensor-network advances of 2021–2022"
- **Method**: external
- **Source**: Pan & Zhang (2022); Chen et al. — TBD — needs verification (arXiv numbers/DOIs)
- **Verified**: — · **Verdict**: open

---

## §17.8 — Jiuzhang Gaussian-BosonSampling experiment (2020) and Jiuzhang 3.0 (2024)

- **Claim** (anchor): "The 2020 Chinese **Jiuzhang** Gaussian-BosonSampling experiment and the 2024 **Jiuzhang 3.0** refinements remain the strongest unrebutted advantage demonstrations"
- **Method**: external
- **Source**: Zhong et al. (2020), "Quantum computational advantage using photons", *Science* 370; Jiuzhang 3.0 — TBD — needs verification (2024 paper details)
- **Verified**: — · **Verdict**: open
- **Comment**: "Strongest unrebutted advantage demonstrations" is a comparative empirical claim about the state of the field as of the manuscript date; perishable.

---

## §17.10 — Shor's algorithm at RSA-2048: ~7 × 10⁹ Toffoli gates

- **Claim** (anchor): "Shor's algorithm at RSA-2048 sizes is roughly $7 \times 10^9$ Toffoli gates"
- **Method**: external
- **Source**: TBD — needs verification (likely Gidney & Ekerå (2021) or related resource-estimation paper)
- **Verified**: — · **Verdict**: open

---

## §17.10 — Shor RSA-2048 resource estimate: ~10 million physical qubits, ~10 hours (§15.3)

- **Claim** (anchor): "the corresponding $T$-count is what drives the $\sim 10$ million physical qubits, $\sim 10$ hour estimates of §15.3"
- **Method**: external
- **Source**: TBD — needs verification (cross-reference to §15.3's own factcheck entry)
- **Verified**: — · **Verdict**: open
- **Comment**: Numbers appear also in §15.3; that section's factcheck entry should be the primary anchor.

---

## §17.11 — Ω(N^{2/3}) lower bound for element distinctness (Aaronson–Shi)

- **Claim** (anchor): "$\Omega(N^{2/3})$ lower bound for element distinctness (Aaronson–Shi, matching Ambainis's walk)"
- **Method**: external
- **Source**: Aaronson & Shi (2004), "Quantum lower bounds for the collision and the element distinctness problems", *Journal of the ACM* — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.11 — Spectral-gap estimation undecidable (Cubitt–Pérez-García–Wolf 2015)

- **Claim** (anchor): "*Spectral-gap estimation* for local Hamiltonians is undecidable in some translation-invariant settings (Cubitt–Pérez-García–Wolf 2015)"
- **Method**: external
- **Source**: Cubitt, Pérez-García & Wolf (2015), "Undecidability of the spectral gap", *Nature* 528 — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.11 — Exact ground-state energy QMA_EXP-hard for translation-invariant 1D (Gottesman–Irani)

- **Claim** (anchor): "on translation-invariant 1D systems, *exact* ground-state energy is $\mathrm{QMA}_{\mathrm{EXP}}$-hard (Gottesman–Irani)"
- **Method**: external
- **Source**: Gottesman & Irani (2013), "The quantum and classical complexity of translationally invariant tiling and Hamiltonian problems" — TBD — needs verification (DOI)
- **Verified**: — · **Verdict**: open

---

## §17.12 — Tang (2018) dequantization of HHL recommendation-system algorithm

- **Claim** (anchor): "The 2018 **Tang dequantization** of the HHL-based recommendation system algorithm is the canonical case. Kerenidis–Prakash (2016) had shown an HHL-style algorithm for low-rank recommendation systems"
- **Method**: external
- **Source**: Tang (2019), "A quantum-inspired classical algorithm for recommendation systems", *STOC 2019*; Kerenidis & Prakash (2017) — TBD — needs verification (DOIs; note possible 2018/2019 date ambiguity for Tang)
- **Verified**: — · **Verdict**: open
- **Comment**: Manuscript says "2018" for Tang; the published STOC paper appeared 2019. The arXiv version (arXiv:1807.04271) is from 2018. Verify which date is intended.

---

## §17.13 — Gottesman–Knill theorem: stabilizer circuits efficiently classically simulable

- **Claim** (anchor): "Any quantum circuit built from $\\{H, S, \mathrm{CNOT}, \text{Pauli-basis measurement}\\}$, applied to a stabilizer initial state, is **efficiently classically simulable** (§8.10)"
- **Method**: external
- **Source**: Gottesman (1998), "The Heisenberg representation of quantum computers"; also Nielsen & Chuang, §10.5 — TBD — needs verification
- **Verified**: — · **Verdict**: open
- **Comment**: Cross-reference to §8.10 in same manuscript; result is also attributed there; external source still needs independent check.

---

## §17.13 — Matchgate circuits classically simulable (free-fermion / Jordan–Wigner)

- **Claim** (anchor): "Quantum circuits built from two-qubit gates of a specific form on a linear chain of qubits — corresponding to free-fermion dynamics under the Jordan–Wigner transform — are classically simulable in polynomial time"
- **Method**: external
- **Source**: Valiant (2002); Terhal & DiVincenzo (2002) — TBD — needs verification (DOIs)
- **Verified**: — · **Verdict**: open

---

## §17.13 — Area-law states admit efficient tensor-network simulation; DMRG

- **Claim** (anchor): "For gapped 1D systems, area laws come with rigorous MPS approximation and polynomial-time algorithms; in 2D an area law alone does *not* guarantee an efficiently contractible representation"
- **Method**: external
- **Source**: Hastings (2007) area-law theorem for 1D gapped systems; White (1992) for DMRG — TBD — needs verification (DOIs)
- **Verified**: — · **Verdict**: open
