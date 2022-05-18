import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { Program } from '@project-serum/anchor'
import { CANDY_MACHINE_PROGRAM_ID, CANDY_MACHINE_PROGRAM_IDL, PainterCandyMachineAddress } from './helpers/constant'
import { Keypair, PublicKey } from '@solana/web3.js'
import { buildMintTransaction } from './helpers/buildMintTransaction'

const useCandyMachine = () => {
  const { provider } = useAnchorProvider()

  const program = useMemo(() => {
    return new Program(CANDY_MACHINE_PROGRAM_IDL, CANDY_MACHINE_PROGRAM_ID, provider)
  }, [provider])

  const builtMintTransaction = useCallback((mintKeypair: Keypair, candyMachineAddress: PublicKey) => {
    if (!program) {
      return Promise.reject('Program not ready')
    }

    return buildMintTransaction(program, mintKeypair, candyMachineAddress)
  }, [program])

  return {
    program, builtMintTransaction
  }
}

export default useCandyMachine
