import React from 'react'
import { ShowCoNftParams } from '../../../../types/social'
import { Checkbox } from '@mui/material'
import Image from '../../../../contexts/theme/components/Image'
import { styled } from '@mui/system'
import { MetadataResult } from '../../../../utils/metaplex/metadata'
import Text from '../../../../contexts/theme/components/Text/Text'

const getSelectStatus = ({ theme, $selected }: any) => {
  switch ($selected) {
  case 'true':
    return { border: `1px ${theme.palette.primary.light} solid` }

  default:
    return ''

  }
}

const NftContent = styled('div')<{$selected?: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 174px;
  height: 220px;
  background-color: rgba(255, 255, 255, .1);
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
  
  ${getSelectStatus}
  
  :hover {
    transform: scale(1.05);
    transition: all .3s ease;
    border: 1px ${({ theme }) => theme.palette.primary.light} solid;
  }
  
`

export const NFTItem: React.FC<{ src: ShowCoNftParams , checked?: boolean, onSelect:(_:ShowCoNftParams) => void}> = ({
  src,
  checked,
  onSelect
}) => {

  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'absolute',
        top:'6px',
        right: '6px'

      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <NftContent $selected={checked?.toString()}>
      <Image style={{ cursor:'pointer' }} src={src.previewUrl} width={'100%'} height={'86%'} onClick={() => onSelect(src)} borderRadius={10}  />
      <SelectBtn />
      <Text color={'primary.main'} fontSize={18} fontFamily={'Kanit-Regular'}>{src.chainNftName}</Text>
    </NftContent>

  )
}

export const NFTItemFromWallet: React.FC<{ src: MetadataResult , checked?: boolean, onSelect:(_:MetadataResult) => void}> = ({
  src,
  checked,
  onSelect
}) => {

  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'absolute',
        top:'6px',
        right: '6px'
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <NftContent $selected={checked?.toString()}>
      <Image style={{ cursor:'pointer' }} src={src.data?.image} width={'100%'} height={'86%'} onClick={() => onSelect(src)} borderRadius={10}  />
      <SelectBtn />
      <Text color={'primary.main'} fontSize={18} fontFamily={'Kanit-Regular'}>{src.data?.name}</Text>
    </NftContent>

  )
}
