#include "ulp_calculator.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <cmath>
#include <unordered_set>
#include <cassert>
#include <cstdint>
#include <cstring>

using bf16 = std::bfloat16_t;

/**
 * Reference ULP calculator implementation
 * This sorts all bfloat16 bit patterns by numerical value and assigns indices
 */
class Reference_ULP_Calculator {
private:
    std::vector<uint16_t> index_to_bits_;
    std::unordered_map<uint16_t, int64_t> bits_to_index_;

    static bf16 bits_to_bf16(uint16_t bits) {
        bf16 result;
        std::memcpy(&result, &bits, sizeof(bf16));
        return result;
    }

    static uint16_t bf16_to_bits(bf16 value) {
        uint16_t bits;
        std::memcpy(&bits, &value, sizeof(uint16_t));
        return bits;
    }

    static bool is_nan_bits(uint16_t bits) {
        return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) != 0);
    }

    static bool is_zero_bits(uint16_t bits) {
        return (bits & 0x7FFFu) == 0;
    }

    static uint16_t order_key(uint16_t bits) {
        const bool sign = (bits & 0x8000u) != 0;
        return static_cast<uint16_t>(bits ^ (sign ? 0xFFFFu : 0x8000u));
    }

public:
    Reference_ULP_Calculator() {
        struct Entry { uint16_t bits; uint16_t key; };
        std::vector<Entry> entries;
        entries.reserve(65536);

        // Collect all non-NaN patterns (all 65536 bit patterns)
        for (uint32_t i = 0; i < 65536; ++i) {
            uint16_t bits = static_cast<uint16_t>(i);
            if (is_nan_bits(bits)) continue;
            entries.push_back(Entry{bits, order_key(bits)});
        }

        std::sort(entries.begin(), entries.end(), [](const Entry& a, const Entry& b) {
            return a.key < b.key;
        });

        // Assign indices, collapsing +0/-0 to the same index
        bool saw_zero = false;
        for (const auto& e : entries) {
            if (is_zero_bits(e.bits)) {
                if (!saw_zero) {
                    index_to_bits_.push_back(0x0000);
                    bits_to_index_[0x0000] = static_cast<int64_t>(index_to_bits_.size() - 1);
                    bits_to_index_[0x8000] = static_cast<int64_t>(index_to_bits_.size() - 1);
                    saw_zero = true;
                }
                continue;
            }
            index_to_bits_.push_back(e.bits);
            bits_to_index_[e.bits] = static_cast<int64_t>(index_to_bits_.size() - 1);
        }
    }

    int64_t get_index(bf16 value) const {
        if (std::isnan(value)) return -1;

        uint16_t bits = bf16_to_bits(value);

        if (is_zero_bits(bits)) bits = 0x0000;

        auto it = bits_to_index_.find(bits);
        return (it != bits_to_index_.end()) ? it->second : -2;
    }

    size_t total_values() const {
        return index_to_bits_.size();
    }
};

class ULP_Calculator_Test {
private:
    ULP_Calculator calc_;
    Reference_ULP_Calculator ref_calc_;

    int tests_passed_ = 0;
    int tests_total_ = 0;

    void assert_equal(int64_t actual, int64_t expected, const std::string& description) {
        tests_total_++;
        if (actual == expected) {
            tests_passed_++;
            std::cout << "✓ PASS: " << description << std::endl;
        } else {
            std::cout << "✗ FAIL: " << description << std::endl;
            std::cout << "    Expected: " << expected << std::endl;
            std::cout << "    Actual: " << actual << std::endl;
        }
    }

