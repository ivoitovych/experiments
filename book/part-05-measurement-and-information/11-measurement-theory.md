# Chapter 11. Measurement Theory

> **Status:** draft · **Phase:** 2 · **Sections drafted:** 8 / 8

[← Previous: Chapter 10](../part-04-gates-and-circuits/10-core-quantum-phenomena.md) · [Table of Contents](../../README.md) · [Next: Chapter 12 →](12-quantum-information-theory.md)

Chapter 5 introduced measurement as a postulate (§5.4): a finite collection of orthogonal projectors $\\{P_m\\}$ summing to the identity, returning outcome $m$ with probability $\langle\psi| P_m |\psi\rangle$ and collapsing the state to the corresponding projected ray. That picture is enough for almost every textbook quantum algorithm, but it is also strictly idealised. Real detectors are noisy, real measurement procedures sometimes have more outcomes than the system has orthogonal states, real experimenters care about extracting expectation values from finite samples, and real protocols sometimes need to know whether two candidate states can be distinguished at all. This chapter develops the operational machinery that addresses each of these: POVMs, Naimark dilation, tomography, classical shadows, state discrimination, sampling estimators, basis-rotation tricks for joint Pauli measurements, and readout-error mitigation.

> **How to read this chapter.** §§11.1–11.2 are the formal core: the projective measurement recap and the POVM generalisation. Read them in order. §11.3 (Naimark) connects the two formalisms and is short. §§11.4–11.5 (tomography, shadows) are the workhorse procedures for characterising an unknown state or process and recur throughout Parts 5 and 7. §11.6 (discrimination) is foundational for cryptography (Chapter 27) and for the operational interpretation of trace distance (Chapter 12). §11.7 (estimation, basis rotation, readout-error mitigation) is the practitioner's section — every variational algorithm, every benchmark, and every NISQ workflow leans on it.

## 11.1 Projective Measurement: Recap and Extensions

The projective measurement postulate (§5.4) describes a measurement by a complete family of orthogonal projectors $\\{P_m\\}$ with $P_m P_{m'} = \delta_{m m'} P_m$ and $\sum_m P_m = I$. Acting on a pure state $|\psi\rangle$, outcome $m$ occurs with probability $p(m) = \langle\psi| P_m |\psi\rangle$ and leaves the post-measurement state

$$
|\psi_m\rangle = \frac{P_m\\, |\psi\rangle}{\sqrt{p(m)}}.
$$

In density-matrix form (§5.10), the same rule is $p(m) = \mathrm{tr}(P_m\\, \rho)$ with post-measurement state $\rho_m = P_m\\, \rho\\, P_m / p(m)$. For a Hermitian observable $O = \sum_m \lambda_m P_m$, projective measurement of $O$ returns the eigenvalue $\lambda_m$ with probability $p(m)$, and the expectation value is the trace contraction

$$
\langle O\rangle = \mathrm{tr}(\rho\\, O) = \sum_m \lambda_m\\, p(m).
$$

Three structural features of the projective form are worth re-emphasising before generalising. First, the number of outcomes is bounded by the dimension of the Hilbert space — a projective measurement on $\mathbb{C}^d$ has at most $d$ outcomes, because there are at most $d$ mutually orthogonal nonzero projectors. Second, repeating the same projective measurement immediately gives the same outcome (the **repeatability** property): once collapsed onto the range of $P_m$, the state is an eigenstate of every $P_{m'}$ with eigenvalue $\delta_{m m'}$. Third, the post-measurement state lives in the range of $P_m$, which for a rank-one $P_m = |b_m\rangle\langle b_m|$ is a one-dimensional subspace — the measurement returns one classical outcome *and* prepares a known pure state.

Each of these features fails for the more general measurements one actually performs on hardware. A noisy single-qubit detector can have two outcomes whose Born probabilities deviate from the projective form. An ancilla-assisted measurement of a $d$-dimensional system can have arbitrarily many outcomes — limited by the ancilla, not by the system. A weak (partial) measurement on a single qubit can return a result without fully collapsing the state to a basis vector, leaving residual coherence. To handle these situations we need a strictly larger formalism, the POVM, and a separate prescription for the post-measurement state given by Kraus operators. Both are introduced in §11.2.

The cross-reference machinery: the circuit-level treatment of measurement is in §§9.6–9.9 (basis-change before $Z$ measurement, deferred measurement, mid-circuit measurement and feedforward). The expectation-value sampling estimator from §9.6 is the link from this chapter's operator algebra to the empirical workflow of §11.7.

