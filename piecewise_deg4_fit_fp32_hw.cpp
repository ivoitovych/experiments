#include "gelu_ref.h"
#include "ulp_calculator.h"

#include <algorithm>
#include <array>
#include <cstdint>
#include <cstring>
#include <sstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <fstream>
#include <unordered_map>
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

static std::string fmt_sci(double v, int w, int p = 6) {
    std::ostringstream oss;
    oss << std::scientific << std::setprecision(p) << std::setw(w) << v;
    return oss.str();
}

static std::string fmt_fix(double v, int w, int p = 3) {
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(p) << std::setw(w) << v;
    return oss.str();
}

static std::string fmt_i64(int64_t v, int w) {
    std::ostringstream oss;
    oss << std::setw(w) << v;
    return oss.str();
}

static std::string fmt_u64(size_t v, int w) {
    std::ostringstream oss;
    oss << std::setw(w) << v;
    return oss.str();
}

static inline uint32_t f32_bits(float x) {
    uint32_t u;
    std::memcpy(&u, &x, sizeof(u));
    return u;
}

static inline float f32_from_bits(uint32_t u) {
    float x;
    std::memcpy(&x, &u, sizeof(x));
    return x;
}

static inline uint32_t f32_order_key(uint32_t u) {
    const bool sign = (u & 0x80000000u) != 0;
    return u ^ (sign ? 0xFFFFFFFFu : 0x80000000u);
}

static inline uint32_t f32_from_order_key(uint32_t k) {
    if (k < 0x80000000u) {
        return k ^ 0xFFFFFFFFu; // negative
    }
    return k ^ 0x80000000u; // positive
}

static inline uint16_t bf16_order_key(uint16_t bits) {
    const bool sign = (bits & 0x8000u) != 0;
    return static_cast<uint16_t>(bits ^ (sign ? 0xFFFFu : 0x8000u));
}

static inline uint16_t bf16_round_from_f32_bits_rne(uint32_t u) {
    const uint32_t lsb = (u >> 16) & 1u;
    u += 0x7FFFu + lsb;
    return static_cast<uint16_t>(u >> 16);
}

struct RoundInterval {
    float lo = 0.0f;
    float hi_excl = 0.0f; // exclusive upper bound
};

