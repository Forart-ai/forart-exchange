import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../../../contexts/modal'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Modal, Progress } from 'antd'
import styled from 'styled-components'
import { LockNFTRequest } from '../../contract/service/exchange/types'
// import useCandyMachine from '../useCandyMachine'
import { Keypair } from '@solana/web3.js'
import CONFT_API from '../../../apis/co-nft'
// import { useMintResultQuery } from '../../queries/useMintResultQuery'
import { useHistory } from 'react-router-dom'
import { sleep } from '../../../utils'
import wallet from '../../../components/wallet'
// import { useConnectionConfig } from '../../../contexts/solana-connection-config'

const Message = styled.div`
  text-align: center;
  font-size: 24px;
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
  // const { mint } = useCandyMachine()
  const history = useHistory()
  // const { connection } = useConnectionConfig()

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

      if (!body || kit.size === 0) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      if (![...kit.values()].some((value: any) => value.bodyType === 'Background')) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      if (![...kit.values()].some((value: any) => value.bodyType === 'Clothing')) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      if (![...kit.values()].some((value: any) => value.bodyType === 'Pants')) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      const lockNFTForm: LockNFTRequest = {
        series: 3312,
        components: components,
        wallet: account.toBase58()
      }

      // await sleep(1000)

      components.push(body?.id)

      for (const item of kit.values()) {
        components.push(item.id)
      }

      // include mint

      // CONFT_API.core.kits.lockNft(lockNFTForm).then((res:any) => {
      //   const orderNum = res.order
      //   openModal(MODAL_CONTENT.waitForTransfer)
      //
      //   mint(mintKeypair)
      //     .then(async _signature => {
      //       openModal(MODAL_CONTENT.waitForMinting, false)
      //
      //       await CONFT_API.core.kits.nftMint({
      //         order:  orderNum.toString(),
      //         mintKey: mintKeypair.publicKey.toBase58()
      //       })
      //         .then(() => {
      //           history.push('/personal/home')
      //           openModal(MODAL_CONTENT.transferComplete)
      //         })
      //         .then(() => sleep(1500))
      //         .then(closeModal)
      //         .catch(() => {openModal(MODAL_CONTENT.mintError)})
      //     })
      //     .catch(e => {
      //       CONFT_API.core.kits.cancelNFTMint({ wallet: account.toBase58(), order: orderNum })
      //         .then(() => {
      //           openModal(
      //             <Message>
      //               Oops! Mint failed: {e.message || e.toString()}
      //             </Message>
      //           )
      //         })
      //
      //     })
      //
      // }).catch(e => {
      //   openModal(
      //     <Message>Oops! {e || e.toString()}</Message>
      //   )
      //   return
      // })

      console.log(components)

      CONFT_API.core.user.saveNFT(3312, components, account.toBase58())
        .then(res => {
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
