#include "piecewise_gelu.h"
#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>
#include <algorithm>

using bf16 = std::bfloat16_t;

/**
 * Per-Segment ULP Analysis for Current 4-Segment Linear GELU Implementation
 */
int main() {
    std::cout << "Per-Segment ULP Analysis: 4-Segment Linear GELU" << std::endl;
    std::cout << "===============================================" << std::endl;

    PiecewiseGELU gelu;
    ULP_Calculator ulp_calc;

    // Define the 4 segments
    struct Segment {
        std::string name;
        bf16 min_val;
        bf16 max_val;
        int piece_idx;
    };

    std::vector<Segment> segments = {
        {"x < -2.0", std::numeric_limits<bf16>::lowest(), static_cast<bf16>(-2.0f), 0},
        {"-2.0 ≤ x < 0", static_cast<bf16>(-2.0f), static_cast<bf16>(0.0f), 1},
        {"0 ≤ x < 2.0", static_cast<bf16>(0.0f), static_cast<bf16>(2.0f), 2},
        {"x ≥ 2.0", static_cast<bf16>(2.0f), std::numeric_limits<bf16>::max(), 3}
    };

    std::cout << std::fixed << std::setprecision(6);

    for (const auto& segment : segments) {
        std::cout << "\n=== SEGMENT: " << segment.name << " ===" << std::endl;

        // Show the polynomial for this segment
        const auto& coeffs = gelu.get_coefficients()[segment.piece_idx];
        std::cout << "Polynomial: ";
        if (coeffs.size() == 1) {
            std::cout << static_cast<float>(coeffs[0]) << std::endl;
        } else if (coeffs.size() == 2) {
            std::cout << static_cast<float>(coeffs[1]) << "*x + " << static_cast<float>(coeffs[0]) << std::endl;
        }

        // Generate test points for this segment
        std::vector<bf16> test_points;

        if (segment.piece_idx == 0) {
            // For the negative infinite range, test some specific points
            test_points = {
                std::numeric_limits<bf16>::lowest(),
                static_cast<bf16>(-10.0f), static_cast<bf16>(-5.0f), static_cast<bf16>(-3.0f), static_cast<bf16>(-2.1f)
            };
        } else if (segment.piece_idx == 3) {
            // For the positive infinite range, test some specific points
            test_points = {
                static_cast<bf16>(2.1f), static_cast<bf16>(3.0f), static_cast<bf16>(5.0f), static_cast<bf16>(10.0f),
                std::numeric_limits<bf16>::max()
            };
        } else {
            // For finite ranges, sample uniformly
            double min_d = static_cast<double>(segment.min_val);
            double max_d = static_cast<double>(segment.max_val);
            double range = max_d - min_d;

            if (std::isfinite(range)) {
                for (int i = 0; i < 20; ++i) {
                    double t = i / 19.0;
                    double val = min_d + t * range;
                    bf16 bf16_val = static_cast<bf16>(val);
                    if (bf16_val >= segment.min_val && bf16_val <= segment.max_val) {
                        test_points.push_back(bf16_val);
                    }
                }
            }
        }

        // Remove duplicates and sort
        std::sort(test_points.begin(), test_points.end());
        auto last = std::unique(test_points.begin(), test_points.end());
        test_points.erase(last, test_points.end());

        std::cout << "Test points: " << test_points.size() << std::endl;

        // Analyze ULP errors for this segment
        std::vector<int64_t> ulp_errors;
        std::vector<double> abs_errors;
        double max_abs_error = 0.0;
        double mean_abs_error = 0.0;

        std::cout << "\nDetailed analysis:" << std::endl;
        std::cout << std::setw(12) << "x" << std::setw(15) << "GELU_approx"
                  << std::setw(15) << "GELU_exact" << std::setw(12) << "Abs_Error"
                  << std::setw(10) << "ULP_Error" << std::endl;
        std::cout << std::string(70, '-') << std::endl;

        for (bf16 x : test_points) {
            bf16 approx = gelu.evaluate(x);
            double x_double = static_cast<double>(x);

            // Compute exact GELU using erf-based fp64
            double exact = gelu_ref_fp64(x_double);
            double abs_error = fabs(static_cast<double>(approx) - exact);
            max_abs_error = std::max(max_abs_error, abs_error);
            mean_abs_error += abs_error;
            abs_errors.push_back(abs_error);

            // ULP error
            bf16 exact_bf16 = static_cast<bf16>(exact);
            int64_t ulp_error = ulp_calc.ulp_distance(exact_bf16, approx);
            ulp_errors.push_back(ulp_error);

            // Show detailed results for a few representative points
            if (test_points.size() <= 10 || (ulp_error > 1000) ||
                (abs_error > 0.1) || (&x == &test_points[0]) || (&x == &test_points.back())) {
                std::cout << std::setw(12) << static_cast<float>(x)
                          << std::setw(15) << static_cast<float>(approx)
                          << std::setw(15) << exact
                          << std::setw(12) << abs_error
                          << std::setw(10) << ulp_error << std::endl;
            }
        }

        // Summary statistics for this segment
        if (!ulp_errors.empty()) {
            mean_abs_error /= ulp_errors.size();

            auto [min_ulp_it, max_ulp_it] = std::minmax_element(ulp_errors.begin(), ulp_errors.end());
            int64_t min_ulp = *min_ulp_it;
            int64_t max_ulp = *max_ulp_it;
            double mean_ulp = 0.0;
            for (int64_t e : ulp_errors) mean_ulp += e;
            mean_ulp /= ulp_errors.size();

            // ULP error distribution
            std::vector<int> ulp_histogram(11, 0);
            for (int64_t error : ulp_errors) {
                if (error <= 10) {
                    ulp_histogram[error]++;
                } else {
                    ulp_histogram[10]++;  // >10 ULP
                }
            }

            std::cout << "\n=== SEGMENT STATISTICS ===" << std::endl;
            std::cout << "Test points analyzed: " << ulp_errors.size() << std::endl;
            std::cout << "Absolute Error - Max: " << max_abs_error << ", Mean: " << mean_abs_error << std::endl;
            std::cout << "ULP Error - Min: " << min_ulp << ", Max: " << max_ulp << ", Mean: " << mean_ulp << std::endl;

            std::cout << "\nULP Error Distribution:" << std::endl;
            for (size_t i = 0; i < ulp_histogram.size(); ++i) {
                double percentage = 100.0 * ulp_histogram[i] / ulp_errors.size();
                if (i < 10) {
                    std::cout << i << " ULP: " << ulp_histogram[i] << " points (" << percentage << "%)" << std::endl;
                } else {
                    std::cout << ">10 ULP: " << ulp_histogram[i] << " points (" << percentage << "%)" << std::endl;
                }
            }
        }
    }

    std::cout << "\n=== OVERALL ANALYSIS ===" << std::endl;
    std::cout << "This 4-segment linear approximation provides a baseline implementation." << std::endl;
    std::cout << "The 8-segment 4th-order framework would provide much better ULP accuracy" << std::endl;
    std::cout << "once coefficients are optimized using numerical methods." << std::endl;

    return 0;
}
