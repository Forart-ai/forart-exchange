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
