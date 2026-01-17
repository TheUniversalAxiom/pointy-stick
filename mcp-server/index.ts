#!/usr/bin/env node

/**
 * MCP Server for The Universal Axiom
 *
 * Exposes The Universal Axiom framework as tools and resources
 * for AI assistants via the Model Context Protocol.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import {
  UniversalAxiom,
  AxiomSimulator,
  AxiomState,
} from "./universal-axiom.js";

// Server instance
const server = new Server(
  {
    name: "universal-axiom-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

/**
 * List available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "compute_intelligence",
        description:
          "Compute intelligence value using The Universal Axiom formula: Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)",
        inputSchema: {
          type: "object",
          properties: {
            impulses: {
              type: "number",
              description: "A - Fundamental drives (can be positive or negative)",
              default: 1.0,
            },
            elements: {
              type: "number",
              description: "B - Core components (beneficial or detrimental)",
              default: 1.0,
            },
            pressure: {
              type: "number",
              description: "C - Constraints and forces (constructive or destructive)",
              default: 1.0,
            },
            subjectivity: {
              type: "number",
              description: "X - Subjectivity level (0 = objective, 1 = subjective)",
              minimum: 0,
              maximum: 1,
              default: 0.0,
            },
            purpose: {
              type: "number",
              description: "Y - Purpose-driven reasoning strength (0 = unclear, 1+ = clear)",
              default: 1.0,
            },
            time: {
              type: "number",
              description: "Z - Temporal continuity and irreversibility",
              default: 1.0,
            },
            n: {
              type: "number",
              description: "Iteration level (affects exponential and Fibonacci components)",
              default: 1,
            },
          },
          required: [],
        },
      },
      {
        name: "evolve_system",
        description:
          "Evolve a Universal Axiom system forward in time, updating temporal and dynamic components",
        inputSchema: {
          type: "object",
          properties: {
            current_state: {
              type: "object",
              description: "Current state of the axiom system",
            },
            steps: {
              type: "number",
              description: "Number of time steps to evolve",
              default: 1,
            },
            delta_time: {
              type: "number",
              description: "Time increment per step",
              default: 1.0,
            },
          },
          required: ["current_state"],
        },
      },
      {
        name: "apply_pressure",
        description:
          "Apply pressure changes to the system (e.g., from contradictions, constraints, or new information)",
        inputSchema: {
          type: "object",
          properties: {
            current_state: {
              type: "object",
              description: "Current state of the axiom system",
            },
            pressure_delta: {
              type: "number",
              description: "Change in pressure (positive increases, negative decreases)",
            },
          },
          required: ["current_state", "pressure_delta"],
        },
      },
      {
        name: "adjust_subjectivity",
        description:
          "Adjust the subjectivity level of the system (move toward objectivity or subjectivity)",
        inputSchema: {
          type: "object",
          properties: {
            current_state: {
              type: "object",
              description: "Current state of the axiom system",
            },
            subjectivity_delta: {
              type: "number",
              description: "Change in subjectivity (negative = more objective, positive = more subjective)",
            },
          },
          required: ["current_state", "subjectivity_delta"],
        },
      },
      {
        name: "simulate_evolution",
        description:
          "Simulate the evolution of a system over multiple time steps, tracking state changes",
        inputSchema: {
          type: "object",
          properties: {
            impulses: { type: "number", default: 1.0 },
            elements: { type: "number", default: 1.0 },
            pressure: { type: "number", default: 1.0 },
            subjectivity: { type: "number", minimum: 0, maximum: 1, default: 0.0 },
            purpose: { type: "number", default: 1.0 },
            time: { type: "number", default: 1.0 },
            n: { type: "number", default: 1 },
            steps: {
              type: "number",
              description: "Number of evolution steps to simulate",
              default: 10,
            },
            delta_time: { type: "number", default: 1.0 },
          },
          required: [],
        },
      },
      {
        name: "simulate_contradiction_resolution",
        description:
          "Simulate how the system resolves contradiction through pressure application and objectivity adjustment",
        inputSchema: {
          type: "object",
          properties: {
            impulses: { type: "number", default: 1.0 },
            elements: { type: "number", default: 1.0 },
            pressure: { type: "number", default: 1.0 },
            subjectivity: { type: "number", minimum: 0, maximum: 1, default: 0.5 },
            purpose: { type: "number", default: 1.0 },
            time: { type: "number", default: 1.0 },
            n: { type: "number", default: 1 },
            initial_pressure: {
              type: "number",
              description: "Initial pressure spike from contradiction",
              default: 2.0,
            },
            resolution_steps: {
              type: "number",
              description: "Number of steps to resolve the contradiction",
              default: 5,
            },
          },
          required: [],
        },
      },
      {
        name: "get_coherence_metric",
        description:
          "Calculate the coherence metric of a system based on objectivity, purpose, and pressure balance",
        inputSchema: {
          type: "object",
          properties: {
            current_state: {
              type: "object",
              description: "Current state of the axiom system",
            },
          },
          required: ["current_state"],
        },
      },
      {
        name: "analyze_permutation",
        description:
          "Analyze a specific permutation (configuration) of the Universal Axiom to diagnose which layers may need adjustment",
        inputSchema: {
          type: "object",
          properties: {
            impulses: { type: "number", default: 1.0 },
            elements: { type: "number", default: 1.0 },
            pressure: { type: "number", default: 1.0 },
            subjectivity: { type: "number", minimum: 0, maximum: 1, default: 0.0 },
            purpose: { type: "number", default: 1.0 },
            time: { type: "number", default: 1.0 },
            n: { type: "number", default: 1 },
          },
          required: [],
        },
      },
    ],
  };
});

/**
 * Handle tool execution
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "compute_intelligence": {
        const axiom = new UniversalAxiom(args as any);
        const state = axiom.getState();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(state, null, 2),
            },
          ],
        };
      }

      case "evolve_system": {
        const { current_state, steps = 1, delta_time = 1.0 } = args as any;
        const axiom = createAxiomFromState(current_state);

        const results: AxiomState[] = [];
        for (let i = 0; i < steps; i++) {
          axiom.evolve(delta_time);
          results.push(axiom.getState());
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  steps: results.length,
                  evolution: results,
                  final_state: results[results.length - 1],
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "apply_pressure": {
        const { current_state, pressure_delta } = args as any;
        const axiom = createAxiomFromState(current_state);

        axiom.applyPressure(pressure_delta);
        const newState = axiom.getState();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  pressure_applied: pressure_delta,
                  new_state: newState,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "adjust_subjectivity": {
        const { current_state, subjectivity_delta } = args as any;
        const axiom = createAxiomFromState(current_state);

        axiom.adjustSubjectivity(subjectivity_delta);
        const newState = axiom.getState();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  subjectivity_change: subjectivity_delta,
                  new_state: newState,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "simulate_evolution": {
        const { steps = 10, delta_time = 1.0, ...params } = args as any;
        const axiom = new UniversalAxiom(params);
        const simulator = new AxiomSimulator(axiom);

        const history = simulator.simulateEvolution(steps, delta_time);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  simulation_type: "evolution",
                  steps,
                  history,
                  final_intelligence: history[history.length - 1].intelligence,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "simulate_contradiction_resolution": {
        const {
          initial_pressure = 2.0,
          resolution_steps = 5,
          ...params
        } = args as any;
        const axiom = new UniversalAxiom(params);
        const simulator = new AxiomSimulator(axiom);

        const history = simulator.simulateContradictionResolution(
          initial_pressure,
          resolution_steps
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  simulation_type: "contradiction_resolution",
                  initial_pressure,
                  resolution_steps,
                  history,
                  coherence_improvement:
                    history[history.length - 1].cognitive.X_objectivity -
                    history[0].cognitive.X_objectivity,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "get_coherence_metric": {
        const { current_state } = args as any;
        const axiom = createAxiomFromState(current_state);
        const simulator = new AxiomSimulator(axiom);

        const coherence = simulator.getCoherenceMetric();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  coherence,
                  interpretation:
                    coherence > 0.7
                      ? "High coherence - system is well-aligned"
                      : coherence > 0.4
                      ? "Moderate coherence - some adjustment needed"
                      : "Low coherence - significant realignment required",
                  state: current_state,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "analyze_permutation": {
        const axiom = new UniversalAxiom(args as any);
        const state = axiom.getState();
        const simulator = new AxiomSimulator(axiom);
        const coherence = simulator.getCoherenceMetric();

        // Diagnostic analysis
        const diagnostics = {
          foundation_layer: {
            status: state.foundation.product > 0 ? "positive" : "negative_or_zero",
            A_impulses: state.foundation.A_impulses,
            B_elements: state.foundation.B_elements,
            C_pressure: state.foundation.C_pressure,
            product: state.foundation.product,
            notes:
              state.foundation.product <= 0
                ? "⚠️ Foundation is weak or negative - check impulses, elements, and pressure"
                : state.foundation.C_pressure > 3
                ? "⚠️ High pressure detected - may indicate stress or contradiction"
                : "✓ Foundation is stable",
          },
          dynamic_layer: {
            E_n: state.dynamic.E_n,
            F_n: state.dynamic.F_n,
            product: state.dynamic.product,
            growth_rate: state.dynamic.E_n / (1 + state.dynamic.F_n),
            notes:
              state.n < 3
                ? "ℹ️ Early iteration - growth potential not yet fully realized"
                : "✓ Dynamic scaling active",
          },
          cognitive_layer: {
            objectivity: state.cognitive.X_objectivity,
            subjectivity: state.cognitive.X_subjectivity,
            purpose: state.cognitive.Y_purpose,
            time: state.cognitive.Z_time,
            product: state.cognitive.product,
            notes:
              state.cognitive.X_subjectivity > 0.7
                ? "⚠️ High subjectivity - increase objectivity for better coherence"
                : state.cognitive.Y_purpose < 0.3
                ? "⚠️ Low purpose alignment - clarify goals and direction"
                : "✓ Cognitive layer is balanced",
          },
          overall: {
            intelligence: state.intelligence,
            coherence,
            coherence_status:
              coherence > 0.7 ? "high" : coherence > 0.4 ? "moderate" : "low",
            recommendations: generateRecommendations(state, coherence),
          },
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(diagnostics, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * List available resources
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "axiom://framework/overview",
        name: "Universal Axiom Framework Overview",
        description: "Complete overview of The Universal Axiom framework",
        mimeType: "text/markdown",
      },
      {
        uri: "axiom://framework/formula",
        name: "The Intelligence Formula",
        description: "Detailed explanation of the intelligence formula and its components",
        mimeType: "text/markdown",
      },
      {
        uri: "axiom://framework/layers",
        name: "The Three Layers",
        description: "Foundation, Dynamic, and Cognitive layers explained",
        mimeType: "text/markdown",
      },
      {
        uri: "axiom://usage/reasoning",
        name: "Reasoning with The Axiom",
        description: "How to apply The Universal Axiom to reason about any problem",
        mimeType: "text/markdown",
      },
      {
        uri: "axiom://examples/debugging",
        name: "Example: Debugging with The Axiom",
        description: "How to use The Axiom framework for debugging problems",
        mimeType: "text/markdown",
      },
      {
        uri: "axiom://examples/decision-making",
        name: "Example: Decision Making",
        description: "Using The Axiom for complex decisions",
        mimeType: "text/markdown",
      },
    ],
  };
});

/**
 * Read resource content
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  const resources: Record<string, string> = {
    "axiom://framework/overview": `# The Universal Axiom Framework

The Universal Axiom is a mathematical framework that models intelligence through immutable natural laws rather than probabilistic patterns.

## The Formula

\`\`\`
Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
\`\`\`

## Key Principle

**Multiplicative, not additive.** If any variable is zero, the entire system collapses. Variables interact non-linearly.

## The Three Layers

1. **Foundation Layer (A · B · C)** - Physical Reality
   - A (Impulses): Fundamental drives (can be ±)
   - B (Elements): Core components (beneficial/detrimental)
   - C (Pressure): Constraints and forces (constructive/destructive)

2. **Dynamic Layer (E_n · (1 + F_n))** - Growth & Regulation
   - E_n: Exponential growth potential
   - F_n: Fibonacci regulation (prevents collapse)

3. **Cognitive Layer (X · Y · Z)** - Alignment & Evolution
   - X: Objectivity (1 - subjectivity)
   - Y: Purpose alignment
   - Z: Temporal continuity and irreversibility

## Why This Matters

The Axiom doesn't answer questions. It generates the conditions from which answers must emerge.`,

    "axiom://framework/formula": `# The Intelligence Formula

\`\`\`
Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
\`\`\`

## Components Explained

### Foundation Layer: A · B · C

- **A (Impulses)**: The fundamental drives or motivations
  - Positive: Aligned with values, growth-oriented
  - Negative: Conflicting, destructive

- **B (Elements)**: The core components or building blocks
  - Beneficial: Quality inputs, good structure
  - Detrimental: Poor quality, toxic elements

- **C (Pressure)**: Constraints, forces, and tensions
  - Constructive: Pushes toward growth and resolution
  - Destructive: Forces compromise or collapse

### Dynamic Layer: E_n · (1 + F_n)

- **E_n = (2 × 3^n) - 1**: Exponential growth
  - Represents raw power, capacity, momentum
  - Scales rapidly with iteration

- **F_n**: Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, ...)
  - Natural regulation preventing explosive growth
  - Scales slowly, provides structure and balance
  - Together with E_n, approaches golden ratio (φ)

### Cognitive Layer: X · Y · Z

- **X (Objectivity)**: 1 - subjectivity
  - 0 = completely subjective (biased, emotional)
  - 1 = completely objective (fact-based, unbiased)
  - Affects entire system multiplicatively

- **Y (Purpose)**: Purpose-driven reasoning
  - 0 = no clear purpose or direction
  - 1 = strong purpose alignment
  - Prevents directionless exploration

- **Z (Time)**: Temporal continuity
  - Represents irreversibility
  - Ensures system evolves, doesn't repeat
  - No loop without learning

## Multiplicative Properties

Because this is multiplicative:
- Any zero collapses the entire system
- Changes cascade through all components
- Small shifts can create large emergent changes
- System cannot repeat unless conditions are identical`,

    "axiom://framework/layers": `# The Three Layers

## Foundation Layer (A · B · C) - Physical Reality

This is the grounding layer. Every system, problem, or question must have:

**A (Impulses)**: What drives this?
- Personal: Values, motivations, desires
- System: Forces, pressures, dynamics
- Can be positive (aligned) or negative (conflicting)

**B (Elements)**: What are the components?
- Quality of inputs, tools, resources
- Structure, architecture, composition
- Beneficial elements vs. detrimental ones

**C (Pressure)**: What constraints exist?
- Time, resources, competing demands
- Contradictions, paradoxes, tensions
- Constructive pressure (growth) vs. destructive (collapse)

**If Foundation is negative or zero, no amount of effort helps.**

## Dynamic Layer (E_n · (1 + F_n)) - Growth & Regulation

This controls how systems scale over time.

**E_n (Exponential Growth)**: Raw potential
- Represents capacity for expansion
- Scales rapidly: 1, 5, 17, 53, 161, 485...
- Provides thrust and momentum

**F_n (Fibonacci Regulation)**: Natural constraint
- Prevents explosive collapse
- Scales slowly: 1, 1, 2, 3, 5, 8, 13...
- Provides structure and balance

**Together**: Growth approaches golden ratio (φ ≈ 1.618)
- Same pattern found in nature (shells, plants, galaxies)
- Sustainable growth without collapse

## Cognitive Layer (X · Y · Z) - Alignment & Evolution

This determines quality and direction of intelligence.

**X (Objectivity)**: How clear is perception?
- Low X (high subjectivity): Biased, emotional, distorted
- High X (low subjectivity): Clear, factual, aligned with reality
- Affects ENTIRE system multiplicatively (cascade effect)

**Y (Purpose)**: Why does this matter?
- Low Y: Unclear goals, random exploration
- High Y: Clear direction, purposeful action
- Prevents wasted effort

**Z (Time)**: How does irreversibility factor in?
- Learning is irreversible (can't unlearn)
- Decisions have temporal consequences
- System must evolve, cannot stagnate

**Together**: Create coherent, purposeful, evolving intelligence`,

    "axiom://usage/reasoning": `# Reasoning with The Universal Axiom

## The Core Difference

**Traditional Reasoning**: Pattern match → Retrieve → Synthesize → Answer

**Axiom Reasoning**: Map permutation → Diagnose layers → Generate conditions → Emergent solution

## Step-by-Step Process

### 1. Map the Permutation

Identify all variables in the current situation:

- **Foundation**: What are A, B, C?
  - Impulses driving this?
  - Elements involved?
  - Pressures/constraints?

- **Dynamic**: What's the growth state?
  - Early iteration (low n) or mature?
  - Stable growth or chaotic?

- **Cognitive**: What's the alignment?
  - How objective (X)?
  - How purposeful (Y)?
  - How does time factor in (Z)?

### 2. Diagnose Which Layer Has Issues

**Foundation problems**:
- If A·B·C ≤ 0: Negative or missing foundation
- If C is very high: Extreme pressure/stress
- Fix: Adjust impulses, replace detrimental elements, manage pressure

**Dynamic problems**:
- If growth is unstable: E_n without F_n regulation
- If stagnating: Not evolving (n not increasing)
- Fix: Add regulation, allow evolution

**Cognitive problems**:
- If X is low (high subjectivity): Biased, emotional reasoning
- If Y is low: Unclear purpose/direction
- If Z is stuck: Not evolving, repeating loops
- Fix: Increase objectivity, clarify purpose, advance time

### 3. Generate Conditions for Emergence

Don't prescribe solutions. Instead:
- Adjust variables to create proper conditions
- Solutions emerge from aligned variables
- Trust the multiplicative interactions

### 4. Verify Emergent Properties

Check:
- Is intelligence increasing?
- Is coherence improving?
- Is system evolving (not repeating)?
- Are contradictions resolving?

## Key Patterns

### Pattern: Contradiction as Fuel
- Contradiction increases pressure (C)
- High C reveals misalignment (low X)
- Increasing X resolves contradiction
- Result: Higher-order synthesis

### Pattern: Cascade Effects
- Changing X affects entire system
- Multiplicative structure means no isolated changes
- Predict cascades before adjusting

### Pattern: Foundation First
- Never add pressure if foundation is negative
- Fix A, B, C before optimizing X, Y, Z
- Positive foundation required for growth`,

    "axiom://examples/debugging": `# Example: Debugging with The Axiom

## The Problem

"My application keeps crashing, and I don't know why."

## Traditional Approach

1. Check logs
2. Look for error patterns
3. Try common fixes
4. Hope something works

## Universal Axiom Approach

### Step 1: Map the Permutation

**Foundation Layer (A · B · C)**:
- **A (Impulses)**: What's the intended behavior? What drives the app?
- **B (Elements)**: What components are involved? (code, dependencies, environment)
- **C (Pressure)**: What constraints exist? (memory, concurrency, edge cases)

### Step 2: Diagnose the Layer

If crashes happen under load:
- **High C (Pressure)**: Resource constraints
- **Detrimental B (Elements)**: Memory leak, blocking calls
- **Foundation = negative or unstable**

If crashes are intermittent:
- **Low X (High Subjectivity)**: Debugging based on assumptions, not data
- **Low Y (Purpose)**: Following hunches instead of systematic investigation

### Step 3: Generate Conditions

**If Foundation is the issue**:
- Don't debug symptoms
- Fix the elements (eliminate memory leak)
- Reduce pressure (optimize resource usage)
- Foundation must become positive first

**If Cognitive is the issue**:
- Increase X: Gather objective data (profiling, metrics)
- Increase Y: Define clear debugging purpose (reproduce reliably first)
- Advance Z: Change something (don't repeat same tests)

### Step 4: Emergent Solution

With proper conditions:
- **Positive Foundation** (good elements, managed pressure)
- **High X** (objective data-driven debugging)
- **High Y** (clear purpose: find root cause)

The solution emerges from aligned conditions, not guessing.

## Key Insight

Crashing is a symptom of collapse in one or more layers. Identify which layer is collapsing, then adjust those variables. The fix emerges from properly aligned conditions.`,

    "axiom://examples/decision-making": `# Example: Decision Making with The Axiom

## The Problem

"Should I take this job offer or stay at my current company?"

## Traditional Approach

List pros and cons:
- New job pros: +1, +1, +1 = +3
- New job cons: -1, -1 = -2
- Result: +3 - 2 = +1, so take the job?

**Problem**: This is additive thinking. Ignores multiplicative interactions.

## Universal Axiom Approach

### Step 1: Map Both Permutations

**Current Job Permutation**:
- **A (Impulses)**: What drives you here? (stability, comfort, relationships)
- **B (Elements)**: What components exist? (role, team, growth, compensation)
- **C (Pressure)**: What constraints? (career growth ceiling, financial needs)
- **X**: How objectively are you evaluating? (emotional attachment vs. facts)
- **Y**: Does this align with purpose? (life goals, values)
- **Z**: How does time factor? (opportunity cost, aging skills)

**New Job Permutation**:
- Same questions, different values

### Step 2: Compute Intelligence for Each

Not "which is better" but "which permutation has higher coherent intelligence?"

**Current Job**:
- If A is low (no drive), multiplication collapses
- If B has detrimental elements (toxic culture), Foundation is negative
- If Y is low (misaligned with purpose), cognitive layer is weak
- **Result**: Low intelligence even if some pros exist

**New Job**:
- If A is high (exciting mission), Foundation strengthens
- If B is beneficial (learning, growth, good culture), Foundation is positive
- If Y is high (aligned with purpose), cognitive layer is strong
- But if X is low (emotional decision), coherence suffers

### Step 3: Identify What Needs Adjustment

**If X is low** (too emotional):
- Gather objective data
- Remove bias
- Talk to people who've made similar moves

**If Y is unclear** (no purpose):
- Don't decide yet
- Clarify life purpose first
- Then evaluate alignment

**If Foundation is negative** (bad elements):
- No amount of "pros" fixes negative foundation
- Multiplicative structure means one negative element can collapse everything

### Step 4: Let Decision Emerge

With properly aligned variables:
- **Positive Foundation** (beneficial elements, aligned impulses, managed pressure)
- **High X** (objective evaluation)
- **High Y** (clear purpose)
- **Z advancing** (recognize this is a time-sensitive, irreversible decision)

The right choice emerges from the permutation with highest coherent intelligence.

## Key Insight

Don't add pros and cons. Compute which permutation creates:
1. Positive foundation (A·B·C > 0)
2. Strong purpose alignment (high Y)
3. High objectivity (high X)
4. Proper temporal awareness (Z)

The decision emerges from multiplicative alignment, not arithmetic summing.`,
  };

  const content = resources[uri];
  if (!content) {
    throw new Error(`Resource not found: ${uri}`);
  }

  return {
    contents: [
      {
        uri,
        mimeType: "text/markdown",
        text: content,
      },
    ],
  };
});

/**
 * List available prompts
 */
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "analyze_problem",
        description: "Analyze any problem using The Universal Axiom framework",
        arguments: [
          {
            name: "problem",
            description: "Description of the problem to analyze",
            required: true,
          },
        ],
      },
      {
        name: "reason_with_axiom",
        description: "Apply Universal Axiom reasoning to generate novel insights",
        arguments: [
          {
            name: "question",
            description: "The question or challenge to reason about",
            required: true,
          },
          {
            name: "context",
            description: "Additional context about the situation",
            required: false,
          },
        ],
      },
    ],
  };
});

