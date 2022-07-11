import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'
import { MintedNFTItem } from '../../types/coNFT'

export const useNftDetail = (id?: string): UseQueryResult<MintedNFTItem> => {
  return useQuery(
    ['CONFT_DETAIL', id],
    async () => {
      if (!id) return
      return await CONFT_API.core.nft.getNFTDetailById(id).then(res => res)

    }
  )
}
