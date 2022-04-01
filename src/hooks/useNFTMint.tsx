import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../contexts/modal'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import {  Progress } from 'antd'
import styled from 'styled-components'
import CONFT_API from '../apis/co-nft'
import { useHistory } from 'react-router-dom'
import { NFTAttributesData } from '../types/coNFT'

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
    <Message>Please connect to a wallet first</Message>
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

  const { openModal, configModal, closeModal } = useModal()
  const history = useHistory()

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
        openModal(MODAL_CONTENT.unconnectedToWallet)
        return
      }

      if (!body || kit.length === 0) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      if (!kit.some((value: any) => value?.bodyType === 'Background')) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      if (!kit.some((value: any) => value?.bodyType === 'Clothing')) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      if (!kit.some((value: any) => value?.bodyType === 'Pants')) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      components.push(body?.id)

      kit.map(item => {
        if (item) {
          components.push(item?.id)
        }
      })

      console.log(components)

      CONFT_API.core.user.saveNFT(3312, components, account.toBase58())
        .then(() => {
          history.push('/personal/home')

        })
        .catch(err => {
          openModal(
            <Message>Oops! {err || err.toString()}</Message>
          )
        })

    }, [account]
  )
  return { mintNFT }
}

export default useNFTMint
