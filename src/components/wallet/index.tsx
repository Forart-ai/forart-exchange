import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import styled from 'styled-components'
// @ts-ignore
import Jazzicon from '@metamask/jazzicon'
import { Button, Dropdown, Menu, Modal } from 'antd'
import { useWalletSelectionModal } from '../../hooks/wallet-selection-modal'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { PublicKey } from '@solana/web3.js'
import { DownOutlined } from '@ant-design/icons'

const StyledWallet = styled.div`
  height: 40px;
  background-color: #1E052D;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-right: 20px;
  cursor: pointer;
  min-width: 140px;
  
`

const CurrentAccountContainer = styled.div`
  display: flex;
  font-size: 18px;
  user-select: none;
  align-items: center;
  justify-content: center;
  
  .wallet-add {
    display: flex;
    align-items: center;
  }
  
  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
`

const MenuContainer = styled.div`
  height: 200px;
  width: 180px;


  .ant-menu {
    position: relative;
    background-color: #320334;
    border-radius: 10px;
    border: 3px #f940ff solid;
    height: 100%;
    width: 100%;

    top: 10px;
  }

  .menu-box {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 10px 0;


    .disconnect {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 90%;
      height: 25%;
      font-size: 1.2em;
      font-weight: bold;
      color: white;
      background-color: rgb(221, 52, 68);
      border-radius: 8px;
    }
  }


`

type CurrentAccountProps = {
  account: string | null | undefined
  // solanaAccount: undefined | PublicKey
}

const MetamaskIcon: React.FC = () => {
  const ref =useRef<HTMLDivElement>()
  const { account } = useWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(26, parseInt(account.slice(2, 10), 26)))
    }
  }, [account])

  return (
    <div>
      <div className="userIcon" style={{ display:'flex', marginRight:'15px' }} ref={ref as any} />
    </div>
  )
}

const WalletContent: React.FC<CurrentAccountProps> =({
  account
}) => {
  const { disconnect } = useSolanaWeb3()
  const { deactivate } = useWeb3React()

  const { library, chainId } = useWeb3React()

  const [, setBalance] = useState()

  useEffect(():any => {
    if (!!account && !!library) {
      let stale = false

      // library.getBalance(account)
      //   .then((balance:any) => {
      //     if (!stale) {
      //       setBalance(balance)
      //       console.log(formatEther(balance))
      //     }
      //   })
      //   .catch(() => {
      //     if (!stale) {
      //       // @ts-ignore
      //       setBalance(null)
      //     }
      //   })

      return () =>{
        stale = true
        setBalance(undefined)
      }
    }

  },[account, library,chainId])

  return (
    <MenuContainer>
      <Menu>
        <div className="menu-box">
          <div className= "disconnect" onClick={account ? deactivate : disconnect}  > Disconnect </div>
        </div>
      </Menu>
    </MenuContainer>

  // <BalanceContainer>
  //   <div className="balance">{account}</div>
  //   {/*<div>{balance !== undefined ? `${formatEther(balance)}` : ''}</div>*/}
  // </BalanceContainer>

  )
}

const CurrentAccount: React.FC<CurrentAccountProps> = ({ account }) => {

  const menu = useCallback(() => (
    <WalletContent account={account} />
  ), [account] )

  return (
    <CurrentAccountContainer>
      {
        account &&
          (
            <>
              <Dropdown overlay= { menu } trigger= {['click']} placement= {'bottomRight'}  >
                <div className="wallet-add" >
                  <DownOutlined style={{ fontSize:'17px', marginRight:'10px' } } />
                  <MetamaskIcon />
                  {`${account.substr(0,5)}...${account.substr(-4,4)}`}
                </div>
              </Dropdown>
            </>
          )
      }
      {/*{*/}
      {/*  solanaAccount &&*/}
      {/*    (*/}

      {/*      <Dropdown overlay= { menu } trigger= {['click']} placement= {'bottomRight'}  >*/}
      {/*        <div className="wallet-add" >*/}
      {/*          <DownOutlined style={{ fontSize:'17px', marginRight:'10px' } } />{`${solanaAccount.toBase58().substr(0,5)}...${solanaAccount.toBase58().substr(-4,4)}`}*/}
      {/*        </div>*/}
      {/*      </Dropdown>*/}

      {/*    )*/}
      {/*}*/}
    </CurrentAccountContainer>
  )
}

export const ConnectToWallet = () => {
  const { open } = useWalletSelectionModal()

  return (
    <div onClick={open}>
      <span>Connect To Ethereum</span>
    </div>
  )
}

const Wallet: React.FC = () => {
  const { account } = useWeb3React()

  return (
    <StyledWallet>
      {/*{ (!account && !solanaAccount ) && <ConnectToWallet /> }*/}
      {/*{ (!!account || !!solanaAccount) && <CurrentAccount account={account} solanaAccount={ solanaAccount } /> }*/}
      { (!account  ) && <ConnectToWallet /> }
      { (!!account ) && <CurrentAccount account={account} /> }
    </StyledWallet>

  )
}

export default Wallet
