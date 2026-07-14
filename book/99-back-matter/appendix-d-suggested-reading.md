# Appendix D. Suggested Reading and Reference Papers

> **Status:** prereviewed · **Phase:** 6 · **Sections drafted:** 8 / 8

[← Previous: Appendix C. Useful Identities and Decompositions](appendix-c-identities-and-decompositions.md) · [Table of Contents](../../README.md) · [Next: Appendix E. Glossary →](appendix-e-glossary.md)

This appendix is a starting bibliography, not a comprehensive one. Every
entry is here because a reader who has worked through this book would
actually gain something concrete from picking it up next — a deeper
treatment of a topic, a primary source for a result we only summarized,
or a piece of software documentation that is the real reference manual
for a tool the book introduced. Entries are grouped by topic and roughly
ordered from most accessible to most specialized within each group.

Where a paper has a canonical preprint, the venue suffices to find it;
where a textbook has gone through multiple editions, the most recent
common edition is the one to reach for unless otherwise noted.

## D.1 Introductory Texts

General-purpose first books on quantum computing, useful as a second
pass over the foundations laid out in Parts I–IV of this book or as a
parallel reference while reading it.

- *Quantum Computation and Quantum Information.* Michael A. Nielsen and
  Isaac L. Chuang. Cambridge University Press, 10th anniversary edition,
  2010. The standard reference. Chapters 1–4 mirror Parts II–V of this
  book at a slower pace; the later chapters on information theory and
  error correction remain the canonical treatment.
- *Quantum Computing: An Applied Approach.* Jack D. Hidary. Springer,
  second edition, 2021. Engineering-oriented, with worked code. A
  reasonable companion if you want hands-on exercises alongside the
  formal development in Parts IV–VI.
- *Quantum Computing Since Democritus.* Scott Aaronson. Cambridge
  University Press, 2013. Idiosyncratic, opinionated, and strong on the
  complexity-theoretic perspective that Part VII develops more formally.
- *Quantum Computer Science: An Introduction.* N. David Mermin.
  Cambridge University Press, 2007. Short, clean, and explicitly written
  for computer scientists who do not want a physics detour first. Pairs
  well with Chapters 5–8.
- *An Introduction to Quantum Computing.* Phillip Kaye, Raymond Laflamme,
  and Michele Mosca. Oxford University Press, 2007. Concise and
  algorithm-focused; useful as a second look at Deutsch-Jozsa, Simon,
  and Shor.
- *Classical and Quantum Computation.* Alexei Yu. Kitaev, Alexander H.
  Shen, and Mikhail N. Vyalyi. American Mathematical Society, 2002.
  Older, more mathematical, and the original source for several
  results — most notably phase estimation and QMA — that are now
  textbook material.
- *Lecture Notes on Quantum Computation.* John Preskill. Caltech
  Ph229 lecture notes. Freely available online. The most widely cited
  set of notes in the field; the chapters on quantum information,
  error correction, and fault tolerance are essential supplementary
  reading for Parts V and VIII.

## D.2 Quantum Algorithms

Primary sources and modern surveys for the algorithms covered in
Chapters 13–16. Read the surveys first for orientation, then dip into
the original papers for the constructions that interest you.

- *Quantum theory, the Church-Turing principle and the universal quantum
  computer.* David Deutsch. Proceedings of the Royal Society A, 1985.
  The origin of the quantum circuit model and the Deutsch problem.
- *Rapid solution of problems by quantum computation.* David Deutsch
  and Richard Jozsa. Proceedings of the Royal Society A, 1992. The
  first explicit oracle separation; ancestor of every later
  hidden-subgroup algorithm.
- *On the power of quantum computation.* Daniel R. Simon. SIAM Journal
  on Computing, 1997. The exponential oracle separation that directly
  inspired Shor.
- *Polynomial-time algorithms for prime factorization and discrete
  logarithms on a quantum computer.* Peter W. Shor. SIAM Journal on
  Computing, 1997. Read this once even if you only intend to use the
  result; the structure of the period-finding reduction is worth
  understanding directly from the source.
- *A fast quantum mechanical algorithm for database search.* Lov K.
  Grover. STOC, 1996. Short, and the cleanest presentation of
  amplitude amplification before the framework was generalized.
- *Quantum amplitude amplification and estimation.* Gilles Brassard,
  Peter Høyer, Michele Mosca, and Alain Tapp. Contemporary
  Mathematics, 2002. The generalization that subsumes Grover and
  underlies modern amplitude-estimation routines used in Chapter 16.
- *Quantum algorithm for linear systems of equations.* Aram W. Harrow,
  Avinatan Hassidim, and Seth Lloyd. Physical Review Letters, 2009.
  The HHL paper. Reads better after Chapter 16's block-encoding
  vocabulary is in place.
