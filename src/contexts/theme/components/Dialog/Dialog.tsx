import { Button, ButtonProps, CardProps, styled, TypographyProps } from '@mui/material'
import React from 'react'
import {  useModal } from '../../../modal'
import CloseIcon from '../../../../assets/images/coPools/close.svg'

export type DialogProps = CardProps & {
    title: string | JSX.Element
    titlePrefix?: React.ReactElement
    footer?: string | JSX.Element
    cancelButtonProps?: ButtonProps
    confirmButtonProps?: ButtonProps
    onConfirm?: () => void
    onCancel?: () => void
    bottomMessage?: string | TypographyProps
    closeable?: boolean
}

const Wrapper = styled('div')`
  min-width: 450px;
  max-width: 98vw;
  border-radius: 30px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  background-color: #28005A ;
  padding: 30px;

`

const Title = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inter-extraBold;
  color: #f2f2f2;
 
`

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px ${({ theme }) => theme.palette.primary.main} solid;
`

const CloseButton = styled('div')`
  cursor: pointer;
  
  img {
    width: 25px;
  }
`

const Footer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  ...rest
}) => {

  const { closeModal } = useModal()
  return (
    <Wrapper>
      {
        title && (
          <Header>
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
      {children}
      <Footer >
        {
          onCancel && (
            <Button onClick={onCancel} variant={'contained'} color={'secondary'} >
              {cancelButtonProps?.children || 'Cancel'}
            </Button>
          )
        }
        {
          onConfirm && (
            <Button onClick={onConfirm} variant={'contained'} color={'primary'} >
              {confirmButtonProps?.children || 'Submit'}
            </Button>
          )
        }
      </Footer>

    </Wrapper>
  )
}

export default Dialog
