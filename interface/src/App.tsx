import { useState } from 'react'
import { MainDashboard } from './components/dashboard/MainDashboard'
import { MainMenu } from './components/menu/MainMenu'
import { AiBenchmarkingModule } from './components/benchmarking/AiBenchmarkingModule'
import './index.css'

type AppView = 'menu' | 'dashboard' | 'benchmarking'

function App() {
  const [view, setView] = useState<AppView>('menu')

  if (view === 'dashboard') {
    return <MainDashboard onBackToMenu={() => setView('menu')} />
  }

  if (view === 'benchmarking') {
    return <AiBenchmarkingModule onBackToMenu={() => setView('menu')} />
  }

  return (
    <MainMenu
      onSelectDashboard={() => setView('dashboard')}
      onSelectBenchmarking={() => setView('benchmarking')}
    />
  )
}

export default App
