import { useState } from "react"
import StartScreen from "./screens/StartScreen"

function App() {
  const [screen, setScreen] = useState("start")

  return (
    <main className="min-h-screen overflow-hidden text-text">
      {screen === "start" && (
        <StartScreen onStart={() => setScreen("game")} />
      )}

      {screen === "game" && (
        <section className="min-h-screen p-6">
          <h2 className="mb-6 text-3xl font-bold">
            Game screen
          </h2>
        </section>
      )}
    </main>
  )
}

export default App