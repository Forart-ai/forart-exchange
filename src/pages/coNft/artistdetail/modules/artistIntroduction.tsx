import React from 'react'
import { useMediaQuery } from 'react-responsive'
import ArtistBanner from '../../../../assets/images/coPools/ticket.png'
import Jacket from '../../../../assets/images/artistDetail/jacket.webp'
import FaceMask from '../../../../assets/images/artistDetail/mask.webp'
import Glasses from '../../../../assets/images/artistDetail/glasses.webp'
import Tatoo from '../../../../assets/images/artistDetail/tatoo.webp'
import Shoes from '../../../../assets/images/artistDetail/shoes.webp'
import { styled, Tab, Tabs, ThemeProvider } from '@mui/material'
import ForartTheme from '../../../../contexts/theme/config/dark'
import { useArtistKitQuery } from '../../../../hooks/queries/useArtistKitQuery'
import { useLocationQuery } from '../../../../hooks/useLocationQuery'
import { AttrContent, AttrType } from '../../artistMint.style'
import { SelectableKitItem, SelectableKitList } from '../../../../components/nft-mint/mintKit'
import { KitProperties } from '../index'

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
))(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}))

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({

  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.primary.main,
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
      style={{  width: '100%' }}
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

const ArtistDetailTab = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 80px ;
 
  
`

const Banner = styled('div')`
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

const TabContainer = styled('div')`
  width: 20%;
  display: flex;
  justify-content:flex-end ;
  position: absolute;
  left: 0;
`

const TabItem = styled('div')`
  height: 100%;
  

  @media screen and (max-width: 1100px) {
    width: 40%;
  }
`

const TabInfo = styled('div')`
  width: 60%;
  padding: 0 60px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  
  h1 {
    width: 100%;
    color: ${({ theme })=> theme.palette.secondary.main};
    font-size: 34px;
    font-family: arialBold;
    padding-bottom: 20px;
    border-bottom: 1px ${({ theme }) => theme.palette.grey[500]} solid;
  }
  
  p {
    color: ${({ theme }) => theme.palette.grey[500]};
    font-size: 1.2rem;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    padding: 0 ;
  }
  
`

const ComponentsContainer = styled('div')`
  width: 100%;
  height: fit-content;
  position: relative;
  overflow: hidden;
`

const ComponentWrapper = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 160px);
  gap: 10px;
  justify-content: space-around;
  margin-bottom: 20px;




  .container {
   
    
    img {
      width: 160px;
      height: 160px;
    }

    .Clothing {
      border-radius: 1em;
      transform: scale(2, 2) translate(0);
    }

    .Pants {
      transform: scale(2, 2) translate(-15px, -25px);
    }

    .Eye {
      transform: scale(2, 2) translate(18px, 20px);
    }

    .Butt {
      transform: scale(4, 4) translate(-15px, -10px);
    }

    .Hand {
      transform: scale(3, 3) translate(-5px, -25px);
    }

    .Mouth {
      transform: scale(2) translate(15px, 10px);
    }

    .Ear {
      transform: scale(3) translate(-10px, 30px);
    }
    
  }

 
`

const ComponentsItem:React.FC<{list?:KitProperties[]}> = ({ list }) => {

  return (
    <ComponentWrapper>
      {
        list?.map((item, index) => (
          <div key={index} className={'container'}>
            <img className={item.bodyType}  src={item.url} />
          </div>
        ))
      }
    </ComponentWrapper>
  )
}

export const ArtDetail: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue)
  }
  const artistId = useLocationQuery('artistId')

  const { data: artistKit } = useArtistKitQuery(artistId?.toString())

  return (
    <ThemeProvider theme={ForartTheme}>
      <ArtistDetailTab id="a">
        {
          !isMobile ? (
            <>
              <TabContainer>
                <TabItem>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    <StyledTab label="About" {...a11yProps(0)} />
                    <StyledTab label="Equity & Attributes" {...a11yProps(1)}  />
                    <StyledTab label="Marketplace & Roadmap" {...a11yProps(2)}  />

                  </StyledTabs>
                </TabItem>
              </TabContainer>

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

                      3. Acquire Forart $FTA airdrop<br /> <br />

                    </p>
                  </section>
                  <ComponentsContainer >

                    {
                      artistKit && (
                        <>
                          {
                            Object.keys(artistKit).map((type,index) => (
                              <div key={index}>
                                <h1> {type} </h1>
                                <ComponentsItem key={index} list={artistKit[type]} />
                              </div>
                            ))
                          }
                        </>
                      )
                    }

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

            </>
          ) :
            (
              <TabInfo >
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

                <section className="item" >
                  <h1 > Creator & Holder Equity </h1>
                  <p >
                    <b> Benefits for HypeTeen NFT creators:</b> <br />
                    1. Each NFT you create will get 50 $FTA<br />

                    2. Acquire 10% of the sales revenue and royalty <br />

                    3. Acquire Forart $FTA airdrop<br /> <br />

                  </p>
                </section>

                <ComponentsContainer >

                  {
                    artistKit && (
                      <>
                        {
                          Object.keys(artistKit).map((type,index) => (
                            <div key={index}>
                              <h1> {type} </h1>
                              <ComponentsItem key={index} list={artistKit[type]} />
                            </div>
                          ))
                        }
                      </>
                    )
                  }

                </ComponentsContainer>

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
              </TabInfo>
            )
        }

      </ArtistDetailTab>
    </ThemeProvider>
  )
}
