import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'
import { FormInstance, message } from 'antd'
import { NFTCreateForm } from '../../../pages/nftCreate/index'
import { generateNftMetadata } from '../../../utils'
import { getUriByIpfsHash, pinJsonToIPFS } from '../../../utils/ipfs'
import { createNFT as APICreateNFT, NftCreateForm } from '../../../apis/nft'
import usePlanetItemContract from '../usePlanetItemContract'
import useSigner from '../../useSigner'
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
  const { account, library } = useWeb3React()
  const [hint, setHintMessage] = useState<Hint>({})
  const [hash, setHash] = useState('')
  const { awardItem } =  usePlanetItemContract()
  const history = useHistory()

  const signer = useSigner()


  const createNft = useCallback(
    async (formInstance: FormInstance<NFTCreateForm>, promised: boolean) => {


      if (library.network.chainId !== 44787) {
        message.warn('Please manually switch to Alfajores Test Network in Celo')
        return
      }

      if (!signer ) {
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

      setHintMessage({
        message: 'please wait, it may take a moment...',
        type: 'hint'
      })

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

      await awardItem(tokenUri).then(res => {
        setHash(res.hash)
        setHintMessage({
          message: 'Your creation request has been submitted! Waiting the transaction on chain confirmed. Please DO NOT close this page now!',
          type: 'hint'
        })
        const  createForm: NftCreateForm = {
          hash: res.hash,
          uri: pinResult.IpfsHash,
          addressCreate: account!,
          typeChain: 'Ethereum',
          nameArtist: form.artistName
        }

        APICreateNFT(createForm).then(res1=> {
          setHintMessage({
            message: 'Create successfully!',
            type: 'hint'
          })
          history.push('/marketplace')
        })
        console.log(createForm)

      })


      // const res = await APICreateNFT(createForm).then(res=> {
      //   setHintMessage({
      //     message: 'Create successfully!',
      //     type: 'hint'
      //   })
      //   // history.push('/marketplace')
      // })
      // console.log(res)

    },[account, signer]
  )


  return {
    hint, createNft
  }
}

export default useCreateNft
