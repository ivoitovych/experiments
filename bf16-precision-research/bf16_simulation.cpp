#include "bf16_simulation.hpp"
#include <cassert>

// ============================================================================
// Random number generation utilities
// ============================================================================

RandomGenerator::RandomGenerator(uint64_t seed) : gen(seed), uniform_dist(-1.0, 1.0), normal_dist(0.0, 1.0) {}

bf16 RandomGenerator::uniform_bf16() {
    return static_cast<bf16>(uniform_dist(gen));
}

bf16 RandomGenerator::normal_bf16() {
    return static_cast<bf16>(normal_dist(gen));
}

bf16 RandomGenerator::constant_bf16(f64 value) {
    return static_cast<bf16>(value);
}

// ============================================================================
// Core bf16 simulation functions
// ============================================================================

bf16 reduce_sum_bf16_fp32(const std::vector<bf16>& data) {
    f32 sum = 0.0f;
    for (auto val : data) {
        sum += static_cast<f32>(val);
    }
    return static_cast<bf16>(sum);
}

bf16 reduce_sum_bf16_bf16(const std::vector<bf16>& data) {
    bf16 sum = static_cast<bf16>(0.0f);
    for (auto val : data) {
        sum = sum + val;
    }
    return sum;
}

// ============================================================================
// LayerNorm backward simulation functions
// ============================================================================

bf16 dy_gamma_sum_bf16_fp32(const std::vector<bf16>& dy, const std::vector<bf16>& gamma) {
    assert(dy.size() == gamma.size());
    size_t N = dy.size();

    f32 sum = 0.0f;
    for (size_t i = 0; i < N; ++i) {
        f32 dy_f32 = static_cast<f32>(dy[i]);
        f32 gamma_f32 = static_cast<f32>(gamma[i]);
        sum += dy_f32 * gamma_f32;
    }

    f32 result = sum / static_cast<f32>(N);
    return static_cast<bf16>(result);
}

bf16 dy_gamma_sum_bf16_bf16(const std::vector<bf16>& dy, const std::vector<bf16>& gamma) {
    assert(dy.size() == gamma.size());
    size_t N = dy.size();

    bf16 sum = static_cast<bf16>(0.0f);
    for (size_t i = 0; i < N; ++i) {
        bf16 product = dy[i] * gamma[i];
        sum = sum + product;
    }

    bf16 result = sum / static_cast<bf16>(N);
    return result;
}

bf16 dy_gamma_xnorm_sum_bf16_fp32(const std::vector<bf16>& dy,
                                  const std::vector<bf16>& gamma,
                                  const std::vector<bf16>& x_hat) {
    assert(dy.size() == gamma.size() && gamma.size() == x_hat.size());
    size_t N = dy.size();

    f32 sum = 0.0f;
    for (size_t i = 0; i < N; ++i) {
        f32 dy_f32 = static_cast<f32>(dy[i]);
        f32 gamma_f32 = static_cast<f32>(gamma[i]);
        f32 x_hat_f32 = static_cast<f32>(x_hat[i]);
        sum += dy_f32 * gamma_f32 * x_hat_f32;
    }

    f32 result = sum / static_cast<f32>(N);
    return static_cast<bf16>(result);
}

bf16 dy_gamma_xnorm_sum_bf16_bf16(const std::vector<bf16>& dy,
                                  const std::vector<bf16>& gamma,
                                  const std::vector<bf16>& x_hat) {
    assert(dy.size() == gamma.size() && gamma.size() == x_hat.size());
    size_t N = dy.size();

    bf16 sum = static_cast<bf16>(0.0f);
    for (size_t i = 0; i < N; ++i) {
        bf16 product = dy[i] * gamma[i] * x_hat[i];
        sum = sum + product;
    }

    bf16 result = sum / static_cast<bf16>(N);
    return result;
}

// ============================================================================
// Reference implementations (fp32 precision)
// ============================================================================

f32 dy_gamma_sum_fp32(const std::vector<f32>& dy, const std::vector<f32>& gamma) {
    assert(dy.size() == gamma.size());
    size_t N = dy.size();

    f32 sum = 0.0f;
    for (size_t i = 0; i < N; ++i) {
        sum += dy[i] * gamma[i];
    }

    return sum / static_cast<f32>(N);
}

f32 dy_gamma_xnorm_sum_fp32(const std::vector<f32>& dy,
                           const std::vector<f32>& gamma,
                           const std::vector<f32>& x_hat) {
    assert(dy.size() == gamma.size() && gamma.size() == x_hat.size());
    size_t N = dy.size();

    f32 sum = 0.0f;
    for (size_t i = 0; i < N; ++i) {
        sum += dy[i] * gamma[i] * x_hat[i];
    }

    return sum / static_cast<f32>(N);
}

// ============================================================================
// Utility functions
// ============================================================================

std::vector<f32> bf16_to_fp32(const std::vector<bf16>& input) {
    std::vector<f32> output;
    output.reserve(input.size());
    for (auto val : input) {
        output.push_back(static_cast<f32>(val));
    }
    return output;
}

std::vector<bf16> generate_constant_data(size_t N, f64 value) {
    std::vector<bf16> data;
    data.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        data.push_back(static_cast<bf16>(value));
    }
    return data;
}

std::vector<bf16> generate_uniform_data(size_t N, RandomGenerator& rng) {
    std::vector<bf16> data;
    data.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        data.push_back(rng.uniform_bf16());
    }
    return data;
}

std::vector<bf16> generate_normal_data(size_t N, RandomGenerator& rng) {
    std::vector<bf16> data;
    data.reserve(N);
    for (size_t i = 0; i < N; ++i) {
        data.push_back(rng.normal_bf16());
    }
    return data;
}

// ============================================================================
// Error analysis utilities
// ============================================================================

ErrorStats compute_error_stats(const std::vector<f32>& actual,
                              const std::vector<f32>& expected) {
    assert(actual.size() == expected.size());

    ErrorStats stats = {0.0, 0.0, 0.0, 0.0};
    f64 abs_error_sum = 0.0;
    f64 rel_error_sum = 0.0;

    for (size_t i = 0; i < actual.size(); ++i) {
        f64 act = actual[i];
        f64 exp = expected[i];
        f64 abs_err = std::abs(act - exp);
        f64 rel_err = (exp != 0.0) ? std::abs(abs_err / exp) : 0.0;

        stats.max_abs_error = std::max(stats.max_abs_error, abs_err);
        abs_error_sum += abs_err;

        if (rel_err > stats.max_rel_error) {
            stats.max_rel_error = rel_err;
        }
        rel_error_sum += rel_err;
    }

    size_t n = actual.size();
    stats.mean_abs_error = abs_error_sum / n;
    stats.mean_rel_error = rel_error_sum / n;

    return stats;
}

void print_error_stats(const std::string& label, const ErrorStats& stats) {
    std::cout << std::fixed << std::setprecision(6);
    std::cout << label << ":\n";
    std::cout << "  Max abs error: " << stats.max_abs_error << "\n";
    std::cout << "  Mean abs error: " << stats.mean_abs_error << "\n";
    std::cout << "  Max rel error: " << stats.max_rel_error << "\n";
    std::cout << "  Mean rel error: " << stats.mean_rel_error << "\n";
}