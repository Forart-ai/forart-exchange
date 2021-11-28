import React, { useCallback, useState } from 'react'
import { useNFTsQuery } from '../../hooks/queries/useNFTsQuery'
// @ts-ignore
import styled from 'styled-components'
import { NftListItem } from '../../types/NFTDetail'
import NFTListItem from '../../components/NFTListItem'
import { Button, Menu } from 'antd'
import NFTCreate from '../nftCreate'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #97BCF6;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: 100vw !important;
    height: 200vh;
    background-color: #0B111E;
    padding: 0;
  }
  `

const Banner = styled.div`
  width: 1200px;
  height: 200px;
  border: 1px dodgerblue solid;
  margin: 10px 0;
`

const Title = styled.div`
  font-size: 34px;
  font-weight: 550;
  background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 10px;
  margin-bottom: 50px;
`

const NFTListContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  .empty {
    padding: 0;
    height: 0;
    width: 210px;
  }

  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;

    .nft-container {
      display: flex;
      justify-content: center;
    }
  }
`

const StyledButton = styled(Button)`
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  height: 40px;
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 10px;
`
const NFTCreateContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 1200px;
  margin: 25px 0;

`
const NFTList: React.FC<{ list: Array<NftListItem> | undefined }> = ({ list }) => {
  return (
    <NFTListContainer>
      {
        list?.map((nft: NftListItem, index:number) => (
          <NFTListItem
            data={nft}
            key={index}
            type={'nftList'}
          />
        ))
      }
      {
        new Array(5).fill({}).map((_, index) => (
          <div className="empty" key={index} />
        ))
      }
    </NFTListContainer>
  )
}

const marketplace:React.FC = () => {
  const history = useHistory()

  const [size, setSize] = useState(20)

  const { data:pagingData } =  useNFTsQuery({
    current: 1,
    size: 99,
    searchKey:'',
    transactionStatus: 0,
    typeChain:'Ethereum'
  })


  console.log(pagingData)

  return (
    <Wrapper>
      <Banner />
      <Title>NFT Marketplace</Title>
      <NFTCreateContainer>
        <StyledButton onClick={ () => history.push('/NFTCreate') }>NFT Create</StyledButton>
      </NFTCreateContainer>
      <NFTList list={ pagingData?.records } />
    </Wrapper>
  )
}

export default marketplace
