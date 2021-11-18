import React from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/header/logo.png'
import ConnectButton from '../../components/wallet/ConnectButton'
import Wallet from '../../components/wallet'


const AppHeaderContent = styled.div`
  width: 100%;
  height: 68px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  
`
const Logo = styled.div`
  width: 140px;
  
  img {
    width: 100%;
    margin-left: 20px;
  }
`

const AppHeader:React.FC = () => {
  return (
    <AppHeaderContent>
      <Logo>
        <img src={ForartLogo} />
      </Logo>
      <Wallet />
    </AppHeaderContent>
  )
}

export default AppHeader
