import { useEffect, useRef, useState } from 'react'

export function useSoundManager() {
  const [isMuted, setIsMuted] = useState(true)
  // isMutedRef mirrors isMuted state to allow reading mute status inside callbacks without stale closures
  const isMutedRef = useRef(true)
  const bgRef = useRef(null)
  const tickRef = useRef(null)
  const incorrectRef = useRef(null)

  useEffect(() => {
    bgRef.current = new Audio('/sounds/background.mp3')
    bgRef.current.loop = true
    bgRef.current.volume = 0.4

    tickRef.current = new Audio('/sounds/ticking.mp3')
    tickRef.current.loop = true
    tickRef.current.volume = 0.7

    incorrectRef.current = new Audio('/sounds/incorrect.mp3')
    incorrectRef.current.volume = 0.8

    correctRef.current = new Audio('/sounds/correct.mp3')
    correctRef.current.volume = 0.8

    return () => {
      bgRef.current?.pause()
      tickRef.current?.pause()
      incorrectRef.current?.pause()
      correctRef.current?.pause()
    }
  }, [])

  const playSound = (audio) => {
    audio?.play().catch(() => {})
  }

  const stopBackground = () => {
    bgRef.current?.pause()
  }

  const startTicking = () => {
    if (isMutedRef.current || !tickRef.current) return
    if (!tickRef.current.paused) return
    tickRef.current.currentTime = 0
    playSound(tickRef.current)
  }

  const stopTicking = () => {
    tickRef.current?.pause()
    if (tickRef.current) {
      tickRef.current.currentTime = 0
    }
  }

  const toggleMute = () => {
    setIsMuted((prevIsMuted) => {
      const nextIsMuted = !prevIsMuted
      isMutedRef.current = nextIsMuted
      if (nextIsMuted) {
        bgRef.current?.pause()
        tickRef.current?.pause()
      } else {
        playSound(bgRef.current)
      }
      return nextIsMuted
    })
  }

  const playIncorrect = () => {
    if (isMutedRef.current || !incorrectRef.current) return
    incorrectRef.current.currentTime = 0
    playSound(incorrectRef.current)
  }

  const playCorrect = () => {
    if (isMutedRef.current || !correctRef.current) return
    correctRef.current.currentTime = 0
    playSound(correctRef.current)
  }

  return {
    isMuted,
    toggleMute,
    stopBackground,
    startTicking,
    stopTicking,
    playIncorrect,
    playCorrect,
  }
}
