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
  border: 4px solid ${({ theme }) => theme.palette.secondary.dark};
  background-color: #ffffff ;

`

const Title = styled('div')`
  display: flex;
  justify-content: center;
  font-family: inter-extraBold;
  color: #f2f2f2;
 
`

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px #600665 solid;
`

const CloseButton = styled('div')`
  position: absolute;
  top: 20px;
  right: 15px;
  cursor: pointer;
  
  img {
    width: 25px;
  }
`

const Footer = styled('div')`
  width: 100%;
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
            {
              closeable && (
                <CloseButton onClick={closeModal} >
                  <img src={CloseIcon} />
                </CloseButton>
              )
            }
            <Title>
              {title}
            </Title>
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
      </Footer>

    </Wrapper>
  )
}

export default Dialog
