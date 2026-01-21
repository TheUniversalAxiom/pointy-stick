"""
Math Solutions Module

Provides a clean interface for curating mathematical problems and attaching proofs
through the lens of The Universal Axiom.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, Iterable, List


@dataclass(frozen=True)
class ProofStep:
    """A proof step annotated with an axiom-aligned insight."""

    statement: str
    axiom_insight: str

    def to_dict(self) -> Dict[str, str]:
        """Serialize proof step to a dictionary."""
        return {"statement": self.statement, "axiom_insight": self.axiom_insight}


@dataclass
class ErdosProblem:
    """Container for an Erdos problem and its axiom-aligned proof steps."""

    identifier: str
    title: str
    statement: str
    status: str
    axiom_insight: str
    proof_steps: List[ProofStep] = field(default_factory=list)

    def add_proof_step(self, statement: str, axiom_insight: str) -> None:
        """Append a proof step aligned to the Universal Axiom."""
        self.proof_steps.append(ProofStep(statement=statement, axiom_insight=axiom_insight))

    def add_proof_steps(self, steps: Iterable[ProofStep]) -> None:
        """Append multiple proof steps."""
        self.proof_steps.extend(list(steps))

    def to_dict(self) -> Dict[str, object]:
        """Serialize problem to a dictionary payload."""
        return {
            "identifier": self.identifier,
            "title": self.title,
            "statement": self.statement,
            "status": self.status,
            "axiom_insight": self.axiom_insight,
            "proof_steps": [step.to_dict() for step in self.proof_steps],
        }


class MathSolutions:
    """Registry for mathematical problems and axiom-aligned proof steps."""

    def __init__(self, problems: Iterable[ErdosProblem] | None = None) -> None:
        self._problems: Dict[str, ErdosProblem] = {}
        if problems:
            for problem in problems:
                self.add_problem(problem)

    @classmethod
    def erdos_seed(cls) -> "MathSolutions":
        """Initialize with foundational Erdos problems."""
        return cls(_seed_erdos_problems())

    def add_problem(self, problem: ErdosProblem) -> None:
        """Add or replace a problem in the registry."""
        self._problems[problem.identifier] = problem

    def get_problem(self, identifier: str) -> ErdosProblem:
        """Retrieve a problem by identifier."""
        return self._problems[identifier]

    def list_problems(self) -> List[ErdosProblem]:
        """List all problems in insertion order."""
        return list(self._problems.values())

    def add_proof_step(self, identifier: str, statement: str, axiom_insight: str) -> None:
        """Append a proof step to a registered problem."""
        problem = self.get_problem(identifier)
        problem.add_proof_step(statement, axiom_insight)

    def summaries(self) -> List[Dict[str, str]]:
        """Provide concise problem summaries."""
        return [
            {
                "identifier": problem.identifier,
                "title": problem.title,
                "status": problem.status,
            }
            for problem in self._problems.values()
        ]


def _seed_erdos_problems() -> List[ErdosProblem]:
    return [
        ErdosProblem(
            identifier="erdos-straus",
            title="Erdos–Straus Conjecture",
            statement=(
                "For every integer n ≥ 2, the rational 4/n can be expressed as the sum "
                "of three unit fractions: 4/n = 1/x + 1/y + 1/z for integers x, y, z."
            ),
            status="open",
            axiom_insight=(
                "The axiom highlights how constraints (C) and growth (E_n, F_n) interact, "
                "suggesting structured pathways to decompositions."
            ),
        ),
        ErdosProblem(
            identifier="erdos-distinct-distances",
            title="Erdos Distinct Distances Problem",
            statement=(
                "Determine the minimum number of distinct distances defined by n points "
                "in the plane."
            ),
            status="solved",
            axiom_insight=(
                "Balancing combinatorial growth (E_n) with structural regulation (F_n) "
                "mirrors the tension between point density and distance diversity."
            ),
        ),
    ]
