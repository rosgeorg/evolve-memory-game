import { describe, it, expect } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('returns an array with the same length', () => {
    const array = [1, 2, 3, 4]
    expect(shuffle([...array])).toHaveLength(array.length)
  })

  it('returns an array with the same elements', () => {
    const array = [1, 2, 3, 4]
    expect(shuffle([...array]).sort()).toEqual([...array].sort())
  })

  it('mutates and returns the same array reference', () => {
    const array = [1, 2, 3, 4]
    const result = shuffle(array)
    expect(result).toBe(array)
  })

  it('handles an empty array', () => {
    expect(shuffle([])).toEqual([])
  })

  it('handles a single element array', () => {
    expect(shuffle([1])).toEqual([1])
  })
})
