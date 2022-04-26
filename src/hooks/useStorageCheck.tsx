import { useSolanaWeb3 } from '../contexts/solana-web3'
import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../contexts/modal'
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import { Alert, AlertTitle, Box, Snackbar, styled } from '@mui/material'
import CONFT_API from '../apis/co-nft'
import { useQuery, UseQueryResult } from 'react-query'
import CustomizeButton from '../contexts/theme/components/Button'
import MintMessageDialog from '../pages/coNft/components/modals/create/mint-message'
import useNFTMint from './useNFTMint'
import { sleep } from '../utils'
import useCandyMachine from './programs/useCandyMachine'
import { useConnectionConfig } from '../contexts/solana-connection-config'
import { NFTPreview } from '../components/nft-mint/selectedList'
import { NFTAttributesData } from '../types/coNFT'
import { Keypair } from '@solana/web3.js'
import { useRefreshController } from '../contexts/refresh-controller'
import { useHistory } from 'react-router-dom'
import { PainterCandyMachineAddress } from './programs/useCandyMachine/helpers/constant'
import AttrReviewDialog from '../pages/coNft/components/modals/create/attr-review'

export interface Minting {
  id: string
  series: number
  components: number[]
  previewUrl: string
  wallet: string
  chainStatus: string
  chainError: any
  chainNftName: any
  chainImageUri: any
  chainMetaUri: any
  chainManifestUri: any
  createTime: string
  updateTime: string
  discordId: string
  tag: string
  chainBlockMinted: boolean
  mintWallet: string
  mintDiscordId: any
  rarity: any
  rarityScore: any
  mintKey: string
  mintPrivateKey: string
  chainBlockMintCheckRetryCount: number
  mintRemainTime: number
}

const Content = styled('div')`
  width: 500px;
  max-width: 98vw;
  
  span {
    color: #999999;
    font-size: 20px;
  
  }
`

const Message = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  width: 400px;
  max-width: 98vw;
`

const Row = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  img {
    width: 200px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  
  .operation {
    width: 80%;
    display: flex;
    justify-content: space-around;
  }
`

const PreviewArea = styled('div')`
  width: 100%;
  height: 300px;
  position: relative;
`

