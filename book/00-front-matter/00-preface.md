# Preface

> **Status:** draft · **Phase:** 1 · **Sections drafted:** 11 / 11

[Table of Contents](../../README.md) · [Next: Recommended / Assumed Background and Self-Check →](01-background-and-self-check.md)

## Why This Book Exists

Quantum computing has acquired two reputations that do it no favours. To
one camp it is a fringe research subject, mathematically lovely but
hopelessly far from practice, best left to physicists. To another it is
an imminent revolution, just one announcement away from breaking the
internet, rendering every cryptosystem obsolete, and curing every
disease that classical machines have failed to cure. Neither picture is
right, and the noise between them obscures something more interesting:
a young engineering discipline with real machines you can program
today, well-defined limits, a growing body of credible results, and a
software stack that is converging fast enough to be worth learning now.

This book is an attempt to write the kind of treatment I wanted when I
first tried to learn the subject as a working software engineer: a
single self-contained narrative that does not assume a physics
background, does not paper over the mathematics, does not lean on
analogies that fall apart at the second question, and does not pretend
the field is further along than it is. It is rigorous where rigour
matters — measurement, unitarity, error correction, complexity — and
practical where rigour does not by itself answer the question — gate
sets in real hardware, the day-to-day shape of a quantum SDK, how to
read a vendor's published device metrics critically.

Most existing texts fall into one of two categories. The textbook
tradition, of which Nielsen and Chuang's *Quantum Computation and
Quantum Information* is the canonical example, is excellent for what
it sets out to do — a thorough mathematical introduction aimed at
graduate students with a physics or theoretical-CS background — but
its audience and its publication date are not ours. It does not address
NISQ-era practice, did not have current hardware platforms to compare,
and assumes a level of mathematical patience that an experienced
software engineer can absolutely meet but that is not its primary
target. At the other end, popular-science books skip the linear algebra
entirely, which leaves the reader with metaphors instead of working
understanding. The space between those two genres is what this book
tries to fill.

The intended reader knows how to build software, has used at least one
strongly-typed language seriously, has implemented something
non-trivial that uses linear algebra (a 3D renderer, a recommendation
system, a signal-processing pipeline, a neural network from scratch,
anything in that family), and is comfortable opening a paper and
following its argument even when the notation is unfamiliar. That
reader does not need an introduction to programming; they need an
introduction to a different *computational model*, with all the
mathematical and physical apparatus that goes with it, presented
densely enough to respect their time and carefully enough to leave
nothing important on the floor.

## Who This Book Is For

This book is for working developers, engineers, and researchers
adjacent to quantum computing who want to understand the field
seriously. Concretely, you will get the most out of it if:

- You have linear algebra in your active toolkit. You should be
  comfortable with vectors, matrices, matrix multiplication, the
  determinant and trace, eigenvalues and eigenvectors,
  diagonalisation, and the idea of a basis change. The book reviews
  these in Chapter 4, but as a refresher, not from scratch.
- You have basic probability. Random variables, expectations,
  conditional probability, and Bayes' rule should be familiar
  notation, not new ideas.
- You can read complex numbers fluently. Addition, multiplication,
  modulus, the polar form, complex conjugation. Most of the book lives
  in $\mathbb{C}^{2^n}$; complex arithmetic is a daily activity, not a
  garnish.
- You have at least passing awareness of computational complexity:
  the difference between polynomial and exponential, what big-O
  notation means, what P and NP are roughly about. You do not need
  to have studied complexity theory; you do need to recognise it as
  a thing.
- You have written enough non-trivial code that an SDK with verbose
  type annotations and a build system feels like a tool, not an
  obstacle.

You do *not* need a physics background. The book treats quantum
mechanics from the postulates rather than from the historical
experiments, in the spirit of how computer-science textbooks present
the field. You do not need calculus beyond first-year level, and even
that is used sparingly — chiefly when matrix exponentials and
continuous-time evolution come up. You do not need group theory; the
small amount required (mostly in the context of the hidden subgroup
problem) is introduced where it is used.

If you have all of the above, this book aims to take you from "I have
heard of qubits and superposition" to "I can read a current quantum
algorithms paper, evaluate a hardware vendor's claims, run a small
experiment on real or simulated hardware, and tell which parts of the
field are mature engineering versus which are still active research."

