import React from 'react'
import Post from './post'
import SocialIndex from './socialIndex'
import DefaultPageWrapper from '../../components/default-page-wrapper'
import Background from '../../assets/images/social/social-banner.png'
import { Avatar, Box, styled, TextareaAutosize, TextField } from '@mui/material'
import RainbowButton from '../../contexts/theme/components/RainbowButton'
import StyledTextField from '../../contexts/theme/components/TextField'
import Button from '@mui/material/Button'
import Blogs from './modules/blogs'

const SocialPageWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 60px 0;

`

const MainMessageArea = styled('div')`
  width: 60%;
  max-width: 820px;
  height: auto;
`

const Header = styled('div')`
  width: 100%;
  height: 410px;
  background: url(${Background}) no-repeat;
  border-radius: 20px;
  margin-bottom: 30px;
`

const PostArea = styled('div')`
  width: 100%;
  height: 270px;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px;
  
  &:focus {
    //border: ;
    outline: 1px ${({ theme }) => theme.palette.secondary.main} solid;
  }
`

const NftChatroom: React.FC = () => {
  return (
    <DefaultPageWrapper>
      <SocialPageWrapper>
        <MainMessageArea>
          <Header />

          <PostArea>
            <RainbowButton> Show CO-NFT </RainbowButton>
            <StyledTextarea minRows={5}  onChange={() => {}} placeholder={'something to say?'}  />
            <Button variant={'contained'}> Post </Button>
          </PostArea>

          {
            <Blogs />
          }
        </MainMessageArea>
      </SocialPageWrapper>
    </DefaultPageWrapper>
  )
}

export default NftChatroom
