#include "bf16_layernorm_bw.h"

#include <cstddef>
#include <vector>

#include "bf16_simulation.h"

namespace bf16sim {

using bf16_t = bf16::native_bf16;

static inline std::size_t idx(std::size_t r, std::size_t c, std::size_t cols) {
  return r * cols + c;
}

// Notes:
// - This intentionally mirrors the decomposition in the research doc:
//   dy_gamma_sum and dy_gamma_xnorm_sum are row-wise scalars (per row).
// - dgamma/dbeta are reduced across rows (batch).

LayerNormBwOutputsBf16 layernorm_bw_bf16_fp32(const LayerNormBwInputsBf16& in) {
  LayerNormBwOutputsBf16 out;
  out.dx.resize(in.rows * in.cols);
  out.dgamma.assign(in.cols, bf16::from_fp32(0.0f));
  out.dbeta.assign(in.cols, bf16::from_fp32(0.0f));

  // dgamma/dbeta in fp32 accum, quantize to bf16 at end.
  std::vector<float> dgamma_acc(in.cols, 0.0f);
  std::vector<float> dbeta_acc(in.cols, 0.0f);

  for (std::size_t r = 0; r < in.rows; ++r) {
    const bf16_t* dy_row = &in.dy[idx(r, 0, in.cols)];
    const bf16_t* xh_row = &in.x_hat[idx(r, 0, in.cols)];

    bf16_t s1 = dy_gamma_sum_bf16_fp32(dy_row, in.gamma.data(), in.cols);
    bf16_t s2 = dy_gamma_xnorm_sum_bf16_fp32(dy_row, in.gamma.data(), xh_row, in.cols);

    compute_dx_bf16_fp32(
        dy_row,
        in.gamma.data(),
        xh_row,
        in.rstd[r],
        s1,
        s2,
        in.cols,
        &out.dx[idx(r, 0, in.cols)]);

    // dgamma += dy * x_hat, dbeta += dy
    for (std::size_t c = 0; c < in.cols; ++c) {
      const float dy_f = bf16::to_fp32(dy_row[c]);
      dgamma_acc[c] += dy_f * bf16::to_fp32(xh_row[c]);
      dbeta_acc[c] += dy_f;
    }
  }

  for (std::size_t c = 0; c < in.cols; ++c) {
    out.dgamma[c] = bf16::from_fp32(dgamma_acc[c]);
    out.dbeta[c] = bf16::from_fp32(dbeta_acc[c]);
  }

  return out;
}

LayerNormBwOutputsBf16 layernorm_bw_bf16_bf16(const LayerNormBwInputsBf16& in) {
  LayerNormBwOutputsBf16 out;
  out.dx.resize(in.rows * in.cols);
  out.dgamma.assign(in.cols, bf16::from_fp32(0.0f));
  out.dbeta.assign(in.cols, bf16::from_fp32(0.0f));

  for (std::size_t r = 0; r < in.rows; ++r) {
    const bf16_t* dy_row = &in.dy[idx(r, 0, in.cols)];
    const bf16_t* xh_row = &in.x_hat[idx(r, 0, in.cols)];

    bf16_t s1 = dy_gamma_sum_bf16_bf16(dy_row, in.gamma.data(), in.cols);
    bf16_t s2 = dy_gamma_xnorm_sum_bf16_bf16(dy_row, in.gamma.data(), xh_row, in.cols);

    compute_dx_bf16_bf16(
        dy_row,
        in.gamma.data(),
        xh_row,
        in.rstd[r],
        s1,
        s2,
        in.cols,
        &out.dx[idx(r, 0, in.cols)]);

    // dgamma += dy * x_hat, dbeta += dy with bf16 accum
    for (std::size_t c = 0; c < in.cols; ++c) {
      out.dgamma[c] = bf16::add(out.dgamma[c], bf16::mul(dy_row[c], xh_row[c]));
      out.dbeta[c] = bf16::add(out.dbeta[c], dy_row[c]);
    }
  }

  return out;
}

}  // namespace bf16sim

