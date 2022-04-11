import React, { useState } from 'react'
// @ts-ignore
import {  Empty } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from '../../utils'
import { SmileOutlined, UserOutlined } from '@ant-design/icons'
import { usePersonalNFTsQuery } from '../../hooks/queries/usePersonalNFTsQuery'
import { ChainType } from '../../apis/nft'
import NFTListItem from '../../components/NFTListItem'
import { NftListItem } from '../../types/NFTDetail'
import { useMintResultQuery } from '../../hooks/queries/useMintResultQuery'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { MintedNFTItem } from '../../types/coNFT'
import MintListItem from '../../components/mintListItem'
import { styled, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import Background from '../../assets/images/coPools/hypeteen-background.png'
import AvatarIcon from '../../assets/images/coPools/rocket.png'

const Wrapper = styled('div')`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  border-bottom: 1px ${({ theme }) => theme.palette.secondary.main} solid;

`
const BackgroundImage = styled('div')`
  height: 400px;
  width: 100%;
  background: url(${Background})  no-repeat;
  background-size: cover;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;


  ${({ theme }) => theme.breakpoints.down('md')} {
    margin: 60px 0;
  }
`

const PersonalCenterContainer = styled('div')`
  width: 100%;
  justify-content: center;
  align-items: center;
  
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

const UserInfo = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: -50%;
  width: 100%;

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
  }

  .address {
    font-size: 18px;
    color: ${({ theme }) => theme.palette.grey[400]};
  }
`

const TabsWrapper = styled('div')`
  width: 100%;
`

const NFTListContainer = styled('div')`
  width: 100%;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-template-rows: repeat(auto-fill,  240px);
  grid-gap: 20px;
  padding: 16px;

  .empty {
    padding: 0;
    height: 0;
    width: 210px;
  }
  
  .warning {
    color: #ffffff;
    display: flex;
    justify-content: center;
    font-size: 1.8em;
  }
  
  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
`

const WarningWrapper = styled('div')`
  display: flex;
  justify-content: center;
  .ant-empty-description {
    color: #ffffff;
  }
`

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  // textTransform: 'none',
  fontWeight: 600,
  fontSize: '18px',
  color: 'rgba(255, 255, 255, 0.7)',
  minWidth: '170px',
  minHeight: '42px',
  backgroundColor:'#5000B4',
  borderRadius:'40px',
  margin:'0 20px',
  transition: '.5s ease',

  '&.Mui-selected': {
    color: '#ffffff',
  },
}))

const TabPanelAnimation = styled('div')`
  .anime {
    animation: fadeIn .5s ;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

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
        <TabPanelAnimation  >
          <div className={'anime'} >
            {children}
          </div>
        </TabPanelAnimation>
      )}
    </div>
  )
}

const UserNFTList: React.FC<{ list: Array<NftListItem> | undefined }> = ({ list }) => {

  return (
    <NFTListContainer>
      {
        list?.map((nft: any, index: number) => (

          <NFTListItem data={nft}  type="own" key={index} />
        ))
      }
      {
        new Array(8).fill({}).map((_, index) => (
          <div className="empty" key={index} />
        ))
      }
    </NFTListContainer>
  )
}

const UserMintedNFTList: React.FC<{ list: Array<MintedNFTItem> | undefined  }> = ({ list }) => {

  return (
    <NFTListContainer>
      {
        list?.map((nft: any, index: number) => (
          <MintListItem data={nft} key={index} />
        ))
      }
      {
        new Array(8).fill({}).map((_, index) => (
          <div className="empty" key={index} />
        ))
      }
    </NFTListContainer>
  )
}

const WarningContent: React.FC = () => {

  return (
    <>
      <WarningWrapper>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Wallet not connected'} />
      </WarningWrapper>

    </>
  )
}

const TabsContainer: React.FC = () => {
  const { account } = useWeb3React()

  const { account: SolAccount } = useSolanaWeb3()

  const [current] = useState<number>(1)
  const [searchKey] = useState<any>()

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const [typeChain] = useState<ChainType>('Ethereum')

  const { data: personalNft } = usePersonalNFTsQuery({ current, searchKey, typeChain, account })

  const { data: mintedNft } = useMintResultQuery(true, { wallet: SolAccount?.toBase58(), nft:'' } )

  const [value, setValue] = React.useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const StyledTabs = styled((props: StyledTabsProps) => (

    <Tabs
      variant={isMobile ? 'scrollable' : 'standard'}
      centered={true}
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))(({ theme }) => ({
    '& .Mui-selected': {
      backgroundColor:'#4fc89f',

    },

    '& .MuiTabs-indicator': {
      display:'none',
    },

    '&. MuiTabs-flexContainer': {
      justifyContent:'center'
    }
  }))

  return (
    <TabsWrapper >
      <StyledTabs value={value} onChange={handleChange} />
    </TabsWrapper>

  // <TabsWrapper>
  //   <StyledTab defaultActiveKey="minted"  >
  //     <TabPane
  //       tab= {
  //         <span>
  //           <SmileOutlined />
  //           Created
  //         </span>
  //       }
  //       key="minted"
  //     >
  //       {
  //         SolAccount ?
  //           <UserMintedNFTList list={mintedNft} />
  //           :
  //           <WarningContent />
  //       }
  //
  //     </TabPane>
  //
  //     <TabPane
  //       tab= {
  //         <span>
  //           <SmileOutlined />
  //           Owned
  //         </span>
  //       }
  //       key="owned"
  //     >
  //       {
  //         account ?
  //           <UserNFTList list={personalNft} />
  //           :
  //           <WarningContent />
  //       }
  //
  //     </TabPane>
  //
  //   </StyledTab>
  // </TabsWrapper>
  )
}

const PersonalCenterPage: React.FC = () => {

  const { account } = useSolanaWeb3()

  const intd = '34443'

  return (
    <Wrapper>
      <PersonalCenterContainer>
        <BackgroundImage>
          <UserInfoContainer>
            <DataColumn>
              <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>
              <div className={'label'}>Intergal</div>
            </DataColumn>

            <DataColumn>
              <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>
              <div className={'label'}>Post</div>
            </DataColumn>

            <DataColumn>
              <UserInfo>
                <div className={'avatar'}>
                  <img src={AvatarIcon} />
                </div>
                <div className="username">User</div>
                <div className="address">{ shortenAddress(account?.toString()) }</div>
              </UserInfo>
            </DataColumn>

            <DataColumn>
              <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>
              <div className={'label'}>Followers</div>
            </DataColumn>

            <DataColumn>
              <span>{intd.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') }</span>
              <div className={'label'}>Following</div>
            </DataColumn>
          </UserInfoContainer>
        </BackgroundImage>

        <TabsContainer />

      </PersonalCenterContainer>
    </Wrapper>
  )
}

export default PersonalCenterPage
