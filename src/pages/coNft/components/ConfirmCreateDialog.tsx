import React from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { ThemeProvider, Typography } from '@mui/material'
import { useModal } from '../../../contexts/modal'
import ForartTheme from '../../../contexts/theme/config/dark'

export const ConfirmCreateDialog:React.FC = () => {
  const { closeModal } = useModal()

  return (
    <ThemeProvider theme={ForartTheme}>
      <Dialog title={'Confirm'}
        closeable={true}
        onCancel={() => closeModal()}
      >
        <Typography align={'center'}  >Sure to create?</Typography>
      </Dialog>
    </ThemeProvider>
  )
}
