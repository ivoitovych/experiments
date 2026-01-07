#include "gelu_ref.h"
#include "ulp_calculator.h"

#include <algorithm>
#include <array>
#include <cstdint>
#include <cstring>
#include <iomanip>
#include <iostream>
#include <limits>
#include <vector>

using bf16 = std::bfloat16_t;

static inline bool bf16_is_nan_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) != 0);
}

static inline bool bf16_is_inf_bits(uint16_t bits) {
    return ((bits & 0x7F80u) == 0x7F80u) && ((bits & 0x007Fu) == 0);
}

static inline float f32_from_bf16_bits(uint16_t b) {
    uint32_t u = static_cast<uint32_t>(b) << 16;
    float x;
    std::memcpy(&x, &u, sizeof(x));
    return x;
}

static inline uint16_t bf16_from_f32_rne_bits(float x) {
    uint32_t u;
    std::memcpy(&u, &x, sizeof(u));
    const uint32_t lsb = (u >> 16) & 1u;
    const uint32_t rounding_bias = 0x7FFFu + lsb; // ties-to-even
    u += rounding_bias;
    return static_cast<uint16_t>(u >> 16);
}

static inline bf16 bf16_from_f32_rne(float x) {
    uint16_t b = bf16_from_f32_rne_bits(x);
    return static_cast<bf16>(f32_from_bf16_bits(b));
}

static inline uint16_t bf16_bits(bf16 v) {
    uint16_t bits;
    std::memcpy(&bits, &v, sizeof(bits));
    return bits;
}

static inline bf16 bf16_from_bits(uint16_t bits) {
    bf16 v;
    std::memcpy(&v, &bits, sizeof(v));
    return v;
}

// HW model:
// - inputs are bf16 (we enumerate bf16 values)
// - internal math is fp32 (+,-,*, comparisons)
// - output is bf16 (RNE assumed; we implement deterministic float->bf16 rounding)
static inline bf16 gelu_ref_bf16_hw(bf16 x_bf16) {
    // Reference uses stable fp64, then cast to float, then round to bf16 (RNE).
    // This matches "fp32 internal, bf16 output" more closely than direct double->bf16.
    const float xf = static_cast<float>(x_bf16);
    const double yd = gelu_ref_fp64(static_cast<double>(xf));
    const float yf = static_cast<float>(yd);
    return bf16_from_f32_rne(yf);
}

struct Stats {
    size_t n = 0;
    int64_t max = 0;
    double mean = 0.0;
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
    return s;
}

struct ErrStats {
    size_t n = 0;
    double abs_mean = 0.0;
    double abs_max = 0.0;
    size_t rel_n = 0;      // count where reference != 0
    double rel_mean = 0.0;
    double rel_max = 0.0;
    size_t ref0_n = 0;     // count where reference == 0
};

static ErrStats summarize_errors(const std::vector<double>& abs_errs,
                                const std::vector<double>& rel_errs,
                                size_t ref0_n) {
    ErrStats s;
    s.n = abs_errs.size();
    s.ref0_n = ref0_n;

    if (!abs_errs.empty()) {
        double sum = 0.0;
        double mx = 0.0;
        for (double e : abs_errs) { sum += e; mx = std::max(mx, e); }
        s.abs_mean = sum / static_cast<double>(abs_errs.size());
        s.abs_max = mx;
    }

    s.rel_n = rel_errs.size();
    if (!rel_errs.empty()) {
        double sum = 0.0;
        double mx = 0.0;
        for (double e : rel_errs) { sum += e; mx = std::max(mx, e); }
        s.rel_mean = sum / static_cast<double>(rel_errs.size());
        s.rel_max = mx;
    }

    return s;
}

