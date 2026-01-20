"""
Benchmarking utilities for comparing AI models against and with The Universal Axiom.
"""

from dataclasses import dataclass
from enum import Enum
from typing import Iterable, List, Protocol, Sequence

from .universal_axiom import AxiomSimulator, UniversalAxiom


class AxiomBenchmarkMode(Enum):
    """Benchmark modes for comparing baseline vs axiom-guided behavior."""

    BASELINE = "baseline"
    AXIOM_GUIDED = "axiom_guided"


@dataclass(frozen=True)
class AxiomSignals:
    """Signals mapped to the Universal Axiom variables (A, B, C, X, Y, Z, n)."""

    impulses: float
    elements: float
    pressure: float
    subjectivity: float
    purpose: float
    time: float
    n: int = 1

    def to_axiom(self) -> UniversalAxiom:
        """Create a UniversalAxiom instance from the signals."""
        return UniversalAxiom(
            impulses=self.impulses,
            elements=self.elements,
            pressure=self.pressure,
            subjectivity=self.subjectivity,
            purpose=self.purpose,
            time=self.time,
            n=self.n,
        )


@dataclass(frozen=True)
class AxiomBenchmarkScenario:
    """Benchmark scenario configuration."""

    scenario_id: str
    prompt: str
    axiom_context: str | None = None

    def render_prompt(self, mode: AxiomBenchmarkMode) -> str:
        """Render the prompt for the selected benchmark mode."""
        if mode == AxiomBenchmarkMode.AXIOM_GUIDED and self.axiom_context:
            return f"{self.prompt}\n\n{self.axiom_context}"
        return self.prompt


@dataclass(frozen=True)
class AxiomBenchmarkResult:
    """Benchmark result containing both axiom metrics and response details."""

    model_id: str
    scenario_id: str
    mode: AxiomBenchmarkMode
    prompt: str
    response: str
    signals: AxiomSignals
    intelligence: float
    coherence: float


class AxiomModelAdapter(Protocol):
    """Adapter interface for generating model responses."""

    model_id: str

    def generate(self, prompt: str, mode: AxiomBenchmarkMode) -> str:
        """Generate a response for the given prompt."""


class AxiomSignalExtractor(Protocol):
    """Extractor interface for mapping responses to Axiom signals."""

    def extract(self, prompt: str, response: str) -> AxiomSignals:
        """Extract A, B, C, X, Y, Z, n signals from the response."""


@dataclass
class AxiomBenchmarkRunner:
    """Run benchmark scenarios against a model adapter."""

    adapter: AxiomModelAdapter
    extractor: AxiomSignalExtractor
    modes: Sequence[AxiomBenchmarkMode] = (
        AxiomBenchmarkMode.BASELINE,
        AxiomBenchmarkMode.AXIOM_GUIDED,
    )

    def run(self, scenarios: Iterable[AxiomBenchmarkScenario]) -> List[AxiomBenchmarkResult]:
        """Run all scenarios across the configured modes."""
        results: List[AxiomBenchmarkResult] = []

        for scenario in scenarios:
            for mode in self.modes:
                prompt = scenario.render_prompt(mode)
                response = self.adapter.generate(prompt, mode)
                signals = self.extractor.extract(prompt, response)
                axiom = signals.to_axiom()
                intelligence = axiom.compute_intelligence()
                coherence = AxiomSimulator(axiom).get_coherence_metric()

                results.append(
                    AxiomBenchmarkResult(
                        model_id=self.adapter.model_id,
                        scenario_id=scenario.scenario_id,
                        mode=mode,
                        prompt=prompt,
                        response=response,
                        signals=signals,
                        intelligence=intelligence,
                        coherence=coherence,
                    )
                )

        return results
