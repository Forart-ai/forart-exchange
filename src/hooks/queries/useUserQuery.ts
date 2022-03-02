import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'
import useDiscordAccessToken from '../useDiscordAccessToken'
import CONFT_API from '../../apis/co-nft'
import { useWeb3React } from '@web3-react/core'
import useConnectedWallet from '../useGetCurrentWallet'

const useUserQuery = (): UseQueryResult<any> => {
  // const { account } = useSolanaWeb3()
  const account = useConnectedWallet()
  const { slowRefreshFlag } = useRefreshController()
  const discordAccessToken = useDiscordAccessToken()

  return useQuery(
    ['BoundUser', account, slowRefreshFlag, discordAccessToken],
    async () => {
      const [getQualification ,byWallet] = await Promise.all([
        CONFT_API.core.user.getUserQualification(account),
        CONFT_API.core.user.getUserByWallet(account)
      ])
      return { getQualification, byWallet }
    },
    { keepPreviousData: false, refetchOnWindowFocus: false }
  )
}

export default useUserQuery
