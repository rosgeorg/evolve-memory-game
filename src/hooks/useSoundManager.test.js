import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSoundManager } from './useSoundManager'

const audioInstances = []

class AudioMock {
  constructor(src) {
    this.src = src
    this.loop = false
    this.volume = 1
    this.currentTime = 0
    this.paused = true
    this.play = vi.fn(() => {
      this.paused = false
      return Promise.resolve()
    })
    this.pause = vi.fn(() => {
      this.paused = true
    })
    audioInstances.push(this)
  }
}

beforeEach(() => {
  audioInstances.length = 0
  global.Audio = AudioMock
  vi.clearAllMocks()
})

describe('useSoundManager', () => {
  it('starts muted', () => {
    const { result } = renderHook(() => useSoundManager())

    expect(result.current.isMuted).toBe(true)
  })

  it('creates the expected audio files', () => {
    renderHook(() => useSoundManager())

    expect(audioInstances.map((audio) => audio.src)).toEqual([
      '/sounds/background.mp3',
      '/sounds/ticking.mp3',
      '/sounds/incorrect.mp3',
      '/sounds/correct.mp3',
    ])
  })

  it('plays background sound when unmuted', () => {
    const { result } = renderHook(() => useSoundManager())
    const background = audioInstances[0]

    act(() => {
      result.current.toggleMute()
    })

    expect(result.current.isMuted).toBe(false)
    expect(background.play).toHaveBeenCalledTimes(1)
  })

  it('pauses background and ticking sounds when muted again', () => {
    const { result } = renderHook(() => useSoundManager())
    const background = audioInstances[0]
    const ticking = audioInstances[1]

    act(() => {
      result.current.toggleMute()
      result.current.startTicking()
      result.current.toggleMute()
    })

    expect(result.current.isMuted).toBe(true)
    expect(background.pause).toHaveBeenCalled()
    expect(ticking.pause).toHaveBeenCalled()
  })

  it('does not play incorrect or correct sounds while muted', () => {
    const { result } = renderHook(() => useSoundManager())
    const incorrect = audioInstances[2]
    const correct = audioInstances[3]

    act(() => {
      result.current.playIncorrect()
      result.current.playCorrect()
    })

    expect(incorrect.play).not.toHaveBeenCalled()
    expect(correct.play).not.toHaveBeenCalled()
  })

  it('plays incorrect and correct sounds when unmuted', () => {
    const { result } = renderHook(() => useSoundManager())
    const incorrect = audioInstances[2]
    const correct = audioInstances[3]

    act(() => {
      result.current.toggleMute()
      result.current.playIncorrect()
      result.current.playCorrect()
    })

    expect(incorrect.play).toHaveBeenCalledTimes(1)
    expect(correct.play).toHaveBeenCalledTimes(1)
  })

  it('resets ticking sound when stopped', () => {
    const { result } = renderHook(() => useSoundManager())
    const ticking = audioInstances[1]

    act(() => {
      result.current.toggleMute()
      result.current.startTicking()
      result.current.stopTicking()
    })

    expect(ticking.pause).toHaveBeenCalled()
    expect(ticking.currentTime).toBe(0)
  })
})
