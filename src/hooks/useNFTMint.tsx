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
import { createNFT } from '../apis/nft'
import { sleep } from '../utils'
import { useConnectionConfig } from '../contexts/solana-connection-config'

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  width: 400px;
  max-width: 98vw;
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

  const { openModal, closeModal } = useModal()

  const { forceRefresh } = useRefreshController()

  const { mint } = useCandyMachine()

  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')

  const { connection } = useConnectionConfig()

  const mintNFT =  useCallback(
    async (body: any, kit: NFTAttributesData[]) => {

      setLoading(true)

      const components: number[] = []

      if (!account) {
        throw new Error(' Wallet unconnected ')
        setLoading(false)
        return
      }

      console.log(kit)

      if ( kit.length !== 7) {
        throw new Error(' Must choose all attributes ')
        return
      }

      if ( !body) {
        throw new Error(' A body is needed')
        return
      }

      kit.map(item => {
        if (item) {
          components.push(item?.id)
        }
      })

      const a = components.concat(body.id)
      console.log(a)

      const mintKeypair = Keypair.generate()

      CONFT_API.core.nft.nftCreate({ series: 1024, components: a, wallet:account.toBase58(), mintKey: mintKeypair.publicKey.toBase58() }).then((res:any) => {
        setMessage('  Sending transaction...')
        mint(mintKeypair)
          .then(async _signature => {
            console.log(mintKeypair.publicKey.toBase58(), _signature)
            setMessage(' Transaction sent successfully! Please wait for confirming')
            return connection.confirmTransaction(_signature)
          })
          .then(() => {
            setLoading(false)
            setMessage(' Transaction confirmed. The NFT has been mint ')
          })
          .then(() => {
            CONFT_API.core.nft.nftMint({ nft: res.nft, wallet: account.toBase58(), mintKey: mintKeypair.publicKey.toBase58() })
              .then(() => closeModal())
              .then(() =>sleep(1500))
              .then(forceRefresh)
          })

          .catch(err => {
            openModal(
              <Dialog title={'Oops, Something is wrong'} closeable>
                <Message>Mint Failed: {err.message || err.toString()}</Message>
              </Dialog>
            )
            setLoading(false)

          })
      }).catch(er => {
        openModal(
          <Dialog title={'Oops, Something is wrong'} closeable>
            <Message>Mint Failed: {er.message || er.toString()}</Message>
          </Dialog>
        )
      })

      setMessage('✅ Please approve transfer transaction in your wallet')

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

    }, [account, connection]
  )
  return { mintNFT, loading, message }
}

export default useNFTMint
