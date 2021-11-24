import { NFTCreateForm } from '../pages/nftCreate'
import { NFTMetadata } from '../types/NFTMetadatas'
import { getUriByIpfsHash } from './ipfs'

export function generateNftMetadata(form: NFTCreateForm): NFTMetadata {
  const { artworkName, briefIntroduction, assetIpfsHash } = form

  return {
    name: artworkName,
    description: briefIntroduction,
    image: getUriByIpfsHash(assetIpfsHash)
  }
}


export const shortenAddress = (address?: string, length = 6) => {
  return address ? `${address.substring(0, length)}...${address.slice(-length)}` : '-'
}
