const BEST_TIME_KEY = 'best-time'

export function getBestTime() {
  return Number(localStorage.getItem(BEST_TIME_KEY))
}

export function saveBestTime(time) {
  localStorage.setItem(BEST_TIME_KEY, time)
}
