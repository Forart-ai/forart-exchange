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

export type ForartPoolsListQueryParams = {
  current?: number,
  size?: number,
}

export type NFTDetailQueryRequest = {
    uri: string
    addressContract: string | undefined
}

export type NftCreateForm = {
    uri: string
    addressCreate: string
    tokenId?: string
    typeChain: ChainType
    nameArtist:string
    hash: string

    // Below 3 is Solana-specific fields
    supply?: number
    accountOwner?: string
    nftPubKey?: string
}

export type ForartPersonalNftListQueryParams = {
    addressOwner: string| null | undefined,
    typeChain?: ChainType
    size?: number
    current?: number
    searchKey?: string
}

export function createNFT(data: NftCreateForm) {
  return forartRequest.post<ForartApiResponseBody<any>>('/marketplace/nft/create/', data)
}

export function forartNftList(data: ForartNftListQueryParams) {
  return forartRequest.post<ForartApiResponseBody<ForartApiPagingData<NftListItem>>>('/marketplace/nft/query/list', data)
}

export function forartNftDetail(data: NFTDetailQueryRequest) {
  return forartRequest.post<ForartApiResponseBody<NFTDetail>>('/marketplace/nft/detail', data)
}

export function getNftFavoriteCount(uri: any) {
  return forartRequest.get< ForartApiResponseBody<any>>(`/marketplace/view/info/${uri}`)
}

export function personalNftList(data: ForartPersonalNftListQueryParams) {
  return forartRequest.post<ForartApiResponseBody<any>>('/marketplace/nft/personal/list', data)
}

// type: 0 => style; 1 => content
export function getContentList(type: number) {
  return forartRequest.get<ForartApiResponseBody<any>>(`/style/list/${type}`)
}

export function setNftFavorite(uri: string | undefined) {
  return forartRequest.get<ForartApiResponseBody<any>>(`/marketplace/view/favorite/${uri}`)
}
