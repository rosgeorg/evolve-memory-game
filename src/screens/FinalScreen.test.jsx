import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FinalScreen from './FinalScreen'

describe('FinalScreen', () => {
  it('shows win feedback', () => {
    render(<FinalScreen result="win" onPlayAgain={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'You did it!' })).toBeInTheDocument()
    expect(screen.getByText('You found all the matches.')).toBeInTheDocument()
  })

  it('shows lose feedback', () => {
    render(<FinalScreen result="lose" onPlayAgain={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Oops!' })).toBeInTheDocument()
    expect(screen.getByText("Oops you didn't find them all.")).toBeInTheDocument()
  })

  it('calls onPlayAgain when play again button is clicked', async () => {
    const user = userEvent.setup()
    const onPlayAgain = vi.fn()

    render(<FinalScreen result="win" onPlayAgain={onPlayAgain} />)

    await user.click(screen.getByRole('button', { name: 'Play Again' }))

    expect(onPlayAgain).toHaveBeenCalledTimes(1)
  })
})
