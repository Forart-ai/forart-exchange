import { useQuery, UseQueryResult } from 'react-query'
import axios from 'axios'
import useDiscordAccessToken from '../useDiscordAccessToken'

export interface DiscordOAuth2User {
    application: Application
    scopes: string[]
    expires: string
    user: User
    token: string
}

export interface Application {
    id: string
    name: string
    icon: any
    description: string
    summary: string
    type: any
    hook: boolean
    bot_public: boolean
    bot_require_code_grant: boolean
    verify_key: string
}

export interface User {
    id: string
    username: string
    avatar: any
    discriminator: string
    public_flags: number
}

const useDiscordMeQuery = (): UseQueryResult<DiscordOAuth2User> => {
  const token = useDiscordAccessToken()

  return useQuery(
    ['DiscordMe', token],
    () => {
      if (!token) {
        return undefined
      }

      return axios.get('https://discord.com/api/oauth2/@me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(r => ({ ...r.data, token }))
    }
  )
}

export default useDiscordMeQuery
