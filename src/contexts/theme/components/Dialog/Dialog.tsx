import { Button, ButtonProps, CardProps, styled, TypographyProps } from '@mui/material'
import React from 'react'
import {  useModal } from '../../../modal'
import CloseIcon from '../../../../assets/images/coPools/close.svg'
import CustomizeButton from '../Button'

export type DialogProps = {
    title?: string | JSX.Element
    titlePrefix?: React.ReactElement
    footer?: string | JSX.Element
    cancelButtonProps?: ButtonProps
    confirmButtonProps?: ButtonProps
    onConfirm?: () => void
    onCancel?: () => void
    bottomMessage?: string | TypographyProps
    closeable?: boolean
    variant?: DialogVariantProps | 'info'
}

export type DialogVariantProps = 'success' | 'warning' | 'info' | 'error'

const getDialogVariant = ({ theme, variant }: any) => {
  switch (variant) {
  case 'success':
    return {
      border: `2px solid ${theme.palette.success.main}`,
    }

  case 'warning':
    return {
      border: `2px solid ${theme.palette.warning.main}`,
    }

  case 'error':
    return {
      border: `2px solid ${theme.palette.error.main}`,
    }

  case 'info':
    return {
      border: `2px solid ${theme.palette.info.main}`,
    }

  default: {
    return  {
      border: `2px solid ${theme.palette.info.main}`,
    }
  }
  }
}

const getHeaderBottomVariant = ({ theme, variant }: any) => {
  switch (variant) {
  case 'success' : {
    return {
      borderBottom: `2px solid ${theme.palette.success.main}`,
    }
  }
  case 'error' : {
    return {
      borderBottom: `2px solid ${theme.palette.error.main}`,
    }
  }
  case 'warning' : {
    return {
      borderBottom: `2px solid ${theme.palette.warning.main}`,
    }
  }
  case 'info' : {
    return {
      borderBottom: `2px solid ${theme.palette.info.main}`,
    }
  }

  default: {
    return  {
      borderBottom: `2px solid ${theme.palette.info.main}`,
    }
  }
  }
}

const Wrapper = styled('div')<{variant?: DialogVariantProps}>`
  min-width: 390px;
  border-radius: 20px;
  position: relative;
  background-color: #11002c;
  
  ${getDialogVariant}
`

const Title = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Kanit-Regular;
  font-size: 24px;
  padding: 10px 18px;
  color: #f2f2f2;
 
`

const Header = styled('div')<{variant?: DialogVariantProps}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: relative;
  
  ${getHeaderBottomVariant}
`

const CloseButton = styled('div')`
  cursor: pointer;
  position: absolute;
  right: 10px;
  img {
    width: 25px;
  }
`

const Footer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center; 
  gap: 30px;
  padding: 10px 0;
`

const Content = styled('div')` 
  padding: 16px 20px;

`

const Dialog: React.FC<DialogProps> =({
  title,
  titlePrefix,
  footer,
  cancelButtonProps,
  confirmButtonProps,
  onConfirm,
  onCancel,
  bottomMessage,
  closeable,
  children,
  variant,
  ...rest
}) => {

  const { closeModal } = useModal()
  return (
    <Wrapper variant={variant}>
      {
        title && (
          <Header variant={variant}>
            <Title>
              {title}
            </Title>
            {
              closeable && (
                <CloseButton onClick={closeModal} >
                  <img src={CloseIcon} />
                </CloseButton>
              )
            }

          </Header>
        )
      }
      {
        (!title && closeable) && (
          <CloseButton onClick={closeModal} >
            <img src={CloseIcon} />
          </CloseButton>
        )

      }
      <Content>
        {children}

      </Content>
      <Footer >
        {
          onCancel && (
            <CustomizeButton onClick={onCancel} variant={'outlined'} color={variant} >
              {cancelButtonProps?.children || 'Cancel'}
            </CustomizeButton>
          )
        }
        {
          onConfirm && (
            <CustomizeButton onClick={onConfirm} variant={'contained'} color={variant} >
              {confirmButtonProps?.children || 'Submit'}
            </CustomizeButton>
          )
        }
      </Footer>

    </Wrapper>
  )
}

export default Dialog
