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
        <h1 className="main-menu__title">Command Center</h1>
        <p className="main-menu__subtitle">
          Choose a destination to explore the dynamic intelligence engine, engage Sonny, or evaluate AI model benchmarks.
        </p>
      </header>

      <div className="main-menu__grid">
        <button type="button" className="main-menu__card" onClick={onSelectDashboard}>
          <div className="main-menu__card-header">
            <span className="main-menu__card-icon">📊</span>
            <h2 className="main-menu__card-title">UI Dashboard</h2>
          </div>
          <p className="main-menu__card-description">
            Interact with the Intelligence<sub>n</sub> model, tune parameters, and visualize system coherence in real time.
          </p>
          <span className="main-menu__card-action">Enter Dashboard →</span>
        </button>

        <button type="button" className="main-menu__card" onClick={onSelectChatbot}>
          <div className="main-menu__card-header">
            <span className="main-menu__card-icon">🧠</span>
            <h2 className="main-menu__card-title">Sonny Chatbot Module</h2>
          </div>
          <p className="main-menu__card-description">
            Converse with Sonny, grounded in the PROMPT context and Universal Axiom, to translate inputs into actionable insight.
          </p>
          <span className="main-menu__card-action">Engage Sonny →</span>
        </button>

        <button type="button" className="main-menu__card" onClick={onSelectBenchmarking}>
          <div className="main-menu__card-header">
            <span className="main-menu__card-icon">⚡</span>
            <h2 className="main-menu__card-title">AI Benchmarking Module</h2>
          </div>
          <p className="main-menu__card-description">
            Configure benchmark scenarios, compare model outputs, and export performance summaries for analysis.
          </p>
          <span className="main-menu__card-action">Open Benchmarking →</span>
        </button>
      </div>

      <section className="main-menu__footer">
        <div className="main-menu__status">
          <div>
            <h3>System Status</h3>
            <p>All modules synced. Data layer ready for exploration.</p>
          </div>
          <div className="main-menu__status-pill">Online</div>
        </div>
      </section>
    </div>
  )
}