    void assert_true(bool condition, const std::string& description) {
        tests_total_++;
        if (condition) {
            tests_passed_++;
            std::cout << "✓ PASS: " << description << std::endl;
        } else {
            std::cout << "✗ FAIL: " << description << std::endl;
        }
    }

public:
    void run_all_tests() {
        std::cout << "Running ULP Calculator Tests..." << std::endl;
        std::cout << "=================================" << std::endl;

        test_total_values();
        test_zero_handling();
        test_special_values();
        test_ulp_distances();
        test_consistency_with_reference();
        test_ulp_ordering();
        test_edge_cases();

        std::cout << "\n=================================" << std::endl;
        std::cout << "Test Results: " << tests_passed_ << "/" << tests_total_ << " passed" << std::endl;
        if (tests_passed_ == tests_total_) {
            std::cout << "🎉 All tests passed!" << std::endl;
        } else {
            std::cout << "❌ Some tests failed!" << std::endl;
        }
    }

private:
    void test_total_values() {
        std::cout << "\n1. Testing total values count..." << std::endl;
        size_t calc_total = calc_.total_values();
        size_t ref_total = ref_calc_.total_values();

        // bfloat16 NaN patterns: exponent all 1s and fraction != 0 => 2(sign) * 127 = 254
        // Non-NaN bit patterns = 65536 - 254 = 65282
        // Indices collapse +0/-0 => 65282 - 1 = 65281
        assert_equal(calc_total, 65281, "Total ULP indices (excluding NaNs, collapsing ±0) should be 65281");
        assert_equal(calc_total, ref_total, "Calculator and reference should agree on total values");
    }

    void test_zero_handling() {
        std::cout << "\n2. Testing zero handling..." << std::endl;
        bf16 pos_zero = 0.0f;
        bf16 neg_zero = -0.0f;

        int64_t pos_zero_idx = calc_.get_ulp_index(pos_zero);
        int64_t neg_zero_idx = calc_.get_ulp_index(neg_zero);
        int64_t ref_pos_zero_idx = ref_calc_.get_index(pos_zero);
        int64_t ref_neg_zero_idx = ref_calc_.get_index(neg_zero);

        assert_true(pos_zero_idx >= 0, "+0 should have valid ULP index");
        assert_true(neg_zero_idx >= 0, "-0 should have valid ULP index");
        assert_equal(pos_zero_idx, neg_zero_idx, "+0 and -0 should have same ULP index");
        assert_equal(calc_.ulp_distance(pos_zero, neg_zero), 0, "ULP distance between +0 and -0 should be 0");

        assert_equal(pos_zero_idx, ref_pos_zero_idx, "Calculator should match reference for +0");
        assert_equal(neg_zero_idx, ref_neg_zero_idx, "Calculator should match reference for -0");
    }

    void test_special_values() {
        std::cout << "\n3. Testing special values..." << std::endl;

        // Test infinities
        bf16 pos_inf = std::numeric_limits<bf16>::infinity();
        bf16 neg_inf = -std::numeric_limits<bf16>::infinity();

        int64_t pos_inf_idx = calc_.get_ulp_index(pos_inf);
        int64_t neg_inf_idx = calc_.get_ulp_index(neg_inf);
        int64_t ref_pos_inf_idx = ref_calc_.get_index(pos_inf);
        int64_t ref_neg_inf_idx = ref_calc_.get_index(neg_inf);

        assert_true(pos_inf_idx >= 0, "+inf should have valid ULP index");
        assert_true(neg_inf_idx >= 0, "-inf should have valid ULP index");
        assert_true(pos_inf_idx > neg_inf_idx, "+inf should have higher ULP index than -inf");

        assert_equal(pos_inf_idx, ref_pos_inf_idx, "Calculator should match reference for +inf");
        assert_equal(neg_inf_idx, ref_neg_inf_idx, "Calculator should match reference for -inf");

        // Test NaN
        bf16 nan_val = std::numeric_limits<bf16>::quiet_NaN();
        assert_equal(calc_.get_ulp_index(nan_val), -1, "NaN should return -1");
        assert_equal(calc_.ulp_distance(nan_val, 1.0f), -1, "ULP distance involving NaN should return -1");
    }

