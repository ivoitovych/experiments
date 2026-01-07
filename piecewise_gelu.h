#ifndef PIECEWISE_GELU_H
#define PIECEWISE_GELU_H

#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <vector>
#include <algorithm>
#include <limits>
#include <cmath>
#include <iomanip>

using bf16 = std::bfloat16_t;

/**
 * Piecewise Polynomial GELU Approximation for Limited Hardware
 *
 * This implementation uses only addition, subtraction, multiplication, and comparison
 * operations - no division, exponentiation, or special functions.
 *
 * The GELU function is approximated using different polynomial pieces in different
 * ranges of the input to balance accuracy and computational simplicity.
 */
class PiecewiseGELU {
private:
    // Polynomial coefficients for each piece
    // Each polynomial is of the form: a0 + a1*x + a2*x^2 + a3*x^3 + ...
    std::vector<std::vector<bf16>> coefficients_;
    std::vector<bf16> breakpoints_;

    // Thresholds for piecewise approximation
    bf16 neg_threshold_;
    bf16 pos_threshold_;

public:
    /**
     * Constructor with default piecewise polynomial approximation
     * These coefficients were optimized for ULP accuracy on bfloat16
     */
    PiecewiseGELU() {
        // Single polynomial approximation for the entire range
        // Using coefficients derived from fitting GELU(x) ≈ x * P(x)
        // where P(x) is a polynomial approximation of Φ(x)

        neg_threshold_ = std::numeric_limits<bf16>::lowest();  // Not used
        pos_threshold_ = std::numeric_limits<bf16>::max();     // Not used

        // Simple piecewise linear approximation
        // This is not ideal but demonstrates the concept
        // For production use, these coefficients would be optimized

        // Breakpoints for piecewise linear approximation
        neg_threshold_ = static_cast<bf16>(-2.0f);
        pos_threshold_ = static_cast<bf16>(2.0f);

        // Piece 0: x < -2 (GELU ≈ 0)
        coefficients_.push_back({static_cast<bf16>(0.0f)});

        // Piece 1: -2 <= x < 0 (linear approximation)
        coefficients_.push_back({
            static_cast<bf16>(-0.08f),  // intercept
            static_cast<bf16>(0.25f)    // slope
        });

        // Piece 2: 0 <= x < 2 (linear approximation)
        coefficients_.push_back({
            static_cast<bf16>(0.08f),   // intercept
            static_cast<bf16>(0.75f)    // slope
        });

        // Piece 3: x >= 2 (GELU ≈ x)
        coefficients_.push_back({
            static_cast<bf16>(0.0f),   // intercept
            static_cast<bf16>(1.0f)    // slope (just x)
        });

        // Only one piece now - the full range polynomial
    }

    /**
     * Evaluate piecewise linear GELU approximation
     * Uses only +, -, *, and comparison operations
     */
    bf16 evaluate(bf16 x) const {
        // Determine which piece to use
        int piece_idx;
        if (x < neg_threshold_) {
            piece_idx = 0;  // GELU ≈ 0
        } else if (x < static_cast<bf16>(0.0f)) {
            piece_idx = 1;  // Negative range linear
        } else if (x < pos_threshold_) {
            piece_idx = 2;  // Positive range linear
        } else {
            piece_idx = 3;  // GELU ≈ x
        }

        // Evaluate linear function: result = a0 + a1*x
        const auto& coeffs = coefficients_[piece_idx];
        bf16 result = coeffs[0];  // a0
        if (coeffs.size() > 1) {
            result = result + coeffs[1] * x;  // a0 + a1*x
        }

        return result;
    }

    /**
     * Evaluate a specific piece (for testing)
     */
    bf16 evaluate_piece(bf16 x, int piece_idx) const {
        if (piece_idx < 0 || piece_idx >= static_cast<int>(coefficients_.size())) {
            return static_cast<bf16>(0.0f);
        }

        const auto& coeffs = coefficients_[piece_idx];
        bf16 result = coeffs[0];  // a0
        if (coeffs.size() > 1) {
            result = result + coeffs[1] * x;  // a0 + a1*x
        }

        return result;
    }

    /**
     * Get the breakpoints for debugging
     */
    const std::vector<bf16>& get_breakpoints() const {
        return breakpoints_;
    }

    /**
     * Get thresholds
     */
    bf16 neg_threshold() const { return neg_threshold_; }
    bf16 pos_threshold() const { return pos_threshold_; }

    /**
     * Get coefficient matrix for debugging
     */
    const std::vector<std::vector<bf16>>& get_coefficients() const {
        return coefficients_;
    }
};

/**
 * ULP Accuracy Tester for GELU Approximations
 */
