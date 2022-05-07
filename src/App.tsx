import React, { useEffect } from 'react'
import './App.css'
import './app.scss'
import { BackTop, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import AppHeader from './layout/AppHeader'
// @ts-ignore
import { Route, useLocation } from 'react-router-dom'
import routes from './routes'
import '../src/font/font.css'
import { useMediaQuery } from 'react-responsive'
import {  styled } from '@mui/material'
import useEagerConnect from './hooks/useEagerConnect'
import AppFooter from './layout/AppFooter'

export const BlueGlow = styled('div')`
  position: absolute;
  width: 500px;
  height: 500px;
  mix-blend-mode: screen;
  background: radial-gradient(circle, #00468C 0%, rgba(0, 70, 140, 0) 100%);
  filter: blur(80px);
  border-radius: 50%;
  opacity: 0.8;
  z-index: -1;
`

export const PurpleGlow = styled('div')`
   position: absolute;
   width: 400px;
   height: 400px;
   background: radial-gradient(circle, #5a1993 0%, rgba(63, 21, 99, 0) 100%);
   border-radius: 50%;
   filter: blur(80px);
   opacity: 0.9;
   z-index: -1;
`

const App: React.FC = () => {
  // useChainEffect()
  useEagerConnect()

  const location = useLocation()

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

  // useSignLogin()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Layout className="app">
      <div className="border" >

        {
          !isMobile ? (
            <>
              <AppHeader  />
              <Content  style={{ width:'100vw', backgroundColor:'rgb(13,14,45)', position:'relative', zIndex: 0,  top:'60px' }}>
                <PurpleGlow style={{ right: '0' }} />
                <PurpleGlow style={{ left: '25%' }} />
                <PurpleGlow style={{ top:'90vh', right: '0%', opacity:'.6', width:'600px', height: '600px' }} />
                <BlueGlow style={{ right: '25%' }} />
                <BlueGlow style={{ top:'60vh' }} />
                <BlueGlow style={{ top:'80vh', right: '30%', opacity:'.6', width:'400px', height: '400px' }} />
                {
                  routes.map(({ exact = true, path, component }) => (
                    <Route
                      path={path}
                      exact={exact}
                      component={component}
                      key={path}
                    />

                  ))
                }
                <BackTop />
                <AppFooter />
              </Content>

            </>
          ) : (
            <>
              <AppHeader />
              <Content  style={{ width:'100vw', backgroundColor:'rgb(13,14,45)', position:'relative', minHeight:'100vh', }}>
                {
                  routes.map(({ exact = true, path, component }) => (
                    <Route
                      exact={exact}
                      path={path}
                      component={component}
                      key={path}
                    />
                  ))
                }
              </Content>
              {/*<AppBottomNavigation />*/}
            </>
          )
        }
      </div>
    </Layout>
  )
}

export default App
