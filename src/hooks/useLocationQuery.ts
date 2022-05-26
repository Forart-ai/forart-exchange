import { useLocation } from 'react-router-dom'

export const  useLocationQuery = (key:string): string | undefined => {
  return new URLSearchParams(useLocation().search).get(key) ?? undefined
}
