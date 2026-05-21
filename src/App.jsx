import { useState } from 'react'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import FinalScreen from './screens/FinalScreen'

function App() {
  const [screen, setScreen] = useState('start')
  const [result, setResult] = useState(null)

  const handleFinish = (gameResult) => {
    setResult(gameResult)
    setScreen('finish')
  }

  return (
    <main className="text-text min-h-screen overflow-hidden">
      {screen === 'start' && <StartScreen onStart={() => setScreen('game')} />}

      {screen === 'game' && <GameScreen onFinish={handleFinish} />}

      {screen === 'finish' && (
        <FinalScreen result={result} onPlayAgain={() => setScreen('game')} />
      )}
    </main>
  )
}

export default App
