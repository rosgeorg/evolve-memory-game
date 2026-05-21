import Button from './Button'

function GameModal({ modal, onClose }) {
  if (!modal.isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div
        className={`bg-modal border-modal-border flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-t-4 p-6 text-center shadow-2xl ${
          modal.type === 'success' ? 'modal-success-glow' : 'modal-error-glow'
        }`}
      >
        <h2 className="text-2xl font-black">{modal.title}</h2>

        <p className="text-muted text-lg">{modal.message}</p>

        <Button onClick={onClose} variant="secondary" className="w-full">
          {modal.type === 'success' ? 'Continue' : 'Try Again'}
        </Button>
      </div>
    </div>
  )
}

export default GameModal
