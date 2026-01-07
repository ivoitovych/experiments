I’ll outline a robust “golden” GELU reference (high precision, correctly rounded), then show how to measure BF16 saturation thresholds and ULP error in a reproducible way, including why your results can differ between runs/toolchains.


Нижче — підхід, який зазвичай “закриває” дві ваші проблеми одночасно: **(1) золотий/еталонний GELU з гарантовано високою точністю** і **(2) відтворювані межі насичення (saturation) до 0 та до `x` у BF16**, без “плаваючих” результатів між різними середовищами.

---

## 1) Специфікація GELU, яку варто зафіксувати як “reference truth”

Найчистіше визначення (без апроксимацій):

[
\mathrm{GELU}(x)=x\cdot \Phi(x), \quad
\Phi(x)=\frac12\left(1+\mathrm{erf}\left(\frac{x}{\sqrt2}\right)\right)
]

Але **для чисельної стабільності** (особливо в негативному хвості, де у вас і “скаче” нуль) треба уникати катастрофічного віднімання в `1+erf(…)` для від’ємних `x`. Тому як референс-формулу беруть через `erfc`:

* Для `x < 0`:
  [
  \Phi(x)=\frac12\mathrm{erfc}\left(\frac{-x}{\sqrt2}\right),
  \quad
  \mathrm{GELU}(x)=\frac12,x,\mathrm{erfc}\left(\frac{-x}{\sqrt2}\right)
  ]

* Для `x \ge 0` (щоб теж бути акуратним у хвості):
  [
  \Phi(x)=1-\frac12\mathrm{erfc}\left(\frac{x}{\sqrt2}\right),
  \quad
  \mathrm{GELU}(x)=x-\frac12,x,\mathrm{erfc}\left(\frac{x}{\sqrt2}\right)
  ]

Це ключ: **референс має бути стабільним у хвостах** навіть до моменту квантизації в BF16.

---

## 2) Чому ваші “межі насичення” різні щоразу

Найтиповіші причини, через які результати реально відрізняються:

1. **Ви (або бібліотека) використовуєте tanh-апроксимацію** замість exact `erf/erfc`. Вона в хвостах поводиться інакше (і “нуль” з’являється раніше/пізніше).

2. **Різна точність проміжних обчислень**:

   * “вхід BF16, але множення/акумуляція в FP32” (часто на акселераторах),
   * або “все в BF16 з округленням після кожної операції” (симулятор/мікрокод),
   * або “libm обчислює `erf` у double, а потім ви кастите”.

3. **FTZ/DAZ (flush-to-zero / denormals-are-zero)**:

   * якщо піднормали BF16 **флашаться до нуля**, поріг “стає нулем” істотно зміститься.

4. **Режим округлення** (RNE vs stochastic vs toward zero) та різні реалізації BF16 cast.

5. **“Reference” на double без гарантії правильної округленості**: `erf/erfc` з libm у `double` дуже хороші, але це *не* “correctly rounded” гарантія у всіх точках. А для порогів насичення цього вистачає, щоб інколи перескочити через BF16-пів-ULP.

Висновок: вам треба зафіксувати **одну** модель арифметики та **одну** референс-функцію, і вже від неї рахувати ULP.

---

## 3) “Золотий” референс GELU: MPFR + стабільна формула + пряме округлення в BF16

Якщо вам потрібен справді “reference implementation” для ULP-рейтингу, найпростіший шлях — **MPFR** (або Boost.Multiprecision + MPFR backend). MPFR дає правильно округлені `erfc/erf` у довільній точності.

### Мінімальна ідея

1. Обчислити GELU у MPFR з, скажімо, **≥ 200 біт** точності (часто 256 біт ставлять без думок).
2. **Округлити напряму в BF16** (не через double/float, щоб уникнути double-rounding у “граничних” точках).

Нижче — скелет на C++/MPFR. Він показує:

* стабільний розрахунок через `erfc`,
* ідею прямого квантування в BF16 (RNE, з піднормалами).

> Це “reference harness”, не оптимізований код.

```cpp
#include <mpfr.h>
#include <cstdint>
#include <cstring>
#include <cmath>

// --- BF16 encode (IEEE-like bfloat16, round-to-nearest-even, subnormals on) ---
static inline uint16_t bf16_from_f32_rne(float x) {
    uint32_t u;
    std::memcpy(&u, &x, sizeof(u));
    // Round-to-nearest-even to top 16 bits.
    uint32_t lsb = (u >> 16) & 1u;
    uint32_t rounding_bias = 0x7FFFu + lsb;      // ties-to-even
    u += rounding_bias;
    return (uint16_t)(u >> 16);
}

// (Опційно) декодер BF16 -> float
static inline float f32_from_bf16(uint16_t b) {
    uint32_t u = ((uint32_t)b) << 16;
    float x;
    std::memcpy(&x, &u, sizeof(x));
    return x;
}

// --- High-precision GELU in MPFR, returns float32 (you may then cast to BF16) ---
float gelu_mpfr_to_f32(float xin) {
    constexpr int PREC = 256; // bits
    mpfr_t x, t, erfcv, res, sqrt2;
    mpfr_inits2(PREC, x, t, erfcv, res, sqrt2, (mpfr_ptr)0);

    mpfr_set_flt(x, xin, MPFR_RNDN);
    mpfr_const_sqrt2(sqrt2, MPFR_RNDN);

    if (mpfr_sgn(x) < 0) {
        // res = 0.5 * x * erfc((-x)/sqrt2)
        mpfr_neg(t, x, MPFR_RNDN);
        mpfr_div(t, t, sqrt2, MPFR_RNDN);      // (-x)/sqrt2
        mpfr_erfc(erfcv, t, MPFR_RNDN);
        mpfr_mul(res, x, erfcv, MPFR_RNDN);
        mpfr_mul_2si(res, res, -1, MPFR_RNDN); // *0.5
    } else {
        // res = x - 0.5*x*erfc(x/sqrt2)
        mpfr_div(t, x, sqrt2, MPFR_RNDN);
        mpfr_erfc(erfcv, t, MPFR_RNDN);
        mpfr_mul(res, x, erfcv, MPFR_RNDN);
        mpfr_mul_2si(res, res, -1, MPFR_RNDN); // 0.5*x*erfc(...)
        mpfr_sub(res, x, res, MPFR_RNDN);
    }

    float out = mpfr_get_flt(res, MPFR_RNDN);

    mpfr_clears(x, t, erfcv, res, sqrt2, (mpfr_ptr)0);
    return out;
}

uint16_t gelu_reference_bf16(float xin) {
    float f = gelu_mpfr_to_f32(xin);     // high-quality intermediate
    return bf16_from_f32_rne(f);
}
```

