#!/bin/sh
# Verify author, committer and message trailers of commits.
# Usage: tools/check-attribution.sh [<rev-range>]   (default: all commits on HEAD)
# Installed as .git/hooks/pre-push (symlink) it reads "<local ref> <local sha> <remote ref> <remote sha>"
# lines from stdin and checks every commit not yet on the remote.
# Install: ln -sf ../../tools/check-attribution.sh .git/hooks/pre-push
IDENT='Iaroslav Voitovych <yaroslav.voytovych@gmail.com>'
ZERO=0000000000000000000000000000000000000000
fail=0

check_range() {
	if ! revs=$(git rev-list "$@"); then
		echo "BAD range     $*"; fail=1
		return
	fi
	for c in $revs; do
		a=$(git show -s --format='%an <%ae>' "$c")
		m=$(git show -s --format='%cn <%ce>' "$c")
		if [ "$a" != "$IDENT" ]; then
			echo "BAD author    $c: $a"; fail=1
		fi
		if [ "$m" != "$IDENT" ]; then
			echo "BAD committer $c: $m"; fail=1
		fi
		# Only "Signed-off-by: <IDENT>" is an allowed trailer.
		bad=$(git show -s --format=%B "$c" |
		      git interpret-trailers --parse |
		      grep -v -x "Signed-off-by: $IDENT")
		if [ -n "$bad" ]; then
			echo "BAD trailer   $c: $bad"; fail=1
		fi
		if git show -s --format=%B "$c" | grep -qiE 'co-authored-by|noreply@'; then
			echo "BAD message   $c: co-author or noreply address"; fail=1
		fi
	done
}

if [ "$(basename "$0")" = pre-push ]; then
	# Hook mode: $1 = remote name, $2 = remote URL; refs come on stdin.
	while read -r lref lsha rref rsha; do
		[ "$lsha" = "$ZERO" ] && continue
		if [ "$rsha" = "$ZERO" ]; then
			check_range "$lsha" --not --remotes
		else
			check_range "$rsha..$lsha"
		fi
	done
elif [ $# -gt 0 ]; then
	check_range "$@"
else
	check_range HEAD
fi

[ $fail -eq 0 ] && echo OK
exit $fail
