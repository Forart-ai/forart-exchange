import React, { useMemo } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Skeleton, styled } from '@mui/material'
import { Attribute } from '../utils/metaplex/metadata'

export interface AttributesListItem {
    chainMeta: any;
}

const Wrapper = styled('div')`
  height: fit-content;
  overflow: hidden;
  width: 100%;

 
`

const BoxContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, 110px);
  justify-content: space-around;
  grid-gap: 10px;
  width: 100%;


  // ${({ theme }) => theme.breakpoints.down('md')} {
  //   grid-template-columns: repeat(4, 110px);
  //
  // }
`

const ItemBox = styled('div')`
  height: 60px;
  width: 100%;
  border-radius: 5px;
  background: linear-gradient(60.95deg, #8246F5 2.09%, #5000B4 97.91%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 4px;


  .type {
    color: ${({ theme }) => theme.palette.primary.light};
    font-size: 16px;
    font-family: Kanit-Light;

  }

  .value {
    color: #fff;
    font-size: 16px;
    font-family: Kanit-Regular;

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

    </Wrapper>

  )
}
