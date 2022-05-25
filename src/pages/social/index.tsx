import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { socialRoutes } from './routes'
import { styled } from '@mui/system'
import SocialHomepage, { MainMessageArea, SocialPageWrapper } from './modules/home'
import GallerySwiper from './modules/ranking/gallerySwiper'
import { StickyContainer, Sticky } from 'react-sticky'

const PageWrapper = styled('div')(({ theme }) => ({
  maxWidth: '90rem',
  minHeight:'100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'center',
  alignItems:'center',
  margin:' 0 auto',
  paddingBottom: '130px',

  [theme.breakpoints.down('md')]: {
    width:'calc(100vw - 30px)',
    height: 'fit-content',
  }

}))

const RankingContent = styled('div')`
  position: absolute;
  right: 0;
  width: 500px;
  
  ${({ theme }) => theme.breakpoints.down('xl')} {
    display: none;
  }
`

const NftChatroom: React.FC = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (pathname === '/social') history.push('/social/home')
  }, [pathname])

  return (
    <StickyContainer>

      <PageWrapper>

        <SocialPageWrapper>
          <MainMessageArea>
            <Switch>
              {
                socialRoutes.map(({ path, component }) => (
                  <Route
                    path={`/social/${path}`}
                    component={component}
                    key={path}
                  />
                ))
              }
            </Switch>
          </MainMessageArea>
          <RankingContent>
            <Sticky >
              {
                ({ style, isSticky = true }) => (
                  <div style={{ ...style, marginTop: isSticky ? '60px' : 0 }}>
                    <GallerySwiper />
                  </div>)
              }
            </Sticky>
          </RankingContent>
        </SocialPageWrapper>

      </PageWrapper>
    </StickyContainer>

  )
}

export default NftChatroom
