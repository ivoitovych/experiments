# Attribution policy

All content on this branch is authored and committed by:

    Iaroslav Voitovych <yaroslav.voytovych@gmail.com>

Rules:

1. Author **and** committer of every commit must be exactly the identity above.
2. Commit messages carry no co-author or session trailers. The only trailer
   allowed is `Signed-off-by:` with the identity above. In particular
   `Co-Authored-By:` must never appear.
3. Branch names describe the work only: no tool names and no random
   suffixes/hashes.
4. Before every push, review each new commit verbosely and run the checker:

       git log --format=fuller origin/<branch>..HEAD   # or full range for a new branch
       git show --format=fuller -s <commit>
       tools/check-attribution.sh <range>

   The push is allowed only if the checker prints `OK`.

Identity setup (global and repo-local):

    git config --global user.name  "Iaroslav Voitovych"
    git config --global user.email "yaroslav.voytovych@gmail.com"
    git config user.name  "Iaroslav Voitovych"
    git config user.email "yaroslav.voytovych@gmail.com"

To enforce the check automatically, install it as a pre-push hook:

    ln -sf ../../tools/check-attribution.sh .git/hooks/pre-push
