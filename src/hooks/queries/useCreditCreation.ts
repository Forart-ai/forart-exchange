import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'

export const useCreditCreation = (series: number): UseQueryResult<any> => {
  const { intermediateRefreshFlag } = useRefreshController()
  const { account } = useSolanaWeb3()

  return useQuery(
    ['USER_CREDIT_CREATION', series, account, intermediateRefreshFlag],
    async () => {
      if (!account) return
      return await CONFT_API.core.user.getUserCreateCredit(series).then(res => res)
    }
  )
}
