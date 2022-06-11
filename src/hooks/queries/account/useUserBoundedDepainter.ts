import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { AUTH_API } from '../../../apis/auth'
import { useRefreshController } from '../../../contexts/refresh-controller'

export const useUserBoundedDepainter = (): UseQueryResult<any> => {
  const { account } = useSolanaWeb3()
  const  forceRefresh  = useRefreshController()

  return useQuery(
    ['USER_DEPAINTER', account, forceRefresh],
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
