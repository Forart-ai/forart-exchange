import React, { useEffect } from 'react'
import './App.css'
import './app.scss'
import { BackTop, Layout } from 'antd'
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
  // <Layout className="app">
  //   <AppHeader onCollapseChanged={toggleCollapsed} />
  //   <Layout>
  //     <Layout>
  //       <Affix offsetTop={0}>
  //         <Layout.Sider collapsed={sideBarCollapsed}
  //           style={
  //             isMobile ? {
  //               position: 'fixed',
  //               top: '0px',
  //               left: sideBarCollapsed ? '-100%' : 0,
  //               zIndex: 99,
  //             } :
  //               {
  //                 zIndex: 99,
  //               }
  //           }
  //         >
  //           <AppSideBar />
  //         </Layout.Sider>
  //       </Affix>
  //       <Content  style={{ width:'calc(100vw - 220px)', backgroundColor:'rgb(17,17,17)', position:'relative',top: '60px' }}>
  //         {
  //           routes.map((router:any) => (
  //             <Route
  //               path={router.path}
  //               exact
  //               component={router.component}
  //               key={router.path}
  //             />
  //           ))
  //         }
  //         <BackTop />
  //       </Content>
  //     </Layout>
  //   </Layout>
  // </Layout>

    <Layout className="app">
      <div className="border" >
        <AppHeader onCollapseChanged={toggleCollapsed} />

        { !isMobile ? (
          <>
            <AppSideBar />

            <Content  style={{ width:'calc(100vw - 80px)', backgroundColor:'rgb(17,17,17)', position:'relative',top: '60px', left:'70px', borderRadius:'1em', height:'100vh' }}>
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
          <Content  style={{ width:'100vw', backgroundColor:'rgb(17,17,17)', position:'relative',top: '60px', height:'100vh' }}>
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
