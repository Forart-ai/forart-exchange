import { useQuery, UseQueryResult } from 'react-query'

export function useStyledNFTsQuery(): UseQueryResult<Array<any>> {

  return useQuery(
    [],
    async () => {
      return await require('../../public/mock/nftStyle.json')
    }
  )
}

// import { useQuery, UseQueryResult } from 'react-query'
// import { getContentList } from '../../apis/nft'
//
// export const useStyledNFTsQuery= (params: number): UseQueryResult<Array<any>> => {
//   return useQuery(
//     ['CONTENT_NFT', params],
//     async () => {
//       return await getContentList(params)
//         .then(res => res.data.data)
//     }
//   )
// }
//

