import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ArtistKit, UserDetail } from '../../types/userDetail'
import HyteenAvatar from '../../assets/images/artistDetail/hypeteen.jpg'
import { NFTPreview, Title } from '../../components/nft-mint/selectedList'
import ArtistBanner from '../../assets/images/coPools/ticket.png'
import { Anchor, Avatar, Button, Modal, Skeleton, Tabs } from 'antd'
import { BlockOutlined, CrownOutlined, SmileOutlined, createFromIconfontCN, SearchOutlined } from '@ant-design/icons'
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
import AllNftContainer from './allNftContainer'
import FaceMask from '../../assets/images/artistDetail/mask.webp'
import Jacket from '../../assets/images/artistDetail/jacket.webp'
import Glasses from '../../assets/images/artistDetail/glasses.webp'
import Shoes from '../../assets/images/artistDetail/shoes.webp'
import Tatoo from '../../assets/images/artistDetail/tatoo.webp'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { useMediaQuery } from 'react-responsive'
import ArtistInfo from './artistInfo'

const { TabPane } = Tabs
const { Link } = Anchor

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_3200605_6t4q1tggh3l.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
})

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
  height: calc(100vh - 68px);
  padding: 10px 0; 
  overflow: scroll;
 
  
 @media screen and (max-width: 1080px) {
   min-height: 100vh;
   padding: 0 10px;
   overflow-y: scroll;
 }  
`

const ArtistDetailContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;

`

const HeaderContainer = styled.div`
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
  


  @media screen and (max-width: 1100px) {
    padding: 0.8rem 0.5rem;
    height: fit-content;
  }

`

const StyledTab = styled(Tabs)`
  width: 100%;
  user-select: none;
  display: flex;
  justify-content: center;
  
  .ant-tabs-tab {
    font-size: 1.7em;
    color: #E5E8EB !important;
    font-family: 'inter-extraBold';
    padding: 0;
  }
  
  .ant-tabs-nav-list {
    border: 1px rgb(36,24,47) solid;
    border-radius: 30px;
  }

  ant-tabs-tab ant-tabs-tab-active {
    padding: 0;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ffffff !important;
    border-radius: 25px;
    background-color: #E42575;
    span {
      margin: 5px 10px;
    }
  }
  

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;

  }

  .ant-tabs-nav::before {
    display: none; !important;

  }

  .ant-tabs-ink-bar {
    display: none;
  }
  
  @media screen and (max-width: 1080px) {
    .ant-tabs-tab {
      font-size: 14px;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      background-color: #E42575;
      span {
        margin: 5px;
      }
    }
  }
`

const ArtistDetailTab = styled.div`
  width: 100%;
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

const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  
  img {
    width: 70%;
    object-fit: contain;
    border-radius: 1em;
  }
`

const TabItem = styled.div`
  
  max-width: calc(100% - 40px);
  width: 80%;
  height: 100%;
 
  .item {
    width: 100%;
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

const TabArea = styled.div`
  width: 100%;
  min-height: fit-content;
  margin-top: 30px;
  overflow: scroll;
  padding: 0 10px;
`

const ComponentsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  img {
    margin-top: 20px;
    width: 70%;
    border-radius: 20px;
  }
`

const ArtDetail: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      // 找到锚点
      const anchorElement = document.getElementById(anchorName)
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) { anchorElement.scrollIntoView({ block: 'center', behavior: 'smooth' }) }
    }
  }

  return (
    <ArtistDetailTab id="a">
      {/*<a onClick={() => scrollToAnchor('about')} >About</a>*/}
      <TabItem id="b" >
        <Banner>
          <img className="banner" src={ArtistBanner} />
        </Banner>
        <ComponentsContainer >
          <img src={Jacket} />
          <img src={FaceMask} />
          <img src={Glasses} />
          <img src={Tatoo} />
          <img src={Shoes} />
        </ComponentsContainer>
        <section className="item"  id="about">
          <h2 className="title"> Archive </h2>
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
          <p className="content">
            HypeTeen is the First CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen. She/He likes food from all over the world, loves travel and art, and is good at socializing. Born in the first year of NFT, she/he has her/his own NFT attributes, likes to explore the unknown, and is obsessed with trendy things in the future. At the peak of her/his appearance, she/he likes fans to call: super handsome! <br /><br />
            In 2022, she/he will take her/his fans on her/his first journey of exploration - travel around the world, learn about the customs of various countries, spread the world&apos;s culture, and share the cultural essence and consensus with fans in Forart Club. <br /> <br />

          </p>
        </section>

        <section className="item" >
          <h2 className="title"> Creator & Holder Equity </h2>
          <p className="content">
            <b> Benefits for HypeTeen NFT creators:</b> <br />
            1. Each NFT you create will get 50 $FTA<br />

            2. Acquire 10% of the sales revenue and royalty <br />

            3. Acquire Foart $FTA airdrop<br /> <br />

          </p>
        </section>

        <section className="item" >
          <h2 className="title">Marketplace</h2>
          <p className="content">
            · Solanart <br />
            · Slope <br />
            · Magic Eden <br />
          </p>
        </section>

        <section className="item" >
          <h2 className="title">Roadmap</h2>
          <p className="content">
            1. Create CO-NFTs by Users <br />
            2. Generate Special CO-NFTs and creator winners when the 1000th NFT is created  <br />
            3. Vote the next country that HypeTeen will travel to  <br />
            4. Launch on solanart, Slope and Magic Eden when the 2000th NFT is created  <br />
          </p>
        </section>
      </TabItem>
    </ArtistDetailTab>
  )
}

