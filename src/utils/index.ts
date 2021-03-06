import { NFTCreateForm } from '../pages/nftCreate'
import { NFTMetadata } from '../types/NFTMetadatas'
import { getUriByIpfsHash, pinFileToIPFS } from './ipfs'

export function generateNftMetadata(form: NFTCreateForm): NFTMetadata {
  const { artworkName, briefIntroduction, assetIpfsHash } = form
  console.log(assetIpfsHash)

  return {
    name: artworkName,
    description: briefIntroduction,
    image: getUriByIpfsHash(assetIpfsHash)
  }
}

export const shortenAddress = (address?: string, length = 6) => {
  return address ? `${address.substring(0, length)}...${address.slice(-length)}` : '-'
}

export function base64ToIPfsUri (blob: Blob) {
  return pinFileToIPFS(blob).then(res => {
    return  getUriByIpfsHash(res.data.IpfsHash)
  })

}

export function dictionaryToBase64 (dic: any) {
  const base64Array = []

  for (const key in dic) {
    base64Array.push('data:image/png;base64,' + dic[key] )
  }
  return base64Array

}

export async function sleep(milliseconds: number) {
  return await new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const b64toBlob = (b64Data: string, contentType='', sliceSize= 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

