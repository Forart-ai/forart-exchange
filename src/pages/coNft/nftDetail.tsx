import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Card, CardMedia, Container, Grid, Paper, ThemeProvider } from '@mui/material'
import { MintedNFTItem } from '../../types/coNFT'
import ForartTheme from '../../contexts/theme/config/dark'
import darkTheme from 'web3modal/dist/themes/dark'
import UploadIcon from '../../assets/images/coPools/upload.svg'
import styled, { keyframes } from 'styled-components'
import { AttributesItem } from '../../components/attributes-item'
import { useFindComponent } from '../../hooks/queries/useFindComponent'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useNftDetail } from '../../hooks/queries/useNftDetail'
import CONFT_API from '../../apis/co-nft'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

const NFTInfo = styled.div`
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  
  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
`

const LeftArea = styled.div`
  height: 450px;
  width: 450px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`
const RightArea = styled.div`
  width: calc(100% - 470px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  
  
`

const RightTopArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 25%;

`

const TopTitle = styled.div`
  font-family: 'inter-extraBold';
  width: 100%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;


  .name {
    color: #ffffff;
  }
  
`

const RightBottomArea = styled.div`
  height: 70%;
`

const Rainbow = styled.div`
    display: flex;
    font-size: 15px;

    .wallet {
      color: #A197AA;
      margin-left: 10px;
    }
    span {
      font-weight: bold;
      display: table;
      background: -webkit-linear-gradient(0deg,#17ef97 -5.04%,#6084ff 46.01%,#d324f7 96.01%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }
`

const SeriesTitle = styled.div`
  color: #A197AA;
  font-size: 24px;
`

const Options = styled.div`
  display: flex;
  
  img {
  width: 35px;
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

const HeartContainer = styled.div<{heartStatus?: 'up' | 'down'}>`
  display: flex;
  align-items: center;
  user-select: none;

  .heart {
    cursor: pointer;
    border-radius: 50%;
    font-size: 25px;

    //:hover {
    //  color: #ff005e;
    //  background: rgba(255, 0, 94, .3);
    //  transition-duration: 0.5s;
    //}
  }
  
  ${props => props.heartStatus === 'up' && `
  
  .heart {
     color: #f30c74
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
    font-size: 24px;
    color: #A197AA;
  }
`

export const LevelLabel = styled.div<{ color: string, shine?: boolean }>`
  font-size: 18px;
  color: ${props => props.color.replace(/(\d)\)/, '$1, 0.9)')};
  animation: ${ShineKeyFrame} 2s infinite linear;
  margin-left: 12px;
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

  const nftId = useLocationQuery('id') ?? ''

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

  },[account, nftDetail?.series,])

  const level: { label: string, color: string, shine: boolean } | undefined = useMemo(() => {
    if (nftDetail?.rarity){
      return {
        'Legend': { label: 'Legend', color: 'rgb(255,223,89)', shine: true },
        'Epic': { label: 'Epic', color: 'rgb(255,67,189)', shine: true },
        'Super Rare': { label: 'Super Rare', color: 'rgb(255,109,5)', shine: false },
        'Rare': { label: 'Rare', color: 'rgb(129,234,202)', shine: false },
        'Common': { label: 'Common', color: 'rgb(179,167,208)', shine: false }
      }[nftDetail.rarity]
    }
  }, [nftDetail])

  return (
    <ThemeProvider theme={ForartTheme} >
      <Container maxWidth={'xl'} sx={{ pt:8, minHeight:'100vh' }}   >

        <NFTInfo>
          <LeftArea >
            <img src={nftDetail?.previewUrl} />
          </LeftArea>
          <RightArea>
            <RightTopArea>
              <TopTitle>
                <div style={{ display:'flex', alignItems: 'center' }}>
                  <div className="name">{nftDetail?.chainNftName || `HypeTeen # ${nftDetail?.chainNftNameTmp}`}</div>
                  <div>  {
                    level && (
                      <LevelLabel color={level.color} shine={level.shine}>
                        Rarity: {level.label}
                      </LevelLabel>
                    )
                  }
                  </div>
                </div>

                <Options>
                  <HeartContainer heartStatus = {heartStatus} >
                    <span>{heartNum}</span>
                    {/*{*/}
                    {/*  heartNft?.includes(data.id) ?  < HeartFilled onClick={() => handleUnlike(data?.id)} style={{ color: '#ff005e' }}   className="heart" />*/}
                    {/*    : <HeartOutlined className="heart"  onClick={() => handleLike(data?.id)} />*/}
                    {/*}*/}
                    <HeartOutlined onClick={() => handleLike(nftDetail?.id as string)} className="heart" />
                  </HeartContainer>
                  <img src={UploadIcon} />
                </Options>
              </TopTitle>
              <SeriesTitle>Hypeteen</SeriesTitle>
              <Rainbow>
                <span>Owned by:</span>
                <div className="wallet">{nftDetail?.wallet}</div>
              </Rainbow>
            </RightTopArea>
            <RightBottomArea >
              <AttributesItem item={attr} />
            </RightBottomArea>
          </RightArea>

        </NFTInfo>

      </Container>
    </ThemeProvider>
  )
}

export default CONFTDetail
