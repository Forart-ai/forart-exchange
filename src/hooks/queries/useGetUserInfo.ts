import { useQuery, UseQueryResult } from 'react-query'
import { AUTH_API, UserInfoParam } from '../../apis/auth'
import wallet from '../../components/wallet'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'

export const useGetUserInfo = (): UseQueryResult<UserInfoParam> => {
  const { account } = useSolanaWeb3()
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['USER_ACCOUNT_INFO', account?.toBase58(), quietRefreshFlag],
    async () => {
      return await AUTH_API.getUserInfo(account?.toBase58()).then(res=> ({ ...res }))
    },{
      refetchOnWindowFocus:false,
      refetchInterval:false
    }
  )
}
