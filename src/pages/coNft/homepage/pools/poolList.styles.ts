import { Button, styled } from '@mui/material'

export const PoolsContainer = styled('div')`
  width: 100%;
  margin: 40px 0;
`

export const PoolListContainer = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 320px);
  justify-content: space-between;
  gap: 10px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: repeat(2, minmax(180px, 42%));
    justify-content: space-between;
  }

  ${({ theme }) => theme.breakpoints.between('sm','md')} {
    grid-template-columns: repeat(2, minmax(240px, 42%));
    justify-content: space-between;
  }

 
`

export const PoolsCardContainer = styled('div')(({ theme }) => ({
  width:'100%',
  height: '480px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection:'column',
  alignItems: 'center',
  borderRadius: '20px',
  background: theme.palette.background.default,
  position: 'relative',
  marginTop: theme.spacing(2.6),
  border: '1px #999999 solid',

  [theme.breakpoints.down('sm')]: {
    height: '360px',
  },

  [theme.breakpoints.between('sm','md')]: {
    height: '420px',
  },

}))

export const ImageContent = styled('div')`
  width: 100%;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;


  img {
    width: 90%;
    height: 90%;
    border-radius: 20px;
    object-fit: cover;
  }
  
  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 220px;

  }

  
`
export const InfoContent = styled('div')`
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;
  z-index: 1;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 10px 10px;
  }
  
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
  },

  [theme.breakpoints.down('sm')]: {
    '& .pool-name': {
      fontSize: '16px',

    },

    '& .likes-value': {
      fontSize: '12px',
    },
  },
}))

export const PoolInfo = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '15px',
}))

export const LeftArea = styled('div')(({ theme }) => ({
  width: '55%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '12px',

  '& .avatar': {
    width: '40%',
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
  },

  [theme.breakpoints.down('sm')]: {
    '& .owner': {
      fontSize: '8px',

      span: {
        fontSize: '12px',
      }
    },
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
  },

  [theme.breakpoints.down('sm')] :{
    '& .data': {
      fontSize: '10px',

    },

    span: {
      fontSize: '8px',
    },
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
