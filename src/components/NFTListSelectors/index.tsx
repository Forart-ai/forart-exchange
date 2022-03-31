import React from 'react'
import { Select } from 'antd'
import { DropdownSelector } from '../../styles/DropdownSelector'

const StatusSelector: React.FC<{ onChange:(_value: any) => void }> = ({ onChange }) => {
  return (
    <DropdownSelector defaultValue="" onChange= {onChange}>
      <Select.Option value="">All items</Select.Option>
      <Select.Option value="1">On Sale</Select.Option>
      <Select.Option value="2">On Auction</Select.Option>
    </DropdownSelector>
  )
}

const OrderSelector: React.FC<{ onChange:(_value: any) => void }> = ({ onChange }) => {
  return (
    <DropdownSelector defaultValue="desc" onChange= {onChange} >
      <Select.Option value="desc">Top to Low</Select.Option>
      <Select.Option value="asc">Low to Top</Select.Option>
    </DropdownSelector>
  )
}

const OrderBySelector: React.FC<{ onChange:(_value: any) => void }> = ({ onChange }) => {
  return (
    <DropdownSelector defaultValue="random" onChange= {onChange} >
      <Select.Option value="random">Random</Select.Option>
      <Select.Option value="star">Likes</Select.Option>
      <Select.Option value="rarity">Hats Rarity</Select.Option>
    </DropdownSelector>
  )
}

export {
  StatusSelector, OrderSelector, OrderBySelector
}
