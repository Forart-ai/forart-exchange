import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../../../contexts/modal'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Modal, Progress } from 'antd'
import styled from 'styled-components'
import { LockNFT } from './exchange/types'
import useCandyMachine from '../../programs/useCandyMachine'
import { Keypair } from '@solana/web3.js'

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


      if (!account) {
        openModal(MODAL_CONTENT.unconnectedToWallet)
        return
      }


      // await sleep(1000)

      openModal(MODAL_CONTENT.waitForTransfer)

      const mintKeypair = Keypair.generate()

      mint(mintKeypair)
        .then(async _signature => {
          console.log(mintKeypair.publicKey.toBase58(), _signature)
          openModal(MODAL_CONTENT.mintSuccess)
        })
        .catch(e => {
          openModal(
            <Message>
              Oops! Mint failed: {e.message || e.toString()}
            </Message>
          )
        })

      // const obj = Object.create(null)

      // for (const [k, v] of kit) {
      //   arr.push(v.id)
      // }
      const components: number[] = []

      for (const item of kit.values()){
        components.push(item.id)
      }

      const lockNFTForm: LockNFT = {
        series: 0,
        components: components,
        wallet: account.toBase58()
      }

      console.log(lockNFTForm)

      // await lockNft(lockNFTForm)




      // obj.genImageName = genName
      // obj.belongId = '12121212455'
      // obj.artistId = artistId
      //
      // const result = await mergeImage(obj)
      // const uri = await base64ToIPfsUri(b64toBlob(result.data))
      // setMintResult(uri)

      // await openModal( <MintResultImage mintSrc={uri} />)


    }, [account]
  )
  return {
    mintNFT
  }
}


export default useNFTMint
