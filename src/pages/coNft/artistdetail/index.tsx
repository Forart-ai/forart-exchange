import React from 'react'
import styled from 'styled-components'
import AllNftContainer from './modules/allNftContainer'

import ArtistInfo from './modules/artistInfo'
import { ArtDetail } from './modules/artistIntroduction'
import { Tab, Tabs, ThemeProvider, useMediaQuery, useTheme } from '@mui/material'
import ForartTheme from '../../../contexts/theme/config/dark'
import NftCreate from './modules/nftCreate'

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

export type KitProperties = {
  id: number
  url: string,
  price: number,
  rarity: number,
  remain: number,
  bodyType: string
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 0 0 60px 0;
  min-height: 100vh;
 
  
 @media screen and (max-width: 1080px) {
   height: 100%;
  
   overflow: scroll;
 }  
`

const ContentArea = styled.div`
 transition: 3s ease;
  padding: 0 10px;

`

const TabArea = styled.div`
  width: 100%;
  min-height: fit-content;
  margin: 30px 0;
  padding: 0 10px;


`

const Index: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

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
  const [value, setValue] = React.useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Wrapper>
      <ArtistInfo />

      <TabArea>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab   label="Art Detail" />
          <StyledTab  label="Create" />
          <StyledTab  label="ALL NFTs" />
        </StyledTabs>

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
  )
}

export default Index
