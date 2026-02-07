#include "bf16_layernorm_bw.hpp"

#include <cassert>

namespace {
inline size_t idx(size_t row, size_t col, size_t features) {
    return row * features + col;
}
}  // namespace

LayerNormInputs generate_random_layernorm_inputs(size_t batch, size_t features, RandomGenerator& rng) {
    LayerNormInputs inputs;
    inputs.batch = batch;
    inputs.features = features;

    inputs.x = generate_normal_data(batch * features, rng);
    inputs.dy = generate_normal_data(batch * features, rng);

    // gamma/beta are per-feature parameters
    inputs.gamma.reserve(features);
    inputs.beta.reserve(features);
    for (size_t i = 0; i < features; ++i) {
        inputs.gamma.push_back(static_cast<bf16>(static_cast<f32>(rng.normal_bf16()) * 0.1f + 1.0f));
        inputs.beta.push_back(static_cast<bf16>(static_cast<f32>(rng.normal_bf16()) * 0.1f));
    }

    // mean/rstd are per-row scalars
    inputs.mean.reserve(batch);
    inputs.rstd.reserve(batch);
    for (size_t r = 0; r < batch; ++r) {
        inputs.mean.push_back(static_cast<bf16>(static_cast<f32>(rng.normal_bf16()) * 0.5f));
        inputs.rstd.push_back(static_cast<bf16>(1.0f + 0.1f * static_cast<f32>(rng.normal_bf16())));
    }

    return inputs;
}

LayerNormBackwardResultF32 bf16_result_to_f32(const LayerNormBackwardResult& bf16_result) {
    LayerNormBackwardResultF32 out;
    out.batch = bf16_result.batch;
    out.features = bf16_result.features;
    out.dx = bf16_to_fp32(bf16_result.dx);
    out.dgamma = bf16_to_fp32(bf16_result.dgamma);
    out.dbeta = bf16_to_fp32(bf16_result.dbeta);
    return out;
}

LayerNormBackwardResultF32 layernorm_bw_fp32(const LayerNormInputs& inputs) {
    const size_t B = inputs.batch;
    const size_t N = inputs.features;
    assert(inputs.x.size() == B * N);
    assert(inputs.dy.size() == B * N);
    assert(inputs.gamma.size() == N);
    assert(inputs.beta.size() == N);
    assert(inputs.mean.size() == B);
    assert(inputs.rstd.size() == B);

    LayerNormBackwardResultF32 out;
    out.batch = B;
    out.features = N;
    out.dx.assign(B * N, 0.0f);
    out.dgamma.assign(N, 0.0f);
    out.dbeta.assign(N, 0.0f);

    // Precompute x_hat in fp32
    std::vector<f32> x_hat(B * N, 0.0f);
    for (size_t r = 0; r < B; ++r) {
        const f32 mean = static_cast<f32>(inputs.mean[r]);
        const f32 rstd = static_cast<f32>(inputs.rstd[r]);
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            x_hat[k] = (static_cast<f32>(inputs.x[k]) - mean) * rstd;
        }
    }

    // Per-row reductions and dx
    for (size_t r = 0; r < B; ++r) {
        f32 sum1 = 0.0f;
        f32 sum2 = 0.0f;
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const f32 dy = static_cast<f32>(inputs.dy[k]);
            const f32 gamma = static_cast<f32>(inputs.gamma[c]);
            sum1 += dy * gamma;
            sum2 += dy * gamma * x_hat[k];
        }
        const f32 dy_gamma_sum = sum1 / static_cast<f32>(N);
        const f32 dy_gamma_xnorm_sum = sum2 / static_cast<f32>(N);

        const f32 rstd = static_cast<f32>(inputs.rstd[r]);
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const f32 dy = static_cast<f32>(inputs.dy[k]);
            const f32 gamma = static_cast<f32>(inputs.gamma[c]);
            out.dx[k] = rstd * ((dy * gamma) - dy_gamma_sum - (x_hat[k] * dy_gamma_xnorm_sum));
        }

        // Accumulate parameter grads (per feature)
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const f32 dy = static_cast<f32>(inputs.dy[k]);
            out.dgamma[c] += dy * x_hat[k];
            out.dbeta[c] += dy;
        }
    }

    return out;
}

