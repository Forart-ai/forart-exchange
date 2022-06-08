import { useQuery, UseQueryResult } from 'react-query'
import { RANK_API } from '../../apis/auth'
import { RankQueryRequest } from '../../types/social'

export const useRankQuery = (params: RankQueryRequest): UseQueryResult<any> => {
  return useQuery(
    ['FTA_RANK_LIST',],
    async () => {
      return await RANK_API.getFtaCreditRank(params).then(res => res)
    },{
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  )
}
