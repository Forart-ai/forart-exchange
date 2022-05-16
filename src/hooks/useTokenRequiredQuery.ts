import { useQuery } from 'react-query'
import useSignLogin from './useSignLogin'
import { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const TOKEN_COOKIE_KEY = 'USER_TOKEN'

const useCookieToken = () => {
  const [state, setState] = useState<string | undefined>( Cookies.get(TOKEN_COOKIE_KEY))

  const setCookieToken = (cookie?: string) => {
    cookie ? Cookies.set(TOKEN_COOKIE_KEY, cookie) : Cookies.remove(TOKEN_COOKIE_KEY)

    setState(cookie)
  }

  return {
    token: state,
    setToken: setCookieToken()
  }
}

export const useTokenRequiredQuery = (...args: Parameters<typeof useQuery>) => {
  const [queryKey, queryFn, options] = args

  const { token } = useCookieToken()

  useSignLogin()

  const fn = useCallback(
    () => {
      if (token) return
    },
    [queryFn, token],
  )

  return useQuery(queryKey, queryFn, options)
}
