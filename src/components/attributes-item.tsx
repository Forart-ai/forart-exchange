import React, { useMemo } from 'react'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

export interface AttributesListItem {
    chainMeta: any;
}

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  width: 100%;
  cursor: grab;

  .scroll-container {
    ::-webkit-scrollbar {
      display: flex !important;
      height: 5px;
    }
  }
`

const BoxContainer = styled.div`
  padding: 0 10px 30px 0;
  display: grid;
  grid-template-rows: auto auto;
  grid-auto-flow: column;
  grid-gap: 12px;
  user-select: none;
`

const ItemBox = styled.div`
  height: 100px;
  width: 180px;
  margin-top: 20px;
  border-radius: 10px;
  background: linear-gradient(91.28deg, #3a0341 1.37%, #000328 113.86%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .type, .value {
    font-weight: lighter;

  }

  .type {
    color: #f38aad;

    //background: #341222;
  }

  .value {
text-align: center;
    color: #fff;
  }



`

export const AttributesItem: React.FC<{ item: Array<AttributesListItem | undefined> }> = ({ item }) => {

  return (
    <Wrapper>
      <ScrollContainer className="scroll-container" hideScrollbars={false}>

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
      </ScrollContainer>

    </Wrapper>

  )
}
