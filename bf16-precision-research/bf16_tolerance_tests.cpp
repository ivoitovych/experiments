#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>

// Include our implementations
#include "bf16_simulation.hpp"
#include "bf16_layernorm_bw.hpp"

// Type aliases
using bf16 = std::bfloat16_t;
using f32 = float;
using f64 = double;

// ============================================================================
// Experiment 1: Accumulation Error vs N
// ============================================================================

void experiment_1_accumulation_error() {
    std::cout << "\n=== Experiment 1: Accumulation Error vs N ===\n";

    std::vector<size_t> test_sizes = {32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 8462};
    RandomGenerator rng;

    std::cout << std::setw(8) << "N"
              << std::setw(12) << "Expected"
              << std::setw(15) << "FP32 Result"
              << std::setw(15) << "BF16 Result"
              << std::setw(15) << "FP32 AbsErr"
              << std::setw(15) << "BF16 AbsErr"
              << std::setw(15) << "FP32 RelErr"
              << std::setw(15) << "BF16 RelErr"
              << "\n";

    for (size_t N : test_sizes) {
        // Generate constant data (all 1.0)
        auto data = generate_constant_data(N, 1.0);
        f64 expected = static_cast<f64>(N);

        // Test both accumulation methods
        bf16 result_fp32 = reduce_sum_bf16_fp32(data);
        bf16 result_bf16 = reduce_sum_bf16_bf16(data);

        f64 result_fp32_f64 = static_cast<f64>(result_fp32);
        f64 result_bf16_f64 = static_cast<f64>(result_bf16);

        f64 abs_err_fp32 = std::abs(result_fp32_f64 - expected);
        f64 abs_err_bf16 = std::abs(result_bf16_f64 - expected);
        f64 rel_err_fp32 = abs_err_fp32 / expected;
        f64 rel_err_bf16 = abs_err_bf16 / expected;

        std::cout << std::fixed << std::setprecision(6)
                  << std::setw(8) << N
                  << std::setw(12) << expected
                  << std::setw(15) << result_fp32_f64
                  << std::setw(15) << result_bf16_f64
                  << std::setw(15) << abs_err_fp32
                  << std::setw(15) << abs_err_bf16
                  << std::setw(15) << rel_err_fp32
                  << std::setw(15) << rel_err_bf16
                  << "\n";
    }
}

// ============================================================================
// Experiment 2: dy_gamma_sum Error Analysis
// ============================================================================

void experiment_2_dy_gamma_sum_error() {
    std::cout << "\n=== Experiment 2: dy_gamma_sum Error Analysis ===\n";

    std::vector<size_t> test_sizes = {2048, 4096, 8192, 8462};
    std::vector<std::string> input_types = {"constant(1.0)", "uniform(-1,1)", "normal(0,1)"};
    RandomGenerator rng;

    std::cout << std::setw(8) << "N"
              << std::setw(15) << "Input Type"
              << std::setw(15) << "FP32 Result"
              << std::setw(15) << "BF16 Result"
              << std::setw(15) << "Reference"
              << std::setw(15) << "FP32 AbsErr"
              << std::setw(15) << "BF16 AbsErr"
              << std::setw(15) << "FP32 RelErr"
              << std::setw(15) << "BF16 RelErr"
              << "\n";

    for (size_t N : test_sizes) {
        for (const auto& input_type : input_types) {
            std::vector<bf16> dy, gamma;

            if (input_type == "constant(1.0)") {
                dy = generate_constant_data(N, 1.0);
                gamma = generate_constant_data(N, 1.0);
            } else if (input_type == "uniform(-1,1)") {
                dy = generate_uniform_data(N, rng);
                gamma = generate_constant_data(N, 1.0);
            } else if (input_type == "normal(0,1)") {
                dy = generate_normal_data(N, rng);
                gamma = generate_constant_data(N, 1.0);
            }

            // Compute results
            bf16 result_fp32_acc = dy_gamma_sum_bf16_fp32(dy, gamma);
            bf16 result_bf16_acc = dy_gamma_sum_bf16_bf16(dy, gamma);

            // Reference (convert to fp32 and compute)
            auto dy_f32 = bf16_to_fp32(dy);
            auto gamma_f32 = bf16_to_fp32(gamma);
            f32 reference = dy_gamma_sum_fp32(dy_f32, gamma_f32);

            // Compute errors
            f64 result_fp32_f64 = static_cast<f64>(result_fp32_acc);
            f64 result_bf16_f64 = static_cast<f64>(result_bf16_acc);
            f64 ref_f64 = static_cast<f64>(reference);

            f64 abs_err_fp32 = std::abs(result_fp32_f64 - ref_f64);
            f64 abs_err_bf16 = std::abs(result_bf16_f64 - ref_f64);
            f64 rel_err_fp32 = (ref_f64 != 0.0) ? abs_err_fp32 / std::abs(ref_f64) : 0.0;
            f64 rel_err_bf16 = (ref_f64 != 0.0) ? abs_err_bf16 / std::abs(ref_f64) : 0.0;

            std::cout << std::fixed << std::setprecision(6)
                      << std::setw(8) << N
                      << std::setw(15) << input_type
                      << std::setw(15) << result_fp32_f64
                      << std::setw(15) << result_bf16_f64
                      << std::setw(15) << ref_f64
                      << std::setw(15) << abs_err_fp32
                      << std::setw(15) << abs_err_bf16
                      << std::setw(15) << rel_err_fp32
                      << std::setw(15) << rel_err_bf16
                      << "\n";
        }
    }
}

