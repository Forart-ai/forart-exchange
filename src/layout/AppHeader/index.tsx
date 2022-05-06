import React, { useCallback } from 'react'
import ForartLogo from '../../assets/logo.png'
import UserIcon from '../../assets/images/header/avatar.png'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Wallet from '../../components/wallet'
import routes, { Route } from '../../routes'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import { useSignLogin } from '../../hooks/useSignLogin'
import { Box, Divider, Drawer, List, ListItem, styled } from '@mui/material'
import DrawerIcon from '../../assets/images/siderIcon/drawer.svg'
import Button from '@mui/material/Button'
import { Anchor } from 'antd'

const AppHeaderContent = styled('div')`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: fixed;
  background: #0A0523;
  border-bottom: 1px #8345f4 solid;
  //background-image: linear-gradient(to right, #B8316A, #601b7e);


`

const MainContent = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 80%;
  maxWidth: '1870px';
  
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 90%;
  }

`

const Logo = styled('div')`
  height: 68px;
  width: 15%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img{
    position: relative;
    width: 100px;
  }
`

const Operator = styled('div')`
  display: flex;
  align-items: center;
  width: 84%;
  cursor: pointer;
  justify-content: flex-end;
  
  img {
      width: 40px;
  }
  
`

export const NavLinkText = styled('div')`
  transition: color 0.38s;
  font-family: 'arial';
  font-size: 16px;
  letter-spacing: 1px;


  :hover:not(.active) {
    color: #4fc89f;
  }
`

export const DisableNav = styled('div')`
  cursor: not-allowed ;
  user-select: none;
  color: #999999;
`

const RouterContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  width: 40%;
  
`

const DrawerHeader = styled('div')`
  height: 60px;
  width: 100%;
  background-color: #1b013b;
  padding:  10px;
  object-fit: contain;

  img {
    height: 100%;
  }
`
const MobileNavItem = styled('div')`
  font-size: 16px;
  width: 100%;
  margin-bottom: 35px;

  .selected {
    border: 1px #8246F5 solid;
    border-radius: 30px;
    background-color: rgba(91, 3, 192, 0.27);
    padding: 10px;
    color: #ffffff;
  }

  .disabled {
    color: #999999;

 }
  .normal {
    color: #ffffff;
    width: 100%;
  }
  

  //a  {
  //  color: red;
  //  border: 1px red solid;
  //}
`

const PersonalArea = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  
  img {
    width: 60px;
    margin-bottom: 10px;
  }
`

const DrawerList:React.FC = () => {
  const { pathname }  = useLocation()
  const { openModal } = useModal()
  const { account } = useSolanaWeb3()
  const history = useHistory()

  const handleRedirect = () => {
    if (!account) {
      openModal(<WalletSelectionModal />)
    }
    else {
      history.push('/account')
      return
    }
  }

  return (
    <Box
      sx={{ width: 250, height:'100vh', position:'relative' }}
    >
      <DrawerHeader >
        <Link to={ '/' }>
          <img src={ForartLogo}    />

        </Link>
      </DrawerHeader>

      <PersonalArea>
        <img  onClick={handleRedirect} src={UserIcon} />
        <Wallet />
      </PersonalArea>

      <List sx={{ padding:'30px 20px', width: '100%' }}>
        {
          routes.filter(route => !route.hidden).map((route: Route, index) => {
            return route.disable ? (
              <MobileNavItem key={index}>
                <div className={'disabled'}> {route.title} </div>
              </MobileNavItem>
            ): (
              pathname === route.path ? (
                <MobileNavItem key={index} >
                  <Link style={{ width:'100%' }}  to={route.path}>
                    <div className={'selected'}  > {route.title}</div>
                  </Link>
                </MobileNavItem>
              ): (
                <MobileNavItem key={index}>
                  <Link to={route.path}>
                    <div className={'normal'}> {route.title} </div>
                  </Link>
                </MobileNavItem>
              )
            )
          })
        }

      </List>

      {/*<Box sx={{  position: 'absolute', bottom: '30px', left: '35px' }}>*/}
      {/*  <Wallet />*/}
      {/*</Box>*/}

    </Box>
  )
}

const AppHeader:React.FC  = () => {
  type Anchor = 'top' | 'left' | 'bottom' | 'right';

  const history = useHistory()

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const { pathname }  = useLocation()

  const { account } = useSolanaWeb3()

  const { openModal } = useModal()

  const handleRedirect = () => {
    if (!account) {
      openModal(<WalletSelectionModal />)
    }
    else {
      history.push('/account')
      return
    }
  }

  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
          if (
            event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return
          }

          setState({ ...state, ['left']: open })
        }

  return (
    <AppHeaderContent>
      <MainContent>

        <Logo>
          <Link to={ '/' }>
            <img src={ForartLogo}    />
          </Link>

        </Logo>

        <Operator>
          {
            !isMobile && (
              <RouterContainer>
                {
                  routes.filter(route => !route.hidden).map((route: Route, index) => {
                    return route.disable ? (
                      <DisableNav style= {{ color: 'white' }} key={index}>
                        {route.title}
                      </DisableNav>
                    ) :
                      (
                        <Link
                          key={index}
                          to={route.path}
                        >
                          {
                            pathname === route.path ? (
                              <NavLinkText  style={{ color: '#85fcd0' }}>
                                {route.title}
                              </NavLinkText>
                            ):
                              (
                                <NavLinkText style= {{ color: 'white' }}>
                                  {route.title}
                                </NavLinkText>
                              )
                          }

                        </Link>
                      )
                  })
                }
              </RouterContainer>
            )
          }

          <Wallet />

          {
            isMobile ? (
              <>
                <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                  sx={{ '& .MuiDrawer-paper': { backgroundColor: 'rgb(22,5,41)', backgroundImage:'none' } }}
                >
                  <DrawerList />
                </Drawer>

                <img onClick={toggleDrawer('left',true)} src={DrawerIcon} style={{ marginLeft: '10px' }} />
              </>
            ) : (
              <div style={{ fontSize: '20px', marginLeft:'20px' }}   onClick={handleRedirect} >
                <img src={UserIcon} />
              </div>
            )
          }
        </Operator>
      </MainContent>

    </AppHeaderContent>
  )
}

export default AppHeader
