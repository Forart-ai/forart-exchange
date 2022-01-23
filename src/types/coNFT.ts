export interface CoNFTData {
  totalValueStaked: number,
  slimStaked: number,
  slimLPStaked: number,
  uniqueStakers: number,
  averageAPY: number
}

export interface PoolsListData {
  artistId: any
  image: string ,
  name: string,
  describe: string,
  followers: number |string,
  mintors: number | string,
  status: string
}

export interface MintedNFTItem {
  id: string,
  series: number | string,
  components: any,
  previewUrl: string,
  wallet: string,
  chainStatus: string,
  createTime :string | number,
  updateTime: string | number,
}