// Solve 5x5 system for least squares via normal equations (Gaussian elimination).
static bool solve_5x5(std::array<std::array<double, 5>, 5> A,
                      std::array<double, 5> b,
                      std::array<double, 5>& x_out) {
    for (int col = 0; col < 5; ++col) {
        int pivot = col;
        double best = std::abs(A[col][col]);
        for (int r = col + 1; r < 5; ++r) {
            double v = std::abs(A[r][col]);
            if (v > best) { best = v; pivot = r; }
        }
        if (best == 0.0) return false;
        if (pivot != col) { std::swap(A[pivot], A[col]); std::swap(b[pivot], b[col]); }

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

static std::array<float, 5> fit_deg4_poly_t(const std::vector<float>& ts, const std::vector<float>& ys) {
    std::array<std::array<double, 5>, 5> M{};
    std::array<double, 5> v{};
    for (int r = 0; r < 5; ++r) {
        v[r] = 0.0;
        for (int c = 0; c < 5; ++c) M[r][c] = 0.0;
    }

    const size_t n = ts.size();
    for (size_t i = 0; i < n; ++i) {
        double t = static_cast<double>(ts[i]);
        double y = static_cast<double>(ys[i]);
        double p[5] = {1.0, t, t * t, t * t * t, t * t * t * t};
        for (int r = 0; r < 5; ++r) {
            v[r] += p[r] * y;
            for (int c = 0; c < 5; ++c) M[r][c] += p[r] * p[c];
        }
    }

    std::array<double, 5> sol{};
    if (!solve_5x5(M, v, sol)) {
        return {0.f, 0.f, 0.f, 0.f, 0.f};
    }
    return {static_cast<float>(sol[0]), static_cast<float>(sol[1]), static_cast<float>(sol[2]),
            static_cast<float>(sol[3]), static_cast<float>(sol[4])};
}

static inline float eval_deg4_horner_f32(const std::array<float, 5>& c, float t) {
    // (((c4*t + c3)*t + c2)*t + c1)*t + c0
    float y = c[4];
    y = y * t + c[3];
    y = y * t + c[2];
    y = y * t + c[1];
    y = y * t + c[0];
    return y;
}

struct Bounds {
    bf16 neg_last_zero_x{};
    bf16 neg_first_nonzero_x{};
    bf16 pos_last_mismatch_x{};
    bf16 pos_first_identity_x{};
};

static Bounds compute_bounds_fullscan_hw() {
    Bounds out{};

    // Enumerate all finite bf16 bit patterns and sort by numeric value (via key)
    struct Entry { uint16_t bits; uint16_t key; };
    std::vector<Entry> es;
    es.reserve(65536);
    for (uint32_t i = 0; i < 65536; ++i) {
        uint16_t bits = static_cast<uint16_t>(i);
        if (bf16_is_nan_bits(bits) || bf16_is_inf_bits(bits)) continue;
        const bool sign = (bits & 0x8000u) != 0;
        uint16_t key = static_cast<uint16_t>(bits ^ (sign ? 0xFFFFu : 0x8000u));
        es.push_back({bits, key});
    }
    std::sort(es.begin(), es.end(), [](const Entry& a, const Entry& b){ return a.key < b.key; });

    // Negative scan from most-negative up to 0:
    // find last x where y_ref == 0, then first x after that where y_ref != 0.
    bool saw_zero = false;
    for (size_t i = 0; i < es.size(); ++i) {
        bf16 x = bf16_from_bits(es[i].bits);
        if (static_cast<double>(x) >= 0.0) break;
        bf16 y = gelu_ref_bf16_hw(x);
        if (static_cast<double>(y) == 0.0) {
            out.neg_last_zero_x = x;
            saw_zero = true;
        } else if (saw_zero) {
            out.neg_first_nonzero_x = x;
            break;
        }
    }

    // Positive scan from most-positive down to 0:
    // find last mismatch (y!=x) and first identity after that.
    bool saw_identity = false;
    for (size_t ri = es.size(); ri-- > 0;) {
        bf16 x = bf16_from_bits(es[ri].bits);
        if (static_cast<double>(x) <= 0.0) break;
        bf16 y = gelu_ref_bf16_hw(x);
        if (y == x) {
            out.pos_first_identity_x = x; // smallest identity encountered so far while scanning down
            saw_identity = true;
        } else if (saw_identity) {
            out.pos_last_mismatch_x = x;
            break;
        }
    }

    return out;
}

int main() {
    ULP_Calculator ulp;
    const Bounds b = compute_bounds_fullscan_hw();

    // Approximation region (non-saturated input region)
    const bf16 approx_x_min = b.neg_first_nonzero_x;
    const bf16 approx_x_max = b.pos_last_mismatch_x;

    std::cout << std::scientific << std::setprecision(10);
    std::cout << "Piecewise degree-4 fit under HW model (bf16 in, fp32 compute, bf16 out)\n";
    std::cout << "======================================================================\n\n";

    std::cout << "Saturation bounds under HW model (fp32 internal, bf16 output):\n";
    std::cout << "  neg_last_zero_x      = " << static_cast<double>(b.neg_last_zero_x)
              << " bits=0x" << std::hex << bf16_bits(b.neg_last_zero_x) << std::dec << "\n";
    std::cout << "  neg_first_nonzero_x  = " << static_cast<double>(b.neg_first_nonzero_x)
              << " bits=0x" << std::hex << bf16_bits(b.neg_first_nonzero_x) << std::dec
              << "  y_ref=" << static_cast<double>(gelu_ref_bf16_hw(b.neg_first_nonzero_x)) << "\n";
    std::cout << "  pos_last_mismatch_x  = " << static_cast<double>(b.pos_last_mismatch_x)
              << " bits=0x" << std::hex << bf16_bits(b.pos_last_mismatch_x) << std::dec
              << "  y_ref=" << static_cast<double>(gelu_ref_bf16_hw(b.pos_last_mismatch_x)) << "\n";
    std::cout << "  pos_first_identity_x = " << static_cast<double>(b.pos_first_identity_x)
              << " bits=0x" << std::hex << bf16_bits(b.pos_first_identity_x) << std::dec << "\n\n";

    std::cout << "Non-saturated input region: [" << static_cast<double>(approx_x_min)
              << ", " << static_cast<double>(approx_x_max) << "]\n\n";

    // Build list of all finite bf16 x in [approx_x_min, approx_x_max] (inclusive)
    std::vector<bf16> xs;
    xs.reserve(40000);
    for (uint32_t i = 0; i < 65536; ++i) {
        const uint16_t bits = static_cast<uint16_t>(i);
        if (bf16_is_nan_bits(bits) || bf16_is_inf_bits(bits)) continue;
        bf16 x = bf16_from_bits(bits);
        if (static_cast<double>(x) < static_cast<double>(approx_x_min)) continue;
        if (static_cast<double>(x) > static_cast<double>(approx_x_max)) continue;
        xs.push_back(x);
    }
    std::sort(xs.begin(), xs.end(), [](bf16 a, bf16 b){ return static_cast<double>(a) < static_cast<double>(b); });
    xs.erase(std::unique(xs.begin(), xs.end(), [](bf16 a, bf16 b){ return bf16_bits(a) == bf16_bits(b); }), xs.end());

    const int segments = 8;
    const double x_min = static_cast<double>(approx_x_min);
    const double x_max = static_cast<double>(approx_x_max);
    std::array<double, 9> bps{};
    for (int s = 0; s <= segments; ++s) {
        bps[s] = x_min + (x_max - x_min) * (static_cast<double>(s) / static_cast<double>(segments));
    }

    struct Segment {
        double lo;
        double hi;
        float center;
        float inv_scale;
        std::array<float, 5> coeffs_t; // polynomial in t
        Stats ulp_stats;
        ErrStats err_stats;
    };
    std::vector<Segment> segs;
    segs.reserve(segments);

    std::vector<int64_t> all_ulps;
    all_ulps.reserve(xs.size());
    std::vector<double> all_abs_errs;
    all_abs_errs.reserve(xs.size());
    std::vector<double> all_rel_errs;
    all_rel_errs.reserve(xs.size());
    size_t all_ref0_n = 0;

    for (int s = 0; s < segments; ++s) {
        const double lo = bps[s];
        const double hi = bps[s + 1];
        std::vector<bf16> seg_xs;
        seg_xs.reserve(xs.size() / segments + 64);
        for (bf16 x : xs) {
            double xd = static_cast<double>(x);
            if ((s < segments - 1 && xd >= lo && xd < hi) || (s == segments - 1 && xd >= lo && xd <= hi)) {
                seg_xs.push_back(x);
            }
        }
        if (seg_xs.empty()) {
            segs.push_back(Segment{lo, hi, 0.0f, 0.0f, {0,0,0,0,0}, Stats{}});
            continue;
        }

        const double seg_x_min = static_cast<double>(*std::min_element(seg_xs.begin(), seg_xs.end(),
                                                                      [](bf16 a, bf16 b){ return static_cast<double>(a) < static_cast<double>(b); }));
        const double seg_x_max = static_cast<double>(*std::max_element(seg_xs.begin(), seg_xs.end(),
                                                                      [](bf16 a, bf16 b){ return static_cast<double>(a) < static_cast<double>(b); }));
        const double center_d = 0.5 * (seg_x_min + seg_x_max);
        const double half_w_d = 0.5 * (seg_x_max - seg_x_min);
        const double inv_scale_d = (half_w_d > 0.0) ? (1.0 / half_w_d) : 0.0;

        const float center_f = static_cast<float>(center_d);
        const float inv_scale_f = static_cast<float>(inv_scale_d);

        std::vector<float> ts;
        std::vector<float> ys;
        ts.reserve(seg_xs.size());
        ys.reserve(seg_xs.size());

        for (bf16 x : seg_xs) {
            const float xf = static_cast<float>(x);
            const float t = (xf - center_f) * inv_scale_f;
            const bf16 yb = gelu_ref_bf16_hw(x);
            ts.push_back(t);
            ys.push_back(static_cast<float>(yb));
        }

        const auto coeffs = fit_deg4_poly_t(ts, ys);

        // Evaluate + ULP stats (HW model: compute yhat in fp32, then round to bf16).
        std::vector<int64_t> ulps;
        ulps.reserve(seg_xs.size());
        std::vector<double> abs_errs;
        abs_errs.reserve(seg_xs.size());
        std::vector<double> rel_errs;
        rel_errs.reserve(seg_xs.size());
        size_t ref0_n = 0;
        for (bf16 x : seg_xs) {
            const float xf = static_cast<float>(x);
            const float t = (xf - center_f) * inv_scale_f;
            const float yhat_f = eval_deg4_horner_f32(coeffs, t);
            const bf16 yhat_b = bf16_from_f32_rne(yhat_f);
            const bf16 yref_b = gelu_ref_bf16_hw(x);
            const int64_t e = ulp.ulp_distance(yref_b, yhat_b);
            ulps.push_back(e);
            all_ulps.push_back(e);

            const double yref = static_cast<double>(static_cast<float>(yref_b));
            const double yhat = static_cast<double>(static_cast<float>(yhat_b));
            const double abs_e = std::abs(yhat - yref);
            abs_errs.push_back(abs_e);
            all_abs_errs.push_back(abs_e);

            if (yref != 0.0) {
                const double rel_e = abs_e / std::abs(yref);
                rel_errs.push_back(rel_e);
                all_rel_errs.push_back(rel_e);
            } else {
                ++ref0_n;
                ++all_ref0_n;
            }
        }

        segs.push_back(Segment{
            lo, hi, center_f, inv_scale_f, coeffs,
            summarize(std::move(ulps)),
            summarize_errors(abs_errs, rel_errs, ref0_n)
        });
    }

    const Stats overall = summarize(std::move(all_ulps));
    const ErrStats overall_err = summarize_errors(all_abs_errs, all_rel_errs, all_ref0_n);

    std::cout << "Per-segment error stats (vs y_ref_bf16; HW model evaluation):\n\n";
    std::cout << std::left
              << std::setw(6)  << "seg"
              << std::setw(16) << "x_lo"
              << std::setw(16) << "x_hi"
              << std::right
              << std::setw(10) << "n"
              << std::setw(12) << "ulp_mean"
              << std::setw(10) << "ulp_max"
              << std::setw(14) << "abs_mean"
              << std::setw(14) << "abs_max"
              << std::setw(12) << "rel_mean"
              << std::setw(12) << "rel_max"
              << std::setw(10) << "ref0_n"
              << "\n";
    std::cout << std::string(132, '-') << "\n";

    std::cout << std::scientific << std::setprecision(6);
    for (size_t i = 0; i < segs.size(); ++i) {
        const auto& s = segs[i];
        std::cout << std::left
                  << std::setw(6)  << i
                  << std::setw(16) << s.lo
                  << std::setw(16) << s.hi
                  << std::right
                  << std::setw(10) << s.ulp_stats.n
                  << std::setw(12) << std::fixed << std::setprecision(3) << s.ulp_stats.mean
                  << std::setw(10) << s.ulp_stats.max
                  << std::setw(14) << std::scientific << std::setprecision(6) << s.err_stats.abs_mean
                  << std::setw(14) << std::scientific << std::setprecision(6) << s.err_stats.abs_max
                  << std::setw(12) << std::scientific << std::setprecision(6) << s.err_stats.rel_mean
                  << std::setw(12) << std::scientific << std::setprecision(6) << s.err_stats.rel_max
                  << std::setw(10) << s.err_stats.ref0_n
                  << "\n";
        std::cout << "  center=" << static_cast<double>(s.center)
                  << " inv_scale=" << static_cast<double>(s.inv_scale)
                  << " coeffs_t=["
                  << static_cast<double>(s.coeffs_t[0]) << ", "
                  << static_cast<double>(s.coeffs_t[1]) << ", "
                  << static_cast<double>(s.coeffs_t[2]) << ", "
                  << static_cast<double>(s.coeffs_t[3]) << ", "
                  << static_cast<double>(s.coeffs_t[4]) << "]\n";
    }

    std::cout << "\nOverall error stats (all non-saturated bf16 inputs):\n";
    std::cout << "  n=" << overall.n
              << " ulp_mean=" << std::fixed << std::setprecision(3) << overall.mean
              << " ulp_max=" << overall.max
              << " abs_mean=" << std::scientific << std::setprecision(6) << overall_err.abs_mean
              << " abs_max=" << std::scientific << std::setprecision(6) << overall_err.abs_max
              << " rel_mean=" << std::scientific << std::setprecision(6) << overall_err.rel_mean
              << " rel_max=" << std::scientific << std::setprecision(6) << overall_err.rel_max
              << " ref0_n=" << overall_err.ref0_n
              << "\n";

    return 0;
}


