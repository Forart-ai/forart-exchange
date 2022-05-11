import { Alert, AlertProps, Snackbar, SnackbarProps, styled } from '@mui/material'
import React, { useState } from 'react'

const StyledAlert = styled(Alert)({

})

const AlertMassage:React.FC<SnackbarProps> = (props:SnackbarProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Snackbar  anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      >
        <Alert>sd</Alert>
      </Snackbar>
    </>
  )
}

export default AlertMassage
