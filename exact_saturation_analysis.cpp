#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>
#include <bit>

using bf16 = std::bfloat16_t;

/**
 * Exact Saturation Analysis: Check ALL bfloat16 bit patterns
 */
int main() {
    std::cout << "Exact bfloat16 GELU Saturation Analysis - All Bit Patterns" << std::endl;
    std::cout << "==========================================================" << std::endl;

    ULP_Calculator ulp_calc;

    std::cout << "Checking all 65,536 possible bfloat16 bit patterns..." << std::endl;

    // Track the exact saturation points
    uint16_t neg_saturation_bits = 0xFFFF;  // Start with invalid
    uint16_t pos_saturation_bits = 0xFFFF;  // Start with invalid
    bool found_neg_saturation = false;
    bool found_pos_saturation = false;

    // For more detailed analysis around the saturation points
    std::vector<uint16_t> neg_transition_bits;
    std::vector<uint16_t> pos_transition_bits;

    // Iterate through ALL possible 16-bit patterns
    for (uint32_t bits_int = 0; bits_int < 65536; ++bits_int) {
        uint16_t bits = static_cast<uint16_t>(bits_int);

        // Skip NaN patterns (exponent all 1s, significand non-zero)
        uint16_t exponent = (bits >> 7) & 0xFF;
        uint16_t significand = bits & 0x7F;
        if (exponent == 0xFF && significand != 0) continue;

        // Convert to bfloat16 and back to ensure valid representation
        bf16 val = ULP_Calculator::bits_to_bf16_public(bits);
        double x_double = static_cast<double>(val);

        // Skip if conversion changed the value significantly (subnormal/edge cases)
        if (std::abs(x_double) > 1e-30 && std::abs(static_cast<double>(ULP_Calculator::bf16_to_bits_public(val)) - bits) > 0.1) {
            continue;
        }

        // Compute exact GELU
        double exact_val = gelu_ref_fp64(x_double);
        bf16 exact_bf16 = static_cast<bf16>(exact_val);

        // Check for negative saturation: GELU(x) rounds to exactly 0
        if (x_double < 0) {
            int64_t ulp_dist = ulp_calc.ulp_distance(exact_bf16, static_cast<bf16>(0.0f));
            if (ulp_dist == 0 && !found_neg_saturation) {
                neg_saturation_bits = bits;
                found_neg_saturation = true;
                std::cout << "Found negative saturation at bits: 0x" << std::hex << bits
                          << " (value: " << std::dec << x_double << ")" << std::endl;
                std::cout << "Exact GELU: " << exact_val << std::endl;
            }
            // Collect transition points
            if (ulp_dist <= 5) {
                neg_transition_bits.push_back(bits);
            }
        }

        // Check for positive saturation: GELU(x) - x rounds to exactly 0
        if (x_double > 0) {
            double diff = exact_val - x_double;
            bf16 diff_bf16 = static_cast<bf16>(diff);

            int64_t ulp_dist = ulp_calc.ulp_distance(diff_bf16, static_cast<bf16>(0.0f));
            if (ulp_dist == 0 && !found_pos_saturation) {
                pos_saturation_bits = bits;
                found_pos_saturation = true;
                std::cout << "Found positive saturation at bits: 0x" << std::hex << bits
                          << " (value: " << std::dec << x_double << ")" << std::endl;
                std::cout << "Exact GELU: " << exact_val << ", diff: " << diff << std::endl;
            }
            // Collect transition points
            if (ulp_dist <= 5) {
                pos_transition_bits.push_back(bits);
            }
        }
    }

    std::cout << "\n=== EXACT SATURATION POINTS ===" << std::endl;

    if (found_neg_saturation) {
        bf16 neg_val = ULP_Calculator::bits_to_bf16_public(neg_saturation_bits);
        std::cout << "Negative saturation (GELU → 0):" << std::endl;
        std::cout << "  Bits: 0x" << std::hex << neg_saturation_bits << std::dec << std::endl;
        std::cout << "  Value: " << static_cast<double>(neg_val) << std::endl;
        std::cout << "  ULP index: " << ulp_calc.get_ulp_index(neg_val) << std::endl;
    }

    if (found_pos_saturation) {
        bf16 pos_val = ULP_Calculator::bits_to_bf16_public(pos_saturation_bits);
        std::cout << "Positive saturation (GELU → x):" << std::endl;
        std::cout << "  Bits: 0x" << std::hex << pos_saturation_bits << std::dec << std::endl;
        std::cout << "  Value: " << static_cast<double>(pos_val) << std::endl;
        std::cout << "  ULP index: " << ulp_calc.get_ulp_index(pos_val) << std::endl;
    }

    // Show transition zones
    std::cout << "\n=== TRANSITION ZONES ===" << std::endl;

    std::cout << "Negative transition points (ULP distance ≤ 5 from 0): " << neg_transition_bits.size() << std::endl;
    if (!neg_transition_bits.empty()) {
        std::cout << "First few: ";
        for (size_t i = 0; i < std::min(size_t(5), neg_transition_bits.size()); ++i) {
            bf16 val = ULP_Calculator::bits_to_bf16_public(neg_transition_bits[i]);
            std::cout << static_cast<double>(val) << " ";
        }
        std::cout << std::endl;

        std::cout << "Last few: ";
        for (size_t i = std::max(int(neg_transition_bits.size())-5, 0); i < neg_transition_bits.size(); ++i) {
            bf16 val = ULP_Calculator::bits_to_bf16_public(neg_transition_bits[i]);
            std::cout << static_cast<double>(val) << " ";
        }
        std::cout << std::endl;
    }

    std::cout << "Positive transition points (ULP distance ≤ 5 from 0): " << pos_transition_bits.size() << std::endl;
    if (!pos_transition_bits.empty()) {
        std::cout << "First few: ";
        for (size_t i = 0; i < std::min(size_t(5), pos_transition_bits.size()); ++i) {
            bf16 val = ULP_Calculator::bits_to_bf16_public(pos_transition_bits[i]);
            std::cout << static_cast<double>(val) << " ";
        }
        std::cout << std::endl;

        std::cout << "Last few: ";
        for (size_t i = std::max(int(pos_transition_bits.size())-5, 0); i < pos_transition_bits.size(); ++i) {
            bf16 val = ULP_Calculator::bits_to_bf16_public(pos_transition_bits[i]);
            std::cout << static_cast<double>(val) << " ";
        }
        std::cout << std::endl;
    }

    // Define the useful approximation range
    bf16 useful_min, useful_max;

    if (found_neg_saturation && found_pos_saturation) {
        // Find the boundary values
        useful_min = ULP_Calculator::bits_to_bf16_public(neg_saturation_bits);
        useful_max = ULP_Calculator::bits_to_bf16_public(pos_saturation_bits);

        std::cout << "\n=== USEFUL APPROXIMATION RANGE ===" << std::endl;
        std::cout << "Based on exact saturation analysis:" << std::endl;
        std::cout << "Min: " << static_cast<double>(useful_min) << " (ULP index: " << ulp_calc.get_ulp_index(useful_min) << ")" << std::endl;
        std::cout << "Max: " << static_cast<double>(useful_max) << " (ULP index: " << ulp_calc.get_ulp_index(useful_max) << ")" << std::endl;
        std::cout << "Range span: " << (ulp_calc.get_ulp_index(useful_max) - ulp_calc.get_ulp_index(useful_min)) << " ULP units" << std::endl;

        // Suggest segment boundaries for 8 segments
        int64_t ulp_min = ulp_calc.get_ulp_index(useful_min);
        int64_t ulp_max = ulp_calc.get_ulp_index(useful_max);
        int64_t ulp_range = ulp_max - ulp_min;

        std::cout << "\nSuggested 8-segment boundaries (equal ULP spacing):" << std::endl;
        for (int i = 0; i <= 8; ++i) {
            int64_t target_ulp = ulp_min + (ulp_range * i) / 8;
            // Note: Finding the bfloat16 value at a specific ULP index would require
            // additional logic to map back from ULP indices to values
            std::cout << "Segment " << i << ": ULP index ≈ " << target_ulp << std::endl;
        }
    }

    std::cout << "\nAnalysis complete. The saturation points define where bfloat16 precision" << std::endl;
    std::cout << "becomes insufficient for meaningful GELU approximation." << std::endl;

    return 0;
}
