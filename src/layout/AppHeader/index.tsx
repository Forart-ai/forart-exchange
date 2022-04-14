import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/logo.png'
import UserIcon from '../../assets/images/header/avatar.png'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Wallet from '../../components/wallet'
import routes, { Route } from '../../routes'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { useSignLogin } from '../../hooks/useSignLogin'

const AppHeaderContent = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: fixed;
  background: #0A0523;
  border-bottom: 1px #8345f4 solid;
  //background-image: linear-gradient(to right, #B8316A, #601b7e);


`

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  maxWidth: '1870px';

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
  width: 60%;
  cursor: pointer;
  justify-content: flex-end;
  
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
  display: grid;
  width: 50%;
  grid-template-columns: repeat(3, 42%);
  justify-content: space-between;
  margin-right: 20px;
  
`

const AppHeader:React.FC <{ onCollapseChanged: () => void }> = () => {
  const history = useHistory()

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const { pathname }  = useLocation()

  const { account } = useSolanaWeb3()
  const { login } = useSignLogin()

  const { openModal } = useModal()

  const handleRedirect = async () => {
    if (!account) {
      openModal(<WalletSelectionModal />)
    }

    else {
      await login().then(() => {
        history.push('/account')

      })
    }
    return
  }

  const eff = useCallback(async () => {
    if (!account) {
      openModal(<WalletSelectionModal />)
    }

    else {
      await login().then(() => {
        history.push('/account')
      })
    }
    return

  },[account])

  return (
    <AppHeaderContent>
      <MainContent>
        <Link to={ '/' }>
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

          <div style={{ fontSize: '20px', }}   onClick={ eff} >
            <img src={UserIcon} />
          </div>
        </Operator>
      </MainContent>

    </AppHeaderContent>
  )
}

export default AppHeader
