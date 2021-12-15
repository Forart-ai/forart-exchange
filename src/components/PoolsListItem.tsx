import React from 'react'
// @ts-ignore
import styled from 'styled-components'
import { PoolsListData } from '../types/coNFT'


const PoolsCardContainer = styled.div`
  width: 600px;
  margin: 20px;
  color: #00EBA4;
  display: flex;
  height: 200px;
  border-radius: 20px;
  background: linear-gradient(140deg, #2fa7a7, #156489);
  box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 10%);
  position: relative;

`

const PoolsListItem: React.FC<{data?: PoolsListData, type?: 'going' | 'closed'}> = ({ data, type }) => {

  return (
    <PoolsCardContainer  />
  )
}

export default PoolsListItem
