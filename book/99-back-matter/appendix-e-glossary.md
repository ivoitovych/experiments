# Appendix E. Glossary

> **Status:** draft · **Phase:** 6 · **Sections drafted:** 7 / 7

[← Previous: Appendix D. Suggested Reading and Reference Papers](appendix-d-suggested-reading.md) · [Table of Contents](../../README.md) · [Next: Appendix F. 2026 Hardware Snapshot →](appendix-f-hardware-snapshot-2026.md)

This glossary collects book-specific definitions for the terms that recur
throughout the manuscript. Entries are short by design: a one-line
definition plus a cross-reference to the chapter section where the term is
developed. For *symbols* (kets, bras, norms, partial trace, expectation
brackets, …) see [Appendix A](appendix-a-notation-reference.md); for the
*matrices* of common gates see
[Appendix B](appendix-b-common-gates.md); for *identities and
decompositions* see [Appendix C](appendix-c-identities-and-decompositions.md).
Where a term has several distinct technical senses (most prominently
"state" and "projector") the senses are split into separate sub-entries.

The format favours bullet lists over Markdown tables. Many entries contain
literal `|` characters (kets, norms, conditional probabilities), and `|`
collides with the Markdown table-column separator (Bug 5 in
[`docs/github-markdown-math-bugs.md`](../../docs/github-markdown-math-bugs.md));
matrices and other multi-line math are kept as display blocks for the same
reason.

## E.1 Core Terms

General concepts a reader meets in the first few chapters. Each entry
gives the operational meaning used in this book; the formal treatment
lives in the referenced section.

- **Amplitude.** A complex number $c$ attached to a basis ket
  $|x\rangle$ in a superposition $|\psi\rangle = \sum_x c_x\\, |x\rangle$.
  Amplitudes interfere; their squared moduli $|c_x|^2$ give measurement
  probabilities. See §4.1 and §5.7.
- **Ancilla.** A workspace qubit (or register) prepared in a known
  state, used to implement a non-unitary effect coherently (e.g.,
  measurement, garbage collection) and then either discarded,
  uncomputed, or measured. See Chapter 9.
- **Basis.** An orthonormal set $\\{|b_i\rangle\\}$ that spans the
  Hilbert space. The **computational basis** $\\{|x\rangle : x \in \\{0,1\\}^n\\}$
  is the default reference frame throughout the book. See §4.3 and §4.10.
- **Born rule.** Probability of outcome $\lambda$ in a projective
  measurement on a normalized pure state is
  $p(\lambda) = \langle\psi|P_\lambda|\psi\rangle$; for a density
  matrix it is $\mathrm{tr}(\rho\\, P_\lambda)$. See §5.4.
- **Circuit.** A composition of gates and measurements acting on a
  fixed register; the diagrammatic and the algebraic
  $U = U_L \cdots U_2 U_1$ representations are interchangeable, modulo
  the left-to-right time convention of §A.5. See Chapter 9.
- **Collapse.** The state update rule that replaces $|\psi\rangle$
  with the renormalized post-measurement state
  $P_\lambda |\psi\rangle / \sqrt{p(\lambda)}$ after outcome $\lambda$.
  An ingredient of the measurement postulate, not a physical process
  separate from it. See §5.4.
- **Decoherence.** The loss of coherence (off-diagonal density-matrix
  entries) caused by entanglement with an inaccessible environment.
  The dominant practical obstruction to large-scale quantum
  computation. See Chapter 18.
- **Entanglement.** A bipartite (or multipartite) pure state is
  entangled when it is not a product
  $|\psi\rangle \ne |\alpha\rangle \otimes |\beta\rangle$; for mixed
  states it is non-separability of the density matrix. Detected by
  Schmidt rank $> 1$ on pure states. See §5.5 and Chapter 7.
