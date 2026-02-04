#pragma once

#include "bf16_simulation.hpp"

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
                                      bf16 rstd);

// Compute dx = rstd * (dy * gamma - dy_gamma_sum - x_hat * dy_gamma_xnorm_sum)
// With bf16 internal precision
std::vector<bf16> compute_dx_bf16_bf16(const std::vector<bf16>& dy,
                                      const std::vector<bf16>& gamma,
                                      const std::vector<bf16>& x_hat,
                                      bf16 dy_gamma_sum,
                                      bf16 dy_gamma_xnorm_sum,
                                      bf16 rstd);

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
                                               bf16 rstd);

// LayerNorm backward with bf16 internal precision
LayerNormBackwardResult layernorm_bw_bf16_bf16(const std::vector<bf16>& x,
                                               const std::vector<bf16>& dy,
                                               const std::vector<bf16>& gamma,
                                               const std::vector<bf16>& beta,
                                               bf16 mean,
                                               bf16 rstd);

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
                                             f32 rstd);

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

LayerNormInputs generate_random_layernorm_inputs(size_t N, RandomGenerator& rng);

// Convert bf16 result to f32 for comparison
LayerNormBackwardResultF32 bf16_result_to_f32(const LayerNormBackwardResult& bf16_result);