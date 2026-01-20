import './MainMenu.css'

type MainMenuProps = {
  onSelectDashboard: () => void
  onSelectBenchmarking: () => void
  onSelectChatbot: () => void
}

export function MainMenu({ onSelectDashboard, onSelectBenchmarking, onSelectChatbot }: MainMenuProps) {
  return (
    <div className="main-menu">
      <header className="main-menu__header">
        <p className="main-menu__eyebrow">Universal Axiom Interface</p>
        <h1 className="main-menu__title">Command the Intelligence Stack</h1>
        <p className="main-menu__subtitle">
          Orchestrate the Universal Axiom engine, brief Sonny, and benchmark emergent systems from a single launchpad.
        </p>
        <div className="main-menu__highlights">
          <div className="main-menu__highlight">
            <p className="main-menu__highlight-label">Engine sync</p>
            <p className="main-menu__highlight-value">98% coherence · live data feed</p>
          </div>
          <div className="main-menu__highlight">
            <p className="main-menu__highlight-label">Active modules</p>
            <p className="main-menu__highlight-value">Dashboard · Sonny · Benchmarks</p>
          </div>
          <div className="main-menu__highlight">
            <p className="main-menu__highlight-label">Last pulse</p>
            <p className="main-menu__highlight-value">Moments ago · all signals green</p>
          </div>
        </div>
      </header>

      <div className="main-menu__grid">
        <button type="button" className="main-menu__card" onClick={onSelectDashboard}>
          <div className="main-menu__card-header">
            <span className="main-menu__card-icon">📊</span>
            <h2 className="main-menu__card-title">Intelligence Ops Dashboard</h2>
          </div>
          <p className="main-menu__card-description">
            Tune A/B/C, trace Intelligence<sub>n</sub>, and watch coherence react in real time across the stack.
          </p>
          <span className="main-menu__card-action">Enter command view →</span>
        </button>

        <button type="button" className="main-menu__card" onClick={onSelectChatbot}>
          <div className="main-menu__card-header">
            <span className="main-menu__card-icon">🧠</span>
            <h2 className="main-menu__card-title">Sonny Strategic Briefing</h2>
          </div>
          <p className="main-menu__card-description">
            Partner with Sonny to translate signals into narrative, decisions, and next actions grounded in the PROMPT.
          </p>
          <span className="main-menu__card-action">Engage Sonny →</span>
        </button>

        <button type="button" className="main-menu__card" onClick={onSelectBenchmarking}>
          <div className="main-menu__card-header">
            <span className="main-menu__card-icon">⚡</span>
            <h2 className="main-menu__card-title">Model Benchmark Lab</h2>
          </div>
          <p className="main-menu__card-description">
            Stage scenarios, compare outputs, and capture performance deltas with ready-to-share summaries.
          </p>
          <span className="main-menu__card-action">Open benchmarking →</span>
        </button>
      </div>

      <section className="main-menu__footer">
        <div className="main-menu__status">
          <div>
            <h3>System pulse</h3>
            <p>All modules synced. Telemetry steady. Ready for your next directive.</p>
          </div>
          <div className="main-menu__status-pill">Online</div>
        </div>
      </section>
    </div>
  )
}
