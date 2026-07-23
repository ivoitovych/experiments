#!/usr/bin/env python3
"""
Scaffold the book directory tree from the TOC. **Archived historical
bootstrap tool — not wired to anything.**

This created the initial tree once. It is preserved here for provenance
only; it is no longer on any live path (`build_book.py` now derives the
book structure from the real `book/` tree via `generate_toc.walk_book`,
the single source of truth). It will not run as-is from `archive/`
(its `phases` import expects `scripts/` on the path), and its embedded
README/STYLE/structure are the stale originals. Do not resurrect it as
an authority; the delivered `book/` is authoritative.

This created the initial tree once. It is idempotent — `write_if_missing`
never overwrites an existing file — so re-running it only fills in files
that are genuinely absent. That safety is also its hazard: the README.md,
STYLE.md, and section structure embedded below are the *original stubs* and
are now badly stale relative to the live, hand-maintained files. If a real
authority (e.g. README.md) were ever deleted and this were re-run, it would
silently regenerate a primitive stub. The live files — not this template —
are authoritative. Retiring/archiving this tool is an open decision
(see IDEAS.md).
"""

from __future__ import annotations
import os
import pathlib
import sys
import textwrap

ROOT = pathlib.Path(__file__).resolve().parent.parent
BOOK = ROOT / "book"

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from phases import PHASE_BY_FILE  # noqa: E402

# ---------------------------------------------------------------------------
# Structure: linear order matters (drives prev/next nav and master TOC).
# Each entry is a dict with kind, dir, file, title, sections, and chapter
# metadata where applicable.
# ---------------------------------------------------------------------------

