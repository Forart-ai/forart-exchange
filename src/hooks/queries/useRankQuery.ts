import { useQuery, UseQueryResult } from 'react-query'
import { RANK_API } from '../../apis/auth'
import { RankListItem, RankQueryRequest } from '../../types/social'

export const useRankQuery = (params: RankQueryRequest): UseQueryResult<Array<RankListItem>> => {
  return useQuery(
    ['FTA_RANK_LIST',],
    async () => {
      return await RANK_API.getFtaCreditRank(params).then((res:any) => {
        return  res.map((item: any,index: number) => ({
          rank: index + 1,
          ...item
        }))
      })
    },{
      refetchInterval: false,
      refetchOnWindowFocus: false
    }
  )
}
