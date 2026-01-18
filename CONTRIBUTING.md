# Contributing to The Universal Axiom

Thank you for your interest in contributing to The Universal Axiom! This document provides guidelines and information for contributors.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Testing](#testing)
5. [Code Style](#code-style)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Project Structure](#project-structure)
9. [Multi-Language Development](#multi-language-development)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background or identity.

### Standards

**Positive behaviors:**
- Using welcoming and inclusive language
- Respecting differing viewpoints
- Accepting constructive criticism gracefully
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable behaviors:**
- Harassment, trolling, or insulting comments
- Personal or political attacks
- Publishing others' private information
- Any conduct inappropriate in a professional setting

## Getting Started

### Prerequisites

**Required:**
- **Node.js** 18+ (for JavaScript/TypeScript)
- **Python** 3.11+ (for Python implementation)
- **Rust** (latest stable) (for Rust implementation)
- **Git** (version control)

**Optional:**
- **Julia** 1.x (for Julia implementation)

### Installation

1. **Fork the repository** on GitHub

2. **Clone your fork:**
```bash
git clone https://github.com/YOUR_USERNAME/pointy-stick.git
cd pointy-stick
```

3. **Add upstream remote:**
```bash
git remote add upstream https://github.com/TheUniversalAxiom/pointy-stick.git
```

4. **Install dependencies:**
```bash
# JavaScript/TypeScript
npm install

# Python
pip install -r requirements.txt

# Rust
cd src/rust && cargo build
```

5. **Verify setup:**
```bash
npm test                    # JavaScript tests
pytest tests/ -v            # Python tests
cd src/rust && cargo test   # Rust tests
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-123
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Test improvements
- `refactor/` - Code refactoring
- `perf/` - Performance improvements

### 2. Make Your Changes

Follow the [Code Style](#code-style) guidelines.

### 3. Test Locally

Run all relevant tests:

```bash
# JavaScript/TypeScript
npm run build
npm test

# Python
pytest tests/test_universal_axiom.py -v

# Rust
cd src/rust && cargo test

# Cross-language verification
python verify_outputs.py
```

### 4. Commit Your Changes

Follow [Commit Guidelines](#commit-guidelines).

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub.

## Testing

### Running Tests

#### JavaScript/TypeScript
```bash
npm test                    # Run all tests
npm test -- --coverage      # With coverage
npm test -- --watch         # Watch mode
```

#### Python
```bash
pytest tests/test_universal_axiom.py -v
pytest tests/ -v --cov=src/python  # With coverage
pytest tests/ -k "test_name"       # Specific test
```

#### Rust
```bash
cd src/rust
cargo test                  # All tests
cargo test --verbose        # Verbose output
cargo test test_name        # Specific test
```

#### MCP Server
```bash
cd mcp-server
npm test
```

### Writing Tests

#### JavaScript/TypeScript (Jest)

```javascript
describe('Feature Name', () => {
  test('should do something specific', () => {
    const result = functionToTest();
    expect(result).toBe(expectedValue);
  });
});
```

#### Python (pytest)

```python
def test_feature_name():
    """Test should do something specific"""
    result = function_to_test()
    assert result == expected_value
```

#### Rust

```rust
#[test]
fn test_feature_name() {
    let result = function_to_test();
    assert_eq!(result, expected_value);
}
```

### Test Coverage Goals

- **Minimum:** 80% code coverage
- **Target:** 90%+ coverage
- **Critical paths:** 100% coverage

### Golden Test Cases

When modifying the core formula, ensure all golden test cases pass:

```bash
python verify_outputs.py
```

**Location:** `tests/canonical_test_cases.json`

These ensure mathematical equivalence across all language implementations.

## Code Style

### TypeScript/JavaScript

**Configuration:** `tsconfig.json`, `eslint.config.js`

**Style guide:**
- Use TypeScript strict mode
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Use meaningful variable names
- Add JSDoc comments for public APIs

**Example:**
```typescript
/**
 * Computes the intelligence value for a given configuration
 * @param n - The iteration number
 * @returns The computed intelligence value
 */
export function computeIntelligence(n: number): number {
  const foundation = computeFoundation();
  const dynamic = computeDynamic(n);
  const cognitive = computeCognitive();
  return foundation * dynamic * cognitive;
}
```

**Formatting:**
```bash
npx prettier --write src/**/*.ts
```

### Python

**Configuration:** `.flake8`, `black` settings in `pyproject.toml` (if added)

**Style guide:**
- Follow PEP 8
- Use type hints
- Use descriptive variable names
- Add docstrings for all functions/classes

**Example:**
```python
def compute_intelligence(n: int) -> float:
    """
    Computes the intelligence value for a given configuration.

    Args:
        n: The iteration number

    Returns:
        The computed intelligence value
    """
    foundation = compute_foundation()
    dynamic = compute_dynamic(n)
    cognitive = compute_cognitive()
    return foundation * dynamic * cognitive
```

**Formatting:**
```bash
black src/python/
flake8 src/python/
mypy src/python/
```

### Rust

**Style guide:**
- Follow Rust standard style (rustfmt)
- Use descriptive names
- Add documentation comments with `///`

**Example:**
```rust
/// Computes the intelligence value for a given configuration
///
/// # Arguments
/// * `n` - The iteration number
///
/// # Returns
/// The computed intelligence value
pub fn compute_intelligence(n: usize) -> f64 {
    let foundation = compute_foundation();
    let dynamic = compute_dynamic(n);
    let cognitive = compute_cognitive();
    foundation * dynamic * cognitive
}
```

**Formatting:**
```bash
cargo fmt
cargo clippy
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test changes
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `chore`: Build/tooling changes
- `style`: Code style changes (formatting)

### Examples

**Simple commit:**
```
feat(core): add overflow protection for large n values
```

**Detailed commit:**
```
fix(mcp-server): correct type definitions for tool arguments

The MCP server was using 'any' types for tool arguments, which
reduced type safety. This commit adds proper TypeScript interfaces
for all tool argument types.

Fixes #123
```

**Breaking change:**
```
feat(api): change return type of computeIntelligence

BREAKING CHANGE: computeIntelligence now returns an object with
additional metadata instead of just a number.

Before:
  const value = axiom.computeIntelligence();

After:
  const { value, metadata } = axiom.computeIntelligence();
```

## Pull Request Process

### Before Submitting

1. **Sync with upstream:**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run all tests:**
```bash
npm test
pytest tests/ -v
cd src/rust && cargo test
python verify_outputs.py
```

3. **Check code style:**
```bash
npx prettier --check src/
black --check src/python/
cargo fmt --check
```

4. **Update documentation** if needed

### PR Title Format

Same as commit messages:
```
feat(scope): description of changes
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe the tests you ran:
- [ ] JavaScript/TypeScript tests
- [ ] Python tests
- [ ] Rust tests
- [ ] Cross-language verification
- [ ] Manual testing

## Checklist
- [ ] My code follows the project's code style
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] I have updated the documentation
- [ ] I have added appropriate comments to complex code
- [ ] My changes don't introduce new warnings
```

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by maintainers
3. **Address feedback** if requested
4. **Approval** from at least one maintainer
5. **Merge** by maintainers

### After Merge

1. **Delete your branch:**
```bash
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

2. **Sync your fork:**
```bash
git checkout main
git pull upstream main
git push origin main
```

## Project Structure

```
pointy-stick/
├── src/
│   ├── javascript/          # TypeScript/JavaScript implementation
│   ├── python/              # Python implementation
│   ├── rust/                # Rust implementation
│   └── julia/               # Julia implementation
├── mcp-server/              # MCP Server
├── tests/                   # Cross-language tests
├── examples/                # Usage examples
├── benchmarks/              # Performance benchmarks
├── docs/                    # Documentation
└── .github/workflows/       # CI/CD workflows
```

### Key Files

- `src/javascript/universal-axiom.ts` - Core TypeScript implementation
- `mcp-server/index.ts` - MCP Server implementation
- `tests/universal-axiom.test.js` - Main test suite
- `tests/canonical_test_cases.json` - Golden test cases
- `verify_outputs.py` - Cross-language verification

## Multi-Language Development

### The Universal Axiom Formula

All implementations must compute:

```
Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
```

Where:
- **E_n** = (2 × 3^n) - 1 (exponential growth)
- **F_n** = Fibonacci(n) (natural regulation)
- **X** = 1 - subjectivity (objectivity, 7-level cascade)
- **Y** = purpose (0 = unclear, 1+ = clear)
- **Z** = time (temporal continuity)
- **A** = impulses (drives, ±)
- **B** = elements (components, beneficial/detrimental)
- **C** = pressure (constraints, constructive/destructive)

### Cross-Language Consistency

**Critical requirement:** All implementations must produce **identical results** for the same inputs.

**Verification:**
```bash
python verify_outputs.py
```

This runs golden test cases against all implementations and ensures mathematical equivalence.

### Adding a New Language

1. Create `src/NEW_LANG/` directory
2. Implement core classes/functions
3. Add tests in `tests/test_NEW_LANG.*`
4. Add to `verify_outputs.py`
5. Add CI/CD job in `.github/workflows/ci.yml`
6. Update documentation

## Documentation

### Required Documentation

When making changes:

1. **Code comments** for complex logic
2. **API documentation** for public interfaces
3. **README updates** if adding features
4. **CHANGELOG entry** for user-facing changes

### Documentation Files

- `README.md` - Project overview
- `CLAUDE.md` - Framework application guide
- `PROMPT.md` - Technical specifications
- `AGENTS.md` - Developer guide
- `docs/API_REFERENCE.md` - Complete API docs
- `docs/IMPLEMENTATION.md` - Implementation guide

## Getting Help

### Resources

- **Documentation:** Read the docs in the `docs/` directory
- **Examples:** Check `examples/` for usage patterns
- **Tests:** Look at existing tests for patterns

### Ask Questions

- **GitHub Discussions:** For general questions
- **GitHub Issues:** For bug reports and feature requests
- **Pull Request Comments:** For specific code questions

## Recognition

Contributors are recognized in:
- `CONTRIBUTORS.md` (if we add it)
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to The Universal Axiom! 🎯

**Questions?** Open an issue or discussion on GitHub.
