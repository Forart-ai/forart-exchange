import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'
import { FormInstance } from 'antd'
import { NFTSellForm } from '../../useSellingModal'
import useSigner from '../../useSigner'
import useNFTContract from '../usePlanetItemContract'
import { ExchangeOrder, ExchangeOrderAsset, SellingOrder } from './exchange/types'
import nftDetail from '../../../pages/marketplace/nftDetail'
import { NFTDetail } from '../../../types/NFTDetail'
import { toWei } from '../../../web3/utils'
import { hashExchangeOrder, hashExchangeOrderAsset } from './exchange/utils'
import { ethers } from 'ethers'
import { sellOrder } from '../../../apis/exchange/celo'
import { useAuthorizingModal } from '../../modals/useAuthorizingModal'

type Hint = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}


const useNFTSell = () => {
  const { account } = useWeb3React()

  const [hint, setHintMessage] = useState<Hint>({})


  const sign = useSigner()

  const { isApprovedForAll, setApprovalForAll } = useNFTContract()

  const contractAddress = '0x28ADD2B5183f72Dbb1e9E1cBf1a1965B1Fb07537'

  const sellNFT = useCallback(
    async (nftDetail: NFTDetail, formInstance: FormInstance<NFTSellForm>, checked: boolean) => {

      if (!checked) {
        setHintMessage({
          message: 'Please check the checkbox first.',
          type: 'error'
        })
        return
      }

      if (!sign) {
        return
      }

      const form = await formInstance.validateFields()

      if (!form.price) {
        setHintMessage({
          message: 'Please set a price',
          type: 'hint'
        })
        return
      }

      if (!(await isApprovedForAll(<string>account, contractAddress))) {
        await setApprovalForAll(contractAddress, true)
      }


      const salt = (Date.parse(new Date().toString())) / 1000

      const markerAsset: ExchangeOrderAsset = {
        settleType: 0,
        baseAsset: {
          code: {
            baseType: 3,
            extraType: nftDetail?.tokenId,
            contractAddr:'0x36c3Fd5e4772e15716597D05BD462CB45a605fDe'
          },
          value: 1,
        },
        extraValue: 0
      }


      const takerAsset: ExchangeOrderAsset = {
        settleType: 0,
        baseAsset: {
          code: {
            baseType: 1,
            extraType: 0,
            contractAddr: '0x0000000000000000000000000000000000000000'
          },
          value: toWei(form.price)
        },
        extraValue: 0
      }


      const order: ExchangeOrder = {
        dir: 0,
        maker: account!,
        makerAssetHash: hashExchangeOrderAsset(markerAsset),
        taker: '0x0000000000000000000000000000000000000000',
        takerAssetHash: hashExchangeOrderAsset(takerAsset),
        fee: 0,
        feeRecipient: '0x0000000000000000000000000000000000000000',
        startTime: 0,
        endTime: 0,
        salt
      }


      const signature = await sign.signMessage(ethers.utils.arrayify(hashExchangeOrder(order)))


      const sellingOrder: SellingOrder = {
        dir: 'sell',
        maker: account,
        makerAssetSettleType: 0,
        makerAssetBaseType: 3,
        makerAssetExtraType: nftDetail!.tokenId,
        makerAssetContractAddr: nftDetail!.addressContract,
        makerAssetValue: form.price,
        makerAssetExtraValue: 0,
        fee: 0,
        feeRecipient: 0,
        startTime: 0,
        endTime: 0,
        valueUri: nftDetail!.valueUri,
        signature,
        salt
      }


      await sellOrder(sellingOrder).then(res => {
        console.log(res)

      })


    },
    [ account, setApprovalForAll, isApprovedForAll ]
  )

  return {
    hint, sellNFT
  }
}

export default useNFTSell
