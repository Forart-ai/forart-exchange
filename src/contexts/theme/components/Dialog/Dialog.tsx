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
  min-width: 390px;
  border-radius: 20px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: rgb(40,0,89);


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

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px ${({ theme }) => theme.palette.primary.main} solid;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`

const CloseButton = styled('div')`
  cursor: pointer;
  position: relative;
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
  margin: 10px 0;
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
      <Content>
        {children}

      </Content>
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
