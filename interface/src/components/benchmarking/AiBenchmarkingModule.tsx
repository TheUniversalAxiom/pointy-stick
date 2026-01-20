import './AiBenchmarkingModule.css'

type AiBenchmarkingModuleProps = {
  onBackToMenu?: () => void
}

export function AiBenchmarkingModule({ onBackToMenu }: AiBenchmarkingModuleProps) {
  return (
    <div className="benchmarking">
      <header className="benchmarking__header">
        <div>
          <p className="benchmarking__eyebrow">Benchmarking Suite</p>
          <h1 className="benchmarking__title">AI Benchmarking Module</h1>
          <p className="benchmarking__subtitle">
            Configure evaluation runs, compare output coherence, and export multi-model performance summaries.
          </p>
        </div>
        {onBackToMenu && (
          <button type="button" className="benchmarking__back-btn" onClick={onBackToMenu}>
            ← Main Menu
          </button>
        )}
      </header>

      <section className="benchmarking__overview">
        <div className="benchmarking__stat">
          <span className="benchmarking__stat-label">Active Scenarios</span>
          <span className="benchmarking__stat-value">12</span>
        </div>
        <div className="benchmarking__stat">
          <span className="benchmarking__stat-label">Models Loaded</span>
          <span className="benchmarking__stat-value">4</span>
        </div>
        <div className="benchmarking__stat">
          <span className="benchmarking__stat-label">Run Status</span>
          <span className="benchmarking__stat-value benchmarking__stat-value--ready">Ready</span>
        </div>
      </section>

      <section className="benchmarking__grid">
        <article className="benchmarking__panel">
          <h2>Scenario Library</h2>
          <p>Select benchmark modes aligned to reasoning, memory, and stability tests.</p>
          <ul>
            <li>Universal Axiom reasoning stack</li>
            <li>Multi-step coherence checks</li>
            <li>Conflict resolution stress test</li>
          </ul>
        </article>
        <article className="benchmarking__panel">
          <h2>Evaluation Metrics</h2>
          <p>Track performance metrics with emphasis on cross-language parity.</p>
          <ul>
            <li>Intelligence delta vs baseline</li>
            <li>Consistency across runs</li>
            <li>Fibonacci regulation adherence</li>
          </ul>
        </article>
        <article className="benchmarking__panel">
          <h2>Run Configuration</h2>
          <p>Adjust run count, model roster, and export targets before launch.</p>
          <div className="benchmarking__controls">
            <label>
              Iterations
              <input type="number" defaultValue={25} min={5} max={100} />
            </label>
            <label>
              Output Format
              <select defaultValue="summary">
                <option value="summary">Summary Report</option>
                <option value="full">Full Trace</option>
                <option value="csv">CSV Export</option>
              </select>
            </label>
          </div>
        </article>
      </section>

      <section className="benchmarking__cta">
        <div>
          <h3>Launch Benchmark Run</h3>
          <p>Start a new benchmarking cycle and sync the results to the analytics console.</p>
        </div>
        <button type="button" className="benchmarking__run-btn">Start Run</button>
      </section>
    </div>
  )
}
