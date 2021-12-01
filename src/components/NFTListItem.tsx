import React, { useCallback, useEffect, useState } from 'react'
import { NftListItem } from '../types/NFTDetail'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { ChainType } from '../apis/nft'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import  PriceIcon  from '../images/wallet/celo.svg'



// @ts-ignore
import styled from 'styled-components'


const NFTCardContainer = styled.div<{$empty?:boolean}>`
  color: #7c6deb;
  width: 210px;
  height: ${(props: { $empty: any }) => props.$empty ? '0' : '320px'};
  background-color: #282c34;
  border-radius: 10px;
  margin-bottom: ${(props: { $empty: any }) => props.$empty ? '0' : '30px'};;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .nft-container {
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    position: relative;
    
    .spin {
      position: absolute;
      top: 50%;
    }
  }
  
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .nft-detail {
    display: flex;
    color: #F7F7F7;
    height: 60px;
    font-weight: 500;
    padding: 0 10px;
    flex-direction: column;
    justify-content: space-between;

    .nft-name {
      margin-left: 5px;
    }
  }
`

const TopDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;


  .like {
    .heart {
      margin-right: 5px;
    }
  }
`

const BottomDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .artist-name {
    color:#87A7B3;
  }
  
  .price{
    display: flex;
  }
  img {
    width: 14px;
    margin-right: 5px;
  }
`

const ChainFlag = styled.span`
  display: flex;
  align-items: center;
  width:fit-content ;
  color: #00EBA4;
  border: 2px #00EBA4 solid; 
  height: 20px;
  padding:  5px;
  border-radius: 5px;
`
const TypeChainThumbnailMapper: { [key in ChainType]?: string } = {
  'Ethereum': 'Celo',
  'Solana': 'Celo'
}

const NFTListItem: React.FC<{ data?: NftListItem, type?: 'nftList' | 'own', empty?:boolean}> = ({ data, type, empty }) => {
  const [loading, setLoading] = useState(true)

  const [isHeart, setHeart] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<number>(data?.favorite ?? 0)


  const getImageUrl = useCallback(() => {
    const url = data?.image ?? data?.thumbnail?? ''

    return url
  }, [data])

  useEffect(() => {
    if (!loading) {
      return
    }
    const img = new Image()
    img.src = getImageUrl()
    if (img.complete) {
      setLoading(false)
    }
  }, [loading])


  const toDetailUrl = './marketplace/nftDetail?' + new URLSearchParams({
    id: data?.name ?? '',
    uri: data?.valueUri ?? '',
    addressContract: data?.addressContract ?? '',
    type: type ?? '',
  }).toString()


  return (
    <NFTCardContainer $empty={empty} >
      <Link to={toDetailUrl}>
        <div className="nft-container" >
          <img
            onLoad={()=>{
              setLoading(false)
            }}
            alt={data?.name}
            src={getImageUrl()}
          />
          {
            loading && data && <Spin className="spin" />
          }
        </div>
        <div className="nft-detail">
          <TopDetail>
            <div style={{ display:'flex', alignItems:'center' }}>
              <div className="chain-flag">
                { data && <ChainFlag >{TypeChainThumbnailMapper[data.typeChain as ChainType]}</ChainFlag> }
              </div>
              <div className="nft-name">{data?.name}</div>
            </div>
            <div className="like">
              {
                data && (
                  isHeart ?
                    <HeartFilled className="heart" />
                    :
                    <HeartOutlined className="heart" />
                )
              }
              {data && (favorite? favorite : 0)}
            </div>
          </TopDetail>
          <BottomDetail>
            <div className="artist-name"> { data?.nameArtist } </div>
            <div className="price">
              {
                data && (
                  <img src={PriceIcon} />
                )
              }
              <div className="price-value">{ data?.price }</div>
            </div>
          </BottomDetail>

        </div>
      </Link>
    </NFTCardContainer>
  )
}

export default NFTListItem
