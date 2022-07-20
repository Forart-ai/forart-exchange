import {
  getAtaForMint,
  getCandyMachineCreator,
  getCollectionAuthorityRecordPDA,
  getCollectionPDA,
  getMasterEdition,
  getMetadata,
  getTokenWallet,
} from './helpers/accounts'
import { AnchorProvider, Program } from '@project-serum/anchor'

import * as SplToken from '@solana/spl-token'
import { MintLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_SLOT_HASHES_PUBKEY,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { TOKEN_METADATA_PROGRAM_ID } from './helpers/constant'

// @ts-ignore
const { createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToInstruction, createRevokeInstruction } = SplToken

type TransactionWithSigners = {
  tx: Transaction,
  signers?: Signer[]
}

export async function mintV2(program: Program, mintKeypair: Keypair, candyMachineAddress: PublicKey, collectionMint?: PublicKey): Promise<TransactionWithSigners> {
  const userPublicKey = (program.provider as AnchorProvider).wallet.publicKey
  const userTokenAccountAddress = await getTokenWallet(userPublicKey, mintKeypair.publicKey)

  const candyMachine: any =  await program.account.candyMachine.fetch(candyMachineAddress)

  const remainingAccounts = []
  const signers = [mintKeypair]
  const instructions = [
    SystemProgram.createAccount({
      fromPubkey: userPublicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: MintLayout.span,
      lamports: await (program.provider as AnchorProvider).connection.getMinimumBalanceForRentExemption(MintLayout.span),
      programId: TOKEN_PROGRAM_ID,
    }),

    createInitializeMintInstruction(
      mintKeypair.publicKey,
      0,
      userPublicKey,
      userPublicKey,
    ),
    createAssociatedTokenAccountInstruction(
      userPublicKey,
      userTokenAccountAddress,
      userPublicKey,
      mintKeypair.publicKey,
    ),
    createMintToInstruction(
      mintKeypair.publicKey,
      userTokenAccountAddress,
      userPublicKey,
      1,
    ),
  ]

  if (candyMachine.data.whitelistMintSettings) {
    const whitelistMint = new PublicKey(
      candyMachine.data.whitelistMintSettings.mint,
    )

    const whitelistTokenAccount = (await getAtaForMint(whitelistMint, userPublicKey))[0]
    remainingAccounts.push({
      pubkey: whitelistTokenAccount,
      isWritable: true,
      isSigner: false,
    })

    if (candyMachine.data.whitelistMintSettings.mode.burnEveryTime) {

      remainingAccounts.push({
        pubkey: whitelistMint,
        isWritable: true,
        isSigner: false,
      })
      remainingAccounts.push({
        pubkey: userPublicKey,
        isWritable: false,
        isSigner: true,
      })
    }
  }

  let tokenAccount
  if (candyMachine.tokenMint) {
    tokenAccount = await getTokenWallet(
      userPublicKey,
      candyMachine.tokenMint,
    )

    remainingAccounts.push({
      pubkey: tokenAccount,
      isWritable: true,
      isSigner: false,
    })
    remainingAccounts.push({
      pubkey: userPublicKey,
      isWritable: false,
      isSigner: true,
    })
  }
  const metadataAddress = await getMetadata(mintKeypair.publicKey)
  const masterEdition = await getMasterEdition(mintKeypair.publicKey)

  const [candyMachineCreator, creatorBump] = await getCandyMachineCreator(candyMachineAddress)
  instructions.push(
    await program.methods
      .mintNft(creatorBump)
      .accounts({
        candyMachine: candyMachineAddress,
        candyMachineCreator,
        payer: userPublicKey,
        wallet: candyMachine.wallet,
        mint: mintKeypair.publicKey,
        metadata: metadataAddress,
        masterEdition,
        mintAuthority: userPublicKey,
        updateAuthority: userPublicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        clock: SYSVAR_CLOCK_PUBKEY,
        recentBlockhashes: SYSVAR_SLOT_HASHES_PUBKEY,
        instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY,
      })
      .remainingAccounts(remainingAccounts.length > 0 ? remainingAccounts : [])
      .instruction()
  )

  const collectionPDA = (await getCollectionPDA(candyMachineAddress))[0]
  const collectionPDAAccount =
    await (program.provider as AnchorProvider).connection.getAccountInfo(collectionPDA)

  if (collectionPDAAccount && candyMachine.data.retainAuthority && collectionMint) {
    const collectionAuthorityRecord = (
      await getCollectionAuthorityRecordPDA(collectionMint, collectionPDA)
    )[0]

    if (collectionMint) {
      const collectionMetadata = await getMetadata(collectionMint)
      const collectionMasterEdition = await getMasterEdition(collectionMint)

      instructions.push(
        await program.methods
          .setCollectionDuringMint()
          .accounts({
            candyMachine: candyMachineAddress,
            metadata: metadataAddress,
            payer: userPublicKey,
            collectionPda: collectionPDA,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            collectionMint,
            collectionMetadata,
            collectionMasterEdition,
            authority: candyMachine.authority,
            collectionAuthorityRecord,
          })
          .instruction(),
      )
    }
  }

  const recentBlockhash = (await program.provider.connection.getLatestBlockhash()).blockhash
  const feePayer = (program.provider as AnchorProvider).wallet.publicKey

  return {
    tx: new Transaction({ recentBlockhash, feePayer }).add(...instructions),
    signers: signers
  }
}

export async function multipleMintV2(program: Program, mintKeypair: Keypair[], candyMachineAddress: PublicKey, collectionMint?: PublicKey) {
  return (
    await Promise.all(
      mintKeypair.map(keypair => (
        mintV2(program, keypair, candyMachineAddress, collectionMint)
      ))
    )
  )
}
