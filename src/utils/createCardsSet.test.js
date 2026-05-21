import { describe, expect, it, vi } from 'vitest'
import { CARD_TYPES } from '../constants/cards'
import { createCardsSet } from './createCardsSet'

vi.mock('../shuffle', () => ({
  shuffle: vi.fn((array) => array),
}))

describe('createCardsSet', () => {
  it('creates a deck with 8 cards', () => {
    expect(createCardsSet()).toHaveLength(8)
  })

  it('creates exactly two cards for each card type', () => {
    const cards = createCardsSet()

    CARD_TYPES.forEach((cardType) => {
      const matchingCards = cards.filter((card) => card.id === cardType.id)
      expect(matchingCards).toHaveLength(2)
    })
  })

  it('adds a uniqueId to every card', () => {
    const cards = createCardsSet()
    const uniqueIds = cards.map((card) => card.uniqueId)

    expect(new Set(uniqueIds).size).toBe(cards.length)
  })

  it('starts every card face down and unmatched', () => {
    const cards = createCardsSet()

    expect(cards.every((card) => card.isFlipped === false)).toBe(true)
    expect(cards.every((card) => card.isMatched === false)).toBe(true)
  })
})
