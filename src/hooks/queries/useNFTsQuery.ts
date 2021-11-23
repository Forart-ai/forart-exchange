import { ForartNftListQueryParams } from '../../apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import { ForartApiPagingData } from '../../utils/request'
import { NftListItem } from '../../types/NFTDetail'

export function useNFTsQuery(params:ForartNftListQueryParams ): UseQueryResult<ForartApiPagingData<NftListItem>> {
  return useQuery(
    ['ALL',params],
    async () => {
      return await require('../../public/mock/mock.json')
    }
  )
}
