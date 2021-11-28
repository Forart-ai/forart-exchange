import { forartNftList, ForartNftListQueryParams } from '../../apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import { ForartApiPagingData } from '../../utils/request'
import { NftListItem } from '../../types/NFTDetail'

export function useNFTsQuery(params:ForartNftListQueryParams ): UseQueryResult<ForartApiPagingData<NftListItem>> {
  return useQuery(
    ['ALL_NFTS',params],
    async () => {
      return await forartNftList(params).then(res => res)
    }
  )
}
