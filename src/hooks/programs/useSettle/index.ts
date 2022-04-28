import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import {  PublicKey, Signer, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js'
import { programs } from '@metaplex/js'

// @ts-ignore
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Program } from '@project-serum/anchor'
import { ForartMintIDL } from './constant/idl'
import { COLLECTION_ADDRESS, MINT_PROGRAM_ID, TICKET_MINT } from './constant'

import { Provider } from '@project-serum/common/dist/lib/provider'

const getOrCreateAssociatedTokenAccount = async (provider: Provider, mint: PublicKey, owner: PublicKey): Promise<{
  pubkey: PublicKey
  instruction?: TransactionInstruction
}> => {
  const pubkey = await getAssociatedTokenAddress(mint, owner)

  if (!(await provider.connection.getAccountInfo(pubkey))) {
    return {
      pubkey,
      instruction: await createAssociatedTokenAccountInstruction(owner, pubkey, owner, mint)
    }
  } else {
    return {
      pubkey,
    }
  }
}

const useSettle = () => {
  const { provider } = useAnchorProvider()

  const program = useMemo(() => {
    return new Program(ForartMintIDL, MINT_PROGRAM_ID, provider)
  }, [provider])

  const buildSettleTransaction = useCallback(
    async (nftMint: PublicKey): Promise<{ transaction: Transaction, signers: Signer[] }> => {
      console.log('settle for mint: ', nftMint.toBase58())

      const collection = COLLECTION_ADDRESS
      const nftOwner = program.provider.wallet.publicKey
      const ticketMint = TICKET_MINT

      const transaction = new Transaction({
        feePayer: program.provider.wallet.publicKey,
        recentBlockhash: (await program.provider.connection.getLatestBlockhash()).blockhash
      })
      const signers: Signer[] = []

      const [collectionSigner, ] = await PublicKey.findProgramAddress(
        [Buffer.from('collection_signer'), collection.toBuffer()],
        program.programId
      )

      const collectionInfo = await program.account.collection.fetchNullable(collection)
      const assetMetadata = await programs.metadata.Metadata.findByMint(program.provider.connection, nftMint)

      if (!collectionInfo) throw new Error('Failed to fetch collection info')
      if (!assetMetadata?.data?.data?.name) throw new Error('Failed to fetch asset metadata')

      const getOrCreateOwnerTicketAta = await getOrCreateAssociatedTokenAccount(provider, ticketMint, nftOwner)
      const getOrCreateAssetAta = await getOrCreateAssociatedTokenAccount(provider, nftMint, nftOwner)

      const [asset,] = await PublicKey.findProgramAddress(
        [
          Buffer.from('asset'),
          collection.toBuffer(),
          Buffer.from(assetMetadata.data.data.name),
        ],
        program.programId
      )

      const assetInfo = await program.account.asset.fetch(asset)

      if (!assetMetadata.data.data.creators) {
        throw new Error('Creators of NFT was not found')
      }

      const ownerTicketAta = getOrCreateOwnerTicketAta.pubkey
      if (getOrCreateOwnerTicketAta.instruction) {
        transaction.add(getOrCreateOwnerTicketAta.instruction)
      }

      const assetAta = getOrCreateAssetAta.pubkey
      if (getOrCreateAssetAta.instruction) {
        transaction.add(getOrCreateAssetAta.instruction)
      }

      transaction.add(
        await program.instruction.settle( {
          accounts: {
            collection, // refer to collection
            collectionSigner,// refer to collection
            asset,// refer to collection and nft name
            assetAta, // nft associated token account
            assetMetadata: assetMetadata.pubkey, // nft metadata
            rewardTicketAta: collectionInfo.rewardTicketAta, // refer to collection
            platformAddr: collectionInfo.platformAddr, // refer to collection
            systemProgram: SystemProgram.programId,
            payer: provider.wallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            coplayer:  assetInfo.coplayer, // refer to nft creator
            ownerTicketAta // current wallet ticket associated token account
          }
        })
      )

      return { transaction, signers }
    },
    [provider],
  )

  return {
    buildSettleTransaction
  }
}

export default useSettle
