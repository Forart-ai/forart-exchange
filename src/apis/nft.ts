

export type ChainType = 'Ethereum' | 'Solana' | ''


export type NftCreateForm = {
    uri: string
    addressCreate: string
    tokenId: string
    group: string
    feeRecipient: string
    fee: string
    nameArtist: string
    typeChain: ChainType

    // Below 3 is Solana-specific fields
    supply?: number
    accountOwner?: string
    nftPubKey?: string
}


