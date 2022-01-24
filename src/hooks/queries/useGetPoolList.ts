import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'
import { ForartApiPagingData } from '../../utils/request'
import { PoolsListData } from '../../types/coNFT'

export const useGetPoolList = (): UseQueryResult<PoolsListData> => {
  return useQuery(
    ['POOLS_LIST'],
    async () => {
      return require('../../public/mock/poolsList.json')
    }
  )
}
