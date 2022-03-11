import React from 'react'
import { KitImageBorder, KitListContainer } from '../../pages/coNft/artistMint.style'
import { KitProperties } from '../../pages/coNft/artistDetail'
import { Checkbox } from 'antd'
import styled from 'styled-components'
import RandomHat from '../../assets/images/artistDetail/random-hat.png'

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
  height: 130px;
  overflow: hidden;

  img {
    object-fit: cover;
    border-radius: 1em;
    width: 100%;
    height: 100%;
    background: #1E052D;
    
  }
  .Clothing {
    transform: scale(2, 2) translate(0);
    
  }
  .Pants {
    transform: scale(2,2) translate(-15px, -25px);
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
`

const KitItemContainer = styled.div`
  display: flex;
  min-width: 135px;
  flex-direction: column;
  margin: 10px;
  box-shadow: 10px 4px 10px #0000008c;
  border-radius: 10px;
  height: 150px;



  &:last-child {
    margin-right: auto;
  }
  
  @media screen and (max-width: 1100px) {
    min-width: 140px;
    margin: 10px 5px;
  }
`

const Fake = styled.div`
padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 1.3em;
    margin-top: 5px;
    color: #c2c2c2;
    font-weight: bold;
  }
  img {
    border-radius: 10px;
    width: 50%;
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

  // console.log(src.bodyType)

  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'absolute',
        top: '-125px',
        left: '5px',
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
          src?.remain && <CornerRemainFlag remain={src.remain} />
        }
      </div>
      <ImageContainer>
        <img className={src.bodyType}  src={src.url}  />
      </ImageContainer>
      <div  style={{ position: 'relative', height: 'fit-content' }}>
        {
          <SelectBtn />
        }
      </div>
    </KitImageBorder>
  )
}

export const SelectableKitList: React.FC<{img?: boolean, selectedValue?: any, onSelect: (_?: any) => void, list?: KitProperties[]}> =({
  selectedValue,
  onSelect,
  list,
  img
}) => {
  console.log(img)
  return (
    <KitListContainer>
      {
        list?.map((item, index) => (
          <KitItemContainer key={index}>
            <SelectableKitItem  src={item} onSelect={onSelect} checked={selectedValue?.url === item?.url}  />
          </KitItemContainer>
        ))
      }
      {
        ( !list && img) && (
          <Fake>
            <img src={RandomHat}  />
            <span >Hypeteen Rarity randomly by Hat rarity</span>
          </Fake>
        )
      }
    </KitListContainer>
  )

}
