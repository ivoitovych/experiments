#include <iostream>
#include <iomanip>
#include <stdfloat>
#include <cmath>
#include <limits>

using namespace std;

// Make bf16 type usage explicit and consistent across the project.
using bfloat16_t = std::bfloat16_t;

int main() {
    cout << "Testing std::bfloat16_t support in G++ 13.3.0 with C++23" << endl;
    cout << "==========================================================" << endl;

    // Basic type information
    cout << "\nBasic type information:" << endl;
    cout << "sizeof(bfloat16_t): " << sizeof(bfloat16_t) << " bytes" << endl;
    cout << "numeric_limits<bfloat16_t>::min(): " << numeric_limits<bfloat16_t>::min() << endl;
    cout << "numeric_limits<bfloat16_t>::max(): " << numeric_limits<bfloat16_t>::max() << endl;
    cout << "numeric_limits<bfloat16_t>::epsilon(): " << numeric_limits<bfloat16_t>::epsilon() << endl;
    cout << "numeric_limits<bfloat16_t>::digits: " << numeric_limits<bfloat16_t>::digits << endl;
    cout << "numeric_limits<bfloat16_t>::digits10: " << numeric_limits<bfloat16_t>::digits10 << endl;

    // Test basic operations
    cout << "\nBasic arithmetic operations:" << endl;
    bfloat16_t a = 1.5f;
    bfloat16_t b = 2.25f;
    cout << fixed << setprecision(6);
    cout << "a = " << a << " (bfloat16_t)" << endl;
    cout << "b = " << b << " (bfloat16_t)" << endl;
    cout << "a + b = " << (a + b) << endl;
    cout << "a - b = " << (a - b) << endl;
    cout << "a * b = " << (a * b) << endl;
    cout << "a / b = " << (a / b) << endl;

    // Test conversion to/from float
    cout << "\nType conversions:" << endl;
    float fa = 3.14159f;
    bfloat16_t ba = fa;
    float fb = ba;
    cout << "Original float: " << fa << endl;
    cout << "Converted to bfloat16_t: " << ba << endl;
    cout << "Converted back to float: " << fb << endl;
    cout << "Precision loss: " << fabs(fa - fb) << endl;

    // Test special values
    cout << "\nSpecial values:" << endl;
    bfloat16_t zero = 0.0f;
    bfloat16_t inf_val = numeric_limits<bfloat16_t>::infinity();
    bfloat16_t nan_val = numeric_limits<bfloat16_t>::quiet_NaN();

    cout << "zero: " << zero << endl;
    cout << "infinity: " << inf_val << endl;
    cout << "NaN: " << nan_val << endl;
    cout << "isinf(inf): " << isinf(inf_val) << endl;
    cout << "isnan(nan): " << isnan(nan_val) << endl;

    // Test mathematical functions
    cout << "\nMathematical functions:" << endl;
    bfloat16_t x = 0.5f;
    cout << "x = " << x << endl;
    cout << "sqrt(x) = " << sqrt(x) << endl;
    cout << "exp(x) = " << exp(x) << endl;
    cout << "log(x) = " << log(x) << endl;
    cout << "erf(x) = " << erf(x) << endl;  // Important for GELU

    cout << "\n✅ std::bfloat16_t test completed successfully!" << endl;
    return 0;
}
