const variants = {
  primary: `
    bg-primary
    text-text
    hover:bg-primary-hover
    active:bg-primary-active
  `,
  secondary: `
    bg-surface-2
    text-text
    hover:bg-surface
    active:bg-background
  `,
}

function Button({ children, onClick, variant = "primary", className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-2xl
        px-8
        py-4
        text-xl
        font-bold
        tracking-wide

        shadow-lg
        shadow-black/30

        transition-all
        duration-200

        hover:animate-bounce-once
        cursor-pointer

        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button