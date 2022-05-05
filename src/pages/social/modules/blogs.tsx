import React from 'react'
import { Avatar, styled } from '@mui/material'
import CONFTDetail from '../../nftDetail/coNftDetail'
import CoNftCard from './CoNftCard/coNftCard'

const BlogsContainer = styled('div')`
  min-height: 300px;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  padding: 20px 10px;
  border-radius: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const StyledAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  border-radius: 10px;
`

const Blogs:React.FC = () => {
  return (
    <BlogsContainer>
      <StyledAvatar variant={'square'}>N</StyledAvatar>
      <CoNftCard nftId={'44d183fa206f0ea97a0a100a8e714d96'} />
    </BlogsContainer>
  )
}

export default Blogs
