import React from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/logo.png'
import UserIcon from '../../assets/images/header/user.svg'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import SolanaWallet from '../../components/SolanaWallet'

const AppHeaderContent = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: -60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  position: fixed;
  
  
`
const Logo = styled.div`
  width: 200px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    position: relative;
    width: 120px;
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
  
  @media screen and (max-width: 1100px) {
    width: fit-content;
  }
`

const AppHeader:React.FC <{ onCollapseChanged: () => void }> = () => {
  const history = useHistory()

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <AppHeaderContent>
      <Logo>
        <img src={ForartLogo}  style={ isMobile ? { width: '80px' } : { }}  />
      </Logo>
      <Operator>
        <SolanaWallet />
        {/*<Wallet />*/}
        <div style={{ fontSize: '20px', color: '#A53067' }}   onClick={() => history.push('/personal/home')} >
          <img src={UserIcon} />
        </div>
      </Operator>
    </AppHeaderContent>
  )
}

export default AppHeader
