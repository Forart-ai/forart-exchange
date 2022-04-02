import React from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { Typography } from '@mui/material'

export const ConfirmCreateDialog:React.FC = () => {
  return (
    <Dialog title={'Confirm'} closeable={true} >
      <Typography>Sure to create?</Typography>
    </Dialog>
  )
}
