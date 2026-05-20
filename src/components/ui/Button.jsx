const variants = {
  primary: `
    bg-primary
    text-text
    hover:bg-primary-hover
    active:bg-primary-active
  `,

  secondary: `
    bg-secondary
    text-text
    hover:bg-secondary-hover
    active:bg-secondary-active
  `,
}

function Button({ children, onClick, variant = 'primary', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`hover:animate-bounce-once cursor-pointer rounded-2xl px-8 py-4 text-xl font-bold tracking-wide shadow-lg shadow-black/30 transition-all duration-200 ${variants[variant]} ${className} `}
    >
      {children}
    </button>
  )
}

export default Button
