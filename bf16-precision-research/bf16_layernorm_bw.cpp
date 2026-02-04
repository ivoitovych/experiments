#include <stdfloat>
#include <vector>
#include <iostream>
#include <iomanip>
#include <cassert>

// Include our simulation utilities
#include "bf16_simulation.hpp"

// Type aliases
using bf16 = std::bfloat16_t;
using f32 = float;

// ============================================================================
// LayerNorm backward computation functions
// ============================================================================

// Compute dx = rstd * (dy * gamma - dy_gamma_sum - x_hat * dy_gamma_xnorm_sum)
// With fp32 internal precision
std::vector<bf16> compute_dx_bf16_fp32(const std::vector<bf16>& dy,
                                      const std::vector<bf16>& gamma,
                                      const std::vector<bf16>& x_hat,
                                      bf16 dy_gamma_sum,
                                      bf16 dy_gamma_xnorm_sum,
                                      bf16 rstd) {
    assert(dy.size() == gamma.size() && gamma.size() == x_hat.size());
    size_t N = dy.size();

    std::vector<bf16> dx;
    dx.reserve(N);

    f32 dy_gamma_sum_f32 = static_cast<f32>(dy_gamma_sum);
    f32 dy_gamma_xnorm_sum_f32 = static_cast<f32>(dy_gamma_xnorm_sum);
    f32 rstd_f32 = static_cast<f32>(rstd);

    for (size_t i = 0; i < N; ++i) {
        f32 dy_f32 = static_cast<f32>(dy[i]);
        f32 gamma_f32 = static_cast<f32>(gamma[i]);
        f32 x_hat_f32 = static_cast<f32>(x_hat[i]);

        f32 term1 = dy_f32 * gamma_f32;
        f32 term2 = dy_gamma_sum_f32;
        f32 term3 = x_hat_f32 * dy_gamma_xnorm_sum_f32;

        f32 dx_f32 = rstd_f32 * (term1 - term2 - term3);
        dx.push_back(static_cast<bf16>(dx_f32));
    }

    return dx;
}

// Compute dx = rstd * (dy * gamma - dy_gamma_sum - x_hat * dy_gamma_xnorm_sum)
// With bf16 internal precision
std::vector<bf16> compute_dx_bf16_bf16(const std::vector<bf16>& dy,
                                      const std::vector<bf16>& gamma,
                                      const std::vector<bf16>& x_hat,
                                      bf16 dy_gamma_sum,
                                      bf16 dy_gamma_xnorm_sum,
                                      bf16 rstd) {
    assert(dy.size() == gamma.size() && gamma.size() == x_hat.size());
    size_t N = dy.size();

    std::vector<bf16> dx;
    dx.reserve(N);

    for (size_t i = 0; i < N; ++i) {
        bf16 term1 = dy[i] * gamma[i];
        bf16 term2 = dy_gamma_sum;
        bf16 term3 = x_hat[i] * dy_gamma_xnorm_sum;

        bf16 inner = term1 - term2 - term3;
        bf16 dx_val = rstd * inner;
        dx.push_back(dx_val);
    }

    return dx;
}

// ============================================================================
// Complete LayerNorm backward pass
// ============================================================================

struct LayerNormBackwardResult {
    std::vector<bf16> dx;
    bf16 dgamma;  // Simplified: single scalar for this simulation
    bf16 dbeta;   // Simplified: single scalar for this simulation
};

// LayerNorm backward with fp32 internal precision
LayerNormBackwardResult layernorm_bw_bf16_fp32(const std::vector<bf16>& x,
                                               const std::vector<bf16>& dy,
                                               const std::vector<bf16>& gamma,
                                               const std::vector<bf16>& beta,
                                               bf16 mean,
                                               bf16 rstd) {
    assert(x.size() == dy.size() && dy.size() == gamma.size() && gamma.size() == beta.size());
    size_t N = x.size();

    // Compute normalized input (x_hat) for this simulation
    // x_hat = (x - mean) * rstd
    std::vector<bf16> x_hat;
    x_hat.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        bf16 x_minus_mean = x[i] - mean;
        x_hat.push_back(x_minus_mean * rstd);
    }

    // Compute the required sums
    bf16 dy_gamma_sum = dy_gamma_sum_bf16_fp32(dy, gamma);
    bf16 dy_gamma_xnorm_sum = dy_gamma_xnorm_sum_bf16_fp32(dy, gamma, x_hat);

    // Compute dx
    std::vector<bf16> dx = compute_dx_bf16_fp32(dy, gamma, x_hat, dy_gamma_sum, dy_gamma_xnorm_sum, rstd);

    // For this simulation, compute simplified dgamma and dbeta
    // dgamma = sum(dy * x_hat)
    f32 dgamma_sum = 0.0f;
    f32 dbeta_sum = 0.0f;
    for (size_t i = 0; i < N; ++i) {
        f32 dy_f32 = static_cast<f32>(dy[i]);
        f32 x_hat_f32 = static_cast<f32>(x_hat[i]);
        dgamma_sum += dy_f32 * x_hat_f32;
        dbeta_sum += dy_f32;
    }

    LayerNormBackwardResult result;
    result.dx = dx;
    result.dgamma = static_cast<bf16>(dgamma_sum);
    result.dbeta = static_cast<bf16>(dbeta_sum);

    return result;
}

