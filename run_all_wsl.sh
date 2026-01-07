#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

rm -rf run_logs
mkdir -p run_logs

echo "Rebuilding all *.cpp -> executables" | tee run_logs/summary.txt
echo "" >> run_logs/summary.txt

: > run_logs/build.log
: > run_logs/build_failures.log

for f in *.cpp; do
  base="${f%.cpp}"
  echo "[build] $base" >> run_logs/build.log
  if ! g++ -std=c++23 -O2 -o "$base" "$f" -lm >> run_logs/build.log 2>&1; then
    echo "$base" >> run_logs/build_failures.log
  fi
done

echo "Build failures (if any):" >> run_logs/summary.txt
if [[ -s run_logs/build_failures.log ]]; then
  cat run_logs/build_failures.log >> run_logs/summary.txt
else
  echo "none" >> run_logs/summary.txt
fi
echo "" >> run_logs/summary.txt

: > run_logs/run.log
: > run_logs/run_timeouts.log

echo "Running all ELF executables (timeout 20s each)" >> run_logs/summary.txt
for exe in *; do
  if [[ -f "$exe" ]] && file -- "$exe" | grep -q "ELF"; then
    echo "[run] $exe" >> run_logs/run.log
    if timeout 20s "./$exe" > "run_logs/${exe}.out" 2> "run_logs/${exe}.err"; then
      echo "rc=0" >> run_logs/run.log
    else
      rc=$?
      echo "rc=$rc" >> run_logs/run.log
      if [[ $rc -eq 124 ]]; then
        echo "$exe" >> run_logs/run_timeouts.log
      fi
    fi
  fi
done

echo "" >> run_logs/summary.txt
echo "Timeouts (if any):" >> run_logs/summary.txt
if [[ -s run_logs/run_timeouts.log ]]; then
  cat run_logs/run_timeouts.log >> run_logs/summary.txt
else
  echo "none" >> run_logs/summary.txt
fi

echo "" >> run_logs/summary.txt
echo "Done. See run_logs/ for build.log, run.log, and per-program .out/.err." >> run_logs/summary.txt


