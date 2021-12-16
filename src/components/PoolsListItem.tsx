import React from 'react'
// @ts-ignore
import styled from 'styled-components'
import { PoolsListData } from '../types/coNFT'
import { Button } from 'antd'


const PoolsCardContainer = styled.div`
  width: 600px;
  margin: 20px;
  display: flex;
  justify-content: center;
  height: 220px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(36, 52, 84, .8), rgba(14, 22, 39, .8));
  box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 10%);
  position: relative;
  border: 1px #0d0934 solid;

`

const ImageContent = styled.div`
  width: 50%;
  height: 100%;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;

  }
`

const InfoContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  
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

  console.log(data)
  return (
    <PoolsCardContainer>
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
