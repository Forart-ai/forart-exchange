import React, { useMemo } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Skeleton, styled } from '@mui/material'

export interface AttributesListItem {
    chainMeta: any;
}

const Wrapper = styled('div')`
  height: 100%;
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
  grid-template-columns: repeat(4, 210px);
  justify-content: space-between;
  grid-template-rows: repeat(3, auto);
  grid-gap: 20px;
  user-select: none;
`

const ItemBox = styled('div')`
  height: 100px;
  width: 210px;
  border-radius: 10px;
  background: linear-gradient(60.95deg, #8246F5 2.09%, #5000B4 97.91%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .type, .value {
    font-weight: lighter;

  }

  .type {
    font-family: arialBold;
    color: ${({ theme }) => theme.palette.primary.light};
    font-size: 18px;
    //background: #341222;
  }

  .value {
    font-family: Arial;
    text-align: center;
    color: #fff;
    font-size: 22px;
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