- **Fidelity.** A similarity measure between quantum states. This book
  uses the *unsquared* convention (matching §12.7): for pure states,
  $F(|\psi\rangle, |\phi\rangle) = |\langle\phi|\psi\rangle|$; for density
  matrices, the generalised Uhlmann fidelity
  $F(\rho, \sigma) = \mathrm{tr}\sqrt{\sqrt{\rho}\\, \sigma \sqrt{\rho}}$.
  Both range over $[0, 1]$. See §12.7.
- **Gate.** A unitary operator applied to one or a few qubits in a
  circuit. Common gates are catalogued in
  [Appendix B](appendix-b-common-gates.md). See Chapter 8.
- **Hermitian operator.** An operator $A$ with $A^\dagger = A$.
  Eigenvalues are real and eigenvectors of distinct eigenvalues are
  orthogonal. Observables are Hermitian. See §4.5.
- **Measurement.** Extraction of classical information from a
  quantum register; modelled in this book by a projective measurement
  of a Hermitian observable, generalised to POVMs in Chapter 11.
  See §5.4.
- **Normalisation.** The condition $\langle\psi|\psi\rangle = 1$ for
  a pure state; equivalently $\mathrm{tr}(\rho) = 1$ for a density
  matrix. Required for the Born rule to deliver a probability
  distribution. See §4.3.
- **Observable.** A Hermitian operator whose eigenvalues are the
  possible outcomes of a measurement. The spectral decomposition
  supplies the projectors used in the Born rule. See §5.6.
- **Probability.** The squared modulus $|c_x|^2$ of an amplitude
  under the Born rule. Distinct from a classical probability in that
  it arises from a squared-norm of a complex vector, which is what
  makes interference possible. See §4.1 and §5.7.
- **Projector.** An operator $P$ with $P^\dagger = P$ and $P^2 = P$.
  In this book "projector" in a measurement context always means an
  *orthogonal* projector. See §4.5.
- **Quantum channel.** A completely positive trace-preserving (CPTP)
  linear map on density matrices; the most general physically
  realizable state evolution, including noise and measurement.
  See Chapter 12 and Chapter 18.
- **Qubit.** A two-level quantum system; abstractly, a unit vector in
  $\mathbb{C}^2$ modulo global phase, or equivalently a point on the
  Bloch sphere. See Chapter 6.
- **Ray.** An equivalence class of nonzero vectors that differ by a
  global phase $e^{i\theta}$. A pure quantum state is properly a ray,
  not a vector; the choice of representative is conventional. See
  §5.8.
