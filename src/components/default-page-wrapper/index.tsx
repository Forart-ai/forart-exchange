import { styled } from '@mui/material'

const DefaultPageWrapper = styled('div')(({ theme }) => ({
  width: '80%',
  maxWidth: '1870px',
  minHeight:'100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems:'center',
  margin:' 0 auto',
  paddingBottom: '130px',

  [theme.breakpoints.down('md')]: {
    width:'calc(100vw - 30px)',
    height: 'fit-content',
  }

}))

export default DefaultPageWrapper