- *A variational eigenvalue solver on a photonic quantum processor.*
  Alberto Peruzzo et al. Nature Communications, 2014. The original VQE
  paper; pair with the Farhi-Goldstone-Gutmann QAOA preprint for the
  variational pillar of Chapter 15.
- *Quantum Algorithm Implementations for Beginners.* Abhijith J. et al.
  ACM Transactions on Quantum Computing, 2022. A survey with
  pseudocode and SDK snippets; useful as an index of which algorithms
  have been implemented and how.

## D.3 Quantum Information Theory

Beyond Chapter 12. These cover entropy, channels, capacities,
entanglement measures, and the structure theorems that the chapter
only summarizes.

- *Quantum Information Theory.* Mark M. Wilde. Cambridge University
  Press, second edition, 2017. The most thorough modern textbook on
  the subject. Long but well-organized; treat as a reference rather
  than a linear read.
- *Quantum Computation and Quantum Information.* Nielsen and Chuang,
  Chapters 8–12 specifically. Still one of the cleanest introductions
  to channels, CPTP maps, and entropy.
- *The theory of quantum information.* John Watrous. Cambridge
  University Press, 2018. More mathematical than Wilde; the
  authoritative source for the diamond norm and semidefinite-program
  characterizations of channel distinguishability.
- *Quantum entanglement.* Ryszard Horodecki, Paweł Horodecki, Michał
  Horodecki, and Karol Horodecki. Reviews of Modern Physics, 2009.
  The standard survey of entanglement measures, separability criteria,
  and bound entanglement.
- *Quantum information theory and applications to quantum cryptography.*
  Renato Renner. Ph.D. thesis, ETH Zürich, 2005. The origin of the
  smooth-entropy framework that underlies modern one-shot information
  theory.
- *Holevo's theorem and its variants.* Alexander S. Holevo. Original
  paper *Bounds for the quantity of information transmitted by a
  quantum communication channel*, Problemy Peredachi Informatsii,
  1973. Worth reading once for context on the bound used in §12.5.
- *Lecture Notes on Quantum Information Theory.* Mark Wilde and others.
  Several free sets are available online; the LSU and Caltech lecture
  notes are the most polished.

## D.4 Quantum Error Correction

Companion reading to Chapter 19. The Gottesman thesis is the single
most useful entry point for the stabilizer formalism; the surface-code
literature has consolidated to a handful of papers that everyone cites.

- *Stabilizer codes and quantum error correction.* Daniel Gottesman.
  Ph.D. thesis, Caltech, 1997. The original and still the cleanest
  development of the stabilizer formalism. If you only read one
  document on QEC, read this.
- *Fault-tolerant quantum computation by anyons.* Alexei Yu. Kitaev.
  Annals of Physics, 2003. The origin of the toric code and the
  topological viewpoint that becomes the surface code.
- *Surface codes: Towards practical large-scale quantum computation.*
  Austin G. Fowler, Matteo Mariantoni, John M. Martinis, and Andrew N.
  Cleland. Physical Review A, 2012. The standard reference for the
  surface code as an engineering target; this paper sets the language
  used everywhere in Chapter 19.
- *Quantum Error Correction.* Daniel A. Lidar and Todd A. Brun,
  editors. Cambridge University Press, 2013. Edited volume; chapters
  vary in depth but the introductory and surface-code chapters are
  strong.
- *A theory of fault-tolerant quantum computation.* Daniel Gottesman.
  Physical Review A, 1998. The transversal-gate analysis underlying
  the Eastin-Knill no-go and most fault-tolerant constructions.
- *Improved classical simulation of quantum circuits dominated by Clifford gates.* Sergey
  Bravyi and David Gosset. Physical Review Letters, 2016. Useful
  perspective on magic-state distillation and what classical
  simulation can and cannot do near the Clifford boundary.
- *Asymptotically good quantum and locally testable classical LDPC codes.* Pavel
  Panteleev and Gleb Kalachev. STOC, 2022. Representative of the
  recent qLDPC line; worth at least skimming for context on why the
  surface code is not the end of the story.
- *Roads towards fault-tolerant universal quantum computation.* Earl T.
  Campbell, Barbara M. Terhal, and Christophe Vuillot. Nature, 2017.
  A compact survey of the fault-tolerance landscape, still current as of 2026.

## D.5 Hardware and Control

Background for Chapters 20–22. Hardware papers age faster than the
rest of the field, so prefer the most recent review you can find;
the entries here are chosen for being either foundational or
recently re-stated.

