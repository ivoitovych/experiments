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

.PHONY: help setup setup-system-deps lint progress index screenshots render-gist clean-artifacts figures figures-setup check-examples book

help: ## Show available targets.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?##/ \
	    {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: $(VENV)/.installed ## One-time: create .venv, install playwright + chromium.

setup-system-deps: $(VENV)/.installed ## One-time (sudo): install Chromium's system libraries.
	@echo "Installing Chromium system dependencies via apt (sudo required)..."
	sudo $(VENV)/bin/playwright install-deps chromium

$(VENV)/.installed:
	@if ! python3 -c "import ensurepip" >/dev/null 2>&1; then \
	    echo ""; \
	    echo "ERROR: python3 venv support is not installed."; \
	    echo "On Debian/Ubuntu, run:"; \
	    echo "    sudo apt install python3-venv python3-pip"; \
	    echo "then retry 'make setup'."; \
	    echo ""; \
	    exit 1; \
	fi
	$(SYS_PY) -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install playwright
	$(VENV)/bin/playwright install chromium
	@touch $(VENV)/.installed

lint: ## Run tools/lint.py — fast, no venv needed.
	$(SYS_PY) tools/lint.py

progress: ## Regenerate PROGRESS.md from chapter status blocks.
	$(SYS_PY) scripts/generate_progress.py

index: ## Regenerate the back-matter Index from the curated term list.
	$(SYS_PY) scripts/generate_index.py

book: ## Build the mdBook HTML into book-build/ (needs a matched mdbook+mdbook-katex pair: 0.4.x+0.9.x or 0.5.x+0.10.x; see README).
	$(SYS_PY) scripts/build_book.py

figures: figures-setup ## Generate circuit figures (SVG next to chapters + PNG previews in .artifacts/).
	$(PY) figures-src/generate_figures.py

check-examples: figures-setup ## Run examples/ end-to-end to keep embedded code snippets honest.
	$(PY) scripts/check_examples.py

figures-setup: $(VENV)/.figures-installed ## One-time: install figure-generation deps into .venv.

$(VENV)/.figures-installed:
	@if ! python3 -c "import ensurepip" >/dev/null 2>&1; then \
	    echo "ERROR: python3 venv support is not installed."; \
	    echo "On Debian/Ubuntu: sudo apt install python3-venv python3-pip"; \
	    exit 1; \
	fi
	$(SYS_PY) -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install -r figures-src/requirements.txt
	@touch $(VENV)/.figures-installed

screenshots: setup precheck-chromium ## Capture screenshots. Usage: make screenshots CHAPTER=<path.md>
	@if [ -z "$(CHAPTER)" ]; then \
	    echo "usage: make screenshots CHAPTER=<path/to/chapter.md>"; \
	    exit 2; \
	fi
	$(PY) tools/screenshots.py $(CHAPTER)

render-gist: setup precheck-chromium ## Render any .md via a Gist (kept for inspection). Usage: make render-gist FILE=<path.md> [DELETE=1]
	@if [ -z "$(FILE)" ]; then \
	    echo "usage: make render-gist FILE=<path/to/file.md> [DELETE=1]"; \
	    exit 2; \
	fi
	$(PY) tools/render-gist.py $(FILE) $(if $(DELETE),--delete-gist,)

.PHONY: precheck-chromium
precheck-chromium:
	@chromium_bin=$$(ls -1 $$HOME/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1); \
	if [ -z "$$chromium_bin" ]; then \
	    chromium_bin=$$(ls -1 $$HOME/.cache/ms-playwright/chromium-*/chrome-linux/chrome 2>/dev/null | head -1); \
	fi; \
	if [ -z "$$chromium_bin" ]; then \
	    echo "WARN: could not locate Chromium binary; skipping pre-check."; \
	    exit 0; \
	fi; \
	if ! "$$chromium_bin" --version >/dev/null 2>&1; then \
	    echo ""; \
	    echo "ERROR: Chromium installed by Playwright will not launch."; \
	    echo "Most likely cause on a fresh Ubuntu/WSL install: missing system libraries."; \
	    echo "One-time fix (requires sudo):"; \
	    echo "    make setup-system-deps"; \
	    echo "or equivalently:"; \
	    echo "    sudo $(VENV)/bin/playwright install-deps chromium"; \
	    echo ""; \
	    exit 1; \
	fi

clean-artifacts: ## Delete review screenshots under .artifacts/.
	rm -rf .artifacts/screenshots
