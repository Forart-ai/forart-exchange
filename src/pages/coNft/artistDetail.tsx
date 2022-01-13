import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ArtistKit, UserDetail } from '../../types/userDetail'
import { useArtistDetailQuery } from '../../hooks/queries/useArtistDetailQuery'
import HeaderBack from '../../assets/images/artistDetail/cool-background.png'
import { Anchor, Avatar, Button, Input, Tabs } from 'antd'
import { DollarOutlined, SmileOutlined } from '@ant-design/icons'
import {
  BodyContent,
  CenterContainer,
  ItemContainer,
  KitContent,
  MintButton,
  MintContainer,
  MintTab,
  MintWrapper,
  PriceContainer,
  SelectedBody,
  TopContainer
} from './artistMint.style'
import { useArtistKitQuery } from '../../hooks/queries/useArtistKitQuery'

import { SelectableBodyList } from '../../components/nft-mint/mintBody'
import { SelectableKitList } from '../../components/nft-mint/mintKit'
import { SelectedList } from '../../components/nft-mint/selectedList'
import useNFTMint from '../../hooks/contract/service/useNFTMint'
import { useStyledNFTsQuery } from '../../hooks/queries/useStyledNFTsQuery'
import { useMediaQuery } from 'react-responsive'
import { useLocationQuery } from '../../hooks/useLocationQuery'


const { TabPane } = Tabs
const { Link } = Anchor

const onAnchorClick = (
  e: React.MouseEvent<HTMLElement>,
  link: {
    title: React.ReactNode;
    href: string;
  },
) => {
  e.preventDefault()
}

export type KitProperties = {
  id: number
  url: string,
  price: number,
  rarity: number,
  remain: number
}


type MessageHintProps = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}

function scrollToPart(anchorName: string) {
  if (anchorName) {
    const anchorElement = document.getElementById(anchorName)
    if (anchorElement) {
      anchorElement.scrollIntoView(
        { behavior: 'smooth', block: 'nearest' }
      )
    }
  }
}


const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  height: fit-content;
  margin: auto;
  //padding-bottom: 50px;
  padding: 30px 20px;
  
 @media screen and (max-width: 1100px) {
   height: auto;
 } 
`

const ArtistDetailContainer = styled.div`
  max-width: 1900px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`

const HeaderContainer = styled.div<{backgroundImage?: string}>`
  width: 100%;
  height: 800px;
  border-radius: 20px;
  margin-top: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background: #2A2E35;
  padding: 2rem 2.2rem;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(14,22,39,.8),rgba(36,52,84,.8)) border-box;
  


  ${props => props.backgroundImage && `
 background: url(${HeaderBack}) no-repeat center;
 background-size: cover;
 `
};
  
  @media screen and (max-width: 1100px) {
    padding: 0.8rem 0.5rem;
    height: 700px;
  }
  
`

const ArtistInfo = styled.div`
  width: 100%;
  height: 70%;
  //border: 1px red solid;
  background: rgba(14,22,39,.85);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 40px;

  .username {
    font-size: 2rem;
    color: #fff;
  }

  .slogan {
    background: linear-gradient(90deg, #12dbe4, #02fbab);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.4rem;
    text-align: center;
  }

  .describe {
    color: #b2b2b2;
    font-size: 1.3em;
    text-align: center;
  }
`

const FollowersInfo = styled.div` 
  width: 100%;
  height: 12%;
  background: rgba(14,22,39,.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 15px 20px;
  
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    height: 18%;
  }
`

const LeftArea = styled.div` 
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  //border: 1px red solid;
  
  .label {
    font-size: 1.3em !important;
  }
  .value{
    font-size: 1.8em !important;
    margin-right: 10px;
  }
`


const RightArea = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  //padding: 16px;

  .followers {
    width: 100%;
    position: relative;
    min-height: 50px;
    overflow: hidden;
  !important;

    &:before {
      content: "";
      width: 100%;
      height: 64px;
      position: absolute;
      left: 0;
      background: linear-gradient(270deg, transparent 95%, #1c2b38), linear-gradient(90deg, transparent 95%, #1c2b38);
      z-index: 1;
    }

    .followers-icon {
      overflow: hidden;
    !important;
      width: 100%;
    }

    .followers-icon-inner {
      display: flex;
      -webkit-animation: scrollDown 200s alternate;
      animation: scrollDown 20s alternate;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;

      .is-48 {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin: 0 5px;
      }
    }

    @keyframes scrollDown {
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(-100%);
      }
    }

  }
`

const StyledTab = styled(Tabs)`
  width: 100%;
  user-select: none;
  margin-top: 20px;

  .ant-tabs-tab {
    font-size: 2em;
    color: #E5E8EB !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #94DAFF !important;

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
    background-image: linear-gradient(to right, #00EBA4, #02A6F5);
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
  background: linear-gradient(0deg, rgba(14,22,39,.8),rgba(36,52,84,.8)) border-box;
  
  @media screen and (max-width: 1100px) {
    padding: 10px;
  }
  
`

const ArtistDetailTab = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;


  .ant-anchor-link-title {
    font-size: 1.2em;
    color: #fff;
  }

  .ant-anchor-link-active > .ant-anchor-link-title {
    color: #00EBA4;
  }

  .ant-anchor-ink::before{
    background-color: #00EBA4;
  }
  
  
  @media screen and (max-width: 1100px) {
    justify-content: center;
  }
  
`

const TabItem = styled.div`
  max-width: calc(100% - 40px);
  width: 80%;
  height: auto;


  .item {
    width: 100%;
    //border: 1px red solid;
  }

  .title {
    font-size: 2.5em;
    color: #fff;
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
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
    max-width: calc(100% - 10px);
  }
`



const UserInfo: React.FC<{ userData?:UserDetail }> = ({ userData }) => {

  return (
    <HeaderContainer backgroundImage={userData?.backgroundImage}>
      <ArtistInfo>
        <Avatar size={ 64 } src={userData?.avatar} />
        <div className="username">{userData?.username}</div>
        <div className="slogan">{userData?.slogan}</div>
        <p className="describe">{userData?.describe}</p>
      </ArtistInfo>
      <FollowersInfo>
        <LeftArea >
          <div className="value"> {userData?.followers.length}</div>
          <div className="label"> Followers </div>
        </LeftArea>
        <RightArea>
          <div className="followers" >
            <div className="followers-icon">
              <div className="followers-icon-inner">
                {
                  userData?.followers.map((item:string, index:number) => (
                    <img className="is-48" src={item} key={index} />
                  ))
                }
              </div>
            </div>
          </div>
        </RightArea>
      </FollowersInfo>
    </HeaderContainer>
  )
}

const ArtDetail: React.FC<{ userData?:UserDetail }> = ({ userData }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })


  return (
    <ArtistDetailTab>
      <Anchor onClick={onAnchorClick} offsetTop={150} style={isMobile ? { display:'none' }  : {}}>
        {
          userData?.artDetail.map((item: any, index: number) => (
            <Link href={`#${item.title}`}  key={index} title={item.title} />
          ))
        }
      </Anchor>


      <TabItem>
        {
          userData?.artDetail.map((item:any, index:number) => (
            <section className="item" key={index} id={item.title}>
              <h2 className="title"> {item.title} </h2>
              <img className="image-border" src={item.image} />
              <p className="content"> {item.content} </p>
            </section>
          ))
        }
      </TabItem>
    </ArtistDetailTab>
  )
}

