/*!
 * The Universal Axiom - Core Implementation (Rust)
 *
 * Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
 *
 * Foundation Layer: Impulses (A), Elements (B), Pressure (C)
 * Dynamic Layer: Exponential Growth (E_n), Fibonacci Sequence (F_n)
 * Cognitive Layer: Subjectivity Scale (X), Why Axis (Y), TimeSphere (Z)
 */

use serde::{Deserialize, Serialize};
use std::f64::consts::E;

/// Foundation Layer: A · B · C
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FoundationLayer {
    /// A - Fundamental drives
    pub impulses: f64,
    /// B - Core components
    pub elements: f64,
    /// C - Constraints and forces
    pub pressure: f64,
}

impl FoundationLayer {
    pub fn new(impulses: f64, elements: f64, pressure: f64) -> Self {
        Self {
            impulses,
            elements,
            pressure,
        }
    }

    pub fn compute(&self) -> f64 {
        self.impulses * self.elements * self.pressure
    }
}

/// Dynamic Layer: E_n · (1 + F_n)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DynamicLayer {
    /// Current iteration/step
    pub n: usize,
    /// Base for exponential growth
    pub base_exponential: f64,
}

impl DynamicLayer {
    pub fn new(n: usize) -> Self {
        Self {
            n,
            base_exponential: E,
        }
    }

    pub fn exponential_growth(&self) -> f64 {
        self.base_exponential.powi(self.n as i32)
    }

    pub fn fibonacci(&self) -> u64 {
        if self.n <= 1 {
            return self.n as u64;
        }

        let mut a = 0u64;
        let mut b = 1u64;

        for _ in 2..=self.n {
            let temp = a + b;
            a = b;
            b = temp;
        }

        b
    }

    pub fn compute(&self) -> f64 {
        let e_n = self.exponential_growth();
        let f_n = self.fibonacci() as f64;
        e_n * (1.0 + f_n)
    }
}

/// Cognitive Layer: X · Y · Z
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CognitiveLayer {
    /// X - Subjectivity level (0 = objective, 1 = subjective)
    pub subjectivity: f64,
    /// Y - Purpose-driven reasoning strength
    pub purpose: f64,
    /// Z - Temporal continuity and irreversibility
    pub time: f64,
}

impl CognitiveLayer {
    pub fn new(subjectivity: f64, purpose: f64, time: f64) -> Self {
        Self {
            subjectivity,
            purpose,
            time,
        }
    }

    pub fn compute(&self) -> f64 {
        // X represents objectivity: (1 - subjectivity)
        let objectivity = 1.0 - self.subjectivity;
        objectivity * self.purpose * self.time
    }

    pub fn objectivity(&self) -> f64 {
        1.0 - self.subjectivity
    }
}

