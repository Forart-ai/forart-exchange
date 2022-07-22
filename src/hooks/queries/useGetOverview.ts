import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'
import { useRefreshController } from '../../contexts/refresh-controller'

export const useGetOverview = (series: number): UseQueryResult<any> => {
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['CONFT_OVERVIEW', series,quietRefreshFlag],
    async () => {
      return await CONFT_API.core.kits.getOverView(series).then(res=>res)
    },{
      refetchInterval:false,
    }
  )
}
