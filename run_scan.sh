#!/usr/bin/env bash
# Run the full GELU fp16 scan with FTZ/TAZ + MPFR validation.
# Produces: gelu_fp16_scan.csv, thresholds.md, thresholds.json, mismatches.csv (if any)
set -euo pipefail
cd "$(dirname "$0")"

echo "=== GELU(bfloat16) fp16 Numerical Research ==="
echo ""

# Check dependencies
python3 -c "import numpy, mpmath" 2>/dev/null || {
    echo "Installing dependencies..."
    pip3 install numpy mpmath
}

echo "Running scan..."
python3 gelu_fp16_research.py

echo ""
echo "=== Output files ==="
ls -lh gelu_fp16_scan.csv thresholds.md thresholds.json mismatches.csv 2>/dev/null || true
echo ""
echo "Done."
