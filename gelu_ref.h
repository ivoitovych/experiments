#ifndef GELU_REF_H
#define GELU_REF_H

#include <cmath>

// fp64 erf-based reference GELU
// GELU(x) = x * Phi(x) = x * 0.5 * (1 + erf(x / sqrt(2)))
inline double gelu_ref_fp64(double x) {
    // Use an erfc-based form to avoid catastrophic cancellation in the negative tail.
    // For x < 0:
    //   Phi(x) = 0.5 * erfc((-x)/sqrt(2))
    //   GELU(x) = 0.5 * x * erfc((-x)/sqrt(2))
    // For x >= 0:
    //   Phi(x) = 1 - 0.5 * erfc(x/sqrt(2))
    //   GELU(x) = x - 0.5 * x * erfc(x/sqrt(2))
    const double inv_sqrt2 = 1.0 / std::sqrt(2.0);
    if (x < 0.0) {
        return 0.5 * x * std::erfc((-x) * inv_sqrt2);
    }
    return x - 0.5 * x * std::erfc(x * inv_sqrt2);
}

#endif // GELU_REF_H


