#pragma once

#include "bf16_simulation.hpp"

// ============================================================================
// LayerNorm backward computation functions
// ============================================================================

// This simulation models a batched LayerNorm backward pass where:
// - x, dy are shaped [batch, features] (flattened row-major)
// - gamma, beta are shaped [features]
// - mean, rstd are shaped [batch]

struct LayerNormBackwardResult {
    size_t batch = 0;
    size_t features = 0;

    // dx is [batch, features] flattened row-major
    std::vector<bf16> dx;

    // dgamma/dbeta are [features]
    std::vector<bf16> dgamma;
    std::vector<bf16> dbeta;
};

// ============================================================================
// Reference implementation (full fp32 precision)
// ============================================================================

struct LayerNormBackwardResultF32 {
    size_t batch = 0;
    size_t features = 0;

    // dx is [batch, features] flattened row-major
    std::vector<f32> dx;

    // dgamma/dbeta are [features]
    std::vector<f32> dgamma;
    std::vector<f32> dbeta;
};

// ============================================================================
// Utility functions for testing
// ============================================================================

struct LayerNormInputs {
    size_t batch = 0;
    size_t features = 0;

    // [batch, features] flattened row-major
    std::vector<bf16> x;
    std::vector<bf16> dy;

    // [features]
    std::vector<bf16> gamma;
    std::vector<bf16> beta;

    // [batch]
    std::vector<bf16> mean;
    std::vector<bf16> rstd;
};

LayerNormInputs generate_random_layernorm_inputs(size_t batch, size_t features, RandomGenerator& rng);

LayerNormBackwardResultF32 bf16_result_to_f32(const LayerNormBackwardResult& bf16_result);

// ============================================================================
// Complete LayerNorm backward pass (batched)
// ============================================================================

// Simulates bf16 inputs/outputs with fp32 internal accumulation.
LayerNormBackwardResult layernorm_bw_bf16_fp32(const LayerNormInputs& inputs);

// Simulates pure bf16 pipeline (bf16 internal accumulation).
LayerNormBackwardResult layernorm_bw_bf16_bf16(const LayerNormInputs& inputs);

// Full fp32 reference.
LayerNormBackwardResultF32 layernorm_bw_fp32(const LayerNormInputs& inputs);