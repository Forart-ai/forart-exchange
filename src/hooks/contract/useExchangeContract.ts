import { useWeb3React } from '@web3-react/core'
import { useCallback, useMemo } from 'react'
import useSigner from '../useSigner'
import { Contract } from 'ethers'
import { ExchangeOrder } from './service/exchange/types'
import { message } from 'antd'


const contractAddress = '0xad638567AE7560b75b0ee6AbCe094EEec3B76E19'

const useExchangeContract = () => {
  const { account, library } = useWeb3React()

  const signer = useSigner()

  const contract = useMemo(() => {
    if (!account || !signer) {
      return undefined
    }

    return new Contract(contractAddress, require('./celo/Exchange.json').abi, signer)
  }, [account, signer])

  const matchSingle = useCallback(
    async (sellOrder: ExchangeOrder, sellSign: string, buyOrder: ExchangeOrder, buySign: string, value: string) => {
      if (!contract) {
        message.warn('contract is not loaded')
        return
      }

      return await contract!.matchSingle(sellOrder, sellSign, buyOrder, buySign, { value })
    },
    [contract]
  )

  return {
    matchSingle
  }
}

export default useExchangeContract
