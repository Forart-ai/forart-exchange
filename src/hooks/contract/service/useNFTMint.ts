import { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'


const useNFTMint = () => {

  const { account } = useWeb3React()

  const [cost, setCost] = useState<any>(0)

  const mintNFT = useCallback(
    //todo: fix any when the interface is given
    async (body: any, kit: any, style: any) => {
      console.log(body, kit, style)
      let res = 0

      kit.forEach((value: any, item: any) => {
        console.log(value.price)
        res += value.price
      })
      console.log(res)

    }, [account]
  )

  return { mintNFT }
}


export default useNFTMint
