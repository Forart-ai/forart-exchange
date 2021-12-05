import { useWeb3React } from '@web3-react/core'
import useSigner from '../../useSigner'
import { useCallback } from 'react'
import { chooseOrder, completeOrder } from '../../../apis/exchange/celo'
import { toWei } from '../../../web3/utils'
import { ExchangeOrder, ExchangeOrderAsset } from './exchange/types'
import { hashExchangeOrder, hashExchangeOrderAsset } from './exchange/utils'
import { ethers } from 'ethers'
import useExchangeContract from '../useExchangeContract'


export type PurchaseByFixedPriceParams = {
  nftDetail: any
  account: string
  onAuthorized: () => void
  onSuccess: () => void
  onFailed?: () => void
}

const usePurchaseByFixedPrice = () => {
  const { account } = useWeb3React()

  const sign = useSigner()
  const { matchSingle } = useExchangeContract()

  const purchaseByFixedPrice = useCallback(
    async ({ nftDetail, account, onAuthorized, onSuccess, onFailed }:PurchaseByFixedPriceParams) => {

      if (!sign) {
        return
      }
      const buyData = (await chooseOrder({
        valueUri: nftDetail?.valueUri
      })).data.data


      const price =toWei(buyData!.makerAsset!.baseAsset!.value)

      const sellOrder: ExchangeOrder = {
        dir: 0,
        maker: nftDetail!.addressOwner,
        makerAsset: {
          settleType: 0,
          baseAsset: {
            code: {
              baseType: 3,
              extraType: nftDetail!.tokenId,
              contractAddr: '0x36c3Fd5e4772e15716597D05BD462CB45a605fDe'
            },
            value: 1
          },
          extraValue: 0
        },
        taker: '0x0000000000000000000000000000000000000000',
        takerAsset: {
          settleType: 0,
          baseAsset: {
            code: {
              baseType: 1,
              extraType: 0,
              contractAddr: '0x0000000000000000000000000000000000000000'
            },
            value: price
          },
          extraValue: 0
        },
        fee: 0,
        feeRecipient: '0x0000000000000000000000000000000000000000',
        startTime: 0,
        endTime: 0,
        salt: buyData?.salt
      }

      const makerAsset: ExchangeOrderAsset = {
        settleType: 0,
        baseAsset: {
          code: {
            baseType: 1,
            extraType: 0,
            contractAddr: '0x0000000000000000000000000000000000000000'
          },
          value: price
        },
        extraValue: 0
      }

      const takerAsset: ExchangeOrderAsset = {
        settleType: 0,
        baseAsset: {
          code: {
            baseType: 3,
            extraType: nftDetail?.tokenId,
            contractAddr: '0x36c3Fd5e4772e15716597D05BD462CB45a605fDe'
          },
          value: 1
        },
        extraValue: 0
      }

      const buyOrder: ExchangeOrder = {
        dir: 1,
        maker: account!,
        makerAsset,
        makerAssetHash: hashExchangeOrderAsset(makerAsset),
        taker: nftDetail!.addressOwner,
        takerAsset,
        takerAssetHash: hashExchangeOrderAsset(takerAsset),
        fee: 0,
        feeRecipient: '0x0000000000000000000000000000000000000000',
        startTime: 0,
        endTime: 0,
        salt: (Date.parse(new Date().toString())) / 1000
      }

      const signature = await sign.signMessage(ethers.utils.arrayify(hashExchangeOrder(buyOrder)))

      console.log(signature)

      await matchSingle(sellOrder,
        buyData.signature,
        buyOrder,
        signature,
        `${makerAsset!.baseAsset.value}`)

      await completeOrder({
        valueUri: nftDetail?.valueUri,
        addressOwner:account!
      })

      onSuccess()

    }, [account, sign, matchSingle]
  )

  return {
    purchaseByFixedPrice
  }
}

export default usePurchaseByFixedPrice
