import { useQuery, UseQueryResult } from 'react-query'
import { forartNftDetail, getNftFavoriteCount, NFTDetailQueryRequest } from '../../apis/nft'
import { NFTDetail } from '../../types/NFTDetail'


export const useNFTLikeQuery = (params: any): UseQueryResult<{ favorite: number, id: string, view: number }> => {
  return useQuery(
    ['NFT_LIKE', params],
    async () => {
      return await getNftFavoriteCount(params)
        .then(res => res.data)
    }
  )
}
