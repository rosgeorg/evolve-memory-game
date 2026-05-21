import { useEffect } from 'react'
import { FEEDBACK_MESSAGES } from '../constants/feedbackMessages'
import { getBestTime } from '../utils/bestTimeStorage'
import { triggerConfetti } from '../utils/triggerConfetti'

function FinalScreen({ result, stars, onPlayAgain }) {
  const isWin = result === 'win'
  const feedback = FEEDBACK_MESSAGES[result]
  const bestTime = getBestTime()

  useEffect(() => {
    if (isWin) {
      triggerConfetti()
    }
  }, [isWin])

  return (
    <section
      className={`bg-gradient-to-b ${isWin ? 'from-success-bg to-green-900' : 'from-error-bg to-red-950'} text-text flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center`}
    >
      <h1
        className={`text-5xl font-black tracking-wide drop-shadow-lg ${isWin ? 'text-success' : 'text-error'} `}
      >
        {feedback.title}
      </h1>

      <p className="max-w-md text-xl font-semibold">{feedback.message}</p>

      {isWin && (
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <img
              key={index}
              src={
                index < stars ? '/images/star.png' : '/images/starOutline.png'
              }
              alt="Star"
              className="h-14 w-14"
            />
          ))}
        </div>
      )}

      {isWin && bestTime > 0 && (
        <p className="text-lg font-semibold text-yellow-200">
          Best Time: {bestTime}s
        </p>
      )}

      <button
        onClick={onPlayAgain}
        className="bg-primary hover:bg-primary-hover active:bg-primary-active text-text hover:animate-bounce-once cursor-pointer rounded-2xl px-8 py-4 text-xl font-bold tracking-wide shadow-lg shadow-black/30 transition-all duration-200"
      >
        Play Again
      </button>
    </section>
  )
}

export default FinalScreen