- *A quantum engineer's guide to superconducting qubits.* Philip Krantz,
  Morten Kjaergaard, Fei Yan, Terry P. Orlando, Simon Gustavsson, and
  William D. Oliver. Applied Physics Reviews, 2019. The single most
  useful tutorial reference for transmon physics, control electronics,
  and calibration; reads like an engineering manual.
- *Charge-insensitive qubit design derived from the Cooper pair box.*
  Jens Koch et al. Physical Review A, 2007. The transmon paper.
- *Trapped-ion quantum computing: Progress and challenges.* Colin D.
  Bruzewicz, John Chiaverini, Robert McConnell, and Jeremy M. Sage.
  Applied Physics Reviews, 2019. Companion piece to the Krantz review
  for the trapped-ion platform.
- *Quantum computing with neutral atoms.* Mark Saffman. Journal of
  Physics B, 2016. Pre-dates the Rydberg-array boom but still the best
  entry point to the platform's physics.
- *Photonic quantum information processing: A concise review.* Sergei
  Slussarenko and Geoff J. Pryde. Applied Physics Reviews, 2019.
- *Silicon quantum electronics.* Floris A. Zwanenburg et al. Reviews
  of Modern Physics, 2013. The foundational review for spin qubits in
  silicon.
- *Quantum supremacy using a programmable superconducting processor.*
  Frank Arute et al. Nature, 2019. Read for the engineering rather
  than the headline: the supplementary material is a tour of the
  control stack.
- *Open-source pulse-level control: Qiskit Pulse and OpenPulse.*
  Thomas Alexander et al. The OpenPulse specification papers describe
  what pulse-level programming looks like on a real system. (Note:
  the Qiskit Pulse API itself was removed in Qiskit 2.0 (2025) —
  §21.3, §23.5 — so read these as design documentation; the living
  pulse interface is OpenQASM 3 `defcal`.)

## D.6 Complexity Theory

For Part VII. The Aaronson and Watrous surveys are the most useful
entry points; the original papers are listed for the results that
Chapter 17 cites directly.

- *Quantum Computing Since Democritus.* Scott Aaronson, especially the
  complexity chapters. The most readable popular treatment of BQP,
  PostBQP, and oracle separations.
- *Quantum Complexity Theory.* Ethan Bernstein and Umesh Vazirani.
  SIAM Journal on Computing, 1997. The paper that defines BQP and
  proves the first nontrivial separations.
- *Quantum lower bounds by polynomials.* Robert Beals, Harry Buhrman,
  Richard Cleve, Michele Mosca, and Ronald de Wolf. Journal of the
  ACM, 2001. The polynomial method for quantum query lower bounds.
- *Quantum lower bounds by quantum arguments.* Andris Ambainis. STOC,
  2000. The adversary method, the complement to the polynomial method.
- *The complexity of quantum states and transformations: From
  quantum money to black holes.* Scott Aaronson. Lecture notes, 2016.
  Excellent for QMA, QIP, and the modern view of state complexity.
- *Quantum Proofs.* Thomas Vidick and John Watrous. Foundations and
  Trends in Theoretical Computer Science, 2016. The standard survey
  for QMA, QIP, and quantum interactive proofs.
- *A quantum-inspired classical algorithm for recommendation systems.*
  Ewin Tang. STOC, 2019 (arXiv:1807.04271). The paper that launched the
  dequantization phenomenon discussed in §17.12, followed by a wave of
  dequantizations of PCA, low-rank regression, and kernel methods.
- *The query complexity of the hidden subgroup problem.* Various
  authors; a good entry point is Childs and van Dam's *Quantum
  algorithms for algebraic problems*, Reviews of Modern Physics, 2010.

## D.7 Modern Frontier Topics

Companion reading to Chapter 16. These are the papers behind the
block-encoding / LCU / qubitization / QSVT pipeline that the chapter
introduces; each is worth reading at least once if you intend to work
with the modern algorithmic vocabulary.

- *Simulating Hamiltonian dynamics with a truncated Taylor series.*
  Dominic W. Berry, Andrew M. Childs, Richard Cleve, Robin Kothari,
  and Rolando D. Somma. Physical Review Letters, 2015. The LCU
  technique made explicit.
- *Hamiltonian simulation by qubitization.* Guang Hao Low and Isaac L.
  Chuang. Quantum, 2019. The paper that introduced qubitization as a
  unifying framework.
- *Optimal Hamiltonian simulation by quantum signal processing.*
  Guang Hao Low and Isaac L. Chuang. Physical Review Letters, 2017.
  QSP, the engine behind QSVT.
- *Quantum singular value transformation and beyond: Exponential
  improvements for quantum matrix arithmetics.* András Gilyén, Yuan
  Su, Guang Hao Low, and Nathan Wiebe. STOC, 2019. The QSVT paper.
  Dense; read after the QSP paper.
