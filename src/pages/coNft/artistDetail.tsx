import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { ArtistKit, UserDetail } from '../../types/userDetail'
import { useArtistDetailQuery } from '../../hooks/queries/useArtistDetailQuery'
import HeaderBack from '../../assets/images/artistDetail/cool-background.png'
import MoreKit from '../../assets/images/coPools/more.svg'
import HyteenAvatar from '../../assets/images/artistDetail/hypeteen.jpg'
import { NFTPreview, Title } from '../../components/nft-mint/selectedList'
import OpenSwitch from '../../assets/images/coPools/switch.svg'
import ArtistBanner from '../../assets/images/coPools/hypteen-banner.jpg'

import { Button, Tabs } from 'antd'
import { BlockOutlined, CrownOutlined, SmileOutlined } from '@ant-design/icons'
import {
  BodyContent,
  CenterContainer,
  KitContent,
  MintButton,
  MintContainer,
  MintTab,
  MintWrapper,
  SelectedBody,
  TopContainer
} from './artistMint.style'

import { useArtistKitQuery } from '../../hooks/queries/useArtistKitQuery'
import { SelectableBodyList } from '../../components/nft-mint/mintBody'
import { SelectableKitList } from '../../components/nft-mint/mintKit'
import { useCheckWhiteListModal } from '../../hooks/modals/useCheckWhiteListModal'
import { useLocationQuery } from '../../hooks/useLocationQuery'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import useUserQuery from '../../hooks/queries/useUserQuery'
import useDiscordAccessToken from '../../hooks/useDiscordAccessToken'
import useNFTMint from '../../hooks/programs/services/useNFTMint'

const { TabPane } = Tabs

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
  height: 100vh;
  margin: auto;
  padding: 30px 20px;
  overflow-y: scroll;
  
 @media screen and (max-width: 1100px) {
   height: 100vh;
 } 
`

const ArtistDetailContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`

const HeaderContainer = styled.div<{backgroundImage?: string}>`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  margin-top: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.2rem;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), #1E052D) border-box;


  ${props => props.backgroundImage && `
 background: url(${HeaderBack}) no-repeat center;
 background-size: cover;
 `
};

  @media screen and (max-width: 1100px) {
    padding: 0.8rem 0.5rem;
    height: fit-content;
  }

`

const ArtistInfo = styled.div`
  width: 100%;
  height: 100%;
  //border: 1px red solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 20px 40px;

  .username {
    width: 100%;
    font-size: 2em;
    color: #FF468B;
    text-align: center;
  }

  .slogan {
    background-image: -webkit-linear-gradient(left, #FF4D9D, #c330c9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.6em;
    text-align: center;
  }

  .describe {
    color: #b2b2b2;
    font-size: 1.3em;
    text-align: center;
  }
  
  img {
    width: 300px;
    border-radius: 50%;
  }
  
  @media screen and (max-width: 1100px){
    flex-direction: column;
    img {
      width: 150px;
      border-radius: 50%;
    }
  }
`

const StyledTab = styled(Tabs)`
  width: 100%;
  user-select: none;
  margin-top: 20px;
  .ant-tabs-nav {
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    
  }
  .ant-tabs-tab {
    font-size: 2em;
    color: #E5E8EB !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #FF468B !important;

  }

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;!important;
  }

  .ant-tabs-nav::before {
    //display: none; !important;
    border-bottom: 1px #65727b solid;

  }

  .ant-tabs-ink-bar {
    line-height: 20px;
    background: linear-gradient(to right, #FF468B, #12dbe4) border-box;
    padding: 4px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
  
  @media screen and (max-width: 1100px) {
    .ant-tabs-tab {
      font-size: 16px;
    }
  }
`

const DescriptionContainer = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 20px;
  margin: 30px 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 25px;
  flex-direction: column;
  //background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), #1E052D) border-box;
  @media screen and (max-width: 1100px) {
    padding: 10px;
  }
  
