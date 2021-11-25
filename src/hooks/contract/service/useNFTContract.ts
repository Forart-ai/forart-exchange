import React, { useCallback, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'ethers'
import { message } from 'antd'
import { log } from 'util'
import useSigner from '../../useSigner'

const contractAddress = '0x36c3Fd5e4772e15716597D05BD462CB45a605fDe'

const useNFTContract = () => {
  const { account, library } = useWeb3React()

  const signer = useSigner()


  const contract = useMemo( ()=> {
    if (!account || !(signer || library)) {
      return undefined
    } else {
      return new Contract(contractAddress, require('../celo/PlanetItem.json').abi,signer || library)
    }
  }, [account, signer, library])

  const awardItem = useCallback(
    async(tokenUri: string) => {
      if (!contract || !account) {
        message.warn('contract is not loaded')
        return
      }

      return await contract!.awardItem(account ,tokenUri)
    },
    [contract, account]
  )

  return {
    awardItem
  }
}

export default useNFTContract
