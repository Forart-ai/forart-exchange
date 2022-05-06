import React from 'react'
import { MintedNFTItem } from '../../../types/coNFT'
import MintListItem from '../components/mintListItem'
import { styled } from '@mui/material'

const NFTListContainer = styled('div')`
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-template-rows: repeat(auto-fill,  auto);
  grid-gap: 16px;
  padding: 30px 20px;
  margin: 20px 0;
  
${({ theme }) => theme.breakpoints.down('sm')} {
  grid-template-columns: repeat(2, 180px);
  justify-content: center;
  }


  ${({ theme }) => theme.breakpoints.between('sm','md')} {
    grid-template-columns: repeat(2, 260px);
   
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
