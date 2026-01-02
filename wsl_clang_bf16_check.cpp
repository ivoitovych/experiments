#include <stdfloat>
#include <iostream>

int main() {
#ifdef __cpp_lib_stdfloat
    std::cout << "__cpp_lib_stdfloat=" << __cpp_lib_stdfloat << "\n";
#else
    std::cout << "__cpp_lib_stdfloat not defined\n";
#endif

    std::bfloat16_t x = std::bfloat16_t(3.14f);
    std::cout << "value=" << static_cast<float>(x) << "\n";
    return 0;
}


