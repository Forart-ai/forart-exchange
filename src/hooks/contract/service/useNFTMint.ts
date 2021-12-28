import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'


const useNFTMint = () => {

  const { account } = useWeb3React()


  const mintNFT = useCallback(
    //todo: fix any when the interface is given
    async (body: any, kit: any, style: any) => {
      console.log(body, kit,style)
    }, [account]
  )

  return { mintNFT }
}


export default useNFTMint
