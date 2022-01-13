import React from 'react'
import { KitImageBorder, KitListContainer } from '../../pages/coNft/artistMint.style'
import { KitProperties } from '../../pages/coNft/artistDetail'
import { Checkbox } from 'antd'
import styled from 'styled-components'


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

  img {
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 100%;
    background: #0f1b39;
  }
`

const KitItemContainer = styled.div`
  display: flex;
  min-width: 135px;
  flex-direction: column;
  margin: 10px;
  background: #232324;
  box-shadow: 10px 4px 10px #0000008c;
  border-radius: 10px;
  height: 180px;



  &:last-child {
    margin-right: auto;
  }
  
  @media screen and (max-width: 1100px) {
    min-width: 140px;
    margin: 10px 5px;
  }
`

const KitInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color: #ffffff;
  padding: 2px 10px;
`

const CornerRemainFlag: React.FC<{remain: string}> = ({ remain }) => {

  return (
    <StyledFlag>
      <div className="value">{remain}</div>
    </StyledFlag>
  )
}

export const SelectableKitItem: React.FC<{ src: any, checked?: boolean, onSelect:(_?: string) => void}> = ({
  src,
  checked,
  onSelect
}) => {

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
        <img src={src.url}  />
      </ImageContainer>
      <div  style={{ position: 'relative', height: 'fit-content' }}>
        {
          <SelectBtn />
        }
      </div>
    </KitImageBorder>
  )
}


export const SelectableKitList: React.FC<{selectedValue?: any, onSelect: (_?: any) => void, list?: KitProperties[]}> =({
  selectedValue,
  onSelect,
  list
}) => {
  return (
    <KitListContainer>
      {
        list?.map((item, index) => (
          <KitItemContainer key={index}>
            <SelectableKitItem src={item} onSelect={onSelect} checked={selectedValue?.url === item?.url} />
            <KitInfo>
              <div>{item.price} FTA</div>
              <div>Rarity: {item.rarity}</div>
            </KitInfo>
          </KitItemContainer>
        ))
      }
    </KitListContainer>
  )

}
