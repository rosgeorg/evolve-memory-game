import { useEffect, useState } from 'react'
import { CLOSED_MODAL, MODAL_MESSAGES } from '../constants/modalMessages'
import { createCardsSet } from '../utils/createCardsSet'
import { useSoundManager } from './useSoundManager'

export function useMemoryGame() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [cards, setCards] = useState(createCardsSet)
  const [selectedCards, setSelectedCards] = useState([])
  const [modal, setModal] = useState(CLOSED_MODAL)

  const {
    isMuted,
    toggleMute,
    stopBackground,
    startTicking,
    stopTicking,
    playIncorrect,
  } = useSoundManager()

  useEffect(() => {
    if (timeLeft === 0) {
      stopTicking()
      stopBackground()

      return
    }

    if (!isTimerRunning) {
      stopTicking()

      return
    }

    if (timeLeft <= 10) {
      startTicking()
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [isTimerRunning, timeLeft])

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
  }

  const openSuccessModal = () => {
    setModal({
      isOpen: true,
      ...MODAL_MESSAGES.success,
    })
  }

  const openErrorModal = () => {
    setModal({
      isOpen: true,
      ...MODAL_MESSAGES.error,
    })
  }

  const markCardsAsMatched = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isMatched: true } : card
      )
    )
  }

  const hideSelectedCards = () => {
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

  const flipCard = (clickedCard) => {
    const flippedCard = {
      ...clickedCard,
      isFlipped: true,
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.uniqueId === clickedCard.uniqueId ? flippedCard : card
      )
    )

    return flippedCard
  }

  const processSelectedCards = (newSelectedCards) => {
    if (newSelectedCards.length < 2) {
      return newSelectedCards
    }

    stopTimer()

    const [firstCard, secondCard] = newSelectedCards

    if (firstCard.id === secondCard.id) {
      markCardsAsMatched(firstCard.id)
      openSuccessModal()

      return []
    }

    playIncorrect()

    openErrorModal()

    return newSelectedCards
  }

  const canFlipCard = (card) => {
    return (
      !modal.isOpen &&
      !card.isFlipped &&
      !card.isMatched &&
      selectedCards.length < 2
    )
  }

  const handleCardClick = (clickedCard) => {
    if (!canFlipCard(clickedCard)) return

    const flippedCard = flipCard(clickedCard)

    setSelectedCards((prevSelectedCards) => {
      const newSelectedCards = [...prevSelectedCards, flippedCard]

      return processSelectedCards(newSelectedCards)
    })
  }

  const handleCloseModal = () => {
    if (modal.type === 'error') {
      hideSelectedCards()
    }

    startTimer()
    setSelectedCards([])
    setModal(CLOSED_MODAL)
  }

  return {
    timeLeft,
    cards,
    modal,
    isMuted,
    toggleMute,
    handleCardClick,
    handleCloseModal,
  }
}