    void test_ulp_distances() {
        std::cout << "\n4. Testing ULP distances..." << std::endl;

        // Test adjacent values in ULP index space (canonical ordering)
        auto [min_idx, max_idx] = calc_.ulp_range();
        assert_true(max_idx > min_idx + 1000, "ULP index range should be non-trivial");

        for (int64_t idx = min_idx + 100; idx < min_idx + 110; ++idx) {
            bf16 a = calc_.value_at_index(idx);
            bf16 b = calc_.value_at_index(idx + 1);
            int64_t dist = calc_.ulp_distance(a, b);
            assert_equal(dist, 1, "Consecutive ULP indices should differ by 1 ULP");
        }

        // Test distance between known values
        bf16 a = 1.0f;
        bf16 b = 2.0f;
        int64_t dist = calc_.ulp_distance(a, b);
        assert_true(dist > 0, "Distance between 1.0 and 2.0 should be positive");
    }

    void test_consistency_with_reference() {
        std::cout << "\n5. Testing consistency with reference implementation..." << std::endl;

        // Test a sample of values
        std::vector<bf16> test_values = {
            static_cast<bf16>(-2.0f), static_cast<bf16>(-1.5f), static_cast<bf16>(-1.0f),
            static_cast<bf16>(-0.5f), static_cast<bf16>(0.0f),  static_cast<bf16>(0.5f),
            static_cast<bf16>(1.0f),  static_cast<bf16>(1.5f),  static_cast<bf16>(2.0f),
            std::numeric_limits<bf16>::infinity(),
            -std::numeric_limits<bf16>::infinity()
        };

        for (bf16 val : test_values) {
            int64_t calc_idx = calc_.get_ulp_index(val);
            int64_t ref_idx = ref_calc_.get_index(val);

            std::string desc = "ULP index for " + std::to_string(static_cast<float>(val));
            assert_equal(calc_idx, ref_idx, desc);
        }
    }

    void test_ulp_ordering() {
        std::cout << "\n6. Testing ULP ordering properties..." << std::endl;

        // Test that ordering is preserved
        std::vector<bf16> ordered_values = {
            static_cast<bf16>(-2.0f),
            static_cast<bf16>(-1.0f),
            static_cast<bf16>(0.0f),
            static_cast<bf16>(1.0f),
            static_cast<bf16>(2.0f)
        };

        for (size_t i = 1; i < ordered_values.size(); ++i) {
            int64_t idx_prev = calc_.get_ulp_index(ordered_values[i-1]);
            int64_t idx_curr = calc_.get_ulp_index(ordered_values[i]);

            assert_true(idx_curr > idx_prev,
                       "ULP indices should increase with numerical value");
        }
    }

    void test_edge_cases() {
        std::cout << "\n7. Testing edge cases..." << std::endl;

        auto [min_idx, max_idx] = calc_.ulp_range();
        assert_true(min_idx == 0, "Minimum ULP index should be 0");
        assert_true(max_idx == static_cast<int64_t>(calc_.total_values() - 1), "Maximum ULP index should be total-1");

        // Test some edge bit patterns
        uint16_t test_bits[] = {0x0000, 0x8000, 0x7F80, 0xFF80, 0xFFFF};
        for (uint16_t bits : test_bits) {
            bf16 val = ULP_Calculator::bits_to_bf16_public(bits);
            if (!std::isnan(val)) {
                int64_t idx = calc_.get_ulp_index(val);
                assert_true(idx >= 0 && idx <= 65533,
                           "All valid bfloat16 values should have valid ULP indices");
            }
        }
    }
};

int main() {
    std::cout << "ULP Calculator Validation Suite" << std::endl;
    std::cout << "===============================" << std::endl;

    // First, show some debug info
    ULP_Calculator calc;
    calc.debug_info();

    // Run the comprehensive test suite
    ULP_Calculator_Test test;
    test.run_all_tests();

    return 0;
}
