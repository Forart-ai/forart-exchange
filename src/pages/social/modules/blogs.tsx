import React, { useEffect, useState } from 'react'
import { Avatar, styled, TextField, Typography } from '@mui/material'
import CONFTDetail from '../../nftDetail/coNftDetail'
import CoNftCard from './CoNftCard/coNftCard'
import { usePostQuery } from '../../../hooks/queries/usePostQuery'
import { useLocationQuery } from '../../../hooks/useLocationQuery'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { PostListItem } from '../../../types/social'
import Flex from '../../../contexts/theme/components/Box/Flex'
import moment from 'moment'
import Text from '../../../contexts/theme/components/Text/Text'
import StyledTextField from '../../../contexts/theme/components/TextField'

const BlogsContainer = styled('div')`
  min-height: 300px;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  border-radius: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  
`

const UserInfoRow = styled('div')`
  display: flex;
  width: calc(100% - 64px);
  flex-direction: column;
  font-family: Kanit-Regular;
  color: white;
  font-size: 20px;
  margin-left: 10px;
  
`

const StyledAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  border-radius: 10px;
`

const DateText = styled(Typography)`
font-family: Kanit-Light;
  font-size: 14px;
  color: #999999;
`

const CommentTextField = styled(TextField)`
  
   .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-width: 0;
    border-color: transparent; 
  }

  

   .MuiOutlinedInput-notchedOutline {
     border: none;
   
  }

  
`

const Blogs:React.FC<{item: PostListItem}> = ({ item }) => {

  return (
    <BlogsContainer>
      <Flex width={'100%'}  borderBottom={'1px #4fc89f solid'}   >
        <StyledAvatar variant={'square'}>N</StyledAvatar>
        <UserInfoRow>
          <span>{item?.username}</span>
          <CoNftCard nftDetail={item?.detail} />

          <Flex width={'100%'} mt={'20px'}>
            <DateText>{ moment(item.createAt).format('MMMM'+' DD,'+ ' YYYY' )}</DateText>
          </Flex>
        </UserInfoRow>
      </Flex>
      <Flex alignItems={'center'} width={'100%'}>
        <Avatar variant={'circular'}>N</Avatar>
        <CommentTextField placeholder={'Say something today'}   fullWidth  id="fullWidth"  />
      </Flex>
    </BlogsContainer>
  )
}

export default Blogs
