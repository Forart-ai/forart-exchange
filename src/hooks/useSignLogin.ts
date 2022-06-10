import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AUTH_API } from '../apis/auth'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { BaseMessageSignerWalletAdapter } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'

export const randomString = (len: number) => {
  const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}

export function useSignLogin() {
  const { adapter, account } = useSolanaWeb3()
  const [retry, setRetry] = useState<boolean>(false)
  const [decoded, setDecoded] = useState()

  const loginRef = useRef<() => void>(() => void 0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!Cookies.get('USER_TOKEN')) {
        loginRef.current()
      }
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const buildLoginMethod = (adapter?: BaseMessageSignerWalletAdapter, account?: PublicKey): () => void => {
    return async () => {
      // adapter?: BaseMessageSignerWalletAdapter, account?: PublicKey
      const a = randomString(66)

      const message = new TextEncoder().encode(`hello world: ${a}`)

      const decodeMessage = new TextDecoder().decode(message)

      console.log('account change', account)

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
    loginRef.current = buildLoginMethod(adapter, account)

    if (adapter && account) {
      loginRef.current()
    }
  }, [adapter, account])
}

export default useSignLogin
