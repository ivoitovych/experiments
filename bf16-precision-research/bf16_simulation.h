#pragma once

#include "bf16_types.h"

#include <cstddef>
#include <vector>

namespace bf16sim {

using bf16_t = bf16::native_bf16;

// Reduce sum
bf16_t reduce_sum_bf16_fp32(const bf16_t* data, std::size_t n);
bf16_t reduce_sum_bf16_bf16(const bf16_t* data, std::size_t n);

// Row-wise scalars used in LayerNorm backward decomposition
bf16_t dy_gamma_sum_bf16_fp32(const bf16_t* dy, const bf16_t* gamma, std::size_t n);
bf16_t dy_gamma_sum_bf16_bf16(const bf16_t* dy, const bf16_t* gamma, std::size_t n);

bf16_t dy_gamma_xnorm_sum_bf16_fp32(
    const bf16_t* dy, const bf16_t* gamma, const bf16_t* x_hat, std::size_t n);
bf16_t dy_gamma_xnorm_sum_bf16_bf16(
    const bf16_t* dy, const bf16_t* gamma, const bf16_t* x_hat, std::size_t n);

// dx computation (produces bf16 outputs)
void compute_dx_bf16_fp32(
    const bf16_t* dy,
    const bf16_t* gamma,
    const bf16_t* x_hat,
    bf16_t rstd,
    bf16_t dy_gamma_sum,
    bf16_t dy_gamma_xnorm_sum,
    std::size_t n,
    bf16_t* out_dx);

void compute_dx_bf16_bf16(
    const bf16_t* dy,
    const bf16_t* gamma,
    const bf16_t* x_hat,
    bf16_t rstd,
    bf16_t dy_gamma_sum,
    bf16_t dy_gamma_xnorm_sum,
    std::size_t n,
    bf16_t* out_dx);

// FP32 reference implementations (no bf16 quantization internally)
float dy_gamma_sum_fp32_fp32(const std::vector<float>& dy, const std::vector<float>& gamma);
float dy_gamma_xnorm_sum_fp32_fp32(
    const std::vector<float>& dy, const std::vector<float>& gamma, const std::vector<float>& x_hat);
void compute_dx_fp32_fp32(
    const std::vector<float>& dy,
    const std::vector<float>& gamma,
    const std::vector<float>& x_hat,
    float rstd,
    float dy_gamma_sum,
    float dy_gamma_xnorm_sum,
    std::vector<float>& out_dx);

}  // namespace bf16sim

