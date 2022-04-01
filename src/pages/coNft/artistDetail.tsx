import React from 'react'
import styled from 'styled-components'
import AllNftContainer from './allNftContainer'

import ArtistInfo from './artistInfo'
import { ArtDetail } from './artistIntroduction'
import { Tab, Tabs, ThemeProvider } from '@mui/material'
import ForartTheme from '../../contexts/theme/config/dark'
import NftCreate from './nftCreate'

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    centered:boolean
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#FF468B',
  },
})

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  // textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.2rem',
  marginRight: 10,
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#FF468B',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#FF468B',
  },
}))

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
        <div>{children}</div>
      )}
    </div>
  )
}

export type KitProperties = {
  id: number
  url: string,
  price: number,
  rarity: number,
  remain: number
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 0 0 60px 0;
  min-height: 100vh;
 
  
 @media screen and (max-width: 1080px) {
   height: 100%;
   padding: 0 10px;
   overflow: scroll;
 }  
`

const ContentArea = styled.div``

// const StyledTab = styled(Tabs)`
//   width: 100%;
//   user-select: none;
//   display: flex;
//   justify-content: center;
//
//   .ant-tabs-tab {
//     font-size: 1.7em;
//     color: #E5E8EB !important;
//     font-family: 'inter-extraBold';
//     padding: 0;
//   }
//
//   .ant-tabs-nav-list {
//     border: 1px rgb(36,24,47) solid;
//     border-radius: 30px;
//   }
//
//   ant-tabs-tab ant-tabs-tab-active {
//     padding: 0;
//   }
//
//   .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
//     color: #ffffff !important;
//     border-radius: 25px;
//     background-color: #E42575;
//     span {
//       margin: 5px 10px;
//     }
//   }
//
//
//   .ant-tabs-nav-wrap {
//     display: flex;
//     justify-content: center;
//
//   }
//
//   .ant-tabs-nav::before {
//     display: none; !important;
//
//   }
//
//   .ant-tabs-ink-bar {
//     display: none;
//   }
//
//   @media screen and (max-width: 1080px) {
//     .ant-tabs-tab {
//       font-size: 14px;
//     }
//     .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
//       background-color: #E42575;
//       span {
//         margin: 5px;
//       }
//     }
//   }
// `

const TabArea = styled.div`
  width: 100%;
  min-height: fit-content;
  margin: 30px 0;
  padding: 0 10px;
`

const ArtistDetail: React.FC = () => {

  const [value, setValue] = React.useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <ThemeProvider theme={ForartTheme}>
      <Wrapper>
        <ArtistInfo />
        <TabArea>
          <StyledTabs
            centered={true}
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab   label="Art Detail" />
            <StyledTab  label="Create" />
            <StyledTab  label="ALL NFTs" />
          </StyledTabs>
          {/*<StyledTab defaultActiveKey="mint" onChange={ () => window.scrollTo(0, 0)}  >*/}
          {/*  <TabPane*/}
          {/*    tab= {*/}
          {/*      <span>*/}
          {/*        <SmileOutlined />*/}
          {/*        Art Detail*/}
          {/*      </span>*/}
          {/*    }*/}
          {/*    key="artDetail"*/}
          {/*  >*/}
          {/*    <ArtDetail   />*/}
          {/*  </TabPane>*/}

          {/*  <TabPane*/}
          {/*    tab= {*/}
          {/*      <span>*/}
          {/*        <CrownOutlined />*/}
          {/*        Create*/}
          {/*      </span>*/}
          {/*    }*/}
          {/*    key="mint"*/}
          {/*  >*/}
          {/*    <Mint artistKit = {artistKitList} />*/}
          {/*  </TabPane>*/}

          {/*  <TabPane*/}
          {/*    tab= {*/}
          {/*      <span>*/}
          {/*        <BlockOutlined />*/}
          {/*        All NFTs*/}
          {/*      </span>*/}
          {/*    }*/}
          {/*    key="all"*/}
          {/*  >*/}
          {/*    <AllNftContainer />*/}
          {/*  </TabPane>*/}

          {/*</StyledTab>*/}
        </TabArea>
        <ContentArea  >
          <TabPanel index={0} value={value}>
            <ArtDetail />
          </TabPanel>
          <TabPanel index={1} value={value} >
            <NftCreate  />
          </TabPanel>
          <TabPanel index={2} value={value}>
            <AllNftContainer />
          </TabPanel>
        </ContentArea>
      </Wrapper>
    </ThemeProvider>
  )
}

export default ArtistDetail
