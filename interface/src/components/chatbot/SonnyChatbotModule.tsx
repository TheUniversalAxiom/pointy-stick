import { useState } from 'react'
import { UniversalAxiom } from '../../core/axiom'
import './SonnyChatbotModule.css'

type SonnyChatbotModuleProps = {
  onBackToMenu?: () => void
}

type ChatMessage = {
  id: string
  role: 'user' | 'sonny'
  content: string
}

function buildSonnyReply(userText: string): { reply: string; intelligence: number } {
  const trimmed = userText.trim()
  const seed = Math.max(1, Math.min(5, Math.round(trimmed.length / 28)))
  const impulses = 1 + seed * 0.1
  const elements = 1 + seed * 0.08
  const pressure = 1 - seed * 0.05
  const subjectivity = Math.min(0.7, Math.max(0.1, 0.25 + seed * 0.05))
  const purpose = 1.2 + seed * 0.15
  const time = 1.1 + seed * 0.1

  const axiom = new UniversalAxiom({
    impulses,
    elements,
    pressure,
    subjectivity,
    purpose,
    time,
    n: seed
  })

  const state = axiom.getState()
  const intelligence = state.intelligence

  const reply = `Input focus: “${trimmed || 'Awaiting your directive'}”

A·B·C = ${state.foundation.product.toFixed(2)}
E_n·(1+F_n) = ${state.dynamic.product.toFixed(2)}
X·Y·Z = ${state.cognitive.product.toFixed(2)}

Intelligence_n = ${intelligence.toFixed(2)}`

  return { reply, intelligence }
}

export function SonnyChatbotModule({ onBackToMenu }: SonnyChatbotModuleProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [selectedModel, setSelectedModel] = useState('sonny-apex')
  const [apiOption, setApiOption] = useState('local')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim()
    }

    const { reply } = buildSonnyReply(input)
    const sonnyMessage: ChatMessage = {
      id: `sonny-${Date.now()}`,
      role: 'sonny',
      content: reply
    }

    setMessages((prev) => [...prev, userMessage, sonnyMessage])
    setInput('')
  }

  return (
    <div className="sonny-chatbot">
      <header className="sonny-chatbot__header">
        <div>
          <h1 className="sonny-chatbot__title">Sonny OS</h1>
          <p className="sonny-chatbot__welcome">Welcome to Sonny OS. Choose a model, select an API, and begin.</p>
        </div>
        {onBackToMenu && (
          <button type="button" className="sonny-chatbot__back-btn" onClick={onBackToMenu}>
            ← Main Menu
          </button>
        )}
      </header>

      <section className="sonny-chatbot__panel">
        <div className="sonny-chatbot__controls">
          <label className="sonny-chatbot__control">
            Model
            <select
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              className="sonny-chatbot__select"
            >
              <option value="sonny-apex">Sonny Apex</option>
              <option value="axiom-core">Axiom Core</option>
              <option value="axiom-mentor">Axiom Mentor</option>
            </select>
          </label>
          <label className="sonny-chatbot__control">
            API
            <select
              value={apiOption}
              onChange={(event) => setApiOption(event.target.value)}
              className="sonny-chatbot__select"
            >
              <option value="local">Local</option>
              <option value="gateway">Gateway</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          <button type="button" className="sonny-chatbot__cta" disabled={!selectedModel || !apiOption}>
            Connect
          </button>
        </div>
        <div className="sonny-chatbot__thread">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`sonny-chatbot__message sonny-chatbot__message--${message.role}`}
            >
              <div>{message.content}</div>
            </div>
          ))}
        </div>

        <div className="sonny-chatbot__composer">
          <textarea
            className="sonny-chatbot__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={2}
          />
          <button type="button" className="sonny-chatbot__send" onClick={handleSend} disabled={!input.trim()}>
            Send
          </button>
        </div>
      </section>
    </div>
  )
}
