"""Phase assignments for the book's writing plan.

Phase numbers reflect the writing order from the plan, not the reading order:
  1. Foundations              (Ch 4–7, Notation conventions, Appendix A)
  2. Core mechanics           (Ch 8–12, Appendices B–C)
  3. Algorithms & complexity  (Ch 13–17)
  4. Real systems             (Ch 18–24)
  5. Practice & applications  (Ch 25–33)
  6. Orientation & closure    (Ch 1–3, Ch 34–37, Preface, Background, Appendices D–E)
"""

PHASES: dict[int, str] = {
    1: "Foundations",
    2: "Core mechanics",
    3: "Algorithms and complexity",
    4: "Real systems",
    5: "Practice and applications",
    6: "Orientation, epistemics, closure",
}

PHASE_BY_FILE: dict[str, int] = {
    # Front matter
    "00-preface.md": 6,
    "01-background-and-self-check.md": 6,
    "02-notation-and-conventions.md": 1,

    # Chapters
    "01-why-quantum-computing-exists.md": 6,
    "02-classical-to-quantum-contrast.md": 6,
    "03-physical-intuition.md": 6,
    "04-mathematical-background.md": 1,
    "05-postulates.md": 1,
    "06-the-qubit.md": 1,
    "07-multiple-qubits-and-entanglement.md": 1,
    "08-quantum-gates.md": 2,
    "09-quantum-circuits.md": 2,
    "10-core-quantum-phenomena.md": 2,
    "11-measurement-theory.md": 2,
    "12-quantum-information-theory.md": 2,
    "13-quantum-algorithms-mindset.md": 3,
    "14-foundational-algorithms.md": 3,
    "15-landmark-quantum-algorithms.md": 3,
    "16-modern-algorithmic-frontier.md": 3,
    "17-complexity-theory.md": 3,
    "18-noise-decoherence-and-errors.md": 4,
    "19-quantum-error-correction-and-fault-tolerance.md": 4,
    "20-quantum-hardware-platforms.md": 4,
    "21-quantum-control-and-electronics.md": 4,
    "22-hardware-engineering-metrics.md": 4,
    "23-quantum-programming-compilation-and-tooling.md": 4,
    "24-classical-simulation-of-quantum-systems.md": 4,
    "25-nisq-and-early-fault-tolerant-era.md": 5,
    "26-practical-access-and-hands-on-work.md": 5,
    "27-cryptography-and-security.md": 5,
    "28-scientific-computing-and-physical-simulation.md": 5,
    "29-optimization-finance-and-industrial.md": 5,
    "30-quantum-machine-learning.md": 5,
    "31-quantum-sensing-metrology-and-tomography.md": 5,
    "32-adjacent-computational-models.md": 5,
    "33-quantum-communication-and-networking.md": 5,
    "34-bridging-to-familiar-engineering-ideas.md": 6,
    "35-interpretational-and-conceptual-pitfalls.md": 6,
    "36-how-to-judge-claims.md": 6,
    "37-endgame.md": 6,

    # Back matter
    "appendix-a-notation-reference.md": 1,
    "appendix-b-common-gates.md": 2,
    "appendix-c-identities-and-decompositions.md": 2,
    "appendix-d-suggested-reading.md": 6,
    "appendix-e-glossary.md": 6,
}
