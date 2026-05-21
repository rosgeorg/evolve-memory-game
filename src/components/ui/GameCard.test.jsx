import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import GameCard from './GameCard'

const card = {
  id: 'star',
  icon: 'star.svg',
  uniqueId: 1,
  isFlipped: false,
  isMatched: false,
}

describe('GameCard', () => {
  it('renders the question mark and card image', () => {
    render(<GameCard card={card} onClick={vi.fn()} />)

    expect(screen.getByText('?')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'star' })).toBeInTheDocument()
  })

  it('calls onClick with the card when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<GameCard card={card} onClick={onClick} />)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledWith(card)
  })

  it('adds flipped class when card is flipped', () => {
    const { container } = render(
      <GameCard card={{ ...card, isFlipped: true }} onClick={vi.fn()} />
    )

    expect(container.querySelector('.flip-card-inner')).toHaveClass('flipped')
  })
})
