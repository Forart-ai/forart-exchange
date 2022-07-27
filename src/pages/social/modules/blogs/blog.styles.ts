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
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeInUp;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .fadeInUp {
    animation-name: fadeInUp;
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

export const StyledAvatar = styled('div')`
  width: 64px;
  height: 64px;
  position: relative;
  
  img{
    width: 100%;
    height: 100%;
    border-radius: .3rem;
  }

  &:hover   {
   .card {
     left: 78px;
     visibility:visible;
     opacity: 1;
   }
  }

`
export const Card = styled('div')`
  color: #666;
  position: absolute;
  font-family: sans-serif;
  left: 0;
  bottom: -50%;
  height: 120px;
  width: 400px;
  z-index: 1;
  border-radius: 2px;
  background-color: #11002c;
    // border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: .4rem;
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  -o-transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  -webkit-transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  -moz-transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
  box-shadow: 5px 5px 5px #440085;


  :before {
    content: '';
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 5px solid #11002c;
    border-bottom: 5px solid transparent;
    position: absolute;
    bottom: 50px;
    left: -5px;
  }
`

export const CardContent = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    span {
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  }


  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    z-index: 1;
    border-radius: 50%;
  }

  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 300px;
    background: #5000B4;
    position: absolute;
    left: -30px;
    transform: rotate(-30deg); 
    z-index: 0;
    
   
  }
  
`

export const TagsContainer = styled('div')`
  border: 1px ${({ theme }) => theme.palette.secondary.main} solid;
  border-radius: .3rem;
  background-color: rgba(47, 9, 115, 0.58);
  padding: 2px 6px;
  min-width: 50px;
  margin: 10px 10px 10px 0;
  color: white;
  font-size: 12px;
  white-space: nowrap;
`

export const FollowButton = styled('div')`
  border: 1px rgb(120, 48, 255) solid;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  font-size: 12px;
  color: #ffffff;
  background-color: rgba(130, 70, 245, 0.08);
  border-radius: 30px;
`

export const ProfileCard = styled('div')`
 
 
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
