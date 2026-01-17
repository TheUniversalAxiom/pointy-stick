"use strict";
/**
 * The Universal Axiom - Core Implementation (TypeScript)
 *
 * Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
 *
 * Foundation Layer: Impulses (A), Elements (B), Pressure (C)
 * Dynamic Layer: Exponential Growth (E_n), Fibonacci Sequence (F_n)
 * Cognitive Layer: Subjectivity Scale (X), Why Axis (Y), TimeSphere (Z)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiomSimulator = exports.UniversalAxiom = exports.CognitiveLayer = exports.DynamicLayer = exports.FoundationLayer = void 0;
exports.fibonacciSequence = fibonacciSequence;
/**
 * Foundation Layer: A · B · C
 */
class FoundationLayer {
    impulses;
    elements;
    pressure;
    constructor(impulses, elements, pressure) {
        this.impulses = impulses;
        this.elements = elements;
        this.pressure = pressure;
    }
    compute() {
        return this.impulses * this.elements * this.pressure;
    }
}
exports.FoundationLayer = FoundationLayer;
/**
 * Dynamic Layer: E_n · (1 + F_n)
 */
class DynamicLayer {
    n;
    baseExponential;
    constructor(n, baseExponential = 3) {
        this.n = n;
        this.baseExponential = baseExponential;
    }
    exponentialGrowth() {
        return (2 * Math.pow(this.baseExponential, this.n)) - 1;
    }
    fibonacci() {
        if (this.n <= 1)
            return 1;
        let a = 1;
        let b = 1;
        for (let i = 2; i <= this.n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    }
    compute() {
        const E_n = this.exponentialGrowth();
        const F_n = this.fibonacci();
        return E_n * (1 + F_n);
    }
}
exports.DynamicLayer = DynamicLayer;
/**
 * Cognitive Layer: X · Y · Z
 */
class CognitiveLayer {
    subjectivity;
    purpose;
    time;
    constructor(subjectivity, // 0-1 scale
    purpose, time) {
        this.subjectivity = subjectivity;
        this.purpose = purpose;
        this.time = time;
    }
    compute() {
        // X represents objectivity: (1 - subjectivity)
        const objectivity = 1 - this.subjectivity;
        return objectivity * this.purpose * this.time;
    }
}
exports.CognitiveLayer = CognitiveLayer;
/**
 * The Universal Axiom - Complete Intelligence Model
 *
 * Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
 */
class UniversalAxiom {
    foundation;
    dynamic;
    cognitive;
    n;
    constructor({ impulses = 1.0, elements = 1.0, pressure = 1.0, subjectivity = 0.0, purpose = 1.0, time = 1.0, n = 1 } = {}) {
        this.foundation = new FoundationLayer(impulses, elements, pressure);
        this.dynamic = new DynamicLayer(n);
        this.cognitive = new CognitiveLayer(subjectivity, purpose, time);
        this.n = n;
    }
    /**
     * Compute Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
     */
    computeIntelligence() {
        const foundationValue = this.foundation.compute();
        const dynamicValue = this.dynamic.compute();
        const cognitiveValue = this.cognitive.compute();
        return dynamicValue * cognitiveValue * foundationValue;
    }
    /**
     * Evolve the system forward in time
     */
    evolve(deltaTime = 1.0) {
        this.n += 1;
        this.dynamic.n = this.n;
        this.cognitive.time += deltaTime;
        return this.computeIntelligence();
    }
    /**
     * Apply pressure change (e.g., from contradictions or constraints)
     */
    applyPressure(pressureDelta) {
        this.foundation.pressure += pressureDelta;
        // Ensure pressure stays positive
        this.foundation.pressure = Math.max(0.01, this.foundation.pressure);
        return this.computeIntelligence();
    }
    /**
     * Adjust subjectivity level (moving toward objectivity or away)
     */
    adjustSubjectivity(subjectivityDelta) {
        this.cognitive.subjectivity += subjectivityDelta;
        // Clamp between 0 and 1
        this.cognitive.subjectivity = Math.max(0.0, Math.min(1.0, this.cognitive.subjectivity));
        return this.computeIntelligence();
    }
    /**
     * Strengthen or weaken purpose alignment
     */
    strengthenPurpose(purposeMultiplier) {
        this.cognitive.purpose *= purposeMultiplier;
        this.cognitive.purpose = Math.max(0.01, this.cognitive.purpose);
        return this.computeIntelligence();
    }
    /**
     * Get current state of all variables
     */
    getState() {
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
    toString() {
        const state = this.getState();
        return `UniversalAxiom(n=${this.n}, Intelligence=${state.intelligence.toFixed(4)})`;
    }
}
exports.UniversalAxiom = UniversalAxiom;
/**
 * Simulator for running Universal Axiom scenarios
 */
class AxiomSimulator {
    axiom;
    history = [];
    constructor(axiom) {
        this.axiom = axiom;
    }
    recordState() {
        this.history.push(this.axiom.getState());
    }
    /**
     * Simulate evolution over multiple time steps
     */
    simulateEvolution(steps = 10, deltaTime = 1.0) {
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
    simulateContradictionResolution(initialPressure = 2.0, resolutionSteps = 5) {
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
    getCoherenceMetric() {
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
    getHistory() {
        return this.history;
    }
}
exports.AxiomSimulator = AxiomSimulator;
/**
 * Generate Fibonacci sequence up to n terms
 */
function fibonacciSequence(n) {
    if (n <= 0)
        return [];
    if (n === 1)
        return [1];
    const sequence = [1, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}
//# sourceMappingURL=universal-axiom.js.map