CXX = g++
CXXFLAGS = -std=c++23 -march=native -O2 -Wall

all: bf16_sim

bf16_sim: bf16_simulation.cpp bf16_layernorm_bw.cpp bf16_tolerance_tests.cpp
	$(CXX) $(CXXFLAGS) -o $@ $^

clean:
	rm -f bf16_sim

.PHONY: all clean