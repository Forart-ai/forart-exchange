import { useQuery, UseQueryResult } from 'react-query'
import { UserDetail } from '../../types/userDetail'


export const useArtistDetailQuery = (): UseQueryResult<UserDetail> => {
  return useQuery(
    ['USER_DETAIL'],
    async () => {
      return require('../../public/mock/artistDetail.json')
    }
  )
}
