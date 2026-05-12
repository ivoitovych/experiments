Hit this independently in May 2026 while writing a long-form Markdown book that renders directly on GitHub (math chapters, lots of `$$ ... $$` callouts). Confirming the original repro is still accurate at the time of writing, and adding two practical notes for anyone landing here from a web search.

**Same bug, two visible flavours.** What our screenshot review surfaced:

1. `$$ ... $$` inside a `>` blockquote (e.g. a boxed "Sanity check" containing a display equation) — the equation renders as literal `$$`, `\rangle`, `\tfrac` text. In some cases a line that begins with `\omega^{-2}|2\rangle` gets misread by the list parser and an unwanted bullet `•` is injected mid-equation.
2. `$$ ... $$` indented under a numbered or bulleted list item — same outcome: literal source visible to the reader.

In both cases inline `$...$` works fine in the same context; only the block form breaks.

**Practical workaround.** Pulling each display equation *out* of the blockquote / list-item continuation and using a bold-prefixed paragraph (`**Sanity check.**`, `**Sign convention.**`, `**Von Neumann entropy.**`, …) in place of the `>` block or list item is the smallest source-level change that gets the math to render. The cost is losing the boxed-callout affordance for those specific paragraphs; the math is correct, but the visual separation that `>` blockquotes provide is gone.

**Documentation gap.** [GitHub's "Writing mathematical expressions" docs](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions) do not warn that `$$ ... $$` fails inside blockquotes and list-item continuations. Even if the parser itself is not changing soon, mentioning the limitation (and the inline-math workaround) on that docs page would save a lot of debugging time for anyone using GitHub-flavoured Markdown as a primary publishing surface.

**Adjacent gotchas in the same family.** While we were chasing this, we hit four more cases where GitHub's Markdown unescapes a backslash before MathJax sees it — `\\` (matrix row breaks collapse to row vectors), `\{` / `\}` (set braces become invisible), `\,` (thin space renders as a literal comma), `\|` (vector and operator norms collapse to modulus bars). The composite picture is that *all* GitHub-only ways math-source can quietly become wrong should probably be on the docs page or in a known-limitations section. Happy to write that up if it helps.
