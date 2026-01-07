#ifndef ULP_CALCULATOR_H
#define ULP_CALCULATOR_H

#include <stdfloat>
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <cmath>
#include <iostream>
#include <bit>
#include <cstdint>
#include <cstring>

using bf16 = std::bfloat16_t;

/**
 * ULP (Units in the Last Place) Calculator for bfloat16
 *
 * This calculator provides ULP distance calculations between bfloat16 values.
 * ULP is a measure of the difference between two floating-point numbers in terms
 * of the least significant bit of the significand.
 *
 * The calculator uses a reference method that:
 * 1. Iterates through all possible bfloat16 bit patterns (0-65535)
 * 2. Interprets them as bfloat16 values
 * 3. Sorts them by numerical value
 * 4. Assigns each value a unique index (+0 and -0 share the same index)
 * 5. Excludes NaN values from the ordering
 */
class ULP_Calculator {
private:
    // Canonical bits for each ULP index (NaNs excluded; +0/-0 share the same index).
    std::vector<uint16_t> index_to_bits_;
    std::unordered_map<uint16_t, int64_t> bit_to_ulp_index_;
    bool initialized_;

    static constexpr uint16_t BF16_SIGN_MASK = 0x8000;
    static constexpr uint16_t BF16_EXP_MASK  = 0x7F80;
    static constexpr uint16_t BF16_FRAC_MASK = 0x007F;

    // Convert bit pattern to bfloat16 value
    static bf16 bits_to_bf16(uint16_t bits) {
        bf16 result;
        memcpy(&result, &bits, sizeof(bf16));
        return result;
    }

    // Convert bfloat16 value to bit pattern
    static uint16_t bf16_to_bits(bf16 value) {
        uint16_t bits;
        memcpy(&bits, &value, sizeof(uint16_t));
        return bits;
    }

    // Check if a bit pattern represents NaN
    static bool is_nan_bits(uint16_t bits) {
        // bfloat16 NaN: sign bit can be 0 or 1, exponent all 1s, significand non-zero
        return ((bits & BF16_EXP_MASK) == BF16_EXP_MASK) && ((bits & BF16_FRAC_MASK) != 0);
    }

    static bool is_zero_bits(uint16_t bits) {
        return (bits & ~BF16_SIGN_MASK) == 0;
    }

    // IEEE-754-ish total ordering key for non-NaN values.
    // For floats, a common monotonic mapping is:
    //   key = bits ^ (sign ? 0xFFFF : 0x8000)
    // This provides a strict total order across all non-NaN values.
    static uint16_t order_key(uint16_t bits) {
        const bool sign = (bits & BF16_SIGN_MASK) != 0;
        return static_cast<uint16_t>(bits ^ (sign ? 0xFFFFu : 0x8000u));
    }

    void initialize() {
        if (initialized_) return;

        struct Entry { uint16_t bits; uint16_t key; };
        std::vector<Entry> entries;
        entries.reserve(65536);

        for (uint32_t i = 0; i < 65536; ++i) {
            uint16_t bits = static_cast<uint16_t>(i);
            if (is_nan_bits(bits)) continue;
            entries.push_back(Entry{bits, order_key(bits)});
        }

        std::sort(entries.begin(), entries.end(), [](const Entry& a, const Entry& b) {
            return a.key < b.key;
        });

        // Build index mapping, collapsing +0/-0 to the same index.
        index_to_bits_.clear();
        index_to_bits_.reserve(entries.size());

        bool saw_zero = false;
        for (const auto& e : entries) {
            if (is_zero_bits(e.bits)) {
                if (!saw_zero) {
                    // Canonicalize zero to +0
                    index_to_bits_.push_back(0x0000);
                    bit_to_ulp_index_[0x0000] = static_cast<int64_t>(index_to_bits_.size() - 1);
                    bit_to_ulp_index_[0x8000] = static_cast<int64_t>(index_to_bits_.size() - 1);
                    saw_zero = true;
                }
                continue;
            }
            index_to_bits_.push_back(e.bits);
            bit_to_ulp_index_[e.bits] = static_cast<int64_t>(index_to_bits_.size() - 1);
        }

        initialized_ = true;
    }

public:
    ULP_Calculator() : initialized_(false) {
        initialize();
    }

