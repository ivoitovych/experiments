#include <stdfloat>
#include <iostream>

int main() {
    std::bfloat16_t a = 1.0bf16;
    std::bfloat16_t b = 2.0bf16;
    std::bfloat16_t c = a + b;

    std::cout << "bf16 test: " << static_cast<float>(c) << std::endl;

    // Test more operations
    std::bfloat16_t d = a * b;  // should be 2.0
    std::bfloat16_t e = c - d;  // should be 1.0

    std::cout << "a * b = " << static_cast<float>(d) << std::endl;
    std::cout << "c - d = " << static_cast<float>(e) << std::endl;

    return 0;
}