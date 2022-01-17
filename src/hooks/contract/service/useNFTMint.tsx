import React, { useCallback, useEffect, useState } from 'react'
import { mergeImage } from '../../../apis/ai'
import { b64toBlob, base64ToIPfsUri, sleep } from '../../../utils'
import { useModal } from '../../../contexts/modal'
import { useLocationQuery } from '../../useLocationQuery'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Modal, Progress } from 'antd'
import styled from 'styled-components'


type Hint = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}

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
    <>
      Please connect to Solana wallet first
    </>
  ),

  waitForTransfer: <WaitForMinting />,

  opened: (
    <>
      So Hard
    </>
  )
}


const useNFTMint = () => {

  const { account } = useSolanaWeb3()

  const { openModal, configModal, closeModal } = useModal()

  const [mintResult, setMintResult] = useState('')

  const artistId = useLocationQuery('artistId')

  const [hint, setHint] = useState<Hint>({})


  const mintNFT =  useCallback(
    async (body: any, kit: any, style: any, genName: any) => {
      configModal({
        closeable:true,
        contentStyle: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      })

      if (genName === undefined || '') {
        setHint({
          message: 'Please input the gen name',
          type: 'hint'
        })
        return
      }

      if (!account) {
        setHint({
          message: 'Please connect to Solana wallet first',
          type: 'hint'
        })
        return
      }


      await sleep(1000)

      openModal(MODAL_CONTENT.waitForTransfer)


      const obj = Object.create(null)
      for (const [k, v] of kit) {
        obj[k] = v.url
      }

      console.log(genName)

      obj.genImageName = genName
      obj.belongId = '12121212455'
      obj.artistId = artistId

      const result = await mergeImage(obj)
      const uri = await base64ToIPfsUri(b64toBlob(result.data))
      setMintResult(uri)

      await openModal( <MintResultImage mintSrc={uri} />)


      // kit.forEach((value: any, item: any) => {
      //   console.log(value)
      // })


    }, [account]
  )
  return {
    mintNFT, hint
  }
}


export default useNFTMint