`

const ArtistDetailTab = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;

  
  .ant-anchor-link-title {
    font-size: 1.2em;
    color: #fff;
  }

  .ant-anchor-link-active > .ant-anchor-link-title {
    color: #FF468B;
  }

  .ant-anchor-ink::before{
    background-color: #FF468B;
  }
  
  
  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
  
`

const TabItem = styled.div`
  max-width: calc(100% - 40px);
  width: 80%;
  height: auto;

  .banner {
    border-radius: 1em;
  }

  .item {
    width: 100%;
    //border: 1px red solid;
  }

  .title {
    font-size: 2.5em;
    color: #FF468B;
  }

  .image-border {
    max-width: 100%;
    object-fit: contain;
    border-radius: 20px;
    margin: 1rem 0;
    display: block;
  }

  .content {
    color: #d5d5d5;
    font-size: 1.4em;
    user-select: text;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
    max-width: calc(100% - 10px);
  }
`

const AllNftWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: #ffffff;
`

const Message = styled.div`
  width: 100%;
  
  .title {
    display: flex;
    align-items: center;
    
    img {
      width: 35px;
      margin-left: 15px;
    }
  }
  
`

const UserInfo: React.FC<{ userData?:UserDetail }> = ({ userData }) => {

  return (
    <HeaderContainer >
      <ArtistInfo>
        <div>
          <img  src={HyteenAvatar} />
        </div>

        <div>
          <div className="username">{userData?.username}</div>
          <div className="slogan">{userData?.slogan}</div>
          <p className="describe">{userData?.describe}</p>
        </div>
      </ArtistInfo>
      {/*<FollowersInfo>*/}
      {/*  <LeftArea >*/}
      {/*    <div className="value"> {userData?.followers.length}</div>*/}
      {/*    <div className="label"> Followers </div>*/}
      {/*  </LeftArea>*/}
      {/*  <RightArea>*/}
      {/*    <div className="followers" >*/}
      {/*      <div className="followers-icon">*/}
      {/*        <div className="followers-icon-inner">*/}
      {/*          {*/}
      {/*            userData?.followers.map((item:string, index:number) => (*/}
      {/*              <img className="is-48" src={item} key={index} />*/}
      {/*            ))*/}
      {/*          }*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </RightArea>*/}
      {/*</FollowersInfo>*/}
    </HeaderContainer>
  )
}

const ArtDetail: React.FC<{ userData?:UserDetail }> = () => {
  return (
    <ArtistDetailTab>
      {/*<Anchor onClick={() => onAnchorClick}  style={isMobile ? { display:'none' }  : { }}>*/}
      {/*  {*/}
      {/*    userData?.artDetail.map((item: any, index: number) => (*/}
      {/*      <Link href={`#${item.title}`}  key={index} title={item.title} />*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</Anchor>*/}
      <TabItem>
        <img className="banner" src={ArtistBanner} />
        <section className="item" >
          <h2 className="title"> Archive </h2>
          <img className="image-border"  />
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
          <h2 className="title"> Birth of HypeTeen </h2>
          <img className="image-border"  />
          <p className="content">
            HypeTeen is the First CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen. She/He likes food from all over the world, loves travel and art, and is good at socializing. Born in the first year of NFT, she/he has her/his own NFT attributes, likes to explore the unknown, and is obsessed with trendy things in the future. At the peak of her/his appearance, she/he likes fans to call: super handsome! <br /><br />
            In 2022, she/he will take her/his fans on her/his first journey of exploration - travel around the world, learn about the customs of various countries, spread the world&apos;s culture, and share the cultural essence and consensus with fans in Forart Club. <br /> <br />
            HypeTeen will go to a country every once in a while, and fans will vote to decide the next country, and share several NFTs with the cultural characteristics of the country. During this period, the mintors with the most CO-NFTs will have the right to buy these Special NFTs (one address can only buy one) and have Forart Club privileges.
            6% of the income of HypeTeen NFTs will be donated to foundations and organizations related to world cultural heritage.
          </p>
        </section>

        <section className="item" >
          <h2 className="title"> Minter & Holder Equity </h2>
          <img className="image-border"  />
          <p className="content">
            <b> Benefits for HypeTeen NFT minters:</b> <br />
            1. Be allowed to join the Forart Club and own the rights to the Club. <br />

            2. You will receive an airdrop of Forart. <br />

            3. NFT holders with scarcity properties will share the HypeTeen royalties. <br /> <br />

            <b>HypeTeen Special NFTs holders can obtain benefits:</b>  <br />
            1. Will be added to Forart IDO&apos;s whitelist.
          </p>
        </section>

        <section className="item" >
          <h2 className="title">First stop </h2>
          <img className="image-border"  />
          <p className="content">
            The country where HypeTeen first travels is China, and corresponding NFTs with Chinese cultural attributes have been generated. All Special NFTs
            will be generated and opened after the 400th NFT is minted. <br /><br />
          </p>
        </section>

        <section className="item" >
          <h2 className="title">Marketplace</h2>
          <img className="image-border"  />
          <p className="content">
            <ul>
              <li>Solanart</li>
              <li>Slope </li>
              <li>Magic Eden</li>
            </ul>
          </p>
        </section>

        <section className="item" >
          <h2 className="title">Roadmap</h2>
          <img className="image-border"  />
          <p className="content">
            1. Mint CO-NFTs by Users <br />
            2. Generate Special CO-NFTs and minter winners when the 400th NFT is minted  <br />
            3. Vote the next country that HypeTeen will travel to  <br />
            4. Launch on solanart, Slope and Magic Eden when the 2000th NFT is minted  <br />
          </p>
        </section>
      </TabItem>
    </ArtistDetailTab>
  )
}

