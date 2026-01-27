# MCP Quickstart + Tool Contract (Universal Axiom)

This guide documents the **exact input shapes** the MCP server expects and provides a tiny helper for building `current_state` objects safely.

---

## 1) Start the MCP server (stdio)

```bash
node build/mcp-server/index.js
```

Or test via mcporter:

```bash
mcporter call --stdio "node build/mcp-server/index.js" compute_intelligence \
  --args '{"impulses":1.5,"elements":2.0,"pressure":1.2,"subjectivity":0.3,"purpose":1.0,"time":2.0,"n":5}' \
  --output json
```

---

## 2) Tool input shapes (strict)

### A) Flat permutation tools
These tools accept **flat inputs**:
- `compute_intelligence`
- `simulate_evolution`
- `simulate_contradiction_resolution`
- `analyze_permutation`
- `predict_trajectory`

**Shape**:
```json
{
  "impulses": 1.0,
  "elements": 1.0,
  "pressure": 1.0,
  "subjectivity": 0.2,
  "purpose": 1.0,
  "time": 1.0,
  "n": 3
}
```

### B) current_state tools
These tools **require** a structured `current_state` object:
- `get_coherence_metric`
- `evolve_system`
- `apply_pressure`
- `adjust_subjectivity`
- `optimize_system`
- `detect_collapse_risk`

**Shape** (NOTE the required *A/B/C* and *X/Y/Z* keys):
```json
{
  "current_state": {
    "n": 3,
    "foundation": {
      "A_impulses": 1.0,
      "B_elements": 1.0,
      "C_pressure": 1.0
    },
    "dynamic": {
      "n": 3,
      "base_exponential": 3
    },
    "cognitive": {
      "X_subjectivity": 0.2,
      "Y_purpose": 1.0,
      "Z_time": 1.0
    }
  }
}
```

### C) compare_permutations
```json
{
  "permutation_a": { "impulses":1, "elements":1, "pressure":1, "subjectivity":0.2, "purpose":1.2, "time":1, "n":4 },
  "permutation_b": { "impulses":1, "elements":0.8, "pressure":1.5, "subjectivity":0.5, "purpose":1, "time":1, "n":4 }
}
```

---

## 3) Thin client helper (JS)
A tiny helper is provided in `helpers/mcp-client.js` to normalize flat inputs into `current_state`.

```js
import { buildCurrentState } from "./helpers/mcp-client.js";

const current_state = buildCurrentState({
  impulses: 1.0,
  elements: 0.7,
  pressure: 2.5,
  subjectivity: 0.6,
  purpose: 0.6,
  time: 1.0,
  n: 3
});
```

---

## 4) Common errors (and fixes)

**Error:** `current_state.foundation is required and must be an object`
- Fix: Use the `current_state` shape above (A_impulses/B_elements/C_pressure)

**Error:** `elements must be a number, got string`
- Fix: send numeric JSON via `--args '{"elements": 1.0}'`

---

## 5) Example calls

### get_coherence_metric
```bash
mcporter call --stdio "node build/mcp-server/index.js" get_coherence_metric \
  --args '{"current_state":{"n":2,"foundation":{"A_impulses":1.0,"B_elements":1.0,"C_pressure":1.0},"dynamic":{"n":2,"base_exponential":3},"cognitive":{"X_subjectivity":0.2,"Y_purpose":1.5,"Z_time":1.0}}}' \
  --output json
```

### detect_collapse_risk
```bash
mcporter call --stdio "node build/mcp-server/index.js" detect_collapse_risk \
  --args '{"current_state":{"n":4,"foundation":{"A_impulses":1.0,"B_elements":-0.2,"C_pressure":4.0},"dynamic":{"n":4,"base_exponential":3},"cognitive":{"X_subjectivity":0.9,"Y_purpose":0.3,"Z_time":1.0}}}' \
  --output json
```

### optimize_system
```bash
mcporter call --stdio "node build/mcp-server/index.js" optimize_system \
  --args '{"current_state":{"n":3,"foundation":{"A_impulses":1.0,"B_elements":0.7,"C_pressure":2.5},"dynamic":{"n":3,"base_exponential":3},"cognitive":{"X_subjectivity":0.6,"Y_purpose":0.6,"Z_time":1.0}},"optimization_goal":"maximize_intelligence"}' \
  --output json
```
