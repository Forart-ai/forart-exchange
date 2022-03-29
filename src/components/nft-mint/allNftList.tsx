import React, { useCallback, useEffect, useState } from 'react'
import { MintedNFTItem } from '../../types/coNFT'
import styled from 'styled-components'
import { Image, notification } from 'antd'
import { useModal } from '../../contexts/modal'
import AttributesDialog from '../attributes-dialog'
import {  HeartOutlined, HeartFilled   } from '@ant-design/icons'
import CrownIcon from '../../assets/images/coPools/ic_crown.svg'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import CONFT_API from '../../apis/co-nft'
import { Link } from 'react-router-dom'
import CONFTDetail from '../../pages/coNft/nftDetail'
import { Skeleton } from '@mui/material'

const Wrapper = styled.div`
  width: 220px;
  height: 280px;
  border-radius: 10px;
  margin: 10px 9px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  //background-image: linear-gradient(to bottom, rgba(255, 31, 131, 0.6), rgba(241, 13, 192, 0.6));
  background-color: rgb(55, 13, 65);
  transition: transform 0.22s;
  
  :hover {
    transform: scale(1.05);
    transition-duration: 0.7s;
  }

  img {
    width: 100%;
    object-fit: contain;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 1080px) {
    width: 165px;
    height: 230px;
  }
`

const Info = styled.div`
  color: white;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 7px 8px;
  
 
  
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1em;
    width: 100%;
    

    .name {
      font-weight: bold;
      width: 100%;
    }

   
  }
  
  .rank {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: .9em;
    width: 100%;
    
    img {
      width: 1em;
      margin-right: 10px;
    }
  }
`

const HeartContainer = styled.div<{heartStatus?: 'up' | 'down'}>`
  display: flex;
  align-items: center;

  .heart {
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.3em;

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
     color: white
     }
  `
}

  span {
    margin-right: 5px;
  }
`

const AllNftList: React.FC<{data: MintedNFTItem, index: number}> = ({ data ,index }) => {
  const { openModal } = useModal()
  const { account, select } = useSolanaWeb3()
  const series = useLocationQuery('artistId')

  const [heartNum, setHeartNum] = useState<number>(data?.star)
  const [isHeart, setIsHeart] = useState<boolean>(false)
  const [heartNft, setHeartNft] = useState<string[]>()
  const [heartStatus, setHeartStatus] = useState<'up' | 'down'>('down')

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
      select()
      return
    }

    if (series && heartStatus === 'down') {
      setIsHeart(true)
      setHeartNum(prev => prev + 1)
      setHeartStatus('up')
      console.log('down')
      CONFT_API.core.nft.starNft(series, nftId, account.toBase58()).then(() => {

      })
        .catch(() => {
          setIsHeart(false)
        })
    }

    if (series  && heartStatus === 'up') {
      setIsHeart(false)
      setHeartNum(prev => prev - 1)
      setHeartStatus('down')
      console.log('up')
      CONFT_API.core.nft.unstarNft(series, nftId, account.toBase58()).then(() => {
      })
        .catch(() => {
          setIsHeart(false)
        })
    }

  },[account, data, heartStatus])

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
      {
        data.previewUrl ? (
          <Link to={toDetailUrl}>
            {

            }
            <img src={data.previewUrl}  />
            <Info>
              <div className="row">
                <div className="name">{data?.chainNftName || `HypeTeen # ${data?.chainNftNameTmp}`}</div>

                <HeartContainer heartStatus = {heartStatus} >
                  <span>{heartNum}</span>
                  {/*{*/}
                  {/*  heartNft?.includes(data.id) ?  < HeartFilled onClick={() => handleUnlike(data?.id)} style={{ color: '#ff005e' }}   className="heart" />*/}
                  {/*    : <HeartOutlined className="heart"  onClick={() => handleLike(data?.id)} />*/}
                  {/*}*/}
                  <HeartFilled  onClick={() => handleLike(data?.id)}  className="heart" />
                </HeartContainer>

              </div>
              <div className="rank">
                <img src={CrownIcon} />
                <div>{data?.rank}</div>
              </div>
            </Info>
          </Link>
        ) :
          <Skeleton variant={'rectangular'} width={220} height={280} />
      }

    </Wrapper>
  )
}

export default AllNftList
