#include "ulp_calculator.h"
#include "gelu_ref.h"

#include <iostream>
#include <iomanip>
#include <limits>

static inline bool is_nan_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) != 0);
}

static inline bool is_inf_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) == 0);
}

int main() {
    using bf16 = std::bfloat16_t;

    ULP_Calculator ulp;

    auto gelu_ref_bf16 = [&](bf16 x) -> bf16 {
        double xd = static_cast<double>(x);
        double yd = gelu_ref_fp64(xd);
        return static_cast<bf16>(yd);
    };

    // We iterate ALL bf16 bit patterns (excluding NaNs) and reason about:
    // - negative tail saturation: GELU(x) rounds to 0 (either +0/-0)
    // - positive tail saturation: GELU(x) rounds to x exactly (bf16)

    bf16 neg_sat_max = static_cast<bf16>(-0.0f); // will store max x<0 with GELU(x)==0
    bool neg_found_any = false;

    // For positive tail, we want the minimal x where for all x' >= x, GELU(x') == x'.
    // We'll compute last mismatch when scanning from +infinity downwards.
    bf16 pos_sat_min = std::numeric_limits<bf16>::infinity();
    bool pos_found = false;

    // Build list of all finite bf16 values in increasing numerical order using ULP indices.
    // We rely on ulp.value_at_index() which uses canonical bits (NaNs excluded, ±0 collapsed).
    const int64_t max_idx = static_cast<int64_t>(ulp.total_values()) - 1;

    // Negative tail: start from the most negative finite values and move towards 0.
    // We want the *tail* boundary, so we stop at the first x where GELU_bf16(x) becomes non-zero.
    bool neg_tail_saw_zero = false;
    bf16 neg_tail_last_zero_x = static_cast<bf16>(0.0f);
    for (int64_t idx = 0; idx <= max_idx; ++idx) {
        bf16 x = ulp.value_at_index(idx);
        uint16_t bits = ULP_Calculator::bf16_to_bits_public(x);
        if (is_inf_bits(bits)) continue;
        if (static_cast<double>(x) >= 0.0) break; // reached non-negative

        bf16 y = gelu_ref_bf16(x);
        if (static_cast<double>(y) == 0.0) {
            neg_tail_last_zero_x = x;
            neg_tail_saw_zero = true;
            continue;
        }

        // First non-zero output after a (possibly long) run of zeros => tail saturation boundary found.
        if (neg_tail_saw_zero) {
            neg_sat_max = neg_tail_last_zero_x;
            neg_found_any = true;
            break;
        }
    }

    // Positive tail: scan positive finite values from largest downwards,
    // find the first point where GELU(x) != x (a mismatch). Saturation begins above it.
    bf16 last_x_with_mismatch = static_cast<bf16>(0.0f);
    bool saw_mismatch = false;
    for (int64_t idx = max_idx; idx >= 0; --idx) {
        bf16 x = ulp.value_at_index(idx);
        uint16_t bits = ULP_Calculator::bf16_to_bits_public(x);
        if (is_inf_bits(bits)) continue;
        if (static_cast<double>(x) <= 0.0) break;

        bf16 y = gelu_ref_bf16(x);
        if (y != x) {
            last_x_with_mismatch = x;
            saw_mismatch = true;
            break;
        }
    }

    if (saw_mismatch) {
        // saturation starts at the next representable bf16 above last mismatch
        int64_t idx_m = ulp.get_ulp_index(last_x_with_mismatch);
        if (idx_m >= 0 && idx_m + 1 <= max_idx) {
            pos_sat_min = ulp.value_at_index(idx_m + 1);
            pos_found = true;
        }
    } else {
        // If never mismatched, saturation holds from the smallest positive value (unlikely).
        pos_sat_min = ulp.value_at_index(ulp.get_ulp_index(static_cast<bf16>(0.0f)) + 1);
        pos_found = true;
    }

    std::cout << std::scientific << std::setprecision(10);
    std::cout << "bfloat16 GELU tail saturation bounds (exact scan over bf16 inputs)\n";
    std::cout << "==================================================================\n\n";

    if (neg_found_any) {
        std::cout << "Negative tail saturation to 0 (max x < 0 with GELU_bf16(x) == 0):\n";
        std::cout << "  x_neg_sat_max = " << static_cast<double>(neg_sat_max) << "\n";
        std::cout << "  bits          = 0x" << std::hex << ULP_Calculator::bf16_to_bits_public(neg_sat_max) << std::dec << "\n";
        std::cout << "  GELU_fp64(x)  = " << gelu_ref_fp64(static_cast<double>(neg_sat_max)) << "\n";
        std::cout << "  GELU_bf16(x)  = " << static_cast<double>(gelu_ref_bf16(neg_sat_max)) << "\n\n";

        // show neighbor above
        int64_t idx = ulp.get_ulp_index(neg_sat_max);
        if (idx >= 0 && idx + 1 <= max_idx) {
            bf16 x1 = ulp.value_at_index(idx + 1);
            std::cout << "Next bf16 above x_neg_sat_max:\n";
            std::cout << "  x = " << static_cast<double>(x1) << ", GELU_bf16(x) = " << static_cast<double>(gelu_ref_bf16(x1)) << "\n\n";
        }
    } else {
        std::cout << "Negative tail saturation to 0: NOT FOUND (unexpected)\n\n";
    }

    if (pos_found) {
        std::cout << "Positive tail saturation to identity (min x > 0 such that for all larger bf16 x, GELU_bf16(x) == x):\n";
        std::cout << "  x_pos_sat_min = " << static_cast<double>(pos_sat_min) << "\n";
        std::cout << "  bits          = 0x" << std::hex << ULP_Calculator::bf16_to_bits_public(pos_sat_min) << std::dec << "\n";
        std::cout << "  GELU_fp64(x)  = " << gelu_ref_fp64(static_cast<double>(pos_sat_min)) << "\n";
        std::cout << "  GELU_bf16(x)  = " << static_cast<double>(gelu_ref_bf16(pos_sat_min)) << "\n\n";

        // show neighbor below
        int64_t idx = ulp.get_ulp_index(pos_sat_min);
        if (idx > 0) {
            bf16 x0 = ulp.value_at_index(idx - 1);
            std::cout << "Previous bf16 below x_pos_sat_min:\n";
            std::cout << "  x = " << static_cast<double>(x0) << ", GELU_bf16(x) = " << static_cast<double>(gelu_ref_bf16(x0))
                      << ", (GELU_bf16==x? " << (gelu_ref_bf16(x0) == x0 ? "yes" : "no") << ")\n\n";
        }
    } else {
        std::cout << "Positive tail saturation to identity: NOT FOUND (unexpected)\n\n";
    }

    std::cout << "Approximation region (suggested):\n";
    if (neg_found_any && pos_found) {
        // region where outputs are not forced-saturated
        int64_t i_neg = ulp.get_ulp_index(neg_sat_max);
        int64_t i_pos = ulp.get_ulp_index(pos_sat_min);
        bf16 approx_min = (i_neg >= 0 && i_neg + 1 <= max_idx) ? ulp.value_at_index(i_neg + 1) : neg_sat_max;
        bf16 approx_max = (i_pos >= 1) ? ulp.value_at_index(i_pos - 1) : pos_sat_min;
        std::cout << "  [" << static_cast<double>(approx_min) << ", " << static_cast<double>(approx_max) << "]\n";
    } else {
        std::cout << "  (unavailable)\n";
    }

    return 0;
}


