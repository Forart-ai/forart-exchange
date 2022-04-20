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
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import { useRefreshController } from '../contexts/refresh-controller'
import { ClipLoader, FadeLoader, MoonLoader } from 'react-spinners'

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  height: 100px;
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

  transferComplete: (
    <Message>
      Create Complete!
    </Message>
  ),

  waitForTransfer:(
    <Dialog title={''} closeable>
      <Message>
        ✅ Please approve transfer transaction in your wallet
      </Message>
    </Dialog>
  ),

  waitForMinting: (
    <Dialog title={'Infos'} closeable>
      <Message> Start minting &nbsp; &nbsp; <ClipLoader  size={30} color={'white'}  /> </Message>
    </Dialog>
  ),

  mintSuccess: (
    <Dialog title={''} closeable>
      <Message>
        Transform successfully! Please wait for minting
      </Message>
    </Dialog>

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

  const { openModal } = useModal()

  const { forceRefresh } = useRefreshController()

  const { mint } = useCandyMachine()

  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')

  const mintNFT =  useCallback(
    async (body: any, kit: NFTAttributesData[]) => {

      setLoading(true)

      const components: number[] = []

      if (!account) {
        setMessage('start minting')
        // setLoading(false)
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

      setMessage('✅ Please approve transfer transaction in your wallet')

      // mint(mintKeypair)
      //   .then(async _signature => {
      //     console.log(mintKeypair.publicKey.toBase58(), _signature)
      //     openModal(MODAL_CONTENT.mintSuccess)
      //   })
      //   .then(forceRefresh)
      //   .catch(err => {
      //     openModal(
      //       <Dialog title={'Oops, Something is wrong'} closeable>
      //         <Message>Mint Failed: {err.message || err.toString()}</Message>
      //       </Dialog>
      //     )
      //   })

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
  return { mintNFT, loading, message }
}

export default useNFTMint
