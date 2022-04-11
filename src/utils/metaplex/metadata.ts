import { Connection, PublicKey } from '@solana/web3.js'
import { getMetadataAddress } from './accounts'

import { programs } from '@metaplex/js'
import axios from 'axios'

const {
  metadata: { Metadata }
} = programs

export interface Creator {
  address: string
  verified: number
  share: number
}

export interface Owner {
  _bn: string
}

export interface Attribute {
  trait_type: string
  value: string
}

export interface MetaplexMetadataAccountDataCore {
  attributes: Attribute[]
  collection: { name: string, family: string }
  description: string
  image: string
  name: string
  properties: { files: Array<unknown>, category: string, creators: Array<unknown> }
  seller_fee_basis_points: number
  symbol: string
}

export interface MetaplexMetadataAccount {
  pubkey: string
  info: Info
  data: programs.metadata.MetadataData
}

export interface Info {
  executable: boolean
  owner: Owner
  lamports: number
  data: {
    type: string
    data: number[]
  }
}

export type MetadataResult = {
  mint: PublicKey
  address: PublicKey
  creators: programs.metadata.Creator[] | null
  data: MetaplexMetadataAccountDataCore | null
  account: MetaplexMetadataAccount | undefined
}

export const loadMetadata = async (connection: Connection, mintPublicKey: PublicKey): Promise<MetadataResult | undefined> => {
  const metadataAddress = await getMetadataAddress(mintPublicKey)

  const metaplexMetadataAccount: MetaplexMetadataAccount | undefined = await Metadata.load(
    connection,
    metadataAddress.toBase58(),
  )
    .then(r => r as unknown as MetaplexMetadataAccount)
    .catch(() => undefined)

  if (!metaplexMetadataAccount) {
    return undefined
  }

  const { uri, creators } = metaplexMetadataAccount.data.data

  const data = await axios.get<MetaplexMetadataAccountDataCore>(uri).then(r => r.data).catch(() => null)

  return {
    address: metadataAddress,
    mint: mintPublicKey,
    creators,
    data,
    account: metaplexMetadataAccount
  }
}
