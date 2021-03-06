import React, { useMemo } from 'react'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Skeleton } from '@mui/material'

export interface AttributesListItem {
    chainMeta: any;
}

const Wrapper = styled.div`
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

const BoxContainer = styled.div`
  padding: 0 10px 20px 0;
  display: grid;
  grid-template-rows: auto auto;
  grid-auto-flow: column;
  grid-gap: 10px;
  user-select: none;
`

const ItemBox = styled.div`
  height: 100px;
  width: 170px;
  margin-top: 20px;
  border-radius: 10px;
  background: linear-gradient(91.28deg, #3a0341 1.37%, #2e114f 113.86%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .type, .value {
    font-weight: lighter;

  }

  .type {
    color: #f38aad;
    font-size: 16px;
    //background: #341222;
  }

  .value {
    text-align: center;
    color: #fff;
    font-size: 18px;
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
