import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./screens/GameScreen', () => ({
  default: ({ onFinish }) => (
    <section>
      <h1>Game Screen</h1>
      <button onClick={() => onFinish('win')}>Finish Win</button>
    </section>
  ),
}))

describe('App', () => {
  it('starts on the start screen', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Memory Game' })).toBeInTheDocument()
  })

  it('goes to game screen after clicking Start', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Start' }))

    expect(screen.getByRole('heading', { name: 'Game Screen' })).toBeInTheDocument()
  })

  it('goes to final screen after game finishes', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Start' }))
    await user.click(screen.getByRole('button', { name: 'Finish Win' }))

    expect(screen.getByRole('heading', { name: 'You did it!' })).toBeInTheDocument()
  })
})
