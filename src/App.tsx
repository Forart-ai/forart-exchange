import React from 'react'
import './App.css'
import './app.scss'
import { Layout } from 'antd'
import { Header } from 'antd/es/layout/layout'
import AppHeader from './layout/AppHeader'
import AppSideBar from './layout/AppSideBar'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
// @ts-ignore
import { Route } from 'react-router-dom'
import routes from './routes'
import { useChainEffect, useEagerConnect } from './web3/hooks'
import '../src/font/font.css'
import { useDispatch } from 'react-redux'
import { setSideBarCollapsed, useSideBarCollapsed } from './store/app'



const App: React.FC = () => {
  useEagerConnect()
  useChainEffect()

  const dispatch = useDispatch()
  const sideBarCollapsed = useSideBarCollapsed()

  const toggleCollapsed = () => {
    dispatch(setSideBarCollapsed(!sideBarCollapsed))
  }

  return (
    <Layout className="app">
      <AppHeader onCollapseChanged={toggleCollapsed} />
      <Layout>
        <Layout>
          <Layout.Sider width="200px" collapsed={sideBarCollapsed}>
            <AppSideBar />
          </Layout.Sider>
          <Content style={{ display: 'flex', width:'calc(100vw - 220px)', backgroundColor:'#1c1c1d', position:'relative',top: '60px' }}>
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
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
