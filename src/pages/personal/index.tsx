import React, { useEffect, useState } from 'react'
import { useMintResultQuery } from '../../hooks/queries/useMintResultQuery'
import { Box, Drawer, Skeleton, styled, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import Background from '../../assets/images/home/default-user-background.webp'
import AvatarIcon from '../../assets/images/coPools/rocket.png'
import UserCoNftList from './modules/userCoNftList'
import UserOwnedNfts from './modules/userOwnedNfts'
import Identity from './modules/identity'
import { useModal } from '../../contexts/modal'
import UserProfileSetting from './components/user-profile-setting'
import { useUserCredit } from '../../hooks/queries/account/useUserCredit'
import { useGetUserInfo } from '../../hooks/queries/useGetUserInfo'
import Image from '../../contexts/theme/components/Image'
import { StyledTab, StyledTabs, TabPanel } from './components/styledTabs'
import { FollowersList, FollowsList } from './modules/followersList'
import { useUserFollowingCounts } from '../../hooks/queries/account/useUserFollow'
import UserPost from './modules/userPost'
import Flex from '../../contexts/theme/components/Box/Flex'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import {  useSearchParams, useParams } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'

const Wrapper = styled('div')`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  font-family: Kanit-Regular;

`
const BackgroundImage = styled('div')`
  height: 320px;
  width: 100%;
  display: flex;
  position: relative;
  background-color: rgb(37, 14, 72);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    height: 220px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 140px;
  }
  
`

const PersonalCenterContainer = styled('div')`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;


`

const UserInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1800px;
  margin-top: -40px;
  margin-bottom: 20px;
`

const DataColumn = styled('div')`
  width: 100%;
  display: flex;
  gap: 32px;
`

const DataItem = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 30px;
  
  span {
    color: #ffffff;
    font-size: 20px;
  }
  
  .label {
    color: #999999;
    font-family: Kanit-Light;
    font-size: 16px;
  }
`

const TabsArea = styled('div')`
  display: flex;
  justify-content: center;
  min-height: 50vh;
  padding-bottom: 100px;
`

const CoverMask = styled('div')`
  width: 100%;
  height: 100%;
  background-color: #000c17;
  opacity: 0;
  position: absolute;
  top: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  
  img {
    width: 24px;
    height: 24px;

  }
  
  :hover {
    transition: all .5s;
    width: 100%;
    height: 100%;
    opacity: .4;
  }
`

const UserAvatar = styled('div')`
  max-width: 180px;
  max-height: 180px;
  width: 180px;
  height: 180px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 10px;
  padding: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    max-width: 120px;
    max-height: 120px;
  }



`

const UserInfo = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 30px;

  .amount {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 18px;
    margin-top: 20px;
    font-family: Aldrich-Regular;
  
  }
  
    .username {
      font-size: 30px;
      color: ${({ theme }) => theme.palette.text.primary};
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 1.2px;
    }

    

    ${({ theme }) => theme.breakpoints.down('sm')} {
      .username {
        font-size: 24px;
      }

      .address {
        font-size: 14px;
      }
    }
`

const UserSlogan = styled('div')`
  max-width: 900px;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.grey[400]};
  text-align: left;
  font-family: Kanit-Light;

  ${({ theme }) => theme.breakpoints.down('sm')} {
      font-size: 14px;
  }
`

const TabsWrapper = styled('div')`
  width: 80%;
  max-width: 1800px;
