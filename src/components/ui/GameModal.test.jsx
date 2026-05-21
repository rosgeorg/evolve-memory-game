import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import GameModal from './GameModal'

const closedModal = {
  isOpen: false,
  title: '',
  message: '',
  type: '',
}

describe('GameModal', () => {
  it('does not render when modal is closed', () => {
    render(<GameModal modal={closedModal} onClose={vi.fn()} />)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders success content and calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <GameModal
        modal={{
          isOpen: true,
          title: 'Nice!',
          message: "It's a match.",
          type: 'success',
        }}
        onClose={onClose}
      />
    )

    expect(screen.getByRole('heading', { name: 'Nice!' })).toBeInTheDocument()
    expect(screen.getByText("It's a match.")).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders error content and calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <GameModal
        modal={{
          isOpen: true,
          title: 'Oops!',
          message: 'Sorry, but this is not a match.',
          type: 'error',
        }}
        onClose={onClose}
      />
    )

    expect(screen.getByRole('heading', { name: 'Oops!' })).toBeInTheDocument()
    expect(screen.getByText('Sorry, but this is not a match.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Try Again' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
