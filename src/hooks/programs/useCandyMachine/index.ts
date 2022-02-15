import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { Program } from '@project-serum/anchor'
import { CANDY_MACHINE_PROGRAM_ID, CANDY_MACHINE_PROGRAM_IDL } from './helpers/constant'
import { Keypair } from '@solana/web3.js'
import { mint as mintFromCandyMachine } from './helpers/mint'

const useCandyMachine = () => {
  const provider = useAnchorProvider()

  const program = useMemo(() => {
    if (!provider) {
      return undefined
    }
    return new Program(CANDY_MACHINE_PROGRAM_IDL, CANDY_MACHINE_PROGRAM_ID, provider)
  }, [provider])

  const mint = useCallback(async (mintKeypair: Keypair) => {
    if (!program) {
      return Promise.reject('Program not ready')
    }

    return await mintFromCandyMachine(program, mintKeypair)
  }, [program])

  return {
    program, mint
  }
}

export default useCandyMachine
