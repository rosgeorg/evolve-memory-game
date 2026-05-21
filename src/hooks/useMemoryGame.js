import { useEffect, useState } from 'react'
import { CLOSED_MODAL, MODAL_MESSAGES } from '../constants/modalMessages'
import { createCardsSet } from '../utils/createCardsSet'
import { useSoundManager } from './useSoundManager'
import { getStars } from '../utils/getStars'
import { getBestTime, saveBestTime } from '../utils/bestTimeStorage'

const FLIP_ANIMATION_DURATION = 350

export function useMemoryGame({ onFinish }) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [cards, setCards] = useState(createCardsSet)
  const [selectedCards, setSelectedCards] = useState([])
  const [modal, setModal] = useState(CLOSED_MODAL)
  const [isBoardLocked, setIsBoardLocked] = useState(false)

  const {
    isMuted,
    toggleMute,
    stopBackground,
    startTicking,
    stopTicking,
    playIncorrect,
    playCorrect,
  } = useSoundManager()

  useEffect(() => {
    if (timeLeft === 0) {
      stopTicking()
      stopBackground()
      onFinish('lose')
      return
    }

    if (!isTimerRunning) {
      stopTicking()
      return
    }

    // Start ticking sound at 10s to signal urgency to the player
    if (timeLeft <= 10) {
      startTicking()
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [isTimerRunning, timeLeft, onFinish])

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

  const evaluateMatch = (newSelectedCards) => {
    if (newSelectedCards.length < 2) {
      return
    }

    stopTimer()

    const [firstCard, secondCard] = newSelectedCards

    //Cards match
    if (firstCard.id === secondCard.id) {
      const hasWon = cards
        .map((card) =>
          card.id === firstCard.id ? { ...card, isMatched: true } : card
        )
        .every((card) => card.isMatched)

      markCardsAsMatched(firstCard.id)
      playCorrect()

      if (hasWon) {
        stopTicking()
        stopBackground()

        const timeUsed = 30 - timeLeft
        const currentBestTime = getBestTime()
        if (!currentBestTime || timeUsed < currentBestTime) {
          saveBestTime(timeUsed)
        }

        onFinish('win', getStars(timeLeft))
        return
      }

      openSuccessModal()
      setSelectedCards([])
      return
    }

    //Cards don't match
    playIncorrect()
    openErrorModal()
  }

  const canFlipCard = (card) => {
    return (
      !isBoardLocked &&
      !modal.isOpen &&
      !card.isFlipped &&
      !card.isMatched &&
      selectedCards.length < 2
    )
  }

  const handleCardClick = (clickedCard) => {
    if (!canFlipCard(clickedCard)) return

    setIsBoardLocked(true)

    const flippedCard = flipCard(clickedCard)

    setTimeout(() => {
      const newSelectedCards = [...selectedCards, flippedCard]

      setSelectedCards(newSelectedCards)
      evaluateMatch(newSelectedCards)

      setIsBoardLocked(false)
    }, FLIP_ANIMATION_DURATION)
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
