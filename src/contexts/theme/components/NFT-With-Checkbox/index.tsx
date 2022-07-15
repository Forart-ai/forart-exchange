import React, { JSXElementConstructor, ReactElement } from 'react'
import { styled } from '@mui/system'
import { WrapperProps } from '../Image/types'
import { Checkbox } from '@mui/material'
import { ShowCoNftParams } from '../../../../types/social'
import {
  height,
  HeightProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps, minHeight,
  MinHeightProps, minWidth,
  MinWidthProps
} from 'styled-system'

export type NFTWithCheckboxProps = WrapperProps & {
  content?: string | JSX.Element
  checked?: boolean
  onSelect:(_?: any) => void
  selected?: any
  src: any
}

const getSelectStatus = ({ theme, checked }: any) => {
  switch (checked) {
  case true:
    return { border: `1px ${theme.palette.primary.light} solid` }

  default:
    return ''

  }
}

const NftContent = styled('div')<MinHeightProps & MinWidthProps & MaxHeightProps & MaxWidthProps & {checked?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 10px;
  width: 100%;
  height: 100%;
  ${maxHeight};
  ${maxWidth};
  ${minHeight};
  ${minWidth};
  margin: 10px;

  background-color: rgba(255, 255, 255, .1);
  border-radius: 10px;
  padding: 10px;
  
  ${getSelectStatus}
  
  :hover {
    transform: scale(1.05);
    transition: all .3s ease;
    border: 1px ${({ theme }) => theme.palette.primary.light} solid;
  }
  
`

const NFTWithCheckboxProps:React.FC<NFTWithCheckboxProps> = ({
  content,
  checked,
  src,
  onSelect,
  width,
  height,
  children
}) => {

  return (
    <NftContent checked={checked} minHeight={height} minWidth={width}  maxWidth={width} maxHeight={height} onClick={() => onSelect(src)} >
      <Checkbox checked={checked}  sx={{ position: 'absolute', top:'6px', right: '6px', zIndex: 1 }} />
      {children}
    </NftContent>

  )
}

export default NFTWithCheckboxProps
