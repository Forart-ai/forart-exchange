import React from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/logo.png'
import UserIcon from '../../assets/images/header/user.svg'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Wallet from '../../components/wallet'
import routes, { Route } from '../../routes'

const AppHeaderContent = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  position: fixed;
  background: #0A0523;
  border-bottom: 1px #8345f4 solid;
  //background-image: linear-gradient(to right, #B8316A, #601b7e);


`
const Logo = styled.div`
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    position: relative;
    width: 100px;
  }
`

const Operator = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  
    img {
      width: 40px;
  }
  
  @media screen and (max-width: 1080px) {
    width: fit-content;
  }
`

export const NavLinkText = styled.div`
  transition: color 0.38s;
  font-family: 'arial';
  font-size: 16px;
  letter-spacing: 1px;
  
  :hover:not(.active) {
    color: #4fc89f;
  }
`

const RouterContainer = styled('div')`
  display: flex;
  width: 400px;
  min-width: 20px;
  justify-content: space-between;
  margin-right: 200px;
  
`

const AppHeader:React.FC <{ onCollapseChanged: () => void }> = () => {
  const history = useHistory()

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const { pathname }  = useLocation()

  return (
    <AppHeaderContent>
      <Link to={'/'}>
        <Logo>
          <img src={ForartLogo}  style={ isMobile ? { width: '80px' } : { }}  />
        </Logo>
      </Link>
      <Operator>
        <RouterContainer>

          {
            routes.filter(route => !route.hidden).map((route: Route, index) => (
              // <Link to={route.path} key={route.path}>
              //   {route.title}
              // </Link>
              <Link
                key={route.path}
                to={route.path}
              >
                {
                  pathname === route.path ? (
                    <NavLinkText aria-disabled={route.disable} style={{ color: '#85fcd0' }}>
                      {route.title}
                    </NavLinkText>
                  ):
                    (
                      <NavLinkText style={{ color: 'white' }}>
                        {route.title}
                      </NavLinkText>
                    )
                }

              </Link>

            ))
          }
        </RouterContainer>

        <Wallet />

        <div style={{ fontSize: '20px', }}   onClick={() => history.push('/personal/home')} >
          <img src={UserIcon} />
        </div>
      </Operator>
    </AppHeaderContent>
  )
}

export default AppHeader
