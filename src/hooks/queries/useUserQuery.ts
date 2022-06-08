import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'
import useDiscordAccessToken from '../useDiscordAccessToken'
import CONFT_API from '../../apis/co-nft'
import { useLocationQuery } from '../useLocationQuery'

const useUserQuery = (): UseQueryResult<any> => {
  // const { account } = useSolanaWeb3()
  const { account } = useSolanaWeb3()
  const series = useLocationQuery('artistId')
  const { slowRefreshFlag } = useRefreshController()
  const discordAccessToken = useDiscordAccessToken()

  return useQuery(
    ['BoundUser', account, slowRefreshFlag, discordAccessToken],
    async () => {
      if (!series) {
        return
      }
      const [getQualification ,byWallet] = await Promise.all([
        // CONFT_API.core.user.getUserQualification(series, account?.toBase58()),
        // CONFT_API.core.user.getUserByWallet(account?.toBase58())
      ])
      return { getQualification, byWallet }
    },
    { keepPreviousData: false, refetchOnWindowFocus: false }
  )
}

export default useUserQuery
