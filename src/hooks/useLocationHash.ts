import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export const useLocationHash = () => {
  const { hash } = useLocation()

  return useMemo(()=> {
    const pairs = hash.slice(1).split('&')
    console.log(pairs)
    return pairs
  },[hash])
}
