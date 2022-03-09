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
      getArtistAssembler(id:number | string | undefined) {
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
    },
    user: {
      getUserQualification(wallet? :string) {
        return wallet ? Service.get(`/nft/promotion/create/qualification/${ wallet }`) : undefined
      },
      getUserByWallet(wallet?: string) {
        return wallet ? Service.get(`/nft/promotion/discord/bind/${ wallet }`) : undefined
      },
      bindingUser(oauthToken: string, wallet: string) {
        return Service.post('/nft/promotion/discord/bind', { oauthToken, wallet })
      },
      saveNFT(series: number | string, components: number[], wallet:string) {
        return Service.post('/nft/promotion/create', { series, components, wallet })
      }
    },
    nft:{
      getNftRank(series: number | string, page: number, order?: 'asc' | 'desc', filter?: string | number) {
        return Service.post('nft/rank', { series, page, order, filter })
      }
    }
  }
}

export default CONFT_API
