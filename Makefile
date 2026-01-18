# Makefile for The Universal Axiom Multi-Language Project
# Provides unified commands for development across Python, JavaScript/TypeScript, Rust, and Julia

.PHONY: all help install build test lint clean benchmark run-examples

# Default target
all: install build test

# Help message
help:
	@echo "The Universal Axiom - Development Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install          Install all dependencies (npm, pip, cargo)"
	@echo "  make install-js       Install JavaScript/Node.js dependencies"
	@echo "  make install-python   Install Python dependencies"
	@echo "  make install-rust     Set up Rust (no installation needed)"
	@echo ""
	@echo "Build:"
	@echo "  make build            Build all projects"
	@echo "  make build-js         Build JavaScript/TypeScript"
	@echo "  make build-rust       Build Rust (release mode)"
	@echo "  make build-mcp        Build MCP server"
	@echo ""
	@echo "Testing:"
	@echo "  make test             Run all tests (JavaScript, Python, Rust)"
	@echo "  make test-js          Run JavaScript tests only"
	@echo "  make test-python      Run Python tests only"
	@echo "  make test-rust        Run Rust tests only"
	@echo "  make test-julia       Run Julia tests only"
	@echo "  make test-watch       Run JavaScript tests in watch mode"
	@echo ""
	@echo "Quality:"
	@echo "  make lint             Run all linters"
	@echo "  make lint-js          Lint JavaScript/TypeScript"
	@echo "  make lint-python      Lint Python code"
	@echo "  make lint-rust        Lint Rust code"
	@echo "  make type-check       TypeScript type checking"
	@echo "  make format           Format all code"
	@echo "  make format-python    Format Python with black"
	@echo ""
	@echo "Benchmarking:"
	@echo "  make benchmark        Run all benchmarks"
	@echo "  make benchmark-js     Benchmark JavaScript"
	@echo "  make benchmark-python Benchmark Python"
	@echo "  make benchmark-rust   Benchmark Rust"
	@echo ""
	@echo "Examples:"
	@echo "  make run-examples     Run all basic usage examples"
	@echo "  make example-js       Run JavaScript example"
	@echo "  make example-python   Run Python example"
	@echo "  make example-rust     Run Rust example"
	@echo "  make example-julia    Run Julia example"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean            Remove all build artifacts and dependencies"
	@echo "  make clean-build      Remove build artifacts only"
	@echo ""

# ============================================================================
# Installation targets
# ============================================================================

install: install-js install-python
	@echo "✅ All dependencies installed!"

install-js:
	@echo "📦 Installing JavaScript/Node.js dependencies..."
	npm install

install-python:
	@echo "🐍 Installing Python dependencies..."
	pip install -r requirements.txt

install-rust:
	@echo "🦀 Rust toolchain ready (no installation needed)"
	@echo "   Run 'rustup update' if you need to update Rust"

# ============================================================================
# Build targets
# ============================================================================

build: build-js build-rust
	@echo "✅ All builds completed!"

build-js:
	@echo "🔨 Building TypeScript..."
	npm run build

build-rust:
	@echo "🦀 Building Rust (release mode)..."
	cd src/rust && cargo build --release

build-mcp:
	@echo "🔨 Building MCP server..."
	npm run build:mcp

# ============================================================================
# Test targets
# ============================================================================

test: test-js test-python test-rust
	@echo "✅ All tests passed!"

test-js:
	@echo "🧪 Running JavaScript tests..."
	npm test

test-python:
	@echo "🧪 Running Python tests..."
	python -m pytest tests/test_universal_axiom.py -v

test-rust:
	@echo "🧪 Running Rust tests..."
	cd src/rust && cargo test --verbose

test-julia:
	@echo "🧪 Running Julia tests..."
	julia tests/test_universal_axiom.jl

test-watch:
	@echo "👀 Running JavaScript tests in watch mode..."
	npm test -- --watch

test-coverage:
	@echo "📊 Running tests with coverage..."
	npm test -- --coverage
	python -m pytest tests/test_universal_axiom.py --cov=src/python --cov-report=html

# ============================================================================
# Quality/Linting targets
# ============================================================================

lint: lint-js lint-python lint-rust
	@echo "✅ All linting passed!"

