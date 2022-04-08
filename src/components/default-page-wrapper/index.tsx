import { styled } from '@mui/material'

const DefaultPageWrapper = styled('div')(({ theme }) => ({
  width: '80%',
  maxWidth: '1870px',
  minHeight:'100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems:'center',
  margin:' 0 auto',
  pb: 5,

  [theme.breakpoints.down('md')]: {
    width:'97vw',
  }

}))

export default DefaultPageWrapper