/// Complete state of the Universal Axiom
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AxiomState {
    pub n: usize,
    pub foundation: FoundationState,
    pub dynamic: DynamicState,
    pub cognitive: CognitiveState,
    pub intelligence: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FoundationState {
    pub a_impulses: f64,
    pub b_elements: f64,
    pub c_pressure: f64,
    pub product: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DynamicState {
    pub e_n: f64,
    pub f_n: u64,
    pub product: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CognitiveState {
    pub x_subjectivity: f64,
    pub x_objectivity: f64,
    pub y_purpose: f64,
    pub z_time: f64,
    pub product: f64,
}

/// The Universal Axiom - Complete Intelligence Model
///
/// Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
#[derive(Debug, Clone)]
pub struct UniversalAxiom {
    pub foundation: FoundationLayer,
    pub dynamic: DynamicLayer,
    pub cognitive: CognitiveLayer,
    pub n: usize,
}

impl UniversalAxiom {
    pub fn new() -> Self {
        Self::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1)
    }

    pub fn with_params(
        impulses: f64,
        elements: f64,
        pressure: f64,
        subjectivity: f64,
        purpose: f64,
        time: f64,
        n: usize,
    ) -> Self {
        Self {
            foundation: FoundationLayer::new(impulses, elements, pressure),
            dynamic: DynamicLayer::new(n),
            cognitive: CognitiveLayer::new(subjectivity, purpose, time),
            n,
        }
    }

    /// Compute Intelligence_n = E_n · (1 + F_n) · X · Y · Z · (A · B · C)
    pub fn compute_intelligence(&self) -> f64 {
        let foundation_value = self.foundation.compute();
        let dynamic_value = self.dynamic.compute();
        let cognitive_value = self.cognitive.compute();

        dynamic_value * cognitive_value * foundation_value
    }

    /// Evolve the system forward in time
    pub fn evolve(&mut self, delta_time: f64) -> f64 {
        self.n += 1;
        self.dynamic.n = self.n;
        self.cognitive.time += delta_time;

        self.compute_intelligence()
    }

    /// Apply pressure change (e.g., from contradictions or constraints)
    pub fn apply_pressure(&mut self, pressure_delta: f64) -> f64 {
        self.foundation.pressure += pressure_delta;
        // Ensure pressure stays positive
        self.foundation.pressure = self.foundation.pressure.max(0.01);

        self.compute_intelligence()
    }

    /// Adjust subjectivity level (moving toward objectivity or away)
    pub fn adjust_subjectivity(&mut self, subjectivity_delta: f64) -> f64 {
        self.cognitive.subjectivity += subjectivity_delta;
        // Clamp between 0 and 1
        self.cognitive.subjectivity = self.cognitive.subjectivity.max(0.0).min(1.0);

        self.compute_intelligence()
    }

    /// Strengthen or weaken purpose alignment
    pub fn strengthen_purpose(&mut self, purpose_multiplier: f64) -> f64 {
        self.cognitive.purpose *= purpose_multiplier;
        self.cognitive.purpose = self.cognitive.purpose.max(0.01);

        self.compute_intelligence()
    }

    /// Get current state of all variables
    pub fn get_state(&self) -> AxiomState {
        AxiomState {
            n: self.n,
            foundation: FoundationState {
                a_impulses: self.foundation.impulses,
                b_elements: self.foundation.elements,
                c_pressure: self.foundation.pressure,
                product: self.foundation.compute(),
            },
            dynamic: DynamicState {
                e_n: self.dynamic.exponential_growth(),
                f_n: self.dynamic.fibonacci(),
                product: self.dynamic.compute(),
            },
            cognitive: CognitiveState {
                x_subjectivity: self.cognitive.subjectivity,
                x_objectivity: self.cognitive.objectivity(),
                y_purpose: self.cognitive.purpose,
                z_time: self.cognitive.time,
                product: self.cognitive.compute(),
            },
            intelligence: self.compute_intelligence(),
        }
    }
}

impl Default for UniversalAxiom {
    fn default() -> Self {
        Self::new()
    }
}

/// Simulator for running Universal Axiom scenarios
pub struct AxiomSimulator {
    axiom: UniversalAxiom,
    history: Vec<AxiomState>,
}

impl AxiomSimulator {
    pub fn new(axiom: UniversalAxiom) -> Self {
        Self {
            axiom,
            history: Vec::new(),
        }
    }

    pub fn record_state(&mut self) {
        self.history.push(self.axiom.get_state());
    }

    /// Simulate evolution over multiple time steps
    pub fn simulate_evolution(&mut self, steps: usize, delta_time: f64) -> &Vec<AxiomState> {
        self.history.clear();
        self.record_state();

        for _ in 0..steps {
            self.axiom.evolve(delta_time);
            self.record_state();
        }

        &self.history
    }

    /// Simulate how the system handles contradiction
    pub fn simulate_contradiction_resolution(
        &mut self,
        initial_pressure: f64,
        resolution_steps: usize,
    ) -> &Vec<AxiomState> {
        self.history.clear();
        self.record_state();

        // Apply initial pressure spike
        self.axiom.apply_pressure(initial_pressure);
        self.record_state();

        // Gradually resolve through objectivity adjustment and pressure release
        for _ in 0..resolution_steps {
            // Reduce subjectivity (increase objectivity)
            self.axiom.adjust_subjectivity(-0.1);

            // Release pressure as understanding increases
            let pressure_release = -initial_pressure / resolution_steps as f64;
            self.axiom.apply_pressure(pressure_release);

            // Evolve forward
            self.axiom.evolve(1.0);
            self.record_state();
        }

        &self.history
    }

    /// Calculate coherence metric based on balance of components
    pub fn get_coherence_metric(&self) -> f64 {
        let state = self.axiom.get_state();

        let objectivity_score = state.cognitive.x_objectivity;
        let purpose_score = (state.cognitive.y_purpose / 2.0).min(1.0);
        let pressure_score = 1.0 / (1.0 + (state.foundation.c_pressure - 1.0).abs());

        (objectivity_score + purpose_score + pressure_score) / 3.0
    }

    pub fn get_history(&self) -> &Vec<AxiomState> {
        &self.history
    }
}

/// Generate Fibonacci sequence up to n terms
pub fn fibonacci_sequence(n: usize) -> Vec<u64> {
    if n == 0 {
        return vec![];
    }
    if n == 1 {
        return vec![0];
    }

    let mut sequence = vec![0, 1];
    for i in 2..n {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    sequence
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::f64::consts::E;

    // Foundation Layer Tests
    #[test]
    fn test_foundation_initialization() {
        let foundation = FoundationLayer::new(1.0, 1.0, 1.0);
        assert_eq!(foundation.impulses, 1.0);
        assert_eq!(foundation.elements, 1.0);
        assert_eq!(foundation.pressure, 1.0);
    }

    #[test]
    fn test_foundation_compute_product() {
        let foundation = FoundationLayer::new(2.0, 3.0, 1.5);
        assert_eq!(foundation.compute(), 2.0 * 3.0 * 1.5);
    }

    // Dynamic Layer Tests
    #[test]
    fn test_fibonacci_sequence_generation() {
        let sequence = fibonacci_sequence(12);
        let expected = vec![0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
        assert_eq!(sequence, expected);
    }

    #[test]
    fn test_fibonacci_at_n() {
        let dynamic1 = DynamicLayer::new(1);
        assert_eq!(dynamic1.fibonacci(), 1);

        let dynamic10 = DynamicLayer::new(10);
        assert_eq!(dynamic10.fibonacci(), 55);
    }

    #[test]
    fn test_exponential_growth() {
        let dynamic = DynamicLayer::new(1);
        assert!((dynamic.exponential_growth() - E).abs() < 1e-6);

        let dynamic2 = DynamicLayer::new(2);
        assert!((dynamic2.exponential_growth() - E.powi(2)).abs() < 1e-5);
    }

    #[test]
    fn test_dynamic_compute_product() {
        let dynamic = DynamicLayer::new(1);
        let e_n = E;
        let f_n = 1.0;
        let expected = e_n * (1.0 + f_n);
        assert!((dynamic.compute() - expected).abs() < 1e-6);
    }

    // Cognitive Layer Tests
    #[test]
    fn test_subjectivity_objectivity_relationship() {
        let cognitive = CognitiveLayer::new(0.3, 1.0, 1.0);
        let objectivity = cognitive.objectivity();
        assert_eq!(objectivity, 0.7);
    }

    #[test]
    fn test_cognitive_compute_product() {
        let cognitive = CognitiveLayer::new(0.2, 1.5, 2.0);
        let expected = 0.8 * 1.5 * 2.0;
        assert_eq!(cognitive.compute(), expected);
    }

    // Universal Axiom Core Formula Tests
    #[test]
    fn test_axiom_initialization() {
        let axiom = UniversalAxiom::new();
        assert_eq!(axiom.n, 1);
    }

    #[test]
    fn test_core_formula_computation() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);

        let a_b_c = 1.0 * 1.0 * 1.0;
        let e_n = E.powi(1);
        let f_n = 1.0;
        let e_f = e_n * (1.0 + f_n);
        let x_y_z = 1.0 * 1.0 * 1.0;
        let expected = e_f * x_y_z * a_b_c;

        let intelligence = axiom.compute_intelligence();
        assert!((intelligence - expected).abs() < 1e-6);
    }

    #[test]
    fn test_intelligence_at_n_1() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let intelligence = axiom.compute_intelligence();
        assert!((intelligence - 5.436564).abs() < 0.001);
    }

    #[test]
    fn test_intelligence_at_n_10() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        for _ in 0..9 {
            axiom.evolve(1.0);
        }
        let intelligence = axiom.compute_intelligence();
        assert!(intelligence > 12_000_000.0);
        assert!(intelligence < 13_000_000.0);
    }

    #[test]
    fn test_evolve_increases_intelligence() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let intelligence_before = axiom.compute_intelligence();
        axiom.evolve(1.0);
        let intelligence_after = axiom.compute_intelligence();
        assert!(intelligence_after > intelligence_before);
    }

    #[test]
    fn test_apply_pressure_increases_foundation() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let intelligence_before = axiom.compute_intelligence();
        axiom.apply_pressure(1.0);
        let intelligence_after = axiom.compute_intelligence();
        assert!(intelligence_after > intelligence_before);
    }

    #[test]
    fn test_pressure_clamping_minimum() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        axiom.apply_pressure(-10.0);
        assert_eq!(axiom.foundation.pressure, 0.01);
    }

    #[test]
    fn test_adjust_subjectivity_changes_objectivity() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1);
        let intelligence_before = axiom.compute_intelligence();
        axiom.adjust_subjectivity(-0.2);
        let intelligence_after = axiom.compute_intelligence();
        assert!(intelligence_after > intelligence_before);
        assert_eq!(axiom.cognitive.subjectivity, 0.3);
    }

    #[test]
    fn test_subjectivity_clamping() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1);
        axiom.adjust_subjectivity(1.0);
        assert_eq!(axiom.cognitive.subjectivity, 1.0);

        axiom.adjust_subjectivity(-2.0);
        assert_eq!(axiom.cognitive.subjectivity, 0.0);
    }

    #[test]
    fn test_strengthen_purpose_multiplier() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let intelligence_before = axiom.compute_intelligence();
        axiom.strengthen_purpose(1.5);
        assert_eq!(axiom.cognitive.purpose, 1.5);
        let intelligence_after = axiom.compute_intelligence();
        assert!(intelligence_after > intelligence_before);
    }

    #[test]
    fn test_get_state_completeness() {
        let axiom = UniversalAxiom::new();
        let state = axiom.get_state();
        assert_eq!(state.n, 1);
        assert!(state.intelligence > 0.0);
    }

    #[test]
    fn test_negative_impulses() {
        let axiom = UniversalAxiom::with_params(-1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let intelligence = axiom.compute_intelligence();
        assert!(intelligence < 0.0);
    }

    #[test]
    fn test_extreme_subjectivity() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1);
        let intelligence = axiom.compute_intelligence();
        assert_eq!(intelligence, 0.0);
    }

    #[test]
    fn test_extreme_objectivity() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let intelligence = axiom.compute_intelligence();
        assert!(intelligence > 0.0);
    }

    // AxiomSimulator Tests
    #[test]
    fn test_simulator_initialization() {
        let axiom = UniversalAxiom::new();
        let _simulator = AxiomSimulator::new(axiom);
    }

    #[test]
    fn test_simulate_evolution_tracks_history() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let mut simulator = AxiomSimulator::new(axiom);
        let history = simulator.simulate_evolution(5, 1.0);

        assert_eq!(history.len(), 6); // initial + 5 steps
        assert_eq!(history[0].n, 1);
        assert_eq!(history[5].n, 6);
    }

    #[test]
    fn test_contradiction_resolution_reduces_subjectivity() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1);
        let initial_subjectivity = axiom.cognitive.subjectivity;
        let mut simulator = AxiomSimulator::new(axiom);

        let history = simulator.simulate_contradiction_resolution(2.0, 5);
        let final_subjectivity = history[history.len() - 1].cognitive.x_subjectivity;

        assert!(final_subjectivity < initial_subjectivity);
    }

    #[test]
    fn test_coherence_metric_high_objectivity() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.1, 2.0, 1.0, 1);
        let simulator = AxiomSimulator::new(axiom);
        let coherence = simulator.get_coherence_metric();
        assert!(coherence > 0.8);
    }

    #[test]
    fn test_coherence_decreases_with_subjectivity() {
        let axiom_objective = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.1, 1.0, 1.0, 1);
        let coherence_objective = AxiomSimulator::new(axiom_objective).get_coherence_metric();

        let axiom_subjective = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.8, 1.0, 1.0, 1);
        let coherence_subjective = AxiomSimulator::new(axiom_subjective).get_coherence_metric();

        assert!(coherence_objective > coherence_subjective);
    }

    #[test]
    fn test_no_stagnation_with_evolution() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let mut simulator = AxiomSimulator::new(axiom);
        let history = simulator.simulate_evolution(10, 1.0);

        let intelligences: Vec<f64> = history.iter().map(|s| s.intelligence).collect();

        // Verify monotonic increase
        for i in 1..intelligences.len() {
            assert!(intelligences[i] > intelligences[i - 1]);
        }
    }

    // PROMPT.md Compliance Tests
    #[test]
    fn test_axiom_is_deterministic() {
        let axiom1 = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 5);
        let axiom2 = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 5);
        assert_eq!(axiom1.compute_intelligence(), axiom2.compute_intelligence());
    }

    #[test]
    fn test_fibonacci_regulation_of_dynamics() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let mut simulator = AxiomSimulator::new(axiom);
        let history = simulator.simulate_evolution(10, 1.0);

        let fib_values: Vec<u64> = history.iter().take(10).map(|s| s.dynamic.f_n).collect();
        let expected = vec![1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

        assert_eq!(fib_values, expected);
    }

    #[test]
    fn test_pressure_reveals_contradictions() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1);
        axiom.apply_pressure(2.0);
        assert_eq!(axiom.foundation.pressure, 3.0);
    }

    #[test]
    fn test_timesphere_advancement() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        let mut simulator = AxiomSimulator::new(axiom);
        let history = simulator.simulate_evolution(5, 1.0);

        let times: Vec<f64> = history.iter().map(|s| s.cognitive.z_time).collect();
        let expected = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0];

        for (i, &time) in times.iter().enumerate() {
            assert!((time - expected[i]).abs() < 1e-6);
        }
    }

    #[test]
    fn test_foundation_abc_variables() {
        let axiom = UniversalAxiom::with_params(2.0, 3.0, 1.5, 0.0, 1.0, 1.0, 1);
        let state = axiom.get_state();

        assert_eq!(state.foundation.a_impulses, 2.0);
        assert_eq!(state.foundation.b_elements, 3.0);
        assert_eq!(state.foundation.c_pressure, 1.5);
        assert_eq!(state.foundation.product, 2.0 * 3.0 * 1.5);
    }

    #[test]
    fn test_cognitive_xyz_variables() {
        let axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.3, 1.5, 2.0, 1);
        let state = axiom.get_state();

        assert_eq!(state.cognitive.x_subjectivity, 0.3);
        assert_eq!(state.cognitive.x_objectivity, 0.7);
        assert_eq!(state.cognitive.y_purpose, 1.5);
        assert_eq!(state.cognitive.z_time, 2.0);
    }

    #[test]
    fn test_large_n_fibonacci_growth() {
        let mut axiom = UniversalAxiom::with_params(1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1);
        for _ in 0..19 {
            axiom.evolve(1.0);
        }

        let intelligence = axiom.compute_intelligence();
        assert!(intelligence > 0.0);
        assert!(intelligence.is_finite());
    }
}
