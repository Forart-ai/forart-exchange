import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../../../contexts/modal'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Modal, Progress } from 'antd'
import styled from 'styled-components'
import { LockNFTRequest } from './exchange/types'
import useCandyMachine from '../../programs/useCandyMachine'
import { Keypair } from '@solana/web3.js'
import CONFT_API from '../../../apis/co-nft'
import { sleep } from '../../../utils'

const Message = styled.div`
  text-align: center;
  font-size: 24px;
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  
  img { 
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
`

const WaitingForTransition: React.FC = () => {
  return (
    <>
      <Modal>
        <p>s</p>
      </Modal>
    </>
  )
}

const MintResultImage: React.FC<{mintSrc: string}> = ({ mintSrc }) => {
  return (
    <>
      <Container>
        <img src={mintSrc} />
      </Container>
    </>
  )
}

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
      <p>Waiting transfer transaction finished. This will take about 8 seconds...</p>
      <Progress percent={progress} />
    </div>
  )
}

const MODAL_CONTENT = {
  unconnectedToWallet: (
    <Message>Please connect to a wallet first</Message>
  ),

  checkStorage: (
    <Message> Checking storage, please wait... </Message>
  ),

  failToLockNFT : (
    <Message>Oops, it seems that the nft is gone already</Message>
  ),

  waitForTransfer:(
    <Message>
      ✅ Please approve transfer transaction in your wallet
    </Message>
  ),

  mintSuccess: (
    <Message>
      Minted successfully! Please wait for loading metadata...
    </Message>
  ),

  mintError: (
    <Message>
      There seems to be something wrong during loading metadata. <br />
      But don&apos;t worry, you can view you NFT in your wallet.
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
  const { mint } = useCandyMachine()
  const [order, setOrder] = useState<string>('')



  const mintNFT =  useCallback(
    async (body: any, kit: any) => {
      configModal({
        closeable:true,
        contentStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      })

      const mintKeypair = Keypair.generate()
      const components: number[] = []


      if (!account) {
        openModal(MODAL_CONTENT.unconnectedToWallet)
        return
      }

      const lockNFTForm: LockNFTRequest = {
        series: 0,
        components: components,
        wallet: account.toBase58()
      }

      // await sleep(1000)

      openModal(MODAL_CONTENT.checkStorage)

      components.push(body.id)

      for (const item of kit.values()) {
        components.push(item.id)
      }



      await CONFT_API.core.kits.lockNft(lockNFTForm).then((order:any) => {
        console.log(order)
        if (order) {
          setOrder(order)
        }
        else return
      })

      openModal(MODAL_CONTENT.waitForTransfer)


      await mint(mintKeypair)
        .then(async _signature => {
          console.log(mintKeypair.publicKey.toBase58(), _signature)
          openModal(MODAL_CONTENT.mintSuccess)

          CONFT_API.core.kits.nftMint({
            order: order,
            mintKey: mintKeypair.publicKey.toBase58()
          })
            .then(() => sleep(1500))
            .then(closeModal)
            .catch(() => {openModal(MODAL_CONTENT.mintError)})
        })
        .catch(e => {
          openModal(
            <Message>
              Oops! Mint failed: {e.message || e.toString()}
            </Message>
          )
        })
    }, [account]
  )
  return {
    mintNFT
  }
}


export default useNFTMint
