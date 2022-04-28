import { useQuery, UseQueryResult } from 'react-query'
import { useRefreshController } from '../../contexts/refresh-controller'
import CONFT_API from '../../apis/co-nft'

const useRemainTimeQuery = (): UseQueryResult<any> => {

  const { quietRefreshFlag } = useRefreshController()

  return useQuery(['TIME_REMAIN', quietRefreshFlag],
    async () => {
      return CONFT_API.core.nft.getTimeRemain().then(res => res)
    },{ refetchOnWindowFocus:false })
}

export default useRemainTimeQuery