## 11.2 POVMs and General Measurements

A **positive operator-valued measure** (POVM) is a family $\\{E_m\\}$ of positive semidefinite operators on $\mathcal{H}$ satisfying

$$
E_m \succeq 0 \quad \text{for every } m, \qquad \sum_m E_m = I.
$$

Each $E_m$ is called an **effect** or a **POVM element**. The outcome probability under state $\rho$ is

$$
p(m) = \mathrm{tr}(\rho\\, E_m),
$$

which is non-negative because $\rho \succeq 0$ and $E_m \succeq 0$, and sums to one because $\sum_m E_m = I$ and $\mathrm{tr}(\rho) = 1$. POVMs strictly generalise projective measurements: every set of orthogonal projectors is a POVM with $E_m = P_m$, but most POVMs are not projective. The number of outcomes is unbounded by the dimension — a qubit can support a POVM with three, four, six, or more outcomes (the symmetric informationally-complete POVM on a qubit — geometrically, the Bloch-tetrahedron POVM — has exactly four outcomes; the trine has three).

POVMs are the right object whenever you care only about the outcome statistics and not about the post-measurement state. When you do care about the post-measurement state, you need more structure: a family of **Kraus operators** $\\{M_m\\}$ with $E_m = M_m^\dagger M_m$. The Kraus form gives both the probability and the update rule:

$$
p(m) = \mathrm{tr}(M_m^\dagger M_m\\, \rho), \qquad \rho_m = \frac{M_m\\, \rho\\, M_m^\dagger}{p(m)}.
$$

Different choices of $M_m$ for the same $E_m$ correspond to physically distinct measurement implementations producing the same outcome statistics but different post-measurement states. The projective case is recovered by $M_m = P_m$ (so that $M_m^\dagger M_m = P_m^2 = P_m = E_m$); a *destructive* measurement that discards the system corresponds to $M_m = |0\rangle\langle\phi_m|$ for some collapse target $|0\rangle$.

Two canonical examples make the difference concrete. **Trine POVM on a qubit.** Define $|\psi_k\rangle$ for $k = 0, 1, 2$ as three unit vectors equispaced around a great circle on the Bloch sphere; take $E_k = \tfrac{2}{3} |\psi_k\rangle\langle\psi_k|$. These three rank-one positive operators sum to $I$ (check: each contributes $\tfrac{2}{3}$ along its axis, and three coplanar unit vectors at $120^\circ$ sum to zero, so the cross terms cancel and the diagonal terms sum to $I$). No projective measurement on a qubit has three outcomes; the trine is genuinely non-projective. **Unambiguous discrimination POVM.** To distinguish two non-orthogonal states $|\psi_0\rangle, |\psi_1\rangle$ with no error, one uses a three-outcome POVM $\\{E_0, E_1, E_?\\}$ where $E_0$ certifies $|\psi_0\rangle$, $E_1$ certifies $|\psi_1\rangle$, and $E_?$ is a hedge outcome — the measurement either tells you the state or admits failure (§11.6).

The single most useful feature of POVMs in practice is that they let one cleanly describe **noisy measurements** as a single operational primitive. A computational-basis measurement with readout error probability $\varepsilon$ — outcome $1$ when the qubit was $|0\rangle$ with probability $\varepsilon$, and vice versa — is the POVM $E_0 = (1-\varepsilon)|0\rangle\langle 0| + \varepsilon |1\rangle\langle 1|$, $E_1 = \varepsilon |0\rangle\langle 0| + (1-\varepsilon)|1\rangle\langle 1|$, which is not projective. §11.7 returns to this and to the calibration matrix that inverts it.

## 11.3 Naimark Dilation

POVMs feel like a strict generalisation of projective measurement, but in a precise sense they are not: **every POVM on $\mathcal{H}$ is the marginal of a projective measurement on a larger Hilbert space $\mathcal{H} \otimes \mathcal{H}_A$**. This is **Naimark's dilation theorem**, and it is the reason POVMs are physically realisable on hardware that only supports projective readout.

Concretely, given a POVM $\\{E_m\\}_{m=1}^M$ on $\mathcal{H}$, there exists an ancilla space $\mathcal{H}_A$, a pure ancilla state $|0\rangle_A$, a joint unitary $U$ on $\mathcal{H} \otimes \mathcal{H}_A$, and a projective measurement $\\{P_m\\}_{m=1}^M$ on the joint space such that, for every $\rho$ on $\mathcal{H}$,

