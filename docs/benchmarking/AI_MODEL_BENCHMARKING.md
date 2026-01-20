# AI Model Benchmarking Module

This module defines a lightweight benchmarking pipeline for comparing AI model
responses **against** the Universal Axiom baseline and **with** axiom-guided
context appended to prompts. The module is intentionally adapter-driven so you
can plug in any model API, local runner, or mock harness without changing core
logic.

## Core Concepts

### Modes

- **baseline**: the model is prompted without axiom guidance.
- **axiom_guided**: the model receives axiom context to shape its output.

### Signals

`AxiomSignals` maps extracted response traits to the canonical variables:

- **A**: impulses
- **B**: elements
- **C**: pressure
- **X**: subjectivity
- **Y**: purpose
- **Z**: time
- **n**: iteration

Signals are converted into a `UniversalAxiom` instance to compute:

- `intelligence`: the core formula score.
- `coherence`: a balance metric derived from the simulator.

## Minimal Usage

```python
from python.benchmarking import (
    AxiomBenchmarkMode,
    AxiomBenchmarkRunner,
    AxiomBenchmarkScenario,
    AxiomSignals,
)


class DemoAdapter:
    model_id = "demo-model"

    def generate(self, prompt: str, mode: AxiomBenchmarkMode) -> str:
        return f"{mode.value}: {prompt}"


class DemoExtractor:
    def extract(self, prompt: str, response: str) -> AxiomSignals:
        return AxiomSignals(
            impulses=1.0,
            elements=1.0,
            pressure=1.0,
            subjectivity=0.2,
            purpose=1.1,
            time=1.0,
            n=1,
        )


runner = AxiomBenchmarkRunner(adapter=DemoAdapter(), extractor=DemoExtractor())
scenarios = [
    AxiomBenchmarkScenario(
        scenario_id="alignment",
        prompt="Summarize the tradeoffs of a new policy.",
        axiom_context="Apply the Universal Axiom variables explicitly.",
    )
]
results = runner.run(scenarios)
```

## OpenAI-Compatible API Usage

Use the built-in adapters to call external model APIs. The OpenAI adapter
follows the chat completions schema.

```python
from python.benchmarking import (
    AxiomBenchmarkRunner,
    AxiomBenchmarkScenario,
    OpenAICompatibleAdapter,
)


adapter = OpenAICompatibleAdapter(model_id="gpt-4o-mini")
runner = AxiomBenchmarkRunner(adapter=adapter, extractor=DemoExtractor())
results = runner.run(
    [
        AxiomBenchmarkScenario(
            scenario_id="tradeoffs",
            prompt="Summarize the tradeoffs of a new policy.",
            axiom_context="Apply the Universal Axiom variables explicitly.",
        )
    ]
)
```

### Anthropic

```python
from python.benchmarking import (
    AnthropicAdapter,
    AxiomBenchmarkRunner,
    AxiomBenchmarkScenario,
)


adapter = AnthropicAdapter(model_id="claude-3-5-sonnet-20240620")
runner = AxiomBenchmarkRunner(adapter=adapter, extractor=DemoExtractor())
results = runner.run(
    [
        AxiomBenchmarkScenario(
            scenario_id="safety",
            prompt="Draft safety considerations for a new deployment.",
            axiom_context="Apply the Universal Axiom variables explicitly.",
        )
    ]
)
```

### Google Gemini

```python
from python.benchmarking import (
    AxiomBenchmarkRunner,
    AxiomBenchmarkScenario,
    GoogleGeminiAdapter,
)


adapter = GoogleGeminiAdapter(model_id="gemini-1.5-pro")
runner = AxiomBenchmarkRunner(adapter=adapter, extractor=DemoExtractor())
results = runner.run(
    [
        AxiomBenchmarkScenario(
            scenario_id="planning",
            prompt="Outline a phased rollout plan.",
            axiom_context="Apply the Universal Axiom variables explicitly.",
        )
    ]
)
```

### Environment Variables

The adapter reads credentials from the environment:

- `OPENAI_API_KEY` (required)
- `OPENAI_ORG_ID` (optional)
- `ANTHROPIC_API_KEY` (required for Anthropic)
- `GOOGLE_API_KEY` (required for Gemini)

Create a local `.env` file (and add it to `.gitignore`) if you want to load these
values with your preferred tooling.

## Design Notes

- The module is **adapter-based**: model APIs stay out of core logic.
- The extractor lets you encode any rubric (manual, classifier, LLM judge).
- Scenario prompts and axiom context are **data-only**, so you can store them in
  JSON/YAML and load them into `AxiomBenchmarkScenario`.
