#ifndef PIECEWISE_GELU_V2_H
#define PIECEWISE_GELU_V2_H

#include "ulp_calculator.h"
#include <vector>
#include <algorithm>
#include <limits>
#include <cmath>
#include <iostream>

using bf16 = std::bfloat16_t;

/**
 * Enhanced Piecewise Polynomial GELU Approximation
 *
 * Uses 8 segments with 4th order polynomials based on bfloat16 saturation analysis.
 * Approximation range: [-8.4, 8.3] where saturation effects become significant.
 */
class PiecewiseGELU_v2 {
private:
    // Polynomial coefficients for each piece
    // Each polynomial is of the form: a0 + a1*x + a2*x^2 + a3*x^3 + a4*x^4
    std::vector<std::vector<bf16>> coefficients_;
    std::vector<bf16> breakpoints_;

    // Based on saturation analysis, useful approximation range is [-8.4, 8.3]
    bf16 min_approx_range_;
    bf16 max_approx_range_;

public:
    /**
     * Constructor with 8 segments and 4th order polynomials
     */
    PiecewiseGELU_v2() {
        min_approx_range_ = static_cast<bf16>(-8.4f);
        max_approx_range_ = static_cast<bf16>(8.3f);

        // Breakpoints for 8 segments: divide [-8.4, 8.3] into 8 equal parts
        breakpoints_ = {
            min_approx_range_,
            static_cast<bf16>(-6.3f),  // -8.4 + 2.1*1
            static_cast<bf16>(-4.2f),  // -8.4 + 2.1*2
            static_cast<bf16>(-2.1f),  // -8.4 + 2.1*3
            static_cast<bf16>(0.0f),   // -8.4 + 2.1*4
            static_cast<bf16>(2.1f),   // -8.4 + 2.1*5
            static_cast<bf16>(4.2f),   // -8.4 + 2.1*6
            static_cast<bf16>(6.3f),   // -8.4 + 2.1*7
            max_approx_range_
        };

        // Initialize 8 segments with 4th order polynomials
        // These are placeholder coefficients - in practice, these would be
        // optimized using numerical methods to minimize ULP error
        coefficients_.resize(8);

        // Segment 0: x < -6.3 (very negative values)
        coefficients_[0] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };

        // Segment 1: -6.3 <= x < -4.2
        coefficients_[1] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };

        // Segment 2: -4.2 <= x < -2.1
        coefficients_[2] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };

        // Segment 3: -2.1 <= x < 0
        coefficients_[3] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };

        // Segment 4: 0 <= x < 2.1
        coefficients_[4] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };

        // Segment 5: 2.1 <= x < 4.2
        coefficients_[5] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };

        // Segment 6: 4.2 <= x < 6.3
        coefficients_[6] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };

        // Segment 7: 6.3 <= x < 8.3
        coefficients_[7] = {
            static_cast<bf16>(0.0f),        // a0
            static_cast<bf16>(0.0f),        // a1
            static_cast<bf16>(0.0f),        // a2
            static_cast<bf16>(0.0f),        // a3
            static_cast<bf16>(0.0f)         // a4
        };
    }

    /**
     * Evaluate piecewise 4th order polynomial GELU approximation
     */
    bf16 evaluate(bf16 x) const {
        // Handle saturation regions
        if (x <= min_approx_range_) {
            return static_cast<bf16>(0.0f);  // GELU saturates to 0
        }
        if (x >= max_approx_range_) {
            return x;  // GELU saturates to x
        }

        // Find which segment x belongs to
        int segment_idx = 0;
        for (size_t i = 1; i < breakpoints_.size(); ++i) {
            if (x < breakpoints_[i]) {
                segment_idx = i - 1;
                break;
            }
        }

        // Evaluate 4th order polynomial: a0 + a1*x + a2*x^2 + a3*x^3 + a4*x^4
        const auto& coeffs = coefficients_[segment_idx];
        bf16 result = coeffs[0];      // a0
        bf16 x2 = x * x;              // x^2
        bf16 x3 = x2 * x;             // x^3
        bf16 x4 = x3 * x;             // x^4

        result = result + coeffs[1] * x;   // + a1*x
        result = result + coeffs[2] * x2;  // + a2*x^2
        result = result + coeffs[3] * x3;  // + a3*x^3
        result = result + coeffs[4] * x4;  // + a4*x^4

        return result;
    }

    /**
     * Get segment information for debugging
     */
    int get_segment_count() const { return coefficients_.size(); }
    int get_polynomial_order() const { return 4; }
    const std::vector<bf16>& get_breakpoints() const { return breakpoints_; }
    bf16 get_min_range() const { return min_approx_range_; }
    bf16 get_max_range() const { return max_approx_range_; }

    /**
     * Evaluate a specific segment (for testing)
     */
    bf16 evaluate_segment(bf16 x, int segment_idx) const {
        if (segment_idx < 0 || segment_idx >= static_cast<int>(coefficients_.size())) {
            return static_cast<bf16>(0.0f);
        }

        const auto& coeffs = coefficients_[segment_idx];
        bf16 result = coeffs[0];      // a0
        bf16 x2 = x * x;              // x^2
        bf16 x3 = x2 * x;             // x^3
        bf16 x4 = x3 * x;             // x^4

        result = result + coeffs[1] * x;   // + a1*x
        result = result + coeffs[2] * x2;  // + a2*x^2
        result = result + coeffs[3] * x3;  // + a3*x^3
        result = result + coeffs[4] * x4;  // + a4*x^4

        return result;
    }

    /**
     * Get which segment a value belongs to
     */
    int get_segment_index(bf16 x) const {
        if (x <= min_approx_range_) return -1;  // Saturation region
        if (x >= max_approx_range_) return -2;  // Saturation region

        for (size_t i = 1; i < breakpoints_.size(); ++i) {
            if (x < breakpoints_[i]) {
                return i - 1;
            }
        }
        return -3;  // Should not reach here
    }
};

#endif // PIECEWISE_GELU_V2_H
