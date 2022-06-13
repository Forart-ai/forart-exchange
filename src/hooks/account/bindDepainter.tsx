import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useCallback, useState } from 'react'
import { AUTH_API } from '../../apis/auth'
import { useRefreshController } from '../../contexts/refresh-controller'
import { useEnqueueSnackbar } from '../../contexts/theme/components/Snackbar'
import { randomString } from '../useSignLogin'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

const useBindDePainter = () => {
  const { account: solAccount, adapter } = useSolanaWeb3()
  const { forceRefresh } = useRefreshController()
  const enqueueSnackbar = useEnqueueSnackbar()

  const [loading, setLoading] = useState<boolean>(false)

  const bindDePainter =  useCallback(
    async (mintKey?: string) => {

      if (!mintKey || !solAccount ||!adapter ) return

      setLoading(true)

      await AUTH_API.bindDePainter({ wallet: solAccount.toBase58(), mintKey: mintKey }).then(res => {
        enqueueSnackbar('Bind successfully', 'Success',{ variant: 'success' })
        forceRefresh()
        setLoading(false)
        console.log('finish binding')
      })
      console.log('next')

      const a = randomString(66)

      const message = new TextEncoder().encode(`hello world: ${a}`)

      const decodeMessage = new TextDecoder().decode(message)

      const signed = (await adapter.signMessage(message))!

      const signature = Buffer.from(signed).toString('base64')

      // console.log(Buffer.from(signed).toString('base64'))

      AUTH_API.userSignLogin({ wallet:solAccount.toBase58(), walletInBase64:solAccount.toBuffer().toString('base64'), toSign: decodeMessage , signed:signature }).then((res:any) => {
        const decoded:any = jwt_decode(res)
        const expDate = new Date(decoded.exp * 1000)
        console.log('login agian')

        // const inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000)
        Cookies.set('USER_TOKEN', res,{ expires: expDate })
      })
    },
    [solAccount],
  )

  return { bindDePainter,loading }

}

export default useBindDePainter

