import { useMemo, useState } from 'react'
import './MathSolutionsModule.css'

type MathSolutionsModuleProps = {
  onBackToMenu?: () => void
}

type ErdosProblem = {
  id: string
  title: string
  status: 'open' | 'solved' | 'partial'
  statement: string
  insight: string
  proofSteps: { title: string; insight: string }[]
  signal: string
}

const ERDOS_PROBLEMS: ErdosProblem[] = [
  {
    id: 'erdos-straus',
    title: 'Erdos–Straus Conjecture',
    status: 'open',
    statement:
      'For every integer n ≥ 2, express 4/n as a sum of three unit fractions: 4/n = 1/x + 1/y + 1/z.',
    insight:
      'The axiom highlights how constraints (C) and growth (Eₙ, Fₙ) interact, suggesting structured pathways to decompositions.',
    proofSteps: [
      {
        title: 'Clear denominators to obtain 4xyz = n(xy + xz + yz)',
        insight: 'A·B·C locks the reciprocal structure while C records divisibility pressure.',
      },
      {
        title: 'Partition n into congruence classes to target solvable families',
        insight: 'Fₙ periodicity mirrors modular cycles, guiding repeatable constructions.',
      },
      {
        title: 'Introduce parameterized families for (x, y, z)',
        insight: 'Eₙ growth supplies expansion room; X and Y keep selections coherent.',
      },
      {
        title: 'Balance denominator growth to preserve ordering',
        insight: 'Eₙ expands search while Fₙ regulates magnitude.',
      },
      {
        title: 'Reduce remaining cases to bounded verification windows',
        insight: 'Z enforces temporal continuity; remaining gaps collapse to finite checks.',
      },
    ],
    signal: 'Constraint geometry aligned · 3 candidate families',
  },
  {
    id: 'erdos-distinct-distances',
    title: 'Erdos Distinct Distances Problem',
    status: 'solved',
    statement: 'Determine the minimum number of distinct distances defined by n points in the plane.',
    insight:
      'Balancing combinatorial growth (Eₙ) with structural regulation (Fₙ) mirrors the tension between point density and distance diversity.',
    proofSteps: [
      {
        title: 'Normalize configuration by translation and scaling',
        insight: 'X, Y, Z align perspective and time scale before counting.',
      },
      {
        title: 'Count point pairs to relate pairs to distance multiplicities',
        insight: 'Eₙ captures pair growth while Fₙ regulates clustering.',
      },
      {
        title: 'Apply incidence bounds to limit repeated distances',
        insight: 'C pressure caps over-concentration in any single distance.',
      },
      {
        title: 'Construct near-lattice configurations for the lower bound',
        insight: 'A·B·C balances structure so growth matches regulation.',
      },
      {
        title: 'Match upper and lower envelopes to close the bound',
        insight: 'Dynamic layer (Eₙ, Fₙ) closes the gap between expansion and constraint.',
      },
    ],
    signal: 'Resolved · Optimal lower bound confirmed',
  },
  {
    id: 'erdos-moser',
    title: 'Erdos–Moser Equation',
    status: 'partial',
    statement: 'Solve 1^k + 2^k + ... + (m−1)^k = m^k for integers m, k > 1.',
    insight:
      'Eₙ scaling intensifies quickly; the axiom suggests using Z to control temporal accumulation and detect singularities.',
    proofSteps: [
      {
        title: 'Compare power sums to integral bounds',
        insight: 'Eₙ sets exponential growth while Z tracks accumulation.',
      },
      {
        title: 'Apply modular restrictions on k and m',
        insight: 'C enforces arithmetic pressure, pruning impossible classes.',
      },
      {
        title: 'Normalize with m^k to isolate the dominant term',
        insight: 'A·B·C stabilizes the foundation as X reduces variance.',
      },
      {
        title: 'Demand tight balance between consecutive powers',
        insight: 'Fₙ smooths oscillations, exposing near-cancellation requirements.',
      },
      {
        title: 'Reduce candidates to finite computational windows',
        insight: 'Z keeps the search temporal and bounded; Y focuses viable regimes.',
      },
    ],
    signal: 'Monitoring · 2 candidate regimes remain',
  },
]

