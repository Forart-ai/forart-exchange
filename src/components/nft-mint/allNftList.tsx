import React from 'react'
import { MintedNFTItem } from '../../types/coNFT'
import styled from 'styled-components'
import { Image } from 'antd'

const Wrapper = styled.div`
  width: 200px;
  height: 300px;
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
  }
`

const Info = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  justify-content: space-between;
  padding: 2px 8px;
  
  .name {
    font-size: .75em;
    font-weight: bold;
  }
`

const AllNftList: React.FC<{data?: MintedNFTItem}> = ({ data }) => {
  return (
    <Wrapper>
      <img src={data?.previewUrl} />
      <Info>
        <div className="name">{data?.chainNftName || `HypeTeen # ${data?.chainNftNameTmp}`}</div>
      </Info>
    </Wrapper>
  )
}

export default AllNftList