const MintItem: React.FC<{ minting: Minting }> = ({ minting }) => {
  const { account } = useSolanaWeb3()
  const { connection } = useConnectionConfig()
  const history = useHistory()
  const { openModal, closeModal } = useModal()
  const { mintNFT } = useNFTMint()

  const [body, setBody] = useState<NFTAttributesData>()
  const [attr, setAttr] = useState<NFTAttributesData[]>()
  const [message, setMessage] = useState<string>('')
  const [notExisted, setNotExisted] = useState<boolean>(false)

  useEffect(() => {
    if (minting) {
      CONFT_API.core.nft.findComponentsById(minting.components.map(o => o.toString()))
        .then((res: any) => {
          const index = res.map((o: { bodyType: any }) => o.bodyType).indexOf('Body')
          const body = (res as any[]).splice(index, 1)
          const attr = res

          setBody(body[0])
          setAttr(attr)
        })
    }
  }, [minting?.components])

  const check = useCallback(
    async () => {
      const keypair = Keypair.fromSecretKey(new Buffer(minting.mintPrivateKey, 'base64'))
      const account = await connection.getParsedAccountInfo(keypair.publicKey)

      if (!account.value) {
        setMessage('Sorry, you haven\'t paid yet.')
        setNotExisted(true)
        return
      }

      CONFT_API.core.nft.nftMint({
        nft: minting.id,
        wallet: minting.mintWallet,
        mintKey: minting.mintKey,
        series: 1024
      }).then(() => {
        setMessage('Start minting, you can see your nft in your wallet')
        openModal(
          <Dialog title={'Congratulations!'} closeable>
            <Message>Mint successfully!</Message>
            <Box sx={{ width:'100%', display:'flex', justifyContent:'space-around', marginTop:'30px' }}>
              <CustomizeButton style={{ margin:'10px' }} variant={'contained'} onClick={() => closeModal()}> Mint Again</CustomizeButton>
              <CustomizeButton style={{ margin:'10px' }}
                variant={'contained'}
                color={'secondary'}
                onClick={() => {
                  history.push('/account')
                  closeModal()
                }}
              >
                Personal space
              </CustomizeButton>
            </Box>
          </Dialog>
        )
      }).catch(err => {
        setMessage( err.message || err.toString())
      })
    },
    [minting],
  )

  const giveUp = useCallback(
    async () => {

      CONFT_API.core.nft.nftRemove(minting.id, minting.mintWallet, minting.mintKey).then(res => {
        setMessage('Give up this order successfully, you may close this dialog now.')
        closeModal()
      })
    },
    [minting],
  )

  const handleMint = useCallback(
    () => {
      if (!body || !attr || !minting) return

      openModal(
        <AttrReviewDialog
          body={body}
          attr={attr}
          minting={minting}
          keypair={Keypair.fromSecretKey(new Buffer(minting.mintPrivateKey, 'base64'))}
        />
      )

      // return mintNFT(
      //   body,
      //   attr,
      //   ,
      //   minting
      // )

      // const keypair = Keypair.fromSecretKey(new Buffer(item.mintPrivateKey, 'base64'))
      //
      // builtMint(keypair, PainterCandyMachineAddress)
      //   .then(async _signature => {
      //     return connection.confirmTransaction(_signature)
      //   })
      //   .then(() => {
      //     setMessage('Start minting, Please wait for a moment.')
      //     CONFT_API.core.nft.nftMint({ nft: item.id, wallet: item.mintWallet, mintKey: item.mintKey })
      //       .then(() =>sleep(1500))
      //       .then(() => {
      //         setMessage('Start minting, you can see your nft in your wallet.')
      //         openModal(
      //           <Dialog title={'Congratulations!'} closeable  >
      //             <Message>Mint successfully!</Message>
      //             <Box sx={{ width:'100%', display:'flex', justifyContent:'space-around', marginTop:'30px' }}>
      //               <CustomizeButton style={{ margin:'10px' }} variant={'contained'} onClick={() => closeModal()}> Mint Again</CustomizeButton>
      //               <CustomizeButton style={{ margin:'10px' }} variant={'contained'}  color={'secondary'} onClick={() => {history.push('/account'); closeModal()}}> Personal space</CustomizeButton>
      //             </Box>
      //           </Dialog>
      //         )
      //       })
      //
      //   })
      //   .catch(console.error)

    },[mintNFT, body, attr, minting])

  return (
    <Dialog title={'An unprocessed mint was detected'} closeable >
      <Content>
        <span>Please give priority to this order</span>
        <div>
          <Row >
            <PreviewArea>
              <NFTPreview body={body} attrList={attr} />
            </PreviewArea>

            <div className={'operation'}>
              <CustomizeButton style={{ backgroundColor:'#e53935' }} onClick={() => giveUp()}  variant={'contained'}>Give up</CustomizeButton>
              <CustomizeButton  onClick={() =>handleMint()} variant={'contained'}>Pay</CustomizeButton>
              <CustomizeButton onClick={() =>check()} color={'secondary'} variant={'contained'} disabled={notExisted}>I have purchased</CustomizeButton>
            </div>

            <span> {message}</span>
          </Row>
        </div>
      </Content>
    </Dialog>
  )
}

const useMinting = (): UseQueryResult<Minting[]> => {
  const { account } = useSolanaWeb3()

  return useQuery(
    ['USER_MINTING', account],
    async () => {
      if (!account) return Promise.reject()

      return await CONFT_API.core.user.getUserMinting(account.toBase58()).then(res => res)
    }
  )
}

const useStorageCheck = () => {
  const { openModal } = useModal()
  const { data, isLoading } = useMinting()

  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return

    if (!isLoading) {
      setShown(true)

      if (data?.length) {
        openModal(<MintItem minting={data?.[0]} />)
      }
    }
  }, [data, shown, isLoading])
}

export default useStorageCheck
