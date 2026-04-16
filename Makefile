# =============================================================================
# BrikByteOS Examples — Makefile
#
# Purpose:
# - provide a deterministic developer workflow for examples
# - install a released bb binary locally
# - run Phase 0 examples consistently
# - support local and CI usage
#
# Notes:
# - default install target is Linux amd64
# - override variables at invocation time when needed
# - examples are intentionally explicit rather than overly clever
# =============================================================================

SHELL := /usr/bin/env bash
.SHELLFLAGS := -eu -o pipefail -c

# -----------------------------------------------------------------------------
# Release / install configuration
# -----------------------------------------------------------------------------

BB_VERSION ?= v0.1.0
BB_OS ?= linux
BB_ARCH ?= amd64
BB_INSTALL_DIR ?= $(HOME)/.local/bin
BB_BINARY_NAME ?= bb
BB_RELEASE_BASE ?= https://github.com/BrikByte-Studios/brikbyteos-cli/releases/download

# Asset naming assumptions.
# Adjust these if your GoReleaser archive names change.
BB_ARCHIVE_EXT := tar.gz
ifeq ($(BB_OS),windows)
BB_BINARY_NAME := bb.exe
BB_ARCHIVE_EXT := zip
endif

BB_ASSET_NAME := bb_$(BB_OS)_$(BB_ARCH).$(BB_ARCHIVE_EXT)
BB_ASSET_URL := $(BB_RELEASE_BASE)/$(BB_VERSION)/$(BB_ASSET_NAME)
BB_TMP_DIR := .tmp/bb-install
BB_TMP_ARCHIVE := $(BB_TMP_DIR)/$(BB_ASSET_NAME)

# -----------------------------------------------------------------------------
# Example paths
# -----------------------------------------------------------------------------

EXAMPLE_JEST_JS := examples/phase0/jest-release-readiness
EXAMPLE_JEST_TS := examples/phase0/jest-ts-release-readiness
EXAMPLE_PLAYWRIGHT_JS := examples/phase0/playwright-ui-release-readiness

# -----------------------------------------------------------------------------
# Public targets
# -----------------------------------------------------------------------------

.PHONY: help
help:
	@echo "BrikByteOS Examples Makefile"
	@echo
	@echo "Install / CLI"
	@echo "  make bb-install                     Install released bb locally"
	@echo "  make bb-install-ci                  Install bb into ./.bin for CI/local scripts"
	@echo "  make bb-verify                      Verify installed bb"
	@echo "  make bb-uninstall                   Remove installed bb from BB_INSTALL_DIR"
	@echo
	@echo "Examples"
	@echo "  make jest-js-install                npm ci for JS Jest example"
	@echo "  make jest-js-test                   Run direct Jest tests for JS example"
	@echo "  make jest-js-run                    Run bb against JS Jest example"
	@echo
	@echo "  make jest-ts-install                npm ci for TS Jest example"
	@echo "  make jest-ts-test                   Run direct Jest tests for TS example"
	@echo "  make jest-ts-run                    Run bb against TS Jest example"
	@echo
	@echo "  make playwright-js-install          npm ci for Playwright example"
	@echo "  make playwright-js-browser          Install Chromium for Playwright example"
	@echo "  make playwright-js-test             Run direct Playwright tests"
	@echo "  make playwright-js-run              Run bb against Playwright example"
	@echo
	@echo "Meta"
	@echo "  make test-examples                  Run all direct example tests"
	@echo "  make run-examples                   Run bb across all current examples"
	@echo "  make clean                          Remove generated artifacts and temp files"
	@echo
	@echo "Overrides:"
	@echo "  BB_VERSION=v0.1.0"
	@echo "  BB_OS=linux|darwin|windows"
	@echo "  BB_ARCH=amd64|arm64"
	@echo "  BB_INSTALL_DIR=\$$HOME/.local/bin"

# -----------------------------------------------------------------------------
# bb install targets
# -----------------------------------------------------------------------------

.PHONY: bb-install
bb-install:
	@echo "==> Installing BrikByteOS CLI $(BB_VERSION) ($(BB_OS)/$(BB_ARCH))"
	@mkdir -p "$(BB_TMP_DIR)"
	@mkdir -p "$(BB_INSTALL_DIR)"
	@echo "-> Downloading $(BB_ASSET_URL)"
	@curl -fL --retry 3 --retry-delay 2 -o "$(BB_TMP_ARCHIVE)" "$(BB_ASSET_URL)"
ifeq ($(BB_ARCHIVE_EXT),zip)
	@echo "-> Extracting ZIP archive"
	@rm -f "$(BB_TMP_DIR)/$(BB_BINARY_NAME)"
	@unzip -o "$(BB_TMP_ARCHIVE)" -d "$(BB_TMP_DIR)" >/dev/null
else
	@echo "-> Extracting tar.gz archive"
	@tar -xzf "$(BB_TMP_ARCHIVE)" -C "$(BB_TMP_DIR)"