`

const TabsContainer: React.FC = () => {
  const theme = useTheme()
  const { wallet } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()
  let queryTab = searchParams.get('tab')
  queryTab = queryTab ? queryTab : 'co-nft'

  useEffect(() => {
    if (!queryTab) {
      searchParams.set('tab', 'co-nft')
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams, queryTab])

  const [openFollowersDrawer, setOpenFollowersDrawer] = useState<boolean>(false)
  const [openFollowingDrawer, setOpenFollowingDrawer] = useState<boolean>(false)

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { data: followingCount } = useUserFollowingCounts(wallet)
  const { data: mintedNft } = useMintResultQuery({ wallet: wallet, nft:'' } )

  const tabOptions = [
    {
      label: 'DePainter',
      route: 'dePainter'
    },
    {
      label: 'CO-NFT',
      route: 'co-nft'
    },
    {
      label: 'Owned NFT',
      route: 'user-nft'
    },
    // {
    //   label: 'Post',
    //   route: 'post'
    // },
    // {
    //   label: 'Follower ',
    //   route: 'follower'
    // },
    // {
    //   label: 'Following ',
    //   route: 'following'
    // }
  ]

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {

    if (newValue !== 'follower' && newValue !== 'following') {
      searchParams.set('tab', newValue)
      setSearchParams(searchParams)
    }
    if (newValue === 'following') {
      setOpenFollowingDrawer(true)
    }
    if (newValue === 'follower') {
      setOpenFollowersDrawer(true)
    }

  }

  return (

    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <TabsWrapper >
        <StyledTabs
          variant={isMobile ? 'scrollable' : 'standard'}
          value={queryTab}
          onChange={handleChange}
        >
          {
            tabOptions.map((tab,index) => (
              <StyledTab
                key={index}
                label={tab.label}
                value={tab.route}
              />
            ))
          }
        </StyledTabs>

        <Box>

          <TabPanel index={'dePainter'} value={queryTab}>
            <TabsArea>
              <Identity />
            </TabsArea>
          </TabPanel>
          <TabPanel index={'co-nft'} value={queryTab}>
            <TabsArea>
              <UserCoNftList list={mintedNft} />
            </TabsArea>

          </TabPanel>

          <TabPanel index={'user-nft'} value={queryTab}>
            <TabsArea>
              <UserOwnedNfts />

            </TabsArea>

          </TabPanel>

          <TabPanel index={'post'} value={queryTab}>
            <TabsArea >
              <UserPost />
            </TabsArea>
          </TabPanel>

          <TabPanel index={'follower'} value={queryTab} />
          <TabPanel index={'following'} value={queryTab} />

        </Box>

        <Drawer
          anchor={'left'}
          open={openFollowingDrawer}
          onClose={() => setOpenFollowingDrawer(false)}
          sx={{
            '& .MuiDrawer-paper' : {
              backgroundColor:'#0a0213',
              borderBottomRightRadius:'16px',
              borderTopRightRadius:'16px',

            }
          }}
        >
          <FollowsList />
        </Drawer>

        <Drawer
          anchor={'left'}
          open={openFollowersDrawer}
          onClose={() => setOpenFollowersDrawer(false)}
          sx={{
            '& .MuiDrawer-paper' : {
              backgroundColor:'#0a0213',
              borderBottomRightRadius:'16px',
              borderTopRightRadius:'16px',

            }
          }}
        >
          <FollowersList />
        </Drawer>

      </TabsWrapper>
    </Flex>
  )
}

const PersonalCenterPage: React.FC = () => {

  const { wallet } = useParams()

  const { account } = useSolanaWeb3()
  const { openModal } = useModal()

  const { data: credit } = useUserCredit()
  const { data: userInfo, isLoading } = useGetUserInfo(wallet)
  const { data: followingCount } = useUserFollowingCounts(wallet)

  return (
    <Wrapper>
      <PersonalCenterContainer>
        <BackgroundImage>
          {
            userInfo?.banneruri &&
              <Image
                className={'background-image'}
                width={'100%'}
                height={'100%'}
                src={`${userInfo?.banneruri}?a=${userInfo?.updateTime}`}
                variant={'rectangular'}
              />
          }
        </BackgroundImage>

        <UserInfoContainer>
          <UserAvatar>
            {
              wallet === account?.toBase58() &&
              <CoverMask onClick={() => openModal(<UserProfileSetting userInfo={userInfo} />)}>
                <SettingsIcon fontSize={'large'} sx={{ color:'#ffffff' }} />
              </CoverMask>
            }
            {
              userInfo?.avataruri && <Image  width={'100%'} height={'100%'} src={`${userInfo?.avataruri}?a=${userInfo?.updateTime}` } />
            }
          </UserAvatar>
          <UserInfo>
            <div className="username">{userInfo?.username}</div>
            <UserSlogan>{ userInfo?.slogan }</UserSlogan>
            <DataColumn>
              <DataItem>
                <span> {credit?.retain ?? '0'} </span>
                <div className={'label'}>FTA Amount</div>
              </DataItem>

              <DataItem>
                <span> {followingCount ? followingCount[0] : '0'} </span>
                <div className={'label'}>Following</div>
              </DataItem>

              <DataItem>
                <span> {followingCount ? followingCount[1] : '0'} </span>
                <div className={'label'}>Followers</div>
              </DataItem>
            </DataColumn>
          </UserInfo>
        </UserInfoContainer>

      </PersonalCenterContainer>
      <TabsContainer />
    </Wrapper>
  )
}

export default PersonalCenterPage
