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
        title: 'Normalize the reciprocal structure',
        insight: 'Lock A·B·C to a shared denominator before scaling X·Y·Z.',
      },
      {
        title: 'Anchor on Fibonacci-regulated partitions',
        insight: 'Use Fₙ spacing to distribute unit fractions without collapsing C.',
      },
      {
        title: 'Track pressure release',
        insight: 'Monitor C to detect residue terms that require rebalancing.',
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
        title: 'Stabilize lattice spacing',
        insight: 'Use A·B·C to keep point pressure uniform across the grid.',
      },
      {
        title: 'Apply incidence compression',
        insight: 'Lower subjective variance (X) to expose distance regularities.',
      },
      {
        title: 'Confirm growth envelope',
        insight: 'Eₙ expansion caps the lower bound, Fₙ smooths oscillations.',
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
        title: 'Isolate growth imbalance',
        insight: 'Compare Eₙ divergence against foundation growth in A·B·C.',
      },
      {
        title: 'Bound subjectivity drift',
        insight: 'Clamp X to prevent false equivalence across powers.',
      },
      {
        title: 'Project asymptotic envelope',
        insight: 'Use Y to constrain viable k regimes and avoid runaway C.',
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
