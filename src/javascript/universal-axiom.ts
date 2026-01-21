/**
 * The Universal Axiom - Core Implementation (TypeScript)
 *
 * Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
 *
 * Foundation Layer: Impulses (A), Elements (B), Pressure (C)
 * Dynamic Layer: Exponential Growth (E_n), Fibonacci Sequence (F_n)
 * Cognitive Layer: Subjectivity Scale (X), Why Axis (Y), TimeSphere (Z)
 */

export interface FoundationState {
  impulses: number;   // A - Fundamental drives
  elements: number;   // B - Core components
  pressure: number;   // C - Constraints and forces
}

export interface DynamicState {
  n: number;                    // Current iteration/step
  baseExponential: number;      // Base for exponential growth
}

export interface CognitiveState {
  subjectivity: number;  // X - Subjectivity level (0 = objective, 1 = subjective)
  purpose: number;       // Y - Purpose-driven reasoning strength
  time: number;          // Z - Temporal continuity
}

export interface AxiomState {
  n: number;
  foundation: {
    A_impulses: number;
    B_elements: number;
    C_pressure: number;
    product: number;
  };
  dynamic: {
    E_n: number;
    F_n: number;
    product: number;
  };
  cognitive: {
    X_subjectivity: number;
    X_objectivity: number;
    Y_purpose: number;
    Z_time: number;
    product: number;
  };
  intelligence: number;
}

/**
 * Foundation Layer: A · B · C
 */
export class FoundationLayer {
  constructor(
    public impulses: number,
    public elements: number,
    public pressure: number
  ) {}

  compute(): number {
    return this.impulses * this.elements * this.pressure;
  }
}

/**
 * Dynamic Layer: E_n · (1 + F_n)
 */
export class DynamicLayer {
  constructor(
    public n: number,
    public baseExponential: number = 3
  ) {}

  exponentialGrowth(): number {
    return (2 * Math.pow(this.baseExponential, this.n)) - 1;
  }

  fibonacci(): number {
    if (this.n <= 1) return 1;

    let a = 1;
    let b = 1;

    for (let i = 2; i <= this.n; i++) {
      [a, b] = [b, a + b];
    }

    return b;
  }

  compute(): number {
    const E_n = this.exponentialGrowth();
    const F_n = this.fibonacci();
    return E_n * (1 + F_n);
  }
}

/**
 * Cognitive Layer: X · Y · Z
 */
export class CognitiveLayer {
  constructor(
    public subjectivity: number,  // 0-1 scale
    public purpose: number,
    public time: number
  ) {}

  compute(): number {
    // X represents objectivity: (1 - subjectivity)
    const objectivity = 1 - this.subjectivity;
    return objectivity * this.purpose * this.time;
  }
}

/**
 * The Universal Axiom - Complete Intelligence Model
 *
 * Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
 */
export class UniversalAxiom {
  foundation: FoundationLayer;
  dynamic: DynamicLayer;
  cognitive: CognitiveLayer;
  n: number;

  constructor({
    impulses = 1.0,
    elements = 1.0,
    pressure = 1.0,
    subjectivity = 0.0,
    purpose = 1.0,
    time = 1.0,
    n = 1
  }: Partial<FoundationState & CognitiveState & { n: number }> = {}) {
    this.foundation = new FoundationLayer(impulses, elements, pressure);
    this.dynamic = new DynamicLayer(n);
    this.cognitive = new CognitiveLayer(subjectivity, purpose, time);
    this.n = n;
  }

  /**
   * Compute Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
   */
  computeIntelligence(): number {
    const foundationValue = this.foundation.compute();
    const dynamicValue = this.dynamic.compute();
    const cognitiveValue = this.cognitive.compute();

    return dynamicValue * cognitiveValue * foundationValue;
  }

  /**
   * Evolve the system forward in time
   */
  evolve(deltaTime: number = 1.0): number {
    this.n += 1;
    this.dynamic.n = this.n;
    this.cognitive.time += deltaTime;

    return this.computeIntelligence();
  }

