// @ts-ignore
import styled from 'styled-components'
import { Select } from 'antd'
import { Property } from 'csstype'

type DropdownSelectorProps = {
  backgroundColor?: Property.Color
  minWidth?: Property.MinWidth
  height?: Property.Height
}

// @ts-ignore
// @ts-ignore
const DropdownSelector = styled(Select)<DropdownSelectorProps>`
  font-size: 1.6em;
  margin: 0 5px;

  

  &,
  .ant-select {
    height: ${props => props.height ?? 'fit-content'};
    min-width: ${props => props.minWidth ?? '200px'};
    
    
  }

  .ant-select-selector {
    max-width: 300px;
    min-width: ${props => props.minWidth ?? '120px'};
    height: ${props => props.height ?? '40px'} !important;
    border: none !important;
    border-radius: 5px !important;
    background-color: #282c34 !important;
    color: white;
    display: flex;
    align-items: center;

  }



  .ant-select-selection-item {
    color: white !important;
    text-align: center !important;
    margin: 0 5px !important;
    font-size: 16px;
  }

  .ant-select-clear {
    background-color: #282c34 !important;

    span {
      position: relative;
      bottom: 4px;
      color: #c2c2c2;
    }
  }

  .ant-select-arrow {
    span {
      color: white;
    }
  }

  .ant-select-selection-overflow {
    min-width: ${props => props.minWidth ?? '200px'};

    .ant-select-selection-item {
      background-color: #282c34 !important;
      filter: brightness(85%);
      color: white;
      border: none;
      border-radius: 10px;
      align-items: center;


      .ant-select-selection-item-remove {
        color: white;
        line-height: 0;
        position: relative;
        bottom: 2px;
        right: 2px;

        span svg {
          stroke-width: 20;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    margin-left: 0;
    .ant-select-selector { 
      width: fit-content;
      color: white;
      font-size: 1rem;
    }
  }
`

export {
  DropdownSelector
}
