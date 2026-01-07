#include "ulp_calculator.h"
#include "gelu_ref.h"

#include <cstdint>
#include <iomanip>
#include <iostream>
#include <limits>

using bf16 = std::bfloat16_t;

static inline bool is_nan_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) != 0);
}

static inline bool is_inf_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) == 0);
}

static inline bool is_zero_bf16(bf16 v) {
    return static_cast<double>(v) == 0.0;
}

static bf16 gelu_ref_bf16(bf16 x) {
    double xd = static_cast<double>(x);
    double yd = gelu_ref_fp64(xd);
    return static_cast<bf16>(yd);
}

int main() {
    ULP_Calculator ulp;
    const int64_t max_idx = static_cast<int64_t>(ulp.total_values()) - 1;

    std::cout << std::scientific << std::setprecision(10);
    std::cout << "Exact bf16 GELU saturation bounds (full scan from range ends)\n";
    std::cout << "============================================================\n\n";

    // NEGATIVE tail: scan from most-negative towards 0.
    // Find the first x where GELU_bf16(x) != 0, after skipping -inf.
    bool neg_found = false;
    bf16 neg_first_nonzero_x = static_cast<bf16>(0.0f);
    bf16 neg_last_zero_x = static_cast<bf16>(0.0f);

    for (int64_t idx = 0; idx <= max_idx; ++idx) {
        bf16 x = ulp.value_at_index(idx);
        uint16_t bits = ULP_Calculator::bf16_to_bits_public(x);
        if (is_inf_bits(bits)) continue;
        if (static_cast<double>(x) >= 0.0) break;

        bf16 y = gelu_ref_bf16(x);
        if (is_zero_bf16(y)) {
            neg_last_zero_x = x;
            continue;
        }
        neg_first_nonzero_x = x;
        neg_found = true;
        break;
    }

    // POSITIVE tail: scan from most-positive towards 0.
    // Find the first x where GELU_bf16(x) != x, after skipping +inf.
    bool pos_found = false;
    bf16 pos_first_mismatch_x = static_cast<bf16>(0.0f);
    bf16 pos_first_saturated_x = static_cast<bf16>(0.0f);

    for (int64_t idx = max_idx; idx >= 0; --idx) {
        bf16 x = ulp.value_at_index(idx);
        uint16_t bits = ULP_Calculator::bf16_to_bits_public(x);
        if (is_inf_bits(bits)) continue;
        if (static_cast<double>(x) <= 0.0) break;

        bf16 y = gelu_ref_bf16(x);
        if (y == x) {
            pos_first_saturated_x = x; // smallest seen so far while scanning down
            continue;
        }
        pos_first_mismatch_x = x;
        pos_found = true;
        break;
    }

    if (!neg_found) {
        std::cout << "Negative tail: did not find any non-zero outputs before reaching 0 (unexpected)\n";
    } else {
        std::cout << "Negative tail saturation:\n";
        std::cout << "  last x with GELU_bf16(x)==0: " << static_cast<double>(neg_last_zero_x)
                  << "  bits=0x" << std::hex << ULP_Calculator::bf16_to_bits_public(neg_last_zero_x) << std::dec << "\n";
        std::cout << "  first x with GELU_bf16(x)!=0: " << static_cast<double>(neg_first_nonzero_x)
                  << "  bits=0x" << std::hex << ULP_Calculator::bf16_to_bits_public(neg_first_nonzero_x) << std::dec << "\n";
        std::cout << "  GELU_bf16(last_zero)  = " << static_cast<double>(gelu_ref_bf16(neg_last_zero_x)) << "\n";
        std::cout << "  GELU_bf16(first_non0) = " << static_cast<double>(gelu_ref_bf16(neg_first_nonzero_x)) << "\n\n";
    }

    if (!pos_found) {
        std::cout << "Positive tail: did not find any mismatch (unexpected)\n";
    } else {
        std::cout << "Positive tail saturation:\n";
        std::cout << "  first x (from +end) where GELU_bf16(x)!=x: " << static_cast<double>(pos_first_mismatch_x)
                  << "  bits=0x" << std::hex << ULP_Calculator::bf16_to_bits_public(pos_first_mismatch_x) << std::dec << "\n";
        std::cout << "  smallest x observed with GELU_bf16(x)==x (saturation starts at): " << static_cast<double>(pos_first_saturated_x)
                  << "  bits=0x" << std::hex << ULP_Calculator::bf16_to_bits_public(pos_first_saturated_x) << std::dec << "\n";
        std::cout << "  GELU_bf16(mismatch_x) = " << static_cast<double>(gelu_ref_bf16(pos_first_mismatch_x)) << "\n";
        std::cout << "  GELU_bf16(sat_x)      = " << static_cast<double>(gelu_ref_bf16(pos_first_saturated_x)) << "\n\n";
    }

    // Suggest non-saturated region (inclusive) as:
    //   [neg_first_nonzero_x, pos_first_mismatch_x]
    if (neg_found && pos_found) {
        std::cout << "Non-saturated input region (where output is neither forced to 0 nor forced to x):\n";
        std::cout << "  [" << static_cast<double>(neg_first_nonzero_x) << ", " << static_cast<double>(pos_first_mismatch_x) << "]\n\n";
    }

    // Quick verification (show a few samples far in tails)
    std::cout << "Sanity samples:\n";
    auto show = [&](bf16 x) {
        bf16 y = gelu_ref_bf16(x);
        std::cout << "  x=" << static_cast<double>(x)
                  << "  GELU_bf16=" << static_cast<double>(y)
                  << "  (zero? " << (is_zero_bf16(y) ? "yes" : "no")
                  << ", identity? " << (y == x ? "yes" : "no") << ")\n";
    };

    show(static_cast<bf16>(-20.0));
    show(static_cast<bf16>(-10.0));
    show(static_cast<bf16>(-8.0));
    show(static_cast<bf16>(-6.0));
    show(static_cast<bf16>(3.0));
    show(static_cast<bf16>(4.0));
    show(static_cast<bf16>(8.0));
    show(static_cast<bf16>(10.0));

    return 0;
}


