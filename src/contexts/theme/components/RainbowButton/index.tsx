import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { purple } from '@mui/material/colors'

const RainbowBuwtton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})

const RainbowButton = styled(Button)<ButtonProps>`

  font-family: Arial;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(90deg, rgba(157, 157, 161, 0.87), rgba(157, 157, 161, 0.87), rgba(157, 157, 161, 0.87));
  border-radius: 40px;
  padding: 8px 25px;

  //:hover {
  //  background-image: linear-gradient(90deg, #3ccea4, #6c30de, #b247f3);
  //}
`

const CustomizedButtons = (props: ButtonProps) => {

  return (
    <RainbowButton onClick={props.onClick} variant="contained">{props.children}</RainbowButton>
  )
}

export default CustomizedButtons
