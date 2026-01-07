#include <cstdint>
#include <cstring>
#include <iomanip>
#include <iostream>
#include <stdfloat>

#include "gelu_ref.h"

static inline uint16_t bf16_bits(std::bfloat16_t v) {
    uint16_t bits;
    std::memcpy(&bits, &v, sizeof(bits));
    return bits;
}

int main() {
    const double xs[] = {-14.0, -13.0, -12.0, -10.0, -9.0, -8.0, -7.0};

    std::cout << std::scientific << std::setprecision(18);
    std::cout << std::left
              << std::setw(8)  << "x"
              << std::setw(26) << "gelu_fp64(x)"
              << std::setw(18) << "bf16(gelu)"
              << "bf16_hex"
              << "\n"
              << std::string(72, '-')
              << "\n";

    for (double x : xs) {
        const double y = gelu_ref_fp64(x);
        const std::bfloat16_t yb = static_cast<std::bfloat16_t>(y);
        const uint16_t bits = bf16_bits(yb);

        std::cout << std::left
                  << std::setw(8)  << x
                  << std::setw(26) << y
                  << std::setw(18) << static_cast<double>(yb)
                  << "0x" << std::hex << std::setw(4) << std::setfill('0') << bits
                  << std::dec << std::setfill(' ')
                  << "\n";
    }

    return 0;
}