$$
\mathrm{tr}(E_m\\, \rho) = \mathrm{tr}\bigl(P_m\\, U (\rho \otimes |0\rangle\langle 0|_A) U^\dagger\bigr).
$$

The right-hand side is a projective measurement on the dilated system — couple to a fresh ancilla, apply a unitary, then measure projectively. The left-hand side recovers the POVM outcome probability exactly. The ancilla dimension needed is at most equal to the number of POVM outcomes; for the trine POVM on a qubit, a single ancilla qubit suffices.

Naimark says three things at once. **Realisability.** Any POVM you can write down corresponds to a physically realisable measurement protocol: attach an ancilla, entangle, measure the ancilla (or the joint system) projectively. **Algorithm design.** Whenever an algorithm "uses a POVM", one is free to think of it as a unitary plus a standard readout on an extended register — the same primitive every quantum SDK already exposes. **Conceptual unification.** The POVM formalism is not exotic physics; it is the projective formalism viewed through the partial trace (§5.12). The same way a mixed state arises by tracing out part of a pure state, a POVM arises by ignoring part of a projective measurement on a larger system.

The dilation is not unique. Different choices of ancilla, unitary, and projective measurement can realise the same POVM with different post-measurement states; the choice that matters operationally is the Kraus representation of §11.2. Naimark guarantees existence of *a* dilation; the specific compilation onto hardware is an engineering question handled by the device's measurement subsystem.

## 11.4 State Tomography

A measurement on a single copy of $\rho$ returns a single classical outcome and (in general) destroys or perturbs the state. To **characterise** an unknown $\rho$ — to estimate every entry of its density matrix — one must measure many independent copies, each in a basis that probes a different component of $\rho$. This procedure is **quantum state tomography**.

The cleanest formulation uses the Pauli operator basis. The set $\\{P : P \in \\{I, X, Y, Z\\}^{\otimes n}\\}$ is a basis for the $4^n$-dimensional space of Hermitian operators on $n$ qubits, orthonormal under the Hilbert–Schmidt inner product $\langle A, B\rangle = \mathrm{tr}(A^\dagger B) / 2^n$. Any density matrix on $n$ qubits expands as

$$
\rho = \frac{1}{2^n} \sum_{P} \mathrm{tr}(P\\, \rho)\\, P,
$$

with $4^n$ coefficients. The identity coefficient is fixed at $\mathrm{tr}(\rho) = 1$, leaving $4^n - 1$ real parameters. **Single-qubit Pauli tomography** estimates each $\mathrm{tr}(P\\, \rho)$ by repeatedly preparing $\rho$, rotating into the eigenbasis of $P$, measuring in the computational basis, and averaging the resulting $\pm 1$ eigenvalues. For each Pauli, the variance of the empirical mean is bounded by $1/N$ where $N$ is the number of shots in that Pauli setting.

To estimate every component of $\rho$ on $n$ qubits to additive error $\varepsilon$, one needs at least $\Omega(4^n / \varepsilon^2)$ total measurements distributed across $4^n - 1$ Pauli settings. This **exponential scaling** is the central reason full tomography is restricted in practice to small systems — five or six qubits is comfortable, ten qubits is hard, twenty qubits is impossible without additional structure (low rank, matrix-product-state ansätze, compressed-sensing priors). The same scaling reappears in **process tomography**, which characterises an unknown channel $\Lambda$ by sending each of an informationally-complete set of $4^n$ input states through $\Lambda$, performing state tomography on each output, and reconstructing the $4^{2n}$ matrix elements of $\Lambda$ in the Pauli-transfer representation. Process tomography is therefore $4^n$-times costlier than state tomography in shot count.

The expense motivates a series of alternatives developed since the mid-2000s: **gate set tomography** (characterise gates and state preparation jointly, robust to SPAM error); **direct fidelity estimation** (estimate $\langle\psi|\rho|\psi\rangle$ to additive error with $O(1/\varepsilon^2)$ Pauli measurement *settings* drawn from an importance distribution, regardless of $n$ — with the total shot count $n$-independent for well-conditioned targets such as stabiliser states); **randomised benchmarking** (extract the average error per Clifford at constant cost; per-specific-gate figures need the interleaved variant). The next section introduces the most operational of these alternatives — classical shadows — which gives sample-efficient access to a *large set* of expectation values without ever reconstructing $\rho$ explicitly.

## 11.5 Classical Shadows

