import React, { useMemo } from 'react'
import { Box, styled } from '@mui/material'
import CustomizedProgressBars from '../../../contexts/theme/components/Progress'
import { Attribute, MetadataResult } from '../../../utils/metaplex/metadata'

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .level {
    font-size: 26px;
    font-family: Aldrich-Regular;
    color: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
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
  font-size: 16px;
  
  .label {
    font-size: 16px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  
  .value {
    font-size: 18px;
    font-family: Aldrich-Regular;
    color: ${({ theme }) => theme.palette.primary.light};
  }
  
`

const IdentityGrade:React.FC<{attr?: Attribute[]}> = ({ attr }) => {

  const level = useMemo(() => {
    return  attr?.filter(v => v.trait_type === 'Level')[0]
  }, [attr])

  return (
    <Wrapper>
      <ProgressContainer>
        <Box sx={{ display:'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className={'label'}> Experience</div>
          <div className={'value'}> ---/---</div>
        </Box>
        <Box >
          <CustomizedProgressBars value={0} />
        </Box>
      </ProgressContainer>
      <div className={'level'}>Level.{level?.value}</div>
    </Wrapper>
  )
}

export default IdentityGrade
