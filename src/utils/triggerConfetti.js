import confetti from 'canvas-confetti'

export function triggerConfetti() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { x: 0.2, y: 0.6 },
  })

  confetti({
    particleCount: 200,
    spread: 120,
    origin: { x: 0.8, y: 0.6 },
  })

  confetti({
    particleCount: 150,
    spread: 160,
    origin: { y: 0.4 },
  })
}
