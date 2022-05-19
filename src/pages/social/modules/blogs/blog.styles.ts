import { Avatar, styled, TextField, Typography } from '@mui/material'

export const BlogsContainer = styled('div')`
  min-height: 300px;
  border: 1px ${({ theme }) => theme.palette.secondary.main} solid;
  background-color: ${({ theme }) => theme.palette.background.paper} ;
  border-radius: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  
`

export const UserInfoRow = styled('div')`
  display: flex;
  width: calc(100% - 64px);
  flex-direction: column;
  font-family: Kanit-Regular;
  color: white;
  font-size: 20px;
  margin-left: 30px;
  justify-content: space-between;
  height: 100%;
  
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