const MessageHint: React.FC<MessageHintProps> = ({ message, type }) => {
  const color = type ? {
    'error': 'red',
    'success': 'rgb(82,196,26)',
    'hint': '#fadb14'
  }[type] : ''

  return (
    <p style={{ fontSize: '1.2rem', color }}>
      {message}
    </p>
  )
}

const Mint: React.FC<{ artistKit?: ArtistKit }> = ({ artistKit }) => {
  const [body, setBody] = useState<any>()

  const [kits, setKits] = useState<Map<string, any>>(new Map())

  const [style, setStyle] = useState('')

  const [show, setShow] = useState<boolean>(true)

  const [genName, setGenName] = useState<string>()

  const { mintNFT, hint }  = useNFTMint()

  const { data: styleList } = useStyledNFTsQuery()

  const minting = useMemo(() => !!hint.message && hint.type === 'hint',[hint])


  useMemo(() => {
    if (!show) {
      setStyle('')
    }
  },[show])


  // useEffect(() => {
  //   console.log(kits)
  // }, [kits, body])


  const list = artistKit?.body.map((body:{url: string, price: number, rarity: string}) =>({
    url: body.url,
    price: body.price,
    rarity: body.rarity
  }))




  const KIT_TYPES: Array<{name: string, list: KitProperties[], key: string}> = useMemo(() =>
    [
      {
        name: 'Glasses',
        key: '12_glasses',
        list: artistKit?.glasses
      },
      {
        name: 'Cloth',
        key: '05_cloth',
        list: artistKit?.cloth
      },
      {
        name: 'Hand',
        key: '08_hand',
        list: artistKit?.hand
      },
      {
        name: 'Item',
        key: '07_item',
        list: artistKit?.item
      },
      {
        name: 'Feet',
        key: '03_feet',
        list: artistKit?.feet
      },
      {
        name: 'Shoe',
        key: '06_shoe',
        list: artistKit?.shoe
      },
    ], [artistKit])


  return (
    <MintWrapper>
      <TopContainer>
        <BodyContent>
          <SelectableBodyList
            selectedValue= {body}
            onSelect= {v => setBody(v)}
            list= {list}
          />

          {
            body && (
              <SelectedBody>
                <img src={body.url} style={{ objectFit:'contain' }} />
                <PriceContainer>
                  <div className="price">{body?.price} FTA</div>
                  <div className="price">Rarity: {body?.rarity}</div>
                </PriceContainer>
              </SelectedBody>
            )
          }
        </BodyContent>
        <KitContent >
          <MintTab>
            {
              KIT_TYPES?.map(type => (
                <TabPane key={type.name} tab={type.name} >
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
        <SelectedList body={body} kitList={kits} />
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

      <ItemContainer>
        <div className="title"> Gen Image Name </div>
        <Input placeholder="Please enter the name of the gen image" onChange={e => setGenName(e.target.value) } />
      </ItemContainer>

      <MessageHint {...hint} />

      <MintButton  >
        <Button style={{ width: '100px' }} onClick={ () => mintNFT(body, kits, style, genName)}>
          Mint
        </Button>
      </MintButton>
    </MintWrapper>
  )
}

const ArtistDetail: React.FC = () => {
  const artistId = useLocationQuery('artistId')

  const { data: userData } = useArtistDetailQuery()

  const { data: artistKitList } = useArtistKitQuery(artistId)


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [userData])

  return (
    <Wrapper>
      <ArtistDetailContainer>
        <UserInfo userData={userData} />
        <DescriptionContainer>
          <StyledTab defaultActiveKey="artDetail"  >
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
                  <DollarOutlined />
                  Mint
                </span>
              }
              key="mint"
            >
              <Mint artistKit={artistKitList} />
            </TabPane>

          </StyledTab>
        </DescriptionContainer>
      </ArtistDetailContainer>
    </Wrapper>
  )
}


export default ArtistDetail