ENTRIES: list[dict] = [
    # ----- Front matter -----
    {
        "kind": "front",
        "dir": "00-front-matter",
        "file": "00-preface.md",
        "title": "Preface",
        "sections": [
            "Why This Book Exists",
            "Who This Book Is For",
            "What \"Experienced Developer\" Means Here",
            "What This Book Is Not",
            "How to Use This Book",
            "Core Topics, Deep Dives, and Frontier Topics",
            "Reading Linearly vs. Reading Selectively",
            "Suggested Reading Paths",
        ],
    },
    {
        "kind": "front",
        "dir": "00-front-matter",
        "file": "01-background-and-self-check.md",
        "title": "Recommended / Assumed Background and Self-Check",
        "sections": [
            "Required: Programming Proficiency",
            "Required: Mathematical Maturity",
            "Required: Linear Algebra",
            "Required: Probability and Basic Information Theory",
            "Required: Complexity Basics",
            "Recommended but Not Required",
            "Why DSP Helps",
        ],
    },
    {
        "kind": "front",
        "dir": "00-front-matter",
        "file": "02-notation-and-conventions.md",
        "title": "Notation and Conventions",
        "sections": [
            "Mathematical Notation",
            "Matrix Notation",
            "Dirac Notation",
            "Tensor Product Notation",
            "Circuit Notation",
            "Probability and Measurement Notation",
            "Code and Pseudocode Conventions",
        ],
    },

    # ----- Historical Prelude (unnumbered) -----
    {"kind": "part-divider", "part_label": "Historical Prelude"},
    {
        "kind": "chapter", "part_label": "Historical Prelude",
        "dir": "part-00-historical-prelude", "file": "00-historical-prelude.md",
        "chapter_label": "", "title": "From Quanta to Qubits",
        "sections": [
            ("0.1", "The Classical World Before the Crisis"),
            ("0.2", "The Classical Crisis: Bugs That Would Not Go Away"),
            ("0.3", "Old Quantum Theory: Patching Classical Physics, 1900–1925"),
            ("0.4", "The Birth of Modern Quantum Mechanics, 1925–1927"),
            ("0.5", "Dirac, von Neumann, and the Formal Language of Quantum Theory"),
            ("0.6", "Entanglement: From Philosophical Problem to Operational Resource"),
            ("0.7", "Quantum Mechanics Becomes Engineering"),
            ("0.8", "Computation Becomes Formal"),
            ("0.9", "Information Becomes Mathematical and Physical"),
            ("0.10", "Quantum Information Before Quantum Computers"),
            ("0.11", "The Birth of Quantum Computing: Possibility, Necessity, Universality"),
            ("0.12", "The Algorithmic Shock: From Oracle Separations to Shor and Grover"),
            ("0.13", "Quantum Error Correction: Making the Impossible Plausible"),
            ("0.14", "The Hardware Era: From Laboratory Systems to Competing Platforms"),
            ("0.15", "NISQ, Quantum Advantage, and the Present Reality"),
            ("0.16", "What This History Gives the Practicing Developer"),
        ],
    },

    # ----- Part I -----
    {"kind": "part-divider", "part_label": "Part I — Orientation and Framing"},
    {
        "kind": "chapter", "part_label": "Part I — Orientation and Framing",
        "dir": "part-01-orientation", "file": "01-why-quantum-computing-exists.md",
        "chapter_label": "Chapter 1", "title": "Why Quantum Computing Exists",
        "sections": [
            ("1.1", "Limits of Classical Computing"),
            ("1.2", "What Quantum Computing Is and Is Not"),
            ("1.3", "Problem Classes Where Quantum Helps"),
            ("1.4", "Problem Classes Where Quantum Does Not Help"),
            ("1.5", "Quantum Advantage vs. Practical Utility"),
            ("1.6", "NISQ vs. Fault-Tolerant Quantum Computing"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part I — Orientation and Framing",
        "dir": "part-01-orientation", "file": "02-classical-to-quantum-contrast.md",
        "chapter_label": "Chapter 2", "title": "Classical-to-Quantum Contrast",
        "sections": [
            ("2.1", "Bits vs. Qubits"),
            ("2.2", "Deterministic, Probabilistic, and Quantum Computation"),
            ("2.3", "Reversible Computation"),
            ("2.4", "Classical Logic Gates vs. Quantum Gates"),
            ("2.5", "State-Space Growth"),
            ("2.6", "Simulation Cost of Quantum Systems"),
            ("2.7", "From Classical Control to Quantum Control"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part I — Orientation and Framing",
        "dir": "part-01-orientation", "file": "03-physical-intuition.md",
        "chapter_label": "Chapter 3", "title": "Physical Intuition Behind Quantum Mechanics",
        "sections": [
            ("3.1", "Quantization"),
            ("3.2", "Wavefunctions and Probability Amplitudes"),
            ("3.3", "Superposition"),
            ("3.4", "Interference"),
            ("3.5", "Measurement"),
            ("3.6", "Measurement Back-Action"),
            ("3.7", "Uncertainty"),
            ("3.8", "Entanglement"),
            ("3.9", "Decoherence"),
            ("3.10", "Open vs. Closed Quantum Systems"),
        ],
    },

    # ----- Part II -----
    {"kind": "part-divider", "part_label": "Part II — Mathematical and Physical Formalism"},
    {
        "kind": "chapter", "part_label": "Part II — Mathematical and Physical Formalism",
        "dir": "part-02-formalism", "file": "04-mathematical-background.md",
        "chapter_label": "Chapter 4", "title": "Mathematical Background for Quantum Computing",
        "sections": [
            ("4.1", "Complex Numbers and Probability Amplitudes"),
            ("4.2", "Vector Spaces"),
            ("4.3", "Inner Products, Norms, and Orthonormal Bases"),
            ("4.4", "Matrices and Linear Operators"),
            ("4.5", "Hermitian, Unitary, and Normal Operators"),
            ("4.6", "Eigenvalues and Eigenvectors"),
            ("4.7", "Spectral Decomposition"),
            ("4.8", "Tensor Products"),
            ("4.9", "Change of Basis"),
            ("4.10", "Hilbert Spaces"),
            ("4.11", "Dirac Notation"),
            ("4.12", "Fourier Transform Basics"),
            ("4.13", "Probability and Information Theory Refresher"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part II — Mathematical and Physical Formalism",
        "dir": "part-02-formalism", "file": "05-postulates.md",
        "chapter_label": "Chapter 5", "title": "Postulates of Quantum Mechanics for Computing",
        "sections": [
            ("5.1", "Quantum States"),
            ("5.2", "State Evolution"),
            ("5.3", "The Schrödinger Equation"),
            ("5.4", "The Measurement Postulate"),
            ("5.5", "Composite Systems"),
            ("5.6", "Observables"),
            ("5.7", "Probability Amplitudes vs. Classical Probabilities"),
            ("5.8", "Global vs. Relative Phase"),
            ("5.9", "Pure vs. Mixed States"),
            ("5.10", "Density Matrices"),
            ("5.11", "Reduced States"),
            ("5.12", "Partial Trace"),
            ("5.13", "No-Cloning Theorem"),
            ("5.14", "No-Deleting Theorem"),
        ],
    },

    # ----- Part III -----
    {"kind": "part-divider", "part_label": "Part III — Qubits and Multi-Qubit Systems"},
    {
        "kind": "chapter", "part_label": "Part III — Qubits and Multi-Qubit Systems",
        "dir": "part-03-qubits", "file": "06-the-qubit.md",
        "chapter_label": "Chapter 6", "title": "The Qubit",
        "sections": [
            ("6.1", "Basis States"),
            ("6.2", "Pure States"),
            ("6.3", "Amplitudes and Probabilities"),
            ("6.4", "Computational Basis"),
            ("6.5", "Hadamard Basis"),
            ("6.6", "Circular Basis"),
            ("6.7", "Global vs. Relative Phase"),
            ("6.8", "The Bloch Sphere"),
            ("6.9", "Single-Qubit Dynamics"),
            ("6.10", "Single-Qubit Measurement"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part III — Qubits and Multi-Qubit Systems",
        "dir": "part-03-qubits", "file": "07-multiple-qubits-and-entanglement.md",
        "chapter_label": "Chapter 7", "title": "Multiple Qubits and Entanglement",
        "sections": [
            ("7.1", "Tensor-Product State Construction"),
            ("7.2", "Multi-Qubit Dimensionality"),
            ("7.3", "Product States"),
            ("7.4", "Entangled States"),
            ("7.5", "Bell States"),
            ("7.6", "GHZ and W States"),
            ("7.7", "EPR Intuition"),
            ("7.8", "Quantum vs. Classical Correlations"),
            ("7.9", "Bell Inequalities"),
            ("7.10", "Schmidt Decomposition"),
            ("7.11", "Reduced States and Partial Trace"),
            ("7.12", "Entanglement as a Resource"),
            ("7.13", "Entanglement Measures"),
        ],
    },

    # ----- Part IV -----
    {"kind": "part-divider", "part_label": "Part IV — Gates, Circuits, and Computational Phenomena"},
    {
        "kind": "chapter", "part_label": "Part IV — Gates, Circuits, and Computational Phenomena",
        "dir": "part-04-gates-and-circuits", "file": "08-quantum-gates.md",
        "chapter_label": "Chapter 8", "title": "Quantum Gates",
        "sections": [
            ("8.1", "Reversibility and Unitary Evolution"),
            ("8.2", "Pauli Gates"),
            ("8.3", "Hadamard Gate"),
            ("8.4", "S, T, and Phase Gates"),
            ("8.5", "Rotation Gates"),
            ("8.6", "Two-Qubit Gates"),
            ("8.7", "Controlled and Multi-Controlled Gates"),
            ("8.8", "Toffoli and Fredkin Gates"),
            ("8.9", "Universal Gate Sets"),
            ("8.10", "Clifford + T"),
            ("8.11", "Solovay–Kitaev Theorem"),
            ("8.12", "Native Gate Sets"),
            ("8.13", "Parameterized Gates"),
            ("8.14", "Gate Decomposition and Synthesis"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part IV — Gates, Circuits, and Computational Phenomena",
        "dir": "part-04-gates-and-circuits", "file": "09-quantum-circuits.md",
        "chapter_label": "Chapter 9", "title": "Quantum Circuits",
        "sections": [
            ("9.1", "Circuit Diagrams and Conventions"),
            ("9.2", "The Circuit Model of Computation"),
            ("9.3", "Ancilla Qubits"),
            ("9.4", "Uncomputation"),
            ("9.5", "Garbage Management"),
            ("9.6", "Measurement in Circuits"),
            ("9.7", "Deferred Measurement"),
            ("9.8", "Mid-Circuit Measurement"),
            ("9.9", "Classical Feedforward"),
            ("9.10", "Circuit Depth"),
            ("9.11", "Circuit Width"),
            ("9.12", "Connectivity Constraints"),
            ("9.13", "Circuit Optimization"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part IV — Gates, Circuits, and Computational Phenomena",
        "dir": "part-04-gates-and-circuits", "file": "10-core-quantum-phenomena.md",
        "chapter_label": "Chapter 10", "title": "Core Quantum Phenomena from a Computational View",
        "sections": [
            ("10.1", "Superposition as State Representation"),
            ("10.2", "Interference as a Computational Resource"),
            ("10.3", "Entanglement as Nonclassical Correlation Structure"),
            ("10.4", "Measurement Back-Action"),
            ("10.5", "Information-Extraction Limits"),
            ("10.6", "Phase Kickback"),
            ("10.7", "Why Quantum Algorithms Feel Strange"),
        ],
    },

    # ----- Part V -----
    {"kind": "part-divider", "part_label": "Part V — Measurement and Quantum Information"},
    {
        "kind": "chapter", "part_label": "Part V — Measurement and Quantum Information",
        "dir": "part-05-measurement-and-information", "file": "11-measurement-theory.md",
        "chapter_label": "Chapter 11", "title": "Measurement Theory",
        "sections": [
            ("11.1", "Projective Measurements"),
            ("11.2", "POVM Measurements"),
            ("11.3", "The Born Rule"),
            ("11.4", "Measurement Statistics"),
            ("11.5", "Measurement Back-Action Revisited"),
            ("11.6", "Information Extraction and Disturbance"),
            ("11.7", "Measurement as Part of Computation"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part V — Measurement and Quantum Information",
        "dir": "part-05-measurement-and-information", "file": "12-quantum-information-theory.md",
        "chapter_label": "Chapter 12", "title": "Quantum Information Theory",
        "sections": [
            ("12.1", "Quantum Channels"),
            ("12.2", "CPTP Maps"),
            ("12.3", "Kraus Operators"),
            ("12.4", "Operator-Sum Representation"),
            ("12.5", "Fidelity"),
            ("12.6", "Trace Distance"),
            ("12.7", "Diamond Norm"),
            ("12.8", "Von Neumann Entropy"),
            ("12.9", "Quantum Mutual Information"),
            ("12.10", "Holevo Bound"),
            ("12.11", "Entanglement Measures Revisited"),
        ],
    },

    # ----- Part VI -----
    {"kind": "part-divider", "part_label": "Part VI — Algorithms"},
    {
        "kind": "chapter", "part_label": "Part VI — Algorithms",
        "dir": "part-06-algorithms", "file": "13-quantum-algorithms-mindset.md",
        "chapter_label": "Chapter 13", "title": "The Quantum Algorithms Mindset",
        "sections": [
            ("13.1", "Amplitude Manipulation"),
            ("13.2", "Phase Kickback"),
            ("13.3", "Oracle-Based Thinking"),
            ("13.4", "Transform-Domain Thinking"),
            ("13.5", "Hidden-Structure Extraction"),
            ("13.6", "Probabilistic Success and Repetition"),
            ("13.7", "Complexity-Theoretic Framing"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part VI — Algorithms",
        "dir": "part-06-algorithms", "file": "14-foundational-algorithms.md",
        "chapter_label": "Chapter 14", "title": "Foundational Algorithms",
        "sections": [
            ("14.1", "Deutsch's Algorithm"),
            ("14.2", "Deutsch–Jozsa Algorithm"),
            ("14.3", "Bernstein–Vazirani Algorithm"),
            ("14.4", "Simon's Algorithm"),
            ("14.5", "Quantum Fourier Transform"),
            ("14.6", "Quantum Phase Estimation"),
            ("14.7", "Amplitude Amplification"),
            ("14.8", "Amplitude Estimation"),
            ("14.9", "Hidden Subgroup Problem Framework"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part VI — Algorithms",
        "dir": "part-06-algorithms", "file": "15-landmark-quantum-algorithms.md",
        "chapter_label": "Chapter 15", "title": "Landmark Quantum Algorithms",
        "sections": [
            ("15.1", "Grover's Algorithm"),
            ("15.2", "Shor's Algorithm"),
            ("15.3", "Factoring"),
            ("15.4", "Discrete Logarithm"),
            ("15.5", "HHL Algorithm for Linear Systems"),
            ("15.6", "Quantum Walks"),
            ("15.7", "Variational Quantum Algorithms"),
            ("15.8", "Variational Quantum Eigensolver"),
            ("15.9", "Quantum Approximate Optimization Algorithm"),
            ("15.10", "Quantum Machine Learning Overview"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part VI — Algorithms",
        "dir": "part-06-algorithms", "file": "16-modern-algorithmic-frontier.md",
        "chapter_label": "Chapter 16", "title": "Modern Algorithmic Frontier",
        "sections": [
            ("16.1", "Hamiltonian Simulation"),
            ("16.2", "Trotter–Suzuki Decompositions"),
            ("16.3", "Linear Combination of Unitaries"),
            ("16.4", "Block Encodings"),
            ("16.5", "Qubitization"),
            ("16.6", "Quantum Signal Processing"),
            ("16.7", "Quantum Singular Value Transformation"),
            ("16.8", "Modern View of Quantum Speedups"),
        ],
    },

    # ----- Part VII -----
    {"kind": "part-divider", "part_label": "Part VII — Complexity Theory"},
    {
        "kind": "chapter", "part_label": "Part VII — Complexity Theory",
        "dir": "part-07-complexity", "file": "17-complexity-theory.md",
        "chapter_label": "Chapter 17", "title": "Complexity Theory Around Quantum Computing",
        "sections": [
            ("17.1", "P, NP, NP-Complete, and BPP"),
            ("17.2", "BQP"),
            ("17.3", "QMA and QCMA"),
            ("17.4", "QIP"),
            ("17.5", "Relations to PH and PSPACE"),
            ("17.6", "Query Complexity"),
            ("17.7", "Oracle Separations"),
            ("17.8", "Types of Quantum Speedup"),
            ("17.9", "What \"Exponential Speedup\" Really Means"),
            ("17.10", "Query Complexity vs. Time Complexity"),
            ("17.11", "Lower Bounds and Limits"),
            ("17.12", "Dequantization"),
            ("17.13", "Classical Simulability"),
        ],
    },

    # ----- Part VIII -----
    {"kind": "part-divider", "part_label": "Part VIII — Noise, Errors, and Fault Tolerance"},
    {
        "kind": "chapter", "part_label": "Part VIII — Noise, Errors, and Fault Tolerance",
        "dir": "part-08-noise-and-qec", "file": "18-noise-decoherence-and-errors.md",
        "chapter_label": "Chapter 18", "title": "Noise, Decoherence, and Errors",
        "sections": [
            ("18.1", "Sources of Noise"),
            ("18.2", "T1 and T2"),
            ("18.3", "Dephasing"),
            ("18.4", "Gate Errors"),
            ("18.5", "Readout Errors"),
            ("18.6", "State-Preparation Errors"),
            ("18.7", "Crosstalk"),
            ("18.8", "Leakage"),
            ("18.9", "Thermal Noise"),
            ("18.10", "Bit-Flip Channels"),
            ("18.11", "Phase-Flip Channels"),
            ("18.12", "Depolarizing Channels"),
            ("18.13", "Amplitude Damping"),
            ("18.14", "Coherent vs. Incoherent Errors"),
            ("18.15", "Noise Models"),
            ("18.16", "Fidelity and Error Rates"),
            ("18.17", "Benchmarking Methods"),
            ("18.18", "Error Mitigation"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part VIII — Noise, Errors, and Fault Tolerance",
        "dir": "part-08-noise-and-qec", "file": "19-quantum-error-correction-and-fault-tolerance.md",
        "chapter_label": "Chapter 19", "title": "Quantum Error Correction and Fault Tolerance",
        "sections": [
            ("19.1", "Why Quantum Error Correction Is Harder Than Classical"),
            ("19.2", "Classical Coding Recap"),
            ("19.3", "Why Naive Quantum Error Correction Fails"),
            ("19.4", "Bit-Flip Codes"),
            ("19.5", "Phase-Flip Codes"),
            ("19.6", "Shor Code"),
            ("19.7", "Steane Code"),
            ("19.8", "Stabilizer Formalism"),
            ("19.9", "Syndrome Measurement"),
            ("19.10", "Decoding"),
            ("19.11", "CSS Codes"),
            ("19.12", "Surface Codes"),
            ("19.13", "Topological Codes"),
            ("19.14", "Color Codes"),
            ("19.15", "qLDPC Codes"),
            ("19.16", "Logical Qubits"),
            ("19.17", "Code Distance"),
            ("19.18", "Physical-to-Logical Overhead"),
            ("19.19", "Threshold Theorem"),
            ("19.20", "Fault-Tolerant Gates"),
            ("19.21", "Magic State Distillation"),
            ("19.22", "Lattice Surgery"),
            ("19.23", "Logical Gate Implementation"),
        ],
    },

    # ----- Part IX -----
    {"kind": "part-divider", "part_label": "Part IX — Hardware, Control, and Software"},
    {
        "kind": "chapter", "part_label": "Part IX — Hardware, Control, and Software",
        "dir": "part-09-hardware-and-software", "file": "20-quantum-hardware-platforms.md",
        "chapter_label": "Chapter 20", "title": "Quantum Hardware Platforms",
        "sections": [
            ("20.1", "Superconducting Qubits"),
            ("20.2", "Transmon Architectures"),
            ("20.3", "Fluxonium Architectures"),
            ("20.4", "Trapped Ions"),
            ("20.5", "Neutral Atom Arrays"),
            ("20.6", "Photonic Qubits"),
            ("20.7", "Silicon Spin Qubits"),
            ("20.8", "NV Centers and Other Solid-State Platforms"),
            ("20.9", "Topological Qubits"),
            ("20.10", "Analog Quantum Simulators"),
            ("20.11", "Quantum Annealers vs. Gate-Based Machines"),
            ("20.12", "Cross-Platform Metrics"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part IX — Hardware, Control, and Software",
        "dir": "part-09-hardware-and-software", "file": "21-quantum-control-and-electronics.md",
        "chapter_label": "Chapter 21", "title": "Quantum Control and Electronics",
        "sections": [
            ("21.1", "Pulse Shaping"),
            ("21.2", "Microwave and RF Control"),
            ("21.3", "Pulse-Level Programming"),
            ("21.4", "Control Electronics Architecture"),
            ("21.5", "DAC/ADC Interfaces"),
            ("21.6", "Signal Integrity"),
            ("21.7", "Cryogenic Electronics"),
            ("21.8", "Real-Time Feedback"),
            ("21.9", "Mid-Circuit Control Loops"),
            ("21.10", "Calibration and Drift"),
            ("21.11", "Control-Plane Engineering"),
            ("21.12", "FPGA/HDL in the Quantum Control Stack"),
            ("21.13", "Packaging and Interconnects"),
            ("21.14", "Gate Speed and Readout Fidelity"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part IX — Hardware, Control, and Software",
        "dir": "part-09-hardware-and-software", "file": "22-hardware-engineering-metrics.md",
        "chapter_label": "Chapter 22", "title": "Hardware Engineering Metrics",
        "sections": [
            ("22.1", "Qubit Count"),
            ("22.2", "Connectivity"),
            ("22.3", "Gate Fidelity"),
            ("22.4", "Coherence Time"),
            ("22.5", "Gate Speed"),
            ("22.6", "Readout Fidelity"),
            ("22.7", "Quantum Volume"),
            ("22.8", "CLOPS"),
            ("22.9", "Algorithmic Qubits"),
            ("22.10", "Scalability Constraints"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part IX — Hardware, Control, and Software",
        "dir": "part-09-hardware-and-software", "file": "23-quantum-programming-compilation-and-tooling.md",
        "chapter_label": "Chapter 23", "title": "Quantum Programming, Compilation, and Tooling",
        "sections": [
            ("23.1", "Circuit Description Languages"),
            ("23.2", "OpenQASM"),
            ("23.3", "Quil"),
            ("23.4", "SDK Landscape"),
            ("23.5", "Pulse-Level Programming"),
            ("23.6", "Transpilation"),
            ("23.7", "Routing"),
            ("23.8", "Scheduling"),
            ("23.9", "Hardware-Aware Compilation"),
            ("23.10", "Noise-Aware Compilation"),
            ("23.11", "Resource Estimation"),
            ("23.12", "Simulation Back-Ends"),
            ("23.13", "Hybrid Quantum-Classical Orchestration"),
            ("23.14", "Verification and Debugging of Quantum Programs"),
            ("23.15", "Integration with Classical ML Frameworks"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part IX — Hardware, Control, and Software",
        "dir": "part-09-hardware-and-software", "file": "24-classical-simulation-of-quantum-systems.md",
        "chapter_label": "Chapter 24", "title": "Classical Simulation of Quantum Systems",
        "sections": [
            ("24.1", "Why Classical Simulation Matters"),
            ("24.2", "The Exponential-Scaling Barrier"),
            ("24.3", "Statevector Simulation"),
            ("24.4", "Density-Matrix Simulation"),
            ("24.5", "Stabilizer Simulation"),
            ("24.6", "Tensor-Network Simulation"),
            ("24.7", "Matrix Product States"),
            ("24.8", "DMRG"),
            ("24.9", "Variational Tensor Methods"),
            ("24.10", "Trotterization in Simulation"),
            ("24.11", "Many-Body Systems"),
            ("24.12", "Numerical Stability and Precision"),
            ("24.13", "Connections to Signal Processing"),
            ("24.14", "Connections to Numerical Simulation"),
            ("24.15", "Connections to Tomography"),
        ],
    },

    # ----- Part X -----
    {"kind": "part-divider", "part_label": "Part X — Practice and Era"},
    {
        "kind": "chapter", "part_label": "Part X — Practice and Era",
        "dir": "part-10-practice-and-era", "file": "25-nisq-and-early-fault-tolerant-era.md",
        "chapter_label": "Chapter 25", "title": "NISQ and the Early Fault-Tolerant Era",
        "sections": [
            ("25.1", "Definition of NISQ"),
            ("25.2", "Constraints of NISQ Machines"),
            ("25.3", "Variational Algorithms in Practice"),
            ("25.4", "Quantum Supremacy and Quantum Advantage Experiments"),
            ("25.5", "Benchmarking Progress Over Time"),
            ("25.6", "Transition to Early Fault-Tolerant Quantum Computing"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part X — Practice and Era",
        "dir": "part-10-practice-and-era", "file": "26-practical-access-and-hands-on-work.md",
        "chapter_label": "Chapter 26", "title": "Practical Access and Hands-On Work",
        "sections": [
            ("26.1", "Simulators vs. Real Hardware"),
            ("26.2", "Cloud Access"),
            ("26.3", "Choosing a First SDK"),
            ("26.4", "Choosing a First Hardware Target"),
            ("26.5", "Experiment Design"),
            ("26.6", "Reproducibility Considerations"),
            ("26.7", "Reading Papers Without Drowning"),
        ],
    },

    # ----- Part XI -----
    {"kind": "part-divider", "part_label": "Part XI — Applications"},
    {
        "kind": "chapter", "part_label": "Part XI — Applications",
        "dir": "part-11-applications", "file": "27-cryptography-and-security.md",
        "chapter_label": "Chapter 27", "title": "Cryptography and Security",
        "sections": [
            ("27.1", "Shor's Impact on RSA"),
            ("27.2", "Shor's Impact on ECC"),
            ("27.3", "Grover and Symmetric Cryptography"),
            ("27.4", "Post-Quantum Cryptography"),
            ("27.5", "Quantum Key Distribution as a Security Primitive"),
            ("27.6", "Realistic Timelines for Cryptographic Threats"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XI — Applications",
        "dir": "part-11-applications", "file": "28-scientific-computing-and-physical-simulation.md",
        "chapter_label": "Chapter 28", "title": "Scientific Computing and Physical Simulation",
        "sections": [
            ("28.1", "Quantum Chemistry"),
            ("28.2", "Materials Science"),
            ("28.3", "Many-Body Physics"),
            ("28.4", "Condensed-Matter Simulation"),
            ("28.5", "Hamiltonian Simulation for Physics"),
            ("28.6", "High-Energy Physics"),
            ("28.7", "Lattice Gauge Theory"),
            ("28.8", "PDE Solvers and Differential Equations"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XI — Applications",
        "dir": "part-11-applications", "file": "29-optimization-finance-and-industrial.md",
        "chapter_label": "Chapter 29", "title": "Optimization, Finance, and Industrial Use Cases",
        "sections": [
            ("29.1", "Combinatorial Optimization"),
            ("29.2", "Sampling Problems"),
            ("29.3", "Finance and Monte Carlo Acceleration"),
            ("29.4", "Logistics"),
            ("29.5", "Industrial Scheduling"),
            ("29.6", "Realistic Assessment of Near-Term Value"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XI — Applications",
        "dir": "part-11-applications", "file": "30-quantum-machine-learning.md",
        "chapter_label": "Chapter 30", "title": "Quantum Machine Learning",
        "sections": [
            ("30.1", "Quantum Neural Networks"),
            ("30.2", "Quantum Support Vector Machines"),
            ("30.3", "Quantum GANs"),
            ("30.4", "Hybrid Quantum-Classical Learning"),
            ("30.5", "Data Loading and Bottlenecks"),
            ("30.6", "Claimed Speedups"),
            ("30.7", "Realistic Limitations"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XI — Applications",
        "dir": "part-11-applications", "file": "31-quantum-sensing-metrology-and-tomography.md",
        "chapter_label": "Chapter 31", "title": "Quantum Sensing, Metrology, and Tomography",
        "sections": [
            ("31.1", "Quantum-Enhanced Sensing"),
            ("31.2", "Quantum Metrology"),
            ("31.3", "State Tomography"),
            ("31.4", "Process Tomography"),
            ("31.5", "Relationship to Computational Tomography"),
            ("31.6", "Cross-Disciplinary Connections"),
        ],
    },

    # ----- Part XII -----
    {"kind": "part-divider", "part_label": "Part XII — Adjacent Models and Communication"},
    {
        "kind": "chapter", "part_label": "Part XII — Adjacent Models and Communication",
        "dir": "part-12-adjacent-models", "file": "32-adjacent-computational-models.md",
        "chapter_label": "Chapter 32", "title": "Adjacent Computational Models",
        "sections": [
            ("32.1", "Adiabatic Quantum Computation"),
            ("32.2", "Quantum Annealing"),
            ("32.3", "Measurement-Based Quantum Computation"),
            ("32.4", "Continuous-Variable Quantum Computing"),
            ("32.5", "Boson Sampling"),
            ("32.6", "Analog Quantum Devices"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XII — Adjacent Models and Communication",
        "dir": "part-12-adjacent-models", "file": "33-quantum-communication-and-networking.md",
        "chapter_label": "Chapter 33", "title": "Quantum Communication and Networking",
        "sections": [
            ("33.1", "Quantum Teleportation"),
            ("33.2", "Superdense Coding"),
            ("33.3", "Quantum Key Distribution"),
            ("33.4", "Entanglement Distribution"),
            ("33.5", "Quantum Repeaters"),
            ("33.6", "The Quantum Internet Vision"),
        ],
    },

    # ----- Part XIII -----
    {"kind": "part-divider", "part_label": "Part XIII — Engineering Perspective, Epistemics, and Direction"},
    {
        "kind": "chapter", "part_label": "Part XIII — Engineering Perspective, Epistemics, and Direction",
        "dir": "part-13-perspective-and-direction", "file": "34-bridging-to-familiar-engineering-ideas.md",
        "chapter_label": "Chapter 34", "title": "Bridging Quantum Computing to Familiar Engineering Ideas",
        "sections": [
            ("34.1", "Linear Systems and State-Space Thinking"),
            ("34.2", "Signal Processing and Spectral Analogies"),
            ("34.3", "Control and Measurement Analogies"),
            ("34.4", "Hardware-Software Co-Design"),
            ("34.5", "Numerical Simulation Parallels"),
            ("34.6", "Error Propagation, Stability, and Precision"),
            ("34.7", "Physics-Based Modeling Intuition"),
            ("34.8", "Where Classical Intuition Helps"),
            ("34.9", "Where Classical Intuition Misleads"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XIII — Engineering Perspective, Epistemics, and Direction",
        "dir": "part-13-perspective-and-direction", "file": "35-interpretational-and-conceptual-pitfalls.md",
        "chapter_label": "Chapter 35", "title": "Interpretational and Conceptual Pitfalls",
        "sections": [
            ("35.1", "What Superposition Does Not Mean"),
            ("35.2", "Why \"Parallel Universes Computing\" Is Not a Useful Engineering Model"),
            ("35.3", "Why Measurement Is Not Magic"),
            ("35.4", "Why Entanglement Is Not Faster-Than-Light Communication"),
            ("35.5", "Common Popular-Science Misconceptions"),
            ("35.6", "Common Vendor-Marketing Misconceptions"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XIII — Engineering Perspective, Epistemics, and Direction",
        "dir": "part-13-perspective-and-direction", "file": "36-how-to-judge-claims.md",
        "chapter_label": "Chapter 36", "title": "How to Judge Claims in Quantum Computing",
        "sections": [
            ("36.1", "Hype Detection"),
            ("36.2", "Benchmarking Claims and Their Caveats"),
            ("36.3", "\"Quantum-Inspired\" vs. Actual Quantum Computing"),
            ("36.4", "NISQ Marketing vs. Capability"),
            ("36.5", "Practicality vs. Asymptotic Advantage"),
            ("36.6", "Commercial Readiness vs. Research Promise"),
            ("36.7", "What Counts as Evidence"),
            ("36.8", "What Counts as Engineering Progress"),
        ],
    },
    {
        "kind": "chapter", "part_label": "Part XIII — Engineering Perspective, Epistemics, and Direction",
        "dir": "part-13-perspective-and-direction", "file": "37-endgame.md",
        "chapter_label": "Chapter 37", "title": "Endgame",
        "sections": [
            ("37.1", "What Quantum Computers Are Actually Good For"),
            ("37.2", "What They Are Unlikely to Replace"),
            ("37.3", "Realistic Timelines and Open Problems"),
            ("37.4", "Industry Roadmaps"),
            ("37.5", "The Fault-Tolerant Transition"),
            ("37.6", "Moving from Tutorials to Papers"),
            ("37.7", "Building a Personal Study Path"),
            ("37.8", "What to Retain Long Term"),
            ("37.9", "Where to Go Next"),
        ],
    },

    # ----- Back matter -----
    {"kind": "part-divider", "part_label": "Back Matter"},
    {
        "kind": "back",
        "dir": "99-back-matter",
        "file": "appendix-a-notation-reference.md",
        "title": "Appendix A. Notation Reference",
        "sections": [
            "Dirac Notation",
            "Matrix Notation",
            "Tensor Product Notation",
            "Measurement Notation",
            "Circuit Symbols",
            "Common Probability Notation",
        ],
    },
    {
        "kind": "back",
        "dir": "99-back-matter",
        "file": "appendix-b-common-gates.md",
        "title": "Appendix B. Common Gates and Their Matrices",
        "sections": [
            "Pauli Gates",
            "Hadamard Gate",
            "Phase Gates",
            "Rotation Gates",
            "CNOT",
            "CZ",
            "SWAP",
            "Toffoli",
            "Common Controlled Gates",
        ],
    },
    {
        "kind": "back",
        "dir": "99-back-matter",
        "file": "appendix-c-identities-and-decompositions.md",
        "title": "Appendix C. Useful Identities and Decompositions",
        "sections": [
            "Pauli Algebra",
            "Tensor Product Rules",
            "Commutation Relations",
            "Common Gate Identities",
            "Common Circuit Decompositions",
            "Basis-Change Identities",
        ],
    },
    {
        "kind": "back",
        "dir": "99-back-matter",
        "file": "appendix-d-suggested-reading.md",
        "title": "Appendix D. Suggested Reading and Reference Papers",
        "sections": [
            "Introductory Texts",
            "Quantum Algorithms",
            "Quantum Information Theory",
            "Quantum Error Correction",
            "Hardware and Control",
            "Complexity Theory",
            "Modern Frontier Topics",
            "Practical Tooling and SDKs",
        ],
    },
    {
        "kind": "back",
        "dir": "99-back-matter",
        "file": "appendix-e-glossary.md",
        "title": "Appendix E. Glossary",
        "sections": [
            "Core Terms",
            "Mathematical Terms",
            "Algorithmic Terms",
            "Hardware Terms",
            "Error-Correction Terms",
            "Complexity Terms",
            "Software and Tooling Terms",
        ],
    },
    {
        "kind": "back",
        "dir": "99-back-matter",
        "file": "appendix-f-hardware-snapshot-2026.md",
        "title": "Appendix F. 2026 Hardware Snapshot",
        "sections": [
            "How to Read This Snapshot",
            "Superconducting Qubits",
            "Trapped-Ion Qubits",
            "Neutral-Atom Qubits",
            "Photonic, Spin, and Topological Approaches",
            "Cross-Cutting Metrics at a Glance",
            "Error-Correction and Logical-Qubit Milestones",
            "How This Snapshot Will Age",
        ],
    },
    {
        "kind": "back",
        "dir": "99-back-matter",
        "file": "index.md",
        "title": "Index",
        "sections": [
            "Index",
        ],
    },
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def is_file_entry(e: dict) -> bool:
    return e.get("kind") in ("front", "chapter", "back")


def file_entries() -> list[dict]:
    return [e for e in ENTRIES if is_file_entry(e)]


def rel_path(e: dict) -> str:
    return f"book/{e['dir']}/{e['file']}"


def link_to(target: dict, from_entry: dict) -> str:
    """Relative path from from_entry's file to target's file."""
    from_dir = pathlib.Path("book") / from_entry["dir"]
    to_path = pathlib.Path("book") / target["dir"] / target["file"]
    return os.path.relpath(to_path, start=from_dir)


def link_to_root(from_entry: dict, target_name: str) -> str:
    """Relative path from from_entry's file to a file in the repo root."""
    from_dir = pathlib.Path("book") / from_entry["dir"]
    to_path = pathlib.Path(target_name)
    return os.path.relpath(to_path, start=from_dir)


def heading(e: dict) -> str:
    if e["kind"] == "chapter" and e.get("chapter_label"):
        return f"# {e['chapter_label']}. {e['title']}"
    return f"# {e['title']}"


def display_title(e: dict) -> str:
    if e["kind"] == "chapter" and e.get("chapter_label"):
        return f"{e['chapter_label']}. {e['title']}"
    return e["title"]


def short_title(e: dict) -> str:
    if e["kind"] == "chapter" and e.get("chapter_label"):
        return e["chapter_label"]
    return e["title"]


# ---------------------------------------------------------------------------
# File generation
# ---------------------------------------------------------------------------

def render_chapter_stub(e: dict, prev_e: dict | None, next_e: dict | None) -> str:
    nav_parts = []
    if prev_e is not None:
        nav_parts.append(f"[← Previous: {short_title(prev_e)}]({link_to(prev_e, e)})")
    nav_parts.append(f"[Table of Contents]({link_to_root(e, 'README.md')})")
    if next_e is not None:
        nav_parts.append(f"[Next: {short_title(next_e)} →]({link_to(next_e, e)})")
    nav = " · ".join(nav_parts)

    section_md_parts = []
    for s in e["sections"]:
        if isinstance(s, tuple):
            label, name = s
            section_md_parts.append(f"## {label} {name}\n\n_TODO_\n")
        else:
            section_md_parts.append(f"## {s}\n\n_TODO_\n")
    sections_md = "\n".join(section_md_parts)

    phase = PHASE_BY_FILE.get(e["file"], "?")
    total_sections = len(e["sections"])
    status_block = (
        f"> **Status:** stub · **Phase:** {phase} · "
        f"**Sections drafted:** 0 / {total_sections}"
    )

    return (
        f"{heading(e)}\n\n"
        f"{status_block}\n\n"
        f"{nav}\n\n"
        f"{sections_md}\n"
        f"---\n\n"
        f"{nav}\n"
    )


def write_if_missing(path: pathlib.Path, content: str) -> bool:
    if path.exists():
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return True


def render_readme() -> str:
    lines = [
        "# Quantum Computing for Experienced Developers",
        "",
        "*A Structured Guide from Core Principles to Modern Practice*",
        "",
        "by **Iaroslav Voitovych**",
        "",
        "---",
        "",
        "## About",
        "",
        "This book is a rigorous, engineering-oriented guide to quantum computing for",
        "readers who already have strong programming skills, mathematical maturity, and",
        "practical experience with computational systems. See",
        "[BookDescription.md](BookDescription.md) for the full description and",
        "[TOC.md](TOC.md) for the complete table of contents with all section headings.",
        "",
        "## Reading the book on GitHub",
        "",
        "Each chapter is a separate Markdown file under [`book/`](book/). Click any",
        "chapter title below to read it. Math is written in LaTeX and renders natively",
        "in the GitHub web viewer.",
        "",
        "## Source conventions",
        "",
        "See [STYLE.md](STYLE.md) for math, notation, and file conventions used",
        "throughout the manuscript.",
        "",
        "## License",
        "",
        "Dual-licensed: free for non-commercial use under CC BY-NC-ND 4.0; commercial",
        "use requires a separate license. See [LICENSE](LICENSE).",
        "",
        "---",
        "",
        "## Table of Contents",
        "",
    ]

    in_front = False
    in_back = False
    for e in ENTRIES:
        kind = e.get("kind")
        if kind == "part-divider":
            lines.append("")
            lines.append(f"### {e['part_label']}")
            lines.append("")
            in_front = False
            in_back = e["part_label"] == "Back Matter"
            continue

        if kind == "front":
            if not in_front:
                lines.append("### Front Matter")
                lines.append("")
                in_front = True
            lines.append(f"- [{e['title']}]({rel_path(e)})")
            continue

        if kind == "chapter":
            label = e.get("chapter_label", "")
            prefix = f"{label}. " if label else ""
            lines.append(f"- [{prefix}{e['title']}]({rel_path(e)})")
            continue

        if kind == "back":
            lines.append(f"- [{e['title']}]({rel_path(e)})")
            continue

    lines.append("")
    return "\n".join(lines)


def render_style() -> str:
    return textwrap.dedent("""\
        # Style and Source Conventions

        These conventions keep the manuscript portable across GitHub's renderer,
        mdBook, Pandoc, and other Markdown toolchains. Follow them in every file.

        ---

        ## File and directory layout

        - One chapter per Markdown file under `book/part-XX-<slug>/NN-<slug>.md`.
        - Front matter under `book/00-front-matter/`.
        - Appendices under `book/99-back-matter/`.
        - Numeric prefixes drive filesystem ordering and match reading order.
        - Figures live alongside the chapter that uses them, e.g.
          `book/part-04-gates-and-circuits/figures/cnot.svg`.
        - Pre-render circuit diagrams to SVG (or PNG) — Tikz/Quantikz source
          may be kept under `figures-src/` for regeneration.

        ## Per-chapter structure

        Every chapter file begins with:

        1. A top-level `# Chapter N. Title` heading.
        2. A navigation line: `[← Previous] · [Table of Contents] · [Next →]`.
        3. Numbered section headings: `## N.1 Section Title`, `## N.2 ...`.
        4. The same navigation line at the bottom.

        Use `---` (horizontal rule) before the trailing nav block to separate it
        from chapter content.

        ## Math

        Math is written in **LaTeX**, restricted to features that render natively
        on **all** of: GitHub web view, mdBook + MathJax, and Pandoc.

        - Inline math: `$ ... $`
        - Display math: `$$ ... $$` on its own paragraph
        - **Do not** rely on the MathJax `physics` package — GitHub does not load
          it. Write `|\\psi\\rangle`, `\\langle\\phi|`, `\\langle\\phi|\\psi\\rangle`
          instead of `\\ket{\\psi}`, `\\bra{\\phi}`, `\\braket{\\phi}{\\psi}`.
        - **Do not** use `\\label{}`, `\\ref{}`, `\\tag{}`, or `\\newcommand{}`
          (no global macros across files; GitHub's renderer ignores most of these).
        - Number equations manually if needed: end the line with `\\quad (1.3.1)`
          or similar.
        - Avoid heavy math inside Markdown tables — escapes get fragile.
        - Use `\\mathbb{C}`, `\\mathbb{R}`, `\\mathbb{Z}` for number sets.
        - Use `\\otimes` for tensor product, `\\dagger` for adjoint, `\\hat{H}`
          for operators when emphasis helps.

        ## Notation defaults

        - Computational basis kets: `|0\\rangle`, `|1\\rangle`.
        - Generic ket: `|\\psi\\rangle`. Generic bra: `\\langle\\phi|`.
        - Inner product: `\\langle\\phi|\\psi\\rangle`.
        - Outer product: `|\\psi\\rangle\\langle\\phi|`.
        - Pauli operators: `X`, `Y`, `Z` (no hats unless disambiguating).
        - Identity: `I` (single-qubit) or `I_n` (n-qubit).
        - Tensor product of states: `|0\\rangle \\otimes |1\\rangle`, may be
          abbreviated to `|01\\rangle` after the convention is introduced.

        ## Markdown rules

        - One sentence per line is acceptable but not required; use whatever
          gives the cleanest diffs.
        - Hard-wrap prose at ~100 columns when reasonable.
        - Code blocks: triple backticks with a language tag (` ```python `,
          ` ```qasm `, ` ```text `).
        - Use `**bold**` for new term introduction, `*italic*` for emphasis,
          `` `code` `` for symbols, code identifiers, and gate names in prose.
        - Use blockquotes (`>`) for definitions, theorems, and asides.
        - Use horizontal rules (`---`) sparingly — only as section/footer
          separators.

        ## Cross-references

        - Refer to chapters and sections by number in prose:
          "see Section 8.6 in [Chapter 8](../part-04-gates-and-circuits/08-quantum-gates.md)".
        - Use relative file paths for inter-file links.
        - Anchor links use auto-generated heading slugs (lowercase, dashes).

        ## Diagrams

        - Quantum circuits → SVG (rendered from Quantikz/Tikz source).
        - Block diagrams → SVG or Mermaid (`mermaid` code block).
        - Plots → SVG, generated from a checked-in script in `figures-src/`.
        - Always include alt text: `![CNOT circuit acting on two qubits](figures/cnot.svg)`.

        ## Authorship and history

        - All commits authored as `Iaroslav Voitovych <yaroslav.voytovych@gmail.com>`.
        """)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    created: list[str] = []
    skipped: list[str] = []

    files = file_entries()

    for i, e in enumerate(files):
        prev_e = files[i - 1] if i > 0 else None
        next_e = files[i + 1] if i + 1 < len(files) else None
        path = ROOT / "book" / e["dir"] / e["file"]
        if write_if_missing(path, render_chapter_stub(e, prev_e, next_e)):
            created.append(str(path.relative_to(ROOT)))
        else:
            skipped.append(str(path.relative_to(ROOT)))

    # README.md and STYLE.md are hand-maintained authorities; the embedded
    # render_* templates are stale originals. Only ever create them if truly
    # absent, and shout if we do so, so a stale stub is never mistaken for
    # the real file.
    readme_path = ROOT / "README.md"
    if write_if_missing(readme_path, render_readme()):
        created.append("README.md")
        print("WARNING: regenerated README.md from the STALE embedded "
              "template — replace it with the real one.", file=sys.stderr)
    else:
        skipped.append("README.md")

    style_path = ROOT / "STYLE.md"
    if write_if_missing(style_path, render_style()):
        created.append("STYLE.md")
        print("WARNING: regenerated STYLE.md from the STALE embedded "
              "template — replace it with the real one.", file=sys.stderr)
    else:
        skipped.append("STYLE.md")

    print(f"Created: {len(created)}")
    for p in created:
        print(f"  + {p}")
    if skipped:
        print(f"Skipped (already exist): {len(skipped)}")


if __name__ == "__main__":
    main()
