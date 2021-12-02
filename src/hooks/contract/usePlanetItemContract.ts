import React, { useCallback, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'ethers'
import { message } from 'antd'
import useSigner from '../useSigner'

const contractAddress = '0x36c3Fd5e4772e15716597D05BD462CB45a605fDe'


// usePlanetItemContract
const usePlanetItemContract = () => {
  const { account, library } = useWeb3React()

  const signer = useSigner()

  const contract = useMemo( ()=> {
    console.log(account, signer)

    if (!account || !signer) {
      return undefined
    }

    return new Contract(contractAddress, require('./celo/PlanetItem.json').abi, signer)
  }, [account, signer])

  const awardItem = useCallback(
    async(tokenUri: string) => {
      if (!contract) {
        message.warn('contract is not loaded')
        return
      }

      return await contract!.awardItem(account ,tokenUri)
    },
    [contract, account]
  )

  const isApprovedForAll = useCallback(
    async (owner: string, operator: string) => {
      if (!contract) {
        message.warn('contract is not loaded')
        return
      }
      return await contract!.isApprovedForAll(owner, operator)
    },
    [contract]
  )

  const setApprovalForAll = useCallback(
    async (operator: string, approved: boolean) => {
      if (!contract) {
        message.warn('contract is not loaded')
        return
      }

      return await contract!.setApprovalForAll(operator, approved)
    },
    [contract]
  )

  return {
    awardItem,
    isApprovedForAll,
    setApprovalForAll
    // contract
    // awardItem
    // set...
  }
}

export default usePlanetItemContract
