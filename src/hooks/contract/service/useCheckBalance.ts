import { useWeb3React } from '@web3-react/core'
import useSigner from '../../useSigner'
import { useCallback } from 'react'
import { NFTDetail } from '../../../types/NFTDetail'
import { toBigNumber, weiToBigNumber } from '../../../web3/utils'

const useCheckBalance = () => {
  const { account } = useWeb3React()
  const sign = useSigner()

  const checkBalance = useCallback(
    async (nftDetail: NFTDetail) => {
      // @ts-ignore
      const balance = weiToBigNumber((await sign?.getBalance())?.toString())

      return  balance.gte(toBigNumber(nftDetail?.price))

    }, [account, sign]
  )

  return {
    checkBalance
  }
}

export default useCheckBalance
