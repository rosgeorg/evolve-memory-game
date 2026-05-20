import { useState } from 'react'
import { CARD_TYPES } from '../constants/cards'
import { shuffle } from '../utils/shuffle'
import SoundOn from '../components/icons/SoundOn'
import GameCard from '../components/ui/GameCard'
import Button from '../components/ui/Button'

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

  const [selectedCards, setSelectedCards] = useState([])
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: '',
  })

  const handleCardClick = (clickedCard) => {
    if (
      modal.isOpen ||
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      selectedCards.length === 2
    ) {
      return
    }

    const flippedCard = { ...clickedCard, isFlipped: true }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.uniqueId === clickedCard.uniqueId ? flippedCard : card
      )
    )

    setSelectedCards((prevSelectedCards) => {
      const newSelectedCards = [...prevSelectedCards, flippedCard]

      if (newSelectedCards.length === 2) {
        const [firstCard, secondCard] = newSelectedCards

        if (firstCard.id === secondCard.id) {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id ? { ...card, isMatched: true } : card
            )
          )

          setModal({
            isOpen: true,
            title: 'Nice!',
            message: "It's a match.",
            type: 'success',
          })

          return []
        }

        setModal({
          isOpen: true,
          title: 'Oops!',
          message: 'Sorry, but this is not a match.',
          type: 'error',
        })
      }

      return newSelectedCards
    })
  }

  const handleCloseModal = () => {
    if (modal.type === 'error') {
      const [firstCard, secondCard] = selectedCards

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.uniqueId === firstCard.uniqueId ||
          card.uniqueId === secondCard.uniqueId
            ? { ...card, isFlipped: false }
            : card
        )
      )
    }

    setSelectedCards([])

    setModal({
      isOpen: false,
      title: '',
      message: '',
      type: '',
    })
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

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-modal border-modal-border flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border p-6 text-center shadow-2xl">
            <h2 className="text-2xl font-black">{modal.title}</h2>

            <p className="text-muted text-lg">{modal.message}</p>

            <Button
              onClick={handleCloseModal}
              variant="secondary"
              className="w-full"
            >
              {modal.type === 'success' ? 'Continue' : 'Try Again'}
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default GameScreen
