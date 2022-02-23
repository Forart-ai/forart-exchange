import React, { useMemo } from 'react'
import styled from 'styled-components'
import { log } from 'util'

export interface AttributesListItem {
    chainMeta: any;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  
`

const BoxContainer = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .empty {
    height: 0;
    padding: 0;
    width: 200px;
  }
`

const ItemBox = styled.div`
  height: 100px;
  width: 200px;
  margin-top: 50px;

  .type, .value {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 0;
    height: 50%;
  }

  .type {
   
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    background: #341222;
    color: #FF4D9D;
  }

  .value {
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    background: #2c283a;
    color: #fff;
  }

 

`

export const AttributesItem: React.FC<{ item: Array<AttributesListItem | undefined> }> = ({ item }) => {

  return (
    <Wrapper>
      <BoxContainer>
        {
          item?.map(items => (
            <ItemBox key={items?.chainMeta.trait_type} >
              <div className="type"> {items?.chainMeta.trait_type}</div>
              <div className="value"> {items?.chainMeta.value}</div>

            </ItemBox>

          ))

        }
        {
          new Array(1).fill({}).map((_, index) => (
            <div className="empty" key={index} />
          ))
        }
      </BoxContainer>
    </Wrapper>

  )
}
