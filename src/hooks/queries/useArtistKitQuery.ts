import { useQuery, UseQueryResult } from 'react-query'


export const useArtistKitQuery = (): UseQueryResult<any> => {
  return useQuery(
    ['ARTIST_KIT_LIST'],
    async () => {
      return require('../../public/mock/artistKitList.json')
    }
  )
}
