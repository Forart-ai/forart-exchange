import { ChainType, personalNftList } from '../../apis/nft'
import { useQuery, UseQueryResult } from 'react-query'

type PersonalNFTsQueryParams = {
  current?: number
  size?: number,
  searchKey?: string
  typeChain: ChainType
  account?: string | null
}

export function usePersonalNFTsQuery(params: PersonalNFTsQueryParams): UseQueryResult<Array<any>> {

  return useQuery(
    ['PERSONAL_NFT', params],
    async () => {

      return await personalNftList({
        ...params,
        addressOwner: params.account
      }).then((res:any) => res.data.data.records.map((item: any) => ({
        ...item,
        image: `https://forart.mypinata.cloud${item?.image.slice(-52)}`
      })))
    }
  )
}
