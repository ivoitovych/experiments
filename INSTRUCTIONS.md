# Instructions

## Purpose
Rules for anyone implementing changes on this experimental branch.

## Git identity
Set **both global and repo-local** identity (regardless of where you run Git from).
Note: **repo-local overrides global** for this repository.

```bash
# Global defaults
git config --global user.name "Iaroslav Voitovych"
git config --global user.email "yaroslav.voytovych@gmail.com"

# Repo-local (this repo takes precedence over global)
git config user.name "Iaroslav Voitovych"
git config user.email "yaroslav.voytovych@gmail.com"
```

## Commit rules (must follow)
- Commits must have:
  - **Author:** `Iaroslav Voitovych <yaroslav.voytovych@gmail.com>`
  - **Committer:** `Iaroslav Voitovych <yaroslav.voytovych@gmail.com>`

## Verify before committing
```bash
git config --global --get user.name
git config --global --get user.email
git config --get user.name
git config --get user.email
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