static RoundInterval bf16_rounding_interval_f32(uint16_t target_bf16_bits,
                                                std::unordered_map<uint16_t, RoundInterval>& cache) {
    auto it = cache.find(target_bf16_bits);
    if (it != cache.end()) return it->second;

    const uint16_t target_key = bf16_order_key(target_bf16_bits);

    auto rounded_key_at = [&](uint32_t k) -> uint16_t {
        const uint32_t u = f32_from_order_key(k);
        const uint16_t rb = bf16_round_from_f32_bits_rne(u);
        return bf16_order_key(rb);
    };

    // Find low: first k where rounded_key_at(k) >= target_key
    uint32_t lo_k = 0;
    uint32_t hi_k = 0xFFFFFFFFu;
    for (int i = 0; i < 32; ++i) {
        const uint32_t mid = lo_k + ((hi_k - lo_k) >> 1);
        if (rounded_key_at(mid) >= target_key) {
            hi_k = mid;
        } else {
            lo_k = mid + 1;
        }
    }
    const uint32_t k_low = lo_k;

    // Find high: first k where rounded_key_at(k) > target_key
    lo_k = k_low;
    hi_k = 0xFFFFFFFFu;
    for (int i = 0; i < 32; ++i) {
        const uint32_t mid = lo_k + ((hi_k - lo_k) >> 1);
        if (rounded_key_at(mid) > target_key) {
            hi_k = mid;
        } else {
            lo_k = mid + 1;
        }
    }
    const uint32_t k_high = lo_k; // may be 0xFFFFFFFF if last

    const float lo = f32_from_bits(f32_from_order_key(k_low));
    const float hi_excl = (k_high == k_low) ? lo : f32_from_bits(f32_from_order_key(k_high));

    RoundInterval r{lo, hi_excl};
    cache.emplace(target_bf16_bits, r);
    return r;
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

static std::array<float, 5> fit_deg4_poly_t_rounding_aware(const std::vector<float>& ts,
                                                          const std::vector<uint16_t>& y_bits_target,
                                                          int iters = 6) {
    // Start at the target bf16 values (as float).
    std::vector<float> ys;
    ys.reserve(ts.size());
    for (uint16_t b : y_bits_target) {
        ys.push_back(f32_from_bf16_bits(b));
    }

    std::unordered_map<uint16_t, RoundInterval> interval_cache;
    interval_cache.reserve(512);

    std::array<float, 5> c = fit_deg4_poly_t(ts, ys);
    size_t best_mismatch = std::numeric_limits<size_t>::max();

    for (int it = 0; it < iters; ++it) {
        size_t mism = 0;
        std::vector<float> proj;
        proj.resize(ys.size());

        for (size_t i = 0; i < ts.size(); ++i) {
            const float pred = eval_deg4_horner_f32(c, ts[i]);
            const uint16_t rb = bf16_from_f32_rne_bits(pred);
            if (rb != y_bits_target[i]) ++mism;

            const RoundInterval r = bf16_rounding_interval_f32(y_bits_target[i], interval_cache);
            float lo = r.lo;
            float hi_excl = r.hi_excl;
            // Convert hi_excl to an inclusive-ish bound for clamping.
            float hi = std::nextafter(hi_excl, -std::numeric_limits<float>::infinity());
            if (!(lo <= hi)) {
                // Degenerate; fall back to target.
                proj[i] = f32_from_bf16_bits(y_bits_target[i]);
                continue;
            }
            if (pred < lo) proj[i] = lo;
            else if (pred > hi) proj[i] = hi;
            else proj[i] = pred;
        }

        if (mism == 0 || mism >= best_mismatch) break;
        best_mismatch = mism;
        ys.swap(proj);
        c = fit_deg4_poly_t(ts, ys);
    }
    return c;
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

struct SegmentModel {
    float center = 0.0f;
    float inv_scale = 0.0f;
    float x_lo = 0.0f;
    float x_hi = 0.0f;
    std::array<float, 5> c{};
};

struct SegmentRange {
    int lo = 0;  // index into xs[]
    int hi = 0;  // inclusive
    SegmentModel m{};
    int64_t ulp_max = 0;
};

static SegmentModel fit_deg4_model_on_range(const std::vector<float>& xs,
                                            int lo,
                                            int hi) {
    SegmentModel m{};
    if (lo > hi || lo < 0 || hi >= static_cast<int>(xs.size())) return m;
    const float x_lo = xs[static_cast<size_t>(lo)];
    const float x_hi = xs[static_cast<size_t>(hi)];
    m.x_lo = x_lo;
    m.x_hi = x_hi;
    m.center = 0.5f * (x_lo + x_hi);
    const float half_w = 0.5f * (x_hi - x_lo);
    m.inv_scale = (half_w > 0.0f) ? (1.0f / half_w) : 0.0f;

    const int n = hi - lo + 1;
    if (n < 6 || m.inv_scale == 0.0f) {
        const bf16 xb = static_cast<bf16>(x_lo);
        const bf16 yb = gelu_ref_bf16_hw(xb);
        m.c = {static_cast<float>(yb), 0.f, 0.f, 0.f, 0.f};
        return m;
    }

    std::vector<float> ts;
    std::vector<uint16_t> ybits;
    ts.reserve(static_cast<size_t>(n));
    ybits.reserve(static_cast<size_t>(n));
    for (int i = lo; i <= hi; ++i) {
        const float xf = xs[static_cast<size_t>(i)];
        const float t = (xf - m.center) * m.inv_scale;
        const bf16 xb = static_cast<bf16>(xf);
        const bf16 yb = gelu_ref_bf16_hw(xb);
        ts.push_back(t);
        ybits.push_back(ULP_Calculator::bf16_to_bits_public(yb));
    }
    m.c = fit_deg4_poly_t_rounding_aware(ts, ybits, /*iters=*/6);
    return m;
}

static int64_t ulp_max_on_range_hw(const std::vector<float>& xs,
                                  int lo,
                                  int hi,
                                  const SegmentModel& m,
                                  const ULP_Calculator& ulp) {
    int64_t max_e = 0;
    for (int i = lo; i <= hi; ++i) {
        const float xf = xs[static_cast<size_t>(i)];
        const float t = (xf - m.center) * m.inv_scale;
        const float yhat_f = eval_deg4_horner_f32(m.c, t);
        const bf16 yhat_b = bf16_from_f32_rne(yhat_f);
        const bf16 yref_b = gelu_ref_bf16_hw(static_cast<bf16>(xf));
        const int64_t e = ulp.ulp_distance(yref_b, yhat_b);
        max_e = std::max(max_e, e);
    }
    return max_e;
}

struct Objective {
    int64_t max_ulp = 0;  // global worst-case
    double stddev_log = 0.0; // uniformity proxy across "active" segments
    size_t active_n = 0;
};

static Objective compute_objective_active_log(const std::vector<SegmentRange>& segs) {
    Objective out{};
    if (segs.empty()) return out;

    int64_t mx = 0;
    std::vector<double> vals;
    vals.reserve(segs.size());
    for (const auto& s : segs) {
        mx = std::max(mx, s.ulp_max);
        if (s.ulp_max > 0) {
            vals.push_back(std::log1p(static_cast<double>(s.ulp_max)));
        }
    }
    out.max_ulp = mx;
    out.active_n = vals.size();
    if (vals.size() <= 1) {
        out.stddev_log = 0.0;
        return out;
    }
    double mean = 0.0;
    for (double v : vals) mean += v;
    mean /= static_cast<double>(vals.size());
    double var = 0.0;
    for (double v : vals) {
        const double d = v - mean;
        var += d * d;
    }
    var /= static_cast<double>(vals.size());
    out.stddev_log = std::sqrt(var);
    return out;
}

static bool better_objective(const Objective& a, const Objective& b) {
    // Primary: smaller global max ULP
    if (a.max_ulp != b.max_ulp) return a.max_ulp < b.max_ulp;
    // Secondary: more uniform log(ulp_max) distribution (ignoring ulp_max==0 segments)
    return a.stddev_log < b.stddev_log;
}

static SegmentRange make_seg_from_indices(const std::vector<float>& xs,
                                         int lo,
                                         int hi,
                                         const ULP_Calculator& ulp) {
    SegmentRange s;
    s.lo = lo;
    s.hi = hi;
    s.m = fit_deg4_model_on_range(xs, lo, hi);
    s.ulp_max = ulp_max_on_range_hw(xs, lo, hi, s.m, ulp);
    return s;
}

static void iterative_balance_boundaries(std::vector<float>& xs,
                                        std::vector<SegmentRange>& segs,
                                        const ULP_Calculator& ulp,
                                        int max_iters = 15,
                                        int min_points = 8) {
    if (segs.size() < 2) return;

    auto refit = [&](int idx) {
        auto& s = segs[static_cast<size_t>(idx)];
        s.m = fit_deg4_model_on_range(xs, s.lo, s.hi);
        s.ulp_max = ulp_max_on_range_hw(xs, s.lo, s.hi, s.m, ulp);
    };

    // Ensure consistent contiguous ranges.
    for (size_t i = 0; i < segs.size(); ++i) {
        if (i > 0) segs[i].lo = segs[i - 1].hi + 1;
        if (i + 1 < segs.size()) segs[i].hi = segs[i + 1].lo - 1;
        refit(static_cast<int>(i));
    }

    Objective best = compute_objective_active_log(segs);
    const int64_t hard_max_cap = best.max_ulp; // do not allow global max ULP to increase

    for (int it = 0; it < max_iters; ++it) {
        bool any = false;
        for (int b = 0; b < static_cast<int>(segs.size()) - 1; ++b) {
            // boundary between seg b and b+1 is at index seg[b].hi
            const int left_len = segs[static_cast<size_t>(b)].hi - segs[static_cast<size_t>(b)].lo + 1;
            const int right_len = segs[static_cast<size_t>(b + 1)].hi - segs[static_cast<size_t>(b + 1)].lo + 1;
            if (left_len < min_points || right_len < min_points) continue;

            const int base_step = 1;
            const int max_step = 16;
            const int cur_hi_left = segs[static_cast<size_t>(b)].hi;

            Objective local_best = best;
            int best_new_hi_left = cur_hi_left;
            SegmentRange best_left = segs[static_cast<size_t>(b)];
            SegmentRange best_right = segs[static_cast<size_t>(b + 1)];

            // Try both directions and a handful of step sizes.
            for (int dir : {-1, +1}) {
              for (int step = base_step; step <= max_step; ++step) {
                const int delta = dir * step;
                const int new_hi_left = cur_hi_left + delta;
                if (new_hi_left < segs[static_cast<size_t>(b)].lo + min_points - 1) continue;
                if (new_hi_left > segs[static_cast<size_t>(b + 1)].hi - min_points) continue;

                SegmentRange left = segs[static_cast<size_t>(b)];
                SegmentRange right = segs[static_cast<size_t>(b + 1)];
                left.hi = new_hi_left;
                right.lo = new_hi_left + 1;

                left.m = fit_deg4_model_on_range(xs, left.lo, left.hi);
                left.ulp_max = ulp_max_on_range_hw(xs, left.lo, left.hi, left.m, ulp);
                right.m = fit_deg4_model_on_range(xs, right.lo, right.hi);
                right.ulp_max = ulp_max_on_range_hw(xs, right.lo, right.hi, right.m, ulp);

                // Build a temporary objective (only two segments changed).
                std::vector<SegmentRange> tmp = segs;
                tmp[static_cast<size_t>(b)] = left;
                tmp[static_cast<size_t>(b + 1)] = right;
                const Objective obj = compute_objective_active_log(tmp);
                if (obj.max_ulp > hard_max_cap) continue; // hard constraint
                if (better_objective(obj, local_best)) {
                    local_best = obj;
                    best_new_hi_left = new_hi_left;
                    best_left = left;
                    best_right = right;
                }
              }
            }

            if (best_new_hi_left != cur_hi_left) {
                segs[static_cast<size_t>(b)] = best_left;
                segs[static_cast<size_t>(b + 1)] = best_right;
                best = local_best;
                any = true;
            }
        }
        if (!any) break;
    }
}

static void recycle_budget_minimax(std::vector<float>& xs,
                                   std::vector<SegmentRange>& segs,
                                   const ULP_Calculator& ulp,
                                   int iters = 16,
                                   int min_points = 8,
                                   int split_candidates = 63,
                                   int merge_max_ulp = 0) {
    // Merge adjacent "easy" segments (ulp_max==0) to free one segment,
    // then split the current worst segment to reduce global max ULP.
    if (segs.size() < 3) return;

    auto global_max = [&]() -> int64_t {
        int64_t mx = 0;
        for (const auto& s : segs) mx = std::max(mx, s.ulp_max);
        return mx;
    };

    for (int it = 0; it < iters; ++it) {
        const int64_t before = global_max();

        // Find best merge candidate:
        // adjacent pair where max(ulp_max) <= merge_max_ulp, preferring the widest span.
        int merge_i = -1;
        int best_span = -1;
        for (int i = 0; i < static_cast<int>(segs.size()) - 1; ++i) {
            const auto& a = segs[static_cast<size_t>(i)];
            const auto& b = segs[static_cast<size_t>(i + 1)];
            const int len_a = a.hi - a.lo + 1;
            const int len_b = b.hi - b.lo + 1;
            if (len_a < min_points || len_b < min_points) continue;
            if (std::max(a.ulp_max, b.ulp_max) > merge_max_ulp) continue;
            const int span = len_a + len_b;
            if (span > best_span) { best_span = span; merge_i = i; }
        }
        if (merge_i < 0) break; // no budget to recycle

        // Identify worst segment (exclude the merge pair).
        int worst_i = -1;
        int64_t worst = -1;
        for (int i = 0; i < static_cast<int>(segs.size()); ++i) {
            if (i == merge_i || i == merge_i + 1) continue;
            const auto& s = segs[static_cast<size_t>(i)];
            const int len = s.hi - s.lo + 1;
            if (len < 2 * min_points) continue;
            if (s.ulp_max > worst) { worst = s.ulp_max; worst_i = i; }
        }
        if (worst_i < 0) break;

        // Create merged segment (this may increase ulp_max locally, but should free a segment).
        const int mlo = segs[static_cast<size_t>(merge_i)].lo;
        const int mhi = segs[static_cast<size_t>(merge_i + 1)].hi;
        SegmentRange merged = make_seg_from_indices(xs, mlo, mhi, ulp);

        // Split worst segment with candidate midpoints.
        const auto w = segs[static_cast<size_t>(worst_i)];
        const int wlo = w.lo;
        const int whi = w.hi;
        const int wlen = whi - wlo + 1;
        int best_mid = -1;
        int64_t best_new_global = before;
        std::vector<SegmentRange> best_state;

        for (int c = 1; c <= split_candidates; ++c) {
            const int mid = wlo + (wlen * c) / (split_candidates + 1);
            if (mid - wlo + 1 < min_points) continue;
            if (whi - (mid + 1) + 1 < min_points) continue;

            SegmentRange left = make_seg_from_indices(xs, wlo, mid, ulp);
            SegmentRange right = make_seg_from_indices(xs, mid + 1, whi, ulp);

            std::vector<SegmentRange> cand;
            cand.reserve(segs.size());
            for (int i = 0; i < static_cast<int>(segs.size()); ++i) {
                if (i == merge_i) {
                    cand.push_back(merged);
                } else if (i == merge_i + 1) {
                    continue;
                } else if (i == worst_i) {
                    cand.push_back(left);
                    cand.push_back(right);
                } else {
                    cand.push_back(segs[static_cast<size_t>(i)]);
                }
            }

            // Recompute global max for candidate.
            int64_t mx = 0;
            for (const auto& s : cand) mx = std::max(mx, s.ulp_max);
            if (mx < best_new_global) {
                best_new_global = mx;
                best_mid = mid;
                best_state = std::move(cand);
            }
        }

        if (best_mid < 0 || best_new_global >= before) {
            // no improvement; stop recycling
            break;
        }
        segs = std::move(best_state);
        // Keep order by x_lo
        std::sort(segs.begin(), segs.end(), [&](const SegmentRange& a, const SegmentRange& b2) {
            return a.m.x_lo < b2.m.x_lo;
        });
    }
}

static std::vector<SegmentRange> build_adaptive_segments_deg4_hw_from_xs(std::vector<float>& xs,
                                                                        const ULP_Calculator& ulp,
                                                                        int target_segments) {
    std::vector<SegmentRange> segs;
    segs.reserve(static_cast<size_t>(target_segments));

    const int n = static_cast<int>(xs.size());

    auto make_seg = [&](int lo, int hi) -> SegmentRange {
        SegmentRange s;
        s.lo = lo; s.hi = hi;
        s.m = fit_deg4_model_on_range(xs, lo, hi);
        s.ulp_max = ulp_max_on_range_hw(xs, lo, hi, s.m, ulp);
        return s;
    };

    // Start with a single segment over the whole approximation domain.
    if (n <= 0) return segs;
    segs.push_back(make_seg(0, n - 1));

    // Segment placement optimization:
    // Always reach `target_segments` by using an objective that primarily minimizes global ulp_max,
    // and uses a secondary uniformity tie-break (stddev of log1p(ulp_max) over ulp_max>0 segments).
    // This reduces "wasted" segments in already-perfect regions once rounding-aware fitting is used.
    constexpr int kMinPoints = 8;
    constexpr int kCandidates = 31; // evaluate ~31 candidate split locations per candidate segment
    while (static_cast<int>(segs.size()) < target_segments) {
        int best_seg = -1;
        int best_mid = -1;
        Objective best_obj{std::numeric_limits<int64_t>::max(), std::numeric_limits<double>::infinity(), 0};

        // Consider splitting any segment; pick the split that improves the objective.
        for (int si = 0; si < static_cast<int>(segs.size()); ++si) {
            const int lo = segs[static_cast<size_t>(si)].lo;
            const int hi = segs[static_cast<size_t>(si)].hi;
            const int len = hi - lo + 1;
            if (len < 2 * kMinPoints) continue;

            // Compute "other segments" maxima and log-stddev data once per si.
            int64_t other_max = 0;
            std::vector<double> other_logs;
            other_logs.reserve(segs.size());
            for (int sj = 0; sj < static_cast<int>(segs.size()); ++sj) {
                if (sj == si) continue;
                const int64_t m = segs[static_cast<size_t>(sj)].ulp_max;
                other_max = std::max(other_max, m);
                if (m > 0) other_logs.push_back(std::log1p(static_cast<double>(m)));
            }

            auto obj_for = [&](int64_t left_max, int64_t right_max) -> Objective {
                Objective o{};
                o.max_ulp = std::max(other_max, std::max(left_max, right_max));
                std::vector<double> v = other_logs;
                if (left_max > 0) v.push_back(std::log1p(static_cast<double>(left_max)));
                if (right_max > 0) v.push_back(std::log1p(static_cast<double>(right_max)));
                o.active_n = v.size();
                if (v.size() <= 1) { o.stddev_log = 0.0; return o; }
                double mean = 0.0;
                for (double x : v) mean += x;
                mean /= static_cast<double>(v.size());
                double var = 0.0;
                for (double x : v) { const double d = x - mean; var += d * d; }
                var /= static_cast<double>(v.size());
                o.stddev_log = std::sqrt(var);
                return o;
            };

            for (int c = 1; c <= kCandidates; ++c) {
                const int mid = lo + (len * c) / (kCandidates + 1);
                if (mid - lo + 1 < kMinPoints) continue;
                if (hi - (mid + 1) + 1 < kMinPoints) continue;

                const SegmentRange left = make_seg(lo, mid);
                const SegmentRange right = make_seg(mid + 1, hi);
                const Objective obj = obj_for(left.ulp_max, right.ulp_max);
                if (better_objective(obj, best_obj)) {
                    best_obj = obj;
                    best_seg = si;
                    best_mid = mid;
                }
            }
        }

        // Stop only if no feasible split.
        if (best_seg < 0 || best_mid < 0) break;

        const int lo = segs[static_cast<size_t>(best_seg)].lo;
        const int hi = segs[static_cast<size_t>(best_seg)].hi;
        const SegmentRange left = make_seg(lo, best_mid);
        const SegmentRange right = make_seg(best_mid + 1, hi);

        segs[static_cast<size_t>(best_seg)] = left;
        segs.insert(segs.begin() + best_seg + 1, right);
    }

    // Ensure sorted by x_lo (they should already be).
    std::sort(segs.begin(), segs.end(), [&](const SegmentRange& a, const SegmentRange& b2) {
        return a.m.x_lo < b2.m.x_lo;
    });
    return segs;
}

static inline int pick_segment(float xf, const std::vector<SegmentModel>& segs) {
    for (int i = 0; i < static_cast<int>(segs.size()); ++i) {
        if (xf <= segs[static_cast<size_t>(i)].x_hi) return i;
    }
    return static_cast<int>(segs.size()) - 1;
}

int main(int argc, char** argv) {
    // Output controls (to avoid terminal line-wrapping "interleaving" effects).
    // - --out <path>   : write output to a file instead of stdout
    // - --no-coeff     : do not print the long coefficient line per segment
    std::ostream* out = &std::cout;
    std::ofstream out_file;
    bool print_coeff = true;
    // very small argument parser
    // (we intentionally keep this tool standalone without external deps)
    // NOLINTNEXTLINE(cppcoreguidelines-pro-bounds-pointer-arithmetic)
    for (int i = 1; i < argc; ++i) {
        const std::string a = argv[i];
        if (a == "--no-coeff") {
            print_coeff = false;
        } else if (a == "--out" && i + 1 < argc) {
            const std::string p = argv[++i];
            out_file.open(p, std::ios::binary);
            if (!out_file) {
                std::cerr << "Failed to open --out file: " << p << "\n";
                return 2;
            }
            out = &out_file;
        }
    }

    ULP_Calculator ulp;
    const Bounds b = compute_bounds_fullscan_hw();

    // Approximation region (non-saturated input region)
    const bf16 approx_x_min = b.neg_first_nonzero_x;
    const bf16 approx_x_max = b.pos_last_mismatch_x;

    (*out) << std::scientific << std::setprecision(10);
    (*out) << "Piecewise degree-4 fit under HW model (bf16 in, fp32 compute, bf16 out)\n";
    (*out) << "======================================================================\n\n";

    (*out) << "Saturation bounds under HW model (fp32 internal, bf16 output):\n";
    (*out) << "  neg_last_zero_x      = " << static_cast<double>(b.neg_last_zero_x)
              << " bits=0x" << std::hex << bf16_bits(b.neg_last_zero_x) << std::dec << "\n";
    (*out) << "  neg_first_nonzero_x  = " << static_cast<double>(b.neg_first_nonzero_x)
              << " bits=0x" << std::hex << bf16_bits(b.neg_first_nonzero_x) << std::dec
              << "  y_ref=" << static_cast<double>(gelu_ref_bf16_hw(b.neg_first_nonzero_x)) << "\n";
    (*out) << "  pos_last_mismatch_x  = " << static_cast<double>(b.pos_last_mismatch_x)
              << " bits=0x" << std::hex << bf16_bits(b.pos_last_mismatch_x) << std::dec
              << "  y_ref=" << static_cast<double>(gelu_ref_bf16_hw(b.pos_last_mismatch_x)) << "\n";
    (*out) << "  pos_first_identity_x = " << static_cast<double>(b.pos_first_identity_x)
              << " bits=0x" << std::hex << bf16_bits(b.pos_first_identity_x) << std::dec << "\n\n";

    (*out) << "Non-saturated input region: [" << static_cast<double>(approx_x_min)
              << ", " << static_cast<double>(approx_x_max) << "]\n\n";

    // Gather all finite bf16 x in approximation region (bf16 representable, as float values).
    std::vector<float> xs;
    xs.reserve(40000);
    for (uint32_t bits = 0; bits <= 0xFFFF; ++bits) {
        if (bf16_is_nan_bits(static_cast<uint16_t>(bits)) || bf16_is_inf_bits(static_cast<uint16_t>(bits))) continue;
        const bf16 xb = bf16_from_bits(static_cast<uint16_t>(bits));
        const float xf = static_cast<float>(xb);
        if (xf < static_cast<float>(approx_x_min) || xf > static_cast<float>(approx_x_max)) continue;
        xs.push_back(xf);
    }
    std::sort(xs.begin(), xs.end());
    xs.erase(std::unique(xs.begin(), xs.end()), xs.end());

    // Build segments: 32 segments, then iteratively nudge boundaries (without increasing global max).
    const int target_segments = 32;
    auto seg_ranges = build_adaptive_segments_deg4_hw_from_xs(xs, ulp, target_segments);
    // Recycle budget away from ulp_max==0 regions to reduce global ulp_max.
    // Allow merging of very-low-ULP neighbors (<=1) if it helps reduce the global max after re-splitting.
    recycle_budget_minimax(xs, seg_ranges, ulp, /*iters=*/24, /*min_points=*/8, /*split_candidates=*/63, /*merge_max_ulp=*/1);
    iterative_balance_boundaries(xs, seg_ranges, ulp, /*max_iters=*/15, /*min_points=*/8);
    std::vector<SegmentModel> models;
    models.reserve(seg_ranges.size());
    for (const auto& s : seg_ranges) models.push_back(s.m);

    struct SegmentReport {
        float x_lo = 0.0f;
        float x_hi = 0.0f;
        size_t n = 0;
        double ulp_mean = 0.0;
        int64_t ulp_max = 0;
        ErrStats err{};
        SegmentModel m{};
    };
    std::vector<SegmentReport> reports;
    reports.reserve(models.size());

    std::vector<int64_t> all_ulps;
    all_ulps.reserve(xs.size());
    std::vector<double> all_abs_errs;
    all_abs_errs.reserve(xs.size());
    std::vector<double> all_rel_errs;
    all_rel_errs.reserve(xs.size());
    size_t all_ref0_n = 0;

    // Evaluate final stats per segment.
    for (size_t si = 0; si < models.size(); ++si) {
        const auto& m = models[si];
        std::vector<int64_t> ulps;
        std::vector<double> abs_errs;
        std::vector<double> rel_errs;
        ulps.reserve(2048);
        abs_errs.reserve(2048);
        rel_errs.reserve(2048);
        size_t ref0_n = 0;

        for (float xf : xs) {
            if (xf < m.x_lo || xf > m.x_hi) continue;
            const float t = (xf - m.center) * m.inv_scale;
            const float yhat_f = eval_deg4_horner_f32(m.c, t);
            const bf16 yhat_b = bf16_from_f32_rne(yhat_f);
            const bf16 yref_b = gelu_ref_bf16_hw(static_cast<bf16>(xf));
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

        Stats s_ulps = summarize(std::move(ulps));
        ErrStats s_err = summarize_errors(abs_errs, rel_errs, ref0_n);

        SegmentReport r;
        r.x_lo = m.x_lo;
        r.x_hi = m.x_hi;
        r.n = s_ulps.n;
        r.ulp_mean = s_ulps.mean;
        r.ulp_max = s_ulps.max;
        r.err = s_err;
        r.m = m;
        reports.push_back(r);
    }

    Stats overall = summarize(std::move(all_ulps));
    ErrStats overall_err = summarize_errors(all_abs_errs, all_rel_errs, all_ref0_n);

    (*out) << "Per-segment error stats (vs y_ref_bf16; HW model evaluation):\n\n";
    (*out)
        << std::left
        << std::setw(4)  << "seg" << " "
        << std::setw(14) << "x_lo" << " "
        << std::setw(14) << "x_hi" << " "
        << std::right
        << std::setw(7)  << "n" << " "
        << std::setw(10) << "ulp_mean" << " "
        << std::setw(8)  << "ulp_max" << " "
        << std::setw(14) << "abs_mean" << " "
        << std::setw(14) << "abs_max" << " "
        << std::setw(14) << "rel_mean" << " "
        << std::setw(14) << "rel_max" << " "
        << std::setw(6)  << "ref0"
        << "\n";
    (*out) << std::string(132, '-') << "\n";

    for (size_t i = 0; i < reports.size(); ++i) {
        const auto& s = reports[i];
        (*out)
            << std::right << std::setw(4) << i << " "
            << fmt_sci(static_cast<double>(s.x_lo), 14, 6) << " "
            << fmt_sci(static_cast<double>(s.x_hi), 14, 6) << " "
            << fmt_u64(s.n, 7) << " "
            << fmt_fix(s.ulp_mean, 10, 3) << " "
            << fmt_i64(s.ulp_max, 8) << " "
            << fmt_sci(s.err.abs_mean, 14, 6) << " "
            << fmt_sci(s.err.abs_max, 14, 6) << " "
            << fmt_sci(s.err.rel_mean, 14, 6) << " "
            << fmt_sci(s.err.rel_max, 14, 6) << " "
            << fmt_u64(s.err.ref0_n, 6)
            << "\n";

        if (print_coeff) {
            (*out)
                << "     "
                << "center=" << fmt_sci(static_cast<double>(s.m.center), 14, 6)
                << "  inv_scale=" << fmt_sci(static_cast<double>(s.m.inv_scale), 14, 6)
                << "  c=["
                << fmt_sci(static_cast<double>(s.m.c[0]), 14, 6) << ", "
                << fmt_sci(static_cast<double>(s.m.c[1]), 14, 6) << ", "
                << fmt_sci(static_cast<double>(s.m.c[2]), 14, 6) << ", "
                << fmt_sci(static_cast<double>(s.m.c[3]), 14, 6) << ", "
                << fmt_sci(static_cast<double>(s.m.c[4]), 14, 6) << "]\n";
        }
    }

    (*out) << "\nOverall error stats (all non-saturated bf16 inputs):\n";
    (*out) << "  n=" << overall.n
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


