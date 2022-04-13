import React from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/material'

const Wrapper = styled('div')`
  height: 300px;
`

const UserProfileSetting:React.FC = () => {
  return (
    <Dialog title={'User Profile'} closeable={true} >
      <Wrapper >ddds</Wrapper>
    </Dialog>
  )
}

export default UserProfileSetting
