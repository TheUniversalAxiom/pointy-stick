/**
 * The Universal Axiom - Core Implementation (TypeScript)
 *
 * Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
 *
 * Foundation Layer: Impulses (A), Elements (B), Pressure (C)
 * Dynamic Layer: Exponential Growth (E_n), Fibonacci Sequence (F_n)
 * Cognitive Layer: Subjectivity Scale (X), Why Axis (Y), TimeSphere (Z)
 */

/**
 * Maximum allowed value for n to prevent overflow
 * At n=70, Fibonacci exceeds Number.MAX_SAFE_INTEGER
 * At n=33, E_n exceeds Number.MAX_SAFE_INTEGER
 * We use 100 as a practical limit
 */
export const MAX_N = 100;

/**
 * State interface for the Axiom system
 */
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
  private _n: number;

  constructor(n: number, public baseExponential: number = 3) {
    // Validate and clamp n to valid range [1, MAX_N]
    this._n = Math.max(1, Math.min(MAX_N, Math.floor(n)));
  }

  get n(): number {
    return this._n;
  }

  set n(value: number) {
    // Validate and clamp n to valid range [1, MAX_N]
    this._n = Math.max(1, Math.min(MAX_N, Math.floor(value)));
  }

  exponentialGrowth(): number {
    const result = 2 * Math.pow(this.baseExponential, this._n) - 1;
    // Return MAX_SAFE_INTEGER if overflow would occur
    if (!Number.isFinite(result)) {
      return Number.MAX_SAFE_INTEGER;
    }
    return result;
  }

  fibonacci(): number {
    if (this._n <= 1) return 1;
    let a = 1;
    let b = 1;
    for (let i = 2; i <= this._n; i++) {
      const next = a + b;
      // Check for overflow
      if (!Number.isFinite(next) || next > Number.MAX_SAFE_INTEGER) {
        return Number.MAX_SAFE_INTEGER;
      }
      [a, b] = [b, next];
    }
    return b;
  }

  compute(): number {
    const E_n = this.exponentialGrowth();
    const F_n = this.fibonacci();
    const result = E_n * (1 + F_n);
    // Return MAX_SAFE_INTEGER if overflow would occur
    if (!Number.isFinite(result)) {
      return Number.MAX_SAFE_INTEGER;
    }
    return result;
  }
}

/**
 * Cognitive Layer: X · Y · Z
 */
export class CognitiveLayer {
  constructor(
    public subjectivity: number, // 0-1 scale
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
 * Configuration for creating a UniversalAxiom instance
 */
export interface AxiomConfig {
  impulses?: number;
  elements?: number;
  pressure?: number;
  subjectivity?: number;
  purpose?: number;
  time?: number;
  n?: number;
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
    n = 1,
  }: AxiomConfig = {}) {
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
   * Note: n is clamped to MAX_N to prevent overflow
   */
  evolve(deltaTime: number = 1.0): number {
    this.n = Math.min(this.n + 1, MAX_N);
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
    this.cognitive.subjectivity = Math.max(
      0.0,
      Math.min(1.0, this.cognitive.subjectivity)
    );
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
        product: this.foundation.compute(),
      },
      dynamic: {
        E_n: this.dynamic.exponentialGrowth(),
        F_n: this.dynamic.fibonacci(),
        product: this.dynamic.compute(),
      },
      cognitive: {
        X_subjectivity: this.cognitive.subjectivity,
        X_objectivity: 1 - this.cognitive.subjectivity,
        Y_purpose: this.cognitive.purpose,
        Z_time: this.cognitive.time,
        product: this.cognitive.compute(),
      },
      intelligence: this.computeIntelligence(),
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
  private history: AxiomState[] = [];

  constructor(private axiom: UniversalAxiom) {}

  private recordState(): void {
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
    const pressureScore =
      1.0 / (1.0 + Math.abs(state.foundation.C_pressure - 1.0));

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
