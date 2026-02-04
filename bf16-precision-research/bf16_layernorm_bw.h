#pragma once

#include "bf16_types.h"

#include <cstddef>
#include <vector>

namespace bf16sim {

using bf16_t = bf16::native_bf16;

struct LayerNormBwInputsBf16 {
  std::size_t rows{0};
  std::size_t cols{0};

  std::vector<bf16_t> dy;     // [rows, cols]
  std::vector<bf16_t> x_hat;  // [rows, cols]
  std::vector<bf16_t> gamma;  // [cols]
  std::vector<bf16_t> rstd;   // [rows]
};

struct LayerNormBwOutputsBf16 {
  std::vector<bf16_t> dx;      // [rows, cols]
  std::vector<bf16_t> dgamma;  // [cols]
  std::vector<bf16_t> dbeta;   // [cols]
};

LayerNormBwOutputsBf16 layernorm_bw_bf16_fp32(const LayerNormBwInputsBf16& in);
LayerNormBwOutputsBf16 layernorm_bw_bf16_bf16(const LayerNormBwInputsBf16& in);

}  // namespace bf16sim