### Важливий нюанс про “double rounding”

`MPFR -> float32 -> BF16` практично завжди ОК, але якщо ви хочете **абсолютно залізну** референс-округленість саме в BF16, тоді варто робити **MPFR → BF16 напряму** (без `float`). Це трохи довше в коді, зате математично безкомпромісно. Якщо потрібно — скажу як акуратно реалізувати пряме MPFR→BF16 (з нормалами/піднормалами/NaN/Inf).

---

## 4) Відтворювані пороги “saturation” у BF16 (за чітких припущень)

Я наведу пороги **за такими припущеннями**:

* формат BF16 як “IEEE-like bfloat16” (8-біт exponent, 7-біт fraction),
* округлення **round-to-nearest-even**,
* **піднормали дозволені** (не FTZ),
* нас цікавить результат, округлений у BF16 **в кінці** (не після кожної операції),
* GELU визначено як exact (x\Phi(x)) через `erfc` (як вище).

### 4.1. Коли (\Phi(x)) в BF16 стає рівно 1 (і GELU починає “дорівнювати x”)

У BF16 числа біля 1 мають крок (2^{-7}=0.0078125).
Найближче число нижче 1: (1-2^{-7}=0.9921875).
Отже, **межа округлення до 1** — середина:
[
\Phi(x) \ge 0.99609375 \Rightarrow \Phi_{bf16}(x)=1
]
Розв’язок:
[
x \ge \Phi^{-1}(0.99609375) \approx 2.6600674686
]
Тобто приблизно з **x ≥ 2.66** BF16-квантизований (\Phi) стає 1, і GELU (після округлення) дуже часто стає просто `x` (з урахуванням кінцевого округлення продукту).

### 4.2. Коли GELU у BF16 округлюється до “справжнього нуля” в негативному хвості

Мінімальний піднормал BF16:
[
2^{-133}\approx 9.18\cdot 10^{-41}
]
Округлення до нуля при RNE стається коли (|y| < 2^{-134}).

Для GELU в негативному хвості (y=-x\Phi(x)) (позитивна величина за модулем), поріг з рівняння:
[
-x\Phi(x)=2^{-134}
]
Чисельно це дає:
[
x \lesssim -13.5615204431
]
Тобто для **x ≤ −13.5615** GELU, округлений у BF16, стає **±0** (часто це буде `-0`, якщо зберігаєте знак; багато перевірок трактують `-0` як “true zero”).

### 4.3. Якщо у вас FTZ (піднормали флашаться в нуль)

Тоді “мінімальне ненульове” — це мінімальний **нормал** (2^{-126}), а межа округлення до 0 — (2^{-127}).
Рівняння:
[
-x\Phi(x)=2^{-127}
]
дає поріг приблизно:
[
x \lesssim -13.1988706591
]
Ось чому у вас “два дослідження — два різні результати”: **FTZ зміщує поріг десь на ~0.36 по x**, і це дуже типово між CPU/GPUs/акселераторами та різними режимами.

---

## 5) Як робити ULP-метрику в BF16 так, щоб не було сюрпризів

1. **Визначте, що є “еталоном”:**

   * “correctly rounded BF16 результат від exact real GELU” — найчистіше.
   * Тоді ULP рахуєте між **двома BF16 значеннями**: `approx_bf16` і `ref_bf16`.

2. **ULP distance для BF16**:

   * найнадійніше: порівнювати **бітові патерни** BF16 як “упорядковані” int’и (як роблять для float/double: flip sign bit для лексикографічного порядку).
   * Тоді ULP error = `abs(ord(approx) - ord(ref))`.

3. **Однаково симулюйте реальну арифметику вашого ядра**:

   * якщо в вашому TT/GPU множення BF16 з акумуляцією FP32 — симулюйте так само,
   * якщо у вас “round after every op to BF16” — це зовсім інша задача, і пороги/ULP будуть іншими.

---

## 6) Практична схема “дослідження”, яка зазвичай швидко приводить до стабільних результатів

1. Зробіть маленький standalone “golden” executable:

   * MPFR GELU (через `erfc`)
   * квантизація в BF16 (RNE, з перемикачем FTZ on/off)
   * вивід: `x`, `ref_bf16_bits`, `ref_bf16_value`

2. Для saturation-порогів:

   * бінарний пошук по `x` (у float32-решітці або у real) для першого `gelu_bf16 == 0`.
   * окремо — для “gelu_bf16 == x_bf16” на позитивному хвості.

3. Для апроксимації:

   * визначте діапазони, де можна **без втрат ULP** зробити hard clamp:

     * `x <= -13.5615` → 0 (або -0),
     * `x >= 2.6601` → `x` (у BF16 сенсі),
   * а в середині вже підбирайте поліном/раціональну апроксимацію під вашу реальну mixed-precision арифметику.

