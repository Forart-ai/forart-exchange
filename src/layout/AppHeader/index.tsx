import React from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/header/logo.png'
import Wallet from '../../components/wallet'
import UserIcon from '../../assets/images/header/user.svg'
import { useHistory } from 'react-router-dom'

const AppHeaderContent = styled.div`
  width: 100%;
  height: 68px;
  padding: 0 20px;
  background: #04111D;
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

const Operator = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  cursor: pointer;
  
    img {
      width: 40px;
      border: 3px #02A6F5 solid;
      border-radius: 30px;
  }
`

const AppHeader:React.FC = () => {
  const history = useHistory()

  return (
    <AppHeaderContent>
      <Logo>
        <img src={ForartLogo} />
      </Logo>
      <Operator>
        <Wallet />
        <img src={UserIcon} onClick={() => history.push('/personal/home')} />
      </Operator>
    </AppHeaderContent>
  )
}

export default AppHeader
