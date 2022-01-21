import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../../../contexts/modal'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Progress } from 'antd'
import styled from 'styled-components'
import { LockNFTRequest } from './exchange/types'
import useCandyMachine from '../../programs/useCandyMachine'
import { Keypair } from '@solana/web3.js'
import CONFT_API from '../../../apis/co-nft'
import { useMintResultQuery } from '../../queries/useMintResultQuery'

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


const MintResultImage: React.FC<{nft: string, account: string}> = ({ nft, account }) => {

  console.log(nft)
  const { data: nftResult } = useMintResultQuery(true, { wallet: account, nft: nft })

  console.log(nftResult)
  return (
    <>
      <Container />
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
  kitNotEnough: (
    <Message> Choose at least a body </Message>
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

      if (!body) {
        openModal(MODAL_CONTENT.kitNotEnough)
        return
      }

      const lockNFTForm: LockNFTRequest = {
        series: 3312,
        components: components,
        wallet: account.toBase58()
      }

      // await sleep(1000)

      openModal(MODAL_CONTENT.checkStorage)

      components.push(body?.id)

      for (const item of kit.values()) {
        components.push(item.id)
      }

      CONFT_API.core.kits.lockNft(lockNFTForm).then((res:any) => {
        const orderNum = res.order
        openModal(MODAL_CONTENT.waitForTransfer)

        mint(mintKeypair)
          .then(async _signature => {
            openModal(MODAL_CONTENT.mintSuccess)
            CONFT_API.core.kits.nftMint({
              order:  orderNum.toString(),
              mintKey: mintKeypair.publicKey.toBase58()
            }).then((r:any) => {
              console.log(r.nft)
              openModal(<MintResultImage nft={r.nft} account={ account.toBase58()} />)
            })
              // .then(() => sleep(1500))
              // .then(closeModal)
              .catch(() => {openModal(MODAL_CONTENT.mintError)})
          })
          .catch(e => {
            openModal(
              <Message>
                Oops! Mint failed: {e.message || e.toString()}
              </Message>
            )
          })


      }).catch(e => {
        openModal(
          <Message>Oops! {e || e.toString()}</Message>
        )
        return
      })


      // mint(mintKeypair)
      //   .then(async _signature => {
      //     console.log(mintKeypair.publicKey.toBase58(), _signature)
      //     openModal(MODAL_CONTENT.mintSuccess)
      //     console.log(order, mintKeypair.publicKey.toBase58())
      //     CONFT_API.core.kits.nftMint({
      //       order: order.toString(),
      //       mintKey: mintKeypair.publicKey.toBase58()
      //     })
      //       .then(() => sleep(1500))
      //       .then(closeModal)
      //       .catch(() => {openModal(MODAL_CONTENT.mintError)})
      //   })
      //   .catch(e => {
      //     openModal(
      //       <Message>
      //         Oops! Mint failed: {e.message || e.toString()}
      //       </Message>
      //     )
      //   })



    }, [account]
  )
  return { mintNFT }
}


export default useNFTMint
