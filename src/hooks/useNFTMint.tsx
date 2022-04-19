import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../contexts/modal'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import {  Progress } from 'antd'
import styled from 'styled-components'
import CONFT_API from '../apis/co-nft'
import { useHistory } from 'react-router-dom'
import { NFTAttributesData } from '../types/coNFT'
import { Alert } from '@mui/material'
import { Keypair } from '@solana/web3.js'
import useCandyMachine from './programs/useCandyMachine'

const Message = styled.div`
  text-align: center;
  font-size: 28px;
  color: #ffffff;
`

const WaitForMinting:React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          return prev
        }

        return prev + 1
      })
    }, 100)

    return () => {
      clearInterval(interval)
    }

  },[])

  return (
    <div>
      <p>Waiting transfer transaction finished. This will take about several seconds...</p>
      <Progress percent={progress} />
    </div>
  )
}

const MODAL_CONTENT = {
  kitNotEnough: (
    <Message> Choose at least a body, cloths, pants and background </Message>
  ),
  unconnectedToWallet: (
    <Alert severity="error">This is an error alert — check it out!</Alert>

  ),

  checkStorage: (
    <Message> Checking storage, please wait... </Message>
  ),

  nftLock : (
    <Message>Oops, it seems that the nft is gone already</Message>
  ),

  waitForMinting: <WaitForMinting />,

  transferComplete: (
    <Message>
      Create Complete!
    </Message>
  ),

  waitForTransfer:(
    <Message>
      ✅ Please approve transfer transaction in your wallet
    </Message>
  ),

  mintSuccess: (
    <Message>
      Transform successfully! Please wait for minting
    </Message>
  ),
  mintError: (
    <Message>
      There seems to be something wrong during loading metadata. <br />
      {/*But don&apos;t worry, you can view you NFT in your wallet.*/}
    </Message>
  ),

  opened: (
    <>
      So Hard
    </>
  )
}

const useNFTMint = () => {
  const { account } = useSolanaWeb3()

  const { mint } = useCandyMachine()

  const { openModal, configModal, closeModal } = useModal()
  const history = useHistory()

  const [message, setMessage] = useState<string>('')

  const mintNFT =  useCallback(
    async (body: any, kit: NFTAttributesData[]) => {

      console.log(body, kit)
      configModal({
        closeable:true,
        contentStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      })

      const components: number[] = []

      if (!account) {
        throw new Error('No account found')
        return
      }

      if (!body || kit.length === 0) {
        throw new Error(' Choose at least a body, cloths, pants and background ')
        return
      }

      if (!kit.some((value: any) => value?.bodyType === 'Background')) {
        throw new Error(' Choose at least a body, cloths, pants and background ')
        return
      }

      if (!kit.some((value: any) => value?.bodyType === 'Clothing')) {
        throw new Error(' Choose at least a body, cloths, pants and background ')
        return
      }

      if (!kit.some((value: any) => value?.bodyType === 'Pants')) {
        throw new Error(' Choose at least a body, cloths, pants and background ')
        return
      }

      kit.map(item => {
        if (item) {
          components.push(item?.id)
        }
      })

      console.log(components)

      const mintKeypair = Keypair.generate()

      mint(mintKeypair)
        .then(async _signature => {
          console.log(mintKeypair.publicKey.toBase58(), _signature)
        })

      // CONFT_API.core.user.saveNFT(3312, components, account.toBase58())
      //   .then(() => {
      //     history.push('/personal/home')
      //
      //   })
      //   .catch(err => {
      //     openModal(
      //       <Message>Oops! {err || err.toString()}</Message>
      //     )
      //   })

    }, [account]
  )
  return { mintNFT, message }
}

export default useNFTMint
