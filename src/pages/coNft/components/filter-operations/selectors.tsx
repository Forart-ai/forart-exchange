import { InputLabel, MenuItem } from '@mui/material'
import StyledSelector from '../../../../contexts/theme/components/Selector'
import React from 'react'

const SelectRankings:React.FC<{value: string, onChange:(event: any, child?: any) => void;}> = ({ value, onChange }) => {
  return (
    <StyledSelector  onChange={onChange}  title={'Ranking'} value={value}>
      {/*<InputLabel>Age</InputLabel>*/}
      <MenuItem value={'random'}>ALL NFTs</MenuItem>
      <MenuItem value={'star-desc'}>Like: High to Low</MenuItem>
      <MenuItem value={'star-asc'}>Like: Low to High</MenuItem>
      <MenuItem value={'rarity-desc'}>Hats rarity: High to Low</MenuItem>
      <MenuItem value={'rarity-asc'}>Hats rarity: Low to High</MenuItem>
    </StyledSelector>
  )
}

const SelectPainterRankings:React.FC<{value: string, onChange:(event: any, child?: any) => void;}> = ({ value, onChange }) => {
  return (
    <StyledSelector  onChange={onChange}  title={'Ranking'} value={value}>
      {/*<InputLabel>Age</InputLabel>*/}
      <MenuItem value={'random'}>ALL NFTs</MenuItem>
      {/*<MenuItem value={'star-desc'}>Like: High to Low</MenuItem>*/}
      {/*<MenuItem value={'star-asc'}>Like: Low to High</MenuItem>*/}
    </StyledSelector>
  )
}

export { SelectRankings, SelectPainterRankings }
