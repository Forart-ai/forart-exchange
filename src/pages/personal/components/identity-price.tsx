import React from 'react'
import { Box, Button, styled } from '@mui/material'
import SolanaIcon from '../../../assets/images/wallets/solanaLogoMark.svg'
import RainbowButton from '../../../contexts/theme/components/RainbowButton'

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  img {
    width: 30px;
  }
  
  span {
    margin-left: 10px;
    font-size: 28px;
    font-family: Aldrich-Regular;
    color: ${({ theme }) => theme.palette.primary.light};
  }


  ${({ theme }) => theme.breakpoints.down('sm')} {
    span {
      margin-left: 10px;
      font-size: 24px;
    }
  }
`

const IdentityPrice:React.FC = () => {
  return (
    <Wrapper >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:'100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={SolanaIcon} />
          <span>---- SOL</span>
        </Box>

        <Box>
          <RainbowButton disabled={true}>Buy Now!</RainbowButton>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default IdentityPrice
