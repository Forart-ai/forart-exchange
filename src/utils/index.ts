import { NFTCreateForm } from '../pages/nftCreate'
import { NFTMetadata } from '../types/NFTMetadatas'
import { getUriByIpfsHash, pinFileToIPFS } from './ipfs'
import { log } from 'util'


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

export function base64ToFormdata (blob: Blob) {
  // const data = new FormData()
  // data.append('file', blob, Date.now()+ 'jpg')
  pinFileToIPFS(blob).then(res =>
    console.log(res))






}
