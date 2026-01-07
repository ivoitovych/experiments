#include "ulp_calculator.h"
#include <iostream>

int main() {
    std::cout << "Simple ULP Calculator Test" << std::endl;

    ULP_Calculator calc;

    // Test basic functionality
    bf16 zero = static_cast<bf16>(0.0f);
    bf16 one = static_cast<bf16>(1.0f);

    std::cout << "Zero index: " << calc.get_ulp_index(zero) << std::endl;
    std::cout << "One index: " << calc.get_ulp_index(one) << std::endl;
    std::cout << "ULP distance: " << calc.ulp_distance(zero, one) << std::endl;
    std::cout << "Total values: " << calc.total_values() << std::endl;

    return 0;
}
