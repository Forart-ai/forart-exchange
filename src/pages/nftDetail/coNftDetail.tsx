import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Alert, keyframes,
  Snackbar, SvgIcon,
} from '@mui/material'
import UploadIcon from '../../assets/images/coPools/download.svg'

import { AttributesItem } from '../../components/attributes-item'
import { useFindComponent } from '../../hooks/queries/useFindComponent'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useNftDetail } from '../../hooks/queries/useNftDetail'
import CONFT_API from '../../apis/co-nft'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { useMediaQuery } from 'react-responsive'
import { shortenAddress } from '../../utils'
import copy from 'copy-to-clipboard'
import html2canvas from 'html2canvas'
import { styled } from '@mui/material'

import { Wrapper, NFTInfo, Options, LeftArea, RightArea, Canvas, RightTopArea, RightBottomArea, TopTitle } from './index.style'
import { Heart_Outline } from '../../contexts/svgIcons'
import { Helmet } from 'react-helmet'

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

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`

const SeriesTitle = styled('div')`
  color: #ba75ff;
  font-size: 16px;
  font-family: arialBold;
  margin-bottom: 16px;
  
  span {
    display: flex;
  }
  
  .token-address {
    display: flex;
    font-family: Arial;
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

const HeartContainer = styled('div')<{heartstatus?: 'up' | 'down'}>`
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
  
  ${props => props.heartstatus === 'up' && `
  
  .heart {
     color: #8246F5
     }
  `
}

  ${props => props.heartstatus === 'down' && `
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

export const CONFTDetail:React.FC<{ nft?: string }> = ({ nft }) => {
  const { account } = useSolanaWeb3()
  const { openModal } = useModal()
  const [nftId, setNftId] = useState<string>()

  const [open, setOpen] = React.useState<boolean>(false)

  const nftIds = useLocationQuery('id')

  const handleCopy = (content: any) => {
    copy(content)
    setOpen(true)
  }

  useEffect(() => {
    if (nft) {
      setNftId(nft)
    }
    else setNftId(nftIds)
  }, [nftId, nftIds])

  const { data: nftDetail } = useNftDetail(nftId)

  const { data: a } = useFindComponent(nftDetail?.components)

  const attr = useMemo(() => {
    return nftDetail?.componentMetas.map((v: any) => ({
      chainMeta: JSON.parse(v.chainMeta)
    }))
  }, [ nftDetail,a])

  const [heartNum, setHeartNum] = useState<number>(nftDetail?.star ?? 0)
  const [isHeart, setIsHeart] = useState<boolean>(false)
  const [heartNft, setHeartNft] = useState<string[]>()
  const [heartstatus, setHeartStatus] = useState<'up' | 'down'>('down')

  const handleLike = useCallback((nftId: string) => {
    if (!account) {
      openModal(<WalletSelectionModal />)
      return
    }

    if (nftDetail?.series && heartstatus === 'down') {
      setIsHeart(true)
      setHeartNum(prev => prev + 1)
      setHeartStatus('up')
      CONFT_API.core.nft.starNft(nftDetail?.series, nftId, account.toBase58()).then(() => {

      })
        .catch(() => {
          setIsHeart(false)
        })
    }

    if (nftDetail?.series  && heartstatus === 'up') {
      setIsHeart(false)
      setHeartNum(prev => prev - 1)
      setHeartStatus('down')
      CONFT_API.core.nft.unstarNft(nftDetail?.series, nftId, account.toBase58()).then(() => {
      })
        .catch(() => {
          setIsHeart(false)
        })
    }

  },[account, nftDetail, heartstatus])

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

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const exportImage = (fileName?: string) => {
    html2canvas(document.querySelector('#canvas')!, {
      allowTaint: true,
      useCORS: true,
    }).then(res => {
      const data = new Image()
      data.src = res.toDataURL('image/png')
      const alink = document.createElement('a')
      alink.href = data.src
      alink.download = fileName ?? 'ForartScreenSnap'
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
                  <div className="name">{nftDetail?.chainNftName}</div>

                </div>

                <Options>
                  <HeartContainer heartstatus = {heartstatus} >
                    <span>{heartNum}</span>
                    <SvgIcon style={{ cursor:'pointer' }} onClick={() => handleLike(nftDetail?.id as string)}  className="heart">
                      <path fill="currentColor" d={Heart_Outline} />
                    </SvgIcon>
                  </HeartContainer>
                  <img src={UploadIcon} onClick={() => exportImage(nftDetail?.chainNftName)} />
                </Options>

              </TopTitle>
              <SeriesTitle>
                <div>
                  {
                    level && (
                      <LevelLabel color={level.color} shine={level.shine}>
                        Rarity: {level.label}
                      </LevelLabel>
                    )
                  }
                  {
                    nftDetail?.mintKey && (
                      <div className={'token-address'}>
                        <span>Token Address: &nbsp; </span>
                        {
                          !isMobile ?  <div className="wallet">{nftDetail?.mintKey}</div> : <div>{shortenAddress(nftDetail?.mintKey)}</div>
                        }
                      </div>
                    )
                  }
                </div>
              </SeriesTitle>
              <Rainbow>
                <span>Co-Creator:</span>
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

      </Canvas>

    </Wrapper>

  )
}

export default CONFTDetail
