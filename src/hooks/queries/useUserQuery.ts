import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'
import useDiscordAccessToken from '../useDiscordAccessToken'
import CONFT_API from '../../apis/co-nft'

export interface BoundUser {
  userId: string,
  username: string,
  avatar?: string
  wallet: string,
  roles: string
}

const useUserQuery = (): UseQueryResult<BoundUser> => {
  const { account } = useSolanaWeb3()
  const { slowRefreshFlag } = useRefreshController()
  const discordAccessToken = useDiscordAccessToken()

  return useQuery(
    ['BoundUser', account, slowRefreshFlag, discordAccessToken],
    async () => {
      const [byWallet] = await Promise.all([
        CONFT_API.core.user.getUserQualification(account?.toBase58()),
        CONFT_API.core.user.getUserByWallet(account?.toBase58())
      ])
      return byWallet  || undefined
    },
    { keepPreviousData: false, refetchOnWindowFocus: false }
  )
}

export default useUserQuery