  /**
   * Apply pressure change (e.g., from contradictions or constraints)
   */
  applyPressure(pressureDelta: number): number {
    this.foundation.pressure += pressureDelta;
    // Ensure pressure stays positive
    this.foundation.pressure = Math.max(0.01, this.foundation.pressure);

    return this.computeIntelligence();
  }

  /**
   * Adjust subjectivity level (moving toward objectivity or away)
   */
  adjustSubjectivity(subjectivityDelta: number): number {
    this.cognitive.subjectivity += subjectivityDelta;
    // Clamp between 0 and 1
    this.cognitive.subjectivity = Math.max(0.0, Math.min(1.0, this.cognitive.subjectivity));

    return this.computeIntelligence();
  }

  /**
   * Strengthen or weaken purpose alignment
   */
  strengthenPurpose(purposeMultiplier: number): number {
    this.cognitive.purpose *= purposeMultiplier;
    this.cognitive.purpose = Math.max(0.01, this.cognitive.purpose);

    return this.computeIntelligence();
  }

  /**
   * Get current state of all variables
   */
  getState(): AxiomState {
    return {
      n: this.n,
      foundation: {
        A_impulses: this.foundation.impulses,
        B_elements: this.foundation.elements,
        C_pressure: this.foundation.pressure,
        product: this.foundation.compute()
      },
      dynamic: {
        E_n: this.dynamic.exponentialGrowth(),
        F_n: this.dynamic.fibonacci(),
        product: this.dynamic.compute()
      },
      cognitive: {
        X_subjectivity: this.cognitive.subjectivity,
        X_objectivity: 1 - this.cognitive.subjectivity,
        Y_purpose: this.cognitive.purpose,
        Z_time: this.cognitive.time,
        product: this.cognitive.compute()
      },
      intelligence: this.computeIntelligence()
    };
  }

  toString(): string {
    const state = this.getState();
    return `UniversalAxiom(n=${this.n}, Intelligence=${state.intelligence.toFixed(4)})`;
  }
}

/**
 * Simulator for running Universal Axiom scenarios
 */
export class AxiomSimulator {
  private axiom: UniversalAxiom;
  private history: AxiomState[] = [];

  constructor(axiom: UniversalAxiom) {
    this.axiom = axiom;
  }

  recordState(): void {
    this.history.push(this.axiom.getState());
  }

  /**
   * Simulate evolution over multiple time steps
   */
  simulateEvolution(steps: number = 10, deltaTime: number = 1.0): AxiomState[] {
    this.history = [];
    this.recordState();

    for (let i = 0; i < steps; i++) {
      this.axiom.evolve(deltaTime);
      this.recordState();
    }

    return this.history;
  }

  /**
   * Simulate how the system handles contradiction
   */
  simulateContradictionResolution(
    initialPressure: number = 2.0,
    resolutionSteps: number = 5
  ): AxiomState[] {
    this.history = [];
    this.recordState();

    // Apply initial pressure spike
    this.axiom.applyPressure(initialPressure);
    this.recordState();

    // Gradually resolve through objectivity adjustment and pressure release
    for (let i = 0; i < resolutionSteps; i++) {
      // Reduce subjectivity (increase objectivity)
      this.axiom.adjustSubjectivity(-0.1);

      // Release pressure as understanding increases
      const pressureRelease = -initialPressure / resolutionSteps;
      this.axiom.applyPressure(pressureRelease);

      // Evolve forward
      this.axiom.evolve();
      this.recordState();
    }

    return this.history;
  }

