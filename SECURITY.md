# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Security Audit Status

**Last Audit:** January 18, 2026
**Status:** ✅ SECURE (Low-severity issues only)

### Current Vulnerabilities

#### npm Dependencies (Root)
- **8 low severity vulnerabilities** in development dependencies
- **Impact:** Minimal (affects only development environment, not production)
- **Location:** `jest`, `ts-node`, `diff` packages (test dependencies)
- **Mitigation:** These packages are dev-only and not included in production builds

**Details:**
```
diff <8.0.3 - Denial of Service vulnerability in parsePatch and applyPatch
└─ Affects: ts-node, jest-config, @jest/core, jest, ts-jest, create-jest, jest-cli
```

**Resolution:**
- Running `npm audit fix --force` would require breaking changes (downgrading ts-node)
- Since these are development-only dependencies, risk is acceptable
- No action required for production deployment

#### MCP Server
- **0 vulnerabilities** ✅
- All dependencies are production-safe

### Security Assessment

#### Code Security: ✅ EXCELLENT
- ✅ No use of `eval()` or `Function()` constructors
- ✅ No SQL injection risks (no database interactions)
- ✅ No command injection (stdio transport only)
- ✅ Input validation via JSON schemas (MCP server)
- ✅ No sensitive data stored in codebase
- ✅ No external API calls
- ✅ No file system access beyond stdio

#### Dependency Security: ✅ GOOD
- ✅ Minimal dependencies (production has only `@modelcontextprotocol/sdk`)
- ✅ No critical or high-severity vulnerabilities
- ✅ Regular `npm audit` checks in CI/CD

#### Data Security: ✅ EXCELLENT
- ✅ No user data collection
- ✅ No network communication (except stdio for MCP)
- ✅ No persistent storage
- ✅ Deterministic calculations (no randomness that could leak info)

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** Open a Public Issue

Security vulnerabilities should not be publicly disclosed until a fix is available.

### 2. Report Privately

Email security concerns to:
- **Email:** [Create an issue with tag `security`]
- **Expected Response Time:** Within 48 hours

### 3. Include These Details

- **Description:** Clear description of the vulnerability
- **Impact:** What could an attacker do?
- **Reproduction:** Step-by-step guide to reproduce
- **Affected Versions:** Which versions are vulnerable?
- **Suggested Fix:** If you have ideas for mitigation

### 4. Coordinated Disclosure

We follow responsible disclosure practices:

1. **Acknowledgment:** We'll confirm receipt within 48 hours
2. **Assessment:** We'll evaluate severity and impact within 7 days
3. **Fix Development:** We'll develop a patch
4. **Testing:** Thorough testing of the fix
5. **Release:** Coordinated public disclosure with security advisory
6. **Credit:** We'll credit you in the security advisory (unless you prefer anonymity)

## Security Best Practices

### For Users

#### MCP Server Deployment

**Recommended:**
```json
{
  "mcpServers": {
    "universal-axiom": {
      "command": "node",
      "args": ["/absolute/path/to/build/mcp-server/index.js"]
    }
  }
}
```

