import { useQuery, UseQueryResult } from 'react-query'
import { getArtistAssembler } from '../../apis/co-nft'


export const useArtistKitQuery = (id:any): UseQueryResult<any> => {
  return useQuery(
    ['ARTIST_KIT_LIST', id],
    async () => {
      return await getArtistAssembler(id).then(res=> res.data.data)
    }
  )
}
