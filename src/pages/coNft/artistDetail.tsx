import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ArtistKit, UserDetail } from '../../types/userDetail'
import { NFTPreview } from '../../components/nft-mint/selectedList'
import {   Button, Modal, Tabs } from 'antd'
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

import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import ArtistInfo from './artistInfo'
import { ArtDetail } from './artistIntroduction'

const { TabPane } = Tabs

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
  padding: 0 0 60px 0;
  min-height: 100vh;
 
  
 @media screen and (max-width: 1080px) {
   height: 100%;
   padding: 0 10px;
   overflow: scroll;
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

const TabArea = styled.div`
  width: 100%;
  min-height: fit-content;
  margin-top: 30px;
  padding: 0 10px;
`

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
