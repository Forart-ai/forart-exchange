import request from '../utils/request'
import { LockNFTRequest, NftMintRequest } from '../hooks/contract/service/exchange/types'

const CONFT_API = {
  core: {
    kits: {
      getArtistAssembler(id: any) {
        return request.get(`artAssembler/artistAssembler/${id}`)
      },

      lockNft(data: LockNFTRequest) {
        return request.post('nft/create', data)
      },

      nftMint(req: NftMintRequest) {
        return request.post('nft/mint', req)
      }

    }
  }
}


export default CONFT_API
