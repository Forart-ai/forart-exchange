import React from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/header/logo.png'
import Wallet from '../../components/wallet'
import UserIcon from '../../assets/images/header/user.svg'
import { useHistory } from 'react-router-dom'
import { MenuFoldOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'


const AppHeaderContent = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: -60px;
  padding: 0 20px;
  background: #04111D;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
      border: 3px #02A6F5 solid;
      border-radius: 30px;
  }
  
  @media screen and (max-width: 1100px) {
    width: fit-content;
  }
`

const AppHeader:React.FC <{ onCollapseChanged: () => void }> = ({ onCollapseChanged }) => {
  const history = useHistory()

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <AppHeaderContent>
      <Logo>
        <MenuFoldOutlined
          onClick={onCollapseChanged}
          style={{
            position: 'relative',
            fontSize: '20px',
            color: '#B2B2B2',
            marginRight: '15px'
          }}
        />
        <img src={ForartLogo}  style={ isMobile ? { width: '80px' } : { }}  />
      </Logo>
      <Operator>
        {/*<SolanaWallet />*/}
        <Wallet />
        <img src={UserIcon}
          onClick={() => history.push('/personal/home')}
          style={ isMobile ? { width:'25px' } : {}}
        />
      </Operator>
    </AppHeaderContent>
  )
}

export default AppHeader
