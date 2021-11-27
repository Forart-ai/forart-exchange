import { useQuery, UseQueryResult } from 'react-query'

export function useStyledNFTsQuery(): UseQueryResult<Array<any>> {
  return useQuery(
    [],
    async () => {
      return await require('../../public/mock/nftStyle.json')
    }
  )
}
