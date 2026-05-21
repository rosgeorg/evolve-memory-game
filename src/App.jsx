import { useState } from 'react'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'

function App() {
  const [screen, setScreen] = useState('start')

  return (
    <main className="text-text min-h-screen overflow-hidden">
      {screen === 'start' && <StartScreen onStart={() => setScreen('game')} />}
      {screen === 'game' && <GameScreen onFinish={() => setScreen('finish')} />}
      {screen === 'finish' && <FinishScreen onPlay={() => setScreen('game')} />}
    </main>
  )
}

export default App
