import {
  CancelNftMintRequest,
  GetNftRequest,
  LockNFTRequest,
  NftMintRequest
} from '../hooks/contract/service/exchange/types'
import { NFTComponentRequest } from '../hooks/queries/useBodyQuery'
import { Service } from './service'

const CONFT_API = {
  core: {
    kits: {
      getBodyComponent(param: NFTComponentRequest){
        return Service.post('nft/component/find', param)
      },
      getArtistAssembler(id:number) {
        return Service.post(`nft/component/find/series/${id}`)
      },
      lockNft(data: LockNFTRequest) {
        return Service.post('nft/create', data)
      },

      nftMint(req: NftMintRequest) {
        return Service.post('nft/mint', req)
      },
      getNFTQuery(req: GetNftRequest) {
        return Service.post('/nft/query', req)
      },
      cancelNFTMint(req: CancelNftMintRequest) {
        return Service.post('/nft/mint/cancel', req)
      },
      getOverView() {
        return Service.get('nft/overview')
      }

    }
  }
}

export default CONFT_API
