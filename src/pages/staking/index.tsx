import React from 'react'
import { Box, Container, ThemeProvider } from '@mui/material'
import DefaultPageWrapper from '../../components/default-page-wrapper'
import ForartTheme from '../../contexts/theme/config/dark'
import styled from 'styled-components'
import TokenStakingModule from './modules/token-staking'

const StakingPageWrapper= styled(DefaultPageWrapper)`
  display: grid;
  gap: 30px;
  
`

const Staking:React.FC = () => {
  return (
    <StakingPageWrapper>
      <TokenStakingModule />
    </StakingPageWrapper>
  )
}

export default Staking
