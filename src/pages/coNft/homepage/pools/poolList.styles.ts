import { Button, styled } from '@mui/material'

export const PoolsContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

export const PoolListContainer = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
`

export const PoolsCardContainer = styled('div')(({ theme }) => ({
  width: '322px',
  height: '480px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection:'column',
  alignItems: 'center',
  borderRadius: '10px',
  background: theme.palette.background.default,
  position: 'relative',
}))

export const ImageContent = styled('div')`
  width: 90%;
  height: 60%;
  z-index: 1;
  display: flex;
  justify-content: center; 
 
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;

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
  fontSize: '1.4rem',
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.text.primary,
  height: '20%',

  '& .pool-name': {
    fontFamily: 'arial',

  },

  '& .likes-value': {
    fontFamily: 'Aldrich-Regular',
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
      borderRadius: '5px',
      objectFit: 'cover',

    }
  },

  '& .owner': {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
    fontSize: '.8rem',

    span: {
      color: theme.palette.text.primary,
      fontSize: '1.28rem',
    }
  }
}))

export const RightArea = styled('div')(({ theme }) => ({
  width: '45%',
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '1.2rem',
  fontFamily: 'Aldrich-Regular',

  '& .data': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },

  span: {
    fontSize: '.66rem',
    fontFamily: 'arial',
    color: theme.palette.text.secondary,
  }

}))

export const Operation = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',

}))

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  border: '1px solid',
  borderColor: theme.palette.secondary.main,
  borderRadius: '40px',
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: theme.palette.background.paper,

  },
}))
