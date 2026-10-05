#!/bin/sh
# Check every VM log under a results directory:
#   - the guest command ran to completion and reported an exit status
#   - the kernel banner matches the commit expected for that build
#   - no KASAN / lockdep / WARNING / BUG / Oops report
#   - reproducer runs ended without an ERROR line
# Usage: audit-logs.sh <logs-dir>     (exits non-zero on any problem)
set -u
LOGS=${1:?logs dir}

expected() {
	case ${1#reps-} in
	control) echo 036d4119079a ;;
	patched) echo 59f710c1a4bd ;;
	diag-control|diag-control-first-pass|probe-diag-control) echo 3792c210325e ;;
	diag-patched) echo 8ac2a343ce63 ;;
	*) echo unknown ;;
	esac
}

bad=0
printf "%-26s %-42s %-6s %-14s %s\n" build run status kernel reports
for f in "$LOGS"/*/*.log; do
	build=$(basename "$(dirname "$f")")
	run=$(basename "$f" .log)
	status=$(grep -aoE "Process [0-9]+ exited with status [0-9]+" "$f" |
		tail -1 | awk '{print $NF}')
	commit=$(grep -aoE "Linux version [^ ]+-g[0-9a-f]{12}" "$f" | head -1 |
		sed 's/.*-g//')
	reports=$(grep -acE "BUG: KASAN|WARNING:|possible circular locking|possible recursive locking|inconsistent lock state|BUG:|Oops" "$f")
	note=
	[ -z "$status" ] && { note="$note no-exit-status"; bad=1; }
	[ "$commit" != "$(expected "$build")" ] && { note="$note wrong-kernel"; bad=1; }
	[ "$reports" != 0 ] && { note="$note kernel-reports"; bad=1; }
	case $run in
	*tester*)
		# testers exit 1 when any case fails; judged by their summary
		;;
	*)
		[ "${status:-x}" != 0 ] && { note="$note nonzero-exit"; bad=1; }
		grep -aq "^ERROR:" "$f" && { note="$note reproducer-error"; bad=1; }
		;;
	esac
	printf "%-26s %-42s %-6s %-14s %s%s\n" "$build" "$run" "${status:-none}" \
		"${commit:-none}" "$reports" "$note"
done
echo
[ $bad -eq 0 ] && echo "AUDIT OK" || echo "AUDIT FOUND PROBLEMS"
exit $bad
