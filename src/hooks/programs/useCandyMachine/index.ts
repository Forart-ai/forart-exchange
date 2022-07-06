import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { Program } from '@project-serum/anchor'
import { CANDY_MACHINE_PROGRAM_ID } from './helpers/constant'
import { Keypair, PublicKey } from '@solana/web3.js'
import { buildMintTransaction } from './helpers/buildMintTransaction'
import { mintV2, multipleMintV2 } from './mintNFT'
import { CandyMachineIdl } from './idl'
import { useQuery, UseQueryResult } from 'react-query'

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

  const candyMachineMintAmount = (candyMachineAddress: PublicKey): UseQueryResult<any> => {
    return useQuery(['MINT_AMOUNT'], async () => {
      if (!program) return
      const candyMachine: any =  await program.account.candyMachine.fetch(candyMachineAddress as PublicKey)

      return candyMachine.itemsRedeemed.toString()
    }, {
      refetchOnWindowFocus: false,
      keepPreviousData: true
    })
  }

  return {
    program, builtMintTransaction, sendMintTransaction, builtMultipleMintTransactionV2: builtMultipleMintV2Transactions, candyMachineMintAmount
  }
}

export default useCandyMachine
