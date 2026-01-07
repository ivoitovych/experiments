#include "gelu_ref.h"
#include "ulp_calculator.h"

#include <algorithm>
#include <array>
#include <cmath>
#include <cstdint>
#include <cstring>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <string>
#include <vector>

using bf16 = std::bfloat16_t;

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

static inline bf16 gelu_ref_bf16_hw(bf16 x_bf16) {
    const float xf = static_cast<float>(x_bf16);
    const double yd = gelu_ref_fp64(static_cast<double>(xf));
    const float yf = static_cast<float>(yd);
    return bf16_from_f32_rne(yf);
}

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

    // Sort all finite bf16 bit patterns by numeric order key, find saturation thresholds under HW ref.
    struct Entry { uint16_t bits; uint16_t key; };
    std::vector<Entry> es;
    es.reserve(65536);
    for (uint32_t i = 0; i < 65536; ++i) {
        uint16_t bits = static_cast<uint16_t>(i);
        if (ULP_Calculator::is_nan_bits_public(bits) || bf16_is_inf_bits(bits)) continue;
        const bool sign = (bits & 0x8000u) != 0;
        uint16_t key = static_cast<uint16_t>(bits ^ (sign ? 0xFFFFu : 0x8000u));
        es.push_back({bits, key});
    }
    std::sort(es.begin(), es.end(), [](const Entry& a, const Entry& b){ return a.key < b.key; });

    bool saw_zero = false;
    for (size_t i = 0; i < es.size(); ++i) {
        bf16 x = ULP_Calculator::bits_to_bf16_public(es[i].bits);
        if (static_cast<double>(x) >= 0.0) break;
        bf16 y = gelu_ref_bf16_hw(x);
        if (static_cast<float>(y) == 0.0f) {
            out.neg_last_zero_x = x;
            saw_zero = true;
        } else if (saw_zero) {
            out.neg_first_nonzero_x = x;
            break;
        }
    }

    bool saw_identity = false;
    for (size_t ri = es.size(); ri-- > 0;) {
        bf16 x = ULP_Calculator::bits_to_bf16_public(es[ri].bits);
        if (static_cast<double>(x) <= 0.0) break;
        bf16 y = gelu_ref_bf16_hw(x);
        if (y == x) {
            out.pos_first_identity_x = x;
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

struct SegmentFitStats {
    int64_t ulp_max = 0;
    double ulp_mean = 0.0;
    size_t n = 0;
};

struct SegmentRange {
    int lo = 0; // index into xs[]
    int hi = 0; // inclusive
    SegmentModel model{};
    SegmentFitStats stats{};
};

// Forward declaration (used by boundary balancer).
static SegmentRange fit_one_range_hw(const std::vector<float>& xs,
                                    int lo,
                                    int hi,
                                    const ULP_Calculator& ulp);

struct Objective {
    int64_t max_ulp = 0;
    double stddev_log = 0.0;
};

static Objective objective_active_log(const std::vector<SegmentRange>& segs) {
    Objective o{};
    if (segs.empty()) return o;
    int64_t mx = 0;
    std::vector<double> v;
    v.reserve(segs.size());
    for (const auto& s : segs) {
        mx = std::max(mx, s.stats.ulp_max);
        if (s.stats.ulp_max > 0) v.push_back(std::log1p(static_cast<double>(s.stats.ulp_max)));
    }
    o.max_ulp = mx;
    if (v.size() <= 1) { o.stddev_log = 0.0; return o; }
    double mean = 0.0;
    for (double x : v) mean += x;
    mean /= static_cast<double>(v.size());
    double var = 0.0;
    for (double x : v) { const double d = x - mean; var += d * d; }
    var /= static_cast<double>(v.size());
    o.stddev_log = std::sqrt(var);
    return o;
}

static bool better_obj(const Objective& a, const Objective& b) {
    if (a.max_ulp != b.max_ulp) return a.max_ulp < b.max_ulp;
    return a.stddev_log < b.stddev_log;
}

static void balance_boundaries(std::vector<float>& xs,
                               std::vector<SegmentRange>& segs,
                               const ULP_Calculator& ulp,
                               int max_iters = 15,
                               int min_points = 8) {
    if (segs.size() < 2) return;
    auto refit = [&](int idx) {
        auto& s = segs[static_cast<size_t>(idx)];
        s = fit_one_range_hw(xs, s.lo, s.hi, ulp);
    };
    for (size_t i = 0; i < segs.size(); ++i) {
        if (i > 0) segs[i].lo = segs[i - 1].hi + 1;
        if (i + 1 < segs.size()) segs[i].hi = segs[i + 1].lo - 1;
        refit(static_cast<int>(i));
    }
    Objective best = objective_active_log(segs);
    const int64_t hard_max_cap = best.max_ulp;

    for (int it = 0; it < max_iters; ++it) {
        bool any = false;
        for (int b = 0; b < static_cast<int>(segs.size()) - 1; ++b) {
            const int left_len = segs[static_cast<size_t>(b)].hi - segs[static_cast<size_t>(b)].lo + 1;
            const int right_len = segs[static_cast<size_t>(b + 1)].hi - segs[static_cast<size_t>(b + 1)].lo + 1;
            if (left_len < min_points || right_len < min_points) continue;

            const int cur_hi_left = segs[static_cast<size_t>(b)].hi;
            int best_new_hi_left = cur_hi_left;
            SegmentRange best_left = segs[static_cast<size_t>(b)];
            SegmentRange best_right = segs[static_cast<size_t>(b + 1)];
            Objective local_best = best;

            for (int dir : {-1, +1}) {
              for (int step = 1; step <= 16; ++step) {
                const int new_hi_left = cur_hi_left + dir * step;
                if (new_hi_left < segs[static_cast<size_t>(b)].lo + min_points - 1) continue;
                if (new_hi_left > segs[static_cast<size_t>(b + 1)].hi - min_points) continue;

                SegmentRange left = segs[static_cast<size_t>(b)];
                SegmentRange right = segs[static_cast<size_t>(b + 1)];
                left.hi = new_hi_left;
                right.lo = new_hi_left + 1;
                left = fit_one_range_hw(xs, left.lo, left.hi, ulp);
                right = fit_one_range_hw(xs, right.lo, right.hi, ulp);

                std::vector<SegmentRange> tmp = segs;
                tmp[static_cast<size_t>(b)] = left;
                tmp[static_cast<size_t>(b + 1)] = right;
                const Objective obj = objective_active_log(tmp);
                if (obj.max_ulp > hard_max_cap) continue;
                if (better_obj(obj, local_best)) {
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

static SegmentRange fit_one_range_hw(const std::vector<float>& xs,
                                    int lo,
                                    int hi,
                                    const ULP_Calculator& ulp) {
    SegmentRange out;
    out.lo = lo;
    out.hi = hi;
    if (lo > hi || lo < 0 || hi >= static_cast<int>(xs.size())) return out;

    const float x_lo = xs[static_cast<size_t>(lo)];
    const float x_hi = xs[static_cast<size_t>(hi)];
    out.model.x_lo = x_lo;
    out.model.x_hi = x_hi;
    out.model.center = 0.5f * (x_lo + x_hi);
    const float half_w = 0.5f * (x_hi - x_lo);
    out.model.inv_scale = (half_w > 0.0f) ? (1.0f / half_w) : 0.0f;

    const int n = hi - lo + 1;
    out.stats.n = static_cast<size_t>(n);

    // If too few points or zero-width, fallback to constant polynomial at t=0.
    if (n < 6 || out.model.inv_scale == 0.0f) {
        const bf16 xb = static_cast<bf16>(x_lo);
        const bf16 yb = gelu_ref_bf16_hw(xb);
        out.model.c = {static_cast<float>(yb), 0.f, 0.f, 0.f, 0.f};
        out.stats.ulp_max = 0;
        out.stats.ulp_mean = 0.0;
        for (int i = lo; i <= hi; ++i) {
            const bf16 x = static_cast<bf16>(xs[static_cast<size_t>(i)]);
            const bf16 yref = gelu_ref_bf16_hw(x);
            const bf16 yhat = bf16_from_f32_rne(out.model.c[0]);
            const int64_t e = ulp.ulp_distance(yref, yhat);
            out.stats.ulp_max = std::max(out.stats.ulp_max, e);
            out.stats.ulp_mean += static_cast<double>(e);
        }
        out.stats.ulp_mean /= static_cast<double>(n);
        return out;
    }

    std::vector<float> ts;
    std::vector<float> ys;
    ts.reserve(static_cast<size_t>(n));
    ys.reserve(static_cast<size_t>(n));
    for (int i = lo; i <= hi; ++i) {
        const float xf = xs[static_cast<size_t>(i)];
        const float t = (xf - out.model.center) * out.model.inv_scale;
        const bf16 xb = static_cast<bf16>(xf);
        const bf16 yb = gelu_ref_bf16_hw(xb);
        ts.push_back(t);
        ys.push_back(static_cast<float>(yb));
    }

    out.model.c = fit_deg4_poly_t(ts, ys);

    int64_t max_e = 0;
    double sum_e = 0.0;
    for (int i = lo; i <= hi; ++i) {
        const float xf = xs[static_cast<size_t>(i)];
        const float t = (xf - out.model.center) * out.model.inv_scale;
        const float yhat_f = eval_deg4_horner_f32(out.model.c, t);
        const bf16 yhat = bf16_from_f32_rne(yhat_f);
        const bf16 yref = gelu_ref_bf16_hw(static_cast<bf16>(xf));
        const int64_t e = ulp.ulp_distance(yref, yhat);
        max_e = std::max(max_e, e);
        sum_e += static_cast<double>(e);
    }
    out.stats.ulp_max = max_e;
    out.stats.ulp_mean = sum_e / static_cast<double>(n);
    return out;
}

static std::vector<SegmentModel> fit_piecewise_deg4_hw_adaptive(const Bounds& b,
                                                               const ULP_Calculator& ulp,
                                                               int target_segments) {
    const float approx_x_min = static_cast<float>(b.neg_first_nonzero_x);
    const float approx_x_max = static_cast<float>(b.pos_last_mismatch_x);

    // Gather all finite bf16 x in approximation region.
    std::vector<float> xs;
    xs.reserve(40000);
    for (int64_t idx = 0; idx < static_cast<int64_t>(65536); ++idx) {
        uint16_t bits = static_cast<uint16_t>(idx);
        if (ULP_Calculator::is_nan_bits_public(bits) || bf16_is_inf_bits(bits)) continue;
        const bf16 xb = ULP_Calculator::bits_to_bf16_public(bits);
        const float xf = static_cast<float>(xb);
        if (xf < approx_x_min || xf > approx_x_max) continue;
        xs.push_back(xf);
    }
    std::sort(xs.begin(), xs.end());
    xs.erase(std::unique(xs.begin(), xs.end()), xs.end());

    std::vector<SegmentRange> segs;
    segs.reserve(static_cast<size_t>(target_segments));

    const int n = static_cast<int>(xs.size());
    if (n <= 0) return {};
    segs.push_back(fit_one_range_hw(xs, 0, n - 1, ulp));

    // Segment placement optimization (same as piecewise tool):
    // choose the split that minimizes the *global* worst-case ulp_max after refit.
    constexpr int kMinPoints = 8;
    constexpr int kCandidates = 31;
    while (static_cast<int>(segs.size()) < target_segments) {
        int best_seg = -1;
        int best_mid = -1;
        Objective best_obj{std::numeric_limits<int64_t>::max(), std::numeric_limits<double>::infinity()};

        for (int si = 0; si < static_cast<int>(segs.size()); ++si) {
            const int lo = segs[static_cast<size_t>(si)].lo;
            const int hi = segs[static_cast<size_t>(si)].hi;
            const int len = hi - lo + 1;
            if (len < 2 * kMinPoints) continue;

            int64_t other_max = 0;
            for (int sj = 0; sj < static_cast<int>(segs.size()); ++sj) {
                if (sj == si) continue;
                other_max = std::max(other_max, segs[static_cast<size_t>(sj)].stats.ulp_max);
            }

            auto candidate_obj = [&](int64_t left_max, int64_t right_max) -> Objective {
                Objective o{};
                o.max_ulp = std::max(other_max, std::max(left_max, right_max));
                std::vector<double> vals;
                vals.reserve(segs.size() + 1);
                for (int sj = 0; sj < static_cast<int>(segs.size()); ++sj) {
                    if (sj == si) continue;
                    const int64_t m = segs[static_cast<size_t>(sj)].stats.ulp_max;
                    if (m > 0) vals.push_back(std::log1p(static_cast<double>(m)));
                }
                if (left_max > 0) vals.push_back(std::log1p(static_cast<double>(left_max)));
                if (right_max > 0) vals.push_back(std::log1p(static_cast<double>(right_max)));
                if (vals.size() <= 1) { o.stddev_log = 0.0; return o; }
                double mean = 0.0;
                for (double v : vals) mean += v;
                mean /= static_cast<double>(vals.size());
                double var = 0.0;
                for (double v : vals) { const double d = v - mean; var += d * d; }
                var /= static_cast<double>(vals.size());
                o.stddev_log = std::sqrt(var);
                return o;
            };

            for (int c = 1; c <= kCandidates; ++c) {
                const int mid = lo + (len * c) / (kCandidates + 1);
                if (mid - lo + 1 < kMinPoints) continue;
                if (hi - (mid + 1) + 1 < kMinPoints) continue;
                SegmentRange left = fit_one_range_hw(xs, lo, mid, ulp);
                SegmentRange right = fit_one_range_hw(xs, mid + 1, hi, ulp);
                const Objective obj = candidate_obj(left.stats.ulp_max, right.stats.ulp_max);
                if (better_obj(obj, best_obj)) { best_obj = obj; best_mid = mid; best_seg = si; }
            }
        }

        if (best_seg < 0 || best_mid < 0) break;

        const int lo = segs[static_cast<size_t>(best_seg)].lo;
        const int hi = segs[static_cast<size_t>(best_seg)].hi;
        SegmentRange left = fit_one_range_hw(xs, lo, best_mid, ulp);
        SegmentRange right = fit_one_range_hw(xs, best_mid + 1, hi, ulp);

        segs[static_cast<size_t>(best_seg)] = left;
        segs.insert(segs.begin() + best_seg + 1, right);
    }

    // Post-process: locally adjust boundaries to improve uniformity of ulp_max
    // while keeping the global max fixed.
    balance_boundaries(xs, segs, ulp, /*max_iters=*/15, /*min_points=*/8);

    std::vector<SegmentModel> out;
    out.reserve(segs.size());
    for (const auto& s : segs) out.push_back(s.model);
    return out;
}

static inline int pick_segment(float xf, const std::vector<SegmentModel>& segs) {
    // segments are in ascending x; choose first segment with xf <= x_hi, else last.
    for (int i = 0; i < static_cast<int>(segs.size()); ++i) {
        if (xf <= segs[static_cast<size_t>(i)].x_hi) return i;
    }
    return static_cast<int>(segs.size()) - 1;
}

static bf16 gelu_piecewise_deg4_hw(bf16 x_bf16,
                                  const Bounds& b,
                                  const std::vector<SegmentModel>& segs) {
    const float xf = static_cast<float>(x_bf16);
    const float neg_zero_sat = static_cast<float>(b.neg_last_zero_x);
    const float pos_identity = static_cast<float>(b.pos_first_identity_x);

    if (xf <= neg_zero_sat) {
        return bf16_from_f32_rne(0.0f);
    }
    if (xf >= pos_identity) {
        return x_bf16;
    }

    const float approx_x_min = static_cast<float>(b.neg_first_nonzero_x);
    const float approx_x_max = static_cast<float>(b.pos_last_mismatch_x);
    if (xf < approx_x_min) {
        // Between "last zero" and "first nonzero" there are typically no bf16 values,
        // but for safety clamp to 0.
        return bf16_from_f32_rne(0.0f);
    }
    if (xf > approx_x_max) {
        // Between "last mismatch" and "first identity", clamp to x (since ref is identity there).
        return x_bf16;
    }

    const int s = pick_segment(xf, segs);
    const auto& m = segs[static_cast<size_t>(s)];
    const float t = (xf - m.center) * m.inv_scale;
    const float yhat = eval_deg4_horner_f32(m.c, t);
    return bf16_from_f32_rne(yhat);
}

static void write_plotly_html(const std::string& path,
                              const std::vector<int64_t>& xs,
                              const std::vector<double>& xvals,
                              const std::vector<int64_t>& ulp,
                              const std::vector<double>& abs_e,
                              const std::vector<double>& rel_e,
                              const std::vector<std::pair<int64_t, std::string>>& markers,
                              const std::vector<std::tuple<int64_t, int64_t, std::string>>& bands,
                              const std::vector<std::pair<double, std::string>>& markers_x,
                              const std::vector<std::tuple<double, double, std::string>>& bands_x,
                              double x_view_min,
                              double x_view_max) {
    std::ofstream f(path, std::ios::binary);
    if (!f) throw std::runtime_error("Failed to open HTML output: " + path);

    auto write_js_array_int = [&](const char* name, const std::vector<int64_t>& v) {
        f << "const " << name << " = [";
        for (size_t i = 0; i < v.size(); ++i) {
            if (i) f << ",";
            f << v[i];
        }
        f << "];\n";
    };
    auto write_js_array_double_nullable = [&](const char* name, const std::vector<double>& v, bool null_if_zero) {
        f << "const " << name << " = [";
        for (size_t i = 0; i < v.size(); ++i) {
            if (i) f << ",";
            const double x = v[i];
            if (std::isnan(x) || std::isinf(x) || (null_if_zero && x == 0.0)) {
                f << "null";
            } else {
                f << std::setprecision(17) << x;
            }
        }
        f << "];\n";
    };

    f << "<!doctype html><html><head><meta charset=\"utf-8\"/>\n";
    f << "<title>GELU piecewise errors vs bf16 index</title>\n";
    f << "<script src=\"https://cdn.plot.ly/plotly-2.27.0.min.js\"></script>\n";
    f << "<style>body{font-family:sans-serif;margin:12px;} #plot{width:100%;height:92vh;}</style>\n";
    f << "</head><body>\n";
    f << "<h3>GELU piecewise (deg4, 8 segments) error vs bf16 value index</h3>\n";
    f << "<div id=\"plot\"></div>\n";
    f << "<script>\n";
    write_js_array_int("X", xs);
    write_js_array_double_nullable("XF", xvals, /*null_if_zero=*/false);
    write_js_array_int("ULP", ulp);
    write_js_array_double_nullable("ABS", abs_e, /*null_if_zero=*/true);
    write_js_array_double_nullable("REL", rel_e, /*null_if_zero=*/true);

    f << "const traces = [\n";
    // Left column: vs index
    f << "{x:X,y:ULP,type:'scattergl',mode:'lines',name:'ULP vs idx',xaxis:'x',yaxis:'y'},\n";
    f << "{x:X,y:ABS,type:'scattergl',mode:'lines',name:'abs vs idx',xaxis:'x3',yaxis:'y3'},\n";
    f << "{x:X,y:REL,type:'scattergl',mode:'lines',name:'rel vs idx',xaxis:'x5',yaxis:'y5'},\n";
    // Right column: vs numeric x value
    f << "{x:XF,y:ULP,type:'scattergl',mode:'lines',name:'ULP vs x',xaxis:'x2',yaxis:'y2'},\n";
    f << "{x:XF,y:ABS,type:'scattergl',mode:'lines',name:'abs vs x',xaxis:'x4',yaxis:'y4'},\n";
    f << "{x:XF,y:REL,type:'scattergl',mode:'lines',name:'rel vs x',xaxis:'x6',yaxis:'y6'}\n";
    f << "];\n";

    // Shapes: vertical markers + shaded bands, repeated for each subplot.
    f << "const shapes = [];\n";
    auto emit_band_i = [&](const char* xref, const char* yref, int64_t x0, int64_t x1, const char* fill) {
        f << "shapes.push({type:'rect',xref:'" << xref << "',yref:'" << yref
          << "',x0:" << x0 << ",x1:" << x1 << ",y0:0,y1:1,fillcolor:'" << fill
          << "',opacity:0.08,line:{width:0}});\n";
    };
    auto emit_band_x = [&](const char* xref, const char* yref, double x0, double x1, const char* fill) {
        f << "shapes.push({type:'rect',xref:'" << xref << "',yref:'" << yref
          << "',x0:" << std::setprecision(17) << x0 << ",x1:" << std::setprecision(17) << x1
          << ",y0:0,y1:1,fillcolor:'" << fill << "',opacity:0.08,line:{width:0}});\n";
    };
    auto emit_line_i = [&](const char* xref, const char* yref, int64_t x, const char* color, int width) {
        f << "shapes.push({type:'line',xref:'" << xref << "',yref:'" << yref
          << "',x0:" << x << ",x1:" << x << ",y0:0,y1:1,line:{color:'" << color
          << "',width:" << width << "}});\n";
    };
    auto emit_line_x = [&](const char* xref, const char* yref, double x, const char* color, int width) {
        f << "shapes.push({type:'line',xref:'" << xref << "',yref:'" << yref
          << "',x0:" << std::setprecision(17) << x << ",x1:" << std::setprecision(17) << x
          << ",y0:0,y1:1,line:{color:'" << color << "',width:" << width << "}});\n";
    };

    // Bands: tuples of (start_idx, end_idx, label). Alternate colors for readability.
    f << "// Shaded bands for saturation + segments\n";
    for (size_t i = 0; i < bands.size(); ++i) {
        const int64_t x0 = std::get<0>(bands[i]);
        const int64_t x1 = std::get<1>(bands[i]);
        const char* fill = (i % 2 == 0) ? "rgba(31,119,180,1)" : "rgba(255,127,14,1)";
        emit_band_i("x", "y domain", x0, x1, fill);   // row1 col1
        emit_band_i("x3", "y3 domain", x0, x1, fill); // row2 col1
        emit_band_i("x5", "y5 domain", x0, x1, fill); // row3 col1
    }
    for (size_t i = 0; i < bands_x.size(); ++i) {
        const double x0 = std::get<0>(bands_x[i]);
        const double x1 = std::get<1>(bands_x[i]);
        const char* fill = (i % 2 == 0) ? "rgba(31,119,180,1)" : "rgba(255,127,14,1)";
        emit_band_x("x2", "y2 domain", x0, x1, fill); // row1 col2
        emit_band_x("x4", "y4 domain", x0, x1, fill); // row2 col2
        emit_band_x("x6", "y6 domain", x0, x1, fill); // row3 col2
    }

    // Markers: vertical lines at key boundaries.
    f << "// Vertical boundary markers\n";
    for (const auto& m : markers) {
        const int64_t xi = m.first;
        emit_line_i("x", "y domain", xi, "rgba(0,0,0,0.35)", 1);
        emit_line_i("x3", "y3 domain", xi, "rgba(0,0,0,0.35)", 1);
        emit_line_i("x5", "y5 domain", xi, "rgba(0,0,0,0.35)", 1);
    }
    for (const auto& m : markers_x) {
        const double xv = m.first;
        emit_line_x("x2", "y2 domain", xv, "rgba(0,0,0,0.35)", 1);
        emit_line_x("x4", "y4 domain", xv, "rgba(0,0,0,0.35)", 1);
        emit_line_x("x6", "y6 domain", xv, "rgba(0,0,0,0.35)", 1);
    }

    // Annotations (only on the top subplot to reduce clutter).
    f << "const annotations = [];\n";
    for (const auto& m : markers) {
        // Skip per-segment labels (too many when segment count is large).
        if (m.second.rfind("seg ", 0) == 0) continue;
        f << "annotations.push({xref:'x',yref:'y domain',x:" << m.first
          << ",y:1.02,showarrow:false,text:" << std::quoted(m.second)
          << ",font:{size:10,color:'rgba(0,0,0,0.65)'},xanchor:'left'});\n";
    }
    for (const auto& m : markers_x) {
        if (m.second.rfind("seg ", 0) == 0) continue;
        f << "annotations.push({xref:'x2',yref:'y2 domain',x:" << std::setprecision(17) << m.first
          << ",y:1.02,showarrow:false,text:" << std::quoted(m.second)
          << ",font:{size:10,color:'rgba(0,0,0,0.65)'},xanchor:'left'});\n";
    }

    f << "const layout = {\n";
    f << "grid:{rows:3,columns:2,pattern:'independent'},\n";
    f << "height:950,\n";
    // Row 1: ULP
    f << "xaxis:{title:'bf16 index (finite-only ULP order)'} ,\n";
    f << "yaxis:{title:'ULP error'} ,\n";
    f << "xaxis2:{title:'x value (bf16)',range:[" << std::setprecision(17) << x_view_min << "," << std::setprecision(17) << x_view_max << "]} ,\n";
    f << "yaxis2:{title:'ULP error'} ,\n";
    // Row 2: abs
    f << "xaxis3:{title:'bf16 index'} ,\n";
    f << "yaxis3:{title:'abs error',type:'log'} ,\n";
    f << "xaxis4:{title:'x value (bf16)',range:[" << std::setprecision(17) << x_view_min << "," << std::setprecision(17) << x_view_max << "]} ,\n";
    f << "yaxis4:{title:'abs error',type:'log'} ,\n";
    // Row 3: rel
    f << "xaxis5:{title:'bf16 index'} ,\n";
    f << "yaxis5:{title:'rel error (|e|/|ref|)',type:'log'} ,\n";
    f << "xaxis6:{title:'x value (bf16)',range:[" << std::setprecision(17) << x_view_min << "," << std::setprecision(17) << x_view_max << "]} ,\n";
    f << "yaxis6:{title:'rel error (|e|/|ref|)',type:'log'} ,\n";
    f << "legend:{orientation:'h'},\n";
    f << "shapes:shapes,\n";
    f << "annotations:annotations,\n";
    f << "margin:{l:70,r:20,t:30,b:60}\n";
    f << "};\n";
    f << "Plotly.newPlot('plot', traces, layout, {responsive:true});\n";
    f << "</script>\n";
    f << "<p>Note: abs/rel plots use log scale; zeros are omitted (shown as gaps).</p>\n";
    f << "</body></html>\n";
}

int main(int argc, char** argv) {
    const std::string out_csv = (argc >= 2) ? argv[1] : "run_logs/errors_by_index_hw.csv";
    const std::string out_html = (argc >= 3) ? argv[2] : "run_logs/errors_by_index_hw.html";

    ULP_Calculator ulp;
    const Bounds b = compute_bounds_fullscan_hw();
    const auto segs = fit_piecewise_deg4_hw_adaptive(b, ulp, /*target_segments=*/32);

    std::ofstream csv(out_csv);
    if (!csv) {
        std::cerr << "Failed to open CSV output: " << out_csv << "\n";
        return 2;
    }

    csv << "finite_seq_idx,ulp_idx,x_bits,x_f,ref_bits,ref_f,approx_bits,approx_f,ulp_err,abs_err,rel_err\n";

    std::vector<int64_t> X;
    std::vector<int64_t> U;
    std::vector<double> A;
    std::vector<double> R;
    std::vector<double> XF;

    // Interval markers/bands (in terms of index ranges).
    std::vector<std::pair<int64_t, std::string>> markers;
    std::vector<std::tuple<int64_t, int64_t, std::string>> bands;
    std::vector<std::pair<double, std::string>> markers_x;
    std::vector<std::tuple<double, double, std::string>> bands_x;

    int64_t finite_seq = 0;
    int current_region = -9999;
    int64_t region_start = 0;
    float region_x_start = 0.0f;
    float last_xf = 0.0f;
    int64_t last_seq = -1;

    auto region_label = [&](int rid, float x0, float x1) -> std::string {
        std::ostringstream oss;
        oss.setf(std::ios::scientific);
        oss << std::setprecision(6);
        if (rid == -1) {
            oss << "sat(y=0): [" << x0 << ", " << x1 << "]";
        } else if (rid == -2) {
            oss << "sat(y=x): [" << x0 << ", " << x1 << "]";
        } else {
            oss << "seg " << rid << ": [" << x0 << ", " << x1 << "]";
        }
        return oss.str();
    };

    for (int64_t ulp_idx = 0; ulp_idx < static_cast<int64_t>(ulp.total_values()); ++ulp_idx) {
        const uint16_t xbits = ulp.bits_at_index(ulp_idx);
        if (bf16_is_inf_bits(xbits)) continue; // exclude infinities
        const bf16 x = ulp.value_at_index(ulp_idx);
        const float xf = static_cast<float>(x);

        const bf16 yref = gelu_ref_bf16_hw(x);
        const bf16 yhat = gelu_piecewise_deg4_hw(x, b, segs);

        const int64_t ulp_err = ulp.ulp_distance(yref, yhat);
        const float yref_f = static_cast<float>(yref);
        const float yhat_f = static_cast<float>(yhat);
        const double abs_err = std::abs(static_cast<double>(yhat_f) - static_cast<double>(yref_f));
        const double rel_err = (yref_f != 0.0f) ? (abs_err / std::abs(static_cast<double>(yref_f)))
                                                : std::numeric_limits<double>::quiet_NaN();

        const uint16_t yref_bits = ULP_Calculator::bf16_to_bits_public(yref);
        const uint16_t yhat_bits = ULP_Calculator::bf16_to_bits_public(yhat);

        csv << finite_seq << "," << ulp_idx
            << ",0x" << std::hex << std::setw(4) << std::setfill('0') << xbits << std::dec
            << "," << std::setprecision(9) << std::scientific << static_cast<double>(static_cast<float>(x))
            << ",0x" << std::hex << std::setw(4) << std::setfill('0') << yref_bits << std::dec
            << "," << std::setprecision(9) << std::scientific << static_cast<double>(yref_f)
            << ",0x" << std::hex << std::setw(4) << std::setfill('0') << yhat_bits << std::dec
            << "," << std::setprecision(9) << std::scientific << static_cast<double>(yhat_f)
            << "," << ulp_err
            << "," << std::setprecision(17) << std::scientific << abs_err
            << "," << std::setprecision(17) << std::scientific << rel_err
            << "\n";

        X.push_back(finite_seq);
        XF.push_back(static_cast<double>(xf));
        U.push_back(ulp_err);
        A.push_back(abs_err);
        R.push_back(rel_err);

        // Determine region id for interval banding:
        // -1: negative saturation y==0 region
        // -2: positive saturation y==x region
        // 0..7: approximation segments
        int rid = 0;
        if (xf <= static_cast<float>(b.neg_last_zero_x)) {
            rid = -1;
        } else if (xf >= static_cast<float>(b.pos_first_identity_x)) {
            rid = -2;
        } else {
            rid = pick_segment(xf, segs);
        }

        if (current_region == -9999) {
            current_region = rid;
            region_start = finite_seq;
            region_x_start = xf;
        } else if (rid != current_region) {
            // close previous band [region_start, finite_seq-1]
            bands.emplace_back(region_start, finite_seq - 1, region_label(current_region, region_x_start, last_xf));
            bands_x.emplace_back(static_cast<double>(region_x_start), static_cast<double>(last_xf),
                                 region_label(current_region, region_x_start, last_xf));
            // marker at transition
            markers.emplace_back(finite_seq, region_label(rid, xf, xf));
            markers_x.emplace_back(static_cast<double>(xf), region_label(rid, xf, xf));
            current_region = rid;
            region_start = finite_seq;
            region_x_start = xf;
        }
        last_xf = xf;
        last_seq = finite_seq;

        ++finite_seq;
    }

    if (last_seq >= 0) {
        bands.emplace_back(region_start, last_seq, region_label(current_region, region_x_start, last_xf));
        bands_x.emplace_back(static_cast<double>(region_x_start), static_cast<double>(last_xf),
                             region_label(current_region, region_x_start, last_xf));
    }

    // Add explicit saturation boundary markers with x-limits (on top of the automatic region markers).
    {
        std::ostringstream oss;
        oss.setf(std::ios::scientific);
        oss << std::setprecision(6);
        oss << "neg sat ends at x=" << static_cast<float>(b.neg_last_zero_x)
            << " (next nonzero x=" << static_cast<float>(b.neg_first_nonzero_x) << ")";
        markers.emplace_back(0, oss.str()); // shown as a note; not a true vertical boundary
        markers_x.emplace_back(static_cast<double>(static_cast<float>(b.neg_last_zero_x)), oss.str());
    }
    {
        std::ostringstream oss;
        oss.setf(std::ios::scientific);
        oss << std::setprecision(6);
        oss << "pos identity starts at x=" << static_cast<float>(b.pos_first_identity_x)
            << " (last mismatch x=" << static_cast<float>(b.pos_last_mismatch_x) << ")";
        markers.emplace_back(static_cast<int64_t>(X.size() > 0 ? X.back() : 0), oss.str());
        markers_x.emplace_back(static_cast<double>(static_cast<float>(b.pos_first_identity_x)), oss.str());
    }

    // x=0 marker (NOT a segment boundary; for orientation only).
    {
        int64_t idx0 = 0;
        for (size_t i = 0; i < XF.size(); ++i) {
            if (XF[i] >= 0.0) { idx0 = static_cast<int64_t>(X[i]); break; }
        }
        markers.emplace_back(idx0, "x=0 (marker only)");
        markers_x.emplace_back(0.0, "x=0 (marker only)");
    }


    // Right-side plots: restrict x-axis range to the saturation/transition window (+/- 10% padding).
    // We interpret "saturation range" as the interesting interval bounded by:
    //   neg_last_zero_x   (last x where ref rounds to 0)
    //   pos_first_identity_x (first x where ref rounds to identity for all larger bf16)
    // Then expand by 10% of the window width on each side.
    const double sat_x_min = static_cast<double>(static_cast<float>(b.neg_last_zero_x));
    const double sat_x_max = static_cast<double>(static_cast<float>(b.pos_first_identity_x));
    const double w = sat_x_max - sat_x_min;
    const double pad = 0.10 * w;
    double x_view_min = sat_x_min - pad;
    double x_view_max = sat_x_max + pad;

    try {
        write_plotly_html(out_html, X, XF, U, A, R, markers, bands, markers_x, bands_x, x_view_min, x_view_max);
    } catch (const std::exception& e) {
        std::cerr << "Failed to write HTML: " << e.what() << "\n";
        return 3;
    }

    std::cout << "Wrote:\n";
    std::cout << "  CSV : " << out_csv << "\n";
    std::cout << "  HTML: " << out_html << "\n";
    std::cout << "Points (finite bf16 inputs): " << finite_seq << "\n";
    return 0;
}


