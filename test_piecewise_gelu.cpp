#include "piecewise_gelu.h"
#include "ulp_calculator.h"
#include "gelu_ref.h"
#include <iostream>
#include <iomanip>
#include <vector>
#include <cmath>

int main() {
    std::cout << "Piecewise Polynomial GELU Approximation Test" << std::endl;
    std::cout << "=============================================" << std::endl;

    PiecewiseGELU gelu;

    // Show the piecewise linear structure
    std::cout << "Piecewise Linear GELU Structure:" << std::endl;
    std::cout << "Breakpoints: [" << static_cast<float>(gelu.neg_threshold())
              << ", 0, " << static_cast<float>(gelu.pos_threshold()) << "]" << std::endl;

    const auto& coeffs = gelu.get_coefficients();
    std::cout << "Pieces:" << std::endl;
    for (size_t i = 0; i < coeffs.size(); ++i) {
        std::cout << "  Piece " << i << ": ";
        if (coeffs[i].size() >= 2) {
            std::cout << static_cast<float>(coeffs[i][1]) << "*x + " << static_cast<float>(coeffs[i][0]);
        } else {
            std::cout << static_cast<float>(coeffs[i][0]);
        }
        std::cout << std::endl;
    }

    // Test basic functionality
    std::cout << "\nBasic functionality tests:" << std::endl;
    bf16 test_values[] = {
        static_cast<bf16>(-3.0f), static_cast<bf16>(-2.0f), static_cast<bf16>(-1.0f),
        static_cast<bf16>(-0.5f), static_cast<bf16>(0.0f), static_cast<bf16>(0.5f),
        static_cast<bf16>(1.0f), static_cast<bf16>(2.0f), static_cast<bf16>(3.0f)
    };

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "x\t\tGELU(x)\t\tExact GELU\t\tError" << std::endl;
    std::cout << "-\t\t-------\t\t----------\t\t-----" << std::endl;

    for (bf16 x : test_values) {
        bf16 approx = gelu.evaluate(x);
        double x_double = static_cast<double>(x);
        double exact = gelu_ref_fp64(x_double);

        double error = fabs(static_cast<double>(approx) - exact);

        std::cout << static_cast<double>(x) << "\t\t"
                  << static_cast<double>(approx) << "\t\t"
                  << exact << "\t\t"
                  << error << std::endl;
    }

    // Test ULP accuracy
    std::cout << "\nTesting ULP accuracy..." << std::endl;
    GELU_ULP_Tester tester;
    tester.test_ulp_accuracy(static_cast<bf16>(-3.0f), static_cast<bf16>(3.0f), 5000);

    // Test the different pieces directly
    std::cout << "\nTesting individual pieces:" << std::endl;
    bf16 test_x = static_cast<bf16>(-1.0f);
    std::cout << "x = " << static_cast<float>(test_x) << std::endl;
    for (int piece = 0; piece < 4; ++piece) {
        bf16 result = gelu.evaluate_piece(test_x, piece);
        std::cout << "  Piece " << piece << ": " << static_cast<float>(result) << std::endl;
    }
    bf16 final_result = gelu.evaluate(test_x);
    double exact_gelu = gelu_ref_fp64(static_cast<double>(test_x));
    std::cout << "  Final result: " << static_cast<float>(final_result) << std::endl;
    std::cout << "  Exact GELU: " << exact_gelu << std::endl;
    std::cout << "  Error: " << fabs(static_cast<double>(final_result) - exact_gelu) << std::endl;

    return 0;
}
