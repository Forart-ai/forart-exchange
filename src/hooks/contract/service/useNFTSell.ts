import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'
import { FormInstance } from 'antd'
import { NFTSellForm } from '../../useSellingModal'
import useSigner from '../../useSigner'
import useNFTContract from '../usePlanetItemContract'

type Hint = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}


const useNFTSell = () => {
  const { account } = useWeb3React()

  const [hint, setHintMessage] = useState<Hint>({})

  const { isApprovedForAll, setApprovalForAll } = useNFTContract()

  const contractAddress = '0x28ADD2B5183f72Dbb1e9E1cBf1a1965B1Fb07537'

  const sellNFT = useCallback(
    async (formInstance: FormInstance<NFTSellForm>, checked: boolean) => {

      if (!checked) {
        setHintMessage({
          message: 'Please check the checkbox first.',
          type: 'error'
        })
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

      console.log(form, checked)


      if (!(await isApprovedForAll(<string>account, contractAddress))) {
        await setApprovalForAll(contractAddress, true)
      }

      console.log('approved')


      const salt = (Date.parse(new Date().toString())) / 1000









    },
    [ account, setApprovalForAll, isApprovedForAll ]
  )

  return {
    hint, sellNFT
  }
}

export default useNFTSell