LayerNormBackwardResult layernorm_bw_bf16_fp32(const LayerNormInputs& inputs) {
    const size_t B = inputs.batch;
    const size_t N = inputs.features;
    assert(inputs.x.size() == B * N);
    assert(inputs.dy.size() == B * N);
    assert(inputs.gamma.size() == N);
    assert(inputs.beta.size() == N);
    assert(inputs.mean.size() == B);
    assert(inputs.rstd.size() == B);

    LayerNormBackwardResult out;
    out.batch = B;
    out.features = N;
    out.dx.assign(B * N, static_cast<bf16>(0.0f));
    out.dgamma.assign(N, static_cast<bf16>(0.0f));
    out.dbeta.assign(N, static_cast<bf16>(0.0f));

    // Compute x_hat in fp32 (internal)
    std::vector<f32> x_hat(B * N, 0.0f);
    for (size_t r = 0; r < B; ++r) {
        const f32 mean = static_cast<f32>(inputs.mean[r]);
        const f32 rstd = static_cast<f32>(inputs.rstd[r]);
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            x_hat[k] = (static_cast<f32>(inputs.x[k]) - mean) * rstd;
        }
    }

    // Parameter grads in fp32 (internal)
    std::vector<f32> dgamma_f32(N, 0.0f);
    std::vector<f32> dbeta_f32(N, 0.0f);

    for (size_t r = 0; r < B; ++r) {
        f32 sum1 = 0.0f;
        f32 sum2 = 0.0f;
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const f32 dy = static_cast<f32>(inputs.dy[k]);
            const f32 gamma = static_cast<f32>(inputs.gamma[c]);
            sum1 += dy * gamma;
            sum2 += dy * gamma * x_hat[k];
        }

        const bf16 dy_gamma_sum_bf16 = static_cast<bf16>(sum1 / static_cast<f32>(N));
        const bf16 dy_gamma_xnorm_sum_bf16 = static_cast<bf16>(sum2 / static_cast<f32>(N));

        const f32 dy_gamma_sum = static_cast<f32>(dy_gamma_sum_bf16);
        const f32 dy_gamma_xnorm_sum = static_cast<f32>(dy_gamma_xnorm_sum_bf16);
        const f32 rstd = static_cast<f32>(inputs.rstd[r]);

        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const f32 dy = static_cast<f32>(inputs.dy[k]);
            const f32 gamma = static_cast<f32>(inputs.gamma[c]);
            const f32 dx = rstd * ((dy * gamma) - dy_gamma_sum - (x_hat[k] * dy_gamma_xnorm_sum));
            out.dx[k] = static_cast<bf16>(dx);
        }

        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const f32 dy = static_cast<f32>(inputs.dy[k]);
            dgamma_f32[c] += dy * x_hat[k];
            dbeta_f32[c] += dy;
        }
    }

    // Quantize parameter grads to bf16 outputs
    for (size_t c = 0; c < N; ++c) {
        out.dgamma[c] = static_cast<bf16>(dgamma_f32[c]);
        out.dbeta[c] = static_cast<bf16>(dbeta_f32[c]);
    }

    return out;
}

LayerNormBackwardResult layernorm_bw_bf16_bf16(const LayerNormInputs& inputs) {
    const size_t B = inputs.batch;
    const size_t N = inputs.features;
    assert(inputs.x.size() == B * N);
    assert(inputs.dy.size() == B * N);
    assert(inputs.gamma.size() == N);
    assert(inputs.beta.size() == N);
    assert(inputs.mean.size() == B);
    assert(inputs.rstd.size() == B);

    LayerNormBackwardResult out;
    out.batch = B;
    out.features = N;
    out.dx.assign(B * N, static_cast<bf16>(0.0f));
    out.dgamma.assign(N, static_cast<bf16>(0.0f));
    out.dbeta.assign(N, static_cast<bf16>(0.0f));

    // Compute x_hat in bf16 (internal)
    std::vector<bf16> x_hat(B * N, static_cast<bf16>(0.0f));
    for (size_t r = 0; r < B; ++r) {
        const bf16 mean = inputs.mean[r];
        const bf16 rstd = inputs.rstd[r];
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            x_hat[k] = (inputs.x[k] - mean) * rstd;
        }
    }

    for (size_t r = 0; r < B; ++r) {
        bf16 sum1 = static_cast<bf16>(0.0f);
        bf16 sum2 = static_cast<bf16>(0.0f);
        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const bf16 dy = inputs.dy[k];
            const bf16 gamma = inputs.gamma[c];
            sum1 = sum1 + (dy * gamma);
            sum2 = sum2 + (dy * gamma * x_hat[k]);
        }

        const bf16 dy_gamma_sum = sum1 / static_cast<bf16>(static_cast<f32>(N));
        const bf16 dy_gamma_xnorm_sum = sum2 / static_cast<bf16>(static_cast<f32>(N));
        const bf16 rstd = inputs.rstd[r];

        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            const bf16 dy = inputs.dy[k];
            const bf16 gamma = inputs.gamma[c];
            const bf16 term1 = dy * gamma;
            const bf16 term2 = dy_gamma_sum;
            const bf16 term3 = x_hat[k] * dy_gamma_xnorm_sum;
            out.dx[k] = rstd * (term1 - term2 - term3);
        }

        for (size_t c = 0; c < N; ++c) {
            const size_t k = idx(r, c, N);
            out.dgamma[c] = out.dgamma[c] + (inputs.dy[k] * x_hat[k]);
            out.dbeta[c] = out.dbeta[c] + inputs.dy[k];
        }
    }

    return out;
}