#include "gelu_ref.h"

#include <algorithm>
#include <cstdint>
#include <cstring>
#include <iomanip>
#include <iostream>
#include <limits>
#include <vector>
#include <cmath>
#include <stdfloat>

using bf16 = std::bfloat16_t;

static inline bf16 bits_to_bf16(uint16_t bits) {
    bf16 v;
    std::memcpy(&v, &bits, sizeof(v));
    return v;
}

static inline uint16_t bf16_to_bits(bf16 v) {
    uint16_t bits;
    std::memcpy(&bits, &v, sizeof(bits));
    return bits;
}

static inline bool is_nan_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) != 0);
}

static inline bool is_inf_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) == 0);
}

// Strict total-order key for non-NaN values
static inline uint16_t order_key(uint16_t bits) {
    const bool sign = (bits & 0x8000u) != 0;
    return static_cast<uint16_t>(bits ^ (sign ? 0xFFFFu : 0x8000u));
}

static inline bf16 gelu_ref_bf16(bf16 x) {
    return static_cast<bf16>(gelu_ref_fp64(static_cast<double>(x)));
}

struct Entry {
    uint16_t x_bits;
    uint16_t key;
};

int main() {
    // 1) Enumerate all 16-bit patterns, convert to bf16, exclude NaNs and infinities
    std::vector<Entry> entries;
    entries.reserve(65536);

    for (uint32_t i = 0; i < 65536; ++i) {
        const uint16_t bits = static_cast<uint16_t>(i);
        if (is_nan_bits(bits)) continue;
        if (is_inf_bits(bits)) continue;
        entries.push_back(Entry{bits, order_key(bits)});
    }

    // 2) Sort -> entire finite bf16 numeric range
    std::sort(entries.begin(), entries.end(), [](const Entry& a, const Entry& b) {
        return a.key < b.key;
    });

    std::vector<bf16> xs;
    xs.reserve(entries.size());
    for (const auto& e : entries) xs.push_back(bits_to_bf16(e.x_bits));

    // 3) Compute bf16(gelu_fp64(x)) for each x
    std::vector<bf16> ys;
    ys.reserve(xs.size());
    for (bf16 x : xs) ys.push_back(gelu_ref_bf16(x));

    // 4) Split into 50 equal-count bins and report min/max in each bin.
    const int bins = 50;
    const size_t n = xs.size();
    const size_t bin_size = (n + bins - 1) / bins; // ceil

    std::cout << std::scientific << std::setprecision(10);
    std::cout << "bf16 GELU saturation / range binning (finite bf16 only)\n";
    std::cout << "=======================================================\n";
    std::cout << "Total finite bf16 values: " << n << " (expected 65280)\n";
    std::cout << "Bins: " << bins << " (equal-count, last bin may be smaller)\n\n";

    std::cout << std::left
              << std::setw(6)  << "bin"
              << std::setw(10) << "count"
              << std::setw(18) << "x_min"
              << std::setw(18) << "x_max"
              << std::setw(18) << "y_min"
              << std::setw(18) << "y_max"
              << std::setw(8)  << "y=0?"
              << std::setw(10) << "y=x?"
              << "y_min_hex  y_max_hex"
              << "\n";
    std::cout << std::string(120, '-') << "\n";

    for (int b = 0; b < bins; ++b) {
        const size_t start = static_cast<size_t>(b) * bin_size;
        if (start >= n) break;
        const size_t end = std::min(n, start + bin_size);

        double x_min = static_cast<double>(xs[start]);
        double x_max = static_cast<double>(xs[end - 1]);

        double y_min = std::numeric_limits<double>::infinity();
        double y_max = -std::numeric_limits<double>::infinity();
        bool all_zero = true;
        bool all_identity = true;

        uint16_t y_min_bits = 0;
        uint16_t y_max_bits = 0;

        for (size_t i = start; i < end; ++i) {
            const double y = static_cast<double>(ys[i]);
            if (y < y_min) { y_min = y; y_min_bits = bf16_to_bits(ys[i]); }
            if (y > y_max) { y_max = y; y_max_bits = bf16_to_bits(ys[i]); }

            if (y != 0.0) all_zero = false;
            if (ys[i] != xs[i]) all_identity = false;
        }

        std::cout << std::left
                  << std::setw(6)  << b
                  << std::setw(10) << (end - start)
                  << std::setw(18) << x_min
                  << std::setw(18) << x_max
                  << std::setw(18) << y_min
                  << std::setw(18) << y_max
                  << std::setw(8)  << (all_zero ? "yes" : "no")
                  << std::setw(10) << (all_identity ? "yes" : "no")
                  << "0x" << std::hex << std::setw(4) << std::setfill('0') << y_min_bits
                  << "     0x" << std::setw(4) << y_max_bits
                  << std::dec << std::setfill(' ')
                  << "\n";
    }

    return 0;
}


