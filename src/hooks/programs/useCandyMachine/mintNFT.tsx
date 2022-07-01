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
  PACKET_DATA_SIZE,
  PublicKey,
  Signer,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_SLOT_HASHES_PUBKEY,
  Transaction,
} from '@solana/web3.js'
import { CANDY_MACHINE_COLLECTION_MINT, TOKEN_METADATA_PROGRAM_ID } from './helpers/constant'

// @ts-ignore
const { createAssociatedTokenAccountInstruction, createApproveInstruction, createInitializeMintInstruction, createMintToInstruction, createRevokeInstruction } = SplToken

export async function mintV2(program: Program, mintKeypair: Keypair, candyMachineAddress: PublicKey,): Promise<string> {
  const userPublicKey = (program.provider as AnchorProvider).wallet.publicKey
  const userTokenAccountAddress = await getTokenWallet(userPublicKey, mintKeypair.publicKey)

  const candyMachine: any =  await program.account.candyMachine.fetch(candyMachineAddress)

  const remainingAccounts = []
  const signers = [mintKeypair]
  const cleanupInstructions = []
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

    const whitelistToken = (await getAtaForMint(whitelistMint, userPublicKey))[0]
    remainingAccounts.push({
      pubkey: whitelistToken,
      isWritable: true,
      isSigner: false,
    })

    if (candyMachine.data.whitelistMintSettings.mode.burnEveryTime) {
      const whitelistBurnAuthority = Keypair.generate()

      remainingAccounts.push({
        pubkey: whitelistMint,
        isWritable: true,
        isSigner: false,
      })
      remainingAccounts.push({
        pubkey: whitelistBurnAuthority.publicKey,
        isWritable: false,
        isSigner: true,
      })
      signers.push(whitelistBurnAuthority)
      const exists = await (program.provider as AnchorProvider).connection.getAccountInfo(whitelistToken)
      if (exists) {
        instructions.push(
          createApproveInstruction(
            whitelistToken,
            whitelistBurnAuthority.publicKey,
            userPublicKey,
            1,
          ),
        )
        cleanupInstructions.push(
          createRevokeInstruction(
            whitelistToken,
            userPublicKey,
          ),
        )
      }
    }
  }

  let tokenAccount
  if (candyMachine.tokenMint) {
    const transferAuthority = Keypair.generate()

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
      pubkey: transferAuthority.publicKey,
      isWritable: false,
      isSigner: true,
    })

    instructions.push(
      createApproveInstruction(
        tokenAccount,
        transferAuthority.publicKey,
        userPublicKey,
        candyMachine.data.price.toNumber(),
      ),
    )
    signers.push(transferAuthority)
    cleanupInstructions.push(
      createRevokeInstruction(
        tokenAccount,
        userPublicKey,
      ),
    )
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

  if (collectionPDAAccount && candyMachine.data.retainAuthority) {
    /* const collectionPdaData =
      (await program.account.collectionPda.fetch(collectionPDA)) as {
        mint: PublicKey;
      }*/
    const collectionMint = CANDY_MACHINE_COLLECTION_MINT
    console.log(collectionMint)
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

  const data = candyMachine.data
  const txnEstimate = 892
    + (collectionPDAAccount && data.retainAuthority ? 182 : 0)
    + (candyMachine.tokenMint ? 177 : 0)
    + (data.whitelistMintSettings ? 33 : 0)
    + (data.whitelistMintSettings?.mode?.burnEveryTime ? 145 : 0)
    + (data.gatekeeper ? 33 : 0)
    + (data.gatekeeper?.expireOnUse ? 66 : 0)

  const INIT_INSTRUCTIONS_LENGTH = 4
  const INIT_SIGNERS_LENGTH = 1

  const txWithSigners: { tx: Transaction; signers?: Signer[] }[] = []

  if (txnEstimate > PACKET_DATA_SIZE) {
    txWithSigners.push({
      tx: new Transaction().add(...instructions.splice(0, INIT_INSTRUCTIONS_LENGTH)),
      signers: signers.splice(0, INIT_SIGNERS_LENGTH)
    })
  }

  txWithSigners.push({
    tx: new Transaction().add(...instructions),
    signers: signers
  })

  txWithSigners.push({
    tx: new Transaction().add(...cleanupInstructions),
    signers: []
  })

  const signatures = await (program.provider as AnchorProvider).sendAll(txWithSigners)

  return signatures[signatures.length - 2]
}
