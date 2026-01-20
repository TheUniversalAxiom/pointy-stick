import { useEffect, useMemo, useState } from 'react'
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

type ConnectorId = 'free' | 'openai' | 'anthropic' | 'google' | 'other'

type ConnectorOption = {
  id: ConnectorId
  label: string
  description: string
  requiresKey: boolean
  models: string[]
}

const connectorOptions: ConnectorOption[] = [
  {
    id: 'free',
    label: 'Free Connector',
    description: 'No API key required. Uses the Sonny intelligence core.',
    requiresKey: false,
    models: ['sonny-apex', 'axiom-core', 'axiom-mentor']
  },
  {
    id: 'openai',
    label: 'OpenAI',
    description: 'Connect with your OpenAI API key.',
    requiresKey: true,
    models: ['gpt-4o', 'gpt-4.1', 'gpt-4o-mini']
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    description: 'Connect with your Anthropic API key.',
    requiresKey: true,
    models: ['claude-3.5-sonnet', 'claude-3-opus', 'claude-3-haiku']
  },
  {
    id: 'google',
    label: 'Google',
    description: 'Connect with your Google AI Studio API key.',
    requiresKey: true,
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro']
  },
  {
    id: 'other',
    label: 'Other Provider',
    description: 'Use a custom endpoint with any compatible model.',
    requiresKey: true,
    models: ['custom-1', 'custom-2', 'custom-3']
  }
]

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
  const [selectedModel, setSelectedModel] = useState(connectorOptions[0].models[0])
  const [selectedConnector, setSelectedConnector] = useState<ConnectorId>('free')
  const [connectedConnector, setConnectedConnector] = useState<ConnectorId>('free')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Connected to Free Connector')
  const [apiKeys, setApiKeys] = useState<Record<ConnectorId, string>>({
    free: '',
    openai: '',
    anthropic: '',
    google: '',
    other: ''
  })
  const [customEndpoint, setCustomEndpoint] = useState('')

  const activeConnector = useMemo(
    () => connectorOptions.find((option) => option.id === selectedConnector) ?? connectorOptions[0],
    [selectedConnector]
  )
  const connectedConnectorInfo = useMemo(
    () => connectorOptions.find((option) => option.id === connectedConnector) ?? connectorOptions[0],
    [connectedConnector]
  )
  const availableModels = activeConnector.models

  useEffect(() => {
    if (!availableModels.includes(selectedModel)) {
      setSelectedModel(availableModels[0])
    }
  }, [availableModels, selectedModel])

  const handleConnect = () => {
    if (activeConnector.requiresKey && !apiKeys[activeConnector.id].trim()) {
      setStatusMessage(`Enter an API key to connect to ${activeConnector.label}.`)
      return
    }

    setConnectedConnector(activeConnector.id)
    setStatusMessage(`Connected to ${activeConnector.label}.`)
    setSettingsOpen(false)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim()
    }

    const { reply: sonnyCoreReply } = buildSonnyReply(input)
    const connectorLabel = connectedConnectorInfo.label
    const reply =
      connectedConnector === 'free'
        ? `Connector: ${connectorLabel}\nModel: ${selectedModel}\n\n${sonnyCoreReply}`
        : `Connector: ${connectorLabel} (simulated)\nModel: ${selectedModel}\n\n${sonnyCoreReply}`
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
        <div className="sonny-chatbot__header-actions">
          <div className="sonny-chatbot__settings">
            <button
              type="button"
              className="sonny-chatbot__settings-btn"
              onClick={() => setSettingsOpen((open) => !open)}
            >
              ⚙ Settings
            </button>
            {settingsOpen && (
              <div className="sonny-chatbot__settings-panel">
                <h2 className="sonny-chatbot__settings-title">Connect a provider</h2>
                <div className="sonny-chatbot__settings-list">
                  {connectorOptions.map((option) => (
                    <label key={option.id} className="sonny-chatbot__settings-item">
                      <input
                        type="radio"
                        name="connector"
                        value={option.id}
                        checked={selectedConnector === option.id}
                        onChange={() => setSelectedConnector(option.id)}
                      />
                      <span>
                        <strong>{option.label}</strong>
                        <span className="sonny-chatbot__settings-description">{option.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {activeConnector.requiresKey && (
                  <div className="sonny-chatbot__settings-fields">
                    <label className="sonny-chatbot__settings-field">
                      API Key
                      <input
                        type="password"
                        value={apiKeys[activeConnector.id]}
                        onChange={(event) =>
                          setApiKeys((prev) => ({ ...prev, [activeConnector.id]: event.target.value }))
                        }
                        placeholder="Paste your API key"
                      />
                    </label>
                    {activeConnector.id === 'other' && (
                      <label className="sonny-chatbot__settings-field">
                        Custom Endpoint
                        <input
                          type="text"
                          value={customEndpoint}
                          onChange={(event) => setCustomEndpoint(event.target.value)}
                          placeholder="https://api.your-provider.com"
                        />
                      </label>
                    )}
                  </div>
                )}
                <button type="button" className="sonny-chatbot__cta" onClick={handleConnect}>
                  Connect
                </button>
              </div>
            )}
          </div>
          {onBackToMenu && (
            <button type="button" className="sonny-chatbot__back-btn" onClick={onBackToMenu}>
              ← Main Menu
            </button>
          )}
        </div>
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
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>
          <div className="sonny-chatbot__status">
            <span className="sonny-chatbot__status-label">Status</span>
            <span className="sonny-chatbot__status-pill">{statusMessage}</span>
          </div>
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
