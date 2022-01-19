import { Keypair, Transaction, TransactionInstruction, } from '@solana/web3.js'
import { Provider } from '@project-serum/anchor'

export const sendTransaction = async (
  provider: Provider,
  instructions: TransactionInstruction[],
  signers: Keypair[],
) => {
  const transaction = new Transaction()
  instructions.forEach(instruction => transaction.add(instruction))

  return await provider.send(transaction, signers)
}
