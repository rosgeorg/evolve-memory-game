import { FEEDBACK_MESSAGES } from '../constants/feedbackMessages'

function FinalScreen({ result, onPlayAgain }) {
  const isWin = result === 'win'
  const feedback = FEEDBACK_MESSAGES[result]

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