**Classical shadow tomography** (Huang–Kueng–Preskill, 2020) is a randomised-measurement protocol that produces, from a moderate number of shots, an estimator that can compute $\mathrm{tr}(O\\, \rho)$ for *any* observable $O$ in a pre-declared class. The headline result: $M$ observables $O_1, \ldots, O_M$ can be estimated to additive error $\varepsilon$ from

$$
N = O\!\left( \frac{\log M}{\varepsilon^2} \cdot \max_i \\|O_i\\|_{\mathrm{shadow}}^2 \right)
$$

samples, where $\\|O\\|_{\mathrm{shadow}}$ is a norm depending on the unitary ensemble used. For Pauli observables and random-Pauli measurements, $\\|O\\|_{\mathrm{shadow}}^2 \le 4^k$ for a $k$-local Pauli, so estimating any number of $k$-local Paulis is **independent of qubit number** $n$.

The protocol has three steps per shot. (i) Pick a random unitary $U$ from a fixed ensemble — commonly random global Cliffords or random tensor products of single-qubit Cliffords. (ii) Apply $U$ to $\rho$ and measure in the computational basis, obtaining a bit string $b$. (iii) Store the **classical shadow** $\hat\rho = \mathcal{M}^{-1}(U^\dagger |b\rangle\langle b| U)$, where $\mathcal{M}$ is a fixed linear "measurement channel" that depends on the unitary ensemble and that has a closed-form inverse on the support of the shadows. The shadow $\hat\rho$ is not a physical density matrix — it can be non-positive — but it is an unbiased estimator of $\rho$ in the sense that $\mathbb{E}[\hat\rho] = \rho$, so $\mathbb{E}[\mathrm{tr}(O\\, \hat\rho)] = \mathrm{tr}(O\\, \rho)$ for any $O$.

The key practical advantage is that the *shots are reused*: a single set of $N$ shadows can be queried for many different observables, not just the ones declared in advance — though the high-probability sample-complexity guarantee depends on the *class* of observables under consideration, so an unbounded or adversarially-chosen post-hoc query set can erase the advantage. This is the opposite trade-off from Pauli tomography, where each Pauli setting requires its own dedicated batch of shots. For variational algorithms that need expectation values of many Pauli terms in a Hamiltonian, shadows often reduce shot budgets by one to three orders of magnitude.

Two limitations worth flagging. First, the variance bound depends on the observables' shadow norm, which can be large for highly nonlocal observables — for a generic operator on $n$ qubits the shadow norm can be exponential. Second, the unitary ensemble must be physically implementable; random global Cliffords on $n$ qubits require circuit size (gate count) $\Theta(n^2/\log n)$ — and depth $O(n)$ — to compile, so for very large $n$ the random-Pauli ensemble (depth 1) is the default at the cost of worse scaling for nonlocal observables. Refinements (derandomised shadows, locally-biased shadows, neural-network shadow predictors) trade off these factors against ansatz structure.

## 11.6 State Discrimination

Given a quantum system known to be in one of two states — $\rho_0$ with prior probability $\pi_0$, or $\rho_1$ with prior probability $\pi_1 = 1 - \pi_0$ — what is the best measurement to decide which? This is the **quantum state discrimination** problem and it admits two canonical formulations.

**Minimum-error discrimination.** Choose a two-outcome POVM $\\{E_0, E_1\\}$ minimising the probability of misidentifying the state. The Holevo–Helstrom theorem gives the closed-form optimum: the minimum error probability is

$$
P_{\mathrm{err}}^{\min} = \frac{1}{2}\bigl(1 - \\|\pi_0\\, \rho_0 - \pi_1\\, \rho_1\\|_1\bigr),
$$

where $\\|A\\|_1 = \mathrm{tr}\sqrt{A^\dagger A}$ is the trace norm. Equivalently, the maximum success probability is $\tfrac{1}{2}(1 + \\|\pi_0\\, \rho_0 - \pi_1\\, \rho_1\\|_1)$. For equal priors $\pi_0 = \pi_1 = \tfrac{1}{2}$, the **Helstrom bound** reads

$$
P_{\mathrm{succ}}^{\max} = \frac{1}{2}\bigl(1 + \tfrac{1}{2}\\|\rho_0 - \rho_1\\|_1\bigr).
$$

The optimal measurement is the projective measurement onto the positive and negative eigenspaces of the operator $\pi_0\\, \rho_0 - \pi_1\\, \rho_1$. For orthogonal $\rho_0, \rho_1$ the trace norm $\\|\rho_0 - \rho_1\\|_1$ equals $2$ (trace distance $1$) and the discrimination succeeds with probability $1$; for identical states it is $0$ and discrimination is a coin flip. The trace distance therefore acquires the operational meaning **"bias of the best discriminator"**, which Chapter 12 generalises further.