export function MathSolutionsModule({ onBackToMenu }: MathSolutionsModuleProps) {
  const [selectedId, setSelectedId] = useState<string>(ERDOS_PROBLEMS[0].id)

  const selectedProblem = useMemo(
    () => ERDOS_PROBLEMS.find((problem) => problem.id === selectedId) ?? ERDOS_PROBLEMS[0],
    [selectedId]
  )

  const statusLabel = {
    open: 'Open',
    solved: 'Solved',
    partial: 'Partial',
  }

  return (
    <div className="math-solutions">
      <header className="math-solutions__header">
        <div>
          <p className="math-solutions__eyebrow">Math Solutions</p>
          <h1 className="math-solutions__title">Erdos Problem Command Deck</h1>
          <p className="math-solutions__subtitle">
            Curate proofs, capture axiom-aligned insights, and coordinate collaborative reasoning across the
            most influential conjectures.
          </p>
        </div>
        {onBackToMenu && (
          <button type="button" className="math-solutions__back-btn" onClick={onBackToMenu}>
            ← Main Menu
          </button>
        )}
      </header>

      <section className="math-solutions__stats">
        <div className="math-solutions__stat-card">
          <p className="math-solutions__stat-label">Active Threads</p>
          <p className="math-solutions__stat-value">3</p>
          <span className="math-solutions__stat-footnote">Erdos queue primed</span>
        </div>
        <div className="math-solutions__stat-card">
          <p className="math-solutions__stat-label">Proof Velocity</p>
          <p className="math-solutions__stat-value">1.28x</p>
          <span className="math-solutions__stat-footnote">Axiom resonance peak</span>
        </div>
        <div className="math-solutions__stat-card">
          <p className="math-solutions__stat-label">Insight Sync</p>
          <p className="math-solutions__stat-value">92%</p>
          <span className="math-solutions__stat-footnote">Cross-layer parity</span>
        </div>
      </section>

      <section className="math-solutions__layout">
        <aside className="math-solutions__sidebar">
          <div className="math-solutions__panel-header">
            <h2>Problem Index</h2>
            <span className="math-solutions__panel-tag">Axiom-curated</span>
          </div>
          <div className="math-solutions__problem-list">
            {ERDOS_PROBLEMS.map((problem) => (
              <button
                key={problem.id}
                type="button"
                className={`math-solutions__problem-card${
                  selectedId === problem.id ? ' math-solutions__problem-card--active' : ''
                }`}
                onClick={() => setSelectedId(problem.id)}
              >
                <div>
                  <p className="math-solutions__problem-title">{problem.title}</p>
                  <p className="math-solutions__problem-status">{statusLabel[problem.status]}</p>
                </div>
                <span className="math-solutions__problem-signal">{problem.signal}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="math-solutions__content">
          <section className="math-solutions__hero">
            <div>
              <p className="math-solutions__hero-status">{statusLabel[selectedProblem.status]}</p>
              <h2>{selectedProblem.title}</h2>
              <p className="math-solutions__hero-statement">{selectedProblem.statement}</p>
            </div>
            <div className="math-solutions__hero-insight">
              <h3>Axiom Insight</h3>
              <p>{selectedProblem.insight}</p>
            </div>
          </section>

          <section className="math-solutions__proof">
            <div className="math-solutions__panel-header">
              <h2>Proof Steps</h2>
              <span className="math-solutions__panel-tag">Dynamic stack</span>
            </div>
            <div className="math-solutions__proof-grid">
              {selectedProblem.proofSteps.map((step, index) => (
                <article key={step.title} className="math-solutions__proof-card">
                  <div className="math-solutions__proof-index">0{index + 1}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.insight}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
