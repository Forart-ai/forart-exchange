import React, { useState } from 'react'
// @ts-ignore
import { Empty, TabPaneProps } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from '../../utils'
import NFTListItem from '../../components/NFTListItem'
import { NftListItem } from '../../types/NFTDetail'
import { useMintResultQuery } from '../../hooks/queries/useMintResultQuery'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { MintedNFTItem } from '../../types/coNFT'
import MintListItem from './components/mintListItem'
import { Box, styled, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import Background from '../../assets/images/home/default-user-background.webp'
import AvatarIcon from '../../assets/images/coPools/rocket.png'
import { ArtDetail } from '../coNft/artistdetail/modules/artistIntroduction'
import UserCoNftList from './modules/userCoNftList'
import CharacterCustomize from './modules/characterCustomize'
import UserOwnedNfts from './modules/userOwnedNfts'
import Identity from './modules/identity'
import SettingIcon from '../../assets/images/siderIcon/setting.svg'
import { useModal } from '../../contexts/modal'
import UserProfileSetting from './components/user-profile-setting'
import { useUserCredit } from '../../hooks/queries/useUserCredit'

const Wrapper = styled('div')`
  width: 100%;
  min-height: 100vh;
  text-align: center;


`
const BackgroundImage = styled('div')`
  height: 400px;
  width: 100%;
  background: url(${Background}) center  no-repeat;
  background-size: cover;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 150px;


  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 60px 0;
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
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


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

const UserInfo = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: -50%;
  
  .amount {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 18px;
    font-family: Aldrich-Regular;
  }

  .avatar {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    box-shadow: 5px 5px 5px rgba(43, 10, 79, 0.62);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }


  .username {
    font-size: 30px;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: bolder;
    display: flex;
    align-items: center;
    
    img {
      margin-left: 10px;
      width: 20px;
      cursor: pointer;
    }
  }

  .address {
    font-size: 18px;
    color: ${({ theme }) => theme.palette.grey[400]};
  }
`

const TabsWrapper = styled('div')`
  width: 100vw;
  position: relative;
  margin-top: 50px;
`

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  variant?: 'scrollable' | 'standard';
  centered?: boolean
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  '& .MuiTabs-indicator': {

    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {

    // maxWidth: 40,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}))

interface StyledTabProps {
  label: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}

    >
      {value === index && (

        <div  >
          {children}
        </div>

      )}
    </div>
  )
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  fontFamily: 'arialBold',
  textTransform: 'none',
  fontSize: '20px',
  margin:'0 40px',

  marginRight: theme.spacing(1),
  color:theme.palette.secondary.main,

  '&.Mui-selected': {
    color:theme.palette.primary.main,
  },
}))

const TabsContainer: React.FC = () => {
  const { account: SolAccount } = useSolanaWeb3()

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { data: mintedNft } = useMintResultQuery({ wallet: SolAccount?.toBase58(), nft:'' } )

  const [value, setValue] = React.useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
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
          <StyledTab label="Painter" />
          <StyledTab  label="CO-NFT"  />
          <StyledTab label="NFTs" />
          {/*<StyledTab label="Post" />*/}
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
      </Box>

    </TabsWrapper>
  )
}

const PersonalCenterPage: React.FC = () => {

  const { account } = useSolanaWeb3()

  const { data: credit } = useUserCredit()

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

          <DataColumn>
            <UserInfo>
              <div className={'avatar'}>
                <img src={AvatarIcon} />
              </div>
              <div className="username">DePainter
                {/*<img src={SettingIcon} onClick={() => openModal(<UserProfileSetting />)} /> */}
              </div>
              <div className="address">{ shortenAddress(account?.toString()) }</div>
              <div className="amount">$FTA: {credit?.retain ?? '0'}</div>
            </UserInfo>
          </DataColumn>

          {/*  <DataColumn>*/}
          {/*    <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>*/}
          {/*    <div className={'label'}>Followers</div>*/}
          {/*  </DataColumn>*/}

          {/*  <DataColumn>*/}
          {/*    <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>*/}
          {/*    <div className={'label'}>Following</div>*/}
          {/*  </DataColumn>*/}
          {/*</UserInfoContainer>*/}
        </BackgroundImage>

      </PersonalCenterContainer>
      <TabsContainer />

    </Wrapper>
  )
}

export default PersonalCenterPage
