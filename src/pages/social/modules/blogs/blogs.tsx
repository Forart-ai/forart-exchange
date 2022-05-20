import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, IconButton, styled, SvgIcon, TextField, Typography } from '@mui/material'
import CoNftCard from '../CoNftCard/coNftCard'
import { PostListItem, ReplyPostRequest } from '../../../../types/social'
import Flex from '../../../../contexts/theme/components/Box/Flex'
import moment from 'moment'
import { Comment_Outline, Heart_Filled, Heart_Outline } from '../../../../contexts/svgIcons'
import { useSolanaWeb3 } from '../../../../contexts/solana-web3'
import { SOCIAL_API } from '../../../../apis/auth'
import Text from '../../../../contexts/theme/components/Text/Text'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import useDebounce from '../../../../hooks/useDebounce'
import { useRefreshController } from '../../../../contexts/refresh-controller'
import WalletSelectionModal from '../../../../components/wallet/WalletSelectionModal'
import { useModal } from '../../../../contexts/modal'
import { useEnqueueSnackbar } from '../../../../contexts/theme/components/Snackbar'
import { useHistory } from 'react-router-dom'
import { BlogsContainer, StyledAvatar, UserInfoRow, DateText, CommentTextField } from './blog.styles'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'

const Blogs:React.FC<{item: PostListItem}> = ({ item }) => {
  const { account } = useSolanaWeb3()
  const token = Cookies.get('USER_TOKEN')
  const [userInfo, setUserInfo] = useState<any>(undefined)
  const [heartStatus, setHeartStatus] = useState<'up' | 'down'>('down')
  const [heartNum, setHeartNum] = useState<number>(item.starCount ?? 0)
  const enqueueSnackbar = useEnqueueSnackbar()
  const history = useHistory()
  const postId = useLocationQuery('id')

  const { forceRefresh } = useRefreshController()
  const { openModal } = useModal()

  const [value, setValue] = useDebounce('',100)

  const replyRequest: ReplyPostRequest = {
    wallet: account?.toBase58(),
    post:item.id,
    replyTo: item.wallet,
    wysiwyg: value
  }

  const handleLike = useCallback(() => {
    if (!account) {
      openModal(<WalletSelectionModal />)
      return
    }

    if (item.id && heartStatus === 'down') {
      setHeartNum(prev => prev + 1)
      setHeartStatus('up')

      setTimeout( ()=> SOCIAL_API.StarPost({ wallet: account.toBase58(), post: item.id }).then(res => {
        console.log('up')
        return
      }), 1000)

    }
    if (item.id && heartStatus === 'up') {
      setHeartNum(prev => prev - 1)
      setHeartStatus('down')
      setTimeout( ()=> SOCIAL_API.UndoStarPost({ wallet: account.toBase58(), post: item.id }).then(res => {
        console.log('down')
        return
      }), 1000)
    }

  },[account, item, heartStatus])

  useEffect(() => {
    if (token) {
      setUserInfo(jwt_decode(token))
    }

  }, [token,account])

  const onKeyPress = (key: any) => {
    if (key.key === 'Enter'){
      console.log('value', replyRequest)
      SOCIAL_API.ReplyPost(replyRequest).then(() => {
        enqueueSnackbar('User created', 'Success',{ variant: 'success' })
        forceRefresh()
      })
    }
  }

  return (
    <BlogsContainer>
      <Flex width={'100%'} flexDirection={'column'}    >
        <UserInfoRow>
          <StyledAvatar src={item?.avatar} variant={'square'} />
          <Text ml={20} color={'primary.light'} fontSize={22}>{item?.username}</Text>
        </UserInfoRow>

        <CoNftCard nftDetail={item?.detail} />

        <Flex width={'100%'} mt={'20px'} alignItems={'center'} justifyContent={'space-between'}>
          <DateText>{ moment(item.createAt).format('MMMM'+' DD,'+ ' YYYY' )}</DateText>
          <Flex  alignItems={'center'}>

            <IconButton color="secondary"  onClick={() => handleLike()}>
              <SvgIcon style={{ cursor:'pointer' }}  >
                {
                  heartStatus === 'up' ?
                    <path fill="currentColor" d={Heart_Filled} /> :
                    <path fill="currentColor" d={Heart_Outline} />
                }
              </SvgIcon>
            </IconButton>
            <Text fontSize={'16px'} color={'#999999'}> {heartNum} </Text>

            <IconButton color="secondary" onClick={()=>history.push(`post?id=${item.id}`)}   style={{ marginLeft:'10px' }}>
              <SvgIcon style={{ cursor:'pointer' }}  >
                <path fill="currentColor" d={Comment_Outline} /> :
              </SvgIcon>
            </IconButton>
            <Text color={'#999999'}> {item.msgCount}</Text>
          </Flex>
        </Flex>
      </Flex>

      {
        postId && (
          <Flex alignItems={'center'} width={'100%'}  borderTop={'1px #8246F5 solid'}>
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
        )
      }

    </BlogsContainer>
  )
}

export default Blogs
