import React from 'react'
import { Attribute } from '../../../../utils/metaplex/metadata'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Skeleton, styled } from '@mui/material'

const Wrapper = styled('div')`
  height: 100%;
  width: 100%;
  overflow: auto;
  min-width: 200px;

  .scroll-container {
    ::-webkit-scrollbar {
      display: flex !important;
      height: 5px;
    }
  }
`

const BoxContainer = styled('div')`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(auto-fill, 110px);
  justify-content: space-between;
  grid-gap: 10px;
  user-select: none;
  width: 100%;
  
  ${({ theme }) => theme.breakpoints.down('xl')} {
    grid-template-columns: repeat(4, 110px);
    overflow: visible;
  }
`

const ItemBox = styled('div')`
  height: 60px; 
  width: 100%;
  border-radius: 5px;
  background: linear-gradient(60.95deg, #8246F5 2.09%, #5000B4 97.91%);
  //background: linear-gradient(60.95deg, rgb(42, 39, 58) 2.09%, rgb(28, 25, 41) 97.91%);

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 4px;

  .type, .value {
    font-weight: lighter;

  }

  .type {
    color: ${({ theme }) => theme.palette.primary.light};
    font-size: 14px;
    font-family: Kanit-Light;
    //background: #341222;
  }

  .value {
    color: #fff;
    font-size: 14px;
    font-family: Kanit-Regular;

  }



`

const AttributesItemCard:React.FC<{item?: Attribute[]}> = ({ item }) => {

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

export default AttributesItemCard
