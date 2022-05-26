import { Button, styled } from '@mui/material'
import CountUp from 'react-countup'
import BackgroundImage from '../../../assets/images/coPools/homepage-background.png'

export const HeaderContainer = styled('div')`
  height: 100vh;
  width: 80%;
  max-width: 1870px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
    margin: unset;
    height: fit-content;
  }
`

export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
    padding: 20px 14px;
    margin-top: 30px;
  }
  
`

export const LeftArea = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flex:'1 1 0%',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent:'center',
  paddingRight:'30px',

  [theme.breakpoints.down('md')]: {
    paddingRight:'20px',
    width: '100%',
  }

}))

// export const LeftBottom = styled('div')(({ theme }) => ({
//   width: '60%',
//   padding: '1px',
//   fontFamily: 'Aldrich-Regular',
//   display: 'flex',
//   justifyContent: 'space-between',
//
//   '& .total-data': {
//     fontSize: '1.2rem',
//     color: theme.palette.primary.light,
//   },
//
//   '& .label': {
//     fontSize: '1rem',
//     color: theme.palette.primary.light,
//   },
//
//   [theme.breakpoints.down('xl')]: {
//     width: '100%',
//   }
//
// }))

export const LeftBottom = styled('div')`
  width:  60%;
  font-family: Aldrich-Regular;
  display: flex;
  justify-content: space-between;
  
  .total-data{
    font-size: 20px;
    color: ${({ theme }) => theme.palette.primary.light}
  }

  .label {
    font-size: 18px;
    color:  ${({ theme }) => theme.palette.primary.light}
  }
  
  ${({ theme }) => theme.breakpoints.down('xl')} {
    width: 100%;

    .total-data{
      font-size: 16px;
    }
    .label {
      font-size: 14px;
    }
}


`

export const StyledCountUp = styled(CountUp)`
  color:  ${({ theme }) => theme.palette.primary.light};
  font-size: 38px;

  ${({ theme }) => theme.breakpoints.down('xl')} {
    font-size: 30px;
`

export const MainTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  fontSize: '44px',
  color: theme.palette.text.primary,
  fontFamily: 'KronaOne-Regular',
  userSelect:'none',

  '& .title1': {
    color: theme.palette.primary.main
  },

  '& .title2': {
    color: theme.palette.secondary.main,

    'span':{
      color: theme.palette.text.primary,

    }
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
  },

  [theme.breakpoints.down('xl')]: {
    fontSize: '28px',
  }

}))

export const DescriptionText = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  fontSize: '18px',
  color: theme.palette.grey[400],
  fontFamily:'arial',
  userSelect:'none',

  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
  }

}))

export const RainbowButton = styled(Button)(({ theme }) => ({

  '&.MuiButton-root': {
    color: theme.palette.text.primary,
    backgroundImage: 'linear-gradient(to right, rgb(13,14,45), rgb(13,14,45)), linear-gradient(90deg, rgb(79,220,179), rgb(128,77,242), rgb(199,110,252))',
    border: '1px solid transparent',
    padding: '8px 16px',
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    borderRadius: '10px'
  }

}))

export const RightArea = styled('div')`
  display: flex;
  justify-content: center;
  height: 100%;
  user-select: none;
  flex: 1 1 0%;
  
  ${({ theme }) => theme.breakpoints.down('sm')}{
    margin-top: 20px;
    width: 100%;
  }
  

  //@media screen and (max-width: 1080px) {
  //  width: 100%;
  //  margin-top: 20px;
  //}
`

export const Background = styled('div')`
  width: 100%;
  min-height: calc(100vh - 60px);
  height: 100%;
  background: url(${BackgroundImage}) no-repeat;
  background-size: cover;
  
  
`

