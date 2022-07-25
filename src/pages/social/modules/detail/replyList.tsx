import React, { useState } from 'react'
import Flex from '../../../../contexts/theme/components/Box/Flex'
import Text from '../../../../contexts/theme/components/Text/Text'
import moment from 'moment'
import { BlogsContainer, StyledAvatar, UserInfoRow, DateText, CommentTextField, ProfileCard } from '../blogs/blog.styles'
import { usePostReplyQuery } from '../../../../hooks/queries/usePostReplyQuery'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'
import { styled } from '@mui/material'
import { usePostDetailQuery } from '../../../../hooks/queries/usePostDetailQuery'
import Blogs from '../blogs/blogs'
import { Helmet } from 'react-helmet'

const ReplyContainer = styled('div')`
  min-height: 200px;
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

const ReplyList: React.FC= () => {

  const [size, setSize] = useState(20)
  const current = parseInt(useLocationQuery('page') ?? '1')
  const postId = useLocationQuery('id')
  const { data: postDetail } = usePostDetailQuery(postId)

  const { data: replyList } = usePostReplyQuery({
    size,
    current,
    post: postId!,
    replyTo: '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
    orders: [{ field:'', order:'' }],
    wallet: '',
    createDay: undefined
  })

  return (

    <>

      {  postDetail && <Blogs item={postDetail} /> }
      monica991123

      {
        replyList?.map((item, index) => (
          <ReplyContainer key={index}>
            <Flex height={'100%'} width={'100%'} justifyContent={'space-between'} flexDirection={'column'} >
              <Flex alignItems={'center'} justifyContent={'flex-start'} width={'100%'} mb={'20px'} fontFamily={'Kanit-Regular'}>
                <StyledAvatar >
                  <img src={item?.avatar} />
                  <ProfileCard>
                    <div>sssdwef</div>
                  </ProfileCard>
                </StyledAvatar>

                <Text ml={20} color={'primary.light'} fontSize={22}>{item?.username}</Text>

              </Flex>

              <Text color={'secondary.light'} fontSize={18}> {item?.wysiwyg} </Text>

            </Flex>
            <DateText>{ moment(item.createAt).format('MMMM'+' DD,'+ ' YYYY' )}</DateText>

          </ReplyContainer>
        ))
      }

    </>

  )
}

export default ReplyList