- **Register.** A named group of qubits treated as a single
  multi-qubit subsystem (e.g., "the input register", "the ancilla
  register"). See Chapter 9.
- **State.** Used in three distinct senses in this book:
  - **State (ray).** The physical state: an equivalence class of
    normalized vectors modulo global phase. See §5.8.
  - **State (density matrix).** A positive semidefinite operator
    $\rho$ with $\mathrm{tr}(\rho) = 1$; covers pure and mixed
    states uniformly and is the right object for subsystems. See
    §5.10.
  - **State (vector representation).** A specific normalized column
    vector chosen to represent a ray once a basis is fixed; what
    Qiskit's `Statevector` returns. See §4.12.
- **Superposition.** A linear combination
  $|\psi\rangle = \sum_x c_x\\, |x\rangle$ of basis kets with at least
  two nonzero amplitudes. Basis-dependent: every nonzero state is a
  superposition in *some* basis. See §4.1 and §5.7.
- **Unitary operator.** An operator $U$ with $U^\dagger U = U U^\dagger = I$.
  Closed-system evolution is unitary; gates are unitaries on a fixed
  register. See §4.5.

## E.2 Mathematical Terms

The linear-algebra vocabulary used throughout the book. Each entry
points back to the Chapter 4 section where it is established.

- **Anticommutator.** $\\{A, B\\} = AB + BA$. The Pauli operators
  satisfy $\\{\sigma_i, \sigma_j\\} = 2\\, \delta_{ij}\\, I$. See §4.5.
- **Commutator.** $[A, B] = AB - BA$. Two operators commute when
  $[A, B] = 0$; simultaneously diagonalisable normal operators
  commute. See §4.5.
- **Condition number.** $\kappa(A) = \sigma_{\max}(A) / \sigma_{\min}(A)$,
  the ratio of largest to smallest singular value. Controls
  numerical stability of inversion and the runtime of HHL-type
  algorithms. See §4.9.
- **Density matrix.** Positive semidefinite operator $\rho$ with
  $\mathrm{tr}(\rho) = 1$. Represents pure ($\rho^2 = \rho$) and
  mixed ($\rho^2 \ne \rho$) states uniformly. See §5.10.
- **Eigenspace.** The subspace $\\{v : Av = \lambda v\\}$ associated
  with eigenvalue $\lambda$ of $A$. Its dimension is the
  **geometric multiplicity** of $\lambda$. See §4.6.
- **Eigenvalue.** A scalar $\lambda$ such that $Av = \lambda v$ for
  some nonzero $v$. Eigenvalues of Hermitian operators are real; of
  unitary operators, unit-modulus complex numbers. See §4.6.
- **Eigenvector.** A nonzero vector $v$ with $Av = \lambda v$ for
  some scalar $\lambda$. Eigenvectors of a normal operator from
  distinct eigenvalues are orthogonal. See §4.6.
- **Functional calculus.** Given a normal operator $A = \sum_i \lambda_i\\, P_i$
  and a function $f$ defined on the spectrum,
  $f(A) = \sum_i f(\lambda_i)\\, P_i$. The basis for matrix
  exponentials, square roots, and logarithms used throughout the
  book. See §4.7.
- **Hilbert space.** A complete inner-product space over
  $\mathbb{C}$. In this book all Hilbert spaces are
  finite-dimensional unless explicitly stated otherwise; "Hilbert
  space" is then synonymous with "finite-dimensional inner-product
  space". See §4.11.
- **Hilbert–Schmidt norm.** $\\|A\\|_{\mathrm{HS}} = \sqrt{\mathrm{tr}(A^\dagger A)}$,
  the Frobenius norm of $A$ regarded as a matrix. Induced by the
  Hilbert–Schmidt inner product $\langle A, B\rangle_{\mathrm{HS}} = \mathrm{tr}(A^\dagger B)$. See §4.4.
- **Inner product.** A sesquilinear, positive-definite pairing
  $\langle \cdot , \cdot \rangle$. This book uses the physicists'
  convention: conjugate-linear in the first argument, linear in the
  second. See §4.3.
- **Kronecker product.** The matrix realisation of $A \otimes B$
  obtained by tiling: $(A \otimes B)_{(i,k),(j,\ell)} = A_{ij}\\, B_{k\ell}$.
  See §4.8.
- **Norm.** $\\|v\\| = \sqrt{\langle v, v\rangle}$ for vectors; for
  operators, the operator norm $\\|A\\|$ unless a subscript names
  another. See §4.3.
- **Operator norm.** $\\|A\\| = \sigma_{\max}(A)$, the largest
  singular value of $A$. Equivalently $\\|A\\| = \sup_{\\|v\\| = 1} \\|Av\\|$.
  See §4.9.
- **Partial trace.** The linear map $\mathrm{tr}_W$ that takes a
  bipartite operator on $V \otimes W$ to an operator on $V$ by
  contracting the $W$ index. Produces reduced density matrices.
  See §5.12.
- **Positive semidefinite.** An operator $A$ with $A^\dagger = A$
  and $\langle v | A | v\rangle \ge 0$ for all $v$. Density matrices
  are positive semidefinite. Written $A \succeq 0$. See §4.5.
- **Projector.** As an algebraic object: $P^\dagger = P$, $P^2 = P$.
  Distinguish: a *rank-one* projector $|\psi\rangle\langle\psi|$
  represents the pure state $|\psi\rangle$; an *eigenspace* projector
  $P_\lambda$ implements measurement of an observable. See §4.5.
- **Schmidt decomposition.** For a bipartite pure state,
  $|\psi\rangle_{AB} = \sum_i \sqrt{p_i}\\, |a_i\rangle |b_i\rangle$
  with $\\{|a_i\rangle\\}$, $\\{|b_i\rangle\\}$ orthonormal and
  $p_i \ge 0$. The number of nonzero $p_i$ is the **Schmidt rank**;
  Schmidt rank $> 1$ certifies entanglement. See §4.9 and Chapter 7.
- **Spectral decomposition.** For a normal operator,
  $A = \sum_i \lambda_i\\, P_i$ with $P_i$ orthogonal projectors onto
  eigenspaces satisfying $\sum_i P_i = I$ and $P_i P_j = \delta_{ij}\\, P_i$.
  The single most-used identity in the book. See §4.7.
- **SVD.** Singular value decomposition: for any
  $A \in \mathbb{C}^{m \times n}$, $A = U \Sigma V^\dagger$ with
  $U, V$ unitary and $\Sigma$ diagonal with nonnegative entries
  ordered $\sigma_1 \ge \sigma_2 \ge \cdots \ge 0$ — the
  **singular values** of $A$. See §4.9.
- **Tensor product.** The bilinear operation $V \otimes W$ on vector
  spaces (and analogously on vectors and operators) used to combine
  subsystems. See §4.8.
- **Trace.** $\mathrm{tr}(A) = \sum_i A_{ii}$. Basis-independent;
  cyclic: $\mathrm{tr}(AB) = \mathrm{tr}(BA)$. See §4.4.
- **Trace norm.** $\\|A\\|_1 = \mathrm{tr}\sqrt{A^\dagger A} = \sum_i \sigma_i$.
  Underlies trace distance
  $D(\rho, \sigma) = \tfrac{1}{2}\\|\rho - \sigma\\|_1$ between
  density matrices. See §4.9 and Chapter 12.

## E.3 Algorithmic Terms

Algorithm-level vocabulary used in Parts 6 and 8. The brief
definitions here support cross-references from earlier chapters;
detailed treatment lives in Chapters 14–16.

- **Amplitude amplification.** A generalisation of Grover search
  that boosts the success amplitude of a chosen subspace from $a$ to
  near $1$ in $O(1/a)$ oracle calls, against the $O(1/a^2)$
  classical sampling cost. See Chapter 14.
- **Amplitude estimation.** Estimates the amplitude $a$ of a marked
  subspace to additive error $\epsilon$ in $O(1/\epsilon)$ oracle
  calls — a quadratic improvement over $O(1/\epsilon^2)$ classical
  sampling. See Chapter 14.
- **Block encoding.** A way of embedding a (possibly non-unitary)
  operator $A$ as a sub-block of a larger unitary $U$, so that
  $\langle 0| U |0\rangle = A / \alpha$ for some subnormalisation
  $\alpha \ge \\|A\\|$. The standard interface to QSVT. See
  Chapter 16.
- **Grover search.** Finds a marked item in an unstructured search
  space of size $N$ in $O(\sqrt{N})$ oracle queries, against the
  classical $\Theta(N)$. See Chapter 15.
- **HHL.** The Harrow–Hassidim–Lloyd quantum linear-system
  algorithm. Prepares a state proportional to $A^{-1}|b\rangle$ in
  time scaling polylogarithmically in dimension and polynomially in
  $\kappa$ and $1/\epsilon$, under demanding input/output access
  assumptions. See Chapter 15.
- **Hamiltonian simulation.** Implementing $e^{-iHt}$ as a quantum
  circuit to specified precision. Foundational subroutine for phase
  estimation, quantum chemistry, and most "quantum advantage in
  physics" applications. See Chapter 16 and Chapter 28.
- **Oracle.** A black-box unitary $U_f$ implementing
  $|x\rangle|y\rangle \mapsto |x\rangle|y \oplus f(x)\rangle$ (or a
  phase variant). Query complexity counts oracle calls. See
  Chapter 14.
- **Phase estimation.** Estimates the eigenphase $\varphi$ of an
  eigenvector of a unitary $U$ (i.e., $U|\psi\rangle = e^{2\pi i \varphi}|\psi\rangle$)
  to $n$ bits using $O(2^n)$ controlled-$U$ calls. The workhorse
  primitive of Shor, HHL, and chemistry. See Chapter 14.
- **QAOA.** Quantum Approximate Optimization Algorithm. A
  variational hybrid algorithm for combinatorial optimisation built
  from alternating problem and mixer Hamiltonians. See Chapter 15.
- **QFT.** Quantum Fourier transform on $N = 2^n$ dimensions. This
  book uses the negative-exponent convention
  $F_N |j\rangle = \tfrac{1}{\sqrt{N}} \sum_k \omega^{-jk}\\, |k\rangle$
  with $\omega = e^{2\pi i / N}$. Qiskit's `QFTGate` uses the
  opposite sign. See §4.13.
- **QSP.** Quantum signal processing. A single-qubit framework that
  realises polynomial transformations of a scalar parameter
  embedded in a rotation. The scalar-version building block of
  QSVT. See Chapter 16.
- **QSVT.** Quantum singular value transformation. Applies a
  polynomial $p$ to the singular values of an operator $A$ encoded
  in a block-encoded unitary. Unifies Hamiltonian simulation,
  amplitude amplification, HHL, and many other primitives. See
  Chapter 16.
- **Qubitization.** A walk-operator construction that converts a
  block encoding of a Hermitian $H$ into a unitary whose eigenphases
  encode the eigenvalues of $H$. The optimal known route to
  Hamiltonian simulation. See Chapter 16.
- **Query complexity.** The minimum number of oracle calls a
  (quantum or classical) algorithm needs to solve a problem. The
  setting in which the Grover speedup is provably quadratic. See
  Chapter 14 and Chapter 17.
- **Shor's algorithm.** Integer factoring in polynomial time on a
  fault-tolerant quantum computer. Reduces factoring to order
  finding, which is solved by phase estimation on the modular
  multiplication unitary. See Chapter 15 and Chapter 27.
- **Trotterisation.** A product-formula approximation of $e^{-iHt}$
  for $H = \sum_j H_j$, e.g., $e^{-iHt} \approx (e^{-iH_1 t/r} \cdots e^{-iH_k t/r})^r$
  for large $r$, with controlled error. See Chapter 16.
- **VQE.** Variational Quantum Eigensolver. A hybrid
  classical–quantum algorithm that minimises
  $\langle \psi(\theta) | H | \psi(\theta)\rangle$ over a
  parameterised circuit ansatz to estimate the ground-state energy
  of $H$. See Chapter 15.

## E.4 Hardware Terms

Vocabulary for physical realisations and their device-level metrics.
Detailed treatment lives in Part 9 (Chapters 20–22).

- **Calibration.** The periodic procedure of measuring drift in
  qubit frequencies, gate amplitudes, and readout discriminators,
  and updating the pulse-level parameters that compensate.
  See Chapter 21.
- **Coherence time T1.** The energy-relaxation time scale: the
  characteristic time for a $|1\rangle$ population to decay to
  $|0\rangle$ via spontaneous emission. See Chapter 18 and
  Chapter 22.
- **Connectivity.** The graph of which qubit pairs admit a native
  two-qubit gate. Compilation inserts SWAP networks to route
  long-range gates across this graph. See Chapter 20 and
  Chapter 23.
- **Cross-talk.** Unintended coupling between qubits or between
  control lines that causes a gate on one qubit to perturb another.
  A dominant systematic error on superconducting and neutral-atom
  hardware. See Chapter 22.
- **Dephasing time T2.** The phase-coherence time scale; the decay
  of off-diagonal density-matrix elements. Always satisfies
  $T_2 \le 2 T_1$. The pure-dephasing component is denoted
  $T_\varphi$ with $1/T_2 = 1/(2 T_1) + 1/T_\varphi$. See Chapter 18.
- **Gate fidelity.** Average fidelity between the ideal and
  implemented unitary, typically measured by randomized
  benchmarking. Per-gate error rates of $10^{-3}$ to $10^{-4}$ are
  the state of the art as of 2026. See Chapter 22.
- **Native gate set.** The small set of gates a given hardware
  platform actually implements at the pulse level. Every higher-level
  gate is compiled into this set. See Chapter 20 and Chapter 23.
- **Neutral atom.** Qubit platform encoding states in hyperfine or
  Rydberg levels of neutral atoms trapped in optical tweezer arrays.
  Two-qubit gates use Rydberg blockade. See Chapter 20.
- **Photonic qubit.** Qubit platform encoding states in
  modes of light (polarisation, time-bin, dual-rail). Naturally
  long-coherence but with probabilistic two-qubit gates in the
  measurement-based regime. See Chapter 20.
- **Pulse.** The time-domain microwave or laser waveform that
  implements a gate at the physical level. Pulse-level control
  (parametric shapes, DRAG corrections) sits below the
  gate-circuit abstraction. See Chapter 21.
- **Readout fidelity.** Probability that a measurement returns the
  correct classical outcome on a known eigenstate. Distinct from
  gate fidelity and often the dominant noise source for short
  circuits. See Chapter 22.
- **Shot.** A single end-to-end execution of a circuit producing one
  set of measurement outcomes. Observable expectations are
  estimated by averaging over many shots. See Chapter 9 and
  Chapter 26.
- **Superconducting qubit.** Qubit platform encoding states in
  quantised modes of a nonlinear LC circuit cooled to milli-kelvin
  temperatures (transmon, fluxonium). See Chapter 20.
- **Topological qubit.** Proposed qubit platform encoding states
  non-locally in topological degrees of freedom (e.g., Majorana
  zero modes), with the goal of intrinsic protection from local
  noise. See Chapter 20.
- **Trapped ion.** Qubit platform encoding states in internal
  electronic or hyperfine levels of ions confined in
  electromagnetic traps. Two-qubit gates couple via shared
  motional modes. See Chapter 20.

## E.5 Error-Correction Terms

Vocabulary for fault-tolerant quantum computing. Treatment in
Chapter 19; physical noise sources are covered in Chapter 18.

- **Code distance.** The minimum weight of an undetectable logical
  error; for a code with parameters $[[n, k, d]]$ the distance $d$
  controls how many physical errors can be corrected
  ($\lfloor (d-1)/2 \rfloor$). See Chapter 19.
- **Decoder.** The classical algorithm that takes a stream of
  syndrome measurements and infers a correction (or, for surface
  codes, a Pauli frame update). Common families: minimum-weight
  perfect matching, union-find, neural-network decoders. See
  Chapter 19.
- **Depolarising channel.** Noise model
  $\mathcal{E}(\rho) = (1 - p)\\, \rho + (p/3)(X\rho X + Y\rho Y + Z\rho Z)$
  for a single qubit; the standard analytic stand-in for "uniformly
  random Pauli noise". (Note the parameterisation: §10.12's Kraus
  form uses $1 - 3p'/4$ and $p'/4$ per Pauli, so $p_{\text{here}} = 3p'/4$;
  both conventions are standard — check which one a source means.) See Chapter 18.
