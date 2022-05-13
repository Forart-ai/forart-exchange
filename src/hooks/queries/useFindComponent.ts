import { useQuery, UseQueryResult } from 'react-query'
import CONFT_API from '../../apis/co-nft'
import { AttributesListItem } from '../../components/attributes-item'

export type NFTComponentItem = {
    bodyType: string
    chainMeta: string,
    id: number,
    price: number,
    rarity: number,
    seriesId: string | number,
    stock: number,
    stockLimit: number,
    url: string
}

export function useFindComponent(param: string[]): UseQueryResult<NFTComponentItem[]>  {
  return useQuery(
    ['NFT_ATTR', param],
    async () => {
      param && await CONFT_API.core.nft.findComponentsById(param).then(res => res)
    }
  )
}
