import React, { useState } from 'react'
import { ReplyListItem, ReplyPostRequest, UserPostReplyListQueryParams } from '../../../../types/social'
import Flex from '../../../../contexts/theme/components/Box/Flex'
import Text from '../../../../contexts/theme/components/Text/Text'
import moment from 'moment'
import { BlogsContainer, StyledAvatar, UserInfoRow, DateText, CommentTextField } from '../blogs/blog.styles'
import DefaultPageWrapper from '../../../../components/default-page-wrapper'
import { usePostReplyQuery } from '../../../../hooks/queries/usePostReplyQuery'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'
import { styled } from '@mui/material'
import { usePostDetailQuery } from '../../../../hooks/queries/usePostDetailQuery'
import Blogs from '../blogs/blogs'
import { MainMessageArea, SocialPageWrapper } from '../home'
import { Helmet } from 'react-helmet'
import { useHistory, useLocation } from 'react-router-dom'

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
  const history = useHistory()

  const { data: replyList } = usePostReplyQuery({
    size,
    current,
    post: postId!,
    replyTo: '4zhqncVayPZmk47u7WASHRy1UVn6ijdTqbAxgk1MVU6s',
    orders: [{ field:'', order:'' }],
    wallet: '',
    createDay: undefined
  })

  console.log(`${process.env.REACT_APP_SITE_URL + history.location.pathname + history.location.search}`)

  return (

    <>
      <Helmet >
        <meta property="og:title" content="Forart - social co-nft2" />
        <meta
          property="og:description"
          content="Forart - monica yehhhh"
        />
        <meta property="og:url" content={'http://localhost:3000/social/post?id=CMN8qqLutGUnss4xhyYbA7YoLrGbVLrcHQ1JwzwfKKgM_1653637957950'} />
        <meta property="og:image" content={postDetail?.detail?.previewUrl} />
        <meta property="og:site_name" content="Forart" />
        <meta
          name="twitter:site"
          content="@momosama_404"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta name="twitter:creator" content="@momosama_404" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Forart - NFT SaaS For Social"
        />

        <body>
          {
            replyList?.map((item, index) => (
              <ReplyContainer key={index}>
                <Flex height={'100%'} width={'100%'} justifyContent={'space-between'} flexDirection={'column'} >
                  <UserInfoRow>
                    <StyledAvatar src={item?.avatar} variant={'square'} />

                    <Text ml={20} color={'primary.light'} fontSize={22}>{item?.username}</Text>

                  </UserInfoRow>

                  <Text color={'secondary.light'} fontSize={18}> {item?.wysiwyg} </Text>

                </Flex>
                <DateText>{ moment(item.createAt).format('MMMM'+' DD,'+ ' YYYY' )}</DateText>

              </ReplyContainer>
            ))
          }
        </body>
      </Helmet>
      {postDetail && <Blogs item={postDetail} />}

    </>

  )
}

export default ReplyList
