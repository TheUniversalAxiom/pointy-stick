"""
Tests for the AI model benchmarking utilities.
"""

from python.benchmarking import (
    AxiomBenchmarkMode,
    AxiomBenchmarkRunner,
    AxiomBenchmarkScenario,
    AxiomSignals,
)
from python.universal_axiom import AxiomSimulator


class DummyAdapter:
    model_id = "dummy-model"

    def generate(self, prompt: str, mode: AxiomBenchmarkMode) -> str:
        return f"{mode.value}::{prompt}"


class DummyExtractor:
    def extract(self, prompt: str, response: str) -> AxiomSignals:
        impulses = 2.0 if response.startswith("axiom_guided") else 1.0
        return AxiomSignals(
            impulses=impulses,
            elements=1.0,
            pressure=1.0,
            subjectivity=0.0,
            purpose=1.0,
            time=1.0,
            n=1,
        )


class TestAxiomBenchmarking:
    def test_runs_scenarios_across_modes(self):
        runner = AxiomBenchmarkRunner(adapter=DummyAdapter(), extractor=DummyExtractor())
        scenarios = [
            AxiomBenchmarkScenario(
                scenario_id="s1",
                prompt="Base prompt",
                axiom_context="Axiom context",
            )
        ]

        results = runner.run(scenarios)

        assert len(results) == 2
        baseline = next(result for result in results if result.mode == AxiomBenchmarkMode.BASELINE)
        guided = next(result for result in results if result.mode == AxiomBenchmarkMode.AXIOM_GUIDED)

        assert baseline.prompt == "Base prompt"
        assert guided.prompt == "Base prompt\n\nAxiom context"
        assert baseline.intelligence < guided.intelligence

    def test_coherence_matches_simulator(self):
        runner = AxiomBenchmarkRunner(adapter=DummyAdapter(), extractor=DummyExtractor())
        scenario = AxiomBenchmarkScenario(scenario_id="s2", prompt="Check coherence")

        result = runner.run([scenario])[0]
        expected_coherence = AxiomSimulator(result.signals.to_axiom()).get_coherence_metric()

        assert result.coherence == expected_coherence
