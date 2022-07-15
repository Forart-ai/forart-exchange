import { useSolanaWeb3 } from '../contexts/solana-web3'
import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../contexts/modal'
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import { Alert, AlertTitle, Box, Snackbar, styled } from '@mui/material'
import CONFT_API from '../apis/co-nft'
import { useQuery, UseQueryResult } from 'react-query'
import CustomizeButton from '../contexts/theme/components/Button'
import { useConnectionConfig } from '../contexts/solana-connection-config'
import { NFTPreview } from '../components/nft-mint/selectedList'
import { NFTAttributesData } from '../types/coNFT'
import { Keypair } from '@solana/web3.js'
import { useNavigate } from 'react-router-dom'
import AttrReviewDialog from '../pages/coNft/components/modals/create/attr-review'
import { useLocationQuery } from './useLocationQuery'

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
margin-top: 14px;
  }
`

const PreviewArea = styled('div')`
  width: 100%;
  height: 300px;
  position: relative;
`

const MintItem: React.FC<{ minting: Minting }> = ({ minting }) => {
  const { account:walletAccount } = useSolanaWeb3()
  const { connection } = useConnectionConfig()
  const navigate = useNavigate()
  const { openModal, closeModal } = useModal()

  const [body, setBody] = useState<NFTAttributesData>()
  const [attr, setAttr] = useState<NFTAttributesData[]>()
  const [message, setMessage] = useState<string>('')
  const [notExisted, setNotExisted] = useState<boolean>(false)

  useEffect(() => {
    if (minting ) {
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
      console.log(keypair)
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
              <CustomizeButton sx={{ margin:'10px' }} variant={'contained'} onClick={() => closeModal()}> Mint Again</CustomizeButton>
              <CustomizeButton sx={{ margin:'10px' }}
                variant={'contained'}
                color={'secondary'}
                onClick={() => {
                  navigate(`account${walletAccount?.toBase58()}`)
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
      console.log(minting)

      openModal(
        <AttrReviewDialog
          body={body}
          attr={attr}
          minting={minting}
        />
      )

    }, [body, attr, minting])

  return (
    <Dialog title={'An unprocessed mint was detected'} closeable >
      <Content>
        <span>Please give priority to this order, or wait {minting?.mintRemainTime} seconds to release stock </span>
        <div>
          <Row >
            <PreviewArea>
              <NFTPreview body={body} attrList={attr} />
            </PreviewArea>

            <div className={'operation'}>
              {/*<CustomizeButton style={{ backgroundColor:'#e53935' }} onClick={() => giveUp()}  variant={'contained'}>Give up</CustomizeButton>*/}
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
  const artistId = useLocationQuery('artistId')

  const { openModal } = useModal()
  const { data, isLoading } = useMinting()

  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown || artistId !== '1024') return

    if (!isLoading) {
      setShown(true)

      if (data?.length) {
        openModal(<MintItem minting={data?.[0]} />)
      }
    }
  }, [data, shown, isLoading])
}

export default useStorageCheck
