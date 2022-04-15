import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useCallback, useEffect } from 'react'
import nacl from 'tweetnacl'
import AUTH_API from '../apis/auth'
import useLocalStorage from './useLocalStorage'
import useEagerConnect from './useEagerConnect'

const randomString = (len: number) => {
  const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'')
}

export function useSignLogin() {
  const { adapter, account } = useSolanaWeb3()
  const { eagerConnected } = useEagerConnect()

  const [token, setToken] = useLocalStorage<string>('TOKEN','')

  useEffect( () => {
    (async () => {
      const a = randomString(150)

      console.log(a)

      const message = new TextEncoder().encode(a)

      if (!adapter || !account ) {
        console.log('none')
        return
      }

      const signed = (await adapter.signMessage(message))!

      // console.log(nacl.sign.detached.verify(message, signed, Uint8Array.from(account!.toBuffer())))

      const signature = Buffer.from(signed).toString('base64')

      console.log(Buffer.from(signed).toString('base64'))

      // await AUTH_API.userSignLogin({ wallet: account.toBase58(), toSign: randomMessage, signed: signature } ).then(res => {
      //   console.log(res.data)
      // })

      setToken('MONICaaaAd')

      console.log(token)

      return signature
    })()

  },[account, adapter])

  return { token }
}

export default useSignLogin
