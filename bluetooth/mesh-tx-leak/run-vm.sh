#!/bin/sh
# Run one command in a fresh BlueZ test-runner guest.
# Usage: run-vm.sh <bzImage> <cpus> <logfile> <command...>
# The guest console (kernel log + command output) is saved to <logfile>.
set -u
BZ=${BLUEZ:-/home/user/work/bluez}
IMG=$1; CPUS=$2; LOG=$3; shift 3

cd "$BZ" || exit 1
timeout 3600 ./tools/test-runner -k "$IMG" -o -m -o 1024M \
	-o -smp -o "$CPUS" -- "$@" > "$LOG" 2>&1
rc=$?
grep -qE "BUG: KASAN|WARNING:|possible circular locking|lockdep|BUG:|Oops" \
	"$LOG" && echo "SPLAT in $LOG"
echo "rc=$rc $LOG"
