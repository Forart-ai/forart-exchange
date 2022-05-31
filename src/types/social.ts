export interface ShowCoNftParams {
  wallet?: string
  nft: string | number
  previewUrl:string
}

export interface Order {
  field: string
  order: string
}

export interface UserPostListQueryParams{
  size: number
  current?: number
  orders?: Order[]
  wallet?: string
  createDay?: number
}

export interface FollowUserParams {
  follower: string,
  follow: string
}

export interface UserPostReplyListQueryParams{
  size: number
  current: number
  orders?: Order[]
  wallet?: string
  createDay?: number
  post: string,
  replyTo: string
}

export interface StarPostRequestParam {
  wallet: string,
  post: string
}

export interface ReplyPostRequest {
  wallet?: string,
  post: string,
  replyTo: string,
  wysiwyg?: string
}

export interface PostListItem {
  avatar: string
  data: any,
  id: string
  wallet: string
  username: string
  type: number
  nft: string
  wysiwyg: any
  msgCount: number
  starCount: number
  createAt: number
  createDay: number
  createTime: string
  updateTime: string
  detail: any
}

export interface ReplyListItem {
  id: string
  post: string
  replyTo: string
  replyToWallet: string
  replyToUsername: string
  wallet: string
  username: string
  avatar: string
  wysiwyg: string
  createAt: number
  createTime: string
  updateTime: string
}