- **Error budget.** The allocation of allowable logical error
  across components of a fault-tolerant computation (gates, idle
  qubits, magic-state distillation, routing). The accounting
  framework that turns a desired logical success probability into
  per-component noise targets. See Chapter 19.
- **Fault tolerance.** A circuit design in which a single physical
  fault produces at most one error per code block, so errors do not
  proliferate uncontrollably through a long computation. See
  Chapter 19.
- **Lattice surgery.** A surface-code technique that performs
  logical multi-qubit operations by merging and splitting code
  patches on a 2D lattice, avoiding transversal-gate restrictions.
  See Chapter 19.
- **Logical qubit.** A qubit encoded into many physical qubits via
  an error-correcting code; the abstraction the algorithmic layer
  programs against. See Chapter 19.
- **Magic state.** A specific non-stabiliser resource state (e.g.,
  $|T\rangle = T|+\rangle$) that, when injected by gate
  teleportation, implements a non-Clifford gate fault-tolerantly.
  See Chapter 19.
- **Pauli noise.** Noise channels of the form
  $\mathcal{E}(\rho) = \sum_{P} p_P\\, P \rho P^\dagger$ where $P$
  ranges over tensor products of Pauli operators. The standard
  analytical assumption underlying threshold and overhead estimates.
  See Chapter 18.
