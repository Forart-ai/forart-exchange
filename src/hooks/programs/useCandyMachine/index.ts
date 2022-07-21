import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { Program } from '@project-serum/anchor'
import { CANDY_MACHINE_PROGRAM_ID } from './helpers/constant'
import { Keypair, PublicKey } from '@solana/web3.js'
import { buildMintTransaction } from './helpers/buildMintTransaction'
import { mintV2, multipleMintV2 } from './mintNFT'
import { CandyMachineIdl } from './idl'
import { useQuery, UseQueryResult } from 'react-query'
// @ts-ignore
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token'

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

  const builtMultipleMintTransactionV2 = useCallback((mintKeypair: Keypair[], candyMachineAddress: PublicKey, collectionMint?: PublicKey) => {
    return multipleMintV2(program, mintKeypair, candyMachineAddress, collectionMint)
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

  const getWhitelistBalanceOfCandyMachine = useCallback(
    async (candyMachineAddress: PublicKey, user: PublicKey): Promise<number> => {
      try {
        const candyMachine = await program.account.candyMachine.fetchNullable(candyMachineAddress)

        if (!candyMachine) return 0

        const whitelistMint = new PublicKey(
          candyMachine.data.whitelistMintSettings.mint,
        )

        const ata = await getAssociatedTokenAddress(whitelistMint, user)
        const tokenAccount = await getAccount(program.provider.connection, ata)

        return Number(tokenAccount.amount)
      } catch (e) {
        console.error(e)
        return 0
      }
    },
    [program]
  )

  return {
    program,
    builtMintTransaction,
    sendMintTransaction,
    builtMultipleMintTransactionV2,
    candyMachineMintAmount,
    getWhitelistBalanceOfCandyMachine
  }
}

export default useCandyMachine
