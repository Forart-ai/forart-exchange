import React from 'react'
import { MintedNFTItem } from '../../../types/coNFT'
import MintListItem from '../components/mintListItem'
import { styled } from '@mui/material'

const NFTListContainer = styled('div')`
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-template-rows: repeat(auto-fill,  240px);
  grid-gap: 20px;
  padding: 16px;
  
  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
`

const UserCoNftList: React.FC<{ list: Array<MintedNFTItem> | undefined  }> = ({ list }) => {
  return (
    <NFTListContainer>
      {
        list?.map((nft: any, index: number) => (
          <MintListItem data={nft} key={index} />
        ))
      }
    </NFTListContainer>
  )
}

export default UserCoNftList
