import { Service } from './service'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import {
  FollowUserParams,
  ReplyPostRequest,
  ShowCoNftParams,
  StarPostRequestParam,
  UserPostListQueryParams,
  UserPostReplyListQueryParams
} from '../types/social'

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
  userSignLogin(params: {wallet: string, toSign: string, signed: string, walletInBase64:string}) {
    return Service.post('/login', params)
  },

  getUserInfo(id?: string) {
    return Service.get(`account/${id}`)
  },

  updateUserInfo(param: UserInfoParam){
    return Service.post('account/edit', param)
  },

  uploadAvatarImage(param: UploadImageParam) {
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
  },

  uploadBannerImage(param: UploadImageParam) {
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

    return Service.post('/account/banner/upload', data, config)
  }
}

export const SOCIAL_API = {
  getPostById(id?: string) {
    return Service.get(`post/${id}`)
  },
  postNft(param:ShowCoNftParams) {
    return Service.post('/post/nft', param)
  },
  getUserPostList(param: UserPostListQueryParams) {
    return Service.post('post/page', param)
  },
  StarPost(param: StarPostRequestParam) {
    return Service.post('post/star', param)
  },
  UndoStarPost(param: StarPostRequestParam) {
    return Service.post('post/star/undo', param)
  },
  ReplyPost(param: ReplyPostRequest) {
    return Service.post('post/reply/create', param)
  },
  getPostReplyList(param:UserPostReplyListQueryParams) {
    return Service.post('post/reply/page', param)

  },
  followUser(param:FollowUserParams) {
    return Service.post('follow', param)
  },

}

export const PERSONAL_API = {

  getUserFollowers(wallet: string) {
    return Service.get(`personal/followers/${wallet}`)
  },
  getUserFollows(wallet: string) {
    return Service.get(`personal/follows/${wallet}`)
  },
  getUserFollowersAndFollowCount(wallet: string) {
    return Service.get(`personal/follow/count/${wallet}`)
  }
}

