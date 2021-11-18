import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'
import { FormInstance } from 'antd'
import { NFTCreateForm } from '../../../pages/nftCreate/index'
import { generateNftMetadata } from '../../../utils'
import { pinJsonToIPFS } from '../../../utils/ipfs'
import { NftCreateForm } from '../../../apis/nft'

type Hint = {
    message?: string,
    type?: 'error' | 'hint' | 'success'
}

type CreateNftAccountResult = {
    nftPubKey: string
    userAccountPubKey: string
    transactionStatus: Promise<string>
}


const useCreateNft = () => {
  const { account } = useWeb3React()
  const [hint, setHintMessage] = useState<Hint>({})


  const createNft = useCallback(
    async (formInstance: FormInstance<NFTCreateForm>, promised: boolean) => {
      if (!promised) {
        setHintMessage({
          message:'Please check the checkbox',
          type:'error'
        })
        return
      }

      const form = await formInstance.validateFields()
      console.log()
      const nftMetadata = generateNftMetadata(form)
      const pinResult = await pinJsonToIPFS(nftMetadata)

      const createForm: NftCreateForm ={
        uri: pinResult.IpfsHash,
        addressCreate: account!,
        tokenId: '',
        group: '',
        nameArtist: form.artistName,
        fee: '',
        feeRecipient: '',
        typeChain: 'Ethereum'
      }
      console.log(nftMetadata)
      console.log(createForm)

    },[account]
  )
  return {
    hint, createNft
  }
}

export default useCreateNft
