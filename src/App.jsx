import { useState } from 'react'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import FinalScreen from './screens/FinalScreen'

function App() {
  const [screen, setScreen] = useState('start')
  const [result, setResult] = useState(null)
  const [stars, setStars] = useState(0)

  const handleFinish = (gameResult, earnedStars = 0) => {
    setResult(gameResult)
    setStars(earnedStars)
    setScreen('finish')
  }

  const handlePlayAgain = () => {
    setResult(null)
    setStars(0)
    setScreen('game')
  }

  return (
    <main className="text-text min-h-screen overflow-hidden">
      {screen === 'start' && <StartScreen onStart={() => setScreen('game')} />}

      {screen === 'game' && <GameScreen onFinish={handleFinish} />}

      {screen === 'finish' && (
        <FinalScreen
          result={result}
          stars={stars}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </main>
  )
}

export default App
