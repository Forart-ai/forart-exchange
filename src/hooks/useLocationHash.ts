import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

const useLocationHash = () => {
  const { hash } = useLocation()

  return useMemo(()=> {
    const pairs = hash.slice(1).split('&')

    return new Map(pairs.map(pair => {
      const [key, value] = pair.split('=')
      return [key, value]
    }))
  },[hash])
}

export default useLocationHash
