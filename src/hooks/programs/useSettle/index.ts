import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js'
import { actions, programs, Wallet, NodeWallet } from '@metaplex/js'

// @ts-ignore
import  { getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Program } from '@project-serum/anchor'
import { ForartMintIDL } from './constant/idl'
import { COLLECTION_ADDRESS, MINT_PROGRAM_ID, REWARD_TICKET_ATA, TICKET_MINT } from './constant'

import { createTokenAccountInstrs } from '@project-serum/common'
import { Provider } from '@project-serum/common/dist/lib/provider'

const getOrCreateTokenAccount = async (provider: Provider, mint: PublicKey, owner: PublicKey): Promise<{
  keypair: Keypair,
  instructions: TransactionInstruction[]
} | { pubkey: PublicKey }> => {
  return new Promise(resolve => {
    provider.connection.getTokenAccountsByOwner(owner, { mint })
      .then(async ( { value }) => {
        if (value?.[0]) {
          return resolve({
            pubkey: value[0].pubkey
          })
        }

        const keypair = Keypair.generate()

        const instructions = await createTokenAccountInstrs(provider, keypair.publicKey, mint, owner)

        return resolve({
          keypair,
          instructions
        })
      })
  })
}

const useSettle = () => {
  const { provider } = useAnchorProvider()

  const program = useMemo(() => {
    return new Program(ForartMintIDL, MINT_PROGRAM_ID, provider)
  }, [provider])

  const settle = useCallback(
    async (nftMint: PublicKey) => {
      const collection = COLLECTION_ADDRESS
      const nftOwner = program.provider.wallet.publicKey
      const ticketMint = TICKET_MINT
      const rewardTicketAta = REWARD_TICKET_ATA

      let assetAta: PublicKey
      let ownerTicketAta: PublicKey

      const tx = new Transaction({

      })

      const [collectionSigner, ] = await PublicKey.findProgramAddress([Buffer.from('collection_signer'), collection.toBuffer()], program.programId)
      const collectionInfo = await program.account.collection.fetch(collection)
      const assetMetadata = await programs.metadata.Metadata.findByMint(program.provider.connection, nftMint)

      const getOrCreateOwnerTicketAta = (await getOrCreateTokenAccount(provider, ticketMint, nftOwner))
      const getOrCreateAssetAta = (await getOrCreateTokenAccount(provider, nftMint, nftOwner))

      const [asset,] = await PublicKey.findProgramAddress(
        [
          Buffer.from('asset'),
          collection.toBuffer(),
          Buffer.from(assetMetadata.data.data.name),
        ],
        program.programId
      )

      if (!assetMetadata.data.data.creators) {
        throw new Error()
      }

      const coplayer = new PublicKey(
        assetMetadata.data.data.creators[assetMetadata.data.data.creators.length - 1].address
      )

      if ('instructions' in getOrCreateOwnerTicketAta) {
        ownerTicketAta = getOrCreateOwnerTicketAta.keypair.publicKey
        tx.add(...getOrCreateOwnerTicketAta.instructions)
        tx.sign(getOrCreateOwnerTicketAta.keypair)
      } else {
        ownerTicketAta = getOrCreateOwnerTicketAta.pubkey
      }

      if ('instructions' in getOrCreateAssetAta) {
        assetAta = getOrCreateAssetAta.keypair.publicKey
        tx.add(...getOrCreateAssetAta.instructions)
        tx.sign(getOrCreateAssetAta.keypair)
      } else {
        assetAta = getOrCreateAssetAta.pubkey
      }

      tx.add(
        await program.instruction.settle(assetMetadata.data.data.name, {
          accounts: {
            collection, // refer to collection
            collectionSigner,// refer to collection
            asset,// refer to collection and nft name
            assetAta, // nft associated token account
            assetMetadata: assetMetadata.pubkey, // nft metadata
            rewardTicketAta, // refer to collection
            platformAddr: collectionInfo.platformAddr, // refer to collection
            systemProgram: SystemProgram.programId,
            payer: provider.wallet.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            coplayer, // refer to nft creator
            ownerTicketAta // current wallet ticket associated token account
          }
        })
      )

      return tx
    },
    [provider],
  )

}
