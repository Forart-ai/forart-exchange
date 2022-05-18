import { useEffect, useState } from 'react'
const useDebounce = (initialValue = '', delay: number) => {
  const [actualValue, setActualValue] = useState<any>(initialValue)
  const [debounceValue, setDebounceValue] = useState<any>(initialValue)

  useEffect(() => {
    const debounceId = setTimeout(() => setDebounceValue(actualValue), delay)
    return () => clearTimeout(debounceId)
  }, [actualValue, delay])

  return [debounceValue, setActualValue]
}

export default useDebounce
