import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Snackbar,
  Tooltip
} from '@mui/material'
import UploadIcon from '../../assets/images/coPools/copy.png'
import { AttributesItem } from '../../components/attributes-item'
import { useFindComponent } from '../../hooks/queries/useFindComponent'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useNftDetail } from '../../hooks/queries/useNftDetail'
import CONFT_API from '../../apis/co-nft'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import { shortenAddress } from '../../utils'
import { useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import DefaultPageWrapper from '../../components/default-page-wrapper'
import styled, {  keyframes } from 'styled-components'
import html2canvas from 'html2canvas'
import Button from '@mui/material/Button'

const NFTInfo = styled('div')`
  width: 100%;
  height:fit-content;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 60px 0;
  
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    height: fit-content;
  }
`
const Wrapper = styled.div`
  background-color: rgb(13,14,45);
  height: 100%;
  width: 100%;
  min-height: 100vh;
`

const Canvas = styled.div`
  background-color: rgb(13,14,45);
  padding: 20px;
  height: 100%;
  width: 80%;
  max-width: 1870px;
  display: flex;
  flex-direction: column;
  alig-items: center;
  margin: 0 auto;

  @media screen and (max-width: 1080px) {
    width: calc(100vw - 10px)
  }

`

const LeftArea = styled('div')`
  height: 480px;
  width: 480px;
  border: 1px rgba(153, 153, 153, .6) solid;
  border-radius: 30px;
  background-color: rgba(153, 153, 153, .15);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  object-fit: contain;


  img {
    height: 90%;
    width: 90%;
    border-radius: 30px;
  }

  @media screen and (max-width: 800px) {
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
`
const RightArea = styled('div')`
  width: calc(100% - 570px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  @media screen and (max-width: 1080px) {
    width: 100%;
  }
  

  
`

const RightTopArea = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 25%;
  margin-bottom: 20px;


  
`

const TopTitle = styled('div')`
  font-family: arialBold;
  width: 100%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;


  .name {
    color: #8246F5;
  }

  @media screen and (max-width: 1080px) {
    margin-top: 10px;
    font-size: 26px;
  }
  
`

const RightBottomArea = styled('div')`
  height: 70%;
`

const Rainbow = styled('div')`
  display: flex;
  font-size: 16px;
  align-items: center;

    .wallet {
      color: #A197AA;
      margin-left: 10px;
    }
    span {
      border: 1px #EB1482 solid;
      padding: 2px 4px;
      border-radius: 5px;
      font-weight: bold;
      display: table;
      background: -webkit-linear-gradient(90deg,#EB1482 50.04%,#CD19B9 50.01%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }
`

const SeriesTitle = styled('div')`
  color: #A197AA;
  font-size: 18px;
  font-family: arialBold;
  margin-bottom: 16px;
`

const Options = styled('div')`
  display: flex;
  align-items: center;
  
  img {
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
}
  span {
    font-size: 14px;
    font-family: KronaOne-Regular; 
  }
`

export const ShineKeyFrame = keyframes`
  0% {
    background-position-x: -100%;
  }

  12% {
    background-position-x: -70%;
  }

  30%, 100% {
    background-position-x: 200%;
  }
`

const HeartContainer = styled('div')<{heartStatus?: 'up' | 'down'}>`
  display: flex;
  align-items: center;
  user-select: none;

  .heart {
    cursor: pointer;
    border-radius: 50%;
    font-size: 22px;

    //:hover {
    //  color: #ff005e;
    //  background: rgba(255, 0, 94, .3);
    //  transition-duration: 0.5s;
    //}
  }
  
  ${props => props.heartStatus === 'up' && `
  
  .heart {
     color: #8246F5
     }
  `
}

  ${props => props.heartStatus === 'down' && `
  .heart {
     color: #A197AA
     }
  `
}

  span {
    margin-right: 5px;
    font-family: Inter;
    font-size: 20px;
    color: #A197AA;
  }
`

export const LevelLabel = styled('div')<{ color: string, shine?: boolean }>`
  color: ${props => props.color.replace(/(\d)\)/, '$1, 0.9)')};
  animation: ${ShineKeyFrame} 2s infinite linear;
  ${p => p.shine ? `
    background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 65%);
    -webkit-background-clip: text;
    background-size: 60% 160%;
    background-repeat: no-repeat;
    background-position: -100% 0;
  ` : ''}
`

const CONFTDetail:React.FC = () => {
  const { account } = useSolanaWeb3()
  const { openModal } = useModal()

  const [open, setOpen] = React.useState(false)

  const nftId = useLocationQuery('id') ?? ''

  const handleCopy = (content: any) => {
    copy(content)
    setOpen(true)
  }

  const { data: nftDetail } = useNftDetail(nftId)

  const { data: a } = useFindComponent(nftDetail?.components)

  const attr = useMemo(() => {
    return a?.map((v: any) => ({
      chainMeta: JSON.parse(v.chainMeta)
    }))
  }, [ nftDetail,a])

  const [heartNum, setHeartNum] = useState<number>(nftDetail?.star ?? 0)
  const [isHeart, setIsHeart] = useState<boolean>(false)
  const [heartNft, setHeartNft] = useState<string[]>()
  const [heartStatus, setHeartStatus] = useState<'up' | 'down'>('down')

  const handleLike = useCallback((nftId: string) => {
    if (!account) {
      openModal(<WalletSelectionModal />)
      return
    }

    if (nftDetail?.series && heartStatus === 'down') {
      setIsHeart(true)
      setHeartNum(prev => prev + 1)
      setHeartStatus('up')
      console.log('down')
      CONFT_API.core.nft.starNft(nftDetail?.series, nftId, account.toBase58()).then(() => {

      })
        .catch(() => {
          setIsHeart(false)
        })
    }

    if (nftDetail?.series  && heartStatus === 'up') {
      setIsHeart(false)
      setHeartNum(prev => prev - 1)
      setHeartStatus('down')
      console.log('up')
      CONFT_API.core.nft.unstarNft(nftDetail?.series, nftId, account.toBase58()).then(() => {
      })
        .catch(() => {
          setIsHeart(false)
        })
    }

  },[account, nftDetail, heartStatus])

  useEffect(() => {

    CONFT_API.core.user.getStaredNft(nftDetail?.series, account?.toBase58()).then((res:any) => {
      setHeartNft(res)
      if (res.includes(nftDetail?.id)) {
        setHeartStatus('up')
      }
    })

    if (nftDetail){
      setHeartNum(nftDetail?.star)
    }

  },[account, nftDetail])

  const level: { label: string, color: string, shine: boolean } | undefined = useMemo(() => {
    if (nftDetail?.rarity){
      return {
        'Legend': { label: 'Legend', color: 'rgb(255,223,89)', shine: true },
        'Epic': { label: 'Epic', color: 'rgb(255,67,189)', shine: true },
        'Super Rare': { label: 'Super Rare', color: 'rgb(255,109,5)', shine: true },
        'Rare': { label: 'Rare', color: 'rgb(129,234,202)', shine: false },
        'Common': { label: 'Common', color: 'rgb(179,167,208)', shine: false }
      }[nftDetail.rarity]
    }
  }, [nftDetail])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const exportImage = () => {
    html2canvas(document.querySelector('#canvas')!, {
      allowTaint: true,
      useCORS: true,
    }).then(res => {
      const data = new Image()
      data.src = res.toDataURL('image/png')
      const alink = document.createElement('a')
      alink.href = data.src
      alink.download = 'test.png'
      alink.click()
    })
  }

  return (
    <Wrapper>
      <Canvas id={'canvas'}>
        <NFTInfo >
          <LeftArea >
            <img  src={nftDetail?.previewUrl} />
          </LeftArea>
          <RightArea>
            <RightTopArea>
              <TopTitle>
                <div style={{ display:'flex', alignItems: 'center' }}>
                  <div className="name">{nftDetail?.chainNftName || `HypeTeen # ${nftDetail?.chainNftNameTmp}`}</div>

                </div>

                <Options>
                  <HeartContainer heartStatus = {heartStatus} >
                    <span>{heartNum}</span>
                    <HeartOutlined onClick={() => handleLike(nftDetail?.id as string)} className="heart" />
                  </HeartContainer>
                  <Tooltip title={'Copy link'}>
                    <img src={UploadIcon} onClick={() => handleCopy(window.location.href)} />
                  </Tooltip>
                </Options>

              </TopTitle>
              <SeriesTitle>
                <div>  {
                  level && (
                    <LevelLabel color={level.color} shine={level.shine}>
                      Rarity: {level.label}
                    </LevelLabel>
                  )
                }
                </div>
              </SeriesTitle>
              <Rainbow>
                <span>Owned by:</span>
                {
                  !isMobile ?  <div className="wallet">{nftDetail?.wallet}</div> :  <div className="wallet">{shortenAddress(nftDetail?.wallet)}</div>
                }
              </Rainbow>
            </RightTopArea>
            <RightBottomArea >
              <AttributesItem item={attr} />
            </RightBottomArea>
          </RightArea>

        </NFTInfo>

        <Snackbar  open={open} autoHideDuration={12000} onClose={handleClose} anchorOrigin={{ vertical:'bottom',horizontal:'left' }}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%','& .MuiSnackbar-root':{ zIndex: 1500 }  }}>
            Copy success!
          </Alert>
        </Snackbar>

      </Canvas>
      <Button variant={'contained'} onClick={() => exportImage()}>Click</Button>

    </Wrapper>

  )
}

export default CONFTDetail