    // Public accessors for testing
    static bf16 bits_to_bf16_public(uint16_t bits) { return bits_to_bf16(bits); }
    static uint16_t bf16_to_bits_public(bf16 value) { return bf16_to_bits(value); }
    static bool is_nan_bits_public(uint16_t bits) { return is_nan_bits(bits); }

    /**
     * Get the ULP index for a bfloat16 value
     * Returns -1 for NaN values
     */
    int64_t get_ulp_index(bf16 value) const {
        if (std::isnan(value)) return -1;

        uint16_t bits = bf16_to_bits(value);

        // Special case: -0 should have same index as +0
        if (is_zero_bits(bits)) {
            bits = 0x0000;
        }

        auto it = bit_to_ulp_index_.find(bits);
        if (it != bit_to_ulp_index_.end()) {
            return it->second;
        }

        // This should never happen for valid bfloat16 values
        return -2;
    }

    /**
     * Calculate ULP distance between two bfloat16 values
     * Returns -1 if either value is NaN
     */
    int64_t ulp_distance(bf16 a, bf16 b) const {
        if (std::isnan(a) || std::isnan(b)) return -1;

        int64_t idx_a = get_ulp_index(a);
        int64_t idx_b = get_ulp_index(b);

        if (idx_a == -2 || idx_b == -2) return -2; // Error

        return std::abs(idx_a - idx_b);
    }

    /**
     * Get the total number of ULP indices (NaNs excluded; +0 and -0 share one index).
     */
    size_t total_values() const {
        return index_to_bits_.size();
    }

    /**
     * Get the minimum and maximum ULP indices
     */
    std::pair<int64_t, int64_t> ulp_range() const {
        if (index_to_bits_.empty()) return {-1, -1};
        return {0, static_cast<int64_t>(index_to_bits_.size() - 1)};
    }

    /**
     * Get the bfloat16 value for a given ULP index (canonical bits).
     */
    bf16 value_at_index(int64_t idx) const {
        if (idx < 0 || idx >= static_cast<int64_t>(index_to_bits_.size())) {
            return std::numeric_limits<bf16>::quiet_NaN();
        }
        return bits_to_bf16(index_to_bits_[static_cast<size_t>(idx)]);
    }

    /**
     * Get canonical bits for a given ULP index.
     */
    uint16_t bits_at_index(int64_t idx) const {
        if (idx < 0 || idx >= static_cast<int64_t>(index_to_bits_.size())) return 0;
        return index_to_bits_[static_cast<size_t>(idx)];
    }

    /**
     * Debug: print some information about the ULP mapping
     */
    void debug_info() const {
        std::cout << "ULP Calculator Debug Info:" << std::endl;
        std::cout << "Total representable values: " << total_values() << std::endl;
        auto [min_idx, max_idx] = ulp_range();
        std::cout << "ULP index range: [" << min_idx << ", " << max_idx << "]" << std::endl;

        // Show some examples
        std::cout << "\nExample mappings:" << std::endl;
        bf16 examples[] = {static_cast<bf16>(-1.0f), static_cast<bf16>(-0.5f), static_cast<bf16>(0.0f),
                          static_cast<bf16>(0.5f), static_cast<bf16>(1.0f), static_cast<bf16>(2.0f),
                          std::numeric_limits<bf16>::infinity()};
        for (bf16 val : examples) {
            int64_t idx = get_ulp_index(val);
            std::cout << "  " << static_cast<float>(val) << " -> ULP index " << idx << std::endl;
        }

        // Check +0 and -0
        bf16 pos_zero = 0.0f;
        bf16 neg_zero = -0.0f;
        std::cout << "\nZero handling:" << std::endl;
        std::cout << "  +0: " << get_ulp_index(pos_zero) << std::endl;
        std::cout << "  -0: " << get_ulp_index(neg_zero) << std::endl;
        std::cout << "  ULP distance between +0 and -0: " << ulp_distance(pos_zero, neg_zero) << std::endl;
    }
};

#endif // ULP_CALCULATOR_H
