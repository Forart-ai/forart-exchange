import { useQuery, UseQueryResult } from 'react-query'
import { getContentList } from '../../apis/nft'

export const useStyledNFTsQuery= (params: number): UseQueryResult<Array<any>> => {
  return useQuery(
    ['CONTENT_NFT', params],
    async () => {
      return await getContentList(params)
        .then(res => res.data.data)
    }
  )
}
