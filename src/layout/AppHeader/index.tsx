import React from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/header/logo.png'
import Wallet from '../../components/wallet'


const AppHeaderContent = styled.div`
  width: 100%;
  height: 68px;
  padding: 0 20px;
  background: #282B2F;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  
`
const Logo = styled.div`
  width: 130px;
  height: 68px;
  img {
    width: 100%;
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
