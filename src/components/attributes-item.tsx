import React, { useMemo } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Skeleton, styled } from '@mui/material'
import { Attribute } from '../utils/metaplex/metadata'

export interface AttributesListItem {
    chainMeta: any;
}

const Wrapper = styled('div')`
  height: fit-content;
  overflow: auto;
  width: 100%;

  .scroll-container {
    ::-webkit-scrollbar {
      display: flex !important;
      height: 5px;
    }
  }
`

const BoxContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 145px));
  justify-content: space-between;
  grid-template-rows: repeat(3, 80px);
  grid-gap: 10px;
  width: 100%;
  
  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: repeat(3, 110px);
  }
`

const ItemBox = styled('div')`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: linear-gradient(60.95deg, #8246F5 2.09%, #5000B4 97.91%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Kanit-Regular;


  .type {
    color: ${({ theme }) => theme.palette.primary.light};
    font-size: 16px;
    //background: #341222;
  }

  .value {
    color: #fff;
    font-size: 20px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 56px;

    .type {
      font-size: 12px;
    }

    .value {
      font-size: 14px;
    }
  }

`

export const AttributesItem: React.FC<{ item?: AttributesListItem[] }> = ({ item }) => {

  return (
    <Wrapper>
      <ScrollContainer className="scroll-container" hideScrollbars={false}>

        {
          item ? (
            <BoxContainer>
              {
                item?.map(items => (
                  <ItemBox key={items?.chainMeta.trait_type} >
                    <div className="type"> {items?.chainMeta.trait_type}</div>
                    <div className="value"> {items?.chainMeta.value}</div>
                  </ItemBox>
                ))
              }
            </BoxContainer>
          ) :

            <BoxContainer>
              {
                new Array(9).fill({}).map((_, index) => (
                  <Skeleton variant={'rectangular'} animation="wave"  key={index} >
                    <ItemBox />
                  </Skeleton>

                ))
              }
            </BoxContainer>

        }
      </ScrollContainer>

    </Wrapper>

  )
}

export const AttributesItemForWalletNft: React.FC<{ item?: Attribute[] }> = ({ item }) => {

  return (
    <Wrapper>
      <ScrollContainer className="scroll-container" hideScrollbars={false}>
        {
          item ? (
            <BoxContainer>
              {
                item?.map((items,index) => (
                  <ItemBox key={index} >
                    <div className="type"> {items?.trait_type}</div>
                    <div className="value"> {items?.value}</div>
                  </ItemBox>
                ))
              }
            </BoxContainer>
          ) :

            <BoxContainer>
              {
                new Array(9).fill({}).map((_, index) => (
                  <Skeleton variant={'rectangular'} animation="wave"  key={index} >
                    <ItemBox />
                  </Skeleton>

                ))
              }
            </BoxContainer>

        }
      </ScrollContainer>

    </Wrapper>

  )
}
