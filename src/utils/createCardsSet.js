import { CARD_TYPES } from '../constants/cards'
import { shuffle } from './shuffle'

export function createCardsSet() {
  const deck = [...CARD_TYPES, ...CARD_TYPES]

  return shuffle([...deck]).map((card, index) => ({
    ...card,
    uniqueId: index,
    isFlipped: false,
    isMatched: false,
  }))
}
