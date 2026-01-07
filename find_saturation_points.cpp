#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <cmath>
#include <limits>

using bf16 = std::bfloat16_t;

int main() {
    std::cout << "Finding bfloat16 GELU Saturation Points" << std::endl;
    std::cout << "======================================" << std::endl;

    ULP_Calculator ulp_calc;

    std::cout << std::fixed << std::setprecision(10);

    // 1. Find negative saturation point (where GELU(x) ≈ 0 in bfloat16)
    std::cout << "\n1. Negative saturation (GELU(x) ≈ 0):" << std::endl;

    double neg_x = -1.0;
    double neg_step = 1.0;

    // First, find a rough range
    while (neg_step > 1e-6) {
        bf16 x_bf16 = static_cast<bf16>(neg_x);
        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        bf16 exact_bf16 = static_cast<bf16>(exact_val);

        if (ulp_calc.ulp_distance(exact_bf16, static_cast<bf16>(0.0f)) == 0) {
            // Found a point where exact GELU rounds to 0 in bfloat16
            std::cout << "Found candidate at x = " << neg_x << " (bf16: " << static_cast<float>(x_bf16) << ")" << std::endl;
            std::cout << "Exact GELU: " << exact_val << " -> bfloat16: " << static_cast<float>(exact_bf16) << std::endl;
            break;
        }

        neg_x *= 1.1; // Increase magnitude
    }

    // 2. Find positive saturation point (where GELU(x) ≈ x in bfloat16)
    std::cout << "\n2. Positive saturation (GELU(x) ≈ x):" << std::endl;

    double pos_x = 1.0;
    double pos_step = 1.0;

    // First, find a rough range
    while (pos_step > 1e-6 && pos_x < 10.0) {
        bf16 x_bf16 = static_cast<bf16>(pos_x);
        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        bf16 exact_bf16 = static_cast<bf16>(exact_val);

        // Check if GELU(x) - x rounds to 0 in bfloat16
        double diff = exact_val - static_cast<double>(x_bf16);
        bf16 diff_bf16 = static_cast<bf16>(diff);

        if (ulp_calc.ulp_distance(diff_bf16, static_cast<bf16>(0.0f)) == 0) {
            // Found a point where GELU(x) - x rounds to 0 in bfloat16
            std::cout << "Found candidate at x = " << pos_x << " (bf16: " << static_cast<float>(x_bf16) << ")" << std::endl;
            std::cout << "Exact GELU: " << exact_val << " - x: " << diff << " -> bfloat16: " << static_cast<float>(diff_bf16) << std::endl;
            break;
        }

        pos_x *= 1.1; // Increase
    }

    // 3. More systematic search for exact saturation points
    std::cout << "\n3. Systematic search for exact saturation points:" << std::endl;

    // For negative saturation: find where GELU(x) becomes exactly 0 in bfloat16
    std::cout << "\nNegative saturation search:" << std::endl;
    for (double x = -1.0; x > -10.0; x -= 0.01) {
        bf16 x_bf16 = static_cast<bf16>(x);
        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        bf16 exact_bf16 = static_cast<bf16>(exact_val);

        if (exact_bf16 == static_cast<bf16>(0.0f)) {
            std::cout << "First x where GELU(x) = 0 in bfloat16: " << x << " (bf16: " << static_cast<float>(x_bf16) << ")" << std::endl;
            std::cout << "Exact GELU value: " << exact_val << std::endl;

            // Check ULP distance
            int64_t ulp_dist = ulp_calc.ulp_distance(exact_bf16, static_cast<bf16>(0.0f));
            std::cout << "ULP distance from 0: " << ulp_dist << std::endl;
            break;
        }
    }

    // For positive saturation: find where GELU(x) - x becomes exactly 0 in bfloat16
    std::cout << "\nPositive saturation search:" << std::endl;
    for (double x = 1.0; x < 10.0; x += 0.01) {
        bf16 x_bf16 = static_cast<bf16>(x);
        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        double diff = exact_val - static_cast<double>(x_bf16);
        bf16 diff_bf16 = static_cast<bf16>(diff);

        if (diff_bf16 == static_cast<bf16>(0.0f)) {
            std::cout << "First x where GELU(x) - x = 0 in bfloat16: " << x << " (bf16: " << static_cast<float>(x_bf16) << ")" << std::endl;
            std::cout << "Exact GELU value: " << exact_val << std::endl;
            std::cout << "Difference: " << diff << std::endl;

            // Check ULP distance
            int64_t ulp_dist = ulp_calc.ulp_distance(diff_bf16, static_cast<bf16>(0.0f));
            std::cout << "ULP distance from 0: " << ulp_dist << std::endl;
            break;
        }
    }

    // 4. Show some examples of the saturation behavior
    std::cout << "\n4. Saturation behavior examples:" << std::endl;

    std::vector<double> test_x_values = {-5.0, -4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0};

    std::cout << std::setw(8) << "x" << std::setw(15) << "GELU(x)" << std::setw(15) << "GELU_bf16"
              << std::setw(12) << "ULP_diff_0" << std::setw(12) << "GELU-x" << std::setw(12) << "(GELU-x)_bf16" << std::endl;
    std::cout << std::string(80, '-') << std::endl;

    for (double x : test_x_values) {
        bf16 x_bf16 = static_cast<bf16>(x);
        double exact_val = gelu_ref_fp64(static_cast<double>(x_bf16));
        bf16 exact_bf16 = static_cast<bf16>(exact_val);

        int64_t ulp_from_zero = ulp_calc.ulp_distance(exact_bf16, static_cast<bf16>(0.0f));

        double diff = exact_val - static_cast<double>(x_bf16);
        bf16 diff_bf16 = static_cast<bf16>(diff);

        std::cout << std::setw(8) << static_cast<float>(x_bf16)
                  << std::setw(15) << exact_val
                  << std::setw(15) << static_cast<float>(exact_bf16)
                  << std::setw(12) << ulp_from_zero
                  << std::setw(12) << diff
                  << std::setw(12) << static_cast<float>(diff_bf16) << std::endl;
    }

    return 0;
}