## What "Experienced Developer" Means Here

The phrase appears in the title, so it is worth being explicit. By
*experienced developer* I mean: someone who has shipped real software,
who has read other people's code carefully, who has reasoned about
performance and correctness, and who has had to learn an unfamiliar
domain in order to build something in it. Roughly the level of a
mid-career software engineer, a research engineer in a neighbouring
field, a graduate student in CS or applied mathematics, or a senior
engineer about to add quantum computing to their list of working
specialisations.

What I am *not* assuming is that you have a degree in physics or that
you have taken a formal course on quantum mechanics. The book is
self-contained on the physics side: it builds the postulates from
scratch and uses only the apparatus those postulates require. What I
am also not assuming is that you want to derive every result from
first principles before believing it; where a result is standard and
the derivation lives in a well-known reference, the book gives the
statement, a worked example, and the citation. Where a result is
subtle or the standard treatments are misleading, the book takes the
space to work through it carefully.

## What This Book Is Not

It is worth being explicit about audiences this book will not serve
well, so that prospective readers can make an informed choice.

It is not an introduction to linear algebra, probability, or
programming. If those are new to you, this is the wrong starting
point; the next chapter, *Recommended / Assumed Background and
Self-Check*, gives concrete diagnostics and pointers to introductory
texts.

It is not a popular-science overview. There is a place for books that
explain quantum computing without equations — at the level of dinner
conversation or strategic briefings — and they do that job well. This
book is not one of them. The mathematics is the explanation; trying to
get to engineering competence without it leaves you with vocabulary
and no operating knowledge.

It is not a research monograph. The frontier of quantum computing
moves quickly, and a book is the wrong medium for the absolute latest
result. The book covers what is stable enough to teach — which is a
great deal — and points to the literature for the bleeding edge.

It is not a hardware-engineering reference. Part IX is an
introduction to quantum hardware platforms, control electronics, and
the metrics by which devices are judged: enough to understand vendor
datasheets, follow a control-systems paper, and reason about why a
particular device behaves the way it does. It is not enough to design
a superconducting qubit, dilution refrigerator, or trapped-ion ion
trap from scratch. Experimental physicists looking for that depth
should treat Part IX as a software engineer's view onto the hardware
stack, useful as orientation, not as a substitute for the
experimental literature.

It is not specific to one vendor's stack. Code examples appear in
Python and lean on the most widely-used open-source SDKs, but the
book is deliberately about the field, not about a particular product
line. Where vendor-specific conventions matter — qubit ordering, gate
sets, sign conventions in the QFT — the differences are called out
explicitly.

## How to Use This Book

The book is organised as thirteen parts spanning roughly
thirty-seven chapters, plus front matter and appendices. On a first
pass through unfamiliar material, read linearly: each chapter
deliberately leans on prerequisites from earlier chapters, the
notation accumulates, and the conventions established early are used
throughout. The order has been chosen so that no chapter needs a
forward reference to make sense.

On a second pass, or as a working reference, the book is intended to
be read selectively. Each chapter is self-contained enough to stand
alone once the prerequisites are in hand, and the cross-references
make the prerequisite graph explicit. The notation reference in
Appendix A, the gate matrices in Appendix B, and the identity tables
in Appendix C are designed to be looked up rather than read through.

Every chapter ends with a small set of sanity-check exercises. These
are not problem sets in the textbook-with-solutions-in-the-back
sense. They are short, concrete questions that you should be able to
answer quickly if the chapter has landed; if you cannot, that is the
signal to reread the relevant section before moving on. The answers
are not printed inline because the act of answering matters more than
the act of looking up; where an answer is non-obvious, the chapter
discussion contains it.

Worked examples are integrated into the text rather than collected at
the end. The principle is that the example *is* the explanation: if
the explanation requires three pages of derivation followed by a
worked example to make it concrete, the example was needed earlier.

## Core Topics, Deep Dives, and Frontier Topics

The thirteen parts of the book group naturally into three kinds of
content.

**Core topics** — Parts I through VI — are the canon: orientation
and motivation, the mathematical and physical formalism, qubits and
multi-qubit systems, gates and circuits, measurement and quantum
information, and algorithms. These chapters establish the working
vocabulary and the calculational machinery, and they are the ones
that have changed least across decades of textbooks. They are also
the parts a reader cannot reasonably skip.

