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


