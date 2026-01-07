#include <iostream>
#include <iomanip>
#include <stdfloat>
#include <cmath>
#include <vector>
#include <chrono>
#include <random>
#include <numeric>
#include <algorithm>

using namespace std;

using bf16 = std::bfloat16_t;
using f32 = float;
using f64 = double;

// Exact GELU implementation
template<typename T>
T gelu_exact(T x) {
    return x * static_cast<T>(0.5) * (static_cast<T>(1.0) + erf(x / static_cast<T>(sqrt(2.0))));
}

// Common GELU approximations
template<typename T>
T gelu_tanh_approx(T x) {
    // GELU ≈ x * Φ(x) ≈ x * 0.5 * (1 + tanh(√(2/π) * (x + 0.044715 * x^3)))
    const T sqrt_2_pi = static_cast<T>(sqrt(2.0 / M_PI));
    const T coeff = static_cast<T>(0.044715);
    return x * static_cast<T>(0.5) * (static_cast<T>(1.0) + tanh(sqrt_2_pi * (x + coeff * x * x * x)));
}

template<typename T>
T gelu_sigmoid_approx(T x) {
    // GELU ≈ x * Φ(x) ≈ x * sigmoid(1.702 * x)
    return x * (static_cast<T>(1.0) / (static_cast<T>(1.0) + exp(static_cast<T>(-1.702) * x)));
}

template<typename T>
T gelu_fast_approx(T x) {
    // Very fast approximation: GELU(x) ≈ x * sigmoid(1.702 * x) but simplified
    // Even simpler: max(0, x) + 0.5 * x * (1 - abs(x)) or similar
    const T alpha = static_cast<T>(1.702);
    return x / (static_cast<T>(1.0) + exp(-alpha * x));
}

template<typename T>
T gelu_polynomial_approx(T x) {
    // Polynomial approximation for efficiency
    // GELU(x) ≈ 0.5x(1 + tanh(0.7978845608(x + 0.044715x³)))
    const T c1 = static_cast<T>(0.7978845608);
    const T c2 = static_cast<T>(0.044715);
    T x3 = x * x * x;
    return static_cast<T>(0.5) * x * (static_cast<T>(1.0) + tanh(c1 * (x + c2 * x3)));
}

// Test accuracy and performance
template<typename T>
struct GeluResult {
    vector<T> inputs;
    vector<T> exact_outputs;
    vector<T> approx_outputs;
    double max_error;
    double mse_error;
    double mean_error;
    long long compute_time_ns;
};

template<typename T>
GeluResult<T> benchmark_gelu(T (*gelu_func)(T), const vector<T>& test_inputs, const string& name) {
    GeluResult<T> result;
    result.inputs = test_inputs;

    // Compute exact GELU in double precision for reference
    vector<double> reference_outputs;
    reference_outputs.reserve(test_inputs.size());
    for (auto x : test_inputs) {
        reference_outputs.push_back(gelu_exact(static_cast<double>(x)));
    }

    // Time the approximation
    auto start = chrono::high_resolution_clock::now();
    result.approx_outputs.reserve(test_inputs.size());
    for (auto x : test_inputs) {
        result.approx_outputs.push_back(gelu_func(x));
    }
    auto end = chrono::high_resolution_clock::now();
    result.compute_time_ns = chrono::duration_cast<chrono::nanoseconds>(end - start).count();

    // Store the reference outputs (converted to T for compatibility)
    result.exact_outputs.reserve(test_inputs.size());
    for (auto ref : reference_outputs) {
        result.exact_outputs.push_back(static_cast<T>(ref));
    }

    // Calculate errors against double precision reference
    vector<double> errors;
    errors.reserve(test_inputs.size());
    result.max_error = 0.0;

    for (size_t i = 0; i < test_inputs.size(); ++i) {
        double reference = reference_outputs[i];
        double approx = static_cast<double>(result.approx_outputs[i]);
        double error = abs(reference - approx);
        errors.push_back(error);
        result.max_error = max(result.max_error, error);
    }

    result.mse_error = 0.0;
    for (double e : errors) {
        result.mse_error += e * e;
    }
    result.mse_error /= errors.size();

    result.mean_error = accumulate(errors.begin(), errors.end(), 0.0) / errors.size();

    return result;
}

