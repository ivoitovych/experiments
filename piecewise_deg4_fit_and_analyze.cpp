#include "ulp_calculator.h"
#include "gelu_ref.h"

#include <algorithm>
#include <array>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <limits>
#include <vector>

using bf16 = std::bfloat16_t;

static inline bool is_nan_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) != 0);
}

static inline bool is_inf_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) == 0);
}

static bf16 gelu_ref_bf16(bf16 x) {
    double xd = static_cast<double>(x);
    double yd = gelu_ref_fp64(xd);
    return static_cast<bf16>(yd);
}

// Solve a 5x5 linear system via Gaussian elimination with partial pivoting.
static bool solve_5x5(std::array<std::array<double, 5>, 5> A,
                      std::array<double, 5> b,
                      std::array<double, 5>& x_out) {
    // Augmented matrix [A|b]
    for (int col = 0; col < 5; ++col) {
        int pivot = col;
        double best = std::abs(A[col][col]);
        for (int r = col + 1; r < 5; ++r) {
            double v = std::abs(A[r][col]);
            if (v > best) {
                best = v;
                pivot = r;
            }
        }
        if (best == 0.0) return false;
        if (pivot != col) {
            std::swap(A[pivot], A[col]);
            std::swap(b[pivot], b[col]);
        }

        double diag = A[col][col];
        for (int c = col; c < 5; ++c) A[col][c] /= diag;
        b[col] /= diag;

        for (int r = 0; r < 5; ++r) {
            if (r == col) continue;
            double factor = A[r][col];
            if (factor == 0.0) continue;
            for (int c = col; c < 5; ++c) A[r][c] -= factor * A[col][c];
            b[r] -= factor * b[col];
        }
    }

    for (int i = 0; i < 5; ++i) x_out[i] = b[i];
    return true;
}

// Fit y ~= c0 + c1*x + c2*x^2 + c3*x^3 + c4*x^4 (least squares)
static std::array<double, 5> fit_deg4_poly(const std::vector<double>& xs, const std::vector<double>& ys) {
    std::array<std::array<double, 5>, 5> M{};
    std::array<double, 5> v{};
    for (int r = 0; r < 5; ++r) {
        for (int c = 0; c < 5; ++c) M[r][c] = 0.0;
        v[r] = 0.0;
    }

    const size_t n = xs.size();
    for (size_t i = 0; i < n; ++i) {
        double x = xs[i];
        double y = ys[i];
        double p[5] = {1.0, x, x * x, x * x * x, x * x * x * x};
        for (int r = 0; r < 5; ++r) {
            v[r] += p[r] * y;
            for (int c = 0; c < 5; ++c) {
                M[r][c] += p[r] * p[c];
            }
        }
    }

    std::array<double, 5> coeffs{};
    if (!solve_5x5(M, v, coeffs)) {
        // fallback: zero
        coeffs = {0.0, 0.0, 0.0, 0.0, 0.0};
    }
    return coeffs;
}

static bf16 eval_poly_bf16_horner(const std::array<bf16, 5>& c, bf16 x) {
    // Horner: (((c4*x + c3)*x + c2)*x + c1)*x + c0
    bf16 y = c[4];
    y = y * x + c[3];
    y = y * x + c[2];
    y = y * x + c[1];
    y = y * x + c[0];
    return y;
}

struct Stats {
    int64_t max = 0;
    double mean = 0.0;
    int64_t p50 = 0;
    int64_t p90 = 0;
    int64_t p99 = 0;
    size_t n = 0;
};

static Stats summarize(std::vector<int64_t> ulps) {
    Stats s;
    s.n = ulps.size();
    if (ulps.empty()) return s;
    std::sort(ulps.begin(), ulps.end());
    s.max = ulps.back();
    double sum = 0.0;
    for (auto v : ulps) sum += static_cast<double>(v);
    s.mean = sum / static_cast<double>(ulps.size());
    auto atp = [&](double p) -> int64_t {
        size_t idx = static_cast<size_t>(p * (ulps.size() - 1));
        return ulps[idx];
    };
    s.p50 = atp(0.50);
    s.p90 = atp(0.90);
    s.p99 = atp(0.99);
    return s;
}

