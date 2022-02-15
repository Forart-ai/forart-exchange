import { useQuery, UseQueryResult } from 'react-query'
import { getNftFavoriteCount } from '../../apis/nft'

export const useNFTLikeQuery = (params: any): UseQueryResult<any> => {
  return useQuery(
    ['NFT_LIKE', params],
    async () => {
      return await getNftFavoriteCount(params)
        .then(res => res.data.data)
    }
  )
}
