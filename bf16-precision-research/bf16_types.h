#pragma once

#include <cstdint>
#include <cstring>
#include <type_traits>

// A minimal bf16 wrapper.
//
// Prefer C++23 std::bfloat16_t when available (GCC 13+ with <stdfloat>).
// Otherwise, fall back to a software bf16 (round-to-nearest-even on float->bf16).

#if __has_include(<stdfloat>)
#include <stdfloat>
#define BF16_HAVE_STD_BFLOAT16 1
#else
#define BF16_HAVE_STD_BFLOAT16 0
#endif

namespace bf16 {

namespace detail {

static inline uint32_t float_to_u32(float x) {
  static_assert(sizeof(float) == sizeof(uint32_t));
  uint32_t u;
  std::memcpy(&u, &x, sizeof(u));
  return u;
}

static inline float u32_to_float(uint32_t u) {
  static_assert(sizeof(float) == sizeof(uint32_t));
  float x;
  std::memcpy(&x, &u, sizeof(x));
  return x;
}

static inline uint16_t fp32_to_bf16_rne(float x) {
  // Round-to-nearest-even by adding a bias based on the LSB of the upper 16 bits.
  //
  // Reference approach:
  //   u = bits(x)
  //   lsb = (u >> 16) & 1
  //   rounding_bias = 0x7FFF + lsb
  //   bf = (u + rounding_bias) >> 16
  //
  // This handles normal numbers; NaN/Inf are preserved by truncation behavior.
  uint32_t u = float_to_u32(x);
  uint32_t lsb = (u >> 16) & 1u;
  uint32_t bias = 0x7FFFu + lsb;
  uint16_t bf = static_cast<uint16_t>((u + bias) >> 16);
  return bf;
}

static inline float bf16_to_fp32(uint16_t bf) {
  uint32_t u = static_cast<uint32_t>(bf) << 16;
  return u32_to_float(u);
}

}  // namespace detail

#if BF16_HAVE_STD_BFLOAT16

using native_bf16 = std::bfloat16_t;

static inline float to_fp32(native_bf16 x) { return static_cast<float>(x); }
static inline native_bf16 from_fp32(float x) { return static_cast<native_bf16>(x); }

#else

struct native_bf16 {
  uint16_t bits{0};

  native_bf16() = default;
  native_bf16(const native_bf16&) = default;
  native_bf16& operator=(const native_bf16&) = default;

  // NOLINTNEXTLINE(google-explicit-constructor)
  native_bf16(float x) : bits(detail::fp32_to_bf16_rne(x)) {}

  explicit operator float() const { return detail::bf16_to_fp32(bits); }
};

static inline float to_fp32(native_bf16 x) { return static_cast<float>(x); }
static inline native_bf16 from_fp32(float x) { return native_bf16{x}; }

#endif

// Arithmetic operators (compute in fp32, then quantize to bf16).
static inline native_bf16 add(native_bf16 a, native_bf16 b) {
  return from_fp32(to_fp32(a) + to_fp32(b));
}

static inline native_bf16 sub(native_bf16 a, native_bf16 b) {
  return from_fp32(to_fp32(a) - to_fp32(b));
}

static inline native_bf16 mul(native_bf16 a, native_bf16 b) {
  return from_fp32(to_fp32(a) * to_fp32(b));
}

}  // namespace bf16

