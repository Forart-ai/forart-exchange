import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { AUTH_API } from '../../../apis/auth'
import { useRefreshController } from '../../../contexts/refresh-controller'

export const useUserBoundedDepainter = (): UseQueryResult<any> => {
  const { account } = useSolanaWeb3()
  const  forceRefresh  = useRefreshController()
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['USER_BOUNDED_DEPAINTER', account, quietRefreshFlag],
    async () => {
      if (!account) return
      return await AUTH_API.getUserBoundDePainter(account.toBase58()).then(res => res)
    },{
      refetchOnWindowFocus:false,
      refetchInterval:false,
      keepPreviousData: true
    }
  )
}
