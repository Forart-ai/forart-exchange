import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Popover } from 'antd'
import { NFTAttributesData } from '../../types/coNFT'
import src from '*.png'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  
`
export const Title = styled.div`
  font-size: 2.5em;
  color: #ffffff;
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;

  
`

const MintItems = styled.div`
  margin: 10px;
  min-width: 135px;
  min-height: 200px;
  width: 200px;
  height: 200px;
  background: transparent;
  border-radius: 10px;
  
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  &:last-child {
    margin-right: auto;
  }
`

const MysteryHat = styled.div`
  position: absolute;
  height: 100px;
  width: 250px;
  left: 80px;
  top: 90px;
  z-index: 2;
`

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
`

const PreviewImages = styled.div`
  position: absolute;
  width:100%;
  height: 100%;
  background: transparent;
  border-radius: 10px;

  img{
    position: relative;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  img[src = ""], img:not([src]) {
  opacity: 0;
}
  
  .Butt ,.Foot ,.Mouth {
    z-index: 2;
  }
  
  .Pants {
    z-index: 5;
  }
  
  .Clothing ,.Eye, .Hat {
    z-index: 6;
  }
  
`

export const SelectedList: React.FC<{kitList?: Map<string, any>, body: any}> = ({ kitList, body }) => {

  useEffect(()=> {
    // console.log(Array.from(kitList?.entries() ?? []))
  },[kitList])

  return (
    <Wrapper>
      <Container>

        <MintItems>
          {
            body?.url && <img src={body?.url} />
          }
        </MintItems>

        {
          Array.from(kitList?.entries() ?? []).map(([key, value]) => (
            <MintItems  key={key}>
              <img className="image" src={value.url} />
            </MintItems>
          ))
        }
      </Container>
    </Wrapper>
  )
}

export const NFTPreview: React.FC<{body: NFTAttributesData, attrList?: NFTAttributesData[]}> = ({ body, attrList }) => {

  return (
    <Wrapper>
      <PreviewContainer>
        <PreviewImages>
          {
            attrList?.filter(item => item?.bodyType ==='Background').map((item, index) => (
              <PreviewImages key={index}>
                <img src={item?.url} onError={undefined} />
              </PreviewImages>
            ))
          }
        </PreviewImages>
        <PreviewImages>
          {
            body?.url && <img src={body?.url}  alt={body?.url} />
          }
        </PreviewImages>

        {
          attrList?.filter(item => item?.bodyType !=='Background').map((item, index) => (
            <PreviewImages key={index}>
              <img className={item?.bodyType} src={item?.url} onError={undefined} />
            </PreviewImages>
          ))
        }
      </PreviewContainer>
    </Wrapper>
  )
}
