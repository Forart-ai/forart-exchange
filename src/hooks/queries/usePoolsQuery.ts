import { useQuery, UseQueryResult } from 'react-query'
import { ForartApiPagingData } from '../../utils/request'
import {  ForartPoolsListQueryParams } from '../../apis/nft'
import { PoolsListData } from '../../types/coNFT'


export const usePoolsQuery = (params: ForartPoolsListQueryParams): UseQueryResult<ForartApiPagingData<PoolsListData>> => {
  return useQuery(
    ['POOLS_LIST', params],
    async () => {
      return require('../../public/mock/poolsList.json')
    }
  )
}