- **Stabiliser.** A Pauli operator $S$ with $S|\psi\rangle = |\psi\rangle$
  for every codeword $|\psi\rangle$. The stabiliser group of a code
  generates the syndrome operators measured during error correction.
  See Chapter 19.
- **Surface code.** A topological stabiliser code defined on a 2D
  lattice with weight-four plaquette and vertex checks. The leading
  candidate for near-term fault-tolerant quantum computing thanks
  to its planar layout and high threshold. See Chapter 19.
- **Syndrome.** The classical bit string produced by measuring the
  stabilisers of a code; a nontrivial syndrome localises an error
  without collapsing the encoded information. See Chapter 19.
- **Threshold theorem.** If physical error rates are below a
  hardware-dependent threshold $p_{\mathrm{th}}$ (and the noise is
  sufficiently local), then arbitrarily long quantum computations
  can be performed at polylogarithmic overhead. See Chapter 19.

## E.6 Complexity Terms

Vocabulary from the complexity-theoretic framing of quantum
computation. Full treatment is in Chapter 17.

- **BQP.** Bounded-error Quantum Polynomial time. The class of
  decision problems solvable by a uniform family of polynomial-size
  quantum circuits with bounded error probability. The quantum
  analogue of BPP. See Chapter 17.
- **BQP vs PH question.** Whether $\mathrm{BQP}$ is contained in
  the polynomial hierarchy. Raz–Tal (2019) gave an oracle
  separation, providing strong evidence that BQP is not contained
  in PH relative to oracles; the unrelativised question is open.
  See Chapter 17.