// ============================================================================
// Experiment 3: Full LayerNorm Backward Error
// ============================================================================

void experiment_3_full_layernorm_error() {
    std::cout << "\n=== Experiment 3: Full LayerNorm Backward Error ===\n";

    std::vector<size_t> test_sizes = {2048, 4096, 8192, 8462};
    std::vector<size_t> batch_sizes = {1, 10, 100};
    RandomGenerator rng(12345);  // Fixed seed for reproducible results

    std::cout << std::setw(8) << "N"
              << std::setw(8) << "Batch"
              << std::setw(12) << "Output"
              << std::setw(15) << "FP32 MaxErr"
              << std::setw(15) << "BF16 MaxErr"
              << std::setw(15) << "FP32 MeanErr"
              << std::setw(15) << "BF16 MeanErr"
              << "\n";

    for (size_t N : test_sizes) {
        for (size_t batch : batch_sizes) {
            // We'll simulate multiple samples for statistical significance
            const size_t num_samples = 10;
            std::vector<f64> fp32_dx_max_errors, bf16_dx_max_errors;
            std::vector<f64> fp32_dgamma_max_errors, bf16_dgamma_max_errors;
            std::vector<f64> fp32_dbeta_max_errors, bf16_dbeta_max_errors;

            std::vector<f64> fp32_dx_mean_errors, bf16_dx_mean_errors;
            std::vector<f64> fp32_dgamma_mean_errors, bf16_dgamma_mean_errors;
            std::vector<f64> fp32_dbeta_mean_errors, bf16_dbeta_mean_errors;

            for (size_t sample = 0; sample < num_samples; ++sample) {
                // Generate random inputs
                auto inputs = generate_random_layernorm_inputs(batch, N, rng);

                // Compute reference (full fp32) and bf16 variants
                auto ref_result = layernorm_bw_fp32(inputs);
                auto fp32_acc_result = layernorm_bw_bf16_fp32(inputs);
                auto bf16_acc_result = layernorm_bw_bf16_bf16(inputs);

                // Convert bf16 outputs to f32 for comparison
                auto fp32_acc_f32 = bf16_result_to_f32(fp32_acc_result);
                auto bf16_acc_f32 = bf16_result_to_f32(bf16_acc_result);

                // dx errors
                auto dx_errors_fp32 = compute_error_stats(fp32_acc_f32.dx, ref_result.dx);
                auto dx_errors_bf16 = compute_error_stats(bf16_acc_f32.dx, ref_result.dx);
                fp32_dx_max_errors.push_back(dx_errors_fp32.max_abs_error);
                bf16_dx_max_errors.push_back(dx_errors_bf16.max_abs_error);
                fp32_dx_mean_errors.push_back(dx_errors_fp32.mean_abs_error);
                bf16_dx_mean_errors.push_back(dx_errors_bf16.mean_abs_error);

                // dgamma errors (vector)
                auto dgamma_errors_fp32 = compute_error_stats(fp32_acc_f32.dgamma, ref_result.dgamma);
                auto dgamma_errors_bf16 = compute_error_stats(bf16_acc_f32.dgamma, ref_result.dgamma);
                fp32_dgamma_max_errors.push_back(dgamma_errors_fp32.max_abs_error);
                bf16_dgamma_max_errors.push_back(dgamma_errors_bf16.max_abs_error);
                fp32_dgamma_mean_errors.push_back(dgamma_errors_fp32.mean_abs_error);
                bf16_dgamma_mean_errors.push_back(dgamma_errors_bf16.mean_abs_error);

                // dbeta errors (vector)
                auto dbeta_errors_fp32 = compute_error_stats(fp32_acc_f32.dbeta, ref_result.dbeta);
                auto dbeta_errors_bf16 = compute_error_stats(bf16_acc_f32.dbeta, ref_result.dbeta);
                fp32_dbeta_max_errors.push_back(dbeta_errors_fp32.max_abs_error);
                bf16_dbeta_max_errors.push_back(dbeta_errors_bf16.max_abs_error);
                fp32_dbeta_mean_errors.push_back(dbeta_errors_fp32.mean_abs_error);
                bf16_dbeta_mean_errors.push_back(dbeta_errors_bf16.mean_abs_error);
            }

            auto compute_stats = [](const std::vector<f64>& xs) {
                f64 max_v = *std::max_element(xs.begin(), xs.end());
                f64 mean_v = 0.0;
                for (auto v : xs) mean_v += v;
                mean_v /= xs.size();
                return std::make_pair(max_v, mean_v);
            };

            auto [fp32_dx_max, fp32_dx_max_mean] = compute_stats(fp32_dx_max_errors);
            auto [bf16_dx_max, bf16_dx_max_mean] = compute_stats(bf16_dx_max_errors);
            auto [fp32_dx_mean_max, fp32_dx_mean_mean] = compute_stats(fp32_dx_mean_errors);
            auto [bf16_dx_mean_max, bf16_dx_mean_mean] = compute_stats(bf16_dx_mean_errors);

            auto [fp32_dgamma_max, fp32_dgamma_max_mean] = compute_stats(fp32_dgamma_max_errors);
            auto [bf16_dgamma_max, bf16_dgamma_max_mean] = compute_stats(bf16_dgamma_max_errors);
            auto [fp32_dgamma_mean_max, fp32_dgamma_mean_mean] = compute_stats(fp32_dgamma_mean_errors);
            auto [bf16_dgamma_mean_max, bf16_dgamma_mean_mean] = compute_stats(bf16_dgamma_mean_errors);

            auto [fp32_dbeta_max, fp32_dbeta_max_mean] = compute_stats(fp32_dbeta_max_errors);
            auto [bf16_dbeta_max, bf16_dbeta_max_mean] = compute_stats(bf16_dbeta_max_errors);
            auto [fp32_dbeta_mean_max, fp32_dbeta_mean_mean] = compute_stats(fp32_dbeta_mean_errors);
            auto [bf16_dbeta_mean_max, bf16_dbeta_mean_mean] = compute_stats(bf16_dbeta_mean_errors);

            // Print results for dx
            std::cout << std::fixed << std::setprecision(6)
                      << std::setw(8) << N
                      << std::setw(8) << batch
                      << std::setw(12) << "dx"
                      << std::setw(15) << fp32_dx_max
                      << std::setw(15) << bf16_dx_max
                      << std::setw(15) << fp32_dx_mean_mean
                      << std::setw(15) << bf16_dx_mean_mean
                      << "\n";

            // Print results for dgamma
            std::cout << std::fixed << std::setprecision(6)
                      << std::setw(8) << N
                      << std::setw(8) << batch
                      << std::setw(12) << "dgamma"
                      << std::setw(15) << fp32_dgamma_max
                      << std::setw(15) << bf16_dgamma_max
                      << std::setw(15) << fp32_dgamma_mean_mean
                      << std::setw(15) << bf16_dgamma_mean_mean
                      << "\n";

            // Print results for dbeta
            std::cout << std::fixed << std::setprecision(6)
                      << std::setw(8) << N
                      << std::setw(8) << batch
                      << std::setw(12) << "dbeta"
                      << std::setw(15) << fp32_dbeta_max
                      << std::setw(15) << bf16_dbeta_max
                      << std::setw(15) << fp32_dbeta_mean_mean
                      << std::setw(15) << bf16_dbeta_mean_mean
                      << "\n";
        }
    }
}

