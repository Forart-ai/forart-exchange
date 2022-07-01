import useAnchorProvider from '../useAnchorProvider'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useCallback, useEffect, useState } from 'react'
import useCandyMachine from '../programs/useCandyMachine'
import { GoblinCandyMachineAddress } from '../programs/useCandyMachine/helpers/constant'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useConnectionConfig } from '../../contexts/solana-connection-config'
import { useOwnedNFTsQuery } from '../queries/account/useOwnedNFTsQuery'

const useGoblinMint = () => {
  const { provider } = useAnchorProvider()
  const { account, adapter } = useSolanaWeb3()
  const { connection } = useConnectionConfig()
  const { sendMintTransaction } = useCandyMachine()
  const [loading, setLoading] = useState<boolean>(false)

  const mintGoblin = useCallback(
    async () => {

      /* pre-check */
      if (!account || !adapter) {
        setLoading(false)
        throw new Error(' Wallet unconnected ')
      }

      console.log('start minting')

      const mintKeypair = Keypair.generate()
      const signature = await sendMintTransaction(mintKeypair, GoblinCandyMachineAddress)

    },
    [adapter,account,provider],
  )

  return {  mintGoblin }

}

export { useGoblinMint }
