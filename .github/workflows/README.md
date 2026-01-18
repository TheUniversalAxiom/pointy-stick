# GitHub Actions CI/CD Workflows

This directory contains automated continuous integration and deployment workflows for The Universal Axiom project.

## Workflows

### CI Workflow (`ci.yml`)

**Triggers:**
- Push to: `main`, `master`, `develop`, or any `claude/**` branch
- Pull requests to: `main`, `master`, `develop`

**Jobs:**

#### 1. `test-javascript` - JavaScript/TypeScript Tests
- Node.js 18
- Installs dependencies
- Builds TypeScript
- Runs 35 comprehensive tests
- Runs JavaScript example

#### 2. `test-mcp-server` - MCP Server Tests
- Node.js 18
- Builds MCP server
- Runs MCP server test suite
- Validates all 12 tools

#### 3. `test-python` - Python Tests
- Python 3.11
- Installs pytest and pytest-cov
- Runs Python test suite
- Generates coverage report
- Runs Python example

#### 4. `test-rust` - Rust Tests
- Latest stable Rust
- Caches Cargo dependencies
- Runs Rust tests
- Runs Rust example

#### 5. `verify-cross-language` - Cross-Language Verification
- Requires: JavaScript and Python tests to pass
- Runs `verify_outputs.py`
- Ensures mathematical equivalence across implementations
- Detects formula drift

#### 6. `lint-and-format` - Code Quality
- TypeScript type checking
- ESLint (if configured)
- Code quality validation

#### 7. `security-audit` - Security Audit
- Runs `npm audit`
- Checks for vulnerabilities
- Configured to allow low-severity issues (continue-on-error)

## Local Testing

You can test these workflows locally before pushing:

### JavaScript/TypeScript
```bash
npm install
npm run build
npm test
npm run example:js
```

### MCP Server
```bash
cd mcp-server
npm install
npm run build
npm test
```

### Python
```bash
pip install -r requirements.txt
pytest tests/test_universal_axiom.py -v --cov=src/python
python examples/python/basic_usage.py
```

### Rust
```bash
cd src/rust
cargo test --verbose
cargo run --example basic_usage
```

### Cross-Language Verification
```bash
npm run build
pip install pytest
python verify_outputs.py
```

## Caching Strategy

- **Node.js:** Uses `package-lock.json` for npm cache
- **Python:** Uses pip cache
- **Rust:** Caches `~/.cargo` and `target/` directory

## Failure Handling

### Test Failures
- All test jobs must pass for pull requests to be mergeable
- Individual test failures will block the workflow

### Security Audit
- Low severity vulnerabilities: Warning only (continue-on-error)
- Moderate+ vulnerabilities: Will report but not block (audit-level=moderate)

### ESLint
- Currently set to `continue-on-error` (won't block builds)
- Can be made stricter by removing this flag

## Status Badges

Add these to your README.md:

```markdown
![CI](https://github.com/TheUniversalAxiom/pointy-stick/workflows/CI/badge.svg)
```

## Customization

### Running on Different Branches

Edit the `on.push.branches` array in `ci.yml`:

```yaml
on:
  push:
    branches: [ main, your-branch-name ]
```

### Adding New Test Jobs

1. Create a new job in `ci.yml`
2. Add appropriate setup steps
3. Run your tests
4. Optionally add it to the `needs` array of dependent jobs

### Adjusting Node/Python/Rust Versions

Update the version numbers in the respective setup steps:

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '20'  # Change version here
```

## Troubleshooting

### Workflow Not Triggering
- Check branch name matches the trigger pattern
- Verify `.github/workflows/ci.yml` is committed
- Check GitHub Actions is enabled in repository settings

### Test Failures on CI but Passing Locally
- Ensure dependencies are installed: check `package-lock.json` is committed
- Verify environment variables if needed
- Check for platform-specific issues (Linux vs macOS/Windows)

### Cache Issues
- Manually clear cache in GitHub Actions settings
- Update cache key in workflow file

## Future Enhancements

Potential improvements:

1. **Deployment Jobs:** Add CD (Continuous Deployment)
2. **Performance Benchmarks:** Run benchmarks in CI and track over time
3. **Code Coverage Reports:** Upload to Codecov or Coveralls
4. **Release Automation:** Auto-publish to npm on version tags
5. **Matrix Testing:** Test across multiple Node/Python/Rust versions
6. **Documentation Generation:** Auto-generate API docs
7. **Artifact Storage:** Save build outputs for debugging

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Available Actions](https://github.com/marketplace?type=actions)
