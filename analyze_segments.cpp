#include "piecewise_gelu.h"
#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>

int main() {
    std::cout << "GELU Piecewise Approximation Analysis" << std::endl;
    std::cout << "====================================" << std::endl;

    PiecewiseGELU gelu;
    ULP_Calculator ulp_calc;

    // Define segment ranges
    struct SegmentInfo {
        std::string name;
        bf16 min_val;
        bf16 max_val;
        int piece_idx;
    };

    std::vector<SegmentInfo> segments = {
        {"x < -2.0", std::numeric_limits<bf16>::lowest(), static_cast<bf16>(-2.0f), 0},
        {"-2.0 ≤ x < 0", static_cast<bf16>(-2.0f), static_cast<bf16>(0.0f), 1},
        {"0 ≤ x < 2.0", static_cast<bf16>(0.0f), static_cast<bf16>(2.0f), 2},
        {"x ≥ 2.0", static_cast<bf16>(2.0f), std::numeric_limits<bf16>::max(), 3}
    };

    std::cout << std::fixed << std::setprecision(6);

    for (const auto& segment : segments) {
        std::cout << "\n=== Segment: " << segment.name << " ===" << std::endl;

        // Show the polynomial for this segment
        const auto& coeffs = gelu.get_coefficients()[segment.piece_idx];
        std::cout << "Polynomial: ";
        if (coeffs.size() == 1) {
            std::cout << static_cast<float>(coeffs[0]) << std::endl;
        } else if (coeffs.size() == 2) {
            std::cout << static_cast<float>(coeffs[1]) << "*x + " << static_cast<float>(coeffs[0]) << std::endl;
        }

        // Test some points in this segment
        std::vector<bf16> test_points;
        bf16 range = segment.max_val - segment.min_val;
        if (std::isfinite(static_cast<float>(range))) {
            for (int i = 0; i < 5; ++i) {
                bf16 t = static_cast<bf16>(i / 4.0f);
                bf16 point = segment.min_val + t * (segment.max_val - segment.min_val);
                if (std::isfinite(static_cast<float>(point))) {
                    test_points.push_back(point);
                }
            }
        } else {
            // For infinite ranges, use specific points
            test_points = {segment.min_val, static_cast<bf16>(-1.0f), static_cast<bf16>(1.0f), segment.max_val};
        }

        // Calculate ULP errors for this segment
        std::vector<int64_t> ulp_errors;
        double max_abs_error = 0.0;
        double mean_abs_error = 0.0;

        for (bf16 x : test_points) {
            if (!std::isnan(static_cast<float>(x)) && std::isfinite(static_cast<float>(x))) {
                bf16 approx = gelu.evaluate_piece(x, segment.piece_idx);
                double x_double = static_cast<double>(x);
                double exact = gelu_ref_fp64(x_double);
                double abs_error = fabs(static_cast<double>(approx) - exact);
                max_abs_error = std::max(max_abs_error, abs_error);
                mean_abs_error += abs_error;

                // ULP error
                bf16 exact_bf16 = static_cast<bf16>(exact);
                int64_t ulp_dist = ulp_calc.ulp_distance(exact_bf16, approx);
                if (ulp_dist >= 0) {
                    ulp_errors.push_back(ulp_dist);
                }
            }
        }

        if (!test_points.empty()) {
            mean_abs_error /= test_points.size();
        }

        // Calculate ULP statistics
        if (!ulp_errors.empty()) {
            int64_t min_ulp = *std::min_element(ulp_errors.begin(), ulp_errors.end());
            int64_t max_ulp = *std::max_element(ulp_errors.begin(), ulp_errors.end());
            double mean_ulp = 0.0;
            for (int64_t e : ulp_errors) mean_ulp += e;
            mean_ulp /= ulp_errors.size();

            std::cout << "Test points: " << test_points.size() << std::endl;
            std::cout << "Max absolute error: " << max_abs_error << std::endl;
            std::cout << "Mean absolute error: " << mean_abs_error << std::endl;
            std::cout << "ULP error range: [" << min_ulp << ", " << max_ulp << "]" << std::endl;
            std::cout << "Mean ULP error: " << mean_ulp << std::endl;
        }
    }

    std::cout << "\n=== Overall Statistics ===" << std::endl;
    std::cout << "Total segments: 4" << std::endl;
    std::cout << "Polynomial order: 1 (linear) for segments 1-3, 0 (constant) for segment 0" << std::endl;
    std::cout << "Operations used: +, -, *, < (comparison)" << std::endl;

    return 0;
}
