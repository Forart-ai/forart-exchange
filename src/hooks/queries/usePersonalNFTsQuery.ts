import { ChainType, personalNftList } from '../../apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import { useWeb3React } from '@web3-react/core'


type PersonalNFTsQueryParams = {
  current?: number
  size?: number,
  searchKey?: string
  typeChain: ChainType
}

export function usePersonalNFTsQuery(params: PersonalNFTsQueryParams): UseQueryResult<Array<any>> {
  const { account } = useWeb3React()

  return useQuery(
    ['PERSONAL_NFT', params],
    async () => {

      return await personalNftList({
        ...params,
        addressOwner: account
      }).then((res:any) => res.data.data.records.map((item: any) => ({
        ...item,
        image: `https://forart.mypinata.cloud${item?.image.slice(-52)}`
      })))
    }
  )
}
