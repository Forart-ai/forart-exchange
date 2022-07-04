import useAnchorProvider from '../useAnchorProvider'
import { Keypair } from '@solana/web3.js'
import { useCallback, useMemo, useState } from 'react'
import useCandyMachine from '../programs/useCandyMachine'
import { CANDY_MACHINE_PROGRAM_ID, GoblinCandyMachineAddress } from '../programs/useCandyMachine/helpers/constant'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { CandyMachineIdl } from '../programs/useCandyMachine/idl'
import _ from 'lodash'
import { useQuery } from 'react-query'
import { useGoblinWhiteListBalanceQuery } from '../programs/useFreeMint/useGoblinWhiteListBalanceQuery'
import { useFreeMint } from '../programs/useFreeMint'

export type MessageType= {
  msg: string,
  color?: string
}

const useGoblinMint = () => {
  const { provider } = useAnchorProvider()
  const { account } = useSolanaWeb3()
  const { builtMultipleMintTransactionV2 } = useCandyMachine()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<MessageType>({ color: '', msg: '' })
  const { data: goblinWhitelistBalance } = useGoblinWhiteListBalanceQuery()
  const { buildRequestTransaction, userRemainTokenCount: { data: userRemainTokenCount } } = useFreeMint()

  const mintingChance = useQuery<number | undefined>(
    ['MINT_CHANCE', goblinWhitelistBalance, userRemainTokenCount],
    async () => {
      if (goblinWhitelistBalance === undefined || userRemainTokenCount === undefined) return undefined

      return goblinWhitelistBalance + userRemainTokenCount
    }
  )

  const program = useMemo(() => {
    return new Program<any>(CandyMachineIdl, CANDY_MACHINE_PROGRAM_ID, provider)
  }, [provider])

  const mintGoblin = useCallback(
    async (amountToMint: number) => {
      setLoading(true)
      setMessage({ msg: '' })

      // Require wallet connected
      if (!account) {
        setLoading(false)
        setMessage({ msg: 'Please connect to a wallet first.', color: 'red' })
        return
      }

      // Require these data have been loaded
      if (goblinWhitelistBalance === undefined || userRemainTokenCount === undefined || mintingChance.data === undefined) {
        setLoading(false)
        setMessage({ msg: 'Data is loading, please wait....', color: 'red' })
        return
      }

      if (amountToMint > mintingChance.data) {
        setLoading(false)
        setMessage({ msg: 'You have no enough chances to mint', color: 'red' })
        return
      }

      const txs = []
      const whitelistTokenAmountToRequest = amountToMint - goblinWhitelistBalance

      setMessage({ msg: 'Building transactions...', color: 'white' })

      if (whitelistTokenAmountToRequest > 0) {
        txs.push(await buildRequestTransaction(whitelistTokenAmountToRequest))
      }

      txs.push(
        ...await builtMultipleMintTransactionV2(
          _.range(amountToMint).map(() => Keypair.generate()),
          GoblinCandyMachineAddress
        )
      )

      setMessage({ msg: 'Please confirm the transaction', color:'white' } )

      return (program.provider as AnchorProvider).sendAll(txs)
        .then(() => {
          setMessage({ msg: 'Mint successfully! Check your Goblin in your wallet', color: '#50dcb5' })
        })
        .catch(er => {
          setMessage({ msg: er.toString(), color: '#fb9526' })
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [account, provider, mintingChance, goblinWhitelistBalance, userRemainTokenCount],
  )

  return { mintGoblin, mintingChance, loading, message }
}

export { useGoblinMint }
