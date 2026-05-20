function GameCard({ card, onClick }) {
  return (
    <button
      onClick={() => onClick(card)}
      className="group aspect-square cursor-pointer rounded-2xl [perspective:var(--perspective-card)]"
    >
      <div
        className={`flip-card-inner relative h-full w-full rounded-2xl ${card.isFlipped ? 'flipped' : ''}`}
      >
        <div className="card-face bg-card-back group-hover:bg-card-back-hover absolute inset-0 flex items-center justify-center rounded-2xl shadow-[var(--shadow-card)] transition group-hover:shadow-[var(--shadow-card-hover)]">
          <span className="text-question text-[clamp(4rem,7vw,8rem)] font-black drop-shadow-[var(--shadow-question)]">
            ?
          </span>
        </div>

        <div className="card-face card-back bg-surface absolute inset-0 flex items-center justify-center rounded-2xl shadow-[var(--shadow-card)]">
          <img src={card.icon} alt={card.id} className="h-20 w-20" />
        </div>
      </div>
    </button>
  )
}

export default GameCard
