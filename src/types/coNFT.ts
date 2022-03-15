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
  nfts: number |string,
  minters: number | string,
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
  rarity: string
  chainNftName: string
  chainNftNameTmp: string | number
  componentMetas: any
  rank: number | string
  star: number
}

