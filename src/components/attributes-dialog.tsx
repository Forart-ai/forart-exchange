import { MintedNFTItem } from '../types/coNFT'
import React, { useEffect, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

const AttributesDialogWrapper = styled.div`
  width: 50%;
  height: 86%;
  background: #1e2125;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
  
  .rarity {
    display: flex;
  }

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

export const RarityContainer = styled.div`
  width: 90%;
  height: 8%;
  display: flex;
  padding: 0 40px;
  justify-content: space-around;
  align-items: center;
  background: #2d112c;
  position: relative;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: 600;
  font-family: 'campton';


  @media screen and (max-width: 1100px) {
    padding: 0 10px;

    .value {
      font-size: 1.4em;
    }
  }
`

const AttributesDialog: React.FC<{ item: MintedNFTItem }> = ({ item }) => {

  const level: { label: string, color: string, shine: boolean } | undefined = useMemo(() => {
    return {
      'Mythic': { label: 'Mythic', color: 'rgb(255,255,77)', shine: true },
      'Rare': { label: 'Rare', color: 'rgb(213,95,252)', shine: true },
      'Uncommon': { label: 'Uncommon', color: 'rgb(255,109,5)', shine: false },
      'Common': { label: 'Common', color: 'rgb(179,167,208)', shine: false }
    }[item.rarity]
  }, [item])

  useEffect(() => console.log(level), [level])

  return (
    <AttributesDialogWrapper>
      <img src={item?.previewUrl} />

      <RarityContainer>
        <div> {item?.chainNftName}</div>
        <div style={{ display:'flex' }}>

          {
            level && (
              <LevelLabel color={level.color} shine={level.shine}>
                Rarity: {level.label}
              </LevelLabel>
            )
          }

        </div>
      </RarityContainer>

    </AttributesDialogWrapper>
  )
}

export default AttributesDialog
