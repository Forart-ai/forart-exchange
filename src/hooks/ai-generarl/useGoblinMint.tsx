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

const useGoblinMint = () => {
  const { provider } = useAnchorProvider()
  const { account, adapter } = useSolanaWeb3()
  const { connection } = useConnectionConfig()
  const { builtMultipleMintTransactionV2 } = useCandyMachine()
  const [loading, setLoading] = useState<boolean>(false)

  const program = useMemo(() => {
    return new Program<any>(CandyMachineIdl, CANDY_MACHINE_PROGRAM_ID, provider)
  }, [provider])

  const mintGoblin = useCallback(
    async (mintCounts: number) => {

      /* pre-check */
      if (!account || !adapter) {
        setLoading(false)
        throw new Error(' Wallet unconnected ')
      }

      const mintKeypairs:Keypair[] = _.range(mintCounts).map((o, i) => Keypair.generate())

      console.log(mintKeypairs)

      const txWithSigners = await builtMultipleMintTransactionV2(mintKeypairs, GoblinCandyMachineAddress)

      console.log(txWithSigners)

      const signatures = await (program.provider as AnchorProvider).sendAll(txWithSigners)

      console.log(signatures)
      // return signatures[signatures.length - 2]

      return txWithSigners

    },
    [adapter,account,provider],
  )

  return {  mintGoblin }

}

export { useGoblinMint }
