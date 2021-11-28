import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'
import { FormInstance } from 'antd'
import { NFTCreateForm } from '../../../pages/nftCreate/index'
import { generateNftMetadata } from '../../../utils'
import { getUriByIpfsHash, pinJsonToIPFS } from '../../../utils/ipfs'
import { NftCreateForm } from '../../../apis/nft'
import useNFTContract from './useNFTContract'
import useSigner from '../../useSigner'
import { createNFT as APICreateNFT } from '../../../apis/nft'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()

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

      if (!formInstance.getFieldsValue().assetIpfsHash) {
        setHintMessage({
          message: 'Please upload an artwork',
          type:'error'
        })
        return
      }

      const form = await formInstance.validateFields()

      const nftMetadata = generateNftMetadata(form)

      const pinResult = await pinJsonToIPFS(nftMetadata)

      setHintMessage({
        message: 'pinning JSON to IPFS, please wait',
        type: 'hint'
      })

      if (!pinResult) { return }

      setHintMessage({
        message: 'Pinned successful! Please confirm in your wallet...',
        type: 'hint'
      })

      const tokenUri = getUriByIpfsHash(pinResult.IpfsHash)

      await awardItem(tokenUri).then(res=> {
        setHintMessage({
          message: 'Your creation request has been submitted! Waiting the transaction on chain confirmed. Please DO NOT close this page now!',
          type: 'hint'
        })
      })

      const createForm: NftCreateForm ={
        uri: pinResult.IpfsHash,
        addressCreate: account!,
        tokenId:'',
        typeChain: 'Ethereum',
        nameArtist:form.artistName
      }

      console.log(createForm)

      const res = await APICreateNFT(createForm).then(res=> {
        setHintMessage({
          message: 'Create successfully!',
          type: 'hint'
        })
        history.push('/marketplace')
      })
      console.log(res)

    },[account, signer]
  )


  return {
    hint, createNft
  }
}

export default useCreateNft
