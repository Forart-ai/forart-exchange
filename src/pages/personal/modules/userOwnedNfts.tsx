import { useOwnedNFTsQuery } from '../../../hooks/queries/useOwnedNFTsQuery'
import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import MintListItem from '../components/mintListItem'

const NFTListContainer = styled('div')`
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-template-rows: repeat(auto-fill,  400px);
  grid-gap: 16px;
  padding: 30px 20px;
  margin: 60px 0;
  
  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
`

const NFTItemsContainer = styled('div')`
  width: 260px;
  height: 300px;
  border-radius: 20px;
  position: relative;
  background-color: #28005A;
  font-family: Arial;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`

const ImageContainer = styled('div')`
  height: 220px;
  width: 220px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 20px;
  }
`

const Info = styled('div')`
  width: 100%;
  margin-top: 10px;

  .label {
    font-family: Aldrich-Regular;
    color: #ffffff;
    font-size: 20px;
  }
`

const NFTItem: React.FC<{ item?: any }> = ({ item }) => {

  return (
    <NFTItemsContainer>
      {
        item.data ? (
          <>
            <ImageContainer>
              <img src={item.data.image} />
            </ImageContainer>
            <Info>
              <div className={'label'}> { item.data.name}</div>
            </Info>
          </>
        ) :
          (
            <></>
          )
      }
    </NFTItemsContainer>
  )
}

const UserOwnedNfts: React.FC = () => {
  const holds = useOwnedNFTsQuery()

  const { data, isLoading } = holds

  return (
    <NFTListContainer>
      {
        data?.map((nft: any, index: number) => (
          <NFTItem item={nft} key={index} />
        ))
      }
    </NFTListContainer>
  )
}

export default UserOwnedNfts
