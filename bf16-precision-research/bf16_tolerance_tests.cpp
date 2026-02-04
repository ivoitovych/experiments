#include "bf16_layernorm_bw.h"
#include "bf16_simulation.h"
#include "bf16_types.h"

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <cstdint>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <random>
#include <sstream>
#include <string>
#include <string_view>
#include <vector>

namespace {

using bf16_t = bf16::native_bf16;

struct ErrorStats {
  double max_abs{0.0};
  double mean_abs{0.0};
  double max_rel{0.0};
  double mean_rel{0.0};
};

static inline double rel_err(double abs_err, double ref) {
  constexpr double kEps = 1e-12;
  double denom = std::max(std::abs(ref), kEps);
  return abs_err / denom;
}

ErrorStats compare_vectors(const std::vector<float>& actual, const std::vector<float>& ref) {
  ErrorStats s;
  const std::size_t n = actual.size();
  double sum_abs = 0.0;
  double sum_rel = 0.0;
  for (std::size_t i = 0; i < n; ++i) {
    double a = static_cast<double>(actual[i]);
    double r = static_cast<double>(ref[i]);
    double ae = std::abs(a - r);
    double re = rel_err(ae, r);
    s.max_abs = std::max(s.max_abs, ae);
    s.max_rel = std::max(s.max_rel, re);
    sum_abs += ae;
    sum_rel += re;
  }
  s.mean_abs = sum_abs / static_cast<double>(n);
  s.mean_rel = sum_rel / static_cast<double>(n);
  return s;
}

ErrorStats compare_bf16_to_ref(
    const std::vector<bf16_t>& actual_bf16, const std::vector<float>& ref_fp32) {
  std::vector<float> actual_fp32(actual_bf16.size());
  for (std::size_t i = 0; i < actual_bf16.size(); ++i) {
    actual_fp32[i] = bf16::to_fp32(actual_bf16[i]);
  }
  return compare_vectors(actual_fp32, ref_fp32);
}

std::vector<bf16_t> to_bf16(const std::vector<float>& x) {
  std::vector<bf16_t> out(x.size());
  for (std::size_t i = 0; i < x.size(); ++i) out[i] = bf16::from_fp32(x[i]);
  return out;
}

std::vector<float> bf16_to_fp32(const std::vector<bf16_t>& x) {
  std::vector<float> out(x.size());
  for (std::size_t i = 0; i < x.size(); ++i) out[i] = bf16::to_fp32(x[i]);
  return out;
}

struct LnForwardParams {
  std::vector<float> mean;  // [rows]
  std::vector<float> rstd;  // [rows]
  std::vector<float> x_hat; // [rows, cols]
};

LnForwardParams layernorm_forward_fp32(const std::vector<float>& x, std::size_t rows, std::size_t cols) {
  LnForwardParams p;
  p.mean.resize(rows);
  p.rstd.resize(rows);
  p.x_hat.resize(rows * cols);
  constexpr float kEps = 1e-5f;

  for (std::size_t r = 0; r < rows; ++r) {
    double sum = 0.0;
    for (std::size_t c = 0; c < cols; ++c) sum += static_cast<double>(x[r * cols + c]);
    float mean = static_cast<float>(sum / static_cast<double>(cols));
    p.mean[r] = mean;

    double var_sum = 0.0;
    for (std::size_t c = 0; c < cols; ++c) {
      float d = x[r * cols + c] - mean;
      var_sum += static_cast<double>(d) * static_cast<double>(d);
    }
    float var = static_cast<float>(var_sum / static_cast<double>(cols));
    float rstd = 1.0f / std::sqrt(var + kEps);
    p.rstd[r] = rstd;

    for (std::size_t c = 0; c < cols; ++c) {
      p.x_hat[r * cols + c] = (x[r * cols + c] - mean) * rstd;
    }
  }
  return p;
}

struct LnBwRefOut {
  std::vector<float> dx;      // [rows, cols]
  std::vector<float> dgamma;  // [cols]
  std::vector<float> dbeta;   // [cols]
};

LnBwRefOut layernorm_bw_ref_fp32(
    const std::vector<float>& dy,
    const std::vector<float>& x_hat,
    const std::vector<float>& gamma,
    const std::vector<float>& rstd,
    std::size_t rows,
    std::size_t cols) {
  LnBwRefOut out;
  out.dx.resize(rows * cols);
  out.dgamma.assign(cols, 0.0f);
  out.dbeta.assign(cols, 0.0f);

  std::vector<float> dy_row(cols), xh_row(cols);

  for (std::size_t r = 0; r < rows; ++r) {
    for (std::size_t c = 0; c < cols; ++c) {
      dy_row[c] = dy[r * cols + c];
      xh_row[c] = x_hat[r * cols + c];
    }

    float s1 = bf16sim::dy_gamma_sum_fp32_fp32(dy_row, gamma);
    float s2 = bf16sim::dy_gamma_xnorm_sum_fp32_fp32(dy_row, gamma, xh_row);

    std::vector<float> dx_row;
    bf16sim::compute_dx_fp32_fp32(dy_row, gamma, xh_row, rstd[r], s1, s2, dx_row);
    for (std::size_t c = 0; c < cols; ++c) out.dx[r * cols + c] = dx_row[c];

    for (std::size_t c = 0; c < cols; ++c) {
      out.dgamma[c] += dy_row[c] * xh_row[c];
      out.dbeta[c] += dy_row[c];
    }
  }

  return out;
}

enum class InputType { kConstantOne, kUniformNeg1Pos1, kNormal01 };

std::string_view input_type_name(InputType t) {
  switch (t) {
    case InputType::kConstantOne:
      return "constant(1.0)";
    case InputType::kUniformNeg1Pos1:
      return "uniform(-1,1)";
    case InputType::kNormal01:
      return "normal(0,1)";
  }
  return "unknown";
}

std::vector<float> generate_vector(InputType t, std::size_t n, std::mt19937& rng) {
  std::vector<float> v(n);
  if (t == InputType::kConstantOne) {
    std::fill(v.begin(), v.end(), 1.0f);
    return v;
  }
  if (t == InputType::kUniformNeg1Pos1) {
    std::uniform_real_distribution<float> dist(-1.0f, 1.0f);
    for (auto& x : v) x = dist(rng);
    return v;
  }
  std::normal_distribution<float> dist(0.0f, 1.0f);
  for (auto& x : v) x = dist(rng);
  return v;
}

std::vector<std::size_t> default_feature_sizes() {
  return {32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 8462};
}

struct Tolerances {
  double atol_dx{0.0};
  double atol_dgamma{0.0};
  double atol_dbeta{0.0};
  double rtol{0.0};
  double non_aligned_multiplier{1.0};
};

void print_table_header(std::ostream& os, std::string_view title) {
  os << "\n## " << title << "\n\n";
}

}  // namespace

