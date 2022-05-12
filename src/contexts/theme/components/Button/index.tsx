import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: 16,
  fontFamily: [
    '-apple-system',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
})

const CustomizeButton:React.FC<ButtonProps> = (props:ButtonProps) => {
  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  )
}

export default CustomizeButton
