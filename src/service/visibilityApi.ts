import { useState, useEffect } from 'react'
export function useIsWindowInFocus() {
  const [isWindowInFocus, setIsWindowInFocus] = useState(true)

  function handleVisibilityChange() {
    setIsWindowInFocus(!document.hidden)
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isWindowInFocus
}
