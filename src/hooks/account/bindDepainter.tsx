import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useCallback, useState } from 'react'
import { AUTH_API } from '../../apis/auth'
import { useRefreshController } from '../../contexts/refresh-controller'
import { useEnqueueSnackbar } from '../../contexts/theme/components/Snackbar'

const useBindDePainter = () => {
  const { account: solAccount } = useSolanaWeb3()
  const { forceRefresh } = useRefreshController()
  const enqueueSnackbar = useEnqueueSnackbar()

  const [loading, setLoading] = useState<boolean>(false)

  const bindDePainter =  useCallback(
    async (mintKey?: string) => {

      if (!mintKey || !solAccount) return

      setLoading(true)

      AUTH_API.bindDePainter({ wallet: solAccount.toBase58(), mintKey: mintKey }).then(res => {
        enqueueSnackbar('Bind successfully', 'Success',{ variant: 'success' })
        forceRefresh()
        setLoading(false)
      })
      console.log(mintKey)
    },
    [solAccount],
  )

  return { bindDePainter,loading }

}

export default useBindDePainter

