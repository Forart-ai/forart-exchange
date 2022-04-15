import React from 'react'
import { styled } from '@mui/material'

const Text = styled('div')(({ theme }) => ({
  span: {
    fontSize: '2rem',
    backgroundImage: `-webkit-linear-gradient( right, ${theme.palette.secondary.light}, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: 'KronaOne-Regular',
  },

  [theme.breakpoints.down('sm')]: {
    span: {
      fontSize: '22px',
    }
  },
}))

const RainbowText:React.FC = props => {

  const prop = { ...props }

  return (
    <Text>
      <span>{prop.children}</span>
    </Text>
  )
}

export default RainbowText
