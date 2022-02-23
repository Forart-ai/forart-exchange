import { MintedNFTItem } from '../types/coNFT'
import React, { useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AttributesItem } from './attributes-item'

const AttributesDialogWrapper = styled.div`
  width: 70%;
  height: fit-content;
  background: rgb(29,34,45);
  display: flex;
  padding: 10px;
  border-radius: 1em;
  justify-content: center;
  position: relative;
  
  .rarity {
    display: flex;
  }

`

const LeftArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 1em;

  }
`

export const RightArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  font-weight: 600;
  font-family: 'campton';
  
  .top {
    display: flex;
    justify-content: space-around;
    font-size: 1.4em;
    
    .name {
      color: #FF4D9D;
    }
  }
  
  .bottom {
    height: fit-content;
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
  font-weight: 600;
  font-size: 1em;

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
      'Mythic': { label: 'Mythic', color: 'rgb(255,255,77)', shine: true },
      'Rare': { label: 'Rare', color: 'rgb(255,67,189)', shine: true },
      'Uncommon': { label: 'Uncommon', color: 'rgb(255,109,5)', shine: false },
      'Common': { label: 'Common', color: 'rgb(179,167,208)', shine: false }
    }[item.rarity]
  }, [item])

  const attr = useMemo(() => {
    return item?.componentMetas.map((v: { chainMeta: string }) => ({
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
        </div>
        <div className="bottom">
          <AttributesItem item={attr} />
        </div>

      </RightArea>

    </AttributesDialogWrapper>
  )
}

export default AttributesDialog