**Engineering reality** — Parts VII through X — covers complexity
theory, noise and error correction, hardware platforms and the
software stack that drives them, and the practical realities of the
NISQ era. These are the chapters where this book diverges most from
older textbook traditions: the field has moved, the available
hardware is no longer hypothetical, and the gap between an algorithm
on paper and the same algorithm on a real device is now a
first-class object of study.

**Applications and frontier** — Parts XI through XIII — surveys
where quantum computing is plausibly useful, the adjacent
computational models that share its lineage, the bridges between
quantum and classical engineering ideas, and the conceptual and
epistemic pitfalls that recur in the literature. These chapters are
less about establishing competence and more about turning the
established competence into informed judgement. They are also the
chapters most likely to age — applications mature, frontiers move —
and the book treats them with appropriate humility about that.

## Reading Linearly vs. Reading Selectively

On a first pass, read linearly. The dependency structure is real:
Chapter 4 establishes the mathematical conventions; Chapter 5 the
physical postulates; Chapter 6 the qubit; Chapter 7 multi-qubit
states and entanglement; Chapter 8 gates; Chapter 9 circuits. By
Chapter 9 a great deal of notation and a great deal of conceptual
machinery is taken for granted. Skipping ahead to, say, Chapter 15
on landmark algorithms without the preceding chapters works for a
reader who already has the background from elsewhere, but it is not
how the book is designed to be approached cold.

That said, certain parts are more independent than others. Part VII
(complexity theory) can be read profitably any time after Chapter 6.
Part IX (hardware and software) is largely independent of the
algorithms parts, and a reader whose interest is engineering rather
than algorithms can read it earlier with little loss. Part XI
(applications) deliberately repeats just enough algorithm context
that an applications-focused reader can land in it without rereading
Part VI in detail, though that reader is better served by reading
Part VI first.

For a second pass, the book is a reference. The chapters are
internally numbered for cross-reference, the appendices are designed
for lookup, and the glossary collects every term introduced in
boldface in the text. The intent is that you should be able to flip
to any chapter mid-career and use it as a reference without
rereading the whole book.

## Suggested Reading Paths

A few concrete paths through the material may help.

*The full linear path*: read every chapter in order. This is the
longest path and the recommended one for a reader new to the field
who wants the complete picture. Expect it to take real time —
quantum computing is not a weekend subject — and read with paper
and pen.

*The algorithms-focused path*: Chapters 1, 4, 5, 6, 7, 8, 9, 10, 11,
then all of Part VI (Chapters 13 through 16). Chapter 17 on
complexity follows naturally. This skips the hardware and
applications material; if your goal is to understand and reason
about quantum algorithms, this is the shortest viable path.

*The hardware-and-systems path*: Chapters 1, 4 (skimming the parts
not used downstream), 5, 6, 7, 8, then jump to Part VIII (noise and
error correction) and Part IX (hardware, control, software). Add
Part X for the NISQ-era practical context. This serves a reader
whose primary interest is the physical and engineering stack.

*The applications and judgement path*: Chapters 1, 2, 3, the
formalism chapters as needed for vocabulary, then a fast pass
through Parts VI and VIII for orientation, then Parts XI, XII, and
XIII. This is the path for a reader who needs to evaluate claims,
make portfolio decisions, or judge the credibility of vendor
announcements without necessarily implementing the algorithms.

*The fastest credible orientation*: Chapter 1 for motivation,
Chapter 4 sections 4.1 through 4.6 for the indispensable linear
algebra, Chapter 6, Chapter 8, Chapter 9, Chapter 11, Chapter 14.
That is roughly a week of evening reading and produces a working
mental model — incomplete, but coherent and extensible.

## A Note on Conventions

A handful of conventions are used throughout, and reading goes much
faster if you have them in mind from the start. They are stated in
full in *Notation and Conventions* and reiterated in Chapter 4, but
the headline items are worth repeating here.

