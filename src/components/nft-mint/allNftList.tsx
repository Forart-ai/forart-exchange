import React, { useCallback } from 'react'
import { MintedNFTItem } from '../../types/coNFT'
import styled from 'styled-components'
import { Image } from 'antd'
import { useModal } from '../../contexts/modal'
import AttributesDialog from '../attributes-dialog'
import {  HeartOutlined, HeartFilled   } from '@ant-design/icons'
import CrownIcon from '../../assets/images/coPools/ic_crown.svg'

const Wrapper = styled.div`
  width: 200px;
  height: 270px;
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
`

const Info = styled.div`
  color: white;
  display: flex;
  height: 100px;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2px 8px;
  
 
  
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .65em;
    width: 100%;


    .name {
      font-weight: bold;
      width: 100%;
    }

    .heart {
      cursor: pointer;
      border-radius: 50%;

      :hover {
        color: #ff005e;
        background: rgba(255, 0, 94, .3);
        transition-duration: 0.5s;
      }
    }
  }
  
  .rank {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: .6em;
    width: 100%;
    
    img {
      width: 1em;
      margin-right: 10px;
    }
  }
`

const AllNftList: React.FC<{data: MintedNFTItem, index: number}> = ({ data ,index }) => {
  const { openModal } = useModal()

  const cb = useCallback(() => {
    if (data?.chainStatus === 'SUCCESS') {
      openModal(<AttributesDialog item={data} />)
    }
  }, [data])

  const handleLike = useCallback((nftId: string | number) => {
    console.log(nftId)
  },[])

  return (
    <Wrapper >
      <img src={data?.previewUrl} onClick={cb} />
      <Info>
        <div className="row">
          <div className="name">{data?.chainNftName || `HypeTeen # ${data?.chainNftNameTmp}`}</div>
          <HeartOutlined className="heart"  onClick={() =>handleLike(data?.previewUrl)} />
          {/*<HeartFilled   />*/}
        </div>
        <div className="rank">
          <img src={CrownIcon} />
          <div>{index + 1}</div>
        </div>
      </Info>

    </Wrapper>
  )
}

export default AllNftList
