# Makefile — convenience entry points for the writer's toolbox.
#
# Common usage:
#
#   make setup                       one-time: create .venv, install
#                                    playwright + chromium.
#   make lint                        run source-level lint.
#   make progress                    regenerate PROGRESS.md from status
#                                    blocks.
#   make screenshots CHAPTER=path    capture per-section screenshots of
#                                    one chapter into .artifacts/.
#   make clean-artifacts             delete review screenshots.
#
# Lint and progress do not need the venv. Screenshots do, because they
# depend on playwright; `make screenshots` will run `make setup`
# automatically the first time.

VENV     := .venv
PY       := $(VENV)/bin/python
PIP      := $(VENV)/bin/pip
SYS_PY   := python3

.PHONY: help setup lint progress screenshots clean-artifacts

help: ## Show available targets.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?##/ \
	    {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: $(VENV)/.installed ## One-time: create .venv, install playwright + chromium.

$(VENV)/.installed:
	$(SYS_PY) -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install playwright
	$(VENV)/bin/playwright install chromium
	@touch $(VENV)/.installed

lint: ## Run tools/lint.py — fast, no venv needed.
	$(SYS_PY) tools/lint.py

progress: ## Regenerate PROGRESS.md from chapter status blocks.
	$(SYS_PY) scripts/generate_progress.py

screenshots: setup ## Capture screenshots. Usage: make screenshots CHAPTER=<path.md>
	@if [ -z "$(CHAPTER)" ]; then \
	    echo "usage: make screenshots CHAPTER=<path/to/chapter.md>"; \
	    exit 2; \
	fi
	$(PY) tools/screenshots.py $(CHAPTER)

clean-artifacts: ## Delete review screenshots under .artifacts/.
	rm -rf .artifacts/screenshots
