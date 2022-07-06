import { useConnectionConfig } from '../../../contexts/solana-connection-config'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { ParsedAccountData } from '@solana/web3.js'
import { useQuery } from 'react-query'
import { useRefreshController } from '../../../contexts/refresh-controller'
// @ts-ignore
import { getAssociatedTokenAddress } from '@solana/spl-token'
import useCandyMachine from '../useCandyMachine'
import { GoblinCandyMachineAddress } from '../useCandyMachine/helpers/constant'

const useGoblinWhiteListBalanceQuery = () => {
  const { account } = useSolanaWeb3()
  const { connection } = useConnectionConfig()
  const { quietRefreshFlag } = useRefreshController()
  const { program } = useCandyMachine()

  return useQuery<number | undefined>(
    ['GOBLIN_MINT_CHANCE', account?.toBase58(), quietRefreshFlag],
    async () => {
      if (!account) {
        return undefined
      }

      const candyMachine = await program.account.candyMachine.fetch(GoblinCandyMachineAddress)

      const mint = candyMachine.data.whitelistMintSettings.mint

      const ata = await getAssociatedTokenAddress(mint, account)

      const tokenAccount = await connection.getParsedAccountInfo(ata)

      if (tokenAccount.value === null) return 0

      return (tokenAccount.value.data as ParsedAccountData).parsed.info.tokenAmount.uiAmount
    }, {
      refetchOnWindowFocus: false,
      refetchInterval:false,
      keepPreviousData: true
    }
  )
}

export { useGoblinWhiteListBalanceQuery }
