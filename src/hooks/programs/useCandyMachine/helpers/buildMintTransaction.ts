import { Program } from '@project-serum/anchor'
import {
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY, SYSVAR_INSTRUCTIONS_PUBKEY, SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
  SYSVAR_RENT_PUBKEY, SYSVAR_SLOT_HASHES_PUBKEY,
  Transaction
} from '@solana/web3.js'
import { getAtaForMint, getCandyMachineCreator, getMasterEdition, getMetadata, getTokenWallet } from './accounts'
import {  TOKEN_METADATA_PROGRAM_ID } from './constant'
// @ts-ignore
import { createApproveInstruction, createRevokeInstruction, MintLayout, createMintToInstruction, createInitializeMintInstruction, TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token'
import { createAssociatedTokenAccountInstruction } from './instructions'
import { sendTransaction } from './transactions'
import { getBalanceLargestTokenAccount } from '../../../../utils'

export type MintResult = string

export async function buildMintTransaction(program: Program, mint: Keypair, candyMachineAddress: PublicKey): Promise<Transaction[]> {
  const minterPublicKey = program.provider.wallet.publicKey
  const toPublicKey = program.provider.wallet.publicKey

  const userTokenAccountAddress = await getTokenWallet(toPublicKey, mint.publicKey)

  const candyMachine: any = await program.account.candyMachine.fetch(candyMachineAddress)

  const remainingAccounts = []
  const signers = [mint]
  const cleanupInstructions = []

  const instructions = [
    SystemProgram.createAccount( {
      fromPubkey: minterPublicKey,
      newAccountPubkey: mint.publicKey,
      space: MintLayout.span,
      lamports: await program.provider.connection.getMinimumBalanceForRentExemption(MintLayout.span),
      programId: TOKEN_PROGRAM_ID
    }),

    createInitializeMintInstruction(mint.publicKey, 0, toPublicKey, toPublicKey),

    createAssociatedTokenAccountInstruction(
      userTokenAccountAddress,
      minterPublicKey,
      toPublicKey,
      mint.publicKey
    ),

    createMintToInstruction(
      mint.publicKey,
      userTokenAccountAddress,
      toPublicKey,
      1,
    ),
  ]

  if (candyMachine.data.whitelistMintSettings) {
    const mint = new PublicKey(candyMachine.data.whitelistMintSettings.mint)

    const whitelistToken = (await getAtaForMint(mint, toPublicKey))[0]
    remainingAccounts.push({
      pubkey: whitelistToken,
      isWritable: true,
      isSigner: false,
    })

    if (candyMachine.data.whitelistMintSettings.mode.burnEveryTime) {
      const whitelistBurnAuthority = Keypair.generate()

      remainingAccounts.push({
        pubkey: mint,
        isWritable: true,
        isSigner: false,
      })

      remainingAccounts.push({
        pubkey: whitelistBurnAuthority.publicKey,
        isWritable: false,
        isSigner: true,
      })

      signers.push(whitelistBurnAuthority)
      const exists = await program.provider.connection.getAccountInfo(whitelistToken)
      if (exists) {
        instructions.push(
          createApproveInstruction(
            whitelistToken,
            whitelistBurnAuthority.publicKey,
            toPublicKey,
            1,
          ),
        )
        cleanupInstructions.push(
          createRevokeInstruction(whitelistToken, toPublicKey),
        )
      }
    }
  }

  let tokenAccount
  if (candyMachine.tokenMint) {
    const transferAuthority = Keypair.generate()

    tokenAccount = await getTokenWallet(toPublicKey, candyMachine.tokenMint)

    remainingAccounts.push({
      pubkey: tokenAccount,
      isWritable: true,
      isSigner: false
    })

    remainingAccounts.push({
      pubkey: transferAuthority.publicKey,
      isWritable: false,
      isSigner: true
    })

    instructions.push(
      createApproveInstruction(
        tokenAccount,
        transferAuthority.publicKey,
        toPublicKey,
        candyMachine.data.price.toNumber(),
      ),
    )

    signers.push(transferAuthority)
    cleanupInstructions.push(createRevokeInstruction(tokenAccount, toPublicKey))
  }

  const metadataAddress = await getMetadata(mint.publicKey)
  const masterEdition = await getMasterEdition(mint.publicKey)

  const [candyMachineCreator, creatorBump] = await getCandyMachineCreator(candyMachineAddress)

  instructions.push(
    await program.instruction.mintNft(creatorBump, {
      accounts: {
        candyMachine: candyMachineAddress,
        candyMachineCreator,
        payer: minterPublicKey,
        wallet: candyMachine.wallet,
        mint: mint.publicKey,
        metadata: metadataAddress,
        masterEdition,
        mintAuthority: minterPublicKey,
        updateAuthority: toPublicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        clock: SYSVAR_CLOCK_PUBKEY,
        recentBlockhashes: SYSVAR_SLOT_HASHES_PUBKEY,
        instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY,
      },
      remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined,
    }),
  )

  const feePayer = program.provider.wallet.publicKey
  const recentBlockhash = (await program.provider.connection.getLatestBlockhash()).blockhash

  const transaction = new Transaction({ feePayer, recentBlockhash })
  transaction.add(...instructions)
  transaction.sign(...signers)

  const cleanUpTransaction = new Transaction({ feePayer, recentBlockhash })
  cleanUpTransaction.add(...cleanupInstructions)

  return [
    transaction,
    cleanUpTransaction
  ]
}
