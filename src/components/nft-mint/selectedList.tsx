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

const PreviewBackground = styled.div`
  position: absolute;
  padding: 20px;
  width:100%;
  height: 100%;

  img {
    width:100%;
    height: 100%;
    border-radius: 20px;
  }
`

const PreviewImages = styled.div`
  position: absolute;
  padding: 20px;
  width:100%;
  height: 100%;
  background: transparent;
  border-radius: 10px;

  img{
    position: relative;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    
  }
  
  
  img[src = ""], img:not([src]) {
  opacity: 0;
}
  
  
  
  .Artboard {
    z-index: 2;
  }

  .Body {
    z-index: 3;
  }
  
  .Clothing , .Head {
    z-index: 4;
  }
  .Pen-Body, .Wrist, .Nib {
    z-index: 7;
  }
  

  .Butt ,.Foot ,.Mouth,  .Foot {
    z-index: 4;
  }

  .Pants, .Ear {
    z-index: 5;
  }

  .Clothing ,.Eye, .Hat, .Hand {
    z-index: 6;
  }
  
  
`

export const NFTPreview: React.FC<{ body?: NFTAttributesData, attrList?: NFTAttributesData[] }> = ({ body, attrList }) => {

  return (
    <Wrapper>
      <PreviewBackground>
        {
          attrList?.filter(item => item?.bodyType ==='Background').map((item, index) => (
            <img  key={index} src={item?.url} onError={undefined}  />
          ))
        }
      </PreviewBackground>
      <PreviewImages>
        {
          body?.url && <img className={'Body'} src={body?.url}  alt={body?.url} />
        }
      </PreviewImages>

      {
        attrList?.filter(item => item?.bodyType !=='Background').map((item, index) => (
          <PreviewImages key={index}>
            <img className={item?.bodyType.replace(' ', '-')} src={item?.url} onError={undefined} />
          </PreviewImages>
        ))
      }
    </Wrapper>
  )
}
