import React from 'react'
import { useMediaQuery } from 'react-responsive'
import ArtistBanner from '../../assets/images/coPools/ticket.png'
import Jacket from '../../assets/images/artistDetail/jacket.webp'
import FaceMask from '../../assets/images/artistDetail/mask.webp'
import Glasses from '../../assets/images/artistDetail/glasses.webp'
import Tatoo from '../../assets/images/artistDetail/tatoo.webp'
import Shoes from '../../assets/images/artistDetail/shoes.webp'
import styled from 'styled-components'
import { Tab, Tabs, ThemeProvider } from '@mui/material'
import ForartTheme from '../../contexts/theme/config/dark'

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    orientation={'vertical'}
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
  // fontWeight: theme.typography.fontWeightRegular,
  // fontSize: theme.typography.pxToRem(15),
  // marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ArtistDetailTab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  
  @media screen and (max-width: 1080px) {
    justify-content: center;
  }
  
`

const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  img {
    width: 100%;
    object-fit: contain;
    border-radius: 1em;
  }
`

const TabItem = styled.div`
  //max-width: calc(100% - 40px);
  height: 100%;
  

  @media screen and (max-width: 1100px) {
    width: 100%;
    max-width: calc(100% - 10px);
  }
`

const TabInfo = styled.div`
  width: 60%;
  padding: 0 40px;
  
  h1 {
    color: #ffffff;
    font-size: 2rem;
    font-family: inter-extraBold;
  }
  
  p {
    color: #A197AA;
    font-size: 1.2rem;
  }
`

const ComponentsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  img {
    margin-bottom: 20px;
    width: 100%;
    border-radius: 20px;
  }
`

export const ArtDetail: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue)
  }

  const scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      // 找到锚点
      const anchorElement = document.getElementById(anchorName)
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) { anchorElement.scrollIntoView({ block: 'center', behavior: 'smooth' }) }
    }
  }

  return (
    <ThemeProvider theme={ForartTheme}>
      <ArtistDetailTab id="a">
        <div style={{ display:'flex', justifyContent:'center',width:'80%' }}>
          <TabItem>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
            >
              <StyledTab label="About" {...a11yProps(0)} />
              <StyledTab label="Equity & Attributes" />
              <StyledTab label="Connections" />

            </StyledTabs>
          </TabItem>
          <TabInfo>
            <TabPanel index={0} value={value}>

              <section className="item"  id="about">
                <h1 > Archive </h1>
                <Banner>
                  <img className="banner" src={ArtistBanner} />
                </Banner>
                <p className="content">
                  Name: HypeTeen <br />
                  Gender: Encrypting <br />
                  Date of birth: NFT first year <br />
                  Hobbies: Travel, Adventure, Food, Art, Social <br />
                  Personality: Wisdom, creativity, confidence, willing to share <br />
                  Occupation: Ambassador of virtual and real culture <br />
                </p>
              </section>

              <section className="item" >
                <h1 > Birth of HypeTeen </h1>
                <p >
                  HypeTeen is the First CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen. She/He likes food from all over the world, loves travel and art, and is good at socializing. Born in the first year of NFT, she/he has her/his own NFT attributes, likes to explore the unknown, and is obsessed with trendy things in the future. At the peak of her/his appearance, she/he likes fans to call: super handsome! <br /><br />
                  In 2022, she/he will take her/his fans on her/his first journey of exploration - travel around the world, learn about the customs of various countries, spread the world&apos;s culture, and share the cultural essence and consensus with fans in Forart Club. <br /> <br />

                </p>
              </section>
            </TabPanel>

            <TabPanel index={1} value={value} >
              <section className="item" >
                <h1 > Creator & Holder Equity </h1>
                <p >
                  <b> Benefits for HypeTeen NFT creators:</b> <br />
                  1. Each NFT you create will get 50 $FTA<br />

                  2. Acquire 10% of the sales revenue and royalty <br />

                  3. Acquire Foart $FTA airdrop<br /> <br />

                </p>
              </section>
              <ComponentsContainer >
                <img src={Jacket} />
                <img src={FaceMask} />
                <img src={Glasses} />
                <img src={Tatoo} />
                <img src={Shoes} />
              </ComponentsContainer>
            </TabPanel>

            <TabPanel index={2} value={value}>
              <section className="item" >
                <h1 className="title">Marketplace</h1>
                <p >
                  · Solanart <br />
                  · Slope <br />
                  · Magic Eden <br />
                </p>
              </section>

              <section className="item" >
                <h1 className="title">Roadmap</h1>
                <p>
                  1. Create CO-NFTs by Users <br />
                  2. Generate Special CO-NFTs and creator winners when the 1000th NFT is created  <br />
                  3. Vote the next country that HypeTeen will travel to  <br />
                  4. Launch on solanart, Slope and Magic Eden when the 2000th NFT is created  <br />
                </p>
              </section>
            </TabPanel>
          </TabInfo>

        </div>
        {/*<TabItem>*/}

        {/*</TabItem>*/}
      </ArtistDetailTab>
    </ThemeProvider>
  )
}
