import * as React from 'react'
import { styled } from '@mui/material/styles'
import  InputBase  from '@mui/material/InputBase'
import { alpha, InputLabel, TextField } from '@mui/material'

interface StyledTextFieldProps {
  onChange: (event: any) => void
  placeholder: string
  variant: 'outlined' | 'filled' | 'standard'
  name?: string
  fullWidth?: boolean
  size?: 'small' | 'medium'
  multiline?: boolean
  maxRows?: number
}

const StyledInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    minWidth: '200px',

    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.secondary.dark,
    border: `1px solid ${ theme.palette.secondary.main}`,
    fontSize: 16,
    color: '#999999',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
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
    '&:focus': {
      boxShadow: `${alpha(theme.palette.secondary.light, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.secondary.light,
    },
  },
}))

const StyledTextField:React.FC<StyledTextFieldProps> = (props:StyledTextFieldProps) => {
  return (
    <StyledInput
      maxRows={props.maxRows}
      {...props}
      placeholder={props.placeholder ?? ''}

    />
  )
}

export default StyledTextField
