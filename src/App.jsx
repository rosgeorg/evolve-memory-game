import { useState } from "react"
import StartScreen from "./screens/StartScreen"
import GameScreen from "./screens/GameScreen"

function App() {
  const [screen, setScreen] = useState("start")

  return (
    <main className="min-h-screen overflow-hidden text-text">
      {screen === "start" && (
        <StartScreen onStart={() => setScreen("game")} />
      )}

      {screen === "game" && (
       <GameScreen />
      )}
    </main>
  )
}

export default App