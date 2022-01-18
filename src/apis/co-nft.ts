import request from '../utils/request'
import { LockNFT } from '../hooks/contract/service/exchange/types'

export function getArtistArt() {
  return request.get('artistArt')
}

export function getArtistAssembler(id: any) {
  return request.get(`artAssembler/artistAssembler/${id}`)
}

export function mergeImage() {
  return request.post('genNftInfo/mergeImage')
}

export function lockNft(params: LockNFT) {
  return request.post('nft/create')
}
