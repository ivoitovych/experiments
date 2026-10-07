#!/bin/sh
# Verify the author, committer and message trailers of commits.
#
# Usage: tools/check-attribution.sh [<rev-range>]   (default: all commits on HEAD)
#
# Installed under a hook name, it checks that stage:
#   pre-commit  the author and committer identity about to be used
#   commit-msg  the message being committed ($1 = message file)
#   pre-push    every commit not yet on the remote (refs on stdin)
# Install (copies, so the hooks work on every branch):
#   for h in pre-commit commit-msg pre-push; do
#     cp tools/check-attribution.sh .git/hooks/$h; chmod +x .git/hooks/$h
#   done
IDENT='Iaroslav Voitovych <yaroslav.voytovych@gmail.com>'
ZERO=0000000000000000000000000000000000000000
fail=0

# check_msg <label> <message>. Only "Signed-off-by: <IDENT>" is an allowed
# trailer. Not fed through a pipe: a function at the end of a pipeline runs
# in a subshell, and its fail=1 would be lost.
check_msg() {
	msg=$2
	bad=$(printf '%s\n' "$msg" | git interpret-trailers --parse |
	      grep -v -x "Signed-off-by: $IDENT")
	if [ -n "$bad" ]; then
		echo "BAD trailer   $1: $bad"; fail=1
	fi
	if printf '%s\n' "$msg" | grep -qiE 'co-authored-by|noreply@'; then
		echo "BAD message   $1: co-author or noreply address"; fail=1
	fi
}

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
		check_msg "$c" "$(git show -s --format=%B "$c")"
	done
}

# Identity as git would record it now: "Name <email> <time> <tz>".
check_ident() {
	for v in GIT_AUTHOR_IDENT GIT_COMMITTER_IDENT; do
		id=$(git var $v | sed 's/ [0-9]* [-+][0-9]*$//')
		if [ "$id" != "$IDENT" ]; then
			echo "BAD $v: $id"; fail=1
		fi
	done
}

case $(basename "$0") in
pre-commit)
	check_ident
	;;
commit-msg)
	# Comment lines are not part of the final message.
	check_msg "new commit" "$(grep -v '^#' "$1")"
	;;
pre-push)
	# $1 = remote name, $2 = remote URL; refs come on stdin.
	while read -r lref lsha rref rsha; do
		[ "$lsha" = "$ZERO" ] && continue
		if [ "$rsha" = "$ZERO" ]; then
			check_range "$lsha" --not --remotes
		else
			check_range "$rsha..$lsha"
		fi
	done
	;;
*)
	if [ $# -gt 0 ]; then
		check_range "$@"
	else
		check_range HEAD
	fi
	;;
esac

[ $fail -eq 0 ] && echo "OK ($(basename "$0"))"
exit $fail
