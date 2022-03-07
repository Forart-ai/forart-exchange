import { MintedNFTItem } from '../types/coNFT'
import React, { useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AttributesItem } from './attributes-item'

const AttributesDialogWrapper = styled.div`
  max-width: 1200px;
  background: rgb(27, 3, 42);
  display: flex;
  padding: 20px;
  border-radius: 1em;
  justify-content: space-between;
  position: relative;

  .rarity {
    display: flex;
  }

`

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  width: 38%;
  height: 100%;
  
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 1em;

  }
`

export const RightArea = styled.div`
  width: 59%;
  display: flex;
  flex-direction: column;
  font-family: 'campton';


  .top {
    
    font-size: 1.4em;
    height: 40%;
    font-weight: 600;

    .name {
      color: #ffffff;
    }
    
    .owner {
      display: flex;
      font-size: .6em;
      font-weight: lighter;
      
      .wallet {
        color: white;
        margin-left: 10px;
      }
      span {
        display: table;
        background: -webkit-linear-gradient(0deg,#17ef97 -5.04%,#6084ff 46.01%,#d324f7 96.01%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  
  .bottom {
    height: 80%;
  }
}


  @media screen and (max-width: 1100px) {
   
`

export const ShineKeyFrame = keyframes`
  0% {
    background-position-x: -100%;
  }

  12% {
    background-position-x: -70%;
  }

  30%, 100% {
    background-position-x: 200%;
  }
`

export const LevelLabel = styled.div<{ color: string, shine?: boolean }>`
  font-family: 'campton';
  font-size: .7em;
  font-weight: lighter;

  color: ${props => props.color.replace(/(\d)\)/, '$1, 0.9)')};
  animation: ${ShineKeyFrame} 2s infinite linear;

  ${p => p.shine ? `
    background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 65%);
    -webkit-background-clip: text;
    background-size: 60% 160%;
    background-repeat: no-repeat;
    background-position: -100% 0;
  ` : ''}
`

const AttributesDialog: React.FC<{ item: MintedNFTItem }> = ({ item }) => {

  const level: { label: string, color: string, shine: boolean } | undefined = useMemo(() => {
    return {
      'Legend': { label: 'Legend', color: 'rgb(255,223,89)', shine: true },
      'Epic': { label: 'Epic', color: 'rgb(255,67,189)', shine: true },
      'Super Rare': { label: 'Super Rare', color: 'rgb(255,109,5)', shine: false },
      'Rare': { label: 'Rare', color: 'rgb(129,234,202)', shine: false },
      'Common': { label: 'Common', color: 'rgb(179,167,208)', shine: false }
    }[item.rarity]
  }, [item])

  const attr = useMemo(() => {
    return item?.componentMetas?.map((v: { chainMeta: string }) => ({
      chainMeta: JSON.parse(v.chainMeta)
    }))
  }, [level, item])

  return (
    <AttributesDialogWrapper>
      <LeftArea>
        <img src={item?.previewUrl} />

      </LeftArea>

      <RightArea>
        <div className="top">
          <div className="name">{item?.chainNftName || `HypeTeen # ${item?.chainNftNameTmp}`}</div>
          <div>  {
            level && (
              <LevelLabel color={level.color} shine={level.shine}>
                Rarity: {level.label}
              </LevelLabel>
            )
          }
          </div>
          {/*<div className="owner">*/}
          {/*  <span>Owned by:</span>*/}
          {/*  <div className="wallet">{item?.wallet}</div>*/}
          {/*</div>*/}
        </div>
        <div className="bottom">
          <AttributesItem item={attr} />
        </div>

      </RightArea>

    </AttributesDialogWrapper>
  )
}

export default AttributesDialog
