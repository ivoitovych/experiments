#include <stdfloat>
#include <iostream>

int main() {
    std::bfloat16_t x = 3.14f;
    std::cout << "bfloat16_t works! Value: " << static_cast<float>(x) << std::endl;
    return 0;
}

