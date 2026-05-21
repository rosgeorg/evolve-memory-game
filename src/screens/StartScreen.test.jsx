import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import StartScreen from './StartScreen'

describe('StartScreen', () => {
  it('renders the title and start button', () => {
    render(<StartScreen onStart={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Memory Game' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })

  it('calls onStart when start button is clicked', async () => {
    const user = userEvent.setup()
    const onStart = vi.fn()

    render(<StartScreen onStart={onStart} />)

    await user.click(screen.getByRole('button', { name: 'Start' }))

    expect(onStart).toHaveBeenCalledTimes(1)
  })
})
