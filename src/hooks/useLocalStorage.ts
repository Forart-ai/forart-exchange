import { useCallback, useState } from 'react'

export const LOCAL_STORAGE_WALLET_KEY = 'WALLET'

function useLocalStorage<T>(key: string, defaultState?: T): [T | undefined, (arg?: T) => void] {
  const [state, setState] = useState<T | undefined>(() => {
    // NOTE: Not sure if this is ok
    const storedState = localStorage.getItem(key)
    if (storedState) {
      return JSON.parse(storedState)
    }

    return defaultState
  })

  const setLocalStorageState = useCallback(
    (newState?: T) => {
      const changed = state !== newState
      if (!changed) {
        return
      }

      setState(newState)
      if (!newState) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newState))
      }
    },
    [state, key]
  )

  return [state, setLocalStorageState]
}

export default useLocalStorage
