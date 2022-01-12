import request from '../utils/request'

export function getArtistArt() {
  return request.get('artistArt')
}

export function getArtistAssembler(id: any) {
  return request.get(`artAssembler/artistAssembler/${id}`)
}

export function mergeImage() {
  return request.post('genNftInfo/mergeImage')
}
