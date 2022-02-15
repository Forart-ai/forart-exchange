import { useQuery, UseQueryResult } from 'react-query'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useRefreshController } from '../../contexts/refresh-controller'

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

  return useQuery(
    ['BoundUser', account, slowRefreshFlag],
    async () => {
      return undefined
    }
  )
}

export default useUserQuery
