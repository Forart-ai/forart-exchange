import { Keypair, Transaction, TransactionInstruction, } from '@solana/web3.js'
import { AnchorProvider, Provider } from '@project-serum/anchor'

export const sendTransaction = async (
  provider: AnchorProvider,
  instructions: TransactionInstruction[],
  signers: Keypair[],
) => {
  const transaction = new Transaction()
  transaction.add(...instructions)

  return await provider.sendAndConfirm(transaction, signers)
}

