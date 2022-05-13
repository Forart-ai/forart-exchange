import { useQuery, UseQueryResult } from 'react-query'
import {  SOCIAL_API, UserInfoParam } from '../../apis/auth'
import wallet from '../../components/wallet'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'
import { PostListItem, UserPostListQueryParams } from '../../types/social'

export const usePostQuery = (params: UserPostListQueryParams): UseQueryResult<Array<PostListItem>> => {
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['USER_POST_LIST',quietRefreshFlag],
    async () => {
      return await SOCIAL_API.getUserPostList(params).then(res => res)
    },{
      refetchOnWindowFocus:false,
      refetchInterval:false
    }
  )
}
