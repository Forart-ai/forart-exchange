import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useEffect, useRef, useState } from 'react'
import { AUTH_API } from '../apis/auth'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { BaseMessageSignerWalletAdapter } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'
import { useLocation } from 'react-router-dom'

export const randomString = (len: number) => {
  const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}

export function useSignLogin() {
  const { pathname } = useLocation()
  const { adapter, account } = useSolanaWeb3()
  const [retry, setRetry] = useState<boolean>(false)
  const [decoded, setDecoded] = useState()

  const loginRef = useRef<() => void>(() => void 0)

  useEffect(() => {
    const interval = setInterval(() => {
      loginRef.current()
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const buildLoginMethod = (pathname: string, adapter?: BaseMessageSignerWalletAdapter, account?: PublicKey): () => void => {
    return async () => {
      if (['/ai-general/goblintownai', '/'].includes(pathname) || Cookies.get('USER_TOKEN')) return

      // adapter?: BaseMessageSignerWalletAdapter, account?: PublicKey
      const a = randomString(10)

      const message = new TextEncoder().encode(`
        Welcome to Forart <br/> 
        This request will not trigger a blockchain transaction or cost any fees.
        Your authentication status will reset after 2 hours.: ${a}
`)

      const decodeMessage = new TextDecoder().decode(message)

      if (!adapter || !account) {
        return
      }

      const signed = (await adapter.signMessage(message))!

      const signature = Buffer.from(signed).toString('base64')
      const inFifteenMinutes = new Date(new Date().getTime() + 20 * 1000)

      // console.log(Buffer.from(signed).toString('base64'))

      await AUTH_API.userSignLogin({
        wallet: account.toBase58(),
        walletInBase64: account.toBuffer().toString('base64'),
        toSign: decodeMessage,
        signed: signature
      }).then((res: any) => {
        const decoded: any = jwt_decode(res)
        setDecoded(decoded)
        const expDate = new Date(decoded.exp * 1000)

        Cookies.set('USER_TOKEN', res, { expires: expDate })
      })

      // console.log(nacl.sign.detached.verify(message, new Buffer(signature, 'base64'), Uint8Array.from(account!.toBuffer())))

      return signature
    }
  }

  useEffect(() => {
    loginRef.current = buildLoginMethod(pathname, adapter, account)

    if (adapter && account) {
      loginRef.current()
    }
  }, [adapter, account, pathname])
}

export default useSignLogin

