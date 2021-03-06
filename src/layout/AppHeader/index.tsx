import React from 'react'
import styled from '@emotion/styled'
import ForartLogo from '../../assets/images/logo.png'
import UserIcon from '../../assets/images/header/user.svg'
import { useHistory,Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import SolanaWallet from '../../components/SolanaWallet'
import Wallet from '../../components/wallet'

const AppHeaderContent = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: -60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 8;
  position: fixed;
  background-image: linear-gradient(to right, #B8316A, #601b7e);


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

const AppHeader:React.FC <{ onCollapseChanged: () => void }> = () => {
  const history = useHistory()

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  return (
    <AppHeaderContent>
      <Logo>
        <Link to={'/'}>
          <img src={ForartLogo}  style={ isMobile ? { width: '80px' } : { }}  />
        </Link>
      </Logo>
      <Operator>
        {
          !isMobile && (
            <>
              <Wallet />
            </>
          )
        }
        <div style={{ fontSize: '20px', color: '#A53067' }}   onClick={() => history.push('/personal/home')} >
          <img src={UserIcon} />
        </div>
      </Operator>
    </AppHeaderContent>
  )
}

export default AppHeader
