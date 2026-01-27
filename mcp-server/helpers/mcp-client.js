// Thin client helper for MCP current_state shape
// Usage: const state = buildCurrentState({ impulses, elements, pressure, subjectivity, purpose, time, n })

export function buildCurrentState({
  impulses = 1.0,
  elements = 1.0,
  pressure = 1.0,
  subjectivity = 0.0,
  purpose = 1.0,
  time = 1.0,
  n = 1,
  base_exponential = 3,
} = {}) {
  return {
    n,
    foundation: {
      A_impulses: impulses,
      B_elements: elements,
      C_pressure: pressure,
    },
    dynamic: {
      n,
      base_exponential,
    },
    cognitive: {
      X_subjectivity: subjectivity,
      Y_purpose: purpose,
      Z_time: time,
    },
  };
}

export function buildPermutation(input = {}) {
  return {
    impulses: 1.0,
    elements: 1.0,
    pressure: 1.0,
    subjectivity: 0.0,
    purpose: 1.0,
    time: 1.0,
    n: 1,
    ...input,
  };
}
