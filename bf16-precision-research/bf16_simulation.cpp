#include "bf16_simulation.h"

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <cstdint>
#include <limits>
#include <vector>

namespace bf16sim {

using bf16_t = bf16::native_bf16;

bf16_t reduce_sum_bf16_fp32(const bf16_t* data, std::size_t n) {
  float acc = 0.0f;
  for (std::size_t i = 0; i < n; ++i) {
    acc += bf16::to_fp32(data[i]);
  }
  return bf16::from_fp32(acc);
}

bf16_t reduce_sum_bf16_bf16(const bf16_t* data, std::size_t n) {
  bf16_t acc = bf16::from_fp32(0.0f);
  for (std::size_t i = 0; i < n; ++i) {
    acc = bf16::add(acc, data[i]);
  }
  return acc;
}

bf16_t dy_gamma_sum_bf16_fp32(const bf16_t* dy, const bf16_t* gamma, std::size_t n) {
  float acc = 0.0f;
  for (std::size_t i = 0; i < n; ++i) {
    acc += bf16::to_fp32(dy[i]) * bf16::to_fp32(gamma[i]);
  }
  acc *= 1.0f / static_cast<float>(n);
  return bf16::from_fp32(acc);
}

bf16_t dy_gamma_sum_bf16_bf16(const bf16_t* dy, const bf16_t* gamma, std::size_t n) {
  bf16_t acc = bf16::from_fp32(0.0f);
  for (std::size_t i = 0; i < n; ++i) {
    bf16_t prod = bf16::mul(dy[i], gamma[i]);
    acc = bf16::add(acc, prod);
  }
  bf16_t inv_n = bf16::from_fp32(1.0f / static_cast<float>(n));
  return bf16::mul(acc, inv_n);
}

bf16_t dy_gamma_xnorm_sum_bf16_fp32(
    const bf16_t* dy, const bf16_t* gamma, const bf16_t* x_hat, std::size_t n) {
  float acc = 0.0f;
  for (std::size_t i = 0; i < n; ++i) {
    acc += bf16::to_fp32(dy[i]) * bf16::to_fp32(gamma[i]) * bf16::to_fp32(x_hat[i]);
  }
  acc *= 1.0f / static_cast<float>(n);
  return bf16::from_fp32(acc);
}

bf16_t dy_gamma_xnorm_sum_bf16_bf16(
    const bf16_t* dy, const bf16_t* gamma, const bf16_t* x_hat, std::size_t n) {
  bf16_t acc = bf16::from_fp32(0.0f);
  for (std::size_t i = 0; i < n; ++i) {
    bf16_t prod = bf16::mul(dy[i], gamma[i]);
    prod = bf16::mul(prod, x_hat[i]);
    acc = bf16::add(acc, prod);
  }
  bf16_t inv_n = bf16::from_fp32(1.0f / static_cast<float>(n));
  return bf16::mul(acc, inv_n);
}

void compute_dx_bf16_fp32(
    const bf16_t* dy,
    const bf16_t* gamma,
    const bf16_t* x_hat,
    bf16_t rstd,
    bf16_t dy_gamma_sum,
    bf16_t dy_gamma_xnorm_sum,
    std::size_t n,
    bf16_t* out_dx) {
  const float rstd_f = bf16::to_fp32(rstd);
  const float s1 = bf16::to_fp32(dy_gamma_sum);
  const float s2 = bf16::to_fp32(dy_gamma_xnorm_sum);

  for (std::size_t i = 0; i < n; ++i) {
    float term1 = bf16::to_fp32(dy[i]) * bf16::to_fp32(gamma[i]);
    float term3 = bf16::to_fp32(x_hat[i]) * s2;
    float dx = rstd_f * (term1 - s1 - term3);
    out_dx[i] = bf16::from_fp32(dx);
  }
}

void compute_dx_bf16_bf16(
    const bf16_t* dy,
    const bf16_t* gamma,
    const bf16_t* x_hat,
    bf16_t rstd,
    bf16_t dy_gamma_sum,
    bf16_t dy_gamma_xnorm_sum,
    std::size_t n,
    bf16_t* out_dx) {
  for (std::size_t i = 0; i < n; ++i) {
    bf16_t term1 = bf16::mul(dy[i], gamma[i]);
    bf16_t term3 = bf16::mul(x_hat[i], dy_gamma_xnorm_sum);
    bf16_t tmp = bf16::sub(term1, dy_gamma_sum);
    tmp = bf16::sub(tmp, term3);
    out_dx[i] = bf16::mul(rstd, tmp);
  }
}

// FP32 reference helpers (no bf16 quantization internally).
float dy_gamma_sum_fp32_fp32(const std::vector<float>& dy, const std::vector<float>& gamma) {
  const std::size_t n = dy.size();
  float acc = 0.0f;
  for (std::size_t i = 0; i < n; ++i) {
    acc += dy[i] * gamma[i];
  }
  return acc * (1.0f / static_cast<float>(n));
}

float dy_gamma_xnorm_sum_fp32_fp32(
    const std::vector<float>& dy, const std::vector<float>& gamma, const std::vector<float>& x_hat) {
  const std::size_t n = dy.size();
  float acc = 0.0f;
  for (std::size_t i = 0; i < n; ++i) {
    acc += dy[i] * gamma[i] * x_hat[i];
  }
  return acc * (1.0f / static_cast<float>(n));
}

void compute_dx_fp32_fp32(
    const std::vector<float>& dy,
    const std::vector<float>& gamma,
    const std::vector<float>& x_hat,
    float rstd,
    float dy_gamma_sum,
    float dy_gamma_xnorm_sum,
    std::vector<float>& out_dx) {
  const std::size_t n = dy.size();
  out_dx.resize(n);
  for (std::size_t i = 0; i < n; ++i) {
    float term1 = dy[i] * gamma[i];
    float term3 = x_hat[i] * dy_gamma_xnorm_sum;
    out_dx[i] = rstd * (term1 - dy_gamma_sum - term3);
  }
}

}  // namespace bf16sim

