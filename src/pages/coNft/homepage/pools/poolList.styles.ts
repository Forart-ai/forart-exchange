import { Button, styled } from '@mui/material'

export const PoolsContainer = styled('div')`
  width: 100%;
  margin-top: 40px;
`

export const PoolListContainer = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 250px));
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: repeat(auto-fit, 320px);
    justify-content: center;
  }

`

export const PoolsCardContainer = styled('div')(({ theme }) => ({
  width:'280px',
  maxWidth: '320px',
  height: '480px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection:'column',
  alignItems: 'center',
  borderRadius: '30px',
  background: theme.palette.background.default,
  position: 'relative',
  marginTop: theme.spacing(2.6),
}))

export const ImageContent = styled('div')`
  width: 90%;
  height: 280px;
  max-height: 320px;
  z-index: 1;
  display: flex;
  justify-content: center; 
 
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;

  }
`
export const InfoContent = styled('div')`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  z-index: 1;
  
`

export const DataContent = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  margin:' 10px 0',

}))

export const PoolTitle = styled('div')(({ theme }) => ({

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.text.primary,
  height: '20%',

  '& .pool-name': {
    fontFamily: 'arialBold',
    fontSize: '24px',

  },

  '& .likes-value': {
    fontFamily: 'Aldrich-Regular',
    fontSize: '20px',
  }
}))

export const PoolInfo = styled('div')(({ theme }) => ({
  width: '100%',
  height: '40%',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '15px'
}))

export const LeftArea = styled('div')(({ theme }) => ({
  width: '55%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '1rem',

  '& .avatar': {
    width: '40%',
    height: '100%',
    marginRight: '6px',
    img: {
      width: '100%',
      height: '100%',
      borderRadius: '5px',
      objectFit: 'cover',

    }
  },

  '& .owner': {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    fontSize: '12px',

    span: {
      color: theme.palette.text.primary,
      fontSize: '16px',
      fontFamily: 'arialBold',
    }
  }
}))

export const RightArea = styled('div')(({ theme }) => ({
  width: '45%',
  display: 'flex',
  justifyContent: 'space-around',
  fontFamily: 'Aldrich-Regular',

  '& .data': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.primary.main,
    fontSize: '20px',

  },

  span: {
    fontSize: '12px',
    fontFamily: 'arial',
    color: theme.palette.text.secondary,
  }

}))

export const Operation = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

  a :{
    color : 'white'
  }

}))

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  border: '1px solid',
  borderColor: theme.palette.secondary.main,
  borderRadius: '40px',
  boxShadow: 'none',
  padding:'5px 27px',

  '&:hover': {
    backgroundColor: theme.palette.background.paper,

  },
}))
