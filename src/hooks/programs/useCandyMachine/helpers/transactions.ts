import { Keypair, Transaction, TransactionInstruction, } from '@solana/web3.js'
import { AnchorProvider, Provider } from '@project-serum/anchor'

export const sendTransaction = (
  provider: AnchorProvider,
  instructions: TransactionInstruction[],
  signers: Keypair[],
) => {
  console.log(instructions, signers)
  const transaction = new Transaction()
  transaction.add(...instructions)

  return provider.sendAndConfirm(transaction, signers)
}

