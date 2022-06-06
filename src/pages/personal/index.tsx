import React, { useEffect, useState } from 'react'
import { useMintResultQuery } from '../../hooks/queries/useMintResultQuery'
import { Box, Drawer, Skeleton, styled, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import Background from '../../assets/images/home/default-user-background.webp'
import AvatarIcon from '../../assets/images/coPools/rocket.png'
import UserCoNftList from './modules/userCoNftList'
import CharacterCustomize from './modules/characterCustomize'
import UserOwnedNfts from './modules/userOwnedNfts'
import Identity from './modules/identity'
import SettingIcon from '../../assets/images/siderIcon/setting.svg'
import { useModal } from '../../contexts/modal'
import UserProfileSetting from './components/user-profile-setting'
import { useUserCredit } from '../../hooks/queries/useUserCredit'
import { useGetUserInfo } from '../../hooks/queries/useGetUserInfo'
import Image from '../../contexts/theme/components/Image'
import { StyledTab, StyledTabs, TabPanel } from './components/styledTabs'
import { FollowersList, FollowsList } from './modules/followersList'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useUserFollowingCounts } from '../../hooks/queries/useUserFollow'
import UserPost from './modules/userPost'
import DefaultPageWrapper from '../../components/default-page-wrapper'
import Flex from '../../contexts/theme/components/Box/Flex'

const Wrapper = styled('div')`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  font-family: Kanit-Regular;

`
const BackgroundImage = styled('div')`
  height: 320px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 300px;
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
  position: relative;
  top: -140px;
  width: 80%;
  max-width: 1800px;
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
  
  img {
    width: 24px;
    height: 24px;

  }
  
  :hover {
    transition: all .5s;
    width: 100%;
    height: 100%;
    opacity: .8;
  }
`

const UserAvatar = styled('div')`
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


  :hover {
    opacity: .8;
    cursor: pointer;
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
`

const TabsWrapper = styled('div')`
  width: 80%;
  max-width: 1800px;
`

const TabsContainer: React.FC = () => {

  const walletAccount = useLocationQuery('userWalletAccount')

  const [openFollowersDrawer, setOpenFollowersDrawer] = useState<boolean>(false)
  const [openFollowingDrawer, setOpenFollowingDrawer] = useState<boolean>(false)

  const { data: followingCount } = useUserFollowingCounts(walletAccount)

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { data: mintedNft } = useMintResultQuery({ wallet: walletAccount, nft:'' } )

  const [value, setValue] = React.useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue !== 4 && newValue !== 5) {
      setValue(newValue)
    }
    if (newValue === 4) {
      setOpenFollowingDrawer(true)
    }
    if (newValue === 5) {
      setOpenFollowersDrawer(true)
    }
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
      <TabsWrapper >
        <StyledTabs
          variant={isMobile ? 'scrollable' : 'standard'}
          value={value}
          onChange={handleChange}

        >
          {/*<StyledTab label="Avatar" />*/}
          <StyledTab label="DePainter" />
          <StyledTab  label="CO-NFT"  />
          <StyledTab label="NFTs" />
          <StyledTab label="Post" />
          <StyledTab label={followingCount ? `Following(${followingCount[0]}) ` : 'Following()'} />
          <StyledTab label={followingCount ? `Followers(${followingCount[1]}) ` : 'Followers()'} />

        </StyledTabs>

        <Box>
          {/*<TabPanel index={0} value={value}>*/}
          {/*  <CharacterCustomize artistId={'3312'} />*/}
          {/*</TabPanel>*/}
          <TabPanel index={0} value={value}>
            <TabsArea>
              <Identity />
            </TabsArea>
          </TabPanel>
          <TabPanel index={1} value={value}>
            <TabsArea>
              <UserCoNftList list={mintedNft} />
            </TabsArea>

          </TabPanel>

          <TabPanel index={2} value={value}>
            <TabsArea>
              <UserOwnedNfts />

            </TabsArea>

          </TabPanel>

          <TabPanel index={3} value={value}>
            <TabsArea >
              <UserPost />
            </TabsArea>
          </TabPanel>

          <TabPanel index={4} value={value} />
          <TabPanel index={5} value={value} />
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

  const walletAccount = useLocationQuery('userWalletAccount')

  const { openModal } = useModal()

  const { data: credit } = useUserCredit()
  const { data: userInfo, isLoading } = useGetUserInfo(walletAccount)
  const { data: followingCount } = useUserFollowingCounts(walletAccount)

  return (
    <Wrapper>
      <PersonalCenterContainer>
        <BackgroundImage>
          <Image width={'100%'} height={'100%'} src={ `${userInfo?.banneruri}?a=${userInfo?.updateTime}`} variant={'rectangular'} />
        </BackgroundImage>

        <UserInfoContainer>
          <UserAvatar  onClick={() => openModal(<UserProfileSetting userInfo={userInfo} />)}>
            <CoverMask > <img src={SettingIcon} /> </CoverMask>
            <img src={userInfo?.avataruri ? `${userInfo?.avataruri}?a=${userInfo?.updateTime}` : AvatarIcon} />
          </UserAvatar>
          <UserInfo>
            <div className="username">{userInfo?.username}</div>
            <UserSlogan>{ userInfo?.slogan }</UserSlogan>
            {/*<div className="amount">$FTA: {credit?.retain ?? '0'}</div>*/}
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