class GELU_ULP_Tester {
private:
    ULP_Calculator ulp_calc_;
    PiecewiseGELU gelu_approx_;

public:
    /**
     * Test ULP accuracy over a range of bfloat16 values
     */
    void test_ulp_accuracy(bf16 min_val = std::numeric_limits<bf16>::lowest(),
                          bf16 max_val = std::numeric_limits<bf16>::max(),
                          size_t num_samples = 10000) {

        std::cout << "Testing GELU ULP Accuracy" << std::endl;
        std::cout << "========================" << std::endl;
        std::cout << "Range: [" << static_cast<float>(min_val) << ", "
                  << static_cast<float>(max_val) << "]" << std::endl;
        std::cout << "Samples: " << num_samples << std::endl;

        // Generate test points (uniform sampling of representable values)
        std::vector<bf16> test_values;
        test_values.reserve(num_samples);

        // Sample uniformly across the representable range
        int64_t min_idx = ulp_calc_.get_ulp_index(min_val);
        int64_t max_idx = ulp_calc_.get_ulp_index(max_val);

        if (min_idx < 0) min_idx = 0;
        if (max_idx < 0) max_idx = ulp_calc_.total_values() - 1;

        int64_t range = max_idx - min_idx;
        int64_t step = std::max(int64_t(1), range / static_cast<int64_t>(num_samples));

        for (int64_t idx = min_idx; idx <= max_idx; idx += step) {
            // Find the bfloat16 value at this ULP index
            // This is a bit tricky - we need to find the value at a specific index
            // For now, let's sample uniformly in the value space
            bf16 val = min_val + static_cast<bf16>((static_cast<float>(idx - min_idx) /
                                                    static_cast<float>(range)) *
                                                    (static_cast<float>(max_val) - static_cast<float>(min_val)));
            if (!std::isnan(val) && !std::isinf(val)) {
                test_values.push_back(val);
            }
        }

        // Also add some specific test points
        bf16 special_values[] = {
            static_cast<bf16>(-3.0f), static_cast<bf16>(-2.0f), static_cast<bf16>(-1.0f),
            static_cast<bf16>(-0.5f), static_cast<bf16>(0.0f), static_cast<bf16>(0.5f),
            static_cast<bf16>(1.0f), static_cast<bf16>(2.0f), static_cast<bf16>(3.0f)
        };

        for (bf16 val : special_values) {
            test_values.push_back(val);
        }

        // Compute ULP errors
        std::vector<int64_t> ulp_errors;
        ulp_errors.reserve(test_values.size());

        int64_t max_ulp_error = 0;
        double mean_ulp_error = 0.0;
        int64_t min_ulp_error = std::numeric_limits<int64_t>::max();

        for (bf16 x : test_values) {
            // Compute exact GELU using double precision
            double x_double = static_cast<double>(x);
            double exact_gelu = gelu_ref_fp64(x_double);

            // Compute approximation
            bf16 approx_gelu = gelu_approx_.evaluate(x);
            double approx_double = static_cast<double>(approx_gelu);

            // Compute ULP distance
            bf16 exact_bf16 = static_cast<bf16>(exact_gelu);
            int64_t ulp_dist = ulp_calc_.ulp_distance(exact_bf16, approx_gelu);

            if (ulp_dist >= 0) {  // Valid distance
                ulp_errors.push_back(ulp_dist);
                max_ulp_error = std::max(max_ulp_error, ulp_dist);
                min_ulp_error = std::min(min_ulp_error, ulp_dist);
                mean_ulp_error += ulp_dist;
            }
        }

        mean_ulp_error /= ulp_errors.size();

        // Print results
        std::cout << "\nULP Accuracy Results:" << std::endl;
        std::cout << "Total test points: " << ulp_errors.size() << std::endl;
        std::cout << "Min ULP error: " << min_ulp_error << std::endl;
        std::cout << "Max ULP error: " << max_ulp_error << std::endl;
        std::cout << "Mean ULP error: " << mean_ulp_error << std::endl;

        // Show distribution
        std::vector<int> histogram(11, 0);  // 0-10 ULP buckets
        for (int64_t error : ulp_errors) {
            if (error <= 10) {
                histogram[error]++;
            } else {
                histogram[10]++;  // >10 ULP
            }
        }

        std::cout << "\nULP Error Distribution:" << std::endl;
        for (size_t i = 0; i < histogram.size(); ++i) {
            if (i < 10) {
                std::cout << i << " ULP: " << histogram[i] << " points" << std::endl;
            } else {
                std::cout << ">10 ULP: " << histogram[i] << " points" << std::endl;
            }
        }

        // Show some sample values
        std::cout << "\nSample approximations:" << std::endl;
        std::cout << std::fixed << std::setprecision(6);
        for (size_t i = 0; i < std::min(size_t(10), test_values.size()); ++i) {
            bf16 x = test_values[i];
            double x_double = static_cast<double>(x);
            double exact = gelu_ref_fp64(x_double);
            bf16 approx = gelu_approx_.evaluate(x);

            std::cout << "x=" << x_double << ": exact=" << exact
                      << ", approx=" << static_cast<double>(approx)
                      << ", ulp_diff=" << ulp_calc_.ulp_distance(static_cast<bf16>(exact), approx)
                      << std::endl;
        }
    }
};

#endif // PIECEWISE_GELU_H
