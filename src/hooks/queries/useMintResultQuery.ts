import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'
import CONFT_API from '../../apis/co-nft'
import { GetNftRequest } from '../contract/service/exchange/types'

// @ts-ignore
export const useMintResultQuery = (quicklyRefetch?: boolean, params: GetNftRequest): UseQueryResult<any> => {
  const { account } = useSolanaWeb3()
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['MintResult', account, quietRefreshFlag, params],
    () => {
      if (!account) {
        return undefined
      }

      return CONFT_API.core.kits.getNFTQuery(params).then(res => res)
    },
    {
      refetchInterval: quicklyRefetch ? 1000 : undefined,
      refetchOnWindowFocus: true
    }
  )
}

