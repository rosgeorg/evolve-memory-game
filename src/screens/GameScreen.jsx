import SoundOn from '../components/icons/SoundOn'
import SoundOff from '../components/icons/SoundOff'
import GameCard from '../components/ui/GameCard'
import GameModal from '../components/ui/GameModal'
import { useMemoryGame } from '../hooks/useMemoryGame'

function GameScreen() {
  const {
    timeLeft,
    cards,
    modal,
    isMuted,
    toggleMute,
    handleCardClick,
    handleCloseModal,
  } = useMemoryGame()

  return (
    <section className="bg-background text-text min-h-screen overflow-hidden px-4 py-6">
      <div className="mx-auto flex h-[calc(100svh-3rem)] max-w-3xl flex-col gap-6">
        <header className="flex shrink-0 items-center justify-between">
          <h2 className="text-3xl font-bold tracking-wide">Memory Game</h2>

          <button
            className="bg-surface hover:bg-surface-2 cursor-pointer rounded-xl px-2 py-2 transition"
            onClick={toggleMute}
          >
            {isMuted ? <SoundOn /> : <SoundOff />}
          </button>
        </header>

        <div className="text-timer shrink-0 text-center text-2xl font-bold">
          <p className="text-lg">Time Left:</p>
          <h2 className="text-3xl">{timeLeft}s</h2>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="grid h-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {cards.map((card) => (
              <GameCard
                key={card.uniqueId}
                card={card}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>

      <GameModal modal={modal} onClose={handleCloseModal} />
    </section>
  )
}

export default GameScreen
