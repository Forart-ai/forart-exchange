import { SnackbarKey, useSnackbar } from 'notistack'
import { styled } from '@mui/material'
import React from 'react'
import { HeartBrokenOutlined } from '@mui/icons-material'
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
  default:
    return ''
  }
}

const getMessageStyleByVariant = ({ theme, $variant }: any) => {
  switch ($variant) {
  case 'success':
    return {
      background: theme.palette.background.paper,
      color: theme.palette.success.main,
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
          {
            variant === 'success' && <HeartBrokenOutlined sx={{ color: '#ffffff' }} />
          }
        </LeftIcon>

        <MessageContainer $variant={variant}>
          <Text padding={'0 10px'} fontFamily={'Kanit-Regular'}  fontSize={'16px'}>{message}</Text>
          {
            subMessage &&  <Text padding={'0 10px'} color={'#999999'} fontFamily={'Kanit-Light'}  fontSize={'14px'}>{subMessage}</Text>
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
