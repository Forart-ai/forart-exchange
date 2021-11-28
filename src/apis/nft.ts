import forartRequest, { ForartApiPagingData, ForartApiResponseBody } from '../utils/request'
import { NFTDetail, NftListItem } from '../types/NFTDetail'


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
    typeChain: ChainType
    nameArtist:string

    // Below 3 is Solana-specific fields
    supply?: number
    accountOwner?: string
    nftPubKey?: string
}

export function createNFT(data: NftCreateForm) {
  return forartRequest.post<ForartApiResponseBody<any>>('/create/uri', data)
}

export function forartNftList(data: ForartNftListQueryParams) {
  return forartRequest.post<ForartApiResponseBody<ForartApiPagingData<NftListItem>>>('/query/list', data)
}

export function forartNftDetail(data: NFTDetailQueryRequest) {
  return forartRequest.post<ForartApiResponseBody<NFTDetail>>('/query/detail', data)
}


export function getNftFavoriteCount(uri: any) {
  return forartRequest.get<{ favorite: number, id: string, view: number }>(`/view/info/${uri}`)
}

