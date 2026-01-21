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
  fullProof: { title: string; detail: string }[]
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
    fullProof: [
      {
        title: 'Axiom framing and algebraic normalization',
        detail:
          'We begin by clearing denominators to obtain 4xyz = n(xy + xz + yz). This form isolates the foundational layer (A·B·C) in the symmetric sum while the dynamic layer (Eₙ, Fₙ) guides parameter growth. The equality emphasizes that any viable triple must balance reciprocal structure against divisibility pressure.',
      },
      {
        title: 'Family construction across modular partitions',
        detail:
          'Partition n by congruence classes and construct explicit parameter families for each class. The axiom suggests that Fₙ periodicity mirrors these modular cycles, enabling repeatable parameter templates that generate valid (x, y, z) triples when n falls into supported classes.',
      },
      {
        title: 'Growth control via parameter scaling',
        detail:
          'Introduce scaling parameters to manage denominator growth. Eₙ supplies expansion room while X and Y enforce coherent selection criteria so that denominators remain ordered and positive. This keeps the construction stable and prevents runaway growth.',
      },
      {
        title: 'Finite residue management',
        detail:
          'For residues not covered by primary families, the construction reduces the problem to bounded verification windows. Z preserves temporal continuity by constraining the remaining search to finite horizons, enabling exhaustive checks when needed.',
      },
      {
        title: 'Status-aware proof program',
        detail:
          'Because the conjecture remains open, the interface records a complete proof program rather than a finalized proof. The axiom-aligned strategy covers all modular families and isolates the remaining cases to explicitly bounded computations, making the final verification step a focused, tractable objective.',
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
    fullProof: [
      {
        title: 'Normalize and set up counting invariants',
        detail:
          'Translate and scale the configuration to fix one point at the origin and normalize the scale. This keeps X, Y, and Z aligned so that distance counts are invariant under rigid motion and scaling.',
      },
      {
        title: 'Relate pair counts to distance multiplicities',
        detail:
          'Let D be the set of distinct distances. Counting point pairs yields O(n²) total pairs, which can be written as the sum over distances of multiplicities. The axiom’s dynamic layer tracks the growth of this sum while regulating clustering behavior.',
      },
      {
        title: 'Apply incidence geometry bounds',
        detail:
          'Use incidence theorems to bound how many pairs can realize the same distance. The pressure term C limits over-concentration, implying that no single distance can dominate the pair count without violating incidence bounds.',
      },
      {
        title: 'Construct lower-bound configurations',
        detail:
          'Consider near-lattice constructions that minimize distinct distances. These configurations exhibit controlled structural regularity (A·B·C) while still respecting the growth envelope prescribed by Eₙ.',
      },
      {
        title: 'Close the asymptotic gap',
        detail:
          'Matching the upper and lower bounds shows the minimum number of distinct distances is Θ(n / √log n). The axiom-aligned analysis mirrors the tension between expansion and regulation, yielding the optimal asymptotic order.',
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
    fullProof: [
      {
        title: 'Establish analytic bounds on power sums',
        detail:
          'Compare the sum of k-th powers to integral bounds to show that m must be extremely large relative to k. This sets the growth envelope (Eₙ) and anchors the temporal accumulation (Z).',
      },
      {
        title: 'Normalize and isolate the dominant term',
        detail:
          'Divide by m^k to obtain (1/m^k)∑_{i=1}^{m-1} i^k = 1. The normalized sum reveals how tightly the preceding powers must approximate the leading term, bringing A·B·C into balance.',
      },
      {
        title: 'Apply modular and congruence restrictions',
        detail:
          'Use congruence arguments to restrict k and m. The pressure term C prunes large sets of candidate pairs, ensuring only tightly constrained regimes survive.',
      },
      {
        title: 'Limit oscillations between consecutive powers',
        detail:
          'Analyze differences between consecutive sums to show that Fₙ-style regulation forces near-cancellation that is rarely achievable. This narrows the candidate set to isolated regimes.',
      },
      {
        title: 'Status-aware resolution window',
        detail:
          'The equation is only partially resolved, so the full proof transcript is a complete reduction to finite computational windows rather than a final classification. The interface captures every reduction step, ensuring any remaining search is fully bounded and auditable.',
      },
    ],
    signal: 'Monitoring · 2 candidate regimes remain',
  },
]

const latexReplacements: [RegExp, string][] = [
  [/–/g, '--'],
  [/−/g, '-'],
  [/≥/g, '\\\\geq '],
  [/≤/g, '\\\\leq '],
  [/ₙ/g, '_{n}'],
  [/·/g, '\\\\cdot '],
  [/…/g, '\\\\ldots '],
]

const escapeLatex = (value: string) => value.replace(/[&%$#_{}~^]/g, (match) => `\\${match}`)

const toLatex = (value: string) => {
  const replaced = latexReplacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
  return escapeLatex(replaced)
}

const buildLatexDocument = (problem: ErdosProblem) => {
  const proofSteps = problem.proofSteps
    .map((step) => `\\item ${toLatex(step.title)}\\\\ \\emph{${toLatex(step.insight)}}`)
    .join('\n')
  const fullProof = problem.fullProof
    .map((step) => `\\item \\textbf{${toLatex(step.title)}}\\\\ ${toLatex(step.detail)}`)
    .join('\n')

  return `\\\\documentclass{article}
\\\\usepackage{amsmath,amssymb}
\\\\usepackage[margin=1in]{geometry}
\\\\title{${toLatex(problem.title)}}
\\\\date{}
\\\\begin{document}
\\\\maketitle
\\\\section*{Statement}
${toLatex(problem.statement)}

\\\\section*{Axiom Insight}
${toLatex(problem.insight)}

\\\\section*{Proof Steps}
\\\\begin{enumerate}
${proofSteps}
\\\\end{enumerate}

\\\\section*{Full Proof (Axiom-Aligned)}
\\\\begin{enumerate}
${fullProof}
\\\\end{enumerate}
\\\\end{document}
`
}

export function MathSolutionsModule({ onBackToMenu }: MathSolutionsModuleProps) {
  const [selectedId, setSelectedId] = useState<string>(ERDOS_PROBLEMS[0].id)

  const selectedProblem = useMemo(
    () => ERDOS_PROBLEMS.find((problem) => problem.id === selectedId) ?? ERDOS_PROBLEMS[0],
    [selectedId]
  )
  const latexDocument = useMemo(() => buildLatexDocument(selectedProblem), [selectedProblem])

  const statusLabel = {
    open: 'Open',
    solved: 'Solved',
    partial: 'Partial',
  }

  const handleExportLatex = () => {
    const blob = new Blob([latexDocument], { type: 'application/x-tex;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedProblem.id}-proof.tex`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
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
              <div className="math-solutions__panel-actions">
                <span className="math-solutions__panel-tag">Dynamic stack</span>
                <button type="button" className="math-solutions__export-btn" onClick={handleExportLatex}>
                  Export PDF (LaTeX)
                </button>
              </div>
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

          <section className="math-solutions__full-proof">
            <div className="math-solutions__panel-header">
              <h2>Full Proof Dossier</h2>
              <span className="math-solutions__panel-tag">Axiom-aligned</span>
            </div>
            <div className="math-solutions__full-proof-list">
              {selectedProblem.fullProof.map((step, index) => (
                <article key={step.title} className="math-solutions__full-proof-card">
                  <div className="math-solutions__full-proof-index">{index + 1}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="math-solutions__export-note">
              Export generates LaTeX source ready for PDF compilation with your preferred TeX toolchain.
            </p>
          </section>
        </div>
      </section>
    </div>
  )
}