// LayerNorm backward with bf16 internal precision
LayerNormBackwardResult layernorm_bw_bf16_bf16(const std::vector<bf16>& x,
                                               const std::vector<bf16>& dy,
                                               const std::vector<bf16>& gamma,
                                               const std::vector<bf16>& beta,
                                               bf16 mean,
                                               bf16 rstd) {
    assert(x.size() == dy.size() && dy.size() == gamma.size() && gamma.size() == beta.size());
    size_t N = x.size();

    // Compute normalized input (x_hat) = (x - mean) * rstd
    std::vector<bf16> x_hat;
    x_hat.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        bf16 x_minus_mean = x[i] - mean;
        x_hat.push_back(x_minus_mean * rstd);
    }

    // Compute the required sums
    bf16 dy_gamma_sum = dy_gamma_sum_bf16_bf16(dy, gamma);
    bf16 dy_gamma_xnorm_sum = dy_gamma_xnorm_sum_bf16_bf16(dy, gamma, x_hat);

    // Compute dx
    std::vector<bf16> dx = compute_dx_bf16_bf16(dy, gamma, x_hat, dy_gamma_sum, dy_gamma_xnorm_sum, rstd);

    // Compute dgamma and dbeta with bf16 accumulation
    bf16 dgamma_sum = static_cast<bf16>(0.0f);
    bf16 dbeta_sum = static_cast<bf16>(0.0f);
    for (size_t i = 0; i < N; ++i) {
        bf16 dy_x_hat = dy[i] * x_hat[i];
        dgamma_sum = dgamma_sum + dy_x_hat;
        dbeta_sum = dbeta_sum + dy[i];
    }

    LayerNormBackwardResult result;
    result.dx = dx;
    result.dgamma = dgamma_sum;
    result.dbeta = dbeta_sum;

    return result;
}

// ============================================================================
// Reference implementation (full fp32 precision)
// ============================================================================

struct LayerNormBackwardResultF32 {
    std::vector<f32> dx;
    f32 dgamma;
    f32 dbeta;
};

LayerNormBackwardResultF32 layernorm_bw_fp32(const std::vector<f32>& x,
                                             const std::vector<f32>& dy,
                                             const std::vector<f32>& gamma,
                                             const std::vector<f32>& beta,
                                             f32 mean,
                                             f32 rstd) {
    assert(x.size() == dy.size() && dy.size() == gamma.size() && gamma.size() == beta.size());
    size_t N = x.size();

    // Compute x_hat = (x - mean) * rstd
    std::vector<f32> x_hat;
    x_hat.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        x_hat.push_back((x[i] - mean) * rstd);
    }

    // Compute sums for dx calculation
    f32 dy_gamma_sum_val = dy_gamma_sum_fp32(dy, gamma);
    f32 dy_gamma_xnorm_sum_val = dy_gamma_xnorm_sum_fp32(dy, gamma, x_hat);

    // Compute dx
    std::vector<f32> dx;
    dx.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        f32 term1 = dy[i] * gamma[i];
        f32 term2 = dy_gamma_sum_val;
        f32 term3 = x_hat[i] * dy_gamma_xnorm_sum_val;
        dx.push_back(rstd * (term1 - term2 - term3));
    }

    // Compute dgamma and dbeta
    f32 dgamma_sum = 0.0f;
    f32 dbeta_sum = 0.0f;
    for (size_t i = 0; i < N; ++i) {
        dgamma_sum += dy[i] * x_hat[i];
        dbeta_sum += dy[i];
    }

    LayerNormBackwardResultF32 result;
    result.dx = dx;
    result.dgamma = dgamma_sum;
    result.dbeta = dbeta_sum;

    return result;
}

// ============================================================================
// Utility functions for testing
// ============================================================================

// Generate random LayerNorm inputs
struct LayerNormInputs {
    std::vector<bf16> x;
    std::vector<bf16> dy;
    std::vector<bf16> gamma;
    std::vector<bf16> beta;
    bf16 mean;
    bf16 rstd;
};

LayerNormInputs generate_random_layernorm_inputs(size_t N, RandomGenerator& rng) {
    LayerNormInputs inputs;

    // Generate random inputs
    inputs.x = generate_normal_data(N, rng);
    inputs.dy = generate_normal_data(N, rng);

    // Gamma and beta are typically learned parameters, often initialized around 1.0 and 0.0
    inputs.gamma.reserve(N);
    inputs.beta.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        inputs.gamma.push_back(static_cast<bf16>(static_cast<f32>(rng.normal_bf16()) * 0.1f + 1.0f));  // Small variation around 1.0
        inputs.beta.push_back(static_cast<bf16>(static_cast<f32>(rng.normal_bf16()) * 0.1f));           // Small variation around 0.0
    }

    // Generate mean and rstd (simplified - in practice these come from forward pass)
    inputs.mean = static_cast<bf16>(static_cast<f32>(rng.normal_bf16()) * 0.5f);  // Small mean
    inputs.rstd = static_cast<bf16>(1.0f + 0.1f * static_cast<f32>(rng.normal_bf16()));  // Around 1.0

    return inputs;
}

// Convert bf16 result to f32 for comparison
LayerNormBackwardResultF32 bf16_result_to_f32(const LayerNormBackwardResult& bf16_result) {
    LayerNormBackwardResultF32 f32_result;
    f32_result.dx = bf16_to_fp32(bf16_result.dx);
    f32_result.dgamma = static_cast<f32>(bf16_result.dgamma);
    f32_result.dbeta = static_cast<f32>(bf16_result.dbeta);
    return f32_result;
}