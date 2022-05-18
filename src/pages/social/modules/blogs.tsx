import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, IconButton, styled, SvgIcon, TextField, Typography } from '@mui/material'
import CoNftCard from './CoNftCard/coNftCard'
import { PostListItem, ReplyPostRequest } from '../../../types/social'
import Flex from '../../../contexts/theme/components/Box/Flex'
import moment from 'moment'
import { Heart_Outline } from '../../../contexts/svgIcons'
import CONFT_API from '../../../apis/co-nft'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { SOCIAL_API } from '../../../apis/auth'
import Text from '../../../contexts/theme/components/Text/Text'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import useDebounce from '../../../hooks/useDebounce'

const BlogsContainer = styled('div')`
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
  const { account } = useSolanaWeb3()
  const token = Cookies.get('USER_TOKEN')
  const [userInfo, setUserInfo] = useState<any>(undefined)

  const [value, setValue] = useDebounce('',100)

  const replyRequest: ReplyPostRequest = {
    wallet: account?.toBase58(),
    post:item.id,
    replyTo: item.wallet,
    wysiwyg: value
  }

  const handleLike = useCallback((postId: string) => {
    if (!account) {
      return
    }
    SOCIAL_API.StarPost({ wallet:account.toBase58(), post:postId }).then(res => {
      console.log(res)
    })

  },[account, item])

  useEffect(() => {
    if (token) {
      setUserInfo(jwt_decode(token))
    }

  }, [token,account])

  const onKeyPress = (key: any) => {

    if (key.key === 'Enter'){
      console.log('value', replyRequest)
      SOCIAL_API.ReplyPost(replyRequest).then(res => {
        console.log(res)
      })
    }
  }

  return (
    <BlogsContainer>
      <Flex width={'100%'}  borderBottom={'1px #8246F5 solid'}   >
        <StyledAvatar src={item?.avatar} variant={'square'} />
        <UserInfoRow>
          <Text color={'primary.light'} fontSize={22}>{item?.username}</Text>
          <CoNftCard nftDetail={item?.detail} />

          <Flex width={'100%'} mt={'20px'} alignItems={'center'} justifyContent={'space-between'}>
            <DateText>{ moment(item.createAt).format('MMMM'+' DD,'+ ' YYYY' )}</DateText>

            <Flex alignItems={'center'}>
              <span> {item?.starCount}</span>
              <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleLike(item?.id)}>
                <SvgIcon style={{ cursor:'pointer' }}  >
                  <path fill="currentColor" d={Heart_Outline} />
                </SvgIcon>
              </IconButton>

            </Flex>
          </Flex>
        </UserInfoRow>
      </Flex>

      <Flex alignItems={'center'} width={'100%'}>
        <Avatar src={userInfo?.avataruri} variant={'circular'}>N</Avatar>
        <CommentTextField
          placeholder={'Say something today'}
          fullWidth
          onChange={e => {
            setValue(e.target.value)
          }}
          onKeyPress={e => onKeyPress(e)}
        />
      </Flex>
    </BlogsContainer>
  )
}

export default Blogs
