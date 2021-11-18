export type NFTMetadataAttribute = {
    /**
     * Key name
     */
    key: string

    /**
     * Trait name
     */
    trait_type?: string

    /**
     * Key Value
     */
    value: string
}

export type NFTMetadata = {
    /**
     * NFT Name
     */
    name?: string

    /**
     * Description of the NFT
     */
    description?: string

    /**
     * IPFS Hash to our content, this must be prefixed with "ipfs://ipfs/{{ IPFS_HASH ))"
     */
    image?: string

    /**
     * IPFS Hash just as image field, but it allows every type of multimedia files. Like mp3, mp4 etc
     */
    animation_url?: string

    attributes?: NFTMetadataAttribute[]
}
