import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useCallback, useEffect } from 'react'
import nacl from 'tweetnacl'
import { AUTH_API } from '../apis/auth'
import useLocalStorage from './useLocalStorage'
import useEagerConnect from './useEagerConnect'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const randomString = (len: number) => {
  const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'')
}

export function useSignLogin() {
  const { adapter, account } = useSolanaWeb3()
  const { eagerConnected } = useEagerConnect()

  useEffect( () => {
    (async () => {
      if (!Cookies.get('USER_TOKEN')) {
        const a = randomString(150)

        const message = new TextEncoder().encode('hello world')

        if (!adapter || !account ) {
          return
        }

        const signed = (await adapter.signMessage(message))!

        const signature = Buffer.from(signed).toString('base64')

        // console.log(Buffer.from(signed).toString('base64'))

        AUTH_API.userSignLogin({ wallet:account.toBuffer().toString('base64'), toSign:'hello world', signed:signature }).then((res:any) => {
          const decoded:any = jwt_decode(res)
          const expDate = new Date(decoded.exp * 1000)

          // const inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000)
          Cookies.set('USER_TOKEN', res,{ expires: expDate })
        })

        // console.log(nacl.sign.detached.verify(message, new Buffer(signature, 'base64'), Uint8Array.from(account!.toBuffer())))

        return signature
      }
    })()
  },[account, adapter])
}

export default useSignLogin
