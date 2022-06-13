export type ExchangeOrderBaseAsset = {
  code: {
    baseType: number,
    extraType: number,
    contractAddr: string
  },
  value: string | number
}

export type ExchangeOrderAsset = {
  settleType: number,
  baseAsset: ExchangeOrderBaseAsset,
  extraValue: number
}

export type ExchangeOrder = {
  dir: number,
  maker: string,
  makerAsset?: ExchangeOrderAsset,
  makerAssetHash?: string,
  taker: string,
  takerAsset?: ExchangeOrderAsset,
  takerAssetHash?: string,
  fee: number,
  feeRecipient: string,
  startTime: number,
  endTime: number,
  salt: string | number
}

export type SellingOrder = {
  dir: 'buy' | 'sell';
  salt: number;
  signature: string;
  makerAssetValue: string;
  fee: number;
  maker: any;
  valueUri: any;
  makerAssetContractAddr: any;
  makerAssetSettleType: number;
  makerAssetExtraType: number;
  makerAssetBaseType: number;
  startTime: number;
  endTime: number;
  feeRecipient: number;
  makerAssetExtraValue: number
}

export type LockNFTRequest = {
  series: number,
  components: any,
  wallet: string,
  walletAvx?: string,
  mintKey: string,
  mintPrivateKey: string,
}

export type NftMintRequest = {
 nft: string,
  wallet: string,
  mintKey: string,
  series?: string | number
}

export type GetNftRequest = {
  wallet?: string,
  nft: string | undefined
}

export type CancelNftMintRequest = {
  wallet: string,
  order: string | number
}
