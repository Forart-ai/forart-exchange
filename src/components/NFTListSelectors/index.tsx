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

export {
  StatusSelector,
}
