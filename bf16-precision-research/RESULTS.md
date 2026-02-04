# BF16 tolerance research results

- seed: 1337
- trials: 50
- bf16 backend: `std::bfloat16_t`

## Experiment 1: reduce_sum accumulation error vs N (constant 1.0)

| N | fp32-internal (bf16 out) abs_err | bf16-internal abs_err |
|---:|---:|---:|
| 32 | 0 | 0 |
| 64 | 0 | 0 |
| 128 | 0 | 0 |
| 256 | 0 | 0 |
| 512 | 0 | 256 |
| 1024 | 0 | 768 |
| 2048 | 0 | 1792 |
| 4096 | 0 | 3840 |
| 8192 | 0 | 7936 |
| 8462 | 14 | 8206 |

## Experiment 2: dy_gamma_sum error (gamma=1.0) vs N and input distribution

| N | input | fp32-internal max_abs | bf16-internal max_abs |
|---:|---|---:|---:|
| 2048 | constant(1.0) | 0 | 0.875 |
| 2048 | uniform(-1,1) | 7.397215813e-05 | 0.001817658544 |
| 2048 | normal(0,1) | 0.0001834072173 | 0.003542613238 |
| 4096 | constant(1.0) | 0 | 0.9375 |
| 4096 | uniform(-1,1) | 7.051974535e-05 | 0.003777165897 |
| 4096 | normal(0,1) | 0.0001317486167 | 0.005014561117 |
| 8192 | constant(1.0) | 0 | 0.96875 |
| 8192 | uniform(-1,1) | 3.27816233e-05 | 0.003555814736 |
| 8192 | normal(0,1) | 4.751607776e-05 | 0.002521915361 |
| 8462 | constant(1.0) | 5.960464478e-08 | 0.9697265029 |
| 8462 | uniform(-1,1) | 3.481842577e-05 | 0.002820894122 |
| 8462 | normal(0,1) | 7.303245366e-05 | 0.006359653547 |

## Experiment 3: LayerNorm backward error (dx, dgamma, dbeta)

| N | rows | variant | dx max_abs | dgamma max_abs | dbeta max_abs |
|---:|---:|---|---:|---:|---:|
| 2048 | 1 | bf16_io_fp32_internal | 0.007749557495 | 0.01440429688 | 0 |
| 2048 | 1 | bf16_io_bf16_internal | 0.02519035339 | 0.01440429688 | 0 |
| 2048 | 10 | bf16_io_fp32_internal | 0.0155711174 | 0.03035831451 | 0.0263671875 |
| 2048 | 10 | bf16_io_bf16_internal | 0.02624464035 | 0.0848941803 | 0.0615234375 |
| 2048 | 100 | bf16_io_fp32_internal | 0.01562023163 | 0.1238746643 | 0.1102294922 |
| 2048 | 100 | bf16_io_bf16_internal | 0.04739713669 | 0.70353508 | 0.6688232422 |
| 4096 | 1 | bf16_io_fp32_internal | 0.01069784164 | 0.015625 | 0 |
| 4096 | 1 | bf16_io_bf16_internal | 0.03288841248 | 0.015625 | 0 |
| 4096 | 10 | bf16_io_fp32_internal | 0.01542568207 | 0.03118133545 | 0.0302734375 |
| 4096 | 10 | bf16_io_bf16_internal | 0.0350985527 | 0.1115894318 | 0.07183837891 |
| 4096 | 100 | bf16_io_fp32_internal | 0.01552820206 | 0.1201858521 | 0.1246948242 |
| 4096 | 100 | bf16_io_bf16_internal | 0.0504193306 | 0.7492694855 | 0.9906005859 |
| 8192 | 1 | bf16_io_fp32_internal | 0.01423740387 | 0.015625 | 0 |
| 8192 | 1 | bf16_io_bf16_internal | 0.03351020813 | 0.015625 | 0 |
| 8192 | 10 | bf16_io_fp32_internal | 0.015209198 | 0.03096961975 | 0.03076171875 |
| 8192 | 10 | bf16_io_bf16_internal | 0.03730297089 | 0.1260261536 | 0.1118164062 |
| 8192 | 100 | bf16_io_fp32_internal | 0.01563119888 | 0.1099243164 | 0.1159934998 |
| 8192 | 100 | bf16_io_bf16_internal | 0.0442533493 | 0.8154525757 | 0.8913574219 |
| 8462 | 1 | bf16_io_fp32_internal | 0.01480865479 | 0.0263671875 | 0 |
| 8462 | 1 | bf16_io_bf16_internal | 0.02594280243 | 0.0263671875 | 0 |
| 8462 | 10 | bf16_io_fp32_internal | 0.01561975479 | 0.03114318848 | 0.03125 |
| 8462 | 10 | bf16_io_bf16_internal | 0.0397105217 | 0.112739563 | 0.09375 |
| 8462 | 100 | bf16_io_fp32_internal | 0.01567411423 | 0.1103973389 | 0.1195678711 |
| 8462 | 100 | bf16_io_bf16_internal | 0.04476356506 | 1.41601181 | 0.7910766602 |

## Experiment 4: tile-aligned vs non-aligned (tile=32) multiplier

| N | tile_aligned | variant | dx max_abs | dgamma max_abs | dbeta max_abs |
|---:|---:|---|---:|---:|---:|
| 8192 | true | bf16_io_fp32_internal | 0.01567935944 | 0.1244468689 | 0.1248168945 |
| 8192 | true | bf16_io_bf16_internal | 0.05926370621 | 1.55065155 | 1.560913086 |
| 8160 | true | bf16_io_fp32_internal | 0.01569414139 | 0.1248626709 | 0.1247253418 |
| 8160 | true | bf16_io_bf16_internal | 0.06113767624 | 1.208175659 | 1.185791016 |
| 8190 | false | bf16_io_fp32_internal | 0.01581764221 | 0.1249961853 | 0.1248779297 |
| 8190 | false | bf16_io_bf16_internal | 0.0581202507 | 1.302463531 | 1.373596191 |
| 8462 | false | bf16_io_fp32_internal | 0.01572990417 | 0.1248092651 | 0.1247558594 |
| 8462 | false | bf16_io_bf16_internal | 0.0582857132 | 1.449687958 | 1.202636719 |

## Recommended tolerances (empirical, with headroom)

- `atol_dx`: 0.01959264278
- `atol_dgamma`: 0.1548433304
- `atol_dbeta`: 0.1558685303
- `rtol`: 0
- `non_aligned_multiplier`: 1.008819415

Suggested C++ helper:

```cpp
struct LayerNormBwTolerances {
    float atol_dx;
    float atol_dgamma;
    float atol_dbeta;
    float rtol;
    float non_aligned_multiplier;
};

inline LayerNormBwTolerances get_tolerances(size_t features, bool tile_aligned) {
    LayerNormBwTolerances t{
        0.01959264278f,
        0.1548433304f,
        0.1558685303f,
        0f,
        1.008819461f,
    };
    if (!tile_aligned) {
        t.atol_dx *= t.non_aligned_multiplier;
        t.atol_dgamma *= t.non_aligned_multiplier;
        t.atol_dbeta *= t.non_aligned_multiplier;
    }
    (void)features; // placeholder: can be used to scale by features if desired
    return t;
}
```
