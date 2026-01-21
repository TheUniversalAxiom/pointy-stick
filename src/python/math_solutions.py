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
            proof_steps=[
                ProofStep(
                    statement=(
                        "Clear denominators to obtain 4xyz = n(xy + xz + yz), exposing the "
                        "shared ABC constraint."
                    ),
                    axiom_insight=(
                        "A·B·C locks the reciprocal structure while C records divisibility pressure."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Partition n into congruence classes to target families where n divides "
                        "xy + xz + yz."
                    ),
                    axiom_insight=(
                        "F_n periodicity mirrors modular cycles, guiding repeatable constructions."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Introduce parameterized families for (x, y, z) that satisfy the cleared "
                        "equation."
                    ),
                    axiom_insight=(
                        "E_n growth supplies expansion room; X and Y keep selections coherent."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Balance denominator growth so x, y, z remain positive and ordered, "
                        "avoiding runaway residues."
                    ),
                    axiom_insight=(
                        "E_n expands search while F_n regulates magnitude."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Cover dense residue families and reduce remaining cases to bounded "
                        "verification windows."
                    ),
                    axiom_insight=(
                        "Z enforces temporal continuity; remaining gaps collapse to finite checks."
                    ),
                ),
            ],
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
            proof_steps=[
                ProofStep(
                    statement=(
                        "Normalize the configuration by translation and scaling to fix baseline "
                        "spacing."
                    ),
                    axiom_insight=(
                        "X, Y, Z align perspective and time scale before counting."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Count point pairs to relate total pairs to distance multiplicities."
                    ),
                    axiom_insight=(
                        "E_n captures pair growth while F_n regulates clustering."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Apply incidence bounds to limit how often a distance can repeat."
                    ),
                    axiom_insight=(
                        "C pressure caps over-concentration in any single distance."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Construct near-lattice configurations to achieve the lower-bound regime."
                    ),
                    axiom_insight=(
                        "A·B·C balances structure so growth matches regulation."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Conclude the asymptotic bound by matching upper and lower envelopes."
                    ),
                    axiom_insight=(
                        "Dynamic layer (E_n, F_n) closes the gap between expansion and constraint."
                    ),
                ),
            ],
        ),
        ErdosProblem(
            identifier="erdos-moser",
            title="Erdos–Moser Equation",
            statement=(
                "Solve 1^k + 2^k + ... + (m−1)^k = m^k for integers m, k > 1."
            ),
            status="partial",
            axiom_insight=(
                "E_n scaling intensifies quickly; the axiom suggests using Z to control temporal "
                "accumulation and detect singularities."
            ),
            proof_steps=[
                ProofStep(
                    statement=(
                        "Compare the power sum to integral bounds to bracket growth of Σ i^k "
                        "versus m^k."
                    ),
                    axiom_insight=(
                        "E_n sets exponential growth while Z tracks accumulation."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Use modular restrictions on k and m to eliminate incompatible residues."
                    ),
                    axiom_insight=(
                        "C enforces arithmetic pressure, pruning impossible classes."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Isolate the dominant term by normalizing with m^k and bounding the "
                        "remainder."
                    ),
                    axiom_insight=(
                        "A·B·C stabilizes the foundation as X reduces variance."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Show candidate solutions require extremely tight balance between "
                        "consecutive powers."
                    ),
                    axiom_insight=(
                        "F_n smooths oscillations, exposing near-cancellation requirements."
                    ),
                ),
                ProofStep(
                    statement=(
                        "Reduce remaining candidates to finite computational windows for "
                        "verification."
                    ),
                    axiom_insight=(
                        "Z keeps the search temporal and bounded; Y focuses viable regimes."
                    ),
                ),
            ],
        ),
    ]
