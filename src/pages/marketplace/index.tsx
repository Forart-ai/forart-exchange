import React, { useState } from 'react'
import { useNFTsQuery } from '../../hooks/queries/useNFTsQuery'
// @ts-ignore
import styled from 'styled-components'
import { NftListItem } from '../../types/NFTDetail'
import NFTListItem from '../../components/NFTListItem'
import { Menu } from 'antd'

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

const NFTList: React.FC<{ list: Array<NftListItem> | undefined }> = ({ list }) => {
  return (
    <NFTListContainer >
      {
        list?.map((nft: NftListItem, index:number) => (
          <NFTListItem
            data={nft}
            key={index}
            type={'nftList'}
          />
        ))
      }
    </NFTListContainer>
  )
}

const marketplace:React.FC = () => {
  const [size, setSize] = useState(20)

  const { data:pagingData } = useNFTsQuery({
    current: 1,
    size: 10,
    searchKey:'',
    transactionStatus: 0,
    typeChain:'Ethereum'
  })

  console.log(pagingData)

  return (
    <Wrapper>
      <Title>NFT Market Place</Title>
      <NFTList list={ pagingData?.records } />
    </Wrapper>
  )
}

export default marketplace
