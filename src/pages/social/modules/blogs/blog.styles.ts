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
