import React, { useEffect } from 'react'
import './App.css'
import './app.scss'
import { BackTop, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import AppHeader from './layout/AppHeader'
// @ts-ignore
import { Route, useLocation } from 'react-router-dom'
import routes from './routes'
import { useChainEffect, useEagerConnect } from './web3/hooks'
import '../src/font/font.css'
import { useDispatch } from 'react-redux'
import { setSideBarCollapsed, useSideBarCollapsed } from './store/app'
import { useMediaQuery } from 'react-responsive'
import { styled } from '@mui/material'

export const BlueGlow = styled('div')`
  position: absolute;
  width: 500px;
  height: 500px;
  mix-blend-mode: screen;
  background: radial-gradient(circle, #00468C 0%, rgba(0, 70, 140, 0) 100%);
  filter: blur(80px);
  border-radius: 50%;
  opacity: 0.8;
`

export const PurpleGlow = styled('div')`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #5a1993 0%, rgba(63, 21, 99, 0) 100%);
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.9;
`

const App: React.FC = () => {
  // useEagerConnect()
  // useChainEffect()

  const location = useLocation()
  const dispatch = useDispatch()
  const sideBarCollapsed = useSideBarCollapsed()

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const toggleCollapsed = () => {
    dispatch(setSideBarCollapsed(!sideBarCollapsed))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Layout className="app">
      <div className="border" >
        <AppHeader onCollapseChanged={toggleCollapsed} />

        { !isMobile ? (
          <>

            <Content  style={{ width:'100vw', backgroundColor:'rgb(13,14,45)', position:'relative', zIndex: 2, top:'60px' }}>
              <PurpleGlow style={{ right: '0' }} />
              <PurpleGlow style={{ left: '25%' }} />
              <PurpleGlow style={{ top:'90vh', right: '0%', opacity:'.6', width:'600px', height: '600px' }} />
              <BlueGlow style={{ right: '25%' }} />
              <BlueGlow style={{ top:'60vh' }} />
              <BlueGlow style={{ top:'80vh', right: '30%', opacity:'.6', width:'400px', height: '400px' }} />
              {
                routes.map((router:any) => (
                  <Route
                    path={router.path}
                    exact
                    component={router.component}
                    key={router.path}
                  />
                ))
              }
              <BackTop />
            </Content>
          </>
        ) : (
          <Content  style={{ width:'100vw', backgroundColor:'rgb(13,14,45)', position:'relative', minHeight:'100vh' }}>
            {
              routes.map((router:any) => (
                <Route
                  path={router.path}
                  exact
                  component={router.component}
                  key={router.path}
                />
              ))
            }

          </Content>
        )}
      </div>
    </Layout>
  )
}

export default App
