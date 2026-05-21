import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MODAL_MESSAGES } from '../constants/modalMessages'
import { useMemoryGame } from './useMemoryGame'

const soundManagerMock = {
  isMuted: true,
  toggleMute: vi.fn(),
  stopBackground: vi.fn(),
  startTicking: vi.fn(),
  stopTicking: vi.fn(),
  playIncorrect: vi.fn(),
  playCorrect: vi.fn(),
}

const cardsMock = [
  {
    id: 'star',
    icon: 'star.svg',
    uniqueId: 0,
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 'star',
    icon: 'star.svg',
    uniqueId: 1,
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 'moon',
    icon: 'moon.svg',
    uniqueId: 2,
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 'moon',
    icon: 'moon.svg',
    uniqueId: 3,
    isFlipped: false,
    isMatched: false,
  },
]

vi.mock('./useSoundManager', () => ({
  useSoundManager: () => soundManagerMock,
}))

vi.mock('../utils/createCardsSet', () => ({
  createCardsSet: () => cardsMock.map((card) => ({ ...card })),
}))

beforeEach(() => {
  vi.useFakeTimers()
  vi.clearAllMocks()
})

describe('useMemoryGame', () => {
  it('starts with 30 seconds, closed modal and created cards', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() => useMemoryGame({ onFinish }))

    expect(result.current.timeLeft).toBe(30)
    expect(result.current.cards).toHaveLength(4)
    expect(result.current.modal.isOpen).toBe(false)
  })

  it('counts down and finishes with lose when the timer reaches 0', () => {
    const onFinish = vi.fn()
    renderHook(() => useMemoryGame({ onFinish }))

    act(() => {
      vi.advanceTimersByTime(30000)
    })

    expect(onFinish).toHaveBeenCalledWith('lose')
    expect(soundManagerMock.stopTicking).toHaveBeenCalled()
    expect(soundManagerMock.stopBackground).toHaveBeenCalled()
  })

  it('starts ticking when there are 10 seconds left', () => {
    const onFinish = vi.fn()
    renderHook(() => useMemoryGame({ onFinish }))

    act(() => {
      vi.advanceTimersByTime(20000)
    })

    expect(soundManagerMock.startTicking).toHaveBeenCalled()
  })

  it('flips one card after the flip animation duration', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() => useMemoryGame({ onFinish }))

    act(() => {
      result.current.handleCardClick(result.current.cards[0])
    })

    expect(result.current.cards[0].isFlipped).toBe(true)

    act(() => {
      vi.advanceTimersByTime(350)
    })

    expect(result.current.cards[0].isFlipped).toBe(true)
  })

  it('prevents clicking another card while the board is locked', () => {
    const { result } = renderHook(() =>
      useMemoryGame({
        onFinish: vi.fn(),
      })
    )

    const firstCard = result.current.cards[0]
    const secondCard = result.current.cards[1]

    act(() => {
      result.current.handleCardClick(firstCard)
    })

    expect(result.current.cards[0].isFlipped).toBe(true)

    act(() => {
      result.current.handleCardClick(secondCard)
    })

    expect(result.current.cards[1].isFlipped).toBe(false)
  })

  it('opens success modal and marks matching cards as matched', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() => useMemoryGame({ onFinish }))

    act(() => {
      result.current.handleCardClick(result.current.cards[0])
      vi.advanceTimersByTime(350)
    })

    act(() => {
      result.current.handleCardClick(result.current.cards[1])
      vi.advanceTimersByTime(350)
    })

    expect(result.current.modal).toEqual({
      isOpen: true,
      ...MODAL_MESSAGES.success,
    })
    expect(result.current.cards.filter((card) => card.id === 'star')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ isMatched: true }),
        expect.objectContaining({ isMatched: true }),
      ])
    )
    expect(soundManagerMock.playCorrect).toHaveBeenCalledTimes(1)
  })

  it('opens error modal and plays incorrect sound when cards do not match', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() => useMemoryGame({ onFinish }))

    act(() => {
      result.current.handleCardClick(result.current.cards[0])
      vi.advanceTimersByTime(350)
    })

    act(() => {
      result.current.handleCardClick(result.current.cards[2])
      vi.advanceTimersByTime(350)
    })

    expect(result.current.modal).toEqual({
      isOpen: true,
      ...MODAL_MESSAGES.error,
    })
    expect(soundManagerMock.playIncorrect).toHaveBeenCalledTimes(1)
  })

  it('turns non-matching selected cards face down when closing error modal', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() => useMemoryGame({ onFinish }))

    act(() => {
      result.current.handleCardClick(result.current.cards[0])
      vi.advanceTimersByTime(350)
    })

    act(() => {
      result.current.handleCardClick(result.current.cards[2])
      vi.advanceTimersByTime(350)
    })

    act(() => {
      result.current.handleCloseModal()
    })

    expect(result.current.modal.isOpen).toBe(false)
    expect(result.current.cards[0].isFlipped).toBe(false)
    expect(result.current.cards[2].isFlipped).toBe(false)
  })

  it('finishes with win after finding all matches', () => {
    const onFinish = vi.fn()
    const { result } = renderHook(() => useMemoryGame({ onFinish }))

    act(() => {
      result.current.handleCardClick(result.current.cards[0])
      vi.advanceTimersByTime(350)
    })
    act(() => {
      result.current.handleCardClick(result.current.cards[1])
      vi.advanceTimersByTime(350)
    })
    act(() => {
      result.current.handleCloseModal()
    })
    act(() => {
      result.current.handleCardClick(result.current.cards[2])
      vi.advanceTimersByTime(350)
    })
    act(() => {
      result.current.handleCardClick(result.current.cards[3])
      vi.advanceTimersByTime(350)
    })

    expect(onFinish).toHaveBeenCalledWith('win')
    expect(soundManagerMock.stopTicking).toHaveBeenCalled()
    expect(soundManagerMock.stopBackground).toHaveBeenCalled()
  })
})