**Security Considerations:**
- ✅ Use absolute paths (not relative)
- ✅ Ensure MCP server binary has appropriate file permissions
- ✅ Run with least privilege (don't require root/admin)
- ✅ Review MCP server code before deployment

#### JavaScript/TypeScript Integration

```typescript
import { UniversalAxiom } from './universal-axiom.js';

// ✅ GOOD: Use validated inputs
const axiom = new UniversalAxiom({
  impulses: validateNumber(userInput.impulses),
  elements: validateNumber(userInput.elements),
  pressure: validateNumber(userInput.pressure)
});

// ❌ BAD: Direct user input without validation
const axiom = new UniversalAxiom(userInput);
```

#### Python Integration

```python
from universal_axiom import UniversalAxiom

# ✅ GOOD: Validate before use
def create_axiom_safe(impulses, elements, pressure):
    if not all(isinstance(x, (int, float)) for x in [impulses, elements, pressure]):
        raise ValueError("All inputs must be numeric")
    return UniversalAxiom(impulses, elements, pressure)

# ❌ BAD: Arbitrary code execution risk
# NEVER use eval() or exec() with user input
```

### For Developers

#### Input Validation

Always validate inputs before passing to the Axiom:

```typescript
function validateNumber(value: any): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return value;
}
```

#### Prevent Overflow

For large `n` values, use overflow protection:

```typescript
const MAX_SAFE_N = 100;

if (n > MAX_SAFE_N) {
  throw new Error(`n value too large: ${n}. Maximum: ${MAX_SAFE_N}`);
}
```

#### MCP Server Security

The MCP server runs on stdio transport:

```typescript
// ✅ GOOD: Stdio transport (isolated)
const transport = new StdioServerTransport();

// ❌ BAD: Network transport (requires authentication)
// const transport = new HTTPServerTransport(port);
```

#### Dependency Management

```bash
# Regular audits
npm audit

# Update dependencies (test thoroughly)
npm update

# Check for outdated packages
npm outdated
```

## Security Checklist

Before deployment:

- [ ] Run `npm audit` and review findings
- [ ] Run `npm test` to ensure all tests pass
- [ ] Review MCP server configuration
- [ ] Use absolute paths in MCP config
- [ ] Validate all user inputs
- [ ] Check file permissions
- [ ] Review changes in `git diff`
- [ ] Enable CI/CD security checks

## Automated Security

### GitHub Actions

Our CI/CD includes security checks:

```yaml
security-audit:
  name: Security Audit
  runs-on: ubuntu-latest
  steps:
    - name: Run npm audit
      run: npm audit --audit-level=moderate || true
```

**Audit Levels:**
- `low`: Reports all vulnerabilities (default)
- `moderate`: Only moderate+ (currently configured)
- `high`: Only high+
- `critical`: Only critical

### Dependabot (Recommended)

Enable Dependabot for automatic dependency updates:

`.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

## Security Features

### Input Clamping

The framework includes automatic safety bounds:

```typescript
// Pressure clamped to minimum 0.01 (prevents division by zero)
this.pressure = Math.max(0.01, pressure);

// Subjectivity clamped to [0.0, 1.0]
const newSubjectivity = Math.max(0.0, Math.min(1.0, this.subjectivity + amount));

// Purpose clamped to minimum 0.01
this.purpose = Math.max(0.01, purpose);
```

### Deterministic Calculations

No randomness or external state:
- ✅ Same inputs always produce same outputs
- ✅ No hidden state or side effects
- ✅ Fully auditable calculations
- ✅ No machine learning models (no adversarial attacks)

### Type Safety

TypeScript strict mode enabled:
- ✅ No implicit `any` types (mostly)
- ✅ Null safety
- ✅ Strict function types
- ✅ Strong type checking

## Known Limitations

### Not Security Issues

These are **intentional design choices**, not vulnerabilities:

1. **No Authentication:** The Axiom is a mathematical formula, not a service
2. **No Rate Limiting:** Pure computation, no resource exhaustion risk
3. **No Encryption:** No sensitive data to encrypt
4. **No User Accounts:** No user management needed
5. **No Network Isolation:** Runs locally, no network access

### Potential Concerns (Mitigated)

#### Denial of Service (DoS)
- **Risk:** Very large `n` values could slow computation
- **Mitigation:** Input validation, reasonable bounds
- **Status:** Low risk (pure math, no external resources)

#### Overflow
- **Risk:** `Math.pow(3, n)` overflows for n > ~100
- **Mitigation:** Input validation, documentation
- **Status:** Documented limitation, not a security issue

## Security Roadmap

Future security improvements:

### Phase 1 (Current)
- [x] Dependency auditing in CI/CD
- [x] Input validation
- [x] Security documentation
- [x] Automated testing

### Phase 2 (Next)
- [ ] Enable Dependabot
- [ ] Add input fuzzing tests
- [ ] Improve type safety (remove `any` types)
- [ ] Add overflow detection

### Phase 3 (Future)
- [ ] Third-party security audit
- [ ] Penetration testing (if network features added)
- [ ] Security training for contributors
- [ ] Bug bounty program (if project scales)

## Contact

For security inquiries:
- **GitHub Issues:** Tag with `security` label (for non-sensitive issues)
- **Private Disclosure:** [Create private security advisory on GitHub]

## Acknowledgments

We thank security researchers who responsibly disclose vulnerabilities.

**Hall of Fame:**
- (No reported vulnerabilities yet)

---

**Last Updated:** January 18, 2026
**Next Review:** July 2026 (6 months)
