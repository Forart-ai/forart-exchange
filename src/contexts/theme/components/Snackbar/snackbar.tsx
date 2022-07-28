import { SnackbarKey, useSnackbar } from 'notistack'
import { styled } from '@mui/material'
import React from 'react'
import { CheckCircleRounded, ErrorRounded, WarningAmberRounded } from '@mui/icons-material'
import { variant } from 'styled-system'
import Text from '../Text/Text'

interface Props {
  id: string ;
  message: string;
  subMessage?: string;
  variant: 'success' | 'error' | 'warning';
}

const getStyleByVariant = ({ theme, $variant }: any) => {
  switch ($variant) {
  case 'success':
    return {
      background: theme.palette.success.main,
      color: theme.palette.success.main,
    }

  case 'error':
    return {
      background: theme.palette.error.main,
      color: theme.palette.error.main,
    }

  case 'warning':
    return {
      background: theme.palette.warning.main,
      color: theme.palette.warning.main,
    }
  default:
    return ''
  }
}

const getMessageStyleByVariant = ({ theme, $variant }: any) => {
  switch ($variant) {
  case 'success':
    return {
      background: theme.palette.success.light,
      color: theme.palette.success.dark,
    }

  case 'error':
    return {
      background: theme.palette.error.light,
      color: theme.palette.error.main,
    }

  case 'warning':
    return {
      background: theme.palette.warning.light,
      color: theme.palette.warning.main,
    }
  default:
    return ''
  }
}

const SnackbarContent = styled('div')`
  display: flex;
  height: 56px;
`

const Container = styled('div')`
  display: flex;
  align-items: center;
  height: 100%;
  ${getMessageStyleByVariant}

`

const LeftIcon = styled('div')<{$variant: Props['variant']}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  
  ${getStyleByVariant}
`

const MessageContainer = styled('div')<{$variant: Props['variant']}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  min-width: 200px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 16px;
  
  span {
    padding: 0 10px;
    font-family: Kanit-Regular;
  }
  ${getMessageStyleByVariant}

`

const DismissButton = styled('div')``

const ScreenReaderOnlyText = styled('div')``

const CloseIcon = styled('div')``

const Snackbar = React.forwardRef<any, Props>((props, ref) => {
  const { id, message, subMessage, variant } = props

  const { closeSnackbar } = useSnackbar()
  const handleCloseSnackbar = () => closeSnackbar(id)

  return (
    <SnackbarContent ref={ref}>
      <Container>
        <LeftIcon $variant={variant}>
          { variant === 'success' && <CheckCircleRounded sx={{ color: '#ffffff' }} /> }
          { variant === 'error' && <ErrorRounded sx={{ color: '#ffffff' }} /> }
          { variant === 'warning' && <WarningAmberRounded  sx={{ color: '#ffffff' }} /> }

        </LeftIcon>

        <MessageContainer $variant={variant}>
          <span>{message}</span>
          {
            subMessage &&  <Text padding={'0 10px'} color={'#999999'} fontFamily={'Kanit-Regular'}  fontSize={'14px'}>{subMessage}</Text>
          }
        </MessageContainer>
        {/*<DismissButton onClick={handleCloseSnackbar}>*/}
        {/*  <ScreenReaderOnlyText>Close snackbar</ScreenReaderOnlyText>*/}
        {/*  <CloseIcon aria-hidden  />*/}
        {/*</DismissButton>*/}
      </Container>
    </SnackbarContent>
  )
})
Snackbar.displayName = 'Snackbar'

export { Snackbar }