endif
	@chmod +x "$(BB_TMP_DIR)/$(BB_BINARY_NAME)"
	@echo "-> Installing $(BB_BINARY_NAME) to $(BB_INSTALL_DIR)"
	@mv "$(BB_TMP_DIR)/$(BB_BINARY_NAME)" "$(BB_INSTALL_DIR)/$(BB_BINARY_NAME)"
	@echo "-> Installed successfully"
	@"$(BB_INSTALL_DIR)/$(BB_BINARY_NAME)" version

.PHONY: bb-install-ci
bb-install-ci:
	@$(MAKE) bb-install BB_INSTALL_DIR="$(CURDIR)/.bin"

.PHONY: bb-verify
bb-verify:
	@echo "==> Verifying bb installation"
	@command -v bb >/dev/null 2>&1 || { echo "error: bb not found on PATH"; exit 1; }
	@which bb
	@bb version

.PHONY: bb-uninstall
bb-uninstall:
	@echo "==> Removing bb from $(BB_INSTALL_DIR)"
	@rm -f "$(BB_INSTALL_DIR)/$(BB_BINARY_NAME)"

# -----------------------------------------------------------------------------
# Jest JS example
# -----------------------------------------------------------------------------

.PHONY: jest-js-install
jest-js-install:
	@echo "==> Installing dependencies for $(EXAMPLE_JEST_JS)"
	@cd "$(EXAMPLE_JEST_JS)" && npm ci

.PHONY: jest-js-test
jest-js-test:
	@echo "==> Running direct Jest tests for $(EXAMPLE_JEST_JS)"
	@cd "$(EXAMPLE_JEST_JS)" && npm test

.PHONY: jest-js-run
jest-js-run:
	@echo "==> Running bb against $(EXAMPLE_JEST_JS)"
	@bb run --adapter jest --workdir "$(EXAMPLE_JEST_JS)"

# -----------------------------------------------------------------------------
# Jest TS example
# -----------------------------------------------------------------------------

.PHONY: jest-ts-install
jest-ts-install:
	@echo "==> Installing dependencies for $(EXAMPLE_JEST_TS)"
	@cd "$(EXAMPLE_JEST_TS)" && npm ci

.PHONY: jest-ts-test
jest-ts-test:
	@echo "==> Running direct Jest tests for $(EXAMPLE_JEST_TS)"
	@cd "$(EXAMPLE_JEST_TS)" && npm test

.PHONY: jest-ts-run
jest-ts-run:
	@echo "==> Running bb against $(EXAMPLE_JEST_TS)"
	@bb run --adapter jest --workdir "$(EXAMPLE_JEST_TS)"

# -----------------------------------------------------------------------------
# Playwright JS example
# -----------------------------------------------------------------------------

.PHONY: playwright-js-install
playwright-js-install:
	@echo "==> Installing dependencies for $(EXAMPLE_PLAYWRIGHT_JS)"
	@cd "$(EXAMPLE_PLAYWRIGHT_JS)" && npm ci

.PHONY: playwright-js-browser
playwright-js-browser:
	@echo "==> Installing Playwright Chromium for $(EXAMPLE_PLAYWRIGHT_JS)"
	@cd "$(EXAMPLE_PLAYWRIGHT_JS)" && npx playwright install --with-deps chromium

.PHONY: playwright-js-test
playwright-js-test:
	@echo "==> Running direct Playwright tests for $(EXAMPLE_PLAYWRIGHT_JS)"
	@cd "$(EXAMPLE_PLAYWRIGHT_JS)" && npm test

.PHONY: playwright-js-run
playwright-js-run:
	@echo "==> Running bb against $(EXAMPLE_PLAYWRIGHT_JS)"
	@bb run --adapter playwright --workdir "$(EXAMPLE_PLAYWRIGHT_JS)"

# -----------------------------------------------------------------------------
# Aggregate targets
# -----------------------------------------------------------------------------

.PHONY: test-examples
test-examples: jest-js-install jest-js-test jest-ts-install jest-ts-test playwright-js-install playwright-js-browser playwright-js-test
	@echo "==> All direct example tests completed"

.PHONY: run-examples
run-examples: jest-js-run jest-ts-run playwright-js-run
	@echo "==> All bb example runs completed"

# -----------------------------------------------------------------------------
# Cleanup
# -----------------------------------------------------------------------------

.PHONY: clean
clean:
	@echo "==> Cleaning temp files and generated artifacts"
	@rm -rf .tmp
	@rm -rf .bin
	@find examples -type d -name ".bb" -prune -exec rm -rf {} +
	@find examples -type f \( -name "inspect.json" -o -name ".bb-jest-report.json" -o -name ".bb-playwright-report.json" \) -delete

# -----------------------------------------------------------------------------
# Convenience aliases
# -----------------------------------------------------------------------------

.PHONY: install
install: bb-install

.PHONY: verify
verify: bb-verify