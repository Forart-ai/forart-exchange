import { useQuery, UseQueryResult } from 'react-query'
import { AUTH_API, UserInfoParam } from '../../apis/auth'
import wallet from '../../components/wallet'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'

export const useGetUserInfo = (walletAccount?: string): UseQueryResult<UserInfoParam> => {
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['USER_ACCOUNT_INFO', walletAccount, quietRefreshFlag],
    async () => {
      if (!walletAccount){return }
      return await AUTH_API.getUserInfo(walletAccount).then((res: any)=> ({
        ...res ,
        avataruri: res.avataruri ? `${res.avataruri}?a=${new Date().getTime()}` : null,
        banneruri: res.banneruri ? `${res.banneruri}?a=${new Date().getTime()}` : null
      }))
      // return await AUTH_API.getUserInfo(account?.toBase58()).then((res:any) => {
      //   console.log(res, res.avataruri)})
    },{
      refetchInterval:false
    }
  )
}