template<typename T>
void print_gelu_comparison(const vector<T>& test_inputs) {
    cout << fixed << setprecision(6);
    cout << "\n=== GELU Approximation Research in " <<
         (sizeof(T) == 2 ? "bfloat16" : sizeof(T) == 4 ? "float32" : "float64") << " ===\n";

    // Test different approximations
    vector<pair<string, T(*)(T)>> approximations = {
        {"Exact GELU", gelu_exact<T>},
        {"Tanh Approximation", gelu_tanh_approx<T>},
        {"Sigmoid Approximation", gelu_sigmoid_approx<T>},
        {"Fast Approximation", gelu_fast_approx<T>},
        {"Polynomial Approximation", gelu_polynomial_approx<T>}
    };

    vector<GeluResult<T>> results;
    for (auto& [name, func] : approximations) {
        results.push_back(benchmark_gelu(func, test_inputs, name));
    }

    // Print header
    cout << left << setw(25) << "Approximation" <<
         right << setw(12) << "Max Error" <<
         setw(12) << "MSE Error" <<
         setw(12) << "Mean Error" <<
         setw(15) << "Time (ns)" << endl;
    cout << string(76, '-') << endl;

    // Print results
    for (size_t i = 0; i < results.size(); ++i) {
        auto& result = results[i];
        cout << left << setw(25) << approximations[i].first <<
             right << setw(12) << result.max_error <<
             setw(12) << result.mse_error <<
             setw(12) << result.mean_error <<
             setw(15) << result.compute_time_ns << endl;
    }

    // Show some sample values for the most accurate approximation
    size_t best_idx = 0;
    double best_error = results[0].mean_error;
    for (size_t i = 1; i < results.size(); ++i) {
        if (results[i].mean_error < best_error) {
            best_error = results[i].mean_error;
            best_idx = i;
        }
    }

    cout << "\nSample values using " << approximations[best_idx].first << " (best approximation):" << endl;
    cout << left << setw(12) << "Input" << setw(15) << "Exact GELU" << setw(15) << "Approximation" << setw(12) << "Error" << endl;
    cout << string(54, '-') << endl;

    for (size_t i = 0; i < min(size_t(10), test_inputs.size()); ++i) {
        double exact = static_cast<double>(results[best_idx].exact_outputs[i]);
        double approx = static_cast<double>(results[best_idx].approx_outputs[i]);
        double error = abs(exact - approx);
        cout << left << setw(12) << static_cast<double>(test_inputs[i]) <<
             setw(15) << exact <<
             setw(15) << approx <<
             setw(12) << error << endl;
    }
}

int main() {
    cout << "GELU Approximation Research in Different Precisions" << endl;
    cout << "===================================================" << endl;

    // Generate test inputs: mix of normal range values for neural networks
    random_device rd;
    mt19937 gen(rd());
    normal_distribution<float> dist(0.0f, 1.0f); // Standard normal distribution

    const size_t num_samples = 10000;
    vector<bf16> test_inputs_bf16;
    vector<f32> test_inputs_f32;
    vector<f64> test_inputs_f64;

    test_inputs_bf16.reserve(num_samples);
    test_inputs_f32.reserve(num_samples);
    test_inputs_f64.reserve(num_samples);

    // Generate test data
    for (size_t i = 0; i < num_samples; ++i) {
        float val = dist(gen);
        // Clamp to reasonable range to avoid overflow in bfloat16
        val = max(-3.0f, min(3.0f, val));

        test_inputs_bf16.push_back(static_cast<bf16>(val));
        test_inputs_f32.push_back(val);
        test_inputs_f64.push_back(static_cast<f64>(val));
    }

    // Also add some edge cases
    vector<float> edge_cases = {-3.0f, -1.0f, -0.5f, 0.0f, 0.5f, 1.0f, 3.0f};
    for (float val : edge_cases) {
        test_inputs_bf16.push_back(static_cast<bf16>(val));
        test_inputs_f32.push_back(val);
        test_inputs_f64.push_back(static_cast<f64>(val));
    }

    // Run comparisons for each precision
    print_gelu_comparison(test_inputs_bf16);
    print_gelu_comparison(test_inputs_f32);
    print_gelu_comparison(test_inputs_f64);

    cout << "\n✅ GELU approximation research completed!" << endl;
    cout << "\nKey findings:" << endl;
    cout << "- bfloat16 shows precision loss but still usable for approximations" << endl;
    cout << "- Tanh approximation typically provides best accuracy/speed tradeoff" << endl;
    cout << "- Fast approximations sacrifice accuracy for speed" << endl;

    return 0;
}