const Mint: React.FC<{ artistKit?: ArtistKit }> = ({ artistKit }) => {

  const { account } = useSolanaWeb3()

  const { openModal } = useModal()

  const openWallet = useCallback(() => {
    openModal(<WalletSelectionModal />)
  },[])

  const [body, setBody] = useState<any>()

  const { data: userData } = useUserQuery()

  useMemo(()=> {
    setBody(artistKit?.Body[0])
  }, [artistKit])

  const [kits, setKits] = useState<Map<string, any>>(new Map())
  const [, setStyle] = useState('')
  const [show] = useState<boolean>(true)

  const { checkWhiteListModal, openCheckWhiteListModal } = useCheckWhiteListModal()
  const discordAccessToken = useDiscordAccessToken()
  const { mintNFT } = useNFTMint()

  useMemo(() => {
    if (discordAccessToken) {
      openCheckWhiteListModal()
    }
    else return
  },[discordAccessToken])

  useMemo(() => {
    if (!show) {
      setStyle('')
    }
  },[show])

  const KIT_TYPES: Array<{name: string, list?: KitProperties[], key: string, image?: boolean}> = useMemo(() =>
    [
      {
        name: 'Hat?',
        key: 'hay',
        image: true
      },
      {
        name: 'Background*',
        key: 'background',
        list: artistKit?.Background
      },
      {
        name: 'Clothes*',
        key: 'clothing',
        list: artistKit?.Clothing
      },
      {
        name: 'Pants*',
        key: 'pants',
        list: artistKit?.Pants
      },
      {
        name: 'Butt',
        key: 'butt',
        list: artistKit?.Butt
      },
      {
        name: 'Ear',
        key: 'ear',
        list: artistKit?.Ear
      },
      {
        name: 'Mouth',
        key: 'mouth',
        list: artistKit?.Mouth
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

    ], [artistKit])

  const handleCreate = useCallback(
    () => {
      Modal.confirm({
        closable: true,
        style:{  height:'90%', display:'flex', alignItems:'center' },
        width: 500,
        title: (
          <div style={{ color: '#fff' }}>
            Create
          </div>
        ),
        content: (
          <div style={{ color: '#fff' }} >
            <div>
              Are you sure want to create this NFT?
            </div>
          </div>
        ),
        onOk: () => mintNFT(body,kits)
      })
    },[body, kits, account]
  )

  return (
    <MintWrapper>
      <TopContainer>
        <BodyContent>
          <SelectableBodyList
            selectedValue= {body!}
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

        </BodyContent>

        <KitContent >
          <MintTab tabPosition={'top'}>
            {
              KIT_TYPES?.map(type => (
                <TabPane key={type.name}  tab={type.name} style={{ width:'100%' }}>
                  <MintContainer>
                    <SelectableKitList
                      img={type.image}
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

      <MintButton >

        { account  && (
          <p >
            Accesses left: {userData?.getQualification | 0}
            <IconFont style={{ cursor:'pointer', marginLeft: '20px' }} type={'icon-Question'}  onClick={ openCheckWhiteListModal } />
          </p>
        )}

        {
          !account ? (
            <Button  style={{ height:'50px' }} onClick={ openWallet }>
              Connect Wallet
            </Button>
          ) : (
            (userData?.getQualification !== 0) ? (
              <Button style={{ width:'200px',height:'50px' }} onClick={handleCreate}> Create </Button>

            ) : (
              <Button  style={{  height:'50px' }} onClick={ openCheckWhiteListModal }>
                Get Qualification
              </Button>
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

  const { data: artistKitList } = useArtistKitQuery(artistId?.toString())

  return (
    <Wrapper>
      <ArtistInfo />
      <TabArea>
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
            <ArtDetail   />
          </TabPane>

          <TabPane
            tab= {
              <span>
                <CrownOutlined />
                Create
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
      </TabArea>
    </Wrapper>
  )
}

export default ArtistDetail
