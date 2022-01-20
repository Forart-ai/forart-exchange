import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'


export const useArtistKitQuery = (id:any): UseQueryResult<any> => {
  return useQuery(
    ['ARTIST_KIT_LIST', id],
    async () => {
      return await CONFT_API.core.kits.getArtistAssembler(id).then(res=> res.data.data)
    }
  )
}
