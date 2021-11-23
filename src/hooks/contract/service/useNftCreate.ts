import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'
import { FormInstance } from 'antd'
import { NFTCreateForm } from '../../../pages/nftCreate/index'
import { generateNftMetadata } from '../../../utils'
import { getUriByIpfsHash, pinJsonToIPFS } from '../../../utils/ipfs'
import { NftCreateForm } from '../../../apis/nft'
import useNFTContract from './useNFTContract'
import useSigner from '../../useSigner'

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
  const { awardItem } =  useNFTContract()

  const signer = useSigner()

  const createNft = useCallback(
    async (formInstance: FormInstance<NFTCreateForm>, promised: boolean) => {
      if (!signer) {
        return
      }

      if (!promised) {
        setHintMessage({
          message:'Please check the checkbox',
          type:'error'
        })
        return
      }

      const form = await formInstance.validateFields()

      const nftMetadata = generateNftMetadata(form)

      const pinResult = await pinJsonToIPFS(nftMetadata)

      if (!pinResult) { return }

      const tokenUri = getUriByIpfsHash(pinResult.IpfsHash)

      await awardItem(tokenUri)

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

      // TODO: call api
    },[account, signer]
  )


  return {
    hint, createNft
  }
}

export default useCreateNft
