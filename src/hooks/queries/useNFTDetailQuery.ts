import { useQuery, UseQueryResult } from 'react-query'
import { forartNftDetail, NFTDetailQueryRequest } from '../../apis/nft'
import { NFTDetail } from '../../types/NFTDetail'

export const useNFTDetailQuery = (params: NFTDetailQueryRequest): UseQueryResult<NFTDetail> => {
  return useQuery(
    ['NFT_DETAIL', params],
    async () => {
      return await forartNftDetail(params)
        .then(res => res.data.data)
    }
  )
}
