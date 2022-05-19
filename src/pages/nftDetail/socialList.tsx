import React from 'react'
import { ReplyListItem } from '../../types/social'
import Flex from '../../contexts/theme/components/Box/Flex'
import Text from '../../contexts/theme/components/Text/Text'
import moment from 'moment'
import { BlogsContainer, StyledAvatar, UserInfoRow, DateText, CommentTextField } from '../social/modules/blogs/blog.styles'
import DefaultPageWrapper from '../../components/default-page-wrapper'

const SocialList: React.FC= () => {

  return (
    <DefaultPageWrapper>
      <span>sdsd</span>
      <span>sdsd</span>

      <span>sdsd</span>

      <span>sdsd</span>

      <span>sdsd</span>

      <span>sdsd</span>

      <span>sdsd</span>

    </DefaultPageWrapper>
  /*   <BlogsContainer>
      <Flex width={'100%'}  borderBottom={'1px #8246F5 solid'}   >
        <StyledAvatar src={item?.avatar} variant={'square'} />
        <UserInfoRow>
          <Text color={'primary.light'} fontSize={22}>{item?.username}</Text>

          <Flex width={'100%'} mt={'20px'} alignItems={'center'} justifyContent={'space-between'}>
            <DateText>{ moment(item.createAt).format('MMMM'+' DD,'+ ' YYYY' )}</DateText>

          </Flex>
        </UserInfoRow>
      </Flex>

    </BlogsContainer>*/

  )
}

export default SocialList
