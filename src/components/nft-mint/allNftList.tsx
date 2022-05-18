import React, { useCallback, useEffect, useState } from 'react'
import { MintedNFTItem } from '../../types/coNFT'
import { useModal } from '../../contexts/modal'
import AttributesDialog from '../attributes-dialog'
import CrownIcon from '../../assets/images/coPools/ic_crown.svg'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import CONFT_API from '../../apis/co-nft'
import WalletSelectionModal from '../wallet/WalletSelectionModal'
import { Link } from 'react-router-dom'
import { styled, SvgIcon } from '@mui/material'
import { Heart_Outline } from '../../contexts/svgIcons'

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  border: 1px #999999 solid;
  border-radius: 10px;
  padding: 10px;
  display: flex; 
  background-color: rgba(153, 153, 153, .2);
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  transition: transform 0.22s;
  
  :hover {
    transform: scale(1.05);
    transition-duration: 0.7s;
  }

  img {
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
    cursor: pointer;
  }
  
`

const Info = styled('div')`
  color: white;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    width: 100%;
    
    .name {
      width: 100%;
    }
  }
  
  .rank {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    width: 100%;
    font-family: Aldrich-Regular;
    
    img {
      width: 18px;
      margin-right: 10px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    .row {
      font-size: 14px;
      width: 100%;
    }
  }
`

const HeartContainer = styled('div')<{heartstatus?: 'up' | 'down'}>`
  display: flex;
  align-items: center;

  .heart {
    cursor: pointer;
    border-radius: 50%;
    font-size: 18px;

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
     color: white
     }
  `
}

  span {
    margin-right: 5px;
    font-family: Aldrich-Regular;
  }
`

const AllNftList: React.FC<{data: MintedNFTItem, index: number}> = ({ data ,index }) => {
  const { openModal } = useModal()
  const { account } = useSolanaWeb3()
  const series = useLocationQuery('artistId')

  const [heartNum, setHeartNum] = useState<number>(data?.star)
  const [isHeart, setIsHeart] = useState<boolean>(false)
  const [heartNft, setHeartNft] = useState<string[]>()
  const [heartstatus, setHeartStatus] = useState<'up' | 'down'>('down')

  const cb = useCallback(() => {
    if (data?.chainStatus === 'SUCCESS') {
      openModal(<AttributesDialog item={data} />)
    }
  }, [data])

  // const handleUnlike = useCallback((nftId:string) => {
  //   if (series && account) {
  //     setIsHeart(false)
  //     setHeartNum(prev => prev - 1)
  //     CONFT_API.core.nft.unstarNft(series, nftId, account.toBase58())
  //       .then(() => {
  //
  //       }).catch(() => {
  //         setIsHeart(false)
  //       })
  //
  //     return isHeart
  //
  //   }
  // },[account, data])

  const handleLike = useCallback((nftId: string) => {
    if (!account) {
      return
    }

    if (series && heartstatus === 'down') {
      setIsHeart(true)
      setHeartNum(prev => prev + 1)
      setHeartStatus('up')
      CONFT_API.core.nft.starNft(series, nftId, account.toBase58()).then(() => {

      })
        .catch(() => {
          setIsHeart(false)
        })
    }

    if (series  && heartstatus === 'up') {
      setIsHeart(false)
      setHeartNum(prev => prev - 1)
      setHeartStatus('down')
      CONFT_API.core.nft.unstarNft(series, nftId, account.toBase58()).then(() => {
      })
        .catch(() => {
          setIsHeart(false)
        })
    }

  },[account, data, heartstatus])

  useEffect(() => {

    CONFT_API.core.user.getStaredNft(series, account?.toBase58()).then((res:any) => {
      setHeartNft(res)
      if (res.includes(data.id)) {
        setHeartStatus('up')
      }
    })

  },[account, series,])

  const toDetailUrl = '/co-nft-detail?' + new URLSearchParams({
    id: data?.id ?? '',
  }).toString()

  return (
    <Wrapper >

      <Link to={toDetailUrl}>
        <img src={data.previewUrl} />
      </Link>

      <Info>
        <div className="row">
          <div className="name">{data?.chainNftName || `HypeTeen # ${data?.chainNftNameTmp}`}</div>

          <HeartContainer heartstatus = {heartstatus} >
            <span>{heartNum}</span>
            {
              account ? (
                <SvgIcon style={{ cursor:'pointer' }} onClick={() => handleLike(data?.id)}  className="heart">
                  <path fill="currentColor" d={Heart_Outline} />
                </SvgIcon>
              ) :
                <SvgIcon style={{ cursor:'pointer' }}  onClick={() => openModal(<WalletSelectionModal />)}  className="heart">
                  <path fill="currentColor" d={Heart_Outline} />
                </SvgIcon>

            }
          </HeartContainer>

        </div>
        <div className="rank">
          {
            series === '3312' &&
              <>
                <img src={CrownIcon} />
                <div>{data?.rank}</div>
              </>
          }
        </div>
      </Info>

    </Wrapper>
  )
}

export default AllNftList
