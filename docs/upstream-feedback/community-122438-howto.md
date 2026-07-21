# How to file upstream feedback with GitHub

> **Safety rules for every step below.** (1) Nothing in this file is
> to be executed as a side effect of local work — each public
> mutation (comment, reaction, new Discussion) requires explicit
> authorization immediately before running it. (2) Prefer the
> browser UI for posting: it gives preview, edit, and undo, which
> the API path lacks; the `gh api` recipes below are a fallback.
> (3) Check which account `gh auth status` reports first — posting
> publicly and durably associates this repository with that
> account. (4) The mutation is not idempotent: re-running it posts
> a duplicate comment. (5) Update the comment body's stale facts
> and re-verify links/categories on the day of posting.

This directory holds artifacts for filing upstream feedback with
GitHub about Markdown / MathJax rendering bugs that affect this
book. The companion file `community-122438-comment.md` is the
comment body to add to the existing Discussion. There is also a
case for a *new* focused Discussion — see "Filing a new Discussion"
below.

The authoritative description of the bugs lives in
[`docs/github-markdown-math-bugs.md`](../github-markdown-math-bugs.md);
the test sheet (a manually re-run fixture; see its header) lives at
[`docs/render-tests/math-context-matrix.md`](../render-tests/math-context-matrix.md).
Both are referenced from the comment so that GitHub engineering has
a single-page reproducer.

## Existing Discussions that already cover parts of this

- [community/community #122438](https://github.com/community/community/discussions/122438)
  (May 2024) — "Markdown math doesn't render in list-indented
  blockquotes." Covers their Case 1 (plain top-level OK), Case 2
  (`$$` in `>` blockquote — claimed broken; our test cells B7–B10
  rendered correctly in our recorded runs (2026), so this part may
  have been silently fixed), Case 3 (`$$` in list-indented
  blockquote — broken; matches our cells D8, D9, F8, F9, J6).
- [community/community #16958](https://github.com/community/community/discussions/16958)
  (May 2022) — narrower case, math in bullet-list items.

The new comment adds three things the existing Discussions do not
cover:

1. The inline-`\begin{...}`-environment bug (our cell A2 and
   friends; Section M's M1 is the minimal reproducer, and the
   failure covers all tested matrix environments, not just
   `pmatrix`).
2. Norm bars collapsing to single bars inside Markdown table cells
   (our cell H6; observed behavior — the column-separator
   interaction is a hypothesis, not isolated).
3. A correction that block math inside a plain `>` blockquote
   rendered correctly in our runs, plus the *confirmed* diagnosis of
   what really breaks it: list-marker-led continuation lines
   (Sections L and N of the test sheet).

## Prerequisites

```
gh auth login
```

You need write access on `github.com`. If posting a discussion
comment, also confirm the auth has `write:discussion` scope:

```
gh auth refresh -s write:discussion
```

## Posting the comment on #122438

```bash
# Resolve the Discussion's node ID
DISCUSSION_ID=$(gh api graphql -f query='
  query {
    repository(owner: "community", name: "community") {
      discussion(number: 122438) { id }
    }
  }
' --jq '.data.repository.discussion.id')

echo "Discussion ID: $DISCUSSION_ID"

# Post the comment, reading the body from this directory.
# Run from the repository root so the relative path resolves.
gh api graphql \
  -f query='
    mutation($id: ID!, $body: String!) {
      addDiscussionComment(input: { discussionId: $id, body: $body }) {
        comment { url }
      }
    }
  ' \
  -f id="$DISCUSSION_ID" \
  -f body="$(cat docs/upstream-feedback/community-122438-comment.md)"
```

On success the second command prints the new comment's URL.

## Also click 👍 in the web UI

Reactions may factor into how GitHub triages Discussions (we have
no documented confirmation of the weighting). If authorized, open
<https://github.com/community/community/discussions/122438> and add
a 👍 to the original post.

## Filing a new Discussion

The inline-environment bug (Bug 2 in the memo) breaks in every
tested container, is small to reproduce (cell M1), and is unrelated
to lists or blockquotes. The
existing Discussions are about list / blockquote interactions and
do not cover it. Filing a dedicated Discussion may produce a
cleaner upstream record than burying it as one item in a comment.

If you decide to file:

- **Title**: *Inline `$\begin{...}...\end{...}$` LaTeX environments
  render as literal LaTeX in every container (minimal case: 1×1
  `pmatrix`, no `&`, no row break)*
- **Category**: *Repositories* (math rendering belongs there in the
  community/community taxonomy)
- **Body**: a short version of the inline-environment entry from
  the memo, plus the test sheet URL as supplemental evidence. The
  sheet's M1 cell is the minimal failing input (smaller than A2);
  B2 through K2 prove container-independence, and M4–M8 prove it is
  not `pmatrix`-specific.
- **Category**: verify the live category list at posting time
  rather than trusting the suggestion above.

`gh` does not have first-class discussion-create support, so you
would post via the web UI or via a `gh api graphql` mutation
similar to the comment one above (use `createDiscussion` instead of
`addDiscussionComment`). The form needs a `repositoryId` and a
`categoryId`; resolve them with a small GraphQL *query* first (a
read-only query, not a mutation).

## On a non-duplicate-filing principle

The earlier draft of this howto argued against filing anything new
because the previous comment-only plan looked like a duplicate.
With the inline-`pmatrix` bug now identified as universal and not
covered by `#122438`, the calculus shifts: a focused new Discussion
is *not* a duplicate, and the cleaner upstream record is worth more
than the marginal noise.
