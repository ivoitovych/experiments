# bfloat16_t compiler support (quick notes)

This branch captures a small set of repro files used to check C++23 `std::bfloat16_t` / `<stdfloat>` support across compilers on Windows + WSL.

## Files

- `main.cpp`: Hello world.
- `test_bf16.cpp`: Minimal `std::bfloat16_t` usage (`#include <stdfloat>`).
- `wsl_clang_bf16_check.cpp`: Same as above, also prints `__cpp_lib_stdfloat` if present.

## What worked on this machine

### Git Bash (MSYS2 g++)

- g++ from MSYS2 (UCRT) supported `std::bfloat16_t` with `-std=c++23`.

Build:

```bash
g++ -std=c++23 test_bf16.cpp -o test_bf16 && ./test_bf16
```

### WSL (Ubuntu 24.04) – GCC

- `g++` (13.x) supported `std::bfloat16_t` with `-std=c++23`.

```bash
g++ -std=c++23 test_bf16.cpp -o test_bf16 && ./test_bf16
```

### WSL (Ubuntu 24.04) – Clang

- Even after installing `clang-20`, `libc++-18-dev`, `libc++-20-dev` (and matching `libc++abi` packages), `std::bfloat16_t` was not usable with Clang on this setup:
  - With default libstdc++: `std::bfloat16_t` was not defined.
  - With `-stdlib=libc++`: `<stdfloat>` header was not found (Ubuntu-packaged libc++ here does not ship it).

Workaround with Clang: use the builtin `__bf16` (non-standard), or use GCC for `std::bfloat16_t`.

## Notes

- `std::bfloat16_t` is a C++23 standard library feature exposed via `<stdfloat>`, so the result depends on both the compiler and the standard library (libstdc++ vs libc++).
