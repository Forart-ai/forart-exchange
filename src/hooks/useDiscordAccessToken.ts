import { useMemo } from 'react'
import useLocationHash from './useLocationHash'

const useDiscordAccessToken = () => {
  const locationHash = useLocationHash()

  return useMemo(() => {
    return locationHash.get('access_token')
  },[locationHash])
}

export default useDiscordAccessToken
