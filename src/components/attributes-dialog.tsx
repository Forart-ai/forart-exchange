import { MintedNFTItem } from '../types/coNFT'
import React from 'react'
import styled from 'styled-components'

const AttributesDialogWrapper = styled.div`
  width: 50%;
  height: 86%;
  background: #1e2125;
  display: flex;
  padding: 20px;
  border-radius: 1em;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

`

const AttributesDialog: React.FC<{ item?: MintedNFTItem }> = ({ item }) => {

  return (
    <AttributesDialogWrapper>
      <img src={item?.previewUrl} />
    </AttributesDialogWrapper>
  )
}

export default AttributesDialog
