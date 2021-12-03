import { useWeb3React } from '@web3-react/core'
import useSigner from '../../useSigner'
import { useCallback } from 'react'
import nftDetail from '../../../pages/marketplace/nftDetail'
import useNftCreate from './useNftCreate'
import { NFTDetail } from '../../../types/NFTDetail'


const useCheckBalance = () => {
  const { account } = useWeb3React()
  const sign = useSigner()

  console.log(sign)

  const checkBalance = useCallback(
    async (nftDetail: NFTDetail) => {
      const balance = await sign?.getBalance()
      console.log(balance)
      return balance

    }, [account, sign]
  )

  return {
    checkBalance
  }
}


export default useCheckBalance