const AllNftContainer: React.FC = () => {
  return (
    <AllNftWrapper>Coming Soon!</AllNftWrapper>
  )
}

const Mint: React.FC<{ artistKit?: ArtistKit }> = ({ artistKit }) => {

  const { account, select } = useSolanaWeb3()

  const [body, setBody] = useState<any>()

  const { data: userData } = useUserQuery()

  console.log(userData)

  useMemo(()=> {
    setBody(artistKit?.Body[0])
  }, [artistKit])

  const [kits, setKits] = useState<Map<string, any>>(new Map())
  const [, setStyle] = useState('')
  const [show] = useState<boolean>(true)

  const { checkWhiteListModal, openCheckWhiteListModal } = useCheckWhiteListModal()
  const discordAccessToken = useDiscordAccessToken()

  useMemo(() => {
    if (discordAccessToken) {
      openCheckWhiteListModal()
    }
    else return
  },[discordAccessToken])

  const { mintNFT } = useNFTMint()

  useMemo(() => {
    if (!show) {
      setStyle('')
    }
  },[show])

  const KIT_TYPES: Array<{name: string, list: KitProperties[], key: string}> = useMemo(() =>
    [
      {
        name: 'Background*',
        key: 'background',
        list: artistKit?.Background
      },
      {
        name: 'Cloths*',
        key: 'clothing',
        list: artistKit?.Clothing
      },
      {
        name: 'Pants*',
        key: 'pants',
        list: artistKit?.Pants
      },
      {
        name: 'Eye',
        key: 'eye',
        list: artistKit?.Eye
      },
      {
        name: 'Foot',
        key: 'foot',
        list: artistKit?.Foot
      },
      {
        name: 'Hand',
        key: 'hand',
        list: artistKit?.Hand
      },
      {
        name: 'Mouth',
        key: 'mouth',
        list: artistKit?.Mouth
      },
      {
        name: 'Butt',
        key: 'butt',
        list: artistKit?.Butt
      }

    ], [artistKit])

  return (
    <MintWrapper>
      <TopContainer>
        <BodyContent>
          <SelectableBodyList
            selectedValue= {body}
            onSelect= {v => setBody(v)}
            list= {artistKit?.Body}
          />

          <SelectedBody>
            {
              body && (
                <>
                  <NFTPreview body={body} kitList={kits} />
                </>
              )
            }
          </SelectedBody>
          )

        </BodyContent>
        <KitContent >
          <div className="more-icon">
            <img src={MoreKit} />
          </div>
          <MintTab size={'small'}>
            {
              KIT_TYPES?.map(type => (
                <TabPane key={type.name} tab={type.name} style={{ width:'100%', overflowX: 'scroll' }}>
                  <MintContainer>
                    <SelectableKitList
                      selectedValue={kits.get(type.key)}
                      onSelect={v => {
                        setKits(prev => {
                          const map = new Map(prev)
                          map.set(type.key, v ? v : undefined  )
                          if (!v){ map.delete(type.key)}
                          return map
                        })
                      }}
                      list={type.list}
                    />
                  </MintContainer>
                </TabPane>
              ))
            }
          </MintTab>
        </KitContent>
      </TopContainer>

      <CenterContainer>
        {/*<SelectedList body={body} kitList={kits} />*/}
      </CenterContainer>

      {/*<AIContainer>*/}
      {/*  <div className="title">*/}
      {/*    <div>AI-GEN</div>*/}
      {/*    <StyledSwitch>*/}
      {/*      <Switch onChange={() => setShow(!show)} />*/}
      {/*    </StyledSwitch>*/}
      {/*  </div>*/}
      {/*  <AIContent  >*/}
      {/*    <div className={ show ? 'style' : 'hide' }>*/}
      {/*      <SelectableNFTList*/}
      {/*        selectedValue={style}*/}
      {/*        onSelect={v=> setStyle(v)}*/}
      {/*        list={styleList?.map((style: { image: any}) => style?.image)}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </AIContent>*/}
      {/*</AIContainer>*/}

      {/*<ItemContainer>*/}
      {/*  <div className="title"> Gen Image Name </div>*/}
      {/*  <Input placeholder="Please enter the name of the gen image" onChange={e => setGenName(e.target.value) } />*/}
      {/*</ItemContainer>*/}
      <Message>
        <div className="title">
          <Title> Rarity by AI-Random </Title>
          <img src={OpenSwitch} />
        </div>
      </Message>

      <p style={{ color: '#fff' }}>You have {userData?.getQualification} chances</p>

      <MintButton >
        {
          !account ? (
            <Button  style={{ height:'50px' }} onClick={ select }>
              Connect Wallet
            </Button>
          ): (
            (userData?.getQualification === 0) ? (
              <Button  style={{  height:'50px' }} onClick={ openCheckWhiteListModal }>
                Get Qualification
              </Button>
            ) : (
              <Button style={{  height:'50px' }} onClick={() => mintNFT(body, kits)}> Create  </Button>
            )
          )
        }

        {
          // <Button onClick={() => mintNFT(body, kits)}>Mint</Button>
        }
      </MintButton>

      {checkWhiteListModal}

    </MintWrapper>
  )
}

const ArtistDetail: React.FC = () => {
  const artistId = useLocationQuery('artistId')

  const { data: userData } = useArtistDetailQuery()

  const { data: artistKitList } = useArtistKitQuery(artistId?.toString())

  return (
    <Wrapper>
      <ArtistDetailContainer>
        <UserInfo userData={userData} />
        <DescriptionContainer>
          <StyledTab defaultActiveKey="mint" onChange={ () => window.scrollTo(0, 0)}  >
            <TabPane
              tab= {
                <span>
                  <SmileOutlined />
                  Art Detail
                </span>
              }
              key="artDetail"
            >
              <ArtDetail userData={userData} />
            </TabPane>

            <TabPane
              tab= {
                <span>
                  <CrownOutlined />
                  Mint
                </span>
              }
              key="mint"
            >
              <Mint artistKit = {artistKitList} />
            </TabPane>

            <TabPane
              tab= {
                <span>
                  <BlockOutlined />
                  All NFTs
                </span>
              }
              key="all"
            >
              <AllNftContainer />
            </TabPane>

          </StyledTab>
        </DescriptionContainer>
      </ArtistDetailContainer>
    </Wrapper>
  )
}

export default ArtistDetail
