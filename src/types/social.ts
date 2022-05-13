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
  current: number
  orders?: Order[]
  wallet?: string
  createDay?: number
}

export interface PostListItem {
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
