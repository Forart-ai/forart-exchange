import { useConnectionConfig } from '../../../contexts/solana-connection-config'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { FREE_MINT_TOKEN_ADDRESS } from './constant'
import { ParsedAccountData } from '@solana/web3.js'
import { useQuery } from 'react-query'
import { useRefreshController } from '../../../contexts/refresh-controller'
// @ts-ignore
import { getAssociatedTokenAddress } from '@solana/spl-token'

const useGoblinWhiteList = () => {
  const { account } = useSolanaWeb3()
  const { connection } = useConnectionConfig()
  const { quietRefreshFlag } = useRefreshController()

  return useQuery<string | undefined>(['GOBLIN_MINT_CHANCE', account?.toBase58(), quietRefreshFlag], async () => {
    if (!account) {
      return undefined
    }

    const ata = await getAssociatedTokenAddress(FREE_MINT_TOKEN_ADDRESS, account)

    const tokenAccount = await connection.getParsedAccountInfo(ata)

    if (tokenAccount.value === null) return undefined

    return (tokenAccount.value.data as ParsedAccountData).parsed.info.tokenAmount.uiAmountString
  }, { refetchOnWindowFocus: true })
}

export { useGoblinWhiteList }
