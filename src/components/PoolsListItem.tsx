import React, { useState } from 'react'
import styled from 'styled-components'
import { PoolsListData } from '../types/coNFT'
import { Button } from 'antd'

const PoolsCardContainer = styled.div< { loading?: boolean }>`
  width: 600px;
  height: 220px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #232324;
  box-shadow: 16px 14px 20px #0000008c;
  position: relative;
  overflow: hidden;
  //box-shadow: inset 20px 20px 20px #0000008c;

  ${props => props.loading && `
   &:before {
    content: "";
    background-image: conic-gradient(#02fbab 20deg, transparent 120deg);
    position: absolute;
    width: 150%;
    height: 50%;
    animation: rotate 3s linear infinite;
  }

  &:after {
    content: "";
    width: 590px;
    height: 210px;
    position: absolute;
    background: #232324;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 20px 20px 20px #0000008c;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
  `}
 

`

const ImageContent = styled.div`
  width: 50%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 20px;

  }
`

const InfoContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  z-index: 99;
  
  .name {
    font-size: 24px;
    color: #fff;
  }
  
  .description {
    font-size: 14px;
    color: #b2b2b2;
  }

`

const DataContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  .data-column {
    flex-direction: column;

    .label {
      font-size: 14px;
      color: #e8e5e5;
    }

    .value {
      font-size: 18px;
      color: #fff;
    }
  }
`

const PoolsListItem: React.FC<{data?: PoolsListData, type?: 'going' | 'closed'}> = ({ data, type }) => {

  const [loading, setLoading] = useState(false)

  //   useMemo(() => {
  // if(data?.status === 'living') {
  //   setLoading(true)
  // }
  //   },[data])

  console.log(data)
  return (
    <PoolsCardContainer loading={true}>
      <ImageContent>
        <img src={data?.image} />
      </ImageContent>
      <InfoContent>
        <div className="name"> {data?.name }</div>
        <div className="description"> {data?.describe}</div>

        <DataContent >
          <div className="data-column">
            <div className= "label">Followers</div>
            <div className= "value">{data?.followers}</div>
          </div>

          <div className="data-column">
            <div className= "label">Mintors</div>
            <div className= "value">{data?.mintors}</div>
          </div>
        </DataContent>
        <Button>More Detail</Button>

      </InfoContent>
    </PoolsCardContainer>
  )
}

export default PoolsListItem
