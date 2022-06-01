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

const Wrapper = styled('div')`
  width: 100%;
  min-height: 100vh;
  text-align: center;
font-family: Kanit-Regular;

`
const BackgroundImage = styled('div')`
  height: 420px;
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
  width: 75%;
  height: 160px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;

`

const DataColumn = styled('div')`
  max-width: 200px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 27%;


  span {
    color: #ffffff;
    font-family: Aldrich-Regular;
    font-size: 40px;
  }
  .label {
    color: #999999;
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
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 32px;
    height: 32px;

  }
  
  :hover {
    transition: all .5s;
    width: 100%;
    height: 100%;
    opacity: .8;
  }
`

const UserAvatar = styled('div')`
  position: absolute;
  top: 80%;
  width: 128px;
  height: 128px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  
  
  :hover {
    opacity: .8;
    cursor: pointer;
  }
  
`

const UserInfo = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  margin-top: 70px;

  .amount {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 18px;
    margin-top: 20px;
    font-family: Aldrich-Regular;
  }
  
    .username {
      font-size: 30px;
      color: ${({ theme }) => theme.palette.text.primary};
      font-weight: bolder;
      display: flex;
      align-items: center;
      position: relative;

      img {
        margin-left: 10px;
        width: 20px;
        cursor: pointer;
        position: absolute;
        right: -30px;
      
      }
    }

    .address {
      font-size: 18px;
      color: ${({ theme }) => theme.palette.grey[400]};
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

const TabsWrapper = styled('div')`
  width: 100vw;
  position: relative;
  margin-top: 80px;
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
    <TabsWrapper >
      <Box sx={{ borderBottom: '1px #5000B4 solid', width:'auto' }}>
        <StyledTabs
          variant={isMobile ? 'scrollable' : 'standard'}
          centered={isMobile ? false : true}
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"

        >
          {/*<StyledTab label="Avatar" />*/}
          <StyledTab label="DePainter" />
          <StyledTab  label="CO-NFT"  />
          <StyledTab label="NFTs" />
          {/*<StyledTab label="Post" />*/}
          {/*<StyledTab label={followingCount ? `Following(${followingCount[0]}) ` : 'Following()'} />*/}
          {/*<StyledTab label={followingCount ? `Followers(${followingCount[1]}) ` : 'Followers()'} />*/}

        </StyledTabs>

      </Box>

      <Box>
        {/*<TabPanel index={0} value={value}>*/}
        {/*  <CharacterCustomize artistId={'3312'} />*/}
        {/*</TabPanel>*/}
        <TabPanel index={0} value={value}>
          <TabsArea>
            <Box sx={{ maxWidth:'1500px', width:'80%' }}>
              <Identity />
            </Box>
          </TabsArea>
        </TabPanel>
        <TabPanel index={1} value={value}>
          <TabsArea>
            <Box sx={{ maxWidth:'1500px', width:'80%' }}>
              <UserCoNftList list={mintedNft} />
            </Box>
          </TabsArea>

        </TabPanel>

        <TabPanel index={2} value={value}>
          <TabsArea>
            <Box sx={{ maxWidth:'1500px', width:'80%' }}>
              <UserOwnedNfts />
            </Box>

          </TabsArea>

        </TabPanel>

        <TabPanel index={3} value={value}>
          <TabsArea >
            <Box sx={{ maxWidth:'1500px', width:'80%' }}>
              <UserPost />
            </Box>
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
  )
}

const PersonalCenterPage: React.FC = () => {

  const { openModal } = useModal()
  const [loading, setLoading] = useState<boolean>(true)

  const { data: credit } = useUserCredit()
  const { data: userInfo } = useGetUserInfo()

  return (
    <Wrapper>
      <PersonalCenterContainer>
        <BackgroundImage>
          {/*<UserInfoContainer>*/}
          {/*  <DataColumn>*/}
          {/*    <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>*/}
          {/*    <div className={'label'}>Intergal</div>*/}
          {/*  </DataColumn>*/}

          {/*  <DataColumn>*/}
          {/*    <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>*/}
          {/*    <div className={'label'}>Post</div>*/}
          {/*  </DataColumn>*/}

          {/*{*/}
          {/*  loading ?*/}
          {/*    <Skeleton sx={{ backgroundColor: '#0e1833' }} animation={'wave'} variant={'rectangular'} width={'100%'} height={'100%'} />*/}
          {/*    :*/}
          {/*    <img src={userInfo?.banneruri} />*/}
          {/*}*/}

          <Image width={'100%'} height={'100%'} src={userInfo?.banneruri ? `${userInfo?.banneruri}?a=${userInfo?.updateTime}` : Background} variant={'rectangular'} />

          <UserAvatar  onClick={() => openModal(<UserProfileSetting userInfo={userInfo} />)}>
            <CoverMask > <img src={SettingIcon} /> </CoverMask>
            <img src={userInfo?.avataruri ? `${userInfo?.avataruri}?a=${userInfo?.updateTime}` : AvatarIcon} />
          </UserAvatar>

        </BackgroundImage>

        <UserInfo>
          <div className="username">{userInfo?.username}</div>
          <div className="address">{ userInfo?.slogan }</div>
          <div className="amount">$FTA: {credit?.retain ?? '0'}</div>
        </UserInfo>

        {/*  <DataColumn>*/}
        {/*    <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>*/}
        {/*    <div className={'label'}>Followers</div>*/}
        {/*  </DataColumn>*/}

        {/*  <DataColumn>*/}
        {/*    <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>*/}
        {/*    <div className={'label'}>Following</div>*/}
        {/*  </DataColumn>*/}
        {/*</UserInfoContainer>*/}

      </PersonalCenterContainer>
      <TabsContainer />
    </Wrapper>
  )
}

export default PersonalCenterPage
