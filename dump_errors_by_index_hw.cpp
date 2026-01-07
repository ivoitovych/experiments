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

static std::vector<SegmentModel> fit_piecewise_deg4_hw(const Bounds& b, int segments) {
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

    std::vector<SegmentModel> segs;
    segs.reserve(static_cast<size_t>(segments));

    const double x_min = static_cast<double>(approx_x_min);
    const double x_max = static_cast<double>(approx_x_max);
    std::vector<double> bps(static_cast<size_t>(segments + 1));
    for (int s = 0; s <= segments; ++s) {
        bps[static_cast<size_t>(s)] = x_min + (x_max - x_min) * (static_cast<double>(s) / static_cast<double>(segments));
    }

    for (int s = 0; s < segments; ++s) {
        const double lo = bps[static_cast<size_t>(s)];
        const double hi = bps[static_cast<size_t>(s + 1)];

        std::vector<float> seg_x;
        seg_x.reserve(xs.size() / static_cast<size_t>(segments) + 64);
        for (float xf : xs) {
            const double xd = static_cast<double>(xf);
            if ((s < segments - 1 && xd >= lo && xd < hi) || (s == segments - 1 && xd >= lo && xd <= hi)) {
                seg_x.push_back(xf);
            }
        }
        if (seg_x.empty()) {
            segs.push_back(SegmentModel{});
            continue;
        }

        const float seg_min = *std::min_element(seg_x.begin(), seg_x.end());
        const float seg_max = *std::max_element(seg_x.begin(), seg_x.end());
        const float center = 0.5f * (seg_min + seg_max);
        const float half_w = 0.5f * (seg_max - seg_min);
        const float inv_scale = (half_w > 0.0f) ? (1.0f / half_w) : 0.0f;

        std::vector<float> ts;
        std::vector<float> ys;
        ts.reserve(seg_x.size());
        ys.reserve(seg_x.size());
        for (float xf : seg_x) {
            const float t = (xf - center) * inv_scale;
            const bf16 xb = static_cast<bf16>(xf);
            const bf16 yb = gelu_ref_bf16_hw(xb);
            ts.push_back(t);
            ys.push_back(static_cast<float>(yb));
        }

        SegmentModel m;
        m.center = center;
        m.inv_scale = inv_scale;
        m.x_lo = seg_min;
        m.x_hi = seg_max;
        m.c = fit_deg4_poly_t(ts, ys);
        segs.push_back(m);
    }

    return segs;
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
                              const std::vector<int64_t>& ulp,
                              const std::vector<double>& abs_e,
                              const std::vector<double>& rel_e) {
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
    write_js_array_int("ULP", ulp);
    write_js_array_double_nullable("ABS", abs_e, /*null_if_zero=*/true);
    write_js_array_double_nullable("REL", rel_e, /*null_if_zero=*/true);

    f << "const traces = [\n";
    f << "{x:X,y:ULP,type:'scattergl',mode:'lines',name:'ULP error',xaxis:'x',yaxis:'y'},\n";
    f << "{x:X,y:ABS,type:'scattergl',mode:'lines',name:'abs error',xaxis:'x2',yaxis:'y2'},\n";
    f << "{x:X,y:REL,type:'scattergl',mode:'lines',name:'rel error',xaxis:'x3',yaxis:'y3'}\n";
    f << "];\n";
    f << "const layout = {\n";
    f << "grid:{rows:3,columns:1,pattern:'independent'},\n";
    f << "height:900,\n";
    f << "xaxis:{title:'bf16 value index (ULP ordering; finite only)'} ,\n";
    f << "yaxis:{title:'ULP error (|idx(ref)-idx(approx)|)'} ,\n";
    f << "xaxis2:{title:'bf16 value index'} ,\n";
    f << "yaxis2:{title:'abs error',type:'log'} ,\n";
    f << "xaxis3:{title:'bf16 value index'} ,\n";
    f << "yaxis3:{title:'rel error (|e|/|ref|)',type:'log'} ,\n";
    f << "legend:{orientation:'h'},\n";
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
    const auto segs = fit_piecewise_deg4_hw(b, /*segments=*/8);

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

    int64_t finite_seq = 0;
    for (int64_t ulp_idx = 0; ulp_idx < static_cast<int64_t>(ulp.total_values()); ++ulp_idx) {
        const uint16_t xbits = ulp.bits_at_index(ulp_idx);
        if (bf16_is_inf_bits(xbits)) continue; // exclude infinities
        const bf16 x = ulp.value_at_index(ulp_idx);

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
        U.push_back(ulp_err);
        A.push_back(abs_err);
        R.push_back(rel_err);

        ++finite_seq;
    }

    try {
        write_plotly_html(out_html, X, U, A, R);
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


