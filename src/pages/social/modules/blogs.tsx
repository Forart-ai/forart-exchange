import React from 'react'
import { Avatar, styled } from '@mui/material'

const BlogsContainer = styled('div')`
  height: 270px;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  padding: 30px;
  border-radius: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`

const Blogs:React.FC = () => {
  return (
    <BlogsContainer>
      <StyledAvatar  variant={'square'}>N</StyledAvatar>
    </BlogsContainer>
  )
}

export default Blogs