**Unambiguous discrimination** (Ivanovic–Dieks–Peres). Insist that whenever the measurement returns "$\rho_0$" or "$\rho_1$", the answer is correct with probability $1$; the cost is a third outcome "$?$" admitting ignorance. For pure non-orthogonal states $|\psi_0\rangle, |\psi_1\rangle$ with overlap $c = \langle\psi_0|\psi_1\rangle$, the minimum inconclusive probability with equal priors is $P_? = |c|$, achieved by an explicit three-element POVM. For mixed states the precise condition is on *support*: unambiguous discrimination is possible iff neither state's support is contained in the other's. When one support is contained in the other (every outcome consistent with $\rho_0$ is also consistent with $\rho_1$), no measurement can certify $\rho_0$ versus $\rho_1$ with zero error.

Both formulations recur in cryptography. The Helstrom bound limits an eavesdropper's success at distinguishing the BB84 signal states (Chapter 27). Unambiguous discrimination is the operational primitive behind several conclusive quantum-key-distribution attacks. And the trace distance, central to minimum-error discrimination, is the natural metric for "two states are operationally close" — used in the cryptographic security proofs of Chapter 27.

## 11.7 Estimation, Joint Measurements, and Readout-Error Mitigation

The last operational layer to cover is how the projective and POVM formalisms connect to the empirical workflow of a real circuit run.

**Shot noise and expectation estimation.** A computational-basis measurement on $N$ identical copies of $\rho$ returns $N$ samples of a $\pm 1$-valued random variable with mean $\mathrm{tr}(Z\\, \rho)$ and variance $1 - \mathrm{tr}(Z\\, \rho)^2$. The empirical mean has standard error $\sqrt{(1 - \langle Z\rangle^2)/N} \le 1/\sqrt{N}$. To estimate any $\langle O\rangle$ to additive error $\varepsilon$ with confidence, one needs $N = \Omega(1/\varepsilon^2)$ shots per observable — the **shot-noise floor** of every quantum sampling estimator. For Hamiltonians with $M$ Pauli terms, naive estimation costs $O(M/\varepsilon^2)$, motivating the grouping and shadow techniques of §11.5.

**Basis rotation for Pauli strings.** To measure an $n$-qubit Pauli string $P = P_1 \otimes \cdots \otimes P_n$ on hardware that natively measures $Z^{\otimes n}$, apply a single-qubit basis-change gate to each qubit ($H$ for $X$, $H S^\dagger$ for $Y$, identity for $Z$, no gate for $I$), measure in the computational basis, and combine outcomes via $(\pm 1)$-parity: the eigenvalue of $P$ on the measured bit string $b = (b_1, \ldots, b_n)$ is $\prod_{i : P_i \neq I} (-1)^{b_i}$. The cost is one shot per Pauli-string setting. **Joint measurability** of two Paulis $P$ and $Q$ in a single shot is possible whenever they commute ($[P, Q] = 0$). The *qubit-wise commuting* subcase — every pair $(P_i, Q_i)$ commutes — is exactly when the joint diagonalisation is a tensor product of *single-qubit* unitaries, and this is what Pauli-grouping algorithms (cliques) target so the basis-change layer stays single-qubit. Globally commuting strings that are not qubit-wise commuting can still be jointly measured, but the joint diagonalisation requires an entangling Clifford layer and so trades single-shot economy for extra two-qubit-gate depth.

**Parameter-shift rule.** For parameterised gates $R_P(\theta) = e^{-i \theta P / 2}$ with Pauli generator $P$, the gradient of an expectation value $\langle O\rangle(\theta) = \mathrm{tr}(O\\, \rho(\theta))$ obeys

$$
\frac{\partial \langle O\rangle}{\partial \theta} = \tfrac{1}{2}\bigl(\langle O\rangle(\theta + \tfrac{\pi}{2}) - \langle O\rangle(\theta - \tfrac{\pi}{2})\bigr),
$$

an exact finite-difference formula that requires no extra calculus and no ancilla. Each gradient component costs two extra circuit evaluations at shifted parameters, each accumulating its own shot noise. The parameter-shift rule is the workhorse of variational quantum algorithms (Chapter 15) and a direct consequence of the operator algebra of §5.6.

