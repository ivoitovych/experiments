#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>
#include <algorithm>

using bf16 = std::bfloat16_t;

/**
 * Practical Saturation Analysis: Find where ULP error becomes significant
 *
 * Instead of finding where GELU becomes exactly 0, find where the ULP error
 * exceeds thresholds that make approximation impractical.
 */
int main() {
    std::cout << "Practical bfloat16 GELU Saturation Analysis" << std::endl;
    std::cout << "============================================" << std::endl;

    ULP_Calculator ulp_calc;

    // Stable fp64 reference GELU via gelu_ref_fp64() (erfc-based).
    auto exact_gelu = [](double x) -> double {
        return gelu_ref_fp64(x);
    };

    // Different approach: find where consecutive bfloat16 values give very different GELU results
    std::cout << "\nAnalyzing bfloat16 GELU behavior across representable values..." << std::endl;

    std::vector<bf16> test_values;
    for (double x = -6.0; x <= 6.0; x += 0.01) {
        bf16 val = static_cast<bf16>(x);
        if (std::find(test_values.begin(), test_values.end(), val) == test_values.end()) {
            test_values.push_back(val);
        }
    }

    std::sort(test_values.begin(), test_values.end());
    test_values.erase(std::unique(test_values.begin(), test_values.end()), test_values.end());

    std::cout << "Testing " << test_values.size() << " unique bfloat16 values in [-6, 6]..." << std::endl;

    // Find regions where GELU changes very little (saturation regions)
    std::vector<std::tuple<bf16, double, std::string>> saturation_regions;

    for (size_t i = 1; i < test_values.size(); ++i) {
        bf16 prev = test_values[i-1];
        bf16 curr = test_values[i];

        double prev_gelu = exact_gelu(static_cast<double>(prev));
        double curr_gelu = exact_gelu(static_cast<double>(curr));

        bf16 prev_gelu_bf16 = static_cast<bf16>(prev_gelu);
        bf16 curr_gelu_bf16 = static_cast<bf16>(curr_gelu);

        // Check if GELU values are very close (saturation)
        double gelu_diff = std::abs(curr_gelu - prev_gelu);
        bf16 gelu_diff_bf16 = static_cast<bf16>(gelu_diff);

        // If the difference rounds to 0 in bfloat16, it's saturated
        if (ulp_calc.ulp_distance(gelu_diff_bf16, static_cast<bf16>(0.0f)) == 0) {
            saturation_regions.emplace_back(curr, curr_gelu, "GELU nearly constant");
        }

        // Check for identity in the *bf16-rounded reference output*.
        if (curr_gelu_bf16 == curr) {
            saturation_regions.emplace_back(curr, curr_gelu, "GELU_bf16 == x");
        }
    }

    std::cout << "\nSaturation regions found: " << saturation_regions.size() << std::endl;

    if (!saturation_regions.empty()) {
        std::cout << "\nNegative saturation region (GELU ≈ 0):" << std::endl;
        for (const auto& [val, gelu_val, type] : saturation_regions) {
            if (static_cast<double>(val) < -3.0 && type == "GELU nearly constant") {
                std::cout << "x ≈ " << static_cast<double>(val) << ", GELU ≈ " << gelu_val << std::endl;
                break;
            }
        }

        std::cout << "\nPositive saturation region (GELU_bf16 == x):" << std::endl;
        for (auto it = saturation_regions.rbegin(); it != saturation_regions.rend(); ++it) {
            const auto& [val, gelu_val, type] = *it;
            if (static_cast<double>(val) > 3.0 && type == "GELU_bf16 == x") {
                std::cout << "x ≈ " << static_cast<double>(val) << ", GELU ≈ " << gelu_val << std::endl;
                break;
            }
        }
    }

    std::cout << "\n=== NOTE ===" << std::endl;
    std::cout << "For exact full-range saturation bounds, use gelu_saturation_bounds_fullscan.cpp" << std::endl;
    std::cout << "For full-range binning, use gelu_saturation_binned_50.cpp" << std::endl;

    return 0;
}