int main(int argc, char** argv) {
  std::string out_path;
  uint32_t seed = 1337;
  std::size_t trials = 50;

  for (int i = 1; i < argc; ++i) {
    std::string_view a(argv[i]);
    if (a == "--out" && i + 1 < argc) {
      out_path = argv[++i];
    } else if (a == "--seed" && i + 1 < argc) {
      seed = static_cast<uint32_t>(std::stoul(argv[++i]));
    } else if (a == "--trials" && i + 1 < argc) {
      trials = static_cast<std::size_t>(std::stoull(argv[++i]));
    } else if (a == "--help") {
      std::cout << "Usage: bf16_sim [--out RESULTS.md] [--seed N] [--trials N]\n";
      return 0;
    }
  }

  std::ostringstream report;
  report << "# BF16 tolerance research results\n\n";
  report << "- seed: " << seed << "\n";
  report << "- trials: " << trials << "\n";
  report << "- bf16 backend: " << (BF16_HAVE_STD_BFLOAT16 ? "`std::bfloat16_t`" : "`software bf16`") << "\n";

  std::mt19937 rng(seed);
  const auto Ns = default_feature_sizes();

  // --------------------------
  // Experiment 1: reduce_sum constant(1.0)
  // --------------------------
  print_table_header(report, "Experiment 1: reduce_sum accumulation error vs N (constant 1.0)");
  report << "| N | fp32-internal (bf16 out) abs_err | bf16-internal abs_err |\n";
  report << "|---:|---:|---:|\n";
  double exp1_max_abs_fp32 = 0.0;
  double exp1_max_abs_bf16 = 0.0;
  for (std::size_t n : Ns) {
    std::vector<bf16_t> data(n, bf16::from_fp32(1.0f));
    float ref = static_cast<float>(n);

    float fp32_out = bf16::to_fp32(bf16sim::reduce_sum_bf16_fp32(data.data(), n));
    float bf16_out = bf16::to_fp32(bf16sim::reduce_sum_bf16_bf16(data.data(), n));

    double err_fp32 = std::abs(static_cast<double>(fp32_out) - ref);
    double err_bf16 = std::abs(static_cast<double>(bf16_out) - ref);
    exp1_max_abs_fp32 = std::max(exp1_max_abs_fp32, err_fp32);
    exp1_max_abs_bf16 = std::max(exp1_max_abs_bf16, err_bf16);

    report << "| " << n << " | " << std::setprecision(10) << err_fp32 << " | " << err_bf16 << " |\n";
  }

  // --------------------------
  // Experiment 2: dy_gamma_sum error analysis
  // --------------------------
  print_table_header(report, "Experiment 2: dy_gamma_sum error (gamma=1.0) vs N and input distribution");
  report << "| N | input | fp32-internal max_abs | bf16-internal max_abs |\n";
  report << "|---:|---|---:|---:|\n";

  const std::vector<std::size_t> Ns2 = {2048, 4096, 8192, 8462};
  const std::vector<InputType> inputs = {
      InputType::kConstantOne, InputType::kUniformNeg1Pos1, InputType::kNormal01};

  double exp2_max_abs_fp32 = 0.0;
  double exp2_max_abs_bf16 = 0.0;

  for (std::size_t n : Ns2) {
    std::vector<float> gamma_f(n, 1.0f);
    auto gamma_b = to_bf16(gamma_f);

    for (InputType t : inputs) {
      double max_fp32 = 0.0;
      double max_bf16 = 0.0;
      for (std::size_t k = 0; k < trials; ++k) {
        auto dy_f = generate_vector(t, n, rng);
        auto dy_b = to_bf16(dy_f);

        float ref = bf16sim::dy_gamma_sum_fp32_fp32(dy_f, gamma_f);
        float fp32_out = bf16::to_fp32(bf16sim::dy_gamma_sum_bf16_fp32(dy_b.data(), gamma_b.data(), n));
        float bf16_out = bf16::to_fp32(bf16sim::dy_gamma_sum_bf16_bf16(dy_b.data(), gamma_b.data(), n));

        max_fp32 = std::max(max_fp32, std::abs(static_cast<double>(fp32_out) - ref));
        max_bf16 = std::max(max_bf16, std::abs(static_cast<double>(bf16_out) - ref));
      }

      exp2_max_abs_fp32 = std::max(exp2_max_abs_fp32, max_fp32);
      exp2_max_abs_bf16 = std::max(exp2_max_abs_bf16, max_bf16);

      report << "| " << n << " | " << input_type_name(t) << " | " << max_fp32 << " | " << max_bf16 << " |\n";
    }
  }

  // --------------------------
  // Experiment 3: full LayerNorm backward error
  // --------------------------
  print_table_header(report, "Experiment 3: LayerNorm backward error (dx, dgamma, dbeta)");
  report << "| N | rows | variant | dx max_abs | dgamma max_abs | dbeta max_abs |\n";
  report << "|---:|---:|---|---:|---:|---:|\n";

  const std::vector<std::size_t> rows_list = {1, 10, 100};

  double exp3_max_dx_fp32 = 0.0;
  double exp3_max_dg_fp32 = 0.0;
  double exp3_max_db_fp32 = 0.0;
  double exp3_max_dx_bf16 = 0.0;
  double exp3_max_dg_bf16 = 0.0;
  double exp3_max_db_bf16 = 0.0;

  for (std::size_t n : Ns2) {
    std::uniform_real_distribution<float> gamma_dist(0.5f, 1.5f);
    std::normal_distribution<float> x_dist(0.0f, 1.0f);
    std::normal_distribution<float> dy_dist(0.0f, 1.0f);

    for (std::size_t rows : rows_list) {
      // Generate fp32 inputs, then quantize to bf16 and use bf16->fp32 values as the reference input domain.
      std::vector<float> x_f(rows * n);
      std::vector<float> dy_f(rows * n);
      std::vector<float> gamma_f(n);

      for (auto& v : x_f) v = x_dist(rng);
      for (auto& v : dy_f) v = dy_dist(rng);
      for (auto& v : gamma_f) v = gamma_dist(rng);

      auto fw = layernorm_forward_fp32(x_f, rows, n);

      // Quantize inputs to bf16.
      bf16sim::LayerNormBwInputsBf16 in;
      in.rows = rows;
      in.cols = n;
      in.dy = to_bf16(dy_f);
      in.x_hat = to_bf16(fw.x_hat);
      in.gamma = to_bf16(gamma_f);
      in.rstd.resize(rows);
      for (std::size_t r = 0; r < rows; ++r) in.rstd[r] = bf16::from_fp32(fw.rstd[r]);

      // Reference uses bf16-quantized inputs cast back to fp32 (so only bf16 effects are from internal math).
      auto dy_ref = bf16_to_fp32(in.dy);
      auto xh_ref = bf16_to_fp32(in.x_hat);
      auto gamma_ref = bf16_to_fp32(in.gamma);
      std::vector<float> rstd_ref(rows);
      for (std::size_t r = 0; r < rows; ++r) rstd_ref[r] = bf16::to_fp32(in.rstd[r]);

      auto ref = layernorm_bw_ref_fp32(dy_ref, xh_ref, gamma_ref, rstd_ref, rows, n);

      auto out_fp32 = bf16sim::layernorm_bw_bf16_fp32(in);
      auto out_bf16 = bf16sim::layernorm_bw_bf16_bf16(in);

      // Compare dx
      {
        auto s = compare_bf16_to_ref(out_fp32.dx, ref.dx);
        exp3_max_dx_fp32 = std::max(exp3_max_dx_fp32, s.max_abs);
        report << "| " << n << " | " << rows << " | bf16_io_fp32_internal | " << s.max_abs;
        auto sg = compare_bf16_to_ref(out_fp32.dgamma, ref.dgamma);
        auto sb = compare_bf16_to_ref(out_fp32.dbeta, ref.dbeta);
        exp3_max_dg_fp32 = std::max(exp3_max_dg_fp32, sg.max_abs);
        exp3_max_db_fp32 = std::max(exp3_max_db_fp32, sb.max_abs);
        report << " | " << sg.max_abs << " | " << sb.max_abs << " |\n";
      }
      {
        auto s = compare_bf16_to_ref(out_bf16.dx, ref.dx);
        exp3_max_dx_bf16 = std::max(exp3_max_dx_bf16, s.max_abs);
        report << "| " << n << " | " << rows << " | bf16_io_bf16_internal | " << s.max_abs;
        auto sg = compare_bf16_to_ref(out_bf16.dgamma, ref.dgamma);
        auto sb = compare_bf16_to_ref(out_bf16.dbeta, ref.dbeta);
        exp3_max_dg_bf16 = std::max(exp3_max_dg_bf16, sg.max_abs);
        exp3_max_db_bf16 = std::max(exp3_max_db_bf16, sb.max_abs);
        report << " | " << sg.max_abs << " | " << sb.max_abs << " |\n";
      }
    }
  }

  // --------------------------
  // Experiment 4: tile-aligned vs non-aligned multiplier
  // --------------------------
  print_table_header(report, "Experiment 4: tile-aligned vs non-aligned (tile=32) multiplier");
  report << "| N | tile_aligned | variant | dx max_abs | dgamma max_abs | dbeta max_abs |\n";
  report << "|---:|---:|---|---:|---:|---:|\n";

  const std::size_t tile = 32;
  const std::vector<std::size_t> Ns4 = {8192, 8160, 8190, 8462};

  struct MaxErr3 {
    double dx{0.0};
    double dg{0.0};
    double db{0.0};
  };

  auto run_ln_case_maxerr = [&](std::size_t n, std::size_t rows, bool bf16_internal) -> MaxErr3 {
    std::uniform_real_distribution<float> gamma_dist(0.5f, 1.5f);
    std::normal_distribution<float> x_dist(0.0f, 1.0f);
    std::normal_distribution<float> dy_dist(0.0f, 1.0f);

    MaxErr3 m;
    for (std::size_t k = 0; k < trials; ++k) {
      std::vector<float> x_f(rows * n);
      std::vector<float> dy_f(rows * n);
      std::vector<float> gamma_f(n);
      for (auto& v : x_f) v = x_dist(rng);
      for (auto& v : dy_f) v = dy_dist(rng);
      for (auto& v : gamma_f) v = gamma_dist(rng);

      auto fw = layernorm_forward_fp32(x_f, rows, n);
      bf16sim::LayerNormBwInputsBf16 in;
      in.rows = rows;
      in.cols = n;
      in.dy = to_bf16(dy_f);
      in.x_hat = to_bf16(fw.x_hat);
      in.gamma = to_bf16(gamma_f);
      in.rstd.resize(rows);
      for (std::size_t r = 0; r < rows; ++r) in.rstd[r] = bf16::from_fp32(fw.rstd[r]);

      auto dy_ref = bf16_to_fp32(in.dy);
      auto xh_ref = bf16_to_fp32(in.x_hat);
      auto gamma_ref = bf16_to_fp32(in.gamma);
      std::vector<float> rstd_ref(rows);
      for (std::size_t r = 0; r < rows; ++r) rstd_ref[r] = bf16::to_fp32(in.rstd[r]);

      auto ref = layernorm_bw_ref_fp32(dy_ref, xh_ref, gamma_ref, rstd_ref, rows, n);

      auto out = bf16_internal ? bf16sim::layernorm_bw_bf16_bf16(in) : bf16sim::layernorm_bw_bf16_fp32(in);

      m.dx = std::max(m.dx, compare_bf16_to_ref(out.dx, ref.dx).max_abs);
      m.dg = std::max(m.dg, compare_bf16_to_ref(out.dgamma, ref.dgamma).max_abs);
      m.db = std::max(m.db, compare_bf16_to_ref(out.dbeta, ref.dbeta).max_abs);
    }
    return m;
  };

  // Use a moderate batch size to amplify reduction effects.
  const std::size_t rows4 = 100;
  MaxErr3 aligned_fp32, aligned_bf16;
  bool aligned_set = false;
  double non_aligned_mult = 1.0;

  for (std::size_t n : Ns4) {
    bool tile_aligned = (n % tile) == 0;
    auto fp32_m = run_ln_case_maxerr(n, rows4, /*bf16_internal=*/false);
    auto bf16_m = run_ln_case_maxerr(n, rows4, /*bf16_internal=*/true);

    report << "| " << n << " | " << (tile_aligned ? "true" : "false")
           << " | bf16_io_fp32_internal | " << fp32_m.dx << " | " << fp32_m.dg << " | " << fp32_m.db << " |\n";
    report << "| " << n << " | " << (tile_aligned ? "true" : "false")
           << " | bf16_io_bf16_internal | " << bf16_m.dx << " | " << bf16_m.dg << " | " << bf16_m.db << " |\n";

    if (tile_aligned && !aligned_set) {
      aligned_fp32 = fp32_m;
      aligned_bf16 = bf16_m;
      aligned_set = true;
      continue;
    }
    if (!tile_aligned && aligned_set) {
      // multiplier based on worst-output ratio, across both variants.
      auto update_mult = [&](double non_aligned, double aligned) {
        if (aligned > 0.0) non_aligned_mult = std::max(non_aligned_mult, non_aligned / aligned);
      };
      update_mult(fp32_m.dx, aligned_fp32.dx);
      update_mult(fp32_m.dg, aligned_fp32.dg);
      update_mult(fp32_m.db, aligned_fp32.db);
      update_mult(bf16_m.dx, aligned_bf16.dx);
      update_mult(bf16_m.dg, aligned_bf16.dg);
      update_mult(bf16_m.db, aligned_bf16.db);
    }
  }

  // --------------------------
  // Recommended tolerances (simple, empirical, with headroom)
  // --------------------------
  print_table_header(report, "Recommended tolerances (empirical, with headroom)");

  Tolerances tol;
  // Conservative: use worst-case across experiments 2-4 for each output (for the fp32-internal variant),
  // then add headroom. dx tends to be larger than the scalar reductions.
  tol.atol_dx = std::max(exp3_max_dx_fp32, 1.25 * exp2_max_abs_fp32) * 1.25;
  tol.atol_dgamma = exp3_max_dg_fp32 * 1.25;
  tol.atol_dbeta = exp3_max_db_fp32 * 1.25;
  tol.rtol = 0.0;  // absolute tolerances are usually more stable for bf16-quantized outputs
  tol.non_aligned_multiplier = non_aligned_mult;

  report << "- `atol_dx`: " << tol.atol_dx << "\n";
  report << "- `atol_dgamma`: " << tol.atol_dgamma << "\n";
  report << "- `atol_dbeta`: " << tol.atol_dbeta << "\n";
  report << "- `rtol`: " << tol.rtol << "\n";
  report << "- `non_aligned_multiplier`: " << tol.non_aligned_multiplier << "\n\n";

  report << "Suggested C++ helper:\n\n";
  report << "```cpp\n";
  report << "struct LayerNormBwTolerances {\n";
  report << "    float atol_dx;\n";
  report << "    float atol_dgamma;\n";
  report << "    float atol_dbeta;\n";
  report << "    float rtol;\n";
  report << "    float non_aligned_multiplier;\n";
  report << "};\n\n";
  report << "inline LayerNormBwTolerances get_tolerances(size_t features, bool tile_aligned) {\n";
  report << "    LayerNormBwTolerances t{\n";
  report << "        " << static_cast<float>(tol.atol_dx) << "f,\n";
  report << "        " << static_cast<float>(tol.atol_dgamma) << "f,\n";
  report << "        " << static_cast<float>(tol.atol_dbeta) << "f,\n";
  report << "        " << static_cast<float>(tol.rtol) << "f,\n";
  report << "        " << static_cast<float>(tol.non_aligned_multiplier) << "f,\n";
  report << "    };\n";
  report << "    if (!tile_aligned) {\n";
  report << "        t.atol_dx *= t.non_aligned_multiplier;\n";
  report << "        t.atol_dgamma *= t.non_aligned_multiplier;\n";
  report << "        t.atol_dbeta *= t.non_aligned_multiplier;\n";
  report << "    }\n";
  report << "    (void)features; // placeholder: can be used to scale by features if desired\n";
  report << "    return t;\n";
  report << "}\n";
  report << "```\n";

  const std::string report_str = report.str();
  if (!out_path.empty()) {
    std::ofstream ofs(out_path, std::ios::binary);
    ofs << report_str;
    ofs.close();
  }

  std::cout << report_str;
  return 0;
}

