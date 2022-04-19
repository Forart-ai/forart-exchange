import * as React from 'react'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'
import { useState } from 'react'
import { InputLabel } from '@mui/material'

interface StyledSelectorProps {
  children?: React.ReactNode;
  value?: any;
  onChange: (event: any, child?: any) => void;
  title?: string
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  // 'aria-label': 'Without label',
  minWidth:'200px',
  'label + &': {
    marginTop: theme.spacing(2),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.secondary.dark,
    border: `1px solid ${theme.palette.secondary.main}`,
    fontSize: 16,
    color: '#999999',
    padding: '4px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
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
      borderRadius: 4,
      borderColor: theme.palette.secondary.light,
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))

const StyledSelector:React.FC<StyledSelectorProps> = (props: StyledSelectorProps) => {
  return (
    <FormControl size={'small'}  variant="standard">
      <InputLabel id="demo-customized-select-label">{props.title}</InputLabel>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        {...props}
        input={<BootstrapInput />}
      >
        {props.children}
      </Select>
    </FormControl>
  )
}
export default StyledSelector