- **NP.** Nondeterministic Polynomial time. Decision problems
  whose "yes" instances admit a polynomial-length classical
  certificate verifiable in polynomial time. Believed to lie
  outside BQP. See Chapter 17.
- **Oracle separation.** A proof that two complexity classes
  differ relative to some oracle. Strong evidence (but not proof)
  that they differ unconditionally. The basis of most known
  quantum-vs-classical lower bounds. See Chapter 17.
- **P.** Polynomial time. Decision problems solvable by a
  deterministic Turing machine in polynomial time. The classical
  baseline. See Chapter 17.
- **PH.** The polynomial hierarchy
  $\mathrm{P} \subseteq \mathrm{NP} \subseteq \Sigma_2^{\mathrm{P}} \subseteq \cdots$.
  Generalises NP by allowing alternating quantifiers. See Chapter 17.
- **Post-selection.** Conditioning on a measurement outcome of
  vanishingly small probability. The class $\mathrm{PostBQP}$
  equals $\mathrm{PP}$ (Aaronson 2005), which is why post-selection
  is a productive theoretical device but not a physical one. See
  Chapter 17.
- **QMA.** Quantum Merlin–Arthur. The quantum analogue of NP: yes
  instances admit a polynomial-size quantum witness that a quantum
  verifier accepts with high probability. See Chapter 17.
