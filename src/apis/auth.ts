import { Service } from './service'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import { ShowCoNftParams, UserPostListQueryParams } from '../types/social'

export type UploadImageParam = {
  file: any,
  wallet?: string
}

export type UserInfoParam = {
  banneruri?: string,
  username?: string,
  avataruri?: string
  slogan?:string
  wallet?:string,
  createTime?: string,
  updateTime?: string
}

export const AUTH_API = {
  userSignLogin(params: {wallet: string, toSign: string, signed: string}) {
    return Service.post('/login', params)
  },

  getUserInfo(id?: string) {
    return Service.get(`account/${id}`)
  },

  updateUserInfo(param: UserInfoParam){
    return Service.post('account/edit', param)
  },

  uploadImage(param: UploadImageParam) {
    const data = new FormData()
    data.append('file', param.file)
    data.append('wallet', param.wallet!)

    // @ts-ignore
    const boundary = data._boundary
    const config = {
      headers:{
        'Content-Type': `multipart/form-data; boundary = ${boundary}`,
      }
    }

    return Service.post('/account/avatar/upload', data, config)
  }
}

export const SOCIAL_API = {
  postNft(param:ShowCoNftParams) {
    return Service.post('/post/nft', param)
  },
  getUserPostList(param: UserPostListQueryParams) {
    return Service.post('post/page', param)
  }
}

