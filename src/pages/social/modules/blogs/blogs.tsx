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
import useDebounce from '../../../../hooks/useDebounce'
import { useRefreshController } from '../../../../contexts/refresh-controller'
import WalletSelectionModal from '../../../../components/wallet/WalletSelectionModal'
import { useModal } from '../../../../contexts/modal'
import { useEnqueueSnackbar } from '../../../../contexts/theme/components/Snackbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { BlogsContainer, StyledAvatar, UserInfoRow, DateText, CommentTextField } from './blog.styles'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'
import { Helmet } from 'react-helmet'
import CustomizeButton from '../../../../contexts/theme/components/Button'
import { Link } from 'react-router-dom'
import BlogsOperationMenu from '../../../personal/modules/blogsOperationMenu'

const Blogs:React.FC<{item: PostListItem}> = ({ item }) => {
  const { account } = useSolanaWeb3()
  const [heartStatus, setHeartStatus] = useState<'up' | 'down'>('down')
  const [heartNum, setHeartNum] = useState<number>(item.starCount ?? 0)
  const enqueueSnackbar = useEnqueueSnackbar()
  const navigate = useNavigate()
  const location = useLocation()

  const postId = useLocationQuery('id')

  const { forceRefresh } = useRefreshController()
  const { openModal } = useModal()

  const [value, setValue] = useDebounce('',100)

  const redirectToPostDetail = useCallback(

    () => {
      if (location.pathname.includes('/social')) {
        navigate(`/social/post?id=${item.id}`,{ replace: true, })
        return
      }
      else
        navigate(`/social/post?id=${item.id}`,{ replace: true })
      return
    },
    [navigate],
  )

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

  const onKeyPress = (key: any) => {
    if (key.key === 'Enter'){
      SOCIAL_API.ReplyPost(replyRequest).then(() => {
        enqueueSnackbar('Comment successfully', 'Success',{ variant: 'success' })
        forceRefresh()
      })
    }
  }

  const followUser = useCallback(blogUserId => {
    if (!account) { return}
    SOCIAL_API.followUser({ follow: blogUserId, follower: account?.toBase58() }).then(res => {
      enqueueSnackbar('Follow successfully', 'Success',{ variant: 'success' })
    })
  },
  [account],
  )

  return (

    <BlogsContainer>

      <Flex width={'100%'} flexDirection={'column'}    >
        <UserInfoRow>
          <Flex alignItems={'center'}>
            <Link to={`/account?userWalletAccount=${item.wallet}`}>
              <StyledAvatar src={`${item?.avatar}?a=${item.updateTime}`} variant={'square'} />
            </Link>
            <Text ml={20} color={'primary.light'} fontSize={22}>{item?.username}</Text>
          </Flex>
          <>
            {/*<CustomizeButton onClick={() => followUser(item.wallet)} disableElevation size={'small'} sx={{ borderRadius:'20px' }} color={'secondary'} variant={'contained'}>Follow</CustomizeButton>*/}
            <BlogsOperationMenu item={item} />
          </>
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

            <IconButton color="secondary" onClick={redirectToPostDetail}   style={{ marginLeft:'10px' }}>
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
            <Avatar src={item?.avatar} variant={'circular'}>N</Avatar>
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
