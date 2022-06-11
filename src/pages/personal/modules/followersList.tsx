import React, { useEffect, useState } from 'react'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { styled } from '@mui/system'
import Text from '../../../contexts/theme/components/Text/Text'
import CustomizeButton from '../../../contexts/theme/components/Button'
import { useLocationQuery } from '../../../hooks/useLocationQuery'
import { useUserFollowerList, useUserFollowsList } from '../../../hooks/queries/account/useUserFollow'
import { useParams } from 'react-router-dom'

const Wrapper = styled('div')`
  width: 400px;
  font-family: Kanit-Regular;
  
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 80vw;
  }
`

const Header = styled('div')`
  padding: 10px 20px;
`

export const FollowersList:React.FC = () => {
  const { wallet } = useParams()

  const { data: followerList } = useUserFollowerList(wallet)

  return (
    <Wrapper>
      <Header>
        <Text color={'white'} fontSize={28}>Followers</Text>
      </Header>
      <List sx={{ width:'100%',  }} >

        {
          followerList?.map((item, index) => (
            <ListItem key={index}
              alignItems={'center'}
              secondaryAction={(
                <CustomizeButton variant={'contained'} color={'secondary'} size={'small'} sx={{ borderRadius:'20px' }}>Follow</CustomizeButton>
              )}
            >
              <ListItemAvatar>
                <Avatar src={item.followerAvatar} />
              </ListItemAvatar>
              <ListItemText>
                <Text color={'white'} fontFamily={'Kanit-Regular'} fontSize={18}>{item.followerUsername}</Text>
              </ListItemText>
            </ListItem>
          ))
        }
      </List>
    </Wrapper>
  )
}

export const FollowsList: React.FC = () => {
  const { wallet } = useParams()

  const { data: followList } = useUserFollowsList(wallet)

  return (
    <Wrapper>
      <Header>
        <Text color={'white'} fontSize={28}>Followers</Text>
      </Header>
      <List sx={{ width:'100%',  }} >

        {
          followList?.map((item, index) => (
            <ListItem key={index}
              alignItems={'center'}
              secondaryAction={(
                <CustomizeButton variant={'contained'} color={'secondary'} size={'small'} sx={{ borderRadius:'20px' }}>Follow</CustomizeButton>
              )}
            >
              <ListItemAvatar>
                <Avatar src={item.followerAvatar} />
              </ListItemAvatar>
              <ListItemText>
                <Text color={'white'} fontFamily={'Kanit-Regular'} fontSize={18}>{item.followerUsername}</Text>
              </ListItemText>
            </ListItem>
          ))
        }
      </List>
    </Wrapper>
  )
}

