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
   color:#666;
   position:absolute;
   font-family:sans-serif;
   left:0;
  bottom: -50%;
   height: 120px;
   width: 330px;
   z-index: 1;
   border-radius:2px;
  background-color: #11002c;
  // border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: .4rem;
   cursor: pointer;
   visibility:hidden;
   opacity:0;
   -o-transition:all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
   -webkit-transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
   -moz-transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
   transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;


   :before {
     content:'';
     width: 0;
     height: 0;
     border-top: 5px solid transparent;
     border-right: 5px solid #11002c;
     border-bottom: 5px solid transparent;
     position:absolute;
     bottom:50px;
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
