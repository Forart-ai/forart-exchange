import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { Program } from '@project-serum/anchor'
import { CANDY_MACHINE_PROGRAM_ID } from './helpers/constant'
import { Keypair, PublicKey } from '@solana/web3.js'
import { buildMintTransaction } from './helpers/buildMintTransaction'
import { mintV2, multipleMintV2 } from './mintNFT'
import { CandyMachineIdl } from './idl'

const useCandyMachine = () => {
  const { provider } = useAnchorProvider()

  const program = useMemo(() => {
    return new Program<any>(CandyMachineIdl, CANDY_MACHINE_PROGRAM_ID, provider)
  }, [provider])

  const builtMintTransaction = useCallback((mintKeypair: Keypair, candyMachineAddress: PublicKey) => {
    return buildMintTransaction(program, mintKeypair, candyMachineAddress)
  }, [program])

  const sendMintTransaction = useCallback((mintKeypair: Keypair, candyMachineAddress: PublicKey) => {
    return mintV2(program, mintKeypair, candyMachineAddress)
  }, [program])

  const builtMultipleMintV2Transactions = useCallback((mintKeypair: Keypair[], candyMachineAddress: PublicKey) => {
    return multipleMintV2(program, mintKeypair, candyMachineAddress, true)
  }, [program])

  return {
    program, builtMintTransaction, sendMintTransaction, builtMultipleMintTransactionV2: builtMultipleMintV2Transactions
  }
}

export default useCandyMachine
