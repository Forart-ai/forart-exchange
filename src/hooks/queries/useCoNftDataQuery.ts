import { useQuery, UseQueryResult } from 'react-query'
import { CoNFTData } from '../../types/coNFT'

export const useCoNFTDataQuery = (): UseQueryResult<CoNFTData> => {
  return useQuery(
    ['CO_NFT_DATA'],
    async () => {
      return require('../../public/mock/coNftData.json')
    }
  )
}