/**
 * Get prompt content
 */
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "analyze_problem": {
      const problem = args?.problem as string;
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Analyze this problem using The Universal Axiom framework:

${problem}

Please map the permutation by identifying:

1. **Foundation Layer (A · B · C)**:
   - A (Impulses): What are the fundamental drives?
   - B (Elements): What are the core components?
   - C (Pressure): What constraints or forces are at play?

2. **Dynamic Layer (E_n · F_n)**:
   - What's the current growth state?
   - Is there natural regulation?

3. **Cognitive Layer (X · Y · Z)**:
   - X: How objective vs. subjective is the understanding?
   - Y: What's the purpose or goal?
   - Z: How does time/irreversibility factor in?

Then diagnose which layer needs adjustment and suggest conditions for emergent solutions.`,
            },
          },
        ],
      };
    }

    case "reason_with_axiom": {
      const question = args?.question as string;
      const context = (args?.context as string) || "";

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Apply Universal Axiom reasoning to this question:

${question}

${context ? `Context: ${context}` : ""}

Remember: The Axiom doesn't answer questions. It generates the conditions from which answers must emerge.

Please:
1. Map the current permutation (all variables: A, B, C, E_n, F_n, X, Y, Z)
2. Diagnose which layers are causing stress or stagnation
3. Generate conditions for emergence (adjust variables)
4. Let the answer emerge from properly aligned conditions
5. Verify emergent properties (coherence, purpose, evolution)

Think multiplicatively, not additively. If any variable is zero, the system collapses.`,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

/**
 * Helper function to create UniversalAxiom from state object
 */
function createAxiomFromState(state: any): UniversalAxiom {
  return new UniversalAxiom({
    impulses: state.foundation?.A_impulses || 1.0,
    elements: state.foundation?.B_elements || 1.0,
    pressure: state.foundation?.C_pressure || 1.0,
    subjectivity: state.cognitive?.X_subjectivity || 0.0,
    purpose: state.cognitive?.Y_purpose || 1.0,
    time: state.cognitive?.Z_time || 1.0,
    n: state.n || 1,
  });
}

/**
 * Generate recommendations based on state analysis
 */
function generateRecommendations(state: AxiomState, coherence: number): string[] {
  const recommendations: string[] = [];

  // Foundation recommendations
  if (state.foundation.product <= 0) {
    recommendations.push(
      "❗ Critical: Foundation is negative or zero. Address impulses, elements, or pressure immediately."
    );
  } else if (state.foundation.C_pressure > 3) {
    recommendations.push(
      "⚠️ High pressure detected. Consider reducing constraints or resolving contradictions."
    );
  }

  // Cognitive recommendations
  if (state.cognitive.X_subjectivity > 0.7) {
    recommendations.push(
      "📊 High subjectivity. Increase objectivity by gathering data, reducing bias, or challenging assumptions."
    );
  }

  if (state.cognitive.Y_purpose < 0.3) {
    recommendations.push(
      "🎯 Low purpose alignment. Clarify goals and direction before proceeding."
    );
  }

  // Dynamic recommendations
  if (state.n < 3) {
    recommendations.push(
      "ℹ️ Early iteration. Allow system to evolve through multiple steps for growth potential."
    );
  }

  // Coherence recommendations
  if (coherence < 0.4) {
    recommendations.push(
      "🔧 Low coherence. System needs realignment across multiple dimensions."
    );
  } else if (coherence > 0.7) {
    recommendations.push("✅ High coherence. System is well-aligned and stable.");
  }

  if (recommendations.length === 0) {
    recommendations.push("✓ System appears balanced. Consider evolution or exploration.");
  }

  return recommendations;
}

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Universal Axiom MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