- **QMA-hard.** Hard for QMA under polynomial-time (or quantum
  polynomial-time) reductions. The $k$-local Hamiltonian problem
  is the canonical QMA-complete problem. See Chapter 17.
- **Query model.** A computational model in which the input is
  accessed only through oracle queries and the cost metric is the
  number of queries. Yields the cleanest quantum-vs-classical
  separations (Grover, Simon, Bernstein–Vazirani). See Chapter 14
  and Chapter 17.
- **Space complexity.** The number of qubits (and ancillas)
  required by a quantum algorithm as a function of input size. The
  quantum analogue of classical space; tightly entangled with
  reversibility and uncomputation. See Chapter 17.
- **Time complexity.** Asymptotic gate count of a uniform family
  of quantum circuits solving a problem, as a function of input
  size. See Chapter 17.

## E.7 Software and Tooling Terms

Vocabulary for the SDK, simulation, and pulse-control layer. Full
treatment is in Chapter 23 (compilation and tooling), Chapter 24
(classical simulation), and Chapter 26 (hands-on access).

- **Backend.** A named target a circuit can be submitted to: a
  physical device, a simulator, or a cloud endpoint that wraps
  either. The unit at which compilation targets a specific gate set,
  connectivity, and noise model. See Chapter 23 and Chapter 26.
