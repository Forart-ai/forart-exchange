import { useQuery, UseQueryResult } from 'react-query'
import { PoolsListData } from '../../types/coNFT'

export const useGetPoolList = (): UseQueryResult<PoolsListData> => {
  return useQuery(
    ['POOLS_LIST'],
    async () => {
      return require('../../public/mock/poolsList.json')
    }
  )
}
