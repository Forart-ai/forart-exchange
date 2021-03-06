import React, {  useState } from 'react'
import { KitImageBorder, KitListContainer } from '../../pages/coNft/artistMint.style'
import { KitProperties } from '../../pages/coNft/artistDetail'
import styled from 'styled-components'
import { Checkbox } from '@mui/material'

const StyledFlag = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 99;
  width: 35px;
  height: 35px;
  left: calc(100% - 25px);
  top: calc(100% - 10px);
  border-radius: 50%;
  background: linear-gradient(110deg, #3376ff, #3efff6 65%, #4effd2);

  .value {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2A2E35;
    height: 90%;
    width: 90%;
    border-radius: 50%
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px #312d8a;

  img {
    object-fit: fill;
    border-radius: 1em;
    width: 100%;
    height: 100%;
    overflow: hidden;

  }

  .Clothing {
    border-radius: 1em;
    transform: scale(2, 2) translate(0);
  }

  .Pants {
    transform: scale(2, 2) translate(-15px, -25px);
  }

  .Eye {
    transform: scale(2, 2) translate(18px, 20px);
  }

  .Butt {
    transform: scale(4, 4) translate(-15px, -10px);
  }

  .Hand {
    transform: scale(3, 3) translate(-5px, -25px);
  }

  .Mouth {
    transform: scale(2) translate(15px, 10px);
  }

  .Ear {
    transform: scale(3) translate(-10px, 30px);
  }
`

const KitItemContainer = styled.div`
  display: flex;
  width: 140px;
  height: 140px;
  flex-direction: column;
  margin: 5px;
  border-radius: 10px;



  @media screen and (max-width: 1100px) {
    min-width: 140px;
    margin: 10px 5px;
  }
`

const CornerRemainFlag: React.FC<{remain: string}> = ({ remain }) => {

  return (
    <StyledFlag>
      <div className="value">{remain}</div>
    </StyledFlag>
  )
}

export const SelectableKitItem: React.FC<{ src: any, checked?: boolean, onSelect:(_?: string) => void }> = ({
  src,
  checked,
  onSelect,
}) => {

  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'absolute',
        top: '0px',
        left: '0px',
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <KitImageBorder
      onClick={() => onSelect(!checked ? src : undefined)}
    >
      <div  style={{ position: 'relative', height: 'fit-content' }}>
        {
          <SelectBtn />
        }
      </div>

      <ImageContainer>
        <img className={src.bodyType}  src={src.url}  />
      </ImageContainer>

    </KitImageBorder>
  )
}

export const SelectableKitList: React.FC<{selectedValue?: any, onSelect: (_?: any) => void, list?: KitProperties[]}> =({
  onSelect,
  list,
}) => {
  const [state, setState] = useState<any>()

  return (
    <KitListContainer>
      {
        list?.map((item, index) => (
          <KitItemContainer key={index}>
            <SelectableKitItem
              src={item}
              onSelect={v => {
                setState(v)
                onSelect(v)
              }}
              checked={state?.url === item?.url}
            />
          </KitItemContainer>
        ))
      }
    </KitListContainer>
  )

}
