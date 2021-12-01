import { forartNftList, ForartNftListQueryParams } from '../../apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import { ForartApiPagingData } from '../../utils/request'
import { NftListItem } from '../../types/NFTDetail'

export function useNFTsQuery(params:ForartNftListQueryParams ): UseQueryResult<ForartApiPagingData<NftListItem>> {
  return useQuery(
    ['ALL_NFTS',params],
    async () => {
      return await forartNftList(params)
        .then(res => res.data.data)
        .then(pagingData => ({
          ...pagingData,
          records: pagingData.records.map((item: any) => ({
            ...item,
            name: item?.name.substring(0,13) + '..',
            image: item?.image?.slice(6) === 'ipfs:/' ? `https://forart.mypinata.cloud${item?.image?.slice(6)}` : `https://forart.mypinata.cloud${item?.image?.slice(-52)}`
          }))
        }))
    }
  )
}
