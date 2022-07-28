import React, { useEffect } from 'react'
import './App.css'
import './app.scss'
import AppHeader from './layout/AppHeader'
import { Route, Routes, useLocation } from 'react-router-dom'
import '../src/font/font.css'
import { Box, styled } from '@mui/material'
import useEagerConnect from './hooks/useEagerConnect'
import Flex from './contexts/theme/components/Box/Flex'
import useSignLogin from './hooks/useSignLogin'
import { Sticky, StickyContainer } from 'react-sticky'
import CoNftPage from './pages/coNft/homepage'
import CONFTDetail from './pages/nftDetail/coNftDetail'
import WalletNftDetail from './pages/nftDetail/walletNftDetail'
import ArtistDetail from './pages/coNft/artistdetail'
import NftChatroom from './pages/social'
import AIGen from './pages/AIGen'
import PersonalCenterPage from './pages/personal'
import Game from './pages/game'
import SocialHomepage from './pages/social/modules/home'
import ReplyList from './pages/social/modules/detail/replyList'
import AiArt from './pages/game/modules/aiArt'
import TextToImage from './pages/game/modules/text-to-image'
import { useWeb3React } from '@web3-react/core'
import Goblin from './pages/goblin'
import { injected } from './web3/connectors'

export const BlueGlow = styled('div')`
  position: fixed;
  width: 500px;
  height: 500px;
  mix-blend-mode: screen;
  background: radial-gradient(circle, #00468C 0%, rgba(0, 70, 140, 0) 100%);
  filter: blur(80px);
  border-radius: 50%;
  opacity: 0.8;
  z-index: 0;

`

export const PurpleGlow = styled('div')`
   position: fixed;
   width: 400px;
   height: 400px;
   background: radial-gradient(circle, #5a1993 0%, rgba(63, 21, 99, 0) 100%);
   border-radius: 50%;
   filter: blur(80px);
   opacity: 0.9;
  z-index: 0;
  mix-blend-mode: screen;

`

const App: React.FC = () => {
  const { activate, deactivate } = useWeb3React()

  // useChainEffect()
  useEagerConnect()

  useSignLogin()

  // useEffect(() => {
  //   const connectWalletOnPageLoad = async () => {
  //     if (localStorage?.getItem('isWalletConnected') === 'true') {
  //       try {
  //         await activate(injected)
  //         localStorage.setItem('isWalletConnected', 'true')
  //       } catch (ex) {
  //         console.log(ex)
  //       }
  //     }
  //   }
  //   connectWalletOnPageLoad()
  // }, [])

  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <StickyContainer>
      <div className="app">
        <div className="border" >

          <>
            <Sticky>
              {({ style, isSticky }) => (
                <div style={{ ...style, zIndex:20 }}>
                  <AppHeader />
                </div>
              )}
            </Sticky>
            <Flex flexDirection={'column'} minHeight={'100vh'}>

              <Box   sx={{  width:'100vw', backgroundColor:'rgb(10,5,35)' }}>
                <Routes>

                  <Route path="/" element={<CoNftPage />} />
                  <Route path="co-nft-detail" element={<CONFTDetail />} />
                  <Route path="/ai-general/goblintownai" element={<Goblin />} />
                  <Route path="nft-detail" element={<WalletNftDetail />} />
                  <Route path="co-nft/artistDetail" element={<ArtistDetail />} />
                  <Route path="social" element={<NftChatroom />}  >
                    <Route path="home" element={<SocialHomepage />} />
                    <Route path="post" element={<ReplyList />} />
                  </Route>
                  <Route path="Text-to-NFT" element={<AIGen />} />
                  <Route path="account/:wallet"  element={<PersonalCenterPage />}  />
                  <Route path="game" element={<Game />} >
                    <Route path="aiArt" element={<AiArt />} />
                    <Route path="magic-wand" element={<TextToImage />} />
                  </Route>
                </Routes>
              </Box>

            </Flex>
          </>

        </div>
      </div>
    </StickyContainer>
  )
}

export default App
