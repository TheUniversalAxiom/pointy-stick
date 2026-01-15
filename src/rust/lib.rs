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
            base_exponential: 3.0,
        }
    }

    pub fn exponential_growth(&self) -> f64 {
        (2.0 * self.base_exponential.powi(self.n as i32)) - 1.0
    }

    pub fn fibonacci(&self) -> u64 {
        if self.n <= 1 {
            return 1;
        }

        let mut a = 1u64;
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
        return vec![1];
    }

    let mut sequence = vec![1, 1];
    for i in 2..n {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    sequence
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_fibonacci() {
        let dynamic = DynamicLayer::new(10);
        assert_eq!(dynamic.fibonacci(), 89);
    }

    #[test]
    fn test_basic_computation() {
        let axiom = UniversalAxiom::new();
        let intelligence = axiom.compute_intelligence();
        assert!(intelligence > 0.0);
    }

    #[test]
    fn test_evolution() {
        let mut axiom = UniversalAxiom::new();
        let initial = axiom.compute_intelligence();
        axiom.evolve(1.0);
        let evolved = axiom.compute_intelligence();
        assert!(evolved > initial);
    }
}
