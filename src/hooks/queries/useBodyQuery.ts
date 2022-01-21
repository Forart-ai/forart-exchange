import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'

export type NFTComponentRequest = {
  series: number,
  bodyType: string
}


export const useBodyQuery = (param:NFTComponentRequest ): UseQueryResult<any> => {
  return useQuery(
    ['ARTIST_KIT_LIST', param],
    async () => {
      return await CONFT_API.core.kits.getBodyComponent(param).then(res=> res.data.data)
    }
  )
}

