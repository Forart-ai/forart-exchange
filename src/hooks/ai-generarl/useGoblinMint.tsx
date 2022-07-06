import useAnchorProvider from '../useAnchorProvider'
import { Keypair } from '@solana/web3.js'
import { useCallback, useMemo, useState } from 'react'
import useCandyMachine from '../programs/useCandyMachine'
import { CANDY_MACHINE_PROGRAM_ID, GoblinCandyMachineAddress } from '../programs/useCandyMachine/helpers/constant'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { CandyMachineIdl } from '../programs/useCandyMachine/idl'
import _ from 'lodash'
import { useGoblinWhiteListBalanceQuery } from '../programs/useFreeMint/useGoblinWhiteListBalanceQuery'
import { useFreeMint } from '../programs/useFreeMint'
import { useRefreshController } from '../../contexts/refresh-controller'
import { useCurrentSlotTime } from '../../web3/utils'

export type MessageType= {
  msg: string,
  color?: string
}

// Wed Jul 06 2022 00:00:00 GMT+0000
// Wed Jul 06 2022 08:00:00 GMT+0800
const PUBLIC_MINT_TIME = 1657065600

async function freeMint(props: any) {
  const { goblinWhitelistBalance, userRemainTokenCount, amountToMint, mintingChance, setLoading, setMessage, forceRefresh, buildRequestTransaction, builtMultipleMintTransactionV2, program } = props

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
      forceRefresh()
      setLoading(false)
    })
}

async function publicMint(props: any) {
  const { amountToMint, setLoading, setMessage, forceRefresh, builtMultipleMintTransactionV2, program } = props

  const txs = []
  setMessage({ msg: 'Building transactions...', color: 'white' })

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
      forceRefresh()
      setLoading(false)
    })
}

const useGoblinMint = () => {
  const { provider } = useAnchorProvider()
  const { account } = useSolanaWeb3()
  const { builtMultipleMintTransactionV2 } = useCandyMachine()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<MessageType>({ color: '', msg: '' })
  const { data: mintingChance } = useGoblinWhiteListBalanceQuery()
  const { userRemainTokenCount: { data: userRemainTokenCount } } = useFreeMint()
  const { forceRefresh } = useRefreshController()
  const currentSlotTime = useCurrentSlotTime()

  const program = useMemo(() => {
    return new Program<any>(CandyMachineIdl, CANDY_MACHINE_PROGRAM_ID, provider)
  }, [provider])

  const mintGoblin = useCallback(
    async (amountToMint: number | undefined = 1) => {
      if (!currentSlotTime) return

      setLoading(true)
      setMessage({ msg: '' })

      if (!account) {
        setLoading(false)
        setMessage({ msg: 'Please connect to a wallet first.', color: 'red' })
        return
      }

      return publicMint({ amountToMint, setLoading, setMessage, forceRefresh, builtMultipleMintTransactionV2, program })
    },
    [account, provider, mintingChance, userRemainTokenCount, currentSlotTime],
  )

  return { mintGoblin, mintingChance, loading, message }
}

export { useGoblinMint }