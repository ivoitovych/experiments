# How to post the comment on community/community #122438

This directory holds artifacts for filing upstream feedback with GitHub
about Markdown / MathJax rendering bugs that affect this book. The
companion file `community-122438-comment.md` is the comment body to add
to the existing Discussion.

## Why this Discussion, not a new bug

[community/community #122438](https://github.com/community/community/discussions/122438)
(May 2024) already documents the bug we hit in §4.12, §4.13, and §4.14
of Chapter 4: `$$ ... $$` display math does not render inside `>`
blockquotes or list-item-indented continuations. The original reproducer
covers the plain blockquote case (their Case 2) and the in-list
blockquote case (their Case 3); our independent occurrences match both.

A second Discussion,
[community/community #16958](https://github.com/community/community/discussions/16958)
(May 2022), covers only the bullet-list-item case and is partly
subsumed.

Filing a third report would dilute signal. The right move is to add
weight to `#122438` with a 👍 reaction and a comment that confirms the
bug is still live, names the practical workaround, and points at the
documentation gap.

## Prerequisites

```
gh auth login
```

You need write access on `github.com` (any authenticated user can post
discussion comments).

## Post the comment

```bash
# Resolve the Discussion's node ID for community/community #122438
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

On success the second command prints the new comment's URL. If it
fails with a permissions error, log in again with
`gh auth refresh -s write:discussion`.

## Also click the 👍 in the web UI

Reactions are weighted differently from comments in GitHub's
prioritisation. Open
<https://github.com/community/community/discussions/122438> in a browser
and add a 👍 to the original post.

## Open question for a follow-up report

This Discussion covers the `$$` block-form bug. We separately hit four
backslash-eating bugs in the same project:

- `\\` matrix row breaks collapse rows.
- `\{` / `\}` lose their visible braces.
- `\,` thin space renders as a literal comma.
- `\|` norm bars collapse to modulus bars.

A web search did not surface a single Discussion covering all four. If
no existing report turns up after a more thorough search, those four
deserve a single combined "math contexts should be backslash-transparent"
post — distinct enough from `#122438` not to be a duplicate. See
`PROCESS.md` "Known renderer gotchas" for the full catalogue.
