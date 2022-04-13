import React from 'react'
import { Box, styled } from '@mui/material'
import CustomizedProgressBars from '../../../contexts/theme/components/Progress'

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .level {
    font-size: 30px;
    font-family: Aldrich-Regular;
    color: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .level {
      font-size: 22px;
     
    }
  }
`

const ProgressContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 64%;
  font-size: 14px;
  .label {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  
  .value {
    font-size: 18px;
    font-family: Aldrich-Regular;
    color: ${({ theme }) => theme.palette.primary.light};
  }
  
`

const IdentityGrade:React.FC = () => {
  return (
    <Wrapper>
      <ProgressContainer>
        <Box sx={{ display:'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={'label'}> Experience</div>
          <div className={'value'}> 2700/3600</div>
        </Box>
        <Box >
          <CustomizedProgressBars percent={20} />
        </Box>
      </ProgressContainer>
      <div className={'level'}>Level.23</div>
    </Wrapper>
  )
}

export default IdentityGrade
