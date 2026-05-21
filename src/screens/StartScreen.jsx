import Logo from '../components/icons/Logo'
import Button from '../components/ui/Button'

function StartScreen({ onStart }) {
  return (
    <section className="from-background via-surface flex min-h-screen flex-col items-center justify-center gap-12 bg-gradient-to-b to-indigo-950 px-6">
      <div className="animate-slide-down flex flex-col items-center gap-4">
        <Logo className="h-28 w-28" />

        <h1 className="text-5xl font-bold">Memory Game</h1>
        <p>by Evolve Media</p>
      </div>

      <div className="animate-slide-up">
        <Button onClick={onStart}>Start</Button>
      </div>
    </section>
  )
}

export default StartScreen
