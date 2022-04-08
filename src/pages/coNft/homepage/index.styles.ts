import { Button, styled } from '@mui/material'
import CountUp from 'react-countup'

export const HeaderContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
  position: 'relative',
  display: 'flex',
  overflow: 'auto',
  margin: '150px 0',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    padding: '10px 0',
    height: 'fit-content',
    marginTop: 0,
  }
}))

export const LeftArea = styled('div')(({ theme }) => ({
  width: '50%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingRight:'30px',

  [theme.breakpoints.down('lg')]: {
    width: '100%',
    padding: '0',
  }
}))

export const LeftBottom = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: '40%',
  padding: '1px',
  fontFamily: 'Aldrich-Regular',
  display: 'flex',

  '& .total-data': {
    fontSize: '1.2rem',
    color: theme.palette.primary.light,
  },

  '& .label': {
    fontSize: '1rem',
    color: theme.palette.primary.light,
  }
}))

export const StyledCountUp = styled(CountUp)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: '2.6rem',

}))

export const MainTitle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  fontSize: '3.2rem',
  color: theme.palette.text.primary,
  fontFamily:'KronaOne-Regular',

  '& .title1': {
    color: theme.palette.primary.main
  },

  '& .title2': {
    color: theme.palette.secondary.main,

    'span':{
      color: theme.palette.text.primary,

    }
  }

}))

export const DescriptionText = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  fontSize: '1.2rem',
  color: theme.palette.text.secondary,
  fontFamily:'arial',

}))

export const RainbowButton = styled(Button)(({ theme }) => ({

  '&.MuiButton-root': {
    color: theme.palette.text.primary,
    backgroundImage: 'linear-gradient(to right, rgb(13,14,45), rgb(13,14,45)), linear-gradient(90deg, rgb(79,220,179), rgb(128,77,242), rgb(199,110,252))',
    border: '1px solid transparent',
    padding: '8px 16px',
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
  }

}))

