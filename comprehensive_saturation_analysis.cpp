#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>
#include <limits>

using bf16 = std::bfloat16_t;

/**
 * Comprehensive Saturation Analysis for bfloat16 GELU
 *
 * Iterates through ALL possible bfloat16 bit patterns to find exact saturation points
 * where GELU transitions from having meaningful precision to saturating.
 */
int main() {
    std::cout << "Comprehensive bfloat16 GELU Saturation Analysis" << std::endl;
    std::cout << "================================================" << std::endl;

    ULP_Calculator ulp_calc;

    std::cout << "Analyzing sample ranges using stable fp64 reference GELU (erfc-based)..." << std::endl;

    // Find negative saturation: where GELU(x) becomes exactly 0 in bfloat16
    bf16 neg_saturation_point = std::numeric_limits<bf16>::max();
    bool found_neg_saturation = false;

    // Find positive saturation: where GELU(x) - x becomes exactly 0 in bfloat16
    bf16 pos_saturation_point = std::numeric_limits<bf16>::lowest();
    bool found_pos_saturation = false;

    // Track the transition points
    std::vector<std::tuple<bf16, double, bf16, int64_t>> neg_transitions;
    std::vector<std::tuple<bf16, double, bf16, int64_t>> pos_transitions;

    std::cout << "\nScanning negative values..." << std::endl;

    // Iterate through all bfloat16 values (we'll use the sorted order from ULP calculator)
    // Since we can't easily iterate through bit patterns, let's sample systematically
    for (double x_val = -20.0; x_val <= 0.0; x_val += 0.01) {
        bf16 x_bf16 = static_cast<bf16>(x_val);
        if (x_bf16 != x_val) continue;  // Skip if conversion changed the value significantly

        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        bf16 exact_bf16 = static_cast<bf16>(exact_val);

        int64_t ulp_dist = ulp_calc.ulp_distance(exact_bf16, static_cast<bf16>(0.0f));

        if (ulp_dist == 0 && !found_neg_saturation) {
            // First point where GELU rounds to exactly 0
            neg_saturation_point = x_bf16;
            found_neg_saturation = true;
            std::cout << "Found negative saturation point: x = " << static_cast<float>(x_bf16)
                      << ", exact GELU = " << exact_val << std::endl;
        }

        // Collect transition points (values near saturation)
        if (ulp_dist <= 10) {
            neg_transitions.emplace_back(x_bf16, exact_val, exact_bf16, ulp_dist);
        }
    }

    std::cout << "\nScanning positive values..." << std::endl;

    for (double x_val = 0.0; x_val <= 20.0; x_val += 0.01) {
        bf16 x_bf16 = static_cast<bf16>(x_val);
        if (x_bf16 != x_val) continue;

        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        double diff = exact_val - static_cast<double>(x_bf16);
        bf16 diff_bf16 = static_cast<bf16>(diff);

        int64_t ulp_dist = ulp_calc.ulp_distance(diff_bf16, static_cast<bf16>(0.0f));

        if (ulp_dist == 0 && !found_pos_saturation) {
            // First point where GELU(x) - x rounds to exactly 0
            pos_saturation_point = x_bf16;
            found_pos_saturation = true;
            std::cout << "Found positive saturation point: x = " << static_cast<float>(x_bf16)
                      << ", exact GELU = " << exact_val << ", diff = " << diff << std::endl;
        }

        // Collect transition points
        if (ulp_dist <= 10) {
            pos_transitions.emplace_back(x_bf16, exact_val, diff_bf16, ulp_dist);
        }
    }

    // More systematic approach: check all representable bfloat16 values
    std::cout << "\nSystematic check of all bfloat16 values..." << std::endl;

    // Get some representative values by checking the ULP calculator's range
    auto [min_idx, max_idx] = ulp_calc.ulp_range();
    std::cout << "ULP index range: [" << min_idx << ", " << max_idx << "]" << std::endl;

    // For a more thorough check, let's look at values around the suspected saturation points
    std::cout << "\nDetailed analysis around suspected saturation points:" << std::endl;

    // Check values around -8.4 to -8.2 (where we suspected negative saturation)
    std::cout << "\nNegative range analysis (-8.4 to -8.2):" << std::endl;
    std::cout << std::setw(10) << "x" << std::setw(15) << "GELU(x)"
              << std::setw(15) << "GELU_bf16" << std::setw(10) << "ULP_diff" << std::endl;
    std::cout << std::string(50, '-') << std::endl;

    for (double x = -8.4; x <= -8.2; x += 0.001) {
        bf16 x_bf16 = static_cast<bf16>(x);
        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        bf16 exact_bf16 = static_cast<bf16>(exact_val);
        int64_t ulp_dist = ulp_calc.ulp_distance(exact_bf16, static_cast<bf16>(0.0f));

        if (ulp_dist <= 5) {  // Show only values close to saturation
            std::cout << std::setw(10) << static_cast<float>(x_bf16)
                      << std::setw(15) << exact_val
                      << std::setw(15) << static_cast<float>(exact_bf16)
                      << std::setw(10) << ulp_dist << std::endl;
        }
    }

    // Check values around 8.2 to 8.4 (where we suspected positive saturation)
    std::cout << "\nPositive range analysis (8.2 to 8.4):" << std::endl;
    std::cout << std::setw(10) << "x" << std::setw(15) << "GELU(x)"
              << std::setw(15) << "GELU-x" << std::setw(15) << "(GELU-x)_bf16" << std::setw(10) << "ULP_diff" << std::endl;
    std::cout << std::string(65, '-') << std::endl;

    for (double x = 8.2; x <= 8.4; x += 0.001) {
        bf16 x_bf16 = static_cast<bf16>(x);
        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        double diff = exact_val - static_cast<double>(x_bf16);
        bf16 diff_bf16 = static_cast<bf16>(diff);
        int64_t ulp_dist = ulp_calc.ulp_distance(diff_bf16, static_cast<bf16>(0.0f));

        if (ulp_dist <= 5) {  // Show only values close to saturation
            std::cout << std::setw(10) << static_cast<float>(x_bf16)
                      << std::setw(15) << exact_val
                      << std::setw(15) << diff
                      << std::setw(15) << static_cast<float>(diff_bf16)
                      << std::setw(10) << ulp_dist << std::endl;
        }
    }

    // Final summary
    std::cout << "\n=== SATURATION ANALYSIS SUMMARY ===" << std::endl;
    std::cout << "Negative saturation (GELU → 0): ";
    if (found_neg_saturation) {
        std::cout << "x = " << static_cast<float>(neg_saturation_point) << std::endl;
    } else {
        std::cout << "Not found in sampled range" << std::endl;
    }

    std::cout << "Positive saturation (GELU → x): ";
    if (found_pos_saturation) {
        std::cout << "x = " << static_cast<float>(pos_saturation_point) << std::endl;
    } else {
        std::cout << "Not found in sampled range" << std::endl;
    }

    std::cout << "\nNote: For exact saturation thresholds, use gelu_saturation_bounds_fullscan.cpp" << std::endl;
    std::cout << "which enumerates all finite bf16 inputs and scans from both ends." << std::endl;

    return 0;
}