lint-js:
	@echo "🧹 Linting JavaScript/TypeScript..."
	npm run lint

lint-python:
	@echo "🧹 Linting Python..."
	@if command -v black > /dev/null; then \
		black --check src/python tests/*.py; \
	else \
		echo "⚠️  black not installed, skipping Python linting"; \
	fi
	@if command -v mypy > /dev/null; then \
		mypy src/python; \
	else \
		echo "⚠️  mypy not installed, skipping type checking"; \
	fi

lint-rust:
	@echo "🧹 Linting Rust..."
	cd src/rust && cargo clippy -- -D warnings

type-check:
	@echo "🔍 Running TypeScript type checking..."
	npm run type-check

format: format-python
	@echo "✅ Code formatted!"

format-python:
	@echo "✨ Formatting Python code..."
	@if command -v black > /dev/null; then \
		black src/python tests/*.py; \
	else \
		echo "⚠️  black not installed, run: pip install black"; \
	fi

# ============================================================================
# Benchmark targets
# ============================================================================

benchmark: benchmark-js benchmark-python benchmark-rust
	@echo "✅ All benchmarks completed!"
	@echo "📊 Compare results: python benchmarks/compare_all.py"

benchmark-js:
	@echo "⚡ Running JavaScript benchmarks..."
	node benchmarks/benchmark-javascript.js

benchmark-python:
	@echo "⚡ Running Python benchmarks..."
	python benchmarks/benchmark_python.py

benchmark-rust:
	@echo "⚡ Running Rust benchmarks..."
	cd src/rust && cargo bench

benchmark-compare:
	@echo "📊 Comparing benchmark results..."
	python benchmarks/compare_all.py

# ============================================================================
# Example execution targets
# ============================================================================

run-examples: example-js example-python
	@echo "✅ All examples completed!"

example-js:
	@echo "🚀 Running JavaScript example..."
	npm run example:js

example-python:
	@echo "🚀 Running Python example..."
	python examples/python/basic_usage.py

example-rust:
	@echo "🚀 Running Rust example..."
	cd src/rust && cargo run --example basic_usage

example-julia:
	@echo "🚀 Running Julia example..."
	julia examples/julia/basic_usage.jl

# ============================================================================
# Cleanup targets
# ============================================================================

clean: clean-build clean-deps
	@echo "✅ All cleaned!"

clean-build:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist/
	rm -rf src/javascript/*.js src/javascript/*.d.ts src/javascript/*.map
	rm -rf src/rust/target/
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true

clean-deps:
	@echo "🧹 Cleaning dependencies..."
	rm -rf node_modules/
	rm -rf .venv/

clean-test-cache:
	@echo "🧹 Cleaning test cache..."
	rm -rf .jest/
	rm -rf .pytest_cache/
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true

# ============================================================================
# Development utilities
# ============================================================================

dev:
	@echo "🔧 Starting development mode..."
	@echo "   TypeScript: Building in watch mode..."
	npm run build:watch

mcp-start:
	@echo "🚀 Starting MCP server..."
	npm run mcp:start

check: lint type-check test
	@echo "✅ All checks passed!"

# Quick check (no tests)
check-quick: lint type-check
	@echo "✅ Quick checks passed!"

# CI simulation
ci: install build lint type-check test
	@echo "✅ CI pipeline simulation passed!"

# Show versions
versions:
	@echo "Tool Versions:"
	@echo "  Node:       $$(node --version 2>/dev/null || echo 'not installed')"
	@echo "  npm:        $$(npm --version 2>/dev/null || echo 'not installed')"
	@echo "  Python:     $$(python --version 2>/dev/null || echo 'not installed')"
	@echo "  pip:        $$(pip --version 2>/dev/null | cut -d' ' -f2 || echo 'not installed')"
	@echo "  Rust:       $$(rustc --version 2>/dev/null | cut -d' ' -f2 || echo 'not installed')"
	@echo "  Cargo:      $$(cargo --version 2>/dev/null | cut -d' ' -f2 || echo 'not installed')"
	@echo "  Julia:      $$(julia --version 2>/dev/null | cut -d' ' -f3 || echo 'not installed')"
	@echo "  TypeScript: $$(npx tsc --version 2>/dev/null || echo 'not installed')"
