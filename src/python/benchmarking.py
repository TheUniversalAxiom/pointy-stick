"""
Benchmarking utilities for comparing AI models against and with The Universal Axiom.
"""

from dataclasses import dataclass
from enum import Enum
import json
import os
from typing import Iterable, List, Mapping, Protocol, Sequence
from urllib import request

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
class OpenAICompatibleAdapter:
    """Adapter for OpenAI-compatible chat completion APIs."""

    model_id: str
    api_base_url: str = "https://api.openai.com/v1/chat/completions"
    api_key_env: str = "OPENAI_API_KEY"
    organization_env: str | None = "OPENAI_ORG_ID"
    timeout_seconds: float = 60.0

    def _build_headers(self) -> Mapping[str, str]:
        api_key = os.environ.get(self.api_key_env)
        if not api_key:
            raise ValueError(
                f"Missing API key. Set {self.api_key_env} in the environment."
            )

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        if self.organization_env:
            organization = os.environ.get(self.organization_env)
            if organization:
                headers["OpenAI-Organization"] = organization
        return headers

    def generate(self, prompt: str, mode: AxiomBenchmarkMode) -> str:
        """Generate a response using an OpenAI-compatible chat completion API."""
        payload = {
            "model": self.model_id,
            "messages": [
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            "temperature": 0.2 if mode == AxiomBenchmarkMode.AXIOM_GUIDED else 0.7,
        }
        data = json.dumps(payload).encode("utf-8")
        headers = self._build_headers()

        req = request.Request(self.api_base_url, data=data, headers=headers, method="POST")
        with request.urlopen(req, timeout=self.timeout_seconds) as response:
            raw = response.read().decode("utf-8")
            parsed = json.loads(raw)

        try:
            return parsed["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            raise ValueError(f"Unexpected API response: {parsed}") from exc


@dataclass
class AnthropicAdapter:
    """Adapter for Anthropic's messages API."""

    model_id: str
    api_base_url: str = "https://api.anthropic.com/v1/messages"
    api_key_env: str = "ANTHROPIC_API_KEY"
    api_version: str = "2023-06-01"
    timeout_seconds: float = 60.0

    def _build_headers(self) -> Mapping[str, str]:
        api_key = os.environ.get(self.api_key_env)
        if not api_key:
            raise ValueError(
                f"Missing API key. Set {self.api_key_env} in the environment."
            )

        return {
            "x-api-key": api_key,
            "anthropic-version": self.api_version,
            "Content-Type": "application/json",
        }

    def generate(self, prompt: str, mode: AxiomBenchmarkMode) -> str:
        """Generate a response using Anthropic's messages API."""
        payload = {
            "model": self.model_id,
            "max_tokens": 1024,
            "temperature": 0.2 if mode == AxiomBenchmarkMode.AXIOM_GUIDED else 0.7,
            "messages": [{"role": "user", "content": prompt}],
        }
        data = json.dumps(payload).encode("utf-8")
        headers = self._build_headers()

        req = request.Request(self.api_base_url, data=data, headers=headers, method="POST")
        with request.urlopen(req, timeout=self.timeout_seconds) as response:
            raw = response.read().decode("utf-8")
            parsed = json.loads(raw)

        try:
            return parsed["content"][0]["text"]
        except (KeyError, IndexError, TypeError) as exc:
            raise ValueError(f"Unexpected API response: {parsed}") from exc


@dataclass
class GoogleGeminiAdapter:
    """Adapter for Google Gemini generateContent API."""

    model_id: str
    api_base_url: str = "https://generativelanguage.googleapis.com/v1beta"
    api_key_env: str = "GOOGLE_API_KEY"
    timeout_seconds: float = 60.0

    def _api_key(self) -> str:
        api_key = os.environ.get(self.api_key_env)
        if not api_key:
            raise ValueError(
                f"Missing API key. Set {self.api_key_env} in the environment."
            )
        return api_key

    def generate(self, prompt: str, mode: AxiomBenchmarkMode) -> str:
        """Generate a response using the Gemini generateContent API."""
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": prompt}],
                }
            ],
            "generationConfig": {
                "temperature": 0.2 if mode == AxiomBenchmarkMode.AXIOM_GUIDED else 0.7
            },
        }
        data = json.dumps(payload).encode("utf-8")
        api_key = self._api_key()
        url = f"{self.api_base_url}/models/{self.model_id}:generateContent?key={api_key}"
        headers = {"Content-Type": "application/json"}

        req = request.Request(url, data=data, headers=headers, method="POST")
        with request.urlopen(req, timeout=self.timeout_seconds) as response:
            raw = response.read().decode("utf-8")
            parsed = json.loads(raw)

        try:
            return parsed["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError, TypeError) as exc:
            raise ValueError(f"Unexpected API response: {parsed}") from exc


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
