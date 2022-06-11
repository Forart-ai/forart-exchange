import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import CONFT_API from '../../../apis/co-nft'

export const useUserCredit = (): UseQueryResult<any> => {
  const { account } = useSolanaWeb3()
  return useQuery(
    ['USER_CREDIT_AMOUNT', account],
    async () => {
      if (!account) return
      return await CONFT_API.core.user.getUserCredit(account?.toBase58()).then(res => res)
    },{ refetchOnWindowFocus:true }
  )
}
