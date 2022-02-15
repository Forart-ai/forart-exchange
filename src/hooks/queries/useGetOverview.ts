import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'

export const useGetOverview = (): UseQueryResult<any> => {
  return useQuery(
    ['CONFT_OVERVIEW'],
    async () => {
      return await CONFT_API.core.kits.getOverView().then(res=>res)
    }
  )
}
