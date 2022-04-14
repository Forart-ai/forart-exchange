import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useCallback } from 'react'
import nacl from 'tweetnacl'
import AUTH_API from '../apis/auth'

const randomString = (len: number) => {
  const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'')
}

const useSignLogin = () => {
  const { adapter, account } = useSolanaWeb3()

  const randomMessage = 'hello world'

  const login = useCallback(async () => {

    const a = randomString(150)

    console.log(a)

    const message = new TextEncoder().encode(a)

    if (!adapter || !account){
      return
    }

    const signed = (await adapter.signMessage(message))!

    // console.log(nacl.sign.detached.verify(message, signed, Uint8Array.from(account!.toBuffer())))

    const signature = Buffer.from(signed).toString('base64')

    console.log(Buffer.from(signed).toString('base64'))

    // await AUTH_API.userSignLogin({ wallet: account.toBase58(), toSign: randomMessage, signed: signature } ).then(res => {
    //   console.log(res.data)
    // })

    return signature

  },[account, adapter])

  return {
    login
  }
}

export { useSignLogin }
