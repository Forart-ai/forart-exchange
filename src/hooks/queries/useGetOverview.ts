import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'

export const useGetOverview = (series: number): UseQueryResult<any> => {
  return useQuery(
    ['CONFT_OVERVIEW'],
    async () => {
      return await CONFT_API.core.kits.getOverView(series).then(res=>res)
    }
  )
}