- *Grand unification of quantum algorithms.* John M. Martyn, Zane M.
  Rossi, Andrew K. Tan, and Isaac L. Chuang. PRX Quantum, 2021. A
  pedagogical survey that ties Grover, phase estimation, and
  Hamiltonian simulation under the QSVT umbrella; useful as a second
  pass over the framework after Chapter 16.
- *Theory of Trotter error with commutator scaling.* Andrew M. Childs,
  Yuan Su, Minh C. Tran, Nathan Wiebe, and Shuchen Zhu. Physical
  Review X, 2021. The state-of-the-art Trotter error
  analysis as of 2026; relevant whenever Hamiltonian simulation depth
  matters.
- *Variational quantum algorithms.* M. Cerezo et al. Nature Reviews
  Physics, 2021. The reference survey for VQE, QAOA, and the
  variational landscape, including barren-plateau diagnostics.
- *Noisy intermediate-scale quantum (NISQ) algorithms.* Kishor
  Bharti et al. Reviews of Modern Physics, 2022. The survey that
  defines the practical scope of the NISQ era.

## D.8 Practical Tooling and SDKs

Documentation, not papers. These are the references an experienced
developer actually reaches for once the algorithms are understood.
Versions move quickly; treat URLs as entry points to the current
documentation rather than as stable artifacts.

- **Qiskit (IBM).** Official documentation and tutorials at
  `quantum.cloud.ibm.com`. The book's code examples follow the
  current Qiskit object model; note that several historical class
  names have been renamed or split — for instance the older `QFT`
  *class* was formally deprecated in Qiskit 2.1 and is scheduled for
  removal in Qiskit 3.0, in favour of `QFTGate` and the synthesis
  function `qiskit.synthesis.qft.synth_qft_full`. When in doubt,
  check the module index of the installed package rather than older
  blog posts.
- **Cirq (Google).** `quantumai.google/cirq`. Python-native, with a
  cleaner separation between gates, moments, and circuits than
  Qiskit. The hardware-aware scheduling and routing APIs are worth
  studying even if you do not target Google hardware.
- **PennyLane (Xanadu).** `pennylane.ai`. The most polished framework
  for variational and quantum machine-learning workloads, with
  automatic differentiation across simulators and hardware backends.
  Pair with Chapter 15 and the QML chapter in Part XI.
- **Q# and the Quantum Development Kit (Microsoft).** Q# as a
  language has evolved through several iterations and its tooling
  has been rebranded more than once; the language itself remains a
  useful reference for what a typed, resource-estimable quantum
  programming language looks like. The Microsoft Quantum
  documentation site is the current entry point; the original
  *Q# language specification* on GitHub is still readable.
- **t|ket> and the Quantinuum stack.** `docs.quantinuum.com/tket`. The
  TKET compiler and `pytket` Python bindings are the strongest
  open-source pieces of compiler infrastructure for circuit
  optimization and hardware-aware routing across multiple backends.
- **Stim.** Craig Gidney, available at `github.com/quantumlib/Stim`.
  The fastest stabilizer-circuit simulator in wide use, with a
  matched decoder ecosystem (PyMatching, Fusion Blossom). Effectively
  the standard tool for surface-code numerics; mandatory if you
  want to reproduce the throughput numbers in Chapter 19.
- **OpenQASM.** The OpenQASM 3 specification, hosted on GitHub. The
  intermediate representation that most of the above SDKs can emit
  and consume; worth a single read end-to-end so that you recognize
  it when it appears as an export format.
- **Amazon Braket and the Braket SDK.** The Braket documentation
  describes a multi-provider cloud abstraction over several hardware
  backends. The SDK itself is thin; the value is in the uniform
  device-capability description, which is a useful study in how to
  expose noisy hardware to users.
- **Conferences.** Three matter most (see §37.6): **QIP** — the
  theory venue where algorithmic and complexity results break first
  (no formal proceedings; papers on arXiv); **IEEE Quantum Week
  (QCE)** — the engineering-and-applications venue, with tooling and
  benchmarking workshops; **APS March Meeting** — where hardware
  platform progress is reported in raw experimental form.
- **Companion notebooks.** Mermin's *Quantum Computer Science* and
  the IBM *Learn Quantum Computation using Qiskit* online materials
  both ship with substantial notebook collections. Working through
  one of them in parallel with Parts III–VI of this book is the most
  efficient way to convert the formalism into reflexes.

---

[← Previous: Appendix C. Useful Identities and Decompositions](appendix-c-identities-and-decompositions.md) · [Table of Contents](../../README.md) · [Next: Appendix E. Glossary →](appendix-e-glossary.md)