- **Cirq.** Open-source Python framework for circuit construction,
  simulation, and execution maintained by Google. Treated as the
  reference complement to Qiskit throughout this book. See
  Chapter 23.
- **Density-matrix simulator.** A classical simulator that tracks
  the full density matrix $\rho$. Memory cost is
  $O(4^n)$ on $n$ qubits — so for a fixed memory budget it reaches
  only about *half* the qubit count of a statevector simulator
  ($4^n = 2^{2n}$) — but it handles noise channels natively. See
  Chapter 24.
- **Noise model.** A specification of the channels applied after
  each gate (depolarising, thermal, readout) used by simulators to
  reproduce device behaviour. See Chapter 18 and Chapter 24.
- **OpenQASM.** Open Quantum Assembly Language; a textual
  representation of quantum circuits at the gate level. OpenQASM 3
  adds pulse-level extensions and classical control flow. See
  Chapter 23.
- **PennyLane.** Open-source Python framework focused on
  differentiable quantum programming and variational algorithms,
  maintained by Xanadu. Integrates with multiple device backends
  through a plugin interface. See Chapter 23.
- **Primitive (Sampler).** A high-level execution primitive that
  returns shot-level bit-string samples (or quasi-probabilities)
  from a parametrised circuit. The lower-friction interface for
  measurement-distribution-based algorithms. See Chapter 23 and
  Chapter 26.
- **Primitive (Estimator).** A high-level execution primitive that
  returns the expectation value $\langle H\rangle$ of a Hermitian
  observable $H$ on the state prepared by a parametrised circuit.
  The interface VQE-style algorithms target. See Chapter 23 and
  Chapter 26.
- **Pulse-level control.** Programming the physical-layer
  microwave or laser pulses directly, bypassing the gate
  abstraction. Used for calibration, custom gates, and
  pulse-shape-aware error mitigation. See Chapter 21 and
  Chapter 23.
- **Qiskit.** Open-source Python framework for circuit
  construction, transpilation, and execution maintained by IBM.
  Treated as the reference SDK throughout this book; Qiskit's
  endian and QFT-sign conventions and the rules for reconciling
  them with this book's conventions are documented in §4.8 and
  §4.13. See Chapter 23.
- **Statevector simulator.** A classical simulator that tracks the
  full $2^n$-dimensional complex amplitude vector. Exact, but
  memory scales as $O(2^n)$ — about $16$ GB at $n = 30$ in double
  precision — so the practical ceiling is around $n = 30$ on a
  workstation and the mid-$30$s on large-memory servers. See
  Chapter 24.
- **Stim.** A specialised high-performance stabiliser-circuit
  simulator (Gidney 2021) used for surface-code research and
  decoder benchmarking. Simulates Clifford circuits in polynomial
  time. See Chapter 24.
- **Tensor-network simulator.** A classical simulator that
  represents the state as a tensor network (MPS, PEPS, tree). Cost
  scales with the bond dimension, which is small for
  low-entanglement states; tractable well beyond the
  statevector-simulator ceiling for such circuits. See Chapter 24.
- **Transpilation.** Rewriting a circuit so that it conforms to a
  backend's native gate set, connectivity, and timing constraints,
  while attempting to minimise depth, gate count, or expected
  error. See Chapter 23.

---

[← Previous: Appendix D. Suggested Reading and Reference Papers](appendix-d-suggested-reading.md) · [Table of Contents](../../README.md) · [Next: Appendix F. 2026 Hardware Snapshot →](appendix-f-hardware-snapshot-2026.md)