// ============================================================================
// Experiment 4: Tile-Aligned vs Non-Aligned
// ============================================================================

void experiment_4_tile_alignment() {
    std::cout << "\n=== Experiment 4: Tile-Aligned vs Non-Aligned ===\n";

    // Test sizes: tile_size = 32
    // 8192 = 256 tiles (perfectly aligned)
    // 8160 = 255 tiles (255 * 32 = 8160)
    // 8190 = 255 tiles + 30 elements (255 * 32 + 30 = 8190)
    // 8462 = 264 tiles + 14 elements (264 * 32 + 14 = 8462)
    std::vector<size_t> test_sizes = {8192, 8160, 8190, 8462};
    RandomGenerator rng(54321);  // Different seed for variety

    std::cout << std::setw(8) << "N"
              << std::setw(12) << "Tiles"
              << std::setw(12) << "Remainder"
              << std::setw(15) << "FP32 MaxErr"
              << std::setw(15) << "BF16 MaxErr"
              << std::setw(15) << "FP32 MeanErr"
              << std::setw(15) << "BF16 MeanErr"
              << "\n";

    for (size_t N : test_sizes) {
        const size_t tile_size = 32;
        size_t num_tiles = N / tile_size;
        size_t remainder = N % tile_size;

        // Run multiple samples for statistical significance
        const size_t num_samples = 20;
        std::vector<f64> bf16_errors;

        for (size_t sample = 0; sample < num_samples; ++sample) {
            // Generate random LayerNorm inputs
            // Use a small batch; alignment effects should show up per-row.
            const size_t batch = 10;
            auto inputs = generate_random_layernorm_inputs(batch, N, rng);

            auto ref_result = layernorm_bw_fp32(inputs);
            auto bf16_acc_result = layernorm_bw_bf16_bf16(inputs);
            auto bf16_acc_f32 = bf16_result_to_f32(bf16_acc_result);

            const auto dx_errors_bf16 = compute_error_stats(bf16_acc_f32.dx, ref_result.dx);
            f64 max_error = dx_errors_bf16.max_abs_error;

            bf16_errors.push_back(max_error);
        }

        // Compute statistics
        f64 max_err = *std::max_element(bf16_errors.begin(), bf16_errors.end());
        f64 mean_err = 0.0;
        for (auto e : bf16_errors) mean_err += e;
        mean_err /= bf16_errors.size();

        std::cout << std::fixed << std::setprecision(6)
                  << std::setw(8) << N
                  << std::setw(12) << num_tiles
                  << std::setw(12) << remainder
                  << std::setw(15) << "N/A"  // FP32 internal not tested here
                  << std::setw(15) << max_err
                  << std::setw(15) << "N/A"  // FP32 internal not tested here
                  << std::setw(15) << mean_err
                  << "\n";
    }
}

// ============================================================================
// Main function to run all experiments
// ============================================================================

int main() {
    std::cout << "BFloat16 Precision Simulation for LayerNorm Backward Tolerances\n";
    std::cout << "=============================================================\n";

    // Run all experiments
    experiment_1_accumulation_error();
    experiment_2_dy_gamma_sum_error();
    experiment_3_full_layernorm_error();
    experiment_4_tile_alignment();

    std::cout << "\nExperiments completed.\n";

    return 0;
}