int main() {
    ULP_Calculator ulp;
    const int64_t max_idx = static_cast<int64_t>(ulp.total_values()) - 1;

    // Compute exact tail saturation bounds (same logic as gelu_saturation_bounds.cpp)
    bf16 x_neg_sat_max = static_cast<bf16>(0.0f);
    bool neg_found = false;
    bool saw_zero = false;
    bf16 last_zero = static_cast<bf16>(0.0f);
    for (int64_t idx = 0; idx <= max_idx; ++idx) {
        bf16 x = ulp.value_at_index(idx);
        uint16_t bits = ULP_Calculator::bf16_to_bits_public(x);
        if (is_inf_bits(bits)) continue;
        if (static_cast<double>(x) >= 0.0) break;
        bf16 y = gelu_ref_bf16(x);
        if (static_cast<double>(y) == 0.0) { last_zero = x; saw_zero = true; continue; }
        if (saw_zero) { x_neg_sat_max = last_zero; neg_found = true; break; }
    }

    bf16 x_pos_sat_min = std::numeric_limits<bf16>::infinity();
    bool pos_found = false;
    bf16 last_mismatch = static_cast<bf16>(0.0f);
    bool mismatch_found = false;
    for (int64_t idx = max_idx; idx >= 0; --idx) {
        bf16 x = ulp.value_at_index(idx);
        uint16_t bits = ULP_Calculator::bf16_to_bits_public(x);
        if (is_inf_bits(bits)) continue;
        if (static_cast<double>(x) <= 0.0) break;
        bf16 y = gelu_ref_bf16(x);
        if (y != x) { last_mismatch = x; mismatch_found = true; break; }
    }
    if (mismatch_found) {
        int64_t i = ulp.get_ulp_index(last_mismatch);
        if (i >= 0 && i + 1 <= max_idx) { x_pos_sat_min = ulp.value_at_index(i + 1); pos_found = true; }
    }

    if (!neg_found || !pos_found) {
        std::cerr << "Failed to find saturation bounds.\n";
        return 1;
    }

    int64_t i_neg = ulp.get_ulp_index(x_neg_sat_max);
    int64_t i_pos = ulp.get_ulp_index(x_pos_sat_min);
    bf16 approx_min = ulp.value_at_index(i_neg + 1);
    bf16 approx_max = ulp.value_at_index(i_pos - 1);

    // Collect all bf16 inputs in approximation region (finite only)
    std::vector<bf16> xs_bf16;
    for (int64_t idx = i_neg + 1; idx <= i_pos - 1; ++idx) {
        bf16 x = ulp.value_at_index(idx);
        uint16_t bits = ULP_Calculator::bf16_to_bits_public(x);
        if (is_inf_bits(bits)) continue;
        xs_bf16.push_back(x);
    }

    std::cout << std::scientific << std::setprecision(10);
    std::cout << "Piecewise degree-4 fit (8 segments) vs bf16-rounded fp64 erf GELU\n";
    std::cout << "==================================================================\n\n";
    std::cout << "Tail saturation bounds:\n";
    std::cout << "  x_neg_sat_max (GELU_bf16==0): " << static_cast<double>(x_neg_sat_max)
              << "  bits=0x" << std::hex << ULP_Calculator::bf16_to_bits_public(x_neg_sat_max) << std::dec << "\n";
    std::cout << "  x_pos_sat_min (GELU_bf16==x): " << static_cast<double>(x_pos_sat_min)
              << "  bits=0x" << std::hex << ULP_Calculator::bf16_to_bits_public(x_pos_sat_min) << std::dec << "\n\n";
    std::cout << "Approximation region (inputs): [" << static_cast<double>(approx_min) << ", " << static_cast<double>(approx_max) << "]\n";
    std::cout << "Total bf16 inputs in region: " << xs_bf16.size() << "\n\n";

    const int segments = 8;
    const size_t n = xs_bf16.size();

    struct SegmentResult {
        bf16 x_lo;
        bf16 x_hi;
        bf16 center;
        bf16 inv_scale;
        std::array<bf16, 5> coeffs_bf16; // polynomial in t = (x-center)*inv_scale
        Stats stats;
    };
    std::vector<SegmentResult> results;
    results.reserve(segments);

    // Segment by x-value (not by count) to avoid over-weighting subnormals near 0.
    const double x_min_d = static_cast<double>(approx_min);
    const double x_max_d = static_cast<double>(approx_max);
    std::array<double, 9> bps{};
    for (int i = 0; i <= segments; ++i) {
        bps[i] = x_min_d + (x_max_d - x_min_d) * (static_cast<double>(i) / static_cast<double>(segments));
    }

    for (int s = 0; s < segments; ++s) {
        const double lo_d = bps[s];
        const double hi_d = bps[s + 1];

        std::vector<bf16> seg_xs;
        seg_xs.reserve(n / segments + 64);
        for (bf16 x : xs_bf16) {
            double xd = static_cast<double>(x);
            if ((s < segments - 1 && xd >= lo_d && xd < hi_d) || (s == segments - 1 && xd >= lo_d && xd <= hi_d)) {
                seg_xs.push_back(x);
            }
        }
        if (seg_xs.empty()) {
            SegmentResult r;
            r.x_lo = static_cast<bf16>(lo_d);
            r.x_hi = static_cast<bf16>(hi_d);
            r.center = static_cast<bf16>(0.0f);
            r.inv_scale = static_cast<bf16>(0.0f);
            r.coeffs_bf16 = {static_cast<bf16>(0.0f), static_cast<bf16>(0.0f), static_cast<bf16>(0.0f), static_cast<bf16>(0.0f), static_cast<bf16>(0.0f)};
            r.stats = {};
            results.push_back(r);
            continue;
        }

        bf16 x_lo = *std::min_element(seg_xs.begin(), seg_xs.end(), [](bf16 a, bf16 b){ return static_cast<double>(a) < static_cast<double>(b); });
        bf16 x_hi = *std::max_element(seg_xs.begin(), seg_xs.end(), [](bf16 a, bf16 b){ return static_cast<double>(a) < static_cast<double>(b); });

        // Scale x -> t in [-1, 1] approximately, for numerical stability in fitting.
        const double center_d = 0.5 * (static_cast<double>(x_lo) + static_cast<double>(x_hi));
        const double half_width_d = 0.5 * (static_cast<double>(x_hi) - static_cast<double>(x_lo));
        const double inv_scale_d = (half_width_d > 0.0) ? (1.0 / half_width_d) : 0.0;

        std::vector<double> ts;
        std::vector<double> ys;
        ts.reserve(seg_xs.size());
        ys.reserve(seg_xs.size());

        for (bf16 x : seg_xs) {
            bf16 yref = gelu_ref_bf16(x);
            double t = (static_cast<double>(x) - center_d) * inv_scale_d;
            ts.push_back(t);
            ys.push_back(static_cast<double>(yref)); // fit to bf16-rounded reference
        }

        auto coeffs_t = fit_deg4_poly(ts, ys); // y ~= poly(t)
        std::array<bf16, 5> c_bf16 = {
            static_cast<bf16>(coeffs_t[0]),
            static_cast<bf16>(coeffs_t[1]),
            static_cast<bf16>(coeffs_t[2]),
            static_cast<bf16>(coeffs_t[3]),
            static_cast<bf16>(coeffs_t[4]),
        };

        const bf16 center_bf16 = static_cast<bf16>(center_d);
        const bf16 inv_scale_bf16 = static_cast<bf16>(inv_scale_d);

        std::vector<int64_t> ulps;
        ulps.reserve(seg_xs.size());
        for (bf16 x : seg_xs) {
            bf16 yref = gelu_ref_bf16(x);
            bf16 t = (x - center_bf16) * inv_scale_bf16;
            bf16 yhat = eval_poly_bf16_horner(c_bf16, t);
            int64_t e = ulp.ulp_distance(yref, yhat);
            if (e >= 0) ulps.push_back(e);
        }

        SegmentResult r;
        r.x_lo = x_lo;
        r.x_hi = x_hi;
        r.center = center_bf16;
        r.inv_scale = inv_scale_bf16;
        r.coeffs_bf16 = c_bf16;
        r.stats = summarize(std::move(ulps));
        results.push_back(r);
    }

    std::cout << "Per-segment ULP stats (error vs bf16(gelu_ref_fp64(x))):\n\n";
    std::cout << std::left
              << std::setw(8)  << "seg"
              << std::setw(18) << "x_lo"
              << std::setw(18) << "x_hi"
              << std::right
              << std::setw(10) << "n"
              << std::setw(10) << "p50"
              << std::setw(10) << "p90"
              << std::setw(10) << "p99"
              << std::setw(10) << "max"
              << std::setw(14) << "mean"
              << "\n";
    std::cout << std::string(110, '-') << "\n";

    for (size_t s = 0; s < results.size(); ++s) {
        const auto& r = results[s];
        std::cout << std::left
                  << std::setw(8)  << s
                  << std::setw(18) << static_cast<double>(r.x_lo)
                  << std::setw(18) << static_cast<double>(r.x_hi)
                  << std::right
                  << std::setw(10) << r.stats.n
                  << std::setw(10) << r.stats.p50
                  << std::setw(10) << r.stats.p90
                  << std::setw(10) << r.stats.p99
                  << std::setw(10) << r.stats.max
                  << std::setw(14) << std::fixed << std::setprecision(3) << r.stats.mean
                  << std::scientific << std::setprecision(10)
                  << "\n";

        std::cout << "  coeffs bf16 (c0..c4): "
                  << static_cast<double>(r.coeffs_bf16[0]) << ", "
                  << static_cast<double>(r.coeffs_bf16[1]) << ", "
                  << static_cast<double>(r.coeffs_bf16[2]) << ", "
                  << static_cast<double>(r.coeffs_bf16[3]) << ", "
                  << static_cast<double>(r.coeffs_bf16[4]) << "\n";
        std::cout << "  transform: center=" << static_cast<double>(r.center)
                  << " inv_scale=" << static_cast<double>(r.inv_scale) << "  (t=(x-center)*inv_scale)\n";
    }

    return 0;
}


