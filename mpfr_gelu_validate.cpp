#include <cstdint>
#include <cstring>
#include <iomanip>
#include <iostream>
#include <limits>
#include <stdfloat>

#include "gelu_ref.h"

#if __has_include(<mpfr.h>)
#include <mpfr.h>
#define HAS_MPFR 1
#else
#define HAS_MPFR 0
#endif

using bf16 = std::bfloat16_t;

static inline bool bf16_is_nan_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) != 0);
}

static inline bool bf16_is_inf_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) == 0);
}

static inline float f32_from_bf16_bits(uint16_t b) {
    uint32_t u = static_cast<uint32_t>(b) << 16;
    float x;
    std::memcpy(&x, &u, sizeof(x));
    return x;
}

// Deterministic bf16 rounding (RNE) from float32 bits, per the report.
static inline uint16_t bf16_from_f32_rne(float x) {
    uint32_t u;
    std::memcpy(&u, &x, sizeof(u));
    const uint32_t lsb = (u >> 16) & 1u;
    const uint32_t rounding_bias = 0x7FFFu + lsb; // ties-to-even
    u += rounding_bias;
    return static_cast<uint16_t>(u >> 16);
}

#if HAS_MPFR
static float gelu_mpfr_to_f32(float xin) {
    // Stable erfc-based reference in MPFR.
    constexpr int PREC = 256; // bits
    mpfr_t x, t, erfcv, res, sqrt2;
    mpfr_inits2(PREC, x, t, erfcv, res, sqrt2, (mpfr_ptr)0);

    mpfr_set_flt(x, xin, MPFR_RNDN);
    // Avoid mpfr_const_sqrt2 (not available in all MPFR versions).
    mpfr_sqrt_ui(sqrt2, 2, MPFR_RNDN);

    if (mpfr_sgn(x) < 0) {
        // res = 0.5 * x * erfc((-x)/sqrt2)
        mpfr_neg(t, x, MPFR_RNDN);
        mpfr_div(t, t, sqrt2, MPFR_RNDN);
        mpfr_erfc(erfcv, t, MPFR_RNDN);
        mpfr_mul(res, x, erfcv, MPFR_RNDN);
        mpfr_mul_2si(res, res, -1, MPFR_RNDN);
    } else {
        // res = x - 0.5 * x * erfc(x/sqrt2)
        mpfr_div(t, x, sqrt2, MPFR_RNDN);
        mpfr_erfc(erfcv, t, MPFR_RNDN);
        mpfr_mul(res, x, erfcv, MPFR_RNDN);
        mpfr_mul_2si(res, res, -1, MPFR_RNDN);
        mpfr_sub(res, x, res, MPFR_RNDN);
    }

    float out = mpfr_get_flt(res, MPFR_RNDN);
    mpfr_clears(x, t, erfcv, res, sqrt2, (mpfr_ptr)0);
    return out;
}
#endif

int main() {
#if !HAS_MPFR
    std::cerr << "mpfr.h not found. Install MPFR dev headers and rebuild.\n";
    std::cerr << "Ubuntu/WSL: sudo apt-get update && sudo apt-get install -y libmpfr-dev libgmp-dev\n";
    return 1;
#else
    std::cout << "MPFR GELU validation (bf16 domain)\n";
    std::cout << "=================================\n";
    std::cout << "Comparing bf16(ref) computed from:\n";
    std::cout << "- mpfr (256-bit, erfc-based) -> float -> bf16 (RNE)\n";
    std::cout << "- gelu_ref_fp64 (erfc-based) -> float -> bf16 (RNE)\n\n";

    uint64_t checked = 0;
    uint64_t mismatches = 0;
    uint16_t first_mis_x = 0;
    uint16_t first_mis_mp = 0;
    uint16_t first_mis_fp64 = 0;

    for (uint32_t i = 0; i < 65536; ++i) {
        const uint16_t x_bits = static_cast<uint16_t>(i);
        if (bf16_is_nan_bits(x_bits) || bf16_is_inf_bits(x_bits)) continue;

        float xf = f32_from_bf16_bits(x_bits); // exact bf16 value as float32

        // MPFR reference -> bf16 bits (via float + deterministic rounding)
        float y_mp_f = gelu_mpfr_to_f32(xf);
        uint16_t y_mp_b = bf16_from_f32_rne(y_mp_f);

        // fp64 reference -> bf16 bits (via float + deterministic rounding)
        double y_fp64_d = gelu_ref_fp64(static_cast<double>(xf));
        float y_fp64_f = static_cast<float>(y_fp64_d);
        uint16_t y_fp64_b = bf16_from_f32_rne(y_fp64_f);

        ++checked;
        if (y_mp_b != y_fp64_b) {
            ++mismatches;
            if (mismatches == 1) {
                first_mis_x = x_bits;
                first_mis_mp = y_mp_b;
                first_mis_fp64 = y_fp64_b;
            }
        }
    }

    std::cout << "Checked finite numeric bf16 inputs: " << checked << "\n";
    std::cout << "Mismatched bf16 outputs: " << mismatches << "\n";

    if (mismatches) {
        std::cout << "\nFirst mismatch:\n";
        std::cout << "  x_bits      = 0x" << std::hex << std::setw(4) << std::setfill('0') << first_mis_x << std::dec << std::setfill(' ') << "\n";
        std::cout << "  mpfr bf16   = 0x" << std::hex << std::setw(4) << std::setfill('0') << first_mis_mp << std::dec << std::setfill(' ') << "\n";
        std::cout << "  fp64 bf16   = 0x" << std::hex << std::setw(4) << std::setfill('0') << first_mis_fp64 << std::dec << std::setfill(' ') << "\n";
        std::cout << "\nIf mismatches are non-zero, consider using MPFR as the golden reference\n";
        std::cout << "for threshold points (or direct MPFR->bf16 rounding to avoid double-rounding).\n";
        return 2;
    }

    std::cout << "\nOK: mpfr and gelu_ref_fp64 agree after float->bf16 RNE rounding on all finite bf16 inputs.\n";
    return 0;
#endif
}


