import {
  CancelNftMintRequest,
  GetNftRequest,
  LockNFTRequest,
  NftMintRequest
} from '../hooks/contract/service/exchange/types'
import { NFTComponentRequest } from '../hooks/queries/useBodyQuery'
import { Service } from './service'
import wallet from '../components/wallet'

const CONFT_API = {
  core: {
    kits: {
      getBodyComponent(param: NFTComponentRequest){
        return Service.post('nft/component/find', param)
      },
      getArtistAssembler(id: number | string | undefined) {
        return Service.post(`nft/component/find/series/${id}`)
      },

      getNFTQuery(req: GetNftRequest) {
        return Service.post('/nft/query', req)
      },
      cancelNFTMint(req: CancelNftMintRequest) {
        return Service.post('/nft/mint/cancel', req)
      },
      getOverView(series: number | undefined) {
        return Service.get(`nft/overview/${series}`)
      }
    },
    user: {

      getStaredNft(series?: number | string, wallet?: string) {
        return Service.post('nft/stared', { series, wallet })
      },
      userSeriesVote(series: number | string, wallet: string, amount: number) {
        return Service.post('nft/promotion/series/vote', { series, wallet, amount })
      },
      getUserMinting(wallet?: string) {
        return Service.get(`nft/minting/${wallet}`)
      },
      getUserCredit(wallet?: string) {
        return Service.get(`credits/${wallet}`)
      },
      getUserCreateCredit(series: number) {
        return Service.post('/nft/credit/creation', { series })
      },
    },

    nft:{
      getNftRank(series: number | string, page: number, order: 'asc' | 'desc' | undefined , filter?: string | number, orderBy?: string) {
        return Service.post('nft/rank', { series, page, order, filter, orderBy })
      },
      starNft(series: number | string, nft: string, wallet: string) {
        return Service.post('nft/star', { series, nft, wallet })
      },
      findComponentsById(data: string[]) {
        return Service.post('nft/component/findById', data)
      },
      unstarNft(series: number | string, nft: string, wallet: string) {
        return Service.post('nft/unStar', { series, nft, wallet })
      },
      getWalletRank(series: string | number, page: number, filter?: string | number) {
        return Service.post('nft/minter/rank', { series, page, filter })
      },
      getNFTDetailById(id?: string) {
        return Service.get(`/nft/detail/${ id }`)
      },

      nftCreate(data: LockNFTRequest): Promise<{ nft: string, mintKey: string, createTime: string, remain: number }> {
        return Service.post('nft/create', data, { timeout: 5000 })
      },
      nftMint(req: NftMintRequest) {
        return Service.post('nft/mint', req)
      },
      nftRemove(nft:string, wallet: string, mintKey: string) {
        return Service.post('nft/mint/remove', { nft, wallet, mintKey })
      },
      getTimeRemain() {
        return Service.get('nft/remain')
      }

    }
  }
}

export default CONFT_API
