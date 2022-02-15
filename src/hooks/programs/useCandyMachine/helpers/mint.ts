import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { Keypair, SystemProgram } from '@solana/web3.js'
import { getAtaForMint, getCandyMachineCreator, getMasterEdition, getMetadata, getTokenWallet } from './accounts'
import { CandyMachineAddress, TOKEN_METADATA_PROGRAM_ID, TOKEN_PROGRAM_ID } from './constant'
import { MintLayout, Token } from '@solana/spl-token'
import { createAssociatedTokenAccountInstruction } from './instructions'
import { sendTransaction } from './transactions'

export type MintResult = string

export async function mint(program: Program, mint: Keypair): Promise<MintResult> {
  const minterPublicKey = program.provider.wallet.publicKey
  const toPublicKey = program.provider.wallet.publicKey

  const userTokenAccountAddress = await getTokenWallet(toPublicKey, mint.publicKey)

  const candyMachine: any = await program.account.candyMachine.fetch(CandyMachineAddress)

  const remainingAccounts = []
  const signers = [mint]
  const cleanupInstructions = []
  const instructions = [
    anchor.web3.SystemProgram.createAccount( {
      fromPubkey: minterPublicKey,
      newAccountPubkey: mint.publicKey,
      space: MintLayout.span,
      lamports: await program.provider.connection.getMinimumBalanceForRentExemption(MintLayout.span),
      programId: TOKEN_PROGRAM_ID
    }),

    Token.createInitMintInstruction(TOKEN_PROGRAM_ID, mint.publicKey, 0, toPublicKey, toPublicKey),

    createAssociatedTokenAccountInstruction(
      userTokenAccountAddress,
      minterPublicKey,
      toPublicKey,
      mint.publicKey
    ),

    Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      mint.publicKey,
      userTokenAccountAddress,
      toPublicKey,
      [],
      1,
    ),
  ]

  if (candyMachine.data.whitelistMintSettings) {
    const mint = new anchor.web3.PublicKey(candyMachine.data.whitelistMintSettings.mint)

    const whitelistToken = (await getAtaForMint(mint, toPublicKey))[0]
    remainingAccounts.push({
      pubkey: whitelistToken,
      isWritable: true,
      isSigner: false,
    })

    if (candyMachine.data.whitelistMintSettings.mode.burnEveryTime) {
      const whitelistBurnAuthority = anchor.web3.Keypair.generate()

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
          Token.createApproveInstruction(
            TOKEN_PROGRAM_ID,
            whitelistToken,
            whitelistBurnAuthority.publicKey,
            toPublicKey,
            [],
            1,
          ),
        )
        cleanupInstructions.push(
          Token.createRevokeInstruction(TOKEN_PROGRAM_ID, whitelistToken, toPublicKey, []),
        )
      }
    }
  }

  let tokenAccount
  if (candyMachine.tokenMint) {
    const transferAuthority = anchor.web3.Keypair.generate()

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
      Token.createApproveInstruction(
        TOKEN_PROGRAM_ID,
        tokenAccount,
        transferAuthority.publicKey,
        toPublicKey,
        [],
        candyMachine.data.price.toNumber(),
      ),
    )

    signers.push(transferAuthority)
    cleanupInstructions.push(Token.createRevokeInstruction(TOKEN_PROGRAM_ID, tokenAccount, toPublicKey, []))
  }

  const metadataAddress = await getMetadata(mint.publicKey)
  const masterEdition = await getMasterEdition(mint.publicKey)

  const [candyMachineCreator, creatorBump] = await getCandyMachineCreator(CandyMachineAddress)

  instructions.push(
    await program.instruction.mintNft(creatorBump, {
      accounts: {
        candyMachine: CandyMachineAddress,
        candyMachineCreator,
        payer: minterPublicKey,
        //@ts-ignore
        wallet: candyMachine.wallet,
        mint: mint.publicKey,
        metadata: metadataAddress,
        masterEdition,
        mintAuthority: minterPublicKey,
        updateAuthority: toPublicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        recentBlockhashes: anchor.web3.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
        instructionSysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
      },
      remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined,
    }),
  )

  const signature = (
    await sendTransaction(program.provider, instructions, signers)
  )

  if (cleanupInstructions.length) {
    await sendTransaction(program.provider, cleanupInstructions, [])
  }

  return signature

}
