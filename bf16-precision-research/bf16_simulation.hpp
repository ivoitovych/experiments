#pragma once

#include <stdfloat>
#include <vector>
#include <random>
#include <iostream>
#include <iomanip>
#include <cmath>

// Type aliases for clarity
using bf16 = std::bfloat16_t;
using f32 = float;
using f64 = double;

// ============================================================================
// Random number generation utilities
// ============================================================================

class RandomGenerator {
private:
    std::mt19937_64 gen;
    std::uniform_real_distribution<f64> uniform_dist;
    std::normal_distribution<f64> normal_dist;

public:
    RandomGenerator(uint64_t seed = 42);

    // Generate uniform random bf16 in [-1, 1]
    bf16 uniform_bf16();

    // Generate normal random bf16 with mean 0, std 1
    bf16 normal_bf16();

    // Generate constant bf16 value
    bf16 constant_bf16(f64 value);
};

// ============================================================================
// Core bf16 simulation functions
// ============================================================================

// Reduce sum with fp32 accumulator (simulates device with fp32 accumulators)
bf16 reduce_sum_bf16_fp32(const std::vector<bf16>& data);

// Reduce sum with bf16 accumulator (simulates pure bf16 pipeline)
bf16 reduce_sum_bf16_bf16(const std::vector<bf16>& data);

// ============================================================================
// LayerNorm backward simulation functions
// ============================================================================

// dy_gamma_sum: (1/N) * sum_i(dy[row, i] * gamma[i])
// With fp32 accumulator
bf16 dy_gamma_sum_bf16_fp32(const std::vector<bf16>& dy, const std::vector<bf16>& gamma);

// dy_gamma_sum: (1/N) * sum_i(dy[row, i] * gamma[i])
// With bf16 accumulator
bf16 dy_gamma_sum_bf16_bf16(const std::vector<bf16>& dy, const std::vector<bf16>& gamma);

// dy_gamma_xnorm_sum: (1/N) * sum_i(dy[row, i] * gamma[i] * x_hat[row, i])
// With fp32 accumulator
bf16 dy_gamma_xnorm_sum_bf16_fp32(const std::vector<bf16>& dy,
                                  const std::vector<bf16>& gamma,
                                  const std::vector<bf16>& x_hat);

// dy_gamma_xnorm_sum: (1/N) * sum_i(dy[row, i] * gamma[i] * x_hat[row, i])
// With bf16 accumulator
bf16 dy_gamma_xnorm_sum_bf16_bf16(const std::vector<bf16>& dy,
                                  const std::vector<bf16>& gamma,
                                  const std::vector<bf16>& x_hat);

// ============================================================================
// Reference implementations (fp32 precision)
// ============================================================================

f32 dy_gamma_sum_fp32(const std::vector<f32>& dy, const std::vector<f32>& gamma);

f32 dy_gamma_xnorm_sum_fp32(const std::vector<f32>& dy,
                           const std::vector<f32>& gamma,
                           const std::vector<f32>& x_hat);

// ============================================================================
// Utility functions
// ============================================================================

// Convert vector of bf16 to fp32
std::vector<f32> bf16_to_fp32(const std::vector<bf16>& input);

// Generate test data
std::vector<bf16> generate_constant_data(size_t N, f64 value);
std::vector<bf16> generate_uniform_data(size_t N, RandomGenerator& rng);
std::vector<bf16> generate_normal_data(size_t N, RandomGenerator& rng);

// ============================================================================
// Error analysis utilities
// ============================================================================

struct ErrorStats {
    f64 max_abs_error;
    f64 mean_abs_error;
    f64 max_rel_error;
    f64 mean_rel_error;
};

ErrorStats compute_error_stats(const std::vector<f32>& actual,
                              const std::vector<f32>& expected);

void print_error_stats(const std::string& label, const ErrorStats& stats);