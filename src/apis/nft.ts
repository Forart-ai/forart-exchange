import forartRequest, { ForartApiResponseBody } from '../utils/request'


export type ChainType = 'Ethereum' | 'Solana' | ''

export type ForartNftTransactionStatus = 0 | 1


export type ForartNftListQueryParams = {
    current?: number,
    size?: number,
    searchKey?: string,
    sortType?: 'time_stamp',
    addressContract?: string
    group?: string
    transactionStatus?: ForartNftTransactionStatus
    typeChain: ChainType
}

export type NFTDetailQueryRequest = {
    uri: string
    addressContract: string | undefined
}


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

export function createNFT(data: NftCreateForm) {
  return forartRequest.post<ForartApiResponseBody<any>>('/create/uri', data)
}




