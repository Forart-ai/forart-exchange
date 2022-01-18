import React, { useEffect } from 'react'
import './App.css'
import './app.scss'
import { Affix, BackTop, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
// @ts-ignore
import { Route, useLocation } from 'react-router-dom'
import routes from './routes'
import { useChainEffect, useEagerConnect } from './web3/hooks'
import '../src/font/font.css'
import { useDispatch } from 'react-redux'
import { setSideBarCollapsed, useSideBarCollapsed } from './store/app'
import { useMediaQuery } from 'react-responsive'

const App: React.FC = () => {
  useEagerConnect()
  useChainEffect()

  const location = useLocation()
  const dispatch = useDispatch()
  const sideBarCollapsed = useSideBarCollapsed()

  const toggleCollapsed = () => {
    dispatch(setSideBarCollapsed(!sideBarCollapsed))
  }

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])


  return (
    <Layout className="app">
      <AppHeader onCollapseChanged={toggleCollapsed} />
      <Layout>
        <Layout>
          <Affix offsetTop={0}>
            <Layout.Sider collapsed={sideBarCollapsed}
              style={
                isMobile ? {
                  position: 'fixed',
                  top: '0px',
                  left: sideBarCollapsed ? '-100%' : 0,
                  zIndex: 99,
                } :
                  {
                    zIndex: 99,
                  }
              }
            >
              <AppSideBar />
            </Layout.Sider>
          </Affix>
          <Content  style={{ display: 'flex', width:'calc(100vw - 220px)', backgroundColor:'#1c1c1d', position:'relative',top: '60px' }}>
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
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