  /**
   * Calculate coherence metric based on balance of components
   */
  getCoherenceMetric(): number {
    const state = this.axiom.getState();

    // Coherence is high when:
    // - Objectivity is high (low subjectivity)
    // - Purpose is strong
    // - Pressure is moderate (not too high or low)

    const objectivityScore = state.cognitive.X_objectivity;
    const purposeScore = Math.min(state.cognitive.Y_purpose / 2.0, 1.0);
    const pressureScore = 1.0 / (1.0 + Math.abs(state.foundation.C_pressure - 1.0));

    return (objectivityScore + purposeScore + pressureScore) / 3.0;
  }

  getHistory(): AxiomState[] {
    return this.history;
  }
}

/**
 * Generate Fibonacci sequence up to n terms
 */
export function fibonacciSequence(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [1];

  const sequence = [1, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
}

export type ProblemStatus = 'open' | 'solved' | 'partial';

export class ProofStep {
  constructor(
    public statement: string,
    public axiomInsight: string
  ) {}

  toJSON(): { statement: string; axiom_insight: string } {
    return {
      statement: this.statement,
      axiom_insight: this.axiomInsight
    };
  }
}

export class ErdosProblem {
  proofSteps: ProofStep[];

  constructor(
    public identifier: string,
    public title: string,
    public statement: string,
    public status: ProblemStatus,
    public axiomInsight: string,
    proofSteps: ProofStep[] = []
  ) {
    this.proofSteps = proofSteps;
  }

  addProofStep(statement: string, axiomInsight: string): void {
    this.proofSteps.push(new ProofStep(statement, axiomInsight));
  }

  addProofSteps(steps: ProofStep[]): void {
    this.proofSteps.push(...steps);
  }

  toJSON(): {
    identifier: string;
    title: string;
    statement: string;
    status: ProblemStatus;
    axiom_insight: string;
    proof_steps: { statement: string; axiom_insight: string }[];
  } {
    return {
      identifier: this.identifier,
      title: this.title,
      statement: this.statement,
      status: this.status,
      axiom_insight: this.axiomInsight,
      proof_steps: this.proofSteps.map((step) => step.toJSON())
    };
  }
}

export class MathSolutions {
  private problems: Map<string, ErdosProblem>;

  constructor(problems: ErdosProblem[] = []) {
    this.problems = new Map();
    problems.forEach((problem) => this.addProblem(problem));
  }

  static erdosSeed(): MathSolutions {
    return new MathSolutions(seedErdosProblems());
  }

  addProblem(problem: ErdosProblem): void {
    this.problems.set(problem.identifier, problem);
  }

  getProblem(identifier: string): ErdosProblem {
    const problem = this.problems.get(identifier);
    if (!problem) {
      throw new Error(`Unknown problem identifier: ${identifier}`);
    }
    return problem;
  }

  listProblems(): ErdosProblem[] {
    return Array.from(this.problems.values());
  }

  addProofStep(identifier: string, statement: string, axiomInsight: string): void {
    const problem = this.getProblem(identifier);
    problem.addProofStep(statement, axiomInsight);
  }

  summaries(): { identifier: string; title: string; status: ProblemStatus }[] {
    return Array.from(this.problems.values()).map((problem) => ({
      identifier: problem.identifier,
      title: problem.title,
      status: problem.status
    }));
  }
}

function seedErdosProblems(): ErdosProblem[] {
  return [
    new ErdosProblem(
      'erdos-straus',
      'Erdos–Straus Conjecture',
      'For every integer n ≥ 2, the rational 4/n can be expressed as the sum of three unit fractions: 4/n = 1/x + 1/y + 1/z for integers x, y, z.',
      'open',
      'The axiom highlights how constraints (C) and growth (E_n, F_n) interact, suggesting structured pathways to decompositions.'
    ),
    new ErdosProblem(
      'erdos-distinct-distances',
      'Erdos Distinct Distances Problem',
      'Determine the minimum number of distinct distances defined by n points in the plane.',
      'solved',
      'Balancing combinatorial growth (E_n) with structural regulation (F_n) mirrors the tension between point density and distance diversity.'
    )
  ];
}