**Readout-error mitigation.** A noisy classical readout is a POVM (§11.2) with effects $E_b = \sum_{b'} A_{b b'} |b'\rangle\langle b'|$, where $A$ is the **calibration matrix** with entries $A_{b b'} = \Pr(\text{measure } b \mid \text{state is } |b'\rangle)$. Estimating $A$ is a one-time calibration: prepare each computational-basis state $|b'\rangle$, measure, and collect the empirical conditional distribution. To mitigate, invert $A$ on the observed outcome histogram: if $\hat q$ is the noisy outcome distribution and $A$ is the calibration matrix, then $\hat p = A^{-1} \hat q$ is the corrected estimate of the underlying Born distribution. Variants regularise the inversion ($A^{-1}$ can be ill-conditioned), enforce non-negativity (via maximum-likelihood reweighting), or apply the correction at the operator level (multiplying the expectation estimator by a per-shot reweighting). Naive calibration takes $2^n$ circuits and the matrix inversion of $A$ is $O(2^{3n})$; tensor-product readout models reduce calibration to $2n$ circuits (two per qubit) and apply the factorised inverse in $O(n \cdot 2^n)$ time when single-qubit readout errors are independent — usually a reasonable approximation on modern hardware. Without readout-error mitigation, the readout layer often dominates the residual error budget of an otherwise well-compiled circuit.

The methods of this section apply to every variational, hybrid, and benchmark workflow in the rest of the book. Chapter 15 (variational algorithms) leans on parameter-shift and Pauli grouping; Chapter 18 (noise channels) generalises readout error to coherent errors and amplitude damping; Chapter 25 (benchmarking) builds randomised benchmarking and direct fidelity estimation on top of the same shot-noise floor.

---

## 11.8 Bridge to Chapter 12

This chapter promoted the measurement postulate from §5.4 to the full operational toolkit: POVMs and Kraus operators for general measurement, Naimark dilation to realise POVMs projectively, state and process tomography for full characterisation, classical shadows for sample-efficient expectation estimation, the Helstrom bound for two-state discrimination, and the practitioner's layer of basis rotation, parameter shift, and readout-error mitigation. Chapter 12 takes these operational primitives as input and develops the information-theoretic quantities they underwrite: trace distance and fidelity as measures of state closeness, von Neumann entropy and relative entropy as measures of information content, the Holevo bound on classical-information extraction, and entanglement measures derived from the partial-trace structure of §5.12. The Helstrom bound's appearance in §11.6 as the operational meaning of trace distance is the link: every information measure in Chapter 12 has a discrimination-theoretic interpretation, and the tomography and shadow protocols of this chapter are how those measures get estimated in practice.

**Sanity checks before moving on.**

1. Verify that the trine POVM $E_k = \tfrac{2}{3}|\psi_k\rangle\langle\psi_k|$ with three equispaced $|\psi_k\rangle$ on a great circle satisfies $\sum_k E_k = I$. *Hint:* write each $|\psi_k\rangle\langle\psi_k| = \tfrac{1}{2}(I + \vec n_k \cdot \vec\sigma)$ with unit $\vec n_k$ at $120^\circ$ in a plane; then $\sum_k \vec n_k = 0$ gives $\sum_k E_k = I$. Confirm that no projective measurement on a qubit has three outcomes.
2. For two pure single-qubit states with overlap $\langle\psi_0|\psi_1\rangle = c \in (0, 1)$, compute the Helstrom success probability under equal priors and verify it equals $\tfrac{1}{2}(1 + \sqrt{1 - |c|^2})$.
3. Write the readout-error POVM $\\{E_0, E_1\\}$ for a single qubit with symmetric readout error $\varepsilon$, and verify $E_0 + E_1 = I$. Show that the corresponding calibration matrix $A$ becomes singular as $\varepsilon \to 1/2$.
4. Apply the parameter-shift rule to a single-qubit circuit $R_Y(\theta) |0\rangle$ measured in $Z$, and check that the analytical derivative of $\cos\theta$ matches the shifted-evaluation formula.
5. For a two-qubit Pauli string $X \otimes Z$, write the qubit-wise basis-change circuit that maps the measurement onto a computational-basis readout, and identify the $\pm 1$-parity formula that recovers $\langle X \otimes Z\rangle$.

---

[← Previous: Chapter 10](../part-04-gates-and-circuits/10-core-quantum-phenomena.md) · [Table of Contents](../../README.md) · [Next: Chapter 12 →](12-quantum-information-theory.md)
