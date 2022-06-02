import { Avatar, styled, TextField, Typography } from '@mui/material'

export const BlogsContainer = styled('div')`
  min-height: 300px;
  border: 1px ${({ theme }) => theme.palette.secondary.main} solid;
  background-color: ${({ theme }) => theme.palette.background.paper} ;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  animation-duration: calc(1s * 0.75);
  animation-name: bounceIn;
  
  @keyframes bounceIn {
    from,
    20%,
    40%,
    60%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
      transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
      transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
      transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }


`

export const UserInfoRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: Kanit-Regular;
  margin-bottom: 20px;
  
`

export const StyledAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  border-radius: 10px;
`

export const DateText = styled(Typography)`
  font-family: Kanit-Light;
  font-size: 14px;
  color: #999999;
`

export const CommentTextField = styled(TextField)`
   .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-width: 0;
    border-color: transparent; 
  }
   .MuiOutlinedInput-notchedOutline {
     border: none;
  }
  
`
