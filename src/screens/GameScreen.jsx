import { useState } from 'react'
import { CARD_TYPES } from '../constants/cards'
import { shuffle } from '../utils/shuffle'
import SoundOn from '../components/icons/SoundOn'
import GameCard from '../components/ui/GameCard'

function GameScreen() {
  const [cards, setCards] = useState(() => {
    const deck = [...CARD_TYPES, ...CARD_TYPES]
    const shuffledDeck = shuffle([...deck])

    return shuffledDeck.map((card, index) => ({
      ...card,
      uniqueId: index,
      isFlipped: false,
      isMatched: false,
    }))
  })

  const handleCardClick = (clickedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.uniqueId === clickedCard.uniqueId
          ? { ...card, isFlipped: !card.isFlipped }
          : card
      )
    )
  }

  return (
    <section className="bg-background text-text min-h-screen overflow-hidden px-4 py-6">
      <div className="mx-auto flex h-[calc(100svh-3rem)] max-w-3xl flex-col gap-6">
        <header className="flex shrink-0 items-center justify-between">
          <h2 className="text-3xl font-bold tracking-wide">Memory Game</h2>

          <button className="bg-surface hover:bg-surface-2 rounded-xl px-2 py-2 transition">
            <SoundOn />
          </button>
        </header>

        <div className="text-timer shrink-0 text-center text-2xl font-bold">
          <p className="text-lg">Time Left:</p>
          <h2 className="text-3xl">30s</h2>
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
    </section>
  )
}

export default GameScreen
