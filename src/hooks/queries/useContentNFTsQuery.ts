import { useQuery, UseQueryResult } from 'react-query'

export function useContentNFTsQuery(): UseQueryResult<Array<any>> {
  return useQuery(
    [],
    async () => {
      return await require('../../public/mock/nftContent.json')
    }
  )
}
