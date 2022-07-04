import useAnchorProvider from '../useAnchorProvider'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useCandyMachine from '../programs/useCandyMachine'
import { CANDY_MACHINE_PROGRAM_ID, GoblinCandyMachineAddress } from '../programs/useCandyMachine/helpers/constant'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useConnectionConfig } from '../../contexts/solana-connection-config'
import { useOwnedNFTsQuery } from '../queries/account/useOwnedNFTsQuery'
import { transactions } from '@metaplex/js'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { CandyMachineIdl } from '../programs/useCandyMachine/idl'
import _ from 'lodash'
import { useModal } from '../../contexts/modal'
import { string } from '@tensorflow/tfjs'

export type MessageType= {
  msg: string,
  color?: string
}

const useGoblinMint = () => {
  const { provider } = useAnchorProvider()
  const { account, adapter } = useSolanaWeb3()
  const { builtMultipleMintTransactionV2 } = useCandyMachine()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<MessageType>({ color: '', msg: '' })

  const program = useMemo(() => {
    return new Program<any>(CandyMachineIdl, CANDY_MACHINE_PROGRAM_ID, provider)
  }, [provider])

  const mintGoblin = useCallback(
    async (mintCounts: number) => {
      setLoading(true)

      /* pre-check */
      if (!account || !adapter) {
        setLoading(false)
        throw new Error(' Wallet unconnected ')
      }

      setMessage({ msg:'Building transactions...', color:'white' })

      const mintKeypairs:Keypair[] = _.range(mintCounts).map((o, i) => Keypair.generate())

      const txWithSigners = await builtMultipleMintTransactionV2(mintKeypairs, GoblinCandyMachineAddress)

      setMessage({ msg:'Please confirm the transaction', color:'white' } )

      const signatures = await (program.provider as AnchorProvider).sendAll(txWithSigners)
        .then(() => {
          setMessage({ msg:'Mint successfully! Check your Goblin in your wallet', color:'#50dcb5' })
        })
        .catch(er=> {
          setMessage({ msg:er.toString(), color:'#fb9526' })
          setLoading(false)
        })

      console.log(signatures)

      setLoading(false)

      return txWithSigners

    },
    [adapter,account,provider],
  )

  return {  mintGoblin, loading, message }

}

export { useGoblinMint }
