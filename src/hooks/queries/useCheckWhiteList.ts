import { useQuery, UseQueryResult } from 'react-query'

export const useCheckWhiteList = (): UseQueryResult<any> => {
  return useQuery(
    ['WHITELIST'],
    async () => {
      return require('../../public/mock/checkWhiteList.json')
    }
  )
}