States are written in Dirac notation as $|\psi\rangle$, with the
inner product $\langle\phi|\psi\rangle$ taken to be conjugate-linear
in the first argument (the physicists' convention). Set braces in
math are written $\\{0,1\\}^n$ to survive the GitHub renderer's
unescaping rules; this is a source-level concern only and reads
naturally in the rendered text.

Qubit indices are read left-to-right in ket strings, with the
*leftmost* qubit treated as the most significant. So $|x_1 x_2
\ldots x_n\rangle$ maps to the integer $\sum_i x_i \cdot 2^{n-i}$.
This is the textbook convention. It is the *opposite* of Qiskit's
display order, which is little-endian: a Qiskit `0b01` printout
corresponds to this book's $|10\rangle$. Chapter 4 documents the
conversion in detail; if you are reading along with Qiskit code,
keep the difference visible.

Two-qubit gate matrices are written in the
$|00\rangle, |01\rangle, |10\rangle, |11\rangle$ basis in that
order. With the leftmost-most-significant convention, the CNOT with
control on the first qubit and target on the second has its
familiar block-diagonal form $\mathrm{diag}(I, X)$. Other vendors
and other textbooks sometimes use the reverse basis ordering; when
in doubt, write out the action on the four basis states explicitly.

The QFT convention used here is the one with a *negative* exponent
in the forward transform — that is, $F_N |x\rangle = \tfrac{1}{\sqrt
N} \sum_y e^{-2\pi i x y / N} |y\rangle$, the convention established
and reasoned through in §4.13. Some treatments and some SDKs use the
opposite sign. Chapter 4 documents the consequences in detail; the
short version is that any phase-estimation or controlled-phase code
copied across the convention boundary needs its angles conjugated.

The Bloch sphere is used freely as a visualisation aid for
single-qubit states and gates, but no calculation in the book
depends on the Bloch picture being literal. It is a useful intuition
pump for one qubit; it has no honest generalisation to multi-qubit
systems, and the book is explicit about that distinction when it
comes up.

## A Note on the 2026 Timestamp

This book is being written in 2026, and numbers in this field age
quickly. Specific device counts, gate fidelities, coherence times,
and benchmark results are quoted where they matter; treat any
specific number as approximate and as a snapshot. Vendors publish
updated metrics on their own pages, and the gap between a printed
number and the current state of the art widens by the month.
Wherever a quoted figure is load-bearing for an argument, the
argument is constructed so that it survives the figure improving by
an order of magnitude — that is the right standard, because over
the lifetime of any printed reference book on quantum hardware,
order-of-magnitude changes are realistic.

Where a claim genuinely depends on a current number — for example, a
statement about whether a particular experiment is feasible on
today's hardware — the book says so and gives the date of the claim.
A reader returning to the book in five years should treat such
claims as historical observations, useful for calibration but not as
present-tense statements about the field.

## Acknowledgements

This book draws on the field's standard reference works — Nielsen
and Chuang first among them, alongside the lecture notes of John
Preskill, the surveys of Michael Nielsen, the *Quantum Algorithm
Zoo* maintained by Stephen Jordan, and the documentation of the
major open-source quantum-software projects. Where particular
results, derivations, or examples are drawn from a specific source,
the citation appears in the chapter; Appendix D collects the full
suggested-reading list.

The structure of the book has benefited from the conventions
established by a generation of textbooks in adjacent fields:
introductory machine-learning texts, signal-processing texts, and
compiler-construction texts, all of which face the same problem of
introducing a non-trivial mathematical formalism to an experienced
technical audience. The choice to put sanity-check exercises at the
end of every chapter is borrowed from that tradition.

Errors that remain are mine. The book is a living document; if you
find a mistake, the repository's issue tracker is the right place to
report it.

## License and Attribution

The book is dual-licensed. The text is available for non-commercial
use under the Creative Commons Attribution-NonCommercial-NoDerivatives
4.0 International license (CC BY-NC-ND 4.0). Commercial use, derivative
works, and printed distribution require a separate license; the
LICENSE file at the repository root has the full terms.

The intent of the dual license is straightforward: the book should be
free to read, free to study from, and free to recommend to a colleague;
it should also be possible, eventually, to publish a printed edition
without the licensing conflict that a permissive license would create.
If you would like to use the material in a way the non-commercial
license does not cover — a course pack, a corporate training
programme, a translation, a printed reader — please get in touch.

With those preliminaries out of the way, the next chapter takes a
hard look at exactly what background the book assumes, with concrete
self-check items so you can calibrate before reading on.

---

[Table of Contents](../../README.md) · [Next: Recommended / Assumed Background and Self-Check →](01-background-and-self-check.md)
