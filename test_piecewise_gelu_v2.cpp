#include "piecewise_gelu_v2.h"
#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>

int main() {
    std::cout << "Enhanced Piecewise GELU Approximation Test (8 segments, 4th order)" << std::endl;
    std::cout << "=================================================================" << std::endl;

    PiecewiseGELU_v2 gelu;
    ULP_Calculator ulp_calc;

    // Show the structure
    std::cout << "Approximation range: [" << static_cast<float>(gelu.get_min_range())
              << ", " << static_cast<float>(gelu.get_max_range()) << "]" << std::endl;
    std::cout << "Number of segments: " << gelu.get_segment_count() << std::endl;
    std::cout << "Polynomial order: " << gelu.get_polynomial_order() << std::endl;

    std::cout << "\nBreakpoints:" << std::endl;
    const auto& breakpoints = gelu.get_breakpoints();
    for (size_t i = 0; i < breakpoints.size(); ++i) {
        std::cout << "  " << i << ": " << static_cast<float>(breakpoints[i]) << std::endl;
    }

    // Test basic functionality
    std::cout << "\nBasic functionality tests:" << std::endl;
    std::vector<bf16> test_values = {
        static_cast<bf16>(-9.0f), static_cast<bf16>(-8.0f), static_cast<bf16>(-6.0f),
        static_cast<bf16>(-4.0f), static_cast<bf16>(-2.0f), static_cast<bf16>(0.0f),
        static_cast<bf16>(2.0f), static_cast<bf16>(4.0f), static_cast<bf16>(6.0f),
        static_cast<bf16>(8.0f), static_cast<bf16>(9.0f)
    };

    std::cout << std::fixed << std::setprecision(6);
    std::cout << std::setw(8) << "x" << std::setw(12) << "Segment" << std::setw(15) << "GELU(x)"
              << std::setw(15) << "Exact GELU" << std::setw(12) << "Error" << std::setw(12) << "ULP Error" << std::endl;
    std::cout << std::string(80, '-') << std::endl;

    for (bf16 x : test_values) {
        int segment = gelu.get_segment_index(x);
        bf16 approx = gelu.evaluate(x);
        double x_double = static_cast<double>(x);

        // Compute exact GELU using erf-based fp64
        double exact = gelu_ref_fp64(x_double);
        double abs_error = fabs(static_cast<double>(approx) - exact);

        // ULP error
        bf16 exact_bf16 = static_cast<bf16>(exact);
        int64_t ulp_error = ulp_calc.ulp_distance(exact_bf16, approx);

        std::string segment_str;
        if (segment == -1) segment_str = "SAT_NEG";
        else if (segment == -2) segment_str = "SAT_POS";
        else segment_str = std::to_string(segment);

        std::cout << std::setw(8) << static_cast<float>(x)
                  << std::setw(12) << segment_str
                  << std::setw(15) << static_cast<float>(approx)
                  << std::setw(15) << exact
                  << std::setw(12) << abs_error
                  << std::setw(12) << ulp_error << std::endl;
    }

    // Test segment boundaries
    std::cout << "\nTesting segment boundaries:" << std::endl;
    for (size_t i = 0; i < breakpoints.size(); ++i) {
        bf16 x = breakpoints[i];
        int segment = gelu.get_segment_index(x);

        std::cout << "Breakpoint " << i << ": x=" << static_cast<float>(x)
                  << ", segment=" << segment << std::endl;
    }

    // Test continuity at boundaries (should be continuous)
    std::cout << "\nTesting continuity at boundaries:" << std::endl;
    for (size_t i = 1; i < breakpoints.size(); ++i) {
        bf16 left = breakpoints[i-1];
        bf16 right = breakpoints[i];

        // Evaluate at boundary from both sides
        bf16 val_left = gelu.evaluate(left);
        bf16 val_right = gelu.evaluate(right);

        std::cout << "Boundary " << (i-1) << "-" << i << ": "
                  << "left(" << static_cast<float>(left) << ")=" << static_cast<float>(val_left)
                  << ", right(" << static_cast<float>(right) << ")=" << static_cast<float>(val_right)
                  << std::endl;
    }

    std::cout << "\nNote: Coefficients are currently set to 0 - this demonstrates the framework." << std::endl;
    std::cout << "In practice, coefficients would be optimized using numerical methods" << std::endl;
    std::cout << "to minimize ULP error within each segment." << std::endl;

    return 0;
}
