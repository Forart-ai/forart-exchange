import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { PERSONAL_API } from '../../../apis/auth'
import { FollowersListItem } from '../../../types/personal'

export const useUserFollowerList = (account?: string): UseQueryResult<FollowersListItem[]> => {
  return useQuery(
    ['USER_FOLLOWERS_LIST', account],
    async () => {
      if (!account) return
      return await PERSONAL_API.getUserFollowers(account).then(res => res)
    },{
      refetchOnWindowFocus:false,
      refetchInterval:false,
      keepPreviousData: true
    }
  )
}

export const useUserFollowsList = (account?: string ): UseQueryResult<FollowersListItem[]> => {
  return useQuery(
    ['USER_FOLLOWS_LIST', account],
    async () => {
      if (!account) return
      return await PERSONAL_API.getUserFollows(account).then(res => res)
    },{
      refetchOnWindowFocus:false,
      refetchInterval:false,
      keepPreviousData: true
    }
  )
}

export const useUserFollowingCounts = (account?: string): UseQueryResult<any> => {
  return useQuery(
    ['USER_FOLLOWING_COUNT', account],
    async () => {
      if (!account) return
      return await PERSONAL_API.getUserFollowersAndFollowCount(account).then(res => res)
    },{
      refetchOnWindowFocus:false,
      refetchInterval:false
    }
  )
}
